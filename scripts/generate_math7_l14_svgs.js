const fs = require('fs');
const path = require('path');

const SVG_DIR = path.resolve(__dirname, '../frontend/public/images/geometry');
fs.mkdirSync(SVG_DIR, { recursive: true });

function wrapSvg(title, desc, innerContent) {
  const safeTitle = String(title).replace(/&/g, '&amp;');
  const safeDesc = String(desc).replace(/&/g, '&amp;');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 320" width="100%" height="280" role="img" aria-labelledby="title desc">
  <title id="title">${safeTitle}</title>
  <desc id="desc">${safeDesc}</desc>
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080D1A"/>
      <stop offset="100%" stop-color="#0E1626"/>
    </linearGradient>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="540" height="320" rx="18" fill="url(#bgGrad)" stroke="#06B6D4" stroke-width="1.5" stroke-opacity="0.4"/>
${innerContent}
</svg>`;
}

// Helper: draw 1 or 2 perpendicular tick marks at midpoint of (x1,y1)-(x2,y2)
function tickMarks(x1, y1, x2, y2, count = 1, color = '#FBBF24') {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const ux = dx / len;
  const uy = dy / len;
  const half = 7;

  if (count === 1) {
    return `<line x1="${(mx - nx * half).toFixed(1)}" y1="${(my - ny * half).toFixed(1)}" x2="${(mx + nx * half).toFixed(1)}" y2="${(my + ny * half).toFixed(1)}" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>`;
  }
  if (count === 2) {
    const gap = 3.5;
    const m1x = mx - ux * gap, m1y = my - uy * gap;
    const m2x = mx + ux * gap, m2y = my + uy * gap;
    return `<line x1="${(m1x - nx * half).toFixed(1)}" y1="${(m1y - ny * half).toFixed(1)}" x2="${(m1x + nx * half).toFixed(1)}" y2="${(m1y + ny * half).toFixed(1)}" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="${(m2x - nx * half).toFixed(1)}" y1="${(m2y - ny * half).toFixed(1)}" x2="${(m2x + nx * half).toFixed(1)}" y2="${(m2y + ny * half).toFixed(1)}" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  // cross tick (count === 'x')
  const r = 5;
  return `<line x1="${(mx - r).toFixed(1)}" y1="${(my - r).toFixed(1)}" x2="${(mx + r).toFixed(1)}" y2="${(my + r).toFixed(1)}" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="${(mx - r).toFixed(1)}" y1="${(my + r).toFixed(1)}" x2="${(mx + r).toFixed(1)}" y2="${(my - r).toFixed(1)}" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>`;
}

// Helper: draw angle arc inside vertex V toward P1 and P2
function angleArc(vx, vy, p1x, p1y, p2x, p2y, r = 24, color = '#F59E0B', fill = 'rgba(245,158,11,0.2)', doubleArc = false) {
  const a1 = Math.atan2(p1y - vy, p1x - vx);
  const a2 = Math.atan2(p2y - vy, p2x - vx);
  let diff = a2 - a1;
  while (diff <= -Math.PI) diff += 2 * Math.PI;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  const sweep = diff >= 0 ? 1 : 0;
  const sx = vx + r * Math.cos(a1);
  const sy = vy + r * Math.sin(a1);
  const ex = vx + r * Math.cos(a2);
  const ey = vy + r * Math.sin(a2);
  let out = `<path d="M ${vx} ${vy} L ${sx.toFixed(1)} ${sy.toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${ex.toFixed(1)} ${ey.toFixed(1)} Z" fill="${fill}" stroke="none"/>
  <path d="M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${color}" stroke-width="2.2"/>`;
  if (doubleArc) {
    const r2 = r + 5;
    const sx2 = vx + r2 * Math.cos(a1);
    const sy2 = vy + r2 * Math.sin(a1);
    const ex2 = vx + r2 * Math.cos(a2);
    const ey2 = vy + r2 * Math.sin(a2);
    out += `\n  <path d="M ${sx2.toFixed(1)} ${sy2.toFixed(1)} A ${r2} ${r2} 0 0 ${sweep} ${ex2.toFixed(1)} ${ey2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.8"/>`;
  }
  return out;
}

const svgs = {
  // 1. SAS Theorem
  math7_l14_sas_theorem: () => wrapSvg(
    "SAS Congruence Theorem",
    "Two congruent triangles ABC and A'B'C' showing Side-Angle-Side with included angle 60 deg",
    `  <rect x="110" y="14" width="320" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">THEOREM 2 · SIDE - ANGLE - SIDE (SAS)</text>

  <!-- Triangle ABC: A(65,245), B(235,245), C(130,115) -->
  ${angleArc(65, 245, 235, 245, 130, 115, 32, '#F59E0B', 'rgba(245,158,11,0.25)')}
  <polygon points="65,245 235,245 130,115" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.8" stroke-linejoin="round"/>
  ${tickMarks(65, 245, 235, 245, 1, '#34D399')}
  ${tickMarks(65, 245, 130, 115, 2, '#FBBF24')}
  <circle cx="65" cy="245" r="4.5" fill="#22D3EE"/><text x="50" y="260" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="235" cy="245" r="4.5" fill="#22D3EE"/><text x="242" y="260" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="130" cy="115" r="4.5" fill="#22D3EE"/><text x="130" y="100" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">C</text>
  <text x="106" y="226" fill="#FBBF24" font-family="monospace" font-size="12" font-weight="bold">60°</text>
  <text x="150" y="266" fill="#34D399" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">4 cm</text>
  <text x="56" y="175" fill="#FBBF24" font-family="monospace" font-size="12" font-weight="bold">3 cm</text>

  <!-- Congruence symbol -->
  <text x="276" y="190" fill="#34D399" font-family="system-ui" font-size="22" font-weight="bold" text-anchor="middle">=</text>

  <!-- Triangle A'B'C': A'(305,245), B'(475,245), C'(370,115) -->
  ${angleArc(305, 245, 475, 245, 370, 115, 32, '#F59E0B', 'rgba(245,158,11,0.25)')}
  <polygon points="305,245 475,245 370,115" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.8" stroke-linejoin="round"/>
  ${tickMarks(305, 245, 475, 245, 1, '#34D399')}
  ${tickMarks(305, 245, 370, 115, 2, '#FBBF24')}
  <circle cx="305" cy="245" r="4.5" fill="#34D399"/><text x="290" y="260" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A'</text>
  <circle cx="475" cy="245" r="4.5" fill="#34D399"/><text x="482" y="260" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B'</text>
  <circle cx="370" cy="115" r="4.5" fill="#34D399"/><text x="370" y="100" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">C'</text>
  <text x="346" y="226" fill="#FBBF24" font-family="monospace" font-size="12" font-weight="bold">60°</text>
  <text x="390" y="266" fill="#34D399" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">4 cm</text>
  <text x="296" y="175" fill="#FBBF24" font-family="monospace" font-size="12" font-weight="bold">3 cm</text>

  <text x="270" y="297" fill="#94A3B8" font-family="system-ui" font-size="12" text-anchor="middle">Included angle lies BETWEEN the two equal sides → △ABC = △A'B'C' (SAS)</text>`
  ),

  // 2. SAS vs SSA Trap (modeled on SGK H.4.29)
  math7_l14_sas_vs_ssa_trap: () => wrapSvg(
    "SAS vs Non-Included Angle Trap",
    "Four triangles comparing included angle (SAS) vs non-included angle (SSA)",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SENSOR SCAN · INCLUDED ANGLE CHECK (SAS)</text>

  <!-- 1. △ABC: A(35,145), B(110,75), C(145,145). AB=1 tick, AC=2 ticks, angle A included -->
  ${angleArc(35, 145, 145, 145, 110, 75, 22, '#38BDF8', 'rgba(56,189,248,0.22)')}
  <polygon points="35,145 110,75 145,145" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.4"/>
  ${tickMarks(35, 145, 110, 75, 1, '#FBBF24')}
  ${tickMarks(35, 145, 145, 145, 2, '#34D399')}
  <text x="24" y="152" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">A</text>
  <text x="110" y="66" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">B</text>
  <text x="151" y="152" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">C</text>

  <!-- 2. △FED: F(180,82), E(245,92), D(265,145). FE=1 tick, ED=2 ticks, angle D NOT included! -->
  ${angleArc(265, 145, 180, 82, 245, 92, 24, '#38BDF8', 'rgba(56,189,248,0.22)')}
  <polygon points="180,82 245,92 265,145" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.4"/>
  ${tickMarks(180, 82, 245, 92, 1, '#FBBF24')}
  ${tickMarks(245, 92, 265, 145, 2, '#34D399')}
  <text x="168" y="84" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">F</text>
  <text x="252" y="85" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">E</text>
  <text x="272" y="155" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">D</text>

  <!-- 3. △MNP: M(300,145), N(385,145), P(385,72). MN=1 tick, MP=2 ticks, angle N NOT included! -->
  ${angleArc(385, 145, 385, 72, 300, 145, 20, '#38BDF8', 'rgba(56,189,248,0.22)')}
  <polygon points="300,145 385,145 385,72" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.4"/>
  ${tickMarks(300, 145, 385, 145, 1, '#FBBF24')}
  ${tickMarks(300, 145, 385, 72, 2, '#34D399')}
  <text x="288" y="154" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">M</text>
  <text x="392" y="155" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">N</text>
  <text x="385" y="64" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">P</text>

  <!-- 4. △GHK -->
  ${angleArc(310, 268, 230, 195, 120, 268, 24, '#38BDF8', 'rgba(56,189,248,0.22)')}
  <polygon points="120,268 230,195 310,268" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.4"/>
  ${tickMarks(230, 195, 310, 268, 1, '#FBBF24')}
  ${tickMarks(120, 268, 310, 268, 2, '#34D399')}
  <text x="106" y="274" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">K</text>
  <text x="230" y="185" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">H</text>
  <text x="319" y="274" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">G</text>

  <!-- Summary note box -->
  <rect x="345" y="195" width="165" height="75" rx="10" fill="rgba(15,23,42,0.85)" stroke="#38BDF8" stroke-width="1"/>
  <text x="427" y="218" fill="#38BDF8" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">Check Included Angle:</text>
  <text x="427" y="238" fill="#E2E8F0" font-family="monospace" font-size="11" text-anchor="middle">1-tick &amp; 2-tick sides</text>
  <text x="427" y="255" fill="#FBBF24" font-family="monospace" font-size="11" text-anchor="middle">must hug the arc!</text>`
  ),

  // 3. Kite SAS (SGK H.4.30)
  math7_l14_kite_sas: () => wrapSvg(
    "Kite Common Side SAS",
    "Quadrilateral ABCD with diagonal AC, AB=AD, angle BAC=angle DAC",
    `  <rect x="115" y="14" width="310" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">MODEL 1 · SHARED SIDE AC (SAS)</text>

  <!-- A(110,165), B(230,75), C(430,165), D(230,255) -->
  ${angleArc(110, 165, 230, 75, 430, 165, 32, '#F59E0B', 'rgba(245,158,11,0.22)')}
  ${angleArc(110, 165, 430, 165, 230, 255, 32, '#F59E0B', 'rgba(245,158,11,0.22)')}
  <polygon points="110,165 230,75 430,165 230,255" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.8" stroke-linejoin="round"/>
  <line x1="110" y1="165" x2="430" y2="165" stroke="#34D399" stroke-width="2.5" stroke-dasharray="6,4"/>
  ${tickMarks(110, 165, 230, 75, 1, '#FBBF24')}
  ${tickMarks(110, 165, 230, 255, 1, '#FBBF24')}
  <circle cx="110" cy="165" r="4.5" fill="#22D3EE"/><text x="90" y="170" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="230" cy="75" r="4.5" fill="#22D3EE"/><text x="230" y="61" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">B</text>
  <circle cx="430" cy="165" r="4.5" fill="#22D3EE"/><text x="444" y="170" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <circle cx="230" cy="255" r="4.5" fill="#22D3EE"/><text x="230" y="278" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">D</text>
  <text x="295" y="156" fill="#34D399" font-family="monospace" font-size="12" font-weight="bold">AC (common)</text>`
  ),

  // 4. Angle Sum + SAS (SGK H.4.31)
  math7_l14_angle_sum_sas: () => wrapSvg(
    "Angle Sum + SAS",
    "Triangles ABC and MNP where angle M is found by 180 minus 50 minus 70",
    `  <rect x="105" y="14" width="330" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">ANGLE SUM + SAS TELEMETRY</text>

  <!-- △ABC: A(65,245), B(150,95), C(225,245) -->
  ${angleArc(65, 245, 225, 245, 150, 95, 28, '#38BDF8', 'rgba(56,189,248,0.22)')}
  <polygon points="65,245 150,95 225,245" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.6"/>
  ${tickMarks(65, 245, 150, 95, 2, '#FBBF24')}
  ${tickMarks(65, 245, 225, 245, 1, '#34D399')}
  <circle cx="65" cy="245" r="4" fill="#22D3EE"/><text x="48" y="253" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="150" cy="95" r="4" fill="#22D3EE"/><text x="150" y="80" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">B</text>
  <circle cx="225" cy="245" r="4" fill="#22D3EE"/><text x="235" y="253" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <text x="102" y="232" fill="#38BDF8" font-family="monospace" font-size="12" font-weight="bold">60°</text>

  <!-- △MNP: M(305,245), N(390,95), P(465,245) -->
  ${angleArc(390, 95, 305, 245, 465, 245, 25, '#F59E0B', 'rgba(245,158,11,0.22)')}
  ${angleArc(465, 245, 390, 95, 305, 245, 25, '#34D399', 'rgba(52,211,153,0.22)')}
  <polygon points="305,245 390,95 465,245" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.6"/>
  ${tickMarks(305, 245, 390, 95, 2, '#FBBF24')}
  ${tickMarks(305, 245, 465, 245, 1, '#34D399')}
  <circle cx="305" cy="245" r="4" fill="#34D399"/><text x="288" y="253" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">M</text>
  <circle cx="390" cy="95" r="4" fill="#34D399"/><text x="390" y="80" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">N</text>
  <circle cx="465" cy="245" r="4" fill="#34D399"/><text x="475" y="253" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">P</text>
  <text x="390" y="138" fill="#FBBF24" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">50°</text>
  <text x="428" y="232" fill="#34D399" font-family="monospace" font-size="12" font-weight="bold">70°</text>`
  ),

  // 5. Collinear Segment Addition SAS (SGK H.4.32)
  math7_l14_collinear_vandung: () => wrapSvg(
    "Collinear Base Segment Addition",
    "Triangle OAD with points B and C on AD, OA=OD, AB=CD, angle OAB=angle ODC",
    `  <rect x="100" y="14" width="340" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SEGMENT ADDITION · △OAC = △ODB</text>

  <!-- O(270,82), A(85,250), B(175,250), C(365,250), D(455,250) -->
  ${angleArc(85, 250, 455, 250, 270, 82, 28, '#F59E0B', 'rgba(245,158,11,0.22)')}
  ${angleArc(455, 250, 270, 82, 85, 250, 28, '#F59E0B', 'rgba(245,158,11,0.22)')}
  <polygon points="270,82 85,250 455,250" fill="rgba(56,189,248,0.08)" stroke="#38BDF8" stroke-width="2.6"/>
  <line x1="270" y1="82" x2="175" y2="250" stroke="#94A3B8" stroke-width="2"/>
  <line x1="270" y1="82" x2="365" y2="250" stroke="#94A3B8" stroke-width="2"/>
  ${tickMarks(270, 82, 85, 250, 1, '#34D399')}
  ${tickMarks(270, 82, 455, 250, 1, '#34D399')}
  ${tickMarks(85, 250, 175, 250, 'x', '#FBBF24')}
  ${tickMarks(365, 250, 455, 250, 'x', '#FBBF24')}

  <circle cx="270" cy="82" r="4.5" fill="#22D3EE"/><text x="270" y="67" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">O</text>
  <circle cx="85" cy="250" r="4.5" fill="#22D3EE"/><text x="78" y="274" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="175" cy="250" r="4" fill="#22D3EE"/><text x="175" y="274" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">B</text>
  <circle cx="365" cy="250" r="4" fill="#22D3EE"/><text x="365" y="274" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">C</text>
  <circle cx="455" cy="250" r="4.5" fill="#22D3EE"/><text x="462" y="274" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">D</text>
  <text x="270" y="298" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">AB = CD ⇒ AC = AB + BC = CD + BC = DB</text>`
  ),

  // 6. ASA Theorem
  math7_l14_asa_theorem: () => wrapSvg(
    "ASA Congruence Theorem",
    "Two congruent triangles ABC and A'B'C' showing Angle-Side-Angle with BC = B'C' = 3 cm and angles 80 and 40 deg",
    `  <rect x="110" y="14" width="320" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">THEOREM 3 · ANGLE - SIDE - ANGLE (ASA)</text>

  <!-- △ABC: B(65,245), C(225,245), A(92,102) -->
  ${angleArc(65, 245, 225, 245, 92, 102, 26, '#38BDF8', 'rgba(56,189,248,0.25)')}
  ${angleArc(225, 245, 92, 102, 65, 245, 28, '#34D399', 'rgba(52,211,153,0.25)', true)}
  <polygon points="65,245 225,245 92,102" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.8" stroke-linejoin="round"/>
  ${tickMarks(65, 245, 225, 245, 1, '#FBBF24')}
  <circle cx="92" cy="102" r="4.5" fill="#22D3EE"/><text x="92" y="88" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="65" cy="245" r="4.5" fill="#22D3EE"/><text x="48" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="225" cy="245" r="4.5" fill="#22D3EE"/><text x="235" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <text x="95" y="224" fill="#38BDF8" font-family="monospace" font-size="12" font-weight="bold">80°</text>
  <text x="163" y="232" fill="#34D399" font-family="monospace" font-size="12" font-weight="bold">40°</text>
  <text x="145" y="268" fill="#FBBF24" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">3 cm</text>

  <text x="272" y="188" fill="#34D399" font-family="system-ui" font-size="22" font-weight="bold" text-anchor="middle">=</text>

  <!-- △A'B'C': B'(310,245), C'(470,245), A'(337,102) -->
  ${angleArc(310, 245, 470, 245, 337, 102, 26, '#38BDF8', 'rgba(56,189,248,0.25)')}
  ${angleArc(470, 245, 337, 102, 310, 245, 28, '#34D399', 'rgba(52,211,153,0.25)', true)}
  <polygon points="310,245 470,245 337,102" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.8" stroke-linejoin="round"/>
  ${tickMarks(310, 245, 470, 245, 1, '#FBBF24')}
  <circle cx="337" cy="102" r="4.5" fill="#34D399"/><text x="337" y="88" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">A'</text>
  <circle cx="310" cy="245" r="4.5" fill="#34D399"/><text x="291" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B'</text>
  <circle cx="470" cy="245" r="4.5" fill="#34D399"/><text x="480" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C'</text>
  <text x="340" y="224" fill="#38BDF8" font-family="monospace" font-size="12" font-weight="bold">80°</text>
  <text x="408" y="232" fill="#34D399" font-family="monospace" font-size="12" font-weight="bold">40°</text>
  <text x="390" y="268" fill="#FBBF24" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">3 cm</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="12" text-anchor="middle">Both equal angles MUST be adjacent to the equal side → △ABC = △A'B'C' (ASA)</text>`
  ),

  // 7. ASA Four Triangles (SGK H.4.35)
  math7_l14_asa_four_triangles: () => wrapSvg(
    "ASA Four Triangles Comparison",
    "Four triangles ABC, HGK, MPN, FED with 50 deg and 70 deg angles and one 1-tick side",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">ASA SCANNER · WHICH PAIR IS CONGRUENT?</text>

  <!-- 1. △ABC: B(45,155), C(165,155), A(115,72). BC=1 tick, B=50, C=70 -->
  <polygon points="45,155 165,155 115,72" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.4"/>
  ${tickMarks(45, 155, 165, 155, 1, '#FBBF24')}
  <text x="33" y="162" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">B</text>
  <text x="171" y="162" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">C</text>
  <text x="115" y="64" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">A</text>
  <text x="66" y="146" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold">50°</text>
  <text x="134" y="146" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold">70°</text>

  <!-- 2. △HGK: G(205,155), K(325,155), H(265,68). GK=1 tick, H=50, K=70 -->
  <polygon points="205,155 325,155 265,68" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.4"/>
  ${tickMarks(205, 155, 325, 155, 1, '#FBBF24')}
  <text x="192" y="162" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">G</text>
  <text x="331" y="162" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">K</text>
  <text x="265" y="61" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">H</text>
  <text x="265" y="96" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">50°</text>
  <text x="292" y="146" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold">70°</text>

  <!-- 3. △MPN: P(365,155), N(485,155), M(415,72). PN=1 tick, P=70, N=50 -->
  <polygon points="365,155 485,155 415,72" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.4"/>
  ${tickMarks(365, 155, 485, 155, 1, '#FBBF24')}
  <text x="353" y="162" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">P</text>
  <text x="492" y="162" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">N</text>
  <text x="415" y="64" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">M</text>
  <text x="383" y="146" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold">70°</text>
  <text x="448" y="146" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold">50°</text>

  <!-- 4. △FED: E(190,275), D(330,275), F(260,192). ED=1 tick, E=50, F=70 -->
  <polygon points="190,275 330,275 260,192" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.4"/>
  ${tickMarks(190, 275, 330, 275, 1, '#FBBF24')}
  <text x="177" y="281" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">E</text>
  <text x="337" y="281" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">D</text>
  <text x="260" y="185" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">F</text>
  <text x="213" y="266" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold">50°</text>
  <text x="260" y="218" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">70°</text>

  <text x="270" y="304" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">Check which triangle has BOTH 50° and 70° adjacent to the 1-tick side!</text>`
  ),

  // 8. Bowtie ASA (SGK H.4.36)
  math7_l14_bowtie_asa: () => wrapSvg(
    "Bowtie Vertical Angles ASA",
    "Triangles ABC and DEC intersecting at C with AC=DC and angle A = angle D",
    `  <rect x="110" y="14" width="320" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">VERTICAL ANGLES BRIDGE · △ABC = △DEC (ASA)</text>

  <!-- A(75,92), B(335,92), C(270,175), D(465,258), E(205,258) -->
  ${angleArc(75, 92, 335, 92, 465, 258, 28, '#F59E0B', 'rgba(245,158,11,0.22)')}
  ${angleArc(465, 258, 205, 258, 75, 92, 28, '#F59E0B', 'rgba(245,158,11,0.22)')}
  ${angleArc(270, 175, 75, 92, 335, 92, 22, '#34D399', 'rgba(52,211,153,0.25)')}
  ${angleArc(270, 175, 465, 258, 205, 258, 22, '#34D399', 'rgba(52,211,153,0.25)')}

  <polygon points="75,92 335,92 270,175" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.6"/>
  <polygon points="465,258 205,258 270,175" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.6"/>
  ${tickMarks(75, 92, 270, 175, 1, '#FBBF24')}
  ${tickMarks(270, 175, 465, 258, 1, '#FBBF24')}

  <circle cx="75" cy="92" r="4.5" fill="#22D3EE"/><text x="58" y="95" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="335" cy="92" r="4.5" fill="#22D3EE"/><text x="345" y="95" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="270" cy="175" r="5" fill="#22D3EE" filter="url(#neonGlow)"/><text x="248" y="179" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <circle cx="205" cy="258" r="4.5" fill="#34D399"/><text x="188" y="264" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">E</text>
  <circle cx="465" cy="258" r="4.5" fill="#34D399"/><text x="475" y="264" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">D</text>
  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="12" text-anchor="middle">∠BCA = ∠ECD (vertical opposite angles) + AC = DC + ∠BAC = ∠EDC</text>`
  ),

  // 9. Kite ASA (SGK H.4.37)
  math7_l14_kite_asa: () => wrapSvg(
    "Kite Diagonal ASA",
    "Quadrilateral ABCD with diagonal BD, angle ABD = angle CBD and angle ADB = angle CDB",
    `  <rect x="115" y="14" width="310" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SHARED DIAGONAL BD · △ABD = △CBD (ASA)</text>

  <!-- B(270,70), A(145,155), D(270,270), C(395,155) -->
  ${angleArc(270, 70, 145, 155, 270, 270, 26, '#38BDF8', 'rgba(56,189,248,0.22)')}
  ${angleArc(270, 70, 270, 270, 395, 155, 26, '#38BDF8', 'rgba(56,189,248,0.22)')}
  ${angleArc(270, 270, 270, 70, 145, 155, 26, '#F59E0B', 'rgba(245,158,11,0.22)', true)}
  ${angleArc(270, 270, 395, 155, 270, 70, 26, '#F59E0B', 'rgba(245,158,11,0.22)', true)}

  <polygon points="270,70 145,155 270,270 395,155" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.6" stroke-linejoin="round"/>
  <line x1="270" y1="70" x2="270" y2="270" stroke="#34D399" stroke-width="2.5" stroke-dasharray="6,4"/>

  <circle cx="270" cy="70" r="4.5" fill="#22D3EE"/><text x="270" y="57" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">B</text>
  <circle cx="145" cy="155" r="4.5" fill="#22D3EE"/><text x="126" y="160" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="395" cy="155" r="4.5" fill="#22D3EE"/><text x="408" y="160" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <circle cx="270" cy="270" r="4.5" fill="#22D3EE"/><text x="270" y="292" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">D</text>
  <text x="282" y="165" fill="#34D399" font-family="monospace" font-size="11.5" font-weight="bold">BD common</text>`
  ),

  // 10. Quadrilateral with Diagonal BD (SGK H.4.39a)
  math7_l14_parallel_diag_sas: () => wrapSvg(
    "Diagonal BD Congruence SAS",
    "Quadrilateral ABCD with AB=DC and angle ABD = angle CDB",
    `  <rect x="115" y="14" width="310" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SHARED DIAGONAL · △ABD = △CDB (SAS)</text>

  <!-- A(120,90), B(360,90), D(180,250), C(420,250) -->
  ${angleArc(360, 90, 120, 90, 180, 250, 28, '#F59E0B', 'rgba(245,158,11,0.22)')}
  ${angleArc(180, 250, 360, 90, 420, 250, 28, '#F59E0B', 'rgba(245,158,11,0.22)')}
  <polygon points="120,90 360,90 420,250 180,250" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.6" stroke-linejoin="round"/>
  <line x1="360" y1="90" x2="180" y2="250" stroke="#34D399" stroke-width="2.5" stroke-dasharray="6,4"/>
  ${tickMarks(120, 90, 360, 90, 1, '#FBBF24')}
  ${tickMarks(180, 250, 420, 250, 1, '#FBBF24')}

  <circle cx="120" cy="90" r="4.5" fill="#22D3EE"/><text x="102" y="92" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="360" cy="90" r="4.5" fill="#22D3EE"/><text x="372" y="92" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="420" cy="250" r="4.5" fill="#22D3EE"/><text x="432" y="256" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <circle cx="180" cy="250" r="4.5" fill="#22D3EE"/><text x="162" y="256" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">D</text>
  <text x="270" y="294" fill="#94A3B8" font-family="system-ui" font-size="12" text-anchor="middle">AB = DC, ∠ABD = ∠CDB (included), and BD is a common side</text>`
  ),

  // 11. Overlapping Triangles ASA (SGK H.4.41)
  math7_l14_overlapping_asa: () => wrapSvg(
    "Overlapping Triangles ASA",
    "Triangles ADE and BCE overlapping with AE=BE and angle A = angle B",
    `  <rect x="115" y="14" width="310" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">OVERLAPPING SENSORS · △ADE = △BCE (ASA)</text>

  <!-- A(185,100), B(355,100), D(75,245), C(465,245). Segments AC and BD meet at E(270,136) -->
  <!-- Wait: line A(185,100)-C(465,245): y = 100 + (145/280)*(x-185). At x=270: y = 100 + 0.518*85 = 144.
       line B(355,100)-D(75,245): symmetric! Meet at E(270,144)! -->
  ${angleArc(185, 100, 465, 245, 75, 245, 24, '#F59E0B', 'rgba(245,158,11,0.22)')}
  ${angleArc(355, 100, 465, 245, 75, 245, 24, '#F59E0B', 'rgba(245,158,11,0.22)')}
  <polygon points="185,100 75,245 270,144" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.6" stroke-linejoin="round"/>
  <polygon points="355,100 465,245 270,144" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.6" stroke-linejoin="round"/>
  <line x1="185" y1="100" x2="465" y2="245" stroke="#94A3B8" stroke-width="2"/>
  <line x1="355" y1="100" x2="75" y2="245" stroke="#94A3B8" stroke-width="2"/>
  ${tickMarks(185, 100, 270, 144, 1, '#FBBF24')}
  ${tickMarks(355, 100, 270, 144, 1, '#FBBF24')}

  <circle cx="185" cy="100" r="4.5" fill="#22D3EE"/><text x="180" y="84" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="355" cy="100" r="4.5" fill="#34D399"/><text x="360" y="84" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">B</text>
  <circle cx="270" cy="144" r="5" fill="#22D3EE" filter="url(#neonGlow)"/><text x="270" y="172" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">E</text>
  <circle cx="75" cy="245" r="4.5" fill="#22D3EE"/><text x="60" y="256" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">D</text>
  <circle cx="465" cy="245" r="4.5" fill="#34D399"/><text x="476" y="256" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <text x="270" y="294" fill="#94A3B8" font-family="system-ui" font-size="12" text-anchor="middle">AE = BE, ∠DAE = ∠CBE, and vertical angles ∠AED = ∠BEC</text>`
  ),

  // 12. Parallel Bowtie with G-E-H (SGK H.4.42)
  math7_l14_parallel_bowtie_gh: () => wrapSvg(
    "Parallel Segments AB || CD with G-E-H",
    "Parallel equal segments AB and CD, AD and BC meet at E, G on AB and H on CD collinear with E",
    `  <rect x="105" y="14" width="330" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">PARALLEL TRUSS · AB ∥ CD &amp; AB = CD</text>

  <!-- A(140,80), B(400,80), C(140,260), D(400,260) -> E(270,170).
       Let G(225,80) on AB, then line G-E extends to H(315,260) on CD!
       Verify: midpoint of (225,80) and (315,260) is (270,170) = E! Exact collinearity! -->
  <line x1="140" y1="80" x2="400" y2="80" stroke="#38BDF8" stroke-width="2.8"/>
  <line x1="140" y1="260" x2="400" y2="260" stroke="#38BDF8" stroke-width="2.8"/>
  <line x1="140" y1="80" x2="400" y2="260" stroke="#94A3B8" stroke-width="2.4"/>
  <line x1="400" y1="80" x2="140" y2="260" stroke="#94A3B8" stroke-width="2.4"/>
  <line x1="225" y1="80" x2="315" y2="260" stroke="#34D399" stroke-width="2.4" stroke-dasharray="5,4"/>
  ${tickMarks(140, 80, 400, 80, 1, '#FBBF24')}
  ${tickMarks(140, 260, 400, 260, 1, '#FBBF24')}

  <circle cx="140" cy="80" r="4.5" fill="#22D3EE"/><text x="122" y="84" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="225" cy="80" r="4.5" fill="#34D399"/><text x="225" y="66" fill="#34D399" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">G</text>
  <circle cx="400" cy="80" r="4.5" fill="#22D3EE"/><text x="412" y="84" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="270" cy="170" r="5" fill="#22D3EE" filter="url(#neonGlow)"/><text x="247" y="174" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">E</text>
  <circle cx="140" cy="260" r="4.5" fill="#22D3EE"/><text x="122" y="264" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <circle cx="315" cy="260" r="4.5" fill="#34D399"/><text x="315" y="282" fill="#34D399" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">H</text>
  <circle cx="400" cy="260" r="4.5" fill="#22D3EE"/><text x="412" y="264" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">D</text>
  <text x="270" y="302" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">Alternate interior angles + ASA prove △ABE = △DCE and EG = EH</text>`
  ),

  // 13. Overlapping Base AB SAS (SBT H.4.24)
  math7_l14_overlapping_ab_sas: () => wrapSvg(
    "Shared Base AB Overlapping Triangles",
    "Triangles CAB and DBA sharing base AB with AC=BD and angle CAB = angle DBA",
    `  <rect x="115" y="14" width="310" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SHARED BASE AB · △CAB = △DBA (SAS)</text>

  <!-- A(110,240), B(430,240), C(175,95), D(365,95) -->
  ${angleArc(110, 240, 430, 240, 175, 95, 28, '#F59E0B', 'rgba(245,158,11,0.22)')}
  ${angleArc(430, 240, 365, 95, 110, 240, 28, '#F59E0B', 'rgba(245,158,11,0.22)')}
  <polygon points="110,240 430,240 175,95" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.5"/>
  <polygon points="110,240 430,240 365,95" fill="rgba(52,211,153,0.1)" stroke="#34D399" stroke-width="2.5"/>
  <line x1="110" y1="240" x2="430" y2="240" stroke="#E2E8F0" stroke-width="3"/>
  ${tickMarks(110, 240, 175, 95, 1, '#FBBF24')}
  ${tickMarks(430, 240, 365, 95, 1, '#FBBF24')}

  <circle cx="110" cy="240" r="4.5" fill="#22D3EE"/><text x="92" y="250" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="430" cy="240" r="4.5" fill="#22D3EE"/><text x="442" y="250" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="175" cy="95" r="4.5" fill="#38BDF8"/><text x="170" y="80" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">C</text>
  <circle cx="365" cy="95" r="4.5" fill="#34D399"/><text x="370" y="80" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">D</text>
  <text x="270" y="280" fill="#94A3B8" font-family="system-ui" font-size="12" text-anchor="middle">AC = BD, ∠CAB = ∠DBA, and AB is common ⇒ AD = BC</text>`
  ),

  // 14. Martian Crater Triangulation (ASA Real-World Application)
  math7_l14_crater_triangulation: () => wrapSvg(
    "Martian Crater ASA Triangulation",
    "Measuring crater width AB indirectly using ASA congruent triangle EDC",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SPACE SURVEYING · CRATER WIDTH VIA ASA</text>

  <!-- Crater ellipse between A(175,78) and B(175,180) -->
  <ellipse cx="170" cy="129" rx="68" ry="54" fill="rgba(244,63,94,0.12)" stroke="#FB7185" stroke-width="1.8" stroke-dasharray="4,4"/>
  <text x="133" y="132" fill="#FB7185" font-family="system-ui" font-size="10.5" font-weight="bold" text-anchor="middle">CRATER</text>

  <!-- Right angle squares at B and D -->
  <path d="M 175 166 L 189 166 L 189 180" fill="none" stroke="#38BDF8" stroke-width="2"/>
  <path d="M 415 194 L 401 194 L 401 180" fill="none" stroke="#34D399" stroke-width="2"/>

  <polygon points="175,78 175,180 295,180" fill="rgba(56,189,248,0.14)" stroke="#38BDF8" stroke-width="2.6"/>
  <polygon points="415,282 415,180 295,180" fill="rgba(52,211,153,0.14)" stroke="#34D399" stroke-width="2.6"/>
  ${tickMarks(175, 180, 295, 180, 1, '#FBBF24')}
  ${tickMarks(295, 180, 415, 180, 1, '#FBBF24')}

  <circle cx="175" cy="78" r="4.5" fill="#FB7185"/><text x="175" y="66" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="175" cy="180" r="4.5" fill="#22D3EE"/><text x="158" y="186" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold">B</text>
  <circle cx="295" cy="180" r="4.5" fill="#FBBF24"/><text x="295" y="168" fill="#FBBF24" font-family="system-ui" font-size="13.5" font-weight="bold" text-anchor="middle">C</text>
  <circle cx="415" cy="180" r="4.5" fill="#34D399"/><text x="428" y="184" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold">D</text>
  <circle cx="415" cy="282" r="4.5" fill="#34D399"/><text x="428" y="286" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold">E</text>

  <text x="235" y="206" fill="#FBBF24" font-family="monospace" font-size="11.5" font-weight="bold" text-anchor="middle">120 m</text>
  <text x="355" y="162" fill="#FBBF24" font-family="monospace" font-size="11.5" font-weight="bold" text-anchor="middle">120 m</text>
  <text x="432" y="236" fill="#34D399" font-family="monospace" font-size="11.5" font-weight="bold">85 m</text>
  <text x="270" y="305" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">Right angles at B, D + BC = DC + vertical ∠ACB = ∠ECD ⇒ AB = DE</text>`
  ),

  // 15. General Practice Model: M on AB (SGK H.4.43)
  math7_l14_luyentapchung_m: () => wrapSvg(
    "Chained ASA -> SAS Proof",
    "Point M on AB with C and D on opposite sides, angle BAC=BAD and angle ABC=ABD",
    `  <rect x="105" y="14" width="330" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">TWO-STAGE PROOF · ASA THEN SAS</text>

  <!-- A(105,165), M(215,165), B(435,165), C(290,72), D(290,258) -->
  ${angleArc(105, 165, 290, 72, 435, 165, 28, '#38BDF8', 'rgba(56,189,248,0.22)')}
  ${angleArc(105, 165, 435, 165, 290, 258, 28, '#38BDF8', 'rgba(56,189,248,0.22)')}
  ${angleArc(435, 165, 105, 165, 290, 72, 26, '#F59E0B', 'rgba(245,158,11,0.22)', true)}
  ${angleArc(435, 165, 290, 258, 105, 165, 26, '#F59E0B', 'rgba(245,158,11,0.22)', true)}

  <polygon points="105,165 290,72 435,165 290,258" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.6" stroke-linejoin="round"/>
  <line x1="105" y1="165" x2="435" y2="165" stroke="#E2E8F0" stroke-width="2.4"/>
  <line x1="215" y1="165" x2="290" y2="72" stroke="#34D399" stroke-width="2.2" stroke-dasharray="5,4"/>
  <line x1="215" y1="165" x2="290" y2="258" stroke="#34D399" stroke-width="2.2" stroke-dasharray="5,4"/>

  <circle cx="105" cy="165" r="4.5" fill="#22D3EE"/><text x="86" y="170" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="215" cy="165" r="4.5" fill="#34D399"/><text x="200" y="156" fill="#34D399" font-family="system-ui" font-size="14" font-weight="bold">M</text>
  <circle cx="435" cy="165" r="4.5" fill="#22D3EE"/><text x="448" y="170" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="290" cy="72" r="4.5" fill="#22D3EE"/><text x="290" y="59" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">C</text>
  <circle cx="290" cy="258" r="4.5" fill="#22D3EE"/><text x="290" y="280" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">D</text>
  <text x="270" y="302" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">Step 1: △ABC = △ABD (ASA) ⇒ AC = AD; Step 2: △AMC = △AMD (SAS)</text>`
  ),

  // 16. Medians SSS -> SAS Bridge (SBT H.4.29)
  math7_l14_medians_sas: () => wrapSvg(
    "Medians SSS -> SAS Bridge",
    "Triangles ABC and DEF with midpoints M of BC and N of EF, AB=DE, BC=EF, AM=DN",
    `  <rect x="105" y="14" width="330" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">MEDIAN BRIDGE · SSS THEN SAS</text>

  <!-- △ABC: A(115,82), B(55,245), M(145,245), C(235,245) -->
  <polygon points="115,82 55,245 235,245" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.6"/>
  <line x1="115" y1="82" x2="145" y2="245" stroke="#34D399" stroke-width="2.4" stroke-dasharray="5,4"/>
  ${tickMarks(115, 82, 55, 245, 'x', '#FBBF24')}
  ${tickMarks(115, 82, 145, 245, 2, '#34D399')}
  ${tickMarks(55, 245, 145, 245, 1, '#38BDF8')}
  ${tickMarks(145, 245, 235, 245, 1, '#38BDF8')}
  <circle cx="115" cy="82" r="4" fill="#22D3EE"/><text x="115" y="69" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="55" cy="245" r="4" fill="#22D3EE"/><text x="42" y="255" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="145" cy="245" r="4" fill="#34D399"/><text x="145" y="266" fill="#34D399" font-family="system-ui" font-size="13.5" font-weight="bold" text-anchor="middle">M</text>
  <circle cx="235" cy="245" r="4" fill="#22D3EE"/><text x="244" y="255" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>

  <!-- △DEF: D(365,82), E(305,245), N(395,245), F(485,245) -->
  <polygon points="365,82 305,245 485,245" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.6"/>
  <line x1="365" y1="82" x2="395" y2="245" stroke="#34D399" stroke-width="2.4" stroke-dasharray="5,4"/>
  ${tickMarks(365, 82, 305, 245, 'x', '#FBBF24')}
  ${tickMarks(365, 82, 395, 245, 2, '#34D399')}
  ${tickMarks(305, 245, 395, 245, 1, '#38BDF8')}
  ${tickMarks(395, 245, 485, 245, 1, '#38BDF8')}
  <circle cx="365" cy="82" r="4" fill="#34D399"/><text x="365" y="69" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">D</text>
  <circle cx="305" cy="245" r="4" fill="#34D399"/><text x="292" y="255" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">E</text>
  <circle cx="395" cy="245" r="4" fill="#34D399"/><text x="395" y="266" fill="#34D399" font-family="system-ui" font-size="13.5" font-weight="bold" text-anchor="middle">N</text>
  <circle cx="485" cy="245" r="4" fill="#34D399"/><text x="494" y="255" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">F</text>
  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">AB = DE, BC = EF, AM = DN ⇒ △ABM = △DEN (SSS) ⇒ ∠B = ∠E ⇒ △ABC = △DEF (SAS)</text>`
  )
};

let count = 0;
for (const [name, fn] of Object.entries(svgs)) {
  const filePath = path.join(SVG_DIR, `${name}.svg`);
  fs.writeFileSync(filePath, fn(), 'utf8');
  count++;
}
console.log(`✅ Generated ${count} Lesson 14 SVG diagrams in ${SVG_DIR}`);

