import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomBlendBuilder from './components/CustomBlendBuilder';
import ProductCatalog from './components/ProductCatalog';
import About from './components/About';
import ChatBot from './components/ChatBot';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProductCatalog />
      <CustomBlendBuilder />
      <About />
      <ChatBot />
      <Cart />
      <Footer />
    </div>
  );
}

export default App;