import React from 'react';
import { Link } from '../router';
import { MapPin, Clock, Phone, Mail, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const INFO_BLOCKS = [
  {
    Icon: MapPin,
    title: 'Ubicación',
    lines: ['Av. Gastronómica 1234', 'Distrito Gourmet, CP 54321'],
  },
  {
    Icon: Clock,
    title: 'Horarios',
    lines: ['Mar–Sáb: 19:00 – 23:30', 'Domingo: 13:00 – 17:00', 'Lunes: Cerrado'],
  },
  {
    Icon: Phone,
    title: 'Teléfono',
    lines: ['+1 (555) 123-4567'],
  },
  {
    Icon: Mail,
    title: 'Correo',
    lines: ['reservas@symphony.com'],
  },
];

function InfoBlock({ block, index }: { block: typeof INFO_BLOCKS[0]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''}`}
      style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
    >
      <div className="flex items-start gap-5 p-6 border border-white/[0.05] bg-[#141414]">
        <div className="mt-0.5">
          <block.Icon size={16} className="text-[#C9A84C]" />
        </div>
        <div>
          <p className="section-label text-[10px] mb-2">{block.title}</p>
          {block.lines.map((l, i) => (
            <p key={i} className="text-white/50 text-sm leading-relaxed">{l}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReservationsPage() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>();
  const [mapRef, mapInView] = useInView<HTMLDivElement>();

  return (
    <div className="page-enter min-h-screen" style={{ backgroundColor: 'var(--surface)' }}>

      {/* ── Header ── */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-8"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/60 to-[var(--surface)]" />
        <div
          ref={headerRef}
          className={`relative z-10 text-center reveal ${headerInView ? 'in-view' : ''}`}
        >
          <p className="section-label mb-4">Visítenos</p>
          <span className="gold-line mx-auto block mb-7" />
          <h1 className="section-title">Reservaciones</h1>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: info */}
          <div>
            <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-md">
              Para garantizar su lugar en Symphony le recomendamos reservar con al menos 48 horas de anticipación. Para eventos privados y grupos mayores a 12 personas, contáctenos directamente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
              {INFO_BLOCKS.map((b, i) => (
                <InfoBlock key={b.title} block={b} index={i} />
              ))}
            </div>

            <Link to="/reservar" className="btn-gold">
              Reservar Ahora <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right: map placeholder */}
          <div
            ref={mapRef}
            className={`reveal-right ${mapInView ? 'in-view' : ''}`}
          >
            <div
              className="relative border border-white/[0.05] overflow-hidden"
              style={{ height: '460px' }}
            >
              {/* Static map image as placeholder */}
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                alt="Ambiente Symphony"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent" />

              {/* Location card overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#0D0D0D]/90 backdrop-blur border border-white/[0.06]">
                <p className="section-label text-[10px] mb-1">Encontranos</p>
                <p
                  className="text-white/80 text-base font-medium"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Symphony Restaurant
                </p>
                <p className="text-white/35 text-xs mt-1">Av. Gastronómica 1234, Distrito Gourmet</p>
              </div>
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-3 border-x border-b border-white/[0.05]">
              {[
                { num: '8+', label: 'Años de experiencia' },
                { num: '12', label: 'Mesas disponibles' },
                { num: '50+', label: 'Platos en carta' },
              ].map(({ num, label }) => (
                <div
                  key={label}
                  className="py-5 px-4 text-center border-r border-white/[0.05] last:border-r-0"
                >
                  <p
                    className="text-[#C9A84C] text-xl font-medium mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {num}
                  </p>
                  <p className="text-white/30 text-[10px] tracking-wide uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
