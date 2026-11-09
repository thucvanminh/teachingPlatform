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

const LECTURE_MARKDOWN = `# 🔬 LESSON 27: ACETIC ACID (CH₃COOH)
**Cadet Keithley Lake • Grade 9 Chemistry • 08/11/2026**

Interactive Virtual Lab: \`/lectures/chem9-lesson27-acetic-acid/index.html\`

---

### 1. Molecular Structure & Carboxyl Group ($-\\text{COOH}$)
* **Molecular Formula:** $\\text{C}_2\\text{H}_4\\text{O}_2$ ($M = 60\\text{ g/mol}$)
* **Condensed Structural Formula:** $\\text{CH}_3-\\text{COOH}$
* **Functional Group:** $-\\text{COOH}$ (Carboxyl: carbonyl $>\\text{C}=\\text{O}$ + hydroxyl $-\\text{OH}$)
* **Key Concept:** The $\\text{H}$ atom in $-\\text{COOH}$ is mobile and ionizes in water:
$$\\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}^+$$

---

### 2. Physical Properties
* **State:** Colorless liquid, pungent sour odor, bp $118.2^\\circ\\text{C}$, miscible in water.
* **Table Vinegar:** Dilute acetic acid solution (**$2\\% - 5\\%$**).
* **Glacial Acetic Acid:** Pure ($>99.5\\%$), freezes into icicle crystals at $16.6^\\circ\\text{C}$.

---

### 3. Five Classic Acidic Properties
1. **Indicator:** Turns blue litmus **red**.
2. **With Active Metals ($\\text{Zn}, \\text{Mg}$):**
$$2\\text{CH}_3\\text{COOH} + \\text{Zn} \\to (\\text{CH}_3\\text{COO})_2\\text{Zn} + \\text{H}_2\\uparrow$$
3. **With Basic Oxides ($\\text{CuO}$):**
$$2\\text{CH}_3\\text{COOH} + \\text{CuO} \\xrightarrow{t^\\circ} (\\text{CH}_3\\text{COO})_2\\text{Cu} + \\text{H}_2\\text{O} \\quad (\\text{sky-blue})$$
4. **With Alkalis ($\\text{NaOH}$):**
$$\\text{CH}_3\\text{COOH} + \\text{NaOH} \\to \\text{CH}_3\\text{COONa} + \\text{H}_2\\text{O}$$
5. **With Carbonate Salts ($\\text{Na}_2\\text{CO}_3$):** *(Distinguishing test from Ethanol)*
$$2\\text{CH}_3\\text{COOH} + \\text{Na}_2\\text{CO}_3 \\to 2\\text{CH}_3\\text{COONa} + \\text{CO}_2\\uparrow + \\text{H}_2\\text{O}$$

---

### 4. Esterification Synthesis (Key Reaction)
$$\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\underset{t^\\circ}{\\overset{\\text{H}_2\\text{SO}_4\\text{ conc.}}{\\rightleftharpoons}} \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}$$
* **Product:** **Ethyl acetate** ($\\text{CH}_3\\text{COOC}_2\\text{H}_5$), pleasant fruit fragrance, floats on water.
* **Catalyst:** Concentrated $\\text{H}_2\\text{SO}_4$ (catalyzes and absorbs water to shift equilibrium).

---

### 5. Production Pathways
* **Vinegar Fermentation:** $\\text{C}_2\\text{H}_5\\text{OH} + \\text{O}_2 \\xrightarrow{\\text{acetic ferment}} \\text{CH}_3\\text{COOH} + \\text{H}_2\\text{O}$
* **Butane Oxidation:** $2\\text{C}_4\\text{H}_{10} + 5\\text{O}_2 \\xrightarrow{t^\\circ, \\text{cat}} 4\\text{CH}_3\\text{COOH} + 2\\text{H}_2\\text{O}$`;

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
      title: 'Lesson 27: Acetic Acid (CH₃COOH)',
      description: 'Core: Molecular structure (-COOH), 5 acidic reactions, and esterification synthesis.',
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
      teacher_daily_note: 'Cadet Keithley: Master the carboxyl group (-COOH), 5 acid reactions, and esterification.',
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
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
