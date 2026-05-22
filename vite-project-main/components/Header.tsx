import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Smartphone, Download, Search, Moon, Sun, Menu, X, ShieldCheck, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  
  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      console.log('👍 beforeinstallprompt fired');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`🙋 User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="border-b border-primary/10 px-6 md:px-20 lg:px-32 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-[1000] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-12">
          <div
            className="flex items-center gap-3 text-primary cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="size-12 group-hover:scale-105 transition-all overflow-hidden rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm bg-white">
              <img src="/logo.png" alt="KPD EATS" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-black tracking-tight leading-none text-primary">KPD</h2>
              <h2 className="text-lg font-bold tracking-tight leading-none text-primary/80">EATS</h2>
            </div>
          </div>


          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `text-sm font-bold tracking-wide transition-all ${isActive ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/browse"
              className={({ isActive }) => 
                `text-sm font-bold tracking-wide transition-all ${isActive ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`
              }
            >
              Browse
            </NavLink>
            <button className="text-slate-500 dark:text-slate-400 text-sm font-bold hover:text-primary transition-colors">Support</button>
            {isAuthenticated && (
              <NavLink
                to="/admin"
                className={({ isActive }) => 
                  `flex items-center gap-1.5 text-sm font-bold tracking-wide transition-all ${isActive ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-primary'}`
                }
              >
                <ShieldCheck size={16} />
                Admin
              </NavLink>
            )}
          </nav>
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-3 sm:gap-6">
          
          {/* Search Placeholder (Hidden on small mobile) */}
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl h-11 px-4 border border-transparent focus-within:border-primary/30 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all w-64">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full ml-2"
            />
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-all active:scale-90"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {!isAuthenticated ? (
            <button
              onClick={() => navigate('/login')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
            >
              <LogIn size={18} />
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}

          {/* INSTALL PWA BUTTON - Replaces Login */}
          {deferredPrompt && (
            <button 
              onClick={handleInstallClick}
              className="flex items-center gap-2 h-11 px-6 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all animate-bounce-subtle"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Install App</span>
              <span className="sm:hidden">Install</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 p-6 border-b border-slate-100 dark:border-slate-800 md:hidden z-[1000] animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4">
            <NavLink to="/" className="text-lg font-bold p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/browse" className="text-lg font-bold p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl" onClick={() => setIsMenuOpen(false)}>Browse</NavLink>
            {isAuthenticated && (
              <NavLink to="/admin" className="text-lg font-bold p-4 bg-primary/10 text-primary rounded-2xl flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <ShieldCheck size={20} /> Admin Dashboard
              </NavLink>
            )}
            {!isAuthenticated && (
              <NavLink to="/login" className="text-lg font-bold p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl" onClick={() => setIsMenuOpen(false)}>Admin Login</NavLink>
            )}
            <button className="text-lg font-bold p-4 text-left" onClick={() => setIsMenuOpen(false)}>Contact</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
