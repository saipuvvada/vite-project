import React, { useEffect, useState } from "react";
import { loadMenuData, getRestaurants } from "../menuData";
import { Restaurant } from "../types";

interface Props {
  onSelectRestaurant: (res: Restaurant) => void;
  onBack: () => void; // ✅ added
}

const BrowseView: React.FC<Props> = ({ onSelectRestaurant, onBack }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    loadMenuData().then(rows => setRestaurants(getRestaurants(rows)));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* ✅ Back Button */}
      <button
        onClick={onBack}
        className="mb-4 font-bold text-primary"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-3">Explore Restaurants</h1>

      {/* ✅ Notice */}
      <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary text-primary font-bold text-sm shadow-sm">
        📌 Click on the Restaurant name to view Menu items.
      </div>

      <div className="grid gap-6">
        {restaurants.map(res => (
          <div
            key={res.id}
            onClick={() => onSelectRestaurant(res)}
            className="p-6 bg-white dark:bg-slate-800 rounded-3xl border shadow-sm cursor-pointer hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-bold">{res.name}</h2>
            <p className="text-slate-500">{res.timing}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseView;