# Standard SVG Vector Diagram Guidelines for Keithley Math

Geometric problems for Keithley Lake must **NEVER** use ASCII text art or pseudo-characters (e.g. `---+---`, `\ /`, `x | y`). Every geometric figure must be authored as a clean, responsive vector SVG image.

---

## 1. Storage Location & Naming Convention

- **Directory:** `frontend/public/images/geometry/`
- **Naming format:** `<topic_slug>_<descriptor>.svg`
  - Examples:
    - `question_4_intersecting_lines.svg`
    - `question_14_three_lines.svg`
    - `bisector_perpendicular_theorems.svg`
- **Embedding syntax in Markdown:**
  ```markdown
  ![Figure: Intersecting Lines AB and CD at Node O](/images/geometry/question_4_intersecting_lines.svg)
  ```

---

## 2. Canvas & Sizing Specifications

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 320" width="100%" height="280">
```

- **`viewBox`**: Always specify `0 0 540 320` or `0 0 600 350`.
- **`width="100%"`**: Allows the image to scale fluidly on both desktop monitors and mobile devices.
- **`height="260"` to `height="300"`**: Keeps optimal aspect ratio in the mission question container.

---

## 3. Dark Cosmic Color Palette

To blend harmoniously into Keithley's Cockpit & Space Theme, use the following hex colors:

| Element | Color Hex | Visual Purpose |
| :--- | :--- | :--- |
| **Canvas Background** | `#080D1A` to `#0B132B` | Gradient deep space backdrop |
| **Grid Lines / Orbit Rings** | `#06B6D4` with `opacity="0.08"` | Subtle Cartesian / polar guidance |
| **Main Geometry Lines** | `#38BDF8` (Sky) or `#F1F5F9` (Slate) | `stroke-width="3"` with `stroke-linecap="round"` |
| **Angle Arcs (Primary)** | `#06B6D4` (Cyan) or `#3B82F6` | `fill="rgba(6,182,212,0.15)" stroke="#06B6D4"` |
| **Angle Arcs (Secondary / Unknown)** | `#F59E0B` (Amber) or `#10B981` | Highlights vertical pairs or target angles |
| **Intersection Nodes / Points** | `#22D3EE` with `#FFFFFF` core | `r="5"` with SVG glow filter |
| **Vertex Labels ($O, A, B, C$)** | `#FFFFFF` | `font-size="14" font-weight="bold"` |
| **Degree Measure Labels ($115^\circ$)** | `#38BDF8` or `#FBBF24` | `font-size="13" font-family="monospace"` |

---

## 4. Reusable SVG Template Snippet

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 320" width="100%" height="280">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080D1A" />
      <stop offset="100%" stop-color="#0E1626" />
    </linearGradient>

    <!-- Neon Glow Filter -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Background rounded rect -->
  <rect width="540" height="320" rx="20" fill="url(#bgGrad)" stroke="#06B6D4" stroke-width="1.5" stroke-opacity="0.4" />

  <!-- Intersection Waypoint O -->
  <circle cx="270" cy="160" r="5" fill="#22D3EE" filter="url(#glow)" />
  <text x="278" y="152" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="bold" font-size="15">O</text>

  <!-- Main Intersecting Lines -->
  <!-- Line AB -->
  <line x1="80" y1="240" x2="460" y2="80" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
  <text x="65" y="255" fill="#38BDF8" font-family="system-ui" font-weight="bold" font-size="14">A</text>
  <text x="470" y="80" fill="#38BDF8" font-family="system-ui" font-weight="bold" font-size="14">B</text>

  <!-- Line CD -->
  <line x1="120" y1="80" x2="420" y2="240" stroke="#818CF8" stroke-width="3" stroke-linecap="round" />
  <text x="105" y="75" fill="#818CF8" font-family="system-ui" font-weight="bold" font-size="14">C</text>
  <text x="430" y="255" fill="#818CF8" font-family="system-ui" font-weight="bold" font-size="14">D</text>

  <!-- Angle Indicator Arcs -->
  <path d="M 230 177 A 45 45 0 0 1 235 140" fill="rgba(6,182,212,0.2)" stroke="#22D3EE" stroke-width="2" />
  <text x="195" y="165" fill="#22D3EE" font-family="monospace" font-weight="bold" font-size="13">AOC</text>

  <path d="M 310 143 A 45 45 0 0 1 305 180" fill="rgba(6,182,212,0.2)" stroke="#22D3EE" stroke-width="2" />
  <text x="315" y="165" fill="#22D3EE" font-family="monospace" font-weight="bold" font-size="13">BOD</text>
</svg>
```

---

## 5. Pre-Commit Checklist for SVG Diagrams

1. **Self-Contained File:** Do not reference external fonts or external images.
2. **Accessible in Public Root:** Verify that `curl -s http://localhost:3000/images/geometry/<file>.svg` returns `<svg ...`.
3. **Tracked in Git:** Run `git add frontend/public/images/geometry/` so the file is committed to repository and deployed on Vercel.
