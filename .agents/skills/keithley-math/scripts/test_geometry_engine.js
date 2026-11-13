#!/usr/bin/env node

/**
 * Test & Demonstration Suite for Geometry Vector Engine
 * Generates sample SVGs covering all Grade 7 Math geometry curriculum standards.
 */

const fs = require('fs');
const path = require('path');
const { Point2D, GeoMath, SVGCanvas, THEMES, Presets } = require('./geometry_engine');

const OUTPUT_DIR = path.resolve(__dirname, '../../../../frontend/public/images/geometry');

console.log('🧪 Starting Geometry Vector Engine Test Suite...\n');

// 1. UNIT TESTS: Mathematical Primitives
console.log('1. Testing Mathematical Primitives (Point2D & GeoMath)...');
const p1 = new Point2D(0, 0);
const p2 = new Point2D(3, 4);
if (p1.dist(p2) !== 5) {
  throw new Error(`Distance check failed: expected 5, got ${p1.dist(p2)}`);
}

// Test line intersection
const l1A = new Point2D(0, 0), l1B = new Point2D(10, 10);
const l2A = new Point2D(0, 10), l2B = new Point2D(10, 0);
const inter = GeoMath.lineIntersection(l1A, l1B, l2A, l2B);
if (Math.abs(inter.x - 5) > 1e-6 || Math.abs(inter.y - 5) > 1e-6) {
  throw new Error(`Intersection check failed: expected (5, 5), got (${inter.x}, ${inter.y})`);
}
console.log('   ✅ Point2D and GeoMath precision validated.');

// 2. PRESET TESTS: Generate Sample SVGs
console.log('\n2. Testing Preset Generators & Rendering SVGs...');

const testCases = [
  {
    name: 'geo_parallel_alternate_interior.svg',
    run: () => Presets.parallelTransversal({
      transversalAngleDeg: 62,
      angles: [
        { vertex: 'A', index: 3, label: '62°', highlight: true, isTarget: false },
        { vertex: 'B', index: 1, label: 'x', highlight: true, isTarget: true }
      ]
    })
  },
  {
    name: 'geo_stepped_zigzag_angle_x.svg',
    run: () => Presets.steppedParallel({
      angleA_label: '52°',
      angleB_label: '43°',
      angleM_label: 'x = 95°',
      showAuxiliaryLine: true
    })
  },
  {
    name: 'geo_intersecting_vertical_opposite.svg',
    run: () => Presets.intersectingLines({
      angle1Deg: 42,
      angle2Deg: 138,
      showSupplementary: true,
      angle1Label: '138°',
      angle3Label: '138°',
      angle2Label: '42°',
      angle4Label: '42°'
    })
  },
  {
    name: 'geo_angle_bisector_standard.svg',
    run: () => Presets.angleBisector({
      totalAngleDeg: 80,
      halfAngleLabel: '40°'
    })
  },
  {
    name: 'geo_triangle_altitude_median.svg',
    run: () => Presets.triangle({
      type: 'general',
      showAltitude: true,
      showMedian: true,
      angles: [
        { vertex: 'B', label: '65°', isWedge: true, radius: 26 },
        { vertex: 'C', label: '45°', isWedge: true, radius: 26 }
      ]
    })
  },
  {
    name: 'geo_triangle_isosceles_equal_angles.svg',
    run: () => Presets.triangle({
      type: 'isosceles',
      showAltitude: true,
      angleB_label: '70°',
      angleC_label: '70°'
    })
  }
];

testCases.forEach(tc => {
  const canvas = tc.run();
  const filePath = path.join(OUTPUT_DIR, tc.name);
  canvas.save(filePath);

  // Validate file exists and contains valid SVG structure
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('<svg') || !content.includes('</svg>') || !content.includes('viewBox="0 0 540 320"')) {
    throw new Error(`Generated SVG invalid for ${tc.name}`);
  }
  console.log(`   ✅ Generated & Verified: ${tc.name} (${(content.length / 1024).toFixed(1)} KB)`);
});

console.log('\n🎉 ALL TESTS PASSED! All sample geometry SVGs authored cleanly.');
