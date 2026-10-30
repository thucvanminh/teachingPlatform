/**
 * ORBITAL CHEMISTRY LAB - INTERACTIVE SIMULATION ENGINE
 * 100% Pure English Telemetry & Space Theme
 */

// Web Audio API Sound Synthesizer
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playBeep(freq = 600, type = 'sine', duration = 0.08) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playChime() {
    this.playBeep(523.25, 'triangle', 0.1);
    setTimeout(() => this.playBeep(659.25, 'triangle', 0.12), 60);
    setTimeout(() => this.playBeep(783.99, 'triangle', 0.18), 120);
  }

  playBubbles() {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        this.playBeep(800 + Math.random() * 400, 'sine', 0.04);
      }, i * 70);
    }
  }
}

const sfx = new SoundFX();

// Starfield Canvas Animation
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

  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.4,
    speed: Math.random() * 0.3 + 0.1,
    alpha: Math.random() * 0.8 + 0.2,
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';

    stars.forEach((star) => {
      star.y -= star.speed;
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }
      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// KaTeX Render Helper
function triggerKaTeX() {
  if (window.renderMathInElement) {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ],
      throwOnError: false,
    });
  }
}

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  setTimeout(triggerKaTeX, 100);

  // Sound Toggle Button
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      sfx.enabled = !sfx.enabled;
      soundIcon.textContent = sfx.enabled ? '🔊' : '🔇';
      if (sfx.enabled) sfx.playChime();
    });
  }

  // Sector Tab Navigation
  const navTabs = document.querySelectorAll('.nav-tab');
  const sectorPanes = document.querySelectorAll('.sector-pane');

  navTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      sfx.playBeep(700, 'sine', 0.06);
      const targetSector = tab.getAttribute('data-sector');

      navTabs.forEach((t) => t.classList.remove('active'));
      sectorPanes.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetSector);
      if (targetPane) {
        targetPane.classList.add('active');
        setTimeout(triggerKaTeX, 50);
      }
    });
  });

  // ==========================================
  // SECTOR 1: INTERACTIVE CANISTER SLIDER
  // ==========================================
  const metalASlider = document.getElementById('metalASlider');
  const sliderAVal = document.getElementById('sliderAVal');
  const barSegA = document.getElementById('barSegA');
  const barSegB = document.getElementById('barSegB');

  if (metalASlider) {
    metalASlider.addEventListener('input', () => {
      const mA = parseFloat(metalASlider.value);
      const mTot = 10.0;
      const mB = mTot - mA;
      const pctA = ((mA / mTot) * 100).toFixed(0);
      const pctB = (100 - pctA).toFixed(0);

      sliderAVal.textContent = `${mA.toFixed(1)} kg`;
      barSegA.style.width = `${pctA}%`;
      barSegA.textContent = `Metal A (${mA.toFixed(1)} kg - ${pctA}%)`;

      barSegB.style.width = `${pctB}%`;
      barSegB.textContent = `Metal B (${mB.toFixed(1)} kg - ${pctB}%)`;

      sfx.playBeep(400 + mA * 50, 'sine', 0.03);
    });
  }

  // Sector 1: Stoichiometric Converter
  let curSub = { formula: 'Fe', molar: 56, isGas: false, name: 'Iron' };
  const subBtns = document.querySelectorAll('.sub-btn');
  const calcMassInput = document.getElementById('calcMassInput');
  const calcMoleInput = document.getElementById('calcMoleInput');
  const calcVolInput = document.getElementById('calcVolInput');
  const volInputGroup = document.getElementById('volInputGroup');
  const curSubLabel = document.getElementById('curSubLabel');
  const curSubFormula = document.getElementById('curSubFormula');

  function updateConverterFromMass() {
    const m = parseFloat(calcMassInput.value) || 0;
    const n = m / curSub.molar;
    calcMoleInput.value = n.toFixed(3);

    if (curSub.isGas) {
      const v = n * 24.79;
      calcVolInput.value = v.toFixed(3);
      curSubFormula.innerHTML = `$$n = \\frac{m}{M} = \\frac{${m}}{${curSub.molar}} = ${n.toFixed(3)}\\text{ mol} \\implies V = ${n.toFixed(3)} \\times 24.79 = ${v.toFixed(3)}\\text{ L}$$`;
    } else {
      curSubFormula.innerHTML = `$$n = \\frac{m}{M} = \\frac{${m}}{${curSub.molar}} = ${n.toFixed(3)}\\text{ mol}$$`;
    }
    triggerKaTeX();
  }

  function updateConverterFromMole() {
    const n = parseFloat(calcMoleInput.value) || 0;
    const m = n * curSub.molar;
    calcMassInput.value = m.toFixed(2);

    if (curSub.isGas) {
      const v = n * 24.79;
      calcVolInput.value = v.toFixed(3);
      curSubFormula.innerHTML = `$$m = n \\times M = ${n} \\times ${curSub.molar} = ${m.toFixed(2)}\\text{ g} \\implies V = ${n} \\times 24.79 = ${v.toFixed(3)}\\text{ L}$$`;
    } else {
      curSubFormula.innerHTML = `$$m = n \\times M = ${n} \\times ${curSub.molar} = ${m.toFixed(2)}\\text{ g}$$`;
    }
    triggerKaTeX();
  }

  function updateConverterFromVol() {
    if (!curSub.isGas) return;
    const v = parseFloat(calcVolInput.value) || 0;
    const n = v / 24.79;
    calcMoleInput.value = n.toFixed(3);
    const m = n * curSub.molar;
    calcMassInput.value = m.toFixed(2);
    curSubFormula.innerHTML = `$$n = \\frac{V}{24.79} = \\frac{${v}}{24.79} = ${n.toFixed(3)}\\text{ mol} \\implies m = ${n.toFixed(3)} \\times ${curSub.molar} = ${m.toFixed(2)}\\text{ g}$$`;
    triggerKaTeX();
  }

  subBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sfx.playBeep(650, 'triangle', 0.05);
      subBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const formula = btn.getAttribute('data-formula');
      const molar = parseFloat(btn.getAttribute('data-molar'));
      const isGas = btn.getAttribute('data-gas') === 'true';

      curSub = { formula, molar, isGas, name: btn.textContent.split('(')[0].trim() };
      curSubLabel.textContent = `${curSub.name} (${curSub.formula}, M = ${curSub.molar} g/mol)`;

      if (curSub.isGas) {
        volInputGroup.style.display = 'block';
      } else {
        volInputGroup.style.display = 'none';
      }

      updateConverterFromMass();
    });
  });

  calcMassInput?.addEventListener('input', updateConverterFromMass);
  calcMoleInput?.addEventListener('input', updateConverterFromMole);
  calcVolInput?.addEventListener('input', updateConverterFromVol);

  // ==========================================
  // SECTOR 2: ACID REACTOR SIMULATION
  // ==========================================
  const alloySelect = document.getElementById('alloySelect');
  const igniteReactorBtn = document.getElementById('igniteReactorBtn');
  const bubblesLayer = document.getElementById('bubblesLayer');
  const activeMetalPiece = document.getElementById('activeMetalPiece');
  const inertSolidBed = document.getElementById('inertSolidBed');
  const gaugeH2Vol = document.getElementById('gaugeH2Vol');
  const gaugeH2Mole = document.getElementById('gaugeH2Mole');
  const gaugeInertMass = document.getElementById('gaugeInertMass');
  const type1StepsContainer = document.getElementById('type1StepsContainer');

  const alloyPresets = {
    fe_cu: {
      active: 'Fe',
      activeMolar: 56,
      inert: 'Cu',
      inertMolar: 64,
      totalMass: 12.0,
      volH2: 2.479,
      molesH2: 0.1,
      massActive: 5.6,
      massInert: 6.4,
      pctActive: '46.67%',
      pctInert: '53.33%',
      acid: 'HCl',
      equation: '\\text{Fe} + 2\\text{HCl} \\rightarrow \\text{FeCl}_2 + \\text{H}_2\\uparrow',
      ratio: '1 : 1',
    },
    mg_ag: {
      active: 'Mg',
      activeMolar: 24,
      inert: 'Ag',
      inertMolar: 108,
      totalMass: 15.6,
      volH2: 4.958,
      molesH2: 0.2,
      massActive: 4.8,
      massInert: 10.8,
      pctActive: '30.77%',
      pctInert: '69.23%',
      acid: 'H₂SO₄',
      equation: '\\text{Mg} + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{MgSO}_4 + \\text{H}_2\\uparrow',
      ratio: '1 : 1',
    },
    al_cu: {
      active: 'Al',
      activeMolar: 27,
      inert: 'Cu',
      inertMolar: 64,
      totalMass: 11.8,
      volH2: 7.437,
      molesH2: 0.3,
      massActive: 5.4,
      massInert: 6.4,
      pctActive: '45.76%',
      pctInert: '54.24%',
      acid: 'HCl',
      equation: '2\\text{Al} + 6\\text{HCl} \\rightarrow 2\\text{AlCl}_3 + 3\\text{H}_2\\uparrow',
      ratio: '2 : 3',
    },
  };

  function updateType1Steps(preset) {
    if (!type1StepsContainer) return;
    const ratioCalculation =
      preset.active === 'Al'
        ? `n_{\\text{Al}} = \\frac{2}{3} n_{\\text{H}_2} = \\frac{2}{3} \\times ${preset.molesH2} = 0.2\\text{ (mol)}`
        : `n_{\\text{${preset.active}}} = n_{\\text{H}_2} = ${preset.molesH2}\\text{ (mol)}`;

    type1StepsContainer.innerHTML = `
      <div class="step-box active">
        <div class="step-num">Step 1</div>
        <div class="step-content">
          <h4 class="step-title">Classify Reactivity &amp; Write Balanced Equation</h4>
          <p>Between $\\text{${preset.active}}$ and $\\text{${preset.inert}}$, only $\\text{${preset.active}}$ stands before Hydrogen in the activity series:</p>
          <div class="katex-display">$$${preset.equation}$$</div>
          <p class="note-text">$\\text{${preset.inert}}$ lies after Hydrogen $\\implies$ completely unreactive, settles as solid residue.</p>
        </div>
      </div>

      <div class="step-box active">
        <div class="step-num">Step 2</div>
        <div class="step-content">
          <h4 class="step-title">Compute Gas Moles from Standard Telemetry</h4>
          <div class="katex-display">$$n_{\\text{H}_2} = \\frac{V_{\\text{H}_2}}{24.79} = \\frac{${preset.volH2}}{24.79} = ${preset.molesH2}\\text{ (mol)}$$</div>
        </div>
      </div>

      <div class="step-box active">
        <div class="step-num">Step 3</div>
        <div class="step-content">
          <h4 class="step-title">Stoichiometric Bridge to Reacted Metal Mass</h4>
          <div class="katex-display">$$${ratioCalculation}$$</div>
          <div class="katex-display">$$m_{\\text{${preset.active}}} = n \\times M = ${preset.massActive}\\text{ (g)}$$</div>
        </div>
      </div>

      <div class="step-box active">
        <div class="step-num">Step 4</div>
        <div class="step-content">
          <h4 class="step-title">Inert Metal Mass &amp; Mass Percentages</h4>
          <div class="katex-display">$$m_{\\text{${preset.inert}}} = ${preset.totalMass} - ${preset.massActive} = ${preset.massInert}\\text{ (g)}$$</div>
          <div class="katex-display">$$\\%m_{\\text{${preset.active}}} = ${preset.pctActive}, \\quad \\%m_{\\text{${preset.inert}}} = ${preset.pctInert}$$</div>
        </div>
      </div>
    `;
    triggerKaTeX();
  }

  if (igniteReactorBtn) {
    igniteReactorBtn.addEventListener('click', () => {
      sfx.playChime();
      sfx.playBubbles();

      const key = alloySelect.value;
      const preset = alloyPresets[key];

      activeMetalPiece.textContent = preset.active;
      inertSolidBed.textContent = `${preset.inert} Solid Residue (${preset.massInert} g)`;

      // Spawn animated bubble elements
      bubblesLayer.innerHTML = '';
      for (let i = 0; i < 18; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 80 + 10}px`;
        bubble.style.width = `${Math.random() * 6 + 4}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.animationDelay = `${Math.random() * 0.8}s`;
        bubble.style.animationDuration = `${Math.random() * 0.6 + 0.8}s`;
        bubblesLayer.appendChild(bubble);
      }

      // Animate gauges
      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.05;
        if (progress >= 1) {
          progress = 1;
          clearInterval(interval);
        }
        gaugeH2Vol.textContent = `${(preset.volH2 * progress).toFixed(3)} L`;
        gaugeH2Mole.textContent = `${(preset.molesH2 * progress).toFixed(2)} mol`;
        gaugeInertMass.textContent = `${(preset.massInert * progress).toFixed(1)} g`;
      }, 40);

      updateType1Steps(preset);
    });
  }

  // ==========================================
  // SECTOR 3: BROMINE HYDROCARBON BUBBLER
  // ==========================================
  const runBubblerBtn = document.getElementById('runBubblerBtn');
  const flaskBubbles = document.getElementById('flaskBubbles');
  const flaskDeltaMass = document.getElementById('flaskDeltaMass');

  if (runBubblerBtn) {
    runBubblerBtn.addEventListener('click', () => {
      sfx.playBubbles();
      sfx.playChime();

      flaskBubbles.innerHTML = '';
      for (let i = 0; i < 16; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        b.style.left = `${Math.random() * 80 + 10}px`;
        b.style.width = `${Math.random() * 7 + 4}px`;
        b.style.height = b.style.width;
        b.style.animationDelay = `${Math.random() * 0.7}s`;
        b.style.animationDuration = `${Math.random() * 0.5 + 0.7}s`;
        flaskBubbles.appendChild(b);
      }

      let mVal = 0;
      const mInt = setInterval(() => {
        mVal += 0.14;
        if (mVal >= 2.8) {
          mVal = 2.8;
          clearInterval(mInt);
        }
        flaskDeltaMass.textContent = `+${mVal.toFixed(2)} g`;
      }, 35);
    });
  }

  // ==========================================
  // SECTOR 4: BOSS LEVEL MATRIX SOLVER
  // ==========================================
  const presetBtns = document.querySelectorAll('.preset-btn');
  const panName1 = document.getElementById('panName1');
  const panName2 = document.getElementById('panName2');
  const panVal1 = document.getElementById('panVal1');
  const panVal2 = document.getElementById('panVal2');
  const solverDisplay = document.getElementById('solverDisplay');

  const bossPresets = {
    'Mg_Fe': {
      name1: 'Mg', m1: 24, name2: 'Fe', m2: 56,
      massTot: 8.0, volH2: 4.958, moleH2: 0.2,
      x: 0.1, y: 0.1,
      mass1: 2.4, pct1: '30%',
      mass2: 5.6, pct2: '70%'
    },
    'Zn_Fe': {
      name1: 'Zn', m1: 65, name2: 'Fe', m2: 56,
      massTot: 12.1, volH2: 4.958, moleH2: 0.2,
      x: 0.1, y: 0.1,
      mass1: 6.5, pct1: '53.72%',
      mass2: 5.6, pct2: '46.28%'
    }
  };

  function updateBossSolver(preset) {
    panName1.textContent = preset.name1;
    panName2.textContent = preset.name2;
    panVal1.textContent = `${preset.x} mol (${preset.name1})`;
    panVal2.textContent = `${preset.y} mol (${preset.name2})`;

    solverDisplay.innerHTML = `
      <div class="solver-step">
        <div class="s-badge">1</div>
        <div class="s-text">
          <strong>Define Variable Moles:</strong>
          Let $x = \\text{mol of }\\text{${preset.name1}}$ ($x > 0$), and $y = \\text{mol of }\\text{${preset.name2}}$ ($y > 0$).
        </div>
      </div>

      <div class="solver-step">
        <div class="s-badge">2</div>
        <div class="s-text">
          <strong>Formulate Chemical Telemetry:</strong>
          $$\\text{${preset.name1}} + 2\\text{HCl} \\rightarrow \\text{${preset.name1}Cl}_2 + \\text{H}_2\\uparrow \\quad (x \\rightarrow x\\text{ mol }\\text{H}_2)$$
          $$\\text{${preset.name2}} + 2\\text{HCl} \\rightarrow \\text{${preset.name2}Cl}_2 + \\text{H}_2\\uparrow \\quad (y \\rightarrow y\\text{ mol }\\text{H}_2)$$
          $$n_{\\text{H}_2} = \\frac{${preset.volH2}}{24.79} = ${preset.moleH2}\\text{ (mol)}$$
        </div>
      </div>

      <div class="solver-step">
        <div class="s-badge">3</div>
        <div class="s-text">
          <strong>Formulate System of 2 Equations:</strong>
          $$\\begin{cases} ${preset.m1}x + ${preset.m2}y = ${preset.massTot} \\quad (*) \\\\ x + y = ${preset.moleH2} \\implies x = ${preset.moleH2} - y \\quad (**) \\end{cases}$$
        </div>
      </div>

      <div class="solver-step">
        <div class="s-badge">4</div>
        <div class="s-text">
          <strong>Execute Substitution Protocol:</strong>
          Substitute $x = ${preset.moleH2} - y$ into $(*)$:
          $$${preset.m1}(${preset.moleH2} - y) + ${preset.m2}y = ${preset.massTot}$$
          $$${(preset.m1 * preset.moleH2).toFixed(1)} + ${(preset.m2 - preset.m1)}y = ${preset.massTot} \\implies ${(preset.m2 - preset.m1)}y = ${(preset.massTot - preset.m1 * preset.moleH2).toFixed(1)}$$
          $$\\implies \\mathbf{y = ${preset.y}\\text{ mol (}${preset.name2}\\text{)}}, \\quad \\mathbf{x = ${preset.x}\\text{ mol (}${preset.name1}\\text{)}}$$
        </div>
      </div>

      <div class="solver-step highlight-step">
        <div class="s-badge">5</div>
        <div class="s-text">
          <strong>Telemetry Conclusion:</strong>
          $$m_{\\text{${preset.name1}}} = ${preset.mass1}\\text{ g} \\implies \\mathbf{\\%m_{\\text{${preset.name1}}} = ${preset.pct1}}$$
          $$m_{\\text{${preset.name2}}} = ${preset.mass2}\\text{ g} \\implies \\mathbf{\\%m_{\\text{${preset.name2}}} = ${preset.pct2}}$$
        </div>
      </div>
    `;
    triggerKaTeX();
  }

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sfx.playChime();
      presetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const name1 = btn.getAttribute('data-name1');
      const name2 = btn.getAttribute('data-name2');
      const key = `${name1}_${name2}`;
      if (bossPresets[key]) {
        updateBossSolver(bossPresets[key]);
      }
    });
  });
});
