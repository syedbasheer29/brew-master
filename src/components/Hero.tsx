import React from 'react';
import { Coffee } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="flex justify-center mb-6">
            <Coffee className="h-16 w-16" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Craft Your Perfect Cup
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover premium coffee blends, expert brewing equipment, and 
            personalized recommendations for your perfect coffee experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-brown-600 text-white px-8 py-3 rounded-full hover:bg-brown-700 transition">
              Custom Blend
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-brown-900 transition">
              Shop Equipment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}