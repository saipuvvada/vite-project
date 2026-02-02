
import React, { useState, useEffect } from 'react';
import { AppRoute, Restaurant } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import BrowseView from './views/BrowseView';
import RestaurantDetailView from './views/RestaurantDetailView';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial hash for basic "routing"
    const hash = window.location.hash.replace('#', '');
    if (Object.values(AppRoute).includes(hash as AppRoute)) {
      setCurrentRoute(hash as AppRoute);
    }
  }, []);

  const navigateTo = (route: AppRoute, restaurant: Restaurant | null = null) => {
    setCurrentRoute(route);
    setSelectedRestaurant(restaurant);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderView = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return <HomeView onExplore={() => navigateTo(AppRoute.BROWSE)} onSelectCategory={(cat) => navigateTo(AppRoute.BROWSE)} />;
      case AppRoute.BROWSE:
        return <BrowseView onSelectRestaurant={(res) => navigateTo(AppRoute.RESTAURANT, res)} />;
      case AppRoute.RESTAURANT:
        return selectedRestaurant ? (
          <RestaurantDetailView restaurant={selectedRestaurant} onBack={() => navigateTo(AppRoute.BROWSE)} />
        ) : (
          <BrowseView onSelectRestaurant={(res) => navigateTo(AppRoute.RESTAURANT, res)} />
        );
      default:
        return <HomeView onExplore={() => navigateTo(AppRoute.BROWSE)} onSelectCategory={(cat) => navigateTo(AppRoute.BROWSE)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-200">
      <Header 
        currentRoute={currentRoute} 
        onNavigate={navigateTo} 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={toggleDarkMode} 
      />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
