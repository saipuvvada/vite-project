import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import PageLayout from '../components/PageLayout';
import { Lock, User, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await api.login({ email, password });
      login(data.token);
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 p-8"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              <Lock size={32} />
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-center mb-2">Admin Login</h2>
          <p className="text-slate-500 text-center mb-8 font-medium">Sign in to manage orders</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-sm font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary transition-all font-medium"
                  placeholder="admin@karempudi.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 mt-8 bg-primary text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? "Signing in..." : (
                <>
                  <LogIn size={20} /> Sign In
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default LoginView;
