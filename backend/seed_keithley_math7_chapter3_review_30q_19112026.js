#!/usr/bin/env node

/**
 * SEED SCRIPT: KEITHLEY LAKE (GRADE 7)
 * MISSION: Chapter III Comprehensive Review (Angles & Parallel Lines - 30 Problems)
 * DATE: 2026-11-19
 */

const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Flight Commander Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Astronaut Cadet Keithley Lake
  SUBJECT_ID: 'e89cc834-99d0-40b7-ab5e-0a0838d273c4', // Grade 7 Math (MATH_7)
  ASSIGNED_DATE: '2026-11-19'
};

const LECTURE_MARKDOWN = `# 🚀 Chapter III Flight Briefing: Angles, Parallel Lines & Geometric Telemetry

Welcome aboard, Astronaut Cadet Keithley! Today is our grand Chapter III flight exam across all 8 Planetary Sectors. Review your geometric telemetry protocols before initiating orbital propulsion!

---

### 1. Special Angle Pairs & Bisectors
- **Vertically Opposite Angles:** Angles formed by two intersecting straight lines whose rays form opposite pairs. Vertically opposite angles are always equal in measure ($\\widehat{A_1} = \\widehat{A_3}$, $\\widehat{A_2} = \\widehat{A_4}$).
- **Linear Pair (Adjacent Supplementary):** Two adjacent angles whose non-common rays form a straight line. Their sum is always $180^\\circ$ ($\\widehat{\\alpha} + \\widehat{\\beta} = 180^\\circ$).
- **Bisector Right-Angle Theorem:** The angle formed by the angle bisectors of two adjacent supplementary angles is always a right angle ($90^\\circ$).

---

### 2. Transversal Line & Angle Classifications
When a transversal line intersects two distinct lines $a$ and $b$:
1. **Alternate Interior Angles:** Lie in the interior region between the two lines on opposite sides of the transversal.
2. **Corresponding Angles:** Occupy the exact same relative quadrant position at both intersection nodes.
3. **Consecutive Interior Angles:** Lie in the interior region on the same side of the transversal line.

---

### 3. Parallel Lines Criteria & Properties
- **Recognition Criteria (Proving $a \\parallel b$):**
  - If a pair of alternate interior angles are equal: $a \\parallel b$.
  - If a pair of corresponding angles are equal: $a \\parallel b$.
  - If a pair of consecutive interior angles are supplementary (sum $= 180^\\circ$): $a \\parallel b$.
- **Parallel Properties (Given $a \\parallel b$):**
  - Alternate interior angles are equal.
  - Corresponding angles are equal.
  - Consecutive interior angles sum to $180^\\circ$.

---

### 4. Perpendicular & Parallel Line Deductions
- **Perpendicular to Parallel Theorem:** If a line is perpendicular to one of two parallel lines, it is perpendicular to the other ($c \\perp a$ and $a \\parallel b \\Rightarrow c \\perp b$).
- **Parallel to Perpendicular Theorem:** Two distinct lines perpendicular to a third line are parallel to each other ($a \\perp c$ and $b \\perp c$ with $a \\neq b \\Rightarrow a \\parallel b$).
- **Uniqueness of Perpendicular Line:** Through a given point $A$, there exists one and only one line perpendicular to a given line $d$.

---

### 5. Auxiliary Parallel Construction (Zigzag Theorem)
For bent flight corridors $Ax \\parallel By$ through waypoint $C$:
- Construct auxiliary ray $Cz \\parallel Ax \\parallel By$ through vertex $C$.
- The central vertex angle equals the sum of the alternate interior angles: $\\widehat{ACB} = \\widehat{A} + \\widehat{B}$.
`;

const QUESTIONS = [
  // ==========================================
  // SECTOR 1: MERCURY ORBIT (Q1 - Q4)
  // ==========================================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 1: Mercury Orbit • Angle Fundamentals",
    content_markdown: "In orbital trajectory analysis, which geometric statement regarding angles formed by two straight intersecting flight paths is mathematically TRUE?",
    options: [
      { id: 'A', text: "If two angles have equal degree measures, they must be vertically opposite." },
      { id: 'B', text: "If two angles are vertically opposite, they are always equal in degree measure." },
      { id: 'C', text: "Two adjacent supplementary angles are always vertically opposite angles." },
      { id: 'D', text: "Vertically opposite angles always share a common ray and sum to $180^\\circ$." }
    ],
    correct_option_id: 'B',
    explanation: "Theorem of Vertically Opposite Angles: If two angles are vertically opposite, their measures are always equal. The converse is false: two angles having the same measure are not necessarily vertically opposite."
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 1: Mercury Orbit • Angle Fundamentals",
    content_markdown: "Two adjacent supplementary angles $\\widehat{AOB}$ and $\\widehat{BOC}$ are formed along straight flight corridor $AC$ ($A, O, C$ collinear). Sensor ray $OM$ lies between rays $OB$ and $OC$. Ray $ON$ is the opposite ray of $OM$.\n\n![Figure: Opposite Rays and Vertical Angles](/images/geometry/math7_ch3_q2_opposite_rays.svg)\n\nWhich of the following pairs forms vertically opposite angles?",
    options: [
      { id: 'A', text: "$\\widehat{BOM}$ and $\\widehat{CON}$" },
      { id: 'B', text: "$\\widehat{AOB}$ and $\\widehat{AON}$" },
      { id: 'C', text: "$\\widehat{AOM}$ and $\\widehat{CON}$" },
      { id: 'D', text: "$\\widehat{COM}$ and $\\widehat{BOM}$" }
    ],
    correct_option_id: 'C',
    explanation: "Since $\\widehat{AOB}$ and $\\widehat{BOC}$ are adjacent supplementary angles, rays $OA$ and $OC$ are opposite rays forming line $AC$. By definition, ray $ON$ is the opposite ray of ray $OM$. Therefore, angle $\\widehat{AOM}$ and angle $\\widehat{CON}$ have their rays forming opposite pairs, making them vertically opposite angles."
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 1: Mercury Orbit • Angle Fundamentals",
    content_markdown: "Two straight telemetry lines intersect at central navigation node $O$, forming four non-straight angles. If one of these angles measures $65^\\circ$, what are the exact degree measures of the other three angles?",
    options: [
      { id: 'A', text: "$65^\\circ, 115^\\circ, 115^\\circ$" },
      { id: 'B', text: "$65^\\circ, 65^\\circ, 115^\\circ$" },
      { id: 'C', text: "$115^\\circ, 115^\\circ, 50^\\circ$" },
      { id: 'D', text: "$65^\\circ, 115^\\circ, 120^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "The angle vertically opposite to the $65^\\circ$ angle also measures $65^\\circ$. The two remaining angles are each adjacent and supplementary (linear pair) to the $65^\\circ$ angle: $180^\\circ - 65^\\circ = 115^\\circ$. Hence the three angles are $65^\\circ, 115^\\circ, 115^\\circ$."
  },
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 1: Mercury Orbit • Angle Fundamentals",
    content_markdown: "Two intersecting navigation corridors form four non-straight angles at station $O$. Which of the following degree measurements could represent these four angles?",
    options: [
      { id: 'A', text: "$70^\\circ, 70^\\circ, 70^\\circ, 110^\\circ$" },
      { id: 'B', text: "$60^\\circ, 120^\\circ, 120^\\circ, 120^\\circ$" },
      { id: 'C', text: "$80^\\circ, 50^\\circ, 130^\\circ, 100^\\circ$" },
      { id: 'D', text: "$90^\\circ, 90^\\circ, 90^\\circ, 90^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "At any two intersecting straight lines, opposite angles must be equal in pairs ($\\alpha, \\alpha, 180^\\circ - \\alpha, 180^\\circ - \\alpha$). When the intersecting lines are perpendicular, all four angles measure $90^\\circ$."
  },

  // ==========================================
  // SECTOR 2: VENUS BASE (Q5 - Q8)
  // ==========================================
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 2: Venus Base • Linear Pairs & Bisectors",
    content_markdown: "Two straight flight paths $AB$ and $CD$ intersect at telemetry hub $O$. Ray $OM$ is the angle bisector of $\\widehat{BOD}$, and radar reports $\\widehat{BOM} = 30^\\circ$.\n\n![Figure: Bisector of Vertical Angle](/images/geometry/math7_ch3_q5_bisector_opposite.svg)\n\nWhat is the exact degree measure of angle $\\widehat{AOC}$?",
    options: [
      { id: 'A', text: "$30^\\circ$" },
      { id: 'B', text: "$60^\\circ$" },
      { id: 'C', text: "$120^\\circ$" },
      { id: 'D', text: "$150^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "Since $OM$ is the angle bisector of $\\widehat{BOD}$, the full angle $\\widehat{BOD} = 2 \\times \\widehat{BOM} = 2 \\times 30^\\circ = 60^\\circ$. Because $\\widehat{AOC}$ and $\\widehat{BOD}$ are vertically opposite angles, $\\widehat{AOC} = \\widehat{BOD} = 60^\\circ$."
  },
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 2: Venus Base • Linear Pairs & Bisectors",
    content_markdown: "Two angles $\\widehat{xOy}$ and $\\widehat{yOz}$ form a linear pair along flight baseline $xOz$. Ray $Ou$ is the angle bisector of $\\widehat{xOy}$, and ray $Ov$ is the angle bisector of $\\widehat{yOz}$.\n\n![Figure: Linear Pair Bisectors](/images/geometry/math7_ch3_q6_linear_pair_bisectors.svg)\n\nWhat is the exact angle measure between bisector vectors $Ou$ and $Ov$ ($\\widehat{uOv}$)?",
    options: [
      { id: 'A', text: "$90^\\circ$" },
      { id: 'B', text: "$45^\\circ$" },
      { id: 'C', text: "$60^\\circ$" },
      { id: 'D', text: "$180^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "$\\widehat{uOv} = \\widehat{uOy} + \\widehat{yOv} = \\frac{1}{2}\\widehat{xOy} + \\frac{1}{2}\\widehat{yOz} = \\frac{1}{2}(\\widehat{xOy} + \\widehat{yOz}) = \\frac{1}{2}(180^\\circ) = 90^\\circ$. The angle formed by the bisectors of two adjacent supplementary angles is always a right angle."
  },
  {
    order_index: 7,
    type: 'FILL_IN_BLANK',
    points: 0.33,
    sectionName: "Sector 2: Venus Base • Linear Pairs & Bisectors",
    content_markdown: "Flight telemetry sensor rays $Ox$ and $Ox'$ form a continuous straight baseline ($Ox$ and $Ox'$ are opposite rays). Beams $Oz$ and $Oy$ partition the upper sector into three angles $\\widehat{O_1}, \\widehat{O_2}, \\widehat{O_3}$.\n\n![Figure: Three Angles on Straight Line](/images/geometry/math7_ch3_q7_three_angles_straight.svg)\n\nGiven telemetry values $\\widehat{O_1} = 60^\\circ$ and $\\widehat{O_3} = 70^\\circ$, calculate the exact degree measure of angle $\\widehat{O_2}$. (Enter numerical value only):",
    expected_value: "50",
    acceptable_answers: ["50", "50°", "50 deg"],
    explanation: "Since $Ox$ and $Ox'$ form a straight angle of $180^\\circ$, $\\widehat{O_1} + \\widehat{O_2} + \\widehat{O_3} = 180^\\circ$. Thus $\\widehat{O_2} = 180^\\circ - (60^\\circ + 70^\\circ) = 50^\\circ$."
  },
  {
    order_index: 8,
    type: 'FILL_IN_BLANK',
    points: 0.33,
    sectionName: "Sector 2: Venus Base • Linear Pairs & Bisectors",
    content_markdown: "Three navigation vectors $Ox, Oy, Oz$ radiate from central docking hub $O$.\n\n![Figure: Circular Angle Convergence](/images/geometry/math7_ch3_q8_three_rays_circle.svg)\n\nSensors record $\\widehat{xOy} = 120^\\circ$ and $\\widehat{yOz} = 110^\\circ$. Determine the exact degree measure of angle $\\widehat{zOx}$. (Enter numerical value only):",
    expected_value: "130",
    acceptable_answers: ["130", "130°", "130 deg"],
    explanation: "The sum of all non-overlapping angles around point $O$ is $360^\\circ$. Thus $\\widehat{zOx} = 360^\\circ - (120^\\circ + 110^\\circ) = 360^\\circ - 230^\\circ = 130^\\circ$."
  },

  // ==========================================
  // SECTOR 3: EARTH MISSION CONTROL (Q9 - Q12)
  // ==========================================
  {
    order_index: 9,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 3: Earth Mission Control • Transversal Telemetry",
    content_markdown: "Two orbital flight paths are intersected by transversal navigation vector $MN$ at points $M$ and $N$.\n\n![Figure: Alternate Interior Pairs](/images/geometry/math7_ch3_q9_alternate_pairs.svg)\n\nWhich of the following pairs represents a pair of alternate interior angles?",
    options: [
      { id: 'A', text: "$\\widehat{M_1}$ and $\\widehat{M_2}$" },
      { id: 'B', text: "$\\widehat{M_1}$ and $\\widehat{N_1}$" },
      { id: 'C', text: "$\\widehat{M_2}$ and $\\widehat{N_1}$" },
      { id: 'D', text: "$\\widehat{M_2}$ and $\\widehat{N_2}$" }
    ],
    correct_option_id: 'C',
    explanation: "Alternate interior angles lie between the two lines (interior zone) and on opposite (alternate) sides of the transversal line. $\\widehat{M_2}$ lies below line $M$ on the right side, and $\\widehat{N_1}$ lies above line $N$ on the left side. Thus $\\widehat{M_2}$ and $\\widehat{N_1}$ form an alternate interior angle pair."
  },
  {
    order_index: 10,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 3: Earth Mission Control • Transversal Telemetry",
    content_markdown: "Referring to the same orbital transversal telemetry diagram (Figure: Alternate Interior Pairs):\n\nWhich of the following angle pairs represents a pair of corresponding angles?",
    options: [
      { id: 'A', text: "$\\widehat{M_2}$ and $\\widehat{N_1}$" },
      { id: 'B', text: "$\\widehat{M_1}$ and $\\widehat{N_2}$" },
      { id: 'C', text: "$\\widehat{M_1}$ and $\\widehat{M_2}$" },
      { id: 'D', text: "$\\widehat{N_1}$ and $\\widehat{N_2}$" }
    ],
    correct_option_id: 'B',
    explanation: "Corresponding angles occupy the exact same relative position at each intersection. Both $\\widehat{M_1}$ and $\\widehat{N_2}$ occupy the bottom-left position at their respective intersections $M$ and $N$."
  },
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 3: Earth Mission Control • Transversal Telemetry",
    content_markdown: "Transversal line intersects flight corridors $a$ and $b$ at waypoints $A$ and $B$.\n\n![Figure: Corresponding Angle Positions](/images/geometry/math7_ch3_q11_corresponding_pos.svg)\n\nAngle $\\widehat{A_1}$ lies at the bottom-right of intersection $A$, and angle $\\widehat{B_1}$ lies at the bottom-right of intersection $B$. What geometric relationship describes angle pair $\\widehat{A_1}$ and $\\widehat{B_1}$?",
    options: [
      { id: 'A', text: "Alternate interior angles" },
      { id: 'B', text: "Vertically opposite angles" },
      { id: 'C', text: "Consecutive interior angles" },
      { id: 'D', text: "Corresponding angles" }
    ],
    correct_option_id: 'D',
    explanation: "Angles that occupy identical relative quadrants (both bottom-right) at each intersection of a transversal with two lines are defined as corresponding angles."
  },
  {
    order_index: 12,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 3: Earth Mission Control • Transversal Telemetry",
    content_markdown: "Transversal line cuts trajectory lines $a$ and $b$ at stations $A$ and $B$.\n\n![Figure: Parallel Recognition Test](/images/geometry/math7_ch3_q12_parallel_test.svg)\n\nUnder which of the following conditions is line $a$ strictly parallel to line $b$ ($a \\parallel b$)?",
    options: [
      { id: 'A', text: "$\\widehat{A_3} = \\widehat{B_1}$ (equal alternate interior angles)" },
      { id: 'B', text: "$\\widehat{A_1} = \\widehat{B_2}$ (equal non-corresponding angles)" },
      { id: 'C', text: "$\\widehat{A_2} = \\widehat{B_3}$ (equal non-corresponding angles)" },
      { id: 'D', text: "$\\widehat{A_3} = \\widehat{B_2}$ (equal consecutive interior angles)" }
    ],
    correct_option_id: 'A',
    explanation: "Parallel Recognition Criterion: If a transversal line intersects two distinct lines and forms a pair of alternate interior angles that are equal in measure (here $\\widehat{A_3} = \\widehat{B_1}$), then the two lines are parallel ($a \\parallel b$)."
  },

  // ==========================================
  // SECTOR 4: MARS OUTPOST (Q13 - Q16)
  // ==========================================
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 4: Mars Outpost • Parallel Tests",
    content_markdown: "Two flight corridors $a$ and $b$ are confirmed to be parallel ($a \\parallel b$) and cut by transversal vector $AB$.\n\n![Figure: Parallel Line Properties Check](/images/geometry/math7_ch3_q13_parallel_properties.svg)\n\nWhich of the following statements regarding the telemetry angles is FALSE?",
    options: [
      { id: 'A', text: "$\\widehat{A_2} = \\widehat{B_2}$ (corresponding angles)" },
      { id: 'B', text: "$\\widehat{A_3} = \\widehat{B_1}$ (alternate interior angles)" },
      { id: 'C', text: "$\\widehat{A_1} > \\widehat{B_1}$ (inequality of corresponding angles)" },
      { id: 'D', text: "$\\widehat{A_3} = \\widehat{B_3}$ (corresponding angles)" }
    ],
    correct_option_id: 'C',
    explanation: "Since $a \\parallel b$, corresponding angles must be strictly equal ($\\widehat{A_1} = \\widehat{B_1}$). Therefore, the claim $\\widehat{A_1} > \\widehat{B_1}$ is false."
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 4: Mars Outpost • Parallel Tests",
    content_markdown: "Navigation lines $xy$ and $x'y'$ are cut by transversal vector $m$ at points $A$ and $B$.\n\n![Figure: Consecutive Interior Angles Proof](/images/geometry/math7_ch3_q14_consecutive_interior.svg)\n\nRadar detects $\\widehat{xAm} = 130^\\circ$ and $\\widehat{ABy'} = 50^\\circ$. What theorem proves that $xy \\parallel x'y'$?",
    options: [
      { id: 'A', text: "The lines have alternate exterior angles measuring $130^\\circ$." },
      { id: 'B', text: "Both lines are perpendicular to the transversal vector $m$." },
      { id: 'C', text: "Vertically opposite angles at $A$ and $B$ both equal $50^\\circ$." },
      { id: 'D', text: "Consecutive interior angles are supplementary: $130^\\circ + 50^\\circ = 180^\\circ$." }
    ],
    correct_option_id: 'D',
    explanation: "Angle $\\widehat{xAB} = 180^\\circ - 130^\\circ = 50^\\circ$. Alternatively, $\\widehat{yAB} = 130^\\circ$, and $\\widehat{yAB} + \\widehat{ABy'} = 130^\\circ + 50^\\circ = 180^\\circ$. When consecutive interior angles are supplementary, the two lines are parallel ($xy \\parallel x'y'$)."
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 4: Mars Outpost • Parallel Tests",
    content_markdown: "Orbital platform $ABCD$ has the shape of a trapezoid with leg $AD$ perpendicular to bases $AB$ and $CD$ ($AD \\perp AB$ and $AD \\perp CD$, so $AB \\parallel CD$). Telemetry reveals that the angle at vertex $B$ is double the angle at vertex $C$ ($\\widehat{B} = 2\\widehat{C}$).\n\n![Figure: Right Trapezoid Angle Telemetry](/images/geometry/math7_ch3_q15_trapezoid.svg)\n\nWhat are the exact degree measures of angles $\\widehat{B}$ and $\\widehat{C}$?",
    options: [
      { id: 'A', text: "$\\widehat{B} = 120^\\circ$ and $\\widehat{C} = 60^\\circ$" },
      { id: 'B', text: "$\\widehat{B} = 100^\\circ$ and $\\widehat{C} = 50^\\circ$" },
      { id: 'C', text: "$\\widehat{B} = 135^\\circ$ and $\\widehat{C} = 45^\\circ$" },
      { id: 'D', text: "$\\widehat{B} = 110^\\circ$ and $\\widehat{C} = 55^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "Since $AB \\parallel CD$, angles $\\widehat{B}$ and $\\widehat{C}$ are consecutive interior angles along transversal $BC$, so $\\widehat{B} + \\widehat{C} = 180^\\circ$. Substituting $\\widehat{B} = 2\\widehat{C}$ gives $2\\widehat{C} + \\widehat{C} = 180^\\circ \\Rightarrow 3\\widehat{C} = 180^\\circ \\Rightarrow \\widehat{C} = 60^\\circ$. Consequently, $\\widehat{B} = 2 \\times 60^\\circ = 120^\\circ$."
  },
  {
    order_index: 16,
    type: 'FILL_IN_BLANK',
    points: 0.33,
    sectionName: "Sector 4: Mars Outpost • Parallel Tests",
    content_markdown: "In right trapezoid flight module $MNPQ$ with $MN \\parallel PQ$ and $MQ \\perp MN$. If consecutive interior angles satisfy the relation $\\widehat{N} = 3\\widehat{P}$, calculate the exact degree measure of angle $\\widehat{P}$. (Enter numerical value only):",
    expected_value: "45",
    acceptable_answers: ["45", "45°", "45 deg"],
    explanation: "Because $MN \\parallel PQ$, consecutive interior angles along transversal $NP$ are supplementary: $\\widehat{N} + \\widehat{P} = 180^\\circ$. Substituting $\\widehat{N} = 3\\widehat{P}$: $3\\widehat{P} + \\widehat{P} = 180^\\circ \\Rightarrow 4\\widehat{P} = 180^\\circ \\Rightarrow \\widehat{P} = 45^\\circ$."
  },

  // ==========================================
  // SECTOR 5: JUPITER STATION (Q17 - Q20)
  // ==========================================
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 5: Jupiter Station • Angle Bisectors",
    content_markdown: "Transversal line $b$ is perpendicular to two parallel orbital lines $c \\parallel d$ at waypoints $A$ and $B$. Rays $Ax$ and $By$ are the angle bisectors of a pair of alternate interior angles.\n\n![Figure: Parallel Bisectors of Alternate Interior Angles](/images/geometry/math7_ch3_q17_bisectors_alternate.svg)\n\nWhich geometric deduction proves that the bisector rays $Ax$ and $By$ are parallel ($Ax \\parallel By$)?",
    options: [
      { id: 'A', text: "Both rays $Ax$ and $By$ are perpendicular to transversal line $b$." },
      { id: 'B', text: "$\\widehat{xAB} = \\widehat{yBA} = 45^\\circ$, forming equal alternate interior angles." },
      { id: 'C', text: "The sum $\\widehat{xAB} + \\widehat{yBA} = 180^\\circ$ as consecutive interior angles." },
      { id: 'D', text: "Rays $Ax$ and $By$ intersect transversal $b$ at right angles of $90^\\circ$." }
    ],
    correct_option_id: 'B',
    explanation: "Since line $b \\perp c$ and $b \\perp d$, the alternate interior angles each measure $90^\\circ$. The bisector rays $Ax$ and $By$ divide each $90^\\circ$ angle into half: $\\widehat{xAB} = \\frac{1}{2}(90^\\circ) = 45^\\circ$ and $\\widehat{yBA} = \\frac{1}{2}(90^\\circ) = 45^\\circ$. Because $\\widehat{xAB} = \\widehat{yBA} = 45^\\circ$ in alternate interior positions with respect to transversal $AB$, the bisector lines are parallel ($Ax \\parallel By$)."
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 5: Jupiter Station • Angle Bisectors",
    content_markdown: "In orbital triangle $ABC$, communication ray $Cx$ is aligned parallel to side $AB$ ($AB \\parallel Cx$). Telemetry reports $\\widehat{A} = 70^\\circ$ and $\\widehat{B} = 60^\\circ$.\n\n![Figure: Triangle with Parallel Ray Cx](/images/geometry/math7_ch3_q18_triangle_parallel_ray.svg)\n\nWhat are the degree measures of angles $\\widehat{C_2}$ (between $CA$ and $Cx$) and $\\widehat{C_3}$ (between $Cx$ and line $BC$ extended)?",
    options: [
      { id: 'A', text: "$\\widehat{C_2} = 60^\\circ$ and $\\widehat{C_3} = 70^\\circ$" },
      { id: 'B', text: "$\\widehat{C_2} = 50^\\circ$ and $\\widehat{C_3} = 70^\\circ$" },
      { id: 'C', text: "$\\widehat{C_2} = 70^\\circ$ and $\\widehat{C_3} = 50^\\circ$" },
      { id: 'D', text: "$\\widehat{C_2} = 70^\\circ$ and $\\widehat{C_3} = 60^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "Since $AB \\parallel Cx$: $\\widehat{C_2} = \\widehat{A} = 70^\\circ$ (alternate interior angles along transversal $AC$); $\\widehat{C_3} = \\widehat{B} = 60^\\circ$ (corresponding angles along transversal line $BCD$). Thus $\\widehat{C_2} = 70^\\circ$ and $\\widehat{C_3} = 60^\\circ$."
  },
  {
    order_index: 19,
    type: 'FILL_IN_BLANK',
    points: 0.33,
    sectionName: "Sector 5: Jupiter Station • Angle Bisectors",
    content_markdown: "Using the same telemetry configuration from Triangle $ABC$ ($AB \\parallel Cx$, $\\widehat{A} = 70^\\circ, \\widehat{B} = 60^\\circ, \\widehat{C_2} = 70^\\circ, \\widehat{C_3} = 60^\\circ$):\n\nCalculate the exact degree measure of the interior angle $\\widehat{C_1}$ (angle $\\widehat{ACB}$) of $\\triangle ABC$. (Enter numerical value only):",
    expected_value: "50",
    acceptable_answers: ["50", "50°", "50 deg"],
    explanation: "Since points $B, C, D$ lie on a straight line, the three adjacent angles form a straight angle: $\\widehat{C_1} + \\widehat{C_2} + \\widehat{C_3} = 180^\\circ$. Therefore $\\widehat{C_1} = 180^\\circ - (70^\\circ + 60^\\circ) = 180^\\circ - 130^\\circ = 50^\\circ$."
  },
  {
    order_index: 20,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 5: Jupiter Station • Angle Bisectors",
    content_markdown: "In navigation triangle $ABC$, flight path $BC$ is extended to waypoint $M$. Sensor ray $CN$ is the angle bisector of exterior angle $\\widehat{ACM}$. Telemetry registers $\\widehat{B} = 70^\\circ$ and interior angle $\\widehat{ACB} = 40^\\circ$.\n\n![Figure: Exterior Angle Bisector Parallel to Opposite Side](/images/geometry/math7_ch3_q20_exterior_bisector.svg)\n\nWhat is the exact degree measure of angle $\\widehat{A}$?",
    options: [
      { id: 'A', text: "$60^\\circ$" },
      { id: 'B', text: "$80^\\circ$" },
      { id: 'C', text: "$70^\\circ$" },
      { id: 'D', text: "$50^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "First, exterior angle $\\widehat{ACM} = 180^\\circ - \\widehat{ACB} = 180^\\circ - 40^\\circ = 140^\\circ$. Since $CN$ bisects $\\widehat{ACM}$, $\\widehat{ACN} = \\widehat{NCM} = \\frac{140^\\circ}{2} = 70^\\circ$. Because $\\widehat{NCM} = \\widehat{B} = 70^\\circ$ in corresponding positions along transversal $BM$, ray $CN \\parallel AB$. Consequently, $\\widehat{A} = \\widehat{ACN} = 70^\\circ$ (alternate interior angles)."
  },

  // ==========================================
  // SECTOR 6: SATURN RINGS (Q21 - Q24)
  // ==========================================
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 6: Saturn Rings • Perpendicular Deductions",
    content_markdown: "Consider the theorem: 'Two distinct lines perpendicular to a third line are parallel to each other.' What is the rigorous mathematical formulation of the Hypothesis (GT) and Conclusion (KL) of this theorem?",
    options: [
      { id: 'A', text: "GT: $a \\parallel b$ and $c \\perp a$; KL: $c \\perp b$." },
      { id: 'B', text: "GT: $a \\perp c$ and $b \\perp c$ ($a \\neq b$); KL: $a \\parallel b$." },
      { id: 'C', text: "GT: $a \\parallel c$ and $b \\parallel c$; KL: $a \\parallel b$." },
      { id: 'D', text: "GT: $a \\perp b$ and $b \\perp c$; KL: $a \\perp c$." }
    ],
    correct_option_id: 'B',
    explanation: "The hypothesis states the given conditions: two distinct lines $a$ and $b$ are both perpendicular to line $c$ ($a \\perp c, b \\perp c, a \\neq b$). The conclusion states the proved result: line $a$ is parallel to line $b$ ($a \\parallel b$)."
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 6: Saturn Rings • Perpendicular Deductions",
    content_markdown: "Distinct orbital lines $a$ and $b$ are both perpendicular to grid line $c$ ($a \\perp c, b \\perp c$). A fourth distinct line $d$ is perpendicular to line $a$ ($d \\perp a$).\n\n![Figure: Perpendicular and Parallel Network](/images/geometry/math7_ch3_q22_perpendicular_network.svg)\n\nWhich set of geometric deductions is completely TRUE?",
    options: [
      { id: 'A', text: "$a \\parallel b$, $c \\parallel d$, and $b \\perp d$" },
      { id: 'B', text: "$a \\perp b$, $c \\parallel d$, and $b \\parallel d$" },
      { id: 'C', text: "$a \\parallel b$, $c \\perp d$, and $b \\parallel d$" },
      { id: 'D', text: "$a \\perp b$, $c \\perp d$, and $b \\perp d$" }
    ],
    correct_option_id: 'A',
    explanation: "1) Since $a \\perp c$ and $b \\perp c$, $a \\parallel b$ (both perpendicular to $c$). 2) Since $c \\perp a$ and $d \\perp a$, $c \\parallel d$ (both perpendicular to $a$). 3) Since $a \\parallel b$ and $d \\perp a$, a line perpendicular to one of two parallel lines is perpendicular to the other, so $b \\perp d$."
  },
  {
    order_index: 23,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 6: Saturn Rings • Perpendicular Deductions",
    content_markdown: "In $\\triangle ABC$, altitude $AH$ is perpendicular to base $BC$ ($AH \\perp BC$). Line $d$ passes through vertex $A$ such that $\\widehat{dAC} = 50^\\circ$ and $\\widehat{C} = 50^\\circ$ (alternate interior positions).\n\n![Figure: Triangle Altitude and Parallel Line](/images/geometry/math7_ch3_q23_altitude_parallel.svg)\n\nWhich logical deduction correctly proves that line $d$ is perpendicular to altitude $AH$ ($d \\perp AH$)?",
    options: [
      { id: 'A', text: "Because $AH$ bisects angle $\\widehat{BAC}$ in an equilateral triangle." },
      { id: 'B', text: "Because angles $\\widehat{dAC}$ and $\\widehat{C}$ sum to $90^\\circ$." },
      { id: 'C', text: "Because $d \\parallel BC$ (from equal alternate interior angles), and a line perpendicular to one of two parallel lines ($AH \\perp BC$) is perpendicular to the other ($AH \\perp d$)." },
      { id: 'D', text: "Because line $d$ intersects $AH$ at a measured acute angle of $50^\\circ$." }
    ],
    correct_option_id: 'C',
    explanation: "First, since $\\widehat{dAC} = \\widehat{C} = 50^\\circ$ in alternate interior positions, $d \\parallel BC$ (by parallel recognition). Second, since $AH \\perp BC$ and $d \\parallel BC$, by parallel properties, $d \\perp AH$."
  },
  {
    order_index: 24,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 6: Saturn Rings • Perpendicular Deductions",
    content_markdown: "In a deep space defense grid, three distinct lines $a, b, c$ satisfy $a \\parallel b \\parallel c$. Two distinct sensor beams $m, n$ are both perpendicular to line $a$ ($m \\perp a, n \\perp a$). How many pairs of parallel lines and how many pairs of perpendicular lines exist in this five-line system?",
    options: [
      { id: 'A', text: "3 pairs of parallel lines, 5 pairs of perpendicular lines" },
      { id: 'B', text: "5 pairs of parallel lines, 6 pairs of perpendicular lines" },
      { id: 'C', text: "4 pairs of parallel lines, 4 pairs of perpendicular lines" },
      { id: 'D', text: "4 pairs of parallel lines, 6 pairs of perpendicular lines" }
    ],
    correct_option_id: 'D',
    explanation: "Parallel pairs: among $\{a, b, c\}$ there are $\\binom{3}{2} = 3$ pairs ($a \\parallel b, b \\parallel c, a \\parallel c$). Since $m \\perp a$ and $n \\perp a$, $m \\parallel n$ (1 pair). Total parallel pairs = $3 + 1 = 4$. Perpendicular pairs: $m$ is perpendicular to $a, b, c$ (3 pairs), and $n$ is perpendicular to $a, b, c$ (3 pairs). Total perpendicular pairs = $3 + 3 = 6$."
  },

  // ==========================================
  // SECTOR 7: URANUS DEEP SPACE (Q25 - Q28)
  // ==========================================
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 7: Uranus Deep Space • Zig-Zag Telemetry",
    content_markdown: "Two orbital communication rays are parallel ($Ax \\parallel By$). A bent trajectory $A - C - B$ has vertex $C$ located between the rays.\n\n![Figure: The Classic Zigzag Theorem](/images/geometry/math7_ch3_q25_zigzag_theorem.svg)\n\nTo prove the fundamental zigzag theorem that $\\widehat{ACB} = \\widehat{A} + \\widehat{B}$, which auxiliary geometric construction is essential?",
    options: [
      { id: 'A', text: "Draw an auxiliary ray through vertex $C$ parallel to ray $Ax$ (and therefore parallel to ray $By$)." },
      { id: 'B', text: "Extend segment $AC$ until it intersects ray $By$ at a right angle." },
      { id: 'C', text: "Construct the perpendicular bisector of segment $AB$." },
      { id: 'D', text: "Connect points $A$ and $B$ directly with a single straight line." }
    ],
    correct_option_id: 'A',
    explanation: "Drawing auxiliary ray $Cz \\parallel Ax$ through vertex $C$ divides $\\widehat{ACB}$ into $\\widehat{C_1}$ and $\\widehat{C_2}$. Since $Cz \\parallel Ax$, $\\widehat{C_1} = \\widehat{A}$ (alternate interior). Since $Cz \\parallel By$, $\\widehat{C_2} = \\widehat{B}$ (alternate interior). Adding these gives $\\widehat{ACB} = \\widehat{C_1} + \\widehat{C_2} = \\widehat{A} + \\widehat{B}$."
  },
  {
    order_index: 26,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 7: Uranus Deep Space • Zig-Zag Telemetry",
    content_markdown: "In a bent corridor navigation system, ray $Ox$ is drawn inside angle $\\widehat{BOD} = 110^\\circ$ parallel to trajectory $AB$ ($Ox \\parallel AB$). Sensors register $\\widehat{B} = 40^\\circ$ and $\\widehat{D} = 70^\\circ$.\n\n![Figure: Bent Corridor Telemetry with Ray Ox](/images/geometry/math7_ch3_q26_bent_corridor.svg)\n\nWhat is the measure of angle $\\widehat{BOx}$, and what is the relationship between lines $AB$ and $CD$?",
    options: [
      { id: 'A', text: "$\\widehat{BOx} = 50^\\circ$, and $AB$ is not parallel to $CD$." },
      { id: 'B', text: "$\\widehat{BOx} = 70^\\circ$, and $AB$ is perpendicular to $CD$." },
      { id: 'C', text: "$\\widehat{BOx} = 40^\\circ$, and $AB \\parallel CD$." },
      { id: 'D', text: "$\\widehat{BOx} = 40^\\circ$, and $AB$ intersects $CD$ at $30^\\circ$." }
    ],
    correct_option_id: 'C',
    explanation: "1) Since $Ox \\parallel AB$, alternate interior angles are equal: $\\widehat{BOx} = \\widehat{B} = 40^\\circ$. 2) Then $\\widehat{xOD} = \\widehat{BOD} - \\widehat{BOx} = 110^\\circ - 40^\\circ = 70^\\circ$. Since $\\widehat{xOD} = \\widehat{D} = 70^\\circ$ in alternate interior positions, $Ox \\parallel CD$. 3) Since $AB \\parallel Ox$ and $CD \\parallel Ox$, it follows that $AB \\parallel CD$."
  },
  {
    order_index: 27,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 7: Uranus Deep Space • Zig-Zag Telemetry",
    content_markdown: "In deep space flight lane $Ax \\parallel By$, navigation waypoint $C$ is situated between the parallel rays. Flight sensors calculate $\\widehat{xAC} = 38^\\circ$ and $\\widehat{yBC} = 52^\\circ$.\n\n![Figure: Numerical Zigzag Calculation](/images/geometry/math7_ch3_q27_zigzag_calc.svg)\n\nWhat is the exact degree measure of angle $\\widehat{ACB}$?",
    options: [
      { id: 'A', text: "$80^\\circ$" },
      { id: 'B', text: "$90^\\circ$" },
      { id: 'C', text: "$100^\\circ$" },
      { id: 'D', text: "$14^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "Applying the zigzag theorem for parallel rays $Ax \\parallel By$: $\\widehat{ACB} = \\widehat{xAC} + \\widehat{yBC} = 38^\\circ + 52^\\circ = 90^\\circ$. Waypoint $C$ turns at a precise right angle."
  },
  {
    order_index: 28,
    type: 'MULTIPLE_CHOICE',
    points: 0.32,
    sectionName: "Sector 7: Uranus Deep Space • Zig-Zag Telemetry",
    content_markdown: "In orbital triangle $ABC$, flight line $BE$ is parallel to $AC$ ($BE \\parallel AC$), and line $CF$ is parallel to $AB$ ($CF \\parallel AB$). Telemetry records $\\widehat{A} = 80^\\circ$ and $\\widehat{ABC} = 60^\\circ$.\n\n![Figure: Dual Parallels from Triangle Vertices](/images/geometry/math7_ch3_q28_dual_parallels.svg)\n\nWhat are the exact degree measures of angles $\\widehat{ABE}$ and $\\widehat{ACF}$?",
    options: [
      { id: 'A', text: "$\\widehat{ABE} = 60^\\circ$ and $\\widehat{ACF} = 80^\\circ$" },
      { id: 'B', text: "$\\widehat{ABE} = 100^\\circ$ and $\\widehat{ACF} = 100^\\circ$" },
      { id: 'C', text: "$\\widehat{ABE} = 80^\\circ$ and $\\widehat{ACF} = 60^\\circ$" },
      { id: 'D', text: "$\\widehat{ABE} = 80^\\circ$ and $\\widehat{ACF} = 80^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "1) Since $BE \\parallel AC$, alternate interior angles along transversal $AB$ are equal: $\\widehat{ABE} = \\widehat{A} = 80^\\circ$. 2) Since $CF \\parallel AB$, alternate interior angles along transversal $AC$ are equal: $\\widehat{ACF} = \\widehat{A} = 80^\\circ$. Both angles measure exactly $80^\\circ$."
  },

  // ==========================================
  // SECTOR 8: NEPTUNE FRONTIER (Q29 - Q30)
  // ==========================================
  {
    order_index: 29,
    type: 'ESSAY_UPLOAD',
    points: 0.50,
    sectionName: "Sector 8: Neptune Frontier • Proof Deductions",
    content_markdown: "**Formal Proof Mission:** Prove by contradiction the uniqueness theorem of perpendicular lines (SGK Exercise 3.32):\n\n*'Given a point $A$ and a line $d$, there exists a UNIQUE line passing through $A$ that is perpendicular to $d$.'*\n\nProvide your complete step-by-step mathematical reasoning or upload a clear photo of your handwritten proof.",
    rubric: "1. State contradiction hypothesis: Assume there are two distinct lines d1 and d2 passing through A both perpendicular to d.\n2. Apply parallel theorem: Two distinct lines perpendicular to a third line must be parallel (d1 || d2).\n3. Contradiction: Lines d1 and d2 intersect at common point A, which contradicts Euclid's Parallel Axiom.\n4. Conclusion: Lines d1 and d2 must coincide, proving uniqueness.",
    explanation: "MODEL PROOF BY CONTRADICTION:\n1. Assumption: Suppose there are two distinct lines $d_1, d_2$ passing through point $A$ with $d_1 \\perp d$ and $d_2 \\perp d$.\n2. Deduction: By the theorem 'two lines perpendicular to a third line are parallel', we must have $d_1 \\parallel d_2$.\n3. Contradiction: However, both lines $d_1$ and $d_2$ pass through the common point $A$. By Euclid's Axiom of parallel lines, through a point outside a line there is at most one parallel line; here $d_1$ and $d_2$ intersect at $A$, so they cannot be parallel unless they coincide.\n4. Conclusion: Thus $d_1$ and $d_2$ must be the same line. The line through $A$ perpendicular to $d$ is unique."
  },
  {
    order_index: 30,
    type: 'ESSAY_UPLOAD',
    points: 0.50,
    sectionName: "Sector 8: Neptune Frontier • Proof Deductions",
    content_markdown: "**Comprehensive Theorem Mission:** Refer to the dual-parallel flight corridor configuration (SBT Exercise 3.37):\n\nRay $Bx$ is the angle bisector of $\\widehat{ABE}$, and ray $Cy$ is the angle bisector of $\\widehat{ACF}$. Given that $BE \\parallel AC$ and $CF \\parallel AB$ with $\\widehat{A} = 80^\\circ$.\n\nProve rigorously that ray $Bx$ is parallel to ray $Cy$ ($Bx \\parallel Cy$). Provide each geometric deduction step or upload a clear photo of your handwritten proof.",
    rubric: "1. From BE || AC, ABE = A = 80°. Bx bisects ABE => xBA = 40°.\n2. From CF || AB, ACF = A = 80°. Cy bisects ACF => yCA = 40°.\n3. Show angles with transversal line AB or AC ensure parallel orientation.\n4. Conclude Bx || Cy.",
    explanation: "MODEL STEP-BY-STEP PROOF:\n1. Since $BE \\parallel AC$, alternate interior angles along transversal $AB$ are equal: $\\widehat{ABE} = \\widehat{BAC} = 80^\\circ$.\n2. Ray $Bx$ is the bisector of $\\widehat{ABE} \\Rightarrow \\widehat{EBx} = \\widehat{xBA} = \\frac{80^\\circ}{2} = 40^\\circ$.\n3. Since $CF \\parallel AB$, alternate interior angles along transversal $AC$ are equal: $\\widehat{ACF} = \\widehat{BAC} = 80^\\circ$.\n4. Ray $Cy$ is the bisector of $\\widehat{ACF} \\Rightarrow \\widehat{ACy} = \\widehat{yCF} = \\frac{80^\\circ}{2} = 40^\\circ$.\n5. Direction of lines $Bx$ and $Cy$: With transversal line $AB$, line $Bx$ makes an angle of $40^\\circ$ with $AB$. With transversal line $AC$, line $Cy$ makes an angle of $40^\\circ$ with $AC$. Since $BE \\parallel AC$ and $CF \\parallel AB$, the bisectors of these equal angles formed with the opposite parallel sides are themselves parallel: $Bx \\parallel Cy$."
  }
];

async function main() {
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  console.log(`🚀 [Keithley Math Seed] Launching Chapter III Grand Review Mission`);
  console.log(`📅 Target Flight Date: ${CONSTANTS.ASSIGNED_DATE} | Total Problems: ${QUESTIONS.length}`);

  // 1. Clean up existing assignment for this date if present
  const existingAsgn = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: targetDate
    },
    include: {
      assessment_attempts: true
    }
  });

  if (existingAsgn) {
    console.log(`⚠️ Existing assignment detected for date ${CONSTANTS.ASSIGNED_DATE}. Refreshing orbital data...`);
    for (const att of existingAsgn.assessment_attempts) {
      await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
      await prisma.assessment_attempts.delete({ where: { id: att.id } });
    }
    await prisma.daily_student_assignments.delete({ where: { id: existingAsgn.id } });
    console.log(`✓ Cleaned previous mission and attempts.`);
  }

  // 2. Create Learning Unit (Flight Briefing)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: "Chapter III Comprehensive Review: Angles & Parallel Lines",
      description: "Deep Space Telemetry Review: Special angle pairs, perpendicular lines, Euclid's parallel postulate, angle bisector theorems, and formal geometric proofs across 8 Planetary Sectors.",
      lecture_content_markdown: LECTURE_MARKDOWN,
      lecture_attachments: [],
      is_template: true
    }
  });
  console.log(`✅ Created Learning Unit: ${unit.id} ("${unit.title}")`);

  // 3. Create Daily Student Assignment
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: targetDate,
      custom_session_minutes: 120,
      teacher_daily_note: "Cadet Keithley, this is our grand Chapter III flight exam across all 8 Planetary Stations! Apply alternate interior equality, consecutive interior supplementary sums, and auxiliary parallel lines with precision.",
      is_published: true
    }
  });
  console.log(`✅ Created Daily Mission Assignment: ${assignment.id}`);

  // 4. Create Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: "Chapter III Review: Angles, Parallel Lines & Formal Geometric Proofs (30 Problems)",
      instructions: "Timed 120-minute cosmic mathematics expedition spanning Mercury to Neptune with per-question chronometer controls.",
      time_limit_minutes: 120,
      max_score: 10.0
    }
  });
  console.log(`✅ Created In-Session Assessment: ${assessment.id}`);

  // 5. Bulk Create Questions
  for (const q of QUESTIONS) {
    const qType = q.type || 'MULTIPLE_CHOICE';
    let questionPayload = {
      content_markdown: q.content_markdown,
      sectionName: q.sectionName
    };

    if (qType === 'MULTIPLE_CHOICE') {
      questionPayload.options = q.options.map(opt => ({
        id: opt.id,
        text: opt.text
      }));
      // Critical for buzzer/chime/shake animation
      questionPayload.correct_option_id = q.correct_option_id;
    }

    let gradingPayload = {};
    if (qType === 'MULTIPLE_CHOICE') {
      gradingPayload = {
        correct_option_id: q.correct_option_id,
        explanation_markdown: q.explanation
      };
    } else if (qType === 'FILL_IN_BLANK') {
      gradingPayload = {
        acceptable_answers: q.acceptable_answers || [q.expected_value],
        explanation_markdown: q.explanation
      };
    } else if (qType === 'ESSAY_UPLOAD') {
      gradingPayload = {
        rubric_markdown: q.rubric,
        explanation_markdown: q.explanation
      };
    }

    await prisma.questions.create({
      data: {
        assessment_id: assessment.id,
        order_index: q.order_index,
        points: q.points,
        type: qType,
        question_payload: questionPayload,
        grading_key_payload: gradingPayload
      }
    });
  }
  console.log(`✅ Loaded ${QUESTIONS.length} problems into Assessment questions.`);

  // 6. Create Initial Assessment Attempt
  const attempt = await prisma.assessment_attempts.create({
    data: {
      assessment_id: assessment.id,
      student_id: CONSTANTS.STUDENT_ID,
      daily_assignment_id: assignment.id,
      status: 'NOT_STARTED',
      total_score: 0.0,
      time_spent_seconds: 0
    }
  });
  console.log(`✅ Initialized Mission Attempt: ${attempt.id} (Status: NOT_STARTED)`);

  console.log('\n🎉 ALL SYSTEMS GO! Keithley Chapter III Math Mission successfully seeded for 2026-11-19.');
}

main()
  .catch(err => {
    console.error('❌ Execution Error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
