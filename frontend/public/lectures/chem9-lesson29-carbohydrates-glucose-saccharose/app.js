/**
 * ORBITAL BIO-REACTOR LAB - LESSON 29: CARBOHYDRATES
 * GLUCOSE (C6H12O6) & SACCHAROSE (C12H22O11)
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

    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + i * 0.07;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350 + Math.random() * 300, startTime);
      osc.frequency.exponentialRampToValueAtTime(750 + Math.random() * 200, startTime + 0.06);
      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.06);
    }
  }

  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }
}

const soundFX = new SpaceSoundFX();

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

  const stars = Array.from({ length: 160 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.8 + 0.3,
    alpha: Math.random() * 0.8 + 0.2,
    speed: Math.random() * 0.25 + 0.05
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
// 3. THREE.JS 3D MOLECULAR SIMULATOR
// ==========================================
let scene, camera, renderer, controls, moleculeGroup;
let autoRotate = true;
let currentMoleculeType = 'glucose'; // 'glucose' | 'saccharose'

function initMolecule3D() {
  const container = document.getElementById('molecule3dCanvasContainer');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 16);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
  }

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
  dirLight1.position.set(10, 15, 10);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xf43f5e, 0.8);
  dirLight2.position.set(-10, -10, -10);
  scene.add(dirLight2);

  buildMolecule(currentMoleculeType);

  window.addEventListener('resize', () => {
    if (!container || !renderer || !camera) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  function renderLoop() {
    requestAnimationFrame(renderLoop);
    if (controls) controls.update();
    if (autoRotate && moleculeGroup) {
      moleculeGroup.rotation.y += 0.008;
      moleculeGroup.rotation.x += 0.003;
    }
    renderer.render(scene, camera);
  }
  renderLoop();
}

function buildMolecule(type) {
  if (moleculeGroup) {
    scene.remove(moleculeGroup);
    moleculeGroup.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  }

  moleculeGroup = new THREE.Group();

  const cMat = new THREE.MeshPhongMaterial({ color: 0x38bdf8, shininess: 90 }); // Cyan Carbon
  const oMat = new THREE.MeshPhongMaterial({ color: 0xf43f5e, shininess: 90 }); // Rose Oxygen
  const hMat = new THREE.MeshPhongMaterial({ color: 0xf1f5f9, shininess: 70 }); // White Hydrogen
  const bondMat = new THREE.MeshPhongMaterial({ color: 0x64748b, shininess: 50 });

  function addAtom(x, y, z, mat, radius) {
    const geo = new THREE.SphereGeometry(radius, 24, 24);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    moleculeGroup.add(mesh);
    return mesh.position;
  }

  function addBond(posA, posB, radius = 0.12) {
    const dir = new THREE.Vector3().subVectors(posB, posA);
    const len = dir.length();
    const bondGeo = new THREE.CylinderGeometry(radius, radius, len, 12);
    const bondMesh = new THREE.Mesh(bondGeo, bondMat);

    const mid = new THREE.Vector3().addVectors(posA, posB).multiplyScalar(0.5);
    bondMesh.position.copy(mid);
    bondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    moleculeGroup.add(bondMesh);
  }

  if (type === 'glucose') {
    // Glucose Pyranose Ring (5 Carbons, 1 Ring Oxygen)
    const ringRadius = 2.4;
    const ringNodes = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * ringRadius;
      const y = Math.sin(angle) * ringRadius;
      const z = (i % 2 === 0 ? 0.35 : -0.35);
      const isOxygen = i === 1;
      const mat = isOxygen ? oMat : cMat;
      const r = isOxygen ? 0.65 : 0.72;
      const pos = addAtom(x, y, z, mat, r);
      ringNodes.push(pos);
    }
    // Ring bonds
    for (let i = 0; i < 6; i++) {
      addBond(ringNodes[i], ringNodes[(i + 1) % 6]);
    }
    // Hydroxyl groups & CH2OH arm
    const c5 = ringNodes[0];
    const cArmPos = addAtom(c5.x + 1.2, c5.y + 1.2, c5.z + 0.6, cMat, 0.68);
    addBond(c5, cArmPos);
    const oArmPos = addAtom(cArmPos.x + 0.8, cArmPos.y + 0.4, cArmPos.z + 0.3, oMat, 0.62);
    addBond(cArmPos, oArmPos);
    addBond(oArmPos, addAtom(oArmPos.x + 0.5, oArmPos.y + 0.2, oArmPos.z, hMat, 0.35));

    // OH on ring Carbons (nodes 2, 3, 4, 5)
    [2, 3, 4, 5].forEach((idx, k) => {
      const node = ringNodes[idx];
      const sign = k % 2 === 0 ? 1 : -1;
      const oPos = addAtom(node.x * 1.5, node.y * 1.5, node.z + sign * 0.9, oMat, 0.62);
      addBond(node, oPos);
      const hPos = addAtom(oPos.x + 0.4, oPos.y + 0.3, oPos.z + 0.2, hMat, 0.35);
      addBond(oPos, hPos);
    });

  } else {
    // Saccharose Disaccharide: Glucose Ring + Oxygen Bridge + Fructose Ring
    // Ring 1: Glucose (Left)
    const gNodes = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = -3.2 + Math.cos(angle) * 1.8;
      const y = Math.sin(angle) * 1.8;
      const z = (i % 2 === 0 ? 0.3 : -0.3);
      const isO = i === 1;
      gNodes.push(addAtom(x, y, z, isO ? oMat : cMat, isO ? 0.6 : 0.68));
    }
    for (let i = 0; i < 6; i++) addBond(gNodes[i], gNodes[(i + 1) % 6]);

    // Bridging Oxygen (-O- glycosidic bond)
    const bridgeO = addAtom(0, 0.2, 0.5, oMat, 0.72);
    addBond(gNodes[3], bridgeO, 0.15);

    // Ring 2: Fructose (Right, 5-membered furanose ring)
    const fNodes = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5;
      const x = 3.2 + Math.cos(angle) * 1.6;
      const y = Math.sin(angle) * 1.6;
      const z = (i % 2 === 0 ? 0.25 : -0.25);
      const isO = i === 0;
      fNodes.push(addAtom(x, y, z, isO ? oMat : cMat, isO ? 0.6 : 0.68));
    }
    for (let i = 0; i < 5; i++) addBond(fNodes[i], fNodes[(i + 1) % 5]);
    addBond(bridgeO, fNodes[2], 0.15);

    // Peripheral OH groups
    [gNodes[0], gNodes[4], fNodes[1], fNodes[3]].forEach((n) => {
      const oP = addAtom(n.x * 1.25, n.y * 1.25, n.z + 0.7, oMat, 0.55);
      addBond(n, oP);
      addBond(oP, addAtom(oP.x + 0.3, oP.y + 0.2, oP.z, hMat, 0.3));
    });
  }

  scene.add(moleculeGroup);
}

// ==========================================
// 4. SILVER MIRROR VIRTUAL LAB ENGINE
// ==========================================
function initSilverMirrorLab() {
  const addReagentBtn = document.getElementById('addReagentBtn');
  const tempSlider = document.getElementById('tempSlider');
  const tempDisplay = document.getElementById('tempDisplay');
  const agMassDisplay = document.getElementById('agMassDisplay');
  const reflectivityDisplay = document.getElementById('reflectivityDisplay');
  const tubeLiquid = document.getElementById('tubeLiquid');
  const silverMirrorLayer = document.getElementById('silverMirrorLayer');
  const testSaccharoseBtn = document.getElementById('testSaccharoseBtn');
  const resetMirrorLabBtn = document.getElementById('resetMirrorLabBtn');

  const steps = [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3'),
    document.getElementById('step4')
  ];

  let currentStep = 1;
  let isSaccharoseControl = false;

  function updateStepper(step) {
    steps.forEach((s, idx) => {
      if (idx + 1 < step) {
        s.className = 'step-node done';
      } else if (idx + 1 === step) {
        s.className = 'step-node active';
      } else {
        s.className = 'step-node';
      }
    });
  }

  if (addReagentBtn) {
    addReagentBtn.addEventListener('click', () => {
      soundFX.playClick();
      if (currentStep === 1) {
        // Added AgNO3
        tubeLiquid.style.height = '25%';
        tubeLiquid.style.background = 'rgba(226, 232, 240, 0.45)';
        addReagentBtn.textContent = 'Add 5% NH₃ dropwise';
        currentStep = 2;
        updateStepper(2);
      } else if (currentStep === 2) {
        // Added NH3 (complex formed)
        tubeLiquid.style.height = '45%';
        tubeLiquid.style.background = 'rgba(56, 189, 248, 0.25)';
        addReagentBtn.textContent = 'Add 1 mL 10% Glucose Solution';
        currentStep = 3;
        updateStepper(3);
      } else if (currentStep === 3) {
        // Added Glucose
        tubeLiquid.style.height = '65%';
        tubeLiquid.style.background = 'rgba(56, 189, 248, 0.4)';
        addReagentBtn.textContent = 'Place in Warm Water Bath (75°C)';
        currentStep = 4;
        updateStepper(4);
      } else if (currentStep === 4) {
        // Heating initiated
        tempSlider.value = 75;
        tempDisplay.textContent = '75°C';
        checkMirrorFormation();
      }
    });
  }

  function checkMirrorFormation() {
    const temp = parseInt(tempSlider.value);
    tempDisplay.textContent = `${temp}°C`;

    if (currentStep >= 4) {
      if (isSaccharoseControl) {
        // Saccharose control -> Negative!
        silverMirrorLayer.classList.remove('active');
        agMassDisplay.textContent = '0.00 g';
        reflectivityDisplay.textContent = '8%';
        tubeLiquid.style.background = 'rgba(251, 191, 36, 0.35)'; // Pale yellow, no silver
      } else if (temp >= 70) {
        // Glucose at 70-85°C -> Brilliant silver mirror!
        silverMirrorLayer.classList.add('active');
        agMassDisplay.textContent = '0.22 g';
        reflectivityDisplay.textContent = '96%';
        soundFX.playChime();
        addReagentBtn.textContent = 'Silver Mirror Reaction Complete!';
        addReagentBtn.disabled = true;
      } else {
        silverMirrorLayer.classList.remove('active');
        agMassDisplay.textContent = '0.00 g';
        reflectivityDisplay.textContent = '12%';
      }
    }
  }

  if (tempSlider) {
    tempSlider.addEventListener('input', checkMirrorFormation);
  }

  if (testSaccharoseBtn) {
    testSaccharoseBtn.addEventListener('click', () => {
      soundFX.playClick();
      isSaccharoseControl = true;
      currentStep = 4;
      tubeLiquid.style.height = '65%';
      tubeLiquid.style.background = 'rgba(251, 191, 36, 0.3)';
      silverMirrorLayer.classList.remove('active');
      agMassDisplay.textContent = '0.00 g (Negative)';
      reflectivityDisplay.textContent = '8% (No Mirror)';
      tempSlider.value = 75;
      tempDisplay.textContent = '75°C';
      alert('🧪 Saccharose Control Test: Even when heated to 75°C with ammoniacal silver nitrate, NO silver mirror forms! Saccharose lacks a free aldehyde (-CHO) group.');
      updateStepper(4);
    });
  }

  if (resetMirrorLabBtn) {
    resetMirrorLabBtn.addEventListener('click', () => {
      soundFX.playClick();
      currentStep = 1;
      isSaccharoseControl = false;
      tubeLiquid.style.height = '0%';
      silverMirrorLayer.classList.remove('active');
      agMassDisplay.textContent = '0.00 g';
      reflectivityDisplay.textContent = '8%';
      tempSlider.value = 25;
      tempDisplay.textContent = '25°C';
      addReagentBtn.disabled = false;
      addReagentBtn.textContent = 'Add 1 mL AgNO₃ (1%)';
      updateStepper(1);
    });
  }
}

// ==========================================
// 5. FERMENTATION BIO-REACTOR ENGINE
// ==========================================
function initFermentationEngine() {
  const gSlider = document.getElementById('fermentGlucoseSlider');
  const ySlider = document.getElementById('fermentYieldSlider');
  const gVal = document.getElementById('fermentGlucoseVal');
  const yVal = document.getElementById('fermentYieldVal');
  const ethDisplay = document.getElementById('ethanolYieldDisplay');
  const co2Display = document.getElementById('co2VolDisplay');
  const startBtn = document.getElementById('startFermentBtn');
  const resetBtn = document.getElementById('resetFermentBtn');

  function calculateFermentation() {
    const mass = parseFloat(gSlider.value);
    const yieldPct = parseFloat(ySlider.value);
    const moles = mass / 180.0;

    gVal.textContent = `${mass.toFixed(1)} g (${moles.toFixed(2)} mol)`;
    yVal.textContent = `${yieldPct}% Efficiency`;

    const ethMass = (moles * 2 * 46.0 * (yieldPct / 100)).toFixed(1);
    const co2Vol = (moles * 2 * 24.79 * (yieldPct / 100)).toFixed(2);

    ethDisplay.textContent = `${ethMass} g`;
    co2Display.textContent = `${co2Vol} L`;
  }

  if (gSlider && ySlider) {
    gSlider.addEventListener('input', calculateFermentation);
    ySlider.addEventListener('input', calculateFermentation);
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      soundFX.playBubbles();
      calculateFermentation();
      startBtn.textContent = '⚡ Bio-Fermentation Running...';
      startBtn.disabled = true;
      setTimeout(() => {
        soundFX.playChime();
        startBtn.textContent = '✅ Synthesis Complete!';
        startBtn.disabled = false;
      }, 1500);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      soundFX.playClick();
      gSlider.value = 180;
      ySlider.value = 90;
      calculateFermentation();
      startBtn.textContent = '🚀 Engage Zymase Fermentation';
      startBtn.disabled = false;
    });
  }
}

// ==========================================
// 6. SACCHAROSE HYDROLYSIS ENGINE
// ==========================================
function initHydrolysisEngine() {
  const sSlider = document.getElementById('hydroSaccharoseSlider');
  const sVal = document.getElementById('hydroSaccharoseVal');
  const catSelect = document.getElementById('catalystSelect');
  const gDisplay = document.getElementById('hydroGlucoseDisplay');
  const fDisplay = document.getElementById('hydroFructoseDisplay');
  const tDisplay = document.getElementById('hydroTotalDisplay');
  const runBtn = document.getElementById('runHydrolysisBtn');
  const testAgBtn = document.getElementById('testHydroSilverBtn');

  let hydrolysisDone = false;

  function updateHydrolysis() {
    const mass = parseFloat(sSlider.value);
    const moles = mass / 342.0;
    sVal.textContent = `${mass.toFixed(1)} g (${moles.toFixed(2)} mol)`;

    if (hydrolysisDone && catSelect.value !== 'neutral') {
      const gM = (moles * 180.0).toFixed(1);
      const fM = (moles * 180.0).toFixed(1);
      const tot = (parseFloat(gM) + parseFloat(fM)).toFixed(1);
      gDisplay.textContent = `${gM} g`;
      fDisplay.textContent = `${fM} g`;
      tDisplay.textContent = `${tot} g`;
    } else {
      gDisplay.textContent = '0.0 g';
      fDisplay.textContent = '0.0 g';
      tDisplay.textContent = '0.0 g';
    }
  }

  if (sSlider) sSlider.addEventListener('input', updateHydrolysis);
  if (catSelect) catSelect.addEventListener('change', updateHydrolysis);

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      soundFX.playClick();
      if (catSelect.value === 'neutral') {
        soundFX.playBuzzer();
        alert('⚠️ Hydrolysis requires an Acid (H+) or Enzyme (Invertase) catalyst! In neutral water, saccharose does not hydrolyze.');
        hydrolysisDone = false;
      } else {
        soundFX.playChime();
        hydrolysisDone = true;
      }
      updateHydrolysis();
    });
  }

  if (testAgBtn) {
    testAgBtn.addEventListener('click', () => {
      soundFX.playClick();
      if (hydrolysisDone && catSelect.value !== 'neutral') {
        soundFX.playChime();
        alert('🪞 Positive Silver Mirror Verified! Neutralized hydrolysate contains free Glucose and Fructose, which reduce ammoniacal AgNO3 to a brilliant silver mirror (1 mol saccharose produces reducing sugars that yield 4 mol Ag)!');
      } else {
        soundFX.playBuzzer();
        alert('❌ Negative Silver Mirror! Unhydrolyzed saccharose cannot reduce AgNO3/NH3.');
      }
    });
  }
}

// ==========================================
// 7. FLIGHT READINESS QUIZ COMPONENT
// ==========================================
const QUIZ_QUESTIONS = [
  {
    id: 1,
    badge: 'Formula Telemetry',
    question: 'Which of the following elements is strictly absent from all carbohydrate molecules?',
    options: [
      { id: 'A', text: 'Carbon (C)' },
      { id: 'B', text: 'Hydrogen (H)' },
      { id: 'C', text: 'Chlorine (Cl)' },
      { id: 'D', text: 'Oxygen (O)' }
    ],
    correct: 'C',
    explanation: 'Carbohydrates are composed solely of Carbon, Hydrogen, and Oxygen according to the general formula Cn(H2O)m. Halogens like Chlorine (Cl) are absent.'
  },
  {
    id: 2,
    badge: 'Silver Mirror Stoichiometry',
    question: 'How many moles of metallic silver (Ag) are produced from the complete oxidation of 1.0 mole of glucose with ammoniacal silver nitrate?',
    options: [
      { id: 'A', text: '1.0 mol Ag' },
      { id: 'B', text: '2.0 mol Ag' },
      { id: 'C', text: '3.0 mol Ag' },
      { id: 'D', text: '4.0 mol Ag' }
    ],
    correct: 'B',
    explanation: 'Each molecule of glucose contains one aldehyde (-CHO) group, reducing 2 Ag+ ions to 2 Ag atoms: C6H12O6 + Ag2O → C6H12O7 + 2Ag↓.'
  },
  {
    id: 3,
    badge: 'Selective Reactivity',
    question: 'Why does pure saccharose produce a negative result in the direct silver mirror test, whereas glucose forms a brilliant reflective mirror?',
    options: [
      { id: 'A', text: 'Saccharose has too high a density to dissolve in water.' },
      { id: 'B', text: 'Glucose contains an active aldehyde group (-CHO), whereas saccharose has no free aldehyde group.' },
      { id: 'C', text: 'Saccharose decomposes immediately when brought into contact with ammonia.' },
      { id: 'D', text: 'Glucose reacts only as an acid and neutralizes silver ions.' }
    ],
    correct: 'B',
    explanation: 'Glucose has a free aldehyde group (-CHO) in open-chain equilibrium that acts as a reducing agent. In saccharose, the anomeric carbons are locked in a glycosidic bond, leaving no free aldehyde group.'
  },
  {
    id: 4,
    badge: 'Fermentation Telemetry',
    question: 'Under yeast enzyme catalysis, what are the primary products formed from the biochemical fermentation of glucose?',
    options: [
      { id: 'A', text: 'Ethylic alcohol (C₂H₅OH) and carbon dioxide gas (CO₂)' },
      { id: 'B', text: 'Acetic acid (CH₃COOH) and hydrogen gas (H₂)' },
      { id: 'C', text: 'Glycerol (C₃H₅(OH)₃) and oxygen gas (O₂)' },
      { id: 'D', text: 'Methane (CH₄) and water vapor (H₂O)' }
    ],
    correct: 'A',
    explanation: 'Alcohol fermentation converts glucose into ethanol and carbon dioxide: C6H12O6 → 2C2H5OH + 2CO2↑.'
  },
  {
    id: 5,
    badge: 'Hydrolysis Cleavage',
    question: 'When 1 mole of saccharose undergoes complete acid-catalyzed hydrolysis, which monosaccharide units are produced?',
    options: [
      { id: 'A', text: '2 moles of glucose' },
      { id: 'B', text: '2 moles of fructose' },
      { id: 'C', text: '1 mole of glucose and 1 mole of fructose' },
      { id: 'D', text: '1 mole of glucose and 1 mole of galactose' }
    ],
    correct: 'C',
    explanation: 'Saccharose is a disaccharide made of glucose and fructose units. Hydrolysis breaks the glycosidic bond: C12H22O11 + H2O → C6H12O6 (glucose) + C6H12O6 (fructose).'
  }
];

function initFlightQuiz() {
  const container = document.getElementById('quizContainer');
  const scoreBadge = document.getElementById('quizScoreBadge');
  if (!container) return;

  let score = 0;
  let answeredCount = 0;

  container.innerHTML = '';

  QUIZ_QUESTIONS.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.id = `quizCard_${q.id}`;

    const header = document.createElement('div');
    header.className = 'quiz-header';
    header.innerHTML = `
      <span class="quiz-badge">${q.badge}</span>
      <span style="font-size:0.75rem; color:var(--text-muted);">Problem ${idx + 1} of 5</span>
    `;

    const prompt = document.createElement('div');
    prompt.style.fontSize = '0.92rem';
    prompt.style.fontWeight = '600';
    prompt.textContent = q.question;

    const optList = document.createElement('div');
    optList.className = 'quiz-options';

    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="option-letter">${opt.id}</span>
        <span>${opt.text}</span>
      `;

      btn.addEventListener('click', () => {
        if (card.dataset.answered) return;
        card.dataset.answered = 'true';
        answeredCount++;

        const isCorrect = opt.id === q.correct;
        if (isCorrect) {
          btn.classList.add('selected-correct');
          card.classList.add('answered-correct');
          soundFX.playChime();
          score++;
        } else {
          btn.classList.add('selected-wrong');
          card.classList.add('answered-wrong');
          soundFX.playBuzzer();

          // Highlight the correct one
          const correctBtn = Array.from(optList.children).find(b => b.querySelector('.option-letter').textContent === q.correct);
          if (correctBtn) correctBtn.classList.add('selected-correct');
        }

        // Disable all buttons in this card
        Array.from(optList.children).forEach(b => (b.disabled = true));

        // Show explanation
        const expl = card.querySelector('.quiz-explanation');
        if (expl) expl.classList.add('show');

        // Update Score Badge
        scoreBadge.textContent = `Score: ${score} / 5`;

        if (answeredCount === QUIZ_QUESTIONS.length && score === 5) {
          triggerConfetti();
        }
      });

      optList.appendChild(btn);
    });

    const explBox = document.createElement('div');
    explBox.className = 'quiz-explanation';
    explBox.innerHTML = `<strong>Telemetry Analysis:</strong> ${q.explanation}`;

    card.appendChild(header);
    card.appendChild(prompt);
    card.appendChild(optList);
    card.appendChild(explBox);
    container.appendChild(card);
  });
}

function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    r: Math.random() * 6 + 3,
    color: ['#38bdf8', '#34d399', '#fbbf24', '#f43f5e', '#a855f7'][Math.floor(Math.random() * 5)],
    vx: Math.random() * 4 - 2,
    vy: Math.random() * 4 + 2
  }));

  let frames = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    frames++;
    if (frames < 120) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// ==========================================
// 8. TABS & INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initMolecule3D();
  initSilverMirrorLab();
  initFermentationEngine();
  initHydrolysisEngine();
  initFlightQuiz();

  // KaTeX rendering
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }

  // Navigation Tabs
  const navTabs = document.querySelectorAll('.nav-tab');
  const panes = document.querySelectorAll('.sector-pane');

  navTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      soundFX.playClick();
      const sectorId = tab.dataset.sector;

      navTabs.forEach((t) => t.classList.remove('active'));
      panes.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(sectorId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Sound Toggle
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundFX.muted = !soundFX.muted;
      soundIcon.textContent = soundFX.muted ? '🔇' : '🔊';
      soundBtn.style.opacity = soundFX.muted ? '0.6' : '1';
    });
  }

  // Molecule 3D Toolbar Controls
  const switchBtn = document.getElementById('switchMoleculeBtn');
  const rotateBtn = document.getElementById('toggle3dRotateBtn');
  const resetBtn = document.getElementById('reset3dViewBtn');
  const titleEl = document.getElementById('moleculeTitle');
  const molarMassEl = document.getElementById('moleculeMolarMass');
  const labelEl = document.getElementById('currentModelLabel');

  if (switchBtn) {
    switchBtn.addEventListener('click', () => {
      soundFX.playClick();
      if (currentMoleculeType === 'glucose') {
        currentMoleculeType = 'saccharose';
        switchBtn.textContent = '🔄 Switch to Glucose';
        titleEl.innerHTML = 'Saccharose ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$) • Disaccharide Glycosidic Bridge';
        molarMassEl.textContent = 'M = 342 g/mol';
        labelEl.textContent = 'Saccharose Disaccharide';
      } else {
        currentMoleculeType = 'glucose';
        switchBtn.textContent = '🔄 Switch to Saccharose';
        titleEl.innerHTML = 'Glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) • Hexose Pyranose Ring';
        molarMassEl.textContent = 'M = 180 g/mol';
        labelEl.textContent = 'Glucose Pyranose Ring';
      }
      buildMolecule(currentMoleculeType);
      if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(titleEl, {
          delimiters: [{ left: '$', right: '$', display: false }],
          throwOnError: false
        });
      }
    });
  }

  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      soundFX.playClick();
      autoRotate = !autoRotate;
      rotateBtn.classList.toggle('active', autoRotate);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      soundFX.playClick();
      if (camera) camera.position.set(0, 0, 16);
      if (controls) controls.reset();
    });
  }
});
