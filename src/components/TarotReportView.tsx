import type { TarotCard, SpreadType } from '../lib/tarot';
import { interpretSpread } from '../lib/tarot';

interface TarotReportViewProps {
  cards: TarotCard[];
  orientations: boolean[];
  spreadType: SpreadType;
  question: string;
  onReset: () => void;
}

export default function TarotReportView({ cards, orientations, spreadType, question, onReset }: TarotReportViewProps) {
  const interpretation = interpretSpread(cards, spreadType, orientations);

  const spreadNames: Record<SpreadType, string> = {
    'single': 'Нэг карт',
    'three-card': 'Гурван карт',
    'five-card': 'Таван карт',
    'seven-card': 'Долоон карт'
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">✨ Таротын тайлан</h2>
          <p className="text-white/60 text-sm">{new Date().toLocaleDateString('mn-MN')}</p>
        </div>

        {/* Question */}
        {question && (
          <div className="mb-6 p-4 bg-purple-500/10 border border-purple-400/20 rounded-lg">
            <p className="text-purple-300 text-sm mb-1">Таны асуулт:</p>
            <p className="text-white">{question}</p>
          </div>
        )}

        {/* Spread info */}
        <div className="mb-6 text-center">
          <p className="text-white/80">
            <span className="font-semibold">{spreadNames[spreadType]}</span> • {cards.length} карт
          </p>
        </div>

        {/* Overall theme */}
        <div className="mb-8 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-3">🌟 Ерөнхий сэдэв</h3>
          <p className="text-white/90 leading-relaxed">{interpretation.overallTheme}</p>
        </div>

        {/* Cards */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">🎴 Картуудын тайлбар</h3>
          <div className="space-y-4">
            {interpretation.cards.map((card, index) => (
              <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-3xl">
                    {card.isReversed ? '🔄' : '✨'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-purple-300">#{index + 1}</span>
                      <span className="text-xs text-white/60">• {card.position}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{card.card.nameMn}</h4>
                    <p className="text-xs text-white/60 mb-2">{card.card.nameEn}</p>
                    {card.isReversed && (
                      <span className="inline-block px-2 py-1 bg-red-500/20 border border-red-400/30 rounded text-xs text-red-300">
                        Урвуу байрлал
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-white/60 mb-1">Байрлалын утга:</p>
                    <p className="text-white/80 text-sm">{card.positionDescription}</p>
                  </div>

                  <div>
                    <p className="text-xs text-white/60 mb-1">Үндсэн утга:</p>
                    <p className="text-white/90 text-sm leading-relaxed">{card.meaning}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3 pt-3 border-t border-white/10">
                    <div>
                      <p className="text-xs text-pink-300 mb-1">💕 Хайр:</p>
                      <p className="text-white/80 text-xs">{card.loveMeaning}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 mb-1">💼 Карьер:</p>
                      <p className="text-white/80 text-xs">{card.careerMeaning}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-300 mb-1">💰 Санхүү:</p>
                      <p className="text-white/80 text-xs">{card.financeMeaning}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <p className="text-xs text-yellow-300 mb-1">⚠️ Сорилт:</p>
                    <p className="text-white/80 text-sm">{card.challenge}</p>
                  </div>

                  {card.advice.length > 0 && (
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-xs text-cyan-300 mb-2">💡 Зөвлөмж:</p>
                      <ul className="space-y-1">
                        {card.advice.map((adv, i) => (
                          <li key={i} className="text-white/80 text-sm flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">•</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key insights */}
        {interpretation.keyInsights.length > 0 && (
          <div className="mb-8 p-6 bg-blue-500/10 border border-blue-400/20 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-3">🔑 Гол ойлголтууд</h3>
            <ul className="space-y-2">
              {interpretation.keyInsights.map((insight, i) => (
                <li key={i} className="text-white/90 text-sm flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges */}
        {interpretation.challenges.length > 0 && (
          <div className="mb-8 p-6 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-3">⚠️ Анхаарах зүйлс</h3>
            <ul className="space-y-2">
              {interpretation.challenges.map((challenge, i) => (
                <li key={i} className="text-white/90 text-sm flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {interpretation.recommendations.length > 0 && (
          <div className="mb-8 p-6 bg-green-500/10 border border-green-400/20 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-3">✅ Зөвлөмжүүд</h3>
            <ul className="space-y-2">
              {interpretation.recommendations.map((rec, i) => (
                <li key={i} className="text-white/90 text-sm flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
          <p className="text-white/60 text-xs text-center">
            ⚠️ Энэ уншилт нь зөвлөмж, чиглүүлэг мэдээлэл болно. Амьдралын чухал шийдвэрийг гаргахдаа
            өөрийн зөн совин, бодит нөхцөл байдлыг үндэслэнэ үү.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onReset}
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
          >
            🔄 Шинэ уншилт
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition"
          >
            🖨️ Хэвлэх
          </button>
        </div>
      </div>
    </div>
  );
}
