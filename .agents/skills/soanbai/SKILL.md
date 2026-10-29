---
name: soanbai
description: >-
  Lệnh nhanh (/soanbai) tạo trọn gói bài giảng tương tác và bài tập tiếng Anh từ A-Z
  cho bạn Thái (Lớp 11) hoặc bạn Nam Việt (Lớp 12) theo quy chuẩn Thầy Thức.
---

# Lệnh Nhanh Soạn Bài Tiếng Anh Từ A-Z (/soanbai)

Khi người dùng gõ `/soanbai [tên học sinh] [ngày] [chủ đề]`:

Thực hiện quy trình tạo bài giảng và bài tập theo đúng hướng dẫn chuẩn tại:
👉 [teaching-english-curriculum](../teaching-english-curriculum/SKILL.md)

### Các bước thực thi tự động:
1. **Nhận diện học sinh:** Thái (Lớp 11 - 8.5+) hoặc Nam Việt (Lớp 12 - 7+ THPTQG).
2. **Khai thác dữ liệu:** Đọc tài liệu tại `/home/dantey/Dantey/teaching/lop_11/` hoặc `/home/dantey/Dantey/teaching/lop12NamViet/`.
3. **Tạo Phòng học tương tác:** Sinh ứng dụng web tại `frontend/public/lectures/<slug>/` (50 từ vựng phát âm bản xứ, 3 chuyên đề ngữ pháp, Collocation game, Word family tree, Active recall, Sentence writing).
4. **Nạp dữ liệu vào Database:** Chạy `.agents/skills/teaching-english-curriculum/scripts/seed_english_lesson.js`.
5. **Build & Deploy:** Kiểm tra `npm --prefix frontend run build`, commit & push lên `main` để Vercel cập nhật.
