#!/usr/bin/env node

/**
 * verify-svg.js
 * Tool for validating and rendering SVG diagrams to PNG for AI Visual Inspection.
 * Usage: node scripts/verify-svg.js <path-to-svg> [output-png-path]
 * Default output: /tmp/opencode/preview.png
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const inputPath = process.argv[2];
const outputPath = process.argv[3] || '/tmp/opencode/preview.png';

if (!inputPath) {
  console.error('Usage: node scripts/verify-svg.js <path-to-svg> [output-png]');
  process.exit(1);
}

const resolvedInput = path.resolve(process.cwd(), inputPath);
if (!fs.existsSync(resolvedInput)) {
  console.error(`Error: File not found at ${resolvedInput}`);
  process.exit(1);
}

const svgContent = fs.readFileSync(resolvedInput, 'utf8');

// Basic XML / SVG syntax linting
const checks = [
  { test: /<svg[^>]*xmlns=["']http:\/\/www\.w3\.org\/2000\/svg["']/i, msg: 'Missing xmlns="http://www.w3.org/2000/svg"' },
  { test: /viewBox=["']\s*[\d.-]+\s+[\d.-]+\s+[\d.-]+\s+[\d.-]+\s*["']/i, msg: 'Missing or malformed viewBox attribute' },
  { test: /<\/svg>\s*$/i, msg: 'Missing closing </svg> tag' }
];

const warnings = [];
for (const check of checks) {
  if (!check.test.test(svgContent)) {
    warnings.push(check.msg);
  }
}

if (warnings.length > 0) {
  console.warn('⚠️ SVG Lint Warnings:');
  warnings.forEach(w => console.warn(`  - ${w}`));
}

// Ensure output dir exists
const outDir = path.dirname(path.resolve(outputPath));
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let rendered = false;

// 1. Try sharp (if installed in frontend/node_modules)
try {
  let sharp;
  try {
    sharp = require(path.resolve(__dirname, '../frontend/node_modules/sharp'));
  } catch (e) {
    try {
      sharp = require('sharp');
    } catch (e2) {}
  }

  if (sharp) {
    sharp(Buffer.from(svgContent), { density: 150 })
      .png()
      .toFile(outputPath)
      .then(info => {
        console.log(`✅ [Sharp] Rendered SVG to ${outputPath}`);
        console.log(`📐 Dimensions: ${info.width}x${info.height}px (${info.size} bytes)`);
        console.log(`👀 Model can visually inspect with: read("${outputPath}")`);
      })
      .catch(err => {
        fallbackCairosvg(err);
      });
    rendered = true;
  }
} catch (e) {}

if (!rendered) {
  fallbackCairosvg();
}

function fallbackCairosvg(prevErr) {
  try {
    execSync(`cairosvg "${resolvedInput}" -o "${outputPath}" --scale 1.5`, { stdio: 'pipe' });
    const stats = fs.statSync(outputPath);
    console.log(`✅ [CairoSVG] Rendered SVG to ${outputPath}`);
    console.log(`📐 Output size: ${stats.size} bytes`);
    console.log(`👀 Model can visually inspect with: read("${outputPath}")`);
  } catch (err) {
    console.error('❌ Failed to render SVG with both Sharp and CairoSVG:');
    if (prevErr) console.error('Sharp error:', prevErr.message);
    console.error('CairoSVG error:', err.message);
    process.exit(1);
  }
}
