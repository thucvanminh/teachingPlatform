#!/usr/bin/env node

/**
 * SEED SCRIPT: UNIT 7 LECTURE CARD FOR NAM VIỆT (17/11/2026)
 * Thầy Thức - Tiếng Anh 12 (Global Success - Unit 7: The World of Mass Media, Pages 90-101)
 * Yêu cầu: 20 từ vựng cốt lõi + Ngữ pháp Mệnh đề trạng ngữ chỉ cách thức (as if/were) & kết quả (so/such...that), đảo ngữ.
 * Lưu ý: Chỉ tạo phần bài giảng lý thuyết (khoan làm bài tập).
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, '../../../../backend/node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: 'd76bd9d6-6cf5-409c-847b-b0e5c07a0876', // Bạn Nam Việt (Lớp 12)
  SUBJECT_ID: 'a15d4b19-412a-4bff-acd5-86714381b7af', // ENG_12
  ASSIGNED_DATE: new Date('2026-11-17T00:00:00.000Z')
};

const markdownPath = path.join(__dirname, 'unit7_namviet_card_17112026.md');
const LECTURE_CONTENT_MARKDOWN = fs.readFileSync(markdownPath, 'utf8');

async function main() {
  console.log('🚀 Đang kiểm tra và tạo card học ngày 17/11/2026 cho Bạn Nam Việt...');

  const startOfDay = new Date('2026-11-17T00:00:00.000Z');
  const endOfDay = new Date('2026-11-17T23:59:59.999Z');

  // 1. Kiểm tra xem đã có card ngày 17/11/2026 chưa
  const existingAssignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: { gte: startOfDay, lte: endOfDay }
    },
    include: { learning_units: true }
  });

  const assignmentTitle = 'Unit 7: The World of Mass Media - Cẩm Nang 20 Từ Vựng Cốt Lõi (SGK Trang 90-101) & Mệnh Đề Chỉ Cách Thức, Kết Quả';
  const assignmentDesc = 'Chuyên đề Unit 7 Tiếng Anh 12: Làm chủ 20 từ vựng cốt lõi về Truyền thông đại chúng (SGK Global Success trang 90-101), nắm vững Mệnh đề trạng ngữ chỉ cách thức (as, just as, like, as if/were), Mệnh đề chỉ kết quả (so/such...that), Đảo ngữ và 4 dạng viết lại câu kinh điển thi THPTQG.';
  const teacherNote = 'Thầy Thức dặn Nam Việt: Hôm nay con bước vào bài học ngày 17/11/2026 với chuyên đề Unit 7: The World of Mass Media (SGK trang 90-101). Thầy đã biên soạn 20 từ vựng cốt lõi then chốt nhất về Truyền thông đại chúng và hệ thống toàn bộ lý thuyết Mệnh đề trạng ngữ chỉ cách thức (as if/were), Mệnh đề chỉ kết quả (so/such...that), Đảo ngữ cùng mẹo làm bài thi THPTQG có giải thích chi tiết. Con hãy đọc kỹ cẩm nang bài giảng này và bấm nút "Vào phòng học tương tác" để ôn luyện thẻ flashcard 3D nhé. Phần bài tập trắc nghiệm thầy sẽ giao ở buổi tiếp theo!';

  if (existingAssignment) {
    console.log(`⚠️ Đã tồn tại bài học ngày 17/11/2026 (ID: ${existingAssignment.id}). Cập nhật nội dung bài giảng...`);

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

    console.log('✅ Đã cập nhật thành công bài học ngày 17/11/2026!');
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

  // 3. Tạo Daily Student Assignment (Chỉ có bài giảng lý thuyết theo yêu cầu)
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
  console.log(`✅ Đã tạo Daily Assignment card ngày 17/11/2026: ${assignment.id}`);

  console.log('\n🎉 HOÀN THÀNH TẠO CARD BÀI GIẢNG UNIT 7 CHO BẠN NAM VIỆT NGÀY 17/11/2026!\n');
}

main()
  .catch(err => {
    console.error('❌ Lỗi tạo bài giảng:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
