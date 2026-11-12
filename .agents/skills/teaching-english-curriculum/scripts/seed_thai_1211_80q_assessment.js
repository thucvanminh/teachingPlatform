/**
 * Script: Seed 80 Practice Questions Assessment for Student Thái (Grade 11) - 12/11/2026
 * Subject: ENG_11 (Global Success 11 - Unit 4: ASEAN and Viet Nam)
 * Grammar: Gerunds as Subjects & Objects + 24 Core Vocab
 */

const fs = require('fs');
const path = require('path');

let PrismaClient;
try {
  ({ PrismaClient } = require('@prisma/client'));
} catch (e) {
  ({ PrismaClient } = require('/home/dantey/Dantey/teaching/teachingPlatform/backend/node_modules/@prisma/client'));
}

const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '9208f557-3288-442e-accf-15fc8c763e68', // Bạn Thái (Lớp 11)
  SUBJECT_ID: 'f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0', // ENG_11
  ASSIGNMENT_ID: '72fd143c-3f97-45ef-87c7-bd3a906d68a9', // Assignment 12/11/2026
  LEARNING_UNIT_ID: '525dc2dd-840e-45a0-abab-7675a8149f1a', // Unit 4 Grammar & Vocab
  TOTAL_QUESTIONS: 80,
  TIME_LIMIT_MINUTES: 90,
  MAX_SCORE: 10.00
};

function getSectionName(index) {
  if (index <= 15) {
    return 'Phần 1: Danh động từ làm Chủ ngữ & Bổ ngữ (Gerunds as Subjects & Complements)';
  } else if (index <= 30) {
    return 'Phần 2: Danh động từ sau Giới từ & Cụm Giới từ (Gerunds after Prepositions)';
  } else if (index <= 45) {
    return 'Phần 3: Bẫy điểm 8.5+: Các cụm từ có Giới từ "TO" đi với V-ing (Critical "TO + V-ing")';
  } else if (index <= 60) {
    return 'Phần 4: Động từ đi với V-ing & Thành ngữ cố định (Verbs & Idioms + Gerunds)';
  } else if (index <= 70) {
    return 'Phần 5: 6 Cặp Động từ chuyển biến ý nghĩa & Thể bị động (Meaning-Shift Verbs & Passive Gerunds)';
  } else {
    return 'Phần 6: Viết lại câu tương đương & Danh động từ hoàn thành (Sentence Transformations & Perfect Gerunds)';
  }
}

async function main() {
  console.log('🚀 Bắt đầu quá trình nạp 80 câu hỏi trắc nghiệm cho bạn Thái ngày 12/11/2026...');

  const payloadPath = path.join(__dirname, 'payload_thai_1211_80q.json');
  if (!fs.existsSync(payloadPath)) {
    throw new Error(`Không tìm thấy file payload tại: ${payloadPath}`);
  }

  const rawData = fs.readFileSync(payloadPath, 'utf8');
  const questionsData = JSON.parse(rawData);

  if (questionsData.length !== CONSTANTS.TOTAL_QUESTIONS) {
    throw new Error(`Số lượng câu hỏi (${questionsData.length}) không khớp với yêu cầu (${CONSTANTS.TOTAL_QUESTIONS})!`);
  }

  console.log(`✅ Đã đọc thành công ${questionsData.length} câu hỏi từ payload JSON.`);

  // 1. Kiểm tra Assignment
  const assignment = await prisma.daily_student_assignments.findUnique({
    where: { id: CONSTANTS.ASSIGNMENT_ID },
    include: { learning_units: true }
  });

  if (!assignment) {
    throw new Error(`Không tìm thấy Assignment ID: ${CONSTANTS.ASSIGNMENT_ID}`);
  }

  console.log(`📌 Assignment tìm thấy: Ngày ${assignment.assigned_date.toISOString().split('T')[0]} - Unit: ${assignment.learning_units.title}`);

  // 2. Xóa các assessment cũ (nếu có) trên learning unit này để tránh trùng lặp
  const existingAssessments = await prisma.assessments.findMany({
    where: { learning_unit_id: CONSTANTS.LEARNING_UNIT_ID }
  });

  if (existingAssessments.length > 0) {
    console.log(`⚠️ Đang dọn dẹp ${existingAssessments.length} assessment cũ trên Unit...`);
    for (const oldAss of existingAssessments) {
      await prisma.assessment_attempts.deleteMany({ where: { assessment_id: oldAss.id } });
      await prisma.questions.deleteMany({ where: { assessment_id: oldAss.id } });
      await prisma.assessments.delete({ where: { id: oldAss.id } });
    }
  }

  // 3. Tạo mới Assessment
  const assessmentTitle = 'Luyện tập chuyên sâu: 80 Câu Ngữ Pháp Danh Động Từ (Gerunds) & 24 Từ Vựng Unit 4';
  const instructions = 'Bộ đề 80 câu trắc nghiệm bao trọn 6 chuyên đề Danh Động Từ (Gerunds) của Unit 4: Global Success 11, kết hợp nhuần nhuyễn 24 từ vựng ASEAN cốt lõi từ bài ngày 10/11. Hãy đọc kỹ từng câu, phân tích giới từ to và sắc thái của động từ để đạt điểm 8.5+ nhé!';

  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: CONSTANTS.LEARNING_UNIT_ID,
      type: 'IN_SESSION_90M',
      title: assessmentTitle,
      instructions: instructions,
      time_limit_minutes: CONSTANTS.TIME_LIMIT_MINUTES,
      max_score: CONSTANTS.MAX_SCORE
    }
  });

  console.log(`✅ Đã tạo Assessment mới thành công: ID = ${assessment.id}`);

  // 4. Nạp 80 câu hỏi vào bảng questions
  console.log('⏳ Đang nạp 80 câu hỏi vào cơ sở dữ liệu...');
  const pointsPerQuestion = CONSTANTS.MAX_SCORE / CONSTANTS.TOTAL_QUESTIONS; // 10 / 80 = 0.125

  let insertedCount = 0;
  for (let i = 0; i < questionsData.length; i++) {
    const q = questionsData[i];
    const orderIndex = i + 1;
    const sectionName = getSectionName(orderIndex);

    const questionPayload = {
      content_markdown: q.content,
      options: q.options,
      correct_option_id: q.correctAnswer,
      sectionName: sectionName
    };

    const gradingKeyPayload = {
      correct_option_id: q.correctAnswer,
      explanation_markdown: q.explanation
    };

    await prisma.questions.create({
      data: {
        assessment_id: assessment.id,
        order_index: orderIndex,
        type: 'MULTIPLE_CHOICE',
        points: pointsPerQuestion,
        question_payload: questionPayload,
        grading_key_payload: gradingKeyPayload
      }
    });
    insertedCount++;
  }

  console.log(`✅ Đã nạp thành công toàn bộ ${insertedCount} câu hỏi trắc nghiệm!`);

  // 5. Tạo Assessment Attempt sẵn sàng cho bạn Thái làm bài
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: CONSTANTS.STUDENT_ID,
      status: 'NOT_STARTED',
      total_score: 0.00,
      time_spent_seconds: 0
    }
  });

  console.log(`✅ Đã tạo Assessment Attempt cho bạn Thái: ID = ${attempt.id} (Status: NOT_STARTED)`);

  // 6. Cập nhật ghi chú của Thầy Thức trên Assignment
  const updatedNote = `Chào Thái! Thầy gửi em kế hoạch học tập ngày 12/11/2026:
1. Đọc kỹ cẩm nang 5 Chuyên đề Ngữ pháp Danh Động Từ (Gerunds) và bấm vào Phòng Học Tương Tác Unit 4 để luyện Active Recall 24 từ vựng ASEAN.
2. Hoàn thành bài kiểm tra 90 phút gồm 80 câu hỏi trắc nghiệm chuyên sâu (bao gồm câu phân loại 8.5+ về bẫy 'to + V-ing' và chuyển nghĩa động từ).
Chúc em học tốt và tự tin chinh phục điểm số cao nhất!`;

  await prisma.daily_student_assignments.update({
    where: { id: assignment.id },
    data: {
      teacher_daily_note: updatedNote,
      custom_session_minutes: 90
    }
  });

  console.log('✅ Đã cập nhật ghi chú của Thầy Thức trên Daily Assignment thành công!');
  console.log('\n🎉 HOÀN THÀNH XUẤT SẮC TOÀN BỘ QUÁ TRÌNH SEED DỮ LIỆU BÀI TẬP 12/11/2026!');
}

main()
  .catch((err) => {
    console.error('❌ Lỗi khi thực thi seed script:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
