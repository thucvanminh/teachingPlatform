/**
 * ORBITAL BIO-REACTOR LAB - LESSON 30: STARCH & CELLULOSE
 * POLYSACCHARIDES (C6H10O5)n & (C6H10O5)m
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

function spawnBubbles(container, count = 8) {
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = 4 + Math.random() * 6;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${10 + Math.random() * 80}%`;
    b.style.animationDelay = `${(Math.random() * 1.4).toFixed(2)}s`;
    b.style.animationDuration = `${(1.2 + Math.random() * 0.9).toFixed(2)}s`;
    container.appendChild(b);
  }
}

function clearBubbles(container) {
  if (container) container.innerHTML = '';
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
// 3. THREE.JS 3D POLYMER SIMULATOR
// ==========================================
let scene, camera, renderer, controls, polymerGroup;
let autoRotate = true;
let currentPolymerType = 'starch'; // 'starch' | 'cellulose'

function initPolymer3D() {
  const container = document.getElementById('molecule3dCanvasContainer');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 500;
  const height = container.clientHeight || 300;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 1.5, 16);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
  }

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.72);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.25);
  dirLight1.position.set(10, 15, 10);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.85);
  dirLight2.position.set(-10, -10, -10);
  scene.add(dirLight2);

  buildPolymer(currentPolymerType);

  window.addEventListener('resize', () => {
    if (!container || !renderer || !camera) return;
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
    if (autoRotate && polymerGroup) {
      polymerGroup.rotation.y += 0.0075;
      polymerGroup.rotation.x = Math.sin(Date.now() * 0.0007) * 0.18;
    }
    renderer.render(scene, camera);
  }
  renderLoop();
}

function buildPolymer(type) {
  if (polymerGroup) {
    scene.remove(polymerGroup);
    polymerGroup.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  }

  polymerGroup = new THREE.Group();

  const cMat = new THREE.MeshPhongMaterial({ color: 0x38bdf8, shininess: 90 });
  const oMat = new THREE.MeshPhongMaterial({ color: 0xf43f5e, shininess: 90 });
  const unitMat = new THREE.MeshPhongMaterial({ color: 0x818cf8, shininess: 85 });
  const emeraldMat = new THREE.MeshPhongMaterial({ color: 0x34d399, shininess: 85 });
  const bondMat = new THREE.MeshPhongMaterial({ color: 0x64748b, shininess: 50 });
  const hBondMat = new THREE.MeshPhongMaterial({
    color: 0xfbbf24,
    shininess: 60,
    transparent: true,
    opacity: 0.72
  });

  function addSphere(x, y, z, mat, radius) {
    const geo = new THREE.SphereGeometry(radius, 22, 22);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    polymerGroup.add(mesh);
    return mesh.position;
  }

  function addCylinder(posA, posB, radius, mat) {
    const dir = new THREE.Vector3().subVectors(posB, posA);
    const len = dir.length();
    if (len < 0.001) return;
    const geo = new THREE.CylinderGeometry(radius, radius, len, 12);
    const mesh = new THREE.Mesh(geo, mat);
    const mid = new THREE.Vector3().addVectors(posA, posB).multiplyScalar(0.5);
    mesh.position.copy(mid);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    polymerGroup.add(mesh);
  }

  if (type === 'starch') {
    // Helical Starch Coil (Amylose-style spiral of C6H10O5 units + Oxygen bridges)
    const numUnits = 15;
    const helixRadius = 2.6;
    const pitch = 0.65;
    const unitPositions = [];

    for (let i = 0; i < numUnits; i++) {
      const t = i * 0.78;
      const x = (i - (numUnits - 1) / 2) * pitch;
      const y = Math.cos(t) * helixRadius;
      const z = Math.sin(t) * helixRadius;

      // Primary pyranose unit cluster (carbon ring hub + peripheral O marker)
      const hubPos = addSphere(x, y, z, cMat, 0.58);
      unitPositions.push(hubPos);

      // Add side CH2OH / OH highlight node radially outward
      const outY = y + Math.cos(t) * 0.95;
      const outZ = z + Math.sin(t) * 0.95;
      const sidePos = addSphere(x, outY, outZ, unitMat, 0.32);
      addCylinder(hubPos, sidePos, 0.08, bondMat);
    }

    // Glycosidic Oxygen bridges connecting consecutive spiral units
    for (let i = 0; i < numUnits - 1; i++) {
      const mid = new THREE.Vector3().addVectors(unitPositions[i], unitPositions[i + 1]).multiplyScalar(0.5);
      const oPos = addSphere(mid.x, mid.y, mid.z, oMat, 0.36);
      addCylinder(unitPositions[i], oPos, 0.11, bondMat);
      addCylinder(oPos, unitPositions[i + 1], 0.11, bondMat);
    }

    // Subtle glowing helical axis reference core
    const axisStart = new THREE.Vector3(-5.2, 0, 0);
    const axisEnd = new THREE.Vector3(5.2, 0, 0);
    addCylinder(axisStart, axisEnd, 0.06, hBondMat);
  } else {
    // Cellulose Microfibril: 3 Parallel Linear Beta-1,4 Chains with Inter-Chain Hydrogen Bonds
    const chainOffsets = [
      { y: 2.2, z: 0 },
      { y: 0.0, z: 0.4 },
      { y: -2.2, z: -0.2 }
    ];
    const unitsPerChain = 7;
    const spacing = 1.65;
    const allChains = [];

    chainOffsets.forEach((offset) => {
      const chainNodes = [];
      for (let i = 0; i < unitsPerChain; i++) {
        const x = (i - (unitsPerChain - 1) / 2) * spacing;
        const zigzagY = offset.y + (i % 2 === 0 ? 0.16 : -0.16);
        const nodePos = addSphere(x, zigzagY, offset.z, emeraldMat, 0.55);
        chainNodes.push(nodePos);

        // Side hydroxyl marker
        const ohY = zigzagY + (i % 2 === 0 ? 0.72 : -0.72);
        const ohPos = addSphere(x, ohY, offset.z, oMat, 0.28);
        addCylinder(nodePos, ohPos, 0.08, bondMat);
      }

      // Linear glycosidic oxygen bridges along each chain
      for (let i = 0; i < unitsPerChain - 1; i++) {
        const mid = new THREE.Vector3().addVectors(chainNodes[i], chainNodes[i + 1]).multiplyScalar(0.5);
        const bridgeO = addSphere(mid.x, mid.y, mid.z, oMat, 0.34);
        addCylinder(chainNodes[i], bridgeO, 0.11, bondMat);
        addCylinder(bridgeO, chainNodes[i + 1], 0.11, bondMat);
      }
      allChains.push(chainNodes);
    });

    // Cross-linking Hydrogen bonds locking parallel chains into a rigid microfibril
    for (let c = 0; c < allChains.length - 1; c++) {
      for (let i = 1; i < unitsPerChain - 1; i += 2) {
        addCylinder(allChains[c][i], allChains[c + 1][i], 0.07, hBondMat);
      }
    }
  }

  scene.add(polymerGroup);
}

// ==========================================
// 4. IODINE COLORIMETRIC BENCH ENGINE
// ==========================================
function initIodineBench() {
  const samplePills = document.querySelectorAll('.sample-pill');
  const liquid = document.getElementById('iodineTubeLiquid');
  const bubbles = document.getElementById('iodineBubbles');
  const solidChip = document.getElementById('iodineSolidChip');
  const tempSlider = document.getElementById('iodineTempSlider');
  const tempDisplay = document.getElementById('iodineTempDisplay');
  const colorDisplay = document.getElementById('iodineColorDisplay');
  const statusDisplay = document.getElementById('iodineStatusDisplay');
  const sampleUnit = document.getElementById('iodineSampleUnit');
  const addIodineBtn = document.getElementById('addIodineBtn');
  const coolRecoverBtn = document.getElementById('coolRecoverBtn');
  const resetBtn = document.getElementById('resetIodineBtn');

  const SAMPLES = {
    starch: {
      name: 'Starch Paste (1%)',
      baseLiquid: 'rgba(226, 232, 240, 0.42)',
      baseColorText: 'Milky Suspension',
      hasChip: false,
      chipColor: 'transparent',
      reacts: 'strong'
    },
    cellulose: {
      name: 'Cellulose Fiber (Cotton)',
      baseLiquid: 'rgba(186, 230, 253, 0.25)',
      baseColorText: 'Clear Water + White Fiber',
      hasChip: true,
      chipColor: '#f8fafc',
      reacts: 'none'
    },
    green_banana: {
      name: 'Green Unripe Banana',
      baseLiquid: 'rgba(186, 230, 253, 0.25)',
      baseColorText: 'Pale Green Pulp',
      hasChip: true,
      chipColor: '#bef264',
      reacts: 'strong'
    },
    ripe_banana: {
      name: 'Ripe Yellow Banana',
      baseLiquid: 'rgba(254, 240, 138, 0.28)',
      baseColorText: 'Soft Yellow Pulp',
      hasChip: true,
      chipColor: '#fde047',
      reacts: 'trace'
    }
  };

  let currentSampleKey = 'starch';
  let iodineAdded = false;
  let wasHotFaded = false;

  function updateBenchVisuals(triggerAudio = false) {
    const sample = SAMPLES[currentSampleKey];
    const temp = parseInt(tempSlider.value, 10);

    tempDisplay.textContent = `${temp}°C`;
    sampleUnit.textContent = sample.name;

    if (temp >= 70) {
      spawnBubbles(bubbles, 8);
    } else {
      clearBubbles(bubbles);
    }

    if (!iodineAdded) {
      liquid.style.height = '58%';
      liquid.style.background = sample.baseLiquid;
      liquid.style.boxShadow = 'none';
      if (sample.hasChip) {
        solidChip.classList.add('visible');
        solidChip.style.background = sample.chipColor;
      } else {
        solidChip.classList.remove('visible');
      }
      colorDisplay.textContent = sample.baseColorText;
      colorDisplay.style.color = 'var(--cyan-glow)';
      statusDisplay.textContent = 'Awaiting I₂';
      statusDisplay.style.color = 'var(--cyan-glow)';
      return;
    }

    // Iodine has been added
    liquid.style.height = '66%';

    if (sample.reacts === 'strong') {
      if (temp <= 45) {
        liquid.style.background = 'linear-gradient(180deg, rgba(67, 56, 202, 0.92), rgba(30, 27, 75, 0.96))';
        liquid.style.boxShadow = '0 0 24px rgba(99, 102, 241, 0.55)';
        if (sample.hasChip) {
          solidChip.classList.add('visible');
          solidChip.style.background = '#312e81';
        }
        colorDisplay.textContent = 'Deep Blue-Violet';
        colorDisplay.style.color = '#818cf8';
        statusDisplay.textContent = wasHotFaded ? 'Cooling Recovery!' : 'Complex Formed';
        statusDisplay.style.color = 'var(--emerald-glow)';
        if (triggerAudio && wasHotFaded) {
          soundFX.playChime();
          wasHotFaded = false;
        }
      } else if (temp <= 69) {
        liquid.style.background = 'linear-gradient(180deg, rgba(99, 102, 241, 0.5), rgba(49, 46, 129, 0.55))';
        liquid.style.boxShadow = '0 0 10px rgba(99, 102, 241, 0.25)';
        if (sample.hasChip) {
          solidChip.classList.add('visible');
          solidChip.style.background = '#6366f1';
        }
        colorDisplay.textContent = 'Fading Violet';
        colorDisplay.style.color = 'var(--amber-glow)';
        statusDisplay.textContent = 'Helix Uncoiling';
        statusDisplay.style.color = 'var(--amber-glow)';
      } else {
        liquid.style.background = 'rgba(251, 191, 36, 0.14)';
        liquid.style.boxShadow = 'none';
        if (sample.hasChip) {
          solidChip.classList.add('visible');
          solidChip.style.background = sample.chipColor;
        }
        colorDisplay.textContent = 'Colorless / Pale';
        colorDisplay.style.color = 'var(--rose-glow)';
        statusDisplay.textContent = 'Thermally Faded';
        statusDisplay.style.color = 'var(--rose-glow)';
        wasHotFaded = true;
      }
    } else if (sample.reacts === 'none') {
      liquid.style.background = 'rgba(217, 119, 6, 0.28)';
      liquid.style.boxShadow = 'none';
      solidChip.classList.add('visible');
      solidChip.style.background = '#f8fafc';
      colorDisplay.textContent = 'Pale Amber (I₂ Tint)';
      colorDisplay.style.color = 'var(--amber-glow)';
      statusDisplay.textContent = 'Negative (No Reaction)';
      statusDisplay.style.color = 'var(--rose-glow)';
    } else {
      // Ripe banana trace
      liquid.style.background = 'rgba(217, 119, 6, 0.26)';
      liquid.style.boxShadow = 'none';
      solidChip.classList.add('visible');
      solidChip.style.background = '#eab308';
      colorDisplay.textContent = 'Faint Amber / Trace';
      colorDisplay.style.color = 'var(--amber-glow)';
      statusDisplay.textContent = 'Starch Converted to Sugar';
      statusDisplay.style.color = 'var(--amber-glow)';
    }
  }

  samplePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      soundFX.playClick();
      samplePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentSampleKey = pill.dataset.sample;
      iodineAdded = false;
      wasHotFaded = false;
      addIodineBtn.disabled = false;
      addIodineBtn.textContent = '💧 Add Iodine (I₂) Drops';
      tempSlider.value = 25;
      updateBenchVisuals(false);
    });
  });

  if (addIodineBtn) {
    addIodineBtn.addEventListener('click', () => {
      iodineAdded = true;
      wasHotFaded = false;
      const sample = SAMPLES[currentSampleKey];
      const temp = parseInt(tempSlider.value, 10);
      if (sample.reacts === 'strong' && temp < 70) {
        soundFX.playChime();
      } else {
        soundFX.playBuzzer();
      }
      addIodineBtn.textContent = '✅ Iodine Added';
      addIodineBtn.disabled = true;
      updateBenchVisuals(false);
    });
  }

  if (tempSlider) {
    tempSlider.addEventListener('input', () => {
      updateBenchVisuals(true);
    });
  }

  if (coolRecoverBtn) {
    coolRecoverBtn.addEventListener('click', () => {
      soundFX.playClick();
      tempSlider.value = 25;
      updateBenchVisuals(true);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      soundFX.playClick();
      iodineAdded = false;
      wasHotFaded = false;
      tempSlider.value = 25;
      addIodineBtn.disabled = false;
      addIodineBtn.textContent = '💧 Add Iodine (I₂) Drops';
      updateBenchVisuals(false);
    });
  }

  updateBenchVisuals(false);
}

// ==========================================
// 5. ACID HYDROLYSIS & STOICHIOMETRY ENGINE
// ==========================================
function initHydrolysisLab() {
  const steps = [
    document.getElementById('hydroStep1'),
    document.getElementById('hydroStep2'),
    document.getElementById('hydroStep3'),
    document.getElementById('hydroStep4')
  ];
  const bathBadge = document.getElementById('hydroBathBadge');
  const tube1Liquid = document.getElementById('tube1Liquid');
  const tube2Liquid = document.getElementById('tube2Liquid');
  const tube1Bubbles = document.getElementById('tube1Bubbles');
  const tube2Bubbles = document.getElementById('tube2Bubbles');
  const tube1Status = document.getElementById('tube1Status');
  const tube2Status = document.getElementById('tube2Status');
  const actionBtn = document.getElementById('hydroActionBtn');
  const resetBtn = document.getElementById('resetHydroExpBtn');
  const resultBox = document.getElementById('hydroExpResult');

  let hydroStep = 1;

  function setHydroStepper(activeStep) {
    steps.forEach((node, idx) => {
      if (!node) return;
      if (idx + 1 < activeStep) node.className = 'step-node done';
      else if (idx + 1 === activeStep) node.className = 'step-node active';
      else node.className = 'step-node';
    });
  }

  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      if (hydroStep === 1) {
        soundFX.playClick();
        tube1Liquid.style.height = '58%';
        tube2Liquid.style.height = '58%';
        tube1Liquid.style.background = 'rgba(226, 232, 240, 0.32)';
        tube2Liquid.style.background = 'rgba(226, 232, 240, 0.36)';
        tube1Status.textContent = 'Starch + HCl 2 M';
        tube2Status.textContent = 'Starch + Distilled H₂O';
        hydroStep = 2;
        setHydroStepper(2);
        actionBtn.textContent = '🔥 Step 2: Heat Both Tubes (100°C, 10 min)';
        resultBox.innerHTML = '<span class="callout-icon">🧪</span><div><strong>Reagents Added:</strong> Tube 1 contains $\\text{HCl } 2\\text{ M}$ acid catalyst; Tube 2 is the acid-free water control. Now heat both tubes in a boiling water bath.</div>';
        renderKatexIn(resultBox);
      } else if (hydroStep === 2) {
        soundFX.playBubbles();
        bathBadge.textContent = '100°C Boiling Bath (10 min)';
        bathBadge.classList.add('hot');
        spawnBubbles(tube1Bubbles, 7);
        spawnBubbles(tube2Bubbles, 7);
        tube1Liquid.style.background = 'rgba(186, 230, 253, 0.25)';
        tube1Status.textContent = 'Hydrolyzing to Glucose...';
        tube2Status.textContent = 'Hot Starch Paste (No Acid)';
        hydroStep = 3;
        setHydroStepper(3);
        actionBtn.textContent = '❄️ Step 3: Cool Both Tubes to 25°C';
        resultBox.innerHTML = '<span class="callout-icon">🔥</span><div><strong>Boiling Water Bath (10 min):</strong> Acidic $\\text{H}^+$ ions cleave the glycosidic bonds in Tube 1, converting starch into soluble glucose. Tube 2 remains unhydrolyzed starch.</div>';
        renderKatexIn(resultBox);
      } else if (hydroStep === 3) {
        soundFX.playClick();
        bathBadge.textContent = '25°C Cooled';
        bathBadge.classList.remove('hot');
        clearBubbles(tube1Bubbles);
        clearBubbles(tube2Bubbles);
        tube1Status.textContent = 'Cooled Glucose Solution';
        tube2Status.textContent = 'Cooled Starch Paste';
        hydroStep = 4;
        setHydroStepper(4);
        actionBtn.textContent = '💧 Step 4: Drop Iodine (I₂) into Both Tubes';
        resultBox.innerHTML = '<span class="callout-icon">❄️</span><div><strong>Cooled to 25°C:</strong> Cooling ensures accurate iodine testing (preventing thermal fading). Now drop $\\text{I}_2$ solution into both tubes!</div>';
        renderKatexIn(resultBox);
      } else if (hydroStep === 4) {
        soundFX.playChime();
        tube1Liquid.style.background = 'rgba(217, 119, 6, 0.30)';
        tube1Liquid.style.boxShadow = 'none';
        tube2Liquid.style.background = 'linear-gradient(180deg, rgba(67, 56, 202, 0.92), rgba(30, 27, 75, 0.96))';
        tube2Liquid.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.55)';
        tube1Status.textContent = 'Amber (NO Blue-Violet!)';
        tube2Status.textContent = 'Deep Blue-Violet (Intact Starch)';
        steps.forEach((n) => {
          if (n) n.className = 'step-node done';
        });
        actionBtn.textContent = '✅ Hydrolysis Verified!';
        actionBtn.disabled = true;
        resultBox.className = 'callout-box emerald';
        resultBox.innerHTML = '<span class="callout-icon">✅</span><div><strong>Conclusion Proven:</strong> Tube 1 shows <strong>no blue-violet color</strong> because starch was completely hydrolyzed by $\\text{HCl}$ into glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$). Tube 2 turns <strong>deep blue-violet</strong> because starch remained unhydrolyzed.</div>';
        renderKatexIn(resultBox);
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      soundFX.playClick();
      hydroStep = 1;
      setHydroStepper(1);
      bathBadge.textContent = '25°C Ambient';
      bathBadge.classList.remove('hot');
      clearBubbles(tube1Bubbles);
      clearBubbles(tube2Bubbles);
      tube1Liquid.style.height = '35%';
      tube2Liquid.style.height = '35%';
      tube1Liquid.style.background = 'rgba(226, 232, 240, 0.35)';
      tube2Liquid.style.background = 'rgba(226, 232, 240, 0.35)';
      tube1Liquid.style.boxShadow = 'none';
      tube2Liquid.style.boxShadow = 'none';
      tube1Status.textContent = 'Starch Paste (1%)';
      tube2Status.textContent = 'Starch Paste (1%)';
      actionBtn.disabled = false;
      actionBtn.textContent = '🧪 Step 1: Add HCl 2 M (Tube 1) & H₂O (Tube 2)';
      resultBox.className = 'callout-box';
      resultBox.innerHTML = '<span class="callout-icon">📋</span><div><strong>Protocol Ready:</strong> Both tubes initially contain $2\\text{ mL}$ of 1% starch paste. Add $\\text{HCl } 2\\text{ M}$ to Tube 1 and distilled water to Tube 2 to begin.</div>';
      renderKatexIn(resultBox);
    });
  }

  // Stoichiometry Calculator
  const mSlider = document.getElementById('stoichMassSlider');
  const pSlider = document.getElementById('stoichPuritySlider');
  const ySlider = document.getElementById('stoichYieldSlider');
  const mVal = document.getElementById('stoichMassVal');
  const pVal = document.getElementById('stoichPurityVal');
  const yVal = document.getElementById('stoichYieldVal');
  const gDisplay = document.getElementById('stoichGlucoseDisplay');
  const gMolUnit = document.getElementById('stoichGlucoseMolUnit');
  const eDisplay = document.getElementById('stoichEthanolDisplay');
  const cDisplay = document.getElementById('stoichCo2Display');

  function updateStoichiometry() {
    if (!mSlider || !pSlider || !ySlider) return;
    const sampleMass = parseFloat(mSlider.value);
    const purity = parseFloat(pSlider.value);
    const yieldPct = parseFloat(ySlider.value);

    const purePolymerMass = sampleMass * (purity / 100);
    const molesUnit = purePolymerMass / 162.0;
    const molesGlucose = molesUnit * (yieldPct / 100);
    const glucoseMass = molesGlucose * 180.0;
    const molesEthanol = molesGlucose * 2.0;
    const ethanolMass = molesEthanol * 46.0;
    const co2Volume = molesEthanol * 24.79;

    mVal.textContent = `${sampleMass.toFixed(1)} g`;
    pVal.textContent = `${purity}% Pure (${molesUnit.toFixed(2)} mol unit)`;
    yVal.textContent = `${yieldPct}% Overall Yield`;

    gDisplay.textContent = `${glucoseMass.toFixed(1)} g`;
    gMolUnit.textContent = `${molesGlucose.toFixed(2)} mol C₆H₁₂O₆`;
    eDisplay.textContent = `${ethanolMass.toFixed(1)} g`;
    cDisplay.textContent = `${co2Volume.toFixed(2)} L`;
  }

  [mSlider, pSlider, ySlider].forEach((s) => {
    if (s) s.addEventListener('input', updateStoichiometry);
  });
  updateStoichiometry();
}

// ==========================================
// 6. PHOTOSYNTHESIS & ENZYME SPECIFICITY
// ==========================================
function initPhotosynthesisAndEnzymes() {
  const overallBtn = document.getElementById('pathwayOverallBtn');
  const twoStageBtn = document.getElementById('pathwayTwoStageBtn');
  const eqArea = document.getElementById('photoEquationArea');
  const flowArea = document.getElementById('photoFlowArea');
  const captionArea = document.getElementById('photoCaption');

  if (overallBtn && twoStageBtn) {
    overallBtn.addEventListener('click', () => {
      soundFX.playClick();
      overallBtn.classList.add('active');
      twoStageBtn.classList.remove('active');
      eqArea.innerHTML = '$$6n\\text{CO}_2 + 5n\\text{H}_2\\text{O} \\xrightarrow{\\text{chlorophyll, light}} (\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + 6n\\text{O}_2\\uparrow$$';
      flowArea.innerHTML = `
        <div class="cycle-node"><strong>Inputs</strong><span>$\\text{CO}_2 + \\text{H}_2\\text{O}$</span></div>
        <span class="cycle-arrow">&rarr;</span>
        <div class="cycle-node" style="border-color:var(--emerald-glow);"><strong>Chlorophyll + Light</strong><span>Solar Catalysis</span></div>
        <span class="cycle-arrow">&rarr;</span>
        <div class="cycle-node" style="border-color:var(--cyan-glow);"><strong>Polymers + $\\text{O}_2\\uparrow$</strong><span>Starch &amp; Cellulose</span></div>
      `;
      captionArea.innerHTML = 'Plants capture sunlight via chlorophyll to synthesize glucose, then polymerize it into <strong>starch</strong> (energy reserve) and <strong>cellulose</strong> (rigid cell walls) while releasing $\\text{O}_2$.';
      renderKatexIn(document.getElementById('photosynthesisBox'));
    });

    twoStageBtn.addEventListener('click', () => {
      soundFX.playClick();
      twoStageBtn.classList.add('active');
      overallBtn.classList.remove('active');
      eqArea.innerHTML = '$$6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{chlorophyll, light}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2\\uparrow$$';
      flowArea.innerHTML = `
        <div class="cycle-node"><strong>Stage 1</strong><span>Glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$)</span></div>
        <span class="cycle-arrow">&rarr;</span>
        <div class="cycle-node" style="border-color:var(--amber-glow);"><strong>Starch Reserve</strong><span>Seeds, Tubers, Roots</span></div>
        <span class="cycle-arrow">/</span>
        <div class="cycle-node" style="border-color:var(--emerald-glow);"><strong>Cellulose Wall</strong><span>Stems, Wood, Cotton</span></div>
      `;
      captionArea.innerHTML = 'Stage 2 polymerizes glucose intermediates ($n\\text{C}_6\\text{H}_{12}\\text{O}_6 \\to (\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\text{H}_2\\text{O}$) into energy-storing <strong>starch</strong> or structural <strong>cellulose</strong>.';
      renderKatexIn(document.getElementById('photosynthesisBox'));
    });
  }

  // Enzyme Lock-and-Key Tester
  const subSelect = document.getElementById('enzymeSubstrateSelect');
  const enzSelect = document.getElementById('enzymeTypeSelect');
  const testBtn = document.getElementById('testEnzymeBtn');
  const subPill = document.getElementById('lkSubstratePill');
  const enzPill = document.getElementById('lkEnzymePill');
  const statusPill = document.getElementById('lkResultStatus');
  const explEl = document.getElementById('lkExplanation');

  if (testBtn) {
    testBtn.addEventListener('click', () => {
      const sub = subSelect.value;
      const enz = enzSelect.value;

      subPill.textContent = sub === 'starch' ? 'Starch Helix' : 'Cellulose Microfibril';
      enzPill.textContent =
        enz === 'amylase' ? 'Human Amylase' : enz === 'cellulase' ? 'Microbial Cellulase' : 'Pure Water (No Enzyme)';

      if (sub === 'starch' && enz === 'amylase') {
        soundFX.playChime();
        statusPill.className = 'lk-status match';
        statusPill.textContent = 'Catalytic Match -> Glucose!';
        explEl.innerHTML = '<strong>Digestible Energy Fuel:</strong> Human saliva and small intestine secrete <strong>amylase</strong>, whose active site fits starch helices and hydrolyzes them into glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) for cellular respiration.';
      } else if (sub === 'cellulose' && enz === 'cellulase') {
        soundFX.playChime();
        statusPill.className = 'lk-status match';
        statusPill.textContent = 'Catalytic Match -> Glucose!';
        explEl.innerHTML = '<strong>Herbivore / Termite Symbiosis:</strong> Ruminants (cows) and termites host gut microbes producing <strong>cellulase</strong>, enabling them to hydrolyze plant cellulose into usable glucose.';
      } else if (sub === 'cellulose' && enz === 'amylase') {
        soundFX.playBuzzer();
        statusPill.className = 'lk-status mismatch';
        statusPill.textContent = 'Lock-Key Mismatch (No Digestion)';
        explEl.innerHTML = '<strong>Human Dietary Fiber:</strong> Human amylase cannot recognize cellulose chains, and humans lack cellulase. Cellulose passes through intact as insoluble dietary fiber that stimulates intestinal peristalsis.';
      } else if (sub === 'starch' && enz === 'cellulase') {
        soundFX.playBuzzer();
        statusPill.className = 'lk-status mismatch';
        statusPill.textContent = 'Enzyme Specificity Mismatch';
        explEl.innerHTML = '<strong>Enzyme Specificity:</strong> Cellulase specifically targets the linear linkages of cellulose and does not catalyze starch hydrolysis.';
      } else {
        soundFX.playBuzzer();
        statusPill.className = 'lk-status mismatch';
        statusPill.textContent = 'No Hydrolysis at 37°C';
        explEl.innerHTML = '<strong>Catalyst Required:</strong> Without an acid catalyst (with heat) or a matching enzyme, neither starch nor cellulose hydrolyzes in neutral water.';
      }
      renderKatexIn(explEl);
    });
  }
}

// ==========================================
// 7. FLIGHT READINESS QUIZ COMPONENT
// ==========================================
const QUIZ_QUESTIONS = [
  {
    id: 1,
    badge: 'Polymer Formula & Unit',
    question: 'What is the molar mass of one repeating $\\text{C}_6\\text{H}_{10}\\text{O}_5$ unit in starch and cellulose, and why are they not isomers?',
    options: [
      { id: 'A', text: '162 g/mol; n and m represent different chain lengths' },
      { id: 'B', text: '180 g/mol; both polymers contain identical chain lengths' },
      { id: 'C', text: '162 g/mol; cellulose lacks oxygen atoms in its structure' },
      { id: 'D', text: '342 g/mol; starch is a disaccharide made of two units' }
    ],
    correct: 'A',
    explanation: 'The repeating unit $\\text{C}_6\\text{H}_{10}\\text{O}_5$ has molar mass $6(12)+10(1)+5(16) = 162\\text{ g/mol}$. Because $m \\gg n$, starch and cellulose do not have identical molecular formulas and are not isomers.'
  },
  {
    id: 2,
    badge: 'Physical Solubility',
    question: 'Which statement accurately contrasts the water solubility of starch and cellulose?',
    options: [
      { id: 'A', text: 'Both dissolve completely in cold water to form clear solutions' },
      { id: 'B', text: 'Starch forms paste in hot water; cellulose remains insoluble' },
      { id: 'C', text: 'Cellulose dissolves in hot water while starch stays powdered' },
      { id: 'D', text: 'Neither polysaccharide interacts with water at any temperature' }
    ],
    correct: 'B',
    explanation: 'Starch is insoluble in cold water but swells in hot water to form colloidal starch paste. Cellulose is insoluble in both cold and hot water as well as common organic solvents.'
  },
  {
    id: 3,
    badge: 'Iodine Colorimetry',
    question: 'When aqueous iodine ($\\text{I}_2$) is added to cold starch paste, what happens as the mixture is heated to 85°C and then cooled back to 25°C?',
    options: [
      { id: 'A', text: 'Blue-violet color forms, stays permanent on heating, and deepens' },
      { id: 'B', text: 'No color appears cold, but deep blue-violet forms upon boiling' },
      { id: 'C', text: 'Blue-violet fades when heated and returns upon cooling down' },
      { id: 'D', text: 'Reddish precipitate forms on heating and dissolves when cooled' }
    ],
    correct: 'C',
    explanation: 'Starch helices trap $\\text{I}_2$ molecules to form a deep blue-violet complex. Heating uncoils the helices and fades the color; cooling restores the helices and the blue-violet color returns.'
  },
  {
    id: 4,
    badge: 'Acid Hydrolysis Assay',
    question: 'In Experiment 2 (Tube 1: starch + $\\text{HCl } 2\\text{ M}$; Tube 2: starch + water, both boiled 10 min and cooled), what does adding $\\text{I}_2$ reveal?',
    options: [
      { id: 'A', text: 'Both tubes turn deep blue-violet because acid protects starch' },
      { id: 'B', text: 'Tube 1 turns blue-violet while Tube 2 stays completely clear' },
      { id: 'C', text: 'Both tubes stay amber because boiling destroys all starch' },
      { id: 'D', text: 'Tube 1 shows no blue-violet; Tube 2 turns deep blue-violet' }
    ],
    correct: 'D',
    explanation: 'In Tube 1, $\\text{HCl}$ catalyzes complete hydrolysis of starch into glucose, so no blue-violet color appears with $\\text{I}_2$. In Tube 2, unhydrolyzed starch reacts with $\\text{I}_2$ to give a deep blue-violet color.'
  },
  {
    id: 5,
    badge: 'Enzyme Specificity',
    question: 'Why can human digestion convert cooked rice starch into glucose energy, whereas wood cellulose cannot serve as human cellular fuel?',
    options: [
      { id: 'A', text: 'Human enzymes include amylase for starch, but lack cellulase' },
      { id: 'B', text: 'Cellulose has higher density and evaporates in stomach acid' },
      { id: 'C', text: 'Starch contains free silver ions that accelerate digestion' },
      { id: 'D', text: 'Human saliva contains cellulase that destroys starch quickly' }
    ],
    correct: 'A',
    explanation: 'Human saliva and the small intestine secrete amylase to hydrolyze starch into glucose. Humans lack cellulase, so cellulose cannot be digested for energy and acts instead as dietary fiber.'
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

          const correctBtn = Array.from(optList.children).find(
            (b) => b.querySelector('.option-letter').textContent === q.correct
          );
          if (correctBtn) correctBtn.classList.add('selected-correct');
        }

        Array.from(optList.children).forEach((b) => (b.disabled = true));

        const expl = card.querySelector('.quiz-explanation');
        if (expl) expl.classList.add('show');

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

  renderKatexIn(container);
}

function triggerConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 95 }, () => ({
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
    pieces.forEach((p) => {
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
  initPolymer3D();
  initIodineBench();
  initHydrolysisLab();
  initPhotosynthesisAndEnzymes();
  initFlightQuiz();

  // Render KaTeX across the entire document
  renderKatexIn(document.body);

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

  // Polymer 3D Toolbar Controls
  const switchBtn = document.getElementById('switchMoleculeBtn');
  const rotateBtn = document.getElementById('toggle3dRotateBtn');
  const resetBtn = document.getElementById('reset3dViewBtn');
  const titleEl = document.getElementById('moleculeTitle');
  const molarMassEl = document.getElementById('moleculeMolarMass');
  const labelEl = document.getElementById('currentModelLabel');

  if (switchBtn) {
    switchBtn.addEventListener('click', () => {
      soundFX.playClick();
      if (currentPolymerType === 'starch') {
        currentPolymerType = 'cellulose';
        switchBtn.textContent = '🔄 Switch to Starch';
        titleEl.innerHTML = 'Cellulose ($\\text{C}_6\\text{H}_{10}\\text{O}_5)_m$ &bull; Parallel Microfibril Chains';
        molarMassEl.textContent = 'Unit M = 162 g/mol (m >> n)';
        labelEl.textContent = 'Cellulose Microfibril Chains';
      } else {
        currentPolymerType = 'starch';
        switchBtn.textContent = '🔄 Switch to Cellulose';
        titleEl.innerHTML = 'Starch ($\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$ &bull; Helical Polymer Granule';
        molarMassEl.textContent = 'Unit M = 162 g/mol';
        labelEl.textContent = 'Starch Helical Granule';
      }
      buildPolymer(currentPolymerType);
      renderKatexIn(titleEl);
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
      if (camera) camera.position.set(0, 1.5, 16);
      if (controls) controls.reset();
    });
  }
});
