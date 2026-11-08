/**
 * ORBITAL CHEMISTRY LAB - LESSON 27: ACETIC ACID (CH3COOH)
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

  playBubbles() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Series of 4 quick bubbling frequency blips
    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + i * 0.09;
      const f1 = 350 + Math.random() * 200;
      const f2 = f1 + 250;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f1, start);
      osc.frequency.exponentialRampToValueAtTime(f2, start + 0.06);
      gain.gain.setValueAtTime(0.08, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.07);
    }
  }

  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Hydrogen splint "pop" explosion sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playFlameWhoosh() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Low gentle whoosh for spirit burner
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.15);
    osc.frequency.linearRampToValueAtTime(60, now + 0.4);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
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
  let width, height;
  let stars = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];
    const starCount = Math.floor((width * height) / 4500);
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.25 + 0.05
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    for (let s of stars) {
      s.y -= s.speed;
      if (s.y < 0) {
        s.y = height;
        s.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224, 242, 254, ${s.alpha})`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
    }
    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  render();
}

// ==========================================
// 3. REACTION BENCH SIMULATION DATA
// ==========================================
const REACTIONS = {
  litmus: {
    name: '1. Blue Litmus Indicator Test',
    tag: 'Acidic Nature',
    tagColor: 'rose',
    equation: 'CH_3COOH \\rightleftharpoons CH_3COO^- + H^+',
    phenomena: [
      'The blue litmus paper strip dipped into acetic acid immediately shifts from blue to bright reddish-pink.',
      'Demonstrates the presence of mobile hydronium/hydrogen ions ($H^+$) resulting from weak ionization in aqueous solution.',
      'Confirms that acetic acid exhibits fundamental acidic characteristics.'
    ],
    microConcept: 'The polar carboxyl group ($-COOH$) releases a proton ($H^+$) into water. Although acetic acid is a weak organic acid that ionizes only partially, the $H^+$ ion concentration is sufficient to turn litmus red.',
    liquidColor: 'rgba(224, 242, 254, 0.25)',
    showPellet: false,
    showLitmus: true,
    showBubbles: false,
    upperLayer: false,
    flameRequired: false
  },
  zinc: {
    name: '2. Active Metal Displacement (Zn granules)',
    tag: 'Single Displacement',
    tagColor: 'cyan',
    equation: '2CH_3COOH + Zn \\rightarrow (CH_3COO)_2Zn + H_2\\uparrow',
    phenomena: [
      'Zinc metal pellets ($Zn$) settle at the bottom of the test tube.',
      'Continuous effervescence: fine streams of hydrogen gas bubbles ($H_2$) vigorously rise to the liquid surface.',
      'Zinc metal pellets gradually dissolve over time.',
      'Testing the collected gas at the tube mouth with a burning splint yields a characteristic sharp "pop" sound.'
    ],
    microConcept: 'Active metals standing before Hydrogen in the activity series ($Zn, Fe, Mg, Al$) displace the active hydrogen atom in the $-COOH$ group to produce zinc acetate and flammable hydrogen gas ($H_2$).',
    liquidColor: 'rgba(224, 242, 254, 0.3)',
    showPellet: true,
    pelletColor: '#94a3b8',
    showLitmus: false,
    showBubbles: true,
    upperLayer: false,
    flameRequired: false,
    triggerPop: true
  },
  cuo: {
    name: '3. Basic Oxide Dissolution (CuO black powder)',
    tag: 'Oxide Dissolution',
    tagColor: 'emerald',
    equation: '2CH_3COOH + CuO \\xrightarrow{t^\\circ} (CH_3COO)_2Cu + H_2O',
    phenomena: [
      'Black Copper(II) oxide powder ($CuO$) is initially suspended at the bottom.',
      'Upon activating the Spirit Lamp (gentle heating), the black powder completely dissolves.',
      'The colorless liquid shifts into a transparent, vibrant sky-blue color due to hydrated $Cu^{2+}$ ions of copper(II) acetate.'
    ],
    microConcept: 'Basic oxides react with acids to produce salt and water. Acetic acid neutralizes copper(II) oxide, forming soluble copper(II) acetate $(CH_3COO)_2Cu$, which imparts the sky-blue color.',
    liquidColor: 'rgba(14, 165, 233, 0.65)',
    showPellet: true,
    pelletColor: '#1e293b',
    showLitmus: false,
    showBubbles: false,
    upperLayer: false,
    flameRequired: true
  },
  naoh: {
    name: '4. Base Neutralization (NaOH + Phenolphthalein)',
    tag: 'Neutralization',
    tagColor: 'purple',
    equation: 'CH_3COOH + NaOH \\rightarrow CH_3COONa + H_2O',
    phenomena: [
      'The test tube initially holds bright magenta/pink $NaOH$ solution (alkaline indicator color).',
      'As acetic acid drops are added, the intense magenta hue gradually pales.',
      'At complete equivalence, the solution becomes crystal clear and colorless ($pH \\le 8.2$).'
    ],
    microConcept: 'The $H^+$ from the acid combines with the $OH^-$ from sodium hydroxide to form water ($H_2O$). Once all alkaline $OH^-$ ions are neutralized, phenolphthalein reverts to its colorless form.',
    liquidColor: 'rgba(244, 114, 182, 0.55)', // Initial, then transition to colorless
    showPellet: false,
    showLitmus: false,
    showBubbles: false,
    upperLayer: false,
    flameRequired: false,
    fadeColor: 'rgba(224, 242, 254, 0.2)'
  },
  carbonate: {
    name: '5. Carbonate Effervescence (Na₂CO₃ / CaCO₃)',
    tag: 'Gas Evolution',
    tagColor: 'amber',
    equation: '2CH_3COOH + Na_2CO_3 \\rightarrow 2CH_3COONa + CO_2\\uparrow + H_2O',
    phenomena: [
      'Violent, immediate effervescence with large volumes of carbon dioxide ($CO_2$) gas bubbles erupting through the liquid.',
      'Passing the evolved gas through clear limewater ($Ca(OH)_2$) makes the limewater cloudy white ($CaCO_3\\downarrow$).',
      'Confirms that acetic acid is a stronger acid than carbonic acid ($H_2CO_3$).'
    ],
    microConcept: 'Acetic acid expels the weaker carbonic acid ($H_2CO_3$) from its carbonate salts. Carbonic acid instantly decomposes into water and carbon dioxide gas ($CO_2\\uparrow$).',
    liquidColor: 'rgba(224, 242, 254, 0.35)',
    showPellet: false,
    showLitmus: false,
    showBubbles: true,
    upperLayer: false,
    flameRequired: false
  },
  ester: {
    name: '6. Esterification (C₂H₅OH + conc. H₂SO₄ + Heat)',
    tag: 'Organic Synthesis',
    tagColor: 'rose',
    equation: 'CH_3COOH + C_2H_5OH \\underset{t^\\circ}{\\overset{H_2SO_4 \\text{ conc.}}{\\rightleftharpoons}} CH_3COOC_2H_5 + H_2O',
    phenomena: [
      'The mixture of pure acetic acid and ethanol is heated gently with the spirit lamp in the presence of concentrated $H_2SO_4$.',
      'After quenching in cold saturated $NaCl$ solution, the mixture separates into two distinct, immiscible liquid layers.',
      'The upper liquid layer is Ethyl Acetate ($CH_3COOC_2H_5$), which floats because it is lighter than water and emits a sweet, pleasant fruity fragrance.'
    ],
    microConcept: 'The $-OH$ group from acetic acid splits and combines with the $-H$ from ethanol to form water, creating an ester bond. Concentrated $H_2SO_4$ acts both as an acid catalyst and a hygroscopic agent that absorbs water.',
    liquidColor: 'rgba(224, 242, 254, 0.4)',
    showPellet: false,
    showLitmus: false,
    showBubbles: false,
    upperLayer: true,
    flameRequired: true
  }
};

let currentReactionKey = 'litmus';
let isFlameOn = false;

function updateReactionView(key) {
  currentReactionKey = key;
  const r = REACTIONS[key];
  if (!r) return;

  // Update selection button styles
  document.querySelectorAll('.reagent-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.reagent === key);
  });

  // Update tags and title
  const titleEl = document.getElementById('reactionTitle');
  const tagEl = document.getElementById('reactionTag');
  if (titleEl) titleEl.textContent = r.name;
  if (tagEl) {
    tagEl.textContent = r.tag;
    tagEl.className = `tag ${r.tagColor}`;
  }

  // Update equation in KaTeX
  const eqEl = document.getElementById('reactionEquation');
  if (eqEl) {
    eqEl.innerHTML = `$$${r.equation}$$`;
    if (window.renderMathInElement) {
      window.renderMathInElement(eqEl, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      });
    }
  }

  // Update phenomena list
  const listEl = document.getElementById('phenomenaList');
  if (listEl) {
    listEl.innerHTML = r.phenomena.map(item => `
      <li>
        <span class="bullet">✦</span>
        <span>${item}</span>
      </li>
    `).join('');
    if (window.renderMathInElement) {
      window.renderMathInElement(listEl, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      });
    }
  }

  // Update microscopic concept
  const microEl = document.getElementById('microConceptText');
  if (microEl) {
    microEl.innerHTML = r.microConcept;
    if (window.renderMathInElement) {
      window.renderMathInElement(microEl, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      });
    }
  }

  // Visual apparatus updates
  applyApparatusVisuals(r);
}

function applyApparatusVisuals(r) {
  const liquidEl = document.getElementById('tubeLiquid');
  const upperEl = document.getElementById('tubeUpperLayer');
  const pelletEl = document.getElementById('tubePellet');
  const litmusEl = document.getElementById('tubeLitmus');
  const bubbleContainer = document.getElementById('bubbleContainer');
  const flameEl = document.getElementById('spiritFlame');
  const heatBtn = document.getElementById('heatToggleBtn');

  // Liquid color
  if (liquidEl) {
    if (currentReactionKey === 'naoh') {
      liquidEl.style.backgroundColor = 'rgba(244, 114, 182, 0.7)';
      setTimeout(() => {
        liquidEl.style.backgroundColor = r.fadeColor;
      }, 1200);
    } else {
      liquidEl.style.backgroundColor = r.liquidColor;
    }
  }

  // Upper layer for ester
  if (upperEl) {
    if (r.upperLayer) {
      upperEl.style.height = '35px';
      upperEl.textContent = 'Ethyl Acetate (Fruity Scent)';
    } else {
      upperEl.style.height = '0px';
      upperEl.textContent = '';
    }
  }

  // Pellet (Zn / CuO)
  if (pelletEl) {
    if (r.showPellet) {
      pelletEl.style.opacity = '1';
      pelletEl.style.backgroundColor = r.pelletColor || '#64748b';
    } else {
      pelletEl.style.opacity = '0';
    }
  }

  // Litmus Paper
  if (litmusEl) {
    if (r.showLitmus) {
      litmusEl.style.display = 'block';
      setTimeout(() => {
        litmusEl.classList.add('dipped');
        setTimeout(() => {
          litmusEl.classList.add('turned-red');
          soundFX.playChime();
        }, 500);
      }, 150);
    } else {
      litmusEl.classList.remove('dipped', 'turned-red');
      litmusEl.style.display = 'none';
    }
  }

  // Bubbles
  if (bubbleContainer) {
    bubbleContainer.innerHTML = '';
    if (r.showBubbles) {
      soundFX.playBubbles();
      for (let i = 0; i < 15; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        const size = Math.random() * 8 + 4;
        b.style.width = `${size}px`;
        b.style.height = `${size}px`;
        b.style.left = `${Math.random() * 80 + 10}%`;
        b.style.animationDelay = `${Math.random() * 1}s`;
        b.style.animationDuration = `${0.8 + Math.random() * 0.6}s`;
        bubbleContainer.appendChild(b);
      }
      if (r.triggerPop) {
        setTimeout(() => {
          soundFX.playPop();
        }, 1600);
      }
    }
  }

  // Auto handle flame prompt if required
  if (r.flameRequired) {
    if (heatBtn) {
      heatBtn.style.boxShadow = '0 0 15px rgba(251, 191, 36, 0.6)';
    }
  } else {
    if (heatBtn) {
      heatBtn.style.boxShadow = 'none';
    }
    setFlameState(false);
  }
}

function setFlameState(active) {
  isFlameOn = active;
  const flameEl = document.getElementById('spiritFlame');
  const heatBtn = document.getElementById('heatToggleBtn');
  if (flameEl) {
    flameEl.classList.toggle('active', isFlameOn);
  }
  if (heatBtn) {
    heatBtn.textContent = isFlameOn ? '🔥 Extinguish Flame' : '🔥 Heat Solution';
    heatBtn.className = isFlameOn ? 'btn-primary' : 'btn-secondary';
  }
  if (isFlameOn) {
    soundFX.playFlameWhoosh();
    // If CuO reaction is active and heated, trigger dissolution
    if (currentReactionKey === 'cuo') {
      const pelletEl = document.getElementById('tubePellet');
      const liquidEl = document.getElementById('tubeLiquid');
      if (pelletEl) pelletEl.style.opacity = '0.1';
      if (liquidEl) liquidEl.style.backgroundColor = 'rgba(14, 165, 233, 0.75)';
      soundFX.playChime();
    }
  }
}

// ==========================================
// 4. VINEGAR DILUTION CALCULATOR
// ==========================================
function updateVinegarCalculator() {
  const concInput = document.getElementById('vinegarConcSlider');
  const volInput = document.getElementById('vinegarVolSlider');
  if (!concInput || !volInput) return;

  const conc = parseFloat(concInput.value); // percentage (e.g. 5%)
  const totalVol = parseFloat(volInput.value); // mL

  // Update slider text
  const concValEl = document.getElementById('vinegarConcVal');
  const volValEl = document.getElementById('vinegarVolVal');
  if (concValEl) concValEl.textContent = `${conc}%`;
  if (volValEl) volValEl.textContent = `${totalVol} mL`;

  // Calculations
  // D_pure_acetic = 1.05 g/mL, M = 60 g/mol
  const vPure = (totalVol * conc) / 100; // mL of pure CH3COOH
  const mPure = vPure * 1.05; // grams
  const nPure = mPure / 60; // moles
  const estPH = (2.87 - 0.5 * Math.log10(conc / 5)).toFixed(2); // approximate pH curve

  // Update UI outputs
  const outVol = document.getElementById('calcPureVol');
  const outMass = document.getElementById('calcPureMass');
  const outMoles = document.getElementById('calcMoles');
  const outPH = document.getElementById('calcPH');

  if (outVol) outVol.textContent = `${vPure.toFixed(2)} mL`;
  if (outMass) outMass.textContent = `${mPure.toFixed(2)} g`;
  if (outMoles) outMoles.textContent = `${nPure.toFixed(4)} mol`;
  if (outPH) outPH.textContent = `~${estPH}`;
}

// ==========================================
// 5. SELF-CHECK QUIZ ENGINE
// ==========================================
const QUIZ_QUESTIONS = [
  {
    q: 'What characteristic functional group is responsible for the acidic properties of acetic acid?',
    options: [
      'The hydroxyl group (-OH) alone',
      'The carboxyl group (-COOH)',
      'The carbonyl group (C=O) alone',
      'The ethyl hydrocarbon radical (-C₂H₅)'
    ],
    correct: 1,
    exp: 'The carboxyl group (-COOH) is composed of a carbonyl (C=O) and a hydroxyl (-OH). The presence of both makes the O-H bond polar enough to release H+ ions.'
  },
  {
    q: 'What gas is evolved when acetic acid reacts with zinc metal granules?',
    options: [
      'Oxygen (O₂)',
      'Carbon dioxide (CO₂)',
      'Hydrogen gas (H₂)',
      'Sulfur dioxide (SO₂)'
    ],
    correct: 2,
    exp: 'Active metals like Zn react with acids to form salts and release flammable hydrogen gas: 2CH₃COOH + Zn → (CH₃COO)₂Zn + H₂↑.'
  },
  {
    q: 'What is the color change observed when black Copper(II) oxide powder dissolves in heated acetic acid?',
    options: [
      'Turns bright yellow',
      'Turns transparent sky-blue',
      'Turns deep purple',
      'Remains completely black'
    ],
    correct: 1,
    exp: 'Copper(II) oxide reacts to form copper(II) acetate: 2CH₃COOH + CuO → (CH₃COO)₂Cu + H₂O. The hydrated Cu²⁺ ions impart a sky-blue color.'
  },
  {
    q: 'What is the role of concentrated H₂SO₄ in the esterification between acetic acid and ethylic alcohol?',
    options: [
      'Acts only as a colored dye',
      'Acts as a catalyst and absorbs water, shifting equilibrium forward',
      'Neutralizes the acid completely',
      'Prevents the alcohol from boiling'
    ],
    correct: 1,
    exp: 'Concentrated H₂SO₄ provides H⁺ catalyst and acts as a strong dehydrating agent that absorbs water, driving the reversible esterification towards ethyl acetate.'
  },
  {
    q: 'What concentration range of acetic acid is typically present in everyday table vinegar?',
    options: [
      '0.1% – 0.5%',
      '2% – 5%',
      '15% – 20%',
      '60% – 80%'
    ],
    correct: 1,
    exp: 'Table vinegar is a dilute solution of acetic acid containing typically between 2% and 5% acetic acid by mass, safe for food preservation and seasoning.'
  }
];

let currentQuizIndex = 0;
let userScore = 0;
let answered = false;

function loadQuizQuestion(index) {
  const qData = QUIZ_QUESTIONS[index];
  if (!qData) return;
  answered = false;

  const qText = document.getElementById('quizQuestionText');
  const optContainer = document.getElementById('quizOptionsContainer');
  const feedbackEl = document.getElementById('quizFeedback');
  const progressFill = document.getElementById('quizProgressFill');
  const nextBtn = document.getElementById('quizNextBtn');

  if (qText) qText.textContent = `Question ${index + 1} of ${QUIZ_QUESTIONS.length}: ${qData.q}`;
  if (feedbackEl) {
    feedbackEl.className = 'quiz-feedback';
    feedbackEl.innerHTML = '';
  }
  if (progressFill) {
    progressFill.style.width = `${((index + 1) / QUIZ_QUESTIONS.length) * 100}%`;
  }
  if (nextBtn) {
    nextBtn.textContent = index === QUIZ_QUESTIONS.length - 1 ? 'Finish Flight Check' : 'Next Question ➔';
    nextBtn.style.display = 'none';
  }

  if (optContainer) {
    optContainer.innerHTML = '';
    qData.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span>${String.fromCharCode(65 + optIdx)}. ${optText}</span>`;
      btn.onclick = () => handleQuizAnswer(optIdx, btn);
      optContainer.appendChild(btn);
    });
  }
}

function handleQuizAnswer(selectedIdx, btnElement) {
  if (answered) return;
  answered = true;
  const qData = QUIZ_QUESTIONS[currentQuizIndex];
  const feedbackEl = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('quizNextBtn');

  const allBtns = document.querySelectorAll('.quiz-option-btn');
  allBtns.forEach((b, idx) => {
    b.disabled = true;
    if (idx === qData.correct) {
      b.classList.add('correct');
    }
  });

  if (selectedIdx === qData.correct) {
    userScore++;
    soundFX.playChime();
    if (feedbackEl) {
      feedbackEl.className = 'quiz-feedback show correct';
      feedbackEl.innerHTML = `<strong>✓ Correct!</strong> ${qData.exp}`;
    }
  } else {
    btnElement.classList.add('wrong');
    soundFX.playBuzzer();
    if (feedbackEl) {
      feedbackEl.className = 'quiz-feedback show wrong';
      feedbackEl.innerHTML = `<strong>✗ Incorrect.</strong> The correct answer was <strong>${String.fromCharCode(65 + qData.correct)}</strong>. ${qData.exp}`;
    }
  }

  if (nextBtn) nextBtn.style.display = 'inline-block';
}

function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      color: ['#38bdf8', '#34d399', '#fbbf24', '#f43f5e', '#a855f7'][Math.floor(Math.random() * 5)],
      size: Math.random() * 8 + 4,
      vy: Math.random() * 3 + 2,
      vx: Math.random() * 2 - 1,
      angle: Math.random() * 360
    });
  }

  let frames = 0;
  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of pieces) {
      p.y += p.vy;
      p.x += p.vx;
      p.angle += 3;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }
    frames++;
    if (frames < 200) {
      requestAnimationFrame(animateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  animateConfetti();
}

// ==========================================
// 6. INITIALIZATION & EVENT LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Init starfield
  initStarfield();

  // Navigation tab switching
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.sector-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetSector = tab.dataset.sector;
      const pane = document.getElementById(targetSector);
      if (pane) pane.classList.add('active');
      soundFX.playChime();
    });
  });

  // Sound toggle button
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundFX.muted = !soundFX.muted;
      if (soundIcon) soundIcon.textContent = soundFX.muted ? '🔇' : '🔊';
      soundBtn.title = soundFX.muted ? 'Sound: Muted' : 'Sound: Active';
    });
  }

  // Reagents shelf buttons
  document.querySelectorAll('.reagent-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const reagent = btn.dataset.reagent;
      updateReactionView(reagent);
    });
  });

  // Flame toggle button
  const heatBtn = document.getElementById('heatToggleBtn');
  if (heatBtn) {
    heatBtn.addEventListener('click', () => {
      setFlameState(!isFlameOn);
    });
  }

  // Rinse tube button
  const rinseBtn = document.getElementById('rinseTubeBtn');
  if (rinseBtn) {
    rinseBtn.addEventListener('click', () => {
      setFlameState(false);
      updateReactionView('litmus');
      soundFX.playChime();
    });
  }

  // Vinegar sliders
  const concInput = document.getElementById('vinegarConcSlider');
  const volInput = document.getElementById('vinegarVolSlider');
  if (concInput) concInput.addEventListener('input', updateVinegarCalculator);
  if (volInput) volInput.addEventListener('input', updateVinegarCalculator);
  updateVinegarCalculator();

  // Quiz next button
  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
        currentQuizIndex++;
        loadQuizQuestion(currentQuizIndex);
      } else {
        // Quiz complete
        const qCard = document.querySelector('.quiz-card');
        if (qCard) {
          const pct = Math.round((userScore / QUIZ_QUESTIONS.length) * 100);
          qCard.innerHTML = `
            <div style="text-align: center; padding: 2rem 1rem;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
              <h3 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem;">Flight Readiness Verified!</h3>
              <p style="font-size: 1.1rem; color: #38bdf8; font-weight: 700; margin-bottom: 1rem;">Cadet Score: ${userScore} / ${QUIZ_QUESTIONS.length} (${pct}%)</p>
              <p style="font-size: 0.85rem; color: #94a3b8; max-width: 480px; margin: 0 auto 1.5rem;">
                ${pct === 100 
                  ? 'Outstanding telemetry, Astronaut Cadet Keithley! You have mastered all 5 acidic properties and the esterification synthesis of acetic acid!' 
                  : 'Well done! Review the reaction bench above and test the reagents again to reach 100% mastery!'}
              </p>
              <button id="retryQuizBtn" class="btn-primary" style="display: inline-block; width: auto; padding: 0.75rem 2rem;">Retake Flight Check</button>
            </div>
          `;
          if (pct === 100) {
            triggerConfetti();
            soundFX.playChime();
          }
          const retryBtn = document.getElementById('retryQuizBtn');
          if (retryBtn) {
            retryBtn.addEventListener('click', () => {
              currentQuizIndex = 0;
              userScore = 0;
              location.reload();
            });
          }
        }
      }
    });
  }

  // Initialize initial reaction view
  updateReactionView('litmus');
  loadQuizQuestion(0);
});
