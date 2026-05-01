import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, onSearchChange }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex overflow-hidden w-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden bg-[#020617]">
        <Header onSearchChange={onSearchChange} />
        
        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative custom-scrollbar">
          <div className="max-w-[1400px] mx-auto p-8">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
            
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
