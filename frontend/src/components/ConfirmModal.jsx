import { X, AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative glass border border-white/10 w-full max-w-md rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden scale-in-center animate-in zoom-in-95 duration-300">
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center border border-rose-500/20 mb-6">
            <AlertTriangle className="w-10 h-10 text-rose-500" />
          </div>
          
          <h3 className="text-2xl font-black text-white tracking-tight mb-2">{title}</h3>
          <p className="text-slate-500 font-medium">{message}</p>
          
          <div className="mt-10 flex gap-4 w-full">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all border border-white/5"
            >
              Cancel
            </button>
            <button 
              onClick={() => { onConfirm(); onClose(); }}
              className="flex-1 px-6 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-rose-500/25"
            >
              Delete
            </button>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
