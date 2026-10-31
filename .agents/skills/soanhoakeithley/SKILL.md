---
name: soanhoakeithley
description: >-
  Lệnh nhanh (/soanhoa hoặc /soanhoakeithley) tạo trọn gói bài giảng và bộ bài tập Hóa học lớp 9
  cho bạn Keithley Lake từ file .txt hoặc .md theo quy chuẩn Thầy Thức (100% tiếng Anh, chủ đề vũ trụ,
  KaTeX hóa học chuẩn, tương thích âm thanh buzzer/chime, nạp database và push Vercel).
---

# Lệnh Nhanh Soạn Bài Hóa Học Keithley Lake (/soanhoa, /soanhoakeithley)

Khi người dùng gõ `/soanhoa`, `/soanhoakeithley`, hoặc gửi yêu cầu như:
- *"tạo bài tập hóa cho keithley từ file X"*
- *"soạn bài giảng và bài tập hóa học cho keithley"*
- *"soạn bài hóa từ file .txt này giúp tôi"*
- *"hôm nay chỉ có bài tập / hôm nay có cả bài giảng và bài tập"*

Thực hiện quy trình tạo bài giảng và bài tập Hóa học theo đúng hướng dẫn chuẩn tại:
👉 [keithley-chemistry](../keithley-chemistry/SKILL.md)

### Các bước thực thi tự động:
1. **Đọc tài liệu nguồn:** Đọc file `.txt` hoặc `.md` Thầy cung cấp tại `/home/dantey/Dantey/teaching/lop6/Chemistry/` (hoặc đường dẫn Thầy chỉ định).
2. **Xác định chế độ (Mode):**
   - Chỉ có bài tập (`EXERCISE_ONLY`)
   - Cả bài giảng và bài tập (`BOTH`)
   - Chỉ có bài giảng (`LECTURE_ONLY`)
3. **Biên soạn nội dung 100% Tiếng Anh:**
   - 25 - 30 câu hỏi theo 8 Phân Khu Hành Tinh (Mercury $\to$ Neptune), thời lượng 90 phút.
   - BẮT BUỘC có `correct_option_id` trong `question_payload` để kích hoạt còi báo lỗi (Buzzer), âm chuông (Chime), và animation rung lắc.
4. **Nạp dữ liệu vào Database:** Chạy `.agents/skills/keithley-chemistry/scripts/seed_keithley_chemistry.js`.
5. **Build & Push Git:** Kiểm tra build Next.js, commit & push lên `main` để Vercel cập nhật file bài học ngay lập tức.
