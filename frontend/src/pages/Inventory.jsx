import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import ConfirmModal from '../components/ConfirmModal';
import { generateInvoice } from '../utils/invoiceGenerator';
import { 
  Plus, 
  Filter,
  ShoppingBag
} from 'lucide-react';

const Inventory = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = () => {
    setCurrentProduct(null);
    setModalMode('create');
    setIsProductModalOpen(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setModalMode('edit');
    setIsProductModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setIsConfirmModalOpen(true);
  };

  const handleBuyNow = (product) => {
    generateInvoice(product, user);
  };

  const handleProductSubmit = async (formData) => {
    try {
      if (modalMode === 'create') {
        await api.post('/products', formData);
      } else {
        await api.put(`/products/${currentProduct._id}`, formData);
      }
      fetchProducts();
      setIsProductModalOpen(false);
    } catch (error) {
      alert('Operation failed');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/products/${currentProduct._id}`);
      fetchProducts();
    } catch (error) {
      alert('Delete failed');
    }
  };

  return (
    <Layout onSearchChange={setSearchTerm}>
      {/* Header Info (Search is in Header component) */}
      <div className="h-24 px-10 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
            <ShoppingBag className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Master Inventory</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Manage luxury stock</p>
          </div>
        </div>

        {user?.role === 'Admin' && (
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-500/25 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            New Product
          </button>
        )}
      </div>

      <div className="relative z-10">
        {/* Category Filters */}
        <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-slate-400">
            <Filter className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Filters:</span>
          </div>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20' 
                  : 'bg-white/5 text-slate-500 border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="glass border border-white/5 h-[450px] rounded-[2.5rem] animate-pulse"></div>
            ))
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full py-40 text-center glass border border-white/5 rounded-[2.5rem]">
              <p className="text-2xl font-black text-slate-700 uppercase tracking-widest">No Matches Found</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product._id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onBuy={handleBuyNow}
              />
            ))
          )}
        </div>
      </div>

      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={handleProductSubmit}
        initialData={currentProduct}
        mode={modalMode}
      />

      <ConfirmModal 
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product?"
        message={`Are you sure you want to remove "${currentProduct?.title}" from the inventory? This action cannot be undone.`}
      />
    </Layout>
  );
};

export default Inventory;
