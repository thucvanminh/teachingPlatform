#!/usr/bin/env node

/**
 * SEED SCRIPT: KEITHLEY LAKE - GRADE 7 MATH (LESSON 11 - LECTURE ONLY)
 * Date: 2026-11-14
 * Student: Keithley Lake (4745136c-bd25-4f45-a488-9f00f2121b70)
 * Teacher: Thầy Thức (dc62e5df-2344-4785-b058-b95f5dbe0983)
 * Subject: MATH_7 (e89cc834-99d0-40b7-ab5e-0a0838d273c4)
 */

const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, '../backend/node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983',
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70',
  SUBJECT_ID: 'e89cc834-99d0-40b7-ab5e-0a0838d273c4',
  DATE_STRING: '2026-11-14'
};

const LECTURE_CONTENT_MARKDOWN = `# Lesson 11: Theorems & Formal Geometric Proofs
*Space Flight Telemetry Briefing • Flight Commander Thầy Thức*

---

## 🛰️ Protocol 01: Anatomy of a Theorem

A **Theorem** is a mathematical truth established by logical deduction from known facts.

$$\\text{Universal Structure: } \\mathbf{IF} \\text{ [Hypothesis]} \\implies \\mathbf{THEN} \\text{ [Conclusion]}$$

| Component | Math Code | Definition | Mission Example |
| :--- | :---: | :--- | :--- |
| **Hypothesis** | **Given (GT)** | Starting conditions assumed true | If $\\widehat{xOy}$ and $\\widehat{x'Oy'}$ are vertical angles |
| **Conclusion** | **Prove (KL)** | Target truth to be derived | Then $\\widehat{xOy} = \\widehat{x'Oy'}$ |

![Theorem Architecture](/images/geometry/math7_l11_theorem_anatomy.svg)

---

## ⚡ Protocol 02: The 3-Step Deductive Proof Engine

To **prove a theorem**, execute this linear logical chain:

1. **State the Given:** Write down initial facts directly from the Hypothesis.
2. **Build the Bridge:** Apply definitions, axioms, or previously proven theorems.
3. **Conclude:** Reach the target Conclusion with $\\therefore$ (*therefore*), ending with **Q.E.D.** (*quod erat demonstrandum*).

---

## 📐 Protocol 03: Classic Model 1 — Vertical Angles Theorem

> **Theorem:** Two vertically opposite angles are equal.

![Vertical Angles Proof](/images/geometry/math7_l11_vertical_angles_proof.svg)

### 1. Statement Matrix

| Given (Hypothesis) | Prove (Conclusion) |
| :--- | :--- |
| $\\widehat{xOy}$ and $\\widehat{x'Oy'}$ are vertically opposite angles | $\\widehat{xOy} = \\widehat{x'Oy'}$ |

### 2. Proof (2-Step Execution)

1. Ray $Ox$ and straight line $x'y'$ form supplementary linear pairs:
   $$\\widehat{xOy} + \\widehat{xOy'} = 180^\\circ \\implies \\widehat{xOy} = 180^\\circ - \\widehat{xOy'}$$
2. Ray $Oy'$ and straight line $xy$ form supplementary linear pairs:
   $$\\widehat{x'Oy'} + \\widehat{xOy'} = 180^\\circ \\implies \\widehat{x'Oy'} = 180^\\circ - \\widehat{xOy'}$$
3. Comparing (1) and (2):
   $$\\therefore \\widehat{xOy} = \\widehat{x'Oy'} \\quad (\\text{Q.E.D.})$$

---

## 🚀 Protocol 04: Classic Model 2 — Perpendicular Transversal Theorem

> **Theorem:** If a line is perpendicular to one of two parallel lines, it is also perpendicular to the other line.

![Perpendicular Transversal Proof](/images/geometry/math7_l11_perpendicular_transversal_proof.svg)

### 1. Statement Matrix

| Given (Hypothesis) | Prove (Conclusion) |
| :--- | :--- |
| $a \\parallel b$ and $c \\perp a$ (at point $A$, so $\\widehat{A_1} = 90^\\circ$) | $c \\perp b$ (at point $B$, so $\\widehat{B_1} = 90^\\circ$) |

### 2. Proof (2-Step Execution)

1. Because lines $a \\parallel b$ are cut by transversal $c$:
   $$\\widehat{B_1} = \\widehat{A_1} \\quad (\\text{Alternate interior angles})$$
2. Since $c \\perp a \\implies \\widehat{A_1} = 90^\\circ$:
   $$\\widehat{B_1} = 90^\\circ \\implies c \\perp b \\quad (\\text{Q.E.D.})$$

---

## 🎯 Cadet Golden Rules

- **Rule 1:** A theorem **MUST** contain an **IF** clause (Given) and a **THEN** clause (Prove).
- **Rule 2:** Never assume what you need to prove. Always start strictly from the **Given**.
- **Rule 3:** Every deductive step **MUST** state a mathematical justification in parentheses (e.g., *Linear pair*, *Alternate interior angles*).
`;

async function main() {
  console.log(`🚀 [Keithley Math Seed] Seeding Lesson 11 (Lecture Only) for ${CONSTANTS.DATE_STRING}...`);
  const targetDate = new Date(`${CONSTANTS.DATE_STRING}T00:00:00.000Z`);

  // 1. Dọn dẹp assignment cũ ngày này nếu có
  const existing = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: targetDate
    },
    include: {
      assessment_attempts: true
    }
  });

  if (existing) {
    console.log(`⚠️ Existing assignment found for ${CONSTANTS.DATE_STRING}. Cleaning up...`);
    for (const att of existing.assessment_attempts) {
      await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
      await prisma.assessment_attempts.delete({ where: { id: att.id } });
    }
    await prisma.daily_student_assignments.delete({ where: { id: existing.id } });
    console.log(`✓ Cleaned previous mission.`);
  }

  // 2. Tạo Learning Unit
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: 'Lesson 11: Theorems & Formal Geometric Proofs',
      description: 'Core Space Flight Briefing: Theorem structure (Hypothesis vs Conclusion) and the 3-step deductive proof engine. Ultra-concise, zero-fluff geometric reasoning.',
      lecture_content_markdown: LECTURE_CONTENT_MARKDOWN,
      lecture_attachments: [
        {
          title: 'Theorem Architecture Blueprint (SVG)',
          url: '/images/geometry/math7_l11_theorem_anatomy.svg'
        },
        {
          title: 'Vertical Angles Theorem Proof (SVG)',
          url: '/images/geometry/math7_l11_vertical_angles_proof.svg'
        },
        {
          title: 'Perpendicular Transversal Theorem Proof (SVG)',
          url: '/images/geometry/math7_l11_perpendicular_transversal_proof.svg'
        }
      ],
      is_template: true
    }
  });
  console.log(`✅ Created Learning Unit: ${unit.id}`);

  // 3. Tạo Daily Student Assignment
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: targetDate,
      custom_session_minutes: 45,
      teacher_daily_note: 'Cadet Keithley: Review the 3-step proof logic chains. Zero fluff, pure geometric deduction!',
      is_published: true
    }
  });
  console.log(`✅ Created Daily Student Assignment: ${assignment.id}`);
  console.log(`🎉 Mission Seed completed successfully for Astronaut Keithley Lake!`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
