#!/usr/bin/env node

/**
 * SEED SCRIPT: 100-QUESTION PRACTICE ASSESSMENT FOR NAM VIỆT (16/11/2026)
 * Unit 6: Artificial Intelligence - 20 Core Vocabularies & Causatives
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
  ASSIGNED_DATE: new Date('2026-11-16T00:00:00.000Z')
};

async function main() {
  const payloadPath = path.resolve(__dirname, '../../.agents/skills/teaching-english-curriculum/scripts/payload_eng12_unit6_namviet_100q.json');
  if (!fs.existsSync(payloadPath)) {
    throw new Error(`Tệp payload không tồn tại: ${payloadPath}`);
  }

  const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
  const {
    studentUsername,
    grade,
    assessmentTitle,
    timeLimitMinutes = 90,
    questions = []
  } = payload;

  console.log(`🚀 Bắt đầu seed bộ ${questions.length} câu hỏi bài tập cho học sinh Nam Việt (${CONSTANTS.STUDENT_ID})...`);

  // 1. Tìm Assignment ngày 16/11/2026
  const startOfDay = new Date('2026-11-16T00:00:00.000Z');
  const endOfDay = new Date('2026-11-16T23:59:59.999Z');

  const assignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: { gte: startOfDay, lte: endOfDay }
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
    throw new Error('❌ Không tìm thấy assignment card ngày 16/11/2026 cho Bạn Nam Việt! Vui lòng kiểm tra lại.');
  }

  console.log(`📌 Tìm thấy Assignment ID: ${assignment.id}, Learning Unit ID: ${assignment.learning_unit_id}`);

  // Cập nhật lời dặn của Thầy Thức để hướng dẫn học sinh làm bài tập
  await prisma.daily_student_assignments.update({
    where: { id: assignment.id },
    data: {
      custom_session_minutes: timeLimitMinutes,
      teacher_daily_note: 'Thầy Thức dặn Nam Việt: Sau khi con đã ôn tập cẩm nang lý thuyết và học từ vựng 3D ở Trạm 1, con hãy bước ngay vào Trạm 2: Đấu trường 100 câu luyện tập tại lớp (70 câu 20 từ vựng cốt lõi + 30 câu Thể sai khiến Active & Passive Causatives & Giao tiếp trang 84). Hãy đọc kỹ từng lời giải thích chi tiết sau mỗi câu để bứt phá điểm số thi THPT Quốc Gia nhé!'
    }
  });

  // 2. Kiểm tra hoặc tạo Assessment
  let assessment = await prisma.assessments.findFirst({
    where: {
      learning_unit_id: assignment.learning_unit_id,
      type: 'IN_SESSION_90M'
    }
  });

  if (assessment) {
    console.log(`🔄 Đã có Assessment ID: ${assessment.id}. Tiến hành cập nhật thông tin...`);
    assessment = await prisma.assessments.update({
      where: { id: assessment.id },
      data: {
        title: assessmentTitle,
        time_limit_minutes: timeLimitMinutes,
        max_score: 10.00
      }
    });
  } else {
    console.log(`✨ Đang tạo mới Assessment cho Learning Unit ${assignment.learning_unit_id}...`);
    assessment = await prisma.assessments.create({
      data: {
        learning_unit_id: assignment.learning_unit_id,
        title: assessmentTitle,
        type: 'IN_SESSION_90M',
        time_limit_minutes: timeLimitMinutes,
        max_score: 10.00
      }
    });
    console.log(`✅ Đã tạo Assessment mới ID: ${assessment.id}`);
  }

  // 3. Kiểm tra hoặc tạo Assessment Attempt
  let attempt = await prisma.assessment_attempts.findFirst({
    where: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: CONSTANTS.STUDENT_ID
    }
  });

  if (attempt) {
    console.log(`🔄 Đã có Assessment Attempt ID: ${attempt.id}. Làm sạch câu trả lời cũ...`);
    await prisma.student_answers.deleteMany({
      where: { attempt_id: attempt.id }
    });
    await prisma.assessment_attempts.update({
      where: { id: attempt.id },
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
  } else {
    attempt = await prisma.assessment_attempts.create({
      data: {
        daily_assignment_id: assignment.id,
        assessment_id: assessment.id,
        student_id: CONSTANTS.STUDENT_ID,
        status: 'NOT_STARTED',
        total_score: 0.0
      }
    });
    console.log(`✅ Đã tạo Assessment Attempt mới ID: ${attempt.id}`);
  }

  // 4. Xóa câu hỏi cũ của assessment nếu có
  const deletedQuestions = await prisma.questions.deleteMany({
    where: { assessment_id: assessment.id }
  });
  console.log(`🗑️ Đã dọn sạch ${deletedQuestions.count} câu hỏi cũ trong assessment.`);

  // 5. Chuẩn bị 100 câu hỏi
  const pointsPerQuestion = Number((10 / questions.length).toFixed(4));
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

  // 6. Nạp hàng loạt vào database
  console.log(`📥 Đang nạp ${questionRecords.length} câu hỏi vào bảng questions...`);
  await prisma.questions.createMany({
    data: questionRecords
  });

  const verifiedCount = await prisma.questions.count({
    where: { assessment_id: assessment.id }
  });

  console.log(`\n🎉 THÀNH CÔNG RỰC RỠ!`);
  console.log(`- Assessment ID: ${assessment.id}`);
  console.log(`- Tiêu đề: ${assessment.title}`);
  console.log(`- Số lượng câu hỏi đã nạp: ${verifiedCount}/${questions.length} câu`);
  console.log(`- Điểm mỗi câu: ${pointsPerQuestion} điểm`);
  console.log(`- Attempt ID: ${attempt.id} (Trạng thái: NOT_STARTED)`);
  console.log(`- Đường dẫn làm bài: /student/mission/${attempt.id}\n`);
}

main()
  .catch((err) => {
    console.error('❌ Lỗi khi seed assessment:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
