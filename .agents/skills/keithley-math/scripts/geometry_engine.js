#!/usr/bin/env node

/**
 * ============================================================================
 * GEOMETRY VECTOR ENGINE (COSMIC SPACE HUD THEME)
 * Designed for Keithley Lake - Grade 7 Mathematics (Toán 7 Chuẩn Quốc Tế)
 *
 * 100% Pure JavaScript (Node.js runtime, zero external dependencies)
 * Generates mathematically exact, responsive, high-contrast SVG diagrams.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// 1. THEMES & COLOR PALETTES
// ============================================================================

const THEMES = {
  COSMIC_DARK: {
    name: 'cosmic-dark',
    bgStart: '#080D1A',
    bgEnd: '#0B132B',
    borderColor: '#06B6D4',
    borderOpacity: 0.35,
    borderWidth: 1.5,
    borderRadius: 18,
    gridColor: '#06B6D4',
    gridOpacity: 0.05,
    mainLine: '#38BDF8',       // Sky blue neon
    auxLine: '#94A3B8',        // Slate dashed for construction lines
    transversalLine: '#C4B5FD',// Violet light
    nodeCore: '#FFFFFF',
    nodeGlow: '#22D3EE',
    nodeRadius: 4.5,
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMeasure: '#FBBF24',    // Amber gold for degrees/angles
    textAlgebra: '#38BDF8',    // Cyan for x, y variables
    arcPrimaryFill: 'rgba(6, 182, 212, 0.20)',
    arcPrimaryStroke: '#22D3EE',
    arcSecondaryFill: 'rgba(245, 158, 11, 0.22)',
    arcSecondaryStroke: '#F59E0B',
    arcRightAngleStroke: '#38BDF8',
    arcRightAngleFill: 'rgba(56, 189, 248, 0.15)',
    equalTickStroke: '#FBBF24',
    watermark: '#64748B'
  },
  PRINT_LIGHT: {
    name: 'print-light',
    bgStart: '#FFFFFF',
    bgEnd: '#FFFFFF',
    borderColor: '#CBD5E1',
    borderOpacity: 1.0,
    borderWidth: 1.0,
    borderRadius: 12,
    gridColor: '#E2E8F0',
    gridOpacity: 0.5,
    mainLine: '#0F172A',
    auxLine: '#64748B',
    transversalLine: '#475569',
    nodeCore: '#0F172A',
    nodeGlow: '#0F172A',
    nodeRadius: 3.5,
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMeasure: '#B45309',
    textAlgebra: '#0284C7',
    arcPrimaryFill: 'rgba(2, 132, 199, 0.12)',
    arcPrimaryStroke: '#0284C7',
    arcSecondaryFill: 'rgba(217, 119, 6, 0.15)',
    arcSecondaryStroke: '#D97706',
    arcRightAngleStroke: '#0F172A',
    arcRightAngleFill: 'rgba(15, 23, 42, 0.08)',
    equalTickStroke: '#0F172A',
    watermark: '#94A3B8'
  }
};

// ============================================================================
// 2. MATHEMATICAL PRIMITIVES (Point2D & Trigonometry Solvers)
// ============================================================================

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

class Point2D {
  constructor(x, y) {
    this.x = Number(x);
    this.y = Number(y);
  }

  clone() {
    return new Point2D(this.x, this.y);
  }

  add(v) {
    return new Point2D(this.x + v.x, this.y + v.y);
  }

  sub(v) {
    return new Point2D(this.x - v.x, this.y - v.y);
  }

  scale(s) {
    return new Point2D(this.x * s, this.y * s);
  }

  dist(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.hypot(dx, dy);
  }

  len() {
    return Math.hypot(this.x, this.y);
  }

  normalize() {
    const l = this.len();
    if (l === 0) return new Point2D(1, 0);
    return new Point2D(this.x / l, this.y / l);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  cross(v) {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * Angle of vector in radians [-PI, PI]
   */
  angle() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Rotate around origin or around pivot point
   */
  rotate(rad, pivot = new Point2D(0, 0)) {
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const dx = this.x - pivot.x;
    const dy = this.y - pivot.y;
    return new Point2D(
      pivot.x + (dx * cos - dy * sin),
      pivot.y + (dx * sin + dy * cos)
    );
  }

  lerp(target, t) {
    return new Point2D(
      this.x + (target.x - this.x) * t,
      this.y + (target.y - this.y) * t
    );
  }

  perp() {
    return new Point2D(-this.y, this.x);
  }
}

/**
 * Geometric helper functions
 */
const GeoMath = {
  toRad: (deg) => deg * DEG2RAD,
  toDeg: (rad) => rad * RAD2DEG,

  /**
   * Find intersection of line AB and line CD
   */
  lineIntersection(A, B, C, D) {
    const x1 = A.x, y1 = A.y;
    const x2 = B.x, y2 = B.y;
    const x3 = C.x, y3 = C.y;
    const x4 = D.x, y4 = D.y;

    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(denom) < 1e-9) {
      return null; // Parallel or coincident
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    return new Point2D(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
  },

  /**
   * Project point P onto line AB
   */
  projectOnLine(P, A, B) {
    const AB = B.sub(A);
    const lenSq = AB.dot(AB);
    if (lenSq === 0) return A.clone();
    const t = P.sub(A).dot(AB) / lenSq;
    return A.add(AB.scale(t));
  },

  /**
   * Angle between three points: P1 - Vertex - P2 in radians [0, 2PI]
   */
  vertexAngle(P1, Vertex, P2) {
    const v1 = P1.sub(Vertex).normalize();
    const v2 = P2.sub(Vertex).normalize();
    let ang1 = v1.angle();
    let ang2 = v2.angle();
    if (ang1 < 0) ang1 += 2 * Math.PI;
    if (ang2 < 0) ang2 += 2 * Math.PI;
    let diff = ang2 - ang1;
    if (diff < 0) diff += 2 * Math.PI;
    return { ang1, ang2, sweep: diff };
  },

  /**
   * Normalize an angle to [0, 2PI)
   */
  normalizeAngle(rad) {
    let a = rad % (2 * Math.PI);
    if (a < 0) a += 2 * Math.PI;
    return a;
  }
};

// ============================================================================
// 3. SVG CANVAS BUILDER
// ============================================================================

class SVGCanvas {
  constructor(options = {}) {
    this.width = options.width || 540;
    this.height = options.height || 320;
    this.viewBox = options.viewBox || `0 0 ${this.width} ${this.height}`;
    this.displayHeight = options.displayHeight || 280;
    this.theme = options.theme || THEMES.COSMIC_DARK;
    this.elements = [];
    this.grid = options.grid !== false;
    this.watermarkText = options.watermark || 'SCHEMATIC · NOT TO SCALE';
    this.showOrbitRings = options.showOrbitRings || false;
  }

  // --- Drawing Primitives ---

  drawLine(p1, p2, options = {}) {
    const stroke = options.stroke || this.theme.mainLine;
    const strokeWidth = options.strokeWidth || 2.5;
    const strokeDash = options.dash ? ` stroke-dasharray="${options.dash}"` : '';
    const opacity = options.opacity !== undefined ? ` stroke-opacity="${options.opacity}"` : '';
    const cap = options.linecap || 'round';

    this.elements.push(
      `<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="${cap}"${strokeDash}${opacity} />`
    );
    return this;
  }

  drawRay(origin, dirAngleRad, length, options = {}) {
    const target = new Point2D(
      origin.x + Math.cos(dirAngleRad) * length,
      origin.y + Math.sin(dirAngleRad) * length
    );
    return this.drawLine(origin, target, options);
  }

  drawCircle(center, radius, options = {}) {
    const stroke = options.stroke || this.theme.mainLine;
    const strokeWidth = options.strokeWidth || 2;
    const fill = options.fill || 'none';
    const strokeDash = options.dash ? ` stroke-dasharray="${options.dash}"` : '';
    const opacity = options.opacity !== undefined ? ` opacity="${options.opacity}"` : '';

    this.elements.push(
      `<circle cx="${center.x.toFixed(2)}" cy="${center.y.toFixed(2)}" r="${radius.toFixed(2)}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"${strokeDash}${opacity} />`
    );
    return this;
  }

  drawPolygon(points, options = {}) {
    const pts = points.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
    const fill = options.fill || 'none';
    const stroke = options.stroke || this.theme.mainLine;
    const strokeWidth = options.strokeWidth || 2.5;
    const opacity = options.opacity !== undefined ? ` opacity="${options.opacity}"` : '';
    const strokeDash = options.dash ? ` stroke-dasharray="${options.dash}"` : '';

    this.elements.push(
      `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round"${strokeDash}${opacity} />`
    );
    return this;
  }

  drawNode(point, label = '', options = {}) {
    const r = options.radius || this.theme.nodeRadius;
    const glow = options.glow !== false;
    const coreColor = options.coreColor || this.theme.nodeCore;
    const glowColor = options.glowColor || this.theme.nodeGlow;

    if (glow && this.theme === THEMES.COSMIC_DARK) {
      this.elements.push(
        `<circle cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="${(r * 1.8).toFixed(2)}" fill="${glowColor}" opacity="0.35" filter="url(#nodeGlow)" />`
      );
    }

    this.elements.push(
      `<circle cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="${r}" fill="${coreColor}" stroke="${glowColor}" stroke-width="1.5" />`
    );

    if (label) {
      const offset = options.offset || new Point2D(0, -12);
      const textPt = point.add(offset);
      const fontSize = options.fontSize || 14;
      const fontWeight = options.fontWeight || 'bold';
      const color = options.color || this.theme.textPrimary;
      const anchor = options.anchor || 'middle';

      this.elements.push(
        `<text x="${textPt.x.toFixed(2)}" y="${textPt.y.toFixed(2)}" fill="${color}" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="${fontWeight}" text-anchor="${anchor}">${label}</text>`
      );
    }
    return this;
  }

  drawText(point, content, options = {}) {
    const color = options.color || this.theme.textPrimary;
    const fontSize = options.fontSize || 13;
    const fontWeight = options.fontWeight || 'normal';
    const fontStyle = options.fontStyle || 'normal';
    const fontFamily = options.fontFamily || 'system-ui, -apple-system, sans-serif';
    const anchor = options.anchor || 'middle';
    const baseline = options.baseline || 'middle';

    this.elements.push(
      `<text x="${point.x.toFixed(2)}" y="${point.y.toFixed(2)}" fill="${color}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" font-style="${fontStyle}" text-anchor="${anchor}" dominant-baseline="${baseline}">${content}</text>`
    );
    return this;
  }

  /**
   * Draw an angle arc between two rays originating from vertex O
   * @param {Point2D} O - Vertex
   * @param {number} startAngleRad - Start angle in radians
   * @param {number} endAngleRad - End angle in radians
   * @param {number} radius - Arc radius (px)
   * @param {Object} options - Style & labeling options
   */
  drawAngleArc(O, startAngleRad, endAngleRad, radius = 32, options = {}) {
    let a1 = GeoMath.normalizeAngle(startAngleRad);
    let a2 = GeoMath.normalizeAngle(endAngleRad);

    // Calculate sweep (counter-clockwise)
    let sweep = a2 - a1;
    if (sweep < 0) sweep += 2 * Math.PI;

    // Check if user requested clockwise/shortest arc
    const isClockwise = options.clockwise || false;
    const largeArcFlag = sweep > Math.PI ? 1 : 0;
    const sweepFlag = isClockwise ? 0 : 1;

    // Points on circumference
    const pStart = new Point2D(O.x + radius * Math.cos(a1), O.y + radius * Math.sin(a1));
    const pEnd = new Point2D(O.x + radius * Math.cos(a2), O.y + radius * Math.sin(a2));

    const stroke = options.stroke || this.theme.arcPrimaryStroke;
    const fill = options.fill || (options.isWedge ? this.theme.arcPrimaryFill : 'none');
    const strokeWidth = options.strokeWidth || 2;
    const strokeDash = options.dash ? ` stroke-dasharray="${options.dash}"` : '';

    let d;
    if (fill !== 'none') {
      d = `M ${O.x.toFixed(2)} ${O.y.toFixed(2)} L ${pStart.x.toFixed(2)} ${pStart.y.toFixed(2)} A ${radius.toFixed(2)} ${radius.toFixed(2)} 0 ${largeArcFlag} ${sweepFlag} ${pEnd.x.toFixed(2)} ${pEnd.y.toFixed(2)} Z`;
    } else {
      d = `M ${pStart.x.toFixed(2)} ${pStart.y.toFixed(2)} A ${radius.toFixed(2)} ${radius.toFixed(2)} 0 ${largeArcFlag} ${sweepFlag} ${pEnd.x.toFixed(2)} ${pEnd.y.toFixed(2)}`;
    }

    this.elements.push(
      `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round"${strokeDash} />`
    );

    // Draw optional equal angle ticks (e.g. 1 tick or 2 ticks across the arc)
    if (options.ticks && options.ticks > 0) {
      const midAngle = a1 + sweep / 2;
      const tickLen = 7;
      const count = options.ticks;
      const tickSpacingRad = 0.08;

      for (let i = 0; i < count; i++) {
        const offsetAng = (i - (count - 1) / 2) * tickSpacingRad;
        const currentAng = midAngle + offsetAng;
        const r1 = radius - tickLen / 2;
        const r2 = radius + tickLen / 2;
        const t1 = new Point2D(O.x + r1 * Math.cos(currentAng), O.y + r1 * Math.sin(currentAng));
        const t2 = new Point2D(O.x + r2 * Math.cos(currentAng), O.y + r2 * Math.sin(currentAng));
        this.drawLine(t1, t2, { stroke: this.theme.equalTickStroke, strokeWidth: 1.8 });
      }
    }

    // Label on angle bisector
    if (options.label) {
      const midAngle = a1 + sweep / 2;
      const labelDist = radius + (options.labelOffset || 16);
      const labelPt = new Point2D(
        O.x + labelDist * Math.cos(midAngle),
        O.y + labelDist * Math.sin(midAngle)
      );
      const color = options.labelColor || this.theme.textMeasure;
      const fontSize = options.fontSize || 12;
      const fontWeight = options.fontWeight || 'bold';

      this.drawText(labelPt, options.label, {
        color,
        fontSize,
        fontWeight,
        fontFamily: 'system-ui, -apple-system, sans-serif'
      });
    }

    return this;
  }

  /**
   * Angle Arc using 3 points: P1 - Vertex O - P2
   */
  drawAngleBetween(P1, O, P2, radius = 32, options = {}) {
    const v1 = P1.sub(O).normalize();
    const v2 = P2.sub(O).normalize();
    return this.drawAngleArc(O, v1.angle(), v2.angle(), radius, options);
  }

  /**
   * Draw Right Angle marker (Perpendicular square box) at vertex O
   */
  drawRightAngle(P1, O, P2, size = 16, options = {}) {
    const v1 = P1.sub(O).normalize();
    const v2 = P2.sub(O).normalize();

    const p1 = O.add(v1.scale(size));
    const p2 = p1.add(v2.scale(size));
    const p3 = O.add(v2.scale(size));

    const stroke = options.stroke || this.theme.arcRightAngleStroke;
    const fill = options.fill || this.theme.arcRightAngleFill;
    const strokeWidth = options.strokeWidth || 1.8;

    const d = `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`;
    this.elements.push(
      `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="miter" stroke-linecap="square" />`
    );

    if (options.showDot) {
      const dotCenter = O.add(v1.scale(size * 0.5)).add(v2.scale(size * 0.5));
      this.elements.push(
        `<circle cx="${dotCenter.x.toFixed(2)}" cy="${dotCenter.y.toFixed(2)}" r="1.8" fill="${stroke}" />`
      );
    }
    return this;
  }

  /**
   * Draw parallel arrows '>' or '>>' on a line segment
   */
  drawParallelMarker(P1, P2, count = 1, options = {}) {
    const dir = P2.sub(P1).normalize();
    const perp = dir.perp().normalize();
    const mid = P1.lerp(P2, options.t || 0.5);
    const arrowSize = options.size || 8;
    const spacing = 7;
    const color = options.color || this.theme.textMeasure;
    const strokeWidth = options.strokeWidth || 2;

    for (let i = 0; i < count; i++) {
      const offset = (i - (count - 1) / 2) * spacing;
      const center = mid.add(dir.scale(offset));
      const tip = center.add(dir.scale(arrowSize * 0.5));
      const left = center.sub(dir.scale(arrowSize * 0.5)).add(perp.scale(arrowSize * 0.5));
      const right = center.sub(dir.scale(arrowSize * 0.5)).sub(perp.scale(arrowSize * 0.5));

      const d = `M ${left.x.toFixed(2)} ${left.y.toFixed(2)} L ${tip.x.toFixed(2)} ${tip.y.toFixed(2)} L ${right.x.toFixed(2)} ${right.y.toFixed(2)}`;
      this.elements.push(
        `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />`
      );
    }
    return this;
  }

  /**
   * Draw equal length ticks on segment P1-P2
   */
  drawSegmentTicks(P1, P2, count = 1, options = {}) {
    const dir = P2.sub(P1).normalize();
    const perp = dir.perp().normalize();
    const mid = P1.lerp(P2, options.t || 0.5);
    const tickLen = options.size || 10;
    const spacing = 4;
    const color = options.color || this.theme.equalTickStroke;
    const strokeWidth = options.strokeWidth || 1.8;

    for (let i = 0; i < count; i++) {
      const offset = (i - (count - 1) / 2) * spacing;
      const center = mid.add(dir.scale(offset));
      const t1 = center.add(perp.scale(tickLen * 0.5));
      const t2 = center.sub(perp.scale(tickLen * 0.5));
      this.drawLine(t1, t2, { stroke: color, strokeWidth });
    }
    return this;
  }

  // --- Exporting ---

  toSVG() {
    const t = this.theme;
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="${this.viewBox}" width="100%" height="${this.displayHeight}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Geometric Diagram">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="cosmicBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.bgStart}" />
      <stop offset="100%" stop-color="${t.bgEnd}" />
    </linearGradient>

    <!-- Neon Glow Filter -->
    <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Grid Pattern -->
    <pattern id="radarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${t.gridColor}" stroke-width="0.8" stroke-opacity="${t.gridOpacity}" />
    </pattern>
  </defs>

  <!-- Background Canvas -->
  <rect width="${this.width}" height="${this.height}" rx="${t.borderRadius}" fill="url(#cosmicBg)" stroke="${t.borderColor}" stroke-width="${t.borderWidth}" stroke-opacity="${t.borderOpacity}" />
  ${this.grid ? `<rect width="${this.width}" height="${this.height}" rx="${t.borderRadius}" fill="url(#radarGrid)" />` : ''}

  <!-- Geometric Elements -->
  ${this.elements.join('\n  ')}

  <!-- Schematic Watermark -->
  <text x="18" y="${this.height - 14}" fill="${t.watermark}" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" letter-spacing="1">${this.watermarkText}</text>
</svg>`;
  }

  save(outputPath) {
    const fullPath = path.resolve(outputPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, this.toSVG(), 'utf8');
    return fullPath;
  }
}

// ============================================================================
// 4. PRESET GENERATORS FOR GRADE 7 MATH (KEITHLEY LAKE)
// ============================================================================

const Presets = {
  /**
   * PRESET 1: Parallel Lines Cut by a Transversal (Hai đường thẳng song song và một cát tuyến)
   * 8 standard angles (A1..A4 at top intersection, B1..B4 at bottom intersection)
   */
  parallelTransversal(params = {}) {
    const width = params.width || 540;
    const height = params.height || 320;
    const canvas = new SVGCanvas({ width, height, theme: params.theme });

    // Lines a and b coordinates
    const yTop = params.yTop || 85;
    const yBottom = params.yBottom || 225;
    const lineLeft = 40;
    const lineRight = width - 40;

    // Transversal angle (degrees with horizontal)
    const transversalDeg = params.transversalAngleDeg || 65;
    const transversalRad = GeoMath.toRad(transversalDeg);

    // Compute intersection points A (on line a) and B (on line b)
    const centerX = width / 2;
    const deltaY = (yBottom - yTop) / 2;
    const deltaX = deltaY / Math.tan(transversalRad);

    const A = new Point2D(centerX + deltaX, yTop);
    const B = new Point2D(centerX - deltaX, yBottom);

    // Draw parallel lines a and b
    canvas.drawLine(new Point2D(lineLeft, yTop), new Point2D(lineRight, yTop), {
      stroke: canvas.theme.mainLine,
      strokeWidth: 2.8
    });
    canvas.drawLine(new Point2D(lineLeft, yBottom), new Point2D(lineRight, yBottom), {
      stroke: canvas.theme.mainLine,
      strokeWidth: 2.8
    });

    // Draw transversal line c
    const extLen = 45;
    const dirC = B.sub(A).normalize();
    const cStart = A.sub(dirC.scale(extLen));
    const cEnd = B.add(dirC.scale(extLen));
    canvas.drawLine(cStart, cEnd, {
      stroke: canvas.theme.transversalLine,
      strokeWidth: 2.8
    });

    // Parallel indicator arrows on line a and b
    if (params.showParallelArrows !== false) {
      canvas.drawParallelMarker(new Point2D(lineLeft + 30, yTop), new Point2D(lineRight - 30, yTop), 2, { t: 0.2 });
      canvas.drawParallelMarker(new Point2D(lineLeft + 30, yBottom), new Point2D(lineRight - 30, yBottom), 2, { t: 0.2 });
    }

    // Line labels: a, b, c
    canvas.drawText(new Point2D(lineLeft + 15, yTop - 12), params.labelA || 'a', {
      color: canvas.theme.mainLine,
      fontSize: 15,
      fontWeight: 'bold',
      fontStyle: 'italic'
    });
    canvas.drawText(new Point2D(lineLeft + 15, yBottom - 12), params.labelB || 'b', {
      color: canvas.theme.mainLine,
      fontSize: 15,
      fontWeight: 'bold',
      fontStyle: 'italic'
    });
    canvas.drawText(new Point2D(cStart.x + 14, cStart.y + 4), params.labelC || 'c', {
      color: canvas.theme.transversalLine,
      fontSize: 15,
      fontWeight: 'bold',
      fontStyle: 'italic'
    });

    // Vertices A and B
    canvas.drawNode(A, params.vertexA || 'A', { offset: new Point2D(16, -12) });
    canvas.drawNode(B, params.vertexB || 'B', { offset: new Point2D(-18, 14) });

    // Direction angles around intersection
    // 0 = Right (along parallel line), transversal direction = dirC.angle()
    const dirRight = 0;
    const dirLeft = Math.PI;
    const dirTransUp = A.sub(B).angle();
    const dirTransDown = B.sub(A).angle();

    // 4 sectors around each vertex:
    // Sector 1: Top-Left (dirLeft to dirTransUp)
    // Sector 2: Top-Right (dirTransUp to dirRight)
    // Sector 3: Bottom-Right (dirRight to dirTransDown)
    // Sector 4: Bottom-Left (dirTransDown to dirLeft)
    const getSector = (vertex, idx) => {
      if (idx === 1) return { start: dirTransUp, end: dirLeft };      // 1: Top-Left
      if (idx === 2) return { start: dirRight, end: dirTransUp };      // 2: Top-Right
      if (idx === 3) return { start: dirTransDown, end: dirRight };    // 3: Bottom-Right
      if (idx === 4) return { start: dirLeft, end: dirTransDown };     // 4: Bottom-Left
      return { start: 0, end: Math.PI / 2 };
    };

    // Draw angles if specified
    const highlightAngles = params.angles || [];
    highlightAngles.forEach(ang => {
      const vertex = ang.vertex === 'A' ? A : B;
      const sec = getSector(vertex, ang.index);
      const isTarget = ang.isTarget || ang.highlight || false;
      const arcRadius = ang.radius || 28;

      canvas.drawAngleArc(vertex, sec.start, sec.end, arcRadius, {
        fill: isTarget ? canvas.theme.arcSecondaryFill : canvas.theme.arcPrimaryFill,
        stroke: isTarget ? canvas.theme.arcSecondaryStroke : canvas.theme.arcPrimaryStroke,
        label: ang.label || `${ang.index}`,
        labelColor: isTarget ? canvas.theme.textMeasure : canvas.theme.textAlgebra,
        ticks: ang.ticks || 0,
        labelOffset: ang.labelOffset || 14
      });
    });

    return canvas;
  },

  /**
   * PRESET 2: Stepped / Zig-Zag Parallel Lines (Classic "Find Angle x" at Vertex M)
   * Two parallel rays Ax || By with vertex M in between: ∠x = ∠A + ∠B
   */
  steppedParallel(params = {}) {
    const width = params.width || 540;
    const height = params.height || 320;
    const canvas = new SVGCanvas({ width, height, theme: params.theme });

    const A = new Point2D(params.Ax || 80, params.Ay || 80);
    const B = new Point2D(params.Bx || 80, params.By || 240);
    const M = new Point2D(params.Mx || 260, params.My || 160);

    // Parallel rays Ax and By extending to the right
    const rayLength = params.rayLength || 380;
    const Ax_end = new Point2D(A.x + rayLength, A.y);
    const By_end = new Point2D(B.x + rayLength, B.y);

    canvas.drawLine(A, Ax_end, { stroke: canvas.theme.mainLine, strokeWidth: 2.8 });
    canvas.drawLine(B, By_end, { stroke: canvas.theme.mainLine, strokeWidth: 2.8 });

    // Segments AM and MB (the bend)
    canvas.drawLine(A, M, { stroke: canvas.theme.transversalLine, strokeWidth: 2.8 });
    canvas.drawLine(M, B, { stroke: canvas.theme.transversalLine, strokeWidth: 2.8 });

    // Optional auxiliary line Mz || Ax || By
    if (params.showAuxiliaryLine !== false) {
      const Mz_end = new Point2D(M.x + 200, M.y);
      canvas.drawLine(M, Mz_end, { stroke: canvas.theme.auxLine, strokeWidth: 1.8, dash: '5,5' });
      canvas.drawText(new Point2D(Mz_end.x + 12, Mz_end.y + 4), 'z', {
        color: canvas.theme.textSecondary,
        fontStyle: 'italic',
        fontWeight: 'bold'
      });
    }

    // Parallel arrows
    canvas.drawParallelMarker(A, Ax_end, 2, { t: 0.6 });
    canvas.drawParallelMarker(B, By_end, 2, { t: 0.6 });

    // Ray labels: x, y
    canvas.drawText(new Point2D(Ax_end.x + 12, Ax_end.y + 4), params.labelRayA || 'x', {
      color: canvas.theme.mainLine,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fontSize: 15
    });
    canvas.drawText(new Point2D(By_end.x + 12, By_end.y + 4), params.labelRayB || 'y', {
      color: canvas.theme.mainLine,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fontSize: 15
    });

    // Nodes
    canvas.drawNode(A, params.vertexA || 'A', { offset: new Point2D(-16, -10) });
    canvas.drawNode(B, params.vertexB || 'B', { offset: new Point2D(-16, 14) });
    canvas.drawNode(M, params.vertexM || 'M', { offset: new Point2D(-18, 0) });

    // Angle at A: ∠MAx
    const dirAx = 0; // East
    const dirAM = M.sub(A).angle();
    canvas.drawAngleArc(A, dirAx, dirAM, 32, {
      fill: canvas.theme.arcPrimaryFill,
      stroke: canvas.theme.arcPrimaryStroke,
      label: params.angleA_label || '42°',
      labelColor: canvas.theme.textMeasure,
      isWedge: true
    });

    // Angle at B: ∠MBy
    const dirBy = 0; // East
    const dirBM = M.sub(B).angle();
    canvas.drawAngleArc(B, dirBM, dirBy, 32, {
      fill: canvas.theme.arcPrimaryFill,
      stroke: canvas.theme.arcPrimaryStroke,
      label: params.angleB_label || '38°',
      labelColor: canvas.theme.textMeasure,
      isWedge: true
    });

    // Angle at M: Reflex or interior ∠AMB
    const dirMA = A.sub(M).angle();
    const dirMB = B.sub(M).angle();
    canvas.drawAngleArc(M, dirMB, dirMA, 30, {
      fill: canvas.theme.arcSecondaryFill,
      stroke: canvas.theme.arcSecondaryStroke,
      label: params.angleM_label || 'x = ?',
      labelColor: canvas.theme.textAlgebra,
      labelOffset: 24,
      isWedge: true
    });

    return canvas;
  },

  /**
   * PRESET 3: Intersecting Lines & Vertical Opposite Angles (Hai đường thẳng cắt nhau & góc đối đỉnh)
   */
  intersectingLines(params = {}) {
    const width = params.width || 540;
    const height = params.height || 320;
    const canvas = new SVGCanvas({ width, height, theme: params.theme });

    const O = new Point2D(width / 2, height / 2);
    const angle1Deg = params.angle1Deg || 35;
    const angle2Deg = params.angle2Deg || 145;
    const length = params.length || 200;

    const rad1 = GeoMath.toRad(angle1Deg);
    const rad2 = GeoMath.toRad(angle2Deg);

    // Line 1: xOy
    const P1_left = new Point2D(O.x - length * Math.cos(rad1), O.y - length * Math.sin(rad1));
    const P1_right = new Point2D(O.x + length * Math.cos(rad1), O.y + length * Math.sin(rad1));

    // Line 2: zOt
    const P2_left = new Point2D(O.x - length * Math.cos(rad2), O.y - length * Math.sin(rad2));
    const P2_right = new Point2D(O.x + length * Math.cos(rad2), O.y + length * Math.sin(rad2));

    canvas.drawLine(P1_left, P1_right, { stroke: canvas.theme.mainLine, strokeWidth: 2.8 });
    canvas.drawLine(P2_left, P2_right, { stroke: canvas.theme.transversalLine, strokeWidth: 2.8 });

    // End labels
    canvas.drawText(P1_left.add(new Point2D(-12, -8)), params.labelP1_left || "x'", { color: canvas.theme.mainLine, fontWeight: 'bold' });
    canvas.drawText(P1_right.add(new Point2D(14, 8)), params.labelP1_right || 'x', { color: canvas.theme.mainLine, fontWeight: 'bold' });
    canvas.drawText(P2_left.add(new Point2D(12, -10)), params.labelP2_left || 'y', { color: canvas.theme.transversalLine, fontWeight: 'bold' });
    canvas.drawText(P2_right.add(new Point2D(-12, 12)), params.labelP2_right || "y'", { color: canvas.theme.transversalLine, fontWeight: 'bold' });

    // Intersection Node O
    canvas.drawNode(O, params.vertexO || 'O', { offset: new Point2D(0, -14) });

    // Draw vertical opposite angle arcs
    const r = params.arcRadius || 36;

    // Angle 1
    canvas.drawAngleArc(O, rad1, rad2, r, {
      fill: canvas.theme.arcPrimaryFill,
      stroke: canvas.theme.arcPrimaryStroke,
      label: params.angle1Label || '110°',
      labelColor: canvas.theme.textMeasure,
      ticks: params.ticks1 || 1
    });

    // Vertical Opposite Angle (Angle 3)
    canvas.drawAngleArc(O, rad1 + Math.PI, rad2 + Math.PI, r, {
      fill: canvas.theme.arcPrimaryFill,
      stroke: canvas.theme.arcPrimaryStroke,
      label: params.angle3Label || '110°',
      labelColor: canvas.theme.textMeasure,
      ticks: params.ticks1 || 1
    });

    // Supplementary Adjacent Angles (Angle 2 & Angle 4) if requested
    if (params.showSupplementary) {
      canvas.drawAngleArc(O, rad2, rad1 + Math.PI, r - 6, {
        fill: canvas.theme.arcSecondaryFill,
        stroke: canvas.theme.arcSecondaryStroke,
        label: params.angle2Label || '70°',
        labelColor: canvas.theme.textAlgebra,
        ticks: 2
      });
      canvas.drawAngleArc(O, rad2 + Math.PI, rad1, r - 6, {
        fill: canvas.theme.arcSecondaryFill,
        stroke: canvas.theme.arcSecondaryStroke,
        label: params.angle4Label || '70°',
        labelColor: canvas.theme.textAlgebra,
        ticks: 2
      });
    }

    return canvas;
  },

  /**
   * PRESET 4: Angle Bisector (Tia phân giác của một góc)
   * Angle xOy with bisector Oz, showing matching angle ticks
   */
  angleBisector(params = {}) {
    const width = params.width || 540;
    const height = params.height || 320;
    const canvas = new SVGCanvas({ width, height, theme: params.theme });

    const O = new Point2D(params.Ox || 140, params.Oy || 230);
    const rayLength = params.rayLength || 260;
    const totalAngleDeg = params.totalAngleDeg || 70;
    const baseAngleDeg = params.baseAngleDeg || -15; // horizontal tilt

    const a1 = GeoMath.toRad(baseAngleDeg);
    const halfRad = GeoMath.toRad(totalAngleDeg / 2);
    const aBisector = a1 - halfRad;
    const a2 = a1 - GeoMath.toRad(totalAngleDeg);

    // Rays Ox, Oz (bisector), Oy
    canvas.drawRay(O, a1, rayLength, { stroke: canvas.theme.mainLine, strokeWidth: 2.8 });
    canvas.drawRay(O, aBisector, rayLength + 20, { stroke: canvas.theme.arcSecondaryStroke, strokeWidth: 2.8 });
    canvas.drawRay(O, a2, rayLength, { stroke: canvas.theme.mainLine, strokeWidth: 2.8 });

    // Ray End Labels
    const pOx = O.add(new Point2D(Math.cos(a1), Math.sin(a1)).scale(rayLength + 16));
    const pOz = O.add(new Point2D(Math.cos(aBisector), Math.sin(aBisector)).scale(rayLength + 36));
    const pOy = O.add(new Point2D(Math.cos(a2), Math.sin(a2)).scale(rayLength + 16));

    canvas.drawText(pOx, params.labelRayX || 'x', { color: canvas.theme.mainLine, fontWeight: 'bold', fontSize: 15 });
    canvas.drawText(pOz, params.labelRayZ || 'z (Bisector)', { color: canvas.theme.arcSecondaryStroke, fontWeight: 'bold', fontSize: 14 });
    canvas.drawText(pOy, params.labelRayY || 'y', { color: canvas.theme.mainLine, fontWeight: 'bold', fontSize: 15 });

    // Vertex Node O
    canvas.drawNode(O, params.vertexO || 'O', { offset: new Point2D(-16, 12) });

    // Two equal angle arcs
    const r = params.arcRadius || 48;
    canvas.drawAngleArc(O, aBisector, a1, r, {
      fill: canvas.theme.arcPrimaryFill,
      stroke: canvas.theme.arcPrimaryStroke,
      ticks: 1,
      label: params.halfAngleLabel || `${totalAngleDeg / 2}°`,
      labelColor: canvas.theme.textMeasure,
      labelOffset: 16
    });

    canvas.drawAngleArc(O, a2, aBisector, r, {
      fill: canvas.theme.arcPrimaryFill,
      stroke: canvas.theme.arcPrimaryStroke,
      ticks: 1,
      label: params.halfAngleLabel || `${totalAngleDeg / 2}°`,
      labelColor: canvas.theme.textMeasure,
      labelOffset: 16
    });

    return canvas;
  },

  /**
   * PRESET 5: Triangle with Special Lines & Angle Markings (Tam giác Toán 7)
   * General, Right-Angled, Isosceles, or Equilateral with Altitude, Median, Bisector
   */
  triangle(params = {}) {
    const width = params.width || 540;
    const height = params.height || 320;
    const canvas = new SVGCanvas({ width, height, theme: params.theme });

    // Vertices A (top), B (bottom-left), C (bottom-right)
    let A, B, C;
    const type = params.type || 'general'; // general, right, isosceles, equilateral

    if (type === 'right') {
      // Right triangle at B or A
      A = new Point2D(150, 70);
      B = new Point2D(150, 240);
      C = new Point2D(420, 240);
    } else if (type === 'isosceles') {
      // Isosceles with AB = AC
      A = new Point2D(width / 2, 60);
      B = new Point2D(120, 240);
      C = new Point2D(420, 240);
    } else if (type === 'equilateral') {
      const side = 280;
      const h = side * Math.sqrt(3) / 2;
      A = new Point2D(width / 2, 240 - h);
      B = new Point2D((width - side) / 2, 240);
      C = new Point2D((width + side) / 2, 240);
    } else {
      // General scalene triangle
      A = new Point2D(220, 65);
      B = new Point2D(100, 240);
      C = new Point2D(440, 240);
    }

    // Allow user overrides of coordinates
    if (params.A) A = new Point2D(params.A.x, params.A.y);
    if (params.B) B = new Point2D(params.B.x, params.B.y);
    if (params.C) C = new Point2D(params.C.x, params.C.y);

    // Draw triangle edges
    canvas.drawPolygon([A, B, C], {
      stroke: canvas.theme.mainLine,
      strokeWidth: 2.8,
      fill: params.fill || 'rgba(56, 189, 248, 0.04)'
    });

    // Special Lines: Altitude AH (Đường cao)
    if (params.showAltitude) {
      const H = GeoMath.projectOnLine(A, B, C);
      canvas.drawLine(A, H, { stroke: canvas.theme.transversalLine, strokeWidth: 2.2, dash: '4,4' });
      canvas.drawNode(H, params.labelH || 'H', { offset: new Point2D(0, 16) });
      canvas.drawRightAngle(A, H, C, 14);
    }

    // Special Lines: Median AM (Đường trung tuyến)
    if (params.showMedian) {
      const M = B.lerp(C, 0.5);
      canvas.drawLine(A, M, { stroke: canvas.theme.arcSecondaryStroke, strokeWidth: 2.2, dash: '4,4' });
      canvas.drawNode(M, params.labelM || 'M', { offset: new Point2D(0, 16) });
      canvas.drawSegmentTicks(B, M, 2);
      canvas.drawSegmentTicks(M, C, 2);
    }

    // Special Lines: Angle Bisector AD (Đường phân giác)
    if (params.showBisector) {
      // Internal bisector of angle A
      const vAB = B.sub(A).normalize();
      const vAC = C.sub(A).normalize();
      const dirBisector = vAB.add(vAC).normalize();
      const D = GeoMath.lineIntersection(A, A.add(dirBisector.scale(100)), B, C);
      if (D) {
        canvas.drawLine(A, D, { stroke: canvas.theme.textMeasure, strokeWidth: 2.2, dash: '4,4' });
        canvas.drawNode(D, params.labelD || 'D', { offset: new Point2D(0, 16) });
        // Equal angle ticks at vertex A
        canvas.drawAngleBetween(B, A, D, 28, { ticks: 1 });
        canvas.drawAngleBetween(D, A, C, 28, { ticks: 1 });
      }
    }

    // Equal Side Ticks (e.g. AB = AC for isosceles)
    if (type === 'isosceles' || params.equalSides) {
      canvas.drawSegmentTicks(A, B, 1);
      canvas.drawSegmentTicks(A, C, 1);
    }

    // Equal Angle Ticks at B and C for Isosceles
    if (type === 'isosceles') {
      canvas.drawAngleBetween(A, B, C, 30, { ticks: 1, label: params.angleB_label || '' });
      canvas.drawAngleBetween(A, C, B, 30, { ticks: 1, label: params.angleC_label || '' });
    }

    // Right angle marker if right triangle
    if (type === 'right') {
      canvas.drawRightAngle(A, B, C, 16);
    }

    // Angles
    if (params.angles) {
      params.angles.forEach(ang => {
        if (ang.vertex === 'A') canvas.drawAngleBetween(B, A, C, ang.radius || 32, ang);
        if (ang.vertex === 'B') canvas.drawAngleBetween(A, B, C, ang.radius || 32, ang);
        if (ang.vertex === 'C') canvas.drawAngleBetween(A, C, B, ang.radius || 32, ang);
      });
    }

    // Vertex Nodes
    canvas.drawNode(A, params.labelA || 'A', { offset: new Point2D(0, -14) });
    canvas.drawNode(B, params.labelB || 'B', { offset: new Point2D(-14, 14) });
    canvas.drawNode(C, params.labelC || 'C', { offset: new Point2D(14, 14) });

    return canvas;
  }
};

// ============================================================================
// 5. CLI RUNNER & DISPATCHER
// ============================================================================

function printHelp() {
  console.log(`
🛰️ KEITHLEY MATH GEOMETRY VECTOR ENGINE (SVG)
Usage:
  node geometry_engine.js --preset <name> [options...] --out <output_path.svg>
  node geometry_engine.js --config <config.json> --out <output_path.svg>

Available Presets:
  1. parallel_transversal : Parallel lines cut by transversal line
     --angle <deg>        : Transversal angle in degrees (default: 65)
     --angles <json>      : JSON string of angles to highlight

  2. stepped_parallel     : Zig-zag bend M between parallel rays Ax || By
     --angleA <label>     : e.g. "45°"
     --angleB <label>     : e.g. "35°"
     --angleM <label>     : e.g. "x = ?"

  3. intersecting_lines   : 2 lines intersecting at O (vertical opposite angles)
     --angle1 <deg>       : Angle 1 degrees (default: 35)
     --angle2 <deg>       : Angle 2 degrees (default: 145)

  4. angle_bisector       : Angle xOy with bisector Oz
     --angle <deg>        : Total angle in degrees (default: 70)
     --label <str>        : Half angle label (default: "35°")

  5. triangle             : Triangle with special lines (altitude, median, bisector)
     --type <str>         : "general" | "right" | "isosceles" | "equilateral"
     --altitude           : Include altitude AH
     --median             : Include median AM
     --bisector           : Include angle bisector AD

Examples:
  node geometry_engine.js --preset parallel_transversal --angle 60 --out ../../../frontend/public/images/geometry/test_parallel.svg
  node geometry_engine.js --preset triangle --type isosceles --altitude --out ../../../frontend/public/images/geometry/test_triangle.svg
  `);
}

function parseArgs(args) {
  const result = { _: [] };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        result[key] = next;
        i++;
      } else {
        result[key] = true;
      }
    } else {
      result._.push(arg);
    }
  }
  return result;
}

function runCLI() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || (!args.preset && !args.config)) {
    printHelp();
    return;
  }

  const outputPath = args.out || args.output || 'geometry_output.svg';
  let canvas;

  if (args.config) {
    const configData = JSON.parse(fs.readFileSync(path.resolve(args.config), 'utf8'));
    const presetFn = Presets[configData.preset];
    if (!presetFn) {
      console.error(`❌ Unknown preset in config: ${configData.preset}`);
      process.exit(1);
    }
    canvas = presetFn(configData);
  } else {
    switch (args.preset) {
      case 'parallel_transversal':
      case 'parallel': {
        const transversalAngleDeg = args.angle ? parseFloat(args.angle) : 65;
        let angles = [];
        if (args.angles) {
          try {
            angles = JSON.parse(args.angles);
          } catch (e) {
            angles = [{ vertex: 'A', index: 1, label: '115°', isTarget: true }, { vertex: 'B', index: 3, label: 'x', isTarget: true }];
          }
        } else {
          // Default demo angles
          angles = [
            { vertex: 'A', index: 1, label: '115°', isTarget: true },
            { vertex: 'B', index: 3, label: 'x = ?', isTarget: true }
          ];
        }
        canvas = Presets.parallelTransversal({ transversalAngleDeg, angles });
        break;
      }
      case 'stepped_parallel':
      case 'zigzag': {
        canvas = Presets.steppedParallel({
          angleA_label: args.angleA || '45°',
          angleB_label: args.angleB || '35°',
          angleM_label: args.angleM || 'x = ?'
        });
        break;
      }
      case 'intersecting_lines':
      case 'intersect': {
        canvas = Presets.intersectingLines({
          angle1Deg: args.angle1 ? parseFloat(args.angle1) : 40,
          angle2Deg: args.angle2 ? parseFloat(args.angle2) : 140,
          showSupplementary: args.supplementary === true
        });
        break;
      }
      case 'angle_bisector':
      case 'bisector': {
        const totalAngleDeg = args.angle ? parseFloat(args.angle) : 80;
        canvas = Presets.angleBisector({
          totalAngleDeg,
          halfAngleLabel: args.label || `${totalAngleDeg / 2}°`
        });
        break;
      }
      case 'triangle': {
        canvas = Presets.triangle({
          type: args.type || 'general',
          showAltitude: args.altitude === true,
          showMedian: args.median === true,
          showBisector: args.bisector === true
        });
        break;
      }
      default:
        console.error(`❌ Unknown preset: ${args.preset}`);
        printHelp();
        process.exit(1);
    }
  }

  const savedFile = canvas.save(outputPath);
  console.log(`✅ [Geometry Vector Engine] Successfully authored Cosmic SVG:`);
  console.log(`   📂 File: ${savedFile}`);
}

// Export for module usage & run CLI if executed directly
module.exports = {
  Point2D,
  GeoMath,
  SVGCanvas,
  THEMES,
  Presets
};

if (require.main === module) {
  runCLI();
}
