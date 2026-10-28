'use client';

import React from 'react';

export function SpaceBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-[#05070E] text-slate-100 overflow-x-hidden">
      {/* Background image: Cockpit / Deep Nebula with dark overlay */}
      <div
        className="fixed inset-0 pointer-events-none bg-cover bg-center opacity-30 mix-blend-screen"
        style={{ backgroundImage: `url('/images/cosmic/bg_cockpit.jpg')` }}
      />
      
      {/* Cosmic Gradient Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#0A0E1A]/60 to-[#05070E] -z-10" />

      {/* Decorative Stars / Grid lines */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#06b6d40a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
