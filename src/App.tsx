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
  const formDataRef = useRef({ name: '', birthDate: '', email: '' });

  const handleFormSubmit = useCallback((name: string, birthDate: string, email: string) => {
    formDataRef.current = { name, birthDate, email };
    setAppState('processing');
  }, []);

  const handleProcessingComplete = useCallback(() => {
    const { name, birthDate, email } = formDataRef.current;
    const id = generateId();
    setReport(generateReport(id, name, birthDate, email));
    setAppState('report');
  }, []);

  const handleReset = useCallback(() => {
    setReport(null);
    formDataRef.current = { name: '', birthDate: '', email: '' };
    setAppState('form');
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animationDelay: `${Math.random()*3}s`, opacity: 0.3 }} />
        ))}
      </div>

      <div className="relative z-10">
        <header className="text-center mb-10 no-print">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            <span className="bg-gradient-to-r from-primary-300 via-purple-300 to-primary-500 bg-clip-text text-transparent animate-gradient">Номберлоги</span>{' '}
            <span className="text-gold-400 animate-float inline-block">AI</span>
          </h1>
          <p className="text-white/60 max-w-md mx-auto text-sm md:text-base">Пифагор, Йоог/Тантрик болон 9 жилийн мөчлөг дээр суурилсан тоон зурхайн тайлан</p>
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

        <footer className="text-center mt-12 text-white/30 text-xs no-print">
          <p>© {new Date().getFullYear()} Номберлоги AI — Тоон зурхайн тайлан</p>
          <p className="mt-1">Бэлгэдлийн, зугаа цэнгэлийн зориулалттай</p>
        </footer>
      </div>
    </div>
  );
}

function LandingInfo() {
  return (
    <div className="max-w-4xl mx-auto mt-12 no-print">
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: '🔢', title: 'Пифагорын систем', desc: 'Амьдралын зам, илэрхийлэл, сэтгэлийн хүсэл' },
          { icon: '🕉️', title: 'Йоог / Тантрик', desc: 'Хувь заяа, зам, нэрний тоо, 5 тооны бие' },
          { icon: '🔄', title: '9 жилийн мөчлөг', desc: 'Ирэх 9 жилийн хувийн жилийн тоо, сэдэв' },
          { icon: '📱', title: 'Утасны шинжилгээ', desc: 'Утасны тоон энерги, тохирох дугаар' },
        ].map((item, i) => (
          <div key={i} className={`glass-card p-6 text-center animate-slide-up stagger-${i+1}`}>
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-white font-semibold mb-2 text-sm">{item.title}</h3>
            <p className="text-white/60 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
