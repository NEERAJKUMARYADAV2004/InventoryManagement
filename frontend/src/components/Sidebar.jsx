import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Package, 
  LayoutDashboard, 
  ShoppingBag,
  ShoppingCart
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <ShoppingBag className="w-5 h-5" />, label: 'Inventory', path: '/inventory' },
    { 
      icon: <ShoppingCart className="w-5 h-5" />, 
      label: 'Cart', 
      path: '/cart',
      badge: cartItems.length > 0 ? cartItems.length : null 
    },
  ];

  return (
    <aside className="w-72 h-screen flex flex-col flex-shrink-0 bg-[#020617] border-r border-white/5 hidden md:flex z-50">
      <div className="p-8 border-b border-white/5 mb-6">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Package className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">STOCKLY</span>
        </div>
      </div>
      
      <div className="flex-1 px-6 space-y-3">
        {menuItems.map((item) => (
          <button 
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all border ${
              location.pathname === item.path 
                ? 'bg-blue-600/10 text-blue-400 border-blue-500/10' 
                : 'text-slate-500 hover:bg-white/5 hover:text-white border-transparent'
            }`}
          >
            <div className="flex items-center gap-4">
              {item.icon}
              {item.label}
            </div>
            {item.badge && (
              <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
