---
name: teaching-english-curriculum
description: >-
  End-to-end generator for Grade 11 & Grade 12 English curriculum, interactive lecture studios,
  and daily practice cards under Thầy Thức. Use this skill whenever the user asks to create,
  author, or seed a daily card, lecture, or exercise set for student Thái (Grade 11) or student
  Nam Việt (Grade 12), e.g. "tạo card bài giảng tiếng Anh lớp 11/12", "soạn bài học tiếng Anh",
  "tạo bài giảng cho Thái", "tạo bài tập cho Nam Việt".
---

# Quy Trình Tạo Bài Giảng & Bài Tập Tiếng Anh Từ A-Z (Thầy Thức)

Kỹ năng này hướng dẫn thực hiện trọn gói quy trình tạo một thẻ bài học hàng ngày (`daily_student_assignments`), bao gồm **Phòng học tương tác (Interactive Lecture Studio)** và **Đề luyện tập tại lớp (In-Session Assessment)** cho học sinh Lớp 11 (Thái) hoặc Lớp 12 (Nam Việt).

---

## 1. Định Tuyến Học Sinh (Student Routing)

Khi người dùng yêu cầu tạo bài, tự động nhận diện đối tượng dựa trên từ khóa:

| Học sinh | Cấp độ | Username / ID | Môn học | Mục tiêu | Thư mục dữ liệu gốc |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Thái** | Lớp 11 | `thai` (`9208f557-3288-442e-accf-15fc8c763e68`) | `ENG_11` (`f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0`) | **8.5+ Giữa kì & THPT** | `/home/dantey/Dantey/teaching/lop_11/` |
| **Nam Việt** | Lớp 12 | `nam_viet` (`c4217be5-4c07-4286-905c-e67d26456fae`) | `ENG_12` (`9b343ae3-1f19-4bbd-986d-069cb158a127`) | **7+ THPT Quốc Gia** | `/home/dantey/Dantey/teaching/lop12NamViet/` |

- **Giáo viên:** Luôn sử dụng danh xưng **Thầy Thức** (`dc62e5df-2344-4785-b058-b95f5dbe0983`).
- **Giao diện:** Luôn tuân thủ **Light Theme** (màu sáng, sạch sẽ, hiện đại, không dùng theme tối/đen).

---

## 2. Quy Trình Thực Hiện Từng Bước (A-Z)

```text
[Bước 1: Đọc & Trích Xuất Dữ Liệu]
       ↓
[Bước 2: Xây Dựng Phòng Học Tương Tác Web (HTML/JS)]
       ↓
[Bước 3: Tích Hợp Vào Giao Diện Học Sinh (page.tsx)]
       ↓
[Bước 4: Nạp Toàn Bộ Vào Cơ Sở Dữ Liệu (Seed Script)]
       ↓
[Bước 5: Kiểm Tra Build & Deploy Vercel Production]
```

---

### Bước 1: Khai Thác Tài Liệu & Thiết Kế Đề Bài

1. Đọc tệp nội dung bài học trong thư mục học sinh (VD: `mid_term_1_english_11_practice_test.txt` hoặc `Unit4_Urbanisation_Vocab_Grammar_Handbook.html`).
2. **Trích xuất dữ liệu bài giảng:**
   - **50 Từ vựng trọng tâm:** Có phát âm IPA, loại từ, nghĩa tiếng Việt, cụm từ Collocation và câu ví dụ song ngữ.
   - **3 Chuyên đề ngữ pháp cốt lõi:** Bảng công thức, dấu hiệu nhận biết, bảng đối chiếu và các công thức viết lại câu kinh điển.
3. **Soạn bộ câu hỏi trắc nghiệm (60 - 100 câu):**
   - **Với Nam Việt (Lớp 12):** Luôn xếp **các câu hỏi Từ vựng lên đầu**, tiếp theo là Ngữ pháp, cuối cùng là Đọc hiểu. Tập trung chắc chắn mục tiêu 7+.
   - **Với Thái (Lớp 11):** Bỏ phần Phonetics nếu yêu cầu, tập trung sâu vào Từ vựng & Ngữ pháp nâng cao cho mục tiêu 8.5+.
   - Mỗi câu hỏi phải có đầy đủ: `content`, `options` (A, B, C, D), `correct_answer` và `explanation` chi tiết từ Thầy Thức.

---

### Bước 2: Tạo Phòng Học Tương Tác Web (Interactive Studio)

*Áp dụng khi học sinh nhấn vào nút bài giảng.* Tạo thư mục `frontend/public/lectures/<slug>/` chứa 4 tệp:

1. **`data.js`**: Chứa toàn bộ dữ liệu có cấu trúc:
   - `vocabList`: 50 từ vựng cốt lõi.
   - `grammarModules`: 3 chuyên đề ngữ pháp, gán thẳng `theoryHtml` hoàn chỉnh.
   - `collocationPairs`: 8-10 cặp ghép từ (bắt buộc có `id: number`, `verb`, `noun`, `meaning`).
   - `oddOneOut`: 4 câu đố (bắt buộc `options: string[]`, `wrongIndex: number`, `explanation`).
   - `wordFamilyRoots`: 4 sơ đồ cây (bắt buộc `derivatives: [{ word, pos, vi }]`).
   - `openCloze`: 5 câu điền từ (bắt buộc `id: number`, `expectedAnswer: string`, `explanation`).
   - `activeRecall`: 5 thử thách (bắt buộc `id: number`, `clue: string`, `targetWord: string`, `definition: string`).
   - `writingChallenges`: 4 thử thách đặt câu (bắt buộc `id: number`, `keyword`, `prompt`, `requiredWords`, `forbiddenWords`, `modelAnswer`).
2. **`style.css`**: Giao diện Light Theme hiện đại, responsive mobile-first, hiệu ứng 3D mềm mại.
3. **`index.html`**: Khung ngữ nghĩa gồm thanh tab bar chuyển đổi 5 trạm học tập.
4. **`app.js`**: Bộ điều khiển tương tác:
   - **Web Speech API:** Phát âm giọng bản xứ khi bấm loa 🔊.
   - **Web Audio API:** Âm thanh phản hồi khi làm đúng/sai.
   - **Render ngữ pháp:** Gán trực tiếp `mod.theoryHtml` vào accordion body (tránh lỗi rỗng do so sánh id).
   - **Bộ thẩm định viết câu:** Kiểm tra từ khóa, phát hiện bẫy (như dùng trạng từ sau linking verb) và hiển thị câu mẫu từ Thầy Thức.

> [!IMPORTANT]
> **Checklist kiểm tra chống rỗng nội dung:** Trước khi kết thúc, luôn đối chiếu các trường trong `data.js` và `app.js` khớp 100% theo đặc tả tại [interactive_studio_spec.md](./references/interactive_studio_spec.md) để đảm bảo không một trạm nào (Collocations, Word family, Recall, Writing) bị rỗng.

Tham khảo chi tiết kỹ thuật tại: [interactive_studio_spec.md](./references/interactive_studio_spec.md).

---

### Bước 3: Tích Hợp Vào Student Dashboard

Mở [frontend/src/app/student/page.tsx](file:///home/dantey/Dantey/teaching/teachingPlatform/frontend/src/app/student/page.tsx):
- Đảm bảo thẻ bài giảng (Trạm 1) có nút: **"Vào Phòng Học Tương Tác 🌟"** và liên kết **"Tab mới ↗"**.
- Cửa sổ Modal nhúng responsive `<iframe src="/lectures/<slug>/index.html" />` với kích thước `max-w-6xl h-[92vh]`.
- **Tuyệt đối không đính kèm hậu tố công nghệ** như `(HTML5/JS)` cạnh tên phòng học.

---

### Bước 4: Nạp Dữ Liệu Tự Động Vào Database (A-Z Seeding)

Sử dụng kịch bản nạp tự động có sẵn tại: [seed_english_lesson.js](./scripts/seed_english_lesson.js).

1. Tạo tệp payload tạm `temp_payload.json` theo mẫu [assignment_payload.json](./templates/assignment_payload.json).
2. Chạy lệnh:
   ```bash
   node .agents/skills/teaching-english-curriculum/scripts/seed_english_lesson.js --payload temp_payload.json
   ```
3. Kịch bản sẽ tự động tạo đúng chuỗi liên kết:
   - `learning_units` (kèm nội dung Markdown đầy đủ và link tương tác)
   - `daily_student_assignments` (gán ngày học và lời dặn của Thầy Thức)
   - `assessments` (bài kiểm tra 90 phút tại lớp)
   - `questions` (nạp đồng loạt tất cả các câu hỏi, đáp án và giải thích)
   - `assessment_attempts` (khởi tạo trạng thái `IN_PROGRESS`)

Tham khảo thêm cấu trúc bảng: [database_schema.md](./references/database_schema.md).

---

### Bước 5: Kiểm Tra & Triển Khai Production

1. Chạy biên dịch kiểm tra trong thư mục frontend:
   ```bash
   npm --prefix frontend run build
   ```
2. Commit và đẩy mã nguồn lên nhánh `main`:
   ```bash
   git add frontend/ .agents/
   git commit -m "feat(lesson): add English lecture and assignment card for [Student] on [Date]"
   git push origin main
   ```
3. Chờ 20 giây và kiểm tra phản hồi từ Vercel Production:
   ```bash
   curl -sI https://teaching-platforms.vercel.app/lectures/<slug>/index.html | head -n 5
   ```
4. Báo cáo ngắn gọn cho người dùng kèm link trải nghiệm trực tiếp và tài khoản đăng nhập của học sinh.
