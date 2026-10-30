const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Orbital Chemistry Card & Lecture generation for Astronaut Thiện / Keithley Lake (30/10/2026)...');

  // 1. Identify Student, Teacher, and CHEM_9 subject
  const student = await prisma.users.findUnique({
    where: { username: 'keithley' }
  });
  if (!student) throw new Error('Student account "keithley" not found');

  const teacher = await prisma.users.findUnique({
    where: { username: 'teacher' }
  });
  if (!teacher) throw new Error('Teacher account "teacher" not found');

  const chemSubject = await prisma.subjects.findUnique({
    where: { code: 'CHEM_9' }
  });
  if (!chemSubject) throw new Error('Subject CHEM_9 not found in database');

  console.log(`✓ Student: ${student.full_name} (@${student.username})`);
  console.log(`✓ Teacher: ${teacher.full_name} (@${teacher.username})`);
  console.log(`✓ Subject: ${chemSubject.name} (${chemSubject.code})`);

  // Target Date: 2026-10-30
  const targetDate = new Date('2026-10-30T00:00:00.000Z');

  // 2. Clean up existing assignment for Keithley on 2026-10-30 if present
  const existingAsgns = await prisma.daily_student_assignments.findMany({
    where: {
      student_id: student.id,
      assigned_date: targetDate
    },
    include: {
      assessment_attempts: true
    }
  });

  if (existingAsgns.length > 0) {
    console.log(`⚠️ Found ${existingAsgns.length} existing assignment(s) on 2026-10-30. Cleaning up to re-seed fresh lecture card...`);
    for (const asgn of existingAsgns) {
      for (const att of asgn.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: asgn.id } });
    }
    console.log('✓ Cleaned up old assignments.');
  }

  // 3. Construct 100% English Space Flight Chemistry Lecture Markdown
  const lectureMarkdown = `# 🚀 Deep Space Flight Briefing: Mass & Mass Percentage in Chemical Reactions

Welcome to the **Orbital Chemical Laboratory**, Astronaut Cadet Thiện (Keithley Lake)! In this mission, we command planetary chemical reactors, analyze asteroidal metal alloys, and separate volatile hydrocarbon atmospheres using reaction stoichiometry and gas telemetry.

> **Interactive Live Studio Access:**
> You can launch the full real-time interactive lab simulation directly:
> **[/lectures/chem9-mass-percentage/index.html](/lectures/chem9-mass-percentage/index.html)**

---

## 🛰️ Station 1: Core Principles & Mole Telemetry (Understanding in 3 Minutes)

### 1. The Cosmic Metaphor: "Dual Canister Ore Cargo"
Imagine an orbital cargo canister holding a total mass of **$10\\text{ kg}$** of asteroidal alloy composed of **Metal A** and **Metal B**.
- If sensors extract **Metal A** and weigh it at **$4\\text{ kg}$**, then **Metal B** is instantaneously deduced:
  $$m_B = 10 - 4 = 6\\text{ (kg)}$$
- The mass percentage of each element in the cargo is:
  $$\\%m_A = \\frac{4}{10} \\times 100\\% = 40\\%$$
  $$\\%m_B = 100\\% - 40\\% = 60\\%$$

![Figure 1: Cosmic Cargo & Mixture Mass Breakdown](/images/chemistry/chem_module1_mass_concept.svg)

**In Deep Space Chemistry, it works identically!** A composite mixture of substances $\\text{A}$ and $\\text{B}$ is simply a dual cargo canister. To uncover the mass percentage of every component, your primary objective is to **determine the mass of one single component**; the remaining component is obtained by subtracting from total mass!

---

### 2. The Master Telemetry Formula Arsenal

#### a) Mass Percentage ($\\text{\\%}m$)
For any mixture of components $\\text{A}$ and $\\text{B}$ with total mass $m_{\\text{mix}} = m_A + m_B$:
$$\\%m_A = \\frac{m_A}{m_{\\text{mix}}} \\times 100\\%$$
$$\\%m_B = 100\\% - \\%m_A$$

#### b) Volume Percentage ($\\text{\\%}V$ - Pure Gas Telemetry)
For ideal gaseous mixtures measured at identical temperature and pressure, volume ratio directly mirrors mole ratio:
$$\\%V_A = \\frac{V_A}{V_{\\text{mix}}} \\times 100\\% = \\frac{n_A}{n_{\\text{mix}}} \\times 100\\%$$
$$\\%V_B = 100\\% - \\%V_A$$

#### c) The 3 Indispensable Mole ($n$) Conversion Bridges
1. **When Mass ($m$ in grams) is measured:**
   $$n = \\frac{m}{M} \\implies m = n \\times M$$
2. **When Standard Gas Volume ($V$ in Liters at $25^\\circ\\text{C}, 1\\text{ bar}$) is collected:**
   $$n = \\frac{V}{24.79} \\implies V = n \\times 24.79$$
3. **Molar Mass ($M$ in $\\text{g/mol}$) Flight Database:**
   - **Planetary Metals:** $\\text{Mg} = 24, \\quad \\text{Al} = 27, \\quad \\text{Fe} = 56, \\quad \\text{Zn} = 65, \\quad \\text{Cu} = 64, \\quad \\text{Ag} = 108$.
   - **Gases & Organics:** $\\text{H}_2 = 2, \\quad \\text{CH}_4 = 16, \\quad \\text{C}_2\\text{H}_4 = 28, \\quad \\text{Br}_2 = 160$.

---

## 🧪 Station 2: Type 1 - Two-Metal Alloy in Acid Solution

### 1. Tactical Principle: "The Active Reactor vs The Inert Noble Bystander"
When dropping a two-metal alloy into an acid solution (excess $\\text{HCl}$ or dilute $\\text{H}_2\\text{SO}_4$), inspect the **Electrochemical Activity Series relative to Hydrogen ($\\text{H}$)**:
- **Active Reactor (Before $\\text{H}$):** Elements like $\\text{Mg}, \\text{Al}, \\text{Zn}, \\text{Fe} \\implies$ **React vigorously** with acid to produce hydrogen gas $\\text{H}_2\\uparrow$.
- **Inert Bystander (After $\\text{H}$):** Elements like $\\text{Cu}, \\text{Ag}, \\text{Au} \\implies$ **Zero reaction**, remain completely insoluble and settle at the bottom of the reactor (*"insoluble solid residue"*).

![Figure 2: Active vs Inactive Metal Reaction Chamber](/images/chemistry/chem_module2_metal_acid_reactor.svg)

### 2. Standard 4-Step Resolution Protocol
- **Step 1 (Classification & Equation):** Identify which metal reacts. Formulate the balanced chemical equation.
- **Step 2 (Gas Telemetry):** Compute moles of escaping $\\text{H}_2$ gas via $n_{\\text{H}_2} = \\frac{V_{\\text{H}_2}}{24.79}$.
- **Step 3 (Stoichiometric Bridge):** Use mole ratios to deduce moles of the active metal, then calculate its mass ($m = n \\times M$).
- **Step 4 (Orbital Conclusion):** Subtract from total alloy mass to find the mass of the inert metal, then compute $\\%m$.

> ⚡ **Tactical Shortcut:** If telemetry reports the mass of the *"insoluble solid residue"* (e.g., $3.2\\text{ g}$ residue remaining), that value is **directly** the mass of the noble metal after Hydrogen ($\\text{Cu}$ or $\\text{Ag}$)!

---

### 3. Worked Flight Simulation Example (Type 1)

**Mission Telemetry:** $12.0\\text{ g}$ of an alloy powder containing iron ($\\text{Fe}$) and copper ($\\text{Cu}$) is dropped into excess $\\text{HCl}$. Upon reaction completion, telemetry registers $2.479\\text{ L}$ of $\\text{H}_2$ gas (standard conditions) and an insoluble solid residue. Compute the mass and mass percentage of each metal in the initial alloy. ($M_{\\text{Fe}} = 56, M_{\\text{Cu}} = 64$).

**Step-by-Step Resolution:**

* **Step 1: Classify and formulate equation**
  $\\text{Fe}$ stands before $\\text{H} \\implies$ reacts with $\\text{HCl}$. $\\text{Cu}$ sits after $\\text{H} \\implies$ no reaction.
  $$\\text{Fe} + 2\\text{HCl} \\rightarrow \\text{FeCl}_2 + \\text{H}_2\\uparrow$$

* **Step 2: Determine moles of hydrogen gas**
  $$n_{\\text{H}_2} = \\frac{V}{24.79} = \\frac{2.479}{24.79} = 0.1\\text{ (mol)}$$

* **Step 3: Deduce moles and mass of active iron ($\\text{Fe}$)**
  Stoichiometric ratio between $\\text{Fe}$ and $\\text{H}_2$ is $1 : 1$:
  $$n_{\\text{Fe}} = n_{\\text{H}_2} = 0.1\\text{ (mol)}$$
  $$m_{\\text{Fe}} = n_{\\text{Fe}} \\times M_{\\text{Fe}} = 0.1 \\times 56 = 5.6\\text{ (g)}$$

* **Step 4: Compute copper mass and percentages**
  $$m_{\\text{Cu}} = m_{\\text{mix}} - m_{\\text{Fe}} = 12.0 - 5.6 = 6.4\\text{ (g)}$$
  $$\\%m_{\\text{Fe}} = \\frac{5.6}{12.0} \\times 100\\% \\approx 46.67\\%$$
  $$\\%m_{\\text{Cu}} = 100\\% - 46.67\\% = 53.33\\%$$

---

## 🟣 Station 3: Type 2 - Hydrocarbon Separation Chamber ($\text{CH}_4 + \text{C}_2\text{H}_4$ in $\text{Br}_2$)

### 1. Tactical Principle: "The Bromine Liquid Trap Chamber"
When streaming a gaseous mixture of Methane ($\\text{CH}_4$ - Alkane) and Ethylene ($\\text{C}_2\\text{H}_4$ - Alkene) through excess liquid Bromine ($\\text{Br}_2$):
- **Ethylene ($\\text{C}_2\\text{H}_4$):** Features an unsaturated carbon-carbon double bond ($\\text{C}=\\text{C}$). Undergoes addition reaction and is **100\\% trapped** within the chamber:
  $$\\text{C}_2\\text{H}_4 + \\text{Br}_2 \\rightarrow \\text{C}_2\\text{H}_4\\text{Br}_2$$
- **Methane ($\\text{CH}_4$):** Saturated hydrocarbon with robust single bonds. **Inert to $\\text{Br}_2$ liquid**, passes cleanly through the chamber and exhausts through the exit port.

![Figure 3: Hydrocarbon Gas Trap & Absorption Bubbler](/images/chemistry/chem_module3_bromine_bubbler.svg)

### 2. The Two Golden Telemetry Indicators
1. **Indicator 1: "Chamber mass increases by $a\\text{ grams}$"**
   Since only $\\text{C}_2\\text{H}_4$ is retained, the chamber mass gain is strictly the mass of $\\text{C}_2\\text{H}_4$!
   $$\\Delta m_{\\text{chamber}} = m_{\\text{C}_2\\text{H}_4} = a\\text{ (g)} \\implies n_{\\text{C}_2\\text{H}_4} = \\frac{a}{28}$$

2. **Indicator 2: "Exit port collects $b\\text{ Liters}$ of escaping gas"**
   Because only unreacted $\\text{CH}_4$ escapes:
   $$V_{\\text{exhaust}} = V_{\\text{CH}_4} = b\\text{ (L)} \\implies n_{\\text{CH}_4} = \\frac{b}{24.79}$$

---

### 3. Worked Flight Simulation Example (Type 2)

**Mission Telemetry:** $7.437\\text{ L}$ (standard conditions) of a fuel gas mixture containing $\\text{CH}_4$ and $\\text{C}_2\\text{H}_4$ passes slowly through excess liquid $\\text{Br}_2$. Following the reaction, the $\\text{Br}_2$ chamber mass increases by $2.8\\text{ g}$.
a) Calculate the mass of each gas in the initial fuel mixture.
b) Determine mass percentage ($\\text{\\%}m$) and volume percentage ($\\text{\\%}V$) of each gas. ($M_{\\text{CH}_4} = 16, M_{\\text{C}_2\\text{H}_4} = 28$).

**Step-by-Step Resolution:**

* **Step 1: Quantify absorbed ethylene ($\\text{C}_2\\text{H}_4$)**
  $$\\text{C}_2\\text{H}_4 + \\text{Br}_2 \\rightarrow \\text{C}_2\\text{H}_4\\text{Br}_2$$
  $$m_{\\text{C}_2\\text{H}_4} = \\Delta m_{\\text{chamber}} = 2.8\\text{ (g)}$$
  $$n_{\\text{C}_2\\text{H}_4} = \\frac{2.8}{28} = 0.1\\text{ (mol)}$$

* **Step 2: Quantify escaping methane ($\\text{CH}_4$)**
  Total mixture moles:
  $$n_{\\text{mix}} = \\frac{V_{\\text{mix}}}{24.79} = \\frac{7.437}{24.79} = 0.3\\text{ (mol)}$$
  $$n_{\\text{CH}_4} = n_{\\text{mix}} - n_{\\text{C}_2\\text{H}_4} = 0.3 - 0.1 = 0.2\\text{ (mol)}$$
  $$m_{\\text{CH}_4} = n_{\\text{CH}_4} \\times M_{\\text{CH}_4} = 0.2 \\times 16 = 3.2\\text{ (g)}$$

* **Step 3: Calculate mass percentage ($\\text{\\%}m$)**
  $$m_{\\text{mix}} = m_{\\text{C}_2\\text{H}_4} + m_{\\text{CH}_4} = 2.8 + 3.2 = 6.0\\text{ (g)}$$
  $$\\%m_{\\text{C}_2\\text{H}_4} = \\frac{2.8}{6.0} \\times 100\\% \\approx 46.67\\%$$
  $$\\%m_{\\text{CH}_4} = 100\\% - 46.67\\% = 53.33\\%$$

* **Step 4: Calculate volume percentage ($\\text{\\%}V$)**
  For gases, volume fraction equals mole fraction:
  $$\\%V_{\\text{C}_2\\text{H}_4} = \\frac{n_{\\text{C}_2\\text{H}_4}}{n_{\\text{mix}}} \\times 100\\% = \\frac{0.1}{0.3} \\times 100\\% \\approx 33.33\\%$$
  $$\\%V_{\\text{CH}_4} = 100\\% - 33.33\\% = 66.67\\%$$

---

## ⚔️ Station 4: Type 3 Boss Challenge - Dual Simultaneous Reactive System

### 1. When Does This Occur?
When both metals lie **before Hydrogen** in the electrochemical series (e.g., $\\text{Mg}$ and $\\text{Fe}$, or $\\text{Zn}$ and $\\text{Al}$). Neither metal is an idle spectator—both react and both liberate $\\text{H}_2$ gas simultaneously!

![Figure 4: Dual Metal 2-Variable Equation System](/images/chemistry/chem_module4_dual_metal_matrix.svg)

### 2. Tactical Resolution: The 2-Variable System Matrix ($x, y$ Protocol)
- **Step 1:** Let $x\\text{ (mol)}$ be the moles of the first metal, and $y\\text{ (mol)}$ be the moles of the second metal ($x, y > 0$).
- **Step 2:** Formulate both chemical equations and express moles of $\\text{H}_2$ produced in terms of $x$ and $y$.
- **Step 3:** Establish a system of two algebraic equations:
  1. **Total Mass Equation:** $M_1 \\cdot x + M_2 \\cdot y = m_{\\text{mix}}$
  2. **Total Gas Mole Equation:** $c_1 \\cdot x + c_2 \\cdot y = n_{\\text{H}_2\\text{ (total)}}$
- **Step 4:** Solve for $x$ and $y$ via algebraic substitution $\\implies$ compute masses and $\\%m$.

---

### 3. Worked Boss Challenge Example (Type 3)

**Mission Telemetry:** Complete dissolution of $8.0\\text{ g}$ of an alloy consisting of magnesium ($\\text{Mg}$) and iron ($\\text{Fe}$) in excess $\\text{HCl}$ produces $4.958\\text{ L}$ of $\\text{H}_2$ gas (standard conditions). Determine the mass and mass percentage of each metal in the initial alloy. ($M_{\\text{Mg}} = 24, M_{\\text{Fe}} = 56$).

**Step-by-Step Resolution:**
- Let $n_{\\text{Mg}} = x\\text{ (mol)}$ and $n_{\\text{Fe}} = y\\text{ (mol)}$ ($x, y > 0$).
- Total moles of $\\text{H}_2$ collected:
  $$n_{\\text{H}_2} = \\frac{4.958}{24.79} = 0.2\\text{ (mol)}$$
- Balanced Chemical Equations:
  $$\\text{Mg} + 2\\text{HCl} \\rightarrow \\text{MgCl}_2 + \\text{H}_2\\uparrow \\quad (1) \\implies x\\text{ mol }\\text{H}_2$$
  $$\\text{Fe} + 2\\text{HCl} \\rightarrow \\text{FeCl}_2 + \\text{H}_2\\uparrow \\quad (2) \\implies y\\text{ mol }\\text{H}_2$$
- Formulate the 2-Variable System:
  1. Total Mass: $24x + 56y = 8.0 \\quad (*)$
  2. Total Gas: $x + y = 0.2 \\implies x = 0.2 - y \\quad (**)$
- Substitute $(**)$ into $(*)$:
  $$24(0.2 - y) + 56y = 8.0$$
  $$4.8 - 24y + 56y = 8.0$$
  $$32y = 3.2 \\implies y = 0.1\\text{ (mol of Fe)}$$
  $$\\implies x = 0.2 - 0.1 = 0.1\\text{ (mol of Mg)}$$
- Compute Masses and Mass Percentages:
  - $m_{\\text{Mg}} = 0.1 \\times 24 = 2.4\\text{ (g)} \\implies \\mathbf{\\%m_{\\text{Mg}} = \\frac{2.4}{8.0} \\times 100\\% = 30\\%}$
  - $m_{\\text{Fe}} = 0.1 \\times 56 = 5.6\\text{ (g)} \\implies \\mathbf{\\%m_{\\text{Fe}} = 100\\% - 30\\% = 70\\%}$

---

### 🛸 Summary Mission Briefing Table

| Reaction Type | Key Reactants | Golden Telemetry Clue | Algebraic Weapon |
| :--- | :--- | :--- | :--- |
| **Type 1 (Active + Noble)** | $\\text{Fe} + \\text{Cu}$ in $\\text{HCl}$ | Insoluble solid residue $= m_{\\text{noble}}$ | Stoichiometry: $n_{\\text{metal}} = n_{\\text{H}_2}$ |
| **Type 2 (Alkane + Alkene)** | $\\text{CH}_4 + \\text{C}_2\\text{H}_4$ in $\\text{Br}_2$ | Flask mass gain $= m_{\\text{C}_2\\text{H}_4}$ | Addition trap: $m = \\Delta m_{\\text{flask}}$ |
| **Type 3 (Dual Active Boss)** | $\\text{Mg} + \\text{Fe}$ in $\\text{HCl}$ | Both release gas simultaneously | 2-Variable System: $\\begin{cases} M_1 x + M_2 y = m \\\\ x + y = n_{\\text{H}_2} \\end{cases}$ |

*Telemetry verified by Flight Commander Thầy Thức. Study all orbital stations carefully!*`;

  // 4. Create Learning Unit
  const learningUnit = await prisma.learning_units.create({
    data: {
      subject_id: chemSubject.id,
      created_by: teacher.id,
      title: 'Mission 1: Mass & Mass Percentage in Chemical Reactions',
      description: 'Cosmic Chemical Laboratory: Master mass conservation, active vs inert metal-acid reactions, hydrocarbon bromine traps, and dual-reaction linear systems with real-time interactive telemetry.',
      lecture_content_markdown: lectureMarkdown,
      lecture_attachments: [
        {
          name: 'Module 1: Mixture Mass Conservation & Percentage Metaphor',
          url: '/images/chemistry/chem_module1_mass_concept.svg'
        },
        {
          name: 'Module 2: Active Metal Reactor vs Inert Solid Bystander',
          url: '/images/chemistry/chem_module2_metal_acid_reactor.svg'
        },
        {
          name: 'Module 3: Hydrocarbon Bromine Liquid Trap Chamber',
          url: '/images/chemistry/chem_module3_bromine_bubbler.svg'
        },
        {
          name: 'Module 4: Dual Metal 2-Variable System Matrix',
          url: '/images/chemistry/chem_module4_dual_metal_matrix.svg'
        }
      ],
      is_template: true
    }
  });

  console.log(`✓ Created Learning Unit "${learningUnit.title}" (ID: ${learningUnit.id})`);

  // 5. Create Daily Student Assignment Card for Today (2026-10-30)
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: student.id,
      learning_unit_id: learningUnit.id,
      assigned_by: teacher.id,
      assigned_date: targetDate,
      custom_session_minutes: 90,
      teacher_daily_note: "🚀 Welcome to the Orbital Chemistry Lab, Astronaut Thiện! Today's mission: Master Mass and Mass Percentage in chemical reactions. Explore the interactive lab and study all 4 flight stations!",
      is_published: true
    }
  });

  console.log(`✓ Successfully seeded Daily Assignment Card for Thiện on 2026-10-30! (ID: ${assignment.id})`);
  console.log('🌟 Mission card initialized with 100% English cosmic theme, KaTeX formulas, 4 vector SVGs, and interactive studio!');
}

main()
  .catch((e) => {
    console.error('❌ Error executing seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
