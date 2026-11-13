# Geometry Vector Engine Guide (Keithley Math - Grade 7)

The **Geometry Vector Engine** is an in-house, zero-dependency, mathematically exact SVG vector generator designed specifically for **Keithley Lake's Grade 7 Mathematics** curriculum under Flight Commander Thầy Thức.

It replaces unreliable ASCII diagrams and third-party untrusted/heavy MCP tools with pure JavaScript trigonometry and automated Cosmic Space HUD styling.

---

## 1. Quick CLI Usage

From anywhere in the repository, you can generate an SVG diagram using `node`:

```bash
# 1. Parallel Lines with Transversal (Hai đường thẳng song song và một cát tuyến)
node .agents/skills/keithley-math/scripts/geometry_engine.js \
  --preset parallel_transversal \
  --angle 65 \
  --out frontend/public/images/geometry/parallel_mission_q1.svg

# 2. Stepped Zig-Zag Parallel Lines (Classic "Find angle x at M")
node .agents/skills/keithley-math/scripts/geometry_engine.js \
  --preset stepped_parallel \
  --angleA "52°" \
  --angleB "43°" \
  --angleM "x = 95°" \
  --out frontend/public/images/geometry/stepped_angle_x.svg

# 3. Intersecting Lines (Vertical Opposite Angles & Linear Pairs)
node .agents/skills/keithley-math/scripts/geometry_engine.js \
  --preset intersecting_lines \
  --angle1 40 \
  --angle2 140 \
  --supplementary \
  --out frontend/public/images/geometry/vertical_angles.svg

# 4. Angle Bisector (Tia phân giác của một góc)
node .agents/skills/keithley-math/scripts/geometry_engine.js \
  --preset angle_bisector \
  --angle 80 \
  --label "40°" \
  --out frontend/public/images/geometry/bisector_80deg.svg

# 5. Triangles (General, Right, Isosceles, Equilateral with Altitude/Median/Bisector)
node .agents/skills/keithley-math/scripts/geometry_engine.js \
  --preset triangle \
  --type isosceles \
  --altitude \
  --out frontend/public/images/geometry/triangle_isosceles.svg
```

---

## 2. Programmatic Node.js API

For complex multi-step figures, you can import and compose elements freely:

```javascript
const { Point2D, GeoMath, SVGCanvas, THEMES, Presets } = require('./geometry_engine');

// Create canvas with Cosmic Dark Theme
const canvas = new SVGCanvas({
  width: 540,
  height: 320,
  theme: THEMES.COSMIC_DARK
});

const A = new Point2D(120, 80);
const B = new Point2D(120, 240);
const C = new Point2D(420, 240);

// Draw triangle polygon
canvas.drawPolygon([A, B, C], { stroke: '#38BDF8', strokeWidth: 2.8 });

// Draw right angle box at B
canvas.drawRightAngle(A, B, C, 16);

// Draw nodes
canvas.drawNode(A, 'A');
canvas.drawNode(B, 'B');
canvas.drawNode(C, 'C');

// Save directly to public images directory
canvas.save('frontend/public/images/geometry/right_triangle_abc.svg');
```

---

## 3. Standard Presets Reference

| Preset Name | Curriculum Topic | Key Parameters |
| :--- | :--- | :--- |
| `parallel_transversal` | Hai đường thẳng song song, so le trong, đồng vị | `--angle <deg>`, `--angles <json>` |
| `stepped_parallel` | Đường gấp khúc $AMB$, định lý qua điểm kẻ song song | `--angleA`, `--angleB`, `--angleM` |
| `intersecting_lines` | Hai đường thẳng cắt nhau, góc đối đỉnh, kề bù | `--angle1`, `--angle2`, `--supplementary` |
| `angle_bisector` | Tia phân giác của góc, cung góc bằng nhau | `--angle <deg>`, `--label <str>` |
| `triangle` | Tam giác, góc ngoài, đường cao, trung tuyến, phân giác | `--type`, `--altitude`, `--median`, `--bisector` |

---

## 4. Integration with `/soantoankeithley`

When creating math missions via `/soantoan` or `/soantoankeithley`:
1. Use `node .agents/skills/keithley-math/scripts/geometry_engine.js` to author all required diagram SVGs into `frontend/public/images/geometry/<slug>.svg`.
2. Reference them in the question markdown payload:
   ```markdown
   ![Figure: Alternate Interior Angles](/images/geometry/parallel_mission_q1.svg)
   ```
3. Run the automated seed script `seed_keithley_math.js`.
