/**
 * DỮ LIỆU BÀI GIẢNG TƯƠNG TÁC: UNIT 7 - THE WORLD OF MASS MEDIA (PHẦN 2)
 * Tiếng Anh 12 Global Success (SGK Trang 90-98 & SBT Trang 81-91)
 * Soạn riêng cho: Bạn Nam Việt (Lớp 12 - Mục tiêu 7+ THPTQG)
 * Hướng dẫn & Bản quyền: Thầy Thức
 */

const LECTURE_DATA = {
  title: "Cẩm Nang Tri Thức & Đấu Trường 20 Từ Vựng Unit 7: The World of Mass Media",
  subject: "Tiếng Anh 12 (Global Success - Unit 7)",
  teacher: "Thầy Thức",

  // 1. TỪ VỰNG CỐT LÕI (20 TỪ VỰNG MỚI THEO SGK TRANG 90-98 & SBT TRANG 81-91)
  vocabList: [
    {
      "id": 1,
      "unit": 1,
      "unitName": "Nhóm 1: Ấn Phẩm & Quảng Cáo",
      "word": "Leaflet",
      "ipa": "/ˈliːflət/",
      "pos": "noun",
      "meaning": "Tờ rơi quảng cáo, tờ bướm thông tin",
      "collocation": "distribute leaflets / hand out leaflets",
      "example": "Volunteers helped distribute informative leaflets to people in the local area.",
      "exampleVi": "Các tình nguyện viên đã giúp phân phát những tờ rơi thông tin cho người dân trong khu vực."
    },
    {
      "id": 2,
      "unit": 1,
      "unitName": "Nhóm 1: Ấn Phẩm & Quảng Cáo",
      "word": "Billboard",
      "ipa": "/ˈbɪlbɔːd/",
      "pos": "noun",
      "meaning": "Biển quảng cáo ngoài trời khổ lớn",
      "collocation": "digital billboard / advertise on billboards",
      "example": "A huge digital billboard was placed right at the busy traffic crossing.",
      "exampleVi": "Một biển quảng cáo kỹ thuật số khổng lồ đã được đặt ngay tại nút giao thông đông đúc."
    },
    {
      "id": 3,
      "unit": 1,
      "unitName": "Nhóm 1: Ấn Phẩm & Quảng Cáo",
      "word": "Advert",
      "ipa": "/ˈædvɜːt/",
      "pos": "noun",
      "meaning": "Mẩu quảng cáo, mẩu tin quảng cáo",
      "collocation": "place an advert / online advert",
      "example": "The school charity club decided to place an advert in the local newspaper.",
      "exampleVi": "Câu lạc bộ từ thiện của trường đã quyết định đăng một mẩu quảng cáo trên tờ báo địa phương."
    },
    {
      "id": 4,
      "unit": 1,
      "unitName": "Nhóm 1: Ấn Phẩm & Quảng Cáo",
      "word": "Printing press",
      "ipa": "/ˈprɪntɪŋ pres/",
      "pos": "noun phr.",
      "meaning": "Máy in, nhà in ấn cơ học",
      "collocation": "invention of the printing press / modern printing press",
      "example": "Gutenberg's printing press made books cheaper and more accessible to ordinary people.",
      "exampleVi": "Máy in của Gutenberg đã làm cho sách trở nên rẻ hơn và dễ tiếp cận hơn với người dân bình thường."
    },
    {
      "id": 5,
      "unit": 1,
      "unitName": "Nhóm 1: Ấn Phẩm & Quảng Cáo",
      "word": "Target customer",
      "ipa": "/ˌtɑːɡɪt ˈkʌstəmə/",
      "pos": "noun phr.",
      "meaning": "Khách hàng mục tiêu",
      "collocation": "reach target customers / identify target customers",
      "example": "Businesses use online media to reach their target customers more easily.",
      "exampleVi": "Các doanh nghiệp sử dụng phương tiện truyền thông trực tuyến để tiếp cận khách hàng mục tiêu dễ dàng hơn."
    },
    {
      "id": 6,
      "unit": 2,
      "unitName": "Nhóm 2: Mạng Xã Hội & Tương Tác",
      "word": "Presence",
      "ipa": "/ˈprezns/",
      "pos": "noun",
      "meaning": "Sự hiện diện, tầm ảnh hưởng (trên mạng xã hội)",
      "collocation": "social media presence / build an online presence",
      "example": "You should post updates regularly to build a strong social media presence.",
      "exampleVi": "Bạn nên đăng bài cập nhật thường xuyên để xây dựng sự hiện diện vững chắc trên mạng xã hội."
    },
    {
      "id": 7,
      "unit": 2,
      "unitName": "Nhóm 2: Mạng Xã Hội & Tương Tác",
      "word": "Interactive",
      "ipa": "/ˌɪntərˈæktɪv/",
      "pos": "adj.",
      "meaning": "Có tính tương tác hai chiều",
      "collocation": "interactive features / interactive shopping",
      "example": "Digital media forms are more interactive because users can leave instant comments.",
      "exampleVi": "Các hình thức truyền thông số có tính tương tác cao hơn vì người dùng có thể để lại bình luận ngay lập tức."
    },
    {
      "id": 8,
      "unit": 2,
      "unitName": "Nhóm 2: Mạng Xã Hội & Tương Tác",
      "word": "Accessible",
      "ipa": "/əkˈsesəbl/",
      "pos": "adj.",
      "meaning": "Dễ tiếp cận, có thể truy cập được",
      "collocation": "freely accessible / accessible to everyone",
      "example": "News on the Internet is readily accessible to anyone with a smartphone.",
      "exampleVi": "Tin tức trên Internet rất dễ tiếp cận với bất kỳ ai có điện thoại thông minh."
    },
    {
      "id": 9,
      "unit": 2,
      "unitName": "Nhóm 2: Mạng Xã Hội & Tương Tác",
      "word": "Distribute",
      "ipa": "/dɪˈstrɪbjuːt/",
      "pos": "verb",
      "meaning": "Phân phát, phân phối thông tin",
      "collocation": "distribute news / distribute information online",
      "example": "Electronic devices help distribute breaking news to millions of users within seconds.",
      "exampleVi": "Các thiết bị điện tử giúp phân phối tin nóng tới hàng triệu người dùng chỉ trong vài giây."
    },
    {
      "id": 10,
      "unit": 2,
      "unitName": "Nhóm 2: Mạng Xã Hội & Tương Tác",
      "word": "Instant",
      "ipa": "/ˈɪnstənt/",
      "pos": "adj.",
      "meaning": "Tức thì, ngay lập tức",
      "collocation": "instant access / instant feedback",
      "example": "Social platforms provide instant access to news and information worldwide.",
      "exampleVi": "Các nền tảng mạng xã hội cung cấp khả năng tiếp cận tức thì với tin tức và thông tin trên toàn cầu."
    },
    {
      "id": 11,
      "unit": 3,
      "unitName": "Nhóm 3: Tính Xác Thực & Khán Giả",
      "word": "Fake news",
      "ipa": "/ˌfeɪk ˈnjuːz/",
      "pos": "noun phr.",
      "meaning": "Tin giả, tin tức bịa đặt sai sự thật",
      "collocation": "spread fake news / combat fake news",
      "example": "People who deliberately spread fake news on the Internet can be fined heavily.",
      "exampleVi": "Những người cố tình phát tán tin giả trên Internet có thể bị phạt tiền rất nặng."
    },
    {
      "id": 12,
      "unit": 3,
      "unitName": "Nhóm 3: Tính Xác Thực & Khán Giả",
      "word": "Fact-check",
      "ipa": "/ˈfækt tʃek/",
      "pos": "verb, noun",
      "meaning": "Kiểm chứng thông tin, xác minh sự thật",
      "collocation": "fact-check a story / fact-checking practices",
      "example": "Reputable newspapers always fact-check information before publishing an article.",
      "exampleVi": "Các tờ báo uy tín luôn kiểm chứng thông tin trước khi xuất bản một bài báo."
    },
    {
      "id": 13,
      "unit": 3,
      "unitName": "Nhóm 3: Tính Xác Thực & Khán Giả",
      "word": "Credible",
      "ipa": "/ˈkredəbl/",
      "pos": "adj.",
      "meaning": "Đáng tin cậy, có cơ sở xác thực",
      "collocation": "credible news source / highly credible",
      "example": "Printed newspapers are often considered a more credible source than unverified blogs.",
      "exampleVi": "Báo in thường được coi là một nguồn tin đáng tin cậy hơn so với các trang blog chưa được kiểm chứng."
    },
    {
      "id": 14,
      "unit": 3,
      "unitName": "Nhóm 3: Tính Xác Thực & Khán Giả",
      "word": "Viewer",
      "ipa": "/ˈvjuːə(r)//",
      "pos": "noun",
      "meaning": "Khán giả truyền hình, người xem video",
      "collocation": "television viewers / attract millions of viewers",
      "example": "Millions of TV viewers watched the live broadcast of the international football match.",
      "exampleVi": "Hàng triệu khán giả truyền hình đã theo dõi buổi phát sóng trực tiếp trận bóng đá quốc tế."
    },
    {
      "id": 15,
      "unit": 3,
      "unitName": "Nhóm 3: Tính Xác Thực & Khán Giả",
      "word": "Audiovisual",
      "ipa": "/ˌɔːdiəʊˈvɪʒuəl/",
      "pos": "adj.",
      "meaning": "Thuộc nghe nhìn (kết hợp cả âm thanh và hình ảnh)",
      "collocation": "audiovisual content / audiovisual presentation",
      "example": "Television quickly gained popularity thanks to its engaging audiovisual presentation.",
      "exampleVi": "Truyền hình đã nhanh chóng trở nên phổ biến nhờ cách trình bày nghe nhìn đầy lôi cuốn."
    },
    {
      "id": 16,
      "unit": 4,
      "unitName": "Nhóm 4: Cụm Từ & Xu Hướng Truyền Thông",
      "word": "Here to stay",
      "ipa": "/hɪə tə steɪ/",
      "pos": "idiom / adj. phr.",
      "meaning": "Tồn tại lâu dài, đã trở thành một phần quen thuộc của cuộc sống",
      "collocation": "traditional media is here to stay",
      "example": "Even though digital media is expanding, traditional newspapers are still here to stay.",
      "exampleVi": "Dù truyền thông kỹ thuật số đang mở rộng, báo in truyền thống vẫn tiếp tục tồn tại lâu dài."
    },
    {
      "id": 17,
      "unit": 4,
      "unitName": "Nhóm 4: Cụm Từ & Xu Hướng Truyền Thông",
      "word": "Literacy",
      "ipa": "/ˈlɪtərəsi/",
      "pos": "noun",
      "meaning": "Sự biết chữ, khả năng đọc viết, trình độ học vấn",
      "collocation": "promote literacy / media literacy",
      "example": "The invention of printing presses promoted literacy among ordinary citizens in Europe.",
      "exampleVi": "Phát minh máy in đã thúc đẩy khả năng đọc viết của người dân bình thường tại châu Âu."
    },
    {
      "id": 18,
      "unit": 4,
      "unitName": "Nhóm 4: Cụm Từ & Xu Hướng Truyền Thông",
      "word": "Account for",
      "ipa": "/əˈkaʊnt fɔː/",
      "pos": "phr. verb",
      "meaning": "Chiếm (bao nhiêu phần trăm, tỷ lệ)",
      "collocation": "account for 70 per cent / account for the majority",
      "example": "Young adults account for the largest proportion of daily social media users.",
      "exampleVi": "Giới trẻ chiếm tỷ lệ lớn nhất trong số những người sử dụng mạng xã hội hàng ngày."
    },
    {
      "id": 19,
      "unit": 4,
      "unitName": "Nhóm 4: Cụm Từ & Xu Hướng Truyền Thông",
      "word": "As opposed to",
      "ipa": "/əz əˈpəʊzd tuː/",
      "pos": "prep. phr.",
      "meaning": "Trái ngược với, thay vì",
      "collocation": "printed news as opposed to online news",
      "example": "Many elderly people still prefer printed newspapers as opposed to reading on screens.",
      "exampleVi": "Nhiều người lớn tuổi vẫn thích đọc báo in hơn thay vì đọc trên màn hình điện tử."
    },
    {
      "id": 20,
      "unit": 4,
      "unitName": "Nhóm 4: Cụm Từ & Xu Hướng Truyền Thông",
      "word": "Reluctant",
      "ipa": "/rɪˈlʌktənt/",
      "pos": "adj.",
      "meaning": "Ngần ngại, do dự, không sẵn lòng",
      "collocation": "reluctant to change / reluctant to accept",
      "example": "Some older readers are reluctant to switch from morning paper reading to mobile apps.",
      "exampleVi": "Một số độc giả lớn tuổi ngần ngại chuyển từ thói quen đọc báo sáng sang dùng ứng dụng di động."
    }
  ],

  // 2. CHUYÊN ĐỀ NGỮ PHÁP (NGẮN GỌN THEO ĐÚNG SGK & SBT - CÓ BÀI TẬP NHANH QUICK DRILLS)
  grammarModules: [
    {
      id: "gram1",
      title: "1. Mệnh Đề Trạng Ngữ Chỉ Cách Thức (Adverbial Clauses of Manner)",
      focus: "As, Just as, Like & Cấu trúc giả định As if / As though",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 1. ĐỊNH NGHĨA & LIÊN TỪ NỐI: AS, JUST AS, LIKE
          </h4>
          <p style="font-size:0.9rem; line-height:1.6; color:var(--text-muted); margin-bottom:14px;">
            Mệnh đề trạng ngữ chỉ cách thức giải thích <strong>hành động được thực hiện như thế nào (HOW)</strong>. Mệnh đề này bắt đầu bằng:
          </p>

          <ul style="font-size:0.9rem; line-height:1.7; color:var(--text-main); margin-left:20px; margin-bottom:14px;">
            <li><strong>as</strong> (như là / theo như): Dùng trong văn phong trang trọng, chuẩn mực.<br>
              <em>Ví dụ (SBT tr.84):</em> Millions attended the event <strong>as we had expected</strong>. (Hàng triệu người đã tham dự sự kiện đúng như chúng tôi dự đoán.)</li>
            <li><strong>just as</strong> (đúng như / hệt như): Nhấn mạnh sự tương đồng hoàn toàn.<br>
              <em>Ví dụ:</em> She designed the poster <strong>just as</strong> the teacher asked. (Cô ấy thiết kế tấm áp phích đúng hệt như thầy giáo yêu cầu.)</li>
            <li><strong>like</strong> (giống như): Thường dùng trong văn nói thân mật.<br>
              <em>Ví dụ (SGK tr.89):</em> Mai doesn't have a big social media presence <strong>like Mark does</strong>.</li>
          </ul>

          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-top:20px; margin-bottom:12px;">
            ⚡ 2. CẤU TRÚC GIẢ ĐỊNH VỚI "AS IF / AS THOUGH" (NHƯ THỂ LÀ)
          </h4>
          <p style="font-size:0.9rem; line-height:1.6; color:var(--text-muted); margin-bottom:14px;">
            Trong đề thi tốt nghiệp THPT, cần phân biệt rõ 3 tình huống sau:
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin-bottom:18px;">
            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:14px;">
              <strong style="color:#15803d;">A. Tình huống có thật (hoặc rất có thể xảy ra):</strong><br>
              • Động từ chia theo thì bình thường của ngữ cảnh.<br>
              <em>Ví dụ:</em> Look at the dark clouds. It looks <strong>as if it is going to rain</strong>.<br>
              (Nhìn mây đen kìa. Trông như thể trời sắp mưa thật.)
            </div>

            <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:10px; padding:14px;">
              <strong style="color:#b91c1c;">B. Giả định TRÁI HIỆN TẠI (Unreal Present):</strong><br>
              • Lùi về <strong>Quá khứ đơn (V2/ed)</strong>.<br>
              • <strong>QUY TẮC VÀNG:</strong> Động từ to be luôn dùng <code>WERE</code> cho TẤT CẢ các ngôi!<br>
              <code>S + V(hiện tại) + as if / as though + S + were / V2/ed</code><br>
              <em>Ví dụ SGK tr.91:</em> He acts <strong>as if he were my father</strong>. (Thực tế anh ta không phải cha tôi).<br>
              <em>Ví dụ SBT tr.84:</em> She acts <strong>as if she were happy</strong>, but in fact she is sad.
            </div>

            <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:10px; padding:14px;">
              <strong style="color:#b45309;">C. Giả định TRÁI QUÁ KHỨ (Unreal Past):</strong><br>
              • Lùi về <strong>Quá khứ hoàn thành (had + V3/ed)</strong>.<br>
              <code>S + V + as if / as though + S + had + V3/ed</code><br>
              <em>Ví dụ SBT tr.84:</em> The actor continued with the scene <strong>as if nothing had happened</strong>. (Diễn viên diễn tiếp như thể chẳng có chuyện gì xảy ra trong quá khứ.)
            </div>
          </div>
        </div>
      `,
      quickDrills: [
        {
          q: "1. She spends money generously as if she ______ a millionaire, but in fact she is not.",
          options: ["A. is", "B. were", "C. has been", "D. will be"],
          ans: 1,
          exp: "Sự thật hiện tại cô ấy không phải triệu phú ('in fact she is not') ➔ Giả định trái hiện tại sau 'as if' chia to be là 'were' cho mọi ngôi."
        },
        {
          q: "2. The injured reporter spoke in front of the camera as if the pain ______ him at all.",
          options: ["A. doesn't affect", "B. hadn't affected", "C. hasn't affected", "D. will not affect"],
          ans: 1,
          exp: "Hành động đau xảy ra trong quá khứ, giả định trái quá khứ lùi về Quá khứ hoàn thành: 'hadn't affected' (SGK trang 91 câu 3)."
        },
        {
          q: "3. Look at those dark clouds! It looks as if it ______ soon.",
          options: ["A. rained", "B. had rained", "C. is going to rain", "D. were raining"],
          ans: 2,
          exp: "Dấu hiệu mắt thấy mây đen rõ ràng ➔ tình huống có thật ở hiện tại/tương lai gần, chia bình thường: 'is going to rain'."
        }
      ]
    },
    {
      id: "gram2",
      title: "2. Mệnh Đề Trạng Ngữ Chỉ Kết Quả (Adverbial Clauses of Result)",
      focus: "Cấu trúc So...that & Such...that với Danh từ và Tính từ",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 CẤU TRÚC VỚI \"SO ... THAT\" (QUÁ ... ĐẾN NỖI MÀ)
          </h4>
          <p style="font-size:0.9rem; line-height:1.6; color:var(--text-muted); margin-bottom:14px;">
            Dùng để chỉ kết quả của một hành động hay mức độ của một tính chất:
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-bottom:18px;">
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px;">
              <strong>1. Với Tính từ &amp; Trạng từ:</strong><br>
              <code>S + be + so + adj + that + S + V</code><br>
              <code>S + V + so + adv + that + S + V</code><br>
              <em>Ví dụ:</em> The news was <strong>so interesting that</strong> everyone shared it.
            </div>

            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px;">
              <strong>2. Với Danh từ số nhiều:</strong><br>
              <code>S + V + so many / few + N(số nhiều) + that...</code><br>
              <em>Ví dụ SGK:</em> There are <strong>so many posters that</strong> viewers may not notice ours.
            </div>

            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px;">
              <strong>3. Với Danh từ không đếm được:</strong><br>
              <code>S + V + so much / little + N(không đếm được) + that...</code><br>
              <em>Ví dụ SGK:</em> There is <strong>so much information that</strong> people get confused.
            </div>
          </div>

          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-top:20px; margin-bottom:12px;">
            📌 CẤU TRÚC VỚI \"SUCH ... THAT\" (QUÁ ... ĐẾN NỖI MÀ)
          </h4>
          <p style="font-size:0.9rem; line-height:1.6; color:var(--text-muted); margin-bottom:14px;">
            Khác với <code>SO</code>, sau <code>SUCH</code> <strong>bắt buộc phải có Danh từ (Noun)</strong>:
          </p>

          <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:10px; padding:14px; margin-bottom:18px;">
            <strong style="color:#1d4ed8;">Công thức chuẩn:</strong><br>
            • Danh từ đếm được số ít: <code>S + V + such + a/an + adj + N(số ít) + that + S + V</code><br>
            <em>Ví dụ SGK tr.91:</em> The Internet is <strong>such a powerful tool that</strong> it allows people to connect globally.<br>
            • Danh từ số nhiều / Không đếm được: <code>S + V + such + adj + N(số nhiều/kđđ) + that + S + V</code> (TUYỆT ĐỐI KHÔNG DÙNG a/an)<br>
            <em>Ví dụ SBT tr.84:</em> There is <strong>such a wide range</strong> of media nowadays that choosing is difficult.
          </div>
        </div>
      `,
      quickDrills: [
        {
          q: "1. Email advertising has become ______ powerful tool that all businesses are using it.",
          options: ["A. so a", "B. a so", "C. such a", "D. such"],
          ans: 2,
          exp: "Tool là danh từ số ít đếm được đi kèm tính từ 'powerful' ➔ Bắt buộc dùng 'such a powerful tool that' (SBT trang 84 câu 4)."
        },
        {
          q: "2. The weather was ______ hot that we couldn't sleep last night.",
          options: ["A. so", "B. such", "C. very", "D. too"],
          ans: 0,
          exp: "Hot là tính từ đứng một mình trước 'that' ➔ Cấu trúc 'so + adj + that'."
        },
        {
          q: "3. There were ______ commercials during the film that I decided to turn off the TV.",
          options: ["A. so much", "B. so many", "C. such", "D. too much"],
          ans: 1,
          exp: "Commercials là danh từ số nhiều đếm được ➔ dùng 'so many + N(số nhiều) + that'."
        }
      ]
    },
    {
      id: "gram3",
      title: "3. Dạng Bài Viết Lại Câu Trọng Tâm Thi THPTQG",
      focus: "Biến đổi qua lại So...that ↔ Such...that và Câu thực tế sang As if",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 1. CHUYỂN ĐỔI GIỮA \"SO ... THAT\" VÀ \"SUCH ... THAT\"
          </h4>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-bottom:14px;">
            <code>S + be + so + adj + that... ⟷ It + be + such + a/an + adj + N + that...</code><br>
            <em>Ví dụ SBT tr.90:</em><br>
            • Gốc: Smartphones are <strong>so common</strong> that everyone seems to have one.<br>
            • Viết lại: They are <strong>such common devices</strong> that everyone seems to have one.
          </div>

          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-top:20px; margin-bottom:12px;">
            📌 2. CHUYỂN ĐỔI TỪ SỰ THẬT (IN FACT) SANG GIẢ ĐỊNH \"AS IF + WERE\"
          </h4>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-bottom:14px;">
            <em>Ví dụ SBT tr.89 câu 4:</em><br>
            • Gốc: We are not close friends. However, he is asking me a lot of personal questions.<br>
            • Viết lại: He is asking me a lot of personal questions <strong>as if we were close friends</strong>.
          </div>
        </div>
      `,
      quickDrills: [
        {
          q: "1. The podcast was so engaging that I listened to it twice. ➔ It was ______.",
          options: [
            "A. such an engaging podcast that I listened to it twice",
            "B. so an engaging podcast that I listened to it twice",
            "C. such engaging podcast that I listened to it twice",
            "D. very engaging podcast that I listened to it twice"
          ],
          ans: 0,
          exp: "Chuyển từ 'so engaging' sang 'such an engaging podcast that' (podcast là danh từ số ít nên cần mạo từ 'an')."
        },
        {
          q: "2. We can't spend that much money pretending that we're rich. (SBT tr.90) ➔ We can't spend that much money ______.",
          options: [
            "A. as we are rich",
            "B. like we will be rich",
            "C. as if we were rich",
            "D. as though we had been rich"
          ],
          ans: 2,
          exp: "Thực tế không giàu (pretending that we're rich) ➔ Dùng 'as if we were rich' (giả định trái hiện tại)."
        }
      ]
    }
  ],

  // 3. COLLOCATION MATCHING PAIRS (8 CẶP NỐI TỪ CHỦ ĐỀ MASS MEDIA)
  collocationPairs: [
    { left: "Distribute", right: "leaflets to passers-by", full: "Distribute leaflets (phát tờ rơi cho người qua đường)" },
    { left: "Giant", right: "digital billboard", full: "Giant billboard (biển quảng cáo khổng lồ)" },
    { left: "Place an", right: "advert in the paper", full: "Place an advert (đăng mẩu quảng cáo trên báo)" },
    { left: "Social media", right: "presence", full: "Social media presence (sự hiện diện trên mạng xã hội)" },
    { left: "Credible", right: "news source", full: "Credible news source (nguồn tin đáng tin cậy)" },
    { left: "Combat", right: "fake news online", full: "Combat fake news (đấu tranh chống tin giả)" },
    { left: "Television", right: "viewers", full: "Television viewers (khán giả xem truyền hình)" },
    { left: "Target", right: "customers", full: "Target customers (khách hàng mục tiêu)" }
  ],

  // 4. WORD FAMILY ROOTS (4 CÂY TỪ LOẠI TRỌNG ĐIỂM)
  wordFamilyRoots: [
    {
      root: "ACCESS",
      meaning: "Tiếp cận, truy cập",
      family: [
        { word: "access", pos: "verb, noun", meaning: "truy cập; sự tiếp cận" },
        { word: "accessible", pos: "adjective", meaning: "dễ tiếp cận, có thể truy cập" },
        { word: "accessibility", pos: "noun", meaning: "tính khả dụng, khả năng tiếp cận" },
        { word: "inaccessible", pos: "adjective", meaning: "không thể tiếp cận được" }
      ],
      quiz: {
        q: "The news on this digital website is freely ______ to all students.",
        options: ["access", "accessible", "accessibility", "accessibly"],
        ans: 1,
        exp: "Sau to-be 'is' và trạng từ 'freely' cần một tính từ ➔ accessible."
      }
    },
    {
      root: "RELY",
      meaning: "Tin cậy, dựa vào",
      family: [
        { word: "rely (on)", pos: "verb", meaning: "dựa vào, tin cậy vào" },
        { word: "reliable", pos: "adjective", meaning: "đáng tin cậy" },
        { word: "reliability", pos: "noun", meaning: "độ tin cậy" },
        { word: "unreliable", pos: "adjective", meaning: "không đáng tin cậy" }
      ],
      quiz: {
        q: "There is growing concern about the ______ of unverified information online.",
        options: ["rely", "reliable", "reliability", "reliably"],
        ans: 2,
        exp: "Sau mạo từ 'the' và trước giới từ 'of' cần một danh từ ➔ reliability."
      }
    },
    {
      root: "INTERACT",
      meaning: "Tương tác",
      family: [
        { word: "interact (with)", pos: "verb", meaning: "tương tác với" },
        { word: "interactive", pos: "adjective", meaning: "có tính tương tác" },
        { word: "interaction", pos: "noun", meaning: "sự tương tác" },
        { word: "interactively", pos: "adverb", meaning: "một cách tương tác" }
      ],
      quiz: {
        q: "Digital advertisements are much more ______ than traditional printed banners.",
        options: ["interact", "interactive", "interaction", "interactively"],
        ans: 1,
        exp: "Sau to-be 'are' và trạng từ 'much more' cần tính từ ở dạng so sánh hơn ➔ interactive."
      }
    },
    {
      root: "CREDIT",
      meaning: "Lòng tin, tín nhiệm",
      family: [
        { word: "credible", pos: "adjective", meaning: "đáng tin cậy" },
        { word: "credibility", pos: "noun", meaning: "sự tín nhiệm, độ uy tín" },
        { word: "credibly", pos: "adverb", meaning: "một cách đáng tin" },
        { word: "incredible", pos: "adjective", meaning: "khó tin, phi thường" }
      ],
      quiz: {
        q: "Spreading false rumors will severely damage a newspaper's ______.",
        options: ["credible", "credibility", "credibly", "incredible"],
        ans: 1,
        exp: "Sau sở hữu cách 'newspaper's' cần một danh từ ➔ credibility."
      }
    }
  ],

  // 5. ACTIVE RECALL (6 CÂU TRUY XUẤT TỪ THEO CHỮ CÁI ĐẦU TIÊN)
  activeRecallList: [
    {
      id: "rec1",
      hintVi: "Tờ rơi quảng cáo nhỏ được phát tận tay người đi đường (bắt đầu bằng L)",
      letter: "L",
      word: "Leaflet",
      context: "Volunteers helped hand out a promotional ______ to people on the street."
    },
    {
      id: "rec2",
      hintVi: "Biển quảng cáo cỡ lớn ngoài trời bên đường cao tốc hoặc ngã tư (bắt đầu bằng B)",
      letter: "B",
      word: "Billboard",
      context: "The bright lights from that giant ______ kept local residents awake."
    },
    {
      id: "rec3",
      hintVi: "Đáng tin cậy, có căn cứ xác thực có thể tin tưởng (bắt đầu bằng C)",
      letter: "C",
      word: "Credible",
      context: "You should always get health advice from a ______ medical source."
    },
    {
      id: "rec4",
      hintVi: "Khán giả theo dõi một chương trình truyền hình hoặc video (bắt đầu bằng V)",
      letter: "V",
      word: "Viewer",
      context: "The live broadcast attracted more than two million ______ across the country."
    },
    {
      id: "rec5",
      hintVi: "Phân phát, phân phối thông tin hoặc ấn phẩm cho nhiều người (bắt đầu bằng D)",
      letter: "D",
      word: "Distribute",
      context: "Modern computers make it easy to ______ news to people globally."
    },
    {
      id: "rec6",
      hintVi: "Kiểm tra và xác minh sự thật của thông tin trước khi tin (bắt đầu bằng F)",
      letter: "F",
      word: "Fact-check",
      context: "Always ______ any shocking news stories you read on social media."
    }
  ],

  // 6. WRITING CHALLENGES (4 THỬ THÁCH ĐẶT CÂU & CHẤM ĐIỂM TỰ ĐỘNG)
  writingChallenges: [
    {
      id: "wr1",
      promptVi: "Viết câu dùng cấu trúc SO...THAT: 'Tin tức đó quá nóng hổi đến nỗi mọi người đều nói về nó.'",
      keywords: ["so", "that", "news", "everyone", "talk"],
      sample: "The news was so hot that everyone talked about it."
    },
    {
      id: "wr2",
      promptVi: "Viết câu dùng cấu trúc SUCH...THAT: 'Internet là một công cụ mạnh mẽ đến nỗi ai cũng dùng nó.'",
      keywords: ["such", "powerful", "tool", "that", "uses"],
      sample: "The Internet is such a powerful tool that everyone uses it."
    },
    {
      id: "wr3",
      promptVi: "Viết câu dùng AS IF + WERE: 'Anh ta nói chuyện như thể anh ta là một chuyên gia truyền thông.'",
      keywords: ["as if", "were", "expert"],
      sample: "He talks as if he were a media expert."
    },
    {
      id: "wr4",
      promptVi: "Viết câu có từ LEAFLET hoặc BILLBOARD: 'Chúng tôi đã phát các tờ rơi để quảng bá sự kiện từ thiện.'",
      keywords: ["leaflets", "promote", "event"],
      sample: "We distributed leaflets to promote our charity event."
    }
  ]
};
