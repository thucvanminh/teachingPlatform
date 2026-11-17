const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu tạo Card Bài Học 2D & 20 Bài Tập Đố Vui cho Bé an_lake (Lớp 1) ngày 17/11/2026...');

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

  // Target Date: 2026-11-17
  const targetDate = new Date('2026-11-17T00:00:00.000Z');

  // 2. Dọn dẹp bài cũ ngày 17/11/2026 nếu đã có
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
    console.log(`⚠️ Tìm thấy ${existingAsgns.length} bài cũ ngày 17/11/2026 của Bé An, dọn dẹp...`);
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
  const lectureMarkdown = `# 🍓 NÔNG TRẠI TRÁI CÂY & PHÉP CHIA ĐỀU KỲ DIỆU
**Dành tặng bạn nhỏ an_lake 6 tuổi thông thái • 17/11/2026**

Interactive Simulation Studio: \`/lectures/an-lake-fruit-farm-card/index.html\`

---

### 📖 1. Câu Chuyện Thu Hoạch Trái Cây
Hôm nay bạn **Thỏ Trắng Mimi** 🐰 và bạn **Gấu Misa** 🐻 ra vườn hái được **8 quả dâu tây đỏ mọng**.

Làm sao để chia đều cho 2 bạn cùng thưởng thức nhỉ?  
👉 **Quy tắc vàng của an_lake:** Chia làm sao để **hai bạn đều có số quả BẰNG NHAU**, không ai nhiều hơn, không ai ít hơn!

**Bí kíp chia quà nhịp nhàng:**  
> *"Một quả cho Thỏ Mimi, một quả cho Gấu Misa...*  
> *Lại một quả cho Thỏ Mimi, một quả cho Gấu Misa...*  
> *Chia từng lượt cho tới khi hết sạch quả trong rổ!"*

### ✨ Phép Thuật Toán Học Kỳ Diệu
Có **8 quả dâu tây** chia đều cho **2 bạn**, mỗi bạn được **4 quả dâu tây**!

$$8 \\div 2 = 4$$

---

### 🌈 2. Các Ví Dụ Trực Quan Cực Kì Dễ Nhớ

* **Ví dụ 1 (Quả Táo Đỏ):**  
  Có **4 quả táo** chia đều cho **2 bạn**, mỗi bạn được **2 quả táo**!  
  $$4 \\div 2 = 2$$

* **Ví dụ 2 (Củ Cà Rốt):**  
  Có **6 củ cà rốt** chia đều cho **3 bạn chuột túi**, mỗi bạn được **2 củ cà rốt**!  
  $$6 \\div 3 = 2$$

* **Ví dụ 3 (Quả Cam Vàng):**  
  Có **8 quả cam** chia đều cho **2 bạn**, mỗi bạn được **4 quả cam**!  
  $$8 \\div 2 = 4$$

* **Ví dụ 4 (Bánh Quy Bơ):**  
  Có **8 chiếc bánh quy** chia đều cho **4 bạn cún**, mỗi bạn được **2 chiếc bánh quy**!  
  $$8 \\div 4 = 2$$

* **Ví dụ 5 (Chùm Nho Tím):**  
  Có **15 quả nho** chia đều cho **3 bạn**, mỗi bạn được **5 quả nho**!  
  $$15 \\div 3 = 5$$

---

### ⭐ 3. Bảng Bí Kíp Chia Nhanh Của Bé An
| Số Lượng Ban Đầu | Chia Cho Mấy Bạn? | Mỗi Bạn Được | Phép Tính Phép Thuật |
| :---: | :---: | :---: | :---: |
| 4 quả táo | 2 bạn | 2 quả táo | $4 \\div 2 = 2$ |
| 6 quả dâu tây | 2 bạn | 3 quả dâu tây | $6 \\div 2 = 3$ |
| 6 củ cà rốt | 3 bạn | 2 củ cà rốt | $6 \\div 3 = 2$ |
| 8 quả cam | 2 bạn | 4 quả cam | $8 \\div 2 = 4$ |
| 9 quả xoài | 3 bạn | 3 quả xoài | $9 \\div 3 = 3$ |
| 8 chiếc bánh quy | 4 bạn | 2 chiếc bánh quy | $8 \\div 4 = 2$ |
| 10 quả chuối | 2 bạn | 5 quả chuối | $10 \\div 2 = 5$ |
| 12 chiếc đũa | 4 người | 3 chiếc đũa | $12 \\div 4 = 3$ |

---

### 🎮 4 Trạm Khám Phá Trong Web Studio 2D:
1. **Trạm 1 - Câu Chuyện Nông Trại**: Tìm hiểu nguyên tắc chia đều trái cây công bằng và 5 ví dụ trực quan.
2. **Trạm 2 - Tự Tay Chia Trái Cây 2D**: Thao tác chia trái cây vector sinh động (dâu tây, táo, cà rốt, cam, bánh quy) cho 2, 3 hoặc 4 bạn thú.
3. **Trạm 3 - Đấu Trường 20 Câu Đố**: 20 câu trắc nghiệm chuẩn mực, độ dài đồng đều, tính sao và nhận Cúp Vàng Vinh Quang 🏆!
4. **Trạm 4 - Cẩm Nang Ba Mẹ**: Phương pháp gợi ý trẻ 6 tuổi tư duy chia đều thông qua đồ vật sinh hoạt gia đình.
`;

  // 4. Tạo Learning Unit
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: mathSubject.id,
      created_by: teacher.id,
      title: 'Nông Trại Trái Cây & Phép Chia Đều Kỳ Diệu Cùng Bé an_lake',
      description: 'Card học tập tương tác 2D & 20 bài tập đố vui phép chia đều ngày 17/11/2026: Bé an_lake khám phá câu chuyện thu hoạch trái ngọt, tự tay chia quà cho các bạn thú và chinh phục 20 câu đố nhận cúp vàng.',
      lecture_content_markdown: lectureMarkdown,
      lecture_attachments: [],
      is_template: true,
    },
  });
  console.log('✓ Đã tạo Learning Unit:', learningUnit.title);

  // 5. Tạo Assessment (20 câu đố vui trắc nghiệm)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      type: 'IN_SESSION_90M',
      title: 'Đại Hội Chia Trái Ngọt Cùng Bé an_lake (20 Thử Thách) 🍓👑',
      instructions: 'Bé hãy đọc từng câu đố chia quả cho các bạn thú, suy nghĩ thật kĩ rồi bấm chọn đáp án đúng để rinh trọn 20 ngôi sao và Cúp Vô Địch nhé!',
      time_limit_minutes: 60,
      max_score: 20.0,
    },
  });
  console.log('✓ Đã tạo Assessment:', assessment.title);

  // 6. Danh sách 20 câu hỏi trắc nghiệm (ĐẢM BẢO ĐỒNG NHẤT 100% CẤU TRÚC VÀ ĐỘ DÀI CÁC ĐÁP ÁN)
  const questionsData = [
    {
      order_index: 1,
      prompt: 'Có **4** quả táo chia đều cho **2** bạn. Hỏi mỗi bạn nhận được mấy quả táo?\n\n*Phép tính: $4 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '1 quả táo' },
        { id: 'B', text: '2 quả táo' },
        { id: 'C', text: '3 quả táo' },
        { id: 'D', text: '4 quả táo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 4 quả táo chia đều cho 2 bạn: $4 \\div 2 = 2$ quả táo.',
      points: 1.0,
    },
    {
      order_index: 2,
      prompt: 'Có **6** quả dâu tây chia đều cho **2** bạn. Hỏi mỗi bạn nhận được mấy quả dâu tây?\n\n*Phép tính: $6 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '3 quả dâu tây' },
        { id: 'B', text: '2 quả dâu tây' },
        { id: 'C', text: '4 quả dâu tây' },
        { id: 'D', text: '5 quả dâu tây' },
      ],
      correct_option_id: 'A',
      explanation: 'Có 6 quả dâu tây chia đều cho 2 bạn: $6 \\div 2 = 3$ quả dâu tây.',
      points: 1.0,
    },
    {
      order_index: 3,
      prompt: 'Có **6** củ cà rốt chia đều cho **3** bạn. Hỏi mỗi bạn nhận được mấy củ cà rốt?\n\n*Phép tính: $6 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '1 củ cà rốt' },
        { id: 'B', text: '3 củ cà rốt' },
        { id: 'C', text: '2 củ cà rốt' },
        { id: 'D', text: '4 củ cà rốt' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 6 củ cà rốt chia đều cho 3 bạn: $6 \\div 3 = 2$ củ cà rốt.',
      points: 1.0,
    },
    {
      order_index: 4,
      prompt: 'Có **8** quả cam chia đều cho **2** bạn. Hỏi mỗi bạn nhận được mấy quả cam?\n\n*Phép tính: $8 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '2 quả cam' },
        { id: 'B', text: '3 quả cam' },
        { id: 'C', text: '5 quả cam' },
        { id: 'D', text: '4 quả cam' },
      ],
      correct_option_id: 'D',
      explanation: 'Có 8 quả cam chia đều cho 2 bạn: $8 \\div 2 = 4$ quả cam.',
      points: 1.0,
    },
    {
      order_index: 5,
      prompt: 'Có **9** quả xoài chia đều cho **3** bạn. Hỏi mỗi bạn nhận được mấy quả xoài?\n\n*Phép tính: $9 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '3 quả xoài' },
        { id: 'B', text: '2 quả xoài' },
        { id: 'C', text: '4 quả xoài' },
        { id: 'D', text: '5 quả xoài' },
      ],
      correct_option_id: 'A',
      explanation: 'Có 9 quả xoài chia đều cho 3 bạn: $9 \\div 3 = 3$ quả xoài.',
      points: 1.0,
    },
    {
      order_index: 6,
      prompt: 'Có **8** chiếc bánh quy chia đều cho **4** bạn. Hỏi mỗi bạn nhận được mấy chiếc bánh quy?\n\n*Phép tính: $8 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '1 chiếc bánh quy' },
        { id: 'B', text: '2 chiếc bánh quy' },
        { id: 'C', text: '3 chiếc bánh quy' },
        { id: 'D', text: '4 chiếc bánh quy' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 8 chiếc bánh quy chia đều cho 4 bạn: $8 \\div 4 = 2$ chiếc bánh quy.',
      points: 1.0,
    },
    {
      order_index: 7,
      prompt: 'Có **10** quả chuối chia đều cho **2** bạn. Hỏi mỗi bạn nhận được mấy quả chuối?\n\n*Phép tính: $10 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '4 quả chuối' },
        { id: 'B', text: '6 quả chuối' },
        { id: 'C', text: '5 quả chuối' },
        { id: 'D', text: '7 quả chuối' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 10 quả chuối chia đều cho 2 bạn: $10 \\div 2 = 5$ quả chuối.',
      points: 1.0,
    },
    {
      order_index: 8,
      prompt: 'Có **12** quả mận chia đều cho **3** bạn. Hỏi mỗi bạn nhận được mấy quả mận?\n\n*Phép tính: $12 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '3 quả mận' },
        { id: 'B', text: '5 quả mận' },
        { id: 'C', text: '6 quả mận' },
        { id: 'D', text: '4 quả mận' },
      ],
      correct_option_id: 'D',
      explanation: 'Có 12 quả mận chia đều cho 3 bạn: $12 \\div 3 = 4$ quả mận.',
      points: 1.0,
    },
    {
      order_index: 9,
      prompt: 'Có **12** chiếc kẹo chia đều cho **2** bạn. Hỏi mỗi bạn nhận được mấy chiếc kẹo?\n\n*Phép tính: $12 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '6 chiếc kẹo' },
        { id: 'B', text: '5 chiếc kẹo' },
        { id: 'C', text: '7 chiếc kẹo' },
        { id: 'D', text: '8 chiếc kẹo' },
      ],
      correct_option_id: 'A',
      explanation: 'Có 12 chiếc kẹo chia đều cho 2 bạn: $12 \\div 2 = 6$ chiếc kẹo.',
      points: 1.0,
    },
    {
      order_index: 10,
      prompt: 'Có **15** quả nho chia đều cho **3** bạn. Hỏi mỗi bạn nhận được mấy quả nho?\n\n*Phép tính: $15 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '4 quả nho' },
        { id: 'B', text: '5 quả nho' },
        { id: 'C', text: '6 quả nho' },
        { id: 'D', text: '7 quả nho' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 15 quả nho chia đều cho 3 bạn: $15 \\div 3 = 5$ quả nho.',
      points: 1.0,
    },
    {
      order_index: 11,
      prompt: 'Có **14** quả dâu tây chia đều cho **2** bạn. Hỏi mỗi bạn nhận được mấy quả dâu tây?\n\n*Phép tính: $14 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '6 quả dâu tây' },
        { id: 'B', text: '8 quả dâu tây' },
        { id: 'C', text: '7 quả dâu tây' },
        { id: 'D', text: '9 quả dâu tây' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 14 quả dâu tây chia đều cho 2 bạn: $14 \\div 2 = 7$ quả dâu tây.',
      points: 1.0,
    },
    {
      order_index: 12,
      prompt: 'Có **16** quả táo chia đều cho **4** bạn. Hỏi mỗi bạn nhận được mấy quả táo?\n\n*Phép tính: $16 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '3 quả táo' },
        { id: 'B', text: '5 quả táo' },
        { id: 'C', text: '6 quả táo' },
        { id: 'D', text: '4 quả táo' },
      ],
      correct_option_id: 'D',
      explanation: 'Có 16 quả táo chia đều cho 4 bạn: $16 \\div 4 = 4$ quả táo.',
      points: 1.0,
    },
    {
      order_index: 13,
      prompt: 'Có **16** chiếc bánh chia đều cho **2** bạn. Hỏi mỗi bạn nhận được mấy chiếc bánh?\n\n*Phép tính: $16 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '8 chiếc bánh' },
        { id: 'B', text: '7 chiếc bánh' },
        { id: 'C', text: '9 chiếc bánh' },
        { id: 'D', text: '6 chiếc bánh' },
      ],
      correct_option_id: 'A',
      explanation: 'Có 16 chiếc bánh chia đều cho 2 bạn: $16 \\div 2 = 8$ chiếc bánh.',
      points: 1.0,
    },
    {
      order_index: 14,
      prompt: 'Có **18** quả cherry chia đều cho **3** bạn. Hỏi mỗi bạn nhận được mấy quả cherry?\n\n*Phép tính: $18 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '5 quả cherry' },
        { id: 'B', text: '6 quả cherry' },
        { id: 'C', text: '7 quả cherry' },
        { id: 'D', text: '8 quả cherry' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 18 quả cherry chia đều cho 3 bạn: $18 \\div 3 = 6$ quả cherry.',
      points: 1.0,
    },
    {
      order_index: 15,
      prompt: 'Có **18** hạt dẻ chia đều cho **2** bạn. Hỏi mỗi bạn nhận được mấy hạt dẻ?\n\n*Phép tính: $18 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '8 hạt dẻ' },
        { id: 'B', text: '10 hạt dẻ' },
        { id: 'C', text: '9 hạt dẻ' },
        { id: 'D', text: '7 hạt dẻ' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 18 hạt dẻ chia đều cho 2 bạn: $18 \\div 2 = 9$ hạt dẻ.',
      points: 1.0,
    },
    {
      order_index: 16,
      prompt: 'Có **20** viên kẹo chia đều cho **2** bạn. Hỏi mỗi bạn nhận được mấy viên kẹo?\n\n*Phép tính: $20 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '8 viên kẹo' },
        { id: 'B', text: '9 viên kẹo' },
        { id: 'C', text: '11 viên kẹo' },
        { id: 'D', text: '10 viên kẹo' },
      ],
      correct_option_id: 'D',
      explanation: 'Có 20 viên kẹo chia đều cho 2 bạn: $20 \\div 2 = 10$ viên kẹo.',
      points: 1.0,
    },
    {
      order_index: 17,
      prompt: 'Bé An có **10** chiếc bút chì màu chia đều cho **2** hộp bút. Hỏi mỗi hộp có mấy chiếc bút chì màu?\n\n*Phép tính: $10 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '5 chiếc bút chì màu' },
        { id: 'B', text: '4 chiếc bút chì màu' },
        { id: 'C', text: '6 chiếc bút chì màu' },
        { id: 'D', text: '7 chiếc bút chì màu' },
      ],
      correct_option_id: 'A',
      explanation: 'Có 10 chiếc bút chì màu chia đều cho 2 hộp: $10 \\div 2 = 5$ chiếc bút chì màu.',
      points: 1.0,
    },
    {
      order_index: 18,
      prompt: 'Có **12** chiếc đũa chia đều cho **4** người ăn cơm. Hỏi mỗi người nhận được mấy chiếc đũa?\n\n*Phép tính: $12 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '2 chiếc đũa' },
        { id: 'B', text: '3 chiếc đũa' },
        { id: 'C', text: '4 chiếc đũa' },
        { id: 'D', text: '5 chiếc đũa' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 12 chiếc đũa chia đều cho 4 người: $12 \\div 4 = 3$ chiếc đũa.',
      points: 1.0,
    },
    {
      order_index: 19,
      prompt: 'Có **8** củ cải trắng chia đều cho **2** chú thỏ. Hỏi mỗi chú thỏ nhận được mấy củ cải trắng?\n\n*Phép tính: $8 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '3 củ cải trắng' },
        { id: 'B', text: '5 củ cải trắng' },
        { id: 'C', text: '4 củ cải trắng' },
        { id: 'D', text: '6 củ cải trắng' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 8 củ cải trắng chia đều cho 2 chú thỏ: $8 \\div 2 = 4$ củ cải trắng.',
      points: 1.0,
    },
    {
      order_index: 20,
      prompt: 'Có **20** quả bóng bay chia đều cho **4** bạn nhỏ. Hỏi mỗi bạn nhỏ nhận được mấy quả bóng bay?\n\n*Phép tính: $20 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '4 quả bóng bay' },
        { id: 'B', text: '6 quả bóng bay' },
        { id: 'C', text: '7 quả bóng bay' },
        { id: 'D', text: '5 quả bóng bay' },
      ],
      correct_option_id: 'D',
      explanation: 'Có 20 quả bóng bay chia đều cho 4 bạn: $20 \\div 4 = 5$ quả bóng bay.',
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
  console.log(`✓ Đã tạo thành công ${questionsData.length} câu hỏi trắc nghiệm đồng nhất.`);

  // 7. Giao bài ngày 17/11/2026 cho Bé An
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: studentAn.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 60,
      teacher_daily_note: 'Hôm nay bé an_lake cùng các bạn thú khám phá Nông Trại Trái Ngọt và học phép chia đều nhé! Bé bấm "Khám Phá Bài Học 🎈" để vào vườn hái trái cây và làm 20 câu đố nhận Cúp Vàng nha! 🍓🍎',
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

  console.log('✓ Đã giao card học tập & bài tập ngày 17/11/2026 cho Bé An (an_lake)!');
  console.log(`  - Assignment ID: ${assignment.id}`);
  console.log(`  - Learning Unit ID: ${learningUnit.id}`);
  console.log(`  - Assessment ID: ${assessment.id}`);
  console.log(`  - Attempt ID: ${attempt.id}`);
  console.log(`  - Interactive Studio URL: /lectures/an-lake-fruit-farm-card/index.html`);
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
