---
name: keithley-math
description: >-
  End-to-end curriculum and mission generator for student Keithley Lake (Grade 7 Math / MATH_7)
  under Thầy Thức. Generates 100% English cosmic space-themed missions from PDF_of_documents, KaTeX formulas,
  vector SVG diagrams, anti-longest-option balance, automated database seeding, and Vercel git sync.
  Use when the user asks to create math lessons, homework, or exercise cards for Keithley, e.g.
  "tạo bài tập toán cho keithley", "soạn bài học toán lớp 7 cho keithley", "tạo mission toán cho keithley".
---

# Quy Trình Tạo Bài Giảng & Bài Tập Toán Lớp 7 Cho Keithley Lake (Thầy Thức)

Kỹ năng này hướng dẫn thực hiện trọn gói quy trình tạo bài giảng và nhiệm vụ luyện tập toán học (`daily_student_assignments`) cho học sinh **Keithley Lake** (Lớp 7 - Chương trình Toán chuẩn quốc tế 100% Tiếng Anh, chủ đề vũ trụ).

---

## 1. Hồ Sơ Học Sinh & Định Danh Hệ Thống

| Thực thể | Tên / Mã | ID trong Hệ thống | Vai trò & Mục tiêu |
| :--- | :--- | :--- | :--- |
| **Học sinh** | **Keithley Lake** (`keithley`) | `4745136c-bd25-4f45-a488-9f00f2121b70` | Astronaut Cadet • Grade 7 Math & Chem 9 • 100% English |
| **Giáo viên** | **Thầy Thức** (`teacher`) | `dc62e5df-2344-4785-b058-b95f5dbe0983` | Flight Commander • Soạn đề, giám sát và chấm bài |
| **Môn học** | **Toán 7** (`MATH_7`) | `e89cc834-99d0-40b7-ab5e-0a0838d273c4` | SGK Toán 7 Cánh Diều / Kết Nối Tri Thức bản chuẩn quốc tế |
| **File PDF SGK chuẩn** | `PDF_of_documents/sach-giao-khoa-toan-7-tap-1-ket-noi-tri-thuc-voi-cuoc-song.pdf` | Thư mục `PDF_of_documents/` ở gốc dự án | Toàn văn SGK Toán 7 Kết Nối Tri Thức Tập 1 |

### Công Cụ Xử Lý Dữ Liệu & Tài Liệu Nguồn:
> [!IMPORTANT]
> **Tuyệt đối KHÔNG đọc file `.md` hay `.txt` truyền vào nữa.** Dữ liệu bài học được trích xuất trực tiếp từ file PDF SGK Toán 7 tại `PDF_of_documents/`, kết hợp nghiên cứu qua MCPs.
- **`pdftotext`:** Trích xuất nhanh văn bản bài học & bài tập từ file PDF SGK Toán 7:
  `pdftotext -f <trang_dau> -l <trang_cuoi> PDF_of_documents/sach-giao-khoa-toan-7-tap-1-ket-noi-tri-thuc-voi-cuoc-song.pdf -`
- **Vision `read` & `pdftoppm`:** Nếu trang SGK chứa sơ đồ hình học, dùng `pdftoppm -png -r 150` xuất ảnh và dùng công cụ `read` để lập trình lại thành vector SVG chuẩn xác.
- **MCP `firecrawl` / WebSearch:** Tra cứu thêm các bài toán thực tế quốc tế (NASA/Space missions, quỹ đạo vệ tinh) liên quan đến bài học để lồng ghép cốt truyện không gian.
- **Giới hạn nội dung đúng với bài học, không quá khó:** Bám sát chuẩn kiến thức kỹ năng của SGK Toán 7, tránh đưa các định lý quá cao siêu ngoài chương trình.
- **`pandoc`:** Xuất phiếu bài tập hoặc đề thi ra file Word `.docx` khi Thầy cần bản in:
  `pandoc mission_math7.md -o mission_math7.docx`

---

## 2. 5 Trụ Cột Vàng Bắt Buộc (The 5 Golden Pillars)

> [!IMPORTANT]
> Mọi bài học và đề toán tạo cho Keithley Lake **BẮT BUỘC** tuân thủ nghiêm ngặt 5 tiêu chuẩn sau:

### Trụ cột 1: 100% Pure English Immersion (Không tiếng Việt)
- **Tuyệt đối không đính kèm từ tiếng Việt** trong ngoặc đơn ở đề bài, các phương án hay lời giải (ví dụ: dùng `adjacent angles`, `linear pair`, `vertical opposite angles`, `angle bisector` thay vì `(kề nhau)`, `(kề bù)`, `(đối đỉnh)`).
- Toàn bộ giao diện học sinh từ Trang Đăng nhập, Thanh Điều Hướng, Bảng điều khiển, Phòng làm bài, Đồng hồ đếm giờ, Hộp thoại xác nhận đến Bảng kết quả đều hiển thị 100% Tiếng Anh.

### Trụ cột 2: Cosmic Space Theme & Storytelling (Chủ đề Vũ Trụ)
- Đề bài được cấu trúc theo hành trình thám hiểm vũ trụ qua **8 Trạm Hành Tinh trong Hệ Mặt Trời (Planetary Stations)**:
  - *Sector 1: Mercury Orbit* • Nền tảng định nghĩa góc.
  - *Sector 2: Venus Base* • Nhận diện hình học và góc kề bù.
  - *Sector 3: Earth Mission Control* • Tính toán số đo góc và góc đối đỉnh.
  - *Sector 4: Mars Outpost* • Phương trình và bài toán tìm góc ẩn ($x$).
  - *Sector 5: Jupiter Station* • Định lý tia phân giác và quỹ đạo chia đôi góc.
  - *Sector 6: Saturn Rings* • Các định lý vuông góc và tia đối.
  - *Sector 7: Uranus Deep Space* • Bài toán chứng minh hình học đa bước.
  - *Sector 8: Neptune Frontier* • Bài toán ứng dụng viễn thám thực tế.
- **Thời lượng:** Đề bài thiết kế từ **25 - 30 câu**, làm trong **90 - 120 phút**.
- Mỗi câu hỏi tích hợp đồng hồ phụ **2 phút mặc định (Question Chronometer)** kèm các nút điều khiển nhanh `+30s`, `-30s`, `+1m`, `Pause`, `Reset`.

### Trụ cột 3: Đồ Họa Vector SVG Sắc Nét (Nghiêm Cấm Vẽ Bằng Ký Tự ASCII)
- **Tuyệt đối không dùng ký tự bàn phím để vẽ hình** (`---+---`, `\ /`, `x | y`).
- Mỗi bài toán hình học có hình vẽ minh họa phải được thiết kế thành file vector SVG chuyên dụng đặt tại:
  `frontend/public/images/geometry/<slug_ten_hinh>.svg`
- Chèn vào đề bài bằng cú pháp Markdown:
  ```markdown
  ![Figure: Description of Intersecting Vectors](/images/geometry/<slug_ten_hinh>.svg)
  ```

### Trụ cột 4: Chuẩn KaTeX & Độ Tương Phản Cao (High Contrast)
- Toàn bộ công thức và góc phải dùng chuẩn LaTeX: `\widehat{AOB}`, `180^\circ`, `\perp`, `\parallel`, `\dfrac{a}{b}`.
- Cấu hình KaTeX luôn sử dụng `output: 'html'` để **triệt tiêu hoàn toàn lỗi lặp ký tự MathML** (`A O B ^ AOB`).
- Toàn bộ câu hỏi hiển thị với màu chữ trắng sáng có bóng đổ `text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`.

### Trụ cột 5: Cân Bằng Phương Án Trắc Nghiệm & Chống Bẫy Đáp Án Dài Nhất (Anti-Longest-Option Bias)
> [!CAUTION]
> **Quy tắc sư phạm tối thượng:** Trong các câu trắc nghiệm lý thuyết hoặc định lý hình học, **tuyệt đối không được để đáp án dài nhất luôn luôn là đáp án đúng!**
> - Các phương án A, B, C, D phải được diễn đạt súc tích với **độ dài tương đương nhau**.
> - Đáp án đúng phải được phân bổ cân bằng và ngẫu nhiên (lúc là câu ngắn, lúc là câu trung bình, lúc là câu dài), triệt tiêu thói quen học sinh đoán mò theo "mẹo câu dài nhất" thay vì suy luận toán học.
- Đề thi gồm 3 dạng câu hỏi đan xen:
  1. **`MULTIPLE_CHOICE` (Trắc nghiệm 4 lựa chọn):** Chiếm ~70%, 4 đáp án A, B, C, D rõ ràng, cân đối.
  2. **`FILL_IN_BLANK` (Điền số đo góc):** Học sinh tự gõ giá trị số (ví dụ: `132` hoặc `72°`).
  3. **`ESSAY_UPLOAD` (Tự luận hình học & Nộp ảnh vở):** Học sinh gõ từng bước suy luận hình học hoặc đính kèm ảnh chụp bài giải trong vở.

---

## 3. Quy Trình Thực Hiện Từng Bước (A-Z Workflow)

```text
[Bước 1: Trích Xuất Dữ Liệu SGK Toán 7 Từ PDF_of_documents/ & Nghiên Cứu MCPs]
       ↓
[Bước 2: Thiết Kế File Vector SVG Hình Học (Nếu Có)]
       ↓
[Bước 3: Soạn Payload JSON Nhiệm Vụ Vũ Trụ (Cân Đối Độ Dài Đáp Án)]
       ↓
[Bước 4: Nạp Tự Động Vào Database (seed_keithley_math.js)]
       ↓
[Bước 5: Build Kiểm Tra & Push Lên GitHub / Deploy Vercel]
```

### Bước 1: Khai Thác Tài Liệu SGK Toán 7
1. Đọc trực tiếp file PDF tại `PDF_of_documents/sach-giao-khoa-toan-7-tap-1-ket-noi-tri-thuc-voi-cuoc-song.pdf` bằng `pdftotext`.
2. Xác định phạm vi bài học (ví dụ: *Bài 8: Góc ở vị trí đặc biệt. Tia phân giác* hoặc *Bài 9: Hai đường thẳng song song*).
3. Lập dàn ý 25 - 30 câu hỏi phủ khắp 8 Trạm Hành Tinh. Tra cứu thêm qua WebSearch / Firecrawl để bổ sung ngữ cảnh không gian thực tế, **đảm bảo kiến thức đúng bài học và vừa sức**.

### Bước 2: Thiết Kế File Vector SVG Hình Học
1. Tạo file `.svg` trong thư mục `frontend/public/images/geometry/`.
2. Áp dụng chuẩn thiết kế: kích thước `viewBox="0 0 540 320"`, nền gradient tối `#080D1A`, đường nét phát sáng neon, điểm nút phát quang, nhãn góc rõ ràng.

### Bước 3: Soạn Payload JSON Nhiệm Vụ Vũ Trụ
1. Soạn thảo 25 - 30 câu hỏi theo 8 Phân khu (Sector 1 -> Sector 8).
2. **Kiểm tra độ dài đáp án trắc nghiệm:** Đảm bảo không rơi vào bẫy "đáp án dài nhất luôn đúng".

### Bước 4: Nạp Tự Động Vào Database
Chạy script seed:
```bash
node .agents/skills/keithley-math/scripts/seed_keithley_math.js
```

### Bước 5: Build & Push Git
1. `npm --prefix frontend run build`
2. `git add frontend/ .agents/ .opencode/ .claude/`
3. `git commit -m "feat(math7): add mission for Keithley Lake on <date>"`
4. `git push origin main`
