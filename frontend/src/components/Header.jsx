import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Search, User, LogOut, ShoppingCart, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearchChange }) => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-[60]">
      {/* Left: Branding or Breadcrumbs */}
      <div className="w-1/4">
        <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">
          Inventory / Dashboard
        </span>
      </div>

      {/* Center: Global Search */}
      <div className="w-2/4 flex justify-center">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search products, categories..."
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full bg-slate-950/40 border border-white/5 rounded-2xl pl-14 pr-6 py-3.5 text-sm focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 focus:ring-4 focus:ring-blue-500/5"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="w-1/4 flex items-center justify-end gap-6">
        {/* Cart Trigger */}
        <button 
          onClick={() => navigate('/cart')}
          className="relative p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
        >
          <ShoppingCart className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-[10px] font-black text-white rounded-full flex items-center justify-center border-2 border-[#020617]">
              {cartItems.length}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-4 bg-white/5 p-1.5 pr-4 rounded-full border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
          >
            {/* Avatar - Now Circular */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              {user?.name?.[0].toUpperCase()}
            </div>
            
            {/* Text info - hidden on small screens */}
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-white leading-none">{user?.name}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-tighter mt-1 font-black">{user?.role}</p>
            </div>

            {/* Dropdown Chevron */}
            <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
              <div className="absolute right-0 mt-3 w-64 glass border border-white/10 rounded-[1.5rem] shadow-2xl z-20 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-5 py-3 border-b border-white/5 mb-2">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Account Status</p>
                  <p className="text-sm font-bold text-emerald-400 mt-1">✓ Verified {user?.role}</p>
                </div>
                <button className="w-full flex items-center gap-4 px-5 py-3 text-slate-300 hover:bg-white/5 transition-all text-sm font-bold">
                  <User className="w-4 h-4" />
                  Profile Settings
                </button>
                <button 
                  onClick={() => { logout(); setIsProfileOpen(false); }}
                  className="w-full flex items-center gap-4 px-5 py-3 text-rose-400 hover:bg-rose-500/10 transition-all text-sm font-bold mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
