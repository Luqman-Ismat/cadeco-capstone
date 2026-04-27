// UH IE brand-aligned dark-theme palette
export const C = {
  bg:       '#0A0E1A',
  surface:  '#0F1422',
  surface2: '#161B2C',
  surface3: '#1F2538',
  border:   '#2A3147',
  borderL:  '#374161',
  ink:      '#F5F7FA',
  inkDim:   '#9BA3B5',
  muted:    '#6B7388',
  dim:      '#4A5168',
  // UH brand
  red:      '#C8102E',
  redDeep:  '#8B0F1F',
  redLight: '#E63950',
  redBg:    'rgba(200,16,46,0.08)',
  // Functional
  green:    '#00C896',
  greenBg:  'rgba(0,200,150,0.08)',
  amber:    '#FFB020',
  amberBg:  'rgba(255,176,32,0.10)',
  blue:     '#3B82F6',
  blueBg:   'rgba(59,130,246,0.10)',
  // ABC
  classA:   '#C8102E',
  classB:   '#FFB020',
  classC:   '#6B7388',
};

export const FONTS = {
  display: '"Fraunces", Georgia, serif',
  mono:    '"IBM Plex Mono", ui-monospace, monospace',
  body:    '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
};

export const fmt = (n, d = 0) => Number(n).toLocaleString('en-US', {
  minimumFractionDigits: d, maximumFractionDigits: d,
});
