/**
 * DỮ LIỆU BÀI GIẢNG TƯƠNG TÁC: ÔN THI GIỮA KÌ 1 - TIẾNG ANH 11 GLOBAL SUCCESS
 * Soạn riêng cho: Bạn Thái (Lớp 11) - Thầy Thức hướng dẫn
 */

const LECTURE_DATA = {
  title: "Cẩm Nang Tri Thức & Đấu Trường Từ Vựng Giữa Kì 1",
  subject: "Tiếng Anh 11 (Global Success - Units 1, 2, 3)",
  teacher: "Thầy Thức",

  // 1. TỪ VỰNG CỐT LÕI (50 TỪ VỰNG 3 UNIT)
  vocabList: [
    // UNIT 1: A LONG AND HEALTHY LIFE
    {
      id: 1,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Longevity",
      ipa: "/lɒnˈdʒevəti/",
      pos: "noun",
      meaning: "Tuổi thọ, sự sống lâu",
      collocation: "promote longevity / achieve longevity",
      example: "A balanced diet and regular exercise are key factors that promote longevity.",
      exampleVi: "Chế độ ăn cân bằng và tập thể dục đều đặn là những yếu tố then chốt giúp nâng cao tuổi thọ."
    },
    {
      id: 2,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Nutrient",
      ipa: "/ˈnjuːtriənt/",
      pos: "noun",
      meaning: "Chất dinh dưỡng",
      collocation: "essential nutrients / absorb nutrients",
      example: "Fresh vegetables provide essential nutrients that strengthen the body.",
      exampleVi: "Rau tươi cung cấp các chất dinh dưỡng thiết yếu giúp tăng cường cơ thể."
    },
    {
      id: 3,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Nutritious",
      ipa: "/njuˈtrɪʃəs/",
      pos: "adjective",
      meaning: "Bổ dưỡng, giàu dinh dưỡng",
      collocation: "nutritious diet / nutritious meal",
      example: "Her parents always prepare nutritious meals containing organic vegetables and fish.",
      exampleVi: "Bố mẹ cô ấy luôn chuẩn bị những bữa ăn bổ dưỡng gồm rau hữu cơ và cá."
    },
    {
      id: 4,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Infectious",
      ipa: "/ɪnˈfekʃəs/",
      pos: "adjective",
      meaning: "Lây nhiễm, truyền nhiễm",
      collocation: "infectious disease / highly infectious",
      example: "Seasonal flu is an infectious disease that spreads quickly in crowded places.",
      exampleVi: "Cúm mùa là một bệnh truyền nhiễm lây lan nhanh chóng ở những nơi đông người."
    },
    {
      id: 5,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Infection",
      ipa: "/ɪnˈfekʃn/",
      pos: "noun",
      meaning: "Sự nhiễm khuẩn, lây nhiễm",
      collocation: "prevent infection / bacterial infection",
      example: "Washing your hands frequently is the most effective way to prevent infection.",
      exampleVi: "Rửa tay thường xuyên là cách hiệu quả nhất để ngăn ngừa nhiễm trùng."
    },
    {
      id: 6,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Antibiotic",
      ipa: "/ˌæntibaɪˈɒtɪk/",
      pos: "noun",
      meaning: "Thuốc kháng sinh",
      collocation: "prescribe antibiotics / overuse of antibiotics",
      example: "Doctors only prescribe antibiotics when treating severe bacterial infections.",
      exampleVi: "Bác sĩ chỉ kê đơn thuốc kháng sinh khi điều trị các bệnh nhiễm khuẩn nặng."
    },
    {
      id: 7,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Bacteria",
      ipa: "/bækˈtɪəriə/",
      pos: "noun (pl)",
      meaning: "Vi khuẩn (danh từ số nhiều của bacterium)",
      collocation: "harmful bacteria / kill bacteria",
      example: "Good bacteria inside the human digestive tract help process food efficiently.",
      exampleVi: "Lợi khuẩn bên trong đường tiêu hóa của con người giúp xử lý thức ăn hiệu quả."
    },
    {
      id: 8,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Immune system",
      ipa: "/ɪˈmjuːn ˌsɪstəm/",
      pos: "noun phrase",
      meaning: "Hệ miễn dịch",
      collocation: "boost / build up the immune system",
      example: "Getting 8 hours of sleep each night helps build up a robust immune system.",
      exampleVi: "Ngủ đủ 8 tiếng mỗi đêm giúp xây dựng một hệ miễn dịch khỏe mạnh."
    },
    {
      id: 9,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Treatment",
      ipa: "/ˈtriːtmənt/",
      pos: "noun",
      meaning: "Liệu trình điều trị, sự chữa trị",
      collocation: "medical treatment / respond to treatment",
      example: "The patient responded remarkably well to the medical treatment.",
      exampleVi: "Bệnh nhân đã đáp ứng rất tốt với liệu trình điều trị y tế."
    },
    {
      id: 10,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Fitness",
      ipa: "/ˈfɪtnəs/",
      pos: "noun",
      meaning: "Thể lực, sự sung sức",
      collocation: "physical fitness / improve fitness",
      example: "Swimming and jogging are excellent cardiovascular exercises for physical fitness.",
      exampleVi: "Bơi lội và chạy bộ là những bài tập tim mạch tuyệt vời để rèn luyện thể lực."
    },
    {
      id: 11,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Muscle",
      ipa: "/ˈmʌsl/",
      pos: "noun",
      meaning: "Cơ bắp",
      collocation: "build up muscles / muscle strength",
      example: "Strength training helps build up core muscles and protect joint health.",
      exampleVi: "Tập luyện sức mạnh giúp phát triển các nhóm cơ cốt lõi và bảo vệ khớp."
    },
    {
      id: 12,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Dietary",
      ipa: "/ˈdaɪətəri/",
      pos: "adjective",
      meaning: "Thuộc về chế độ ăn uống",
      collocation: "dietary habits / dietary changes",
      example: "Healthy dietary habits can prevent obesity and cardiovascular diseases.",
      exampleVi: "Những thói quen ăn uống lành mạnh có thể ngăn ngừa béo phì và bệnh tim mạch."
    },
    {
      id: 13,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Remedy",
      ipa: "/ˈremədi/",
      pos: "noun",
      meaning: "Phương thuốc, bài thuốc (dân gian/tự nhiên)",
      collocation: "herbal remedy / natural remedies",
      example: "Warm ginger tea with honey is a classic natural remedy for a sore throat.",
      exampleVi: "Trà gừng ấm mật ong là bài thuốc tự nhiên kinh điển trị đau họng."
    },
    {
      id: 14,
      unit: 1,
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Life expectancy",
      ipa: "/ˈlaɪf ɪkspektənsi/",
      pos: "noun phrase",
      meaning: "Tuổi thọ trung bình dự kiến",
      collocation: "increase life expectancy / average life expectancy",
      example: "Modern medical breakthroughs have substantially increased human life expectancy.",
      exampleVi: "Những đột phá y học hiện đại đã làm gia tăng đáng kể tuổi thọ trung bình của con người."
    },

    // UNIT 2: THE GENERATION GAP
    {
      id: 15,
      unit: 2,
      unitName: "Unit 2: The Generation Gap",
      word: "Generation gap",
      ipa: "/ˌdʒenəˈreɪʃn ɡæp/",
      pos: "noun phrase",
      meaning: "Khoảng cách thế hệ (bất đồng quan điểm giữa các lứa tuổi)",
      collocation: "bridge / widen the generation gap",
      example: "Family dinners are a great opportunity to bridge the generation gap.",
      exampleVi: "Bữa cơm gia đình là cơ hội tuyệt vời để thu hẹp khoảng cách thế hệ."
    },
    {
      id: 16,
      unit: 2,
      unitName: "Unit 2: The Generation Gap",
      word: "Nuclear family",
      ipa: "/ˌnjuːkliə ˈfæməli/",
      pos: "noun phrase",
      meaning: "Gia đình hạt nhân (chỉ gồm bố mẹ và con cái)",
      collocation: "live in a nuclear family",
      example: "Modern city couples usually live in a nuclear family rather than with relatives.",
      exampleVi: "Các cặp vợ chồng trẻ ở thành phố hiện nay thường sống trong gia đình hạt nhân."
    },
    {
      id: 17,
      unit: 2,
      unitName: "Unit 2: The Generation Gap",
      word: "Extended family",
      ipa: "/ɪkˌstendɪd ˈfæməli/",
      pos: "noun phrase",
      meaning: "Gia đình đa thế hệ (ông bà, bố mẹ, con cháu chung sống)",
      collocation: "live in an extended family",
      example: "Children who grow up in an extended family often receive care from grandparents.",
      exampleVi: "Trẻ em lớn lên trong gia đình đa thế hệ thường nhận được sự chăm sóc từ ông bà."
    },
    {
      id: 18,
      unit: 2,
      unitName: "Unit 2: The Generation Gap",
      word: "Curfew",
      ipa: "/ˈkɜːfjuː/",
      pos: "noun",
      meaning: "Giờ giới nghiêm (giờ phải có mặt ở nhà vào buổi tối)",
      collocation: "set a curfew / break a curfew",
      example: "His parents set a strict 9:30 PM curfew on school nights.",
      exampleVi: "Bố mẹ anh ấy đặt giờ giới nghiêm nghiêm ngặt lúc 9h30 tối vào các ngày đi học."
    },
    {
      id: 19,
      unit: 2,
      unitName: "Unit 2: The Generation Gap",
      word: "Viewpoint",
      ipa: "/ˈvjuːpɔɪnt/",
      pos: "noun",
      meaning: "Quan điểm, góc nhìn cá nhân",
      collocation: "different viewpoints / express a viewpoint",
      example: "Parents and teens need to respect each other's viewpoints during discussions.",
      exampleVi: "Bố mẹ và thanh thiếu niên cần tôn trọng quan điểm của nhau khi thảo luận."
    },
    {
      id: 20,
      unit: 2,
      unitName: "Unit 2: The Generation Gap",
      word: "Open-minded",
      ipa: "/ˌəʊpən ˈmaɪndɪd/",
      pos: "adjective",
      meaning: "Cởi mở, sẵn sàng tiếp thu cái mới",
      collocation: "be open-minded about / open-minded attitude",
      example: "Modern educators are open-minded about using digital AI tools in learning.",
      exampleVi: "Các nhà giáo dục hiện đại rất cởi mở về việc ứng dụng công cụ AI số vào học tập."
    },
    {
      id: 21,
      unit: 2,
      unitName: "Unit 2: The Generation Gap",
      word: "Conservative",
      ipa: "/kənˈsɜːvətɪv/",
      pos: "adjective",
      meaning: "Bảo thủ, truyền thống, dè dặt trước thay đổi",
      collocation: "conservative parents / conservative views",
      example: "Older generations can sometimes be conservative regarding modern hairstyles.",
      exampleVi: "Các thế hệ đi trước đôi khi có phần bảo thủ đối với các kiểu tóc hiện đại."
    },
    {
      id: 22,
      unit: 2,
      unitName: "Unit 2: The Generation Gap",
      word: "Independent",
      ipa: "/ˌɪndɪˈpendənt/",
      pos: "adjective",
      meaning: "Độc lập, tự chủ (không phụ thuộc người khác)",
      collocation: "financially independent / become independent",
      example: "Young graduates aspire to become financially independent after finishing university.",
      exampleVi: "Các bạn trẻ mới tốt nghiệp đều khao khát trở nên độc lập về tài chính."
    },
    {
      id: 23,
      unit: 2,
      unitName: "Unit 2: The Generation Gap",
      word: "Privacy",
      ipa: "/ˈprɪvəsi/",
      pos: "noun",
      meaning: "Quyền riêng tư, sự kín đáo",
      collocation: "respect one's privacy / invasion of privacy",
      example: "Parents should respect their teenagers' privacy by knocking before entering.",
      exampleVi: "Bố mẹ nên tôn trọng quyền riêng tư của con bằng cách gõ cửa trước khi vào phòng."
    },
    {
      id: 24,
      unit: 2,
      unitName: "Unit 2: The Generation Gap",
      word: "Disapproval",
      ipa: "/ˌdɪsəˈpruːvl/",
      pos: "noun",
      meaning: "Sự không đồng tình, phản đối",
      collocation: "express disapproval of / show disapproval",
      example: "Her father shook his head in silent disapproval when she dyed her hair bright neon.",
      exampleVi: "Bố cô ấy lắc đầu tỏ vẻ không đồng tình khi thấy cô nhuộm tóc màu dạ quang."
    },
    {
      id: 25,
      unit: 2,
      unitName: "Unit 2: The Generation Gap",
      word: "Respectful",
      ipa: "/rɪˈspektfl/",
      pos: "adjective",
      meaning: "Lễ phép, thể hiện sự kính trọng",
      collocation: "be respectful to/towards elders",
      example: "Teenagers should always be respectful when speaking to their teachers and elders.",
      exampleVi: "Học sinh nên luôn luôn lễ phép khi trò chuyện với thầy cô và người lớn tuổi."
    },

    // UNIT 3: CITIES OF THE FUTURE
    {
      id: 26,
      unit: 3,
      unitName: "Unit 3: Cities of the Future",
      word: "Sustainable",
      ipa: "/səˈsteɪnəbl/",
      pos: "adjective",
      meaning: "Bền vững, thân thiện và bảo vệ môi trường lâu dài",
      collocation: "sustainable development / sustainable city",
      example: "Solar energy and wind turbines provide sustainable power for eco-friendly districts.",
      exampleVi: "Năng lượng mặt trời và tuabin gió cung cấp điện năng bền vững cho các khu đô thị sinh thái."
    },
    {
      id: 27,
      unit: 3,
      unitName: "Unit 3: Cities of the Future",
      word: "Liveable",
      ipa: "/ˈlɪvəbl/",
      pos: "adjective",
      meaning: "Đáng sống (thành phố có môi trường và tiện ích tốt)",
      collocation: "most liveable city / liveable environment",
      example: "Da Nang is frequently voted as one of the most liveable cities in Vietnam.",
      exampleVi: "Đà Nẵng thường xuyên được bình chọn là một trong những thành phố đáng sống nhất Việt Nam."
    },
    {
      id: 28,
      unit: 3,
      unitName: "Unit 3: Cities of the Future",
      word: "Infrastructure",
      ipa: "/ˈɪnfrəstrʌktʃə(r)/",
      pos: "noun",
      meaning: "Cơ sở hạ tầng (đường xá, cầu cống, mạng lưới điện nước)",
      collocation: "modern infrastructure / transport infrastructure",
      example: "Investing in green infrastructure will reduce vehicle emissions and road congestion.",
      exampleVi: "Đầu tư vào cơ sở hạ tầng xanh sẽ làm giảm khí thải phương tiện và ùn tắc giao thông."
    },
    {
      id: 29,
      unit: 3,
      unitName: "Unit 3: Cities of the Future",
      word: "Sensor",
      ipa: "/ˈsensə(r)/",
      pos: "noun",
      meaning: "Thiết bị cảm biến điện tử",
      collocation: "traffic sensors / install sensors",
      example: "Smart streetlights equipped with sensors automatically dim when no cars pass by.",
      exampleVi: "Đèn đường thông minh gắn cảm biến sẽ tự động giảm sáng khi không có xe cộ qua lại."
    },
    {
      id: 30,
      unit: 3,
      unitName: "Unit 3: Cities of the Future",
      word: "Pedestrian zone",
      ipa: "/pəˈdestriən zəʊn/",
      pos: "noun phrase",
      meaning: "Tuyến phố / khu vực đi bộ (cấm xe cơ giới)",
      collocation: "create pedestrian zones / walk in pedestrian areas",
      example: "Nguyen Hue street in Ho Chi Minh City transforms into a bustling pedestrian zone on weekends.",
      exampleVi: "Đường Nguyễn Huệ tại TP.HCM biến thành tuyến phố đi bộ nhộn nhịp vào cuối tuần."
    },
    {
      id: 31,
      unit: 3,
      unitName: "Unit 3: Cities of the Future",
      word: "Carbon footprint",
      ipa: "/ˌkɑːbən ˈfʊtprɪnt/",
      pos: "noun phrase",
      meaning: "Dấu chân carbon (tổng lượng khí nhà kính phát thải)",
      collocation: "reduce / minimize carbon footprint",
      example: "Commuting by bicycle and metro helps citizens dramatically shrink their carbon footprint.",
      exampleVi: "Di chuyển bằng xe đạp và tàu điện ngầm giúp người dân thu hẹp đáng kể dấu chân carbon."
    },
    {
      id: 32,
      unit: 3,
      unitName: "Unit 3: Cities of the Future",
      word: "Renewable",
      ipa: "/rɪˈnjuːəbl/",
      pos: "adjective",
      meaning: "Tái tạo được (năng lượng vô tận như mặt trời, gió)",
      collocation: "renewable energy sources / renewable power",
      example: "Future mega-cities will rely 100% on renewable energy instead of coal or petroleum.",
      exampleVi: "Các siêu đô thị tương lai sẽ phụ thuộc hoàn toàn vào năng lượng tái tạo thay vì than đá."
    },
    {
      id: 33,
      unit: 3,
      unitName: "Unit 3: Cities of the Future",
      word: "Quality of life",
      ipa: "/ˌkwɒləti əv ˈlaɪf/",
      pos: "noun phrase",
      meaning: "Chất lượng cuộc sống",
      collocation: "improve quality of life / high quality of life",
      example: "Clean air, affordable housing, and lush parks drastically enhance urban quality of life.",
      exampleVi: "Không khí trong lành, nhà ở vừa túi tiền và công viên xanh cải thiện mạnh mẽ chất lượng sống."
    }
  ],

  // 2. BẢN ĐỒ NGỮ PHÁP TRỌNG TÂM (CORE GRAMMAR MATRIX)
  grammarModules: [
    {
      id: "gram1",
      title: "1. Thì Quá khứ đơn (Past Simple) vs. Hiện tại hoàn thành (Present Perfect)",
      focus: "Trọng tâm Unit 1 - Bẫy nhận biết thời gian trong đề thi",
      theoryHtml: `
        <div class="grammar-compare-grid">
          <div class="grammar-card past-card">
            <h4>📌 QUÁ KHỨ ĐƠN (Past Simple)</h4>
            <div class="formula-box">S + V2 / V-ed</div>
            <p><strong>Bản chất:</strong> Hành động đã xảy ra và <em>kết thúc hoàn toàn</em> tại thời điểm xác định trong quá khứ.</p>
            <div class="signal-tag-list">
              <span class="signal-tag">yesterday</span>
              <span class="signal-tag">ago (two weeks ago)</span>
              <span class="signal-tag">in 2020</span>
              <span class="signal-tag">last week / night</span>
            </div>
            <div class="example-quote">"Dr. Evans <strong>published</strong> his paper two weeks ago."</div>
          </div>

          <div class="grammar-card perfect-card">
            <h4>📌 HIỆN TẠI HOÀN THÀNH (Present Perfect)</h4>
            <div class="formula-box">S + have / has + V3 / V-ed</div>
            <p><strong>Bản chất:</strong> Hành động bắt đầu trong quá khứ, <em>kéo dài đến hiện tại</em> hoặc để lại kết quả ở hiện tại.</p>
            <div class="signal-tag-list">
              <span class="signal-tag">since + mốc thời gian</span>
              <span class="signal-tag">for + khoảng thời gian</span>
              <span class="signal-tag">over the last few decades</span>
              <span class="signal-tag">already / yet / ever</span>
            </div>
            <div class="example-quote">"Lan <strong>has gone</strong> to yoga classes since she recovered."</div>
          </div>
        </div>

        <div class="transform-formula-box">
          <h5>★ 4 CÔNG THỨC VIẾT LẠI CÂU BẤT HỦ TRONG ĐỀ THI:</h5>
          <ul>
            <li><strong>Công thức 1:</strong> The last time + S + V2/ed + was + [time] ago <br>
            ➔ <code>S + haven't / hasn't + V3/ed + for + [time]</code></li>
            <li><strong>Công thức 2:</strong> S + started / began + V-ing / to-V + [time] ago <br>
            ➔ <code>S + have / has + V3/ed + for + [time]</code></li>
            <li><strong>Công thức 3:</strong> This is the first time + S + have/has + V3/ed <br>
            ➔ <code>S + have / has + never + V3/ed + before</code></li>
            <li><strong>Công thức 4:</strong> It is / It has been + [time] + since + S + (last) + V2/ed <br>
            ➔ <code>S + haven't / hasn't + V3/ed + for + [time]</code></li>
          </ul>
        </div>
      `
    },
    {
      id: "gram2",
      title: "2. Động từ khiếm khuyết (Modal Verbs: Must, Have to, Should, Mustn't)",
      focus: "Trọng tâm Unit 2 - Phân biệt bản chất bắt buộc, khuyên nhủ và cấm đoán",
      theoryHtml: `
        <div class="modal-rules-table-wrapper">
          <table class="modal-rules-table">
            <thead>
              <tr>
                <th>Từ khiếm khuyết</th>
                <th>Ý nghĩa ngữ pháp</th>
                <th>Tình huống sử dụng</th>
                <th>Ví dụ thực tế</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong class="color-must">MUST</strong></td>
                <td>Bắt buộc chủ quan / cảm xúc nội tâm người nói</td>
                <td>Người nói tự cảm thấy điều đó là thiết yếu, sống còn</td>
                <td>"I <strong>must</strong> exercise more to improve my fitness."</td>
              </tr>
              <tr>
                <td><strong class="color-have-to">HAVE TO</strong></td>
                <td>Bắt buộc khách quan do luật pháp / quy chế ngoài</td>
                <td>Nội quy trường học, luật pháp, giờ giấc công ty</td>
                <td>"Students <strong>have to</strong> wear uniforms on weekdays."</td>
              </tr>
              <tr>
                <td><strong class="color-mustnt">MUSTN'T</strong></td>
                <td>CẤM ĐOÁN TUYỆT ĐỐI (Strict Prohibition)</td>
                <td>Vi phạm sẽ bị phạt, trái pháp luật (against the law)</td>
                <td>"You <strong>mustn't</strong> use phones during the exam."</td>
              </tr>
              <tr>
                <td><strong class="color-dont-have-to">DON'T HAVE TO</strong></td>
                <td>KHÔNG CẦN THIẾT (Lack of necessity)</td>
                <td>Làm hay không tùy ý, không ép buộc</td>
                <td>"You <strong>don't have to</strong> bring an umbrella; it's sunny."</td>
              </tr>
              <tr>
                <td><strong class="color-should">SHOULD</strong></td>
                <td>Lời khuyên nên làm (Advisable)</td>
                <td>Đề xuất hành động tốt, có lợi cho đối phương</td>
                <td>"Teens <strong>should</strong> talk openly with their parents."</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "gram3",
      title: "3. Động từ trạng thái & Động từ nối (Stative & Linking Verbs)",
      focus: "Trọng tâm Unit 3 - Bẫy tính từ vs. trạng từ sau động từ nối",
      theoryHtml: `
        <div class="linking-verbs-box">
          <h4>🌟 QUY TẮC VÀNG: LINKING VERBS + ADJECTIVE (Tính từ, KHÔNG dùng trạng từ!)</h4>
          <p>Các động từ nối chỉ cảm giác giác quan thường gặp:</p>
          <div class="linking-chips">
            <span>taste (có vị)</span>
            <span>smell (có mùi)</span>
            <span>sound (nghe có vẻ)</span>
            <span>look (trông có vẻ)</span>
            <span>feel (cảm thấy)</span>
            <span>appear / seem (dường như)</span>
          </div>

          <div class="pitfall-box">
            <strong>⚠️ BẪY THƯỜNG GẶP TRONG ĐỀ THI:</strong>
            <ul>
              <li>❌ "The mushroom soup tastes <u>deliciously</u>." ➔ ✅ "The mushroom soup tastes <strong>delicious</strong>."</li>
              <li>❌ "The public transport looks <u>comfortably</u>." ➔ ✅ "The public transport looks <strong>comfortable</strong>."</li>
              <li><strong>Phân biệt Stative (trạng thái) vs Action (hành động):</strong>
                <br>• "The soup <em>tastes</em> great!" (Linking: súp có vị ngon ➔ không chia tiếp diễn).
                <br>• "The chef <em>is tasting</em> the soup." (Action: đầu bếp đang nếm canh ➔ chia được tiếp diễn).
              </li>
            </ul>
          </div>
        </div>
      `
    }
  ],

  // 3. FEATURE 1: COLLOCATION MATCHING PAIRS (KÉO THẢ / NỐI CỤM TỪ)
  collocationPairs: [
    { id: 1, verb: "cut down on", noun: "fatty foods and sugary drinks", meaning: "(cắt giảm thức ăn dầu mỡ & đồ ngọt)" },
    { id: 2, verb: "bridge", noun: "the generation gap in modern families", meaning: "(thu hẹp khoảng cách thế hệ)" },
    { id: 3, verb: "follow in", noun: "parents' footsteps and take over business", meaning: "(tiếp bước nối nghiệp cha mẹ)" },
    { id: 4, verb: "reduce", noun: "carbon footprint and greenhouse gases", meaning: "(giảm lượng phát thải carbon)" },
    { id: 5, verb: "impose", noun: "strict rules and career choices on children", meaning: "(áp đặt quy tắc lên con cái)" },
    { id: 6, verb: "prescribe", noun: "antibiotics for bacterial infections", meaning: "(kê đơn thuốc kháng sinh)" },
    { id: 7, verb: "operate on", noun: "renewable solar and wind energy", meaning: "(vận hành bằng năng lượng tái tạo)" },
    { id: 8, verb: "boost", noun: "the immune system with vitamin C", meaning: "(tăng cường hệ miễn dịch)" }
  ],

  // FEATURE 1B: ODD-ONE-OUT COLLOCATION (TÌM TỪ KHÔNG ĐI CÙNG ĐƯỢC)
  oddOneOut: [
    {
      id: 1,
      nounPhrase: "________ the generation gap",
      options: ["bridge", "narrow", "widen", "prescribe"],
      wrongIndex: 3,
      explanation: "Chính xác! Ta dùng 'bridge / narrow / widen the generation gap' (thu hẹp/mở rộng khoảng cách thế hệ). Từ 'prescribe' chỉ dùng cho thuốc kháng sinh!"
    },
    {
      id: 2,
      nounPhrase: "a(n) ________ family",
      options: ["nuclear", "extended", "single-parent", "renewable"],
      wrongIndex: 3,
      explanation: "Chính xác! 'Nuclear / extended / single-parent family' là các kiểu gia đình (hạt nhân, nhiều thế hệ, đơn thân). 'Renewable' (tái tạo) chỉ dùng cho năng lượng!"
    },
    {
      id: 3,
      nounPhrase: "________ antibiotics",
      options: ["prescribe", "take", "overuse", "install"],
      wrongIndex: 3,
      explanation: "Chính xác! Ta nói 'prescribe / take / overuse antibiotics' (kê đơn, uống, lạm dụng kháng sinh). 'Install' (lắp đặt) chỉ dùng cho máy móc/thiết bị!"
    },
    {
      id: 4,
      nounPhrase: "________ carbon footprint",
      options: ["reduce", "minimize", "shrink", "infect"],
      wrongIndex: 3,
      explanation: "Chính xác! Ta nói 'reduce / minimize / shrink carbon footprint' (giảm thiểu dấu chân carbon). 'Infect' (lây nhiễm) chỉ dùng cho mầm bệnh vi khuẩn/virus!"
    }
  ],

  // 4. FEATURE 2: WORD FAMILY TREE (CÂY TỪ LOẠI TƯƠNG TÁC)
  wordFamilyRoots: [
    {
      id: 1,
      root: "SUSTAIN",
      pos: "verb",
      meaning: "duy trì, chống đỡ",
      derivatives: [
        { word: "sustainability", pos: "noun", vi: "sự bền vững môi trường" },
        { word: "sustainable", pos: "adjective", vi: "bền vững, thân thiện sinh thái" },
        { word: "sustainably", pos: "adverb", vi: "một cách bền vững" }
      ]
    },
    {
      id: 2,
      root: "INFECT",
      pos: "verb",
      meaning: "lây nhiễm, làm nhiễm trùng",
      derivatives: [
        { word: "infection", pos: "noun", vi: "sự nhiễm khuẩn, lây nhiễm" },
        { word: "infectious", pos: "adjective", vi: "có tính lây nhiễm (bệnh)" },
        { word: "disinfectant", pos: "noun", vi: "chất khử khuẩn" }
      ]
    },
    {
      id: 3,
      root: "NUTRIENT",
      pos: "noun",
      meaning: "chất dinh dưỡng",
      derivatives: [
        { word: "nutrition", pos: "noun", vi: "ngành/chế độ dinh dưỡng" },
        { word: "nutritious", pos: "adjective", vi: "bổ dưỡng, giàu dinh dưỡng" },
        { word: "malnutrition", pos: "noun", vi: "suy dinh dưỡng" }
      ]
    },
    {
      id: 4,
      root: "LIVE",
      pos: "verb",
      meaning: "sống, sinh sống",
      derivatives: [
        { word: "liveable", pos: "adjective", vi: "đáng sống (thành phố)" },
        { word: "liveability", pos: "noun", vi: "chất lượng / độ đáng sống" },
        { word: "livelihood", pos: "noun", vi: "kế sinh nhai" }
      ]
    }
  ],

  // FEATURE 2B: OPEN CLOZE WORD FORMATION (ĐIỀN DẠNG ĐÚNG CỦA TỪ TRONG NGOẶC)
  openCloze: [
    {
      id: 1,
      sentence: "It is crucial to follow a _________ diet containing all vital vitamins and minerals. (BALANCE)",
      root: "BALANCE",
      expectedAnswer: "balanced",
      explanation: "Trước danh từ 'diet' cần một TÍNH TỪ mang nghĩa 'cân bằng' ➔ balanced."
    },
    {
      id: 2,
      sentence: "Abundant green spaces contribute greatly to the _________ of smart cities. (SUSTAIN)",
      root: "SUSTAIN",
      expectedAnswer: "sustainability",
      explanation: "Sau mạo từ 'the' và trước giới từ 'of' cần một DANH TỪ chỉ 'sự bền vững' ➔ sustainability."
    },
    {
      id: 3,
      sentence: "Generational disputes often stem from conflicting _________ regarding career choices. (VIEW)",
      root: "VIEW",
      expectedAnswer: "viewpoints",
      explanation: "Sau tính từ 'conflicting' cần một DANH TỪ SỐ NHIỀU chỉ 'quan điểm' ➔ viewpoints."
    },
    {
      id: 4,
      sentence: "Common cold and seasonal flu are typical _________ illnesses that antibiotics cannot cure. (VIRUS)",
      root: "VIRUS",
      expectedAnswer: "viral",
      explanation: "Trước danh từ 'illnesses' cần TÍNH TỪ mang nghĩa 'do vi-rút gây ra' ➔ viral."
    },
    {
      id: 5,
      sentence: "To boost your physical endurance, you should exercise _________ every morning. (REGULAR)",
      root: "REGULAR",
      expectedAnswer: "regularly",
      explanation: "Bổ nghĩa cho động từ 'exercise' cần một TRẠNG TỪ chỉ tần suất ➔ regularly."
    }
  ],

  // 5. FEATURE 3: ACTIVE RECALL (FIRST-LETTER CLUE)
  activeRecall: [
    {
      id: 1,
      sentence: "Modern city planners are building dedicated p_____________ zones where all motor vehicles are banned.",
      clue: "p",
      targetWord: "pedestrian",
      ipa: "/pəˈdestriən/",
      vi: "Người đi bộ / khu vực dành riêng cho người đi bộ.",
      definition: "A person walking rather than travelling in a vehicle; zones reserved strictly for walkers."
    },
    {
      id: 2,
      sentence: "Eating plenty of fresh vegetables and keeping active promote human l___________ substantially.",
      clue: "l",
      targetWord: "longevity",
      ipa: "/lɒnˈdʒevəti/",
      vi: "Tuổi thọ, sự sống lâu trăm tuổi.",
      definition: "Long life, the fact of living for many years."
    },
    {
      id: 3,
      sentence: "Family meals and patient conversations help b__________ the generation gap.",
      clue: "b",
      targetWord: "bridge",
      ipa: "/brɪdʒ/",
      vi: "Thu hẹp khoảng cách bất đồng thế hệ.",
      definition: "To make the difference between two groups smaller or overcome a divide."
    },
    {
      id: 4,
      sentence: "Smart streetlights equipped with infrared s___________ automatically turn on when pedestrians walk past.",
      clue: "s",
      targetWord: "sensors",
      ipa: "/ˈsensəz/",
      vi: "Thiết bị cảm biến điện tử thông minh.",
      definition: "Devices that detect or measure physical properties and respond to them."
    },
    {
      id: 5,
      sentence: "Her father sets a strict 9:30 PM c___________ on weekdays to ensure her safety.",
      clue: "c",
      targetWord: "curfew",
      ipa: "/ˈkɜːfjuː/",
      vi: "Giờ giới nghiêm buộc phải về đến nhà.",
      definition: "A rule requiring people to remain indoors between specified hours, especially at night."
    }
  ],

  // 6. FEATURE 4: INTERACTIVE SENTENCE WRITING (THỬ THÁCH ĐẶT CÂU PHẢN HỒI NGAY)
  writingChallenges: [
    {
      id: 1,
      keyword: "cut down on",
      prompt: "Hãy viết 1 câu hoàn chỉnh khuyên bạn bè 'cắt giảm đồ ngọt hoặc đồ ăn nhanh để sống khỏe hơn' sử dụng cụm từ 'cut down on'.",
      requiredWords: ["cut down on"],
      forbiddenWords: ["cut down at", "cut down in"],
      modelAnswer: "You should cut down on fast food and sugary drinks to live a healthier life."
    },
    {
      id: 2,
      keyword: "mustn't",
      prompt: "Hãy viết 1 câu diễn tả nội quy phòng thi: 'Học sinh không được phép sử dụng điện thoại trong giờ kiểm tra' sử dụng 'mustn't'.",
      requiredWords: ["mustn't"],
      forbiddenWords: ["don't have to use", "doesn't have to use"],
      modelAnswer: "Students mustn't use their smartphones during the examination."
    },
    {
      id: 3,
      keyword: "haven't ... since",
      prompt: "Hãy viết 1 câu sử dụng thì Hiện tại hoàn thành với 'haven't' và 'since' diễn tả việc bạn chưa đến thăm một thành phố thông minh kể từ năm ngoái.",
      requiredWords: ["haven't", "since"],
      forbiddenWords: ["haven't visited ... for 2025"],
      modelAnswer: "I haven't visited this smart city since last year."
    },
    {
      id: 4,
      keyword: "tastes / smells",
      prompt: "Hãy viết 1 câu khen ngợi món ăn mẹ nấu: 'Món súp này có vị rất ngon' sử dụng linking verb 'tastes' (chú ý: dùng tính từ, KHÔNG dùng trạng từ).",
      requiredWords: ["tastes"],
      forbiddenWords: ["tastes deliciously", "taste deliciously"],
      modelAnswer: "This soup tastes delicious and nutritious."
    }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = LECTURE_DATA;
}
