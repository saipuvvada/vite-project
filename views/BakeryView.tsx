import React, { useEffect, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { BAKERY_MENU_ITEMS } from "../constants";
import { MenuItem } from "../types";

type Props = { onBack: () => void };

const BAKERY_PHONE = "8639186035"; // ✅ change to bakery WhatsApp number

const BakeryView: React.FC<Props> = ({ onBack }) => {
  const { cart, addToCart, removeFromCart, setRestaurantPhone } = useCart();

  useEffect(() => {
    setRestaurantPhone(BAKERY_PHONE);
  }, [setRestaurantPhone]);

  const grouped = useMemo(() => {
    const g: Record<string, MenuItem[]> = {};
    BAKERY_MENU_ITEMS.forEach((it) => {
      const key = it.category || "Others";
      if (!g[key]) g[key] = [];
      g[key].push(it);
    });
    return g;
  }, []);

  return (
    <div className="p-4 pb-32 max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-4 font-bold text-primary">
        ← Back
      </button>

      <h1 className="text-3xl font-black mb-3">Explore Bakery Items</h1>

      {/* ✅ Minimum Order & Delivery Charges Notice (Top) */}
<div className="mb-8 p-5 rounded-2xl bg-orange-50 border-2 border-primary shadow-md">
  <h2 className="text-xl font-extrabold text-primary mb-3">
    🚨 Minimum Order & Delivery Info
  </h2>

  <p className="font-semibold text-gray-800 mb-2">
    🧾 Minimum Order Value:{" "}
    <span className="text-primary font-extrabold">₹50</span>
  </p>

  <p className="font-semibold text-gray-800 mb-3">
    🚚 Delivery Charges (Extra):
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-semibold text-gray-800">
    <div>📍 Karempudi Local — <span className="text-primary font-extrabold">₹25</span></div>
    <div>📍 Karempudi Thanda — <span className="text-primary font-extrabold">₹30</span></div>
    <div>📍 Oppicharla — <span className="text-primary font-extrabold">₹40</span></div>
    <div>📍 Chintapalli — <span className="text-primary font-extrabold">₹50</span></div>
    <div>📍 Sannegandla — <span className="text-primary font-extrabold">₹50</span></div>
    <div>📍 Factory — <span className="text-primary font-extrabold">₹50</span></div>
  </div>

  <p className="mt-4 text-sm font-medium text-gray-700">
    ✅ Delivery charges are added separately to the bill.
  </p>

  {/* ✅ NEW LINE ADDED */}
  <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary text-sm font-bold text-primary">
    ⚠️ For orders above ₹300, delivery charges increase based on order value.
    Example: If order is ₹400, delivery charge will be ₹45 (not ₹25).
  </div>
</div>

      {Object.entries(grouped).map(([category, list]) => (
        <div key={category} className="mb-8">
          <h2 className="text-lg font-extrabold mb-3">{category}</h2>

          <div className="space-y-4">
            {list.map((item) => {
              const qty = cart.find((c) => c.id === item.id)?.quantity || 0;

              return (
                <div
                  key={item.id}
                  className="p-4 border rounded-2xl flex justify-between items-center bg-white dark:bg-slate-800 shadow-sm"
                >
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-primary font-bold">₹{item.price}</p>
                  </div>

                  {qty > 0 ? (
                    <div className="flex items-center gap-3 bg-primary text-white p-2 rounded-xl">
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span className="font-bold">{qty}</span>
                      <button onClick={() => addToCart(item, "bakery")}>+</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item, "bakery")}
                      className="px-6 py-2 border-2 border-primary text-primary rounded-xl font-bold"
                    >
                      ADD
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BakeryView;