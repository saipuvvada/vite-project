import React from 'react';

const DeliveryCharges: React.FC = () => {
  const charges = [
    { area: "Karampudi Local", price: 35 },
    { area: "Oppicharla & KPD.Thanda", price: 45 },
    { area: "Chinthapalli / Sannegandla", price: 50 },
    { area: "Cement Factory Center", price: 50 },
  ];

  return (
    <div className="w-full max-w-[600px] my-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">local_shipping</span>
        </div>
        <h3 className="text-[#1c140d] dark:text-white text-xl font-bold">Delivery Charges</h3>
      </div>
      
      {/* THE GREEN BOX HAS BEEN REMOVED FROM HERE */}

      <div className="space-y-3">
        {charges.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400 font-medium">{item.area}</span>
            <span className="text-primary font-bold">₹{item.price}</span>
          </div>
        ))}
      </div>
      
      <p className="text-slate-400 text-xs mt-4 text-center italic">
        *Delivery prices are fixed for the Karempudi local area.
      </p>
    </div>
  );
};

export default DeliveryCharges;