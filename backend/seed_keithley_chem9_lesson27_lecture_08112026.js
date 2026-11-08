const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake
  SUBJECT_ID: '6fc7387b-13b8-4e27-8240-a60c03dc1d51', // CHEM_9
  ASSIGNED_DATE: '2026-11-08'
};

const LECTURE_MARKDOWN = `# 🚀 LESSON 27: ACETIC ACID (CH₃COOH)
**Keithley Lake (Astronaut Cadet) • Grade 9 Chemistry • 08 November 2026**

Interactive Simulation Studio: \`/lectures/chem9-lesson27-acetic-acid/index.html\`

---

## 🎯 Flight Mission Objectives
By the end of this deep space chemical briefing, Astronaut Cadet Keithley will be able to:
1. **Identify the Architecture:** State the molecular formula, condensed structural formula, and characteristic carboxyl functional group ($-\\text{COOH}$) of acetic acid.
2. **Describe Physical Properties:** Understand its physical state, pungent odor, sour taste, high boiling point ($118.2^\\circ\\text{C}$), infinite water miscibility, and recognize table vinegar as a dilute $2\\% - 5\\%$ solution.
3. **Master the 5 Acidic Properties:** Write balanced chemical equations representing the reactions of acetic acid with indicators, active metals ($\\text{Zn}, \\text{Mg}$), basic oxides ($\\text{CuO}$), alkalis ($\\text{NaOH}$), and carbonate salts ($\\text{Na}_2\\text{CO}_3, \\text{CaCO}_3$).
4. **Master the Esterification Reaction:** Explain the reversible synthesis of ethyl acetate ($\\text{CH}_3\\text{COOC}_2\\text{H}_5$) from acetic acid and ethylic alcohol catalyzed by concentrated $\\text{H}_2\\text{SO}_4$.
5. **Trace Synthesis Pathways:** Describe the biological fermentation of dilute ethanol via *Acetobacter* bacteria and industrial petrochemical oxidation.
6. **Analyze Space & Industrial Applications:** Relate acetic acid to cellulose acetate polymers, synthetic rayon fibers, pharmaceuticals (aspirin), and artificial flavorings.

---

## 1. Molecular Formula & Carboxyl Architecture

* **Molecular Formula:** $\\text{C}_2\\text{H}_4\\text{O}_2$
* **Relative Molecular Mass ($M$):** $60.05\\text{ g/mol}$ (or $60\\text{ amu}$)
* **Condensed Structural Formula:** $\\text{CH}_3-\\text{COOH}$ (or $\\text{CH}_3\\text{COOH}$)
* **Expanded Structural Geometry:**
  $$\\begin{matrix}
  \\quad \\text{H} \\quad \\text{O} \\\\
  \\quad | \\quad // \\\\
  \\text{H} - \\text{C} - \\text{C} \\\\
  \\quad | \\quad \\backslash \\\\
  \\quad \\text{H} \\quad \\text{O} - \\text{H}
  \\end{matrix}$$

### 💡 The Master Secret of the Carboxyl Group ($-\\text{COOH}$)
* The acetic acid molecule consists of a **methyl radical** ($\\text{CH}_3-$) covalently bonded to a **carboxyl functional group** ($-\\text{COOH}$).
* The carboxyl group is a composite of a **carbonyl group** ($>\\text{C}=\\text{O}$) and a **hydroxyl group** ($-\\text{O}-\\text{H}$).
* Because the oxygen in the carbonyl group is intensely electronegative, it shifts electron density away from the $\\text{O}-\\text{H}$ bond.
* Consequently, the hydrogen atom in the $-\\text{COOH}$ group becomes **exceptionally mobile and easily ionizable** as a hydrogen ion ($\\text{H}^+$) in aqueous solutions:
  $$\\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}^+$$
* Out of the 4 hydrogen atoms in $\\text{C}_2\\text{H}_4\\text{O}_2$, **exactly ONE hydrogen atom** (the one in $-\\text{COOH}$) participates in acidic ionization and single displacement reactions. The 3 hydrogens in the methyl group ($\\text{CH}_3-$) remain inert to metals.

---

## 2. Physical Constants & The Table Vinegar Telemetry

* **Physical State & Appearance:** Colorless, transparent liquid.
* **Odor & Taste:** Characteristic sharp, pungent aroma and distinct sour taste.
* **Boiling Point:** $118.2^\\circ\\text{C}$ (significantly higher than water at $100^\\circ\\text{C}$ and ethanol at $78.3^\\circ\\text{C}$ due to strong intermolecular hydrogen-bonded dimers).
* **Density ($D$):** $1.05\\text{ g/mL}$ at $20^\\circ\\text{C}$ (denser than pure water, which is $1.00\\text{ g/mL}$, and much denser than ethanol at $0.789\\text{ g/mL}$).
* **Solubility:** **Infinitely miscible with water** in all proportions. It is also an excellent solvent for many polar and non-polar organic compounds.
* **Glacial Acetic Acid:** Highly pure acetic acid ($>99.5\\%$) freezes at $16.6^\\circ\\text{C}$ into icicle-like transparent crystalline sheets, earning the historic name *glacial acetic acid*.
* **Table Vinegar Connection:** Everyday household vinegar is a dilute aqueous solution of acetic acid with a concentration between **$2\\%$ and $5\\%$ by mass**.

---

## 3. Chemical Properties: The 5 Acidic Reactions

Although classified as a **weak organic acid** (it ionizes only partially in water), acetic acid exhibits all five classic chemical properties characteristic of acids:

### 3.1. Indicator Test (Blue Litmus Paper)
* When a strip of blue litmus paper is dipped into an acetic acid solution, it immediately turns **reddish-pink**.
* This proves the presence of free hydronium ions ($\\text{H}^+$) in solution:
  $$\\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}^+$$

### 3.2. Reaction with Active Metals (Preceding Hydrogen)
* Acetic acid reacts with active metals located before hydrogen in the activity series (e.g., $\\text{Mg}, \\text{Al}, \\text{Zn}, \\text{Fe}$), liberating hydrogen gas ($\\text{H}_2\\uparrow$):
  $$2\\text{CH}_3\\text{COOH} + \\text{Zn} \\to (\\text{CH}_3\\text{COO})_2\\text{Zn} + \\text{H}_2\\uparrow$$
  $$2\\text{CH}_3\\text{COOH} + \\text{Mg} \\to (\\text{CH}_3\\text{COO})_2\\text{Mg} + \\text{H}_2\\uparrow$$
* **Observation:** The metal pieces gradually dissolve while continuous streams of gas bubbles evolve. Testing the gas with a burning splint yields a characteristic sharp **"pop"** sound.
* **Product Name:** $(\\text{CH}_3\\text{COO})_2\\text{Zn}$ is **Zinc acetate**.

### 3.3. Reaction with Basic Oxides
* Acetic acid dissolves basic oxides (e.g., $\\text{CuO}, \\text{CaO}, \\text{MgO}$), yielding soluble acetate salts and water:
  $$2\\text{CH}_3\\text{COOH} + \\text{CuO} \\xrightarrow{t^\\circ} (\\text{CH}_3\\text{COO})_2\\text{Cu} + \\text{H}_2\\text{O}$$
* **Observation:** Insoluble black Copper(II) oxide powder dissolves upon gentle heating, transforming the colorless solution into a **vibrant, transparent sky-blue** liquid due to hydrated $\\text{Cu}^{2+}$ ions of copper(II) acetate.

### 3.4. Reaction with Alkalis (Neutralization)
* Acetic acid readily neutralizes soluble bases (alkalis such as $\\text{NaOH}, \\text{KOH}, \\text{Ba(OH)}_2$):
  $$\\text{CH}_3\\text{COOH} + \\text{NaOH} \\to \\text{CH}_3\\text{COONa} + \\text{H}_2\\text{O}$$
* **Observation:** When acetic acid is titrated into a bright magenta solution of sodium hydroxide containing phenolphthalein indicator, the intense magenta color gradually pales and turns **completely colorless** at the exact stoichiometric equivalence point.
* **Product Name:** $\\text{CH}_3\\text{COONa}$ is **Sodium acetate**.

### 3.5. Reaction with Carbonate Salts (Salts of Weaker Acids)
* Acetic acid reacts vigorously with carbonate and hydrogen carbonate salts (e.g., $\\text{Na}_2\\text{CO}_3, \\text{CaCO}_3, \\text{NaHCO}_3$):
  $$2\\text{CH}_3\\text{COOH} + \\text{Na}_2\\text{CO}_3 \\to 2\\text{CH}_3\\text{COONa} + \\text{CO}_2\\uparrow + \\text{H}_2\\text{O}$$
  $$2\\text{CH}_3\\text{COOH} + \\text{CaCO}_3 \\to (\\text{CH}_3\\text{COO})_2\\text{Ca} + \\text{CO}_2\\uparrow + \\text{H}_2\\text{O}$$
* **Observation:** Rapid effervescence: copious bubbles of colorless, odorless carbon dioxide gas ($\\text{CO}_2$) bubble up through the solution. If the gas is bubbled through clear limewater ($\\text{Ca(OH)}_2$), the limewater turns milky white due to precipitate formation ($\\text{CaCO}_3\\downarrow$).
* **Significance:** This reaction demonstrates that **acetic acid is a stronger acid than carbonic acid ($\\text{H}_2\\text{CO}_3$)**, allowing it to displace carbonic acid from its salts.

---

## 4. The Esterification Synthesis Reaction

When acetic acid is heated with ethylic alcohol in the presence of concentrated sulfuric acid ($\\text{H}_2\\text{SO}_4$) as a catalyst, they undergo a reversible condensation reaction known as **esterification**:

$$\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\underset{t^\\circ}{\\overset{\\text{conc. } \\text{H}_2\\text{SO}_4}{\\rightleftharpoons}} \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}$$

* **Primary Product:** **Ethyl acetate** ($\\text{CH}_3\\text{COOC}_2\\text{H}_5$), belonging to the organic family of **esters**.
* **Key Properties of Ethyl Acetate:**
  * Colorless, volatile liquid.
  * Emits a pleasant, sweet **fruity aroma** (resembling ripe pears or green apples).
  * Insoluble in water and lighter than water ($D \\approx 0.90\\text{ g/mL}$), so it **floats as an upper distinct layer** above water or brine solution.
* **Dual Role of Concentrated $\\text{H}_2\\text{SO}_4$:**
  1. **Catalyst:** Speeds up both the forward and reverse rates to reach equilibrium faster.
  2. **Dehydrating Agent:** Greedily absorbs the water formed, driving Le Chatelier's equilibrium forward to increase the yield of ethyl acetate.

---

## 5. Complete Combustion Reaction

Like all organic fuels, acetic acid burns in air or pure oxygen to yield carbon dioxide and water vapor:

$$\\text{CH}_3\\text{COOH} + 2\\text{O}_2 \\xrightarrow{t^\\circ} 2\\text{CO}_2 + 2\\text{H}_2\\text{O} \\quad (\\Delta H < 0)$$

---

## 6. Synthesis & Industrial Production Pathways

### Path 1: Biochemical Fermentation of Dilute Alcohol (Vinegar Crafting)
* In agriculture, household culinary production, and closed-loop space habitats, vinegar is produced by aerating dilute ethylic alcohol ($8\\% - 10\\%$) at $25^\\circ - 30^\\circ\\text{C}$ in the presence of acetic bacteria (*Acetobacter*):
  $$\\text{C}_2\\text{H}_5\\text{OH} + \\text{O}_2 \\xrightarrow{\\text{acetic ferment / Acetobacter}} \\text{CH}_3\\text{COOH} + \\text{H}_2\\text{O}$$

### Path 2: Industrial Petrochemical Oxidation
* On an industrial scale, acetic acid is produced by catalytic oxidation of butane ($\\text{C}_4\\text{H}_{10}$) or acetaldehyde ($\\text{CH}_3\\text{CHO}$):
  $$2\\text{C}_4\\text{H}_{10} + 5\\text{O}_2 \\xrightarrow{t^\\circ, \\text{catalyst}} 4\\text{CH}_3\\text{COOH} + 2\\text{H}_2\\text{O}$$
  $$2\\text{CH}_3\\text{CHO} + \\text{O}_2 \\xrightarrow{t^\\circ, \\text{Mn}^{2+}} 2\\text{CH}_3\\text{COOH}$$

---

## 7. Terrestrial & Spacecraft Applications

1. **Food Preservation & Nutrition:** Table vinegar ($2\\% - 5\\%$) prevents spoilage by inhibiting harmful microbial enzymes, serves as a culinary seasoning, and pickles vegetables.
2. **Textiles & Polymers:** Serves as the primary feedstock to manufacture **cellulose acetate** (used for synthetic rayon fibers, non-flammable photographic film, and transparent spacecraft lenses).
3. **Plastics & Adhesives:** Precursor to vinyl acetate monomer, which polymerizes into **polyvinyl acetate (PVA)** for industrial glues, coatings, and synthetic latex rubbers.
4. **Pharmaceuticals:** Reacts to synthesize **acetylsalicylic acid (Aspirin)**, an indispensable anti-inflammatory and pain-relief medication.
5. **Solvents & Fragrances:** Converted into ester solvents (ethyl acetate, butyl acetate) used extensively in paints, varnishes, nail polish removers, and artificial fruit essences.

---

## 📝 Stoichiometric Worked Calculations

### Workout 1: Molar Mass & Elemental Mass Percentages
Determine the molar mass and the percentage composition by mass of Carbon, Hydrogen, and Oxygen in acetic acid ($\\text{C}_2\\text{H}_4\\text{O}_2$):
* **Step 1:** Molar Mass:
  $$M = (2 \\times 12) + (4 \\times 1) + (2 \\times 16) = 24 + 4 + 32 = 60\\text{ g/mol}$$
* **Step 2:** Mass Percentages:
  $$\\%\\text{C} = \\frac{24}{60} \\times 100\\% = 40.0\\%$$
  $$\\%\\text{H} = \\frac{4}{60} \\times 100\\% = 6.67\\%$$
  $$\\%\\text{O} = \\frac{32}{60} \\times 100\\% = 53.33\\%$$

### Workout 2: Stoichiometry of Zinc Reaction
Calculate the mass of zinc acetate formed and the volume of hydrogen gas released at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, where $V_m = 24.79\\text{ L/mol}$) when $6.5\\text{ g}$ of pure zinc ($\\text{Zn}, M = 65\\text{ g/mol}$) reacts completely with excess acetic acid:
* **Step 1:** Moles of Zinc:
  $$n_{\\text{Zn}} = \\frac{6.5}{65} = 0.1\\text{ mol}$$
* **Step 2:** Chemical equation:
  $$2\\text{CH}_3\\text{COOH} + \\text{Zn} \\to (\\text{CH}_3\\text{COO})_2\\text{Zn} + \\text{H}_2\\uparrow$$
* **Step 3:** Stoichiometric ratios:
  $$n_{(\\text{CH}_3\\text{COO})_2\\text{Zn}} = n_{\\text{Zn}} = 0.1\\text{ mol}$$
  $$n_{\\text{H}_2} = n_{\\text{Zn}} = 0.1\\text{ mol}$$
* **Step 4:** Mass of Zinc Acetate ($M = 65 + 2 \\times 59 = 183\\text{ g/mol}$):
  $$m_{(\\text{CH}_3\\text{COO})_2\\text{Zn}} = 0.1 \\times 183 = 18.3\\text{ g}$$
* **Step 5:** Volume of Hydrogen gas ($V = n \\times 24.79\\text{ L}$):
  $$V_{\\text{H}_2} = 0.1 \\times 24.79 = 2.479\\text{ L}$$

---
*Launch the Interactive Live Studio above to experiment with the virtual test tube, 6 chemical reagents, flame heating, and vinegar dilution telemetry!*`;

async function seed() {
  console.log('🚀 Seeding Lesson 27: Acetic Acid (Lecture Only) for Keithley Lake...');
  console.log('Target Date:', CONSTANTS.ASSIGNED_DATE);

  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  // 1. Clean up any existing assignments for Keithley on 2026-11-08 for CHEM_9
  const existingAsgns = await prisma.daily_student_assignments.findMany({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: targetDate,
      learning_units: {
        subject_id: CONSTANTS.SUBJECT_ID
      }
    },
    include: {
      assessment_attempts: true
    }
  });

  if (existingAsgns.length > 0) {
    console.log(`Cleaning ${existingAsgns.length} previous assignment(s)...`);
    for (const a of existingAsgns) {
      for (const att of a.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: a.id } });
    }
  }

  // 2. Create Learning Unit (Flight Briefing)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: 'Lesson 27: Acetic Acid (CH₃COOH) • Molecular Structure & Chemical Dynamics',
      description: 'Orbital flight briefing on molecular structure, physical constants, 5 acidic properties, and esterification synthesis of acetic acid.',
      lecture_content_markdown: LECTURE_MARKDOWN,
      lecture_attachments: [],
      is_template: true
    }
  });
  console.log('✅ Created Learning Unit:', unit.id);

  // 3. Create Daily Student Assignment Card (Mode: LECTURE_ONLY)
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: targetDate,
      custom_session_minutes: 90,
      teacher_daily_note: 'Cadet Keithley: Today we initiate deep space exploration of Lesson 27: Acetic Acid (CH₃COOH). Explore the molecular carboxyl group (-COOH), test all 6 reactions on the Orbital Reaction Bench, and master the esterification synthesis. Focus 100% on theory and live laboratory simulation today—no graded quiz pressures!',
      is_published: true
    }
  });
  console.log('✅ Created Daily Assignment Card:', assignment.id);

  // Backup to JSON file
  const backupPath = path.resolve(__dirname, 'content/chemistry_lesson27_lecture_2026_11_08.json');
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.writeFileSync(backupPath, JSON.stringify({
    assignedDate: CONSTANTS.ASSIGNED_DATE,
    studentId: CONSTANTS.STUDENT_ID,
    unitId: unit.id,
    assignmentId: assignment.id,
    mode: 'LECTURE_ONLY',
    unitTitle: unit.title,
    lectureMarkdown: LECTURE_MARKDOWN
  }, null, 2));
  console.log('✅ Saved backup to:', backupPath);

  console.log('🎉 ALL DONE! 08/11/2026 Keithley Chemistry Lecture mission deployed successfully.');
}

seed()
  .catch(e => {
    console.error('❌ Error seeding lecture:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
