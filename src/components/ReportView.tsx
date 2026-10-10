import { useState, useRef } from 'react';
import type { NumerologyReport } from '../lib/numerology';
import PaymentModal from './PaymentModal';
import {
  LIFE_PATH_MEANINGS, EXPRESSION_MEANINGS, SOUL_URGE_MEANINGS,
  PERSONALITY_MEANINGS, YOGIC_MEANINGS, MISSING_NUMBER_MEANINGS,
  getZodiacSign, getChineseZodiac, getTarotCard, calcCompatibility,
} from '../lib/numerology';
import { exportToPDF } from '../lib/pdfExport';

interface ReportViewProps { report: NumerologyReport; onReset: () => void; }

function NumberBadge({ num, label, color = 'primary' }: { num: number; label: string; color?: string }) {
  const colors: Record<string, string> = {
    primary: 'from-primary-500 to-primary-700', gold: 'from-gold-400 to-gold-600',
    purple: 'from-purple-500 to-purple-700', teal: 'from-teal-500 to-teal-700',
  };
  return (
    <div className="flex flex-col items-center">
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg`}>
        <span className="text-lg sm:text-xl font-bold text-white">{num}</span>
      </div>
      <span className="text-[10px] sm:text-xs text-white/70 mt-1 sm:mt-2 text-center leading-tight">{label}</span>
    </div>
  );
}

function Section({ title, icon, children, locked = false, onUnlock }: { title: string; icon: string; children: React.ReactNode; locked?: boolean; onUnlock?: () => void }) {
  return (
    <div className={`glass-card p-4 sm:p-6 mb-4 sm:mb-6 ${locked ? 'opacity-70' : ''}`}>
      <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 flex-wrap">
        <span className="text-xl sm:text-2xl">{icon}</span>
        <span>{title}</span>
        {locked && (
          <button onClick={onUnlock} className="ml-auto text-xs bg-gold-500/20 text-gold-300 px-2 py-1 rounded-full hover:bg-gold-500/30 transition">
            🔓 Нээх
          </button>
        )}
      </h3>
      {children}
    </div>
  );
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs sm:text-sm mb-1">
        <span className="text-white/70">{label}</span>
        <span className="text-white font-medium">{score}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default function ReportView({ report, onReset }: ReportViewProps) {
  const { pythagorean, yogic, nineYearCycle, name, birthDate } = report;
  const [isPaid, setIsPaid] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const [day, month, year] = birthDate.split('/').map(Number);
  const zodiac = getZodiacSign(month, day);
  const chineseZodiac = getChineseZodiac(year);
  const tarotCard = getTarotCard(pythagorean.lifePath);

  const handleExport = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      await exportToPDF('report-content', `Номберлоги_${name}_${birthDate.replace(/\//g, '')}`);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF татахад алдаа гарлаа. Дахин оролдоно уу.');
    }
    setIsExporting(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 animate-fade-in">
        <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 animate-float">🌟</div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          <span className="bg-gradient-to-r from-primary-300 to-gold-400 bg-clip-text text-transparent">{name}</span>-ийн тоон зурхай
        </h1>
        <p className="text-white/60 text-xs sm:text-sm">Төрсөн огноо: {birthDate}</p>
      </div>

      {/* Report content for PDF */}
      <div id="report-content" ref={reportRef}>
        {/* 1. Пифагорын тоо */}
        <Section title="Пифагорын тоо" icon="🔢">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
            <NumberBadge num={pythagorean.lifePath} label="Амьдралын зам" color="primary" />
            <NumberBadge num={pythagorean.expression} label="Илэрхийлэл" color="gold" />
            <NumberBadge num={pythagorean.soulUrge} label="Сэтгэлийн хүсэл" color="purple" />
            <NumberBadge num={pythagorean.personality} label="Дүр төрх" color="teal" />
            <NumberBadge num={pythagorean.birthday} label="Төрсөн өдөр" color="primary" />
            <NumberBadge num={pythagorean.maturity} label="Боловсрол" color="gold" />
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <h4 className="font-semibold text-primary-300 mb-1 text-sm sm:text-base">Амьдралын зам ({pythagorean.lifePath})</h4>
              <p className="text-white/80 text-xs sm:text-sm">{LIFE_PATH_MEANINGS[pythagorean.lifePath]}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <h4 className="font-semibold text-gold-400 mb-1 text-sm sm:text-base">Илэрхийлэл ({pythagorean.expression})</h4>
              <p className="text-white/80 text-xs sm:text-sm">{EXPRESSION_MEANINGS[pythagorean.expression]}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <h4 className="font-semibold text-purple-300 mb-1 text-sm sm:text-base">Сэтгэлийн хүсэл ({pythagorean.soulUrge})</h4>
              <p className="text-white/80 text-xs sm:text-sm">{SOUL_URGE_MEANINGS[pythagorean.soulUrge]}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <h4 className="font-semibold text-teal-300 mb-1 text-sm sm:text-base">Дүр төрх ({pythagorean.personality})</h4>
              <p className="text-white/80 text-xs sm:text-sm">{PERSONALITY_MEANINGS[pythagorean.personality]}</p>
            </div>
          </div>
        </Section>

        {/* 2. Одон орон + 3. Хятад зурхай */}
        <Section title="Одон орон ба Хятад зурхай" icon="⭐" locked={!isPaid} onUnlock={() => setShowPayment(true)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">☀️ {zodiac.signMn} <span className="text-white/50 text-xs">({zodiac.dates})</span></h4>
              <p className="text-white/70 text-xs sm:text-sm mb-2">{zodiac.traits}</p>
              <div className="text-xs text-white/50 space-y-1">
                <p>🔥 Элемент: {zodiac.elementMn}</p>
                <p>🪐 Захирагч: {zodiac.rulingMn}</p>
                <p>🔢 Ээлтэй тоо: {zodiac.luckyNumbers.join(', ')}</p>
                <p>💕 Тохирох орд: {zodiac.compatibleWith.join(', ')}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">🐉 {chineseZodiac.animalMn} жил <span className="text-white/50 text-xs">({year})</span></h4>
              <p className="text-white/70 text-xs sm:text-sm mb-2">{chineseZodiac.traits}</p>
              <div className="text-xs text-white/50 space-y-1">
                <p>🌿 Элемент: {chineseZodiac.elementMn}</p>
                <p>💕 Тохирох жил: {chineseZodiac.compatibleWith.join(', ')}</p>
                <p>⚡ Тохирохгүй: {chineseZodiac.incompatibleWith.join(', ')}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Тарот картны утга */}
        <Section title="Тарот картны утга" icon="🃏" locked={!isPaid} onUnlock={() => setShowPayment(true)}>
          <div className="bg-white/5 rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-xl bg-gradient-to-br from-purple-600 to-purple-900 border-2 border-gold-400/50 flex flex-col items-center justify-center shadow-lg">
                <span className="text-3xl sm:text-4xl font-bold text-gold-400">{tarotCard.number}</span>
                <span className="text-[10px] sm:text-xs text-white/70 mt-1">{tarotCard.name}</span>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-gold-400 font-bold text-lg sm:text-xl mb-2">{tarotCard.nameMn}</h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{tarotCard.meaning}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. Йоог / Тантрик тоо */}
        <Section title="Йоог / Тантрик тоо" icon="🕉️">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <NumberBadge num={yogic.destiny} label="Хувь заяа" color="gold" />
            <NumberBadge num={yogic.pathNumber} label="Зам" color="teal" />
            <NumberBadge num={yogic.nameNumber} label="Нэрний тоо" color="purple" />
          </div>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <h4 className="font-semibold text-gold-400 mb-1 text-sm sm:text-base">Хувь заяаны тоо ({yogic.destiny})</h4>
              <p className="text-white/80 text-xs sm:text-sm">{YOGIC_MEANINGS[yogic.destiny]}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 sm:p-4">
              <h4 className="font-semibold text-teal-300 mb-1 text-sm sm:text-base">Замын тоо ({yogic.pathNumber})</h4>
              <p className="text-white/80 text-xs sm:text-sm">{YOGIC_MEANINGS[yogic.pathNumber]}</p>
            </div>
          </div>
          {yogic.missingNumbers.length > 0 && (
            <div className="bg-white/5 rounded-xl p-3 sm:p-4 mt-3">
              <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Дутуу тоонууд: {yogic.missingNumbers.join(', ')}</h4>
              {yogic.missingNumbers.map(n => (
                <p key={n} className="text-white/70 text-xs sm:text-sm"><span className="font-semibold text-red-300">{n}:</span> {MISSING_NUMBER_MEANINGS[n]}</p>
              ))}
            </div>
          )}
        </Section>

        {/* 6. 9 жилийн мөчлөг */}
        <Section title="9 жилийн мөчлөг" icon="🔄">
          <div className="space-y-2">
            {nineYearCycle.map((item) => (
              <div key={item.calendarYear} className={`flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl ${item.calendarYear === pythagorean.currentCalendarYear ? 'bg-primary-500/20 border border-primary-400/30' : 'bg-white/5'}`}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary-500/50 to-primary-700/50 flex items-center justify-center shrink-0">
                  <span className="text-sm sm:text-lg font-bold text-white">{item.personalYear}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-xs sm:text-sm">
                    {item.calendarYear} он
                    {item.calendarYear === pythagorean.currentCalendarYear && <span className="ml-2 text-[10px] sm:text-xs bg-primary-500/30 px-2 py-0.5 rounded-full">Одоо</span>}
                  </p>
                  <p className="text-white/60 text-[10px] sm:text-xs truncate">{item.theme}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 7. Хосын харилцааны зөвлөмж */}
        <Section title="Хосын харилцааны зөвлөмж" icon="💕" locked={!isPaid} onUnlock={() => setShowPayment(true)}>
          {isPaid ? <CompatibilityChecker lifePath={pythagorean.lifePath} /> : (
            <div className="text-center py-4">
              <p className="text-white/50 text-xs sm:text-sm mb-4">Хосын харилцааны дэлгэрэнгүй шинжилгээ авах</p>
              <button onClick={() => setShowPayment(true)} className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-rose-500/20 to-primary-500/20 border border-rose-400/30 text-rose-300 text-xs sm:text-sm">💕 Тохирлыг шалгах</button>
            </div>
          )}
        </Section>

        {/* Disclaimer */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 sm:p-6 mb-6">
          <p className="text-yellow-200/80 text-xs sm:text-sm text-center">⚠️ Энэ тайлан нь бэлгэдлийн, зугаа цэнгэлийн чиглэлийн тайлбар юм. Эрүүл мэнд, санхүүгийн мэргэжлийн зөвлөгөөг орлохгүй.</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center no-print mb-8 sm:mb-12 px-2">
        <button onClick={() => setShowPayment(true)} disabled={isPaid}
          className={`px-4 sm:px-6 py-3 rounded-xl font-medium transition text-sm sm:text-base ${isPaid ? 'bg-green-500/20 border border-green-400/30 text-green-300' : 'bg-gradient-to-r from-gold-500 to-gold-600 text-white animate-pulse-glow'}`}>
          {isPaid ? '✅ Бүрэн тайлан нээгдсэн' : '🔓 Бүрэн тайлан — 5,000₮'}
        </button>
        <button onClick={handleExport} disabled={isExporting}
          className="px-4 sm:px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm sm:text-base hover:bg-white/20 transition disabled:opacity-50">
          {isExporting ? '⏳ Татаж байна...' : '📄 PDF татах'}
        </button>
        <button onClick={onReset}
          className="px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white text-sm sm:text-base">
          ✨ Шинэ тайлан
        </button>
      </div>

      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} onSuccess={() => { setIsPaid(true); setShowPayment(false); }} />
    </div>
  );
}

function CompatibilityChecker({ lifePath }: { lifePath: number }) {
  const [partnerPath, setPartnerPath] = useState<number | null>(null);
  return (
    <div>
      <div className="mb-4">
        <label className="block text-xs sm:text-sm text-white/70 mb-2">Хамтрагчийн амьдралын замын тоо:</label>
        <div className="flex flex-wrap gap-2">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button key={n} onClick={() => setPartnerPath(n)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all text-sm sm:text-base ${partnerPath === n ? 'bg-gradient-to-br from-rose-500 to-primary-500 text-white scale-110' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>{n}</button>
          ))}
        </div>
      </div>
      {partnerPath && (() => {
        const result = calcCompatibility(lifePath, partnerPath);
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <p className="text-white font-semibold text-sm sm:text-lg">{result.summary}</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary-300 mt-2">{result.overallScore}%</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <ScoreBar label="💕 Хайр" score={result.loveScore} color="from-rose-400 to-rose-600" />
                <ScoreBar label="🤝 Нөхөрлөл" score={result.friendshipScore} color="from-primary-400 to-primary-600" />
                <ScoreBar label="💼 Ажил" score={result.workScore} color="from-teal-400 to-teal-600" />
                <ScoreBar label="💬 Харилцаа" score={result.communicationScore} color="from-purple-400 to-purple-600" />
              </div>
              <div className="space-y-3">
                <div className="bg-green-500/10 rounded-lg p-3">
                  <p className="text-green-300 text-xs font-medium mb-1">💪 Давуу тал</p>
                  {result.strengths.map((s,i) => <p key={i} className="text-white/70 text-xs sm:text-sm">• {s}</p>)}
                </div>
                <div className="bg-yellow-500/10 rounded-lg p-3">
                  <p className="text-yellow-300 text-xs font-medium mb-1">⚡ Анхаарах зүйл</p>
                  {result.challenges.map((c,i) => <p key={i} className="text-white/70 text-xs sm:text-sm">• {c}</p>)}
                </div>
                <div className="bg-primary-500/10 rounded-lg p-3">
                  <p className="text-primary-300 text-xs font-medium mb-1">💡 Зөвлөгөө</p>
                  <p className="text-white/70 text-xs sm:text-sm">{result.advice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
