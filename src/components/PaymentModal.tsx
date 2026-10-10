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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="glass-card p-4 sm:p-8 max-w-md w-full animate-scale-in relative my-4">
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white text-sm">✕</button>
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🔓</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Бүрэн тайлан авах</h2>
          <p className="text-white/60 text-xs sm:text-sm">Бүх тоон зурхайн аргачлал, одон орон, хосын харилцаа зэрэг дэлгэрэнгүй тайлан</p>
        </div>
        <div className="bg-gradient-to-r from-gold-500/20 to-primary-500/20 rounded-xl p-4 mb-6 border border-gold-400/20">
          <div className="flex items-center justify-between">
            <span className="text-white/80">Бүрэн тайлан</span>
            <span className="text-2xl font-bold text-gold-400">5,000₮</span>
          </div>
          <p className="text-white/50 text-xs mt-2">Нэг удаагийн төлбөр • Бүх аргачлал хамрагдсан • PDF татах</p>
        </div>
        <div className="space-y-2 mb-6">
          {['Пифагорын бүрэн тооцоолол','Йоог/Тантрик тоо','9 жилийн мөчлөг','Нарны ордны онцлог','Хятад зурхай (12 жил)','Тарот картны утга','Хосын харилцааны зөвлөмж','Утасны дэлгэрэнгүй шинжилгээ','PDF татах боломж'].map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-green-400">✓</span>
              <span className="text-white/70">{f}</span>
            </div>
          ))}
        </div>
        <button onClick={handlePayment} disabled={isProcessing}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold text-lg hover:from-gold-600 hover:to-gold-700 transition-all disabled:opacity-50 animate-pulse-glow">
          {isProcessing ? 'Төлбөр боловсруулж байна...' : '💎 5,000₮ төлөх'}
        </button>
        <p className="text-white/30 text-xs mt-4 text-center">Төлбөр амжилттай болсон даруйд бүрэн тайлан нээгдэнэ</p>
      </div>
    </div>
  );
}
