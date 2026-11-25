const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('👑 Bắt đầu tạo Card Bài Giảng & 10 Bài Tập Công Chúa Phép Chia Hết cho Bé an_lake ngày 25/11/2026...');

  // 1. Tìm tài khoản Bé An, Giáo viên và Môn MATH_1
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

  // Target Date: 2026-11-25
  const targetDate = new Date('2026-11-25T00:00:00.000Z');

  // 2. Dọn dẹp bài cũ ngày 25/11/2026 của Bé An nếu đã có
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
    console.log(`⚠️ Tìm thấy ${existingAsgns.length} bài cũ ngày 25/11/2026 của Bé An, dọn dẹp để thay thế...`);
    for (const asgn of existingAsgns) {
      for (const att of asgn.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: asgn.id } });
    }
    console.log('✓ Đã dọn dẹp xong bài cũ.');
  }

  // 3. Nội dung bài giảng Markdown Công Chúa Đảo Pha Lê
  const lectureMarkdown = `# 👑 CHUYẾN DU HÀNH ĐẢO PHA LÊ: PHÉP CHIA HẾT 3 CHỮ SỐ CHO 1 CHỮ SỐ
**Dành tặng Công chúa nhỏ an_lake thông thái • 25/11/2026**

Interactive Simulation Studio: \`/lectures/an-lake-princess-division-2511/index.html\`

---

### 📖 1. Câu Chuyện Dâu Tây Tuyết & Đảo Pha Lê
Hôm nay Công chúa **An Lake** 👸 đến thăm **Đảo Pha Lê & Khu Vườn Thần Tiên** 🍓!  
Công chúa hái được **216 quả dâu tây tuyết phủ sô-cô-la trắng** 🍓 và muốn chia đều cho **3 bạn thỏ ngọc trắng** 🐰🐰🐰.  
Hỏi mỗi bạn thỏ ngọc nhận được bao nhiêu quả dâu tây tuyết?

![Bí kíp đặt tính chia công chúa: 216 chia 3 bằng 72](/images/lop1/princess_division_2511/lecture_princess_division_2511.svg)

---

### 🪄 2. Câu Thần Chú 4 Nhịp: "GỘP CHIA – NHÂN TRỪ – HẠ DƯ 0"
Khi đặt tính chia số có **3 chữ số** cho số có **1 chữ số**, Công chúa luôn thực hiện từ **trái sang phải**:

1. **Bước 1 — Vì $2 < 3$ nên gộp 2 chữ số đầu:**  
   Lấy **21** chia cho **3**:  
   $$21 \\div 3 = 7 \\text{ (vì } 7 \\times 3 = 21\\text{, } 21 - 21 = 0\\text{)}$$
2. **Bước 2 — Hạ chữ số tiếp theo:**  
   Hạ **6** xuống cạnh số dư **0** để được **6**:  
   $$6 \\div 3 = 2 \\text{ (vì } 2 \\times 3 = 6\\text{, } 6 - 6 = 0\\text{)}$$
3. **Bước 3 — Kiểm tra số dư bằng 0 (CHIA HẾT!):**  
   Số dư cuối cùng là **0** nên đây là **phép chia hết**:  
   $$216 \\div 3 = 72$$  
   *Mẹo thử lại của Công chúa:* $72 \\times 3 = 216$ (Chính xác tuyệt đối!)

---

### 🌈 3. Bảng Bí Kíp Các Dạng Phép Chia Hết Ngày 25/11
| Dạng Phép Chia | Ví Dụ Phép Thuật | Cách Nhẩm Nhanh Của Công Chúa | Kết Quả |
| :---: | :---: | :--- | :---: |
| **Chia đều từng chữ số** | $488 \\div 4$ | $4 \\div 4 = 1$, $8 \\div 4 = 2$, $8 \\div 4 = 2$ | **$122$** |
| **Gộp 2 chữ số đầu** | $216 \\div 3$ | $21 \\div 3 = 7$ (dư $0$), hạ $6 \\to 6 \\div 3 = 2$ | **$72$** |
| **Gộp 2 chữ số đầu** | $357 \\div 7$ | $35 \\div 7 = 5$ (dư $0$), hạ $7 \\to 7 \\div 7 = 1$ | **$51$** |
| **Có chữ số 0 ở giữa** | $624 \\div 6$ | $6 \\div 6 = 1$; hạ $2 < 6$ viết **$0$**; hạ $4 \\to 24 \\div 6 = 4$ | **$104$** |
| **Có chữ số 0 ở cuối** | $840 \\div 4$ | $8 \\div 4 = 2$, $4 \\div 4 = 1$; hạ $0 \\to 0 \\div 4 = 0$ viết **$0$** | **$210$** |
| **Có chữ số 0 ở giữa** | $864 \\div 8$ | $8 \\div 8 = 1$; hạ $6 < 8$ viết **$0$**; hạ $4 \\to 64 \\div 8 = 8$ | **$108$** |

---

### 🎮 Khám Phá Phòng Phép Thuật Tương Tác:
Bé bấm **"Khám Phá Bài Học 🎈"** để mở Đũa Thần Đặt Tính Chia từng bước và chinh phục **10 thử thách Công chúa nhận Vương Miện Vàng** nhé! 👑✨
`;

  // 4. Tạo Learning Unit
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: mathSubject.id,
      created_by: teacher.id,
      title: 'Vương Quốc Công Chúa: Phép Chia Hết 3 Chữ Số Cho 1 Chữ Số (10 Thử Thách Ngày 25/11)',
      description:
        'Bài giảng tương tác Đũa Thần Đặt Tính Chia & 10 bài tập phép chia hết số có 3 chữ số cho 1 chữ số (như 488÷4=122, 216÷3=72, 624÷6=104, 864÷8=108) kèm tranh minh họa Công chúa cho Bé An ngày 25/11/2026.',
      lecture_content_markdown: lectureMarkdown,
      lecture_attachments: [],
      is_template: true,
    },
  });
  console.log('✓ Đã tạo Learning Unit:', learningUnit.title);

  // 5. Tạo Assessment (10 câu trắc nghiệm minh họa công chúa)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      type: 'IN_SESSION_90M',
      title: 'Đại Hội Công Chúa: Chinh Phục 10 Phép Chia Hết Đảo Pha Lê 👑💎',
      instructions:
        'Công chúa An Lake hãy ngắm từng bức tranh minh họa thần tiên, đặt tính chia từ trái sang phải rồi bấm chọn đáp án đúng để rinh trọn 10 vương miện lấp lánh nhé!',
      time_limit_minutes: 45,
      max_score: 10.0,
    },
  });
  console.log('✓ Đã tạo Assessment:', assessment.title);

  // 6. Danh sách 10 câu hỏi trắc nghiệm (Mỗi câu có 1 tranh minh họa SVG công chúa riêng + độ dài đáp án đồng đều + không trùng đáp án liên tiếp)
  // Sequence: B, C, A, D, B, A, C, D, B, C
  const questionsData = [
    {
      order_index: 1,
      prompt:
        '![Kẹo dẻo trái tim trong 4 lọ thủy tinh](/images/lop1/princess_division_2511/q01.svg)\n\n💖 Công chúa An Lake có **488** viên kẹo dẻo trái tim lung linh được chia đều vào **4** lọ thủy tinh phép thuật 🏺. Hỏi mỗi lọ thủy tinh đựng bao nhiêu viên kẹo dẻo?\n\n*Phép tính: $488 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '120 viên kẹo dẻo' },
        { id: 'B', text: '122 viên kẹo dẻo' },
        { id: 'C', text: '124 viên kẹo dẻo' },
        { id: 'D', text: '112 viên kẹo dẻo' },
      ],
      correct_option_id: 'B',
      explanation:
        'Chia từng chữ số từ trái sang phải: $4 \\div 4 = 1$, $8 \\div 4 = 2$, $8 \\div 4 = 2$. Vậy $488 \\div 4 = 122$ viên kẹo dẻo! 💖',
      points: 1.0,
    },
    {
      order_index: 2,
      prompt:
        '![Dâu tây tuyết chia cho 3 bạn thỏ ngọc](/images/lop1/princess_division_2511/q02.svg)\n\n🍓 Công chúa An Lake hái được **216** quả dâu tây tuyết phủ sô-cô-la trắng chia đều cho **3** bạn thỏ ngọc trắng 🐰🐰🐰. Hỏi mỗi bạn thỏ ngọc nhận được bao nhiêu quả dâu tây tuyết?\n\n*Phép tính: $216 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '70 quả dâu tây tuyết' },
        { id: 'B', text: '74 quả dâu tây tuyết' },
        { id: 'C', text: '72 quả dâu tây tuyết' },
        { id: 'D', text: '76 quả dâu tây tuyết' },
      ],
      correct_option_id: 'C',
      explanation:
        'Vì $2 < 3$, gộp $21 \\div 3 = 7$ (dư $0$). Hạ $6$ xuống được $6 \\div 3 = 2$ (dư $0$). Vậy $216 \\div 3 = 72$ quả dâu tây tuyết! 🍓',
      points: 1.0,
    },
    {
      order_index: 3,
      prompt:
        '![Lông vũ cầu vồng đính lên 7 chiếc quạt](/images/lop1/princess_division_2511/q03.svg)\n\n🪶 Trong Lâu Đài Ánh Sáng có **357** chiếc lông vũ cầu vồng phát sáng được đính đều lên **7** chiếc quạt dạ hội công chúa 🪭. Hỏi mỗi chiếc quạt được đính bao nhiêu chiếc lông vũ?\n\n*Phép tính: $357 \\div 7 = ?$*',
      options: [
        { id: 'A', text: '51 chiếc lông vũ' },
        { id: 'B', text: '53 chiếc lông vũ' },
        { id: 'C', text: '49 chiếc lông vũ' },
        { id: 'D', text: '55 chiếc lông vũ' },
      ],
      correct_option_id: 'A',
      explanation:
        'Vì $3 < 7$, gộp $35 \\div 7 = 5$ (dư $0$). Hạ $7$ xuống được $7 \\div 7 = 1$ (dư $0$). Vậy $357 \\div 7 = 51$ chiếc lông vũ! 🪶',
      points: 1.0,
    },
    {
      order_index: 4,
      prompt:
        '![Hoa sen đá ngọc bích trong 6 bồn hoàng cung](/images/lop1/princess_division_2511/q04.svg)\n\n🪷 Khu Vườn Cung Điện có **624** đóa hoa sen đá ngọc bích được trồng đều trong **6** bồn hoa hoàng cung 🪴. Hỏi mỗi bồn hoa có bao nhiêu đóa hoa sen đá?\n\n*Phép tính: $624 \\div 6 = ?$*',
      options: [
        { id: 'A', text: '140 đóa hoa sen đá' },
        { id: 'B', text: '14 đóa hoa sen đá' },
        { id: 'C', text: '102 đóa hoa sen đá' },
        { id: 'D', text: '104 đóa hoa sen đá' },
      ],
      correct_option_id: 'D',
      explanation:
        '$6 \\div 6 = 1$; hạ $2$, vì $2 < 6$ nên viết **$0$** vào thương; hạ $4$ xuống được $24 \\div 6 = 4$ (dư $0$). Vậy $624 \\div 6 = 104$ đóa hoa sen đá! 🪷',
      points: 1.0,
    },
    {
      order_index: 5,
      prompt:
        '![Kẹo mút xoắn ốc chia vào 5 giỏ mây nàng tiên](/images/lop1/princess_division_2511/q05.svg)\n\n🍭 Xứ Sở Bánh Kẹo tặng Công chúa **270** que kẹo mút xoắn ốc vị việt quất chia đều vào **5** giỏ mây 🧺 của các nàng tiên hoa. Hỏi mỗi giỏ mây đựng bao nhiêu que kẹo mút?\n\n*Phép tính: $270 \\div 5 = ?$*',
      options: [
        { id: 'A', text: '52 que kẹo mút' },
        { id: 'B', text: '54 que kẹo mút' },
        { id: 'C', text: '56 que kẹo mút' },
        { id: 'D', text: '50 que kẹo mút' },
      ],
      correct_option_id: 'B',
      explanation:
        'Vì $2 < 5$, gộp $27 \\div 5 = 5$ (vì $5 \\times 5 = 25$, dư $2$). Hạ $0$ xuống được $20 \\div 5 = 4$ (dư $0$). Vậy $270 \\div 5 = 54$ que kẹo mút! 🍭',
      points: 1.0,
    },
    {
      order_index: 6,
      prompt:
        '![Chuông gió bạc trên 8 ban công ánh trăng](/images/lop1/princess_division_2511/q06.svg)\n\n🎐 Có **584** chiếc chuông gió bạc lấp lánh được treo đều trên **8** ban công của Lâu Đài Ánh Trăng 🏰. Hỏi mỗi ban công treo bao nhiêu chiếc chuông gió bạc?\n\n*Phép tính: $584 \\div 8 = ?$*',
      options: [
        { id: 'A', text: '73 chiếc chuông gió bạc' },
        { id: 'B', text: '71 chiếc chuông gió bạc' },
        { id: 'C', text: '75 chiếc chuông gió bạc' },
        { id: 'D', text: '77 chiếc chuông gió bạc' },
      ],
      correct_option_id: 'A',
      explanation:
        'Vì $5 < 8$, gộp $58 \\div 8 = 7$ (vì $7 \\times 8 = 56$, dư $2$). Hạ $4$ xuống được $24 \\div 8 = 3$ (dư $0$). Vậy $584 \\div 8 = 73$ chiếc chuông gió bạc! 🎐',
      points: 1.0,
    },
    {
      order_index: 7,
      prompt:
        '![Ngọc trai tím tặng 4 bạn thiên nga nhỏ](/images/lop1/princess_division_2511/q07.svg)\n\n🦪 Nàng Tiên Cá mang tặng **840** hạt ngọc trai tím lấp lánh chia đều cho **4** bạn thiên nga nhỏ 🦢 để xâu vòng cổ. Hỏi mỗi bạn thiên nga nhận được bao nhiêu hạt ngọc trai tím?\n\n*Phép tính: $840 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '201 hạt ngọc trai tím' },
        { id: 'B', text: '214 hạt ngọc trai tím' },
        { id: 'C', text: '210 hạt ngọc trai tím' },
        { id: 'D', text: '220 hạt ngọc trai tím' },
      ],
      correct_option_id: 'C',
      explanation:
        '$8 \\div 4 = 2$; $4 \\div 4 = 1$; hạ $0$, $0 \\div 4 = 0$ (viết **$0$** vào cuối thương). Vậy $840 \\div 4 = 210$ hạt ngọc trai tím! 🦪',
      points: 1.0,
    },
    {
      order_index: 8,
      prompt:
        '![Ruy băng lụa hồng chia cho 9 chú bồ câu trắng](/images/lop1/princess_division_2511/q08.svg)\n\n🎀 Chuẩn bị Dạ Tiệc Khiêu Vũ, có **432** dải ruy băng lụa hồng thắt nơ được chia đều cho **9** chú bồ câu trắng 🕊️ mang đi trang trí. Hỏi mỗi chú bồ câu mang bao nhiêu dải ruy băng lụa?\n\n*Phép tính: $432 \\div 9 = ?$*',
      options: [
        { id: 'A', text: '46 dải ruy băng lụa' },
        { id: 'B', text: '52 dải ruy băng lụa' },
        { id: 'C', text: '44 dải ruy băng lụa' },
        { id: 'D', text: '48 dải ruy băng lụa' },
      ],
      correct_option_id: 'D',
      explanation:
        'Vì $4 < 9$, gộp $43 \\div 9 = 4$ (vì $4 \\times 9 = 36$, dư $7$). Hạ $2$ xuống được $72 \\div 9 = 8$ (dư $0$). Vậy $432 \\div 9 = 48$ dải ruy băng lụa! 🎀',
      points: 1.0,
    },
    {
      order_index: 9,
      prompt:
        '![Táo vàng phép thuật trên 7 cỗ xe kéo](/images/lop1/princess_division_2511/q09.svg)\n\n🍏 Trong vườn ngự uyển có **728** quả táo vàng phép thuật được xếp đều vào **7** cỗ xe kéo hoàng gia 🛷. Hỏi mỗi cỗ xe kéo chở bao nhiêu quả táo vàng?\n\n*Phép tính: $728 \\div 7 = ?$*',
      options: [
        { id: 'A', text: '14 quả táo vàng' },
        { id: 'B', text: '104 quả táo vàng' },
        { id: 'C', text: '114 quả táo vàng' },
        { id: 'D', text: '140 quả táo vàng' },
      ],
      correct_option_id: 'B',
      explanation:
        '$7 \\div 7 = 1$; hạ $2$, vì $2 < 7$ nên viết **$0$** vào thương; hạ $8$ xuống được $28 \\div 7 = 4$ (dư $0$). Vậy $728 \\div 7 = 104$ quả táo vàng! 🍏',
      points: 1.0,
    },
    {
      order_index: 10,
      prompt:
        '![Đá sapphire xanh đính lên 8 vương trượng](/images/lop1/princess_division_2511/q10.svg)\n\n👑 **THỬ THÁCH VƯƠNG TRƯỢNG VÀNG:** Kho báu hoàng cung có **864** viên đá sapphire xanh biếc 💎 chia đều để đính lên **8** vương trượng hoàng gia. Hỏi mỗi chiếc vương trượng được đính bao nhiêu viên đá sapphire?\n\n*Phép tính: $864 \\div 8 = ?$*',
      options: [
        { id: 'A', text: '18 viên đá sapphire' },
        { id: 'B', text: '118 viên đá sapphire' },
        { id: 'C', text: '108 viên đá sapphire' },
        { id: 'D', text: '180 viên đá sapphire' },
      ],
      correct_option_id: 'C',
      explanation:
        '$8 \\div 8 = 1$; hạ $6$, vì $6 < 8$ nên viết **$0$** vào thương; hạ $4$ xuống được $64 \\div 8 = 8$ (dư $0$). Vậy $864 \\div 8 = 108$ viên đá sapphire! Chúc mừng Công chúa An Lake xuất sắc rinh Vương Miện Vàng! 👑💎✨',
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
  console.log(`✓ Đã tạo thành công ${questionsData.length} câu hỏi minh họa Công chúa.`);

  // 7. Giao bài ngày 25/11/2026 cho Bé An
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: studentAn.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 45,
      teacher_daily_note:
        'Chào Công chúa An Lake! Hôm nay chúng mình cùng du hành Đảo Pha Lê, khám phá bí kíp phép chia hết 3 chữ số cho 1 chữ số (216÷3=72, 624÷6=104, 864÷8=108) và chinh phục 10 thử thách công chúa thật vui nhé! 👑🍓🪷',
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

  console.log('✓ Đã giao Card học tập & 10 bài tập ngày 25/11/2026 cho Công chúa An Lake!');
  console.log(`  - Assignment ID: ${assignment.id}`);
  console.log(`  - Learning Unit ID: ${learningUnit.id}`);
  console.log(`  - Assessment ID: ${assessment.id}`);
  console.log(`  - Attempt ID: ${attempt.id}`);
  console.log('  - Interactive Studio URL: /lectures/an-lake-princess-division-2511/index.html');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
