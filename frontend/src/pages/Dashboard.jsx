import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import ConfirmModal from '../components/ConfirmModal';
import { generateInvoice } from '../utils/invoiceGenerator';
import { 
  PackageCheck,
  ShoppingBag,
  Trash2,
  LayoutDashboard,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout onSearchChange={setSearchTerm}>
      <div className="relative z-10">
        {/* Admin Stats Section */}
        {user?.role === 'Admin' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
            {loading ? (
              [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              <>
                <StatCard icon={<PackageCheck className="text-emerald-400 w-6 h-6"/>} label="Total Products" value={products.length} bgColor="bg-emerald-500/10" />
                <StatCard icon={<ShoppingBag className="text-blue-400 w-6 h-6"/>} label="Categories" value={[...new Set(products.map(p => p.category))].length} bgColor="bg-blue-500/10" />
                <StatCard icon={<Trash2 className="text-rose-400 w-6 h-6"/>} label="Out of Stock" value={products.filter(p => p.stockQuantity === 0).length} bgColor="bg-rose-500/10" />
                <StatCard icon={<LayoutDashboard className="text-amber-400 w-6 h-6"/>} label="Recent Updates" value="Today" bgColor="bg-amber-500/10" />
              </>
            )}
          </div>
        )}

        {/* Catalog Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Luxury Catalog</h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em] mt-2">Discover our premium selection</p>
          </div>
          {user?.role === 'Admin' && (
            <button 
              onClick={() => { setCurrentProduct(null); setModalMode('create'); setIsProductModalOpen(true); }}
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-500/25 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              New Product
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="glass border border-white/5 h-[450px] rounded-[2.5rem] animate-pulse"></div>
            ))
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full py-40 text-center glass border border-white/5 rounded-[2.5rem]">
              <p className="text-2xl font-black text-slate-700 uppercase tracking-widest">No Products Found</p>
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

const StatCard = ({ icon, label, value, bgColor }) => (
  <div className="glass border border-white/5 p-8 rounded-[2rem] shadow-xl hover:bg-white/5 transition-all group">
    <div className="flex items-center gap-6">
      <div className={`p-4 rounded-2xl ${bgColor} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
        <p className="text-3xl font-black text-white mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="glass border border-white/5 p-8 rounded-[2rem] shadow-xl animate-pulse">
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 rounded-2xl bg-white/5"></div>
      <div className="flex-1 space-y-3">
        <div className="w-16 h-2 bg-white/5 rounded"></div>
        <div className="w-24 h-6 bg-white/5 rounded"></div>
      </div>
    </div>
  </div>
);

export default Dashboard;
