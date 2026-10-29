#!/usr/bin/env node

/**
 * CLI HELPER: SEED COSMIC MATH MISSION FOR KEITHLEY LAKE (GRADE 7)
 * Usage: node seed_keithley_math.js --payload <path_to_payload.json>
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, '../../../../backend/node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake (keithley)
  SUBJECT_ID: 'b1cfb82f-fa75-47eb-ba05-7281f6d3fdf2', // MATH_7
  STUDENT_USERNAME: 'keithley'
};

async function seed(payload) {
  const {
    assignedDate,
    unitTitle,
    unitDescription,
    lectureMarkdown,
    teacherNote,
    assessmentTitle,
    assessmentDescription,
    timeLimitMinutes = 120,
    maxScore = 10.0,
    questions = []
  } = payload;

  if (!assignedDate) throw new Error('Missing "assignedDate" (YYYY-MM-DD)');
  if (!unitTitle) throw new Error('Missing "unitTitle"');
  if (!questions || questions.length === 0) throw new Error('Questions array cannot be empty');

  const targetDate = new Date(`${assignedDate.split('T')[0]}T00:00:00.000Z`);

  console.log(`🚀 [Keithley Math Seed] Launching Cosmic Mission for Astronaut Keithley Lake`);
  console.log(`📅 Target Flight Date: ${assignedDate} | Total Problems: ${questions.length}`);

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
    console.log(`⚠️ Existing assignment detected for date ${assignedDate}. Refreshing orbital data...`);
    for (const att of existingAsgn.assessment_attempts) {
      await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
      await prisma.assessment_attempts.delete({ where: { id: att.id } });
    }
    await prisma.daily_student_assignments.delete({ where: { id: existingAsgn.id } });
    console.log(`✓ Cleaned previous mission and attempts.`);
  }

  // 2. Create Learning Unit (Flight Briefing)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: unitTitle,
      description: unitDescription || 'Deep Space Mathematical Flight Briefing & Theoretical Foundations.',
      lecture_content_markdown: lectureMarkdown || '# Space Flight Briefing\nReview formulas and geometric properties.',
      lecture_attachments: payload.lectureAttachments || [],
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
      custom_session_minutes: timeLimitMinutes,
      teacher_daily_note: teacherNote || 'Review your orbital flight briefing carefully before initiating propulsion!',
      is_published: true
    }
  });
  console.log(`✅ Created Daily Mission Assignment: ${assignment.id}`);

  // 4. Create Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: assessmentTitle || `Cosmic Geometry Expedition: ${unitTitle}`,
      description: assessmentDescription || `Timed orbital math session (${timeLimitMinutes} minutes) with per-question telemetry.`,
      time_limit_minutes: timeLimitMinutes,
      max_score: maxScore,
      is_active: true
    }
  });
  console.log(`✅ Created In-Session Assessment: ${assessment.id}`);

  // 5. Bulk Create Questions
  let order = 1;
  for (const q of questions) {
    const qType = q.type || 'MULTIPLE_CHOICE';
    let questionPayload = {
      content_markdown: q.content_markdown || q.prompt || '',
      sectionName: q.sectionName || `Waypoint Sector ${Math.ceil(order / 4)}`
    };

    if (q.passage) {
      questionPayload.passage = q.passage;
    }

    if (qType === 'MULTIPLE_CHOICE') {
      questionPayload.options = q.options.map((opt) => ({
        id: opt.id,
        text: opt.text
      }));
    }

    let gradingPayload = {};
    if (qType === 'MULTIPLE_CHOICE') {
      gradingPayload = {
        correct_option_id: q.correct_option_id || 'A',
        explanation_markdown: q.explanation || 'Step-by-step solution verified by Tutor Command.'
      };
    } else if (qType === 'FILL_IN_BLANK') {
      gradingPayload = {
        acceptable_answers: Array.isArray(q.acceptable_answers)
          ? q.acceptable_answers
          : [String(q.expected_value || q.answer || '').trim()],
        explanation_markdown: q.explanation || 'Mathematical computation key.'
      };
    } else if (qType === 'ESSAY_UPLOAD') {
      gradingPayload = {
        rubric_markdown: q.rubric || 'Full step-by-step geometric proof and justified reasoning.',
        explanation_markdown: q.explanation || 'Model geometric solution.'
      };
    }

    await prisma.questions.create({
      data: {
        assessment_id: assessment.id,
        order_index: q.order_index || order,
        points: q.points || 0.35,
        type: qType,
        question_payload: questionPayload,
        grading_key_payload: gradingPayload
      }
    });

    order++;
  }
  console.log(`✅ Loaded ${questions.length} problems into Assessment questions.`);

  // 6. Create Initial Assessment Attempt
  const attempt = await prisma.assessment_attempts.create({
    data: {
      assessment_id: assessment.id,
      student_id: CONSTANTS.STUDENT_ID,
      assignment_id: assignment.id,
      status: 'NOT_STARTED',
      total_score: 0.0,
      time_spent_seconds: 0
    }
  });
  console.log(`✅ Initialized Mission Attempt: ${attempt.id} (Status: NOT_STARTED)`);

  return {
    unitId: unit.id,
    assignmentId: assignment.id,
    assessmentId: assessment.id,
    attemptId: attempt.id
  };
}

async function runCli() {
  const args = process.argv.slice(2);
  const payloadIdx = args.indexOf('--payload');

  if (payloadIdx === -1 || !args[payloadIdx + 1]) {
    console.error('❌ Error: Missing --payload argument.');
    console.log('Usage: node seed_keithley_math.js --payload <path_to_payload.json>');
    process.exit(1);
  }

  const payloadPath = path.resolve(process.cwd(), args[payloadIdx + 1]);
  if (!fs.existsSync(payloadPath)) {
    console.error(`❌ Error: Payload file not found at: ${payloadPath}`);
    process.exit(1);
  }

  try {
    const rawData = fs.readFileSync(payloadPath, 'utf8');
    const payload = JSON.parse(rawData);
    await seed(payload);
    console.log('\n🎉 ALL SYSTEMS GO! Keithley Math Mission successfully seeded.');
  } catch (err) {
    console.error('❌ Execution Error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  runCli();
}

module.exports = { seed, CONSTANTS };
