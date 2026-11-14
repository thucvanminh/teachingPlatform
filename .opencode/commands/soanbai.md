---
description: Tạo trọn gói bài giảng tương tác và bộ bài tập tiếng Anh từ A-Z cho học sinh Thái (Lớp 11) hoặc Nam Việt (Lớp 12) theo quy chuẩn Thầy Thức.
---
# Command: /soanbai
Mục đích: Lệnh tự động tạo trọn gói bài giảng tương tác và bộ bài tập tiếng Anh từ A-Z cho học sinh Thái (Lớp 11) hoặc Nam Việt (Lớp 12) theo quy chuẩn Thầy Thức.

## Input Parameters:
$ARGUMENTS
(Cú pháp hỗ trợ: `/soanbai [tên học sinh: thai | nam_viet] [ngày học: YYYY-MM-DD] [tên bài học / tệp tài liệu]`)

---

## QUY TRÌNH THỰC THI CHI TIẾT

### Bước 1: Nhận diện học sinh & tài liệu nguồn
1. Phân loại đối tượng:
   - **Thái (Lớp 11):**
     - Username: `thai` (ID: `9208f557-3288-442e-accf-15fc8c763e68`)
     - Subject: `ENG_11` (ID: `f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0`)
     - Mục tiêu: 8.5+ Giữa kì & THPT. Bỏ Phonetics, tập trung nâng cao Từ vựng & Ngữ pháp.
     - Tài liệu gốc: `/home/dantey/Dantey/teaching/lop_11/`
   - **Nam Việt (Lớp 12):**
     - Username: `nam_viet` (ID: `d76bd9d6-6cf5-409c-847b-b0e5c07a0876`)
     - Subject: `ENG_12` (ID: `a15d4b19-412a-4bff-acd5-86714381b7af`)
     - Mục tiêu: 7+ THPT Quốc Gia. Luôn đưa các câu hỏi TỪ VỰNG lên đầu trong đề trắc nghiệm.
     - Tài liệu gốc: `/home/dantey/Dantey/teaching/lop12NamViet/`
   - Teacher ID: `dc62e5df-2344-4785-b058-b95f5dbe0983` (Thầy Thức).

### Bước 2: Thiết kế Phòng học tương tác (Interactive Studio)
1. Tạo thư mục tại: `frontend/public/lectures/<slug>/`
2. Tạo file `index.html` độc lập (HTML5, Tailwind/CSS nội tuyến, Web Speech API đọc phát âm chuẩn):
   - **50 Từ vựng trọng tâm:** Có audio phát âm bản xứ (Web Speech API), IPA, từ loại, nghĩa tiếng Việt, Collocation và câu ví dụ song ngữ.
   - **3 Chuyên đề ngữ pháp cốt lõi:** Bảng công thức, dấu hiệu nhận biết, bảng đối chiếu và bài tập viết lại câu kinh điển.
   - **Tính năng tương tác:** Flashcard 3D lật 2 chiều, Collocation Matching Game, Word Family Tree, Active Recall.
   - **Giao diện:** Chuẩn Light Theme (trắng/xám sáng, thanh lịch, hiện đại, không dùng nền tối).
3. Đăng ký link bài giảng vào dashboard học sinh nếu cần thiết.

### Bước 3: Biên soạn bộ câu hỏi trắc nghiệm (60 - 100 câu)
- Đầy đủ 4 phương án A, B, C, D; trường `correct_answer` và `explanation` giải thích chi tiết, ân cần từ Thầy Thức.
- Nam Việt (Lớp 12): Bắt buộc đảo thứ tự, ưu tiên Từ vựng $\to$ Ngữ pháp $\to$ Đọc hiểu.

### Bước 4: Nạp dữ liệu vào Database
- Sử dụng hoặc tạo script seed bằng Node.js / TypeScript (tương tự `.agents/skills/teaching-english-curriculum/scripts/seed_english_lesson.js`).
- Tạo bản ghi trong các bảng:
  - `learning_units`
  - `daily_student_assignments` (gán ngày học chỉ định)
  - `assessments` & `questions`
  - `assessment_attempts` (status: `NOT_STARTED` sẵn sàng cho học sinh làm).

### Bước 5: Build & Push Production
1. Kiểm tra build frontend: `npm --prefix frontend run build`
2. Commit và push lên nhánh `main`:
   ```bash
   git add frontend/public/lectures/ .agents/ backend/
   git commit -m "feat(english): add lecture and assessment for <học sinh> <ngày>"
   git push origin main
   ```
3. Báo cáo kết quả: Đường link bài giảng trực tiếp, số lượng câu hỏi và trạng thái deploy Vercel.
