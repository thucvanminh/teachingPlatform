---
name: soanbai
description: >-
  Lệnh nhanh (/soanbai) tạo trọn gói bài giảng tương tác và bài tập tiếng Anh từ A-Z
  cho bạn Thái (Lớp 11) hoặc bạn Nam Việt (Lớp 12) theo quy chuẩn Thầy Thức.
---

# Lệnh Nhanh Soạn Bài Tiếng Anh Từ A-Z (/soanbai)

Khi người dùng gõ `/soanbai [tên học sinh] [ngày] [chủ đề / Unit]`:

Thực hiện quy trình tạo bài giảng và bài tập theo đúng hướng dẫn chuẩn tại:
👉 [teaching-english-curriculum](../teaching-english-curriculum/SKILL.md)

### Các bước thực thi tự động:
1. **Nhận diện học sinh:** 
   - **Thái:** Lớp 11 (ID `9208f557-3288-442e-accf-15fc8c763e68`), môn `ENG_11` (`f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0`), mục tiêu 8.5+.
   - **Nam Việt:** Lớp 12 (ID `d76bd9d6-6cf5-409c-847b-b0e5c07a0876`), môn `ENG_12` (`a15d4b19-412a-4bff-acd5-86714381b7af`), mục tiêu 7+ THPTQG.
2. **Khai thác dữ liệu nguồn (KHÔNG đọc file .md truyền vào):**
   - Đọc trực tiếp các file PDF SGK trong thư mục `PDF_of_documents/` ở thư mục gốc của dự án:
     + Thái: `PDF_of_documents/SGK – Tiếng Anh 11 – Chương trình mới.pdf`
     + Nam Việt: `PDF_of_documents/tieng-anh-12-global-success.pdf` và `PDF_of_documents/tieng-anh-12-global-success-sbt.pdf`
   - Dùng `pdftotext -f <trang_dau> -l <trang_cuoi>` để trích xuất từ vựng, ngữ pháp của Unit.
   - Sử dụng **MCPs (Firecrawl, WebSearch)** để tra cứu ngữ liệu thời sự, bài báo quốc tế (BBC, National Geographic, The Guardian) và đề thi chuẩn nhằm làm phong phú bài đọc hiểu và ví dụ.
   - **Giới hạn nội dung đúng với bài học, không quá khó:** Bám sát chuẩn SGK và mục tiêu của học sinh.
3. **Bài giảng ngữ pháp chuyên sâu & Đa tầng (Grammar Compendium):**
   - Phân tích cơ chế bản chất ngữ pháp, quy tắc hòa hợp $S - V - O$, công thức logic.
   - Tối thiểu 2–3 ví dụ song ngữ thực chiến cho mỗi cấu trúc có phân tích thành phần câu.
   - Cảnh báo bẫy thi nâng cao (bẫy danh từ số nhiều chèn giữa, bẫy giới từ "TO" đi với V-ing, bẫy mốc thời gian hoàn thành trước, bẫy bị động).
   - **Tích hợp bài tập nhanh vận dụng ngay (Quick Check Drills):**
     + Trên Card Markdown: Mỗi chuyên đề có 3–4 câu trắc nghiệm/điền từ/viết lại câu kèm bảng [Đáp án & Giải thích chi tiết].
     + Trong Web Studio: Nhúng module tương tác **Interactive Quick Quiz Widget** vào trực tiếp từng Accordion chuyên đề ngữ pháp (đổi màu xanh/đỏ tức thì, âm thanh Chime/Buzzer, trượt mở box giải thích chi tiết).
4. **Tạo Phòng học tương tác (Interactive Studio) - CHỈ GỒM 2 PHẦN:** Sinh ứng dụng web tại `frontend/public/lectures/<slug>/` chỉ gồm đúng 2 phần:
   - **Phần 1. Flashcard 3D (2 Chiều):** Luyện phản xạ từ vựng cả 2 chiều (EN ➔ VI và VI ➔ EN), phát âm chuẩn Web Speech API, chế độ Luyện từng thẻ (Deck) và Lưới thẻ (Grid), hỗ trợ phím tắt bàn phím và xem toàn màn hình.
   - **Phần 2. Lý Thuyết & xx Từ Vựng Cốt Lõi:** Bộ tra cứu từ vựng và chuyên đề ngữ pháp kĩ càng, tích hợp module **Interactive Quick Quiz Widget** (đổi màu xanh/đỏ tức thì, âm thanh feedback, trượt mở box giải thích chi tiết).
   - **TUYỆT ĐỐI BỎ CÁC PHẦN 3, 4, 5, 6:** Bỏ hoàn toàn Collocation game, Word family tree, Active recall, Sentence writing.
5. **Biên soạn bài tập trắc nghiệm (60 - 100 câu) theo 5 quy tắc vàng:**
   - **Quy tắc 1:** Tất cả câu hỏi phải sử dụng từ vựng của bài giảng Unit đang học.
   - **Quy tắc 2:** Các câu hỏi từ vựng, trong 4 đáp án A, B, C, D **bắt buộc có tối thiểu 2 từ vựng của Unit đang học** (hoặc **tối thiểu 3 từ vựng mới** đối với các bài tập trung từ vựng core để tránh học sinh khoanh lụi).
   - **Quy tắc 3:** **Đáp án đúng của các câu hỏi kế nhau phải khác nhau** (không trùng lặp liên tiếp, ví dụ 2 câu kế nhau không thể đều có đáp án đúng là "mass media").
   - **Quy tắc 4:** **Luôn có đúng 10 câu hỏi dạng chia từ loại (Word Formation)**: cho 4 dạng Danh từ, Tính từ, Trạng từ, Động từ của cùng 1 gốc từ trong 4 đáp án A, B, C, D để học sinh chọn.
   - **Quy tắc 5 (Từ vựng ngữ cảnh cơ bản nhất có thể - Basic Context Words):** Vì cả Thái và Nam Việt đều khá yếu trong mảng từ vựng, **ngoài các từ vựng trọng tâm cần học trong Unit**, TẤT CẢ các từ ngữ khác dùng trong câu hỏi (câu dẫn ngữ cảnh, phương án nhiễu) **cố gắng dùng từ ngữ cơ bản, thông dụng nhất có thể (Basic A1 - A2 / B1 quen thuộc)**. Câu văn ngắn gọn, dễ hiểu, tránh các từ vựng hoa mỹ/quá khó ngoài Unit để học sinh không bị ngợp và làm được bài.
   - Nam Việt (Lớp 12): Luôn ưu tiên đưa câu hỏi Từ vựng lên trước.
   - **Chuẩn UI Phòng Luyện Tập (`HighSchoolExamStudio`):** Luôn gắn `section_name` rõ ràng trong `question_payload` để hiển thị thanh chuyển phần (Section Pills); bài đọc hiểu/điền khuyết dùng `passage` hoặc ngăn cách bằng `\n\n**Question X:**` để UI chia 2 cột Đọc – Trả lời (`A-/A/A+`, Light Theme `variant="light"`); có thể kết hợp đa dạng loại bài (`MULTIPLE_CHOICE` + `FILL_IN_BLANK` kèm `accepted_answers`).
6. **Nạp dữ liệu vào Database:** Chạy script seed nạp DB (`learning_units`, `daily_student_assignments`, `assessments`, `questions`, `assessment_attempts`).
7. **Build & Deploy:** Kiểm tra `npm --prefix frontend run build`, commit & push lên `main` để Vercel cập nhật.
