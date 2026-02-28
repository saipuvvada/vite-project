import React, { useState } from 'react';
import { AppRoute, Restaurant } from './types';
import { CartProvider } from './context/CartContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCart from './FloatingCart';

// Views
import HomeView from './views/HomeView';
import BrowseView from './views/BrowseView';
import RestaurantDetailView from './views/RestaurantDetailView';
import TiffinsView from './views/TiffinsView';
import BakeryView from './views/BakeryView';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const navigateTo = (route: AppRoute, restaurant: Restaurant | null = null) => {
    setCurrentRoute(route);
    setSelectedRestaurant(restaurant);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const headerProps = {
    currentRoute,
    onNavigate: (route: AppRoute) => navigateTo(route),
  } as any;

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
        <Header {...headerProps} />

        <main className="flex-grow">
          {currentRoute === AppRoute.HOME && (
            <HomeView
              onExplore={() => navigateTo(AppRoute.BROWSE)}
              onExploreTiffins={() => navigateTo(AppRoute.TIFFINS)}
              onExploreBakery={() => navigateTo(AppRoute.BAKERY)}
              onSelectCategory={(id: string) => console.log('Selected category:', id)}
            />
          )}

          {currentRoute === AppRoute.BROWSE && (
            <BrowseView
              onSelectRestaurant={(res) => navigateTo(AppRoute.RESTAURANT, res)}
              onBack={() => navigateTo(AppRoute.HOME)} // ✅ added
            />
          )}

          {currentRoute === AppRoute.RESTAURANT && selectedRestaurant && (
            <RestaurantDetailView
              restaurant={selectedRestaurant}
              onBack={() => navigateTo(AppRoute.BROWSE)}
            />
          )}

          {currentRoute === AppRoute.TIFFINS && (
            <TiffinsView onBack={() => navigateTo(AppRoute.HOME)} />
          )}

          {currentRoute === AppRoute.BAKERY && (
            <BakeryView onBack={() => navigateTo(AppRoute.HOME)} />
          )}
        </main>

        <Footer />
        <FloatingCart />
      </div>
    </CartProvider>
  );
};

export default App;