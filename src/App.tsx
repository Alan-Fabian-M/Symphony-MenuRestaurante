import React from 'react';
import { Routes, Route } from './router';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { BookingPage } from './pages/BookingPage';

export function App() {
  return (
    <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', color: 'rgba(255,255,255,0.88)' }}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservaciones" element={<ReservationsPage />} />
          <Route path="/reservar" element={<BookingPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
