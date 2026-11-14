---
description: Tạo trọn gói bài giảng và bộ bài tập Hóa học lớp 9 cho học sinh Keithley Lake từ file .txt hoặc .md theo quy chuẩn Thầy Thức.
---
# Command: /soanhoakeithley
Mục đích: Lệnh tạo trọn gói bài giảng và bộ bài tập Hóa học lớp 9 cho học sinh Keithley Lake từ file .txt hoặc .md theo quy chuẩn Thầy Thức.

## Input Parameters:
$ARGUMENTS
(Cú pháp hỗ trợ: `/soanhoakeithley [đường dẫn file .txt / .md] [mode: EXERCISE_ONLY | BOTH | LECTURE_ONLY]`)

---

## QUY TRÌNH THỰC THI CHI TIẾT

### Bước 1: Thông tin học sinh & hệ thống
- Học sinh: **Keithley Lake** (`keithley` - ID: `4745136c-bd25-4f45-a488-9f00f2121b70`)
- Giáo viên: **Thầy Thức** (`teacher` - ID: `dc62e5df-2344-4785-b058-b95f5dbe0983`)
- Môn học: **Hóa học 9** (`CHEM_9` - ID: `6fc7387b-13b8-4e27-8240-a60c03dc1d51`)
- Thư mục tài liệu gốc: `/home/dantey/Dantey/teaching/lop6/Chemistry/` (hoặc file Thầy truyền vào ở `$ARGUMENTS`).

### Bước 2: Xác định chế độ soạn bài (3 Chế độ)
1. `EXERCISE_ONLY` (Chỉ làm bài tập): Soạn bộ 25-30 câu trắc nghiệm chia 8 Trạm Hành Tinh trong 90 phút.
2. `BOTH` (Cả bài giảng & bài tập): Tóm tắt lý thuyết không gian KaTeX trong `learning_units` + (tùy chọn) Web Studio mô phỏng tại `frontend/public/lectures/chem9-<slug>/` + Bộ câu hỏi 90 phút.
3. `LECTURE_ONLY` (Chỉ bài giảng): Tạo bài giảng Deep Space Flight Briefing, không áp lực làm bài tính điểm.

### Bước 3: Tiêu chuẩn nội dung BẮT BUỘC
- **100% Tiếng Anh chuẩn Quốc tế:** Tuyệt đối không có tiếng Việt.
- **Chủ đề Vũ Trụ (Cosmic Space Mission):** Ẩn dụ phi thuyền, quặng thiên thạch, 8 Trạm Hành Tinh từ Thủy Tinh (Mercury) đến Hải Vương Tinh (Neptune).
- **KaTeX Hóa học chuẩn xác:** Sử dụng đúng KaTeX render chuẩn (ví dụ: `\text{CH}_3\text{COOH}`, `\text{mol}`, phản ứng hóa học có điều kiện nhiệt độ).
- **ĐẶC BIỆT QUAN TRỌNG:** Trong JSON `question_payload` của từng câu hỏi, **BẮT BUỘC** phải có trường `"correct_option_id": "<ID_ĐÁP_ÁN_ĐÚNG>"` (song song với mảng `options`). Đây là điều kiện tiên quyết để hệ thống kích hoạt âm thanh còi báo lỗi (Buzzer), chuông thành công (Chime) và animation rung giật màn hình khi học sinh chọn đáp án!

### Bước 4: Nạp dữ liệu vào Database (Prisma Seed)
- Chạy hoặc tạo script nạp dữ liệu (tham khảo `.agents/skills/keithley-chemistry/scripts/seed_keithley_chemistry.js`).
- Seed vào các bảng: `learning_units`, `daily_student_assignments`, `assessments`, `questions`, `assessment_attempts`.

### Bước 5: Build & Push Production
1. Kiểm tra build frontend: `npm --prefix frontend run build`
2. Commit và push lên nhánh `main` để Vercel deploy cập nhật tức thì.
