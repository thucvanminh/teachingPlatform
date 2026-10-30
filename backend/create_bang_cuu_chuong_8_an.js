const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu tạo bộ 24 BÀI TẬP (DOUBLE) Bảng cửu chương 8 cho Bé An (Lớp 1) ngày 29/10/2026...');

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
    console.log('⚠️ Tìm thấy bài tập cũ ngày 29/10/2026 của Bé An, dọn dẹp để thay thế bằng bộ 24 câu hỏi mới...');
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
      title: 'Đại Chiến Thần Tiên: Chinh Phục 24 Câu Bảng Cửu Chương 8',
      description: 'Chuyên đề 24 bài tập vui nhộn: Chinh phục Bảng cửu chương 8 cùng Công chúa Amara, Chú Rồng Xanh và muôn loài thần tiên.',
      lecture_content_markdown: null, // Chỉ cần bài tập, không cần bài học
      lecture_attachments: [],
      is_template: true,
    },
  });
  console.log('✓ Đã tạo Learning Unit (chỉ bài tập):', learningUnit.title);

  // 4. Tạo Assessment (Bộ 24 bài tập luyện tập)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      type: 'IN_SESSION_90M',
      title: 'Đố Vui Bảng Cửu Chương 8 Cùng Bé An (24 Thử Thách) 👑',
      instructions: 'Bé hãy quan sát từng bức tranh minh họa, chọn đáp án đúng rồi bấm nút "Next: Câu tiếp theo ➡️" để sang bài nhé!',
      time_limit_minutes: 60,
      max_score: 24.0,
    },
  });
  console.log('✓ Đã tạo Assessment:', assessment.title);

  // 5. CDN Base URL trên Supabase Storage
  const CDN_BASE = 'https://jxikmcvhamcdrsmyoyid.supabase.co/storage/v1/object/public/lectures/lop1';

  // 6. Danh sách 24 câu hỏi trắc nghiệm (Đã nhân đôi số lượng bài tập)
  const questionsData = [
    // --- PHẦN 1: BẢNG NHÂN CƠ BẢN 8x1 ĐẾN 8x5 ---
    {
      order_index: 1,
      image: `${CDN_BASE}/panels_dragon/panel_01.jpg`,
      imageAlt: 'Công chúa Amara và Chú Rồng Xanh',
      prompt: 'Chú Rồng Xanh ngoan ngoãn mang về tặng Bé An **1** giỏ táo thần kỳ. Trong giỏ có đúng **8** quả táo đỏ mọng phát sáng. Hỏi Bé An có tất cả bao nhiêu quả táo thần?\n\n*Phép tính: $8 \\times 1 = ?$*',
      options: [
        { id: 'A', text: '6 quả táo' },
        { id: 'B', text: '8 quả táo 🍎' },
        { id: 'C', text: '10 quả táo' },
        { id: 'D', text: '16 quả táo' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 1 giỏ gồm 8 quả táo: $8 \\times 1 = 8$ quả táo.',
      points: 1.0,
    },
    {
      order_index: 2,
      image: `${CDN_BASE}/panels_candy/panel_01.jpg`,
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
      points: 1.0,
    },
    {
      order_index: 3,
      image: `${CDN_BASE}/panels_dragon/panel_03.jpg`,
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
      points: 1.0,
    },
    {
      order_index: 4,
      image: `${CDN_BASE}/panels_candy/panel_02.jpg`,
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
      points: 1.0,
    },
    {
      order_index: 5,
      image: `${CDN_BASE}/panels_dragon/panel_09.jpg`,
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
      points: 1.0,
    },
    {
      order_index: 6,
      image: `${CDN_BASE}/panels_ocean/panel_03.jpg`,
      imageAlt: 'Bác rùa biển thông thái',
      prompt: 'Bác rùa biển thông thái đố Bé An: Bạn Rùa có $8 \\times 2 = 16$ viên ngọc trai, bác rùa tặng thêm đúng **8** viên ngọc trai nữa. Hỏi phép tính: $8 \\times 2 + 8$ bằng bao nhiêu viên?\n\n*Gợi ý: $8 \\times 2 + 8 = 8 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '20 viên' },
        { id: 'B', text: '22 viên' },
        { id: 'C', text: '24 viên ngọc trai 🐚' },
        { id: 'D', text: '26 viên' },
      ],
      correct_option_id: 'C',
      explanation: '$8 \\times 2 + 8 = 16 + 8 = 24$ (chính là $8 \\times 3 = 24$).',
      points: 1.0,
    },

    // --- PHẦN 2: BẢNG NHÂN 8x6 ĐẾN 8x10 & SO SÁNH ---
    {
      order_index: 7,
      image: `${CDN_BASE}/panels_nhan_6/bee_flower.jpg`,
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
      points: 1.0,
    },
    {
      order_index: 8,
      image: `${CDN_BASE}/panels_dragon/panel_06.jpg`,
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
      points: 1.0,
    },
    {
      order_index: 9,
      image: `${CDN_BASE}/panels_ocean/panel_01.jpg`,
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
      points: 1.0,
    },
    {
      order_index: 10,
      image: `${CDN_BASE}/panels_nhan_6/eagle_flight.jpg`,
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
      points: 1.0,
    },
    {
      order_index: 11,
      image: `${CDN_BASE}/panels_dragon/panel_12.jpg`,
      imageAlt: 'Vương miện vàng hoàng gia và tiệc mừng',
      prompt: 'Để chúc mừng Bé An học giỏi, Công chúa chuẩn bị **10** bàn tiệc hoàng gia. Mỗi bàn tiệc có **8** ly kem dâu mát lạnh. Hỏi có tất cả bao nhiêu ly kem dâu trên các bàn tiệc?\n\n*Phép tính: $8 \\times 10 = ?$*',
      options: [
        { id: 'A', text: '80 ly kem 🍨' },
        { id: 'B', text: '88 ly kem' },
        { id: 'C', text: '90 ly kem' },
        { id: 'D', text: '100 ly kem' },
      ],
      correct_option_id: 'A',
      explanation: 'Về đích trọn vẹn Bảng nhân 8: $8 \\times 10 = 80$ ly kem dâu.',
      points: 1.0,
    },
    {
      order_index: 12,
      image: `${CDN_BASE}/panels_candy/panel_04.jpg`,
      imageAlt: 'Đồi kem bảy màu rực rỡ',
      prompt: 'Tại Đồi Kem 7 Màu, Công chúa đố Bé An so sánh hai đĩa kem thần kỳ:\n\nĐĩa A có: $8 \\times 7$ viên kem.\nĐĩa B có: $8 \\times 8$ viên kem.\n\nBé An hãy chọn dấu thích hợp điền vào ô trống: $8 \\times 7 \\quad [\\;?\\;] \\quad 8 \\times 8$',
      options: [
        { id: 'A', text: '>' },
        { id: 'B', text: '< 🍦' },
        { id: 'C', text: '=' },
        { id: 'D', text: 'Không so sánh được' },
      ],
      correct_option_id: 'B',
      explanation: '$8 \\times 7 = 56$ và $8 \\times 8 = 64$. Vì $56 < 64$ nên dấu cần điền là dấu $<$.',
      points: 1.0,
    },

    // --- PHẦN 3: BẢN CHẤT TOÁN HỌC & QUY LUẬT DÃY SỐ ---
    {
      order_index: 13,
      image: `${CDN_BASE}/panels_nhan_5/magic_book.jpg`,
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
      points: 1.0,
    },
    {
      order_index: 14,
      image: `${CDN_BASE}/panels_candy/panel_06.jpg`,
      imageAlt: 'Xe kéo bánh quy thơm ngon',
      prompt: 'Bác thỏ lái xe kéo chở **6** khay bánh quy, mỗi khay có đúng **8** chiếc bánh thơm ngon:\n\n$$8 + 8 + 8 + 8 + 8 + 8$$\n\nPhép cộng 6 số 8 này tương ứng với phép nhân nào và có kết quả bằng bao nhiêu?',
      options: [
        { id: 'A', text: '8 × 5 = 40' },
        { id: 'B', text: '8 × 6 = 48 🍪' },
        { id: 'C', text: '8 × 7 = 56' },
        { id: 'D', text: '6 × 6 = 36' },
      ],
      correct_option_id: 'B',
      explanation: '6 số 8 cộng lại chính là $8 \\times 6 = 48$ chiếc bánh quy.',
      points: 1.0,
    },
    {
      order_index: 15,
      image: `${CDN_BASE}/Tam_11_Cong_Chua_Va_Chu_Rong_Xanh_3_So_3_Chu_So.png`,
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
      points: 1.0,
    },
    {
      order_index: 16,
      image: `${CDN_BASE}/Tam_8_Xu_So_Banh_Keo_Cong_Tru_3_So.png`,
      imageAlt: 'Con đường kẹo ngọt lung linh',
      prompt: '🍭 **Con đường kẹo ngọt:** Bé An đi qua các cột mốc số may mắn trên con đường kẹo:\n\n$$48, \\quad 56, \\quad 64, \\quad [\\;?\\;], \\quad 80$$\n\nSố còn thiếu trong ô trống là số nào để hoàn thành con đường phép thuật?',
      options: [
        { id: 'A', text: '70' },
        { id: 'B', text: '72 🍬' },
        { id: 'C', text: '74' },
        { id: 'D', text: '76' },
      ],
      correct_option_id: 'B',
      explanation: 'Dãy số cách đều 8 đơn vị: $64 + 8 = 72$ (tương ứng với $8 \\times 9 = 72$).',
      points: 1.0,
    },
    {
      order_index: 17,
      image: `${CDN_BASE}/panels_nhan_5/turtle_friend.jpg`,
      imageAlt: 'Bạn rùa nhỏ dễ thương',
      prompt: '🐢 Bạn rùa nhỏ thắc mắc: "Phép nhân $8 \\times 5$ và phép nhân $5 \\times 8$ có kết quả như thế nào với nhau nhỉ?"\n\nBé An hãy giúp bạn rùa chọn câu trả lời đúng nhất nhé!',
      options: [
        { id: 'A', text: '8 × 5 lớn hơn' },
        { id: 'B', text: '5 × 8 lớn hơn' },
        { id: 'C', text: 'Bằng nhau và đều bằng 40 🎯' },
        { id: 'D', text: 'Khác nhau hoàn toàn' },
      ],
      correct_option_id: 'C',
      explanation: 'Khi đổi chỗ các thừa số thì tích không đổi: $8 \\times 5 = 5 \\times 8 = 40$.',
      points: 1.0,
    },
    {
      order_index: 18,
      image: `${CDN_BASE}/panels_nhan_5/dragon_flight.jpg`,
      imageAlt: 'Rồng Xanh bay lượn trên bầu trời',
      prompt: '🐉 Khi Chú Rồng Xanh bay lượn trên trời mây, chú đố Bé An: "Phép nhân $8 \\times 3$ có kết quả giống hệt phép tính nào sau đây?"',
      options: [
        { id: 'A', text: '3 × 8 🌈' },
        { id: 'B', text: '8 + 3' },
        { id: 'C', text: '8 - 3' },
        { id: 'D', text: '3 + 3 + 3' },
      ],
      correct_option_id: 'A',
      explanation: 'Tính chất giao hoán: $8 \\times 3 = 3 \\times 8 = 24$.',
      points: 1.0,
    },

    // --- PHẦN 4: TOÁN ĐỐ TÌNH HUỐNG & THỬ THÁCH THÔNG MINH ---
    {
      order_index: 19,
      image: `${CDN_BASE}/panels_candy/panel_03.jpg`,
      imageAlt: 'Dòng sông sô-cô-la ngọt ngào',
      prompt: 'Trên Dòng Sông Sô-Cô-La, có **8** chiếc thuyền lá trôi lững lờ. Trên mỗi chiếc thuyền có **7** bạn sóc nhỏ đang chèo thuyền ngắm cảnh. Hỏi có tất cả bao nhiêu bạn sóc nhỏ trên dòng sông?\n\n*Phép tính: $8 \\times 7 = ?$*',
      options: [
        { id: 'A', text: '54 bạn sóc' },
        { id: 'B', text: '56 bạn sóc 🐿️' },
        { id: 'C', text: '58 bạn sóc' },
        { id: 'D', text: '60 bạn sóc' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 8 chiếc thuyền, mỗi thuyền 7 bạn: $8 \\times 7 = 56$ bạn sóc nhỏ.',
      points: 1.0,
    },
    {
      order_index: 20,
      image: `${CDN_BASE}/panels_nhan_6/gnome_campfire.jpg`,
      imageAlt: 'Chú lùn bên đống lửa trại ấm áp',
      prompt: 'Bên đống lửa trại trong rừng, có **9** chú lùn tí hon. Mỗi chú lùn gom được **8** cành củi khô để sưởi ấm. Hỏi các chú lùn đã gom được tất cả bao nhiêu cành củi khô?\n\n*Phép tính: $8 \\times 9 = ?$*',
      options: [
        { id: 'A', text: '68 cành' },
        { id: 'B', text: '70 cành' },
        { id: 'C', text: '72 cành củi 🔥' },
        { id: 'D', text: '76 cành' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 9 chú lùn, mỗi chú gom 8 cành: $8 \\times 9 = 72$ cành củi khô.',
      points: 1.0,
    },
    {
      order_index: 21,
      image: `${CDN_BASE}/panels_nhan_6/golden_door.jpg`,
      imageAlt: 'Cánh cửa vàng bí ẩn',
      prompt: '🚪 Trên Cánh Cửa Vàng dẫn vào kho báu có khắc câu đố mở khóa:\n\n$$8 \\times x = 48$$\n\nBé An hãy tìm xem số $x$ là số mấy để chiếc khóa vàng mở ra nhé!',
      options: [
        { id: 'A', text: 'x = 5' },
        { id: 'B', text: 'x = 6 🗝️' },
        { id: 'C', text: 'x = 7' },
        { id: 'D', text: 'x = 8' },
      ],
      correct_option_id: 'B',
      explanation: 'Vì $8 \\times 6 = 48$ nên giá trị của $x$ là 6.',
      points: 1.0,
    },
    {
      order_index: 22,
      image: `${CDN_BASE}/panels_dragon/panel_04.jpg`,
      imageAlt: 'Hồ nước pha lê lấp lánh',
      prompt: '💧 Dưới mặt Hồ Nước Pha Lê hiện lên dòng mật mã kỳ diệu:\n\n$$8 \\times y = 32$$\n\nBé An hãy chọn giá trị đúng của $y$ để hồ nước tỏa sáng lấp lánh nhé!',
      options: [
        { id: 'A', text: 'y = 3' },
        { id: 'B', text: 'y = 4 💎' },
        { id: 'C', text: 'y = 5' },
        { id: 'D', text: 'y = 6' },
      ],
      correct_option_id: 'B',
      explanation: 'Vì $8 \\times 4 = 32$ nên giá trị của $y$ là 4.',
      points: 1.0,
    },
    {
      order_index: 23,
      image: `${CDN_BASE}/panels_nhan_5/royal_family.jpg`,
      imageAlt: 'Gia đình hoàng gia rồng',
      prompt: '👑 Trong Gia Đình Rồng Hoàng Gia, Chú Rồng Xanh con nặng **8** kg. Mẹ Rồng nặng gấp **8** lần Rồng Xanh con. Hỏi Mẹ Rồng nặng bao nhiêu ki-lô-gam?\n\n*Phép tính: $8 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '60 kg' },
        { id: 'B', text: '62 kg' },
        { id: 'C', text: '64 kg 🐉' },
        { id: 'D', text: '70 kg' },
      ],
      correct_option_id: 'C',
      explanation: 'Mẹ Rồng nặng gấp 8 lần: $8 \\times 8 = 64$ kg.',
      points: 1.0,
    },
    {
      order_index: 24,
      image: `${CDN_BASE}/Tam_7_Dai_Duong_Cong_Tru_3_So.png`,
      imageAlt: 'Đại dương rực rỡ và phần thưởng về đích',
      prompt: '🏆 **Thử thách trùm cuối về đích:** Bé An đã hoàn thành xuất sắc chuyến phiêu lưu! Nàng tiên cá tặng Bé An **8** hộp ngọc bích, mỗi hộp chứa đúng **10** viên ngọc lấp lánh. Hỏi Bé An nhận được tất cả bao nhiêu viên ngọc bích?\n\n*Phép tính: $8 \\times 10 = ?$*',
      options: [
        { id: 'A', text: '70 viên' },
        { id: 'B', text: '80 viên ngọc bích 🌟' },
        { id: 'C', text: '88 viên' },
        { id: 'D', text: '90 viên' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 8 hộp, mỗi hộp 10 viên ngọc: $8 \\times 10 = 80$ viên ngọc bích.',
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
  console.log(`✓ Đã tạo thành công toàn bộ ${questionsData.length} câu hỏi có hình ảnh minh họa cho Bảng cửu chương 8.`);

  // 7. Giao bài ngày 29/10/2026 cho Bé An
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: studentAn.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 60,
      teacher_daily_note: 'Bé An chinh phục trọn vẹn 24 câu đố Bảng cửu chương 8 nhé! Làm xong mỗi câu nhớ bấm nút "Next: Câu tiếp theo" nha con!',
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

  console.log('✓ Đã giao bài 24 câu ngày 29/10/2026 cho Bé An (An Lake)!');
  console.log(`  - Assignment ID: ${assignment.id}`);
  console.log(`  - Attempt ID: ${attempt.id}`);
  console.log('🎉 Hoàn tất Double số lượng bài tập 100%!');
}

main()
  .catch((e) => {
    console.error('Lỗi khi tạo bài tập:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
