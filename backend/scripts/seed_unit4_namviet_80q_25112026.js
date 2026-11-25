#!/usr/bin/env node

/**
 * SEED SCRIPT: UNIT 4 URBANISATION - LECTURE & 80-QUESTION DIVERSE PRACTICE FOR NAM VIỆT (25/11/2026)
 * Tiếng Anh 12 Global Success (SGK Trang 48-59 & SBT Trang 44-52)
 * Thầy Thức - Tiếng Anh 12
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: 'd76bd9d6-6cf5-409c-847b-b0e5c07a0876', // Bạn Nam Việt (Lớp 12)
  SUBJECT_ID: 'a15d4b19-412a-4bff-acd5-86714381b7af', // ENG_12
  ASSIGNED_DATE: new Date('2026-11-25T00:00:00.000Z')
};

const VOCAB_TABLE_MARKDOWN = `
| STT | Từ vựng | Phiên âm IPA | Từ loại | Nghĩa tiếng Việt | Cụm từ thông dụng (Collocations) | Lưu ý sử dụng & Ngữ cảnh SGK |
| :---: | :--- | :--- | :---: | :--- | :--- | :--- |
| **1** | **urban** | \`/ˈɜːbən/\` | adj. | thuộc về đô thị, thành thị | *urban areas, urban population, urban development* | Trái nghĩa trực tiếp với **rural** (thuộc nông thôn) (SGK tr.48, 150). |
| **2** | **expand** | \`/ɪkˈspænd/\` | v. | mở rộng (diện tích, quy mô) | *expand into a city, expand rapidly* | Dùng cho thành phố, thị trấn, đường sá mở rộng quy mô (SGK tr.50, 52, 149). |
| **3** | **gradually** | \`/ˈɡrædʒuəli/\` | adv. | dần dần, từ từ | *gradually expand, increase gradually* | Chỉ sự thay đổi chậm rãi theo thời gian; đồng nghĩa *slowly over time* (SGK tr.52, 53, 150). |
| **4** | **rapidly** | \`/ˈræpɪdli/\` | adv. | rất nhanh, với tốc độ cao | *grow rapidly, increase rapidly* | Đồng nghĩa *very quickly*; dùng nhiều khi mô tả tốc độ đô thị hóa (SGK tr.54, 150). |
| **5** | **proportion** | \`/prəˈpɔːʃn/\` | n. | tỉ lệ, phần | *a large proportion of, the proportion of urban population* | Hay gặp trong biểu đồ đường (line graph) và bài đọc số liệu (SGK tr.58, 150). |
| **6** | **resident** | \`/ˈrezɪdənt/\` | n. | người dân, cư dân | *local residents, city residents* | Chỉ người sinh sống tại một nơi cố định; đồng nghĩa *city dweller* (SGK tr.48, 52, 150). |
| **7** | **housing** | \`/ˈhaʊzɪŋ/\` | n. | nhà ở | *affordable housing, shortage of housing* | **Danh từ không đếm được**, tuyệt đối không thêm "s" hay "a/an" (SGK tr.50, 52, 150). |
| **8** | **afford** | \`/əˈfɔːd/\` | v. | có đủ tiền, có khả năng chi trả | *afford to buy a house/flat, afford expensive housing* | Cấu trúc chuẩn: **can/cannot afford + to V** (SGK tr.50, 52, 149). |
| **9** | **reliable** | \`/rɪˈlaɪəbl/\` | adj. | đáng tin cậy, có thể tin tưởng | *reliable public transport, reliable bus service* | Xuất phát từ động từ *rely (on)*; đồng nghĩa *can be trusted* (SGK tr.54, 150). |
| **10** | **leisure** | \`/ˈleʒə/\` | n. | sự giải trí, thư giãn | *leisure activities, leisure facilities* | Kết hợp tạo cụm danh từ chỉ hoạt động vui chơi ở công viên đô thị (SGK tr.48, 150). |
| **11** | **seek** | \`/siːk/\` | v. | tìm kiếm | *seek better jobs, seek employment/opportunities* | Động từ bất quy tắc: **seek – sought – sought**; đồng nghĩa *look for* (SGK tr.50, 52, 150). |
| **12** | **unemployment** | \`/ˌʌnɪmˈplɔɪmənt/\` | n. | tình trạng thất nghiệp | *unemployment rate, youth unemployment* | Danh từ không đếm được; tính từ là *unemployed* (SGK tr.50, 52, 150). |
| **13** | **rush hour** | \`/ˈrʌʃ aʊə/\` | n. phr. | giờ cao điểm | *during rush hour, rush-hour traffic jams* | Khung giờ mọi người đi làm/tan tầm gây kẹt xe nghiêm trọng (SGK tr.49, 150). |
| **14** | **concern** | \`/kənˈsɜːn/\` | n. | sự lo lắng, mối quan ngại | *cause concern, express concern about, a big concern* | Đồng nghĩa với *worry* (SGK tr.52, 53, 149; SBT tr.45). |
| **15** | **colonial** | \`/kəˈləʊniəl/\` | adj. | thuộc địa, thuộc dân | *colonial buildings, French colonial rule* | Mô tả kiến trúc cổ tại Hà Nội thời kỳ Pháp thuộc (SGK tr.52, 149; SBT tr.45). |
`;

const LECTURE_MARKDOWN = `# 🌟 Cẩm Nang Tri Thức & 15 Từ Vựng Cốt Lõi Unit 4: Urbanisation
**Biên soạn riêng cho Bạn Nam Việt (Lớp 12 - Mục tiêu 7+ THPTQG) • Hướng dẫn: Thầy Thức**

Chuyên đề: **Unit 4: Urbanisation (SGK Global Success Trang 48 - 59 & SBT Trang 44 - 52)**  
Ngày học: **25/11/2026**

[🚀 MỞ PHÒNG HỌC TƯƠNG TÁC TOÀN MÀN HÌNH (FLASHCARD 3D + QUICK QUIZ)](/lectures/eng12-unit4/index.html)

---

## 🎯 PHẦN 1: 15 TỪ VỰNG CỐT LÕI UNIT 4 (URBANISATION)

Toàn bộ 15 từ vựng dưới đây được tuyển chọn trực tiếp từ SGK Global Success 12 Unit 4 và bảng Glossary chuẩn (tr.149-150). Con hãy đọc kỹ từ loại, collocation và luyện lật thẻ 3D hai chiều trong Phòng Học Tương Tác nhé:

${VOCAB_TABLE_MARKDOWN}

---

## ⚡ PHẦN 2: NGỮ PHÁP CHUYÊN SÂU UNIT 4 (CÔNG THỨC + VÍ DỤ CHI TIẾT + BẪY THI)

Bài học hôm nay gồm 3 chuyên đề liên kết chặt chẽ với nhau: **(1) Thì Hiện tại hoàn thành & mở rộng**, **(2) So sánh hơn & So sánh nhất cơ bản** (nền tảng bắt buộc), và **(3) So sánh kép diễn tả sự thay đổi**.

---

### 📖 CHUYÊN ĐỀ 1: THÌ HIỆN TẠI HOÀN THÀNH (PRESENT PERFECT — REVIEW & EXTENSION)

#### 1. Cơ chế & Công thức cơ bản (Review)
Thì Hiện tại hoàn thành dùng để nối **quá khứ với hiện tại**: hành động bắt đầu trong quá khứ và **vẫn đang tiếp diễn** ở hiện tại, hoặc hành động **vừa mới hoàn tất** và kết quả nhìn thấy rõ ngay bây giờ.
- **Khẳng định:** $\\mathbf{S + have / has + V_{3/ed} (+ O)}$
- **Phủ định:** $\\mathbf{S + have / has + not + V_{3/ed}}$
- **Nghi vấn:** $\\mathbf{Have / Has + S + V_{3/ed}?}$
- **Dấu hiệu nhận biết:** *since + mốc thời gian*, *for + khoảng thời gian*, *over the past (ten) years*, *recently / lately*, *already*, *yet*, *just*.

**Ví dụ song ngữ có phân tích $S - V - O$:**
1. $[A\\ lot\\ of\\ young\\ people]_S$ $\\mathbf{have\\ moved}_V$ $[to\\ big\\ cities]_{Adv}$ *over the past ten years.*  
   *(Rất nhiều người trẻ đã chuyển lên các thành phố lớn trong 10 năm qua — xu hướng bắt đầu từ quá khứ và vẫn tiếp tục đến nay).*
2. $[The\\ city\\ government]_S$ $\\mathbf{has\\ expanded}_V$ $[the\\ main\\ roads]_O$ *recently.*  
   *(Chính quyền thành phố gần đây đã mở rộng các tuyến đường chính — kết quả là đường rộng hơn ở hiện tại).*

#### 2. Hai cấu trúc mở rộng trọng tâm Unit 4 (SGK tr.50)
- **Cấu trúc 1 (Đếm số lần trải nghiệm):**
  $$\\mathbf{It / This / That + is + the\\ first / second / third...\\ time + S + have / has + V_{3/ed}}$$
  - *Ví dụ 1:* **This is the second time** $[I]_S$ $\\mathbf{have\\ visited}_V$ $[this\\ city]_O$. *(Đây là lần thứ hai tôi đến thăm thành phố này).*
  - *Ví dụ 2:* **It is the first time** $[Mark]_S$ $\\mathbf{has\\ been}_V$ $[on\\ an\\ electric\\ bus]_{Adv}$. *(Đây là lần đầu tiên Mark đi xe buýt điện).*
- **Cấu trúc 2 (Trải nghiệm độc nhất — nhất từng có):**
  $$\\mathbf{It / This / That / N + is + the\\ best / worst / most\\ adj / only + N + S + have / has + (ever) + V_{3/ed}}$$
  - *Ví dụ 1:* **That is the worst meal** $[I]_S$ $\\mathbf{have\\ ever\\ had}_V$ *in this city.* *(Đó là bữa ăn tệ nhất mà tôi từng ăn ở thành phố này).*
  - *Ví dụ 2:* **Moving to the city is the best decision** $[my\\ parents]_S$ $\\mathbf{have\\ ever\\ made}_V$. *(Chuyển lên thành phố là quyết định tốt nhất bố mẹ tôi từng đưa ra).*

#### ⚠️ Bẫy thi THPTQG hay gặp (SGK tr.51):
1. **Bẫy dùng Quá khứ đơn ở vế sau:** *This is the first time I ~~saw~~...* ➔ Phải sửa thành **have seen**.
2. **Bẫy chia Hiện tại hoàn thành ở vế đầu:** *This ~~has been~~ the second time...* ➔ Vế đầu PHẢI là Hiện tại đơn **is**!
3. **Bẫy dùng \`had V3\`:** Khi vế đầu là **is** (hiện tại), vế sau bắt buộc là **have/has + V3**, tuyệt đối không dùng *had*.

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK 1):
1. This is the first time my sister ______ an electric bus in Ha Noi. *(A. rides / B. rode / C. has ridden / D. had ridden)*
2. Buying this flat is the best decision our family ______ in ten years. *(A. has ever made / B. ever made / C. makes / D. had ever made)*
3. Over the past decade, our town ______ into a busy urban area. *(A. expands / B. expanded / C. has expanded / D. will expand)*

**📋 Đáp án & Giải thích chi tiết:**
- **Câu 1: C. has ridden** — Theo cấu trúc \`This is the first time + S + have/has V3\`, chủ ngữ \`my sister\` số ít đi với \`has ridden\`.
- **Câu 2: A. has ever made** — Cấu trúc trải nghiệm nhất \`is + the best decision + S + have/has ever V3\`.
- **Câu 3: C. has expanded** — Cụm \`Over the past decade\` chỉ quá trình từ quá khứ đến hiện tại ➔ dùng Hiện tại hoàn thành \`has expanded\`.

---

### 📖 CHUYÊN ĐỀ 2: SO SÁNH HƠN & SO SÁNH NHẤT CƠ BẢN (BASIC COMPARATIVES & SUPERLATIVES)

Để làm chủ So sánh kép của Unit 4, con bắt buộc phải nắm chắc nền tảng So sánh hơn và So sánh nhất cơ bản:

#### 1. Phân biệt Tính từ / Trạng từ NGẮN và DÀI
- **Từ ngắn (Short adj/adv):** Có **1 âm tiết** (*big, tall, fast, high, cheap, clean*) HOẶC có **2 âm tiết** kết thúc bằng \`-y, -le, -ow, -er\` (*busy ➔ busier, quiet ➔ quieter*).
- **Từ dài (Long adj/adv):** Có **2 âm tiết trở lên** không thuộc nhóm trên (*crowded, modern, reliable, expensive, convenient, rapidly*).

#### 2. Công thức So sánh hơn & So sánh nhất
| Dạng so sánh | Tính từ / Trạng từ NGẮN | Tính từ / Trạng từ DÀI |
| :--- | :--- | :--- |
| **So sánh hơn (2 đối tượng)** | $S_1 + be/V + \\mathbf{adj/adv\\text{-}er + than} + S_2$ | $S_1 + be/V + \\mathbf{more / less + adj/adv + than} + S_2$ |
| **So sánh nhất (từ 3 đối tượng)** | $S + be/V + \\mathbf{the + adj/adv\\text{-}est} (+ N) (+ in/of...)$ | $S + be/V + \\mathbf{the\\ most / least + adj/adv} (+ N) (+ in/of...)$ |

#### 3. Bảng Tính từ / Trạng từ bất quy tắc bắt buộc nhớ
| Từ gốc | So sánh hơn (Comparative) | So sánh nhất (Superlative) |
| :--- | :--- | :--- |
| **good / well** (tốt) | **better** | **the best** |
| **bad / badly** (tệ) | **worse** | **the worst** |
| **many / much** (nhiều) | **more** | **the most** |
| **little** (ít) | **less** | **the least** |
| **far** (xa) | **farther / further** | **the farthest / furthest** |

**Ví dụ song ngữ có phân tích $S - V - O$:**
1. $[Living\\ in\\ a\\ big\\ city]_S$ $\\mathbf{is}_V$ **much more expensive than** $[living\\ in\\ a\\ village]_{S_2}$.  
   *(Sống ở thành phố lớn đắt đỏ hơn nhiều so với sống ở làng quê — dùng \`much\` nhấn mạnh trước so sánh hơn).*
2. $[Ha\\ Noi]_S$ $\\mathbf{is}_V$ **the biggest city** *in northern Viet Nam.*  
   *(Hà Nội là thành phố lớn nhất ở miền Bắc Việt Nam — so sánh nhất luôn có \`the\`).*
3. $[The\\ new\\ metro\\ line]_S$ $\\mathbf{makes}_V$ $[travelling]_O$ **faster and better than** *old buses.*  
   *(Tuyến tàu điện mới giúp việc đi lại nhanh hơn và tốt hơn xe buýt cũ).*

#### ⚠️ Bẫy thi hay gặp:
- Tuyệt đối KHÔNG dùng *very* trước so sánh hơn (Sai: *~~very bigger~~* ➔ Đúng: **much / far / a lot bigger**).
- So sánh nhất luôn phải có mạo từ **the** (*the most reliable*, *the worst*).

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK 2):
1. Renting a flat in the city centre is much ______ than renting one in the countryside. *(A. expensive / B. more expensive / C. most expensive / D. the most expensive)*
2. Ho Chi Minh City is ______ urban area in Viet Nam by population. *(A. larger / B. the largest / C. most large / D. the more large)*
3. During rush hour, traffic on Main Street is ______ in the whole city. *(A. worse / B. the bad / C. worst / D. the worst)*

**📋 Đáp án & Giải thích chi tiết:**
- **Câu 1: B. more expensive** — Có \`than\` và trạng từ nhấn mạnh \`much\` ➔ dùng so sánh hơn của tính từ dài.
- **Câu 2: B. the largest** — So sánh nhất trong phạm vi cả nước (\`in Viet Nam\`) với tính từ ngắn \`large\`.
- **Câu 3: D. the worst** — So sánh nhất bất quy tắc của \`bad\` là \`the worst\`.

---

### 📖 CHUYÊN ĐỀ 3: SO SÁNH KÉP DIỄN TẢ SỰ THAY ĐỔI (DOUBLE COMPARATIVES TO SHOW CHANGE)

#### 1. Dạng 1: "Càng ngày càng ..." (Diễn tả sự biến đổi tăng/giảm liên tục — 1 vế)
- **Với Tính từ / Trạng từ ngắn:** $\\mathbf{S + V + adj/adv\\text{-}er\\ and\\ adj/adv\\text{-}er}$  
  *Ví dụ:* $[The\\ city]_S$ $\\mathbf{is\\ getting}_V$ **bigger and bigger**. *(Thành phố đang ngày càng lớn hơn).*
- **Với Tính từ / Trạng từ dài:** $\\mathbf{S + V + more\\ and\\ more / less\\ and\\ less + adj/adv}$  
  *Ví dụ:* $[Housing]_S$ $\\mathbf{is\\ becoming}_V$ **more and more expensive**. *(Nhà ở đang ngày càng đắt đỏ hơn).*  
  *Ví dụ:* $[Polluted\\ cities]_S$ $\\mathbf{are\\ becoming}_V$ **less and less attractive**. *(Các thành phố ô nhiễm ngày càng kém hấp dẫn hơn).*
- **Với Danh từ:** $\\mathbf{more\\ and\\ more + N}$ | $\\mathbf{fewer\\ and\\ fewer + N_{(đếm\\ được\\ số\\ nhiều)}}$ | $\\mathbf{less\\ and\\ less + N_{(không\\ đếm\\ được)}}$  
  *Ví dụ:* There are **more and more** $[high\\text{-}rise\\ buildings]_N$ in the city.

#### 2. Dạng 2: "Càng ... thì càng ..." (Hai sự việc cùng biến đổi song song — 2 vế)
$$\\mathbf{The + comparative\\ (adj/adv/N) + S_1 + V_1,\\ the + comparative\\ (adj/adv/N) + S_2 + V_2}$$

**4 biến thể chuẩn SGK & SBT Unit 4:**
1. **Tính từ ngắn:** **The bigger** $[the\\ city]_{S_1}$ $gets_{V_1}$, **the higher** $[house\\ prices]_{S_2}$ $become_{V_2}$.  
   *(Thành phố càng lớn, giá nhà càng cao).*
2. **Tính từ dài:** **The more crowded** $[the\\ area]_{S_1}$ $becomes_{V_1}$, **the worse** $[traffic\\ jams]_{S_2}$ $get_{V_2}$. *(SGK tr.49)*  
   *(Khu vực càng đông đúc, tắc đường càng tệ hơn).*
3. **Danh từ (nhiều/ít):** **The more houses** $[we]_{S_1}$ $build_{V_1}$, **the less space** $[we]_{S_2}$ $have_{V_2}$ for trees. *(SGK tr.51)*  
   *(Chúng ta càng xây nhiều nhà, chúng ta càng có ít không gian cho cây xanh).*
4. **Động từ (làm gì càng nhiều):** **The more** $[we]_{S_1}$ $invest_{V_1}$ in rural areas, **the more** $[we]_{S_2}$ $can\\ help_{V_2}$ people there. *(SGK tr.51)*

#### ⚠️ 4 Bẫy chết người trong đề thi:
1. KHÔNG dùng \`the most\` trong so sánh kép 2 vế (Sai: *~~The most~~ we use cars...* ➔ Đúng: **The more** we use cars...).
2. KHÔNG dùng \`much and more\` (Sai: *~~much and more~~ difficult* ➔ Đúng: **more and more** difficult).
3. KHÔNG quên chữ \`the\` ở vế thứ hai (*The bigger it gets, **the** more crowded it becomes*).
4. Phân biệt **fewer** (+ danh từ đếm được số nhiều: *fewer private cars*) và **less** (+ danh từ không đếm được: *less space, less air pollution*).

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK 3):
1. Due to rapid urbanisation, our town is becoming ______. *(A. big and bigger / B. bigger and bigger / C. bigger and big / D. more and more big)*
2. The more reliable the buses are, ______ private cars people use. *(A. the less / B. fewer / C. the fewer / D. the fewest)*
3. The ______ people move into big cities, the higher the unemployment rate becomes. *(A. most / B. more / C. many / D. much)*

**📋 Đáp án & Giải thích chi tiết:**
- **Câu 1: B. bigger and bigger** — \`big\` là tính từ ngắn (gấp đôi \`g\`) ➔ \`bigger and bigger\`.
- **Câu 2: C. the fewer** — \`private cars\` là danh từ đếm được số nhiều và vế 2 bắt buộc có \`the\` ➔ \`the fewer\`.
- **Câu 3: B. more** — So sánh kép 2 vế chỉ dùng so sánh hơn \`The more...\`, không dùng \`the most\`.

---

## 💡 LỜI DẶN DÒ TỪ THẦY THỨC DÀNH CHO NAM VIỆT

Chào Nam Việt,

Hôm nay ngày **25/11/2026**, con học **Unit 4: Urbanisation** với mục tiêu chắc chắn **7+ THPTQG**:
1. **Mở Phòng Học Tương Tác** để lật thẻ Flashcard 3D hai chiều thuộc nằm lòng **15 từ vựng cốt lõi** và làm ngay các bài tập **Quick Check** dưới mỗi chuyên đề ngữ pháp.
2. **Chinh phục Đấu Trường 80 Câu Đa Dạng:**
   - **Phần đầu (Câu 1–20):** Từ vựng cốt lõi (15 câu trắc nghiệm có ít nhất 3 từ vựng mới trong 4 đáp án + 5 câu điền từ trực tiếp gõ máy).
   - **Phần giữa (Câu 21–40):** 10 câu chia từ loại (Word Formation), 5 câu Đồng/Trái nghĩa và 5 câu Giao tiếp phàn nàn & đáp lại.
   - **Phần ngữ pháp (Câu 41–60):** Đánh mạnh vào Thì Hiện Tại Hoàn Thành & Mở rộng, So sánh hơn/nhất cơ bản, So sánh kép và Tìm lỗi sai (có cả trắc nghiệm và điền từ).
   - **Phần vận dụng tổng hợp (Câu 61–80):** Viết lại câu, Sắp xếp hội thoại/đoạn văn form THPTQG 2025, Đọc điền khuyết (6 câu) và Đọc hiểu (6 câu).
   - Toàn bộ câu dẫn và ngữ cảnh đều dùng từ vựng **Basic (A1–A2/B1)** ngắn gọn, rõ nghĩa để con làm bài thật tự tin!
`;

async function main() {
  console.log(`🚀 Bắt đầu tạo Card Unit 4 ngày 25/11/2026 cho Bạn Nam Việt (${CONSTANTS.STUDENT_ID})...`);

  const questionsPath = path.resolve(__dirname, 'questions_data_80_25112026.json');
  if (!fs.existsSync(questionsPath)) {
    throw new Error(`Tệp ${questionsPath} không tồn tại!`);
  }
  const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
  if (questions.length !== 80) {
    throw new Error(`Cần đúng 80 câu hỏi, hiện có ${questions.length} câu!`);
  }
  console.log(`📋 Đã tải ${questions.length} câu hỏi đạt chuẩn.`);

  // Dọn dẹp nếu đã tồn tại assignment ngày 25/11/2026 cho Nam Việt
  const startOfDay = new Date('2026-11-25T00:00:00.000Z');
  const endOfDay = new Date('2026-11-25T23:59:59.999Z');
  const existingAssignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: { gte: startOfDay, lte: endOfDay }
    }
  });

  if (existingAssignment) {
    console.log(`⚠️ Đã tồn tại Assignment ngày 25/11/2026 (${existingAssignment.id}), tiến hành dọn dẹp...`);
    await prisma.daily_student_assignments.delete({ where: { id: existingAssignment.id } });
    await prisma.learning_units.delete({ where: { id: existingAssignment.learning_unit_id } }).catch(() => {});
  }

  // 1. Tạo Learning Unit
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: "Unit 4: Urbanisation - 15 Từ Vựng Cốt Lõi & Ngữ Pháp Chuyên Sâu (80 Bài Tập Đa Dạng)",
      description: "Bài giảng và luyện tập Unit 4 Tiếng Anh 12 Global Success: 15 từ vựng core (urban, expand, gradually, rapidly, proportion, resident, housing, afford, reliable, leisure, seek, unemployment, rush hour, concern, colonial), ngữ pháp Hiện tại hoàn thành, So sánh cơ bản & So sánh kép kèm 80 bài tập đa dạng.",
      lecture_content_markdown: LECTURE_MARKDOWN,
      lecture_attachments: [
        {
          title: "Phòng Học Tương Tác Unit 4: Flashcards 3D & Ngữ Pháp",
          url: "/lectures/eng12-unit4/index.html",
          type: "INTERACTIVE_STUDIO"
        }
      ],
      is_template: true
    }
  });
  console.log(`✅ Đã tạo Learning Unit ID: ${learningUnit.id}`);

  // 2. Tạo Daily Student Assignment
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: learningUnit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: CONSTANTS.ASSIGNED_DATE,
      custom_session_minutes: 90,
      teacher_daily_note: "Thầy Thức dặn Nam Việt: Hôm nay 25/11/2026 con học Unit 4: Urbanisation (Đô thị hóa). Con mở Phòng Học Tương Tác luyện 15 từ vựng core bằng Flashcard 3D 2 chiều và đọc kỹ 3 chuyên đề Ngữ pháp (Hiện tại hoàn thành, So sánh cơ bản, So sánh kép kèm ví dụ chi tiết và Quick Check) trước khi vào làm 80 câu bài tập đa dạng nhé!",
      is_published: true
    }
  });
  console.log(`✅ Đã tạo Assignment ID: ${assignment.id}`);

  // 3. Tạo Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      title: "Đấu Trường 80 Câu Đa Dạng: Unit 4 - Urbanisation (Từ Vựng Core & Ngữ Pháp)",
      type: "IN_SESSION_90M",
      time_limit_minutes: 90,
      max_score: 10.00
    }
  });
  console.log(`✅ Đã tạo Assessment ID: ${assessment.id}`);

  // 4. Nạp 80 câu hỏi (MULTIPLE_CHOICE & FILL_IN_BLANK)
  const pointsPerQuestion = 10.0 / questions.length; // 0.125 điểm / câu
  const questionRecords = questions.map((q, idx) => {
    if (q.type === 'FILL_IN_BLANK') {
      return {
        assessment_id: assessment.id,
        order_index: idx + 1,
        type: 'FILL_IN_BLANK',
        points: pointsPerQuestion,
        question_payload: {
          content_markdown: q.content,
          accepted_answers: q.acceptedAnswers,
          section_name: q.sectionName
        },
        grading_key_payload: {
          accepted_answers: q.acceptedAnswers,
          explanation_markdown: q.explanation || 'Đáp án chính xác được Thầy Thức biên soạn.'
        }
      };
    }

    return {
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
    };
  });

  await prisma.questions.createMany({ data: questionRecords });

  const verifiedCount = await prisma.questions.count({
    where: { assessment_id: assessment.id }
  });
  console.log(`✅ Đã nạp thành công ${verifiedCount}/80 câu hỏi vào database!`);

  // 5. Tạo Assessment Attempt
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

  console.log(`\n🎉 HOÀN THÀNH TẠO CARD 25/11/2026 CHO BẠN NAM VIỆT!`);
  console.log(`- Assignment ID: ${assignment.id}`);
  console.log(`- Learning Unit ID: ${learningUnit.id}`);
  console.log(`- Assessment ID: ${assessment.id}`);
  console.log(`- Số câu hỏi: ${verifiedCount} câu`);
  console.log(`- Link phòng học tương tác: /lectures/eng12-unit4/index.html`);
  console.log(`- Link làm bài tập: /student/mission/${attempt.id}`);
}

main()
  .catch(err => {
    console.error("❌ Lỗi khi seed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
