#!/usr/bin/env node

/**
 * SEED SCRIPT: UNIT 5 LECTURE & 80-QUESTION ASSESSMENT FOR THÁI (19/11/2026)
 * Thầy Thức - Tiếng Anh 11 (Global Success - Unit 5: Global Warming)
 * Trọng tâm: 6 Chuyên Đề Mệnh Đề Phân Từ (Participle Clauses) + Quick Check Drills + 80 Câu Trắc Nghiệm Chuẩn 5 Quy Tắc Vàng
 */

const fs = require('fs');
const path = require('path');

let PrismaClient;
try {
  ({ PrismaClient } = require('@prisma/client'));
} catch (e) {
  ({ PrismaClient } = require('/home/dantey/Dantey/teaching/teachingPlatform/backend/node_modules/@prisma/client'));
}

const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '9208f557-3288-442e-accf-15fc8c763e68', // Bạn Thái (Lớp 11)
  SUBJECT_ID: 'f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0', // ENG_11
  ASSIGNED_DATE: new Date('2026-11-19T00:00:00.000Z'),
  TOTAL_QUESTIONS: 80,
  TIME_LIMIT_MINUTES: 90,
  MAX_SCORE: 10.00
};

function getSectionName(index) {
  if (index <= 20) {
    return 'Phần 1: Mệnh đề phân từ hiện tại (Present Participle Clauses - V-ing)';
  } else if (index <= 35) {
    return 'Phần 2: Từ vựng cốt lõi Unit 5 trong ngữ cảnh (Core Vocabulary in Context)';
  } else if (index <= 45) {
    return 'Phần 3: 10 Câu Biến đổi từ loại (Word Formation: Noun - Adj - Adv - Verb)';
  } else if (index <= 60) {
    return 'Phần 4: Mệnh đề phân từ quá khứ (V3/ed) & Phân từ hoàn thành (Having V3)';
  } else if (index <= 70) {
    return 'Phần 5: Phân hóa 8.5+ - Bẫy Phân từ lơ lửng & Rút gọn cùng chủ ngữ (Dangling Participles)';
  } else {
    return 'Phần 6: Tìm lỗi sai & Viết lại câu tương đương (Error Identification & Transformations)';
  }
}

const LECTURE_CONTENT_MARKDOWN = `# 🌟 Cẩm Nang Ngữ Pháp Toàn Diện & 24 Từ Vựng Trọng Tâm Unit 5: Global Warming
**Biên soạn riêng cho: Bạn Thái (Lớp 11) • Hướng dẫn: Thầy Thức**

Chuyên đề: **Participle Clauses (Mệnh Đề Phân Từ Hiện Tại & Quá Khứ) & Hệ Thống Bài Tập Nhanh Phản Xạ 8.5+**  
Mục tiêu: **Chinh phục điểm 8.5+ Kì thi Giữa kì & Kì thi Tốt nghiệp THPT Quốc Gia**

[🚀 MỞ PHÒNG HỌC TƯƠNG TÁC TOÀN MÀN HÌNH](/lectures/eng11-unit5/index.html)

---

## 🎯 PHẦN I: BẢN ĐỒ TRI THỨC NGỮ PHÁP UNIT 5 (PARTICIPLE CLAUSES - MỆNH ĐỀ PHÂN TỪ)

### 1. Bản chất ngôn ngữ của Mệnh đề phân từ (What is a Participle Clause?)
- **Định nghĩa:** Là dạng **rút gọn mệnh đề phụ** (chỉ nguyên nhân, thời gian, điều kiện hoặc mệnh đề quan hệ) bằng cách biến đổi động từ chính thành **Hiện tại phân từ ($V\\text{-ing}$)** hoặc **Quá khứ phân từ ($V_3/V_{ed}$)**.
- **Mục đích:** Giúp câu văn cô đọng, súc tích, nâng cao tính học thuật (Academic English) trong bài đọc hiểu và bài viết luận.
- **ĐIỀU KIỆN TIÊN QUYẾT BẮT BUỘC:** 
  $$\\mathbf{Chủ\\ ngữ\\ của\\ mệnh\\ đề\\ phân\\ từ\\ PHẢI\\ TRÙNG\\ với\\ chủ\\ ngữ\\ của\\ mệnh\\ đề\\ chính\\ (S_1 = S_2)}$$
  *Nếu vi phạm quy tắc này, câu sẽ rơi vào bẫy lỗi kinh điển "Dangling Participle" (Phân từ lơ lửng).*

---

## ⚡ PHẦN II: 6 CHUYÊN ĐỀ NGỮ PHÁP CHUYÊN SÂU & BÀI TẬP NHANH VẬN DỤNG (QUICK CHECK DRILLS)

---

### 📌 CHUYÊN ĐỀ 1: MỆNH ĐỀ PHÂN TỪ HIỆN TẠI (V-ING) CHỈ NGUYÊN NHÂN & LÝ DO

Khi muốn rút gọn mệnh đề phụ chỉ nguyên nhân mang nghĩa **CHỦ ĐỘNG**:

$$\\mathbf{Because / Since / As + S + V_{\\text{chủ động}} \\iff V\\text{-ing} + (O),\\ S + V_{\\text{chính}}}$$

#### 1. Quy tắc cốt lõi:
- Lược bỏ liên từ chỉ nguyên nhân (*Because, Since, As*) và chủ ngữ $S$.
- Đưa động từ về nguyên mẫu rồi thêm đuôi **\`-ing\`**.
- **Dạng phủ định:** Thêm trực tiếp **\`NOT\`** ngay trước V-ing: $\\mathbf{Not + V\\text{-ing} + (O),\\ S + V}$.

#### 2. Ví dụ thực chiến chủ đề Global Warming:
- **Ví dụ 1:** **Trapping** too much of the sun's heat, greenhouse gases cause global temperatures to rise.  
  *(Vì giữ quá nhiều nhiệt lượng từ mặt trời, khí nhà kính làm nhiệt độ toàn cầu tăng lên.)*  
  *Phân tích:* Chủ ngữ của *Trapping* chính là *greenhouse gases*.
- **Ví dụ 2:** **Not understanding** how to calculate his carbon footprint, Nam asked his teacher for help.  
  *(Vì không biết cách tính dấu chân carbon, Nam đã nhờ giáo viên giúp đỡ.)*

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 1)

**Câu 1.1:** ______ the severe consequences of global warming, many governments agreed to cut coal power.  
A. Realized  
B. Realizing  
C. To realize  
D. Realize  

**Câu 1.2:** Tìm và sửa lỗi sai trong câu sau:  
*Not know (A) how to recycle plastic waste (B), the villagers burnt (C) it in the open field (D).*  

**Câu 1.3:** Viết lại câu sau dùng Mệnh đề phân từ hiện tại:  
*Because Vietnam has a long coastline, it is vulnerable to sea level rise.*  
➔ Having ..........................................................................................................  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 1:
> - **Câu 1.1: Chọn B (Realizing).** Mệnh đề nguyên nhân mang nghĩa chủ động ('Vì nhận thức được...') ➔ rút gọn thành *Realizing*.
> - **Câu 1.2: Lỗi sai ở (A) Not know ➔ Sửa thành: Not knowing.** Phủ định của phân từ hiện tại là *Not + V-ing*.
> - **Câu 1.3: Đáp án:** *Having a long coastline, Vietnam is vulnerable to sea level rise.*

---

### 📌 CHUYÊN ĐỀ 2: MỆNH ĐỀ PHÂN TỪ HIỆN TẠI (V-ING) CHỈ THỜI GIAN & HÀNH ĐỘNG ĐỒNG THỜI

Khi muốn diễn đạt hai hành động xảy ra cùng lúc hoặc liên tiếp của cùng một chủ thể:

$$\\mathbf{While / When + S + V \\iff V\\text{-ing},\\ S + V}$$

#### 1. Quy tắc cốt lõi:
- Hành động diễn ra đồng thời: *Walking on the beach, they picked up plastic litter.*
- Hành động nối tiếp ngay lập tức: *Seeing the smoke rising from the forest, the ranger called for help.*
- **Lưu ý đặc biệt:** Tuyệt đối **không dùng trợ động từ was/were** trong mệnh đề phân từ (VD: ❌ *Was walking on the beach, I saw...* ➔ Sửa thành: ✅ *Walking on the beach, I saw...*).

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 2)

**Câu 2.1:** Walking along the local river, the high school volunteers ______ hundreds of dirty plastic bags.  
A. picking up  
B. picked up  
C. were picked up  
D. to pick up  

**Câu 2.2:** Tìm và sửa 01 lỗi sai:  
*Was walking (A) through the pine forest (B), the eco-tourists noticed (C) several fallen trees (D).*  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 2:
> - **Câu 2.1: Chọn B (picked up).** Mệnh đề chính cần một vị ngữ chia thì Quá khứ đơn cho chủ ngữ *the volunteers*.
> - **Câu 2.2: Lỗi sai ở (A) Was walking ➔ Sửa thành: Walking.** Mệnh đề phân từ độc lập đầu câu không dùng to-be.

---

### 📌 CHUYÊN ĐỀ 3: MỆNH ĐỀ PHÂN TỪ QUÁ KHỨ (V3/ED) MANG NGHĨA BỊ ĐỘNG

Khi mệnh đề phụ mang nghĩa **BỊ ĐỘNG** (chỉ nguyên nhân, thời gian hoặc điều kiện):

$$\\mathbf{Because / If + S + be + V_3/V_{ed} \\iff V_3/V_{ed} + (by\\ O),\\ S + V}$$

#### 1. Cơ chế phân biệt V-ing vs. V3/ed:
- Nếu chủ ngữ sau dấu phẩy **TỰ THỰC HIỆN** hành động ➔ dùng **$V\\text{-ing}$** (Chủ động).
- Nếu chủ ngữ sau dấu phẩy **CHỊU TÁC ĐỘNG** của hành động ➔ dùng **$V_3/V_{ed}$** (Bị động).

#### 2. Ví dụ thực chiến:
- *If coal is burnt carelessly for energy, it releases dark soot.* ➔ **Burnt carelessly for energy, coal releases dark soot.**
- *Because they were deeply worried about climate change, the students joined the protest.* ➔ **Worried about climate change, the students joined the protest.**

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 3)

**Câu 3.1:** ______ in huge quantities, fossil fuels release dangerous greenhouse gases into the air.  
A. Burning  
B. Burnt  
C. To burn  
D. Burn  

**Câu 3.2:** ______ by heavy tropical rains, the mountain road was completely blocked by mud.  
A. Damaged  
B. Damaging  
C. Damage  
D. Was damaged  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 3:
> - **Câu 3.1: Chọn B (Burnt).** Nhiên liệu hóa thạch 'được đốt' (bị động: *If they are burnt*) ➔ dùng *Burnt*.
> - **Câu 3.2: Chọn A (Damaged).** Con đường miền núi 'bị tàn phá' (bị động) ➔ dùng *Damaged*.

---

### 📌 CHUYÊN ĐỀ 4: MỆNH ĐỀ PHÂN TỪ HOÀN THÀNH (HAVING + V3/ED)

Khi muốn nhấn mạnh hành động ở mệnh đề phân từ **ĐÃ HOÀN TẤT XONG TRƯỚC** hành động ở mệnh đề chính:

$$\\mathbf{After + S + had + V_3/V_{ed} \\iff Having + V_3/V_{ed}\\ (Chủ\\ động) \\mid Having\\ been + V_3/V_{ed}\\ (Bị\\ động)}$$

#### 1. Ví dụ thực chiến:
- *After the company had dumped toxic waste into the river, it was fined heavily.*  
  ➔ **Having dumped toxic waste into the river, the company was fined heavily.**
- *After they had been warned about the coming storm, the fishermen moved their boats ashore.*  
  ➔ **Having been warned about the coming storm, the fishermen moved their boats ashore.**

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 4)

**Câu 4.1:** ______ the scientific documentary on sea level rise, Nam decided to use public transport every day.  
A. Watch  
B. Having watched  
C. Watched  
D. Being watched  

**Câu 4.2:** Viết lại câu sau dùng \`Having + V3/ed\`:  
*After the volunteers had planted hundreds of trees on the hill, they sat down to rest.*  
➔ Having ..........................................................................................................  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 4:
> - **Câu 4.1: Chọn B (Having watched).** Hành động xem phim hoàn tất trước rồi Nam mới quyết định ➔ dùng *Having watched*.
> - **Câu 4.2: Đáp án:** *Having planted hundreds of trees on the hill, the volunteers sat down to rest.*

---

### 📌 CHUYÊN ĐỀ 5: BẪY PHÂN TỪ LƠ LỬNG (DANGLING PARTICIPLE TRAP - PHÂN HÓA 8.5+)

Đây là **bẫy đề thi THPT và kiểm tra Giữa kì** phân loại học sinh giỏi:

#### 1. Cơ chế mắc bẫy:
Mệnh đề phân từ đứng đầu câu nhưng chủ ngữ ngay sau dấu phẩy lại là **vật vô tri vô giác**, không thể tự thực hiện hành động!
- ❌ *Walking in the forest, the thick smoke hurt our eyes.* (Sai vì "smoke" không biết đi bộ!).
- ✅ *Walking in the forest, we felt the thick smoke hurting our eyes.* (Đúng vì "we" là người đi bộ).

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 5)

**Câu 5.1:** Câu nào dưới đây đúng ngữ pháp và KHÔNG mắc lỗi phân từ lơ lửng?  
A. Walking along the riverbank, thousands of dead fish were found by the boys.  
B. Walking along the riverbank, the boys found thousands of dead fish.  
C. Walking along the riverbank, the smell was completely terrible.  
D. Walking along the riverbank, it shocked the local tourists.  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 5:
> - **Câu 5.1: Chọn B.** Chủ ngữ đứng sau dấu phẩy phải là thực thể thực hiện hành động đi bộ (*the boys*). Các câu A, C, D đều mắc bẫy phân từ lơ lửng sai ngữ pháp.

---

### 📌 CHUYÊN ĐỀ 6: 6 DẠNG BÀI VIẾT LẠI CÂU KINH ĐIỂN VỚI PARTICIPLE CLAUSES

1. **Dạng 1 (Nguyên nhân chủ động):** $Because / Since + S + V \\iff V\\text{-ing},\\ S + V$
2. **Dạng 2 (Điều kiện/Nguyên nhân bị động):** $If / Because + S + be + V_3/ed \\iff V_3/ed,\\ S + V$
3. **Dạng 3 (Hành động hoàn thành trước):** $After + S + had + V_3/ed \\iff Having + V_3/ed,\\ S + V$
4. **Dạng 4 (Rút gọn mệnh đề quan hệ chủ động):** $The\\ gases\\ which\\ trap\\ heat \\iff The\\ gases\\ trapping\\ heat$
5. **Dạng 5 (Rút gọn mệnh đề quan hệ bị động):** $Energy\\ which\\ is\\ produced\\ by\\ solar\\ panels \\iff Energy\\ produced\\ by\\ solar\\ panels$
6. **Dạng 6 (Hai hành động liên tiếp của 1 chủ thể):** $Minh\\ locked\\ the\\ door\\ and\\ walked\\ away \\iff Locking\\ the\\ door,\\ Minh\\ walked\\ away$

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 6)

**Câu 6.1:** Viết lại câu sau dùng Participle Clause:  
*Because the boys recognized the bad effects of trash, they joined the clean-up team.*  
➔ Recognizing ................................................................................................  

**Câu 6.2:** Viết lại câu sau dùng Past Participle:  
*If energy is produced from wind turbines, it does not pollute the atmosphere.*  
➔ Produced ....................................................................................................  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 6:
> - **Câu 6.1: Đáp án:** *Recognizing the bad effects of trash, the boys joined the clean-up team.*
> - **Câu 6.2: Đáp án:** *Produced from wind turbines, energy does not pollute the atmosphere.*

---

## 📚 PHẦN III: BẢNG 24 TỪ VỰNG CỐT LÕI UNIT 5 (GLOBAL WARMING)

| STT | Từ vựng | Phiên âm IPA | Từ loại | Nghĩa tiếng Việt | Cụm cố định (Collocation) |
|:---:|:---|:---|:---:|:---|:---|
| 1 | **fossil fuel** | /ˈfɒsl fjuːəl/ | n | nhiên liệu hóa thạch | burn fossil fuels |
| 2 | **coal** | /kəʊl/ | n | than đá | coal-fired power plant |
| 3 | **renewable** | /rɪˈnjuːəbl/ | adj | có thể tái tạo | renewable energy sources |
| 4 | **release** | /rɪˈliːs/ | v, n | thải ra, phóng thích | release harmful gases |
| 5 | **waste** | /weɪst/ | n, v | rác thải, chất thải | solid waste, landfill waste |
| 6 | **emission** | /iˈmɪʃn/ | n | sự phát thải khí | cut carbon emissions |
| 7 | **greenhouse gas** | /ˈɡriːnhaʊs ɡæs/ | n | khí nhà kính | concentration of greenhouse gases |
| 8 | **methane** | /ˈmiːθeɪn/ | n | khí mê-tan | methane emissions from cattle |
| 9 | **carbon footprint** | /ˌkɑːbən ˈfʊtprɪnt/ | n | dấu chân carbon | reduce one's carbon footprint |
| 10 | **global warming** | /ˌɡləʊbl ˈwɔːmɪŋ/ | n | sự nóng lên toàn cầu | combat global warming |
| 11 | **atmosphere** | /ˈætməsfɪə(r)/ | n | bầu khí quyển | escape into the atmosphere |
| 12 | **absorb** | /əbˈzɔːb/ | v | hấp thụ (nhiệt, CO2) | absorb carbon dioxide |
| 13 | **balance** | /ˈbæləns/ | n, v | sự cân bằng | ecological balance |
| 14 | **heat-trapping** | /ˈhiːt træpɪŋ/ | adj | giữ nhiệt, bẫy nhiệt | heat-trapping pollutants |
| 15 | **severe** | /sɪˈvɪə(r)/ | adj | nghiêm trọng, khắc nghiệt | severe droughts |
| 16 | **extreme weather** | /ɪkˌstriːm ˈweðə(r)/ | n | thời tiết cực đoan | extreme weather events |
| 17 | **deforestation** | /diːˌfɒrɪˈsteɪʃn/ | n | nạn phá rừng | stop deforestation |
| 18 | **cut down** | /kʌt daʊn/ | phr v | chặt hạ cây cối | cut down old trees |
| 19 | **disrupt** | /dɪsˈrʌpt/ | v | làm đảo lộn, gián đoạn | disrupt marine ecology |
| 20 | **consequence** | /ˈkɒnsɪkwəns/ | n | hậu quả, hệ quả | direct consequence |
| 21 | **catastrophe** | /kəˈtæstrəfi/ | n | thảm họa khốc liệt | environmental catastrophe |
| 22 | **sustainable** | /səˈsteɪnəbl/ | adj | bền vững | sustainable development |
| 23 | **pollutant** | /pəˈluːtənt/ | n | chất gây ô nhiễm | air pollutants |
| 24 | **ecology** | /iˈkɒlədʒi/ | n | hệ sinh thái | coastal ecology |

---

## 💡 PHẦN IV: LỜI DẶN DÒ TỪ THẦY THỨC
Chào Thái! Buổi học ngày 19/11/2026 chúng ta chính thức bước sang **Unit 5: Global Warming**. Đây là Unit có ngữ pháp rất quan trọng xuất hiện dày đặc trong đề thi THPT Quốc Gia và đề thi cuối kì. Hãy thực hiện đúng các bước sau:
1. **Truy cập Phòng học tương tác:** [Phòng học Unit 5](/lectures/eng11-unit5/index.html)
   - Luyện lật thẻ **Flashcard 3D** cả 2 chiều Anh ➔ Việt và Việt ➔ Anh cho 24 từ vựng cốt lõi.
   - Làm các bài tập nhanh **Interactive Quick Quiz Widgets** trên từng Accordion ngữ pháp để kiểm tra phản xạ tức thì.
2. **Hoàn thành Bài kiểm tra Online:** Làm trọn vẹn bộ đề **80 câu trắc nghiệm chuyên sâu** (thời gian 90 phút) để rèn luyện kỹ năng phát hiện bẫy phân từ lơ lửng và chia từ loại Word Formation. Chúc em học tốt và đạt điểm số 8.5+!
`;

async function main() {
  console.log('🚀 Bắt đầu quá trình nạp card bài giảng và 80 câu hỏi trắc nghiệm cho bạn Thái ngày 19/11/2026...');

  const payloadPath = path.join(__dirname, 'payload_thai_1911_80q.json');
  if (!fs.existsSync(payloadPath)) {
    throw new Error(`Không tìm thấy file payload tại: ${payloadPath}`);
  }

  const rawData = fs.readFileSync(payloadPath, 'utf8');
  const questionsData = JSON.parse(rawData);

  if (questionsData.length !== CONSTANTS.TOTAL_QUESTIONS) {
    throw new Error(`Số lượng câu hỏi (${questionsData.length}) không khớp với yêu cầu (${CONSTANTS.TOTAL_QUESTIONS})!`);
  }

  console.log(`✅ Đã đọc thành công ${questionsData.length} câu hỏi từ payload JSON.`);

  // 1. Kiểm tra hoặc tạo mới Learning Unit
  const unitTitle = 'Unit 5: Global Warming - Cẩm Nang Ngữ Pháp Toàn Diện Participle Clauses & 24 Từ Vựng Cốt Lõi';
  const unitDesc = 'Chuyên đề Ngữ pháp Trọng tâm Unit 5 Tiếng Anh 11 Global Success: Phân tích toàn diện 6 Chuyên đề Mệnh đề phân từ (Present & Past Participle Clauses, Perfect Participles, Bẫy Dangling Participles, 6 dạng viết lại câu) kết hợp 24 từ vựng Global Warming với hệ thống ví dụ song ngữ và bộ bài tập nhanh (Quick Check Drills) mục tiêu 8.5+.';

  let learningUnit = await prisma.learning_units.findFirst({
    where: {
      subject_id: CONSTANTS.SUBJECT_ID,
      title: unitTitle
    }
  });

  if (!learningUnit) {
    console.log('🌱 Đang tạo mới Learning Unit cho Unit 5...');
    learningUnit = await prisma.learning_units.create({
      data: {
        subject_id: CONSTANTS.SUBJECT_ID,
        title: unitTitle,
        description: unitDesc,
        lecture_content_markdown: LECTURE_CONTENT_MARKDOWN,
        created_by: CONSTANTS.TEACHER_ID
      }
    });
    console.log(`✅ Đã tạo Learning Unit mới: ID = ${learningUnit.id}`);
  } else {
    console.log(`📌 Đang cập nhật nội dung cho Learning Unit đã có: ID = ${learningUnit.id}`);
    learningUnit = await prisma.learning_units.update({
      where: { id: learningUnit.id },
      data: {
        title: unitTitle,
        description: unitDesc,
        lecture_content_markdown: LECTURE_CONTENT_MARKDOWN
      }
    });
  }

  // 2. Kiểm tra hoặc tạo mới Daily Student Assignment cho ngày 19/11/2026
  let assignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: {
        gte: new Date('2026-11-19T00:00:00.000Z'),
        lt: new Date('2026-11-20T00:00:00.000Z')
      }
    }
  });

  const teacherNote = `Chào Thái! Thầy gửi em kế hoạch học tập ngày 19/11/2026:
1. Đọc kỹ cẩm nang 6 Chuyên đề Ngữ pháp Mệnh Đề Phân Từ (Participle Clauses) và bấm vào Phòng Học Tương Tác Unit 5 để luyện Flashcard 3D 24 từ vựng Global Warming.
2. Hoàn thành bài kiểm tra 90 phút gồm 80 câu hỏi trắc nghiệm chuyên sâu (bao gồm 10 câu Word Formation, các câu hỏi từ vựng bám sát bài học, bẫy phân từ lơ lửng Dangling Participles và các dạng viết lại câu).
Chúc em học tốt và tự tin chinh phục điểm số cao nhất!`;

  if (!assignment) {
    console.log('🌱 Đang tạo mới Daily Student Assignment cho ngày 19/11/2026...');
    assignment = await prisma.daily_student_assignments.create({
      data: {
        student_id: CONSTANTS.STUDENT_ID,
        learning_unit_id: learningUnit.id,
        assigned_by: CONSTANTS.TEACHER_ID,
        assigned_date: CONSTANTS.ASSIGNED_DATE,
        custom_session_minutes: 90,
        teacher_daily_note: teacherNote,
        is_published: true
      }
    });
    console.log(`✅ Đã tạo Assignment mới: ID = ${assignment.id}`);
  } else {
    console.log(`📌 Đang cập nhật Assignment ngày 19/11/2026: ID = ${assignment.id}`);
    assignment = await prisma.daily_student_assignments.update({
      where: { id: assignment.id },
      data: {
        learning_unit_id: learningUnit.id,
        custom_session_minutes: 90,
        teacher_daily_note: teacherNote,
        is_published: true
      }
    });
  }

  // 3. Xóa các Assessment cũ (nếu có) trên learning unit này
  const existingAssessments = await prisma.assessments.findMany({
    where: { learning_unit_id: learningUnit.id }
  });

  if (existingAssessments.length > 0) {
    console.log(`⚠️ Đang dọn dẹp ${existingAssessments.length} assessment cũ trên Unit...`);
    for (const oldAss of existingAssessments) {
      await prisma.assessment_attempts.deleteMany({ where: { assessment_id: oldAss.id } });
      await prisma.questions.deleteMany({ where: { assessment_id: oldAss.id } });
      await prisma.assessments.delete({ where: { id: oldAss.id } });
    }
  }

  // 4. Tạo Assessment mới
  const assessmentTitle = 'Luyện tập chuyên sâu: 80 Câu Ngữ Pháp Mệnh Đề Phân Từ (Participle Clauses) & 24 Từ Vựng Unit 5';
  const instructions = 'Bộ đề 80 câu trắc nghiệm bao trọn 6 chuyên đề Mệnh Đề Phân Từ (Participle Clauses) của Unit 5: Global Success 11, kết hợp nhuần nhuyễn 10 câu Word Formation và 24 từ vựng Global Warming cốt lõi. Hãy đọc kỹ từng câu, phân tích chủ ngữ của hai mệnh đề và bản chất chủ động/bị động để đạt điểm 8.5+ nhé!';

  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      type: 'IN_SESSION_90M',
      title: assessmentTitle,
      instructions: instructions,
      time_limit_minutes: CONSTANTS.TIME_LIMIT_MINUTES,
      max_score: CONSTANTS.MAX_SCORE
    }
  });

  console.log(`✅ Đã tạo Assessment mới thành công: ID = ${assessment.id}`);

  // 5. Nạp 80 câu hỏi vào database
  console.log('⏳ Đang nạp 80 câu hỏi vào cơ sở dữ liệu...');
  for (let i = 0; i < questionsData.length; i++) {
    const q = questionsData[i];
    const section = getSectionName(i + 1);

    await prisma.questions.create({
      data: {
        assessment_id: assessment.id,
        order_index: i + 1,
        type: 'MULTIPLE_CHOICE',
        points: 0.125, // 80 * 0.125 = 10.00
        question_payload: {
          sectionName: section,
          content_markdown: q.content,
          options: q.options,
          correct_option_id: q.correctAnswer
        },
        grading_key_payload: {
          correct_option_id: q.correctAnswer,
          explanation_markdown: q.explanation
        }
      }
    });
  }

  console.log('✅ Đã nạp thành công toàn bộ 80 câu hỏi trắc nghiệm!');

  // 6. Tạo Assessment Attempt sẵn sàng cho bạn Thái làm bài
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: CONSTANTS.STUDENT_ID,
      status: 'NOT_STARTED',
      total_score: 0.00,
      time_spent_seconds: 0
    }
  });

  console.log(`✅ Đã tạo Assessment Attempt cho bạn Thái: ID = ${attempt.id} (Status: NOT_STARTED)`);
  console.log('\n🎉 HOÀN THÀNH XUẤT SẮC TOÀN BỘ QUÁ TRÌNH TẠO CARD BÀI TẬP 19/11/2026!');
}

main()
  .catch((err) => {
    console.error('❌ Lỗi khi thực thi seed script:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
