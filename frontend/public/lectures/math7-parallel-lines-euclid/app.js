/* Lesson 10: Euclid's Axiom & Properties of Parallel Lines
   Cadet Keithley Lake • Grade 7 Math • 12 Nov 2026 */

const titles = [
  "Euclid's Axiom: Uniqueness",
  "Signs vs. Properties",
  "Alternate Interior Angles",
  "Corresponding Angles",
  "Consecutive Interior Angles",
  "Perpendicular & Parallel",
  "Auxiliary Ray Technique",
  "Mission Checkpoint"
];

const planets = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune"
];

const lesson = document.querySelector("#lesson");
let station = 0;
const answers = new Map();

const quiz = [
  [
    "Through a point M outside line a, how many lines can be drawn parallel to line a?",
    ["Zero lines", "Exactly one line", "Two lines", "Infinitely many lines"],
    1,
    "By Euclid's Axiom: Through a point outside a line, there is ONE and ONLY ONE line parallel to the given line."
  ],
  [
    "Lines a and b are known to be parallel (a ∥ b), cut by transversal c. What can we conclude about alternate interior angles?",
    ["They add up to 90°", "They add up to 180°", "They are strictly equal", "They are always 90°"],
    2,
    "Property of Parallel Lines: If two parallel lines are cut by a transversal, alternate interior angles are equal."
  ],
  [
    "Given a ∥ b. Corresponding angle A1 = 120°. What is the measure of corresponding angle B1?",
    ["60°", "90°", "120°", "180°"],
    2,
    "Property: Corresponding angles are equal when lines are parallel, so B1 = A1 = 120°."
  ],
  [
    "Given a ∥ b. Consecutive interior angle A4 = 75°. What is the measure of consecutive interior angle B1?",
    ["75°", "105°", "180°", "15°"],
    1,
    "Property: Consecutive interior angles are supplementary: A4 + B1 = 180°, so B1 = 180° - 75° = 105°."
  ],
  [
    "If line a ∥ b and line c ⊥ a, what is the geometric relationship between line c and line b?",
    ["c ∥ b", "c ⊥ b", "c coincides with b", "No conclusion possible"],
    1,
    "Theorem: A line perpendicular to one of two parallel lines is also perpendicular to the other line (c ⊥ b)."
  ],
  [
    "Two distinct lines a and b are both parallel to a third line c (a ∥ c and b ∥ c). What follows?",
    ["a ⊥ b", "a ∥ b", "a and b intersect at 60°", "a and b must be identical"],
    1,
    "Transitivity Theorem: Two distinct lines parallel to a third line are parallel to each other (a ∥ b)."
  ],
  [
    "In a zig-zag problem with ray Ax ∥ By and vertex O, why can we draw ray Ot ∥ Ax through O?",
    ["Because O is a right angle", "Guaranteed by Euclid's Axiom", "Because all rays are parallel", "Only if OA = OB"],
    1,
    "Euclid's Axiom guarantees that through point O outside line Ax, there exists a unique parallel line Ot."
  ],
  [
    "What is the key difference between Lesson 9 (Signs) and Lesson 10 (Properties)?",
    [
      "They are identical",
      "Lesson 9 proves lines are parallel; Lesson 10 uses known parallel lines to calculate angles",
      "Lesson 9 is only for triangles",
      "Lesson 10 requires 3D coordinates"
    ],
    1,
    "Lesson 9 tests evidence to prove a ∥ b. Lesson 10 starts with a ∥ b and deduces angle properties."
  ]
];

function renderMath() {
  if (window.renderMathInElement) {
    window.renderMathInElement(lesson, {
      delimiters: [
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ],
      output: "html",
      throwOnError: false
    });
  }
}

// Interactive Transversal Angle State
let currentAngle = 125;

function createDynamicTransversalDiagram(angleDeg) {
  const obtuse = angleDeg;
  const acute = 180 - angleDeg;
  // Radian conversions
  const rad = (angleDeg * Math.PI) / 180;
  // Intersection coordinates
  const Ax = 280, Ay = 100;
  const Bx = 220, By = 220;

  return `
    <svg class="diagram" viewBox="0 0 540 320" role="img" aria-label="Dynamic Parallel Lines and Transversal">
      <defs>
        <linearGradient id="orbitBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#080D1A"/>
          <stop offset="100%" stop-color="#0E1626"/>
        </linearGradient>
      </defs>
      <rect width="540" height="320" rx="18" fill="url(#orbitBg)" stroke="#06B6D4" stroke-width="1.5" stroke-opacity="0.3"/>
      
      <!-- Interior Zone -->
      <rect x="35" y="100" width="470" height="120" fill="#0C2135" fill-opacity="0.45" rx="6"/>
      <text x="45" y="165" fill="#64748B" font-family="system-ui" font-size="11" font-weight="bold">INTERIOR ZONE</text>
      
      <!-- Parallel Lines a and b -->
      <line x1="35" y1="100" x2="505" y2="100" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
      <path d="M 430 95 L 438 100 L 430 105 M 440 95 L 448 100 L 440 105" fill="none" stroke="#38BDF8" stroke-width="2"/>
      <text x="512" y="105" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">a</text>
      
      <line x1="35" y1="220" x2="505" y2="220" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
      <path d="M 430 215 L 438 220 L 430 225 M 440 215 L 448 220 L 440 225" fill="none" stroke="#38BDF8" stroke-width="2"/>
      <text x="512" y="225" fill="#38BDF8" font-family="system-ui" font-size="16" font-weight="bold">b</text>
      
      <!-- Transversal Line c -->
      <line x1="${Bx - 40}" y1="${By + 75}" x2="${Ax + 40}" y2="${Ay - 75}" stroke="#C4B5FD" stroke-width="3" stroke-linecap="round"/>
      <text x="${Ax + 48}" y="${Ay - 70}" fill="#C4B5FD" font-family="system-ui" font-size="16" font-weight="bold">c</text>
      
      <!-- Intersections A and B -->
      <circle cx="${Ax}" cy="${Ay}" r="5" fill="#22D3EE"/>
      <text x="${Ax + 10}" y="${Ay - 8}" fill="#FFFFFF" font-family="system-ui" font-size="14" font-weight="bold">A</text>
      
      <circle cx="${Bx}" cy="${By}" r="5" fill="#22D3EE"/>
      <text x="${Bx - 20}" y="${By + 20}" fill="#FFFFFF" font-family="system-ui" font-size="14" font-weight="bold">B</text>
      
      <!-- Angle Badges -->
      <text x="${Ax + 40}" y="${Ay - 18}" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">A₁ = ${obtuse}°</text>
      <text x="${Ax - 85}" y="${Ay - 18}" fill="#94A3B8" font-family="monospace" font-size="13">A₂ = ${acute}°</text>
      <text x="${Ax - 95}" y="${Ay + 25}" fill="#06B6D4" font-family="monospace" font-size="13" font-weight="bold">A₃ = ${obtuse}° (Z)</text>
      <text x="${Ax + 30}" y="${Ay + 25}" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">A₄ = ${acute}° (U)</text>
      
      <text x="${Bx + 30}" y="${By - 18}" fill="#06B6D4" font-family="monospace" font-size="13" font-weight="bold">B₁ = ${obtuse}° (Z/F)</text>
      <text x="${Bx - 85}" y="${By - 18}" fill="#F59E0B" font-family="monospace" font-size="13" font-weight="bold">B₂ = ${acute}°</text>
      <text x="${Bx - 85}" y="${By + 25}" fill="#94A3B8" font-family="monospace" font-size="13">B₃ = ${obtuse}°</text>
      <text x="${Bx + 30}" y="${By + 25}" fill="#94A3B8" font-family="monospace" font-size="13">B₄ = ${acute}°</text>
    </svg>
  `;
}

const pages = [
  // Sector 1: Euclid's Axiom
  () => `
    <p class="intro">Welcome Cadet Keithley! In Lesson 10, we uncover the ultimate foundation of Euclidean geometry: the parallel postulate and the powerful angle properties it unleashes.</p>
    <div class="grid">
      <section class="panel">
        <h3>1. The Bedrock Postulate</h3>
        <p>Over 2,300 years ago, Greek mathematician Euclid formulated the fundamental rule of straight lines in a plane:</p>
        <div class="callout">
          <strong>Euclid's Axiom of Parallel Lines:</strong><br>
          Through a point outside a line, there is <strong>one and only one</strong> line parallel to that line.
        </div>
        <div class="formula">\\[\\forall \\text{ line } a, \\forall M \\notin a \\implies \\exists ! \\text{ line } b \\text{ such that } M \\in b \\text{ and } b \\parallel a\\]</div>
        <p><strong>Crucial Consequence:</strong> If line \\(b\\) passes through \\(M\\) and \\(b \\parallel a\\), and line \\(c\\) also passes through \\(M\\) and \\(c \\parallel a\\), then line \\(b\\) and line \\(c\\) must coincide (\\(b \\equiv c\\)).</p>
      </section>
      <section class="panel">
        <img src="/images/geometry/euclid_axiom_orbit.svg" alt="Euclid Axiom Diagram" class="diagram"/>
        <p class="legend">Orbital schematic: Point M lies outside base corridor line a. Exactly ONE parallel trajectory (green line b) exists. Any deviation (orange line c) eventually intersects corridor a at waypoint K.</p>
      </section>
    </div>
  `,

  // Sector 2: Signs vs Properties
  () => `
    <p class="intro">Cadet Keithley: Geometry reasoning flows in two directions. Master the difference between finding evidence (Lesson 9) and reaping consequences (Lesson 10)!</p>
    <div class="grid">
      <section class="panel">
        <h3>Lesson 9: Recognition Signs</h3>
        <div class="formula">\\[\\text{Equal Angle Pairs} \\implies a \\parallel b\\]</div>
        <p><strong>Direction:</strong> From angles to parallelism.</p>
        <ul>
          <li><strong>Input:</strong> You measure angles at two intersections.</li>
          <li><strong>Evidence:</strong> Alternate interior angles are equal, or corresponding angles are equal.</li>
          <li><strong>Conclusion:</strong> You prove that line \\(a\\) is parallel to line \\(b\\).</li>
        </ul>
      </section>
      <section class="panel">
        <h3>Lesson 10: Parallel Properties</h3>
        <div class="formula">\\[a \\parallel b \\implies \\text{Equal Angle Pairs}\\]</div>
        <p><strong>Direction:</strong> From parallelism to angles.</p>
        <ul>
          <li><strong>Input:</strong> You are already given that line \\(a \\parallel b\\).</li>
          <li><strong>Consequence:</strong> You immediately know all alternate interior angles are equal, and corresponding angles are equal!</li>
          <li><strong>Application:</strong> Rapidly calculate missing angles without measuring!</li>
        </ul>
      </section>
    </div>
    <div class="callout">
      <strong>Pro Tip:</strong> When writing proofs: If proving parallel, state "By the alternate interior angle recognition sign". If calculating angles from parallel lines, state "Since \\(a \\parallel b\\), alternate interior angles are equal".
    </div>
  `,

  // Sector 3: Alternate Interior Angles
  () => `
    <p class="intro">When a transversal cuts two parallel lines, the "Z" code activates: alternate interior angles are identical!</p>
    <div class="grid">
      <section class="panel">
        <h3>The Z-Code Property</h3>
        <div class="formula">\\[a \\parallel b \\implies \\widehat{A_3} = \\widehat{B_1} \\quad \\text{and} \\quad \\widehat{A_4} = \\widehat{B_2}\\]</div>
        <p><strong>Why does this matter?</strong> If mission control tells you that orbital path \\(a\\) is parallel to path \\(b\\), and sensor angle \\(\\widehat{A_3} = 125^\\circ\\), you instantly know that telemetry angle \\(\\widehat{B_1} = 125^\\circ\\) with zero extra measurement!</p>
        <h3>Worked Example 1</h3>
        <p>Given \\(a \\parallel b\\). Transversal \\(c\\) cuts \\(a\\) at \\(A\\) and \\(b\\) at \\(B\\). If \\(\\widehat{A_3} = 68^\\circ\\), find \\(\\widehat{B_1}\\) and \\(\\widehat{B_4}\\).</p>
        <details>
          <summary>View Step-by-Step Solution</summary>
          <p>1. Since \\(a \\parallel b\\), alternate interior angles are equal:<br>
          \\[\\widehat{B_1} = \\widehat{A_3} = 68^\\circ\\]</p>
          <p>2. Since \\(\\widehat{B_1}\\) and \\(\\widehat{B_4}\\) form a linear pair (straight line):<br>
          \\[\\widehat{B_4} = 180^\\circ - \\widehat{B_1} = 180^\\circ - 68^\\circ = 112^\\circ\\]</p>
        </details>
      </section>
      <section class="panel">
        <img src="/images/geometry/parallel_transversal_properties.svg" alt="Parallel Properties" class="diagram"/>
        <p class="legend">Observe \\(\\widehat{A_3}\\) and \\(\\widehat{B_1}\\) (cyan arcs): both are located in the interior region on opposite sides of transversal c, forming equal Z-corners (125°).</p>
      </section>
    </div>
  `,

  // Sector 4: Corresponding Angles
  () => `
    <p class="intro">The "F" Code: Corresponding angles occupy identical relative positions at both intersections.</p>
    <div class="grid">
      <section class="panel">
        <h3>The F-Code Property</h3>
        <div class="formula">\\[a \\parallel b \\implies \\begin{cases} \\widehat{A_1} = \\widehat{B_1} & \\text{(Top-Right)} \\\\ \\widehat{A_2} = \\widehat{B_2} & \\text{(Top-Left)} \\\\ \\widehat{A_3} = \\widehat{B_3} & \\text{(Bottom-Left)} \\\\ \\widehat{A_4} = \\widehat{B_4} & \\text{(Bottom-Right)} \\end{cases}\\]</div>
        <h3>Worked Example 2: Finding Variable x</h3>
        <p>Corridor \\(a \\parallel b\\). Transversal \\(c\\) creates corresponding angles \\(\\widehat{A_1} = (3x + 15)^\\circ\\) and \\(\\widehat{B_1} = 105^\\circ\\). Calculate the flight parameter \\(x\\).</p>
        <details>
          <summary>View Step-by-Step Solution</summary>
          <p>Since line \\(a \\parallel b\\), corresponding angles are equal:<br>
          \\[3x + 15 = 105\\]<br>
          \\[3x = 105 - 15 = 90\\]<br>
          \\[x = 90 \\div 3 = 30\\]<br>
          Check: \\(3(30) + 15 = 105^\\circ\\). Verified!</p>
        </details>
      </section>
      <section class="panel">
        <h3>Interactive Angle Telemetry Console</h3>
        <label for="angleRange">Adjust Transversal Angle \\(\\widehat{A_1}\\): <output id="angleVal">${currentAngle}°</output></label>
        <input id="angleRange" type="range" min="40" max="140" value="${currentAngle}" step="1">
        <div id="dynamicDiagram">${createDynamicTransversalDiagram(currentAngle)}</div>
        <p class="feedback" id="angleFeedback">Slide to test different transversal inclinations!</p>
      </section>
    </div>
  `,

  // Sector 5: Consecutive Interior Angles
  () => `
    <p class="intro">The "U" Code: Inside the corridor, angles on the same side of the transversal are supplementary (sum to 180°)!</p>
    <div class="grid">
      <section class="panel">
        <h3>The U-Code Property (Same-Side Interior)</h3>
        <div class="formula">\\[a \\parallel b \\implies \\begin{aligned} \\widehat{A_4} + \\widehat{B_1} = 180^\\circ \\\\ \\widehat{A_3} + \\widehat{B_2} = 180^\\circ \\end{aligned}\\]</div>
        <p><strong>Proof Rationale:</strong><br>
        1. \\(\\widehat{A_3} + \\widehat{A_4} = 180^\\circ\\) (Linear pair on straight line \\(a\\)).<br>
        2. Since \\(a \\parallel b\\), \\(\\widehat{A_3} = \\widehat{B_1}\\) (Alternate interior angles).<br>
        3. Substituting gives: \\(\\widehat{A_4} + \\widehat{B_1} = 180^\\circ\\). Q.E.D.</p>
      </section>
      <section class="panel">
        <h3>Worked Example 3: Deep Space Antenna Alignment</h3>
        <p>Corridors \\(p \\parallel q\\). Deep space sensor beam \\(s\\) intersects \\(p\\) and \\(q\\). The consecutive interior angles measure \\(\\widehat{P_4} = 2x\\) and \\(\\widehat{Q_1} = 3x\\). Find the measure of both angles.</p>
        <details>
          <summary>View Step-by-Step Solution</summary>
          <p>Because \\(p \\parallel q\\), consecutive interior angles are supplementary:<br>
          \\[2x + 3x = 180^\\circ\\]<br>
          \\[5x = 180^\\circ \\implies x = 36^\\circ\\]<br>
          Therefore:<br>
          \\(\\widehat{P_4} = 2(36^\\circ) = 72^\\circ\\)<br>
          \\(\\widehat{Q_1} = 3(36^\\circ) = 108^\\circ\\)<br>
          Sum check: \\(72^\\circ + 108^\\circ = 180^\\circ\\). Verified!</p>
        </details>
      </section>
    </div>
  `,

  // Sector 6: Perpendicular & Parallel Theorems
  () => `
    <p class="intro">The vital relations connecting 90° right angles and parallel lines (Perpendicular to Parallel Theorems).</p>
    <div class="grid">
      <section class="panel">
        <h3>3 Fundamental Theorems in SGK Grade 7</h3>
        <div class="callout">
          <strong>Theorem 1 (Double Perpendicular):</strong><br>
          Two distinct lines perpendicular to a common line are parallel:<br>
          \\[a \\perp c \\text{ and } b \\perp c \\implies a \\parallel b\\]
        </div>
        <div class="callout">
          <strong>Theorem 2 (Perpendicular to Parallels):</strong><br>
          A line perpendicular to one of two parallel lines is also perpendicular to the other:<br>
          \\[a \\parallel b \\text{ and } c \\perp a \\implies c \\perp b\\]
        </div>
        <div class="callout">
          <strong>Theorem 3 (Transitivity of Parallels):</strong><br>
          Two distinct lines parallel to a third line are parallel to each other:<br>
          \\[a \\parallel c \\text{ and } b \\parallel c \\implies a \\parallel b\\]
        </div>
      </section>
      <section class="panel">
        <img src="/images/geometry/perpendicular_parallel_theorems.svg" alt="Perpendicular and Parallel Theorems" class="diagram"/>
        <p class="legend">Left: The right-angle bridge (90° markers at both intersections). Right: Three parallel lines a ∥ c ∥ b showing transitivity.</p>
      </section>
    </div>
  `,

  // Sector 7: Auxiliary Ray Technique
  () => `
    <p class="intro">The signature Grade 7 textbook challenge: Using Euclid's Axiom to construct an auxiliary parallel line and solve zig-zag angles!</p>
    <div class="grid">
      <section class="panel">
        <h3>The "Bent Path" Problem</h3>
        <p>In deep space trajectory planning, you are given:<br>
        \\(\\text{Ray } Ax \\parallel \\text{Ray } By\\).<br>
        Warp waypoint \\(O\\) is located between the two rays, forming corner angle \\(\\widehat{AOB}\\).<br>
        Given \\(\\widehat{xAO} = 35^\\circ\\) and \\(\\widehat{yBO} = 55^\\circ\\). Calculate \\(\\widehat{AOB}\\).</p>
        <div class="callout">
          <strong>Cadet Keithley's Strategy:</strong><br>
          By <strong>Euclid's Axiom</strong>, through point \\(O\\) we can draw a unique auxiliary ray \\(Ot \\parallel Ax\\).
        </div>
        <details>
          <summary>View Proof & Solution Steps</summary>
          <p>1. Draw ray \\(Ot \\parallel Ax\\) pointing in the same direction.<br>
          2. Since \\(Ot \\parallel Ax\\), alternate interior angles are equal:<br>
          \\[\\widehat{O_1} = \\widehat{xAO} = 35^\\circ\\]<br>
          3. Since \\(Ot \\parallel Ax\\) and \\(Ax \\parallel By\\), by transitivity \\(Ot \\parallel By\\).<br>
          4. Since \\(Ot \\parallel By\\), alternate interior angles are equal:<br>
          \\[\\widehat{O_2} = \\widehat{yBO} = 55^\\circ\\]<br>
          5. Because ray \\(Ot\\) lies between rays \\(OA\\) and \\(OB\\):<br>
          \\[\\widehat{AOB} = \\widehat{O_1} + \\widehat{O_2} = 35^\\circ + 55^\\circ = 90^\\circ\\]<br>
          The trajectory forms a perfect right angle!</p>
        </details>
      </section>
      <section class="panel">
        <img src="/images/geometry/classic_auxiliary_parallel_line.svg" alt="Auxiliary Ray Euclid Problem" class="diagram"/>
        <p class="legend">Notice how auxiliary ray Ot (green dashed) splits angle AOB into two alternate interior components: O1 (35°) and O2 (55°).</p>
      </section>
    </div>
  `,

  // Sector 8: Mission Checkpoint
  () => `
    <p class="intro">Station 8: Neptune Frontier Telemetry Checkpoint. Verify your mastery of Lesson 10 with these 8 orbital navigation checks!</p>
    <p class="meter" id="quiz-score" aria-live="polite"></p>
    ${quiz
      .map(
        ([q, opts], i) => `
      <section class="panel">
        <h3>Checkpoint ${i + 1} of 8</h3>
        <p>${q}</p>
        ${opts
          .map(
            (o, j) => `
          <button class="answer" data-quiz="${i}" data-option="${j}" aria-pressed="false">
            ${String.fromCharCode(65 + j)}. ${o}
          </button>
        `
          )
          .join("")}
        <p class="feedback" id="quiz-feedback-${i}" aria-live="polite"></p>
      </section>
    `
      )
      .join("")}
    <div class="callout">
      <strong>Flight Briefing Complete!</strong> You now possess the complete theoretical toolkit for Grade 7 Euclid's Axiom and Parallel Lines.
    </div>
  `
];

function updateQuiz() {
  let correct = 0;
  quiz.forEach(([_, __, ans], i) => {
    const sel = answers.get(i);
    const fb = document.querySelector(`#quiz-feedback-${i}`);
    if (sel !== undefined) {
      if (sel === ans) {
        correct++;
        fb.innerHTML = `<span style="color: #34d399; font-weight: bold;">✓ Correct!</span> ${quiz[i][3]}`;
      } else {
        fb.innerHTML = `<span style="color: #f87171; font-weight: bold;">✗ Not quite.</span> ${quiz[i][3]}`;
      }
    }
  });
  const scoreElem = document.querySelector("#quiz-score");
  if (scoreElem) {
    scoreElem.textContent = `Telemetry Score: ${correct} / ${quiz.length} verified checkpoints`;
  }
}

function showStation(n, focus = false) {
  station = n;
  lesson.innerHTML = `
    <p class="eyebrow">SECTOR ${n + 1} / ${planets[n].toUpperCase()}</p>
    <h2>${titles[n]}</h2>
    ${pages[n]()}
  `;

  document.querySelector("#stations").innerHTML = titles
    .map(
      (t, i) => `
      <button data-station="${i}" ${i === n ? 'aria-current="step"' : ""}>
        <small>0${i + 1} · ${planets[i]}</small>
        ${t}
      </button>
    `
    )
    .join("");

  document.querySelector("#location").textContent = `Station ${n + 1} of 8 · ${planets[n]}`;
  document.querySelector("#previous").disabled = n === 0;
  document.querySelector("#next").disabled = n === 7;

  renderMath();

  // Attach dynamic listener for slider on Station 4 (Mars)
  if (n === 3) {
    const slider = document.querySelector("#angleRange");
    if (slider) {
      slider.addEventListener("input", (e) => {
        currentAngle = parseInt(e.target.value, 10);
        document.querySelector("#angleVal").textContent = `${currentAngle}°`;
        document.querySelector("#dynamicDiagram").innerHTML = createDynamicTransversalDiagram(currentAngle);
        document.querySelector("#angleFeedback").textContent = 
          currentAngle === 90 
            ? "Perpendicular case! All 8 angles become 90°." 
            : `Obtuse angles = ${currentAngle}°, Acute angles = ${180 - currentAngle}°.`;
      });
    }
  }

  // Restore quiz answers if viewing station 8
  if (n === 7) {
    quiz.forEach((_, i) => {
      const sel = answers.get(i);
      if (sel !== undefined) {
        const btn = document.querySelector(`button[data-quiz="${i}"][data-option="${sel}"]`);
        if (btn) btn.setAttribute("aria-pressed", "true");
      }
    });
    updateQuiz();
  }

  if (focus) {
    window.scrollTo(0, 0);
    lesson.focus({ preventScroll: true });
  }
}

// Event Listeners
document.querySelector("#stations").addEventListener("click", (e) => {
  const b = e.target.closest("[data-station]");
  if (b) showStation(Number(b.dataset.station), true);
});

document.querySelector("#previous").onclick = () =>
  showStation(Math.max(0, station - 1), true);

document.querySelector("#next").onclick = () =>
  showStation(Math.min(7, station + 1), true);

lesson.addEventListener("click", (e) => {
  const btn = e.target.closest(".answer");
  if (!btn) return;
  const qIdx = Number(btn.dataset.quiz);
  const optIdx = Number(btn.dataset.option);

  // Unpress sibling buttons
  document
    .querySelectorAll(`button[data-quiz="${qIdx}"]`)
    .forEach((b) => b.setAttribute("aria-pressed", "false"));
  btn.setAttribute("aria-pressed", "true");

  answers.set(qIdx, optIdx);
  updateQuiz();
});

// Initial boot
showStation(0);
