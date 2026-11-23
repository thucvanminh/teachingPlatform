const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('👑 Bắt đầu tạo Card Bài Giảng & 10 Bài Tập Công Chúa Phép Chia Hết cho Bé an_lake ngày 23/11/2026...');

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

  // Target Date: 2026-11-23
  const targetDate = new Date('2026-11-23T00:00:00.000Z');

  // 2. Dọn dẹp bài cũ ngày 23/11/2026 của Bé An nếu đã có
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
    console.log(`⚠️ Tìm thấy ${existingAsgns.length} bài cũ ngày 23/11/2026 của Bé An, dọn dẹp để thay thế...`);
    for (const asgn of existingAsgns) {
      for (const att of asgn.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: asgn.id } });
    }
    console.log('✓ Đã dọn dẹp xong bài cũ.');
  }

  // 3. Nội dung bài giảng Markdown Công Chúa Pha Lê
  const lectureMarkdown = `# 👑 VƯƠNG QUỐC CÔNG CHÚA: PHÉP CHIA HẾT 3 CHỮ SỐ CHO 1 CHỮ SỐ
**Dành tặng Công chúa nhỏ an_lake thông thái • 23/11/2026**

Interactive Simulation Studio: \`/lectures/an-lake-princess-division-2311/index.html\`

---

### 📖 1. Câu Chuyện Vũ Hội Lâu Đài Pha Lê
Hôm nay Công chúa **An Lake** 👸 chuẩn bị cho **Vũ Hội Lâu Đài Pha Lê** 🏰!  
Công chúa có **168 viên ngọc trai lấp lánh** 💎 và muốn chia đều cho **7 nàng tiên nhỏ** 🧚‍♀️.  
Hỏi mỗi nàng tiên nhận được bao nhiêu viên ngọc trai?

![Bí kíp đặt tính chia công chúa: 168 chia 7 bằng 24](/images/lop1/princess_division_2311/lecture_princess_division.svg)

---

### 🪄 2. Câu Thần Chú 4 Nhịp: "CHIA – NHÂN – TRỪ – HẠ"
Khi đặt tính chia số có **3 chữ số** cho số có **1 chữ số**, Công chúa luôn làm từ **trái sang phải**:

1. **Bước 1 — Gộp số nếu hàng trăm nhỏ hơn số chia:**  
   Vì $1 < 7$, ta gộp 2 chữ số đầu là **16** đem chia cho **7**:  
   $$16 \\div 7 = 2 \\text{ (vì } 2 \\times 7 = 14\\text{, } 16 - 14 = 2\\text{)}$$
2. **Bước 2 — Hạ chữ số tiếp theo:**  
   Hạ **8** xuống cạnh số dư **2** để được **28**:  
   $$28 \\div 7 = 4 \\text{ (vì } 4 \\times 7 = 28\\text{, } 28 - 28 = 0\\text{)}$$
3. **Bước 3 — Kiểm tra số dư bằng 0 (CHIA HẾT!):**  
   Số dư cuối cùng là **0** nên đây là **phép chia hết**:  
   $$168 \\div 7 = 24$$  
   *Mẹo thử lại của Công chúa:* $24 \\times 7 = 168$ (Chuẩn xác 100%!)

---

### 🌈 3. Bảng Bí Kíp 3 Kiểu Chia Hết Công Chúa Hay Gặp
| Kiểu Chia | Ví Dụ Phép Thuật | Cách Nhẩm Siêu Nhanh | Kết Quả |
| :---: | :---: | :--- | :---: |
| **Chia từng chữ số** | $369 \\div 3$ | $3 \\div 3 = 1$, $6 \\div 3 = 2$, $9 \\div 3 = 3$ | **$123$** |
| **Gộp 2 chữ số đầu** | $168 \\div 7$ | $16 \\div 7 = 2$ (dư $2$), hạ $8 \\to 28 \\div 7 = 4$ | **$24$** |
| **Gộp 2 chữ số đầu** | $425 \\div 5$ | $42 \\div 5 = 8$ (dư $2$), hạ $5 \\to 25 \\div 5 = 5$ | **$85$** |
| **Có số 0 ở giữa** | $618 \\div 6$ | $6 \\div 6 = 1$; hạ $1 < 6$ viết **$0$**; hạ $8 \\to 18 \\div 6 = 3$ | **$103$** |
| **Có số 0 ở cuối** | $560 \\div 7$ | $56 \\div 7 = 8$; hạ $0 \\to 0 \\div 7 = 0$ viết **$0$** | **$80$** |

---

### 🎮 Khám Phá Phòng Phép Thuật Tương Tác:
Bé bấm **"Khám Phá Bài Học 🎈"** để mở Đũa Thần Đặt Tính Chia từng bước và chinh phục **10 thử thách Công chúa rinh Vương Miện Vàng** nhé! 👑✨
`;

  // 4. Tạo Learning Unit
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: mathSubject.id,
      created_by: teacher.id,
      title: 'Vương Quốc Công Chúa: Phép Chia Hết 3 Chữ Số Cho 1 Chữ Số (10 Thử Thách)',
      description:
        'Bài giảng tương tác Đũa Thần Đặt Tính Chia & 10 bài tập phép chia hết số có 3 chữ số cho 1 chữ số (ví dụ 168÷7=24, 618÷6=103) kèm tranh minh họa Công chúa cho Bé An ngày 23/11/2026.',
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
      title: 'Đại Hội Công Chúa: Chinh Phục 10 Phép Chia Hết Kỳ Diệu 👑💎',
      instructions:
        'Công chúa An Lake hãy ngắm tranh minh họa thật đáng yêu, đặt tính chia từ trái sang phải rồi chọn đáp án đúng để rinh trọn 10 ngôi sao và Vương Miện Vàng nhé!',
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
        '![Công chúa và 3 bình hoa hồng pha lê](/images/lop1/princess_division_2311/q01.svg)\n\n🌹 Công chúa An Lake có **369** bông hoa hồng phấn chia đều vào **3** bình pha lê hoàng gia 🏺 để trang trí phòng tiệc. Hỏi mỗi bình pha lê có bao nhiêu bông hoa hồng?\n\n*Phép tính: $369 \\div 3 = ?$*',
      options: [
        { id: 'A', text: '121 bông hoa hồng' },
        { id: 'B', text: '123 bông hoa hồng' },
        { id: 'C', text: '132 bông hoa hồng' },
        { id: 'D', text: '126 bông hoa hồng' },
      ],
      correct_option_id: 'B',
      explanation:
        'Chia từng chữ số từ trái sang phải: $3 \\div 3 = 1$, $6 \\div 3 = 2$, $9 \\div 3 = 3$. Vậy $369 \\div 3 = 123$ bông hoa hồng! 🌹',
      points: 1.0,
    },
    {
      order_index: 2,
      prompt:
        '![168 viên ngọc trai chia cho 7 nàng tiên nhỏ](/images/lop1/princess_division_2311/q02.svg)\n\n💎 Công chúa An Lake có **168** viên ngọc trai lấp lánh chia đều cho **7** nàng tiên nhỏ 🧚‍♀️ để kết thành vòng tay phép thuật. Hỏi mỗi nàng tiên nhận được bao nhiêu viên ngọc trai?\n\n*Phép tính: $168 \\div 7 = ?$*',
      options: [
        { id: 'A', text: '22 viên ngọc trai' },
        { id: 'B', text: '26 viên ngọc trai' },
        { id: 'C', text: '24 viên ngọc trai' },
        { id: 'D', text: '28 viên ngọc trai' },
      ],
      correct_option_id: 'C',
      explanation:
        'Vì $1 < 7$, gộp $16 \\div 7 = 2$ (vì $2 \\times 7 = 14$, dư $2$). Hạ $8$ xuống cạnh $2$ được $28 \\div 7 = 4$ (dư $0$). Vậy $168 \\div 7 = 24$ viên ngọc trai! 💎',
      points: 1.0,
    },
    {
      order_index: 3,
      prompt:
        '![144 kẹp tóc nơ bướm xếp vào 4 hộp nhung](/images/lop1/princess_division_2311/q03.svg)\n\n🎀 Trong tủ pha lê của Lâu Đài Hồng có **144** chiếc kẹp tóc nơ bướm được xếp đều vào **4** hộp nhung sang trọng 🎁. Hỏi mỗi hộp nhung có bao nhiêu chiếc kẹp tóc?\n\n*Phép tính: $144 \\div 4 = ?$*',
      options: [
        { id: 'A', text: '36 chiếc kẹp tóc' },
        { id: 'B', text: '34 chiếc kẹp tóc' },
        { id: 'C', text: '38 chiếc kẹp tóc' },
        { id: 'D', text: '32 chiếc kẹp tóc' },
      ],
      correct_option_id: 'A',
      explanation:
        'Vì $1 < 4$, gộp $14 \\div 4 = 3$ (dư $2$). Hạ $4$ được $24 \\div 4 = 6$ (dư $0$). Vậy $144 \\div 4 = 36$ chiếc kẹp tóc! 🎀',
      points: 1.0,
    },
    {
      order_index: 4,
      prompt:
        '![425 bánh cupcake vương miện xếp lên 5 khay vàng](/images/lop1/princess_division_2311/q04.svg)\n\n🧁 Đầu bếp Hoàng Gia nướng **425** chiếc bánh cupcake dâu tây trang trí vương miện, xếp đều lên **5** khay tiệc vàng 👑. Hỏi mỗi khay có bao nhiêu chiếc bánh cupcake?\n\n*Phép tính: $425 \\div 5 = ?$*',
      options: [
        { id: 'A', text: '80 chiếc bánh cupcake' },
        { id: 'B', text: '75 chiếc bánh cupcake' },
        { id: 'C', text: '95 chiếc bánh cupcake' },
        { id: 'D', text: '85 chiếc bánh cupcake' },
      ],
      correct_option_id: 'D',
      explanation:
        'Vì $4 < 5$, gộp $42 \\div 5 = 8$ (dư $2$). Hạ $5$ được $25 \\div 5 = 5$ (dư $0$). Vậy $425 \\div 5 = 85$ chiếc bánh cupcake! 🧁',
      points: 1.0,
    },
    {
      order_index: 5,
      prompt:
        '![252 thiệp mời kim tuyến gửi tới 6 vương quốc](/images/lop1/princess_division_2311/q05.svg)\n\n💌 Công chúa An Lake chuẩn bị **252** tấm thiệp mời dát kim tuyến gửi đều đến **6** vương quốc láng giềng 🏰. Hỏi mỗi vương quốc nhận được bao nhiêu tấm thiệp mời?\n\n*Phép tính: $252 \\div 6 = ?$*',
      options: [
        { id: 'A', text: '40 tấm thiệp mời' },
        { id: 'B', text: '42 tấm thiệp mời' },
        { id: 'C', text: '44 tấm thiệp mời' },
        { id: 'D', text: '46 tấm thiệp mời' },
      ],
      correct_option_id: 'B',
      explanation:
        'Vì $2 < 6$, gộp $25 \\div 6 = 4$ (dư $1$). Hạ $2$ được $12 \\div 6 = 2$ (dư $0$). Vậy $252 \\div 6 = 42$ tấm thiệp mời! 🏰',
      points: 1.0,
    },
    {
      order_index: 6,
      prompt:
        '![8 chú kỳ lân có cánh chở 312 ngôi sao ước nguyện](/images/lop1/princess_division_2311/q06.svg)\n\n🦄 Trên bầu trời cầu vồng, **8** chú kỳ lân trắng có cánh cùng chở **312** ngôi sao ước nguyện ⭐ về tháp pha lê. Biết mỗi chú chở số ngôi sao bằng nhau, hỏi mỗi chú kỳ lân chở bao nhiêu ngôi sao?\n\n*Phép tính: $312 \\div 8 = ?$*',
      options: [
        { id: 'A', text: '39 ngôi sao ước nguyện' },
        { id: 'B', text: '37 ngôi sao ước nguyện' },
        { id: 'C', text: '41 ngôi sao ước nguyện' },
        { id: 'D', text: '38 ngôi sao ước nguyện' },
      ],
      correct_option_id: 'A',
      explanation:
        'Vì $3 < 8$, gộp $31 \\div 8 = 3$ (vì $3 \\times 8 = 24$, dư $7$). Hạ $2$ được $72 \\div 8 = 9$ (dư $0$). Vậy $312 \\div 8 = 39$ ngôi sao ước nguyện! 🦄',
      points: 1.0,
    },
    {
      order_index: 7,
      prompt:
        '![618 bông hoa cẩm tú cầu trên 6 luống hoa trái tim](/images/lop1/princess_division_2311/q07.svg)\n\n🌸 Vườn ngự uyển có **618** bông hoa cẩm tú cầu xanh biếc được trồng đều trên **6** luống hoa hình trái tim 💖. Hỏi mỗi luống hoa có bao nhiêu bông cẩm tú cầu?\n\n*Phép tính: $618 \\div 6 = ?$*',
      options: [
        { id: 'A', text: '13 bông hoa cẩm tú cầu' },
        { id: 'B', text: '130 bông hoa cẩm tú cầu' },
        { id: 'C', text: '103 bông hoa cẩm tú cầu' },
        { id: 'D', text: '108 bông hoa cẩm tú cầu' },
      ],
      correct_option_id: 'C',
      explanation:
        '$6 \\div 6 = 1$; hạ $1$, vì $1 < 6$ nên viết **$0$** vào thương; hạ tiếp $8$ được $18 \\div 6 = 3$ (dư $0$). Vậy $618 \\div 6 = 103$ bông hoa! 🌸',
      points: 1.0,
    },
    {
      order_index: 8,
      prompt:
        '![315 vỏ sò xà cừ chia vào 9 rương kho báu](/images/lop1/princess_division_2311/q08.svg)\n\n🐚 Nàng tiên cá bạn thân của Công chúa An tặng **315** vỏ sò ánh xà cừ, chia đều vào **9** rương kho báu nhỏ 💰. Hỏi mỗi rương có bao nhiêu vỏ sò ánh xà cừ?\n\n*Phép tính: $315 \\div 9 = ?$*',
      options: [
        { id: 'A', text: '33 vỏ sò ánh xà cừ' },
        { id: 'B', text: '37 vỏ sò ánh xà cừ' },
        { id: 'C', text: '34 vỏ sò ánh xà cừ' },
        { id: 'D', text: '35 vỏ sò ánh xà cừ' },
      ],
      correct_option_id: 'D',
      explanation:
        'Vì $3 < 9$, gộp $31 \\div 9 = 3$ (vì $3 \\times 9 = 27$, dư $4$). Hạ $5$ được $45 \\div 9 = 5$ (dư $0$). Vậy $315 \\div 9 = 35$ vỏ sò ánh xà cừ! 🐚',
      points: 1.0,
    },
    {
      order_index: 9,
      prompt:
        '![560 ngọn nến thơm trên 7 đèn chùm pha lê](/images/lop1/princess_division_2311/q09.svg)\n\n🕯️ Để thắp sáng Vũ Hội Hoàng Gia, có **560** ngọn nến thơm lung linh được chia đều lên **7** chiếc đèn chùm pha lê ✨. Hỏi mỗi chiếc đèn chùm có bao nhiêu ngọn nến thơm?\n\n*Phép tính: $560 \\div 7 = ?$*',
      options: [
        { id: 'A', text: '70 ngọn nến thơm' },
        { id: 'B', text: '80 ngọn nến thơm' },
        { id: 'C', text: '18 ngọn nến thơm' },
        { id: 'D', text: '90 ngọn nến thơm' },
      ],
      correct_option_id: 'B',
      explanation:
        'Gộp $56 \\div 7 = 8$ (dư $0$). Hạ $0$ xuống: $0 \\div 7 = 0$, viết **$0$** vào thương. Vậy $560 \\div 7 = 80$ ngọn nến thơm! 🕯️',
      points: 1.0,
    },
    {
      order_index: 10,
      prompt:
        '![744 kim cương hồng đính lên 8 vương miện công chúa](/images/lop1/princess_division_2311/q10.svg)\n\n👑 **THỬ THÁCH VƯƠNG MIỆN VÀNG:** Kho báu Lâu Đài Pha Lê có **744** viên kim cương hồng 💖 chia đều để đính lên **8** chiếc vương miện công chúa. Hỏi mỗi chiếc vương miện được đính bao nhiêu viên kim cương hồng?\n\n*Phép tính: $744 \\div 8 = ?$*',
      options: [
        { id: 'A', text: '91 viên kim cương hồng' },
        { id: 'B', text: '92 viên kim cương hồng' },
        { id: 'C', text: '93 viên kim cương hồng' },
        { id: 'D', text: '94 viên kim cương hồng' },
      ],
      correct_option_id: 'C',
      explanation:
        'Vì $7 < 8$, gộp $74 \\div 8 = 9$ (vì $9 \\times 8 = 72$, dư $2$). Hạ $4$ xuống được $24 \\div 8 = 3$ (dư $0$). Vậy $744 \\div 8 = 93$ viên kim cương hồng! Chúc mừng Công chúa An Lake rinh trọn Vương Miện Pha Lê! 👑✨',
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

  // 7. Giao bài ngày 23/11/2026 cho Bé An
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: studentAn.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 45,
      teacher_daily_note:
        'Chào Công chúa An Lake! Hôm nay chúng mình cùng khám phá phép chia hết số có 3 chữ số cho 1 chữ số (như 168÷7=24) qua câu chuyện Lâu Đài Pha Lê và chinh phục 10 thử thách công chúa thật xinh nhé! 👑💎🦄',
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

  console.log('✓ Đã giao Card học tập & 10 bài tập ngày 23/11/2026 cho Công chúa An Lake!');
  console.log(`  - Assignment ID: ${assignment.id}`);
  console.log(`  - Learning Unit ID: ${learningUnit.id}`);
  console.log(`  - Assessment ID: ${assessment.id}`);
  console.log(`  - Attempt ID: ${attempt.id}`);
  console.log('  - Interactive Studio URL: /lectures/an-lake-princess-division-2311/index.html');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
