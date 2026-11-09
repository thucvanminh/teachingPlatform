'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SpaceCockpit3DProps {
  modelUrl?: string; // Optional Cloudinary .glb URL
  className?: string;
  intensity?: number;
}

export function SpaceCockpit3D({ modelUrl, className = '', intensity = 1 }: SpaceCockpit3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070e, 0.0015);

    // 2. Camera setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 400;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x0ea5e9, 0.6 * intensity);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2 * intensity);
    dirLight.position.set(200, 300, 400);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x6366f1, 2 * intensity, 800);
    pointLight.position.set(-200, -100, 200);
    scene.add(pointLight);

    // 5. Procedural 3D Starfield Particles
    const starCount = 1800;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color(0x38bdf8), // Cyan
      new THREE.Color(0x818cf8), // Indigo
      new THREE.Color(0xffffff), // White
      new THREE.Color(0x0284c7), // Deep blue
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 1600;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 1600;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 1600;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[i3] = c.r;
      starColors[i3 + 1] = c.g;
      starColors[i3 + 2] = c.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 6. Holographic Station Rings (Procedural 3D Orbital HUD)
    const ringGroup = new THREE.Group();
    ringGroup.position.set(0, 0, -50);

    const outerRingGeo = new THREE.TorusGeometry(140, 0.8, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
    ringGroup.add(outerRing);

    const innerRingGeo = new THREE.TorusGeometry(100, 0.5, 12, 80);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 3;
    ringGroup.add(innerRing);

    // Central Floating Core (Hologram Dodecahedron)
    const coreGeo = new THREE.DodecahedronGeometry(36, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      wireframe: true,
      emissive: 0x0369a1,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    ringGroup.add(coreMesh);

    scene.add(ringGroup);

    // 7. Dynamic GLTF / GLB Model loader from Cloudinary if provided
    let loadedModel: THREE.Object3D | null = null;
    if (modelUrl) {
      import('three/examples/jsm/loaders/GLTFLoader.js').then(({ GLTFLoader }) => {
        const loader = new GLTFLoader();
        loader.load(
          modelUrl,
          (gltf) => {
            loadedModel = gltf.scene;
            loadedModel.scale.set(1.5, 1.5, 1.5);
            loadedModel.position.set(0, -20, 0);
            scene.add(loadedModel);
            // Hide procedural core once realistic model is loaded
            coreMesh.visible = false;
          },
          undefined,
          (err) => console.warn('Could not load custom 3D model, using procedural HUD:', err),
        );
      });
    }

    // 8. Mouse interaction (Parallax Camera Movement)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (event.clientX - halfW) * 0.08;
      mouseY = (event.clientY - halfH) * 0.08;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 9. Resize listener
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop (60-120fps)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation (Parallax)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(0, 0, 0);

      // Rotate starfield slowly
      starField.rotation.y = elapsedTime * 0.02;
      starField.rotation.x = elapsedTime * 0.008;

      // Rotate orbital rings
      ringGroup.rotation.z = elapsedTime * 0.08;
      outerRing.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2;
      innerRing.rotation.y = elapsedTime * 0.15;
      coreMesh.rotation.y = -elapsedTime * 0.25;
      coreMesh.rotation.x = Math.cos(elapsedTime * 0.2) * 0.3;

      if (loadedModel) {
        loadedModel.rotation.y = elapsedTime * 0.4;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup on unmount (Dispose WebGL memory)
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      starGeometry.dispose();
      starMaterial.dispose();
      outerRingGeo.dispose();
      ringMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();

      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl, intensity]);

  return <div ref={containerRef} className={`absolute inset-0 pointer-events-none -z-10 overflow-hidden ${className}`} />;
}
