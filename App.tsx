import React, { useState } from 'react';
import { AppRoute, Restaurant } from './types';
import { CartProvider } from './context/CartContext';

// Components - Adjust paths if these are in a 'components' folder
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCart from './FloatingCart'; 

// Views - These must be in your 'views' folder
import HomeView from './views/HomeView';
import BrowseView from './views/BrowseView';
import RestaurantDetailView from './views/RestaurantDetailView';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const navigateTo = (route: AppRoute, restaurant: Restaurant | null = null) => {
    setCurrentRoute(route);
    setSelectedRestaurant(restaurant);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
        {/* RESTORED HEADER */}
        <Header currentRoute={currentRoute} onNavigate={navigateTo} />
        
        <main className="flex-grow">
          {currentRoute === AppRoute.HOME && (
            <HomeView onExplore={() => navigateTo(AppRoute.BROWSE)} />
          )}
          
          {currentRoute === AppRoute.BROWSE && (
            <BrowseView onSelectRestaurant={(res) => navigateTo(AppRoute.RESTAURANT, res)} />
          )}
          
          {currentRoute === AppRoute.RESTAURANT && selectedRestaurant && (
            <RestaurantDetailView 
              restaurant={selectedRestaurant} 
              onBack={() => navigateTo(AppRoute.BROWSE)} 
            />
          )}
        </main>

        {/* RESTORED FOOTER */}
        <Footer />
        
        {/* FLOATING CART */}
        <FloatingCart />
      </div>
    </CartProvider>
  );
};

export default App;