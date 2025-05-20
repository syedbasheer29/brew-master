import React, { createContext, useContext, useState } from 'react';
import type { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleCart = () => setIsOpen(!isOpen);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((currentItems) =>
      quantity === 0
        ? currentItems.filter((item) => item.id !== id)
        : currentItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        total,
        toggleCart,
        addItem,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}