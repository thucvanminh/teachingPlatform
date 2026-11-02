# Parallel Paths Expedition — 1 November 2026

Source: `90_minute_practice_by_problem_types_parallel_lines_for_keithley.md`.
The payload preserves all 20 multiple-choice questions and all 15 multi-part
written exercises in source order, with English-only prompts, options, methods,
solutions and rubrics. MCQs carry 0.2 points and written exercises 0.4 points:
10 points total, 90 minutes (15 + 20 + 25 + 15 + 15 across the five types).

## Editorial decisions

- Use the workbook numbering, clockwise from top-left: 1, 2, 3, 4 at each
  intersection. The UI explicitly warns that the earlier lecture uses a
  different numbering convention.
- Exercise 5.2 originally places At inside angle xOy but calls OAt = 35° an
  alternate interior angle. These conditions conflict. The corrected exercise
  uses xAt = 35° and corresponding angles xAt/xOz, preserving the intended
  bisector calculation and parallelism proof.
- Diagrams are schematic, not evidence of equality or parallelism. Numerical
  conditions in each question take precedence over apparent scale.
- All written subparts are retained in one response field per exercise. The
  tutor grades reasoning; no fake image-upload action is shown for this set.

## Rebuild and publish

```sh
node backend/build_parallel_practice.js /path/to/source.md
node backend/seed_parallel_practice.js
node backend/seed_parallel_practice.js --apply
```

The preview finds the existing Keithley Lesson 9 card dated 2026-11-01. Apply
adds an assessment and a NOT_STARTED attempt under that card in a transaction.
It does not delete or replace an existing assessment, attempt, answer, lecture
or assignment. Repeating apply leaves an existing matching assessment alone.

## Layout verification

Use an intercepted API fixture from the payload when testing the mission route;
do not start or submit the student's real attempt. At 1280×720, 1366×768 and
1920×1080, walk all 35 questions and check that every option / written input
lies above the footer, no horizontal or document overflow occurs, images load,
and KaTeX renders without errors. Also check 390px mobile, answer selection,
feedback, and preserving written text while moving between questions.
