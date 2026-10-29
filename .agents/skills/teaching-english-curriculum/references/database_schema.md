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
- `subject_id`: UUID of `ENG_11` (`f36e3e6b-46e2-4839-a2e8-8a78ff88a9a0`) or `ENG_12` (`9b343ae3-1f19-4bbd-986d-069cb158a127`)
- `created_by`: Teacher UUID (`dc62e5df-2344-4785-b058-b95f5dbe0983` - Thầy Thức)
- `title`: e.g. `"Unit 4: Urbanisation"` or `"Ôn tập thi giữa kì"`
- `description`: Clean summary of topics covered
- `lecture_content_markdown`: Full markdown theory + link to interactive app: `[🚀 MỞ PHÒNG HỌC TƯƠNG TÁC TOÀN MÀN HÌNH](/lectures/<slug>/index.html)`
- `is_template`: `true`

### B. `daily_student_assignments`
- `student_id`: UUID of student (`thai`: `9208f557-3288-442e-accf-15fc8c763e68`, `nam_viet`: `c4217be5-4c07-4286-905c-e67d26456fae`)
- `learning_unit_id`: UUID of `learning_units`
- `assigned_by`: Teacher UUID
- `assigned_date`: ISO Date (e.g. `2026-10-29T00:00:00.000Z`)
- `custom_session_minutes`: `90`
- `teacher_daily_note`: Direct teacher advice from Thầy Thức (e.g. `"Tối nay con tập trung làm bài ôn tập giữa kì 1..."`)
- `is_published`: `true`

### C. `assessments`
- `unit_id`: UUID of `learning_units`
- `created_by`: Teacher UUID
- `type`: `'IN_SESSION_90M'` (or `'HOMEWORK'`)
- `title`: e.g. `"Luyện tập tại lớp: Unit 4 Urbanisation (60 câu)"`
- `time_limit_minutes`: `90`
- `max_score`: `10`

### D. `questions`
- `assessment_id`: UUID of `assessments`
- `content`: HTML/Text question prompt
- `question_type`: `'MULTIPLE_CHOICE'`
- `options`: JSON array: `[{"id": "A", "text": "..."}, {"id": "B", "text": "..."}]`
- `correct_answer`: `'A'`, `'B'`, `'C'`, or `'D'`
- `explanation`: Thorough grammatical and vocabulary explanation from Thầy Thức
- `points`: `0.1` (or `10 / total_questions`)
- `order_index`: Integer starting from 1 (Put Vocabulary first, then Grammar, then Reading)

### E. `assessment_attempts`
- `daily_assignment_id`: UUID of `daily_student_assignments`
- `assessment_id`: UUID of `assessments`
- `student_id`: UUID of student
- `status`: `'IN_PROGRESS'` (allows student to click "Vào làm bài" immediately)
- `max_score`: `10`
