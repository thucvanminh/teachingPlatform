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
- **Design Guidelines**: Follow Linear/Apple HIG aesthetics (near-black `#090d16` typography on neutral slate ground, single blue accent, structured grammar compendium formula cards, and 2-way 3D flashcard mechanics with keyboard shortcuts).

### 5. Math & LaTeX Rendering
- Handled by `KatexMath` and `FormattedContent` in `frontend/src/components/KatexMath.tsx`.
- KaTeX is strictly configured with `output: 'html'` to prevent MathML raw text duplication issues.

---

## Custom Slash Commands for Claude Code

Claude Code commands are configured in `.claude/commands/` and can be invoked directly:

### 1. `/soanbai [tên học sinh: thai | nam_viet] [ngày] [chủ đề / tài liệu]`
- **Mục đích:** Tạo trọn gói bài giảng tương tác và bài tập tiếng Anh từ A-Z theo quy chuẩn Thầy Thức.
- **Học sinh:**
  - `thai` (Lớp 11, ID `9208f557-3288-442e-accf-15fc8c763e68`, môn `ENG_11` `f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0`, mục tiêu 8.5+, tài liệu `/home/dantey/Dantey/teaching/lop_11/`).
  - `nam_viet` (Lớp 12, ID `d76bd9d6-6cf5-409c-847b-b0e5c07a0876`, môn `ENG_12` `a15d4b19-412a-4bff-acd5-86714381b7af`, mục tiêu 7+, xếp câu hỏi Từ vựng lên trước, tài liệu `/home/dantey/Dantey/teaching/lop12NamViet/`).
- **Thực thi:**
  1. Tạo web studio tại `frontend/public/lectures/<slug>/index.html` (50 từ vựng Web Speech API, 3 ngữ pháp, Flashcard 3D, Collocation Game, Word Tree, Light Theme).
  2. Soạn 60-100 câu trắc nghiệm (đáp án, giải thích chi tiết).
  3. Chạy script seed nạp DB (`seed_english_lesson.js`).
  4. Test build `npm --prefix frontend run build`, commit & push `main`.

### 2. `/soanhoakeithley` hoặc `/soanhoa [đường dẫn file] [mode: EXERCISE_ONLY | BOTH | LECTURE_ONLY]`
- **Mục đích:** Tạo bài giảng và bài tập Hóa học lớp 9 cho Keithley Lake (`4745136c-bd25-4f45-a488-9f00f2121b70`), môn `CHEM_9` (`6fc7387b-13b8-4e27-8240-a60c03dc1d51`).
- **Tài liệu gốc:** `/home/dantey/Dantey/teaching/lop6/Chemistry/`.
- **Thực thi:**
  1. Nhận diện mode (`EXERCISE_ONLY`, `BOTH`, `LECTURE_ONLY`).
  2. Soạn 100% tiếng Anh, theme Vũ Trụ 8 Trạm Hành Tinh (Mercury $\to$ Neptune), thời lượng 90 phút.
  3. **BẮT BUỘC:** Thêm `"correct_option_id"` vào `question_payload` để kích hoạt còi lỗi (Buzzer), chuông (Chime), và animation rung lắc.
  4. Seed DB (`seed_keithley_chemistry.js`), test build và push `main`.

### 3. `/soantoankeithley` hoặc `/soantoan [ngày] [chủ đề / bài học]`
- **Mục đích:** Tạo bài giảng và bài tập Toán lớp 7 cho Keithley Lake, môn `MATH_7` (`b1cfb82f-fa75-47eb-ba05-7281f6d3fdf2`).
- **Tài liệu gốc:** `/home/dantey/Dantey/teaching/lop6/Math/`.
- **Thực thi:**
  1. 100% Pure English (không kẹp chữ tiếng Việt trong ngoặc).
  2. Vẽ hình học Vector SVG chuẩn tại `frontend/public/images/geometry/` (tuyệt đối không dùng ASCII art).
  3. 25-30 câu hỏi theo 8 Trạm Hành Tinh, 90-120 phút.
  4. Seed DB (`seed_keithley_math.js`), test build và push `main`.

