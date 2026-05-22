import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { Restaurant } from "../types";
import { ChevronLeft, Info } from "lucide-react";
import { motion } from "framer-motion";

const BrowseView: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getRestaurants().then(data => {
      const formatted = data
        .map((r: any) => ({ ...r, id: r._id }))
        .filter((r: any) => {
          const name = (r.name || "").toLowerCase();
          return name !== "tiffins" && name !== "bakery" && name !== "juices" && name !== "juice" && name !== "snacks";
        });
      setRestaurants(formatted);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      
      {/* Back Button */}
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
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Explore Restaurants</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Find your favorite local kitchens in Karempudi</p>
      </div>

      {/* Notice Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 p-5 rounded-3xl bg-primary/5 border border-primary/20 flex items-start gap-4 shadow-sm"
      >
        <div className="p-2 bg-primary/10 rounded-xl text-primary mt-0.5">
          <Info size={18} />
        </div>
        <div>
          <h4 className="font-bold text-primary mb-0.5 text-sm uppercase tracking-wider">Ordering Tip</h4>
          <p className="text-primary font-medium text-sm leading-relaxed">
            Click on a restaurant to view their live menu and special items of the day.
          </p>
        </div>
      </motion.div>

      {loading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          {restaurants.map((res, idx) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                to={`/restaurant/${res.id}`}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all"
              >
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight group-hover:text-primary transition-colors">{res.name}</h2>
                  <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400 font-medium">
                    <span className="material-symbols-outlined !text-base">schedule</span>
                    <span>{res.timing}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 px-6 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  View Menu
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseView;