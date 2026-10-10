export interface NumerologyInput { name: string; birthDate: string; email: string; }

export interface PythagoreanNumbers {
  lifePath: number; expression: number; soulUrge: number; personality: number;
  birthday: number; maturity: number; personalYear: number; personalYearCurrent: number;
  currentCalendarYear: number; pinnacle1: number; pinnacle2: number; pinnacle3: number; pinnacle4: number;
  challenge1: number; challenge2: number; challenge3: number; challenge4: number;
}

export interface YogicNumbers {
  destiny: number; pathNumber: number; nameNumber: number;
  missingNumbers: number[]; tantricBodyMapping: { body: string; number: number }[];
}

export interface NineYearCycleItem {
  calendarYear: number; personalYear: number; theme: string; opportunity: string;
  career: string; relationships: string; personalDevelopment: string; caution: string; recommendedAction: string;
}

export interface NumerologyReport {
  id: string; name: string; birthDate: string; email: string; createdAt: string;
  pythagorean: PythagoreanNumbers; yogic: YogicNumbers; nineYearCycle: NineYearCycleItem[];
  reportSource: 'ai' | 'fallback'; engineVersion: string;
}

export interface FormErrors { name?: string; birthDate?: string; email?: string; phone?: string; }
