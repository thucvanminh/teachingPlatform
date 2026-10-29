const { PrismaClient } = require('./node_modules/@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu tạo bài học & bài tập ôn tập Giữa kì 1 cho bạn Thái (29/10/2026)...');

  // 1. Kiểm tra tài khoản bạn Thái và môn ENG_11
  const thai = await prisma.users.findUnique({
    where: { username: 'thai' }
  });
  if (!thai) throw new Error('Không tìm thấy tài khoản thai');

  const subject = await prisma.subjects.findUnique({
    where: { code: 'ENG_11' }
  });
  if (!subject) throw new Error('Không tìm thấy môn Tiếng Anh 11');

  const teacher = await prisma.users.findUnique({
    where: { username: 'teacher' }
  });
  if (!teacher) throw new Error('Không tìm thấy tài khoản teacher');

  console.log(`✓ Học sinh: ${thai.full_name} (${thai.username})`);
  console.log(`✓ Giáo viên: ${teacher.full_name} (${teacher.username})`);
  console.log(`✓ Môn học: ${subject.name} (${subject.code})`);

  // 2. Đọc dữ liệu từ file
  const testTxt = fs.readFileSync('/home/dantey/Dantey/teaching/lop_11/mid_term_1_english_11_practice_test.txt', 'utf8');
  const dataContent = fs.readFileSync('/home/dantey/Dantey/teaching/lop_11/website/data.js', 'utf8');
  const websiteData = eval('(function(){ ' + dataContent + '; return { VOCAB_DATA, COLLOCATIONS_DATA, QUESTIONS_DATA }; })()');

  // Helper chuyển đổi options [ 'A. foo', 'B. bar', ... ] sang [ { id: 'A', text: 'foo' }, ... ]
  function formatOptions(rawOptions) {
    const letters = ['A', 'B', 'C', 'D'];
    return rawOptions.map((opt, i) => {
      let text = opt.replace(/^[A-D]\.\s*/, '').trim();
      return { id: letters[i], text };
    });
  }

  const rawQuestions = [];

  // ==========================================
  // NHÓM 1: TỪ VỰNG CỐT LÕI (VOCABULARY)
  // ==========================================
  // Từ website data.js vocabulary (24 câu)
  websiteData.QUESTIONS_DATA.vocabulary.forEach((q) => {
    rawQuestions.push({
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: q.question,
      options: formatOptions(q.options),
      correct_option_id: q.answerLetter,
      explanation: q.explanation || 'Đáp án đúng: ' + q.answerLetter
    });
  });

  // Từ mid_term_1_english_11_practice_test.txt (Vocabulary)
  rawQuestions.push(
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'My grandparents live in a(n) ________ family with four generations under the same roof.',
      options: [
        { id: 'A', text: 'nuclear' },
        { id: 'B', text: 'extended' },
        { id: 'C', text: 'single-parent' },
        { id: 'D', text: 'individual' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: extended family (gia đình đa thế hệ, nhiều thế hệ cùng chung sống dưới một mái nhà).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'He suffered from a serious bacterial ________ after swimming in the contaminated river.',
      options: [
        { id: 'A', text: 'infectious' },
        { id: 'B', text: 'infection' },
        { id: 'C', text: 'infect' },
        { id: 'D', text: 'infectiously' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: bacterial infection (cụm danh từ: sự nhiễm khuẩn; sau tính từ "bacterial" cần danh từ).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'Modern urban planners are designing future cities with ________ infrastructure to protect nature.',
      options: [
        { id: 'A', text: 'sustainable' },
        { id: 'B', text: 'traditional' },
        { id: 'C', text: 'conservative' },
        { id: 'D', text: 'temporary' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: sustainable infrastructure (cơ sở hạ tầng bền vững, thân thiện với môi trường).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'Regular physical exercise helps strengthen the ________ system against common viruses.',
      options: [
        { id: 'A', text: 'immune' },
        { id: 'B', text: 'nervous' },
        { id: 'C', text: 'solar' },
        { id: 'D', text: 'digestive' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: immune system (hệ miễn dịch của cơ thể).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'The public transportation system in this smart city appears very ________.',
      options: [
        { id: 'A', text: 'efficiently' },
        { id: 'B', text: 'efficiency' },
        { id: 'C', text: 'efficient' },
        { id: 'D', text: 'more efficiently' }
      ],
      correct_option_id: 'C',
      explanation: 'ĐÁP ÁN C: efficient (sau linking verb "appears" cần một tính từ bổ nghĩa cho chủ ngữ).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'Antibiotics are completely ineffective against ________ illnesses like the seasonal flu.',
      options: [
        { id: 'A', text: 'viral' },
        { id: 'B', text: 'virus' },
        { id: 'C', text: 'virally' },
        { id: 'D', text: 'viruses' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: viral illnesses (các bệnh do vi-rút gây ra; trước danh từ "illnesses" cần tính từ).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'Green spaces and community parks contribute greatly to the ________ of modern smart cities.',
      options: [
        { id: 'A', text: 'sustainability' },
        { id: 'B', text: 'sustainable' },
        { id: 'C', text: 'sustain' },
        { id: 'D', text: 'sustainably' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: sustainability (sự bền vững; sau mạo từ "the" và giới từ "of" cần một danh từ).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'Conflicts between generations can arise due to differences in ________ between parents and teenagers.',
      options: [
        { id: 'A', text: 'viewpoints' },
        { id: 'B', text: 'viewings' },
        { id: 'C', text: 'viewers' },
        { id: 'D', text: 'visible' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: viewpoints (quan điểm, góc nhìn; differences in viewpoints = sự khác biệt về quan điểm).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'A balanced diet should provide sufficient ________ such as carbohydrates, proteins, and vitamins.',
      options: [
        { id: 'A', text: 'nutrients' },
        { id: 'B', text: 'nutrition' },
        { id: 'C', text: 'nutritious' },
        { id: 'D', text: 'nutritionally' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: nutrients (chất dinh dưỡng; danh từ số nhiều đếm được).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'Many elderly residents prefer herbal ________ to modern chemical pharmaceuticals for minor ailments.',
      options: [
        { id: 'A', text: 'remedies' },
        { id: 'B', text: 'sensors' },
        { id: 'C', text: 'curfews' },
        { id: 'D', text: 'conflicts' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: herbal remedies (các bài thuốc dân gian / phương thuốc từ thảo dược tự nhiên).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'The government plans to install intelligent traffic ________ to reduce congestion during peak hours.',
      options: [
        { id: 'A', text: 'sensors' },
        { id: 'B', text: 'muscles' },
        { id: 'C', text: 'pollutants' },
        { id: 'D', text: 'generations' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: traffic sensors (cảm biến giao thông thông minh).'
    }
  );

  // ==========================================
  // NHÓM 2: COLLOCATIONS & GIỚI TỪ (20 CÂU)
  // ==========================================
  // Từ website data.js collocations (16 câu)
  websiteData.QUESTIONS_DATA.collocations.forEach((q) => {
    rawQuestions.push({
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: q.question,
      options: formatOptions(q.options),
      correct_option_id: q.answerLetter,
      explanation: q.explanation || 'Đáp án đúng: ' + q.answerLetter
    });
  });

  // Từ practice test collocations (4 câu)
  rawQuestions.push(
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'Eating a lot of green vegetables and cutting down ________ fatty foods can prevent obesity.',
      options: [
        { id: 'A', text: 'on' },
        { id: 'B', text: 'in' },
        { id: 'C', text: 'of' },
        { id: 'D', text: 'with' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: cut down on (cụm động từ: cắt giảm cái gì; cut down on fatty foods = cắt giảm đồ ăn dầu mỡ).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'Teenagers often complain that their parents try to impose their career choices ________ them.',
      options: [
        { id: 'A', text: 'on' },
        { id: 'B', text: 'for' },
        { id: 'C', text: 'with' },
        { id: 'D', text: 'at' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: impose sth on sb (áp đặt điều gì lên ai; impose career choices on teenagers).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: "Many young people decide to follow in their parents' ________ and pursue business careers.",
      options: [
        { id: 'A', text: 'footsteps' },
        { id: 'B', text: 'pathways' },
        { id: 'C', text: 'footprints' },
        { id: 'D', text: 'steps' }
      ],
      correct_option_id: 'A',
      explanation: "ĐÁP ÁN A: follow in one's footsteps (thành ngữ: nối nghiệp, tiếp bước theo con đường của ai)."
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'vocab',
      sectionName: 'Từ vựng & Cụm từ',
      passage: null,
      content_markdown: 'You should exercise ________ to boost your immune system and physical endurance.',
      options: [
        { id: 'A', text: 'regularly' },
        { id: 'B', text: 'regular' },
        { id: 'C', text: 'regulation' },
        { id: 'D', text: 'regularity' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: regularly (bổ nghĩa cho động từ "exercise" cần một trạng từ chỉ tần suất: tập luyện thường xuyên).'
    }
  );

  // ==========================================
  // NHÓM 3: TỪ ĐỒNG NGHĨA & TRÁI NGHĨA (10 CÂU)
  // ==========================================
  rawQuestions.push(
    {
      type: 'MULTIPLE_CHOICE',
      section: 'synonym_antonym',
      sectionName: 'Đồng nghĩa & Trái nghĩa',
      passage: null,
      content_markdown: 'Mark the letter A, B, C, or D to indicate the word(s) CLOSEST in meaning to the underlined word:\n\nHigh-rise eco-friendly buildings will help improve the **LIVEABILITY** of future urban areas.',
      options: [
        { id: 'A', text: 'pollution condition' },
        { id: 'B', text: 'quality of life' },
        { id: 'C', text: 'traffic congestion' },
        { id: 'D', text: 'living cost' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: liveability (độ đáng sống của đô thị) = quality of life (chất lượng cuộc sống).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'synonym_antonym',
      sectionName: 'Đồng nghĩa & Trái nghĩa',
      passage: null,
      content_markdown: 'Mark the letter A, B, C, or D to indicate the word(s) CLOSEST in meaning to the underlined word:\n\nOlder family members are often **CONSERVATIVE** and prefer keeping long-standing traditions.',
      options: [
        { id: 'A', text: 'open-minded' },
        { id: 'B', text: 'modern' },
        { id: 'C', text: 'conventional' },
        { id: 'D', text: 'flexible' }
      ],
      correct_option_id: 'C',
      explanation: 'ĐÁP ÁN C: conservative (bảo thủ, theo lối truyền thống) = conventional (theo tập quán truyền thống, cổ điển).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'synonym_antonym',
      sectionName: 'Đồng nghĩa & Trái nghĩa',
      passage: null,
      content_markdown: 'Mark the letter A, B, C, or D to indicate the word(s) CLOSEST in meaning to the underlined word:\n\nA **NUTRITIOUS** breakfast provides vital energy for school students throughout the morning.',
      options: [
        { id: 'A', text: 'unhealthy' },
        { id: 'B', text: 'wholesome and nourishing' },
        { id: 'C', text: 'expensive' },
        { id: 'D', text: 'contaminated' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: nutritious (giàu dinh dưỡng, bổ dưỡng) = wholesome and nourishing (lành mạnh và bổ dưỡng).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'synonym_antonym',
      sectionName: 'Đồng nghĩa & Trái nghĩa',
      passage: null,
      content_markdown: 'Mark the letter A, B, C, or D to indicate the word(s) CLOSEST in meaning to the underlined word:\n\nCOVID-19 is a highly **INFECTIOUS** illness that can transmit rapidly through airborne droplets.',
      options: [
        { id: 'A', text: 'contagious' },
        { id: 'B', text: 'harmless' },
        { id: 'C', text: 'non-communicable' },
        { id: 'D', text: 'curable' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: infectious (lây nhiễm, truyền nhiễm) = contagious (dễ lây lan).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'synonym_antonym',
      sectionName: 'Đồng nghĩa & Trái nghĩa',
      passage: null,
      content_markdown: 'Mark the letter A, B, C, or D to indicate the word(s) CLOSEST in meaning to the underlined word:\n\nCity authorities strive to create **SUSTAINABLE** communities that preserve resources for future generations.',
      options: [
        { id: 'A', text: 'eco-friendly and lasting' },
        { id: 'B', text: 'temporary' },
        { id: 'C', text: 'polluting' },
        { id: 'D', text: 'wasteful' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: sustainable (bền vững, thân thiện với hệ sinh thái) = eco-friendly and lasting.'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'synonym_antonym',
      sectionName: 'Đồng nghĩa & Trái nghĩa',
      passage: null,
      content_markdown: 'Mark the letter A, B, C, or D to indicate the word(s) OPPOSITE in meaning to the underlined word:\n\nLiving in a clean, green environment can definitely **EXTEND** human life expectancy.',
      options: [
        { id: 'A', text: 'lengthen' },
        { id: 'B', text: 'shorten' },
        { id: 'C', text: 'develop' },
        { id: 'D', text: 'maintain' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: extend (kéo dài, gia tăng) >< shorten (rút ngắn lại).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'synonym_antonym',
      sectionName: 'Đồng nghĩa & Trái nghĩa',
      passage: null,
      content_markdown: 'Mark the letter A, B, C, or D to indicate the word(s) OPPOSITE in meaning to the underlined word:\n\nParents should be **OPEN-MINDED** when discussing career paths with their adolescent children.',
      options: [
        { id: 'A', text: 'broad-minded' },
        { id: 'B', text: 'tolerant' },
        { id: 'C', text: 'narrow-minded' },
        { id: 'D', text: 'supportive' }
      ],
      correct_option_id: 'C',
      explanation: 'ĐÁP ÁN C: open-minded (cởi mở, lắng nghe cái mới) >< narrow-minded (hẹp hòi, thiển cận, bảo thủ).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'synonym_antonym',
      sectionName: 'Đồng nghĩa & Trái nghĩa',
      passage: null,
      content_markdown: 'Mark the letter A, B, C, or D to indicate the word(s) OPPOSITE in meaning to the underlined word:\n\nSolar energy and wind energy are completely **RENEWABLE** resources available in nature.',
      options: [
        { id: 'A', text: 'inexhaustible' },
        { id: 'B', text: 'depletable and finite' },
        { id: 'C', text: 'sustainable' },
        { id: 'D', text: 'unlimited' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: renewable (có thể tái tạo vô tận) >< depletable and finite (hạn hẹp và có thể cạn kiệt).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'synonym_antonym',
      sectionName: 'Đồng nghĩa & Trái nghĩa',
      passage: null,
      content_markdown: 'Mark the letter A, B, C, or D to indicate the word(s) OPPOSITE in meaning to the underlined word:\n\nAdult children who move out to live on their own become financially **INDEPENDENT**.',
      options: [
        { id: 'A', text: 'self-reliant' },
        { id: 'B', text: 'reliant and dependent' },
        { id: 'C', text: 'autonomous' },
        { id: 'D', text: 'confident' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: independent (độc lập, tự chủ) >< reliant and dependent (phụ thuộc, dựa dẫm vào người khác).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'synonym_antonym',
      sectionName: 'Đồng nghĩa & Trái nghĩa',
      passage: null,
      content_markdown: 'Mark the letter A, B, C, or D to indicate the word(s) OPPOSITE in meaning to the underlined word:\n\nConsuming too much processed sugar and fast food is extremely **HARMFUL** to teen health.',
      options: [
        { id: 'A', text: 'damaging' },
        { id: 'B', text: 'destructive' },
        { id: 'C', text: 'beneficial' },
        { id: 'D', text: 'detrimental' }
      ],
      correct_option_id: 'C',
      explanation: 'ĐÁP ÁN C: harmful (có hại) >< beneficial (có lợi, tốt cho sức khỏe).'
    }
  );

  // ==========================================
  // NHÓM 4: NGỮ PHÁP TRỌNG TÂM (GRAMMAR & STRUCTURES)
  // ==========================================
  // Từ website data.js grammar (16 câu)
  websiteData.QUESTIONS_DATA.grammar.forEach((q) => {
    rawQuestions.push({
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: q.question,
      options: formatOptions(q.options),
      correct_option_id: q.answerLetter,
      explanation: q.explanation || 'Đáp án đúng: ' + q.answerLetter
    });
  });

  // Từ practice test grammar (7 câu)
  rawQuestions.push(
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'You ________ use your smartphone during the examination. It is strictly against the rules.',
      options: [
        { id: 'A', text: "don't have to" },
        { id: 'B', text: "shouldn't" },
        { id: 'C', text: "mustn't" },
        { id: 'D', text: 'might not' }
      ],
      correct_option_id: 'C',
      explanation: 'ĐÁP ÁN C: mustn\'t (dùng để diễn tả sự cấm đoán, vi phạm quy định nghiêm ngặt: strictly against the rules).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'I ________ wear a formal school uniform on weekdays because it is the official school regulation.',
      options: [
        { id: 'A', text: 'must' },
        { id: 'B', text: 'have to' },
        { id: 'C', text: 'should' },
        { id: 'D', text: 'ought to' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: have to (sự bắt buộc do hoàn cảnh / nội quy bên ngoài đặt ra: school regulation).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'Lan ________ to yoga classes since she recovered from her severe back injury.',
      options: [
        { id: 'A', text: 'went' },
        { id: 'B', text: 'goes' },
        { id: 'C', text: 'has gone' },
        { id: 'D', text: 'was going' }
      ],
      correct_option_id: 'C',
      explanation: 'ĐÁP ÁN C: has gone (chia thì Hiện tại hoàn thành đi kèm mệnh đề thời gian "since + QKĐ").'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'Dr. Evans ________ his medical research paper on infectious viruses two weeks ago.',
      options: [
        { id: 'A', text: 'published' },
        { id: 'B', text: 'has published' },
        { id: 'C', text: 'publishes' },
        { id: 'D', text: 'was publishing' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: published (chia thì Quá khứ đơn vì có mốc thời gian rõ ràng trong quá khứ: "two weeks ago").'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'This mushroom soup ________ delicious! Did you make it yourself?',
      options: [
        { id: 'A', text: 'is tasting' },
        { id: 'B', text: 'tastes' },
        { id: 'C', text: 'taste' },
        { id: 'D', text: 'tasted' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: tastes (động từ nối / linking verb chỉ cảm giác giác quan: nếm có vị thế nào + tính từ, không chia tiếp diễn).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'The scientists are ________ about using artificial intelligence to control smart city sensors.',
      options: [
        { id: 'A', text: 'thinking' },
        { id: 'B', text: 'think' },
        { id: 'C', text: 'thought' },
        { id: 'D', text: 'thinks' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: thinking (động từ hành động: đang suy nghĩ/cân nhắc về việc gì, được chia ở thì tiếp diễn: are thinking about).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'My grandfather ________ up smoking five years ago, and his lung health has improved significantly.',
      options: [
        { id: 'A', text: 'gave' },
        { id: 'B', text: 'has given' },
        { id: 'C', text: 'gives' },
        { id: 'D', text: 'is giving' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: gave (chia Quá khứ đơn vì có "five years ago").'
    }
  );

  // Từ practice test Sentence Transformation (Chuyển thành trắc nghiệm chuẩn THPT - 6 câu)
  rawQuestions.push(
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'Choose the sentence that best rewrites the original sentence:\n\n*The last time my grandfather had a comprehensive health check-up was two years ago.*',
      options: [
        { id: 'A', text: "My grandfather hasn't had a comprehensive health check-up for two years." },
        { id: 'B', text: "My grandfather hasn't had a comprehensive health check-up since two years." },
        { id: 'C', text: "My grandfather didn't have a comprehensive health check-up for two years ago." },
        { id: 'D', text: 'My grandfather has had a comprehensive health check-up for two years.' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: Cấu trúc: The last time + S + V2/ed + was + time + ago => S + haven\'t/hasn\'t + V3/ed + for + time.'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'Choose the sentence that best rewrites the original sentence:\n\n*It is mandatory for students to submit their assignment on generation gaps before Friday.*',
      options: [
        { id: 'A', text: 'Students have to submit their assignment on generation gaps before Friday.' },
        { id: 'B', text: "Students shouldn't submit their assignment on generation gaps before Friday." },
        { id: 'C', text: "Students don't have to submit their assignment on generation gaps before Friday." },
        { id: 'D', text: "Students mustn't submit their assignment on generation gaps before Friday." }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: It is mandatory for sb to do sth => S + have to + V-bare (bắt buộc theo quy định).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'Choose the sentence that best rewrites the original sentence:\n\n*It is strictly forbidden to park your vehicle in pedestrian-only areas.*',
      options: [
        { id: 'A', text: "You mustn't park your vehicle in pedestrian-only areas." },
        { id: 'B', text: "You don't have to park your vehicle in pedestrian-only areas." },
        { id: 'C', text: 'You should park your vehicle in pedestrian-only areas.' },
        { id: 'D', text: 'You ought to park your vehicle in pedestrian-only areas.' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: It is forbidden to do sth => S + mustn\'t + V-bare (cấm đoán).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'Choose the sentence that best rewrites the original sentence:\n\n*It is advisable for teenagers to talk openly with their parents about academic stress.*',
      options: [
        { id: 'A', text: 'Teenagers should talk openly with their parents about academic stress.' },
        { id: 'B', text: 'Teenagers have to talk openly with their parents about academic stress.' },
        { id: 'C', text: "Teenagers mustn't talk openly with their parents about academic stress." },
        { id: 'D', text: "Teenagers don't have to talk openly with their parents about academic stress." }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: It is advisable for sb to do sth => S + should + V-bare (lời khuyên nên làm gì).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'Choose the sentence that best rewrites the original sentence:\n\n*She started adopting a sugar-free nutritious diet three months ago.*',
      options: [
        { id: 'A', text: 'She has adopted a sugar-free nutritious diet for three months.' },
        { id: 'B', text: "She hasn't adopted a sugar-free nutritious diet since three months." },
        { id: 'C', text: 'She adopted a sugar-free nutritious diet for three months ago.' },
        { id: 'D', text: 'She has started adopting a sugar-free nutritious diet since three months ago.' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: S + started + V-ing + time + ago => S + have/has + V3/ed + for + time.'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'Choose the sentence that best rewrites the original sentence:\n\n*"I think the public electric buses in this city are very comfortable," said Minh.*',
      options: [
        { id: 'A', text: "Minh thinks the city's public electric buses look comfortable." },
        { id: 'B', text: "Minh thinks the city's public electric buses look comfortably." },
        { id: 'C', text: "Minh thinks the city's public electric buses are looking comfortably." },
        { id: 'D', text: "Minh thinks the city's public electric buses sound comfortable." }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: Quy tắc linking verb: look + adjective (trông có vẻ thế nào), không dùng trạng từ "comfortably".'
    }
  );

  // Thêm 2 câu ngữ pháp chọn lọc nữa để tròn 31 câu ngữ pháp
  rawQuestions.push(
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'Since the local government invested in solar panels, our neighborhood ________ 40% on monthly electricity bills.',
      options: [
        { id: 'A', text: 'saved' },
        { id: 'B', text: 'has saved' },
        { id: 'C', text: 'saves' },
        { id: 'D', text: 'was saving' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: has saved (Mệnh đề chính đi với "Since + QKĐ" phải chia ở thì Hiện tại hoàn thành).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'grammar',
      sectionName: 'Ngữ pháp Trọng tâm',
      passage: null,
      content_markdown: 'You ________ take your umbrella today; the weather forecast says it will remain bright and sunny all afternoon.',
      options: [
        { id: 'A', text: "mustn't" },
        { id: 'B', text: "don't have to" },
        { id: 'C', text: 'should' },
        { id: 'D', text: 'ought not to' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: don\'t have to (không cần thiết phải làm gì; trời nắng nên không cần mang dù).'
    }
  );

  // ==========================================
  // NHÓM 5: SẮP XẾP HỘI THOẠI (DIALOGUES - 6 CÂU)
  // ==========================================
  websiteData.QUESTIONS_DATA.dialogues.forEach((d) => {
    rawQuestions.push({
      type: 'MULTIPLE_CHOICE',
      section: 'reading_cloze',
      sectionName: 'Đọc hiểu & Hội thoại',
      passage: null,
      content_markdown: d.question + '\n\n' + d.sentences.join('\n'),
      options: formatOptions(d.options),
      correct_option_id: d.answerLetter,
      explanation: d.explanation || 'Đáp án đúng: ' + d.answerLetter
    });
  });

  // ==========================================
  // NHÓM 6: ĐỌC HIỂU & ĐIỀN TỪ (CLOZE & READING - 9 CÂU)
  // ==========================================
  // Cloze text từ practice test: Cities of the Future (5 câu)
  const futureCityPassage = `CITIES OF THE FUTURE\n\nCities of the future will be significantly different from those of today. With the integration of modern AI and IoT (Internet of Things) devices, urban areas will become much smarter and more eco-friendly. Smart streetlights and traffic sensors will monitor road conditions in real-time, reducing traffic jams and emissions. Furthermore, city planners are focusing on creating more pedestrian zones where people can safely walk or cycle. Renewable energy sources, such as solar panels and wind turbines, will be heavily installed to replace fossil fuels. These technological developments not only reduce our carbon footprint, but also make urban life healthier and more sustainable. Over the last few decades, many countries have started investing billions of dollars into making these smart cities a reality.`;

  rawQuestions.push(
    {
      type: 'MULTIPLE_CHOICE',
      section: 'reading_cloze',
      sectionName: 'Đọc hiểu & Điền từ',
      passage: futureCityPassage,
      content_markdown: 'Smart streetlights and traffic (30) ________ will monitor road conditions in real-time, reducing traffic jams and emissions.',
      options: [
        { id: 'A', text: 'sensors' },
        { id: 'B', text: 'obstacles' },
        { id: 'C', text: 'organisms' },
        { id: 'D', text: 'burdens' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: traffic sensors (cảm biến giao thông thông minh).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'reading_cloze',
      sectionName: 'Đọc hiểu & Điền từ',
      passage: futureCityPassage,
      content_markdown: 'Furthermore, city planners are focusing on creating more pedestrian (31) ________ where people can safely walk or cycle.',
      options: [
        { id: 'A', text: 'zones' },
        { id: 'B', text: 'limits' },
        { id: 'C', text: 'footsteps' },
        { id: 'D', text: 'footprints' }
      ],
      correct_option_id: 'A',
      explanation: 'ĐÁP ÁN A: pedestrian zones (khu vực / tuyến phố đi bộ).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'reading_cloze',
      sectionName: 'Đọc hiểu & Điền từ',
      passage: futureCityPassage,
      content_markdown: 'Renewable energy sources, such as solar panels and wind turbines, will be (32) ________ installed to replace fossil fuels.',
      options: [
        { id: 'A', text: 'heavy' },
        { id: 'B', text: 'heavily' },
        { id: 'C', text: 'heaviness' },
        { id: 'D', text: 'heavier' }
      ],
      correct_option_id: 'B',
      explanation: 'ĐÁP ÁN B: heavily (trạng từ "heavily" bổ nghĩa cho động từ phân từ hai "installed").'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'reading_cloze',
      sectionName: 'Đọc hiểu & Điền từ',
      passage: futureCityPassage,
      content_markdown: 'These technological developments not only reduce our carbon (33) ________, but also make urban life healthier.',
      options: [
        { id: 'A', text: 'print' },
        { id: 'B', text: 'mark' },
        { id: 'C', text: 'footprint' },
        { id: 'D', text: 'gas' }
      ],
      correct_option_id: 'C',
      explanation: 'ĐÁP ÁN C: carbon footprint (cụm danh từ: lượng phát thải carbon / dấu chân carbon).'
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'reading_cloze',
      sectionName: 'Đọc hiểu & Điền từ',
      passage: futureCityPassage,
      content_markdown: 'Over the last few decades, many countries (34) ________ investing billions of dollars into making these smart cities a reality.',
      options: [
        { id: 'A', text: 'start' },
        { id: 'B', text: 'started' },
        { id: 'C', text: 'have started' },
        { id: 'D', text: 'are starting' }
      ],
      correct_option_id: 'C',
      explanation: 'ĐÁP ÁN C: have started (dấu hiệu thời gian "Over the last few decades" chia thì Hiện tại hoàn thành).'
    }
  );

  // Announcement Cloze từ data.js (4 câu)
  const annPassage = `ANNOUNCEMENT: WORKSHOP ON TEEN HEALTH & LONGEVITY\n\nAll students are invited to join our interactive workshop to learn how to prevent infectious diseases and maintain a balanced diet. Remember that participants must bring their student identity cards for entry check-in. If you want to know more, please contact Mr. Nam at the main health counseling office before this Friday. Everyone attending will receive free guides on how to build up their immune system.`;

  rawQuestions.push(
    {
      type: 'MULTIPLE_CHOICE',
      section: 'reading_cloze',
      sectionName: 'Đọc hiểu & Điền từ',
      passage: annPassage,
      content_markdown: 'All students are invited to join our interactive workshop to learn how to prevent infectious diseases and maintain (1)________ balanced diet.',
      options: [
        { id: 'A', text: 'a' },
        { id: 'B', text: 'an' },
        { id: 'C', text: 'the' },
        { id: 'D', text: 'Ø' }
      ],
      correct_option_id: 'A',
      explanation: "ĐÁP ÁN A: a balanced diet (cụm danh từ số ít, 'balanced' bắt đầu bằng phụ âm nên dùng 'a')."
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'reading_cloze',
      sectionName: 'Đọc hiểu & Điền từ',
      passage: annPassage,
      content_markdown: 'Remember that participants (2)________ bring their student identity cards for entry check-in.',
      options: [
        { id: 'A', text: 'should' },
        { id: 'B', text: 'must' },
        { id: 'C', text: "shouldn't" },
        { id: 'D', text: 'ought' }
      ],
      correct_option_id: 'B',
      explanation: "ĐÁP ÁN B: must (yêu cầu bắt buộc của ban tổ chức hội thảo)."
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'reading_cloze',
      sectionName: 'Đọc hiểu & Điền từ',
      passage: annPassage,
      content_markdown: 'If you want to know more, please contact Mr. Nam (3)________ the main health counseling office.',
      options: [
        { id: 'A', text: 'on' },
        { id: 'B', text: 'at' },
        { id: 'C', text: 'for' },
        { id: 'D', text: 'with' }
      ],
      correct_option_id: 'B',
      explanation: "ĐÁP ÁN B: at (giới từ chỉ địa điểm phòng ban cụ thể: at the main office)."
    },
    {
      type: 'MULTIPLE_CHOICE',
      section: 'reading_cloze',
      sectionName: 'Đọc hiểu & Điền từ',
      passage: annPassage,
      content_markdown: 'Everyone attending will receive free guides on how to build up their (4)________ system.',
      options: [
        { id: 'A', text: 'immune' },
        { id: 'B', text: 'infectious' },
        { id: 'C', text: 'curfew' },
        { id: 'D', text: 'pollutant' }
      ],
      correct_option_id: 'A',
      explanation: "ĐÁP ÁN A: immune system (hệ miễn dịch)."
    }
  );

  console.log(`\n📊 Tổng số câu hỏi đã chuẩn bị: ${rawQuestions.length} câu.`);

  // 3. Tạo hoặc tìm Learning Unit
  const targetDate = new Date('2026-10-29T00:00:00.000Z');

  // Xóa assignment cũ nếu đã tồn tại cho ngày 29/10 để đảm bảo idempotency
  const existingAsgn = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: thai.id,
      assigned_date: targetDate
    },
    include: {
      assessment_attempts: true
    }
  });

  if (existingAsgn) {
    console.log('⚠️ Phát hiện assignment cũ ngày 29/10/2026, đang dọn dẹp để ghi mới...');
    for (const att of existingAsgn.assessment_attempts) {
      await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
      await prisma.assessment_attempts.delete({ where: { id: att.id } });
    }
    await prisma.daily_student_assignments.delete({ where: { id: existingAsgn.id } });
    console.log('✓ Đã xóa assignment cũ.');
  }

  // Tạo Learning Unit mới
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: subject.id,
      created_by: teacher.id,
      title: 'Ôn tập thi giữa kì',
      description: 'Tổng ôn toàn diện Từ vựng & Ngữ pháp trọng tâm Giữa kì 1 Tiếng Anh 11 Global Success (Unit 1: Health, Unit 2: Generation Gap, Unit 3: Smart Cities).',
      lecture_content_markdown: `# 📖 Ôn tập thi giữa kì 1 - Tiếng Anh 11\n\n*Nội dung bài giảng và tài liệu tóm tắt sẽ được Thầy Thức cập nhật trực tiếp trong buổi học tối nay.*`,
      lecture_attachments: [],
      is_template: true
    }
  });
  console.log('✓ Đã tạo Learning Unit:', learningUnit.title, learningUnit.id);

  // Tạo Assessment (100 câu trắc nghiệm tại lớp, 90 phút)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      type: 'IN_SESSION_90M',
      title: 'Luyện tập tại lớp: Đề ôn thi Giữa kì 1 - Trọng tâm Từ vựng & Ngữ pháp (100 câu)',
      instructions: 'Đề thi 90 phút gồm 100 câu hỏi trắc nghiệm trọng tâm Từ vựng & Ngữ pháp Unit 1 - Unit 3. Học sinh chọn đáp án đúng A, B, C hoặc D.',
      time_limit_minutes: 90,
      max_score: 10.00
    }
  });
  console.log('✓ Đã tạo Assessment:', assessment.title, assessment.id);

  // Thêm 100 câu hỏi vào Assessment
  const final100 = rawQuestions.slice(0, 100);
  const questionsData = final100.map((q, idx) => ({
    assessment_id: assessment.id,
    order_index: idx + 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.10,
    question_payload: {
      content_markdown: q.content_markdown,
      options: q.options,
      section: q.section,
      sectionName: q.sectionName,
      passage: q.passage || null,
      explanation: q.explanation
    },
    grading_key_payload: {
      correct_option_id: q.correct_option_id,
      explanation: q.explanation
    }
  }));

  const createdQuestions = await prisma.questions.createMany({
    data: questionsData
  });
  console.log(`✓ Đã nạp thành công ${createdQuestions.count} câu hỏi vào Assessment.`);

  // Tạo Daily Student Assignment cho bạn Thái vào ngày 29/10/2026
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: thai.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 90,
      homework_due_at: null,
      teacher_daily_note: 'Tối nay con tập trung làm bài ôn tập giữa kì 1: tập trung tối đa vào phần từ vựng và ngữ pháp trọng tâm 3 Unit đầu nhé!',
      is_published: true
    }
  });
  console.log('✓ Đã tạo Daily Assignment cho Thái:', assignment.id, 'ngày 29/10/2026');

  // Tạo Assessment Attempt
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: thai.id,
      status: 'NOT_STARTED'
    }
  });
  console.log('✓ Đã tạo Assessment Attempt:', attempt.id, 'trạng thái NOT_STARTED');

  console.log('\n🎉 HOÀN TẤT THIẾT LẬP THÀNH CÔNG CHO BẠN THÁI NGÀY 29/10/2026!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('❌ Lỗi:', e);
    prisma.$disconnect();
    process.exit(1);
  });
