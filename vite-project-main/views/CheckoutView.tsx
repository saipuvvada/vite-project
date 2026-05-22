import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PageLayout from '../components/PageLayout';
import { ChevronLeft, Send, MapPin, User, Phone, ShoppingCart, Info } from 'lucide-react';
import { api } from '../api';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutView: React.FC = () => {
  const navigate = useNavigate();
  const { cart, totalAmount, restaurantPhone, clearCart, activeResId } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    addressDetails: ''
  });

  const areas = [
    { area: "Karampudi Local", price: 35 },
    { area: "Oppicharla & KPD.Thanda", price: 45 },
    { area: "Chinthapalli / Sannegandla", price: 50 },
    { area: "Cement Factory Center", price: 50 },
  ];

  const selectedAreaObj = areas.find(a => a.area === formData.area);
  const deliveryCharge = selectedAreaObj ? selectedAreaObj.price : 0;
  const grandTotal = totalAmount + deliveryCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.phone || !formData.area) {
      alert("Please fill in your name, phone, and delivery area.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        restaurantId: activeResId,
        customerName: formData.name,
        customerPhone: formData.phone,
        deliveryArea: formData.area,
        deliveryAddress: formData.addressDetails,
        items: cart.map(i => ({ menuId: i.id, quantity: i.quantity })),
        totalAmount: grandTotal
      };
      
      await api.placeOrder(orderPayload);
      
      const itemsList = cart.map(i => `• ${i.name} (x${i.quantity}) - ₹${i.price * i.quantity}`).join('\n');
      const message = `*Karempudi Eats - New Order*\n\n` +
        `*Customer Details*\n` +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Area: ${formData.area}\n` +
        `Address: ${formData.addressDetails}\n\n` +
        `*Order Items*\n${itemsList}\n\n` +
        `*Subtotal: ₹${totalAmount}*\n` +
        `*Delivery Charge: ₹${deliveryCharge}*\n` +
        `*Grand Total: ₹${grandTotal}*`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/91${restaurantPhone}?text=${encodedMessage}`, '_blank');
      
      if (window.confirm("Order recorded and opened in WhatsApp. Clear your cart now?")) {
        clearCart();
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert("Failed to record order in database. You can still try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <PageLayout>
        <div className="p-12 text-center max-w-lg mx-auto">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <ShoppingCart size={40} />
          </div>
          <h2 className="text-3xl font-black mb-4">Your cart is empty</h2>
          <p className="text-slate-500 mb-8">Add something delicious and come back to checkout!</p>
          <button 
            onClick={() => navigate('/browse')}
            className="px-10 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
          >
            Go to Menu
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="p-4 pb-32 max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Form */}
        <div className="flex-1 space-y-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 font-bold text-primary group"
          >
            <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
              <ChevronLeft size={20} />
            </div>
            <span>Back</span>
          </button>

          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Checkout</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Almost there! We just need your delivery details.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User size={20} className="text-primary" /> Delivery Details
              </h3>
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Delivery Area</label>
                  <select 
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary transition-all font-medium"
                  >
                    <option value="">Select your area</option>
                    {areas.map(a => (
                      <option key={a.area} value={a.area}>{a.area}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Address / Landmark</label>
                  <textarea 
                    name="addressDetails"
                    value={formData.addressDetails}
                    onChange={handleInputChange}
                    placeholder="House number, apartment, or nearby landmark..."
                    rows={3}
                    className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary transition-all font-medium resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-96">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-24">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
              Order Summary
            </h3>

            <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 no-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-sm leading-tight">{item.name}</p>
                    <p className="text-white/50 text-xs font-medium">x {item.quantity}</p>
                  </div>
                  <p className="font-bold text-sm">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
              <div className="flex justify-between text-white/70 font-medium">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-white/70 font-medium">
                <span>Delivery Charge</span>
                <span>{deliveryCharge ? `₹${deliveryCharge}` : '---'}</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-2">
                <span>Total</span>
                <span className="text-primary">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!formData.area || isSubmitting}
              className="w-full h-16 bg-primary text-white rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              {isSubmitting ? "Processing..." : "Confirm via WhatsApp"}
            </button>

            {!formData.area && (
              <p className="text-white/40 text-[10px] text-center mt-4 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                <Info size={12} /> Select an area to see final price
              </p>
            )}
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default CheckoutView;
