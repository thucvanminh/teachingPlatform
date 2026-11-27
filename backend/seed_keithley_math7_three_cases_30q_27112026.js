#!/usr/bin/env node

/**
 * SEED SCRIPT: KEITHLEY LAKE (GRADE 7)
 * MISSION: Synthesis — Three Congruence Cases of Triangles (SSS, SAS & ASA) (30 Problems)
 * DATE: 2026-11-27
 */

const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Flight Commander Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Astronaut Cadet Keithley Lake
  SUBJECT_ID: 'e89cc834-99d0-40b7-ab5e-0a0838d273c4', // Grade 7 Math (MATH_7)
  ASSIGNED_DATE: '2026-11-27'
};

const LECTURE_MARKDOWN = `# 🚀 Master Synthesis Briefing: Three Congruence Cases of Triangles (SSS, SAS & ASA)

Welcome aboard, Astronaut Cadet Keithley! Today's mission unifies **Lesson 13 (Congruent Triangles & SSS)** and **Lesson 14 (SAS & ASA)** into one complete flight manual before your 30-problem cumulative expedition.

---

### 1. Three Triangle Congruence Criteria
| Case | Required Equal Parts | Critical Condition |
| :--- | :--- | :--- |
| **1. SSS** | Three pairs of sides ($AB = A'B', AC = A'C', BC = B'C'$) | Look for common sides or segment addition |
| **2. SAS** | Two pairs of sides + **included angle** | Angle MUST lie between the two equal sides (**no SSA!**) |
| **3. ASA** | One pair of sides + **two adjacent angles** | Both angles touch the equal side (**use $180^\\circ$ sum if needed**) |

---

### 2. Core Rules & Traps
- **Exact Vertex Order:** $\\triangle ABC = \\triangle DEF$ locks $A \\leftrightarrow D$, $B \\leftrightarrow E$, $C \\leftrightarrow F$.
- **Invalid Claims:** **AAA** (three equal angles) and **SSA** (angle not between the two equal sides) do **NOT** prove congruence.
- **5 Hidden Clues:** (1) Common side, (2) Vertical opposite angles, (3) Alternate interior angles ($AB \\parallel CD$), (4) Segment addition ($AC = AB + BC$), (5) $180^\\circ$ Angle Sum.

---

### 3. Interactive Synthesis Studio
- **Web Studio:** [Launch Synthesis Interactive Studio](/lectures/math7-three-congruence-cases/index.html)
`;

const QUESTIONS = [
  // ==========================================
  // SECTOR 1: MERCURY ORBIT (Q1 - Q4)
  // ==========================================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Congruence Matrix & Vertex Order",
    content_markdown: "Inspect the Master Matrix below comparing the three triangle congruence cases.\n\n![Figure: Three Triangle Congruence Cases](/images/geometry/math7_rev_three_cases_matrix.svg)\n\nWhich three criteria guarantee that two triangles are congruent?",
    options: [
      { id: 'A', text: "SSS, SSA, and AAA" },
      { id: 'B', text: "SSS, SAS, and ASA" },
      { id: 'C', text: "SAS, SSA, and AAA" },
      { id: 'D', text: "ASA, AAA, and SSA" }
    ],
    correct_option_id: 'B',
    explanation: "The three valid congruence criteria are Side-Side-Side (SSS), Side-Angle-Side (SAS), and Angle-Side-Angle (ASA). Neither SSA nor AAA guarantees congruence."
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Congruence Matrix & Vertex Order",
    content_markdown: "Given the congruence statement $\\triangle ABC = \\triangle MNP$, which angle corresponds to $\\widehat{MPN}$ and which side corresponds to segment $MP$?",
    options: [
      { id: 'A', text: "Angle $\\widehat{ABC}$ and side $AB$" },
      { id: 'B', text: "Angle $\\widehat{BAC}$ and side $BC$" },
      { id: 'C', text: "Angle $\\widehat{ACB}$ and side $AC$" },
      { id: 'D', text: "Angle $\\widehat{CBA}$ and side $AC$" }
    ],
    correct_option_id: 'C',
    explanation: "From $\\triangle ABC = \\triangle MNP$: $M \\leftrightarrow A$, $N \\leftrightarrow B$, and $P \\leftrightarrow C$. Thus $M-P-N$ maps to $A-C-B$ ($\\widehat{ACB}$) and segment $MP$ maps to $AC$."
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Congruence Matrix & Vertex Order",
    content_markdown: "The reflected triangles below have matching tick marks and angle arcs indicating equal corresponding parts.\n\n![Figure: Reflected Congruent Triangles](/images/geometry/math7_l13_tick_matching_def_ghk.svg)\n\nWhich congruence notation correctly aligns all corresponding vertices?",
    options: [
      { id: 'A', text: "$\\triangle DEF = \\triangle GHK$" },
      { id: 'B', text: "$\\triangle DEF = \\triangle HGK$" },
      { id: 'C', text: "$\\triangle DEF = \\triangle KGH$" },
      { id: 'D', text: "$\\triangle DEF = \\triangle KHG$" }
    ],
    correct_option_id: 'A',
    explanation: "Matching angle arcs and side ticks: $D \\leftrightarrow G$ (1 arc), $E \\leftrightarrow H$ (2 arcs), and $F \\leftrightarrow K$ (opposite 1-arc/2-arc side). Thus $\\triangle DEF = \\triangle GHK$."
  },
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Congruence Matrix & Vertex Order",
    content_markdown: "Two triangles $\\triangle PQR$ and $\\triangle XYZ$ satisfy $PQ = YX$, $QR = XZ$, and $\\widehat{PQR} = \\widehat{YXZ}$. Which congruence statement is written in the **exact** corresponding order?",
    options: [
      { id: 'A', text: "$\\triangle PQR = \\triangle XYZ$" },
      { id: 'B', text: "$\\triangle PQR = \\triangle ZXY$" },
      { id: 'C', text: "$\\triangle PQR = \\triangle XZY$" },
      { id: 'D', text: "$\\triangle PQR = \\triangle YXZ$" }
    ],
    correct_option_id: 'D',
    explanation: "The included angles give $Q \\leftrightarrow X$. Since $QP = XY$ ($P \\leftrightarrow Y$) and $QR = XZ$ ($R \\leftrightarrow Z$), the exact correspondence is $\\triangle PQR = \\triangle YXZ$ (SAS)."
  },

  // ==========================================
  // SECTOR 2: VENUS BASE (Q5 - Q8)
  // ==========================================
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • Criterion Scanner & Trap Detection",
    content_markdown: "Venus orbital sensors scanned four triangles marked with side ticks below.\n\n![Figure: Four Triangles SSS Scanner](/images/geometry/math7_l13_four_triangles_sss.svg)\n\nWhich triangle is **NOT** congruent to $\\triangle ABC$ by SSS?",
    options: [
      { id: 'A', text: "$\\triangle DEF$" },
      { id: 'B', text: "$\\triangle MNP$" },
      { id: 'C', text: "$\\triangle GKH$" },
      { id: 'D', text: "None of them" }
    ],
    correct_option_id: 'A',
    explanation: "$\\triangle ABC$, $\\triangle MNP$, and $\\triangle GKH$ each have one cross-tick, one single-tick, and one double-tick side. $\\triangle DEF$ has two single-tick sides and one cross-tick side, so it is NOT congruent to $\\triangle ABC$."
  },
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • Criterion Scanner & Trap Detection",
    content_markdown: "Inspect the four triangles below marked with 1-tick, 2-tick sides and an angle arc.\n\n![Figure: Included Angle SAS Check](/images/geometry/math7_l14_sas_vs_ssa_trap.svg)\n\nWhy are $\\triangle FED$ and $\\triangle MNP$ **NOT** guaranteed to be congruent to $\\triangle ABC$?",
    options: [
      { id: 'A', text: "Their marked side lengths use different tick units" },
      { id: 'B', text: "Their marked angle is not between the two marked sides" },
      { id: 'C', text: "Their interior angles do not sum to $180^\\circ$" },
      { id: 'D', text: "Triangles facing opposite ways cannot be congruent" }
    ],
    correct_option_id: 'B',
    explanation: "In $\\triangle FED$ and $\\triangle MNP$, the marked angle is NOT the included angle between the 1-tick and 2-tick sides (SSA trap), whereas in $\\triangle ABC$ and $\\triangle GHK$ it IS included (SAS)."
  },
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • Criterion Scanner & Trap Detection",
    content_markdown: "Four triangles below each have a 1-tick side and angle measures $50^\\circ$ and $70^\\circ$.\n\n![Figure: ASA Four Triangles](/images/geometry/math7_l14_asa_four_triangles.svg)\n\nWhich triangle is congruent to $\\triangle ABC$ by **ASA**?",
    options: [
      { id: 'A', text: "$\\triangle HGK$" },
      { id: 'B', text: "$\\triangle FED$" },
      { id: 'C', text: "$\\triangle MPN$" },
      { id: 'D', text: "$\\triangle GKH$" }
    ],
    correct_option_id: 'C',
    explanation: "In $\\triangle ABC$, both $50^\\circ$ and $70^\\circ$ are adjacent to the 1-tick side $BC$. Only $\\triangle MPN$ has both $70^\\circ$ ($\\widehat{P}$) and $50^\\circ$ ($\\widehat{N}$) adjacent to its 1-tick side $PN$, so $\\triangle ABC = \\triangle MNP$ (ASA)."
  },
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • Criterion Scanner & Trap Detection",
    content_markdown: "If $\\triangle ABC$ and $\\triangle DEF$ satisfy $\\widehat{A} = \\widehat{D}$, $\\widehat{B} = \\widehat{E}$, and $\\widehat{C} = \\widehat{F}$ (with **no** side lengths given), can we conclude they are congruent?",
    options: [
      { id: 'A', text: "Yes, by ASA since three angles lock every side length" },
      { id: 'B', text: "Yes, by SAS using any two pairs of equal angles" },
      { id: 'C', text: "Yes, by SSS because equal angles force equal sides" },
      { id: 'D', text: "No, AAA allows different triangle sizes" }
    ],
    correct_option_id: 'D',
    explanation: "Angle-Angle-Angle (AAA) does NOT prove triangle congruence: one triangle can be a scaled-up version of the other with identical angles and completely different side lengths."
  },

  // ==========================================
  // SECTOR 3: EARTH MISSION CONTROL (Q9 - Q12)
  // ==========================================
  {
    order_index: 9,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 3: Earth Mission Control • Angle Sum & Corresponding Parts",
    content_markdown: "Given $\\triangle ABC = \\triangle DEF$ with $BC = 7\\text{ cm}$, $\\widehat{ABC} = 42^\\circ$, and $\\widehat{ACB} = 58^\\circ$.\n\n![Figure: Corresponding Parts Calculation](/images/geometry/math7_l13_luyentap1_abc_def.svg)\n\nCompute the degree measure of angle $\\widehat{EDF}$ (enter the number only).",
    expected_value: "80",
    acceptable_answers: ["80", "80°", "80 deg"],
    explanation: "In $\\triangle ABC$, $\\widehat{BAC} = 180^\\circ - (42^\\circ + 58^\\circ) = 80^\\circ$. Since $\\triangle ABC = \\triangle DEF$, corresponding angle $\\widehat{EDF} = \\widehat{BAC} = 80^\\circ$."
  },
  {
    order_index: 10,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 3: Earth Mission Control • Angle Sum & Corresponding Parts",
    content_markdown: "Two spacecraft panels $\\triangle ABC$ and $\\triangle DEF$ satisfy $AB = DE$, $AC = DF$, $\\widehat{BAC} = \\widehat{EDF} = 55^\\circ$, and $\\widehat{ABC} = 65^\\circ$. Calculate the degree measure of angle $\\widehat{EFD}$ (enter the number only).",
    expected_value: "60",
    acceptable_answers: ["60", "60°", "60 deg"],
    explanation: "By SAS, $\\triangle ABC = \\triangle DEF$. In $\\triangle ABC$, $\\widehat{ACB} = 180^\\circ - (55^\\circ + 65^\\circ) = 60^\\circ$. Therefore corresponding angle $\\widehat{EFD} = \\widehat{ACB} = 60^\\circ$."
  },
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 3: Earth Mission Control • Angle Sum & Corresponding Parts",
    content_markdown: "Look at the telemetry readout for $\\triangle ABC$ and $\\triangle MNP$ below.\n\n![Figure: Angle Sum + SAS](/images/geometry/math7_l14_angle_sum_sas.svg)\n\nWhich logical sequence proves $\\triangle ABC = \\triangle MNP$?",
    options: [
      { id: 'A', text: "Find $\\widehat{M} = 60^\\circ$ via $180^\\circ$ angle sum, then apply SAS" },
      { id: 'B', text: "Apply ASA directly with $\\widehat{N} = 50^\\circ$ and $\\widehat{P} = 70^\\circ$" },
      { id: 'C', text: "Apply SSS directly using the two tick-marked sides" },
      { id: 'D', text: "Use SAS directly with $\\widehat{A} = 60^\\circ$ and $\\widehat{P} = 70^\\circ$" }
    ],
    correct_option_id: 'A',
    explanation: "In $\\triangle MNP$, $\\widehat{M} = 180^\\circ - (50^\\circ + 70^\\circ) = 60^\\circ = \\widehat{A}$. With $AB = MN$ (2 ticks), $\\widehat{A} = \\widehat{M} = 60^\\circ$, and $AC = MP$ (1 tick), we get $\\triangle ABC = \\triangle MNP$ (SAS)."
  },
  {
    order_index: 12,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 3: Earth Mission Control • Angle Sum & Corresponding Parts",
    content_markdown: "In $\\triangle ABC$ and $\\triangle DEF$, we know $BC = EF = 9\\text{ cm}$, $\\widehat{B} = \\widehat{E} = 68^\\circ$, $\\widehat{C} = \\widehat{F} = 47^\\circ$, and $AC = 11\\text{ cm}$. What is the length of side $DF$ in centimeters (enter the number only)?",
    expected_value: "11",
    acceptable_answers: ["11", "11 cm", "11cm"],
    explanation: "Since $\\widehat{B} = \\widehat{E}$, $BC = EF$, and $\\widehat{C} = \\widehat{F}$, we have $\\triangle ABC = \\triangle DEF$ by ASA. Corresponding sides give $DF = AC = 11\\text{ cm}$."
  },

  // ==========================================
  // SECTOR 4: MARS OUTPOST (Q13 - Q16)
  // ==========================================
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "In structural truss $ACBD$ below, $AC = BD$ and $AD = BC$.\n\n![Figure: Shared Base AB SSS](/images/geometry/math7_l13_bowtie_shared_base.svg)\n\nWhich congruence case proves $\\triangle ACB = \\triangle BDA$?",
    options: [
      { id: 'A', text: "ASA using shared side $AB$" },
      { id: 'B', text: "SSS using common side $AB$" },
      { id: 'C', text: "SAS using vertical angles at $O$" },
      { id: 'D', text: "SAS using common side $CD$" }
    ],
    correct_option_id: 'B',
    explanation: "Comparing $\\triangle ACB$ and $\\triangle BDA$: $AC = BD$, $BC = AD$, and $AB$ is a common side. All three pairs of sides match, giving $\\triangle ACB = \\triangle BDA$ by SSS."
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "In Mars lander shield $ABCD$, $AB = AD$ and $\\widehat{BAC} = \\widehat{DAC}$.\n\n![Figure: Kite Common Side SAS](/images/geometry/math7_l14_kite_sas.svg)\n\nWhich criterion proves $\\triangle ABC = \\triangle ADC$?",
    options: [
      { id: 'A', text: "SSS because $BC = DC$ is given" },
      { id: 'B', text: "ASA because $\\widehat{B} = \\widehat{D}$ is given" },
      { id: 'C', text: "SAS because $AC$ is a common side" },
      { id: 'D', text: "AAA because the two halves mirror" }
    ],
    correct_option_id: 'C',
    explanation: "In $\\triangle ABC$ and $\\triangle ADC$: $AB = AD$ (given), $\\widehat{BAC} = \\widehat{DAC}$ (included angle), and $AC$ is a common side $\\implies \\triangle ABC = \\triangle ADC$ (SAS)."
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "In satellite wing $ABCD$, diagonal $BD$ satisfies $\\widehat{ABD} = \\widehat{CBD}$ and $\\widehat{ADB} = \\widehat{CDB}$.\n\n![Figure: Shared Diagonal BD ASA](/images/geometry/math7_l14_kite_asa.svg)\n\nWhich congruence rule proves $\\triangle ABD = \\triangle CBD$?",
    options: [
      { id: 'A', text: "SSS using $AB = CB$ and $AD = CD$" },
      { id: 'B', text: "SAS using $BD$ common and $AB = CB$" },
      { id: 'C', text: "Vertical angles theorem at $B$ and $D$" },
      { id: 'D', text: "ASA using common diagonal $BD$" }
    ],
    correct_option_id: 'D',
    explanation: "Diagonal $BD$ is a common side, and both pairs of equal angles ($\\widehat{ABD} = \\widehat{CBD}$ and $\\widehat{ADB} = \\widehat{CDB}$) are adjacent to $BD$. Therefore $\\triangle ABD = \\triangle CBD$ by ASA."
  },
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Diagonals",
    content_markdown: "In the rover suspension truss below, $AC = BD$ and $\\widehat{CAB} = \\widehat{DBA}$.\n\n![Figure: Shared Base AB SAS](/images/geometry/math7_l14_overlapping_ab_sas.svg)\n\nWhich proof chain establishes $AD = BC$?",
    options: [
      { id: 'A', text: "$\\triangle CAB = \\triangle DBA$ (SAS), so $AD = BC$" },
      { id: 'B', text: "$\\triangle CAB = \\triangle ABD$ (SSS), so $AD = BC$" },
      { id: 'C', text: "$\\triangle ABC = \\triangle ABD$ (ASA), so $AD = BC$" },
      { id: 'D', text: "$\\triangle CAB = \\triangle DAB$ (ASA), so $AD = BC$" }
    ],
    correct_option_id: 'A',
    explanation: "In $\\triangle CAB$ and $\\triangle DBA$: $AC = BD$ (given), $\\widehat{CAB} = \\widehat{DBA}$ (given), and $AB = BA$ (common side). By SAS, $\\triangle CAB = \\triangle DBA$, giving $BC = AD$."
  },

  // ==========================================
  // SECTOR 5: JUPITER STATION (Q17 - Q20)
  // ==========================================
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Vertical Angles & Compass Bisectors",
    content_markdown: "To bisect $\\widehat{xOy}$ with a compass: draw an arc centered at $O$ cutting $Ox, Oy$ at $A, B$; then draw equal-radius arcs from $A$ and $B$ ($AM = BM$) meeting at $M$.\n\n![Figure: Compass Angle Bisector](/images/geometry/math7_l13_compass_bisector.svg)\n\nWhich congruence proves that ray $OM$ bisects $\\widehat{xOy}$?",
    options: [
      { id: 'A', text: "$\\triangle OAB = \\triangle MAB$ (ASA)" },
      { id: 'B', text: "$\\triangle OAM = \\triangle OBM$ (SSS)" },
      { id: 'C', text: "$\\triangle OAM = \\triangle ABM$ (SAS)" },
      { id: 'D', text: "$\\triangle OBM = \\triangle BAM$ (SSS)" }
    ],
    correct_option_id: 'B',
    explanation: "In $\\triangle OAM$ and $\\triangle OBM$: $OA = OB$ (equal radii from $O$), $AM = BM$ (equal radii from $A$ and $B$), and $OM$ is common $\\implies \\triangle OAM = \\triangle OBM$ (SSS), so $\\widehat{AOM} = \\widehat{BOM}$."
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Vertical Angles & Compass Bisectors",
    content_markdown: "Two laser beams intersect at node $C$ with $AC = DC$ and $\\widehat{BAC} = \\widehat{EDC}$.\n\n![Figure: Vertical Angles Bridge ASA](/images/geometry/math7_l14_bowtie_asa.svg)\n\nWhich hidden equality completes the proof of $\\triangle ABC = \\triangle DEC$ by **ASA**?",
    options: [
      { id: 'A', text: "$BC = EC$ (because $C$ is the exact midpoint of $BE$)" },
      { id: 'B', text: "$AB = DE$ (since both opposite beams are parallel)" },
      { id: 'C', text: "$\\widehat{BCA} = \\widehat{ECD}$ (vertical opposite angles)" },
      { id: 'D', text: "$\\widehat{B} = \\widehat{E}$ (assumed by alternate interior angles)" }
    ],
    correct_option_id: 'C',
    explanation: "At intersection $C$, $\\widehat{BCA} = \\widehat{ECD}$ (vertical opposite angles). Combined with $AC = DC$ and $\\widehat{BAC} = \\widehat{EDC}$, we prove $\\triangle ABC = \\triangle DEC$ by ASA."
  },
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Vertical Angles & Compass Bisectors",
    content_markdown: "In the overlapping sensor diagram below, $AE = BE$ and $\\widehat{DAE} = \\widehat{CBE}$.\n\n![Figure: Overlapping Sensors ASA](/images/geometry/math7_l14_overlapping_asa.svg)\n\nWhich congruence rule proves $\\triangle ADE = \\triangle BCE$?",
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
    sectionName: "Sector 5: Jupiter Station • Vertical Angles & Compass Bisectors",
    content_markdown: "In the bowtie radar diagram ($\\triangle ABC$ and $\\triangle DEC$ meeting at $C$) with $AC = DC$ and $\\widehat{BAC} = \\widehat{EDC}$: if $\\widehat{BAC} = 34^\\circ$ and $\\widehat{BCA} = 88^\\circ$, calculate the degree measure of angle $\\widehat{DEC}$ (enter the number only).",
    expected_value: "58",
    acceptable_answers: ["58", "58°", "58 deg"],
    explanation: "First, $\\triangle ABC = \\triangle DEC$ by ASA. In $\\triangle ABC$, $\\widehat{ABC} = 180^\\circ - (34^\\circ + 88^\\circ) = 58^\\circ$. Hence corresponding angle $\\widehat{DEC} = \\widehat{ABC} = 58^\\circ$."
  },

  // ==========================================
  // SECTOR 6: SATURN RINGS (Q21 - Q24)
  // ==========================================
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 6: Saturn Rings • Parallel Lines, Squares & Segment Addition",
    content_markdown: "Square $ABCD$ on the grid has diagonals $AC$ and $BD$ intersecting at center $E$.\n\n![Figure: Square Diagonals Congruence](/images/geometry/math7_l13_grid_square_diagonals.svg)\n\nWhich statement about the four triangles meeting at $E$ is **TRUE**?",
    options: [
      { id: 'A', text: "All four triangles at $E$ are congruent" },
      { id: 'B', text: "Only opposite triangles $\\triangle EAB$ and $\\triangle ECD$ are congruent pairs" },
      { id: 'C', text: "Only adjacent triangles sharing segment $EA$ are congruent pairs" },
      { id: 'D', text: "None are congruent because their orientations rotate around $E$" }
    ],
    correct_option_id: 'A',
    explanation: "In square $ABCD$, all four sides are equal ($AB = BC = CD = DA$) and the half-diagonals are equal ($EA = EB = EC = ED$). By SSS (or SAS with $90^\\circ$ at $E$), all four triangles are congruent."
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 6: Saturn Rings • Parallel Lines, Squares & Segment Addition",
    content_markdown: "Points $A, B, C, D$ lie on a straight line in that order with $OA = OD$, $AB = CD$, and $\\widehat{OAB} = \\widehat{ODC}$.\n\n![Figure: Segment Addition SAS](/images/geometry/math7_l14_collinear_vandung.svg)\n\nHow do we prove $\\triangle OAC = \\triangle ODB$?",
    options: [
      { id: 'A', text: "Use $OC = OB$ directly as given data and apply SSS" },
      { id: 'B', text: "Add $BC$ to get $AC = DB$, then apply SAS" },
      { id: 'C', text: "Apply ASA using $\\widehat{AOC} = \\widehat{DOB}$ at peak $O$" },
      { id: 'D', text: "Use vertical opposite angles at $B$ and $C$" }
    ],
    correct_option_id: 'B',
    explanation: "Adding the shared segment $BC$ to $AB = CD$ gives $AC = AB + BC = CD + BC = DB$. Now $OA = OD$, $\\widehat{OAC} = \\widehat{ODB}$, and $AC = DB$ prove $\\triangle OAC = \\triangle ODB$ by SAS."
  },
  {
    order_index: 23,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 6: Saturn Rings • Parallel Lines, Squares & Segment Addition",
    content_markdown: "In the parallel truss below, $AB \\parallel CD$ and $AB = CD$. Segments $AD$ and $BC$ intersect at $E$.\n\n![Figure: Parallel Truss AB || CD](/images/geometry/math7_l14_parallel_bowtie_gh.svg)\n\nWhich congruence proves $\\triangle ABE = \\triangle DCE$?",
    options: [
      { id: 'A', text: "SSS using $AE = DE$ and $BE = CE$" },
      { id: 'B', text: "SAS using $AB = CD$ and $AE = DE$" },
      { id: 'C', text: "ASA using alternate interior angles" },
      { id: 'D', text: "SAS using vertical angles at $E$" }
    ],
    correct_option_id: 'C',
    explanation: "Because $AB \\parallel CD$, alternate interior angles are equal: $\\widehat{EAB} = \\widehat{EDC}$ and $\\widehat{EBA} = \\widehat{ECD}$. Together with $AB = CD$, we prove $\\triangle ABE = \\triangle DCE$ by ASA."
  },
  {
    order_index: 24,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 6: Saturn Rings • Parallel Lines, Squares & Segment Addition",
    content_markdown: "In satellite panel $ABCD$, $AB = CB$, $AD = CD$, $\\widehat{DAB} = 90^\\circ$, and $\\widehat{BDC} = 35^\\circ$.\n\n![Figure: Kite Angle Transfer](/images/geometry/math7_l13_kite_angles_46.svg)\n\nCalculate the degree measure of angle $\\widehat{ABC}$ (enter the number only).",
    expected_value: "110",
    acceptable_answers: ["110", "110°", "110 deg"],
    explanation: "By SSS ($AB=CB, AD=CD, BD$ common), $\\triangle ABD = \\triangle CBD$. Thus $\\widehat{ADB} = \\widehat{CDB} = 35^\\circ$. In right triangle $\\triangle ABD$, $\\widehat{ABD} = 90^\\circ - 35^\\circ = 55^\\circ$, so $\\widehat{ABC} = 55^\\circ + 55^\\circ = 110^\\circ$."
  },

  // ==========================================
  // SECTOR 7: URANUS DEEP SPACE (Q25 - Q27)
  // ==========================================
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Stage Proof Chains",
    content_markdown: "Point $M$ lies on segment $AB$, with $\\widehat{BAC} = \\widehat{BAD}$ and $\\widehat{ABC} = \\widehat{ABD}$.\n\n![Figure: Two-Stage ASA then SAS](/images/geometry/math7_l14_luyentapchung_m.svg)\n\nWhich two-step proof chain establishes $\\triangle AMC = \\triangle AMD$?",
    options: [
      { id: 'A', text: "Step 1: $\\triangle ABC = \\triangle ABD$ (SSS) gives $CM = DM$; Step 2: $\\triangle AMC = \\triangle AMD$ (ASA)" },
      { id: 'B', text: "Step 1: $\\triangle BMC = \\triangle BMD$ (SAS) gives $AC = AD$; Step 2: $\\triangle AMC = \\triangle AMD$ (ASA)" },
      { id: 'C', text: "Step 1: $\\triangle AMC = \\triangle AMD$ (ASA) directly from common side $AM$ and $\\widehat{A}$" },
      { id: 'D', text: "Step 1: $\\triangle ABC = \\triangle ABD$ (ASA) gives $AC = AD$; Step 2: $\\triangle AMC = \\triangle AMD$ (SAS)" }
    ],
    correct_option_id: 'D',
    explanation: "Step 1: $\\triangle ABC = \\triangle ABD$ (ASA) yields $AC = AD$. Step 2: Comparing $\\triangle AMC$ and $\\triangle AMD$ with $AM$ common, $\\widehat{MAC} = \\widehat{MAD}$, and $AC = AD$ gives $\\triangle AMC = \\triangle AMD$ (SAS)."
  },
  {
    order_index: 26,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Stage Proof Chains",
    content_markdown: "In $\\triangle ABC$ and $\\triangle DEF$, $M$ and $N$ are the midpoints of $BC$ and $EF$. Given $AB = DE$, $BC = EF$, and medians $AM = DN$.\n\n![Figure: Median Bridge SSS then SAS](/images/geometry/math7_l14_medians_sas.svg)\n\nHow do we prove $\\triangle ABC = \\triangle DEF$?",
    options: [
      { id: 'A', text: "Prove $\\triangle ABM = \\triangle DEN$ (SSS) to get $\\widehat{B} = \\widehat{E}$, then apply SAS" },
      { id: 'B', text: "Prove $\\triangle ABM = \\triangle DEN$ by SAS first, then deduce $\\triangle ABC = \\triangle DEF$ by SSS" },
      { id: 'C', text: "Prove $\\triangle ABM = \\triangle DEN$ by ASA first, then deduce $\\triangle ABC = \\triangle DEF$ by SAS" },
      { id: 'D', text: "Apply SAS directly to $\\triangle ABC$ and $\\triangle DEF$ without using midpoints $M, N$" }
    ],
    correct_option_id: 'A',
    explanation: "Since $M, N$ are midpoints of $BC = EF$, we have $BM = EN$. With $AB = DE$ and $AM = DN$, $\\triangle ABM = \\triangle DEN$ (SSS) gives $\\widehat{B} = \\widehat{E}$. Then $AB = DE$, $\\widehat{B} = \\widehat{E}$, and $BC = EF$ give $\\triangle ABC = \\triangle DEF$ (SAS)."
  },
  {
    order_index: 27,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Stage Proof Chains",
    content_markdown: "In the cross-brace frame below, $AD = BC$, $AC = BD$, and $\\widehat{ABD} = 32^\\circ$.\n\n![Figure: Crossed Diagonals Geometry](/images/geometry/math7_l13_crossed_diagonals_sbt418.svg)\n\nCompute the degree measure of angle $\\widehat{DEC}$ (enter the number only).",
    expected_value: "116",
    acceptable_answers: ["116", "116°", "116 deg"],
    explanation: "By SSS ($AD=BC, BD=AC, AB$ common), $\\triangle ABD = \\triangle BAC$, so $\\widehat{BAC} = \\widehat{ABD} = 32^\\circ$. In $\\triangle EAB$, $\\widehat{AEB} = 180^\\circ - (32^\\circ + 32^\\circ) = 116^\\circ$. By vertical opposite angles, $\\widehat{DEC} = \\widehat{AEB} = 116^\\circ$."
  },

  // ==========================================
  // SECTOR 8: NEPTUNE FRONTIER (Q28 - Q30)
  // ==========================================
  {
    order_index: 28,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 8: Neptune Frontier • Indirect Measurement & Formal Proofs",
    content_markdown: "To measure the width $AB$ of a deep crater, surveyors stake out $B, C, D$ collinearly with $BC = DC = 150\\text{ m}$, sight $A, C, E$ in a straight line, and set $\\widehat{ABC} = \\widehat{EDC} = 90^\\circ$.\n\n![Figure: Crater Triangulation via ASA](/images/geometry/math7_l14_crater_triangulation.svg)\n\nIf safe ground measurement gives $DE = 96\\text{ m}$, what is the crater width $AB$ in meters (enter the number only)?",
    expected_value: "96",
    acceptable_answers: ["96", "96 m", "96m"],
    explanation: "In $\\triangle ABC$ and $\\triangle EDC$: $\\widehat{ABC} = \\widehat{EDC} = 90^\\circ$, $BC = DC = 150\\text{ m}$, and $\\widehat{ACB} = \\widehat{ECD}$ (vertical opposite angles). By ASA, $\\triangle ABC = \\triangle EDC$, so $AB = DE = 96\\text{ m}$."
  },
  {
    order_index: 29,
    type: 'ESSAY_UPLOAD',
    points: 0.60,
    sectionName: "Sector 8: Neptune Frontier • Indirect Measurement & Formal Proofs",
    content_markdown: "Points $B, D, E, C$ lie on a straight line in that order, with $AB = AC$, $AD = AE$, and $BD = CE$.\n\n![Figure: Segment Addition SSS Proof](/images/geometry/math7_l13_isosceles_collinear_sbt419.svg)\n\nWrite a complete step-by-step formal proof showing $\\triangle ABE = \\triangle ACD$ and concluding that $\\widehat{AEB} = \\widehat{ADC}$. *(Type your proof or upload a clear photo of your handwritten notebook solution.)*",
    rubric: "1) Show BE = BD + DE = CE + DE = CD (0.15 pts). 2) Compare triangle ABE and triangle ACD with AB = AC, AE = AD, BE = CD (0.25 pts). 3) Conclude triangle ABE = triangle ACD by SSS and deduce angle AEB = angle ADC (0.20 pts).",
    explanation: "Step 1: Since $D$ lies between $B$ and $E$, $BE = BD + DE$. Since $E$ lies between $D$ and $C$, $CD = CE + DE$. Given $BD = CE$, we get $BE = CD$.\nStep 2: Consider $\\triangle ABE$ and $\\triangle ACD$: $AB = AC$ (given), $AE = AD$ (given), and $BE = CD$ (proved above).\nStep 3: Therefore $\\triangle ABE = \\triangle ACD$ (SSS). As corresponding angles, $\\widehat{AEB} = \\widehat{ADC}$. $\\blacksquare$"
  },
  {
    order_index: 30,
    type: 'ESSAY_UPLOAD',
    points: 0.65,
    sectionName: "Sector 8: Neptune Frontier • Indirect Measurement & Formal Proofs",
    content_markdown: "In the parallel solar truss below, $AB \\parallel CD$ and $AB = CD$. Segments $AD$ and $BC$ intersect at $E$. Points $G \\in AB$ and $H \\in CD$ are positioned so that $G, E, H$ are collinear.\n\n![Figure: Parallel Truss AB || CD](/images/geometry/math7_l14_parallel_bowtie_gh.svg)\n\nWrite a complete formal proof for:\n(a) $\\triangle ABE = \\triangle DCE$;\n(b) $EG = EH$.\n\n*(Type your proof or upload a clear photo of your handwritten notebook solution.)*",
    rubric: "1) Part (a): State alternate interior angles angle EAB = angle EDC and angle EBA = angle ECD from AB || CD (0.15 pts), combine with AB = CD to prove triangle ABE = triangle DCE by ASA (0.20 pts). 2) Part (b): Deduce EA = ED (0.10 pts), then prove triangle AGE = triangle DHE by ASA using alternate interior angles and vertical angles to conclude EG = EH (0.20 pts).",
    explanation: "(a) Since $AB \\parallel CD$, alternate interior angles are equal: $\\widehat{EAB} = \\widehat{EDC}$ and $\\widehat{EBA} = \\widehat{ECD}$. Comparing $\\triangle ABE$ and $\\triangle DCE$: $\\widehat{EAB} = \\widehat{EDC}$, $AB = DC$ (given), and $\\widehat{EBA} = \\widehat{ECD}$. Therefore $\\triangle ABE = \\triangle DCE$ (ASA).\n(b) From $\\triangle ABE = \\triangle DCE$, $EA = ED$. Now compare $\\triangle AGE$ and $\\triangle DHE$: $\\widehat{GAE} = \\widehat{HDE}$ (alternate interior angles), $EA = ED$, and $\\widehat{AEG} = \\widehat{DEH}$ (vertical opposite angles). Thus $\\triangle AGE = \\triangle DHE$ (ASA), giving $EG = EH$. $\\blacksquare$"
  }
];

async function main() {
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  console.log(`🚀 [Keithley Math Seed] Launching Synthesis Mission (30 Problems)`);
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

  // 2. Create Learning Unit (Synthesis Briefing + Web Studio attachment)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: "Review: Three Congruence Cases of Triangles (SSS, SAS & ASA)",
      description: "Master synthesis combining Lesson 13 & Lesson 14: Side-Side-Side (SSS), Side-Angle-Side (SAS), Angle-Side-Angle (ASA), vertex correspondence, trap detection, and formal proofs.",
      lecture_content_markdown: LECTURE_MARKDOWN,
      lecture_attachments: [
        {
          type: "WEB_STUDIO",
          title: "Synthesis Interactive Studio: SSS, SAS & ASA",
          url: "/lectures/math7-three-congruence-cases/index.html"
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
      teacher_daily_note: "Cadet Keithley, today we unify all three triangle congruence criteria—SSS, SAS, and ASA—in one cumulative 30-problem orbital mission. Review the Master Matrix in the Interactive Studio before launching!",
      is_published: true
    }
  });
  console.log(`✅ Created Daily Mission Assignment: ${assignment.id}`);

  // 4. Create Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: "Master Mission: Three Triangle Congruence Cases (30 Problems)",
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

  console.log('\n🎉 ALL SYSTEMS GO! Keithley Three Congruence Cases Mission (30 Problems) successfully seeded for 2026-11-27.');
}

main()
  .catch(err => {
    console.error('❌ Execution Error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

