import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Mail, Share2, HelpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-20 px-6 md:px-20 transition-colors">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl text-white">
              <Utensils size={24} />
            </div>
            <h2 className="text-[#1c140d] dark:text-white text-xl font-extrabold tracking-tight underline decoration-primary decoration-4 underline-offset-4">Karempudi Eats</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
            Connecting local flavors with modern convenience. We empower Karempudi's food creators through direct digital connections.
          </p>
        </div>
        
        <div>
          <h3 className="font-black mb-6 text-[#1c140d] dark:text-white uppercase text-[10px] tracking-[0.2em] opacity-50">Quick Links</h3>
          <ul className="flex flex-col gap-4 text-sm font-bold text-slate-600 dark:text-slate-400">
            <li><Link to="/browse" className="hover:text-primary transition-colors">All Restaurants</Link></li>
            <li><Link to="/tiffins" className="hover:text-primary transition-colors">Morning Tiffins</Link></li>
            <li><Link to="/bakery" className="hover:text-primary transition-colors">Bakery Items</Link></li>
            <li><Link to="/admin" className="hover:text-primary transition-colors">Admin Dashboard</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-black mb-6 text-[#1c140d] dark:text-white uppercase text-[10px] tracking-[0.2em] opacity-50">Legal & Help</h3>
          <ul className="flex flex-col gap-4 text-sm font-bold text-slate-600 dark:text-slate-400">
            <li><button className="hover:text-primary transition-colors text-left flex items-center gap-2 font-bold"><HelpCircle size={16}/> Help Center</button></li>
            <li><button className="hover:text-primary transition-colors text-left">Terms of Service</button></li>
            <li><button className="hover:text-primary transition-colors text-left">Privacy Policy</button></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-black mb-6 text-[#1c140d] dark:text-white uppercase text-[10px] tracking-[0.2em] opacity-50">Presence</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-bold">
            Currently serving direct delivery to all areas in Karempudi, Oppicharla, and nearby factory zones.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <Share2 size={20} />
            </button>
            <button className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              <Mail size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
        <span>© 2024 Karempudi Eats Platform.</span>
        <span>Made with ❤️ for Palnadu District, AP.</span>
      </div>
    </footer>
  );
};

export default Footer;
