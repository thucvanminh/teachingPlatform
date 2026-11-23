#!/usr/bin/env node

/**
 * SEED SCRIPT: 80-QUESTION PRACTICE ASSESSMENT FOR NAM VIỆT (23/11/2026)
 * Unit 7: The World of Mass Media (Review Card 17/11 + 2025 THPTQG Form - Basic Vocabulary)
 * Không có phần bài giảng (lecture_content_markdown: null)
 * Thầy Thức - Tiếng Anh 12 (Global Success)
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: 'd76bd9d6-6cf5-409c-847b-b0e5c07a0876', // Bạn Nam Việt (Lớp 12)
  SUBJECT_ID: 'a15d4b19-412a-4bff-acd5-86714381b7af', // ENG_12
  ASSIGNED_DATE: new Date('2026-11-23T00:00:00.000Z')
};

async function main() {
  console.log(`🚀 Bắt đầu tạo Card Luyện Tập 80 Câu ngày 23/11/2026 cho Bạn Nam Việt (${CONSTANTS.STUDENT_ID})...`);

  // 1. Đọc bộ 80 câu hỏi
  const questionsPath = path.resolve(__dirname, 'questions_data_80_23112026.json');
  if (!fs.existsSync(questionsPath)) {
    throw new Error(`Tệp ${questionsPath} không tồn tại!`);
  }
  const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
  if (questions.length !== 80) {
    throw new Error(`Cần đúng 80 câu hỏi, hiện có ${questions.length} câu!`);
  }
  console.log(`📋 Đã tải ${questions.length} câu hỏi đạt chuẩn.`);

  // Kiểm tra xem ngày 23/11/2026 đã có assignment nào chưa để tránh trùng lặp
  const startOfDay = new Date('2026-11-23T00:00:00.000Z');
  const endOfDay = new Date('2026-11-23T23:59:59.999Z');
  const existingAssignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: { gte: startOfDay, lte: endOfDay }
    }
  });

  if (existingAssignment) {
    console.log(`⚠️ Đã tồn tại Assignment ngày 23/11/2026 (${existingAssignment.id}), tiến hành dọn dẹp để tạo lại sạch sẽ...`);
    await prisma.daily_student_assignments.delete({ where: { id: existingAssignment.id } });
    await prisma.learning_units.delete({ where: { id: existingAssignment.learning_unit_id } }).catch(() => {});
  }

  // 2. Tạo Learning Unit (KHÔNG CÓ PHẦN BÀI GIẢNG)
  console.log(`📝 Đang tạo Learning Unit (Exercise Only - No Lecture)...`);
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: "Unit 7: Luyện Tập 80 Câu Đa Dạng & Đề Thi Form THPTQG 2025 (Từ Vựng Basic)",
      description: "Buổi luyện tập chuyên sâu 80 câu (không có bài giảng mới): 40 câu ôn chắc 20 từ vựng Card 17/11, 10 câu chia từ loại, đồng/trái nghĩa, giao tiếp và ngữ pháp Unit 7 (SGK 91-98 & SBT 81-89) + 40 câu Đề Thi Chuẩn Form THPTQG 2025 phiên bản từ vựng basic.",
      lecture_content_markdown: null,
      is_template: true
    }
  });
  console.log(`✅ Đã tạo Learning Unit ID: ${learningUnit.id}`);

  // 3. Tạo Daily Student Assignment cho ngày 23/11/2026
  console.log(`📅 Đang tạo Daily Student Assignment cho ngày 23/11/2026...`);
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: learningUnit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: CONSTANTS.ASSIGNED_DATE,
      custom_session_minutes: 90,
      teacher_daily_note: "Thầy Thức dặn Nam Việt: Buổi học ngày 23/11/2026 hôm nay tập trung 100% vào thực hành giải đề (không có bài giảng mới). Thầy đã soạn đủ 80 câu bằng từ vựng cơ bản, dễ hiểu nhất để con tự tin làm bài: 40 câu đầu ôn chắc 20 từ vựng Card 17/11, 10 câu Word Form và ngữ pháp Unit 7; 40 câu sau mô phỏng chuẩn cấu trúc Đề Thi THPTQG 2025 (Thông báo, Tờ rơi, Sắp xếp hội thoại/đoạn văn, Điền khuyết câu và 2 bài Đọc hiểu 8 & 10 câu). Con làm thật cẩn thận nhé!",
      is_published: true
    }
  });
  console.log(`✅ Đã tạo Assignment ID: ${assignment.id}`);

  // 4. Tạo Assessment (80 câu, 90 phút, 10 điểm)
  console.log(`🎯 Đang tạo Assessment (80 câu)...`);
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      title: "Đấu Trường 80 Câu: Ôn Tập Unit 7 & Đề Thi Form THPTQG 2025 (Từ Vựng Basic)",
      type: "IN_SESSION_90M",
      time_limit_minutes: 90,
      max_score: 10.00
    }
  });
  console.log(`✅ Đã tạo Assessment ID: ${assessment.id}`);

  // 5. Nạp 80 câu hỏi
  const pointsPerQuestion = 10.0 / questions.length; // 0.125 điểm / câu
  const questionRecords = questions.map((q, idx) => ({
    assessment_id: assessment.id,
    order_index: idx + 1,
    type: 'MULTIPLE_CHOICE',
    points: pointsPerQuestion,
    question_payload: {
      content_markdown: q.content,
      options: q.options,
      correct_option_id: q.correctAnswer,
      section_name: q.sectionName
    },
    grading_key_payload: {
      correct_option_id: q.correctAnswer,
      explanation_markdown: q.explanation || 'Đáp án chính xác được Thầy Thức biên soạn.'
    }
  }));

  console.log(`📥 Đang nạp 80 câu hỏi vào bảng questions...`);
  await prisma.questions.createMany({
    data: questionRecords
  });

  const verifiedCount = await prisma.questions.count({
    where: { assessment_id: assessment.id }
  });
  console.log(`✅ Đã nạp thành công ${verifiedCount}/80 câu hỏi vào database!`);

  // 6. Tạo Assessment Attempt (NOT_STARTED)
  console.log(`⏳ Đang tạo Assessment Attempt (NOT_STARTED)...`);
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: CONSTANTS.STUDENT_ID,
      status: 'NOT_STARTED',
      total_score: 0.0
    }
  });
  console.log(`✅ Đã tạo Assessment Attempt ID: ${attempt.id}`);

  console.log(`\n🎉🎉🎉 HOÀN THÀNH TẠO CARD 23/11/2026 CHO BẠN NAM VIỆT!`);
  console.log(`- Assignment ID: ${assignment.id}`);
  console.log(`- Learning Unit ID: ${learningUnit.id}`);
  console.log(`- Assessment ID: ${assessment.id}`);
  console.log(`- Số câu hỏi: ${verifiedCount} câu`);
  console.log(`- Link làm bài tập: /student/mission/${attempt.id}`);
}

main()
  .catch(err => {
    console.error("❌ Lỗi khi seed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
