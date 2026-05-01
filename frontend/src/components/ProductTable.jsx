import { Edit, Trash2, ChevronRight, Package, ShoppingCart, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProductTable = ({ products, loading, onEdit, onDelete, onBuy, isAdmin }) => {
  const { user } = useAuth();

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5"></div>
          <div className="space-y-2">
            <div className="w-32 h-4 bg-white/5 rounded"></div>
            <div className="w-48 h-3 bg-white/5 rounded"></div>
          </div>
        </div>
      </td>
      <td className="px-8 py-6"><div className="w-20 h-6 bg-white/5 rounded-full"></div></td>
      <td className="px-8 py-6"><div className="w-16 h-6 bg-white/5 rounded"></div></td>
      <td className="px-8 py-6"><div className="w-24 h-8 bg-white/5 rounded-full"></div></td>
      <td className="px-8 py-6"><div className="ml-auto w-20 h-10 bg-white/5 rounded-xl"></div></td>
    </tr>
  );

  return (
    <div className="glass border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Product Inventory</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Real-time status</p>
        </div>
        <span className="px-4 py-2 bg-slate-950/50 rounded-xl text-blue-400 text-sm font-bold border border-blue-500/20">
          {products.length} Items
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-500 text-xs uppercase font-black tracking-[0.2em] border-b border-white/5">
              <th className="px-8 py-6">Product Information</th>
              <th className="px-8 py-6">Category</th>
              <th className="px-8 py-6">Price</th>
              <th className="px-8 py-6">Stock Status</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-8 py-32 text-center text-slate-500 font-bold">
                  No products found.
                </td>
              </tr>
            ) : products.map((product) => (
              <tr key={product._id} className="hover:bg-white/5 transition-all group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-white/5 group-hover:border-blue-500/50 transition-colors">
                      <Package className="w-6 h-6 text-slate-500 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{product.title}</p>
                      <p className="text-sm text-slate-500 font-medium truncate max-w-[250px]">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-4 py-1.5 bg-slate-950/50 text-slate-300 rounded-full text-xs font-bold border border-white/5">
                    {product.category}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-lg font-black text-white">${product.price}</span>
                </td>
                <td className="px-8 py-6">
                  <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border ${
                    product.stockQuantity < 10 
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      product.stockQuantity < 10 ? 'bg-rose-400 animate-pulse' : 'bg-emerald-400'
                    }`}></div>
                    <span className="text-xs font-black uppercase tracking-wider">
                      {product.stockQuantity === 0 ? 'Out of Stock' : `${product.stockQuantity} Left`}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  {user?.role === 'Admin' ? (
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onEdit(product)} className="p-3 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => onDelete(product)} className="p-3 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onBuy(product)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all">
                        <CreditCard className="w-4 h-4" />
                        Buy
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-all">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
