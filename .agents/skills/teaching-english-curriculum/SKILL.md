---
name: teaching-english-curriculum
description: >-
  End-to-end generator for Grade 11 & Grade 12 English curriculum, interactive lecture studios,
  and daily practice cards under Thầy Thức. Use this skill whenever the user asks to create,
  author, or seed a daily card, lecture, or exercise set for student Thái (Grade 11) or student
  Nam Việt (Grade 12), e.g. "tạo card bài giảng tiếng Anh lớp 11/12", "soạn bài học tiếng Anh",
  "tạo bài giảng cho Thái", "tạo bài tập cho Nam Việt".
---

# Quy Trình Tạo Bài Giảng & Bài Tập Tiếng Anh Từ A-Z (Thầy Thức)

Kỹ năng này hướng dẫn thực hiện trọn gói quy trình tạo một thẻ bài học hàng ngày (`daily_student_assignments`), bao gồm **Phòng học tương tác (Interactive Lecture Studio)** và **Đề luyện tập tại lớp (In-Session Assessment)** cho học sinh Lớp 11 (Thái) hoặc Lớp 12 (Nam Việt).

---

## 1. Định Tuyến Học Sinh (Student Routing)

Khi người dùng yêu cầu tạo bài, tự động nhận diện đối tượng dựa trên từ khóa:

| Học sinh | Cấp độ | Username / ID | Môn học | Mục tiêu | Tài liệu PDF nguồn (`PDF_of_documents/`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Thái** | Lớp 11 | `thai` (`9208f557-3288-442e-accf-15fc8c763e68`) | `ENG_11` (`f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0`) | **8.5+ Giữa kì & THPT** (Bỏ Phonetics, chuyên sâu Từ vựng & Ngữ pháp) | `PDF_of_documents/SGK – Tiếng Anh 11 – Chương trình mới.pdf` |
| **Nam Việt** | Lớp 12 | `nam_viet` (`d76bd9d6-6cf5-409c-847b-b0e5c07a0876`) | `ENG_12` (`a15d4b19-412a-4bff-acd5-86714381b7af`) | **7+ THPT Quốc Gia** (Ưu tiên xếp câu hỏi Từ vựng lên đầu đề) | `PDF_of_documents/tieng-anh-12-global-success.pdf`<br>`PDF_of_documents/tieng-anh-12-global-success-sbt.pdf` |

- **Giáo viên:** Luôn sử dụng danh xưng **Thầy Thức** (`dc62e5df-2344-4785-b058-b95f5dbe0983`).
- **Giao diện:** Luôn tuân thủ **Light Theme** (màu sáng, sạch sẽ, hiện đại, không dùng theme tối/đen).

---

## 2. Quy Trình Thực Hiện Từng Bước (A-Z)

```text
[Bước 1: Khai Thác PDF Nguồn & Nghiên Cứu Qua MCPs]
       ↓
[Bước 2: Xây Dựng Bài Giảng Ngữ Pháp Đa Tầng & Quick Drills]
       ↓
[Bước 3: Xây Dựng Phòng Học Tương Tác Web (Interactive Studio)]
       ↓
[Bước 4: Biên Soạn Bộ Bài Tập 60 - 100 Câu (Tuân Thủ 4 Quy Tắc Vàng)]
       ↓
[Bước 5: Nạp Toàn Bộ Vào Cơ Sở Dữ Liệu (Seed Script)]
       ↓
[Bước 6: Kiểm Tra Build & Deploy Vercel Production]
```

---

### Bước 1: Khai Thác PDF Nguồn & Nghiên Cứu Qua MCPs

> [!IMPORTANT]
> **Tuyệt đối KHÔNG đọc file `.md` hay `.txt` truyền vào nữa.** Thay vào đó, toàn bộ dữ liệu bài học được trích xuất trực tiếp từ các file PDF SGK chuẩn trong thư mục `PDF_of_documents/` ở thư mục gốc của dự án, kết hợp nghiên cứu thực tiễn qua MCPs.

1. **Kho file PDF SGK trong thư mục `PDF_of_documents/`:**
   - **Thái (Lớp 11):** `PDF_of_documents/SGK – Tiếng Anh 11 – Chương trình mới.pdf`
   - **Nam Việt (Lớp 12):** `PDF_of_documents/tieng-anh-12-global-success.pdf` và `PDF_of_documents/tieng-anh-12-global-success-sbt.pdf`
2. **Khai thác dữ liệu bằng `pdftotext`:**
   - Sử dụng lệnh `pdftotext -f <trang_dau> -l <trang_cuoi> PDF_of_documents/<file.pdf> -` để trích xuất chính xác từ vựng, ngữ pháp, bài đọc và bài tập của Unit tương ứng.
3. **Nghiên cứu mở rộng bằng MCPs (`firecrawl`, WebSearch, Docs Lookup):**
   - Sử dụng MCP `firecrawl` hoặc WebSearch để cào (crawl) các bài đọc thời sự quốc tế từ BBC, The Guardian, National Geographic liên quan đến chủ đề bài học để làm ngữ liệu đọc hiểu và ví dụ.
   - **Giới hạn nội dung đúng với bài học, không quá khó:** Bám sát chuẩn kiến thức kỹ năng của chương trình Bộ GD&ĐT và mục tiêu điểm số của từng học sinh (8.5+ cho Thái, 7+ cho Nam Việt), không ra đề vượt quá xa kiến thức hay đánh đố vô lý.
4. **Xuất bản đề thi trên giấy (nếu Thầy yêu cầu bản in):**
   - Sử dụng `pandoc` để biên dịch sang file Word `.docx`: `pandoc de_kiem_tra.md -o de_kiem_tra.docx`.

---

### Bước 2: Xây Dựng Bài Giảng Ngữ Pháp Đa Tầng & Hệ Thống Quick Check Drills

Bài giảng ngữ pháp trên cả **Card Markdown** lẫn **Web Studio** phải đạt tiêu chuẩn chuyên sâu:
1. **Phân tích bản chất cơ chế ngôn ngữ:** Giải thích cặn kẽ tại sao lại dùng cấu trúc đó (cơ chế biến tính động từ thành danh từ, hòa hợp chủ-vị số ít, sự khác biệt giữa to-infinitive và preposition "TO"...).
2. **Hệ thống ví dụ song ngữ thực chiến:** Mỗi cấu trúc/cụm từ có **tối thiểu 2–3 ví dụ song ngữ** chuẩn xác theo chủ đề của Unit, kèm phân tích thành phần câu ($S - V - O$).
3. **Cảnh báo bẫy đề thi nâng cao mục tiêu 8.5+:** Chỉ rõ các điểm học sinh thường mất điểm oan (danh từ số nhiều chèn giữa, nhầm lẫn cụm giới từ "to + V-ing", mốc thời gian hoàn thành trước, thể bị động).
4. **Tích hợp bài tập nhanh vận dụng ngay (Quick Check Drills):**
   - **Trên Card Markdown:** Ngay dưới mỗi chuyên đề ngữ pháp, bắt buộc có mục `🎯 BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK)` gồm 3–4 câu trắc nghiệm/điền từ/viết lại câu kèm khung **[Đáp án & Giải thích chi tiết]** để học sinh tự kiểm tra phản xạ tức thì.
   - **Trong Web Studio Tương Tác:** Nhúng module tương tác **Interactive Quick Quiz Widget** trực tiếp vào từng Accordion chuyên đề trong `data.js` và `app.js` (học sinh bấm chọn A, B, C, D ➔ hệ thống đổi màu xanh/đỏ tức thì, phát âm thanh feedback và trượt mở box giải thích chi tiết).

---

### Bước 3: Tạo Phòng Học Tương Tác Web (Interactive Studio)

> [!IMPORTANT]
> **QUY CHUẨN MỚI CHO BÀI GIẢNG TƯƠNG TÁC:**
> Phòng học tương tác độc lập tại `frontend/public/lectures/<slug>/` **CHỈ GIỮ LẠI ĐÚNG 2 PHẦN**:
> 1. **1. Flashcard 3D (2 Chiều):** Luyện phản xạ từ vựng đa chiều với 2 chế độ chính:
>    - *Chức năng 1 (EN ➔ VI):* Hiện tiếng Anh, IPA, audio phát âm 🔊 ➔ Giấu tiếng Việt ở mặt sau.
>    - *Chức năng 2 (VI ➔ EN):* Hiện nghĩa tiếng Việt ➔ Giấu từ tiếng Anh, IPA, câu ví dụ ở mặt sau.
>    - Hỗ trợ chế độ Luyện từng thẻ (Deck) và Lưới thẻ (Grid), phím tắt bàn phím (<kbd>Space</kbd>, <kbd>←</kbd> <kbd>→</kbd>, <kbd>P</kbd>, <kbd>F</kbd>, <kbd>1</kbd>, <kbd>2</kbd>) và Toàn màn hình (Fullscreen).
> 2. **2. Lý Thuyết & xx Từ Vựng Cốt Lõi:**
>    - Bảng danh sách từ vựng có thanh tìm kiếm nhanh, nút lọc nhóm, audio phát âm Web Speech API, IPA, từ loại, nghĩa tiếng Việt, Collocation và câu ví dụ song ngữ.
>    - Chuyên đề ngữ pháp chuyên sâu (Grammar Compendium) trình bày dạng Accordion thẻ đẹp mắt, phân tích cấu trúc $S - V - O$, cảnh báo bẫy thi và **nhúng trực tiếp Interactive Quick Quiz Drills** (bấm chọn đáp án đổi màu xanh/đỏ tức thì, phát âm thanh feedback và trượt mở box giải thích chi tiết).
> 
> **TUYỆT ĐỐI BỎ CÁC PHẦN 3, 4, 5, 6:**
> Không đưa các phần Collocations, Word Family Tree, Đoán chữ (Active Recall), Thử thách đặt câu (Writing) vào phòng học tương tác nữa.

Tạo thư mục `frontend/public/lectures/<slug>/` gồm 4 tệp:

1. **`data.js`**: Chứa toàn bộ dữ liệu có cấu trúc (chỉ gồm `vocabList` và `grammarModules`):
   - `vocabList`: Từ vựng cốt lõi của Unit (có phát âm IPA, từ loại, nghĩa tiếng Việt, Collocation và câu ví dụ song ngữ).
   - `grammarModules`: Các chuyên đề ngữ pháp chuyên sâu, mỗi module chứa:
     + `theoryHtml`: Bảng quy tắc, highlight bẫy thi, ví dụ song ngữ.
     + `drills: [{ id, question, options, correct, explanation }]`: Mảng 3–4 câu hỏi interactive quiz cho từng chuyên đề.
2. **`style.css`**: Giao diện Light Theme hiện đại, responsive mobile-first, 3D card perspective, stylesheet cho `.grammar-drills-container`, `.drill-card`, `.drill-opt-btn`, `.drill-explanation-box`.
3. **`index.html`**: Khung ngữ nghĩa gồm đúng 2 tabs: `tab-flashcards` và `tab-vocab`.
4. **`app.js`**: Bộ điều khiển tương tác:
   - **Flashcard 3D Engine:** Chuyển đổi 2 chế độ EN ➔ VI và VI ➔ EN, Deck vs Grid, lật thẻ 3D, xáo trộn, phím tắt.
   - **Web Speech API:** Phát âm giọng bản xứ khi bấm loa 🔊 hoặc phím P.
   - **Web Audio API:** Âm thanh phản hồi khi làm đúng (`playSuccessSound`)/sai (`playErrorSound`).
   - **Interactive Quick Quiz Engine:** Gắn sự kiện click cho các nút drill trong từng accordion ngữ pháp, đổi màu xanh/đỏ và mở box giải thích.
   - **Bộ lọc & Tìm kiếm từ vựng:** Tìm kiếm thời gian thực theo từ khóa, lọc theo nhóm Unit.

---

### Bước 4: Biên Soạn Bộ Bài Tập 60 - 100 Câu (Tuân Thủ 5 Quy Tắc Vàng)

> [!CAUTION]
> **5 QUY TẮC VÀNG BẮT BUỘC KHI SOẠN BÀI TẬP:**
> 1. **Sử dụng từ vựng bài học:** Tất cả câu hỏi phải ứng dụng trực tiếp các từ vựng đã dạy trong bài giảng của Unit.
> 2. **Tối thiểu 2 từ vựng của Unit trong 4 phương án:** Đối với các câu hỏi về từ vựng, phần 4 đáp án A, B, C, D **phải chứa tối thiểu 2 từ vựng của Unit đang học**. Tuyệt đối không để chỉ có duy nhất 1 từ mới trong 4 đáp án (khiến học sinh khoanh lụi mà không đọc câu).
> 3. **Chống trùng lặp đáp án đúng liên tiếp:** Các đáp án đúng của các câu hỏi kế nhau **phải khác nhau hoàn toàn**. Tuyệt đối không để 2 câu hỏi liên tiếp có cùng 1 từ/cụm từ đáp án đúng (ví dụ câu 5 đáp án đúng là "mass media" thì câu 6 đáp án đúng KHÔNG ĐƯỢC là "mass media").
> 4. **Luôn có đúng 10 câu hỏi chia từ loại (Word Formation):** Trong bộ đề trắc nghiệm, **luôn luôn phải có đúng 10 câu hỏi dành cho dạng chia từ loại (Word Formation)**: cho 4 dạng Danh từ, Tính từ, Trạng từ, Động từ của cùng một gốc từ trong 4 phương án A, B, C, D để học sinh chọn đúng từ loại phù hợp với cấu trúc ngữ pháp của câu.
> 5. **Từ vựng ngữ cảnh câu hỏi phải CƠ BẢN NHẤT CÓ THỂ (CRITICAL - Basic Context Vocabulary):** Do học sinh (cả Thái và Nam Việt) khá yếu trong mảng từ vựng chung, **ngoài phần từ vựng mục tiêu học trong Unit ra, TẤT CẢ các từ vựng khác dùng trong câu hỏi (câu dẫn đề bài, ngữ cảnh xung quanh, các đáp án nhiễu ngoài Unit) BẮT BUỘC phải dùng từ vựng cơ bản, thông dụng nhất có thể (A1 - A2 / B1 quen thuộc hàng ngày)**. Tuyệt đối không dùng các từ vựng hoa mỹ, hiếm gặp, từ vựng C1/C2 hoặc học thuật nâng cao ngoài Unit làm học sinh bị ngợp hoặc không dịch được câu dẫn. Câu văn cần ngắn gọn, rõ ràng, gãy gọn để học sinh tập trung tối đa vào việc nhận diện và áp dụng đúng từ vựng và ngữ pháp của bài học.

- **Thứ tự sắp xếp:**
  - **Nam Việt (Lớp 12):** Bắt buộc xếp: **Từ vựng $\to$ Word Formation $\to$ Ngữ pháp $\to$ Đọc hiểu**.
  - **Thái (Lớp 11):** Bỏ Phonetics, tập trung sâu vào Từ vựng, Word Formation, Ngữ pháp nâng cao, Đồng nghĩa/Trái nghĩa, Viết lại câu.
- Mỗi câu hỏi phải có đầy đủ: `content`, `options` (A, B, C, D), `correct_answer` và `explanation` chi tiết từ Thầy Thức.

---

### Bước 5: Nạp Dữ Liệu Tự Động Vào Database (A-Z Seeding)

1. Tạo tệp payload hoặc script seed Node.js / Prisma Client:
   - `learning_units` (tiêu đề, mô tả, nội dung bài giảng Markdown chi tiết kèm link phòng học tương tác).
   - `daily_student_assignments` (gán ngày học và lời dặn dò của Thầy Thức).
   - `assessments` (bài kiểm tra 90 phút tại lớp).
   - `questions` (nạp toàn bộ câu hỏi, 4 phương án, đáp án đúng và lời giải).
   - `assessment_attempts` (khởi tạo trạng thái `NOT_STARTED` sẵn sàng cho học sinh làm).

---

### Bước 6: Kiểm Tra & Triển Khai Production

1. Chạy biên dịch kiểm tra trong thư mục frontend:
   ```bash
   npm --prefix frontend run build
   ```
2. Commit và đẩy mã nguồn lên nhánh `main`:
   ```bash
   git add frontend/ .agents/ .opencode/
   git commit -m "feat(lesson): add English lecture and assignment card for [Student] on [Date]"
   git push origin main
   ```
3. Báo cáo ngắn gọn cho người dùng kèm link trải nghiệm trực tiếp.
