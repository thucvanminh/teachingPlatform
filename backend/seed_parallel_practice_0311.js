const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });
const { PrismaClient } = require('@prisma/client');
const payload = require('./content/parallel_practice_2026_11_03.json');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: (process.env.DATABASE_URL || '') + (process.env.DATABASE_URL?.includes('?') ? '&' : '?') + 'connect_timeout=30&pool_timeout=30',
    },
  },
});

async function main() {
  const student = await prisma.users.findUnique({
    where: { username: 'keithley' },
  });
  if (!student) throw new Error('Student keithley not found');

  const subject = await prisma.subjects.findFirst({
    where: { code: 'MATH_7' },
  });
  if (!subject) throw new Error('Subject MATH_7 not found');

  const prevLu = await prisma.learning_units.findFirst({
    where: { title: { contains: 'Parallel Lines' } },
    orderBy: { created_at: 'desc' },
  });
  if (!prevLu) throw new Error('Previous Lesson 9 learning unit not found');

  const assignedDate = new Date('2026-11-03T00:00:00.000Z');

  // Check if an assignment already exists for Keithley on 2026-11-03
  const existingCard = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: student.id,
      assigned_date: assignedDate,
    },
    include: {
      learning_units: true,
      assessment_attempts: true,
    },
  });

  if (existingCard) {
    console.log(`Assignment already exists for Keithley on 2026-11-03: ID ${existingCard.id}`);
    return;
  }

  const apply = process.argv.includes('--apply');
  console.log(`Ready to seed 2026-11-03 Keithley mission (${payload.questions.length} questions). Mode: ${apply ? 'APPLY' : 'PREVIEW'}`);
  if (!apply) {
    console.log('Run with --apply to write to database.');
    return;
  }

  const result = await prisma.$transaction(async (tx) => {
    // 1. Create Learning Unit with previous lesson lecture markdown
    const unit = await tx.learning_units.create({
      data: {
        title: 'Lesson 9: Parallel Lines & Recognition Tests',
        subject_id: subject.id,
        created_by: prevLu.created_by,
        description: prevLu.description,
        lecture_content_markdown: prevLu.lecture_content_markdown,
      },
    });

    // 2. Create Daily Student Assignment
    const card = await tx.daily_student_assignments.create({
      data: {
        student_id: student.id,
        learning_unit_id: unit.id,
        assigned_by: prevLu.created_by,
        assigned_date: assignedDate,
        custom_session_minutes: 90,
        is_published: true,
        teacher_daily_note: "Keithley, let's embark on today's Visual Parallel Navigation Mission! Read the Flight Briefing at Station 1, then solve the 45 visual navigation challenges across the 8 Planetary Sectors. Trust the angle relationships and aim for 100% accuracy!",
      },
    });

    // 3. Create Assessment with 45 questions
    const assessment = await tx.assessments.create({
      data: {
        learning_unit_id: unit.id,
        title: payload.title,
        type: 'IN_SESSION_90M',
        instructions: payload.instructions,
        time_limit_minutes: 90,
        max_score: 10,
        questions: {
          create: payload.questions,
        },
      },
    });

    // 4. Create initial Assessment Attempt
    const attempt = await tx.assessment_attempts.create({
      data: {
        daily_assignment_id: card.id,
        assessment_id: assessment.id,
        student_id: student.id,
        status: 'NOT_STARTED',
        time_spent_seconds: 0,
      },
    });

    return {
      cardId: card.id,
      unitId: unit.id,
      assessmentId: assessment.id,
      attemptId: attempt.id,
      questionCount: payload.questions.length,
      assignedDate: assignedDate.toISOString(),
    };
  }, { isolationLevel: 'RepeatableRead', timeout: 60000 });

  console.log('Successfully seeded database:', JSON.stringify(result, null, 2));
}

main()
  .catch((e) => {
    console.error('Seed error:', e.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
