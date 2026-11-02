// Update notation in the existing Lesson 9 content without recreating questions.
const path = require('node:path');
const assert = require('node:assert/strict');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });
const { PrismaClient } = require('@prisma/client');
const { overheadAngles } = require('./parallel_angle_notation');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: (process.env.DATABASE_URL || '') + (process.env.DATABASE_URL?.includes('?') ? '&' : '?') + 'connect_timeout=30&pool_timeout=30',
    },
  },
});

async function main() {
  const apply = process.argv.includes('--apply');
  const result = await prisma.$transaction(async tx => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(7112027)`;
    const cards = await tx.daily_student_assignments.findMany({
      where: {
        users_daily_student_assignments_student_idTousers: { username: 'keithley' },
        assigned_date: new Date('2026-11-01T00:00:00Z'),
        learning_units: { title: 'Lesson 9: Parallel Lines & Recognition Tests' },
      },
      include: { learning_units: true },
    });
    assert.equal(cards.length, 1, 'Expected exactly one Keithley Lesson 9 card');
    const unit = cards[0].learning_units;
    const assessments = await tx.assessments.findMany({
      where: { learning_unit_id: unit.id, type: 'IN_SESSION_90M' },
      include: { questions: true },
    });
    assert.equal(assessments.length, 1, 'Expected one practice assessment');
    const assessment = assessments[0];
    assert.equal(assessment.title, 'Parallel Paths Expedition: 90-Minute Practice');
    assert.equal(assessment.questions.length, 35);
    const learnerState = () => tx.assessment_attempts.findMany({
      where: { assessment_id: assessment.id },
      orderBy: { id: 'asc' },
      include: { student_answers: { orderBy: { id: 'asc' } } },
    });
    const before = await learnerState();
    let changedQuestions = 0;
    for (const q of assessment.questions) {
      const current = { question_payload: q.question_payload, grading_key_payload: q.grading_key_payload };
      const next = overheadAngles(current);
      if (q.type === 'MULTIPLE_CHOICE' && q.grading_key_payload?.correct_option_id && !next.question_payload.correct_option_id) {
        next.question_payload.correct_option_id = q.grading_key_payload.correct_option_id;
      }
      if (JSON.stringify(current) === JSON.stringify(next)) continue;
      changedQuestions++;
      if (apply) await tx.questions.update({ where: { id: q.id }, data: next });
    }
    const lecture = overheadAngles(unit.lecture_content_markdown);
    const changedLecture = lecture !== unit.lecture_content_markdown;
    if (apply && changedLecture) {
      await tx.learning_units.update({ where: { id: unit.id }, data: { lecture_content_markdown: lecture } });
    }
    assert.deepEqual(await learnerState(), before, 'Learner answers and progress must remain unchanged');
    return { mode: apply ? 'applied' : 'preview', changedQuestions, changedLecture, learnerStateUnchanged: true };
  }, { isolationLevel: 'RepeatableRead', timeout: 30000 });
  console.log(JSON.stringify(result));
}

main().catch(e => { console.error(e.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
