import { useState, useCallback, useRef } from 'react';
import NumerologyForm from './components/NumerologyForm';
import ProcessingScreen from './components/ProcessingScreen';
import ReportView from './components/ReportView';
import TarotReading from './components/TarotReading';
import TarotReportView from './components/TarotReportView';
import { generateReport } from './lib/numerology';
import type { NumerologyReport } from './lib/numerology';
import type { TarotCard, SpreadType } from './lib/tarot';

type AppState = 'home' | 'numerology-form' | 'numerology-processing' | 'numerology-report' | 'tarot-reading' | 'tarot-report';

function generateId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [report, setReport] = useState<NumerologyReport | null>(null);
  const [tarotData, setTarotData] = useState<{
    cards: TarotCard[];
    orientations: boolean[];
    spreadType: SpreadType;
    question: string;
  } | null>(null);
  const formDataRef = useRef({ name: '', birthDate: '', phone: '' });

  const handleFormSubmit = useCallback((name: string, birthDate: string, phone: string) => {
    formDataRef.current = { name, birthDate, phone };
    setAppState('numerology-processing');
  }, []);

  const handleProcessingComplete = useCallback(() => {
    const { name, birthDate, phone } = formDataRef.current;
    const id = generateId();
    setReport(generateReport(id, name, birthDate, phone));
    setAppState('numerology-report');
  }, []);

  const handleTarotComplete = useCallback((cards: TarotCard[], orientations: boolean[], spreadType: SpreadType, question: string) => {
    setTarotData({ cards, orientations, spreadType, question });
    setAppState('tarot-report');
  }, []);

  const handleReset = useCallback(() => {
    setReport(null);
    setTarotData(null);
    formDataRef.current = { name: '', birthDate: '', phone: '' };
    setAppState('home');
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
            Тоон зурхай болон Таротын уншилт
          </p>
        </header>

        <main>
          {appState === 'home' && (
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Numerology card */}
              <button
                onClick={() => setAppState('numerology-form')}
                className="group p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-primary-400/50 transition-all duration-300 text-left"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔢</div>
                <h2 className="text-2xl font-bold text-white mb-2">Тоон зурхай</h2>
                <p className="text-white/60 text-sm mb-4">
                  Төрсөн огноо, нэрэнд суурилсан тоон зурхайн тайлан
                </p>
                <ul className="space-y-1 text-xs text-white/50">
                  <li>✓ Пифагорын тооцоолол</li>
                  <li>✓ Йоог/Тантрик тоо</li>
                  <li>✓ 9 жилийн мөчлөг</li>
                  <li>✓ Нарны орд, Хятад зурхай</li>
                </ul>
                <div className="mt-6 text-primary-400 font-semibold group-hover:text-primary-300">
                  Эхлүүлэх →
                </div>
              </button>

              {/* Tarot card */}
              <button
                onClick={() => setAppState('tarot-reading')}
                className="group p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 text-left"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎴</div>
                <h2 className="text-2xl font-bold text-white mb-2">Таротын уншилт</h2>
                <p className="text-white/60 text-sm mb-4">
                  78 карттай Таротын систем, дэлгэрэнгүй тайлбар
                </p>
                <ul className="space-y-1 text-xs text-white/50">
                  <li>✓ 1-7 карт сонгох</li>
                  <li>✓ Босоо/урвуу байрлал</li>
                  <li>✓ Хайр, карьер, санхүү</li>
                  <li>✓ Зөвлөмж, сорилт</li>
                </ul>
                <div className="mt-6 text-purple-400 font-semibold group-hover:text-purple-300">
                  Эхлүүлэх →
                </div>
              </button>
            </div>
          )}

          {appState === 'numerology-form' && (
            <NumerologyForm onSubmit={handleFormSubmit} isLoading={false} />
          )}

          {appState === 'numerology-processing' && (
            <ProcessingScreen name={formDataRef.current.name} onComplete={handleProcessingComplete} />
          )}

          {appState === 'numerology-report' && report && (
            <ReportView report={report} onReset={handleReset} />
          )}

          {appState === 'tarot-reading' && (
            <TarotReading onComplete={handleTarotComplete} />
          )}

          {appState === 'tarot-report' && tarotData && (
            <TarotReportView
              cards={tarotData.cards}
              orientations={tarotData.orientations}
              spreadType={tarotData.spreadType}
              question={tarotData.question}
              onReset={handleReset}
            />
          )}
        </main>

        <footer className="text-center mt-8 sm:mt-12 text-white/30 text-[10px] sm:text-xs no-print px-4">
          <p>© {new Date().getFullYear()} Номберлоги AI — Тоон зурхай болон Таротын уншилт</p>
          <p className="mt-1">Бэлгэдлийн, зугаа цэнгэлийн зориулалттай</p>
        </footer>
      </div>
    </div>
  );
}
