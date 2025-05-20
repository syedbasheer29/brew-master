import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import CustomBlendBuilder from './components/CustomBlendBuilder';
import About from './components/About';
import ChatBot from './components/ChatBot';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { initializeDeepSeekService } from './services/deepseekService';
import { config } from './config';

function App() {
  useEffect(() => {
    if (!config.DEEPSEEK_API_KEY) {
      console.error('DeepSeek API key is not configured. Please set VITE_DEEPSEEK_API_KEY in your environment variables.');
      return;
    }
    initializeDeepSeekService(config.DEEPSEEK_API_KEY);
  }, []);

  return (
    <BrowserRouter>
      <CartProvider>
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
      </CartProvider>
    </BrowserRouter>
  );
}

export default App; 