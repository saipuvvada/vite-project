import React, { useEffect, useState } from "react";
import { loadMenuData, getRestaurants } from "../menuData";
import { Restaurant } from "../types";

const BrowseView: React.FC<{ onSelectRestaurant: (res: Restaurant) => void }> = ({ onSelectRestaurant }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    loadMenuData().then(rows => setRestaurants(getRestaurants(rows)));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Explore Restaurants</h1>
      <div className="grid gap-6">
        {restaurants.map(res => (
          <div key={res.id} onClick={() => onSelectRestaurant(res)} className="p-6 bg-white dark:bg-slate-800 rounded-3xl border shadow-sm cursor-pointer hover:shadow-md transition-all">
            <h2 className="text-xl font-bold">{res.name}</h2>
            <p className="text-slate-500 mb-4">{res.timing}</p>
            <div className="flex gap-2">
               <button onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/91${res.phone}`); }} className="bg-whatsapp text-white px-4 py-2 rounded-xl text-sm font-bold">WhatsApp</button>
               <button onClick={(e) => { e.stopPropagation(); window.location.href=`tel:${res.phone}`; }} className="bg-slate-100 text-slate-800 px-4 py-2 rounded-xl text-sm font-bold">Call</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BrowseView;