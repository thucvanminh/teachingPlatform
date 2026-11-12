#!/usr/bin/env node

/**
 * SEED SCRIPT: UNIT 4 GRAMMAR & VOCABULARY LECTURE FOR THÁI (12/11/2026)
 * Thầy Thức - Tiếng Anh 11 (Global Success - Unit 4: ASEAN and Viet Nam)
 * Trọng tâm: Danh Động Từ (Gerunds as Subjects & Objects) + Ôn tập 24 Từ vựng cốt lõi từ 10/11/2026
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

const LECTURE_CONTENT_MARKDOWN = `# 🌟 Cẩm Nang Ngữ Pháp Trọng Tâm & 24 Từ Vựng Unit 4: ASEAN and Viet Nam
**Biên soạn riêng cho Bạn Thái (Lớp 11) • Hướng dẫn: Thầy Thức**

Chuyên đề: **Gerunds as Subjects and Objects (Danh Động Từ) & 24 Từ Vựng Cốt Lõi**
Mục tiêu: **Chinh phục điểm 8.5+ Kì thi Giữa kì & THPT Quốc Gia**

[🚀 MỞ PHÒNG HỌC TƯƠNG TÁC TOÀN MÀN HÌNH](/lectures/eng11-unit4/index.html)

---

## 🎯 PHẦN I: BẢN ĐỒ TRI THỨC NGỮ PHÁP UNIT 4 (GERUNDS - DANH ĐỘNG TỪ)

### 1. Bản chất của Danh động từ (What is a Gerund?)
- **Hình thức:** Động từ thêm đuôi **\`-ing\`** (\`Verb + -ing\`).
- **Bản chất:** Là một **danh từ** được hình thành từ động từ, dùng để gọi tên một hành động, sự việc hoặc hoạt động.
- **Đặc tính kép của Gerund:**
  1. *Tính chất Danh từ:* Có thể đứng ở vị trí **Chủ ngữ (Subject)**, **Tân ngữ của giới từ (Object of preposition)**, hoặc **Tân ngữ trực tiếp của động từ (Direct object)**.
  2. *Tính chất Động từ:* Vẫn có thể nhận tân ngữ theo sau (\`promoting peace\`) hoặc đi kèm trạng từ (\`cooperating closely\`).

---

## ⚡ PHẦN II: 5 CHUYÊN ĐỀ NGỮ PHÁP TRỌNG TÂM KÈM VÍ DỤ SONG NGỮ

### 📌 Chuyên đề 1: Danh Động Từ Làm Chủ Ngữ (Gerunds as Subjects)
Khi muốn diễn tả một hành động, thói quen hoặc hoạt động làm chủ thể thực hiện hành vi trong câu:

$$\\mathbf{V\\text{-ing} + (Tân\\ ngữ / Trạng\\ từ) + V_{\\text{số ít (singular)}}}$$

#### Quy tắc vàng & Bẫy đề thi điểm 8.5+:
1. **Động từ chính LUÔN chia ở số ít:** Dù tân ngữ đứng sau V-ing có ở dạng số nhiều đi nữa, động từ chính theo sau **vẫn luôn chia ở ngôi thứ 3 số ít** (\`is, was, has, requires, promotes, creates...\`).
   - *Ví dụ 1:* **Promoting** regional cultural exchanges **is** essential for solidarity.
     *(Việc thúc đẩy các hoạt động giao lưu văn hóa khu vực là điều thiết yếu cho tình đoàn kết.)*
     *(Bẫy thi: Thí sinh dễ nhìn thấy "cultural exchanges" số nhiều mà chọn nhầm "are" ➔ SAI! Chủ ngữ là hành động "Promoting" nên phải chia "is").*
   - *Ví dụ 2:* **Maintaining** peaceful relations with neighbouring countries **requires** mutual trust.
     *(Việc duy trì quan hệ hòa bình với các nước láng giềng đòi hỏi sự tin cậy lẫn nhau.)*
   - *Ví dụ 3:* **Learning** about ASEAN cultural diversity **broadens** our international horizons.
     *(Việc tìm hiểu về sự đa dạng văn hóa ASEAN mở rộng tầm nhìn quốc tế của chúng ta.)*

2. **Dạng phủ định của Gerund:** Thêm trực tiếp **\`NOT\`** ngay trước V-ing (tuyệt đối không mượn trợ động từ *don't / doesn't*):
   $$\\mathbf{Not + V\\text{-ing} + V_{\\text{số ít}}}$$
   - *Ví dụ:* **Not respecting** diplomatic protocols **harms** regional integration.
     *(Việc không tôn trọng các nghi thức ngoại giao sẽ gây tổn hại đến tiến trình hội nhập khu vực.)*

3. **Cặp biến đổi giả chủ ngữ:**
   $$\\mathbf{It + be + Adj + to\\text{-}V \\iff V\\text{-ing} + be + Adj}$$
   - *It is difficult to preserve cultural identity in a globalized era.*
     $\\iff$ **Preserving** cultural identity in a globalized era **is** difficult.

---

### 📌 Chuyên đề 2: Danh Động Từ Đứng Sau Giới Từ (Gerunds after Prepositions)
Mọi động từ đứng ngay sau giới từ (*in, on, at, for, of, about, with, without, by, from...*) đều phải ở dạng **V-ing**:

$$\\mathbf{Preposition + V\\text{-ing}}$$

#### 🔥 BẢNG 10 CỤM TỪ CÓ GIỚI TỪ "TO" BẮT BUỘC ĐI VỚI V-ING (CỰC HAY XUẤT HIỆN TRONG ĐỀ THI 8.5+):
Trong tiếng Anh, chữ "to" thường là to-infinitive (to-V), nhưng ở 10 cụm dưới đây, **"to" là GIỚI TỪ**, vì vậy bắt buộc theo sau bởi **V-ing**:

| STT | Cụm từ cố định | Nghĩa tiếng Việt | Câu ví dụ song ngữ chuẩn chủ đề Unit 4 |
| :---: | :--- | :--- | :--- |
| **1** | **contribute to + V-ing** | Đóng góp vào việc gì | *Viet Nam actively contributes to **strengthening** regional stability.* <br>*(Việt Nam đóng góp tích cực vào việc củng cố sự ổn định khu vực.)* |
| **2** | **look forward to + V-ing** | Háo hức, trông mong điều gì | *Delegates look forward to **participating** in the annual youth camp.* <br>*(Các đại biểu rất trông mong được tham gia trại hè thanh niên thường niên.)* |
| **3** | **be / get used to + V-ing** | Quen với việc làm gì | *Diplomats are used to **working** in multicultural environments.* <br>*(Các nhà ngoại giao đã quen với việc làm việc trong môi trường đa văn hóa.)* |
| **4** | **be committed to + V-ing** | Cam kết làm điều gì | *All member states are committed to **abiding** by the ASEAN Charter.* <br>*(Tất cả quốc gia thành viên đều cam kết tuân thủ Hiến chương ASEAN.)* |
| **5** | **object to + V-ing** | Phản đối việc làm gì | *Several nations objected to **delaying** the economic integration timeline.* <br>*(Một số quốc gia phản đối việc trì hoãn tiến độ hội nhập kinh tế.)* |
| **6** | **be dedicated / devoted to + V-ing** | Hết lòng cống hiến cho việc gì | *The volunteers are dedicated to **supporting** underprivileged communities.* <br>*(Các tình nguyện viên hết lòng hỗ trợ các cộng đồng còn khó khăn.)* |
| **7** | **in addition to + V-ing** | Bên cạnh việc làm gì | *In addition to **promoting** trade, the bloc fosters education.* <br>*(Bên cạnh việc xúc tiến thương mại, khối còn đẩy mạnh giáo dục.)* |
| **8** | **with a view to + V-ing** | Với mục đích nhằm làm gì | *The summit was held with a view to **deepening** mutual understanding.* <br>*(Hội nghị được tổ chức nhằm làm sâu sắc thêm sự hiểu biết lẫn nhau.)* |
| **9** | **prior to + V-ing** | Trước khi làm việc gì | *Prior to **joining** ASEAN in 1995, Viet Nam initiated economic reforms.* <br>*(Trước khi gia nhập ASEAN năm 1995, Việt Nam đã khởi xướng đổi mới kinh tế.)* |
| **10** | **admit / confess to + V-ing** | Thú nhận đã làm gì | *The official admitted to **mishandling** the scholarship funds.* <br>*(Vị quan chức thừa nhận đã quản lý sai quỹ học bổng.)* |

#### Các cụm giới từ quan trọng khác:
- **succeed in + V-ing:** thành công trong việc... (*They succeeded in maintaining peace.*)
- **focus on / concentrate on + V-ing:** tập trung vào... (*Leaders focused on promoting economic growth.*)
- **prevent / stop sb from + V-ing:** ngăn cản ai làm gì (*Effective diplomacy prevented the dispute from escalating.*)
- **apologize to sb for + V-ing:** xin lỗi vì... (*He apologized for arriving late at the bilateral meeting.*)
- **by + V-ing** (bằng cách làm gì) vs **without + V-ing** (mà không làm gì):
  - *We can resolve conflicts **by listening** to each other.*
  - *No resolution can be adopted **without reaching** general consensus.*

---

### 📌 Chuyên đề 3: Động Từ Bắt Buộc Theo Sau Bởi V-ing & Các Thành Ngữ Cố Định

#### 1. Nhóm động từ bắt buộc đi với Gerund (Verbs + V-ing):
- **Cảm xúc & Thái độ:** *enjoy, fancy, adore, dislike, detest, mind, tolerate*
- **Hành động & Kế hoạch:** *admit, avoid, delay, postpone, put off, finish, practise, keep (on), quit, risk*
- **Đề xuất & Cân nhắc:** *suggest, recommend, consider, imagine, involve*

*Ví dụ minh họa:*
- *The committee **suggested establishing** a scholarship foundation for underprivileged students.*
- *Member countries must **avoid causing** misunderstanding during diplomatic negotiations.*
- *He **considered applying** for the ASEAN Youth Volunteer programme.*
- *They **postponed signing** the trade agreement until further consultations were complete.*

#### 2. Nhóm 8 Thành ngữ cố định (Idiomatic Expressions) luôn đi với V-ing:
1. **can't help / can't stand / can't bear + V-ing:** không thể nhịn được / không chịu nổi làm gì
   - *I couldn't help **admiring** the vibrant cultural diversity of Indonesia.*
2. **it's no use / it's no good + V-ing:** vô ích khi làm gì
   - *It's no use **worrying** about the exam without thorough preparation.*
3. **there is no point in + V-ing:** chẳng có ích lợi gì khi làm việc gì
   - *There is no point in **debating** without practical solutions.*
4. **be worth + V-ing:** đáng để làm gì
   - *The ASEAN Charter is well worth **reading** carefully.*
5. **spend time / money + (on) + V-ing:** dành thời gian/tiền bạc làm gì
   - *Thai spent two weeks **preparing** his presentation on ASEAN solidarity.*
6. **waste time / money + (on) + V-ing:** lãng phí thời gian/tiền bạc làm gì
   - *Do not waste time **arguing** over minor procedural details.*
7. **have difficulty / trouble (in) + V-ing:** gặp khó khăn khi làm gì
   - *Foreign delegates had some difficulty in **adapting** to local cuisine.*
8. **be busy + V-ing:** bận rộn làm việc gì
   - *Volunteers were busy **organizing** the cultural exchange booth.*

---

### 📌 Chuyên đề 4: 6 Động Từ Chuyển Đổi Nghĩa Giữa To-V và V-ing (Phân Hóa Điểm 8.5+)
Đây là trọng tâm phân loại học sinh trong đề thi THPT và kiểm tra học kì:

#### 1. REMEMBER:
- **remember + to-V:** Nhớ **phải làm** việc gì (bổn phận, tương lai).
  - *Please **remember to submit** your registration for the ASEAN youth forum before 5 PM.*
- **remember + V-ing:** Nhớ **đã làm** việc gì trong quá khứ.
  - *I distinctly **remember meeting** the Singaporean representative at last year's conference.*

#### 2. FORGET:
- **forget + to-V:** Quên **phải làm** việc gì.
  - *Don't **forget to bring** your passport to the embassy.*
- **forget + V-ing:** Quên ký ức **đã trải qua** (thường dùng trong câu phủ định *will never forget*).
  - *He will never **forget receiving** the ASEAN youth leadership award.*

#### 3. REGRET:
- **regret + to-V:** Lấy làm tiếc **phải thông báo** điều gì (thường đi với *inform, announce, say, tell*).
  - *We **regret to inform** you that the scholarship quota has been filled.*
- **regret + V-ing:** Hối tiếc vì **đã trót làm** việc gì trong quá khứ.
  - *She deeply **regretted not participating** in the regional volunteer campaign.*

#### 4. STOP:
- **stop + to-V:** Dừng việc đang làm lại **để làm** việc khác (chỉ mục đích).
  - *The ministers **stopped to take** a commemorative photo before entering the conference room.*
- **stop + V-ing:** Dừng hẳn, **từ bỏ** một hành động hoặc thói quen.
  - *Member nations **stopped imposing** unilateral tariffs on agricultural goods.*

#### 5. TRY:
- **try + to-V:** Cố gắng, **nỗ lực hết sức** vượt qua khó khăn để làm gì.
  - *Viet Nam is **trying to strengthen** its digital infrastructure to boost trade.*
- **try + V-ing:** **Thử nghiệm** một phương pháp mới xem hiệu quả ra sao.
  - *If diplomatic letters are slow, **try arranging** a direct online video call.*

#### 6. NEED:
- **need + to-V (chủ động):** Ai đó cần phải làm gì.
  - *We **need to maintain** solidarity and stability across Southeast Asia.*
- **need + V-ing = need to be V3/ed (bị động):** Cái gì đó cần được làm / sửa chữa.
  - *The ASEAN youth network website **needs upgrading** (= needs to be upgraded).*

---

### 📌 Chuyên đề 5: Danh Động Từ Hoàn Thành (Perfect Gerunds: Having + V3/ed)
- **Công thức:**
  $$\\mathbf{Having + V_{3/ed}}$$
- **Dạng phủ định:** $\\mathbf{Not + having + V_{3/ed}}$
- **Dạng bị động (Passive Perfect Gerund):** $\\mathbf{Having + been + V_{3/ed}}$
- **Bản chất:** Dùng khi muốn **nhấn mạnh hành động đã xảy ra và hoàn tất TRƯỚC** hành động của động từ chính trong mệnh đề.
- **Các động từ rất hay đi với Perfect Gerund:** *admit, deny, regret, apologize for, be praised for, be accused of, congratulate sb on...*

*Ví dụ minh họa:*
- *He **denied having leaked** confidential summit documents to external media.*
  *(Anh ta phủ nhận việc trước đó đã làm rò rỉ tài liệu mật của hội nghị.)*
- *Viet Nam **was praised for having made** outstanding contributions to the 37th ASEAN Summit.*
  *(Việt Nam được khen ngợi vì trước đó đã có những đóng góp xuất sắc cho Hội nghị cấp cao ASEAN lần thứ 37.)*
- *The diplomat **apologized for not having informed** the committee about the schedule changes in advance.*
  *(Vị nhà ngoại giao xin lỗi vì trước đó đã không thông báo trước cho ủy ban về sự thay đổi lịch trình.)*

---

## 📚 PHẦN III: BẢNG 24 TỪ VỰNG CỐT LÕI UNIT 4 (ÔN TẬP TỪ NGÀY 10/11/2026)
Hệ thống 24 từ vựng then chốt kết hợp phiên âm, từ loại, nghĩa tiếng Việt, Collocation thực chiến và ví dụ ứng dụng trực tiếp ngữ pháp Gerunds:

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

## 🛠️ PHẦN IV: 6 DẠNG BÀI VIẾT LẠI CÂU KINH ĐIỂN VỚI GERUNDS THI 8.5+

### Dạng 1: Đề xuất hành động (\`Let's / Why don't we / Shall we\` ➔ \`suggest + V-ing\`)
- *Đề bài:* "Why don't we organize a cultural exchange festival for ASEAN students?" the chairman said.
- ➔ **The chairman suggested organizing a cultural exchange festival for ASEAN students.**

### Dạng 2: Vô ích khi làm gì (\`It is pointless / It is no use + to-V\` ➔ \`There is no point in + V-ing\`)
- *Đề bài:* It is pointless to argue about past boundary disputes without looking at future cooperation.
- ➔ **There is no point in arguing about past boundary disputes without looking at future cooperation.**

### Dạng 3: Dành thời gian làm gì (\`It takes sb + time + to-V\` ➔ \`S + spend + time + (on) + V-ing\`)
- *Đề bài:* It took the diplomatic committee three days to finalize the joint communique.
- ➔ **The diplomatic committee spent three days finalizing the joint communique.**

### Dạng 4: Lời nhắc nhở (\`Remember to-V\` ➔ \`Don't forget to-V\` hoặc \`Remember + V-ing\`)
- *Đề bài:* Please remember to submit the volunteer registration form before next Monday.
- ➔ **Don't forget to submit the volunteer registration form before next Monday.**
- *Đề bài:* I clearly remember that I met the ASEAN Secretary-General in Jakarta.
- ➔ **I clearly remember meeting the ASEAN Secretary-General in Jakarta.**

### Dạng 5: Thừa nhận / Phủ nhận việc trong quá khứ (Dùng Perfect Gerund \`having + V3/ed\`)
- *Đề bài:* "Yes, I copied the confidential trade statistics from the database," the delegate admitted.
- ➔ **The delegate admitted having copied the confidential trade statistics from the database.**
- *Đề bài:* "No, I did not disclose the internal voting results," the ambassador said.
- ➔ **The ambassador denied having disclosed the internal voting results.**

### Dạng 6: Gặp khó khăn khi làm gì (\`It was difficult for sb to-V\` ➔ \`S + had difficulty (in) + V-ing\`)
- *Đề bài:* It was difficult for new participants to understand the formal diplomatic procedures.
- ➔ **New participants had difficulty (in) understanding the formal diplomatic procedures.**

---

## 💡 PHẦN V: LỜI DẶN DÒ TỪ THẦY THỨC
1. **Luyện tập phản xạ:** Bấm vào liên kết **[Phòng Học Tương Tác Unit 4](/lectures/eng11-unit4/index.html)** ở đầu bài giảng để luyện tập:
   - Tab **Chuyên Đề Ngữ Pháp Gerunds**: Ôn lại toàn bộ công thức và các cặp động từ đổi nghĩa.
   - Tab **Flashcard 3D**: Luyện 2 chiều (Anh ➔ Việt và Việt ➔ Anh) cho 24 từ vựng cốt lõi.
   - Tab **Cụm từ (Collocations)** & **Active Recall**: Củng cố phản xạ ghép từ tự nhiên.
2. **Ghi nhớ đặc biệt:**
   - 10 cụm từ có giới từ "TO" đi với V-ing (*contribute to, look forward to, be committed to, object to...*).
   - Sự khác biệt về nghĩa của *remember, forget, regret, stop, try, need*.
   - Quy tắc V-ing làm chủ ngữ thì động từ chính **luôn chia số ít**.
3. **Thực hành đặt câu:** Tự đặt ít nhất 3 câu tiếng Anh ứng dụng danh động từ kết hợp với các từ vựng *cooperation, integration, solidarity* để chuẩn bị cho buổi luyện đề sắp tới nhé!
`;

async function main() {
  console.log('🚀 Đang kiểm tra và tạo card bài giảng ngày 12/11/2026 cho Bạn Thái...');

  const startOfDay = new Date('2026-11-12T00:00:00.000Z');
  const endOfDay = new Date('2026-11-12T23:59:59.999Z');

  const existingAssignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: { gte: startOfDay, lte: endOfDay }
    },
    include: { learning_units: true }
  });

  const unitTitle = 'Unit 4: ASEAN and Viet Nam - Cẩm Nang Ngữ Pháp Gerunds & 24 Từ Vựng Cốt Lõi';
  const unitDescription = 'Chuyên đề Ngữ pháp Trọng tâm Unit 4 Tiếng Anh 11 Global Success: Phân tích toàn diện Danh động từ (Gerunds as subjects, objects of prepositions & verbs, 6 động từ chuyển nghĩa, Perfect Gerunds) kết hợp 24 từ vựng ASEAN and Viet Nam từ 10/11/2026 với hệ thống ví dụ song ngữ và giải thích chi tiết mục tiêu 8.5+.';
  const teacherNote = 'Thầy Thức dặn Thái: Hôm nay con bước vào học chuyên sâu Ngữ pháp trọng tâm Unit 4: Danh Động Từ (Gerunds - V-ing) kết hợp ôn tập 24 từ vựng ASEAN and Viet Nam từ ngày 10/11. Con đọc kỹ từng cấu trúc, dấu hiệu nhận biết, phân tích các ví dụ song ngữ, 10 cụm "to + V-ing" và các bẫy đề thi nâng cao mục tiêu 8.5+ nhé!';

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

    console.log('✅ Đã cập nhật thành công bài học ngày 12/11/2026!');
    return;
  }

  // 1. Tạo mới Learning Unit
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

  console.log('\n🎉 HOÀN THÀNH TẠO CARD BÀI GIẢNG NGỮ PHÁP UNIT 4 CHO BẠN THÁI NGÀY 12/11/2026!\n');
}

main()
  .catch(err => {
    console.error('❌ Lỗi tạo bài giảng:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
