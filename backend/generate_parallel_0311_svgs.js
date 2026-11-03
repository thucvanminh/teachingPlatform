// Script to generate high-contrast cosmic SVG diagrams for Keithley Lake Grade 7 Math (03/11/2026)
const fs = require('node:fs');
const path = require('node:path');

const targetDir = path.join(__dirname, '../frontend/public/images/geometry');
fs.mkdirSync(targetDir, { recursive: true });

function formatDeg(val) {
  if (!val) return '';
  return String(val).replace(/\s*deg\b/g, '°');
}

function renderT1(cfg) {
  const highlight = cfg.highlight || [];
  const labels = cfg.labels || {};
  const color = cfg.color || '#38bdf8';

  const arcDefs = {
    A1: { d: 'M 190 70 A 30 30 0 0 1 233 43', pos: [180, 52] },
    A2: { d: 'M 233 43 A 30 30 0 0 1 250 70', pos: [260, 52] },
    A3: { d: 'M 250 70 A 30 30 0 0 1 207 97', pos: [255, 102] },
    A4: { d: 'M 207 97 A 30 30 0 0 1 190 70', pos: [175, 102] },
    B1: { d: 'M 130 190 A 30 30 0 0 1 173 163', pos: [120, 172] },
    B2: { d: 'M 173 163 A 30 30 0 0 1 190 190', pos: [200, 172] },
    B3: { d: 'M 190 190 A 30 30 0 0 1 147 217', pos: [195, 222] },
    B4: { d: 'M 147 217 A 30 30 0 0 1 130 190', pos: [115, 222] },
  };

  let arcsSvg = '';
  for (const [key, item] of Object.entries(arcDefs)) {
    const isHl = highlight.includes(key);
    if (isHl) {
      arcsSvg += `<path d="${item.d}" fill="${color}33" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />\n`;
    }
  }

  let textSvg = '';
  for (const [key, item] of Object.entries(arcDefs)) {
    const isHl = highlight.includes(key);
    const labelText = labels[key];
    if (labelText) {
      const textColor = isHl ? '#fbbf24' : '#f1f5f9';
      textSvg += `<text x="${item.pos[0]}" y="${item.pos[1]}" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="${textColor}" text-anchor="middle">${formatDeg(labelText)}</text>\n`;
    }
  }

  return `<svg viewBox="0 0 400 260" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallel lines with transversal diagram">
  <defs>
    <linearGradient id="bg_t1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080d1a" />
      <stop offset="100%" stop-color="#0b132b" />
    </linearGradient>
  </defs>
  <rect width="400" height="260" rx="16" fill="url(#bg_t1)" />

  <!-- Base Lines a, b, c -->
  <line x1="40" y1="70" x2="360" y2="70" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
  <line x1="40" y1="190" x2="360" y2="190" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
  <line x1="245" y1="20" x2="135" y2="240" stroke="#c4b5fd" stroke-width="2.5" stroke-linecap="round" />

  <!-- Line Labels -->
  <text x="48" y="60" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#38bdf8">a</text>
  <text x="48" y="180" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#38bdf8">b</text>
  <text x="252" y="32" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#c4b5fd">c</text>

  <!-- Vertices -->
  <circle cx="220" cy="70" r="3.5" fill="#38bdf8" />
  <circle cx="160" cy="190" r="3.5" fill="#38bdf8" />
  <text x="212" y="58" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">A</text>
  <text x="152" y="178" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">B</text>

  <!-- Arcs & Labels -->
  ${arcsSvg}
  ${textSvg}
  <text x="15" y="250" fill="#64748b" font-family="system-ui, sans-serif" font-size="10">SCHEMATIC · NOT TO SCALE</text>
</svg>`;
}

function renderT2(cfg) {
  const highlight = cfg.highlight || [];
  const labels = cfg.labels || {};
  const color = cfg.color || '#38bdf8';

  const mDefs = {
    M1: { d: 'M 228 70 A 25 25 0 0 1 245 46', pos: [224, 52] },
    M2: { d: 'M 245 46 A 25 25 0 0 1 278 70', pos: [282, 52] },
    M3: { d: 'M 278 70 A 25 25 0 0 1 261 94', pos: [286, 94] },
    M4: { d: 'M 261 94 A 25 25 0 0 1 228 70', pos: [228, 94] },
  };

  const nDefs = {
    N1: { d: 'M 272 190 A 25 25 0 0 1 289 166', pos: [268, 172] },
    N2: { d: 'M 289 166 A 25 25 0 0 1 322 190', pos: [326, 172] },
    N3: { d: 'M 322 190 A 25 25 0 0 1 305 214', pos: [330, 214] },
    N4: { d: 'M 305 214 A 25 25 0 0 1 272 190', pos: [272, 214] },
  };

  let arcsSvg = '';
  for (const [key, item] of Object.entries({ ...mDefs, ...nDefs })) {
    if (highlight.includes(key)) {
      arcsSvg += `<path d="${item.d}" fill="${color}33" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />\n`;
    }
  }

  let textSvg = '';
  for (const [key, item] of Object.entries({ ...mDefs, ...nDefs })) {
    if (labels[key]) {
      const isHl = highlight.includes(key);
      const textColor = isHl ? '#fbbf24' : '#f1f5f9';
      textSvg += `<text x="${item.pos[0]}" y="${item.pos[1]}" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="${textColor}" text-anchor="middle">${formatDeg(labels[key])}</text>\n`;
    }
  }

  return `<svg viewBox="0 0 400 260" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Perpendicular lines and transversal diagram">
  <defs>
    <linearGradient id="bg_t2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080d1a" />
      <stop offset="100%" stop-color="#0b132b" />
    </linearGradient>
  </defs>
  <rect width="400" height="260" rx="16" fill="url(#bg_t2)" />

  <!-- Base Lines a, b -->
  <line x1="30" y1="70" x2="370" y2="70" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
  <line x1="30" y1="190" x2="370" y2="190" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />

  <!-- Perpendicular Line c -->
  <line x1="110" y1="20" x2="110" y2="240" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" />
  <!-- Slanted Line d -->
  <line x1="235" y1="20" x2="315" y2="240" stroke="#c4b5fd" stroke-width="2.5" stroke-linecap="round" />

  <!-- Right angle squares -->
  <rect x="110" y="70" width="12" height="12" fill="none" stroke="#ef4444" stroke-width="1.8" />
  <rect x="110" y="178" width="12" height="12" fill="none" stroke="#ef4444" stroke-width="1.8" />

  <!-- Line Labels -->
  <text x="38" y="60" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#38bdf8">a</text>
  <text x="38" y="180" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#38bdf8">b</text>
  <text x="118" y="32" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#ef4444">c</text>
  <text x="242" y="32" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#c4b5fd">d</text>

  <!-- Vertices -->
  <text x="96" y="64" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">A</text>
  <text x="96" y="184" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">B</text>
  <text x="250" y="62" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">M</text>
  <text x="294" y="182" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">N</text>

  ${labels['A'] ? `<text x="135" y="65" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#fbbf24">${formatDeg(labels['A'])}</text>` : ''}
  ${labels['B'] ? `<text x="135" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#fbbf24">${formatDeg(labels['B'])}</text>` : ''}

  <!-- Arcs & Labels -->
  ${arcsSvg}
  ${textSvg}
  <text x="15" y="250" fill="#64748b" font-family="system-ui, sans-serif" font-size="10">SCHEMATIC · NOT TO SCALE</text>
</svg>`;
}

function renderT3(cfg) {
  const highlight = cfg.highlight || [];
  const labels = cfg.labels || {};
  const color = cfg.color || '#38bdf8';

  const arcDefs = {
    D1: { d: 'M 205 55 A 25 25 0 0 1 241 33', pos: [195, 42] },
    D2: { d: 'M 241 33 A 25 25 0 0 1 255 55', pos: [265, 42] },
    D3: { d: 'M 255 55 A 25 25 0 0 1 219 77', pos: [260, 80] },
    D4: { d: 'M 219 77 A 25 25 0 0 1 205 55', pos: [190, 80] },

    E1: { d: 'M 165 130 A 25 25 0 0 1 201 108', pos: [155, 117] },
    E2: { d: 'M 201 108 A 25 25 0 0 1 215 130', pos: [225, 117] },
    E3: { d: 'M 215 130 A 25 25 0 0 1 179 152', pos: [220, 155] },
    E4: { d: 'M 179 152 A 25 25 0 0 1 165 130', pos: [150, 155] },

    F1: { d: 'M 125 205 A 25 25 0 0 1 161 183', pos: [115, 192] },
    F2: { d: 'M 161 183 A 25 25 0 0 1 175 205', pos: [185, 192] },
    F3: { d: 'M 175 205 A 25 25 0 0 1 139 227', pos: [180, 230] },
    F4: { d: 'M 139 227 A 25 25 0 0 1 125 205', pos: [110, 230] },
  };

  let arcsSvg = '';
  for (const [key, item] of Object.entries(arcDefs)) {
    if (highlight.includes(key)) {
      arcsSvg += `<path d="${item.d}" fill="${color}33" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />\n`;
    }
  }

  let textSvg = '';
  for (const [key, item] of Object.entries(arcDefs)) {
    if (labels[key]) {
      const isHl = highlight.includes(key);
      const textColor = isHl ? '#fbbf24' : '#f1f5f9';
      textSvg += `<text x="${item.pos[0]}" y="${item.pos[1]}" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="${textColor}" text-anchor="middle">${formatDeg(labels[key])}</text>\n`;
    }
  }

  return `<svg viewBox="0 0 400 260" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three horizontal lines and transversal diagram">
  <defs>
    <linearGradient id="bg_t3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080d1a" />
      <stop offset="100%" stop-color="#0b132b" />
    </linearGradient>
  </defs>
  <rect width="400" height="260" rx="16" fill="url(#bg_t3)" />

  <!-- Base Lines x, y, z -->
  <line x1="40" y1="55" x2="360" y2="55" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
  <line x1="40" y1="130" x2="360" y2="130" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
  <line x1="40" y1="205" x2="360" y2="205" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />

  <!-- Transversal t -->
  <line x1="250" y1="15" x2="130" y2="245" stroke="#c4b5fd" stroke-width="2.5" stroke-linecap="round" />

  <!-- Line Labels -->
  <text x="48" y="47" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#38bdf8">x</text>
  <text x="48" y="122" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#38bdf8">y</text>
  <text x="48" y="197" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#38bdf8">z</text>
  <text x="255" y="27" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#c4b5fd">t</text>

  <!-- Vertices -->
  <circle cx="230" cy="55" r="3.5" fill="#38bdf8" />
  <circle cx="190" cy="130" r="3.5" fill="#38bdf8" />
  <circle cx="150" cy="205" r="3.5" fill="#38bdf8" />
  <text x="222" y="45" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">D</text>
  <text x="182" y="120" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">E</text>
  <text x="142" y="195" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">F</text>

  <!-- Arcs & Labels -->
  ${arcsSvg}
  ${textSvg}
  <text x="15" y="250" fill="#64748b" font-family="system-ui, sans-serif" font-size="10">SCHEMATIC · NOT TO SCALE</text>
</svg>`;
}

function renderT4(cfg) {
  const highlight = cfg.highlight || [];
  const labels = cfg.labels || {};
  const color = cfg.color || '#38bdf8';

  const arcDefs = {
    xAB: { d: 'M 170 65 A 30 30 0 0 1 183 89', pos: [145, 88] },
    yAC: { d: 'M 217 89 A 30 30 0 0 1 230 65', pos: [255, 88] },
    B: { d: 'M 125 170 A 35 35 0 0 1 135 205', pos: [135, 192] },
    C: { d: 'M 265 205 A 35 35 0 0 1 275 170', pos: [265, 192] },
  };

  let arcsSvg = '';
  for (const [key, item] of Object.entries(arcDefs)) {
    if (highlight.includes(key)) {
      arcsSvg += `<path d="${item.d}" fill="${color}33" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />\n`;
    }
  }

  let textSvg = '';
  for (const [key, item] of Object.entries(arcDefs)) {
    if (labels[key]) {
      const isHl = highlight.includes(key);
      const textColor = isHl ? '#fbbf24' : '#f1f5f9';
      textSvg += `<text x="${item.pos[0]}" y="${item.pos[1]}" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="${textColor}" text-anchor="middle">${formatDeg(labels[key])}</text>\n`;
    }
  }

  return `<svg viewBox="0 0 400 260" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with parallel line xy through A">
  <defs>
    <linearGradient id="bg_t4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080d1a" />
      <stop offset="100%" stop-color="#0b132b" />
    </linearGradient>
  </defs>
  <rect width="400" height="260" rx="16" fill="url(#bg_t4)" />

  <!-- Horizontal line xy through A(200, 65) -->
  <line x1="50" y1="65" x2="350" y2="65" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />

  <!-- Triangle ABC: A(200, 65), B(100, 205), C(300, 205) -->
  <polygon points="200,65 100,205 300,205" fill="#38bdf80f" stroke="#c4b5fd" stroke-width="2.5" stroke-linejoin="round" />

  <!-- Point dots -->
  <circle cx="200" cy="65" r="3.5" fill="#38bdf8" />
  <circle cx="100" cy="205" r="3.5" fill="#38bdf8" />
  <circle cx="300" cy="205" r="3.5" fill="#38bdf8" />

  <!-- Point labels -->
  <text x="200" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#f1f5f9" text-anchor="middle">A</text>
  <text x="85" y="215" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#f1f5f9">B</text>
  <text x="310" y="215" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#f1f5f9">C</text>

  <!-- Line xy labels -->
  <text x="55" y="55" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#38bdf8">x</text>
  <text x="345" y="55" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#38bdf8">y</text>

  <!-- Arcs & Labels -->
  ${arcsSvg}
  ${textSvg}
  <text x="15" y="250" fill="#64748b" font-family="system-ui, sans-serif" font-size="10">SCHEMATIC · NOT TO SCALE</text>
</svg>`;
}

function renderT5(cfg) {
  const highlight = cfg.highlight || [];
  const labels = cfg.labels || {};
  const color = cfg.color || '#ef4444';

  const arcDefs = {
    A4: { d: 'M 207 105 A 30 30 0 0 1 190 75', pos: [175, 105] },
    B2: { d: 'M 173 163 A 30 30 0 0 1 190 190', pos: [195, 172] },
  };

  let arcsSvg = '';
  for (const [key, item] of Object.entries(arcDefs)) {
    if (highlight.includes(key)) {
      arcsSvg += `<path d="${item.d}" fill="${color}33" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />\n`;
    }
  }

  let textSvg = '';
  for (const [key, item] of Object.entries(arcDefs)) {
    if (labels[key]) {
      const isHl = highlight.includes(key);
      const textColor = isHl ? '#fbbf24' : '#f1f5f9';
      textSvg += `<text x="${item.pos[0]}" y="${item.pos[1]}" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="${textColor}" text-anchor="middle">${formatDeg(labels[key])}</text>\n`;
    }
  }

  return `<svg viewBox="0 0 400 260" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Non-parallel lines cut by transversal">
  <defs>
    <linearGradient id="bg_t5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080d1a" />
      <stop offset="100%" stop-color="#0b132b" />
    </linearGradient>
  </defs>
  <rect width="400" height="260" rx="16" fill="url(#bg_t5)" />

  <!-- Tilted Line a (y1=55, y2=95) -->
  <line x1="40" y1="55" x2="360" y2="95" stroke="#f87171" stroke-width="2.5" stroke-linecap="round" />
  <!-- Horizontal Line b (y=190) -->
  <line x1="40" y1="190" x2="360" y2="190" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
  <!-- Transversal c -->
  <line x1="245" y1="20" x2="135" y2="240" stroke="#c4b5fd" stroke-width="2.5" stroke-linecap="round" />

  <!-- Line Labels -->
  <text x="48" y="50" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#f87171">a</text>
  <text x="48" y="180" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#38bdf8">b</text>
  <text x="252" y="32" font-family="system-ui, sans-serif" font-size="14" font-style="italic" font-weight="bold" fill="#c4b5fd">c</text>

  <!-- Vertices -->
  <circle cx="220" cy="77.5" r="3.5" fill="#f87171" />
  <circle cx="160" cy="190" r="3.5" fill="#38bdf8" />
  <text x="210" y="66" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">A</text>
  <text x="150" y="178" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#94a3b8">B</text>

  <!-- Arcs & Labels -->
  ${arcsSvg}
  ${textSvg}
  <text x="15" y="250" fill="#f87171" font-family="system-ui, sans-serif" font-size="10">SCHEMATIC · NOT TO SCALE</text>
</svg>`;
}

function renderSvg(cfg) {
  switch (cfg.template) {
    case 'T1_STANDARD': return renderT1(cfg);
    case 'T2_PERPENDICULAR_COMBO': return renderT2(cfg);
    case 'T3_THREE_LINES': return renderT3(cfg);
    case 'T4_TRIANGLE_PARALLEL': return renderT4(cfg);
    case 'T5_NON_PARALLEL': return renderT5(cfg);
    default: return renderT1(cfg);
  }
}

module.exports = { renderSvg };
