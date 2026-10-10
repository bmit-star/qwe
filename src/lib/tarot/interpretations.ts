// Tarot interpretation logic - combines cards with positions
import { type TarotCard } from './cards';
import { type SpreadType, getSpread } from './spread';

export interface CardInterpretation {
  card: TarotCard;
  position: string;
  positionDescription: string;
  isReversed: boolean;
  meaning: string;
  loveMeaning: string;
  careerMeaning: string;
  financeMeaning: string;
  challenge: string;
  advice: string[];
}

export interface SpreadInterpretation {
  spreadType: SpreadType;
  spreadName: string;
  cards: CardInterpretation[];
  overallTheme: string;
  keyInsights: string[];
  challenges: string[];
  recommendations: string[];
}

/**
 * Interpret a single card in a position
 */
export function interpretCard(
  card: TarotCard,
  positionName: string,
  positionDescription: string,
  isReversed: boolean
): CardInterpretation {
  const baseMeaning = isReversed ? card.reversedMeaning : card.uprightMeaning;
  
  return {
    card,
    position: positionName,
    positionDescription,
    isReversed,
    meaning: baseMeaning,
    loveMeaning: card.loveMeaning,
    careerMeaning: card.careerMeaning,
    financeMeaning: card.financeMeaning,
    challenge: card.challengeMeaning,
    advice: card.advice
  };
}

/**
 * Generate overall theme from multiple cards
 */
function generateOverallTheme(cards: CardInterpretation[]): string {
  if (cards.length === 0) return '';
  
  // Count suits
  const suitCounts: Record<string, number> = {};
  cards.forEach(c => {
    if (c.card.suit) {
      suitCounts[c.card.suit] = (suitCounts[c.card.suit] || 0) + 1;
    }
  });
  
  // Find dominant suit
  const dominantSuit = Object.entries(suitCounts).sort((a, b) => b[1] - a[1])[0];
  
  if (dominantSuit) {
    const suitThemes: Record<string, string> = {
      'wands': 'Бүтээлч эрч хүч, ур чадвар, шинэ эхлэл',
      'cups': 'Хайр, мэдрэмж, харилцаа, сэтгэл хөдлөл',
      'swords': 'Сэтгэлгээ, шинжилгээ, шийдвэр, сорилт',
      'pentacles': 'Материаллаг зүйл, санхүү, тогтвортой байдал'
    };
    return suitThemes[dominantSuit[0]] || 'Холимог энерги';
  }
  
  return 'Таны асуултын хариулт олон талт байна';
}

/**
 * Extract key insights from cards
 */
function extractKeyInsights(cards: CardInterpretation[]): string[] {
  const insights: string[] = [];
  
  cards.forEach(card => {
    if (card.card.arcana === 'major') {
      insights.push(`${card.card.nameMn} карт нь ${card.position} байрлалд ${card.isReversed ? 'урвуу' : 'зөв'} байрлаж, ${card.meaning.toLowerCase()}`);
    }
  });
  
  // Check for repeated themes
  const keywords = cards.flatMap(c => c.card.keywords);
  const keywordCounts: Record<string, number> = {};
  keywords.forEach(kw => {
    keywordCounts[kw] = (keywordCounts[kw] || 0) + 1;
  });
  
  const repeatedKeywords = Object.entries(keywordCounts)
    .filter(([_, count]) => count > 1)
    .map(([keyword]) => keyword);
  
  if (repeatedKeywords.length > 0) {
    insights.push(`Давтагдсан сэдэв: ${repeatedKeywords.join(', ')}`);
  }
  
  return insights;
}

/**
 * Extract challenges from cards
 */
function extractChallenges(cards: CardInterpretation[]): string[] {
  return cards.map(card => card.challenge).filter(ch => ch.length > 0);
}

/**
 * Generate recommendations from cards
 */
function generateRecommendations(cards: CardInterpretation[]): string[] {
  const allAdvice = cards.flatMap(card => card.advice);
  const uniqueAdvice = [...new Set(allAdvice)];
  return uniqueAdvice.slice(0, 5); // Limit to 5 recommendations
}

/**
 * Interpret a complete spread
 */
export function interpretSpread(
  cards: TarotCard[],
  spreadType: SpreadType,
  orientations: boolean[]
): SpreadInterpretation {
  const spread = getSpread(spreadType);
  
  if (cards.length !== spread.positions.length) {
    throw new Error(`Expected ${spread.positions.length} cards, got ${cards.length}`);
  }
  
  const cardInterpretations = cards.map((card, index) => 
    interpretCard(
      card,
      spread.positions[index].name,
      spread.positions[index].description,
      !orientations[index] // false = reversed
    )
  );
  
  return {
    spreadType,
    spreadName: spread.name,
    cards: cardInterpretations,
    overallTheme: generateOverallTheme(cardInterpretations),
    keyInsights: extractKeyInsights(cardInterpretations),
    challenges: extractChallenges(cardInterpretations),
    recommendations: generateRecommendations(cardInterpretations)
  };
}
