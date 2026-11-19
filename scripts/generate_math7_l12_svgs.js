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

const svgs = {
  // Q2: Triangle ABC with A=50, B=60, find C=70 (SGK H.4.4a)
  math7_l12_q2_triangle_abc: () => wrapSvg(
    "Q2: Triangle Angle Sum Telemetry",
    "Triangle ABC with A=50 deg, B=60 deg, find angle C",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 1 · TRIANGLE ANGLE SUM</text>
  <!-- Triangle ABC: A(220, 80), B(100, 230), C(420, 230) -->
  <polygon points="220,80 100,230 420,230" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="220" cy="80" r="5" fill="#22D3EE"/><text x="220" y="65" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">A (50°)</text>
  <circle cx="100" cy="230" r="5" fill="#22D3EE"/><text x="80" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B (60°)</text>
  <circle cx="420" cy="230" r="5" fill="#22D3EE"/><text x="435" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Labels -->
  <text x="140" y="215" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">60°</text>
  <text x="210" y="115" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">50°</text>
  <text x="330" y="210" fill="#34D399" font-family="monospace" font-size="14" font-weight="bold">∠C = ?</text>`
  ),

  // Q3: Triangle DEF with E=30, F=50, find D=100 (SGK H.4.4b)
  math7_l12_q3_triangle_obtuse: () => wrapSvg(
    "Q3: Obtuse Triangle Telemetry",
    "Triangle DEF with E=30 deg, F=50 deg, find angle D",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 1 · OBTUSE TRIANGLE CALCULATION</text>
  <!-- Triangle DEF: D(180, 230), F(150, 90), E(450, 230) -->
  <polygon points="180,230 150,90 450,230" fill="rgba(244,63,94,0.12)" stroke="#FB7185" stroke-width="3"/>
  <circle cx="150" cy="90" r="5" fill="#22D3EE"/><text x="140" y="75" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">F (50°)</text>
  <circle cx="180" cy="230" r="5" fill="#22D3EE"/><text x="175" y="255" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">D</text>
  <circle cx="450" cy="230" r="5" fill="#22D3EE"/><text x="465" y="235" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">E (30°)</text>
  <!-- Labels -->
  <text x="165" y="120" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">50°</text>
  <text x="195" y="215" fill="#FB7185" font-family="monospace" font-size="14" font-weight="bold">∠D = ?</text>
  <text x="390" y="220" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">30°</text>`
  ),

  // Q5: Triangle with 120 and 35 deg, find x = 25 deg (SGK H.4.6a)
  math7_l12_q5_triangle_angles_sgk46a: () => wrapSvg(
    "Q5: Variable Angle Telemetry x",
    "Triangle with obtuse angle 120 deg, angle 35 deg, find x",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 1 · UNKNOWN ANGLE COMPUTATION</text>
  <!-- Polygon: (140, 90), (220, 220), (450, 220) -->
  <polygon points="140,90 220,220 450,220" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="140" cy="90" r="5" fill="#22D3EE"/><text x="135" y="75" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">x = ?</text>
  <circle cx="220" cy="220" r="5" fill="#22D3EE"/><text x="200" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">120°</text>
  <circle cx="450" cy="220" r="5" fill="#22D3EE"/><text x="465" y="225" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">35°</text>
  <!-- Arcs -->
  <text x="155" y="125" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">x</text>
  <text x="245" y="205" fill="#FB7185" font-family="monospace" font-size="13" font-weight="bold">120°</text>
  <text x="390" y="210" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">35°</text>`
  ),

  // Q6: Classify Right Triangle (SGK H.4.7a / SBT H.4.4a)
  math7_l12_q6_classify_right: () => wrapSvg(
    "Q6: Triangle Classification - Right",
    "Triangle ABC with angles 50 and 40 deg, 3rd angle is 90 deg",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 2 · CLASSIFY BY ANGLES: RIGHT</text>
  <!-- Right Triangle: B(120, 230), A(120, 90), C(380, 230) -->
  <polygon points="120,230 120,90 380,230" fill="rgba(16,185,129,0.12)" stroke="#34D399" stroke-width="3"/>
  <circle cx="120" cy="90" r="5" fill="#22D3EE"/><text x="100" y="85" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A (50°)</text>
  <circle cx="120" cy="230" r="5" fill="#22D3EE"/><text x="95" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <circle cx="380" cy="230" r="5" fill="#22D3EE"/><text x="395" y="235" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C (40°)</text>
  <!-- Right Angle Square -->
  <path d="M 120 215 L 135 215 L 135 230" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <text x="145" y="115" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">50°</text>
  <text x="325" y="215" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">40°</text>
  <text x="150" y="200" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">90°</text>`
  ),

  // Q7: Classify Acute Triangle (SGK H.4.7b)
  math7_l12_q7_classify_acute: () => wrapSvg(
    "Q7: Triangle Classification - Acute",
    "Triangle DEF with angles 55 and 63 deg, 3rd angle is 62 deg",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 2 · CLASSIFY BY ANGLES: ACUTE</text>
  <!-- Triangle DEF: D(260, 85), E(120, 230), F(400, 230) -->
  <polygon points="260,85 120,230 400,230" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="260" cy="85" r="5" fill="#22D3EE"/><text x="260" y="70" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">D (62°)</text>
  <circle cx="120" cy="230" r="5" fill="#22D3EE"/><text x="95" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">E</text>
  <circle cx="400" cy="230" r="5" fill="#22D3EE"/><text x="415" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">F</text>
  <text x="155" y="215" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">55°</text>
  <text x="345" y="215" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">63°</text>
  <text x="260" y="125" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">62°</text>`
  ),

  // Q8: Classify Obtuse Triangle (SGK H.4.7c)
  math7_l12_q8_classify_obtuse: () => wrapSvg(
    "Q8: Triangle Classification - Obtuse",
    "Triangle MNP with angles 50 and 30 deg, 3rd angle is 100 deg",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 2 · CLASSIFY BY ANGLES: OBTUSE</text>
  <!-- Triangle MNP: M(140, 90), N(170, 230), P(450, 230) -->
  <polygon points="140,90 170,230 450,230" fill="rgba(244,63,94,0.12)" stroke="#FB7185" stroke-width="3"/>
  <circle cx="140" cy="90" r="5" fill="#22D3EE"/><text x="130" y="75" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">M (50°)</text>
  <circle cx="170" cy="230" r="5" fill="#22D3EE"/><text x="160" y="255" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">N (100°)</text>
  <circle cx="450" cy="230" r="5" fill="#22D3EE"/><text x="465" y="235" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">P (30°)</text>
  <text x="155" y="120" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">50°</text>
  <text x="195" y="215" fill="#FB7185" font-family="monospace" font-size="13" font-weight="bold">100°</text>
  <text x="390" y="215" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">30°</text>`
  ),

  // Q11: Right Triangle angle calc (SGK H.4.6c)
  math7_l12_q11_right_triangle_calc: () => wrapSvg(
    "Q11: Right Triangle Angle Calculation",
    "Right triangle MNP with right angle at M, N=55 deg, find P",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 3 · RIGHT TRIANGLE COMPLEMENTARY</text>
  <!-- Right Triangle: M(270, 90), N(120, 230), P(420, 230) where angle M is 90 deg -->
  <polygon points="270,90 120,230 420,230" fill="rgba(16,185,129,0.12)" stroke="#34D399" stroke-width="3"/>
  <circle cx="270" cy="90" r="5" fill="#22D3EE"/><text x="270" y="70" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">M (90°)</text>
  <circle cx="120" cy="230" r="5" fill="#22D3EE"/><text x="95" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">N</text>
  <circle cx="420" cy="230" r="5" fill="#22D3EE"/><text x="435" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">P</text>
  <!-- Right angle at M -->
  <path d="M 258 101 L 269 113 L 281 101" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <text x="160" y="215" fill="#38BDF8" font-family="monospace" font-size="14" font-weight="bold">55°</text>
  <text x="350" y="215" fill="#F59E0B" font-family="monospace" font-size="14" font-weight="bold">∠P = ?</text>`
  ),

  // Q12: Right triangle legs & hypotenuse anatomy
  math7_l12_q12_right_triangle_legs: () => wrapSvg(
    "Q12: Right Triangle Anatomy",
    "Right triangle ABC at A with legs AB, AC and hypotenuse BC",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 3 · RIGHT TRIANGLE ANATOMY</text>
  <!-- Triangle right at A(140, 230), B(140, 80), C(420, 230) -->
  <polygon points="140,230 140,80 420,230" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="140" cy="230" r="5" fill="#22D3EE"/><text x="120" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="140" cy="80" r="5" fill="#22D3EE"/><text x="120" y="80" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <circle cx="420" cy="230" r="5" fill="#22D3EE"/><text x="435" y="235" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Right angle at A -->
  <path d="M 140 214 L 156 214 L 156 230" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <!-- Labels -->
  <text x="100" y="160" fill="#F59E0B" font-family="system-ui" font-size="13" font-weight="bold">LEG AB</text>
  <text x="260" y="255" fill="#F59E0B" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">LEG AC</text>
  <text x="310" y="145" fill="#34D399" font-family="system-ui" font-size="13" font-weight="bold">HYPOTENUSE BC</text>`
  ),

  // Q13: Right triangle elevation angle
  math7_l12_q13_right_triangle_elevation: () => wrapSvg(
    "Q13: Space Elevation Angle Telemetry",
    "Ground tracking station right triangle with angle 28 deg",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 3 · GROUND TRACKING ELEVATION</text>
  <polygon points="120,230 400,230 400,80" fill="rgba(16,185,129,0.12)" stroke="#34D399" stroke-width="3"/>
  <circle cx="120" cy="230" r="5" fill="#22D3EE"/><text x="90" y="235" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">RADAR</text>
  <circle cx="400" cy="230" r="5" fill="#22D3EE"/><text x="415" y="235" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">BASE</text>
  <circle cx="400" cy="80" r="5" fill="#22D3EE"/><text x="415" y="85" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">SATELLITE</text>
  <!-- Right angle at base -->
  <path d="M 385 230 L 385 215 L 400 215" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <text x="175" y="220" fill="#F59E0B" font-family="monospace" font-size="14" font-weight="bold">28°</text>
  <text x="345" y="125" fill="#38BDF8" font-family="monospace" font-size="14" font-weight="bold">θ = ?</text>`
  ),

  // Q16: Exterior Angle Definition (SGK H.4.5)
  math7_l12_q16_exterior_angle_def: () => wrapSvg(
    "Q16: Exterior Angle Theorem",
    "Triangle ABC with exterior angle ACx = A + B",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 4 · EXTERIOR ANGLE THEOREM</text>
  <!-- Triangle ABC: B(100, 220), A(220, 80), C(340, 220) -->
  <polygon points="100,220 220,80 340,220" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <!-- Extended ray Cx to (480, 220) -->
  <line x1="340" y1="220" x2="480" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="490" y="225" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">x</text>
  <circle cx="220" cy="80" r="5" fill="#22D3EE"/><text x="220" y="65" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="100" cy="220" r="5" fill="#22D3EE"/><text x="80" y="225" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <circle cx="340" cy="220" r="5" fill="#22D3EE"/><text x="335" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Exterior angle arc -->
  <path d="M 340 220 L 380 220 A 40 40 0 0 0 365 173 Z" fill="rgba(245,158,11,0.25)" stroke="#F59E0B" stroke-width="2"/>
  <text x="390" y="195" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">∠ACx = ∠A + ∠B</text>`
  ),

  // Q17: SGK 4.3 / H.4.8 Exterior with 120 and A=80
  math7_l12_q17_exterior_sgk48: () => wrapSvg(
    "Q17: Multi-Angle Exterior Telemetry",
    "Triangle with exterior angle 120 deg and angle A=80 deg, find x, y, z",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 4 · MULTI-ANGLE TELEMETRY</text>
  <!-- Baseline through B and C -->
  <line x1="60" y1="210" x2="480" y2="210" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <!-- Triangle ABC: A(220, 80), B(150, 210), C(320, 210) -->
  <polygon points="220,80 150,210 320,210" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="2.5"/>
  <circle cx="220" cy="80" r="5" fill="#22D3EE"/><text x="220" y="65" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">A (80°)</text>
  <circle cx="150" cy="210" r="5" fill="#22D3EE"/><text x="145" y="235" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <circle cx="320" cy="210" r="5" fill="#22D3EE"/><text x="320" y="235" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Exterior angle 120 at B -->
  <text x="95" y="195" fill="#F59E0B" font-family="monospace" font-size="14" font-weight="bold">120°</text>
  <text x="165" y="195" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">x</text>
  <text x="290" y="195" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">y</text>`
  ),

  // Q18: SBT 4.3 / H.4.5 Exterior 100 deg and top 50 deg
  math7_l12_q18_exterior_sbt45: () => wrapSvg(
    "Q18: Exterior Angle Equation",
    "Triangle with exterior angle 100 deg and vertex 50 deg, find x and y",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 4 · EXTERIOR ANGLE EQUATION</text>
  <line x1="60" y1="220" x2="480" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <!-- Triangle: A(140, 80), B(120, 220), C(250, 220) -->
  <polygon points="140,80 120,220 250,220" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="2.5"/>
  <circle cx="140" cy="80" r="5" fill="#22D3EE"/><text x="140" y="65" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">50°</text>
  <circle cx="120" cy="220" r="5" fill="#22D3EE"/>
  <circle cx="250" cy="220" r="5" fill="#22D3EE"/>
  <text x="75" y="210" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">100°</text>
  <text x="135" y="210" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">x</text>
  <text x="265" y="210" fill="#FB7185" font-family="monospace" font-size="13" font-weight="bold">y</text>`
  ),

  // Q21: SBT 4.4 / H.4.6 Algebraic exterior angle 8x and C = x, A = 105
  math7_l12_q21_algebraic_sbt46: () => wrapSvg(
    "Q21: Algebraic Angle Telemetry",
    "Triangle ABC with A=105 deg, exterior at B is 8x, angle C is x",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 5 · ALGEBRAIC EXTERIOR TELEMETRY</text>
  <!-- Line through base B and C -->
  <line x1="80" y1="210" x2="480" y2="210" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <!-- Triangle ABC: A(180, 90), B(150, 210), C(420, 210) -->
  <polygon points="180,90 150,210 420,210" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="2.5"/>
  <circle cx="180" cy="90" r="5" fill="#22D3EE"/><text x="180" y="75" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">A (105°)</text>
  <circle cx="150" cy="210" r="5" fill="#22D3EE"/><text x="145" y="235" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <circle cx="420" cy="210" r="5" fill="#22D3EE"/><text x="420" y="235" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Exterior 8x at B -->
  <text x="120" y="195" fill="#F59E0B" font-family="monospace" font-size="14" font-weight="bold">8x</text>
  <text x="375" y="200" fill="#34D399" font-family="monospace" font-size="14" font-weight="bold">x</text>`
  ),

  // Q22: Ratio 2x, 3x, 4x
  math7_l12_q22_ratio_2x3x4x: () => wrapSvg(
    "Q22: Angle Ratio Telemetry",
    "Triangle with angles in ratio 2x, 3x, 4x summing to 180 deg",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 5 · ANGLE RATIO FORMULATION</text>
  <polygon points="230,80 110,230 430,230" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="230" cy="80" r="5" fill="#22D3EE"/><text x="230" y="65" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">4x</text>
  <circle cx="110" cy="230" r="5" fill="#22D3EE"/><text x="90" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">2x</text>
  <circle cx="430" cy="230" r="5" fill="#22D3EE"/><text x="445" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">3x</text>
  <text x="270" y="160" fill="#34D399" font-family="monospace" font-size="15" font-weight="bold" text-anchor="middle">2x + 3x + 4x = 180°</text>`
  ),

  // Q25: SBT 4.9 Ratio A = B = 2C
  math7_l12_q25_ratio_sbt49: () => wrapSvg(
    "Q25: Isosceles Ratio Telemetry A=B=2C",
    "Triangle ABC where A = B = 2C (72, 72, 36 deg)",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 5 · HARMONIC ANGLE RATIO</text>
  <!-- Tall acute triangle: C(270, 70), A(140, 230), B(400, 230) -->
  <polygon points="270,70 140,230 400,230" fill="rgba(16,185,129,0.12)" stroke="#34D399" stroke-width="3"/>
  <circle cx="270" cy="70" r="5" fill="#22D3EE"/><text x="270" y="55" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">C</text>
  <circle cx="140" cy="230" r="5" fill="#22D3EE"/><text x="120" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="400" cy="230" r="5" fill="#22D3EE"/><text x="415" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <text x="270" y="105" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">C = ?</text>
  <text x="175" y="215" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">A = 2C</text>
  <text x="335" y="215" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">B = 2C</text>`
  ),

  // Q27: SBT 4.5 / H.4.7 Intersecting lines with 60 and 80 deg
  math7_l12_q27_intersecting_lines_sbt47: () => wrapSvg(
    "Q27: Intersecting Vectors Telemetry",
    "Lines intersecting forming triangle with angles 60 and 80 deg, find x",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 6 · INTERSECTING FLIGHT PATHS</text>
  <line x1="80" y1="200" x2="460" y2="200" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <!-- Slanted lines intersecting below -->
  <line x1="140" y1="90" x2="280" y2="250" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="400" y1="90" x2="240" y2="250" stroke="#C4B5FD" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="260" cy="230" r="5" fill="#22D3EE"/><text x="260" y="255" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">80°</text>
  <text x="180" y="190" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">60°</text>
  <text x="330" y="215" fill="#FB7185" font-family="monospace" font-size="14" font-weight="bold">x = ?</text>`
  ),

  // Q31: SBT 4.8 / H.4.8 Quadrilateral split by diagonal BD
  math7_l12_q31_quadrilateral_sbt48: () => wrapSvg(
    "Q31: Composite Quadrilateral Telemetry",
    "Quadrilateral ABCD split by diagonal BD, calculate sum A + C",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 7 · DUAL TRIANGLE COMPOSITE</text>
  <!-- Quadrilateral: A(140, 90), B(360, 75), C(410, 230), D(130, 210) -->
  <polygon points="140,90 360,75 410,230 130,210" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <!-- Diagonal BD -->
  <line x1="360" y1="75" x2="130" y2="210" stroke="#F59E0B" stroke-width="2" stroke-dasharray="6,4"/>
  <circle cx="140" cy="90" r="5" fill="#22D3EE"/><text x="120" y="85" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="360" cy="75" r="5" fill="#22D3EE"/><text x="375" y="70" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <circle cx="410" cy="230" r="5" fill="#22D3EE"/><text x="425" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <circle cx="130" cy="210" r="5" fill="#22D3EE"/><text x="110" y="225" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">D</text>
  <!-- Angles in ABD: ABD=30, ADB=50 -->
  <text x="300" y="95" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">30°</text>
  <text x="160" y="180" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">50°</text>
  <!-- Angles in BCD: DBC=70, BDC=40 -->
  <text x="345" y="130" fill="#34D399" font-family="monospace" font-size="12" font-weight="bold">70°</text>
  <text x="195" y="200" fill="#34D399" font-family="monospace" font-size="12" font-weight="bold">40°</text>`
  ),

  // Q32: Bowtie / Hourglass Triangles with vertical angles
  math7_l12_q32_star_bowtie: () => wrapSvg(
    "Q32: Bowtie Invariant Angle Sum",
    "Hourglass triangles ABO and CDO with vertical angles at O",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 7 · BOWTIE ANGLE INVARIANT</text>
  <!-- Triangle ABO and CDO intersecting at O(270, 160) -->
  <line x1="120" y1="90" x2="420" y2="230" stroke="#38BDF8" stroke-width="2.5"/>
  <line x1="120" y1="230" x2="420" y2="90" stroke="#38BDF8" stroke-width="2.5"/>
  <line x1="120" y1="90" x2="120" y2="230" stroke="#F59E0B" stroke-width="3"/>
  <line x1="420" y1="90" x2="420" y2="230" stroke="#F59E0B" stroke-width="3"/>
  <circle cx="120" cy="90" r="5" fill="#22D3EE"/><text x="100" y="85" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="120" cy="230" r="5" fill="#22D3EE"/><text x="100" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <circle cx="270" cy="160" r="5" fill="#22D3EE"/><text x="270" y="140" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">O</text>
  <circle cx="420" cy="90" r="5" fill="#22D3EE"/><text x="435" y="85" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <circle cx="420" cy="230" r="5" fill="#22D3EE"/><text x="435" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">D</text>
  <text x="270" y="200" fill="#34D399" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">∠A + ∠B = ∠C + ∠D</text>`
  ),

  // Q34: Parallel Cut Triangle DE || BC
  math7_l12_q34_parallel_cut_triangle: () => wrapSvg(
    "Q34: Parallel Line Cutting Triangle",
    "Triangle ABC with segment DE parallel to BC",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 7 · PARALLEL TRAVERSAL HARMONY</text>
  <!-- Triangle ABC: A(260, 75), B(110, 230), C(410, 230) -->
  <polygon points="260,75 110,230 410,230" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <!-- Parallel line DE at y=155 -->
  <line x1="185" y1="152" x2="335" y2="152" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <circle cx="260" cy="75" r="5" fill="#22D3EE"/><text x="260" y="60" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">A (55°)</text>
  <circle cx="185" cy="152" r="5" fill="#22D3EE"/><text x="165" y="150" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">D</text>
  <circle cx="335" cy="152" r="5" fill="#22D3EE"/><text x="350" y="150" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">E</text>
  <circle cx="110" cy="230" r="5" fill="#22D3EE"/><text x="90" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B (65°)</text>
  <circle cx="410" cy="230" r="5" fill="#22D3EE"/><text x="425" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <text x="260" y="140" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">DE ∥ BC</text>`
  ),

  // Q39: Formal Proof with Auxiliary Parallel Line (SGK H.4.3)
  math7_l12_q39_proof_parallel_auxiliary: () => wrapSvg(
    "Q39: Fundamental Angle Sum Proof",
    "Triangle ABC with auxiliary line xy parallel to BC through vertex A",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 8 · FORMAL ANGLE SUM PROOF</text>
  <!-- Triangle ABC: A(260, 95), B(130, 230), C(390, 230) -->
  <polygon points="260,95 130,230 390,230" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <!-- Auxiliary line xy through A parallel to BC: from (70, 95) to (450, 95) -->
  <line x1="70" y1="95" x2="450" y2="95" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6,4" stroke-linecap="round"/>
  <text x="60" y="90" fill="#F59E0B" font-family="system-ui" font-size="16" font-weight="bold">x</text>
  <text x="460" y="90" fill="#F59E0B" font-family="system-ui" font-size="16" font-weight="bold">y</text>
  <!-- Vertices -->
  <circle cx="260" cy="95" r="5" fill="#22D3EE"/><text x="260" y="75" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">A</text>
  <circle cx="130" cy="230" r="5" fill="#22D3EE"/><text x="110" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <circle cx="390" cy="230" r="5" fill="#22D3EE"/><text x="405" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Angles at A -->
  <text x="195" y="90" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">∠BAx</text>
  <text x="305" y="90" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">∠CAy</text>
  <text x="155" y="215" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">∠B</text>
  <text x="350" y="215" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">∠C</text>`
  )
};

console.log('Writing Lesson 12 SVGs to:', SVG_DIR);
let count = 0;
for (const [name, generator] of Object.entries(svgs)) {
  const filePath = path.join(SVG_DIR, `${name}.svg`);
  fs.writeFileSync(filePath, generator(), 'utf8');
  count++;
}
console.log(`✅ Successfully generated ${count} Lesson 12 SVG files.`);
