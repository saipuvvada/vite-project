import DeliveryCharges from './DeliveryCharges';
import React from 'react';

interface HomeViewProps {
  onExplore: () => void;
  onExploreTiffins: () => void;
  onExploreBakery: () => void;
  onSelectCategory: (id: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({
  onExplore,
  onExploreTiffins,
  onExploreBakery,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[1200px] w-full px-4 md:px-10">

        {/* Hero Section */}
        <div className="py-6 md:py-10">
          <div
            className="relative flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-3xl items-center justify-center p-6 md:p-12 overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(34, 25, 16, 0.85) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBA0cD6R9WDn-e5nT2z8IfrKGaqnxkA5NUzyK0z4pI0KZR0s9XqL2S0EEbcYehiP17i6qT2tHTEMbt__ahow90YhXVux2-nRh_DG1RwMNRlgmUSoRo5z75azW-oaVHQCIyruNv46o4Rs6MpOJ7-Q8q220ncQp71edzN9I7xZOv7lDy1_ySloeny1PkFifNy5Gp0tSpz3DVYgW39AfIx8rcun8UsaF-jllZEl1Q-i1STT35OUL7JO4L4y07ft9krQVuwkW2Ps37aYcsi")`,
            }}
          >
            <div className="flex flex-col gap-4 text-center max-w-[800px] z-10">
              <div className="inline-flex items-center self-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full mb-2">
                <span className="material-symbols-outlined text-primary !text-sm">auto_awesome</span>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                  Karempudi's Tech-Enabled Dining
                </span>
              </div>

              <h1 className="text-white text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Local Cravings, <span className="text-primary italic">Direct Connection.</span>
              </h1>

              <p className="text-slate-200 text-base md:text-lg font-medium leading-relaxed">
                No middleman, just great food. Browse menus and order directly via WhatsApp or Call.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center z-10 w-full mt-4">
              <button
                onClick={onExplore}
                className="flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-2xl h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/40 hover:scale-105 transition-all"
              >
                <span className="material-symbols-outlined">explore</span>
                <span>Explore Food</span>
              </button>

              <button
                onClick={onExploreTiffins}
                className="flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-2xl h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/40 hover:scale-105 transition-all"
              >
                <span className="material-symbols-outlined">breakfast_dining</span>
                <span>Explore Tiffins</span>
              </button>

              <button
                onClick={onExploreBakery}
                className="flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-2xl h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/40 hover:scale-105 transition-all"
              >
                <span className="material-symbols-outlined">bakery_dining</span>
                <span>Explore Bakery Items</span>
              </button>
            </div>
          </div>
        </div>

        {/* DELIVERY CHARGES */}
        <div className="flex justify-center w-full">
          <DeliveryCharges />
        </div>

        {/* Categories Section (keep if you want) */}
        <div className="py-12">
          <div className="text-center mb-10">
            <h2 className="text-[#1c140d] dark:text-white tracking-tight text-3xl md:text-4xl font-extrabold">
              What are you craving today?
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeView;