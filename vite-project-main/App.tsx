import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCart from './FloatingCart';
import PageLayout from './components/PageLayout';

// Views
import HomeView from './views/HomeView';
import BrowseView from './views/BrowseView';
import RestaurantDetailView from './views/RestaurantDetailView';
import TiffinsView from './views/TiffinsView';
import BakeryView from './views/BakeryView';
import CheckoutView from './views/CheckoutView';
import JuiceView from './views/JuiceView';
import SnacksView from './views/SnacksView';
import LoginView from './views/LoginView';
import AdminDashboardView from './views/AdminDashboardView';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};


const App: React.FC = () => {
  const location = useLocation();

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
        <Header />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route 
                path="/" 
                element={
                  <PageLayout>
                    <HomeView />
                  </PageLayout>
                } 
              />
              <Route 
                path="/browse" 
                element={
                  <PageLayout>
                    <BrowseView />
                  </PageLayout>
                } 
              />
              <Route 
                path="/restaurant/:id" 
                element={
                  <PageLayout>
                    <RestaurantDetailView />
                  </PageLayout>
                } 
              />
              <Route 
                path="/tiffins" 
                element={
                  <PageLayout>
                    <TiffinsView />
                  </PageLayout>
                } 
              />
              <Route 
                path="/bakery" 
                element={
                  <PageLayout>
                    <BakeryView />
                  </PageLayout>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <PageLayout>
                    <CheckoutView />
                  </PageLayout>
                } 
              />
              <Route 
                path="/juice" 
                element={
                  <PageLayout>
                    <JuiceView />
                  </PageLayout>
                } 
              />
              <Route 
                path="/snacks" 
                element={
                  <PageLayout>
                    <SnacksView />
                  </PageLayout>
                } 
              />
              <Route path="/login" element={<LoginView />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboardView />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <FloatingCart />
      </div>
    </CartProvider>
  </AuthProvider>
  );
};

export default App;