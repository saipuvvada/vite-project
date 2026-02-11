import React, { useEffect, useState } from "react";
import { Restaurant, MenuItem } from "../types";
import { loadMenuData, getMenuByRestaurant } from "../menuData";
import { useCart } from "../context/CartContext";

const RestaurantDetailView: React.FC<{ restaurant: Restaurant, onBack: () => void }> = ({ restaurant, onBack }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const { cart, addToCart, removeFromCart, setRestaurantPhone } = useCart();

  useEffect(() => {
    setRestaurantPhone(restaurant.phone);
    loadMenuData().then(rows => {
      const menu = getMenuByRestaurant(rows)[restaurant.id] || [];
      setItems(menu.map((r, i) => ({ id: `${restaurant.id}-${i}`, name: r.item, price: r.price, category: r.category })));
    });
  }, [restaurant]);

  return (
    <div className="p-4 pb-32 max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-4 font-bold text-primary">← Back</button>
      <h1 className="text-3xl font-black mb-6">{restaurant.name}</h1>
      <div className="space-y-4">
        {items.map(item => {
          const qty = cart.find(c => c.id === item.id)?.quantity || 0;
          return (
            <div key={item.id} className="p-4 border rounded-2xl flex justify-between items-center bg-white dark:bg-slate-800 shadow-sm">
              <div><p className="font-bold">{item.name}</p><p className="text-primary font-bold">₹{item.price}</p></div>
              {qty > 0 ? (
                <div className="flex items-center gap-3 bg-primary text-white p-2 rounded-xl">
                  <button onClick={() => removeFromCart(item.id)}>-</button>
                  <span className="font-bold">{qty}</span>
                  <button onClick={() => addToCart(item, restaurant.id)}>+</button>
                </div>
              ) : (
                <button onClick={() => addToCart(item, restaurant.id)} className="px-6 py-2 border-2 border-primary text-primary rounded-xl font-bold">ADD</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RestaurantDetailView;