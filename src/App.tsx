import { useState, useCallback, useRef } from 'react';
import NumerologyForm from './components/NumerologyForm';
import ProcessingScreen from './components/ProcessingScreen';
import ReportView from './components/ReportView';
import PhoneAnalysisPanel from './components/PhoneAnalysisPanel';
import { generateReport } from './lib/numerology';
import type { NumerologyReport } from './lib/numerology';

type AppState = 'form' | 'processing' | 'report';

function generateId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('form');
  const [report, setReport] = useState<NumerologyReport | null>(null);
  const formDataRef = useRef({ name: '', birthDate: '', phone: '' });

  const handleFormSubmit = useCallback((name: string, birthDate: string, phone: string) => {
    formDataRef.current = { name, birthDate, phone };
    setAppState('processing');
  }, []);

  const handleProcessingComplete = useCallback(() => {
    const { name, birthDate, phone } = formDataRef.current;
    const id = generateId();
    // phone-г email field-д хадгална (backward compatible)
    setReport(generateReport(id, name, birthDate, phone));
    setAppState('report');
  }, []);

  const handleReset = useCallback(() => {
    setReport(null);
    formDataRef.current = { name: '', birthDate: '', phone: '' };
    setAppState('form');
  }, []);

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animationDelay: `${Math.random()*3}s`, opacity: 0.3 }} />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="text-center mb-6 sm:mb-10 no-print">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-3">
            <span className="bg-gradient-to-r from-primary-300 via-purple-300 to-primary-500 bg-clip-text text-transparent animate-gradient">Номберлоги</span>{' '}
            <span className="text-gold-400 animate-float inline-block">AI</span>
          </h1>
          <p className="text-white/60 text-xs sm:text-base max-w-md mx-auto px-4">
            Пифагор, Йоог, Одон орон, Хятад зурхай, Тарот зэрэг дэлхий дахины бүх тоон зурхайн аргачлалаар
          </p>
        </header>

        <main>
          {appState === 'form' && (
            <>
              <NumerologyForm onSubmit={handleFormSubmit} isLoading={false} />
              <PhoneAnalysisPanel />
              <LandingInfo />
            </>
          )}
          {appState === 'processing' && <ProcessingScreen name={formDataRef.current.name} onComplete={handleProcessingComplete} />}
          {appState === 'report' && report && (
            <>
              <ReportView report={report} onReset={handleReset} />
              <PhoneAnalysisPanel lifePathNumber={report.pythagorean.lifePath} birthDate={report.birthDate} />
            </>
          )}
        </main>

        <footer className="text-center mt-8 sm:mt-12 text-white/30 text-[10px] sm:text-xs no-print px-4">
          <p>© {new Date().getFullYear()} Номберлоги AI — Тоон зурхайн тайлан</p>
          <p className="mt-1">Бэлгэдлийн, зугаа цэнгэлийн зориулалттай</p>
        </footer>
      </div>
    </div>
  );
}

function LandingInfo() {
  return (
    <div className="max-w-4xl mx-auto mt-8 sm:mt-12 no-print px-2 sm:px-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-10">
        {[
          { icon: '🔢', title: 'Пифагор', desc: 'Амьдралын зам, илэрхийлэл' },
          { icon: '🕉️', title: 'Йоог/Тантрик', desc: 'Хувь заяа, 5 биеийн систем' },
          { icon: '⭐', title: 'Одон орон', desc: '12 орд, Хятад 12 жил' },
          { icon: '🃏', title: 'Тарот', desc: '22 аркан картны утга' },
        ].map((item, i) => (
          <div key={i} className="glass-card p-3 sm:p-5 text-center">
            <div className="text-2xl sm:text-4xl mb-2">{item.icon}</div>
            <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">{item.title}</h3>
            <p className="text-white/60 text-[10px] sm:text-xs leading-tight">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-4 sm:p-6">
        <h3 className="text-white font-semibold mb-3 sm:mb-4 text-center text-sm sm:text-base">Тайланд хамрагдах аргачлалууд</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {[
            ['✓ Пифагорын тооцоолол', '✓ Йоог/Тантрик тоо', '✓ 9 жилийн мөчлөг'],
            ['✓ Нарны ордны онцлог', '✓ Хятад зурхай (12 жил)', '✓ Тарот картны утга'],
            ['✓ Хосын харилцааны зөвлөмж', '✓ Утасны дэлгэрэнгүй шинжилгээ', '✓ PDF татах боломж'],
          ].map((col, i) => (
            <div key={i} className="space-y-1.5 sm:space-y-2">
              {col.map((item, j) => (
                <p key={j} className="text-white/70 text-xs sm:text-sm">{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
