const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu tạo bài tập Đại Hội Bảng Cửu Chương 2-9 (48 câu - 90 phút) cho Bé An (Lớp 1)...');

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

  // Target Date: Hôm nay (2026-11-03)
  const targetDate = new Date('2026-11-03T00:00:00.000Z');

  // 2. Dọn dẹp bài tập ngày 03/11/2026 nếu đã có
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
    console.log(`⚠️ Tìm thấy ${existingAsgns.length} bài tập ngày 03/11/2026 của Bé An, dọn dẹp để thay thế...`);
    for (const asgn of existingAsgns) {
      for (const att of asgn.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: asgn.id } });
    }
    console.log('✓ Đã dọn dẹp xong.');
  }

  // 3. Tạo Learning Unit: CHỈ CÓ BÀI TẬP (lecture_content_markdown: null)
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: mathSubject.id,
      created_by: teacher.id,
      title: 'Đại Hội Vương Quốc: Chinh Phục Bảng Cửu Chương 2 Đến 9',
      description: 'Đại hội toán học 90 phút vui nhộn: Chinh phục toàn bộ các Bảng nhân từ 2 đến 9 cùng Công chúa Amara, Chú Rồng Xanh và muôn thú diệu kỳ.',
      lecture_content_markdown: null, // Không có bài học lý thuyết theo yêu cầu
      lecture_attachments: [],
      is_template: true,
    },
  });
  console.log('✓ Đã tạo Learning Unit:', learningUnit.title);

  // 4. Tạo Assessment (48 câu hỏi - 90 phút)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      type: 'IN_SESSION_90M',
      title: 'Đại Hội Bảng Cửu Chương 2 Đến 9 (48 Câu Đố Vui - 90 Phút) 👑✨',
      instructions: 'Bé hãy ngắm nhìn những bức tranh rực rỡ, suy nghĩ rồi chọn đáp án đúng nhất nhé! Sau mỗi câu, bé bấm nút "Next: Câu tiếp theo ➡️" để tiếp tục cuộc phiêu lưu!',
      time_limit_minutes: 90,
      max_score: 48.0,
    },
  });
  console.log('✓ Đã tạo Assessment:', assessment.title);

  // 5. CDN Base URL trên Supabase Storage
  const CDN_BASE = 'https://jxikmcvhamcdrsmyoyid.supabase.co/storage/v1/object/public/lectures/lop1';

  // 6. Danh sách 48 câu hỏi trắc nghiệm (6 câu cho mỗi bảng cửu chương từ 2 đến 9)
  const questionsData = [
    // ==========================================
    // --- PHẦN 1: BẢNG NHÂN 2 (CÂU 1 - 6) ---
    // ==========================================
    {
      order_index: 1,
      image: `${CDN_BASE}/panels_dragon/panel_01.jpg`,
      imageAlt: 'Công chúa Amara và Chú Rồng Xanh',
      prompt: 'Chú Rồng Xanh mang đến **2** chiếc giỏ thần kỳ. Mỗi chiếc giỏ có đúng **2** quả táo táo đỏ ngọt ngào. Hỏi có tất cả bao nhiêu quả táo đỏ?\n\n*Phép tính: $2 \\times 2 = ?$*',
      options: [
        { id: 'A', text: '3 quả táo' },
        { id: 'B', text: '4 quả táo' },
        { id: 'C', text: '5 quả táo' },
        { id: 'D', text: '6 quả táo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 2 giỏ táo, mỗi giỏ 2 quả: $2 \\times 2 = 4$ quả táo.',
      points: 1.0,
    },
    {
      order_index: 2,
      image: `${CDN_BASE}/panels_dragon/panel_02.jpg`,
      imageAlt: 'Đôi cánh phát sáng của Rồng Xanh',
      prompt: 'Bé An nhìn thấy **4** cặp cánh bướm phát sáng trong rừng đêm. Mỗi chú bướm có đúng **2** chiếc cánh rực rỡ. Hỏi có tất cả bao nhiêu chiếc cánh bướm?\n\n*Phép tính: $2 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '6 chiếc cánh' },
        { id: 'B', text: '8 chiếc cánh bướm' },
        { id: 'C', text: '10 chiếc cánh' },
        { id: 'D', text: '12 chiếc cánh' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 4 chú bướm, mỗi chú bướm có 2 cánh: $2 \\times 4 = 8$ chiếc cánh.',
      points: 1.0,
    },
    {
      order_index: 3,
      image: `${CDN_BASE}/panels_candy/panel_01.jpg`,
      imageAlt: 'Kẹo xoắn ốc đôi ngọt ngào',
      prompt: 'Trong Xứ Sở Bánh Kẹo có **5** đĩa bánh quy đôi. Mỗi đĩa có đúng **2** chiếc bánh quy hình gấu. Hỏi có tất cả bao nhiêu chiếc bánh quy gấu?\n\n*Phép tính: $2 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '10 chiếc bánh' },
        { id: 'B', text: '7 chiếc bánh' },
        { id: 'C', text: '12 chiếc bánh' },
        { id: 'D', text: '15 chiếc bánh' },
      ],
      correct_option_id: 'A',
      explanation: 'Có 5 đĩa, mỗi đĩa 2 chiếc: $2 \\times 5 = 10$ chiếc bánh.',
      points: 1.0,
    },
    {
      order_index: 4,
      image: `${CDN_BASE}/panels_candy/panel_02.jpg`,
      imageAlt: 'Kẹo mút thần kỳ',
      prompt: 'Công chúa Amara cắm **6** cặp kẹo mút cầu vồng vào lọ hoa. Mỗi cặp có **2** que kẹo mút. Hỏi có tất cả bao nhiêu que kẹo mút?\n\n*Phép tính: $2 \\times 6 = ?$*',
      options: [
        { id: 'A', text: '10 que' },
        { id: 'B', text: '14 que' },
        { id: 'C', text: '12 que kẹo mút' },
        { id: 'D', text: '16 que' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 6 cặp kẹo, mỗi cặp 2 que: $2 \\times 6 = 12$ que kẹo.',
      points: 1.0,
    },
    {
      order_index: 5,
      image: `${CDN_BASE}/panels_dragon/panel_03.jpg`,
      imageAlt: 'Những viên ngọc bích phát sáng',
      prompt: 'Chú Rồng Xanh tìm được **8** đôi giày pha lê lấp lánh cho dạ hội. Mỗi đôi gồm **2** chiếc giày. Hỏi có tất cả bao nhiêu chiếc giày pha lê?\n\n*Phép tính: $2 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '16 chiếc giày' },
        { id: 'B', text: '14 chiếc giày' },
        { id: 'C', text: '18 chiếc giày' },
        { id: 'D', text: '20 chiếc giày' },
      ],
      correct_option_id: 'A',
      explanation: 'Có 8 đôi giày, mỗi đôi 2 chiếc: $2 \\times 8 = 16$ chiếc giày.',
      points: 1.0,
    },
    {
      order_index: 6,
      image: `${CDN_BASE}/panels_dragon/panel_04.jpg`,
      imageAlt: 'Vương miện đôi tỏa sáng',
      prompt: 'Trên bầu trời đêm xuất hiện **9** chùm sao đôi. Mỗi chùm gồm **2** ngôi sao sáng nhất. Hỏi có tất cả bao nhiêu ngôi sao sáng?\n\n*Phép tính: $2 \\times 9 = ?$*',
      options: [
        { id: 'A', text: '11 ngôi sao' },
        { id: 'B', text: '16 ngôi sao' },
        { id: 'C', text: '18 ngôi sao sáng' },
        { id: 'D', text: '20 ngôi sao' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 9 chùm sao đôi: $2 \\times 9 = 18$ ngôi sao.',
      points: 1.0,
    },

    // ==========================================
    // --- PHẦN 2: BẢNG NHÂN 3 (CÂU 7 - 12) ---
    // ==========================================
    {
      order_index: 7,
      image: `${CDN_BASE}/panels_candy/panel_03.jpg`,
      imageAlt: 'Cây kẹo que ba màu',
      prompt: 'Bé An có **2** túi kẹo sỏi thần kỳ. Mỗi túi đựng đúng **3** viên kẹo ngọt. Hỏi Bé An có tất cả bao nhiêu viên kẹo sỏi?\n\n*Phép tính: $3 \\times 2 = ?$*',
      options: [
        { id: 'A', text: '5 viên kẹo' },
        { id: 'B', text: '6 viên kẹo' },
        { id: 'C', text: '8 viên kẹo' },
        { id: 'D', text: '9 viên kẹo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 2 túi, mỗi túi 3 viên: $3 \\times 2 = 6$ viên kẹo.',
      points: 1.0,
    },
    {
      order_index: 8,
      image: `${CDN_BASE}/panels_candy/panel_04.jpg`,
      imageAlt: 'Cỏ ba lá thần tiên',
      prompt: 'Trong vườn ngự uyển có **3** nhánh cỏ may mắn. Mỗi nhánh có đúng **3** chiếc lá xanh mướt. Hỏi có tất cả bao nhiêu chiếc lá may mắn?\n\n*Phép tính: $3 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '6 chiếc lá' },
        { id: 'B', text: '9 chiếc lá may mắn' },
        { id: 'C', text: '12 chiếc lá' },
        { id: 'D', text: '15 chiếc lá' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 3 nhánh cỏ, mỗi nhánh 3 lá: $3 \\times 3 = 9$ chiếc lá.',
      points: 1.0,
    },
    {
      order_index: 9,
      image: `${CDN_BASE}/panels_candy/panel_05.jpg`,
      imageAlt: 'Ngọn tháp bánh kem ba tầng',
      prompt: 'Chú Rồng Xanh trang trí **4** ngọn tháp bánh kem. Mỗi ngọn tháp cắm đúng **3** ngọn nến lung linh. Hỏi có tất cả bao nhiêu ngọn nến?\n\n*Phép tính: $3 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '7 ngọn nến' },
        { id: 'B', text: '10 ngọn nến' },
        { id: 'C', text: '12 ngọn nến lung linh' },
        { id: 'D', text: '14 ngọn nến' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 4 ngọn tháp, mỗi tháp 3 ngọn nến: $3 \\times 4 = 12$ ngọn nến.',
      points: 1.0,
    },
    {
      order_index: 10,
      image: `${CDN_BASE}/panels_candy/panel_06.jpg`,
      imageAlt: 'Hộp quà thắt nơ ba góc',
      prompt: 'Bé An chuẩn bị **5** hộp quà kỳ diệu. Mỗi hộp quà gắn **3** quả chuông nhỏ leng keng. Hỏi Bé An có tất cả bao nhiêu quả chuông?\n\n*Phép tính: $3 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '15 quả chuông' },
        { id: 'B', text: '12 quả chuông' },
        { id: 'C', text: '18 quả chuông' },
        { id: 'D', text: '20 quả chuông' },
      ],
      correct_option_id: 'A',
      explanation: 'Có 5 hộp quà, mỗi hộp 3 quả chuông: $3 \\times 5 = 15$ quả chuông.',
      points: 1.0,
    },
    {
      order_index: 11,
      image: `${CDN_BASE}/panels_dragon/panel_05.jpg`,
      imageAlt: 'Cổng hoa ba màu rực rỡ',
      prompt: 'Trên tường thành có **7** khóm hoa ngọc bích. Mỗi khóm có đúng **3** đóa hoa hé nở tỏa hương. Hỏi có tất cả bao nhiêu đóa hoa ngọc bích?\n\n*Phép tính: $3 \\times 7 = ?$*',
      options: [
        { id: 'A', text: '18 đóa hoa' },
        { id: 'B', text: '20 đóa hoa' },
        { id: 'C', text: '21 đóa hoa ngọc bích' },
        { id: 'D', text: '24 đóa hoa' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 7 khóm hoa, mỗi khóm 3 đóa: $3 \\times 7 = 21$ đóa hoa.',
      points: 1.0,
    },
    {
      order_index: 12,
      image: `${CDN_BASE}/panels_dragon/panel_06.jpg`,
      imageAlt: 'Cánh cổng đá thần kỳ',
      prompt: 'Để giải mật mã mở cổng đá, Bé An cần tính: Nếu có **8** chiếc đĩa pha lê, mỗi đĩa chứa **3** viên kẹo dâu tây, thì tổng cộng có bao nhiêu viên kẹo?\n\n*Phép tính: $3 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '22 viên kẹo' },
        { id: 'B', text: '24 viên kẹo dâu' },
        { id: 'C', text: '26 viên kẹo' },
        { id: 'D', text: '28 viên kẹo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 8 đĩa, mỗi đĩa 3 viên: $3 \\times 8 = 24$ viên kẹo dâu tây.',
      points: 1.0,
    },

    // ==========================================
    // --- PHẦN 3: BẢNG NHÂN 4 (CÂU 13 - 18) ---
    // ==========================================
    {
      order_index: 13,
      image: `${CDN_BASE}/panels_ocean/panel_01.jpg`,
      imageAlt: 'Rạn san hô rực rỡ dưới đáy biển',
      prompt: 'Chú Rùa biển mang đến **2** rạn san hô kỳ diệu. Mỗi rạn san hô có đúng **4** bạn cá hề xinh xắn bơi lội. Hỏi có tất cả bao nhiêu bạn cá hề?\n\n*Phép tính: $4 \\times 2 = ?$*',
      options: [
        { id: 'A', text: '6 bạn cá' },
        { id: 'B', text: '8 bạn cá hề' },
        { id: 'C', text: '10 bạn cá' },
        { id: 'D', text: '12 bạn cá' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 2 rạn san hô, mỗi rạn 4 bạn cá: $4 \\times 2 = 8$ bạn cá hề.',
      points: 1.0,
    },
    {
      order_index: 14,
      image: `${CDN_BASE}/panels_ocean/panel_02.jpg`,
      imageAlt: 'Cá heo nhào lộn trên sóng',
      prompt: 'Dưới Đại Dương Xanh có **3** đàn rùa con. Mỗi đàn có đúng **4** chú rùa nhỏ dễ thương. Hỏi có tất cả bao nhiêu chú rùa nhỏ?\n\n*Phép tính: $4 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '12 chú rùa con' },
        { id: 'B', text: '10 chú rùa' },
        { id: 'C', text: '14 chú rùa' },
        { id: 'D', text: '16 chú rùa' },
      ],
      correct_option_id: 'A',
      explanation: 'Có 3 đàn rùa, mỗi đàn 4 chú rùa: $4 \\times 3 = 12$ chú rùa.',
      points: 1.0,
    },
    {
      order_index: 15,
      image: `${CDN_BASE}/panels_ocean/panel_03.jpg`,
      imageAlt: 'Cỗ xe ngựa thần kỳ',
      prompt: 'Công chúa Amara có **4** cỗ xe hoàng gia. Mỗi cỗ xe có đúng **4** chiếc bánh xe bằng vàng nguyên khối. Hỏi có tất cả bao nhiêu chiếc bánh xe vàng?\n\n*Phép tính: $4 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '12 chiếc bánh xe' },
        { id: 'B', text: '14 chiếc bánh xe' },
        { id: 'C', text: '16 chiếc bánh xe vàng' },
        { id: 'D', text: '18 chiếc bánh xe' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 4 cỗ xe, mỗi cỗ xe có 4 bánh: $4 \\times 4 = 16$ chiếc bánh xe.',
      points: 1.0,
    },
    {
      order_index: 16,
      image: `${CDN_BASE}/panels_dragon/panel_07.jpg`,
      imageAlt: 'Vương miện nạm bốn viên ngọc',
      prompt: 'Trong phòng ngai vàng có **5** chiếc vương miện lấp lánh. Mỗi chiếc vương miện nạm đúng **4** viên hồng ngọc quý giá. Hỏi có tất cả bao nhiêu viên hồng ngọc?\n\n*Phép tính: $4 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '18 viên' },
        { id: 'B', text: '20 viên hồng ngọc' },
        { id: 'C', text: '22 viên' },
        { id: 'D', text: '24 viên' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 5 vương miện, mỗi chiếc 4 viên ngọc: $4 \\times 5 = 20$ viên hồng ngọc.',
      points: 1.0,
    },
    {
      order_index: 17,
      image: `${CDN_BASE}/panels_dragon/panel_08.jpg`,
      imageAlt: 'Lâu đài cổ tích giữa mây ngàn',
      prompt: 'Lâu đài của Công chúa có **6** tòa tháp cao vút. Mỗi tòa tháp có **4** ô cửa sổ nhìn ra thung lũng hoa. Hỏi có tất cả bao nhiêu ô cửa sổ?\n\n*Phép tính: $4 \\times 6 = ?$*',
      options: [
        { id: 'A', text: '20 ô cửa sổ' },
        { id: 'B', text: '22 ô cửa sổ' },
        { id: 'C', text: '24 ô cửa sổ' },
        { id: 'D', text: '28 ô cửa sổ' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 6 tòa tháp, mỗi tháp 4 cửa sổ: $4 \\times 6 = 24$ ô cửa sổ.',
      points: 1.0,
    },
    {
      order_index: 18,
      image: `${CDN_BASE}/panels_dragon/panel_09.jpg`,
      imageAlt: 'Rương kho báu thần thoại',
      prompt: 'Chú Rồng Xanh bảo vệ **8** chiếc rương báu. Mỗi chiếc rương có **4** ổ khóa phép thuật bằng bạc. Hỏi có tất cả bao nhiêu ổ khóa phép thuật?\n\n*Phép tính: $4 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '28 ổ khóa' },
        { id: 'B', text: '30 ổ khóa' },
        { id: 'C', text: '32 ổ khóa bạc' },
        { id: 'D', text: '36 ổ khóa' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 8 rương báu, mỗi rương 4 ổ khóa: $4 \\times 8 = 32$ ổ khóa bạc.',
      points: 1.0,
    },

    // ==========================================
    // --- PHẦN 4: BẢNG NHÂN 5 (CÂU 19 - 24) ---
    // ==========================================
    {
      order_index: 19,
      image: `${CDN_BASE}/panels_nhan_5/panel_01.jpg`,
      imageAlt: 'Sao biển năm cánh rực rỡ',
      prompt: 'Dưới đáy biển pha lê, Bé An nhìn thấy **2** chú sao biển màu cam. Mỗi chú sao biển có đúng **5** cánh mềm mại. Hỏi có tất cả bao nhiêu cánh sao biển?\n\n*Phép tính: $5 \\times 2 = ?$*',
      options: [
        { id: 'A', text: '8 cánh' },
        { id: 'B', text: '10 cánh sao biển' },
        { id: 'C', text: '12 cánh' },
        { id: 'D', text: '15 cánh' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 2 chú sao biển, mỗi chú có 5 cánh: $5 \\times 2 = 10$ cánh sao biển.',
      points: 1.0,
    },
    {
      order_index: 20,
      image: `${CDN_BASE}/panels_nhan_5/panel_02.jpg`,
      imageAlt: 'Đồng xu vàng phép thuật',
      prompt: 'Công chúa Amara tặng Chú Rồng Xanh **3** túi tiền vàng may mắn. Mỗi túi có đúng **5** đồng xu vàng sáng chói. Hỏi Chú Rồng Xanh có tất cả bao nhiêu đồng xu vàng?\n\n*Phép tính: $5 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '12 đồng xu' },
        { id: 'B', text: '14 đồng xu' },
        { id: 'C', text: '15 đồng xu vàng' },
        { id: 'D', text: '18 đồng xu' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 3 túi tiền vàng, mỗi túi 5 đồng: $5 \\times 3 = 15$ đồng xu vàng.',
      points: 1.0,
    },
    {
      order_index: 21,
      image: `${CDN_BASE}/panels_nhan_5/panel_03.jpg`,
      imageAlt: 'Bàn tay phép thuật năm ngón',
      prompt: 'Bé An cùng các bạn giơ tay chào Chú Rồng Xanh gồm **4** bàn tay xinh xắn. Mỗi bàn tay có đúng **5** ngón tay. Hỏi có tất cả bao nhiêu ngón tay?\n\n*Phép tính: $5 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '18 ngón' },
        { id: 'B', text: '20 ngón tay xinh' },
        { id: 'C', text: '22 ngón' },
        { id: 'D', text: '25 ngón' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 4 bàn tay, mỗi bàn tay 5 ngón: $5 \\times 4 = 20$ ngón tay.',
      points: 1.0,
    },
    {
      order_index: 22,
      image: `${CDN_BASE}/panels_nhan_5/glowing_mushrooms.jpg`,
      imageAlt: 'Nấm phát sáng năm màu',
      prompt: 'Trong rừng đêm có **5** cụm nấm phát sáng kỳ diệu. Mỗi cụm mọc đúng **5** cây nấm tí hon lấp lánh như đom đóm. Hỏi có tất cả bao nhiêu cây nấm phát sáng?\n\n*Phép tính: $5 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '20 cây nấm' },
        { id: 'B', text: '24 cây nấm' },
        { id: 'C', text: '25 cây nấm phát sáng' },
        { id: 'D', text: '30 cây nấm' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 5 cụm nấm, mỗi cụm 5 cây: $5 \\times 5 = 25$ cây nấm phát sáng.',
      points: 1.0,
    },
    {
      order_index: 23,
      image: `${CDN_BASE}/panels_nhan_5/panel_05.jpg`,
      imageAlt: 'Bông hoa năm cánh tỏa hương',
      prompt: 'Bé An kết một vòng hoa tuyệt đẹp từ **7** cành hoa tiên. Mỗi cành hoa nở đúng **5** bông hoa ngát hương. Hỏi vòng hoa của Bé An có tất cả bao nhiêu bông hoa?\n\n*Phép tính: $5 \\times 7 = ?$*',
      options: [
        { id: 'A', text: '30 bông hoa' },
        { id: 'B', text: '35 bông hoa ngát hương' },
        { id: 'C', text: '40 bông hoa' },
        { id: 'D', text: '42 bông hoa' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 7 cành hoa, mỗi cành 5 bông: $5 \\times 7 = 35$ bông hoa.',
      points: 1.0,
    },
    {
      order_index: 24,
      image: `${CDN_BASE}/panels_nhan_5/panel_06.jpg`,
      imageAlt: 'Chiếc đèn lồng năm góc lung linh',
      prompt: 'Trên cầu vồng có **9** chùm bóng bay ngôi sao năm cánh. Mỗi chùm gồm đúng **5** quả bóng bay lấp lánh. Hỏi có tất cả bao nhiêu quả bóng bay?\n\n*Phép tính: $5 \\times 9 = ?$*',
      options: [
        { id: 'A', text: '40 quả bóng' },
        { id: 'B', text: '42 quả bóng' },
        { id: 'C', text: '45 quả bóng bay' },
        { id: 'D', text: '50 quả bóng' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 9 chùm bóng, mỗi chùm 5 quả: $5 \\times 9 = 45$ quả bóng bay.',
      points: 1.0,
    },

    // ==========================================
    // --- PHẦN 5: BẢNG NHÂN 6 (CÂU 25 - 30) ---
    // ==========================================
    {
      order_index: 25,
      image: `${CDN_BASE}/panels_nhan_6/panel_01.jpg`,
      imageAlt: 'Hộp bút sáp sáu màu',
      prompt: 'Bé An có **2** hộp bút sáp cầu vồng để vẽ tranh. Mỗi hộp có đúng **6** cây bút sáp màu rực rỡ. Hỏi Bé An có tất cả bao nhiêu cây bút sáp màu?\n\n*Phép tính: $6 \\times 2 = ?$*',
      options: [
        { id: 'A', text: '10 cây' },
        { id: 'B', text: '12 cây bút sáp màu' },
        { id: 'C', text: '14 cây' },
        { id: 'D', text: '16 cây' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 2 hộp bút, mỗi hộp 6 cây: $6 \\times 2 = 12$ cây bút sáp màu.',
      points: 1.0,
    },
    {
      order_index: 26,
      image: `${CDN_BASE}/panels_nhan_6/bee_flower.jpg`,
      imageAlt: 'Tổ ong sáu cạnh thần tiên',
      prompt: 'Những chú ong chăm chỉ xây **3** tầng tổ ong hình lục giác sáu cạnh. Mỗi tầng có đúng **6** ô chứa đầy mật ngọt. Hỏi có tất cả bao nhiêu ô mật ong thơm lừng?\n\n*Phép tính: $6 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '15 ô mật' },
        { id: 'B', text: '16 ô mật' },
        { id: 'C', text: '18 ô mật ong thơm lừng' },
        { id: 'D', text: '21 ô mật' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 3 tầng tổ ong, mỗi tầng 6 ô: $6 \\times 3 = 18$ ô mật ong.',
      points: 1.0,
    },
    {
      order_index: 27,
      image: `${CDN_BASE}/panels_nhan_6/panel_03.jpg`,
      imageAlt: 'Xúc xắc phép thuật sáu mặt',
      prompt: 'Chú Rồng Xanh tung **4** viên xúc xắc phép thuật sáu mặt may mắn. Mỗi viên xúc xắc có **6** chấm sao lấp lánh. Hỏi tổng cộng có bao nhiêu chấm sao?\n\n*Phép tính: $6 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '20 chấm sao' },
        { id: 'B', text: '22 chấm sao' },
        { id: 'C', text: '24 chấm sao lấp lánh' },
        { id: 'D', text: '26 chấm sao' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 4 viên xúc xắc, mỗi viên 6 mặt chấm: $6 \\times 4 = 24$ chấm sao.',
      points: 1.0,
    },
    {
      order_index: 28,
      image: `${CDN_BASE}/panels_nhan_6/golden_door.jpg`,
      imageAlt: 'Cánh cửa vàng mở ra kho báu',
      prompt: 'Trước cánh cửa vàng có **5** giá cắm đuốc thắp sáng. Mỗi giá cắm đúng **6** ngọn lửa màu xanh ngọc bích. Hỏi có tất cả bao nhiêu ngọn lửa xanh?\n\n*Phép tính: $6 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '25 ngọn lửa' },
        { id: 'B', text: '30 ngọn lửa xanh ngọc' },
        { id: 'C', text: '35 ngọn lửa' },
        { id: 'D', text: '36 ngọn lửa' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 5 giá cắm đuốc, mỗi giá 6 ngọn lửa: $6 \\times 5 = 30$ ngọn lửa.',
      points: 1.0,
    },
    {
      order_index: 29,
      image: `${CDN_BASE}/panels_nhan_6/panel_06.jpg`,
      imageAlt: 'Bông hoa tuyết sáu cánh pha lê',
      prompt: 'Mùa đông đến, Công chúa Amara ngắm nhìn **6** bông hoa tuyết pha lê bay lơ lửng. Mỗi bông hoa tuyết có đúng **6** cánh hoa chạm khắc tinh xảo. Hỏi có tất cả bao nhiêu cánh hoa tuyết?\n\n*Phép tính: $6 \\times 6 = ?$*',
      options: [
        { id: 'A', text: '32 cánh' },
        { id: 'B', text: '34 cánh' },
        { id: 'C', text: '36 cánh hoa tuyết' },
        { id: 'D', text: '40 cánh' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 6 bông hoa tuyết, mỗi bông 6 cánh: $6 \\times 6 = 36$ cánh hoa tuyết.',
      points: 1.0,
    },
    {
      order_index: 30,
      image: `${CDN_BASE}/panels_nhan_6/panel_07.jpg`,
      imageAlt: 'Chuông gió sáu thanh ngân nga',
      prompt: 'Chú Rồng Xanh treo **8** chiếc chuông gió trên cành cây đại thụ. Mỗi chiếc chuông gió có **6** thanh kim loại ngân vang giai điệu vui tươi. Hỏi có tất cả bao nhiêu thanh kim loại?\n\n*Phép tính: $6 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '42 thanh' },
        { id: 'B', text: '46 thanh' },
        { id: 'C', text: '48 thanh kim loại ngân vang' },
        { id: 'D', text: '54 thanh' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 8 chiếc chuông gió, mỗi chiếc 6 thanh: $6 \\times 8 = 48$ thanh kim loại.',
      points: 1.0,
    },

    // ==========================================
    // --- PHẦN 6: BẢNG NHÂN 7 (CÂU 31 - 36) ---
    // ==========================================
    {
      order_index: 31,
      image: `${CDN_BASE}/panels_nhan_7/panel_01.jpg`,
      imageAlt: 'Cầu vồng bảy sắc sau cơn mưa',
      prompt: 'Bầu trời xuất hiện **2** dải cầu vồng kỳ diệu uốn lượn qua vương quốc. Mỗi dải cầu vồng có đúng **7** sắc màu lung linh. Hỏi có tất cả bao nhiêu sắc màu cầu vồng?\n\n*Phép tính: $7 \\times 2 = ?$*',
      options: [
        { id: 'A', text: '12 sắc màu' },
        { id: 'B', text: '14 sắc màu lung linh' },
        { id: 'C', text: '16 sắc màu' },
        { id: 'D', text: '18 sắc màu' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 2 dải cầu vồng, mỗi dải 7 màu: $7 \\times 2 = 14$ sắc màu.',
      points: 1.0,
    },
    {
      order_index: 32,
      image: `${CDN_BASE}/panels_nhan_7/panel_02.jpg`,
      imageAlt: 'Lịch tuần lễ thần tiên',
      prompt: 'Bé An đi cắm trại cùng Chú Rồng Xanh trong đúng **3** tuần lễ. Biết rằng mỗi tuần lễ có đúng **7** ngày vui tươi. Hỏi Bé An đã cắm trại tất cả bao nhiêu ngày?\n\n*Phép tính: $7 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '18 ngày' },
        { id: 'B', text: '20 ngày' },
        { id: 'C', text: '21 ngày vui vẻ' },
        { id: 'D', text: '24 ngày' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 3 tuần lễ, mỗi tuần 7 ngày: $7 \\times 3 = 21$ ngày.',
      points: 1.0,
    },
    {
      order_index: 33,
      image: `${CDN_BASE}/panels_nhan_7/panel_03.jpg`,
      imageAlt: 'Bảy chú lùn hái táo ngọt',
      prompt: 'Bảy chú lùn chăm chỉ chia nhau thu hoạch **4** giỏ quả chín. Mỗi giỏ quả có đúng **7** trái đào tiên thơm phức. Hỏi các chú lùn đã thu hoạch được bao nhiêu trái đào tiên?\n\n*Phép tính: $7 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '26 trái đào' },
        { id: 'B', text: '28 trái đào tiên' },
        { id: 'C', text: '30 trái đào' },
        { id: 'D', text: '35 trái đào' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 4 giỏ quả, mỗi giỏ 7 trái: $7 \\times 4 = 28$ trái đào tiên.',
      points: 1.0,
    },
    {
      order_index: 34,
      image: `${CDN_BASE}/panels_nhan_7/panel_04.jpg`,
      imageAlt: 'Chòm sao Bắc Đẩu bảy ngôi sao',
      prompt: 'Công chúa Amara quan sát bầu trời đêm và đếm được **5** chòm sao đặc biệt. Mỗi chòm sao có đúng **7** ngôi sao lấp lánh như kim cương. Hỏi có tất cả bao nhiêu ngôi sao lấp lánh?\n\n*Phép tính: $7 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '30 ngôi sao' },
        { id: 'B', text: '32 ngôi sao' },
        { id: 'C', text: '35 ngôi sao lấp lánh' },
        { id: 'D', text: '40 ngôi sao' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 5 chòm sao, mỗi chòm 7 ngôi sao: $7 \\times 5 = 35$ ngôi sao.',
      points: 1.0,
    },
    {
      order_index: 35,
      image: `${CDN_BASE}/panels_nhan_7/panel_05.jpg`,
      imageAlt: 'Túi hạt mầm thần thoại',
      prompt: 'Chú Rồng Xanh gieo trồng **6** luống hoa thần kỳ. Mỗi luống hoa được gieo đúng **7** hạt mầm hoa nở hoa cầu vồng. Hỏi Chú Rồng Xanh đã gieo bao nhiêu hạt mầm?\n\n*Phép tính: $7 \\times 6 = ?$*',
      options: [
        { id: 'A', text: '36 hạt mầm' },
        { id: 'B', text: '40 hạt mầm' },
        { id: 'C', text: '42 hạt mầm cầu vồng' },
        { id: 'D', text: '45 hạt mầm' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 6 luống hoa, mỗi luống 7 hạt mầm: $7 \\times 6 = 42$ hạt mầm.',
      points: 1.0,
    },
    {
      order_index: 36,
      image: `${CDN_BASE}/panels_nhan_7/panel_06.jpg`,
      imageAlt: 'Chuỗi vòng ngọc bích bảy màu',
      prompt: 'Để tặng các thần tiên, Bé An xâu **8** chuỗi hạt ngọc bích. Mỗi chuỗi có đúng **7** viên ngọc xanh phát sáng. Hỏi Bé An đã dùng tất cả bao nhiêu viên ngọc bích?\n\n*Phép tính: $7 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '54 viên ngọc' },
        { id: 'B', text: '56 viên ngọc bích' },
        { id: 'C', text: '58 viên ngọc' },
        { id: 'D', text: '63 viên ngọc' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 8 chuỗi ngọc, mỗi chuỗi 7 viên: $7 \\times 8 = 56$ viên ngọc bích.',
      points: 1.0,
    },

    // ==========================================
    // --- PHẦN 7: BẢNG NHÂN 8 (CÂU 37 - 42) ---
    // ==========================================
    {
      order_index: 37,
      image: `${CDN_BASE}/panels_dragon/panel_10.jpg`,
      imageAlt: 'Bạch tuộc đại dương vui nhộn',
      prompt: 'Dưới biển sâu có **2** bạn bạch tuộc tinh nghịch bơi tung tăng. Mỗi bạn bạch tuộc có đúng **8** chiếc xúc tu dài uyển chuyển. Hỏi có tất cả bao nhiêu chiếc xúc tu?\n\n*Phép tính: $8 \\times 2 = ?$*',
      options: [
        { id: 'A', text: '14 chiếc xúc tu' },
        { id: 'B', text: '16 chiếc xúc tu uyển chuyển' },
        { id: 'C', text: '18 chiếc xúc tu' },
        { id: 'D', text: '20 chiếc xúc tu' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 2 bạn bạch tuộc, mỗi bạn 8 xúc tu: $8 \\times 2 = 16$ chiếc xúc tu.',
      points: 1.0,
    },
    {
      order_index: 38,
      image: `${CDN_BASE}/panels_dragon/panel_11.jpg`,
      imageAlt: 'Bánh pizza cắt tám miếng thơm ngon',
      prompt: 'Bé An cùng Chú Rồng Xanh nướng **3** chiếc bánh pizza phô mai khổng lồ. Mỗi chiếc bánh được cắt đều thành **8** miếng bánh tam giác thơm lừng. Hỏi có tất cả bao nhiêu miếng bánh pizza?\n\n*Phép tính: $8 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '21 miếng bánh' },
        { id: 'B', text: '24 miếng bánh pizza' },
        { id: 'C', text: '26 miếng bánh' },
        { id: 'D', text: '28 miếng bánh' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 3 chiếc bánh pizza, mỗi chiếc 8 miếng: $8 \\times 3 = 24$ miếng bánh.',
      points: 1.0,
    },
    {
      order_index: 39,
      image: `${CDN_BASE}/panels_dragon/panel_12.jpg`,
      imageAlt: 'Hộp bánh hạt dẻ tám góc',
      prompt: 'Công chúa Amara chuẩn bị **4** hộp bánh hạt dẻ hoàng gia. Mỗi hộp bánh xếp vừa vặn đúng **8** chiếc bánh thơm ngon giòn rụm. Hỏi Công chúa có tất cả bao nhiêu chiếc bánh hạt dẻ?\n\n*Phép tính: $8 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '28 chiếc bánh' },
        { id: 'B', text: '30 chiếc bánh' },
        { id: 'C', text: '32 chiếc bánh hạt dẻ' },
        { id: 'D', text: '36 chiếc bánh' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 4 hộp bánh, mỗi hộp 8 chiếc: $8 \\times 4 = 32$ chiếc bánh hạt dẻ.',
      points: 1.0,
    },
    {
      order_index: 40,
      image: `${CDN_BASE}/panels_winter/panel_05.jpg`,
      imageAlt: 'Bàn cờ vua hoàng gia tám hàng',
      prompt: 'Trong phòng thư viện có **5** bộ cờ vua pha lê. Mỗi bộ cờ có **8** quân tốt dũng cảm đứng dàn hàng ngang ở tiền tuyến. Hỏi có tất cả bao nhiêu quân tốt cờ vua?\n\n*Phép tính: $8 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '35 quân tốt' },
        { id: 'B', text: '40 quân tốt dũng cảm' },
        { id: 'C', text: '45 quân tốt' },
        { id: 'D', text: '48 quân tốt' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 5 bộ cờ vua, mỗi bộ 8 quân tốt: $8 \\times 5 = 40$ quân tốt.',
      points: 1.0,
    },
    {
      order_index: 41,
      image: `${CDN_BASE}/panels_winter/panel_06.jpg`,
      imageAlt: 'Đèn chùm cung điện tám ngọn nến',
      prompt: 'Trong cung điện nguy nga có **7** chiếc đèn chùm pha lê rực sáng. Mỗi chiếc đèn chùm cắm đúng **8** ngọn nến thơm tỏa ánh sáng dịu êm. Hỏi có tất cả bao nhiêu ngọn nến thơm?\n\n*Phép tính: $8 \\times 7 = ?$*',
      options: [
        { id: 'A', text: '54 ngọn nến' },
        { id: 'B', text: '56 ngọn nến thơm' },
        { id: 'C', text: '58 ngọn nến' },
        { id: 'D', text: '64 ngọn nến' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 7 đèn chùm, mỗi chiếc 8 ngọn nến: $8 \\times 7 = 56$ ngọn nến.',
      points: 1.0,
    },
    {
      order_index: 42,
      image: `${CDN_BASE}/panels_winter/panel_07.jpg`,
      imageAlt: 'Cây thông tuyết tám tầng lộng lẫy',
      prompt: 'Chú Rồng Xanh cùng Bé An dựng **8** cây thông tuyết khổng lồ để đón lễ hội. Mỗi cây thông được trang trí đúng **8** ngôi sao bạc trên đỉnh. Hỏi có tất cả bao nhiêu ngôi sao bạc?\n\n*Phép tính: $8 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '60 ngôi sao' },
        { id: 'B', text: '62 ngôi sao' },
        { id: 'C', text: '64 ngôi sao bạc lộng lẫy' },
        { id: 'D', text: '72 ngôi sao' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 8 cây thông, mỗi cây 8 ngôi sao: $8 \\times 8 = 64$ ngôi sao bạc.',
      points: 1.0,
    },

    // ==========================================
    // --- PHẦN 8: BẢNG NHÂN 9 (CÂU 43 - 48) ---
    // ==========================================
    {
      order_index: 43,
      image: `${CDN_BASE}/panels_winter/panel_08.jpg`,
      imageAlt: 'Đĩa bánh quy ngôi sao băng chín chiếc',
      prompt: 'Chú Rồng Xanh mang ra **2** khay bánh quy sao băng đặc biệt. Mỗi khay bánh có đúng **9** chiếc bánh thơm phức vừa ra lò. Hỏi Chú Rồng Xanh có tất cả bao nhiêu chiếc bánh quy?\n\n*Phép tính: $9 \\times 2 = ?$*',
      options: [
        { id: 'A', text: '16 chiếc bánh' },
        { id: 'B', text: '18 chiếc bánh quy thơm phức' },
        { id: 'C', text: '20 chiếc bánh' },
        { id: 'D', text: '27 chiếc bánh' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 2 khay bánh, mỗi khay 9 chiếc: $9 \\times 2 = 18$ chiếc bánh quy.',
      points: 1.0,
    },
    {
      order_index: 44,
      image: `${CDN_BASE}/panels_winter/panel_09.jpg`,
      imageAlt: 'Giỏ quả chín chín mọng ngọt ngào',
      prompt: 'Công chúa Amara hái **3** giỏ quả tuyết đỏ mọng trên đỉnh núi băng. Mỗi chiếc giỏ đựng đúng **9** quả tuyết chín ngọt lịm. Hỏi Công chúa đã hái được tất cả bao nhiêu quả tuyết đỏ?\n\n*Phép tính: $9 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '24 quả' },
        { id: 'B', text: '26 quả' },
        { id: 'C', text: '27 quả tuyết đỏ chín mọng' },
        { id: 'D', text: '30 quả' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 3 giỏ, mỗi giỏ 9 quả: $9 \\times 3 = 27$ quả tuyết đỏ.',
      points: 1.0,
    },
    {
      order_index: 45,
      image: `${CDN_BASE}/panels_winter/panel_10.jpg`,
      imageAlt: 'Hộp kẹo mút cầu vồng chín que',
      prompt: 'Bé An được tặng **4** túi kẹo mút xoắn ốc bảy màu. Mỗi túi kẹo có đúng **9** chiếc kẹo mút ngọt ngào vị hoa quả. Hỏi Bé An có tất cả bao nhiêu chiếc kẹo mút?\n\n*Phép tính: $9 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '32 chiếc kẹo' },
        { id: 'B', text: '36 chiếc kẹo mút xoắn ốc' },
        { id: 'C', text: '38 chiếc kẹo' },
        { id: 'D', text: '40 chiếc kẹo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 4 túi kẹo, mỗi túi 9 chiếc: $9 \\times 4 = 36$ chiếc kẹo mút.',
      points: 1.0,
    },
    {
      order_index: 46,
      image: `${CDN_BASE}/panels_winter/panel_11.jpg`,
      imageAlt: 'Bó hoa hồng tuyết chín đóa rực rỡ',
      prompt: 'Bé An cắm hoa trang trí sảnh đường với **5** bình hoa pha lê. Mỗi bình cắm đúng **9** đóa hoa hồng tuyết cánh mỏng màu hồng phấn. Hỏi có tất cả bao nhiêu đóa hoa hồng tuyết?\n\n*Phép tính: $9 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '40 đóa hoa' },
        { id: 'B', text: '42 đóa hoa' },
        { id: 'C', text: '45 đóa hoa hồng tuyết' },
        { id: 'D', text: '50 đóa hoa' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 5 bình hoa, mỗi bình 9 đóa: $9 \\times 5 = 45$ đóa hoa hồng tuyết.',
      points: 1.0,
    },
    {
      order_index: 47,
      image: `${CDN_BASE}/panels_winter/panel_12.jpg`,
      imageAlt: 'Túi ngọc ước chín viên thần bí',
      prompt: 'Trong hòm kho báu của Lâu Đài Băng Giá có **7** chiếc túi nhung thần kỳ. Mỗi chiếc túi chứa đúng **9** viên ngọc ước phát sáng rực rỡ. Hỏi có tất cả bao nhiêu viên ngọc ước?\n\n*Phép tính: $9 \\times 7 = ?$*',
      options: [
        { id: 'A', text: '56 viên ngọc' },
        { id: 'B', text: '61 viên ngọc' },
        { id: 'C', text: '63 viên ngọc ước thần kỳ' },
        { id: 'D', text: '70 viên ngọc' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 7 chiếc túi, mỗi túi 9 viên ngọc: $9 \\times 7 = 63$ viên ngọc ước.',
      points: 1.0,
    },
    {
      order_index: 48,
      image: `${CDN_BASE}/Tam_11_Cong_Chua_Va_Chu_Rong_Xanh_3_So_3_Chu_So.png`,
      imageAlt: 'Đỉnh cao vinh quang: Công chúa Amara và Chú Rồng Xanh',
      prompt: '👑 **THỬ THÁCH TỐI THƯỢNG CỦA ĐẠI HỘI TOÁN HỌC:**\nĐể thắp sáng viên kim cương tối thượng trên đỉnh Lâu Đài Vương Quốc, Công chúa Amara và Bé An cần giải mật mã cuối cùng của Bảng 9: Trong cung điện có **9** căn phòng bí mật, mỗi căn phòng thắp sáng **9** ngọn đuốc phép thuật. Hỏi có tất cả bao nhiêu ngọn đuốc phép thuật?\n\n*Phép tính: $9 \\times 9 = ?$*',
      options: [
        { id: 'A', text: '72 ngọn đuốc' },
        { id: 'B', text: '80 ngọn đuốc' },
        { id: 'C', text: '81 ngọn đuốc phép thuật vinh quang' },
        { id: 'D', text: '90 ngọn đuốc' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 9 căn phòng, mỗi phòng 9 ngọn đuốc: $9 \\times 9 = 81$ ngọn đuốc phép thuật. Chúc mừng Bé An đã xuất sắc hoàn thành trọn vẹn 48 thử thách Bảng cửu chương từ 2 đến 9!',
      points: 1.0,
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
  console.log(`✓ Đã tạo thành công toàn bộ ${questionsData.length} câu hỏi trắc nghiệm có hình ảnh minh họa cho Bảng 2 đến 9.`);

  // 7. Giao bài ngày 03/11/2026 cho Bé An (custom_session_minutes: 90)
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: studentAn.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 90,
      teacher_daily_note: 'Bé An cùng Chú Rồng Xanh tham gia Đại Hội Bảng Cửu Chương 2 đến 9 thật vui nhé! 48 thử thách thú vị trong 90 phút. Sau mỗi câu làm xong con nhớ bấm "Next: Câu tiếp theo ➡️" nha! 👑✨',
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

  console.log('✓ Đã giao bài 48 câu (90 phút) ngày 03/11/2026 cho Bé An (An Lake)!');
  console.log(`  - Assignment ID: ${assignment.id}`);
  console.log(`  - Assessment ID: ${assessment.id}`);
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
