#!/usr/bin/env node

/**
 * SEED SCRIPT: KEITHLEY LAKE (GRADE 7)
 * MISSION: Lesson 15 — Congruence Criteria for Right Triangles (LL, LA, HA, HL) (30 Problems)
 * DATE: 2026-11-28
 */

const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Flight Commander Thay Thuc
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Astronaut Cadet Keithley Lake
  SUBJECT_ID: 'e89cc834-99d0-40b7-ab5e-0a0838d273c4', // Grade 7 Math (MATH_7)
  ASSIGNED_DATE: '2026-11-28'
};

const LECTURE_MARKDOWN = `# 🚀 Mission Briefing: Congruence Criteria for Right Triangles (LL, LA, HA, HL)

Welcome aboard, Astronaut Cadet Keithley! Today's mission targets **Lesson 15: Congruence Criteria for Right Triangles**. In right triangles, having a fixed $90^\\circ$ angle allows simpler, faster congruence criteria with only **two** additional conditions instead of three.

---

### 1. The Four Right Triangle Congruence Criteria
| Criterion | Abbreviation | Conditions Required | Derived From General Case |
| :--- | :--- | :--- | :--- |
| **1. Leg–Leg** | **LL** | Two pairs of legs are equal ($AB = A'B', AC = A'C'$) | Derived from **SAS** (included angle is $90^\\circ$) |
| **2. Leg–Acute Angle** | **LA** | One pair of legs + adjacent acute angle equal | Derived from **ASA** (or AAS via complementary angles) |
| **3. Hypotenuse–Acute Angle** | **HA** | Hypotenuse + one acute angle equal | Derived from **AAS** (acute angles sum to $90^\\circ$) |
| **4. Hypotenuse–Leg** | **HL** | Hypotenuse + one pair of legs equal | Special right-triangle case (Pythagorean property) |

---

### 2. Critical Flight Warnings & Traps
- **The Angle-Angle (AA) Trap:** Equal acute angles (e.g. $30^\\circ - 60^\\circ - 90^\\circ$) prove **similarity**, NOT congruence! You must have at least one side length.
- **The SSA Illusion in Right Triangles:** While general SSA is invalid, in right triangles having the hypotenuse and a leg locks the third side completely (**HL is always valid**).
- **Core Clues in Geometric Figures:**
  1. **Common hypotenuse:** Shared diagonal in kites, rectangles, or circles.
  2. **Angle bisector property:** Points on an angle bisector are equidistant from the arms ($MA = MB$ via **HA**).
  3. **Circle chords:** Perpendicular from the center to a chord bisects the chord via **HL** ($OA = OB = R$).

---

### 3. Interactive Flight Studio
- **Web Studio:** [Launch Lesson 15 Interactive Studio](/lectures/math7-lesson15-right-triangles/index.html)
`;

const QUESTIONS = [
  // ==========================================
  // SECTOR 1: MERCURY ORBIT (Q1 - Q4)
  // ==========================================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Right Triangle Fundamentals",
    content_markdown: "Review the Master Matrix below displaying the four criteria for the congruence of two right triangles.\n\n![Figure: Four Right Triangle Congruence Criteria](/images/geometry/math7_l15_four_cases_matrix.svg)\n\nWhich four criteria establish that two right triangles are congruent?",
    options: [
      { id: 'A', text: "LL, LA, HA, and AA" },
      { id: 'B', text: "LL, LA, HA, and HL" },
      { id: 'C', text: "LL, HL, AA, and SSA" },
      { id: 'D', text: "LA, HA, AA, and SSA" }
    ],
    correct_option_id: 'B',
    explanation: "The four valid criteria for right triangle congruence are Leg-Leg (LL), Leg-Acute Angle (LA), Hypotenuse-Acute Angle (HA), and Hypotenuse-Leg (HL). Angle-Angle (AA) does not guarantee congruence."
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Right Triangle Fundamentals",
    content_markdown: "Two vertical solar sensor towers $AB$ and $A'B'$ stand perpendicular to flat ground ($AC$ and $A'C'$), with $AB = A'B'$. At the same solar hour, incoming sun rays strike the tops with equal acute angles $\\widehat{B} = \\widehat{B'}$.\n\n![Figure: Vertical Solar Poles and Shadows](/images/geometry/math7_l15_poles_shadows.svg)\n\nWhich criterion guarantees that $\\triangle ABC = \\triangle A'B'C'$, ensuring equal ground shadow lengths $AC = A'C'$?",
    options: [
      { id: 'A', text: "Leg–Acute Angle (LA): leg $AB = A'B'$ and adjacent acute angle $\\widehat{B} = \\widehat{B'}$" },
      { id: 'B', text: "Leg–Leg (LL): ground shadow lines $AC = A'C'$ and vertical legs $AB = A'B'$ are assumed equal" },
      { id: 'C', text: "Hypotenuse–Leg (HL): hypotenuse ray paths $BC$ and $B'C'$ are measured before shadows" },
      { id: 'D', text: "Hypotenuse–Angle (HA): ray hypotenuse $BC = B'C'$ is known without shadow ground data" }
    ],
    correct_option_id: 'A',
    explanation: "Right triangles $\\triangle ABC$ and $\\triangle A'B'C'$ have $\\widehat{A}=\\widehat{A'}=90^\\circ$, vertical legs $AB = A'B'$, and adjacent acute angles $\\widehat{B} = \\widehat{B'}$. By the Leg–Acute Angle (LA) criterion, $\\triangle ABC = \\triangle A'B'C'$, so shadows $AC = A'C'$."
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Right Triangle Fundamentals",
    content_markdown: "Two spaceport launch ramps have identical incline lengths $BC = B'C'$ and equal launch elevation angles $\\widehat{B} = \\widehat{B'}$ above level ground.\n\n![Figure: Launch Ramps with Hypotenuse and Angle](/images/geometry/math7_l15_ramps_ha.svg)\n\nWhich congruence criterion directly proves $\\triangle ABC = \\triangle A'B'C'$, confirming both ramps reach identical apex height $AC = A'C'$?",
    options: [
      { id: 'A', text: "Angle–Angle (AA) similarity condition" },
      { id: 'B', text: "Side–Side–Side (SSS) criteria balance" },
      { id: 'C', text: "Leg–Leg (LL) right-triangle condition" },
      { id: 'D', text: "Hypotenuse–Acute Angle (HA) criterion" }
    ],
    correct_option_id: 'D',
    explanation: "Both right triangles share right angles $\\widehat{A} = \\widehat{A'} = 90^\\circ$, equal hypotenuses $BC = B'C'$, and equal acute angles $\\widehat{B} = \\widehat{B'}$. By the Hypotenuse–Acute Angle (HA) criterion, $\\triangle ABC = \\triangle A'B'C'$, which gives $AC = A'C'$."
  },
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 1: Mercury Orbit • Right Triangle Fundamentals",
    content_markdown: "A surveyor uses a straightedge and compass to construct a right triangle with right angle $\\widehat{A}=90^\\circ$, leg $AB = 3\\text{ cm}$, and hypotenuse $BC = 5\\text{ cm}$.\n\n![Figure: Compass Construction of Right Triangle](/images/geometry/math7_l15_compass_hl.svg)\n\nWhy is every triangle constructed with these two exact measurements guaranteed to be congruent to $\\triangle ABC$?",
    options: [
      { id: 'A', text: "Because any triangle with one $3\\text{ cm}$ side is uniquely determined" },
      { id: 'B', text: "Because two right triangles with an acute angle are always congruent" },
      { id: 'C', text: "Because the Hypotenuse–Leg (HL) criterion fixes the third side length" },
      { id: 'D', text: "Because any three straight segments always form an identical triangle" }
    ],
    correct_option_id: 'C',
    explanation: "In any right triangle with a given leg and hypotenuse, the third side is uniquely determined by the Pythagorean relationship. The Hypotenuse–Leg (HL) criterion guarantees that any two right triangles with equal hypotenuses and one pair of equal legs are congruent."
  },

  // ==========================================
  // SECTOR 2: VENUS BASE (Q5 - Q8)
  // ==========================================
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • Pair Scanner & Trap Detection",
    content_markdown: "Inspect the four triangles below with marked dimensions from the planetary scanner.\n\n![Figure: Four Triangles SBT 4.31](/images/geometry/math7_l15_four_triangles_sbt1.svg)\n\nWhich pair of right triangles is congruent by the **Leg–Leg (LL)** criterion?",
    options: [
      { id: 'A', text: "$\\triangle ABC = \\triangle DEF$ because hypotenuses are identical" },
      { id: 'B', text: "$\\triangle ABC = \\triangle MNP$ because both pairs of legs are equal" },
      { id: 'C', text: "$\\triangle DEF = \\triangle GHK$ because acute angles are supplementary" },
      { id: 'D', text: "$\\triangle MNP = \\triangle GHK$ because their orientations are matched" }
    ],
    correct_option_id: 'B',
    explanation: "$\\triangle ABC$ has legs $AB = 3\\text{ cm}, AC = 4\\text{ cm}$ with $\\widehat{A} = 90^\\circ$. $\\triangle MNP$ has legs $MN = 3\\text{ cm}, MP = 4\\text{ cm}$ with $\\widehat{M} = 90^\\circ$. By the Leg–Leg (LL) criterion, $\\triangle ABC = \\triangle MNP$."
  },
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • Pair Scanner & Trap Detection",
    content_markdown: "In the six-triangle radar scan below, $\\triangle DEF$ has $\\widehat{D}=90^\\circ$, hypotenuse $EF = 5\\text{ km}$, and $\\widehat{E} = 30^\\circ$.\n\n![Figure: Six Right Triangles Scan](/images/geometry/math7_l15_six_triangles_h448.svg)\n\nWhich triangle is congruent to $\\triangle DEF$, and by which criterion?",
    options: [
      { id: 'A', text: "$\\triangle GKH$ by Hypotenuse–Acute Angle (HA)" },
      { id: 'B', text: "$\\triangle ABC$ by Hypotenuse–Leg criterion (HL)" },
      { id: 'C', text: "$\\triangle PMN$ by Leg–Adjacent Angle case (LA)" },
      { id: 'D', text: "$\\triangle SRT$ by Leg–Leg right triangle (LL)" }
    ],
    correct_option_id: 'A',
    explanation: "In $\\triangle DEF$, $\\widehat{F} = 90^\\circ - 30^\\circ = 60^\\circ$ and hypotenuse $EF = 5$. In $\\triangle GKH$, $\\widehat{G} = 90^\\circ$, hypotenuse $HK = 5$, and $\\widehat{K} = 60^\\circ$. Since both have hypotenuse 5 and matching acute angle $60^\\circ$, $\\triangle DEF = \\triangle GKH$ by HA."
  },
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • Pair Scanner & Trap Detection",
    content_markdown: "Examine the same six-triangle radar scan above.\n\n![Figure: Six Right Triangles Scan](/images/geometry/math7_l15_six_triangles_h448.svg)\n\nWhich two right triangles are congruent by the **Leg–Leg (LL)** criterion?",
    options: [
      { id: 'A', text: "$\\triangle ABC$ and $\\triangle DEF$ with equal hypotenuses" },
      { id: 'B', text: "$\\triangle GKH$ and $\\triangle PMN$ with equal acute angles" },
      { id: 'C', text: "$\\triangle ABC$ and $\\triangle SRT$ with equal perimeters" },
      { id: 'D', text: "$\\triangle PMN$ and $\\triangle SRT$ with legs $3$ and $4$" }
    ],
    correct_option_id: 'D',
    explanation: "$\\triangle PMN$ has legs $PM = 3$ and $MN = 4$ around right angle $\\widehat{M} = 90^\\circ$. $\\triangle SRT$ has legs $SR = 3$ and $ST = 4$ around right angle $\\widehat{S} = 90^\\circ$. Thus $\\triangle PMN = \\triangle SRT$ by LL."
  },
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 2: Venus Base • Pair Scanner & Trap Detection",
    content_markdown: "Four right triangles are scanned below for Hypotenuse–Leg (HL) congruence. One candidate has leg 5 and hypotenuse 13; another has leg 12 and hypotenuse 13; another has both legs 5 and 12.\n\n![Figure: Four Right Triangles HL Scanner](/images/geometry/math7_l15_hl_four_triangles.svg)\n\nWhich pair is guaranteed congruent by the **Hypotenuse–Leg (HL)** criterion without computing remaining sides?",
    options: [
      { id: 'A', text: "$\\triangle ABC$ (hypotenuse 13, leg 5) and $\\triangle DEF$ (legs 5 and 12)" },
      { id: 'B', text: "$\\triangle DEF$ (legs 5 and 12) and $\\triangle MNP$ (hypotenuse 12, leg 5)" },
      { id: 'C', text: "$\\triangle ABC$ (hypotenuse 13, leg 5) and $\\triangle KGH$ (hypotenuse 13, leg 5)" },
      { id: 'D', text: "$\\triangle MNP$ (hypotenuse 12, leg 5) and $\\triangle KGH$ (hypotenuse 13, leg 5)" }
    ],
    correct_option_id: 'C',
    explanation: "Both $\\triangle ABC$ and $\\triangle KGH$ are right triangles with hypotenuse $13$ and one leg equal to $5$. By the Hypotenuse–Leg (HL) criterion, $\\triangle ABC = \\triangle KGH$."
  },

  // ==========================================
  // SECTOR 3: EARTH MISSION CONTROL (Q9 - Q12)
  // ==========================================
  {
    order_index: 9,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 3: Earth Mission Control • Angle Calculations & Corresponding Parts",
    content_markdown: "Two launch ramps $\\triangle ABC$ and $\\triangle A'B'C'$ are right-angled at $A$ and $A'$. They have equal ramp lengths $BC = B'C' = 15\\text{ m}$ and launch angle $\\widehat{ABC} = 37^\\circ$.\n\n![Figure: Launch Ramps with Incline Angle](/images/geometry/math7_l15_ramps_ha.svg)\n\nSince $\\triangle ABC = \\triangle A'B'C'$ by HA, what is the degree measure of angle $\\widehat{A'C'B'}$ (enter the number only)?",
    expected_value: "53",
    acceptable_answers: ["53", "53°", "53 deg"],
    explanation: "In right triangle $\\triangle ABC$, acute angles are complementary: $\\widehat{ACB} = 90^\\circ - \\widehat{ABC} = 90^\\circ - 37^\\circ = 53^\\circ$. Since $\\triangle ABC = \\triangle A'B'C'$, corresponding angle $\\widehat{A'C'B'} = \\widehat{ACB} = 53^\\circ$."
  },
  {
    order_index: 10,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 3: Earth Mission Control • Angle Calculations & Corresponding Parts",
    content_markdown: "Two equal maintenance ladders $AB = A'B' = 10\\text{ m}$ lean against two vertical hangar walls at identical reach heights $BH = B'H' = 8\\text{ m}$, forming right angles at ground points $H$ and $H'$.\n\n![Figure: Ladders Leaning Against Wall](/images/geometry/math7_l15_ladders_wall_hl.svg)\n\nIf the wall angle $\\widehat{ABH} = 37^\\circ$, calculate the ground inclination angle $\\widehat{B'A'H'}$ in degrees (enter the number only).",
    expected_value: "53",
    acceptable_answers: ["53", "53°", "53 deg"],
    explanation: "By HL, $\\triangle ABH = \\triangle A'B'H'$. In right triangle $\\triangle ABH$, $\\widehat{BAH} = 90^\\circ - \\widehat{ABH} = 90^\\circ - 37^\\circ = 53^\\circ$. By corresponding parts, $\\widehat{B'A'H'} = \\widehat{BAH} = 53^\\circ$."
  },
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 3: Earth Mission Control • Angle Calculations & Corresponding Parts",
    content_markdown: "In the overlapping antenna structure below, $\\triangle NMO$ has right angle $\\widehat{M}=90^\\circ$, $\\triangle PQO$ has right angle $\\widehat{Q}=90^\\circ$, and $MN = PQ$.\n\n![Figure: Overlapping Right Triangles SBT 4.31c](/images/geometry/math7_l15_sbt_431c_overlap.svg)\n\nWhich reasoning correctly proves that $\\triangle NMO = \\triangle PQO$?",
    options: [
      { id: 'A', text: "Shared vertex $O$ forces segments $MO = QO$ and $NO = PO$, proving congruence by the LL criterion" },
      { id: 'B', text: "Shared angle $\\widehat{O}$ implies $\\widehat{N} = \\widehat{P}$, proving congruence by the LA criterion" },
      { id: 'C', text: "Shared vertex $O$ forces hypotenuses $NO = PO$ and $MN = PQ$, proving congruence by the HL criterion" },
      { id: 'D', text: "Shared angle $\\widehat{O}$ forces segments $MN = MO$ and $PQ = QO$, proving congruence by the HA criterion" }
    ],
    correct_option_id: 'B',
    explanation: "Both right triangles share the acute angle $\\widehat{O}$. Since acute angles in a right triangle sum to $90^\\circ$, $\\widehat{N} = 90^\\circ - \\widehat{O} = \\widehat{P}$. With legs $MN = PQ$ opposite $\\widehat{O}$ (or adjacent to $\\widehat{N}$ and $\\widehat{P}$), $\\triangle NMO = \\triangle PQO$ by the Leg–Acute Angle (LA) criterion."
  },
  {
    order_index: 12,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 3: Earth Mission Control • Angle Calculations & Corresponding Parts",
    content_markdown: "A rectangular solar module $ABCD$ has right angles at all four vertices, with $AB = CD = 6\\text{ cm}$ and $BC = AD = 16\\text{ cm}$. Point $M$ is the midpoint of $BC$. A diagnostic wire measures $AM = 10\\text{ cm}$.\n\n![Figure: Rectangular Solar Panel SGK 4.22](/images/geometry/math7_l15_sgk_422_rect_mid.svg)\n\nWhat is the length of diagnostic wire $DM$ in cm (enter the number only)?",
    expected_value: "10",
    acceptable_answers: ["10", "10 cm", "10cm"],
    explanation: "Since $M$ is the midpoint of $BC$, $BM = MC = 8\\text{ cm}$. In right triangles $\\triangle ABM$ ($\\widehat{B}=90^\\circ$) and $\\triangle DCM$ ($\\widehat{C}=90^\\circ$): $AB = DC = 6\\text{ cm}$ and $BM = CM = 8\\text{ cm}$. By the Leg–Leg (LL) criterion, $\\triangle ABM = \\triangle DCM$. Therefore corresponding hypotenuses are equal: $DM = AM = 10\\text{ cm}$."
  },

  // ==========================================
  // SECTOR 4: MARS OUTPOST (Q13 - Q16)
  // ==========================================
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Hypotenuses",
    content_markdown: "In quadrilateral $ABCD$, opposite vertices have right angles $\\widehat{B} = \\widehat{D} = 90^\\circ$, and adjacent sides satisfy $AB = AD$.\n\n![Figure: Kite Quadrilateral Example 2](/images/geometry/math7_l15_kite_vidu2_hl.svg)\n\nWhich criterion proves $\\triangle ABC = \\triangle ADC$, establishing that diagonal $AC$ is the angle bisector of $\\widehat{BAD}$?",
    options: [
      { id: 'A', text: "Leg–Leg (LL) criterion using segment $BD$ as leg" },
      { id: 'B', text: "Leg–Acute Angle (LA) criterion using angle $BCA$" },
      { id: 'C', text: "Side–Angle–Side (SAS) criterion with angle $B$" },
      { id: 'D', text: "Hypotenuse–Leg (HL) using common hypotenuse $AC$" }
    ],
    correct_option_id: 'D',
    explanation: "$\\triangle ABC$ and $\\triangle ADC$ are right triangles ($\\widehat{B}=\\widehat{D}=90^\\circ$) sharing hypotenuse $AC$, with legs $AB = AD$. By Hypotenuse–Leg (HL), $\\triangle ABC = \\triangle ADC$. Hence $\\widehat{BAC} = \\widehat{DAC}$, so $AC$ bisects $\\widehat{BAD}$."
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Hypotenuses",
    content_markdown: "In the truss diagram below, segment $AC \\perp BD$ at point $C$, and ray $AC$ bisects $\\widehat{BAD}$ so that $\\widehat{BAC} = \\widehat{DAC}$.\n\n![Figure: SGK 4.20a Altitude with Bisector](/images/geometry/math7_l15_sgk_420a.svg)\n\nWhich criterion proves $\\triangle ABC = \\triangle ADC$?",
    options: [
      { id: 'A', text: "Leg–Acute Angle (LA): common leg $AC$ and acute angles $\\widehat{BAC} = \\widehat{DAC}$" },
      { id: 'B', text: "Hypotenuse–Leg (HL): hypotenuses $AB$ and $AD$ are given to be equal at the start" },
      { id: 'C', text: "Leg–Leg (LL): segments $BC$ and $DC$ are measured to be equal before the proof" },
      { id: 'D', text: "Hypotenuse–Angle (HA): common hypotenuse $AC$ and acute angles $\\widehat{B} = \\widehat{D}$" }
    ],
    correct_option_id: 'A',
    explanation: "Right triangles $\\triangle ABC$ and $\\triangle ADC$ have $\\widehat{ACB} = \\widehat{ACD} = 90^\\circ$. They share leg $AC$, and adjacent acute angles satisfy $\\widehat{BAC} = \\widehat{DAC}$. By the Leg–Acute Angle (LA) criterion, $\\triangle ABC = \\triangle ADC$."
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Hypotenuses",
    content_markdown: "A structural frame has right angles $\\widehat{HEG} = \\widehat{GFH} = 90^\\circ$ and equal vertical uprights $EH = FG$.\n\n![Figure: SGK 4.20b Crossed Frame Overlap](/images/geometry/math7_l15_sgk_420b.svg)\n\nWhich criterion proves that $\\triangle EHG = \\triangle FGH$?",
    options: [
      { id: 'A', text: "Angle–Side–Angle (ASA) using common segment $EF$" },
      { id: 'B', text: "Leg–Leg (LL) criterion using vertical beam $HG$" },
      { id: 'C', text: "Hypotenuse–Leg (HL) using common hypotenuse $HG$" },
      { id: 'D', text: "Side–Side–Side (SSS) using internal bracing $EG$" }
    ],
    correct_option_id: 'C',
    explanation: "Both $\\triangle EHG$ and $\\triangle FGH$ are right triangles ($\\widehat{HEG}=\\widehat{GFH}=90^\\circ$). They share hypotenuse $HG$, and have equal legs $EH = FG$. By Hypotenuse–Leg (HL), $\\triangle EHG = \\triangle FGH$."
  },
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 4: Mars Outpost • Common Sides & Shared Hypotenuses",
    content_markdown: "In the vertical support bracket below, $VS \\perp ST$ and $UT \\perp ST$ (so $\\widehat{VST} = \\widehat{UTS} = 90^\\circ$), with equal uprights $VS = UT$.\n\n![Figure: SGK 4.20d Vertical Truss Structure](/images/geometry/math7_l15_sgk_420d.svg)\n\nWhich criterion proves that $\\triangle VST = \\triangle UTS$?",
    options: [
      { id: 'A', text: "Hypotenuse–Acute Angle (HA) criterion" },
      { id: 'B', text: "Leg–Leg (LL) using shared base leg $ST$" },
      { id: 'C', text: "Hypotenuse–Leg (HL) with hypotenuse $ST$" },
      { id: 'D', text: "Angle–Angle (AA) similarity condition" }
    ],
    correct_option_id: 'B',
    explanation: "Right triangles $\\triangle VST$ and $\\triangle UTS$ have $\\widehat{VST}=\\widehat{UTS}=90^\\circ$. They have legs $VS = UT$ and share the perpendicular base leg $ST$. By the Leg–Leg (LL) criterion, $\\triangle VST = \\triangle UTS$."
  },

  // ==========================================
  // SECTOR 5: JUPITER STATION (Q17 - Q20)
  // ==========================================
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Vertical Angles, Bisectors & Shared Vertices",
    content_markdown: "Ray $Oz$ bisects $\\widehat{xOy}$. From any point $M \\in Oz$, perpendiculars are dropped to the arms: $MA \\perp Ox$ at $A$, and $MB \\perp Oy$ at $B$.\n\n![Figure: Angle Bisector Distance Property](/images/geometry/math7_l15_bisector_perp.svg)\n\nWhich criterion proves $\\triangle OMA = \\triangle OMB$, demonstrating that every point on an angle bisector is equidistant from the two sides ($MA = MB$)?",
    options: [
      { id: 'A', text: "Leg–Leg (LL) criterion using segments $OA = OB$ as given" },
      { id: 'B', text: "Leg–Acute Angle (LA) criterion using common segment $OM$" },
      { id: 'C', text: "Hypotenuse–Leg (HL) criterion using common segment $OM$" },
      { id: 'D', text: "Hypotenuse–Acute Angle (HA) using common hypotenuse $OM$" }
    ],
    correct_option_id: 'D',
    explanation: "Right triangles $\\triangle OMA$ and $\\triangle OMB$ ($\\widehat{OAM}=\\widehat{OBM}=90^\\circ$) share hypotenuse $OM$, and have equal acute angles $\\widehat{AOM} = \\widehat{BOM}$ because $Oz$ is the bisector. By Hypotenuse–Acute Angle (HA), $\\triangle OMA = \\triangle OMB$, which proves $MA = MB$."
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Vertical Angles, Bisectors & Shared Vertices",
    content_markdown: "In the geometry below, points $K, M, N$ lie on a line with $KM \\perp QM$ and $PM \\perp NM$ (so $\\widehat{QMK} = \\widehat{PMN} = 90^\\circ$). Given $KM = PM$ and $QK = PN$.\n\n![Figure: SGK 4.20c Collinear Right Vertices](/images/geometry/math7_l15_sgk_420c.svg)\n\nWhich congruence statement and criterion are correct?",
    options: [
      { id: 'A', text: "$\\triangle QMK = \\triangle NMP$ by Hypotenuse–Leg (HL)" },
      { id: 'B', text: "$\\triangle QMK = \\triangle PMN$ by Leg–Leg criterion (LL)" },
      { id: 'C', text: "$\\triangle QMK = \\triangle NPM$ by Leg–Acute Angle (LA)" },
      { id: 'D', text: "$\\triangle QMK = \\triangle MPN$ by Hypotenuse–Angle (HA)" }
    ],
    correct_option_id: 'A',
    explanation: "Right triangles $\\triangle QMK$ and $\\triangle NMP$ have right angles at $M$, legs $KM = PM$, and hypotenuses $QK = PN$. By Hypotenuse–Leg (HL), $\\triangle QMK = \\triangle NMP$."
  },
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 5: Jupiter Station • Vertical Angles, Bisectors & Shared Vertices",
    content_markdown: "Segments $EK$ and $FH$ intersect at $G$. Triangles $\\triangle EFG$ and $\\triangle KHG$ have right angles $\\widehat{E} = \\widehat{K} = 90^\\circ$ and equal hypotenuses $FG = HG$.\n\n![Figure: SBT 4.31b Bowtie Right Triangles](/images/geometry/math7_l15_sbt_431b_bowtie.svg)\n\nWhat hidden geometric equality establishes that $\\triangle EFG = \\triangle KHG$ by **Hypotenuse–Acute Angle (HA)**?",
    options: [
      { id: 'A', text: "Parallel orientation $EF \\parallel KH$ forces alternate angles" },
      { id: 'B', text: "Segment addition $EG + GK = FG + GH$ matches both lines" },
      { id: 'C', text: "Vertical opposite angles $\\widehat{EGF} = \\widehat{KGH}$ are equal" },
      { id: 'D', text: "Complementary angle sum $\\widehat{EFG} + \\widehat{KHG} = 90^\\circ$" }
    ],
    correct_option_id: 'C',
    explanation: "Lines $EK$ and $FH$ intersect at $G$, forming vertical opposite angles $\\widehat{EGF} = \\widehat{KGH}$. With right angles $\\widehat{E} = \\widehat{K} = 90^\\circ$ and hypotenuses $FG = HG$, $\\triangle EFG = \\triangle KHG$ by Hypotenuse–Acute Angle (HA)."
  },
  {
    order_index: 20,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 5: Jupiter Station • Vertical Angles, Bisectors & Shared Vertices",
    content_markdown: "In the twin sensor configuration below, right triangles $\\triangle XYZ$ ($\\widehat{X}=90^\\circ$) and $\\triangle TSZ$ ($\\widehat{S}=90^\\circ$) share vertex $Z$. Given legs $XZ = SZ$, hypotenuses $YZ = TZ$, and acute angle $\\widehat{YZX} = 68^\\circ$.\n\n![Figure: SBT 4.31d Twin Right Triangles V-Shape](/images/geometry/math7_l15_sbt_431d_vshape.svg)\n\nIf the entire outer angle between the outer arms is $\\widehat{XZS} = 180^\\circ$, calculate the degree measure of angle $\\widehat{YZT}$ between the two hypotenuses (enter the number only).",
    expected_value: "44",
    acceptable_answers: ["44", "44°", "44 deg"],
    explanation: "By HL ($XZ=SZ, YZ=TZ$), $\\triangle XYZ = \\triangle TSZ$, so $\\widehat{TZS} = \\widehat{YZX} = 68^\\circ$. Since $X, Z, S$ are collinear ($\\widehat{XZS} = 180^\\circ$), the angle between the hypotenuses is $\\widehat{YZT} = 180^\\circ - (\\widehat{YZX} + \\widehat{TZS}) = 180^\\circ - (68^\\circ + 68^\\circ) = 180^\\circ - 136^\\circ = 44^\\circ$."
  },

  // ==========================================
  // SECTOR 6: SATURN RINGS (Q21 - Q24)
  // ==========================================
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 6: Saturn Rings • Multi-Triangle Structures & Circle Chords",
    content_markdown: "Points $A, B, C$ lie on a circle centered at $O$. Perpendicular segments $OP \\perp AB$, $OM \\perp BC$, and $ON \\perp AC$ are drawn from center $O$ to each chord.\n\n![Figure: Circle Chords and Perpendiculars](/images/geometry/math7_l15_circle_three_hl.svg)\n\nWhy is $\\triangle OPA = \\triangle OPB$, proving that the perpendicular from the center bisects chord $AB$ ($PA = PB$)?",
    options: [
      { id: 'A', text: "By Leg–Leg (LL): radii $OA$ and $OB$ act as legs with shared chord $AB$" },
      { id: 'B', text: "By Leg–Acute Angle (LA): acute angle $\\widehat{OAB} = 45^\\circ$ is constant" },
      { id: 'C', text: "By Side–Angle–Side (SAS): chords in any circle are always bisected" },
      { id: 'D', text: "By Hypotenuse–Leg (HL): radii $OA = OB$ and common leg $OP$ are equal" }
    ],
    correct_option_id: 'D',
    explanation: "In right triangles $\\triangle OPA$ and $\\triangle OPB$ ($\\widehat{OPA}=\\widehat{OPB}=90^\\circ$), hypotenuses are radii of the circle ($OA = OB$), and they share leg $OP$. By Hypotenuse–Leg (HL), $\\triangle OPA = \\triangle OPB$, which implies $PA = PB$."
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 6: Saturn Rings • Multi-Triangle Structures & Circle Chords",
    content_markdown: "In the bowtie structure below, segments $AC$ and $BD$ intersect at $E$. Given right angles $\\widehat{BAC} = \\widehat{BDC} = 90^\\circ$ and equal uprights $AB = CD$.\n\n![Figure: Bowtie Frame SGK 4.21](/images/geometry/math7_l15_sgk_421_bowtie.svg)\n\nWhich congruence proves that $\\triangle ABE = \\triangle DCE$?",
    options: [
      { id: 'A', text: "Hypotenuse–Leg (HL) using diagonal beams $BE = CE$" },
      { id: 'B', text: "Leg–Acute Angle (LA) via vertical angles at $E$" },
      { id: 'C', text: "Leg–Leg (LL) criterion using horizontal beam $BC$" },
      { id: 'D', text: "Side–Side–Side (SSS) criterion across all bars" }
    ],
    correct_option_id: 'B',
    explanation: "In right triangles $\\triangle ABE$ and $\\triangle DCE$ ($\\widehat{A}=\\widehat{D}=90^\\circ$), vertical angles are equal: $\\widehat{AEB} = \\widehat{DEC}$. Since acute angles sum to $90^\\circ$, $\\widehat{ABE} = 90^\\circ - \\widehat{AEB} = 90^\\circ - \\widehat{DEC} = \\widehat{DCE}$. With legs $AB = CD$, $\\triangle ABE = \\triangle DCE$ by Leg–Acute Angle (LA)."
  },
  {
    order_index: 23,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 6: Saturn Rings • Multi-Triangle Structures & Circle Chords",
    content_markdown: "In kite $ABCD$, $AB \\perp BC$ and $AD \\perp CD$ (so $\\widehat{B}=\\widehat{D}=90^\\circ$), and diagonal $AC$ bisects $\\widehat{BAD}$ so that $\\widehat{BAC} = \\widehat{DAC}$. Diagonals $AC$ and $BD$ intersect at $E$.\n\n![Figure: Kite Quadrilateral Example 1](/images/geometry/math7_l15_kite_vidu1_ha.svg)\n\nIf $\\widehat{BAD} = 76^\\circ$, compute the degree measure of angle $\\widehat{ABD}$ (enter the number only).",
    expected_value: "52",
    acceptable_answers: ["52", "52°", "52 deg"],
    explanation: "Since $\\widehat{BAD} = 76^\\circ$ and $AC$ bisects $\\widehat{BAD}$, $\\widehat{BAC} = 38^\\circ$. By HA, $\\triangle BAC = \\triangle DAC$, which implies $AB = AD$. In isosceles triangle $\\triangle ABD$, diagonal $AE$ is the angle bisector of vertex $A$, so it is also the altitude ($AC \\perp BD$ at $E$). In right triangle $\\triangle ABE$, $\\widehat{AEB} = 90^\\circ$, so $\\widehat{ABD} = 90^\\circ - \\widehat{BAE} = 90^\\circ - 38^\\circ = 52^\\circ$."
  },
  {
    order_index: 24,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 6: Saturn Rings • Multi-Triangle Structures & Circle Chords",
    content_markdown: "In quadrilateral $ABCD$, diagonals $AC$ and $BD$ are perpendicular at $E$ ($AC \\perp BD$), with $EA = EB$ and $EC = ED$.\n\n![Figure: SBT 4.33 Perpendicular Diagonals](/images/geometry/math7_l15_sbt_433_perp_diag.svg)\n\nIf in right triangle $\\triangle EAD$ the acute angle $\\widehat{EAD} = 67^\\circ$, calculate the degree measure of angle $\\widehat{BCE}$ (enter the number only).",
    expected_value: "23",
    acceptable_answers: ["23", "23°", "23 deg"],
    explanation: "Right triangles $\\triangle AED$ and $\\triangle BEC$ have right angles at $E$. They have legs $EA = EB$ and $ED = EC$. By the Leg–Leg (LL) criterion, $\\triangle AED = \\triangle BEC$. In right triangle $\\triangle AED$, acute angle $\\widehat{ADE} = 90^\\circ - \\widehat{EAD} = 90^\\circ - 67^\\circ = 23^\\circ$. Since $\\triangle AED = \\triangle BEC$, corresponding angle $\\widehat{BCE} = \\widehat{ADE} = 23^\\circ$."
  },

  // ==========================================
  // SECTOR 7: URANUS DEEP SPACE (Q25 - Q27)
  // ==========================================
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Stage Proof Chains",
    content_markdown: "Triangles $\\triangle ABC$ and $\\triangle DEF$ have altitudes $AH \\perp BC$ and $DK \\perp EF$. Given $AB = DE$, base $BC = EF$, and altitude lengths $AH = DK$.\n\n![Figure: Triangles with Equal Altitudes SBT 4.36](/images/geometry/math7_l15_sbt_436_altitudes.svg)\n\nWhich two-step proof chain rigorously proves that $\\triangle ABC = \\triangle DEF$?",
    options: [
      { id: 'A', text: "Step 1: $\\triangle ABH = \\triangle DEK$ by HL gives $\\widehat{B} = \\widehat{E}$; Step 2: $\\triangle ABC = \\triangle DEF$ by SAS" },
      { id: 'B', text: "Step 1: $\\triangle ACH = \\triangle DFK$ by LL gives $AC = DF$ and $\\widehat{C} = \\widehat{F}$; Step 2: $\\triangle ABC = \\triangle DEF$ by SSS" },
      { id: 'C', text: "Step 1: $\\triangle ABH = \\triangle DEK$ by LA gives $BH = EK$ and $\\widehat{A} = \\widehat{D}$; Step 2: $\\triangle ABC = \\triangle DEF$ by ASA" },
      { id: 'D', text: "Step 1: Apply SAS directly to triangles $\\triangle ABC = \\triangle DEF$ using altitude $AH = DK$ as an included side" }
    ],
    correct_option_id: 'A',
    explanation: "Step 1: In right triangles $\\triangle ABH$ and $\\triangle DEK$ ($\\widehat{AHB}=\\widehat{DKE}=90^\\circ$), hypotenuses $AB = DE$ and legs $AH = DK$. By Hypotenuse–Leg (HL), $\\triangle ABH = \\triangle DEK$, which yields $\\widehat{B} = \\widehat{E}$. Step 2: In triangles $\\triangle ABC$ and $\\triangle DEF$, $AB = DE$, $\\widehat{B} = \\widehat{E}$, and $BC = EF$. By Side–Angle–Side (SAS), $\\triangle ABC = \\triangle DEF$."
  },
  {
    order_index: 26,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Stage Proof Chains",
    content_markdown: "In rectangle $ABCD$, points $E \\in AD$ and $F \\in BC$ satisfy $AE = CF$.\n\n![Figure: Rectangle Equal Inset Segments SBT 4.39](/images/geometry/math7_l15_sbt_439_rect_ef.svg)\n\nHow do we prove that $AF = CE$ using right triangle congruence?",
    options: [
      { id: 'A', text: "Prove $\\triangle AEF = \\triangle CFE$ by ASA using diagonals of the rectangle" },
      { id: 'B', text: "Prove $\\triangle ABD = \\triangle CDB$ by SSS, then conclude $AF = CE$ directly" },
      { id: 'C', text: "Prove $\\triangle ABF = \\triangle CDE$ by LL using $AB = CD$ and $BF = DE$" },
      { id: 'D', text: "Prove $\\triangle AFD = \\triangle CEB$ by HL using hypotenuses $AF$ and $CE$" }
    ],
    correct_option_id: 'C',
    explanation: "In rectangle $ABCD$, opposite sides are equal: $AB = CD$ and $AD = BC$. Since $AE = CF$, we have $DE = AD - AE = BC - CF = BF$. Now consider right triangles $\\triangle ABF$ ($\\widehat{B}=90^\\circ$) and $\\triangle CDE$ ($\\widehat{D}=90^\\circ$): legs $AB = CD$ and $BF = DE$. By the Leg–Leg (LL) criterion, $\\triangle ABF = \\triangle CDE$, so corresponding hypotenuses $AF = CE$."
  },
  {
    order_index: 27,
    type: 'FILL_IN_BLANK',
    points: 0.35,
    sectionName: "Sector 7: Uranus Deep Space • Multi-Stage Proof Chains",
    content_markdown: "In square $ABCD$, $M$ is the midpoint of $AB$ and $N$ is the midpoint of $AD$. Segments $BN$ and $CM$ intersect at point $P$.\n\n![Figure: Square Midpoints Perpendicular SBT 4.34](/images/geometry/math7_l15_sbt_434_square_mid.svg)\n\nBy right triangle congruence, $\\triangle ABN = \\triangle BCM$ (LL), so $\\widehat{ABN} = \\widehat{BCM}$. What is the degree measure of angle $\\widehat{BPM}$ (enter the number only)?",
    expected_value: "90",
    acceptable_answers: ["90", "90°", "90 deg"],
    explanation: "In square $ABCD$, $AB = BC$ and $\\widehat{A} = \\widehat{B} = 90^\\circ$. Since $M$ and $N$ are midpoints of equal sides, $AN = BM$. By LL, $\\triangle ABN = \\triangle BCM$, so $\\widehat{ANB} = \\widehat{BMC}$ and $\\widehat{ABN} = \\widehat{BCM}$. In right triangle $\\triangle ABN$, $\\widehat{ABN} + \\widehat{ANB} = 90^\\circ$. Substituting gives $\\widehat{BCM} + \\widehat{ANB} = 90^\\circ$, which means in $\\triangle PBM$, $\\widehat{PBM} + \\widehat{PMB} = \\widehat{PBN} + \\widehat{BMC} = 90^\\circ$. Therefore $\\widehat{BPM} = 180^\\circ - 90^\\circ = 90^\\circ$ ($BN \\perp CM$)."
  },

  // ==========================================
  // SECTOR 8: NEPTUNE FRONTIER (Q28 - Q30)
  // ==========================================
  {
    order_index: 28,
    type: 'MULTIPLE_CHOICE',
    points: 0.30,
    sectionName: "Sector 8: Neptune Frontier • Formal Written Proofs",
    content_markdown: "In the geometric configuration below, $AD \\perp BC$ at point $D$. Segments satisfy $DA = DC$ and $DB = DE$. Line $CE$ intersects $AB$ at point $F$.\n\n![Figure: SBT 4.40 Perpendicular Segments Intersect](/images/geometry/math7_l15_sbt_440_perp_cross.svg)\n\nWhich logical chain rigorously deduces that $CE \\perp AB$ (i.e., $\\widehat{BFC} = 90^\\circ$)?",
    options: [
      { id: 'A', text: "$\\triangle ABD = \\triangle CED$ by HA gives hypotenuses $AB = CE$, so their intersecting ray angle is strictly $90^\\circ$" },
      { id: 'B', text: "$\\triangle ACD$ is an isosceles right triangle, so crossing diagonals $AC$ and $BE$ must intersect at $90^\\circ$" },
      { id: 'C', text: "$\\triangle BDF$ is a right triangle at vertex $D$, forcing the opposite exterior angle $\\widehat{BFC} = 90^\\circ$" },
      { id: 'D', text: "$\\triangle ABD = \\triangle CED$ by LL gives $\\widehat{DAB} = \\widehat{DCE}$, transferring $90^\\circ$ from $D$ to $F$" }
    ],
    correct_option_id: 'D',
    explanation: "Right triangles $\\triangle ABD$ and $\\triangle CED$ ($\\widehat{ADB}=\\widehat{CDE}=90^\\circ$) have legs $DA = DC$ and $DB = DE$. By Leg–Leg (LL), $\\triangle ABD = \\triangle CED$, which gives $\\widehat{DAB} = \\widehat{DCE}$. Vertical opposite angles at $E$ are equal: $\\widehat{AED} = \\widehat{CEF}$. In right triangle $\\triangle ADE$, acute angles satisfy $\\widehat{DAB} + \\widehat{AED} = 90^\\circ$. Substituting yields $\\widehat{DCE} + \\widehat{CEF} = 90^\\circ$. In $\\triangle EFA$, this forces the third angle $\\widehat{EFA} = 180^\\circ - 90^\\circ = 90^\\circ$, hence $CE \\perp AB$ at $F$ ($\\widehat{BFC} = 90^\\circ$)."
  },
  {
    order_index: 29,
    type: 'ESSAY_UPLOAD',
    points: 0.60,
    sectionName: "Sector 8: Neptune Frontier • Formal Written Proofs",
    content_markdown: "In kite $ABCD$, $AB \\perp BC$ at $B$, $AD \\perp CD$ at $D$, and diagonal $AC$ bisects angle $\\widehat{BAD}$ (so $\\widehat{BAC} = \\widehat{DAC}$). Diagonals $AC$ and $BD$ intersect at point $E$.\n\n![Figure: SGK Example 1 Kite Geometry](/images/geometry/math7_l15_kite_vidu1_ha.svg)\n\nWrite a complete step-by-step formal proof for:\n(a) $\\triangle BAC = \\triangle DAC$;\n(b) $AC \\perp BD$ at point $E$.\n\n*(Type your proof or upload a clear photo of your handwritten notebook solution.)*",
    rubric: "1) Part (a): Identify right angles at B and D, common hypotenuse AC, and equal acute angles angle BAC = angle DAC to prove triangle BAC = triangle DAC by Hypotenuse–Acute Angle (HA) (0.25 pts). 2) Part (b): From part (a), deduce AB = AD (0.10 pts). Compare triangle BAE and triangle DAE with AB = AD, angle BAE = angle DAE, common AE to prove triangle BAE = triangle DAE by SAS (0.15 pts). Conclude angle AEB = angle AED = 90 deg, so AC is perpendicular to BD at E (0.10 pts).",
    explanation: "(a) Consider right triangles $\\triangle BAC$ ($\\widehat{B}=90^\\circ$) and $\\triangle DAC$ ($\\widehat{D}=90^\\circ$):\n- Hypotenuse $AC$ is common;\n- Acute angles $\\widehat{BAC} = \\widehat{DAC}$ (given).\nTherefore, $\\triangle BAC = \\triangle DAC$ by the Hypotenuse–Acute Angle (HA) criterion.\n\n(b) From $\\triangle BAC = \\triangle DAC$, we have $AB = AD$ (corresponding sides).\nNow consider $\\triangle BAE$ and $\\triangle DAE$:\n- $AB = AD$ (proved above);\n- $\\widehat{BAE} = \\widehat{DAE}$ (since $E \\in AC$);\n- Segment $AE$ is common.\nTherefore, $\\triangle BAE = \\triangle DAE$ by Side–Angle–Side (SAS).\nAs corresponding angles, $\\widehat{AEB} = \\widehat{AED}$.\nSince $B, E, D$ are collinear, $\\widehat{AEB} + \\widehat{AED} = 180^\\circ$.\nThus $\\widehat{AEB} = \\widehat{AED} = 90^\\circ$, which proves $AC \\perp BD$ at $E$. $\\blacksquare$"
  },
  {
    order_index: 30,
    type: 'ESSAY_UPLOAD',
    points: 0.65,
    sectionName: "Sector 8: Neptune Frontier • Formal Written Proofs",
    content_markdown: "In square $ABCD$, $M$ is the midpoint of side $AB$ and $N$ is the midpoint of side $AD$. Segments $BN$ and $CM$ intersect at point $P$.\n\n![Figure: Square Midpoint Proof SBT 4.34](/images/geometry/math7_l15_sbt_434_square_mid.svg)\n\nWrite a complete formal proof for:\n(a) $\\triangle ABN = \\triangle BCM$, and deduce that $BN = CM$;\n(b) $BN \\perp CM$ at point $P$.\n\n*(Type your proof or upload a clear photo of your handwritten notebook solution.)*",
    rubric: "1) Part (a): State AB = BC, angle A = angle B = 90 deg, and AN = BM = half side length (0.15 pts). Prove triangle ABN = triangle BCM by Leg–Leg (LL) and deduce BN = CM (0.15 pts). 2) Part (b): From congruence, deduce angle ABN = angle BCM (0.15 pts). Use right triangle ABN to write angle ABN + angle ANB = 90 deg, substitute into triangle PBM or triangle BPN to show angle BPM = 90 deg, concluding BN is perpendicular to CM (0.20 pts).",
    explanation: "(a) In square $ABCD$, all four sides are equal ($AB = BC = CD = DA$) and all four corner angles are $90^\\circ$ ($\\widehat{A} = \\widehat{B} = 90^\\circ$).\nSince $M$ is the midpoint of $AB$ and $N$ is the midpoint of $AD$:\n$$AN = \\frac{1}{2}AD = \\frac{1}{2}AB = BM$$\nNow consider right triangles $\\triangle ABN$ ($\\widehat{A}=90^\\circ$) and $\\triangle BCM$ ($\\widehat{B}=90^\\circ$):\n- Leg $AB = BC$ (sides of the square);\n- Leg $AN = BM$ (half-sides proved above).\nTherefore, $\\triangle ABN = \\triangle BCM$ by the Leg–Leg (LL) criterion.\nAs corresponding sides, $BN = CM$.\n\n(b) From $\\triangle ABN = \\triangle BCM$, corresponding acute angles are equal:\n$$\\widehat{ABN} = \\widehat{BCM}$$\nIn right triangle $\\triangle ABN$, acute angles sum to $90^\\circ$:\n$$\\widehat{ABN} + \\widehat{ANB} = 90^\\circ$$\nIn $\\triangle BCM$, point $P$ lies on $CM$ and $BN$. In right triangle $\\triangle BCM$, $\\widehat{BCM} + \\widehat{BMC} = 90^\\circ$.\nSince $\\widehat{BCM} = \\widehat{ABN}$, we have:\n$$\\widehat{ABN} + \\widehat{BMC} = 90^\\circ$$\nIn $\\triangle PBM$, the sum of angles is:\n$$\\widehat{BPM} = 180^\\circ - (\\widehat{PBM} + \\widehat{PMB}) = 180^\\circ - (\\widehat{ABN} + \\widehat{BMC}) = 180^\\circ - 90^\\circ = 90^\\circ$$\nTherefore, $BN \\perp CM$ at point $P$. $\\blacksquare$"
  }
];

async function main() {
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  console.log(`🚀 [Keithley Math Seed] Launching Lesson 15 Right Triangles Mission (30 Problems)`);
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

  // 2. Create Learning Unit (Lesson 15 Briefing + Web Studio attachment)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: "Lesson 15: Congruence Criteria for Right Triangles (LL, LA, HA, HL)",
      description: "Comprehensive coverage of right-triangle congruence criteria: Leg-Leg (LL), Leg-Acute Angle (LA), Hypotenuse-Acute Angle (HA), and Hypotenuse-Leg (HL), angle calculations, and two-step proof chains.",
      lecture_content_markdown: LECTURE_MARKDOWN,
      lecture_attachments: [
        {
          type: "WEB_STUDIO",
          title: "Lesson 15 Interactive Studio: Right Triangle Congruence",
          url: "/lectures/math7-lesson15-right-triangles/index.html"
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
      teacher_daily_note: "Cadet Keithley, today we master the four specialized criteria for right triangles: LL, LA, HA, and HL. Remember that the fixed 90° angle means you only need two additional equal parts. Pay close attention to whether the known side is a leg or the hypotenuse!",
      is_published: true
    }
  });
  console.log(`✅ Created Daily Mission Assignment: ${assignment.id}`);

  // 4. Create Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: "Orbital Mission: Right Triangle Congruence (30 Problems)",
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

  console.log('\n🎉 ALL SYSTEMS GO! Keithley Lesson 15 Right Triangle Mission (30 Problems) successfully seeded for 2026-11-28.');
}

main()
  .catch(err => {
    console.error('❌ Execution Error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
