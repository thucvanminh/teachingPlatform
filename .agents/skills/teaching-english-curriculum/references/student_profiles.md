# Student Profiles & Teaching Standards (Hồ Sơ Học Sinh & Quy Chuẩn Giảng Dạy)

This reference contains the exact student profiles, curricula, target scores, and repository locations for English tutoring under **Thầy Thức**.

---

## 1. Học sinh: Nam Việt (Lớp 12)

- **Username:** `nam_viet`
- **Default Password:** `Password123!`
- **Cấp độ:** Lớp 12 THPT (Chương trình Tiếng Anh 12 Global Success)
- **Môn học:** `ENG_12` (ID: Subject code `ENG_12`)
- **Mục tiêu điểm số:** **7+ Điểm Thi THPT Quốc Gia** (Tập trung chắc chắn phần Từ vựng, Ngữ pháp cơ bản đến trung cấp, Đọc hiểu ngắn, Liên từ, Tránh bẫy cơ bản).
- **Thư mục tài liệu gốc:** `/home/dantey/Dantey/teaching/lop12NamViet/`
  - Units: `Unit4_Urbanisation_Vocab_Grammar_Handbook.html`, `Unit5_Lop12_Global_Success_The_World_of_Work.html`, chuyên đề câu bị động, điều kiện, tường thuật, liên từ...
- **Đặc điểm giao diện & bài tập:**
  - **Sắp xếp thứ tự bài tập:** Luôn ưu tiên đưa **các câu hỏi Từ vựng (Vocabulary & Collocations) lên đầu**, sau đó đến Ngữ pháp, và cuối cùng là Đọc hiểu / Điền từ đoạn văn.
  - **Trải nghiệm Mobile-first:** Giao diện làm bài 1 câu hỏi trên 1 màn hình (không để học sinh phải cuộn trang dài), nút Next chuyển mượt mà giữa các câu.
  - **Hình thức bài tập:** Thường dồn toàn bộ câu hỏi vào bài tập làm trên lớp (`IN_SESSION_90M`), trừ khi thầy yêu cầu tách BTVN (`HOMEWORK`).

---

## 2. Học sinh: Thái (Lớp 11)

- **Username:** `thai`
- **Default Password:** `Password123!`
- **Cấp độ:** Lớp 11 THPT (Chương trình Tiếng Anh 11 Global Success)
- **Môn học:** `ENG_11` (ID: Subject code `ENG_11`)
- **Mục tiêu điểm số:** **8.5+ Điểm Giữa kì & THPT Quốc Gia** (Hướng đến mục tiêu học sinh khá giỏi, nắm vững toàn diện ngữ pháp chuyên sâu, từ vựng mở rộng, phản xạ đặt câu chủ động).
- **Thư mục tài liệu gốc:** `/home/dantey/Dantey/teaching/lop_11/`
  - Units 1, 2, 3: A Long and Healthy Life, The Generation Gap, Cities of the Future.
  - Tệp đề thi & tài liệu: `mid_term_1_english_11_practice_test.txt`, `kiemtragiuakiEnglish11GlobalSuccess.txt`, `tu_vung_collocations_English11.html`.
- **Đặc điểm bài giảng & bài tập:**
  - **Không dùng bài giảng văn bản thô nhàm chán.** Phải tạo một **Phòng Học Tương Tác Web (HTML5/CSS3/JS)** riêng biệt tại `frontend/public/lectures/<slug>/index.html`.
  - **Cấu trúc bài giảng tương tác bao gồm:**
    1. Cẩm nang 50 Từ vựng cốt lõi + 3 Chuyên đề ngữ pháp (kèm 4 công thức viết lại câu kinh điển).
    2. Đấu trường Nối từ Collocation (Click/Tap Game kèm âm thanh Web Audio).
    3. Phát hiện từ sai Odd One Out Collocation.
    4. Sơ đồ cây họ từ Word Family Tree & Điền dạng từ Open Cloze.
    5. Đoán chữ siêu tốc Active Recall (First-Letter Clue + định nghĩa tiếng Anh).
    6. Thử thách Đặt câu tương tác có thuật toán chấm và sửa bẫy ngữ pháp tự động.
  - **Bài tập làm trên lớp:** 60 - 100 câu trắc nghiệm 90 phút (bỏ phần Phonetics nếu yêu cầu, dồn trọng tâm vào Từ vựng & Ngữ pháp).

---

## 3. Quy chuẩn chung toàn hệ thống

1. **Danh xưng giáo viên:** Luôn sử dụng danh xưng **Thầy Thức** trên toàn bộ hệ thống (lời dặn, tiêu đề bài giảng, câu mẫu, báo cáo phụ huynh).
2. **Giao diện sáng (Light Theme):** Nền sáng (`#f8fafc`), thẻ trắng (`#ffffff`), chữ đậm nét tương phản cao (`#0f172a`), không dùng nền tối đen cho học sinh cấp 3.
3. **Triển khai Production:** Luôn chạy `npm run build` kiểm tra 0 lỗi trước khi commit & push lên GitHub `main` để kích hoạt Vercel tự động deploy.
