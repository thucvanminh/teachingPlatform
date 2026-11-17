/**
 * DỮ LIỆU BÀI GIẢNG TƯƠNG TÁC: UNIT 4 - ASEAN AND VIET NAM
 * Tiếng Anh 11 Global Success
 * Soạn riêng cho: Bạn Thái (Lớp 11 - Mục tiêu 8.5+ Giữa kì & THPT)
 * Hướng dẫn & Bản quyền: Thầy Thức
 * Quy chuẩn: Đúng 24 từ vựng trọng tâm + 6 Chuyên đề Ngữ pháp Danh Động Từ chuyên sâu kèm Interactive Drills
 */

const LECTURE_DATA = {
  title: "Cẩm Nang Tri Thức & Đấu Trường Từ Vựng Unit 4: ASEAN and Viet Nam",
  subject: "Tiếng Anh 11 (Global Success - Unit 4)",
  teacher: "Thầy Thức",

  // 1. TỪ VỰNG CỐT LÕI (ĐÚNG 24 TỪ VỰNG TRỌNG TÂM)
  vocabList: [
    // NHÓM 1: KHỐI ASEAN & NGUYÊN TẮC HỢP TÁC (8 TỪ)
    {
      id: 1,
      unit: 1,
      unitName: "Nhóm 1: Khối ASEAN & Hợp Tác",
      word: "Association",
      ipa: "/əˌsəʊsiˈeɪʃn/",
      pos: "noun",
      meaning: "Hiệp hội, đoàn thể",
      collocation: "regional association / founding members of the association",
      example: "ASEAN is a regional association promoting economic growth and peace among member states.",
      exampleVi: "ASEAN là một hiệp hội khu vực thúc đẩy tăng trưởng kinh tế và hòa bình giữa các quốc gia thành viên."
    },
    {
      id: 2,
      unit: 1,
      unitName: "Nhóm 1: Khối ASEAN & Hợp Tác",
      word: "Cooperation",
      ipa: "/kəʊˌɒpəˈreɪʃn/",
      pos: "noun",
      meaning: "Sự hợp tác, cùng nhau hành động",
      collocation: "regional cooperation / close cooperation",
      example: "The annual summit aims to strengthen economic cooperation among Southeast Asian nations.",
      exampleVi: "Hội nghị thượng đỉnh thường niên nhằm tăng cường hợp tác kinh tế giữa các quốc gia Đông Nam Á."
    },
    {
      id: 3,
      unit: 1,
      unitName: "Nhóm 1: Khối ASEAN & Hợp Tác",
      word: "Integration",
      ipa: "/ˌɪntɪˈɡreɪʃn/",
      pos: "noun",
      meaning: "Sự hội nhập, sự hòa nhập",
      collocation: "regional integration / economic integration",
      example: "Viet Nam has achieved remarkable economic integration into the ASEAN community.",
      exampleVi: "Việt Nam đã đạt được sự hội nhập kinh tế vượt bậc vào cộng đồng ASEAN."
    },
    {
      id: 4,
      unit: 1,
      unitName: "Nhóm 1: Khối ASEAN & Hợp Tác",
      word: "Solidarity",
      ipa: "/ˌsɒlɪˈdærəti/",
      pos: "noun",
      meaning: "Tình đoàn kết, sự gắn kết keo sơn",
      collocation: "regional solidarity / show solidarity with",
      example: "Member countries displayed strong solidarity in responding to recent natural disasters.",
      exampleVi: "Các quốc gia thành viên đã thể hiện tình đoàn kết mạnh mẽ trong việc ứng phó với thiên tai gần đây."
    },
    {
      id: 5,
      unit: 1,
      unitName: "Nhóm 1: Khối ASEAN & Hợp Tác",
      word: "Stability",
      ipa: "/stəˈbɪləti/",
      pos: "noun",
      meaning: "Sự ổn định, sự vững vàng",
      collocation: "political stability / maintain stability",
      example: "Peace and stability are the essential cornerstones for sustainable development in the region.",
      exampleVi: "Hòa bình và sự ổn định là những nền tảng thiết yếu cho sự phát triển bền vững trong khu vực."
    },
    {
      id: 6,
      unit: 1,
      unitName: "Nhóm 1: Khối ASEAN & Hợp Tác",
      word: "Maintain",
      ipa: "/meɪnˈteɪn/",
      pos: "verb",
      meaning: "Duy trì, giữ gìn, bảo lưu",
      collocation: "maintain peace and security / maintain friendly relations",
      example: "ASEAN leaders strive to maintain peace and maritime security across Southeast Asia.",
      exampleVi: "Các nhà lãnh đạo ASEAN nỗ lực duy trì hòa bình và an ninh hàng hải trên toàn Đông Nam Á."
    },
    {
      id: 7,
      unit: 1,
      unitName: "Nhóm 1: Khối ASEAN & Hợp Tác",
      word: "Promote",
      ipa: "/prəˈməʊt/",
      pos: "verb",
      meaning: "Thúc đẩy, xúc tiến, quảng bá",
      collocation: "promote economic growth / promote mutual understanding",
      example: "The exchange programs help promote mutual understanding among youths across the bloc.",
      exampleVi: "Các chương trình giao lưu giúp thúc đẩy sự hiểu biết lẫn nhau giữa giới trẻ trong toàn khối."
    },
    {
      id: 8,
      unit: 1,
      unitName: "Nhóm 1: Khối ASEAN & Hợp Tác",
      word: "Motto",
      ipa: "/ˈmɒtəʊ/",
      pos: "noun",
      meaning: "Khẩu hiệu, phương châm hành động",
      collocation: "official motto / live by the motto",
      example: "The official motto of ASEAN is 'One Vision, One Identity, One Community'.",
      exampleVi: "Khẩu hiệu chính thức của ASEAN là 'Một tầm nhìn, Một bản sắc, Một cộng đồng'."
    },

    // NHÓM 2: HIẾN CHƯƠNG & NGOẠI GIAO KHU VỰC (8 TỪ)
    {
      id: 9,
      unit: 2,
      unitName: "Nhóm 2: Hiến Chương & Ngoại Giao",
      word: "Charter",
      ipa: "/ˈtʃɑːtər/",
      pos: "noun",
      meaning: "Hiến chương, văn kiện pháp lý cơ bản",
      collocation: "ASEAN Charter / abide by the charter",
      example: "The ASEAN Charter serves as a firm legal foundation for regional integration.",
      exampleVi: "Hiến chương ASEAN đóng vai trò là nền tảng pháp lý vững chắc cho hội nhập khu vực."
    },
    {
      id: 10,
      unit: 2,
      unitName: "Nhóm 2: Hiến Chương & Ngoại Giao",
      word: "Bloc",
      ipa: "/blɒk/",
      pos: "noun",
      meaning: "Khối liên minh, khối quốc gia",
      collocation: "regional bloc / trading bloc",
      example: "Viet Nam has emerged as one of the most dynamic economies in the 10-nation bloc.",
      exampleVi: "Việt Nam đã nổi lên như một trong những nền kinh tế năng động nhất trong khối 10 quốc gia."
    },
    {
      id: 11,
      unit: 2,
      unitName: "Nhóm 2: Hiến Chương & Ngoại Giao",
      word: "Cultural exchange",
      ipa: "/ˌkʌltʃərəl ɪksˈtʃeɪndʒ/",
      pos: "noun phrase",
      meaning: "Giao lưu văn hóa",
      collocation: "youth cultural exchange / facilitate cultural exchanges",
      example: "Annual cultural exchanges provide high schoolers with opportunities to discover neighboring heritage.",
      exampleVi: "Giao lưu văn hóa thường niên mang lại cho học sinh THPT cơ hội khám phá di sản của các nước láng giềng."
    },
    {
      id: 12,
      unit: 2,
      unitName: "Nhóm 2: Hiến Chương & Ngoại Giao",
      word: "Involve in",
      ipa: "/ɪnˈvɒlv ɪn/",
      pos: "verb phrase",
      meaning: "Tham gia vào, can dự vào",
      collocation: "be actively involved in / get involved in projects",
      example: "Many high school students are enthusiastically involved in environmental cleanup projects.",
      exampleVi: "Nhiều học sinh THPT tham gia rất nhiệt tình vào các dự án làm sạch môi trường."
    },
    {
      id: 13,
      unit: 2,
      unitName: "Nhóm 2: Hiến Chương & Ngoại Giao",
      word: "Represent",
      ipa: "/ˌreprɪˈzent/",
      pos: "verb",
      meaning: "Đại diện, thay mặt cho",
      collocation: "represent the nation / represent youth voices",
      example: "Selected delegates will represent Viet Nam at the upcoming ASEAN Youth Leadership Conference.",
      exampleVi: "Các đại biểu được tuyển chọn sẽ đại diện cho Việt Nam tại Hội nghị Thủ lĩnh Thanh niên ASEAN sắp tới."
    },
    {
      id: 14,
      unit: 2,
      unitName: "Nhóm 2: Hiến Chương & Ngoại Giao",
      word: "Representative",
      ipa: "/ˌreprɪˈzentətɪv/",
      pos: "noun",
      meaning: "Người đại diện, đại biểu tiêu biểu",
      collocation: "official representative / student representative",
      example: "Each country sent two outstanding student representatives to deliver national presentations.",
      exampleVi: "Mỗi quốc gia đã cử hai đại diện học sinh xuất sắc đến thuyết trình về đất nước mình."
    },
    {
      id: 15,
      unit: 2,
      unitName: "Nhóm 2: Hiến Chương & Ngoại Giao",
      word: "Participant",
      ipa: "/pɑːˈtɪsɪpənt/",
      pos: "noun",
      meaning: "Người tham gia, người tham dự",
      collocation: "active participant / conference participant",
      example: "All participants in the youth workshop gained valuable cross-cultural problem-solving skills.",
      exampleVi: "Tất cả những người tham gia hội thảo thanh niên đều thu được kỹ năng giải quyết vấn đề đa văn hóa quý báu."
    },
    {
      id: 16,
      unit: 2,
      unitName: "Nhóm 2: Hiến Chương & Ngoại Giao",
      word: "Volunteer",
      ipa: "/ˌvɒlənˈtɪər/",
      pos: "noun / verb",
      meaning: "Tình nguyện viên; làm tình nguyện",
      collocation: "youth volunteer / volunteer for community projects",
      example: "He worked as a volunteer guiding international delegations throughout the summit week.",
      exampleVi: "Cậu ấy đã làm việc như một tình nguyện viên hướng dẫn các đoàn quốc tế trong suốt tuần lễ hội nghị."
    },

    // NHÓM 3: GIỚI TRẺ, BẢN SẮC & THỊNH VƯỢNG (8 TỪ)
    {
      id: 17,
      unit: 3,
      unitName: "Nhóm 3: Giới Trẻ & Thịnh Vượng",
      word: "Scholarship",
      ipa: "/ˈskɒləʃɪp/",
      pos: "noun",
      meaning: "Học bổng tài trợ học tập",
      collocation: "win a scholarship / apply for a prestigious scholarship",
      example: "Thai is diligently preparing his academic portfolio to apply for a prestigious ASEAN scholarship.",
      exampleVi: "Thái đang chăm chỉ chuẩn bị hồ sơ học thuật của mình để nộp đơn xin học bổng ASEAN danh giá."
    },
    {
      id: 18,
      unit: 3,
      unitName: "Nhóm 3: Giới Trẻ & Thịnh Vượng",
      word: "Leadership",
      ipa: "/ˈliːdəʃɪp/",
      pos: "noun",
      meaning: "Kỹ năng lãnh đạo, cương vị dẫn dắt",
      collocation: "demonstrate leadership skills / youth leadership",
      example: "Participating in model debates helps teenagers foster visionary leadership and teamwork qualities.",
      exampleVi: "Tham gia các cuộc tranh biện mô phỏng giúp thiếu niên nuôi dưỡng phẩm chất lãnh đạo và làm việc nhóm có tầm nhìn."
    },
    {
      id: 19,
      unit: 3,
      unitName: "Nhóm 3: Giới Trẻ & Thịnh Vượng",
      word: "Diversity",
      ipa: "/daɪˈvɜːsəti/",
      pos: "noun",
      meaning: "Sự đa dạng, tính phong phú",
      collocation: "cultural diversity / rich ethnic diversity",
      example: "Unity in diversity is a core philosophical pillar underpinning the ASEAN Community.",
      exampleVi: "Thống nhất trong đa dạng là trụ cột triết học cốt lõi củng cố Cộng đồng ASEAN."
    },
    {
      id: 20,
      unit: 3,
      unitName: "Nhóm 3: Giới Trẻ & Thịnh Vượng",
      word: "Identity",
      ipa: "/aɪˈdentəti/",
      pos: "noun",
      meaning: "Bản sắc, đặc tính nhận diện",
      collocation: "cultural identity / regional identity",
      example: "Preserving unique cultural identity while integrating globally is a paramount goal for youth.",
      exampleVi: "Bảo tồn bản sắc văn hóa độc đáo trong khi hội nhập toàn cầu là mục tiêu tối quan trọng của giới trẻ."
    },
    {
      id: 21,
      unit: 3,
      unitName: "Nhóm 3: Giới Trẻ & Thịnh Vượng",
      word: "Prosperous",
      ipa: "/ˈprɒspərəs/",
      pos: "adjective",
      meaning: "Thịnh vượng, phồn vinh, phát đạt",
      collocation: "a prosperous future / prosperous community",
      example: "Member countries cooperate closely to build a peaceful and prosperous community.",
      exampleVi: "Các quốc gia thành viên hợp tác chặt chẽ để xây dựng một cộng đồng hòa bình và thịnh vượng."
    },
    {
      id: 22,
      unit: 3,
      unitName: "Nhóm 3: Giới Trẻ & Thịnh Vượng",
      word: "Prosperity",
      ipa: "/prɒˈsperəti/",
      pos: "noun",
      meaning: "Sự thịnh vượng, sự phồn vinh",
      collocation: "economic prosperity / bring prosperity to",
      example: "Cross-border trade agreements have brought lasting economic prosperity to local populations.",
      exampleVi: "Các hiệp định thương mại xuyên biên giới đã mang lại sự thịnh vượng kinh tế lâu dài cho người dân địa phương."
    },
    {
      id: 23,
      unit: 3,
      unitName: "Nhóm 3: Giới Trẻ & Thịnh Vượng",
      word: "Contribution",
      ipa: "/ˌkɒntrɪˈbjuːʃn/",
      pos: "noun",
      meaning: "Sự đóng góp, sự cống hiến",
      collocation: "make a contribution to / significant contribution",
      example: "Viet Nam has made significant contributions to the unity and advancement of ASEAN.",
      exampleVi: "Việt Nam đã có những đóng góp to lớn cho sự đoàn kết và tiến bộ của ASEAN."
    },
    {
      id: 24,
      unit: 3,
      unitName: "Nhóm 3: Giới Trẻ & Thịnh Vượng",
      word: "Strengthen",
      ipa: "/ˈstreŋθn/",
      pos: "verb",
      meaning: "Củng cố, làm cho mạnh mẽ hơn",
      collocation: "strengthen bilateral ties / strengthen regional cooperation",
      example: "The annual leaders' meeting seeks to strengthen diplomatic and socioeconomic partnerships.",
      exampleVi: "Cuộc gặp thường niên của các nhà lãnh đạo tìm cách củng cố quan hệ đối tác ngoại giao và kinh tế xã hội."
    }
  ],

  // 2. CHUYÊN ĐỀ NGỮ PHÁP (6 MODULES GERUNDS AS SUBJECTS & OBJECTS KÈM QUICK CHECK DRILLS)
  grammarModules: [
    {
      id: "gram1",
      title: "1. Danh Động Từ Làm Chủ Ngữ (Gerunds as Subjects)",
      focus: "Quy tắc hòa hợp Chủ - Vị số ít, Phủ định Not + V-ing & Cấu trúc giả chủ ngữ",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 BẢN CHẤT: DANH ĐỘNG TỪ (GERUND - V-ING) LÀM CHỦ NGỮ
          </h4>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:16px;">
            Khi muốn diễn tả một hành động, thói quen hoặc hoạt động đóng vai trò là chủ thể của câu, ta sử dụng <strong>V-ing (Danh động từ)</strong>. Bản thân V-ing đóng vai trò là một <strong>danh từ trừu tượng đếm không được</strong>.
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-bottom:20px;">
            <!-- RULE 1 -->
            <div style="background:#eff6ff; border:2px solid #bfdbfe; border-radius:12px; padding:16px;">
              <div style="font-size:0.8rem; font-weight:800; color:#1e40af; text-transform:uppercase; margin-bottom:8px;">
                QUY TẮC 1: ĐỘNG TỪ CHÍNH LUÔN CHIA SỐ ÍT (SINGULAR VERB)
              </div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:1.05rem; font-weight:700; color:#1d4ed8; background:white; padding:10px 14px; border-radius:8px; border:1px solid #93c5fd; margin-bottom:10px;">
                V-ing (+ O / Adv) + V(số ít - is / was / has / Vs/es)
              </div>
              <p style="font-size:0.85rem; color:#1e3a8a; line-height:1.6;">
                • Dù tân ngữ đứng sau V-ing là danh từ số nhiều, động từ chính <strong>vẫn luôn chia số ít</strong>.<br>
                • <em>Ví dụ:</em> <strong>Learning</strong> about ASEAN cultures <strong>is</strong> very interesting.<br>
                • <em>Ví dụ:</em> <strong>Maintaining</strong> friendly relations with neighbouring countries <strong>requires</strong> mutual trust.
              </p>
            </div>

            <!-- RULE 2 -->
            <div style="background:#f0fdf4; border:2px solid #bbf7d0; border-radius:12px; padding:16px;">
              <div style="font-size:0.8rem; font-weight:800; color:#166534; text-transform:uppercase; margin-bottom:8px;">
                QUY TẮC 2: PHỦ ĐỊNH CỦA DANH ĐỘNG TỪ (NOT + V-ING)
              </div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:1.05rem; font-weight:700; color:#15803d; background:white; padding:10px 14px; border-radius:8px; border:1px solid #86efac; margin-bottom:10px;">
                NOT + V-ing (+ O) + V(số ít)
              </div>
              <p style="font-size:0.85rem; color:#14532d; line-height:1.6;">
                • Thêm trực tiếp <strong>NOT</strong> ngay trước danh động từ (tuyệt đối không mượn trợ động từ don't/doesn't).<br>
                • <em>Ví dụ:</em> <strong>Not knowing</strong> local diplomatic customs <strong>causes</strong> serious cultural misunderstandings.<br>
                • <em>Ví dụ:</em> <strong>Not adhering</strong> to the charter <strong>undermines</strong> mutual trust.
              </p>
            </div>
          </div>

          <div class="pitfall-box">
            <strong>⚠️ BẪY THI 8.5+ THƯỜNG GẶP NHẤT:</strong>
            <p style="margin-top:6px; font-size:0.9rem;">
              ❌ <em>"Promoting regional cultural exchanges <u>are</u> important."</em> ➔ <strong>SAI!</strong> Thí sinh bị bẫy bởi danh từ số nhiều <em>exchanges</em> đứng ngay trước.<br>
              ✅ <em>"Promoting regional cultural exchanges <strong>is</strong> important."</em> ➔ <strong>ĐÚNG!</strong> Chủ ngữ chính là hành động <em>Promoting</em> (ngôi thứ 3 số ít).
            </p>
          </div>

          <div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:10px; padding:14px; margin-top:16px;">
            <strong style="color:#7e22ce;">CẶP BIẾN ĐỔI GIẢ CHỦ NGỮ:</strong>
            <code style="display:block; margin:6px 0; font-weight:700; color:#6b21a8;">It + be + Adj + (for sb) + to-V &hArr; V-ing + be + Adj</code>
            <p style="font-size:0.85rem; color:#581c87; margin:0;">
              <em>It is essential to preserve cultural identity.</em> &hArr; <strong>Preserving</strong> cultural identity <strong>is</strong> essential.
            </p>
          </div>
        </div>
      `,
      drills: [
        {
          id: "d1_1",
          question: "Preserving traditional customs and national cultural identity ______ a challenging task for many Southeast Asian nations in the era of globalization.",
          options: ["A. are", "B. is", "C. have been", "D. were"],
          correct: 1,
          explanation: "Chủ ngữ là danh động từ 'Preserving' (việc bảo tồn - ngôi thứ 3 số ít). Mặc dù có các danh từ số nhiều 'customs', 'nations', động từ chính vẫn luôn chia số ít là 'is'."
        },
        {
          id: "d1_2",
          question: "______ diplomatic protocols during bilateral negotiations causes serious misunderstandings between governments.",
          options: ["A. Not respect", "B. Not respecting", "C. Don't respect", "D. Without respect"],
          correct: 1,
          explanation: "Ở vị trí chủ ngữ, dạng phủ định của danh động từ là 'Not + V-ing' ➔ 'Not respecting'. Tuyệt đối không dùng trợ động từ 'Don't respect' làm chủ ngữ."
        },
        {
          id: "d1_3",
          question: "Building strong trade partnerships among ASEAN member states ______ economic prosperity across the entire region.",
          options: ["A. ensure", "B. ensures", "C. ensuring", "D. have ensured"],
          correct: 1,
          explanation: "Chủ ngữ là hành động 'Building' (V-ing số ít) ➔ Động từ chính chia ở thì Hiện tại đơn ngôi thứ 3 số ít: 'ensures'."
        },
        {
          id: "d1_4",
          question: "\"It is essential for young delegates to master diplomatic etiquette.\" Câu nào đồng nghĩa?",
          options: [
            "A. Mastering diplomatic etiquette is essential for young delegates.",
            "B. To master diplomatic etiquette are essential for young delegates.",
            "C. Master diplomatic etiquette is essential for young delegates.",
            "D. Mastering diplomatic etiquette are essential for young delegates."
          ],
          correct: 0,
          explanation: "Áp dụng cấu trúc chuyển đổi giả chủ ngữ: It + be + Adj + to-V &hArr; V-ing + be(số ít) + Adj. 'Mastering diplomatic etiquette is essential...' là phương án hoàn toàn chính xác."
        }
      ]
    },
    {
      id: "gram2",
      title: "2. Danh Động Từ Sau Giới Từ & 10 Cụm 'TO' Bắt Buộc Đi Với V-ing",
      focus: "Bản chất giới từ 'TO' vs to-infinitive & Bảng 10 Cụm từ cố định bẫy đề thi 8.5+",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 GERUND ĐỨNG SAU GIỚI TỪ (PREPOSITIONS)
          </h4>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:16px;">
            Mọi động từ đứng ngay sau <strong>giới từ (in, on, at, about, for, of, by, without, prior to...)</strong> đều bắt buộc phải chia ở dạng <strong>V-ing</strong>.
          </p>

          <div style="background:#fefce8; border:2px solid #fef08a; border-radius:12px; padding:16px; margin-bottom:18px;">
            <div style="font-size:0.85rem; font-weight:800; color:#854d0e; text-transform:uppercase; margin-bottom:8px;">
              🔥 BẢNG 10 CỤM CÓ GIỚI TỪ "TO" BẮT BUỘC ĐI VỚI V-ING (TRỌNG TÂM PHÂN LOẠI 8.5+):
            </div>
            <p style="font-size:0.85rem; color:#713f12; margin-bottom:10px;">
              Trong 10 cụm dưới đây, <strong>"TO" LÀ GIỚI TỪ (PREPOSITION)</strong>, do đó sau nó bắt buộc dùng <strong>V-ing</strong> (không dùng To-V):
            </p>
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:0.85rem; background:white; border-radius:8px; overflow:hidden;">
                <thead>
                  <tr style="background:#fef9c3; text-align:left; color:#854d0e;">
                    <th style="padding:8px 10px; border-bottom:1px solid #fef08a;">Cụm từ cố định</th>
                    <th style="padding:8px 10px; border-bottom:1px solid #fef08a;">Nghĩa tiếng Việt</th>
                    <th style="padding:8px 10px; border-bottom:1px solid #fef08a;">Ví dụ thực tế ASEAN</th>
                  </tr>
                </thead>
                <tbody style="color:#713f12;">
                  <tr><td style="padding:8px 10px; font-weight:700;">1. contribute to + V-ing</td><td style="padding:8px 10px;">đóng góp vào</td><td style="padding:8px 10px;">contributes to <strong>strengthening</strong> regional stability</td></tr>
                  <tr><td style="padding:8px 10px; font-weight:700;">2. look forward to + V-ing</td><td style="padding:8px 10px;">háo hức chờ mong</td><td style="padding:8px 10px;">look forward to <strong>participating</strong> in the youth camp</td></tr>
                  <tr><td style="padding:8px 10px; font-weight:700;">3. be / get used to + V-ing</td><td style="padding:8px 10px;">quen với việc gì</td><td style="padding:8px 10px;">used to <strong>working</strong> in multicultural environments</td></tr>
                  <tr><td style="padding:8px 10px; font-weight:700;">4. be committed to + V-ing</td><td style="padding:8px 10px;">cam kết làm gì</td><td style="padding:8px 10px;">committed to <strong>abiding</strong> by the ASEAN Charter</td></tr>
                  <tr><td style="padding:8px 10px; font-weight:700;">5. object to + V-ing</td><td style="padding:8px 10px;">phản đối việc gì</td><td style="padding:8px 10px;">objected to <strong>delaying</strong> the trade integration</td></tr>
                  <tr><td style="padding:8px 10px; font-weight:700;">6. be dedicated to + V-ing</td><td style="padding:8px 10px;">cống hiến vì</td><td style="padding:8px 10px;">dedicated to <strong>supporting</strong> underprivileged youth</td></tr>
                  <tr><td style="padding:8px 10px; font-weight:700;">7. in addition to + V-ing</td><td style="padding:8px 10px;">bên cạnh việc gì</td><td style="padding:8px 10px;">in addition to <strong>promoting</strong> commercial trade</td></tr>
                  <tr><td style="padding:8px 10px; font-weight:700;">8. with a view to + V-ing</td><td style="padding:8px 10px;">nhằm mục đích</td><td style="padding:8px 10px;">held with a view to <strong>deepening</strong> mutual trust</td></tr>
                  <tr><td style="padding:8px 10px; font-weight:700;">9. prior to + V-ing</td><td style="padding:8px 10px;">trước khi làm gì</td><td style="padding:8px 10px;">prior to <strong>joining</strong> ASEAN in 1995</td></tr>
                  <tr><td style="padding:8px 10px; font-weight:700;">10. admit to + V-ing</td><td style="padding:8px 10px;">thú nhận đã làm</td><td style="padding:8px 10px;">admitted to <strong>mishandling</strong> the conference funds</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.7;">
            <strong>Các cụm giới từ cốt lõi khác:</strong><br>
            • <code>succeed in + V-ing</code>: thành công trong việc... (<em>succeeded in maintaining peace</em>)<br>
            • <code>prevent/stop sb from + V-ing</code>: ngăn cản ai làm gì (<em>prevent disputes from escalating</em>)<br>
            • <code>by + V-ing</code> (bằng cách) vs <code>without + V-ing</code> (mà không làm gì): <em>resolve conflicts <strong>by listening</strong>; cannot pass <strong>without reaching</strong> consensus.</em>
          </div>
        </div>
      `,
      drills: [
        {
          id: "d2_1",
          question: "High-ranking representatives of the ten member nations are looking forward to ______ in the opening ceremony of the 43rd ASEAN Summit.",
          options: ["A. participate", "B. participating", "C. participated", "D. have participated"],
          correct: 1,
          explanation: "Cấu trúc cố định: 'look forward to + V-ing' (chữ 'to' ở đây là giới từ, không phải to-infinitive). Đáp án đúng là 'participating'."
        },
        {
          id: "d2_2",
          question: "Viet Nam has shown strong commitment to ______ peace, security, and economic cooperation across the Asia-Pacific region.",
          options: ["A. maintain", "B. maintained", "C. maintaining", "D. maintenance"],
          correct: 2,
          explanation: "Cụm danh từ: 'commitment to + V-ing' (sự cam kết làm điều gì). Sau giới từ 'to' bắt buộc chọn V-ing: 'maintaining'."
        },
        {
          id: "d2_3",
          question: "In addition to ______ humanitarian assistance to flood victims, the charity group organized free language classes for local children.",
          options: ["A. provide", "B. provided", "C. providing", "D. to providing"],
          correct: 2,
          explanation: "Cụm liên từ/giới từ: 'in addition to + V-ing' (bên cạnh việc làm gì). Do đó chọn 'providing'."
        },
        {
          id: "d2_4",
          question: "The leaders held an emergency session with a view to ______ long-standing cross-border trade barriers.",
          options: ["A. eliminate", "B. eliminating", "C. to eliminate", "D. eliminated"],
          correct: 1,
          explanation: "Cụm từ: 'with a view to + V-ing' (nhằm mục đích làm gì). Thí sinh hay nhầm lẫn chọn A do tưởng là 'to + V'. Đáp án đúng là B (eliminating)."
        }
      ]
    },
    {
      id: "gram3",
      title: "3. Động Từ Bắt Buộc Theo Sau Bởi V-ing & 8 Thành Ngữ Cố Định",
      focus: "3 Nhóm động từ theo trường nghĩa & 8 Thành ngữ kinh điển luôn đi với V-ing",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 ĐỘNG TỪ ĐI KÈM GERUND & CÁC THÀNH NGỮ BẤT BIẾN
          </h4>

          <div style="overflow-x:auto; margin-bottom:18px;">
            <table class="modal-rules-table" style="width:100%; border-collapse:collapse;">
              <thead>
                <tr style="background:#f8fafc; text-align:left;">
                  <th style="padding:10px; border-bottom:2px solid #e2e8f0;">Nhóm ngữ nghĩa</th>
                  <th style="padding:10px; border-bottom:2px solid #e2e8f0;">Động từ đi kèm V-ing</th>
                  <th style="padding:10px; border-bottom:2px solid #e2e8f0;">Ví dụ thực chiến</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding:10px; border-bottom:1px solid #e2e8f0; font-weight:700; color:#1d4ed8;">1. Sở thích & Cảm xúc</td>
                  <td style="padding:10px; border-bottom:1px solid #e2e8f0;">enjoy, fancy, adore, dislike, detest, mind, tolerate</td>
                  <td style="padding:10px; border-bottom:1px solid #e2e8f0;">Thai <strong>enjoys participating</strong> in youth summits.</td>
                </tr>
                <tr>
                  <td style="padding:10px; border-bottom:1px solid #e2e8f0; font-weight:700; color:#15803d;">2. Tiến trình & Trì hoãn</td>
                  <td style="padding:10px; border-bottom:1px solid #e2e8f0;">avoid, delay, postpone, put off, finish, practice, keep, risk</td>
                  <td style="padding:10px; border-bottom:1px solid #e2e8f0;">They <strong>postponed signing</strong> the bilateral agreement.</td>
                </tr>
                <tr>
                  <td style="padding:10px; font-weight:700; color:#b45309;">3. Đề xuất & Nhận định</td>
                  <td style="padding:10px;">suggest, recommend, consider, imagine, involve, admit, deny</td>
                  <td style="padding:10px;">The ambassador <strong>suggested hosting</strong> an educational workshop.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:14px;">
            <strong style="color:#166534;">8 THÀNH NGỮ CỐ ĐỊNH (IDIOMATIC EXPRESSIONS) BẮT BUỘC ĐI VỚI V-ING:</strong>
            <ul style="font-size:0.85rem; color:#14532d; line-height:1.8; margin-top:8px;">
              <li>1. <strong>can't help / can't stand / can't bear + V-ing</strong>: không thể không / không thể chịu nổi làm gì</li>
              <li>2. <strong>it's no use / it's no good + V-ing</strong>: vô ích khi làm điều gì</li>
              <li>3. <strong>there is no point in + V-ing</strong>: chẳng có lý do/ích lợi gì khi làm gì</li>
              <li>4. <strong>be worth + V-ing</strong>: đáng giá, rất đáng để làm việc gì</li>
              <li>5. <strong>spend time / money + (on) + V-ing</strong>: dành thời gian/tiền bạc làm gì</li>
              <li>6. <strong>waste time / money + (on) + V-ing</strong>: lãng phí thời gian/tiền bạc làm gì</li>
              <li>7. <strong>have difficulty / trouble (in) + V-ing</strong>: gặp khó khăn, trở ngại khi làm gì</li>
              <li>8. <strong>be busy + V-ing</strong>: đang bận rộn làm việc gì</li>
            </ul>
          </div>
        </div>
      `,
      drills: [
        {
          id: "d3_1",
          question: "The minister suggested ______ an annual cultural festival to celebrate the founding anniversary of ASEAN.",
          options: ["A. to organize", "B. organizing", "C. organized", "D. organize"],
          correct: 1,
          explanation: "Động từ 'suggest' khi đi trực tiếp với một động từ khác bắt buộc theo sau bởi V-ing: 'suggest doing sth'. Do đó chọn 'organizing'."
        },
        {
          id: "d3_2",
          question: "It is no use ______ about the strict visa requirements; we had better prepare all necessary documentation promptly.",
          options: ["A. to complain", "B. complain", "C. complaining", "D. complained"],
          correct: 2,
          explanation: "Thành ngữ cố định: 'It is no use + V-ing' (vô ích khi làm gì). Đáp án đúng là C (complaining)."
        },
        {
          id: "d3_3",
          question: "Many international delegates had great difficulty ______ the rapid rhythm of the regional summit discussions.",
          options: ["A. following", "B. to follow", "C. followed", "D. follow"],
          correct: 0,
          explanation: "Cấu trúc thành ngữ: 'have difficulty / trouble (in) + V-ing' (gặp khó khăn khi làm gì). Do đó chọn 'following'."
        },
        {
          id: "d3_4",
          question: "This historical research paper on 30 years of Viet Nam in ASEAN is definitely worth ______ before your presentation.",
          options: ["A. read", "B. reading", "C. to read", "D. having read"],
          correct: 1,
          explanation: "Cấu trúc: 'be worth + V-ing' (rất đáng để làm việc gì). Chọn B (reading)."
        }
      ]
    },
    {
      id: "gram4",
      title: "4. 6 Cặp Động Từ Thay Đổi Ý Nghĩa (V-ing vs To-V) & Phân Hóa Điểm 8.5+",
      focus: "Mục tiêu 8.5+ - Remember, Forget, Stop, Regret, Try, Need & Bẫy Đề Thi",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 6 CẶP ĐỘNG TỪ THAY ĐỔI Ý NGHĨA KHI ĐI VỚI V-ING VS TO-V
          </h4>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin-bottom:16px;">
            <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:10px; padding:14px;">
              <strong style="color:#be123c;">1. REMEMBER</strong><br>
              • <code>+ To-V</code>: Nhớ <strong>phải làm</strong> nhiệm vụ trong tương lai.<br>
              • <code>+ V-ing</code>: Nhớ ký ức <strong>đã làm</strong> trong quá khứ.<br>
              <em>Ví dụ:</em> Remember <strong>to bring</strong> your badge. vs I remember <strong>visiting</strong> Jakarta.
            </div>

            <div style="background:#fef2f2; border:1px solid #fee2e2; border-radius:10px; padding:14px;">
              <strong style="color:#991b1b;">2. FORGET</strong><br>
              • <code>+ To-V</code>: Quên <strong>phải làm</strong> điều gì (chưa thực hiện).<br>
              • <code>+ V-ing</code>: Quên ký ức <strong>đã từng làm</strong> (thường dùng: <em>will never forget</em>).<br>
              <em>Ví dụ:</em> Don't forget <strong>to submit</strong>. vs Never forget <strong>giving</strong> the speech.
            </div>

            <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:10px; padding:14px;">
              <strong style="color:#6d28d9;">3. STOP</strong><br>
              • <code>+ To-V</code>: <strong>Dừng lại để làm</strong> việc khác (chỉ mục đích).<br>
              • <code>+ V-ing</code>: <strong>Dừng hẳn, từ bỏ</strong> một hành động/thói quen.<br>
              <em>Ví dụ:</em> Stopped <strong>to take</strong> photos. vs Stopped <strong>imposing</strong> unilateral tariffs.
            </div>

            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:14px;">
              <strong style="color:#15803d;">4. REGRET</strong><br>
              • <code>+ To-V</code>: Lấy làm tiếc <strong>phải thông báo</strong> tin buồn (với <em>inform, announce</em>).<br>
              • <code>+ V-ing</code>: Hối tiếc vì <strong>đã trót làm</strong> việc gì.<br>
              <em>Ví dụ:</em> Regret <strong>to inform</strong> you. vs Regretted <strong>not participating</strong> in the summit.
            </div>

            <div style="background:#fefce8; border:1px solid #fef08a; border-radius:10px; padding:14px;">
              <strong style="color:#854d0e;">5. TRY</strong><br>
              • <code>+ To-V</code>: <strong>Cố gắng, nỗ lực hết mình</strong> vượt qua khó khăn để làm.<br>
              • <code>+ V-ing</code>: <strong>Thử nghiệm</strong> một phương pháp/giải pháp mới xem kết quả.<br>
              <em>Ví dụ:</em> Tried <strong>to achieve</strong> consensus. vs Try <strong>reaching out</strong> via digital channels.
            </div>

            <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:14px;">
              <strong style="color:#1e40af;">6. NEED</strong><br>
              • <code>+ To-V</code>: Ai đó cần phải làm gì (chủ động).<br>
              • <code>+ V-ing (= need to be V3/ed)</code>: Cái gì đó <strong>cần được sửa chữa, cập nhật</strong> (bị động).<br>
              <em>Ví dụ:</em> We need <strong>to foster</strong> trust. vs The website needs <strong>updating</strong> (= to be updated).
            </div>
          </div>
        </div>
      `,
      drills: [
        {
          id: "d4_1",
          question: "On their way to the ASEAN Secretariat building, the delegates stopped ______ some fuel for their service vehicle.",
          options: ["A. get", "B. getting", "C. to get", "D. got"],
          correct: 2,
          explanation: "Hành động 'dừng xe lại ĐỂ ĐỔ XĂNG' là dừng lại nhằm mục đích thực hiện hành động khác ➔ Dùng 'stop + to-V'. Đáp án đúng là C (to get)."
        },
        {
          id: "d4_2",
          question: "I distinctly remember ______ the Minister of Foreign Affairs at the bilateral summit in Singapore three years ago.",
          options: ["A. meet", "B. meeting", "C. to meet", "D. met"],
          correct: 1,
          explanation: "Nhớ lại một ký ức/trải nghiệm đã diễn ra trong quá khứ ('three years ago') ➔ Dùng 'remember + V-ing'. Chọn B (meeting)."
        },
        {
          id: "d4_3",
          question: "We deeply regret ______ you that your application for the ASEAN Youth Ambassador programme was unsuccessful.",
          options: ["A. to inform", "B. informing", "C. inform", "D. informed"],
          correct: 0,
          explanation: "Cụm từ trang trọng khi thông báo tin không vui: 'regret to inform/tell sb' (lấy làm tiếc phải thông báo điều gì). Chọn A (to inform)."
        },
        {
          id: "d4_4",
          question: "The official translation of the ASEAN trade protocol is inaccurate; it urgently needs ______ before publication.",
          options: ["A. to revise", "B. revising", "C. revise", "D. revised"],
          correct: 1,
          explanation: "Chủ ngữ là vật ('The official translation' - bản dịch), mang nghĩa bị động: cần ĐƯỢC CHỈNH SỬA ➔ Dùng 'need + V-ing' (= need to be revised). Chọn B (revising)."
        }
      ]
    },
    {
      id: "gram5",
      title: "5. Danh Động Từ Hoàn Thành (Perfect Gerunds: Having + V3/ed)",
      focus: "Phân hóa 8.5+ - Nhấn mạnh hành động xảy ra trước & Dạng bị động (Having been + V3/ed)",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 BẢN CHẤT: PERFECT GERUNDS (HAVING + V3/ED)
          </h4>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:16px;">
            Được dùng khi ta muốn <strong>nhấn mạnh dứt khoát</strong> rằng một hành động đã diễn ra và hoàn tất <strong>TRƯỚC</strong> thời điểm của động từ chính trong câu.
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-bottom:20px;">
            <div style="background:#eff6ff; border:2px solid #93c5fd; border-radius:12px; padding:16px;">
              <div style="font-size:0.8rem; font-weight:800; color:#1e40af; text-transform:uppercase; margin-bottom:8px;">
                DẠNG CHỦ ĐỘNG (ACTIVE PERFECT GERUND)
              </div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:1.05rem; font-weight:700; color:#1d4ed8; background:white; padding:10px 14px; border-radius:8px; border:1px solid #93c5fd; margin-bottom:10px;">
                Having + V(3/ed)
              </div>
              <p style="font-size:0.85rem; color:#1e3a8a; line-height:1.6;">
                • Dùng sau: <em>admit, deny, regret, apologize for, congratulate on, be praised for...</em><br>
                • <em>Ví dụ:</em> The diplomat admitted <strong>having made</strong> an inaccurate statement during the press conference.
              </p>
            </div>

            <div style="background:#faf5ff; border:2px solid #d8b4fe; border-radius:12px; padding:16px;">
              <div style="font-size:0.8rem; font-weight:800; color:#6b21a8; text-transform:uppercase; margin-bottom:8px;">
                DẠNG BỊ ĐỘNG (PASSIVE PERFECT GERUND)
              </div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:1.05rem; font-weight:700; color:#7e22ce; background:white; padding:10px 14px; border-radius:8px; border:1px solid #c084fc; margin-bottom:10px;">
                Having been + V(3/ed)
              </div>
              <p style="font-size:0.85rem; color:#581c87; line-height:1.6;">
                • Nhấn mạnh chủ thể <strong>được / bị tác động</strong> bởi hành động đã hoàn tất trong quá khứ.<br>
                • <em>Ví dụ:</em> She felt proud of <strong>having been selected</strong> as the ASEAN youth ambassador.
              </p>
            </div>
          </div>

          <div class="pitfall-box">
            <strong>⚠️ BẪY THI THPT QUỐC GIA:</strong>
            <p style="margin-top:6px; font-size:0.9rem;">
              Khi hai hành động có khoảng cách thời gian rõ rệt, đề thi thường bắt buộc dùng <strong>Having + V3/ed</strong> thay vì V-ing đơn thuần để nhấn mạnh tính trước - sau!<br>
              <em>"He was accused of <strong>having leaked</strong> confidential documents."</em> (Hành động làm rò rỉ diễn ra trước khi bị phát hiện và cáo buộc).
            </p>
          </div>
        </div>
      `,
      drills: [
        {
          id: "d5_1",
          question: "The former spokesperson denied ______ confidential discussion records of the summit to foreign journalists.",
          options: ["A. to leak", "B. having leaked", "C. have leaked", "D. be leaked"],
          correct: 1,
          explanation: "Hành động 'làm rò rỉ thông tin' diễn ra và hoàn tất trước hành động 'phủ nhận' (denied) ➔ Dùng Perfect Gerund 'having leaked'."
        },
        {
          id: "d5_2",
          question: "Viet Nam was highly praised by international partners for ______ successfully as the ASEAN Chair in 2020.",
          options: ["A. having served", "B. to have served", "C. served", "D. have been serving"],
          correct: 0,
          explanation: "Sau giới từ 'for', hành động đảm nhiệm nhiệm kỳ chủ tịch đã hoàn thành trong năm 2020 (trước thời điểm được khen ngợi) ➔ 'for having served'."
        },
        {
          id: "d5_3",
          question: "The youth delegate was extremely proud of ______ selected as the national representative for the cultural gala.",
          options: ["A. having", "B. having been", "C. being", "D. to have been"],
          correct: 1,
          explanation: "Hành động 'được tuyển chọn' là bị động và đã hoàn thành trước đó ➔ Dùng Passive Perfect Gerund: 'having been selected'."
        },
        {
          id: "d5_4",
          question: "The diplomat apologized for ______ informed the organizing committee about the sudden schedule changes in advance.",
          options: ["A. not having", "B. having not", "C. don't have", "D. not to have"],
          correct: 0,
          explanation: "Dạng phủ định của Perfect Gerund: 'Not + having + V3/ed' ➔ 'not having informed' (vì đã không thông báo trước)."
        }
      ]
    },
    {
      id: "gram6",
      title: "6. 6 Cấu Trúc Viết Lại Câu Kinh Điển Với Danh Động Từ Trong Đề Thi",
      focus: "Mục tiêu 8.5+ - Rèn luyện kỹ năng biến đổi câu tương đương chuẩn đề thi THPT",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 6 DẠNG BIẾN ĐỔI CÂU BẤT HỦ VỚI GERUNDS
          </h4>

          <div class="transform-formula-box">
            <ul style="font-size:0.9rem; line-height:1.8;">
              <li style="margin-bottom:12px;">
                <strong>1. Dạng Đề xuất (Suggestion):</strong><br>
                <code>Let's / Why don't we / Shall we + V?</code> &rarr; <code>S + suggested + V-ing</code><br>
                <em>Ví dụ:</em> "Why don't we set up a regional youth council?" &rarr; <em>The president suggested <strong>setting up</strong> a regional youth council.</em>
              </li>
              <li style="margin-bottom:12px;">
                <strong>2. Dạng Vô ích khi làm gì (Pointless / No use):</strong><br>
                <code>It is pointless / meaningless + to-V</code> &rarr; <code>There is no point in + V-ing</code> = <code>It is no use / no good + V-ing</code><br>
                <em>Ví dụ:</em> It is pointless to argue about border regulations without consultation. &rarr; <em>There is no point in <strong>arguing</strong>...</em>
              </li>
              <li style="margin-bottom:12px;">
                <strong>3. Dạng Tiêu tốn thời gian (Spends vs Takes):</strong><br>
                <code>It takes/took + sb + [time] + to-V</code> &rarr; <code>S + spend/spent + [time] + (on) + V-ing</code><br>
                <em>Ví dụ:</em> It took the delegate two days to review the draft charter. &rarr; <em>The delegate spent two days <strong>reviewing</strong>...</em>
              </li>
              <li style="margin-bottom:12px;">
                <strong>4. Dạng Thừa nhận / Phủ nhận với Perfect Gerund:</strong><br>
                <code>S + admitted / denied that S had done sth</code> &rarr; <code>S + admitted / denied + (having) + V3/ed</code><br>
                <em>Ví dụ:</em> The witness admitted that he had seen the transaction. &rarr; <em>The witness admitted <strong>having seen</strong>...</em>
              </li>
              <li style="margin-bottom:12px;">
                <strong>5. Dạng Gặp khó khăn (Difficulty):</strong><br>
                <code>It was difficult for sb to-V</code> &rarr; <code>S + had difficulty / trouble (in) + V-ing</code><br>
                <em>Ví dụ:</em> It was difficult for students to adapt to the conference pace. &rarr; <em>Students had difficulty (in) <strong>adapting</strong>...</em>
              </li>
              <li>
                <strong>6. Dạng Cụm giới từ "TO" bẫy:</strong><br>
                <code>S + look forward to / object to / contribute to + V-ing</code> (Tuyệt đối không dùng to-V!)<br>
                <em>Ví dụ:</em> She looks forward to <strong>receiving</strong> the ASEAN scholarship letter.
              </li>
            </ul>
          </div>
        </div>
      `,
      drills: [
        {
          id: "d6_1",
          question: "\"Why don't we set up a regional youth volunteer network?\" the president said. ➔ The president suggested ______ a regional youth volunteer network.",
          options: ["A. to set up", "B. setting up", "C. set up", "D. should set up"],
          correct: 1,
          explanation: "Công thức biến đổi đề xuất: 'Why don't we + V' ➔ 'suggest + V-ing'. Đáp án đúng là B (setting up)."
        },
        {
          id: "d6_2",
          question: "\"It took Thai two weeks to complete his presentation on ASEAN solidarity.\" Câu nào đồng nghĩa?",
          options: [
            "A. Thai spent two weeks to complete his presentation on ASEAN solidarity.",
            "B. Thai spent two weeks completing his presentation on ASEAN solidarity.",
            "C. Thai wastes two weeks completing his presentation on ASEAN solidarity.",
            "D. Thai has difficulty completing his presentation in two weeks."
          ],
          correct: 1,
          explanation: "Công thức chuyển đổi: It took sb + [time] + to-V &hArr; S + spent + [time] + (on) + V-ing. Đáp án đúng là B."
        },
        {
          id: "d6_3",
          question: "\"It is completely useless to argue about tariff details without clear market data.\" Câu nào đồng nghĩa?",
          options: [
            "A. There is no point in arguing about tariff details without clear market data.",
            "B. There is no use to argue about tariff details without clear market data.",
            "C. There is no point to argue about tariff details without clear market data.",
            "D. It is not worth to argue about tariff details without clear market data."
          ],
          correct: 0,
          explanation: "Công thức: 'It is useless + to-V' ➔ 'There is no point in + V-ing'. Phương án A là đáp án hoàn toàn chuẩn xác."
        },
        {
          id: "d6_4",
          question: "\"I did not reveal any confidential information to unauthorized persons,\" the officer said. ➔ The officer denied ______ any confidential information to unauthorized persons.",
          options: ["A. to reveal", "B. having revealed", "C. reveal", "D. have revealed"],
          correct: 1,
          explanation: "Chuyển câu gián tiếp phủ nhận việc đã xảy ra trong quá khứ: 'S + denied + having V3/ed'. Đáp án đúng là B (having revealed)."
        }
      ]
    }
  ],

  // 3. COLLOCATION MATCHING PAIRS (8 CẶP NỐI TỪ VỀ ASEAN & HỘI NHẬP)
  collocationPairs: [
    { id: 1, verb: "maintain", noun: "peace, stability, and maritime security", meaning: "(duy trì hòa bình và an ninh hàng hải)" },
    { id: 2, verb: "promote", noun: "mutual understanding and economic growth", meaning: "(thúc đẩy sự hiểu biết lẫn nhau & kinh tế)" },
    { id: 3, verb: "make", noun: "a significant contribution to the ASEAN bloc", meaning: "(đóng góp to lớn cho khối ASEAN)" },
    { id: 4, verb: "strengthen", noun: "bilateral ties and diplomatic relations", meaning: "(củng cố quan hệ ngoại giao song phương)" },
    { id: 5, verb: "participate in", noun: "annual cultural exchanges and youth camps", meaning: "(tham gia giao lưu văn hóa thường niên)" },
    { id: 6, verb: "preserve", noun: "unique cultural identity while integrating", meaning: "(bảo tồn bản sắc văn hóa khi hội nhập)" },
    { id: 7, verb: "get involved in", noun: "voluntary community projects across the region", meaning: "(tham gia vào các dự án cộng đồng)" },
    { id: 8, verb: "abide by", noun: "the principles of the ASEAN Charter", meaning: "(tuân thủ các nguyên tắc của Hiến chương)" }
  ],

  // 3B. ODD-ONE-OUT COLLOCATION (4 CÂU ĐỐ TÌM TỪ KHÔNG ĐI CÙNG ĐƯỢC)
  oddOneOut: [
    {
      id: 1,
      nounPhrase: "________ a contribution to regional solidarity",
      options: ["make", "give", "offer", "manufacture"],
      wrongIndex: 3,
      explanation: "Chính xác! Cụm cố định là 'make/give/offer a contribution to' (đóng góp vào). Từ 'manufacture' (sản xuất hàng loạt) không dùng với danh từ trừu tượng 'contribution'!"
    },
    {
      id: 2,
      nounPhrase: "look forward to ________ at the summit",
      options: ["participating", "attending", "speaking", "to participate"],
      wrongIndex: 3,
      explanation: "Chính xác! Cấu trúc đúng là 'look forward to + V-ing'. 'To participate' là bẫy phổ biến vì chữ 'to' ở đây là giới từ, không phải to-infinitive!"
    },
    {
      id: 3,
      nounPhrase: "________ peace and regional stability",
      options: ["maintain", "preserve", "safeguard", "interfere"],
      wrongIndex: 3,
      explanation: "Chính xác! Ta dùng 'maintain / preserve / safeguard peace' (duy trì, bảo tồn, bảo vệ hòa bình). 'Interfere' mang nghĩa can thiệp quấy rầy, không thể đi trực tiếp làm ngoại động từ!"
    },
    {
      id: 4,
      nounPhrase: "suggested ________ a regional youth exchange",
      options: ["organizing", "hosting", "launching", "to organize"],
      wrongIndex: 3,
      explanation: "Chính xác! Động từ 'suggest' khi đi trực tiếp với động từ phía sau bắt buộc phải dùng V-ing: 'suggest doing sth', không bao giờ dùng 'suggest to do'!"
    }
  ],

  // 4. WORD FAMILY TREE (4 GỐC TỪ CỐT LÕI)
  wordFamilyRoots: [
    {
      id: 1,
      root: "SOLIDARITY",
      pos: "noun",
      meaning: "sự đoàn kết, gắn bó",
      derivatives: [
        { word: "solidarity", pos: "noun", vi: "tình đoàn kết khu vực" },
        { word: "solidary", pos: "adjective", vi: "đoàn kết, nhất trí" },
        { word: "solidarize", pos: "verb", vi: "làm cho đoàn kết, gắn bó" }
      ]
    },
    {
      id: 2,
      root: "STABLE",
      pos: "adjective",
      meaning: "ổn định, vững chắc",
      derivatives: [
        { word: "stability", pos: "noun", vi: "sự ổn định chính trị/kinh tế" },
        { word: "stabilize", pos: "verb", vi: "làm ổn định, bình ổn" },
        { word: "instability", pos: "noun", vi: "sự bất ổn định" },
        { word: "stably", pos: "adverb", vi: "một cách vững chắc" }
      ]
    },
    {
      id: 3,
      root: "PROSPER",
      pos: "verb",
      meaning: "thịnh vượng, phát đạt",
      derivatives: [
        { word: "prosperity", pos: "noun", vi: "sự thịnh vượng, phồn vinh" },
        { word: "prosperous", pos: "adjective", vi: "thịnh vượng, giàu có" },
        { word: "prosperously", pos: "adverb", vi: "một cách thịnh vượng" }
      ]
    },
    {
      id: 4,
      root: "CONTRIBUTE",
      pos: "verb",
      meaning: "đóng góp, cống hiến",
      derivatives: [
        { word: "contribution", pos: "noun", vi: "sự đóng góp, cống hiến" },
        { word: "contributor", pos: "noun", vi: "người đóng góp" },
        { word: "contributory", pos: "adjective", vi: "có tính đóng góp, góp phần" }
      ]
    }
  ],

  // 4B. OPEN CLOZE WORD FORMATION (5 CÂU ĐIỀN DẠNG ĐÚNG CỦA TỪ TRONG NGOẶC)
  openCloze: [
    {
      id: 1,
      sentence: "Viet Nam has made significant _________ to the socioeconomic growth of ASEAN. (CONTRIBUTE)",
      root: "CONTRIBUTE",
      expectedAnswer: "contributions",
      explanation: "Sau tính từ 'significant' và sau động từ 'made' cần một DANH TỪ SỐ NHIỀU chỉ sự đóng góp ➔ contributions."
    },
    {
      id: 2,
      sentence: "All member nations work collaboratively to build a peaceful and _________ community. (PROSPERITY)",
      root: "PROSPERITY",
      expectedAnswer: "prosperous",
      explanation: "Trước danh từ 'community' và song song với tính từ 'peaceful' cần một TÍNH TỪ mang nghĩa thịnh vượng ➔ prosperous."
    },
    {
      id: 3,
      sentence: "Political _________ is recognized as a fundamental precondition for foreign investment. (STABLE)",
      root: "STABLE",
      expectedAnswer: "stability",
      explanation: "Vị trí chủ ngữ sau tính từ 'Political' cần một DANH TỪ chỉ sự ổn định ➔ stability."
    },
    {
      id: 4,
      sentence: "Thai was deeply honored to be chosen as a student _________ at the ASEAN youth forum. (REPRESENT)",
      root: "REPRESENT",
      expectedAnswer: "representative",
      explanation: "Cụm danh từ 'student representative' mang nghĩa 'đại diện học sinh' ➔ representative."
    },
    {
      id: 5,
      sentence: "Joining international exchange camps helps high schoolers _________ their cultural knowledge. (BROAD)",
      root: "BROAD",
      expectedAnswer: "broaden",
      explanation: "Sau cấu trúc 'helps sb (to) + V-nguyên thể' cần ĐỘNG TỪ mang nghĩa 'mở rộng' ➔ broaden."
    }
  ],

  // 5. ACTIVE RECALL FIRST-LETTER CLUE (5 CÂU ĐOÁN TỪ SIÊU TỐC)
  activeRecall: [
    {
      id: 1,
      sentence: "Member states demonstrated exceptional s_____________ by aiding each other after the storm.",
      clue: "s",
      targetWord: "solidarity",
      ipa: "/ˌsɒlɪˈdærəti/",
      vi: "Tình đoàn kết, gắn bó keo sơn",
      definition: "Mutual support and unity among individuals or nations who have a common interest."
    },
    {
      id: 2,
      sentence: "The official m_____________ of the ASEAN community is 'One Vision, One Identity, One Community'.",
      clue: "m",
      targetWord: "motto",
      ipa: "/ˈmɒtəʊ/",
      vi: "Khẩu hiệu, phương châm",
      definition: "A short sentence or phrase chosen as encapsulating the beliefs or ideals of an institution."
    },
    {
      id: 3,
      sentence: "The fundamental legal framework governing the bloc is formalized in the ASEAN C_____________.",
      clue: "c",
      targetWord: "charter",
      ipa: "/ˈtʃɑːtər/",
      vi: "Hiến chương pháp lý",
      definition: "A formal written document establishing the rights, rules, and principles of an organization."
    },
    {
      id: 4,
      sentence: "Cross-border trade agreements aim to generate sustainable economic p_____________ for all citizens.",
      clue: "p",
      targetWord: "prosperity",
      ipa: "/prɒˈsperəti/",
      vi: "Sự thịnh vượng, phồn vinh",
      definition: "The state of flourishing, thriving, good fortune and successful social status."
    },
    {
      id: 5,
      sentence: "Viet Nam has shown great commitment to s_____________ regional defense and economic partnerships.",
      clue: "s",
      targetWord: "strengthening",
      ipa: "/ˈstreŋθnɪŋ/",
      vi: "Tăng cường, củng cố",
      definition: "Making something stronger, firmer, or more effective over time."
    }
  ],

  // 6. INTERACTIVE SENTENCE WRITING (4 THỬ THÁCH ĐẶT CÂU CÓ THẨM ĐỊNH TỰ ĐỘNG)
  writingChallenges: [
    {
      id: 1,
      keyword: "look forward to participating",
      prompt: "Hãy viết 1 câu sử dụng 'look forward to' diễn tả: 'Học sinh đang rất mong đợi được tham gia vào lễ hội văn hóa ASEAN' (chú ý: sau look forward to dùng V-ing).",
      requiredWords: ["look forward to", "participating"],
      forbiddenWords: ["look forward to participate", "looking forward to participate"],
      modelAnswer: "Students look forward to participating in the ASEAN cultural festival."
    },
    {
      id: 2,
      keyword: "Learning about ASEAN cultures is",
      prompt: "Hãy viết 1 câu sử dụng danh động từ làm chủ ngữ diễn tả: 'Tìm hiểu về các nền văn hóa ASEAN rất bổ ích đối với thanh thiếu niên' (chú ý: động từ chia số ít).",
      requiredWords: ["learning about", "is"],
      forbiddenWords: ["learning about ... are", "learn about asean"],
      modelAnswer: "Learning about ASEAN cultures is very beneficial for teenagers."
    },
    {
      id: 3,
      keyword: "avoided discussing",
      prompt: "Hãy viết 1 câu sử dụng 'avoided' diễn tả: 'Các đại biểu đã tránh thảo luận về những xung đột nhạy cảm tại cuộc họp' (chú ý: sau avoid dùng V-ing).",
      requiredWords: ["avoided", "discussing"],
      forbiddenWords: ["avoided to discuss", "avoid to discuss"],
      modelAnswer: "The delegates avoided discussing sensitive conflicts during the meeting."
    },
    {
      id: 4,
      keyword: "There is no point in",
      prompt: "Hãy viết 1 câu sử dụng 'There is no point in' diễn tả: 'Thật vô ích khi lo lắng về kỳ thi mà không có kế hoạch ôn tập chu đáo' (chú ý: sau point in dùng V-ing).",
      requiredWords: ["there is no point in", "worrying"],
      forbiddenWords: ["there is no point to worry", "no point in to worry"],
      modelAnswer: "There is no point in worrying about the exam without a proper study plan."
    }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = LECTURE_DATA;
}
