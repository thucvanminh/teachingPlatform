---
description: Tạo trọn gói bài giảng tương tác và bộ bài tập tiếng Anh từ A-Z cho học sinh Thái (Lớp 11) hoặc Nam Việt (Lớp 12) theo quy chuẩn Thầy Thức.
---
# Command: /soanbai
Mục đích: Lệnh tự động tạo trọn gói bài giảng tương tác và bộ bài tập tiếng Anh từ A-Z cho học sinh Thái (Lớp 11) hoặc Nam Việt (Lớp 12) theo quy chuẩn Thầy Thức.

## Input Parameters:
$ARGUMENTS
(Cú pháp hỗ trợ: `/soanbai [tên học sinh: thai | nam_viet] [ngày học: YYYY-MM-DD] [tên bài học / Unit]`)

---

## QUY TRÌNH THỰC THI CHI TIẾT

### Bước 1: Nhận diện học sinh & Khai thác tài liệu PDF nguồn
1. Phân loại đối tượng:
   - **Thái (Lớp 11):**
     - Username: `thai` (ID: `9208f557-3288-442e-accf-15fc8c763e68`)
     - Subject: `ENG_11` (ID: `f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0`)
     - Mục tiêu: 8.5+ Giữa kì & THPT. Bỏ Phonetics, tập trung nâng cao Từ vựng & Ngữ pháp.
     - **Tài liệu PDF SGK chuẩn:** `PDF_of_documents/SGK – Tiếng Anh 11 – Chương trình mới.pdf`
   - **Nam Việt (Lớp 12):**
     - Username: `nam_viet` (ID: `d76bd9d6-6cf5-409c-847b-b0e5c07a0876`)
     - Subject: `ENG_12` (ID: `a15d4b19-412a-4bff-acd5-86714381b7af`)
     - Mục tiêu: 7+ THPT Quốc Gia. Luôn đưa các câu hỏi TỪ VỰNG lên đầu trong đề trắc nghiệm.
     - **Tài liệu PDF SGK chuẩn:** `PDF_of_documents/tieng-anh-12-global-success.pdf` và `PDF_of_documents/tieng-anh-12-global-success-sbt.pdf`
   - Teacher ID: `dc62e5df-2344-4785-b058-b95f5dbe0983` (Thầy Thức).

2. **Công cụ trích xuất & nghiên cứu tài liệu (TUYỆT ĐỐI KHÔNG đọc file .md truyền vào):**
   - **Dùng `pdftotext`:** Trích xuất nhanh văn bản các trang/Unit trong file PDF tại `PDF_of_documents/`:
     `pdftotext -f <trang_dau> -l <trang_cuoi> PDF_of_documents/<file_sgk>.pdf -`
   - **Dùng MCPs (`firecrawl`, WebSearch):** Tra cứu các bài đọc tin tức quốc tế (BBC, The Guardian, National Geographic) và đề thi chuẩn nhằm lấy ngữ liệu thời sự cho bài đọc hiểu và ví dụ thực tế.
   - **Giới hạn nội dung đúng với bài học, không quá khó:** Bám sát chương trình bài học của SGK và mục tiêu điểm số của từng bạn, không đánh đố vượt quá xa trình độ.
   - **Dùng `pandoc`:** Khi Thầy yêu cầu in đề phát cho học sinh làm trên giấy, xuất đề bài ra file Word `.docx`:
     `pandoc de_kiem_tra.md -o de_kiem_tra.docx`

### Bước 2: Xây dựng bài giảng Ngữ pháp kĩ càng & Đa tầng (Grammar Compendium)
- Phân tích cặn kẽ bản chất cơ chế ngữ pháp, công thức logic, quy tắc hòa hợp $S - V - O$.
- Mỗi cấu trúc/cụm từ có **tối thiểu 2–3 ví dụ song ngữ thực chiến** bám sát chủ đề Unit, có phân tích thành phần câu.
- Cảnh báo bẫy thi nâng cao mục tiêu 8.5+ (bẫy danh từ số nhiều chèn giữa, bẫy giới từ "TO" đi với V-ing, bẫy thì hoàn thành trước, bẫy bị động).
- **Tích hợp bài tập nhanh vận dụng ngay (Quick Check Drills):**
  - **Trên Card Markdown:** Dưới mỗi chuyên đề có 3–4 câu trắc nghiệm/điền từ/viết lại câu kèm khung [Đáp án & Giải thích chi tiết].
  - **Trong Web Studio:** Nhúng module tương tác **Interactive Quick Quiz Widget** vào trực tiếp từng Accordion chuyên đề trong `data.js` & `app.js` (học sinh click chọn A, B, C, D ➔ đổi màu xanh/đỏ tức thì, phát âm thanh feedback và trượt mở box giải thích chi tiết).

### Bước 3: Thiết kế Phòng học tương tác (Interactive Studio)
1. Tạo thư mục tại: `frontend/public/lectures/<slug>/`
2. Tạo file `index.html` độc lập (HTML5, Tailwind/CSS nội tuyến, Web Speech API đọc phát âm chuẩn):
   - **Từ vựng cốt lõi:** Có audio phát âm bản xứ (Web Speech API), IPA, từ loại, nghĩa tiếng Việt, Collocation và câu ví dụ song ngữ.
   - **Chuyên đề ngữ pháp:** Lý thuyết chi tiết kèm widget bài tập nhanh (Interactive Quick Check) đổi màu chấm điểm tức thì.
   - **Tính năng tương tác:** Flashcard 3D lật 2 chiều, Collocation Matching Game, Word Family Tree, Active Recall, Sentence Writing.
   - **Giao diện:** Chuẩn Light Theme (trắng/xám sáng, thanh lịch, hiện đại, không dùng nền tối).

### Bước 4: Biên soạn bộ câu hỏi trắc nghiệm (60 - 100 câu) theo 5 quy tắc vàng
1. **Sử dụng từ vựng bài học:** Tất cả câu hỏi phải sử dụng từ vựng của phần bài giảng Unit đang học.
2. **Tối thiểu 2 từ vựng Unit trong 4 phương án:** Các câu hỏi từ vựng, phần đáp án A, B, C, D **bắt buộc có tối thiểu 2 từ vựng của Unit đang học** (để tránh học sinh khoanh lụi dựa vào 1 từ vựng mới học duy nhất).
3. **Chống trùng lặp đáp án đúng liên tiếp:** **Đáp án đúng của các câu hỏi kế nhau phải khác nhau** (ví dụ 2 câu hỏi kế nhau không thể đều có đáp án đúng là "mass media").
4. **Luôn có đúng 10 câu hỏi chia từ loại (Word Formation):** Trong bộ đề luôn luôn có đúng 10 câu hỏi dành cho dạng chia từ loại: cho 4 dạng Danh từ, Tính từ, Trạng từ, Động từ của cùng một gốc từ trong 4 đáp án A, B, C, D để học sinh chọn.
5. **Từ vựng ngữ cảnh cơ bản nhất có thể (CRITICAL - Basic Context Words):** Vì học sinh khá yếu mảng từ vựng, **ngoài các từ vựng học trong Unit**, tất cả các từ ngữ dùng trong câu hỏi (câu dẫn, đáp án nhiễu) **phải dùng từ cơ bản, quen thuộc nhất có thể (Basic A1 - A2 / B1)**. Câu văn ngắn gọn, dễ hiểu, tránh các từ ngữ hiếm hay quá khó ngoài Unit.
- **Thứ tự:** Nam Việt (Lớp 12) bắt buộc đưa câu hỏi Từ vựng lên đầu đề.

### Bước 5: Nạp dữ liệu vào Database
- Sử dụng script seed Node.js / Prisma Client (`learning_units`, `daily_student_assignments`, `assessments`, `questions`, `assessment_attempts`).

### Bước 6: Build & Push Production
1. Kiểm tra build frontend: `npm --prefix frontend run build`
2. Commit và push lên nhánh `main`:
   ```bash
   git add frontend/public/lectures/ .agents/ .opencode/ .claude/
   git commit -m "feat(english): add lecture and assessment for <học sinh> <ngày>"
   git push origin main
   ```
3. Báo cáo kết quả: Đường link bài giảng trực tiếp, số lượng câu hỏi và trạng thái deploy Vercel.
