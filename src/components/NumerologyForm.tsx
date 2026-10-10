import { useState } from 'react';
import { validateForm } from '../lib/numerology';
import type { FormErrors } from '../lib/numerology';

interface NumerologyFormProps { onSubmit: (name: string, birthDate: string, email: string) => void; isLoading: boolean; }

export default function NumerologyForm({ onSubmit, isLoading }: NumerologyFormProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(name, birthDate, email);
    setErrors(validationErrors);
    setTouched({ name: true, birthDate: true, email: true });
    if (Object.keys(validationErrors).length === 0) onSubmit(name.trim(), birthDate.trim(), email.trim());
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validateForm(name, birthDate, email));
  };

  const handleDateChange = (value: string) => {
    let formatted = value.replace(/[^\d]/g, '');
    if (formatted.length > 2) formatted = formatted.slice(0,2) + '/' + formatted.slice(2);
    if (formatted.length > 5) formatted = formatted.slice(0,5) + '/' + formatted.slice(5,9);
    setBirthDate(formatted);
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-slide-up px-2">
      <div className="glass-card p-4 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 animate-float">🔢</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Тоон зурхайн тайлангаа авах</h2>
          <p className="text-white/60 text-xs sm:text-sm">Пифагор, Йоог болон 9 жилийн мөчлөг дээр суурилсан</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1.5">Таны нэр <span className="text-red-300">*</span></label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => handleBlur('name')}
              placeholder="Бат-Эрдэнэ"
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${touched.name && errors.name ? 'border-red-400' : 'border-white/20'} text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400 transition`}
              aria-invalid={touched.name && !!errors.name} disabled={isLoading} />
            {touched.name && errors.name && <p className="mt-1 text-sm text-red-300" role="alert">⚠️ {errors.name}</p>}
            <p className="mt-1 text-xs text-white/40">Монгол кирилл үсгээр бичнэ үү</p>
          </div>
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-white/90 mb-1.5">Төрсөн огноо <span className="text-red-300">*</span></label>
            <input id="birthDate" type="text" value={birthDate} onChange={(e) => handleDateChange(e.target.value)} onBlur={() => handleBlur('birthDate')}
              placeholder="ОО/СС/ЖЖЖЖ" maxLength={10}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${touched.birthDate && errors.birthDate ? 'border-red-400' : 'border-white/20'} text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400 transition font-mono tracking-wider`}
              aria-invalid={touched.birthDate && !!errors.birthDate} disabled={isLoading} />
            {touched.birthDate && errors.birthDate && <p className="mt-1 text-sm text-red-300" role="alert">⚠️ {errors.birthDate}</p>}
            <p className="mt-1 text-xs text-white/40">Формат: ОООО/СС/ЖЖЖЖ (жишээ: 15/06/1990)</p>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1.5">Имэйл хаяг <span className="text-red-300">*</span></label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => handleBlur('email')}
              placeholder="name@example.com"
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${touched.email && errors.email ? 'border-red-400' : 'border-white/20'} text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400 transition`}
              aria-invalid={touched.email && !!errors.email} disabled={isLoading} />
            {touched.email && errors.email && <p className="mt-1 text-sm text-red-300" role="alert">⚠️ {errors.email}</p>}
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold text-lg hover:from-primary-600 hover:to-primary-800 transition-all disabled:opacity-50 animate-pulse-glow">
            {isLoading ? 'Тооцоолж байна...' : '✨ Тайлангаа авах'}
          </button>
        </form>
      </div>
    </div>
  );
}
