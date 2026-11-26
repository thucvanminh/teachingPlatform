/**
 * DATA MODEL - UNIT 5: GLOBAL WARMING
 * Tiếng Anh 11 - Chương trình Global Success (Pages 52 - 61)
 * Học sinh: Bạn Thái (Lớp 11) | Hướng dẫn: Thầy Thức
 * Trọng tâm: Present & Past Participle Clauses (Mệnh đề phân từ) + 24 Từ vựng cốt lõi
 */

const LECTURE_DATA = {
  meta: {
    unit: "Unit 5",
    title: "Global Warming",
    subject: "Tiếng Anh 11 - Global Success",
    student: "Bạn Thái",
    teacher: "Thầy Thức",
    target: "Mục tiêu 8.5+ Giữa Kì & THPT Quốc Gia",
    lastUpdated: "19/11/2026"
  },

  // ========================================================
  // 24 TỪ VỰNG CỐT LÕI UNIT 5 (GLOBAL WARMING)
  // ========================================================
  vocabList: [
    // NHÓM 1: NGUỒN NĂNG LƯỢNG & KHÍ PHÁT THẢI (1-8)
    {
      id: 1,
      word: "fossil fuel",
      ipa: "/ˈfɒsl fjuːəl/",
      type: "noun phrase",
      unit: 1,
      unitName: "Nguồn Năng Lượng & Khí Thải",
      meaning: "nhiên liệu hóa thạch (than đá, dầu mỏ, khí đốt)",
      collocation: "burn fossil fuels, reliance on fossil fuels",
      example: "Burning fossil fuels releases massive amounts of carbon dioxide into the air.",
      exampleVi: "Việc đốt nhiên liệu hóa thạch thải ra lượng lớn khí carbon dioxide vào không khí."
    },
    {
      id: 2,
      word: "coal",
      ipa: "/kəʊl/",
      type: "noun",
      unit: 1,
      unitName: "Nguồn Năng Lượng & Khí Thải",
      meaning: "than đá (loại nhiên liệu hóa thạch gây ô nhiễm nặng nhất)",
      collocation: "coal-fired power plant, reduce the use of coal",
      example: "Many countries plan to stop building new coal power stations.",
      exampleVi: "Nhiều quốc gia lên kế hoạch ngừng xây dựng các nhà máy nhiệt điện than mới."
    },
    {
      id: 3,
      word: "renewable",
      ipa: "/rɪˈnjuːəbl/",
      type: "adjective",
      unit: 1,
      unitName: "Nguồn Năng Lượng & Khí Thải",
      meaning: "có thể tái tạo (năng lượng gió, mặt trời không bị cạn kiệt)",
      collocation: "renewable energy sources, renewable resources",
      example: "Wind and solar power are clean, renewable sources of energy.",
      exampleVi: "Năng lượng gió và mặt trời là các nguồn năng lượng sạch, có thể tái tạo."
    },
    {
      id: 4,
      word: "release",
      ipa: "/rɪˈliːs/",
      type: "verb / noun",
      unit: 1,
      unitName: "Nguồn Năng Lượng & Khí Thải",
      meaning: "thải ra, phóng thích; sự thải khí",
      collocation: "release harmful gases, release carbon into the atmosphere",
      example: "Vehicles release huge quantities of exhaust fumes every single day.",
      exampleVi: "Phương tiện giao thông thải ra lượng khói thải khổng lồ mỗi ngày."
    },
    {
      id: 5,
      word: "waste",
      ipa: "/weɪst/",
      type: "noun / verb",
      unit: 1,
      unitName: "Nguồn Năng Lượng & Khí Thải",
      meaning: "chất thải, rác thải; lãng phí",
      collocation: "solid waste, landfill waste, toxic industrial waste",
      example: "The world produces more than two billion tonnes of solid waste each year.",
      exampleVi: "Thế giới tạo ra hơn hai tỷ tấn rác thải rắn mỗi năm."
    },
    {
      id: 6,
      word: "emission",
      ipa: "/iˈmɪʃn/",
      type: "noun",
      unit: 1,
      unitName: "Nguồn Năng Lượng & Khí Thải",
      meaning: "sự phát thải, lượng khí thải (động từ: emit)",
      collocation: "cut carbon emissions, greenhouse gas emissions",
      example: "We must reduce greenhouse gas emissions by fifty percent before 2030.",
      exampleVi: "Chúng ta phải cắt giảm 50% lượng khí thải nhà kính trước năm 2030."
    },
    {
      id: 7,
      word: "greenhouse gas",
      ipa: "/ˈɡriːnhaʊs ɡæs/",
      type: "noun phrase",
      unit: 1,
      unitName: "Nguồn Năng Lượng & Khí Thải",
      meaning: "khí nhà kính (gây giữ nhiệt trong bầu khí quyển)",
      collocation: "concentration of greenhouse gases, trap heat",
      example: "Greenhouse gases trap heat from the sun and warm the Earth.",
      exampleVi: "Các loại khí nhà kính giữ lại nhiệt lượng từ mặt trời và làm Trái Đất ấm lên."
    },
    {
      id: 8,
      word: "methane",
      ipa: "/ˈmiːθeɪn/",
      type: "noun",
      unit: 1,
      unitName: "Nguồn Năng Lượng & Khí Thải",
      meaning: "khí mê-tan (khí nhà kính giữ nhiệt mạnh gấp nhiều lần CO2)",
      collocation: "methane emissions, release methane into air",
      example: "Methane is a dangerous greenhouse gas that comes from farming and landfills.",
      exampleVi: "Mê-tan là khí nhà kính nguy hại sinh ra từ hoạt động nông nghiệp và bãi rác."
    },

    // NHÓM 2: HIỆN TƯỢNG NÓNG LÊN TOÀN CẦU & KHÍ QUYỂN (9-16)
    {
      id: 9,
      word: "carbon footprint",
      ipa: "/ˌkɑːbən ˈfʊtprɪnt/",
      type: "noun phrase",
      unit: 2,
      unitName: "Khí Quyển & Nóng Lên Toàn Cầu",
      meaning: "dấu chân carbon (tổng lượng khí nhà kính một người/tổ chức thải ra)",
      collocation: "reduce one's carbon footprint, calculate personal carbon footprint",
      example: "Cycling to school is a simple way to reduce your daily carbon footprint.",
      exampleVi: "Đi xe đạp đến trường là một cách đơn giản để giảm dấu chân carbon hàng ngày của em."
    },
    {
      id: 10,
      word: "global warming",
      ipa: "/ˌɡləʊbl ˈwɔːmɪŋ/",
      type: "noun phrase",
      unit: 2,
      unitName: "Khí Quyển & Nóng Lên Toàn Cầu",
      meaning: "sự nóng lên toàn cầu",
      collocation: "combat global warming, effects of global warming",
      example: "Global warming causes glaciers to melt and sea levels to rise dangerously.",
      exampleVi: "Hiện tượng nóng lên toàn cầu làm băng tan và mực nước biển dâng cao nguy hiểm."
    },
    {
      id: 11,
      word: "atmosphere",
      ipa: "/ˈætməsfɪə(r)/",
      type: "noun",
      unit: 2,
      unitName: "Khí Quyển & Nóng Lên Toàn Cầu",
      meaning: "bầu khí quyển (lớp khí bao quanh Trái Đất)",
      collocation: "escape into the atmosphere, upper atmosphere",
      example: "Carbon dioxide traps heat and stays in the atmosphere for hundreds of years.",
      exampleVi: "Khí carbon dioxide giữ nhiệt và tồn tại trong bầu khí quyển hàng trăm năm."
    },
    {
      id: 12,
      word: "absorb",
      ipa: "/əbˈzɔːb/",
      type: "verb",
      unit: 2,
      unitName: "Khí Quyển & Nóng Lên Toàn Cầu",
      meaning: "hấp thụ, hút vào (nhiệt độ, CO2, nước)",
      collocation: "absorb carbon dioxide, absorb heat from sunlight",
      example: "Oceans and deep forests absorb a huge amount of carbon from the air.",
      exampleVi: "Đại dương và những cánh rừng rậm hấp thụ một lượng carbon khổng lồ từ không khí."
    },
    {
      id: 13,
      word: "balance",
      ipa: "/ˈbæləns/",
      type: "noun / verb",
      unit: 2,
      unitName: "Khí Quyển & Nóng Lên Toàn Cầu",
      meaning: "sự cân bằng; làm cân bằng (cân bằng sinh thái)",
      collocation: "ecological balance, achieve a balance between",
      example: "Human activities have upset the natural balance of our global climate.",
      exampleVi: "Hoạt động của con người đã làm đảo lộn sự cân bằng tự nhiên của khí hậu toàn cầu."
    },
    {
      id: 14,
      word: "heat-trapping",
      ipa: "/ˈhiːt træpɪŋ/",
      type: "adjective",
      unit: 2,
      unitName: "Khí Quyển & Nóng Lên Toàn Cầu",
      meaning: "có tính giữ nhiệt, bẫy nhiệt",
      collocation: "heat-trapping pollutants, heat-trapping blanket",
      example: "Carbon dioxide forms a heat-trapping blanket around the Earth.",
      exampleVi: "Khí CO2 tạo thành một lớp chăn giữ nhiệt bao bọc quanh Trái Đất."
    },
    {
      id: 15,
      word: "severe",
      ipa: "/sɪˈvɪə(r)/",
      type: "adjective",
      unit: 2,
      unitName: "Khí Quyển & Nóng Lên Toàn Cầu",
      meaning: "nghiêm trọng, dữ dội, khốc liệt",
      collocation: "severe droughts, severe consequences of pollution",
      example: "The province suffered from severe water shortages during the dry season.",
      exampleVi: "Tỉnh này đã phải hứng chịu tình trạng thiếu nước nghiêm trọng trong mùa khô."
    },
    {
      id: 16,
      word: "extreme weather",
      ipa: "/ɪkˌstriːm ˈweðə(r)/",
      type: "noun phrase",
      unit: 2,
      unitName: "Khí Quyển & Nóng Lên Toàn Cầu",
      meaning: "thời tiết cực đoan (bão mạnh, sóng nhiệt, hạn hán kéo dài)",
      collocation: "extreme weather events, frequency of extreme weather",
      example: "Climate scientists warn that extreme weather events will occur more often.",
      exampleVi: "Các nhà khoa học khí hậu cảnh báo rằng các hiện tượng thời tiết cực đoan sẽ xảy ra thường xuyên hơn."
    },

    // NHÓM 3: HẬU QUẢ, HỆ SINH THÁI & GIẢI PHÁP (17-24)
    {
      id: 17,
      word: "deforestation",
      ipa: "/diːˌfɒrɪˈsteɪʃn/",
      type: "noun",
      unit: 3,
      unitName: "Hậu Quả & Phát Triển Bền Vững",
      meaning: "nạn phá rừng, sự tàn phá rừng",
      collocation: "stop deforestation, widespread deforestation",
      example: "Deforestation in tropical areas releases millions of tonnes of stored carbon.",
      exampleVi: "Nạn phá rừng ở các vùng nhiệt đới thải ra hàng triệu tấn carbon đã tích trữ."
    },
    {
      id: 18,
      word: "cut down",
      ipa: "/kʌt daʊn/",
      type: "phrasal verb",
      unit: 3,
      unitName: "Hậu Quả & Phát Triển Bền Vững",
      meaning: "chặt hạ (cây cối); cắt giảm (chi tiêu, khí thải)",
      collocation: "cut down trees, cut down on energy consumption",
      example: "Thousands of trees were cut down to make room for new cattle farms.",
      exampleVi: "Hàng ngàn cây gỗ đã bị chặt hạ để lấy chỗ cho các trang trại chăn nuôi gia súc."
    },
    {
      id: 19,
      word: "disrupt",
      ipa: "/dɪsˈrʌpt/",
      type: "verb",
      unit: 3,
      unitName: "Hậu Quả & Phát Triển Bền Vững",
      meaning: "làm gián đoạn, làm đảo lộn, phá vỡ (chuỗi thức ăn, chu kỳ mùa)",
      collocation: "disrupt the ecosystem, disrupt farming seasons",
      example: "Rising ocean temperatures disrupt marine food chains severely.",
      exampleVi: "Nhiệt độ đại dương tăng cao phá vỡ nghiêm trọng chuỗi thức ăn của sinh vật biển."
    },
    {
      id: 20,
      word: "consequence",
      ipa: "/ˈkɒnsɪkwəns/",
      type: "noun",
      unit: 3,
      unitName: "Hậu Quả & Phát Triển Bền Vững",
      meaning: "hậu quả, hệ quả (thường là tiêu cực)",
      collocation: "suffer the consequences, catastrophic consequences",
      example: "Rising sea levels are a direct consequence of global temperature increases.",
      exampleVi: "Nước biển dâng là một hệ quả trực tiếp của sự gia tăng nhiệt độ toàn cầu."
    },
    {
      id: 21,
      word: "catastrophe",
      ipa: "/kəˈtæstrəfi/",
      type: "noun",
      unit: 3,
      unitName: "Hậu Quả & Phát Triển Bền Vững",
      meaning: "thảm họa, tai ương thảm khốc",
      collocation: "environmental catastrophe, avoid a climate catastrophe",
      example: "Without fast action, the Earth will face an unprecedented ecological catastrophe.",
      exampleVi: "Nếu không hành động nhanh chóng, Trái Đất sẽ đối mặt với một thảm họa sinh thái chưa từng thấy."
    },
    {
      id: 22,
      word: "sustainable",
      ipa: "/səˈsteɪnəbl/",
      type: "adjective",
      unit: 3,
      unitName: "Hậu Quả & Phát Triển Bền Vững",
      meaning: "bền vững (thân thiện với môi trường, không làm kiệt quệ tài nguyên)",
      collocation: "sustainable development, sustainable lifestyle",
      example: "Solar panels provide a sustainable way to generate clean electricity.",
      exampleVi: "Các tấm pin mặt trời cung cấp một phương thức bền vững để tạo ra điện sạch."
    },
    {
      id: 23,
      word: "pollutant",
      ipa: "/pəˈluːtənt/",
      type: "noun",
      unit: 3,
      unitName: "Hậu Quả & Phát Triển Bền Vững",
      meaning: "chất gây ô nhiễm (khí thải, hóa chất độc hại)",
      collocation: "air pollutants, chemical pollutants in water",
      example: "Harmful pollutants from diesel engines can damage human lungs.",
      exampleVi: "Các chất gây ô nhiễm độc hại từ động cơ diesel có thể gây hại cho phổi con người."
    },
    {
      id: 24,
      word: "ecology",
      ipa: "/iˈkɒlədʒi/",
      type: "noun",
      unit: 3,
      unitName: "Hậu Quả & Phát Triển Bền Vững",
      meaning: "sinh thái học, hệ sinh thái (tính từ: ecological)",
      collocation: "threat to local ecology, restore ecology",
      example: "Oil spills cause irreparable long-term damage to fragile coastal ecology.",
      exampleVi: "Sự cố tràn dầu gây ra thiệt hại lâu dài không thể khắc phục cho hệ sinh thái ven biển mong manh."
    }
  ],

  // ========================================================
  // 5 CHUYÊN ĐỀ NGỮ PHÁP CHUYÊN SÂU & QUICK QUIZ DRILLS
  // ========================================================
  grammarModules: [
    {
      id: 1,
      title: "Chuyên Đề 1: Mệnh Đề Phân Từ Hiện Tại (V-ing) Chỉ Lý Do & Nguyên Nhân",
      formula: "V-ing + (O), S + V (chính) ...",
      equivalent: "Because / Since / As + S + V(chủ động) ➔ V-ing, S + V",
      rules: [
        "Điều kiện tiên quyết: Hai mệnh đề BẮT BUỘC phải CÙNG MỘT CHỦ NGỮ (S1 = S2).",
        "Khi mệnh đề phụ diễn tả nguyên nhân mang nghĩa CHỦ ĐỘNG, ta lược bỏ liên từ (Because, Since, As) và chủ ngữ, chuyển động từ thành V-ing.",
        "Dạng phủ định: Đặt trực tiếp 'Not' ngay trước V-ing ➔ Not + V-ing, S + V."
      ],
      traps: "Bẫy danh từ đối lập! Nếu chủ ngữ 2 mệnh đề khác nhau mà rút gọn V-ing sẽ tạo thành 'Dangling Participle' (Phân từ lơ lửng - sai ngữ pháp nặng).",
      examples: [
        {
          en: "Because greenhouse gases trap too much heat, they cause global temperatures to rise.",
          vi: "Bởi vì khí nhà kính giữ quá nhiều nhiệt, chúng khiến nhiệt độ toàn cầu tăng lên.",
          short: "➔ Trapping too much heat, greenhouse gases cause global temperatures to rise."
        },
        {
          en: "Because many students realized the danger of plastic waste, they brought reusable bottles.",
          vi: "Vì nhiều học sinh nhận thức được sự nguy hiểm của rác thải nhựa, các em đã mang theo bình nước dùng lại.",
          short: "➔ Realizing the danger of plastic waste, many students brought reusable bottles."
        }
      ],
      quickQuiz: {
        question: "______ the devastating consequences of global warming, the government decided to ban coal power plants.",
        options: [
          { id: "A", text: "Recognized" },
          { id: "B", text: "Recognizing" },
          { id: "C", text: "To recognize" },
          { id: "D", text: "Recognize" }
        ],
        correct: "B",
        explanation: "Mệnh đề phụ mang nghĩa chủ động chỉ nguyên nhân ('Bởi vì chính phủ nhận thức được...'). Cùng chủ ngữ 'the government'. Rút gọn thành V-ing: 'Recognizing'."
      }
    },

    {
      id: 2,
      title: "Chuyên Đề 2: Mệnh Đề Phân Từ Hiện Tại (V-ing) Chỉ Thời Gian & Hành Động Đồng Thời",
      formula: "V-ing + (O), S + V (quá khứ/hiện tại) ...",
      equivalent: "While / When + S + V(tiếp diễn/chủ động) ➔ V-ing, S + V",
      rules: [
        "Dùng khi hai hành động của cùng một chủ ngữ diễn ra đồng thời (xảy ra cùng một lúc).",
        "Dùng khi một hành động ngắn xảy ra ngay lập tức sau hành động kia (chuỗi hành động nối tiếp).",
        "Có thể giữ lại liên từ 'While / When' trước V-ing để nhấn mạnh: While walking... = Walking..."
      ],
      traps: "Tuyệt đối không dùng was/were trước V-ing khi đứng ở mệnh đề rút gọn đầu câu (VD: 'Was walking on the beach, I saw...' ➔ SAI, phải sửa thành 'Walking on the beach, I saw...').",
      examples: [
        {
          en: "While they were walking along the polluted river, the volunteers picked up tons of plastic bottles.",
          vi: "Trong khi đi dọc con sông bị ô nhiễm, các tình nguyện viên đã nhặt hàng tấn chai nhựa.",
          short: "➔ Walking along the polluted river, the volunteers picked up tons of plastic bottles."
        },
        {
          en: "When the forest ranger saw the spreading bushfire, he called the emergency helicopter immediately.",
          vi: "Khi người kiểm lâm nhìn thấy đám cháy rừng lan rộng, anh ấy đã gọi trực thăng cứu hộ ngay lập tức.",
          short: "➔ Seeing the spreading bushfire, the forest ranger called the emergency helicopter immediately."
        }
      ],
      quickQuiz: {
        question: "Tìm và sửa 01 lỗi sai trong câu: 'Was walking (A) through the pine forest (B), the eco-tourists noticed (C) several fallen trees (D).'",
        options: [
          { id: "A", text: "Was walking ➔ Sửa thành: Walking" },
          { id: "B", text: "through ➔ Sửa thành: across" },
          { id: "C", text: "noticed ➔ Sửa thành: notice" },
          { id: "D", text: "fallen ➔ Sửa thành: falling" }
        ],
        correct: "A",
        explanation: "Mệnh đề phân từ rút gọn đầu câu không được chứa to-be 'Was'. Phải dùng phân từ hiện tại độc lập: 'Walking through the pine forest...'"
      }
    },

    {
      id: 3,
      title: "Chuyên Đề 3: Mệnh Đề Phân Từ Quá Khứ (V3/ed) Mang Nghĩa Bị Động",
      formula: "(Not) + V3/ed + (by O), S + V ...",
      equivalent: "Because / As / If + S + be + (not) + V3/ed ➔ (Not) V3/ed, S + V",
      rules: [
        "Mệnh đề mang nghĩa BỊ ĐỘNG (Passive Voice): Chủ ngữ là người/vật tiếp nhận hành động.",
        "Rút gọn toàn bộ 'Because/If + S + be', chỉ giữ lại Động từ quá khứ phân từ (V3/ed).",
        "Dạng phủ định: Đặt trực tiếp 'Not' ngay trước V3/ed ➔ Not + V3/ed, S + V (VD SGK: Not kept cool in hot weather, farm animals can suffer from heat stress).",
        "Diễn tả nguyên nhân bị động (Vì bị/được...) hoặc điều kiện bị động (Nếu được/bị...)."
      ],
      traps: "Phân biệt V-ing vs V3/ed: Hãy tự hỏi chủ ngữ chính ở vế sau tự thực hiện hành động (Active ➔ V-ing) hay bị tác động bởi hành động (Passive ➔ V3/ed).",
      examples: [
        {
          en: "Because many young people were deeply worried about climate catastrophe, they organized a strike.",
          vi: "Bởi vì rất nhiều người trẻ lo lắng sâu sắc về thảm họa khí hậu, họ đã tổ chức tuần hành.",
          short: "➔ Worried about climate catastrophe, many young people organized a strike."
        },
        {
          en: "If fossil fuels are burnt carelessly for energy, they release toxic gases into the atmosphere.",
          vi: "Nếu bị đốt bất cẩn để lấy năng lượng, nhiên liệu hóa thạch sẽ giải phóng khí độc vào khí quyển.",
          short: "➔ Burnt carelessly for energy, fossil fuels release toxic gases into the atmosphere."
        },
        {
          en: "If farm animals are not kept cool in hot weather, they can suffer from heat stress.",
          vi: "Nếu vật nuôi không được giữ mát trong thời tiết nắng nóng, chúng có thể bị sốc nhiệt.",
          short: "➔ Not kept cool in hot weather, farm animals can suffer from heat stress."
        }
      ],
      quickQuiz: {
        question: "______ cool in hot weather, farm animals can easily suffer from heat stress.",
        options: [
          { id: "A", text: "Not keeping" },
          { id: "B", text: "Not kept" },
          { id: "C", text: "Didn't keep" },
          { id: "D", text: "To not keep" }
        ],
        correct: "B",
        explanation: "Điều kiện bị động phủ định ('If farm animals are not kept cool...'). Bỏ 'If + chủ ngữ + are', đặt 'Not' ngay trước quá khứ phân từ 'kept' ➔ 'Not kept'."
      }
    },

    {
      id: 4,
      title: "Chuyên Đề 4: Bẫy Phân Từ Lơ Lửng (Dangling Participles) & Phân Hóa Điểm 8.5+",
      formula: "V-ing / V3/ed, [Chủ ngữ BẮT BUỘC phải là thực thể làm ra hoặc chịu hành động đó]",
      equivalent: "Sai lầm: Rút gọn mệnh đề nhưng chủ ngữ vế sau lại là vật vô tri vô giác không thể làm hành động.",
      rules: [
        "Quy tắc vàng: Đọc mệnh đề rút gọn đầu tiên, sau đó NHÌN NGAY vào Chủ ngữ đứng sau dấu phẩy.",
        "Nếu Chủ ngữ đứng sau dấu phẩy KHÔNG THỂ thực hiện hành động ở đầu câu ➔ CÂU ĐÓ SAI NGỮ PHÁP (Dangling Participle).",
        "Để sửa câu lơ lửng: Hoặc đổi chủ ngữ mệnh đề chính thành chủ thể thực hiện hành động, hoặc viết lại mệnh đề phụ đầy đủ liên từ + chủ ngữ."
      ],
      traps: "Đề thi thường cho: 'Walking in the park, the air felt very fresh.' ➔ SAI vì 'the air' không thể tự đi bộ! Sửa thành: 'Walking in the park, we felt the fresh air.'",
      examples: [
        {
          en: "❌ Burning fossil fuels, severe air pollution is caused. (Sai: ô nhiễm không thể tự đốt nhiên liệu).",
          vi: "Sửa lại:",
          short: "✅ Burning fossil fuels, factories cause severe air pollution."
        },
        {
          en: "❌ Flying over the Amazon, widespread deforestation could be seen. (Sai: nạn phá rừng không biết bay).",
          vi: "Sửa lại:",
          short: "✅ Flying over the Amazon, researchers saw widespread deforestation."
        }
      ],
      quickQuiz: {
        question: "Câu nào dưới đây đúng ngữ pháp và KHÔNG bị lỗi phân từ lơ lửng (Dangling Participle)?",
        options: [
          { id: "A", text: "Walking along the riverbank, thousands of dead fish were found by us." },
          { id: "B", text: "Walking along the riverbank, we found thousands of dead fish floating." },
          { id: "C", text: "Walking along the riverbank, the smell of dead fish was terrible." },
          { id: "D", text: "Walking along the riverbank, it shocked the tourists." }
        ],
        correct: "B",
        explanation: "Chủ ngữ đứng sau dấu phẩy phải là 'we' (chúng tôi là người đi bộ dọc bờ sông). Các câu A (dead fish), C (the smell), D (it) đều là bẫy phân từ lơ lửng sai ngữ pháp."
      }
    },

    {
      id: 5,
      title: "Chuyên Đề 5: 5 Dạng Viết Lại Câu Kinh Điển Dùng Present & Past Participle Clauses",
      formula: "1. Because/Since ➔ (Not) V-ing | 2. If/Because be V3 ➔ (Not) V3 | 3. While/When ➔ V-ing | 4-5. MĐQH ➔ V-ing/V3",
      equivalent: "Biến đổi câu phức 2 mệnh đề thành 1 câu đơn chứa cụm phân từ tinh gọn, chuẩn SGK Tiếng Anh 11.",
      rules: [
        "Dạng 1 (Nguyên nhân chủ động): Because S + (not) + V ➔ (Not) V-ing, S + V.",
        "Dạng 2 (Nguyên nhân/Điều kiện bị động): If/Because S + be + (not) + V3 ➔ (Not) V3, S + V.",
        "Dạng 3 (Hai hành động đồng thời / liên tiếp của 1 người): While/When S + V ➔ V-ing, S + V | Minh closed the book and turned off the lamp ➔ Closing the book, Minh turned off the lamp.",
        "Dạng 4 (Rút gọn mệnh đề quan hệ chủ động): The gases which trap heat ➔ The gases trapping heat.",
        "Dạng 5 (Rút gọn mệnh đề quan hệ bị động): Energy which is produced from solar panels ➔ Energy produced from solar panels."
      ],
      traps: "Khi viết lại câu, phải kiểm tra kỹ thì của động từ và chủ ngữ của hai vế. Không được làm biến đổi nghĩa gốc của câu.",
      examples: [
        {
          en: "As scientists understand the mechanism of heat-trapping gases, they can predict climate changes.",
          vi: "Vì các nhà khoa học hiểu cơ chế của khí giữ nhiệt, họ có thể dự báo các biến đổi khí hậu.",
          short: "➔ Understanding the mechanism of heat-trapping gases, scientists can predict climate changes."
        },
        {
          en: "The conference which was held in Paris set strict emission targets for all nations.",
          vi: "Hội nghị được tổ chức tại Paris đã đặt ra các mục tiêu phát thải nghiêm ngặt cho mọi quốc gia.",
          short: "➔ Held in Paris, the conference set strict emission targets for all nations."
        }
      ],
      quickQuiz: {
        question: "Viết lại câu sau dùng Mệnh đề phân từ: 'Because Vietnam has a long coastline, it is vulnerable to sea level rise.'",
        options: [
          { id: "A", text: "Having a long coastline, Vietnam is vulnerable to sea level rise." },
          { id: "B", text: "Had a long coastline, Vietnam is vulnerable to sea level rise." },
          { id: "C", text: "Vietnam having a long coastline, vulnerable to sea level rise." },
          { id: "D", text: "To have a long coastline, Vietnam is vulnerable to sea level rise." }
        ],
        correct: "A",
        explanation: "Mệnh đề nguyên nhân chủ động 'Because Vietnam has...' được rút gọn bằng Present Participle 'Having a long coastline, Vietnam is...'. Phương án A là đáp án chính xác."
      }
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LECTURE_DATA;
}
