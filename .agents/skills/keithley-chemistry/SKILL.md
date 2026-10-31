---
name: keithley-chemistry
description: >-
  End-to-end chemistry curriculum, lecture, and exercise mission generator for student Keithley Lake
  (Astronaut Cadet Thiện, Grade 9 Chemistry / CHEM_9) under Thầy Thức. Supports 3 operational modes:
  1) Exercises only, 2) Lecture & Exercises, 3) Lecture only, based on source files (.txt, .md).
  Generates 100% English cosmic space-themed missions, KaTeX stoichiometry formulas, real-time audio
  & shake animation compatibility (correct_option_id in question_payload), automated Prisma database seeding,
  and Vercel git sync. Trigger when the user requests chemistry lessons, missions, or exercises for Keithley,
  e.g., "tạo bài tập hóa cho keithley", "soạn bài giảng hóa học cho keithley", "soạn bài hóa từ file .txt cho keithley",
  "tạo mission hóa học keithley".
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
| **Thư mục tài liệu gốc** | `/home/dantey/Dantey/teaching/lop6/Chemistry/` | Thư mục cục bộ | Chứa các file bài giảng, tóm tắt lý thuyết `.txt` và đề bài `.md` |

---

## 2. 3 Chế Độ Hoạt Động Linh Hoạt (3 Operational Modes)

Tùy theo yêu cầu của Thầy trong prompt hoặc nội dung file `.txt` được cung cấp, hệ thống tự động nhận diện 1 trong 3 chế độ:

### 🌟 Chế độ 1: Chỉ có bài tập (Exercise / Practice Mission Only)
- **Khi nào áp dụng:** Khi Thầy yêu cầu: *"soạn bài tập từ file X"*, *"tạo 25-30 câu bài tập hóa cho Keithley làm trong 90p"*, hoặc chỉ cung cấp file `.txt` dạng bài tập.
- **Sản phẩm đầu ra:**
  - `learning_units`: Tiêu đề và lời dặn dò nhiệm vụ chuyến bay ngắn gọn.
  - `daily_student_assignments`: Giao bài tập cho ngày chỉ định (thời lượng 90 phút).
  - `assessments` & `questions`: Bộ 25 - 30 câu hỏi trắc nghiệm chia theo 8 Trạm Hành Tinh (Mercury $\to$ Neptune).
  - `assessment_attempts`: Khởi tạo sẵn lượt làm bài `NOT_STARTED` để bé bấm vào là làm ngay.

### 🌟 Chế độ 2: Cả bài giảng và bài tập (Full Flight Mission: Lecture + Exercises)
- **Khi nào áp dụng:** Khi Thầy yêu cầu trọn gói: *"soạn cả bài giảng và bài tập"*, *"soạn bài học hôm nay cho Keithley"*, hoặc cung cấp tài liệu bao gồm cả lý thuyết và bài tập.
- **Sản phẩm đầu ra:**
  - `learning_units`: Bản tóm tắt lý thuyết không gian (Deep Space Flight Briefing Markdown), các định luật và công thức KaTeX, ẩn dụ phi thuyền/quặng thiên thạch.
  - (Khuyến nghị) Studio tương tác: Thư mục web độc lập tại `frontend/public/lectures/chem9-<chuyen-de>/index.html` với thanh trượt mô phỏng và âm thanh không gian.
  - `daily_student_assignments`: Thẻ bài học hàng ngày hiển thị cả nút *"Đọc bài giảng"* và *"Làm bài tập"*.
  - `assessments` & `questions`: 25 - 30 câu hỏi luyện tập 90 phút.
  - `assessment_attempts`: Lượt làm bài sẵn sàng.

### 🌟 Chế độ 3: Chỉ có bài giảng (Flight Briefing Lecture Only)
- **Khi nào áp dụng:** Khi Thầy nói: *"bây giờ giúp tôi soạn bài giảng thôi nhé, khoan hãy soạn bài tập"*, hoặc chỉ cung cấp file `.txt` lý thuyết mới cần học trước.
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

### Trụ cột 3: Tương Thích Hoàn Hảo Âm Thanh & Rung Lắc (Critical Lesson Learned)
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

### Trụ cột 4: Chuẩn Ký Hiệu KaTeX Hóa Học & Tương Phản Cao
- Toàn bộ phương trình hóa học và công thức phải viết bằng KaTeX:
  $$\text{Fe} + 2\text{HCl} \to \text{FeCl}_2 + \text{H}_2\uparrow$$
  $$\%m_{\text{Fe}} = \frac{m_{\text{Fe}}}{m_{\text{mix}}} \times 100\%$$
- Mặc định thể tích mol khí ở chuẩn hiện hành ($25^\circ\text{C}, 1\text{ bar}$): $V = n \times 24.79\text{ L}$.
- Chữ đề bài màu trắng sáng có đổ bóng để tương phản tối đa trên nền không gian tối.

### Trụ cột 5: Đồ Họa Vector SVG Sắc Nét (Nghiêm cấm ASCII Art)
- Khi bài học hoặc đề toán cần sơ đồ bình hấp thụ, phản ứng, hoặc ống nghiệm:
  - Thiết kế file vector SVG chuẩn tại: `frontend/public/images/chemistry/<slug_ten_hinh>.svg`.
  - Nền không gian tối `#080D1A`, đường nét phát sáng neon, nhãn chất rõ ràng.

---

## 4. Quy Trình Thực Hiện Từng Bước (A-Z Workflow)

```text
[Bước 1: Tiếp Nhận & Đọc File .txt / .md Của Thầy]
       ↓
[Bước 2: Phân Tích Dạng Bài & Xác Định Chế Độ (Mode)]
       ↓
[Bước 3: Biên Soạn Payload JSON Theo Chuẩn Quốc Tế]
       ↓
[Bước 4: Chạy Script Nạp Tự Động Vào Database (seed_keithley_chemistry.js)]
       ↓
[Bước 5: Build Kiểm Tra & Push Lên GitHub / Deploy Vercel]
```

---

### Bước 1: Tiếp Nhận & Đọc File .txt / .md Của Thầy
1. Thầy thường cung cấp file trong thư mục `/home/dantey/Dantey/teaching/lop6/Chemistry/` (ví dụ `baitaphonhopkhoiluong.md`, `alkene_khtn_9.txt`, hoặc một file `.txt` cụ thể).
2. Dùng công cụ `view_file` đọc toàn bộ nội dung file để nắm:
   - Các chất tham gia (kim loại Fe, Cu, Zn, Al, Mg, Ag; khí $\text{CH}_4, \text{C}_2\text{H}_4$; dung dịch $\text{HCl}, \text{H}_2\text{SO}_4, \text{Br}_2$).
   - Dạng bài toán: Chỉ 1 chất phản ứng, tính khối lượng cặn không tan, tính khối lượng bình tăng, hay tính % khối lượng.
   - Số lượng bài tập và thời lượng dự kiến.

---

### Bước 2: Phân Tích Dạng Bài & Xác Định Chế Độ (Mode)
- Nếu Thầy yêu cầu:
  - Chỉ soạn bài tập $\to$ đặt `"mode": "EXERCISE_ONLY"`.
  - Cả lý thuyết và bài tập $\to$ đặt `"mode": "BOTH"`.
  - Chỉ soạn bài giảng $\to$ đặt `"mode": "LECTURE_ONLY"`.
- Đảm bảo độ khó phù hợp với Keithley: dễ đến khá, không có dạng 2 chất cùng phản ứng giải hệ phương trình 2 ẩn quá phức tạp trừ khi có yêu cầu riêng.

---

### Bước 3: Biên Soạn Payload JSON Theo Chuẩn Quốc Tế
Tạo file JSON tạm thời (ví dụ: `keithley_chem_payload.json`) dựa theo mẫu tại [chemistry_mission_payload.json](./templates/chemistry_mission_payload.json):
- `mode`: `"BOTH"`, `"EXERCISE_ONLY"`, hoặc `"LECTURE_ONLY"`.
- `assignedDate`: Ngày học theo định dạng `YYYY-MM-DD`.
- `unitTitle`: Tiêu đề tiếng Anh chuẩn vũ trụ.
- `unitDescription`: Mô tả tóm tắt mục tiêu trạm nghiên cứu.
- `teacherNote`: Lời dặn dò truyền lửa từ Thầy Thức.
- `lectureMarkdown`: (Nếu có bài giảng) Soạn đầy đủ tóm tắt 3 phút, ẩn dụ vũ trụ, kho vũ khí công thức KaTeX.
- `questions`: Mảng 25 - 30 câu hỏi gồm đầy đủ `order_index`, `points`, `sectionName`, `content_markdown`, `options` (kèm `correct_option_id`), và `explanation`.

---

### Bước 4: Chạy Script Nạp Tự Động Vào Database
Chạy script seeder chuyên dụng:
```bash
node .agents/skills/keithley-chemistry/scripts/seed_keithley_chemistry.js --payload keithley_chem_payload.json
```
Script sẽ tự động:
1. Xóa các assignment và attempt cũ của môn `CHEM_9` trong ngày đó (tránh trùng lặp thẻ bài học trên Dashboard).
2. Tạo bản ghi `learning_units` (Flight Briefing).
3. Tạo thẻ bài học hàng ngày `daily_student_assignments`.
4. (Nếu có bài tập) Tạo `assessments` (In-Session 90 phút).
5. (Nếu có bài tập) Nạp đồng loạt câu hỏi vào bảng `questions`, **tự động gán `correct_option_id` vào `question_payload`**.
6. (Nếu có bài tập) Khởi tạo `assessment_attempts` với trạng thái `NOT_STARTED`.

---

### Bước 5: Build Kiểm Tra & Push Lên GitHub / Deploy Vercel
> [!CAUTION]
> Sau khi nạp database, **BẮT BUỘC PHẢI COMMIT VÀ PUSH LÊN GITHUB** để Vercel cập nhật file ảnh SVG (nếu có) và giao diện:

```bash
npm run build --prefix frontend
git add -A
git commit -m "feat(keithley): deploy chemistry mission [Lesson Name] for Keithley Lake"
git push origin main
```

---

## 5. Checklist Kiểm Định Trước Khi Báo Cáo Thầy (Quality Control)

- [ ] **100% Tiếng Anh:** Đã rà soát không còn bất kỳ chữ tiếng Việt nào trong ngoặc đơn ở đề bài và đáp án.
- [ ] **Đã có `correct_option_id` trong `question_payload`:** Đảm bảo khi bé bấm sai sẽ có tiếng Buzzer và nút rung lắc ngay lập tức.
- [ ] **Đúng thời lượng 90 phút:** Bộ câu hỏi từ 25 - 30 câu vừa vặn với buổi học 90 phút.
- [ ] **Độ khó chuẩn:** Từ dễ đến khá, các bước tính toán số mol, khối lượng rõ ràng, không bị quá tải.
- [ ] **KaTeX chuẩn:** Công thức $\text{Fe} + 2\text{HCl} \to \text{FeCl}_2 + \text{H}_2\uparrow$ hiển thị đẹp, rõ ràng, không lỗi font.
- [ ] **Đã Push Git:** Đã thực hiện `git push origin main` thành công để Vercel deploy bản mới nhất.
- [ ] **Tài khoản học sinh:** Đăng nhập `keithley` (pass `123456`) thấy đúng thẻ bài tập môn Hóa học của ngày đã chọn.
