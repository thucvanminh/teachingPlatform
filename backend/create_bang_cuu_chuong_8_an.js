const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu tạo bài tập Bảng cửu chương 8 cho Bé An (Lớp 1) ngày 29/10/2026...');

  // 1. Tìm tài khoản Bé An, Giáo viên Thầy Thức và Môn MATH_1
  const studentAn = await prisma.users.findUnique({
    where: { username: 'an_lake' },
  });
  if (!studentAn) throw new Error('Không tìm thấy tài khoản học sinh an_lake');

  const teacher = await prisma.users.findUnique({
    where: { username: 'teacher' },
  });
  if (!teacher) throw new Error('Không tìm thấy tài khoản teacher');

  const mathSubject = await prisma.subjects.findUnique({
    where: { code: 'MATH_1' },
  });
  if (!mathSubject) throw new Error('Không tìm thấy môn MATH_1');

  console.log(`✓ Học sinh: ${studentAn.full_name} (${studentAn.username})`);
  console.log(`✓ Giáo viên: ${teacher.full_name}`);
  console.log(`✓ Môn học: ${mathSubject.name} (${mathSubject.code})`);

  // Target Date: 2026-10-29
  const targetDate = new Date('2026-10-29T00:00:00.000Z');

  // 2. Dọn dẹp bài tập cũ của ngày 29/10/2026 nếu đã có
  const existingAsgn = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: studentAn.id,
      assigned_date: targetDate,
    },
    include: {
      assessment_attempts: true,
    },
  });

  if (existingAsgn) {
    console.log('⚠️ Tìm thấy bài tập cũ ngày 29/10/2026 của Bé An, dọn dẹp để thay thế bài tập mới...');
    for (const att of existingAsgn.assessment_attempts) {
      await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
      await prisma.assessment_attempts.delete({ where: { id: att.id } });
    }
    await prisma.daily_student_assignments.delete({ where: { id: existingAsgn.id } });
    console.log('✓ Đã dọn dẹp xong bài cũ.');
  }

  // 3. Tạo Learning Unit: CHỈ BÀI TẬP - KHÔNG CÓ BÀI HỌC (lecture_content_markdown: null)
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: mathSubject.id,
      created_by: teacher.id,
      title: 'Phiêu Lưu Cùng Bảng Nhân 8 Thần Tiên',
      description: 'Chuyên đề bài tập vui nhộn: Chinh phục Bảng cửu chương 8 cùng Công chúa Amara và Chú Rồng Xanh.',
      lecture_content_markdown: null, // Yêu cầu người dùng: chỉ cần bài tập, không cần bài học
      lecture_attachments: [],
      is_template: true,
    },
  });
  console.log('✓ Đã tạo Learning Unit (chỉ bài tập):', learningUnit.title);

  // 4. Tạo Assessment (Bộ bài tập luyện tập)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      type: 'IN_SESSION_90M',
      title: 'Đố Vui Bảng Cửu Chương 8 Cùng Bé An 👑',
      instructions: 'Bé hãy quan sát tranh minh họa, chọn đáp án đúng rồi bấm nút "Next: Câu tiếp theo" để sang bài nhé!',
      time_limit_minutes: 45,
      max_score: 10.0,
    },
  });
  console.log('✓ Đã tạo Assessment:', assessment.title);

  // 5. Danh sách 12 câu hỏi trắc nghiệm sinh động có kèm ảnh minh họa từ ~/Dantey/teaching/lop1
  const questionsData = [
    {
      order_index: 1,
      image: '/images/lop1/panels_dragon/panel_01.jpg',
      imageAlt: 'Công chúa Amara và Chú Rồng Xanh',
      prompt: 'Chú Rồng Xanh ngoan ngoãn mang về tặng Bé An **1** giỏ táo thần kỳ. Trong giỏ có đúng **8** quả táo đỏ mọng phát sáng. Hỏi Bé An có tất cả bao nhiêu quả táo thần?\n\n*Phép tính: $8 \\times 1 = ?$*',
      options: [
        { id: 'A', text: '6 quả táo' },
        { id: 'B', text: '8 quả táo 🍎' },
        { id: 'C', text: '10 quả táo' },
        { id: 'D', text: '16 quả táo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 1 giỏ gồm 8 quả táo, ta có: $8 \\times 1 = 8$ quả táo.',
      points: 0.83,
    },
    {
      order_index: 2,
      image: '/images/lop1/panels_candy/panel_01.jpg',
      imageAlt: 'Ngôi nhà bánh gừng ở Xứ Sở Kẹo Ngọt',
      prompt: 'Ở Xứ Sở Kẹo Ngọt, Công chúa nướng bánh quy gừng thơm phức xếp vào **2** chiếc đĩa thần kỳ. Mỗi chiếc đĩa có đúng **8** chiếc bánh quy. Hỏi Công chúa đã nướng tất cả bao nhiêu chiếc bánh quy gừng?\n\n*Phép tính: $8 \\times 2 = 8 + 8 = ?$*',
      options: [
        { id: 'A', text: '14 chiếc bánh' },
        { id: 'B', text: '16 chiếc bánh 🍪' },
        { id: 'C', text: '18 chiếc bánh' },
        { id: 'D', text: '20 chiếc bánh' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 2 đĩa bánh, mỗi đĩa 8 chiếc: $8 \\times 2 = 16$ chiếc bánh quy.',
      points: 0.83,
    },
    {
      order_index: 3,
      image: '/images/lop1/panels_dragon/panel_03.jpg',
      imageAlt: 'Khu rừng nấm thần tiên lấp lánh',
      prompt: 'Chú Rồng Xanh bay vào Khu Rừng Thần Tiên và phát hiện **3** khóm nấm phát sáng bảy màu. Mỗi khóm nấm có đúng **8** cây nấm lung linh. Hỏi có tất cả bao nhiêu cây nấm phát sáng trong khu rừng?\n\n*Phép tính: $8 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '24 cây nấm 🍄' },
        { id: 'B', text: '21 cây nấm' },
        { id: 'C', text: '26 cây nấm' },
        { id: 'D', text: '18 cây nấm' },
      ],
      correct_option_id: 'A',
      explanation: 'Có 3 khóm nấm, mỗi khóm có 8 cây: $8 \\times 3 = 8 + 8 + 8 = 24$ cây nấm.',
      points: 0.83,
    },
    {
      order_index: 4,
      image: '/images/lop1/panels_candy/panel_02.jpg',
      imageAlt: 'Cây kẹo mút khổng lồ bảy màu',
      prompt: 'Bé An hái kẹo mút cầu vồng và bó thành **4** bó kẹo thật xinh xắn. Mỗi bó kẹo có đúng **8** chiếc kẹo ngọt ngào. Hỏi Bé An có tất cả bao nhiêu chiếc kẹo mút cầu vồng?\n\n*Phép tính: $8 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '30 chiếc kẹo' },
        { id: 'B', text: '32 chiếc kẹo 🍭' },
        { id: 'C', text: '34 chiếc kẹo' },
        { id: 'D', text: '36 chiếc kẹo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 4 bó kẹo, mỗi bó 8 chiếc: $8 \\times 4 = 32$ chiếc kẹo mút.',
      points: 0.83,
    },
    {
      order_index: 5,
      image: '/images/lop1/panels_dragon/panel_09.jpg',
      imageAlt: 'Chiếc rương kho báu vàng lấp lánh',
      prompt: 'Chú Rồng Xanh tìm thấy **5** chiếc rương kho báu vàng lấp lánh. Trong mỗi chiếc rương có đúng **8** viên ngọc rồng tỏa sáng. Hỏi Chú Rồng Xanh có tất cả bao nhiêu viên ngọc rồng?\n\n*Phép tính: $8 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '35 viên ngọc' },
        { id: 'B', text: '40 viên ngọc 💎' },
        { id: 'C', text: '45 viên ngọc' },
        { id: 'D', text: '48 viên ngọc' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 5 chiếc rương, mỗi rương có 8 viên ngọc: $8 \\times 5 = 40$ viên ngọc.',
      points: 0.83,
    },
    {
      order_index: 6,
      image: '/images/lop1/panels_nhan_6/bee_flower.jpg',
      imageAlt: 'Những chú ong chăm chỉ lấy mật bên vườn hoa',
      prompt: 'Trong vườn hoa hoàng gia có **6** đóa hoa hướng dương rực rỡ. Mỗi đóa hoa có **8** chú ong chăm chỉ đang lấy mật. Hỏi có tất cả bao nhiêu chú ong đang chăm chỉ lấy mật?\n\n*Phép tính: $8 \\times 6 = ?$*',
      options: [
        { id: 'A', text: '42 chú ong' },
        { id: 'B', text: '46 chú ong' },
        { id: 'C', text: '48 chú ong 🐝' },
        { id: 'D', text: '54 chú ong' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 6 đóa hoa, mỗi đóa 8 chú ong: $8 \\times 6 = 48$ chú ong.',
      points: 0.83,
    },
    {
      order_index: 7,
      image: '/images/lop1/panels_dragon/panel_06.jpg',
      imageAlt: 'Vườn hoa pha lê và cổng đá thần tiên',
      prompt: 'Để mở cánh cổng đá bước vào lâu đài pha lê, Chú Rồng Xanh cần nhập mật mã là kết quả của phép tính $8 \\times 7$. Bé An hãy giúp Rồng Xanh chọn mật mã chính xác nhé!\n\n*Phép tính: $8 \\times 7 = ?$*',
      options: [
        { id: 'A', text: '54' },
        { id: 'B', text: '56 ✨' },
        { id: 'C', text: '58' },
        { id: 'D', text: '64' },
      ],
      correct_option_id: 'B',
      explanation: 'Phép tính $8 \\times 7 = 56$. Mật mã chính xác giúp cánh cổng mở ra!',
      points: 0.83,
    },
    {
      order_index: 8,
      image: '/images/lop1/panels_ocean/panel_01.jpg',
      imageAlt: 'Đàn cá heo tung tăng dưới đại dương thần tiên',
      prompt: 'Dưới đại dương thần tiên có **8** gia đình cá heo tung tăng bơi lội. Mỗi gia đình cá heo gồm đúng **8** thành viên đáng yêu. Hỏi cả đàn cá heo có tất cả bao nhiêu thành viên?\n\n*Phép tính: $8 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '60 thành viên' },
        { id: 'B', text: '62 thành viên' },
        { id: 'C', text: '64 thành viên 🐬' },
        { id: 'D', text: '72 thành viên' },
      ],
      correct_option_id: 'C',
      explanation: 'Đỉnh cao bảng nhân 8: $8 \\times 8 = 64$ thành viên cá heo.',
      points: 0.83,
    },
    {
      order_index: 9,
      image: '/images/lop1/panels_nhan_6/eagle_flight.jpg',
      imageAlt: 'Chú đại bàng dũng mãnh vượt núi tuyết',
      prompt: 'Chú đại bàng dũng cảm bay qua **9** ngọn núi tuyết hùng vĩ. Ở mỗi ngọn núi, đại bàng tìm thấy **8** viên đá pha lê băng giá lấp lánh. Hỏi đại bàng đã thu thập được tất cả bao nhiêu viên đá pha lê?\n\n*Phép tính: $8 \\times 9 = ?$*',
      options: [
        { id: 'A', text: '70 viên pha lê' },
        { id: 'B', text: '72 viên pha lê ❄️' },
        { id: 'C', text: '74 viên pha lê' },
        { id: 'D', text: '81 viên pha lê' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 9 ngọn núi tuyết, mỗi ngọn 8 viên đá: $8 \\times 9 = 72$ viên pha lê.',
      points: 0.83,
    },
    {
      order_index: 10,
      image: '/images/lop1/panels_dragon/panel_12.jpg',
      imageAlt: 'Vương miện vàng hoàng gia và tiệc mừng',
      prompt: 'Để chúc mừng Bé An về đích xuất sắc, Công chúa chuẩn bị **10** bàn tiệc hoàng gia. Mỗi bàn tiệc có **8** ly kem dâu mát lạnh. Hỏi có tất cả bao nhiêu ly kem dâu trên các bàn tiệc?\n\n*Phép tính: $8 \\times 10 = ?$*',
      options: [
        { id: 'A', text: '80 ly kem 🍨' },
        { id: 'B', text: '88 ly kem' },
        { id: 'C', text: '90 ly kem' },
        { id: 'D', text: '100 ly kem' },
      ],
      correct_option_id: 'A',
      explanation: 'Về đích trọn vẹn Bảng nhân 8: $8 \\times 10 = 80$ ly kem dâu.',
      points: 0.83,
    },
    {
      order_index: 11,
      image: '/images/lop1/Tam_11_Cong_Chua_Va_Chu_Rong_Xanh_3_So_3_Chu_So.png',
      imageAlt: 'Công chúa và Chú Rồng Xanh',
      prompt: '⭐ **Đố vui quy luật:** Chú Rồng Xanh bước lên bậc thang thần kỳ theo quy luật Bảng nhân 8:\n\n$$8, \\quad 16, \\quad 24, \\quad 32, \\quad [\\;?\\;]$$\n\nBé An hãy đoán xem số tiếp theo trên bậc thang thần kỳ là số mấy nhé?',
      options: [
        { id: 'A', text: '36' },
        { id: 'B', text: '38' },
        { id: 'C', text: '40 ⭐' },
        { id: 'D', text: '44' },
      ],
      correct_option_id: 'C',
      explanation: 'Mỗi bậc thang cộng thêm 8: $32 + 8 = 40$ (tương ứng với $8 \\times 5 = 40$).',
      points: 0.85,
    },
    {
      order_index: 12,
      image: '/images/lop1/panels_nhan_5/magic_book.jpg',
      imageAlt: 'Cuốn sách phép thuật toán học',
      prompt: '📖 **Bí kíp toán học:** Cuốn sách phép thuật mở ra câu đố: Phép cộng các số giống nhau dưới đây:\n\n$$8 + 8 + 8 + 8$$\n\nĐược viết gọn lại thành phép nhân nào dưới đây nhỉ?',
      options: [
        { id: 'A', text: '8 × 3' },
        { id: 'B', text: '8 × 4 🌟' },
        { id: 'C', text: '8 × 5' },
        { id: 'D', text: '4 × 4' },
      ],
      correct_option_id: 'B',
      explanation: 'Số 8 được lấy 4 lần nên viết gọn lại thành phép nhân $8 \\times 4 = 32$.',
      points: 0.85,
    },
  ];

  for (const q of questionsData) {
    const fullContentMarkdown = `![${q.imageAlt}](${q.image})\n\n${q.prompt}`;
    await prisma.questions.create({
      data: {
        assessment_id: assessment.id,
        order_index: q.order_index,
        type: 'MULTIPLE_CHOICE',
        points: q.points,
        question_payload: {
          content_markdown: fullContentMarkdown,
          options: q.options,
        },
        grading_key_payload: {
          correct_option_id: q.correct_option_id,
          explanation_markdown: q.explanation,
        },
      },
    });
  }
  console.log(`✓ Đã tạo thành công ${questionsData.length} câu hỏi có hình ảnh minh họa cho Bảng cửu chương 8.`);

  // 6. Giao bài ngày 29/10/2026 cho Bé An
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: studentAn.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 45,
      teacher_daily_note: 'Bé An làm quen với Bảng cửu chương 8 thật vui nhé! Làm xong mỗi câu con nhớ bấm nút "Next" nha!',
      is_published: true,
    },
  });

  // 7. Tạo attempt sẵn sàng cho Bé An
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: studentAn.id,
      status: 'NOT_STARTED',
    },
  });

  console.log('✓ Đã giao bài ngày 29/10/2026 cho Bé An (An Lake)!');
  console.log(`  - Assignment ID: ${assignment.id}`);
  console.log(`  - Attempt ID: ${attempt.id}`);
  console.log('🎉 Hoàn tất 100%!');
}

main()
  .catch((e) => {
    console.error('Lỗi khi tạo bài tập:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
