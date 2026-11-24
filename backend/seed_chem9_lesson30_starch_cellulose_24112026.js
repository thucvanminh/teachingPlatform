const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake
  SUBJECT_ID: '6fc7387b-13b8-4e27-8240-a60c03dc1d51', // CHEM_9
  ASSIGNED_DATE: '2026-11-24'
};

const LECTURE_MARKDOWN = `# 🚀 FLIGHT BRIEFING: LESSON 30 • STARCH & CELLULOSE (DEEP PRACTICE)
**Keithley Lake • Grade 9 Chemistry • 24 Nov 2026**

### 🌐 Interactive 3D Lab Studio
> **Launch Studio:** [/lectures/chem9-lesson30-starch-cellulose/index.html](/lectures/chem9-lesson30-starch-cellulose/index.html)
*(3D Starch vs. Cellulose, Iodine Colorimetry, 2-Tube Hydrolysis Lab & Stoichiometry Calculator)*

---

## 📊 Core Polysaccharide Comparison (SGK pp. 135–137)

| Property | Starch $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$ | Cellulose $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_m$ |
| :--- | :--- | :--- |
| **State & Shape** | White fine powder (granular, compact coils) | White fibrous solid (elongated fibrils, $m \\gg n$, not isomers) |
| **Water Solubility** | Insoluble in cold water; swells in hot water to form **starch paste** | Completely insoluble in cold water, hot water & organic solvents |
| **Natural Sources** | Seeds, tubers, roots (rice $80\\%$, corn $70\\%$, potatoes $20\\%$, cassava) | Plant cell walls, wood ($50\\%$, bamboo $50\\%$, cotton $95\\text{--}98\\%$) |
| **Role in Plants** | **Energy reserve** tapped during darkness/growth | **Cell wall** structural framework for rigid upright support |
| **Iodine ($\\text{I}_2$) Test** | **Deep blue-violet complex** (thermally reversible: fades hot, returns cold) | **No color change** (linear chains do not form inclusion helices) |
| **Human Digestion** | Hydrolyzed by amylase (saliva, pancreas) into maltose & glucose | Not digested (humans lack cellulase; acts as essential dietary fiber) |
| **Key Uses** | Food staple, adhesive glue paste, bio-ethanol, glucose syrup | Paper, textiles, building wood, artificial silk, bio-ethanol |

---

## ⚡ Fundamental Stoichiometry & Equations ($M_{\\text{unit}} = 162\\text{ g/mol}$)

1. **Photosynthetic Biosynthesis:**
   $$6n\\text{CO}_2 + 5n\\text{H}_2\\text{O} \\xrightarrow{\\text{chlorophyll, light}} (\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + 6n\\text{O}_2\\uparrow$$
   * For every $1\\text{ mol}$ of repeating unit synthesized ($162\\text{ g}$), $6\\text{ mol }\\text{CO}_2$ ($264\\text{ g}$) is absorbed and $6\\text{ mol }\\text{O}_2$ ($148.74\\text{ L}$ at $25^\\circ\\text{C}, 1\\text{ bar}$) is released.

2. **Complete Acid/Enzyme Hydrolysis:**
   $$(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+, t^\\circ} n\\text{C}_6\\text{H}_{12}\\text{O}_6$$
   * Glucose is the sole final product of both starch and cellulose.
   $$m_{\\text{glucose}} = \\frac{m_{\\text{pure polymer}}}{162} \\times 180 \\times \\frac{H}{100}$$

3. **2-Step Bio-Ethanol & $\\text{CO}_2$ Production:**
   $$(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n \\xrightarrow{\\text{hydrolysis}} n\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{yeast fermentation}} 2n\\text{C}_2\\text{H}_5\\text{OH} + 2n\\text{CO}_2\\uparrow$$
   * $1\\text{ mol unit } (162\\text{ g}) \\to 2\\text{ mol }\\text{C}_2\\text{H}_5\\text{OH} (92\\text{ g}) + 2\\text{ mol }\\text{CO}_2 (49.58\\text{ L at } 25^\\circ\\text{C}, 1\\text{ bar})$ at $100\\%$ yield.

4. **Silver Mirror Reduction (Tollens Assay):**
   $$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 2[\\text{Ag}(\\text{NH}_3)_2]\\text{OH} \\xrightarrow{t^\\circ} \\text{ammonium gluconate} + 2\\text{Ag}\\downarrow + 3\\text{NH}_3 + \\text{H}_2\\text{O}$$
   * $1\\text{ mol glucose} \\to 2\\text{ mol Ag} \\ (216\\text{ g})$.
`;

function loadBatches() {
  const localQuestionsFile = path.resolve(__dirname, 'scripts/chem9_questions_30q_24112026.json');
  if (fs.existsSync(localQuestionsFile)) {
    const data = JSON.parse(fs.readFileSync(localQuestionsFile, 'utf8'));
    return data;
  }

  const allQuestions = [];
  for (let i = 1; i <= 5; i++) {
    const filePath = `/tmp/opencode/chem9_24112026_batch${i}.json`;
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing batch file: ${filePath}`);
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    allQuestions.push(...data);
  }

  // Sort by order_index
  allQuestions.sort((a, b) => a.order_index - b.order_index);
  return allQuestions;
}

async function seed() {
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);
  const questions = loadBatches();

  console.log('===============================================================');
  console.log('🚀 [Keithley Chemistry Seed] Deploying Lesson 30 Deep Mission');
  console.log('👨‍🚀 Student: Keithley Lake (@keithley)');
  console.log(`📅 Date: ${CONSTANTS.ASSIGNED_DATE} | Mode: BOTH`);
  console.log(`🎯 Total Cosmic Problems: ${questions.length} (20 Theory + 10 Calculations)`);
  console.log('===============================================================');

  if (questions.length !== 30) {
    throw new Error(`Expected exactly 30 questions, but loaded ${questions.length}`);
  }

  // Verify all questions have correct_option_id and options
  for (const q of questions) {
    if (!q.correct_option_id) {
      throw new Error(`Question ${q.order_index} is missing correct_option_id!`);
    }
    if (!q.options || q.options.length !== 4) {
      throw new Error(`Question ${q.order_index} does not have exactly 4 options!`);
    }
  }

  // 1. Clean up existing CHEM_9 assignments for Keithley on target date
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
    console.log(`⚠️ Found ${existingAsgns.length} existing assignment(s) on ${CONSTANTS.ASSIGNED_DATE}. Cleaning up...`);
    for (const asgn of existingAsgns) {
      for (const att of asgn.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: asgn.id } });
    }
    console.log('✓ Cleaned previous mission records.');
  }

  // 2. Create Learning Unit (Flight Briefing)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: 'Lesson 30: Starch and Cellulose (Deep Practice)',
      description: 'Advanced Polysaccharide Structure, Iodine Dynamics, Enzymatic Pathways & Quantitative Stoichiometry.',
      lecture_content_markdown: LECTURE_MARKDOWN,
      lecture_attachments: [],
      is_template: true
    }
  });
  console.log(`✅ Created Learning Unit: ${unit.id} ("${unit.title}")`);

  // 3. Create Daily Student Assignment Card
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: targetDate,
      custom_session_minutes: 90,
      teacher_daily_note: '🚀 Flight Telemetry Engaged! Welcome to your 90-minute In-Session Mission for 24/11/2026, Astronaut Cadet Keithley! 30 cosmic problems covering advanced Starch & Cellulose structures, thermal iodine dynamics, enzymatic digestion vs dietary fiber, multi-step acid hydrolysis, bio-ethanol production, and gas volume stoichiometry across 8 planetary sectors. Achieve 100% mission readiness!',
      is_published: true
    }
  });
  console.log(`✅ Created Daily Assignment Card: ${assignment.id}`);

  // 4. Create In-Session Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: 'Cosmic Chemistry In-Session Mission: Starch & Cellulose Deep Practice (90m)',
      instructions: 'Timed celestial chemistry assessment with per-question chronometer controls. 30 problems: 20 conceptual theory problems + 10 quantitative stoichiometry problems across 8 planetary sectors. 100% English telemetry.',
      time_limit_minutes: 90,
      max_score: 10.0
    }
  });
  console.log(`✅ Created In-Session Assessment: ${assessment.id}`);

  // 5. Bulk Create Questions
  for (const q of questions) {
    const questionPayload = {
      content_markdown: q.content_markdown,
      sectionName: q.sectionName,
      options: q.options.map((opt) => ({ id: opt.id, text: opt.text })),
      correct_option_id: q.correct_option_id
    };
    if (q.passage) {
      questionPayload.passage = q.passage;
    }

    const gradingPayload = {
      correct_option_id: q.correct_option_id,
      explanation: q.explanation
    };

    await prisma.questions.create({
      data: {
        assessment_id: assessment.id,
        order_index: q.order_index,
        points: q.points || (q.order_index <= 20 ? 0.33 : 0.34),
        type: q.type || 'MULTIPLE_CHOICE',
        question_payload: questionPayload,
        grading_key_payload: gradingPayload
      }
    });
  }
  console.log(`✅ Loaded ${questions.length} problems into Assessment questions.`);

  // 6. Initialize Assessment Attempt (NOT_STARTED)
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: CONSTANTS.STUDENT_ID,
      status: 'NOT_STARTED'
    }
  });
  console.log(`✅ Initialized Mission Attempt: ${attempt.id} (Status: NOT_STARTED)`);

  console.log('\n🎉 ALL SYSTEMS GO: Lesson 30 Deep Practice Mission deployed successfully for 24/11/2026!');
  return {
    unitId: unit.id,
    assignmentId: assignment.id,
    assessmentId: assessment.id,
    attemptId: attempt.id
  };
}

// If run directly
if (require.main === module) {
  seed()
    .catch((e) => {
      console.error('❌ Seeding failed:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { seed, loadBatches, CONSTANTS };
