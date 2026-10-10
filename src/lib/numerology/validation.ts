export function isValidDate(dateStr: string): boolean {
  const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return false;
  const day = parseInt(match[1], 10), month = parseInt(match[2], 10), year = parseInt(match[3], 10);
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > 2100) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function isFutureDate(dateStr: string): boolean {
  const match = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return false;
  const day = parseInt(match[1], 10), month = parseInt(match[2], 10), year = parseInt(match[3], 10);
  const now = new Date();
  const ubStr = now.toLocaleString('en-US', { timeZone: 'Asia/Ulaanbaatar' });
  const ubNow = new Date(ubStr);
  return new Date(year, month - 1, day) > ubNow;
}

export function isValidEmail(email: string): boolean { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

export function isValidName(name: string): boolean {
  const cyrillicChars = name.match(/[А-Яа-яЁёӨөҮү]/g);
  return cyrillicChars !== null && cyrillicChars.length >= 2;
}

import type { FormErrors } from './types';
export function validateForm(name: string, birthDate: string, email: string): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = 'Нэрээ оруулна уу';
  else if (!isValidName(name)) errors.name = 'Монгол кирилл үсгээр бичнэ үү (дор хаяж 2 үсэг)';
  if (!birthDate.trim()) errors.birthDate = 'Төрсөн огноогоо оруулна уу';
  else if (!isValidDate(birthDate)) errors.birthDate = 'Буруу огноо. Формат: ОООО/СС/ЖЖЖЖ';
  else if (isFutureDate(birthDate)) errors.birthDate = 'Ирээдүйн огноо оруулах боломжгүй';
  if (!email.trim()) errors.email = 'Имэйл хаягаа оруулна уу';
  else if (!isValidEmail(email)) errors.email = 'Зөв имэйл хаяг оруулна уу';
  return errors;
}
