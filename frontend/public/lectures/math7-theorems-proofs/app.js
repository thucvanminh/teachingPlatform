/* Lesson 11: Theorems & Formal Geometric Proofs
   Interactive Flight Lab Studio • Cadet Keithley Lake • Grade 7 Math
   14 Nov 2026 */

// Web Audio API Sound Synthesizer (Chime & Buzzer)
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {
    // Audio context may be restricted before user interaction
  }
}

function playAlert() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(160, now + 0.2);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch (e) {}
}

const titles = [
  "Protocol 01: Anatomy of a Theorem",
  "Protocol 02: 3-Step Deductive Engine",
  "Protocol 03: Vertical Angles Proof",
  "Protocol 04: Perpendicular Transversal",
  "Protocol 05: Theorem Master Checkpoint"
];

const stationsNav = document.querySelector("#stations");
const lesson = document.querySelector("#lesson");
const prevBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");
const locationSpan = document.querySelector("#location");

let currentStation = 0;

// Theorem Decomposition Samples for Station 1
const theoremSamples = [
  {
    name: "Vertical Angles Theorem",
    full: "If two angles are vertically opposite, then they are equal in measure.",
    hypo: "Two angles are vertically opposite (\\(\\widehat{xOy}\\) and \\(\\widehat{x'Oy'}\\))",
    conc: "They have equal measure (\\(\\widehat{xOy} = \\widehat{x'Oy'}\\))"
  },
  {
    name: "Perpendicular Transversal Theorem",
    full: "If a line is perpendicular to one of two parallel lines, then it is also perpendicular to the other line.",
    hypo: "Lines \\(a \\parallel b\\) and line \\(c \\perp a\\)",
    conc: "Line \\(c \\perp b\\)"
  },
  {
    name: "Alternate Interior Angles Property",
    full: "If two parallel lines are cut by a transversal, then alternate interior angles are equal.",
    hypo: "Two parallel lines \\(a \\parallel b\\) cut by transversal \\(c\\)",
    conc: "Alternate interior angles are equal (\\(\\widehat{A_3} = \\widehat{B_1}\\))"
  }
];
let activeSampleIdx = 0;

// Dynamic angle simulator state for Station 3
let simAngle = 55;

function createDynamicVerticalAngleRadar(angle) {
  const rad = (angle * Math.PI) / 180;
  const oppAngle = angle;
  const suppAngle = 180 - angle;

  // Center (115, 140)
  const cx = 115, cy = 140;
  const len = 90;

  // Line 1: angled at (angle/2)
  const x1 = cx - len * Math.cos(rad / 2);
  const y1 = cy + len * Math.sin(rad / 2);
  const x2 = cx + len * Math.cos(rad / 2);
  const y2 = cy - len * Math.sin(rad / 2);

  // Line 2: angled at -(angle/2)
  const x3 = cx - len * Math.cos(rad / 2);
  const y3 = cy - len * Math.sin(rad / 2);
  const x4 = cx + len * Math.cos(rad / 2);
  const y4 = cy + len * Math.sin(rad / 2);

  return `
    <svg viewBox="0 0 230 280" width="100%" height="240" style="background:#080D1A; border-radius:12px; border:1px solid #1E293B;">
      <!-- Center node -->
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
      <text x="${x2 + 5}" y="${y2}" fill="#38BDF8" font-family="system-ui" font-size="12" font-weight="bold">y</text>
      <text x="${x1 - 12}" y="${y1 + 10}" fill="#38BDF8" font-family="system-ui" font-size="12" font-weight="bold">x</text>

      <line x1="${x3}" y1="${y3}" x2="${x4}" y2="${y4}" stroke="#F43F5E" stroke-width="3" stroke-linecap="round"/>
      <text x="${x3 - 14}" y="${y3 - 2}" fill="#F43F5E" font-family="system-ui" font-size="12" font-weight="bold">x'</text>
      <text x="${x4 + 5}" y="${y4 + 10}" fill="#F43F5E" font-family="system-ui" font-size="12" font-weight="bold">y'</text>

      <circle cx="${cx}" cy="${cy}" r="5" fill="#FACC15"/>
      <text x="${cx}" y="${cy + 18}" fill="#FACC15" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="middle">O</text>

      <!-- Angle Badges -->
      <rect x="140" y="115" width="80" height="22" rx="4" fill="#032541" stroke="#38BDF8" stroke-width="1"/>
      <text x="180" y="130" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">∠xOy = ${angle}°</text>

      <rect x="10" y="145" width="85" height="22" rx="4" fill="#032541" stroke="#38BDF8" stroke-width="1"/>
      <text x="52" y="160" fill="#38BDF8" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">∠x'Oy' = ${oppAngle}°</text>

      <rect x="70" y="210" width="90" height="22" rx="4" fill="#381D05" stroke="#F59E0B" stroke-width="1"/>
      <text x="115" y="225" fill="#F59E0B" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">Bridge = ${suppAngle}°</text>

      <text x="115" y="260" fill="#A7F3D0" font-family="system-ui" font-size="11" font-weight="bold" text-anchor="middle">Verification: ${angle}° ≡ ${oppAngle}° (Q.E.D.)</text>
    </svg>
  `;
}

// Mini Quiz Data for Station 5
const quizQuestions = [
  {
    q: "In the theorem: 'If two distinct lines are perpendicular to a third line, they are parallel to each other', what is the Hypothesis (Given / GT)?",
    options: [
      "The lines are parallel to each other",
      "Two distinct lines are perpendicular to a third line",
      "All lines intersect at right angles",
      "No lines exist in the plane"
    ],
    ans: 1,
    exp: "The Hypothesis is the condition introduced by the 'IF' clause: 'Two distinct lines are perpendicular to a third line'."
  },
  {
    q: "What does the formal mathematical Latin acronym 'Q.E.D.' stand for, and where is it placed in a proof?",
    options: [
      "Quasi Elementum Datum — placed at the top of the Hypothesis",
      "Quod Erat Demonstrandum ('which was to be demonstrated') — placed at the very end of the proof",
      "Quantum Energy Device — placed in physics equations",
      "Quick Evidence Deduction — placed inside parentheses"
    ],
    ans: 1,
    exp: "Q.E.D. stands for 'quod erat demonstrandum' (which was to be demonstrated), placed at the conclusion of a completed formal proof."
  },
  {
    q: "Why must every single step in a geometric proof state a mathematical justification in parentheses?",
    options: [
      "It is only an optional cosmetic convention",
      "Because assumptions without justification render the logical deduction chain invalid",
      "To make the proof longer for extra points",
      "Only steps involving numbers need justification"
    ],
    ans: 1,
    exp: "In Euclidean deductive logic, every claim must be anchored to a known axiom, definition, or previously established theorem."
  },
  {
    q: "In the Perpendicular Transversal proof, why does \\(\\widehat{B_1} = \\widehat{A_1}\\) when transversal line \\(c\\) cuts lines \\(a \\parallel b\\)?",
    options: [
      "They are vertically opposite angles",
      "They form a linear pair summing to 180°",
      "They are alternate interior angles along parallel lines",
      "They are adjacent complementary angles"
    ],
    ans: 2,
    exp: "Because lines a ∥ b, transversal line c forms equal alternate interior angles: ∠B₁ = ∠A₁."
  }
];

let quizAnswers = new Map();

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

// 5 Interactive Station Templates
const stations = [
  // Station 1: Protocol 01
  () => `
    <div class="panel">
      <h2>🛰️ Protocol 01: Anatomy of a Theorem</h2>
      <p class="intro">A <strong>Theorem</strong> is a mathematical truth established by rigorous logical deduction from known facts. It is the cornerstone of formal geometry.</p>

      <div class="formula formula-highlight">
        \\[\\text{Universal Architecture: } \\mathbf{IF} \\text{ [Hypothesis]} \\implies \\mathbf{THEN} \\text{ [Conclusion]}\\]
      </div>

      <div class="grid">
        <section>
          <h3>Interactive Theorem Deconstructor</h3>
          <p style="font-size:13.5px; color:var(--text-muted);">Select a theorem below to examine its anatomical split into Hypothesis (Given) vs. Conclusion (Prove):</p>
          
          <div class="selector-pill-group">
            ${theoremSamples.map((s, idx) => `
              <div class="selector-pill ${idx === activeSampleIdx ? 'active' : ''}" data-sample="${idx}">
                <strong>${s.name}</strong><br>
                <span style="font-size:12px; color:var(--text-muted);">${s.full}</span>
              </div>
            `).join("")}
          </div>

          <div class="decomposition-matrix">
            <div class="matrix-card matrix-hypo">
              <h4>🟢 HYPOTHESIS · GIVEN (GT)</h4>
              <p>${theoremSamples[activeSampleIdx].hypo}</p>
              <small style="color:#67E8F9; font-size:11px;">Conditions assumed to be true at departure.</small>
            </div>
            <div class="matrix-card matrix-conc">
              <h4>🔵 CONCLUSION · PROVE (KL)</h4>
              <p>${theoremSamples[activeSampleIdx].conc}</p>
              <small style="color:#6EE7B7; font-size:11px;">Target destination truth derived by deduction.</small>
            </div>
          </div>
        </section>

        <section>
          <h3>Theorem Architectural Blueprint</h3>
          <div class="diagram-wrap">
            <img src="/images/geometry/math7_l11_theorem_anatomy.svg" alt="Theorem Blueprint" />
          </div>
          <div class="callout callout-cyan">
            <strong>Cadet Golden Rule 1:</strong> A theorem <em>always</em> separates what you start with (Hypothesis) from what you must establish (Conclusion). Never confuse the two!
          </div>
        </section>
      </div>
    </div>
  `,

  // Station 2: Protocol 02
  () => `
    <div class="panel">
      <h2>⚡ Protocol 02: The 3-Step Deductive Proof Engine</h2>
      <p class="intro">In deep space navigation as in Euclidean geometry, proving a statement requires an unbroken chain of logic. Every deduction must be anchored to verified laws.</p>

      <div class="grid">
        <section>
          <h3>The 3-Step Deductive Pipeline</h3>
          <div class="step-pipeline">
            <div class="proof-step-card active">
              <div class="proof-step-header">
                <span class="step-badge" style="background:#0F2942; color:#38BDF8;">STEP 1: STATE THE GIVEN</span>
                <span style="font-size:12px; color:#38BDF8;">Hypothesis</span>
              </div>
              <div class="step-details">
                <p>Record initial known conditions strictly from the <strong>Given (GT)</strong>. State known angle measurements, parallelism (\\(a \\parallel b\\)), or perpendicularity (\\(c \\perp a\\)).</p>
              </div>
            </div>

            <div class="proof-step-card active">
              <div class="proof-step-header">
                <span class="step-badge" style="background:#2A1B4E; color:#C084FC;">STEP 2: BUILD THE BRIDGE</span>
                <span style="font-size:12px; color:#C084FC;">Justification Chain</span>
              </div>
              <div class="step-details">
                <p>Deploy established axioms, definitions, and theorems. <strong>Mandatory Rule:</strong> Every statement must cite its reason in parentheses: <em>(Linear pair)</em>, <em>(Alternate interior angles)</em>.</p>
              </div>
            </div>

            <div class="proof-step-card active">
              <div class="proof-step-header">
                <span class="step-badge" style="background:#0D382B; color:#34D399;">STEP 3: REACH CONCLUSION</span>
                <span style="font-size:12px; color:#34D399;">Q.E.D. Landmark</span>
              </div>
              <div class="step-details">
                <p>Conclude with \\(\\therefore\\) (<em>therefore</em>) connecting the derived fact to the <strong>Target Truth</strong>, sealed by <strong>Q.E.D.</strong> (<em>quod erat demonstrandum</em>).</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3>Permissible Deduction Tools</h3>
          <div class="callout callout-emerald">
            <strong>The 4 Foundational Tools of Proof:</strong>
            <ul style="margin: 8px 0 0; padding-left: 20px; font-size: 13.5px;">
              <li><strong>Definitions:</strong> What a term means (e.g., perpendicular means forming a \\(90^\\circ\\) angle).</li>
              <li><strong>Axioms:</strong> Self-evident bedrock truths accepted without proof (e.g., Euclid's Parallel Postulate).</li>
              <li><strong>Proven Theorems:</strong> Results already established previously (e.g., Vertical Angles Theorem).</li>
              <li><strong>Algebraic Properties:</strong> Transitivity (if \\(A = B\\) and \\(B = C\\) then \\(A = C\\)), substitution.</li>
            </ul>
          </div>
          <div class="callout">
            <strong>Cadet Golden Rule 2:</strong> Never assume what you need to prove! Always start from the facts in the Given.
          </div>
        </section>
      </div>
    </div>
  `,

  // Station 3: Protocol 03
  () => `
    <div class="panel">
      <h2>📐 Protocol 03: Classic Model 1 — Vertical Angles Theorem</h2>
      <p class="intro">Witness the deductive engine in action: proving that two vertically opposite angles are strictly equal in measure.</p>

      <div class="grid">
        <section>
          <div class="callout callout-cyan">
            <strong>Theorem:</strong> Two vertically opposite angles are equal: \\(\\widehat{xOy} = \\widehat{x'Oy'}\\).
          </div>

          <div style="background:#0A1628; border:1px solid #1E293B; border-radius:12px; padding:14px; margin: 14px 0;">
            <h4 style="margin:0 0 6px; color:#38BDF8; font-size:12px; text-transform:uppercase;">Statement Matrix (GT / KL)</h4>
            <table style="width:100%; border-collapse:collapse; font-size:13px;">
              <tr>
                <td style="padding:6px; border:1px solid #1E2E48; color:#67E8F9; font-weight:bold; width:25%;">Given (GT)</td>
                <td style="padding:6px; border:1px solid #1E2E48;">\\(\\widehat{xOy}\\) and \\(\\widehat{x'Oy'}\\) are vertically opposite angles</td>
              </tr>
              <tr>
                <td style="padding:6px; border:1px solid #1E2E48; color:#6EE7B7; font-weight:bold;">Prove (KL)</td>
                <td style="padding:6px; border:1px solid #1E2E48;">\\(\\widehat{xOy} = \\widehat{x'Oy'}\\)</td>
              </tr>
            </table>
          </div>

          <h3>The 2-Step Formal Execution</h3>
          <div class="formula" style="text-align:left; font-size:13.5px; line-height:1.7;">
            <strong>Step 1:</strong> Ray \\(Ox\\) and line \\(x'y'\\) form a linear pair:<br>
            \\[\\widehat{xOy} + \\widehat{xOy'} = 180^\\circ \\implies \\widehat{xOy} = 180^\\circ - \\widehat{xOy'} \\quad (1)\\]<br>
            <strong>Step 2:</strong> Ray \\(Oy'\\) and line \\(xy\\) form a linear pair:<br>
            \\[\\widehat{x'Oy'} + \\widehat{xOy'} = 180^\\circ \\implies \\widehat{x'Oy'} = 180^\\circ - \\widehat{xOy'} \\quad (2)\\]<br>
            <strong>Conclusion:</strong> Comparing (1) and (2):<br>
            \\[\\therefore \\widehat{xOy} = \\widehat{x'Oy'} \\quad (\\text{Q.E.D.})\\]
          </div>
        </section>

        <section>
          <h3>Dynamic Vertical Angle Radar Simulator</h3>
          <div class="angle-slider-wrap">
            <label for="angleInput">
              <span>Adjust Angle \\(\\widehat{xOy}\\):</span>
              <span id="angleValueLabel" style="color:#FACC15;">${simAngle}°</span>
            </label>
            <input type="range" id="angleInput" min="30" max="150" value="${simAngle}" step="1">
            <div id="simContainer" style="margin-top:12px;">
              ${createDynamicVerticalAngleRadar(simAngle)}
            </div>
          </div>
          <p style="font-size:12.5px; color:var(--text-muted); text-align:center;">Drag the slider to observe how the bridge angle maintains perfect equality between opposite angles across all orientations!</p>
        </section>
      </div>
    </div>
  `,

  // Station 4: Protocol 04
  () => `
    <div class="panel">
      <h2>🚀 Protocol 04: Classic Model 2 — Perpendicular Transversal Theorem</h2>
      <p class="intro">Explore how parallel line properties are leveraged to prove perpendicularity relationships across orbital corridors.</p>

      <div class="grid">
        <section>
          <div class="callout callout-emerald">
            <strong>Theorem:</strong> If a line is perpendicular to one of two parallel lines, it is also perpendicular to the other line:
            \\[a \\parallel b \\text{ and } c \\perp a \\implies c \\perp b\\]
          </div>

          <div style="background:#0A1628; border:1px solid #1E293B; border-radius:12px; padding:14px; margin: 14px 0;">
            <h4 style="margin:0 0 6px; color:#34D399; font-size:12px; text-transform:uppercase;">Statement Matrix (GT / KL)</h4>
            <table style="width:100%; border-collapse:collapse; font-size:13px;">
              <tr>
                <td style="padding:6px; border:1px solid #1E2E48; color:#67E8F9; font-weight:bold; width:25%;">Given (GT)</td>
                <td style="padding:6px; border:1px solid #1E2E48;">\\(a \\parallel b\\) and \\(c \\perp a\\) at node \\(A\\) (so \\(\\widehat{A_1} = 90^\\circ\\))</td>
              </tr>
              <tr>
                <td style="padding:6px; border:1px solid #1E2E48; color:#6EE7B7; font-weight:bold;">Prove (KL)</td>
                <td style="padding:6px; border:1px solid #1E2E48;">\\(c \\perp b\\) at node \\(B\\) (so \\(\\widehat{B_1} = 90^\\circ\\))</td>
              </tr>
            </table>
          </div>

          <h3>The 2-Step Formal Execution</h3>
          <div class="formula" style="text-align:left; font-size:13.5px; line-height:1.7;">
            <strong>Step 1:</strong> Because corridor lines \\(a \\parallel b\\) are cut by transversal \\(c\\):<br>
            \\[\\widehat{B_1} = \\widehat{A_1} \\quad (\\text{Alternate interior angles})\\]<br>
            <strong>Step 2:</strong> By hypothesis, line \\(c \\perp a\\), which means \\(\\widehat{A_1} = 90^\\circ\\):<br>
            \\[\\widehat{B_1} = 90^\\circ \\implies c \\perp b \\quad (\\text{Q.E.D.})\\]
          </div>
        </section>

        <section>
          <h3>Orbital Proof Blueprint</h3>
          <div class="diagram-wrap">
            <img src="/images/geometry/math7_l11_perpendicular_transversal_proof.svg" alt="Perpendicular Transversal Proof" />
          </div>
          <div class="callout callout-cyan">
            <strong>Cadet Golden Rule 3:</strong> Notice the reason in Step 1: <em>"Alternate interior angles"</em>. If this justification is omitted, the proof loses its mathematical validity!
          </div>
        </section>
      </div>
    </div>
  `,

  // Station 5: Checkpoint Quiz
  () => {
    let answeredCount = 0;
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers.has(idx)) {
        answeredCount++;
        if (quizAnswers.get(idx) === q.ans) correctCount++;
      }
    });

    return `
      <div class="panel">
        <h2>🎯 Protocol 05: Theorem Master Checkpoint</h2>
        <p class="intro">Verify your deductive mastery, Cadet Keithley! Solve the 4 checkpoint challenges below to unlock your mission badge.</p>

        <div style="display:flex; justify-content:space-between; align-items:center; background:#0B1626; border:1px solid #1E2E48; border-radius:12px; padding:12px 18px; margin-bottom:18px;">
          <span style="font-size:13px; font-weight:bold; color:#38BDF8;">Checkpoint Progress: ${answeredCount} / ${quizQuestions.length} Answered</span>
          <span style="font-size:13px; font-weight:bold; color:${correctCount === quizQuestions.length ? '#34D399' : '#F59E0B'};">
            Score: ${correctCount} / ${quizQuestions.length} Correct
          </span>
        </div>

        ${quizQuestions.map((item, qIdx) => {
          const userAns = quizAnswers.get(qIdx);
          const hasAnswered = userAns !== undefined;
          const isCorrect = userAns === item.ans;

          return `
            <div class="quiz-question-box">
              <p style="font-weight:700; font-size:14.5px; color:#F8FAFC;">
                <span style="color:#38BDF8;">Question ${qIdx + 1}:</span> ${item.q}
              </p>
              <div>
                ${item.options.map((opt, optIdx) => {
                  let btnClass = "quiz-option-btn";
                  if (hasAnswered) {
                    if (optIdx === item.ans) btnClass += " correct";
                    else if (optIdx === userAns) btnClass += " wrong";
                  }

                  return `
                    <button type="button" class="${btnClass}" data-q="${qIdx}" data-opt="${optIdx}" ${hasAnswered ? 'disabled' : ''}>
                      <strong>${String.fromCharCode(65 + optIdx)}.</strong> ${opt}
                    </button>
                  `;
                }).join("")}
              </div>
              <div class="quiz-feedback" style="display:${hasAnswered ? 'block' : 'none'}; background:${isCorrect ? '#063A29' : '#3A0614'}; border:1px solid ${isCorrect ? '#10B981' : '#F43F5E'}; color:#F8FAFC;">
                <strong>${isCorrect ? '✓ Correct Deduction!' : '✗ Correction Required:'}</strong> ${item.exp}
              </div>
            </div>
          `;
        }).join("")}

        ${correctCount === quizQuestions.length ? `
          <div style="background:#064E3B; border:2px solid #10B981; border-radius:14px; padding:16px; text-align:center; margin-top:18px;">
            <h3 style="color:#6EE7B7; margin:0 0 6px;">🎖️ DEDUCTIVE MASTER BADGE UNLOCKED!</h3>
            <p style="margin:0; font-size:14px; color:#E2E8F0;">Excellent work, Cadet Keithley Lake! You have mastered Theorem Architecture and the 3-Step Deductive Engine. Proceed to your mission practice!</p>
          </div>
        ` : ''}
      </div>
    `;
  }
];

function renderNav() {
  stationsNav.innerHTML = titles.map((title, idx) => `
    <button type="button" data-index="${idx}" ${idx === currentStation ? 'aria-current="step"' : ''}>
      <small>Protocol 0${idx + 1}</small>
      ${title.split(": ")[1] || title}
    </button>
  `).join("");

  stationsNav.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index, 10);
      setStation(idx);
    });
  });
}

function attachInteractiveListeners() {
  // Station 1: Decomposer sample selector
  const pills = lesson.querySelectorAll(".selector-pill");
  pills.forEach(p => {
    p.addEventListener("click", () => {
      activeSampleIdx = parseInt(p.dataset.sample, 10);
      playChime();
      setStation(0);
    });
  });

  // Station 3: Angle slider
  const angleSlider = lesson.querySelector("#angleInput");
  if (angleSlider) {
    angleSlider.addEventListener("input", (e) => {
      simAngle = parseInt(e.target.value, 10);
      const valLabel = lesson.querySelector("#angleValueLabel");
      if (valLabel) valLabel.textContent = `${simAngle}°`;
      const simCont = lesson.querySelector("#simContainer");
      if (simCont) simCont.innerHTML = createDynamicVerticalAngleRadar(simAngle);
    });
  }

  // Station 5: Quiz option buttons
  const quizBtns = lesson.querySelectorAll(".quiz-option-btn");
  quizBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const qIdx = parseInt(btn.dataset.q, 10);
      const optIdx = parseInt(btn.dataset.opt, 10);
      quizAnswers.set(qIdx, optIdx);

      if (optIdx === quizQuestions[qIdx].ans) {
        playChime();
      } else {
        playAlert();
      }

      setStation(4); // Re-render quiz
    });
  });
}

function setStation(idx) {
  if (idx < 0 || idx >= stations.length) return;
  currentStation = idx;

  lesson.innerHTML = stations[currentStation]();

  locationSpan.textContent = `Station ${currentStation + 1} of ${stations.length} · ${titles[currentStation]}`;
  prevBtn.disabled = currentStation === 0;
  nextBtn.disabled = currentStation === stations.length - 1;

  renderNav();
  attachInteractiveListeners();
  renderMath();
}

prevBtn.addEventListener("click", () => {
  setStation(currentStation - 1);
});

nextBtn.addEventListener("click", () => {
  setStation(currentStation + 1);
});

// Arrow key navigation
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") setStation(currentStation - 1);
  if (e.key === "ArrowRight") setStation(currentStation + 1);
});

// Boot to Station 1
setStation(0);
