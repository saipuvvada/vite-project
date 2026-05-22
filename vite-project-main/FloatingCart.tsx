import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './context/CartContext';
import { ShoppingBag, PhoneCall, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingCart: React.FC = () => {
  const { cart, totalAmount, restaurantPhone, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show anything if the cart is empty or if we're already on the checkout page
  if (cart.length === 0) return null;
  // Render as modal on homepage, otherwise render bar as before
  const isHome = location.pathname === '/';

  const handleGoToCheckout = () => {
    navigate('/checkout');
  };

  const handleCall = () => {
    window.location.href = `tel:${restaurantPhone}`;
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-6 left-0 right-0 px-4 z-[999] flex flex-col gap-3 max-w-lg mx-auto"
      >
        {/* Call Option - Only show if not on browse pages where restaurant isn't fixed yet */}
        {restaurantPhone && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCall}
            className="flex items-center justify-center gap-2 bg-slate-900/90 backdrop-blur-md text-white w-full h-12 rounded-2xl shadow-xl border border-white/10 transition-all font-bold text-sm"
          >
            <PhoneCall size={18} />
            <span>Call Restaurant</span>
          </motion.button>
        )}
        {isHome ? (
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
            <button onClick={clearCart} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X /></button>
            <h2 className="text-xl font-bold mb-4">Your Order</h2>
            <div className="mb-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
            <button onClick={handleGoToCheckout} className="w-full bg-primary text-white py-4 rounded-2xl font-bold">
              Proceed to Checkout
            </button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoToCheckout}
            className="w-full bg-primary text-white h-16 rounded-[2rem] flex justify-between items-center px-8 shadow-2xl shadow-primary/30 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Finalize Order</p>
                <p className="font-extrabold text-lg">₹{totalAmount}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-black">
              <span>Checkout</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingCart;