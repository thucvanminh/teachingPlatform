#!/usr/bin/env node

/**
 * SEED SCRIPT: UNIT 7 LECTURE & ASSIGNMENT FOR NAM VIỆT (11/11/2026)
 * Thầy Thức - Tiếng Anh 12 (Global Success - Unit 7: The World of Mass Media)
 */

const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, '../../../../backend/node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: 'd76bd9d6-6cf5-409c-847b-b0e5c07a0876', // Bạn Nam Việt (Lớp 12)
  SUBJECT_ID: 'a15d4b19-412a-4bff-acd5-86714381b7af', // ENG_12
  ASSIGNED_DATE: new Date('2026-11-11T00:00:00.000Z')
};

const LECTURE_CONTENT_MARKDOWN = `# 🌟 Cẩm Nang Tri Thức & Đấu Trường Từ Vựng Unit 7 - Tiếng Anh 12
**Biên soạn riêng cho Bạn Nam Việt • Hướng dẫn: Thầy Thức**

Chuyên đề: **Unit 7: The World of Mass Media (Thế Giới Truyền Thông Đại Chúng)**
Mục tiêu: **Chinh phục 7+ Kì thi Tốt nghiệp THPT Quốc Gia**

[🚀 MỞ PHÒNG HỌC TƯƠNG TÁC TOÀN MÀN HÌNH](/lectures/eng12-unit7/index.html)

---

## 🎯 1. 12 TỪ VỰNG CỐT LÕI NHẤT (CORE VOCABULARY)
Dưới đây là 12 từ vựng then chốt xuất hiện dày đặc nhất trong đề thi THPTQG và các bài kiểm tra định kỳ Unit 7:

| STT | Từ vựng | Phiên âm IPA | Từ loại | Nghĩa tiếng Việt | Cụm từ thông dụng (Collocations) |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **1** | **Mass media** | \`/ˌmæs ˈmiːdiə/\` | n. phr. | Truyền thông đại chúng | *traditional mass media*, *role of mass media* |
| **2** | **The press** | \`/ðə pres/\` | n. | Báo chí, giới báo chí | *freedom of the press*, *press conference* |
| **3** | **Broadcast** | \`/ˈbrɔːdkɑːst/\` | v., n. | Phát sóng; buổi phát sóng | *broadcast live*, *news broadcast* |
| **4** | **Digital media** | \`/ˌdɪdʒɪtl ˈmiːdiə/\` | n. phr. | Truyền thông số | *rise of digital media*, *digital media platforms* |
| **5** | **Social platform** | \`/ˌsəʊʃl ˈplætfɔːm/\` | n. phr. | Nền tảng mạng xã hội | *popular social platforms*, *share on social platforms* |
| **6** | **Circulation** | \`/ˌsɜːkjəˈleɪʃn/\` | n. | Lượng phát hành (báo in) | *daily circulation*, *huge circulation* |
| **7** | **Commercial** | \`/kəˈmɜːʃl/\` | n., adj. | Mẩu quảng cáo (TV/Radio); thương mại | *commercial break*, *commercial advertising* |
| **8** | **Publicity** | \`/pʌbˈlɪsəti/\` | n. | Sự công khai, chú ý của công chúng | *gain massive publicity*, *bad publicity* |
| **9** | **Promote** | \`/prəˈməʊt/\` | v. | Quảng bá, xúc tiến | *promote products*, *promote brand awareness* |
| **10** | **Reliable** | \`/rɪˈlaɪəbl/\` | adj. | Đáng tin cậy, xác thực | *reliable source of information*, *highly reliable data* |
| **11** | **Bias** | \`/ˈbaɪəs/\` | n., v. | Sự thiên vị, thành kiến | *show strong bias against/towards*, *media bias* |
| **12** | **Viral** | \`/ˈvaɪrəl/\` | adj. | Lan truyền nhanh trên mạng | *go viral*, *viral video clip* |

---

## ⚡ 2. 3 CHUYÊN ĐỀ NGỮ PHÁP TRỌNG TÂM UNIT 7

### Chuyên đề 1: Mệnh Đề Trạng Ngữ Chỉ Cách Thức (Adverbial Clauses of Manner)
Mệnh đề chỉ cách thức giải thích hành động được thực hiện như thế nào, thường bắt đầu bằng:
- **\`as\` (như là)**: *Please complete the assignment as you were guided.*
- **\`just as\` (đúng như)**: *The journalist reported the event just as it unfolded.*
- **\`like\` (giống như - văn phong nói thân mật)**: *He speaks like a professional news anchor.*

#### Bẫy thi kinh điển: Cấu trúc giả định với \`AS IF / AS THOUGH\` (Như thể là)
Trong đề thi tốt nghiệp THPT, cần phân biệt rõ 2 tình huống:
1. **Tình huống có thật hoặc rất có thể xảy ra:**
   Chia thì bình thường theo ngữ cảnh:
   - *It looks as if it is going to rain.* (Nhìn mây đen kìa, trông như trời sắp mưa thật).
2. **Tình huống giả định trái ngược thực tế ở Hiện Tại (Unreal Present):**
   Lùi về **Quá khứ đơn**, riêng động từ to-be luôn dùng **\`WERE\`** cho tất cả các ngôi (I, he, she, it, they, we)!
   $$\\mathbf{S + V(hiện\\ tại) + as\\ if / as\\ though + S + were / V_{2/ed}}$$
   - *He acts as if he were an expert.* (Thực tế anh ta không phải là chuyên gia).
   - *We cannot promote this school as if it were a profit-making enterprise.* (Thực tế trường là phi lợi nhuận).
3. **Tình huống giả định trái ngược Quá Khứ (Unreal Past):**
   Lùi về **Quá khứ hoàn thành (\`had + V3/ed\`)**:
   $$\\mathbf{S + V(quá\\ khứ) + as\\ if / as\\ though + S + had + V_{3/ed}}$$
   - *She described the incident as if she had witnessed it herself.* (Thực tế cô ấy không chứng kiến).

---

### Chuyên đề 2: Mệnh Đề Trạng Ngữ Chỉ Kết Quả (Adverbial Clauses of Result)

#### 1. Cấu trúc với "SO ... THAT" (Quá ... đến nỗi mà)
- Với Tính từ: $S + be + \\mathbf{so + adj + that} + S + V$
  - *The breaking news was so shocking that everyone stopped working.*
- Với Trạng từ: $S + V + \\mathbf{so + adv + that} + S + V$
  - *The fake video circulated so quickly that nobody could verify it in time.*
- Với Danh từ số nhiều: $S + V + \\mathbf{so\\ many / few + Plural\\ N + that} + S + V$
  - *There were so many commercials that I switched off the television.*
- Với Danh từ không đếm được: $S + V + \\mathbf{so\\ much / little + Uncountable\\ N + that} + S + V$
  - *There is so much misinformation that readers feel completely confused.*
- **Bẫy thi danh từ số ít:** $S + be + \\mathbf{so + adj + a/an + Singular\\ N + that} + S + V$
  - *It was so popular a podcast that it reached one million downloads in a week.*

#### 2. Cấu trúc với "SUCH ... THAT"
$$\\mathbf{S + V + such + (a/an) + adj + Noun + that + S + V}$$
- Danh từ số ít đếm được: dùng \`such a/an + adj + N\`.
  - *The Internet is such a powerful tool that it connects people globally.*
- Danh từ số nhiều / không đếm được: **tuyệt đối không dùng a/an**!
  - *They are such credible sources that we cite them regularly.*
  - *It was such bad news that she burst into tears.*

---

### Chuyên đề 3: Đảo Ngữ Nâng Cao & 4 Dạng Biến Đổi Câu Kinh Điển

#### 1. Công thức Đảo ngữ (Inversion)
- **Đảo ngữ với SO:**
  $$\\mathbf{So + adj + be + S + that + Clause}$$
  $$\\mathbf{So + adv + trợ\\ động\\ từ + S + V + that + Clause}$$
  - *Ví dụ:* So sensational was the front-page headline that millions of users clicked it.
- **Đảo ngữ với SUCH:**
  $$\\mathbf{Such + be + (a/an) + adj + N + that + Clause}$$
  - *Ví dụ:* Such was the influence of the marketing campaign that online sales doubled in two weeks.

#### 2. 4 Dạng bài viết lại câu tương đương thi THPTQG
1. **Dạng 1 (So ↔ Such):**
   - *The podcast was so engaging that I listened twice.*
   - ➔ *It was such an engaging podcast that I listened twice.*
2. **Dạng 2 (Too...to ➔ So...that):**
   - *Prime-time advertising is too expensive for small businesses to afford.*
   - ➔ *Prime-time advertising is so expensive that small businesses cannot afford it.*
3. **Dạng 3 (Not...enough ➔ So...that):**
   - *The report was not clear enough for ordinary citizens to understand.*
   - ➔ *The report was so confusing that ordinary citizens could not understand it.*
4. **Dạng 4 (Thực tế ➔ As if + were):**
   - *In fact, he doesn't own the newspaper, but he behaves like an owner.*
   - ➔ *He behaves as if he were the owner of the newspaper.*

---

### 💡 Hướng dẫn học tập từ Thầy Thức:
1. Bấm vào nút **[Vào phòng học tương tác](/lectures/eng12-unit7/index.html)** ở trên hoặc trong thẻ bài giảng.
2. Hoàn thành 1 lượt **12 Thẻ Flashcard 3D Cốt Lõi** (bật chế độ lật 2 chiều: Anh $\\to$ Việt và Việt $\\to$ Anh).
3. Thử sức với **Trò chơi Nối Cụm từ (Collocations)**, **Cây Từ Loại (Word Family)** và **Active Recall** để ghi nhớ từ vựng sâu sắc.
4. Đọc kỹ 4 dạng viết lại câu ở trên trước khi bước vào các bài luyện đề nâng cao!
`;

async function main() {
  console.log('🚀 Đang kiểm tra và tạo card học ngày 11/11/2026 cho Bạn Nam Việt...');

  // 1. Kiểm tra xem đã có card ngày 11/11/2026 chưa
  const startOfDay = new Date('2026-11-11T00:00:00.000Z');
  const endOfDay = new Date('2026-11-11T23:59:59.999Z');

  const existingAssignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: { gte: startOfDay, lte: endOfDay }
    },
    include: { learning_units: true }
  });

  if (existingAssignment) {
    console.log(`⚠️ Đã tồn tại bài học ngày 11/11/2026 (ID: ${existingAssignment.id}). Cập nhật nội dung bài giảng...`);

    // Cập nhật learning_unit
    await prisma.learning_units.update({
      where: { id: existingAssignment.learning_unit_id },
      data: {
        title: 'Unit 7: The World of Mass Media - Cẩm Nang Từ Vựng Cốt Lõi & Mệnh Đề Trạng Ngữ (Flashcard 3D)',
        description: 'Chuyên đề Unit 7 Tiếng Anh 12: Khám phá 12 từ vựng cốt lõi thế giới truyền thông đại chúng, làm chủ 3 chuyên đề ngữ pháp Mệnh đề chỉ cách thức (as if/were), Mệnh đề chỉ kết quả (so/such...that) và 4 dạng bài biến đổi câu kinh điển thi THPTQG.',
        lecture_content_markdown: LECTURE_CONTENT_MARKDOWN
      }
    });

    // Cập nhật teacher_daily_note
    await prisma.daily_student_assignments.update({
      where: { id: existingAssignment.id },
      data: {
        teacher_daily_note: 'Thầy Thức dặn Nam Việt: Hôm nay con bước vào Unit 7: The World of Mass Media. Hãy bấm vào nút "Vào phòng học tương tác" để luyện 12 từ vựng cốt lõi bằng Flashcard 3D hai chiều và nắm chắc 3 chuyên đề ngữ pháp trọng tâm: Mệnh đề cách thức (As if/were), Mệnh đề kết quả (So/Such...that) cùng dạng Đảo ngữ kinh điển trong đề thi THPTQG nhé!',
        is_published: true
      }
    });

    console.log('✅ Đã cập nhật thành công bài học ngày 11/11/2026!');
    return;
  }

  // 2. Tạo mới Learning Unit
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: 'Unit 7: The World of Mass Media - Cẩm Nang Từ Vựng Cốt Lõi & Mệnh Đề Trạng Ngữ (Flashcard 3D)',
      description: 'Chuyên đề Unit 7 Tiếng Anh 12: Khám phá 12 từ vựng cốt lõi thế giới truyền thông đại chúng, làm chủ 3 chuyên đề ngữ pháp Mệnh đề chỉ cách thức (as if/were), Mệnh đề chỉ kết quả (so/such...that) và 4 dạng bài biến đổi câu kinh điển thi THPTQG.',
      lecture_content_markdown: LECTURE_CONTENT_MARKDOWN,
      is_template: true
    }
  });
  console.log(`✅ Đã tạo Learning Unit: ${unit.id}`);

  // 3. Tạo Daily Student Assignment
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: CONSTANTS.ASSIGNED_DATE,
      custom_session_minutes: 90,
      teacher_daily_note: 'Thầy Thức dặn Nam Việt: Hôm nay con bước vào Unit 7: The World of Mass Media. Hãy bấm vào nút "Vào phòng học tương tác" để luyện 12 từ vựng cốt lõi bằng Flashcard 3D hai chiều và nắm chắc 3 chuyên đề ngữ pháp trọng tâm: Mệnh đề cách thức (As if/were), Mệnh đề kết quả (So/Such...that) cùng dạng Đảo ngữ kinh điển trong đề thi THPTQG nhé!',
      is_published: true
    }
  });
  console.log(`✅ Đã tạo Daily Assignment card ngày 11/11/2026: ${assignment.id}`);

  console.log('\n🎉 HOÀN THÀNH TẠO CARD BÀI GIẢNG UNIT 7 CHO BẠN NAM VIỆT NGÀY 11/11/2026!\n');
}

main()
  .catch(err => {
    console.error('❌ Lỗi tạo bài giảng:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
