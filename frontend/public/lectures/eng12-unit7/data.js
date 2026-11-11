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

  // 1. TỪ VỰNG CỐT LÕI (12 TỪ VỰNG TRỌNG TÂM CỦA BÀI HỌC)
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

  // 3. COLLOCATION MATCHING PAIRS (8 CẶP NỐI TỪ CHỦ ĐỀ MASS MEDIA)
  collocationPairs: [
    { id: 1, verb: "broadcast", noun: "the charity concert live nationwide on TV", meaning: "(phát sóng trực tiếp buổi hòa nhạc từ thiện trên toàn quốc)" },
    { id: 2, verb: "spread", noun: "fake news and misleading rumors on social media", meaning: "(lan truyền tin tức giả và tin đồn sai lệch trên mạng xã hội)" },
    { id: 3, verb: "verify", noun: "the accuracy of the story before publishing", meaning: "(xác minh tính chính xác của câu chuyện trước khi xuất bản)" },
    { id: 4, verb: "gain", noun: "massive publicity and public attention", meaning: "(nhận được sự quảng bá rầm rộ và thu hút sự chú ý của công chúng)" },
    { id: 5, verb: "launch", noun: "an advertising campaign to promote new products", meaning: "(phát động chiến dịch quảng cáo để quảng bá sản phẩm mới)" },
    { id: 6, verb: "provide", noun: "up-to-date and reliable information to the press", meaning: "(cung cấp thông tin cập nhật và đáng tin cậy cho báo giới)" },
    { id: 7, verb: "access", noun: "news and educational podcasts free of charge", meaning: "(truy cập tin tức và podcast giáo dục hoàn toàn miễn phí)" },
    { id: 8, verb: "criticize", noun: "the tabloid for sensational and biased headlines", meaning: "(chỉ trích báo lá cải vì những tiêu đề giật gân và thiên vị)" }
  ],

  // 3B. ODD-ONE-OUT COLLOCATION (4 CÂU ĐỐ TÌM TỪ KHÔNG ĐI CÙNG ĐƯỢC)
  oddOneOut: [
    {
      id: 1,
      nounPhrase: "________ live nationwide on television",
      options: ["broadcast", "stream", "transmit", "afford"],
      wrongIndex: 3,
      explanation: "Chính xác! 'Broadcast / stream / transmit live' đều mang nghĩa phát sóng/truyền tải trực tiếp trên truyền hình. 'Afford' là động từ chỉ khả năng tài chính (đủ tiền mua/chi trả), không ghép nghĩa với 'live nationwide on television'!"
    },
    {
      id: 2,
      nounPhrase: "________ the accuracy and credibility of sources",
      options: ["verify", "check", "confirm", "confuse"],
      wrongIndex: 3,
      explanation: "Chính xác! 'Verify / check / confirm the accuracy' có nghĩa là xác minh, kiểm tra tính chuẩn xác của nguồn tin. 'Confuse' mang nghĩa gây bối rối, làm hoang mang, không thể đi chung trong văn cảnh này!"
    },
    {
      id: 3,
      nounPhrase: "________ fake news and rumors rapidly on the Internet",
      options: ["spread", "circulate", "disseminate", "criticize"],
      wrongIndex: 3,
      explanation: "Chính xác! 'Spread / circulate / disseminate fake news' đều là các động từ chuẩn chỉ việc lan truyền, phát tán tin giả. 'Criticize' mang nghĩa chỉ trích, phê phán (criticize someone for doing sth), không phải là hành động phát tán tin!"
    },
    {
      id: 4,
      nounPhrase: "________ a strong bias against minorities",
      options: ["show", "reveal", "display", "subscribe"],
      wrongIndex: 3,
      explanation: "Chính xác! Cụm từ chuẩn là 'show / reveal / display a strong bias against sb' (thể hiện định kiến mạnh mẽ chống lại ai). 'Subscribe' đi với giới từ 'to' mang nghĩa đặt mua ấn phẩm dài hạn (subscribe to a magazine)!"
    }
  ],

  // 4. WORD FAMILY ROOTS (4 CÂY TỪ LOẠI TRỌNG ĐIỂM)
  wordFamilyRoots: [
    {
      root: "RELY",
      rootWord: "RELY",
      meaning: "dựa vào, tin cậy",
      rootPos: "Động từ gốc: dựa vào, tin cậy",
      derivatives: [
        { word: "Reliable", pos: "Adjective", meaning: "Đáng tin cậy, có cơ sở xác thực", vi: "Đáng tin cậy, có cơ sở xác thực" },
        { word: "Unreliable", pos: "Adjective (Phủ định)", meaning: "Không đáng tin, bấp bênh", vi: "Không đáng tin, bấp bênh" },
        { word: "Reliability", pos: "Noun", meaning: "Sự đáng tin cậy, độ tin cậy", vi: "Sự đáng tin cậy, độ tin cậy" },
        { word: "Reliably", pos: "Adverb", meaning: "Một cách đáng tin cậy", vi: "Một cách đáng tin cậy" }
      ]
    },
    {
      root: "PUBLIC",
      rootWord: "PUBLIC",
      meaning: "công chúng, công cộng",
      rootPos: "Tính từ / Danh từ gốc: công chúng, công cộng",
      derivatives: [
        { word: "Publicity", pos: "Noun", meaning: "Sự công khai, sự chú ý từ công chúng, hoạt động quảng bá", vi: "Sự công khai, sự chú ý từ công chúng, quảng bá" },
        { word: "Publicize", pos: "Verb", meaning: "Đưa ra công chúng, quảng bá rộng rãi", vi: "Đưa ra công chúng, quảng bá rộng rãi" },
        { word: "Publication", pos: "Noun", meaning: "Sự xuất bản, ấn phẩm sách báo", vi: "Sự xuất bản, ấn phẩm sách báo" },
        { word: "Publicly", pos: "Adverb", meaning: "Một cách công khai trước mọi người", vi: "Một cách công khai trước mọi người" }
      ]
    },
    {
      root: "ACCESS",
      rootWord: "ACCESS",
      meaning: "lối vào, quyền truy cập",
      rootPos: "Danh từ / Động từ gốc: lối vào, quyền truy cập",
      derivatives: [
        { word: "Accessible", pos: "Adjective", meaning: "Dễ tiếp cận, có thể truy cập được", vi: "Dễ tiếp cận, có thể truy cập được" },
        { word: "Inaccessible", pos: "Adjective (Phủ định)", meaning: "Khó hoặc không thể tiếp cận", vi: "Khó hoặc không thể tiếp cận" },
        { word: "Accessibility", pos: "Noun", meaning: "Khả năng tiếp cận, tính tiện dụng", vi: "Khả năng tiếp cận, tính tiện dụng" }
      ]
    },
    {
      root: "CREDIT",
      rootWord: "CREDIT",
      meaning: "sự tin tưởng, uy tín",
      rootPos: "Danh từ gốc: sự tin tưởng, danh tiếng",
      derivatives: [
        { word: "Credible", pos: "Adjective", meaning: "Đáng tin, có chứng cứ xác thực", vi: "Đáng tin, có chứng cứ xác thực" },
        { word: "Incredible", pos: "Adjective", meaning: "Không thể tin được, phi thường", vi: "Không thể tin được, phi thường" },
        { word: "Credibility", pos: "Noun", meaning: "Sự uy tín, độ tin cậy của thông tin", vi: "Sự uy tín, độ tin cậy của thông tin" },
        { word: "Credibly", pos: "Adverb", meaning: "Một cách đáng tin, thuyết phục", vi: "Một cách đáng tin, thuyết phục" }
      ]
    }
  ],

  // 4B. OPEN CLOZE WORD FORMATION (4 CÂU LUYỆN TẬP BIẾN ĐỔI TỪ LOẠI)
  openCloze: [
    {
      id: 1,
      sentence: "Not all news published on social platforms is ________; users must double-check the facts before sharing.",
      rootWord: "RELY",
      correctWord: "reliable",
      expectedAnswer: "reliable",
      hint: "Sau động từ to-be 'is' cần một Tính từ bổ nghĩa cho chủ ngữ 'news'.",
      explanation: "Vị trí này đứng sau to-be 'is', cần một tính từ mang nghĩa tích cực 'đáng tin cậy' ➔ 'reliable'."
    },
    {
      id: 2,
      sentence: "The charity concert received huge ________ thanks to a nationwide social media campaign.",
      rootWord: "PUBLIC",
      correctWord: "publicity",
      expectedAnswer: "publicity",
      hint: "Sau tính từ 'huge' cần một Danh từ chỉ sự quan tâm/quảng bá trước công chúng.",
      explanation: "Sau tính từ 'huge' cần một danh từ không đếm được chỉ sự chú ý từ công chúng ➔ 'publicity'."
    },
    {
      id: 3,
      sentence: "With high-speed internet, educational podcasts have become freely ________ to rural pupils.",
      rootWord: "ACCESS",
      correctWord: "accessible",
      expectedAnswer: "accessible",
      hint: "Cấu trúc: become + (adv) + ADJ. Cần tính từ 'dễ tiếp cận'.",
      explanation: "Sau động từ liên kết 'become' và trạng từ 'freely' cần một tính từ ➔ 'accessible' (dễ dàng tiếp cận)."
    },
    {
      id: 4,
      sentence: "Spreading unverified rumors will severely damage the ________ of any news organization.",
      rootWord: "CREDIT",
      correctWord: "credibility",
      expectedAnswer: "credibility",
      hint: "Sau mạo từ 'the' và trước giới từ 'of' cần một Danh từ chỉ sự uy tín/đáng tin cậy.",
      explanation: "Cụm danh từ: the credibility of sth (uy tín, độ tin cậy của tổ chức tin tức) ➔ 'credibility'."
    }
  ],

  // 5. ACTIVE RECALL (6 CÂU TRUY XUẤT TỪ THEO CHỮ CÁI ĐẦU TIÊN)
  activeRecall: [
    {
      id: 1,
      definition: "To send out programs on television or radio for the public to watch or listen.",
      clue: "b",
      firstLetter: "b",
      targetWord: "broadcast",
      expectedWord: "broadcast",
      ipa: "/ˈbrɔːdkɑːst/",
      vi: "Phát sóng chương trình truyền hình / phát thanh",
      sentence: "The news anchor announced that the interview would be b________ live at 8 PM.",
      exampleSentence: "The news anchor announced that the interview would be b________ live at 8 PM."
    },
    {
      id: 2,
      definition: "Consistently good in quality or performance; able to be trusted or relied on.",
      clue: "r",
      firstLetter: "r",
      targetWord: "reliable",
      expectedWord: "reliable",
      ipa: "/rɪˈlaɪəbl/",
      vi: "Đáng tin cậy, có cơ sở xác thực",
      sentence: "You should only cite information gathered from r________ news organizations.",
      exampleSentence: "You should only cite information gathered from r________ news organizations."
    },
    {
      id: 3,
      definition: "To encourage people to buy, use, or support something through advertising.",
      clue: "p",
      firstLetter: "p",
      targetWord: "promote",
      expectedWord: "promote",
      ipa: "/prəˈməʊt/",
      vi: "Quảng bá, xúc tiến thương mại",
      sentence: "Influencers use video reels to p________ cosmetic and fashion brands.",
      exampleSentence: "Influencers use video reels to p________ cosmetic and fashion brands."
    },
    {
      id: 4,
      definition: "An advertisement on television or radio.",
      clue: "c",
      firstLetter: "c",
      targetWord: "commercial",
      expectedWord: "commercial",
      ipa: "/kəˈmɜːʃl/",
      vi: "Đoạn phim / mẩu quảng cáo trên truyền hình",
      sentence: "Many viewers switch channels when the long c________ break begins.",
      exampleSentence: "Many viewers switch channels when the long c________ break begins."
    },
    {
      id: 5,
      definition: "A strong feeling in favor of or against one group of people or one side in an argument.",
      clue: "b",
      firstLetter: "b",
      targetWord: "bias",
      expectedWord: "bias",
      ipa: "/ˈbaɪəs/",
      vi: "Sự thiên vị, định kiến trong báo chí",
      sentence: "The editor was accused of showing political b________ in his articles.",
      exampleSentence: "The editor was accused of showing political b________ in his articles."
    },
    {
      id: 6,
      definition: "Becoming extremely popular and spreading rapidly among Internet users.",
      clue: "v",
      firstLetter: "v",
      targetWord: "viral",
      expectedWord: "viral",
      ipa: "/ˈvaɪrəl/",
      vi: "Lan truyền nhanh chóng trên không gian mạng (go viral)",
      sentence: "The documentary went v________ on TikTok and gained over 10 million views.",
      exampleSentence: "The documentary went v________ on TikTok and gained over 10 million views."
    }
  ],

  // 6. WRITING CHALLENGES (4 THỬ THÁCH ĐẶT CÂU & CHẤM ĐIỂM TỰ ĐỘNG)
  writingChallenges: [
    {
      id: 1,
      keyword: "so...that",
      instruction: "Dùng cấu trúc 'SO ... THAT' để nối 2 câu sau thành một câu hoàn chỉnh:",
      prompt: "The news was very shocking. Nobody could believe it at first.",
      targetMeaning: "Tin tức quá gây sốc đến nỗi lúc đầu không ai có thể tin được.",
      modelAnswer: "The news was so shocking that nobody could believe it at first.",
      sampleAnswer: "The news was so shocking that nobody could believe it at first.",
      requiredWords: ["so", "shocking", "that", "nobody"],
      forbiddenWords: ["very", "too", "such"]
    },
    {
      id: 2,
      keyword: "such...that",
      instruction: "Dùng cấu trúc 'SUCH ... THAT' để nối 2 câu sau:",
      prompt: "The Internet is a very powerful tool. It allows people to share ideas globally.",
      targetMeaning: "Internet là một công cụ mạnh mẽ đến nỗi nó cho phép mọi người chia sẻ ý tưởng trên toàn cầu.",
      modelAnswer: "The Internet is such a powerful tool that it allows people to share ideas globally.",
      sampleAnswer: "The Internet is such a powerful tool that it allows people to share ideas globally.",
      requiredWords: ["such", "powerful", "tool", "that"],
      forbiddenWords: ["very", "so"]
    },
    {
      id: 3,
      keyword: "as if (subjunctive were)",
      instruction: "Dùng cấu trúc 'AS IF' (thức giả định) để viết lại câu sau:",
      prompt: "He is not an expert, but he speaks like an expert.",
      targetMeaning: "Anh ấy nói chuyện như thể anh ấy là một chuyên gia (dùng thức giả định 'were').",
      modelAnswer: "He speaks as if he were an expert.",
      sampleAnswer: "He speaks as if he were an expert.",
      requiredWords: ["speaks", "as if", "were", "expert"],
      forbiddenWords: ["is", "was"]
    },
    {
      id: 4,
      keyword: "inversion with so",
      instruction: "Dùng cấu trúc đảo ngữ với 'SO' để viết lại câu nhấn mạnh:",
      prompt: "The advertisement was so engaging that millions of viewers watched it.",
      targetMeaning: "Quảng cáo cuốn hút đến nỗi hàng triệu khán giả đã xem nó (Bắt đầu bằng: So engaging...).",
      modelAnswer: "So engaging was the advertisement that millions of viewers watched it.",
      sampleAnswer: "So engaging was the advertisement that millions of viewers watched it.",
      requiredWords: ["so", "engaging", "was", "the advertisement", "that"],
      forbiddenWords: ["very", "such"]
    }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = LECTURE_DATA;
}
