/**
 * DỮ LIỆU BÀI GIẢNG TƯƠNG TÁC: UNIT 6 - ARTIFICIAL INTELLIGENCE (25 TỪ VỰNG THÔNG DỤNG BỔ TRỢ)
 * Tiếng Anh 12 Global Success
 * Soạn riêng cho: Bạn Nam Việt (Lớp 12 - Mục tiêu 7+ THPT Quốc Gia)
 * Hướng dẫn & Bản quyền: Thầy Thức
 * Nội dung: Khai thác từ Grad12_04112026/unit_6_common_words_english_12.md
 */

const LECTURE_DATA = {
  title: "Cẩm Nang Tri Thức & Flashcard 25 Từ Vựng Bổ Trợ Unit 6: Artificial Intelligence",
  subject: "Tiếng Anh 12 (Global Success - Unit 6)",
  student: "Bạn Nam Việt",
  teacher: "Thầy Thức",

  // 1. DANH SÁCH 25 TỪ VỰNG THÔNG DỤNG (CHIA 3 NHÓM)
  vocabList: [
    // NHÓM 1: HỆ THỐNG AI & KỸ THUẬT SỐ (9 TỪ)
    {
      id: 1,
      unit: 1,
      unitName: "Nhóm 1: Hệ Thống AI & Kỹ Thuật Số",
      word: "Advanced",
      ipa: "/ədˈvɑːnst/",
      pos: "adjective",
      meaning: "Tiên tiến, trình độ cao, phát triển",
      collocation: "advanced technology / advanced machine learning",
      example: "Advanced machine learning algorithms can process unstructured multimedia data in milliseconds.",
      exampleVi: "Các thuật toán học máy tiên tiến có thể xử lý dữ liệu đa phương tiện phi cấu trúc trong vài phần nghìn giây."
    },
    {
      id: 2,
      unit: 1,
      unitName: "Nhóm 1: Hệ Thống AI & Kỹ Thuật Số",
      word: "Chatbot",
      ipa: "/ˈtʃætbɒt/",
      pos: "noun",
      meaning: "Công cụ trò chuyện tự động / trợ lý đối thoại ảo",
      collocation: "intelligent chatbot / AI-powered chatbot",
      example: "Many e-commerce websites use intelligent chatbots to handle routine customer inquiries 24/7.",
      exampleVi: "Nhiều trang web thương mại điện tử sử dụng chatbot thông minh để giải đáp thắc mắc thường ngày của khách hàng 24/7."
    },
    {
      id: 3,
      unit: 1,
      unitName: "Nhóm 1: Hệ Thống AI & Kỹ Thuật Số",
      word: "Concept",
      ipa: "/ˈkɒnsept/",
      pos: "noun",
      meaning: "Khái niệm, ý tưởng chung",
      collocation: "core concept / basic concept of AI",
      example: "The core concept of artificial intelligence dates back to the mid-twentieth century.",
      exampleVi: "Khái niệm cốt lõi về trí tuệ nhân tạo đã xuất hiện từ giữa thế kỷ XX."
    },
    {
      id: 4,
      unit: 1,
      unitName: "Nhóm 1: Hệ Thống AI & Kỹ Thuật Số",
      word: "Data",
      ipa: "/ˈdeɪtə/",
      pos: "noun",
      meaning: "Dữ liệu, số liệu thông tin",
      collocation: "massive data / collect and process data",
      example: "Training large language models requires petabytes of textual and numerical data.",
      exampleVi: "Việc huấn luyện các mô hình ngôn ngữ lớn đòi hỏi hàng petabyte dữ liệu văn bản và số liệu."
    },
    {
      id: 5,
      unit: 1,
      unitName: "Nhóm 1: Hệ Thống AI & Kỹ Thuật Số",
      word: "Digital",
      ipa: "/ˈdɪdʒɪtl/",
      pos: "adjective",
      meaning: "Thuộc kỹ thuật số",
      collocation: "digital library / digital transformation",
      example: "The school transitioned its traditional paper archive into a secure digital library.",
      exampleVi: "Nhà trường đã chuyển đổi kho lưu trữ giấy truyền thống thành một thư viện số bảo mật."
    },
    {
      id: 6,
      unit: 1,
      unitName: "Nhóm 1: Hệ Thống AI & Kỹ Thuật Số",
      word: "Function",
      ipa: "/ˈfʌŋkʃn/",
      pos: "noun / verb",
      meaning: "Chức năng, nhiệm vụ / hoạt động, vận hành",
      collocation: "primary function / perform a function",
      example: "One primary function of biometric security is preventing unauthorized device access.",
      exampleVi: "Một chức năng chủ yếu của bảo mật sinh trắc học là ngăn chặn việc truy cập thiết bị trái phép."
    },
    {
      id: 7,
      unit: 1,
      unitName: "Nhóm 1: Hệ Thống AI & Kỹ Thuật Số",
      word: "Platform",
      ipa: "/ˈplætfɔːm/",
      pos: "noun",
      meaning: "Nền tảng công nghệ / hệ thống cơ sở",
      collocation: "cloud computing platform / digital platform",
      example: "Cloud computing platforms provide scalable computational power for training deep models.",
      exampleVi: "Các nền tảng điện toán đám mây cung cấp sức mạnh tính toán có thể mở rộng để huấn luyện mô hình sâu."
    },
    {
      id: 8,
      unit: 1,
      unitName: "Nhóm 1: Hệ Thống AI & Kỹ Thuật Số",
      word: "Upgrade",
      ipa: "/ˌʌpˈɡreɪd/",
      pos: "verb / noun",
      meaning: "Nâng cấp (phần cứng/phần mềm), cải tiến",
      collocation: "upgrade firmware / regular software upgrade",
      example: "Users should upgrade their security firmware regularly to counter malware threats.",
      exampleVi: "Người dùng nên nâng cấp phần mềm bảo mật định kỳ để đối phó với các mối đe dọa từ mã độc."
    },
    {
      id: 9,
      unit: 1,
      unitName: "Nhóm 1: Hệ Thống AI & Kỹ Thuật Số",
      word: "Virtual",
      ipa: "/ˈvɜːtʃuəl/",
      pos: "adjective",
      meaning: "Ảo (tồn tại trên môi trường máy tính/mạng)",
      collocation: "virtual reality / virtual assistant",
      example: "Virtual reality headsets immerse users in simulated three-dimensional environments.",
      exampleVi: "Kính thực tế ảo đưa người dùng đắm chìm vào môi trường không gian ba chiều mô phỏng."
    },

    // NHÓM 2: TƯƠNG TÁC & HÀNH VI NGƯỜI MÁY (8 TỪ)
    {
      id: 10,
      unit: 2,
      unitName: "Nhóm 2: Tương Tác & Hành Vi Người Máy",
      word: "Effortlessly",
      ipa: "/ˈefətləsli/",
      pos: "adverb",
      meaning: "Một cách dễ dàng, không tốn sức",
      collocation: "translate effortlessly / perform tasks effortlessly",
      example: "Neural translation software can translate complex idioms effortlessly.",
      exampleVi: "Phần mềm dịch thuật dựa trên mạng nơ-ron có thể dịch các thành ngữ phức tạp một cách trơn tru, dễ dàng."
    },
    {
      id: 11,
      unit: 2,
      unitName: "Nhóm 2: Tương Tác & Hành Vi Người Máy",
      word: "Evolution",
      ipa: "/ˌiːvəˈluːʃn/",
      pos: "noun",
      meaning: "Sự tiến hóa, sự phát triển từng bước",
      collocation: "rapid evolution of robotics / technological evolution",
      example: "The rapid evolution of robotics is reshaping modern industrial manufacturing.",
      exampleVi: "Sự tiến hóa nhanh chóng của robot đang định hình lại ngành sản xuất công nghiệp hiện đại."
    },
    {
      id: 12,
      unit: 2,
      unitName: "Nhóm 2: Tương Tác & Hành Vi Người Máy",
      word: "Gesture",
      ipa: "/ˈdʒestʃə(r)/",
      pos: "noun",
      meaning: "Cử chỉ, điệu bộ",
      collocation: "hand gesture / recognize gestures",
      example: "Smart home hubs can be operated using simple hand gestures or voice commands.",
      exampleVi: "Các trung tâm điều khiển nhà thông minh có thể được vận hành thông qua cử chỉ tay đơn giản hoặc lệnh giọng nói."
    },
    {
      id: 13,
      unit: 2,
      unitName: "Nhóm 2: Tương Tác & Hành Vi Người Máy",
      word: "Human-like",
      ipa: "/ˈhjuːmən laɪk/",
      pos: "adjective",
      meaning: "Giống con người, tự nhiên như con người",
      collocation: "human-like facial expressions / human-like intelligence",
      example: "Modern humanoid robots exhibit remarkably human-like facial expressions and mobility.",
      exampleVi: "Các robot hình người hiện đại thể hiện biểu cảm khuôn mặt và cử động giống con người một cách đáng kinh ngạc."
    },
    {
      id: 14,
      unit: 2,
      unitName: "Nhóm 2: Tương Tác & Hành Vi Người Máy",
      word: "Identity",
      ipa: "/aɪˈdentəti/",
      pos: "noun",
      meaning: "Danh tính, bản sắc riêng",
      collocation: "confirm identity / facial identity verification",
      example: "Facial verification protocols ensure that digital users confirm their identity securely.",
      exampleVi: "Các giao thức xác minh khuôn mặt đảm bảo người dùng kỹ thuật số xác nhận danh tính an toàn."
    },
    {
      id: 15,
      unit: 2,
      unitName: "Nhóm 2: Tương Tác & Hành Vi Người Máy",
      word: "Imitate",
      ipa: "/ˈɪmɪteɪt/",
      pos: "verb",
      meaning: "Bắt chước, mô phỏng hành vi/đặc điểm",
      collocation: "imitate human behavior / imitate biological neurons",
      example: "Neural networks attempt to imitate how biological neurons process sensory signals.",
      exampleVi: "Mạng nơ-ron cố gắng mô phỏng cách các tế bào nơ-ron sinh học xử lý các tín hiệu cảm giác."
    },
    {
      id: 16,
      unit: 2,
      unitName: "Nhóm 2: Tương Tác & Hành Vi Người Máy",
      word: "Observe",
      ipa: "/əbˈzɜːv/",
      pos: "verb",
      meaning: "Quan sát, theo dõi, tuân thủ",
      collocation: "observe traffic flow / observe safety rules",
      example: "Computer vision cameras observe traffic flow to optimize intersection signal timings.",
      exampleVi: "Camera thị giác máy tính quan sát lưu lượng giao thông để tối ưu hóa thời gian đèn tín hiệu tại các giao lộ."
    },
    {
      id: 17,
      unit: 2,
      unitName: "Nhóm 2: Tương Tác & Hành Vi Người Máy",
      word: "Personalised",
      ipa: "/ˈpɜːsənəlaɪzd/",
      pos: "adjective",
      meaning: "Được cá nhân hóa (phục vụ riêng cho từng cá nhân)",
      collocation: "personalised learning / personalised recommendations",
      example: "Educational platforms offer personalised learning schedules based on student performance.",
      exampleVi: "Các nền tảng giáo dục cung cấp lộ trình học tập được cá nhân hóa dựa trên kết quả của từng học sinh."
    },

    // NHÓM 3: VẬN HÀNH DỰ ÁN & ỨNG DỤNG THỰC TIỄN (8 TỪ)
    {
      id: 18,
      unit: 3,
      unitName: "Nhóm 3: Vận Hành Dự Án & Ứng Dụng",
      word: "Install",
      ipa: "/ɪnˈstɔːl/",
      pos: "verb",
      meaning: "Cài đặt, lắp đặt thiết bị hoặc phần mềm",
      collocation: "install server rack / install security software",
      example: "Technicians will install the new server rack in the data center this afternoon.",
      exampleVi: "Các kỹ thuật viên sẽ lắp đặt cụm máy chủ mới tại trung tâm dữ liệu vào chiều nay."
    },
    {
      id: 19,
      unit: 3,
      unitName: "Nhóm 3: Vận Hành Dự Án & Ứng Dụng",
      word: "Launch",
      ipa: "/lɔːntʃ/",
      pos: "verb / noun",
      meaning: "Ra mắt, khởi chạy sản phẩm/dự án",
      collocation: "launch an AI assistant / official product launch",
      example: "The tech startup plans to launch its conversational AI assistant next month.",
      exampleVi: "Công ty khởi nghiệp công nghệ lên kế hoạch ra mắt trợ lý AI đàm thoại vào tháng tới."
    },
    {
      id: 20,
      unit: 3,
      unitName: "Nhóm 3: Vận Hành Dự Án & Ứng Dụng",
      word: "Maintenance",
      ipa: "/ˈmeɪntənəns/",
      pos: "noun",
      meaning: "Sự bảo trì, bảo dưỡng định kỳ",
      collocation: "routine maintenance / regular software maintenance",
      example: "Autonomous assembly lines require regular software maintenance to prevent errors.",
      exampleVi: "Các dây chuyền lắp ráp tự động cần được bảo trì phần mềm định kỳ để ngăn ngừa lỗi phát sinh."
    },
    {
      id: 21,
      unit: 3,
      unitName: "Nhóm 3: Vận Hành Dự Án & Ứng Dụng",
      word: "Milestone",
      ipa: "/ˈmaɪlstəʊn/",
      pos: "noun",
      meaning: "Cột mốc quan trọng (trong quá trình phát triển)",
      collocation: "major milestone / achieve a milestone",
      example: "Beating world champions in strategy board games was a major milestone for AI research.",
      exampleVi: "Chiến thắng các nhà vô địch thế giới trong các trò chơi cờ chiến thuật là một cột mốc lịch sử đối với nghiên cứu AI."
    },
    {
      id: 22,
      unit: 3,
      unitName: "Nhóm 3: Vận Hành Dự Án & Ứng Dụng",
      word: "Portfolio",
      ipa: "/pɔːtˈfəʊliəʊ/",
      pos: "noun",
      meaning: "Hồ sơ năng lực, danh mục sản phẩm/dự án",
      collocation: "digital portfolio / project portfolio",
      example: "Graphic designers often showcase their AI-assisted digital portfolio online.",
      exampleVi: "Các nhà thiết kế đồ họa thường giới thiệu danh mục hồ sơ năng lực kỹ thuật số hỗ trợ bởi AI trên mạng."
    },
    {
      id: 23,
      unit: 3,
      unitName: "Nhóm 3: Vận Hành Dự Án & Ứng Dụng",
      word: "Practical",
      ipa: "/ˈpræktɪkl/",
      pos: "adjective",
      meaning: "Thực tế, mang tính ứng dụng cao",
      collocation: "practical application / practical solution",
      example: "Speech recognition software has found practical applications in hands-free driving.",
      exampleVi: "Phần mềm nhận dạng giọng nói đã tìm thấy nhiều ứng dụng thực tế trong chế độ lái xe rảnh tay."
    },
    {
      id: 24,
      unit: 3,
      unitName: "Nhóm 3: Vận Hành Dự Án & Ứng Dụng",
      word: "Provoke",
      ipa: "/prəˈvəʊk/",
      pos: "verb",
      meaning: "Kích thích, khơi gợi (phản ứng, suy nghĩ)",
      collocation: "provoke intense debates / provoke curiosity",
      example: "The rapid rise of generative tools continues to provoke intense debates on ethics.",
      exampleVi: "Sự trỗi dậy nhanh chóng của các công cụ tạo sinh tiếp tục khơi gợi những cuộc tranh luận gay gắt về đạo đức."
    },
    {
      id: 25,
      unit: 3,
      unitName: "Nhóm 3: Vận Hành Dự Án & Ứng Dụng",
      word: "Repetitive",
      ipa: "/rɪˈpetətɪv/",
      pos: "adjective",
      meaning: "Lặp đi lặp lại nhàm chán",
      collocation: "repetitive tasks / repetitive factory jobs",
      example: "Industrial robots are primarily used to take over tedious and repetitive assembly tasks.",
      exampleVi: "Robot công nghiệp chủ yếu được sử dụng để tiếp quản các tác vụ lắp ráp tẻ nhạt và lặp đi lặp lại."
    }
  ],

  // 2. CHUYÊN ĐỀ NGỮ PHÁP SAI KHIẾN (CAUSATIVE VERBS - TRỌNG TÂM LỚP 12)
  grammarModules: [
    {
      id: "mod-causative-active",
      title: "Chuyên đề 1: Thể Sai Khiến Chủ Động (HAVE vs GET)",
      rule: "have + O (người) + V-bare  |  get + O (người) + to-V",
      formula: "S + have + someone + do sth  vs  S + get + someone + to do sth",
      explanation: "Diễn tả hành động thuê, nhờ vả hoặc thuyết phục ai làm điều gì. Lưu ý 'HAVE' đi với động từ nguyên thể không to (V-bare), còn 'GET' bắt buộc đi với động từ có to (to-V).",
      examples: [
        { en: "The company had their engineers build a conversational chatbot.", vi: "Công ty đã nhờ các kỹ sư của họ xây dựng một chatbot đàm thoại. (HAVE + V-bare)" },
        { en: "The teacher got the students to design an AI project portfolio.", vi: "Giáo viên đã thuyết phục học sinh thiết kế hồ sơ năng lực dự án AI. (GET + to-V)" }
      ]
    },
    {
      id: "mod-causative-passive",
      title: "Chuyên đề 2: Thể Sai Khiến Bị Động (HAVE / GET + Vật + V3/ed)",
      rule: "have / get + O (vật / sự việc) + V3 / V-ed (+ by O)",
      formula: "S + have / get + something + done (by someone)",
      explanation: "Khi tân ngữ là VẬT (chịu sự tác động), cả HAVE và GET đều có chung công thức: đi với Quá khứ phân từ (V3/V-ed). Rất hay xuất hiện trong các câu hỏi ngữ pháp đề thi THPT Quốc Gia!",
      examples: [
        { en: "We should have our computer software upgraded immediately.", vi: "Chúng ta nên cho nâng cấp phần mềm máy tính ngay lập tức. (have + software + upgraded)" },
        { en: "The firm gets the server racks maintained every month.", vi: "Doanh nghiệp cho bảo trì các cụm máy chủ hàng tháng. (get + server racks + maintained)" }
      ]
    },
    {
      id: "mod-causative-make-let",
      title: "Chuyên đề 3: Cấu Trúc MAKE (Bắt buộc) & LET (Cho phép)",
      rule: "make + O + V-bare (khiến cho / bắt ai làm)  |  let + O + V-bare (cho phép ai làm)",
      formula: "S + make / let + O + V-bare (nguyên mẫu không to)",
      explanation: "Cả MAKE và LET trong câu chủ động đều đi với V-bare. Tuyệt đối không thêm 'to' sau MAKE/LET ở dạng chủ động. Riêng dạng bị động của MAKE: be made + to-V.",
      examples: [
        { en: "The unexpected milestone made the scientists celebrate enthusiastically.", vi: "Cột mốc bất ngờ đã khiến các nhà khoa học ăn mừng cuồng nhiệt." },
        { en: "The admin let the new staff install the digital platform.", vi: "Quản trị viên đã cho phép nhân viên mới cài đặt nền tảng số." }
      ]
    }
  ],

  // 3. COLLOCATION PAIRS (CẶP TỪ TỰ NHIÊN)
  collocationPairs: [
    { id: "c1", verb: "launch", noun: "an AI assistant", meaning: "ra mắt trợ lý AI" },
    { id: "c2", verb: "perform", noun: "routine maintenance", meaning: "tiến hành bảo trì định kỳ" },
    { id: "c3", verb: "reach", noun: "a major milestone", meaning: "đạt cột mốc quan trọng" },
    { id: "c4", verb: "provoke", noun: "intense debates", meaning: "khơi gợi tranh luận gay gắt" },
    { id: "c5", verb: "imitate", noun: "human behavior", meaning: "mô phỏng hành vi con người" },
    { id: "c6", verb: "process", noun: "massive data", meaning: "xử lý lượng dữ liệu khổng lồ" },
    { id: "c7", verb: "take over", noun: "repetitive tasks", meaning: "tiếp quản các tác vụ lặp đi lặp lại" },
    { id: "c8", verb: "recognize", noun: "hand gestures", meaning: "nhận diện các cử chỉ tay" }
  ],

  // 4. ODD ONE OUT PUZZLES (TÌM TỪ KHÁC LOẠI)
  oddOneOut: [
    {
      id: "odd1",
      words: ["Chatbot", "Platform", "Data", "Imitate"],
      oddIndex: 3,
      reason: "'Imitate' là động từ (verb), còn 'Chatbot', 'Platform', 'Data' đều là danh từ (noun)."
    },
    {
      id: "odd2",
      words: ["Advanced", "Digital", "Virtual", "Effortlessly"],
      oddIndex: 3,
      reason: "'Effortlessly' là trạng từ (adverb đuôi -ly), các từ còn lại là tính từ (adjective)."
    },
    {
      id: "odd3",
      words: ["Upgrade", "Install", "Launch", "Milestone"],
      oddIndex: 3,
      reason: "'Milestone' là danh từ chỉ cột mốc, trong khi 'Upgrade', 'Install', 'Launch' đều là các động từ kỹ thuật thao tác."
    },
    {
      id: "odd4",
      words: ["Human-like", "Repetitive", "Practical", "Evolution"],
      oddIndex: 3,
      reason: "'Evolution' là danh từ (sự tiến hóa), 3 từ còn lại đều là tính từ bổ nghĩa cho sự vật/hiện tượng."
    }
  ],

  // 5. WORD FAMILY TREES (CÂY TỪ LOẠI ĐA TẦNG)
  wordFamilyTrees: [
    {
      root: "EVOLUTION",
      vietnamese: "Sự tiến hóa, phát triển",
      forms: [
        { pos: "Verb", word: "evolve", ipa: "/ɪˈvɒlv/", meaning: "tiến hóa, phát triển dần dần" },
        { pos: "Noun", word: "evolution", ipa: "/ˌiːvəˈluːʃn/", meaning: "sự tiến hóa, bước phát triển" },
        { pos: "Adjective", word: "evolutionary", ipa: "/ˌiːvəˈluːʃənri/", meaning: "thuộc về tiến hóa" },
        { pos: "Noun (Person)", word: "evolutionist", ipa: "/ˌiːvəˈluːʃənɪst/", meaning: "nhà thuyết tiến hóa" }
      ]
    },
    {
      root: "IMITATE",
      vietnamese: "Bắt chước, mô phỏng",
      forms: [
        { pos: "Verb", word: "imitate", ipa: "/ˈɪmɪteɪt/", meaning: "mô phỏng, bắt chước" },
        { pos: "Noun", word: "imitation", ipa: "/ˌɪmɪˈteɪʃn/", meaning: "sự mô phỏng, đồ giả/nhái" },
        { pos: "Adjective", word: "imitative", ipa: "/ˈɪmɪtətɪv/", meaning: "có tính chất bắt chước" },
        { pos: "Adjective (Opposite)", word: "inimitable", ipa: "/ɪˈnɪmɪtəbl/", meaning: "độc nhất vô nhị, không thể bắt chước" }
      ]
    },
    {
      root: "MAINTENANCE",
      vietnamese: "Sự bảo trì, duy trì",
      forms: [
        { pos: "Verb", word: "maintain", ipa: "/meɪnˈteɪn/", meaning: "duy trì, bảo dưỡng" },
        { pos: "Noun", word: "maintenance", ipa: "/ˈmeɪntənəns/", meaning: "sự bảo dưỡng, bảo trì máy móc" },
        { pos: "Adjective", word: "maintainable", ipa: "/meɪnˈteɪnəbl/", meaning: "có thể bảo trì/duy trì được" }
      ]
    },
    {
      root: "PRACTICAL",
      vietnamese: "Thực tế, mang tính ứng dụng",
      forms: [
        { pos: "Noun / Verb", word: "practice / practise", ipa: "/ˈpræktɪs/", meaning: "sự thực hành / luyện tập" },
        { pos: "Adjective", word: "practical", ipa: "/ˈpræktɪkl/", meaning: "mang tính thực tế, thực tiễn" },
        { pos: "Adverb", word: "practically", ipa: "/ˈpræktɪkli/", meaning: "hầu như, về mặt thực tế" },
        { pos: "Noun", word: "practicality", ipa: "/ˌpræktɪˈkæləti/", meaning: "tính thực tiễn, tính khả thi" }
      ]
    }
  ],

  // 6. ACTIVE RECALL RIDDLES (ĐOÁN CHỮ SIÊU TỐC)
  activeRecall: [
    {
      id: "ar1",
      clue: "An automated conversational agent that assists online customers 24/7.",
      answer: "CHATBOT",
      hint: "Bắt đầu bằng chữ 'C', 7 chữ cái"
    },
    {
      id: "ar2",
      clue: "A physical movement of the hand or body used to give commands to smart devices.",
      answer: "GESTURE",
      hint: "Bắt đầu bằng chữ 'G', 7 chữ cái"
    },
    {
      id: "ar3",
      clue: "A significant stage or event in the development of a person, project, or technology.",
      answer: "MILESTONE",
      hint: "Bắt đầu bằng chữ 'M', 9 chữ cái (Cột mốc)"
    },
    {
      id: "ar4",
      clue: "To copy or reproduce the behavior, style, or appearance of someone or something.",
      answer: "IMITATE",
      hint: "Động từ bắt đầu bằng 'I', 7 chữ cái"
    },
    {
      id: "ar5",
      clue: "Describing something that exists only in computer software or the online realm, not physically.",
      answer: "VIRTUAL",
      hint: "Tính từ bắt đầu bằng 'V', 7 chữ cái"
    }
  ],

  // 7. SENTENCE WRITING CHALLENGES
  sentenceWriting: [
    {
      id: "sw1",
      targetWord: "Advanced",
      prompt: "Hãy viết 1 câu tiếng Anh có từ 'advanced' kết hợp cấu trúc sai khiến 'have + O + V3/ed' (ví dụ: Công ty cho lắp đặt hệ thống máy tính tiên tiến).",
      keywords: ["advanced", "have", "had"]
    },
    {
      id: "sw2",
      targetWord: "Chatbot",
      prompt: "Hãy viết 1 câu tiếng Anh có từ 'chatbot' miêu tả việc hỗ trợ khách hàng giải đáp thắc mắc.",
      keywords: ["chatbot", "customer", "inquiries", "help", "support"]
    },
    {
      id: "sw3",
      targetWord: "Maintenance",
      prompt: "Hãy viết 1 câu tiếng Anh có từ 'maintenance' kết hợp với cấu trúc 'get + sth + done' (cho bảo trì máy móc).",
      keywords: ["maintenance", "get", "got"]
    },
    {
      id: "sw4",
      targetWord: "Repetitive",
      prompt: "Hãy viết 1 câu tiếng Anh miêu tả robot đảm nhận các công việc lặp đi lặp lại ('repetitive tasks').",
      keywords: ["repetitive", "robot", "robots", "tasks"]
    }
  ]
};
