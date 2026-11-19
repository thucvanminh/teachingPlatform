# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personalized 1-on-1 Tutoring Learning Management System (LMS) serving multiple grade levels (Grades 1 to 12) across Math, Chemistry, and English.

The project is structured as a two-tier monorepo:
- `backend/`: NestJS 10 API with Prisma ORM, PostgreSQL (Supabase), Passport JWT, and Swagger.
- `frontend/`: Next.js 15 (App Router, React 19, Tailwind CSS, KaTeX math/chem rendering).
- `frontend/public/lectures/`: Standalone interactive lecture & lab studios (HTML/CSS/JS).

---

## Commonly Used Commands

### Backend (`cd backend`)
- **Start dev server**: `npm run start:dev` (runs on `http://localhost:3001`, API base: `/api`, Swagger docs: `/api/docs`, health check: `/health`)
- **Build**: `npm run build`
- **Start production**: `npm run start:prod`
- **Format code**: `npm run format` (Prettier)
- **Prisma Client generate**: `npx prisma generate` (or `npm run prisma:generate`)
- **Prisma DB pull**: `npx prisma db pull` (or `npm run prisma:pull`)
- **Seed database**: `npm run seed` (`ts-node src/prisma/seed.ts`)
- **Run all unit tests**: `npm test`
- **Run single test file**: `npx jest src/path/to/file.spec.ts`
- **Run specific test by name**: `npx jest -t "test description"`
- **Run tests in watch mode**: `npm run test:watch`
- **Run test coverage**: `npm run test:cov`
- **Run E2E tests**: `npm run test:e2e` (uses `test/jest-e2e.json`)
- **Run a single E2E test**: `npx jest --config test/jest-e2e.json test/app.e2e-spec.ts`

### Frontend (`cd frontend`)
- **Start dev server**: `npm run dev` (runs on `http://localhost:3000`)
- **Build**: `npm run build`
- **Start production**: `npm run start`
- **Lint**: `npm run lint`

---

## Architecture & Code Conventions

### 1. Monorepo Organization & Data Flow
- **API Prefix**: NestJS sets a global prefix `api`, excluding `/health`.
- **Response Structure**: `TransformInterceptor` wraps successful controller responses into `{ success: true, data: ... }`. `AllExceptionsFilter` standardizes error responses.
- **Frontend API Client**: Located at `frontend/src/lib/api.ts`. Stores JWT in `localStorage` under `lms_token` and dispatches `lms-auth-change` events upon login/logout.

### 2. Role-Based Access Control (RBAC)
- **Roles**: `TEACHER`, `STUDENT`, `PARENT`.
- **Backend Enforcement**: NestJS guards (`JwtAuthGuard`, `RolesGuard`) and Supabase Row Level Security (RLS).
- **Parent Portal**: Linked via `parent_student_links`. Parents have strict read-only access to progress/grades; submission endpoints (`/api/attempts/submit`) explicitly reject parent tokens with 403 Forbidden.

### 3. Student Personalization & UI Themes
Defined in `student_profiles.ui_theme`:
- **`KIDS_ELEMENTARY`** (Grade 1 / An Lake): Fantasy gamified theme, colorful 3D buttons, 45-minute sessions.
- **`STANDARD_SECONDARY`** (Grades 7 & 9 / Keithley Lake): Sci-Fi space mission control cockpit HUD, 90-minute countdown mission, KaTeX Math/Chem formulas, handwritten essay image uploads (`ESSAY_UPLOAD`).
- **`HIGH_SCHOOL_EXAM`** (Grades 11 & 12 / Thái & Nam Việt): Advanced English reading & vocabulary studios, timed exam practice.

### 4. Interactive Lecture Studios (`frontend/public/lectures/`)
- Independent, high-performance HTML/CSS/JS learning environments (e.g., `eng11-midterm`, `eng11-unit4`, `eng12-unit6`, `eng12-unit6-vocab`, `chem9-acetic-acid`).
- **Launch Behavior**: Student dashboard opens interactive rooms in a separate tab (`target="_blank"`) while notifying `api.markLectureViewed(assignment.id)` asynchronously.
- **Design Guidelines**: Follow Linear/Apple HIG aesthetics (near-black `#090d16` typography on neutral slate ground, single blue accent, structured grammar compendium formula cards, interactive quick quiz widgets with instant feedback, and 2-way 3D flashcard mechanics with keyboard shortcuts).

### 5. Math & LaTeX Rendering
- Handled by `KatexMath` and `FormattedContent` in `frontend/src/components/KatexMath.tsx`.
- KaTeX is strictly configured with `output: 'html'` to prevent MathML raw text duplication issues.

---

## Custom Slash Commands for Claude Code

Claude Code commands are configured in `.claude/commands/` and can be invoked directly:

### 1. `/soanbai [tên học sinh: thai | nam_viet] [ngày] [chủ đề / Unit]`
- **Mục đích:** Tạo trọn gói bài giảng tương tác và bài tập tiếng Anh từ A-Z theo quy chuẩn Thầy Thức.
- **Học sinh:**
  - `thai` (Lớp 11, ID `9208f557-3288-442e-accf-15fc8c763e68`, môn `ENG_11` `f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0`, mục tiêu 8.5+, tài liệu PDF: `PDF_of_documents/SGK – Tiếng Anh 11 – Chương trình mới.pdf`).
  - `nam_viet` (Lớp 12, ID `d76bd9d6-6cf5-409c-847b-b0e5c07a0876`, môn `ENG_12` `a15d4b19-412a-4bff-acd5-86714381b7af`, mục tiêu 7+, xếp câu hỏi Từ vựng lên trước, tài liệu PDF: `PDF_of_documents/tieng-anh-12-global-success.pdf` & `PDF_of_documents/tieng-anh-12-global-success-sbt.pdf`).
- **Quy chuẩn thực thi mới:**
  1. **Nguồn tài liệu:** TUYỆT ĐỐI KHÔNG đọc file `.md` hay `.txt` truyền vào. Đọc trực tiếp file PDF SGK trong `PDF_of_documents/` bằng `pdftotext`, kết hợp MCP `firecrawl` / WebSearch nghiên cứu ngữ liệu quốc tế mở rộng (BBC, National Geographic, The Guardian). Giới hạn nội dung đúng với bài học, không quá khó.
  2. **Ngữ pháp đa tầng & Quick Check Drills:**
     - Phân tích cặn kẽ bản chất cơ chế ngữ pháp, bảng công thức, dấu hiệu nhận biết, bảng đối chiếu, bẫy thi 8.5+.
     - Tối thiểu 2–3 ví dụ song ngữ cho mỗi cấu trúc có phân tích $S - V - O$.
     - **Tích hợp Quick Check Drills:** Trên Card Markdown có 3-4 câu trắc nghiệm/điền từ/viết lại câu kèm bảng [Đáp án & Giải thích chi tiết]; Trong Web Studio nhúng module tương tác Interactive Quick Quiz Widget đổi màu xanh/đỏ tức thì, phát âm thanh feedback và trượt mở box giải thích.
  3. **Tạo Web Studio (CHỈ GỒM 2 PHẦN):** Sinh web tại `frontend/public/lectures/<slug>/index.html` chỉ gồm đúng 2 phần: **1. Flashcard 3D (2 Chiều EN ➔ VI & VI ➔ EN)** phát âm bản xứ Web Speech API, phím tắt, fullscreen; và **2. Lý Thuyết & xx Từ vựng Cốt Lõi** kèm Accordion ngữ pháp nhúng Interactive Quick Quiz Widget đổi màu xanh/đỏ tức thì, Light Theme. **Tuyệt đối bỏ hoàn toàn các phần 3, 4, 5, 6** (Collocation Game, Word Tree, Active Recall, Writing).
  4. **Bộ câu hỏi trắc nghiệm (60-100 câu) tuân thủ 5 quy tắc vàng:**
     - Câu hỏi phải sử dụng từ vựng bài học.
     - Câu hỏi từ vựng: 4 lựa chọn A, B, C, D phải có **tối thiểu 2 từ vựng của Unit đang học** (chống khoanh lụi).
     - **Đáp án đúng của các câu hỏi kế nhau phải khác nhau** (không trùng lặp liên tiếp).
     - **Luôn có đúng 10 câu hỏi dạng chia từ loại (Word Formation)** với 4 dạng Danh từ, Tính từ, Trạng từ, Động từ trong các lựa chọn A, B, C, D.
     - **Từ vựng ngữ cảnh cơ bản nhất có thể:** Vì học sinh (Thái, Nam Việt) khá yếu từ vựng, ngoài các từ vựng học trong Unit, tất cả các từ ngữ khác dùng trong câu hỏi (câu dẫn đề bài, đáp án nhiễu) **phải dùng từ cơ bản, quen thuộc nhất có thể (Basic A1 - A2 / B1)** để học sinh hiểu được câu và không bị nản.
  5. **Nạp Database & Deploy:** Chạy seed script nạp DB, test build `npm --prefix frontend run build`, commit & push `main`.

### 2. `/soanhoakeithley` hoặc `/soanhoa [ngày / tên bài học] [mode: EXERCISE_ONLY | BOTH | LECTURE_ONLY]`
- **Mục đích:** Tạo bài giảng và bài tập Hóa học lớp 9 cho Keithley Lake (`4745136c-bd25-4f45-a488-9f00f2121b70`), môn `CHEM_9` (`6fc7387b-13b8-4e27-8240-a60c03dc1d51`).
- **Nguồn tài liệu:** TUYỆT ĐỐI KHÔNG đọc file `.md` hay `.txt` truyền vào. Đọc trực tiếp từ `PDF_of_documents/SGK-KHTN-Lop-9.pdf` và `PDF_of_documents/SBT_KHTN_Lop_9.pdf` bằng `pdftotext`, kết hợp MCPs tra cứu ứng dụng thực tế. Giới hạn nội dung đúng với bài học, không quá khó.
- **Thực thi:**
  1. Nhận diện mode (`EXERCISE_ONLY`, `BOTH`, `LECTURE_ONLY`).
  2. Soạn 100% tiếng Anh, theme Vũ Trụ 8 Trạm Hành Tinh (Mercury $\to$ Neptune), thời lượng 90 phút.
  3. **Chống bẫy đáp án dài nhất:** Trong các câu trắc nghiệm lý thuyết, **không phải lúc nào đáp án dài nhất cũng là đáp án đúng** (4 phương án phải có độ dài tương đương hoặc đáp án đúng phân bổ ngẫu nhiên ngắn/vừa/dài).
  4. **BẮT BUỘC:** Thêm `"correct_option_id"` vào `question_payload` để kích hoạt còi lỗi (Buzzer), chuông (Chime), và animation rung lắc.
  5. Seed DB (`seed_keithley_chemistry.js`), test build và push `main`.

### 3. `/soantoankeithley` hoặc `/soantoan [ngày] [chủ đề / bài học]`
- **Mục đích:** Tạo bài giảng và bài tập Toán lớp 7 cho Keithley Lake, môn `MATH_7` (`b1cfb82f-fa75-47eb-ba05-7281f6d3fdf2`).
- **Nguồn tài liệu:** TUYỆT ĐỐI KHÔNG đọc file `.md` truyền vào. Đọc trực tiếp từ `PDF_of_documents/sach-giao-khoa-toan-7-tap-1-ket-noi-tri-thuc-voi-cuoc-song.pdf` bằng `pdftotext`, kết hợp MCPs tra cứu bài toán thực tế không gian. Giới hạn nội dung đúng với bài học, không quá khó.
- **Thực thi:**
  1. 100% Pure English (không kẹp chữ tiếng Việt trong ngoặc).
  2. Vẽ hình học Vector SVG chuẩn tại `frontend/public/images/geometry/` (tuyệt đối không dùng ASCII art).
  3. 25-30 câu hỏi theo 8 Trạm Hành Tinh, 90-120 phút.
  4. **Chống bẫy đáp án dài nhất:** Không để phương án dài nhất luôn luôn là đáp án đúng, phân bổ đều độ dài giữa các phương án.
  5. Seed DB (`seed_keithley_math.js`), test build và push `main`.

---

## 📚 Tài Liệu Nguồn PDF, Pandoc, pdftotext & Khai Thác MCPs

### 1. Kho Sách Giáo Khoa & Sách Bài Tập PDF Sẵn Có (`PDF_of_documents/`)
Hệ thống tận dụng trực tiếp các file PDF bản chuẩn được lưu tại `PDF_of_documents/` ở thư mục gốc của dự án:
- **Toán 7 (Keithley Lake):**
  - `PDF_of_documents/sach-giao-khoa-toan-7-tap-1-ket-noi-tri-thuc-voi-cuoc-song.pdf`
- **Hóa học 9 / KHTN 9 (Keithley Lake):**
  - `PDF_of_documents/SGK-KHTN-Lop-9.pdf`
  - `PDF_of_documents/SBT_KHTN_Lop_9.pdf`
- **Tiếng Anh 11 (Thái):**
  - `PDF_of_documents/SGK – Tiếng Anh 11 – Chương trình mới.pdf`
- **Tiếng Anh 12 (Nam Việt):**
  - `PDF_of_documents/tieng-anh-12-global-success.pdf`
  - `PDF_of_documents/tieng-anh-12-global-success-sbt.pdf`

### 2. Quy Trình Khai Thác Dữ Liệu PDF Bằng `pdftotext`, `pdftoppm` & Vision
- **Đối với PDF có Text Layer:** Dùng `pdftotext` để trích xuất nhanh văn bản các trang/Unit:
  ```bash
  pdftotext -f <trang_dau> -l <trang_cuoi> PDF_of_documents/<file.pdf> -
  ```
- **Đối với PDF Dạng Scan / Ảnh chụp (như sơ đồ hình học):**
  - Dùng `pdftoppm` xuất trang cần đọc sang ảnh PNG sắc nét:
    ```bash
    pdftoppm -png -r 150 -f <trang> -l <trang> PDF_of_documents/<file_sgk>.pdf /tmp/opencode/page
    ```
  - AI sẽ dùng công cụ `read` trực tiếp lên file ảnh PNG vừa xuất để đọc đề bài, bảng biểu, công thức KaTeX và sơ đồ hình học/thí nghiệm với độ chính xác tuyệt đối.
- **Vẽ lại hình học & sơ đồ:** Từ ảnh scan gốc, AI tự động lập trình file Vector SVG chuẩn lưu tại `frontend/public/images/geometry/` để hiển thị trên web.

### 3. Đóng Gói Đề Kiểm Tra & Phiếu Học Tập Bằng `pandoc`
- Khi Thầy Thức yêu cầu xuất phiếu bài tập hoặc đề kiểm tra ra định dạng in ấn cho học sinh làm trên giấy, AI tự động dùng `pandoc` chuyển đổi từ Markdown sang file Microsoft Word:
  ```bash
  pandoc de_kiem_tra.md -o de_kiem_tra.docx
  ```
- File Word sinh ra giữ nguyên định dạng bảng biểu, in đậm, danh sách câu hỏi trắc nghiệm A, B, C, D rõ ràng, sẵn sàng mở bằng LibreOffice hoặc Word để in.

### 4. Tận Dụng MCPs Cho Nghiên Cứu & Cập Nhật Nội Dung Mới
- **MCP `firecrawl` (đã tích hợp trong `opencode.json`):**
  - Dùng để cào (crawl) các bài báo tiếng Anh thời sự từ các nguồn uy tín (BBC, National Geographic, The Guardian) để thiết kế bài đọc hiểu (Reading Comprehension) cho học sinh Lớp 11 và 12.
  - Trích xuất đề thi thử THPT Quốc Gia mới nhất từ các cổng thông tin giáo dục mà không bị dính mã quảng cáo rác.
- **MCP WebSearch & Docs Lookup:**
  - Tra cứu các ứng dụng thực tế của phản ứng hóa học (Hóa 9) và các dạng bài toán thực tế (Toán 7) để lồng ghép vào cốt truyện Vũ trụ (Cosmic Space Mission).
  - **Giới hạn nội dung:** Bám sát bài học, vừa sức học sinh.
  - AI sẽ dùng công cụ `read` trực tiếp lên file ảnh PNG vừa xuất để đọc lý thuyết, đề bài, bảng biểu, công thức KaTeX và sơ đồ hình học/thí nghiệm với độ chính xác tuyệt đối.
- **Vẽ lại hình học & sơ đồ:** Từ ảnh scan gốc, AI tự động lập trình file Vector SVG chuẩn lưu tại `frontend/public/images/geometry/` để hiển thị trên web.

### 3. Đóng Gói Đề Kiểm Tra & Phiếu Học Tập Bằng `pandoc`
- Khi Thầy Thức yêu cầu xuất phiếu bài tập hoặc đề kiểm tra ra định dạng in ấn cho học sinh làm trên giấy, AI tự động dùng `pandoc` chuyển đổi từ Markdown sang file Microsoft Word:
  ```bash
  pandoc de_kiem_tra.md -o de_kiem_tra.docx
  ```
- File Word sinh ra giữ nguyên định dạng bảng biểu, in đậm, danh sách câu hỏi trắc nghiệm A, B, C, D rõ ràng, sẵn sàng mở bằng LibreOffice hoặc Word để in.

### 4. Tận Dụng MCPs Cho Nghiên Cứu & Cập Nhật Nội Dung Mới
- **MCP `firecrawl` (đã tích hợp trong `opencode.json`):**
  - Dùng để cào (crawl) các bài báo tiếng Anh thời sự từ các nguồn uy tín (BBC, National Geographic, The Guardian) để thiết kế bài đọc hiểu (Reading Comprehension) cho học sinh Lớp 11 và 12.
  - Trích xuất đề thi thử THPT Quốc Gia mới nhất từ các cổng thông tin giáo dục mà không bị dính mã quảng cáo rác.
- **MCP WebSearch & Docs Lookup:**
  - Tra cứu các ứng dụng thực tế của phản ứng hóa học (Hóa 9) và các dạng bài toán thực tế (Toán 7) để lồng ghép vào cốt truyện Vũ trụ (Cosmic Space Mission).

---

## Agent Skills (`.agents/skills/` & `.opencode/skills/`)

Dự án tích hợp các skills chuyên sâu:
- `teaching-english-curriculum`: Soạn bài giảng & bài tập tiếng Anh THPT.
- `keithley-chemistry`: Soạn bài giảng & bài tập Hóa học 9 chủ đề vũ trụ.
- `keithley-math`: Soạn bài tập & vẽ vector SVG hình học Toán 7.
- `svg-diagram-expert`: Thiết kế, tính toán tọa độ, sinh mã & thẩm định thị giác file vector SVG 2D (Toán, Lý, Hóa) qua `scripts/verify-svg.js` và Vision check.
- `soanbai`: Shortcut skill cho quy trình soạn bài tiếng Anh.
- `soanhoakeithley`: Shortcut skill cho Hóa học Keithley.
- `soantoankeithley`: Shortcut skill cho Toán học Keithley.

