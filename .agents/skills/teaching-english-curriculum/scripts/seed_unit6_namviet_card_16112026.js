#!/usr/bin/env node

/**
 * SEED SCRIPT: UNIT 6 LECTURE CARD FOR NAM VIỆT (16/11/2026)
 * Thầy Thức - Tiếng Anh 12 (Global Success - Unit 6: Artificial Intelligence, Pages 78-85)
 * Yêu cầu: 20 từ vựng cốt lõi + Ngữ pháp thể sai khiến (Active/Passive Causatives)
 * Lưu ý: Khoan làm phần bài tập.
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, '../../../../backend/node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: 'd76bd9d6-6cf5-409c-847b-b0e5c07a0876', // Bạn Nam Việt (Lớp 12)
  SUBJECT_ID: 'a15d4b19-412a-4bff-acd5-86714381b7af', // ENG_12
  ASSIGNED_DATE: new Date('2026-11-16T00:00:00.000Z')
};

const markdownPath = path.join(__dirname, 'unit6_namviet_card_16112026.md');
const LECTURE_CONTENT_MARKDOWN = fs.readFileSync(markdownPath, 'utf8');

async function main() {
  console.log('🚀 Đang kiểm tra và tạo card học ngày 16/11/2026 cho Bạn Nam Việt...');

  const startOfDay = new Date('2026-11-16T00:00:00.000Z');
  const endOfDay = new Date('2026-11-16T23:59:59.999Z');

  // 1. Kiểm tra xem đã có card ngày 16/11/2026 chưa
  const existingAssignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: { gte: startOfDay, lte: endOfDay }
    },
    include: { learning_units: true }
  });

  const assignmentTitle = 'Unit 6: Artificial Intelligence - Cẩm Nang 20 Từ Vựng Cốt Lõi (SGK Trang 78-85) & Thể Sai Khiến (Causatives)';
  const assignmentDesc = 'Chuyên đề Unit 6 Tiếng Anh 12: Làm chủ 20 từ vựng cốt lõi về Trí tuệ nhân tạo (SGK Global Success trang 78-85), nắm vững Thể sai khiến chủ động & bị động (have sb do / get sb to do / have sth done) cùng chuyên đề giao tiếp ngắt lời lịch sự.';
  const teacherNote = 'Thầy Thức dặn Nam Việt: Hôm nay con bước vào bài học ngày 16/11/2026 với chuyên đề Unit 6: Artificial Intelligence (SGK trang 78-85). Thầy đã biên soạn 20 từ vựng cốt lõi then chốt nhất về Trí tuệ nhân tạo và hệ thống toàn bộ lý thuyết Thể sai khiến (Active & Passive Causatives) cùng mẹo làm bài thi THPTQG. Con hãy đọc kỹ cẩm nang bài giảng này và bấm nút "Vào phòng học tương tác" để ôn luyện thẻ flashcard 3D nhé. Phần bài tập thầy sẽ giao ở buổi tiếp theo!';

  if (existingAssignment) {
    console.log(`⚠️ Đã tồn tại bài học ngày 16/11/2026 (ID: ${existingAssignment.id}). Cập nhật nội dung bài giảng...`);

    // Cập nhật learning_unit
    await prisma.learning_units.update({
      where: { id: existingAssignment.learning_unit_id },
      data: {
        title: assignmentTitle,
        description: assignmentDesc,
        lecture_content_markdown: LECTURE_CONTENT_MARKDOWN
      }
    });

    // Cập nhật daily assignment
    await prisma.daily_student_assignments.update({
      where: { id: existingAssignment.id },
      data: {
        teacher_daily_note: teacherNote,
        is_published: true
      }
    });

    console.log('✅ Đã cập nhật thành công bài học ngày 16/11/2026!');
    return;
  }

  // 2. Tạo mới Learning Unit
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: assignmentTitle,
      description: assignmentDesc,
      lecture_content_markdown: LECTURE_CONTENT_MARKDOWN,
      is_template: true
    }
  });
  console.log(`✅ Đã tạo Learning Unit: ${unit.id}`);

  // 3. Tạo Daily Student Assignment (Khoan làm bài tập - chỉ có bài giảng lý thuyết)
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: CONSTANTS.ASSIGNED_DATE,
      custom_session_minutes: 60,
      teacher_daily_note: teacherNote,
      is_published: true
    }
  });
  console.log(`✅ Đã tạo Daily Assignment card ngày 16/11/2026: ${assignment.id}`);

  console.log('\n🎉 HOÀN THÀNH TẠO CARD BÀI GIẢNG UNIT 6 CHO BẠN NAM VIỆT NGÀY 16/11/2026!\n');
}

main()
  .catch(err => {
    console.error('❌ Lỗi tạo bài giảng:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
