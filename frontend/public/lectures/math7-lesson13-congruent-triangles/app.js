/* Lesson 13: Congruent Triangles & First Congruence Case (SSS)
   Astronaut Cadet Keithley Lake • Grade 7 Math • 21 Nov 2026 */

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playSound(type) {
  try {
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } else if (type === 'buzzer') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    }
  } catch (e) {
    // Audio playback blocked
  }
}

const stations = [
  {
    title: "Station 1: Congruent Triangles",
    subtitle: "Definition, Corresponding Vertices & Exact Overlap",
    content: `
      <h2>What Makes Two Triangles Congruent?</h2>
      <p>Just as two line segments are equal when they have the same length and two angles are equal when they have the same degree measure, two triangles are <strong>congruent</strong> if one can be folded or moved to overlap the other completely.</p>

      <div class="cosmic-card" style="margin: 1.25rem 0;">
        <span class="cosmic-badge badge-cyan">CORE DEFINITION</span>
        <h3>Congruent Triangles ($\\triangle ABC = \\triangle A'B'C'$)</h3>
        <p>Two triangles $\\triangle ABC$ and $\\triangle A'B'C'$ are <strong>congruent</strong> if all three pairs of corresponding sides are equal AND all three pairs of corresponding angles are equal:</p>
        <p style="font-size: 1.05rem; color: #38bdf8; text-align: center; margin: 0.8rem 0;">
          $$\\begin{cases} AB = A'B', \\quad AC = A'C', \\quad BC = B'C' \\\\ \\widehat{A} = \\widehat{A'}, \\quad \\widehat{B} = \\widehat{B'}, \\quad \\widehat{C} = \\widehat{C'} \\end{cases}$$
        </p>
        <p style="margin: 0; color: #cbd5e1;">We write: <strong>$\\triangle ABC = \\triangle A'B'C'$</strong> (read: "triangle $ABC$ is congruent to triangle $A'B'C'$").</p>
      </div>

      <div class="diagram-wrap">
        <img src="/images/geometry/math7_l13_congruent_def.svg" alt="Congruent Triangles Definition">
      </div>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-amber">VERTEX ORDER RULE</span>
          <h3>Order Matters!</h3>
          <p>When writing $\\triangle ABC = \\triangle A'B'C'$, the letters MUST match corresponding vertices in exact order:</p>
          <ul>
            <li>$1^{\\text{st}}$ position: $A \\leftrightarrow A'$</li>
            <li>$2^{\\text{nd}}$ position: $B \\leftrightarrow B'$</li>
            <li>$3^{\\text{rd}}$ position: $C \\leftrightarrow C'$</li>
          </ul>
        </div>

        <div class="cosmic-card">
          <span class="cosmic-badge badge-emerald">EXAMPLE · REFLECTED TRIANGLES</span>
          <h3>Matching Tick Marks</h3>
          <p>Even if a triangle is flipped like a mirror image, match vertices between identical side tick marks and angle arcs:</p>
          <p>In the diagram below: $\\widehat{D} = \\widehat{G}$, $\\widehat{E} = \\widehat{H}$, and $DF = GK$, $DE = GH$, $EF = HK$.</p>
          <p>Therefore: <strong>$\\triangle DEF = \\triangle GHK$</strong>.</p>
        </div>
      </div>

      <div class="diagram-wrap">
        <img src="/images/geometry/math7_l13_tick_matching_def_ghk.svg" alt="Reflected Congruent Triangles DEF and GHK">
      </div>
    `
  },
  {
    title: "Station 2: Corresponding Parts Telemetry",
    subtitle: "Decoding Sides & Angles from Congruence Notation",
    content: `
      <h2>Reading Corresponding Parts Without Guessing</h2>
      <p>Once you know $\\triangle ABC = \\triangle DEF$, you can immediately extract all 6 pairs of equal parts just by matching letter positions:</p>

      <table class="proof-table">
        <thead>
          <tr>
            <th>Corresponding Vertices</th>
            <th>Equal Corresponding Angles</th>
            <th>Equal Corresponding Sides</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Position 1: $A \\leftrightarrow D$</td>
            <td>$\\widehat{A} = \\widehat{D}$ (or $\\widehat{BAC} = \\widehat{EDF}$)</td>
            <td>Positions (1, 2): $AB = DE$</td>
          </tr>
          <tr>
            <td>Position 2: $B \\leftrightarrow E$</td>
            <td>$\\widehat{B} = \\widehat{E}$ (or $\\widehat{ABC} = \\widehat{DEF}$)</td>
            <td>Positions (2, 3): $BC = EF$</td>
          </tr>
          <tr>
            <td>Position 3: $C \\leftrightarrow F$</td>
            <td>$\\widehat{C} = \\widehat{F}$ (or $\\widehat{ACB} = \\widehat{DFE}$)</td>
            <td>Positions (1, 3): $AC = DF$</td>
          </tr>
        </tbody>
      </table>

      <div class="cosmic-card" style="margin: 1.25rem 0;">
        <span class="cosmic-badge badge-cyan">WORKED MISSION · PRACTICE 1</span>
        <h3>Computing Missing Side &amp; Angle</h3>
        <p>Given $\\triangle ABC = \\triangle DEF$ with $BC = 4\\text{ cm}$, $\\widehat{ABC} = 40^\\circ$, and $\\widehat{ACB} = 60^\\circ$. Find $EF$ and $\\widehat{EDF}$.</p>
        <div class="diagram-wrap">
          <img src="/images/geometry/math7_l13_luyentap1_abc_def.svg" alt="Practice 1 Triangle ABC and DEF">
        </div>
        <p><strong>Step 1 (Side $EF$):</strong> Because $\\triangle ABC = \\triangle DEF$, corresponding sides $BC$ and $EF$ are equal. Thus $EF = BC = 4\\text{ cm}$.</p>
        <p><strong>Step 2 (Angle $\\widehat{EDF}$):</strong> In $\\triangle ABC$, by the $180^\\circ$ Angle Sum Theorem: $\\widehat{BAC} = 180^\\circ - (40^\\circ + 60^\\circ) = 80^\\circ$.</p>
        <p style="margin-bottom: 0;">Since $\\widehat{EDF}$ corresponds to $\\widehat{BAC}$, we conclude $\\widehat{EDF} = 80^\\circ$.</p>
      </div>
    `
  },
  {
    title: "Station 3: The SSS Theorem",
    subtitle: "First Congruence Case: Side-Side-Side (SSS)",
    content: `
      <h2>Do We Need All 6 Measurements?</h2>
      <p>Checking 3 sides AND 3 angles every time would slow down spacecraft navigation! Fortunately, a triangle's shape is <strong>completely locked</strong> by its three side lengths alone.</p>

      <div class="cosmic-card" style="text-align: center; margin: 1.25rem 0;">
        <span class="cosmic-badge badge-emerald">FIRST CONGRUENCE THEOREM · SSS</span>
        <h3 style="justify-content: center; font-size: 1.35rem; color: #34d399; margin: 0.7rem 0;">
          Side-Side-Side (SSS) Criterion
        </h3>
        <p style="color: #e2e8f0; margin: 0;">If three sides of one triangle are equal to three sides of another triangle, then the two triangles are <strong>congruent</strong>.</p>
        <p style="color: #38bdf8; margin: 0.7rem 0 0; font-weight: 700;">
          $\\begin{cases} AB = A'B' \\\\ AC = A'C' \\\\ BC = B'C' \\end{cases} \\implies \\triangle ABC = \\triangle A'B'C' \\text{ (SSS)}$
        </p>
      </div>

      <h3>Compass &amp; Straightedge Construction</h3>
      <p>To build a unique triangle with $BC = 6\\text{ cm}$, $AB = 5\\text{ cm}$, and $AC = 4\\text{ cm}$:</p>
      <div class="diagram-wrap">
        <img src="/images/geometry/math7_l13_compass_sss_construct.svg" alt="SSS Compass Construction">
      </div>
      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-cyan">STEP 1</span>
          <p>Draw base segment $BC = 6\\text{ cm}$ with a ruler.</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-amber">STEP 2</span>
          <p>Draw an arc centered at $B$ (radius $5\\text{ cm}$) and an arc centered at $C$ (radius $4\\text{ cm}$). They intersect at $A$.</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-emerald">STEP 3</span>
          <p>Connect $AB$ and $AC$. Any second triangle with sides $6, 5, 4\\text{ cm}$ will have identical angles!</p>
        </div>
      </div>

      <h3>Spotting SSS Congruent Pairs</h3>
      <p>In the sensor scan below, $\\triangle ABC$, $\\triangle MNP$, and $\\triangle GKH$ all share the three side lengths marked with $(\\times, 1\\text{ tick}, 2\\text{ ticks})$, whereas $\\triangle DEF$ has $(1\\text{ tick}, 1\\text{ tick}, \\times)$ and is NOT congruent to them:</p>
      <div class="diagram-wrap">
        <img src="/images/geometry/math7_l13_four_triangles_sss.svg" alt="Four Triangles SSS Comparison">
      </div>
    `
  },
  {
    title: "Station 4: Common-Side Proofs & Bisectors",
    subtitle: "Hidden Equalities & Compass Angle Bisector Proof",
    content: `
      <h2>Spotting the Common Side</h2>
      <p>In many geometry problems, only <strong>two</strong> pairs of equal sides are marked. Look closely: the two triangles share a third <strong>common side</strong>!</p>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-amber">PATTERN 1 · SHARED BASE</span>
          <h3>Crossed Triangles</h3>
          <p>Given $AC = BD$ and $AD = BC$. Prove $\\triangle ACB = \\triangle BDA$.</p>
          <p><strong>Proof:</strong> Consider $\\triangle ACB$ and $\\triangle BDA$:</p>
          <ul>
            <li>$AC = BD$ (given)</li>
            <li>$BC = AD$ (given)</li>
            <li>$AB$ is a common side</li>
          </ul>
          <p style="margin-bottom:0;">$\\implies \\triangle ACB = \\triangle BDA$ (SSS).</p>
        </div>

        <div class="cosmic-card">
          <span class="cosmic-badge badge-emerald">PATTERN 2 · SHARED DIAGONAL</span>
          <h3>Kite Symmetry</h3>
          <p>Given $AB = AD$ and $BC = DC$. Prove $\\triangle ABC = \\triangle ADC$.</p>
          <p><strong>Proof:</strong> Consider $\\triangle ABC$ and $\\triangle ADC$:</p>
          <ul>
            <li>$AB = AD$ (given)</li>
            <li>$BC = DC$ (given)</li>
            <li>$AC$ is a common side</li>
          </ul>
          <p style="margin-bottom:0;">$\\implies \\triangle ABC = \\triangle ADC$ (SSS).</p>
        </div>
      </div>

      <div class="diagram-wrap">
        <img src="/images/geometry/math7_l13_bowtie_shared_base.svg" alt="Common Base AB Proof">
      </div>

      <div class="cosmic-card" style="margin-top: 1.5rem;">
        <span class="cosmic-badge badge-cyan">APPLICATION · ANGLE BISECTOR CONSTRUCTION</span>
        <h3>Why Does the Compass Method Bisect $\\widehat{xOy}$?</h3>
        <div class="diagram-wrap">
          <img src="/images/geometry/math7_l13_compass_bisector.svg" alt="Compass Angle Bisector Construction">
        </div>
        <p>1) Circle center $O$ cuts $Ox$ at $A$ and $Oy$ at $B$, so $OA = OB$ (equal radii).</p>
        <p>2) Equal-radius arcs centered at $A$ and $B$ (radius $AO = BO$) intersect at $M$, so $AM = BM$.</p>
        <p>3) Comparing $\\triangle OAM$ and $\\triangle OBM$: $OA = OB$, $AM = BM$, and $OM$ is a common side $\\implies \\triangle OAM = \\triangle OBM$ (SSS).</p>
        <p style="margin-bottom:0;">Therefore, corresponding angles are equal: <strong>$\\widehat{AOM} = \\widehat{BOM}$</strong>, proving $OM$ is the angle bisector of $\\widehat{xOy}$!</p>
      </div>
    `
  },
  {
    title: "Station 5: Live SSS Triangle Explorer",
    subtitle: "Adjust Side Lengths & Test Triangle Inequality + Orientation",
    content: `
      <h2>Interactive SSS Congruence Simulator</h2>
      <p>Adjust side lengths $a = BC$, $b = AC$, and $c = AB$ below. Observe how fixing all three side lengths uniquely locks all three interior angles of $\\triangle ABC$ and $\\triangle DEF$—even when $\\triangle DEF$ is flipped!</p>

      <div class="interactive-sandbox">
        <div style="text-align: center;">
          <svg id="sssSvg" viewBox="0 0 560 240" width="100%" height="230" style="background: rgba(15,23,42,0.7); border-radius: 12px; border: 1px solid rgba(56,189,248,0.25);">
            <polygon id="poly1" points="140,60 50,195 230,195" fill="rgba(56,189,248,0.16)" stroke="#38BDF8" stroke-width="2.8" />
            <polygon id="poly2" points="420,60 330,195 510,195" fill="rgba(52,211,153,0.16)" stroke="#34D399" stroke-width="2.8" />
            <text id="vA" x="140" y="45" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">A</text>
            <text id="vB" x="38" y="205" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="end">B</text>
            <text id="vC" x="242" y="205" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="start">C</text>
            <text id="vD" x="420" y="45" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="middle">D</text>
            <text id="vE" x="318" y="205" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="end">E</text>
            <text id="vF" x="522" y="205" fill="#FFF" font-family="system-ui" font-size="14" font-weight="bold" text-anchor="start">F</text>
            <text id="warnMsg" x="280" y="125" fill="#FB7185" font-family="system-ui" font-size="15" font-weight="bold" text-anchor="middle" visibility="hidden">TRIANGLE INEQUALITY VIOLATED (Two sides must exceed the third!)</text>
          </svg>
        </div>

        <div class="sandbox-controls">
          <div class="slider-group">
            <label for="sideBC">Base $a = BC = EF$: <span id="valBC">6.0</span> cm</label>
            <input type="range" id="sideBC" min="3" max="9" step="0.5" value="6">
          </div>
          <div class="slider-group">
            <label for="sideAB">Left $c = AB = DE$: <span id="valAB">5.0</span> cm</label>
            <input type="range" id="sideAB" min="3" max="9" step="0.5" value="5">
          </div>
          <div class="slider-group">
            <label for="sideAC">Right $b = AC = DF$: <span id="valAC">4.0</span> cm</label>
            <input type="range" id="sideAC" min="3" max="9" step="0.5" value="4">
          </div>
          <button id="toggleFlip" class="quiz-btn" style="padding: 0.5rem 0.9rem; font-size: 0.85rem;">Mirror Flip △DEF</button>
        </div>

        <div class="telemetry-display">
          <div class="telemetry-item">
            <div class="label">Angle A = Angle D</div>
            <div class="value" id="angA" style="color: #38bdf8;">82.8°</div>
          </div>
          <div class="telemetry-item">
            <div class="label">Angle B = Angle E</div>
            <div class="value" id="angB" style="color: #fbbf24;">41.4°</div>
          </div>
          <div class="telemetry-item">
            <div class="label">Angle C = Angle F</div>
            <div class="value" id="angC" style="color: #34d399;">55.8°</div>
          </div>
          <div class="telemetry-item">
            <div class="label">Telemetry Status</div>
            <div class="value" id="sssStatus" style="color: #34d399; font-size: 0.95rem;">△ABC = △DEF (SSS)</div>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Station 6: Quick Telemetry Drills",
    subtitle: "Verify Your Mastery Before Launching the 30-Problem Mission",
    content: `
      <h2>Pre-Flight Quick Check Drills</h2>
      <p>Complete all four rapid telemetry checks before launching your 30-question orbital expedition!</p>

      <div class="quiz-box" id="drill1">
        <div class="quiz-question">1. Given $\\triangle ABC = \\triangle DEF$, which congruence notation correctly reorders the exact same correspondence?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkDrill('drill1', 'A', false)">A) $\\triangle BCA = \\triangle FED$</button>
          <button class="quiz-btn" onclick="checkDrill('drill1', 'B', false)">B) $\\triangle CAB = \\triangle EDF$</button>
          <button class="quiz-btn" onclick="checkDrill('drill1', 'C', true)">C) $\\triangle BAC = \\triangle EDF$</button>
          <button class="quiz-btn" onclick="checkDrill('drill1', 'D', false)">D) $\\triangle CBA = \\triangle FDE$</button>
        </div>
        <div class="quiz-feedback" id="drill1-fb"></div>
      </div>

      <div class="quiz-box" id="drill2">
        <div class="quiz-question">2. Given $\\triangle ABC = \\triangle DEF$ with $\\widehat{A} = 60^\\circ$ and $\\widehat{E} = 80^\\circ$, what is the measure of $\\widehat{F}$?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkDrill('drill2', 'A', true)">A) $40^\\circ$</button>
          <button class="quiz-btn" onclick="checkDrill('drill2', 'B', false)">B) $60^\\circ$</button>
          <button class="quiz-btn" onclick="checkDrill('drill2', 'C', false)">C) $80^\\circ$</button>
          <button class="quiz-btn" onclick="checkDrill('drill2', 'D', false)">D) $50^\\circ$</button>
        </div>
        <div class="quiz-feedback" id="drill2-fb"></div>
      </div>

      <div class="quiz-box" id="drill3">
        <div class="quiz-question">3. In quadrilateral $ABCD$ with diagonal $AC$, we have $AB = AD$ and $CB = CD$. Which congruence holds by SSS?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkDrill('drill3', 'A', false)">A) $\\triangle ABC = \\triangle CDA$</button>
          <button class="quiz-btn" onclick="checkDrill('drill3', 'B', true)">B) $\\triangle ABC = \\triangle ADC$</button>
          <button class="quiz-btn" onclick="checkDrill('drill3', 'C', false)">C) $\\triangle ACB = \\triangle DAC$</button>
          <button class="quiz-btn" onclick="checkDrill('drill3', 'D', false)">D) $\\triangle BAC = \\triangle DCA$</button>
        </div>
        <div class="quiz-feedback" id="drill3-fb"></div>
      </div>

      <div class="quiz-box" id="drill4">
        <div class="quiz-question">4. In the compass construction of angle bisector $OM$ of $\\widehat{xOy}$ ($OA=OB$, $AM=BM$), why is $\\widehat{AOM} = \\widehat{BOM}$?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkDrill('drill4', 'A', false)">A) Because $OM$ is perpendicular to $AB$</button>
          <button class="quiz-btn" onclick="checkDrill('drill4', 'B', false)">B) Because all triangles on ray $Ox$ are equilateral</button>
          <button class="quiz-btn" onclick="checkDrill('drill4', 'C', false)">C) Because vertical opposite angles are always equal</button>
          <button class="quiz-btn" onclick="checkDrill('drill4', 'D', true)">D) Because $\\triangle OAM = \\triangle OBM$ by SSS congruence</button>
        </div>
        <div class="quiz-feedback" id="drill4-fb"></div>
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
        { left: "$$", right: "$$", display: true },
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
  const sBC = document.querySelector("#sideBC");
  const sAB = document.querySelector("#sideAB");
  const sAC = document.querySelector("#sideAC");
  const flipBtn = document.querySelector("#toggleFlip");
  if (!sBC || !sAB || !sAC) return;

  let flipped = false;

  function update() {
    const a = parseFloat(sBC.value); // BC
    const c = parseFloat(sAB.value); // AB
    const b = parseFloat(sAC.value); // AC

    document.querySelector("#valBC").textContent = a.toFixed(1);
    document.querySelector("#valAB").textContent = c.toFixed(1);
    document.querySelector("#valAC").textContent = b.toFixed(1);

    const poly1 = document.querySelector("#poly1");
    const poly2 = document.querySelector("#poly2");
    const warnMsg = document.querySelector("#warnMsg");
    const statusEl = document.querySelector("#sssStatus");

    const valid = (a + b > c) && (a + c > b) && (b + c > a);
    if (!valid) {
      poly1.setAttribute("visibility", "hidden");
      poly2.setAttribute("visibility", "hidden");
      warnMsg.setAttribute("visibility", "visible");
      document.querySelector("#angA").textContent = "—";
      document.querySelector("#angB").textContent = "—";
      document.querySelector("#angC").textContent = "—";
      statusEl.textContent = "INVALID TRIANGLE";
      statusEl.style.color = "#fb7185";
      return;
    }

    poly1.setAttribute("visibility", "visible");
    poly2.setAttribute("visibility", "visible");
    warnMsg.setAttribute("visibility", "hidden");
    statusEl.textContent = "△ABC = △DEF (SSS)";
    statusEl.style.color = "#34d399";

    const radA = Math.acos((b*b + c*c - a*a) / (2*b*c));
    const radB = Math.acos((a*a + c*c - b*b) / (2*a*c));
    const radC = Math.PI - radA - radB;

    document.querySelector("#angA").textContent = (radA * 180 / Math.PI).toFixed(1) + "°";
    document.querySelector("#angB").textContent = (radB * 180 / Math.PI).toFixed(1) + "°";
    document.querySelector("#angC").textContent = (radC * 180 / Math.PI).toFixed(1) + "°";

    const scale = 21;
    const basePx = a * scale;
    const xB1 = 140 - basePx / 2;
    const xC1 = 140 + basePx / 2;
    const yBase = 200;
    const xA1 = xB1 + c * scale * Math.cos(radB);
    const yA1 = yBase - c * scale * Math.sin(radB);

    poly1.setAttribute("points", `${xA1.toFixed(1)},${yA1.toFixed(1)} ${xB1.toFixed(1)},${yBase} ${xC1.toFixed(1)},${yBase}`);
    document.querySelector("#vA").setAttribute("x", xA1);
    document.querySelector("#vA").setAttribute("y", Math.max(22, yA1 - 12));
    document.querySelector("#vB").setAttribute("x", xB1 - 10);
    document.querySelector("#vC").setAttribute("x", xC1 + 10);

    // Second triangle (optionally mirrored horizontally)
    const cx2 = 420;
    const xE2 = flipped ? cx2 + basePx / 2 : cx2 - basePx / 2;
    const xF2 = flipped ? cx2 - basePx / 2 : cx2 + basePx / 2;
    const xD2 = flipped
      ? xE2 - c * scale * Math.cos(radB)
      : xE2 + c * scale * Math.cos(radB);
    const yD2 = yBase - c * scale * Math.sin(radB);

    poly2.setAttribute("points", `${xD2.toFixed(1)},${yD2.toFixed(1)} ${xE2.toFixed(1)},${yBase} ${xF2.toFixed(1)},${yBase}`);
    document.querySelector("#vD").setAttribute("x", xD2);
    document.querySelector("#vD").setAttribute("y", Math.max(22, yD2 - 12));
    document.querySelector("#vE").setAttribute("x", xE2 + (flipped ? 10 : -10));
    document.querySelector("#vE").setAttribute("text-anchor", flipped ? "start" : "end");
    document.querySelector("#vF").setAttribute("x", xF2 + (flipped ? -10 : 10));
    document.querySelector("#vF").setAttribute("text-anchor", flipped ? "end" : "start");
  }

  sBC.addEventListener("input", update);
  sAB.addEventListener("input", update);
  sAC.addEventListener("input", update);
  if (flipBtn) {
    flipBtn.addEventListener("click", () => {
      flipped = !flipped;
      flipBtn.textContent = flipped ? "Restore △DEF Orientation" : "Mirror Flip △DEF";
      update();
    });
  }

  update();
}

const drillHints = {
  drill1: "Match vertex positions 1, 2, 3 from $\\triangle ABC = \\triangle DEF$: $A\\leftrightarrow D$, $B\\leftrightarrow E$, $C\\leftrightarrow F$. Swapping $A$ and $B$ on the left requires swapping $D$ and $E$ on the right: $\\triangle BAC = \\triangle EDF$.",
  drill2: "$\\triangle ABC = \\triangle DEF \\implies \\widehat{D} = \\widehat{A} = 60^\\circ$. In $\\triangle DEF$, $\\widehat{F} = 180^\\circ - (\\widehat{D} + \\widehat{E}) = 180^\\circ - (60^\\circ + 80^\\circ) = 40^\\circ$.",
  drill3: "Since $AB = AD$, $CB = CD$, and $AC$ is common, match $B \\leftrightarrow D$ while $A \\leftrightarrow A$ and $C \\leftrightarrow C$: $\\triangle ABC = \\triangle ADC$.",
  drill4: "Compass arcs guarantee $OA = OB$ and $AM = BM$, and $OM$ is common. By SSS, $\\triangle OAM = \\triangle OBM$, so corresponding angles $\\widehat{AOM} = \\widehat{BOM}$."
};

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
    fb.innerHTML = `<strong>✓ TARGET LOCKED, CADET KEITHLEY!</strong> ${drillHints[boxId]}`;
  } else {
    playSound('buzzer');
    fb.innerHTML = `<strong>✗ TELEMETRY MISMATCH:</strong> ${drillHints[boxId]}`;
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

document.addEventListener("DOMContentLoaded", () => {
  setStation(0);
});
