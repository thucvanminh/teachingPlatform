---
name: soantoankeithley
description: >-
  Lệnh nhanh (/soantoan hoặc /soantoankeithley) tạo trọn gói bài giảng và bộ bài tập Toán lớp 7
  cho bạn Keithley Lake theo quy chuẩn Thầy Thức (100% tiếng Anh, chủ đề vũ trụ, đọc PDF_of_documents,
  vẽ vector SVG, KaTeX chuẩn, chống bẫy đáp án dài nhất, nạp database và push Vercel).
---

# Lệnh Nhanh Soạn Bài Toán Keithley Lake (/soantoan, /soantoankeithley)

Khi người dùng gõ `/soantoankeithley` hoặc `/soantoan [ngày] [bài học]`:

Thực hiện quy trình tạo bài giảng và bài tập toán theo đúng hướng dẫn chuẩn tại:
👉 [keithley-math](../keithley-math/SKILL.md)

### Các bước thực thi tự động:
1. **Khai thác tài liệu nguồn (KHÔNG đọc file .md truyền vào):**
   - Đọc trực tiếp file PDF SGK Toán 7 trong thư mục `PDF_of_documents/` ở thư mục gốc của dự án:
     `PDF_of_documents/sach-giao-khoa-toan-7-tap-1-ket-noi-tri-thuc-voi-cuoc-song.pdf`
   - Dùng `pdftotext -f <trang_dau> -l <trang_cuoi>` để trích xuất lý thuyết và bài tập.
   - Nếu có hình vẽ hình học trong SGK, xuất ảnh bằng `pdftoppm` và dùng `read` để lập trình lại file vector SVG chuẩn xác.
   - Dùng **MCPs (Firecrawl, WebSearch)** để tra cứu các ứng dụng thực tế về vũ trụ, cơ học không gian, viễn thám liên quan đến bài học.
   - **Giới hạn nội dung đúng với bài học, không quá khó:** Bám sát chuẩn SGK Toán 7.
2. **Thiết kế hình ảnh Vector:** Vẽ hình học bằng file SVG tại `frontend/public/images/geometry/` (tuyệt đối không dùng ký tự ASCII art).
3. **Soạn bài 100% Pure English (Chủ đề Vũ Trụ):**
   - 25 - 30 câu hỏi theo 8 Trạm Hành Tinh trong Hệ Mặt Trời (Mercury $\to$ Neptune), thời lượng 90-120 phút.
   - **Chống bẫy đáp án dài nhất:** Trong các câu trắc nghiệm lý thuyết, **không phải lúc nào đáp án dài nhất cũng là đáp án đúng** (các phương án A, B, C, D phải có độ dài tương đương hoặc đáp án đúng phân bổ đều ngắn/vừa/dài, ngăn học sinh đoán mò).
4. **Nạp dữ liệu vào Database:** Chạy `.agents/skills/keithley-math/scripts/seed_keithley_math.js`.
5. **Build & Push Git:** Kiểm tra build Next.js, commit & push lên `main` để Vercel cập nhật file ảnh và bài học.
