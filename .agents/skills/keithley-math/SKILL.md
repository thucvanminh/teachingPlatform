---
name: keithley-math
description: >-
  End-to-end curriculum and mission generator for student Keithley Lake (Grade 7 Math / MATH_7)
  under Thầy Thức. Generates 100% English cosmic space-themed missions, KaTeX formulas,
  vector SVG diagrams, in-session practice (90-120m), automated database seeding, and Vercel git sync.
  Use when the user asks to create math lessons, homework, or exercise cards for Keithley, e.g.
  "tạo bài tập toán cho keithley", "soạn bài học toán lớp 7 cho keithley", "tạo mission toán cho keithley".
---

# Quy Trình Tạo Bài Giảng & Bài Tập Toán Lớp 7 Cho Keithley Lake (Thầy Thức)

Kỹ năng này hướng dẫn thực hiện trọn gói quy trình tạo bài giảng và nhiệm vụ luyện tập toán học (`daily_student_assignments`) cho học sinh **Keithley Lake** (Lớp 7 - Chương trình Toán chuẩn quốc tế 100% Tiếng Anh).

---

## 1. Hồ Sơ Học Sinh & Định Danh Hệ Thống

| Thực thể | Tên / Mã | ID trong Hệ thống | Vai trò & Mục tiêu |
| :--- | :--- | :--- | :--- |
| **Học sinh** | **Keithley Lake** (`keithley`) | `4745136c-bd25-4f45-a488-9f00f2121b70` | Astronaut Cadet • Grade 7 Math & Chem 9 • 100% English |
| **Giáo viên** | **Thầy Thức** (`teacher`) | `dc62e5df-2344-4785-b058-b95f5dbe0983` | Flight Commander • Soạn đề, giám sát và chấm bài |
| **Môn học** | **Toán 7** (`MATH_7`) | `b1cfb82f-fa75-47eb-ba05-7281f6d3fdf2` | SGK Toán 7 Cánh Diều / Kết Nối Tri Thức bản chuẩn quốc tế |
| **Thư mục tài liệu gốc** | `/home/dantey/Dantey/teaching/lop6/Math/` | Thư mục cục bộ | Các file sách giáo khoa, bài tập chuyên đề Toán 7 |

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
- Tuân thủ hướng dẫn thiết kế SVG nền vũ trụ tại [svg_diagram_guidelines.md](./references/svg_diagram_guidelines.md).
- Chèn vào đề bài bằng cú pháp Markdown:
  ```markdown
  ![Figure: Description of Intersecting Vectors](/images/geometry/<slug_ten_hinh>.svg)
  ```

### Trụ cột 4: Chuẩn KaTeX & Độ Tương Phản Cao (High Contrast)
- Toàn bộ công thức và góc phải dùng chuẩn LaTeX: `\widehat{AOB}`, `180^\circ`, `\perp`, `\parallel`, `\dfrac{a}{b}`.
- Cấu hình KaTeX luôn sử dụng `output: 'html'` để **triệt tiêu hoàn toàn lỗi lặp ký tự MathML** (`A O B ^ AOB`).
- Toàn bộ câu hỏi hiển thị với màu chữ trắng sáng có bóng đổ `text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`.
- Các từ khóa trọng tâm bọc trong cặp dấu `**từ_khóa**` sẽ tự động hiển thị màu **cyan phát quang** (`text-cyan-200 drop-shadow`).

### Trụ cột 5: Đa Dạng Loại Câu Hỏi (Multi-Format Assessment)
Đề thi gồm 3 dạng câu hỏi đan xen:
1. **`MULTIPLE_CHOICE` (Trắc nghiệm 4 lựa chọn):** Chiếm ~70%, có 4 đáp án A, B, C, D rõ ràng.
2. **`FILL_IN_BLANK` (Điền số đo góc):** Học sinh tự gõ giá trị số (ví dụ: `132` hoặc `72°`).
3. **`ESSAY_UPLOAD` (Tự luận hình học & Nộp ảnh vở):** Học sinh gõ từng bước suy luận hình học hoặc đính kèm ảnh chụp bài giải trong vở.

---

## 3. Quy Trình Thực Hiện Từng Bước (A-Z Workflow)

```text
[Bước 1: Khai Thác Tài Liệu SGK Toán 7]
       ↓
[Bước 2: Thiết Kế File Vector SVG Hình Học]
       ↓
[Bước 3: Soạn Payload JSON Nhiệm Vụ Vũ Trụ]
       ↓
[Bước 4: Nạp Tự Động Vào Database (seed_keithley_math.js)]
       ↓
[Bước 5: Build Kiểm Tra & Push Lên GitHub / Deploy Vercel]
```

---

### Bước 1: Khai Thác Tài Liệu SGK Toán 7
1. Đọc tài liệu tại `/home/dantey/Dantey/teaching/lop6/Math/` (ví dụ thư mục `Grade7_29_10/` hoặc các file PDF SGK Toán 7).
2. Xác định trọng tâm bài học (ví dụ: *Bài 8: Góc ở vị trí đặc biệt. Tia phân giác của một góc* hoặc *Bài 9: Hai đường thẳng song song và dấu hiệu nhận biết*).
3. Lập dàn ý 25 - 30 câu hỏi phủ khắp 8 Trạm Hành Tinh từ dễ, trung bình, khá đến nâng cao.

---

### Bước 2: Thiết Kế File Vector SVG Hình Học
Đối với các câu hỏi cần hình vẽ trực quan:
1. Tạo file `.svg` trong thư mục `frontend/public/images/geometry/`.
2. Áp dụng chuẩn thiết kế: kích thước `viewBox="0 0 540 320"`, nền gradient tối `#080D1A`, đường nét phát sáng neon, điểm nút $O$ phát quang, nhãn góc rõ ràng.
3. Kiểm tra bằng lệnh:
   ```bash
   curl -s http://localhost:3000/images/geometry/<ten_file>.svg | head -n 5
   ```

---

### Bước 3: Soạn Payload JSON Nhiệm Vụ Vũ Trụ
Tạo file JSON tạm thời (ví dụ: `keithley_payload.json`) dựa theo cấu trúc chuẩn tại [math_mission_payload.json](./templates/math_mission_payload.json):
- `assignedDate`: Ngày học theo định dạng `YYYY-MM-DD`.
- `unitTitle`: Tên bài học tiếng Anh (ví dụ: `Lesson 8: Special Angle Pairs & Angle Bisectors`).
- `unitDescription`: Mô tả ngắn gọn về nhiệm vụ chuyến bay.
- `lectureMarkdown`: Tóm tắt lý thuyết chuyến bay (Space Flight Briefing) với công thức KaTeX.
- `teacherNote`: Lời dặn dò truyền cảm hứng từ Thầy Thức.
- `assessmentTitle`: Tiêu đề bài kiểm tra 90-120 phút.
- `questions`: Mảng 25 - 30 câu hỏi gồm đầy đủ `order_index`, `points`, `sectionName`, `content_markdown`, `options` / `acceptable_answers` / `rubric`, và `explanation`.

---

### Bước 4: Nạp Tự Động Vào Database (Prisma Seeding)
Chạy script nạp tự động chuyên dụng:
```bash
node .agents/skills/keithley-math/scripts/seed_keithley_math.js --payload keithley_payload.json
```
Script sẽ tự động:
1. Dọn dẹp các assignment và attempt cũ của Keithley trong ngày đó (nếu có).
2. Tạo bản ghi `learning_units` (Flight Briefing).
3. Tạo thẻ bài học hàng ngày `daily_student_assignments`.
4. Tạo bài kiểm tra `assessments` (In-Session 90-120 phút).
5. Nạp đồng loạt toàn bộ câu hỏi vào bảng `questions`.
6. Khởi tạo `assessment_attempts` với trạng thái sẵn sàng làm bài.

---

### Bước 5: Build Kiểm Tra & Push Lên GitHub / Deploy Vercel
> [!CAUTION]
> Sau khi nạp database, **BẮT BUỘC PHẢI COMMIT VÀ PUSH LÊN GITHUB** để Vercel nhận file SVG mới và bản cập nhật frontend:

1. Chạy biên dịch kiểm tra tính toàn vẹn của Typescript và Next.js:
   ```bash
   npm run build --prefix frontend
   ```
2. Thêm toàn bộ các file ảnh SVG mới và code thay đổi vào Git:
   ```bash
   git add -A
   git commit -m "feat(keithley): deploy math mission [Lesson Name] for Keithley Lake"
   git push origin main
   ```
3. Chờ 30 - 60 giây để Vercel Production hoàn tất việc build và deploy tự động.

---

## 4. Checklist Kiểm Định Trước Khi Hoàn Tất (Quality Control)

- [ ] **100% Tiếng Anh:** Đã rà soát không còn bất kỳ chữ tiếng Việt nào trong ngoặc đơn ở đề bài và đáp án.
- [ ] **Không có ASCII Art:** Tất cả hình vẽ hình học đều là file `.svg` đặt trong `frontend/public/images/geometry/`.
- [ ] **Độ tương phản cao:** Chữ đề bài trắng sáng, công thức toán KaTeX không bị đen chìm vào nền.
- [ ] **KaTeX chuẩn:** Đã kiểm tra không bị hiện lỗi chồng chữ `A O B ^ AOB`.
- [ ] **Đã Push Git:** Đã thực hiện `git push origin main` thành công để Vercel cập nhật file ảnh và code mới.
- [ ] **Đăng nhập kiểm tra:** Tài khoản `keithley` (mật khẩu: `123456`) đăng nhập thấy đúng nhiệm vụ của ngày chỉ định.
