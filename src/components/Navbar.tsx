import React, { useState } from 'react';
import { ShoppingCart, Coffee, Menu, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProfileMenu from './ProfileMenu';
import LoginModal from './LoginModal';
import { authService } from '../services/auth';

export default function Navbar() {
  const { toggleCart, items } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCustomBlends = () => {
    const customBlendSection = document.getElementById('custom-blend-section');
    if (customBlendSection) {
      customBlendSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    authService.removeToken();
  };

  const handleLoginSuccess = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      authService.saveToken(response.token);
      setIsLoggedIn(true);
      setUserEmail(email);
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <>
      <nav className="bg-brown-900 text-white py-4 px-6 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8" />
            <span className="text-2xl font-bold">MyRoast</span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <button onClick={scrollToHome} className="hover:text-brown-200 flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </button>
            <button onClick={scrollToProducts} className="hover:text-brown-200">Products</button>
            <button onClick={scrollToCustomBlends} className="hover:text-brown-200">Custom Blends</button>
            <button onClick={scrollToAbout} className="hover:text-brown-200">About</button>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="hover:text-brown-200 relative" 
              onClick={toggleCart}
            >
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
            <ProfileMenu 
              isLoggedIn={isLoggedIn} 
              onLogin={handleLogin} 
              onLogout={handleLogout}
              userEmail={userEmail}
            />
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </>
  );
}