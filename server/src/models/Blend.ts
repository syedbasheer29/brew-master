import mongoose, { Schema, Document } from 'mongoose';

interface IIngredient {
  coffee: mongoose.Types.ObjectId;
  percentage: number;
}

export interface IBlend extends Document {
  name: string;
  description: string;
  ingredients: IIngredient[];
  price: number;
  image: string;
  createdBy: mongoose.Types.ObjectId;
  isPublic: boolean;
  ratings: {
    userId: mongoose.Types.ObjectId;
    rating: number;
    review: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const IngredientSchema = new Schema({
  coffee: { type: Schema.Types.ObjectId, ref: 'Coffee', required: true },
  percentage: { type: Number, required: true, min: 0, max: 100 }
});

const RatingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String }
});

const BlendSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [IngredientSchema],
  price: { type: Number, required: true },
  image: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isPublic: { type: Boolean, default: false },
  ratings: [RatingSchema]
}, {
  timestamps: true
});

export const Blend = mongoose.model<IBlend>('Blend', BlendSchema); 