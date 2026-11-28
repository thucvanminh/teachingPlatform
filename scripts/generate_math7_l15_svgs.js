const fs = require('fs');
const path = require('path');

const SVG_DIR = path.resolve(__dirname, '../frontend/public/images/geometry');
fs.mkdirSync(SVG_DIR, { recursive: true });

function wrapSvg(title, desc, innerContent, vbWidth = 540, vbHeight = 320) {
  const safeTitle = String(title).replace(/&/g, '&amp;');
  const safeDesc = String(desc).replace(/&/g, '&amp;');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbWidth} ${vbHeight}" width="100%" height="280" role="img" aria-labelledby="title desc">
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
  <rect width="${vbWidth}" height="${vbHeight}" rx="18" fill="url(#bgGrad)" stroke="#06B6D4" stroke-width="1.5" stroke-opacity="0.4"/>
${innerContent}
</svg>`;
}

// Helper: draw 1, 2, 3 or 'x' perpendicular tick marks at midpoint or custom position along (x1,y1)-(x2,y2)
function tickMarks(x1, y1, x2, y2, count = 1, color = '#FBBF24', t = 0.5) {
  const mx = x1 + (x2 - x1) * t;
  const my = y1 + (y2 - y1) * t;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const ux = dx / len;
  const uy = dy / len;
  const half = 7;

  if (count === 1 || count === '|') {
    return `<line x1="${(mx - nx * half).toFixed(1)}" y1="${(my - ny * half).toFixed(1)}" x2="${(mx + nx * half).toFixed(1)}" y2="${(my + ny * half).toFixed(1)}" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>`;
  }
  if (count === 2 || count === '||' || count === '//') {
    const gap = 3.5;
    const m1x = mx - ux * gap, m1y = my - uy * gap;
    const m2x = mx + ux * gap, m2y = my + uy * gap;
    return `<line x1="${(m1x - nx * half).toFixed(1)}" y1="${(m1y - ny * half).toFixed(1)}" x2="${(m1x + nx * half).toFixed(1)}" y2="${(m1y + ny * half).toFixed(1)}" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="${(m2x - nx * half).toFixed(1)}" y1="${(m2y - ny * half).toFixed(1)}" x2="${(m2x + nx * half).toFixed(1)}" y2="${(m2y + ny * half).toFixed(1)}" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  if (count === 3 || count === '|||') {
    const gap = 4.0;
    const m1x = mx - ux * gap, m1y = my - uy * gap;
    const m3x = mx + ux * gap, m3y = my + uy * gap;
    return `<line x1="${(m1x - nx * half).toFixed(1)}" y1="${(m1y - ny * half).toFixed(1)}" x2="${(m1x + nx * half).toFixed(1)}" y2="${(m1y + ny * half).toFixed(1)}" stroke="${color}" stroke-width="2.0" stroke-linecap="round"/>
  <line x1="${(mx - nx * half).toFixed(1)}" y1="${(my - ny * half).toFixed(1)}" x2="${(mx + nx * half).toFixed(1)}" y2="${(my + ny * half).toFixed(1)}" stroke="${color}" stroke-width="2.0" stroke-linecap="round"/>
  <line x1="${(m3x - nx * half).toFixed(1)}" y1="${(m3y - ny * half).toFixed(1)}" x2="${(m3x + nx * half).toFixed(1)}" y2="${(m3y + ny * half).toFixed(1)}" stroke="${color}" stroke-width="2.0" stroke-linecap="round"/>`;
  }
  // cross tick (count === 'x')
  const r = 5.5;
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

// Helper: mathematically exact perpendicular square at any rotated right-angle vertex!
function rightAngleMark(vx, vy, p1x, p1y, p2x, p2y, size = 12, color = '#38BDF8', strokeWidth = 2) {
  const d1x = p1x - vx, d1y = p1y - vy;
  const len1 = Math.hypot(d1x, d1y) || 1;
  const u1x = d1x / len1, u1y = d1y / len1;

  const d2x = p2x - vx, d2y = p2y - vy;
  const len2 = Math.hypot(d2x, d2y) || 1;
  const u2x = d2x / len2, u2y = d2y / len2;

  const s1x = vx + u1x * size;
  const s1y = vy + u1y * size;
  const s2x = vx + u2x * size;
  const s2y = vy + u2y * size;
  const cx = s1x + u2x * size;
  const cy = s1y + u2y * size;

  return `<path d="M ${s1x.toFixed(1)} ${s1y.toFixed(1)} L ${cx.toFixed(1)} ${cy.toFixed(1)} L ${s2x.toFixed(1)} ${s2y.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
}

const svgs = {
  // 1. Four Cases Matrix
  math7_l15_four_cases_matrix: () => wrapSvg(
    "Four Right Triangle Congruence Criteria",
    "Matrix of 4 criteria: Leg-Leg (LL), Leg-Acute Angle (LA), Hypotenuse-Acute Angle (HA), Hypotenuse-Leg (HL)",
    `  <rect x="75" y="10" width="450" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="300" y="27" fill="#E2E8F0" font-family="system-ui" font-size="11.5" font-weight="bold" text-anchor="middle">CONGRUENCE CRITERIA FOR RIGHT TRIANGLES · 4 CORE CASES</text>

  <!-- Panel 1: LL (Leg - Leg) -->
  <rect x="20" y="44" width="270" height="126" rx="10" fill="rgba(15,23,42,0.6)" stroke="#38BDF8" stroke-width="1"/>
  <text x="32" y="62" fill="#38BDF8" font-family="system-ui" font-size="11" font-weight="bold">1. Leg - Leg (LL)</text>
  ${rightAngleMark(45, 142, 125, 142, 45, 82, 10, '#38BDF8')}
  <polygon points="45,142 125,142 45,82" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2"/>
  ${tickMarks(45, 142, 125, 142, 1, '#34D399')}
  ${tickMarks(45, 142, 45, 82, 2, '#FBBF24')}
  <text x="142" y="118" fill="#E2E8F0" font-family="system-ui" font-size="16" font-weight="bold">=</text>
  ${rightAngleMark(175, 142, 255, 142, 175, 82, 10, '#34D399')}
  <polygon points="175,142 255,142 175,82" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2"/>
  ${tickMarks(175, 142, 255, 142, 1, '#34D399')}
  ${tickMarks(175, 142, 175, 82, 2, '#FBBF24')}
  <text x="155" y="162" fill="#94A3B8" font-family="system-ui" font-size="9.5" text-anchor="middle">Two pairs of legs equal (SAS special)</text>

  <!-- Panel 2: LA (Leg - Adjacent Acute Angle) -->
  <rect x="310" y="44" width="270" height="126" rx="10" fill="rgba(15,23,42,0.6)" stroke="#38BDF8" stroke-width="1"/>
  <text x="322" y="62" fill="#38BDF8" font-family="system-ui" font-size="11" font-weight="bold">2. Leg - Acute Angle (LA)</text>
  ${rightAngleMark(335, 142, 415, 142, 335, 82, 10, '#38BDF8')}
  ${angleArc(415, 142, 335, 82, 335, 142, 16, '#F59E0B')}
  <polygon points="335,142 415,142 335,82" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2"/>
  ${tickMarks(335, 142, 415, 142, 1, '#34D399')}
  <text x="432" y="118" fill="#E2E8F0" font-family="system-ui" font-size="16" font-weight="bold">=</text>
  ${rightAngleMark(465, 142, 545, 142, 465, 82, 10, '#34D399')}
  ${angleArc(545, 142, 465, 82, 465, 142, 16, '#F59E0B')}
  <polygon points="465,142 545,142 465,82" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2"/>
  ${tickMarks(465, 142, 545, 142, 1, '#34D399')}
  <text x="445" y="162" fill="#94A3B8" font-family="system-ui" font-size="9.5" text-anchor="middle">Equal leg &amp; adjacent acute angle (ASA)</text>

  <!-- Panel 3: HA (Hypotenuse - Acute Angle) -->
  <rect x="20" y="178" width="270" height="126" rx="10" fill="rgba(15,23,42,0.6)" stroke="#38BDF8" stroke-width="1"/>
  <text x="32" y="196" fill="#F59E0B" font-family="system-ui" font-size="11" font-weight="bold">3. Hypotenuse - Acute Angle (HA)</text>
  ${rightAngleMark(45, 276, 125, 276, 45, 216, 10, '#38BDF8')}
  ${angleArc(125, 276, 45, 216, 45, 276, 16, '#F59E0B')}
  <polygon points="45,276 125,276 45,216" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2"/>
  ${tickMarks(125, 276, 45, 216, 2, '#38BDF8')}
  <text x="142" y="252" fill="#E2E8F0" font-family="system-ui" font-size="16" font-weight="bold">=</text>
  ${rightAngleMark(175, 276, 255, 276, 175, 216, 10, '#34D399')}
  ${angleArc(255, 276, 175, 216, 175, 276, 16, '#F59E0B')}
  <polygon points="175,276 255,276 175,216" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2"/>
  ${tickMarks(255, 276, 175, 216, 2, '#38BDF8')}
  <text x="155" y="296" fill="#94A3B8" font-family="system-ui" font-size="9.5" text-anchor="middle">Equal hypotenuse &amp; one acute angle</text>

  <!-- Panel 4: HL (Hypotenuse - Leg) -->
  <rect x="310" y="178" width="270" height="126" rx="10" fill="rgba(15,23,42,0.6)" stroke="#38BDF8" stroke-width="1"/>
  <text x="322" y="196" fill="#F59E0B" font-family="system-ui" font-size="11" font-weight="bold">4. Hypotenuse - Leg (HL)</text>
  ${rightAngleMark(335, 276, 415, 276, 335, 216, 10, '#38BDF8')}
  <polygon points="335,276 415,276 335,216" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2"/>
  ${tickMarks(335, 276, 335, 216, 1, '#FBBF24')}
  ${tickMarks(415, 276, 335, 216, 2, '#38BDF8')}
  <text x="432" y="252" fill="#E2E8F0" font-family="system-ui" font-size="16" font-weight="bold">=</text>
  ${rightAngleMark(465, 276, 545, 276, 465, 216, 10, '#34D399')}
  <polygon points="465,276 545,276 465,216" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2"/>
  ${tickMarks(465, 276, 465, 216, 1, '#FBBF24')}
  ${tickMarks(545, 276, 465, 216, 2, '#38BDF8')}
  <text x="445" y="296" fill="#94A3B8" font-family="system-ui" font-size="9.5" text-anchor="middle">Equal hypotenuse &amp; one leg (Special Case)</text>`,
    600, 320
  ),

  // 2. Poles & Shadows (LA / HA Application)
  math7_l15_poles_shadows: () => wrapSvg(
    "Solar Towers & Shadows LA Application",
    "Two vertical towers AB and A'B' with equal height, equal sun angles at top, producing equal ground shadows AC and A'C'",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SOLAR TOWERS &amp; SHADOWS · LA APPLICATION</text>

  <!-- Ground line -->
  <line x1="30" y1="245" x2="510" y2="245" stroke="#475569" stroke-width="2" stroke-dasharray="6,4"/>

  <!-- Tower 1: A(100,245), B(100,85), Shadow C(220,245) -->
  ${angleArc(100, 85, 100, 245, 220, 245, 26, '#F59E0B', 'rgba(245,158,11,0.25)')}
  ${rightAngleMark(100, 245, 220, 245, 100, 85, 14, '#38BDF8')}
  <polygon points="100,245 220,245 100,85" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.5"/>
  <line x1="100" y1="245" x2="100" y2="85" stroke="#38BDF8" stroke-width="3.5"/>
  <line x1="100" y1="245" x2="220" y2="245" stroke="#34D399" stroke-width="3.5"/>
  ${tickMarks(100, 245, 100, 85, 1, '#FBBF24')}

  <circle cx="100" cy="245" r="4.5" fill="#22D3EE"/><text x="85" y="258" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">A</text>
  <circle cx="100" cy="85" r="4.5" fill="#22D3EE"/><text x="100" y="72" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">B</text>
  <circle cx="220" cy="245" r="4.5" fill="#34D399"/><text x="228" y="258" fill="#34D399" font-family="system-ui" font-size="13" font-weight="bold">C</text>
  <text x="160" y="265" fill="#34D399" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">Shadow AC</text>
  <text x="115" y="118" fill="#F59E0B" font-family="monospace" font-size="11" font-weight="bold">α</text>

  <!-- Tower 2: A'(320,245), B'(320,85), Shadow C'(440,245) -->
  ${angleArc(320, 85, 320, 245, 440, 245, 26, '#F59E0B', 'rgba(245,158,11,0.25)')}
  ${rightAngleMark(320, 245, 440, 245, 320, 85, 14, '#34D399')}
  <polygon points="320,245 440,245 320,85" fill="rgba(52,211,153,0.1)" stroke="#34D399" stroke-width="2.5"/>
  <line x1="320" y1="245" x2="320" y2="85" stroke="#34D399" stroke-width="3.5"/>
  <line x1="320" y1="245" x2="440" y2="245" stroke="#34D399" stroke-width="3.5"/>
  ${tickMarks(320, 245, 320, 85, 1, '#FBBF24')}

  <circle cx="320" cy="245" r="4.5" fill="#34D399"/><text x="305" y="258" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">A'</text>
  <circle cx="320" cy="85" r="4.5" fill="#34D399"/><text x="320" y="72" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">B'</text>
  <circle cx="440" cy="245" r="4.5" fill="#34D399"/><text x="448" y="258" fill="#34D399" font-family="system-ui" font-size="13" font-weight="bold">C'</text>
  <text x="380" y="265" fill="#34D399" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">Shadow A'C'</text>
  <text x="335" y="118" fill="#F59E0B" font-family="monospace" font-size="11" font-weight="bold">α</text>

  <!-- Sun Rays indicator -->
  <line x1="64" y1="50" x2="96" y2="80" stroke="#FBBF24" stroke-width="2" stroke-dasharray="3,3"/>
  <line x1="284" y1="50" x2="316" y2="80" stroke="#FBBF24" stroke-width="2" stroke-dasharray="3,3"/>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">Tower heights AB = A'B', Sun elevation ∠B = ∠B' ⇒ △ABC = △A'B'C' (LA) ⇒ Shadows AC = A'C'</text>`
  ),

  // 3. Ramps HA (SGK H.4.47)
  math7_l15_ramps_ha: () => wrapSvg(
    "Cargo Ramps HA Criterion SGK H.4.47",
    "Two cargo ramps ABC and A'B'C' with equal hypotenuses BC = B'C' and equal slope angles B = B'",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">CARGO RAMPS · HYPOTENUSE - ACUTE ANGLE (HA)</text>

  <!-- Ramp 1: B(60,240), A(220,240), C(220,110) -->
  ${angleArc(60, 240, 220, 110, 220, 240, 32, '#F59E0B', 'rgba(245,158,11,0.22)')}
  ${rightAngleMark(220, 240, 60, 240, 220, 110, 14, '#38BDF8')}
  <polygon points="60,240 220,240 220,110" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.6"/>
  ${tickMarks(60, 240, 220, 110, 1, '#FBBF24')}
  <line x1="220" y1="240" x2="220" y2="110" stroke="#38BDF8" stroke-width="3"/>

  <circle cx="60" cy="240" r="4.5" fill="#22D3EE"/><text x="45" y="250" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold">B</text>
  <circle cx="220" cy="240" r="4.5" fill="#22D3EE"/><text x="230" y="252" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold">A</text>
  <circle cx="220" cy="110" r="4.5" fill="#22D3EE"/><text x="220" y="96" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold" text-anchor="middle">C</text>
  <text x="125" y="165" fill="#FBBF24" font-family="monospace" font-size="11" font-weight="bold">Ramp BC</text>
  <text x="232" y="175" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold">Height</text>

  <!-- Ramp 2: B'(310,240), A'(470,240), C'(470,110) -->
  ${angleArc(310, 240, 470, 110, 470, 240, 32, '#F59E0B', 'rgba(245,158,11,0.22)')}
  ${rightAngleMark(470, 240, 310, 240, 470, 110, 14, '#34D399')}
  <polygon points="310,240 470,240 470,110" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.6"/>
  ${tickMarks(310, 240, 470, 110, 1, '#FBBF24')}
  <line x1="470" y1="240" x2="470" y2="110" stroke="#34D399" stroke-width="3"/>

  <circle cx="310" cy="240" r="4.5" fill="#34D399"/><text x="295" y="250" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold">B'</text>
  <circle cx="470" cy="240" r="4.5" fill="#34D399"/><text x="480" y="252" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold">A'</text>
  <circle cx="470" cy="110" r="4.5" fill="#34D399"/><text x="470" y="96" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold" text-anchor="middle">C'</text>
  <text x="375" y="165" fill="#FBBF24" font-family="monospace" font-size="11" font-weight="bold">Ramp B'C'</text>
  <text x="482" y="175" fill="#34D399" font-family="monospace" font-size="11" font-weight="bold">Height'</text>

  <text x="270" y="296" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">BC = B'C' (hypotenuses), ∠B = ∠B' (slope) ⇒ △ABC = △A'B'C' (HA) ⇒ Heights AC = A'C'</text>`
  ),

  // 4. Six Triangles SGK H.4.48
  math7_l15_six_triangles_h448: () => wrapSvg(
    "Six Right Triangles SGK H.4.48",
    "Find congruent pairs among 6 right triangles: ABC, DEF, PMN, GKH, RST, XYZ",
    `  <rect x="95" y="10" width="410" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="300" y="27" fill="#E2E8F0" font-family="system-ui" font-size="11.5" font-weight="bold" text-anchor="middle">SENSOR SCAN · 6 RIGHT TRIANGLES (SGK H.4.48)</text>

  <!-- Row 1: Col 1: △ABC -->
  ${rightAngleMark(45, 145, 120, 145, 45, 75, 10, '#38BDF8')}
  ${angleArc(45, 75, 120, 145, 45, 145, 16, '#F59E0B')}
  <polygon points="45,145 120,145 45,75" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2"/>
  ${tickMarks(45, 145, 45, 75, 'x', '#FBBF24')}
  <text x="35" y="152" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">A</text>
  <text x="125" y="152" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">B</text>
  <text x="45" y="66" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">C</text>

  <!-- Row 1: Col 2: △DEF -->
  ${rightAngleMark(240, 145, 315, 145, 240, 75, 10, '#38BDF8')}
  ${angleArc(240, 75, 315, 145, 240, 145, 16, '#F59E0B')}
  <polygon points="240,145 315,145 240,75" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2"/>
  ${tickMarks(315, 145, 240, 75, 2, '#38BDF8')}
  <text x="230" y="152" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">D</text>
  <text x="320" y="152" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">E</text>
  <text x="240" y="66" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">F</text>

  <!-- Row 1: Col 3: △PMN -->
  ${rightAngleMark(435, 145, 510, 145, 435, 75, 10, '#38BDF8')}
  <polygon points="435,145 510,145 435,75" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2"/>
  ${tickMarks(435, 145, 435, 75, 2, '#FBBF24')}
  ${tickMarks(435, 145, 510, 145, 1, '#34D399')}
  <text x="425" y="152" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">M</text>
  <text x="515" y="152" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">N</text>
  <text x="435" y="66" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">P</text>

  <!-- Row 2: Col 1: △XYZ -->
  ${rightAngleMark(45, 265, 120, 265, 45, 195, 10, '#34D399')}
  ${angleArc(45, 195, 120, 265, 45, 195, 16, '#F59E0B')}
  <polygon points="45,265 120,265 45,195" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2"/>
  ${tickMarks(45, 265, 45, 195, 'x', '#FBBF24')}
  <text x="35" y="272" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">X</text>
  <text x="125" y="272" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">Y</text>
  <text x="45" y="186" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">Z</text>

  <!-- Row 2: Col 2: △GKH -->
  ${rightAngleMark(240, 265, 315, 265, 240, 195, 10, '#34D399')}
  ${angleArc(240, 195, 315, 265, 240, 265, 16, '#F59E0B')}
  <polygon points="240,265 315,265 240,195" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2"/>
  ${tickMarks(315, 265, 240, 195, 2, '#38BDF8')}
  <text x="230" y="272" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">G</text>
  <text x="320" y="272" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">H</text>
  <text x="240" y="186" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">K</text>

  <!-- Row 2: Col 3: △RST -->
  ${rightAngleMark(435, 265, 510, 265, 435, 195, 10, '#34D399')}
  <polygon points="435,265 510,265 435,195" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2"/>
  ${tickMarks(435, 265, 435, 195, 2, '#FBBF24')}
  ${tickMarks(435, 265, 510, 265, 1, '#34D399')}
  <text x="425" y="272" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">R</text>
  <text x="515" y="272" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold">T</text>
  <text x="435" y="186" fill="#FFF" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">S</text>

  <!-- Congruence summaries below each column -->
  <text x="82" y="302" fill="#38BDF8" font-family="system-ui" font-size="10.5" font-weight="bold" text-anchor="middle">△ABC = △XYZ (LA)</text>
  <text x="277" y="302" fill="#34D399" font-family="system-ui" font-size="10.5" font-weight="bold" text-anchor="middle">△DEF = △GKH (HA)</text>
  <text x="472" y="302" fill="#FBBF24" font-family="system-ui" font-size="10.5" font-weight="bold" text-anchor="middle">△PMN = △RST (LL)</text>`,
    600, 320
  ),

  // 5. Four Triangles SBT 1 (SBT H.4.31)
  math7_l15_four_triangles_sbt1: () => wrapSvg(
    "Four Right Triangles SBT H.4.31",
    "Identify equal triangles among ABC, DEF, MNP, XYZ",
    `  <rect x="85" y="14" width="370" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SCAN ARRAY · 4 TRIANGLES (SBT H.4.31)</text>

  <!-- 1. △ABC: A(35,225), B(115,225), C(35,120) -->
  ${rightAngleMark(35, 225, 115, 225, 35, 120, 11, '#38BDF8')}
  <polygon points="35,225 115,225 35,120" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.2"/>
  ${tickMarks(35, 225, 115, 225, 1, '#FBBF24')}
  ${tickMarks(35, 225, 35, 120, 2, '#34D399')}
  <text x="25" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">A</text>
  <text x="122" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">B</text>
  <text x="35" y="108" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">C</text>

  <!-- 2. △DEF: D(160,225), E(240,225), F(160,120) -->
  ${rightAngleMark(160, 225, 240, 225, 160, 120, 11, '#38BDF8')}
  ${angleArc(240, 225, 160, 120, 160, 225, 20, '#F59E0B')}
  <polygon points="160,225 240,225 160,120" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.2"/>
  ${tickMarks(160, 225, 240, 225, 1, '#FBBF24')}
  <text x="150" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">D</text>
  <text x="247" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">E</text>
  <text x="160" y="108" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">F</text>

  <!-- 3. △MNP: M(285,225), N(365,225), P(285,120) -->
  ${rightAngleMark(285, 225, 365, 225, 285, 120, 11, '#34D399')}
  <polygon points="285,225 365,225 285,120" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.2"/>
  ${tickMarks(285, 225, 365, 225, 1, '#FBBF24')}
  ${tickMarks(285, 225, 285, 120, 2, '#34D399')}
  <text x="275" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">M</text>
  <text x="372" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">N</text>
  <text x="285" y="108" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">P</text>

  <!-- 4. △XYZ: X(410,225), Y(490,225), Z(410,120) -->
  ${rightAngleMark(410, 225, 490, 225, 410, 120, 11, '#34D399')}
  ${angleArc(490, 225, 410, 120, 410, 225, 20, '#F59E0B')}
  <polygon points="410,225 490,225 410,120" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.2"/>
  ${tickMarks(410, 225, 490, 225, 1, '#FBBF24')}
  <text x="400" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">X</text>
  <text x="497" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">Y</text>
  <text x="410" y="108" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">Z</text>

  <rect x="75" y="262" width="390" height="42" rx="8" fill="rgba(15,23,42,0.8)" stroke="#38BDF8" stroke-width="1"/>
  <text x="270" y="280" fill="#38BDF8" font-family="system-ui" font-size="11.5" font-weight="bold" text-anchor="middle">△ABC = △MNP (Leg - Leg / LL)  ·  AB = MN, AC = MP</text>
  <text x="270" y="296" fill="#34D399" font-family="system-ui" font-size="11.5" font-weight="bold" text-anchor="middle">△DEF = △XYZ (Leg - Acute Angle / LA)  ·  DE = XY, ∠E = ∠Y</text>`
  ),

  // 6. HL Four Triangles (SGK H.4.52)
  math7_l15_hl_four_triangles: () => wrapSvg(
    "Hypotenuse-Leg Four Triangles SGK H.4.52",
    "Identify HL congruent pair among right triangles ABC, DEF, KGH, MNP",
    `  <rect x="85" y="14" width="370" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">HYPOTENUSE - LEG SCAN (SGK H.4.52)</text>

  <!-- 1. △ABC: A(35,225), B(115,225), C(35,120) -->
  ${rightAngleMark(35, 225, 115, 225, 35, 120, 11, '#38BDF8')}
  <polygon points="35,225 115,225 35,120" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.2"/>
  ${tickMarks(35, 225, 115, 225, 1, '#FBBF24')}
  ${tickMarks(115, 225, 35, 120, 2, '#38BDF8')}
  <text x="25" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">A</text>
  <text x="122" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">B</text>
  <text x="35" y="108" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">C</text>

  <!-- 2. △DEF: D(160,225), E(240,225), F(160,120) -->
  ${rightAngleMark(160, 225, 240, 225, 160, 120, 11, '#38BDF8')}
  <polygon points="160,225 240,225 160,120" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.2"/>
  ${tickMarks(160, 225, 240, 225, 1, '#FBBF24')}
  ${tickMarks(240, 225, 160, 120, 'x', '#FB7185')}
  <text x="150" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">D</text>
  <text x="247" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">E</text>
  <text x="160" y="108" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">F</text>

  <!-- 3. △KGH: G(285,225), H(365,225), K(285,120) -->
  ${rightAngleMark(285, 225, 365, 225, 285, 120, 11, '#34D399')}
  <polygon points="285,225 365,225 285,120" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.2"/>
  ${tickMarks(285, 225, 365, 225, 1, '#FBBF24')}
  ${tickMarks(365, 225, 285, 120, 2, '#38BDF8')}
  <text x="275" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">G</text>
  <text x="372" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">H</text>
  <text x="285" y="108" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">K</text>

  <!-- 4. △MNP: M(410,225), N(490,225), P(410,120) -->
  ${rightAngleMark(410, 225, 490, 225, 410, 120, 11, '#38BDF8')}
  <polygon points="410,225 490,225 410,120" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.2"/>
  ${tickMarks(410, 225, 410, 120, 2, '#34D399')}
  ${tickMarks(490, 225, 410, 120, 'x', '#FB7185')}
  <text x="400" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">M</text>
  <text x="497" y="234" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold">N</text>
  <text x="410" y="108" fill="#FFF" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">P</text>

  <rect x="75" y="262" width="390" height="42" rx="8" fill="rgba(15,23,42,0.8)" stroke="#38BDF8" stroke-width="1"/>
  <text x="270" y="280" fill="#34D399" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">MATCH CONFIRMED · △ABC = △KGH (HL)</text>
  <text x="270" y="296" fill="#94A3B8" font-family="system-ui" font-size="11" text-anchor="middle">Equal legs AB = GH (1 tick) &amp; equal hypotenuses BC = KH (2 ticks)</text>`
  ),

  // 7. Compass Construction HL (SGK H.4.51)
  math7_l15_compass_hl: () => wrapSvg(
    "Compass Construction HL SGK H.4.51",
    "Constructing right triangle ABC given leg AB=3cm and hypotenuse BC=5cm using compass arc",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">COMPASS CONSTRUCTION · HL THEOREM (SGK H.4.51)</text>

  <!-- Perpendicular Ray Ax going upward from A(150,245) -->
  <line x1="150" y1="245" x2="150" y2="65" stroke="#94A3B8" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="140" y="65" fill="#94A3B8" font-family="monospace" font-size="13" font-weight="bold">x</text>

  <!-- Triangle ABC: A(150,245), B(310,245), C(150,95) -->
  ${rightAngleMark(150, 245, 310, 245, 150, 95, 14, '#38BDF8')}
  <polygon points="150,245 310,245 150,95" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.8"/>

  <!-- Compass Arc centered at B(310,245) with radius dist(B,C) = sqrt(160^2 + 150^2) = 219.3 -->
  <!-- Arc passes through C(150,95) -->
  <path d="M 130 80 A 219.3 219.3 0 0 1 180 120" fill="none" stroke="#F59E0B" stroke-width="2.4" stroke-dasharray="5,4"/>
  <line x1="310" y1="245" x2="150" y2="95" stroke="#F59E0B" stroke-width="2.5"/>

  <!-- Compass needle at B -->
  <circle cx="310" cy="245" r="5" fill="#F59E0B"/>
  <circle cx="150" cy="95" r="5" fill="#22D3EE"/>
  <circle cx="150" cy="245" r="5" fill="#22D3EE"/>

  <text x="135" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <text x="322" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <text x="135" y="98" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>

  <text x="230" y="265" fill="#34D399" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">AB = 3 cm</text>
  <text x="245" y="160" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold" transform="rotate(-43 245 160)">BC = 5 cm (Compass Arc)</text>

  <!-- Construction notes box -->
  <rect x="330" y="90" width="185" height="70" rx="8" fill="rgba(15,23,42,0.85)" stroke="#38BDF8" stroke-width="1"/>
  <text x="422" y="112" fill="#38BDF8" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">Step 1: Draw ∠xAB = 90°</text>
  <text x="422" y="130" fill="#E2E8F0" font-family="system-ui" font-size="10.5" text-anchor="middle">Step 2: AB = 3 cm on ray</text>
  <text x="422" y="148" fill="#F59E0B" font-family="system-ui" font-size="10.5" text-anchor="middle">Step 3: Arc (B, 5 cm) cuts Ax at C</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">Right triangle is uniquely determined by hypotenuse and leg (HL uniqueness)</text>`
  ),

  // 8. Kite Vidu 1 HA (SGK H.4.49)
  math7_l15_kite_vidu1_ha: () => wrapSvg(
    "Kite Model 1 HA SGK H.4.49",
    "Kite ABCD with right angles at B and D, common hypotenuse AC, equal acute angles at A, diagonals meeting at E",
    `  <rect x="110" y="14" width="320" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">KITE MODEL 1 · HA THEOREM (SGK H.4.49)</text>

  <!-- Scaled kite: A(175,160), C(365,160), B(220,79), D(220,241), E(220,160) -->
  <!-- Vector BA=(-45, 81), BC=(145, 81), dot = -6525 + 6561 ≈ 0 (Angle B = 90°) -->
  ${rightAngleMark(220, 79, 175, 160, 365, 160, 13, '#38BDF8')}
  ${rightAngleMark(220, 241, 175, 160, 365, 160, 13, '#38BDF8')}
  ${rightAngleMark(220, 160, 365, 160, 220, 79, 10, '#94A3B8')}

  ${angleArc(175, 160, 365, 160, 220, 79, 26, '#F59E0B', 'rgba(245,158,11,0.25)')}
  ${angleArc(175, 160, 220, 241, 365, 160, 26, '#F59E0B', 'rgba(245,158,11,0.25)')}

  <polygon points="175,160 220,79 365,160 220,241" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.6" stroke-linejoin="round"/>
  <line x1="175" y1="160" x2="365" y2="160" stroke="#34D399" stroke-width="2.4"/>
  <line x1="220" y1="79" x2="220" y2="241" stroke="#E2E8F0" stroke-width="2" stroke-dasharray="5,4"/>

  <circle cx="175" cy="160" r="4.5" fill="#22D3EE"/><text x="158" y="165" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="220" cy="79" r="4.5" fill="#22D3EE"/><text x="220" y="65" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">B</text>
  <circle cx="365" cy="160" r="4.5" fill="#22D3EE"/><text x="378" y="165" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <circle cx="220" cy="241" r="4.5" fill="#22D3EE"/><text x="220" y="260" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">D</text>
  <circle cx="220" cy="160" r="3.5" fill="#94A3B8"/><text x="228" y="152" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold">E</text>

  <text x="300" y="150" fill="#34D399" font-family="monospace" font-size="11" font-weight="bold">AC (Common)</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">∠ABC = ∠ADC = 90°, AC common, ∠BAC = ∠DAC ⇒ △ABC = △ADC (HA) ⇒ AB = AD</text>`
  ),

  // 9. Bisector Perpendiculars HA (SGK H.4.50)
  math7_l15_bisector_perp: () => wrapSvg(
    "Angle Bisector Perpendiculars SGK H.4.50",
    "Ray Oz bisecting angle xOy with M on Oz, MA perp Ox and MB perp Oy",
    `  <rect x="100" y="14" width="340" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">ANGLE BISECTOR PROPERTY · HA THEOREM (SGK H.4.50)</text>

  <!-- O(75, 235), Ox to (470, 235), Oy to (320, 58), Oz to (445, 105) -->
  <line x1="75" y1="235" x2="470" y2="235" stroke="#94A3B8" stroke-width="2"/>
  <text x="478" y="239" fill="#94A3B8" font-family="monospace" font-size="13" font-weight="bold">x</text>
  <line x1="75" y1="235" x2="320" y2="58" stroke="#94A3B8" stroke-width="2"/>
  <text x="328" y="55" fill="#94A3B8" font-family="monospace" font-size="13" font-weight="bold">y</text>
  <line x1="75" y1="235" x2="445" y2="105" stroke="#F59E0B" stroke-width="2.2" stroke-dasharray="6,4"/>
  <text x="453" y="105" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">z</text>

  <!-- Angle arcs at O: angle xOz = angle yOz -->
  ${angleArc(75, 235, 470, 235, 445, 105, 34, '#F59E0B', 'rgba(245,158,11,0.25)')}
  ${angleArc(75, 235, 445, 105, 320, 58, 34, '#F59E0B', 'rgba(245,158,11,0.25)')}

  <!-- Point M on Oz: M(315, 150) -->
  <!-- A is projection on Ox: A(315, 235) -->
  <!-- B is projection on Oy: B(248, 80) -->
  ${rightAngleMark(315, 235, 75, 235, 315, 150, 12, '#38BDF8')}
  ${rightAngleMark(248, 80, 75, 235, 315, 150, 12, '#38BDF8')}

  <line x1="75" y1="235" x2="315" y2="150" stroke="#34D399" stroke-width="2.6"/>
  <line x1="315" y1="150" x2="315" y2="235" stroke="#38BDF8" stroke-width="2.6"/>
  <line x1="315" y1="150" x2="248" y2="80" stroke="#38BDF8" stroke-width="2.6"/>

  ${tickMarks(315, 150, 315, 235, 1, '#FBBF24')}
  ${tickMarks(315, 150, 248, 80, 1, '#FBBF24')}

  <circle cx="75" cy="235" r="4.5" fill="#22D3EE"/><text x="58" y="242" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">O</text>
  <circle cx="315" cy="235" r="4.5" fill="#22D3EE"/><text x="315" y="254" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="248" cy="80" r="4.5" fill="#22D3EE"/><text x="240" y="68" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">B</text>
  <circle cx="315" cy="150" r="4.5" fill="#F59E0B"/><text x="328" y="152" fill="#F59E0B" font-family="system-ui" font-size="14" font-weight="bold">M</text>

  <text x="180" y="180" fill="#34D399" font-family="monospace" font-size="11" font-weight="bold" transform="rotate(-19 180 180)">Common OM</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">OM common, ∠AOM = ∠BOM, ∠OAM = ∠OBM = 90° ⇒ △OAM = △OBM (HA) ⇒ MA = MB</text>`
  ),

  // 10. Kite Vidu 2 HL (SGK H.4.53)
  math7_l15_kite_vidu2_hl: () => wrapSvg(
    "Kite Model 2 HL SGK H.4.53",
    "Kite ABCD with right angles at B and D, common hypotenuse AC, equal legs AB = AD",
    `  <rect x="110" y="14" width="320" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">KITE MODEL 2 · HL THEOREM (SGK H.4.53)</text>

  <!-- Scaled coordinates: A(175,160), C(365,160), B(220,79), D(220,241) -->
  ${rightAngleMark(220, 79, 175, 160, 365, 160, 13, '#38BDF8')}
  ${rightAngleMark(220, 241, 175, 160, 365, 160, 13, '#38BDF8')}

  <polygon points="175,160 220,79 365,160 220,241" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.6" stroke-linejoin="round"/>
  <line x1="175" y1="160" x2="365" y2="160" stroke="#34D399" stroke-width="2.6"/>

  ${tickMarks(175, 160, 220, 79, 1, '#FBBF24')}
  ${tickMarks(175, 160, 220, 241, 1, '#FBBF24')}

  <circle cx="175" cy="160" r="4.5" fill="#22D3EE"/><text x="158" y="165" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="220" cy="79" r="4.5" fill="#22D3EE"/><text x="220" y="65" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">B</text>
  <circle cx="365" cy="160" r="4.5" fill="#22D3EE"/><text x="378" y="165" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <circle cx="220" cy="241" r="4.5" fill="#22D3EE"/><text x="220" y="260" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">D</text>

  <text x="300" y="150" fill="#34D399" font-family="monospace" font-size="11" font-weight="bold">AC (Common Hypotenuse)</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">AC common hypotenuse, leg AB = AD, ∠B = ∠D = 90° ⇒ △ABC = △ADC (HL) ⇒ BC = DC</text>`
  ),

  // 11. Circle Three HL (SGK H.4.54)
  math7_l15_circle_three_hl: () => wrapSvg(
    "Circle with Chords and Perpendiculars SGK H.4.54",
    "Circle centered at O with chords AB, BC, CA and perpendiculars OP, OM, ON forming 3 pairs of HL congruent right triangles",
    `  <rect x="85" y="14" width="370" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">CHORDS &amp; RADII · 3 PAIRS OF HL CONGRUENCE (SGK H.4.54)</text>

  <!-- Circle centered at O(270, 172), radius R=100 -->
  <circle cx="270" cy="172" r="100" fill="none" stroke="#475569" stroke-width="2" stroke-dasharray="6,4"/>

  <!-- Points: A(270, 72), B(183, 222), C(357, 222) -->
  <!-- Midpoints: P(226.5, 147), N(313.5, 147), M(270, 222) -->
  ${rightAngleMark(226.5, 147, 270, 172, 270, 72, 9, '#FBBF24')}
  ${rightAngleMark(313.5, 147, 270, 172, 270, 72, 9, '#FBBF24')}
  ${rightAngleMark(270, 222, 270, 172, 357, 222, 9, '#FBBF24')}

  <!-- Chords -->
  <polygon points="270,72 183,222 357,222" fill="rgba(56,189,248,0.06)" stroke="#E2E8F0" stroke-width="2.2"/>

  <!-- Radii OA, OB, OC -->
  <line x1="270" y1="172" x2="270" y2="72" stroke="#38BDF8" stroke-width="2.2"/>
  <line x1="270" y1="172" x2="183" y2="222" stroke="#38BDF8" stroke-width="2.2"/>
  <line x1="270" y1="172" x2="357" y2="222" stroke="#38BDF8" stroke-width="2.2"/>

  <!-- Perpendiculars OP, ON, OM -->
  <line x1="270" y1="172" x2="226.5" y2="147" stroke="#FBBF24" stroke-width="2.2" stroke-dasharray="4,3"/>
  <line x1="270" y1="172" x2="313.5" y2="147" stroke="#FBBF24" stroke-width="2.2" stroke-dasharray="4,3"/>
  <line x1="270" y1="172" x2="270" y2="222" stroke="#FBBF24" stroke-width="2.2" stroke-dasharray="4,3"/>

  <circle cx="270" cy="172" r="4.5" fill="#F59E0B"/><text x="256" y="176" fill="#F59E0B" font-family="system-ui" font-size="13" font-weight="bold">O</text>
  <circle cx="270" cy="72" r="4.5" fill="#22D3EE"/><text x="270" y="60" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="183" cy="222" r="4.5" fill="#22D3EE"/><text x="168" y="232" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">B</text>
  <circle cx="357" cy="222" r="4.5" fill="#22D3EE"/><text x="370" y="232" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">C</text>

  <circle cx="226.5" cy="147" r="3.5" fill="#FBBF24"/><text x="210" y="142" fill="#FBBF24" font-family="system-ui" font-size="12" font-weight="bold">P</text>
  <circle cx="313.5" cy="147" r="3.5" fill="#FBBF24"/><text x="326" y="142" fill="#FBBF24" font-family="system-ui" font-size="12" font-weight="bold">N</text>
  <circle cx="270" cy="222" r="3.5" fill="#FBBF24"/><text x="270" y="240" fill="#FBBF24" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">M</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">OA = OB = OC (radii) ⇒ △OPA = △OPB (HL), △OMA = △OMB (HL), △ONA = △ONC (HL)</text>`
  ),

  // 12. Ladders Wall HL (SGK H.4.55)
  math7_l15_ladders_wall_hl: () => wrapSvg(
    "Ladders on Vertical Wall HL SGK H.4.55",
    "Two ladders AB and A'B' of equal length leaning against vertical walls BH and B'H' of equal height",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">LADDERS ON WALL · HL APPLICATION (SGK H.4.55)</text>

  <!-- Ground line -->
  <line x1="30" y1="245" x2="510" y2="245" stroke="#475569" stroke-width="2"/>

  <!-- Ladder 1: Wall at x=180, B(180,95), H(180,245), Ladder foot A(75,245) -->
  ${rightAngleMark(180, 245, 75, 245, 180, 95, 14, '#38BDF8')}
  <polygon points="75,245 180,245 180,95" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2"/>
  <line x1="180" y1="245" x2="180" y2="95" stroke="#38BDF8" stroke-width="4"/>
  <line x1="75" y1="245" x2="180" y2="95" stroke="#FBBF24" stroke-width="3"/>
  ${tickMarks(180, 245, 180, 95, 1, '#34D399')}
  ${tickMarks(75, 245, 180, 95, 2, '#FBBF24')}

  <circle cx="75" cy="245" r="4.5" fill="#22D3EE"/><text x="60" y="258" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">A</text>
  <circle cx="180" cy="95" r="4.5" fill="#22D3EE"/><text x="180" y="82" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">B</text>
  <circle cx="180" cy="245" r="4.5" fill="#22D3EE"/><text x="190" y="258" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">H</text>

  <text x="120" y="160" fill="#FBBF24" font-family="monospace" font-size="11" font-weight="bold" transform="rotate(-55 120 160)">Ladder AB</text>
  <text x="195" y="175" fill="#34D399" font-family="monospace" font-size="11" font-weight="bold">Wall BH</text>

  <!-- Ladder 2: Wall at x=440, B'(440,95), H'(440,245), Foot A'(335,245) -->
  ${rightAngleMark(440, 245, 335, 245, 440, 95, 14, '#34D399')}
  <polygon points="335,245 440,245 440,95" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2"/>
  <line x1="440" y1="245" x2="440" y2="95" stroke="#34D399" stroke-width="4"/>
  <line x1="335" y1="245" x2="440" y2="95" stroke="#FBBF24" stroke-width="3"/>
  ${tickMarks(440, 245, 440, 95, 1, '#34D399')}
  ${tickMarks(335, 245, 440, 95, 2, '#FBBF24')}

  <circle cx="335" cy="245" r="4.5" fill="#34D399"/><text x="320" y="258" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">A'</text>
  <circle cx="440" cy="95" r="4.5" fill="#34D399"/><text x="440" y="82" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">B'</text>
  <circle cx="440" cy="245" r="4.5" fill="#34D399"/><text x="450" y="258" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">H'</text>

  <text x="380" y="160" fill="#FBBF24" font-family="monospace" font-size="11" font-weight="bold" transform="rotate(-55 380 160)">Ladder A'B'</text>
  <text x="455" y="175" fill="#34D399" font-family="monospace" font-size="11" font-weight="bold">Wall B'H'</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">Ladder AB = A'B', Wall BH = B'H', ∠H = ∠H' = 90° ⇒ △ABH = △A'B'H' (HL) ⇒ Base AH = A'H'</text>`
  ),

  // 13. SGK 4.20a
  math7_l15_sgk_420a: () => wrapSvg(
    "Triangle Altitude & Bisector SGK 4.20a",
    "Triangle ABD with altitude AC perp BD and equal angle arcs at vertex A",
    `  <rect x="105" y="14" width="330" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">ALTITUDE &amp; BISECTOR · LA (SGK 4.20a)</text>

  <!-- Triangle ABD: A(270,75), B(130,245), D(410,245), C(270,245) -->
  ${angleArc(270, 75, 130, 245, 270, 245, 30, '#F59E0B', 'rgba(245,158,11,0.25)')}
  ${angleArc(270, 75, 270, 245, 410, 245, 30, '#F59E0B', 'rgba(245,158,11,0.25)')}

  ${rightAngleMark(270, 245, 130, 245, 270, 75, 14, '#38BDF8')}
  ${rightAngleMark(270, 245, 410, 245, 270, 75, 14, '#34D399')}

  <polygon points="270,75 130,245 410,245" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.6"/>
  <line x1="270" y1="75" x2="270" y2="245" stroke="#34D399" stroke-width="2.6"/>

  <circle cx="270" cy="75" r="4.5" fill="#22D3EE"/><text x="270" y="62" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="130" cy="245" r="4.5" fill="#22D3EE"/><text x="115" y="255" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="270" cy="245" r="4.5" fill="#34D399"/><text x="270" y="264" fill="#34D399" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">C</text>
  <circle cx="410" cy="245" r="4.5" fill="#22D3EE"/><text x="424" y="255" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">D</text>

  <text x="282" y="165" fill="#34D399" font-family="monospace" font-size="11.5" font-weight="bold">AC (Common)</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">AC common leg, ∠BAC = ∠DAC, ∠BCA = ∠DCA = 90° ⇒ △ABC = △ADC (LA) ⇒ AB = AD</text>`
  ),

  // 14. SGK 4.20b
  math7_l15_sgk_420b: () => wrapSvg(
    "Crossed Right Triangles Shared Base SGK 4.20b",
    "Crossed right triangles EHG and FGH sharing hypotenuse HG with equal legs EH = FG",
    `  <rect x="105" y="14" width="330" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SHARED HYPOTENUSE · HL (SGK 4.20b)</text>

  <!-- H(130,245), G(410,245), E(186,133), F(354,133) -->
  ${rightAngleMark(186, 133, 130, 245, 410, 245, 13, '#38BDF8')}
  ${rightAngleMark(354, 133, 410, 245, 130, 245, 13, '#34D399')}

  <polygon points="130,245 410,245 186,133" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.5"/>
  <polygon points="130,245 410,245 354,133" fill="rgba(52,211,153,0.1)" stroke="#34D399" stroke-width="2.5"/>

  ${tickMarks(130, 245, 186, 133, 1, '#FBBF24')}
  ${tickMarks(410, 245, 354, 133, 1, '#FBBF24')}

  <circle cx="130" cy="245" r="4.5" fill="#22D3EE"/><text x="114" y="255" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">H</text>
  <circle cx="410" cy="245" r="4.5" fill="#22D3EE"/><text x="424" y="255" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">G</text>
  <circle cx="186" cy="133" r="4.5" fill="#38BDF8"/><text x="180" y="120" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">E</text>
  <circle cx="354" cy="133" r="4.5" fill="#34D399"/><text x="360" y="120" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">F</text>

  <text x="270" y="265" fill="#38BDF8" font-family="monospace" font-size="11.5" font-weight="bold" text-anchor="middle">HG (Common Hypotenuse)</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">HG common hypotenuse, leg EH = FG, ∠E = ∠F = 90° ⇒ △EHG = △FGH (HL) ⇒ EG = FH</text>`
  ),

  // 15. SGK 4.20c
  math7_l15_sgk_420c: () => wrapSvg(
    "Perpendicular Rays HL SGK 4.20c",
    "Right angles at M on K-M-N with ray MQ upward, QK and PN equal hypotenuses",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">PERPENDICULAR RAYS · HL (SGK 4.20c)</text>

  <!-- M(270,245), K(170,245), N(440,245), P(270,145), Q(270,75) -->
  <line x1="140" y1="245" x2="470" y2="245" stroke="#94A3B8" stroke-width="2"/>
  <line x1="270" y1="245" x2="270" y2="55" stroke="#94A3B8" stroke-width="2"/>

  ${rightAngleMark(270, 245, 170, 245, 270, 75, 13, '#38BDF8')}
  ${rightAngleMark(270, 245, 440, 245, 270, 145, 13, '#34D399')}

  <polygon points="170,245 270,245 270,75" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.5"/>
  <polygon points="440,245 270,245 270,145" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.5"/>

  ${tickMarks(170, 245, 270, 245, 1, '#FBBF24')}
  ${tickMarks(270, 245, 270, 145, 1, '#FBBF24')}
  ${tickMarks(170, 245, 270, 75, 2, '#38BDF8')}
  ${tickMarks(440, 245, 270, 145, 2, '#38BDF8')}

  <circle cx="270" cy="245" r="4.5" fill="#FFF"/><text x="256" y="260" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">M</text>
  <circle cx="170" cy="245" r="4.5" fill="#22D3EE"/><text x="156" y="255" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">K</text>
  <circle cx="440" cy="245" r="4.5" fill="#34D399"/><text x="448" y="255" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">N</text>
  <circle cx="270" cy="145" r="4.5" fill="#34D399"/><text x="282" y="148" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">P</text>
  <circle cx="270" cy="75" r="4.5" fill="#22D3EE"/><text x="282" y="78" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">Q</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">Hypotenuses QK = PN, legs KM = PM, right at M ⇒ △QMK = △PMN (HL) ⇒ QM = MN</text>`
  ),

  // 16. SGK 4.20d
  math7_l15_sgk_420d: () => wrapSvg(
    "Frame Diagonals LL SGK 4.20d",
    "Vertical frame VSTU with diagonals VT and US, right angles at S and T, equal vertical sides VS = UT",
    `  <rect x="105" y="14" width="330" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">FRAME DIAGONALS · LL THEOREM (SGK 4.20d)</text>

  <!-- V(150,95), U(390,95), S(150,245), T(390,245) -->
  ${rightAngleMark(150, 245, 390, 245, 150, 95, 14, '#38BDF8')}
  ${rightAngleMark(390, 245, 150, 245, 390, 95, 14, '#34D399')}

  <polygon points="150,95 150,245 390,245" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.5"/>
  <polygon points="390,95 390,245 150,245" fill="rgba(52,211,153,0.1)" stroke="#34D399" stroke-width="2.5"/>
  <line x1="150" y1="95" x2="390" y2="95" stroke="#E2E8F0" stroke-width="2" stroke-dasharray="5,4"/>

  ${tickMarks(150, 95, 150, 245, 1, '#FBBF24')}
  ${tickMarks(390, 95, 390, 245, 1, '#FBBF24')}

  <circle cx="150" cy="95" r="4.5" fill="#22D3EE"/><text x="135" y="90" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">V</text>
  <circle cx="390" cy="95" r="4.5" fill="#34D399"/><text x="404" y="90" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">U</text>
  <circle cx="150" cy="245" r="4.5" fill="#22D3EE"/><text x="135" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">S</text>
  <circle cx="390" cy="245" r="4.5" fill="#34D399"/><text x="404" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">T</text>

  <text x="270" y="265" fill="#38BDF8" font-family="monospace" font-size="11.5" font-weight="bold" text-anchor="middle">ST (Common Leg)</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">VS = UT, ST common, ∠VST = ∠UTS = 90° ⇒ △VST = △UTS (LL) ⇒ Diagonals VT = US</text>`
  ),

  // 17. SGK 4.21 Bowtie (SGK H.4.56)
  math7_l15_sgk_421_bowtie: () => wrapSvg(
    "Bowtie Right Triangles SGK H.4.56",
    "Crossed right triangles BAC and BDC with common hypotenuse BC, AB = CD, diagonals intersecting at E",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">BOWTIE RIGHT TRIANGLES · HL THEOREM (SGK H.4.56)</text>

  <!-- B(110,245), C(430,245), A(190,106), D(350,106), E(270,152) -->
  ${rightAngleMark(190, 106, 110, 245, 430, 245, 13, '#38BDF8')}
  ${rightAngleMark(350, 106, 430, 245, 110, 245, 13, '#34D399')}

  <polygon points="110,245 430,245 190,106" fill="rgba(56,189,248,0.08)" stroke="#38BDF8" stroke-width="2.4"/>
  <polygon points="110,245 430,245 350,106" fill="rgba(52,211,153,0.08)" stroke="#34D399" stroke-width="2.4"/>

  <line x1="190" y1="106" x2="350" y2="106" stroke="#94A3B8" stroke-width="1.8" stroke-dasharray="4,4"/>

  ${tickMarks(110, 245, 190, 106, 1, '#FBBF24')}
  ${tickMarks(430, 245, 350, 106, 1, '#FBBF24')}

  <circle cx="110" cy="245" r="4.5" fill="#22D3EE"/><text x="95" y="255" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="430" cy="245" r="4.5" fill="#34D399"/><text x="444" y="255" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <circle cx="190" cy="106" r="4.5" fill="#22D3EE"/><text x="180" y="94" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="350" cy="106" r="4.5" fill="#34D399"/><text x="360" y="94" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">D</text>
  <circle cx="270" cy="152" r="3.5" fill="#F59E0B"/><text x="270" y="142" fill="#F59E0B" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">E</text>

  <text x="270" y="265" fill="#38BDF8" font-family="monospace" font-size="11.5" font-weight="bold" text-anchor="middle">BC (Common Hypotenuse)</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">BC common, leg AB = DC, ∠A = ∠D = 90° ⇒ △BAC = △BDC (HL) ⇒ △ABE = △DCE</text>`
  ),

  // 18. SGK 4.22 Rect Midpoint (SGK 4.22)
  math7_l15_sgk_422_rect_mid: () => wrapSvg(
    "Rectangle Midpoint LL SGK 4.22",
    "Rectangle ABCD with M midpoint of bottom side BC, segments AM and DM drawn",
    `  <rect x="105" y="14" width="330" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">RECTANGLE MIDPOINT · LL THEOREM (SGK 4.22)</text>

  <!-- A(130,95), D(410,95), B(130,245), C(410,245), M(270,245) -->
  ${rightAngleMark(130, 245, 270, 245, 130, 95, 14, '#38BDF8')}
  ${rightAngleMark(410, 245, 270, 245, 410, 95, 14, '#34D399')}

  <rect x="130" y="95" width="280" height="150" fill="none" stroke="#64748B" stroke-width="2"/>
  <polygon points="130,95 130,245 270,245" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.5"/>
  <polygon points="410,95 410,245 270,245" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.5"/>

  <!-- Segments AM and DM -->
  <line x1="130" y1="95" x2="270" y2="245" stroke="#38BDF8" stroke-width="3"/>
  <line x1="410" y1="95" x2="270" y2="245" stroke="#34D399" stroke-width="3"/>

  <!-- Ticks on BM and CM -->
  ${tickMarks(130, 245, 270, 245, 1, '#FBBF24')}
  ${tickMarks(270, 245, 410, 245, 1, '#FBBF24')}
  ${tickMarks(130, 95, 130, 245, 2, '#38BDF8')}
  ${tickMarks(410, 95, 410, 245, 2, '#38BDF8')}

  <circle cx="130" cy="95" r="4.5" fill="#22D3EE"/><text x="115" y="90" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="410" cy="95" r="4.5" fill="#34D399"/><text x="422" y="90" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">D</text>
  <circle cx="130" cy="245" r="4.5" fill="#22D3EE"/><text x="115" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="410" cy="245" r="4.5" fill="#34D399"/><text x="422" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <circle cx="270" cy="245" r="4.5" fill="#FBBF24"/><text x="270" y="265" fill="#FBBF24" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">M</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">AB = CD (rect sides), BM = CM (midpoint), ∠B = ∠C = 90° ⇒ △ABM = △DCM (LL) ⇒ AM = DM</text>`
  ),

  // 19. SBT 4.31b Bowtie (SBT 4.31b)
  math7_l15_sbt_431b_bowtie: () => wrapSvg(
    "Bowtie Vertical Angles HA SBT 4.31b",
    "Crossed right triangles EFG and KHG meeting at G with vertical angles and equal hypotenuses FG = HG",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">VERTICAL ANGLES BOWTIE · HA (SBT 4.31b)</text>

  <!-- Left: E(130,95), F(130,245), G(270,170). Right at E -->
  <!-- Right: K(410,95), H(410,245), G(270,170). Right at K -->
  ${rightAngleMark(130, 95, 130, 245, 270, 170, 13, '#38BDF8')}
  ${rightAngleMark(410, 95, 410, 245, 270, 170, 13, '#34D399')}

  ${angleArc(270, 170, 130, 95, 130, 245, 24, '#F59E0B', 'rgba(245,158,11,0.22)')}
  ${angleArc(270, 170, 410, 245, 410, 95, 24, '#F59E0B', 'rgba(245,158,11,0.22)')}

  <polygon points="130,95 130,245 270,170" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.5"/>
  <polygon points="410,95 410,245 270,170" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.5"/>

  ${tickMarks(130, 245, 270, 170, 'x', '#FB7185')}
  ${tickMarks(410, 245, 270, 170, 'x', '#FB7185')}

  <circle cx="130" cy="95" r="4.5" fill="#22D3EE"/><text x="115" y="92" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">E</text>
  <circle cx="130" cy="245" r="4.5" fill="#22D3EE"/><text x="115" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">F</text>
  <circle cx="410" cy="95" r="4.5" fill="#34D399"/><text x="424" y="92" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">K</text>
  <circle cx="410" cy="245" r="4.5" fill="#34D399"/><text x="424" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">H</text>
  <circle cx="270" cy="170" r="4.5" fill="#F59E0B"/><text x="270" y="156" fill="#F59E0B" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">G</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">Hypotenuses FG = HG, vertical ∠EGF = ∠KGH, right at E, K ⇒ △FEG = △HKG (HA)</text>`
  ),

  // 20. SBT 4.31c Overlap (SBT 4.31c)
  math7_l15_sbt_431c_overlap: () => wrapSvg(
    "Overlapping Right Triangles LA SBT 4.31c",
    "Overlapping right triangles NMO and PQO sharing acute angle O with MN = PQ",
    `  <rect x="85" y="14" width="370" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">OVERLAPPING RIGHT TRIANGLES · LA (SBT 4.31c)</text>

  <!-- O(80,240), M(330,240), N(330,115), P(362,240), Q(302,130) -->
  ${angleArc(80, 240, 330, 115, 362, 240, 36, '#F59E0B', 'rgba(245,158,11,0.25)')}
  ${rightAngleMark(330, 240, 80, 240, 330, 115, 13, '#38BDF8')}
  ${rightAngleMark(302, 130, 80, 240, 362, 240, 13, '#34D399')}

  <!-- Bottom ray -->
  <line x1="80" y1="240" x2="460" y2="240" stroke="#94A3B8" stroke-width="2"/>
  <!-- Top ray -->
  <line x1="80" y1="240" x2="420" y2="70" stroke="#94A3B8" stroke-width="2"/>

  <!-- △NMO -->
  <polygon points="80,240 330,240 330,115" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.5"/>
  <!-- △PQO -->
  <polygon points="80,240 362,240 302,130" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.5"/>

  <!-- Staggered ticks to avoid collision at intersection: MN at t=0.25 (higher up), PQ at t=0.75 (lower down) -->
  ${tickMarks(330, 240, 330, 115, 2, '#FBBF24', 0.75)}
  ${tickMarks(362, 240, 302, 130, 2, '#FBBF24', 0.25)}

  <circle cx="80" cy="240" r="4.5" fill="#22D3EE"/><text x="65" y="248" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">O</text>
  <circle cx="330" cy="240" r="4.5" fill="#38BDF8"/><text x="330" y="258" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">M</text>
  <circle cx="330" cy="115" r="4.5" fill="#38BDF8"/><text x="330" y="102" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">N</text>
  <circle cx="362" cy="240" r="4.5" fill="#34D399"/><text x="372" y="256" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">P</text>
  <circle cx="302" cy="130" r="4.5" fill="#34D399"/><text x="290" y="122" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">Q</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">∠O common, leg MN = PQ, right at M and Q ⇒ △NMO = △PQO (LA) ⇒ ON = OP</text>`
  ),

  // 21. SBT 4.31d V-Shape (SBT 4.31d)
  math7_l15_sbt_431d_vshape: () => wrapSvg(
    "V-Shaped Twin Right Triangles HL SBT 4.31d",
    "V-shaped twin right triangles XYZ and TSZ on base X-Z-S with triple ticks on hypotenuses YZ=TZ and double ticks on legs XZ=SZ",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">V-SHAPED TWINS · HL THEOREM (SBT 4.31d)</text>

  <!-- Base X-Z-S: X(110,245), Z(270,245), S(430,245) -->
  <!-- Y(110,95), T(430,95) -->
  <line x1="80" y1="245" x2="460" y2="245" stroke="#94A3B8" stroke-width="2"/>

  ${rightAngleMark(110, 245, 270, 245, 110, 95, 14, '#38BDF8')}
  ${rightAngleMark(430, 245, 270, 245, 430, 95, 14, '#34D399')}

  <polygon points="110,245 270,245 110,95" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.6"/>
  <polygon points="430,245 270,245 430,95" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.6"/>

  <!-- Legs XZ and SZ: 2 ticks -->
  ${tickMarks(110, 245, 270, 245, 2, '#34D399')}
  ${tickMarks(270, 245, 430, 245, 2, '#34D399')}

  <!-- Hypotenuses YZ and TZ: 3 ticks -->
  ${tickMarks(110, 95, 270, 245, 3, '#FBBF24')}
  ${tickMarks(430, 95, 270, 245, 3, '#FBBF24')}

  <circle cx="110" cy="245" r="4.5" fill="#22D3EE"/><text x="95" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">X</text>
  <circle cx="270" cy="245" r="4.5" fill="#FBBF24"/><text x="270" y="265" fill="#FBBF24" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">Z</text>
  <circle cx="430" cy="245" r="4.5" fill="#34D399"/><text x="444" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">S</text>
  <circle cx="110" cy="95" r="4.5" fill="#22D3EE"/><text x="95" y="90" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">Y</text>
  <circle cx="430" cy="95" r="4.5" fill="#34D399"/><text x="444" y="90" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">T</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">Hypotenuses YZ = TZ (3 ticks), legs XZ = SZ (2 ticks), right at X, S ⇒ △XYZ = △TSZ (HL)</text>`
  ),

  // 22. SBT 4.33 Perp Diagonals (SBT 4.33)
  math7_l15_sbt_433_perp_diag: () => wrapSvg(
    "Perpendicular Diagonals LL SBT 4.33",
    "Quadrilateral ABCD with diagonals AC perp BD at E, EA = EB and EC = ED",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">PERPENDICULAR DIAGONALS · LL (SBT 4.33)</text>

  <!-- E(270,175), A(175,175), C(395,175), B(270,80), D(270,270) -->
  ${rightAngleMark(270, 175, 175, 175, 270, 80, 12, '#38BDF8')}
  ${rightAngleMark(270, 175, 395, 175, 270, 270, 12, '#34D399')}

  <polygon points="175,175 270,80 395,175 270,270" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.6" stroke-linejoin="round"/>

  <!-- Diagonals AC and BD -->
  <line x1="175" y1="175" x2="395" y2="175" stroke="#E2E8F0" stroke-width="2"/>
  <line x1="270" y1="80" x2="270" y2="270" stroke="#E2E8F0" stroke-width="2"/>

  <!-- Ticks: EA = EB (1 tick), EC = ED (2 ticks) -->
  ${tickMarks(175, 175, 270, 175, 1, '#FBBF24')}
  ${tickMarks(270, 80, 270, 175, 1, '#FBBF24')}
  ${tickMarks(270, 175, 395, 175, 2, '#34D399')}
  ${tickMarks(270, 175, 270, 270, 2, '#34D399')}

  <circle cx="175" cy="175" r="4.5" fill="#22D3EE"/><text x="158" y="180" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="270" cy="80" r="4.5" fill="#22D3EE"/><text x="270" y="66" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">B</text>
  <circle cx="395" cy="175" r="4.5" fill="#34D399"/><text x="410" y="180" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <circle cx="270" cy="270" r="4.5" fill="#34D399"/><text x="270" y="288" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">D</text>
  <circle cx="270" cy="175" r="3.5" fill="#FFF"/><text x="248" y="160" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">E</text>

  <text x="270" y="302" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">EA = EB, ED = EC, right at E ⇒ △EAD = △EBC (LL) ⇒ Opposite sides AD = BC</text>`
  ),

  // 23. SBT 4.34 Square Midpoints (SBT 4.34)
  math7_l15_sbt_434_square_mid: () => wrapSvg(
    "Square Midpoints LL SBT 4.34",
    "Square ABCD with M midpoint of AB, N midpoint of AD, segments BN and CM intersecting at P",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SQUARE MIDPOINTS · LL THEOREM (SBT 4.34)</text>

  <!-- Square ABCD: A(180,80), D(360,80), B(180,260), C(360,260) -->
  <!-- M(180,170) on AB, N(270,80) on AD -->
  <!-- Intersection P(216,188) -->
  ${rightAngleMark(180, 80, 270, 80, 180, 170, 13, '#38BDF8')}
  ${rightAngleMark(180, 260, 360, 260, 180, 80, 13, '#34D399')}
  ${rightAngleMark(216, 188, 270, 80, 360, 260, 11, '#F59E0B')}

  <rect x="180" y="80" width="180" height="180" fill="none" stroke="#64748B" stroke-width="2"/>

  <!-- Segments BN and CM -->
  <line x1="180" y1="260" x2="270" y2="80" stroke="#38BDF8" stroke-width="2.6"/>
  <line x1="360" y1="260" x2="180" y2="170" stroke="#34D399" stroke-width="2.6"/>

  <!-- Midpoint ticks -->
  ${tickMarks(180, 80, 180, 170, 1, '#FBBF24')}
  ${tickMarks(180, 170, 180, 260, 1, '#FBBF24')}
  ${tickMarks(180, 80, 270, 80, 1, '#FBBF24')}
  ${tickMarks(270, 80, 360, 80, 1, '#FBBF24')}

  <circle cx="180" cy="80" r="4.5" fill="#22D3EE"/><text x="166" y="75" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">A</text>
  <circle cx="360" cy="80" r="4.5" fill="#22D3EE"/><text x="374" y="75" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">D</text>
  <circle cx="180" cy="260" r="4.5" fill="#22D3EE"/><text x="166" y="272" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">B</text>
  <circle cx="360" cy="260" r="4.5" fill="#22D3EE"/><text x="374" y="272" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">C</text>

  <circle cx="180" cy="170" r="4" fill="#FBBF24"/><text x="162" y="174" fill="#FBBF24" font-family="system-ui" font-size="12" font-weight="bold">M</text>
  <circle cx="270" cy="80" r="4" fill="#FBBF24"/><text x="270" y="68" fill="#FBBF24" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">N</text>
  <circle cx="216" cy="188" r="4.5" fill="#F59E0B"/><text x="232" y="182" fill="#F59E0B" font-family="system-ui" font-size="13" font-weight="bold">P</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">AB = BC, AN = BM, right at A, B ⇒ △BAN = △CBM (LL) ⇒ BN ⊥ CM at P</text>`
  ),

  // 24. SBT 4.36 Altitudes
  math7_l15_sbt_436_altitudes: () => wrapSvg(
    "Congruent Triangles with Altitudes SBT 4.36",
    "Congruent triangles ABC and DEF with corresponding altitudes AH perp BC and DK perp EF",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">ALTITUDES IN CONGRUENT TRIANGLES (SBT 4.36)</text>

  <!-- Left: △ABC with AH ⊥ BC. A(150,85), B(55,245), C(245,245), H(150,245) -->
  ${rightAngleMark(150, 245, 55, 245, 150, 85, 13, '#38BDF8')}
  <polygon points="150,85 55,245 245,245" fill="rgba(56,189,248,0.1)" stroke="#38BDF8" stroke-width="2.5"/>
  <line x1="150" y1="85" x2="150" y2="245" stroke="#FBBF24" stroke-width="2.4" stroke-dasharray="5,4"/>

  ${tickMarks(55, 245, 150, 85, 2, '#38BDF8')}
  ${tickMarks(150, 85, 150, 245, 1, '#FBBF24')}

  <circle cx="150" cy="85" r="4.5" fill="#22D3EE"/><text x="150" y="72" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="55" cy="245" r="4.5" fill="#22D3EE"/><text x="42" y="256" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold">B</text>
  <circle cx="245" cy="245" r="4.5" fill="#22D3EE"/><text x="256" y="256" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold">C</text>
  <circle cx="150" cy="245" r="4" fill="#FBBF24"/><text x="150" y="262" fill="#FBBF24" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">H</text>

  <!-- Right: △DEF with DK ⊥ EF. D(390,85), E(295,245), F(485,245), K(390,245) -->
  ${rightAngleMark(390, 245, 295, 245, 390, 85, 13, '#34D399')}
  <polygon points="390,85 295,245 485,245" fill="rgba(52,211,153,0.1)" stroke="#34D399" stroke-width="2.5"/>
  <line x1="390" y1="85" x2="390" y2="245" stroke="#FBBF24" stroke-width="2.4" stroke-dasharray="5,4"/>

  ${tickMarks(295, 245, 390, 85, 2, '#38BDF8')}
  ${tickMarks(390, 85, 390, 245, 1, '#FBBF24')}

  <circle cx="390" cy="85" r="4.5" fill="#34D399"/><text x="390" y="72" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold" text-anchor="middle">D</text>
  <circle cx="295" cy="245" r="4.5" fill="#34D399"/><text x="282" y="256" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold">E</text>
  <circle cx="485" cy="245" r="4.5" fill="#34D399"/><text x="496" y="256" fill="#FFF" font-family="system-ui" font-size="13.5" font-weight="bold">F</text>
  <circle cx="390" cy="245" r="4" fill="#FBBF24"/><text x="390" y="262" fill="#FBBF24" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">K</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">AB = DE (hypotenuses), AH = DK (altitudes), right at H, K ⇒ △ABH = △DEK (HL) ⇒ ∠B = ∠E</text>`
  ),

  // 25. SBT 4.39 Rect EF
  math7_l15_sbt_439_rect_ef: () => wrapSvg(
    "Rectangle Segments LL SBT 4.39",
    "Rectangle ABCD with E on AD, F on BC such that AE = CF, proving AF = CE and BE = DF",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">RECTANGLE SEGMENTS · LL THEOREM (SBT 4.39)</text>

  <!-- A(110,95), D(430,95), B(110,245), C(430,245) -->
  <!-- E(210,95) so AE=100, ED=220 -->
  <!-- F(330,245) so CF=100, BF=220 -->
  ${rightAngleMark(110, 245, 330, 245, 110, 95, 13, '#38BDF8')}
  ${rightAngleMark(430, 95, 210, 95, 430, 245, 13, '#34D399')}

  <rect x="110" y="95" width="320" height="150" fill="none" stroke="#64748B" stroke-width="2"/>

  <!-- Segments BE and DF (thin dashed) -->
  <line x1="110" y1="245" x2="210" y2="95" stroke="#94A3B8" stroke-width="1.8" stroke-dasharray="4,4"/>
  <line x1="430" y1="95" x2="330" y2="245" stroke="#94A3B8" stroke-width="1.8" stroke-dasharray="4,4"/>

  <!-- Segments AF and CE (bold highlighted) -->
  <line x1="110" y1="95" x2="330" y2="245" stroke="#38BDF8" stroke-width="3"/>
  <line x1="430" y1="245" x2="210" y2="95" stroke="#34D399" stroke-width="3"/>

  <!-- Ticks: AE = CF (1 tick) -->
  ${tickMarks(110, 95, 210, 95, 1, '#FBBF24')}
  ${tickMarks(330, 245, 430, 245, 1, '#FBBF24')}
  <!-- BF = DE (2 ticks) -->
  ${tickMarks(110, 245, 330, 245, 2, '#34D399')}
  ${tickMarks(210, 95, 430, 95, 2, '#34D399')}

  <circle cx="110" cy="95" r="4.5" fill="#22D3EE"/><text x="95" y="90" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="430" cy="95" r="4.5" fill="#34D399"/><text x="444" y="90" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">D</text>
  <circle cx="110" cy="245" r="4.5" fill="#22D3EE"/><text x="95" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="430" cy="245" r="4.5" fill="#34D399"/><text x="444" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>

  <circle cx="210" cy="95" r="4" fill="#FBBF24"/><text x="210" y="82" fill="#FBBF24" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">E</text>
  <circle cx="330" cy="245" r="4" fill="#FBBF24"/><text x="330" y="265" fill="#FBBF24" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">F</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">AE = CF ⇒ BF = DE; AB = CD, right at B, D ⇒ △ABF = △CDE (LL) ⇒ AF = CE</text>`
  ),

  // 26. SBT 4.40 Perpendicular Cross (SBT 4.40)
  math7_l15_sbt_440_perp_cross: () => wrapSvg(
    "Perpendicular Cross LL SBT 4.40",
    "Right angle at D on line B-D-C with DA=DC, DB=DE, CE extended cuts AB perpendicularly at F",
    `  <rect x="95" y="14" width="350" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">PERPENDICULAR EXTENSION · LL (SBT 4.40)</text>

  <!-- Horizontal line B-D-C: D(220,245), B(130,245), C(360,245) -->
  <!-- DA=DC=140 => A(220,105) -->
  <!-- DB=DE=90 => E(220,155) -->
  <!-- Line AB intersects CE extended at F(197.3, 140.4) -->
  <line x1="100" y1="245" x2="390" y2="245" stroke="#94A3B8" stroke-width="2"/>
  <line x1="220" y1="245" x2="220" y2="80" stroke="#94A3B8" stroke-width="2"/>

  ${rightAngleMark(220, 245, 130, 245, 220, 105, 13, '#38BDF8')}
  ${rightAngleMark(220, 245, 360, 245, 220, 155, 13, '#34D399')}
  ${rightAngleMark(197.3, 140.4, 220, 105, 360, 245, 11, '#F59E0B')}

  <!-- Triangles ADB and CDE -->
  <polygon points="130,245 220,245 220,105" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" stroke-width="2.5"/>
  <polygon points="360,245 220,245 220,155" fill="rgba(52,211,153,0.12)" stroke="#34D399" stroke-width="2.5"/>

  <!-- Line CF ending cleanly just past F -->
  <line x1="360" y1="245" x2="185" y2="132" stroke="#F59E0B" stroke-width="2.6"/>

  <!-- Ticks: DA = DC (1 tick, placed on upper DA at y=130 and on DC at x=290) -->
  ${tickMarks(220, 155, 220, 105, 1, '#FBBF24')}
  ${tickMarks(220, 245, 360, 245, 1, '#FBBF24')}
  <!-- DB = DE (2 ticks, placed on DB at x=175 and on DE at y=200) -->
  ${tickMarks(130, 245, 220, 245, 2, '#38BDF8')}
  ${tickMarks(220, 245, 220, 155, 2, '#38BDF8')}

  <circle cx="220" cy="245" r="4.5" fill="#FFF"/><text x="228" y="260" fill="#FFF" font-family="system-ui" font-size="13" font-weight="bold">D</text>
  <circle cx="130" cy="245" r="4.5" fill="#22D3EE"/><text x="115" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <circle cx="360" cy="245" r="4.5" fill="#34D399"/><text x="374" y="258" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C</text>
  <circle cx="220" cy="105" r="4.5" fill="#22D3EE"/><text x="220" y="92" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="220" cy="155" r="4.5" fill="#34D399"/><text x="232" y="160" fill="#34D399" font-family="system-ui" font-size="13" font-weight="bold">E</text>
  <circle cx="197.3" cy="140.4" r="4.5" fill="#F59E0B"/><text x="180" y="152" fill="#F59E0B" font-family="system-ui" font-size="13" font-weight="bold">F</text>

  <text x="270" y="298" fill="#94A3B8" font-family="system-ui" font-size="11.5" text-anchor="middle">DA = DC, DB = DE, right at D ⇒ △ADB = △CDE (LL) ⇒ ∠A = ∠C ⇒ CF ⊥ AB at F</text>`
  )
};

let count = 0;
for (const [name, fn] of Object.entries(svgs)) {
  const filePath = path.join(SVG_DIR, `${name}.svg`);
  fs.writeFileSync(filePath, fn(), 'utf8');
  count++;
}
console.log(`✅ Generated ${count} Lesson 15 SVG diagrams in ${SVG_DIR}`);
