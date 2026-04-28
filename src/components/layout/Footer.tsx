import type React from 'react';
import { Link, type Route } from '../../router';
import { UtensilsCrossed } from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const NAV_COLS = [
  {
    title: 'Navegar',
    links: [
      { label: 'Inicio', to: '/' as Route },
      { label: 'Menú', to: '/menu' as Route },
      { label: 'Reservaciones', to: '/reservaciones' as Route },
      { label: 'Reservar Mesa', to: '/reservar' as Route },
    ],
  },
  {
    title: 'Horarios',
    content: (
      <div className="space-y-1 text-sm text-white/40 leading-relaxed">
        <p>Mar–Sáb: 19:00 – 23:30</p>
        <p>Domingo: 13:00 – 17:00</p>
        <p>Lunes: Cerrado</p>
      </div>
    ),
  },
  {
    title: 'Contacto',
    content: (
      <div className="space-y-1 text-sm text-white/40 leading-relaxed">
        <p>+1 (555) 123-4567</p>
        <p>reservas@symphony.com</p>
        <p>Av. Gastronómica 1234</p>
        <p>Distrito Gourmet</p>
      </div>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 no-underline group mb-5">
              <UtensilsCrossed className="w-4 h-4 text-[#C9A84C]" />
              <span
                className="text-white text-base tracking-[0.06em] font-medium"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Symphony
              </span>
            </Link>
            <p className="text-white/35 text-sm leading-relaxed max-w-[220px]">
              Una experiencia culinaria de autor en el corazón del Distrito Gourmet.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[InstagramIcon, FacebookIcon, TwitterIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-white/30 hover:text-[#C9A84C] transition-colors duration-200"
                  aria-label="Social link"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.title}>
              <p className="section-label mb-5">{col.title}</p>
              {col.links ? (
                <ul className="space-y-3">
                  {col.links.map(({ label, to }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="text-sm text-white/40 hover:text-[#C9A84C] transition-colors duration-200 no-underline"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                col.content
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.05] mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/20 text-xs tracking-wide">
            © {new Date().getFullYear()} Symphony Restaurant. Todos los derechos reservados.
          </p>
          <p className="text-white/15 text-xs">
            Diseñado con precisión.
          </p>
        </div>
      </div>
    </footer>
  );
}
