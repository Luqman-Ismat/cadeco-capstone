// ════════════════════════════════════════════════════════════════════
//   CADECO PROJECT DATA — single source of truth
//   Reconciled to FINAL PRESENTATION (May 5, 2026 defense deck).
//
//   Headline numbers (locked):
//   • Cycle:    27.43 → 11.54 min  (−58%)
//   • NVA:      19.35 → 4.35  min  (−78%)  [printer walk RETAINED]
//   • Travel:   318   → 20    ft/SKU (−94%)
//   • Capex:    $13.3K
//   • Savings:  $49.6K/yr
//   • Payback:  3.2 mo
//   • Batches:  ~3,968/yr  (76/wk × 52)
// ════════════════════════════════════════════════════════════════════

// ── Project metadata ──────────────────────────────────────────────
export const PROJECT = {
  course: 'INDE 4334',
  team: 'Team 7',
  semester: 'Spring 2026',
  client: 'Cadeco Industries',
  facility: 'Deer Park, TX',
  periodStart: 'Dec 2025',
  periodEnd:   'Feb 2026',
  weeks: 12,
  observedCycles: 24,
  graduation: 'May 2026',
  defenseDate: 'May 5, 2026',
};

// ── Target SKUs (Design B: ALL on Rack 30) ────────────────────────
// Class A → Level A, Class B + Class C → Level B
// (Design B prioritizes customer separation over ABC level assignment)
export const skus = [
  { rank: 1, sku: '62632', name: 'GG Org Sugar 6ct-2lb',                cases: 17544, wk: 1462, abc: 'A', cell: 'R30-C01-A', pct: 38.0, lines: 182 },
  { rank: 2, sku: '62641', name: 'GG Org Light Brown Sugar 6ct-1.5lb',  cases: 8604,  wk: 717,  abc: 'B', cell: 'R30-C03-B', pct: 18.7, lines: 145 },
  { rank: 3, sku: '62004', name: 'GG Org Powdered Sugar 6ct-1lb',       cases: 6516,  wk: 543,  abc: 'B', cell: 'R30-C05-B', pct: 14.1, lines: 164 },
  { rank: 4, sku: '62106', name: 'GG Org Coconut Palm Sugar 6ct-1lb',   cases: 4428,  wk: 369,  abc: 'C', cell: 'R30-C07-B', pct: 9.6,  lines: 189 },
  { rank: 5, sku: '62231', name: 'GG Org Light Agave 6ct-23.5oz',       cases: 4128,  wk: 344,  abc: 'C', cell: 'R30-C09-B', pct: 8.9,  lines: 194 },
  { rank: 6, sku: '62432', name: 'GG Org Sugar 6ct-4lb',                cases: 3348,  wk: 279,  abc: 'C', cell: 'R30-C11-B', pct: 7.3,  lines: 168 },
  { rank: 7, sku: '62232', name: 'GG Org Raw Agave 6ct-23.5oz',         cases: 1572,  wk: 131,  abc: 'C', cell: 'R30-C13-B', pct: 3.4,  lines: 179 },
];

let cum = 0;
export const paretoData = skus.map(s => { cum += s.pct; return { ...s, cumulative: parseFloat(cum.toFixed(1)) }; });

// ── Cycle time activities (from presentation slide 18) ────────────
// Printer walk RETAINED (printer relocates eventually, but baseline = same)
// Note: deck shows printer walk 4.35 → 4.35 (NVA waste retained because the
// printer is in the wrong place geometrically — relocating it is the
// proposed fix but the *time cost* stays modeled at 4.35 for conservatism).
export const activities = [
  { name: 'Printer Walk',      cat: 'NVA', current: 4.35,  proposed: 4.35, status: 'RETAINED'   },
  { name: 'Redo Picks',        cat: 'NVA', current: 14.22, proposed: 0.00, status: 'ELIMINATED' },
  { name: 'Alt. Picklist',     cat: 'NVA', current: 0.78,  proposed: 0.00, status: 'ELIMINATED' },
  { name: 'Pallet Gathering',  cat: 'NEC', current: 2.19,  proposed: 1.30, status: 'IMPROVED'   },
  { name: 'Stretch Wrap',      cat: 'VA',  current: 5.89,  proposed: 1.25, status: 'IMPROVED'   },
  { name: 'Case Building',     cat: 'VA',  current: 5.89,  proposed: 5.89, status: 'RETAINED'   },
];

// Headline cycle (locked from defense deck slide 25)
export const headlineCycle = {
  current: 27.43,
  future: 11.54,
  reduction: 58,
  savings: 15.89,  // 27.43 − 11.54
};

const sumBy = (arr, key, filter) => arr.filter(filter).reduce((a, x) => a + x[key], 0);
export const nvaCurrent  = sumBy(activities, 'current',  x => x.cat === 'NVA');   // 19.35
export const nvaProposed = sumBy(activities, 'proposed', x => x.cat === 'NVA');   //  4.35
export const necCurrent  = sumBy(activities, 'current',  x => x.cat === 'NEC');   //  2.19
export const necProposed = sumBy(activities, 'proposed', x => x.cat === 'NEC');   //  1.30
export const vaCurrent   = sumBy(activities, 'current',  x => x.cat === 'VA');    // 11.78
export const vaProposed  = sumBy(activities, 'proposed', x => x.cat === 'VA');    //  7.14
export const totalCurrent  = nvaCurrent + necCurrent + vaCurrent;                 // 33.32
export const totalProposed = nvaProposed + necProposed + vaProposed;              // 12.79

// ── Travel distances (from presentation, per SKU) ─────────────────
// Forklift: 318 → 20 ft per SKU retrieval (the headline metric)
// Team Lead printer walk: 459 ft (NVA, retained as waste in baseline)
// Case Picker: not separately broken out in deck — kept as inferred from cell layout
export const travel = [
  { role: 'Forklift Driver', current: 318, proposed: 20, note: 'Per-SKU retrieval. ±66 → ±4 ft (SD). Adjacent racks.' },
  { role: 'Team Lead',       current: 459, proposed: 459, note: 'Printer walk. NVA retained — printer relocation modeled separately.' },
  { role: 'Case Picker',     current: 130, proposed: 25,  note: 'Build-station-to-cell. Within 25-ft staging cluster.' },
];

// Spatial clustering improvement (from slide 18)
export const spatial = {
  sdCurrent: 66,
  sdProposed: 12,
  sdImprovement: 82,           // %
  annualMilesSaved: 203,       // 3,968 batches × 270 ft saved
};

// ── Weekly trend (illustrative; 12-week observation period) ──────
export const weeklyTrend = [
  { week: 'W1',  cases: 3520, lines: 102, orders: 14, nva: 19.4 },
  { week: 'W2',  cases: 3920, lines: 112, orders: 15, nva: 19.1 },
  { week: 'W3',  cases: 4180, lines: 108, orders: 16, nva: 19.5 },
  { week: 'W4',  cases: 3650, lines: 98,  orders: 13, nva: 19.2 },
  { week: 'W5',  cases: 4230, lines: 124, orders: 17, nva: 19.8 },
  { week: 'W6',  cases: 3890, lines: 110, orders: 14, nva: 19.3 },
  { week: 'W7',  cases: 3760, lines: 102, orders: 13, nva: 19.5 },
  { week: 'W8',  cases: 3680, lines: 98,  orders: 13, nva: 19.2 },
  { week: 'W9',  cases: 3776, lines: 97,  orders: 13, nva: 19.4 },
  { week: 'W10', cases: 3810, lines: 104, orders: 14, nva: 19.3 },
  { week: 'W11', cases: 3920, lines: 110, orders: 15, nva: 19.4 },
  { week: 'W12', cases: 3804, lines: 156, orders: 18, nva: 19.5 },
];

// ── Order metrics (from presentation slide 3) ─────────────────────
export const orderMetrics = {
  totalCases: 46140,           // 3,845/wk × 12 wk
  orderLines: 1221,
  salesOrders: 165,            // CORRECTED from 229
  avgPerOrder: 280,            // 46,140 ÷ 165
  casesPerWeek: 3845,
  batchesPerWeek: 76,
  batchesPerYear: 3968,
};

// ── Capacity (Design B: R30 Target only, R31 Amazon only) ─────────
export const capacity = {
  total: 256,
  perRack: 128,
  targetActive: 14,            // 7 SKUs × 2 pallets = R30 only
  amazonActive: 50,            // 25 SKUs × 2 pallets = R31 (per deck)
  reserved: 192,               // 256 − 14 − 50
  utilization: 25.0,           // (14 + 50) / 256
  freeColsR30: 9,              // R30 has 16 cols, 7 used → 9 free for Target growth
};

// ── Financials (from presentation slides 23, 25) ─────────────────
export const financials = {
  capex: 13300,                // $13.3K total
  capexBreakdown: [
    { item: 'Lantech Q-300 wrap machine',     cost: 10000 },
    { item: 'Rack relocation labor (~50 hr)', cost: 2500  },
    { item: 'Floor tape, signage, training',  cost: 500   },
    { item: 'Zebra ZD420 thermal printer',    cost: 300   },
  ],
  annualSavings: 49600,        // $49.6K
  paybackMonths: 3.2,
  hoursRecovered: 992,         // per year
  laborRate: 50,               // $/hr loaded
  netYear1: 36300,
  netYear3: 135500,
  netYear5: 234700,
};

// ── KPI targets (from presentation slide 24) ─────────────────────
export const kpis = [
  { name: 'NVA Time per Batch',       current: '19.35 min', future: '4.35 min',  target: '< 5 min'    },
  { name: 'Total Cycle Time',         current: '27.43 min', future: '11.54 min', target: '< 12 min'   },
  { name: 'FIFO Compliance Rate',     current: '~90%',      future: '100%',      target: '100% audited' },
  { name: 'Avg Travel Distance/SKU',  current: '318 ft',    future: '20 ft',     target: '< 30 ft'    },
];

// ── Team members ──────────────────────────────────────────────────
export const teamMembers = [
  { name: 'Alexandra Bayona',     role: 'Team Member',                          focus: 'Capstone deliverables and analysis' },
  { name: 'David S. Cao',         role: 'Team Member',                          focus: 'Capstone deliverables and analysis' },
  { name: 'Luqman Ismat',         role: 'Project Lead · Documentation Owner',  focus: 'Documentation, dashboards, integration' },
  { name: 'Paola Salinas Gil',    role: 'Team Member',                          focus: 'Capstone deliverables and analysis' },
  { name: 'Tsiyon Tadese',        role: 'Team Member',                          focus: 'Capstone deliverables and analysis' },
];

// ── Deliverables (downloadable) ───────────────────────────────────
export const deliverables = [
  {
    category: 'Documentation',
    items: [
      { name: 'Documentation Guide',          file: 'Documentation_Guide.docx',                 desc: 'Locked baseline documentation guide aligned to final presentation' },
      { name: 'SOP — Team Lead',              file: 'SOP_-_Team_Lead.docx',                    desc: 'Standard operating procedure for the Team Lead role' },
      { name: 'SOP — Case Picker',            file: 'SOP_-_Case_Picker.docx',                  desc: 'Standard operating procedure for the Case Picker role' },
      { name: 'SOP — Forklift Driver',        file: 'SOP_-_Forklift_Driver.docx',              desc: 'Standard operating procedure for the Forklift Driver role' },
    ],
  },
  {
    category: 'Diagrams',
    items: [
      { name: 'Cell Layout (proposed)',       file: 'Cell_Layout_v5.drawio',                    desc: 'Top-down floor plan with zones, cell assignments, role paths' },
      { name: 'Swimlane — Current State',     file: 'Current_Swimlane.png',                     desc: 'Current-state swimlane' },
      { name: 'Swimlane — Future State',      file: 'Future_Swimlane.png',                      desc: 'Future-state swimlane (78% NVA reduction)' },
      { name: 'Spaghetti Diagrams (7 SKUs)',  file: 'Spaghetti_Future_All_SKUs_v3.drawio',      desc: 'Per-SKU travel paths in the proposed state' },
      { name: 'All diagrams (master)',        file: 'All_Diagrams_v3.drawio',                   desc: '10-page master file containing all diagrams' },
    ],
  },
  {
    category: 'Data & Analysis',
    items: [
      { name: 'Operations Dashboard (xlsx)',  file: 'Cadeco_Dashboard_v3.xlsx',                 desc: '17-sheet self-updating dashboard — Pareto, NVA, capacity, travel' },
      { name: 'Rack Layout & SKU Analysis',   file: 'RackLayout_3_Designs_and_SKU_Analysis.xlsx', desc: '3 candidate designs (A/B/C) with weighted decision matrix' },
    ],
  },
  {
    category: 'Presentation',
    items: [
      { name: 'Final Presentation (pptx)',    file: 'INDE_4334_-_Cadeco_Industries_-_Capstone_Presentation.pptx', desc: '34-slide defense deck — May 5, 2026' },
    ],
  },
];
