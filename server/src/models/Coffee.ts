import mongoose, { Schema, Document } from 'mongoose';

export interface ICoffee extends Document {
  name: string;
  origin: string;
  roastLevel: string;
  description: string;
  flavorNotes: string[];
  price: number;
  stock: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const CoffeeSchema = new Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  roastLevel: { 
    type: String, 
    required: true,
    enum: ['Light', 'Medium', 'Medium-Dark', 'Dark']
  },
  description: { type: String, required: true },
  flavorNotes: [{ type: String }],
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  image: { type: String }
}, {
  timestamps: true
});

export const Coffee = mongoose.model<ICoffee>('Coffee', CoffeeSchema); 