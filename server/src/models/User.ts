import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IPaymentMethod {
  type: string;
  details: string;
  isDefault: boolean;
}

interface INotification {
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLogin?: Date;
  loginAttempts: number;
  lockUntil?: Date;
  savedBlends: mongoose.Types.ObjectId[];
  orders: mongoose.Types.ObjectId[];
  subscriptionPlan: mongoose.Types.ObjectId;
  paymentMethods: IPaymentMethod[];
  notifications: INotification[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  incrementLoginAttempts(): Promise<void>;
}

const PaymentMethodSchema = new Schema({
  type: { type: String, required: true },
  details: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const NotificationSchema = new Schema({
  message: { type: String, required: true },
  type: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  phone: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: Date,
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: Date,
  savedBlends: [{
    type: Schema.Types.ObjectId,
    ref: 'Blend',
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
  subscriptionPlan: {
    type: Schema.Types.ObjectId,
    ref: 'Subscription',
  },
  paymentMethods: [PaymentMethodSchema],
  notifications: [NotificationSchema]
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Increment login attempts
UserSchema.methods.incrementLoginAttempts = async function(): Promise<void> {
  // If lock has expired, reset attempts and remove lock
  if (this.lockUntil && this.lockUntil < new Date()) {
    this.loginAttempts = 1;
    this.lockUntil = undefined;
  } else {
    // Increment attempts
    this.loginAttempts += 1;
    
    // Lock account if attempts exceed 5
    if (this.loginAttempts >= 5 && !this.lockUntil) {
      this.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
    }
  }
  
  await this.save();
};

export const User = mongoose.model<IUser>('User', UserSchema); 