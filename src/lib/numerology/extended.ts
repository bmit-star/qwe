export interface ZodiacInfo {
  sign: string; signMn: string; element: string; elementMn: string;
  ruling: string; rulingMn: string; dates: string; traits: string;
  luckyNumbers: number[]; luckyColors: string[]; compatibleWith: string[];
}

export const ZODIAC_SIGNS: Record<string, ZodiacInfo> = {
  aries: { sign:'Aries', signMn:'Хонь', element:'Fire', elementMn:'Гал', ruling:'Mars', rulingMn:'Ангараг', dates:'03/21-04/19', traits:'Зоригтой, манлайлагч, шулуун шударга', luckyNumbers:[1,8,17], luckyColors:['Улаан','Алтан'], compatibleWith:['Лев','Нум','Ихэр'] },
  taurus: { sign:'Taurus', signMn:'Үхэр', element:'Earth', elementMn:'Дэлхий', ruling:'Venus', rulingMn:'Сугар', dates:'04/20-05/20', traits:'Тогтвортой, тэвчээртэй, гоо зүйч', luckyNumbers:[2,6,9,12], luckyColors:['Ногоон','Ягаан'], compatibleWith:['Мэлхий','Охин','Матар'] },
  gemini: { sign:'Gemini', signMn:'Ихэр', element:'Air', elementMn:'Агаар', ruling:'Mercury', rulingMn:'Буд', dates:'05/21-06/20', traits:'Хурдан бодогч, харилцаач, олон талт', luckyNumbers:[5,7,14,23], luckyColors:['Шар','Цайвар ногоон'], compatibleWith:['Жинлүүр','Унш','Ихэр'] },
  cancer: { sign:'Cancer', signMn:'Мэлхий', element:'Water', elementMn:'Ус', ruling:'Moon', rulingMn:'Сар', dates:'06/21-07/22', traits:'Мэдрэмтгий, халамжтай, гэр бүлдээ зориулсан', luckyNumbers:[2,3,15,22], luckyColors:['Цагаан','Мөнгөлөг'], compatibleWith:['Үхэр','Хилэнц','Загас'] },
  leo: { sign:'Leo', signMn:'Лев', element:'Fire', elementMn:'Гал', ruling:'Sun', rulingMn:'Нар', dates:'07/23-08/22', traits:'Бүтээлч, итгэлтэй, generous', luckyNumbers:[1,3,10,19], luckyColors:['Алтан','Улбар шар'], compatibleWith:['Хонь','Ихэр','Нум'] },
  virgo: { sign:'Virgo', signMn:'Охин', element:'Earth', elementMn:'Дэлхий', ruling:'Mercury', rulingMn:'Буд', dates:'08/23-09/22', traits:'Нарийн, шинжээч, тусламжтай', luckyNumbers:[5,14,23,32], luckyColors:['Хүрэн','Цэнхэр'], compatibleWith:['Үхэр','Мэлхий','Матар'] },
  libra: { sign:'Libra', signMn:'Жинлүүр', element:'Air', elementMn:'Агаар', ruling:'Venus', rulingMn:'Сугар', dates:'09/23-10/22', traits:'Тэнцвэртэй, дипломат, гоо зүйч', luckyNumbers:[4,6,13,24], luckyColors:['Цэнхэр','Ягаан'], compatibleWith:['Ихэр','Лев','Унш'] },
  scorpio: { sign:'Scorpio', signMn:'Хилэнц', element:'Water', elementMn:'Ус', ruling:'Pluto', rulingMn:'Плутон', dates:'10/23-11/21', traits:'Хүчтэй, нууцлаг, зорилготой', luckyNumbers:[8,11,18,27], luckyColors:['Хар','Гүн улаан'], compatibleWith:['Мэлхий','Загас','Матар'] },
  sagittarius: { sign:'Sagittarius', signMn:'Нум', element:'Fire', elementMn:'Гал', ruling:'Jupiter', rulingMn:'Бархасбадь', dates:'11/22-12/21', traits:'Адал явдалч, философч, нээлттэй', luckyNumbers:[3,7,9,12], luckyColors:['Нил ягаан','Цэнхэр'], compatibleWith:['Хонь','Лев','Унш'] },
  capricorn: { sign:'Capricorn', signMn:'Матар', element:'Earth', elementMn:'Дэлхий', ruling:'Saturn', rulingMn:'Санчир', dates:'12/22-01/19', traits:'Хөдөлмөрч, зорилготой, хариуцлагатай', luckyNumbers:[4,8,13,22], luckyColors:['Хүрэн','Хар'], compatibleWith:['Үхэр','Охин','Хилэнц'] },
  aquarius: { sign:'Aquarius', signMn:'Унш', element:'Air', elementMn:'Агаар', ruling:'Uranus', rulingMn:'Уран', dates:'01/20-02/18', traits:'Шинэлэг, бие даасан, хүмүүнлэг', luckyNumbers:[4,7,11,22], luckyColors:['Цэнхэр','Мөнгөлөг'], compatibleWith:['Ихэр','Жинлүүр','Нум'] },
  pisces: { sign:'Pisces', signMn:'Загас', element:'Water', elementMn:'Ус', ruling:'Neptune', rulingMn:'Далайн ван', dates:'02/19-03/20', traits:'Зөн совинтой, энэрэнгүй, бүтээлч', luckyNumbers:[3,9,12,21], luckyColors:['Ногоон','Цайвар ягаан'], compatibleWith:['Мэлхий','Хилэнц','Матар'] },
};

export function getZodiacSign(month: number, day: number): ZodiacInfo {
  if ((month===3&&day>=21)||(month===4&&day<=19)) return ZODIAC_SIGNS.aries;
  if ((month===4&&day>=20)||(month===5&&day<=20)) return ZODIAC_SIGNS.taurus;
  if ((month===5&&day>=21)||(month===6&&day<=20)) return ZODIAC_SIGNS.gemini;
  if ((month===6&&day>=21)||(month===7&&day<=22)) return ZODIAC_SIGNS.cancer;
  if ((month===7&&day>=23)||(month===8&&day<=22)) return ZODIAC_SIGNS.leo;
  if ((month===8&&day>=23)||(month===9&&day<=22)) return ZODIAC_SIGNS.virgo;
  if ((month===9&&day>=23)||(month===10&&day<=22)) return ZODIAC_SIGNS.libra;
  if ((month===10&&day>=23)||(month===11&&day<=21)) return ZODIAC_SIGNS.scorpio;
  if ((month===11&&day>=22)||(month===12&&day<=21)) return ZODIAC_SIGNS.sagittarius;
  if ((month===12&&day>=22)||(month===1&&day<=19)) return ZODIAC_SIGNS.capricorn;
  if ((month===1&&day>=20)||(month===2&&day<=18)) return ZODIAC_SIGNS.aquarius;
  if ((month===2&&day>=19)||(month===3&&day<=20)) return ZODIAC_SIGNS.pisces;
  return ZODIAC_SIGNS.capricorn;
}

export interface ChineseZodiacInfo {
  animal: string; animalMn: string; element: string; elementMn: string;
  years: number[]; traits: string; compatibleWith: string[]; incompatibleWith: string[];
}

const CHINESE_ANIMALS: Record<string, ChineseZodiacInfo> = {
  rat: { animal:'Rat', animalMn:'Хулгана', element:'Water', elementMn:'Ус', years:[1984,1996,2008,2020], traits:'Ухаалаг, зохион байгуулалттай, сониуч', compatibleWith:['Луу','Бич','Үхэр'], incompatibleWith:['Морь','Туулай'] },
  ox: { animal:'Ox', animalMn:'Үхэр', element:'Earth', elementMn:'Дэлхий', years:[1985,1997,2009,2021], traits:'Хөдөлмөрч, найдвартай, хүчтэй', compatibleWith:['Хулгана','Могой','Тахиа'], incompatibleWith:['Хонь','Морь'] },
  tiger: { animal:'Tiger', animalMn:'Бар', element:'Wood', elementMn:'Мод', years:[1986,1998,2010,2022], traits:'Зоригтой, манлайлагч, өрсөлдөөнтэй', compatibleWith:['Морь','Нохой','Гахай'], incompatibleWith:['Бич','Могой'] },
  rabbit: { animal:'Rabbit', animalMn:'Туулай', element:'Wood', elementMn:'Мод', years:[1987,1999,2011,2023], traits:'Зөөлөн, мэдрэмтгий, урлагийн мэдрэмжтэй', compatibleWith:['Хонь','Гахай','Нохой'], incompatibleWith:['Хулгана','Тахиа'] },
  dragon: { animal:'Dragon', animalMn:'Луу', element:'Earth', elementMn:'Дэлхий', years:[1988,2000,2012,2024], traits:'Хүчирхэг, амбиттай, аз жаргалтай', compatibleWith:['Бич','Хулгана','Могой'], incompatibleWith:['Нохой','Туулай'] },
  snake: { animal:'Snake', animalMn:'Могой', element:'Fire', elementMn:'Гал', years:[1989,2001,2013,2025], traits:'Мэдрэмтгий, нууцлаг, мэргэн', compatibleWith:['Луу','Үхэр','Тахиа'], incompatibleWith:['Бар','Гахай'] },
  horse: { animal:'Horse', animalMn:'Морь', element:'Fire', elementMn:'Гал', years:[1990,2002,2014,2026], traits:'Эрч хүчтэй, бие даасан, нийгэмч', compatibleWith:['Бар','Нохой','Хонь'], incompatibleWith:['Хулгана','Үхэр'] },
  goat: { animal:'Goat', animalMn:'Хонь', element:'Earth', elementMn:'Дэлхий', years:[1991,2003,2015,2027], traits:'Бүтээлч, зөөлөн, хамт ажиллах дуртай', compatibleWith:['Туулай','Морь','Гахай'], incompatibleWith:['Үхэр','Нохой'] },
  monkey: { animal:'Monkey', animalMn:'Бич', element:'Metal', elementMn:'Төмөр', years:[1992,2004,2016,2028], traits:'Ухаалаг, хурдан, олон талт', compatibleWith:['Луу','Хулгана','Могой'], incompatibleWith:['Бар','Гахай'] },
  rooster: { animal:'Rooster', animalMn:'Тахиа', element:'Metal', elementMn:'Төмөр', years:[1993,2005,2017,2029], traits:'Шударга, ажигчамж, зоригтой', compatibleWith:['Үхэр','Могой','Луу'], incompatibleWith:['Туулай','Нохой'] },
  dog: { animal:'Dog', animalMn:'Нохой', element:'Earth', elementMn:'Дэлхий', years:[1994,2006,2018,2030], traits:'Үнэнч, шударга, найз нөхөлдөө зориулсан', compatibleWith:['Морь','Бар','Туулай'], incompatibleWith:['Луу','Тахиа','Хонь'] },
  pig: { animal:'Pig', animalMn:'Гахай', element:'Water', elementMn:'Ус', years:[1995,2007,2019,2031], traits:'Идэвхтэй, нударгатай, энэрэнгүй', compatibleWith:['Туулай','Хонь','Бар'], incompatibleWith:['Могой','Бич'] },
};

export function getChineseZodiac(year: number): ChineseZodiacInfo {
  const animals = ['rat','ox','tiger','rabbit','dragon','snake','horse','goat','monkey','rooster','dog','pig'];
  return CHINESE_ANIMALS[animals[(year - 4) % 12]];
}

export interface CompatibilityResult {
  overallScore: number; loveScore: number; friendshipScore: number;
  workScore: number; communicationScore: number; summary: string;
  strengths: string[]; challenges: string[]; advice: string;
}

export function calcCompatibility(num1: number, num2: number): CompatibilityResult {
  const n1 = num1 > 9 ? num1 % 9 || 9 : num1;
  const n2 = num2 > 9 ? num2 % 9 || 9 : num2;
  const matrix: Record<string, number> = {
    '1-1':7,'1-2':6,'1-3':9,'1-4':5,'1-5':8,'1-6':6,'1-7':7,'1-8':6,'1-9':8,
    '2-2':7,'2-3':6,'2-4':8,'2-5':5,'2-6':9,'2-7':7,'2-8':7,'2-9':6,
    '3-3':7,'3-4':5,'3-5':8,'3-6':7,'3-7':6,'3-8':5,'3-9':9,
    '4-4':7,'4-5':5,'4-6':8,'4-7':6,'4-8':9,'4-9':5,
    '5-5':7,'5-6':6,'5-7':8,'5-8':6,'5-9':7,
    '6-6':8,'6-7':5,'6-8':7,'6-9':9,
    '7-7':7,'7-8':5,'7-9':6,
    '8-8':7,'8-9':6,
    '9-9':8,
  };
  const key = n1 <= n2 ? `${n1}-${n2}` : `${n2}-${n1}`;
  const baseScore = matrix[key] ?? 5;
  const overallScore = baseScore * 10;
  const loveScore = Math.min(100, overallScore + (n1+n2)%3*5);
  const friendshipScore = Math.min(100, overallScore + (n1*n2)%4*3);
  const workScore = Math.min(100, overallScore + Math.abs(n1-n2)*4);
  const communicationScore = Math.min(100, overallScore + (n1+n2)%5*4);
  const strengths = n1===n2 ? ['Бие биенээ маш сайн ойлгоно','Ижил зорилго, үнэ цэнэтэй'] :
    Math.abs(n1-n2)===4||Math.abs(n1-n2)===5 ? ['Бие биенээ нөхөж, тэнцвэржүүлнэ'] : ['Хамтдаа байхад бие биенээ урамшуулна'];
  const challenges = n1===n2 ? ['Ижил сул талуудтай тул давхардах магадлалтай'] :
    Math.abs(n1-n2)===4||Math.abs(n1-n2)===5 ? ['Ойлголцолд цаг хугацаа хэрэгтэй'] : ['Зарим зүйл дээр зөрүүтэй хандлагатай'];
  const summary = overallScore >= 80 ? 'Маш сайн тохирол!' : overallScore >= 60 ? 'Сайн тохирол.' : overallScore >= 40 ? 'Дундаж тохирол.' : 'Сорилттой тохирол.';
  const advices: Record<number,string> = {
    1:'Бие биенийхээ бие даасан байдлыг хүндэл.', 2:'Мэдрэмжээ илэрхийлж, бие биенээ сонсо.',
    3:'Бүтээлч байдлаа хуваалц.', 4:'Тогтвортой байдал, итгэл найдварыг бий болго.',
    5:'Эрх чөлөөгөө хадгалж, хамтдаа шинэ туршлага хуваалц.', 6:'Хайр халамжаа илэрхийл.',
    7:'Дотоод ертөнцөө хуваалц.', 8:'Амжилтаа хуваалцаж, санхүүгийн зорилгоо нэгтгэ.', 9:'Энэрэнгүй сэтгэлээр бие биенээ уучил.',
  };
  return { overallScore, loveScore, friendshipScore, workScore, communicationScore, summary, strengths, challenges, advice: advices[n1] ?? 'Бие биенээ хүндэлж, нээлттэй харилц.' };
}
