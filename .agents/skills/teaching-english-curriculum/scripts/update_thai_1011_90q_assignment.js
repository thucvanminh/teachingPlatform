#!/usr/bin/env node

/**
 * Script to update student Thái's assignment and assessment for 10/11/2026 with 90 comprehensive questions.
 * (60 Vocabulary questions + 30 Word Form questions)
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, '../../../../backend/node_modules/@prisma/client'));
const prisma = new PrismaClient();

async function main() {
  const payloadPath = path.resolve(__dirname, 'payload_thai_1011_90q.json');
  if (!fs.existsSync(payloadPath)) {
    throw new Error(`Payload file not found: ${payloadPath}`);
  }

  const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
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

  const student = await prisma.users.findUnique({
    where: { username: studentUsername }
  });
  if (!student) {
    throw new Error(`Student ${studentUsername} not found.`);
  }

  const dateObj = new Date(assignedDate);
  console.log(`🔍 Checking existing assignment for ${student.username} on ${dateObj.toISOString()}...`);

  let assignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: student.id,
      assigned_date: dateObj
    },
    include: {
      learning_units: true,
      assessment_attempts: {
        include: {
          assessments: true
        }
      }
    }
  });

  if (!assignment) {
    throw new Error(`No assignment found for ${studentUsername} on ${assignedDate}`);
  }

  console.log(`📌 Found assignment ID: ${assignment.id}`);

  // 1. Update Learning Unit
  if (assignment.learning_unit_id) {
    await prisma.learning_units.update({
      where: { id: assignment.learning_unit_id },
      data: {
        title: unitTitle,
        description: unitDescription,
        lecture_content_markdown: lectureMarkdown
      }
    });
    console.log(`✅ Updated Learning Unit: ${assignment.learning_unit_id}`);
  }

  // 2. Update Daily Assignment
  await prisma.daily_student_assignments.update({
    where: { id: assignment.id },
    data: {
      custom_session_minutes: timeLimitMinutes,
      teacher_daily_note: teacherNote
    }
  });
  console.log(`✅ Updated Daily Assignment note and time limit to ${timeLimitMinutes}m.`);

  // 3. Update Assessment
  if (assignment.assessment_attempts.length === 0) {
    throw new Error('No assessment attempts found on assignment.');
  }

  const assessmentId = assignment.assessment_attempts[0].assessment_id;
  await prisma.assessments.update({
    where: { id: assessmentId },
    data: {
      title: assessmentTitle,
      time_limit_minutes: timeLimitMinutes,
      max_score: 10
    }
  });
  console.log(`✅ Updated Assessment ${assessmentId} metadata.`);

  // 4. Delete existing questions and student answers
  await prisma.student_answers.deleteMany({
    where: { attempt_id: assignment.assessment_attempts[0].id }
  });
  await prisma.questions.deleteMany({
    where: { assessment_id: assessmentId }
  });
  console.log(`🗑️ Cleared previous questions from assessment.`);

  // 5. Reset attempt status
  await prisma.assessment_attempts.update({
    where: { id: assignment.assessment_attempts[0].id },
    data: {
      status: 'NOT_STARTED',
      started_at: null,
      submitted_at: null,
      time_spent_seconds: 0,
      auto_score: 0,
      manual_score: 0,
      total_score: 0
    }
  });
  console.log(`🔄 Reset assessment attempt to NOT_STARTED.`);

  // 6. Insert all 90 questions
  const pointsPerQuestion = Number((10 / questions.length).toFixed(4));
  const questionRecords = questions.map((q, idx) => ({
    assessment_id: assessmentId,
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

  console.log(`\n🎉 Successfully inserted ${questions.length} questions into Assessment ${assessmentId}!`);
}

main()
  .catch((e) => {
    console.error('❌ Error updating assignment:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
