import React from 'react';
import { useCart } from './context/CartContext';

const FloatingCart: React.FC = () => {
  const { cart, totalAmount, restaurantPhone } = useCart();

  // Don't show anything if the cart is empty
  if (cart.length === 0) return null;

  const handleWhatsAppOrder = () => {
    const itemsList = cart.map(i => `• ${i.name} (x${i.quantity})`).join('\n');
    const message = `*Karempudi Eats - New Order*\n\n${itemsList}\n\n*Total: ₹${totalAmount}*`;
    window.open(`https://wa.me/91${restaurantPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${restaurantPhone}`;
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 px-4 z-[999] flex flex-col gap-2">
      
      {/* CALL OPTION - Positioned just above the cart items */}
      {restaurantPhone && (
        <button 
          onClick={handleCall}
          className="flex items-center justify-center gap-2 bg-slate-800 text-white w-full h-12 rounded-xl shadow-lg border border-white/10 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-xl">call</span>
          <span className="font-bold text-sm">Call Restaurant for Instructions</span>
        </button>
      )}

      {/* WHATSAPP CART BAR */}
      <button 
        onClick={handleWhatsAppOrder} 
        className="w-full bg-[#25D366] text-white h-16 rounded-2xl flex justify-between items-center px-6 shadow-2xl active:scale-95 transition-transform"
      >
        <div className="text-left">
          <p className="text-[10px] font-bold uppercase opacity-80">Send Order to WhatsApp</p>
          <p className="font-bold">{cart.length} Items</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-black">₹{totalAmount}</span>
          <span className="material-symbols-outlined">send</span>
        </div>
      </button>
    </div>
  );
};

export default FloatingCart;