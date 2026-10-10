import { useState, useEffect, useRef } from 'react';

interface ProcessingScreenProps { name: string; onComplete: () => void; }

const STEPS = [
  { text: 'Төрсөн огноог шинжилж байна...', icon: '📅' },
  { text: 'Пифагорын тоонуудыг тооцоолж байна...', icon: '🔢' },
  { text: 'Йоог/Тантрик тоонуудыг гаргаж байна...', icon: '🕉️' },
  { text: '9 жилийн мөчлөгийг бүтээж байна...', icon: '🔄' },
  { text: 'Тайланг бэлтгэж байна...', icon: '📝' },
];

export default function ProcessingScreen({ name, onComplete }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(elapsedSec);
      setProgress(Math.min(95, (elapsedSec / 8) * 95));
      setCurrentStep(Math.min(STEPS.length - 1, Math.floor((elapsedSec / 8) * STEPS.length)));
      if (elapsedSec >= 8) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => onCompleteRef.current(), 500);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="glass-card p-5 sm:p-8 text-center">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6">
          <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-primary-400/30 animate-spin-slow" />
          <div className="absolute inset-2 sm:inset-3 rounded-full border-2 sm:border-4 border-purple-400/30 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '6s' }} />
          <div className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-br from-primary-500/20 to-purple-700/20 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl animate-float">{STEPS[currentStep]?.icon}</span>
          </div>
        </div>
        <h2 className="text-base sm:text-xl font-bold text-white mb-2">{name}-ийн тайланг бэлтгэж байна</h2>
        <div className="w-full bg-white/10 rounded-full h-2 mb-4 sm:mb-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
        </div>
        <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
          {STEPS.map((step, i) => (
            <div key={i} className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all ${i === currentStep ? 'bg-primary-500/20 text-white' : i < currentStep ? 'text-white/50' : 'text-white/30'}`}>
              <span className="text-base sm:text-lg">{i < currentStep ? '✅' : step.icon}</span>
              <span className="text-[10px] sm:text-sm">{step.text}</span>
            </div>
          ))}
        </div>
        <p className="text-white/40 text-[10px] sm:text-xs">{elapsed} секунд</p>
      </div>
    </div>
  );
}
