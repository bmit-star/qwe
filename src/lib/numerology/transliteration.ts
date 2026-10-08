const CYRILLIC_TO_LATIN: Record<string, string> = {
  'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Е':'YE','Ё':'YO','Ж':'J','З':'Z','И':'I',
  'Й':'I','К':'K','Л':'L','М':'M','Н':'N','О':'O','Ө':'Ö','П':'P','Р':'R','С':'S',
  'Т':'T','У':'U','Ү':'Ü','Ф':'F','Х':'KH','Ц':'TS','Ч':'CH','Ш':'SH','Щ':'SH','Ъ':'I',
  'Ы':'Y','Ь':'I','Э':'E','Ю':'YU','Я':'YA',
  'а':'a','б':'b','в':'v','г':'g','д':'d','е':'ye','ё':'yo','ж':'j','з':'z','и':'i',
  'й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','ө':'ö','п':'p','р':'r','с':'s',
  'т':'t','у':'u','ү':'ü','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'sh','ъ':'i',
  'ы':'y','ь':'i','э':'e','ю':'yu','я':'ya',
};

export function transliterate(cyrillic: string): string {
  return cyrillic.split('').map(ch => CYRILLIC_TO_LATIN[ch] ?? ch).join('');
}

const CYRILLIC_VOWELS = new Set(['а','э','и','о','ө','у','ү','е','ё','ю','я','ы','А','Э','И','О','Ө','У','Ү','Е','Ё','Ю','Я','Ы']);

export function isCyrillicVowel(char: string): boolean { return CYRILLIC_VOWELS.has(char); }

export function isCyrillicConsonant(char: string): boolean {
  const cyrillicLetters = 'АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмноөпрстуүфхцчшщъыьэюя';
  return cyrillicLetters.includes(char) && !CYRILLIC_VOWELS.has(char);
}

export function extractVowels(name: string): string { return name.split('').filter(isCyrillicVowel).join(''); }
export function extractConsonants(name: string): string { return name.split('').filter(isCyrillicConsonant).join(''); }
