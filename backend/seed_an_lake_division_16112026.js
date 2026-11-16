const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu tạo Card Bài Học & Đố Vui Phép Chia Kẹo cho Bé an_lake (Lớp 1) ngày 16/11/2026...');

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

  // Target Date: 2026-11-16
  const targetDate = new Date('2026-11-16T00:00:00.000Z');

  // 2. Dọn dẹp bài tập cũ của ngày 16/11/2026 nếu đã có
  const existingAsgns = await prisma.daily_student_assignments.findMany({
    where: {
      student_id: studentAn.id,
      assigned_date: targetDate,
    },
    include: {
      assessment_attempts: true,
    },
  });

  if (existingAsgns.length > 0) {
    console.log(`⚠️ Tìm thấy ${existingAsgns.length} bài cũ ngày 16/11/2026 của Bé An, dọn dẹp...`);
    for (const asgn of existingAsgns) {
      for (const att of asgn.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: asgn.id } });
    }
    console.log('✓ Đã dọn dẹp xong.');
  }

  // 3. Nội dung bài giảng Markdown tích hợp link Web Studio Card
  const lectureMarkdown = `# 🍬 CHUYẾN PHIÊU LƯU CHIA KẸO: KHÁM PHÁ PHÉP CHIA KỲ DIỆU
**Dành tặng bạn nhỏ an_lake 6 tuổi thông thái • 16/11/2026**

Interactive Simulation Studio: \`/lectures/an-lake-division-card/index.html\`

---

### 📖 1. Câu Chuyện Thỏ Trắng Mimi và Gấu Misa
Hôm nay bạn **Thỏ Trắng Mimi** 🐰 và bạn **Gấu Misa** 🐻 đến nhà bạn **an_lake** chơi. Hai bạn mang theo một rổ kẹo ngọt ngào!

Làm sao để **chia kẹo** cho Mimi và Misa bây giờ nhỉ?  
👉 **Phép chia cực kì đơn giản:** Là chia làm sao cho **hai bạn đều có số kẹo BẰNG NHAU**, không bạn nào bị ít hơn, cả hai bạn cùng vui cười tít mắt!

**Cách chia bí mật của an_lake:**  
> "Một cái cho Thỏ Mimi, một cái cho Gấu Misa...  
> Lại một cái cho Thỏ Mimi, một cái cho Gấu Misa..."  
> Chia từng lượt cho tới khi hết sạch kẹo trong rổ!

### ✨ Phép Thuật Toán Học Kỳ Diệu
Có **6 cái kẹo** chia đều cho **2 bạn**, mỗi bạn được **3 cái kẹo**!

$$6 \\div 2 = 3$$

---

### 🎮 4 Hoạt Động Khám Phá Trong Card Tương Tác:
1. **Trạm 1 - Câu Chuyện Thần Tiên**: Bé hiểu vì sao chia quà công bằng lại đem lại niềm vui.
2. **Trạm 2 - Tự Tay Chia Quà**: Bé thao tác chia 4, 6, 8, 9, 10 món quà (Dâu 🍓, Kẹo 🍬, Bánh 🍪, Cà rốt 🥕) cho 2 hoặc 3 bạn thú với hiệu ứng âm thanh và pháo hoa.
3. **Trạm 3 - Đố Vui Thông Thái**: 5 câu trắc nghiệm đố vui chia quà để nhận 5 ngôi sao lấp lánh và Cúp Vô Địch 🏆.
4. **Trạm 4 - Lời Nhắn Ba Mẹ**: Cẩm nang phụ huynh đồng hành cùng bé 6 tuổi học phép chia qua các trò chơi gia đình (chia đũa, chia múi quýt, chia khối LEGO).
`;

  // 4. Tạo Learning Unit
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: mathSubject.id,
      created_by: teacher.id,
      title: 'Chuyến Phiêu Lưu Chia Kẹo: Khám Phá Phép Chia Kỳ Diệu Cùng Bé an_lake',
      description: 'Card tương tác học và thực hành phép chia kẹo ngày 16/11/2026: Bé an_lake cùng Thỏ Trắng Mimi và Gấu Misa học cách chia quà công bằng, tự tay chia quà và tham gia đố vui nhận cúp.',
      lecture_content_markdown: lectureMarkdown,
      lecture_attachments: [],
      is_template: true,
    },
  });
  console.log('✓ Đã tạo Learning Unit:', learningUnit.title);

  // 5. Tạo Assessment (5 câu đố vui trắc nghiệm chia quà)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      type: 'IN_SESSION_90M',
      title: 'Đố Vui Chia Kẹo Công Bằng Cùng Bé an_lake (5 Thử Thách) 🍬👑',
      instructions: 'Bé hãy đọc từng câu đố chia quà cho các bạn thú, chọn đáp án đúng để nhận 5 ngôi sao lấp lánh và cúp vô địch nhé!',
      time_limit_minutes: 45,
      max_score: 5.0,
    },
  });
  console.log('✓ Đã tạo Assessment:', assessment.title);

  // 6. Danh sách 5 câu hỏi trắc nghiệm
  const questionsData = [
    {
      order_index: 1,
      prompt: 'Có **4** quả dâu tây 🍓 chia đều cho **2** bạn thỏ 🐰🐰. Hỏi mỗi bạn thỏ nhận được mấy quả dâu tây?\n\n*Phép tính: $4 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '1 quả dâu' },
        { id: 'B', text: '2 quả dâu tây' },
        { id: 'C', text: '3 quả dâu' },
        { id: 'D', text: '4 quả dâu' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 4 quả dâu chia đều cho 2 bạn thỏ: $4 \\div 2 = 2$ quả dâu tây!',
      points: 1.0,
    },
    {
      order_index: 2,
      prompt: 'Có **6** cái kẹo ngọt 🍬 chia đều cho **3** bạn mèo 🐱🐱🐱. Hỏi mỗi bạn mèo nhận được mấy cái kẹo ngọt?\n\n*Phép tính: $6 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '1 cái kẹo' },
        { id: 'B', text: '2 cái kẹo ngọt' },
        { id: 'C', text: '3 cái kẹo' },
        { id: 'D', text: '4 cái kẹo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 6 cái kẹo chia đều cho 3 bạn mèo: $6 \\div 3 = 2$ cái kẹo ngọt!',
      points: 1.0,
    },
    {
      order_index: 3,
      prompt: 'Có **6** củ cà rốt 🥕 chia đều cho **2** bạn chuột túi 🦘🦘. Hỏi mỗi bạn chuột túi nhận được mấy củ cà rốt?\n\n*Phép tính: $6 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '2 củ cà rốt' },
        { id: 'B', text: '3 củ cà rốt giòn ngọt' },
        { id: 'C', text: '4 củ cà rốt' },
        { id: 'D', text: '5 củ cà rốt' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 6 củ cà rốt chia đều cho 2 bạn chuột túi: $6 \\div 2 = 3$ củ cà rốt!',
      points: 1.0,
    },
    {
      order_index: 4,
      prompt: 'Có **8** chiếc bánh quy bơ 🍪 chia đều cho **4** bạn cún 🐶🐶🐶🐶. Hỏi mỗi bạn cún nhận được mấy chiếc bánh quy?\n\n*Phép tính: $8 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '1 chiếc bánh' },
        { id: 'B', text: '2 chiếc bánh quy bơ thơm phức' },
        { id: 'C', text: '3 chiếc bánh' },
        { id: 'D', text: '4 chiếc bánh' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 8 chiếc bánh chia đều cho 4 bạn cún: $8 \\div 4 = 2$ chiếc bánh quy bơ!',
      points: 1.0,
    },
    {
      order_index: 5,
      prompt: 'Có **10** ngôi sao may mắn lấp lánh ⭐ chia đều cho **2** bạn gấu 🐻🐻. Hỏi mỗi bạn gấu nhận được mấy ngôi sao?\n\n*Phép tính: $10 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '4 ngôi sao' },
        { id: 'B', text: '5 ngôi sao may mắn lấp lánh' },
        { id: 'C', text: '6 ngôi sao' },
        { id: 'D', text: '8 ngôi sao' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 10 ngôi sao chia đều cho 2 bạn gấu: $10 \\div 2 = 5$ ngôi sao may mắn!',
      points: 1.0,
    },
  ];

  for (const q of questionsData) {
    await prisma.questions.create({
      data: {
        assessment_id: assessment.id,
        order_index: q.order_index,
        type: 'MULTIPLE_CHOICE',
        points: q.points,
        question_payload: {
          content_markdown: q.prompt,
          options: q.options,
          correct_option_id: q.correct_option_id,
        },
        grading_key_payload: {
          correct_option_id: q.correct_option_id,
          explanation_markdown: q.explanation,
        },
      },
    });
  }
  console.log(`✓ Đã tạo thành công ${questionsData.length} câu đố vui trắc nghiệm chia kẹo.`);

  // 7. Giao bài ngày 16/11/2026 cho Bé An
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: studentAn.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 45,
      teacher_daily_note: 'Hôm nay bé an_lake cùng Thỏ Mimi và Gấu Misa khám phá phép chia kẹo kỳ diệu nhé! Bé bấm "Khám Phá Bài Học 🎈" để vào phòng thí nghiệm chia kẹo và làm 5 câu đố nhận cúp vô địch nha! 🍬👑',
      is_published: true,
    },
  });

  // 8. Tạo attempt sẵn sàng cho Bé An
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: studentAn.id,
      status: 'NOT_STARTED',
    },
  });

  console.log('✓ Đã giao card học tập & bài tập ngày 16/11/2026 cho Bé An (an_lake)!');
  console.log(`  - Assignment ID: ${assignment.id}`);
  console.log(`  - Learning Unit ID: ${learningUnit.id}`);
  console.log(`  - Assessment ID: ${assessment.id}`);
  console.log(`  - Attempt ID: ${attempt.id}`);
  console.log(`  - Interactive Studio URL: /lectures/an-lake-division-card/index.html`);
  console.log('🎉 Hoàn tất 100%!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
