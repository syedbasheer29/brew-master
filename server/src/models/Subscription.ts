import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  name: string;
  description: string;
  price: number;
  duration: number; // in months
  features: string[];
  discounts: {
    type: string;
    amount: number;
  }[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DiscountSchema = new Schema({
  type: { 
    type: String,
    required: true,
    enum: ['Percentage', 'Fixed']
  },
  amount: { type: Number, required: true }
});

const SubscriptionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in months
  features: [{ type: String }],
  discounts: [DiscountSchema],
  active: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema); 