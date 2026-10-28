import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmic: {
          darkest: '#05070E',
          dark: '#0A0E1A',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(6, 182, 212, 0.25)',
          cyan: '#06B6D4',
          cyanGlow: '#22D3EE',
          purple: '#8B5CF6',
          nebula: '#A855F7',
          gold: '#F59E0B',
        },
        kids: {
          bg: '#FFFBEB',
          primary: '#EC4899',
          secondary: '#3B82F6',
          accent: '#10B981',
          star: '#FBBF24',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
