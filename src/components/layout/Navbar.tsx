import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../../router';
import { UtensilsCrossed, X, Menu } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Menú', to: '/menu' },
  { label: 'Reservaciones', to: '/reservaciones' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { path } = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [path]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-[#0D0D0D]/95 backdrop-blur-xl border-white/[0.06]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group no-underline"
            >
              <UtensilsCrossed
                className="w-5 h-5 text-[#C9A84C] transition-transform duration-300 group-hover:rotate-12"
              />
              <span
                className="font-heading text-white text-lg tracking-[0.06em] font-medium"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Symphony
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map(({ label, to }) => {
                const active = path === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`relative text-[0.8125rem] font-medium tracking-[0.06em] uppercase transition-colors duration-200 no-underline
                      ${active ? 'text-[#C9A84C]' : 'text-white/50 hover:text-white/90'}`}
                  >
                    {label}
                    {active && (
                      <span
                        className="absolute -bottom-1 left-0 w-full h-px bg-[#C9A84C]"
                        style={{ animation: 'lineGrow 0.3s ease forwards' }}
                      />
                    )}
                  </Link>
                );
              })}
              <Link
                to="/reservar"
                className="btn-gold text-xs"
              >
                Reservar Mesa
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden text-white/60 hover:text-white transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-[#0D0D0D] border-l border-white/[0.06] flex flex-col px-8 pt-24 pb-10 gap-8 transition-transform duration-400 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {NAV_LINKS.map(({ label, to }) => {
            const active = path === to;
            return (
              <Link
                key={to}
                to={to}
                className={`text-base font-medium tracking-[0.06em] uppercase no-underline transition-colors duration-200 ${
                  active ? 'text-[#C9A84C]' : 'text-white/50 hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <div className="border-t border-white/[0.06] pt-8 mt-2">
            <Link
              to="/reservar"
              className="btn-gold w-full justify-center text-xs"
            >
              Reservar Mesa
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
