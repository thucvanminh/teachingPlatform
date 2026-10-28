import { PrismaClient, user_role, ui_mode, assessment_type, question_type, attempt_status } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Bắt đầu gieo mầm dữ liệu (Seeding database) ---');

  const defaultPasswordHash = await bcrypt.hash('Password123!', 10);

  // 1. Tạo Giáo viên
  const teacher = await prisma.users.upsert({
    where: { username: 'teacher' },
    update: {},
    create: {
      username: 'teacher',
      email: 'teacher@tutoring.com',
      password_hash: defaultPasswordHash,
      full_name: 'Thầy Minh (Gia Sư)',
      role: user_role.TEACHER,
    },
  });
  console.log('✓ Đã tạo Giáo viên:', teacher.full_name);

  // 2. Tạo Học sinh Lớp 2 (Toán 2)
  const studentG2 = await prisma.users.upsert({
    where: { username: 'student_g2' },
    update: {},
    create: {
      username: 'student_g2',
      password_hash: defaultPasswordHash,
      full_name: 'Bé An Nhiên (Lớp 2)',
      role: user_role.STUDENT,
      student_profiles: {
        create: {
          grade_level: 2,
          ui_theme: ui_mode.KIDS_ELEMENTARY,
          default_session_minutes: 60,
          tutor_private_notes: 'Bé thích hình ảnh minh họa sinh động, cần khen ngợi thường xuyên.',
        },
      },
    },
  });

  // 3. Tạo Học sinh Lớp 7 (Toán 7)
  const studentG7 = await prisma.users.upsert({
    where: { username: 'student_g7' },
    update: {},
    create: {
      username: 'student_g7',
      email: 'nam.g7@gmail.com',
      password_hash: defaultPasswordHash,
      full_name: 'Nguyễn Hoàng Nam (Lớp 7)',
      role: user_role.STUDENT,
      student_profiles: {
        create: {
          grade_level: 7,
          ui_theme: ui_mode.STANDARD_SECONDARY,
          default_session_minutes: 90,
          tutor_private_notes: 'Nam tư duy đại số khá tốt nhưng hay nhầm dấu trừ khi chuyển vế.',
        },
      },
    },
  });

  // 4. Tạo Học sinh Lớp 12 (Tiếng Anh 12)
  const studentG12 = await prisma.users.upsert({
    where: { username: 'student_g12' },
    update: {},
    create: {
      username: 'student_g12',
      email: 'trang.g12@gmail.com',
      password_hash: defaultPasswordHash,
      full_name: 'Lê Thu Trang (Lớp 12)',
      role: user_role.STUDENT,
      student_profiles: {
        create: {
          grade_level: 12,
          ui_theme: ui_mode.HIGH_SCHOOL_EXAM,
          default_session_minutes: 90,
          tutor_private_notes: 'Mục tiêu thi THPTQG 9.0+ môn Tiếng Anh. Luyện kỹ kỹ năng Reading.',
        },
      },
    },
  });
  console.log('✓ Đã tạo 3 Học sinh: Lớp 2, Lớp 7, Lớp 12');

  // 5. Tạo Phụ huynh và liên kết với học sinh Lớp 7
  const parentNam = await prisma.users.upsert({
    where: { username: 'parent_nam' },
    update: {},
    create: {
      username: 'parent_nam',
      email: 'me.nam@gmail.com',
      password_hash: defaultPasswordHash,
      full_name: 'Chị Mai (Phụ huynh em Nam)',
      role: user_role.PARENT,
    },
  });

  await prisma.parent_student_links.upsert({
    where: {
      parent_id_student_id: {
        parent_id: parentNam.id,
        student_id: studentG7.id,
      },
    },
    update: {},
    create: {
      parent_id: parentNam.id,
      student_id: studentG7.id,
      relationship: 'Mẹ',
    },
  });
  console.log('✓ Đã liên kết Phụ huynh với học sinh Nam (Lớp 7)');

  // 6. Lấy môn Toán 7
  const math7 = await prisma.subjects.findUnique({
    where: { code: 'MATH_7' },
  });

  if (math7) {
    // 7. Tạo Bài học mẫu: Toán 7 - Số nguyên
    const sampleUnit = await prisma.learning_units.create({
      data: {
        subject_id: math7.id,
        created_by: teacher.id,
        title: 'Chuyên đề 1: Phép tính số nguyên & Quy tắc chuyển vế',
        description: 'Nắm vững quy tắc dấu trong phép cộng trừ nhân chia và ứng dụng vào bài toán tìm x.',
        lecture_content_markdown: `
# 1. Khái niệm Số Nguyên
Tập hợp số nguyên kí hiệu là $\\mathbb{Z}$:
$$\\mathbb{Z} = \\{...; -3; -2; -1; 0; 1; 2; 3; ...\\}$$

## 2. Quy tắc bỏ dấu ngoặc
- Khi bỏ dấu ngoặc có dấu "$+$" đằng trước, ta giữ nguyên dấu các số hạng trong ngoặc.
- Khi bỏ dấu ngoặc có dấu "$-$" đằng trước, ta phải đổi dấu tất cả các số hạng:
$$-(a - b + c) = -a + b - c$$

## 3. Quy tắc chuyển vế
Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải **đổi dấu** số hạng đó:
$$A + B = C \\iff A = C - B$$
        `.trim(),
        lecture_attachments: [
          {
            name: 'So_do_tu_duy_So_nguyen.png',
            url: 'https://jxikmcvhamcdrsmyoyid.supabase.co/storage/v1/object/public/lectures/mindmap_so_nguyen.png',
            type: 'image',
          },
        ],
        is_template: true,
      },
    });

    // 8. Tạo 2 bộ đề bài tập: 90 phút và BTVN
    const inSessionPractice = await prisma.assessments.create({
      data: {
        learning_unit_id: sampleUnit.id,
        type: assessment_type.IN_SESSION_90M,
        title: 'Luyện tập trọng tâm tại lớp (90 phút)',
        instructions: 'Học sinh làm trực tiếp trên hệ thống, hoàn thành câu trắc nghiệm và chụp ảnh bài giải tự luận.',
        time_limit_minutes: 90,
        max_score: 10.0,
      },
    });

    const homework = await prisma.assessments.create({
      data: {
        learning_unit_id: sampleUnit.id,
        type: assessment_type.HOMEWORK,
        title: 'Bài tập về nhà củng cố',
        instructions: 'Hoàn thành trước 22h ngày mai.',
        time_limit_minutes: null,
        max_score: 10.0,
      },
    });

    // 9. Thêm câu hỏi vào đề 90 phút
    // Câu 1: Trắc nghiệm
    await prisma.questions.create({
      data: {
        assessment_id: inSessionPractice.id,
        order_index: 1,
        type: question_type.MULTIPLE_CHOICE,
        points: 2.0,
        question_payload: {
          content_markdown: 'Giá trị của biểu thức $A = (-15) + (-25) - (-10)$ là:',
          options: [
            { id: 'A', text: '-50' },
            { id: 'B', text: '-30' },
            { id: 'C', text: '20' },
            { id: 'D', text: '-20' },
          ],
        },
        grading_key_payload: {
          correct_option_id: 'B',
          explanation_markdown: '$A = (-15) + (-25) + 10 = -40 + 10 = -30$.',
        },
      },
    });

    // Câu 2: Điền từ
    await prisma.questions.create({
      data: {
        assessment_id: inSessionPractice.id,
        order_index: 2,
        type: question_type.FILL_IN_BLANK,
        points: 2.0,
        question_payload: {
          content_markdown: 'Tìm số nguyên $x$ biết: $x - (-7) = 12$. Nhập số nguyên vào ô trống:',
        },
        grading_key_payload: {
          accepted_answers: ['5', '+5'],
          explanation_markdown: '$x + 7 = 12 \\iff x = 12 - 7 = 5$.',
        },
      },
    });

    // Câu 3: Tự luận / Chụp ảnh vở nộp bài
    await prisma.questions.create({
      data: {
        assessment_id: inSessionPractice.id,
        order_index: 3,
        type: question_type.ESSAY_UPLOAD,
        points: 6.0,
        question_payload: {
          prompt_markdown: 'Giải phương trình sau ra vở và chụp ảnh lời giải chi tiết:\n$$2(x - 3) - 5(x + 1) = -17$$',
          guidelines: 'Trình bày rõ ràng từng bước: phá ngoặc, chuyển vế đổi dấu và kết luận nghiệm.',
          allow_latex_input: true,
          allow_file_upload: true,
        },
        grading_key_payload: {
          rubric: [
            { criteria: 'Khai triển đúng ngoặc: $2x - 6 - 5x - 5 = -17$', max_points: 2.0 },
            { criteria: 'Thu gọn và chuyển vế: $-3x - 11 = -17 \\implies -3x = -6$', max_points: 2.5 },
            { criteria: 'Tính đúng nghiệm $x = 2$ và kết luận', max_points: 1.5 },
          ],
          sample_solution_markdown: '$$2x - 6 - 5x - 5 = -17 \\iff -3x - 11 = -17 \\iff -3x = -6 \\iff x = 2$$',
        },
      },
    });

    // 10. Giao bài ngày hôm nay cho học sinh Nam (student_g7)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const assignment = await prisma.daily_student_assignments.upsert({
      where: {
        student_id_learning_unit_id_assigned_date: {
          student_id: studentG7.id,
          learning_unit_id: sampleUnit.id,
          assigned_date: today,
        },
      },
      update: {},
      create: {
        student_id: studentG7.id,
        learning_unit_id: sampleUnit.id,
        assigned_by: teacher.id,
        assigned_date: today,
        custom_session_minutes: 90,
        homework_due_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 giờ sau
        teacher_daily_note: 'Hôm nay con tập trung xem kỹ quy tắc đổi dấu khi chuyển vế nhé!',
      },
    });

    // Tạo sẵn 2 attempt cho Nam
    await prisma.assessment_attempts.upsert({
      where: {
        daily_assignment_id_assessment_id: {
          daily_assignment_id: assignment.id,
          assessment_id: inSessionPractice.id,
        },
      },
      update: {},
      create: {
        daily_assignment_id: assignment.id,
        assessment_id: inSessionPractice.id,
        student_id: studentG7.id,
        status: attempt_status.NOT_STARTED,
      },
    });

    await prisma.assessment_attempts.upsert({
      where: {
        daily_assignment_id_assessment_id: {
          daily_assignment_id: assignment.id,
          assessment_id: homework.id,
        },
      },
      update: {},
      create: {
        daily_assignment_id: assignment.id,
        assessment_id: homework.id,
        student_id: studentG7.id,
        status: attempt_status.NOT_STARTED,
      },
    });

    console.log('✓ Đã tạo Bài học mẫu, Đề 90p, Đề BTVN, và Giao bài hôm nay cho Nam!');
  }

  console.log('--- Hoàn tất Seeding thành công 100%! ---');
}

main()
  .catch((e) => {
    console.error('Lỗi khi seed data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
