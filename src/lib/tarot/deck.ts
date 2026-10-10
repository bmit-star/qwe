// Tarot deck management - shuffle and select cards
import { TAROT_CARDS, type TarotCard } from './cards';

export interface ShuffledDeck {
  cards: TarotCard[];
  originalOrder: string[]; // Card IDs in original order
  shuffledAt: number; // Timestamp
}

/**
 * Shuffle deck using Fisher-Yates algorithm
 * Deterministic - same seed produces same shuffle
 */
export function shuffleDeck(seed?: number): ShuffledDeck {
  const cards = [...TAROT_CARDS];
  const originalOrder = cards.map(c => c.id);
  
  // Simple random shuffle (could be made deterministic with seed)
  for (let i = cards.length - 1; i > 0; i--) {
    const j = seed !== undefined 
      ? Math.floor((seed * (i + 1)) % (i + 1))
      : Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  
  return {
    cards,
    originalOrder,
    shuffledAt: Date.now()
  };
}

/**
 * Select cards from deck without replacement
 */
export function selectCards(
  deck: ShuffledDeck, 
  count: number, 
  indices: number[]
): TarotCard[] {
  if (count !== indices.length) {
    throw new Error('Count must match indices length');
  }
  
  // Validate indices
  for (const idx of indices) {
    if (idx < 0 || idx >= deck.cards.length) {
      throw new Error(`Invalid index: ${idx}`);
    }
  }
  
  // Check for duplicates
  const uniqueIndices = new Set(indices);
  if (uniqueIndices.size !== indices.length) {
    throw new Error('Duplicate indices not allowed');
  }
  
  return indices.map(idx => deck.cards[idx]);
}

/**
 * Determine card orientation (upright or reversed)
 * Returns true for upright, false for reversed
 */
export function getCardOrientation(seed?: number): boolean {
  return seed !== undefined ? seed % 2 === 0 : Math.random() > 0.5;
}
