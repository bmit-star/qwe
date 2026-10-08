import { transliterate, extractVowels, extractConsonants } from './transliteration';
import type { PythagoreanNumbers, YogicNumbers, NineYearCycleItem, NumerologyReport } from './types';

export const ENGINE_VERSION = '2.0.0';

const PYTHAGOREAN_MAP: Record<string, number> = {
  A:1,J:1,S:1, B:2,K:2,T:2, C:3,L:3,U:3, D:4,M:4,V:4,
  E:5,N:5,W:5, F:6,O:6,X:6, G:7,P:7,Y:7, H:8,Q:8,Z:8, I:9,R:9,
};

const YOGIC_MAP: Record<string, number> = {
  A:1,I:1,J:1,Q:1,Y:1, B:2,K:2,R:2, C:3,G:3,L:3,S:3,
  D:4,M:4,T:4, E:5,H:5,N:5,X:5, U:6,V:6,W:6, O:7,Z:7, F:8,P:8,
};

export function reduceToSingle(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return num;
}

export function reduceStrict(num: number): number {
  while (num > 9) { num = String(num).split('').reduce((sum, d) => sum + parseInt(d, 10), 0); }
  return num;
}

function sumDigits(str: string): number {
  return str.split('').reduce((sum, ch) => { const d = parseInt(ch, 10); return sum + (isNaN(d) ? 0 : d); }, 0);
}

function sumPythagorean(latin: string): number {
  return latin.split('').reduce((sum, ch) => sum + (PYTHAGOREAN_MAP[ch.toUpperCase()] ?? 0), 0);
}

function sumYogic(latin: string): number {
  return latin.split('').reduce((sum, ch) => sum + (YOGIC_MAP[ch.toUpperCase()] ?? 0), 0);
}

export function parseDate(dateStr: string): { day: number; month: number; year: number } {
  const [d, m, y] = dateStr.split('/').map(Number);
  return { day: d, month: m, year: y };
}

function calcLifePath(day: number, month: number, year: number): number {
  return reduceToSingle(reduceToSingle(sumDigits(String(day))) + reduceToSingle(sumDigits(String(month))) + reduceToSingle(sumDigits(String(year))));
}

function calcExpression(name: string): number {
  const latin = transliterate(name).replace(/[^a-zA-Z]/g, '');
  return reduceToSingle(sumPythagorean(latin));
}

function calcSoulUrge(name: string): number {
  const vowels = extractVowels(name);
  const latin = transliterate(vowels).replace(/[^a-zA-Z]/g, '');
  return reduceToSingle(sumPythagorean(latin));
}

function calcPersonality(name: string): number {
  const consonants = extractConsonants(name);
  const latin = transliterate(consonants).replace(/[^a-zA-Z]/g, '');
  return reduceToSingle(sumPythagorean(latin));
}

function calcBirthday(day: number): number { return reduceToSingle(sumDigits(String(day))); }
function calcMaturity(lifePath: number, expression: number): number { return reduceToSingle(lifePath + expression); }
function calcPersonalYear(day: number, month: number, calendarYear: number): number {
  return reduceToSingle(sumDigits(String(day)) + sumDigits(String(month)) + sumDigits(String(calendarYear)));
}

function calcPinnacles(lifePath: number, expression: number): number[] {
  const first = reduceToSingle(lifePath + expression);
  const second = reduceToSingle(expression + lifePath);
  return [first, second, reduceToSingle(first + second), reduceToSingle(lifePath + expression)];
}

function calcChallenges(day: number, month: number): number[] {
  const d = reduceStrict(sumDigits(String(day))), m = reduceStrict(sumDigits(String(month)));
  const first = Math.abs(d - m);
  return [first, d, Math.abs(first - reduceStrict(sumDigits(String(day)))), m];
}

export function calcPythagorean(name: string, day: number, month: number, year: number, currentYear: number): PythagoreanNumbers {
  const lifePath = calcLifePath(day, month, year);
  const expression = calcExpression(name);
  const pinnacles = calcPinnacles(lifePath, expression);
  const challenges = calcChallenges(day, month);
  const personalYearCurrent = calcPersonalYear(day, month, currentYear);
  return {
    lifePath, expression, soulUrge: calcSoulUrge(name), personality: calcPersonality(name),
    birthday: calcBirthday(day), maturity: calcMaturity(lifePath, expression),
    personalYear: personalYearCurrent, personalYearCurrent, currentCalendarYear: currentYear,
    pinnacle1: pinnacles[0], pinnacle2: pinnacles[1], pinnacle3: pinnacles[2], pinnacle4: pinnacles[3],
    challenge1: challenges[0], challenge2: challenges[1], challenge3: challenges[2], challenge4: challenges[3],
  };
}

function calcYogicDestiny(day: number): number { return reduceStrict(sumDigits(String(day))); }
function calcYogicPath(day: number, month: number, year: number): number { return reduceStrict(sumDigits(String(day) + String(month) + String(year))); }
function calcYogicName(name: string): number {
  const latin = transliterate(name).replace(/[^a-zA-Z]/g, '');
  return reduceStrict(sumYogic(latin));
}

function findMissingNumbers(day: number, month: number, year: number): number[] {
  const present = new Set((String(day) + String(month) + String(year)).split('').map(Number));
  return [1,2,3,4,5,6,7,8,9].filter(i => !present.has(i));
}

function calcTantricBodies(pythagorean: PythagoreanNumbers, yogic: { destiny: number; pathNumber: number }): { body: string; number: number }[] {
  return [
    { body: 'Бие махбод', number: pythagorean.lifePath },
    { body: 'Энергийн биет', number: pythagorean.expression },
    { body: 'Сэтгэлийн биет', number: pythagorean.soulUrge },
    { body: 'Оюун ухааны биет', number: yogic.destiny },
    { body: 'Сүнсний биет', number: yogic.pathNumber },
  ];
}

export function calcYogic(name: string, day: number, month: number, year: number, pythagorean: PythagoreanNumbers): YogicNumbers {
  const destiny = calcYogicDestiny(day);
  const pathNumber = calcYogicPath(day, month, year);
  return {
    destiny, pathNumber, nameNumber: calcYogicName(name),
    missingNumbers: findMissingNumbers(day, month, year),
    tantricBodyMapping: calcTantricBodies(pythagorean, { destiny, pathNumber }),
  };
}

function getNineYearTheme(n: number): string {
  const t: Record<number,string> = {
    1:'Шинэ эхлэлийн жил', 2:'Хамтын хүчийг мэдрэх жил', 3:'Бүтээлч сэтгэлгээний жил',
    4:'Суурь бэхжүүлэх жил', 5:'Эрх чөлөөний жил', 6:'Хайр халамжийн жил',
    7:'Дотоод ертөнцийн жил', 8:'Амжилтын жил', 9:'Дуусгаврын жил',
  };
  return t[n] ?? '';
}

function getNineYearOpportunity(n: number): string {
  const t: Record<number,string> = {
    1:'Шинэ төсөл эхлүүлэх', 2:'Түнштэйгээ хамтрах', 3:'Бүтээлч ажлаа танилцуулах',
    4:'Урт хугацааны хөрөнгө оруулалт', 5:'Шинэ газар үзэх', 6:'Гэр бүлд зориулсан төсөл',
    7:'Судалгааны ажил эхлүүлэх', 8:'Хөрөнгө оруулалт, бизнесийн өргөжүүлэлт', 9:'Буяны үйлсэд оролцох',
  };
  return t[n] ?? '';
}

function getNineYearCareer(n: number): string {
  const t: Record<number,string> = {
    1:'Бие даасан төсөл, манлайлал', 2:'Багийн ажил, хүний нөөц', 3:'Урлаг, медиа, сурталчилгаа',
    4:'Инженерчлэл, менежмент', 5:'Аялал жуулчлал, худалдаа', 6:'Багшлах, эмчлэх, дизайн',
    7:'Эрдэм шинжилгээ, IT', 8:'Банк санхүү, хууль', 9:'Уран зураг, олон улсын байгууллага',
  };
  return t[n] ?? '';
}

function getNineYearRelationships(n: number): string {
  const t: Record<number,string> = {
    1:'Шинэ хүмүүстэй танилцах', 2:'Хамтрагчтайгаа ярилцах', 3:'Найз нөхөдтэй цаг өнгөрөөх',
    4:'Гэр бүлийн тогтвортой байдал', 5:'Хамтдаа аялах', 6:'Гэр бүлдээ цаг зарцуулах',
    7:'Хамтдаа бясалгах', 8:'Хамтын зорилтод хүрэх', 9:'Өнгөрсөн гомдлоо уучлах',
  };
  return t[n] ?? '';
}

function getNineYearPersonalDevelopment(n: number): string {
  const t: Record<number,string> = {
    1:'Өөртөө итгэх итгэлээ бэхжүүлэх', 2:'Тэвчээр, мэдрэмж чанараа нэмэгдүүлэх',
    3:'Бүтээлч сэтгэлгээгээ чөлөөтэй илэрхийлэх', 4:'Дэг журам, тууштай байдлыг хэвшүүлэх',
    5:'Дасан зохицох чадвараа сорих', 6:'Хариуцлагыг мэдрэх, тэнцвэрийг олох',
    7:'Бясалгал, ном унших', 8:'Санхүүгийн боловсролоо дээшлүүлэх', 9:'Уучлал, энэрэнгүй сэтгэлийг хөгжүүлэх',
  };
  return t[n] ?? '';
}

function getNineYearCaution(n: number): string {
  const t: Record<number,string> = {
    1:'Түргэн шийдвэр, бардамнал', 2:'Хэт мэдрэмтгий байдал', 3:'Тархалт, гадаргуугийн байдал',
    4:'Хэт хатуу чанд', 5:'Хэт их өөрчлөлт', 6:'Бусдыг хэт халамжлах',
    7:'Бусдаас хэт холдох', 8:'Мөнгө эрх мэдлийн төлөө шунахайрах', 9:'Өнгөрсөндөө гацах',
  };
  return t[n] ?? '';
}

function getNineYearAction(n: number): string {
  const t: Record<number,string> = {
    1:'Шинэ зорилго тавиарай', 2:'Хамтрагчтайгаа ярилц', 3:'Бүтээлчээр илэрхийл',
    4:'Төлөвлөгөө гарга', 5:'Шинэ зүйл турш', 6:'Гэр бүлдээ цаг зарцуул',
    7:'Бясалгал хий', 8:'Санхүүгээ зохион байгуул', 9:'Өнгөрсөнгөө орхи, уучил',
  };
  return t[n] ?? '';
}

export function calcNineYearCycle(day: number, month: number, currentYear: number): NineYearCycleItem[] {
  const cycle: NineYearCycleItem[] = [];
  for (let i = 0; i < 9; i++) {
    const calendarYear = currentYear + i;
    const personalYear = calcPersonalYear(day, month, calendarYear);
    cycle.push({
      calendarYear, personalYear,
      theme: getNineYearTheme(personalYear), opportunity: getNineYearOpportunity(personalYear),
      career: getNineYearCareer(personalYear), relationships: getNineYearRelationships(personalYear),
      personalDevelopment: getNineYearPersonalDevelopment(personalYear),
      caution: getNineYearCaution(personalYear), recommendedAction: getNineYearAction(personalYear),
    });
  }
  return cycle;
}

export function getCurrentYear(): number {
  const now = new Date();
  return parseInt(now.toLocaleString('en-US', { timeZone: 'Asia/Ulaanbaatar', year: 'numeric' }), 10);
}

export function generateReport(id: string, name: string, birthDate: string, email: string): NumerologyReport {
  const { day, month, year } = parseDate(birthDate);
  const currentYear = getCurrentYear();
  const pythagorean = calcPythagorean(name, day, month, year, currentYear);
  const yogic = calcYogic(name, day, month, year, pythagorean);
  const nineYearCycle = calcNineYearCycle(day, month, currentYear);
  return { id, name, birthDate, email, createdAt: new Date().toISOString(), pythagorean, yogic, nineYearCycle, reportSource: 'fallback', engineVersion: ENGINE_VERSION };
}
