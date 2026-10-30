const { PrismaClient } = require('./node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Seeding 90-Minute Chemistry Practice Mission for Astronaut Thiện / Keithley Lake (30/10/2026)...');

  // 1. Fetch Student, Teacher, and CHEM_9 subject
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

  const targetDate = new Date('2026-10-30T00:00:00.000Z');

  // 2. Fetch the daily assignment on 2026-10-30
  let assignment = await prisma.daily_student_assignments.findFirst({
    where: {
      student_id: student.id,
      assigned_date: targetDate
    },
    include: {
      learning_units: true,
      assessment_attempts: true
    }
  });

  if (!assignment) {
    throw new Error('Daily assignment card for 2026-10-30 not found. Please create card first.');
  }

  console.log(`✓ Found Daily Assignment (ID: ${assignment.id}) linked to Learning Unit: "${assignment.learning_units.title}"`);

  // 3. Clean up existing assessments / attempts for this learning unit if any
  const existingAssessments = await prisma.assessments.findMany({
    where: { learning_unit_id: assignment.learning_unit_id }
  });

  for (const asmt of existingAssessments) {
    const attempts = await prisma.assessment_attempts.findMany({ where: { assessment_id: asmt.id } });
    for (const att of attempts) {
      await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
      await prisma.assessment_attempts.delete({ where: { id: att.id } });
    }
    await prisma.questions.deleteMany({ where: { assessment_id: asmt.id } });
    await prisma.assessments.delete({ where: { id: asmt.id } });
  }
  console.log('✓ Cleaned up any old assessment data for fresh mission insertion.');

  // 4. Create In-Session Assessment (90 mins, max score 10.00)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: assignment.learning_unit_id,
      type: 'IN_SESSION_90M',
      title: 'Orbital Practice Flight: Mass & Mass Percentage of Chemical Mixtures (90 mins)',
      instructions: 'Welcome to the Orbital Proving Grounds, Astronaut Cadet Thiện! Complete all 28 telemetry missions across 8 Solar System Stations. Every problem features standard 1-reactant/1-inert stoichiometry (no simultaneous reactions). Use your 2-minute chronometer to pace your calculations.',
      time_limit_minutes: 90,
      max_score: 10.00
    }
  });
  console.log(`✓ Created Assessment: "${assessment.title}" (ID: ${assessment.id})`);

  // 5. Construct 28 High-Yield 100% English Chemistry Questions
  const questionsList = [
    // -------------------------------------------------------------
    // SECTOR 1: MERCURY ORBIT • REACTION RECOGNITION (Q1 - Q4)
    // -------------------------------------------------------------
    {
      order_index: 1,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 1: Mercury Orbit • Reaction Recognition',
      content_markdown: `When dropping an asteroidal powder alloy composed of iron ($\\text{Fe}$) and copper ($\\text{Cu}$) into excess dilute hydrochloric acid ($\\text{HCl}$), which substance undergoes a chemical reaction?`,
      options: [
        { id: 'A', text: 'Both $\\text{Fe}$ and $\\text{Cu}$ react simultaneously with the acid.' },
        { id: 'B', text: 'Only iron ($\\text{Fe}$) undergoes reaction.' },
        { id: 'C', text: 'Only copper ($\\text{Cu}$) undergoes reaction.' },
        { id: 'D', text: 'Neither substance reacts with the acid solution.' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Iron (Fe) stands before Hydrogen in the electrochemical series and reacts vigorously: Fe + 2HCl → FeCl2 + H2↑. Copper (Cu) stands after Hydrogen and remains completely inert.'
    },
    {
      order_index: 2,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 1: Mercury Orbit • Selective Gas Trap',
      content_markdown: `An atmospheric gas sample containing methane ($\\text{CH}_4$) and ethylene ($\\text{C}_2\\text{H}_4$) is routed through a reaction chamber filled with excess liquid bromine ($\\text{Br}_2$). Which gas is selectively absorbed and retained inside the chamber?`,
      options: [
        { id: 'A', text: 'Only methane ($\\text{CH}_4$).' },
        { id: 'B', text: 'Only ethylene ($\\text{C}_2\\text{H}_4$).' },
        { id: 'C', text: 'Both $\\text{CH}_4$ and $\\text{C}_2\\text{H}_4$ are retained.' },
        { id: 'D', text: 'Neither gas reacts; both escape freely through the exhaust.' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Ethylene (C2H4) possesses a reactive double bond (C=C) and undergoes addition with liquid Br2 to form liquid C2H4Br2 trapped in the flask. Methane (CH4) has stable single bonds and passes out unreacted.'
    },
    {
      order_index: 3,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 1: Mercury Orbit • Mixture Mass Telemetry',
      content_markdown: `A planetary ore canister has a total mass of $20.0\\text{ g}$ containing zinc ($\\text{Zn}$) and silver ($\\text{Ag}$). Sensor telemetry determines that the mass of silver ($\\text{Ag}$) is $5.0\\text{ g}$. What is the **mass percentage** of zinc ($\\text{Zn}$) in the canister?`,
      options: [
        { id: 'A', text: '$25\\%$' },
        { id: 'B', text: '$75\\%$' },
        { id: 'C', text: '$80\\%$' },
        { id: 'D', text: '$15\\%$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: m(Zn) = 20.0 - 5.0 = 15.0 g. Therefore, %m(Zn) = (15.0 / 20.0) × 100% = 75%.'
    },
    {
      order_index: 4,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 1: Mercury Orbit • Insoluble Residue Principle',
      content_markdown: `A $10.0\\text{ g}$ sample of alloy powder containing magnesium ($\\text{Mg}$) and copper ($\\text{Cu}$) is treated with excess dilute sulfuric acid ($\\text{H}_2\\text{SO}_4$). After complete effervescence, an insoluble solid residue weighing $4.0\\text{ g}$ is recovered. What was the mass of magnesium ($\\text{Mg}$) in the initial alloy?`,
      options: [
        { id: 'A', text: '$4.0\\text{ g}$' },
        { id: 'B', text: '$6.0\\text{ g}$' },
        { id: 'C', text: '$10.0\\text{ g}$' },
        { id: 'D', text: '$14.0\\text{ g}$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Copper is located after Hydrogen in the activity series, so it does not react and forms the 4.0 g insoluble residue: m(Cu) = 4.0 g. Thus, m(Mg) = 10.0 - 4.0 = 6.0 g.'
    },

    // -------------------------------------------------------------
    // SECTOR 2: VENUS BASE • SOLID RESIDUE & CHAMBER GAIN (Q5 - Q7)
    // -------------------------------------------------------------
    {
      order_index: 5,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 2: Venus Base • Solid Residue to Percentage',
      content_markdown: `A $20.0\\text{ g}$ alloy specimen containing iron ($\\text{Fe}$) and silver ($\\text{Ag}$) is reacted with excess $\\text{HCl}$. After the reaction ceases, filtration yields $8.0\\text{ g}$ of unreacted solid residue. What is the **mass percentage** of iron ($\\text{Fe}$) in the specimen?`,
      options: [
        { id: 'A', text: '$40\\%$' },
        { id: 'B', text: '$60\\%$' },
        { id: 'C', text: '$80\\%$' },
        { id: 'D', text: '$20\\%$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Silver does not react, so m(Ag) = 8.0 g. The mass of iron is m(Fe) = 20.0 - 8.0 = 12.0 g. Thus, %m(Fe) = (12.0 / 20.0) × 100% = 60%.'
    },
    {
      order_index: 6,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 2: Venus Base • Chamber Mass Gain',
      content_markdown: `An atmospheric gas mixture of $\\text{CH}_4$ and $\\text{C}_2\\text{H}_4$ is directed into a bromine ($\\text{Br}_2$) bubbler flask. Following absorption, telemetry reports that the flask mass increased by $5.6\\text{ g}$. How many moles of ethylene ($\\text{C}_2\\text{H}_4$) were present in the gas mixture? ($M_{\\text{C}_2\\text{H}_4} = 28\\text{ g/mol}$).`,
      options: [
        { id: 'A', text: '$0.10\\text{ mol}$' },
        { id: 'B', text: '$0.20\\text{ mol}$' },
        { id: 'C', text: '$0.30\\text{ mol}$' },
        { id: 'D', text: '$0.40\\text{ mol}$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: The flask mass increase is strictly equal to the mass of trapped ethylene: m(C2H4) = 5.6 g. Therefore, n(C2H4) = 5.6 / 28 = 0.20 mol.'
    },
    {
      order_index: 7,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 2: Venus Base • Dual Fuel Fractionation',
      content_markdown: `An $8.0\\text{ g}$ sample of hydrocarbon fuel gas composed of $\\text{CH}_4$ and $\\text{C}_2\\text{H}_4$ passes through a liquid $\\text{Br}_2$ trap. The trap mass increases by $2.8\\text{ g}$. What is the **mass percentage** of unreacted methane ($\\text{CH}_4$) in the fuel mixture?`,
      options: [
        { id: 'A', text: '$35\\%$' },
        { id: 'B', text: '$65\\%$' },
        { id: 'C', text: '$28\\%$' },
        { id: 'D', text: '$72\\%$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Trapped ethylene has mass m(C2H4) = 2.8 g. The methane mass is m(CH4) = 8.0 - 2.8 = 5.2 g. Thus, %m(CH4) = (5.2 / 8.0) × 100% = 65%.'
    },

    // -------------------------------------------------------------
    // SECTOR 3: EARTH MISSION CONTROL • GAS VOLUME BRIDGES (Q8 - Q11)
    // -------------------------------------------------------------
    {
      order_index: 8,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 3: Earth Mission Control • Exhaust Gas Volume',
      content_markdown: `A $10.0\\text{ L}$ stream of gaseous fuel containing $\\text{CH}_4$ and $\\text{C}_2\\text{H}_4$ is bubbled through excess liquid $\\text{Br}_2$. Sensors at the exhaust vent collect $4.0\\text{ L}$ of unabsorbed gas (measured under identical conditions). What is the **volume percentage** ($\\text{\\%}V$) of ethylene ($\\text{C}_2\\text{H}_4$) in the initial stream?`,
      options: [
        { id: 'A', text: '$40\\%$' },
        { id: 'B', text: '$60\\%$' },
        { id: 'C', text: '$20\\%$' },
        { id: 'D', text: '$80\\%$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: The escaping gas is methane: V(CH4) = 4.0 L. The absorbed ethylene volume is V(C2H4) = 10.0 - 4.0 = 6.0 L. Thus, %V(C2H4) = (6.0 / 10.0) × 100% = 60%.'
    },
    {
      order_index: 9,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 3: Earth Mission Control • Hydrogen to Metal Mass',
      content_markdown: `An asteroidal alloy containing iron ($\\text{Fe}$) and copper ($\\text{Cu}$) is dissolved in excess dilute $\\text{HCl}$. The reaction produces $2.479\\text{ L}$ of hydrogen gas ($\\text{H}_2$) at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$). What is the mass of iron ($\\text{Fe}$) in the alloy? ($M_{\\text{Fe}} = 56\\text{ g/mol}$).`,
      options: [
        { id: 'A', text: '$2.8\\text{ g}$' },
        { id: 'B', text: '$5.6\\text{ g}$' },
        { id: 'C', text: '$11.2\\text{ g}$' },
        { id: 'D', text: '$6.4\\text{ g}$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: n(H2) = 2.479 / 24.79 = 0.10 mol. From Fe + 2HCl → FeCl2 + H2, n(Fe) = n(H2) = 0.10 mol. Thus, m(Fe) = 0.10 × 56 = 5.6 g.'
    },
    {
      order_index: 10,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 3: Earth Mission Control • Zinc-Copper Separation',
      content_markdown: `A $10.0\\text{ g}$ composite metallic sample of zinc ($\\text{Zn}$) and copper ($\\text{Cu}$) reacts completely with excess dilute $\\text{H}_2\\text{SO}_4$, evolving $2.479\\text{ L}$ of $\\text{H}_2$ gas at standard conditions. What is the **mass percentage** of copper ($\\text{Cu}$) in the composite? ($M_{\\text{Zn}} = 65, M_{\\text{Cu}} = 64$).`,
      options: [
        { id: 'A', text: '$65\\%$' },
        { id: 'B', text: '$35\\%$' },
        { id: 'C', text: '$50\\%$' },
        { id: 'D', text: '$45\\%$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: n(H2) = 2.479 / 24.79 = 0.10 mol. Zn + H2SO4 → ZnSO4 + H2, so n(Zn) = 0.10 mol => m(Zn) = 0.10 × 65 = 6.5 g. Copper mass is m(Cu) = 10.0 - 6.5 = 3.5 g. %m(Cu) = (3.5 / 10.0) × 100% = 35%.'
    },
    {
      order_index: 11,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 3: Earth Mission Control • Trivalent Aluminium Ratio',
      content_markdown: `An alloy of aluminium ($\\text{Al}$) and silver ($\\text{Ag}$) is dissolved in excess dilute $\\text{HCl}$, releasing $3.7185\\text{ L}$ of $\\text{H}_2$ gas (standard conditions). How many moles of aluminium ($\\text{Al}$) reacted? ($2\\text{Al} + 6\\text{HCl} \\rightarrow 2\\text{AlCl}_3 + 3\\text{H}_2\\uparrow$).`,
      options: [
        { id: 'A', text: '$0.15\\text{ mol}$' },
        { id: 'B', text: '$0.10\\text{ mol}$' },
        { id: 'C', text: '$0.20\\text{ mol}$' },
        { id: 'D', text: '$0.30\\text{ mol}$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: n(H2) = 3.7185 / 24.79 = 0.15 mol. By stoichiometric ratio: n(Al) = (2/3) × n(H2) = (2/3) × 0.15 = 0.10 mol.'
    },

    // -------------------------------------------------------------
    // SECTOR 4: MARS OUTPOST • TRIVALENT & EQUIMOLAR DYNAMICS (Q12 - Q15)
    // -------------------------------------------------------------
    {
      order_index: 12,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 4: Mars Outpost • Aluminium-Copper Percentage',
      content_markdown: `A $6.0\\text{ g}$ alloy specimen containing aluminium ($\\text{Al}$) and copper ($\\text{Cu}$) reacts with excess $\\text{HCl}$ to liberate $3.7185\\text{ L}$ of $\\text{H}_2$ gas (standard conditions). What is the **mass percentage** of aluminium ($\\text{Al}$) in the alloy? ($M_{\\text{Al}} = 27\\text{ g/mol}$).`,
      options: [
        { id: 'A', text: '$45\\%$' },
        { id: 'B', text: '$55\\%$' },
        { id: 'C', text: '$27\\%$' },
        { id: 'D', text: '$50\\%$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: From n(Al) = 0.10 mol, m(Al) = 0.10 × 27 = 2.7 g. Thus, %m(Al) = (2.7 / 6.0) × 100% = 45%.'
    },
    {
      order_index: 13,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 4: Mars Outpost • Bromine Mass to Alkene Mass',
      content_markdown: `A gas mixture of $\\text{CH}_4$ and $\\text{C}_2\\text{H}_4$ is bubbled into a bromine solution until $32.0\\text{ g}$ of $\\text{Br}_2$ has been completely consumed. What mass of ethylene ($\\text{C}_2\\text{H}_4$) reacted? ($M_{\\text{Br}_2} = 160\\text{ g/mol}, M_{\\text{C}_2\\text{H}_4} = 28\\text{ g/mol}$).`,
      options: [
        { id: 'A', text: '$2.8\\text{ g}$' },
        { id: 'B', text: '$5.6\\text{ g}$' },
        { id: 'C', text: '$8.4\\text{ g}$' },
        { id: 'D', text: '$1.4\\text{ g}$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: n(Br2) = 32.0 / 160 = 0.20 mol. Reaction: C2H4 + Br2 → C2H4Br2. n(C2H4) = 0.20 mol => m(C2H4) = 0.20 × 28 = 5.6 g.'
    },
    {
      order_index: 14,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 4: Mars Outpost • Equimolar Fuel Canister',
      content_markdown: `An orbital fuel canister contains $0.10\\text{ mol}$ of methane ($\\text{CH}_4$) and $0.10\\text{ mol}$ of ethylene ($\\text{C}_2\\text{H}_4$). What is the **total mass** of the fuel gas mixture?`,
      options: [
        { id: 'A', text: '$4.4\\text{ g}$' },
        { id: 'B', text: '$2.2\\text{ g}$' },
        { id: 'C', text: '$4.958\\text{ g}$' },
        { id: 'D', text: '$3.2\\text{ g}$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: m(CH4) = 0.10 × 16 = 1.6 g. m(C2H4) = 0.10 × 28 = 2.8 g. Total mass = 1.6 + 2.8 = 4.4 g.'
    },
    {
      order_index: 15,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 4: Mars Outpost • Equimolar Dynamics Comparison',
      content_markdown: `For an equimolar fuel gas mixture containing $0.10\\text{ mol}$ $\\text{CH}_4$ and $0.10\\text{ mol}$ $\\text{C}_2\\text{H}_4$, which telemetry comparison is **scientifically accurate**?`,
      options: [
        { id: 'A', text: 'Both gases have equal volume percentages ($50\\%$) and equal mass percentages ($50\\%).' },
        { id: 'B', text: 'Both gases have equal volume percentages ($50\\%$), but ethylene ($\\text{C}_2\\text{H}_4$) has a higher mass percentage than methane ($\\text{CH}_4$).' },
        { id: 'C', text: 'Methane ($\\text{CH}_4$) has a higher mass percentage than ethylene ($\\text{C}_2\\text{H}_4$).' },
        { id: 'D', text: 'The volume percentage of methane cannot be determined without knowing pressure and temperature.' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Equal moles produce equal volume fractions (50% each). However, because M(C2H4) = 28 > M(CH4) = 16, ethylene accounts for 2.8 g out of 4.4 g (63.64%), while methane is only 36.36%.'
    },

    // -------------------------------------------------------------
    // SECTOR 5: JUPITER STATION • ALLOY DISSOLUTION (Q16 - Q19)
    // -------------------------------------------------------------
    {
      order_index: 16,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 5: Jupiter Station • Magnesium in Noble Alloy',
      content_markdown: `An $8.0\\text{ g}$ alloy specimen containing magnesium ($\\text{Mg}$) and an unknown noble metal ($\\text{M}$, located after Hydrogen) is dissolved in excess dilute $\\text{HCl}$, releasing $4.958\\text{ L}$ of $\\text{H}_2$ gas at standard conditions. What is the **mass percentage** of magnesium ($\\text{Mg}$) in the alloy? ($M_{\\text{Mg}} = 24\\text{ g/mol}$).`,
      options: [
        { id: 'A', text: '$30\\%$' },
        { id: 'B', text: '$60\\%$' },
        { id: 'C', text: '$40\\%$' },
        { id: 'D', text: '$70\\%$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: n(H2) = 4.958 / 24.79 = 0.20 mol => n(Mg) = 0.20 mol => m(Mg) = 0.20 × 24 = 4.8 g. Thus, %m(Mg) = (4.8 / 8.0) × 100% = 60%.'
    },
    {
      order_index: 17,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 5: Jupiter Station • Gas Split to Flask Mass Gain',
      content_markdown: `A $4.958\\text{ L}$ (standard conditions) atmospheric mixture of $\\text{CH}_4$ and $\\text{C}_2\\text{H}_4$ is routed through liquid $\\text{Br}_2$. Sensors detect that $2.479\\text{ L}$ of unabsorbed gas escapes through the exhaust. By how many grams did the mass of the bromine liquid chamber increase? ($M_{\\text{C}_2\\text{H}_4} = 28\\text{ g/mol}$).`,
      options: [
        { id: 'A', text: '$1.6\\text{ g}$' },
        { id: 'B', text: '$2.8\\text{ g}$' },
        { id: 'C', text: '$4.4\\text{ g}$' },
        { id: 'D', text: '$5.6\\text{ g}$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Total moles = 4.958 / 24.79 = 0.20 mol. Escaping methane = 2.479 / 24.79 = 0.10 mol. Trapped ethylene = 0.20 - 0.10 = 0.10 mol. Mass gain = 0.10 × 28 = 2.8 g.'
    },
    {
      order_index: 18,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 5: Jupiter Station • Reconstructing Initial Alloy Mass',
      content_markdown: `A planetary alloy containing iron ($\\text{Fe}$) and copper ($\\text{Cu}$) is reacted with excess $\\text{HCl}$. The process generates $2.479\\text{ L}$ of $\\text{H}_2$ gas (standard conditions) and leaves $4.4\\text{ g}$ of insoluble solid residue. What was the **total mass** of the initial alloy?`,
      options: [
        { id: 'A', text: '$5.6\\text{ g}$' },
        { id: 'B', text: '$8.8\\text{ g}$' },
        { id: 'C', text: '$10.0\\text{ g}$' },
        { id: 'D', text: '$12.0\\text{ g}$' }
      ],
      correct_option_id: 'C',
      explanation: 'ANSWER C: n(Fe) = n(H2) = 0.10 mol => m(Fe) = 0.10 × 56 = 5.6 g. Insoluble residue m(Cu) = 4.4 g. Total mass = 5.6 + 4.4 = 10.0 g.'
    },
    {
      order_index: 19,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 5: Jupiter Station • Propylene Alkene Trap',
      content_markdown: `An extraterrestrial gas mixture containing methane ($\\text{CH}_4$) and propylene ($\\text{C}_3\\text{H}_6$, an alkene with $M = 42\\text{ g/mol}$) is bubbled through a $\\text{Br}_2$ chamber. The reaction consumes $16.0\\text{ g}$ of $\\text{Br}_2$, and $4.958\\text{ L}$ of unreacted gas (standard conditions) escapes. What is the **mass percentage** of propylene ($\\text{C}_3\\text{H}_6$) in the mixture?`,
      options: [
        { id: 'A', text: '$50.00\\%$' },
        { id: 'B', text: '$56.76\\%$' },
        { id: 'C', text: '$43.24\\%$' },
        { id: 'D', text: '$62.50\\%$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: n(C3H6) = n(Br2) = 16.0 / 160 = 0.10 mol => m(C3H6) = 0.10 × 42 = 4.2 g. Escaping methane: n(CH4) = 4.958 / 24.79 = 0.20 mol => m(CH4) = 0.20 × 16 = 3.2 g. Total mass = 4.2 + 3.2 = 7.4 g => %m(C3H6) = (4.2 / 7.4) × 100% ≈ 56.76%.'
    },

    // -------------------------------------------------------------
    // SECTOR 6: SATURN RINGS • PROTOCOL STEP ANALYSIS (Q20 - Q23)
    // -------------------------------------------------------------
    {
      order_index: 20,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 6: Saturn Rings • Protocol Analysis: Zn + Cu Alloy',
      content_markdown: `**Telemetry Evaluation:** Consider the dissolution of $10.0\\text{ g}$ of zinc ($\\text{Zn}$) and copper ($\\text{Cu}$) alloy in excess dilute $\\text{HCl}$ producing $2.479\\text{ L}$ of $\\text{H}_2$ gas (standard conditions). An engineer asserts: *"Both zinc and copper react to produce hydrogen, and copper accounts for $65\\%$ of the total mass."* Which evaluation is correct?`,
      options: [
        { id: 'A', text: 'The assertion is completely correct.' },
        { id: 'B', text: 'Incorrect: Only zinc reacts ($m_{\\text{Zn}} = 6.5\\text{ g}$), so zinc is $65\\%$, and copper is $35\\%$.' },
        { id: 'C', text: 'Incorrect: Copper reacts while zinc forms the insoluble residue.' },
        { id: 'D', text: 'Incorrect: Both metals react but copper makes up $50\\%$.' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Copper is after Hydrogen and does not react. Zinc reacts: n(Zn) = 0.10 mol => m(Zn) = 6.5 g (65%). Unreacted copper is 10.0 - 6.5 = 3.5 g (35%).'
    },
    {
      order_index: 21,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 6: Saturn Rings • Protocol Analysis: Al + Ag Alloy',
      content_markdown: `**Telemetry Evaluation:** A $16.2\\text{ g}$ alloy of aluminium ($\\text{Al}$) and silver ($\\text{Ag}$) dissolves in excess dilute $\\text{H}_2\\text{SO}_4$, evolving $7.437\\text{ L}$ of $\\text{H}_2$ gas (standard conditions). What are the correct stoichiometric moles and mass percentage of silver ($\\text{Ag}$)? ($2\\text{Al} + 3\\text{H}_2\\text{SO}_4 \\rightarrow \\text{Al}_2(\\text{SO}_4)_3 + 3\\text{H}_2\\uparrow$).`,
      options: [
        { id: 'A', text: '$n_{\\text{Al}} = 0.30\\text{ mol}, \\quad \\%m_{\\text{Ag}} = 50.00\\%$' },
        { id: 'B', text: '$n_{\\text{Al}} = 0.20\\text{ mol}, \\quad \\%m_{\\text{Ag}} \\approx 66.67\\%$' },
        { id: 'C', text: '$n_{\\text{Al}} = 0.20\\text{ mol}, \\quad \\%m_{\\text{Ag}} \\approx 33.33\\%$' },
        { id: 'D', text: '$n_{\\text{Al}} = 0.15\\text{ mol}, \\quad \\%m_{\\text{Ag}} = 75.00\\%$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: n(H2) = 7.437 / 24.79 = 0.30 mol. Stoichiometric ratio gives n(Al) = (2/3) × 0.30 = 0.20 mol => m(Al) = 0.20 × 27 = 5.4 g. m(Ag) = 16.2 - 5.4 = 10.8 g => %m(Ag) = (10.8 / 16.2) × 100% ≈ 66.67%.'
    },
    {
      order_index: 22,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 6: Saturn Rings • Protocol Analysis: Gas Trap Chamber Gain',
      content_markdown: `**Telemetry Evaluation:** A $9.916\\text{ L}$ (standard conditions) hydrocarbon fuel mixture ($\\text{CH}_4 + \\text{C}_2\\text{H}_4$) passes through liquid $\\text{Br}_2$. The flask mass increases by $5.6\\text{ g}$. Which breakdown of moles and mass percentage of ethylene ($\\text{C}_2\\text{H}_4$) is correct?`,
      options: [
        { id: 'A', text: '$n_{\\text{C}_2\\text{H}_4} = 0.20\\text{ mol}, \\quad n_{\\text{CH}_4} = 0.20\\text{ mol}, \\quad \\%m_{\\text{C}_2\\text{H}_4} \\approx 63.64\\%$' },
        { id: 'B', text: '$n_{\\text{C}_2\\text{H}_4} = 0.40\\text{ mol}, \\quad n_{\\text{CH}_4} = 0.00\\text{ mol}, \\quad \\%m_{\\text{C}_2\\text{H}_4} = 100\\%$' },
        { id: 'C', text: '$n_{\\text{C}_2\\text{H}_4} = 0.10\\text{ mol}, \\quad n_{\\text{CH}_4} = 0.30\\text{ mol}, \\quad \\%m_{\\text{C}_2\\text{H}_4} = 50.00\\%$' },
        { id: 'D', text: '$n_{\\text{C}_2\\text{H}_4} = 0.20\\text{ mol}, \\quad n_{\\text{CH}_4} = 0.20\\text{ mol}, \\quad \\%m_{\\text{C}_2\\text{H}_4} = 50.00\\%$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: Total moles = 9.916 / 24.79 = 0.40 mol. m(C2H4) = 5.6 g => n(C2H4) = 0.20 mol. n(CH4) = 0.40 - 0.20 = 0.20 mol => m(CH4) = 3.2 g. %m(C2H4) = (5.6 / 8.8) × 100% ≈ 63.64%.'
    },
    {
      order_index: 23,
      type: 'MULTIPLE_CHOICE',
      points: 0.35,
      sectionName: 'Sector 6: Saturn Rings • Protocol Analysis: Volume vs Mass Percentage',
      content_markdown: `**Telemetry Evaluation:** A $10.8\\text{ g}$ gas mixture of $\\text{CH}_4$ and $\\text{C}_2\\text{H}_4$ completely decolors a solution containing $48.0\\text{ g}$ of $\\text{Br}_2$. An automated report states: *"The volume percentage ($\\text{\\%}V$) of methane is $22.22\\%$."* Why is this report flawed?`,
      options: [
        { id: 'A', text: 'Methane reacts with bromine, so no volume percentage exists.' },
        { id: 'B', text: '$22.22\\%$ is the mass percentage ($\\text{\\%}m$) of methane ($m_{\\text{CH}_4} = 2.4\\text{ g}$); its volume percentage based on moles ($0.15\\text{ mol}$) is actually $33.33\\%$.' },
        { id: 'C', text: 'The mass of ethylene is $2.4\\text{ g}$, not $8.4\\text{ g}$.' },
        { id: 'D', text: 'The reaction requires heat and cannot occur at room temperature.' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: n(Br2) = 48.0 / 160 = 0.30 mol => m(C2H4) = 0.30 × 28 = 8.4 g. m(CH4) = 10.8 - 8.4 = 2.4 g => %m(CH4) = (2.4 / 10.8) × 100% = 22.22%. But volume fraction depends on moles: n(CH4) = 2.4 / 16 = 0.15 mol => %V(CH4) = (0.15 / 0.45) × 100% = 33.33%.'
    },

    // -------------------------------------------------------------
    // SECTOR 7: URANUS DEEP SPACE • QUANTITATIVE MISSIONS (Q24 - Q26)
    // -------------------------------------------------------------
    {
      order_index: 24,
      type: 'MULTIPLE_CHOICE',
      points: 0.40,
      sectionName: 'Sector 7: Uranus Deep Space • Quantitative Mission: Iron-Copper Alloy',
      content_markdown: `An alloy specimen weighing $20.0\\text{ g}$ composed of iron ($\\text{Fe}$) and copper ($\\text{Cu}$) is reacted with excess $\\text{HCl}$. The reaction yields $4.958\\text{ L}$ of $\\text{H}_2$ gas (standard conditions) and unreacted copper residue. Determine the masses ($m_{\\text{Fe}}, m_{\\text{Cu}}$) and mass percentage ($\\%m_{\\text{Fe}}$).`,
      options: [
        { id: 'A', text: '$m_{\\text{Fe}} = 11.2\\text{ g}, \\quad m_{\\text{Cu}} = 8.8\\text{ g}, \\quad \\%m_{\\text{Fe}} = 56\\%$' },
        { id: 'B', text: '$m_{\\text{Fe}} = 5.6\\text{ g}, \\quad m_{\\text{Cu}} = 14.4\\text{ g}, \\quad \\%m_{\\text{Fe}} = 28\\%$' },
        { id: 'C', text: '$m_{\\text{Fe}} = 10.0\\text{ g}, \\quad m_{\\text{Cu}} = 10.0\\text{ g}, \\quad \\%m_{\\text{Fe}} = 50\\%$' },
        { id: 'D', text: '$m_{\\text{Fe}} = 8.8\\text{ g}, \\quad m_{\\text{Cu}} = 11.2\\text{ g}, \\quad \\%m_{\\text{Fe}} = 44\\%$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: n(H2) = 4.958 / 24.79 = 0.20 mol => n(Fe) = 0.20 mol => m(Fe) = 0.20 × 56 = 11.2 g. Residue m(Cu) = 20.0 - 11.2 = 8.8 g. %m(Fe) = (11.2 / 20.0) × 100% = 56%.'
    },
    {
      order_index: 25,
      type: 'MULTIPLE_CHOICE',
      points: 0.40,
      sectionName: 'Sector 7: Uranus Deep Space • Anhydrous Salt Telemetry',
      content_markdown: `A $10.0\\text{ g}$ sample containing magnesium ($\\text{Mg}$) and silver ($\\text{Ag}$) reacts completely with excess dilute $\\text{H}_2\\text{SO}_4$, producing $3.7185\\text{ L}$ of $\\text{H}_2$ gas (standard conditions). If the filtered solution is evaporated to dryness, what mass of anhydrous magnesium sulfate ($\\text{MgSO}_4$) salt is obtained? ($M_{\\text{MgSO}_4} = 120\\text{ g/mol}$).`,
      options: [
        { id: 'A', text: '$12.0\\text{ g}$' },
        { id: 'B', text: '$18.0\\text{ g}$' },
        { id: 'C', text: '$24.0\\text{ g}$' },
        { id: 'D', text: '$9.0\\text{ g}$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Mg + H2SO4 → MgSO4 + H2. n(H2) = 3.7185 / 24.79 = 0.15 mol => n(MgSO4) = 0.15 mol. Thus, m(MgSO4) = 0.15 × 120 = 18.0 g.'
    },
    {
      order_index: 26,
      type: 'MULTIPLE_CHOICE',
      points: 0.40,
      sectionName: 'Sector 7: Uranus Deep Space • Trivalent Reconstitution',
      content_markdown: `A powder mixture of aluminium ($\\text{Al}$) and copper ($\\text{Cu}$) is treated with excess $\\text{HCl}$. The process produces $7.437\\text{ L}$ of $\\text{H}_2$ gas (standard conditions) and leaves $4.6\\text{ g}$ of insoluble copper. What was the **total mass** of the initial mixture, and what is the mass percentage of aluminium ($\\%m_{\\text{Al}}$)?`,
      options: [
        { id: 'A', text: '$m_{\\text{tot}} = 10.0\\text{ g}, \\quad \\%m_{\\text{Al}} = 54\\%$' },
        { id: 'B', text: '$m_{\\text{tot}} = 12.0\\text{ g}, \\quad \\%m_{\\text{Al}} = 45\\%$' },
        { id: 'C', text: '$m_{\\text{tot}} = 8.0\\text{ g}, \\quad \\%m_{\\text{Al}} = 60\\%$' },
        { id: 'D', text: '$m_{\\text{tot}} = 10.0\\text{ g}, \\quad \\%m_{\\text{Al}} = 46\\%$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: n(H2) = 7.437 / 24.79 = 0.30 mol => n(Al) = (2/3) × 0.30 = 0.20 mol => m(Al) = 0.20 × 27 = 5.4 g. Total mass = 5.4 + 4.6 = 10.0 g. %m(Al) = (5.4 / 10.0) × 100% = 54%.'
    },

    // -------------------------------------------------------------
    // SECTOR 8: NEPTUNE FRONTIER • PLANETARY GAS FRACTIONATION (Q27 - Q28)
    // -------------------------------------------------------------
    {
      order_index: 27,
      type: 'MULTIPLE_CHOICE',
      points: 0.40,
      sectionName: 'Sector 8: Neptune Frontier • Deep Space Gas Fractionation',
      content_markdown: `A $12.395\\text{ L}$ (standard conditions) stream of fuel gas containing methane ($\\text{CH}_4$) and ethylene ($\\text{C}_2\\text{H}_4$) is scrubbed through a $\\text{Br}_2$ absorption chamber. The chamber mass increases by $8.4\\text{ g}$. What are the volume percentage ($\\text{\\%}V$) and mass percentage ($\\text{\\%}m$) of ethylene ($\\text{C}_2\\text{H}_4$)?`,
      options: [
        { id: 'A', text: '$\\text{\\%}V = 60.00\\%, \\quad \\text{\\%}m \\approx 72.41\\%$' },
        { id: 'B', text: '$\\text{\\%}V = 40.00\\%, \\quad \\text{\\%}m \\approx 27.59\\%$' },
        { id: 'C', text: '$\\text{\\%}V = 50.00\\%, \\quad \\text{\\%}m = 50.00\\%$' },
        { id: 'D', text: '$\\text{\\%}V = 60.00\\%, \\quad \\text{\\%}m = 60.00\\%$' }
      ],
      correct_option_id: 'A',
      explanation: 'ANSWER A: Total moles = 12.395 / 24.79 = 0.50 mol. m(C2H4) = 8.4 g => n(C2H4) = 0.30 mol. %V = (0.30 / 0.50) × 100% = 60%. n(CH4) = 0.20 mol => m(CH4) = 3.2 g. Total mass = 8.4 + 3.2 = 11.6 g => %m(C2H4) = (8.4 / 11.6) × 100% ≈ 72.41%.'
    },
    {
      order_index: 28,
      type: 'MULTIPLE_CHOICE',
      points: 0.40,
      sectionName: 'Sector 8: Neptune Frontier • Dual-Phase Planetary Gas Cycle',
      content_markdown: `A $7.437\\text{ L}$ (standard conditions) mixture of $\\text{CH}_4$ and $\\text{C}_2\\text{H}_4$ passes through liquid $\\text{Br}_2$, causing a mass gain of $5.6\\text{ g}$. The entire volume of escaping gas is subsequently burned completely in excess oxygen: $\\text{CH}_4 + 2\\text{O}_2 \\xrightarrow{t^\\circ} \\text{CO}_2 + 2\\text{H}_2\\text{O}$. What volume of $\\text{CO}_2$ gas (at standard conditions) is produced?`,
      options: [
        { id: 'A', text: '$1.2395\\text{ L}$' },
        { id: 'B', text: '$2.479\\text{ L}$' },
        { id: 'C', text: '$4.958\\text{ L}$' },
        { id: 'D', text: '$3.7185\\text{ L}$' }
      ],
      correct_option_id: 'B',
      explanation: 'ANSWER B: Total moles = 7.437 / 24.79 = 0.30 mol. Trapped ethylene: m(C2H4) = 5.6 g => n(C2H4) = 0.20 mol. Escaping methane: n(CH4) = 0.30 - 0.20 = 0.10 mol. Combustion of 0.10 mol CH4 yields 0.10 mol CO2. V(CO2) = 0.10 × 24.79 = 2.479 L.'
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

  // 7. Update Daily Assignment Card note and custom session minutes
  await prisma.daily_student_assignments.update({
    where: { id: assignment.id },
    data: {
      custom_session_minutes: 90,
      teacher_daily_note: "🚀 Flight Telemetry Engaged! Welcome to your 90-minute In-Session Practice, Astronaut Thiện! 28 problems across 8 planetary sectors. No simultaneous reactions—just clean stoichiometry. Give it your best!"
    }
  });

  // 8. Create Assessment Attempt (NOT_STARTED)
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: student.id,
      status: 'NOT_STARTED'
    }
  });
  console.log(`✓ Initialized Assessment Attempt (ID: ${attempt.id}, status: NOT_STARTED)`);

  console.log('\n🎉 ALL SYSTEMS GO: 90-MINUTE PRACTICE MISSION FULLY DEPLOYED FOR THIỆN / KEITHLEY LAKE ON 30/10/2026!');
}

main()
  .catch((e) => {
    console.error('❌ Error executing seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
