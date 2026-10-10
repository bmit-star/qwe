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

// Монгол утасны дугаарын валидац
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[^\d]/g, '');
  // +976 эсвэл 976-аас эхэлсэн 8 оронтой дугаар
  if (digits.startsWith('976')) {
    return digits.length === 11; // 976 + 8 орон
  }
  // Зөвхөн 8 оронтой дугаар
  if (digits.length === 8) {
    const prefixes = ['88','99','95','89','86','80','91','94','85','83','96','98','70','75','76','77','78','79','90'];
    return prefixes.some(p => digits.startsWith(p));
  }
  return false;
}

export function isValidName(name: string): boolean {
  const cyrillicChars = name.match(/[А-Яа-яЁёӨөҮү]/g);
  return cyrillicChars !== null && cyrillicChars.length >= 2;
}

import type { FormErrors } from './types';

export function validateForm(name: string, birthDate: string, phone: string): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = 'Нэрээ оруулна уу';
  else if (!isValidName(name)) errors.name = 'Монгол кирилл үсгээр бичнэ үү (дор хаяж 2 үсэг)';
  if (!birthDate.trim()) errors.birthDate = 'Төрсөн огноогоо оруулна уу';
  else if (!isValidDate(birthDate)) errors.birthDate = 'Буруу огноо. Формат: ОООО/СС/ЖЖЖЖ';
  else if (isFutureDate(birthDate)) errors.birthDate = 'Ирээдүйн огноо оруулах боломжгүй';
  if (!phone.trim()) errors.phone = 'Утасны дугаараа оруулна уу';
  else if (!isValidPhone(phone)) errors.phone = 'Буруу утасны дугаар. Жишээ: +976 9911 2233';
  return errors;
}
