#!/usr/bin/env node

/**
 * SEED SCRIPT: KEITHLEY LAKE (GRADE 7)
 * MISSION: Lesson 13: Congruent Triangles & First Congruence Case (SSS) (30 Problems)
 * DATE: 2026-11-21
 */

const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Flight Commander Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Astronaut Cadet Keithley Lake
  SUBJECT_ID: 'e89cc834-99d0-40b7-ab5e-0a0838d273c4', // Grade 7 Math (MATH_7)
  ASSIGNED_DATE: '2026-11-21'
};

const LECTURE_MARKDOWN = `# 🚀 Lesson 13 Flight Briefing: Congruent Triangles & Side-Side-Side (SSS)

Welcome aboard, Astronaut Cadet Keithley! Today we advance in **Chapter IV: Triangles** with **Lesson 13: Congruent Triangles and the First Congruence Case (SSS)**. Review your orbital flight briefing and explore the Interactive Lab Studio before launching your 30-problem mission!

---

### 1. Definition of Congruent Triangles
Two triangles $\\triangle ABC$ and $\\triangle A'B'C'$ are **congruent** if their corresponding sides are equal and their corresponding angles are equal:
$$\\begin{cases} AB = A'B', \\quad AC = A'C', \\quad BC = B'C' \\\\ \\widehat{A} = \\widehat{A'}, \\quad \\widehat{B} = \\widehat{B'}, \\quad \\widehat{C} = \\widehat{C'} \\end{cases}$$

We write: **$\\triangle ABC = \\triangle A'B'C'$** (corresponding vertices must be written in exact matching order: $A \\leftrightarrow A'$, $B \\leftrightarrow B'$, $C \\leftrightarrow C'$).

---

### 2. First Congruence Case: Side-Side-Side (SSS)
If three sides of one triangle are equal to three sides of another triangle, then the two triangles are **congruent**:
$$\\begin{cases} AB = A'B' \\\\ AC = A'C' \\\\ BC = B'C' \\end{cases} \\implies \\triangle ABC = \\triangle A'B'C' \\text{ (SSS)}$$

---

### 3. Proof Strategy & Angle Bisector Construction
- **Spotting Hidden Equalities:** Look for a **common side** shared by two adjacent or overlapping triangles, or add equal segments along a straight line ($BE = BD + DE$).
- **Compass Angle Bisector Construction:** Constructing equal radii $OA = OB$ and intersecting arcs $AM = BM$ creates $\\triangle OAM = \\triangle OBM$ (SSS), which guarantees $\\widehat{AOM} = \\widehat{BOM}$.

---

### 4. Interactive Flight Studio
Launch your dedicated interactive simulator room:
- **Web Studio:** [Launch Lesson 13 Interactive Studio](/lectures/math7-lesson13-congruent-triangles/index.html)
`;

const QUESTIONS = [
  // ==========================================
  // SECTOR 1: MERCURY ORBIT (Q1 - Q4)
  // ==========================================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Congruent Triangle Foundations",
    content_markdown: "Triangles $\\triangle ABC$ and $\\triangle A'B'C'$ are congruent ($\\triangle ABC = \\triangle A'B'C'$).\n\n![Figure: Congruent Triangles Definition](/images/geometry/math7_l13_congruent_def.svg)\n\nWhich condition accurately defines why these two triangles are congruent?",
    options: [
      { id: 'A', text: "They have equal perimeters and the same orientation" },
      { id: 'B', text: "Corresponding sides are equal and corresponding angles are equal" },
      { id: 'C', text: "All three interior angles in both triangles sum to $180^\\circ$" },
      { id: 'D', text: "At least two sides and one interior angle have equal measures" }
    ],
    correct_option_id: 'B',
    explanation: "By definition, two triangles are congruent if and only if all three pairs of corresponding sides are equal and all three pairs of corresponding angles are equal."
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Congruent Triangle Foundations",
    content_markdown: "Given the congruence statement $\\triangle ABC = \\triangle MNP$, which angle corresponds to $\\widehat{PNM}$ and which side corresponds to segment $NP$?",
    options: [
      { id: 'A', text: "Angle $\\widehat{ACB}$ and side $AC$" },
      { id: 'B', text: "Angle $\\widehat{BAC}$ and side $AB$" },
      { id: 'C', text: "Angle $\\widehat{CAB}$ and side $BC$" },
      { id: 'D', text: "Angle $\\widehat{CBA}$ and side $BC$" }
    ],
    correct_option_id: 'D',
    explanation: "Matching vertex positions $A \\leftrightarrow M$, $B \\leftrightarrow N$, $C \\leftrightarrow P$: the vertex sequence $P-N-M$ maps directly to $C-B-A$, giving $\\widehat{CBA}$, and segment $NP$ maps to $BC$."
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Congruent Triangle Foundations",
    content_markdown: "For any two triangles such that $\\triangle ABC = \\triangle MNP$, which of the following equalities is **FALSE**?",
    options: [
      { id: 'A', text: "$\\widehat{B} = \\widehat{P}$, $\\widehat{C} = \\widehat{M}$, $\\widehat{A} = \\widehat{N}$" },
      { id: 'B', text: "$AB = MN$, $AC = MP$, $BC = NP$" },
      { id: 'C', text: "$\\widehat{A} = \\widehat{M}$, $\\widehat{B} = \\widehat{N}$, $\\widehat{C} = \\widehat{P}$" },
      { id: 'D', text: "$BA = NM$, $CA = PM$, $CB = PN$" }
    ],
    correct_option_id: 'A',
    explanation: "In $\\triangle ABC = \\triangle MNP$, corresponding angles must match position-by-position ($A \\leftrightarrow M, B \\leftrightarrow N, C \\leftrightarrow P$). Option A mismatches every vertex pair."
  },
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Congruent Triangle Foundations",
    content_markdown: "The two triangles shown below are congruent, with matching tick marks and angle arcs indicating equal parts.\n\n![Figure: Reflected Congruent Triangles](/images/geometry/math7_l13_tick_matching_def_ghk.svg)\n\nWhich congruence notation places all corresponding vertices in the correct order?",
    options: [
      { id: 'A', text: "$\\triangle DEF = \\triangle KHG$" },
      { id: 'B', text: "$\\triangle DEF = \\triangle HGK$" },
      { id: 'C', text: "$\\triangle DEF = \\triangle GHK$" },
      { id: 'D', text: "$\\triangle DEF = \\triangle KGH$" }
    ],
    correct_option_id: 'C',
    explanation: "Matching the arcs and ticks: $\\widehat{D} = \\widehat{G}$ (1 arc), $\\widehat{E} = \\widehat{H}$ (2 arcs), and $F \\leftrightarrow K$ (between 1-tick and 2-tick sides). Therefore, $\\triangle DEF = \\triangle GHK$."
  },

  // ==========================================
  // SECTOR 2: VENUS BASE (Q5 - Q8)
  // ==========================================
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • Corresponding Sides & Angles",
    content_markdown: "Given $\\triangle ABC = \\triangle DEF$, which of the following reordered congruence statements expresses the exact same vertex correspondence?",
    options: [
      { id: 'A', text: "$\\triangle BCA = \\triangle FED$" },
      { id: 'B', text: "$\\triangle BAC = \\triangle EDF$" },
      { id: 'C', text: "$\\triangle CAB = \\triangle EDF$" },
      { id: 'D', text: "$\\triangle CBA = \\triangle FDE$" }
    ],
    correct_option_id: 'B',
    explanation: "From $\\triangle ABC = \\triangle DEF$, we know $A \\leftrightarrow D$, $B \\leftrightarrow E$, and $C \\leftrightarrow F$. Reordering $B-A-C$ on the left requires $E-D-F$ on the right: $\\triangle BAC = \\triangle EDF$."
  },
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • Corresponding Sides & Angles",
    content_markdown: "In a navigation log, $\\triangle ABC$ and $\\triangle MNP$ satisfy $AB = MN$, $BC = NP$, $CA = PM$, $\\widehat{A} = \\widehat{M}$, and $\\widehat{B} = \\widehat{N}$. Why can we conclude $\\widehat{C} = \\widehat{P}$ without measuring them?",
    options: [
      { id: 'A', text: "Because $CA$ and $PM$ are parallel lines" },
      { id: 'B', text: "Because every exterior angle equals $180^\\circ$" },
      { id: 'C', text: "Because vertical opposite angles are congruent" },
      { id: 'D', text: "Because the interior angles of each triangle sum to $180^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "Since $\\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B})$ and $\\widehat{P} = 180^\\circ - (\\widehat{M} + \\widehat{N})$ with $\\widehat{A} = \\widehat{M}$ and $\\widehat{B} = \\widehat{N}$, it follows immediately that $\\widehat{C} = \\widehat{P}$."
  },
  {
    order_index: 7,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 2: Venus Base • Corresponding Sides & Angles",
    content_markdown: "Given $\\triangle ABC = \\triangle DEF$ where $BC = 4\\text{ cm}$, $\\widehat{ABC} = 40^\\circ$, and $\\widehat{ACB} = 60^\\circ$.\n\n![Figure: Corresponding Parts Calculation](/images/geometry/math7_l13_luyentap1_abc_def.svg)\n\nWhat is the length of segment $EF$ in centimeters (enter the number only)?",
    expected_value: "4",
    acceptable_answers: ["4", "4 cm", "4cm"],
    explanation: "Since $\\triangle ABC = \\triangle DEF$, corresponding sides $EF$ and $BC$ have equal lengths: $EF = BC = 4\\text{ cm}$."
  },
  {
    order_index: 8,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 2: Venus Base • Corresponding Sides & Angles",
    content_markdown: "Using the same telemetry diagram ($\\triangle ABC = \\triangle DEF$, $BC = 4\\text{ cm}$, $\\widehat{ABC} = 40^\\circ$, $\\widehat{ACB} = 60^\\circ$):\n\n![Figure: Corresponding Parts Calculation](/images/geometry/math7_l13_luyentap1_abc_def.svg)\n\nCompute the degree measure of angle $\\widehat{EDF}$ (enter the number only).",
    expected_value: "80",
    acceptable_answers: ["80", "80°", "80 deg"],
    explanation: "First compute $\\widehat{BAC} = 180^\\circ - (40^\\circ + 60^\\circ) = 80^\\circ$. Because $\\triangle ABC = \\triangle DEF$, corresponding angle $\\widehat{EDF} = \\widehat{BAC} = 80^\\circ$."
  },

  // ==========================================
  // SECTOR 3: EARTH MISSION CONTROL (Q9 - Q12)
  // ==========================================
  {
    order_index: 9,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 3: Earth Mission Control • First Congruence Case (SSS)",
    content_markdown: "Two space engineers independently use a ruler and compass to construct $\\triangle ABC$ and $\\triangle A'B'C'$ with side lengths $6\\text{ cm}$, $5\\text{ cm}$, and $4\\text{ cm}$.\n\n![Figure: SSS Compass Construction](/images/geometry/math7_l13_compass_sss_construct.svg)\n\nWhich theorem guarantees that their two triangles are congruent?",
    options: [
      { id: 'A', text: "Side-Side-Side (SSS) triangle congruence theorem" },
      { id: 'B', text: "Alternate interior angles parallel theorem" },
      { id: 'C', text: "Complementary acute angle theorem" },
      { id: 'D', text: "Exterior angle inequality theorem" }
    ],
    correct_option_id: 'A',
    explanation: "By the Side-Side-Side (SSS) congruence theorem, if three sides of one triangle equal three sides of another triangle, the two triangles are congruent."
  },
  {
    order_index: 10,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 3: Earth Mission Control • First Congruence Case (SSS)",
    content_markdown: "Examine the tick marks on $\\triangle ABC$ and $\\triangle DEF$ below.\n\n![Figure: Triangle Tick Correspondence](/images/geometry/math7_l13_sgk44_abc_def.svg)\n\nWhich congruence statement is **TRUE**?",
    options: [
      { id: 'A', text: "$\\triangle ABC = \\triangle DEF$" },
      { id: 'B', text: "$\\triangle BAC = \\triangle DFE$" },
      { id: 'C', text: "$\\triangle ACB = \\triangle EDF$" },
      { id: 'D', text: "$\\triangle CAB = \\triangle DEF$" }
    ],
    correct_option_id: 'C',
    explanation: "Matching equal sides: $AB = FE$ (2 ticks), $AC = ED$ (1 tick), and $BC = FD$ (cross tick). Thus $A \\leftrightarrow E$, $C \\leftrightarrow D$, and $B \\leftrightarrow F$, which gives $\\triangle ACB = \\triangle EDF$."
  },
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 3: Earth Mission Control • First Congruence Case (SSS)",
    content_markdown: "Inspect the four triangles detected by our orbital scanner below.\n\n![Figure: Four Triangles SSS Comparison](/images/geometry/math7_l13_four_triangles_sss.svg)\n\nWhich triangle is **NOT** congruent to $\\triangle ABC$ by SSS?",
    options: [
      { id: 'A', text: "$\\triangle MNP$" },
      { id: 'B', text: "$\\triangle DEF$" },
      { id: 'C', text: "$\\triangle GKH$" },
      { id: 'D', text: "All four are congruent" }
    ],
    correct_option_id: 'B',
    explanation: "$\\triangle ABC$, $\\triangle MNP$, and $\\triangle GKH$ each have one cross-tick side, one single-tick side, and one double-tick side. However, $\\triangle DEF$ has two single-tick sides ($DE = EF$) and one cross-tick side ($DF$), so it is NOT congruent to $\\triangle ABC$."
  },
  {
    order_index: 12,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 3: Earth Mission Control • First Congruence Case (SSS)",
    content_markdown: "Four triangles are plotted on the coordinate grid below.\n\n![Figure: Grid Triangles SSS Matching](/images/geometry/math7_l13_grid_triangles_sbt.svg)\n\nBy counting grid intervals to compare side lengths, which triangle is congruent to $\\triangle ABC$?",
    options: [
      { id: 'A', text: "$\\triangle DEF$" },
      { id: 'B', text: "$\\triangle MNP$" },
      { id: 'C', text: "$\\triangle DFE$" },
      { id: 'D', text: "$\\triangle KHG$" }
    ],
    correct_option_id: 'D',
    explanation: "On the grid, $BC = 6$ units and $HG = 6$ units. Going from $B$ to $A$ shifts $(+2, -6)$ while from $H$ to $K$ shifts $(-2, -6)$, and from $C$ to $A$ shifts $(-4, -6)$ while from $G$ to $K$ shifts $(+4, -6)$. Thus $AB = KH$, $AC = KG$, and $BC = HG$, giving $\\triangle ABC = \\triangle KHG$ (SSS)."
  },

  // ==========================================
  // SECTOR 4: MARS OUTPOST (Q13 - Q16)
  // ==========================================
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "In the structural truss below, $AC = BD$ and $AD = BC$.\n\n![Figure: Common Base AB Proof](/images/geometry/math7_l13_bowtie_shared_base.svg)\n\nWhich set of three equalities proves $\\triangle ACB = \\triangle BDA$ by SSS?",
    options: [
      { id: 'A', text: "$AC = BD$, $BC = AD$, and $AB$ is a common side" },
      { id: 'B', text: "$AC = AD$, $BC = BD$, and $AB$ is a common side" },
      { id: 'C', text: "$AC = BD$, $AB = BC$, and $AD$ is a common side" },
      { id: 'D', text: "$AD = BC$, $AB = CD$, and $AC$ is a common side" }
    ],
    correct_option_id: 'A',
    explanation: "Comparing $\\triangle ACB$ and $\\triangle BDA$: $AC = BD$ (given), $BC = AD$ (given), and $AB = BA$ (common side). By SSS, $\\triangle ACB = \\triangle BDA$."
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "A spacecraft heat shield forms quadrilateral $ABCD$ with $AB = AD$ and $BC = DC$.\n\n![Figure: Kite Common Diagonal](/images/geometry/math7_l13_kite_common_side.svg)\n\nWhich congruence statement is guaranteed by SSS using common side $AC$?",
    options: [
      { id: 'A', text: "$\\triangle ABC = \\triangle CDA$" },
      { id: 'B', text: "$\\triangle ABD = \\triangle CBD$" },
      { id: 'C', text: "$\\triangle ABC = \\triangle ADC$" },
      { id: 'D', text: "$\\triangle BAC = \\triangle DCA$" }
    ],
    correct_option_id: 'C',
    explanation: "Since $AB = AD$, $BC = DC$, and $AC$ is a common side, vertices match as $A \\leftrightarrow A$, $B \\leftrightarrow D$, and $C \\leftrightarrow C$. Hence $\\triangle ABC = \\triangle ADC$ (SSS)."
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "In the same crossed-truss configuration with $AC = BD$ and $AD = BC$, suppose we also connect $DC$ to compare $\\triangle ADC$ and $\\triangle BCD$. Which pair of sides matches correctly?",
    options: [
      { id: 'A', text: "$AD = BD$ and $AC = BC$" },
      { id: 'B', text: "$AD = BC$, $AC = BD$, and $DC$ common" },
      { id: 'C', text: "$AD = DC$, $AC = BC$, and $AB$ common" },
      { id: 'D', text: "$AC = DC$, $BD = BC$, and $AD$ common" }
    ],
    correct_option_id: 'B',
    explanation: "In $\\triangle ADC$ and $\\triangle BCD$: $AD = BC$ (given), $AC = BD$ (given), and $DC$ is the common side. Therefore $\\triangle ADC = \\triangle BCD$ (SSS)."
  },
  {
    order_index: 16,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "Telemetry confirms $\\triangle ABC = \\triangle DEF$, with $\\widehat{A} = 60^\\circ$ and $\\widehat{E} = 80^\\circ$. Calculate the degree measure of angle $\\widehat{F}$ (enter the number only).",
    expected_value: "40",
    acceptable_answers: ["40", "40°", "40 deg"],
    explanation: "Since $\\triangle ABC = \\triangle DEF$, corresponding angles give $\\widehat{D} = \\widehat{A} = 60^\\circ$. In $\\triangle DEF$, $\\widehat{F} = 180^\\circ - (\\widehat{D} + \\widehat{E}) = 180^\\circ - (60^\\circ + 80^\\circ) = 40^\\circ$."
  },

  // ==========================================
  // SECTOR 5: JUPITER STATION (Q17 - Q20)
  // ==========================================
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Compass Bisectors & Symmetry",
    content_markdown: "To construct the bisector of $\\widehat{xOy}$ with a compass: first draw an arc centered at $O$ cutting $Ox, Oy$ at $A, B$; next draw equal-radius arcs centered at $A$ and $B$ ($AM = BM$) intersecting at $M$.\n\n![Figure: Compass Angle Bisector](/images/geometry/math7_l13_compass_bisector.svg)\n\nWhich SSS triangle congruence proves that ray $OM$ bisects $\\widehat{xOy}$?",
    options: [
      { id: 'A', text: "$\\triangle OAB = \\triangle MAB$" },
      { id: 'B', text: "$\\triangle OAM = \\triangle ABM$" },
      { id: 'C', text: "$\\triangle OBM = \\triangle BAM$" },
      { id: 'D', text: "$\\triangle OAM = \\triangle OBM$" }
    ],
    correct_option_id: 'D',
    explanation: "In $\\triangle OAM$ and $\\triangle OBM$: $OA = OB$ (same radius from $O$), $AM = BM$ (equal compass radii from $A$ and $B$), and $OM$ is common. By SSS, $\\triangle OAM = \\triangle OBM$, so $\\widehat{AOM} = \\widehat{BOM}$."
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Compass Bisectors & Symmetry",
    content_markdown: "Square $ABCD$ on the grid has diagonals $AC$ and $BD$ intersecting at center $E$.\n\n![Figure: Square Diagonals Congruence](/images/geometry/math7_l13_grid_square_diagonals.svg)\n\nWhich statement about the four small triangles sharing vertex $E$ is **TRUE**?",
    options: [
      { id: 'A', text: "All four triangles $\\triangle EAB$, $\\triangle EBC$, $\\triangle ECD$, and $\\triangle EDA$ are congruent" },
      { id: 'B', text: "Only $\\triangle EAB$ and $\\triangle ECD$ are congruent; the other two differ" },
      { id: 'C', text: "None of the four triangles are congruent because their orientations rotate" },
      { id: 'D', text: "Only adjacent triangles sharing side $EA$ are congruent to each other" }
    ],
    correct_option_id: 'A',
    explanation: "In square $ABCD$, all four sides are equal ($AB = BC = CD = DA$) and the half-diagonals from center $E$ are all equal ($EA = EB = EC = ED$). By SSS, $\\triangle EAB = \\triangle EBC = \\triangle ECD = \\triangle EDA$."
  },
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Compass Bisectors & Symmetry",
    content_markdown: "In satellite panel $ABCD$, $AB = CB$, $AD = CD$, $\\widehat{DAB} = 90^\\circ$, and $\\widehat{BDC} = 30^\\circ$.\n\n![Figure: Kite Angle Transfer](/images/geometry/math7_l13_kite_angles_46.svg)\n\nWhich reasoning correctly proves $\\triangle ABD = \\triangle CBD$?",
    options: [
      { id: 'A', text: "$AB = CB$, $\\widehat{DAB} = 90^\\circ$, and $\\widehat{BDC} = 30^\\circ$" },
      { id: 'B', text: "$AD = CB$, $AB = CD$, and $AC$ is a common side" },
      { id: 'C', text: "$AB = CB$, $AD = CD$, and $BD$ is a common side (SSS)" },
      { id: 'D', text: "$BD$ bisects $\\widehat{ABC}$ because $ABCD$ is a square" }
    ],
    correct_option_id: 'C',
    explanation: "Consider $\\triangle ABD$ and $\\triangle CBD$: $AB = CB$ (given), $AD = CD$ (given), and $BD$ is a common side. By SSS, $\\triangle ABD = \\triangle CBD$."
  },
  {
    order_index: 20,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 5: Jupiter Station • Compass Bisectors & Symmetry",
    content_markdown: "Using the same satellite panel ($AB = CB$, $AD = CD$, $\\widehat{DAB} = 90^\\circ$, $\\widehat{BDC} = 30^\\circ$):\n\n![Figure: Kite Angle Transfer](/images/geometry/math7_l13_kite_angles_46.svg)\n\nCompute the degree measure of angle $\\widehat{ABC}$ (enter the number only).",
    expected_value: "120",
    acceptable_answers: ["120", "120°", "120 deg"],
    explanation: "Since $\\triangle ABD = \\triangle CBD$, we get $\\widehat{ADB} = \\widehat{CDB} = 30^\\circ$ and $\\widehat{ABD} = \\widehat{CBD}$. In right triangle $\\triangle ABD$, $\\widehat{ABD} = 90^\\circ - 30^\\circ = 60^\\circ$. Therefore, $\\widehat{ABC} = \\widehat{ABD} + \\widehat{CBD} = 60^\\circ + 60^\\circ = 120^\\circ$."
  },

  // ==========================================
  // SECTOR 6: SATURN RINGS (Q21 - Q24)
  // ==========================================
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 6: Saturn Rings • SSS Angle Transfer & Review",
    content_markdown: "In kite $ABCD$ below, $AD = AB$, $CD = CB$, $\\widehat{DAC} = 40^\\circ$, and $\\widehat{DCA} = 50^\\circ$.\n\n![Figure: Congruent Kite Angles](/images/geometry/math7_l13_kite_angles_sbt417.svg)\n\nWhat are the measures of the three interior angles $\\widehat{BAC}$, $\\widehat{BCA}$, and $\\widehat{B}$ of $\\triangle ABC$?",
    options: [
      { id: 'A', text: "$\\widehat{BAC} = 50^\\circ$, $\\widehat{BCA} = 40^\\circ$, $\\widehat{B} = 90^\\circ$" },
      { id: 'B', text: "$\\widehat{BAC} = 40^\\circ$, $\\widehat{BCA} = 50^\\circ$, $\\widehat{B} = 90^\\circ$" },
      { id: 'C', text: "$\\widehat{BAC} = 40^\\circ$, $\\widehat{BCA} = 60^\\circ$, $\\widehat{B} = 80^\\circ$" },
      { id: 'D', text: "$\\widehat{BAC} = 45^\\circ$, $\\widehat{BCA} = 45^\\circ$, $\\widehat{B} = 90^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "By SSS ($AB=AD$, $CB=CD$, $AC$ common), $\\triangle ABC = \\triangle ADC$. Thus $\\widehat{BAC} = \\widehat{DAC} = 40^\\circ$, $\\widehat{BCA} = \\widehat{DCA} = 50^\\circ$, and $\\widehat{B} = 180^\\circ - (40^\\circ + 50^\\circ) = 90^\\circ$."
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 6: Saturn Rings • SSS Angle Transfer & Review",
    content_markdown: "In the cross-brace diagram below, $AD = BC$, $AC = BD$, and $\\widehat{ABD} = 30^\\circ$.\n\n![Figure: Crossed Diagonals Geometry](/images/geometry/math7_l13_crossed_diagonals_sbt418.svg)\n\nWhich congruence allows us to find $\\widehat{BAC}$, and what is its measure?",
    options: [
      { id: 'A', text: "$\\triangle ABD = \\triangle ABC$, so $\\widehat{BAC} = 60^\\circ$" },
      { id: 'B', text: "$\\triangle AED = \\triangle BEC$, so $\\widehat{BAC} = 45^\\circ$" },
      { id: 'C', text: "$\\triangle ADC = \\triangle BCD$, so $\\widehat{BAC} = 15^\\circ$" },
      { id: 'D', text: "$\\triangle ABD = \\triangle BAC$, so $\\widehat{BAC} = 30^\\circ$" }
    ],
    correct_option_id: 'D',
    explanation: "Comparing $\\triangle ABD$ and $\\triangle BAC$: $AD = BC$ (given), $BD = AC$ (given), and $AB$ is common. By SSS, $\\triangle ABD = \\triangle BAC$, so corresponding angle $\\widehat{BAC} = \\widehat{ABD} = 30^\\circ$."
  },
  {
    order_index: 23,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 6: Saturn Rings • SSS Angle Transfer & Review",
    content_markdown: "Continuing from the previous cross-brace diagram ($AD = BC$, $AC = BD$, $\\widehat{ABD} = 30^\\circ$, and $\\widehat{BAC} = 30^\\circ$):\n\n![Figure: Crossed Diagonals Geometry](/images/geometry/math7_l13_crossed_diagonals_sbt418.svg)\n\nCalculate the degree measure of angle $\\widehat{DEC}$ (enter the number only).",
    expected_value: "120",
    acceptable_answers: ["120", "120°", "120 deg"],
    explanation: "In $\\triangle EAB$, $\\widehat{AEB} = 180^\\circ - (30^\\circ + 30^\\circ) = 120^\\circ$. Because $\\widehat{DEC}$ and $\\widehat{AEB}$ are vertical opposite angles, $\\widehat{DEC} = \\widehat{AEB} = 120^\\circ$."
  },
  {
    order_index: 24,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 6: Saturn Rings • SSS Angle Transfer & Review",
    content_markdown: "Three telemetry triangles have known angle pairs: $\\triangle ABC$ ($25^\\circ, 35^\\circ$), $\\triangle DEF$ ($55^\\circ, 65^\\circ$), and $\\triangle MNP$ ($55^\\circ, 35^\\circ$). Which one is a **right triangle**?",
    options: [
      { id: 'A', text: "$\\triangle MNP$, because its third angle is $90^\\circ$" },
      { id: 'B', text: "$\\triangle ABC$, because its third angle is $120^\\circ$" },
      { id: 'C', text: "$\\triangle DEF$, because its third angle is $60^\\circ$" },
      { id: 'D', text: "None of them contain a $90^\\circ$ angle" }
    ],
    correct_option_id: 'A',
    explanation: "In $\\triangle MNP$, the third angle is $180^\\circ - (55^\\circ + 35^\\circ) = 90^\\circ$, making $\\triangle MNP$ a right triangle."
  },

  // ==========================================
  // SECTOR 7: URANUS DEEP SPACE (Q25 - Q27)
  // ==========================================
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Step Deduction",
    content_markdown: "In the symmetric delta-wing diagram below, $AB = AC$, $DB = DC$, and $\\widehat{DAC} = 60^\\circ$.\n\n![Figure: Symmetric Triangle Deduction](/images/geometry/math7_l13_sgk49_triangle_dac.svg)\n\nWhat is the degree measure of angle $\\widehat{DAB}$?",
    options: [
      { id: 'A', text: "$30^\\circ$" },
      { id: 'B', text: "$45^\\circ$" },
      { id: 'C', text: "$60^\\circ$" },
      { id: 'D', text: "$120^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "Comparing $\\triangle ABD$ and $\\triangle ACD$: $AB = AC$, $DB = DC$, and $AD$ is common. By SSS, $\\triangle ABD = \\triangle ACD$, so $\\widehat{DAB} = \\widehat{DAC} = 60^\\circ$."
  },
  {
    order_index: 26,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Step Deduction",
    content_markdown: "In $\\triangle ABC$, $\\widehat{BCA} = 60^\\circ$, and point $M$ lies on side $BC$ such that $\\widehat{BAM} = 20^\\circ$ and $\\widehat{AMC} = 80^\\circ$.\n\n![Figure: Triangle Angle Sum Review](/images/geometry/math7_l13_sgk410_point_m.svg)\n\nCalculate the degree measure of angle $\\widehat{ABC}$ (enter the number only).",
    expected_value: "60",
    acceptable_answers: ["60", "60°", "60 deg"],
    explanation: "First, $\\widehat{AMB}$ and $\\widehat{AMC}$ form a linear pair: $\\widehat{AMB} = 180^\\circ - 80^\\circ = 100^\\circ$. Then in $\\triangle ABM$, $\\widehat{ABC} = 180^\\circ - (\\widehat{AMB} + \\widehat{BAM}) = 180^\\circ - (100^\\circ + 20^\\circ) = 60^\\circ$."
  },
  {
    order_index: 27,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Step Deduction",
    content_markdown: "In kite $ACBD$ with common diagonal $AB$, we are given $AC = AD$, $BC = BD$, $\\widehat{BAC} = 40^\\circ$, and $\\widehat{ABC} = 60^\\circ$. What is the degree measure of $\\widehat{ADB}$?",
    options: [
      { id: 'A', text: "$40^\\circ$" },
      { id: 'B', text: "$80^\\circ$" },
      { id: 'C', text: "$60^\\circ$" },
      { id: 'D', text: "$100^\\circ$" }
    ],
    correct_option_id: 'B',
    explanation: "In $\\triangle ABC$, $\\widehat{ACB} = 180^\\circ - (40^\\circ + 60^\\circ) = 80^\\circ$. Since $\\triangle ABC = \\triangle ABD$ (SSS with $AC=AD$, $BC=BD$, $AB$ common), $\\widehat{ADB} = \\widehat{ACB} = 80^\\circ$."
  },

  // ==========================================
  // SECTOR 8: NEPTUNE FRONTIER (Q28 - Q30)
  // ==========================================
  {
    order_index: 28,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 8: Neptune Frontier • Formal Geometric Proofs",
    content_markdown: "Parallelogram $ABCD$ ($AD \\parallel BC$, $AB = DC$, $AD = BC$) has equal diagonals $AC = BD$.\n\n![Figure: Parallelogram Equal Diagonals](/images/geometry/math7_l13_parallelogram_rect_sbt420.svg)\n\nUsing $\\triangle ADC = \\triangle BCD$ (SSS), we obtain $\\widehat{ADC} = \\widehat{BCD}$. Since $AD \\parallel BC$ gives $\\widehat{ADC} + \\widehat{BCD} = 180^\\circ$, what is $\\widehat{ADC}$ and what figure is $ABCD$?",
    options: [
      { id: 'A', text: "$60^\\circ$; an acute triangle" },
      { id: 'B', text: "$120^\\circ$; an obtuse rhombus" },
      { id: 'C', text: "$45^\\circ$; a regular trapezoid" },
      { id: 'D', text: "$90^\\circ$; a rectangle" }
    ],
    correct_option_id: 'D',
    explanation: "Since $\\widehat{ADC} = \\widehat{BCD}$ and $\\widehat{ADC} + \\widehat{BCD} = 180^\\circ$, each equals $90^\\circ$. A parallelogram with a $90^\\circ$ interior angle is a rectangle."
  },
  {
    order_index: 29,
    type: 'ESSAY_UPLOAD',
    points: 0.65,
    sectionName: "Sector 8: Neptune Frontier • Formal Geometric Proofs",
    content_markdown: "Points $B, D, E, C$ lie on a straight line in that order, with $AB = AC$, $AD = AE$, and $BD = CE$.\n\n![Figure: Segment Addition SSS Proof](/images/geometry/math7_l13_isosceles_collinear_sbt419.svg)\n\nWrite a complete step-by-step formal proof showing $\\triangle ABE = \\triangle ACD$ and concluding that $\\widehat{AEB} = \\widehat{ADC}$. (You may type your proof or upload a clear photo of your handwritten solution.)",
    rubric: "1) Show BE = BD + DE = CE + DE = CD (0.20 pts). 2) Compare triangle ABE and triangle ACD with AB = AC, AE = AD, BE = CD (0.25 pts). 3) Conclude triangle ABE = triangle ACD by SSS and deduce angle AEB = angle ADC as corresponding angles (0.20 pts).",
    explanation: "Step 1: Since $D$ lies between $B$ and $E$, $BE = BD + DE$. Since $E$ lies between $D$ and $C$, $CD = CE + DE$. Given $BD = CE$, we obtain $BE = CD$.\nStep 2: Consider $\\triangle ABE$ and $\\triangle ACD$: $AB = AC$ (given), $AE = AD$ (given), and $BE = CD$ (proved above).\nStep 3: Therefore $\\triangle ABE = \\triangle ACD$ (SSS). As corresponding angles of congruent triangles, $\\widehat{AEB} = \\widehat{ADC}$. $\\blacksquare$"
  },
  {
    order_index: 30,
    type: 'ESSAY_UPLOAD',
    points: 0.65,
    sectionName: "Sector 8: Neptune Frontier • Formal Geometric Proofs",
    content_markdown: "Given parallelogram $ABCD$ ($AB = DC$, $AD = BC$, $AD \\parallel BC$) with equal diagonals $AC = BD$.\n\n![Figure: Parallelogram Equal Diagonals](/images/geometry/math7_l13_parallelogram_rect_sbt420.svg)\n\nWrite a complete formal proof for:\n(a) $\\triangle ABD = \\triangle DCA$ and $\\triangle ADC = \\triangle BCD$;\n(b) Compute $\\widehat{ADC}$ and explain why $ABCD$ is a rectangle. (Type your proof or upload your handwritten notebook photo.)",
    rubric: "1) Prove triangle ABD = triangle DCA by SSS (AB=DC, BD=CA, AD common) (0.20 pts). 2) Prove triangle ADC = triangle BCD by SSS (AD=BC, AC=BD, DC common) (0.20 pts). 3) Deduce angle ADC = angle BCD and combine with same-side interior angles summing to 180 deg to get 90 deg, proving ABCD is a rectangle (0.25 pts).",
    explanation: "(a) Consider $\\triangle ABD$ and $\\triangle DCA$: $AB = DC$ (opposite sides of parallelogram), $BD = CA$ (given), and $AD$ is common $\\implies \\triangle ABD = \\triangle DCA$ (SSS). Similarly, in $\\triangle ADC$ and $\\triangle BCD$: $AD = BC$, $AC = BD$, and $DC$ is common $\\implies \\triangle ADC = \\triangle BCD$ (SSS).\n(b) From $\\triangle ADC = \\triangle BCD$, corresponding angles give $\\widehat{ADC} = \\widehat{BCD}$. Since $AD \\parallel BC$, same-side interior angles satisfy $\\widehat{ADC} + \\widehat{BCD} = 180^\\circ$, so $\\widehat{ADC} = 90^\\circ$ (and similarly all four angles are $90^\\circ$). Hence $ABCD$ is a rectangle. $\\blacksquare$"
  }
];

async function main() {
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  console.log(`🚀 [Keithley Math Seed] Launching Lesson 13 Mission (30 Problems)`);
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
      title: "Lesson 13: Congruent Triangles & First Congruence Case (SSS)",
      description: "Deep Space Telemetry: Definition of congruent triangles, vertex correspondence notation, Side-Side-Side (SSS) congruence theorem, compass angle bisector construction, and formal geometric proofs.",
      lecture_content_markdown: LECTURE_MARKDOWN,
      lecture_attachments: [
        {
          type: "WEB_STUDIO",
          title: "Lesson 13 Interactive Studio: Congruent Triangles & SSS",
          url: "/lectures/math7-lesson13-congruent-triangles/index.html"
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
      teacher_daily_note: "Cadet Keithley, welcome to Lesson 13! Master corresponding vertices, the Side-Side-Side (SSS) congruence criterion, and compass angle bisectors across all 8 Planetary Stations. Explore the Interactive Studio first!",
      is_published: true
    }
  });
  console.log(`✅ Created Daily Mission Assignment: ${assignment.id}`);

  // 4. Create Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: "Lesson 13 Mission: Congruent Triangles & SSS (30 Problems)",
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

  console.log('\n🎉 ALL SYSTEMS GO! Keithley Lesson 13 Mission (30 Problems) successfully seeded for 2026-11-21.');
}

main()
  .catch(err => {
    console.error('❌ Execution Error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
