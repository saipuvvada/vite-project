import React, { useEffect, useMemo, useState } from "react";
import { Restaurant, MenuItem } from "../types";
import { loadMenuData, getMenuByRestaurant } from "../menuData";

interface RestaurantDetailViewProps {
  restaurant: Restaurant;
  onBack: () => void;
}

const RestaurantDetailView: React.FC<RestaurantDetailViewProps> = ({
  restaurant,
  onBack,
}) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // These 2 are coming from CSV via BrowseView (we’ll add them there)
  const phone = (restaurant as any)?.phone || "";
  const timing = (restaurant as any)?.timing || restaurant.hours || "";

  const fallbackImage =
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&auto=format&fit=crop";

  function rowToMenuItem(row: any, index: number): MenuItem {
    const name = row.item || "";
    const category = row.category || "Menu";
    const lower = `${name} ${category}`.toLowerCase();

    const isNonVeg =
      lower.includes("chicken") ||
      lower.includes("mutton") ||
      lower.includes("fish") ||
      lower.includes("prawn") ||
      lower.includes("egg");

    return {
      id: `${restaurant.id}-${index}`,
      name,
      price: Number(row.price) || 0,
      description: category,
      image: "",
      type: isNonVeg ? "non-veg" : "veg", // ✅ IMPORTANT: non-veg (with hyphen)
      category,
    };
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const rows = await loadMenuData();
        const grouped = getMenuByRestaurant(rows);
        const restaurantRows = grouped[restaurant.id] || [];
        const menuItems = restaurantRows.map((r: any, i: number) =>
          rowToMenuItem(r, i)
        );
        if (mounted) setItems(menuItems);
      } catch (e) {
        console.error(e);
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [restaurant.id]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => set.add(i.category || "Menu"));
    return Array.from(set);
  }, [items]);

  return (
    <div className="max-w-[1000px] mx-auto w-full py-6 md:py-10">
      <div className="px-4 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#9c7349] dark:text-[#b08b6a] text-sm font-semibold hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined !text-sm">arrow_back</span>
          Back to Browse
        </button>
      </div>

      <div className="px-4 mb-8">
        <div
          className="relative bg-cover bg-center rounded-3xl min-h-[300px] flex flex-col justify-end p-8 shadow-2xl overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 60%), url("${
              restaurant.image || fallbackImage
            }")`,
          }}
        >
          <div className="flex flex-col gap-3 relative z-10">
            <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {restaurant.name}
            </h1>

            <p className="text-white/90 text-base flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">schedule</span>{" "}
              {timing}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sticky top-[72px] bg-background-light dark:bg-background-dark z-40 py-4 transition-colors">
        <div className="flex border-b border-[#e8dbce] dark:border-white/10 gap-8 overflow-x-auto no-scrollbar">
          {(categories.length ? categories : ["Menu"]).map((cat, i) => (
            <button
              key={cat}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 transition-all ${
                i === 0
                  ? "border-b-primary text-primary font-bold"
                  : "border-b-transparent text-[#9c7349] dark:text-white/60 font-medium"
              }`}
            >
              <span className="text-sm uppercase tracking-tighter whitespace-nowrap">
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#1c140d] dark:text-white text-2xl font-bold tracking-tight">
            Menu
          </h2>
          <span className="text-sm font-bold text-primary">
            {items.length} Items
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">Loading menu…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 p-6 rounded-3xl border border-[#e8dbce] dark:border-[#3a2e24] bg-white dark:bg-[#2d2116] shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col flex-1 gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`material-symbols-outlined text-sm ${
                        item.type === "veg" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      radio_button_checked
                    </span>
                    <h3 className="font-bold text-[#1c140d] dark:text-white text-xl leading-tight group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-[#9c7349] dark:text-primary/70 text-lg font-extrabold">
                    ₹{item.price}
                  </p>

                  <p className="text-slate-600 dark:text-[#d4c1af] text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div
                  className="size-28 rounded-2xl bg-cover bg-center shrink-0 border border-slate-100 dark:border-slate-800 shadow-inner group-hover:scale-105 transition-transform"
                  style={{
                    backgroundImage: `url("${fallbackImage}")`,
                  }}
                ></div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-400">
                <span className="material-symbols-outlined text-6xl opacity-20">
                  lunch_dining
                </span>
                <p className="mt-4">
                  Our digital menu is currently being updated for this restaurant.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#2d2116]/80 backdrop-blur-md border-t border-[#f4ede7] dark:border-[#3a2e24] px-6 py-6 flex justify-center z-50">
        <div className="max-w-[1000px] w-full flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="hidden sm:block">
            <p className="text-[#1c140d] dark:text-white text-lg font-bold">
              Ready to order?
            </p>
            <p className="text-[#9c7349] dark:text-[#b08b6a] text-sm">
              Direct contact with {restaurant.name}
            </p>
          </div>

          <div className="flex w-full sm:w-auto gap-4">
            <button
              onClick={() => phone && (window.location.href = `tel:${phone}`)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-slate-100 dark:bg-slate-800 text-[#1c140d] dark:text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <span className="material-symbols-outlined">call</span>
              Phone Call
            </button>

            <button
              onClick={() =>
                phone &&
                window.open(
                  `https://wa.me/91${phone}?text=Hello%20${encodeURIComponent(
                    restaurant.name
                  )},%20I%20want%20to%20place%20an%20order!`,
                  "_blank"
                )
              }
              className="flex-[2] sm:flex-none flex items-center justify-center gap-3 bg-whatsapp text-white px-10 py-4 rounded-2xl font-bold transition-all hover:brightness-110 shadow-xl shadow-whatsapp/20"
            >
              <span className="material-symbols-outlined">chat</span>
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>

      <div className="h-24"></div>
    </div>
  );
};

export default RestaurantDetailView;
