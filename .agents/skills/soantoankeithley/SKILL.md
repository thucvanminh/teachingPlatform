---
name: soantoankeithley
description: >-
  Lệnh nhanh (/soantoan hoặc /soantoankeithley) tạo trọn gói bài giảng và bộ bài tập Toán lớp 7
  cho bạn Keithley Lake theo quy chuẩn Thầy Thức (100% tiếng Anh, chủ đề vũ trụ, vẽ vector SVG,
  KaTeX chuẩn, nạp database và push Vercel).
---

# Lệnh Nhanh Soạn Bài Toán Keithley Lake (/soantoan, /soantoankeithley)

Khi người dùng gõ `/soantoankeithley` hoặc `/soantoan [ngày] [bài học]`:

Thực hiện quy trình tạo bài giảng và bài tập toán theo đúng hướng dẫn chuẩn tại:
👉 [keithley-math](../keithley-math/SKILL.md)

### Các bước thực thi tự động:
1. **Khai thác tài liệu:** Đọc SGK Toán 7 tại `/home/dantey/Dantey/teaching/lop6/Math/`.
2. **Thiết kế hình ảnh Vector:** Vẽ hình học bằng file SVG tại `frontend/public/images/geometry/` (tuyệt đối không dùng ASCII art).
3. **Soạn bài 100% Tiếng Anh:** 25 - 30 câu hỏi theo 8 Trạm Hành Tinh trong Hệ Mặt Trời (Mercury -> Neptune), thời lượng 90-120 phút.
4. **Nạp dữ liệu vào Database:** Chạy `.agents/skills/keithley-math/scripts/seed_keithley_math.js`.
5. **Build & Push Git:** Kiểm tra build Next.js, commit & push lên `main` để Vercel cập nhật file ảnh và bài học.
