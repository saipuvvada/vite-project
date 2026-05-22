import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Coffee, Pizza, Croissant, CupSoda } from 'lucide-react';
import DeliveryCharges from './DeliveryCharges';

const HomeView: React.FC = () => {
  const categories = [
    { id: 'tiffins', name: 'Tiffins', icon: Coffee, path: '/tiffins', color: 'bg-amber-500' },
    { id: 'juice', name: 'Juice & Shakes', icon: CupSoda, path: '/juice', color: 'bg-emerald-500' },
    { id: 'food', name: 'Main Food', icon: Utensils, path: '/browse', color: 'bg-orange-500' },
    { id: 'bakery', name: 'Bakery', icon: Croissant, path: '/bakery', color: 'bg-rose-500' },
    { id: 'snacks', name: 'Snacks', icon: Pizza, path: '/snacks', color: 'bg-emerald-500' },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[1200px] w-full px-4 md:px-10">
        
        {/* Hero Section */}
        <div className="py-6 md:py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-[2.5rem] items-center justify-center p-6 md:p-12 overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(34, 25, 16, 0.85) 100%), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop")`,
            }}
          >
            <div className="flex flex-col gap-4 text-center max-w-[800px] z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center self-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-1.5 rounded-full mb-2"
              >
                <span className="material-symbols-outlined text-primary !text-sm">auto_awesome</span>
                <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
                  Karempudi's Tech-Enabled Dining
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-4xl font-extrabold leading-tight tracking-tight md:text-7xl"
              >
                Local Cravings, <span className="text-primary italic">Direct Connection.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto"
              >
                No middleman, just great food. Browse local menus and order directly via WhatsApp or Phone.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center z-10 w-full mt-6"
            >
              <Link
                to="/browse"
                className="flex min-w-[200px] items-center justify-center gap-2 rounded-2xl h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/40 hover:bg-orange-600 transition-all hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined">explore</span>
                <span>Explore Food</span>
              </Link>

              <Link
                to="/tiffins"
                className="flex min-w-[200px] items-center justify-center gap-2 rounded-2xl h-14 px-8 bg-white/10 backdrop-blur-md text-white border border-white/20 text-lg font-bold hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined">breakfast_dining</span>
                <span>Morning Tiffins</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Featured Categories */}
        <section className="py-12 w-full">
          <div className="flex justify-between items-end mb-10 px-2">
            <div>
              <h2 className="text-[#1c140d] dark:text-white tracking-tight text-3xl md:text-4xl font-extrabold">
                What are you craving today?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Explore the best from our local partners</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Link 
                  to={cat.path}
                  className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all category-card"
                >
                  <div className={`p-5 rounded-3xl ${cat.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <cat.icon size={32} />
                  </div>
                  <span className="text-xl font-bold tracking-tight">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Delivery Charges Section */}
        <div className="flex justify-center w-full py-12">
          <DeliveryCharges />
        </div>

      </div>
    </div>
  );
};

export default HomeView;