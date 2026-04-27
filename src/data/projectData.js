// ════════════════════════════════════════════════════════════════════
//   CADECO PROJECT DATA — single source of truth
//   All numbers reconciled per chat corrections (26 Apr 2026):
//   • Printer walk: 4.35 → 0.45 min (94 ft round-trip @ 3.5 ft/s)
//   • TL travel: ~913 ft → ~130 ft (86%)
//   • NVA: 19.35 → 0.45 min (98%)
//   • 6-activity total: 29.31 → 3.05 min (90%)
// ════════════════════════════════════════════════════════════════════

// ── Project metadata ──────────────────────────────────────────────
export const PROJECT = {
  course: 'INDE 4334',
  team: 'Team 7',
  semester: 'Spring 2026',
  client: 'Cadeco Industries',
  facility: 'Deer Park, TX',
  periodStart: '2 Dec 2025',
  periodEnd:   '23 Feb 2026',
  weeks: 9,
  observedCycles: 24,
  graduation: 'May 2026',
};

// ── Target SKUs (verified) ────────────────────────────────────────
export const skus = [
  { rank: 1, sku: '62632', name: 'GG Org Sugar 6ct-2lb',         cases: 13157, wk: 1462, abc: 'A', cell: 'R30-C01-A', pct: 38.0, lines: 182 },
  { rank: 2, sku: '62641', name: 'GG Org Lt Brown 6ct-1.5lb',    cases: 6454,  wk: 717,  abc: 'B', cell: 'R30-C03-B', pct: 18.7, lines: 145 },
  { rank: 3, sku: '62004', name: 'GG Org Pwd Sugar 6ct-1lb',     cases: 4891,  wk: 543,  abc: 'B', cell: 'R30-C05-B', pct: 14.1, lines: 164 },
  { rank: 4, sku: '62106', name: 'GG Org Coconut Palm 6ct',      cases: 3323,  wk: 369,  abc: 'C', cell: 'R30-C07-C', pct: 9.6,  lines: 189 },
  { rank: 5, sku: '62231', name: 'GG Org Light Agave 6ct',       cases: 3092,  wk: 344,  abc: 'C', cell: 'R31-C01-C', pct: 8.9,  lines: 194 },
  { rank: 6, sku: '62432', name: 'GG Org Sugar 6ct-4lb',         cases: 2511,  wk: 279,  abc: 'C', cell: 'R31-C02-C', pct: 7.3,  lines: 168 },
  { rank: 7, sku: '62232', name: 'GG Org Raw Agave 6ct',         cases: 1176,  wk: 131,  abc: 'C', cell: 'R31-C03-C', pct: 3.4,  lines: 179 },
];

let cum = 0;
export const paretoData = skus.map(s => { cum += s.pct; return { ...s, cumulative: parseFloat(cum.toFixed(1)) }; });

// ── Cycle time activities (verified) ──────────────────────────────
export const activities = [
  { name: 'Printer Walk',      cat: 'NVA', current: 4.35,  proposed: 0.45, status: 'IMPROVED'   },
  { name: 'Redo Picks',        cat: 'NVA', current: 14.22, proposed: 0.00, status: 'ELIMINATED' },
  { name: 'Alt. Picklist',     cat: 'NVA', current: 0.78,  proposed: 0.00, status: 'ELIMINATED' },
  { name: 'Pallet Collection', cat: 'NEC', current: 2.27,  proposed: 0.75, status: 'IMPROVED'   },
  { name: 'Travel to Rack',    cat: 'NEC', current: 1.80,  proposed: 0.60, status: 'IMPROVED'   },
  { name: 'Stretch Wrap',      cat: 'VA',  current: 5.89,  proposed: 1.25, status: 'IMPROVED'   },
];

// Swimlane-canonical headline (per locked poster):
// 27.43 min measured baseline → 7.64 min after applying 6-activity savings.
// This is what every page should show as "cycle time" in headlines.
export const headlineCycle = {
  current: 27.43,
  future: 7.64,
  reduction: 72,
  savings: 19.79,
};

const sumBy = (arr, key, filter) => arr.filter(filter).reduce((a, x) => a + x[key], 0);
export const nvaCurrent  = sumBy(activities, 'current',  x => x.cat === 'NVA');
export const nvaProposed = sumBy(activities, 'proposed', x => x.cat === 'NVA');
export const necCurrent  = sumBy(activities, 'current',  x => x.cat === 'NEC');
export const necProposed = sumBy(activities, 'proposed', x => x.cat === 'NEC');
export const vaCurrent   = sumBy(activities, 'current',  x => x.cat === 'VA');
export const vaProposed  = sumBy(activities, 'proposed', x => x.cat === 'VA');
export const totalCurrent  = nvaCurrent + necCurrent + vaCurrent;   // 29.31
export const totalProposed = nvaProposed + necProposed + vaProposed; // 3.05

// ── Travel distances (verified) ───────────────────────────────────
export const travel = [
  { role: 'Team Lead',       current: 913, proposed: 130, note: 'Printer relocates within cell layout' },
  { role: 'Case Picker',     current: 130, proposed: 60,  note: 'Designated cells eliminate floor-search' },
  { role: 'Forklift Driver', current: 390, proposed: 80,  note: 'Adjacent racks (R30/R31)' },
];

// ── Weekly trend (illustrative for visualization) ────────────────
export const weeklyTrend = [
  { week: 'W1', cases: 3520, lines: 132, orders: 24, nva: 19.4 },
  { week: 'W2', cases: 3920, lines: 142, orders: 26, nva: 19.1 },
  { week: 'W3', cases: 4180, lines: 138, orders: 28, nva: 19.5 },
  { week: 'W4', cases: 3650, lines: 128, orders: 23, nva: 19.2 },
  { week: 'W5', cases: 4230, lines: 154, orders: 30, nva: 19.8 },
  { week: 'W6', cases: 3890, lines: 140, orders: 27, nva: 19.3 },
  { week: 'W7', cases: 3760, lines: 132, orders: 24, nva: 19.5 },
  { week: 'W8', cases: 3680, lines: 128, orders: 23, nva: 19.2 },
  { week: 'W9', cases: 3776, lines: 127, orders: 24, nva: 19.4 },
];

// ── Order metrics (verified) ──────────────────────────────────────
export const orderMetrics = {
  totalCases: 34604,
  orderLines: 1221,
  salesOrders: 229,
  avgPerOrder: 151,
  casesPerWeek: 3844,
  amazonActive: 37,
  amazonTopN: 25,
  amazonCases: 17460,
};

// ── Capacity (verified) ───────────────────────────────────────────
export const capacity = {
  total: 256,
  perRack: 128,
  targetActive: 14,   // 7 SKUs × 2 pallets
  amazonActive: 30,   // 15 SKUs × 2 pallets
  reserved: 212,
  utilization: 17.2,
};

// ── Team members ──────────────────────────────────────────────────
export const teamMembers = [
  { name: 'Luqman Ismat',     role: 'Project Lead · Documentation Owner',     focus: 'Documentation, dashboards, integration' },
  { name: 'Member 2',         role: 'Time Study & WorkStudy+ Analysis',       focus: 'NVA quantification, cycle-time analysis' },
  { name: 'Member 3',         role: 'Layout Design & Spaghetti Diagrams',     focus: 'Travel path optimization, floor-plan design' },
  { name: 'Member 4',         role: 'iRely Data & Pareto Analysis',           focus: 'SKU classification, ABC analysis, demand modeling' },
  { name: 'Member 5',         role: 'SOP Development & Training Materials',   focus: 'Standard work, role definitions, training plans' },
];

// ── Deliverables (downloadable) ───────────────────────────────────
export const deliverables = [
  {
    category: 'Documentation',
    items: [
      { name: 'Documentation Guide',          file: 'Documentation_Guide.docx',              desc: 'Locked baseline documentation guide with canonical poster metrics' },
      { name: 'SOP — Team Lead',              file: 'SOP_-_Team_Lead.docx',                 desc: 'Standard operating procedure for the Team Lead role' },
      { name: 'SOP — Case Picker',            file: 'SOP_-_Case_Picker.docx',               desc: 'Standard operating procedure for the Case Picker role' },
      { name: 'SOP — Forklift Driver',        file: 'SOP_-_Forklift_Driver.docx',           desc: 'Standard operating procedure for the Forklift Driver role' },
    ],
  },
  {
    category: 'Diagrams',
    items: [
      { name: 'Cell Layout (proposed)',       file: 'Cell_Layout_v5.drawio',                desc: 'Top-down floor plan with zones, cell assignments, role paths' },
      { name: 'Swimlane — Current State',     file: 'Current_Swimlane.png',                 desc: 'Locked current-state swimlane from latest poster baseline' },
      { name: 'Swimlane — Future State',      file: 'Future_Swimlane.png',                  desc: 'Locked future-state swimlane from latest poster baseline' },
      { name: 'Spaghetti Diagrams (7 SKUs)',  file: 'Spaghetti_Future_All_SKUs_v3.drawio',  desc: 'Per-SKU travel paths in the proposed state' },
      { name: 'All diagrams (master)',        file: 'All_Diagrams_v3.drawio',               desc: '10-page master file containing all diagrams' },
    ],
  },
  {
    category: 'Data & Analysis',
    items: [
      { name: 'Operations Dashboard (xlsx)',  file: 'Cadeco_Dashboard_v3.xlsx',             desc: '17-sheet self-updating dashboard — Pareto, NVA, capacity, travel' },
      { name: 'Rack Layout & SKU Analysis',   file: 'RackLayout_3_Designs_and_SKU_Analysis.xlsx', desc: '3 candidate rack designs with full SKU analysis and rationale' },
    ],
  },
  {
    category: 'Presentation',
    items: [
      { name: 'Capstone Poster (HTML)',       file: 'Cadeco_Poster_v3.html',                desc: '48"×36" poster — print-ready' },
    ],
  },
];
