import { useState } from 'react';

interface PaymentModalProps { isOpen: boolean; onClose: () => void; onSuccess: () => void; }

export default function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => { setIsProcessing(false); onSuccess(); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-card p-5 sm:p-8 max-w-md w-full animate-scale-in relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white text-sm sm:text-base">✕</button>
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🔓</div>
          <h2 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">Бүрэн тайлан авах</h2>
          <p className="text-white/60 text-[10px] sm:text-sm px-2">Одон орон, Хятад зурхай, Тарот, Хосын харилцаа зэрэг бүх аргачлал</p>
        </div>
        <div className="bg-gradient-to-r from-gold-500/20 to-primary-500/20 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-gold-400/20">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-xs sm:text-sm">Бүрэн тайлан</span>
            <span className="text-xl sm:text-2xl font-bold text-gold-400">5,000₮</span>
          </div>
          <p className="text-white/50 text-[10px] sm:text-xs mt-1 sm:mt-2">Нэг удаагийн төлбөр • Бүх аргачлал • PDF татах</p>
        </div>
        <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
          {['Пифагорын бүрэн тооцоолол','Йоог/Тантрик тоо','9 жилийн мөчлөг','Нарны ордны онцлог','Хятад зурхай (12 жил)','Тарот картны утга','Хосын харилцааны зөвлөмж','Утасны дэлгэрэнгүй шинжилгээ','PDF татах боломж'].map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] sm:text-sm">
              <span className="text-green-400">✓</span>
              <span className="text-white/70">{f}</span>
            </div>
          ))}
        </div>
        <button onClick={handlePayment} disabled={isProcessing}
          className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold text-sm sm:text-lg hover:from-gold-600 hover:to-gold-700 transition-all disabled:opacity-50 animate-pulse-glow">
          {isProcessing ? 'Төлбөр боловсруулж байна...' : '💎 5,000₮ төлөх'}
        </button>
        <p className="text-white/30 text-[10px] sm:text-xs mt-3 sm:mt-4 text-center">Төлбөр амжилттай болсон даруйд бүрэн тайлан нээгдэнэ</p>
      </div>
    </div>
  );
}
