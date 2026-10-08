import { useState } from 'react';
import type { NumerologyReport } from '../lib/numerology';
import PaymentModal from './PaymentModal';
import {
  LIFE_PATH_MEANINGS, EXPRESSION_MEANINGS, SOUL_URGE_MEANINGS,
  PERSONALITY_MEANINGS, YOGIC_MEANINGS, MISSING_NUMBER_MEANINGS,
  getZodiacSign, getChineseZodiac, calcCompatibility,
} from '../lib/numerology';

interface ReportViewProps { report: NumerologyReport; onReset: () => void; }

function NumberBadge({ num, label, color = 'primary' }: { num: number; label: string; color?: string }) {
  const colors: Record<string, string> = {
    primary: 'from-primary-500 to-primary-700', gold: 'from-gold-400 to-gold-600',
    purple: 'from-purple-500 to-purple-700', teal: 'from-teal-500 to-teal-700',
  };
  return (
    <div className="flex flex-col items-center">
      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg`}>
        <span className="text-xl font-bold text-white">{num}</span>
      </div>
      <span className="text-xs text-white/70 mt-2 text-center">{label}</span>
    </div>
  );
}

function Section({ title, icon, children, locked = false }: { title: string; icon: string; children: React.ReactNode; locked?: boolean }) {
  return (
    <div className={`glass-card p-6 mb-6 ${locked ? 'opacity-60' : ''}`}>
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">{icon}</span> {title}
        {locked && <span className="ml-auto text-xs bg-gold-500/20 text-gold-300 px-2 py-1 rounded-full">🔒 Бүрэн тайлан</span>}
      </h3>
      {children}
    </div>
  );
}

export default function ReportView({ report, onReset }: ReportViewProps) {
  const { pythagorean, yogic, nineYearCycle, name, birthDate } = report;
  const currentYearItem = nineYearCycle.find(item => item.calendarYear === pythagorean.currentCalendarYear);
  const [isPaid, setIsPaid] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const [day, month, year] = birthDate.split('/').map(Number);
  const zodiac = getZodiacSign(month, day);
  const chineseZodiac = getChineseZodiac(year);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-8 animate-fade-in">
        <div className="text-6xl mb-4 animate-float">🌟</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          <span className="bg-gradient-to-r from-primary-300 to-gold-400 bg-clip-text text-transparent">{name}</span>-ийн тоон зурхай
        </h1>
        <p className="text-white/60">Төрсөн огноо: {birthDate} | Тайлангийн огноо: {new Date(report.createdAt).toLocaleDateString('mn-MN')}</p>
      </div>

      <Section title="Пифагорын тоо" icon="🔢">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <NumberBadge num={pythagorean.lifePath} label="Амьдралын зам" color="primary" />
          <NumberBadge num={pythagorean.expression} label="Илэрхийлэл" color="gold" />
          <NumberBadge num={pythagorean.soulUrge} label="Сэтгэлийн хүсэл" color="purple" />
          <NumberBadge num={pythagorean.personality} label="Дүр төрх" color="teal" />
          <NumberBadge num={pythagorean.birthday} label="Төрсөн өдөр" color="primary" />
          <NumberBadge num={pythagorean.maturity} label="Боловсрол" color="gold" />
        </div>
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="font-semibold text-primary-300 mb-1">Амьдралын зам ({pythagorean.lifePath})</h4>
            <p className="text-white/80 text-sm">{LIFE_PATH_MEANINGS[pythagorean.lifePath]}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="font-semibold text-gold-400 mb-1">Илэрхийлэл ({pythagorean.expression})</h4>
            <p className="text-white/80 text-sm">{EXPRESSION_MEANINGS[pythagorean.expression]}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="font-semibold text-purple-300 mb-1">Сэтгэлийн хүсэл ({pythagorean.soulUrge})</h4>
            <p className="text-white/80 text-sm">{SOUL_URGE_MEANINGS[pythagorean.soulUrge]}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="font-semibold text-teal-300 mb-1">Дүр төрх ({pythagorean.personality})</h4>
            <p className="text-white/80 text-sm">{PERSONALITY_MEANINGS[pythagorean.personality]}</p>
          </div>
        </div>
      </Section>

      <Section title="Одон орон ба Хятад зурхай" icon="⭐" locked={!isPaid}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">{zodiac.signMn} ({zodiac.dates})</h4>
            <p className="text-white/70 text-sm mb-2">{zodiac.traits}</p>
            <div className="text-xs text-white/50 space-y-1">
              <p>🔥 Элемент: {zodiac.elementMn}</p>
              <p>🪐 Захирагч: {zodiac.rulingMn}</p>
              <p>🔢 Ээлтэй тоо: {zodiac.luckyNumbers.join(', ')}</p>
              <p>💕 Тохирох орд: {zodiac.compatibleWith.join(', ')}</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">{chineseZodiac.animalMn} жил ({year})</h4>
            <p className="text-white/70 text-sm mb-2">{chineseZodiac.traits}</p>
            <div className="text-xs text-white/50 space-y-1">
              <p>🌿 Элемент: {chineseZodiac.elementMn}</p>
              <p>💕 Тохирох жил: {chineseZodiac.compatibleWith.join(', ')}</p>
              <p>⚡ Тохирохгүй: {chineseZodiac.incompatibleWith.join(', ')}</p>
            </div>
          </div>
        </div>
        {!isPaid && <div className="mt-4 text-center"><button onClick={() => setShowPayment(true)} className="px-4 py-2 rounded-lg bg-gold-500/20 border border-gold-400/30 text-gold-300 text-sm">🔓 Дэлгэрэнгүй мэдээлэл авах</button></div>}
      </Section>

      <Section title="Йоог / Тантрик тоо" icon="🕉️">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <NumberBadge num={yogic.destiny} label="Хувь заяа" color="gold" />
          <NumberBadge num={yogic.pathNumber} label="Зам" color="teal" />
          <NumberBadge num={yogic.nameNumber} label="Нэрний тоо" color="purple" />
        </div>
        <div className="space-y-3">
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="font-semibold text-gold-400 mb-1">Хувь заяаны тоо ({yogic.destiny})</h4>
            <p className="text-white/80 text-sm">{YOGIC_MEANINGS[yogic.destiny]}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="font-semibold text-teal-300 mb-1">Замын тоо ({yogic.pathNumber})</h4>
            <p className="text-white/80 text-sm">{YOGIC_MEANINGS[yogic.pathNumber]}</p>
          </div>
        </div>
        {yogic.missingNumbers.length > 0 && (
          <div className="bg-white/5 rounded-xl p-4 mt-3">
            <h4 className="font-semibold text-white mb-2">Дутуу тоонууд: {yogic.missingNumbers.join(', ')}</h4>
            {yogic.missingNumbers.map(n => <p key={n} className="text-white/70 text-sm"><span className="font-semibold text-red-300">{n}:</span> {MISSING_NUMBER_MEANINGS[n]}</p>)}
          </div>
        )}
      </Section>

      <Section title="9 жилийн мөчлөг" icon="🔄">
        <div className="space-y-2">
          {nineYearCycle.map((item) => (
            <div key={item.calendarYear} className={`flex items-center gap-4 p-3 rounded-xl ${item.calendarYear === pythagorean.currentCalendarYear ? 'bg-primary-500/20 border border-primary-400/30' : 'bg-white/5'}`}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/50 to-primary-700/50 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-white">{item.personalYear}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{item.calendarYear} он {item.calendarYear === pythagorean.currentCalendarYear && <span className="ml-2 text-xs bg-primary-500/30 px-2 py-0.5 rounded-full">Одоо</span>}</p>
                <p className="text-white/60 text-xs truncate">{item.theme}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Хосын харилцааны зөвлөмж" icon="💕" locked={!isPaid}>
        {isPaid ? <CompatibilityChecker lifePath={pythagorean.lifePath} /> : (
          <div className="text-center py-4">
            <p className="text-white/50 text-sm mb-4">Хосын харилцааны дэлгэрэнгүй шинжилгээ авах</p>
            <button onClick={() => setShowPayment(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500/20 to-primary-500/20 border border-rose-400/30 text-rose-300">💕 Тохирлыг шалгах</button>
          </div>
        )}
      </Section>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 mb-6">
        <p className="text-yellow-200/80 text-sm text-center">⚠️ Энэ тайлан нь бэлгэдлийн, зугаа цэнгэлийн чиглэлийн тайлбар юм. Эрүүл мэнд, санхүүгийн мэргэжлийн зөвлөгөөг орлохгүй.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center no-print mb-12">
        <button onClick={() => setShowPayment(true)} disabled={isPaid}
          className={`px-6 py-3 rounded-xl font-medium transition ${isPaid ? 'bg-green-500/20 border border-green-400/30 text-green-300' : 'bg-gradient-to-r from-gold-500 to-gold-600 text-white animate-pulse-glow'}`}>
          {isPaid ? '✅ Бүрэн тайлан нээгдсэн' : '🔓 Бүрэн тайлан — 5,000₮'}
        </button>
        <button onClick={onReset} className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white">✨ Шинэ тайлан</button>
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
        <label className="block text-sm text-white/70 mb-2">Хамтрагчийн амьдралын замын тоо:</label>
        <div className="flex flex-wrap gap-2">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button key={n} onClick={() => setPartnerPath(n)}
              className={`w-10 h-10 rounded-full transition-all ${partnerPath === n ? 'bg-gradient-to-br from-rose-500 to-primary-500 text-white scale-110' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>{n}</button>
          ))}
        </div>
      </div>
      {partnerPath && (() => {
        const result = calcCompatibility(lifePath, partnerPath);
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <p className="text-white font-semibold text-lg">{result.summary}</p>
              <p className="text-3xl font-bold text-primary-300 mt-2">{result.overallScore}%</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {[{label:'💕 Хайр',score:result.loveScore,color:'from-rose-400 to-rose-600'},{label:'🤝 Нөхөрлөл',score:result.friendshipScore,color:'from-primary-400 to-primary-600'},{label:'💼 Ажил',score:result.workScore,color:'from-teal-400 to-teal-600'},{label:'💬 Харилцаа',score:result.communicationScore,color:'from-purple-400 to-purple-600'}].map((item,i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1"><span className="text-white/70">{item.label}</span><span className="text-white">{item.score}%</span></div>
                    <div className="w-full bg-white/10 rounded-full h-2"><div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{width:`${item.score}%`}} /></div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="bg-green-500/10 rounded-lg p-3">
                  <p className="text-green-300 text-xs font-medium mb-1">💪 Давуу тал</p>
                  {result.strengths.map((s,i) => <p key={i} className="text-white/70 text-sm">• {s}</p>)}
                </div>
                <div className="bg-yellow-500/10 rounded-lg p-3">
                  <p className="text-yellow-300 text-xs font-medium mb-1">⚡ Анхаарах зүйл</p>
                  {result.challenges.map((c,i) => <p key={i} className="text-white/70 text-sm">• {c}</p>)}
                </div>
                <div className="bg-primary-500/10 rounded-lg p-3">
                  <p className="text-primary-300 text-xs font-medium mb-1">💡 Зөвлөгөө</p>
                  <p className="text-white/70 text-sm">{result.advice}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
