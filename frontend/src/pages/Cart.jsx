import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, ChevronRight } from 'lucide-react';
import { generateInvoice } from '../utils/invoiceGenerator';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    // For this assessment, checkout will generate a bulk invoice or individual ones
    cartItems.forEach(item => {
      generateInvoice(item, user);
    });
    clearCart();
    alert('Order placed successfully! Invoices generated.');
  };

  return (
    <Layout>
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
              <ShoppingBag className="w-7 h-7 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">Shopping Bag</h1>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em] mt-1">Review your luxury selection</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.length === 0 ? (
                <div className="glass border border-white/5 rounded-[2.5rem] p-20 text-center">
                  <p className="text-xl font-black text-slate-700 uppercase tracking-widest">Your bag is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="glass border border-white/5 p-6 rounded-[2rem] flex items-center gap-8 group hover:bg-white/[0.02] transition-all">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border border-white/5">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black text-white tracking-tight">{item.title}</h3>
                        <p className="text-xl font-black text-white">$ {item.price}</p>
                      </div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-6">{item.category}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 p-1.5 bg-slate-950/50 rounded-xl border border-white/5">
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity - 1, item.stockQuantity)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-black text-white w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity + 1, item.stockQuantity)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                              item.quantity >= item.stockQuantity 
                                ? 'text-slate-800 cursor-not-allowed' 
                                : 'hover:bg-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="flex items-center gap-2 text-rose-500 hover:text-rose-400 font-bold text-xs uppercase tracking-widest p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-1">
              <div className="glass border border-white/10 rounded-[2.5rem] p-8 sticky top-10 shadow-2xl">
                <h3 className="text-xl font-black text-white tracking-tight mb-8">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-500 text-sm font-bold uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm font-bold uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-emerald-400">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm font-bold uppercase tracking-widest">
                    <span>Tax</span>
                    <span>$ 0.00</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/5 mb-10">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Total Amount</span>
                    <span className="text-3xl font-black text-white">$ {subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-500/25 active:scale-95"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>
                
                <p className="text-center text-[10px] text-slate-500 font-medium mt-6 uppercase tracking-widest">
                  Secure checkout with STOCKLY Encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
