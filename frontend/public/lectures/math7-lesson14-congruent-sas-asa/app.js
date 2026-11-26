/* Lesson 14: Second & Third Congruence Cases of Triangles (SAS & ASA)
   Astronaut Cadet Keithley Lake • Grade 7 Math • 26 Nov 2026 */

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
    title: "Station 1: Side-Angle-Side (SAS)",
    subtitle: "Second Congruence Case & Included Angle Rule",
    content: `
      <div class="cosmic-card" style="margin-bottom: 1.25rem;">
        <span class="cosmic-badge badge-cyan">THEOREM 2 · SAS</span>
        <h3>Side-Angle-Side (SAS) Congruence</h3>
        <p>If <strong>two sides</strong> and the <strong>included angle</strong> of one triangle equal two sides and the included angle of another triangle, the two triangles are <strong>congruent</strong>.</p>
        <p style="color:#38bdf8; text-align:center; font-weight:700; margin:0.6rem 0;">
          $$\\begin{cases} AB = A'B' \\\\ \\widehat{A} = \\widehat{A'} \\text{ (included)} \\\\ AC = A'C' \\end{cases} \\implies \\triangle ABC = \\triangle A'B'C' \\text{ (SAS)}$$
        </p>
      </div>

      <div class="diagram-wrap">
        <img src="/images/geometry/math7_l14_sas_theorem.svg" alt="SAS Congruence Theorem">
      </div>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-emerald">KEY TERM</span>
          <h3>Included Angle</h3>
          <p>In $\\triangle ABC$, $\\widehat{BAC}$ sits directly <strong>between</strong> sides $AB$ and $AC$ (vertex $A$ is shared by both sides).</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-rose">CRITICAL TRAP · NO SSA!</span>
          <h3>Non-Included Angle Fails</h3>
          <p>If the equal angle is NOT between the two equal sides ($\\triangle FED$, $\\triangle MNP$ below), SAS does <strong>NOT</strong> apply.</p>
        </div>
      </div>

      <div class="diagram-wrap">
        <img src="/images/geometry/math7_l14_sas_vs_ssa_trap.svg" alt="SAS vs Non-Included Angle Check">
      </div>
    `
  },
  {
    title: "Station 2: Angle-Side-Angle (ASA)",
    subtitle: "Third Congruence Case & Adjacent Angles Rule",
    content: `
      <div class="cosmic-card" style="margin-bottom: 1.25rem;">
        <span class="cosmic-badge badge-emerald">THEOREM 3 · ASA</span>
        <h3>Angle-Side-Angle (ASA) Congruence</h3>
        <p>If <strong>one side</strong> and the <strong>two angles adjacent to it</strong> of one triangle equal one side and the two adjacent angles of another triangle, the two triangles are <strong>congruent</strong>.</p>
        <p style="color:#34d399; text-align:center; font-weight:700; margin:0.6rem 0;">
          $$\\begin{cases} \\widehat{B} = \\widehat{B'} \\\\ BC = B'C' \\text{ (between } B, C\\text{)} \\\\ \\widehat{C} = \\widehat{C'} \\end{cases} \\implies \\triangle ABC = \\triangle A'B'C' \\text{ (ASA)}$$
        </p>
      </div>

      <div class="diagram-wrap">
        <img src="/images/geometry/math7_l14_asa_theorem.svg" alt="ASA Congruence Theorem">
      </div>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-cyan">KEY TERM</span>
          <h3>Adjacent Angles to a Side</h3>
          <p>For side $BC$, the two adjacent angles are at its two endpoints: $\\widehat{B}$ and $\\widehat{C}$.</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-amber">180° ANGLE SUM COROLLARY</span>
          <h3>Opposite Angle? Compute the 3rd!</h3>
          <p>If you know 1 side, 1 adjacent angle, and 1 opposite angle, find the 3rd angle via $180^\\circ - (\\text{sum})$ first, then apply ASA!</p>
        </div>
      </div>

      <div class="diagram-wrap">
        <img src="/images/geometry/math7_l14_asa_four_triangles.svg" alt="ASA Four Triangles Comparison">
      </div>
    `
  },
  {
    title: "Station 3: Hidden Proof Clues",
    subtitle: "5 Instant Bridges Used in Every SAS & ASA Proof",
    content: `
      <h2>5 Hidden Clues Checklist</h2>
      <table class="proof-table">
        <thead>
          <tr>
            <th>Clue in Diagram</th>
            <th>What You Write in Proof</th>
            <th>Leads To</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Shared segment ($AC$ or $BD$)</td>
            <td>"$AC$ is a common side"</td>
            <td>SAS or ASA</td>
          </tr>
          <tr>
            <td>Two lines cross at $C$ or $E$</td>
            <td>"$\\widehat{BCA} = \\widehat{ECD}$ (vertical opposite angles)"</td>
            <td>SAS or ASA</td>
          </tr>
          <tr>
            <td>Parallel lines $AB \\parallel CD$</td>
            <td>"Alternate interior angles are equal"</td>
            <td>ASA (or SAS)</td>
          </tr>
          <tr>
            <td>Collinear points $A, B, C, D$</td>
            <td>"$AC = AB + BC = CD + BC = DB$"</td>
            <td>SAS</td>
          </tr>
          <tr>
            <td>Two angles known, 3rd needed</td>
            <td>"Angle Sum $= 180^\\circ$"</td>
            <td>Included / Adjacent angle</td>
          </tr>
        </tbody>
      </table>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-amber">SAS EXAMPLE · COMMON SIDE</span>
          <div class="diagram-wrap" style="margin:0.75rem 0 0.5rem;">
            <img src="/images/geometry/math7_l14_kite_sas.svg" alt="Kite SAS Example">
          </div>
          <p style="margin:0;">$AB = AD$, $\\widehat{BAC} = \\widehat{DAC}$, $AC$ common $\\implies \\triangle ABC = \\triangle ADC$ (SAS).</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-cyan">ASA EXAMPLE · VERTICAL ANGLES</span>
          <div class="diagram-wrap" style="margin:0.75rem 0 0.5rem;">
            <img src="/images/geometry/math7_l14_bowtie_asa.svg" alt="Bowtie ASA Example">
          </div>
          <p style="margin:0;">$\\widehat{A} = \\widehat{D}$, $AC = DC$, $\\widehat{BCA} = \\widehat{ECD}$ $\\implies \\triangle ABC = \\triangle DEC$ (ASA).</p>
        </div>
      </div>
    `
  },
  {
    title: "Station 4: Quick Telemetry Drills",
    subtitle: "Verify Your SAS & ASA Reflexes in 60 Seconds",
    content: `
      <h2>Pre-Flight Quick Checks</h2>

      <div class="quiz-box" id="q1">
        <div class="quiz-question">1. Which condition proves $\\triangle ABC = \\triangle DEF$ by <strong>SAS</strong>?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkQ('q1','A',false)">A) $AB = DE$, $BC = EF$, $\\widehat{A} = \\widehat{D}$</button>
          <button class="quiz-btn" onclick="checkQ('q1','B',true)">B) $AB = DE$, $AC = DF$, $\\widehat{A} = \\widehat{D}$</button>
          <button class="quiz-btn" onclick="checkQ('q1','C',false)">C) $BC = EF$, $AC = DF$, $\\widehat{B} = \\widehat{E}$</button>
          <button class="quiz-btn" onclick="checkQ('q1','D',false)">D) $\\widehat{A} = \\widehat{D}$, $\\widehat{B} = \\widehat{E}$, $\\widehat{C} = \\widehat{F}$</button>
        </div>
        <div class="quiz-feedback" id="q1-fb"></div>
      </div>

      <div class="quiz-box" id="q2">
        <div class="quiz-question">2. Given $\\widehat{B} = \\widehat{E}$, $\\widehat{C} = \\widehat{F}$, and which side proves $\\triangle ABC = \\triangle DEF$ by <strong>ASA</strong>?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkQ('q2','A',false)">A) $AB = DE$</button>
          <button class="quiz-btn" onclick="checkQ('q2','B',false)">B) $AC = DF$</button>
          <button class="quiz-btn" onclick="checkQ('q2','C',true)">C) $BC = EF$</button>
          <button class="quiz-btn" onclick="checkQ('q2','D',false)">D) $AB = EF$</button>
        </div>
        <div class="quiz-feedback" id="q2-fb"></div>
      </div>

      <div class="quiz-box" id="q3">
        <div class="quiz-question">3. Given $AB = FE$, $BC = DF$, and $\\widehat{ABC} = \\widehat{DFE}$. Which congruence statement is accurate?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkQ('q3','A',false)">A) $\\triangle ABC = \\triangle DFE$</button>
          <button class="quiz-btn" onclick="checkQ('q3','B',false)">B) $\\triangle ABC = \\triangle EDF$</button>
          <button class="quiz-btn" onclick="checkQ('q3','C',false)">C) $\\triangle ABC = \\triangle FED$</button>
          <button class="quiz-btn" onclick="checkQ('q3','D',true)">D) $\\triangle ABC = \\triangle EFD$</button>
        </div>
        <div class="quiz-feedback" id="q3-fb"></div>
      </div>
    `
  }
];

const explanations = {
  q1: "Angle A is the included angle between AB and AC, and angle D is the included angle between DE and DF.",
  q2: "Side BC connects vertices B and C, so angles B and C are adjacent to BC (matching EF with E and F).",
  q3: "Vertex B matches F (included angle), side BA = FE puts A with E, and side BC = FD puts C with D -> triangle ABC = triangle EFD."
};

window.checkQ = function(qId, opt, isCorrect) {
  const box = document.getElementById(qId);
  const fb = document.getElementById(`${qId}-fb`);
  box.querySelectorAll('.quiz-btn').forEach(b => b.classList.remove('correct', 'wrong'));
  const buttons = box.querySelectorAll('.quiz-btn');
  const idx = ['A', 'B', 'C', 'D'].indexOf(opt);
  if (idx >= 0) buttons[idx].classList.add(isCorrect ? 'correct' : 'wrong');

  if (isCorrect) {
    playSound('chime');
    fb.style.color = '#34d399';
    fb.textContent = `✓ Spot on! ${explanations[qId]}`;
  } else {
    playSound('buzzer');
    fb.style.color = '#fb7185';
    fb.textContent = '✗ Check the included angle or adjacent side alignment and try again.';
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
