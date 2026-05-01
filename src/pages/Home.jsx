import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Download, Users, AlertTriangle, CheckCircle2, Zap, MapPin, Layers } from 'lucide-react';
import { C, FONTS, fmt } from '../theme';
import { Btn, StatCard } from '../components/UI.jsx';
import { PROJECT, headlineCycle, nvaCurrent, nvaProposed, orderMetrics, capacity } from '../data/projectData.js';

export default function Home() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section className="mobile-section" style={{
        position: 'relative',
        padding: '80px 32px 60px',
        background: `radial-gradient(ellipse at top, ${C.redBg}, transparent 70%)`,
        overflow: 'hidden',
      }}>
        {/* Decorative grid lines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
          backgroundSize: '60px 60px', opacity: 0.15,
        }} />

        <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 11, color: C.red,
            textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700,
            fontFamily: FONTS.mono, marginBottom: 24,
          }}>
            <span style={{ width: 8, height: 8, background: C.red, display: 'inline-block' }} />
            UH INDUSTRIAL ENGINEERING · CAPSTONE TEAM 7 · {PROJECT.semester}
          </div>

          <h1 style={{
            fontFamily: FONTS.display,
            fontSize: 'clamp(40px, 7vw, 76px)',
            fontWeight: 400,
            margin: 0,
            letterSpacing: '-0.025em',
            lineHeight: 1.02,
            color: C.ink,
            maxWidth: 1100,
          }}>
            Cutting <span style={{ color: C.red, fontStyle: 'italic', fontWeight: 500 }}>16 minutes</span> off every batch
            at <span style={{ color: C.red }}>Cadeco</span>'s Target picking line.
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 1.5vw, 19px)',
            color: C.inkDim,
            maxWidth: 850,
            marginTop: 28, lineHeight: 1.55,
          }}>
            A lean redesign of the partial-pallet workflow at Cadeco Industries' Deer Park facility.
            We reduced cycle time by 58%, eliminated 78% of non-value-added activity, and cut
            forklift travel by 94% — for $13.3K capital and a 3.2-month payback.
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
            <Btn as={Link} href="/dashboard" variant="primary" size="lg" icon={BarChart3}>
              VIEW DASHBOARD
            </Btn>
            <Btn as={Link} href="/downloads" variant="secondary" size="lg" icon={Download}>
              GET DELIVERABLES
            </Btn>
            <Btn as={Link} href="/about" variant="ghost" size="lg" icon={Users}>
              ABOUT THE TEAM
            </Btn>
          </div>

          {/* ─── Hero stats strip ─── */}
          <div className="metric-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 1, marginTop: 64,
            background: C.border,
            border: `1px solid ${C.border}`,
          }}>
            {[
              { label: 'CYCLE TIME REDUCTION', value: `${headlineCycle.reduction}%`, sub: `${headlineCycle.current.toFixed(2)} → ${headlineCycle.future.toFixed(2)} min`, color: C.green },
              { label: 'NVA REDUCED',          value: '78%', sub: `${nvaCurrent.toFixed(2)} → ${nvaProposed.toFixed(2)} min`, color: C.red },
              { label: 'FORKLIFT TRAVEL',      value: '94%', sub: '318 → 20 ft / SKU', color: C.amber },
              { label: 'PAYBACK',              value: '3.2 mo', sub: '$13.3K capex · $49.6K/yr savings', color: C.blue },
            ].map((s, i) => (
              <div key={i} style={{
                background: C.surface,
                padding: '32px 28px',
                borderTop: `2px solid ${s.color}`,
              }}>
                <div style={{
                  fontSize: 10, color: C.muted, letterSpacing: '0.18em',
                  fontFamily: FONTS.mono, marginBottom: 14,
                }}>{s.label}</div>
                <div style={{
                  fontSize: 56, fontWeight: 300, color: C.ink, lineHeight: 1,
                  fontFamily: FONTS.mono, letterSpacing: '-0.02em',
                }}>{s.value}</div>
                <div style={{
                  fontSize: 12, color: C.dim, marginTop: 10, fontFamily: FONTS.mono,
                }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROBLEM / SOLUTION ═══════ */}
      <section className="mobile-section" style={{ padding: '80px 32px', background: C.surface }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{
            fontSize: 10, color: C.red, letterSpacing: '0.25em',
            fontFamily: FONTS.mono, fontWeight: 700, marginBottom: 12,
          }}>▮ THE PROJECT</div>
          <h2 style={{
            fontFamily: FONTS.display, fontSize: 42, fontWeight: 400,
            color: C.ink, margin: 0, lineHeight: 1.1, letterSpacing: '-0.015em',
            maxWidth: 850,
          }}>
            Where 12 weeks of iRely data and 24 observed cycles met one stubborn warehouse problem.
          </h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: 32, marginTop: 56,
          }}>
            <ProblemCard icon={AlertTriangle} title="The problem" color={C.red} bullets={[
              'Pickers searched the floor for partial pallets — no rack assignment existed.',
              'Team Lead walked 459 ft round-trip to a printer in the wrong place every batch.',
              'FIFO violations forced redo-picks on ~10% of batches — 14.22 min each.',
              'Forklift averaged 318 ft per SKU retrieval (±66 ft SD) across racks 17–21.',
            ]} />
            <ProblemCard icon={CheckCircle2} title="The solution" color={C.green} bullets={[
              'Customer-separated racks — Rack 30 = Target only, Rack 31 = Amazon only.',
              'Demand Prediction Dashboard — pre-shift SKU reorder-risk scan.',
              'Adjacent rack relocation — 25-ft staging cluster replaces 318-ft retrieval.',
              'Lantech Q-300 semi-auto wrap machine — 5.89 → 1.25 min per pallet.',
            ]} />
          </div>
        </div>
      </section>

      {/* ═══════ THREE PILLARS ═══════ */}
      <section className="mobile-section" style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{
            fontSize: 10, color: C.red, letterSpacing: '0.25em',
            fontFamily: FONTS.mono, fontWeight: 700, marginBottom: 12,
          }}>▮ APPROACH</div>
          <h2 style={{
            fontFamily: FONTS.display, fontSize: 42, fontWeight: 400,
            color: C.ink, margin: 0, lineHeight: 1.1, letterSpacing: '-0.015em',
          }}>Three pillars. One redesigned workflow.</h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 24, marginTop: 56,
          }}>
            {[
              { num: '01', icon: Zap,    title: 'Demand Dashboard',
                body: 'Pre-shift HIGH/MED/LOW risk scan. Stockout risk surfaces before the order line drops, eliminating the 14.22 min Redo Picks event entirely.' },
              { num: '02', icon: MapPin, title: 'Designated Cells',
                body: 'All 7 Target SKUs live on Rack 30. Each has a fixed cell address (R30-C01-A through R30-C13-B). Floor-search dies. The Alt. Picklist iRely workaround disappears.' },
              { num: '03', icon: Layers, title: 'Return-to-Cell',
                body: 'New +30s NEC step prevents ad-hoc floor staging. Closes the loop. Partials always go back to the same physical address.' },
            ].map(p => {
              const Icon = p.icon;
              return (
                <div key={p.num} style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderTop: `3px solid ${C.amber}`,
                  padding: 32,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                    <span style={{
                      fontFamily: FONTS.display, fontSize: 56, fontWeight: 300,
                      color: C.amber, lineHeight: 1, letterSpacing: '-0.04em',
                    }}>{p.num}</span>
                    <Icon size={26} color={C.amber} />
                  </div>
                  <h3 style={{
                    fontFamily: FONTS.display, fontSize: 24, fontWeight: 500,
                    color: C.ink, margin: '0 0 14px', letterSpacing: '-0.01em',
                  }}>{p.title}</h3>
                  <p style={{
                    fontSize: 14, color: C.inkDim, lineHeight: 1.6, margin: 0,
                  }}>{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ DATA AT A GLANCE ═══════ */}
      <section className="mobile-section" style={{ padding: '80px 32px', background: C.surface }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{
            fontSize: 10, color: C.red, letterSpacing: '0.25em',
            fontFamily: FONTS.mono, fontWeight: 700, marginBottom: 12,
          }}>▮ DATA SCOPE</div>
          <h2 style={{
            fontFamily: FONTS.display, fontSize: 42, fontWeight: 400,
            color: C.ink, margin: 0, lineHeight: 1.1, letterSpacing: '-0.015em',
          }}>Real numbers. Real warehouse. Real {PROJECT.weeks} weeks.</h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14, marginTop: 48,
          }}>
            <StatCard label="Observation Period" value={`${PROJECT.weeks} wk`} subValue={`${PROJECT.periodStart} → ${PROJECT.periodEnd}`} accent={C.red} />
            <StatCard label="Observed Cycles"    value={`n=${PROJECT.observedCycles}`} subValue="WorkStudy+ 7 time studies" accent={C.red} />
            <StatCard label="Total Cases"        value={fmt(orderMetrics.totalCases)} subValue="across 7 Target SKUs" accent={C.red} />
            <StatCard label="Order Lines"        value={fmt(orderMetrics.orderLines)} subValue={`${orderMetrics.salesOrders} distinct orders`} accent={C.red} />
            <StatCard label="Cases / Week"       value={fmt(orderMetrics.casesPerWeek)} subValue={`${orderMetrics.avgPerOrder} cases / order avg`} accent={C.red} />
          </div>

          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <Btn as={Link} href="/dashboard" variant="primary" size="lg" icon={ArrowRight}>
              SEE THE FULL ANALYSIS
            </Btn>
          </div>
        </div>
      </section>

      {/* ═══════ CALLOUT ═══════ */}
      <section className="mobile-section" style={{
        padding: '80px 32px',
        background: `linear-gradient(135deg, ${C.surface} 0%, ${C.bg} 100%)`,
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          padding: 48,
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderLeft: `3px solid ${C.red}`,
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: FONTS.mono, fontSize: 11, color: C.red,
            letterSpacing: '0.2em', fontWeight: 700, marginBottom: 16,
          }}>▮ DELIVERED</div>
          <h2 style={{
            fontFamily: FONTS.display, fontSize: 36, fontWeight: 400,
            color: C.ink, margin: '0 0 20px', letterSpacing: '-0.015em',
            lineHeight: 1.2,
          }}>
            12 documents · 10 process diagrams · 17-sheet operations dashboard.
          </h2>
          <p style={{
            fontSize: 15, color: C.inkDim, lineHeight: 1.6, margin: '0 0 32px',
            maxWidth: 700, marginLeft: 'auto', marginRight: 'auto',
          }}>
            Every deliverable is downloadable below. SOPs for each role. Floor plans. Spaghetti diagrams.
            A self-updating Excel workbook. The Cadeco operations team gets a turnkey package — not a slide deck.
          </p>
          <Btn as={Link} href="/downloads" variant="primary" size="lg" icon={Download}>
            BROWSE DELIVERABLES
          </Btn>
        </div>
      </section>
    </>
  );
}

function ProblemCard({ icon: Icon, title, color, bullets }) {
  return (
    <div style={{
      padding: '36px 32px', background: C.bg,
      border: `1px solid ${C.border}`,
      borderTop: `3px solid ${color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <Icon size={28} color={color} />
        <h3 style={{
          fontFamily: FONTS.display, fontSize: 28, fontWeight: 500,
          color: C.ink, margin: 0, letterSpacing: '-0.01em',
        }}>{title}</h3>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{
            display: 'flex', gap: 14, padding: '14px 0',
            borderBottom: i < bullets.length - 1 ? `1px solid ${C.border}` : 'none',
            fontSize: 14, color: C.inkDim, lineHeight: 1.55,
          }}>
            <span style={{
              color, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700,
              flexShrink: 0, paddingTop: 2, letterSpacing: '0.05em',
            }}>0{i + 1}</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
