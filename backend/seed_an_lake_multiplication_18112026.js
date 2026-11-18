const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu tạo Card Bài Học & 40 Bài Tập Phép Nhân 2 Chữ Số cho Bé an_lake (Lớp 1) ngày 18/11/2026...');

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

  // Target Date: 2026-11-18
  const targetDate = new Date('2026-11-18T00:00:00.000Z');

  // 2. Dọn dẹp bài cũ ngày 18/11/2026 nếu đã có
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
    console.log(`⚠️ Tìm thấy ${existingAsgns.length} bài cũ ngày 18/11/2026 của Bé An, dọn dẹp...`);
    for (const asgn of existingAsgns) {
      for (const att of asgn.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: asgn.id } });
    }
    console.log('✓ Đã dọn dẹp xong bài cũ.');
  }

  // 3. Nội dung bài giảng Markdown tích hợp link Web Studio Card
  const lectureMarkdown = `# 🍓 BÍ KÍP PHÉP NHÂN 2 CHỮ SỐ KỲ DIỆU (40 BÀI TẬP)
**Dành tặng bạn nhỏ an_lake 6 tuổi thông thái • 18/11/2026**

Interactive Simulation Studio: \`/lectures/an-lake-multiplication-card-1811/index.html\`

---

### 📖 1. Câu Chuyện Giỏ Dâu Tây Của Thỏ Mimi
Hôm nay bạn **Thỏ Mimi** 🐰 và **Gấu Misa** 🐻 mang về **3 chiếc giỏ** 🧺🧺🧺.
Trong mỗi chiếc giỏ đựng đúng **24 quả dâu tây** 🍓.
Hỏi có tất cả bao nhiêu quả dâu tây?

### ✨ 2. Bí Kíp Phép Nhân: "Tách Ra Nhân Rồi Gộp Lại"
Để tính $24 \\times 3$, bé An thực hiện 3 bước siêu nhanh:
1. **Tách số 24** thành: **20** và **4**
2. **Nhân từng phần với 3:**  
   $$20 \\times 3 = 60$$  
   $$4 \\times 3 = 12$$
3. **Cộng hai kết quả lại:**  
   $$60 + 12 = 72 \\text{ quả dâu tây!}$$

---

### 🌈 3. Các Ví Dụ Mẫu Trực Quan
* **Ví dụ 1:** $24 \\times 3 = 72$ (3 chiếc giỏ 🧺, mỗi giỏ 24 quả dâu 🍓)
* **Ví dụ 2:** $45 \\times 8 = 360$ (8 thùng táo 📦, mỗi thùng 45 quả táo 🍎)
* **Ví dụ 3:** $15 \\times 4 = 60$ (4 hộp quà 🎁, mỗi hộp 15 viên kẹo 🍬)
* **Ví dụ 4:** $35 \\times 2 = 70$ (2 khay bánh 🍽️, mỗi khay 35 chiếc bánh 🍪)

---

### 🎮 Đấu Trường 40 Câu Đố Vui:
Bé An hãy dùng bí kíp tách số để chinh phục trọn vẹn 40 thử thách phép nhân số có 2 chữ số và rinh Cúp Vô Địch nhé! 🏆
`;

  // 4. Tạo Learning Unit
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: mathSubject.id,
      created_by: teacher.id,
      title: 'Bí Kíp Phép Nhân 2 Chữ Số Cùng Bé an_lake (40 Thử Thách)',
      description: 'Card học tập tương tác & 40 bài tập phép nhân số có 2 chữ số ngày 18/11/2026: Bé an_lake học phương pháp tách số tính nhẩm thần tốc và chinh phục 40 câu đố rực rỡ icon nhận cúp vàng.',
      lecture_content_markdown: lectureMarkdown,
      lecture_attachments: [],
      is_template: true,
    },
  });
  console.log('✓ Đã tạo Learning Unit:', learningUnit.title);

  // 5. Tạo Assessment (40 câu trắc nghiệm)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      type: 'IN_SESSION_90M',
      title: 'Đại Hội Phép Nhân 2 Chữ Số Cùng Bé an_lake (40 Thử Thách) 🍓👑',
      instructions: 'Bé hãy quan sát từng chiếc giỏ, hộp quà và các hình ảnh minh họa, dùng bí kíp tách số để chọn đáp án đúng nhận 40 ngôi sao nhé!',
      time_limit_minutes: 90,
      max_score: 40.0,
    },
  });
  console.log('✓ Đã tạo Assessment:', assessment.title);

  // 6. Danh sách 40 câu hỏi trắc nghiệm (ĐẢM BẢO ICON ĐẦY ĐỦ VÀ ĐÁP ÁN ĐỒNG NHẤT 100%)
  const questionsData = [
    {
      order_index: 1,
      prompt: 'Chú thỏ có **3** chiếc giỏ 🧺🧺🧺, mỗi chiếc giỏ đựng **24** quả dâu tây 🍓. Hỏi có tất cả bao nhiêu quả dâu tây?\n\n*Phép tính: $24 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '68 quả dâu tây' },
        { id: 'B', text: '72 quả dâu tây' },
        { id: 'C', text: '76 quả dâu tây' },
        { id: 'D', text: '70 quả dâu tây' },
      ],
      correct_option_id: 'B',
      explanation: '3 chiếc giỏ đựng 24 quả dâu: $24 \\times 3 = 72$ quả dâu tây.',
      points: 1.0,
    },
    {
      order_index: 2,
      prompt: 'Bé An có **4** hộp quà 🎁🎁🎁🎁, mỗi hộp quà có **15** viên kẹo ngọt 🍬. Hỏi có tất cả bao nhiêu viên kẹo ngọt?\n\n*Phép tính: $15 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '60 viên kẹo ngọt' },
        { id: 'B', text: '55 viên kẹo ngọt' },
        { id: 'C', text: '65 viên kẹo ngọt' },
        { id: 'D', text: '50 viên kẹo ngọt' },
      ],
      correct_option_id: 'A',
      explanation: '4 hộp quà có 15 viên kẹo: $15 \\times 4 = 60$ viên kẹo ngọt.',
      points: 1.0,
    },
    {
      order_index: 3,
      prompt: 'Gấu Misa xếp **2** khay bánh 🍽️🍽️, mỗi khay bánh có **35** chiếc bánh quy 🍪. Hỏi có tất cả bao nhiêu chiếc bánh quy?\n\n*Phép tính: $35 \\times 2 = ?$*',
      options: [
        { id: 'A', text: '65 chiếc bánh quy' },
        { id: 'B', text: '75 chiếc bánh quy' },
        { id: 'C', text: '70 chiếc bánh quy' },
        { id: 'D', text: '80 chiếc bánh quy' },
      ],
      correct_option_id: 'C',
      explanation: '2 khay bánh có 35 chiếc bánh: $35 \\times 2 = 70$ chiếc bánh quy.',
      points: 1.0,
    },
    {
      order_index: 4,
      prompt: 'Bác nông dân hái **8** thùng táo 📦📦📦📦📦📦📦📦, mỗi thùng có **45** quả táo đỏ 🍎. Hỏi có tất cả bao nhiêu quả táo đỏ?\n\n*Phép tính: $45 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '340 quả táo đỏ' },
        { id: 'B', text: '350 quả táo đỏ' },
        { id: 'C', text: '380 quả táo đỏ' },
        { id: 'D', text: '360 quả táo đỏ' },
      ],
      correct_option_id: 'D',
      explanation: '8 thùng có 45 quả táo: $45 \\times 8 = 360$ quả táo đỏ.',
      points: 1.0,
    },
    {
      order_index: 5,
      prompt: 'Công chúa Amara có **3** túi nhung 🎒🎒🎒, mỗi túi nhung đựng **25** viên ngọc ước 🔮. Hỏi có tất cả bao nhiêu viên ngọc ước?\n\n*Phép tính: $25 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '75 viên ngọc ước' },
        { id: 'B', text: '70 viên ngọc ước' },
        { id: 'C', text: '80 viên ngọc ước' },
        { id: 'D', text: '85 viên ngọc ước' },
      ],
      correct_option_id: 'A',
      explanation: '3 túi có 25 viên ngọc: $25 \\times 3 = 75$ viên ngọc ước.',
      points: 1.0,
    },
    {
      order_index: 6,
      prompt: 'Chú Rồng Xanh có **5** chùm bóng 🎈🎈🎈🎈🎈, mỗi chùm bóng có **14** quả bóng bay 🎈. Hỏi có tất cả bao nhiêu quả bóng bay?\n\n*Phép tính: $14 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '65 quả bóng bay' },
        { id: 'B', text: '70 quả bóng bay' },
        { id: 'C', text: '75 quả bóng bay' },
        { id: 'D', text: '80 quả bóng bay' },
      ],
      correct_option_id: 'B',
      explanation: '5 chùm có 14 quả bóng: $14 \\times 5 = 70$ quả bóng bay.',
      points: 1.0,
    },
    {
      order_index: 7,
      prompt: 'Trong vườn có **6** luống hoa 🌻🌻🌻🌻🌻🌻, mỗi luống có **16** bông hoa hướng dương 🌻. Hỏi có tất cả bao nhiêu bông hoa hướng dương?\n\n*Phép tính: $16 \\times 6 = ?$*',
      options: [
        { id: 'A', text: '90 bông hoa hướng dương' },
        { id: 'B', text: '92 bông hoa hướng dương' },
        { id: 'C', text: '96 bông hoa hướng dương' },
        { id: 'D', text: '98 bông hoa hướng dương' },
      ],
      correct_option_id: 'C',
      explanation: '6 luống có 16 bông hoa: $16 \\times 6 = 96$ bông hoa hướng dương.',
      points: 1.0,
    },
    {
      order_index: 8,
      prompt: 'Bé An cắm **4** bình hoa pha lê 🏺🏺🏺🏺, mỗi bình hoa cắm **22** cành hoa hồng 🌹. Hỏi có tất cả bao nhiêu cành hoa hồng?\n\n*Phép tính: $22 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '84 cành hoa hồng' },
        { id: 'B', text: '86 cành hoa hồng' },
        { id: 'C', text: '90 cành hoa hồng' },
        { id: 'D', text: '88 cành hoa hồng' },
      ],
      correct_option_id: 'D',
      explanation: '4 bình hoa có 22 cành hoa: $22 \\times 4 = 88$ cành hoa hồng.',
      points: 1.0,
    },
    {
      order_index: 9,
      prompt: 'Đội thỏ thu hoạch **7** sọt cà rốt 🧺🧺🧺🧺🧺🧺🧺, mỗi sọt có **18** củ cà rốt 🥕. Hỏi có tất cả bao nhiêu củ cà rốt?\n\n*Phép tính: $18 \\times 7 = ?$*',
      options: [
        { id: 'A', text: '126 củ cà rốt' },
        { id: 'B', text: '120 củ cà rốt' },
        { id: 'C', text: '124 củ cà rốt' },
        { id: 'D', text: '130 củ cà rốt' },
      ],
      correct_option_id: 'A',
      explanation: '7 sọt có 18 củ cà rốt: $18 \\times 7 = 126$ củ cà rốt.',
      points: 1.0,
    },
    {
      order_index: 10,
      prompt: 'Bé An có **3** hộp bút sáp 🖍️🖍️🖍️, mỗi hộp có **32** cây bút sáp màu ✏️. Hỏi có tất cả bao nhiêu cây bút sáp màu?\n\n*Phép tính: $32 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '92 cây bút sáp màu' },
        { id: 'B', text: '96 cây bút sáp màu' },
        { id: 'C', text: '98 cây bút sáp màu' },
        { id: 'D', text: '90 cây bút sáp màu' },
      ],
      correct_option_id: 'B',
      explanation: '3 hộp có 32 cây bút: $32 \\times 3 = 96$ cây bút sáp màu.',
      points: 1.0,
    },
    {
      order_index: 11,
      prompt: 'Trên cây có **4** tổ chim 🪺🪺🪺🪺, mỗi tổ chim có **12** chú chim non 🐥. Hỏi có tất cả bao nhiêu chú chim non?\n\n*Phép tính: $12 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '44 chú chim non' },
        { id: 'B', text: '46 chú chim non' },
        { id: 'C', text: '48 chú chim non' },
        { id: 'D', text: '50 chú chim non' },
      ],
      correct_option_id: 'C',
      explanation: '4 tổ có 12 chú chim: $12 \\times 4 = 48$ chú chim non.',
      points: 1.0,
    },
    {
      order_index: 12,
      prompt: 'Cửa hàng bánh xếp **5** khay bánh 🧁🧁🧁🧁🧁, mỗi khay có **26** chiếc bánh kem 🧁. Hỏi có tất cả bao nhiêu chiếc bánh kem?\n\n*Phép tính: $26 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '120 chiếc bánh kem' },
        { id: 'B', text: '125 chiếc bánh kem' },
        { id: 'C', text: '135 chiếc bánh kem' },
        { id: 'D', text: '130 chiếc bánh kem' },
      ],
      correct_option_id: 'D',
      explanation: '5 khay có 26 chiếc bánh: $26 \\times 5 = 130$ chiếc bánh kem.',
      points: 1.0,
    },
    {
      order_index: 13,
      prompt: 'Chú khỉ hái **3** buồng chuối 🍌🍌🍌, mỗi buồng có **28** quả chuối chín 🍌. Hỏi có tất cả bao nhiêu quả chuối chín?\n\n*Phép tính: $28 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '84 quả chuối chín' },
        { id: 'B', text: '82 quả chuối chín' },
        { id: 'C', text: '86 quả chuối chín' },
        { id: 'D', text: '80 quả chuối chín' },
      ],
      correct_option_id: 'A',
      explanation: '3 buồng có 28 quả chuối: $28 \\times 3 = 84$ quả chuối chín.',
      points: 1.0,
    },
    {
      order_index: 14,
      prompt: 'Có **6** hộp kẹo dẻo 📦📦📦📦📦📦, mỗi hộp có **15** viên kẹo gấu 🧸. Hỏi có tất cả bao nhiêu viên kẹo gấu?\n\n*Phép tính: $15 \\times 6 = ?$*',
      options: [
        { id: 'A', text: '85 viên kẹo gấu' },
        { id: 'B', text: '90 viên kẹo gấu' },
        { id: 'C', text: '95 viên kẹo gấu' },
        { id: 'D', text: '80 viên kẹo gấu' },
      ],
      correct_option_id: 'B',
      explanation: '6 hộp có 15 viên kẹo: $15 \\times 6 = 90$ viên kẹo gấu.',
      points: 1.0,
    },
    {
      order_index: 15,
      prompt: 'Bé An gom **4** túi hạt dẻ 🎒🎒🎒🎒, mỗi túi có **36** hạt dẻ thơm lừng 🌰. Hỏi có tất cả bao nhiêu hạt dẻ?\n\n*Phép tính: $36 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '140 hạt dẻ' },
        { id: 'B', text: '142 hạt dẻ' },
        { id: 'C', text: '144 hạt dẻ' },
        { id: 'D', text: '148 hạt dẻ' },
      ],
      correct_option_id: 'C',
      explanation: '4 túi có 36 hạt dẻ: $36 \\times 4 = 144$ hạt dẻ.',
      points: 1.0,
    },
    {
      order_index: 16,
      prompt: 'Có **8** đĩa cam 🍽️🍽️🍽️🍽️🍽️🍽️🍽️🍽️, mỗi đĩa xếp **23** múi cam mọng nước 🍊. Hỏi có tất cả bao nhiêu múi cam?\n\n*Phép tính: $23 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '180 múi cam' },
        { id: 'B', text: '182 múi cam' },
        { id: 'C', text: '186 múi cam' },
        { id: 'D', text: '184 múi cam' },
      ],
      correct_option_id: 'D',
      explanation: '8 đĩa có 23 múi cam: $23 \\times 8 = 184$ múi cam.',
      points: 1.0,
    },
    {
      order_index: 17,
      prompt: 'Bác làm vườn thu được **3** rổ dưa hấu 🧺🧺🧺, mỗi rổ có **19** quả dưa hấu 🍉. Hỏi có tất cả bao nhiêu quả dưa hấu?\n\n*Phép tính: $19 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '57 quả dưa hấu' },
        { id: 'B', text: '54 quả dưa hấu' },
        { id: 'C', text: '58 quả dưa hấu' },
        { id: 'D', text: '60 quả dưa hấu' },
      ],
      correct_option_id: 'A',
      explanation: '3 rổ có 19 quả dưa: $19 \\times 3 = 57$ quả dưa hấu.',
      points: 1.0,
    },
    {
      order_index: 18,
      prompt: 'Đội sóc xếp **5** hàng nấm 🍄🍄🍄🍄🍄, mỗi hàng có **24** cây nấm linh chi 🍄. Hỏi có tất cả bao nhiêu cây nấm?\n\n*Phép tính: $24 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '115 cây nấm' },
        { id: 'B', text: '120 cây nấm' },
        { id: 'C', text: '125 cây nấm' },
        { id: 'D', text: '110 cây nấm' },
      ],
      correct_option_id: 'B',
      explanation: '5 hàng có 24 cây nấm: $24 \\times 5 = 120$ cây nấm.',
      points: 1.0,
    },
    {
      order_index: 19,
      prompt: 'Trong kho có **4** kiện hàng 📦📦📦📦, mỗi kiện hàng chứa **42** chiếc cốc pha lê 🥛. Hỏi có tất cả bao nhiêu chiếc cốc pha lê?\n\n*Phép tính: $42 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '162 chiếc cốc pha lê' },
        { id: 'B', text: '164 chiếc cốc pha lê' },
        { id: 'C', text: '168 chiếc cốc pha lê' },
        { id: 'D', text: '170 chiếc cốc pha lê' },
      ],
      correct_option_id: 'C',
      explanation: '4 kiện có 42 chiếc cốc: $42 \\times 4 = 168$ chiếc cốc pha lê.',
      points: 1.0,
    },
    {
      order_index: 20,
      prompt: 'Bé An làm **7** vòng hoa 🌸🌸🌸🌸🌸🌸🌸, mỗi vòng hoa kết **15** đóa hoa tươi 🌺. Hỏi có tất cả bao nhiêu đóa hoa tươi?\n\n*Phép tính: $15 \\times 7 = ?$*',
      options: [
        { id: 'A', text: '100 đóa hoa tươi' },
        { id: 'B', text: '102 đóa hoa tươi' },
        { id: 'C', text: '108 đóa hoa tươi' },
        { id: 'D', text: '105 đóa hoa tươi' },
      ],
      correct_option_id: 'D',
      explanation: '7 vòng hoa có 15 đóa hoa: $15 \\times 7 = 105$ đóa hoa tươi.',
      points: 1.0,
    },
    {
      order_index: 21,
      prompt: 'Chú Rồng Xanh mang về **2** hòm báu vật 🎁🎁, mỗi hòm chứa **48** viên kim cương 💎. Hỏi có tất cả bao nhiêu viên kim cương?\n\n*Phép tính: $48 \\times 2 = ?$*',
      options: [
        { id: 'A', text: '96 viên kim cương' },
        { id: 'B', text: '94 viên kim cương' },
        { id: 'C', text: '98 viên kim cương' },
        { id: 'D', text: '92 viên kim cương' },
      ],
      correct_option_id: 'A',
      explanation: '2 hòm có 48 viên kim cương: $48 \\times 2 = 96$ viên kim cương.',
      points: 1.0,
    },
    {
      order_index: 22,
      prompt: 'Có **3** khay bánh mì 🥖🥖🥖, mỗi khay có **34** ổ bánh mì thơm phức 🍞. Hỏi có tất cả bao nhiêu ổ bánh mì?\n\n*Phép tính: $34 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '100 ổ bánh mì' },
        { id: 'B', text: '102 ổ bánh mì' },
        { id: 'C', text: '104 ổ bánh mì' },
        { id: 'D', text: '106 ổ bánh mì' },
      ],
      correct_option_id: 'B',
      explanation: '3 khay có 34 ổ bánh mì: $34 \\times 3 = 102$ ổ bánh mì.',
      points: 1.0,
    },
    {
      order_index: 23,
      prompt: 'Có **5** lồng chim 🛖🛖🛖🛖🛖, mỗi lồng chim nuôi **18** chú chim sơn ca 🐦. Hỏi có tất cả bao nhiêu chú chim sơn ca?\n\n*Phép tính: $18 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '85 chú chim sơn ca' },
        { id: 'B', text: '95 chú chim sơn ca' },
        { id: 'C', text: '90 chú chim sơn ca' },
        { id: 'D', text: '80 chú chim sơn ca' },
      ],
      correct_option_id: 'C',
      explanation: '5 lồng có 18 chú chim: $18 \\times 5 = 90$ chú chim sơn ca.',
      points: 1.0,
    },
    {
      order_index: 24,
      prompt: 'Bạn mèo xếp **4** giá sách 📚📚📚📚, mỗi giá sách có **27** cuốn truyện tranh 📖. Hỏi có tất cả bao nhiêu cuốn truyện tranh?\n\n*Phép tính: $27 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '104 cuốn truyện tranh' },
        { id: 'B', text: '106 cuốn truyện tranh' },
        { id: 'C', text: '110 cuốn truyện tranh' },
        { id: 'D', text: '108 cuốn truyện tranh' },
      ],
      correct_option_id: 'D',
      explanation: '4 giá sách có 27 cuốn truyện: $27 \\times 4 = 108$ cuốn truyện tranh.',
      points: 1.0,
    },
    {
      order_index: 25,
      prompt: 'Có **6** gói kẹo mút 🍭🍭🍭🍭🍭🍭, mỗi gói kẹo có **21** que kẹo mút 🍭. Hỏi có tất cả bao nhiêu que kẹo mút?\n\n*Phép tính: $21 \\times 6 = ?$*',
      options: [
        { id: 'A', text: '126 que kẹo mút' },
        { id: 'B', text: '120 que kẹo mút' },
        { id: 'C', text: '124 que kẹo mút' },
        { id: 'D', text: '128 que kẹo mút' },
      ],
      correct_option_id: 'A',
      explanation: '6 gói có 21 que kẹo: $21 \\times 6 = 126$ que kẹo mút.',
      points: 1.0,
    },
    {
      order_index: 26,
      prompt: 'Có **3** đĩa lê 🍽️🍽️🍽️, mỗi đĩa có **29** quả lê ngọt mát 🍐. Hỏi có tất cả bao nhiêu quả lê?\n\n*Phép tính: $29 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '84 quả lê' },
        { id: 'B', text: '87 quả lê' },
        { id: 'C', text: '89 quả lê' },
        { id: 'D', text: '85 quả lê' },
      ],
      correct_option_id: 'B',
      explanation: '3 đĩa có 29 quả lê: $29 \\times 3 = 87$ quả lê.',
      points: 1.0,
    },
    {
      order_index: 27,
      prompt: 'Có **4** luống dâu tây 🍓🍓🍓🍓, mỗi luống có **33** bụi cây dâu 🍓. Hỏi có tất cả bao nhiêu bụi cây dâu?\n\n*Phép tính: $33 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '130 bụi cây dâu' },
        { id: 'B', text: '134 bụi cây dâu' },
        { id: 'C', text: '132 bụi cây dâu' },
        { id: 'D', text: '136 bụi cây dâu' },
      ],
      correct_option_id: 'C',
      explanation: '4 luống có 33 bụi dâu: $33 \\times 4 = 132$ bụi cây dâu.',
      points: 1.0,
    },
    {
      order_index: 28,
      prompt: 'Có **5** rổ khoai tây 🧺🧺🧺🧺🧺, mỗi rổ có **25** củ khoai tây 🥔. Hỏi có tất cả bao nhiêu củ khoai tây?\n\n*Phép tính: $25 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '120 củ khoai tây' },
        { id: 'B', text: '122 củ khoai tây' },
        { id: 'C', text: '130 củ khoai tây' },
        { id: 'D', text: '125 củ khoai tây' },
      ],
      correct_option_id: 'D',
      explanation: '5 rổ có 25 củ khoai: $25 \\times 5 = 125$ củ khoai tây.',
      points: 1.0,
    },
    {
      order_index: 29,
      prompt: 'Có **8** khay bánh donut 🍩🍩🍩🍩🍩🍩🍩🍩, mỗi khay có **16** chiếc bánh donut 🍩. Hỏi có tất cả bao nhiêu chiếc bánh donut?\n\n*Phép tính: $16 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '128 chiếc bánh donut' },
        { id: 'B', text: '124 chiếc bánh donut' },
        { id: 'C', text: '130 chiếc bánh donut' },
        { id: 'D', text: '126 chiếc bánh donut' },
      ],
      correct_option_id: 'A',
      explanation: '8 khay có 16 chiếc bánh: $16 \\times 8 = 128$ chiếc bánh donut.',
      points: 1.0,
    },
    {
      order_index: 30,
      prompt: 'Có **3** giỏ bắp cải 🧺🧺🧺, mỗi giỏ có **38** cây bắp cải 🥬. Hỏi có tất cả bao nhiêu cây bắp cải?\n\n*Phép tính: $38 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '110 cây bắp cải' },
        { id: 'B', text: '114 cây bắp cải' },
        { id: 'C', text: '116 cây bắp cải' },
        { id: 'D', text: '112 cây bắp cải' },
      ],
      correct_option_id: 'B',
      explanation: '3 giỏ có 38 cây bắp cải: $38 \\times 3 = 114$ cây bắp cải.',
      points: 1.0,
    },
    {
      order_index: 31,
      prompt: 'Có **4** hộp bút chì màu 📦📦📦📦, mỗi hộp có **35** chiếc bút chì màu ✏️. Hỏi có tất cả bao nhiêu chiếc bút chì màu?\n\n*Phép tính: $35 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '135 chiếc bút chì màu' },
        { id: 'B', text: '145 chiếc bút chì màu' },
        { id: 'C', text: '140 chiếc bút chì màu' },
        { id: 'D', text: '130 chiếc bút chì màu' },
      ],
      correct_option_id: 'C',
      explanation: '4 hộp có 35 chiếc bút: $35 \\times 4 = 140$ chiếc bút chì màu.',
      points: 1.0,
    },
    {
      order_index: 32,
      prompt: 'Có **6** túi kẹo sô-cô-la 🎒🎒🎒🎒🎒🎒, mỗi túi có **24** thanh sô-cô-la 🍫. Hỏi có tất cả bao nhiêu thanh sô-cô-la?\n\n*Phép tính: $24 \\times 6 = ?$*',
      options: [
        { id: 'A', text: '140 thanh sô-cô-la' },
        { id: 'B', text: '142 thanh sô-cô-la' },
        { id: 'C', text: '148 thanh sô-cô-la' },
        { id: 'D', text: '144 thanh sô-cô-la' },
      ],
      correct_option_id: 'D',
      explanation: '6 túi có 24 thanh sô-cô-la: $24 \\times 6 = 144$ thanh sô-cô-la.',
      points: 1.0,
    },
    {
      order_index: 33,
      prompt: 'Có **7** chùm nho 🍇🍇🍇🍇🍇🍇🍇, mỗi chùm có **17** quả nho tím 🍇. Hỏi có tất cả bao nhiêu quả nho tím?\n\n*Phép tính: $17 \\times 7 = ?$*',
      options: [
        { id: 'A', text: '119 quả nho tím' },
        { id: 'B', text: '115 quả nho tím' },
        { id: 'C', text: '121 quả nho tím' },
        { id: 'D', text: '117 quả nho tím' },
      ],
      correct_option_id: 'A',
      explanation: '7 chùm có 17 quả nho: $17 \\times 7 = 119$ quả nho tím.',
      points: 1.0,
    },
    {
      order_index: 34,
      prompt: 'Có **4** bình nuôi cá 🐟🐟🐟🐟, mỗi bình nuôi **29** chú cá vàng 🐠. Hỏi có tất cả bao nhiêu chú cá vàng?\n\n*Phép tính: $29 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '112 chú cá vàng' },
        { id: 'B', text: '116 chú cá vàng' },
        { id: 'C', text: '118 chú cá vàng' },
        { id: 'D', text: '114 chú cá vàng' },
      ],
      correct_option_id: 'B',
      explanation: '4 bình nuôi cá có 29 chú cá: $29 \\times 4 = 116$ chú cá vàng.',
      points: 1.0,
    },
    {
      order_index: 35,
      prompt: 'Có **5** rổ xoài cát 🧺🧺🧺🧺🧺, mỗi rổ có **31** quả xoài chín 🥭. Hỏi có tất cả bao nhiêu quả xoài chín?\n\n*Phép tính: $31 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '150 quả xoài chín' },
        { id: 'B', text: '152 quả xoài chín' },
        { id: 'C', text: '155 quả xoài chín' },
        { id: 'D', text: '160 quả xoài chín' },
      ],
      correct_option_id: 'C',
      explanation: '5 rổ có 31 quả xoài: $31 \\times 5 = 155$ quả xoài chín.',
      points: 1.0,
    },
    {
      order_index: 36,
      prompt: 'Có **9** đĩa cherry 🍽️🍽️🍽️🍽️🍽️🍽️🍽️🍽️🍽️, mỗi đĩa có **15** quả cherry 🍒. Hỏi có tất cả bao nhiêu quả cherry?\n\n*Phép tính: $15 \\times 9 = ?$*',
      options: [
        { id: 'A', text: '130 quả cherry' },
        { id: 'B', text: '132 quả cherry' },
        { id: 'C', text: '138 quả cherry' },
        { id: 'D', text: '135 quả cherry' },
      ],
      correct_option_id: 'D',
      explanation: '9 đĩa có 15 quả cherry: $15 \\times 9 = 135$ quả cherry.',
      points: 1.0,
    },
    {
      order_index: 37,
      prompt: 'Có **3** xe chở dưa 🚚🚚🚚, mỗi xe chở **46** quả dưa hấu khổng lồ 🍉. Hỏi có tất cả bao nhiêu quả dưa hấu?\n\n*Phép tính: $46 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '138 quả dưa hấu' },
        { id: 'B', text: '134 quả dưa hấu' },
        { id: 'C', text: '140 quả dưa hấu' },
        { id: 'D', text: '136 quả dưa hấu' },
      ],
      correct_option_id: 'A',
      explanation: '3 xe có 46 quả dưa: $46 \\times 3 = 138$ quả dưa hấu.',
      points: 1.0,
    },
    {
      order_index: 38,
      prompt: 'Có **4** thùng gạch LEGO 🧱🧱🧱🧱, mỗi thùng có **44** khối gạch LEGO 🧱. Hỏi có tất cả bao nhiêu khối gạch LEGO?\n\n*Phép tính: $44 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '172 khối gạch LEGO' },
        { id: 'B', text: '176 khối gạch LEGO' },
        { id: 'C', text: '178 khối gạch LEGO' },
        { id: 'D', text: '170 khối gạch LEGO' },
      ],
      correct_option_id: 'B',
      explanation: '4 thùng có 44 khối gạch: $44 \\times 4 = 176$ khối gạch LEGO.',
      points: 1.0,
    },
    {
      order_index: 39,
      prompt: 'Có **8** khay bánh tart 🥧🥧🥧🥧🥧🥧🥧🥧, mỗi khay có **21** chiếc bánh trứng 🥧. Hỏi có tất cả bao nhiêu chiếc bánh trứng?\n\n*Phép tính: $21 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '164 chiếc bánh trứng' },
        { id: 'B', text: '166 chiếc bánh trứng' },
        { id: 'C', text: '168 chiếc bánh trứng' },
        { id: 'D', text: '170 chiếc bánh trứng' },
      ],
      correct_option_id: 'C',
      explanation: '8 khay có 21 chiếc bánh: $21 \\times 8 = 168$ chiếc bánh trứng.',
      points: 1.0,
    },
    {
      order_index: 40,
      prompt: 'Có **9** hàng cờ lễ hội 🚩🚩🚩🚩🚩🚩🚩🚩🚩, mỗi hàng cắm **25** lá cờ sắc màu 🏳️. Hỏi có tất cả bao nhiêu lá cờ sắc màu?\n\n*Phép tính: $25 \\times 9 = ?$*',
      options: [
        { id: 'A', text: '220 lá cờ sắc màu' },
        { id: 'B', text: '222 lá cờ sắc màu' },
        { id: 'C', text: '228 lá cờ sắc màu' },
        { id: 'D', text: '225 lá cờ sắc màu' },
      ],
      correct_option_id: 'D',
      explanation: '9 hàng cờ có 25 lá cờ: $25 \\times 9 = 225$ lá cờ sắc màu! Chúc mừng Bé An xuất sắc chinh phục trọn vẹn 40 thử thách phép nhân!',
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
  console.log(`✓ Đã tạo thành công toàn bộ ${questionsData.length} câu hỏi trắc nghiệm đồng nhất kèm icon.`);

  // 7. Giao bài ngày 18/11/2026 cho Bé An
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: studentAn.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 90,
      teacher_daily_note: 'Bé an_lake học bí kíp nhân 2 chữ số siêu tốc cùng Chú Rồng Xanh và làm 40 câu hỏi trắc nghiệm rực rỡ icon nhận Cúp Vô Địch nhé! Bé bấm "Khám Phá Bài Học 🎈" để vào học nha! 🍓🧺👑',
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

  console.log('✓ Đã giao card học tập & bộ 40 bài tập phép nhân ngày 18/11/2026 cho Bé An (an_lake)!');
  console.log(`  - Assignment ID: ${assignment.id}`);
  console.log(`  - Learning Unit ID: ${learningUnit.id}`);
  console.log(`  - Assessment ID: ${assessment.id}`);
  console.log(`  - Attempt ID: ${attempt.id}`);
  console.log(`  - Interactive Studio URL: /lectures/an-lake-multiplication-card-1811/index.html`);
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
