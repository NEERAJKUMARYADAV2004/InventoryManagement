import { Edit, Trash2, ShoppingCart, CreditCard, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onEdit, onDelete, onBuy }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  // High-end fallback image
  const imageSource = product.imageUrl || 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="group bg-[#11141D] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Image Section - Controlled Height */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        <img 
          src={imageSource} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800'; }}
        />
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
          {product.category}
        </div>
      </div>

      {/* Content Section - Compact and Clean */}
      <div className="p-8">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors line-clamp-1 flex-1">
            {product.title}
          </h3>
          <span className="text-2xl font-black text-blue-400 whitespace-nowrap flex-shrink-0">$ {product.price}</span>
        </div>
        
        <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-8 min-h-[40px]">
          {product.description}
        </p>

        {/* Actions - Role Based */}
        <div className="flex gap-4">
          {user?.role === 'Admin' ? (
            <>
              <button 
                onClick={() => onEdit(product)}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/25 active:scale-95"
              >
                Edit Product
              </button>
              <button 
                onClick={() => onDelete(product)}
                className="w-14 bg-white/5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 rounded-2xl border border-white/5 transition-all flex items-center justify-center"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <button 
                disabled={product.stockQuantity === 0}
                onClick={() => onBuy(product)}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 ${
                  product.stockQuantity === 0 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/25'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                {product.stockQuantity === 0 ? 'Sold Out' : 'Buy Now'}
              </button>
              <button 
                disabled={product.stockQuantity === 0}
                onClick={() => addToCart(product)}
                className={`w-14 flex items-center justify-center rounded-2xl border transition-all ${
                  product.stockQuantity === 0 
                    ? 'bg-slate-900 border-white/5 text-slate-700 cursor-not-allowed' 
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
