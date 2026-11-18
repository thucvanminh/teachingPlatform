# Interactive Lecture Studio Specification (Quy Chuẩn Phòng Học Tương Tác Mới)

> [!IMPORTANT]
> **QUY CHUẨN THIẾT KẾ MỚI (TỪ 18/11/2026 TRỞ ĐI):**
> Phòng học tương tác độc lập tại `frontend/public/lectures/<slug>/` **CHỈ GIỮ LẠI ĐÚNG 2 PHẦN**:
> 1. **1. Flashcard 3D (2 Chiều):** Luyện phản xạ từ vựng đa chiều với 2 chế độ chính:
>    - *Chức năng 1 (EN ➔ VI):* Hiện tiếng Anh, IPA, audio phát âm 🔊 ➔ Giấu tiếng Việt ở mặt sau.
>    - *Chức năng 2 (VI ➔ EN):* Hiện nghĩa tiếng Việt ➔ Giấu tiếng Anh, IPA, câu ví dụ ở mặt sau.
>    - Có chế độ xem Luyện từng thẻ (Deck Player) và Lưới tất cả thẻ (Grid View), hỗ trợ phím tắt bàn phím (Space, Mũi tên, P, F, 1, 2) và xem toàn màn hình (Fullscreen).
> 2. **2. Lý Thuyết & xx Từ Vựng Cốt Lõi:**
>    - Danh sách từ vựng có thanh tìm kiếm nhanh, nút lọc nhóm Unit, nút phát âm Web Speech API, IPA, từ loại, nghĩa tiếng Việt, Collocation và câu ví dụ song ngữ.
>    - Chuyên đề ngữ pháp chuyên sâu (Grammar Compendium) trình bày dạng Accordion thẻ đẹp mắt, phân tích cấu trúc câu $S - V - O$, cảnh báo bẫy thi và **nhúng trực tiếp Interactive Quick Quiz Drills** (bấm chọn đáp án đổi màu xanh/đỏ tức thì, phát âm thanh feedback và trượt mở box giải thích chi tiết).
> 
> **TUYỆT ĐỐI BỎ HOÀN TOÀN CÁC PHẦN 3, 4, 5, 6:**
> - ❌ BỎ Phần 3: Collocations & Odd-One-Out.
> - ❌ BỎ Phần 4: Word Family Tree & Open Cloze.
> - ❌ BỎ Phần 5: Đoán Chữ (Active Recall).
> - ❌ BỎ Phần 6: Thử Thách Đặt Câu (Writing).

---

## 1. Cấu Trúc File Cần Có

Mỗi phòng học tương tác gồm 4 file độc lập trong `frontend/public/lectures/<slug>/`:
- `data.js`: Cung cấp `LECTURE_DATA` chuẩn (chỉ gồm `vocabList` và `grammarModules`).
- `style.css`: Light Theme hiện đại, chuyển động mượt mà, hỗ trợ 3D transform cho thẻ Flashcard và Quick Quiz.
- `index.html`: Khung HTML chỉ gồm 2 tabs (`tab-flashcards` và `tab-vocab`).
- `app.js`: Bộ điều khiển audio (Web Audio API & Web Speech API), logic Flashcard 3D 2 chiều, tìm kiếm từ vựng và chấm Quick Quiz.

---

## 2. Chuẩn Hóa Khung Dữ Liệu (`data.js`)

```javascript
const LECTURE_DATA = {
  title: "Unit 7: The World of Mass Media",
  subject: "Tiếng Anh 12 - Global Success",
  teacher: "Thầy Thức",

  // 1. TỪ VỰNG CỐT LÕI (xx TỪ VỰNG)
  vocabList: [
    {
      id: 1, // BẮT BUỘC: Số nguyên dương
      unit: 1, // Nhóm/Unit số 1, 2, 3...
      unitName: "Nhóm 1: Mass Media & Báo Chí",
      word: "Leaflet",
      ipa: "/ˈliːflət/",
      pos: "noun",
      meaning: "Tờ rơi quảng cáo, truyền đơn",
      collocation: "distribute leaflets / hand out leaflets",
      example: "Volunteers handed out promotional leaflets to passers-by in the pedestrian street.",
      exampleVi: "Các tình nguyện viên đã phát tờ rơi quảng cáo cho người qua đường trên phố đi bộ."
    }
  ],

  // 2. CHUYÊN ĐỀ NGỮ PHÁP (KÈM INTERACTIVE QUICK QUIZ DRILLS)
  grammarModules: [
    {
      id: "gram1", // BẮT BUỘC: Chuỗi ID duy nhất
      title: "1. Mệnh Đề Trạng Ngữ Chỉ Cách Thức (Manner)",
      focus: "Cấu trúc As, Just as, Like và Giả định không có thật As if / As though",
      theoryHtml: `...Toàn bộ nội dung lý thuyết HTML đẹp mắt (công thức, ví dụ song ngữ, bẫy thi)...`,
      drills: [ // BẮT BUỘC: Mảng 3-4 câu hỏi Quick Quiz trắc nghiệm tương tác
        {
          id: "d1_1",
          question: "She talks loudly on the phone as if no one else ______ in the room.",
          options: ["A. is", "B. were", "C. will be", "D. has been"],
          correct: 1, // 0-based index: 0=A, 1=B, 2=C, 3=D
          explanation: "Thực tế có người trong phòng, giả định trái hiện tại với 'as if' lùi về 'were' cho tất cả các ngôi."
        }
      ]
    }
  ]
};
```

---

## 3. Các Lỗi Phải Tránh (Anti-Patterns Checklist)

| Lỗi sai cần tránh | Hậu quả | Giải pháp chuẩn |
| :--- | :--- | :--- |
| **Thêm tab hoặc section 3, 4, 5, 6** | Làm bài giảng bị loãng, không đúng yêu cầu của Thầy | Chỉ tạo đúng 2 tabs: 1. Flashcard 3D và 2. Lý Thuyết & Từ Vựng Cốt Lõi. |
| **`app.js` gọi `initCollocations()` hoặc các hàm thừa** | Gây lỗi runtime console hoặc rác code | `DOMContentLoaded` chỉ gọi: `initTabs()`, `initFlashcards()`, `initVocabHub()`. |
| **Thiếu `correct` hoặc `drills` trong `grammarModules`** | Module bài tập nhanh không hoạt động hoặc không đổi màu | Luôn cung cấp mảng `drills` đầy đủ `id`, `question`, `options`, `correct` (0-3), `explanation`. |
| **Sai tên trường trong `vocabList`** | Flashcard bị trống chữ hoặc phát âm sai | Luôn có đủ: `id`, `word`, `ipa`, `pos`, `meaning`, `collocation`, `example`, `exampleVi`. |
