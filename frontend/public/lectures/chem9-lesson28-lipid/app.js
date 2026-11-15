/**
 * ORBITAL CHEMISTRY LAB - LESSON 28: LIPIDS & TRIGLYCERIDES
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
    
    // Harmonic bell chime (C6 - G6 - C7)
    [1046.5, 1567.98, 2093.0].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.18, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.5);
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
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.28);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.28);
  }

  playBubbles() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    for (let i = 0; i < 5; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + i * 0.08;
      const f1 = 400 + Math.random() * 250;
      const f2 = f1 + 220;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f1, start);
      osc.frequency.exponentialRampToValueAtTime(f2, start + 0.05);
      gain.gain.setValueAtTime(0.1, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.06);
    }
  }

  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.06);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
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

  const stars = [];
  const starCount = 160;
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.35 + 0.1,
      alpha: Math.random() * 0.8 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';

    for (let i = 0; i < starCount; i++) {
      const s = stars[i];
      s.y += s.speed;
      if (s.y > height) {
        s.y = 0;
        s.x = Math.random() * width;
      }
      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(render);
  }
  render();
}

// ==========================================
// 3. THREE.JS 3D TRIGLYCERIDE MOLECULAR ENGINE
// ==========================================
class Triglyceride3DViewer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.moleculeGroup = null;
    this.autoRotate = true;
    this.isUnsaturated = false;
    this.init();
  }

  init() {
    const width = this.container.clientWidth || 500;
    const height = this.container.clientHeight || 380;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 48);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Controls
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.minDistance = 15;
      this.controls.maxDistance = 90;
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 0.9);
    dirLight1.position.set(20, 30, 25);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf43f5e, 0.6);
    dirLight2.position.set(-20, -25, -15);
    this.scene.add(dirLight2);

    this.buildTriglycerideModel();

    window.addEventListener('resize', () => this.onResize());
    this.animate();
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  buildTriglycerideModel() {
    if (this.moleculeGroup) {
      this.scene.remove(this.moleculeGroup);
    }
    this.moleculeGroup = new THREE.Group();

    // Materials
    const matCarbonBackbone = new THREE.MeshPhongMaterial({ color: 0x38bdf8, shininess: 90 }); // Cyan
    const matOxygenEster = new THREE.MeshPhongMaterial({ color: 0xf43f5e, shininess: 95 });     // Rose
    const matCarbonTail = new THREE.MeshPhongMaterial({ 
      color: this.isUnsaturated ? 0xfbbf24 : 0x34d399, 
      shininess: 80 
    }); // Emerald (sat) or Amber (unsat)
    const matBond = new THREE.MeshPhongMaterial({ color: 0x64748b, shininess: 50 });

    const createSphere = (radius, material, x, y, z) => {
      const geo = new THREE.SphereGeometry(radius, 24, 24);
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(x, y, z);
      this.moleculeGroup.add(mesh);
      return mesh;
    };

    const createBond = (p1, p2, radius = 0.28) => {
      const dir = new THREE.Vector3().subVectors(p2, p1);
      const length = dir.length();
      const half = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const cylinder = new THREE.CylinderGeometry(radius, radius, length, 12);
      const bond = new THREE.Mesh(cylinder, matBond);
      bond.position.copy(half);
      bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      this.moleculeGroup.add(bond);
    };

    // 1. GLYCEROL BACKBONE: 3 Carbon atoms along vertical axis
    const cPositions = [
      new THREE.Vector3(-10, 6, 0),   // C1
      new THREE.Vector3(-10, 0, 0),   // C2
      new THREE.Vector3(-10, -6, 0)   // C3
    ];

    cPositions.forEach(p => createSphere(1.2, matCarbonBackbone, p.x, p.y, p.z));
    createBond(cPositions[0], cPositions[1], 0.35);
    createBond(cPositions[1], cPositions[2], 0.35);

    // 2. THREE ESTER BRIDGES: -O-C(=O)-
    const esterPositions = [
      { o1: new THREE.Vector3(-6, 6, 0), cEster: new THREE.Vector3(-3, 6, 0), oDouble: new THREE.Vector3(-3, 8.5, 0) },
      { o1: new THREE.Vector3(-6, 0, 0), cEster: new THREE.Vector3(-3, 0, 0), oDouble: new THREE.Vector3(-3, 2.5, 0) },
      { o1: new THREE.Vector3(-6, -6, 0), cEster: new THREE.Vector3(-3, -6, 0), oDouble: new THREE.Vector3(-3, -3.5, 0) }
    ];

    esterPositions.forEach((pos, idx) => {
      createSphere(1.0, matOxygenEster, pos.o1.x, pos.o1.y, pos.o1.z);
      createSphere(1.1, matCarbonBackbone, pos.cEster.x, pos.cEster.y, pos.cEster.z);
      createSphere(1.0, matOxygenEster, pos.oDouble.x, pos.oDouble.y, pos.oDouble.z);

      createBond(cPositions[idx], pos.o1, 0.3);
      createBond(pos.o1, pos.cEster, 0.3);
      createBond(pos.cEster, pos.oDouble, 0.32);
    });

    // 3. THREE LONG FATTY ACID HYDROCARBON TAILS
    const tailLengths = [10, 10, 10];
    tailLengths.forEach((chainLen, chainIdx) => {
      let prevPos = esterPositions[chainIdx].cEster;
      const baseY = prevPos.y;

      for (let i = 1; i <= chainLen; i++) {
        let x = prevPos.x + 2.4;
        let zigZagY = baseY + ((i % 2 === 0) ? 0.9 : -0.9);
        let z = Math.sin(i * 0.45) * 1.5;

        // Add characteristic double bond bend if unsaturated fat (Triolein) on Chain 2
        if (this.isUnsaturated && chainIdx === 1 && i >= 5) {
          zigZagY += (i - 4) * 1.2; // Kink upwards
          z += (i - 4) * 0.8;
        }

        const currentPos = new THREE.Vector3(x, zigZagY, z);
        createSphere(0.9, matCarbonTail, currentPos.x, currentPos.y, currentPos.z);
        createBond(prevPos, currentPos, 0.25);
        prevPos = currentPos;
      }
    });

    this.moleculeGroup.position.set(-6, 0, 0);
    this.scene.add(this.moleculeGroup);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.controls) this.controls.update();
    if (this.autoRotate && this.moleculeGroup) {
      this.moleculeGroup.rotation.y += 0.008;
      this.moleculeGroup.rotation.x += 0.003;
    }
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    return this.autoRotate;
  }

  resetView() {
    if (this.camera) this.camera.position.set(0, 0, 48);
    if (this.moleculeGroup) {
      this.moleculeGroup.rotation.set(0, 0, 0);
    }
    if (this.controls) this.controls.reset();
  }

  toggleFatType() {
    this.isUnsaturated = !this.isUnsaturated;
    this.buildTriglycerideModel();
    return this.isUnsaturated;
  }
}

// ==========================================
// 4. SECTOR NAVIGATION
// ==========================================
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const panes = document.querySelectorAll('.sector-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      soundFX.playPop();
      const sectorId = tab.getAttribute('data-sector');

      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(sectorId);
      if (targetPane) targetPane.classList.add('active');

      // Trigger KaTeX render if needed
      if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(targetPane, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
    });
  });
}

// ==========================================
// 5. TEST TUBE SIMULATOR (SECTOR 2)
// ==========================================
function initTestTubeSimulator() {
  const oilLayerWater = document.getElementById('oilLayerWater');
  const waterLayer = document.getElementById('waterLayer');
  const solutionLayer = document.getElementById('solutionLayer');

  const addOilBtn = document.getElementById('addOilBtn');
  const shakeTubesBtn = document.getElementById('shakeTubesBtn');
  const coolTubesBtn = document.getElementById('coolTubesBtn');
  const resetTubesBtn = document.getElementById('resetTubesBtn');

  if (addOilBtn) {
    addOilBtn.addEventListener('click', () => {
      soundFX.playPop();
      if (oilLayerWater) {
        let currentH = parseInt(oilLayerWater.style.height || '40', 10);
        oilLayerWater.style.height = Math.min(currentH + 15, 80) + 'px';
      }
      if (solutionLayer) {
        let currentH = parseInt(solutionLayer.style.height || '120', 10);
        solutionLayer.style.height = Math.min(currentH + 15, 160) + 'px';
      }
    });
  }

  if (shakeTubesBtn) {
    shakeTubesBtn.addEventListener('click', () => {
      soundFX.playBubbles();
      // Temporary emulsion shake
      if (oilLayerWater && waterLayer) {
        oilLayerWater.style.backgroundColor = 'rgba(251, 191, 36, 0.4)';
        waterLayer.style.backgroundColor = 'rgba(56, 189, 248, 0.4)';
        setTimeout(() => {
          oilLayerWater.style.backgroundColor = 'rgba(251, 191, 36, 0.75)';
          waterLayer.style.backgroundColor = 'rgba(56, 189, 248, 0.6)';
        }, 1200);
      }
    });
  }

  if (coolTubesBtn) {
    coolTubesBtn.addEventListener('click', () => {
      soundFX.playPop();
      if (oilLayerWater) {
        oilLayerWater.style.backgroundColor = 'rgba(254, 243, 199, 0.95)'; // Solid white tallow appearance
      }
    });
  }

  if (resetTubesBtn) {
    resetTubesBtn.addEventListener('click', () => {
      soundFX.playPop();
      if (oilLayerWater) {
        oilLayerWater.style.height = '40px';
        oilLayerWater.style.backgroundColor = 'rgba(251, 191, 36, 0.75)';
      }
      if (waterLayer) {
        waterLayer.style.height = '80px';
        waterLayer.style.backgroundColor = 'rgba(56, 189, 248, 0.6)';
      }
      if (solutionLayer) {
        solutionLayer.style.height = '120px';
      }
    });
  }
}

// ==========================================
// 6. SAPONIFICATION REACTOR BENCH (SECTOR 3)
// ==========================================
function initSaponificationReactor() {
  const fatSlider = document.getElementById('fatMassSlider');
  const effSlider = document.getElementById('efficiencySlider');
  const fatMassDisplay = document.getElementById('fatMassDisplay');
  const efficiencyDisplay = document.getElementById('efficiencyDisplay');

  const naohVal = document.getElementById('naohVal');
  const glycerolVal = document.getElementById('glycerolVal');
  const soapVal = document.getElementById('soapVal');
  const conservVal = document.getElementById('conservVal');

  const saltOutBtn = document.getElementById('saltOutBtn');
  const cureSoapBtn = document.getElementById('cureSoapBtn');

  function calculateStoichiometry() {
    const mFat = parseFloat(fatSlider ? fatSlider.value : 500);
    const eff = parseFloat(effSlider ? effSlider.value : 100) / 100;

    // Based on SBT 28.9 standard reference:
    // 500 g coconut oil reacts exactly with 90 g NaOH (100% eff) -> 69 g glycerol + 521 g soap
    // Ratio: 1 g fat consumes (90/500) = 0.18 g NaOH
    // Yields (69/500) = 0.138 g glycerol and (521/500) = 1.042 g soap
    const mNaOH = mFat * 0.18;
    const mGlycerol = mFat * 0.138 * eff;
    const mSoap = (mFat + mNaOH - (mFat * 0.138)) * eff;
    const totalReactants = mFat + mNaOH;
    const totalProducts = (mFat * (1 - eff)) + (mNaOH * (1 - eff)) + mSoap + mGlycerol;

    if (fatMassDisplay) fatMassDisplay.textContent = `${mFat} g (Coconut Oil)`;
    if (efficiencyDisplay) efficiencyDisplay.textContent = `${Math.round(eff * 100)}%`;

    if (naohVal) naohVal.textContent = `${mNaOH.toFixed(1)} g`;
    if (glycerolVal) glycerolVal.textContent = `${mGlycerol.toFixed(1)} g`;
    if (soapVal) soapVal.textContent = `${mSoap.toFixed(1)} g`;
    if (conservVal) conservVal.textContent = `${totalReactants.toFixed(1)} g = ${totalProducts.toFixed(1)} g`;
  }

  if (fatSlider) fatSlider.addEventListener('input', calculateStoichiometry);
  if (effSlider) effSlider.addEventListener('input', calculateStoichiometry);

  if (saltOutBtn) {
    saltOutBtn.addEventListener('click', () => {
      soundFX.playChime();
      alert('🧂 Salting Out Initiated: Saturated NaCl increases density and ionic strength. Pure soap curds float to the surface for extraction!');
    });
  }

  if (cureSoapBtn) {
    cureSoapBtn.addEventListener('click', () => {
      soundFX.playChime();
      triggerConfetti();
      alert('🧼 Soap Bar Synthesized: High purity sodium carboxylate soap cured and ready for space station crew hygiene!');
    });
  }

  calculateStoichiometry();
}

// ==========================================
// 7. CONFETTI CELEBRATION
// ==========================================
function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#38bdf8', '#34d399', '#fbbf24', '#f43f5e', '#a855f7'];
  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14 - 3,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.02 + 0.015
    });
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.alpha -= p.decay;
      if (p.alpha > 0) {
        alive = true;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    });
    if (alive) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  frame();
}

// ==========================================
// 8. FLIGHT READINESS QUIZ (SECTOR 5)
// ==========================================
const QUIZ_QUESTIONS = [
  {
    id: 1,
    q: 'Lipids are organic compounds naturally synthesized in living cells. Which statement correctly specifies their fundamental solubility characteristics?',
    options: [
      { id: 'A', text: 'Freely soluble in polar water, but completely insoluble in organic solvents.' },
      { id: 'B', text: 'Insoluble in water, but readily soluble in organic solvents like gasoline, kerosene, and benzene.' },
      { id: 'C', text: 'Insoluble in both water and all organic solvents.' },
      { id: 'D', text: 'Soluble only in strong mineral acid solutions.' }
    ],
    correct: 'B',
    exp: 'Correct! By definition (SGK Part I & SBT 28.1), lipids are hydrophobic compounds insoluble in water, but soluble in non-polar organic solvents such as gasoline, kerosene, and benzene.'
  },
  {
    id: 2,
    q: 'What is the precise chemical definition of fats (chất béo)?',
    options: [
      { id: 'A', text: 'Monoesters of monohydric alcohols and acetic acid.' },
      { id: 'B', text: 'Inorganic salts formed by glycerol with active metal hydroxides.' },
      { id: 'C', text: 'Triesters of the trihydric alcohol glycerol with long-chain fatty acids.' },
      { id: 'D', text: 'Polymerized long-chain alkenes containing ester bridges.' }
    ],
    correct: 'C',
    exp: 'Correct! Fats are triesters formed by glycerol (C3H5(OH)3) and fatty acids (R-COOH), represented by the general condensed formula (RCOO)3C3H5.'
  },
  {
    id: 3,
    q: 'When a fat sample is heated with aqueous sodium hydroxide (NaOH) solution, what reaction occurs and what products are recovered?',
    options: [
      { id: 'A', text: 'Saponification occurs, producing glycerol and sodium salts of fatty acids (soap).' },
      { id: 'B', text: 'Esterification occurs, producing pure ethylic alcohol and carbon dioxide.' },
      { id: 'C', text: 'Combustion occurs, generating only water vapor and methane gas.' },
      { id: 'D', text: 'Addition reaction occurs, converting the fat into liquid paraffin wax.' }
    ],
    correct: 'A',
    exp: 'Correct! Alkaline hydrolysis of fats is termed saponification (phản ứng xà phòng hoá): (RCOO)3C3H5 + 3NaOH -> 3RCOONa (soap) + C3H5(OH)3 (glycerol).'
  },
  {
    id: 4,
    q: 'Why are plant vegetable oils (sunflower, peanut, olive oil) liquid at room temperature, while animal fats (beef tallow, lard) are solid?',
    options: [
      { id: 'A', text: 'Plant oils have lower molecular weights and contain only 2 carbon atoms.' },
      { id: 'B', text: 'Plant oils contain predominantly unsaturated fatty acids with C=C double bonds, whereas animal fats are rich in saturated fatty acids.' },
      { id: 'C', text: 'Animal fats contain high concentrations of heavy inorganic minerals.' },
      { id: 'D', text: 'Plant oils dissolve completely in atmospheric moisture.' }
    ],
    correct: 'B',
    exp: 'Correct! Unsaturated fatty acid chains possess C=C double bonds that create kinks, preventing tight molecular packing and lowering the melting point below room temperature.'
  },
  {
    id: 5,
    q: 'To completely saponify 500 g of coconut oil, an orbital chemist adds exactly 90 g of pure NaOH. Assuming 100% reaction efficiency, what mass of pure glycerol (C3H5(OH)3, M = 92 g/mol) is obtained? (SBT 28.9)',
    options: [
      { id: 'A', text: '46.0 g' },
      { id: 'B', text: '69.0 g' },
      { id: 'C', text: '92.0 g' },
      { id: 'D', text: '138.0 g' }
    ],
    correct: 'B',
    exp: 'Correct! Moles of NaOH = 90 / 40 = 2.25 mol. From the 1:3 stoichiometric ratio, moles of glycerol = 2.25 / 3 = 0.75 mol. Mass of glycerol = 0.75 * 92 = 69.0 g!'
  }
];

let userAnswers = {};

function initQuizEngine() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = '';
  QUIZ_QUESTIONS.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-q-header">
        <span class="q-badge">Telemetry Check ${index + 1} / 5</span>
      </div>
      <div class="q-text">${item.q}</div>
      <div class="quiz-options-list">
        ${item.options.map(opt => `
          <button class="opt-btn" data-qid="${item.id}" data-opt="${opt.id}">
            <span class="opt-badge">${opt.id}</span>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="feedback-${item.id}"></div>
    `;
    container.appendChild(card);
  });

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.opt-btn');
    if (!btn) return;
    const qid = parseInt(btn.getAttribute('data-qid'), 10);
    const chosen = btn.getAttribute('data-opt');
    const question = QUIZ_QUESTIONS.find(q => q.id === qid);
    if (!question || userAnswers[qid]) return;

    userAnswers[qid] = chosen;
    const parent = btn.closest('.quiz-card');
    const allBtns = parent.querySelectorAll('.opt-btn');
    const feedbackBox = document.getElementById(`feedback-${qid}`);

    allBtns.forEach(b => {
      b.disabled = true;
      const optId = b.getAttribute('data-opt');
      if (optId === question.correct) {
        b.classList.add('correct');
      } else if (optId === chosen) {
        b.classList.add('wrong');
      }
    });

    if (chosen === question.correct) {
      soundFX.playChime();
      feedbackBox.className = 'quiz-feedback show success';
      feedbackBox.innerHTML = `<strong>Telemetry Verified!</strong> ${question.exp}`;
    } else {
      soundFX.playBuzzer();
      feedbackBox.className = 'quiz-feedback show error';
      feedbackBox.innerHTML = `<strong>Telemetry Error!</strong> Correct option is <strong>${question.correct}</strong>. ${question.exp}`;
    }

    updateScoreBadge();
  });
}

function updateScoreBadge() {
  const badge = document.getElementById('quizScoreBadge');
  if (!badge) return;
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach(q => {
    if (userAnswers[q.id] === q.correct) correctCount++;
  });
  badge.textContent = `Score: ${correctCount} / ${QUIZ_QUESTIONS.length}`;
  if (correctCount === QUIZ_QUESTIONS.length) {
    triggerConfetti();
  }
}

// ==========================================
// 9. WINDOW INITIALIZATION
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initNavigation();
  initTestTubeSimulator();
  initSaponificationReactor();
  initQuizEngine();

  // Three.js 3D Viewer
  const viewer = new Triglyceride3DViewer('molecule3dCanvasContainer');

  const toggleRotateBtn = document.getElementById('toggle3dRotateBtn');
  if (toggleRotateBtn) {
    toggleRotateBtn.addEventListener('click', () => {
      soundFX.playPop();
      const rotating = viewer.toggleAutoRotate();
      toggleRotateBtn.classList.toggle('active', rotating);
    });
  }

  const resetViewBtn = document.getElementById('reset3dViewBtn');
  if (resetViewBtn) {
    resetViewBtn.addEventListener('click', () => {
      soundFX.playPop();
      viewer.resetView();
    });
  }

  const switchFatBtn = document.getElementById('switchFatBtn');
  if (switchFatBtn) {
    switchFatBtn.addEventListener('click', () => {
      soundFX.playPop();
      const isUnsat = viewer.toggleFatType();
      switchFatBtn.textContent = isUnsat ? '🧈 View Saturated' : '🫒 View Unsaturated';
    });
  }

  // Sound toggle
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundFX.muted = !soundFX.muted;
      soundIcon.textContent = soundFX.muted ? '🔇' : '🔊';
    });
  }

  // Render KaTeX for entire document on load
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
});
