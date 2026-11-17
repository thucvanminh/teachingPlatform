---
name: soanhoakeithley
description: >-
  Lệnh nhanh (/soanhoa hoặc /soanhoakeithley) tạo trọn gói bài giảng và bộ bài tập Hóa học lớp 9
  cho bạn Keithley Lake theo quy chuẩn Thầy Thức (100% tiếng Anh, chủ đề vũ trụ, đọc PDF_of_documents,
  KaTeX hóa học chuẩn, chống bẫy đáp án dài nhất, tương thích buzzer/chime, nạp database và push Vercel).
---

# Lệnh Nhanh Soạn Bài Hóa Học Keithley Lake (/soanhoa, /soanhoakeithley)

Khi người dùng gõ `/soanhoa`, `/soanhoakeithley`, hoặc gửi yêu cầu như:
- *"tạo bài tập hóa cho keithley bài X"*
- *"soạn bài giảng và bài tập hóa học cho keithley"*
- *"hôm nay chỉ có bài tập / hôm nay có cả bài giảng và bài tập"*

Thực hiện quy trình tạo bài giảng và bài tập Hóa học theo đúng hướng dẫn chuẩn tại:
👉 [keithley-chemistry](../keithley-chemistry/SKILL.md)

### Các bước thực thi tự động:
1. **Khai thác tài liệu nguồn (KHÔNG đọc file .md hay .txt truyền vào):**
   - Đọc trực tiếp các file PDF trong thư mục `PDF_of_documents/` ở thư mục gốc của dự án:
     + `PDF_of_documents/SGK-KHTN-Lop-9.pdf`
     + `PDF_of_documents/SBT_KHTN_Lop_9.pdf`
   - Dùng `pdftotext -f <trang_dau> -l <trang_cuoi>` để trích xuất lý thuyết, phương trình hóa học và bài tập.
   - Dùng **MCPs (Firecrawl, WebSearch)** để tra cứu các ứng dụng thực tế về điều chế, công nghiệp hóa chất, khai khoáng vũ trụ.
   - **Giới hạn nội dung đúng với bài học, không quá khó:** Bám sát chuẩn SGK KHTN 9.
2. **Xác định chế độ (Mode):**
   - Chỉ có bài tập (`EXERCISE_ONLY`)
   - Cả bài giảng và bài tập (`BOTH`)
   - Chỉ có bài giảng (`LECTURE_ONLY`)
3. **Biên soạn nội dung 100% Pure English (Chủ đề Vũ Trụ):**
   - 25 - 30 câu hỏi theo 8 Phân Khu Hành Tinh (Mercury $\to$ Neptune), thời lượng 90 phút.
   - **Chống bẫy đáp án dài nhất:** Trong các câu hỏi trắc nghiệm lý thuyết, **không phải lúc nào đáp án dài nhất cũng là đáp án đúng** (4 phương án A, B, C, D phải có độ dài tương đương hoặc đáp án đúng phân bổ ngẫu nhiên ngắn/vừa/dài, ngăn học sinh đoán mò).
   - **BẮT BUỘC:** Có `correct_option_id` trong `question_payload` để kích hoạt còi báo lỗi (Buzzer), âm chuông (Chime), và animation rung lắc.
4. **Nạp dữ liệu vào Database:** Chạy `.agents/skills/keithley-chemistry/scripts/seed_keithley_chemistry.js`.
5. **Build & Push Git:** Kiểm tra build Next.js, commit & push lên `main` để Vercel cập nhật bài học ngay lập tức.
