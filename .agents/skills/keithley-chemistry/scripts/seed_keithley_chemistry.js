#!/usr/bin/env node

/**
 * CLI HELPER: SEED COSMIC CHEMISTRY MISSIONS & LECTURES FOR KEITHLEY LAKE (GRADE 9 / CHEM_9)
 * Usage: node seed_keithley_chemistry.js --payload <path_to_payload.json>
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, '../../../../backend/node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake (keithley)
  SUBJECT_ID: '6fc7387b-13b8-4e27-8240-a60c03dc1d51', // CHEM_9 (Hóa học 9)
  STUDENT_USERNAME: 'keithley',
  SUBJECT_CODE: 'CHEM_9'
};

async function seed(payload) {
  const {
    mode = 'BOTH', // 'BOTH' | 'EXERCISE_ONLY' | 'LECTURE_ONLY'
    assignedDate,
    unitTitle,
    unitDescription,
    lectureMarkdown,
    lectureAttachments = [],
    teacherNote,
    assessmentTitle,
    assessmentDescription,
    timeLimitMinutes = 90,
    maxScore = 10.0,
    questions = []
  } = payload;

  if (!assignedDate) throw new Error('Missing required field: "assignedDate" (format: YYYY-MM-DD)');
  if (!unitTitle) throw new Error('Missing required field: "unitTitle"');

  const hasExercises = mode !== 'LECTURE_ONLY' && Array.isArray(questions) && questions.length > 0;
  if (mode !== 'LECTURE_ONLY' && (!questions || questions.length === 0)) {
    throw new Error('Questions array cannot be empty when mode is "BOTH" or "EXERCISE_ONLY"');
  }

  const targetDate = new Date(`${assignedDate.split('T')[0]}T00:00:00.000Z`);

  console.log('===============================================================');
  console.log(`🚀 [Keithley Chemistry Seed] Space Chemistry Mission Deployment`);
  console.log(`👨‍🚀 Astronaut Cadet: Keithley Lake (@${CONSTANTS.STUDENT_USERNAME})`);
  console.log(`📅 Target Date: ${assignedDate} | Mode: ${mode}`);
  console.log(`🧪 Subject: ${CONSTANTS.SUBJECT_CODE} (Hóa học 9)`);
  if (hasExercises) {
    console.log(`🎯 Total Cosmic Problems: ${questions.length} | Session: ${timeLimitMinutes}m`);
  }
  console.log('===============================================================');

  // 1. Clean up existing CHEM_9 assignments & attempts for Keithley on target date
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
    console.log(`⚠️ Found ${existingAsgns.length} previous CHEM_9 assignment(s) on ${assignedDate}. Cleaning up...`);
    for (const asgn of existingAsgns) {
      for (const att of asgn.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: asgn.id } });
    }
    console.log(`✓ Cleaned previous mission records.`);
  }

  // 2. Create Learning Unit (Flight Briefing)
  const defaultBriefing = `# 🚀 Orbital Chemistry Briefing: ${unitTitle}\n\nReview telemetry and reaction stoichiometry before engaging orbital laboratory reactors.`;
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: unitTitle,
      description: unitDescription || 'Deep Space Chemistry Flight Briefing & Reactor Stoichiometry.',
      lecture_content_markdown: lectureMarkdown || defaultBriefing,
      lecture_attachments: lectureAttachments,
      is_template: true
    }
  });
  console.log(`✅ Created Learning Unit: ${unit.id} ("${unit.title}")`);

  // 3. Create Daily Student Assignment Card
  const defaultNote = hasExercises
    ? `🚀 Flight Telemetry Engaged! Welcome to your ${timeLimitMinutes}-minute In-Session Chemistry Practice, Astronaut Keithley! Review formulas and give it your best!`
    : `🚀 Orbital Flight Briefing Ready! Study the reaction stoichiometry and interactive laboratory telemetry, Astronaut Keithley!`;

  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: targetDate,
      custom_session_minutes: timeLimitMinutes,
      teacher_daily_note: teacherNote || defaultNote,
      is_published: true
    }
  });
  console.log(`✅ Created Daily Assignment Card: ${assignment.id}`);

  let assessment = null;
  let attempt = null;

  // 4. Create Assessment, Questions & Attempt if mode includes exercises
  if (hasExercises) {
    assessment = await prisma.assessments.create({
      data: {
        learning_unit_id: unit.id,
        type: 'IN_SESSION_90M',
        title: assessmentTitle || `Cosmic Chemistry Mission: ${unitTitle} (${timeLimitMinutes}m)`,
        instructions: assessmentDescription || `Timed orbital chemistry session with per-question chronometer controls. 100% English telemetry.`,
        time_limit_minutes: timeLimitMinutes,
        max_score: maxScore
      }
    });
    console.log(`✅ Created In-Session Assessment: ${assessment.id}`);

    // Bulk create questions ensuring correct_option_id is in question_payload for real-time sound & shake
    let order = 1;
    for (const q of questions) {
      const qType = q.type || 'MULTIPLE_CHOICE';
      const questionPayload = {
        content_markdown: q.content_markdown || q.prompt || '',
        sectionName: q.sectionName || `Sector ${Math.ceil(order / 4)}: Orbit Station ${order}`
      };

      if (q.passage) {
        questionPayload.passage = q.passage;
      }

      if (qType === 'MULTIPLE_CHOICE') {
        questionPayload.options = (q.options || []).map((opt) => ({
          id: opt.id,
          text: opt.text
        }));
        // CRITICAL FOR INSTANT SOUND FX & SHAKE ANIMATION ON MISTAKES:
        questionPayload.correct_option_id = q.correct_option_id || 'A';
      }

      let gradingPayload = {};
      if (qType === 'MULTIPLE_CHOICE') {
        gradingPayload = {
          correct_option_id: q.correct_option_id || 'A',
          explanation: q.explanation || 'Reaction stoichiometry verified by Orbital Command.'
        };
      } else if (qType === 'FILL_IN_BLANK') {
        gradingPayload = {
          acceptable_answers: Array.isArray(q.acceptable_answers)
            ? q.acceptable_answers
            : [String(q.expected_value || q.answer || '').trim()],
          explanation: q.explanation || 'Stoichiometric calculation key.'
        };
      } else if (qType === 'ESSAY_UPLOAD') {
        gradingPayload = {
          rubric_markdown: q.rubric || 'Balanced chemical equations and justified mass calculations.',
          explanation: q.explanation || 'Model chemical solution.'
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

    // 5. Initialize Assessment Attempt (NOT_STARTED)
    attempt = await prisma.assessment_attempts.create({
      data: {
        daily_assignment_id: assignment.id,
        assessment_id: assessment.id,
        student_id: CONSTANTS.STUDENT_ID,
        status: 'NOT_STARTED'
      }
    });
    console.log(`✅ Initialized Mission Attempt: ${attempt.id} (Status: NOT_STARTED)`);
  } else {
    console.log(`ℹ️ [Mode: LECTURE_ONLY] Skipped assessment & attempt generation as requested.`);
  }

  console.log('\n🎉 ALL SYSTEMS GO: Keithley Chemistry Mission deployed successfully!');
  return {
    unitId: unit.id,
    assignmentId: assignment.id,
    assessmentId: assessment?.id || null,
    attemptId: attempt?.id || null
  };
}

async function runCli() {
  const args = process.argv.slice(2);
  const payloadIdx = args.indexOf('--payload');

  if (payloadIdx === -1 || !args[payloadIdx + 1]) {
    console.error('❌ Error: Missing --payload argument.');
    console.log('Usage: node seed_keithley_chemistry.js --payload <path_to_payload.json>');
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
