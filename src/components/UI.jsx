import React from 'react';
import { TrendingUp } from 'lucide-react';
import { C, FONTS, fmt } from '../theme';

// ─── BUTTON ───────────────────────────────────────────────────────
export const Btn = ({ icon: Icon, children, variant = 'ghost', size = 'sm', onClick, active, as = 'button', href, target }) => {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    border: 'none',
    cursor: 'pointer',
    fontFamily: FONTS.mono,
    fontSize: size === 'sm' ? 11 : 13,
    fontWeight: 500,
    letterSpacing: '0.05em',
    padding: size === 'sm' ? '8px 14px' : '12px 20px',
    transition: 'all 150ms ease',
    borderRadius: 0,
    textDecoration: 'none',
  };
  const variants = {
    primary:   { background: C.red, color: '#FFFFFF' },
    secondary: { background: C.surface3, color: C.ink, border: `1px solid ${C.border}` },
    ghost:     { background: active ? C.surface3 : 'transparent', color: active ? C.ink : C.inkDim, border: `1px solid ${active ? C.borderL : C.border}` },
    danger:    { background: 'transparent', color: C.red, border: `1px solid ${C.red}` },
  };
  const Element = as;
  return (
    <Element href={href} target={target} onClick={onClick} style={{ ...base, ...variants[variant] }}>
      {Icon && <Icon size={size === 'sm' ? 13 : 15} />}
      {children}
    </Element>
  );
};

// ─── STAT CARD ────────────────────────────────────────────────────
export const StatCard = ({ label, value, subValue, delta, deltaColor = C.green, accent = C.green, icon: Icon, mono = true }) => (
  <div className="lift-hover" style={{
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderTop: `2px solid ${accent}`,
    padding: '20px 22px',
    position: 'relative',
  }}>
    {Icon && (
      <div style={{ position: 'absolute', top: 16, right: 16, color: accent, opacity: 0.4 }}>
        <Icon size={18} />
      </div>
    )}
    <div style={{
      fontSize: 10, color: C.muted, textTransform: 'uppercase',
      letterSpacing: '0.14em', fontWeight: 600, marginBottom: 12,
      fontFamily: FONTS.mono,
    }}>{label}</div>
    <div style={{
      fontSize: 34, fontWeight: 300, color: C.ink, lineHeight: 1,
      fontFamily: mono ? FONTS.mono : FONTS.display, letterSpacing: '-0.02em',
    }}>{value}</div>
    {subValue && (
      <div style={{ fontSize: 11, color: C.dim, marginTop: 6, fontFamily: FONTS.mono }}>
        {subValue}
      </div>
    )}
    {delta && (
      <div style={{
        fontSize: 11, color: deltaColor, marginTop: 8, fontWeight: 600,
        fontFamily: FONTS.mono, display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <TrendingUp size={12} /> {delta}
      </div>
    )}
  </div>
);

// ─── SECTION TITLE ────────────────────────────────────────────────
export const SectionTitle = ({ children, sub, action }) => (
  <div style={{
    marginBottom: 20,
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
    paddingBottom: 14, borderBottom: `1px solid ${C.border}`,
    flexWrap: 'wrap', gap: 12,
  }}>
    <div>
      <div style={{
        fontSize: 10, color: C.red, textTransform: 'uppercase',
        letterSpacing: '0.2em', fontWeight: 700, marginBottom: 6,
        fontFamily: FONTS.mono,
      }}>▮ {sub}</div>
      <div style={{
        fontSize: 26, fontWeight: 400, color: C.ink, lineHeight: 1.1,
        fontFamily: FONTS.display, letterSpacing: '-0.01em',
      }}>{children}</div>
    </div>
    {action}
  </div>
);

// ─── PANEL ────────────────────────────────────────────────────────
export const Panel = ({ children, title, subtitle, accent, action, padding = 24 }) => (
  <div className="lift-hover" style={{
    background: C.surface, border: `1px solid ${C.border}`, padding,
    position: 'relative',
  }}>
    {accent && (
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 2, height: '100%', background: accent,
      }} />
    )}
    {title && (
      <div style={{
        marginBottom: 20, display: 'flex',
        justifyContent: 'space-between', alignItems: 'flex-start',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          {subtitle && (
            <div style={{
              fontSize: 9, color: C.muted, textTransform: 'uppercase',
              letterSpacing: '0.18em', fontWeight: 600, marginBottom: 6,
              fontFamily: FONTS.mono,
            }}>{subtitle}</div>
          )}
          <div style={{
            fontSize: 18, fontWeight: 500, color: C.ink, fontFamily: FONTS.display,
          }}>{title}</div>
        </div>
        {action}
      </div>
    )}
    {children}
  </div>
);

// ─── CHART TOOLTIP ────────────────────────────────────────────────
export const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: C.bg, border: `1px solid ${C.borderL}`,
      padding: '10px 14px', fontFamily: FONTS.mono, fontSize: 11,
      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
    }}>
      <div style={{
        color: C.ink, marginBottom: 6, fontWeight: 600,
        borderBottom: `1px solid ${C.border}`, paddingBottom: 4,
      }}>{label}</div>
      {payload.map((e, i) => (
        <div key={i} style={{ color: e.color, marginTop: 2 }}>
          <span style={{ color: C.muted }}>{e.name}:</span>{' '}
          <span style={{ color: e.color, fontWeight: 600 }}>{fmt(e.value, e.value % 1 ? 2 : 0)}</span>
        </div>
      ))}
    </div>
  );
};

// ─── TABLE STYLES ─────────────────────────────────────────────────
export const th = () => ({
  textAlign: 'right', padding: '14px 12px', color: C.muted,
  fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
  letterSpacing: '0.1em', fontFamily: FONTS.mono,
});
export const td = () => ({
  textAlign: 'right', padding: '14px 12px', color: C.inkDim,
  fontFamily: FONTS.mono,
});
