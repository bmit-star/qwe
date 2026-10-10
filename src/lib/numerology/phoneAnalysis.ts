import { reduceStrict } from './calculations';

export interface PhoneAnalysis {
  phoneNumber: string; digits: number[]; totalSum: number; reducedNumber: number;
  meaning: string; compatible: boolean; lifePathMatch: boolean; suggestions: string[];
}

export function extractDigits(phone: string): number[] {
  return phone.replace(/[^\d]/g, '').split('').map(Number);
}

export function calcPhoneSum(digits: number[]): number {
  return digits.reduce((sum, d) => sum + d, 0);
}

export function isMongolianMobile(phone: string): boolean {
  const digits = phone.replace(/[^\d]/g, '');
  const local = digits.startsWith('976') ? digits.slice(3) : digits;
  if (local.length !== 8) return false;
  const prefixes = ['88','99','95','89','86','80','91','94','85','83','96','98'];
  return prefixes.some(p => local.startsWith(p));
}

export function getPhoneMeaning(num: number): string {
  const meanings: Record<number, string> = {
    1: 'Энэ утас бие даасан байдал, шинэ эхлэлийн энергитэй. Бизнес эхлүүлэх, манлайлахад тохиромжтой.',
    2: 'Энэ утас хамтын ажиллагаа, зөөлөн харилцааны энергитэй. Хүний нөөц, зуучлалд тохиромжтой.',
    3: 'Энэ утас бүтээлч байдал, нийгмийн харилцааны энергитэй. Урлаг, медиа, сурталчилгаанд тохиромжтой.',
    4: 'Энэ утас тогтвортой байдал, найдвартай байдлын энергитэй. Барилга, инженерчлэлд тохиромжтой.',
    5: 'Энэ утас эрх чөлөө, өөрчлөлт, аялалын энергитэй. Аялал жуулчлал, худалдаанд тохиромжтой.',
    6: 'Энэ утас хайр халамж, гэр бүлийн энергитэй. Гэр бүлийн бизнес, эмчилгээнд тохиромжтой.',
    7: 'Энэ утас мэдлэг, судалгааны энергитэй. Эрдэм шинжилгээ, технологи, зөвлөгөөнд тохиромжтой.',
    8: 'Энэ утас амжилт, санхүүгийн энергитэй. Банк, санхүү, бизнес, хөрөнгө оруулалтад тохиромжтой.',
    9: 'Энэ утас энэрэл, хүмүүнлэгийн энергитэй. Буяны байгууллага, урлаг, олон улсын харилцаанд тохиромжтой.',
  };
  return meanings[num] ?? '';
}

export function analyzePhone(phone: string, lifePathNumber?: number): PhoneAnalysis {
  const digits = extractDigits(phone);
  const totalSum = calcPhoneSum(digits);
  const reducedNumber = reduceStrict(totalSum);
  const meaning = getPhoneMeaning(reducedNumber);
  const lifePathMatch = lifePathNumber !== undefined && reducedNumber === lifePathNumber;
  const harmonious: Record<number, number[]> = {
    1:[1,3,5], 2:[2,4,6], 3:[1,3,5,9], 4:[2,4,6,8], 5:[1,3,5,7],
    6:[2,4,6,9], 7:[5,7], 8:[4,8], 9:[3,6,9],
  };
  const compatible = lifePathNumber !== undefined && (harmonious[lifePathNumber]?.includes(reducedNumber) ?? false);
  const suggestions = generatePhoneSuggestions(lifePathNumber);
  return { phoneNumber: phone, digits, totalSum, reducedNumber, meaning, compatible, lifePathMatch, suggestions };
}

export function generatePhoneSuggestions(lifePathNumber?: number): string[] {
  if (lifePathNumber === undefined) return ['Амьдралын замын тоогоо оруулсны дараа санал болгоно'];
  const harmonious: Record<number, number[]> = {
    1:[1,3,5], 2:[2,4,6], 3:[1,3,5,9], 4:[2,4,6,8], 5:[1,3,5,7],
    6:[2,4,6,9], 7:[5,7], 8:[4,8], 9:[3,6,9],
  };
  const targets = harmonious[lifePathNumber] ?? [lifePathNumber];
  const suggestions: string[] = [];
  const prefixes = ['99','88','95','89'];
  const targetPrefix = prefixes[lifePathNumber % prefixes.length];
  for (const target of targets.slice(0, 3)) {
    const prefixSum = targetPrefix.split('').reduce((s, c) => s + parseInt(c), 10);
    const possibleSums = [target, target+9, target+18, target+27];
    const remainingSum = possibleSums.find(s => s >= prefixSum + 6 && s <= prefixSum + 54) ?? (target + 18);
    const neededSum = remainingSum - prefixSum;
    const remainingDigits: number[] = [];
    let left = neededSum;
    for (let i = 0; i < 5; i++) {
      const maxForThis = Math.min(9, left - (5-i-1));
      const minForThis = Math.max(0, left - 9*(5-i-1));
      const digit = Math.min(maxForThis, Math.max(minForThis, Math.floor(left/(6-i))));
      remainingDigits.push(digit);
      left -= digit;
    }
    remainingDigits.push(left);
    const number = targetPrefix + remainingDigits.join('');
    suggestions.push(`+976 ${number.slice(0,4)} ${number.slice(4)}`);
  }
  return suggestions;
}
