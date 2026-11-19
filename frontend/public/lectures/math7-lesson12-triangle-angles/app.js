/* Lesson 12: Sum of Angles in a Triangle
   Astronaut Cadet Keithley Lake • Grade 7 Math • 20 Nov 2026 */

// Web Audio API Sound Synthesizer for feedback
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playSound(type) {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'chime') {
      // Pleasant victory chord
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } else if (type === 'buzzer') {
      // Soft low error buzz
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    }
  } catch (e) {
    // Audio context not allowed or failed
  }
}

const stations = [
  {
    title: "Station 1: The 180° Angle Sum Theorem",
    subtitle: "Core Celestial Postulate & Formal Parallel Proof",
    content: `
      <h2>The Fundamental Triangle Theorem</h2>
      <p>In any flat Euclidean triangle, the sum of all three interior angles is always exactly $180^\\circ$:</p>
      
      <div class="cosmic-card" style="text-align: center; margin: 1.5rem 0;">
        <span class="cosmic-badge badge-cyan">FUNDAMENTAL THEOREM</span>
        <h3 style="justify-content: center; font-size: 1.6rem; margin: 0.75rem 0; color: #38bdf8;">
          \\(\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ\\)
        </h3>
        <p style="color: #94a3b8; margin: 0;">No matter the shape, size, or coordinates of the triangle, this sum is an invariant law of planar geometry.</p>
      </div>

      <h3>Formal Proof via Auxiliary Parallel Line (SGK Hình 4.3)</h3>
      <p>How do we know this theorem is true? We draw an auxiliary parallel line through vertex $A$ parallel to opposite base $BC$:</p>
      
      <div style="text-align: center; margin: 1.5rem 0;">
        <img src="/images/geometry/math7_l12_q39_proof_parallel_auxiliary.svg" alt="Proof of Angle Sum Theorem" style="max-width: 520px; width: 100%; border-radius: 12px; border: 1px solid rgba(56,189,248,0.3);">
      </div>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-amber">STEP 1: CONSTRUCTION</span>
          <p>Through vertex $A$, draw line $xy$ parallel to base $BC$ ($xy \\parallel BC$).</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-emerald">STEP 2: ALTERNATE ANGLES</span>
          <p>By the parallel line theorem: $\\widehat{B} = \\widehat{BAx}$ and $\\widehat{C} = \\widehat{CAy}$ (alternate interior angle pairs along transversals $AB$ and $AC$).</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-cyan">STEP 3: STRAIGHT ANGLE</span>
          <p>Rays $Ax$ and $Ay$ form straight line $xy$: $\\widehat{BAC} + \\widehat{BAx} + \\widehat{CAy} = 180^\\circ \\implies \\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$. $\\blacksquare$</p>
        </div>
      </div>
    `
  },
  {
    title: "Station 2: Triangle Classifications",
    subtitle: "Categorizing Celestial Triangles by Their Angles",
    content: `
      <h2>Classifying Triangles by Angle Types</h2>
      <p>Every triangle belongs to exactly one of three fundamental categories based on its angle degree measurements:</p>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-cyan">TYPE 1 · ACUTE TRIANGLE</span>
          <h3>Acute Triangle</h3>
          <p>All three interior angles are <strong>strictly acute</strong> (each angle is less than $90^\\circ$):</p>
          <p style="font-family: monospace; color: #22d3ee; font-weight: 700;">\\(\\widehat{A} < 90^\\circ, \\quad \\widehat{B} < 90^\\circ, \\quad \\widehat{C} < 90^\\circ\\)</p>
          <p style="font-size: 0.9rem; color: #94a3b8;">Example: $55^\\circ, 63^\\circ, 62^\\circ$. All angles are sharp.</p>
        </div>

        <div class="cosmic-card">
          <span class="cosmic-badge badge-emerald">TYPE 2 · RIGHT TRIANGLE</span>
          <h3>Right Triangle</h3>
          <p>Contains exactly <strong>one right angle ($90^\\circ$)</strong>. The side opposite the $90^\\circ$ angle is the <strong>hypotenuse</strong>, and the other two sides are <strong>legs</strong>:</p>
          <p style="font-family: monospace; color: #34d399; font-weight: 700;">\\(\\widehat{A} = 90^\\circ, \\quad \\widehat{B} + \\widehat{C} = 90^\\circ\\)</p>
          <p style="font-size: 0.9rem; color: #94a3b8;">Example: $90^\\circ, 55^\\circ, 35^\\circ$.</p>
        </div>

        <div class="cosmic-card">
          <span class="cosmic-badge badge-rose">TYPE 3 · OBTUSE TRIANGLE</span>
          <h3>Obtuse Triangle</h3>
          <p>Contains exactly <strong>one obtuse angle ($> 90^\\circ$)</strong>. The other two angles must both be acute:</p>
          <p style="font-family: monospace; color: #fb7185; font-weight: 700;">\\(90^\\circ < \\widehat{A} < 180^\\circ, \\quad \\widehat{B} + \\widehat{C} < 90^\\circ\\)</p>
          <p style="font-size: 0.9rem; color: #94a3b8;">Example: $120^\\circ, 35^\\circ, 25^\\circ$.</p>
        </div>
      </div>

      <div class="cosmic-card" style="margin-top: 1.5rem;">
        <span class="cosmic-badge badge-amber">CRITICAL PROPERTY</span>
        <h3 style="color: #fbbf24;">Can a triangle have two right angles or two obtuse angles?</h3>
        <p><strong>NEVER!</strong> If a triangle had two right angles, their sum would already be $90^\\circ + 90^\\circ = 180^\\circ$, leaving $0^\\circ$ for the third angle. If it had two obtuse angles, their sum would exceed $180^\\circ$, violating the fundamental Angle Sum Theorem!</p>
      </div>
    `
  },
  {
    title: "Station 3: Right Triangles & Complementary Angles",
    subtitle: "Properties of Orthogonal Space Navigation Triangles",
    content: `
      <h2>Right Triangle Special Telemetry</h2>
      <p>When one angle of a triangle is a right angle ($90^\\circ$), the remaining two acute angles enjoy a special complementary relationship:</p>

      <div class="cosmic-card" style="text-align: center; margin: 1.5rem 0;">
        <span class="cosmic-badge badge-emerald">COMPLEMENTARY ACUTE ANGLES</span>
        <h3 style="justify-content: center; font-size: 1.5rem; color: #34d399; margin: 0.75rem 0;">
          \\(\\widehat{B} + \\widehat{C} = 90^\\circ \\iff \\widehat{B} = 90^\\circ - \\widehat{C}\\)
        </h3>
        <p style="color: #94a3b8;">In any right triangle, the two acute angles are complementary (their sum is always $90^\\circ$).</p>
      </div>

      <div style="text-align: center; margin: 1.5rem 0;">
        <img src="/images/geometry/math7_l12_q12_right_triangle_legs.svg" alt="Right Triangle Anatomy" style="max-width: 520px; width: 100%; border-radius: 12px; border: 1px solid rgba(56,189,248,0.3);">
      </div>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-cyan">HYPOTENUSE (CẠNH HUYỀN)</span>
          <p>The side directly facing the $90^\\circ$ right angle. It is always the <strong>longest side</strong> of a right triangle.</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-amber">LEGS (CẠNH GÓC VUÔNG)</span>
          <p>The two perpendicular sides that meet to form the $90^\\circ$ right angle.</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-emerald">RAPID ANGLE CALCULATION</span>
          <p>If radar measures one acute angle as $35^\\circ$, the other acute angle is immediately computed: $90^\\circ - 35^\\circ = 55^\\circ$!</p>
        </div>
      </div>
    `
  },
  {
    title: "Station 4: Exterior Angle Theorem",
    subtitle: "Remote Interior Angles & Angle Inequalities",
    content: `
      <h2>The Exterior Angle Theorem (Góc Ngoài Tam Giác)</h2>
      <p>An <strong>exterior angle</strong> of a triangle is formed by extending one of the triangle's sides past a vertex. It forms a linear pair with the adjacent interior angle.</p>

      <div style="text-align: center; margin: 1.5rem 0;">
        <img src="/images/geometry/math7_l12_q16_exterior_angle_def.svg" alt="Exterior Angle Diagram" style="max-width: 520px; width: 100%; border-radius: 12px; border: 1px solid rgba(56,189,248,0.3);">
      </div>

      <div class="cosmic-card" style="text-align: center; margin: 1.5rem 0;">
        <span class="cosmic-badge badge-amber">THE EXTERIOR ANGLE THEOREM</span>
        <h3 style="justify-content: center; font-size: 1.5rem; color: #fbbf24; margin: 0.75rem 0;">
          \\(\\widehat{ACx} = \\widehat{A} + \\widehat{B}\\)
        </h3>
        <p style="color: #94a3b8;">Each exterior angle of a triangle equals the sum of the two remote (non-adjacent) interior angles.</p>
      </div>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-cyan">WHY IT WORKS (PROOF)</span>
          <p>1) Exterior angle: $\\widehat{ACx} + \\widehat{ACB} = 180^\\circ$ (linear pair).</p>
          <p>2) Interior sum: $(\\widehat{A} + \\widehat{B}) + \\widehat{ACB} = 180^\\circ$.</p>
          <p>Subtracting $\\widehat{ACB}$ from both: $\\widehat{ACx} = \\widehat{A} + \\widehat{B}$.</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-rose">INEQUALITY COROLLARY</span>
          <p>Because angles $\\widehat{A}$ and $\\widehat{B}$ are strictly positive degrees ($> 0^\\circ$):</p>
          <p style="font-family: monospace; color: #fb7185; font-weight: 700;">\\(\\widehat{ACx} > \\widehat{A} \\quad \\text{and} \\quad \\widehat{ACx} > \\widehat{B}\\)</p>
          <p>An exterior angle is always strictly greater than either of its remote interior angles!</p>
        </div>
      </div>
    `
  },
  {
    title: "Station 5: Live Interactive Angle Sandbox",
    subtitle: "Manipulate Angles in Real-Time & Test Classification",
    content: `
      <h2>Interactive Triangle Angle Simulator</h2>
      <p>Adjust angle $\\widehat{A}$ and angle $\\widehat{B}$ using the flight sliders below. Watch angle $\\widehat{C}$ calculate dynamically to maintain $\\sum = 180^\\circ$, and observe how the triangle classification updates in real-time!</p>

      <div class="interactive-sandbox">
        <div style="text-align: center;">
          <svg id="liveTriangleSvg" viewBox="0 0 500 240" width="100%" height="220" style="background: rgba(15,23,42,0.6); border-radius: 12px; border: 1px solid rgba(56,189,248,0.2);">
            <polygon id="trianglePoly" points="250,40 100,200 400,200" fill="rgba(6,182,212,0.15)" stroke="#38bdf8" stroke-width="3" />
            <circle id="nodeA" cx="250" cy="40" r="6" fill="#22d3ee" />
            <text id="labelA" x="250" y="25" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">A: 70°</text>
            <circle id="nodeB" cx="100" cy="200" r="6" fill="#22d3ee" />
            <text id="labelB" x="80" y="215" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">B: 60°</text>
            <circle id="nodeC" cx="400" cy="200" r="6" fill="#22d3ee" />
            <text id="labelC" x="415" y="215" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold">C: 50°</text>
          </svg>
        </div>

        <div class="sandbox-controls">
          <div class="slider-group">
            <label for="sliderA">Angle A: <span id="valA">70</span>°</label>
            <input type="range" id="sliderA" min="10" max="150" value="70">
          </div>
          <div class="slider-group">
            <label for="sliderB">Angle B: <span id="valB">60</span>°</label>
            <input type="range" id="sliderB" min="10" max="150" value="60">
          </div>
          <button id="presetRight" class="quiz-btn" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Preset: Right Triangle</button>
          <button id="presetObtuse" class="quiz-btn" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">Preset: Obtuse Triangle</button>
        </div>

        <div class="telemetry-display">
          <div class="telemetry-item">
            <div class="label">Angle A</div>
            <div class="value" id="dispA" style="color: #38bdf8;">70°</div>
          </div>
          <div class="telemetry-item">
            <div class="label">Angle B</div>
            <div class="value" id="dispB" style="color: #f59e0b;">60°</div>
          </div>
          <div class="telemetry-item">
            <div class="label">Angle C (Calculated)</div>
            <div class="value" id="dispC" style="color: #34d399;">50°</div>
          </div>
          <div class="telemetry-item">
            <div class="label">Sum (A + B + C)</div>
            <div class="value" style="color: #22d3ee;">180°</div>
          </div>
          <div class="telemetry-item">
            <div class="label">Classification</div>
            <div class="value" id="dispClass" style="color: #38bdf8; font-size: 1.1rem;">ACUTE</div>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Station 6: Interactive Quick Drills",
    subtitle: "Check Your Telemetry Mastery Before the 40-Problem Mission",
    content: `
      <h2>Rapid Telemetry Drills</h2>
      <p>Test your knowledge with these instant-feedback challenges. Tap an answer to check your telemetry analysis!</p>

      <!-- Drill 1 -->
      <div class="quiz-box" id="drill1">
        <div class="quiz-question">1. A triangle has two angles measuring $45^\\circ$ and $45^\\circ$. What is the measurement of the third angle, and how is the triangle classified?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkDrill('drill1', 'A', false)">A) $80^\\circ$ · Acute Triangle</button>
          <button class="quiz-btn" onclick="checkDrill('drill1', 'B', true)">B) $90^\\circ$ · Right Triangle</button>
          <button class="quiz-btn" onclick="checkDrill('drill1', 'C', false)">C) $100^\\circ$ · Obtuse Triangle</button>
          <button class="quiz-btn" onclick="checkDrill('drill1', 'D', false)">D) $90^\\circ$ · Acute Triangle</button>
        </div>
        <div class="quiz-feedback" id="drill1-fb"></div>
      </div>

      <!-- Drill 2 -->
      <div class="quiz-box" id="drill2">
        <div class="quiz-question">2. In a right triangle $\\triangle MNP$ with $\\widehat{M} = 90^\\circ$, acute angle $\\widehat{N} = 34^\\circ$. What is the measure of acute angle $\\widehat{P}$?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkDrill('drill2', 'A', true)">A) $56^\\circ$ (Complementary: $90^\\circ - 34^\\circ$)</button>
          <button class="quiz-btn" onclick="checkDrill('drill2', 'B', false)">B) $66^\\circ$</button>
          <button class="quiz-btn" onclick="checkDrill('drill2', 'C', false)">C) $146^\\circ$</button>
          <button class="quiz-btn" onclick="checkDrill('drill2', 'D', false)">D) $46^\\circ$</button>
        </div>
        <div class="quiz-feedback" id="drill2-fb"></div>
      </div>

      <!-- Drill 3 -->
      <div class="quiz-box" id="drill3">
        <div class="quiz-question">3. In $\\triangle ABC$, the exterior angle at vertex $C$ measures $125^\\circ$. Remote interior angle $\\widehat{A} = 75^\\circ$. What is the degree measure of interior angle $\\widehat{B}$?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkDrill('drill3', 'A', false)">A) $60^\\circ$</button>
          <button class="quiz-btn" onclick="checkDrill('drill3', 'B', false)">B) $45^\\circ$</button>
          <button class="quiz-btn" onclick="checkDrill('drill3', 'C', true)">C) $50^\\circ$ ($125^\\circ - 75^\\circ$)</button>
          <button class="quiz-btn" onclick="checkDrill('drill3', 'D', false)">D) $55^\\circ$</button>
        </div>
        <div class="quiz-feedback" id="drill3-fb"></div>
      </div>
    `
  }
];

const lessonEl = document.querySelector("#lesson");
const stationsNavEl = document.querySelector("#stations");
const prevBtnEl = document.querySelector("#previous");
const nextBtnEl = document.querySelector("#next");
const locationSpanEl = document.querySelector("#location");

let currentStation = 0;

function renderMath() {
  if (window.renderMathInElement) {
    window.renderMathInElement(lessonEl, {
      delimiters: [
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false }
      ],
      output: "html",
      throwOnError: false
    });
  }
}

function renderNav() {
  stationsNavEl.innerHTML = stations.map((st, idx) => `
    <button type="button" data-index="${idx}" ${idx === currentStation ? 'aria-current="step"' : ''}>
      <small>Station ${idx + 1}</small>
      ${st.title.replace(/^Station \d+: /, '')}
    </button>
  `).join("");

  stationsNavEl.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      setStation(parseInt(btn.dataset.index, 10));
    });
  });
}

function initSandbox() {
  const sliderA = document.querySelector("#sliderA");
  const sliderB = document.querySelector("#sliderB");
  if (!sliderA || !sliderB) return;

  function update() {
    let a = parseInt(sliderA.value, 10);
    let b = parseInt(sliderB.value, 10);
    if (a + b >= 175) {
      b = 175 - a;
      sliderB.value = b;
    }
    const c = 180 - a - b;

    document.querySelector("#valA").textContent = a;
    document.querySelector("#valB").textContent = b;
    document.querySelector("#dispA").textContent = a + "°";
    document.querySelector("#dispB").textContent = b + "°";
    document.querySelector("#dispC").textContent = c + "°";

    const dispClass = document.querySelector("#dispClass");
    if (a === 90 || b === 90 || c === 90) {
      dispClass.textContent = "RIGHT TRIANGLE";
      dispClass.style.color = "#34d399";
    } else if (a > 90 || b > 90 || c > 90) {
      dispClass.textContent = "OBTUSE TRIANGLE";
      dispClass.style.color = "#fb7185";
    } else {
      dispClass.textContent = "ACUTE TRIANGLE";
      dispClass.style.color = "#38bdf8";
    }

    // Adjust SVG apex point A dynamically
    // base B at (100, 200), C at (400, 200). Length L = 300.
    const radB = (b * Math.PI) / 180;
    const radC = (c * Math.PI) / 180;
    const radA = (a * Math.PI) / 180;
    // Side c (AB) = 300 * sin(C) / sin(A)
    const lenAB = (300 * Math.sin(radC)) / Math.sin(radA);
    const ax = Math.max(60, Math.min(440, 100 + lenAB * Math.cos(radB)));
    const ay = Math.max(30, Math.min(180, 200 - lenAB * Math.sin(radB)));

    const poly = document.querySelector("#trianglePoly");
    const nodeA = document.querySelector("#nodeA");
    const labelA = document.querySelector("#labelA");
    const labelB = document.querySelector("#labelB");
    const labelC = document.querySelector("#labelC");

    if (poly) poly.setAttribute("points", `${ax},${ay} 100,200 400,200`);
    if (nodeA) {
      nodeA.setAttribute("cx", ax);
      nodeA.setAttribute("cy", ay);
    }
    if (labelA) {
      labelA.setAttribute("x", ax);
      labelA.setAttribute("y", ay - 12);
      labelA.textContent = `A: ${a}°`;
    }
    if (labelB) labelB.textContent = `B: ${b}°`;
    if (labelC) labelC.textContent = `C: ${c}°`;
  }

  sliderA.addEventListener("input", update);
  sliderB.addEventListener("input", update);

  document.querySelector("#presetRight")?.addEventListener("click", () => {
    sliderA.value = 90;
    sliderB.value = 55;
    update();
  });
  document.querySelector("#presetObtuse")?.addEventListener("click", () => {
    sliderA.value = 115;
    sliderB.value = 35;
    update();
  });

  update();
}

window.checkDrill = function(boxId, optId, isCorrect) {
  const box = document.getElementById(boxId);
  const fb = document.getElementById(`${boxId}-fb`);
  const btns = box.querySelectorAll(".quiz-btn");

  btns.forEach(b => {
    b.disabled = true;
    if (b.textContent.trim().startsWith(optId)) {
      b.classList.add(isCorrect ? "correct" : "wrong");
    }
  });

  fb.className = `quiz-feedback show ${isCorrect ? 'success' : 'error'}`;
  if (isCorrect) {
    playSound('chime');
    fb.innerHTML = `<strong>✓ EXCELLENT CADET KEITHLEY!</strong> Correct mathematical deduction.`;
  } else {
    playSound('buzzer');
    fb.innerHTML = `<strong>✗ RECHECK TELEMETRY:</strong> Remember that interior angles must sum to $180^\\circ$ and acute angles in a right triangle sum to $90^\\circ$.`;
  }
  renderMath();
};

function setStation(idx) {
  if (idx < 0 || idx >= stations.length) return;
  currentStation = idx;

  const st = stations[currentStation];
  lessonEl.innerHTML = `
    <article>
      <header>
        <p class="eyebrow">${st.subtitle}</p>
        <h2>${st.title}</h2>
      </header>
      ${st.content}
    </article>
  `;

  renderNav();
  renderMath();

  if (currentStation === 4) {
    initSandbox();
  }

  prevBtnEl.disabled = currentStation === 0;
  nextBtnEl.disabled = currentStation === stations.length - 1;
  locationSpanEl.textContent = `Station ${currentStation + 1} of ${stations.length}`;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

prevBtnEl.addEventListener("click", () => setStation(currentStation - 1));
nextBtnEl.addEventListener("click", () => setStation(currentStation + 1));

// Initialize Station 1
document.addEventListener("DOMContentLoaded", () => {
  setStation(0);
});
