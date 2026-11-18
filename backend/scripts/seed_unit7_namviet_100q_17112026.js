#!/usr/bin/env node

/**
 * SEED SCRIPT: 100-QUESTION PRACTICE ASSESSMENT & NEW CARD FOR NAM VIỆT (17/11/2026)
 * Unit 7: The World of Mass Media - 20 New Vocabularies & Adverbial Clauses of Manner and Result
 * Thầy Thức - Tiếng Anh 12 (Global Success)
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: 'd76bd9d6-6cf5-409c-847b-b0e5c07a0876', // Bạn Nam Việt (Lớp 12)
  SUBJECT_ID: 'a15d4b19-412a-4bff-acd5-86714381b7af', // ENG_12
  ASSIGNED_DATE: new Date('2026-11-17T00:00:00.000Z')
};

// 20 NEW VOCABULARY WORDS FROM SGK (p.90-98) & SBT (p.81-91)
const VOCAB_TABLE_MARKDOWN = `
| STT | Từ vựng | Phiên âm IPA | Từ loại | Nghĩa tiếng Việt | Cụm từ thông dụng (Collocations) | Phân tích & Lưu ý thi THPTQG |
| :---: | :--- | :--- | :---: | :--- | :--- | :--- |
| **1** | **Leaflet** | \`/ˈliːflət/\` | n. | Tờ rơi quảng cáo, tờ bướm | *distribute leaflets, hand out leaflets* | Thường dùng cho các chiến dịch từ thiện, sự kiện nhỏ hoặc giới thiệu dịch vụ địa phương (SGK tr.88, 94; SBT tr.82). |
| **2** | **Billboard** | \`/ˈbɪlbɔːd/\` | n. | Biển quảng cáo ngoài trời khổ lớn | *digital billboard, advertise on billboards* | Biển quảng cáo đặt tại ngã tư, bên đường cao tốc hoặc các tòa nhà cao tầng (SGK tr.88; SBT tr.81, 82). |
| **3** | **Advert** | \`/ˈædvɜːt/\` | n. | Mẩu quảng cáo, mẩu tin quảng cáo | *place an advert in a newspaper, online advert* | Từ viết tắt thông dụng trong tiếng Anh - Anh của *advertisement*. Đi với động từ **place an advert** (đăng quảng cáo) (SGK tr.88; SBT tr.82). |
| **4** | **Printing press** | \`/ˈprɪntɪŋ pres/\` | n. phr. | Máy in cơ học, xưởng in báo | *invention of the printing press, modern printing press* | Phát minh vĩ đại của Gutenberg năm 1453 giúp sách báo được in hàng loạt, giá rẻ và phổ biến rộng rãi (SBT tr.86). |
| **5** | **Target customer** | \`/ˌtɑːɡɪt ˈkʌstəmə/\` | n. phr. | Khách hàng mục tiêu | *reach target customers, identify target customers* | Nhóm đối tượng khách hàng mà một chiến dịch truyền thông hoặc quảng cáo nhắm tới (SGK tr.92). |
| **6** | **Presence** | \`/ˈprezns/\` | n. | Sự hiện diện, tầm ảnh hưởng (trên MXH) | *social media presence, build an online presence* | Cụm từ hay thi: **have / build a social media presence** (tạo dựng độ nhận diện/ảnh hưởng trên mạng xã hội) (SGK tr.89; SBT tr.82). |
| **7** | **Interactive** | \`/ˌɪntərˈæktɪv/\` | adj. | Có tính tương tác hai chiều | *interactive media, interactive shopping, interactive features* | Xuất phát từ động từ *interact (with)*. Truyền thông số cho phép người dùng bình luận, đặt câu hỏi tức thì nên mang tính *interactive* (SGK tr.92; SBT tr.82). |
| **8** | **Accessible** | \`/əkˈsesəbl/\` | adj. | Dễ tiếp cận, có thể truy cập được | *freely accessible, accessible to everyone* | Đi với giới từ **TO** (*accessible to sb*). Trái nghĩa là *inaccessible*. Danh từ là *accessibility* (SGK tr.92; SBT tr.83). |
| **9** | **Distribute** | \`/dɪˈstrɪbjuːt/\` | v. | Phân phát, phân phối thông tin / ấn phẩm | *distribute news, distribute leaflets* | Trọng âm rơi vào âm tiết thứ 2. Danh từ là *distribution* (SGK tr.92; SBT tr.82: *distribute these leaflets*). |
| **10** | **Instant** | \`/ˈɪnstənt/\` | adj. | Tức thì, ngay lập tức | *instant access, instant feedback* | Đồng nghĩa với *immediate*. Truyền thông trực tuyến cung cấp tin tức và phản hồi tức thì (SBT tr.81, 82; SGK tr.92). |
| **11** | **Fake news** | \`/ˌfeɪk ˈnjuːz/\` | n. phr. | Tin giả, tin tức bịa đặt sai sự thật | *spread fake news, combat fake news* | Danh từ *news* không đếm được, chia động từ số ít (*Fake news is...*), không dùng "a fake news" (SGK tr.90, 95; SBT tr.82, 83). |
| **12** | **Fact-check** | \`/ˈfækt tʃek/\` | v., n. | Kiểm chứng sự thật, xác minh tin tức | *fact-check a story, fact-checking practices* | Hành động kiểm tra tính xác thực của thông tin trước khi tin hoặc chia sẻ (SGK tr.92; SBT tr.89). |
| **13** | **Credible** | \`/ˈkredəbl/\` | adj. | Đáng tin cậy, có căn cứ xác thực | *credible source of news, highly credible* | Đồng nghĩa với *trustworthy / reliable*. Trái nghĩa là *incredible* (khó tin). Danh từ là *credibility* (SGK tr.92; SBT tr.83, 86). |
| **14** | **Viewer** | \`/ˈvjuːə(r)/\`/ | n. | Khán giả truyền hình, người xem video | *television viewers, attract millions of viewers* | Phân biệt: *viewer* (người xem TV/video), *listener* (người nghe đài), *reader* (độc giả đọc báo) (SGK tr.88, 89; SBT tr.82). |
| **15** | **Audiovisual** | \`/ˌɔːdiəʊˈvɪʒuəl/\` | adj. | Thuộc nghe nhìn (kết hợp cả âm thanh và hình ảnh) | *audiovisual content, audiovisual presentation* | Kết hợp giữa *audio* (âm thanh) và *visual* (hình ảnh), đặc trưng lớn nhất của truyền hình và video trực tuyến (SBT tr.82, 86, 89). |
| **16** | **Here to stay** | \`/hɪə tə steɪ/\` | idiom | Tồn tại lâu dài, là một phần tất yếu | *traditional media is here to stay* | Thành ngữ chỉ một điều gì đó đã ăn sâu vào đời sống và sẽ tiếp tục tồn tại dù có công nghệ mới xuất hiện (SGK tr.92, 93). |
| **17** | **Literacy** | \`/ˈlɪtərəsi/\` | n. | Sự biết chữ, khả năng đọc viết, học vấn | *promote literacy, media literacy* | Sự ra đời của máy in đã thúc đẩy *literacy* trong xã hội. Trái nghĩa là *illiteracy* (nạn mù chữ) (SBT tr.86). |
| **18** | **Account for** | \`/əˈkaʊnt fɔː/\` | phr. v. | Chiếm (tỷ lệ, phần trăm) | *account for 70 per cent, account for the majority* | Cụm động từ cực kỳ hay gặp trong bài thi đọc hiểu và mô tả biểu đồ tròn (SBT tr.82, 87). |
| **19** | **As opposed to** | \`/əz əˈpəʊzd tuː/\` | prep. phr. | Trái ngược với, thay vì | *printed papers as opposed to online news* | Dùng để so sánh sự đối lập giữa hai đối tượng, sau đó là danh từ hoặc V-ing (SGK tr.96; SBT tr.82). |
| **20** | **Reluctant** | \`/rɪˈlʌktənt/\` | adj. | Ngần ngại, do dự, không sẵn lòng | *reluctant to change, reluctant to use* | Cấu trúc: **reluctant to do sth**. Đồng nghĩa với *hesitant*, trái nghĩa với *willing* (SBT tr.91). |
`;

// FULL LECTURE MARKDOWN
const LECTURE_MARKDOWN = `# 🌟 Cẩm Nang Tri Thức & 20 Từ Vựng Mới Unit 7: The World of Mass Media
**Biên soạn riêng cho Bạn Nam Việt (Lớp 12 - Mục tiêu 7+ THPTQG) • Hướng dẫn: Thầy Thức**

Chuyên đề: **Unit 7: The World of Mass Media (SGK Global Success Trang 90 - 98 & SBT Trang 81 - 91)**  
Ngày học: **17/11/2026**

[🚀 MỞ PHÒNG HỌC TƯƠNG TÁC TOÀN MÀN HÌNH](/lectures/eng12-unit7-card2/index.html)

---

## 🎯 PHẦN 1: BẢNG 20 TỪ VỰNG CỐT LÕI (MỚI & KHÔNG TRÙNG CARD 11/11)

Dưới đây là 20 từ vựng cốt lõi mới được chọn lọc trực tiếp từ các bài đọc, hội thoại và bài tập trong SGK (trang 90-98) và SBT (trang 81-91):

${VOCAB_TABLE_MARKDOWN}

---

## ⚡ PHẦN 2: NGỮ PHÁP TRỌNG TÂM UNIT 7 (NGẮN GỌN & BÁM SÁT SÁCH)

Ngữ pháp Unit 7 gồm hai nội dung chính: **Mệnh đề trạng ngữ chỉ cách thức (Manner)** và **Mệnh đề trạng ngữ chỉ kết quả (Result)**. Dưới đây là tóm tắt ngắn gọn, dễ hiểu kèm bài tập nhanh Quick Check Drills để con làm chủ ngay:

---

### 📖 CHUYÊN ĐỀ 1: MỆNH ĐỀ TRẠNG NGỮ CHỈ CÁCH THỨC (ADVERBIAL CLAUSES OF MANNER)

#### 1. Định nghĩa & Liên từ nối: AS, JUST AS, LIKE
Mệnh đề chỉ cách thức giải thích **hành động được làm như thế nào (HOW)**.
- **as** (như là / theo như): Dùng trong văn phong trang trọng, nói về sự thật, chỉ dẫn hoặc thói quen.  
  *Ví dụ (SBT tr.84 câu 14):* Millions of people attended the event **as we had expected**. *(Hàng triệu người đã tham dự đúng như chúng tôi dự đoán).*
- **just as** (đúng như / hệt như): Nhấn mạnh sự giống hệt.  
  *Ví dụ:* Mai designed the promotional poster **just as** her teacher instructed.
- **like** (giống như): Dùng trong văn nói thân mật.  
  *Ví dụ (SGK tr.89):* I don't have a big social media presence **like you do**.

#### 2. Cấu trúc giả định với "AS IF / AS THOUGH" (Như thể là)
Cần phân biệt 3 tình huống rõ ràng:
1. **Tình huống có thật (hoặc rất có thể là thật):**  
   Chia thì bình thường theo ngữ cảnh:  
   - *Look at the dark clouds! It looks **as if it is going to rain**.* *(Nhìn mây đen kìa, trông như trời sắp mưa thật).*
2. **Giả định TRÁI HIỆN TẠI (Unreal Present):**  
   Lùi về **Quá khứ đơn ($V_{2/ed}$)**. Riêng động từ \`to be\` **luôn dùng \`WERE\` cho tất cả các ngôi** (kể cả I, he, she, it)!  
   $$\\mathbf{S + V(hiện\\ tại) + as\\ if / as\\ though + S + were / V_{2/ed}}$$  
   - *Ví dụ SGK tr.88:* We can't promote the show **as if it were a big profit-making event**. *(Thực tế sự kiện phi lợi nhuận).*  
   - *Ví dụ SGK tr.91:* He is acting **as if he were my father**. *(Thực tế anh ta không phải cha tôi).*  
   - *Ví dụ SBT tr.84:* She acts **as if she were happy**, but in fact she is sad.
3. **Giả định TRÁI QUÁ KHỨ (Unreal Past):**  
   Lùi về **Quá khứ hoàn thành ($\\mathbf{had + V_{3/ed}}$)**:  
   $$\\mathbf{S + V + as\\ if / as\\ though + S + had + V_{3/ed}}$$  
   - *Ví dụ SBT tr.84 câu 5:* Despite the incident, the actor continued **as if nothing had happened**. *(Diễn viên diễn tiếp như thể chẳng có gì xảy ra).*  
   - *Ví dụ SBT tr.84 câu 15:* Stop eating so quickly **as if you hadn't eaten for days**.

#### ✍️ Quick Check Drills (Mệnh đề chỉ cách thức):
1. She talks loudly on the phone as if no one else ______ in the room. (A. is / B. were / C. will be / D. has been)  
   ➔ **Đáp án: B. were** *(Thực tế có người trong phòng, giả định trái hiện tại dùng were).*
2. The injured reporter talked in front of the camera as if the pain ______ him at all. (A. hadn't affected / B. doesn't affect / C. won't affect / D. hasn't affected)  
   ➔ **Đáp án: A. hadn't affected** *(Cơn đau xảy ra trong quá khứ, giả định trái quá khứ lùi về had + V3).*
3. Look at those heavy black clouds! It looks as if it ______ soon. (A. rained / B. is going to rain / C. were raining / D. had rained)  
   ➔ **Đáp án: B. is going to rain** *(Có dấu hiệu mắt thấy mây đen ➔ tình huống có thật ở hiện tại/tương lai).*

---

### 📖 CHUYÊN ĐỀ 2: MỆNH ĐỀ TRẠNG NGỮ CHỈ KẾT QUẢ (ADVERBIAL CLAUSES OF RESULT)

Dùng để chỉ kết quả của một hành động hay sự việc với nghĩa: **quá ... đến nỗi mà**.

#### 1. Cấu trúc với "SO ... THAT"
- Đi với Tính từ: $\\mathbf{S + be + so + adj + that + S + V}$  
  *Ví dụ:* The news was **so shocking that** everyone stopped talking.
- Đi với Trạng từ: $\\mathbf{S + V + so + adv + that + S + V}$  
  *Ví dụ:* The post spread **so quickly that** thousands of people saw it in minutes.
- Đi với Danh từ số nhiều: $\\mathbf{S + V + so\\ many/few + Plural\\ N + that + S + V}$  
  *Ví dụ (SGK tr.88):* There are **so many posters that** viewers may not notice ours.
- Đi với Danh từ không đếm được: $\\mathbf{S + V + so\\ much/little + Uncountable\\ N + that + S + V}$  
  *Ví dụ (SGK tr.91):* There is **so much information that** people get confused.

#### 2. Cấu trúc với "SUCH ... THAT"
Khác với \`SO\`, sau \`SUCH\` **bắt buộc phải có Danh từ (Noun)**:
- Danh từ số ít đếm được: $\\mathbf{S + V + such + a/an + adj + N(số\\ ít) + that + S + V}$  
  *Ví dụ (SGK tr.91):* The Internet is **such a powerful tool that** it connects people globally.  
  *Ví dụ (SBT tr.84):* Email advertising has become **such a powerful tool that** all businesses use it.
- Danh từ số nhiều hoặc không đếm được: $\\mathbf{S + V + such + adj + N + that + S + V}$ (tuyệt đối không dùng a/an)  
  *Ví dụ (SGK tr.89):* Social media sites are **such popular tools that** everybody uses them.  
  *Ví dụ (SBT tr.84):* There is **such a wide range of media** nowadays that choosing is difficult.

#### ✍️ Quick Check Drills (Mệnh đề chỉ kết quả):
1. Smartphones have become ______ popular that even small children use them daily. (A. such / B. so / C. too / D. very)  
   ➔ **Đáp án: B. so** *(Sau đó là tính từ 'popular' đứng một mình trước 'that').*
2. It was ______ an informative article that I shared it with my classmates. (A. so / B. such / C. very / D. too)  
   ➔ **Đáp án: B. such** *(Trước cụm danh từ số ít 'an informative article' bắt buộc dùng such).*
3. There were ______ advertisements during the film that I turned off the television. (A. so much / B. so many / C. such / D. such many)  
   ➔ **Đáp án: B. so many** *(Advertisements là danh từ số nhiều đếm được).*

---

### 📝 CHUYÊN ĐỀ 3: CÁC DẠNG BÀI VIẾT LẠI CÂU KINH ĐIỂN THI THPTQG

#### 1. Đổi giữa SO ... THAT $\\longleftrightarrow$ SUCH ... THAT
- Công thức: $S + be + \\mathbf{so + adj} + that... \\longleftrightarrow It + be + \\mathbf{such + a/an + adj + N} + that...$  
  *Ví dụ (SBT tr.90):*  
  Smartphones are **so common** that everyone seems to have one.  
  ➔ They are **such common devices** that everyone seems to have one.

#### 2. Đổi từ Sự thật (In fact / Actually) $\\longrightarrow$ Câu giả định AS IF + WERE
- Công thức: Nếu sự thật hiện tại mang nghĩa phủ định (*In fact, S + is/are not...*), khi viết lại với \`as if\` ta dùng động từ \`were\` cho mọi ngôi.  
  *Ví dụ (SBT tr.89 câu 4):*  
  We are not close friends. However, he is asking me a lot of personal questions.  
  ➔ He is asking me a lot of personal questions **as if we were close friends**.

---

## 💡 LỜI DẶN DÒ TỪ THẦY THỨC DÀNH CHO NAM VIỆT

Chào Nam Việt,

Hôm nay con bước vào bài học ngày **17/11/2026** với chuyên đề **Unit 7: The World of Mass Media**. Thầy đã biên soạn cho con:
1. **20 từ vựng cốt lõi mới** (hoàn toàn không trùng với bài 11/11), bám sát các trang SGK và SBT.
2. **Cẩm nang ngữ pháp ngắn gọn, dễ hiểu** về Mệnh đề chỉ cách thức (*as if/were*) và Mệnh đề chỉ kết quả (*so/such...that*).
3. **Phòng học tương tác Flashcard 3D** với phát âm giọng bản xứ và trò chơi phản xạ từ vựng.
4. **Đấu trường 100 câu trắc nghiệm tại lớp:**
   - 32 câu đầu tiên là toàn bộ từ vựng mới học (được xếp lên đầu đúng nguyện vọng của con).
   - 18 câu chia từ loại (Word Formation) giúp con thành thạo nhận diện Danh từ, Động từ, Tính từ, Trạng từ.
   - 20 câu ngữ pháp trọng tâm *So/Such...that* và *As if/were*.
   - 15 câu đọc hiểu và điền từ bám sát bài thi THPTQG.
   - 15 câu viết lại câu và trắc nghiệm câu đồng nghĩa.
   - Toàn bộ từ ngữ ngữ cảnh trong câu hỏi đều là từ cơ bản (basic A1-A2/B1), ngắn gọn và rõ ràng.

Con hãy bấm vào nút **[Mở phòng học tương tác](/lectures/eng12-unit7-card2/index.html)** để ôn tập thẻ từ vựng trước, sau đó bước vào Đấu trường 100 câu luyện tập để bứt phá điểm số nhé!
`;

async function main() {
  console.log(`🚀 Bắt đầu quá trình tạo mới Card học ngày 17/11/2026 cho Bạn Nam Việt (${CONSTANTS.STUDENT_ID})...`);

  // 1. Đọc bộ câu hỏi đã sinh và kiểm chứng
  const questionsPath = path.resolve(__dirname, 'questions_data_100.json');
  if (!fs.existsSync(questionsPath)) {
    throw new Error(`Tệp questions_data_100.json không tồn tại! Vui lòng chạy generate_questions.js trước.`);
  }
  const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
  console.log(`📋 Đã tải ${questions.length} câu hỏi đạt chuẩn 100%.`);

  // 2. Tạo Learning Unit mới
  console.log(`📝 Đang tạo Learning Unit mới...`);
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: "Unit 7: The World of Mass Media - 20 Từ Vựng Mới (SGK Trang 90-98 & SBT Trang 81-91) & Mệnh Đề Chỉ Cách Thức, Kết Quả",
      description: "Chuyên đề Unit 7 Tiếng Anh 12: Làm chủ 20 từ vựng cốt lõi mới (không trùng bài 11/11), nắm chắc Mệnh đề trạng ngữ chỉ cách thức (as, just as, like, as if/were), Mệnh đề chỉ kết quả (so/such...that) và đấu trường 100 câu luyện tập bứt phá 7+ THPTQG.",
      lecture_content_markdown: LECTURE_MARKDOWN,
      is_template: true
    }
  });
  console.log(`✅ Đã tạo Learning Unit ID: ${learningUnit.id}`);

  // 3. Tạo Daily Student Assignment mới cho ngày 17/11/2026
  console.log(`📅 Đang tạo Daily Student Assignment cho ngày 17/11/2026...`);
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: learningUnit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: CONSTANTS.ASSIGNED_DATE,
      custom_session_minutes: 90,
      teacher_daily_note: "Thầy Thức dặn Nam Việt: Hôm nay con bước vào bài học ngày 17/11/2026 với chuyên đề Unit 7: The World of Mass Media. Thầy đã biên soạn cho con 20 từ vựng mới toanh (không trùng bài 11/11), cẩm nang ngữ pháp ngắn gọn bám sát sách và Đấu trường 100 câu luyện tập toàn diện (32 câu từ vựng đưa lên đầu, 18 câu word form, 20 câu ngữ pháp, 15 câu đọc hiểu và 15 câu viết lại câu). Con hãy mở phòng học tương tác ôn thẻ 3D trước rồi vào làm bài tập nhé!",
      is_published: true
    }
  });
  console.log(`✅ Đã tạo Assignment ID: ${assignment.id}`);

  // 4. Tạo Assessment (100 câu, 90 phút, 10 điểm)
  console.log(`🎯 Đang tạo Assessment...`);
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      title: "Đấu Trường 100 Câu Luyện Tập Chuyên Sâu: Unit 7 - The World of Mass Media (20 Từ Vựng Mới & Ngữ Pháp Trọng Tâm)",
      type: "IN_SESSION_90M",
      time_limit_minutes: 90,
      max_score: 10.00
    }
  });
  console.log(`✅ Đã tạo Assessment ID: ${assessment.id}`);

  // 5. Chuẩn bị 100 câu hỏi
  const pointsPerQuestion = 10.0 / questions.length; // 0.10 điểm / câu
  const questionRecords = questions.map((q, idx) => ({
    assessment_id: assessment.id,
    order_index: idx + 1,
    type: 'MULTIPLE_CHOICE',
    points: pointsPerQuestion,
    question_payload: {
      content_markdown: q.content,
      options: q.options,
      correct_option_id: q.correctAnswer,
      section_name: q.sectionName
    },
    grading_key_payload: {
      correct_option_id: q.correctAnswer,
      explanation_markdown: q.explanation || 'Đáp án chính xác được Thầy Thức biên soạn.'
    }
  }));

  console.log(`📥 Đang nạp 100 câu hỏi vào bảng questions...`);
  await prisma.questions.createMany({
    data: questionRecords
  });

  const verifiedCount = await prisma.questions.count({
    where: { assessment_id: assessment.id }
  });
  console.log(`✅ Đã nạp thành công ${verifiedCount}/100 câu hỏi vào database!`);

  // 6. Tạo Assessment Attempt ở trạng thái NOT_STARTED
  console.log(`⏳ Đang tạo Assessment Attempt (NOT_STARTED)...`);
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: CONSTANTS.STUDENT_ID,
      status: 'NOT_STARTED',
      total_score: 0.0
    }
  });
  console.log(`✅ Đã tạo Assessment Attempt ID: ${attempt.id}`);

  console.log(`\n🎉🎉🎉 HOÀN THÀNH TẠO CARD MỚI 17/11/2026 CHO BẠN NAM VIỆT!`);
  console.log(`- Assignment ID: ${assignment.id}`);
  console.log(`- Learning Unit ID: ${learningUnit.id}`);
  console.log(`- Assessment ID: ${assessment.id}`);
  console.log(`- Số câu hỏi: ${verifiedCount} câu`);
  console.log(`- Link bài giảng tương tác: /lectures/eng12-unit7-card2/index.html`);
  console.log(`- Link làm bài tập: /student/mission/${attempt.id}`);
}

main()
  .catch(err => {
    console.error("❌ Lỗi khi seed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
