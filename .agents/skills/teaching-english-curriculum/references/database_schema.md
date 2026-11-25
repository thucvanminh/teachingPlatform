# Database Schema & Assignment Architecture (Cấu Trúc Bảng Dữ Liệu Bài Học)

This reference defines the Prisma schema models and relation chain required to create an end-to-end card with exercises and lecture for a student.

---

## 1. Relational Chain

When seeding a daily assignment card, 5 database entities must be created in order:

```text
subjects (ENG_11 or ENG_12)
    └── learning_units (Title, description, lecture_content_markdown, is_template)
          └── daily_student_assignments (student_id, assigned_date, custom_session_minutes, teacher_daily_note)
                └── assessments (unit_id, type: IN_SESSION_90M, time_limit_minutes: 90)
                      ├── questions (content, options JSON, correct_answer, explanation, points)
                      └── assessment_attempts (student_id, status: IN_PROGRESS)
```

---

## 2. Table Schemas & Required Fields

### A. `learning_units`
- `subject_id`: UUID of `ENG_11` (`f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0`) or `ENG_12` (`a15d4b19-412a-4bff-acd5-86714381b7af`)
- `created_by`: Teacher UUID (`dc62e5df-2344-4785-b058-b95f5dbe0983` - Thầy Thức)
- `title`: e.g. `"Unit 4: Urbanisation"` or `"Ôn tập thi giữa kì"`
- `description`: Clean summary of topics covered
- `lecture_content_markdown`: Full markdown theory + link to interactive app: `[🚀 MỞ PHÒNG HỌC TƯƠNG TÁC TOÀN MÀN HÌNH](/lectures/<slug>/index.html)`
- `is_template`: `true`

### B. `daily_student_assignments`
- `student_id`: UUID of student (`thai`: `9208f557-3288-442e-accf-15fc8c763e68`, `nam_viet`: `d76bd9d6-6cf5-409c-847b-b0e5c07a0876`)
- `learning_unit_id`: UUID of `learning_units`
- `assigned_by`: Teacher UUID
- `assigned_date`: ISO Date (e.g. `2026-11-25T00:00:00.000Z`)
- `custom_session_minutes`: `90`
- `teacher_daily_note`: Direct teacher advice from Thầy Thức
- `is_published`: `true`

### C. `assessments`
- `learning_unit_id`: UUID of `learning_units`
- `type`: `'IN_SESSION_90M'` (or `'HOMEWORK'`)
- `title`: e.g. `"Đấu Trường 80 Câu Đa Dạng: Unit 4 - Urbanisation"`
- `time_limit_minutes`: `90`
- `max_score`: `10.00`

### D. `questions`
- `assessment_id`: UUID of `assessments`
- `type`: `'MULTIPLE_CHOICE'` or `'FILL_IN_BLANK'`
- `points`: `10 / total_questions` (e.g. `0.125` for 80 questions)
- `order_index`: Integer starting from 1 (Put Vocabulary first for `nam_viet`, then Word Formation, Grammar, Reading)
- `question_payload`:
  - For `MULTIPLE_CHOICE`: `{ content_markdown, options: [{ id: "A"|"B"|"C"|"D", text }], correct_option_id, section_name, passage? }`
  - For `FILL_IN_BLANK`: `{ content_markdown, accepted_answers: [...], section_name, passage? }`
  - Note: For Reading/Cloze questions, either set `passage` explicitly OR separate passage and question with `\n\n**Question X:** ...` so `HighSchoolExamStudio` renders the 2-column split reader cleanly.
- `grading_key_payload`:
  - For `MULTIPLE_CHOICE`: `{ correct_option_id, explanation_markdown }`
  - For `FILL_IN_BLANK`: `{ accepted_answers: [...], explanation_markdown }`

### E. `assessment_attempts`
- `daily_assignment_id`: UUID of `daily_student_assignments`
- `assessment_id`: UUID of `assessments`
- `student_id`: UUID of student
- `status`: `'NOT_STARTED'` (or `'IN_PROGRESS'`)
- `total_score`: `0.0`
