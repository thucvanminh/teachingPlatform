const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu nâng cấp Card Bài Học (Three.js 3D) & 20 Câu Hỏi Đố Vui cho Bé an_lake (Lớp 1) ngày 16/11/2026...');

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

  // 2. Dọn dẹp bài cũ ngày 16/11/2026 nếu đã có để nâng cấp mới
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
    console.log(`⚠️ Tìm thấy ${existingAsgns.length} bài cũ ngày 16/11/2026 của Bé An, dọn dẹp để thay thế...`);
    for (const asgn of existingAsgns) {
      for (const att of asgn.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: asgn.id } });
    }
    console.log('✓ Đã dọn dẹp xong.');
  }

  // 3. Nội dung bài giảng Markdown nâng cấp với nhiều ví dụ sinh động
  const lectureMarkdown = `# 🍬 CHUYẾN PHIÊU LƯU CHIA KẸO: KHÁM PHÁ PHÉP CHIA KỲ DIỆU (THREE.JS 3D)
**Dành tặng bạn nhỏ an_lake 6 tuổi thông thái • 16/11/2026**

Interactive 3D Simulation Studio: \`/lectures/an-lake-division-card/index.html\`

---

### 📖 1. Câu Chuyện Thỏ Trắng Mimi và Gấu Misa
Hôm nay bạn **Thỏ Trắng Mimi** 🐰 và bạn **Gấu Misa** 🐻 đến nhà bạn **an_lake** chơi. Hai bạn mang theo một rổ kẹo ngọt ngào!

Làm sao để **chia kẹo** cho Mimi và Misa bây giờ nhỉ?  
👉 **Bản chất của Phép Chia:** Là chia làm sao cho **mọi bạn đều nhận được số phần BẰNG NHAU**, không bạn nào bị ít hơn, tất cả cùng vui cười tít mắt!

**Bí kíp chia quà nhịp nhàng của an_lake:**  
> *"Một cái cho Thỏ Mimi, một cái cho Gấu Misa...*  
> *Lại một cái cho Thỏ Mimi, một cái cho Gấu Misa...*  
> *Chia từng lượt cho tới khi hết sạch kẹo trong rổ!"*

---

### ✨ 2. Các Ví Dụ Kỳ Diệu Cực Dễ Hiểu

* **Ví dụ 1 (Chia kẹo cho 2 bạn):**  
  Có **6 cái kẹo** 🍬 chia đều cho **2 bạn**, mỗi bạn được **3 cái kẹo**!  
  $$6 \\div 2 = 3$$

* **Ví dụ 2 (Chia dâu tây cho 2 bạn thỏ):**  
  Có **8 quả dâu tây đỏ mọng** 🍓 chia đều cho **2 bạn thỏ** 🐰🐰, mỗi bạn nhận được **4 quả dâu**!  
  $$8 \\div 2 = 4$$

* **Ví dụ 3 (Chia cà rốt cho 3 bạn chuột túi):**  
  Có **9 củ cà rốt giòn ngọt** 🥕 chia đều cho **3 bạn chuột túi** 🦘🦘🦘, mỗi bạn nhận được **3 củ cà rốt**!  
  $$9 \\div 3 = 3$$

* **Ví dụ 4 (Chia kẹo mút cầu vồng cho 3 bạn sóc):**  
  Có **12 que kẹo mút lấp lánh** 🍭 chia đều cho **3 bạn sóc con** 🐿️🐿️🐿️, mỗi bạn nhận được **4 que kẹo**!  
  $$12 \\div 3 = 4$$

* **Ví dụ 5 (Chia bánh quy sao cho 2 bạn gấu bông):**  
  Có **10 chiếc bánh quy bơ thơm phức** 🍪 chia đều cho **2 bạn gấu** 🐻🐻, mỗi bạn nhận được **5 chiếc bánh**!  
  $$10 \\div 2 = 5$$

---

### 👑 3. Bảng Bí Kíp Chia Nhanh Của An Lake
| Số Quà Ban Đầu | Chia Cho Mấy Bạn? | Mỗi Bạn Được Mấy Món? | Phép Tính Phép Thuật |
| :---: | :---: | :---: | :---: |
| 4 món 🍓 | 2 bạn | 2 món | $4 \\div 2 = 2$ |
| 6 món 🍬 | 2 bạn | 3 món | $6 \\div 2 = 3$ |
| 8 món 🍎 | 2 bạn | 4 món | $8 \\div 2 = 4$ |
| 10 món 🍪 | 2 bạn | 5 món | $10 \\div 2 = 5$ |
| 6 món 🥕 | 3 bạn | 2 món | $6 \\div 3 = 2$ |
| 9 món 🍉 | 3 bạn | 3 món | $9 \\div 3 = 3$ |
| 12 món 🍭 | 3 bạn | 4 món | $12 \\div 3 = 4$ |
| 8 món 🥢 (đôi đũa) | 4 người | 2 chiếc (1 đôi) | $8 \\div 4 = 2$ |

---

### 🎮 4 Trạm Trải Nghiệm Trong Web Studio Three.js 3D:
1. **Trạm 1 - Câu Chuyện Thần Tiên & Ví Dụ Minh Họa**: Khám phá thế giới chia quà công bằng.
2. **Trạm 2 - Không Gian Kẹo 3D Three.js (3D Candy Wonderland)**: Tự tay xoay ngắm và chạm vào những viên kẹo 3D bay bổng lấp lánh, chia kẹo vào từng đĩa 3D của các bạn thú với âm thanh Web Audio và pháo hoa.
3. **Trạm 3 - Đấu Trường Đố Vui 20 Câu Hỏi**: 20 câu trắc nghiệm thú vị chinh phục 20 Ngôi Sao Thông Thái và Cúp Vàng Vinh Quang 🏆!
4. **Trạm 4 - Cẩm Nang Ba Mẹ**: Phương pháp gợi ý tư duy trực quan hình tượng cho bé 6 tuổi trong sinh hoạt gia đình.
`;

  // 4. Tạo Learning Unit
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: mathSubject.id,
      created_by: teacher.id,
      title: 'Chuyến Phiêu Lưu Chia Kẹo: Khám Phá Phép Chia Kỳ Diệu Cùng Bé an_lake (Three.js 3D)',
      description: 'Card học tập tương tác Three.js 3D & 20 bài tập đố vui phép chia ngày 16/11/2026: Bé an_lake khám phá câu chuyện chia đều, phòng thí nghiệm kẹo 3D lấp lánh và thử thách 20 câu nhận cúp vô địch.',
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
      title: 'Đại Hội Đố Vui Chia Kẹo Công Bằng Cùng Bé an_lake (20 Thử Thách) 🍬👑',
      instructions: 'Bé hãy ngắm nhìn từng câu đố chia quà cho các bạn thú, suy nghĩ thật kĩ rồi bấm chọn đáp án đúng để rinh trọn 20 ngôi sao lấp lánh và Cúp Vô Địch nhé!',
      time_limit_minutes: 60,
      max_score: 20.0,
    },
  });
  console.log('✓ Đã tạo Assessment:', assessment.title);

  // 6. Danh sách 20 câu hỏi trắc nghiệm chia quà sinh động
  const questionsData = [
    // --- NHÓM 1: CHIA CHO 2 BẠN (CÂU 1 - 8) ---
    {
      order_index: 1,
      prompt: 'Có **4** quả dâu tây đỏ mọng 🍓 chia đều cho **2** bạn thỏ 🐰🐰. Hỏi mỗi bạn thỏ nhận được mấy quả dâu tây?\n\n*Phép tính: $4 \\div 2 = ?$*',
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
      prompt: 'Có **6** củ cà rốt giòn ngọt 🥕 chia đều cho **2** bạn chuột túi 🦘🦘. Hỏi mỗi bạn chuột túi nhận được mấy củ cà rốt?\n\n*Phép tính: $6 \\div 2 = ?$*',
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
      order_index: 3,
      prompt: 'Có **8** quả táo đỏ thơm ngọt 🍎 chia đều cho **2** bạn sóc nâu 🐿️🐿️. Hỏi mỗi bạn sóc được mấy quả táo?\n\n*Phép tính: $8 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '3 quả táo' },
        { id: 'B', text: '4 quả táo đỏ thơm ngon' },
        { id: 'C', text: '5 quả táo' },
        { id: 'D', text: '6 quả táo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 8 quả táo chia đều cho 2 bạn sóc: $8 \\div 2 = 4$ quả táo đỏ!',
      points: 1.0,
    },
    {
      order_index: 4,
      prompt: 'Có **10** ngôi sao may mắn lấp lánh ⭐ chia đều cho **2** bạn gấu 🐻🐻. Hỏi mỗi bạn gấu được mấy ngôi sao?\n\n*Phép tính: $10 \\div 2 = ?$*',
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
    {
      order_index: 5,
      prompt: 'Có **12** que kem hoa quả mát lạnh 🍦 chia đều cho **2** bạn chim cánh cụt 🐧🐧. Hỏi mỗi bạn chim cánh cụt nhận được mấy que kem?\n\n*Phép tính: $12 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '5 que kem' },
        { id: 'B', text: '6 que kem hoa quả' },
        { id: 'C', text: '7 que kem' },
        { id: 'D', text: '8 que kem' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 12 que kem chia đều cho 2 bạn chim cánh cụt: $12 \\div 2 = 6$ que kem!',
      points: 1.0,
    },
    {
      order_index: 6,
      prompt: 'Có **14** viên kẹo sô-cô-la ngọt ngào 🍫 chia đều cho **2** bạn khỉ con 🐒🐒. Hỏi mỗi bạn khỉ nhận được mấy viên kẹo sô-cô-la?\n\n*Phép tính: $14 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '6 viên kẹo' },
        { id: 'B', text: '7 viên kẹo sô-cô-la' },
        { id: 'C', text: '8 viên kẹo' },
        { id: 'D', text: '9 viên kẹo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 14 viên kẹo sô-cô-la chia đều cho 2 bạn khỉ: $14 \\div 2 = 7$ viên kẹo!',
      points: 1.0,
    },
    {
      order_index: 7,
      prompt: 'Có **16** quả cherry đỏ mọng 🍒 chia đều cho **2** bạn thiên nga 🦢🦢. Hỏi mỗi bạn thiên nga nhận được mấy quả cherry?\n\n*Phép tính: $16 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '7 quả cherry' },
        { id: 'B', text: '8 quả cherry đỏ mọng' },
        { id: 'C', text: '9 quả cherry' },
        { id: 'D', text: '10 quả cherry' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 16 quả cherry chia đều cho 2 bạn thiên nga: $16 \\div 2 = 8$ quả cherry!',
      points: 1.0,
    },
    {
      order_index: 8,
      prompt: 'Có **18** hạt dẻ thơm lừng 🌰 chia đều cho **2** bạn sóc xám 🐿️🐿️. Hỏi mỗi bạn sóc nhận được mấy hạt dẻ?\n\n*Phép tính: $18 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '8 hạt dẻ' },
        { id: 'B', text: '9 hạt dẻ thơm lừng' },
        { id: 'C', text: '10 hạt dẻ' },
        { id: 'D', text: '11 hạt dẻ' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 18 hạt dẻ chia đều cho 2 bạn sóc: $18 \\div 2 = 9$ hạt dẻ!',
      points: 1.0,
    },

    // --- NHÓM 2: CHIA CHO 3 BẠN (CÂU 9 - 15) ---
    {
      order_index: 9,
      prompt: 'Có **6** cái kẹo ngọt 🍬 chia đều cho **3** bạn mèo con 🐱🐱🐱. Hỏi mỗi bạn mèo nhận được mấy cái kẹo ngọt?\n\n*Phép tính: $6 \\div 3 = ?$*',
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
      order_index: 10,
      prompt: 'Có **9** miếng dưa hấu mát rượi 🍉 chia đều cho **3** bạn gấu trúc 🐼🐼🐼. Hỏi mỗi bạn gấu trúc được mấy miếng dưa hấu?\n\n*Phép tính: $9 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '2 miếng dưa' },
        { id: 'B', text: '3 miếng dưa hấu ngọt lịm' },
        { id: 'C', text: '4 miếng dưa' },
        { id: 'D', text: '5 miếng dưa' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 9 miếng dưa hấu chia đều cho 3 bạn gấu trúc: $9 \\div 3 = 3$ miếng dưa hấu!',
      points: 1.0,
    },
    {
      order_index: 11,
      prompt: 'Có **12** que kẹo mút cầu vồng 🍭 chia đều cho **3** bạn thỏ trắng 🐰🐰🐰. Hỏi mỗi bạn thỏ nhận được mấy que kẹo mút?\n\n*Phép tính: $12 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '3 que kẹo' },
        { id: 'B', text: '4 que kẹo mút cầu vồng' },
        { id: 'C', text: '5 que kẹo' },
        { id: 'D', text: '6 que kẹo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 12 que kẹo mút chia đều cho 3 bạn thỏ: $12 \\div 3 = 4$ que kẹo mút!',
      points: 1.0,
    },
    {
      order_index: 12,
      prompt: 'Có **15** viên bi ve phát sáng phép thuật 🔮 chia đều cho **3** chú rồng con 🐉🐉🐉. Hỏi mỗi chú rồng nhận được mấy viên bi ve?\n\n*Phép tính: $15 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '4 viên bi ve' },
        { id: 'B', text: '5 viên bi ve phép thuật' },
        { id: 'C', text: '6 viên bi ve' },
        { id: 'D', text: '7 viên bi ve' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 15 viên bi ve chia đều cho 3 chú rồng: $15 \\div 3 = 5$ viên bi ve!',
      points: 1.0,
    },
    {
      order_index: 13,
      prompt: 'Có **18** quả bóng bay đủ sắc màu 🎈 chia đều cho **3** bạn voi con 🐘🐘🐘. Hỏi mỗi bạn voi con nhận được mấy quả bóng bay?\n\n*Phép tính: $18 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '5 quả bóng bay' },
        { id: 'B', text: '6 quả bóng bay sắc màu' },
        { id: 'C', text: '7 quả bóng bay' },
        { id: 'D', text: '8 quả bóng bay' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 18 quả bóng bay chia đều cho 3 bạn voi: $18 \\div 3 = 6$ quả bóng bay!',
      points: 1.0,
    },
    {
      order_index: 14,
      prompt: 'Có **15** bắp ngô nướng vàng thơm phức 🌽 chia đều cho **3** bạn hươu cao cổ 🦒🦒🦒. Hỏi mỗi bạn hươu nhận được mấy bắp ngô nướng?\n\n*Phép tính: $15 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '4 bắp ngô' },
        { id: 'B', text: '5 bắp ngô nướng vàng' },
        { id: 'C', text: '6 bắp ngô' },
        { id: 'D', text: '7 bắp ngô' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 15 bắp ngô chia đều cho 3 bạn hươu cao cổ: $15 \\div 3 = 5$ bắp ngô!',
      points: 1.0,
    },
    {
      order_index: 15,
      prompt: 'Có **6** hộp sữa dâu thơm lừng 🧃 chia đều cho **3** bạn nhỏ cùng uống. Hỏi mỗi bạn nhỏ được mấy hộp sữa dâu?\n\n*Phép tính: $6 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '1 hộp sữa' },
        { id: 'B', text: '2 hộp sữa dâu thơm ngon' },
        { id: 'C', text: '3 hộp sữa' },
        { id: 'D', text: '4 hộp sữa' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 6 hộp sữa dâu chia đều cho 3 bạn: $6 \\div 3 = 2$ hộp sữa dâu!',
      points: 1.0,
    },

    // --- NHÓM 3: CHIA CHO 4 BẠN & ĐỐ VUI THỰC TẾ (CÂU 16 - 20) ---
    {
      order_index: 16,
      prompt: 'Có **8** chiếc bánh quy bơ 🍪 chia đều cho **4** bạn cún con 🐶🐶🐶🐶. Hỏi mỗi bạn cún con nhận được mấy chiếc bánh quy?\n\n*Phép tính: $8 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '1 chiếc bánh' },
        { id: 'B', text: '2 chiếc bánh quy bơ thơm phức' },
        { id: 'C', text: '3 chiếc bánh' },
        { id: 'D', text: '4 chiếc bánh' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 8 chiếc bánh quy chia đều cho 4 bạn cún: $8 \\div 4 = 2$ chiếc bánh quy bơ!',
      points: 1.0,
    },
    {
      order_index: 17,
      prompt: 'Trong bữa cơm gia đình, bé An lấy **8** chiếc đũa 🥢 chia đều cho **4** người ngồi ăn cơm. Hỏi mỗi người nhận được mấy chiếc đũa?\n\n*Phép tính: $8 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '1 chiếc đũa' },
        { id: 'B', text: '2 chiếc đũa (vừa vặn 1 đôi đũa)' },
        { id: 'C', text: '3 chiếc đũa' },
        { id: 'D', text: '4 chiếc đũa' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 8 chiếc đũa chia đều cho 4 người: $8 \\div 4 = 2$ chiếc đũa, chính là 1 đôi đũa xinh xắn!',
      points: 1.0,
    },
    {
      order_index: 18,
      prompt: 'Có **12** chiếc bánh cupcake kem dâu 🧁 chia đều cho **4** bạn kỳ lân 🦄🦄🦄🦄. Hỏi mỗi bạn kỳ lân nhận được mấy chiếc bánh cupcake?\n\n*Phép tính: $12 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '2 chiếc bánh' },
        { id: 'B', text: '3 chiếc bánh cupcake ngọt ngào' },
        { id: 'C', text: '4 chiếc bánh' },
        { id: 'D', text: '5 chiếc bánh' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 12 chiếc bánh cupcake chia đều cho 4 bạn kỳ lân: $12 \\div 4 = 3$ chiếc bánh cupcake!',
      points: 1.0,
    },
    {
      order_index: 19,
      prompt: 'Có **20** viên kẹo dẻo gấu Haribo 🧸 chia đều cho **2** bạn nhỏ an_lake và bạn thân. Hỏi mỗi bạn nhận được bao nhiêu viên kẹo gấu?\n\n*Phép tính: $20 \\div 2 = ?$*',
      options: [
        { id: 'A', text: '8 viên kẹo gấu' },
        { id: 'B', text: '10 viên kẹo dẻo gấu thơm ngon' },
        { id: 'C', text: '12 viên kẹo gấu' },
        { id: 'D', text: '15 viên kẹo gấu' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 20 viên kẹo dẻo gấu chia đều cho 2 bạn: $20 \\div 2 = 10$ viên kẹo gấu!',
      points: 1.0,
    },
    {
      order_index: 20,
      prompt: '👑 **THỬ THÁCH CÚP VÀNG CUỐI CÙNG:**\nBé an_lake mang ra **16** khối gạch LEGO phép thuật 🧱 chia đều cho **4** bạn thú bông để cùng xây 4 tòa lâu đài nguy nga. Hỏi mỗi bạn thú bông nhận được mấy khối gạch LEGO?\n\n*Phép tính: $16 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '3 khối gạch' },
        { id: 'B', text: '4 khối gạch LEGO phép thuật' },
        { id: 'C', text: '5 khối gạch' },
        { id: 'D', text: '6 khối gạch' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 16 khối gạch LEGO chia đều cho 4 bạn: $16 \\div 4 = 4$ khối gạch! Chúc mừng Bé An xuất sắc chinh phục trọn vẹn 20 Thử Thách Chia Quà!',
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
      custom_session_minutes: 60,
      teacher_daily_note: 'Hôm nay bé an_lake cùng Thỏ Mimi và Gấu Misa khám phá thế giới Kẹo 3D Three.js và chinh phục 20 câu đố vui nhận Cúp Vô Địch nhé! Bé bấm "Khám Phá Bài Học 🎈" để vào chơi nha! 🍬👑',
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
