import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';

/* ─── Step Indicator ──────────────────────────────── */
const STEPS = ['Fecha & Hora', 'Sus Datos', 'Confirmación'];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-14">
      {STEPS.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-2">
            <div
              className={`step-dot ${
                i < current ? 'done' : i === current ? 'active' : ''
              }`}
            >
              {i < current ? <Check size={12} /> : i + 1}
            </div>
            <span
              className={`text-[10px] tracking-wide uppercase font-medium whitespace-nowrap ${
                i === current ? 'text-[#C9A84C]' : 'text-white/25'
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`step-line mx-3 mb-5 ${i < current ? 'done' : ''}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── Step 1: Date & Time ─────────────────────────── */
interface Step1Data {
  date: string;
  time: string;
  guests: string;
  occasion: string;
}

function Step1({
  data,
  onChange,
  onNext,
}: {
  data: Step1Data;
  onChange: (d: Partial<Step1Data>) => void;
  onNext: () => void;
}) {
  const TIME_SLOTS = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'];
  const OCCASIONS = ['Sin ocasión especial', 'Cumpleaños', 'Aniversario', 'Reunión de negocios', 'Propuesta', 'Otro'];

  const canContinue = data.date && data.time && data.guests;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Date */}
        <div>
          <label className="sym-label">Fecha</label>
          <input
            type="date"
            className="sym-input"
            value={data.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={e => onChange({ date: e.target.value })}
          />
        </div>

        {/* Guests */}
        <div>
          <label className="sym-label">Comensales</label>
          <select
            className="sym-select"
            value={data.guests}
            onChange={e => onChange({ guests: e.target.value })}
          >
            <option value="">Seleccione</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Time slots */}
      <div>
        <label className="sym-label mb-4 block">Hora</label>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map(slot => (
            <button
              key={slot}
              type="button"
              onClick={() => onChange({ time: slot })}
              className={`py-2.5 text-sm font-medium tracking-wide border transition-all duration-200 ${
                data.time === slot
                  ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                  : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <label className="sym-label">Ocasión (opcional)</label>
        <select
          className="sym-select"
          value={data.occasion}
          onChange={e => onChange({ occasion: e.target.value })}
        >
          {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div className="pt-4">
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`btn-gold w-full justify-center ${!canContinue ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          Continuar <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ─── Step 2: Personal Data ───────────────────────── */
interface Step2Data {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: Step2Data;
  onChange: (d: Partial<Step2Data>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canContinue = data.name && data.email;
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <label className="sym-label">Nombre completo</label>
          <input
            className="sym-input"
            placeholder="Ej. Ana García"
            value={data.name}
            onChange={e => onChange({ name: e.target.value })}
          />
        </div>
        <div>
          <label className="sym-label">Correo electrónico</label>
          <input
            type="email"
            className="sym-input"
            placeholder="ana@ejemplo.com"
            value={data.email}
            onChange={e => onChange({ email: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="sym-label">Teléfono (opcional)</label>
        <input
          type="tel"
          className="sym-input"
          placeholder="+1 555 000 0000"
          value={data.phone}
          onChange={e => onChange({ phone: e.target.value })}
        />
      </div>
      <div>
        <label className="sym-label">Solicitudes especiales (opcional)</label>
        <textarea
          className="sym-input resize-none"
          rows={3}
          placeholder="Alergias, preferencias de mesa, decoración especial…"
          value={data.notes}
          onChange={e => onChange({ notes: e.target.value })}
          style={{ paddingTop: '0.75rem' }}
        />
      </div>
      <div className="flex gap-4 pt-4">
        <button onClick={onBack} className="btn-outline-gold flex-1 justify-center">
          Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`btn-gold flex-1 justify-center ${!canContinue ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          Confirmar <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ─── Step 3: Confirmation ────────────────────────── */
function Step3({
  step1,
  step2,
  onReset,
}: {
  step1: Step1Data;
  step2: Step2Data;
  onReset: () => void;
}) {
  const rows = [
    { label: 'Nombre', value: step2.name },
    { label: 'Correo', value: step2.email },
    { label: 'Fecha', value: new Date(step1.date + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
    { label: 'Hora', value: step1.time },
    { label: 'Personas', value: `${step1.guests} ${Number(step1.guests) === 1 ? 'persona' : 'personas'}` },
    ...(step1.occasion && step1.occasion !== 'Sin ocasión especial' ? [{ label: 'Ocasión', value: step1.occasion }] : []),
    ...(step2.notes ? [{ label: 'Notas', value: step2.notes }] : []),
  ];

  return (
    <div className="text-center">
      {/* Animated check */}
      <div className="flex justify-center mb-8">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
            <circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1.5"
              strokeDasharray="226"
              strokeDashoffset="226"
              className="check-circle animate"
              strokeLinecap="round"
              style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
            />
            <polyline
              points="25,40 36,52 56,30"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              strokeDashoffset="60"
              className="check-circle animate"
              style={{ animationDelay: '0.7s' }}
            />
          </svg>
        </div>
      </div>

      <p className="section-label mb-3">Confirmada</p>
      <h2
        className="text-white/90 text-2xl font-medium mb-2"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Reserva Recibida
      </h2>
      <p className="text-white/35 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
        Le enviaremos una confirmación a <strong className="text-white/60">{step2.email}</strong>. Le esperamos.
      </p>

      {/* Summary */}
      <div className="border border-white/[0.06] bg-[#141414] text-left mb-8">
        {rows.map(({ label, value }, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-6 px-5 py-3.5 border-b border-white/[0.04] last:border-0"
          >
            <span className="sym-label text-[10px] mt-0.5 shrink-0">{label}</span>
            <span className="text-white/60 text-sm text-right capitalize">{value}</span>
          </div>
        ))}
      </div>

      <p className="text-white/25 text-xs mb-8">
        Las reservas se mantienen hasta 15 min después de la hora indicada.
      </p>

      <button onClick={onReset} className="btn-ghost-gold mx-auto">
        Hacer otra reserva
      </button>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────── */
export function BookingPage() {
  const [step, setStep] = useState(0);
  const [step1, setStep1] = useState<Step1Data>({ date: '', time: '', guests: '', occasion: 'Sin ocasión especial' });
  const [step2, setStep2] = useState<Step2Data>({ name: '', email: '', phone: '', notes: '' });

  const handleReset = () => {
    setStep(0);
    setStep1({ date: '', time: '', guests: '', occasion: 'Sin ocasión especial' });
    setStep2({ name: '', email: '', phone: '', notes: '' });
  };

  return (
    <div className="page-enter min-h-screen" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-2xl mx-auto px-6 lg:px-8 pt-32 pb-24">

        {/* Header */}
        {step < 2 && (
          <div className="text-center mb-14">
            <p className="section-label mb-4">Reserve Su Mesa</p>
            <span className="gold-line mx-auto block mb-7" />
            <h1 className="section-title" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              Reservar Mesa
            </h1>
          </div>
        )}

        {step < 2 && <StepIndicator current={step} />}

        {step === 0 && (
          <Step1
            data={step1}
            onChange={d => setStep1(prev => ({ ...prev, ...d }))}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <Step2
            data={step2}
            onChange={d => setStep2(prev => ({ ...prev, ...d }))}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <Step3 step1={step1} step2={step2} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
