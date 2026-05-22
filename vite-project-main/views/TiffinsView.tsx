import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api } from "../api";
import { MenuItem } from "../types";
import { ChevronLeft, Info, Plus, Minus, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const TIFFIN_PHONE = "8639186035";

const TiffinsView: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, setRestaurantPhone } = useCart();

  const [items, setItems] = useState<MenuItem[]>([]);
  const [tiffinId, setTiffinId] = useState("tiffins");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getRestaurants(),
    ]).then(([resData]) => {
      const tiffinRes = resData.find((r: any) => r.name === "Tiffins");
      if (tiffinRes) {
        setTiffinId(tiffinRes._id);
        setRestaurantPhone(tiffinRes.phone || TIFFIN_PHONE);
        
        api.getMenuByRestaurant(tiffinRes._id).then(menuData => {
          setItems(menuData.map((r: any) => ({
            id: r._id,
            name: r.name,
            price: r.price,
            category: r.category
          })));
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [setRestaurantPhone]);

  const grouped = useMemo(() => {
    const g: Record<string, MenuItem[]> = {};
    items.forEach((it) => {
      const key = it.category || "Others";
      if (!g[key]) g[key] = [];
      g[key].push(it);
    });
    return g;
  }, [items]);

  return (
    <div className="p-4 pb-48 max-w-2xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center gap-2 font-bold text-primary group transition-all"
      >
        <div className="p-2 rounded-full group-hover:bg-primary/10 transition-colors">
          <ChevronLeft size={20} />
        </div>
        <span>Back</span>
      </button>

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Explore Tiffins</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Fresh morning breakfast and more</p>
      </div>

      {/* Minimum Order & Delivery Notice */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12 p-6 rounded-[2rem] bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 shadow-sm overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-4 text-amber-200 dark:text-amber-800">
          <AlertCircle size={80} />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-xl font-extrabold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
            Minimum Order & Delivery
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-amber-400 rounded-full" />
              <p className="text-amber-900 dark:text-amber-100 font-bold">
                Minimum Order Value: <span className="text-primary font-black ml-1 text-lg">₹50</span>
              </p>
            </div>

            <div className="bg-white/50 dark:bg-black/20 p-4 rounded-2xl">
              <p className="font-bold text-amber-800 dark:text-amber-300 mb-2 uppercase text-xs tracking-wider">
                Standard Delivery Charges
              </p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm font-bold text-amber-900 dark:text-amber-100">
                <div className="flex justify-between">Local<span>₹25</span></div>
                <div className="flex justify-between">Thanda<span>₹30</span></div>
                <div className="flex justify-between">Oppicharla<span>₹40</span></div>
                <div className="flex justify-between">Other Areas<span>₹50</span></div>
              </div>
            </div>

            <p className="text-amber-700 dark:text-amber-400 text-xs font-medium italic">
              * For orders above ₹300, charges may increase based on order value.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Menu Sections */}
      <div className="space-y-12">
        {Object.entries(grouped).map(([category, list], catIdx) => (
          <motion.div 
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.1 }}
          >
            <h3 className="text-xl font-extrabold mb-5 px-1 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              {category}
            </h3>
            
            <div className="grid gap-3">
              {list.map((item) => {
                const qty = cart.find((c) => c.id === item.id)?.quantity || 0;
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-[1.5rem] border transition-all flex justify-between items-center bg-white dark:bg-slate-800 shadow-sm ${qty > 0 ? 'border-primary/50 ring-1 ring-primary/20' : 'border-slate-100 dark:border-slate-700'}`}
                  >
                    <div>
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
                            onClick={() => addToCart(item, tiffinId)}
                            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/20 transition-colors"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item, tiffinId)}
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

      <div className="mt-12 p-6 rounded-3xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 text-sm font-medium">
        <div className="flex gap-3">
          <Info size={18} className="shrink-0 mt-0.5" />
          <p>Tiffins are primarily available during breakfast and evening hours. Please contact us for availability outside these times.</p>
        </div>
      </div>
    </div>
  );
};

export default TiffinsView;