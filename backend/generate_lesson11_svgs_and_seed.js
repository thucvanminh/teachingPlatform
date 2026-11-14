const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake
  SUBJECT_ID: 'e89cc834-99d0-40b7-ab5e-0a0838d273c4', // MATH_7
  ASSIGNED_DATE: '2026-11-14'
};

const SVG_DIR = path.resolve(__dirname, '../frontend/public/images/geometry');
fs.mkdirSync(SVG_DIR, { recursive: true });

function wrapSvg(title, desc, innerContent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 300" width="100%" height="260" role="img" aria-labelledby="title desc">
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
  <rect width="540" height="300" rx="16" fill="url(#bgGrad)" stroke="#06B6D4" stroke-width="1.5" stroke-opacity="0.3"/>
${innerContent}
</svg>`;
}

// 15 SVG Generators for Lesson 11 Exercises
const svgs = {
  // Q6: Statement Matrix m ⊥ d & n ⊥ d => m ∥ n
  q6: wrapSvg(
    "Q6: Formal Statement Matrix",
    "Statement matrix showing Given and Prove for double perpendicular theorem",
    `  <rect x="120" y="15" width="300" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">STATEMENT MATRIX • GT / KL</text>
  <g transform="translate(60, 65)">
    <rect width="420" height="180" rx="12" fill="#0A1628" stroke="#38BDF8" stroke-width="1.5"/>
    <line x1="140" y1="0" x2="140" y2="180" stroke="#1E293B" stroke-width="1.5"/>
    <line x1="0" y1="90" x2="420" y2="90" stroke="#1E293B" stroke-width="1.5"/>
    <text x="70" y="52" fill="#67E8F9" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">GIVEN (GT)</text>
    <text x="280" y="45" fill="#F8FAFC" font-family="monospace" font-size="15" text-anchor="middle">m ⊥ d</text>
    <text x="280" y="70" fill="#F8FAFC" font-family="monospace" font-size="15" text-anchor="middle">n ⊥ d</text>
    <text x="70" y="142" fill="#6EE7B7" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">PROVE (KL)</text>
    <text x="280" y="145" fill="#34D399" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle" filter="url(#neonGlow)">m ∥ n</text>
  </g>`
  ),

  // Q13: Bridge Angle in Vertical Angles Proof
  q13: wrapSvg(
    "Q13: Bridge Angle in Vertical Angles Proof",
    "Two intersecting lines xy and x'y' with bridge angle",
    `  <rect x="135" y="15" width="270" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">VERTICAL ANGLES BRIDGE MODEL</text>
  <line x1="90" y1="230" x2="450" y2="70" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
  <text x="75" y="245" fill="#38BDF8" font-size="14" font-weight="bold">x</text>
  <text x="460" y="70" fill="#38BDF8" font-size="14" font-weight="bold">y</text>
  <line x1="110" y1="65" x2="430" y2="235" stroke="#F43F5E" stroke-width="3" stroke-linecap="round"/>
  <text x="95" y="60" fill="#F43F5E" font-size="14" font-weight="bold">x'</text>
  <text x="445" y="245" fill="#F43F5E" font-size="14" font-weight="bold">y'</text>
  <circle cx="270" cy="150" r="5" fill="#FACC15"/>
  <text x="270" y="172" fill="#FACC15" font-size="15" font-weight="bold" text-anchor="middle">O</text>
  <path d="M 315 130 A 45 45 0 0 0 305 170" fill="none" stroke="#22D3EE" stroke-width="2.5"/>
  <text x="350" y="155" fill="#22D3EE" font-size="12" font-weight="bold">∠xOy</text>
  <path d="M 225 170 A 45 45 0 0 0 235 130" fill="none" stroke="#22D3EE" stroke-width="2.5"/>
  <text x="175" y="155" fill="#22D3EE" font-size="12" font-weight="bold">∠x'Oy'</text>
  <path d="M 305 170 A 40 40 0 0 1 225 170" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="4 3"/>
  <text x="270" y="210" fill="#F59E0B" font-size="12" font-weight="bold" text-anchor="middle">∠xOy' (Bridge)</text>`
  ),

  // Q14: Algebraic Vertical Angles (3x - 10 = 2x + 15)
  q14: wrapSvg(
    "Q14: Algebraic Vertical Angles",
    "Intersecting lines with algebraic expressions 3x-10 and 2x+15",
    `  <rect x="135" y="15" width="270" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">ALGEBRAIC VERTICAL ANGLES</text>
  <line x1="80" y1="210" x2="460" y2="90" stroke="#38BDF8" stroke-width="3"/>
  <line x1="120" y1="70" x2="420" y2="230" stroke="#F43F5E" stroke-width="3"/>
  <circle cx="270" cy="150" r="5" fill="#FACC15"/><text x="270" y="172" fill="#FACC15" font-size="14" font-weight="bold" text-anchor="middle">O</text>
  <text x="340" y="130" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">3x - 10°</text>
  <text x="130" y="175" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">2x + 15°</text>
  <rect x="170" y="245" width="200" height="32" rx="8" fill="#0C1B2E" stroke="#38BDF8" stroke-width="1"/>
  <text x="270" y="266" fill="#F8FAFC" font-family="monospace" font-size="13" text-anchor="middle">Find x and ∠xOy</text>`
  ),

  // Q15: Linear Pair at Intersection (52 deg and 128 deg)
  q15: wrapSvg(
    "Q15: Linear Pair at Intersection",
    "Straight line with intersecting beam forming supplementary angles",
    `  <rect x="135" y="15" width="270" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">LINEAR PAIR TELEMETRY</text>
  <line x1="60" y1="180" x2="480" y2="180" stroke="#38BDF8" stroke-width="3.5"/>
  <text x="490" y="185" fill="#38BDF8" font-size="14" font-weight="bold">C</text>
  <text x="45" y="185" fill="#38BDF8" font-size="14" font-weight="bold">A</text>
  <line x1="270" y1="180" x2="400" y2="65" stroke="#F59E0B" stroke-width="3"/>
  <text x="410" y="60" fill="#F59E0B" font-size="14" font-weight="bold">B</text>
  <circle cx="270" cy="180" r="5" fill="#FACC15"/><text x="270" y="205" fill="#FACC15" font-size="14" font-weight="bold" text-anchor="middle">O</text>
  <path d="M 330 180 A 60 60 0 0 0 310 145" fill="none" stroke="#F59E0B" stroke-width="2.5"/>
  <text x="330" y="155" fill="#F59E0B" font-family="monospace" font-size="14" font-weight="bold">52°</text>
  <path d="M 210 180 A 60 60 0 0 1 310 145" fill="none" stroke="#38BDF8" stroke-width="2.5"/>
  <text x="210" y="145" fill="#38BDF8" font-family="monospace" font-size="14" font-weight="bold">∠BOC = ?</text>`
  ),

  // Q17: Perpendicular Transversal Theorem: a || b, c ⊥ a
  q17: wrapSvg(
    "Q17: Perpendicular Transversal Theorem",
    "Lines a and b parallel, transversal c perpendicular to a",
    `  <rect x="120" y="15" width="300" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">PERPENDICULAR TRANSVERSAL THEOREM</text>
  <line x1="60" y1="90" x2="480" y2="90" stroke="#38BDF8" stroke-width="3"/>
  <text x="490" y="95" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="60" y1="210" x2="480" y2="210" stroke="#38BDF8" stroke-width="3"/>
  <text x="490" y="215" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <line x1="200" y1="45" x2="200" y2="255" stroke="#C084FC" stroke-width="3"/>
  <text x="200" y="38" fill="#C084FC" font-size="16" font-weight="bold" text-anchor="middle">c</text>
  <rect x="200" y="90" width="16" height="16" fill="#06B6D433" stroke="#22D3EE" stroke-width="1.5"/>
  <circle cx="200" cy="90" r="4.5" fill="#FFF"/><text x="180" y="85" fill="#FFF" font-size="13" font-weight="bold">A</text>
  <rect x="200" y="210" width="16" height="16" fill="#10B98133" stroke="#34D399" stroke-width="1.5" stroke-dasharray="3 2"/>
  <circle cx="200" cy="210" r="4.5" fill="#FFF"/><text x="180" y="225" fill="#FFF" font-size="13" font-weight="bold">B</text>
  <text x="320" y="155" fill="#34D399" font-family="system-ui" font-size="14" font-weight="bold">Deduce: c ⊥ b</text>`
  ),

  // Q18: Double Perpendicular: m ⊥ d & n ⊥ d => m || n
  q18: wrapSvg(
    "Q18: Double Perpendicular Theorem",
    "Lines m and n both perpendicular to line d",
    `  <rect x="120" y="15" width="300" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">DOUBLE PERPENDICULAR THEOREM</text>
  <line x1="80" y1="50" x2="80" y2="250" stroke="#A78BFA" stroke-width="3.5"/>
  <text x="80" y="40" fill="#A78BFA" font-size="16" font-weight="bold" text-anchor="middle">d</text>
  <line x1="50" y1="100" x2="480" y2="100" stroke="#38BDF8" stroke-width="3"/>
  <text x="490" y="105" fill="#38BDF8" font-size="16" font-weight="bold">m</text>
  <rect x="80" y="100" width="16" height="16" fill="#06B6D433" stroke="#22D3EE" stroke-width="1.5"/>
  <line x1="50" y1="200" x2="480" y2="200" stroke="#38BDF8" stroke-width="3"/>
  <text x="490" y="205" fill="#38BDF8" font-size="16" font-weight="bold">n</text>
  <rect x="80" y="200" width="16" height="16" fill="#06B6D433" stroke="#22D3EE" stroke-width="1.5"/>
  <text x="280" y="155" fill="#FACC15" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">m ⊥ d &amp; n ⊥ d ⟹ m ∥ n</text>`
  ),

  // Q19: Missing Reason in Alternate Interior Angles Step
  q19: wrapSvg(
    "Q19: Missing Reason in Deductive Step",
    "Proof step where B1 = A1 with a question mark reason",
    `  <rect x="120" y="15" width="300" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">PROOF STEP JUSTIFICATION RADAR</text>
  <g transform="translate(60, 65)">
    <rect width="420" height="180" rx="12" fill="#0B1325" stroke="#6366F1" stroke-width="1.5"/>
    <text x="25" y="45" fill="#A5B4FC" font-size="13" font-weight="bold">Premise: a ∥ b cut by transversal c</text>
    <rect x="25" y="70" width="370" height="50" rx="8" fill="#1E1B4B" stroke="#818CF8" stroke-width="1"/>
    <text x="45" y="100" fill="#FFFFFF" font-family="monospace" font-size="15" font-weight="bold">∠B₁ = ∠A₁  ( ... ? ... )</text>
    <text x="25" y="150" fill="#38BDF8" font-size="12">Identify the required geometric justification in parentheses.</text>
  </g>`
  ),

  // Q20: Right Triangle between Parallels and Perpendicular Strut
  q20: wrapSvg(
    "Q20: Right Triangle Between Parallels",
    "Corridors a and b parallel with perpendicular strut AB and brace AC",
    `  <rect x="120" y="15" width="300" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">RIGHT TRIANGLE BETWEEN PARALLELS</text>
  <line x1="50" y1="80" x2="490" y2="80" stroke="#38BDF8" stroke-width="3"/><text x="500" y="85" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="50" y1="220" x2="490" y2="220" stroke="#38BDF8" stroke-width="3"/><text x="500" y="225" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <line x1="160" y1="80" x2="160" y2="220" stroke="#C4B5FD" stroke-width="3"/>
  <circle cx="160" cy="80" r="4.5" fill="#FFF"/><text x="140" y="75" fill="#FFF" font-size="13" font-weight="bold">A</text>
  <circle cx="160" cy="220" r="4.5" fill="#FFF"/><text x="140" y="235" fill="#FFF" font-size="13" font-weight="bold">B</text>
  <rect x="160" y="204" width="16" height="16" fill="#10B98133" stroke="#34D399" stroke-width="1.5"/>
  <line x1="160" y1="80" x2="380" y2="220" stroke="#F59E0B" stroke-width="2.5"/>
  <circle cx="380" cy="220" r="4.5" fill="#FFF"/><text x="395" y="235" fill="#FFF" font-size="13" font-weight="bold">C</text>
  <text x="185" y="105" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">38°</text>
  <text x="330" y="205" fill="#F472B6" font-family="monospace" font-size="13" font-weight="bold">∠ACB = ?</text>`
  ),

  // Q21: Angle Bisector AT meets Parallel Line b
  q21: wrapSvg(
    "Q21: Angle Bisector with Parallel Transversal",
    "Parallel lines a and b, transversal AB, angle bisector AT",
    `  <rect x="120" y="15" width="300" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">BISECTOR ON PARALLEL CORRIDORS</text>
  <line x1="50" y1="80" x2="490" y2="80" stroke="#38BDF8" stroke-width="3"/><text x="500" y="85" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="50" y1="220" x2="490" y2="220" stroke="#38BDF8" stroke-width="3"/><text x="500" y="225" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <line x1="160" y1="80" x2="160" y2="220" stroke="#C4B5FD" stroke-width="2.5"/>
  <circle cx="160" cy="80" r="4.5" fill="#FFF"/><text x="145" y="75" fill="#FFF" font-size="13" font-weight="bold">A</text>
  <circle cx="160" cy="220" r="4.5" fill="#FFF"/><text x="145" y="235" fill="#FFF" font-size="13" font-weight="bold">B</text>
  <line x1="160" y1="80" x2="360" y2="220" stroke="#F59E0B" stroke-width="2.5" filter="url(#neonGlow)"/>
  <circle cx="360" cy="220" r="4.5" fill="#F59E0B"/><text x="375" y="235" fill="#FFF" font-size="13" font-weight="bold">T</text>
  <text x="180" y="115" fill="#38BDF8" font-family="monospace" font-size="12" font-weight="bold">∠A₃ = 68°</text>
  <text x="315" y="205" fill="#F472B6" font-family="monospace" font-size="13" font-weight="bold">∠ATB = ?</text>`
  ),

  // Q22: Perpendicular Intersection of Consecutive Interior Bisectors
  q22: wrapSvg(
    "Q22: Consecutive Interior Bisectors Perpendicularity",
    "Bisectors of consecutive interior angles meeting at point P at right angle",
    `  <rect x="110" y="15" width="320" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">CONSECUTIVE BISECTORS INTERSECTION P</text>
  <line x1="40" y1="80" x2="500" y2="80" stroke="#38BDF8" stroke-width="3"/><text x="510" y="85" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="40" y1="220" x2="500" y2="220" stroke="#38BDF8" stroke-width="3"/><text x="510" y="225" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <line x1="180" y1="80" x2="180" y2="220" stroke="#C4B5FD" stroke-width="2.5"/>
  <circle cx="180" cy="80" r="4.5" fill="#FFF"/><text x="160" y="75" fill="#FFF" font-size="13" font-weight="bold">A</text>
  <circle cx="180" cy="220" r="4.5" fill="#FFF"/><text x="160" y="235" fill="#FFF" font-size="13" font-weight="bold">B</text>
  <line x1="180" y1="80" x2="280" y2="150" stroke="#F59E0B" stroke-width="2.2" stroke-dasharray="4 3"/>
  <line x1="180" y1="220" x2="280" y2="150" stroke="#F59E0B" stroke-width="2.2" stroke-dasharray="4 3"/>
  <circle cx="280" cy="150" r="5.5" fill="#F59E0B" filter="url(#neonGlow)"/>
  <text x="295" y="155" fill="#FEF3C7" font-size="15" font-weight="bold">P</text>
  <rect x="272" y="140" width="14" height="14" fill="#F59E0B33" stroke="#F59E0B" stroke-width="1.5" transform="rotate(25 280 150)"/>
  <text x="270" y="260" fill="#A7F3D0" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">Always: ∠APB = 90°</text>`
  ),

  // Q23: Parallel Bisectors of Alternate Interior Angles (u || v)
  q23: wrapSvg(
    "Q23: Parallel Bisectors of Alternate Interior Angles",
    "Bisectors of alternate interior angles are mutually parallel",
    `  <rect x="110" y="15" width="320" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">BISECTORS OF ALTERNATE INTERIOR ANGLES</text>
  <line x1="40" y1="80" x2="500" y2="80" stroke="#38BDF8" stroke-width="3"/><text x="510" y="85" fill="#38BDF8" font-size="16" font-weight="bold">a</text>
  <line x1="40" y1="220" x2="500" y2="220" stroke="#38BDF8" stroke-width="3"/><text x="510" y="225" fill="#38BDF8" font-size="16" font-weight="bold">b</text>
  <line x1="180" y1="240" x2="360" y2="60" stroke="#C4B5FD" stroke-width="2.5"/>
  <circle cx="310" cy="110" r="4.5" fill="#FFF"/><text x="295" y="100" fill="#FFF" font-size="13" font-weight="bold">A</text>
  <circle cx="230" cy="190" r="4.5" fill="#FFF"/><text x="245" y="205" fill="#FFF" font-size="13" font-weight="bold">B</text>
  <line x1="310" y1="110" x2="160" y2="60" stroke="#34D399" stroke-width="2.5"/>
  <text x="145" y="65" fill="#34D399" font-size="14" font-weight="bold">u</text>
  <line x1="230" y1="190" x2="80" y2="140" stroke="#34D399" stroke-width="2.5"/>
  <text x="65" y="145" fill="#34D399" font-size="14" font-weight="bold">v</text>
  <text x="360" y="260" fill="#34D399" font-family="monospace" font-size="14" font-weight="bold">Deduction: u ∥ v</text>`
  ),

  // Q24: Right Angle xOy = 90 with Ray Oz (32 deg) and Bisector Ot
  q24: wrapSvg(
    "Q24: Right Angle Ray Decomposition & Bisector",
    "Ray Ox perp Oy, Oz at 32 deg, Ot bisects zOy",
    `  <rect x="110" y="15" width="320" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">PERPENDICULAR RAYS &amp; BISECTOR Ot</text>
  <line x1="160" y1="230" x2="450" y2="230" stroke="#38BDF8" stroke-width="3"/><text x="460" y="235" fill="#38BDF8" font-size="14" font-weight="bold">x</text>
  <line x1="160" y1="230" x2="160" y2="50" stroke="#38BDF8" stroke-width="3"/><text x="160" y="40" fill="#38BDF8" font-size="14" font-weight="bold">y</text>
  <circle cx="160" cy="230" r="5" fill="#FACC15"/><text x="145" y="245" fill="#FACC15" font-size="14" font-weight="bold">O</text>
  <rect x="160" y="214" width="16" height="16" fill="#06B6D433" stroke="#22D3EE" stroke-width="1.5"/>
  <line x1="160" y1="230" x2="380" y2="115" stroke="#F59E0B" stroke-width="2.5"/><text x="390" y="115" fill="#F59E0B" font-size="14" font-weight="bold">z</text>
  <line x1="160" y1="230" x2="280" y2="70" stroke="#F43F5E" stroke-width="2.5" stroke-dasharray="4 3"/><text x="290" y="70" fill="#F43F5E" font-size="14" font-weight="bold">t</text>
  <text x="240" y="215" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">32°</text>
  <text x="270" y="275" fill="#F43F5E" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">∠xOt = ?</text>`
  ),

  // Q25: Formal Proof Table with Blank Step 2
  q25: wrapSvg(
    "Q25: Formal Proof Table Step Deduction",
    "Proof table with Step 2 blank to identify the missing statement",
    `  <rect x="110" y="15" width="320" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">FORMAL PROOF TABLE DEDUCTION</text>
  <g transform="translate(40, 60)">
    <rect width="460" height="200" rx="10" fill="#0A1628" stroke="#38BDF8" stroke-width="1.5"/>
    <line x1="60" y1="0" x2="60" y2="200" stroke="#1E293B" stroke-width="1"/>
    <line x1="280" y1="0" x2="280" y2="200" stroke="#1E293B" stroke-width="1"/>
    <line x1="0" y1="40" x2="460" y2="40" stroke="#1E293B" stroke-width="1.5"/>
    <line x1="0" y1="95" x2="460" y2="95" stroke="#1E293B" stroke-width="1"/>
    <line x1="0" y1="150" x2="460" y2="150" stroke="#1E293B" stroke-width="1"/>
    <text x="30" y="26" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">STEP</text>
    <text x="170" y="26" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">STATEMENT</text>
    <text x="370" y="26" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">REASON (JUSTIFICATION)</text>
    <text x="30" y="72" fill="#E2E8F0" font-size="12" text-anchor="middle">1</text>
    <text x="170" y="72" fill="#E2E8F0" font-size="12" text-anchor="middle">a ⊥ c &amp; b ⊥ c</text>
    <text x="370" y="72" fill="#94A3B8" font-size="11" text-anchor="middle">Hypothesis (Given)</text>
    <text x="30" y="127" fill="#E2E8F0" font-size="12" text-anchor="middle">2</text>
    <rect x="75" y="105" width="190" height="34" rx="6" fill="#14324F" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="170" y="127" fill="#FACC15" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">[ ... ? ... ]</text>
    <text x="370" y="127" fill="#94A3B8" font-size="10.5" text-anchor="middle">Theorem: 2 lines ⊥ 3rd line</text>
    <text x="30" y="180" fill="#E2E8F0" font-size="12" text-anchor="middle">3</text>
    <text x="170" y="180" fill="#E2E8F0" font-size="12" text-anchor="middle">∠A₁ = ∠B₁</text>
    <text x="370" y="180" fill="#94A3B8" font-size="10.5" text-anchor="middle">Alternate interior angles</text>
  </g>`
  ),

  // Q27: Transitivity of Parallels: p || q || r
  q27: wrapSvg(
    "Q27: Transitivity of Parallel Lines",
    "Three parallel lines p, q, and r demonstrating transitivity theorem",
    `  <rect x="110" y="15" width="320" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">TRANSITIVITY THEOREM • p ∥ q ∥ r</text>
  <line x1="60" y1="80" x2="480" y2="80" stroke="#38BDF8" stroke-width="3"/><text x="495" y="85" fill="#38BDF8" font-size="16" font-weight="bold">p</text>
  <line x1="60" y1="150" x2="480" y2="150" stroke="#38BDF8" stroke-width="3"/><text x="495" y="155" fill="#38BDF8" font-size="16" font-weight="bold">q</text>
  <line x1="60" y1="220" x2="480" y2="220" stroke="#38BDF8" stroke-width="3"/><text x="495" y="225" fill="#38BDF8" font-size="16" font-weight="bold">r</text>
  <text x="270" y="270" fill="#34D399" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">p ∥ q   and   q ∥ r   ⟹   p ∥ r</text>`
  ),

  // Q29: Three Parallel Lines a || b || c with Transversal d (46 deg)
  q29: wrapSvg(
    "Q29: Three Parallel Lines with Transversal",
    "Lines a || b || c cut by transversal d, acute angle 46 deg",
    `  <rect x="110" y="15" width="320" height="26" rx="13" fill="#0F172A" stroke="#22D3EE" stroke-width="1.2"/>
  <text x="270" y="33" fill="#E2E8F0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">THREE PARALLEL CORRIDORS &amp; TRANSVERSAL</text>
  <line x1="50" y1="70" x2="490" y2="70" stroke="#38BDF8" stroke-width="2.5"/><text x="500" y="75" fill="#38BDF8" font-size="15" font-weight="bold">a</text>
  <line x1="50" y1="140" x2="490" y2="140" stroke="#38BDF8" stroke-width="2.5"/><text x="500" y="145" fill="#38BDF8" font-size="15" font-weight="bold">b</text>
  <line x1="50" y1="210" x2="490" y2="210" stroke="#38BDF8" stroke-width="2.5"/><text x="500" y="215" fill="#38BDF8" font-size="15" font-weight="bold">c</text>
  <line x1="160" y1="245" x2="340" y2="35" stroke="#C4B5FD" stroke-width="2.5"/><text x="350" y="45" fill="#C4B5FD" font-size="15" font-weight="bold">d</text>
  <text x="330" y="90" fill="#38BDF8" font-family="monospace" font-size="12" font-weight="bold">46°</text>
  <text x="200" y="195" fill="#F472B6" font-family="monospace" font-size="13" font-weight="bold">∠(d, c) = ?</text>`
  )
};

// Write SVGs to disk
console.log('Writing Lesson 11 exercise SVGs to:', SVG_DIR);
for (const [key, svg] of Object.entries(svgs)) {
  const filePath = path.join(SVG_DIR, `math7_l11_${key}.svg`);
  fs.writeFileSync(filePath, svg, 'utf8');
}
console.log(`✅ Generated ${Object.keys(svgs).length} exercise SVGs successfully.`);

// 30 Rigorous Multiple-Choice Questions
const QUESTIONS_30 = [
  // --- SECTOR 1: MERCURY ORBIT (Q1 - Q4) ---
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 1: Mercury Orbit • Theorem Anatomy & Hypothesis vs. Conclusion",
    content_markdown: "What is the mathematical definition of a **theorem** in Euclidean geometry?\n\n![Theorem Architecture](/images/geometry/math7_l11_theorem_anatomy.svg)",
    options: [
      { id: 'A', text: "A mathematical statement established as true through rigorous logical deduction from accepted axioms" },
      { id: 'B', text: "An intuitive self-evident assumption accepted universally across mathematics without requiring any formal proof" },
      { id: 'C', text: "An empirical physical measurement obtained exclusively through precision lab experiments and instrument trials" },
      { id: 'D', text: "A provisional computational formula that holds true strictly under three-dimensional non-Euclidean coordinates" }
    ],
    correct_option_id: 'A',
    explanation: "A theorem is a mathematical truth established by logical deduction from axioms, definitions, or previously proven theorems."
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 1: Mercury Orbit • Theorem Anatomy & Hypothesis vs. Conclusion",
    content_markdown: "Every theorem in geometry consists of two essential structural components. What are they?",
    options: [
      { id: 'A', text: "Algebraic Constant terms and unknown Variable magnitudes defining the problem system" },
      { id: 'B', text: "Hypothesis (Given premises / GT) and Conclusion (Target statements to Prove / KL)" },
      { id: 'C', text: "Cartesian Coordinate axes and Linear Equation slope-intercept relationships" },
      { id: 'D', text: "Geometric Perimeter boundary lengths and Total Enclosed Surface Area measurements" }
    ],
    correct_option_id: 'B',
    explanation: "Every theorem follows the structure: IF [Hypothesis / Given / GT] THEN [Conclusion / Prove / KL]."
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 1: Mercury Orbit • Theorem Anatomy & Hypothesis vs. Conclusion",
    content_markdown: "Consider the theorem: *'If two straight lines are both perpendicular to a third line, then they are parallel to each other.'* What is the **Hypothesis (Given / GT)**?",
    options: [
      { id: 'A', text: "The two lines never meet and remain strictly parallel to each other throughout the infinite plane" },
      { id: 'B', text: "All three straight lines converge and meet at a single common coordinate intersection waypoint" },
      { id: 'C', text: "Two distinct straight lines are both perpendicular to a third transversal line in the plane" },
      { id: 'D', text: "The third reference line is positioned horizontally and bisects the distance between both lines" }
    ],
    correct_option_id: 'C',
    explanation: "The Hypothesis is the starting condition introduced by the word 'If': 'Two straight lines are both perpendicular to a third line'."
  },
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 1: Mercury Orbit • Theorem Anatomy & Hypothesis vs. Conclusion",
    content_markdown: "Consider the theorem: *'If a transversal intersects two parallel lines, then alternate interior angles are equal.'* What is the **Conclusion (Prove / KL)**?",
    options: [
      { id: 'A', text: "A single transversal straight line intersects two pre-existing parallel lines across two distinct points" },
      { id: 'B', text: "The transversal line is oriented strictly perpendicular to both target lines forming right angles" },
      { id: 'C', text: "The two coplanar straight lines are skew and never maintain a constant perpendicular separation" },
      { id: 'D', text: "The pairs of alternate interior angles formed at both intersection nodes have equal degree measures" }
    ],
    correct_option_id: 'D',
    explanation: "The Conclusion is the target truth derived following the word 'then': 'Alternate interior angles are equal'."
  },

  // --- SECTOR 2: VENUS BASE (Q5 - Q8) ---
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 2: Venus Base • Translating Theorems into IF-THEN Architecture",
    content_markdown: "Rewrite the concise geometric fact: *'Two vertically opposite angles are equal'* into standard **'IF... THEN...'** theorem architecture.",
    options: [
      { id: 'A', text: "If two angles are vertically opposite, then they have equal angle measures" },
      { id: 'B', text: "If two angles have equal degree measures, then they must always be vertically opposite across a vertex" },
      { id: 'C', text: "If two angles form a collinear linear pair on a line, then their degree measures are strictly equal" },
      { id: 'D', text: "If two angles are adjacent and share a common ray, then their combined total measure is always $180^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "Standard IF-THEN structure places the condition after 'If' and the consequence after 'then': 'If two angles are vertically opposite, then they are equal in measure'."
  },
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 2: Venus Base • Translating Theorems into IF-THEN Architecture",
    content_markdown: "Look at the telemetry statement matrix below. Which theorem statement accurately corresponds to this matrix?\n\n![Figure: Statement Matrix](/images/geometry/math7_l11_q6.svg)",
    options: [
      { id: 'A', text: "If line $m$ is parallel to line $n$, then both lines must be strictly perpendicular to transversal line $d$" },
      { id: 'B', text: "If two lines $m$ and $n$ are both perpendicular to line $d$, then line $m$ is parallel to line $n$" },
      { id: 'C', text: "If line $m$ is perpendicular to line $n$ at point $d$, then line $d$ bisects both lines at right angles" },
      { id: 'D', text: "If lines $m$ and $n$ intersect transversal line $d$ at acute angles, then line $m$ is perpendicular to line $n$" }
    ],
    correct_option_id: 'B',
    explanation: "The Given (GT) is $m \\perp d$ and $n \\perp d$, and the Prove (KL) is $m \\parallel n$, matching Option B."
  },
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 2: Venus Base • Translating Theorems into IF-THEN Architecture",
    content_markdown: "Which of the following statements is **FALSE** regarding conditional mathematical theorems?",
    options: [
      { id: 'A', text: "The Hypothesis (Given / GT) explicitly outlines all assumed premises and starting geometric facts" },
      { id: 'B', text: "The Conclusion (Prove / KL) specifies the ultimate target assertion to be validated via deductive reasoning" },
      { id: 'C', text: "Swapping the Hypothesis and Conclusion (the converse statement) always guarantees another true theorem" },
      { id: 'D', text: "A rigorous geometric proof must proceed logically from the Given premises using justified deduction steps" }
    ],
    correct_option_id: 'C',
    explanation: "Swapping hypothesis and conclusion forms the converse statement, which is not always true (e.g., 'If two angles are right angles, they are equal' is true, but its converse is false)."
  },
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 2: Venus Base • Translating Theorems into IF-THEN Architecture",
    content_markdown: "How is the definition of an angle bisector correctly formulated as an 'IF-THEN' theorem?",
    options: [
      { id: 'A', text: "If any arbitrary ray is drawn originating from an angle vertex in a plane, then all adjacent sub-angles become equal" },
      { id: 'B', text: "If two arbitrary angles are supplementary summing to $180^\\circ$, then their shared interior ray forms a perpendicular line" },
      { id: 'C', text: "If an angle has an interior opening of exactly $90^\\circ$, then every interior ray drawn through it forms an angle bisector" },
      { id: 'D', text: "If a ray lies between two sides of an angle and divides it into two equal sub-angles, then it is the angle bisector" }
    ],
    correct_option_id: 'D',
    explanation: "An angle bisector is defined by lying inside the angle and dividing it into two equal parts, which yields the conclusion of being the angle bisector."
  },

  // --- SECTOR 3: EARTH MISSION CONTROL (Q9 - Q12) ---
  {
    order_index: 9,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 3: Earth Mission Control • The 3-Step Deductive Engine & Justifications",
    content_markdown: "What is the correct logical order of the 3-step deductive proof engine?",
    options: [
      { id: 'A', text: "1. State the Given premises $\\to$ 2. Build deductive bridge steps citing reasons $\\to$ 3. State target Conclusion" },
      { id: 'B', text: "1. State the target Conclusion $\\to$ 2. Measure angles with an optical protractor $\\to$ 3. Infer the Given premises" },
      { id: 'C', text: "1. Calculate arbitrary coordinates $\\to$ 2. Sketch an informal schematic diagram $\\to$ 3. Declare the theorem proven" },
      { id: 'D', text: "1. Conclude Q.E.D. at origin $\\to$ 2. Enumerate all geometric postulates $\\to$ 3. Formulate the initial Given premises" }
    ],
    correct_option_id: 'A',
    explanation: "The standard 3-step engine begins from the Given facts, constructs logical bridge steps citing valid justifications, and concludes the target result."
  },
  {
    order_index: 10,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 3: Earth Mission Control • The 3-Step Deductive Engine & Justifications",
    content_markdown: "At the conclusion of a formal mathematical proof, cadets write **Q.E.D.** What does this traditional Latin acronym signify?",
    options: [
      { id: 'A', text: "*Quantum Equitatis Determinatio* (\"quantum equivalence has been numerically determined\")" },
      { id: 'B', text: "*Quod erat demonstrandum* (\"which was required to be demonstrated through formal proof\")" },
      { id: 'C', text: "*Quaestio experimentalis deducta* (\"the experimental question has been empirically verified\")" },
      { id: 'D', text: "*Quasi evidens definitio* (\"the statement is intuitively accepted as self-evident\")" }
    ],
    correct_option_id: 'B',
    explanation: "Q.E.D. stands for *quod erat demonstrandum*, meaning 'which was to be demonstrated / which had to be proved'."
  },
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 3: Earth Mission Control • The 3-Step Deductive Engine & Justifications",
    content_markdown: "In a formal geometric proof, why is every deductive step required to state a justification in parentheses (e.g., *Linear pair*, *Alternate interior angles*)?",
    options: [
      { id: 'A', text: "It is purely a historical typesetting convention preserved for visual symmetry without affecting proof validity" },
      { id: 'B', text: "To allow symbolic automated solvers to format geometric statements as standard algebraic polynomial equations" },
      { id: 'C', text: "Because every logical step must link directly to an established axiom, definition, or proven theorem for validity" },
      { id: 'D', text: "Justifications are required exclusively when dealing with right angles and are omitted for all other angle measures" }
    ],
    correct_option_id: 'C',
    explanation: "Every step in a proof must be backed by an established axiom, definition, or proven theorem to guarantee logical validity."
  },
  {
    order_index: 12,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 3: Earth Mission Control • The 3-Step Deductive Engine & Justifications",
    content_markdown: "Which of the following is **NOT** a mathematically valid justification in a formal geometric proof?",
    options: [
      { id: 'A', text: "*(Two angles forming a linear pair on a straight line are supplementary, summing to $180^\\circ$)*" },
      { id: 'B', text: "*(Alternate interior angles formed by a transversal intersecting parallel lines are equal)*" },
      { id: 'C', text: "*(Two lines intersecting at right angles are perpendicular by standard geometric definition)*" },
      { id: 'D', text: "*(The two angles look visually identical and overlap when inspected on the computer screen)*" }
    ],
    correct_option_id: 'D',
    explanation: "Visual appearance or manual measurement is never a valid mathematical justification in deductive geometry."
  },

  // --- SECTOR 4: MARS OUTPOST (Q13 - Q16) ---
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 4: Mars Outpost • Vertical Angles Theorem & Proof Telemetry",
    content_markdown: "In proving the Vertical Angles Theorem ($\\widehat{xOy} = \\widehat{x'Oy'}$), which angle serves as the intermediate **bridge angle** that is supplementary to both?\n\n![Figure: Vertical Angles Bridge](/images/geometry/math7_l11_q13.svg)",
    options: [
      { id: 'A', text: "Adjacent angle $\\widehat{xOy'}$ (or $\\widehat{x'Oy}$), which forms a linear pair with both angles" },
      { id: 'B', text: "The target angle $\\widehat{xOy}$ itself, by assuming it equals its own reflection without deduction" },
      { id: 'C', text: "The complete circular perigon angle of $360^\\circ$ surrounding vertex $O$ across all four quadrants" },
      { id: 'D', text: "A reference right angle of $90^\\circ$ constructed perpendicular to the bisector of $\\widehat{xOy}$" }
    ],
    correct_option_id: 'A',
    explanation: "Both vertically opposite angles form linear pairs with adjacent angle $\\widehat{xOy'}$, so $\\widehat{xOy} = 180^\\circ - \\widehat{xOy'}$ and $\\widehat{x'Oy'} = 180^\\circ - \\widehat{xOy'}$."
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 4: Mars Outpost • Vertical Angles Theorem & Proof Telemetry",
    content_markdown: "Telemetry lines $xy$ and $x'y'$ intersect at beacon $O$. Given that vertically opposite angles measure $\\widehat{xOy} = (3x - 10)^\\circ$ and $\\widehat{x'Oy'} = (2x + 15)^\\circ$, find the value of $x$ and the degree measure of $\\widehat{xOy}$.\n\n![Figure: Algebraic Vertical Angles](/images/geometry/math7_l11_q14.svg)",
    options: [
      { id: 'A', text: "$x = 20$, yielding angle measure $\\widehat{xOy} = 50^\\circ$" },
      { id: 'B', text: "$x = 25$, yielding angle measure $\\widehat{xOy} = 65^\\circ$" },
      { id: 'C', text: "$x = 30$, yielding angle measure $\\widehat{xOy} = 80^\\circ$" },
      { id: 'D', text: "$x = 15$, yielding angle measure $\\widehat{xOy} = 35^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "By the Vertical Angles Theorem: $3x - 10 = 2x + 15 \\implies x = 25$. Then $\\widehat{xOy} = 3(25) - 10 = 65^\\circ$."
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 4: Mars Outpost • Vertical Angles Theorem & Proof Telemetry",
    content_markdown: "Two navigation corridors intersect at station $O$ such that acute angle $\\widehat{AOB} = 52^\\circ$. What is the measure of adjacent angle $\\widehat{BOC}$?\n\n![Figure: Linear Pair Telemetry](/images/geometry/math7_l11_q15.svg)",
    options: [
      { id: 'A', text: "$52^\\circ$ (Equal to the given acute angle because vertically opposite angles are equal)" },
      { id: 'B', text: "$38^\\circ$ (Complementary angle subtracted from a right angle: $90^\\circ - 52^\\circ$)" },
      { id: 'C', text: "$128^\\circ$ (Supplementary angle forming a linear pair on line $AC$: $180^\\circ - 52^\\circ$)" },
      { id: 'D', text: "$142^\\circ$ (Calculated by mistakenly subtracting the given acute angle from an arbitrary $194^\\circ$ sum)" }
    ],
    correct_option_id: 'C',
    explanation: "Angles $\\widehat{AOB}$ and $\\widehat{BOC}$ form a linear pair on straight line $AC$: $\\widehat{BOC} = 180^\\circ - 52^\\circ = 128^\\circ$."
  },
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 4: Mars Outpost • Vertical Angles Theorem & Proof Telemetry",
    content_markdown: "At any intersection of two straight lines, what is the exact sum of all four angles formed around the vertex point?",
    options: [
      { id: 'A', text: "$90^\\circ$ (The measure of a single standard right angle formed by perpendicular rays)" },
      { id: 'B', text: "$180^\\circ$ (The exact supplementary sum of two adjacent linear pair angles along an unbroken straight line)" },
      { id: 'C', text: "$270^\\circ$ (The combined sum of three consecutive right angles in a coordinate plane)" },
      { id: 'D', text: "$360^\\circ$ (The combined sum of two supplementary linear pairs around the common vertex)" }
    ],
    correct_option_id: 'D',
    explanation: "Two straight lines form two pairs of supplementary angles: $180^\\circ + 180^\\circ = 360^\\circ$."
  },

  // --- SECTOR 5: JUPITER STATION (Q17 - Q20) ---
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 5: Jupiter Station • Perpendicular to Parallel Deductions",
    content_markdown: "Corridors $a$ and $b$ are parallel ($a \\parallel b$). Laser mast $c$ is perpendicular to corridor $a$ ($c \\perp a$). What theorem allows you to immediately deduce that $c \\perp b$?\n\n![Figure: Perpendicular Transversal](/images/geometry/math7_l11_q17.svg)",
    options: [
      { id: 'A', text: "The Perpendicular Transversal Theorem (A line perpendicular to one of two parallel lines is perpendicular to the other)" },
      { id: 'B', text: "The Vertical Angles Theorem (Two straight lines intersecting at a point form equal pairs of opposite angles)" },
      { id: 'C', text: "The Complementary Angles Theorem (Two acute angles that compose a right angle always sum to exactly $90^\\circ$)" },
      { id: 'D', text: "The Parallel Line Uniqueness Axiom (Through any point external to a line, exactly one coplanar parallel line can ever be drawn)" }
    ],
    correct_option_id: 'A',
    explanation: "By the Perpendicular Transversal Theorem (Theorem 2 in SGK), a line perpendicular to one of two parallel lines is perpendicular to the other ($c \\perp b$)."
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 5: Jupiter Station • Perpendicular to Parallel Deductions",
    content_markdown: "Docking struts $m$ and $n$ are both installed perpendicular to station spar $d$ ($m \\perp d$ and $n \\perp d$). What is the geometric relationship between struts $m$ and $n$?\n\n![Figure: Double Perpendicular](/images/geometry/math7_l11_q18.svg)",
    options: [
      { id: 'A', text: "$m \\perp n$ (Struts $m$ and $n$ are mutually perpendicular and meet at a right angle)" },
      { id: 'B', text: "$m \\parallel n$ (Struts $m$ and $n$ are parallel because both are perpendicular to line $d$)" },
      { id: 'C', text: "$m \\not\\parallel n$ (Struts $m$ and $n$ intersect diagonally at an acute angle of $45^\\circ$)" },
      { id: 'D', text: "$m \\equiv n$ (Struts $m$ and $n$ must be coincident and represent the exact same line)" }
    ],
    correct_option_id: 'B',
    explanation: "Theorem 1 states: Two distinct lines perpendicular to a common line are parallel to each other ($m \\parallel n$)."
  },
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 5: Jupiter Station • Perpendicular to Parallel Deductions",
    content_markdown: "Cadet Alex is writing a formal proof that $c \\perp b$:\n*Step 1: Lines $a \\parallel b$ are cut by transversal $c \\implies \\widehat{B_1} = \\widehat{A_1}$ ( ... ? ... ).*\nWhat is the correct mathematical justification for this step?\n\n![Figure: Proof Step Justification](/images/geometry/math7_l11_q19.svg)",
    options: [
      { id: 'A', text: "*(Two angles forming a linear pair on a straight line are supplementary summing to $180^\\circ$)*" },
      { id: 'B', text: "*(Definition of perpendicular lines intersecting to form four consecutive right angles of $90^\\circ$)*" },
      { id: 'C', text: "*(Alternate interior angles formed by a transversal cutting two parallel lines are equal)*" },
      { id: 'D', text: "*(The total sum of three interior angles in any Euclidean triangle is constantly equal to $180^\\circ$)*" }
    ],
    correct_option_id: 'C',
    explanation: "Angles $\\widehat{B_1}$ and $\\widehat{A_1}$ are alternate interior angles formed by transversal $c$ crossing parallel lines $a \\parallel b$."
  },
  {
    order_index: 20,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 5: Jupiter Station • Perpendicular to Parallel Deductions",
    content_markdown: "Corridors $a \\parallel b$ are connected by perpendicular strut $AB$ ($AB \\perp b$ at $B$). Diagonal brace $AC$ forms angle $\\widehat{BAC} = 38^\\circ$ with line $a$. What is the measure of angle $\\widehat{ACB}$ in triangle $ABC$?\n\n![Figure: Right Triangle between Parallels](/images/geometry/math7_l11_q20.svg)",
    options: [
      { id: 'A', text: "$\\widehat{ACB} = 38^\\circ$ (Alternate interior angle to $\\widehat{BAC}$ along transversal $AC$)" },
      { id: 'B', text: "$\\widehat{ACB} = 90^\\circ$ (Perpendicular connection angle at vertex $C$ along corridor $b$)" },
      { id: 'C', text: "$\\widehat{ACB} = 42^\\circ$ (Calculated by assuming an incorrect vertex angle of $48^\\circ$)" },
      { id: 'D', text: "$\\widehat{ACB} = 52^\\circ$ (Acute angle complementary to $38^\\circ$ in right triangle $ABC$)" }
    ],
    correct_option_id: 'D',
    explanation: "Because $a \\parallel b$ and $AB \\perp b$, we have $AB \\perp a$. In right triangle $ABC$ with $\\widehat{B} = 90^\\circ$: $\\widehat{ACB} = 90^\\circ - 38^\\circ = 52^\\circ$."
  },

  // --- SECTOR 6: SATURN RINGS (Q21 - Q24) ---
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 6: Saturn Rings • Angle Bisectors & Chained Deductive Proofs",
    content_markdown: "Parallel corridors $a \\parallel b$ are cut by transversal line $AB$. Ray $AT$ is the angle bisector of $\\widehat{A_3} = 68^\\circ$, meeting line $b$ at point $T$. What is the measure of alternate interior angle $\\widehat{ATB}$?\n\n![Figure: Bisector on Parallel Corridors](/images/geometry/math7_l11_q21.svg)",
    options: [
      { id: 'A', text: "$\\widehat{ATB} = 34^\\circ$ (Alternate interior angle equal to half of $\\widehat{A_3}$ via bisector $AT$)" },
      { id: 'B', text: "$\\widehat{ATB} = 68^\\circ$ (Alternate interior angle equal to the entire unsplit angle $\\widehat{A_3}$)" },
      { id: 'C', text: "$\\widehat{ATB} = 112^\\circ$ (Consecutive interior angle that is supplementary to the original unbisected $68^\\circ$ angle)" },
      { id: 'D', text: "$\\widehat{ATB} = 56^\\circ$ (Complementary angle subtracted from a standard right angle of $90^\\circ$)" }
    ],
    correct_option_id: 'A',
    explanation: "Ray $AT$ bisects $68^\\circ$ into two $34^\\circ$ angles. Between parallel lines $a \\parallel b$ cut by transversal $AT$, alternate interior angle $\\widehat{ATB} = 34^\\circ$."
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 6: Saturn Rings • Angle Bisectors & Chained Deductive Proofs",
    content_markdown: "Theorem: The angle bisectors of two consecutive interior angles formed by parallel lines cut by a transversal ALWAYS intersect at what fixed angle?\n\n![Figure: Consecutive Bisectors Intersection](/images/geometry/math7_l11_q22.svg)",
    options: [
      { id: 'A', text: "$\\widehat{P} = 60^\\circ$ (The interior angle characteristic of an equilateral triangle formed by the intersecting rays)" },
      { id: 'B', text: "$\\widehat{P} = 90^\\circ$ (Because the two half-angles sum to $90^\\circ$, making the third angle $90^\\circ$)" },
      { id: 'C', text: "$\\widehat{P} = 45^\\circ$ (Half of the standard perpendicular orientation between the parallel rails)" },
      { id: 'D', text: "$\\widehat{P} = 120^\\circ$ (Obtuse angle formed when consecutive interior angles are unequal)" }
    ],
    correct_option_id: 'B',
    explanation: "Consecutive interior angles sum to $180^\\circ$, so their halves sum to $90^\\circ$. In the triangle formed by the transversal and bisectors, the third angle is $180^\\circ - 90^\\circ = 90^\\circ$."
  },
  {
    order_index: 23,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 6: Saturn Rings • Angle Bisectors & Chained Deductive Proofs",
    content_markdown: "Lines $a \\parallel b$. Ray $u$ bisects alternate interior angle $\\widehat{A_3}$, and ray $v$ bisects alternate interior angle $\\widehat{B_1}$. What is the geometric relationship between ray $u$ and ray $v$?\n\n![Figure: Parallel Bisectors](/images/geometry/math7_l11_q23.svg)",
    options: [
      { id: 'A', text: "$u \\perp v$ (The bisecting rays are mutually perpendicular and meet at a right angle)" },
      { id: 'B', text: "$u \\not\\parallel v$ (The bisecting rays converge and intersect at an acute angle of $45^\\circ$)" },
      { id: 'C', text: "$u \\parallel v$ (The rays are parallel because they form equal alternate interior angles)" },
      { id: 'D', text: "$u \\equiv v$ (The two bisecting rays coincide along the same collinear line trajectory)" }
    ],
    correct_option_id: 'C',
    explanation: "Since alternate interior angles are equal, their halves are equal. These half-angles form equal alternate interior angles for rays $u$ and $v$, proving $u \\parallel v$."
  },
  {
    order_index: 24,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 6: Saturn Rings • Angle Bisectors & Chained Deductive Proofs",
    content_markdown: "In a docking frame, ray $Ox \\perp Oy$ ($\\widehat{xOy} = 90^\\circ$). Ray $Oz$ lies inside angle $\\widehat{xOy}$ such that $\\widehat{xOz} = 32^\\circ$. Ray $Ot$ is the bisector of $\\widehat{zOy}$. What is the measure of angle $\\widehat{xOt}$?\n\n![Figure: Perpendicular Rays and Bisector](/images/geometry/math7_l11_q24.svg)",
    options: [
      { id: 'A', text: "$\\widehat{xOt} = 29^\\circ$ (The measure of half of the remaining angle $\\widehat{zOy}$ alone)" },
      { id: 'B', text: "$\\widehat{xOt} = 58^\\circ$ (The measure of the entire unbisected remaining angle $\\widehat{zOy}$ without bisector partitioning)" },
      { id: 'C', text: "$\\widehat{xOt} = 32^\\circ$ (Equal to the initial given angle $\\widehat{xOz}$ without bisector addition)" },
      { id: 'D', text: "$\\widehat{xOt} = 61^\\circ$ (Sum of initial angle $32^\\circ$ and half-angle $29^\\circ$: $32^\\circ + 29^\\circ$)" }
    ],
    correct_option_id: 'D',
    explanation: "Angle $\\widehat{zOy} = 90^\\circ - 32^\\circ = 58^\\circ$. Bisector $Ot$ divides it into two $29^\\circ$ angles. Thus $\\widehat{xOt} = 32^\\circ + 29^\\circ = 61^\\circ$."
  },

  // --- SECTOR 7: URANUS DEEP SPACE (Q25 - Q27) ---
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Step Proof Logic & Missing Step Deduction",
    content_markdown: "Examine the formal proof table below. What statement belongs in Step 2?\n\n![Figure: Formal Proof Table](/images/geometry/math7_l11_q25.svg)",
    options: [
      { id: 'A', text: "$a \\parallel b$ (Lines $a$ and $b$ are parallel because both are perpendicular to transversal $c$)" },
      { id: 'B', text: "$a \\perp b$ (Lines $a$ and $b$ are perpendicular and form a right angle intersection in space)" },
      { id: 'C', text: "$\\widehat{A_1} + \\widehat{B_1} = 90^\\circ$ (The interior angles are complementary summing to a right angle)" },
      { id: 'D', text: "$c \\parallel a$ (Transversal line $c$ is parallel to rail $a$ and never intersects it in the plane)" }
    ],
    correct_option_id: 'A',
    explanation: "Step 2 applies the Double Perpendicular Theorem to deduce that line $a$ is parallel to line $b$ ($a \\parallel b$)."
  },
  {
    order_index: 26,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Step Proof Logic & Missing Step Deduction",
    content_markdown: "Cadet Leo submitted this proof: *'To prove $a \\parallel b$, I assume $\\widehat{A_1} = \\widehat{B_1} = 60^\\circ$ because they look equal. Therefore $a \\parallel b$.'* What is the fatal logical flaw in Leo's argument?",
    options: [
      { id: 'A', text: "Leo should have arbitrarily chosen $90^\\circ$ instead of $60^\\circ$ to force lines to be perpendicular" },
      { id: 'B', text: "Leo assumed the conclusion's angle equality without deriving it from the Given (Circular Reasoning)" },
      { id: 'C', text: "Parallel lines cut by a transversal can never exhibit equal alternate interior angles under Euclidean rules" },
      { id: 'D', text: "Only interior angles inside closed geometric triangles are permitted to assume values of exactly $60^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "Assuming an unstated angle property without deriving it from the Given is circular reasoning, which invalidates a proof."
  },
  {
    order_index: 27,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Step Proof Logic & Missing Step Deduction",
    content_markdown: "If line $p \\parallel q$ and line $q \\parallel r$, which theorem directly proves that $p \\parallel r$?\n\n![Figure: Transitivity Theorem](/images/geometry/math7_l11_q27.svg)",
    options: [
      { id: 'A', text: "The Vertical Angles Theorem (Intersecting straight lines produce equal pairs of opposite angles at the vertex)" },
      { id: 'B', text: "The Linear Pair Postulate (Two adjacent angles forming a straight line are supplementary and sum to $180^\\circ$)" },
      { id: 'C', text: "The Transitivity of Parallel Lines Theorem (Two lines parallel to a third line are parallel to each other)" },
      { id: 'D', text: "The Complementary Angle Theorem (Two adjacent angles that form a right angle always sum to exactly $90^\\circ$)" }
    ],
    correct_option_id: 'C',
    explanation: "Theorem 3 states: Two distinct straight lines parallel to a third line are parallel to each other (Transitivity)."
  },

  // --- SECTOR 8: NEPTUNE FRONTIER (Q28 - Q30) ---
  {
    order_index: 28,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 8: Neptune Frontier • Advanced Geometric Synthesis & Converse Analysis",
    content_markdown: "What is the **converse** of the conditional theorem: *'If a triangle is equilateral, then all its three angles are equal'*?",
    options: [
      { id: 'A', text: "If a triangle is not equilateral, then all three of its interior angles are strictly unequal (Inverse statement)" },
      { id: 'B', text: "If a triangle has three equal sides, then its perimeter is three times the side length (Property statement)" },
      { id: 'C', text: "If all three angles of a triangle are acute and strictly less than $90^\\circ$, then the triangle is equilateral" },
      { id: 'D', text: "If all three angles of a triangle are equal, then the triangle is equilateral (Converse: swap If and Then)" }
    ],
    correct_option_id: 'D',
    explanation: "The converse of 'If P then Q' is 'If Q then P': 'If all three angles of a triangle are equal, then the triangle is equilateral'."
  },
  {
    order_index: 29,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 8: Neptune Frontier • Advanced Geometric Synthesis & Converse Analysis",
    content_markdown: "Three orbital corridors are parallel: $a \\parallel b \\parallel c$. Transversal $d$ intersects line $a$ with acute angle $46^\\circ$. What is the degree measure of the consecutive interior angle formed by transversal $d$ with line $c$?\n\n![Figure: Three Parallel Corridors](/images/geometry/math7_l11_q29.svg)",
    options: [
      { id: 'A', text: "$134^\\circ$ (Consecutive interior angle supplementary to $46^\\circ$: $180^\\circ - 46^\\circ = 134^\\circ$)" },
      { id: 'B', text: "$46^\\circ$ (Alternate interior angle directly corresponding to the given acute angle on line $a$)" },
      { id: 'C', text: "$90^\\circ$ (Perpendicular orientation angle if transversal $d$ were orthogonal to all corridors)" },
      { id: 'D', text: "$144^\\circ$ (Calculation resulting from mistakenly subtracting $46^\\circ$ from an incorrect $190^\\circ$)" }
    ],
    correct_option_id: 'A',
    explanation: "By transitivity, $a \\parallel c$. The acute angle on line $c$ is $46^\\circ$. Its supplementary consecutive interior angle is $180^\\circ - 46^\\circ = 134^\\circ$."
  },
  {
    order_index: 30,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: "Sector 8: Neptune Frontier • Advanced Geometric Synthesis & Converse Analysis",
    content_markdown: "Which of the following statements represents a **TRUE THEOREM** in Euclidean planar geometry?",
    options: [
      { id: 'A', text: "Two coplanar straight lines that never intersect at any point in the plane are always strictly perpendicular" },
      { id: 'B', text: "If two distinct lines are perpendicular to a third line in the same plane, they are parallel to each other" },
      { id: 'C', text: "Any two angles that have equal degree measures in a plane must always be vertically opposite across a vertex" },
      { id: 'D', text: "The sum of two consecutive interior angles formed by a transversal across parallel lines is always $90^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "Statement B is the true Double Perpendicular Theorem: $m \\perp d \\text{ and } n \\perp d \\implies m \\parallel n$."
  }
];

// Check answer distribution
const counts = { A: 0, B: 0, C: 0, D: 0 };
QUESTIONS_30.forEach(q => counts[q.correct_option_id]++);
console.log('30-Question Answer Distribution:', counts);

async function seed() {
  console.log('🚀 Seeding 30 Multiple-Choice Practice Questions for Lesson 11...');
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  // 1. Find assignment
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
    throw new Error('Assignment for 14/11 not found!');
  }

  // 2. Clean old assessments on this unit
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

  // 3. Create Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: assignment.learning_unit_id,
      type: 'IN_SESSION_90M',
      title: "Cosmic Mission: Theorems & Formal Geometric Proofs (30 Questions)",
      instructions: "Comprehensive 90-120 minute geometry evaluation: 30 problems on theorem structure (Hypothesis vs Conclusion), deductive proof logic, and geometric theorems across 8 Planetary Sectors.",
      time_limit_minutes: 120,
      max_score: 10.0
    }
  });
  console.log(`✅ Created Assessment: ${assessment.id}`);

  // 4. Create Questions
  for (const q of QUESTIONS_30) {
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
  console.log(`✅ Loaded ${QUESTIONS_30.length} multiple-choice questions into database.`);

  // 5. Create Assessment Attempt for Keithley Lake
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
  console.log(`✅ Initialized Assessment Attempt: ${attempt.id}`);

  // 6. Update Assignment Note
  await prisma.daily_student_assignments.update({
    where: { id: assignment.id },
    data: {
      custom_session_minutes: 120,
      teacher_daily_note: "Cadet Keithley: Tackle your 30-question Cosmic Mission on Lesson 11 (Theorems & Formal Geometric Proofs) across 8 Planetary Sectors!"
    }
  });

  // 7. Save JSON Backup
  const backupPath = path.resolve(__dirname, 'content/math7_lesson11_practice_30q_2026_11_14.json');
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.writeFileSync(backupPath, JSON.stringify({
    assignedDate: CONSTANTS.ASSIGNED_DATE,
    studentId: CONSTANTS.STUDENT_ID,
    subjectId: CONSTANTS.SUBJECT_ID,
    assignmentId: assignment.id,
    assessmentId: assessment.id,
    attemptId: attempt.id,
    totalQuestions: QUESTIONS_30.length,
    answerDistribution: counts,
    questions: QUESTIONS_30
  }, null, 2));
  console.log('✅ Saved backup to:', backupPath);

  console.log('🎉 ALL DONE! 30-Question Math 7 Mission successfully deployed for Keithley Lake.');
}

seed()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
