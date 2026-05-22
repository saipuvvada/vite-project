import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import PageLayout from '../components/PageLayout';
import { LogOut, Package, CheckCircle, Clock, XCircle, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface OrderItem {
  menuId: string;
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  customerName: string;
  customerPhone: string;
  deliveryArea: string;
  deliveryAddress: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
}

const AdminDashboardView: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes("Failed to fetch")) {
        // Token might be expired or invalid
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Refresh orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await api.updateOrderStatus(orderId, status);
      // Optimistic update
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={12}/> Pending</span>;
      case 'Accepted':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={12}/> Accepted</span>;
      case 'Completed':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-1"><Package size={12}/> Completed</span>;
      case 'Rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={12}/> Rejected</span>;
      default:
        return <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <PageLayout>
      <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium">Manage incoming orders and deliveries</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl font-bold transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-700">
            <Package size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No orders yet</h3>
            <p className="text-slate-500 mt-2">When customers place orders, they will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders.map(order => (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-black">{order.customerName || "Guest"}</h3>
                    <p className="text-xs text-slate-500 font-medium">ID: {order._id.slice(-6).toUpperCase()}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Phone size={16} className="mt-0.5 text-primary shrink-0" />
                    <span className="font-medium">{order.customerPhone || "N/A"}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
                    <div>
                      <p className="font-bold">{order.deliveryArea}</p>
                      <p className="text-xs mt-0.5 opacity-80">{order.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl mb-6">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Order Items ({order.items.length})</div>
                  <div className="space-y-1 mb-3">
                    {/* Since we only have menuId here, we would ideally populate this on the backend. For now, we just show quantity. */}
                    {order.items.map((item, i) => (
                      <div key={i} className="text-sm font-medium flex justify-between">
                        <span>Item ID: {item.menuId.slice(-4)}</span>
                        <span>x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-sm">Total Amount</span>
                    <span className="font-black text-primary text-lg">₹{order.totalAmount}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {order.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => handleUpdateStatus(order._id, 'Accepted')}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(order._id, 'Rejected')}
                        className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl font-bold text-sm transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {order.status === 'Accepted' && (
                    <button 
                      onClick={() => handleUpdateStatus(order._id, 'Completed')}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default AdminDashboardView;
