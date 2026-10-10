import { useState } from 'react';
import { validateForm } from '../lib/numerology';
import type { FormErrors } from '../lib/numerology';

interface NumerologyFormProps { onSubmit: (name: string, birthDate: string, phone: string) => void; isLoading: boolean; }

export default function NumerologyForm({ onSubmit, isLoading }: NumerologyFormProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(name, birthDate, phone);
    setErrors(validationErrors);
    setTouched({ name: true, birthDate: true, phone: true });
    if (Object.keys(validationErrors).length === 0) onSubmit(name.trim(), birthDate.trim(), phone.trim());
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validateForm(name, birthDate, phone));
  };

  const handleDateChange = (value: string) => {
    let formatted = value.replace(/[^\d]/g, '');
    if (formatted.length > 2) formatted = formatted.slice(0,2) + '/' + formatted.slice(2);
    if (formatted.length > 5) formatted = formatted.slice(0,5) + '/' + formatted.slice(5,9);
    setBirthDate(formatted);
  };

  const handlePhoneChange = (value: string) => {
    let digits = value.replace(/[^\d+]/g, '');
    // Auto-format for Mongolian numbers
    if (digits.startsWith('+976')) {
      const local = digits.slice(4);
      if (local.length > 4) digits = '+976 ' + local.slice(0,4) + ' ' + local.slice(4,8);
      else if (local.length > 0) digits = '+976 ' + local;
    } else if (digits.startsWith('976')) {
      const local = digits.slice(3);
      if (local.length > 4) digits = '+976 ' + local.slice(0,4) + ' ' + local.slice(4,8);
      else if (local.length > 0) digits = '+976 ' + local;
      else digits = '+976 ';
    }
    setPhone(digits);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 animate-slide-up">
      <div className="glass-card p-5 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 animate-float">🔢</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Тоон зурхайн тайлангаа авах</h2>
          <p className="text-white/60 text-xs sm:text-sm px-2">Пифагор, Йоог, Одон орон, Хятад зурхай, Тарот зэрэг бүх аргачлалаар</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-white/90 mb-1.5">Таны нэр <span className="text-red-300">*</span></label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => handleBlur('name')}
              placeholder="Бат-Эрдэнэ"
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border ${touched.name && errors.name ? 'border-red-400' : 'border-white/20'} text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400 transition text-sm sm:text-base`}
              aria-invalid={touched.name && !!errors.name} disabled={isLoading} />
            {touched.name && errors.name && <p className="mt-1 text-xs sm:text-sm text-red-300" role="alert">⚠️ {errors.name}</p>}
          </div>
          <div>
            <label htmlFor="birthDate" className="block text-xs sm:text-sm font-medium text-white/90 mb-1.5">Төрсөн огноо <span className="text-red-300">*</span></label>
            <input id="birthDate" type="text" inputMode="numeric" value={birthDate} onChange={(e) => handleDateChange(e.target.value)} onBlur={() => handleBlur('birthDate')}
              placeholder="ОО/СС/ЖЖЖЖ" maxLength={10}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border ${touched.birthDate && errors.birthDate ? 'border-red-400' : 'border-white/20'} text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400 transition font-mono tracking-wider text-sm sm:text-base`}
              aria-invalid={touched.birthDate && !!errors.birthDate} disabled={isLoading} />
            {touched.birthDate && errors.birthDate && <p className="mt-1 text-xs sm:text-sm text-red-300" role="alert">⚠️ {errors.birthDate}</p>}
            <p className="mt-1 text-[10px] sm:text-xs text-white/40">Формат: ОООО/СС/ЖЖЖЖ (жишээ: 15/06/1990)</p>
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-white/90 mb-1.5">Утасны дугаар <span className="text-red-300">*</span></label>
            <input id="phone" type="tel" inputMode="tel" value={phone} onChange={(e) => handlePhoneChange(e.target.value)} onBlur={() => handleBlur('phone')}
              placeholder="+976 9911 2233"
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border ${touched.phone && errors.phone ? 'border-red-400' : 'border-white/20'} text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400 transition font-mono tracking-wider text-sm sm:text-base`}
              aria-invalid={touched.phone && !!errors.phone} disabled={isLoading} />
            {touched.phone && errors.phone && <p className="mt-1 text-xs sm:text-sm text-red-300" role="alert">⚠️ {errors.phone}</p>}
            <p className="mt-1 text-[10px] sm:text-xs text-white/40">Тайланг энэ дугаарт илгээнэ</p>
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold text-base sm:text-lg hover:from-primary-600 hover:to-primary-800 transition-all disabled:opacity-50 animate-pulse-glow mt-2">
            {isLoading ? 'Тооцоолж байна...' : '✨ Тайлангаа авах'}
          </button>
        </form>
      </div>
    </div>
  );
}
