const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // keithley
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  SUBJECT_ID: 'e89cc834-99d0-40b7-ab5e-0a0838d273c4', // Grade 7 Math
  ASSIGNED_DATE: '2026-11-12'
};

const SVG_DIR = path.resolve(__dirname, '../frontend/public/images/geometry');
fs.mkdirSync(SVG_DIR, { recursive: true });

// Helper to generate dark cosmic SVG wrapper
function wrapSvg(title, desc, innerContent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 320" width="100%" height="280" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">${desc}</desc>
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
  <rect width="540" height="320" rx="18" fill="url(#bgGrad)" stroke="#06B6D4" stroke-width="1.5" stroke-opacity="0.3"/>
${innerContent}
</svg>`;
}

// 25 SVG Generators
const svgGenerators = {
  // Q1: Horizontal parallel lines a || b, transversal c, angle A3 = 62 deg
  q1: () => wrapSvg(
    "Q1: Alternate Interior Angles",
    "Lines a and b parallel, transversal c, alternate interior angle A3 = 62 deg",
    `  <!-- Banner -->
  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">a ∥ b · ALTERNATE INTERIOR ANGLES</text>
  <!-- Interior Zone -->
  <rect x="35" y="100" width="470" height="120" fill="#0C2135" fill-opacity="0.45" rx="6"/>
  <!-- Lines a and b -->
  <line x1="35" y1="100" x2="505" y2="100" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="512" y="105" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">a</text>
  <line x1="35" y1="220" x2="505" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="512" y="225" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">b</text>
  <!-- Transversal c -->
  <line x1="195" y1="285" x2="335" y2="35" stroke="#C4B5FD" stroke-width="3" stroke-linecap="round"/>
  <text x="340" y="45" fill="#C4B5FD" font-family="system-ui" font-size="15" font-weight="bold">c</text>
  <!-- Intersections -->
  <circle cx="288" cy="100" r="5" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="298" y="90" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
  <circle cx="232" cy="220" r="5" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="212" y="240" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
  <!-- Arcs -->
  <path d="M 288 100 L 258 100 A 30 30 0 0 1 274 126 Z" fill="rgba(6,182,212,0.3)" stroke="#06B6D4" stroke-width="2"/>
  <text x="220" y="125" fill="#06B6D4" font-family="monospace" font-size="13" font-weight="bold">A₃ = 62°</text>
  <path d="M 232 220 L 262 220 A 30 30 0 0 0 246 194 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="270" y="205" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">B₁ = ?</text>`
  ),

  // Q2: Horizontal parallel lines m || n, transversal t slanting left, corresponding M1 = 118 deg
  q2: () => wrapSvg(
    "Q2: Corresponding Angles",
    "Lines m and n parallel, transversal t, corresponding angle M1 = 118 deg",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">m ∥ n · CORRESPONDING ANGLES</text>
  <line x1="35" y1="100" x2="505" y2="100" stroke="#34D399" stroke-width="3" stroke-linecap="round"/>
  <text x="512" y="105" fill="#34D399" font-family="system-ui" font-size="16" font-weight="bold">m</text>
  <line x1="35" y1="220" x2="505" y2="220" stroke="#34D399" stroke-width="3" stroke-linecap="round"/>
  <text x="512" y="225" fill="#34D399" font-family="system-ui" font-size="16" font-weight="bold">n</text>
  <!-- Transversal slanting left -->
  <line x1="345" y1="285" x2="195" y2="35" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <text x="185" y="45" fill="#F59E0B" font-family="system-ui" font-size="15" font-weight="bold">t</text>
  <circle cx="234" cy="100" r="5" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="215" y="90" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">M</text>
  <circle cx="306" cy="220" r="5" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="285" y="240" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">N</text>
  <!-- Top-right corresponding arcs -->
  <path d="M 234 100 L 264 100 A 30 30 0 0 0 252 70 Z" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" stroke-width="2"/>
  <text x="272" y="85" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">M₁ = 118°</text>
  <path d="M 306 220 L 336 220 A 30 30 0 0 0 324 190 Z" fill="rgba(236,72,153,0.3)" stroke="#F472B6" stroke-width="2"/>
  <text x="344" y="205" fill="#F472B6" font-family="monospace" font-size="13" font-weight="bold">N₁ = ?</text>`
  ),

  // Q3: Lines p || q, transversal k, consecutive interior angle P4 = 74 deg
  q3: () => wrapSvg(
    "Q3: Consecutive Interior Angles",
    "Lines p and q parallel, consecutive interior angle P4 = 74 deg",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">p ∥ q · CONSECUTIVE INTERIOR ANGLES</text>
  <rect x="35" y="100" width="470" height="120" fill="#0C2135" fill-opacity="0.45" rx="6"/>
  <line x1="35" y1="100" x2="505" y2="100" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="512" y="105" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">p</text>
  <line x1="35" y1="220" x2="505" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="512" y="225" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">q</text>
  <line x1="200" y1="285" x2="340" y2="35" stroke="#C4B5FD" stroke-width="3" stroke-linecap="round"/>
  <text x="345" y="45" fill="#C4B5FD" font-family="system-ui" font-size="15" font-weight="bold">k</text>
  <circle cx="292" cy="100" r="5" fill="#22D3EE"/>
  <text x="305" y="90" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">P</text>
  <circle cx="236" cy="220" r="5" fill="#22D3EE"/>
  <text x="215" y="240" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">Q</text>
  <!-- P4: bottom-right of P -->
  <path d="M 292 100 L 322 100 A 30 30 0 0 1 306 126 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="330" y="125" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">P₄ = 74°</text>
  <!-- Q1: top-right of Q -->
  <path d="M 236 220 L 266 220 A 30 30 0 0 0 250 194 Z" fill="rgba(6,182,212,0.3)" stroke="#06B6D4" stroke-width="2"/>
  <text x="275" y="205" fill="#06B6D4" font-family="monospace" font-size="13" font-weight="bold">Q₁ = ?</text>`
  ),

  // Q4: Vertical parallel lines x || y cut by slanted transversal
  q4: () => wrapSvg(
    "Q4: Vertical Parallel Lines",
    "Vertical parallel lines x and y cut by slanted line d",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">VERTICAL LINES x ∥ y</text>
  <!-- Vertical lines -->
  <line x1="180" y1="50" x2="180" y2="280" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="175" y="298" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">x</text>
  <line x1="360" y1="50" x2="360" y2="280" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="355" y="298" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">y</text>
  <!-- Slanted transversal d -->
  <line x1="80" y1="80" x2="460" y2="260" stroke="#C4B5FD" stroke-width="3" stroke-linecap="round"/>
  <text x="468" y="275" fill="#C4B5FD" font-family="system-ui" font-size="15" font-weight="bold">d</text>
  <circle cx="180" cy="127" r="5" fill="#22D3EE"/>
  <text x="160" y="120" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">X</text>
  <circle cx="360" cy="213" r="5" fill="#22D3EE"/>
  <text x="375" y="225" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">Y</text>
  <!-- Angle at X -->
  <path d="M 180 127 L 180 157 A 30 30 0 0 1 155 115 Z" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" stroke-width="2"/>
  <text x="195" y="155" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">X₁ = 55°</text>
  <!-- Target alternate angle at Y -->
  <path d="M 360 213 L 360 183 A 30 30 0 0 1 385 225 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="310" y="195" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">Y₂ = ?</text>`
  ),

  // Q5: Diagonal parallel lines r || s cut by horizontal line h
  q5: () => wrapSvg(
    "Q5: Tilted Parallel Lines",
    "Diagonal lines r and s cut by horizontal beam h",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">DIAGONAL RAILS r ∥ s</text>
  <!-- Diagonal lines r and s -->
  <line x1="80" y1="270" x2="300" y2="50" stroke="#34D399" stroke-width="3" stroke-linecap="round"/>
  <text x="305" y="60" fill="#34D399" font-family="system-ui" font-size="15" font-weight="bold">r</text>
  <line x1="220" y1="270" x2="440" y2="50" stroke="#34D399" stroke-width="3" stroke-linecap="round"/>
  <text x="445" y="60" fill="#34D399" font-family="system-ui" font-size="15" font-weight="bold">s</text>
  <!-- Horizontal transversal h -->
  <line x1="50" y1="160" x2="490" y2="160" stroke="#C4B5FD" stroke-width="3" stroke-linecap="round"/>
  <text x="498" y="165" fill="#C4B5FD" font-family="system-ui" font-size="15" font-weight="bold">h</text>
  <circle cx="190" cy="160" r="5" fill="#22D3EE"/>
  <circle cx="330" cy="160" r="5" fill="#22D3EE"/>
  <!-- Angles alpha and beta -->
  <path d="M 190 160 L 220 160 A 30 30 0 0 0 170 140 Z" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" stroke-width="2"/>
  <text x="180" y="130" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">α = 135°</text>
  <path d="M 330 160 L 360 160 A 30 30 0 0 0 310 140 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="340" y="130" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">β = ?</text>`
  ),

  // Q6: Steep transversal c, acute angle 70 deg, find consecutive interior theta
  q6: () => wrapSvg(
    "Q6: Steep Transversal Angle",
    "Lines a and b parallel with steep transversal, acute angle 70 deg",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">a ∥ b · STEEP ANGLE TELEMETRY</text>
  <line x1="35" y1="90" x2="505" y2="90" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="512" y="95" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">a</text>
  <line x1="35" y1="230" x2="505" y2="230" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="512" y="235" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">b</text>
  <!-- Steep transversal -->
  <line x1="220" y1="285" x2="320" y2="35" stroke="#F472B6" stroke-width="3" stroke-linecap="round"/>
  <circle cx="298" cy="90" r="5" fill="#22D3EE"/>
  <circle cx="242" cy="230" r="5" fill="#22D3EE"/>
  <!-- 70 deg angle at node A -->
  <path d="M 298 90 L 328 90 A 30 30 0 0 0 310 60 Z" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" stroke-width="2"/>
  <text x="335" y="80" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">70°</text>
  <!-- theta at node B (consecutive interior) -->
  <path d="M 242 230 L 212 230 A 30 30 0 0 1 230 200 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="175" y="215" fill="#F59E0B" font-family="monospace" font-size="14" font-weight="bold">θ = ?</text>`
  ),

  // Q7: Exterior angle A1 = 125 deg, find acute interior B2
  q7: () => wrapSvg(
    "Q7: Exterior to Interior Conversion",
    "Lines a and b parallel, exterior A1 = 125 deg, find acute interior B2",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">a ∥ b · LINEAR PAIR COMBINATION</text>
  <line x1="35" y1="100" x2="505" y2="100" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="105" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="35" y1="220" x2="505" y2="220" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="225" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <line x1="195" y1="285" x2="335" y2="35" stroke="#C4B5FD" stroke-width="3"/>
  <circle cx="288" cy="100" r="5" fill="#22D3EE"/>
  <circle cx="232" cy="220" r="5" fill="#22D3EE"/>
  <!-- A1 (top-right exterior) = 125 deg -->
  <path d="M 288 100 L 318 100 A 30 30 0 0 0 302 70 Z" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" stroke-width="2"/>
  <text x="325" y="80" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">A₁ = 125°</text>
  <!-- B2 (top-left acute interior) = ? -->
  <path d="M 232 220 L 202 220 A 30 30 0 0 1 218 190 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="145" y="205" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">B₂ = ?</text>`
  ),

  // Q8: Vertical opposite combined with corresponding: M4 = 48 deg, find N2
  q8: () => wrapSvg(
    "Q8: Vertical and Corresponding",
    "Lines m and n parallel, M4 = 48 deg, find N2",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">m ∥ n · VERTICAL OPPOSITE &amp; CORRESPONDING</text>
  <line x1="35" y1="100" x2="505" y2="100" stroke="#34D399" stroke-width="3"/>
  <text x="512" y="105" fill="#34D399" font-size="16" font-weight="bold">m</text>
  <line x1="35" y1="220" x2="505" y2="220" stroke="#34D399" stroke-width="3"/>
  <text x="512" y="225" fill="#34D399" font-size="16" font-weight="bold">n</text>
  <line x1="195" y1="285" x2="335" y2="35" stroke="#F59E0B" stroke-width="3"/>
  <circle cx="288" cy="100" r="5" fill="#22D3EE"/>
  <circle cx="232" cy="220" r="5" fill="#22D3EE"/>
  <!-- M4: bottom-right = 48 deg -->
  <path d="M 288 100 L 318 100 A 30 30 0 0 1 302 130 Z" fill="rgba(6,182,212,0.3)" stroke="#06B6D4" stroke-width="2"/>
  <text x="325" y="125" fill="#06B6D4" font-family="monospace" font-size="13" font-weight="bold">M₄ = 48°</text>
  <!-- N2: top-left = ? -->
  <path d="M 232 220 L 202 220 A 30 30 0 0 1 218 190 Z" fill="rgba(236,72,153,0.3)" stroke="#F472B6" stroke-width="2"/>
  <text x="145" y="205" fill="#F472B6" font-family="monospace" font-size="13" font-weight="bold">N₂ = ?</text>`
  ),

  // Q9: Lines p || q, P2 = 142 deg, find Q3
  q9: () => wrapSvg(
    "Q9: Two Intersection Transfer",
    "Lines p and q parallel, P2 = 142 deg, find Q3",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">p ∥ q · MULTI-WAY ANGLE TRANSFER</text>
  <line x1="35" y1="100" x2="505" y2="100" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="105" fill="#38BDF8" font-size="16" font-weight="bold">p</text>
  <line x1="35" y1="220" x2="505" y2="220" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="225" fill="#38BDF8" font-size="16" font-weight="bold">q</text>
  <line x1="335" y1="285" x2="195" y2="35" stroke="#C4B5FD" stroke-width="3"/>
  <circle cx="231" cy="100" r="5" fill="#22D3EE"/>
  <circle cx="298" cy="220" r="5" fill="#22D3EE"/>
  <!-- P2: top-left = 142 deg -->
  <path d="M 231 100 L 201 100 A 30 30 0 0 1 218 70 Z" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" stroke-width="2"/>
  <text x="140" y="85" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">P₂ = 142°</text>
  <!-- Q3: bottom-left = ? -->
  <path d="M 298 220 L 268 220 A 30 30 0 0 1 285 250 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="210" y="255" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">Q₃ = ?</text>`
  ),

  // Q10: A2 = 135 deg, find B4
  q10: () => wrapSvg(
    "Q10: Diagonal Corner Angle",
    "Lines a and b parallel, A2 = 135 deg, find B4",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">a ∥ b · DIAGONAL CORNER PROJECTION</text>
  <line x1="35" y1="100" x2="505" y2="100" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="105" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="35" y1="220" x2="505" y2="220" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="225" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <line x1="195" y1="285" x2="335" y2="35" stroke="#C4B5FD" stroke-width="3"/>
  <circle cx="288" cy="100" r="5" fill="#22D3EE"/>
  <circle cx="232" cy="220" r="5" fill="#22D3EE"/>
  <!-- A2: top-left = 135 deg -->
  <path d="M 288 100 L 258 100 A 30 30 0 0 1 272 70 Z" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" stroke-width="2"/>
  <text x="200" y="85" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">A₂ = 135°</text>
  <!-- B4: bottom-right = ? -->
  <path d="M 232 220 L 262 220 A 30 30 0 0 1 246 250 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="270" y="250" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">B₄ = ?</text>`
  ),

  // Q11: Alternate interior algebra (2x + 15) deg = 65 deg
  q11: () => wrapSvg(
    "Q11: Algebraic Alternate Interior",
    "Lines a and b parallel, alternate interior angles (2x + 15) and 65 deg",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">a ∥ b · SOLVE FOR PARAMETER x</text>
  <rect x="35" y="100" width="470" height="120" fill="#0C2135" fill-opacity="0.45" rx="6"/>
  <line x1="35" y1="100" x2="505" y2="100" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="105" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="35" y1="220" x2="505" y2="220" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="225" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <line x1="195" y1="285" x2="335" y2="35" stroke="#C4B5FD" stroke-width="3"/>
  <circle cx="288" cy="100" r="5" fill="#22D3EE"/>
  <circle cx="232" cy="220" r="5" fill="#22D3EE"/>
  <path d="M 288 100 L 258 100 A 30 30 0 0 1 274 126 Z" fill="rgba(6,182,212,0.3)" stroke="#06B6D4" stroke-width="2"/>
  <text x="175" y="125" fill="#06B6D4" font-family="monospace" font-size="13" font-weight="bold">(2x + 15)°</text>
  <path d="M 232 220 L 262 220 A 30 30 0 0 0 246 194 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="270" y="205" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">65°</text>`
  ),

  // Q12: Corresponding algebra (3x - 10) deg = 80 deg
  q12: () => wrapSvg(
    "Q12: Algebraic Corresponding Angles",
    "Lines m and n parallel, corresponding angles (3x - 10) and 80 deg",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">m ∥ n · CORRESPONDING EQUATION</text>
  <line x1="35" y1="100" x2="505" y2="100" stroke="#34D399" stroke-width="3"/>
  <text x="512" y="105" fill="#34D399" font-size="16" font-weight="bold">m</text>
  <line x1="35" y1="220" x2="505" y2="220" stroke="#34D399" stroke-width="3"/>
  <text x="512" y="225" fill="#34D399" font-size="16" font-weight="bold">n</text>
  <line x1="200" y1="285" x2="340" y2="35" stroke="#C4B5FD" stroke-width="3"/>
  <circle cx="292" cy="100" r="5" fill="#22D3EE"/>
  <circle cx="236" cy="220" r="5" fill="#22D3EE"/>
  <path d="M 292 100 L 322 100 A 30 30 0 0 0 306 70 Z" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" stroke-width="2"/>
  <text x="330" y="80" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">(3x - 10)°</text>
  <path d="M 236 220 L 266 220 A 30 30 0 0 0 250 190 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="275" y="200" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">80°</text>`
  ),

  // Q13: Consecutive interior algebra (2x + 20) + (x + 40) = 180
  q13: () => wrapSvg(
    "Q13: Supplementary Algebraic Equation",
    "Lines p and q parallel, consecutive interior angles (2x + 20) and (x + 40)",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">p ∥ q · SUPPLEMENTARY TELEMETRY</text>
  <rect x="35" y="100" width="470" height="120" fill="#0C2135" fill-opacity="0.45" rx="6"/>
  <line x1="35" y1="100" x2="505" y2="100" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="105" fill="#38BDF8" font-size="16" font-weight="bold">p</text>
  <line x1="35" y1="220" x2="505" y2="220" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="225" fill="#38BDF8" font-size="16" font-weight="bold">q</text>
  <line x1="180" y1="290" x2="340" y2="30" stroke="#C4B5FD" stroke-width="3"/>
  <circle cx="297" cy="100" r="5" fill="#22D3EE"/>
  <circle cx="223" cy="220" r="5" fill="#22D3EE"/>
  <path d="M 297 100 L 327 100 A 30 30 0 0 1 310 125 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="330" y="130" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">(2x + 20)°</text>
  <path d="M 223 220 L 253 220 A 30 30 0 0 0 238 195 Z" fill="rgba(6,182,212,0.3)" stroke="#06B6D4" stroke-width="2"/>
  <text x="260" y="200" fill="#06B6D4" font-family="monospace" font-size="13" font-weight="bold">(x + 40)°</text>`
  ),

  // Q14: Two perpendiculars to common mast a perp c and b perp c, transversal d forms 52 deg
  q14: () => wrapSvg(
    "Q14: Double Perpendicular and Transversal",
    "Lines a and b both perpendicular to mast c, transversal d forms 52 deg",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">a ⊥ c &amp; b ⊥ c ⇒ a ∥ b</text>
  <!-- Mast c (vertical) -->
  <line x1="100" y1="50" x2="100" y2="280" stroke="#C4B5FD" stroke-width="3"/>
  <text x="90" y="295" fill="#C4B5FD" font-size="15" font-weight="bold">c</text>
  <!-- Struts a and b -->
  <line x1="70" y1="100" x2="480" y2="100" stroke="#38BDF8" stroke-width="3"/>
  <text x="490" y="105" fill="#38BDF8" font-size="15" font-weight="bold">a</text>
  <!-- Square right angle at (100, 100) -->
  <path d="M 100 86 L 114 86 L 114 100" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <line x1="70" y1="220" x2="480" y2="220" stroke="#34D399" stroke-width="3"/>
  <text x="490" y="225" fill="#34D399" font-size="15" font-weight="bold">b</text>
  <!-- Square right angle at (100, 220) -->
  <path d="M 100 206 L 114 206 L 114 220" fill="none" stroke="#34D399" stroke-width="2"/>
  <!-- Transversal d -->
  <line x1="220" y1="285" x2="360" y2="35" stroke="#F59E0B" stroke-width="3"/>
  <text x="368" y="45" fill="#F59E0B" font-size="15" font-weight="bold">d</text>
  <circle cx="316" cy="100" r="5" fill="#22D3EE"/>
  <circle cx="260" cy="220" r="5" fill="#22D3EE"/>
  <path d="M 316 100 L 286 100 A 30 30 0 0 1 302 126 Z" fill="rgba(6,182,212,0.3)" stroke="#06B6D4" stroke-width="2"/>
  <text x="245" y="125" fill="#06B6D4" font-family="monospace" font-size="13" font-weight="bold">52°</text>
  <path d="M 260 220 L 290 220 A 30 30 0 0 0 274 194 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="2"/>
  <text x="300" y="205" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">? = 52°</text>`
  ),

  // Q15: Line c perp a, probe d passes through A forming 34 deg with c
  q15: () => wrapSvg(
    "Q15: Perpendicular with Trajectory",
    "Line c perp corridor a, trajectory d forms 34 deg with c",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">c ⊥ a · COMPLEMENTARY BEAM</text>
  <line x1="50" y1="180" x2="490" y2="180" stroke="#38BDF8" stroke-width="3"/>
  <text x="500" y="185" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <!-- Perpendicular line c -->
  <line x1="250" y1="40" x2="250" y2="280" stroke="#C4B5FD" stroke-width="3"/>
  <text x="240" y="35" fill="#C4B5FD" font-size="15" font-weight="bold">c</text>
  <!-- Square at A (250, 180) top-right -->
  <path d="M 250 166 L 264 166 L 264 180" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <circle cx="250" cy="180" r="5" fill="#22D3EE"/>
  <text x="230" y="195" fill="#FFF" font-size="14" font-weight="bold">A</text>
  <!-- Probe trajectory d slanting -->
  <line x1="150" y1="280" x2="350" y2="80" stroke="#F59E0B" stroke-width="3"/>
  <text x="360" y="85" fill="#F59E0B" font-size="15" font-weight="bold">d</text>
  <!-- Angle 34 deg between c and d -->
  <path d="M 250 180 L 250 150 A 30 30 0 0 1 270 160 Z" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" stroke-width="1.8"/>
  <text x="260" y="140" fill="#38BDF8" font-family="monospace" font-size="12" font-weight="bold">34°</text>
  <!-- Target angle with a -->
  <path d="M 250 180 L 280 180 A 30 30 0 0 0 270 160 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="1.8"/>
  <text x="290" y="175" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">? = 56°</text>`
  ),

  // Q16: Right triangle ABC between parallel lines, BAC = 32 deg
  q16: () => wrapSvg(
    "Q16: Right Triangle Between Parallels",
    "Right triangle ABC between parallel lines a and b, angle BAC = 32 deg",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">TRIANGLE ABC · a ∥ b &amp; AB ⊥ b</text>
  <line x1="50" y1="90" x2="490" y2="90" stroke="#38BDF8" stroke-width="3"/>
  <text x="500" y="95" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="50" y1="230" x2="490" y2="230" stroke="#38BDF8" stroke-width="3"/>
  <text x="500" y="235" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <!-- Strut AB vertical -->
  <line x1="180" y1="90" x2="180" y2="230" stroke="#C4B5FD" stroke-width="3"/>
  <path d="M 180 216 L 194 216 L 194 230" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <!-- Hypotenuse AC -->
  <line x1="180" y1="90" x2="380" y2="230" stroke="#F59E0B" stroke-width="3"/>
  <circle cx="180" cy="90" r="5" fill="#22D3EE"/>
  <text x="165" y="80" fill="#FFF" font-size="14" font-weight="bold">A</text>
  <circle cx="180" cy="230" r="5" fill="#22D3EE"/>
  <text x="165" y="245" fill="#FFF" font-size="14" font-weight="bold">B</text>
  <circle cx="380" cy="230" r="5" fill="#22D3EE"/>
  <text x="390" y="245" fill="#FFF" font-size="14" font-weight="bold">C</text>
  <!-- Angle BAC = 32 deg -->
  <path d="M 180 90 L 180 120 A 30 30 0 0 0 200 104 Z" fill="rgba(56,189,248,0.3)" stroke="#38BDF8" stroke-width="1.8"/>
  <text x="195" y="130" fill="#38BDF8" font-family="monospace" font-size="12" font-weight="bold">32°</text>
  <!-- Target angle ACB = ? -->
  <path d="M 380 230 L 350 230 A 30 30 0 0 1 360 216 Z" fill="rgba(245,158,11,0.3)" stroke="#F59E0B" stroke-width="1.8"/>
  <text x="320" y="220" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">? = 58°</text>`
  ),

  // Q17: Bisector At of A3 = 70 deg meeting line b at T
  q17: () => wrapSvg(
    "Q17: Angle Bisector Transversal",
    "Bisector At of angle A3 = 70 deg meets line b at T",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">a ∥ b · ANGLE BISECTOR AT</text>
  <line x1="35" y1="90" x2="505" y2="90" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="95" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="35" y1="230" x2="505" y2="230" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="235" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <line x1="160" y1="280" x2="300" y2="40" stroke="#C4B5FD" stroke-width="3"/>
  <circle cx="270" cy="90" r="5" fill="#22D3EE"/>
  <text x="280" y="80" fill="#FFF" font-size="14" font-weight="bold">A</text>
  <circle cx="190" cy="230" r="5" fill="#22D3EE"/>
  <text x="175" y="245" fill="#FFF" font-size="14" font-weight="bold">B</text>
  <!-- Bisector ray AT meeting b at T(360, 230) -->
  <line x1="270" y1="90" x2="380" y2="230" stroke="#34D399" stroke-width="2.5" stroke-dasharray="6 3"/>
  <circle cx="380" cy="230" r="5" fill="#34D399"/>
  <text x="390" y="245" fill="#34D399" font-size="14" font-weight="bold">T</text>
  <!-- Full angle 70 deg indicator -->
  <text x="210" y="110" fill="#06B6D4" font-family="monospace" font-size="12" font-weight="bold">70°</text>
  <!-- Half angle markers -->
  <text x="300" y="145" fill="#34D399" font-family="monospace" font-size="12" font-weight="bold">35°</text>
  <text x="330" y="220" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">∠ATB = ?</text>`
  ),

  // Q18: Bisectors of consecutive interior angles meeting at P (90 deg)
  q18: () => wrapSvg(
    "Q18: Perpendicular Bisector Intersection",
    "Bisectors of consecutive interior angles meet at P, angle APB = 90 deg",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">CONSECUTIVE BISECTORS · ∠APB = ?</text>
  <line x1="35" y1="80" x2="505" y2="80" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="85" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="35" y1="240" x2="505" y2="240" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="245" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <line x1="140" y1="60" x2="140" y2="260" stroke="#C4B5FD" stroke-width="3"/>
  <circle cx="140" cy="80" r="5" fill="#22D3EE"/>
  <text x="120" y="85" fill="#FFF" font-size="14" font-weight="bold">A</text>
  <circle cx="140" cy="240" r="5" fill="#22D3EE"/>
  <text x="120" y="245" fill="#FFF" font-size="14" font-weight="bold">B</text>
  <!-- Bisectors meeting at P(260, 160) -->
  <line x1="140" y1="80" x2="260" y2="160" stroke="#F59E0B" stroke-width="2.5"/>
  <line x1="140" y1="240" x2="260" y2="160" stroke="#F59E0B" stroke-width="2.5"/>
  <circle cx="260" cy="160" r="6" fill="#F59E0B" filter="url(#neonGlow)"/>
  <text x="275" y="165" fill="#FFF" font-size="16" font-weight="bold">P</text>
  <text x="195" y="165" fill="#FBBF24" font-family="monospace" font-size="14" font-weight="bold">∠APB = 90°</text>`
  ),

  // Q19: Bisectors of alternate interior angles Ax and By
  q19: () => wrapSvg(
    "Q19: Alternate Interior Bisectors",
    "Bisectors Ax and By of alternate interior angles are parallel",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">ALTERNATE BISECTORS · Ax ∥ By</text>
  <line x1="35" y1="90" x2="505" y2="90" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="95" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="35" y1="230" x2="505" y2="230" stroke="#38BDF8" stroke-width="3"/>
  <text x="512" y="235" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <line x1="200" y1="280" x2="340" y2="40" stroke="#C4B5FD" stroke-width="3"/>
  <circle cx="293" cy="90" r="5" fill="#22D3EE"/>
  <text x="305" y="80" fill="#FFF" font-size="14" font-weight="bold">A</text>
  <circle cx="247" cy="230" r="5" fill="#22D3EE"/>
  <text x="230" y="245" fill="#FFF" font-size="14" font-weight="bold">B</text>
  <!-- Bisector ray Ax pointing left-down -->
  <line x1="293" y1="90" x2="160" y2="170" stroke="#34D399" stroke-width="2.5" stroke-dasharray="6 3"/>
  <text x="145" y="180" fill="#34D399" font-size="14" font-weight="bold">x</text>
  <!-- Bisector ray By pointing right-up -->
  <line x1="247" y1="230" x2="380" y2="150" stroke="#34D399" stroke-width="2.5" stroke-dasharray="6 3"/>
  <text x="390" y="150" fill="#34D399" font-size="14" font-weight="bold">y</text>
  <text x="210" y="145" fill="#34D399" font-family="system-ui" font-size="12" font-weight="bold">Ax ∥ By (Both make 40°)</text>`
  ),

  // Q20: Classic acute zig-zag pointing right (xAO = 35, yBO = 45 => AOB = 80)
  q20: () => wrapSvg(
    "Q20: Acute Zig-Zag Ray",
    "Ray Ax parallel By, waypoint O, angles 35 and 45 deg, find AOB = 80",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">Ax ∥ By · ACUTE CORNER BEND</text>
  <line x1="120" y1="80" x2="480" y2="80" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="120" cy="80" r="4.5" fill="#FFF"/>
  <text x="103" y="85" fill="#FFF" font-size="14" font-weight="bold">A</text>
  <text x="490" y="85" fill="#38BDF8" font-size="14" font-weight="bold">x</text>
  <line x1="120" y1="240" x2="480" y2="240" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="120" cy="240" r="4.5" fill="#FFF"/>
  <text x="103" y="245" fill="#FFF" font-size="14" font-weight="bold">B</text>
  <text x="490" y="245" fill="#38BDF8" font-size="14" font-weight="bold">y</text>
  <circle cx="240" cy="160" r="6" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="218" y="165" fill="#FFF" font-size="16" font-weight="bold">O</text>
  <line x1="120" y1="80" x2="240" y2="160" stroke="#C4B5FD" stroke-width="3"/>
  <line x1="120" y1="240" x2="240" y2="160" stroke="#C4B5FD" stroke-width="3"/>
  <path d="M 120 80 L 160 80 A 40 40 0 0 1 153 102 Z" fill="rgba(56,189,248,0.25)" stroke="#38BDF8" stroke-width="1.8"/>
  <text x="172" y="98" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">35°</text>
  <path d="M 120 240 L 160 240 A 40 40 0 0 0 153 218 Z" fill="rgba(245,158,11,0.25)" stroke="#F59E0B" stroke-width="1.8"/>
  <text x="172" y="232" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">45°</text>
  <path d="M 240 160 L 210 140 A 36 36 0 0 1 210 180 Z" fill="rgba(236,72,153,0.28)" stroke="#F472B6" stroke-width="2"/>
  <text x="255" y="165" fill="#F472B6" font-family="monospace" font-size="14" font-weight="bold">∠AOB = ?</text>`
  ),

  // Q21: Zig-zag pointing left (OAx = 50, OBy = 60 => AOB = 110)
  q21: () => wrapSvg(
    "Q21: Reflex Zig-Zag Corridor",
    "Ray Ax parallel By pointing right, vertex O to the right, find AOB = 110",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">Ax ∥ By · INVERSE BEND</text>
  <line x1="60" y1="80" x2="420" y2="80" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="280" cy="80" r="4.5" fill="#FFF"/>
  <text x="275" y="65" fill="#FFF" font-size="14" font-weight="bold">A</text>
  <text x="430" y="85" fill="#38BDF8" font-size="14" font-weight="bold">x</text>
  <line x1="60" y1="240" x2="420" y2="240" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="280" cy="240" r="4.5" fill="#FFF"/>
  <text x="275" y="260" fill="#FFF" font-size="14" font-weight="bold">B</text>
  <text x="430" y="245" fill="#38BDF8" font-size="14" font-weight="bold">y</text>
  <!-- Vertex O to the right at (370, 160) -->
  <circle cx="370" cy="160" r="6" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="385" y="165" fill="#FFF" font-size="16" font-weight="bold">O</text>
  <line x1="280" y1="80" x2="370" y2="160" stroke="#C4B5FD" stroke-width="3"/>
  <line x1="280" y1="240" x2="370" y2="160" stroke="#C4B5FD" stroke-width="3"/>
  <path d="M 280 80 L 320 80 A 40 40 0 0 1 306 103 Z" fill="rgba(56,189,248,0.25)" stroke="#38BDF8" stroke-width="1.8"/>
  <text x="220" y="105" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">OAx = 50°</text>
  <path d="M 280 240 L 320 240 A 40 40 0 0 0 306 217 Z" fill="rgba(245,158,11,0.25)" stroke="#F59E0B" stroke-width="1.8"/>
  <text x="220" y="225" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">OBy = 60°</text>
  <text x="290" y="165" fill="#F472B6" font-family="monospace" font-size="14" font-weight="bold">∠AOB = ?</text>`
  ),

  // Q22: Obtuse zig-zag (xAO = 130, yBO = 150 => AOB = 80)
  q22: () => wrapSvg(
    "Q22: Obtuse Zig-Zag Angles",
    "Ray Ax parallel By, obtuse angles 130 and 150 deg, find interior AOB = 80",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">Ax ∥ By · OBTUSE INTERIOR ANGLES</text>
  <line x1="80" y1="70" x2="480" y2="70" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="200" cy="70" r="4.5" fill="#FFF"/>
  <text x="195" y="55" fill="#FFF" font-size="14" font-weight="bold">A</text>
  <text x="490" y="75" fill="#38BDF8" font-size="14" font-weight="bold">x</text>
  <line x1="80" y1="250" x2="480" y2="250" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="200" cy="250" r="4.5" fill="#FFF"/>
  <text x="195" y="275" fill="#FFF" font-size="14" font-weight="bold">B</text>
  <text x="490" y="255" fill="#38BDF8" font-size="14" font-weight="bold">y</text>
  <circle cx="100" cy="160" r="6" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="75" y="165" fill="#FFF" font-size="16" font-weight="bold">O</text>
  <line x1="200" y1="70" x2="100" y2="160" stroke="#C4B5FD" stroke-width="3"/>
  <line x1="200" y1="250" x2="100" y2="160" stroke="#C4B5FD" stroke-width="3"/>
  <path d="M 200 70 L 250 70 A 50 50 0 0 1 162 104 Z" fill="rgba(56,189,248,0.25)" stroke="#38BDF8" stroke-width="1.8"/>
  <text x="220" y="105" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">130°</text>
  <path d="M 200 250 L 250 250 A 50 50 0 0 0 162 216 Z" fill="rgba(245,158,11,0.25)" stroke="#F59E0B" stroke-width="1.8"/>
  <text x="220" y="225" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">150°</text>
  <text x="125" y="165" fill="#F472B6" font-family="monospace" font-size="14" font-weight="bold">∠AOB = ?</text>`
  ),

  // Q23: Three parallel lines a || b || c cut by transversal d (68 deg)
  q23: () => wrapSvg(
    "Q23: Three Parallel Lines Transversal",
    "Three parallel lines a, b, c cut by line d, angle 68 deg",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">a ∥ b ∥ c · THREE-CORRIDOR SYSTEM</text>
  <line x1="40" y1="70" x2="490" y2="70" stroke="#38BDF8" stroke-width="3"/>
  <text x="500" y="75" fill="#38BDF8" font-size="15" font-weight="bold">a</text>
  <line x1="40" y1="160" x2="490" y2="160" stroke="#34D399" stroke-width="3"/>
  <text x="500" y="165" fill="#34D399" font-size="15" font-weight="bold">b</text>
  <line x1="40" y1="250" x2="490" y2="250" stroke="#F59E0B" stroke-width="3"/>
  <text x="500" y="255" fill="#F59E0B" font-size="15" font-weight="bold">c</text>
  <line x1="160" y1="290" x2="340" y2="30" stroke="#C4B5FD" stroke-width="3"/>
  <text x="345" y="40" fill="#C4B5FD" font-size="15" font-weight="bold">d</text>
  <circle cx="312" cy="70" r="5" fill="#22D3EE"/>
  <text x="325" y="65" fill="#FFF" font-size="13" font-weight="bold">A</text>
  <path d="M 312 70 L 342 70 A 30 30 0 0 0 327 48 Z" fill="rgba(56,189,248,0.25)" stroke="#38BDF8" stroke-width="1.8"/>
  <text x="350" y="60" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">68°</text>
  <circle cx="188" cy="250" r="5" fill="#F59E0B"/>
  <text x="200" y="245" fill="#FFF" font-size="13" font-weight="bold">C</text>
  <text x="125" y="240" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">? = 68°</text>`
  ),

  // Q24: Two parallel lines cut by two transversals intersecting at K
  q24: () => wrapSvg(
    "Q24: Intersecting Transversals in Parallel Tracks",
    "Parallel tracks a and b, two transversals intersecting at K",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">a ∥ b · CROSSING FLIGHT VECTORS AT K</text>
  <line x1="40" y1="80" x2="500" y2="80" stroke="#38BDF8" stroke-width="3"/>
  <text x="510" y="85" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="40" y1="240" x2="500" y2="240" stroke="#38BDF8" stroke-width="3"/>
  <text x="510" y="245" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <!-- Transversal AD and BC intersecting at K(270, 160) -->
  <line x1="160" y1="80" x2="380" y2="240" stroke="#C4B5FD" stroke-width="2.5"/>
  <line x1="380" y1="80" x2="160" y2="240" stroke="#F59E0B" stroke-width="2.5"/>
  <circle cx="160" cy="80" r="5" fill="#22D3EE"/><text x="145" y="70" fill="#FFF" font-size="14" font-weight="bold">A</text>
  <circle cx="380" cy="80" r="5" fill="#22D3EE"/><text x="390" y="70" fill="#FFF" font-size="14" font-weight="bold">B</text>
  <circle cx="160" cy="240" r="5" fill="#22D3EE"/><text x="145" y="260" fill="#FFF" font-size="14" font-weight="bold">C</text>
  <circle cx="380" cy="240" r="5" fill="#22D3EE"/><text x="390" y="260" fill="#FFF" font-size="14" font-weight="bold">D</text>
  <circle cx="270" cy="160" r="6" fill="#F472B6" filter="url(#neonGlow)"/><text x="280" y="155" fill="#FFF" font-size="15" font-weight="bold">K</text>
  <!-- Angles -->
  <text x="180" y="105" fill="#38BDF8" font-family="monospace" font-size="12" font-weight="bold">45°</text>
  <text x="330" y="105" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">65°</text>
  <text x="320" y="225" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">∠KDC = ?</text>`
  ),

  // Q25: Double zig-zag stepped corridor (A - O - P - C)
  q25: () => wrapSvg(
    "Q25: Stepped Double Zig-Zag Corridor",
    "Ray Ax parallel Cy with two bends O and P, find PCy = 20 deg",
    `  <rect x="135" y="15" width="270" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">Ax ∥ Cy · TWO-BEND STEPPED CORRIDOR</text>
  <line x1="80" y1="60" x2="480" y2="60" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="80" cy="60" r="4.5" fill="#FFF"/>
  <text x="65" y="65" fill="#FFF" font-size="14" font-weight="bold">A</text>
  <text x="490" y="65" fill="#38BDF8" font-size="14" font-weight="bold">x</text>
  <line x1="80" y1="260" x2="480" y2="260" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="80" cy="260" r="4.5" fill="#FFF"/>
  <text x="65" y="265" fill="#FFF" font-size="14" font-weight="bold">C</text>
  <text x="490" y="265" fill="#38BDF8" font-size="14" font-weight="bold">y</text>
  <!-- Vertex O(180, 130) and P(320, 190) -->
  <line x1="80" y1="60" x2="180" y2="130" stroke="#C4B5FD" stroke-width="2.5"/>
  <line x1="180" y1="130" x2="320" y2="190" stroke="#C4B5FD" stroke-width="2.5"/>
  <line x1="320" y1="190" x2="80" y2="260" stroke="#C4B5FD" stroke-width="2.5"/>
  <circle cx="180" cy="130" r="5" fill="#22D3EE"/><text x="195" y="125" fill="#FFF" font-size="14" font-weight="bold">O</text>
  <circle cx="320" cy="190" r="5" fill="#22D3EE"/><text x="335" y="195" fill="#FFF" font-size="14" font-weight="bold">P</text>
  <text x="110" y="80" fill="#38BDF8" font-family="monospace" font-size="12" font-weight="bold">30°</text>
  <text x="135" y="145" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">80°</text>
  <text x="260" y="200" fill="#34D399" font-family="monospace" font-size="12" font-weight="bold">70°</text>
  <text x="110" y="250" fill="#F472B6" font-family="monospace" font-size="13" font-weight="bold">∠PCy = ?</text>`
  )
};

// Write all 25 SVGs
console.log('Writing 25 distinct SVG diagrams to:', SVG_DIR);
for (let i = 1; i <= 25; i++) {
  const key = `q${i}`;
  const svgContent = svgGenerators[key]();
  const filePath = path.join(SVG_DIR, `math7_l10_q${i}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf8');
}
console.log('✅ Generated 25 distinct SVG files successfully.');

// Define 25 Questions with balanced options (A:6, B:7, C:6, D:6)
const QUESTIONS_25 = [
  // Q1 (Ans A)
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 1: Mercury Orbit • Angle Pairs Along Corridors",
    content_markdown: "In the telemetry diagram below, orbital lines $a$ and $b$ are parallel ($a \\parallel b$). Transversal $c$ forms alternate interior angle $\\widehat{A_3} = 62^\\circ$. What is the degree measure of alternate interior angle $\\widehat{B_1}$?\n\n![Figure: Alternate Interior Angles](/images/geometry/math7_l10_q1.svg)",
    options: [
      { id: 'A', text: "$62^\\circ$" },
      { id: 'B', text: "$118^\\circ$" },
      { id: 'C', text: "$28^\\circ$" },
      { id: 'D', text: "$180^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "Since line $a \\parallel b$, alternate interior angles are equal in measure: $\\widehat{B_1} = \\widehat{A_3} = 62^\\circ$."
  },
  // Q2 (Ans D)
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 1: Mercury Orbit • Angle Pairs Along Corridors",
    content_markdown: "Parallel flight corridors $m \\parallel n$ are intersected by navigation vector $t$. If corresponding angle $\\widehat{M_1} = 118^\\circ$ (top-right), what is the measure of corresponding angle $\\widehat{N_1}$ (top-right)?\n\n![Figure: Corresponding Angles](/images/geometry/math7_l10_q2.svg)",
    options: [
      { id: 'A', text: "$62^\\circ$" },
      { id: 'B', text: "$128^\\circ$" },
      { id: 'C', text: "$90^\\circ$" },
      { id: 'D', text: "$118^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "Because lines $m \\parallel n$, corresponding angles occupying the same relative position are equal: $\\widehat{N_1} = \\widehat{M_1} = 118^\\circ$."
  },
  // Q3 (Ans C)
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 1: Mercury Orbit • Angle Pairs Along Corridors",
    content_markdown: "Communication lines $p \\parallel q$ are cut by transversal $k$. Given that consecutive interior angle $\\widehat{P_4} = 74^\\circ$, calculate the degree measure of consecutive interior angle $\\widehat{Q_1}$.\n\n![Figure: Consecutive Interior Angles](/images/geometry/math7_l10_q3.svg)",
    options: [
      { id: 'A', text: "$74^\\circ$" },
      { id: 'B', text: "$16^\\circ$" },
      { id: 'C', text: "$106^\\circ$" },
      { id: 'D', text: "$116^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "Consecutive interior angles along parallel lines are supplementary: $\\widehat{Q_1} = 180^\\circ - \\widehat{P_4} = 180^\\circ - 74^\\circ = 106^\\circ$."
  },
  // Q4 (Ans D)
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 2: Venus Base • Varied Orientations & Transversals",
    content_markdown: "Two vertical sensor towers represented by parallel lines $x \\parallel y$ are crossed by scanning beam $d$. If angle $\\widehat{X_1} = 55^\\circ$, what is the measure of alternate interior angle $\\widehat{Y_2}$?\n\n![Figure: Vertical Parallel Lines](/images/geometry/math7_l10_q4.svg)",
    options: [
      { id: 'A', text: "$125^\\circ$" },
      { id: 'B', text: "$35^\\circ$" },
      { id: 'C', text: "$90^\\circ$" },
      { id: 'D', text: "$55^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "Even when parallel lines are oriented vertically, the alternate interior angle theorem holds: $\\widehat{Y_2} = \\widehat{X_1} = 55^\\circ$."
  },
  // Q5 (Ans C)
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 2: Venus Base • Varied Orientations & Transversals",
    content_markdown: "Tilted solar panel rails $r \\parallel s$ are crossed by horizontal support beam $h$. If corresponding angle $\\alpha = 135^\\circ$, what is the measure of corresponding angle $\\beta$ on rail $s$?\n\n![Figure: Tilted Parallel Lines](/images/geometry/math7_l10_q5.svg)",
    options: [
      { id: 'A', text: "$45^\\circ$" },
      { id: 'B', text: "$90^\\circ$" },
      { id: 'C', text: "$135^\\circ$" },
      { id: 'D', text: "$180^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "Parallel lines $r \\parallel s$ cut by horizontal transversal $h$ have equal corresponding angles: $\\beta = \\alpha = 135^\\circ$."
  },
  // Q6 (Ans D)
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 2: Venus Base • Varied Orientations & Transversals",
    content_markdown: "Look at the diagram below. Lines $a$ and $b$ are parallel ($a \\parallel b$). If the acute angle at node $A$ is $70^\\circ$, find the measure of consecutive interior angle $\\theta$.\n\n![Figure: Steep Transversal Angle](/images/geometry/math7_l10_q6.svg)",
    options: [
      { id: 'A', text: "$70^\\circ$" },
      { id: 'B', text: "$130^\\circ$" },
      { id: 'C', text: "$20^\\circ$" },
      { id: 'D', text: "$110^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "Consecutive interior angles are supplementary: $\\theta = 180^\\circ - 70^\\circ = 110^\\circ$."
  },
  // Q7 (Ans B)
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 3: Earth Mission Control • Finding Unknown Angles & Linear Pairs",
    content_markdown: "Corridors $a \\parallel b$ are cut by transversal $c$. Given exterior angle $\\widehat{A_1} = 125^\\circ$, calculate acute interior angle $\\widehat{B_2}$.\n\n![Figure: Exterior to Interior Conversion](/images/geometry/math7_l10_q7.svg)",
    options: [
      { id: 'A', text: "$125^\\circ$" },
      { id: 'B', text: "$55^\\circ$" },
      { id: 'C', text: "$65^\\circ$" },
      { id: 'D', text: "$35^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "Corresponding angle $\\widehat{B_1} = \\widehat{A_1} = 125^\\circ$. Since $\\widehat{B_1}$ and $\\widehat{B_2}$ form a linear pair along line $b$: $\\widehat{B_2} = 180^\\circ - 125^\\circ = 55^\\circ$."
  },
  // Q8 (Ans A)
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 3: Earth Mission Control • Finding Unknown Angles & Linear Pairs",
    content_markdown: "In the orbital grid, $m \\parallel n$. Given that angle $\\widehat{M_4} = 48^\\circ$, determine the degree measure of angle $\\widehat{N_2}$.\n\n![Figure: Vertical and Corresponding](/images/geometry/math7_l10_q8.svg)",
    options: [
      { id: 'A', text: "$48^\\circ$" },
      { id: 'B', text: "$132^\\circ$" },
      { id: 'C', text: "$42^\\circ$" },
      { id: 'D', text: "$90^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "At node $M$, vertically opposite angle $\\widehat{M_2} = \\widehat{M_4} = 48^\\circ$. Since $m \\parallel n$, corresponding angle $\\widehat{N_2} = \\widehat{M_2} = 48^\circ$."
  },
  // Q9 (Ans B)
  {
    order_index: 9,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 3: Earth Mission Control • Finding Unknown Angles & Linear Pairs",
    content_markdown: "Trajectories $p \\parallel q$ are intersected by flight path $s$. If $\\widehat{P_2} = 142^\\circ$, what is the measure of angle $\\widehat{Q_3}$?\n\n![Figure: Two Intersection Transfer](/images/geometry/math7_l10_q9.svg)",
    options: [
      { id: 'A', text: "$38^\\circ$" },
      { id: 'B', text: "$142^\\circ$" },
      { id: 'C', text: "$52^\\circ$" },
      { id: 'D', text: "$180^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "Corresponding angle $\\widehat{Q_2} = \\widehat{P_2} = 142^\\circ$. Angle $\\widehat{Q_3}$ and $\\widehat{Q_2}$ are vertically opposite, so $\\widehat{Q_3} = 142^\\circ$."
  },
  // Q10 (Ans A)
  {
    order_index: 10,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 3: Earth Mission Control • Finding Unknown Angles & Linear Pairs",
    content_markdown: "Given $a \\parallel b$ cut by transversal $c$. If angle $\\widehat{A_2} = 135^\\circ$ (top-left), what is the degree measure of angle $\\widehat{B_4}$ (bottom-right)?\n\n![Figure: Diagonal Corner Angle](/images/geometry/math7_l10_q10.svg)",
    options: [
      { id: 'A', text: "$45^\\circ$" },
      { id: 'B', text: "$135^\\circ$" },
      { id: 'C', text: "$90^\\circ$" },
      { id: 'D', text: "$125^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "Consecutive interior angle to $\\widehat{A_2}$ is $180^\\circ - 135^\\circ = 45^\\circ$. The vertically opposite angle $\\widehat{B_4} = 45^\\circ$."
  },
  // Q11 (Ans B)
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 4: Mars Outpost • Algebraic Expressions with x",
    content_markdown: "In the diagram, corridors $a$ and $b$ are parallel ($a \\parallel b$). Alternate interior angles measure $(2x + 15)^\\circ$ and $65^\\circ$. Find the value of $x$.\n\n![Figure: Algebraic Alternate Interior](/images/geometry/math7_l10_q11.svg)",
    options: [
      { id: 'A', text: "$x = 20$" },
      { id: 'B', text: "$x = 25$" },
      { id: 'C', text: "$x = 30$" },
      { id: 'D', text: "$x = 40$" }
    ],
    correct_option_id: 'B',
    explanation: "Since $a \\parallel b$, alternate interior angles are equal: $2x + 15 = 65 \\implies 2x = 50 \\implies x = 25$."
  },
  // Q12 (Ans C)
  {
    order_index: 12,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 4: Mars Outpost • Algebraic Expressions with x",
    content_markdown: "Given parallel lines $m \\parallel n$. Two corresponding angles are given as $(3x - 10)^\\circ$ and $80^\\circ$. Calculate $x$.\n\n![Figure: Algebraic Corresponding Angles](/images/geometry/math7_l10_q12.svg)",
    options: [
      { id: 'A', text: "$x = 25$" },
      { id: 'B', text: "$x = 35$" },
      { id: 'C', text: "$x = 30$" },
      { id: 'D', text: "$x = 20$" }
    ],
    correct_option_id: 'C',
    explanation: "Corresponding angles are equal: $3x - 10 = 80 \\implies 3x = 90 \\implies x = 30$."
  },
  // Q13 (Ans D)
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 4: Mars Outpost • Algebraic Expressions with x",
    content_markdown: "Along parallel flight corridors $p \\parallel q$, consecutive interior angles measure $(2x + 20)^\\circ$ and $(x + 40)^\\circ$. Find the value of $x$.\n\n![Figure: Supplementary Algebraic Equation](/images/geometry/math7_l10_q13.svg)",
    options: [
      { id: 'A', text: "$x = 30$" },
      { id: 'B', text: "$x = 35$" },
      { id: 'C', text: "$x = 45$" },
      { id: 'D', text: "$x = 40$" }
    ],
    correct_option_id: 'D',
    explanation: "Consecutive interior angles are supplementary: $(2x + 20) + (x + 40) = 180 \\implies 3x + 60 = 180 \\implies 3x = 120 \\implies x = 40$."
  },
  // Q14 (Ans D)
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 5: Jupiter Station • Perpendicular to Parallel & Right Angles",
    content_markdown: "Docking struts $a$ and $b$ are both perpendicular to base mast $c$ ($a \\perp c$ and $b \\perp c$). Diagonal sensor beam $d$ crosses strut $a$ at an acute angle of $52^\\circ$. What is the measure of the alternate interior angle on strut $b$?\n\n![Figure: Double Perpendicular and Transversal](/images/geometry/math7_l10_q14.svg)",
    options: [
      { id: 'A', text: "$38^\\circ$" },
      { id: 'B', text: "$128^\\circ$" },
      { id: 'C', text: "$90^\\circ$" },
      { id: 'D', text: "$52^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "Since $a \\perp c$ and $b \\perp c$, struts $a$ and $b$ are parallel ($a \\parallel b$ by Theorem 1). Therefore, alternate interior angles formed by diagonal beam $d$ are equal: $52^\\circ$."
  },
  // Q15 (Ans A)
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 5: Jupiter Station • Perpendicular to Parallel & Right Angles",
    content_markdown: "Corridors $a$ and $b$ are parallel ($a \\parallel b$). Laser line $c$ is perpendicular to corridor $a$ ($c \\perp a$). A probe trajectory $d$ passes through point $A$ making an angle of $34^\\circ$ with line $c$. Find the complementary angle between probe trajectory $d$ and corridor $a$.\n\n![Figure: Perpendicular with Trajectory](/images/geometry/math7_l10_q15.svg)",
    options: [
      { id: 'A', text: "$56^\\circ$" },
      { id: 'B', text: "$34^\\circ$" },
      { id: 'C', text: "$90^\\circ$" },
      { id: 'D', text: "$146^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "Since $c \\perp a$, the total angle is $90^\\circ$. The complementary angle is $90^\\circ - 34^\\circ = 56^\\circ$."
  },
  // Q16 (Ans C)
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 5: Jupiter Station • Perpendicular to Parallel & Right Angles",
    content_markdown: "Parallel corridors $a \\parallel b$ are connected by perpendicular strut $AB$ ($AB \\perp b$ at $B$). Diagonal brace $AC$ connects node $A$ on line $a$ to node $C$ on line $b$. If $\\widehat{BAC} = 32^\\circ$, what is the measure of angle $\\widehat{ACB}$ in triangle $ABC$?\n\n![Figure: Right Triangle Between Parallels](/images/geometry/math7_l10_q16.svg)",
    options: [
      { id: 'A', text: "$32^\\circ$" },
      { id: 'B', text: "$68^\\circ$" },
      { id: 'C', text: "$58^\\circ$" },
      { id: 'D', text: "$48^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "In right triangle $ABC$ with $\\widehat{B} = 90^\\circ$, the two acute angles are complementary: $\\widehat{ACB} = 90^\\circ - 32^\\circ = 58^\\circ$."
  },
  // Q17 (Ans D)
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 6: Saturn Rings • Angle Bisectors on Parallel Lines",
    content_markdown: "Corridors $a \\parallel b$ are intersected by transversal line $AB$. Angle $\\widehat{A_3} = 70^\\circ$. Ray $AT$ bisects angle $\\widehat{A_3}$ and meets line $b$ at point $T$. What is the measure of angle $\\widehat{ATB}$?\n\n![Figure: Angle Bisector Transversal](/images/geometry/math7_l10_q17.svg)",
    options: [
      { id: 'A', text: "$70^\\circ$" },
      { id: 'B', text: "$40^\\circ$" },
      { id: 'C', text: "$55^\\circ$" },
      { id: 'D', text: "$35^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "The bisector divides $70^\\circ$ into two $35^\\circ$ angles. Between parallel lines $a \\parallel b$ cut by transversal $AT$, alternate interior angle $\\widehat{ATB}$ equals the upper half-angle: $\\widehat{ATB} = 35^\\circ$."
  },
  // Q18 (Ans A)
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 6: Saturn Rings • Angle Bisectors on Parallel Lines",
    content_markdown: "Parallel corridors $a \\parallel b$ have consecutive interior angles at nodes $A$ and $B$. The angle bisectors of these two consecutive interior angles intersect at point $P$. What is ALWAYS the measure of angle $\\widehat{APB}$?\n\n![Figure: Perpendicular Bisector Intersection](/images/geometry/math7_l10_q18.svg)",
    options: [
      { id: 'A', text: "$90^\\circ$" },
      { id: 'B', text: "$60^\\circ$" },
      { id: 'C', text: "$120^\\circ$" },
      { id: 'D', text: "$45^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "Consecutive interior angles sum to $180^\\circ$. Their bisectors take half of each, so $\\widehat{PAB} + \\widehat{PBA} = 180^\\circ \\div 2 = 90^\\circ$. In triangle $APB$, the third angle is $\\widehat{APB} = 180^\\circ - 90^\\circ = 90^\\circ$."
  },
  // Q19 (Ans B)
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 6: Saturn Rings • Angle Bisectors on Parallel Lines",
    content_markdown: "Transversal $AB$ cuts parallel lines $a \\parallel b$. Ray $Ax$ bisects alternate interior angle $\\widehat{A_3} = 80^\\circ$, and ray $By$ bisects alternate interior angle $\\widehat{B_1} = 80^\\circ$. What is the geometric relationship between ray $Ax$ and ray $By$?\n\n![Figure: Alternate Interior Bisectors](/images/geometry/math7_l10_q19.svg)",
    options: [
      { id: 'A', text: "$Ax \\perp By$" },
      { id: 'B', text: "$Ax \\parallel By$" },
      { id: 'C', text: "$Ax$ and $By$ intersect at $40^\\circ$" },
      { id: 'D', text: "$Ax$ and $By$ are collinear" }
    ],
    correct_option_id: 'B',
    explanation: "The half-angles each measure $40^\\circ$. Because these equal half-angles are alternate interior angles for rays $Ax$ and $By$ cut by transversal $AB$, ray $Ax$ is parallel to ray $By$ ($Ax \\parallel By$)."
  },
  // Q20 (Ans B)
  {
    order_index: 20,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 7: Uranus Deep Space • The Zig-Zag / Auxiliary Ray Problems",
    content_markdown: "In deep space navigation, ray $Ax \\parallel \\text{Ray } By$. Waypoint $O$ lies between the rays such that acute angles $\\widehat{xAO} = 35^\\circ$ and $\\widehat{yBO} = 45^\\circ$. Calculate corner deflection angle $\\widehat{AOB}$.\n\n![Figure: Acute Zig-Zag Ray](/images/geometry/math7_l10_q20.svg)",
    options: [
      { id: 'A', text: "$70^\\circ$" },
      { id: 'B', text: "$80^\\circ$" },
      { id: 'C', text: "$90^\\circ$" },
      { id: 'D', text: "$100^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "Draw auxiliary ray $Ot \\parallel Ax \\parallel By$. Alternate interior angles give $\\widehat{AOt} = 35^\\circ$ and $\\widehat{tOB} = 45^\\circ$. Thus $\\widehat{AOB} = 35^\\circ + 45^\\circ = 80^\\circ$."
  },
  // Q21 (Ans C)
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 7: Uranus Deep Space • The Zig-Zag / Auxiliary Ray Problems",
    content_markdown: "Look at the orbital trajectory diagram below. Ray $Ax \\parallel \\text{Ray } By$. Given that $\\widehat{OAx} = 50^\\circ$ and $\\widehat{OBy} = 60^\\circ$, find the measure of angle $\\widehat{AOB}$.\n\n![Figure: Reflex Zig-Zag Corridor](/images/geometry/math7_l10_q21.svg)",
    options: [
      { id: 'A', text: "$100^\\circ$" },
      { id: 'B', text: "$120^\\circ$" },
      { id: 'C', text: "$110^\\circ$" },
      { id: 'D', text: "$90^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "By drawing auxiliary line $Ot \\parallel Ax \\parallel By$, angle $\\widehat{AOB}$ is the sum of the two alternate interior angles: $50^\\circ + 60^\circ = 110^\\circ$."
  },
  // Q22 (Ans A)
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 7: Uranus Deep Space • The Zig-Zag / Auxiliary Ray Problems",
    content_markdown: "Refer to the diagram below. Ray $Ax \\parallel \\text{Ray } By$. Inside the corridor, obtuse angles measure $\\widehat{xAO} = 130^\\circ$ and $\\widehat{yBO} = 150^\\circ$. Calculate the interior angle $\\widehat{AOB}$.\n\n![Figure: Obtuse Zig-Zag Angles](/images/geometry/math7_l10_q22.svg)",
    options: [
      { id: 'A', text: "$80^\\circ$" },
      { id: 'B', text: "$70^\\circ$" },
      { id: 'C', text: "$90^\\circ$" },
      { id: 'D', text: "$100^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "Draw auxiliary ray $Ot \\parallel Ax \\parallel By$ directed right. Consecutive interior angles on the same side sum to $180^\\circ$: $\\widehat{AOt} = 180^\\circ - 130^\\circ = 50^\\circ$ and $\\widehat{tOB} = 180^\\circ - 150^\\circ = 30^\\circ$. Therefore, $\\widehat{AOB} = 50^\\circ + 30^\\circ = 80^\\circ$."
  },
  // Q23 (Ans C)
  {
    order_index: 23,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 8: Neptune Frontier • Multi-Line Systems & Complex Synthesis",
    content_markdown: "Three orbital corridors are parallel: $a \\parallel b \\parallel c$. Transversal line $d$ crosses line $a$ at an acute angle of $68^\\circ$. What is the measure of the corresponding angle formed by line $d$ with line $c$?\n\n![Figure: Three Parallel Lines Transversal](/images/geometry/math7_l10_q23.svg)",
    options: [
      { id: 'A', text: "$112^\\circ$" },
      { id: 'B', text: "$22^\\circ$" },
      { id: 'C', text: "$68^\\circ$" },
      { id: 'D', text: "$136^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "By transitivity, $a \\parallel c$. Therefore, transversal $d$ forms equal corresponding angles on lines $a$ and $c$, so the angle is $68^\\circ$."
  },
  // Q24 (Ans B)
  {
    order_index: 24,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 8: Neptune Frontier • Multi-Line Systems & Complex Synthesis",
    content_markdown: "Parallel flight tracks $a \\parallel b$ are crossed by two flight paths that intersect at point $K$ between the tracks. If $\\widehat{KAB} = 45^\\circ$ and $\\widehat{KBA} = 65^\\circ$, what is the measure of alternate interior angle $\\widehat{KDC}$ on line $b$?\n\n![Figure: Intersecting Transversals in Parallel Tracks](/images/geometry/math7_l10_q24.svg)",
    options: [
      { id: 'A', text: "$45^\\circ$" },
      { id: 'B', text: "$65^\\circ$" },
      { id: 'C', text: "$70^\\circ$" },
      { id: 'D', text: "$110^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "Segment $BD$ is a transversal crossing parallel lines $a \\parallel b$. Angle $\\widehat{KBA}$ and angle $\\widehat{KDC}$ are alternate interior angles, so $\\widehat{KDC} = \\widehat{KBA} = 65^\\circ$."
  },
  // Q25 (Ans D)
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: "Sector 8: Neptune Frontier • Multi-Line Systems & Complex Synthesis",
    content_markdown: "In a multi-leg space corridor, ray $Ax \\parallel \\text{Ray } Cy$. The flight path bends at waypoints $O$ and $P$. Given that $\\widehat{xAO} = 30^\\circ$, $\\widehat{AOP} = 80^\\circ$, and $\\widehat{OPC} = 70^\\circ$, determine the measure of navigation angle $\\widehat{PCy}$.\n\n![Figure: Stepped Double Zig-Zag Corridor](/images/geometry/math7_l10_q25.svg)",
    options: [
      { id: 'A', text: "$50^\\circ$" },
      { id: 'B', text: "$30^\\circ$" },
      { id: 'C', text: "$40^\\circ$" },
      { id: 'D', text: "$20^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "Draw auxiliary ray $Ot \\parallel Ax$: alternate interior angle gives $\\widehat{AOt} = 30^\\circ \\implies \\widehat{tOP} = 80^\\circ - 30^\\circ = 50^\\circ$. Draw auxiliary ray $Pu \\parallel Ot \\parallel Ax$: alternate interior angle gives $\\widehat{OPu} = 50^\\circ \\implies \\widehat{uPC} = 70^\\circ - 50^\\circ = 20^\\circ$. Since $Pu \\parallel Cy$, alternate interior angle $\\widehat{PCy} = 20^\\circ$."
  }
];

// Check answer distribution
const counts = { A: 0, B: 0, C: 0, D: 0 };
QUESTIONS_25.forEach(q => counts[q.correct_option_id]++);
console.log('Final 25 Questions Answer distribution:', counts);

async function seed() {
  console.log('🚀 Seeding 25 Distinct-SVG Practice Problems for Keithley Lake...');
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  // Find assignment
  let assignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: targetDate,
      learning_units: {
        subject_id: CONSTANTS.SUBJECT_ID
      }
    },
    include: {
      learning_units: true
    }
  });

  if (!assignment) {
    throw new Error('No assignment found for 2026-11-12');
  }

  // Clean old assessments
  const oldAssessments = await prisma.assessments.findMany({
    where: { learning_unit_id: assignment.learning_unit_id }
  });

  for (const asmt of oldAssessments) {
    console.log(`Cleaning old assessment: ${asmt.id}...`);
    const attempts = await prisma.assessment_attempts.findMany({
      where: { assessment_id: asmt.id }
    });
    for (const att of attempts) {
      await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
      await prisma.assessment_attempts.delete({ where: { id: att.id } });
    }
    await prisma.questions.deleteMany({ where: { assessment_id: asmt.id } });
    await prisma.assessments.delete({ where: { id: asmt.id } });
  }

  // Create Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: assignment.learning_unit_id,
      type: 'IN_SESSION_90M',
      title: "Cosmic Mission: 25 Visual Geometry Challenges (Lesson 10)",
      instructions: "Comprehensive timed geometry session: 25 distinct problems with customized SVG telemetry diagrams across 8 Planetary Sectors.",
      time_limit_minutes: 120,
      max_score: 10.0
    }
  });
  console.log(`✅ Created Assessment: ${assessment.id}`);

  // Create Questions
  for (const q of QUESTIONS_25) {
    const questionPayload = {
      content_markdown: q.content_markdown,
      sectionName: q.sectionName,
      options: q.options,
      correct_option_id: q.correct_option_id
    };

    const gradingPayload = {
      correct_option_id: q.correct_option_id,
      explanation_markdown: q.explanation
    };

    await prisma.questions.create({
      data: {
        assessment_id: assessment.id,
        order_index: q.order_index,
        type: q.type,
        points: q.points,
        question_payload: questionPayload,
        grading_key_payload: gradingPayload
      }
    });
  }
  console.log(`✅ Loaded ${QUESTIONS_25.length} distinct-SVG questions into database.`);

  // Create Attempt
  const attempt = await prisma.assessment_attempts.create({
    data: {
      assessment_id: assessment.id,
      student_id: CONSTANTS.STUDENT_ID,
      daily_assignment_id: assignment.id,
      status: 'NOT_STARTED',
      total_score: 0.0,
      time_spent_seconds: 0
    }
  });
  console.log(`✅ Created Attempt: ${attempt.id}`);

  // Update Assignment
  await prisma.daily_student_assignments.update({
    where: { id: assignment.id },
    data: {
      custom_session_minutes: 120,
      teacher_daily_note: "Cadet Keithley: Complete your 25 distinct visual challenges with custom telemetry diagrams on Lesson 10!"
    }
  });

  // Save JSON backup
  const backupPath = path.resolve(__dirname, 'content/math7_lesson10_practice_25q_2026_11_12.json');
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.writeFileSync(backupPath, JSON.stringify({
    assignedDate: CONSTANTS.ASSIGNED_DATE,
    studentId: CONSTANTS.STUDENT_ID,
    subjectId: CONSTANTS.SUBJECT_ID,
    assignmentId: assignment.id,
    assessmentId: assessment.id,
    attemptId: attempt.id,
    totalQuestions: QUESTIONS_25.length,
    questions: QUESTIONS_25
  }, null, 2));
  console.log('✅ Saved backup to:', backupPath);

  console.log('🎉 ALL DONE! 25-Question Distinct-SVG Mission Deployed.');
}

seed()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
