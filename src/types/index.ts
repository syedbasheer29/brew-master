export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'coffee' | 'equipment' | 'accessories';
  rating: number;
  reviews: number;
}

export interface CoffeeBlend {
  roastLevel: 'light' | 'medium' | 'dark';
  grindSize: 'whole-bean' | 'coarse' | 'medium' | 'fine';
  origin: string;
  price: number;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: 'product' | 'blend';
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}