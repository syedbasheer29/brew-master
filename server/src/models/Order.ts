import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: string;
    details: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Blend', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
});

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true }
});

const PaymentMethodSchema = new Schema({
  type: { type: String, required: true },
  details: { type: String, required: true }
});

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  shippingAddress: AddressSchema,
  paymentMethod: PaymentMethodSchema
}, {
  timestamps: true
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema); 