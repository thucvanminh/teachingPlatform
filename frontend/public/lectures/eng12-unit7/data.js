/**
 * DỮ LIỆU BÀI GIẢNG TƯƠNG TÁC: UNIT 7 - THE WORLD OF MASS MEDIA
 * Tiếng Anh 12 Global Success
 * Soạn riêng cho: Bạn Nam Việt (Lớp 12 - Mục tiêu 7+ THPTQG)
 * Hướng dẫn & Bản quyền: Thầy Thức
 */

const LECTURE_DATA = {
  title: "Cẩm Nang Tri Thức & Đấu Trường Từ Vựng Unit 7: The World of Mass Media",
  subject: "Tiếng Anh 12 (Global Success - Unit 7)",
  teacher: "Thầy Thức",

  // 1. TỪ VỰNG CỐT LÕI (20 TỪ VỰNG CỐT LÕI - SGK TRANG 90-101)
  vocabList: [
    {
        "id": 1,
        "unit": 1,
        "unitName": "Nhóm 1: Mass Media & Báo Chí",
        "word": "Mass media",
        "ipa": "/ˌmæs ˈmiːdiə/",
        "pos": "noun phr.",
        "meaning": "Phương tiện truyền thông đại chúng",
        "collocation": "traditional mass media / role of mass media",
        "example": "Mass media plays an essential role in keeping citizens informed about world events.",
        "exampleVi": "Truyền thông đại chúng đóng vai trò thiết yếu trong việc cung cấp thông tin thời sự thế giới cho người dân."
    },
    {
        "id": 2,
        "unit": 1,
        "unitName": "Nhóm 1: Mass Media & Báo Chí",
        "word": "The press",
        "ipa": "/ðə pres/",
        "pos": "noun",
        "meaning": "Giới báo chí, báo chí in ấn",
        "collocation": "freedom of the press / press conference",
        "example": "The government held an urgent press conference to address the crisis.",
        "exampleVi": "Chính phủ đã tổ chức một cuộc họp báo khẩn cấp để giải quyết khủng hoảng."
    },
    {
        "id": 3,
        "unit": 1,
        "unitName": "Nhóm 1: Mass Media & Báo Chí",
        "word": "Broadcast",
        "ipa": "/ˈbrɔːdkɑːst/",
        "pos": "verb, noun",
        "meaning": "Phát sóng; chương trình phát thanh / truyền hình",
        "collocation": "broadcast live / news broadcast",
        "example": "The national football match will be broadcast live on TV tonight.",
        "exampleVi": "Trận bóng đá quốc gia sẽ được phát sóng trực tiếp trên truyền hình tối nay."
    },
    {
        "id": 4,
        "unit": 1,
        "unitName": "Nhóm 1: Mass Media & Báo Chí",
        "word": "Digital media",
        "ipa": "/ˌdɪdʒɪtl ˈmiːdiə/",
        "pos": "noun phr.",
        "meaning": "Truyền thông số, phương tiện kỹ thuật số",
        "collocation": "rise of digital media / digital media platforms",
        "example": "Young people nowadays consume more news via digital media than printed papers.",
        "exampleVi": "Giới trẻ ngày nay tiếp nhận tin tức qua truyền thông số nhiều hơn báo giấy."
    },
    {
        "id": 5,
        "unit": 1,
        "unitName": "Nhóm 1: Mass Media & Báo Chí",
        "word": "Social platform",
        "ipa": "/ˌsəʊʃl ˈplætfɔːm/",
        "pos": "noun phr.",
        "meaning": "Nền tảng mạng xã hội",
        "collocation": "popular social platforms / share on social platforms",
        "example": "Many teenagers use social platforms like TikTok and Instagram to follow daily trends.",
        "exampleVi": "Nhiều thanh thiếu niên dùng các nền tảng mạng xã hội như TikTok và Instagram để theo dõi xu hướng hàng ngày."
    },
    {
        "id": 6,
        "unit": 1,
        "unitName": "Nhóm 1: Mass Media & Báo Chí",
        "word": "Circulation",
        "ipa": "/ˌsɜːkjəˈleɪʃn/",
        "pos": "noun",
        "meaning": "Số lượng phát hành (báo chí), sự lưu hành",
        "collocation": "daily circulation / huge circulation",
        "example": "The daily circulation of the national newspaper has declined due to the Internet.",
        "exampleVi": "Số lượng phát hành hàng ngày của tờ nhật báo đã sụt giảm do tác động của Internet."
    },
    {
        "id": 7,
        "unit": 2,
        "unitName": "Nhóm 2: Quảng Cáo & Thương Mại",
        "word": "Commercial",
        "ipa": "/kəˈmɜːʃl/",
        "pos": "noun, adj.",
        "meaning": "Đoạn quảng cáo (truyền hình/phát thanh); thuộc thương mại",
        "collocation": "commercial break / commercial advertising",
        "example": "Viewers frequently get annoyed when their favorite movie is interrupted by commercials.",
        "exampleVi": "Khán giả thường bực mình khi bộ phim yêu thích của họ bị ngắt quãng bởi các đoạn quảng cáo."
    },
    {
        "id": 8,
        "unit": 2,
        "unitName": "Nhóm 2: Quảng Cáo & Thương Mại",
        "word": "Publicity",
        "ipa": "/pʌbˈlɪsəti/",
        "pos": "noun",
        "meaning": "Sự công khai, sự chú ý của công chúng/quảng bá",
        "collocation": "gain massive publicity / bad publicity",
        "example": "The novel gained enormous publicity after winning the international book award.",
        "exampleVi": "Cuốn tiểu thuyết đã nhận được sự quan tâm khổng lồ từ công chúng sau khi đoạt giải thưởng sách quốc tế."
    },
    {
        "id": 9,
        "unit": 2,
        "unitName": "Nhóm 2: Quảng Cáo & Thương Mại",
        "word": "Promote",
        "ipa": "/prəˈməʊt/",
        "pos": "verb",
        "meaning": "Quảng bá, xúc tiến, thúc đẩy",
        "collocation": "promote healthy habits / promote new products",
        "example": "Social media influencers are paid thousands of dollars to promote beauty cosmetics.",
        "exampleVi": "Các cá nhân có ảnh hưởng trên mạng xã hội được trả hàng ngàn đô la để quảng bá mỹ phẩm làm đẹp."
    },
    {
        "id": 10,
        "unit": 3,
        "unitName": "Nhóm 3: Tính Xác Thực & Kỷ Nguyên Số",
        "word": "Reliable",
        "ipa": "/rɪˈlaɪəbl/",
        "pos": "adjective",
        "meaning": "Đáng tin cậy, có thể tin cậy",
        "collocation": "reliable news source / highly reliable data",
        "example": "You should only cite information gathered from reliable and reputable organizations.",
        "exampleVi": "Bạn chỉ nên trích dẫn thông tin thu thập từ các tổ chức đáng tin cậy và có uy tín."
    },
    {
        "id": 11,
        "unit": 3,
        "unitName": "Nhóm 3: Tính Xác Thực & Kỷ Nguyên Số",
        "word": "Bias",
        "ipa": "/ˈbaɪəs/",
        "pos": "noun, verb",
        "meaning": "Sự thiên vị, thành kiến",
        "collocation": "show strong bias towards / media bias",
        "example": "The news report demonstrated an obvious bias against renewable energy projects.",
        "exampleVi": "Bản tin thể hiện sự thiên vị rõ ràng chống lại các dự án năng lượng tái tạo."
    },
    {
        "id": 12,
        "unit": 3,
        "unitName": "Nhóm 3: Tính Xác Thực & Kỷ Nguyên Số",
        "word": "Viral",
        "ipa": "/ˈvaɪrəl/",
        "pos": "adjective",
        "meaning": "Lan truyền chóng mặt trên mạng",
        "collocation": "go viral / viral video clip",
        "example": "The humorous clip of the clever dog went viral and garnered millions of shares overnight.",
        "exampleVi": "Đoạn clip hài hước về chú chó thông minh đã lan truyền chóng mặt và nhận được hàng triệu lượt chia sẻ sau một đêm."
    },
    {
        "id": 13,
        "unit": 4,
        "unitName": "Nhóm 4: Báo Chí Số & Tương Tác Hiện Đại",
        "word": "Fake news",
        "ipa": "/ˌfeɪk ˈnjuːz/",
        "pos": "noun phr.",
        "meaning": "Tin tức giả mạo, tin bịa đặt",
        "collocation": "spread fake news / combat fake news",
        "example": "Social media users should be cautious to avoid spreading fake news without checking.",
        "exampleVi": "Người dùng mạng xã hội nên cẩn trọng để tránh lan truyền tin giả mà chưa kiểm chứng."
    },
    {
        "id": 14,
        "unit": 4,
        "unitName": "Nhóm 4: Báo Chí Số & Tương Tác Hiện Đại",
        "word": "Fact-check",
        "ipa": "/ˈfækt tʃek/",
        "pos": "verb, noun",
        "meaning": "Kiểm chứng thông tin, xác minh sự thật",
        "collocation": "fact-check a story / fact-checking tool",
        "example": "Reputable journalists always fact-check every single piece of information before publishing.",
        "exampleVi": "Các nhà báo uy tín luôn kiểm chứng từng mẩu thông tin trước khi xuất bản."
    },
    {
        "id": 15,
        "unit": 4,
        "unitName": "Nhóm 4: Báo Chí Số & Tương Tác Hiện Đại",
        "word": "Credible",
        "ipa": "/ˈkredəbl/",
        "pos": "adjective",
        "meaning": "Đáng tin cậy, có căn cứ xác thực",
        "collocation": "credible source / highly credible",
        "example": "An informative article must rely on credible sources to maintain the trust of readers.",
        "exampleVi": "Một bài báo cung cấp nhiều thông tin phải dựa trên các nguồn đáng tin cậy để giữ vững niềm tin của độc giả."
    },
    {
        "id": 16,
        "unit": 4,
        "unitName": "Nhóm 4: Báo Chí Số & Tương Tác Hiện Đại",
        "word": "Interactive",
        "ipa": "/ˌɪntərˈæktɪv/",
        "pos": "adjective",
        "meaning": "Có tính tương tác hai chiều",
        "collocation": "interactive media / interactive features",
        "example": "Digital media provides interactive features that allow users to comment and express their opinions.",
        "exampleVi": "Truyền thông số cung cấp các tính năng tương tác cho phép người dùng bình luận và bày tỏ quan điểm."
    },
    {
        "id": 17,
        "unit": 4,
        "unitName": "Nhóm 4: Báo Chí Số & Tương Tác Hiện Đại",
        "word": "Accessible",
        "ipa": "/əkˈsesəbl/",
        "pos": "adjective",
        "meaning": "Dễ tiếp cận, có thể truy cập được",
        "collocation": "freely accessible / easily accessible",
        "example": "Most online news articles are freely accessible with just a few clicks on a smartphone.",
        "exampleVi": "Hầu hết các bài báo trực tuyến đều có thể tiếp cận miễn phí chỉ với vài cú nhấp trên điện thoại thông minh."
    },
    {
        "id": 18,
        "unit": 4,
        "unitName": "Nhóm 4: Báo Chí Số & Tương Tác Hiện Đại",
        "word": "Distribute",
        "ipa": "/dɪˈstrɪbjuːt/",
        "pos": "verb",
        "meaning": "Phân phối, phát tán (thông tin, ấn phẩm)",
        "collocation": "distribute news / distribute via electronic devices",
        "example": "Digital news is distributed to millions of readers across the globe within seconds.",
        "exampleVi": "Tin tức số được phân phối đến hàng triệu độc giả trên khắp toàn cầu trong vòng vài giây."
    },
    {
        "id": 19,
        "unit": 4,
        "unitName": "Nhóm 4: Báo Chí Số & Tương Tác Hiện Đại",
        "word": "Update",
        "ipa": "/ʌpˈdeɪt/",
        "pos": "verb, noun",
        "meaning": "Cập nhật (tin tức); bản tin cập nhật",
        "collocation": "update in real time / regular updates",
        "example": "Online news websites can update breaking stories in real time as events unfold.",
        "exampleVi": "Các trang báo mạng có thể cập nhật các câu chuyện nóng hổi theo thời gian thực khi sự việc diễn ra."
    },
    {
        "id": 20,
        "unit": 4,
        "unitName": "Nhóm 4: Báo Chí Số & Tương Tác Hiện Đại",
        "word": "Viewer",
        "ipa": "/ˈvjuːə(r)/",
        "pos": "noun",
        "meaning": "Khán giả, người xem truyền hình/video",
        "collocation": "television viewers / attract viewers",
        "example": "The breaking news broadcast attracted over three million television viewers nationwide.",
        "exampleVi": "Buổi phát sóng bản tin thời sự đặc biệt đã thu hút hơn ba triệu khán giả truyền hình trên cả nước."
    }
],

  // 2. CHUYÊN ĐỀ NGỮ PHÁP (3 MODULES CHUYÊN SÂU THEO GLOBAL SUCCESS 12)
  grammarModules: [
    {
      id: "gram1",
      title: "1. Mệnh Đề Trạng Ngữ Chỉ Cách Thức (Adverbial Clauses of Manner)",
      focus: "As, Just as, Like & Cấu trúc Giả định As if / As though",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 ĐỊNH NGHĨA & LIÊN TỪ PHỤ THUỘC (AS, JUST AS, LIKE)
          </h4>
          <p style="font-size:0.9rem; line-height:1.6; color:var(--text-muted); margin-bottom:14px;">
            Mệnh đề trạng ngữ chỉ cách thức giải thích <strong>hành động được thực hiện như thế nào</strong> hoặc theo cách nào. Mệnh đề này luôn bắt đầu bằng các liên từ: <code>as</code> (như là), <code>just as</code> (đúng như), <code>like</code> (giống như), hoặc <code>as if / as though</code> (như thể là).
          </p>

          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:14px; margin-bottom:18px;">
            <strong style="color:#1d4ed8;">Công thức cơ bản:</strong><br>
            <code>S + V + as / just as / like + S + V</code><br>
            <em>Ví dụ:</em> The journalists covered the summit <strong>just as</strong> they had prepared. (Các nhà báo đưa tin về hội nghị đúng như họ đã chuẩn bị.)
          </div>

          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-top:20px; margin-bottom:12px;">
            ⚡ AS IF / AS THOUGH VÀ THỨC GIẢ ĐỊNH (SUBJUNCTIVE) - BẪY THI CỰC KỲ QUAN TRỌNG!
          </h4>
          <p style="font-size:0.9rem; line-height:1.6; color:var(--text-muted); margin-bottom:14px;">
            Trong đề thi tốt nghiệp THPT, câu hỏi về <code>as if / as though</code> thường kiểm tra sự khác biệt giữa tình huống <strong>có thật</strong> và tình huống <strong>giả định trái ngược thực tế</strong>:
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin-bottom:18px;">
            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:14px;">
              <strong style="color:#15803d;">1. Tình huống có thật (hoặc rất có thể là thật):</strong><br>
              • Động từ chia theo thì bình thường của ngữ cảnh.<br>
              <em>Ví dụ:</em> Look at the dark clouds. It looks <strong>as if it is going to rain</strong>.<br>
              (Nhìn mây đen kìa. Trông như thể trời sắp mưa vậy ➔ có khả năng mưa thật.)
            </div>

            <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:10px; padding:14px;">
              <strong style="color:#b91c1c;">2. Giả định trái ngược hiện tại (Unreal in Present):</strong><br>
              • Lùi thì về <strong>Quá khứ đơn (V2/ed)</strong>.<br>
              • <strong>ĐẶC BIỆT:</strong> Động từ to-be luôn dùng <code>WERE</code> cho TẤT CẢ các ngôi (I, he, she, it, they, we).<br>
              <code>S + V(hiện tại) + as if / as though + S + were / V2/ed</code><br>
              <em>Ví dụ SGK:</em> He is acting <strong>as if he were my father</strong>.<br>
              <em>Ví dụ SGK:</em> We cannot promote the show <strong>as if it were a big profit-making event</strong>.
            </div>
          </div>

          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:10px; padding:14px;">
            <strong style="color:#b45309;">3. Giả định trái ngược quá khứ (Unreal in Past):</strong><br>
            • Lùi về <strong>Quá khứ hoàn thành (had + V3/ed)</strong>.<br>
            <code>S + V(quá khứ) + as if / as though + S + had + V3/ed</code><br>
            <em>Ví dụ:</em> The injured reporter spoke in front of the camera <strong>as if the accident had not frightened</strong> him at all. (Anh phóng viên bị thương nói trước ống kính như thể vụ tai nạn không hề làm anh ấy sợ hãi.)
          </div>
        </div>
      `
    },
    {
      id: "gram2",
      title: "2. Mệnh Đề Trạng Ngữ Chỉ Kết Quả (Adverbial Clauses of Result)",
      focus: "So...that, Such...that & Các Biến Thể Định Lượng (Many, Few, Much, Little)",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 CẤU TRÚC VỚI "SO ... THAT" (QUÁ ... ĐẾN NỖI MÀ)
          </h4>
          <p style="font-size:0.9rem; line-height:1.6; color:var(--text-muted); margin-bottom:14px;">
            Dùng để nhấn mạnh mức độ của tính từ, trạng từ hoặc số lượng danh từ dẫn đến một kết quả ở mệnh đề sau <code>that</code>.
          </p>

          <div style="overflow-x:auto; margin-bottom:18px;">
            <table style="width:100%; border-collapse:collapse; font-size:0.875rem;">
              <thead>
                <tr style="background:#f8fafc; border-bottom:2px solid #e2e8f0; text-align:left;">
                  <th style="padding:10px;">Thành phần đi cùng</th>
                  <th style="padding:10px;">Công thức</th>
                  <th style="padding:10px;">Ví dụ minh họa</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid #e2e8f0;">
                  <td style="padding:10px; font-weight:600;">Tính từ (Adjective)</td>
                  <td style="padding:10px;"><code>S + be/linking verb + so + adj + that + S + V</code></td>
                  <td style="padding:10px;">The news was <strong>so shocking that</strong> nobody believed it.</td>
                </tr>
                <tr style="border-bottom:1px solid #e2e8f0;">
                  <td style="padding:10px; font-weight:600;">Trạng từ (Adverb)</td>
                  <td style="padding:10px;"><code>S + V(thường) + so + adv + that + S + V</code></td>
                  <td style="padding:10px;">The fake video spread <strong>so rapidly that</strong> it reached millions.</td>
                </tr>
                <tr style="border-bottom:1px solid #e2e8f0;">
                  <td style="padding:10px; font-weight:600;">N đếm được số nhiều</td>
                  <td style="padding:10px;"><code>S + V + so + many / few + Plural N + that + S + V</code></td>
                  <td style="padding:10px;">There were <strong>so many commercials that</strong> I switched channels.</td>
                </tr>
                <tr style="border-bottom:1px solid #e2e8f0;">
                  <td style="padding:10px; font-weight:600;">N không đếm được</td>
                  <td style="padding:10px;"><code>S + V + so + much / little + Uncountable N + that...</code></td>
                  <td style="padding:10px;">There is <strong>so much information that</strong> users feel confused.</td>
                </tr>
                <tr>
                  <td style="padding:10px; font-weight:600; color:#b91c1c;">N đếm được số ít (Bẫy)</td>
                  <td style="padding:10px; color:#b91c1c;"><code>S + V + so + adj + a/an + Singular N + that...</code></td>
                  <td style="padding:10px;">It was <strong>so influential a newspaper that</strong> it swayed voters.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-top:20px; margin-bottom:12px;">
            📌 CẤU TRÚC VỚI "SUCH ... THAT"
          </h4>
          <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:10px; padding:14px; margin-bottom:16px;">
            <strong style="color:#6d28d9;">Công thức:</strong> <code>S + V + such + (a/an) + adj + Noun + that + S + V</code><br>
            <em>Lưu ý vàng:</em> Nếu danh từ là số nhiều hoặc không đếm được, <strong>tuyệt đối không dùng a/an</strong>!<br>
            • <em>Ví dụ SGK:</em> The Internet is <strong>such a powerful tool that</strong> it allows people to share ideas globally.<br>
            • <em>Ví dụ (N không đếm được):</em> It was <strong>such terrible weather that</strong> the live outdoor concert was cancelled.
          </div>
        </div>
      `
    },
    {
      id: "gram3",
      title: "3. Đảo Ngữ Nâng Cao & 4 Dạng Bài Viết Lại Câu Thi Tốt Nghiệp THPT",
      focus: "Mục tiêu 7+ & 8+ THPTQG - Inversion with So/Such, Too...to, Enough",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            ⚡ ĐẢO NGỮ VỚI "SO" VÀ "SUCH" (ĐẶC SẢN ĐỀ THI ĐẠI HỌC)
          </h4>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin-bottom:18px;">
            <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:14px;">
              <strong style="color:#1d4ed8;">1. Đảo ngữ với SO:</strong><br>
              <code>So + adj + be + S + that + Clause</code><br>
              <code>So + adv + trợ động từ + S + V + that + Clause</code><br>
              <em>Ví dụ gốc:</em> The headline was so sensational that everyone clicked it.<br>
              ➔ <strong>So sensational was the headline that</strong> everyone clicked it.
            </div>

            <div style="background:#fdf4ff; border:1px solid #f5d0fe; border-radius:10px; padding:14px;">
              <strong style="color:#a21caf;">2. Đảo ngữ với SUCH:</strong><br>
              <code>Such + be + (a/an) + adj + Noun + that + Clause</code><br>
              <em>Ví dụ gốc:</em> The event had such huge media coverage that everyone knew about it.<br>
              ➔ <strong>Such was the media coverage of the event that</strong> everyone knew about it.
            </div>
          </div>

          <div class="transform-formula-box">
            <h5 style="color:#1e3a8a; font-weight:800; margin-bottom:8px;">
              ★ 4 CÔNG THỨC BIẾN ĐỔI TƯƠNG ĐƯƠNG BẤT HỦ TRONG ĐỀ THI:
            </h5>
            <ul style="font-size:0.9rem; line-height:1.7;">
              <li>
                <strong>Dạng 1 (Chuyển SO ➔ SUCH):</strong><br>
                <code>S + be + so + adj + that...</code> ➔ <code>It + be + such + (a/an) + adj + N + that...</code><br>
                <em>Ví dụ:</em> The podcast was so engaging that I listened twice. <br>
                ➔ It was <strong>such an engaging podcast that</strong> I listened twice.
              </li>
              <li>
                <strong>Dạng 2 (TOO ... TO ➔ SO ... THAT):</strong><br>
                <code>S + be + too + adj + (for sb) + to V</code> ➔ <code>S + be + so + adj + that + S + cannot / could not + V</code><br>
                <em>Ví dụ:</em> Prime-time advertising is too expensive for small shops to afford.<br>
                ➔ Prime-time advertising is <strong>so expensive that small shops cannot afford</strong> it.
              </li>
              <li>
                <strong>Dạng 3 (NOT ... ENOUGH ➔ SO ... THAT):</strong><br>
                <code>S + be not + adj + enough + to V</code> ➔ <code>S + be + so + opposite adj + that + S + cannot + V</code><br>
                <em>Ví dụ:</em> The report was not clear enough for readers to understand.<br>
                ➔ The report was <strong>so confusing that readers could not understand</strong> it.
              </li>
              <li>
                <strong>Dạng 4 (Thực tế ➔ As if + Subjunctive):</strong><br>
                <code>In fact, S + does not + V</code> ➔ <code>S + talks / acts + as if + S + were / had V3</code><br>
                <em>Ví dụ:</em> He isn't a qualified journalist, but he acts like one.<br>
                ➔ He acts <strong>as if he were a qualified journalist</strong>.
              </li>
            </ul>
          </div>
        </div>
      `
    }
  ],
};
