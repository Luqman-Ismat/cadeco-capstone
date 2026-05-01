import React from 'react';
import { GraduationCap, Briefcase, Mail, Github, Linkedin, Award, BookOpen, Target } from 'lucide-react';
import { C, FONTS } from '../theme';
import { SectionTitle, Panel } from '../components/UI.jsx';
import { PROJECT, teamMembers } from '../data/projectData.js';

export default function About() {
  return (
    <>
      {/* ─── Header ─── */}
      <header style={{
        padding: '64px 32px 32px',
        background: `linear-gradient(180deg, ${C.redBg} 0%, transparent 100%)`,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            fontSize: 11, color: C.red, textTransform: 'uppercase',
            letterSpacing: '0.25em', fontWeight: 700, fontFamily: FONTS.mono,
            marginBottom: 14,
          }}>▮ ABOUT</div>
          <h1 style={{
            fontFamily: FONTS.display, fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 400, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.05,
          }}>
            Five engineers. One client. <span style={{ color: C.red }}>Nine weeks of data.</span>
          </h1>
          <p style={{
            fontSize: 17, color: C.inkDim, marginTop: 24, lineHeight: 1.6, maxWidth: 850,
          }}>
            Capstone Team 7 spent the {PROJECT.semester} semester at Cadeco Industries' Deer Park facility,
            quantifying waste in the Target partial-pallet workflow and engineering a redesign that
            cuts cycle time by 90% without adding headcount, software, or capital beyond a stretch wrap machine.
          </p>
        </div>
      </header>

      <div style={{ padding: '48px 32px', maxWidth: 1200, margin: '0 auto' }}>
        {/* ─── TEAM ─── */}
        <SectionTitle sub="01 / Team">The five</SectionTitle>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 16, marginBottom: 64,
        }}>
          {teamMembers.map((m, i) => (
            <div key={i} style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderTop: `2px solid ${C.red}`, padding: 28,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18,
              }}>
                <div style={{
                  width: 52, height: 52, background: C.surface2,
                  border: `1px solid ${C.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FONTS.display, fontSize: 22, fontWeight: 500,
                  color: C.red,
                }}>
                  {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div style={{
                    fontFamily: FONTS.display, fontSize: 19, fontWeight: 500,
                    color: C.ink, lineHeight: 1.2,
                  }}>{m.name}</div>
                  <div style={{
                    fontSize: 11, color: C.red, marginTop: 4,
                    fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>{m.role}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: C.inkDim, lineHeight: 1.55, marginBottom: 14 }}>
                {m.focus}
              </div>
              <div style={{
                display: 'flex', gap: 12, paddingTop: 14,
                borderTop: `1px solid ${C.border}`,
              }}>
                <a href="#" style={{ color: C.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Mail size={14} />
                </a>
                <a href="#" style={{ color: C.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Linkedin size={14} />
                </a>
                <a href="#" style={{ color: C.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Github size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ─── METHODOLOGY ─── */}
        <SectionTitle sub="02 / Methodology">How we got here</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 18, marginBottom: 64 }}>
          {[
            {
              icon: BookOpen,
              title: 'Data Collection',
              body: 'Pulled 12 weeks of iRely transactional data (1,221 order lines, 165 sales orders, ~46,140 cases). Conducted 24 on-site time studies using WorkStudy+ 7 to capture per-step cycle times across all three roles.',
            },
            {
              icon: Target,
              title: 'Pareto + ABC Analysis',
              body: 'Classified 7 Target SKUs into A/B/C velocity bands. SKU 62632 alone accounted for 38% of case volume — clear indicator that Class A placement at Level A (ground) yields the highest forklift efficiency gain.',
            },
            {
              icon: Briefcase,
              title: 'Spaghetti Diagrams',
              body: 'Mapped current-state travel paths for all 3 roles. Forklift Driver averaged 318 ft per SKU retrieval (±66 ft SD); Team Lead walked 459 ft round-trip to the printer every batch. Quantified waste before designing the fix.',
            },
            {
              icon: Award,
              title: 'Three-Pillar Solution',
              body: 'Designed the Demand Dashboard, Designated Cells, and Return-to-Cell loop as a single integrated system. Validated with sponsor reviews. Published full SOPs and floor plans for direct handoff.',
            },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} style={{
                padding: 28, background: C.surface, border: `1px solid ${C.border}`,
                borderLeft: `2px solid ${C.amber}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <Icon size={20} color={C.amber} />
                  <h3 style={{ fontFamily: FONTS.display, fontSize: 19, fontWeight: 500, color: C.ink, margin: 0 }}>{m.title}</h3>
                </div>
                <p style={{ fontSize: 13, color: C.inkDim, lineHeight: 1.6, margin: 0 }}>{m.body}</p>
              </div>
            );
          })}
        </div>

        {/* ─── COURSE ─── */}
        <SectionTitle sub="03 / Course Context">INDE 4334 · Senior Capstone</SectionTitle>
        <Panel accent={C.red}>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 auto' }}>
              <GraduationCap size={64} color={C.red} />
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h3 style={{
                fontFamily: FONTS.display, fontSize: 24, fontWeight: 500,
                color: C.ink, margin: '0 0 14px',
              }}>
                Industrial & Systems Engineering Capstone
              </h3>
              <p style={{ fontSize: 14, color: C.inkDim, lineHeight: 1.65, marginBottom: 20 }}>
                INDE 4334 is the senior capstone course at the University of Houston Cullen College of Engineering.
                Teams partner with industry sponsors to deliver a complete engineering project — from problem definition
                through data collection, analysis, design, and implementation-ready documentation. Cadeco Industries
                served as our sponsor for the {PROJECT.semester} cohort.
              </p>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 10, color: C.muted, fontFamily: FONTS.mono, letterSpacing: '0.15em', marginBottom: 4 }}>SEMESTER</div>
                  <div style={{ fontSize: 16, color: C.ink, fontFamily: FONTS.mono }}>{PROJECT.semester}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: C.muted, fontFamily: FONTS.mono, letterSpacing: '0.15em', marginBottom: 4 }}>COURSE</div>
                  <div style={{ fontSize: 16, color: C.ink, fontFamily: FONTS.mono }}>{PROJECT.course}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: C.muted, fontFamily: FONTS.mono, letterSpacing: '0.15em', marginBottom: 4 }}>GRADUATION</div>
                  <div style={{ fontSize: 16, color: C.ink, fontFamily: FONTS.mono }}>{PROJECT.graduation}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: C.muted, fontFamily: FONTS.mono, letterSpacing: '0.15em', marginBottom: 4 }}>DEPARTMENT</div>
                  <div style={{ fontSize: 16, color: C.ink, fontFamily: FONTS.mono }}>UH IE / Cullen</div>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        {/* ─── ACKNOWLEDGMENTS ─── */}
        <div style={{ marginTop: 64 }}>
          <SectionTitle sub="04 / Acknowledgments">Thank you</SectionTitle>
          <div style={{
            padding: 32, background: C.surface, border: `1px solid ${C.border}`,
            borderLeft: `2px solid ${C.red}`,
          }}>
            <p style={{ fontSize: 14, color: C.inkDim, lineHeight: 1.7, margin: '0 0 16px' }}>
              <strong style={{ color: C.ink }}>Cadeco Industries</strong> — for opening the Deer Park facility to our team
              and providing transparent access to operational data, time studies, and sponsor feedback throughout the project.
            </p>
            <p style={{ fontSize: 14, color: C.inkDim, lineHeight: 1.7, margin: '0 0 16px' }}>
              <strong style={{ color: C.ink }}>UH IE Faculty</strong> — for course guidance and rigor in scoping, methodology, and analysis.
            </p>
            <p style={{ fontSize: 14, color: C.inkDim, lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: C.ink }}>The warehouse staff</strong> — for patiently letting us shadow their workflows,
              ask the dumb questions, and verify every measurement before it became a recommendation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
