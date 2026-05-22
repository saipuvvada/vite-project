import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Restaurant, MenuItem } from "../types";
import { api } from "../api";
import { useCart } from "../context/CartContext";
import { ChevronLeft, Plus, Minus, Info } from "lucide-react";
import { motion } from "framer-motion";

const RestaurantDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, removeFromCart, setRestaurantPhone } = useCart();

  useEffect(() => {
    if (!id) return;

    Promise.all([
      api.getRestaurants(),
      api.getMenuByRestaurant(id)
    ]).then(([resData, menuData]) => {
      const res = resData.find((r: any) => r._id === id);
      
      if (res) {
        setRestaurant({ ...res, id: res._id });
        setRestaurantPhone(res.phone || "");
        
        setItems(menuData.map((r: any) => ({
          id: r._id,
          name: r.name,
          price: r.price,
          category: r.category
        })));
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id, setRestaurantPhone]);

  if (loading) {
    return (
      <div className="p-6 max-w-2xl mx-auto flex flex-col gap-6">
        <div className="h-8 w-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
        <div className="h-12 w-3/4 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Restaurant not found</h2>
        <button onClick={() => navigate('/browse')} className="mt-4 text-primary font-bold">Back to Browse</button>
      </div>
    );
  }

  // Exclude sections that have dedicated pages
  const excluded = ["Bakery", "Juice & Shakes", "Snacks", "Tiffins"]; // Adjust names to match category identifiers
  const categories = Array.from(new Set(items.map(i => i.category))).filter(cat => !excluded.includes(cat));
  return (
    <div className="p-4 pb-48 max-w-2xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center gap-2 font-bold text-primary group"
      >
        <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
          <ChevronLeft size={20} />
        </div>
        <span>Back</span>
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-black tracking-tight mb-2">{restaurant.name}</h1>
        <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs">
            <span className="material-symbols-outlined !text-sm">schedule</span>
            <span>{restaurant.timing}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs">
            <span className="material-symbols-outlined !text-sm">check_circle</span>
            <span>Accepting Orders</span>
          </div>
        </div>
      </motion.div>

      {/* Menu Sections */}
      <div className="space-y-10">
        {categories.map((cat, catIdx) => (
          <motion.div 
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.1 }}
          >
            <h3 className="text-xl font-extrabold mb-5 px-1 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              {cat}
            </h3>
            <div className="grid gap-3">
              {items.filter(i => i.category === cat).map(item => {
                const qty = cart.find(c => c.id === item.id)?.quantity || 0;
                return (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-[1.5rem] border transition-all flex justify-between items-center bg-white dark:bg-slate-800 shadow-sm ${qty > 0 ? 'border-primary/50 ring-1 ring-primary/20' : 'border-slate-100 dark:border-slate-700'}`}
                  >
                    <div className="flex-1">
                      <p className="font-bold text-lg leading-tight mb-1">{item.name}</p>
                      <p className="text-primary font-black text-lg">₹{item.price}</p>
                    </div>

                    <div className="relative">
                      {qty > 0 ? (
                        <div className="flex items-center gap-4 bg-primary text-white p-1.5 rounded-2xl shadow-lg shadow-primary/30">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/20 transition-colors"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="font-black min-w-[1rem] text-center">{qty}</span>
                          <button 
                            onClick={() => addToCart(item, restaurant.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/20 transition-colors"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => addToCart(item, restaurant.id)} 
                          className="px-8 py-2.5 bg-white dark:bg-slate-800 border-2 border-primary/20 text-primary rounded-2xl font-bold hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95"
                        >
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-12 p-6 rounded-3xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium">
        <div className="flex gap-3">
          <Info size={18} className="shrink-0 mt-0.5" />
          <p>Prices and availability are subject to change by the restaurant. Any delivery charges will be added during checkout.</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailView;