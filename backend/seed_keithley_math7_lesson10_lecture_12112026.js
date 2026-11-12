const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake
  SUBJECT_ID: 'e89cc834-99d0-40b7-ab5e-0a0838d273c4', // MATH_7
  ASSIGNED_DATE: '2026-11-12'
};

const LECTURE_MARKDOWN = `# 🚀 LESSON 10: EUCLID'S AXIOM & PROPERTIES OF PARALLEL LINES
**Astronaut Cadet Keithley Lake • Grade 7 Math • 12/11/2026**

Interactive Virtual Lab Simulation: \`/lectures/math7-parallel-lines-euclid/index.html\`

---

### 1. Euclid's Axiom of Parallel Lines (The Uniqueness Postulate)
Over 2,300 years ago, Greek mathematician **Euclid** formulated the cornerstone axiom of planar geometry:

> **Euclid's Axiom:**
> Through a point outside a given line, there is **one and only one** line parallel to that line.

$$\\forall \\text{ line } a, \\quad \\forall M \\notin a \\implies \\exists ! \\text{ line } b \\text{ such that } M \\in b \\text{ and } b \\parallel a$$

![Euclid's Parallel Axiom](/images/geometry/euclid_axiom_orbit.svg)

* **Key Consequence (Corollary):**
  If through point $M$, both line $b$ and line $c$ are parallel to line $a$, then line $b$ and line $c$ must **coincide** ($b \\equiv c$).
* **Cosmic Perspective:** If your spacecraft is located at waypoint $M$ outside orbital corridor $a$, there is exactly **one** safe warp trajectory parallel to corridor $a$. Any heading deviation (such as line $c$) will inevitably intersect corridor $a$ at point $K$.

#### Worked Example 1
**Problem:** In deep space flight control, telemetry path $p$ passes through beacon $K$ and satisfies $p \\parallel d$. Scanner path $q$ also passes through beacon $K$ and satisfies $q \\parallel d$. Are flight paths $p$ and $q$ distinct or identical?  
**Step-by-step Solution:**
1. Point $K$ lies outside corridor line $d$.
2. According to Euclid's Axiom, through point $K$ there is **one and only one** line parallel to $d$.
3. Since both paths $p$ and $q$ pass through $K$ and are parallel to $d$, they must be the exact same line ($p \\equiv q$).
4. **Conclusion:** Paths $p$ and $q$ are identical.

---

### 2. Properties of Two Parallel Lines Cut by a Transversal
In Lesson 9, you learned the **Signs of Recognition** (*evidence used to prove lines are parallel*).  
In Lesson 10, we reverse the logic: **given that two lines are already parallel ($a \\parallel b$)**, what angle properties can we deduce?

> **Theorem (Properties of Parallel Lines):**
> If a transversal line $c$ intersects two parallel lines $a$ and $b$ ($a \\parallel b$):
> 1. **Alternate interior angles are EQUAL:** $\\widehat{A_3} = \\widehat{B_1}$ and $\\widehat{A_4} = \\widehat{B_2}$
> 2. **Corresponding angles are EQUAL:** $\\widehat{A_1} = \\widehat{B_1}$, $\\widehat{A_2} = \\widehat{B_2}$, $\\widehat{A_3} = \\widehat{B_3}$, $\\widehat{A_4} = \\widehat{B_4}$
> 3. **Consecutive interior angles are SUPPLEMENTARY ($180^\\circ$):** $\\widehat{A_4} + \\widehat{B_1} = 180^\\circ$ and $\\widehat{A_3} + \\widehat{B_2} = 180^\\circ$

![Properties of Parallel Lines](/images/geometry/parallel_transversal_properties.svg)

#### Worked Example 2
**Problem:** Corridors $a$ and $b$ are known to be parallel ($a \\parallel b$). Sensor transversal $c$ intersects $a$ at station $A$ and $b$ at station $B$. Given that $\\widehat{A_1} = 125^\\circ$:  
a) Calculate corresponding angle $\\widehat{B_1}$.  
b) Calculate alternate interior angle $\\widehat{B_3}$.  
c) Calculate consecutive interior angle $\\widehat{B_2}$.

**Step-by-step Solution:**
1. **Part (a):** Since $a \\parallel b$, corresponding angles at identical positions are equal:
   $$\\widehat{B_1} = \\widehat{A_1} = 125^\\circ$$
2. **Part (b):** Angle $\\widehat{A_3}$ and $\\widehat{A_1}$ are vertical angles $\\implies \\widehat{A_3} = 125^\\circ$.  
   Since $a \\parallel b$, alternate interior angles are equal:
   $$\\widehat{B_1} = \\widehat{A_3} = 125^\\circ$$
   Also, $\\widehat{B_3}$ is vertically opposite to $\\widehat{B_1} \\implies \\widehat{B_3} = 125^\\circ$.
3. **Part (c):** Since $a \\parallel b$, consecutive interior angles are supplementary:
   $$\\widehat{A_3} + \\widehat{B_2} = 180^\\circ \\implies \\widehat{B_2} = 180^\\circ - 125^\\circ = 55^\\circ$$

---

### 3. Relations Between Perpendicularity & Parallelism
The Grade 7 textbook outlines **3 fundamental theorems** linking perpendicular lines ($90^\\circ$) and parallel lines:

![Relations Between Perpendicularity and Parallelism](/images/geometry/perpendicular_parallel_theorems.svg)

1. **Theorem 1 (Double Perpendicular Test):**
   Two distinct lines perpendicular to a common line are mutually parallel:
   $$\\left. \\begin{aligned} a \\perp c \\\\ b \\perp c \\end{aligned} \\right\\} \\implies a \\parallel b$$
2. **Theorem 2 (Perpendicular to Parallels):**
   A line perpendicular to one of two parallel lines is also perpendicular to the other line:
   $$\\left. \\begin{aligned} a \\parallel b \\\\ c \\perp a \\end{aligned} \\right\\} \\implies c \\perp b$$
3. **Theorem 3 (Transitivity of Parallels):**
   Two distinct lines parallel to a third line are parallel to each other:
   $$\\left. \\begin{aligned} a \\parallel c \\\\ b \\parallel c \\end{aligned} \\right\\} \\implies a \\parallel b \\quad (\\text{Hence } a \\parallel b \\parallel c)$$

#### Worked Example 3
**Problem:** In a solar array frame, mounting bar $m \\perp p$ and mounting bar $n \\perp p$. A reinforcement strut $k$ is installed such that $k \\parallel m$.  
a) Prove that $m \\parallel n$.  
b) Prove that strut $k$ is perpendicular to bar $p$ ($k \\perp p$).  
c) Prove that strut $k$ is parallel to mounting bar $n$ ($k \\parallel n$).

**Step-by-step Solution:**
1. **Part (a):** Since $m \\perp p$ and $n \\perp p$, two lines perpendicular to the same line $p$ are parallel:
   $$m \\parallel n \\quad (\\text{Theorem 1})$$
2. **Part (b):** Since $m \\parallel k$ and $p \\perp m$, a line perpendicular to one of two parallel lines is perpendicular to the other:
   $$k \\perp p \\quad (\\text{Theorem 2})$$
3. **Part (c):** Since $k \\parallel m$ and $n \\parallel m$, two lines parallel to the same line $m$ are parallel to each other:
   $$k \\parallel n \\quad (\\text{Theorem 3})$$

---

### 4. Advanced Textbook Technique: The Auxiliary Parallel Ray
A signature problem in Grade 7 geometry involves calculating corner angles between parallel rays by constructing an **auxiliary line** through the vertex using Euclid's Axiom.

![Auxiliary Parallel Line Application](/images/geometry/classic_auxiliary_parallel_line.svg)

#### Worked Example 4
**Problem:** Ray $Ax \\parallel \\text{Ray } By$. Waypoint $O$ is located between the two rays such that $\\widehat{xAO} = 35^\\circ$ and $\\widehat{yBO} = 55^\\circ$. Calculate the total deflection angle $\\widehat{AOB}$.

**Step-by-step Solution:**
1. **Construction:** By **Euclid's Axiom**, through waypoint $O$, draw auxiliary ray $Ot \\parallel Ax$ directed in the same orientation.
2. Since $Ot \\parallel Ax$, alternate interior angles are equal:
   $$\\widehat{O_1} = \\widehat{xAO} = 35^\\circ$$
3. Since $Ot \\parallel Ax$ and $Ax \\parallel By$, by transitivity (Theorem 3):
   $$Ot \\parallel By$$
4. Since $Ot \\parallel By$, alternate interior angles are equal:
   $$\\widehat{O_2} = \\widehat{yBO} = 55^\\circ$$
5. Because ray $Ot$ lies between rays $OA$ and $OB$:
   $$\\widehat{AOB} = \\widehat{O_1} + \\widehat{O_2} = 35^\\circ + 55^\\circ = 90^\\circ$$
6. **Conclusion:** Angle $\\widehat{AOB}$ is a perfect right angle ($90^\\circ$).

---

### 5. Cadet Flight Summary Table

| Concept / Tool | Mathematical Statement | Key Application |
| :--- | :--- | :--- |
| **Euclid's Axiom** | Through $M \\notin a$, $\\exists ! \\text{ line } b \\parallel a$ | Guarantees uniqueness; allows drawing auxiliary parallel lines |
| **Alternate Interior (Z)** | $a \\parallel b \\implies \\widehat{A_3} = \\widehat{B_1}$ | Instant angle transfer across transversal |
| **Corresponding (F)** | $a \\parallel b \\implies \\widehat{A_1} = \\widehat{B_1}$ | Identical position angle calculation |
| **Consecutive Interior (U)** | $a \\parallel b \\implies \\widehat{A_4} + \\widehat{B_1} = 180^\\circ$ | Supplementary angle calculation |
| **Perpendicular Bridge** | $a \\perp c \\text{ and } b \\perp c \\implies a \\parallel b$ | Proving parallelism from two $90^\\circ$ right angles |
| **Perpendicular to Parallels** | $a \\parallel b \\text{ and } c \\perp a \\implies c \\perp b$ | Proving a $90^\\circ$ angle on the second line |
| **Transitivity** | $a \\parallel c \\text{ and } b \\parallel c \\implies a \\parallel b$ | Chaining parallel alignments ($a \\parallel b \\parallel c$) |
`;

async function seed() {
  console.log('🚀 Seeding Math 7 Lesson 10: Euclid Axiom & Properties (Lecture Only) for Keithley Lake...');
  console.log('Target Date:', CONSTANTS.ASSIGNED_DATE);

  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  // 1. Clean up any existing assignments for Keithley on 2026-11-12 for MATH_7
  const existingAsgns = await prisma.daily_student_assignments.findMany({
    where: {
      student_id: CONSTANTS.STUDENT_ID,
      assigned_date: targetDate,
      learning_units: {
        subject_id: CONSTANTS.SUBJECT_ID
      }
    },
    include: {
      assessment_attempts: true
    }
  });

  if (existingAsgns.length > 0) {
    console.log(`Cleaning ${existingAsgns.length} previous assignment(s)...`);
    for (const a of existingAsgns) {
      for (const att of a.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: a.id } });
    }
  }

  // 2. Create Learning Unit (Flight Briefing)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: "Lesson 10: Euclid's Axiom & Properties of Parallel Lines",
      description: "Master Euclid's parallel postulate, alternate/corresponding angle properties, and perpendicular-to-parallel theorems.",
      lecture_content_markdown: LECTURE_MARKDOWN,
      lecture_attachments: [],
      is_template: true
    }
  });
  console.log('✅ Created Learning Unit:', unit.id);

  // 3. Create Daily Student Assignment Card (Mode: LECTURE_ONLY)
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: targetDate,
      custom_session_minutes: 90,
      teacher_daily_note: "Cadet Keithley: Study Euclid's Axiom, the 3 parallel properties (Z, F, U), and the auxiliary ray technique in your briefing.",
      is_published: true
    }
  });
  console.log('✅ Created Daily Assignment Card:', assignment.id);

  // 4. Save JSON Backup
  const backupPath = path.resolve(__dirname, 'content/math7_lesson10_lecture_2026_11_12.json');
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.writeFileSync(backupPath, JSON.stringify({
    assignedDate: CONSTANTS.ASSIGNED_DATE,
    studentId: CONSTANTS.STUDENT_ID,
    subjectId: CONSTANTS.SUBJECT_ID,
    unitId: unit.id,
    assignmentId: assignment.id,
    mode: 'LECTURE_ONLY',
    unitTitle: unit.title,
    lectureMarkdown: LECTURE_MARKDOWN
  }, null, 2));
  console.log('✅ Saved backup to:', backupPath);

  console.log('🎉 ALL DONE! 12/11/2026 Keithley Math 7 Lesson 10 Lecture mission deployed successfully.');
}

seed()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
