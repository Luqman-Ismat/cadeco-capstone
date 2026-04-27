import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { C, FONTS } from '../theme';

const NAV_ITEMS = [
  { to: '/',            label: 'Home' },
  { to: '/dashboard',   label: 'Dashboard' },
  { to: '/about',       label: 'About' },
  { to: '/downloads',   label: 'Downloads' },
];

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div style={{ background: C.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ─── NAV ─── */}
      <nav style={{
        background: 'rgba(15,20,34,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.border}`,
        padding: '14px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
          <img src="/uh_ie_logo.png" alt="UH IE" style={{ height: 36, display: 'block' }} />
          <div style={{ borderLeft: `1px solid ${C.border}`, paddingLeft: 14 }}>
            <div style={{
              fontSize: 9, color: C.muted, textTransform: 'uppercase',
              letterSpacing: '0.2em', fontWeight: 600, fontFamily: FONTS.mono,
            }}>INDE 4334 · Team 7</div>
            <div style={{
              fontSize: 14, color: C.ink, fontWeight: 500, fontFamily: FONTS.display,
              marginTop: 2,
            }}>Cadeco Operations</div>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: 'flex', gap: 4 }}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to} to={item.to}
              style={({ isActive }) => ({
                padding: '10px 18px',
                fontSize: 12, fontWeight: 500,
                color: isActive ? C.ink : C.inkDim,
                background: isActive ? C.surface3 : 'transparent',
                borderBottom: isActive ? `2px solid ${C.red}` : '2px solid transparent',
                fontFamily: FONTS.mono,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'all 150ms',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none', background: 'none', border: 'none', color: C.ink,
            padding: 8,
          }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div style={{
          background: C.surface, borderBottom: `1px solid ${C.border}`,
          padding: '16px 32px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to} to={item.to}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                padding: '12px 16px',
                fontSize: 13, fontWeight: 500,
                color: isActive ? C.ink : C.inkDim,
                background: isActive ? C.surface3 : 'transparent',
                borderLeft: isActive ? `2px solid ${C.red}` : '2px solid transparent',
                fontFamily: FONTS.mono,
                letterSpacing: '0.08em', textTransform: 'uppercase',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}

      {/* ─── PAGE CONTENT ─── */}
      <main key={location.pathname} className="fade-in" style={{ flex: 1 }}>
        {children}
      </main>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${C.border}`,
        padding: '24px 32px',
        fontSize: 11, color: C.dim, fontFamily: FONTS.mono,
        background: C.surface,
      }}>
        <div style={{
          maxWidth: 1700, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ color: C.red, fontWeight: 600 }}>UH IE 4334</span>
            <span style={{ color: C.dim }}>·</span>
            <span>Cadeco Industries · Deer Park, TX</span>
            <span style={{ color: C.dim }}>·</span>
            <span>Spring 2026 Capstone</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: C.green }}>● ALL SYSTEMS NOMINAL</span>
            <span style={{ color: C.dim }}>·</span>
            <span>v1.0 deployed</span>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </div>
  );
}
