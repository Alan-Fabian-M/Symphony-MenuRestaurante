import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';

/* ─── Data ────────────────────────────────────────── */
type Category = 'Todos' | 'Entradas' | 'Principales' | 'Postres' | 'Bebidas';

interface MenuItem {
  title: string;
  description: string;
  price: string;
  category: Exclude<Category, 'Todos'>;
  imageUrl: string;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Tartar de Atún Rojo',
    description: 'Atún de aleta amarilla fresco, aguacate, emulsión de soja y yuzu, crujientes de sésamo negro.',
    price: '$24',
    category: 'Entradas',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    badge: 'Favorito',
  },
  {
    title: 'Ceviche Nikkei',
    description: 'Pesca del día marinada en leche de tigre al ají amarillo, cebolla morada y maíz chulpi.',
    price: '$22',
    category: 'Entradas',
    imageUrl: 'https://images.unsplash.com/photo-1534604973900-c430894e14cb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Foie Gras Mi-Cuit',
    description: 'Foie gras de pato semicurado, brioche tostado, compota de higo y flor de sal de Guérande.',
    price: '$28',
    category: 'Entradas',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Risotto de Trufa Negra',
    description: 'Arroz carnaroli envejecido, crema de trufa negra, setas silvestres y parmigiano reggiano DOP.',
    price: '$32',
    category: 'Principales',
    imageUrl: 'https://images.unsplash.com/photo-1633337474564-1d9e9611b84e?auto=format&fit=crop&w=800&q=80',
    badge: 'Chef',
  },
  {
    title: 'Lomo Alto Madurado',
    description: 'Corte premium madurado 45 días, asado a la parrilla de leña con patatas confitadas y chimichurri.',
    price: '$65',
    category: 'Principales',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-8316377e8e50?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Magret de Pato',
    description: 'Magret a baja temperatura, reducción de frutos rojos y Oporto, puré de chirivía tostada.',
    price: '$38',
    category: 'Principales',
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Lubina al Vapor',
    description: 'Lubina salvaje al vapor de algas, velouté de mejillones, aceite de eneldo y caviar de trucha.',
    price: '$42',
    category: 'Principales',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Esfera de Chocolate',
    description: 'Mousse de chocolate belga 70%, corazón líquido de maracuyá y crumble de cacao.',
    price: '$16',
    category: 'Postres',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
    badge: 'Favorito',
  },
  {
    title: 'Tarta Tatin de Manzana',
    description: 'Manzana caramelizada en mantequilla noisette, hojaldre inverso, crema de vainilla Tahití.',
    price: '$14',
    category: 'Postres',
    imageUrl: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cóctel Signature',
    description: 'Mezcal ahumado, jugo de yuzu, jengibre fresco, cordial de hibisco y espuma de clara.',
    price: '$18',
    category: 'Bebidas',
    imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Selección de Vinos',
    description: 'Carta de vinos seleccionados por nuestro sumiller. Consulte disponibilidad de temporada.',
    price: 'Desde $12',
    category: 'Bebidas',
    imageUrl: 'https://images.unsplash.com/photo-1474722883778-792e7fb302eb?auto=format&fit=crop&w=800&q=80',
  },
];

const CATEGORIES: Category[] = ['Todos', 'Entradas', 'Principales', 'Postres', 'Bebidas'];

/* ─── Card ────────────────────────────────────────── */
function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ '--delay': `${(index % 3) * 80}ms` } as React.CSSProperties}
    >
      <div className="menu-card group h-full">
        <div className="flex flex-col sm:flex-row h-full">
          {/* Image */}
          <div className="relative overflow-hidden sm:w-40 shrink-0" style={{ height: '160px' }}>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
            />
            {item.badge && (
              <span className="absolute top-3 left-3 section-label text-[9px] bg-[#C9A84C]/90 text-[#0D0D0D] px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-5 flex-1">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3
                  className="text-white/90 font-medium text-base leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <span className="text-[#C9A84C] font-semibold text-sm shrink-0">{item.price}</span>
              </div>
              <p className="text-white/35 text-xs leading-relaxed">{item.description}</p>
            </div>
            <p className="section-label text-[9px] mt-4 text-white/20">{item.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────── */
export function MenuPage() {
  const [active, setActive] = useState<Category>('Todos');
  const [headerRef, headerInView] = useInView<HTMLDivElement>();

  const filtered = active === 'Todos'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(i => i.category === active);

  return (
    <div className="page-enter min-h-screen" style={{ backgroundColor: 'var(--surface)' }}>

      {/* ── Page Header ── */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--surface)]" />
        <div
          ref={headerRef}
          className={`relative z-10 max-w-3xl mx-auto text-center reveal ${headerInView ? 'in-view' : ''}`}
        >
          <p className="section-label mb-4">Gastronomía</p>
          <span className="gold-line mx-auto block mb-7" />
          <h1 className="section-title mb-5">Nuestra Carta</h1>
          <p className="text-white/35 text-sm leading-relaxed max-w-lg mx-auto">
            Una selección de creaciones diseñadas para sorprender y deleitar. Ingredientes de temporada, técnicas precisas.
          </p>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="sticky top-[72px] z-30 bg-[var(--surface)]/90 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 px-5 py-2 text-[0.6875rem] font-medium tracking-[0.1em] uppercase transition-all duration-250 border ${
                  active === cat
                    ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                    : 'border-transparent text-white/35 hover:text-white/70 hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((item, i) => (
            <MenuCard key={item.title} item={item} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-white/25 py-20 text-sm">Sin platos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}
