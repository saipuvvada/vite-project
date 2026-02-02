
import React, { useState } from 'react';
import { RESTAURANTS } from '../constants';
import { Restaurant } from '../types';

interface BrowseViewProps {
  onSelectRestaurant: (res: Restaurant) => void;
}

const BrowseView: React.FC<BrowseViewProps> = ({ onSelectRestaurant }) => {
  const [activeTab, setActiveTab] = useState('All Spots');

  const tabs = ['All Spots', 'Fast Food', 'South Indian', 'Biryani'];

  const filteredRestaurants = activeTab === 'All Spots' 
    ? RESTAURANTS 
    : RESTAURANTS.filter(r => r.category === activeTab || r.tags.includes(activeTab));

  return (
    <div className="max-w-[1000px] mx-auto w-full py-10 px-4 md:px-0">
      <div className="mb-8">
        <h1 className="text-[#1c140d] dark:text-white tracking-tight text-[32px] md:text-[40px] font-extrabold leading-tight">Discover Best Food in Karempudi</h1>
        <p className="text-[#9c7349] dark:text-white/60 text-lg mt-2">Palnadu District, Andhra Pradesh</p>
      </div>

      <div className="mb-10 overflow-x-auto no-scrollbar">
        <div className="flex border-b border-[#e8dbce] dark:border-white/10 gap-8 min-w-max">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 transition-all ${
                activeTab === tab 
                  ? 'border-b-primary text-primary font-bold' 
                  : 'border-b-transparent text-[#9c7349] dark:text-white/60 font-medium hover:text-primary'
              }`}
            >
              <span className="text-sm uppercase tracking-wider">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 pb-12">
        {filteredRestaurants.map((res) => (
          <div 
            key={res.id} 
            className="group cursor-pointer"
            onClick={() => onSelectRestaurant(res)}
          >
            <div className="flex flex-col md:flex-row items-stretch rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:shadow-2xl transition-all duration-300">
              <div 
                className="w-full md:w-[320px] bg-center bg-no-repeat aspect-video md:aspect-square bg-cover flex-shrink-0"
                style={{ backgroundImage: `url("${res.image}")` }}
              ></div>
              <div className="flex grow flex-col justify-between p-8 gap-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-[#1c140d] dark:text-white text-2xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">{res.name}</h3>
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wide ${
                      res.status === 'Open Now' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      res.status === 'Trending' ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white/60'
                    }`}>
                      {res.status}
                    </span>
                  </div>
                  <p className="text-[#9c7349] dark:text-white/60 text-base mt-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">location_on</span> {res.location}
                  </p>
                  <p className="text-[#9c7349] dark:text-white/60 text-base flex items-center gap-2 mt-1">
                    <span className="material-symbols-outlined text-lg">schedule</span> {res.hours}
                  </p>
                  <div className="flex gap-2 mt-6">
                    {res.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-black/5 dark:bg-white/10 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 flex-wrap mt-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); window.location.href = `tel:+910000000000`; }}
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-call text-white text-sm font-bold shadow-lg shadow-call/20 hover:opacity-90 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">call</span>
                    <span>Call Now</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/910000000000`, '_blank'); }}
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-whatsapp text-white text-sm font-bold shadow-lg shadow-whatsapp/20 hover:opacity-90 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseView;
