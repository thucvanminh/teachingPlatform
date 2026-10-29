#!/usr/bin/env node

/**
 * CLI HELPER: SEED ENGLISH LESSON & ASSIGNMENT FOR GRADE 11 / 12
 * Usage: node seed_english_lesson.js --payload <path_to_payload.json>
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, '../../../../backend/node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENTS: {
    thai: '9208f557-3288-442e-accf-15fc8c763e68',     // Lớp 11
    nam_viet: 'c4217be5-4c07-4286-905c-e67d26456fae'  // Lớp 12
  },
  SUBJECTS: {
    11: 'f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0',       // ENG_11
    12: '9b343ae3-1f19-4bbd-986d-069cb158a127'        // ENG_12
  }
};

async function seed(payload) {
  const {
    studentUsername,
    grade,
    assignedDate,
    unitTitle,
    unitDescription,
    lectureMarkdown,
    teacherNote,
    assessmentTitle,
    timeLimitMinutes = 90,
    questions = []
  } = payload;

  const studentId = CONSTANTS.STUDENTS[studentUsername];
  if (!studentId) {
    throw new Error(`Unknown student username: "${studentUsername}". Expected "thai" or "nam_viet".`);
  }

  const subjectId = CONSTANTS.SUBJECTS[grade];
  if (!subjectId) {
    throw new Error(`Unsupported grade: "${grade}". Expected 11 or 12.`);
  }

  console.log(`🚀 Starting seeding for student: ${studentUsername} (Grade ${grade})`);
  console.log(`📅 Assigned Date: ${assignedDate} | Unit: ${unitTitle}`);

  // 1. Create Learning Unit
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: subjectId,
      created_by: CONSTANTS.TEACHER_ID,
      title: unitTitle,
      description: unitDescription,
      lecture_content_markdown: lectureMarkdown,
      is_template: true
    }
  });
  console.log(`✅ Created Learning Unit: ${unit.id}`);

  // 2. Create Daily Student Assignment
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: studentId,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: new Date(assignedDate),
      custom_session_minutes: timeLimitMinutes,
      teacher_daily_note: teacherNote || 'Con hoàn thành bài tập đầy đủ và đối chiếu đáp án chi tiết nhé!',
      is_published: true
    }
  });
  console.log(`✅ Created Daily Assignment: ${assignment.id}`);

  // 3. Create Assessment
  const assessment = await prisma.assessments.create({
    data: {
      unit_id: unit.id,
      created_by: CONSTANTS.TEACHER_ID,
      title: assessmentTitle || `Luyện tập tại lớp: ${unitTitle} (${questions.length} câu)`,
      type: 'IN_SESSION_90M',
      time_limit_minutes: timeLimitMinutes,
      max_score: 10
    }
  });
  console.log(`✅ Created Assessment: ${assessment.id}`);

  // 4. Batch Create Questions
  if (questions.length > 0) {
    const pointsPerQuestion = Number((10 / questions.length).toFixed(4));
    const questionRecords = questions.map((q, idx) => ({
      assessment_id: assessment.id,
      content: q.content,
      question_type: 'MULTIPLE_CHOICE',
      options: q.options,
      correct_answer: q.correctAnswer,
      explanation: q.explanation || 'Đáp án chính xác được Thầy Thức biên soạn.',
      points: pointsPerQuestion,
      order_index: idx + 1
    }));

    await prisma.questions.createMany({
      data: questionRecords
    });
    console.log(`✅ Inserted ${questions.length} Questions with explanations.`);
  }

  // 5. Create Assessment Attempt
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: studentId,
      status: 'IN_PROGRESS',
      max_score: 10
    }
  });
  console.log(`✅ Created Assessment Attempt: ${attempt.id}`);

  console.log('\n🎉 ALL DONE! Assignment card successfully created and ready for student.\n');
  return { unitId: unit.id, assignmentId: assignment.id, assessmentId: assessment.id, attemptId: attempt.id };
}

// Parse args
const payloadIdx = process.argv.indexOf('--payload');
if (payloadIdx === -1 || !process.argv[payloadIdx + 1]) {
  console.error('Usage: node seed_english_lesson.js --payload <path_to_payload.json>');
  process.exit(1);
}

const payloadPath = path.resolve(process.cwd(), process.argv[payloadIdx + 1]);
const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));

seed(payload)
  .catch(err => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
