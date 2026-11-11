# Command: /soantoankeithley (hoặc /soantoan)
Mục đích: Lệnh tạo trọn gói bài giảng và bộ bài tập Toán lớp 7 cho học sinh Keithley Lake theo quy chuẩn Thầy Thức.

## Input Parameters:
$ARGUMENTS
(Cú pháp hỗ trợ: `/soantoankeithley [ngày học: YYYY-MM-DD] [tên bài học / chuyên đề hình học/đại số]`)

---

## QUY TRÌNH THỰC THI CHI TIẾT

### Bước 1: Thông tin học sinh & hệ thống
- Học sinh: **Keithley Lake** (`keithley` - ID: `4745136c-bd25-4f45-a488-9f00f2121b70`)
- Giáo viên: **Thầy Thức** (`teacher` - ID: `dc62e5df-2344-4785-b058-b95f5dbe0983`)
- Môn học: **Toán 7** (`MATH_7` - ID: `b1cfb82f-fa75-47eb-ba05-7281f6d3fdf2`)
- Thư mục tài liệu gốc: `/home/dantey/Dantey/teaching/lop6/Math/`

### Bước 2: 5 Trụ cột vàng BẮT BUỘC
1. **100% Pure English Immersion:** Tuyệt đối không có bất kỳ từ tiếng Việt nào trong ngoặc đơn (VD: dùng `adjacent angles`, `linear pair`, `vertical opposite angles`, `angle bisector` thay vì kẹp chữ tiếng Việt).
2. **Cosmic Space Mission:** Đề bài gồm 25-30 câu hỏi trải dài qua 8 Trạm Hành Tinh trong Hệ Mặt Trời (Mercury $\to$ Neptune), thời lượng 90-120 phút.
3. **KaTeX Toán học chuẩn:** Không dùng ký tự lạ hay MathML thô, cấu hình chuẩn KaTeX cho công thức toán, số đo góc $\widehat{xOy}$, số hữu tỉ, phương trình.
4. **Đồ họa Vector SVG sắc nét:** Nếu bài học liên quan đến Hình học, **BẮT BUỘC vẽ file SVG chuẩn** và lưu vào `frontend/public/images/geometry/` (tuyệt đối không dùng ASCII art thô sơ).
5. **Đầy đủ đáp án & giải thích:** Mỗi câu trắc nghiệm có 4 lựa chọn, đáp án đúng và lời giải thích song ngữ khoa học/truyền cảm hứng từ Flight Commander Thầy Thức.

### Bước 3: Nạp dữ liệu vào Database (Prisma Seed)
- Chạy script seed nạp dữ liệu (tham khảo `.agents/skills/keithley-math/scripts/seed_keithley_math.js`).
- Seed vào các bảng: `learning_units`, `daily_student_assignments`, `assessments`, `questions`, `assessment_attempts`.

### Bước 4: Build & Push Production
1. Kiểm tra build frontend: `npm --prefix frontend run build`
2. Commit và push lên nhánh `main` để Vercel deploy cập nhật tức thì.
