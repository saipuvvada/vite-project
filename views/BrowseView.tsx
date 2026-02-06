import React, { useEffect, useMemo, useState } from "react";
import { loadMenuData, getRestaurants } from "../menuData";
import { Restaurant } from "../types";

interface BrowseViewProps {
  onSelectRestaurant: (res: Restaurant) => void;
}

const BrowseView: React.FC<BrowseViewProps> = ({ onSelectRestaurant }) => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const rows = await loadMenuData();
        const list = getRestaurants(rows);
        if (mounted) setRestaurants(list);
      } catch (e) {
        console.error(e);
        if (mounted) setRestaurants([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // No filtering tabs (so ALL CSV restaurants always show)
  const list = useMemo(() => restaurants, [restaurants]);

  return (
    <div className="max-w-[1000px] mx-auto w-full py-10 px-4 md:px-0">
      <div className="mb-8">
        <h1 className="text-[#1c140d] dark:text-white tracking-tight text-[32px] md:text-[40px] font-extrabold leading-tight">
          Discover Best Food in Karempudi
        </h1>
        <p className="text-[#9c7349] dark:text-white/60 text-lg mt-2">
          Palnadu District, Andhra Pradesh
        </p>
      </div>

      {loading && (
        <p className="text-center text-[#9c7349] dark:text-white/60">
          Loading restaurants…
        </p>
      )}

      <div className="flex flex-col gap-8 pb-12">
        {list.map((res) => (
          <div
            key={res.id}
            className="group cursor-pointer"
            onClick={() => onSelectRestaurant(res)}
          >
            <div className="flex flex-col md:flex-row items-stretch rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:shadow-2xl transition-all duration-300">
              <div
                className="w-full md:w-[320px] bg-center bg-no-repeat aspect-video md:aspect-square bg-cover flex-shrink-0"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&auto=format&fit=crop")',
                }}
              ></div>

              <div className="flex grow flex-col justify-between p-8 gap-6">
                <div>
                  <h3 className="text-[#1c140d] dark:text-white text-2xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
                    {res.name}
                  </h3>

                  <p className="text-[#9c7349] dark:text-white/60 text-base mt-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">
                      schedule
                    </span>
                    {res.timing}
                  </p>
                </div>

                <div className="flex gap-4 flex-wrap mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `tel:${res.phone}`;
                    }}
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-call text-white text-sm font-bold shadow-lg shadow-call/20 hover:opacity-90 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">
                      call
                    </span>
                    <span>Call Now</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://wa.me/91${res.phone}`, "_blank");
                    }}
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-xl h-12 px-6 bg-whatsapp text-white text-sm font-bold shadow-lg shadow-whatsapp/20 hover:opacity-90 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">
                      chat
                    </span>
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!loading && list.length === 0 && (
          <p className="text-center text-[#9c7349] dark:text-white/60">
            No restaurants found in menu.csv
          </p>
        )}
      </div>
    </div>
  );
};

export default BrowseView;
