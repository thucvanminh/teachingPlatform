const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu tạo bài tập Bảng cửu chương 9 (24 câu - 40 phút) cho Bé An (Lớp 1) ngày 01/11/2026...');

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

  // Target Date: 2026-11-01
  const targetDate = new Date('2026-11-01T00:00:00.000Z');

  // 2. Dọn dẹp bài tập cũ của ngày 01/11/2026 nếu đã có
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
    console.log('⚠️ Tìm thấy bài tập cũ ngày 01/11/2026 của Bé An, dọn dẹp để thay thế bằng bộ bài mới...');
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
      title: 'Vương Quốc Băng Tuyết: Chinh Phục Bảng Cửu Chương 9',
      description: 'Chuyên đề 24 bài tập vui nhộn: Khám phá bí mật Bảng nhân 9 cùng Công chúa Amara, Chú Rồng Xanh và muôn thú Vương Quốc Băng Giá.',
      lecture_content_markdown: null, // Chỉ có bài tập theo yêu cầu của Thầy
      lecture_attachments: [],
      is_template: true,
    },
  });
  console.log('✓ Đã tạo Learning Unit (chỉ bài tập):', learningUnit.title);

  // 4. Tạo Assessment (Bộ 24 bài tập làm trong 40 phút)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      type: 'IN_SESSION_90M',
      title: 'Đố Vui Bảng Cửu Chương 9 Cùng Bé An (24 Thử Thách - 40 Phút) ❄️👑',
      instructions: 'Bé quan sát tranh ảnh sinh động, chọn đáp án đúng rồi bấm nút "Next: Câu tiếp theo ➡️" để sang bài nhé!',
      time_limit_minutes: 40,
      max_score: 24.0,
    },
  });
  console.log('✓ Đã tạo Assessment:', assessment.title);

  // 5. CDN Base URL trên Supabase Storage
  const CDN_BASE = 'https://jxikmcvhamcdrsmyoyid.supabase.co/storage/v1/object/public/lectures/lop1';

  // 6. Danh sách 24 câu hỏi trắc nghiệm đa dạng, phong phú cho Bảng nhân 9
  const questionsData = [
    // --- PHẦN 1: BẢN CHẤT NHÓM & BẢNG NHÂN 9x1 ĐẾN 9x5 ---
    {
      order_index: 1,
      image: `${CDN_BASE}/panels_winter/panel_01.jpg`,
      imageAlt: 'Công chúa Amara bước vào Vương Quốc Băng Tuyết',
      prompt: 'Công chúa Amara bước vào Vương Quốc Băng Tuyết và nhận được **1** giỏ pha lê tuyết từ Chú Rồng Xanh. Trong giỏ có đúng **9** viên ngọc tuyết lấp lánh. Hỏi Công chúa có tất cả bao nhiêu viên ngọc tuyết?\n\n*Phép tính: $9 \\times 1 = ?$*',
      options: [
        { id: 'A', text: '7 viên' },
        { id: 'B', text: '9 viên' },
        { id: 'C', text: '18 viên' },
        { id: 'D', text: '10 viên' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 1 giỏ gồm 9 viên ngọc tuyết: $9 \\times 1 = 9$ viên.',
      points: 1.0,
    },
    {
      order_index: 2,
      image: `${CDN_BASE}/panels_winter/panel_02.jpg`,
      imageAlt: 'Lâu đài băng giá và những đĩa bánh quy sao băng',
      prompt: 'Chú Rồng Xanh nướng bánh quy ngôi sao băng thơm phức xếp đều vào **2** chiếc đĩa thần kỳ. Mỗi chiếc đĩa có đúng **9** chiếc bánh thơm giòn. Hỏi Chú Rồng Xanh đã nướng tất cả bao nhiêu chiếc bánh quy?\n\n*Phép tính: $9 \\times 2 = 9 + 9 = ?$*',
      options: [
        { id: 'A', text: '16 chiếc' },
        { id: 'B', text: '18 chiếc' },
        { id: 'C', text: '19 chiếc' },
        { id: 'D', text: '27 chiếc' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 2 đĩa bánh, mỗi đĩa 9 chiếc: $9 \\times 2 = 18$ chiếc bánh.',
      points: 1.0,
    },
    {
      order_index: 3,
      image: `${CDN_BASE}/panels_winter/panel_03.jpg`,
      imageAlt: 'Vườn hoa tuyết pha lê bảy màu',
      prompt: 'Trong vườn ngự uyển có **3** khóm hoa tuyết pha lê bảy màu. Mỗi khóm hoa nở đúng **9** đóa hoa rực rỡ tỏa sáng. Hỏi có tất cả bao nhiêu đóa hoa tuyết pha lê trong vườn?\n\n*Phép tính: $9 \\times 3 = 9 + 9 + 9 = ?$*',
      options: [
        { id: 'A', text: '27 đóa hoa' },
        { id: 'B', text: '24 đóa hoa' },
        { id: 'C', text: '30 đóa hoa' },
        { id: 'D', text: '36 đóa hoa' },
      ],
      correct_option_id: 'A',
      explanation: 'Có 3 khóm hoa, mỗi khóm 9 đóa: $9 \\times 3 = 27$ đóa hoa.',
      points: 1.0,
    },
    {
      order_index: 4,
      image: `${CDN_BASE}/panels_candy/panel_02.jpg`,
      imageAlt: 'Cây kẹo mút khổng lồ bảy màu',
      prompt: 'Bé An chuẩn bị quà tặng các bạn nhỏ gồm **4** túi kẹo mút xoắn ốc khổng lồ. Mỗi túi kẹo có đúng **9** chiếc kẹo ngọt ngào. Hỏi Bé An có tất cả bao nhiêu chiếc kẹo mút?\n\n*Phép tính: $9 \\times 4 = ?$*',
      options: [
        { id: 'A', text: '32 chiếc' },
        { id: 'B', text: '34 chiếc' },
        { id: 'C', text: '36 chiếc' },
        { id: 'D', text: '40 chiếc' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 4 túi kẹo, mỗi túi 9 chiếc: $9 \\times 4 = 36$ chiếc kẹo.',
      points: 1.0,
    },
    {
      order_index: 5,
      image: `${CDN_BASE}/panels_dragon/panel_09.jpg`,
      imageAlt: 'Rương vàng kho báu thần kỳ',
      prompt: 'Chú Rồng Xanh tìm thấy **5** chiếc rương thần thoại trong hang đá. Mỗi chiếc rương chứa đúng **9** viên kim cương xanh lấp lánh. Hỏi Chú Rồng Xanh có tất cả bao nhiêu viên kim cương?\n\n*Phép tính: $9 \\times 5 = ?$*',
      options: [
        { id: 'A', text: '40 viên' },
        { id: 'B', text: '45 viên' },
        { id: 'C', text: '50 viên' },
        { id: 'D', text: '54 viên' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 5 chiếc rương, mỗi rương 9 viên: $9 \\times 5 = 45$ viên kim cương.',
      points: 1.0,
    },
    {
      order_index: 6,
      image: `${CDN_BASE}/panels_ocean/panel_03.jpg`,
      imageAlt: 'Bác rùa biển thông thái',
      prompt: 'Bác rùa thông thái đố Bé An: Bạn chim cánh cụt đã có $9 \\times 2 = 18$ con cá, bác rùa tặng thêm đúng **9** con cá tươi nữa. Hỏi phép tính $9 \\times 2 + 9$ có kết quả bằng bao nhiêu?\n\n*Gợi ý: $9 \\times 2 + 9 = 9 \\times 3 = ?$*',
      options: [
        { id: 'A', text: '25 con' },
        { id: 'B', text: '26 con' },
        { id: 'C', text: '27 con' },
        { id: 'D', text: '30 con' },
      ],
      correct_option_id: 'C',
      explanation: '$9 \\times 2 + 9 = 18 + 9 = 27$ (chính là $9 \\times 3 = 27$).',
      points: 1.0,
    },

    // --- PHẦN 2: CHINH PHỤC BẢNG NHÂN LỚN 9x6 ĐẾN 9x10 & SO SÁNH ---
    {
      order_index: 7,
      image: `${CDN_BASE}/panels_winter/panel_05.jpg`,
      imageAlt: 'Hồ băng và những chú thiên nga tuyết',
      prompt: 'Trên mặt hồ băng có **6** gia đình thiên nga tuyết đang lướt đi êm ả. Mỗi gia đình gồm đúng **9** thành viên đáng yêu. Hỏi cả đàn thiên nga có tất cả bao nhiêu thành viên?\n\n*Phép tính: $9 \\times 6 = ?$*',
      options: [
        { id: 'A', text: '48 thành viên' },
        { id: 'B', text: '52 thành viên' },
        { id: 'C', text: '54 thành viên' },
        { id: 'D', text: '63 thành viên' },
      ],
      correct_option_id: 'C',
      explanation: 'Có 6 gia đình, mỗi gia đình 9 thành viên: $9 \\times 6 = 54$ thành viên.',
      points: 1.0,
    },
    {
      order_index: 8,
      image: `${CDN_BASE}/panels_nhan_7/panel_04.jpg`,
      imageAlt: 'Cánh rừng đêm và đàn bướm phát sáng',
      prompt: 'Trong khu rừng cổ thụ có **7** cành cây cổ thụ lớn. Mỗi cành cây có đúng **9** chú bướm phát sáng đậu lung linh như những vì sao. Hỏi có tất cả bao nhiêu chú bướm phát sáng?\n\n*Phép tính: $9 \\times 7 = ?$*',
      options: [
        { id: 'A', text: '56 chú bướm' },
        { id: 'B', text: '63 chú bướm' },
        { id: 'C', text: '65 chú bướm' },
        { id: 'D', text: '72 chú bướm' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 7 cành cây, mỗi cành 9 chú bướm: $9 \\times 7 = 63$ chú bướm.',
      points: 1.0,
    },
    {
      order_index: 9,
      image: `${CDN_BASE}/panels_winter/panel_08.jpg`,
      imageAlt: 'Người tuyết và đàn chim cánh cụt trượt tuyết',
      prompt: 'Người Tuyết cùng các bạn tổ chức cuộc thi trượt tuyết gồm **8** đội thi đấu. Mỗi đội có đúng **9** vận động viên chim cánh cụt tí hon. Hỏi có tất cả bao nhiêu chú chim cánh cụt tham gia cuộc thi?\n\n*Phép tính: $9 \\times 8 = ?$*',
      options: [
        { id: 'A', text: '70 chú' },
        { id: 'B', text: '72 chú' },
        { id: 'C', text: '74 chú' },
        { id: 'D', text: '81 chú' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 8 đội, mỗi đội 9 chú chim cánh cụt: $9 \\times 8 = 72$ chú chim.',
      points: 1.0,
    },
    {
      order_index: 10,
      image: `${CDN_BASE}/panels_winter/panel_10.jpg`,
      imageAlt: 'Vương miện pha lê và đỉnh cao bảng 9',
      prompt: '👑 **Đỉnh cao Bảng nhân 9:** Để vinh danh Công chúa Amara, nhà vua mang ra **9** chiếc hộp hoàng gia tuyệt đẹp. Mỗi chiếc hộp đính đúng **9** viên ngọc bích quý giá nhất vương quốc. Hỏi có tất cả bao nhiêu viên ngọc bích?\n\n*Phép tính: $9 \\times 9 = ?$*',
      options: [
        { id: 'A', text: '79 viên' },
        { id: 'B', text: '80 viên' },
        { id: 'C', text: '81 viên' },
        { id: 'D', text: '90 viên' },
      ],
      correct_option_id: 'C',
      explanation: 'Đỉnh cao bảng nhân 9: $9 \\times 9 = 81$ viên ngọc bích.',
      points: 1.0,
    },
    {
      order_index: 11,
      image: `${CDN_BASE}/panels_winter/panel_12.jpg`,
      imageAlt: 'Đại tiệc chào đón mùa đông tại hoàng cung',
      prompt: 'Tại đại sảnh lâu đài, Công chúa bày **10** bàn tiệc mừng chiến thắng. Mỗi bàn tiệc có **9** ly sữa nóng thơm lừng hương quế. Hỏi có tất cả bao nhiêu ly sữa nóng trên các bàn tiệc?\n\n*Phép tính: $9 \\times 10 = ?$*',
      options: [
        { id: 'A', text: '85 ly' },
        { id: 'B', text: '90 ly' },
        { id: 'C', text: '95 ly' },
        { id: 'D', text: '100 ly' },
      ],
      correct_option_id: 'B',
      explanation: 'Về đích trọn vẹn Bảng nhân 9: $9 \\times 10 = 90$ ly sữa nóng.',
      points: 1.0,
    },
    {
      order_index: 12,
      image: `${CDN_BASE}/panels_candy/panel_04.jpg`,
      imageAlt: 'Đồi kem bảy màu rực rỡ',
      prompt: '⚖️ **So sánh thần kỳ:** Công chúa đố Bé An điền dấu thích hợp vào giữa hai phép tính dưới đây:\n\n$$9 \\times 6 \\quad [\\;?\\;] \\quad 9 \\times 7$$\n\nBé An hãy chọn dấu đúng nhất nhé!',
      options: [
        { id: 'A', text: '>' },
        { id: 'B', text: '<' },
        { id: 'C', text: '=' },
        { id: 'D', text: 'Không so sánh được' },
      ],
      correct_option_id: 'B',
      explanation: 'Vì $9 \\times 6 = 54$ và $9 \\times 7 = 63$. Do $54 < 63$ nên điền dấu $<$.',
      points: 1.0,
    },

    // --- PHẦN 3: BÍ MẬT ẢO THUẬT BẢNG 9 & QUY LUẬT DÃY SỐ ---
    {
      order_index: 13,
      image: `${CDN_BASE}/panels_nhan_5/magic_book.jpg`,
      imageAlt: 'Sách phép thuật toán học',
      prompt: '📖 **Bí kíp toán học:** Cuốn sách phép thuật mở ra câu đố: Phép cộng gồm 4 số 9 dưới đây:\n\n$$9 + 9 + 9 + 9$$\n\nĐược viết gọn lại thành phép nhân nào và có kết quả bằng bao nhiêu?',
      options: [
        { id: 'A', text: '9 × 3 = 27' },
        { id: 'B', text: '9 × 4 = 36' },
        { id: 'C', text: '9 × 5 = 45' },
        { id: 'D', text: '4 × 4 = 16' },
      ],
      correct_option_id: 'B',
      explanation: 'Số 9 được lấy 4 lần nên viết gọn thành $9 \\times 4 = 36$.',
      points: 1.0,
    },
    {
      order_index: 14,
      image: `${CDN_BASE}/panels_candy/panel_06.jpg`,
      imageAlt: 'Xe chở bánh quy gừng',
      prompt: 'Bác sóc nhỏ chở **5** khay bánh quy nướng, mỗi khay có đúng **9** chiếc bánh quy hình ngôi sao:\n\n$$9 + 9 + 9 + 9 + 9$$\n\nPhép cộng này tương ứng với phép nhân nào dưới đây?',
      options: [
        { id: 'A', text: '9 × 4' },
        { id: 'B', text: '9 × 5 = 45' },
        { id: 'C', text: '9 × 6 = 54' },
        { id: 'D', text: '5 × 5 = 25' },
      ],
      correct_option_id: 'B',
      explanation: '5 số 9 cộng lại chính là $9 \\times 5 = 45$.',
      points: 1.0,
    },
    {
      order_index: 15,
      image: `${CDN_BASE}/panels_winter/panel_04.jpg`,
      imageAlt: 'Gương thần băng giá kỳ diệu',
      prompt: '🔮 **Bí mật ảo thuật của Bảng 9:** Trong bảng nhân 9, các kết quả luôn có một điều kỳ diệu: **Tổng hai chữ số luôn bằng 9**!\n- $18 \\rightarrow 1 + 8 = 9$\n- $27 \\rightarrow 2 + 7 = 9$\n- $36 \\rightarrow 3 + 6 = 9$\n\nBé An hãy đoán xem số $45$ có tổng hai chữ số $4 + 5$ bằng mấy nhé?',
      options: [
        { id: 'A', text: '7' },
        { id: 'B', text: '8' },
        { id: 'C', text: '9' },
        { id: 'D', text: '10' },
      ],
      correct_option_id: 'C',
      explanation: 'Bí mật bảng nhân 9: $4 + 5 = 9$! Bất kỳ kết quả nào trong bảng 9 tổng 2 chữ số cũng bằng 9.',
      points: 1.0,
    },
    {
      order_index: 16,
      image: `${CDN_BASE}/panels_nhan_7/panel_06.jpg`,
      imageAlt: 'Cổng đá phép thuật',
      prompt: '🔮 **Thử thách ảo thuật:** Kết quả của phép tính $9 \\times 7 = 63$. Bé An hãy tính xem tổng hai chữ số của số $63$ là $6 + 3$ bằng bao nhiêu?',
      options: [
        { id: 'A', text: '8' },
        { id: 'B', text: '9' },
        { id: 'C', text: '10' },
        { id: 'D', text: '11' },
      ],
      correct_option_id: 'B',
      explanation: 'Ta có $6 + 3 = 9$! Đây chính là quy tắc ảo thuật tuyệt đỉnh của bảng 9.',
      points: 1.0,
    },
    {
      order_index: 17,
      image: `${CDN_BASE}/Tam_11_Cong_Chua_Va_Chu_Rong_Xanh_3_So_3_Chu_So.png`,
      imageAlt: 'Công chúa và Chú Rồng Xanh',
      prompt: '⭐ **Bậc thang bước nhảy $+9$:** Chú Rồng Xanh nhảy qua các bậc đá phép thuật cộng dồn thêm 9:\n\n$$9, \\quad 18, \\quad 27, \\quad 36, \\quad [\\;?\\;]$$\n\nBé An hãy tìm số tiếp theo trên bậc thang thần kỳ nhé!',
      options: [
        { id: 'A', text: '40' },
        { id: 'B', text: '42' },
        { id: 'C', text: '45' },
        { id: 'D', text: '48' },
      ],
      correct_option_id: 'C',
      explanation: 'Mỗi bậc cộng thêm 9: $36 + 9 = 45$ (tương ứng với $9 \\times 5 = 45$).',
      points: 1.0,
    },
    {
      order_index: 18,
      image: `${CDN_BASE}/Tam_2_Vuong_Quoc_Bang_Tuyet.png`,
      imageAlt: 'Vương quốc Băng Tuyết rực rỡ',
      prompt: '❄️ **Con đường tuyết trắng:** Bé An bước đi trên con đường tuyết đánh số thần kỳ:\n\n$$54, \\quad 63, \\quad 72, \\quad [\\;?\\;], \\quad 90$$\n\nSố còn thiếu trong ô trống là số mấy để thắp sáng con đường?',
      options: [
        { id: 'A', text: '79' },
        { id: 'B', text: '80' },
        { id: 'C', text: '81' },
        { id: 'D', text: '85' },
      ],
      correct_option_id: 'C',
      explanation: 'Dãy số cách đều 9 đơn vị: $72 + 9 = 81$ (tương ứng với $9 \\times 9 = 81$).',
      points: 1.0,
    },
    {
      order_index: 19,
      image: `${CDN_BASE}/panels_nhan_5/turtle_friend.jpg`,
      imageAlt: 'Bạn rùa nhỏ thông minh',
      prompt: '🐢 Bạn Rùa thông minh đố Bé An: "Phép tính $9 \\times 6$ và phép tính $6 \\times 9$ có kết quả như thế nào với nhau?"',
      options: [
        { id: 'A', text: '9 × 6 lớn hơn' },
        { id: 'B', text: '6 × 9 lớn hơn' },
        { id: 'C', text: 'Bằng nhau và đều bằng 54' },
        { id: 'D', text: 'Khác nhau hoàn toàn' },
      ],
      correct_option_id: 'C',
      explanation: 'Tính chất giao hoán: Đổi chỗ các thừa số thì tích không đổi: $9 \\times 6 = 6 \\times 9 = 54$.',
      points: 1.0,
    },
    {
      order_index: 20,
      image: `${CDN_BASE}/panels_nhan_5/dragon_flight.jpg`,
      imageAlt: 'Rồng Xanh bay lượn trên trời mây',
      prompt: '🐉 Chú Rồng Xanh bay lượn và hỏi: "Phép nhân $9 \\times 4$ có kết quả giống hệt phép tính nào dưới đây nhỉ?"',
      options: [
        { id: 'A', text: '4 × 9' },
        { id: 'B', text: '9 + 4' },
        { id: 'C', text: '9 - 4' },
        { id: 'D', text: '4 + 4 + 4' },
      ],
      correct_option_id: 'A',
      explanation: 'Tính chất giao hoán: $9 \\times 4 = 4 \\times 9 = 36$.',
      points: 1.0,
    },

    // --- PHẦN 4: TOÁN ĐỐ THỰC TẾ & MẬT MÃ MỞ KHÓA LÂU ĐÀI ---
    {
      order_index: 21,
      image: `${CDN_BASE}/Tam_4_Mat_Ma_Lau_Dai_Bang_Gia.png`,
      imageAlt: 'Mật mã Lâu đài Băng giá',
      prompt: '🏰 Trên Cánh Cổng Băng của lâu đài xuất hiện câu đố tìm ẩn số $x$:\n\n$$9 \\times x = 54$$\n\nBé An hãy chọn xem $x$ bằng mấy để cánh cổng lâu đài mở ra nhé!',
      options: [
        { id: 'A', text: 'x = 5' },
        { id: 'B', text: 'x = 6' },
        { id: 'C', text: 'x = 7' },
        { id: 'D', text: 'x = 8' },
      ],
      correct_option_id: 'B',
      explanation: 'Vì $9 \\times 6 = 54$ nên giá trị của $x$ là 6.',
      points: 1.0,
    },
    {
      order_index: 22,
      image: `${CDN_BASE}/panels_nhan_6/golden_door.jpg`,
      imageAlt: 'Cánh cửa kho báu vàng',
      prompt: '🚪 Trên ổ khóa rương báu có dòng chữ phép thuật:\n\n$$9 \\times y = 72$$\n\nBé An hãy tìm giá trị của $y$ để mở rương kho báu nhé!',
      options: [
        { id: 'A', text: 'y = 7' },
        { id: 'B', text: 'y = 8' },
        { id: 'C', text: 'y = 9' },
        { id: 'D', text: 'y = 6' },
      ],
      correct_option_id: 'B',
      explanation: 'Vì $9 \\times 8 = 72$ nên giá trị của $y$ là 8.',
      points: 1.0,
    },
    {
      order_index: 23,
      image: `${CDN_BASE}/panels_winter/panel_09.jpg`,
      imageAlt: 'Chú thỏ trắng nhặt quả thông',
      prompt: '🐰 Bạn thỏ trắng nhặt được $9 \\times 5 = 45$ quả thông tuyết. Thỏ tặng Chú Rồng Xanh **9** quả thông. Hỏi thỏ còn lại bao nhiêu quả thông tuyết?\n\n*Phép tính: $9 \\times 5 - 9 = ?$ (tức là $9 \\times 4$)*',
      options: [
        { id: 'A', text: '32 quả' },
        { id: 'B', text: '35 quả' },
        { id: 'C', text: '36 quả' },
        { id: 'D', text: '40 quả' },
      ],
      correct_option_id: 'C',
      explanation: 'Ta có $45 - 9 = 36$ (chính là $9 \\times 4 = 36$).',
      points: 1.0,
    },
    {
      order_index: 24,
      image: `${CDN_BASE}/panels_nhan_7/panel_12.jpg`,
      imageAlt: 'Vương trượng thần kỳ và tiệc mừng chiến thắng',
      prompt: '🏆 **Thử thách trùm cuối:** Bé An đã hoàn thành xuất sắc chuyến phiêu lưu Bảng nhân 9! Nàng Tiên Băng trao tặng Bé An **9** chiếc túi nhung, mỗi chiếc túi đựng đúng **10** ngôi sao may mắn. Hỏi Bé An nhận được tất cả bao nhiêu ngôi sao may mắn?\n\n*Phép tính: $9 \\times 10 = ?$*',
      options: [
        { id: 'A', text: '80 ngôi sao' },
        { id: 'B', text: '90 ngôi sao' },
        { id: 'C', text: '99 ngôi sao' },
        { id: 'D', text: '100 ngôi sao' },
      ],
      correct_option_id: 'B',
      explanation: 'Có 9 chiếc túi, mỗi túi 10 ngôi sao: $9 \\times 10 = 90$ ngôi sao may mắn.',
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
  console.log(`✓ Đã tạo thành công toàn bộ ${questionsData.length} câu hỏi có hình ảnh minh họa cho Bảng cửu chương 9.`);

  // 7. Giao bài ngày 01/11/2026 cho Bé An (custom_session_minutes: 40)
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: studentAn.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 40,
      teacher_daily_note: 'Bé An cùng Chú Rồng Xanh khám phá Vương Quốc Băng Tuyết và giải mã 24 câu đố Bảng cửu chương 9 thật vui nhé! Làm xong mỗi câu con nhớ bấm "Next: Câu tiếp theo" nha!',
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

  console.log('✓ Đã giao bài 24 câu ngày 01/11/2026 cho Bé An (An Lake)!');
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
