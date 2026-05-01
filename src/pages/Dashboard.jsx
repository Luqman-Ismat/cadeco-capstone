import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, LineChart, Line, ComposedChart, ReferenceLine, Legend,
  AreaChart, Area,
} from 'recharts';
import {
  BarChart3, TrendingUp, Clock, MapPin, Layers, Users, Activity,
  Box, Truck, FileText, AlertTriangle, Database,
} from 'lucide-react';
import { C, FONTS, fmt } from '../theme';
import { Btn, StatCard, SectionTitle, Panel, ChartTooltip, th, td } from '../components/UI.jsx';
import {
  PROJECT, paretoData, activities, travel, weeklyTrend, orderMetrics, capacity,
  nvaCurrent, nvaProposed, necCurrent, necProposed, vaCurrent, vaProposed,
  totalCurrent, totalProposed, headlineCycle,
} from '../data/projectData.js';

const TABS = [
  { id: 'overview',  label: 'Overview',         icon: BarChart3 },
  { id: 'pareto',    label: 'SKU Pareto',       icon: TrendingUp },
  { id: 'cycle',     label: 'Cycle Time',       icon: Clock },
  { id: 'travel',    label: 'Travel Distance',  icon: MapPin },
  { id: 'capacity',  label: 'Rack Capacity',    icon: Layers },
  { id: 'roles',     label: 'Roles & Workflow', icon: Users },
  { id: 'trends',    label: 'Weekly Trends',    icon: Activity },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      {/* ─── Page header ─── */}
      <header className="mobile-section" style={{
        padding: '56px 32px 24px',
        borderBottom: `1px solid ${C.border}`,
        background: `linear-gradient(180deg, ${C.redBg} 0%, transparent 100%)`,
      }}>
        <div style={{ maxWidth: 1700, margin: '0 auto' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            flexWrap: 'wrap', gap: 24,
          }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 11, color: C.red, textTransform: 'uppercase',
                letterSpacing: '0.25em', fontWeight: 700, fontFamily: FONTS.mono,
                marginBottom: 12,
              }}>
                <span style={{ width: 8, height: 8, background: C.red, display: 'inline-block' }} />
                CADECO INDUSTRIES · DEER PARK, TX
              </div>
              <h1 style={{
                fontFamily: FONTS.display, fontSize: 'clamp(34px, 5vw, 48px)',
                fontWeight: 400, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.05,
              }}>
                Operations Dashboard
              </h1>
              <div style={{
                fontSize: 13, color: C.inkDim, marginTop: 10,
                fontFamily: FONTS.mono, display: 'flex', gap: 20, flexWrap: 'wrap',
              }}>
                <span>{PROJECT.periodStart} → {PROJECT.periodEnd}</span>
                <span>· {PROJECT.weeks} operational weeks</span>
                <span>· n={PROJECT.observedCycles} observed cycles</span>
                <span>· WorkStudy+ 7</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: 9, color: C.muted, textTransform: 'uppercase',
                letterSpacing: '0.2em', fontFamily: FONTS.mono,
              }}>Project Status</div>
              <div style={{
                fontSize: 14, color: C.green, fontWeight: 600, marginTop: 6,
                fontFamily: FONTS.mono, display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 8, height: 8, background: C.green, borderRadius: '50%', display: 'inline-block' }} />
                PROPOSED · PRE-IMPLEMENTATION
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex', gap: 4, marginTop: 32, borderBottom: `1px solid ${C.border}`,
            marginBottom: -1, overflowX: 'auto',
          }}>
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  background: isActive ? C.surface : 'transparent', border: 'none',
                  borderBottom: isActive ? `2px solid ${C.red}` : '2px solid transparent',
                  padding: '14px 20px',
                  fontSize: 12, fontWeight: isActive ? 600 : 500,
                  color: isActive ? C.ink : C.inkDim, marginBottom: -1, cursor: 'pointer',
                  fontFamily: FONTS.mono, letterSpacing: '0.08em', textTransform: 'uppercase',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  transition: 'all 150ms', whiteSpace: 'nowrap',
                }}>
                  <Icon size={13} /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="mobile-section" style={{ padding: '32px', maxWidth: 1700, margin: '0 auto' }}>
        <div className="fade-in" key={activeTab}>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'pareto'   && <ParetoTab />}
          {activeTab === 'cycle'    && <CycleTab />}
          {activeTab === 'travel'   && <TravelTab />}
          {activeTab === 'capacity' && <CapacityTab />}
          {activeTab === 'roles'    && <RolesTab />}
          {activeTab === 'trends'   && <TrendsTab />}
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// OVERVIEW
// ═══════════════════════════════════════════════════════════════════
function OverviewTab() {
  return (
    <>
      <SectionTitle sub="01 / Headline Metrics">Operational summary at a glance</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 32 }}>
        <StatCard label="Cycle Time Reduction" value="58%" subValue="27.43 → 11.54 min" delta="−15.89 min / batch" accent={C.green} icon={Clock} />
        <StatCard label="NVA Reduced" value="78%" subValue="19.35 → 4.35 min" delta="Redo + Alt eliminated" accent={C.red} icon={AlertTriangle} />
        <StatCard label="Forklift Travel" value="94%" subValue="318 → 20 ft / SKU" delta="±66 → ±4 ft (SD)" accent={C.amber} icon={Truck} />
        <StatCard label="Annual Savings" value="$49.6K" subValue="3.2 mo payback" delta="$13.3K capex" accent={C.blue} icon={Layers} />
      </div>

      <SectionTitle sub="02 / Order Volume">12-week observation period</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 36 }}>
        <StatCard label="Total Cases"  value={fmt(orderMetrics.totalCases)} subValue="across 7 SKUs" accent={C.red} icon={Box} />
        <StatCard label="Order Lines"  value={fmt(orderMetrics.orderLines)} subValue="distinct lines" accent={C.red} icon={FileText} />
        <StatCard label="Sales Orders" value={fmt(orderMetrics.salesOrders)} subValue="distinct orders" accent={C.red} icon={FileText} />
        <StatCard label="Avg / Order"  value={fmt(orderMetrics.avgPerOrder)} subValue="cases per order" accent={C.muted} />
        <StatCard label="Cases / Week" value={fmt(orderMetrics.casesPerWeek)} subValue="12-week average" accent={C.muted} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 20 }}>
        <Panel subtitle="03 / Cycle Time" title="Before vs After Composition" accent={C.green}>
          <CycleStackChart />
        </Panel>
        <Panel subtitle="04 / Solution Architecture" title="Three-Pillar Approach" accent={C.amber}>
          <PillarsBlock />
        </Panel>
      </div>
    </>
  );
}

function CycleStackChart() {
  const data = [
    { name: 'Current',  NVA: nvaCurrent,  NEC: necCurrent,  VA: vaCurrent  },
    { name: 'Proposed', NVA: nvaProposed, NEC: necProposed, VA: vaProposed },
  ];
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 60, left: 0, bottom: 10 }}>
        <CartesianGrid stroke={C.border} horizontal={false} />
        <XAxis type="number" stroke={C.muted} tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.muted }} />
        <YAxis type="category" dataKey="name" stroke={C.muted}
          tick={{ fontSize: 13, fontFamily: FONTS.mono, fill: C.ink, fontWeight: 600 }} width={90} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: C.surface2 }} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: FONTS.mono }} />
        <Bar dataKey="NVA" stackId="a" fill={C.red} />
        <Bar dataKey="NEC" stackId="a" fill={C.blue} />
        <Bar dataKey="VA"  stackId="a" fill={C.green} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function PillarsBlock() {
  const pillars = [
    { num: '01', title: 'Demand Dashboard',  body: 'Pre-shift HIGH/MED/LOW risk scan eliminates the 14.22 min Redo Picks event.' },
    { num: '02', title: 'Designated Cells',  body: 'All 7 Target SKUs on Rack 30 with fixed cells. Rack 31 Amazon-only. Eliminates floor-search and alt-label workaround.' },
    { num: '03', title: 'Return-to-Cell',    body: 'New +30s NEC step prevents ad-hoc floor staging. Closes the loop.' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {pillars.map(p => (
        <div key={p.num} style={{ padding: '14px 18px', borderLeft: `2px solid ${C.amber}`, background: C.surface2 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 4 }}>
            <span style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 300, color: C.amber, letterSpacing: '-0.02em' }}>{p.num}</span>
            <span style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 500, color: C.ink }}>{p.title}</span>
          </div>
          <div style={{ fontSize: 12, color: C.inkDim, lineHeight: 1.5, marginLeft: 50 }}>{p.body}</div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PARETO
// ═══════════════════════════════════════════════════════════════════
function ParetoTab() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? paretoData : paretoData.filter(s => s.abc === filter);
  return (
    <>
      <SectionTitle sub="01 / Pareto Analysis"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant={filter==='all'?'primary':'ghost'} onClick={() => setFilter('all')}>ALL</Btn>
            <Btn variant={filter==='A'?'primary':'ghost'} onClick={() => setFilter('A')}>CLASS A</Btn>
            <Btn variant={filter==='B'?'primary':'ghost'} onClick={() => setFilter('B')}>CLASS B</Btn>
            <Btn variant={filter==='C'?'primary':'ghost'} onClick={() => setFilter('C')}>CLASS C</Btn>
          </div>
        }>Target SKU volume distribution</SectionTitle>

      <Panel subtitle="A. Pareto chart" title="Cumulative case volume by SKU rank" accent={C.red}>
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={filtered} margin={{ top: 20, right: 60, left: 0, bottom: 40 }}>
            <CartesianGrid stroke={C.border} vertical={false} />
            <XAxis dataKey="sku" stroke={C.muted} tick={{ fontSize: 12, fontFamily: FONTS.mono, fill: C.muted }} />
            <YAxis yAxisId="left" stroke={C.muted} tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.muted }} />
            <YAxis yAxisId="right" orientation="right" stroke={C.amber}
              tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.amber }} domain={[0, 100]} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: C.surface2 }} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: FONTS.mono }} />
            <Bar yAxisId="left" dataKey="cases" name="Cases">
              {filtered.map((d, i) => (
                <Cell key={i} fill={d.abc === 'A' ? C.classA : d.abc === 'B' ? C.classB : C.classC} />
              ))}
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke={C.amber} strokeWidth={2.5}
              dot={{ fill: C.amber, r: 5, strokeWidth: 2, stroke: C.bg }} name="Cumulative %" />
            <ReferenceLine yAxisId="right" y={50} stroke={C.dim} strokeDasharray="3 3" label={{ value: '50%', position: 'right', fill: C.dim, fontSize: 10 }} />
            <ReferenceLine yAxisId="right" y={80} stroke={C.dim} strokeDasharray="3 3" label={{ value: '80%', position: 'right', fill: C.dim, fontSize: 10 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </Panel>

      <div style={{ marginTop: 24 }}>
        <Panel subtitle="B. SKU Master Table" title="ABC classification & cell assignments">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONTS.mono, fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                  <th style={th()}>Rank</th>
                  <th style={th()}>SKU</th>
                  <th style={{...th(), textAlign: 'left'}}>Description</th>
                  <th style={th()}>Cases</th>
                  <th style={th()}>Lines</th>
                  <th style={th()}>Cases/Wk</th>
                  <th style={th()}>%</th>
                  <th style={th()}>ABC</th>
                  <th style={th()}>Cell</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.sku} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={td()}>{s.rank}</td>
                    <td style={{...td(), color: C.ink, fontWeight: 600}}>{s.sku}</td>
                    <td style={{...td(), textAlign: 'left'}}>{s.name}</td>
                    <td style={td()}>{fmt(s.cases)}</td>
                    <td style={td()}>{fmt(s.lines)}</td>
                    <td style={td()}>{fmt(s.wk)}</td>
                    <td style={td()}>{s.pct.toFixed(1)}%</td>
                    <td style={td()}>
                      <span style={{
                        background: s.abc === 'A' ? C.classA : s.abc === 'B' ? C.classB : C.classC,
                        color: '#FFFFFF', padding: '2px 10px', fontSize: 11, fontWeight: 600,
                      }}>{s.abc}</span>
                    </td>
                    <td style={{...td(), color: C.green, fontWeight: 600}}>{s.cell}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CYCLE TIME
// ═══════════════════════════════════════════════════════════════════
function CycleTab() {
  return (
    <>
      <SectionTitle sub="01 / Cycle Time Reduction">Per-batch activity breakdown</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 32 }}>
        <StatCard label="Cycle Current"  value={headlineCycle.current.toFixed(2)}  subValue="min / batch" accent={C.red} />
        <StatCard label="Cycle Proposed" value={headlineCycle.future.toFixed(2)} subValue="min / batch" accent={C.green} />
        <StatCard label="Time Saved"     value={headlineCycle.savings.toFixed(2)} subValue="min / batch"
          delta={`${headlineCycle.reduction}% reduction`} accent={C.amber} />
        <StatCard label="NVA Reduction"  value={`${((1-nvaProposed/nvaCurrent)*100).toFixed(0)}%`}
          subValue={`${nvaCurrent.toFixed(2)} → ${nvaProposed.toFixed(2)} min`} accent={C.red} />
      </div>

      <Panel subtitle="A. Activity-level comparison" title="Current vs Proposed time per activity" accent={C.red}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={activities} margin={{ top: 20, right: 60, left: 60, bottom: 60 }}>
            <CartesianGrid stroke={C.border} vertical={false} />
            <XAxis dataKey="name" stroke={C.muted}
              tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.muted }}
              angle={-15} textAnchor="end" height={60} />
            <YAxis stroke={C.muted} tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.muted }} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: C.surface2 }} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: FONTS.mono }} />
            <Bar dataKey="current"  name="Current"  fill={C.red} />
            <Bar dataKey="proposed" name="Proposed" fill={C.green} />
          </BarChart>
        </ResponsiveContainer>
        <p style={{ margin: '14px 0 0', color: C.dim, fontSize: 12, lineHeight: 1.5, fontFamily: FONTS.mono }}>
          Activity rows sum to the WorkStudy+ 7 measured per-batch baseline. Total cycle compresses from 27.43 → 11.54 min
          (58% reduction, 15.89 min recovered per batch). Printer walk and Case Building remain — printer
          relocation is captured separately in the cell layout; case building is the value-added core of the cycle.
        </p>
      </Panel>

      <div style={{ marginTop: 20 }}>
        <Panel subtitle="B. Activity Detail" title="Time-study averages with status flags">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONTS.mono, fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                  <th style={{...th(), textAlign: 'left'}}>Activity</th>
                  <th style={th()}>Cat</th>
                  <th style={th()}>Current</th>
                  <th style={th()}>Proposed</th>
                  <th style={th()}>Δ</th>
                  <th style={th()}>Reduction</th>
                  <th style={th()}>Status</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{...td(), textAlign: 'left', color: C.ink, fontWeight: 600}}>{a.name}</td>
                    <td style={td()}>
                      <span style={{
                        background: a.cat === 'NVA' ? C.red : a.cat === 'NEC' ? C.blue : C.green,
                        color: '#FFFFFF', padding: '2px 10px', fontSize: 11, fontWeight: 600,
                      }}>{a.cat}</span>
                    </td>
                    <td style={{...td(), color: C.red, fontWeight: 600}}>{a.current.toFixed(2)}</td>
                    <td style={{...td(), color: C.green, fontWeight: 600}}>{a.proposed.toFixed(2)}</td>
                    <td style={{...td(), color: C.amber}}>−{(a.current - a.proposed).toFixed(2)}</td>
                    <td style={{...td(), color: C.amber, fontWeight: 600}}>
                      {a.current === 0 ? '—' : a.proposed === 0 ? '100%' : `${((1-a.proposed/a.current)*100).toFixed(0)}%`}
                    </td>
                    <td style={td()}>
                      <span style={{
                        color: a.status === 'ELIMINATED' ? C.red : C.green,
                        fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
                      }}>● {a.status}</span>
                    </td>
                  </tr>
                ))}
                <tr style={{ borderTop: `2px solid ${C.green}`, background: C.surface2 }}>
                  <td style={{...td(), textAlign: 'left', color: C.ink, fontWeight: 700}}>TOTAL</td>
                  <td style={td()}></td>
                  <td style={{...td(), color: C.ink, fontWeight: 700, fontSize: 14}}>{totalCurrent.toFixed(2)}</td>
                  <td style={{...td(), color: C.ink, fontWeight: 700, fontSize: 14}}>{totalProposed.toFixed(2)}</td>
                  <td style={{...td(), color: C.amber, fontWeight: 700, fontSize: 14}}>−{(totalCurrent-totalProposed).toFixed(2)}</td>
                  <td style={{...td(), color: C.green, fontWeight: 700, fontSize: 14}}>{((1-totalProposed/totalCurrent)*100).toFixed(0)}%</td>
                  <td style={td()}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginTop: 20 }}>
        <CategoryRollup category="NVA" current={nvaCurrent} proposed={nvaProposed} color={C.red}   description="Eliminate or reduce" />
        <CategoryRollup category="NEC" current={necCurrent} proposed={necProposed} color={C.blue}  description="Required overhead" />
        <CategoryRollup category="VA"  current={vaCurrent}  proposed={vaProposed}  color={C.green} description="Customer pays for" />
      </div>
    </>
  );
}

function CategoryRollup({ category, current, proposed, color, description }) {
  const reduction = ((1 - proposed/current) * 100).toFixed(0);
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderTop: `3px solid ${color}`, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: FONTS.mono, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>{category} Reduction</div>
        <span style={{ background: color, color: '#FFFFFF', padding: '2px 8px', fontSize: 10, fontWeight: 600, fontFamily: FONTS.mono }}>{category}</span>
      </div>
      <div style={{ fontSize: 44, fontFamily: FONTS.mono, fontWeight: 300, color: C.ink, lineHeight: 1, marginBottom: 8 }}>{reduction}%</div>
      <div style={{ fontSize: 12, color: C.inkDim, fontFamily: FONTS.mono, marginBottom: 6 }}>{current.toFixed(2)} → {proposed.toFixed(2)} min</div>
      <div style={{ fontSize: 11, color: C.dim, fontStyle: 'italic' }}>{description}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TRAVEL
// ═══════════════════════════════════════════════════════════════════
function TravelTab() {
  const tCur = travel.reduce((a,b) => a + b.current, 0);
  const tProp = travel.reduce((a,b) => a + b.proposed, 0);
  return (
    <>
      <SectionTitle sub="01 / Travel Distance">Per-role footprint reduction</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 32 }}>
        <StatCard label="Travel Current"  value={fmt(tCur)} subValue="ft / batch (3-role sum)" accent={C.red} />
        <StatCard label="Travel Proposed" value={fmt(tProp)} subValue="ft / batch (3-role sum)" accent={C.green} />
        <StatCard label="Distance Saved"  value={fmt(tCur-tProp)} subValue="ft eliminated"
          delta={`${((1-tProp/tCur)*100).toFixed(0)}% reduction`} accent={C.amber} />
        <StatCard label="Walking Pace"    value="3.5 ft/s" subValue="2.4 mph · warehouse avg" accent={C.muted} />
      </div>

      <Panel subtitle="A. Per-role comparison" title="Current vs Proposed travel distance" accent={C.red}>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={travel} margin={{ top: 20, right: 60, left: 60, bottom: 20 }}>
            <CartesianGrid stroke={C.border} vertical={false} />
            <XAxis dataKey="role" stroke={C.muted} tick={{ fontSize: 12, fontFamily: FONTS.mono, fill: C.muted }} />
            <YAxis stroke={C.muted} tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.muted }} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: C.surface2 }} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: FONTS.mono }} />
            <Bar dataKey="current" name="Current"  fill={C.red} />
            <Bar dataKey="proposed" name="Proposed" fill={C.green} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <div style={{ marginTop: 20 }}>
        <Panel subtitle="B. Detail" title="Travel breakdown by role">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONTS.mono, fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                <th style={{...th(), textAlign: 'left'}}>Role</th>
                <th style={th()}>Current (ft)</th>
                <th style={th()}>Proposed (ft)</th>
                <th style={th()}>Reduction</th>
                <th style={{...th(), textAlign: 'left'}}>Mechanism</th>
              </tr>
            </thead>
            <tbody>
              {travel.map((t, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{...td(), textAlign: 'left', color: C.ink, fontWeight: 600}}>{t.role}</td>
                  <td style={{...td(), color: C.red, fontWeight: 600}}>{fmt(t.current)}</td>
                  <td style={{...td(), color: C.green, fontWeight: 600}}>{fmt(t.proposed)}</td>
                  <td style={{...td(), color: C.amber, fontWeight: 700}}>{((1-t.proposed/t.current)*100).toFixed(0)}%</td>
                  <td style={{...td(), textAlign: 'left'}}>{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <div style={{
        marginTop: 20, padding: 18, background: C.amberBg, borderLeft: `2px solid ${C.amber}`,
        fontSize: 12, color: C.inkDim, fontFamily: FONTS.mono, lineHeight: 1.6,
      }}>
        <strong style={{ color: C.ink }}>Methodology note:</strong> Forklift travel (318 ft → 20 ft per SKU) is the
        headline metric — measured rectilinearly between rack centroid and staging. Spatial SD collapses from ±66 ft to
        ±4 ft. Team Lead &quot;travel&quot; represents the 459-ft printer walk, modeled as retained NVA (4.35 min/batch) for
        conservatism even though the printer physically relocates in the proposed layout.
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CAPACITY
// ═══════════════════════════════════════════════════════════════════
function CapacityTab() {
  const allocation = [
    { name: 'Target',   value: capacity.targetActive, color: C.red },
    { name: 'Amazon',   value: capacity.amazonActive, color: C.amber },
    { name: 'Reserved', value: capacity.reserved,     color: C.dim },
  ];
  return (
    <>
      <SectionTitle sub="01 / Rack Capacity">{capacity.total}-slot allocation across Racks 30 & 31</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 32 }}>
        <StatCard label="Total Capacity" value={`${capacity.total}`} subValue={`${capacity.perRack} per rack`} accent={C.blue} icon={Layers} />
        <StatCard label="Target Active"  value={`${capacity.targetActive}`} subValue="7 SKUs × 2 pallets" accent={C.red} icon={Box} />
        <StatCard label="Amazon Active"  value={`${capacity.amazonActive}`} subValue="25 SKUs × 2 pallets" accent={C.amber} icon={Box} />
        <StatCard label="Reserved"       value={`${capacity.reserved}`} subValue={`${((capacity.reserved / capacity.total) * 100).toFixed(0)}% of rack open`} accent={C.muted} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 20 }}>
        <Panel subtitle="A. Allocation" title="Slot distribution across capacity" accent={C.red}>
          <div style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={allocation} dataKey="value" nameKey="name"
                  cx="50%" cy="50%" innerRadius={70} outerRadius={120} paddingAngle={2}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={{ stroke: C.dim }}
                  style={{ fontFamily: FONTS.mono, fontSize: 11 }}>
                  {allocation.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              textAlign: 'center', fontFamily: FONTS.mono, pointerEvents: 'none',
            }}>
              <div style={{ fontSize: 28, color: C.ink, fontWeight: 300, lineHeight: 1 }}>{capacity.utilization}%</div>
              <div style={{ fontSize: 10, color: C.muted, letterSpacing: '0.15em', marginTop: 4 }}>UTILIZED</div>
            </div>
          </div>
        </Panel>

        <Panel subtitle="B. ABC Class placement" title="Velocity-based level assignment" accent={C.amber}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { class: 'A', cls_color: C.classA, profile: 'Top 50% of volume', rack: 'Rack 30 (Target only)', level: 'Level A (ground)', skus: '1' },
              { class: 'B', cls_color: C.classB, profile: '50–80% of volume',  rack: 'Rack 30 (Target only)', level: 'Level B',        skus: '2' },
              { class: 'C', cls_color: C.classC, profile: 'Bottom 20%',        rack: 'Rack 30 (Target only)', level: 'Level B',        skus: '4' },
            ].map(c => (
              <div key={c.class} style={{
                display: 'grid', gridTemplateColumns: '50px 1fr 80px',
                gap: 16, padding: '14px 16px', background: C.surface2,
                borderLeft: `3px solid ${c.cls_color}`, alignItems: 'center',
              }}>
                <div style={{ fontSize: 30, fontFamily: FONTS.display, fontWeight: 400, color: c.cls_color, lineHeight: 1 }}>{c.class}</div>
                <div>
                  <div style={{ fontSize: 13, color: C.ink, fontWeight: 600, marginBottom: 4 }}>{c.profile}</div>
                  <div style={{ fontSize: 11, color: C.inkDim, fontFamily: FONTS.mono }}>{c.rack} · {c.level}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontFamily: FONTS.mono, color: C.ink, fontWeight: 300 }}>{c.skus}</div>
                  <div style={{ fontSize: 9, color: C.dim, textTransform: 'uppercase', letterSpacing: '0.1em' }}>SKUs</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ROLES
// ═══════════════════════════════════════════════════════════════════
function RolesTab() {
  const roles = [
    {
      name: 'Team Lead', icon: Users, color: C.red,
      currentSteps: 6, futureSteps: 7, currentTime: 26.0, futureTime: 26.5,
      newSteps: ['Demand Dashboard check'], eliminatedSteps: [], improvedSteps: [],
      retainedNVA: 'Printer walk modeled at 4.35 min retained (459 ft round-trip). Conservative — physical printer relocation captured in cell layout.',
    },
    {
      name: 'Case Picker', icon: Box, color: C.amber,
      currentSteps: 6, futureSteps: 5, currentTime: 24.0, futureTime: 7.0,
      newSteps: ['Return Partial to Cell'],
      eliminatedSteps: ['Search Floor for Partial', 'Redo Missing Picks'],
      improvedSteps: ['Cell Retrieval (130 ft → 25 ft within staging cluster)'], retainedNVA: 'None',
    },
    {
      name: 'Forklift Driver', icon: Truck, color: C.green,
      currentSteps: 7, futureSteps: 6, currentTime: 13.0, futureTime: 9.0,
      newSteps: [], eliminatedSteps: ['Alternative Labels Printed'],
      improvedSteps: ['Cell Retrieval (318 ft → 20 ft per SKU)', 'Wrap Cycle (5.89 → 1.25 min)'],
      retainedNVA: 'None',
    },
  ];
  return (
    <>
      <SectionTitle sub="01 / Roles & Workflow">Per-role workflow impact</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 14 }}>
        {roles.map(r => {
          const Icon = r.icon;
          const stepDelta = r.futureSteps - r.currentSteps;
          const timeReduction = ((1 - r.futureTime/r.currentTime) * 100);
          return (
            <Panel key={r.name} accent={r.color}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <Icon size={22} color={r.color} />
                <div>
                  <div style={{ fontSize: 9, color: C.muted, fontFamily: FONTS.mono, letterSpacing: '0.15em', textTransform: 'uppercase' }}>SOP-{r.name.split(' ').map(w=>w[0]).join('')}-001</div>
                  <div style={{ fontSize: 18, color: C.ink, fontFamily: FONTS.display, fontWeight: 500, marginTop: 2 }}>{r.name}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                <div style={{ background: C.surface2, padding: '10px 14px' }}>
                  <div style={{ fontSize: 9, color: C.muted, letterSpacing: '0.1em', fontFamily: FONTS.mono, textTransform: 'uppercase', marginBottom: 4 }}>Steps</div>
                  <div style={{ fontSize: 18, color: C.ink, fontFamily: FONTS.mono, fontWeight: 300 }}>{r.currentSteps} → {r.futureSteps}</div>
                  <div style={{ fontSize: 10, color: stepDelta > 0 ? C.amber : stepDelta < 0 ? C.green : C.dim, fontFamily: FONTS.mono, marginTop: 2 }}>
                    {stepDelta > 0 ? `+${stepDelta} step` : stepDelta < 0 ? `${stepDelta} step` : 'no change'}
                  </div>
                </div>
                <div style={{ background: C.surface2, padding: '10px 14px' }}>
                  <div style={{ fontSize: 9, color: C.muted, letterSpacing: '0.1em', fontFamily: FONTS.mono, textTransform: 'uppercase', marginBottom: 4 }}>Cycle Time</div>
                  <div style={{ fontSize: 18, color: C.ink, fontFamily: FONTS.mono, fontWeight: 300 }}>{r.currentTime} → {r.futureTime}</div>
                  <div style={{ fontSize: 10, color: timeReduction > 0 ? C.green : C.amber, fontFamily: FONTS.mono, marginTop: 2 }}>
                    {timeReduction > 0 ? `↓ ${timeReduction.toFixed(0)}%` : 'unchanged'}
                  </div>
                </div>
              </div>

              {r.newSteps.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, color: C.green, fontWeight: 600, fontFamily: FONTS.mono, marginBottom: 6, letterSpacing: '0.1em' }}>★ NEW STEPS</div>
                  {r.newSteps.map((s, i) => <div key={i} style={{ fontSize: 12, color: C.ink, marginBottom: 4 }}>● {s}</div>)}
                </div>
              )}
              {r.eliminatedSteps.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, color: C.red, fontWeight: 600, fontFamily: FONTS.mono, marginBottom: 6, letterSpacing: '0.1em' }}>✕ ELIMINATED</div>
                  {r.eliminatedSteps.map((s, i) => <div key={i} style={{ fontSize: 12, color: C.ink, marginBottom: 4 }}>● {s}</div>)}
                </div>
              )}
              {r.improvedSteps.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, color: C.amber, fontWeight: 600, fontFamily: FONTS.mono, marginBottom: 6, letterSpacing: '0.1em' }}>↑ IMPROVED</div>
                  {r.improvedSteps.map((s, i) => <div key={i} style={{ fontSize: 12, color: C.ink, marginBottom: 4 }}>● {s}</div>)}
                </div>
              )}

              <div style={{ paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 10, color: C.dim, fontFamily: FONTS.mono, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Retained NVA</div>
                <div style={{ fontSize: 11, color: C.inkDim }}>{r.retainedNVA}</div>
              </div>
            </Panel>
          );
        })}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TRENDS
// ═══════════════════════════════════════════════════════════════════
function TrendsTab() {
  return (
    <>
      <SectionTitle sub="01 / Weekly Trends">12-week observation period</SectionTitle>
      <Panel subtitle="A. Weekly volume" title="Cases shipped per week" accent={C.red}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={weeklyTrend} margin={{ top: 20, right: 60, left: 60, bottom: 20 }}>
            <defs>
              <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.red} stopOpacity={0.4} />
                <stop offset="100%" stopColor={C.red} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={C.border} vertical={false} />
            <XAxis dataKey="week" stroke={C.muted} tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.muted }} />
            <YAxis stroke={C.muted} tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.muted }} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: C.surface2 }} />
            <Area type="monotone" dataKey="cases" stroke={C.red} strokeWidth={2.5} fill="url(#colorCases)" name="Cases" />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 20, marginTop: 20 }}>
        <Panel subtitle="B. Order metrics" title="Lines & sales orders per week" accent={C.amber}>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={weeklyTrend} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid stroke={C.border} vertical={false} />
              <XAxis dataKey="week" stroke={C.muted} tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.muted }} />
              <YAxis stroke={C.muted} tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.muted }} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: C.surface2 }} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: FONTS.mono }} />
              <Bar dataKey="lines" name="Order Lines" fill={C.amber} />
              <Line type="monotone" dataKey="orders" name="Sales Orders" stroke={C.red} strokeWidth={2.5} dot={{ fill: C.red, r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Panel>

        <Panel subtitle="C. NVA stability" title="Weekly NVA — current state baseline" accent={C.red}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weeklyTrend} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid stroke={C.border} vertical={false} />
              <XAxis dataKey="week" stroke={C.muted} tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.muted }} />
              <YAxis stroke={C.muted} domain={[18, 21]} tick={{ fontSize: 11, fontFamily: FONTS.mono, fill: C.muted }} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: C.surface2 }} />
              <ReferenceLine y={19.35} stroke={C.green} strokeDasharray="4 4" label={{ value: 'Avg 19.35', fill: C.green, fontSize: 10 }} />
              <Line type="monotone" dataKey="nva" name="NVA min/batch" stroke={C.red} strokeWidth={2.5} dot={{ fill: C.red, r: 5, strokeWidth: 2, stroke: C.bg }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </>
  );
}
