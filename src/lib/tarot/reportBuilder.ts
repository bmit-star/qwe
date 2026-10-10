// Tarot report builder - generates complete tarot reading reports
import { type TarotCard } from './cards';
import { type SpreadType } from './spread';
import { interpretSpread, type SpreadInterpretation } from './interpretations';

export interface TarotReading {
  id: string;
  timestamp: number;
  question: string;
  spreadType: SpreadType;
  cards: TarotCard[];
  orientations: boolean[];
  interpretation: SpreadInterpretation;
}

export interface TarotReport {
  reading: TarotReading;
  generatedAt: string;
  reportId: string;
}

/**
 * Generate a complete tarot reading
 */
export function generateTarotReading(
  question: string,
  spreadType: SpreadType,
  cards: TarotCard[],
  orientations: boolean[]
): TarotReading {
  const interpretation = interpretSpread(cards, spreadType, orientations);
  
  return {
    id: `tarot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    question,
    spreadType,
    cards,
    orientations,
    interpretation
  };
}

/**
 * Generate a complete tarot report
 */
export function generateTarotReport(reading: TarotReading): TarotReport {
  return {
    reading,
    generatedAt: new Date().toISOString(),
    reportId: `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
}

/**
 * Format tarot report for display
 */
export function formatTarotReport(report: TarotReport): string {
  const { reading } = report;
  const { interpretation } = reading;
  
  let formatted = `# Таротын уншилт\n\n`;
  formatted += `**Асуулт:** ${reading.question}\n`;
  formatted += `**Таркаалал:** ${interpretation.spreadName}\n`;
  formatted += `**Огноо:** ${new Date(reading.timestamp).toLocaleString('mn-MN')}\n\n`;
  
  formatted += `## Ерөнхий сэдэв\n${interpretation.overallTheme}\n\n`;
  
  formatted += `## Картууд\n\n`;
  interpretation.cards.forEach((card, index) => {
    formatted += `### ${index + 1}. ${card.position}\n`;
    formatted += `**${card.card.nameMn}** ${card.isReversed ? '(урвуу)' : '(зөв)'}\n\n`;
    formatted += `${card.meaning}\n\n`;
    formatted += `**Хайр:** ${card.loveMeaning}\n`;
    formatted += `**Карьер:** ${card.careerMeaning}\n`;
    formatted += `**Санхүү:** ${card.financeMeaning}\n`;
    formatted += `**Сорилт:** ${card.challenge}\n\n`;
  });
  
  if (interpretation.keyInsights.length > 0) {
    formatted += `## Гол ойлголтууд\n`;
    interpretation.keyInsights.forEach(insight => {
      formatted += `- ${insight}\n`;
    });
    formatted += `\n`;
  }
  
  if (interpretation.challenges.length > 0) {
    formatted += `## Сорилтууд\n`;
    interpretation.challenges.forEach(challenge => {
      formatted += `- ${challenge}\n`;
    });
    formatted += `\n`;
  }
  
  if (interpretation.recommendations.length > 0) {
    formatted += `## Зөвлөмжүүд\n`;
    interpretation.recommendations.forEach(rec => {
      formatted += `- ${rec}\n`;
    });
    formatted += `\n`;
  }
  
  return formatted;
}
