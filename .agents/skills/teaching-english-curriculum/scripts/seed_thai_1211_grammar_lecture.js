#!/usr/bin/env node

/**
 * SEED SCRIPT: UNIT 4 GRAMMAR & VOCABULARY LECTURE FOR THÁI (12/11/2026)
 * Thầy Thức - Tiếng Anh 11 (Global Success - Unit 4: ASEAN and Viet Nam)
 * Trọng tâm: Nâng Cấp Toàn Diện 6 Chuyên Đề Danh Động Từ (Gerunds) + Hệ Thống Bài Tập Nhanh (Quick Check Drills) + 24 Từ Vựng Cốt Lõi
 */

const path = require('path');

let PrismaClient;
try {
  PrismaClient = require(path.resolve(__dirname, '../../../../backend/node_modules/@prisma/client')).PrismaClient;
} catch (e) {
  PrismaClient = require('/home/dantey/Dantey/teaching/teachingPlatform/backend/node_modules/@prisma/client').PrismaClient;
}

const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '9208f557-3288-442e-accf-15fc8c763e68', // Bạn Thái (Lớp 11)
  SUBJECT_ID: 'f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0', // ENG_11
  ASSIGNED_DATE: new Date('2026-11-12T00:00:00.000Z')
};

const LECTURE_CONTENT_MARKDOWN = `# 🌟 Cẩm Nang Ngữ Pháp Toàn Diện & 24 Từ Vựng Trọng Tâm Unit 4: ASEAN and Viet Nam
**Biên soạn riêng cho: Bạn Thái (Lớp 11) • Hướng dẫn: Thầy Thức**

Chuyên đề: **Gerunds as Subjects and Objects (Danh Động Từ) & Hệ Thống Bài Tập Nhanh Phản Xạ 8.5+**  
Mục tiêu: **Chinh phục điểm 8.5+ Kì thi Giữa kì & Kì thi Tốt nghiệp THPT Quốc Gia**

[🚀 MỞ PHÒNG HỌC TƯƠNG TÁC TOÀN MÀN HÌNH](/lectures/eng11-unit4/index.html)

---

## 🎯 PHẦN I: BẢN ĐỒ TRI THỨC NGỮ PHÁP UNIT 4 (GERUNDS - DANH ĐỘNG TỪ)

### 1. Bản chất ngôn ngữ của Danh động từ (What is a Gerund?)
- **Hình thức cấu tạo:** Động từ nguyên mẫu thêm hậu tố **\`-ing\`** (\`Verb + -ing\`).
- **Bản chất ngữ pháp:** Là một **danh từ** được tạo sinh từ động từ. Nó mang ý niệm biến một "hành vi/hành động đang diễn tiến" thành một "khái niệm/chủ đề trừu tượng duy nhất".
- **Đặc tính lưỡng tính (Dual Nature) của Gerund:**
  1. *Đặc tính Danh từ (Noun properties):*
     - Có thể giữ vai trò **Chủ ngữ (Subject)** trong câu.
     - Có thể làm **Tân ngữ trực tiếp của động từ (Direct object of verb)**.
     - Có thể làm **Bổ ngữ sau giới từ (Object of preposition)**.
  2. *Đặc tính Động từ (Verb properties):*
     - Vẫn có thể nhận tân ngữ trực tiếp theo sau (VD: *promoting peace* ➔ *peace* là tân ngữ của *promoting*).
     - Vẫn có thể nhận phó từ/trạng từ bổ nghĩa (VD: *cooperating closely* ➔ *closely* bổ nghĩa cho *cooperating*).
     - Có dạng hoàn thành (*Having + V3/ed*) và dạng bị động (*Being + V3/ed* hoặc *Having been + V3/ed*).

---

## ⚡ PHẦN II: 6 CHUYÊN ĐỀ NGỮ PHÁP CHUYÊN SÂU & BÀI TẬP NHANH VẬN DỤNG (QUICK CHECK DRILLS)

---

### 📌 CHUYÊN ĐỀ 1: DANH ĐỘNG TỪ LÀM CHỦ NGỮ (GERUNDS AS SUBJECTS)

Khi muốn diễn đạt một hành động, sự việc hoặc hoạt động đóng vai trò là chủ thể của câu:

$$\\mathbf{V\\text{-ing} + (Tân\\ ngữ / Bổ\\ ngữ) + V_{\\text{số ít (Singular)}}}$$

#### 1. Quy tắc cốt lõi & Cơ chế hòa hợp Chủ - Vị:
- **Nguyên tắc vàng:** Bản thân Danh động từ (*V-ing*) đóng vai trò là **một danh từ trừu tượng đếm không được (ngôi thứ 3 số ít)**.
- **Bẫy đề thi 8.5+ thường gặp nhất:** Đề thi thường chèn một **danh từ số nhiều** làm tân ngữ ngay sau V-ing (VD: *relations, countries, exchanges, traditions...*). Học sinh không vững lập trường sẽ nhìn lướt qua danh từ số nhiều này và chia động từ số nhiều (*are, were, have, require*) ➔ **SAI HOÀN TOÀN!** Động từ chính bắt buộc phải chia ở **ngôi thứ 3 số ít** (*is, was, has, requires, promotes, creates*).

#### 2. Dạng phủ định của Danh động từ:
Thêm trực tiếp từ **\`NOT\`** ngay trước V-ing (tuyệt đối không mượn trợ động từ *don't / doesn't*):
$$\\mathbf{Not + V\\text{-ing} + (O) + V_{\\text{số ít}}}$$

#### 3. Cấu trúc biến đổi giả chủ ngữ:
$$\\mathbf{It + be + Adj + (for\\ sb) + to\\text{-}V \\iff V\\text{-ing} + be + Adj}$$

#### 4. Hệ thống ví dụ thực chiến chủ đề ASEAN & Phân tích ngữ pháp:
- **Ví dụ 1:** **Promoting** regional cultural exchanges **is** vital for mutual understanding.
  - *Dịch nghĩa:* Việc thúc đẩy các hoạt động giao lưu văn hóa khu vực là điều thiết yếu cho sự hiểu biết lẫn nhau.
  - *Grammar Breakdown:* Chủ ngữ: *Promoting* (V-ing) | Tân ngữ của V-ing: *regional cultural exchanges* (số nhiều) | Động từ chính: *is* (chia số ít theo *Promoting*).
- **Ví dụ 2:** **Maintaining** peaceful diplomatic relations with neighbouring nations **requires** continuous dialogue.
  - *Dịch nghĩa:* Việc duy trì các mối quan hệ ngoại giao hòa bình với các quốc gia láng giềng đòi hỏi sự đối thoại liên tục.
  - *Grammar Breakdown:* Chủ ngữ: *Maintaining* | Động từ chính: *requires* (thêm "-s" số ít).
- **Ví dụ 3:** **Not adhering** to the ASEAN Charter **undermines** the credibility of any member state.
  - *Dịch nghĩa:* Việc không tuân thủ Hiến chương ASEAN làm xói mòn uy tín của bất kỳ quốc gia thành viên nào.
  - *Grammar Breakdown:* Phủ định *Not adhering* làm chủ ngữ | Động từ chính: *undermines* (số ít).

---

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 1)

**Câu 1.1:** Preserving traditional customs and national cultural identity ______ a challenging task for many Southeast Asian nations in the era of globalization.  
A. are  
B. is  
C. have been  
D. were  

**Câu 1.2:** Tìm và sửa lỗi sai trong câu sau:  
*Not respect (A) diplomatic protocols during (B) bilateral negotiations causes (C) serious misunderstandings between (D) governments.*  

**Câu 1.3:** Viết lại câu sau bắt đầu bằng Danh động từ:  
*It is essential for young Vietnamese delegates to develop professional leadership skills.*  
➔ Developing ..........................................................................................................  

**Câu 1.4:** Building strong trade partnerships among ASEAN member states ______ economic prosperity across the entire region.  
A. ensure  
B. ensures  
C. ensuring  
D. have ensured  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 1:
> - **Câu 1.1: Chọn B (is).** Chủ ngữ của câu là danh động từ *Preserving* (việc bảo tồn - số ít). Mặc dù có các danh từ số nhiều đứng sau (*customs, nations*), động từ chính vẫn phải chia số ít là *is*.
> - **Câu 1.2: Lỗi sai ở (A) Not respect ➔ Sửa thành: Not respecting.** Đứng ở vị trí chủ ngữ, động từ phải ở dạng danh động từ *V-ing*, dạng phủ định là *Not + V-ing*.
> - **Câu 1.3: Đáp án:** *Developing professional leadership skills is essential for young Vietnamese delegates.* Áp dụng công thức chuyển đổi: $It + be + Adj + to\text{-}V \iff V\text{-ing} + be + Adj$.
> - **Câu 1.4: Chọn B (ensures).** Chủ ngữ là *Building* (V-ing số ít) ➔ động từ chính ở thì Hiện tại đơn phải chia ngôi thứ 3 số ít: *ensures*.

---

### 📌 CHUYÊN ĐỀ 2: DANH ĐỘNG TỪ SAU GIỚI TỪ (GERUNDS AFTER PREPOSITIONS) & 10 CỤM "TO" BẮT BUỘC ĐI VỚI V-ING

Theo nguyên lý ngữ pháp tiếng Anh, sau **giới từ** (*in, on, at, for, of, about, with, without, by, from...*) thì mọi hành động đều bắt buộc phải biến thành danh từ, tức ở dạng **V-ing**:

$$\\mathbf{Preposition + V\\text{-ing}}$$

#### 🔥 BẢNG VÀNG 10 CỤM TỪ CÓ GIỚI TỪ "TO" BẮT BUỘC ĐI VỚI V-ING (CỰC HAY BẪY ĐIỂM 8.5+):
*Lưu ý phân biệt then chốt:* Trong tiếng Anh, chữ "to" thường là dấu hiệu của động từ nguyên mẫu có 'to' (*to-infinitive*), nhưng ở 10 cụm đặc biệt dưới đây, **"TO" LÀ MỘT GIỚI TỪ (PREPOSITION)**. Vì vậy sau nó **BẮT BUỘC PHẢI DÙNG V-ING** (hoặc Danh từ), tuyệt đối không dùng động từ nguyên mẫu:

| STT | Cụm từ cố định | Nghĩa tiếng Việt | Câu ví dụ thực tế chủ đề ASEAN (Kèm phân tích) |
| :---: | :--- | :--- | :--- |
| **1** | **contribute to + V-ing** | Đóng góp tích cực vào việc gì | *Viet Nam actively contributes to **maintaining** maritime stability.* <br>*(Việt Nam đóng góp tích cực vào việc duy trì ổn định hàng hải.)* |
| **2** | **look forward to + V-ing** | Trông mong, háo hức chờ đợi điều gì | *Youth leaders look forward to **attending** the regional climate summit.* <br>*(Các thủ lĩnh trẻ rất háo hức tham dự hội nghị thượng đỉnh khí hậu khu vực.)* |
| **3** | **be / get used to + V-ing** | Quen thuộc với việc làm gì | *Diplomats are well used to **working** in highly diverse environments.* <br>*(Các nhà ngoại giao đã rất quen với việc công tác trong môi trường đa dạng.)* |
| **4** | **be committed to + V-ing** | Cam kết, tận tâm thực hiện điều gì | *All member states are committed to **upholding** the ASEAN Charter.* <br>*(Tất cả quốc gia thành viên đều cam kết giữ vững Hiến chương ASEAN.)* |
| **5** | **object to + V-ing** | Phản đối, bài bác việc làm gì | *Several delegates objected to **prolonging** the trade negotiations.* <br>*(Một số đại biểu phản đối việc kéo dài các cuộc đàm phán thương mại.)* |
| **6** | **be dedicated / devoted to + V-ing** | Cống hiến, tận tụy vì điều gì | *She has dedicated herself to **fostering** cultural exchanges among youth.* <br>*(Cô ấy cống hiến hết mình cho việc thúc đẩy giao lưu văn hóa thanh niên.)* |
| **7** | **in addition to + V-ing** | Bên cạnh / Ngoài việc làm gì ra | *In addition to **promoting** tourism, the forum discussed digital security.* <br>*(Bên cạnh việc quảng bá du lịch, diễn đàn còn thảo luận về an ninh số.)* |
| **8** | **with a view to + V-ing** | Với mục đích / Nhằm mục đích làm gì | *The workshop was organized with a view to **sharing** educational models.* <br>*(Hội thảo được tổ chức nhằm chia sẻ các mô hình giáo dục tiên tiến.)* |
| **9** | **prior to + V-ing** | Trước khi làm việc gì (= before + V-ing) | *Prior to **joining** ASEAN in 1995, Viet Nam initiated comprehensive reforms.* <br>*(Trước khi gia nhập ASEAN năm 1995, Việt Nam đã khởi xướng Đổi mới toàn diện.)* |
| **10** | **admit / confess to + V-ing** | Thú nhận, thừa nhận đã làm gì | *The suspect admitted to **violating** international environmental laws.* <br>*(Nghi phạm đã thừa nhận hành vi vi phạm các luật môi trường quốc tế.)* |

#### Các cấu trúc giới từ phổ biến khác:
- **succeed in + V-ing:** thành công trong việc gì (*They succeeded in concluding the trade pact.*)
- **prevent / stop sb from + V-ing:** ngăn chặn ai làm gì (*Effective policies prevent youth from dropping out of school.*)
- **apologize to sb for + V-ing:** xin lỗi ai vì việc gì (*He apologized for being late to the ASEAN dinner.*)
- **by + V-ing** (bằng cách thức nào) $\neq$ **without + V-ing** (mà không làm điều gì):
  - *Nations resolve disputes **by holding** bilateral negotiations.*
  - *No resolution can be finalized **without reaching** common consensus.*

---

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 2)

**Câu 2.1:** High-ranking representatives of the ten member nations are looking forward to ______ in the opening ceremony of the 43rd ASEAN Summit.  
A. participate  
B. participating  
C. participated  
D. have participated  

**Câu 2.2:** Viet Nam has shown strong commitment to ______ peace, security, and economic cooperation across the Asia-Pacific region.  
A. maintain  
B. maintained  
C. maintaining  
D. maintenance  

**Câu 2.3:** In addition to ______ humanitarian assistance to flood victims, the charity group organized free language classes for local children.  
A. provide  
B. provided  
C. providing  
D. to providing  

**Câu 2.4:** The committee held an urgent meeting with a view to ______ solutions for cross-border haze pollution.  
A. find  
B. finding  
C. to find  
D. found  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 2:
> - **Câu 2.1: Chọn B (participating).** Cấu trúc cố định: *look forward to + V-ing* (chữ 'to' là giới từ).
> - **Câu 2.2: Chọn C (maintaining).** Cụm từ: *commitment to + V-ing* (cam kết làm việc gì).
> - **Câu 2.3: Chọn C (providing).** Cụm từ: *in addition to + V-ing* (bên cạnh việc làm gì).
> - **Câu 2.4: Chọn B (finding).** Cụm từ: *with a view to + V-ing* (nhằm mục đích làm gì). Thí sinh không nắm vững cụm này thường chọn lầm *A. find* vì nghĩ là *to + V*.

---

### 📌 CHUYÊN ĐỀ 3: ĐỘNG TỪ THEO SAU BỞI V-ING & 8 THÀNH NGỮ CỐ ĐỊNH (IDIOMATIC EXPRESSIONS)

#### 1. Hệ thống động từ bắt buộc đi với V-ing (chia theo 3 trường nghĩa cốt lõi):
- **Trường nghĩa 1 - Cảm xúc & Thái độ:** *enjoy, fancy, adore, dislike, detest, mind, tolerate, appreciate*
  - *Ví dụ:* Ambassador Minh **appreciated receiving** enthusiastic support from host-country volunteers.
- **Trường nghĩa 2 - Tiến trình hành động & Trì hoãn:** *admit, avoid, delay, postpone, put off, finish, practise, keep (on), quit, give up, risk*
  - *Ví dụ:* Diplomats must **avoid creating** tense situations during closed-door meetings.
  - *Ví dụ:* They **postponed signing** the multilateral agreement pending legal verification.
- **Trường nghĩa 3 - Đề xuất & Cân nhắc:** *suggest, recommend, consider, imagine, involve*
  - *Ví dụ:* The youth council **suggested establishing** an ASEAN exchange fund for impoverished students.

#### 2. Bảng 8 Thành ngữ cố định (Idiomatic Expressions) luôn đi với V-ing:
1. **can't help / can't stand / can't bear + V-ing:** không thể không / không thể nhịn được / không chịu nổi làm gì
   - *I couldn't help **admiring** the exceptional solidarity displayed by the volunteers.*
2. **it's no use / it's no good + V-ing:** vô ích, chẳng có tác dụng gì khi làm gì
   - *It's no use **complaining** about procedural delays; let's find alternative solutions.*
3. **there is no point in + V-ing:** chẳng có lý do/ích lợi gì khi làm gì
   - *There is no point in **debating** unverified rumors on social media.*
4. **be worth + V-ing:** đáng giá, rất đáng để làm điều gì
   - *The ASEAN Heritage Park documentary is well worth **watching**.*
5. **spend time / money + (on) + V-ing:** dành thời gian/tiền bạc vào việc gì
   - *Thai spent three hours **researching** the historical formation of ASEAN.*
6. **waste time / money + (on) + V-ing:** lãng phí thời gian/tiền bạc vào việc gì
   - *Do not waste time **arguing** over minor clerical mistakes.*
7. **have difficulty / trouble (in) + V-ing:** gặp khó khăn, trở ngại khi làm gì
   - *International delegates had some difficulty in **pronouncing** traditional Vietnamese dish names.*
8. **be busy + V-ing:** bận rộn làm việc gì
   - *The reception team is busy **preparing** welcome packs for foreign dignitaries.*

---

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 3)

**Câu 3.1:** The minister suggested ______ an annual cultural festival to celebrate the founding anniversary of ASEAN.  
A. to organize  
B. organizing  
C. organized  
D. organize  

**Câu 3.2:** It is no use ______ about the strict visa requirements; we had better prepare all necessary documentation promptly.  
A. to complain  
B. complain  
C. complaining  
D. complained  

**Câu 3.3:** Many international students had great difficulty ______ the rapid rhythm of the diplomatic debate sessions.  
A. following  
B. to follow  
C. followed  
D. follow  

**Câu 3.4:** This historical research paper on ASEAN integration is definitely worth ______ before your presentation.  
A. read  
B. reading  
C. to read  
D. having read  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 3:
> - **Câu 3.1: Chọn B (organizing).** Cấu trúc: *suggest + V-ing* (gợi ý/đề xuất làm việc gì).
> - **Câu 3.2: Chọn C (complaining).** Thành ngữ cố định: *It is no use + V-ing* (vô ích khi làm gì).
> - **Câu 3.3: Chọn A (following).** Thành ngữ cố định: *have difficulty (in) + V-ing* (gặp khó khăn khi làm gì).
> - **Câu 3.4: Chọn B (reading).** Thành ngữ: *be worth + V-ing* (đáng để đọc).

---

### 📌 CHUYÊN ĐỀ 4: 6 CẶP ĐỘNG TỪ CHUYỂN ĐỔI Ý NGHĨA GIỮA TO-V VÀ V-ING (PHÂN HÓA ĐIỂM 8.5+)

Đây là "mảnh đất màu mỡ" của người ra đề thi THPT và Giữa kì. Hãy nắm vững ma trận bản chất thời gian và sắc thái hành động:

| Động từ | Cấu trúc \`+ To-V\` (Nghĩa & Ngữ cảnh) | Cấu trúc \`+ V-ing\` (Nghĩa & Ngữ cảnh) |
| :--- | :--- | :--- |
| **1. REMEMBER** | **Nhớ phải làm việc gì** (hướng tới tương lai, bổn phận, trách nhiệm).<br>*VD:* Remember **to bring** your passport to the airport. | **Nhớ một ký ức/trải nghiệm đã qua** (hướng về quá khứ).<br>*VD:* I still remember **visiting** the Jakarta Secretariat in 2024. |
| **2. FORGET** | **Quên phải làm điều gì** (bỏ quên nhiệm vụ chưa làm).<br>*VD:* Don't forget **to submit** the essay on ASEAN values. | **Quên một ký ức đã từng trải qua** (thường dùng: *will never forget*).<br>*VD:* Thai will never forget **delivering** his keynote speech. |
| **3. REGRET** | **Lấy làm tiếc phải thông báo điều buồn** (thường đi với *inform, announce, say, tell*).<br>*VD:* We regret **to announce** that the workshop is canceled. | **Hối hận, tiếc nuối vì đã trót làm điều gì** trong quá khứ.<br>*VD:* She regretted **not applying** for the ASEAN scholarship. |
| **4. STOP** | **Dừng việc đang làm lại ĐỂ LÀM việc khác** (chỉ mục đích - Purpose).<br>*VD:* The delegates stopped **to drink** water during the break. | **Dừng hẳn, từ bỏ một hành động/thói quen** (ngừng vĩnh viễn hoặc tạm thời).<br>*VD:* Leaders urged countries to stop **dumping** plastic into the ocean. |
| **5. TRY** | **Cố gắng, nỗ lực hết sức** để vượt qua khó khăn thực hiện việc gì.<br>*VD:* Viet Nam is trying **to accelerate** digital transformation. | **Thử nghiệm một phương pháp/giải pháp mới** xem kết quả ra sao.<br>*VD:* If emails fail, try **contacting** the liaison officer via Telegram. |
| **6. NEED** | **Ai đó cần phải làm gì** (nghĩa chủ động: S là người).<br>*VD:* We need **to prepare** all speech drafts carefully. | **Cái gì cần ĐƯỢC làm / sửa chữa** (nghĩa bị động $= need\ to\ be\ V3/ed$).<br>*VD:* The ASEAN database needs **updating** (= needs to be updated). |

---

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 4)

**Câu 4.1:** On their way to the ASEAN Secretariat building, the delegates stopped ______ some fuel for their service vehicle.  
A. get  
B. getting  
C. to get  
D. got  

**Câu 4.2:** I distinctly remember ______ the Minister of Foreign Affairs at the bilateral summit three years ago.  
A. meet  
B. meeting  
C. to meet  
D. met  

**Câu 4.3:** We deeply regret ______ you that your application for the ASEAN Youth Ambassador programme was unsuccessful.  
A. to inform  
B. informing  
C. inform  
D. informed  

**Câu 4.4:** The official translation of the ASEAN trade protocol is inaccurate; it definitely needs ______ before publication.  
A. to revise  
B. revising  
C. revise  
D. revised  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 4:
> - **Câu 4.1: Chọn C (to get).** Dừng lại *để lấy* nhiên liệu (chỉ mục đích) ➔ Dùng *stop to-V*. Nếu chọn *getting* có nghĩa là từ bỏ thói quen đổ xăng ➔ vô nghĩa.
> - **Câu 4.2: Chọn B (meeting).** Nhớ lại một ký ức/sự kiện đã xảy ra trong quá khứ (*three years ago*) ➔ Dùng *remember + V-ing*.
> - **Câu 4.3: Chọn A (to inform).** Lấy làm tiếc phải thông báo một tin không vui ➔ Dùng *regret to inform sb*.
> - **Câu 4.4: Chọn B (revising).** Chủ ngữ là vật (*The official translation* - bản dịch), mang nghĩa bị động: cần *được chỉnh sửa* ➔ Dùng *need + V-ing* ($= need\ to\ be\ revised$).

---

### 📌 CHUYÊN ĐỀ 5: DANH ĐỘNG TỪ HOÀN THÀNH & BỊ ĐỘNG (PERFECT & PASSIVE GERUNDS)

#### 1. Cơ chế bản chất & Sơ đồ thời gian (Timeline):
- Khi một hành động làm bổ ngữ/tân ngữ diễn ra **cùng thời điểm hoặc sau** hành động chính, ta dùng **V-ing đơn thuần** (Simple Gerund).
- Khi ta muốn **nhấn mạnh một cách dứt khoát rằng hành động đó đã diễn ra và HOÀN TẤT TRƯỚC** thời điểm của động từ chính trong mệnh đề, ta bắt buộc phải sử dụng **Danh động từ Hoàn thành (Perfect Gerund)**:

$$\begin{aligned}
\text{Quá khứ hoàn tất trước} &\longrightarrow \text{Hành động của động từ chính} \\
\mathbf{Having + V_{3/ed}} &\longrightarrow \mathbf{V_{\text{main}}}
\end{aligned}$$

#### 2. Các công thức biến thể:
- **Dạng chủ động (Active):** $\\mathbf{Having + V_{3/ed}}$
- **Dạng bị động (Passive):** $\\mathbf{Having + been + V_{3/ed}}$
- **Dạng phủ định (Negative):** $\\mathbf{Not + having + (been) + V_{3/ed}}$

#### 3. Các động từ và cấu trúc thường xuyên xuất hiện với Perfect Gerunds:
*admit, deny, regret, apologize for, thank sb for, congratulate sb on, accuse sb of, be praised for, be punished for, suspect sb of...*

#### 4. Ví dụ thực chiến & Phân tích ngữ pháp:
- **Ví dụ 1 (Chủ động):** The delegate **admitted having signed** the preliminary agreement without prior authorization.
  - *Dịch nghĩa:* Vị đại biểu thừa nhận trước đó đã ký thỏa thuận sơ bộ mà không có sự ủy quyền trước.
  - *Phân tích:* Hành động "ký" (*having signed*) xảy ra và hoàn tất trước thời điểm "thừa nhận" (*admitted*).
- **Ví dụ 2 (Bị động):** The young volunteer was proud of **having been awarded** the ASEAN Youth Certificate of Merit.
  - *Dịch nghĩa:* Bạn tình nguyện viên trẻ tự hào vì trước đó đã được trao tặng Bằng khen Thanh niên ASEAN.
  - *Phân tích:* Tình nguyện viên là đối tượng *được nhận thưởng* trong quá khứ ➔ Dùng bị động hoàn thành: *having been awarded*.
- **Ví dụ 3 (Phủ định):** He apologized for **not having submitted** the project proposal on time.
  - *Dịch nghĩa:* Anh ấy xin lỗi vì trước đó đã không nộp bản đề xuất dự án đúng hạn.

---

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 5)

**Câu 5.1:** The former spokesperson denied ______ confidential discussion records of the summit to foreign journalists.  
A. to leak  
B. having leaked  
C. have leaked  
D. be leaked  

**Câu 5.2:** Viet Nam was highly praised by international partners for ______ successfully as the ASEAN Chair in 2020.  
A. having served  
B. to have served  
C. served  
D. have been serving  

**Câu 5.3:** The student was accused of ______ copied large portions of his ASEAN essay directly from the Internet.  
A. have  
B. having  
C. had  
D. having been  

**Câu 5.4:** She expressed deep gratitude for ______ selected as the youth representative for Viet Nam at the youth camp.  
A. having  
B. having been  
C. being  
D. to have been  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 5:
> - **Câu 5.1: Chọn B (having leaked).** Hành động "làm rò rỉ" diễn ra trước hành động "phủ nhận" (*denied*) ➔ dùng Perfect Gerund *having leaked*.
> - **Câu 5.2: Chọn A (having served).** Sau giới từ *for*, hành động đảm nhiệm chức chủ tịch đã hoàn thành trong năm 2020 (trước thời điểm được khen ngợi) ➔ *for having served*.
> - **Câu 5.3: Chọn B (having).** Cấu trúc: *accuse sb of + having V3/ed* (buộc tội ai vì trước đó đã làm gì).
> - **Câu 5.4: Chọn B (having been).** Chủ ngữ được tuyển chọn (nghĩa bị động) trong quá khứ trước đó ➔ Dùng Passive Perfect Gerund: *for having been selected*.

---

### 📌 CHUYÊN ĐỀ 6: 6 DẠNG BÀI VIẾT LẠI CÂU KINH ĐIỂN VỚI GERUNDS TRONG ĐỀ THI THPT & GIỮA KÌ

Nắm chắc 6 công thức biến đổi tương đương này để chinh phục trọn vẹn điểm số phần tự luận hoặc trắc nghiệm câu đồng nghĩa:

#### Dạng 1: Câu đề xuất / Gợi ý hành động
$$\\mathbf{Let's / Why\\ don't\\ we / Shall\\ we / How\\ about + V \\implies S + suggested + V\\text{-ing}}$$
- *Đề thi:* "Why don't we organize a seminar on cultural identity among ASEAN youth?" said Nam.
- ➔ **Nam suggested organizing a seminar on cultural identity among ASEAN youth.**

#### Dạng 2: Câu "Vô ích / Chẳng có ý nghĩa gì khi làm gì"
$$\\mathbf{It\\ is\\ pointless / meaningless / no\\ use + to\\text{-}V \\implies There\\ is\\ no\\ point\\ in + V\\text{-ing} = It\\ is\\ no\\ use + V\\text{-ing}}$$
- *Đề thi:* It is completely pointless to argue about tariff details without clear market data.
- ➔ **There is no point in arguing about tariff details without clear market data.**

#### Dạng 3: Câu "Dành / Tiêu tốn thời gian làm gì"
$$\\mathbf{It\\ takes/took + sb + [thời\\ gian] + to\\text{-}V \\implies S + spend/spent + [thời\\ gian] + (on) + V\\text{-ing}}$$
- *Đề thi:* It took the diplomatic committee three days to draft the joint declaration.
- ➔ **The diplomatic committee spent three days drafting the joint declaration.**

#### Dạng 4: Câu "Nhắc nhở / Ký ức quá khứ"
$$\\mathbf{Remember\\ to\\text{-}V \\iff Don't\\ forget\\ to\\text{-}V}$$
$$\\mathbf{S + remembered\\ that\\ S\\ had\\ done\\ sth \\implies S + remembered + (having) + V_{3/ed}}$$
- *Đề thi:* "Please remember to verify your official badge before entering the hall," the guard said.
- ➔ **The guard reminded delegates to verify their official badges before entering the hall.**
- ➔ **Don't forget to verify your official badge before entering the hall.**

#### Dạng 5: Câu "Thừa nhận / Phủ nhận việc trong quá khứ"
$$\\mathbf{S + admitted / denied\\ that\\ S\\ had\\ done\\ sth \\implies S + admitted / denied + (having) + V_{3/ed}}$$
- *Đề thi:* "I took the confidential draft from the conference table," admitted the reporter.
- ➔ **The reporter admitted having taken the confidential draft from the conference table.**
- *Đề thi:* "I did not disclose internal voting results," the ambassador emphasized.
- ➔ **The ambassador denied having disclosed internal voting results.**

#### Dạng 6: Câu "Gặp khó khăn khi thực hiện hành động"
$$\\mathbf{It\\ was\\ difficult / hard\\ for\\ sb\\ to\\text{-}V \\implies S + had\\ difficulty / trouble\\ (in) + V\\text{-ing}}$$
- *Đề thi:* It was difficult for fresh graduates to adapt to multicultural working styles.
- ➔ **Fresh graduates had difficulty (in) adapting to multicultural working styles.**

---

#### 🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK - CHUYÊN ĐỀ 6)

**Câu 6.1:** Viết lại câu sau dùng \`suggested + V-ing\`:  
*"Why don't we set up a regional youth volunteer network?" the president said.*  
➔ The president ....................................................................................................  

**Câu 6.2:** Viết lại câu sau dùng \`There is no point in\`:  
*It is useless to worry about the speech delivery when you have prepared thoroughly.*  
➔ There is no point ...............................................................................................  

**Câu 6.3:** Viết lại câu sau dùng \`spent\`:  
*It took Thai two weeks to complete his presentation on ASEAN solidarity.*  
➔ Thai spent ..........................................................................................................  

**Câu 6.4:** Viết lại câu sau dùng \`denied + having V3/ed\`:  
*"I did not reveal any confidential information to unauthorized persons," the officer said.*  
➔ The officer denied ............................................................................................  

> #### 📝 ĐÁP ÁN & GIẢI THÍCH CHI TIẾT - CHUYÊN ĐỀ 6:
> - **Câu 6.1: Đáp án:** *The president suggested setting up a regional youth volunteer network.*
> - **Câu 6.2: Đáp án:** *There is no point in worrying about the speech delivery when you have prepared thoroughly.*
> - **Câu 6.3: Đáp án:** *Thai spent two weeks completing his presentation on ASEAN solidarity.*
> - **Câu 6.4: Đáp án:** *The officer denied having revealed any confidential information to unauthorized persons.*

---

## 📚 PHẦN III: BẢNG 24 TỪ VỰNG CỐT LÕI UNIT 4 (ÔN TẬP TỪ NGÀY 10/11/2026)
Hệ thống 24 từ vựng then chốt kết hợp phiên âm IPA, từ loại, nghĩa tiếng Việt, Collocation thực chiến và câu ví dụ ứng dụng trực tiếp ngữ pháp Gerunds:

| STT | Từ vựng | Phiên âm IPA | Từ loại | Nghĩa tiếng Việt | Cụm từ đi kèm (Collocations) | Câu ví dụ ứng dụng Gerund |
| :---: | :--- | :--- | :---: | :--- | :--- | :--- |
| **1** | **Association** | \`/əˌsəʊsiˈeɪʃn/\` | n. | Hiệp hội, đoàn thể | *regional association*, *member of the association* | **Establishing** an effective association requires mutual commitment among all member states. |
| **2** | **Cooperation** | \`/kəʊˌɒpəˈreɪʃn/\` | n. | Sự hợp tác | *regional cooperation*, *economic cooperation* | Leaders focused on **strengthening** economic cooperation across Southeast Asia. |
| **3** | **Integration** | \`/ˌɪntɪˈɡreɪʃn/\` | n. | Sự hội nhập | *economic integration*, *regional integration* | Viet Nam has succeeded in **achieving** comprehensive international integration. |
| **4** | **Solidarity** | \`/ˌsɒlɪˈdærəti/\` | n. | Tình đoàn kết, gắn bó | *regional solidarity*, *show solidarity with* | Member nations showed solidarity by **providing** immediate humanitarian relief supplies. |
| **5** | **Stability** | \`/stəˈbɪləti/\` | n. | Sự ổn định, bền vững | *political stability*, *maintain stability* | **Maintaining** political stability is essential for attracting long-term foreign investment. |
| **6** | **Maintain** | \`/meɪnˈteɪn/\` | v. | Duy trì, gìn giữ | *maintain peace*, *maintain relations* | All member countries are committed to **maintaining** regional maritime peace. |
| **7** | **Promote** | \`/prəˈməʊt/\` | v. | Thúc đẩy, quảng bá | *promote growth*, *promote understanding* | **Promoting** cultural understanding prevents unnecessary diplomatic disputes. |
| **8** | **Motto** | \`/ˈmɒtəʊ/\` | n. | Khẩu hiệu, phương châm | *official motto*, *adopt a motto* | Delegates remembered **chanting** the ASEAN motto: "One Vision, One Identity, One Community". |
| **9** | **Charter** | \`/ˈtʃɑːtə(r)/\` | n. | Hiến chương | *ASEAN Charter*, *sign the charter* | There was no point in **debating** the legal validity of the signed charter. |
| **10** | **Bloc** | \`/blɒk/\` | n. | Khối liên minh | *regional bloc*, *trade bloc* | By **joining** the regional bloc, countries enjoy preferential commercial tariffs. |
| **11** | **Cultural exchange** | \`/ˌkʌltʃərəl ɪksˈtʃeɪndʒ/\` | n. phr. | Giao lưu văn hóa | *youth cultural exchange*, *organize exchanges* | Youth representatives look forward to **taking part in** the annual cultural exchange. |
| **12** | **Involve in** | \`/ɪnˈvɒlv ɪn/\` | v. / adj. | Tham gia, can dự vào | *be involved in*, *actively involve in* | She enjoyed **being involved in** volunteer community initiatives across the region. |
| **13** | **Represent** | \`/ˌreprɪˈzent/\` | v. | Đại diện cho | *represent the country*, *represent youth* | **Representing** the nation at the international summit is a remarkable honor. |
| **14** | **Representative** | \`/ˌreprɪˈzentətɪv/\` | n., adj. | Người đại diện; tiêu biểu | *youth representative*, *official representative* | The ambassador suggested **inviting** dynamic youth representatives to the dialogue. |
| **15** | **Participant** | \`/pɑːˈtɪsɪpənt/\` | n. | Người tham gia | *active participant*, *summit participant* | Many participants had difficulty in **adapting** to the intensive debate schedule. |
| **16** | **Volunteer** | \`/ˌvɒlənˈtɪə(r)/\` | n., v. | Tình nguyện viên; tình nguyện | *youth volunteer*, *volunteer for projects* | He admitted **having volunteered** for the ASEAN disaster relief mission last year. |
| **17** | **Scholarship** | \`/ˈskɒləʃɪp/\` | n. | Học bổng | *win a scholarship*, *prestigious scholarship* | Thai spent months **preparing** his portfolio with a view to **winning** an ASEAN scholarship. |
| **18** | **Leadership** | \`/ˈliːdəʃɪp/\` | n. | Năng lực lãnh đạo | *leadership skills*, *strong leadership* | **Developing** youth leadership skills will pave the way for a prosperous community. |
| **19** | **Diversity** | \`/daɪˈvɜːsəti/\` | n. | Sự đa dạng | *cultural diversity*, *rich diversity* | Respecting cultural diversity prevents people from **making** biased assumptions. |
| **20** | **Identity** | \`/aɪˈdentəti/\` | n. | Bản sắc, danh tính | *cultural identity*, *national identity* | Viet Nam has succeeded in **preserving** national identity while **integrating** globally. |
| **21** | **Prosperous** | \`/ˈprɒspərəs/\` | adj. | Thịnh vượng, phồn vinh | *prosperous nation*, *prosperous region* | All member states strive towards **building** a prosperous and harmonious community. |
| **22** | **Prosperity** | \`/prɒˈsperəti/\` | n. | Sự phồn vinh, thịnh vượng | *economic prosperity*, *shared prosperity* | Contributing to regional prosperity is the common responsibility of every citizen. |
| **23** | **Contribution** | \`/ˌkɒntrɪˈbjuːʃn/\` | n. | Sự đóng góp, cống hiến | *make a contribution to*, *valuable contribution* | She was praised for **having made** significant contributions to the green ASEAN project. |
| **24** | **Strengthen** | \`/ˈstreŋkθn/\` | v. | Củng cố, tăng cường | *strengthen ties*, *strengthen solidarity* | The conference succeeded in **strengthening** bilateral friendship and diplomatic bonds. |

---

## 💡 PHẦN IV: LỜI DẶN DÒ TỪ THẦY THỨC
1. **Luyện tập phản xạ tích cực:** Bấm vào liên kết **[Phòng Học Tương Tác Unit 4](/lectures/eng11-unit4/index.html)** ở đầu bài giảng để luyện tập:
   - Tab **Lý Thuyết & 24 Từ Vựng**: Lướt lại 6 Chuyên đề Ngữ pháp Danh Động Từ và làm các bài tập trắc nghiệm nhanh (Interactive Quick Drills) có chấm điểm đổi màu tức thì.
   - Tab **Flashcard 3D**: Luyện 2 chiều (Anh ➔ Việt và Việt ➔ Anh) cho 24 từ vựng cốt lõi.
   - Tab **Cụm từ (Collocations)** & **Active Recall**: Củng cố phản xạ ghép từ tự nhiên.
2. **Ghi nhớ các trọng tâm bất biến:**
   - 10 cụm từ có giới từ "TO" đi với V-ing (*contribute to, look forward to, be committed to, object to...*).
   - Sự khác biệt về nghĩa của *remember, forget, regret, stop, try, need*.
   - Quy tắc V-ing làm chủ ngữ thì động từ chính **luôn chia số ít**.
3. **Thực hành viết:** Tự đặt ít nhất 3 câu tiếng Anh ứng dụng danh động từ kết hợp với các từ vựng *cooperation, integration, solidarity* để chuẩn bị cho buổi luyện đề 80 câu trắc nghiệm nhé!
`;

async function main() {
  console.log('🚀 Đang kiểm tra và cập nhật card bài giảng ngày 12/11/2026 cho Bạn Thái...');

  const startOfDay = new Date('2026-11-12T00:00:00.000Z');
  const endOfDay = new Date('2026-11-12T23:59:59.999Z');

  const existingAssignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: { gte: startOfDay, lte: endOfDay }
    },
    include: { learning_units: true }
  });

  const unitTitle = 'Unit 4: ASEAN and Viet Nam - Cẩm Nang Ngữ Pháp Toàn Diện Gerunds & 24 Từ Vựng Cốt Lõi';
  const unitDescription = 'Chuyên đề Ngữ pháp Trọng tâm Unit 4 Tiếng Anh 11 Global Success: Phân tích toàn diện 6 Chuyên đề Danh động từ (Gerunds as subjects, objects of prepositions & verbs, 6 động từ chuyển nghĩa, Perfect Gerunds, 6 dạng viết lại câu) kết hợp 24 từ vựng ASEAN and Viet Nam với hệ thống ví dụ song ngữ và bộ bài tập nhanh (Quick Check Drills) mục tiêu 8.5+.';
  const teacherNote = 'Thầy Thức dặn Thái: Hôm nay con học chuyên sâu 6 Chuyên đề Ngữ pháp Danh Động Từ (Gerunds) kết hợp ôn tập 24 từ vựng Unit 4. Sau mỗi chuyên đề, con làm ngay bộ bài tập nhanh (Quick Check Drills) và đối chiếu đáp án giải thích chi tiết, đồng thời vào Phòng học tương tác để luyện trắc nghiệm phản xạ nhé!';

  if (existingAssignment) {
    console.log(`⚠️ Đã tồn tại bài học ngày 12/11/2026 (ID: ${existingAssignment.id}). Đang cập nhật nội dung bài giảng...`);

    // Cập nhật learning_unit
    await prisma.learning_units.update({
      where: { id: existingAssignment.learning_unit_id },
      data: {
        title: unitTitle,
        description: unitDescription,
        lecture_content_markdown: LECTURE_CONTENT_MARKDOWN
      }
    });

    // Cập nhật assignment
    await prisma.daily_student_assignments.update({
      where: { id: existingAssignment.id },
      data: {
        teacher_daily_note: teacherNote,
        is_published: true
      }
    });

    console.log('✅ Đã cập nhật thành công bài học ngày 12/11/2026 trên Database!');
    return;
  }

  // 1. Tạo mới Learning Unit nếu chưa có
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: unitTitle,
      description: unitDescription,
      lecture_content_markdown: LECTURE_CONTENT_MARKDOWN,
      is_template: true
    }
  });
  console.log(`✅ Đã tạo Learning Unit: ${unit.id}`);

  // 2. Tạo Daily Student Assignment
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: CONSTANTS.ASSIGNED_DATE,
      custom_session_minutes: 90,
      teacher_daily_note: teacherNote,
      is_published: true
    }
  });
  console.log(`✅ Đã tạo Daily Assignment card ngày 12/11/2026: ${assignment.id}`);

  console.log('\n🎉 HOÀN THÀNH CẬP NHẬT BÀI GIẢNG NGỮ PHÁP UNIT 4 CHO BẠN THÁI NGÀY 12/11/2026!\n');
}

main()
  .catch(err => {
    console.error('❌ Lỗi cập nhật bài giảng:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
