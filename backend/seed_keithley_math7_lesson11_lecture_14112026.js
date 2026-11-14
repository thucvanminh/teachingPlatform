const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake
  SUBJECT_ID: 'e89cc834-99d0-40b7-ab5e-0a0838d273c4', // MATH_7
  ASSIGNED_DATE: '2026-11-14'
};

async function seed() {
  console.log('🚀 Updating 14/11/2026 Math 7 Lecture with Interactive Web Studio...');
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  const lectureMdPath = path.resolve(__dirname, 'content/math7_lesson11_lecture_2026_11_14.md');
  const lectureMarkdown = fs.readFileSync(lectureMdPath, 'utf8');

  // 1. Find existing assignment
  let assignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: targetDate,
      learning_units: {
        subject_id: CONSTANTS.SUBJECT_ID
      }
    },
    include: {
      learning_units: true
    }
  });

  if (!assignment) {
    console.log('No existing assignment found. Creating unit and assignment...');
    const unit = await prisma.learning_units.create({
      data: {
        subject_id: CONSTANTS.SUBJECT_ID,
        created_by: CONSTANTS.TEACHER_ID,
        title: "Lesson 11: Theorems & Formal Geometric Proofs",
        description: "Interactive Space Flight Studio: Theorem structure (Hypothesis vs Conclusion) and the 3-step deductive proof engine.",
        lecture_content_markdown: lectureMarkdown,
        lecture_attachments: [],
        is_template: true
      }
    });

    assignment = await prisma.daily_student_assignments.create({
      data: {
        student_id: CONSTANTS.STUDENT_ID,
        learning_unit_id: unit.id,
        assigned_by: CONSTANTS.TEACHER_ID,
        assigned_date: targetDate,
        custom_session_minutes: 90,
        teacher_daily_note: "Cadet Keithley: Launch your interactive studio to master Theorem Architecture and the 3-step deductive proof engine!",
        is_published: true
      },
      include: {
        learning_units: true
      }
    });
    console.log(`✅ Created Unit: ${unit.id} and Assignment: ${assignment.id}`);
  } else {
    // 2. Update existing learning unit with interactive web studio link
    await prisma.learning_units.update({
      where: { id: assignment.learning_unit_id },
      data: {
        title: "Lesson 11: Theorems & Formal Geometric Proofs",
        description: "Interactive Space Flight Studio: Theorem structure (Hypothesis vs Conclusion) and the 3-step deductive proof engine.",
        lecture_content_markdown: lectureMarkdown
      }
    });

    await prisma.daily_student_assignments.update({
      where: { id: assignment.id },
      data: {
        teacher_daily_note: "Cadet Keithley: Launch your interactive studio to master Theorem Architecture and the 3-step deductive proof engine!"
      }
    });
    console.log(`✅ Updated Learning Unit ${assignment.learning_unit_id} with interactive lecture!`);
  }

  // 3. Save JSON Backup
  const backupPath = path.resolve(__dirname, 'content/math7_lesson11_lecture_2026_11_14.json');
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.writeFileSync(backupPath, JSON.stringify({
    assignedDate: CONSTANTS.ASSIGNED_DATE,
    studentId: CONSTANTS.STUDENT_ID,
    subjectId: CONSTANTS.SUBJECT_ID,
    unitId: assignment.learning_unit_id,
    assignmentId: assignment.id,
    interactiveUrl: "/lectures/math7-theorems-proofs/index.html",
    unitTitle: "Lesson 11: Theorems & Formal Geometric Proofs",
    lectureMarkdown: lectureMarkdown
  }, null, 2));
  console.log('✅ Saved backup to:', backupPath);

  console.log('🎉 ALL DONE! 14/11/2026 Interactive Web Lecture Studio deployed.');
}

seed()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
