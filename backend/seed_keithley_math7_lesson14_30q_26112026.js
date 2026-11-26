#!/usr/bin/env node

/**
 * SEED SCRIPT: KEITHLEY LAKE (GRADE 7)
 * MISSION: Lesson 14: Second & Third Congruence Cases of Triangles (SAS & ASA) (30 Problems)
 * DATE: 2026-11-26
 */

const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Flight Commander Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Astronaut Cadet Keithley Lake
  SUBJECT_ID: 'e89cc834-99d0-40b7-ab5e-0a0838d273c4', // Grade 7 Math (MATH_7)
  ASSIGNED_DATE: '2026-11-26'
};

const LECTURE_MARKDOWN = `# 🚀 Lesson 14 Flight Briefing: Triangle Congruence Cases II & III (SAS & ASA)

Welcome aboard, Astronaut Cadet Keithley! Today's briefing is ultra-concise—master these two theorems and five hidden clues before launching your 30-problem orbital mission.

---

### 1. Second Congruence Case: Side-Angle-Side (SAS)
- **Theorem:** If **two sides** and the **included angle** between them of one triangle equal two sides and the included angle of another, the triangles are congruent.
$$\\begin{cases} AB = A'B' \\\\ \\widehat{A} = \\widehat{A'} \\text{ (included)} \\\\ AC = A'C' \\end{cases} \\implies \\triangle ABC = \\triangle A'B'C' \\text{ (SAS)}$$
- **Trap Alert:** The angle **MUST** sit between the two equal sides (never use SSA!).

---

### 2. Third Congruence Case: Angle-Side-Angle (ASA)
- **Theorem:** If **one side** and the **two angles adjacent to it** of one triangle equal one side and the two adjacent angles of another, the triangles are congruent.
$$\\begin{cases} \\widehat{B} = \\widehat{B'} \\\\ BC = B'C' \\text{ (between } B, C\\text{)} \\\\ \\widehat{C} = \\widehat{C'} \\end{cases} \\implies \\triangle ABC = \\triangle A'B'C' \\text{ (ASA)}$$
- **180° Corollary:** Given one side, one adjacent angle, and the opposite angle, compute the third angle via $180^\\circ - (\\text{sum})$, then apply **ASA**.

---

### 3. Five Hidden Clues in Proofs
1. **Common side** ($AC = AC$ or $BD = BD$).
2. **Vertical opposite angles** at an intersection ($\\widehat{BCA} = \\widehat{ECD}$).
3. **Alternate interior angles** from parallel lines ($AB \\parallel CD$).
4. **Segment addition** along a line ($AC = AB + BC$).
5. **Angle Sum ($180^\\circ$)** to unlock the included or adjacent angle.

---

### 4. Interactive Flight Studio
- **Web Studio:** [Launch Lesson 14 Interactive Studio](/lectures/math7-lesson14-congruent-sas-asa/index.html)
`;

const QUESTIONS = [
  // ==========================================
  // SECTOR 1: MERCURY ORBIT (Q1 - Q4)
  // ==========================================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • SAS Foundations & Included Angle",
    content_markdown: "In $\\triangle ABC$, which angle is the **included angle** between sides $AB$ and $AC$ as highlighted in the flight diagram below?\n\n![Figure: SAS Congruence Theorem](/images/geometry/math7_l14_sas_theorem.svg)\n\nSelect the exact included angle.",
    options: [
      { id: 'A', text: "Angle $\\widehat{ABC}$" },
      { id: 'B', text: "Angle $\\widehat{ACB}$" },
      { id: 'C', text: "Angle $\\widehat{BAC}$" },
      { id: 'D', text: "Angle $\\widehat{BCA}$" }
    ],
    correct_option_id: 'C',
    explanation: "The included angle of sides $AB$ and $AC$ shares their common vertex $A$, which is $\\widehat{BAC}$ (or simply $\\widehat{A}$)."
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • SAS Foundations & Included Angle",
    content_markdown: "Inspect the four triangles scanned by Mercury's orbital radar below.\n\n![Figure: Included Angle Check](/images/geometry/math7_l14_sas_vs_ssa_trap.svg)\n\nWhich triangle is congruent to $\\triangle ABC$ by the **Side-Angle-Side (SAS)** theorem?",
    options: [
      { id: 'A', text: "$\\triangle GHK$" },
      { id: 'B', text: "$\\triangle FED$" },
      { id: 'C', text: "$\\triangle MNP$" },
      { id: 'D', text: "None of them" }
    ],
    correct_option_id: 'A',
    explanation: "In $\\triangle ABC$, $\\widehat{A}$ lies directly between the 1-tick side ($AB$) and 2-tick side ($AC$). Only $\\triangle GHK$ has $\\widehat{G}$ placed between its 1-tick ($GH$) and 2-tick ($GK$) sides, giving $\\triangle ABC = \\triangle GHK$ (SAS). In $\\triangle FED$ and $\\triangle MNP$, the marked angle is NOT included."
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • SAS Foundations & Included Angle",
    content_markdown: "Telemetry shows two spacecraft brackets $\\triangle ABC$ and $\\triangle DEF$ already satisfy $AB = DE$ and $BC = EF$. Which additional measurement guarantees $\\triangle ABC = \\triangle DEF$ by **SAS**?",
    options: [
      { id: 'A', text: "$\\widehat{A} = \\widehat{D}$" },
      { id: 'B', text: "$\\widehat{B} = \\widehat{E}$" },
      { id: 'C', text: "$\\widehat{C} = \\widehat{F}$" },
      { id: 'D', text: "$\\widehat{A} = \\widehat{F}$" }
    ],
    correct_option_id: 'B',
    explanation: "Sides $AB$ and $BC$ meet at vertex $B$, while sides $DE$ and $EF$ meet at vertex $E$. Thus the included angles are $\\widehat{B}$ and $\\widehat{E}$."
  },
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • SAS Foundations & Included Angle",
    content_markdown: "Two arbitrary triangles $\\triangle ABC$ and $\\triangle DEF$ satisfy $AB = FE$, $BC = DF$, and $\\widehat{ABC} = \\widehat{DFE}$. Which congruence statement writes corresponding vertices in the **correct** order?",
    options: [
      { id: 'A', text: "$\\triangle ABC = \\triangle DFE$" },
      { id: 'B', text: "$\\triangle BAC = \\triangle EFD$" },
      { id: 'C', text: "$\\triangle CBA = \\triangle EFD$" },
      { id: 'D', text: "$\\triangle ABC = \\triangle EFD$" }
    ],
    correct_option_id: 'D',
    explanation: "Matching the included angle gives $B \\leftrightarrow F$. Then $BA = FE$ pairs $A \\leftrightarrow E$, and $BC = FD$ pairs $C \\leftrightarrow D$. Thus $\\triangle ABC = \\triangle EFD$ (SAS)."
  },

  // ==========================================
  // SECTOR 2: VENUS BASE (Q5 - Q8)
  // ==========================================
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • ASA Foundations & Adjacent Angles",
    content_markdown: "Review the Angle-Side-Angle (ASA) theorem diagram below.\n\n![Figure: ASA Congruence Theorem](/images/geometry/math7_l14_asa_theorem.svg)\n\nIn $\\triangle ABC$, which two angles are **adjacent** to side $BC$?",
    options: [
      { id: 'A', text: "Angles $\\widehat{A}$ and $\\widehat{B}$" },
      { id: 'B', text: "Angles $\\widehat{B}$ and $\\widehat{C}$" },
      { id: 'C', text: "Angles $\\widehat{A}$ and $\\widehat{C}$" },
      { id: 'D', text: "Exterior angles at $\\widehat{B}$ and $\\widehat{C}$" }
    ],
    correct_option_id: 'B',
    explanation: "The two angles adjacent to segment $BC$ sit at its two endpoints, which are $\\widehat{ABC}$ ($\\widehat{B}$) and $\\widehat{ACB}$ ($\\widehat{C}$)."
  },
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • ASA Foundations & Adjacent Angles",
    content_markdown: "Venus Base sensors scanned four triangles, each having a 1-tick side and angles of $50^\\circ$ and $70^\\circ$.\n\n![Figure: ASA Scanner](/images/geometry/math7_l14_asa_four_triangles.svg)\n\nWhich triangle is congruent to $\\triangle ABC$ by **ASA**?",
    options: [
      { id: 'A', text: "$\\triangle HGK$" },
      { id: 'B', text: "$\\triangle FED$" },
      { id: 'C', text: "$\\triangle MPN$" },
      { id: 'D', text: "$\\triangle GHK$" }
    ],
    correct_option_id: 'C',
    explanation: "In $\\triangle ABC$, both $50^\\circ$ and $70^\\circ$ are adjacent to the 1-tick side $BC$. Only $\\triangle MPN$ has both $70^\\circ$ ($\\widehat{P}$) and $50^\\circ$ ($\\widehat{N}$) adjacent to its 1-tick side $PN$, giving $\\triangle ABC = \\triangle MNP$ (ASA)."
  },
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • ASA Foundations & Adjacent Angles",
    content_markdown: "Given two triangles $\\triangle ABC$ and $\\triangle MNP$ satisfying $\\widehat{ABC} = \\widehat{PNM}$, $\\widehat{ACB} = \\widehat{NPM}$, and $BC = PN$. Which congruence statement is **TRUE**?",
    options: [
      { id: 'A', text: "$\\triangle ABC = \\triangle MNP$" },
      { id: 'B', text: "$\\triangle ABC = \\triangle PNM$" },
      { id: 'C', text: "$\\triangle ABC = \\triangle NPM$" },
      { id: 'D', text: "$\\triangle ABC = \\triangle MPN$" }
    ],
    correct_option_id: 'A',
    explanation: "Matching adjacent angles on $BC = NP$: $\\widehat{B} = \\widehat{N}$ ($B \\leftrightarrow N$) and $\\widehat{C} = \\widehat{P}$ ($C \\leftrightarrow P$), leaving $A \\leftrightarrow M$. Therefore $\\triangle ABC = \\triangle MNP$ (ASA)."
  },
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • ASA Foundations & Adjacent Angles",
    content_markdown: "Cadet Keithley tests this claim: *'If $\\triangle ABC$ and $\\triangle A'B'C'$ have $AC = A'C'$, $\\widehat{A} = \\widehat{A'}$, and opposite angles $\\widehat{B} = \\widehat{B'}$, are the two triangles congruent?'* What is the valid conclusion?",
    options: [
      { id: 'A', text: "No, because $\\widehat{B}$ is opposite to side $AC$, not adjacent" },
      { id: 'B', text: "No, because we also must verify side length $AB = A'B'$" },
      { id: 'C', text: "Yes, directly by SSS after measuring all three sides" },
      { id: 'D', text: "Yes, angle sum gives $\\widehat{C} = \\widehat{C'}$, then ASA" }
    ],
    correct_option_id: 'D',
    explanation: "By the $180^\\circ$ Angle Sum Theorem, $\\widehat{C} = 180^\\circ - (\\widehat{A} + \\widehat{B}) = 180^\\circ - (\\widehat{A'} + \\widehat{B'}) = \\widehat{C'}$. With $\\widehat{A} = \\widehat{A'}$, $AC = A'C'$, and $\\widehat{C} = \\widehat{C'}$, we get $\\triangle ABC = \\triangle A'B'C'$ by ASA."
  },

  // ==========================================
  // SECTOR 3: EARTH MISSION CONTROL (Q9 - Q12)
  // ==========================================
  {
    order_index: 9,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 3: Earth Mission Control • Angle Sum & Calculations",
    content_markdown: "Two navigation triangles $\\triangle ABC$ and $\\triangle DEF$ satisfy $AB = DE$, $AC = DF$, $\\widehat{BAC} = \\widehat{EDF} = 60^\\circ$, $BC = 6\\text{ cm}$, and $\\widehat{ABC} = 45^\\circ$. Calculate the length of side $EF$ in centimeters (enter the number only).",
    expected_value: "6",
    acceptable_answers: ["6", "6 cm", "6cm"],
    explanation: "Since $AB = DE$, $\\widehat{BAC} = \\widehat{EDF}$, and $AC = DF$, we have $\\triangle ABC = \\triangle DEF$ (SAS). Corresponding sides are equal, so $EF = BC = 6\\text{ cm}$."
  },
  {
    order_index: 10,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 3: Earth Mission Control • Angle Sum & Calculations",
    content_markdown: "Using the same telemetry data ($AB = DE$, $AC = DF$, $\\widehat{BAC} = \\widehat{EDF} = 60^\\circ$, $BC = 6\\text{ cm}$, and $\\widehat{ABC} = 45^\\circ$), compute the degree measure of angle $\\widehat{EFD}$ (enter the number only).",
    expected_value: "75",
    acceptable_answers: ["75", "75°", "75 deg"],
    explanation: "First, in $\\triangle ABC$, $\\widehat{ACB} = 180^\\circ - (60^\\circ + 45^\\circ) = 75^\\circ$. Because $\\triangle ABC = \\triangle DEF$ (SAS), corresponding angle $\\widehat{EFD} = \\widehat{ACB} = 75^\\circ$."
  },
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 3: Earth Mission Control • Angle Sum & Calculations",
    content_markdown: "Examine the orbital angle readout for $\\triangle ABC$ and $\\triangle MNP$ below.\n\n![Figure: Angle Sum + SAS Telemetry](/images/geometry/math7_l14_angle_sum_sas.svg)\n\nHow do we prove $\\triangle ABC = \\triangle MNP$?",
    options: [
      { id: 'A', text: "Find $\\widehat{M} = 60^\\circ$ by angle sum, then apply SAS" },
      { id: 'B', text: "Apply ASA directly using $50^\\circ$ and $70^\\circ$" },
      { id: 'C', text: "Use SSS because all three sides are marked" },
      { id: 'D', text: "They are not congruent since angles differ" }
    ],
    correct_option_id: 'A',
    explanation: "In $\\triangle MNP$, $\\widehat{M} = 180^\\circ - (50^\\circ + 70^\\circ) = 60^\\circ = \\widehat{A}$. Now $AB = MN$ (2 ticks), $\\widehat{A} = \\widehat{M} = 60^\\circ$, and $AC = MP$ (1 tick) prove $\\triangle ABC = \\triangle MNP$ by SAS."
  },
  {
    order_index: 12,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 3: Earth Mission Control • Angle Sum & Calculations",
    content_markdown: "Two calibration triangles $\\triangle ABC$ and $\\triangle DEF$ satisfy $AB = DE$, $\\widehat{ABC} = \\widehat{DEF} = 70^\\circ$, $\\widehat{BAC} = \\widehat{EDF} = 60^\\circ$, and $AC = 6\\text{ cm}$. Compute the exact length of side $DF$ in centimeters (enter the number only).",
    expected_value: "6",
    acceptable_answers: ["6", "6 cm", "6cm"],
    explanation: "Since $\\widehat{BAC} = \\widehat{EDF}$, $AB = DE$, and $\\widehat{ABC} = \\widehat{DEF}$, we obtain $\\triangle ABC = \\triangle DEF$ by ASA. Hence corresponding side $DF = AC = 6\\text{ cm}$."
  },

  // ==========================================
  // SECTOR 4: MARS OUTPOST (Q13 - Q16)
  // ==========================================
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "In the Mars lander hull plate $ABCD$, $AB = AD$ and $\\widehat{BAC} = \\widehat{DAC}$.\n\n![Figure: Kite Common Side SAS](/images/geometry/math7_l14_kite_sas.svg)\n\nWhich three equalities prove $\\triangle ABC = \\triangle ADC$?",
    options: [
      { id: 'A', text: "$AB = AD$, $\\widehat{BAC} = \\widehat{DAC}$, and $BC = DC$ (SSS)" },
      { id: 'B', text: "$AB = AD$, $\\widehat{BAC} = \\widehat{DAC}$, and $AC$ common (SAS)" },
      { id: 'C', text: "$\\widehat{B} = \\widehat{D}$, $AC$ common, and $\\widehat{BCA} = \\widehat{DCA}$ (ASA)" },
      { id: 'D', text: "$BC = DC$, $\\widehat{BCA} = \\widehat{DCA}$, and $AC$ common (SAS)" }
    ],
    correct_option_id: 'B',
    explanation: "Comparing $\\triangle ABC$ and $\\triangle ADC$: $AB = AD$ (given), $\\widehat{BAC} = \\widehat{DAC}$ (given included angle), and $AC$ is a common side. Thus $\\triangle ABC = \\triangle ADC$ (SAS)."
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "In satellite wing $ABCD$, diagonal $BD$ satisfies $\\widehat{ABD} = \\widehat{CBD}$ and $\\widehat{ADB} = \\widehat{CDB}$.\n\n![Figure: Shared Diagonal BD ASA](/images/geometry/math7_l14_kite_asa.svg)\n\nWhich criterion proves $\\triangle ABD = \\triangle CBD$?",
    options: [
      { id: 'A', text: "Side-Side-Side (SSS)" },
      { id: 'B', text: "Side-Angle-Side (SAS)" },
      { id: 'C', text: "Angle-Side-Angle (ASA)" },
      { id: 'D', text: "Vertical angles theorem" }
    ],
    correct_option_id: 'C',
    explanation: "Diagonal $BD$ is a common side, and the two pairs of equal angles ($\\widehat{ABD} = \\widehat{CBD}$ and $\\widehat{ADB} = \\widehat{CDB}$) are adjacent to $BD$. Therefore $\\triangle ABD = \\triangle CBD$ by ASA."
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "Solar frame $ABCD$ has diagonal $BD$, with $AB = DC$ and $\\widehat{ABD} = \\widehat{CDB}$.\n\n![Figure: Shared Diagonal SAS](/images/geometry/math7_l14_parallel_diag_sas.svg)\n\nWhich congruence statement holds?",
    options: [
      { id: 'A', text: "$\\triangle ABD = \\triangle CBD$" },
      { id: 'B', text: "$\\triangle ABD = \\triangle DBC$" },
      { id: 'C', text: "$\\triangle ABD = \\triangle BCD$" },
      { id: 'D', text: "$\\triangle ABD = \\triangle CDB$" }
    ],
    correct_option_id: 'D',
    explanation: "In $\\triangle ABD$ and $\\triangle CDB$: $AB = CD$ (given), $\\widehat{ABD} = \\widehat{CDB}$ (included), and $BD = DB$ (common). Thus $A \\leftrightarrow C$, $B \\leftrightarrow D$, $D \\leftrightarrow B$, giving $\\triangle ABD = \\triangle CDB$ (SAS)."
  },
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "In the rover suspension frame below, $AC = BD$ and $\\widehat{CAB} = \\widehat{DBA}$.\n\n![Figure: Shared Base AB SAS](/images/geometry/math7_l14_overlapping_ab_sas.svg)\n\nWhich deduction correctly proves $AD = BC$?",
    options: [
      { id: 'A', text: "$\\triangle CAB = \\triangle DBA$ (SAS), so $AD = BC$" },
      { id: 'B', text: "$\\triangle CAB = \\triangle ABD$ (SSS), so $AD = BC$" },
      { id: 'C', text: "$\\triangle ABC = \\triangle ABD$ (ASA), so $AD = BC$" },
      { id: 'D', text: "$\\triangle CAB = \\triangle DAB$ (ASA), so $AD = BC$" }
    ],
    correct_option_id: 'A',
    explanation: "Compare $\\triangle CAB$ and $\\triangle DBA$: $AC = BD$ (given), $\\widehat{CAB} = \\widehat{DBA}$ (given), and $AB = BA$ (common side). By SAS, $\\triangle CAB = \\triangle DBA$, so corresponding sides give $BC = AD$."
  },

  // ==========================================
  // SECTOR 5: JUPITER STATION (Q17 - Q20)
  // ==========================================
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Vertical Angles & Bowtie Bridges",
    content_markdown: "Two radar beams cross at station $C$ as shown below, with $AC = DC$ and $\\widehat{BAC} = \\widehat{EDC}$.\n\n![Figure: Vertical Angles Bridge ASA](/images/geometry/math7_l14_bowtie_asa.svg)\n\nWhich hidden equality unlocks $\\triangle ABC = \\triangle DEC$ by **ASA**?",
    options: [
      { id: 'A', text: "$BC = EC$ (assuming $C$ is the exact midpoint of $BE$)" },
      { id: 'B', text: "$\\widehat{BCA} = \\widehat{ECD}$ (vertical opposite angles)" },
      { id: 'C', text: "$AB = DE$ (assuming $AB$ is horizontal and equal)" },
      { id: 'D', text: "$\\widehat{B} = \\widehat{E}$ (assumed by alternate interior angles)" }
    ],
    correct_option_id: 'B',
    explanation: "Segments $BE$ and $AD$ cross at $C$, forming equal vertical opposite angles $\\widehat{BCA} = \\widehat{ECD}$. Together with $AC = DC$ and $\\widehat{BAC} = \\widehat{EDC}$, we get $\\triangle ABC = \\triangle DEC$ (ASA)."
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Vertical Angles & Bowtie Bridges",
    content_markdown: "Segments $AC$ and $BD$ intersect at point $O$ such that $OA = OC$ and $OB = OD$. Which pair of triangles is congruent by **SAS** using vertical opposite angles at $O$?",
    options: [
      { id: 'A', text: "$\\triangle OAB = \\triangle ODC$ and $\\triangle OAC = \\triangle OBD$" },
      { id: 'B', text: "$\\triangle OAC = \\triangle OBD$ and $\\triangle OAD = \\triangle OCB$" },
      { id: 'C', text: "$\\triangle OAB = \\triangle OCD$ and $\\triangle OAD = \\triangle OCB$" },
      { id: 'D', text: "$\\triangle OAB = \\triangle OBC$ and $\\triangle OCD = \\triangle OAD$" }
    ],
    correct_option_id: 'C',
    explanation: "At intersection $O$, vertical angles give $\\widehat{AOB} = \\widehat{COD}$ and $\\widehat{AOD} = \\widehat{COB}$. Combining with $OA = OC$ and $OB = OD$ yields both $\\triangle OAB = \\triangle OCD$ (SAS) and $\\triangle OAD = \\triangle OCB$ (SAS)."
  },
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Vertical Angles & Bowtie Bridges",
    content_markdown: "Look at the overlapping sensor triangles $\\triangle ADE$ and $\\triangle BCE$ below, where $AE = BE$ and $\\widehat{DAE} = \\widehat{CBE}$.\n\n![Figure: Overlapping Sensors ASA](/images/geometry/math7_l14_overlapping_asa.svg)\n\nWhich congruence rule proves $\\triangle ADE = \\triangle BCE$?",
    options: [
      { id: 'A', text: "SSS using common side $DE$ and $AD = BC$" },
      { id: 'B', text: "SAS using $AD = BC$ and $\\widehat{D} = \\widehat{C}$" },
      { id: 'C', text: "SAS using $DE = CE$ and $\\widehat{A} = \\widehat{B}$" },
      { id: 'D', text: "ASA using $\\widehat{AED} = \\widehat{BEC}$" }
    ],
    correct_option_id: 'D',
    explanation: "In $\\triangle ADE$ and $\\triangle BCE$: $\\widehat{DAE} = \\widehat{CBE}$ (given), $AE = BE$ (given), and $\\widehat{AED} = \\widehat{BEC}$ (vertical opposite angles). Thus $\\triangle ADE = \\triangle BCE$ by ASA."
  },
  {
    order_index: 20,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 5: Jupiter Station • Vertical Angles & Bowtie Bridges",
    content_markdown: "In the bowtie radar configuration ($\\triangle ABC$ and $\\triangle DEC$ meeting at $C$) with $AC = DC$ and $\\widehat{BAC} = \\widehat{EDC}$: if $\\widehat{BAC} = 28^\\circ$ and $\\widehat{BCA} = 97^\\circ$, compute the degree measure of angle $\\widehat{DEC}$ (enter the number only).",
    expected_value: "55",
    acceptable_answers: ["55", "55°", "55 deg"],
    explanation: "First, $\\triangle ABC = \\triangle DEC$ (ASA). In $\\triangle ABC$, $\\widehat{ABC} = 180^\\circ - (28^\\circ + 97^\\circ) = 55^\\circ$. Therefore corresponding angle $\\widehat{DEC} = \\widehat{ABC} = 55^\\circ$."
  },

  // ==========================================
  // SECTOR 6: SATURN RINGS (Q21 - Q24)
  // ==========================================
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 6: Saturn Rings • Parallel Lines & Segment Addition",
    content_markdown: "In the Saturn ring truss below, points $A, B, C, D$ lie on a straight line in that order with $OA = OD$, $AB = CD$, and $\\widehat{OAB} = \\widehat{ODC}$.\n\n![Figure: Segment Addition SAS](/images/geometry/math7_l14_collinear_vandung.svg)\n\nHow do we prove $\\triangle OAC = \\triangle ODB$?",
    options: [
      { id: 'A', text: "Add $BC$ to get $AC = DB$, then apply SAS" },
      { id: 'B', text: "Use $OC = OB$ directly as given data" },
      { id: 'C', text: "Apply ASA using $\\widehat{AOC} = \\widehat{DOB}$" },
      { id: 'D', text: "Use SSS with $OA = OD$ and $OC = OB$" }
    ],
    correct_option_id: 'A',
    explanation: "Since $B$ lies between $A$ and $C$ and $C$ lies between $B$ and $D$, adding $BC$ to $AB = CD$ gives $AC = AB + BC = CD + BC = DB$. Now $OA = OD$, $\\widehat{OAC} = \\widehat{ODB}$, and $AC = DB$ prove $\\triangle OAC = \\triangle ODB$ by SAS."
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 6: Saturn Rings • Parallel Lines & Segment Addition",
    content_markdown: "In the parallel truss below, $AB \\parallel CD$ and $AB = CD$. Segments $AD$ and $BC$ intersect at $E$.\n\n![Figure: Parallel Truss AB || CD](/images/geometry/math7_l14_parallel_bowtie_gh.svg)\n\nWhich step proves $\\triangle ABE = \\triangle DCE$?",
    options: [
      { id: 'A', text: "SSS with $AE = DE$ and $BE = CE$" },
      { id: 'B', text: "ASA using alternate interior angles" },
      { id: 'C', text: "SAS using $AB = CD$ and $AE = DE$" },
      { id: 'D', text: "Vertical angles give $AB = CD$" }
    ],
    correct_option_id: 'B',
    explanation: "Because $AB \\parallel CD$, alternate interior angles are equal: $\\widehat{EAB} = \\widehat{EDC}$ and $\\widehat{EBA} = \\widehat{ECD}$. Together with $AB = CD$, we prove $\\triangle ABE = \\triangle DCE$ by ASA."
  },
  {
    order_index: 23,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 6: Saturn Rings • Parallel Lines & Segment Addition",
    content_markdown: "In the same parallel truss ($AB \\parallel CD$, $AB = CD$, $E = AD \\cap BC$), points $G \\in AB$ and $H \\in CD$ are collinear with $E$. Once $\\triangle ABE = \\triangle DCE$ gives $EA = ED$, which congruence proves $EG = EH$?",
    options: [
      { id: 'A', text: "$\\triangle AGB = \\triangle DHC$ by SSS" },
      { id: 'B', text: "$\\triangle AEG = \\triangle BEG$ by SAS" },
      { id: 'C', text: "$\\triangle AGE = \\triangle DHE$ by ASA" },
      { id: 'D', text: "$\\triangle BHE = \\triangle CGE$ by SAS" }
    ],
    correct_option_id: 'C',
    explanation: "Compare $\\triangle AGE$ and $\\triangle DHE$: $\\widehat{GAE} = \\widehat{HDE}$ (alternate interior angles since $AB \\parallel CD$), $EA = ED$ (from $\\triangle ABE = \\triangle DCE$), and $\\widehat{AEG} = \\widehat{DEH}$ (vertical opposite angles). Thus $\\triangle AGE = \\triangle DHE$ (ASA), giving $EG = EH$."
  },
  {
    order_index: 24,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 6: Saturn Rings • Parallel Lines & Segment Addition",
    content_markdown: "In the same parallel truss ($AB \\parallel CD$, $AB = CD$, $E = AD \\cap BC$), if $AE = 9\\text{ m}$ and $BE = 12\\text{ m}$, calculate the total length of segment $AD$ in meters (enter the number only).",
    expected_value: "18",
    acceptable_answers: ["18", "18 m", "18m"],
    explanation: "From $\\triangle ABE = \\triangle DCE$ (ASA), corresponding sides give $DE = AE = 9\\text{ m}$. Since $E$ lies on $AD$, $AD = AE + ED = 9 + 9 = 18\\text{ m}$."
  },

  // ==========================================
  // SECTOR 7: URANUS DEEP SPACE (Q25 - Q27)
  // ==========================================
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Stage Chains & Medians",
    content_markdown: "Point $M$ lies on segment $AB$, with $\\widehat{BAC} = \\widehat{BAD}$ and $\\widehat{ABC} = \\widehat{ABD}$.\n\n![Figure: Two-Stage Proof ASA then SAS](/images/geometry/math7_l14_luyentapchung_m.svg)\n\nWhich two-step proof chain establishes $\\triangle AMC = \\triangle AMD$?",
    options: [
      { id: 'A', text: "Step 1: $\\triangle ABC = \\triangle ABD$ (SSS) gives $CM = DM$; Step 2: $\\triangle AMC = \\triangle AMD$ (ASA)" },
      { id: 'B', text: "Step 1: $\\triangle BMC = \\triangle BMD$ (SAS) gives $AC = AD$; Step 2: $\\triangle AMC = \\triangle AMD$ (ASA)" },
      { id: 'C', text: "Step 1: $\\triangle ABC = \\triangle ABD$ (ASA) gives $AC = AD$; Step 2: $\\triangle AMC = \\triangle AMD$ (SAS)" },
      { id: 'D', text: "Step 1: $\\triangle AMC = \\triangle AMD$ (ASA) directly from common side $AM$ and $\\widehat{A}$" }
    ],
    correct_option_id: 'C',
    explanation: "Step 1: $\\triangle ABC = \\triangle ABD$ by ASA ($\\widehat{BAC} = \\widehat{BAD}$, $AB$ common, $\\widehat{ABC} = \\widehat{ABD}$), which yields $AC = AD$. Step 2: In $\\triangle AMC$ and $\\triangle AMD$, $AM$ is common, $\\widehat{MAC} = \\widehat{MAD}$, and $AC = AD$, proving $\\triangle AMC = \\triangle AMD$ (SAS)."
  },
  {
    order_index: 26,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Stage Chains & Medians",
    content_markdown: "In $\\triangle ABC$ and $\\triangle DEF$, $M$ and $N$ are the midpoints of $BC$ and $EF$. Given $AB = DE$, $BC = EF$, and $AM = DN$.\n\n![Figure: Median Bridge SSS then SAS](/images/geometry/math7_l14_medians_sas.svg)\n\nHow do we prove $\\triangle ABC = \\triangle DEF$?",
    options: [
      { id: 'A', text: "Prove $\\triangle ABM = \\triangle DEN$ by SAS first, then deduce $\\triangle ABC = \\triangle DEF$ by SSS" },
      { id: 'B', text: "Prove $\\triangle ABM = \\triangle DEN$ by ASA first, then deduce $\\triangle ABC = \\triangle DEF$ by SAS" },
      { id: 'C', text: "Apply SAS directly to $\\triangle ABC$ and $\\triangle DEF$ without using midpoints $M, N$" },
      { id: 'D', text: "Prove $\\triangle ABM = \\triangle DEN$ (SSS) to get $\\widehat{B} = \\widehat{E}$, then apply SAS" }
    ],
    correct_option_id: 'D',
    explanation: "Since $M, N$ are midpoints of equal sides $BC = EF$, we have $BM = \\frac{1}{2}BC = \\frac{1}{2}EF = EN$. With $AB = DE$ and $AM = DN$, $\\triangle ABM = \\triangle DEN$ (SSS), giving $\\widehat{B} = \\widehat{E}$. Finally, $AB = DE$, $\\widehat{B} = \\widehat{E}$, and $BC = EF$ prove $\\triangle ABC = \\triangle DEF$ (SAS)."
  },
  {
    order_index: 27,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Stage Chains & Medians",
    content_markdown: "In a two-stage diamond truss $ABCD$ where $M$ lies on diagonal $AB$ and $\\widehat{BAC} = \\widehat{BAD}$, $\\widehat{ABC} = \\widehat{ABD}$: if $CM = 11\\text{ cm}$, what is the length of segment $DM$ in centimeters (enter the number only)?",
    expected_value: "11",
    acceptable_answers: ["11", "11 cm", "11cm"],
    explanation: "Following the two-stage proof ($\\triangle ABC = \\triangle ABD$ by ASA $\\implies AC = AD \\implies \\triangle AMC = \\triangle AMD$ by SAS), corresponding sides give $DM = CM = 11\\text{ cm}$."
  },

  // ==========================================
  // SECTOR 8: NEPTUNE FRONTIER (Q28 - Q30)
  // ==========================================
  {
    order_index: 28,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 8: Neptune Frontier • Space Surveying & Formal Proofs",
    content_markdown: "Mission engineers need the width $AB$ of a hazardous crater without crossing it. They place beacon $C$ such that $B, C, D$ are collinear with $BC = DC = 120\\text{ m}$, sight $A, C, E$ along a straight laser line, and set $\\widehat{ABC} = \\widehat{EDC} = 90^\\circ$.\n\n![Figure: Crater Triangulation via ASA](/images/geometry/math7_l14_crater_triangulation.svg)\n\nIf they measure $DE = 85\\text{ m}$ on safe ground, what is the crater width $AB$ in meters (enter the number only)?",
    expected_value: "85",
    acceptable_answers: ["85", "85 m", "85m"],
    explanation: "In $\\triangle ABC$ and $\\triangle EDC$: $\\widehat{ABC} = \\widehat{EDC} = 90^\\circ$, $BC = DC = 120\\text{ m}$, and $\\widehat{ACB} = \\widehat{ECD}$ (vertical opposite angles). By ASA, $\\triangle ABC = \\triangle EDC$, so $AB = DE = 85\\text{ m}$."
  },
  {
    order_index: 29,
    type: 'ESSAY_UPLOAD',
    points: 0.60,
    sectionName: "Sector 8: Neptune Frontier • Space Surveying & Formal Proofs",
    content_markdown: "Ray $Oz$ is the angle bisector of $\\widehat{xOy}$. Points $A \\in Ox$, $B \\in Oy$, and $C \\in Oz$ satisfy $\\widehat{CAO} = \\widehat{CBO}$.\n\nWrite a complete step-by-step formal proof showing:\n(a) $\\triangle OAC = \\triangle OBC$ (hint: use the $180^\\circ$ Angle Sum first to unlock ASA);\n(b) If point $M$ lies on the opposite ray of $CO$, prove that $\\triangle MAC = \\triangle MBC$.\n\n*(Type your proof or upload a clear photo of your handwritten notebook solution.)*",
    rubric: "1) Part (a): Note angle AOC = angle BOC (bisector) and angle CAO = angle CBO (given). Deduce angle ACO = angle BCO via 180 deg angle sum (0.15 pts), then prove triangle OAC = triangle OBC by ASA with common side OC (0.20 pts). 2) Part (b): Deduce AC = BC and supplementary angles angle ACM = angle BCM (0.15 pts), then prove triangle MAC = triangle MBC by SAS with common side MC (0.10 pts).",
    explanation: "(a) Because $Oz$ bisects $\\widehat{xOy}$, $\\widehat{AOC} = \\widehat{BOC}$. We are given $\\widehat{CAO} = \\widehat{CBO}$. By the $180^\\circ$ Angle Sum Theorem, $\\widehat{ACO} = 180^\\circ - (\\widehat{AOC} + \\widehat{CAO}) = 180^\\circ - (\\widehat{BOC} + \\widehat{CBO}) = \\widehat{BCO}$. Comparing $\\triangle OAC$ and $\\triangle OBC$: $\\widehat{AOC} = \\widehat{BOC}$, $OC$ is common, and $\\widehat{ACO} = \\widehat{BCO} \\implies \\triangle OAC = \\triangle OBC$ (ASA).\n(b) From $\\triangle OAC = \\triangle OBC$, we get $AC = BC$. Since $M$ lies on the opposite ray of $CO$, $\\widehat{ACM} = 180^\\circ - \\widehat{ACO} = 180^\\circ - \\widehat{BCO} = \\widehat{BCM}$. Comparing $\\triangle MAC$ and $\\triangle MBC$: $AC = BC$, $\\widehat{ACM} = \\widehat{BCM}$, and $MC$ is common $\\implies \\triangle MAC = \\triangle MBC$ (SAS). $\\blacksquare$"
  },
  {
    order_index: 30,
    type: 'ESSAY_UPLOAD',
    points: 0.65,
    sectionName: "Sector 8: Neptune Frontier • Space Surveying & Formal Proofs",
    content_markdown: "In the orbital solar truss shown below, $AB \\parallel CD$ and $AB = CD$. Segments $AD$ and $BC$ intersect at $E$. Points $G \\in AB$ and $H \\in CD$ are positioned so that $G, E, H$ are collinear.\n\n![Figure: Parallel Truss AB || CD](/images/geometry/math7_l14_parallel_bowtie_gh.svg)\n\nWrite a complete formal proof for:\n(a) $\\triangle ABE = \\triangle DCE$;\n(b) $EG = EH$.\n\n*(Type your proof or upload a clear photo of your handwritten notebook solution.)*",
    rubric: "1) Part (a): State alternate interior angles angle EAB = angle EDC and angle EBA = angle ECD from AB || CD (0.15 pts), combine with AB = CD to prove triangle ABE = triangle DCE by ASA (0.20 pts). 2) Part (b): Deduce EA = ED (0.10 pts), then compare triangle AGE and triangle DHE using angle GAE = angle HDE, EA = ED, and vertical angles angle AEG = angle DEH to prove congruence by ASA and conclude EG = EH (0.20 pts).",
    explanation: "(a) Since $AB \\parallel CD$, alternate interior angles are equal: $\\widehat{EAB} = \\widehat{EDC}$ and $\\widehat{EBA} = \\widehat{ECD}$. Comparing $\\triangle ABE$ and $\\triangle DCE$: $\\widehat{EAB} = \\widehat{EDC}$, $AB = DC$ (given), and $\\widehat{EBA} = \\widehat{ECD}$. Therefore $\\triangle ABE = \\triangle DCE$ (ASA).\n(b) From $\\triangle ABE = \\triangle DCE$, corresponding sides give $EA = ED$. Now compare $\\triangle AGE$ and $\\triangle DHE$: $\\widehat{GAE} = \\widehat{HDE}$ (alternate interior angles since $AB \\parallel CD$), $EA = ED$ (proved above), and $\\widehat{AEG} = \\widehat{DEH}$ (vertical opposite angles). Thus $\\triangle AGE = \\triangle DHE$ (ASA), so corresponding sides give $EG = EH$. $\\blacksquare$"
  }
];

async function main() {
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  console.log(`🚀 [Keithley Math Seed] Launching Lesson 14 Mission (30 Problems)`);
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

  // 2. Create Learning Unit (Concise Flight Briefing + Web Studio attachment)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: "Lesson 14: Second & Third Congruence Cases of Triangles (SAS & ASA)",
      description: "Ultra-concise space briefing and 30-problem cosmic mission covering Side-Angle-Side (SAS), Angle-Side-Angle (ASA), included vs. adjacent angles, vertical angle bridges, and formal geometric proofs.",
      lecture_content_markdown: LECTURE_MARKDOWN,
      lecture_attachments: [
        {
          type: "WEB_STUDIO",
          title: "Lesson 14 Interactive Studio: SAS & ASA Congruence",
          url: "/lectures/math7-lesson14-congruent-sas-asa/index.html"
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
      teacher_daily_note: "Cadet Keithley, welcome to Lesson 14! Read the ultra-concise SAS & ASA briefing and explore the 4-station Interactive Studio before launching your 30-problem mission across the Solar System.",
      is_published: true
    }
  });
  console.log(`✅ Created Daily Mission Assignment: ${assignment.id}`);

  // 4. Create Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: "Lesson 14 Mission: SAS & ASA Triangle Congruence (30 Problems)",
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

  console.log('\n🎉 ALL SYSTEMS GO! Keithley Lesson 14 Mission (30 Problems) successfully seeded for 2026-11-26.');
}

main()
  .catch(err => {
    console.error('❌ Execution Error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

