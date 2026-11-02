/**
 * DỮ LIỆU BÀI GIẢNG TƯƠNG TÁC: UNIT 6 - ARTIFICIAL INTELLIGENCE
 * Tiếng Anh 12 Global Success
 * Soạn riêng cho: Bạn Nam Việt (Lớp 12 - Mục tiêu 7+ THPTQG)
 * Hướng dẫn & Bản quyền: Thầy Thức
 */

const LECTURE_DATA = {
  title: "Cẩm Nang Tri Thức & Đấu Trường Từ Vựng Unit 6: Artificial Intelligence",
  subject: "Tiếng Anh 12 (Global Success - Unit 6)",
  teacher: "Thầy Thức",

  // 1. TỪ VỰNG CỐT LÕI (50 TỪ VỰNG TRỌNG TÂM)
  vocabList: [
    // NHÓM 1: AI CỐT LÕI & CÔNG NGHỆ MỚI (18 TỪ)
    {
      id: 1,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Interact with",
      ipa: "/ˌɪntərˈækt wɪð/",
      pos: "phr. verb",
      meaning: "Tương tác với",
      collocation: "interact with users / interact naturally",
      example: "Modern AI chatbots can interact with users naturally and fluently.",
      exampleVi: "Các chatbot AI hiện đại có thể tương tác với người dùng một cách tự nhiên và trôi chảy."
    },
    {
      id: 2,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Algorithm",
      ipa: "/ˈælɡərɪðəm/",
      pos: "noun",
      meaning: "Thuật toán",
      collocation: "recommendation algorithm / search algorithm",
      example: "The recommendation algorithm suggests videos based on your past viewing habits.",
      exampleVi: "Thuật toán đề xuất gợi ý video dựa trên thói quen xem trước đây của bạn."
    },
    {
      id: 3,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Artificial",
      ipa: "/ˌɑːtɪˈfɪʃl/",
      pos: "adjective",
      meaning: "Nhân tạo (do con người tạo ra)",
      collocation: "artificial intelligence (AI) / artificial neural network",
      example: "Artificial intelligence is transforming the way healthcare professionals work.",
      exampleVi: "Trí tuệ nhân tạo đang làm thay đổi cách thức làm việc của các chuyên gia y tế."
    },
    {
      id: 4,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Intelligent",
      ipa: "/ɪnˈtelɪdʒənt/",
      pos: "adjective",
      meaning: "Thông minh, có trí tuệ",
      collocation: "intelligent software / intelligent thermostat",
      example: "Smart buildings use intelligent thermostats to reduce unnecessary power consumption.",
      exampleVi: "Các tòa nhà thông minh sử dụng máy điều nhiệt thông minh để giảm hao phí điện năng."
    },
    {
      id: 5,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Autonomous",
      ipa: "/ɔːˈtɒnəməs/",
      pos: "adjective",
      meaning: "Tự hành, tự chủ, hoạt động độc lập",
      collocation: "autonomous vehicle / autonomous car",
      example: "Testing autonomous cars on public roads requires rigorous safety certification.",
      exampleVi: "Việc thử nghiệm ô tô tự hành trên đường công cộng đòi hỏi chứng nhận an toàn nghiêm ngặt."
    },
    {
      id: 6,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Machine learning",
      ipa: "/məˈʃiːn ˌlɜːnɪŋ/",
      pos: "noun phrase",
      meaning: "Học máy (phân nhánh cốt lõi của AI)",
      collocation: "machine learning model / apply machine learning",
      example: "Machine learning models can analyse massive datasets far more rapidly than humans.",
      exampleVi: "Các mô hình học máy có thể phân tích các tập dữ liệu khổng lồ nhanh hơn con người rất nhiều."
    },
    {
      id: 7,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Neural network",
      ipa: "/ˌnjʊərəl ˈnetwɜːk/",
      pos: "noun phrase",
      meaning: "Mạng nơ-ron nhân tạo",
      collocation: "deep neural network / artificial neural network",
      example: "Deep neural networks mimic the human brain to recognize speech and images.",
      exampleVi: "Mạng nơ-ron sâu mô phỏng bộ não người để nhận dạng giọng nói và hình ảnh."
    },
    {
      id: 8,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Virtual assistant",
      ipa: "/ˌvɜːtʃuəl əˈsɪstənt/",
      pos: "noun phrase",
      meaning: "Trợ lý ảo (như Siri, Google Assistant)",
      collocation: "activate virtual assistant / voice-controlled assistant",
      example: "You can activate the virtual assistant on your phone using simple voice commands.",
      exampleVi: "Con có thể kích hoạt trợ lý ảo trên điện thoại bằng những câu lệnh giọng nói đơn giản."
    },
    {
      id: 9,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Humanoid",
      ipa: "/ˈhjuːmənɔɪd/",
      pos: "adj / noun",
      meaning: "Có hình dáng con người; người máy hình người",
      collocation: "humanoid robot / humanoid appearance",
      example: "Scientists are designing humanoid robots capable of assisting elderly residents.",
      exampleVi: "Các nhà khoa học đang thiết kế robot hình người có khả năng hỗ trợ người cao tuổi."
    },
    {
      id: 10,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Sensor",
      ipa: "/ˈsensər/",
      pos: "noun",
      meaning: "Thiết bị cảm biến",
      collocation: "infrared sensor / motion sensor / optical sensor",
      example: "Autonomous drones use ultrasonic sensors to detect and avoid nearby obstacles.",
      exampleVi: "Máy bay không người lái tự hành sử dụng cảm biến siêu âm để phát hiện và tránh vật cản."
    },
    {
      id: 11,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Recognition",
      ipa: "/ˌrekəɡˈnɪʃn/",
      pos: "noun",
      meaning: "Sự nhận diện, sự công nhận",
      collocation: "facial recognition / speech recognition",
      example: "Facial recognition technology is widely used for security checks at international airports.",
      exampleVi: "Công nghệ nhận diện khuôn mặt được sử dụng rộng rãi để kiểm tra an ninh tại các sân bay quốc tế."
    },
    {
      id: 12,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Activate",
      ipa: "/ˈæktɪveɪt/",
      pos: "verb",
      meaning: "Kích hoạt, khởi động chức năng",
      collocation: "activate the system / voice activation",
      example: "Saying 'Hey Google' will activate your device immediately.",
      exampleVi: "Nói 'Hey Google' sẽ kích hoạt thiết bị của con ngay lập tức."
    },
    {
      id: 13,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Cybersecurity",
      ipa: "/ˌsaɪbəsɪˈkjʊərəti/",
      pos: "noun",
      meaning: "An ninh mạng",
      collocation: "cybersecurity protocol / cybersecurity expert",
      example: "Strong cybersecurity protocols protect sensitive corporate databases from hackers.",
      exampleVi: "Các giao thức an ninh mạng mạnh mẽ bảo vệ cơ sở dữ liệu doanh nghiệp khỏi tin tặc."
    },
    {
      id: 14,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Simulation",
      ipa: "/ˌsɪmjuˈleɪʃn/",
      pos: "noun",
      meaning: "Sự mô phỏng, tình huống giả lập",
      collocation: "computer simulation / flight simulation",
      example: "Astronauts practice landing maneuvers inside an advanced computer simulation.",
      exampleVi: "Các phi hành gia thực hành điều động hạ cánh bên trong một mô phỏng máy tính tiên tiến."
    },
    {
      id: 15,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Database",
      ipa: "/ˈdeɪtəbeɪs/",
      pos: "noun",
      meaning: "Cơ sở dữ liệu",
      collocation: "massive database / query database",
      example: "The AI system scans an enormous database of medical records within seconds.",
      exampleVi: "Hệ thống AI quét qua một cơ sở dữ liệu hồ sơ y tế khổng lồ chỉ trong vài giây."
    },
    {
      id: 16,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Analyse",
      ipa: "/ˈænəlaɪz/",
      pos: "verb",
      meaning: "Phân tích (dữ liệu, xu hướng)",
      collocation: "analyse big data / analyse trends",
      example: "Data analysts use specialized software to analyse consumer purchasing patterns.",
      exampleVi: "Các nhà phân tích dữ liệu sử dụng phần mềm chuyên dụng để phân tích mô hình mua sắm của người tiêu dùng."
    },
    {
      id: 17,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Programme",
      ipa: "/ˈprəʊɡræm/",
      pos: "verb / noun",
      meaning: "Lập trình; chương trình phần mềm",
      collocation: "programme an algorithm / computer programme",
      example: "Software engineers programme the autonomous robot to navigate through complex mazes.",
      exampleVi: "Các kỹ sư phần mềm lập trình robot tự hành để di chuyển qua các mê cung phức tạp."
    },
    {
      id: 18,
      unit: 1,
      unitName: "Nhóm 1: AI & Công Nghệ Mới",
      word: "Cutting-edge",
      ipa: "/ˌkʌtɪŋ ˈedʒ/",
      pos: "adjective",
      meaning: "Tiên tiến nhất, hiện đại bậc nhất",
      collocation: "cutting-edge technology / cutting-edge AI tools",
      example: "The tech lab is equipped with cutting-edge microchips and supercomputers.",
      exampleVi: "Phòng thí nghiệm công nghệ được trang bị các vi chip và siêu máy tính tối tân bậc nhất."
    },

    // NHÓM 2: NĂNG LỰC & ỨNG DỤNG LÀM VIỆC (16 TỪ)
    {
      id: 19,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Capable",
      ipa: "/ˈkeɪpəbl/",
      pos: "adjective",
      meaning: "Có năng lực, có khả năng (đi với OF + V-ing)",
      collocation: "capable of doing sth / highly capable",
      example: "AI systems are capable of handling complex mathematical calculations in seconds.",
      exampleVi: "Các hệ thống AI có khả năng xử lý các phép tính toán học phức tạp trong vài giây."
    },
    {
      id: 20,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Ability",
      ipa: "/əˈbɪləti/",
      pos: "noun",
      meaning: "Khả năng, năng lực (đi với TO V)",
      collocation: "have the ability to do sth / innate ability",
      example: "Generative AI applications have the ability to compose original orchestral music.",
      exampleVi: "Các ứng dụng AI tạo sinh có khả năng sáng tác các bản nhạc giao hưởng nguyên bản."
    },
    {
      id: 21,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Proficiency",
      ipa: "/prəˈfɪʃnsi/",
      pos: "noun",
      meaning: "Sự thành thạo, trình độ tinh thông",
      collocation: "high proficiency in / demonstrate proficiency",
      example: "Modern language models demonstrate high proficiency in multi-language translation.",
      exampleVi: "Các mô hình ngôn ngữ hiện đại thể hiện sự thành thạo cao trong việc dịch đa ngôn ngữ."
    },
    {
      id: 22,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Hands-on",
      ipa: "/ˌhændz ˈɒn/",
      pos: "adjective",
      meaning: "Thực hành, thực tế (kinh nghiệm thực tiễn)",
      collocation: "hands-on experience / hands-on training",
      example: "Students need hands-on experience with AI tools during high school computer labs.",
      exampleVi: "Học sinh cần kinh nghiệm thực hành với các công cụ AI trong các buổi thực hành tin học."
    },
    {
      id: 23,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Automate",
      ipa: "/ˈɔːtəmeɪt/",
      pos: "verb",
      meaning: "Tự động hóa",
      collocation: "automate routine tasks / automate assembly lines",
      example: "Automobile manufacturing plants often automate assembly lines to increase precision.",
      exampleVi: "Các nhà máy sản xuất ô tô thường tự động hóa dây chuyền lắp ráp để tăng độ chính xác."
    },
    {
      id: 24,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Facilitate",
      ipa: "/fəˈsɪlɪteɪt/",
      pos: "verb",
      meaning: "Tạo điều kiện thuận lợi, làm cho dễ dàng hơn",
      collocation: "facilitate learning / facilitate communication",
      example: "Educational software helps facilitate personalized self-paced learning for students.",
      exampleVi: "Phần mềm giáo dục giúp tạo điều kiện thuận lợi cho việc tự học cá nhân hóa của học sinh."
    },
    {
      id: 25,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Application",
      ipa: "/ˌæplɪˈkeɪʃn/",
      pos: "noun",
      meaning: "Ứng dụng phần mềm / sự áp dụng vào thực tiễn",
      collocation: "practical application / mobile application",
      example: "Speech recognition has multiple practical applications in modern customer support.",
      exampleVi: "Nhận diện giọng nói có nhiều ứng dụng thực tế trong dịch vụ chăm sóc khách hàng hiện đại."
    },
    {
      id: 26,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Effective",
      ipa: "/ɪˈfektɪv/",
      pos: "adjective",
      meaning: "Hiệu quả, mang lại kết quả mong muốn",
      collocation: "cost-effective solution / highly effective",
      example: "Predictive analytics provides an effective way to manage warehouse inventory.",
      exampleVi: "Phân tích dự đoán mang lại một phương thức hiệu quả để quản lý hàng tồn kho."
    },
    {
      id: 27,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Improve",
      ipa: "/ɪmˈpruːv/",
      pos: "verb",
      meaning: "Cải thiện, nâng cao chất lượng",
      collocation: "improve accuracy / improve performance",
      example: "Regular software updates help improve the system's diagnostic accuracy over time.",
      exampleVi: "Cập nhật phần mềm thường xuyên giúp cải thiện độ chính xác chẩn đoán của hệ thống theo thời gian."
    },
    {
      id: 28,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Repair",
      ipa: "/rɪˈpeər/",
      pos: "verb / noun",
      meaning: "Sửa chữa; sự sửa chữa",
      collocation: "repair hardware / repair code errors",
      example: "Specialized AI diagnostic tools can detect and repair code errors automatically.",
      exampleVi: "Các công cụ chẩn đoán AI chuyên dụng có thể phát hiện và sửa lỗi mã nguồn tự động."
    },
    {
      id: 29,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Workforce",
      ipa: "/ˈwɜːkfɔːs/",
      pos: "noun",
      meaning: "Lực lượng lao động",
      collocation: "skilled workforce / future workforce",
      example: "Continuous upskilling is vital for the modern workforce to stay relevant alongside AI.",
      exampleVi: "Việc liên tục nâng cao kỹ năng là sống còn để lực lượng lao động hiện đại không bị tụt hậu trước AI."
    },
    {
      id: 30,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Repetitive",
      ipa: "/rɪˈpetətɪv/",
      pos: "adjective",
      meaning: "Lặp đi lặp lại, đơn điệu",
      collocation: "repetitive tasks / repetitive factory jobs",
      example: "Robots are ideally suited for repetitive tasks that human workers find tedious.",
      exampleVi: "Robot rất phù hợp cho các nhiệm vụ lặp đi lặp lại mà công nhân con người cảm thấy tẻ nhạt."
    },
    {
      id: 31,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Diagnose",
      ipa: "/ˈdaɪəɡnəʊz/",
      pos: "verb",
      meaning: "Chẩn đoán (bệnh tật, lỗi kỹ thuật)",
      collocation: "diagnose diseases / accurately diagnose",
      example: "AI models can diagnose rare medical conditions from CT scans with remarkable speed.",
      exampleVi: "Các mô hình AI có thể chẩn đoán bệnh hiếm từ phim chụp CT với tốc độ đáng kinh ngạc."
    },
    {
      id: 32,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Precision",
      ipa: "/prɪˈsɪʒn/",
      pos: "noun",
      meaning: "Độ chính xác tuyệt đối",
      collocation: "high precision / surgical precision",
      example: "Robotic arms perform delicate surgical procedures with micromillimeter precision.",
      exampleVi: "Các cánh tay robot thực hiện các ca phẫu thuật tinh vi với độ chính xác đến từng micromet."
    },
    {
      id: 33,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Integrate",
      ipa: "/ˈɪntɪɡreɪt/",
      pos: "verb",
      meaning: "Tích hợp, hòa nhập (đi với INTO / WITH)",
      collocation: "integrate AI into education / integrate seamlessly",
      example: "Schools are seeking effective ways to integrate AI assistants into daily classrooms.",
      exampleVi: "Các trường học đang tìm cách hiệu quả để tích hợp trợ lý AI vào lớp học hàng ngày."
    },
    {
      id: 34,
      unit: 2,
      unitName: "Nhóm 2: Năng Lực & Làm Việc",
      word: "Generate",
      ipa: "/ˈdʒenəreɪt/",
      pos: "verb",
      meaning: "Tạo ra, phát sinh",
      collocation: "generate content / generate realistic images",
      example: "Modern generative models can generate essays, poems, and computer code in seconds.",
      exampleVi: "Các mô hình tạo sinh hiện đại có thể tạo ra các bài luận, thơ ca và mã máy tính trong vài giây."
    },

    // NHÓM 3: ĐẠO ĐỨC, THÁCH THỨC & TƯƠNG LAI (16 TỪ)
    {
      id: 35,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Scientist",
      ipa: "/ˈsaɪəntɪst/",
      pos: "noun",
      meaning: "Nhà khoa học",
      collocation: "computer scientist / leading scientist",
      example: "Many computer scientists are drafting ethical frameworks for safe AI development.",
      exampleVi: "Nhiều nhà khoa học máy tính đang soạn thảo các khung đạo đức cho sự phát triển AI an toàn."
    },
    {
      id: 36,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Explore",
      ipa: "/ɪkˈsplɔːr/",
      pos: "verb",
      meaning: "Khám phá, thám hiểm, tìm hiểu sâu",
      collocation: "explore deep space / explore potential risks",
      example: "Scientists deploy autonomous rovers to explore hazardous extraterrestrial surfaces.",
      exampleVi: "Các nhà khoa học triển khai các xe tự hành để khám phá những bề mặt ngoài vũ trụ hiểm trở."
    },
    {
      id: 37,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Dangerous",
      ipa: "/ˈdeɪndʒərəs/",
      pos: "adjective",
      meaning: "Nguy hiểm, hiểm nguy",
      collocation: "dangerous disaster zones / dangerous mission",
      example: "Autonomous drones are sent into dangerous disaster zones to assess seismic damage.",
      exampleVi: "Máy bay không người lái tự hành được phái vào vùng thảm họa nguy hiểm để đánh giá thiệt hại."
    },
    {
      id: 38,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Sophisticated",
      ipa: "/səˈfɪstɪkeɪtɪd/",
      pos: "adjective",
      meaning: "Tinh vi, phức tạp, tinh xảo",
      collocation: "sophisticated algorithm / sophisticated neural chips",
      example: "Modern mobile phones are equipped with sophisticated neural processing hardware.",
      exampleVi: "Điện thoại di động ngày nay được trang bị phần cứng xử lý nơ-ron cực kỳ tinh vi."
    },
    {
      id: 39,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Substitute",
      ipa: "/ˈsʌbstɪtjuːt/",
      pos: "verb / noun",
      meaning: "Thay thế; người / vật thay thế (đi với FOR)",
      collocation: "substitute for human workers / viable substitute",
      example: "AI tools are built to collaborate with human teachers rather than substitute for them.",
      exampleVi: "Các công cụ AI được tạo ra để cộng tác với giáo viên hơn là thay thế hoàn toàn họ."
    },
    {
      id: 40,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Breakthrough",
      ipa: "/ˈbreɪkθruː/",
      pos: "noun",
      meaning: "Bước đột phá mang tính cách mạng",
      collocation: "technological breakthrough / major scientific breakthrough",
      example: "The creation of large language models is considered a historic technological breakthrough.",
      exampleVi: "Sự ra đời của các mô hình ngôn ngữ lớn được coi là một bước đột phá công nghệ lịch sử."
    },
    {
      id: 41,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Revolutionize",
      ipa: "/ˌrevəˈluːʃənaɪz/",
      pos: "verb",
      meaning: "Cách mạng hóa, thay đổi hoàn toàn",
      collocation: "revolutionize industries / revolutionize healthcare",
      example: "Automated diagnosis systems are poised to revolutionize primary healthcare delivery.",
      exampleVi: "Các hệ thống chẩn đoán tự động sẵn sàng cách mạng hóa việc cung ứng dịch vụ y tế ban đầu."
    },
    {
      id: 42,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Ethical",
      ipa: "/ˈeθɪkl/",
      pos: "adjective",
      meaning: "Thuộc về đạo đức, hợp luân thường đạo lý",
      collocation: "ethical issues / ethical AI standards",
      example: "Tech companies must address severe ethical issues regarding data privacy and bias.",
      exampleVi: "Các công ty công nghệ phải giải quyết các vấn đề đạo đức nghiêm trọng về quyền riêng tư dữ liệu."
    },
    {
      id: 43,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Surveillance",
      ipa: "/sɜːˈveɪləns/",
      pos: "noun",
      meaning: "Sự giám sát, theo dõi an ninh",
      collocation: "surveillance camera / facial surveillance",
      example: "Government agencies install smart surveillance cameras to regulate urban traffic flow.",
      exampleVi: "Các cơ quan chính quyền lắp đặt camera giám sát thông minh để điều tiết luồng giao thông đô thị."
    },
    {
      id: 44,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Obsolete",
      ipa: "/ˈɒbsəliːt/",
      pos: "adjective",
      meaning: "Lỗi thời, không còn được sử dụng",
      collocation: "become obsolete / render skills obsolete",
      example: "Rapid automation could render manual record-keeping jobs completely obsolete.",
      exampleVi: "Tự động hóa nhanh chóng có thể khiến các công việc ghi chép sổ sách thủ công trở nên lỗi thời hoàn toàn."
    },
    {
      id: 45,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Malfunction",
      ipa: "/ˌmælˈfʌŋkʃn/",
      pos: "verb / noun",
      meaning: "Sự cố, hỏng hóc; trục trặc máy móc",
      collocation: "system malfunction / hardware malfunction",
      example: "Engineers designed redundant backup circuits in case the main sensor malfunctions.",
      exampleVi: "Các kỹ sư đã thiết kế mạch dự phòng trong trường hợp cảm biến chính gặp trục trặc."
    },
    {
      id: 46,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Manipulate",
      ipa: "/məˈnɪpjuleɪt/",
      pos: "verb",
      meaning: "Thao túng; xử lý, vận hành khéo léo",
      collocation: "manipulate data / manipulate images",
      example: "Cybercriminals can manipulate deepfake videos to deceive unsuspecting citizens.",
      exampleVi: "Tội phạm mạng có thể thao túng video giả mạo sâu (deepfake) để lừa gạt người dân nhẹ dạ."
    },
    {
      id: 47,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Transform",
      ipa: "/trænsˈfɔːm/",
      pos: "verb",
      meaning: "Biến đổi sâu sắc, chuyển đổi diện mạo",
      collocation: "transform society / transform industries",
      example: "Artificial intelligence has the immense power to transform global education forever.",
      exampleVi: "Trí tuệ nhân tạo có sức mạnh to lớn làm biến đổi nền giáo dục toàn cầu mãi mãi."
    },
    {
      id: 48,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Digitalize",
      ipa: "/ˈdɪdʒɪtəlaɪz/",
      pos: "verb",
      meaning: "Số hóa (dữ liệu, quy trình)",
      collocation: "digitalize records / digitalize administrative tasks",
      example: "The government launched an ambitious campaign to digitalize public administration.",
      exampleVi: "Chính phủ đã phát động chiến dịch tham vọng nhằm số hóa bộ máy hành chính công."
    },
    {
      id: 49,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Augment",
      ipa: "/ɔːɡˈment/",
      pos: "verb",
      meaning: "Gia tăng, tăng cường năng lực",
      collocation: "augment human intelligence / augment reality",
      example: "AI is best viewed as an augmentation tool that amplifies human creativity.",
      exampleVi: "AI nên được nhìn nhận là một công cụ tăng cường giúp nhân rộng sức sáng tạo của con người."
    },
    {
      id: 50,
      unit: 3,
      unitName: "Nhóm 3: Đạo Đức & Kỷ Nguyên Số",
      word: "Unprecedented",
      ipa: "/ʌnˈpresɪdentɪd/",
      pos: "adjective",
      meaning: "Chưa từng có tiền lệ, vô tiền khoáng hậu",
      collocation: "unprecedented speed / unprecedented growth",
      example: "The field of generative AI is expanding at an unprecedented speed worldwide.",
      exampleVi: "Lĩnh vực AI tạo sinh đang mở rộng với tốc độ chưa từng có tiền lệ trên toàn cầu."
    }
  ],

  // 2. CHUYÊN ĐỀ NGỮ PHÁP (3 MODULES CHUẨN THỂ SAI KHIẾN - CAUSATIVES)
  grammarModules: [
    {
      id: "gram1",
      title: "1. Thể Sai Khiến Chủ Động (Active Causatives: HAVE & GET)",
      focus: "Trọng tâm Unit 6 - Nhờ / Yêu cầu / Thuê ai đó làm gì cho mình",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 BẢN CHẤT: THỂ SAI KHIẾN CHỦ ĐỘNG
          </h4>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:16px;">
            Dùng khi chủ ngữ <strong>không tự tay làm</strong> mà nhờ vả, thuê mướn hoặc sai bảo một người khác thực hiện hành động.
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-bottom:20px;">
            <!-- HAVE CARD -->
            <div style="background:#eff6ff; border:2px solid #bfdbfe; border-radius:12px; padding:16px;">
              <div style="font-size:0.8rem; font-weight:800; color:#1e40af; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">
                CÔNG THỨC 1: ĐỘNG TỪ HAVE
              </div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:1.05rem; font-weight:700; color:#1d4ed8; background:white; padding:10px 14px; border-radius:8px; border:1px solid #93c5fd; margin-bottom:10px;">
                S + have + NGƯỜI + V-nguyên thể (bare inf)
              </div>
              <p style="font-size:0.85rem; color:#1e3a8a;">
                • Đi với tân ngữ chỉ người: <strong>have someone DO something</strong> (không có to).<br>
                • <em>Ví dụ:</em> The director <strong>had</strong> the technician <strong>upgrade</strong> the software.
              </p>
            </div>

            <!-- GET CARD -->
            <div style="background:#f0fdf4; border:2px solid #bbf7d0; border-radius:12px; padding:16px;">
              <div style="font-size:0.8rem; font-weight:800; color:#166534; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">
                CÔNG THỨC 2: ĐỘNG TỪ GET
              </div>
              <div style="font-family:'JetBrains Mono', monospace; font-size:1.05rem; font-weight:700; color:#15803d; background:white; padding:10px 14px; border-radius:8px; border:1px solid #86efac; margin-bottom:10px;">
                S + get + NGƯỜI + TO-V (infinitive with to)
              </div>
              <p style="font-size:0.85rem; color:#14532d;">
                • Đi với tân ngữ chỉ người: <strong>get someone TO DO something</strong> (bắt buộc có to).<br>
                • <em>Ví dụ:</em> She <strong>got</strong> the programmer <strong>to fix</strong> the algorithm error.
              </p>
            </div>
          </div>

          <div class="pitfall-box">
            <strong>⚠️ MẸO NHỚ THẦN TỐC TỪ THẦY THỨC:</strong>
            <p style="margin-top:6px; font-size:0.9rem;">
              • <strong>HAVE NGƯỜI ➔ V NGUYÊN MẪU</strong> (Have sb DO)<br>
              • <strong>GET NGƯỜI ➔ TO V</strong> (Get sb TO DO)<br>
              <em>*Câu thần chú:* "Have thì nguyên thể, Get thì thêm To!"</em>
            </p>
          </div>
        </div>
      `
    },
    {
      id: "gram2",
      title: "2. Thể Sai Khiến Bị Động (Passive Causatives: HAVE & GET + SOMETHING + V3/ED)",
      focus: "Trọng tâm Unit 6 - Cho cái gì được làm bởi người khác",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 BẢN CHẤT: THỂ SAI KHIẾN BỊ ĐỘNG
          </h4>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:16px;">
            Dùng khi ta muốn nhấn mạnh <strong>đồ vật / dịch vụ được hoàn thành</strong> bởi ai đó (thợ, chuyên gia, kỹ thuật viên) thay vì tự làm.
          </p>

          <div style="background:#fefce8; border:2px solid #fef08a; border-radius:12px; padding:18px; margin-bottom:20px;">
            <div style="font-size:0.85rem; font-weight:800; color:#854d0e; text-transform:uppercase; margin-bottom:8px;">
              CÔNG THỨC CHUNG CHO CẢ HAVE VÀ GET:
            </div>
            <div style="font-family:'JetBrains Mono', monospace; font-size:1.15rem; font-weight:800; color:#a16207; background:white; padding:12px 16px; border-radius:8px; border:1px solid #fde047; text-align:center;">
              S + have / get + VẬT (something) + V3/ed + (by someone)
            </div>
            <p style="font-size:0.88rem; color:#713f12; margin-top:12px;">
              💡 <strong>Lưu ý vàng:</strong> Khi tân ngữ đứng sau là <strong>VẬT (thiết bị, máy móc, ô tô, máy tính...)</strong>, cả <strong>HAVE</strong> và <strong>GET</strong> đều dùng <strong>V3/ed (Quá khứ phân từ)</strong>!
            </p>
          </div>

          <div style="overflow-x:auto;">
            <table class="modal-rules-table" style="width:100%; border-collapse:collapse; margin-bottom:16px;">
              <thead>
                <tr style="background:#f8fafc; text-align:left;">
                  <th style="padding:10px; border-bottom:2px solid #e2e8f0;">Câu chủ động thông thường</th>
                  <th style="padding:10px; border-bottom:2px solid #e2e8f0;">Chuyển sang Thể sai khiến bị động (HAVE / GET)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding:10px; border-bottom:1px solid #e2e8f0;">The mechanic repaired my autonomous car yesterday.</td>
                  <td style="padding:10px; border-bottom:1px solid #e2e8f0; color:#1d4ed8; font-weight:600;">➔ I <strong>had my autonomous car repaired</strong> by the mechanic yesterday.</td>
                </tr>
                <tr>
                  <td style="padding:10px; border-bottom:1px solid #e2e8f0;">A specialist is testing their cybersecurity system.</td>
                  <td style="padding:10px; border-bottom:1px solid #e2e8f0; color:#15803d; font-weight:600;">➔ They are <strong>getting their cybersecurity system tested</strong> by a specialist.</td>
                </tr>
                <tr>
                  <td style="padding:10px;">Students will install the AI application tomorrow.</td>
                  <td style="padding:10px; color:#a16207; font-weight:600;">➔ The school will <strong>have the AI application installed</strong> tomorrow.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    },
    {
      id: "gram3",
      title: "3. Động Từ Cầu Khiến Đặc Biệt & 4 Công Thức Viết Lại Câu Kinh Điển THPTQG",
      focus: "Mục tiêu 7+ THPTQG - Make, Let, Force, Allow & Biến Đổi Tương Đương",
      theoryHtml: `
        <div class="grammar-rule-card">
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:12px;">
            📌 MAKE, LET, FORCE, ALLOW & BẪY BỊ ĐỘNG KINH ĐIỂN
          </h4>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px; margin-bottom:20px;">
            <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:10px; padding:14px;">
              <strong style="color:#be123c;">1. MAKE (Bắt buộc ai làm gì)</strong><br>
              • Chủ động: <code>S + make + sb + V-inf</code><br>
              • <strong>BỊ ĐỘNG (BẪY THI):</strong> <code>Sb + be made + TO V</code><br>
              <em>Ví dụ:</em> The teacher made him rewrite the code. <br>
              ➔ He was made <strong>to rewrite</strong> the code.
            </div>

            <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:10px; padding:14px;">
              <strong style="color:#6d28d9;">2. LET (Cho phép ai làm gì)</strong><br>
              • Chủ động: <code>S + let + sb + V-inf</code><br>
              • Viết lại câu: <code>= S + allow / permit + sb + TO V</code><br>
              • Bị động: <code>Sb + be allowed / permitted + TO V</code><br>
              <em>Ví dụ:</em> Dad let me use the AI tool. <br>
              ➔ I was allowed <strong>to use</strong> the AI tool.
            </div>
          </div>

          <div class="transform-formula-box">
            <h5 style="color:#1e3a8a; font-weight:800; margin-bottom:8px;">
              ★ 4 CÔNG THỨC VIẾT LẠI CÂU BẤT HỦ TRONG ĐỀ THI TỐT NGHIỆP THPT:
            </h5>
            <ul style="font-size:0.9rem; line-height:1.7;">
              <li>
                <strong>Dạng 1 (Nhờ vả):</strong> S + asked / requested + sb + to-V <br>
                ➔ <code>S + had + sb + V-inf</code> = <code>S + got + sb + to-V</code>
              </li>
              <li>
                <strong>Dạng 2 (Dịch vụ sửa chữa):</strong> The technician repaired the computer for Nam. <br>
                ➔ <code>Nam had / got his computer repaired by the technician.</code>
              </li>
              <li>
                <strong>Dạng 3 (Bắt buộc ➔ Bị động):</strong> The company made employees attend AI training. <br>
                ➔ <code>Employees were made to attend AI training.</code>
              </li>
              <li>
                <strong>Dạng 4 (Cho phép ➔ Be allowed):</strong> They don't let visitors take photos inside the server room. <br>
                ➔ <code>Visitors aren't allowed to take photos inside the server room.</code>
              </li>
            </ul>
          </div>
        </div>
      `
    }
  ],

  // 3. COLLOCATION MATCHING PAIRS (8 CẶP NỐI TỪ CHỦ ĐỀ AI)
  collocationPairs: [
    { id: 1, verb: "interact with", noun: "AI chatbots naturally and fluently", meaning: "(tương tác tự nhiên với chatbot)" },
    { id: 2, verb: "analyse", noun: "massive datasets with high precision", meaning: "(phân tích tập dữ liệu lớn với độ chính xác cao)" },
    { id: 3, verb: "automate", noun: "routine and repetitive factory tasks", meaning: "(tự động hóa công việc lặp đi lặp lại)" },
    { id: 4, verb: "substitute for", noun: "human workers in dangerous environments", meaning: "(thay thế con người ở nơi nguy hiểm)" },
    { id: 5, verb: "facilitate", noun: "personalized self-paced learning for students", meaning: "(tạo điều kiện cho việc tự học cá nhân hóa)" },
    { id: 6, verb: "activate", noun: "the virtual assistant using voice commands", meaning: "(kích hoạt trợ lý ảo bằng giọng nói)" },
    { id: 7, verb: "have", noun: "the autonomous vehicle inspected by engineers", meaning: "(cho xe tự hành được kiểm tra kỹ thuật)" },
    { id: 8, verb: "revolutionize", noun: "modern healthcare and disease diagnosis", meaning: "(cách mạng hóa y tế và chẩn đoán bệnh)" }
  ],

  // 3B. ODD-ONE-OUT COLLOCATION (4 CÂU ĐỐ TÌM TỪ KHÔNG ĐI CÙNG ĐƯỢC)
  oddOneOut: [
    {
      id: 1,
      nounPhrase: "________ with users naturally and fluently",
      options: ["interact", "communicate", "converse", "activate"],
      wrongIndex: 3,
      explanation: "Chính xác! 'Interact / communicate / converse with' mang nghĩa tương tác/trò chuyện với ai. 'Activate' là ngoại động từ chỉ việc kích hoạt thiết bị (activate a device), không đi với 'with users'!"
    },
    {
      id: 2,
      nounPhrase: "capable of ________",
      options: ["analysing massive data", "processing complex tasks", "diagnosing diseases", "to programme robots"],
      wrongIndex: 3,
      explanation: "Chính xác! Cấu trúc đúng là 'capable OF + V-ing' (có khả năng làm gì). 'To programme' dùng to-V là sai ngữ pháp!"
    },
    {
      id: 3,
      nounPhrase: "have the computer ________ by an expert",
      options: ["repaired", "upgraded", "inspected", "repairing"],
      wrongIndex: 3,
      explanation: "Chính xác! Thể sai khiến bị động với vật có công thức: 'have + something + V3/ed'. Dùng 'repairing' là sai cấu trúc!"
    },
    {
      id: 4,
      nounPhrase: "get the technician ________ the AI software",
      options: ["to install", "to configure", "to update", "install"],
      wrongIndex: 3,
      explanation: "Chính xác! Thể sai khiến chủ động với GET yêu cầu: 'get someone + TO-V'. Nếu dùng động từ nguyên thể không to 'install' là sai quy tắc của GET!"
    }
  ],

  // 4. WORD FAMILY TREE (4 GỐC TỪ CỐT LÕI)
  wordFamilyRoots: [
    {
      id: 1,
      root: "CAPABLE",
      pos: "adjective",
      meaning: "có năng lực, có khả năng",
      derivatives: [
        { word: "capability", pos: "noun", vi: "khả năng, năng lực tiềm tàng" },
        { word: "incapable", pos: "adjective", vi: "không có khả năng, bất tài" },
        { word: "capably", pos: "adverb", vi: "một cách thành thạo, khéo léo" }
      ]
    },
    {
      id: 2,
      root: "AUTOMATE",
      pos: "verb",
      meaning: "tự động hóa",
      derivatives: [
        { word: "automation", pos: "noun", vi: "sự tự động hóa quy trình" },
        { word: "automated", pos: "adjective", vi: "được tự động hóa" },
        { word: "automatic", pos: "adjective", vi: "tự động (máy móc)" },
        { word: "automatically", pos: "adverb", vi: "một cách tự động" }
      ]
    },
    {
      id: 3,
      root: "RECOGNIZE",
      pos: "verb",
      meaning: "nhận diện, công nhận",
      derivatives: [
        { word: "recognition", pos: "noun", vi: "sự nhận diện, công nhận" },
        { word: "recognizable", pos: "adjective", vi: "có thể nhận ra được" },
        { word: "unrecognizable", pos: "adjective", vi: "không thể nhận ra" }
      ]
    },
    {
      id: 4,
      root: "INTELLIGENT",
      pos: "adjective",
      meaning: "thông minh, có trí tuệ",
      derivatives: [
        { word: "intelligence", pos: "noun", vi: "trí thông minh, trí tuệ" },
        { word: "intelligently", pos: "adverb", vi: "một cách thông minh" },
        { word: "unintelligent", pos: "adjective", vi: "kém thông minh" }
      ]
    }
  ],

  // 4B. OPEN CLOZE WORD FORMATION (5 CÂU ĐIỀN DẠNG ĐÚNG)
  openCloze: [
    {
      id: 1,
      sentence: "The manufacturing plant invested heavily to accelerate the _________ of its assembly lines. (AUTOMATE)",
      root: "AUTOMATE",
      expectedAnswer: "automation",
      explanation: "Sau mạo từ 'the' và trước giới từ 'of' cần một DANH TỪ chỉ 'sự tự động hóa' ➔ automation."
    },
    {
      id: 2,
      sentence: "Modern smartphones feature facial _________ systems to ensure maximum user security. (RECOGNIZE)",
      root: "RECOGNIZE",
      expectedAnswer: "recognition",
      explanation: "Cụm danh từ ghép 'facial recognition' mang nghĩa 'sự nhận diện khuôn mặt' ➔ recognition."
    },
    {
      id: 3,
      sentence: "This advanced neural model is _________ of translating spoken dialogue in real time. (CAPABILITY)",
      root: "CAPABILITY",
      expectedAnswer: "capable",
      explanation: "Sau to be 'is' và trước giới từ 'of' cần TÍNH TỪ 'capable' (cấu trúc be capable of doing sth) ➔ capable."
    },
    {
      id: 4,
      sentence: "Delivery drones are engineered to navigate _________ across busy metropolitan skies. (AUTONOMOUS)",
      root: "AUTONOMOUS",
      expectedAnswer: "autonomously",
      explanation: "Bổ nghĩa cho động từ hành động 'navigate' cần một TRẠNG TỪ chỉ cách thức ➔ autonomously."
    },
    {
      id: 5,
      sentence: "The virtual assistant responded _________ to the complex queries posed by the users. (INTELLIGENT)",
      root: "INTELLIGENT",
      expectedAnswer: "intelligently",
      explanation: "Bổ nghĩa cho động từ 'responded' cần một TRẠNG TỪ ➔ intelligently."
    }
  ],

  // 5. ACTIVE RECALL FIRST-LETTER CLUE (5 CÂU ĐOÁN CHỮ SIÊU TỐC)
  activeRecall: [
    {
      id: 1,
      sentence: "Testing a_____________ cars on public roads requires rigorous safety certification.",
      clue: "a",
      targetWord: "autonomous",
      ipa: "/ɔːˈtɒnəməs/",
      vi: "Tự hành, tự chủ",
      definition: "Having the freedom to act independently; self-driving vehicles operating without direct human control."
    },
    {
      id: 2,
      sentence: "The technician will r_____________ the malfunctioning drone before the next survey.",
      clue: "r",
      targetWord: "repair",
      ipa: "/rɪˈpeər/",
      vi: "Sửa chữa, khắc phục hư hỏng",
      definition: "To fix or mend something that is broken, damaged, or not functioning properly."
    },
    {
      id: 3,
      sentence: "Educational software helps f_____________ personalized self-paced learning for high school students.",
      clue: "f",
      targetWord: "facilitate",
      ipa: "/fəˈsɪlɪteɪt/",
      vi: "Tạo điều kiện thuận lợi",
      definition: "To make an action, process, or task possible or much easier to accomplish."
    },
    {
      id: 4,
      sentence: "The recommendation a_____________ suggests videos based on your past search history.",
      clue: "a",
      targetWord: "algorithm",
      ipa: "/ˈælɡərɪðəm/",
      vi: "Thuật toán",
      definition: "A set of mathematical instructions or computational rules followed to solve a problem or calculate an output."
    },
    {
      id: 5,
      sentence: "AI tools are designed to assist workers rather than s_____________ for them entirely.",
      clue: "s",
      targetWord: "substitute",
      ipa: "/ˈsʌbstɪtjuːt/",
      vi: "Thay thế",
      definition: "To use someone or something instead of another; to take the place of someone in a role."
    }
  ],

  // 6. INTERACTIVE SENTENCE WRITING (4 THỬ THÁCH ĐẶT CÂU CÓ THẨM ĐỊNH TỰ ĐỘNG)
  writingChallenges: [
    {
      id: 1,
      keyword: "had the robot repaired",
      prompt: "Hãy viết 1 câu hoàn chỉnh sử dụng thể sai khiến bị động với 'had' diễn tả: 'Kỹ sư đã cho sửa con robot ngày hôm qua'.",
      requiredWords: ["had", "robot", "repaired"],
      forbiddenWords: ["had the robot repair", "have the robot repair"],
      modelAnswer: "The engineer had the robot repaired yesterday."
    },
    {
      id: 2,
      keyword: "got his assistant to",
      prompt: "Hãy viết 1 câu sử dụng thể sai khiến chủ động với 'got' diễn tả: 'Giáo sư đã nhờ trợ lý của mình kích hoạt trợ lý ảo' (chú ý: sau got + someone phải có 'to').",
      requiredWords: ["got", "to activate"],
      forbiddenWords: ["got his assistant activate"],
      modelAnswer: "The professor got his assistant to activate the virtual assistant."
    },
    {
      id: 3,
      keyword: "capable of",
      prompt: "Hãy viết 1 câu khen ngợi: 'Hệ thống AI này có khả năng phân tích dữ liệu lớn trong vài giây' sử dụng 'capable of' (chú ý: sau capable of dùng V-ing).",
      requiredWords: ["capable of", "analysing"],
      forbiddenWords: ["capable to", "capable of analyse"],
      modelAnswer: "This AI system is capable of analysing massive data in seconds."
    },
    {
      id: 4,
      keyword: "interact with",
      prompt: "Hãy viết 1 câu diễn tả: 'Học sinh có thể tương tác với giáo viên AI mọi lúc mọi nơi' sử dụng cụm 'interact with'.",
      requiredWords: ["interact with"],
      forbiddenWords: ["interact to", "interact at"],
      modelAnswer: "Students can interact with AI tutors anytime and anywhere."
    }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = LECTURE_DATA;
}
