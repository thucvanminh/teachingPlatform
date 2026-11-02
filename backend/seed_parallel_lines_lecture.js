// Lecture-only, non-destructive seeder. Preview first; pass --apply to publish.
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const title = 'Lesson 9: Parallel Lines & Recognition Tests';
const date = new Date('2026-11-01T00:00:00.000Z');
async function main() {
  const [student, teacher, subject] = await Promise.all([
    prisma.users.findUnique({ where: { username: 'keithley' } }),
    prisma.users.findUnique({ where: { username: 'teacher' } }),
    prisma.subjects.findUnique({ where: { code: 'MATH_7' } }),
  ]);
  if (!student || !teacher || !subject) throw new Error('Missing student, teacher or MATH_7 subject');
  const existing = await prisma.daily_student_assignments.findMany({
    where: { student_id: student.id, assigned_date: date },
    select: { id: true, learning_unit_id: true, learning_units: { select: { title: true } }, _count: { select: { assessment_attempts: true } } },
  });
  console.log(JSON.stringify({ date: '2026-11-01', student: student.username, existing }, null, 2));
  if (!process.argv.includes('--apply')) return;
  const matching = existing.filter(a => a.learning_units.title === title);
  if (matching.length > 1) throw new Error('Duplicate matching cards; refusing ambiguous update');
  const lecture = fs.readFileSync(path.join(__dirname, '../frontend/public/lectures/math7-parallel-lines/briefing.md'), 'utf8');
  const result = await prisma.$transaction(async tx => {
    // Serialize repeated runs for this exact lesson without deleting any records.
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(7112026)`;
    const prior = await tx.daily_student_assignments.findFirst({ where: { student_id: student.id, assigned_date: date, learning_units: { title } } });
    const data = { title, description: 'An interactive flight briefing: explore F-Z-U angle pairs, align parallel paths, build a proof and draw with a set square. Includes eight quick learning checks.', lecture_content_markdown: lecture };
    const unit = prior
      ? await tx.learning_units.update({ where: { id: prior.learning_unit_id }, data })
      : await tx.learning_units.create({ data: { ...data, subject_id: subject.id, created_by: teacher.id } });
    const note = 'Welcome aboard, Keithley! Explore the eight stations. Check angle positions, compare their values, then explain why the flight paths are parallel.';
    return tx.daily_student_assignments.upsert({
      where: { student_id_learning_unit_id_assigned_date: { student_id: student.id, learning_unit_id: unit.id, assigned_date: date } },
      create: { student_id: student.id, learning_unit_id: unit.id, assigned_by: teacher.id, assigned_date: date, teacher_daily_note: note, is_published: true },
      update: { teacher_daily_note: note, is_published: true },
      select: { id: true, assigned_date: true, is_published: true, learning_unit_id: true, _count: { select: { assessment_attempts: true } } },
    });
  });
  console.log('Published lecture card:', JSON.stringify(result));
}
main().catch(e => { console.error(e.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
