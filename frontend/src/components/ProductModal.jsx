import { useState, useEffect } from 'react';
import { X, PlusCircle, Save } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, onSubmit, initialData = null, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stockQuantity: '',
    category: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        stockQuantity: '',
        category: '',
        imageUrl: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative glass border border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden scale-in-center animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-blue-500/20 rounded-xl">
              {mode === 'create' ? <PlusCircle className="text-blue-500 w-6 h-6" /> : <Save className="text-blue-500 w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">
                {mode === 'create' ? 'New Product' : 'Edit Product'}
              </h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Management</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Title</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-all"
                placeholder="Enter product title..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Description</label>
              <textarea 
                required
                rows="2"
                className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-all resize-none"
                placeholder="Describe the product..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Price ($)</label>
                <input 
                  type="number" 
                  required
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-all"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Stock</label>
                <input 
                  type="number" 
                  required
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-all"
                  placeholder="0"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({...formData, stockQuantity: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-all"
                  placeholder="Electronics..."
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Image URL</label>
                <input 
                  type="url" 
                  required
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-all"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-500/25"
            >
              {mode === 'create' ? 'Create Product' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
