import { useState, useEffect } from 'react';
import { analyzePhone, isMongolianMobile, getZodiacSign, calcCompatibility, type PhoneAnalysis } from '../lib/numerology';

interface PhoneAnalysisPanelProps { lifePathNumber?: number; birthDate?: string; }

function PhoneCompatView({ a, b }: { a: PhoneAnalysis; b: PhoneAnalysis }) {
  const c = calcCompatibility(a.reducedNumber, b.reducedNumber);
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="flex items-center justify-center gap-4 mb-3">
        <div className="text-center"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto"><span className="text-lg font-bold text-white">{a.reducedNumber}</span></div><p className="text-white/50 text-xs mt-1">Таны</p></div>
        <span className="text-2xl">💕</span>
        <div className="text-center"><div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center mx-auto"><span className="text-lg font-bold text-white">{b.reducedNumber}</span></div><p className="text-white/50 text-xs mt-1">Хамтрагч</p></div>
      </div>
      <p className="text-center text-white font-medium">{c.summary}</p>
      <p className="text-center text-2xl font-bold text-primary-300">{c.overallScore}%</p>
      <div className="grid grid-cols-2 gap-2 text-xs mt-2">
        <div className="bg-white/5 rounded p-2 text-center"><p className="text-rose-300">💕 Хайр</p><p className="text-white font-bold">{c.loveScore}%</p></div>
        <div className="bg-white/5 rounded p-2 text-center"><p className="text-primary-300">🤝 Нөхөрлөл</p><p className="text-white font-bold">{c.friendshipScore}%</p></div>
      </div>
      <p className="text-white/60 text-xs mt-2">💡 {c.advice}</p>
    </div>
  );
}

export default function PhoneAnalysisPanel({ lifePathNumber, birthDate }: PhoneAnalysisPanelProps) {
  const [phone, setPhone] = useState('');
  const [analysis, setAnalysis] = useState<PhoneAnalysis | null>(null);
  const [isMongolian, setIsMongolian] = useState<boolean | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [customLifePath, setCustomLifePath] = useState<number | undefined>(lifePathNumber);
  const [showCustomInput, setShowCustomInput] = useState(!lifePathNumber);
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerAnalysis, setPartnerAnalysis] = useState<PhoneAnalysis | null>(null);
  const [showCompatibility, setShowCompatibility] = useState(false);

  let zodiac = null;
  if (birthDate) {
    const parts = birthDate.split('/').map(Number);
    if (parts.length === 3) zodiac = getZodiacSign(parts[1], parts[0]);
  }

  useEffect(() => {
    if (phone.length >= 8) { setAnalysis(analyzePhone(phone, customLifePath)); setIsMongolian(isMongolianMobile(phone)); }
    else { setAnalysis(null); setIsMongolian(null); }
  }, [phone, customLifePath]);

  useEffect(() => {
    if (partnerPhone.length >= 8) setPartnerAnalysis(analyzePhone(partnerPhone, customLifePath));
    else setPartnerAnalysis(null);
  }, [partnerPhone, customLifePath]);

  const formatPhone = (value: string) => {
    let digits = value.replace(/[^\d+]/g, '');
    if (digits.startsWith('+976')) {
      const local = digits.slice(4);
      if (local.length > 4) digits = '+976 ' + local.slice(0,4) + ' ' + local.slice(4,8);
      else if (local.length > 0) digits = '+976 ' + local;
    } else if (digits.startsWith('976')) {
      const local = digits.slice(3);
      if (local.length > 4) digits = '+976 ' + local.slice(0,4) + ' ' + local.slice(4,8);
      else if (local.length > 0) digits = '+976 ' + local;
      else digits = '+976 ';
    }
    return digits;
  };

  const getLuckyNumbers = () => {
    if (!analysis) return [];
    const lucky: number[] = [analysis.reducedNumber];
    if (zodiac) lucky.push(...zodiac.luckyNumbers.slice(0,2));
    if (customLifePath) lucky.push(customLifePath);
    return [...new Set(lucky)].slice(0,5);
  };

  const numberColor = () => {
    if (analysis?.lifePathMatch) return 'from-gold-400 to-gold-600';
    if (analysis?.compatible) return 'from-green-400 to-green-600';
    return 'from-primary-400 to-primary-600';
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-slide-up px-2">
      <div className="glass-card p-4 sm:p-8">
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 inline-block animate-float">📱</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Утасны дугаарын шинжилгээ</h2>
          <p className="text-white/60 text-xs sm:text-sm">Утасны тоон энерги, ордны тохирол, ээлтэй тоо, хосын харилцаа</p>
        </div>

        {showCustomInput && !lifePathNumber && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-white/80 mb-2">Амьдралын замын тоо:</label>
            <div className="flex gap-2 flex-wrap">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} onClick={() => { setCustomLifePath(n); setShowCustomInput(false); }}
                  className={`w-10 h-10 rounded-full transition-all ${customLifePath === n ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white scale-110' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>{n}</button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">Таны утасны дугаар</label>
          <div className="relative">
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="+976 9911 2233"
              className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/20 text-white text-lg text-center placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400 transition font-mono tracking-wider" />
            {isMongolian !== null && <div className="absolute right-3 top-1/2 -translate-y-1/2">{isMongolian ? <span className="text-green-400 text-sm">✓ Монгол</span> : <span className="text-yellow-400 text-sm">⚠ Формат</span>}</div>}
          </div>
        </div>

        {analysis && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${numberColor()} flex items-center justify-center shadow-lg animate-pulse-glow`}>
                <span className="text-3xl font-bold text-white">{analysis.reducedNumber}</span>
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-lg">Утасны тоо: {analysis.reducedNumber}</p>
                <p className="text-white/60 text-sm">Нийлбэр: {analysis.totalSum}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {analysis.lifePathMatch && <span className="px-3 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/30 text-gold-300 text-sm">✨ Амьдралын замтай тохирч байна</span>}
              {analysis.compatible && !analysis.lifePathMatch && <span className="px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm">✓ Нийцтэй</span>}
            </div>

            <div className="bg-white/5 rounded-xl p-4"><p className="text-white/80 text-sm">{analysis.meaning}</p></div>

            <div className="bg-gradient-to-br from-gold-500/5 to-primary-500/5 rounded-xl p-4 border border-gold-400/10">
              <h4 className="text-gold-400 font-medium text-sm mb-3">🍀 Таны ээлтэй тоонууд</h4>
              <div className="flex flex-wrap gap-2">
                {getLuckyNumbers().map((n, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-600/20 border border-gold-400/30 flex items-center justify-center">
                    <span className="text-gold-300 font-bold">{n}</span>
                  </div>
                ))}
              </div>
              {zodiac && <p className="text-white/50 text-xs mt-2">{zodiac.signMn} ордны ээлтэй тоо: {zodiac.luckyNumbers.join(', ')}</p>}
            </div>

            {customLifePath && (
              <button onClick={() => setShowSuggestions(!showSuggestions)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500/20 to-gold-600/20 border border-gold-400/30 text-gold-300 font-medium">
                {showSuggestions ? '🔽 Хаах' : '✨ Танд тохирох дугаарууд'}
              </button>
            )}

            {showSuggestions && analysis.suggestions.length > 0 && (
              <div className="bg-gradient-to-br from-gold-500/5 to-primary-500/5 rounded-xl p-4 border border-gold-400/10">
                <div className="space-y-2">
                  {analysis.suggestions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white font-mono text-lg">{s}</span>
                      <span className="text-xs text-green-300 px-2 py-1 rounded-full bg-green-500/10">Нийцтэй</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 border-t border-white/10 pt-4">
              <button onClick={() => setShowCompatibility(!showCompatibility)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500/20 to-primary-500/20 border border-rose-400/30 text-rose-300 font-medium">
                {showCompatibility ? '🔽 Хаах' : '💕 Хамтрагчийн утсаар тохирол шалгах'}
              </button>

              {showCompatibility && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Хамтрагчийн утасны дугаар:</label>
                    <input type="tel" value={partnerPhone} onChange={(e) => setPartnerPhone(formatPhone(e.target.value))}
                      placeholder="+976 8811 2233"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white text-center placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-rose-400 transition font-mono tracking-wider" />
                  </div>
                  {partnerAnalysis && analysis && <PhoneCompatView a={analysis} b={partnerAnalysis} />}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
