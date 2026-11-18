const fs = require('fs');
const path = require('path');

const UNIT7_WORDS = [
  'leaflet', 'billboard', 'advert', 'printing press', 'target customer',
  'presence', 'interactive', 'accessible', 'distribute', 'instant',
  'fake news', 'fact-check', 'credible', 'viewer', 'audiovisual',
  'here to stay', 'literacy', 'account for', 'as opposed to', 'reluctant',
  'mass media', 'the press', 'broadcast', 'commercial', 'publicity'
];

// Helper to check unit words count
function countUnitWords(options) {
  let count = 0;
  for (const opt of options) {
    const textLower = opt.text.toLowerCase();
    for (const w of UNIT7_WORDS) {
      if (textLower.includes(w)) {
        count++;
        break;
      }
    }
  }
  return count;
}

const questions = [
  // ==========================================
  // PART 1: CORE VOCABULARY IN CONTEXT (Q1 - Q32)
  // ==========================================
  {
    orderIndex: 1,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Volunteers stood near the school gate to hand out colorful ______ to parents and students.",
    options: [
      { id: "A", text: "leaflets" },
      { id: "B", text: "billboards" },
      { id: "C", text: "viewers" },
      { id: "D", text: "editors" }
    ],
    correctAnswer: "A",
    explanation: "• 'leaflets' (n): tờ rơi (ấn phẩm giấy nhỏ dùng để phát tận tay người đi đường).\n• 'billboards' (n): biển quảng cáo ngoài trời khổ lớn.\n• 'viewers' (n): khán giả truyền hình.\n➔ Dùng tay phát cho phụ huynh và học sinh tại cổng trường chọn 'leaflets'."
  },
  {
    orderIndex: 2,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Drivers can easily see the bright digital ______ placed along the busy highway.",
    options: [
      { id: "A", text: "leaflet" },
      { id: "B", text: "literacy" },
      { id: "C", text: "billboard" },
      { id: "D", text: "viewer" }
    ],
    correctAnswer: "C",
    explanation: "• 'digital billboard' (n): biển quảng cáo kỹ thuật số cỡ lớn bên đường cao tốc.\n• 'leaflet' (n): tờ rơi nhỏ.\n• 'literacy' (n): sự biết chữ.\n• 'viewer' (n): người xem."
  },
  {
    orderIndex: 3,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "The charity club decided to place an ______ in the local newspaper to invite people to their event.",
    options: [
      { id: "A", text: "audience" },
      { id: "B", text: "advert" },
      { id: "C", text: "billboard" },
      { id: "D", text: "presence" }
    ],
    correctAnswer: "B",
    explanation: "• Cụm từ cố định chuẩn SGK trang 88 & SBT trang 82: 'place an advert in a newspaper' (đăng một mẩu quảng cáo trên báo).\n• 'advert' (n) = advertisement (mẩu quảng cáo)."
  },
  {
    orderIndex: 4,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Gutenberg's invention of the ______ in 1453 made books cheaper and easier to produce.",
    options: [
      { id: "A", text: "target customer" },
      { id: "B", text: "digital media" },
      { id: "C", text: "social platform" },
      { id: "D", text: "printing press" }
    ],
    correctAnswer: "D",
    explanation: "• 'printing press' (n. phr.): máy in cơ học (phát minh lịch sử của Gutenberg năm 1453 giúp sách báo in ấn rẻ hơn - SBT trang 86).\n• Các đáp án A, B, C không phù hợp ngữ cảnh lịch sử năm 1453."
  },
  {
    orderIndex: 5,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "The shop conducted an online survey to better understand the needs of their ______ .",
    options: [
      { id: "A", text: "target customers" },
      { id: "B", text: "printing presses" },
      { id: "C", text: "fake news" },
      { id: "D", text: "billboards" }
    ],
    correctAnswer: "A",
    explanation: "• 'target customers' (n. phr.): khách hàng mục tiêu (SGK trang 92: 'reach its target customers easily').\n• Cửa hàng khảo sát trực tuyến để hiểu nhu cầu của khách hàng mục tiêu."
  },
  {
    orderIndex: 6,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "If you want young people to know your brand, you must build an active social media ______ .",
    options: [
      { id: "A", text: "leaflet" },
      { id: "B", text: "viewer" },
      { id: "C", text: "presence" },
      { id: "D", text: "advert" }
    ],
    correctAnswer: "C",
    explanation: "• Cụm từ chuẩn SGK trang 89 & SBT trang 82: 'social media presence' (sự hiện diện, tầm ảnh hưởng trên mạng xã hội).\n• 'build a social media presence' = xây dựng độ phủ sóng trên mạng xã hội."
  },
  {
    orderIndex: 7,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Online learning apps are very ______ because students can ask questions and receive instant answers.",
    options: [
      { id: "A", text: "reluctant" },
      { id: "B", text: "interactive" },
      { id: "C", text: "audiovisual" },
      { id: "D", text: "accessible" }
    ],
    correctAnswer: "B",
    explanation: "• 'interactive' (adj): có tính tương tác hai chiều (SGK trang 92 & SBT trang 82).\n• Học sinh hỏi và nhận câu trả lời ngay lập tức thể hiện tính tương tác."
  },
  {
    orderIndex: 8,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Thanks to smart mobile devices, daily news is now readily ______ to anyone with Internet access.",
    options: [
      { id: "A", text: "reluctant" },
      { id: "B", text: "fake news" },
      { id: "C", text: "interactive" },
      { id: "D", text: "accessible" }
    ],
    correctAnswer: "D",
    explanation: "• 'accessible' (adj): dễ tiếp cận, có thể truy cập được (SGK trang 92 & SBT trang 83: 'accessible to everyone').\n• Đi với cấu trúc: 'readily accessible to sb' (dễ dàng tiếp cận với ai)."
  },
  {
    orderIndex: 9,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Can you help me ______ these leaflets to people at the local bus stop?",
    options: [
      { id: "A", text: "distribute" },
      { id: "B", text: "fact-check" },
      { id: "C", text: "account for" },
      { id: "D", text: "promote" }
    ],
    correctAnswer: "A",
    explanation: "• 'distribute' (v): phân phát, phân phối (SBT trang 82 câu 13: 'Can you help me distribute these leaflets...').\n• Cụm từ: 'distribute leaflets' = phát tờ rơi."
  },
  {
    orderIndex: 10,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Social platforms give users ______ access to breaking news from all over the world.",
    options: [
      { id: "A", text: "reluctant" },
      { id: "B", text: "audiovisual" },
      { id: "C", text: "instant" },
      { id: "D", text: "interactive" }
    ],
    correctAnswer: "C",
    explanation: "• Cụm từ chuẩn SBT trang 82 câu 6: 'instant access to news' (sự tiếp cận tức thì với tin tức).\n• 'instant' (adj) = ngay lập tức, tức thì."
  },
  {
    orderIndex: 11,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "People should not share shocking stories online without checking because they might be ______ .",
    options: [
      { id: "A", text: "target customers" },
      { id: "B", text: "fake news" },
      { id: "C", text: "printing presses" },
      { id: "D", text: "leaflets" }
    ],
    correctAnswer: "B",
    explanation: "• 'fake news' (n. phr.): tin tức giả mạo, tin bịa đặt sai sự thật (SGK trang 90, 95; SBT trang 82 câu 12).\n• Không nên chia sẻ câu chuyện giật gân vì có thể là tin giả."
  },
  {
    orderIndex: 12,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Professional journalists must always ______ their facts before publishing an article.",
    options: [
      { id: "A", text: "distribute" },
      { id: "B", text: "account for" },
      { id: "C", text: "have presence" },
      { id: "D", text: "fact-check" }
    ],
    correctAnswer: "D",
    explanation: "• 'fact-check' (v): kiểm chứng sự thật, xác minh tính xác thực (SGK trang 92: 'reliable sources that are fact-checked').\n• Nhà báo phải kiểm chứng sự thật trước khi xuất bản."
  },
  {
    orderIndex: 13,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Many readers still trust printed newspapers because they consider them a more ______ source of news.",
    options: [
      { id: "A", text: "credible" },
      { id: "B", text: "instant" },
      { id: "C", text: "reluctant" },
      { id: "D", text: "fake news" }
    ],
    correctAnswer: "A",
    explanation: "• 'credible' (adj): đáng tin cậy, có cơ sở xác thực (SGK trang 92 & SBT trang 83 câu 6: 'a more credible source of news').\n• Đồng nghĩa với 'reliable / trustworthy'."
  },
  {
    orderIndex: 14,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Millions of television ______ tuned in to watch the live international sports game last night.",
    options: [
      { id: "A", text: "billboards" },
      { id: "B", text: "leaflets" },
      { id: "C", text: "viewers" },
      { id: "D", text: "presences" }
    ],
    correctAnswer: "C",
    explanation: "• Cụm từ chuẩn SBT trang 82 câu 5: 'television viewers' (khán giả xem truyền hình).\n• 'Millions of TV viewers' = hàng triệu khán giả truyền hình."
  },
  {
    orderIndex: 15,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Television quickly became popular because it combines both audio and visual elements in an ______ show.",
    options: [
      { id: "A", text: "accessible" },
      { id: "B", text: "audiovisual" },
      { id: "C", text: "reluctant" },
      { id: "D", text: "instant" }
    ],
    correctAnswer: "B",
    explanation: "• 'audiovisual' (adj): thuộc nghe nhìn (kết hợp âm thanh và hình ảnh - SBT trang 82 câu 2 & trang 86: 'audiovisual presentation').\n• Truyền hình kết hợp cả âm thanh và hình ảnh nên là phương tiện audiovisual."
  },
  {
    orderIndex: 16,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Even though many people read news online, printed books and newspapers are definitely ______ .",
    options: [
      { id: "A", text: "fake news" },
      { id: "B", text: "out of date" },
      { id: "C", text: "in leaflets" },
      { id: "D", text: "here to stay" }
    ],
    correctAnswer: "D",
    explanation: "• Cụm thành ngữ chuẩn SGK trang 92: 'here to stay' (tồn tại lâu dài, đã trở thành một phần quen thuộc của cuộc sống).\n• Dù báo mạng phát triển, báo in truyền thống vẫn 'here to stay'."
  },
  {
    orderIndex: 17,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "The creation of printed books helped promote ______ by helping more ordinary people learn to read.",
    options: [
      { id: "A", text: "literacy" },
      { id: "B", text: "presence" },
      { id: "C", text: "billboard" },
      { id: "D", text: "leaflet" }
    ],
    correctAnswer: "A",
    explanation: "• Cụm từ chuẩn SBT trang 86: 'promoted literacy in Europe' (thúc đẩy trình độ biết chữ, khả năng đọc viết).\n• 'literacy' (n): sự biết đọc biết viết."
  },
  {
    orderIndex: 18,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Young adults ______ more than seventy percent of all daily users on this social network.",
    options: [
      { id: "A", text: "fact-check" },
      { id: "B", text: "distribute" },
      { id: "C", text: "account for" },
      { id: "D", text: "look for" }
    ],
    correctAnswer: "C",
    explanation: "• Cụm động từ chuẩn SBT trang 82 câu 1 & trang 87: 'account for + số phần trăm' (chiếm bao nhiêu phần trăm).\n• 'account for more than seventy percent' = chiếm hơn 70%."
  },
  {
    orderIndex: 19,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "My grandmother still enjoys reading printed books ______ reading text on a bright computer screen.",
    options: [
      { id: "A", text: "in addition to leaflets" },
      { id: "B", text: "as opposed to" },
      { id: "C", text: "because of fake news" },
      { id: "D", text: "so as to view adverts" }
    ],
    correctAnswer: "B",
    explanation: "• Cụm từ chuẩn SGK trang 96 & SBT trang 82 câu 11: 'as opposed to' (thay vì, trái ngược với).\n• Bà thích đọc sách in thay vì (as opposed to) đọc trên màn hình máy tính."
  },
  {
    orderIndex: 20,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Some elderly citizens are ______ to use online banking because they worry about losing their money.",
    options: [
      { id: "A", text: "accessible" },
      { id: "B", text: "interactive" },
      { id: "C", text: "credible" },
      { id: "D", text: "reluctant" }
    ],
    correctAnswer: "D",
    explanation: "• Cấu trúc chuẩn SBT trang 91 câu 8: 'reluctant to do sth' (ngần ngại, miễn cưỡng, không sẵn lòng làm gì).\n• Một số người cao tuổi ngần ngại dùng ngân hàng số."
  },
  {
    orderIndex: 21,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "The charity group decided to *place an ______* in the town newspaper to ask for warm clothes.",
    options: [
      { id: "A", text: "advert" },
      { id: "B", text: "presence" },
      { id: "C", text: "leaflet" },
      { id: "D", text: "billboard" }
    ],
    correctAnswer: "A",
    explanation: "• Collocation chuẩn SGK trang 88: 'place an advert in a newspaper' (đăng mẩu quảng cáo trên báo).\n• Ta không dùng 'place a presence / place a leaflet' trong ngữ cảnh đăng báo."
  },
  {
    orderIndex: 22,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "The shop owner worked hard every day to *build a strong social media ______* for her bakery.",
    options: [
      { id: "A", text: "printing press" },
      { id: "B", text: "billboard" },
      { id: "C", text: "presence" },
      { id: "D", text: "viewer" }
    ],
    correctAnswer: "C",
    explanation: "• Collocation chuẩn SBT trang 82 câu 14: 'build a social media presence' (xây dựng sự hiện diện, danh tiếng trên mạng xã hội)."
  },
  {
    orderIndex: 23,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "The teacher asked the class to help *______ informative leaflets* about saving clean water to nearby houses.",
    options: [
      { id: "A", text: "fact-check" },
      { id: "B", text: "distribute" },
      { id: "C", text: "account for" },
      { id: "D", text: "view" }
    ],
    correctAnswer: "B",
    explanation: "• Collocation chuẩn SBT trang 82 câu 13: 'distribute leaflets' (phát tờ rơi cho mọi người)."
  },
  {
    orderIndex: 24,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "You should always *______ online stories* carefully before you click the share button on Facebook.",
    options: [
      { id: "A", text: "distribute" },
      { id: "B", text: "print" },
      { id: "C", text: "view" },
      { id: "D", text: "fact-check" }
    ],
    correctAnswer: "D",
    explanation: "• Collocation chuẩn SGK trang 92: 'fact-check online stories' (kiểm chứng các câu chuyện trên mạng trước khi chia sẻ)."
  },
  {
    orderIndex: 25,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "CLOSEST in meaning: The health article comes from a **credible** source of medical information.",
    options: [
      { id: "A", text: "reliable" },
      { id: "B", text: "fake news" },
      { id: "C", text: "reluctant" },
      { id: "D", text: "interactive" }
    ],
    correctAnswer: "A",
    explanation: "• 'credible' (adj) = 'reliable' (đáng tin cậy, có thật - SBT trang 83 câu 6).\n• 'fake news' = tin giả; 'reluctant' = do dự; 'interactive' = tương tác."
  },
  {
    orderIndex: 26,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "CLOSEST in meaning: The Internet provides **instant** news updates to smartphone users.",
    options: [
      { id: "A", text: "slow" },
      { id: "B", text: "reluctant" },
      { id: "C", text: "immediate" },
      { id: "D", text: "audiovisual" }
    ],
    correctAnswer: "C",
    explanation: "• 'instant' (adj) = 'immediate' (ngay lập tức, tức thì).\n• 'slow' = chậm chạp; 'reluctant' = ngần ngại."
  },
  {
    orderIndex: 27,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Online learning materials on this digital school website are freely ______ to all students.",
    options: [
      { id: "A", text: "reluctant" },
      { id: "B", text: "accessible" },
      { id: "C", text: "audiovisual" },
      { id: "D", text: "fake" }
    ],
    correctAnswer: "B",
    explanation: "• 'accessible' (adj) = dễ tiếp cận, có thể truy cập được (SGK trang 92 & SBT trang 83 câu 2: 'accessible to all students')."
  },
  {
    orderIndex: 28,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Many older citizens are still ______ to use smartphone banking apps because they fear losing money.",
    options: [
      { id: "A", text: "interactive" },
      { id: "B", text: "credible" },
      { id: "C", text: "instant" },
      { id: "D", text: "reluctant" }
    ],
    correctAnswer: "D",
    explanation: "• 'reluctant' (adj): ngần ngại, e dè, không sẵn lòng làm gì (SBT trang 91 câu 8: 'reluctant to change')."
  },
  {
    orderIndex: 29,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "The shocking video about the storm was completely ______ , so the platform decided to take it down.",
    options: [
      { id: "A", text: "fake news" },
      { id: "B", text: "accessible" },
      { id: "C", text: "credible" },
      { id: "D", text: "instant" }
    ],
    correctAnswer: "A",
    explanation: "• 'fake news' (n. phr.): tin tức giả mạo, tin bịa đặt sai sự thật (SGK trang 90, 95; SBT trang 82 câu 12)."
  },
  {
    orderIndex: 30,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "The company put up an enormous ______ on top of the tall building near the main bridge.",
    options: [
      { id: "A", text: "leaflet" },
      { id: "B", text: "viewer" },
      { id: "C", text: "billboard" },
      { id: "D", text: "presence" }
    ],
    correctAnswer: "C",
    explanation: "• 'billboard' (n): biển quảng cáo ngoài trời khổ lớn (SBT trang 82 câu 9).\n• Đặt trên đỉnh tòa nhà cao tầng gần cầu thì chỉ có thể là biển quảng cáo 'billboard'."
  },
  {
    orderIndex: 31,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "The football final match attracted more than ten million ______ on live television.",
    options: [
      { id: "A", text: "leaflets" },
      { id: "B", text: "viewers" },
      { id: "C", text: "printing presses" },
      { id: "D", text: "billboards" }
    ],
    correctAnswer: "B",
    explanation: "• 'viewers' (n): khán giả truyền hình (SBT trang 82 câu 5: 'Millions of TV viewers are tuning in...')."
  },
  {
    orderIndex: 32,
    sectionName: "1. Từ Vựng Trọng Tâm Unit 7 (Vocabulary in Context)",
    content: "Online news sites are very ______ because readers can vote in polls and leave comments immediately.",
    options: [
      { id: "A", text: "reluctant" },
      { id: "B", text: "credible" },
      { id: "C", text: "instant" },
      { id: "D", text: "interactive" }
    ],
    correctAnswer: "D",
    explanation: "• 'interactive' (adj): có tính tương tác hai chiều (SGK trang 92: 'digital media forms are more interactive').\n• Độc giả có thể bình luận và bình chọn thể hiện tính 'interactive'."
  },

  // ==========================================
  // PART 2: WORD FORMATION (Q33 - Q50: 18 câu)
  // ==========================================
  {
    orderIndex: 33,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "You can always trust this news channel because it is very ______ . (RELY)",
    options: [
      { id: "A", text: "reliable" },
      { id: "B", text: "rely" },
      { id: "C", text: "reliability" },
      { id: "D", text: "reliably" }
    ],
    correctAnswer: "A",
    explanation: "• Sau động từ to-be 'is' và trạng từ 'very' cần một TÍNH TỪ ➔ 'reliable' (đáng tin cậy).\n• 'rely' (v), 'reliability' (n), 'reliably' (adv)."
  },
  {
    orderIndex: 34,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "The school library provides free ______ to thousands of digital books and articles. (ACCESS)",
    options: [
      { id: "A", text: "accessible" },
      { id: "B", text: "accessibly" },
      { id: "C", text: "access" },
      { id: "D", text: "accessibility" }
    ],
    correctAnswer: "C",
    explanation: "• Cụm động từ: 'provide free access to sth' (cung cấp quyền truy cập miễn phí tới cái gì).\n• Cần một DANH TỪ làm tân ngữ cho động từ 'provides' ➔ 'access' (n)."
  },
  {
    orderIndex: 35,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "Students love the English class because the teacher uses many ______ games. (INTERACT)",
    options: [
      { id: "A", text: "interact" },
      { id: "B", text: "interactive" },
      { id: "C", text: "interaction" },
      { id: "D", text: "interactively" }
    ],
    correctAnswer: "B",
    explanation: "• Đứng trước danh từ 'games' cần một TÍNH TỪ bổ nghĩa ➔ 'interactive' (có tính tương tác).\n• 'interactive games' = các trò chơi có tính tương tác."
  },
  {
    orderIndex: 36,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "The newspaper lost its ______ after publishing an unverified story. (CREDIT)",
    options: [
      { id: "A", text: "credible" },
      { id: "B", text: "credibly" },
      { id: "C", text: "incredible" },
      { id: "D", text: "credibility" }
    ],
    correctAnswer: "D",
    explanation: "• Sau tính từ sở hữu 'its' cần một DANH TỪ ➔ 'credibility' (sự uy tín, độ tin cậy).\n• 'lose its credibility' = đánh mất uy tín."
  },
  {
    orderIndex: 37,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "The charity concert received huge ______ thanks to social media shares. (PUBLIC)",
    options: [
      { id: "A", text: "publicity" },
      { id: "B", text: "publicize" },
      { id: "C", text: "public" },
      { id: "D", text: "publicly" }
    ],
    correctAnswer: "A",
    explanation: "• Sau tính từ 'huge' cần một DANH TỪ không đếm được ➔ 'publicity' (sự chú ý của công chúng, truyền thông).\n• 'receive huge publicity' = nhận được sự quan tâm rộng rãi của dư luận."
  },
  {
    orderIndex: 38,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "My uncle placed a small ______ in the local paper to sell his old car. (ADVERTISE)",
    options: [
      { id: "A", text: "advertise" },
      { id: "B", text: "advertiser" },
      { id: "C", text: "advertisement" },
      { id: "D", text: "advertising" }
    ],
    correctAnswer: "C",
    explanation: "• Sau mạo từ 'a' và tính từ 'small' cần một DANH TỪ đếm được số ít ➔ 'advertisement' (mẩu quảng cáo).\n• 'advertiser' là người quảng cáo; 'advertising' là ngành quảng cáo."
  },
  {
    orderIndex: 39,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "Nam gave an impressive ______ about mass media in his English lesson. (PRESENT)",
    options: [
      { id: "A", text: "present" },
      { id: "B", text: "presentation" },
      { id: "C", text: "presenter" },
      { id: "D", text: "presently" }
    ],
    correctAnswer: "B",
    explanation: "• Cụm động từ: 'give a presentation' (thực hiện một bài thuyết trình).\n• Sau tính từ 'impressive' cần DANH TỪ chỉ sự việc ➔ 'presentation'."
  },
  {
    orderIndex: 40,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "The ______ of free food leaflets to poor people will begin tomorrow morning. (DISTRIBUTE)",
    options: [
      { id: "A", text: "distribute" },
      { id: "B", text: "distributive" },
      { id: "C", text: "distributor" },
      { id: "D", text: "distribution" }
    ],
    correctAnswer: "D",
    explanation: "• Sau mạo từ 'The' và trước giới từ 'of' cần một DANH TỪ chỉ hành động ➔ 'distribution' (sự phân phát, phân phối)."
  },
  {
    orderIndex: 41,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "The teacher gave us clear ______ on how to verify news sources. (DIRECT)",
    options: [
      { id: "A", text: "directions" },
      { id: "B", text: "directly" },
      { id: "C", text: "direct" },
      { id: "D", text: "director" }
    ],
    correctAnswer: "A",
    explanation: "• Sau tính từ 'clear' cần DANH TỪ số nhiều làm tân ngữ ➔ 'directions' (lời chỉ dẫn, hướng dẫn).\n• 'director' là giám đốc/đạo diễn."
  },
  {
    orderIndex: 42,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "Children learn better when schoolbooks include colorful ______ illustrations. (VISION)",
    options: [
      { id: "A", text: "visualize" },
      { id: "B", text: "visually" },
      { id: "C", text: "visual" },
      { id: "D", text: "visualization" }
    ],
    correctAnswer: "C",
    explanation: "• Đứng trước danh từ 'illustrations' cần một TÍNH TỪ bổ nghĩa ➔ 'visual' (thuộc thị giác, hình ảnh).\n• 'visual illustrations' = hình ảnh minh họa trực quan."
  },
  {
    orderIndex: 43,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "Many poor villagers were ______ in the past because they could not go to school. (LITERATE)",
    options: [
      { id: "A", text: "literacy" },
      { id: "B", text: "illiterate" },
      { id: "C", text: "literate" },
      { id: "D", text: "literately" }
    ],
    correctAnswer: "B",
    explanation: "• Sau to-be 'were' cần TÍNH TỪ. Ngữ cảnh 'không được đến trường' nên mang nghĩa phủ định ➔ 'illiterate' (mù chữ, không biết đọc viết).\n• 'literate' = biết chữ; 'literacy' = sự biết chữ."
  },
  {
    orderIndex: 44,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "The loud explosion outside drew everyone's ______ away from the TV. (ATTEND)",
    options: [
      { id: "A", text: "attend" },
      { id: "B", text: "attentive" },
      { id: "C", text: "attentively" },
      { id: "D", text: "attention" }
    ],
    correctAnswer: "D",
    explanation: "• Cụm từ cố định: 'draw sb's attention' (thu hút sự chú ý của ai).\n• Sau sở hữu cách 'everyone's' cần DANH TỪ ➔ 'attention'."
  },
  {
    orderIndex: 45,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "The documentary film made a lasting ______ on all the students. (IMPRESS)",
    options: [
      { id: "A", text: "impression" },
      { id: "B", text: "impress" },
      { id: "C", text: "impressive" },
      { id: "D", text: "impressively" }
    ],
    correctAnswer: "A",
    explanation: "• Cụm từ cố định: 'make an impression on sb' (để lại ấn tượng đối với ai).\n• Sau mạo từ 'a' và tính từ 'lasting' cần DANH TỪ ➔ 'impression'."
  },
  {
    orderIndex: 46,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "There is a noticeable ______ between digital media and printed press. (DIFFER)",
    options: [
      { id: "A", text: "different" },
      { id: "B", text: "differently" },
      { id: "C", text: "difference" },
      { id: "D", text: "differ" }
    ],
    correctAnswer: "C",
    explanation: "• Sau mạo từ 'a' và tính từ 'noticeable' cần DANH TỪ ➔ 'difference' (sự khác biệt)."
  },
  {
    orderIndex: 47,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "Local newspapers must become more ______ if they want to survive against social media. (COMPETE)",
    options: [
      { id: "A", text: "compete" },
      { id: "B", text: "competitive" },
      { id: "C", text: "competition" },
      { id: "D", text: "competitively" }
    ],
    correctAnswer: "B",
    explanation: "• Sau động từ nối 'become' và trạng từ 'more' cần một TÍNH TỪ ➔ 'competitive' (có tính cạnh tranh).\n• 'become more competitive' = trở nên có tính cạnh tranh hơn."
  },
  {
    orderIndex: 48,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "Watching science programmes on television can be very ______ for young children. (EDUCATE)",
    options: [
      { id: "A", text: "educate" },
      { id: "B", text: "educator" },
      { id: "C", text: "education" },
      { id: "D", text: "educational" }
    ],
    correctAnswer: "D",
    explanation: "• Sau to-be 'be' và trạng từ 'very' cần TÍNH TỪ ➔ 'educational' (mang tính giáo dục, bổ ích)."
  },
  {
    orderIndex: 49,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "The Internet brings enormous ______ to people who need to work from home. (CONVENIENT)",
    options: [
      { id: "A", text: "convenience" },
      { id: "B", text: "convenient" },
      { id: "C", text: "conveniently" },
      { id: "D", text: "inconvenient" }
    ],
    correctAnswer: "A",
    explanation: "• Sau tính từ 'enormous' cần một DANH TỪ không đếm được ➔ 'convenience' (sự tiện lợi, thuận tiện)."
  },
  {
    orderIndex: 50,
    sectionName: "2. Chia Từ Loại (Word Formation / Word Family)",
    content: "Students demonstrated great ______ when making their short videos for the school contest. (CREATE)",
    options: [
      { id: "A", text: "create" },
      { id: "B", text: "creative" },
      { id: "C", text: "creativity" },
      { id: "D", text: "creatively" }
    ],
    correctAnswer: "C",
    explanation: "• Sau tính từ 'great' cần một DANH TỪ chỉ phẩm chất ➔ 'creativity' (sự sáng tạo, óc sáng tạo)."
  },

  // ====================================================
  // PART 3: GRAMMAR: MANNER & RESULT CLAUSES (Q51 - Q70)
  // ====================================================
  {
    orderIndex: 51,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "The weather was ______ cold that all flights to the northern cities were cancelled.",
    options: [
      { id: "A", text: "such" },
      { id: "B", text: "so" },
      { id: "C", text: "too" },
      { id: "D", text: "very" }
    ],
    correctAnswer: "B",
    explanation: "• Cấu trúc: 'S + be + so + adj + that + Clause' (quá... đến nỗi mà).\n• 'cold' là tính từ đứng một mình trước 'that' ➔ dùng 'so'."
  },
  {
    orderIndex: 52,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "The breaking news was ______ shocking that everyone stopped eating and watched the television.",
    options: [
      { id: "A", text: "such" },
      { id: "B", text: "too" },
      { id: "C", text: "very" },
      { id: "D", text: "so" }
    ],
    correctAnswer: "D",
    explanation: "• Cấu trúc: 'so + adj + that' (quá... đến nỗi mà).\n• 'shocking' là tính từ ➔ dùng 'so'."
  },
  {
    orderIndex: 53,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "It was ______ a loud noise that all the babies in the clinic started crying.",
    options: [
      { id: "A", text: "such" },
      { id: "B", text: "so" },
      { id: "C", text: "too" },
      { id: "D", text: "very" }
    ],
    correctAnswer: "A",
    explanation: "• Cấu trúc: 'such + a/an + adj + N(số ít) + that'.\n• 'a loud noise' là cụm danh từ số ít ➔ bắt buộc dùng 'such'."
  },
  {
    orderIndex: 54,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "The Internet is ______ an effective communication tool that almost every modern company relies on it.",
    options: [
      { id: "A", text: "so" },
      { id: "B", text: "too" },
      { id: "C", text: "such" },
      { id: "D", text: "as" }
    ],
    correctAnswer: "C",
    explanation: "• Cấu trúc: 'such + an + adj + N(số ít) + that' (SGK trang 91 câu 4: 'The Internet is such a powerful tool that...')."
  },
  {
    orderIndex: 55,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "There are ______ many adverts on online video channels that users often skip them.",
    options: [
      { id: "A", text: "such" },
      { id: "B", text: "so" },
      { id: "C", text: "too" },
      { id: "D", text: "very" }
    ],
    correctAnswer: "B",
    explanation: "• Cấu trúc: 'so many + Plural N + that' (quá nhiều... đến nỗi mà).\n• 'adverts' là danh từ đếm được số nhiều đi với 'many' ➔ dùng 'so many'."
  },
  {
    orderIndex: 56,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "There is ______ much misleading information on social platforms that readers feel confused.",
    options: [
      { id: "A", text: "such" },
      { id: "B", text: "too" },
      { id: "C", text: "very" },
      { id: "D", text: "so" }
    ],
    correctAnswer: "D",
    explanation: "• Cấu trúc: 'so much + Uncountable N + that' (SGK trang 91 câu 2: 'There is so much information available online that...')."
  },
  {
    orderIndex: 57,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "They are ______ friendly journalists that everyone feels comfortable answering their questions.",
    options: [
      { id: "A", text: "such" },
      { id: "B", text: "so" },
      { id: "C", text: "too" },
      { id: "D", text: "as" }
    ],
    correctAnswer: "A",
    explanation: "• 'friendly journalists' là cụm danh từ số nhiều (adj + Plural N) ➔ dùng 'such + adj + Plural N + that' (không dùng a/an)."
  },
  {
    orderIndex: 58,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "He talks to the staff ______ he were the owner of the hotel, but in fact he is just a receptionist.",
    options: [
      { id: "A", text: "so that" },
      { id: "B", text: "because" },
      { id: "C", text: "as if" },
      { id: "D", text: "even though" }
    ],
    correctAnswer: "C",
    explanation: "• Cấu trúc giả định trái hiện tại: 'as if / as though + S + were' (như thể là).\n• Thực tế anh ta chỉ là lễ tân ('in fact he is just a receptionist') ➔ dùng 'as if'."
  },
  {
    orderIndex: 59,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "The boy looked at the broken smartphone ______ he had never seen a phone before in his life.",
    options: [
      { id: "A", text: "so that" },
      { id: "B", text: "as though" },
      { id: "C", text: "such that" },
      { id: "D", text: "in order that" }
    ],
    correctAnswer: "B",
    explanation: "• 'as though' = 'as if' (như thể là). Sau đó là giả định quá khứ lùi thì 'had never seen'."
  },
  {
    orderIndex: 60,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "Despite the sudden loud noise, the news anchor continued reading the news as if nothing ______ . (SBT tr.84)",
    options: [
      { id: "A", text: "happens" },
      { id: "B", text: "is happening" },
      { id: "C", text: "will happen" },
      { id: "D", text: "had happened" }
    ],
    correctAnswer: "D",
    explanation: "• Giả định trái ngược quá khứ sau 'as if': dùng thì Quá khứ hoàn thành 'had happened' (SBT trang 84 câu 5)."
  },
  {
    orderIndex: 61,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "Please complete the report ______ you were instructed during the training session.",
    options: [
      { id: "A", text: "as" },
      { id: "B", text: "as if" },
      { id: "C", text: "such" },
      { id: "D", text: "so" }
    ],
    correctAnswer: "A",
    explanation: "• Mệnh đề chỉ cách thức sự thật: 'as' (theo như / đúng như đã được hướng dẫn)."
  },
  {
    orderIndex: 62,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "The young boy plays football very skillfully ______ his father used to do.",
    options: [
      { id: "A", text: "as if" },
      { id: "B", text: "so that" },
      { id: "C", text: "like" },
      { id: "D", text: "such" }
    ],
    correctAnswer: "C",
    explanation: "• 'like' (giống như) dùng trong mệnh đề chỉ cách thức thân mật (SBT trang 90 câu 3: 'he can no longer run like he used to')."
  },
  {
    orderIndex: 63,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "Look at the dark clouds in the sky! It looks as if it ______ in a few minutes.",
    options: [
      { id: "A", text: "rained" },
      { id: "B", text: "is going to rain" },
      { id: "C", text: "had rained" },
      { id: "D", text: "were raining" }
    ],
    correctAnswer: "B",
    explanation: "• Tình huống có thật ở hiện tại/tương lai (có bằng chứng thấy mây đen) ➔ chia thì bình thường 'is going to rain' (không lùi thì)."
  },
  {
    orderIndex: 64,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "She always acts as if she ______ the answer to every question, but in reality she knows very little.",
    options: [
      { id: "A", text: "knows" },
      { id: "B", text: "is knowing" },
      { id: "C", text: "will know" },
      { id: "D", text: "knew" }
    ],
    correctAnswer: "D",
    explanation: "• Giả định trái hiện tại sau 'as if': động từ thường lùi về Quá khứ đơn ➔ 'knew' (SBT trang 85 câu 7: 'acts as if she knew everything')."
  },
  {
    orderIndex: 65,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "FIND THE MISTAKE: The film (A) was such (B) exciting that (C) we watched it twice on (D) TV.",
    options: [
      { id: "A", text: "film" },
      { id: "B", text: "such" },
      { id: "C", text: "that" },
      { id: "D", text: "on" }
    ],
    correctAnswer: "B",
    explanation: "• Lỗi sai ở B: 'such' ➔ Sửa thành 'so'.\n• 'exciting' là tính từ đứng một mình trước 'that' nên phải dùng 'so exciting that' (SBT trang 85 câu 2)."
  },
  {
    orderIndex: 66,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "FIND THE MISTAKE: There are so many adverts (A) in the local press (B) so (C) I get really annoyed reading it (D).",
    options: [
      { id: "A", text: "so many adverts" },
      { id: "B", text: "in the local press" },
      { id: "C", text: "so (sau press)" },
      { id: "D", text: "really annoyed" }
    ],
    correctAnswer: "C",
    explanation: "• Lỗi sai ở C: từ 'so' đứng sau 'local press' ➔ Sửa thành 'that'.\n• Cấu trúc chỉ kết quả: 'so many + N + THAT + S + V' (SGK trang 99 câu 3)."
  },
  {
    orderIndex: 67,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "FIND THE MISTAKE: He talks (A) to the team (B) as if (C) he is (D) our director, but he is only a trainee.",
    options: [
      { id: "A", text: "talks" },
      { id: "B", text: "to the team" },
      { id: "C", text: "as if" },
      { id: "D", text: "is (sau he)" }
    ],
    correctAnswer: "D",
    explanation: "• Lỗi sai ở D: 'is' ➔ Sửa thành 'were'.\n• Giả định trái ngược hiện tại sau 'as if' với động từ to be phải dùng 'were' cho mọi ngôi."
  },
  {
    orderIndex: 68,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "FIND THE MISTAKE: The Internet has become so a (A) convenient tool (B) that people use (C) it every day (D).",
    options: [
      { id: "A", text: "so a" },
      { id: "B", text: "tool" },
      { id: "C", text: "use" },
      { id: "D", text: "every day" }
    ],
    correctAnswer: "A",
    explanation: "• Lỗi sai ở A: 'so a' ➔ Sửa thành 'such a' (SGK trang 99 câu 1: 'The Internet has become such a convenient tool that...')."
  },
  {
    orderIndex: 69,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "FIND THE MISTAKE: She writes about (A) London as if (B) she has lived (C) there, but she has never visited it (D).",
    options: [
      { id: "A", text: "about" },
      { id: "B", text: "as if" },
      { id: "C", text: "has lived" },
      { id: "D", text: "visited it" }
    ],
    correctAnswer: "C",
    explanation: "• Lỗi sai ở C: 'has lived' ➔ Sửa thành 'had lived'.\n• Giả định trái quá khứ (thực tế chưa từng tới) phải dùng thì Quá khứ hoàn thành (SGK trang 99 câu 2)."
  },
  {
    orderIndex: 70,
    sectionName: "3. Ngữ Pháp: Mệnh Đề Chỉ Cách Thức & Kết Quả",
    content: "FIND THE MISTAKE: The new billboard (A) was very (B) bright that (C) drivers could see it from far away (D).",
    options: [
      { id: "A", text: "billboard" },
      { id: "B", text: "very" },
      { id: "C", text: "that" },
      { id: "D", text: "away" }
    ],
    correctAnswer: "B",
    explanation: "• Lỗi sai ở B: 'very' ➔ Sửa thành 'so'.\n• Đi với mệnh đề kết quả 'that' phải là 'so + adj + that', không dùng 'very + adj + that' (SBT trang 85 câu 3)."
  },

  // ====================================================
  // PART 4: READING COMPREHENSION & CLOZE (Q71 - Q85)
  // ====================================================
  // Passage 1: Cloze Test (Q71 - Q77) "The Internet in Viet Nam" (SBT p.87-88)
  {
    orderIndex: 71,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "CLOZE TEST: Read the text and choose the best word for blank (1):\n\n'Today, there are more than five (1) ______ Internet users in the world, which is more than 60 per cent of the global population.' (SBT tr.87)",
    options: [
      { id: "A", text: "hundred" },
      { id: "B", text: "million" },
      { id: "C", text: "billion" },
      { id: "D", text: "thousand" }
    ],
    correctAnswer: "C",
    explanation: "• Dân số thế giới hơn 8 tỷ người, 60% dân số tương đương hơn 5 tỷ (five billion) người dùng Internet (SBT trang 88 câu 1)."
  },
  {
    orderIndex: 72,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "CLOZE TEST: Read the text and choose the best word for blank (2):\n\n'Current news, information, and entertainment are readily available through websites and can be easily (2) ______ through search engines.' (SBT tr.87)",
    options: [
      { id: "A", text: "read" },
      { id: "B", text: "accessed" },
      { id: "C", text: "bought" },
      { id: "D", text: "learnt" }
    ],
    correctAnswer: "B",
    explanation: "• 'easily accessed through search engines' = có thể dễ dàng truy cập thông qua các công cụ tìm kiếm (SBT trang 88 câu 2)."
  },
  {
    orderIndex: 73,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "CLOZE TEST: Read the text and choose the best word for blank (3):\n\n'The Internet has become the most exciting type of (3) ______ in modern life.' (SBT tr.87)",
    options: [
      { id: "A", text: "newspaper" },
      { id: "B", text: "education" },
      { id: "C", text: "viewer" },
      { id: "D", text: "mass media" }
    ],
    correctAnswer: "D",
    explanation: "• 'type of mass media' = hình thức truyền thông đại chúng (SBT trang 88 câu 3)."
  },
  {
    orderIndex: 74,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "CLOZE TEST: Read the text and choose the best word for blank (4):\n\n'In Viet Nam, there were 72.10 million Internet users in early 2022, which accounted for 73.2 per cent of the total (4) ______.' (SBT tr.87)",
    options: [
      { id: "A", text: "population" },
      { id: "B", text: "users" },
      { id: "C", text: "people" },
      { id: "D", text: "readers" }
    ],
    correctAnswer: "A",
    explanation: "• 'total population' = tổng dân số (73.2% tổng dân số - SBT trang 88 câu 4)."
  },
  {
    orderIndex: 75,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "CLOZE TEST: Read the text and choose the best word for blank (5):\n\n'The number of social media users was (5) ______ to nearly 70 per cent of the total population.' (SBT tr.87)",
    options: [
      { id: "A", text: "same" },
      { id: "B", text: "equivalent" },
      { id: "C", text: "more" },
      { id: "D", text: "less" }
    ],
    correctAnswer: "B",
    explanation: "• 'equivalent to' = tương đương với (SBT trang 88 câu 5)."
  },
  {
    orderIndex: 76,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "CLOZE TEST: Read the text and choose the best word for blank (6):\n\n'The number of Vietnamese on popular platforms was also (6) ______ , since it was reported that more than 70 million used Facebook.' (SBT tr.87)",
    options: [
      { id: "A", text: "impressive" },
      { id: "B", text: "low" },
      { id: "C", text: "unreliable" },
      { id: "D", text: "slow" }
    ],
    correctAnswer: "A",
    explanation: "• 'impressive' (adj) = đầy ấn tượng (với hơn 70 triệu người dùng là con số rất ấn tượng - SBT trang 88 câu 6)."
  },
  {
    orderIndex: 77,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "CLOZE TEST: Read the text and choose the best word for blank (7):\n\n'These numbers strongly indicate that the Internet has become one of the most (7) ______ types of mass media in Viet Nam today.' (SBT tr.87)",
    options: [
      { id: "A", text: "expensive" },
      { id: "B", text: "reluctant" },
      { id: "C", text: "popular" },
      { id: "D", text: "fake" }
    ],
    correctAnswer: "C",
    explanation: "• 'popular' (adj) = phổ biến (loại hình truyền thông phổ biến nhất - SBT trang 88 câu 8)."
  },

  // Passage 2: Reading Comprehension (Q78 - Q85) "Traditional Media" (SBT p.86-87)
  {
    orderIndex: 78,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "READING COMPREHENSION:\n'Before the invention of newspapers, the main source of news was word of mouth. Gutenberg's invention of the printing press in Europe in 1453 made printing faster and books more accessible. It reduced the cost and size of printed books.' (SBT tr.86)\n\nQuestion: What was the main source of news before newspapers?",
    options: [
      { id: "A", text: "Television" },
      { id: "B", text: "The Internet" },
      { id: "C", text: "Radio" },
      { id: "D", text: "Word of mouth" }
    ],
    correctAnswer: "D",
    explanation: "• Dẫn chứng đoạn A câu đầu: 'Before the invention of newspapers, the main source of news was word of mouth' (truyền miệng)."
  },
  {
    orderIndex: 79,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "READING COMPREHENSION:\nAccording to the passage, in which year did Gutenberg introduce his printing press in Europe?",
    options: [
      { id: "A", text: "In 1453" },
      { id: "B", text: "In 1612" },
      { id: "C", text: "In the 1920s" },
      { id: "D", text: "In the 1960s" }
    ],
    correctAnswer: "A",
    explanation: "• Dẫn chứng: 'it was Gutenberg's invention in Europe in 1453 that made printing faster' (năm 1453)."
  },
  {
    orderIndex: 80,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "READING COMPREHENSION:\nThe phrase 'printing presses' in Paragraph A refers to ______ . (SBT tr.86)",
    options: [
      { id: "A", text: "newspapers" },
      { id: "B", text: "machines that produce books and newspapers" },
      { id: "C", text: "writings and drawings" },
      { id: "D", text: "social platforms" }
    ],
    correctAnswer: "B",
    explanation: "• 'printing presses' là máy móc dùng để in ấn sách báo (machines that produce books and newspapers - SBT trang 86 câu 2)."
  },
  {
    orderIndex: 81,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "READING COMPREHENSION:\nWhich of the following was a result of Gutenberg's invention?",
    options: [
      { id: "A", text: "It made books more expensive." },
      { id: "B", text: "It stopped the spread of discoveries." },
      { id: "C", text: "It promoted literacy in Europe." },
      { id: "D", text: "It replaced all spoken languages." }
    ],
    correctAnswer: "C",
    explanation: "• Dẫn chứng cuối đoạn A: 'Gutenberg's invention also quickened the spread of discoveries and information, and promoted literacy in Europe'."
  },
  {
    orderIndex: 82,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "READING COMPREHENSION:\n'The first newspapers developed from around 1612... Newspapers and magazines are still very popular today. Many people continue to read print media, which is considered more credible than digital media.' (SBT tr.86)\n\nQuestion: Why do many people still read printed newspapers today?",
    options: [
      { id: "A", text: "Because print media is considered more credible than digital media." },
      { id: "B", text: "Because digital media is too slow to load." },
      { id: "C", text: "Because newspapers are always free of charge." },
      { id: "D", text: "Because there are no advertisements in printed papers." }
    ],
    correctAnswer: "A",
    explanation: "• Dẫn chứng cuối đoạn B: 'many people continue to read print media, which is considered more credible than digital media'."
  },
  {
    orderIndex: 83,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "READING COMPREHENSION:\n'In the 1920s, when radio, television, and video were introduced, the phrase 'the media' began to be used. Thanks to its audiovisual presentation, television became one of the most important forms of mass media.' (SBT tr.86)\n\nQuestion: When did early audiovisual media like television and radio appear?",
    options: [
      { id: "A", text: "In 1453" },
      { id: "B", text: "In the early 20th century (1920s)" },
      { id: "C", text: "In 1612" },
      { id: "D", text: "In the late 21st century" }
    ],
    correctAnswer: "B",
    explanation: "• Dẫn chứng đoạn C: 'In the 1920s, when radio, television, and video were introduced...' (đầu thế kỷ 20 - SBT trang 87 câu 8)."
  },
  {
    orderIndex: 84,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "READING COMPREHENSION:\nThe word 'credible' in paragraph B is closest in meaning to ______ .",
    options: [
      { id: "A", text: "expensive" },
      { id: "B", text: "modern" },
      { id: "C", text: "trustworthy" },
      { id: "D", text: "colourful" }
    ],
    correctAnswer: "C",
    explanation: "• 'credible' (adj) = 'trustworthy / reliable' (đáng tin cậy, có thể tin tưởng được)."
  },
  {
    orderIndex: 85,
    sectionName: "4. Bài Đọc Điền Từ & Đọc Hiểu (Reading)",
    content: "READING COMPREHENSION:\nWhat is the main topic of the entire reading passage?",
    options: [
      { id: "A", text: "The development of traditional media through history" },
      { id: "B", text: "The dangers of fake news on social media" },
      { id: "C", text: "How to place an advert in newspapers" },
      { id: "D", text: "The price of modern smartphones" }
    ],
    correctAnswer: "A",
    explanation: "• Toàn bài nói về sự phát triển của truyền thông truyền thống từ truyền miệng, máy in Gutenberg, báo in 1612 đến radio và tivi thế kỷ 20."
  },

  // ====================================================
  // PART 5: SENTENCE TRANSFORMATION & REWRITING (Q86 - Q100)
  // ====================================================
  {
    orderIndex: 86,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "REWRITE: 'The news was so interesting that everyone talked about it.'\n➔ It was ______ .",
    options: [
      { id: "A", text: "so an interesting news that everyone talked about it" },
      { id: "B", text: "such an interesting news that everyone talked about it" },
      { id: "C", text: "such interesting news that everyone talked about it" },
      { id: "D", text: "too interesting news for everyone to talk about" }
    ],
    correctAnswer: "C",
    explanation: "• 'news' là danh từ KHÔNG ĐẾM ĐƯỢC ➔ tuyệt đối không dùng mạo từ 'an'.\n• Cấu trúc: 'such + adj + Uncountable N + that' ➔ 'such interesting news that...'."
  },
  {
    orderIndex: 87,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "REWRITE: 'Smartphones are very common nowadays. Everyone seems to have one.' (SBT tr.90)\n➔ Smartphones are ______ .",
    options: [
      { id: "A", text: "so common nowadays that everyone seems to have one" },
      { id: "B", text: "such common nowadays that everyone seems to have one" },
      { id: "C", text: "too common nowadays for everyone having one" },
      { id: "D", text: "common enough for everyone has one nowadays" }
    ],
    correctAnswer: "A",
    explanation: "• 'common' là tính từ ➔ dùng 'so + adj + that' (SBT trang 90 câu 4)."
  },
  {
    orderIndex: 88,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "REWRITE: 'The Internet is a very rich source of information. Therefore, many people rely on it.' (SBT tr.90)\n➔ The Internet is ______ .",
    options: [
      { id: "A", text: "so rich a source of information that nobody relies on it" },
      { id: "B", text: "such a rich source of information that many people rely on it" },
      { id: "C", text: "such rich source of information so that many people rely on it" },
      { id: "D", text: "too rich source of information for people to rely on" }
    ],
    correctAnswer: "B",
    explanation: "• Cụm danh từ số ít 'a rich source of information' ➔ dùng 'such a rich source of information that...' (SBT trang 90 câu 6)."
  },
  {
    orderIndex: 89,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "REWRITE: 'We cannot spend that much money on dinner pretending that we are rich.' (SBT tr.90)\n➔ We cannot spend that much money on dinner ______ .",
    options: [
      { id: "A", text: "as if we are rich" },
      { id: "B", text: "like we had been rich" },
      { id: "C", text: "as if we were rich" },
      { id: "D", text: "as we were rich" }
    ],
    correctAnswer: "C",
    explanation: "• Giả định trái hiện tại (thực tế không giàu): dùng 'as if we were rich' (SBT trang 90 câu 2)."
  },
  {
    orderIndex: 90,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "REWRITE: 'We are not close friends. However, he is asking me a lot of personal questions.' (SBT tr.89)\n➔ He is asking me a lot of personal questions ______ .",
    options: [
      { id: "A", text: "as if we were close friends" },
      { id: "B", text: "so that we are close friends" },
      { id: "C", text: "because we had been close friends" },
      { id: "D", text: "like we are close friends" }
    ],
    correctAnswer: "A",
    explanation: "• Thực tế không phải bạn thân ('We are not close friends') ➔ Giả định trái hiện tại dùng 'as if we were close friends' (SBT trang 89 câu 4)."
  },
  {
    orderIndex: 91,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "REWRITE: 'The Internet connection is very poor. I cannot read the news on my mobile phone.' (SBT tr.89)\n➔ The Internet connection is ______ .",
    options: [
      { id: "A", text: "too poor that I can read the news on my phone" },
      { id: "B", text: "so poor that I cannot read the news on my mobile phone" },
      { id: "C", text: "such poor that I cannot read the news on my mobile phone" },
      { id: "D", text: "very poor so that I cannot read the news on my phone" }
    ],
    correctAnswer: "B",
    explanation: "• 'poor' là tính từ ➔ dùng 'so poor that I cannot read...' (SBT trang 89 câu 6)."
  },
  {
    orderIndex: 92,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "REWRITE: 'Printing leaflets is a cost-effective way of spreading news. Many advertisers use them.' (SBT tr.89)\n➔ Printing leaflets is ______ .",
    options: [
      { id: "A", text: "so a cost-effective way of spreading news that many use them" },
      { id: "B", text: "such cost-effective way of spreading news that many use them" },
      { id: "C", text: "such a cost-effective way of spreading news that many advertisers use them" },
      { id: "D", text: "too cost-effective a way of spreading news that many use them" }
    ],
    correctAnswer: "C",
    explanation: "• 'a cost-effective way' là cụm danh từ số ít ➔ dùng 'such a cost-effective way... that' (SBT trang 89 câu 2)."
  },
  {
    orderIndex: 93,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "REWRITE: 'My grandfather still listens to the news on the radio every morning. He did that 50 years ago.' (SBT tr.89)\n➔ My grandfather still listens to the news on the radio every morning ______ .",
    options: [
      { id: "A", text: "like he did fifty years ago" },
      { id: "B", text: "as if he does fifty years ago" },
      { id: "C", text: "so that he did fifty years ago" },
      { id: "D", text: "such that he did fifty years ago" }
    ],
    correctAnswer: "A",
    explanation: "• Mệnh đề chỉ cách thức tương đồng: 'like he did fifty years ago' (như ông từng làm 50 năm trước - SBT trang 89 câu 3)."
  },
  {
    orderIndex: 94,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "REWRITE: 'The demand for the new smartphone was very high. It was out of stock in two hours.' (SBT tr.90)\n➔ There was ______ .",
    options: [
      { id: "A", text: "so a high demand for the new phone that it was out of stock" },
      { id: "B", text: "such a high demand for the new smartphone that it was out of stock in two hours" },
      { id: "C", text: "such high demand that it was out of stock in two hours" },
      { id: "D", text: "too high demand for the phone that it was out of stock" }
    ],
    correctAnswer: "B",
    explanation: "• 'a high demand' là cụm danh từ số ít ➔ dùng 'such a high demand... that' (SBT trang 90 câu 7)."
  },
  {
    orderIndex: 95,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "CLOSEST in meaning: 'My dad likes reading the newspaper in the morning. My grandpa likes that as well.' (SBT tr.90)\n➔ ______ .",
    options: [
      { id: "A", text: "My dad likes reading the newspaper in the morning as my grandpa does." },
      { id: "B", text: "My dad reads the newspaper as if my grandpa liked it." },
      { id: "C", text: "My dad and my grandpa dislike reading the morning newspaper." },
      { id: "D", text: "My dad reads the paper so that my grandpa can listen." }
    ],
    correctAnswer: "A",
    explanation: "• 'as my grandpa does' = giống như ông nội làm (SBT trang 90 câu 1)."
  },
  {
    orderIndex: 96,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "CLOSEST in meaning: 'After the surgery, he can no longer run in the same way that he used to.' (SBT tr.90)\n➔ ______ .",
    options: [
      { id: "A", text: "After the surgery, he can no longer run as if he used to." },
      { id: "B", text: "After the surgery, he can no longer run like he used to." },
      { id: "C", text: "After the surgery, he runs so fast that nobody can catch him." },
      { id: "D", text: "After the surgery, he likes running as he had used to." }
    ],
    correctAnswer: "B",
    explanation: "• 'in the same way that he used to' = 'like he used to' (giống như anh ấy từng chạy trước đây - SBT trang 90 câu 3)."
  },
  {
    orderIndex: 97,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "CLOSEST in meaning: 'TV advertising is so expensive that many small businesses cannot afford it.' (SBT tr.91)\n➔ ______ .",
    options: [
      { id: "A", text: "Many small businesses can afford to advertise on television easily." },
      { id: "B", text: "TV advertising is such cheap that all businesses use it." },
      { id: "C", text: "Not many small businesses can afford to advertise on TV because it is very expensive." },
      { id: "D", text: "Advertising on TV costs so little money that small shops like it." }
    ],
    correctAnswer: "C",
    explanation: "• Quảng cáo TV quá đắt nên doanh nghiệp nhỏ không đủ tiền trả = Không nhiều doanh nghiệp nhỏ có thể chi trả quảng cáo TV vì nó rất đắt (SBT trang 91 câu 7)."
  },
  {
    orderIndex: 98,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "CLOSEST in meaning: 'Reading printed books has become such an enjoyable habit that people are reluctant to change it.' (SBT tr.91)\n➔ ______ .",
    options: [
      { id: "A", text: "People are willing to give up reading printed books right away." },
      { id: "B", text: "The habit of reading printed books has become so enjoyable that people are not willing to change it." },
      { id: "C", text: "Reading printed books is too boring for people to keep the habit." },
      { id: "D", text: "People dislike printed books because online news is much better." }
    ],
    correctAnswer: "B",
    explanation: "• 'reluctant to change' = 'not willing to change' (không sẵn lòng thay đổi - SBT trang 91 câu 8)."
  },
  {
    orderIndex: 99,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "REWRITE: 'The article was too long for the student to read in ten minutes.'\n➔ The article was ______ .",
    options: [
      { id: "A", text: "so long that the student could not read it in ten minutes" },
      { id: "B", text: "such long that the student could not read it in ten minutes" },
      { id: "C", text: "so long that the student could read it easily" },
      { id: "D", text: "too long so that the student could read it in ten minutes" }
    ],
    correctAnswer: "A",
    explanation: "• Chuyển từ 'too + adj + to V' sang 'so + adj + that + S + could not + V + it'."
  },
  {
    orderIndex: 100,
    sectionName: "5. Viết Lại Câu & Câu Đồng Nghĩa (Rewriting)",
    content: "REWRITE: 'There were so many viewers at the studio that we could not find an empty chair.'\n➔ It was ______ .",
    options: [
      { id: "A", text: "so crowded studio that we could not find an empty chair" },
      { id: "B", text: "such a crowded studio that we could not find an empty chair" },
      { id: "C", text: "such crowded studio that we could not find an empty chair" },
      { id: "D", text: "too crowded a studio for finding an empty chair" }
    ],
    correctAnswer: "B",
    explanation: "• 'a crowded studio' là danh từ số ít ➔ dùng 'such a crowded studio that...'."
  }
];

// Verification checks
console.log(`Checking question bank (${questions.length} questions)...`);

let pass = true;
if (questions.length !== 100) {
  console.error(`❌ Total questions must be 100, got ${questions.length}`);
  pass = false;
}

// Check consecutive answers
for (let i = 1; i < questions.length; i++) {
  if (questions[i].correctAnswer === questions[i - 1].correctAnswer) {
    console.error(`❌ Consecutive identical answers at Q${questions[i - 1].orderIndex} (${questions[i - 1].correctAnswer}) and Q${questions[i].orderIndex} (${questions[i].correctAnswer})`);
    pass = false;
  }
}

// Check vocab questions (1-32) have at least 2 unit 7 words in options
for (let i = 0; i < 32; i++) {
  const q = questions[i];
  const cnt = countUnitWords(q.options);
  if (cnt < 2) {
    console.error(`❌ Q${q.orderIndex} vocabulary question has only ${cnt} Unit 7 words in options:`, q.options.map(o => o.text));
    pass = false;
  }
}

// Check word formation count
const wfCount = questions.filter(q => q.sectionName.includes("Word Formation")).length;
console.log(`Word formation questions count: ${wfCount} (required >= 15)`);
if (wfCount < 15) {
  console.error(`❌ Word formation questions < 15: ${wfCount}`);
  pass = false;
}

if (pass) {
  console.log("✅ ALL VERIFICATIONS PASSED 100%!");
  fs.writeFileSync(path.resolve(__dirname, 'questions_data_100.json'), JSON.stringify(questions, null, 2), 'utf8');
  console.log("Saved to questions_data_100.json");
} else {
  console.error("❌ Verification failed!");
  process.exit(1);
}
