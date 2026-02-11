import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any, restaurantId: string) => void;
  removeFromCart: (itemId: string) => void;
  totalAmount: number;
  restaurantPhone: string;
  setRestaurantPhone: (phone: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [activeResId, setActiveResId] = useState<string | null>(null);

  const addToCart = (item: any, resId: string) => {
    if (cart.length > 0 && activeResId !== resId) {
      if (!window.confirm("Clear cart to order from a new restaurant?")) return;
      setCart([]);
    }
    setActiveResId(resId);
    setCart(prev => {
      const exist = prev.find(i => i.id === item.id);
      return exist ? prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i) : [...prev, {...item, quantity: 1}];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.map(i => i.id === id ? {...i, quantity: i.quantity - 1} : i).filter(i => i.quantity > 0));
  };

  const totalAmount = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalAmount, restaurantPhone, setRestaurantPhone }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart error");
  return context;
};