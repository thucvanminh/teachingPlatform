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
