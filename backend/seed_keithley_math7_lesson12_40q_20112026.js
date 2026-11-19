#!/usr/bin/env node

/**
 * SEED SCRIPT: KEITHLEY LAKE (GRADE 7)
 * MISSION: Lesson 12: Sum of Angles in a Triangle (40 Problems)
 * DATE: 2026-11-20
 */

const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Flight Commander Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Astronaut Cadet Keithley Lake
  SUBJECT_ID: 'e89cc834-99d0-40b7-ab5e-0a0838d273c4', // Grade 7 Math (MATH_7)
  ASSIGNED_DATE: '2026-11-20'
};

const LECTURE_MARKDOWN = `# 🚀 Lesson 12 Flight Briefing: Sum of Angles in a Triangle

Welcome aboard, Astronaut Cadet Keithley! Today we launch into **Chapter IV: Triangles** with **Lesson 12: Sum of Angles in a Triangle**. Review your celestial flight briefing and test your telemetry in the Interactive Web Studio!

---

### 1. The Fundamental Angle Sum Theorem
In any Euclidean triangle, the sum of all three interior angles is always exactly $180^\\circ$:
$$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$$

**Proof by Auxiliary Parallel Line:**
- Through vertex $A$, draw line $xy \\parallel BC$.
- Since $xy \\parallel BC$, alternate interior angles are equal: $\\widehat{B} = \\widehat{BAx}$ and $\\widehat{C} = \\widehat{CAy}$.
- Because $xAy$ is a straight line ($180^\\circ$), $\\widehat{BAC} + \\widehat{BAx} + \\widehat{CAy} = 180^\\circ \\implies \\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$.

---

### 2. Triangle Classification by Angles
Every triangle is classified into one of three distinct categories:
1. **Acute Triangle:** All 3 angles are acute (each $< 90^\\circ$).
2. **Right Triangle:** Has exactly one right angle ($= 90^\\circ$). The side opposite the $90^\\circ$ angle is the **hypotenuse**, and the other two sides are **legs**.
   - *Key Theorem:* In a right triangle, the two acute angles are **complementary** ($\\widehat{B} + \\widehat{C} = 90^\\circ$).
3. **Obtuse Triangle:** Has exactly one obtuse angle ($> 90^\\circ$).

---

### 3. The Exterior Angle Theorem
An exterior angle is formed by extending one side of a triangle past a vertex:
$$\\widehat{ACx} = \\widehat{A} + \\widehat{B}$$
- *Key Property:* Each exterior angle equals the sum of the two remote (non-adjacent) interior angles.
- *Inequality Corollary:* An exterior angle is strictly greater than either of its remote interior angles ($\\widehat{ACx} > \\widehat{A}$ and $\\widehat{ACx} > \\widehat{B}$).

---

### 4. Interactive Flight Studio
Launch your dedicated flight simulator room:
- **Web Studio:** [Launch Lesson 12 Interactive Studio](/lectures/math7-lesson12-triangle-angles/index.html)
`;

const QUESTIONS = [
  // ==========================================
  // SECTOR 1: MERCURY ORBIT (Q1 - Q5)
  // ==========================================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 1: Mercury Orbit • Angle Sum Fundamentals",
    content_markdown: "What is the exact sum of all three interior angles in any planar triangle according to the fundamental Euclidean theorem?",
    options: [
      { id: 'A', text: "$90^\\circ$" },
      { id: 'B', text: "$180^\\circ$" },
      { id: 'C', text: "$270^\\circ$" },
      { id: 'D', text: "$360^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "In any planar Euclidean triangle, the sum of all three interior angles is always strictly $180^\\circ$ ($\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$)."
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 1: Mercury Orbit • Angle Sum Fundamentals",
    content_markdown: "Triangle $\\triangle ABC$ has interior angles $\\widehat{A} = 50^\\circ$ and $\\widehat{B} = 60^\\circ$.\n\n![Figure: Triangle ABC](/images/geometry/math7_l12_q2_triangle_abc.svg)\n\nWhat is the exact degree measurement of angle $\\widehat{C}$?",
    options: [
      { id: 'A', text: "$60^\\circ$" },
      { id: 'B', text: "$80^\\circ$" },
      { id: 'C', text: "$70^\\circ$" },
      { id: 'D', text: "$50^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "By the angle sum theorem, $\\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B}) = 180^\\circ - (50^\\circ + 60^\\circ) = 180^\\circ - 110^\\circ = 70^\\circ$."
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 1: Mercury Orbit • Angle Sum Fundamentals",
    content_markdown: "In telemetry triangle $\\triangle DEF$, navigation sensors detect angle $\\widehat{E} = 30^\\circ$ and angle $\\widehat{F} = 50^\\circ$.\n\n![Figure: Obtuse Triangle DEF](/images/geometry/math7_l12_q3_triangle_obtuse.svg)\n\nWhat is the degree measure of angle $\\widehat{D}$?",
    options: [
      { id: 'A', text: "$100^\\circ$" },
      { id: 'B', text: "$90^\\circ$" },
      { id: 'C', text: "$110^\\circ$" },
      { id: 'D', text: "$80^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "$\\widehat{D} = 180^\\circ - (\\widehat{E} + \\widehat{F}) = 180^\\circ - (30^\\circ + 50^\\circ) = 180^\\circ - 80^\\circ = 100^\\circ$."
  },
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 1: Mercury Orbit • Angle Sum Fundamentals",
    content_markdown: "In a triangle where two angles are equal, if the vertex angle measures $40^\\circ$, what is the degree measure of each of the two base angles?",
    options: [
      { id: 'A', text: "$60^\\circ$" },
      { id: 'B', text: "$80^\\circ$" },
      { id: 'C', text: "$50^\\circ$" },
      { id: 'D', text: "$70^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "The sum of the two base angles is $180^\\circ - 40^\\circ = 140^\\circ$. Since they are equal, each base angle is $\\frac{140^\\circ}{2} = 70^\\circ$."
  },
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 1: Mercury Orbit • Angle Sum Fundamentals",
    content_markdown: "A flight module's solar array is shaped like a triangle with angles $120^\\circ$ and $35^\\circ$.\n\n![Figure: Unknown Angle x](/images/geometry/math7_l12_q5_triangle_angles_sgk46a.svg)\n\nWhat is the value of the unknown angle $x$?",
    options: [
      { id: 'A', text: "$35^\\circ$" },
      { id: 'B', text: "$25^\\circ$" },
      { id: 'C', text: "$15^\\circ$" },
      { id: 'D', text: "$45^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "$x = 180^\\circ - (120^\\circ + 35^\\circ) = 180^\\circ - 155^\\circ = 25^\\circ$."
  },

  // ==========================================
  // SECTOR 2: VENUS BASE (Q6 - Q10)
  // ==========================================
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 2: Venus Base • Triangle Classification",
    content_markdown: "Triangle $\\triangle ABC$ has angles measuring $50^\\circ$ and $40^\\circ$.\n\n![Figure: Triangle ABC](/images/geometry/math7_l12_q6_classify_right.svg)\n\nHow is this triangle classified by its angles?",
    options: [
      { id: 'A', text: "Obtuse triangle" },
      { id: 'B', text: "Acute triangle" },
      { id: 'C', text: "Right triangle" },
      { id: 'D', text: "Equilateral triangle" }
    ],
    correct_option_id: 'C',
    explanation: "The third angle is $180^\\circ - (50^\\circ + 40^\\circ) = 90^\\circ$. Because it contains a $90^\\circ$ right angle, it is classified as a right triangle."
  },
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 2: Venus Base • Triangle Classification",
    content_markdown: "Triangle $\\triangle DEF$ has angles measuring $55^\\circ$ and $63^\\circ$.\n\n![Figure: Triangle DEF](/images/geometry/math7_l12_q7_classify_acute.svg)\n\nWhich classification correctly describes $\\triangle DEF$?",
    options: [
      { id: 'A', text: "Acute triangle, because all three angles ($55^\\circ, 63^\\circ, 62^\\circ$) are strictly less than $90^\\circ$." },
      { id: 'B', text: "Right triangle, because the sum of two angles exceeds $90^\\circ$." },
      { id: 'C', text: "Obtuse triangle, because the largest angle is $63^\\circ$." },
      { id: 'D', text: "Scalene right triangle, because all three side lengths differ." }
    ],
    correct_option_id: 'A',
    explanation: "The third angle is $180^\\circ - (55^\\circ + 63^\\circ) = 62^\\circ$. Since all three angles ($55^\\circ, 63^\\circ, 62^\\circ$) are less than $90^\\circ$, it is an acute triangle."
  },
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 2: Venus Base • Triangle Classification",
    content_markdown: "Triangle $\\triangle MNP$ has two interior angles measuring $50^\\circ$ and $30^\\circ$.\n\n![Figure: Triangle MNP](/images/geometry/math7_l12_q8_classify_obtuse.svg)\n\nWhich statement about $\\triangle MNP$ is mathematically TRUE?",
    options: [
      { id: 'A', text: "It is an acute triangle because two angles are acute." },
      { id: 'B', text: "It is a right triangle because $50^\\circ + 30^\\circ < 90^\\circ$." },
      { id: 'C', text: "It is an equilateral triangle with equal side lengths." },
      { id: 'D', text: "It is an obtuse triangle because the third angle measures $100^\\circ$ ($> 90^\\circ$)." }
    ],
    correct_option_id: 'D',
    explanation: "The third angle is $180^\\circ - (50^\\circ + 30^\\circ) = 100^\\circ$. An angle greater than $90^\\circ$ is obtuse, making $\\triangle MNP$ an obtuse triangle."
  },
  {
    order_index: 9,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 2: Venus Base • Triangle Classification",
    content_markdown: "What is the maximum number of obtuse angles ($> 90^\\circ$) that any Euclidean triangle can contain?",
    options: [
      { id: 'A', text: "0" },
      { id: 'B', text: "1" },
      { id: 'C', text: "2" },
      { id: 'D', text: "3" }
    ],
    correct_option_id: 'B',
    explanation: "If a triangle had 2 obtuse angles, their sum would exceed $90^\\circ + 90^\\circ = 180^\\circ$, which is impossible because all three angles must sum to $180^\\circ$. Therefore, a triangle can have at most 1 obtuse angle."
  },
  {
    order_index: 10,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 2: Venus Base • Triangle Classification",
    content_markdown: "In an equiangular (equilateral) triangle where all three interior angles are equal ($\\widehat{A} = \\widehat{B} = \\widehat{C}$), what is the measure of each angle?",
    options: [
      { id: 'A', text: "$45^\\circ$" },
      { id: 'B', text: "$50^\\circ$" },
      { id: 'C', text: "$60^\\circ$" },
      { id: 'D', text: "$90^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "$3\\widehat{A} = 180^\\circ \\implies \\widehat{A} = 60^\\circ$."
  },

  // ==========================================
  // SECTOR 3: EARTH MISSION CONTROL (Q11 - Q15)
  // ==========================================
  {
    order_index: 11,
    type: 'FILL_IN_BLANK',
    points: 0.26,
    sectionName: "Sector 3: Earth Mission Control • Right Triangles & Complementary Angles",
    content_markdown: "In right triangle $\\triangle MNP$ with right angle at $M$ ($\\widehat{M} = 90^\\circ$), acute angle $\\widehat{N} = 55^\\circ$.\n\n![Figure: Right Triangle MNP](/images/geometry/math7_l12_q11_right_triangle_calc.svg)\n\nCalculate the degree measure of acute angle $\\widehat{P}$. (Enter numerical value only):",
    expected_value: "35",
    acceptable_answers: ["35", "35°", "35 deg"],
    explanation: "In a right triangle, the acute angles are complementary: $\\widehat{P} = 90^\\circ - 55^\\circ = 35^\\circ$."
  },
  {
    order_index: 12,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 3: Earth Mission Control • Right Triangles & Complementary Angles",
    content_markdown: "In a right triangle $\\triangle ABC$ with right angle at vertex $A$ ($\\widehat{A} = 90^\\circ$):\n\n![Figure: Right Triangle Anatomy](/images/geometry/math7_l12_q12_right_triangle_legs.svg)\n\nWhich segment is defined as the hypotenuse?",
    options: [
      { id: 'A', text: "Segment $BC$ (the side opposite the $90^\\circ$ right angle)" },
      { id: 'B', text: "Segment $AB$ (the vertical leg)" },
      { id: 'C', text: "Segment $AC$ (the horizontal leg)" },
      { id: 'D', text: "The altitude drawn from vertex $A$" }
    ],
    correct_option_id: 'A',
    explanation: "By geometric definition, the side directly facing the right angle is the hypotenuse. Here, facing $\\widehat{A} = 90^\\circ$ is side $BC$."
  },
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 3: Earth Mission Control • Right Triangles & Complementary Angles",
    content_markdown: "A deep space ground radar tracks a satellite, forming a right triangle with the base station. The ground elevation angle is $28^\\circ$.\n\n![Figure: Elevation Telemetry](/images/geometry/math7_l12_q13_right_triangle_elevation.svg)\n\nWhat is the satellite's complementary angle $\\theta$ at the top vertex?",
    options: [
      { id: 'A', text: "$72^\\circ$" },
      { id: 'B', text: "$52^\\circ$" },
      { id: 'C', text: "$152^\\circ$" },
      { id: 'D', text: "$62^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "In a right triangle, acute angles are complementary: $\\theta = 90^\\circ - 28^\\circ = 62^\\circ$."
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 3: Earth Mission Control • Right Triangles & Complementary Angles",
    content_markdown: "In an isosceles right triangle (a right triangle with two equal legs), what is the degree measure of each of the two acute angles?",
    options: [
      { id: 'A', text: "$30^\\circ$" },
      { id: 'B', text: "$45^\\circ$" },
      { id: 'C', text: "$60^\\circ$" },
      { id: 'D', text: "$90^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "The two acute angles are equal and their sum is $90^\\circ$: $\\frac{90^\\circ}{2} = 45^\\circ$."
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 3: Earth Mission Control • Right Triangles & Complementary Angles",
    content_markdown: "In a right triangle, one acute angle is double the other acute angle ($\\widehat{B} = 2\\widehat{C}$). What are the measurements of these two acute angles?",
    options: [
      { id: 'A', text: "$40^\\circ$ and $50^\\circ$" },
      { id: 'B', text: "$20^\\circ$ and $70^\\circ$" },
      { id: 'C', text: "$60^\\circ$ and $30^\\circ$" },
      { id: 'D', text: "$45^\\circ$ and $45^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "$\\widehat{B} + \\widehat{C} = 90^\\circ \\implies 2\\widehat{C} + \\widehat{C} = 90^\\circ \\implies 3\\widehat{C} = 90^\\circ \\implies \\widehat{C} = 30^\\circ$ and $\\widehat{B} = 60^\\circ$."
  },

  // ==========================================
  // SECTOR 4: MARS OUTPOST (Q16 - Q20)
  // ==========================================
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 4: Mars Outpost • Exterior Angle Theorems",
    content_markdown: "In triangle $\\triangle ABC$, side $BC$ is extended to ray $Bx$, forming exterior angle $\\widehat{ACx}$.\n\n![Figure: Exterior Angle Definition](/images/geometry/math7_l12_q16_exterior_angle_def.svg)\n\nAccording to the Exterior Angle Theorem, what is the exact formula for $\\widehat{ACx}$?",
    options: [
      { id: 'A', text: "$\\widehat{ACx} = \\widehat{A} + \\widehat{B}$" },
      { id: 'B', text: "$\\widehat{ACx} = 180^\\circ - (\\widehat{A} + \\widehat{B})$" },
      { id: 'C', text: "$\\widehat{ACx} = \\widehat{A} - \\widehat{B}$" },
      { id: 'D', text: "$\\widehat{ACx} = \\frac{1}{2}(\\widehat{A} + \\widehat{B})$" }
    ],
    correct_option_id: 'A',
    explanation: "Every exterior angle of a triangle is equal to the sum of the two remote (non-adjacent) interior angles: $\\widehat{ACx} = \\widehat{A} + \\widehat{B}$."
  },
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 4: Mars Outpost • Exterior Angle Theorems",
    content_markdown: "In the telemetry diagram below, the exterior angle at vertex $B$ measures $120^\\circ$ and vertex angle $\\widehat{A} = 80^\\circ$.\n\n![Figure: Multi-Angle Telemetry](/images/geometry/math7_l12_q17_exterior_sgk48.svg)\n\nWhat are the values of interior angle $x$ (at $B$) and interior angle $y$ (at $C$)?",
    options: [
      { id: 'A', text: "$x = 80^\\circ$ and $y = 20^\\circ$" },
      { id: 'B', text: "$x = 50^\\circ$ and $y = 50^\\circ$" },
      { id: 'C', text: "$x = 70^\\circ$ and $y = 30^\\circ$" },
      { id: 'D', text: "$x = 60^\\circ$ and $y = 40^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "Interior angle $x = 180^\\circ - 120^\\circ = 60^\\circ$ (linear pair). By angle sum or exterior angle: $y = 120^\\circ - 80^\circ = 40^\circ$ (or $180^\circ - (80^\circ + 60^\circ) = 40^\circ$)."
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 4: Mars Outpost • Exterior Angle Theorems",
    content_markdown: "In orbital triangle telemetry, the exterior angle at the left base is $100^\\circ$ and the top apex angle is $50^\\circ$.\n\n![Figure: Exterior Angle Equation](/images/geometry/math7_l12_q18_exterior_sbt45.svg)\n\nWhat are the values of interior angle $x$ and exterior angle $y$ at the right base?",
    options: [
      { id: 'A', text: "$x = 70^\\circ$ and $y = 120^\\circ$" },
      { id: 'B', text: "$x = 80^\\circ$ and $y = 130^\\circ$" },
      { id: 'C', text: "$x = 90^\\circ$ and $y = 140^\\circ$" },
      { id: 'D', text: "$x = 80^\\circ$ and $y = 100^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "Linear pair at left: $x = 180^\\circ - 100^\\circ = 80^\\circ$. The third interior angle is $180^\\circ - (50^\\circ + 80^\\circ) = 50^\\circ$. Exterior angle $y = 180^\\circ - 50^\\circ = 130^\\circ$ (or $y = 50^\\circ + 80^\\circ = 130^\\circ$)."
  },
  {
    order_index: 19,
    type: 'FILL_IN_BLANK',
    points: 0.26,
    sectionName: "Sector 4: Mars Outpost • Exterior Angle Theorems",
    content_markdown: "In $\\triangle ABC$, interior angle $\\widehat{A} = 85^\\circ$ and interior angle $\\widehat{B} = 60^\\circ$. Calculate the exact degree measure of the exterior angle at vertex $C$. (Enter numerical value only):",
    expected_value: "145",
    acceptable_answers: ["145", "145°", "145 deg"],
    explanation: "By the Exterior Angle Theorem, exterior angle at $C = \\widehat{A} + \\widehat{B} = 85^\\circ + 60^\\circ = 145^\\circ$."
  },
  {
    order_index: 20,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 4: Mars Outpost • Exterior Angle Theorems",
    content_markdown: "If the exterior angle at vertex $C$ of $\\triangle ABC$ is $110^\\circ$, which of the following is guaranteed to be TRUE regarding interior angle $\\widehat{A}$?",
    options: [
      { id: 'A', text: "$\\widehat{A} = 110^\\circ$" },
      { id: 'B', text: "$\\widehat{A} > 110^\\circ$" },
      { id: 'C', text: "$\\widehat{A} < 110^\\circ$" },
      { id: 'D', text: "$\\widehat{A} = 70^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "Since exterior angle $\\widehat{C_{\\text{ext}}} = \\widehat{A} + \\widehat{B}$ and $\\widehat{B} > 0^\\circ$, it follows that $\\widehat{A} < \\widehat{C_{\\text{ext}}} = 110^\\circ$."
  },

  // ==========================================
  // SECTOR 5: JUPITER STATION (Q21 - Q25)
  // ==========================================
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 5: Jupiter Station • Algebraic Angle Formulations",
    content_markdown: "In $\\triangle ABC$, interior angle $\\widehat{A} = 105^\\circ$, the exterior angle at vertex $B$ is expressed as $8x$, and interior angle $\\widehat{C}$ is $x$.\n\n![Figure: Algebraic Exterior Telemetry](/images/geometry/math7_l12_q21_algebraic_sbt46.svg)\n\nWhat is the value of $x$, and what is the measure of angle $\\widehat{C}$?",
    options: [
      { id: 'A', text: "$x = 15^\\circ$ and $\\widehat{C} = 15^\\circ$" },
      { id: 'B', text: "$x = 12^\\circ$ and $\\widehat{C} = 12^\\circ$" },
      { id: 'C', text: "$x = 20^\\circ$ and $\\widehat{C} = 20^\\circ$" },
      { id: 'D', text: "$x = 10^\\circ$ and $\\widehat{C} = 10^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "By the Exterior Angle Theorem, exterior angle at $B$ equals $\\widehat{A} + \\widehat{C}$: $8x = 105^\\circ + x \\implies 7x = 105^\\circ \\implies x = 15^\\circ$. Hence $\\widehat{C} = 15^\\circ$."
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 5: Jupiter Station • Algebraic Angle Formulations",
    content_markdown: "The three interior angles of a triangle are in the ratio $2x : 3x : 4x$.\n\n![Figure: Angle Ratio Formulation](/images/geometry/math7_l12_q22_ratio_2x3x4x.svg)\n\nWhat is the value of $x$, and what is the largest angle of the triangle?",
    options: [
      { id: 'A', text: "$x = 15^\\circ$, largest angle = $60^\\circ$" },
      { id: 'B', text: "$x = 18^\\circ$, largest angle = $72^\\circ$" },
      { id: 'C', text: "$x = 25^\\circ$, largest angle = $100^\\circ$" },
      { id: 'D', text: "$x = 20^\\circ$, largest angle = $80^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "$2x + 3x + 4x = 180^\\circ \\implies 9x = 180^\\circ \\implies x = 20^\\circ$. The angles are $40^\\circ, 60^\\circ, 80^\\circ$, so the largest angle is $80^\\circ$."
  },
  {
    order_index: 23,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 5: Jupiter Station • Algebraic Angle Formulations",
    content_markdown: "The three angles of a triangle form an arithmetic progression: $x - d, x, x + d$. What MUST the middle angle $x$ be equal to?",
    options: [
      { id: 'A', text: "$45^\\circ$" },
      { id: 'B', text: "$60^\\circ$" },
      { id: 'C', text: "$90^\\circ$" },
      { id: 'D', text: "$75^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "$(x - d) + x + (x + d) = 180^\\circ \\implies 3x = 180^\\circ \\implies x = 60^\\circ$. The middle angle of any three angles in arithmetic progression in a triangle is always $60^\\circ$."
  },
  {
    order_index: 24,
    type: 'FILL_IN_BLANK',
    points: 0.26,
    sectionName: "Sector 5: Jupiter Station • Algebraic Angle Formulations",
    content_markdown: "Triangle $\\triangle ABC$ satisfies the angle relation $\\widehat{A} = \\widehat{B} = 2\\widehat{C}$. Calculate the exact degree measurement of angle $\\widehat{C}$. (Enter numerical value only):",
    expected_value: "36",
    acceptable_answers: ["36", "36°", "36 deg"],
    explanation: "$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ \\implies 2\\widehat{C} + 2\\widehat{C} + \\widehat{C} = 180^\\circ \\implies 5\\widehat{C} = 180^\\circ \\implies \\widehat{C} = 36^\\circ$."
  },
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 5: Jupiter Station • Algebraic Angle Formulations",
    content_markdown: "For the triangle from the previous question where $\\widehat{A} = \\widehat{B} = 2\\widehat{C}$ (angles measure $72^\\circ, 72^\\circ, 36^\\circ$):\n\n![Figure: Harmonic Angle Ratio](/images/geometry/math7_l12_q25_ratio_sbt49.svg)\n\nHow is $\\triangle ABC$ classified by its angles?",
    options: [
      { id: 'A', text: "Right triangle" },
      { id: 'B', text: "Obtuse triangle" },
      { id: 'C', text: "Acute triangle" },
      { id: 'D', text: "Equilateral triangle" }
    ],
    correct_option_id: 'C',
    explanation: "The three angles are $72^\\circ, 72^\\circ, 36^\\circ$. Because all three angles are strictly less than $90^\\circ$, it is classified as an acute triangle."
  },

  // ==========================================
  // SECTOR 6: SATURN RINGS (Q26 - Q30)
  // ==========================================
  {
    order_index: 26,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 6: Saturn Rings • Angle Inequality & Ordering Telemetry",
    content_markdown: "In $\\triangle ABC$, angle $\\widehat{A} = 60^\\circ$ and $\\widehat{B} > \\widehat{A}$. Which of the following lists the angles $\\widehat{A}, \\widehat{B}, \\widehat{C}$ in strictly ASCENDING order (from smallest to largest)?",
    options: [
      { id: 'A', text: "$\\widehat{C} < \\widehat{A} < \\widehat{B}$" },
      { id: 'B', text: "$\\widehat{A} < \\widehat{B} < \\widehat{C}$" },
      { id: 'C', text: "$\\widehat{B} < \\widehat{A} < \\widehat{C}$" },
      { id: 'D', text: "$\\widehat{C} < \\widehat{B} < \\widehat{A}$" }
    ],
    correct_option_id: 'A',
    explanation: "Since $\\widehat{A} = 60^\\circ$ and $\\widehat{B} > 60^\\circ$, $\\widehat{A} + \\widehat{B} > 120^\\circ$. Therefore $\\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B}) < 60^\\circ$. Hence $\\widehat{C} < 60^\\circ = \\widehat{A} < \\widehat{B}$, which is $\\widehat{C} < \\widehat{A} < \\widehat{B}$."
  },
  {
    order_index: 27,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 6: Saturn Rings • Angle Inequality & Ordering Telemetry",
    content_markdown: "In the intersecting flight corridor diagram below, two lines intersect at $80^\\circ$ and meet another line at $60^\\circ$.\n\n![Figure: Intersecting Flight Paths](/images/geometry/math7_l12_q27_intersecting_lines_sbt47.svg)\n\nWhat is the value of unknown angle $x$?",
    options: [
      { id: 'A', text: "$30^\\circ$" },
      { id: 'B', text: "$50^\\circ$" },
      { id: 'C', text: "$60^\\circ$" },
      { id: 'D', text: "$40^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "The vertically opposite angle inside the triangle is $80^\\circ$. Together with $60^\\circ$, the third angle inside the triangle is $180^\\circ - (80^\\circ + 60^\\circ) = 40^\\circ$. The vertically opposite angle or alternate angle $x$ is $40^\\circ$."
  },
  {
    order_index: 28,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 6: Saturn Rings • Angle Inequality & Ordering Telemetry",
    content_markdown: "In $\\triangle ABC$, angle $\\widehat{A} = 55^\\circ$ and $\\widehat{B} < \\widehat{A}$. Which of the following lists the angles in strictly ASCENDING order (smallest to largest)?",
    options: [
      { id: 'A', text: "$\\widehat{A} < \\widehat{B} < \\widehat{C}$" },
      { id: 'B', text: "$\\widehat{B} < \\widehat{A} < \\widehat{C}$" },
      { id: 'C', text: "$\\widehat{C} < \\widehat{B} < \\widehat{A}$" },
      { id: 'D', text: "$\\widehat{B} < \\widehat{C} < \\widehat{A}$" }
    ],
    correct_option_id: 'B',
    explanation: "Since $\\widehat{B} < 55^\\circ$, $\\widehat{A} + \\widehat{B} < 110^\\circ$, so $\\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B}) > 70^\\circ$. Thus $\\widehat{B} < 55^\\circ = \\widehat{A} < \\widehat{C}$, meaning $\\widehat{B} < \\widehat{A} < \\widehat{C}$."
  },
  {
    order_index: 29,
    type: 'FILL_IN_BLANK',
    points: 0.26,
    sectionName: "Sector 6: Saturn Rings • Angle Inequality & Ordering Telemetry",
    content_markdown: "In a right triangle with right angle at $A$, the difference between the two acute angles is $30^\\circ$ ($\\widehat{B} - \\widehat{C} = 30^\\circ$). Calculate the degree measure of the smaller acute angle $\\widehat{C}$. (Enter numerical value only):",
    expected_value: "30",
    acceptable_answers: ["30", "30°", "30 deg"],
    explanation: "$\\widehat{B} + \\widehat{C} = 90^\\circ$ and $\\widehat{B} - \\widehat{C} = 30^\\circ$. Adding gives $2\\widehat{B} = 120^\\circ \\implies \\widehat{B} = 60^\\circ$. Thus $\\widehat{C} = 30^\\circ$."
  },
  {
    order_index: 30,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 6: Saturn Rings • Angle Inequality & Ordering Telemetry",
    content_markdown: "In $\\triangle ABC$, angle $\\widehat{A} > 90^\\circ$ (obtuse) and $\\widehat{B} > 45^\\circ$. Which ordering lists the angles in strictly DESCENDING order (from largest to smallest)?",
    options: [
      { id: 'A', text: "$\\widehat{C} > \\widehat{B} > \\widehat{A}$" },
      { id: 'B', text: "$\\widehat{B} > \\widehat{A} > \\widehat{C}$" },
      { id: 'C', text: "$\\widehat{A} > \\widehat{B} > \\widehat{C}$" },
      { id: 'D', text: "$\\widehat{A} > \\widehat{C} > \\widehat{B}$" }
    ],
    correct_option_id: 'C',
    explanation: "Since $\\widehat{A} > 90^\\circ$ and $\\widehat{B} > 45^\\circ$, $\\widehat{A} + \\widehat{B} > 135^\\circ \\implies \\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B}) < 45^\\circ$. Thus $\\widehat{A} > 90^\\circ > \\widehat{B} > 45^\\circ > \\widehat{C}$, so $\\widehat{A} > \\widehat{B} > \\widehat{C}$."
  },

  // ==========================================
  // SECTOR 7: URANUS DEEP SPACE (Q31 - Q35)
  // ==========================================
  {
    order_index: 31,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 7: Uranus Deep Space • Composite Polygonal Telemetry",
    content_markdown: "Quadrilateral $ABCD$ is split by diagonal $BD$ into two triangles $\\triangle ABD$ and $\\triangle BCD$. Telemetry registers $\\widehat{ABD} = 30^\\circ, \\widehat{ADB} = 50^\\circ, \\widehat{DBC} = 70^\\circ, \\widehat{BDC} = 40^\\circ$.\n\n![Figure: Dual Triangle Composite](/images/geometry/math7_l12_q31_quadrilateral_sbt48.svg)\n\nWhat is the total sum of angles $\\widehat{A} + \\widehat{C}$?",
    options: [
      { id: 'A', text: "$170^\\circ$" },
      { id: 'B', text: "$160^\\circ$" },
      { id: 'C', text: "$180^\\circ$" },
      { id: 'D', text: "$190^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "In $\\triangle ABD$: $\\widehat{A} = 180^\\circ - (30^\\circ + 50^\\circ) = 100^\\circ$. In $\\triangle BCD$: $\\widehat{C} = 180^\\circ - (70^\\circ + 40^\\circ) = 70^\\circ$. Therefore $\\widehat{A} + \\widehat{C} = 100^\\circ + 70^\\circ = 170^\\circ$."
  },
  {
    order_index: 32,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 7: Uranus Deep Space • Composite Polygonal Telemetry",
    content_markdown: "Two line segments $AD$ and $BC$ intersect at telemetry relay $O$, forming hourglass triangles $\\triangle ABO$ and $\\triangle CDO$.\n\n![Figure: Bowtie Invariant Angle Sum](/images/geometry/math7_l12_q32_star_bowtie.svg)\n\nWhich invariant equation ALWAYS holds true for these two triangles?",
    options: [
      { id: 'A', text: "$\\widehat{A} + \\widehat{D} = 180^\\circ$" },
      { id: 'B', text: "$\\widehat{B} + \\widehat{C} = 90^\\circ$" },
      { id: 'C', text: "$\\widehat{A} = \\widehat{C}$ and $\\widehat{B} = \\widehat{D}$" },
      { id: 'D', text: "$\\widehat{A} + \\widehat{B} = \\widehat{C} + \\widehat{D}$" }
    ],
    correct_option_id: 'D',
    explanation: "In $\\triangle ABO$, $\\widehat{A} + \\widehat{B} = 180^\\circ - \\widehat{AOB}$. In $\\triangle CDO$, $\\widehat{C} + \\widehat{D} = 180^\\circ - \\widehat{COD}$. Since angles $\\widehat{AOB}$ and $\\widehat{COD}$ are vertically opposite ($\\widehat{AOB} = \\widehat{COD}$), it follows that $\\widehat{A} + \\widehat{B} = \\widehat{C} + \\widehat{D}$."
  },
  {
    order_index: 33,
    type: 'FILL_IN_BLANK',
    points: 0.26,
    sectionName: "Sector 7: Uranus Deep Space • Composite Polygonal Telemetry",
    content_markdown: "Any quadrilateral can be partitioned by a single diagonal into two triangles. What is the sum of all four interior angles in any convex quadrilateral (in degrees)? (Enter numerical value only):",
    expected_value: "360",
    acceptable_answers: ["360", "360°", "360 deg"],
    explanation: "A quadrilateral splits into 2 triangles, each having an angle sum of $180^\\circ$: $2 \\times 180^\\circ = 360^\\circ$."
  },
  {
    order_index: 34,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 7: Uranus Deep Space • Composite Polygonal Telemetry",
    content_markdown: "In $\\triangle ABC$, segment $DE$ is drawn parallel to base $BC$ ($DE \\parallel BC$). Angle $\\widehat{A} = 55^\\circ$ and $\\widehat{B} = 65^\\circ$.\n\n![Figure: Parallel Traversal Harmony](/images/geometry/math7_l12_q34_parallel_cut_triangle.svg)\n\nWhat is the degree measure of angle $\\widehat{AED}$?",
    options: [
      { id: 'A', text: "$55^\\circ$" },
      { id: 'B', text: "$60^\\circ$" },
      { id: 'C', text: "$65^\\circ$" },
      { id: 'D', text: "$70^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "In $\\triangle ABC$, $\\widehat{C} = 180^\\circ - (55^\\circ + 65^\\circ) = 60^\\circ$. Since $DE \\parallel BC$, corresponding angle $\\widehat{AED} = \\widehat{C} = 60^\\circ$."
  },
  {
    order_index: 35,
    type: 'FILL_IN_BLANK',
    points: 0.26,
    sectionName: "Sector 7: Uranus Deep Space • Composite Polygonal Telemetry",
    content_markdown: "In a standard 5-pointed celestial star polygon with vertices $A, B, C, D, E$, what is the sum of the five tip angles $\\widehat{A} + \\widehat{B} + \\widehat{C} + \\widehat{D} + \\widehat{E}$ in degrees? (Enter numerical value only):",
    expected_value: "180",
    acceptable_answers: ["180", "180°", "180 deg"],
    explanation: "In any 5-pointed star, the sum of the five vertex angles is $(5 - 4) \\times 180^\\circ = 180^\\circ$."
  },

  // ==========================================
  // SECTOR 8: NEPTUNE FRONTIER (Q36 - Q40)
  // ==========================================
  {
    order_index: 36,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 8: Neptune Frontier • Advanced Telemetry & Geometric Proofs",
    content_markdown: "In $\\triangle ABC$, the angle bisectors of $\\widehat{B}$ and $\\widehat{C}$ intersect at point $I$ inside the triangle. If $\\widehat{A} = 70^\\circ$, what is the measure of angle $\\widehat{BIC}$?",
    options: [
      { id: 'A', text: "$110^\\circ$" },
      { id: 'B', text: "$135^\\circ$" },
      { id: 'C', text: "$125^\\circ$" },
      { id: 'D', text: "$140^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "$\\widehat{B} + \\widehat{C} = 180^\\circ - 70^\\circ = 110^\\circ$. The half-angles sum to $\\frac{110^\\circ}{2} = 55^\\circ$. In $\\triangle BIC$, $\\widehat{BIC} = 180^\\circ - 55^\\circ = 125^\circ$ (General formula: $\\widehat{BIC} = 90^\circ + \\frac{\\widehat{A}}{2} = 90^\circ + 35^\circ = 125^\circ$)."
  },
  {
    order_index: 37,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 8: Neptune Frontier • Advanced Telemetry & Geometric Proofs",
    content_markdown: "In $\\triangle ABC$, altitude $AH$ is drawn perpendicular to $BC$ ($AH \\perp BC$). Given $\\widehat{B} = 68^\\circ$ and $\\widehat{C} = 42^\\circ$, what is the measure of angle $\\widehat{BAH}$?",
    options: [
      { id: 'A', text: "$22^\\circ$" },
      { id: 'B', text: "$48^\\circ$" },
      { id: 'C', text: "$32^\\circ$" },
      { id: 'D', text: "$12^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "In right triangle $\\triangle ABH$ (right-angled at $H$), the acute angles are complementary: $\\widehat{BAH} = 90^\\circ - \\widehat{B} = 90^\\circ - 68^\\circ = 22^\\circ$."
  },
  {
    order_index: 38,
    type: 'MULTIPLE_CHOICE',
    points: 0.22,
    sectionName: "Sector 8: Neptune Frontier • Advanced Telemetry & Geometric Proofs",
    content_markdown: "In acute triangle $\\triangle ABC$, altitudes $BD \\perp AC$ and $CE \\perp AB$ intersect at orthocenter $H$. If $\\widehat{A} = 65^\\circ$, what is the measure of angle $\\widehat{BHC}$?",
    options: [
      { id: 'A', text: "$65^\\circ$" },
      { id: 'B', text: "$125^\\circ$" },
      { id: 'C', text: "$105^\\circ$" },
      { id: 'D', text: "$115^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "In quadrilateral $AEHD$, $\\widehat{AEH} = 90^\\circ$ and $\\widehat{ADH} = 90^\\circ$. The sum of angles is $360^\\circ \\implies \\widehat{EHD} = 180^\\circ - \\widehat{A} = 180^\\circ - 65^\\circ = 115^\\circ$. Since $\\widehat{BHC}$ and $\\widehat{EHD}$ are vertically opposite angles, $\\widehat{BHC} = 115^\\circ$."
  },
  {
    order_index: 39,
    type: 'ESSAY_UPLOAD',
    points: 0.70,
    sectionName: "Sector 8: Neptune Frontier • Advanced Telemetry & Geometric Proofs",
    content_markdown: "**Formal Proof Mission:** Prove mathematically that the sum of the three interior angles of any triangle is $180^\\circ$ (SGK Lesson 12):\n\n*'Given $\\triangle ABC$, prove that $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$.'*\n\nProvide your complete step-by-step mathematical reasoning using an auxiliary parallel line, or upload a clear photo of your handwritten proof.\n\n![Figure: Fundamental Angle Sum Proof](/images/geometry/math7_l12_q39_proof_parallel_auxiliary.svg)",
    rubric: "1. Auxiliary construction: Draw line xy through vertex A parallel to base BC (xy || BC).\n2. Apply parallel line theorems: Alternate interior angles along transversal AB: B = BAx. Alternate interior angles along transversal AC: C = CAy.\n3. Straight angle decomposition: Rays Ax and Ay form straight line xy, so BAC + BAx + CAy = 180°.\n4. Substitution: Replace BAx with B and CAy with C to conclude A + B + C = 180°. Q.E.D.",
    explanation: "MODEL STEP-BY-STEP PROOF:\n1. Construction: Through vertex $A$, draw line $xy$ parallel to base $BC$ ($xy \\parallel BC$).\n2. Alternate Interior Angles:\n   - Since $xy \\parallel BC$ cut by transversal $AB$, alternate interior angles are equal: $\\widehat{B} = \\widehat{BAx}$.\n   - Since $xy \\parallel BC$ cut by transversal $AC$, alternate interior angles are equal: $\\widehat{C} = \\widehat{CAy}$.\n3. Straight Angle: Point $A$ lies on straight line $xy$, so: $\\widehat{BAC} + \\widehat{BAx} + \\widehat{CAy} = \\widehat{xAy} = 180^\\circ$.\n4. Substitution: Substituting $\\widehat{B}$ for $\\widehat{BAx}$ and $\\widehat{C}$ for $\\widehat{CAy}$ yields: $\\widehat{BAC} + \\widehat{B} + \\widehat{C} = 180^\\circ$, or $\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$. $\\blacksquare$"
  },
  {
    order_index: 40,
    type: 'ESSAY_UPLOAD',
    points: 0.70,
    sectionName: "Sector 8: Neptune Frontier • Advanced Telemetry & Geometric Proofs",
    content_markdown: "**Exterior Angle Proof Mission:** Prove rigorously the Exterior Angle Theorem:\n\n*'The exterior angle at vertex $C$ of $\\triangle ABC$ is equal to the sum of the two remote interior angles: $\\widehat{ACx} = \\widehat{A} + \\widehat{B}$.'*\n\nProvide every deductive step, or upload a clear photo of your handwritten proof.",
    rubric: "1. Linear pair property: Exterior angle ACx and interior angle ACB are adjacent supplementary angles, so ACx + ACB = 180° => ACx = 180° - ACB.\n2. Triangle angle sum property: In triangle ABC, A + B + ACB = 180° => A + B = 180° - ACB.\n3. Comparison: Both ACx and (A + B) equal (180° - ACB).\n4. Conclusion: Therefore, ACx = A + B. Q.E.D.",
    explanation: "MODEL STEP-BY-STEP PROOF:\n1. Exterior Angle Definition: By definition, exterior angle $\\widehat{ACx}$ and interior angle $\\widehat{ACB}$ form a linear pair (adjacent supplementary angles along straight line $BCx$): $\\widehat{ACx} + \\widehat{ACB} = 180^\\circ \\implies \\widehat{ACx} = 180^\\circ - \\widehat{ACB}$ (Equation 1).\n2. Triangle Angle Sum Theorem: In $\\triangle ABC$, the sum of all three interior angles is $180^\\circ$: $\\widehat{A} + \\widehat{B} + \\widehat{ACB} = 180^\\circ \\implies \\widehat{A} + \\widehat{B} = 180^\\circ - \\widehat{ACB}$ (Equation 2).\n3. Transitive Comparison: Comparing Equation 1 and Equation 2, both $\\widehat{ACx}$ and $(\\widehat{A} + \\widehat{B})$ equal the exact same quantity $180^\\circ - \\widehat{ACB}$.\n4. Conclusion: Therefore, $\\widehat{ACx} = \\widehat{A} + \\widehat{B}$. $\\blacksquare$"
  }
];

async function main() {
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  console.log(`🚀 [Keithley Math Seed] Launching Lesson 12 Mission (40 Problems)`);
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

  // 2. Create Learning Unit (Flight Briefing + Web Studio attachment)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: "Lesson 12: Sum of Angles in a Triangle",
      description: "Deep Space Telemetry: Sum of interior angles (180°), right triangle complementary angles, triangle classification (acute, right, obtuse), exterior angle theorem, and formal geometric proofs.",
      lecture_content_markdown: LECTURE_MARKDOWN,
      lecture_attachments: [
        {
          type: "WEB_STUDIO",
          title: "Lesson 12 Interactive Studio: Sum of Angles in a Triangle",
          url: "/lectures/math7-lesson12-triangle-angles/index.html"
        }
      ],
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
      teacher_daily_note: "Cadet Keithley, welcome to Lesson 12! Master the 180° angle sum invariant, right triangle complementary angles, and exterior angle theorems across all 8 Planetary Stations. Explore the Interactive Studio first!",
      is_published: true
    }
  });
  console.log(`✅ Created Daily Mission Assignment: ${assignment.id}`);

  // 4. Create Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: "Lesson 12 Mission: Sum of Angles in a Triangle (40 Problems)",
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

  console.log('\n🎉 ALL SYSTEMS GO! Keithley Lesson 12 Mission (40 Problems) successfully seeded for 2026-11-20.');
}

main()
  .catch(err => {
    console.error('❌ Execution Error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
