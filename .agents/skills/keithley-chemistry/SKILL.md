---
name: keithley-chemistry
description: >-
  End-to-end chemistry curriculum, lecture, and exercise mission generator for student Keithley Lake
  (Astronaut Cadet Thiện, Grade 9 Chemistry / CHEM_9) under Thầy Thức. Supports 3 operational modes
  from PDF_of_documents. Generates 100% English cosmic space-themed missions, KaTeX formulas,
  anti-longest-option balance, real-time audio & shake animation (correct_option_id), automated database seeding, and Vercel git sync.
  Use when the user requests chemistry lessons, missions, or exercises for Keithley,
  e.g., "tạo bài tập hóa cho keithley", "soạn bài giảng hóa học cho keithley", "tạo mission hóa học keithley".
---

# Quy Trình Tạo Bài Giảng & Bài Tập Hóa Học Lớp 9 Cho Keithley Lake (Thầy Thức)

Kỹ năng này hướng dẫn thực hiện trọn gói quy trình tạo bài giảng và bài tập hóa học (`daily_student_assignments`) cho học sinh **Keithley Lake** (Lớp 9 - Chương trình Hóa học Quốc tế 100% Tiếng Anh, chủ đề vũ trụ).

---

## 1. Hồ Sơ Học Sinh & Định Danh Hệ Thống

| Thực thể | Tên / Mã | ID trong Hệ thống | Vai trò & Đặc điểm |
| :--- | :--- | :--- | :--- |
| **Học sinh** | **Keithley Lake** (`keithley`) | `4745136c-bd25-4f45-a488-9f00f2121b70` | Astronaut Cadet • Grade 7 Math & Chem 9 • 100% English |
| **Giáo viên** | **Thầy Thức** (`teacher`) | `dc62e5df-2344-4785-b058-b95f5dbe0983` | Flight Commander • Soạn bài, kiểm duyệt, phân công |
| **Môn học** | **Hóa học 9** (`CHEM_9`) | `6fc7387b-13b8-4e27-8240-a60c03dc1d51` | Hóa học THCS / KHTN 9 chuẩn quốc tế |
| **File PDF SGK & SBT chuẩn** | `PDF_of_documents/SGK-KHTN-Lop-9.pdf`<br>`PDF_of_documents/SBT_KHTN_Lop_9.pdf` | Thư mục `PDF_of_documents/` ở gốc dự án | Sách giáo khoa & Sách bài tập KHTN 9 (Phần Hóa học) |

### Công Cụ Xử Lý Dữ Liệu & Tài Liệu Nguồn:
> [!IMPORTANT]
> **Tuyệt đối KHÔNG đọc file `.md` hay `.txt` truyền vào nữa.** Toàn bộ nội dung bài học được trích xuất trực tiếp từ các file PDF tại `PDF_of_documents/`, kết hợp nghiên cứu qua MCPs.
- **`pdftotext`:** Trích xuất nhanh nội dung lý thuyết, phương trình hóa học và bài tập từ file PDF SGK & SBT KHTN 9:
  `pdftotext -f <trang_dau> -l <trang_cuoi> PDF_of_documents/SGK-KHTN-Lop-9.pdf -`
- **MCP `firecrawl` / WebSearch:** Crawl tra cứu các ứng dụng công nghiệp, mỏ quặng vũ trụ và điều chế hóa học thực tế từ các nguồn tài liệu mở quốc tế để lồng ghép cốt truyện không gian.
- **Giới hạn nội dung đúng với bài học, không quá khó:** Bám sát chuẩn kiến thức KHTN 9, không đưa các dạng bài đại học hay đánh đố quá mức.
- **`pandoc`:** Biên dịch đề thi hoặc nhiệm vụ phi hành đoàn ra file Word `.docx` khi Thầy cần in ấn:
  `pandoc mission_chem9.md -o mission_chem9.docx`

---

## 2. 3 Chế Độ Hoạt Động Linh Hoạt (3 Operational Modes)

Tùy theo yêu cầu của Thầy trong prompt, hệ thống tự động nhận diện 1 trong 3 chế độ:

### 🌟 Chế độ 1: Chỉ có bài tập (Exercise / Practice Mission Only)
- **Khi nào áp dụng:** Khi Thầy yêu cầu: *"soạn bài tập bài X"*, *"tạo 25-30 câu bài tập hóa cho Keithley làm trong 90p"*.
- **Sản phẩm đầu ra:**
  - `learning_units`: Tiêu đề và lời dặn dò nhiệm vụ chuyến bay ngắn gọn.
  - `daily_student_assignments`: Giao bài tập cho ngày chỉ định (thời lượng 90 phút).
  - `assessments` & `questions`: Bộ 25 - 30 câu hỏi trắc nghiệm chia theo 8 Trạm Hành Tinh (Mercury $\to$ Neptune).
  - `assessment_attempts`: Khởi tạo sẵn lượt làm bài `NOT_STARTED`.

### 🌟 Chế độ 2: Cả bài giảng và bài tập (Full Flight Mission: Lecture + Exercises)
- **Khi nào áp dụng:** Khi Thầy yêu cầu trọn gói: *"soạn cả bài giảng và bài tập bài X"*, *"soạn bài học hôm nay cho Keithley"*.
- **Sản phẩm đầu ra:**
  - `learning_units`: Bản tóm tắt lý thuyết không gian (Deep Space Flight Briefing Markdown), các định luật và công thức KaTeX, ẩn dụ phi thuyền/quặng thiên thạch.
  - (Khuyến nghị) Studio tương tác: Thư mục web độc lập tại `frontend/public/lectures/chem9-<chuyen-de>/index.html` với thanh trượt mô phỏng và âm thanh không gian.
  - `daily_student_assignments`: Thẻ bài học hàng ngày hiển thị cả nút *"Đọc bài giảng"* và *"Làm bài tập"*.
  - `assessments` & `questions`: 25 - 30 câu hỏi luyện tập 90 phút.
  - `assessment_attempts`: Lượt làm bài sẵn sàng.

### 🌟 Chế độ 3: Chỉ có bài giảng (Flight Briefing Lecture Only)
- **Khi nào áp dụng:** Khi Thầy nói: *"bây giờ giúp tôi soạn bài giảng thôi nhé, khoan hãy soạn bài tập"*.
- **Sản phẩm đầu ra:**
  - `learning_units`: Soạn đầy đủ bài giảng chuyên sâu với công thức KaTeX, ẩn dụ vũ trụ, bảng khối lượng mol.
  - (Tùy chọn) Giao diện mô phỏng tương tác HTML tại `frontend/public/lectures/chem9-<chuyen-de>/`.
  - `daily_student_assignments`: Thẻ học tập hàng ngày giúp bé mở ra đọc bài giảng mà không tạo áp lực làm bài trắc nghiệm tính điểm ngay.

---

## 3. 5 Trụ Cột Vàng Bắt Buộc (The 5 Golden Pillars)

> [!IMPORTANT]
> Toàn bộ nội dung tạo ra cho Keithley Lake **BẮT BUỘC** tuân thủ nghiêm ngặt 5 tiêu chuẩn sau:

### Trụ cột 1: 100% Pure English Immersion (Tuyệt đối không có tiếng Việt)
- **Không đính kèm tiếng Việt trong ngoặc đơn** ở đề bài, các phương án A, B, C, D hay lời giải (ví dụ: dùng `mass percentage`, `insoluble residue`, `excess dilute hydrochloric acid`, `bromine water`, không dùng `(phần trăm khối lượng)` hay `(chất rắn không tan)`).
- Tham khảo từ điển đối chiếu tại [chemistry_standards.md](./references/chemistry_standards.md).

### Trụ cột 2: Cosmic Space Theme & Storytelling (Chủ đề Vũ Trụ)
- Đề bài và bài giảng đặt trong bối cảnh **Trạm Không Gian Nghiên Cứu Hóa Học (Orbital Chemical Laboratory)**.
- Đề thi 90 phút (25 - 30 câu) chia đều qua **8 Phân Khu Hành Tinh (Planetary Sectors)**:
  - *Sector 1: Mercury Orbit* • Phản ứng hóa học cơ bản & Khái niệm % khối lượng.
  - *Sector 2: Venus Base* • Đo lường cặn lắng kim loại & Khối lượng bình hấp thụ khí tăng.
  - *Sector 3: Earth Mission Control* • Tính toán số mol và khối lượng từng kim loại.
  - *Sector 4: Mars Outpost* • Tách và thu hồi hỗn hợp khí (Ankan và Anken qua nước brom).
  - *Sector 5: Jupiter Station* • Hệ hợp kim đa thành phần.
  - *Sector 6: Saturn Rings* • Đốt cháy và phản ứng oxi hóa thu khí $\text{CO}_2$.
  - *Sector 7: Uranus Deep Space* • Bài toán định lượng đa bước.
  - *Sector 8: Neptune Frontier* • Trích xuất kim loại từ thiên thạch thực tế.
- Tích hợp đồng hồ bấm giờ câu hỏi **2 phút (Question Chronometer)** kèm các nút `+30s`, `-30s`, `+1m`, `Pause`.

### Trụ cột 3: Cân Bằng Phương Án Trắc Nghiệm & Chống Bẫy Đáp Án Dài Nhất (Anti-Longest-Option Bias)
> [!CAUTION]
> **Quy tắc sư phạm tối thượng:** Trong các câu trắc nghiệm lý thuyết, **không phải lúc nào đáp án dài nhất cũng là đáp án đúng!**
> - Các phương án A, B, C, D phải có **độ dài tương đương nhau**.
> - Đáp án đúng phải được phân bổ cân bằng và ngẫu nhiên (lúc là phương án ngắn, lúc là phương án trung bình, lúc là phương án dài).
> - Triệt tiêu hoàn toàn thói quen học sinh đoán mò theo "câu dài nhất là câu đúng" mà không cần suy luận bản chất hóa học.

### Trụ cột 4: Tương Thích Hoàn Hảo Âm Thanh & Rung Lắc (Critical Lesson Learned)
- **Trong `question_payload`, BẮT BUỘC PHẢI CÓ `correct_option_id`:**
  ```json
  "question_payload": {
    "content_markdown": "...",
    "options": [ ... ],
    "sectionName": "...",
    "correct_option_id": "B"
  }
  ```
  *(Khi thiếu trường này, cockpit học sinh sẽ không thể so sánh đáp án thời gian thực, dẫn tới mất âm thanh còi báo sai Buzzer và animation rung lắc `.animate-shake`).*

### Trụ cột 5: Chuẩn Ký Hiệu KaTeX Hóa Học & Tương Phản Cao
- Toàn bộ phương trình hóa học và công thức phải viết bằng KaTeX:
  $$\text{Fe} + 2\text{HCl} \to \text{FeCl}_2 + \text{H}_2\uparrow$$
  $$\%m_{\text{Fe}} = \frac{m_{\text{Fe}}}{m_{\text{mix}}} \times 100\%$$
- Mặc định thể tích mol khí ở chuẩn hiện hành ($25^\circ\text{C}, 1\text{ bar}$): $V = n \times 24.79\text{ L}$.
- Chữ đề bài màu trắng sáng có đổ bóng để tương phản tối đa trên nền không gian tối.

---

## 4. Quy Trình Thực Hiện Từng Bước (A-Z Workflow)

```text
[Bước 1: Trích Xuất Dữ Liệu KHTN 9 Từ PDF_of_documents/ & Nghiên Cứu MCPs]
       ↓
[Bước 2: Xác Định Mode (EXERCISE_ONLY / BOTH / LECTURE_ONLY)]
       ↓
[Bước 3: Soạn Payload JSON Nhiệm Vụ Hóa Học Không Gian (Cân Đối Độ Dài Đáp Án)]
       ↓
[Bước 4: Nạp Tự Động Vào Database (seed_keithley_chemistry.js)]
       ↓
[Bước 5: Build Kiểm Tra & Push Lên GitHub / Deploy Vercel]
```

### Bước 1: Trích Xuất Dữ Liệu KHTN 9 Từ PDF_of_documents/ & Nghiên Cứu MCPs
1. Dùng `pdftotext` đọc trực tiếp từ `PDF_of_documents/SGK-KHTN-Lop-9.pdf` và `PDF_of_documents/SBT_KHTN_Lop_9.pdf`.
2. Tra cứu thêm qua WebSearch / Firecrawl các ứng dụng công nghiệp, mỏ khoáng sản không gian.
3. **Giới hạn nội dung đúng với bài học, không quá khó.**

### Bước 2: Xác Định Mode
Chọn 1 trong 3 mode: `EXERCISE_ONLY`, `BOTH`, hoặc `LECTURE_ONLY`.

### Bước 3: Soạn Payload JSON Nhiệm Vụ Hóa Học
1. Biên soạn 25 - 30 câu hỏi theo 8 Phân khu (Sector 1 -> Sector 8).
2. **Kiểm tra độ dài đáp án trắc nghiệm:** Đảm bảo không rơi vào bẫy "đáp án dài nhất luôn đúng".
3. **BẮT BUỘC:** Có `correct_option_id` trong từng câu.

### Bước 4: Nạp Tự Động Vào Database
Chạy script seed:
```bash
node .agents/skills/keithley-chemistry/scripts/seed_keithley_chemistry.js
```

### Bước 5: Build & Push Git
1. `npm --prefix frontend run build`
2. `git add frontend/ .agents/ .opencode/ .claude/`
3. `git commit -m "feat(chem9): add mission for Keithley Lake on <date>"`
4. `git push origin main`
