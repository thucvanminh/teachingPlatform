/* Lesson 15: Congruence Criteria for Right Triangles
   Astronaut Cadet Keithley Lake • Grade 7 Math • 28 Nov 2026 */

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
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } else if (type === 'buzzer') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    }
  } catch (e) {}
}

const stations = [
  {
    title: "Station 1: Four Right Triangle Criteria",
    subtitle: "Direct Consequences of SAS & ASA + The Special HL Theorem",
    content: `
      <div class="diagram-wrap">
        <img src="/images/geometry/math7_l15_four_cases_matrix.svg" alt="Master Matrix of Four Right Triangle Congruence Criteria">
      </div>

      <table class="proof-table">
        <thead>
          <tr>
            <th>Criterion</th>
            <th>Required Equal Parts</th>
            <th>Foundation / Mathematical Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Leg–Leg (LL)</strong></td>
            <td>Two pairs of corresponding legs are equal ($AB = A'B', AC = A'C'$).</td>
            <td>Direct corollary of <strong>SAS</strong>: the included angle between the two legs is always the right angle ($90^\\circ$).</td>
          </tr>
          <tr>
            <td><strong>2. Leg–Acute Angle (LA)</strong></td>
            <td>One leg and one adjacent acute angle are equal ($AB = A'B', \\widehat{B} = \\widehat{B'}$).</td>
            <td>Direct corollary of <strong>ASA</strong>: the leg is bounded by the $90^\\circ$ right angle and the adjacent acute angle.</td>
          </tr>
          <tr>
            <td><strong>3. Hypotenuse–Acute Angle (HA)</strong></td>
            <td>The hypotenuse and one acute angle are equal ($BC = B'C', \\widehat{B} = \\widehat{B'}$).</td>
            <td>Corollary of <strong>ASA</strong>: since acute angles sum to $90^\\circ$, knowing one acute angle immediately locks the other ($\\widehat{C} = 90^\\circ - \\widehat{B} = \\widehat{C'}$).</td>
          </tr>
          <tr>
            <td><strong>4. Hypotenuse–Leg (HL)</strong></td>
            <td>The hypotenuse and one leg are equal ($BC = B'C', AB = A'B'$).</td>
            <td><strong>Special Right-Triangle Theorem</strong>: by the Pythagorean theorem, the third leg $AC = \\sqrt{BC^2 - AB^2}$ is uniquely locked, creating SSS congruence.</td>
          </tr>
        </tbody>
      </table>

      <div class="cosmic-card" style="margin-top:1.1rem;">
        <span class="cosmic-badge badge-rose">CRITICAL ALERT · INVALID CRITERION TRAP</span>
        <p style="margin:0.4rem 0 0;">Two equal acute angles alone (<strong>AA</strong> or <strong>AAA</strong>) do <strong>NOT</strong> prove congruence! They only guarantee the same shape (similarity). You must always have at least <strong>ONE equal side</strong> (either a leg or hypotenuse) to prove equal size!</p>
      </div>
    `
  },
  {
    title: "Station 2: Special Theorem: Hypotenuse–Leg (HL)",
    subtitle: "Why SSA Normally Fails, Yet HL Uniquely Locks Right Triangles",
    content: `
      <h2>The Geometry of Hypotenuse–Leg (HL)</h2>
      <p>For general oblique triangles, two sides and a non-included angle (<strong>SSA</strong>) is mathematically <strong>invalid</strong> because a swinging compass arc can cross the base line twice, forming two completely different triangles (one acute, one obtuse).</p>
      <p>However, when the given angle is exactly $90^\\circ$, the hypotenuse is the longest side and the compass arc meets the perpendicular ray at <strong>exactly one unique tangent point</strong> on that side of the vertex!</p>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-cyan">THEOREM 1 · COMPASS CONSTRUCTION LOCK</span>
          <div class="diagram-wrap" style="margin:0.7rem 0 0.4rem;">
            <img src="/images/geometry/math7_l15_compass_hl.svg" alt="Compass Construction Locking a Unique Right Triangle">
          </div>
          <p style="margin:0;">Given leg $AB$ and right angle at $A$: an arc of radius $BC$ centered at $B$ intersects ray $Ax$ at exactly one location $C$. The right triangle $\\triangle ABC$ is uniquely determined.</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-amber">RECOGNITION · HYPOTENUSE VS LEG MATCHING</span>
          <div class="diagram-wrap" style="margin:0.7rem 0 0.4rem;">
            <img src="/images/geometry/math7_l15_hl_four_triangles.svg" alt="Distinguishing Valid HL from Mismatched Leg and Hypotenuse">
          </div>
          <p style="margin:0;">Always verify parts carefully: match <strong>hypotenuse to hypotenuse</strong> (opposite $90^\\circ$) and <strong>leg to leg</strong>. Mismatching a hypotenuse with a leg is an invalid trap!</p>
        </div>
      </div>
    `
  },
  {
    title: "Station 3: Classic Proof Blueprints",
    subtitle: "Four Essential Geometric Configurations from SGK & SBT",
    content: `
      <h2>Core Right-Triangle Proof Patterns</h2>
      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-cyan">BLUEPRINT 1 · ANGLE BISECTOR EQUIDISTANCE</span>
          <div class="diagram-wrap" style="margin:0.7rem 0 0.4rem;">
            <img src="/images/geometry/math7_l15_bisector_perp.svg" alt="Angle Bisector Equidistance Proof Diagram">
          </div>
          <p><strong>Setup:</strong> Point $M$ on bisector $Oz$ of $\\widehat{xOy}$; draw $MA \\perp Ox$ and $MB \\perp Oy$.</p>
          <p style="margin:0;"><strong>Proof:</strong> Right triangles $\\triangle OAM$ and $\\triangle OBM$ share common hypotenuse $OM$, with acute angles $\\widehat{AOM} = \\widehat{BOM}$. $\\implies \\triangle OAM = \\triangle OBM$ (HA) $\\implies MA = MB$.</p>
        </div>

        <div class="cosmic-card">
          <span class="cosmic-badge badge-emerald">BLUEPRINT 2 · PERPENDICULAR KITE DIAGONALS</span>
          <div class="diagram-wrap" style="margin:0.7rem 0 0.4rem;">
            <img src="/images/geometry/math7_l15_kite_vidu1_ha.svg" alt="Perpendicular Kite Diagonals Proof Diagram">
          </div>
          <p><strong>Setup:</strong> Point $C$ equidistant from arms of $\\widehat{A}$ with $CB \\perp AB$, $CD \\perp AD$, $CB = CD$.</p>
          <p style="margin:0;"><strong>Proof:</strong> $\\triangle ABC = \\triangle ADC$ (HL: $AC$ common, $CB=CD$). Hence $\\widehat{BAC} = \\widehat{DAC}$. Then $\\triangle ABE = \\triangle ADE$ (SAS) proves diagonal $AC \\perp BD$.</p>
        </div>

        <div class="cosmic-card">
          <span class="cosmic-badge badge-amber">BLUEPRINT 3 · CIRCLE CHORD BISECTORS</span>
          <div class="diagram-wrap" style="margin:0.7rem 0 0.4rem;">
            <img src="/images/geometry/math7_l15_circle_three_hl.svg" alt="Circle Center Perpendiculars to Equal Chords">
          </div>
          <p><strong>Setup:</strong> Circle $(O; R)$ with chords; draw perpendiculars from center $O$ to chords.</p>
          <p style="margin:0;"><strong>Proof:</strong> Hypotenuses are radii $OA = OB = OC = R$. Perpendiculars from center create 3 congruent right triangle pairs by HL, proving every perpendicular from center bisects its chord.</p>
        </div>

        <div class="cosmic-card">
          <span class="cosmic-badge badge-rose">BLUEPRINT 4 · SQUARE MIDPOINT ROTATIONS</span>
          <div class="diagram-wrap" style="margin:0.7rem 0 0.4rem;">
            <img src="/images/geometry/math7_l15_sbt_434_square_mid.svg" alt="Square Midpoint Segments Congruence Proof">
          </div>
          <p><strong>Setup:</strong> Square $ABCD$ with $M$ midpoint of $CD$, $N$ midpoint of $AD$.</p>
          <p style="margin:0;"><strong>Proof:</strong> Right triangles $\\triangle ABN$ and $\\triangle BCM$ have legs $AB = BC$ and $AN = CM = \\frac{1}{2}AB$. Thus $\\triangle ABN = \\triangle BCM$ (LL) $\\implies BN = CM$ and $BN \\perp CM$.</p>
        </div>
      </div>
    `
  },
  {
    title: "Station 4: Rapid Criterion Drills",
    subtitle: "Cosmic Telemetry Quick Checks · LL, LA, HA, HL & AA Traps",
    content: `
      <h2>Interactive Flight Drills</h2>

      <div class="quiz-box" id="q1">
        <div class="quiz-question">1. In right triangles $\\triangle ABC$ ($\\widehat{A}=90^\\circ$) and $\\triangle DEF$ ($\\widehat{D}=90^\\circ$), you are given legs $AB = DE$ and $AC = DF$. Which criterion directly proves $\\triangle ABC = \\triangle DEF$?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkDrill('q1','A',true)">A) Leg–Leg (LL)</button>
          <button class="quiz-btn" onclick="checkDrill('q1','B',false)">B) Hypotenuse–Leg (HL)</button>
          <button class="quiz-btn" onclick="checkDrill('q1','C',false)">C) Hypotenuse–Acute Angle (HA)</button>
          <button class="quiz-btn" onclick="checkDrill('q1','D',false)">D) Leg–Acute Angle (LA)</button>
        </div>
        <div class="quiz-feedback" id="q1-fb"></div>
      </div>

      <div class="quiz-box" id="q2">
        <div class="quiz-question">2. In right triangles $\\triangle ABC$ ($\\widehat{A}=90^\\circ$) and $\\triangle MNP$ ($\\widehat{M}=90^\\circ$), given hypotenuses $BC = NP$ and acute angles $\\widehat{B} = \\widehat{N} = 35^\\circ$. Which criterion guarantees congruence?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkDrill('q2','A',false)">A) Leg–Leg (LL)</button>
          <button class="quiz-btn" onclick="checkDrill('q2','B',true)">B) Hypotenuse–Acute Angle (HA)</button>
          <button class="quiz-btn" onclick="checkDrill('q2','C',false)">C) Angle–Angle (AA)</button>
          <button class="quiz-btn" onclick="checkDrill('q2','D',false)">D) Hypotenuse–Leg (HL)</button>
        </div>
        <div class="quiz-feedback" id="q2-fb"></div>
      </div>

      <div class="quiz-box" id="q3">
        <div class="quiz-question">3. In right triangles $\\triangle ABC$ ($\\widehat{B}=90^\\circ$) and $\\triangle DEF$ ($\\widehat{E}=90^\\circ$), hypotenuse $AC = 10\\text{ cm}$, leg $AB = 6\\text{ cm}$, hypotenuse $DF = 10\\text{ cm}$, and leg $EF = 6\\text{ cm}$. Are they congruent?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkDrill('q3','A',true)">A) Yes, by Hypotenuse–Leg (HL)</button>
          <button class="quiz-btn" onclick="checkDrill('q3','B',false)">B) No, because $AB$ and $EF$ are in different leg positions</button>
          <button class="quiz-btn" onclick="checkDrill('q3','C',false)">C) Yes, by Leg–Leg (LL)</button>
          <button class="quiz-btn" onclick="checkDrill('q3','D',false)">D) Not enough information</button>
        </div>
        <div class="quiz-feedback" id="q3-fb"></div>
      </div>

      <div class="quiz-box" id="q4">
        <div class="quiz-question">4. Right triangle $\\triangle ABC$ has acute angles $30^\\circ$ and $60^\\circ$. Right triangle $\\triangle DEF$ also has acute angles $30^\\circ$ and $60^\\circ$. Can we conclude $\\triangle ABC = \\triangle DEF$?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkDrill('q4','A',false)">A) Yes, by Angle–Angle (AA)</button>
          <button class="quiz-btn" onclick="checkDrill('q4','B',false)">B) Yes, by Hypotenuse–Acute Angle (HA)</button>
          <button class="quiz-btn" onclick="checkDrill('q4','C',true)">C) No, because at least ONE equal side is required</button>
          <button class="quiz-btn" onclick="checkDrill('q4','D',false)">D) Yes, by Leg–Acute Angle (LA)</button>
        </div>
        <div class="quiz-feedback" id="q4-fb"></div>
      </div>
    `
  }
];

const explanations = {
  q1: "Both pairs of legs are equal with the included $90^\\circ$ right angle $\\implies$ Leg–Leg (LL) criterion (derived from SAS).",
  q2: "Equal hypotenuses ($BC = NP$) and one equal acute angle ($\\widehat{B} = \\widehat{N}\\,) satisfy the Hypotenuse–Acute Angle (HA) criterion (derived from ASA).",
  q3: "Both triangles have hypotenuse = $10\\text{ cm}$ and one leg = $6\\text{ cm}$. By the Pythagorean theorem, the remaining leg is $\\sqrt{10^2 - 6^2} = 8\\text{ cm}$ in both, guaranteeing congruence by Hypotenuse–Leg (HL).",
  q4: "Angle–Angle (AA) only ensures identical shape (similarity), not equal size! Without at least ONE pair of equal sides (leg or hypotenuse), congruence cannot be proven."
};

window.checkDrill = function(qId, opt, isCorrect) {
  const box = document.getElementById(qId);
  if (!box) return;
  const fb = document.getElementById(`${qId}-fb`);
  const buttons = box.querySelectorAll('.quiz-btn');
  buttons.forEach(b => b.classList.remove('correct', 'wrong'));
  const idx = ['A', 'B', 'C', 'D'].indexOf(opt);
  if (idx >= 0 && buttons[idx]) {
    buttons[idx].classList.add(isCorrect ? 'correct' : 'wrong');
  }
  if (isCorrect) {
    playSound('chime');
    if (fb) {
      fb.style.color = '#34d399';
      fb.innerHTML = `✓ Correct! ${explanations[qId] || ''}`;
      if (window.renderMathInElement) {
        renderMathInElement(fb, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false,
          output: 'html'
        });
      }
    }
  } else {
    playSound('buzzer');
    if (fb) {
      fb.style.color = '#fb7185';
      fb.textContent = '✗ Review the required parts: LL, LA, HA, HL, or check if an equal side is missing.';
    }
  }
};

let currentIdx = 0;

function renderStation(idx) {
  currentIdx = idx;
  const st = stations[idx];
  const main = document.getElementById('lesson');
  main.innerHTML = `<div class="panel"><h2>${st.title}</h2><p class="intro">${st.subtitle}</p>${st.content}</div>`;
  document.getElementById('location').textContent = `Station ${idx + 1} of ${stations.length}`;
  document.getElementById('previous').disabled = idx === 0;
  document.getElementById('next').disabled = idx === stations.length - 1;
  document.querySelectorAll('#stations button').forEach((btn, i) => {
    if (i === idx) btn.setAttribute('aria-current', 'step');
    else btn.removeAttribute('aria-current');
  });
  if (window.renderMathInElement) {
    renderMathInElement(main, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false,
      output: 'html'
    });
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('stations');
  stations.forEach((st, i) => {
    const btn = document.createElement('button');
    btn.innerHTML = `<small>Station ${i + 1}</small>${st.title.replace(/^Station \d+:\s*/, '')}`;
    btn.onclick = () => renderStation(i);
    nav.appendChild(btn);
  });
  document.getElementById('previous').onclick = () => { if (currentIdx > 0) renderStation(currentIdx - 1); };
  document.getElementById('next').onclick = () => { if (currentIdx < stations.length - 1) renderStation(currentIdx + 1); };
  renderStation(0);
});
