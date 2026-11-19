const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu tạo Card Bài Học & 40 Bài Tập Nhân 2 Chữ Số Với 2 Chữ Số cho Bé an_lake (Lớp 1) ngày 19/11/2026...');

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

  // Target Date: 2026-11-19
  const targetDate = new Date('2026-11-19T00:00:00.000Z');

  // 2. Dọn dẹp bài cũ ngày 19/11/2026 nếu đã có
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
    console.log(`⚠️ Tìm thấy ${existingAsgns.length} bài cũ ngày 19/11/2026 của Bé An, dọn dẹp...`);
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
  const lectureMarkdown = `# 🍓 BÍ KÍP NHÂN 2 CHỮ SỐ VỚI 2 CHỮ SỐ (40 THỬ THÁCH)
**Dành tặng bạn nhỏ an_lake 6 tuổi thông thái • 19/11/2026**

Interactive Simulation Studio: \`/lectures/an-lake-multiplication-2digit-1911/index.html\`

---

### 📖 1. Câu Chuyện Nông Trại Dâu Tây
Hôm nay bạn **Thỏ Mimi** 🐰 và **Gấu Misa** 🐻 đến thăm một trang trại dâu tây khổng lồ!  
Trang trại có **13 chiếc giỏ** 🧺, mỗi chiếc giỏ đựng đúng **28 quả dâu tây** 🍓.  
Hỏi có tất cả bao nhiêu quả dâu tây?

### ✨ 2. Bí Kíp Tính Nhẩm: "Tách Thành Tròn Chục Và Đơn Vị"
Để tính $13 \\times 28$, bé An thực hiện 3 bước:
1. **Tách số 13** thành: **10** và **3**
2. **Nhân từng phần với 28:**  
   $$10 \\times 28 = 280$$  
   $$3 \\times 28 = 84$$
3. **Cộng hai phần lại:**  
   $$280 + 84 = 364 \\text{ quả dâu tây!}$$

---

### 🌈 3. Các Ví Dụ Mẫu Điển Hình
* **Ví dụ 1:** $13 \\times 28 = 364$ (13 chiếc giỏ 🧺, mỗi giỏ 28 quả dâu 🍓)
* **Ví dụ 2:** $12 \\times 25 = 300$ (12 hộp kẹo 🎁, mỗi hộp 25 viên kẹo 🍬)
* **Ví dụ 3:** $15 \\times 24 = 360$ (15 khay bánh 🍽️, mỗi khay 24 chiếc bánh 🍪)
* **Ví dụ 4:** $87 \\times 42 = 3654$ (87 toa tàu 🚃, mỗi toa 42 kiện hàng 📦)

---

### 🎮 Đấu Trường 40 Câu Đố Vui:
Bé An hãy dùng bí kíp tách số để chinh phục trọn vẹn 40 thử thách phép nhân số có 2 chữ số với 2 chữ số và rinh Cúp Vô Địch nhé! 🏆
`;

  // 4. Tạo Learning Unit
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: mathSubject.id,
      created_by: teacher.id,
      title: 'Đại Chiến Nhân 2 Chữ Số Với 2 Chữ Số Cùng Bé an_lake (40 Thử Thách)',
      description: 'Card học tập tương tác & 40 bài tập phép nhân số có 2 chữ số với 2 chữ số ngày 19/11/2026: Bé an_lake học phương pháp tách số tính nhẩm thần tốc và chinh phục 40 câu đố rực rỡ icon nhận cúp vàng.',
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
      title: 'Đại Hội Nhân 2 Chữ Số Với 2 Chữ Số Cùng Bé an_lake (40 Thử Thách) 🍓👑',
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
      prompt: 'Có **13** chiếc giỏ 🧺, mỗi chiếc giỏ đựng **28** quả dâu tây 🍓. Hỏi có tất cả bao nhiêu quả dâu tây?\n\n*Phép tính: $13 \\times 28 = ?$*',
      options: [
        { id: 'A', text: '354 quả dâu tây' },
        { id: 'B', text: '364 quả dâu tây' },
        { id: 'C', text: '374 quả dâu tây' },
        { id: 'D', text: '360 quả dâu tây' },
      ],
      correct_option_id: 'B',
      explanation: '13 × 28 = 364 quả dâu tây.',
      points: 1.0,
    },
    {
      order_index: 2,
      prompt: 'Có **12** hộp kẹo 🎁, mỗi hộp có **25** viên kẹo ngọt 🍬. Hỏi có tất cả bao nhiêu viên kẹo ngọt?\n\n*Phép tính: $12 \\times 25 = ?$*',
      options: [
        { id: 'A', text: '300 viên kẹo ngọt' },
        { id: 'B', text: '290 viên kẹo ngọt' },
        { id: 'C', text: '310 viên kẹo ngọt' },
        { id: 'D', text: '320 viên kẹo ngọt' },
      ],
      correct_option_id: 'A',
      explanation: '12 × 25 = 300 viên kẹo ngọt.',
      points: 1.0,
    },
    {
      order_index: 3,
      prompt: 'Có **15** khay bánh 🍽️, mỗi khay có **24** chiếc bánh quy 🍪. Hỏi có tất cả bao nhiêu chiếc bánh quy?\n\n*Phép tính: $15 \\times 24 = ?$*',
      options: [
        { id: 'A', text: '350 chiếc bánh quy' },
        { id: 'B', text: '370 chiếc bánh quy' },
        { id: 'C', text: '360 chiếc bánh quy' },
        { id: 'D', text: '380 chiếc bánh quy' },
      ],
      correct_option_id: 'C',
      explanation: '15 × 24 = 360 chiếc bánh quy.',
      points: 1.0,
    },
    {
      order_index: 4,
      prompt: 'Có **14** sọt táo 📦, mỗi sọt có **32** quả táo đỏ 🍎. Hỏi có tất cả bao nhiêu quả táo đỏ?\n\n*Phép tính: $14 \\times 32 = ?$*',
      options: [
        { id: 'A', text: '438 quả táo đỏ' },
        { id: 'B', text: '458 quả táo đỏ' },
        { id: 'C', text: '440 quả táo đỏ' },
        { id: 'D', text: '448 quả táo đỏ' },
      ],
      correct_option_id: 'D',
      explanation: '14 × 32 = 448 quả táo đỏ.',
      points: 1.0,
    },
    {
      order_index: 5,
      prompt: 'Có **16** luống hoa 🌻, mỗi luống có **21** bông hoa hướng dương 🌻. Hỏi có tất cả bao nhiêu bông hoa hướng dương?\n\n*Phép tính: $16 \\times 21 = ?$*',
      options: [
        { id: 'A', text: '336 bông hoa hướng dương' },
        { id: 'B', text: '326 bông hoa hướng dương' },
        { id: 'C', text: '346 bông hoa hướng dương' },
        { id: 'D', text: '330 bông hoa hướng dương' },
      ],
      correct_option_id: 'A',
      explanation: '16 × 21 = 336 bông hoa hướng dương.',
      points: 1.0,
    },
    {
      order_index: 6,
      prompt: 'Có **23** túi hạt dẻ 🎒, mỗi túi có **15** hạt dẻ 🌰. Hỏi có tất cả bao nhiêu hạt dẻ?\n\n*Phép tính: $23 \\times 15 = ?$*',
      options: [
        { id: 'A', text: '335 hạt dẻ' },
        { id: 'B', text: '345 hạt dẻ' },
        { id: 'C', text: '355 hạt dẻ' },
        { id: 'D', text: '340 hạt dẻ' },
      ],
      correct_option_id: 'B',
      explanation: '23 × 15 = 345 hạt dẻ.',
      points: 1.0,
    },
    {
      order_index: 7,
      prompt: 'Có **18** bình hoa 🏺, mỗi bình có **22** cành hoa hồng 🌹. Hỏi có tất cả bao nhiêu cành hoa hồng?\n\n*Phép tính: $18 \\times 22 = ?$*',
      options: [
        { id: 'A', text: '386 cành hoa hồng' },
        { id: 'B', text: '406 cành hoa hồng' },
        { id: 'C', text: '396 cành hoa hồng' },
        { id: 'D', text: '390 cành hoa hồng' },
      ],
      correct_option_id: 'C',
      explanation: '18 × 22 = 396 cành hoa hồng.',
      points: 1.0,
    },
    {
      order_index: 8,
      prompt: 'Có **25** chùm bóng 🎈, mỗi chùm có **16** quả bóng bay 🎈. Hỏi có tất cả bao nhiêu quả bóng bay?\n\n*Phép tính: $25 \\times 16 = ?$*',
      options: [
        { id: 'A', text: '390 quả bóng bay' },
        { id: 'B', text: '410 quả bóng bay' },
        { id: 'C', text: '420 quả bóng bay' },
        { id: 'D', text: '400 quả bóng bay' },
      ],
      correct_option_id: 'D',
      explanation: '25 × 16 = 400 quả bóng bay.',
      points: 1.0,
    },
    {
      order_index: 9,
      prompt: 'Có **21** thùng cam 📦, mỗi thùng có **34** quả cam vàng 🍊. Hỏi có tất cả bao nhiêu quả cam vàng?\n\n*Phép tính: $21 \\times 34 = ?$*',
      options: [
        { id: 'A', text: '714 quả cam vàng' },
        { id: 'B', text: '704 quả cam vàng' },
        { id: 'C', text: '724 quả cam vàng' },
        { id: 'D', text: '710 quả cam vàng' },
      ],
      correct_option_id: 'A',
      explanation: '21 × 34 = 714 quả cam vàng.',
      points: 1.0,
    },
    {
      order_index: 10,
      prompt: 'Có **32** hộp bút 🖍️, mỗi hộp có **14** cây bút chì màu ✏️. Hỏi có tất cả bao nhiêu cây bút chì màu?\n\n*Phép tính: $32 \\times 14 = ?$*',
      options: [
        { id: 'A', text: '438 cây bút chì màu' },
        { id: 'B', text: '448 cây bút chì màu' },
        { id: 'C', text: '458 cây bút chì màu' },
        { id: 'D', text: '440 cây bút chì màu' },
      ],
      correct_option_id: 'B',
      explanation: '32 × 14 = 448 cây bút chì màu.',
      points: 1.0,
    },
    {
      order_index: 11,
      prompt: 'Có **24** túi ngọc 🎒, mỗi túi có **25** viên ngọc ước 🔮. Hỏi có tất cả bao nhiêu viên ngọc ước?\n\n*Phép tính: $24 \\times 25 = ?$*',
      options: [
        { id: 'A', text: '590 viên ngọc ước' },
        { id: 'B', text: '610 viên ngọc ước' },
        { id: 'C', text: '600 viên ngọc ước' },
        { id: 'D', text: '620 viên ngọc ước' },
      ],
      correct_option_id: 'C',
      explanation: '24 × 25 = 600 viên ngọc ước.',
      points: 1.0,
    },
    {
      order_index: 12,
      prompt: 'Có **26** khay bánh 🧁, mỗi khay có **15** chiếc bánh kem 🧁. Hỏi có tất cả bao nhiêu chiếc bánh kem?\n\n*Phép tính: $26 \\times 15 = ?$*',
      options: [
        { id: 'A', text: '380 chiếc bánh kem' },
        { id: 'B', text: '400 chiếc bánh kem' },
        { id: 'C', text: '410 chiếc bánh kem' },
        { id: 'D', text: '390 chiếc bánh kem' },
      ],
      correct_option_id: 'D',
      explanation: '26 × 15 = 390 chiếc bánh kem.',
      points: 1.0,
    },
    {
      order_index: 13,
      prompt: 'Có **35** nải chuối 🍌, mỗi nải có **12** quả chuối chín 🍌. Hỏi có tất cả bao nhiêu quả chuối chín?\n\n*Phép tính: $35 \\times 12 = ?$*',
      options: [
        { id: 'A', text: '420 quả chuối chín' },
        { id: 'B', text: '410 quả chuối chín' },
        { id: 'C', text: '430 quả chuối chín' },
        { id: 'D', text: '400 quả chuối chín' },
      ],
      correct_option_id: 'A',
      explanation: '35 × 12 = 420 quả chuối chín.',
      points: 1.0,
    },
    {
      order_index: 14,
      prompt: 'Có **42** sọt cà rốt 🧺, mỗi sọt có **13** củ cà rốt 🥕. Hỏi có tất cả bao nhiêu củ cà rốt?\n\n*Phép tính: $42 \\times 13 = ?$*',
      options: [
        { id: 'A', text: '536 củ cà rốt' },
        { id: 'B', text: '546 củ cà rốt' },
        { id: 'C', text: '556 củ cà rốt' },
        { id: 'D', text: '540 củ cà rốt' },
      ],
      correct_option_id: 'B',
      explanation: '42 × 13 = 546 củ cà rốt.',
      points: 1.0,
    },
    {
      order_index: 15,
      prompt: 'Có **31** hòm báu vật 🎁, mỗi hòm có **23** viên kim cương 💎. Hỏi có tất cả bao nhiêu viên kim cương?\n\n*Phép tính: $31 \\times 23 = ?$*',
      options: [
        { id: 'A', text: '703 viên kim cương' },
        { id: 'B', text: '723 viên kim cương' },
        { id: 'C', text: '713 viên kim cương' },
        { id: 'D', text: '710 viên kim cương' },
      ],
      correct_option_id: 'C',
      explanation: '31 × 23 = 713 viên kim cương.',
      points: 1.0,
    },
    {
      order_index: 16,
      prompt: 'Có **27** lồng chim 🛖, mỗi lồng có **18** chú chim nhỏ 🐦. Hỏi có tất cả bao nhiêu chú chim nhỏ?\n\n*Phép tính: $27 \\times 18 = ?$*',
      options: [
        { id: 'A', text: '476 chú chim nhỏ' },
        { id: 'B', text: '496 chú chim nhỏ' },
        { id: 'C', text: '480 chú chim nhỏ' },
        { id: 'D', text: '486 chú chim nhỏ' },
      ],
      correct_option_id: 'D',
      explanation: '27 × 18 = 486 chú chim nhỏ.',
      points: 1.0,
    },
    {
      order_index: 17,
      prompt: 'Có **33** bụi dâu 🍓, mỗi bụi có **15** quả dâu đỏ 🍓. Hỏi có tất cả bao nhiêu quả dâu đỏ?\n\n*Phép tính: $33 \\times 15 = ?$*',
      options: [
        { id: 'A', text: '495 quả dâu đỏ' },
        { id: 'B', text: '485 quả dâu đỏ' },
        { id: 'C', text: '505 quả dâu đỏ' },
        { id: 'D', text: '490 quả dâu đỏ' },
      ],
      correct_option_id: 'A',
      explanation: '33 × 15 = 495 quả dâu đỏ.',
      points: 1.0,
    },
    {
      order_index: 18,
      prompt: 'Có **45** rổ khoai 🧺, mỗi rổ có **16** củ khoai tây 🥔. Hỏi có tất cả bao nhiêu củ khoai tây?\n\n*Phép tính: $45 \\times 16 = ?$*',
      options: [
        { id: 'A', text: '710 củ khoai tây' },
        { id: 'B', text: '720 củ khoai tây' },
        { id: 'C', text: '730 củ khoai tây' },
        { id: 'D', text: '700 củ khoai tây' },
      ],
      correct_option_id: 'B',
      explanation: '45 × 16 = 720 củ khoai tây.',
      points: 1.0,
    },
    {
      order_index: 19,
      prompt: 'Có **52** khay bánh 🍩, mỗi khay có **14** chiếc bánh donut 🍩. Hỏi có tất cả bao nhiêu chiếc bánh donut?\n\n*Phép tính: $52 \\times 14 = ?$*',
      options: [
        { id: 'A', text: '718 chiếc bánh donut' },
        { id: 'B', text: '738 chiếc bánh donut' },
        { id: 'C', text: '728 chiếc bánh donut' },
        { id: 'D', text: '720 chiếc bánh donut' },
      ],
      correct_option_id: 'C',
      explanation: '52 × 14 = 728 chiếc bánh donut.',
      points: 1.0,
    },
    {
      order_index: 20,
      prompt: 'Có **34** giá sách 📚, mỗi giá có **22** cuốn truyện tranh 📖. Hỏi có tất cả bao nhiêu cuốn truyện tranh?\n\n*Phép tính: $34 \\times 22 = ?$*',
      options: [
        { id: 'A', text: '738 cuốn truyện tranh' },
        { id: 'B', text: '758 cuốn truyện tranh' },
        { id: 'C', text: '740 cuốn truyện tranh' },
        { id: 'D', text: '748 cuốn truyện tranh' },
      ],
      correct_option_id: 'D',
      explanation: '34 × 22 = 748 cuốn truyện tranh.',
      points: 1.0,
    },
    {
      order_index: 21,
      prompt: 'Có **43** luống bắp 🌽, mỗi luống có **21** bắp ngô 🌽. Hỏi có tất cả bao nhiêu bắp ngô?\n\n*Phép tính: $43 \\times 21 = ?$*',
      options: [
        { id: 'A', text: '903 bắp ngô' },
        { id: 'B', text: '893 bắp ngô' },
        { id: 'C', text: '913 bắp ngô' },
        { id: 'D', text: '900 bắp ngô' },
      ],
      correct_option_id: 'A',
      explanation: '43 × 21 = 903 bắp ngô.',
      points: 1.0,
    },
    {
      order_index: 22,
      prompt: 'Có **28** hộp kẹo 📦, mỗi hộp có **35** thanh sô-cô-la 🍫. Hỏi có tất cả bao nhiêu thanh sô-cô-la?\n\n*Phép tính: $28 \\times 35 = ?$*',
      options: [
        { id: 'A', text: '970 thanh sô-cô-la' },
        { id: 'B', text: '980 thanh sô-cô-la' },
        { id: 'C', text: '990 thanh sô-cô-la' },
        { id: 'D', text: '960 thanh sô-cô-la' },
      ],
      correct_option_id: 'B',
      explanation: '28 × 35 = 980 thanh sô-cô-la.',
      points: 1.0,
    },
    {
      order_index: 23,
      prompt: 'Có **36** chùm nho 🍇, mỗi chùm có **24** quả nho tím 🍇. Hỏi có tất cả bao nhiêu quả nho tím?\n\n*Phép tính: $36 \\times 24 = ?$*',
      options: [
        { id: 'A', text: '854 quả nho tím' },
        { id: 'B', text: '874 quả nho tím' },
        { id: 'C', text: '864 quả nho tím' },
        { id: 'D', text: '860 quả nho tím' },
      ],
      correct_option_id: 'C',
      explanation: '36 × 24 = 864 quả nho tím.',
      points: 1.0,
    },
    {
      order_index: 24,
      prompt: 'Có **48** bể cá 🐟, mỗi bể có **15** chú cá vàng 🐠. Hỏi có tất cả bao nhiêu chú cá vàng?\n\n*Phép tính: $48 \\times 15 = ?$*',
      options: [
        { id: 'A', text: '710 chú cá vàng' },
        { id: 'B', text: '730 chú cá vàng' },
        { id: 'C', text: '700 chú cá vàng' },
        { id: 'D', text: '720 chú cá vàng' },
      ],
      correct_option_id: 'D',
      explanation: '48 × 15 = 720 chú cá vàng.',
      points: 1.0,
    },
    {
      order_index: 25,
      prompt: 'Có **54** rổ dưa 🧺, mỗi rổ có **12** quả dưa lưới 🍈. Hỏi có tất cả bao nhiêu quả dưa lưới?\n\n*Phép tính: $54 \\times 12 = ?$*',
      options: [
        { id: 'A', text: '648 quả dưa lưới' },
        { id: 'B', text: '638 quả dưa lưới' },
        { id: 'C', text: '658 quả dưa lưới' },
        { id: 'D', text: '640 quả dưa lưới' },
      ],
      correct_option_id: 'A',
      explanation: '54 × 12 = 648 quả dưa lưới.',
      points: 1.0,
    },
    {
      order_index: 26,
      prompt: 'Có **62** khay cherry 🍽️, mỗi khay có **15** quả cherry 🍒. Hỏi có tất cả bao nhiêu quả cherry?\n\n*Phép tính: $62 \\times 15 = ?$*',
      options: [
        { id: 'A', text: '920 quả cherry' },
        { id: 'B', text: '930 quả cherry' },
        { id: 'C', text: '940 quả cherry' },
        { id: 'D', text: '910 quả cherry' },
      ],
      correct_option_id: 'B',
      explanation: '62 × 15 = 930 quả cherry.',
      points: 1.0,
    },
    {
      order_index: 27,
      prompt: 'Có **55** hàng cờ 🚩, mỗi hàng có **18** lá cờ 🏳️. Hỏi có tất cả bao nhiêu lá cờ?\n\n*Phép tính: $55 \\times 18 = ?$*',
      options: [
        { id: 'A', text: '980 lá cờ' },
        { id: 'B', text: '1000 lá cờ' },
        { id: 'C', text: '990 lá cờ' },
        { id: 'D', text: '970 lá cờ' },
      ],
      correct_option_id: 'C',
      explanation: '55 × 18 = 990 lá cờ.',
      points: 1.0,
    },
    {
      order_index: 28,
      prompt: 'Có **72** thùng gạch 🧱, mỗi thùng có **14** khối LEGO 🧱. Hỏi có tất cả bao nhiêu khối LEGO?\n\n*Phép tính: $72 \\times 14 = ?$*',
      options: [
        { id: 'A', text: '1018 khối LEGO' },
        { id: 'B', text: '998 khối LEGO' },
        { id: 'C', text: '1000 khối LEGO' },
        { id: 'D', text: '1008 khối LEGO' },
      ],
      correct_option_id: 'D',
      explanation: '72 × 14 = 1008 khối LEGO.',
      points: 1.0,
    },
    {
      order_index: 29,
      prompt: 'Có **65** rổ táo 🧺, mỗi rổ có **12** quả táo xanh 🍏. Hỏi có tất cả bao nhiêu quả táo xanh?\n\n*Phép tính: $65 \\times 12 = ?$*',
      options: [
        { id: 'A', text: '780 quả táo xanh' },
        { id: 'B', text: '770 quả táo xanh' },
        { id: 'C', text: '790 quả táo xanh' },
        { id: 'D', text: '760 quả táo xanh' },
      ],
      correct_option_id: 'A',
      explanation: '65 × 12 = 780 quả táo xanh.',
      points: 1.0,
    },
    {
      order_index: 30,
      prompt: 'Có **46** luống cà 🍅, mỗi luống có **23** quả cà chua 🍅. Hỏi có tất cả bao nhiêu quả cà chua?\n\n*Phép tính: $46 \\times 23 = ?$*',
      options: [
        { id: 'A', text: '1048 quả cà chua' },
        { id: 'B', text: '1058 quả cà chua' },
        { id: 'C', text: '1068 quả cà chua' },
        { id: 'D', text: '1050 quả cà chua' },
      ],
      correct_option_id: 'B',
      explanation: '46 × 23 = 1058 quả cà chua.',
      points: 1.0,
    },
    {
      order_index: 31,
      prompt: 'Có **58** bó củi 🪵, mỗi bó có **16** thanh củi khô 🪵. Hỏi có tất cả bao nhiêu thanh củi khô?\n\n*Phép tính: $58 \\times 16 = ?$*',
      options: [
        { id: 'A', text: '918 thanh củi khô' },
        { id: 'B', text: '938 thanh củi khô' },
        { id: 'C', text: '928 thanh củi khô' },
        { id: 'D', text: '920 thanh củi khô' },
      ],
      correct_option_id: 'C',
      explanation: '58 × 16 = 928 thanh củi khô.',
      points: 1.0,
    },
    {
      order_index: 32,
      prompt: 'Có **64** túi nấm 🎒, mỗi túi có **22** cây nấm hương 🍄. Hỏi có tất cả bao nhiêu cây nấm hương?\n\n*Phép tính: $64 \\times 22 = ?$*',
      options: [
        { id: 'A', text: '1398 cây nấm hương' },
        { id: 'B', text: '1418 cây nấm hương' },
        { id: 'C', text: '1400 cây nấm hương' },
        { id: 'D', text: '1408 cây nấm hương' },
      ],
      correct_option_id: 'D',
      explanation: '64 × 22 = 1408 cây nấm hương.',
      points: 1.0,
    },
    {
      order_index: 33,
      prompt: 'Có **87** toa tàu 🚃, mỗi toa chở **42** kiện hàng 📦. Hỏi có tất cả bao nhiêu kiện hàng?\n\n*Phép tính: $87 \\times 42 = ?$*',
      options: [
        { id: 'A', text: '3654 kiện hàng' },
        { id: 'B', text: '3644 kiện hàng' },
        { id: 'C', text: '3664 kiện hàng' },
        { id: 'D', text: '3650 kiện hàng' },
      ],
      correct_option_id: 'A',
      explanation: '87 × 42 = 3654 kiện hàng.',
      points: 1.0,
    },
    {
      order_index: 34,
      prompt: 'Có **75** gói quà 🎁, mỗi gói có **24** chiếc bút chì ✏️. Hỏi có tất cả bao nhiêu chiếc bút chì?\n\n*Phép tính: $75 \\times 24 = ?$*',
      options: [
        { id: 'A', text: '1790 chiếc bút chì' },
        { id: 'B', text: '1800 chiếc bút chì' },
        { id: 'C', text: '1810 chiếc bút chì' },
        { id: 'D', text: '1780 chiếc bút chì' },
      ],
      correct_option_id: 'B',
      explanation: '75 × 24 = 1800 chiếc bút chì.',
      points: 1.0,
    },
    {
      order_index: 35,
      prompt: 'Có **68** khay bánh 🧁, mỗi khay có **25** chiếc bánh cupcake 🧁. Hỏi có tất cả bao nhiêu chiếc bánh cupcake?\n\n*Phép tính: $68 \\times 25 = ?$*',
      options: [
        { id: 'A', text: '1690 chiếc bánh cupcake' },
        { id: 'B', text: '1710 chiếc bánh cupcake' },
        { id: 'C', text: '1700 chiếc bánh cupcake' },
        { id: 'D', text: '1680 chiếc bánh cupcake' },
      ],
      correct_option_id: 'C',
      explanation: '68 × 25 = 1700 chiếc bánh cupcake.',
      points: 1.0,
    },
    {
      order_index: 36,
      prompt: 'Có **82** bao lúa 🌾, mỗi bao có **31** bắp ngô 🌽. Hỏi có tất cả bao nhiêu bắp ngô?\n\n*Phép tính: $82 \\times 31 = ?$*',
      options: [
        { id: 'A', text: '2532 bắp ngô' },
        { id: 'B', text: '2552 bắp ngô' },
        { id: 'C', text: '2540 bắp ngô' },
        { id: 'D', text: '2542 bắp ngô' },
      ],
      correct_option_id: 'D',
      explanation: '82 × 31 = 2542 bắp ngô.',
      points: 1.0,
    },
    {
      order_index: 37,
      prompt: 'Có **74** thùng sữa 🥛, mỗi thùng có **33** hộp sữa tươi 🧃. Hỏi có tất cả bao nhiêu hộp sữa tươi?\n\n*Phép tính: $74 \\times 33 = ?$*',
      options: [
        { id: 'A', text: '2442 hộp sữa tươi' },
        { id: 'B', text: '2432 hộp sữa tươi' },
        { id: 'C', text: '2452 hộp sữa tươi' },
        { id: 'D', text: '2440 hộp sữa tươi' },
      ],
      correct_option_id: 'A',
      explanation: '74 × 33 = 2442 hộp sữa tươi.',
      points: 1.0,
    },
    {
      order_index: 38,
      prompt: 'Có **85** rổ mận 🧺, mỗi rổ có **26** quả mận tím 🫐. Hỏi có tất cả bao nhiêu quả mận tím?\n\n*Phép tính: $85 \\times 26 = ?$*',
      options: [
        { id: 'A', text: '2200 quả mận tím' },
        { id: 'B', text: '2210 quả mận tím' },
        { id: 'C', text: '2220 quả mận tím' },
        { id: 'D', text: '2190 quả mận tím' },
      ],
      correct_option_id: 'B',
      explanation: '85 × 26 = 2210 quả mận tím.',
      points: 1.0,
    },
    {
      order_index: 39,
      prompt: 'Có **92** giỏ cam 🧺, mỗi giỏ có **24** quả cam sành 🍊. Hỏi có tất cả bao nhiêu quả cam sành?\n\n*Phép tính: $92 \\times 24 = ?$*',
      options: [
        { id: 'A', text: '2198 quả cam sành' },
        { id: 'B', text: '2218 quả cam sành' },
        { id: 'C', text: '2208 quả cam sành' },
        { id: 'D', text: '2200 quả cam sành' },
      ],
      correct_option_id: 'C',
      explanation: '92 × 24 = 2208 quả cam sành.',
      points: 1.0,
    },
    {
      order_index: 40,
      prompt: 'Có **95** hòm kho báu 🎁, mỗi hòm có **32** viên ngọc bích 🔮. Hỏi có tất cả bao nhiêu viên ngọc bích?\n\n*Phép tính: $95 \\times 32 = ?$*',
      options: [
        { id: 'A', text: '3030 viên ngọc bích' },
        { id: 'B', text: '3050 viên ngọc bích' },
        { id: 'C', text: '3020 viên ngọc bích' },
        { id: 'D', text: '3040 viên ngọc bích' },
      ],
      correct_option_id: 'D',
      explanation: '95 × 32 = 3040 viên ngọc bích! Chúc mừng Bé An xuất sắc chinh phục trọn vẹn 40 thử thách phép nhân 2 chữ số!',
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

  // 7. Giao bài ngày 19/11/2026 cho Bé An
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: studentAn.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 90,
      teacher_daily_note: 'Bé an_lake học bí kíp nhân 2 chữ số với 2 chữ số (13×28, 87×42) và chinh phục 40 câu hỏi trắc nghiệm rực rỡ icon nhận Cúp Vô Địch nhé! Bé bấm "Khám Phá Bài Học 🎈" để vào học nha! 🍓🧺👑',
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

  console.log('✓ Đã giao card học tập & bộ 40 bài tập phép nhân ngày 19/11/2026 cho Bé An (an_lake)!');
  console.log(`  - Assignment ID: ${assignment.id}`);
  console.log(`  - Learning Unit ID: ${learningUnit.id}`);
  console.log(`  - Assessment ID: ${assessment.id}`);
  console.log(`  - Attempt ID: ${attempt.id}`);
  console.log(`  - Interactive Studio URL: /lectures/an-lake-multiplication-2digit-1911/index.html`);
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
