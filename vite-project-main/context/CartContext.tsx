import React, { createContext, useContext, useState, useEffect } from 'react';

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
  clearCart: () => void;
  totalAmount: number;
  restaurantPhone: string;
  setRestaurantPhone: (phone: string) => void;
  activeResId: string | null;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence Loading
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kpd_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Cart loading failed:", e);
      return [];
    }
  });
  
  const [restaurantPhone, setRestaurantPhone] = useState(() => {
    try {
      return localStorage.getItem('kpd_phone') || "";
    } catch (e) {
      return "";
    }
  });
  
  const [activeResId, setActiveResId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('kpd_res_id') || null;
    } catch (e) {
      return null;
    }
  });


  // Persistence Saving
  useEffect(() => {
    localStorage.setItem('kpd_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kpd_phone', restaurantPhone);
  }, [restaurantPhone]);

  useEffect(() => {
    if (activeResId) localStorage.setItem('kpd_res_id', activeResId);
  }, [activeResId]);

  const addToCart = (item: any, resId: string) => {
    if (cart.length > 0 && activeResId !== resId && activeResId !== null) {
      if (!window.confirm("Choosing items from a new restaurant will clear your current cart. Proceed?")) return;
      setCart([]);
    }
    setActiveResId(resId);
    setCart(prev => {
      const exist = prev.find(i => i.id === item.id);
      return exist 
        ? prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i) 
        : [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newCart = prev.map(i => i.id === id ? {...i, quantity: i.quantity - 1} : i).filter(i => i.quantity > 0);
      if (newCart.length === 0) setActiveResId(null);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setActiveResId(null);
    localStorage.removeItem('kpd_cart');
    localStorage.removeItem('kpd_res_id');
  };

  const totalAmount = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalAmount, restaurantPhone, setRestaurantPhone, activeResId }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart error");
  return context;
};