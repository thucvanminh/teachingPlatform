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
  // Q2: Opposite rays and adjacent supplementary angles
  math7_ch3_q2_opposite_rays: () => wrapSvg(
    "Q2: Opposite Rays & Vertical Angles",
    "Lines AC and MN intersecting at O with ray OB",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 1 · OPPOSITE RAYS &amp; VERTICAL ANGLES</text>
  <!-- Line AC -->
  <line x1="60" y1="200" x2="480" y2="200" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="50" y="205" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <text x="490" y="205" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Ray OB -->
  <line x1="270" y1="200" x2="380" y2="70" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <text x="390" y="75" fill="#F59E0B" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <!-- Line MN (rays OM and ON) -->
  <line x1="120" y1="280" x2="420" y2="120" stroke="#34D399" stroke-width="2.5" stroke-linecap="round"/>
  <text x="430" y="125" fill="#34D399" font-family="system-ui" font-size="15" font-weight="bold">M</text>
  <text x="105" y="295" fill="#34D399" font-family="system-ui" font-size="15" font-weight="bold">N</text>
  <!-- Center O -->
  <circle cx="270" cy="200" r="5" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="270" y="225" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">O</text>
  <!-- Angle Arcs -->
  <path d="M 270 200 L 320 200 A 50 50 0 0 0 307 160 Z" fill="rgba(6,182,212,0.25)" stroke="#06B6D4" stroke-width="1.8"/>
  <text x="325" y="185" fill="#06B6D4" font-family="monospace" font-size="12" font-weight="bold">∠COM</text>
  <path d="M 270 200 L 220 200 A 50 50 0 0 0 233 240 Z" fill="rgba(245,158,11,0.25)" stroke="#F59E0B" stroke-width="1.8"/>
  <text x="175" y="225" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">∠AON</text>`
  ),

  // Q5: Intersecting lines AB and CD with bisector OM
  math7_ch3_q5_bisector_opposite: () => wrapSvg(
    "Q5: Intersecting Lines with Angle Bisector",
    "Lines AB and CD intersecting at O with bisector OM of angle BOD",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 2 · BISECTOR OF VERTICAL ANGLE</text>
  <!-- Line AB -->
  <line x1="80" y1="240" x2="460" y2="100" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="65" y="248" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <text x="470" y="105" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <!-- Line CD -->
  <line x1="80" y1="100" x2="460" y2="240" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="65" y="105" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <text x="470" y="248" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">D</text>
  <!-- Center O -->
  <circle cx="270" cy="170" r="5" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="270" y="150" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">O</text>
  <!-- Bisector OM -->
  <line x1="270" y1="170" x2="480" y2="170" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6,3" stroke-linecap="round"/>
  <text x="490" y="175" fill="#F59E0B" font-family="system-ui" font-size="15" font-weight="bold">M</text>
  <!-- Arcs -->
  <text x="350" y="145" fill="#06B6D4" font-family="monospace" font-size="13" font-weight="bold">30°</text>
  <text x="350" y="200" fill="#06B6D4" font-family="monospace" font-size="13" font-weight="bold">30°</text>
  <path d="M 270 170 L 225 155 A 50 50 0 0 1 225 185 Z" fill="rgba(244,114,182,0.25)" stroke="#F472B6" stroke-width="2"/>
  <text x="160" y="175" fill="#F472B6" font-family="monospace" font-size="14" font-weight="bold">∠AOC = ?</text>`
  ),

  // Q6: Linear pair bisectors forming 90 deg (SGK H.3.47)
  math7_ch3_q6_linear_pair_bisectors: () => wrapSvg(
    "Q6: Bisectors of Supplementary Adjacent Angles",
    "Linear pair xOy and yOz with bisectors Ou and Ov",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 2 · LINEAR PAIR BISECTORS (90°)</text>
  <!-- Line zOx -->
  <line x1="60" y1="230" x2="480" y2="230" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="50" y="235" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">z</text>
  <text x="490" y="235" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">x</text>
  <!-- Center O -->
  <circle cx="270" cy="230" r="5" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="270" y="255" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">O</text>
  <!-- Ray Oy -->
  <line x1="270" y1="230" x2="330" y2="80" stroke="#FFF" stroke-width="2.5" stroke-linecap="round"/>
  <text x="335" y="75" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">y</text>
  <!-- Bisector Ou -->
  <line x1="270" y1="230" x2="430" y2="120" stroke="#34D399" stroke-width="2.5" stroke-linecap="round"/>
  <text x="440" y="125" fill="#34D399" font-family="system-ui" font-size="15" font-weight="bold">u</text>
  <!-- Bisector Ov -->
  <line x1="270" y1="230" x2="160" y2="100" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <text x="145" y="105" fill="#F59E0B" font-family="system-ui" font-size="15" font-weight="bold">v</text>
  <!-- Right Angle Square between Ou and Ov -->
  <path d="M 252 206 L 274 190 L 292 214" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <text x="270" y="180" fill="#22D3EE" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">90°</text>`
  ),

  // Q7: Three angles on a straight line (SGK H.3.51)
  math7_ch3_q7_three_angles_straight: () => wrapSvg(
    "Q7: Three Angles on a Straight Line",
    "Opposite rays Ox and Ox prime with angles O1=60, O3=70, find O2",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 2 · THREE ANGLES ON STRAIGHT LINE</text>
  <!-- Line x'Ox -->
  <line x1="60" y1="230" x2="480" y2="230" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="45" y="235" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">x'</text>
  <text x="490" y="235" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">x</text>
  <!-- Center O -->
  <circle cx="270" cy="230" r="5" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="270" y="255" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">O</text>
  <!-- Ray Oz (O1 = 60 deg) -->
  <line x1="270" y1="230" x2="160" y2="90" stroke="#C4B5FD" stroke-width="2.5" stroke-linecap="round"/>
  <text x="150" y="85" fill="#C4B5FD" font-family="system-ui" font-size="15" font-weight="bold">z</text>
  <!-- Ray Oy (O3 = 70 deg) -->
  <line x1="270" y1="230" x2="380" y2="90" stroke="#C4B5FD" stroke-width="2.5" stroke-linecap="round"/>
  <text x="390" y="85" fill="#C4B5FD" font-family="system-ui" font-size="15" font-weight="bold">y</text>
  <!-- Angle labels -->
  <text x="180" y="215" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">O₁ = 60°</text>
  <text x="270" y="140" fill="#F59E0B" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">O₂ = ?</text>
  <text x="330" y="215" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">O₃ = 70°</text>`
  ),

  // Q8: Three rays around a point summing to 360 deg (SGK H.3.52)
  math7_ch3_q8_three_rays_circle: () => wrapSvg(
    "Q8: Three Rays Summing to 360 Degrees",
    "Three rays xOy=120, yOz=110, find zOx",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 2 · CIRCULAR ANGLE CONVERGENCE</text>
  <circle cx="270" cy="170" r="5" fill="#22D3EE" filter="url(#neonGlow)"/>
  <text x="250" y="180" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">O</text>
  <!-- Ray Ox (0 deg) -->
  <line x1="270" y1="170" x2="470" y2="170" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="480" y="175" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">x</text>
  <!-- Ray Oy (120 deg -> up-left) -->
  <line x1="270" y1="170" x2="170" y2="40" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <text x="160" y="35" fill="#F59E0B" font-family="system-ui" font-size="15" font-weight="bold">y</text>
  <!-- Ray Oz (230 deg -> down-left) -->
  <line x1="270" y1="170" x2="160" y2="280" stroke="#34D399" stroke-width="2.5" stroke-linecap="round"/>
  <text x="150" y="295" fill="#34D399" font-family="system-ui" font-size="15" font-weight="bold">z</text>
  <!-- Labels -->
  <text x="310" y="115" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">120°</text>
  <text x="150" y="175" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">110°</text>
  <text x="310" y="240" fill="#F472B6" font-family="monospace" font-size="14" font-weight="bold">∠zOx = ?</text>`
  ),

  // Q9: Alternate interior angle pairs (SBT H.3.29)
  math7_ch3_q9_alternate_pairs: () => wrapSvg(
    "Q9: Identifying Alternate Interior Angles",
    "Lines cut by transversal with numbered angles at M and N",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 3 · ALTERNATE INTERIOR PAIRS</text>
  <!-- Lines 1 and 2 -->
  <line x1="50" y1="100" x2="490" y2="100" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <line x1="50" y1="220" x2="490" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <!-- Transversal -->
  <line x1="160" y1="285" x2="360" y2="35" stroke="#C4B5FD" stroke-width="3" stroke-linecap="round"/>
  <!-- Points M and N -->
  <circle cx="308" cy="100" r="5" fill="#22D3EE"/>
  <text x="320" y="90" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">M</text>
  <circle cx="212" cy="220" r="5" fill="#22D3EE"/>
  <text x="225" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">N</text>
  <!-- Numbered angles at M -->
  <text x="275" y="125" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">M₁</text>
  <text x="330" y="125" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">M₂</text>
  <!-- Numbered angles at N -->
  <text x="190" y="205" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">N₁</text>
  <text x="165" y="245" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">N₂</text>`
  ),

  // Q11: Corresponding angle positions (SBT H.3.30)
  math7_ch3_q11_corresponding_pos: () => wrapSvg(
    "Q11: Corresponding Angle Positions",
    "Lines a and b with transversal, angles A1 and B1 both at bottom-right",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 3 · CORRESPONDING ANGLE POSITIONS</text>
  <line x1="50" y1="100" x2="490" y2="100" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="495" y="105" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">a</text>
  <line x1="50" y1="220" x2="490" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="495" y="225" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">b</text>
  <!-- Transversal -->
  <line x1="390" y1="35" x2="170" y2="285" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <circle cx="333" cy="100" r="5" fill="#22D3EE"/>
  <text x="315" y="90" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="227" cy="220" r="5" fill="#22D3EE"/>
  <text x="210" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <!-- A1 bottom-right -->
  <path d="M 333 100 L 373 100 A 40 40 0 0 1 350 120 Z" fill="rgba(6,182,212,0.3)" stroke="#06B6D4" stroke-width="2"/>
  <text x="365" y="125" fill="#06B6D4" font-family="monospace" font-size="14" font-weight="bold">A₁</text>
  <!-- B1 bottom-right -->
  <path d="M 227 220 L 267 220 A 40 40 0 0 1 244 240 Z" fill="rgba(6,182,212,0.3)" stroke="#06B6D4" stroke-width="2"/>
  <text x="260" y="245" fill="#06B6D4" font-family="monospace" font-size="14" font-weight="bold">B₁</text>`
  ),

  // Q12: Parallel line test criteria (SBT H.3.31)
  math7_ch3_q12_parallel_test: () => wrapSvg(
    "Q12: Parallel Recognition Test",
    "Numbered angles at intersections A and B for testing a || b",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 3 · PARALLEL LINE CRITERIA</text>
  <line x1="50" y1="100" x2="490" y2="100" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="495" y="105" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">a</text>
  <line x1="50" y1="220" x2="490" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="495" y="225" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">b</text>
  <line x1="160" y1="285" x2="360" y2="35" stroke="#C4B5FD" stroke-width="3" stroke-linecap="round"/>
  <circle cx="308" cy="100" r="5" fill="#22D3EE"/><text x="310" y="75" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="212" cy="220" r="5" fill="#22D3EE"/><text x="210" y="260" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <!-- At A: 1(top-right), 2(top-left), 3(bottom-left) -->
  <text x="345" y="90" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">A₁</text>
  <text x="270" y="90" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">A₂</text>
  <text x="270" y="125" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">A₃</text>
  <!-- At B: 1(top-right), 2(top-left), 3(bottom-left) -->
  <text x="245" y="210" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">B₁</text>
  <text x="175" y="210" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">B₂</text>
  <text x="165" y="245" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">B₃</text>`
  ),

  // Q13: Parallel lines properties (SBT H.3.32)
  math7_ch3_q13_parallel_properties: () => wrapSvg(
    "Q13: Parallel Line Properties Check",
    "Lines a || b cut by transversal with angles A1, A2, A3 and B1, B2, B3",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 4 · THEOREM DEDUCTION (a ∥ b)</text>
  <line x1="50" y1="100" x2="490" y2="100" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="495" y="105" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">a</text>
  <line x1="50" y1="220" x2="490" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="495" y="225" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">b</text>
  <!-- Transversal slanting right-down -->
  <line x1="140" y1="40" x2="380" y2="280" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <circle cx="200" cy="100" r="5" fill="#22D3EE"/><text x="215" y="80" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="320" cy="220" r="5" fill="#22D3EE"/><text x="335" y="220" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <text x="165" y="90" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">A₁</text>
  <text x="165" y="125" fill="#F472B6" font-family="monospace" font-size="13" font-weight="bold">A₂</text>
  <text x="235" y="125" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">A₃</text>
  <text x="285" y="210" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">B₁</text>
  <text x="285" y="245" fill="#F472B6" font-family="monospace" font-size="13" font-weight="bold">B₂</text>
  <text x="355" y="245" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">B₃</text>`
  ),

  // Q14: Consecutive interior angles summing to 180 deg (SBT H.3.33)
  math7_ch3_q14_consecutive_interior: () => wrapSvg(
    "Q14: Consecutive Interior Angles Proof",
    "Lines xy and x'y' cut by m with angles 130 and 50 deg",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 4 · CONSECUTIVE INTERIOR PROOF</text>
  <!-- Line xy -->
  <line x1="50" y1="100" x2="490" y2="100" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="50" y="90" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">x</text>
  <text x="490" y="90" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">y</text>
  <!-- Line x'y' -->
  <line x1="50" y1="220" x2="490" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="50" y="210" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">x'</text>
  <text x="490" y="210" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">y'</text>
  <!-- Transversal m -->
  <line x1="160" y1="285" x2="350" y2="55" stroke="#C4B5FD" stroke-width="3" stroke-linecap="round"/>
  <text x="355" y="65" fill="#C4B5FD" font-family="system-ui" font-size="15" font-weight="bold">m</text>
  <circle cx="308" cy="100" r="5" fill="#22D3EE"/><text x="325" y="90" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="212" cy="220" r="5" fill="#22D3EE"/><text x="195" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <!-- 130 deg at top -->
  <text x="240" y="85" fill="#F59E0B" font-family="monospace" font-size="14" font-weight="bold">130°</text>
  <!-- 50 deg at bottom -->
  <text x="250" y="205" fill="#34D399" font-family="monospace" font-size="14" font-weight="bold">50°</text>`
  ),

  // Q15: Trapezoid with right angles and B = 2C (SGK 3.27)
  math7_ch3_q15_trapezoid: () => wrapSvg(
    "Q15: Right Trapezoid Angle Telemetry",
    "Trapezoid ABCD with AD perpendicular to AB and CD, B = 2C",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 4 · RIGHT TRAPEZOID DYNAMICS</text>
  <!-- Trapezoid ABCD: A(140, 90), B(380, 90), C(460, 230), D(140, 230) -->
  <polygon points="140,90 380,90 460,230 140,230" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <circle cx="140" cy="90" r="5" fill="#22D3EE"/><text x="120" y="85" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="380" cy="90" r="5" fill="#22D3EE"/><text x="395" y="85" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <circle cx="460" cy="230" r="5" fill="#22D3EE"/><text x="475" y="235" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <circle cx="140" cy="230" r="5" fill="#22D3EE"/><text x="120" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">D</text>
  <!-- Right angle symbols at A and D -->
  <path d="M 140 106 L 156 106 L 156 90" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <path d="M 140 214 L 156 214 L 156 230" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <!-- Angles B and C -->
  <text x="310" y="125" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">∠B = 2∠C</text>
  <text x="375" y="215" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">∠C = ?</text>`
  ),

  // Q17: Bisectors of alternate interior angles (SGK H.3.48)
  math7_ch3_q17_bisectors_alternate: () => wrapSvg(
    "Q17: Parallel Bisectors of Alternate Interior Angles",
    "Lines c || d with perpendicular transversal b and bisectors Ax || By",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 5 · ALTERNATE BISECTORS PARALLEL</text>
  <!-- Lines c and d -->
  <line x1="60" y1="100" x2="480" y2="100" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="490" y="105" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">c</text>
  <line x1="60" y1="220" x2="480" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="490" y="225" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">d</text>
  <!-- Transversal b (vertical) -->
  <line x1="240" y1="65" x2="240" y2="265" stroke="#FFF" stroke-width="2.5" stroke-linecap="round"/>
  <text x="255" y="65" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">b</text>
  <circle cx="240" cy="100" r="5" fill="#22D3EE"/><text x="220" y="90" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="240" cy="220" r="5" fill="#22D3EE"/><text x="220" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <!-- Right angles -->
  <path d="M 240 115 L 255 115 L 255 100" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <path d="M 240 205 L 225 205 L 225 220" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <!-- Bisector Ax (down-left at 45 deg) -->
  <line x1="240" y1="100" x2="130" y2="210" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <text x="115" y="220" fill="#F59E0B" font-family="system-ui" font-size="15" font-weight="bold">x</text>
  <!-- Bisector By (up-right at 45 deg) -->
  <line x1="240" y1="220" x2="350" y2="110" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <text x="360" y="105" fill="#F59E0B" font-family="system-ui" font-size="15" font-weight="bold">y</text>
  <text x="175" y="145" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">45°</text>
  <text x="275" y="185" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">45°</text>`
  ),

  // Q18: Triangle with parallel ray Cx (SBT H.3.34)
  math7_ch3_q18_triangle_parallel_ray: () => wrapSvg(
    "Q18: Triangle with Parallel Ray Cx",
    "Triangle ABC with AB || Cx, A=70, B=60, find C1, C2, C3",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 5 · TRIANGLE ANGLE MULTIPLEX</text>
  <!-- Triangle ABC: B(100, 230), C(320, 230), A(190, 80) -->
  <polygon points="100,230 320,230 190,80" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <!-- Extended base to D -->
  <line x1="320" y1="230" x2="470" y2="230" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
  <text x="480" y="235" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">D</text>
  <!-- Ray Cx parallel to AB: vector AB is (90, -150). From C(320, 230) to (410, 80) -->
  <line x1="320" y1="230" x2="420" y2="63" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <text x="430" y="60" fill="#F59E0B" font-family="system-ui" font-size="15" font-weight="bold">x</text>
  <!-- Vertices -->
  <circle cx="190" cy="80" r="5" fill="#22D3EE"/><text x="190" y="65" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">A (70°)</text>
  <circle cx="100" cy="230" r="5" fill="#22D3EE"/><text x="75" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B (60°)</text>
  <circle cx="320" cy="230" r="5" fill="#22D3EE"/><text x="315" y="255" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Angles C1, C2, C3 -->
  <text x="270" y="215" fill="#FFF" font-family="monospace" font-size="13" font-weight="bold">C₁</text>
  <text x="325" y="160" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">C₂</text>
  <text x="380" y="215" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">C₃</text>`
  ),

  // Q20: Exterior angle bisector CN parallel to AB (SBT H.3.35)
  math7_ch3_q20_exterior_bisector: () => wrapSvg(
    "Q20: Exterior Angle Bisector Parallel to Opposite Side",
    "Triangle ABC with B=70, C=40, bisector CN of exterior angle ACM",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 5 · EXTERIOR BISECTOR PARALLEL</text>
  <!-- Triangle ABC: B(100, 230), C(340, 230), A(180, 80) -->
  <polygon points="100,230 340,230 180,80" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <!-- Extended base to M -->
  <line x1="340" y1="230" x2="480" y2="230" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
  <text x="490" y="235" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">M</text>
  <!-- Ray CN bisector of ACM (angle ACM is 140 deg, so ray is at 70 deg from CM) -->
  <line x1="340" y1="230" x2="430" y2="65" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <text x="440" y="60" fill="#F59E0B" font-family="system-ui" font-size="15" font-weight="bold">N</text>
  <!-- Vertices -->
  <circle cx="180" cy="80" r="5" fill="#22D3EE"/><text x="160" y="75" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="100" cy="230" r="5" fill="#22D3EE"/><text x="80" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B (70°)</text>
  <circle cx="340" cy="230" r="5" fill="#22D3EE"/><text x="330" y="255" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Angles -->
  <text x="290" y="215" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">40°</text>
  <text x="360" y="160" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">70°</text>
  <text x="400" y="215" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">70°</text>`
  ),

  // Q22: Network of perpendicular and parallel lines (SGK 3.30)
  math7_ch3_q22_perpendicular_network: () => wrapSvg(
    "Q22: Perpendicular and Parallel Network",
    "Lines a || b both perp to c, and d perp to a",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 6 · PERPENDICULAR NETWORK</text>
  <!-- Horizontal lines a and b -->
  <line x1="60" y1="110" x2="480" y2="110" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="490" y="115" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">a</text>
  <line x1="60" y1="220" x2="480" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="490" y="225" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">b</text>
  <!-- Vertical lines c and d -->
  <line x1="180" y1="70" x2="180" y2="265" stroke="#34D399" stroke-width="3" stroke-linecap="round"/>
  <text x="180" y="62" fill="#34D399" font-family="system-ui" font-size="16" font-weight="bold" text-anchor="middle">c</text>
  <line x1="360" y1="70" x2="360" y2="265" stroke="#C4B5FD" stroke-width="3" stroke-linecap="round"/>
  <text x="360" y="62" fill="#C4B5FD" font-family="system-ui" font-size="16" font-weight="bold" text-anchor="middle">d</text>
  <!-- Right angles at intersections -->
  <path d="M 180 125 L 195 125 L 195 110" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <path d="M 180 235 L 195 235 L 195 220" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <path d="M 360 125 L 375 125 L 375 110" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <path d="M 360 235 L 375 235 L 375 220" fill="none" stroke="#22D3EE" stroke-width="2"/>`
  ),

  // Q23: Triangle altitude AH and parallel line d through A (SGK H.3.49)
  math7_ch3_q23_altitude_parallel: () => wrapSvg(
    "Q23: Triangle Altitude and Parallel Line",
    "Triangle ABC with altitude AH and line d through A with angle dAC=50, C=50",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 6 · ALTITUDE &amp; PARALLEL TEST</text>
  <!-- Triangle ABC: B(100, 240), C(420, 240), A(270, 90) -->
  <polygon points="100,240 420,240 270,90" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <!-- Base BC -->
  <circle cx="100" cy="240" r="5" fill="#22D3EE"/><text x="80" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <circle cx="420" cy="240" r="5" fill="#22D3EE"/><text x="430" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <circle cx="270" cy="90" r="5" fill="#22D3EE"/><text x="270" y="75" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">A</text>
  <!-- Altitude AH -->
  <line x1="270" y1="90" x2="270" y2="240" stroke="#FFF" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="270" cy="240" r="5" fill="#22D3EE"/><text x="270" y="260" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">H</text>
  <path d="M 270 225 L 285 225 L 285 240" fill="none" stroke="#22D3EE" stroke-width="2"/>
  <!-- Line d through A parallel to BC -->
  <line x1="60" y1="90" x2="480" y2="90" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <text x="490" y="95" fill="#F59E0B" font-family="system-ui" font-size="16" font-weight="bold">d</text>
  <!-- Angles 50 deg -->
  <text x="310" y="115" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">50°</text>
  <text x="375" y="225" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">50°</text>`
  ),

  // Q25: Zigzag theorem Ax || By with vertex C (SGK H.3.50)
  math7_ch3_q25_zigzag_theorem: () => wrapSvg(
    "Q25: The Classic Zigzag Theorem",
    "Rays Ax || By with bent trajectory through C, prove C = A + B",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 7 · ZIGZAG ANGLE THEOREM</text>
  <!-- Ray Ax -->
  <line x1="120" y1="80" x2="480" y2="80" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <circle cx="120" cy="80" r="5" fill="#22D3EE"/><text x="100" y="85" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <text x="490" y="85" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">x</text>
  <!-- Ray By -->
  <line x1="160" y1="240" x2="480" y2="240" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <circle cx="160" cy="240" r="5" fill="#22D3EE"/><text x="140" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <text x="490" y="245" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">y</text>
  <!-- Bent Path A -> C -> B -->
  <line x1="120" y1="80" x2="270" y2="160" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <line x1="270" y1="160" x2="160" y2="240" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <circle cx="270" cy="160" r="5" fill="#22D3EE"/>
  <!-- Point C label above vertex -->
  <text x="270" y="142" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">C</text>
  <!-- Dashed auxiliary line Cz -->
  <line x1="270" y1="160" x2="480" y2="160" stroke="#34D399" stroke-width="2" stroke-dasharray="6,4" stroke-linecap="round"/>
  <text x="490" y="165" fill="#34D399" font-family="system-ui" font-size="15" font-weight="bold">z</text>
  <!-- Angle labels -->
  <text x="155" y="115" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">∠A</text>
  <text x="220" y="165" fill="#F472B6" font-family="monospace" font-size="14" font-weight="bold">∠C</text>
  <text x="175" y="220" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">∠B</text>`
  ),

  // Q26: Bent corridor BOD with Ox || AB (SBT H.3.36)
  math7_ch3_q26_bent_corridor: () => wrapSvg(
    "Q26: Bent Corridor Telemetry with Ray Ox",
    "AB and CD with vertex O, BOD=110, B=40, D=70, ray Ox || AB",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 7 · BENT CORRIDOR TELEMETRY</text>
  <!-- Line segment AB -->
  <line x1="120" y1="80" x2="380" y2="80" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <circle cx="120" cy="80" r="5" fill="#FFF"/><text x="105" y="85" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <circle cx="380" cy="80" r="5" fill="#22D3EE"/><text x="395" y="75" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <!-- Segment BO to vertex O -->
  <line x1="380" y1="80" x2="250" y2="155" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <circle cx="250" cy="155" r="5" fill="#22D3EE"/><text x="230" y="160" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">O</text>
  <!-- Ray Ox -->
  <line x1="250" y1="155" x2="470" y2="155" stroke="#34D399" stroke-width="2.5" stroke-dasharray="6,3" stroke-linecap="round"/>
  <text x="480" y="160" fill="#34D399" font-family="system-ui" font-size="15" font-weight="bold">x</text>
  <!-- Segment OD to D -->
  <line x1="250" y1="155" x2="330" y2="250" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <circle cx="330" cy="250" r="5" fill="#22D3EE"/><text x="340" y="260" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">D</text>
  <!-- Line segment CD -->
  <line x1="120" y1="250" x2="330" y2="250" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <circle cx="120" cy="250" r="5" fill="#FFF"/><text x="105" y="255" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Angles (positioned off lines) -->
  <text x="345" y="70" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">40°</text>
  <text x="275" y="145" fill="#F472B6" font-family="monospace" font-size="13" font-weight="bold">110°</text>
  <text x="295" y="240" fill="#34D399" font-family="monospace" font-size="13" font-weight="bold">70°</text>`
  ),

  // Q27: Numerical Zigzag angle calculation (Ax || By, 38 and 52 deg)
  math7_ch3_q27_zigzag_calc: () => wrapSvg(
    "Q27: Numerical Zigzag Calculation",
    "Ax || By with waypoint C, angle xAC = 38 deg, angle yBC = 52 deg, find ACB",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 7 · WAYPOINT ANGLE CALCULATION</text>
  <!-- Ray Ax -->
  <line x1="110" y1="80" x2="480" y2="80" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <circle cx="110" cy="80" r="5" fill="#22D3EE"/><text x="90" y="85" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">A</text>
  <text x="490" y="85" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">x</text>
  <!-- Ray By -->
  <line x1="110" y1="240" x2="480" y2="240" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <circle cx="110" cy="240" r="5" fill="#22D3EE"/><text x="90" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B</text>
  <text x="490" y="245" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">y</text>
  <!-- Path AC and BC -->
  <line x1="110" y1="80" x2="280" y2="160" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <line x1="110" y1="240" x2="280" y2="160" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <circle cx="280" cy="160" r="6" fill="#F472B6" filter="url(#neonGlow)"/><text x="295" y="165" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Labels -->
  <text x="160" y="115" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">38°</text>
  <text x="200" y="165" fill="#F472B6" font-family="monospace" font-size="14" font-weight="bold">∠ACB = ?</text>
  <text x="160" y="220" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">52°</text>`
  ),

  // Q28: Dual parallels from triangle vertices BE || AC and CF || AB (SBT H.3.37)
  math7_ch3_q28_dual_parallels: () => wrapSvg(
    "Q28: Dual Parallels from Triangle Vertices",
    "Triangle ABC with BE || AC and CF || AB, A=80, B=60",
    `  <rect x="120" y="15" width="300" height="28" rx="14" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="34" fill="#E2E8F0" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">SECTOR 7 · DUAL PARALLEL CORRIDORS</text>
  <!-- Triangle ABC: B(170, 220), C(350, 220), A(250, 100) -->
  <polygon points="170,220 350,220 250,100" fill="rgba(6,182,212,0.12)" stroke="#38BDF8" stroke-width="3"/>
  <!-- Extended base to z -->
  <line x1="350" y1="220" x2="480" y2="220" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
  <text x="490" y="225" fill="#38BDF8" font-family="system-ui" font-size="15" font-weight="bold">z</text>
  <!-- BE parallel to AC: AC vector is (100, 120), so BE from (170, 220) to (90, 124) -->
  <line x1="170" y1="220" x2="90" y2="124" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <text x="80" y="120" fill="#F59E0B" font-family="system-ui" font-size="15" font-weight="bold">E</text>
  <!-- CF parallel to AB: AB vector is (-80, 120), so CF from (350, 220) to (430, 100) -->
  <line x1="350" y1="220" x2="430" y2="100" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>
  <text x="440" y="95" fill="#F59E0B" font-family="system-ui" font-size="15" font-weight="bold">F</text>
  <!-- Vertices -->
  <circle cx="250" cy="100" r="5" fill="#22D3EE"/><text x="250" y="85" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle">A (80°)</text>
  <circle cx="170" cy="220" r="5" fill="#22D3EE"/><text x="145" y="240" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">B (60°)</text>
  <circle cx="350" cy="220" r="5" fill="#22D3EE"/><text x="350" y="245" fill="#FFF" font-family="system-ui" font-size="15" font-weight="bold">C</text>
  <!-- Labels -->
  <text x="60" y="195" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">BE ∥ AC</text>
  <text x="410" y="175" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">CF ∥ AB</text>`
  )
};

console.log('Writing SVGs to:', SVG_DIR);
let count = 0;
for (const [name, generator] of Object.entries(svgs)) {
  const filePath = path.join(SVG_DIR, `${name}.svg`);
  fs.writeFileSync(filePath, generator(), 'utf8');
  count++;
}
console.log(`✅ Successfully generated ${count} SVG files.`);
