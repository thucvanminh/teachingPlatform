/**
 * ORBITAL CHEMISTRY LAB - LESSON 26: ETHYLIC ALCOHOL
 * Interactive Simulation Engine & Web Audio Synthesizer
 */

// ==========================================
// 1. WEB AUDIO API SYNTHESIZER
// ==========================================
class SpaceSoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Harmonic bell chime (C6 - G6)
    [1046.5, 1567.98].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.18, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.45);
    });
  }

  playBuzzer() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playIgnition() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Swoosh ignition burst
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(360, now + 0.35);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  playBubbling() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Water/H2 pop sounds
    for (let i = 0; i < 5; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400 + Math.random() * 400, now + i * 0.09);
      gain.gain.setValueAtTime(0.1, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.08);
    }
  }
}

const soundFX = new SpaceSoundFX();

// ==========================================
// 2. STARFIELD BACKGROUND ENGINE
// ==========================================
function initStarfield() {
  const canvas = document.getElementById('starfieldCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = Array.from({ length: 90 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.4,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    alpha: Math.random() * 0.7 + 0.3,
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';

    for (const star of stars) {
      star.x += star.vx;
      star.y += star.vy;
      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;

      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================
// 3. SECTOR NAVIGATION
// ==========================================
function initNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const panes = document.querySelectorAll('.sector-pane');

  navTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      soundFX.init();
      const targetId = tab.dataset.sector;

      navTabs.forEach((t) => t.classList.remove('active'));
      panes.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');

      if (window.renderMathInElement) {
        window.renderMathInElement(targetPane, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
          ],
          throwOnError: false,
        });
      }
    });
  });

  // Sound toggle button
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundFX.init();
      soundFX.muted = !soundFX.muted;
      soundIcon.textContent = soundFX.muted ? '🔇' : '🔊';
      soundBtn.title = soundFX.muted ? 'Unmute Sound' : 'Mute Sound';
    });
  }
}

// ==========================================
// 4. SECTOR 2: ABV SOLUTION MIXER
// ==========================================
function initAbvMixer() {
  const alcSlider = document.getElementById('alcVolSlider');
  const totalSlider = document.getElementById('totalVolSlider');
  const alcText = document.getElementById('alcVolText');
  const totalText = document.getElementById('totalVolText');
  const calcAbv = document.getElementById('calcAbv');
  const calcMass = document.getElementById('calcMass');
  const calcWater = document.getElementById('calcWater');
  const beakerFluid = document.getElementById('beakerFluid');
  const beakerPctLabel = document.getElementById('beakerPctLabel');
  const presetBtns = document.querySelectorAll('.preset-btn');

  function updateMixer() {
    let alc = parseFloat(alcSlider.value);
    let total = parseFloat(totalSlider.value);

    // Guard: alcohol cannot exceed total solution
    if (alc > total) {
      alc = total;
      alcSlider.value = total;
    }

    const abv = (alc / total) * 100;
    const mass = alc * 0.789;
    const water = total - alc;

    alcText.textContent = `${alc.toFixed(1)} mL`;
    totalText.textContent = `${total.toFixed(0)} mL`;

    calcAbv.textContent = `${abv.toFixed(1)}°`;
    calcMass.textContent = `${mass.toFixed(2)} g`;
    calcWater.textContent = `${water.toFixed(1)} mL`;

    beakerPctLabel.textContent = `${abv.toFixed(1)}° ABV`;
    // Fluid height proportional to total volume (max 500 mL => 90% height)
    const fluidHeightPct = Math.min(92, Math.max(15, (total / 500) * 90));
    beakerFluid.style.height = `${fluidHeightPct}%`;

    // Dynamic color: higher alcohol = more cyan/clear; lower = deeper blue
    const opacity = 0.35 + (abv / 100) * 0.45;
    beakerFluid.style.background = `linear-gradient(180deg, rgba(56, 189, 248, ${opacity}) 0%, rgba(3, 105, 161, 0.9) 100%)`;
  }

  alcSlider.addEventListener('input', () => {
    presetBtns.forEach((b) => b.classList.remove('active'));
    updateMixer();
  });

  totalSlider.addEventListener('input', () => {
    presetBtns.forEach((b) => b.classList.remove('active'));
    updateMixer();
  });

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      soundFX.init();
      presetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const targetAlc = parseFloat(btn.dataset.alc);
      const targetSol = parseFloat(btn.dataset.sol);

      alcSlider.value = targetAlc;
      totalSlider.value = targetSol;
      updateMixer();
    });
  });

  updateMixer();
}

// ==========================================
// 5. SECTOR 3: REACTION BENCH
// ==========================================
function initReactionBench() {
  // Station A: Flame Combustion
  const igniteBtn = document.getElementById('igniteBtn');
  const blueFlame = document.getElementById('blueFlame');
  const burnStatus = document.getElementById('burnStatus');
  let isBurning = false;

  igniteBtn.addEventListener('click', () => {
    soundFX.init();
    isBurning = !isBurning;
    if (isBurning) {
      soundFX.playIgnition();
      blueFlame.classList.add('burning');
      igniteBtn.textContent = '🛑 Extinguish Flame';
      burnStatus.textContent = '🔥 Combustion Active: Exothermic blue flame, generating CO₂ and H₂O vapor';
      burnStatus.style.color = '#38bdf8';
    } else {
      blueFlame.classList.remove('burning');
      igniteBtn.textContent = '🔥 Ignite Ethanol Fuel';
      burnStatus.textContent = 'Vessel cold • Fuel loaded';
      burnStatus.style.color = '#94a3b8';
    }
  });

  // Combustion Stoichiometry
  const burnMassInput = document.getElementById('burnMassInput');
  const calcBurnBtn = document.getElementById('calcBurnBtn');
  const burnResults = document.getElementById('burnResults');

  calcBurnBtn.addEventListener('click', () => {
    soundFX.init();
    const mass = parseFloat(burnMassInput.value) || 9.2;
    // Molar mass C2H5OH = 46 g/mol
    const molesEthanol = mass / 46.0;
    // C2H5OH + 3O2 -> 2CO2 + 3H2O
    const molesO2 = molesEthanol * 3;
    const molesCO2 = molesEthanol * 2;
    // Standard condition: 24.79 L/mol
    const volO2 = molesO2 * 24.79;
    const volCO2 = molesCO2 * 24.79;

    burnResults.innerHTML = `
      • Mass of Ethanol: <strong>${mass.toFixed(1)} g</strong> (${molesEthanol.toFixed(2)} mol)<br>
      • Oxygen ($\text{O}_2$) Required: <strong>${volO2.toFixed(2)} L</strong> (${molesO2.toFixed(2)} mol)<br>
      • Carbon Dioxide ($\text{CO}_2$) Produced: <strong>${volCO2.toFixed(2)} L</strong> (${molesCO2.toFixed(2)} mol)<br>
      • Water ($\text{H}_2\text{O}$) Formed: <strong>${(molesEthanol * 3 * 18).toFixed(1)} g</strong>
    `;

    if (window.renderMathInElement) {
      window.renderMathInElement(burnResults, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
        throwOnError: false,
      });
    }
  });

  // Station B: Sodium Test
  const dropNaBtn = document.getElementById('dropNaBtn');
  const naPellet = document.getElementById('naPellet');
  const bubbleContainer = document.getElementById('bubbleContainer');
  const naStatus = document.getElementById('naStatus');
  let bubbleInterval = null;

  dropNaBtn.addEventListener('click', () => {
    soundFX.init();
    naPellet.classList.add('dropped');
    soundFX.playBubbling();
    naStatus.textContent = '🧪 Reaction In Progress: Sodium sinking & dissolving; H₂ gas bubbling vigorously!';
    naStatus.style.color = '#34d399';

    // Clear previous bubbles
    bubbleContainer.innerHTML = '';
    if (bubbleInterval) clearInterval(bubbleInterval);

    let count = 0;
    bubbleInterval = setInterval(() => {
      count++;
      const bubble = document.createElement('div');
      bubble.className = 'h2-bubble';
      const size = 3 + Math.random() * 6;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${14 + (Math.random() - 0.5) * 16}px`;
      bubbleContainer.appendChild(bubble);

      setTimeout(() => bubble.remove(), 1200);

      if (count > 25) {
        clearInterval(bubbleInterval);
        naStatus.textContent = '✅ Reaction Complete: Sodium dissolved into Sodium ethoxide (C₂H₅ONa) solution.';
      }
    }, 150);
  });
}

// ==========================================
// 6. SECTOR 4: DUAL-PATH SYNTHESIS
// ==========================================
function initSynthesisPaths() {
  const pathBioBtn = document.getElementById('pathBioBtn');
  const pathIndBtn = document.getElementById('pathIndBtn');
  const pathContent = document.getElementById('pathContent');

  const contentBio = `
    <h4 style="color: #34d399; font-weight: 800; margin-bottom: 0.5rem;">🌾 Path A: Biochemical Fermentation (Agricultural Raw Materials)</h4>
    <p style="font-size: 0.88rem; color: #cbd5e1; margin-bottom: 0.75rem;">
      Starch from agricultural crops (rice, corn, cassava, potatoes) or sugar molasses is hydrolyzed by enzymes into glucose, and subsequently fermented by yeast enzymes into ethylic alcohol and carbon dioxide:
    </p>
    <div style="background: rgba(15,23,42,0.8); border: 1px solid rgba(52,211,153,0.3); border-radius: 10px; padding: 0.75rem; font-size: 0.9rem;">
      $$\\text{Starch } (\\text{C}_6\\text{H}_{10}\\text{O}_5)_n \\xrightarrow{+\\text{H}_2\\text{O, enzyme}} \\text{Glucose } (\\text{C}_6\\text{H}_{12}\\text{O}_6) \\xrightarrow{\\text{yeast enzyme}} 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2\\uparrow$$
    </div>
    <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 0.5rem;">
      *Application:* Primary source for culinary ethanol, beverages, pharmaceutical tinctures, and renewable bio-ethanol (E5).
    </p>
  `;

  const contentInd = `
    <h4 style="color: #38bdf8; font-weight: 800; margin-bottom: 0.5rem;">🏭 Path B: Industrial Hydration of Ethylene (Petrochemical Route)</h4>
    <p style="font-size: 0.88rem; color: #cbd5e1; margin-bottom: 0.75rem;">
      Ethylene gas ($\\text{CH}_2=\\text{CH}_2$, derived from petroleum cracking) is reacted with steam under high temperature ($300^\\circ\\text{C}$) and pressure ($70\\text{ bar}$) with an acidic catalyst ($\\text{H}_3\\text{PO}_4$ or $\\text{H}_2\\text{SO}_4$):
    </p>
    <div style="background: rgba(15,23,42,0.8); border: 1px solid rgba(56,189,248,0.3); border-radius: 10px; padding: 0.75rem; font-size: 0.9rem;">
      $$\\text{CH}_2=\\text{CH}_2 + \\text{H}_2\\text{O} \\xrightarrow{t^\\circ, \\text{H}^+} \\text{C}_2\\text{H}_5\\text{OH}$$
    </div>
    <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 0.5rem;">
      *Application:* High-volume production for industrial solvents, synthetic plastics, paints, and raw chemical manufacturing.
    </p>
  `;

  function renderPath(isBio) {
    pathContent.innerHTML = isBio ? contentBio : contentInd;
    if (window.renderMathInElement) {
      window.renderMathInElement(pathContent, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
        throwOnError: false,
      });
    }
  }

  pathBioBtn.addEventListener('click', () => {
    soundFX.init();
    pathBioBtn.classList.add('active');
    pathIndBtn.classList.remove('active');
    renderPath(true);
  });

  pathIndBtn.addEventListener('click', () => {
    soundFX.init();
    pathIndBtn.classList.add('active');
    pathBioBtn.classList.remove('active');
    renderPath(false);
  });

  renderPath(true);
}

// ==========================================
// 7. SECTOR 5: 5-QUESTION FLIGHT QUIZ
// ==========================================
const quizQuestions = [
  {
    id: 1,
    stem: 'What is the characteristic functional group that gives ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$) its unique chemical properties?',
    options: [
      { id: 'A', text: 'Carboxyl group (-COOH)' },
      { id: 'B', text: 'Hydroxyl group (-OH)' },
      { id: 'C', text: 'Carbon-carbon double bond (C=C)' },
      { id: 'D', text: 'Amino group (-NH2)' },
    ],
    correct: 'B',
    explanation: 'The characteristic functional group of ethylic alcohol is the hydroxyl group (-OH) bonded to the ethyl radical (C₂H₅-).',
  },
  {
    id: 2,
    stem: 'A bottle of medical rubbing alcohol is labeled $70^\\circ$ ABV. How much pure ethylic alcohol is in a $500\\text{ mL}$ bottle?',
    options: [
      { id: 'A', text: '70 mL' },
      { id: 'B', text: '140 mL' },
      { id: 'C', text: '350 mL' },
      { id: 'D', text: '430 mL' },
    ],
    correct: 'C',
    explanation: 'V_alcohol = (500 mL × 70°) / 100° = 350 mL of pure ethylic alcohol.',
  },
  {
    id: 3,
    stem: 'When a piece of metallic sodium ($\\text{Na}$) is added to pure ethylic alcohol, what observation occurs?',
    options: [
      { id: 'A', text: 'No reaction takes place because alcohol is neutral.' },
      { id: 'B', text: 'Sodium floats on top and explodes immediately.' },
      { id: 'C', text: 'Sodium sinks to the bottom, dissolves, and releases colorless H₂ gas.' },
      { id: 'D', text: 'A dense white precipitate of sodium oxide forms.' },
    ],
    correct: 'C',
    explanation: 'Sodium is denser than alcohol (0.97 g/mL vs 0.789 g/mL), so it sinks and reacts smoothly: 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑.',
  },
  {
    id: 4,
    stem: 'Why is $70^\\circ$ alcohol medically superior to $90^\\circ$ alcohol for killing bacteria and viruses on skin surfaces?',
    options: [
      { id: 'A', text: 'Because 90° alcohol evaporates too quickly and coagulates outer proteins prematurely, blocking penetration.' },
      { id: 'B', text: 'Because 70° alcohol is hotter than 90° alcohol.' },
      { id: 'C', text: 'Because 90° alcohol is not flammable.' },
      { id: 'D', text: 'Because water in 70° alcohol provides food for the bacteria.' },
    ],
    correct: 'A',
    explanation: 'At 90°, rapid protein coagulation seals the bacterial shell, preventing alcohol from penetrating inside. 70° alcohol allows complete cell penetration.',
  },
  {
    id: 5,
    stem: 'Which balanced chemical equation represents the industrial preparation of ethylic alcohol from petroleum-derived ethylene?',
    options: [
      { id: 'A', text: 'CH₄ + O₂ → C₂H₅OH' },
      { id: 'B', text: 'CH₂=CH₂ + H₂O —(t°, H⁺)→ C₂H₅OH' },
      { id: 'C', text: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂' },
      { id: 'D', text: 'C₂H₆ + H₂O → C₂H₅OH + H₂' },
    ],
    correct: 'B',
    explanation: 'Industrial hydration: ethylene gas reacts with steam over an acid catalyst: CH₂=CH₂ + H₂O → C₂H₅OH.',
  },
];

function initQuiz() {
  const container = document.getElementById('quizQuestionsContainer');
  const scoreDisplay = document.getElementById('quizScore');
  let score = 0;
  const answered = new Set();

  quizQuestions.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';

    const stemEl = document.createElement('div');
    stemEl.className = 'quiz-stem';
    stemEl.innerHTML = `<strong>Challenge ${idx + 1}:</strong> ${q.stem}`;
    card.appendChild(stemEl);

    const optionsGrid = document.createElement('div');
    optionsGrid.className = 'quiz-options';

    const feedbackEl = document.createElement('div');
    feedbackEl.className = 'quiz-feedback';

    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<strong>${opt.id}.</strong> ${opt.text}`;

      btn.addEventListener('click', () => {
        soundFX.init();
        if (answered.has(q.id)) return;
        answered.add(q.id);

        // Disable all buttons in this card
        optionsGrid.querySelectorAll('.option-btn').forEach((b) => (b.disabled = true));

        if (opt.id === q.correct) {
          btn.classList.add('correct');
          soundFX.playChime();
          score++;
          scoreDisplay.textContent = score;
          feedbackEl.className = 'quiz-feedback show success';
          feedbackEl.innerHTML = `✨ <strong>Correct!</strong> ${q.explanation}`;
        } else {
          btn.classList.add('wrong');
          soundFX.playBuzzer();
          feedbackEl.className = 'quiz-feedback show error';
          feedbackEl.innerHTML = `❌ <strong>Incorrect.</strong> The correct answer is <strong>${q.correct}</strong>.<br>${q.explanation}`;

          // Highlight the correct option
          optionsGrid.querySelectorAll('.option-btn').forEach((b) => {
            if (b.innerText.startsWith(q.correct)) b.classList.add('correct');
          });
        }
      });
      optionsGrid.appendChild(btn);
    });

    card.appendChild(optionsGrid);
    card.appendChild(feedbackEl);
    container.appendChild(card);
  });
}

// ==========================================
// 8. GLOBAL INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initNavigation();
  initAbvMixer();
  initReactionBench();
  initSynthesisPaths();
  initQuiz();

  // Initial KaTeX render
  if (window.renderMathInElement) {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ],
      throwOnError: false,
    });
  }
});
