/**
 * DỮ LIỆU BÀI GIẢNG TƯƠNG TÁC: UNIT 4 - URBANISATION
 * Tiếng Anh 12 Global Success (SGK Trang 48-59 & SBT Trang 44-52)
 * Soạn riêng cho: Bạn Nam Việt (Lớp 12 - Mục tiêu 7+ THPTQG)
 * Hướng dẫn & Bản quyền: Thầy Thức
 */

const LECTURE_DATA = {
  title: "Cẩm Nang Tri Thức & 15 Từ Vựng Cốt Lõi Unit 4: Urbanisation",
  subject: "Tiếng Anh 12 (Global Success - Unit 4)",
  teacher: "Thầy Thức",

  // 1. 15 TỪ VỰNG CỐT LÕI UNIT 4 (SGK TRANG 48-59 & GLOSSARY TRANG 149-150)
  vocabList: [
    {
      id: 1,
      unit: 1,
      unitName: "Nhóm 1: Quy Mô & Thay Đổi Đô Thị",
      word: "urban",
      ipa: "/ˈɜːbən/",
      pos: "adjective",
      meaning: "thuộc về đô thị, thành thị",
      collocation: "urban areas / urban population / urban development",
      example: "More and more young people want to live in urban areas nowadays.",
      exampleVi: "Ngày nay ngày càng có nhiều người trẻ muốn sống ở các khu vực đô thị."
    },
    {
      id: 2,
      unit: 1,
      unitName: "Nhóm 1: Quy Mô & Thay Đổi Đô Thị",
      word: "expand",
      ipa: "/ɪkˈspænd/",
      pos: "verb",
      meaning: "mở rộng (về diện tích, quy mô)",
      collocation: "expand into a city / expand rapidly",
      example: "Over the years, Ha Noi has gradually expanded to over 3,000 square kilometres.",
      exampleVi: "Qua nhiều năm, Hà Nội đã dần mở rộng lên hơn 3.000 km vuông."
    },
    {
      id: 3,
      unit: 1,
      unitName: "Nhóm 1: Quy Mô & Thay Đổi Đô Thị",
      word: "gradually",
      ipa: "/ˈɡrædʒuəli/",
      pos: "adverb",
      meaning: "dần dần, từ từ (theo thời gian)",
      collocation: "gradually expand / increase gradually",
      example: "The urban population has increased gradually over the past twenty years.",
      exampleVi: "Dân số thành thị đã tăng lên dần dần trong suốt hai mươi năm qua."
    },
    {
      id: 4,
      unit: 1,
      unitName: "Nhóm 1: Quy Mô & Thay Đổi Đô Thị",
      word: "rapidly",
      ipa: "/ˈræpɪdli/",
      pos: "adverb",
      meaning: "rất nhanh, với tốc độ cao",
      collocation: "grow rapidly / increase rapidly",
      example: "House prices in big cities are increasing rapidly because many people want to buy homes.",
      exampleVi: "Giá nhà ở các thành phố lớn đang tăng rất nhanh vì nhiều người muốn mua nhà."
    },
    {
      id: 5,
      unit: 1,
      unitName: "Nhóm 1: Quy Mô & Thay Đổi Đô Thị",
      word: "proportion",
      ipa: "/prəˈpɔːʃn/",
      pos: "noun",
      meaning: "tỉ lệ, phần",
      collocation: "a large proportion of / the proportion of urban population",
      example: "The proportion of people living in cities is much higher now than in 1950.",
      exampleVi: "Tỉ lệ người sống ở các thành phố hiện nay cao hơn nhiều so với năm 1950."
    },
    {
      id: 6,
      unit: 2,
      unitName: "Nhóm 2: Đời Sống & Hạ Tầng",
      word: "resident",
      ipa: "/ˈrezɪdənt/",
      pos: "noun",
      meaning: "người dân, cư dân",
      collocation: "local residents / city residents",
      example: "Getting around is becoming more convenient for local residents thanks to electric buses.",
      exampleVi: "Việc đi lại đang trở nên thuận tiện hơn cho người dân địa phương nhờ có xe buýt điện."
    },
    {
      id: 7,
      unit: 2,
      unitName: "Nhóm 2: Đời Sống & Hạ Tầng",
      word: "housing",
      ipa: "/ˈhaʊzɪŋ/",
      pos: "noun",
      meaning: "nhà ở (danh từ không đếm được)",
      collocation: "affordable housing / shortage of housing",
      example: "The city government is building new flats to provide more affordable housing.",
      exampleVi: "Chính quyền thành phố đang xây các căn hộ mới để cung cấp thêm nhà ở giá phải chăng."
    },
    {
      id: 8,
      unit: 2,
      unitName: "Nhóm 2: Đời Sống & Hạ Tầng",
      word: "afford",
      ipa: "/əˈfɔːd/",
      pos: "verb",
      meaning: "có đủ tiền, có khả năng chi trả",
      collocation: "afford to buy a flat / afford expensive housing",
      example: "Not many young couples can afford to buy their own house in big cities.",
      exampleVi: "Không nhiều cặp vợ chồng trẻ có đủ tiền để mua căn nhà riêng ở các thành phố lớn."
    },
    {
      id: 9,
      unit: 2,
      unitName: "Nhóm 2: Đời Sống & Hạ Tầng",
      word: "reliable",
      ipa: "/rɪˈlaɪəbl/",
      pos: "adjective",
      meaning: "đáng tin cậy, có thể tin tưởng",
      collocation: "reliable public transport / reliable bus service",
      example: "When public transport is reliable, fewer people use their private cars.",
      exampleVi: "Khi phương tiện công cộng đáng tin cậy, ít người dùng xe hơi cá nhân hơn."
    },
    {
      id: 10,
      unit: 2,
      unitName: "Nhóm 2: Đời Sống & Hạ Tầng",
      word: "leisure",
      ipa: "/ˈleʒə/",
      pos: "noun",
      meaning: "sự giải trí, thời gian thư giãn",
      collocation: "leisure activities / leisure facilities",
      example: "There are new public parks where city residents can enjoy more leisure activities.",
      exampleVi: "Có những công viên công cộng mới nơi cư dân thành phố có thể tận hưởng nhiều hoạt động giải trí hơn."
    },
    {
      id: 11,
      unit: 3,
      unitName: "Nhóm 3: Cơ Hội, Thách Thức & Lịch Sử",
      word: "seek",
      ipa: "/siːk/",
      pos: "verb",
      meaning: "tìm kiếm (quá khứ: sought)",
      collocation: "seek better jobs / seek new opportunities",
      example: "Many people leave the countryside to seek better job opportunities in big cities.",
      exampleVi: "Nhiều người rời bỏ vùng quê để tìm kiếm cơ hội việc làm tốt hơn ở các thành phố lớn."
    },
    {
      id: 12,
      unit: 3,
      unitName: "Nhóm 3: Cơ Hội, Thách Thức & Lịch Sử",
      word: "unemployment",
      ipa: "/ˌʌnɪmˈplɔɪmənt/",
      pos: "noun",
      meaning: "tình trạng thất nghiệp, số người không có việc làm",
      collocation: "unemployment rate / youth unemployment",
      example: "Higher unemployment can lead to more social problems in crowded cities.",
      exampleVi: "Tỉ lệ thất nghiệp cao hơn có thể dẫn đến nhiều vấn đề xã hội hơn ở các thành phố đông đúc."
    },
    {
      id: 13,
      unit: 3,
      unitName: "Nhóm 3: Cơ Hội, Thách Thức & Lịch Sử",
      word: "rush hour",
      ipa: "/ˈrʌʃ aʊə/",
      pos: "noun phr.",
      meaning: "giờ cao điểm",
      collocation: "during rush hour / rush-hour traffic jams",
      example: "Traffic jams get much worse during rush hour when everyone goes home from work.",
      exampleVi: "Tắc đường trở nên tệ hơn nhiều vào giờ cao điểm khi mọi người đi làm về."
    },
    {
      id: 14,
      unit: 3,
      unitName: "Nhóm 3: Cơ Hội, Thách Thức & Lịch Sử",
      word: "concern",
      ipa: "/kənˈsɜːn/",
      pos: "noun",
      meaning: "sự lo lắng, mối quan ngại",
      collocation: "cause concern / express concern about / a big concern",
      example: "Air pollution is causing serious concern among city residents.",
      exampleVi: "Ô nhiễm không khí đang gây ra mối lo ngại nghiêm trọng trong cộng đồng cư dân thành phố."
    },
    {
      id: 15,
      unit: 3,
      unitName: "Nhóm 3: Cơ Hội, Thách Thức & Lịch Sử",
      word: "colonial",
      ipa: "/kəˈləʊniəl/",
      pos: "adjective",
      meaning: "thuộc địa, thuộc dân",
      collocation: "colonial buildings / French colonial rule",
      example: "The old city centre is a fascinating mixture of French colonial buildings and local houses.",
      exampleVi: "Trung tâm thành phố cổ là sự pha trộn thú vị giữa các tòa nhà thuộc địa Pháp và nhà ở địa phương."
    }
  ],

  // 2. 3 CHUYÊN ĐỀ NGỮ PHÁP TRỌNG TÂM + QUICK CHECK DRILLS
  grammarModules: [
    {
      id: "gram1",
      title: "1. Thì Hiện Tại Hoàn Thành & Mở Rộng (Present Perfect: Review & Extension)",
      focus: "Ôn tập thì Hiện Tại Hoàn Thành & 2 cấu trúc đếm số lần / trải nghiệm nhất (SGK tr.50)",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:10px;">
            📌 A. ÔN TẬP CÔNG THỨC & CÁCH DÙNG CƠ BẢN
          </h4>
          <p style="font-size:0.9rem; line-height:1.6; color:var(--text-muted); margin-bottom:12px;">
            Thì Hiện tại hoàn thành diễn tả hành động <strong>bắt đầu trong quá khứ và còn kéo dài đến hiện tại</strong>, hoặc hành động <strong>vừa mới xảy ra / đã xảy ra</strong> mà kết quả còn lưu lại ở hiện tại.
          </p>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:16px;">
            <strong>Công thức chuẩn:</strong><br>
            • Khẳng định: <code>S + have / has + V3/ed (+ O)</code><br>
            • Phủ định: <code>S + have / has + not + V3/ed</code><br>
            • Nghi vấn: <code>Have / Has + S + V3/ed?</code><br>
            • <strong>Dấu hiệu nhận biết:</strong> <em>since + mốc thời gian</em>, <em>for + khoảng thời gian</em>, <em>over the past (ten) years</em>, <em>recently / lately</em>, <em>already</em>, <em>yet</em>, <em>just</em>.<br><br>
            <strong>Ví dụ phân tích S - V - O:</strong><br>
            1. <em>[A lot of young people]<sub>(S)</sub> <strong>have moved</strong><sub>(V)</sub> [to big cities]<sub>(Adv)</sub> over the past ten years.</em><br>
            ➔ (Rất nhiều người trẻ đã chuyển đến các thành phố lớn trong 10 năm qua — quá trình kéo dài đến nay).<br>
            2. <em>[The local authority]<sub>(S)</sub> <strong>has expanded</strong><sub>(V)</sub> [the main roads]<sub>(O)</sub> recently.</em><br>
            ➔ (Chính quyền địa phương gần đây đã mở rộng các tuyến đường chính — kết quả thấy ngay ở hiện tại).
          </div>

          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:10px;">
            📌 B. MỞ RỘNG TRỌNG TÂM UNIT 4 (SGK TRANG 50)
          </h4>
          <div style="display:grid; gap:12px; margin-bottom:16px;">
            <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:14px;">
              <strong style="color:#1d4ed8;">1. Cấu trúc ĐẾM SỐ LẦN (lần thứ nhất, thứ hai... làm gì):</strong><br>
              <code>It / This / That + is + the first / second / third... time + S + have / has + V3/ed</code><br>
              <em>Ví dụ 1:</em> <strong>This is the second time</strong> [I]<sub>(S)</sub> <strong>have visited</strong><sub>(V)</sub> [this city]<sub>(O)</sub>. <em>(Đây là lần thứ hai tôi đến thăm thành phố này.)</em><br>
              <em>Ví dụ 2:</em> <strong>It is the first time</strong> [Mark]<sub>(S)</sub> <strong>has been</strong><sub>(V)</sub> [on an electric bus]<sub>(Adv)</sub>. <em>(Đây là lần đầu tiên Mark đi xe buýt điện.)</em>
            </div>

            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:14px;">
              <strong style="color:#15803d;">2. Cấu trúc TRẢI NGHIỆM ĐỘC NHẤT (nhất từng có):</strong><br>
              <code>It / This / That / N + is + the best / worst / most adj / only + N + S + have / has + (ever) + V3/ed</code><br>
              <em>Ví dụ 1:</em> <strong>That is the worst meal</strong> [I]<sub>(S)</sub> <strong>have ever had</strong><sub>(V)</sub> in this city. <em>(Đó là bữa ăn tệ nhất mà tôi từng ăn ở thành phố này.)</em><br>
              <em>Ví dụ 2:</em> <strong>Moving to the city is the best decision</strong> [my parents]<sub>(S)</sub> <strong>have ever made</strong><sub>(V)</sub>. <em>(Chuyển lên thành phố là quyết định đúng đắn nhất bố mẹ tôi từng đưa ra.)</em>
            </div>
          </div>

          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:10px; padding:14px;">
            <strong style="color:#b91c1c;">⚠️ BẪY THI THPTQG HAY GẶP (SGK tr.51):</strong><br>
            1. Sai thì ở vế sau: <em>"This is the first time I <s>saw</s>..."</em> ➔ Sửa thành <strong>have seen</strong>.<br>
            2. Sai thì ở vế trước: <em>"This <s>has been</s> the second time my mother has warned me..."</em> ➔ Vế trước PHẢI là hiện tại đơn <strong>is</strong> (không dùng <em>has been</em>)!<br>
            3. Dùng nhầm Quá khứ hoàn thành: <em>"the most beautiful place we <s>had</s> ever visited"</em> ➔ Khi vế đầu là <strong>is</strong>, vế sau dùng <strong>have</strong>!
          </div>
        </div>
      `,
      drills: [
        {
          id: "g1_1",
          question: "This is the first time my sister ______ an electric bus in Ha Noi.",
          options: ["A. rides", "B. rode", "C. has ridden", "D. had ridden"],
          correct: 2,
          explanation: "Cấu trúc 'This is the first time + S + have/has + V3/ed' ➔ Chủ ngữ 'my sister' số ít nên chọn 'has ridden'."
        },
        {
          id: "g1_2",
          question: "Buying this flat is the best decision our family ______ in ten years.",
          options: ["A. has ever made", "B. ever made", "C. makes", "D. had ever made"],
          correct: 0,
          explanation: "Cấu trúc trải nghiệm nhất: 'is + the best decision + S + have/has ever V3' ➔ 'our family' đi với 'has ever made'."
        },
        {
          id: "g1_3",
          question: "Over the past decade, our town ______ into a busy urban area.",
          options: ["A. expands", "B. expanded", "C. has expanded", "D. will expand"],
          correct: 2,
          explanation: "Cụm 'Over the past decade' (trong thập kỷ vừa qua) diễn tả quá trình kéo dài từ quá khứ đến hiện tại ➔ Dùng Hiện tại hoàn thành 'has expanded'."
        },
        {
          id: "g1_4",
          question: "Find the mistake: This (A) has been the second time (B) my friend (C) has complained about (D) the noisy street.",
          options: ["A. has been", "B. my friend", "C. has complained", "D. the noisy street"],
          correct: 0,
          explanation: "Vế đầu trong cấu trúc 'This is the second time...' phải chia thì Hiện tại đơn 'is', không dùng 'has been' (SGK tr.51 câu 3)."
        }
      ]
    },
    {
      id: "gram2",
      title: "2. So Sánh Hơn & So Sánh Nhất Cơ Bản (Basic Comparatives & Superlatives)",
      focus: "Nền tảng cốt lõi về tính từ/trạng từ ngắn, dài và các từ bất quy tắc",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:10px;">
            📌 A. PHÂN BIỆT TÍNH TỪ / TRẠNG TỪ NGẮN VÀ DÀI
          </h4>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:14px;">
            • <strong>Từ ngắn:</strong> Có <strong>1 âm tiết</strong> (<em>big, tall, fast, high, cheap, clean</em>) HOẶC có <strong>2 âm tiết</strong> kết thúc bằng <em>-y, -le, -ow, -er</em> (<em>busy ➔ busier, quiet ➔ quieter, narrow ➔ narrower</em>).<br>
            • <strong>Từ dài:</strong> Có <strong>2 âm tiết trở lên</strong> không thuộc nhóm trên (<em>crowded, modern, reliable, expensive, convenient, rapidly</em>).
          </div>

          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:10px;">
            📌 B. CÔNG THỨC SO SÁNH HƠN & SO SÁNH NHẤT CƠ BẢN
          </h4>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap:12px; margin-bottom:16px;">
            <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:14px;">
              <strong style="color:#1d4ed8;">1. SO SÁNH HƠN (Comparative — 2 đối tượng):</strong><br>
              • Ngắn: <code>S1 + be/V + adj/adv-er + than + S2</code><br>
              • Dài: <code>S1 + be/V + more / less + adj/adv + than + S2</code><br><br>
              <strong>Ví dụ phân tích S - V:</strong><br>
              • <em>[Living in a city]<sub>(S)</sub> <strong>is</strong><sub>(V)</sub> <strong>more expensive than</strong> [living in a village]<sub>(S2)</sub>.</em><br>
              • <em>[Buses]<sub>(S)</sub> <strong>are</strong><sub>(V)</sub> much <strong>cheaper than</strong> [taxis]<sub>(S2)</sub>.</em>
            </div>

            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:14px;">
              <strong style="color:#15803d;">2. SO SÁNH NHẤT (Superlative — từ 3 đối tượng trở lên):</strong><br>
              • Ngắn: <code>S + be/V + the + adj/adv-est (+ N) (+ in/of...)</code><br>
              • Dài: <code>S + be/V + the most / least + adj/adv (+ N) (+ in/of...)</code><br><br>
              <strong>Ví dụ phân tích S - V:</strong><br>
              • <em>[Ha Noi]<sub>(S)</sub> <strong>is</strong><sub>(V)</sub> <strong>the biggest city</strong> in the north.</em><br>
              • <em>[This district]<sub>(S)</sub> <strong>has</strong><sub>(V)</sub> <strong>the most reliable bus service</strong> in town.</em>
            </div>
          </div>

          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:10px;">
            📌 C. BẢNG TÍNH TỪ / TRẠNG TỪ BẤT QUY TẮC & BẪY NHẤN MẠNH
          </h4>
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:10px; padding:14px;">
            • <strong>good / well</strong> ➔ <strong>better</strong> ➔ <strong>the best</strong><br>
            • <strong>bad / badly</strong> ➔ <strong>worse</strong> ➔ <strong>the worst</strong><br>
            • <strong>many / much</strong> ➔ <strong>more</strong> ➔ <strong>the most</strong><br>
            • <strong>little</strong> ➔ <strong>less</strong> ➔ <strong>the least</strong><br>
            • <strong>far</strong> ➔ <strong>farther / further</strong> ➔ <strong>the farthest / furthest</strong><br>
            • <strong>Mẹo bẫy thi:</strong> Trước so sánh hơn có thể thêm <code>much / far / a lot</code> để nhấn mạnh (VD: <em>much bigger than</em>), tuyệt đối KHÔNG dùng <code>very bigger</code>! So sánh nhất luôn đi kèm mạo từ <code>the</code>.
          </div>
        </div>
      `,
      drills: [
        {
          id: "g2_1",
          question: "Renting a flat in the city centre is much ______ than renting one in the countryside.",
          options: ["A. expensive", "B. more expensive", "C. most expensive", "D. the most expensive"],
          correct: 1,
          explanation: "Có từ 'than' và trạng từ nhấn mạnh 'much' ➔ Dùng So sánh hơn của tính từ dài 'expensive': 'more expensive'."
        },
        {
          id: "g2_2",
          question: "Ho Chi Minh City is ______ urban area in Viet Nam by population.",
          options: ["A. larger", "B. the largest", "C. most large", "D. the more large"],
          correct: 1,
          explanation: "So sánh nhất trong phạm vi cả nước ('in Viet Nam') với tính từ ngắn 'large' ➔ 'the largest'."
        },
        {
          id: "g2_3",
          question: "After they built the new metro line, public transport became ______ than before.",
          options: ["A. good", "B. best", "C. better", "D. the best"],
          correct: 2,
          explanation: "Có từ 'than before' ➔ Dùng dạng so sánh hơn bất quy tắc của 'good' là 'better'."
        },
        {
          id: "g2_4",
          question: "During rush hour, traffic on Main Street is ______ in the whole city.",
          options: ["A. worse", "B. the bad", "C. worst", "D. the worst"],
          correct: 3,
          explanation: "So sánh nhất trên toàn thành phố ('in the whole city') của 'bad' là 'the worst' (nhớ phải có 'the')."
        }
      ]
    },
    {
      id: "gram3",
      title: "3. So Sánh Kép Diễn Tả Sự Thay Đổi (Double Comparatives to Show Change)",
      focus: "Càng ngày càng... (1 vế) & Càng... thì càng... (2 vế song hành - SGK tr.51)",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:10px;">
            📌 A. DẠNG 1: "CÀNG NGÀY CÀNG..." (DIỄN TẢ SỰ BIẾN ĐỔI LIÊN TỤC)
          </h4>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:16px;">
            • <strong>Tính từ / Trạng từ ngắn:</strong> <code>S + V + adj/adv-er + and + adj/adv-er</code><br>
            <em>Ví dụ:</em> [The city]<sub>(S)</sub> is getting <strong>bigger and bigger</strong>. <em>(Thành phố đang ngày càng lớn hơn.)</em><br><br>
            • <strong>Tính từ / Trạng từ dài:</strong> <code>S + V + more and more / less and less + adj/adv</code><br>
            <em>Ví dụ:</em> [Housing]<sub>(S)</sub> is becoming <strong>more and more expensive</strong>. <em>(Nhà ở đang ngày càng đắt đỏ hơn.)</em><br>
            <em>Ví dụ:</em> [Polluted cities]<sub>(S)</sub> are becoming <strong>less and less attractive</strong>. <em>(Các thành phố ô nhiễm ngày càng kém hấp dẫn hơn.)</em><br><br>
            • <strong>Với Danh từ:</strong> <code>more and more + N</code> | <code>fewer and fewer + N(đếm được số nhiều)</code> | <code>less and less + N(không đếm được)</code><br>
            <em>Ví dụ:</em> There are <strong>more and more</strong> [high-rise buildings]<sub>(N đếm được)</sub> in the city.
          </div>

          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:10px;">
            📌 B. DẠNG 2: "CÀNG ... THÌ CÀNG ..." (HAI SỰ VIỆC BIẾN ĐỔI CÙNG NHAU)
          </h4>
          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:14px; margin-bottom:16px;">
            <strong style="color:#1d4ed8;">Công thức tổng quát:</strong><br>
            <code>The + comparative (adj/adv/N) + S1 + V1, the + comparative (adj/adv/N) + S2 + V2</code><br><br>
            <strong>4 biến thể hay thi nhất:</strong><br>
            1. <strong>Với Tính từ/Trạng từ ngắn:</strong><br>
               <em><strong>The bigger</strong> [the city]<sub>(S1)</sub> gets<sub>(V1)</sub>, <strong>the higher</strong> [house prices]<sub>(S2)</sub> become<sub>(V2)</sub>.</em><br>
            2. <strong>Với Tính từ/Trạng từ dài:</strong><br>
               <em><strong>The more crowded</strong> [the area]<sub>(S1)</sub> becomes<sub>(V1)</sub>, <strong>the worse</strong> [traffic jams]<sub>(S2)</sub> get<sub>(V2)</sub>.</em><br>
            3. <strong>Với Danh từ (càng nhiều / càng ít):</strong><br>
               <em><strong>The more houses</strong> we build, <strong>the less space</strong> we have for trees.</em><br>
            4. <strong>Với Động từ (càng làm gì nhiều):</strong><br>
               <em><strong>The more</strong> we invest in rural areas, <strong>the more</strong> we can help people there.</em>
          </div>

          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:10px; padding:14px;">
            <strong style="color:#b91c1c;">⚠️ 4 BẪY CHẾT NGƯỜI TRONG ĐỀ THI:</strong><br>
            1. KHÔNG dùng <code>the most</code> trong so sánh kép 2 vế (Sai: <em><s>The most</s> we use cars...</em> ➔ Đúng: <strong>The more</strong> we use cars...).<br>
            2. KHÔNG dùng <code>much and more</code> (Sai: <em><s>much and more</s> expensive</em> ➔ Đúng: <strong>more and more</strong> expensive).<br>
            3. KHÔNG quên chữ <code>the</code> ở đầu vế thứ 2 (Sai: <em>The bigger it gets, <s>more crowded</s>...</em> ➔ Đúng: <strong>the more crowded</strong>).<br>
            4. Phân biệt <code>fewer</code> (danh từ đếm được số nhiều: <em>fewer cars</em>) và <code>less</code> (danh từ không đếm được: <em>less space, less traffic</em>).
          </div>
        </div>
      `,
      drills: [
        {
          id: "g3_1",
          question: "Due to rapid urbanisation, our town is becoming ______.",
          options: ["A. big and bigger", "B. bigger and bigger", "C. bigger and big", "D. more and more big"],
          correct: 1,
          explanation: "'Big' là tính từ ngắn (gấp đôi phụ âm g thành bigger) ➔ Dạng càng ngày càng là 'bigger and bigger' (SBT tr.46)."
        },
        {
          id: "g3_2",
          question: "The more reliable the buses are, ______ private cars people use.",
          options: ["A. the less", "B. fewer", "C. the fewer", "D. the fewest"],
          correct: 2,
          explanation: "'Private cars' là danh từ đếm được số nhiều ➔ Dùng 'the fewer + N(số nhiều)' ở vế thứ hai (SBT tr.47)."
        },
        {
          id: "g3_3",
          question: "It is getting ______ difficult for young people to afford a flat in big cities.",
          options: ["A. much and more", "B. more and much", "C. more and more", "D. the more"],
          correct: 2,
          explanation: "'Difficult' là tính từ dài ➔ Dạng càng ngày càng dùng 'more and more + adj' (không dùng much and more)."
        },
        {
          id: "g3_4",
          question: "The ______ people move into big cities, the higher the unemployment rate becomes.",
          options: ["A. most", "B. more", "C. many", "D. much"],
          correct: 1,
          explanation: "So sánh kép 2 vế chỉ dùng dạng so sánh hơn 'The more... the higher...' (tuyệt đối không dùng 'the most')."
        }
      ]
    }
  ]
};
