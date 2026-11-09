'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SpaceCockpit3D = dynamic(
  () => import('./3d/SpaceCockpit3D').then((mod) => mod.SpaceCockpit3D),
  { ssr: false }
);

export function SpaceBackground({ children, fitViewport = false, modelUrl }: { children: React.ReactNode; fitViewport?: boolean; modelUrl?: string }) {
  return (
    <div className={`relative ${fitViewport ? 'h-screen max-h-screen min-h-0 overflow-hidden' : 'min-h-screen overflow-x-hidden'} w-full bg-[#05070E] text-slate-100`}>
      {/* Interactive Three.js WebGL 3D Cockpit & Starfield */}
      <SpaceCockpit3D modelUrl={modelUrl} />

      {/* Subtle cockpit overlay texture */}
      <div
        className="fixed inset-0 pointer-events-none bg-cover bg-center opacity-15 mix-blend-screen -z-10"
        style={{ backgroundImage: `url('/images/cosmic/bg_cockpit.jpg')` }}
      />

      {/* Cosmic Gradient Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/15 via-[#0A0E1A]/40 to-[#05070E] -z-10" />

      {/* Content wrapper */}
      <div className={`relative z-10 ${fitViewport ? 'h-full min-h-0 flex flex-col overflow-hidden' : ''}`}>{children}</div>
    </div>
  );
}
