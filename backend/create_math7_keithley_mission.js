const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Cosmic Geometry Mission generation for Astronaut Keithley (29/10/2026)...');

  // 1. Find Keithley, Teacher, and MATH_7 subject
  const keithley = await prisma.users.findUnique({
    where: { username: 'keithley' }
  });
  if (!keithley) throw new Error('Student account "keithley" not found');

  const teacher = await prisma.users.findUnique({
    where: { username: 'teacher' }
  });
  if (!teacher) throw new Error('Teacher account not found');

  const mathSubject = await prisma.subjects.findUnique({
    where: { code: 'MATH_7' }
  });
  if (!mathSubject) throw new Error('Subject MATH_7 not found');

  console.log(`✓ Student: ${keithley.full_name} (${keithley.username})`);
  console.log(`✓ Teacher: ${teacher.full_name}`);
  console.log(`✓ Subject: ${mathSubject.name} (${mathSubject.code})`);

  // Target Date: 2026-10-29
  const targetDate = new Date('2026-10-29T00:00:00.000Z');

  // 2. Clean up existing assignment for Keithley on 2026-10-29 if present
  const existingAsgn = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: keithley.id,
      assigned_date: targetDate
    },
    include: {
      assessment_attempts: true
    }
  });

  if (existingAsgn) {
    console.log('⚠️ Found existing assignment on 2026-10-29, replacing with fresh mission data...');
    for (const att of existingAsgn.assessment_attempts) {
      await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
      await prisma.assessment_attempts.delete({ where: { id: att.id } });
    }
    await prisma.daily_student_assignments.delete({ where: { id: existingAsgn.id } });
    console.log('✓ Cleaned up old assignment.');
  }

  // 3. Create Learning Unit (Lecture & Exercises)
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: mathSubject.id,
      created_by: teacher.id,
      title: 'Lesson 8: Special Angle Pairs & Angle Bisectors',
      description: 'Cosmic Geometry Expedition: Adjacent supplementary angles (linear pairs), vertical opposite angles, and angle bisector theorems across planetary coordinates.',
      lecture_content_markdown: `# 🚀 Space Flight Briefing: Special Angle Pairs & Angle Bisectors

Welcome aboard, Astronaut Keithley! In this deep space mathematics mission, we explore the core geometric rules that govern celestial trajectories, orbital angles, and spacecraft navigation.

---

### 1. Adjacent Angles & Linear Pairs
- **Adjacent Angles:** Two angles that share a common vertex and a common ray, with the remaining two rays lying on opposite half-planes.
- **Linear Pair:** Two adjacent angles whose non-common sides are opposite rays (forming a straight line).
  $$\\widehat{xOy} + \\widehat{yOz} = 180^\\circ$$

---

### 2. Vertical Angles
- Two angles are **vertical angles** if each side of one angle is the opposite ray of a side of the other angle (formed by two intersecting straight lines).
- **Core Theorem:** Vertical angles are always equal in degree measure:
  $$\\widehat{O_1} = \\widehat{O_3}, \\quad \\widehat{O_2} = \\widehat{O_4}$$

---

### 3. Angle Bisectors
- Ray $Oz$ is the **angle bisector** of $\\widehat{xOy}$ if:
  1. $Oz$ lies between rays $Ox$ and $Oy$.
  2. $\\widehat{xOz} = \\widehat{yOz} = \\dfrac{1}{2}\\widehat{xOy}$ (or $\\widehat{xOy} = 2\\widehat{xOz}$).

---

### 4. Golden Theorems of Celestial Geometry
1. **Perpendicular Bisectors Theorem:** The angle bisectors of two adjacent supplementary angles are always **perpendicular** to each other ($90^\\circ$).
2. **Opposite Bisectors Theorem:** The bisectors of two vertical angles form **two opposite rays** ($180^\\circ$).

*Complete the 28 cosmic challenges below across all planetary sectors!*`,
      lecture_attachments: [],
      is_template: true
    }
  });
  console.log('✓ Created Learning Unit:', learningUnit.title, learningUnit.id);

  // 4. Create In-Session Assessment (90-120 mins)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: learningUnit.id,
      type: 'IN_SESSION_90M',
      title: 'Cosmic Geometry Expedition: Special Angle Pairs & Angle Bisectors (90-120 mins)',
      instructions: 'Welcome, Astronaut Keithley! Complete 28 celestial geometry problems across 8 Solar System Stations. Use the interactive 2-minute chronometer on each problem to pace your calculations.',
      time_limit_minutes: 120,
      max_score: 10.00
    }
  });
  console.log('✓ Created Assessment:', assessment.title, assessment.id);

  // 5. Construct 28 Comprehensive English Questions
  const questionsList = [
    // =========================================================================
    // SECTOR 1: ORBITAL FOUNDATIONS & ANGLE PAIR RECOGNITION (Q1 - Q8)
    // =========================================================================
    {
      order_index: 1,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 1: Mercury Orbit • Angle Foundations',
      content_markdown: `In orbital geometry, two angles $\\widehat{AOB}$ and $\\widehat{BOC}$ are formally defined as **adjacent angles** if and only if:`,
      options: [
        { id: 'A', text: 'They share a common vertex $O$ and a common ray $OB$, with rays $OA$ and $OC$ lying on opposite half-planes bounded by line $OB$.' },
        { id: 'B', text: 'Their sum is always equal to $90^\\circ$.' },
        { id: 'C', text: 'They are formed by two intersecting lines.' },
        { id: 'D', text: 'They have equal degree measures and share an endpoint.' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: By definition, two adjacent angles share a common vertex and one common ray, with the other two rays lying on opposite half-planes.'
    },
    {
      order_index: 2,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 1: Mercury Orbit • Linear Pairs',
      content_markdown: `Two angles $\\widehat{xOy}$ and $\\widehat{yOz}$ form a **linear pair**. Which of the following statements is ALWAYS TRUE?`,
      options: [
        { id: 'A', text: 'They are adjacent and supplementary: $\\widehat{xOy} + \\widehat{yOz} = 180^\\circ$, and rays $Ox, Oz$ are opposite rays.' },
        { id: 'B', text: 'They are complementary: $\\widehat{xOy} + \\widehat{yOz} = 90^\\circ$.' },
        { id: 'C', text: 'Each ray of $\\widehat{xOy}$ is the opposite ray of a ray of $\\widehat{yOz}$.' },
        { id: 'D', text: 'Both angles must be acute angles ($< 90^\\circ$).' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: A linear pair consists of two adjacent angles whose exterior rays form a straight line (sum = 180°).'
    },
    {
      order_index: 3,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 2: Venus Base • Vertical Angles',
      content_markdown: `Two angles are defined as **vertical angles** if and only if:`,
      options: [
        { id: 'A', text: 'They have the exact same angle measure.' },
        { id: 'B', text: 'Each side of one angle is the opposite ray of a side of the other angle.' },
        { id: 'C', text: 'Their sum equals $180^\\circ$ and they share a vertex.' },
        { id: 'D', text: 'They lie inside the same triangle.' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Vertical angles are formed when two straight lines intersect; each ray of one angle is opposite to a ray of the other.'
    },
    {
      order_index: 4,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 2: Venus Base • Figure Identification',
      content_markdown: `Refer to the geometric vector diagram below where straight line $AB$ intersects straight line $CD$ at focal waypoint $O$:

![Figure: Intersecting Lines AB and CD at Node O](/images/geometry/question_4_intersecting_lines.svg)

Which of the following pairs of angles are **vertical opposite angles**?`,
      options: [
        { id: 'A', text: '$\\widehat{AOC}$ and $\\widehat{BOD}$' },
        { id: 'B', text: '$\\widehat{AOC}$ and $\\widehat{AOD}$' },
        { id: 'C', text: '$\\widehat{BOC}$ and $\\widehat{BOD}$' },
        { id: 'D', text: '$\\widehat{AOB}$ and $\\widehat{COD}$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: Ray OA is opposite to ray OB, and ray OC is opposite to ray OD. Therefore, ∠AOC and ∠BOD are vertical opposite angles.'
    },
    {
      order_index: 5,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 2: Venus Base • Angle Bisector Definition',
      content_markdown: `A flight vector ray $Oz$ is the **angle bisector** of angle $\\widehat{xOy}$ if and only if:`,
      options: [
        { id: 'A', text: 'Ray $Oz$ lies between rays $Ox$ and $Oy$, and $\\widehat{xOz} = \\widehat{yOz} = \\dfrac{1}{2}\\widehat{xOy}$.' },
        { id: 'B', text: 'Ray $Oz$ is perpendicular to ray $Ox$.' },
        { id: 'C', text: 'Ray $Oz$ intersects the line segment connecting $Ox$ and $Oy$ at any point.' },
        { id: 'D', text: '$\\widehat{xOz} + \\widehat{yOz} = 180^\\circ$.' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: The angle bisector must satisfy two criteria: it must lie between the two rays of the angle and divide the angle into two equal halves.'
    },
    {
      order_index: 6,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 2: Venus Base • Conceptual Trap',
      content_markdown: `Space Cadet Alex claims: *"If two angles have equal degree measures ($\\widehat{\\alpha} = \\widehat{\\beta} = 50^\\circ$), they MUST be vertical angles."* Is Alex's statement mathematically sound?`,
      options: [
        { id: 'A', text: 'Yes, any two angles with equal measures are vertical angles.' },
        { id: 'B', text: 'No, because vertical angles must strictly have each side formed by opposite rays (intersecting straight lines).' },
        { id: 'C', text: 'Yes, but only if they are both acute angles.' },
        { id: 'D', text: 'No, because vertical angles always add up to $180^\\circ$.' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Equal measure is a consequence of vertical angles, but two angles can be equal without being vertical (e.g. two separate 50° angles).'
    },
    {
      order_index: 7,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 3: Earth Mission Control • Linear Pair Calculation',
      content_markdown: `Two thruster gimbal angles $\\widehat{mOn}$ and $\\widehat{nOp}$ form a linear pair. If $\\widehat{mOn} = 72^\\circ$, what is the measure of angle $\\widehat{nOp}$?`,
      options: [
        { id: 'A', text: '$18^\\circ$' },
        { id: 'B', text: '$108^\\circ$' },
        { id: 'C', text: '$72^\\circ$' },
        { id: 'D', text: '$288^\\circ$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Linear pairs are supplementary: ∠nOp = 180° - 72° = 108°.'
    },
    {
      order_index: 8,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 3: Earth Mission Control • Intersecting Line Geometry',
      content_markdown: `When two straight orbital trajectories $xy$ and $uv$ intersect at focal point $O$, how many pairs of **vertical angles** and how many pairs of **linear pairs** are formed (excluding straight angles)?`,
      options: [
        { id: 'A', text: '2 pairs of vertical angles and 4 pairs of linear pairs.' },
        { id: 'B', text: '4 pairs of vertical angles and 2 pairs of linear pairs.' },
        { id: 'C', text: '2 pairs of vertical angles and 2 pairs of linear pairs.' },
        { id: 'D', text: '1 pair of vertical angles and 4 pairs of linear pairs.' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: Two intersecting lines produce 4 non-straight angles: exactly 2 opposite pairs (vertical) and 4 adjacent pairs (linear pairs).'
    },

    // =========================================================================
    // SECTOR 2: INTERSECTING RAYS & ALGEBRAIC CALCULATIONS (Q9 - Q16)
    // =========================================================================
    {
      order_index: 9,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 3: Earth Mission Control • Complete Angle Set',
      content_markdown: `Two communication laser lines $xy$ and $zt$ intersect at waypoint $O$. Telemetry detects that $\\widehat{xOz} = 55^\\circ$. What are the measures of the remaining three angles $\\widehat{yOt}, \\widehat{xOt},$ and $\\widehat{zOy}$?`,
      options: [
        { id: 'A', text: '$\\widehat{yOt} = 55^\\circ, \\; \\widehat{xOt} = 125^\\circ, \\; \\widehat{zOy} = 125^\\circ$' },
        { id: 'B', text: '$\\widehat{yOt} = 125^\\circ, \\; \\widehat{xOt} = 55^\\circ, \\; \\widehat{zOy} = 55^\\circ$' },
        { id: 'C', text: '$\\widehat{yOt} = 55^\\circ, \\; \\widehat{xOt} = 35^\\circ, \\; \\widehat{zOy} = 35^\\circ$' },
        { id: 'D', text: '$\\widehat{yOt} = 55^\\circ, \\; \\widehat{xOt} = 135^\\circ, \\; \\widehat{zOy} = 135^\\circ$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: ∠yOt = ∠xOz = 55° (vertical angles). ∠xOt = 180° - 55° = 125° (linear pair). ∠zOy = ∠xOt = 125° (vertical angles).'
    },
    {
      order_index: 10,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 4: Mars Outpost • Vertical Angle Sum',
      content_markdown: `Two solar array booms $AB$ and $CD$ cross at joint $O$. Telemetry reveals that the sum of the two vertical angles is $\\widehat{AOC} + \\widehat{BOD} = 140^\\circ$. What is the measure of the adjacent angle $\\widehat{AOD}$?`,
      options: [
        { id: 'A', text: '$70^\\circ$' },
        { id: 'B', text: '$110^\\circ$' },
        { id: 'C', text: '$40^\\circ$' },
        { id: 'D', text: '$140^\\circ$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Since vertical angles are equal, ∠AOC = ∠BOD = 140° / 2 = 70°. Then ∠AOD = 180° - 70° = 110°.'
    },
    {
      order_index: 11,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 4: Mars Outpost • Ratio in Linear Pairs',
      content_markdown: `Two rover antenna angles $\\widehat{xOy}$ and $\\widehat{yOz}$ form a linear pair. Their degree measures have a ratio of:
$$\\dfrac{\\widehat{xOy}}{\\widehat{yOz}} = \\dfrac{1}{3}$$
What is the measure of the larger angle $\\widehat{yOz}$?`,
      options: [
        { id: 'A', text: '$45^\\circ$' },
        { id: 'B', text: '$135^\\circ$' },
        { id: 'C', text: '$60^\\circ$' },
        { id: 'D', text: '$120^\\circ$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Let ∠xOy = k and ∠yOz = 3k. k + 3k = 180° => 4k = 180° => k = 45°. Thus ∠yOz = 3 * 45° = 135°.'
    },
    {
      order_index: 12,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 4: Mars Outpost • Difference in Linear Pairs',
      content_markdown: `Lines $AB$ and $CD$ intersect at waypoint $O$. The difference between two adjacent angles is known to be:
$$\\widehat{AOD} - \\widehat{AOC} = 30^\\circ$$
Calculate the measure of the smaller angle $\\widehat{AOC}$.`,
      options: [
        { id: 'A', text: '$75^\\circ$' },
        { id: 'B', text: '$105^\\circ$' },
        { id: 'C', text: '$60^\\circ$' },
        { id: 'D', text: '$90^\\circ$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: We have ∠AOD + ∠AOC = 180° and ∠AOD - ∠AOC = 30°. Subtracting gives 2*∠AOC = 150° => ∠AOC = 75°.'
    },
    {
      order_index: 13,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 4: Mars Outpost • Angle Algebra',
      content_markdown: `Two angles $\\widehat{\\alpha}$ and $\\widehat{\\beta}$ form a linear pair. It is given that $\\widehat{\\alpha} = 2\\widehat{\\beta} - 15^\\circ$. What is the measure of $\\widehat{\\beta}$?`,
      options: [
        { id: 'A', text: '$65^\\circ$' },
        { id: 'B', text: '$115^\\circ$' },
        { id: 'C', text: '$55^\\circ$' },
        { id: 'D', text: '$70^\\circ$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: α + β = 180° => (2β - 15°) + β = 180° => 3β = 195° => β = 65°.'
    },
    {
      order_index: 14,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 5: Jupiter Station • Three Intersecting Lines',
      content_markdown: `Refer to the geometric vector diagram below where three telemetry lines $AB, CD,$ and $EF$ intersect at central station $O$:

![Figure: Three Lines AB, CD, and EF Intersecting at Waypoint O](/images/geometry/question_14_three_lines.svg)

Given that $\\widehat{AOE} = 30^\\circ$ and $\\widehat{COF} = 70^\\circ$, calculate the degree measure of angle $\\widehat{BOD}$.`,
      options: [
        { id: 'A', text: '$80^\\circ$' },
        { id: 'B', text: '$100^\\circ$' },
        { id: 'C', text: '$70^\\circ$' },
        { id: 'D', text: '$30^\\circ$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: ∠DOE and ∠COF are vertical angles => ∠DOE = 70°. On straight line AB: ∠AOE + ∠DOE + ∠BOD = 180° => 30° + 70° + ∠BOD = 180° => ∠BOD = 80°.'
    },
    {
      order_index: 15,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 5: Jupiter Station • Star Tracker Vector',
      content_markdown: `A space telescope rotates about axis $O$. Ray $OA$ points to the Polaris guide star. If ray $OB$ forms $\\widehat{AOB} = 138^\\circ$ and ray $OC$ is the opposite ray of $OA$, what is the deflection angle $\\widehat{BOC}$?`,
      options: [
        { id: 'A', text: '$42^\\circ$' },
        { id: 'B', text: '$52^\\circ$' },
        { id: 'C', text: '$138^\\circ$' },
        { id: 'D', text: '$222^\\circ$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: Since OA and OC are opposite rays, line AC is a straight line. ∠AOB and ∠BOC form a linear pair: ∠BOC = 180° - 138° = 42°.'
    },
    {
      order_index: 16,
      type: 'FILL_IN_BLANK',
      points: 0.35,
      sectionName: 'Sector 5: Jupiter Station • Numerical Precision',
      content_markdown: `Two orbital tracks $AB$ and $CD$ intersect at point $O$. Given that $\\widehat{AOC} = 48^\\circ$, calculate the exact numerical degree measure of adjacent supplementary angle $\\widehat{BOC}$. *(Enter ONLY the integer number, e.g. 132)*:`,
      options: null,
      correct_option_id: '132',
      explanation: 'ANSWER: 132 (Calculation: 180° - 48° = 132°).'
    },

    // =========================================================================
    // SECTOR 3: ANGLE BISECTOR COMPUTATIONS & CLASSICAL THEOREMS (Q17 - Q24)
    // =========================================================================
    {
      order_index: 17,
      type: 'FILL_IN_BLANK',
      points: 0.35,
      sectionName: 'Sector 5: Jupiter Station • Bisector Computation',
      content_markdown: `An interplanetary spacecraft navigation angle is $\\widehat{mOn} = 144^\\circ$. Flight computer deploys ray $Ot$ as the angle bisector of $\\widehat{mOn}$. What is the degree measure of angle $\\widehat{mOt}$? *(Enter ONLY the integer number, e.g. 72)*:`,
      options: null,
      correct_option_id: '72',
      explanation: 'ANSWER: 72 (Calculation: 144° / 2 = 72°).'
    },
    {
      order_index: 18,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 6: Saturn Rings • Linear Pair Bisectors Theorem',
      content_markdown: `Let $\\widehat{xOy}$ and $\\widehat{yOz}$ be two adjacent supplementary angles (linear pair). Ray $Om$ is the bisector of $\\widehat{xOy}$ and ray $On$ is the bisector of $\\widehat{yOz}$. What is the measure of the angle $\\widehat{mOn}$ between the two bisectors?`,
      options: [
        { id: 'A', text: '$45^\\circ$' },
        { id: 'B', text: '$90^\\circ$ (The two bisectors are always perpendicular: $Om \\perp On$)' },
        { id: 'C', text: '$180^\\circ$' },
        { id: 'D', text: 'It varies depending on the specific measure of $\\widehat{xOy}$.' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Classic Theorem: ∠mOn = ∠mOy + ∠yOn = (∠xOy + ∠yOz)/2 = 180° / 2 = 90°.'
    },
    {
      order_index: 19,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 6: Saturn Rings • Bisectors of Adjacent Angles',
      content_markdown: `Given two adjacent angles $\\widehat{aOb} = 50^\\circ$ and $\\widehat{bOc} = 70^\\circ$. Ray $Om$ is the bisector of $\\widehat{aOb}$, and ray $On$ is the bisector of $\\widehat{bOc}$. Calculate the degree measure of angle $\\widehat{mOn}$.`,
      options: [
        { id: 'A', text: '$60^\\circ$' },
        { id: 'B', text: '$120^\\circ$' },
        { id: 'C', text: '$35^\\circ$' },
        { id: 'D', text: '$25^\\circ$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: ∠mOb = 50° / 2 = 25°. ∠bOn = 70° / 2 = 35°. ∠mOn = 25° + 35° = 60°.'
    },
    {
      order_index: 20,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 6: Saturn Rings • Bisector and Opposite Ray',
      content_markdown: `Given angle $\\widehat{AOB} = 130^\\circ$. Ray $OM$ is the angle bisector of $\\widehat{AOB}$. Ray $ON$ is drawn as the opposite ray of $OM$. What is the measure of angle $\\widehat{AON}$?`,
      options: [
        { id: 'A', text: '$65^\\circ$' },
        { id: 'B', text: '$115^\\circ$' },
        { id: 'C', text: '$130^\\circ$' },
        { id: 'D', text: '$50^\\circ$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: OM bisects ∠AOB => ∠AOM = 130° / 2 = 65°. Since ON is opposite to OM, ∠AOM and ∠AON form a linear pair => ∠AON = 180° - 65° = 115°.'
    },
    {
      order_index: 21,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 6: Saturn Rings • Bisectors of Vertical Angles',
      content_markdown: `Two lines $xy$ and $zt$ intersect at $O$, forming vertical angles $\\widehat{xOz}$ and $\\widehat{yOt}$. Ray $Ou$ is the bisector of $\\widehat{xOz}$ and ray $Ov$ is the bisector of $\\widehat{yOt}$. Which statement about rays $Ou$ and $Ov$ is ALWAYS TRUE?`,
      options: [
        { id: 'A', text: 'Rays $Ou$ and $Ov$ are perpendicular ($Ou \\perp Ov$).' },
        { id: 'B', text: 'Rays $Ou$ and $Ov$ are two opposite rays, forming a straight angle of $180^\\circ$.' },
        { id: 'C', text: 'Rays $Ou$ and $Ov$ form an acute angle of $45^\\circ$.' },
        { id: 'D', text: 'Rays $Ou$ and $Ov$ coincide with line $xy$.' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Classic Theorem: The bisectors of two vertical angles form two opposite rays (a straight line of 180°).'
    },
    {
      order_index: 22,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 7: Uranus Deep Space • Symmetric Rays & Perpendicularity',
      content_markdown: `Given a straight angle $\\widehat{xOy} = 180^\\circ$. On the same half-plane bounded by line $xy$, two rays $Om$ and $On$ are drawn such that $\\widehat{xOm} = 40^\\circ$ and $\\widehat{yOn} = 40^\\circ$. If $Ot$ is the angle bisector of $\\widehat{mOn}$, what is the measure of angle $\\widehat{xOt}$?`,
      options: [
        { id: 'A', text: '$90^\\circ$ (Ray $Ot$ is perpendicular to line $xy$)' },
        { id: 'B', text: '$80^\\circ$' },
        { id: 'C', text: '$100^\\circ$' },
        { id: 'D', text: '$45^\\circ$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: ∠mOn = 180° - 40° - 40° = 100°. Ot bisects ∠mOn => ∠mOt = 50°. Thus ∠xOt = ∠xOm + ∠mOt = 40° + 50° = 90° (Ot ⊥ xy).'
    },
    {
      order_index: 23,
      type: 'FILL_IN_BLANK',
      points: 0.35,
      sectionName: 'Sector 7: Uranus Deep Space • Theorem Application',
      content_markdown: `An orbital sensor angle is $\\widehat{xOy} = 64^\\circ$ and its linear pair supplement is $\\widehat{yOz} = 116^\\circ$. What is the degree measure of the angle formed between their two bisectors $Ou$ and $Ov$? *(Enter ONLY the integer number, e.g. 90)*:`,
      options: null,
      correct_option_id: '90',
      explanation: 'ANSWER: 90 (The bisectors of two adjacent supplementary angles are always perpendicular: 90°).'
    },
    {
      order_index: 24,
      type: 'FILL_IN_BLANK',
      points: 0.35,
      sectionName: 'Sector 7: Uranus Deep Space • Nested Bisectors',
      content_markdown: `Given angle $\\widehat{AOB} = 84^\\circ$. Ray $OC$ is the angle bisector of $\\widehat{AOB}$. Ray $OD$ is the angle bisector of the smaller angle $\\widehat{AOC}$. Calculate the degree measure of angle $\\widehat{BOD}$. *(Enter ONLY the integer number, e.g. 63)*:`,
      options: null,
      correct_option_id: '63',
      explanation: 'ANSWER: 63 (∠AOC = ∠BOC = 42°. OD bisects ∠AOC => ∠COD = 21°. Thus ∠BOD = ∠BOC + ∠COD = 42° + 21° = 63°).'
    },

    // =========================================================================
    // SECTOR 4: DEEP SPACE MULTI-STEP PROOFS & REAL-WORLD TELEMETRY (Q25 - Q28)
    // =========================================================================
    {
      order_index: 25,
      type: 'ESSAY_UPLOAD',
      points: 0.40,
      sectionName: 'Sector 7: Uranus Deep Space • Multi-Step Proof',
      content_markdown: `### 🛰️ CELESTIAL CHALLENGE 25: INTERSECTING RAYS & OPPOSITE BISECTOR PROOF
Two telemetry lines $AB$ and $CD$ intersect at waypoint node $O$.

**Part a)** Given that $\\widehat{AOC} = 65^\\circ$, calculate the exact degree measures of all other 3 angles at node $O$: $\\widehat{AOD}, \\widehat{BOD},$ and $\\widehat{BOC}$.  
**Part b)** Draw ray $OE$ as the angle bisector of $\\widehat{AOD}$. Compute the exact measure of angle $\\widehat{COE}$.  
**Part c)** Let ray $OF$ be the opposite ray of $OE$. Prove mathematically that ray $OF$ is the angle bisector of angle $\\widehat{BOC}$.

*(Provide your step-by-step mathematical reasoning or upload your written work).*`,
      options: null,
      correct_option_id: null,
      explanation: `MODEL SOLUTION:
Part a)
- ∠BOD = ∠AOC = 65° (vertical angles).
- ∠AOD = 180° - 65° = 115° (linear pair with ∠AOC).
- ∠BOC = ∠AOD = 115° (vertical angles).

Part b)
- OE is the bisector of ∠AOD => ∠AOE = ∠EOD = 115° / 2 = 57.5°.
- Ray OA lies between OC and OE => ∠COE = ∠AOC + ∠AOE = 65° + 57.5° = 122.5°.

Part c)
- Ray OF is opposite to OE, ray OB is opposite to OA, ray OC is opposite to OD.
- Therefore, ∠BOF and ∠AOE are vertical angles => ∠BOF = ∠AOE = 57.5°.
- Similarly, ∠COF and ∠DOE are vertical angles => ∠COF = ∠DOE = 57.5°.
- Since ∠BOF = ∠COF = 57.5° and ray OF lies between OB and OC, ray OF is the angle bisector of ∠BOC.`
    },
    {
      order_index: 26,
      type: 'ESSAY_UPLOAD',
      points: 0.40,
      sectionName: 'Sector 8: Neptune Frontier • Geometric Criteria & Proofs',
      content_markdown: `### 🪐 CELESTIAL CHALLENGE 26: FORMAL CRITERIA FOR AN ANGLE BISECTOR
On the same half-plane bounded by ray $Ox$, draw two rays $Oy$ and $Oz$ such that:
$$\\widehat{xOy} = 55^\\circ, \\quad \\widehat{xOz} = 110^\\circ$$

**Part a)** Among the three rays $Ox, Oy,$ and $Oz$, which ray lies between the other two? Provide formal geometric justification using angle measures.  
**Part b)** Calculate the exact measure of angle $\\widehat{yOz}$.  
**Part c)** State the two mandatory geometric criteria required to prove a ray is an angle bisector, and verify both criteria to prove that ray $Oy$ is the angle bisector of $\\widehat{xOz}$.

*(Provide your step-by-step mathematical reasoning or upload your written work).*`,
      options: null,
      correct_option_id: null,
      explanation: `MODEL SOLUTION:
Part a)
On the same half-plane with boundary Ox, since ∠xOy < ∠xOz (55° < 110°), ray Oy lies between rays Ox and Oz.

Part b)
Since Oy lies between Ox and Oz:
∠xOy + ∠yOz = ∠xOz
55° + ∠yOz = 110° => ∠yOz = 110° - 55° = 55°.

Part c)
Two mandatory criteria:
1. Ray Oy must lie between rays Ox and Oz (Proven in Part a).
2. The two sub-angles must be equal: ∠xOy = ∠yOz = 55° (Proven in Part b).
Since both criteria are satisfied, ray Oy is formally proven to be the angle bisector of ∠xOz.`
    },
    {
      order_index: 27,
      type: 'ESSAY_UPLOAD',
      points: 0.40,
      sectionName: 'Sector 8: Neptune Frontier • Algebraic Geometry Proof',
      content_markdown: `### 🌌 CELESTIAL CHALLENGE 27: GENERALIZED PROOF OF THE PERPENDICULAR BISECTORS THEOREM
Let $\\widehat{mOn}$ and $\\widehat{nOp}$ be any arbitrary pair of adjacent supplementary angles (linear pair). Let $\\widehat{mOn} = 2\\alpha$ (where $0^\\circ < \\alpha < 90^\\circ$).

**Part a)** Write an algebraic expression for the measure of $\\widehat{nOp}$ in terms of $\\alpha$.  
**Part b)** Let ray $Ox$ be the angle bisector of $\\widehat{mOn}$, and ray $Oy$ be the angle bisector of $\\widehat{nOp}$. Express $\\widehat{xOn}$ and $\\widehat{nOy}$ in terms of $\\alpha$.  
**Part c)** Show step-by-step that:
$$\\widehat{xOy} = \\widehat{xOn} + \\widehat{nOy} = 90^\\circ$$
thereby proving that the angle between the bisectors of ANY two adjacent supplementary angles is ALWAYS a right angle ($Ox \\perp Oy$).

*(Provide your step-by-step mathematical reasoning or upload your written work).*`,
      options: null,
      correct_option_id: null,
      explanation: `MODEL SOLUTION:
Part a)
Since ∠mOn and ∠nOp form a linear pair:
∠mOn + ∠nOp = 180° => ∠nOp = 180° - ∠mOn = 180° - 2α.

Part b)
- Ray Ox bisects ∠mOn => ∠xOn = ∠mOn / 2 = (2α) / 2 = α.
- Ray Oy bisects ∠nOp => ∠nOy = ∠nOp / 2 = (180° - 2α) / 2 = 90° - α.

Part c)
Since ray On lies between Ox and Oy:
∠xOy = ∠xOn + ∠nOy = α + (90° - α) = 90°.
This confirms that ∠xOy is independent of α and is always 90° (Ox ⊥ Oy). Q.E.D.`
    },
    {
      order_index: 28,
      type: 'ESSAY_UPLOAD',
      points: 0.40,
      sectionName: 'Sector 8: Neptune Frontier • Spacecraft Mechanism Telemetry',
      content_markdown: `### 🛰️ CELESTIAL CHALLENGE 28: SPACECRAFT MECHANICS & BALANCE SENSOR CALIBRATION

**[Sector A: Spacecraft Docking Pincers]**  
A robotic satellite capture arm has two scissor-like jaws pivoting at hinge $O$. The actuator handle opening angle is measured at $36^\\circ$.  
1. What is the opening angle between the capture jaws? Name the geometric theorem that justifies your answer.  
2. What is the degree measure of the linear pair supplement of this opening angle?

**[Sector B: Inertial Balance Sensor Dial]**  
A microgravity balance sensor aboard the ISS is calibrated so that at neutral equilibrium, its indicator needle lies along the bisector of the dial angle $\\widehat{AOB} = 76^\\circ$. During a maneuvering burn, inertial force deflects the needle by $9^\\circ$ towards boundary ray $OA$.  
1. Calculate the initial equilibrium angle between the needle and ray $OA$.  
2. Calculate the new angle between the deflected needle and ray $OA$, and between the deflected needle and ray $OB$. Verify that the sum of these two new angles still equals $\\widehat{AOB}$.

*(Provide your step-by-step mathematical reasoning or upload your written work).*`,
      options: null,
      correct_option_id: null,
      explanation: `MODEL SOLUTION:
[Sector A]
1. The capture jaws and actuator handles form two intersecting straight lines at pivot O. Therefore, the opening angle between the capture jaws is equal to the handle opening angle: 36° (by the Vertical Angles Theorem).
2. The linear pair supplement is: 180° - 36° = 144°.

[Sector B]
1. At neutral equilibrium, the needle is the angle bisector of ∠AOB = 76°.
   Angle with ray OA = 76° / 2 = 38°.
2. When deflected 9° towards ray OA:
   - New angle with ray OA: 38° - 9° = 29°.
   - New angle with ray OB: 38° + 9° = 47°.
   - Verification: 29° + 47° = 76° = ∠AOB (Verified!).`
    }
  ];

  // 6. Bulk Insert Questions
  const questionsData = questionsList.map((q) => ({
    assessment_id: assessment.id,
    order_index: q.order_index,
    type: q.type,
    points: q.points,
    question_payload: {
      content_markdown: q.content_markdown,
      options: q.options,
      sectionName: q.sectionName,
      passage: null,
      explanation: q.explanation
    },
    grading_key_payload: {
      correct_option_id: q.correct_option_id,
      explanation: q.explanation
    }
  }));

  const createdQuestions = await prisma.questions.createMany({
    data: questionsData
  });
  console.log(`✓ Loaded ${createdQuestions.count} cosmic problems into Assessment.`);

  // 7. Create Daily Student Assignment for Keithley on 2026-10-29
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: keithley.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 120,
      homework_due_at: null,
      teacher_daily_note: "🚀 Welcome aboard, Astronaut Keithley! Today's mission: Master Special Angle Pairs and Angle Bisectors across the Solar System. 100% English telemetry challenge!",
      is_published: true
    }
  });
  console.log('✓ Created Daily Assignment for Keithley:', assignment.id, 'on 2026-10-29');

  // 8. Create Assessment Attempt (NOT_STARTED)
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: keithley.id,
      status: 'NOT_STARTED'
    }
  });
  console.log('✓ Created Assessment Attempt:', attempt.id, 'status: NOT_STARTED');

  console.log('\n🎉 ALL SYSTEMS GO: MISSION FULLY DEPLOYED FOR KEITHLEY LAKE ON 29/10/2026!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('❌ Error:', e);
    prisma.$disconnect();
    process.exit(1);
  });
