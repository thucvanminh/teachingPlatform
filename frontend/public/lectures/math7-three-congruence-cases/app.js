/* Synthesis Studio: Three Congruence Cases of Triangles (SSS, SAS, ASA)
   Astronaut Cadet Keithley Lake • Grade 7 Math • 27 Nov 2026 */

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
    title: "Station 1: Master Congruence Matrix",
    subtitle: "Comparing SSS, SAS, ASA & Identifying Invalid Traps",
    content: `
      <div class="diagram-wrap">
        <img src="/images/geometry/math7_rev_three_cases_matrix.svg" alt="Master Matrix of Three Triangle Congruence Cases">
      </div>

      <table class="proof-table">
        <thead>
          <tr>
            <th>Case</th>
            <th>Required Equal Parts</th>
            <th>Key Condition / Trap to Watch</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. SSS</strong></td>
            <td>3 pairs of sides ($AB=A'B', AC=A'C', BC=B'C'$)</td>
            <td>Look for common sides or segment addition ($BE = BD + DE$).</td>
          </tr>
          <tr>
            <td><strong>2. SAS</strong></td>
            <td>2 pairs of sides + <strong>included angle</strong></td>
            <td>Angle MUST sit between the two equal sides. <strong>SSA fails!</strong></td>
          </tr>
          <tr>
            <td><strong>3. ASA</strong></td>
            <td>1 pair of sides + 2 <strong>adjacent angles</strong></td>
            <td>Both angles touch the equal side. If opposite angle given, use $180^\\circ$ sum first.</td>
          </tr>
        </tbody>
      </table>

      <div class="cosmic-card" style="margin-top:1.1rem;">
        <span class="cosmic-badge badge-rose">CRITICAL ALERT · INVALID CRITERIA</span>
        <p style="margin:0.4rem 0 0;"><strong>AAA</strong> (three equal angles, no side) and <strong>SSA</strong> (angle not between the two sides) do <strong>NOT</strong> prove congruence!</p>
      </div>
    `
  },
  {
    title: "Station 2: Vertex Order & Parts",
    subtitle: "Locking Exact Correspondence & Angle Sum Calculations",
    content: `
      <h2>Exact Vertex Alignment</h2>
      <p>Writing $\\triangle ABC = \\triangle DEF$ locks all 6 corresponding measurements in position order ($A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$):</p>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-cyan">RULE 1 · POSITION MATCH</span>
          <p>Given $AB = FE$, $BC = DF$, and $\\widehat{ABC} = \\widehat{DFE}$:</p>
          <p style="margin:0;">Included vertex $B \\leftrightarrow F$, then $A \\leftrightarrow E$, $C \\leftrightarrow D$ $\\implies$ <strong>$\\triangle ABC = \\triangle EFD$ (SAS)</strong>.</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-emerald">RULE 2 · 180° ANGLE SUM</span>
          <p>Whenever two angles of a triangle are known, immediately find the third via $180^\\circ - (\\text{sum})$ to unlock SAS or ASA!</p>
        </div>
      </div>

      <div class="diagram-wrap">
        <img src="/images/geometry/math7_l13_tick_matching_def_ghk.svg" alt="Tick Matching Reflected Triangles">
      </div>
    `
  },
  {
    title: "Station 3: Hidden Clues & Chains",
    subtitle: "From Common Sides & Vertical Angles to Two-Stage Proofs",
    content: `
      <h2>Five Instant Proof Bridges</h2>
      <table class="proof-table">
        <thead>
          <tr>
            <th>Diagram Clue</th>
            <th>Deduction</th>
            <th>Typical Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Shared side ($AC$, $BD$, or $AB$)</td>
            <td>Common side ($AC = AC$)</td>
            <td>SSS, SAS, or ASA</td>
          </tr>
          <tr>
            <td>Intersecting segments at $C$ or $E$</td>
            <td>Vertical opposite angles are equal</td>
            <td>SAS or ASA</td>
          </tr>
          <tr>
            <td>Parallel segments ($AB \\parallel CD$)</td>
            <td>Alternate interior angles are equal</td>
            <td>ASA</td>
          </tr>
          <tr>
            <td>Compass angle bisector arcs</td>
            <td>$OA = OB$, $AM = BM$, $OM$ common</td>
            <td>SSS $\\implies \\widehat{AOM} = \\widehat{BOM}$</td>
          </tr>
          <tr>
            <td>Two-stage proof ($M \\in AB$ or medians)</td>
            <td>Stage 1 congruence unlocks equal side/angle for Stage 2</td>
            <td>ASA $\\to$ SAS or SSS $\\to$ SAS</td>
          </tr>
        </tbody>
      </table>

      <div class="card-grid">
        <div class="cosmic-card">
          <span class="cosmic-badge badge-amber">STAGE 1 + STAGE 2</span>
          <div class="diagram-wrap" style="margin:0.7rem 0 0.4rem;">
            <img src="/images/geometry/math7_l14_luyentapchung_m.svg" alt="Two-Stage ASA then SAS Proof">
          </div>
          <p style="margin:0;">$\\triangle ABC = \\triangle ABD$ (ASA) $\\implies AC = AD \\implies \\triangle AMC = \\triangle AMD$ (SAS).</p>
        </div>
        <div class="cosmic-card">
          <span class="cosmic-badge badge-cyan">COMPASS BISECTOR · SSS</span>
          <div class="diagram-wrap" style="margin:0.7rem 0 0.4rem;">
            <img src="/images/geometry/math7_l13_compass_bisector.svg" alt="Compass Angle Bisector SSS">
          </div>
          <p style="margin:0;">$OA = OB$, $AM = BM$, $OM$ common $\\implies \\triangle OAM = \\triangle OBM$ (SSS).</p>
        </div>
      </div>
    `
  },
  {
    title: "Station 4: Criterion Selector Drills",
    subtitle: "Identify SSS, SAS, ASA, or Not Guaranteed in Seconds",
    content: `
      <h2>Rapid Synthesis Check</h2>

      <div class="quiz-box" id="s1">
        <div class="quiz-question">1. Given $AB = DE$, $BC = EF$, and $AC = DF$. Which criterion proves $\\triangle ABC = \\triangle DEF$?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkSyn('s1','A',true)">A) SSS</button>
          <button class="quiz-btn" onclick="checkSyn('s1','B',false)">B) SAS</button>
          <button class="quiz-btn" onclick="checkSyn('s1','C',false)">C) ASA</button>
          <button class="quiz-btn" onclick="checkSyn('s1','D',false)">D) Not guaranteed</button>
        </div>
        <div class="quiz-feedback" id="s1-fb"></div>
      </div>

      <div class="quiz-box" id="s2">
        <div class="quiz-question">2. Given $AB = DE$, $BC = EF$, and $\\widehat{A} = \\widehat{D}$. Does this prove $\\triangle ABC = \\triangle DEF$?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkSyn('s2','A',false)">A) Yes, by SAS</button>
          <button class="quiz-btn" onclick="checkSyn('s2','B',false)">B) Yes, by ASA</button>
          <button class="quiz-btn" onclick="checkSyn('s2','C',false)">C) Yes, by SSS</button>
          <button class="quiz-btn" onclick="checkSyn('s2','D',true)">D) Not guaranteed (angle is not included!)</button>
        </div>
        <div class="quiz-feedback" id="s2-fb"></div>
      </div>

      <div class="quiz-box" id="s3">
        <div class="quiz-question">3. Given $\\widehat{B} = \\widehat{E}$, $BC = EF$, and $\\widehat{C} = \\widehat{F}$. Which criterion proves $\\triangle ABC = \\triangle DEF$?</div>
        <div class="quiz-options">
          <button class="quiz-btn" onclick="checkSyn('s3','A',false)">A) SSS</button>
          <button class="quiz-btn" onclick="checkSyn('s3','B',false)">B) SAS</button>
          <button class="quiz-btn" onclick="checkSyn('s3','C',true)">C) ASA</button>
          <button class="quiz-btn" onclick="checkSyn('s3','D',false)">D) Not guaranteed</button>
        </div>
        <div class="quiz-feedback" id="s3-fb"></div>
      </div>
    `
  }
];

const explanations = {
  s1: "Three pairs of corresponding sides are equal -> SSS.",
  s2: "Angle A is NOT included between AB and BC (the included angle is B) -> SSA fails!",
  s3: "Side BC sits directly between adjacent angles B and C -> ASA."
};

window.checkSyn = function(qId, opt, isCorrect) {
  const box = document.getElementById(qId);
  const fb = document.getElementById(`${qId}-fb`);
  box.querySelectorAll('.quiz-btn').forEach(b => b.classList.remove('correct', 'wrong'));
  const buttons = box.querySelectorAll('.quiz-btn');
  const idx = ['A', 'B', 'C', 'D'].indexOf(opt);
  if (idx >= 0) buttons[idx].classList.add(isCorrect ? 'correct' : 'wrong');
  if (isCorrect) {
    playSound('chime');
    fb.style.color = '#34d399';
    fb.textContent = `✓ Correct! ${explanations[qId]}`;
  } else {
    playSound('buzzer');
    fb.style.color = '#fb7185';
    fb.textContent = '✗ Check whether all 3 sides, an included angle, or 2 adjacent angles match.';
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
