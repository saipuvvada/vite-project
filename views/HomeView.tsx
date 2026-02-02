
import React from 'react';
import { CATEGORIES } from '../constants';

interface HomeViewProps {
  onExplore: () => void;
  onSelectCategory: (id: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onExplore, onSelectCategory }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[1200px] w-full px-4 md:px-10">
        
        {/* Hero Section */}
        <div className="py-6 md:py-10">
          <div 
            className="relative flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-3xl items-center justify-center p-6 md:p-12 overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(34, 25, 16, 0.85) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBA0cD6R9WDn-e5nT2z8IfrKGaqnxkA5NUzyK0z4pI0KZR0s9XqL2S0EEbcYehiP17i6qT2tHTEMbt__ahow90YhXVux2-nRh_DG1RwMNRlgmUSoRo5z75azW-oaVHQCIyruNv46o4Rs6MpOJ7-Q8q220ncQp71edzN9I7xZOv7lDy1_ySloeny1PkFifNy5Gp0tSpz3DVYgW39AfIx8rcun8UsaF-jllZEl1Q-i1STT35OUL7JO4L4y07ft9krQVuwkW2Ps37aYcsi")`
            }}
          >
            <div className="flex flex-col gap-4 text-center max-w-[800px] z-10">
              <div className="inline-flex items-center self-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full mb-2">
                <span className="material-symbols-outlined text-primary !text-sm">auto_awesome</span>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Karempudi's Tech-Enabled Dining</span>
              </div>
              <h1 className="text-white text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Local Cravings, <span className="text-primary italic">Direct Connection.</span>
              </h1>
              <p className="text-slate-200 text-base md:text-lg font-medium leading-relaxed">
                No middleman, just great food. Browse menus from Karempudi’s top kitchens and order directly via WhatsApp or Call for the fastest local delivery.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center z-10 w-full mt-4">
              <button 
                onClick={onExplore}
                className="flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-2xl h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/40 hover:scale-105 transition-all"
              >
                <span className="material-symbols-outlined">explore</span>
                <span>Explore Food</span>
              </button>
              <button 
                onClick={onExplore}
                className="flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-2xl h-14 px-8 bg-white dark:bg-slate-100 text-[#1c140d] text-lg font-bold shadow-xl hover:bg-slate-200 transition-all"
              >
                <span className="material-symbols-outlined">restaurant</span>
                <span>View Restaurants</span>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="py-12">
          <div className="text-center mb-10">
            <h2 className="text-[#1c140d] dark:text-white tracking-tight text-3xl md:text-4xl font-extrabold">What are you craving today?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mt-3">Discover the best local eats delivered straight to your door</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="category-card ai-glow-border bg-white dark:bg-[#2d2218] flex flex-col rounded-3xl overflow-hidden cursor-pointer group transition-all"
              >
                <div 
                  className="bg-cover bg-center aspect-square relative"
                  style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%), url("${cat.image}")` }}
                >
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-4 right-4 bg-primary text-white p-3 rounded-2xl shadow-lg">
                    <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#1c140d] dark:text-white">{cat.title}</h3>
                  <p className="text-primary/80 dark:text-primary/60 mt-2 font-medium">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="flex flex-col gap-10 py-20">
          <div className="text-center">
            <h2 className="text-[#1c140d] dark:text-white tracking-tight text-3xl font-extrabold md:text-4xl">How It Works</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mt-4 max-w-[720px] mx-auto">Connecting Palnadu district to great taste with tech-forward simplicity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined !text-3xl">restaurant</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[#1c140d] dark:text-white text-xl font-bold">1. Pick Your Dish</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">Browse high-quality local menus curated for the Karempudi food scene.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                <span className="material-symbols-outlined !text-3xl">chat</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[#1c140d] dark:text-white text-xl font-bold">2. Chat on WhatsApp</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">Click to open WhatsApp. Your order list is pre-filled. Just hit send to order.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary/50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined !text-3xl">local_shipping</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[#1c140d] dark:text-white text-xl font-bold">3. Fast Delivery</h3>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">Local riders who know every corner of Karempudi will bring your food in minutes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="pb-20">
          <div className="bg-primary/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/20">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#1c140d] dark:text-white">Ready to taste the best of Palnadu?</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Join 200+ daily hungry customers in Karempudi.</p>
            </div>
            <button 
              onClick={onExplore}
              className="bg-primary hover:bg-orange-600 text-white font-bold py-5 px-10 rounded-2xl flex items-center gap-3 transition-all shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined">call</span>
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
