import React, { useState } from 'react';
import { ShoppingBag, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

type Product = {
  id: string;
  name: string;
  category: 'Coffee Blends' | 'Sippers' | 'Appliances';
  price: number;
  image: string;
  popularity: number;
  dateAdded: string;
};

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Ethiopian Yirgacheffe",
    category: "Coffee Blends",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1587734195342-5605b1b1d3e9?w=500",
    popularity: 95,
    dateAdded: "2024-01-15"
  },
  {
    id: "2",
    name: "Thermal Travel Mug",
    category: "Sippers",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=500",
    popularity: 88,
    dateAdded: "2024-01-20"
  },
  {
    id: "3",
    name: "Pour-Over Coffee Maker",
    category: "Appliances",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1544778262-67135f71fd37?w=500",
    popularity: 92,
    dateAdded: "2024-01-25"
  }
];

type SortOption = 'price' | 'popularity' | 'dateAdded';

export default function ProductCatalog() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  const categories = ['all', 'Coffee Blends', 'Sippers', 'Appliances'];

  const filteredAndSortedProducts = SAMPLE_PRODUCTS
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'popularity':
          return b.popularity - a.popularity;
        case 'dateAdded':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        default:
          return 0;
      }
    });

  return (
    <section id="products-section" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-brown-600" />
          <h2 className="text-4xl font-bold text-brown-900 mb-4">Our Products</h2>
          <p className="text-lg text-brown-600">Discover our premium coffee blends and equipment</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="flex gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-brown-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="price">Sort by Price</option>
            <option value="dateAdded">Sort by New Arrivals</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 hover:text-brown-600 transition-colors">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1
                    })}
                    className="flex items-center gap-2 bg-brown-600 text-white px-4 py-2 rounded-full hover:bg-brown-700 transition"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 