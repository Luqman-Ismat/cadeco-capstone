import React from 'react';
import { Download, FileText, FileSpreadsheet, Image as ImageIcon, FileCode, Layers } from 'lucide-react';
import { C, FONTS } from '../theme';
import { SectionTitle } from '../components/UI.jsx';
import { deliverables } from '../data/projectData.js';

const ICON_BY_EXT = {
  docx: FileText,
  xlsx: FileSpreadsheet,
  drawio: Layers,
  html: FileCode,
  png: ImageIcon,
  pdf: FileText,
};

const getIcon = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  return ICON_BY_EXT[ext] || FileText;
};

export default function Downloads() {
  return (
    <>
      <header className="mobile-section" style={{
        padding: '64px 32px 32px',
        background: `linear-gradient(180deg, ${C.redBg} 0%, transparent 100%)`,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            fontSize: 11, color: C.red, textTransform: 'uppercase',
            letterSpacing: '0.25em', fontWeight: 700, fontFamily: FONTS.mono,
            marginBottom: 14,
          }}>▮ DOWNLOADS</div>
          <h1 style={{
            fontFamily: FONTS.display, fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 400, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.05,
          }}>
            Every deliverable. <span style={{ color: C.red }}>One package.</span>
          </h1>
          <p style={{
            fontSize: 17, color: C.inkDim, marginTop: 24, lineHeight: 1.6, maxWidth: 850,
          }}>
            All capstone outputs are organized below by category. Documents are .docx and .pdf.
            Diagrams are .drawio (open in draw.io / app.diagrams.net). Data files are .xlsx with
            preserved formulas. Click any item to download.
          </p>
        </div>
      </header>

      <div className="mobile-section" style={{ padding: '48px 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
        {deliverables.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 56 }}>
            <SectionTitle sub={`${String(ci + 1).padStart(2, '0')} / ${cat.category}`}>
              {cat.category} ({cat.items.length})
            </SectionTitle>
            <div className="download-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 14,
            }}>
              {cat.items.map((item, ii) => {
                const Icon = getIcon(item.file);
                const ext = item.file.split('.').pop().toUpperCase();
                return (
                  <a key={ii} className="lift-hover" href={`/files/${item.file}`} download style={{
                    display: 'block', textDecoration: 'none',
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderLeft: `2px solid ${C.red}`,
                    padding: '20px 22px',
                    transition: 'all 200ms ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderLeftWidth = '4px';
                    e.currentTarget.style.background = C.surface2;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderLeftWidth = '2px';
                    e.currentTarget.style.background = C.surface;
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <Icon size={16} color={C.red} />
                          <span style={{
                            fontSize: 9, color: C.muted, fontFamily: FONTS.mono,
                            letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase',
                          }}>{ext}</span>
                        </div>
                        <div style={{
                          fontFamily: FONTS.display, fontSize: 17, fontWeight: 500,
                          color: C.ink, marginBottom: 6, lineHeight: 1.3,
                        }}>{item.name}</div>
                        <div style={{
                          fontSize: 12, color: C.inkDim, lineHeight: 1.5, marginBottom: 8,
                        }}>{item.desc}</div>
                        <div style={{
                          fontFamily: FONTS.mono, fontSize: 11, color: C.dim,
                          wordBreak: 'break-all',
                        }}>{item.file}</div>
                      </div>
                      <div style={{
                        flexShrink: 0, padding: 10, background: C.surface3,
                        borderRadius: 0, color: C.red, alignSelf: 'center',
                      }}>
                        <Download size={18} />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}

        {/* ─── Notice ─── */}
        <div style={{
          marginTop: 48, padding: '24px 28px', background: C.amberBg,
          borderLeft: `2px solid ${C.amber}`, fontSize: 13, color: C.inkDim,
          lineHeight: 1.6, fontFamily: FONTS.mono,
        }}>
          <strong style={{ color: C.ink }}>Note for sponsors:</strong> All numbers in these deliverables are reconciled to
          the locked poster baseline (27.43 → 7.64 min cycle / 72% reduction, 19.35 → 0.45 min NVA / 98% reduction,
          913 → 130 ft Team Lead travel / 86% reduction, 390 → 80 ft Forklift travel / 80% reduction).
          Any deltas observed in older drafts have been corrected. Diagrams open in draw.io
          (free, web-based, no install required at app.diagrams.net).
        </div>
      </div>
    </>
  );
}
