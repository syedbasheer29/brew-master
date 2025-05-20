import React from 'react';
import { Coffee, Award, Users, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about-section" className="py-20 bg-brown-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brown-900 mb-4">Our Story</h2>
          <p className="text-xl text-brown-600 max-w-3xl mx-auto">
            From bean to cup, we're passionate about crafting the perfect coffee experience for our customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-brown-900">A Journey of Passion</h3>
            <p className="text-brown-600 leading-relaxed">
              Founded in 2024, MyRoast began with a simple mission: to bring the world's finest coffee experiences to your cup. 
              Our journey started in a small roastery, where our founder's passion for coffee led to endless experimentation with different beans, 
              roasting techniques, and brewing methods.
            </p>
            <p className="text-brown-600 leading-relaxed">
              Today, we work directly with farmers across the globe, ensuring not only the highest quality beans but also 
              sustainable and ethical farming practices. Every bean we select, every roast we perfect, and every blend we create 
              is a testament to our commitment to excellence.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500" 
              alt="Coffee roasting" 
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <Coffee className="h-12 w-12 text-brown-600" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Award className="h-12 w-12 text-brown-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-brown-900 mb-2">Quality First</h4>
            <p className="text-brown-600">
              We source only the top 1% of coffee beans from around the world, ensuring exceptional quality in every cup.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Users className="h-12 w-12 text-brown-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-brown-900 mb-2">Expert Team</h4>
            <p className="text-brown-600">
              Our master roasters bring decades of experience and passion to craft the perfect roast every time.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Heart className="h-12 w-12 text-brown-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-brown-900 mb-2">Sustainability</h4>
            <p className="text-brown-600">
              We're committed to ethical sourcing and supporting coffee farming communities worldwide.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-brown-900 mb-6">Our Values</h3>
          <div className="max-w-3xl mx-auto text-brown-600 leading-relaxed">
            <p className="mb-4">
              At MyRoast, we believe that great coffee is more than just a beverage – it's an experience that brings people together. 
              Our commitment to quality, sustainability, and innovation drives everything we do.
            </p>
            <p>
              Whether you're a coffee connoisseur or just beginning your coffee journey, we're here to help you discover 
              your perfect blend and elevate your daily coffee ritual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 