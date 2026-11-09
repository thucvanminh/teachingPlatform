'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Wonderland3DProps {
  modelUrl?: string; // Optional Cloudinary .glb mascot
  className?: string;
}

export function Wonderland3D({ modelUrl, className = '' }: Wonderland3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 180);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Cheerful Warm Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfbbf24, 1.2);
    dirLight.position.set(100, 150, 100);
    scene.add(dirLight);

    const pinkLight = new THREE.PointLight(0xf472b6, 1.5, 300);
    pinkLight.position.set(-80, 50, 50);
    scene.add(pinkLight);

    // 5. Floating Magic Sparkles (Wonderland Particles)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const fairyColors = [
      new THREE.Color(0xfbcfe8), // Pink
      new THREE.Color(0xfde047), // Yellow
      new THREE.Color(0x93c5fd), // Soft blue
      new THREE.Color(0x86efac), // Soft green
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 300;
      positions[i3 + 1] = (Math.random() - 0.5) * 300;
      positions[i3 + 2] = (Math.random() - 0.5) * 200;

      const c = fairyColors[Math.floor(Math.random() * fairyColors.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Floating Star Gem (Low-Poly 3D Mascot Gem)
    const gemGeo = new THREE.OctahedronGeometry(18, 0);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xdb2777,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.1,
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    gemMesh.position.set(0, 10, 0);
    scene.add(gemMesh);

    // Floating Ring around Gem
    const ringGeo = new THREE.TorusGeometry(28, 1.2, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.6,
      roughness: 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.5;
    gemMesh.add(ringMesh);

    // 7. Dynamic GLTF / GLB Model loader from Cloudinary if provided
    let loadedModel: THREE.Object3D | null = null;
    if (modelUrl) {
      import('three/examples/jsm/loaders/GLTFLoader.js').then(({ GLTFLoader }) => {
        const loader = new GLTFLoader();
        loader.load(
          modelUrl,
          (gltf) => {
            loadedModel = gltf.scene;
            loadedModel.scale.set(1.2, 1.2, 1.2);
            loadedModel.position.set(0, 0, 0);
            scene.add(loadedModel);
            gemMesh.visible = false;
          },
          undefined,
          (err) => console.warn('Could not load custom 3D model, using procedural Gem:', err),
        );
      });
    }

    // 8. Resize listener
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating up and down
      gemMesh.position.y = Math.sin(elapsedTime * 2) * 6;
      gemMesh.rotation.y = elapsedTime * 0.8;
      gemMesh.rotation.z = Math.sin(elapsedTime * 1.5) * 0.2;

      ringMesh.rotation.z = -elapsedTime * 1.2;

      if (loadedModel) {
        loadedModel.position.y = Math.sin(elapsedTime * 2) * 6;
        loadedModel.rotation.y = elapsedTime * 0.8;
      }

      // Rotate sparkles
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      particleGeo.dispose();
      particleMat.dispose();
      gemGeo.dispose();
      gemMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();

      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl]);

  return <div ref={containerRef} className={`absolute inset-0 pointer-events-none -z-10 overflow-hidden ${className}`} />;
}
