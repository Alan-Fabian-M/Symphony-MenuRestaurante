import React from 'react';
import { Link } from '../router';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* ─── Mini menu preview data ──────────────────────── */
const FEATURED = [
  {
    title: 'Tartar de Atún Rojo',
    category: 'Entrada',
    price: '$24',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Risotto de Trufa Negra',
    category: 'Principal',
    price: '$32',
    imageUrl: 'https://images.unsplash.com/photo-1633337474564-1d9e9611b84e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Esfera de Chocolate',
    category: 'Postre',
    price: '$16',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
  },
];

function FeaturedCard({ item, index }: { item: typeof FEATURED[0]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className="reveal"
      style={{ '--delay': `${index * 120}ms` } as React.CSSProperties}
    >
      <div className={inView ? 'in-view menu-card group' : 'menu-card group'}>
        <div className="relative overflow-hidden" style={{ height: '240px' }}>
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
          <span className="absolute top-4 left-4 section-label text-[10px]">{item.category}</span>
        </div>
        <div className="p-6 flex items-end justify-between">
          <h3
            className="text-white/90 text-lg font-medium leading-snug"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {item.title}
          </h3>
          <span className="text-[#C9A84C] font-semibold text-sm ml-4 shrink-0">{item.price}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Section: Story ──────────────────────────────── */
function StorySection() {
  const [refL, inViewL] = useInView<HTMLDivElement>();
  const [refR, inViewR] = useInView<HTMLDivElement>();

  return (
    <section className="py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Image */}
        <div
          ref={refL}
          className={`reveal-left ${inViewL ? 'in-view' : ''}`}
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80"
              alt="Interior de Symphony"
              className="w-full object-cover"
              style={{ height: '520px' }}
            />
            {/* Accent frame */}
            <div
              className="absolute border border-[#C9A84C]/30"
              style={{ top: '-12px', right: '-12px', bottom: '12px', left: '12px', pointerEvents: 'none' }}
            />
          </div>
        </div>

        {/* Text */}
        <div
          ref={refR}
          className={`reveal-right ${inViewR ? 'in-view' : ''}`}
        >
          <p className="section-label mb-4">Nuestra Historia</p>
          <span className="gold-line block mb-7" />
          <h2 className="section-title mb-7">
            El arte en cada<br />
            <em>detalle.</em>
          </h2>
          <p className="text-white/45 leading-relaxed mb-5">
            Symphony nació de la convicción de que cenar es un acto de cultura. Cada plato es una partitura compuesta con ingredientes de temporada, técnicas precisas y una pasión que no admite compromisos.
          </p>
          <p className="text-white/45 leading-relaxed mb-10">
            Desde 2018 transformamos ingredientes de la más alta calidad en experiencias que trascienden el paladar.
          </p>
          <Link to="/reservar" className="btn-outline-gold">
            Reservar una mesa <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: Menu Preview ───────────────────────── */
function MenuPreviewSection() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="py-28 px-6 lg:px-10 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`reveal text-center mb-16 ${inView ? 'in-view' : ''}`}
        >
          <p className="section-label mb-4">Selección</p>
          <span className="gold-line mx-auto block mb-7" />
          <h2 className="section-title">Platos Destacados</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED.map((item, i) => (
            <FeaturedCard key={item.title} item={item} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/menu" className="btn-ghost-gold">
            Ver Menú Completo <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Section: CTA ────────────────────────────────── */
function CtaSection() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative py-36 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[#0D0D0D]/80" />

      <div
        ref={ref}
        className={`relative z-10 text-center reveal ${inView ? 'in-view' : ''}`}
      >
        <p className="section-label mb-4">Reserve Su Lugar</p>
        <span className="gold-line mx-auto block mb-8" />
        <h2 className="section-title mb-4">
          Una velada que<br />
          <em>no olvidará.</em>
        </h2>
        <p className="text-white/40 max-w-md mx-auto mb-10 text-sm leading-relaxed">
          Permítanos cuidar cada detalle de su noche. Reserve con al menos 48 horas de anticipación.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/reservar" className="btn-gold">
            Reservar Mesa <ArrowRight size={14} />
          </Link>
          <Link to="/menu" className="btn-outline-gold">
            Explorar el Menú
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Hero ────────────────────────────────────────── */
export function HomePage() {
  return (
    <div className="page-enter" style={{ backgroundColor: 'var(--surface)' }}>
      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-[#0D0D0D]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/30 via-transparent to-[#0D0D0D]" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="hero-tagline section-label mb-6">Gastronomía de Autor</p>
          <div className="hero-title">
            <span className="gold-line mx-auto block mb-7" />
            <h1
              className="section-title mb-7"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
            >
              Donde el sabor<br />
              se hace <em>arte.</em>
            </h1>
          </div>
          <p className="hero-sub text-white/45 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Descubre una experiencia culinaria inigualable con ingredientes de la más alta calidad y un ambiente que inspira.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservar" className="btn-gold">
              Reservar una Mesa <ArrowRight size={14} />
            </Link>
            <Link to="/menu" className="btn-outline-gold">
              Ver el Menú
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
          <span className="section-label text-[9px]">Scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>

      <StorySection />
      <MenuPreviewSection />
      <CtaSection />
    </div>
  );
}
