
import React from 'react';
import { AppRoute, Restaurant } from '../types';

interface HeaderProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute, restaurant?: Restaurant | null) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 md:px-20 lg:px-40 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="flex items-center gap-8">
        <div 
          className="flex items-center gap-3 text-primary cursor-pointer"
          onClick={() => onNavigate(AppRoute.HOME)}
        >
          <div className="size-8">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
              <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-xl font-extrabold leading-tight tracking-[-0.015em] text-[#1c140d] dark:text-white">Karempudi Eats</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onNavigate(AppRoute.HOME)}
            className={`text-sm font-semibold transition-colors ${currentRoute === AppRoute.HOME ? 'text-primary' : 'text-[#1c140d] dark:text-[#f8f7f5] hover:text-primary'}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate(AppRoute.BROWSE)}
            className={`text-sm font-semibold transition-colors ${currentRoute === AppRoute.BROWSE ? 'text-primary' : 'text-[#1c140d] dark:text-[#f8f7f5] hover:text-primary'}`}
          >
            Browse
          </button>
          <button className="text-[#1c140d] dark:text-[#f8f7f5] text-sm font-semibold hover:text-primary transition-colors">Orders</button>
          <button className="text-[#1c140d] dark:text-[#f8f7f5] text-sm font-semibold hover:text-primary transition-colors">Contact</button>
        </nav>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden">
            <div className="text-primary flex border-none bg-primary/10 items-center justify-center pl-4 pr-1">
              <span className="material-symbols-outlined !text-xl">search</span>
            </div>
            <input 
              className="form-input flex w-full border-none bg-primary/10 focus:ring-0 text-[#1c140d] dark:text-white placeholder:text-primary/60 text-sm font-normal px-2" 
              placeholder="Find biryani, dosa..." 
            />
          </div>
        </label>
        
        <button 
          onClick={onToggleDarkMode}
          className="p-2 rounded-full hover:bg-primary/10 text-[#1c140d] dark:text-white transition-colors"
        >
          <span className="material-symbols-outlined">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
