import { useState } from 'react';
import { TAROT_CARDS, shuffleDeck, selectCards, getCardOrientation } from '../lib/tarot';
import type { SpreadType } from '../lib/tarot';
import type { TarotCard } from '../lib/tarot';

interface TarotReadingProps {
  onComplete: (cards: TarotCard[], orientations: boolean[], spreadType: SpreadType, question: string) => void;
}

export default function TarotReading({ onComplete }: TarotReadingProps) {
  const [question, setQuestion] = useState('');
  const [spreadType, setSpreadType] = useState<SpreadType>('three-card');
  const [deck, setDeck] = useState<TarotCard[] | null>(null);
  const [selectedCards, setSelectedCards] = useState<{ card: TarotCard; index: number }[]>([]);
  const [isShuffled, setIsShuffled] = useState(false);

  const spreadCardCounts: Record<SpreadType, number> = {
    'single': 1,
    'three-card': 3,
    'five-card': 5,
    'seven-card': 7
  };

  const handleShuffle = () => {
    const shuffled = shuffleDeck();
    setDeck(shuffled.cards);
    setSelectedCards([]);
    setIsShuffled(true);
  };

  const handleCardSelect = (card: TarotCard, index: number) => {
    const requiredCount = spreadCardCounts[spreadType];
    
    if (selectedCards.find(sc => sc.card.id === card.id)) {
      // Deselect
      setSelectedCards(selectedCards.filter(sc => sc.card.id !== card.id));
    } else if (selectedCards.length < requiredCount) {
      // Select
      setSelectedCards([...selectedCards, { card, index }]);
    }
  };

  const handleSubmit = () => {
    if (selectedCards.length === spreadCardCounts[spreadType]) {
      const cards = selectedCards.map(sc => sc.card);
      const orientations = cards.map(() => getCardOrientation());
      onComplete(cards, orientations, spreadType, question);
    }
  };

  const requiredCount = spreadCardCounts[spreadType];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          🎴 Таротын уншилт
        </h2>

        {/* Question input */}
        <div className="mb-6">
          <label className="block text-white/80 mb-2">Таны асуулт:</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Асуултаа энд бичнэ үү..."
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
          />
        </div>

        {/* Spread type selection */}
        <div className="mb-6">
          <label className="block text-white/80 mb-2">Таркаалалын төрөл:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['single', 'three-card', 'five-card', 'seven-card'] as SpreadType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSpreadType(type)}
                className={`px-4 py-3 rounded-lg border transition ${
                  spreadType === type
                    ? 'bg-purple-500/30 border-purple-400 text-white'
                    : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10'
                }`}
              >
                <div className="font-semibold">{spreadCardCounts[type]} карт</div>
                <div className="text-xs mt-1">
                  {type === 'single' && 'Нэг карт'}
                  {type === 'three-card' && 'Гурван карт'}
                  {type === 'five-card' && 'Таван карт'}
                  {type === 'seven-card' && 'Долоон карт'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Shuffle button */}
        {!isShuffled && (
          <button
            onClick={handleShuffle}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
          >
            🎴 Картуудыг холих
          </button>
        )}

        {/* Card selection */}
        {isShuffled && deck && (
          <div>
            <div className="mb-4 text-center text-white/80">
              {selectedCards.length} / {requiredCount} карт сонгосон
            </div>

            {/* Selected cards display */}
            {selectedCards.length > 0 && (
              <div className="mb-6 p-4 bg-white/5 rounded-lg">
                <h3 className="text-white/80 mb-3 font-semibold">Сонгосон картууд:</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedCards.map((sc, idx) => (
                    <div key={sc.card.id} className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-3">
                      <div className="text-xs text-purple-300 mb-1">#{idx + 1}</div>
                      <div className="text-white font-semibold">{sc.card.nameMn}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deck display */}
            <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-13 gap-2 mb-6">
              {deck.slice(0, 39).map((card, index) => {
                const isSelected = selectedCards.find(sc => sc.card.id === card.id);
                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardSelect(card, index)}
                    className={`aspect-[2/3] rounded-lg border-2 transition transform hover:scale-105 ${
                      isSelected
                        ? 'bg-purple-500/40 border-purple-400 scale-105'
                        : selectedCards.length >= requiredCount
                        ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                        : 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-white/20 hover:border-purple-400/50'
                    }`}
                    disabled={selectedCards.length >= requiredCount && !isSelected}
                  >
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      {isSelected ? '✨' : '🎴'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submit button */}
            {selectedCards.length === requiredCount && (
              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition"
              >
                ✨ Уншилтыг эхлүүлэх
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
