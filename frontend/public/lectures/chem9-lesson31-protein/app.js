/**
 * ORBITAL BIO-REACTOR LAB - LESSON 31: PROTEIN
 * AMINO ACIDS, PEPTIDE BONDS, COAGULATION, HYDROLYSIS & FIBER TEST
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
      if (AudioCtx) this.ctx = new AudioCtx();
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

  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(760, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.045);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.045);
  }
}

const soundFX = new SpaceSoundFX();

function renderKatexIn(element) {
  if (element && typeof renderMathInElement !== 'undefined') {
    renderMathInElement(element, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
}

// ==========================================
// 2. STARFIELD BACKGROUND
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

  const stars = Array.from({ length: 140 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.8 + 0.3,
    alpha: Math.random() * 0.8 + 0.2,
    speed: Math.random() * 0.22 + 0.05
  }));

  function animateStars() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach((s) => {
      s.y -= s.speed;
      if (s.y < 0) s.y = height;
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animateStars);
  }
  animateStars();
}

// ==========================================
// 3. THREE.JS 3D PROTEIN & AMINO ACID VIEWER
// ==========================================
let scene, camera, renderer, controls, molGroup;
let autoRotate = true;
let currentModel = 'chain';

function initMolecule3D() {
  const container = document.getElementById('molecule3dCanvasContainer');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 500;
  const height = container.clientHeight || 300;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 1.2, 13.5);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
  }

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const dir1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
  dir1.position.set(10, 14, 10);
  scene.add(dir1);
  const dir2 = new THREE.DirectionalLight(0xa855f7, 0.85);
  dir2.position.set(-10, -8, -10);
  scene.add(dir2);

  buildModel('chain');

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w > 0 && h > 0) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  });

  function renderLoop() {
    requestAnimationFrame(renderLoop);
    if (controls) controls.update();
    if (autoRotate && molGroup) {
      molGroup.rotation.y += 0.008;
      molGroup.rotation.x = Math.sin(Date.now() * 0.0007) * 0.15;
    }
    renderer.render(scene, camera);
  }
  renderLoop();
}

function buildModel(type) {
  if (molGroup) {
    scene.remove(molGroup);
    molGroup.traverse((c) => {
      if (c.geometry) c.geometry.dispose();
      if (c.material) c.material.dispose();
    });
  }

  molGroup = new THREE.Group();
  const cMat = new THREE.MeshPhongMaterial({ color: 0x38bdf8, shininess: 90 });
  const nMat = new THREE.MeshPhongMaterial({ color: 0x818cf8, shininess: 90 });
  const oMat = new THREE.MeshPhongMaterial({ color: 0xf43f5e, shininess: 90 });
  const hMat = new THREE.MeshPhongMaterial({ color: 0xe2e8f0, shininess: 70 });
  const bondMat = new THREE.MeshPhongMaterial({ color: 0x64748b, shininess: 50 });
  const peptideMat = new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0x78350f, shininess: 100 });

  function atom(x, y, z, mat, r) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 20), mat);
    mesh.position.set(x, y, z);
    molGroup.add(mesh);
    return mesh.position;
  }

  function bond(a, b, r, mat) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    if (len < 0.001) return;
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 12), mat);
    mesh.position.copy(new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    molGroup.add(mesh);
  }

  if (type === 'chain') {
    // -HN - CH(CH3) - CO - NH - CH2 - CO -
    const n1 = atom(-5.2, 0.2, 0, nMat, 0.55);
    const ca1 = atom(-3.4, -0.3, 0.2, cMat, 0.58);
    const ch3 = atom(-3.4, 1.5, 0.4, cMat, 0.5);
    const c1 = atom(-1.4, 0.2, 0, cMat, 0.58);
    const o1 = atom(-1.4, 1.8, -0.3, oMat, 0.5);
    const n2 = atom(0.8, -0.3, 0, nMat, 0.55);
    const hn2 = atom(0.8, -1.7, 0.2, hMat, 0.34);
    const ca2 = atom(2.8, 0.2, -0.2, cMat, 0.58);
    const h2a = atom(2.8, 1.6, 0.2, hMat, 0.34);
    const c2 = atom(4.8, -0.3, 0, cMat, 0.58);
    const o2 = atom(4.8, -1.9, 0.2, oMat, 0.5);

    bond(n1, ca1, 0.12, bondMat);
    bond(ca1, ch3, 0.11, bondMat);
    bond(ca1, c1, 0.12, bondMat);
    bond(c1, o1, 0.11, bondMat);
    bond(c1, n2, 0.18, peptideMat); // Highlighted Peptide Bond!
    bond(n2, hn2, 0.09, bondMat);
    bond(n2, ca2, 0.12, bondMat);
    bond(ca2, h2a, 0.09, bondMat);
    bond(ca2, c2, 0.12, bondMat);
    bond(c2, o2, 0.11, bondMat);
  } else {
    const isAlanine = type === 'alanine';
    const n = atom(-2.4, 0.1, 0, nMat, 0.58);
    const ca = atom(0, -0.2, 0, cMat, 0.62);
    const c = atom(2.4, 0.1, 0, cMat, 0.62);
    const oDouble = atom(2.8, 1.8, 0, oMat, 0.52);
    const oh = atom(3.9, -1.1, 0, oMat, 0.52);
    const hOh = atom(4.9, -0.8, 0.2, hMat, 0.34);
    const hN1 = atom(-3.4, 1.2, 0.4, hMat, 0.34);
    const hN2 = atom(-3.4, -1.0, -0.4, hMat, 0.34);
    const side = atom(0, 1.8, 0.2, isAlanine ? cMat : hMat, isAlanine ? 0.54 : 0.36);

    bond(n, ca, 0.13, bondMat);
    bond(ca, c, 0.13, bondMat);
    bond(c, oDouble, 0.12, bondMat);
    bond(c, oh, 0.12, bondMat);
    bond(oh, hOh, 0.09, bondMat);
    bond(n, hN1, 0.09, bondMat);
    bond(n, hN2, 0.09, bondMat);
    bond(ca, side, 0.11, bondMat);
  }

  scene.add(molGroup);
}

function initModelControls() {
  const buttons = document.querySelectorAll('[data-model]');
  const titleEl = document.getElementById('moleculeTitle');
  const descEl = document.getElementById('moleculeFormulaDesc');
  const badgeEl = document.getElementById('moleculeMassBadge');
  const labelEl = document.getElementById('currentModelLabel');
  const rotateBtn = document.getElementById('toggle3dRotateBtn');

  const INFO = {
    chain: {
      title: 'Protein Segment &bull; Linked by Peptide Bonds ($-\\text{CO}-\\text{NH}-$)',
      desc: 'Alanine + Glycine unit: <strong>$-\\text{HN}-\\text{CH}(\\text{CH}_3)-\\text{CO}-\\text{NH}-\\text{CH}_2-\\text{CO}-$</strong>',
      badge: 'Tens of thousands – Millions amu',
      label: 'Protein Chain Segment'
    },
    alanine: {
      title: 'Alanine &bull; Amino Acid Building Block',
      desc: 'Formula: <strong>$\\text{H}_2\\text{N}-\\text{CH}(\\text{CH}_3)-\\text{COOH}$</strong> (side group: $-\\text{CH}_3$)',
      badge: 'M = 89 g/mol',
      label: 'Alanine (Amino Acid)'
    },
    glycine: {
      title: 'Glycine &bull; Simplest Amino Acid',
      desc: 'Formula: <strong>$\\text{H}_2\\text{N}-\\text{CH}_2-\\text{COOH}$</strong> (side group: $-\\text{H}$)',
      badge: 'M = 75 g/mol',
      label: 'Glycine (Amino Acid)'
    }
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      soundFX.playClick();
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentModel = btn.dataset.model;
      const meta = INFO[currentModel];
      titleEl.innerHTML = meta.title;
      descEl.innerHTML = meta.desc;
      badgeEl.textContent = meta.badge;
      labelEl.textContent = meta.label;
      buildModel(currentModel);
      renderKatexIn(titleEl);
      renderKatexIn(descEl);
    });
  });

  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      autoRotate = !autoRotate;
      rotateBtn.classList.toggle('active', autoRotate);
    });
  }
}

// ==========================================
// 4. SECTOR 2: 3-TUBE EGG WHITE LAB
// ==========================================
function initEggWhiteLab() {
  const t1Liq = document.getElementById('eggTube1Liquid');
  const t1Curds = document.getElementById('eggTube1Curds');
  const t1Status = document.getElementById('eggTube1Status');

  const t2Liq = document.getElementById('eggTube2Liquid');
  const t2Curds = document.getElementById('eggTube2Curds');
  const t2Status = document.getElementById('eggTube2Status');

  const t3Liq = document.getElementById('eggTube3Liquid');
  const t3Vapor = document.getElementById('eggTube3Vapor');
  const t3Status = document.getElementById('eggTube3Status');

  const feedback = document.getElementById('eggLabFeedback');

  document.getElementById('runTube1Btn').addEventListener('click', () => {
    soundFX.playChime();
    t1Liq.style.background = 'rgba(248, 250, 252, 0.72)';
    t1Curds.classList.add('visible');
    t1Status.textContent = 'White curds (Coagulated)';
    t1Status.style.color = 'var(--cyan-glow)';
    feedback.className = 'callout-box';
    feedback.innerHTML = '<span class="callout-icon">💧</span><div><strong>Tube 1 (+ HCl 1 M):</strong> Adding strong acid causes the egg white protein to <strong>coagulate</strong> into opaque white solid curds.</div>';
  });

  document.getElementById('runTube2Btn').addEventListener('click', () => {
    soundFX.playChime();
    t2Liq.style.background = 'rgba(255, 255, 255, 0.88)';
    t2Curds.classList.add('visible');
    t2Status.textContent = 'Solid white (Coagulated)';
    t2Status.style.color = 'var(--amber-glow)';
    feedback.className = 'callout-box amber';
    feedback.innerHTML = '<span class="callout-icon">🕯️</span><div><strong>Tube 2 (Gentle Heat ~1 min):</strong> Warming gently triggers <strong>heat coagulation</strong>—just like cooking an egg!</div>';
  });

  document.getElementById('runTube3Btn').addEventListener('click', () => {
    soundFX.playBuzzer();
    t3Liq.style.background = 'linear-gradient(180deg, rgba(120, 53, 15, 0.9), rgba(24, 24, 27, 0.95))';
    t3Vapor.classList.add('visible');
    t3Status.textContent = 'Charred + Burnt-hair odor';
    t3Status.style.color = 'var(--rose-glow)';
    feedback.className = 'callout-box rose';
    feedback.innerHTML = '<span class="callout-icon">🔥</span><div><strong>Tube 3 (Strong Heat, No Water):</strong> Protein <strong>decomposes and chars</strong>, releasing volatile vapors with a <strong>characteristic burnt-hair smell</strong>.</div>';
  });

  document.getElementById('resetEggLabBtn').addEventListener('click', () => {
    soundFX.playClick();
    [t1Liq, t2Liq, t3Liq].forEach((el) => {
      el.style.background = 'rgba(254, 249, 195, 0.35)';
    });
    t1Curds.classList.remove('visible');
    t2Curds.classList.remove('visible');
    t3Vapor.classList.remove('visible');
    [t1Status, t2Status, t3Status].forEach((el) => {
      el.textContent = 'Clear egg white';
      el.style.color = 'var(--text-muted)';
    });
    feedback.className = 'callout-box';
    feedback.innerHTML = '<span class="callout-icon">📋</span><div>Lab reset! Select any tube button above to test egg white protein.</div>';
  });
}

// ==========================================
// 5. SECTOR 3: HYDROLYSIS & FIBER BURN TEST
// ==========================================
function initHydrolysisLab() {
  const catBtns = document.querySelectorAll('[data-catalyst]');
  const runBtn = document.getElementById('runHydrolysisBtn');
  const resetBtn = document.getElementById('resetHydrolysisBtn');
  const statusEl = document.getElementById('hydrolysisStatusText');
  let catalyst = 'acid';

  const CAT_TEXT = {
    acid: 'acid catalyst (H⁺)',
    base: 'base catalyst (OH⁻)',
    enzyme: 'enzyme catalyst'
  };

  catBtns.forEach((b) => {
    b.addEventListener('click', () => {
      soundFX.playClick();
      catBtns.forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      catalyst = b.dataset.catalyst;
    });
  });

  runBtn.addEventListener('click', () => {
    soundFX.playChime();
    document.querySelectorAll('.peptide-link').forEach((el) => el.classList.add('broken'));
    document.querySelectorAll('.aa-node').forEach((el) => el.classList.add('split'));
    statusEl.innerHTML = `✅ Complete hydrolysis with <strong>${CAT_TEXT[catalyst]}</strong> broke every peptide bond and yielded free <strong>amino acids</strong>!`;
    statusEl.style.color = 'var(--emerald-glow)';
  });

  resetBtn.addEventListener('click', () => {
    soundFX.playClick();
    document.querySelectorAll('.peptide-link').forEach((el) => el.classList.remove('broken'));
    document.querySelectorAll('.aa-node').forEach((el) => el.classList.remove('split'));
    statusEl.textContent = 'Status: Intact protein chain linked by peptide bonds. Select a catalyst and run hydrolysis.';
    statusEl.style.color = '#cbd5e1';
  });
}

function initFiberBurnTest() {
  const pills = document.querySelectorAll('[data-fiber]');
  const swatch = document.getElementById('fiberSwatch');
  const flame = document.getElementById('fiberFlame');
  const odorEl = document.getElementById('fiberOdorDisplay');
  const residueEl = document.getElementById('fiberResidueDisplay');
  const burnBtn = document.getElementById('burnFiberBtn');
  const resetBtn = document.getElementById('resetFiberBtn');

  let currentFiber = 'silk';
  const FIBERS = {
    silk: {
      label: 'Natural Silk (Protein)',
      odor: 'Burnt-hair odor!',
      residue: 'Dark brittle ash (Protein fiber)',
      cls: 'burnt-ash',
      color: 'var(--emerald-glow)'
    },
    wool: {
      label: 'Sheep Wool (Protein)',
      odor: 'Burnt-hair odor!',
      residue: 'Dark brittle ash (Protein fiber)',
      cls: 'burnt-ash',
      color: 'var(--emerald-glow)'
    },
    nylon: {
      label: 'Nylon (Synthetic Fiber)',
      odor: 'No burnt-hair odor',
      residue: 'Melts into hard plastic bead',
      cls: 'melted-bead',
      color: 'var(--amber-glow)'
    }
  };

  function resetBurner() {
    swatch.className = 'fiber-swatch';
    flame.classList.remove('lit');
    odorEl.textContent = 'Unlit Sample';
    odorEl.style.color = 'var(--cyan-glow)';
    residueEl.textContent = FIBERS[currentFiber].label;
    residueEl.style.color = 'var(--cyan-glow)';
  }

  pills.forEach((p) => {
    p.addEventListener('click', () => {
      soundFX.playClick();
      pills.forEach((x) => x.classList.remove('active'));
      p.classList.add('active');
      currentFiber = p.dataset.fiber;
      resetBurner();
    });
  });

  burnBtn.addEventListener('click', () => {
    soundFX.playChime();
    const info = FIBERS[currentFiber];
    flame.classList.add('lit');
    swatch.className = `fiber-swatch ${info.cls}`;
    odorEl.textContent = info.odor;
    odorEl.style.color = info.color;
    residueEl.textContent = info.residue;
    residueEl.style.color = info.color;
  });

  resetBtn.addEventListener('click', () => {
    soundFX.playClick();
    resetBurner();
  });
}

// ==========================================
// 6. SECTOR 5: FLIGHT READINESS QUICK QUIZ
// ==========================================
const QUIZ_QUESTIONS = [
  {
    q: 'Proteins are complex organic compounds built from many smaller units of which type?',
    options: [
      { id: 'A', text: 'Glucose monomers' },
      { id: 'B', text: 'Amino acid units' },
      { id: 'C', text: 'Glycerol units' },
      { id: 'D', text: 'Fatty acid chains' }
    ],
    correct: 'B',
    exp: 'Proteins are composed of many amino acid units linked together by peptide bonds.'
  },
  {
    q: 'Which chemical bond joins neighboring amino acid units together inside a protein chain?',
    options: [
      { id: 'A', text: 'Peptide bond' },
      { id: 'B', text: 'Ester bond' },
      { id: 'C', text: 'Ionic bond' },
      { id: 'D', text: 'Glycoside bond' }
    ],
    correct: 'A',
    exp: 'Adjacent amino acids connect via peptide bonds ($-\\text{CO}-\\text{NH}-$).'
  },
  {
    q: 'What happens to egg white protein when a few drops of $1\\text{ M }\\text{HCl}$ are added?',
    options: [
      { id: 'A', text: 'It turns deep blue-violet.' },
      { id: 'B', text: 'It releases hydrogen gas.' },
      { id: 'C', text: 'It coagulates into solids.' },
      { id: 'D', text: 'It dissolves even clearer.' }
    ],
    correct: 'C',
    exp: 'Acids, bases, and heat cause dissolved proteins like egg white to coagulate into solid curds.'
  },
  {
    q: 'Complete hydrolysis of a protein in the presence of acid, base, or enzyme produces:',
    options: [
      { id: 'A', text: 'Simple sugars' },
      { id: 'B', text: 'Soap and glycerol' },
      { id: 'C', text: 'Carbon dioxide' },
      { id: 'D', text: 'Amino acids' }
    ],
    correct: 'D',
    exp: 'Hydrolysis breaks the peptide bonds in protein, yielding the constituent amino acids.'
  },
  {
    q: 'Which statement about the biological roles of protein in the human body is INCORRECT?',
    options: [
      { id: 'A', text: 'Builds muscle, skin, and hair' },
      { id: 'B', text: 'Acts as main energy source' },
      { id: 'C', text: 'Forms catalytic enzymes' },
      { id: 'D', text: 'Transports oxygen in blood' }
    ],
    correct: 'B',
    exp: 'Providing primary energy is mainly the job of carbohydrates and fats, NOT protein.'
  },
  {
    q: 'How can Cadet Keithley quickly distinguish natural silk from synthetic nylon?',
    options: [
      { id: 'A', text: 'Dissolve both in cold water' },
      { id: 'B', text: 'Add iodine drop solution' },
      { id: 'C', text: 'Burn and smell for burnt hair' },
      { id: 'D', text: 'Check color in bright light' }
    ],
    correct: 'C',
    exp: 'Burning natural silk (protein) produces a characteristic burnt-hair odor, whereas nylon melts without that odor.'
  }
];

function initQuiz() {
  const container = document.getElementById('quizContainer');
  const scoreBadge = document.getElementById('quizScoreBadge');
  if (!container) return;

  let score = 0;
  const answered = new Set();

  QUIZ_QUESTIONS.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-header">
        <span class="quiz-badge">Flight Check ${idx + 1} / ${QUIZ_QUESTIONS.length}</span>
      </div>
      <div style="font-weight:600; color:#f8fafc; font-size:0.95rem;">${item.q}</div>
      <div class="quiz-options">
        ${item.options
          .map(
            (opt) => `
          <button class="option-btn" data-id="${opt.id}">
            <span class="option-letter">${opt.id}</span>
            <span>${opt.text}</span>
          </button>`
          )
          .join('')}
      </div>
      <div class="quiz-explanation">${item.exp}</div>
    `;

    const btns = card.querySelectorAll('.option-btn');
    const expBox = card.querySelector('.quiz-explanation');

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered.has(idx)) return;
        answered.add(idx);
        const chosen = btn.dataset.id;
        btns.forEach((b) => (b.disabled = true));

        if (chosen === item.correct) {
          btn.classList.add('selected-correct');
          card.classList.add('answered-correct');
          score++;
          soundFX.playChime();
        } else {
          btn.classList.add('selected-wrong');
          card.classList.add('answered-wrong');
          const rightBtn = card.querySelector(`[data-id="${item.correct}"]`);
          if (rightBtn) rightBtn.classList.add('selected-correct');
          soundFX.playBuzzer();
        }

        scoreBadge.textContent = `Score: ${score} / ${QUIZ_QUESTIONS.length}`;
        expBox.classList.add('show');
        renderKatexIn(expBox);

        if (score === QUIZ_QUESTIONS.length) {
          launchConfetti();
        }
      });
    });

    container.appendChild(card);
    renderKatexIn(card);
  });
}

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: 7 + Math.random() * 6,
    h: 7 + Math.random() * 6,
    c: ['#38bdf8', '#34d399', '#fbbf24', '#a855f7', '#f43f5e'][Math.floor(Math.random() * 5)],
    vy: 2.5 + Math.random() * 4,
    vx: (Math.random() - 0.5) * 2
  }));
  let frames = 0;
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.y += p.vy;
      p.x += p.vx;
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x, p.y, p.w, p.h);
    });
    if (++frames < 180) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  tick();
}

// ==========================================
// 7. NAVIGATION & INITIALIZATION
// ==========================================
function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const panes = document.querySelectorAll('.sector-pane');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      soundFX.playClick();
      tabs.forEach((t) => t.classList.remove('active'));
      panes.forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.sector);
      if (target) target.classList.add('active');
    });
  });

  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  soundBtn.addEventListener('click', () => {
    soundFX.muted = !soundFX.muted;
    soundIcon.textContent = soundFX.muted ? '🔇' : '🔊';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initNavigation();
  initMolecule3D();
  initModelControls();
  initEggWhiteLab();
  initHydrolysisLab();
  initFiberBurnTest();
  initQuiz();
  renderKatexIn(document.body);
});
