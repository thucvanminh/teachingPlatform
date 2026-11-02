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
    nam_viet: 'd76bd9d6-6cf5-409c-847b-b0e5c07a0876'  // Lớp 12
  },
  SUBJECTS: {
    11: 'f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0',       // ENG_11
    12: 'a15d4b19-412a-4bff-acd5-86714381b7af'        // ENG_12
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

  // Look up student from DB or constants
  let student = await prisma.users.findUnique({
    where: { username: studentUsername }
  });
  const studentId = student ? student.id : CONSTANTS.STUDENTS[studentUsername];
  if (!studentId) {
    throw new Error(`Unknown student username: "${studentUsername}". Expected "thai" or "nam_viet".`);
  }

  // Look up subject from DB or constants
  let subject = await prisma.subjects.findFirst({
    where: { code: `ENG_${grade}` }
  });
  const subjectId = subject ? subject.id : CONSTANTS.SUBJECTS[grade];
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
      learning_unit_id: unit.id,
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
      order_index: idx + 1,
      type: 'MULTIPLE_CHOICE',
      points: pointsPerQuestion,
      question_payload: {
        content_markdown: q.content,
        options: q.options,
        correct_option_id: q.correctAnswer
      },
      grading_key_payload: {
        correct_option_id: q.correctAnswer,
        explanation_markdown: q.explanation || 'Đáp án chính xác được Thầy Thức biên soạn.'
      }
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
      status: 'NOT_STARTED',
      total_score: 0.0
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
