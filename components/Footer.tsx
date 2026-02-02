
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-[#1c140d]/50 border-t border-slate-200 dark:border-slate-800 py-16 px-6 md:px-20 transition-colors">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary !text-3xl">restaurant_menu</span>
            <h2 className="text-[#1c140d] dark:text-white text-xl font-extrabold tracking-tight">KPD Food Delivery</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
            Empowering local restaurants in Karempudi through technology and fast logistics. Built with love for Palnadu.
          </p>
        </div>
        
        <div>
          <h3 className="font-extrabold mb-6 text-[#1c140d] dark:text-white uppercase text-xs tracking-widest">Quick Links</h3>
          <ul className="flex flex-col gap-4 text-base text-slate-600 dark:text-slate-400">
            <li><button className="hover:text-primary transition-colors text-left">Restaurants</button></li>
            <li><button className="hover:text-primary transition-colors text-left">Offers</button></li>
            <li><button className="hover:text-primary transition-colors text-left">Partner with Us</button></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-extrabold mb-6 text-[#1c140d] dark:text-white uppercase text-xs tracking-widest">Help & Support</h3>
          <ul className="flex flex-col gap-4 text-base text-slate-600 dark:text-slate-400">
            <li><button className="hover:text-primary transition-colors text-left">Contact Support</button></li>
            <li><button className="hover:text-primary transition-colors text-left">Refund Policy</button></li>
            <li><button className="hover:text-primary transition-colors text-left">FAQs</button></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-extrabold mb-6 text-[#1c140d] dark:text-white uppercase text-xs tracking-widest">Local Reach</h3>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Currently serving: Karempudi Main, RTC Bus Stand, Market Street, and Palnadu District Area.
          </p>
          <div className="flex gap-6 mt-6">
            <button className="p-3 bg-primary/10 rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="p-3 bg-primary/10 rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <span className="material-symbols-outlined">mail</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 font-medium">
        © 2024 Karempudi Eats AI Platform. Built for Palnadu District, AP.
      </div>
    </footer>
  );
};

export default Footer;
