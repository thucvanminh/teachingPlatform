const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake
  SUBJECT_ID: '6fc7387b-13b8-4e27-8240-a60c03dc1d51', // CHEM_9
  ASSIGNED_DATE: '2026-11-10'
};

const QUESTIONS_DATA = [
  // =========================================================================
  // SECTOR 1: MERCURY ORBIT • MOLECULAR BLUEPRINT & IDENTIFICATION (THEORY Q1 – Q3)
  // =========================================================================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 1: Mercury Orbit • Carboxyl Functional Group',
    content_markdown: 'Astronaut Cadet Keithley analyzes a molecular sample of an organic compound with formula $\\text{C}_2\\text{H}_4\\text{O}_2$. Which functional group in the acetic acid molecule ($\\text{CH}_3\\text{COOH}$) is responsible for its characteristic acidic behavior and why?',
    options: [
      { id: 'A', text: 'The methyl group ($-\\text{CH}_3$) because non-polar carbon-hydrogen bonds easily release protons in water.' },
      { id: 'B', text: 'The carboxyl group ($-\\text{COOH}$) because the strongly electronegative carbonyl oxygen weakens the $\\text{O}-\\text{H}$ bond, allowing $\\text{H}^+$ to ionize.' },
      { id: 'C', text: 'The ether bridge ($-\\text{O}-$) because it attracts alkali metal ions.' },
      { id: 'D', text: 'The hydroxyl group ($-\\text{OH}$) acting independently like in ethanol.' }
    ],
    correct_option_id: 'B',
    explanation: 'The carboxyl group ($-\\text{COOH}$) combines a carbonyl group ($>\\text{C}=\\text{O}$) and a hydroxyl group ($-\\text{OH}$). The polar carbonyl group draws electron density away from the $\\text{O}-\\text{H}$ bond, enabling the hydrogen atom to ionize as a free proton ($\\text{H}^+$) in aqueous solution.'
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 1: Mercury Orbit • Glacial Acetic Acid Properties',
    content_markdown: 'Space station telemetry from an unheated storage module logs an ambient temperature of $12^\\circ\\text{C}$. A container of pure ($>99.5\\%$) water-free acetic acid has completely solidified into transparent, icicle-like crystals. What is this form of acetic acid called, and what is its standard freezing/melting point?',
    options: [
      { id: 'A', text: 'Dry acetic acid, melting at $0.0^\\circ\\text{C}$.' },
      { id: 'B', text: 'Glacial acetic acid, melting at $16.6^\\circ\\text{C}$.' },
      { id: 'C', text: 'Cryogenic vinegar, melting at $-11.5^\\circ\\text{C}$.' },
      { id: 'D', text: 'Supercooled ethanoate, melting at $78.3^\\circ\\text{C}$.' }
    ],
    correct_option_id: 'B',
    explanation: 'Pure, water-free acetic acid solidifies into ice-like crystalline sheets at $16.6^\\circ\\text{C}$ (just below typical room temperature), which is why it is historically and scientifically called "glacial acetic acid".'
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 1: Mercury Orbit • Chemical Differentiation Test',
    content_markdown: 'Sensors detect two unlabeled reagent bottles in the laboratory: Bottle X contains pure ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$), and Bottle Y contains pure acetic acid ($\\text{CH}_3\\text{COOH}$). Which chemical reagent can be added to distinguish Bottle Y from Bottle X by producing visible effervescence in ONLY ONE bottle?',
    options: [
      { id: 'A', text: 'Solid sodium carbonate ($\\text{Na}_2\\text{CO}_3$)' },
      { id: 'B', text: 'Metallic sodium ($\\text{Na}$)' },
      { id: 'C', text: 'Pure oxygen gas ($\\text{O}_2$) with an ignition spark' },
      { id: 'D', text: 'Universal solvent water ($\\text{H}_2\\text{O}$)' }
    ],
    correct_option_id: 'A',
    explanation: 'Both ethanol and acetic acid react with active sodium metal ($\\text{Na}$) to release $\\text{H}_2$ gas. However, only acetic acid (being an acid) reacts with carbonate salts like $\\text{Na}_2\\text{CO}_3$ to release effervescent $\\text{CO}_2$ gas ($2\\text{CH}_3\\text{COOH} + \\text{Na}_2\\text{CO}_3 \\to 2\\text{CH}_3\\text{COONa} + \\text{CO}_2\\uparrow + \\text{H}_2\\text{O}$). Ethanol does not react with carbonates.'
  },

  // =========================================================================
  // SECTOR 2: VENUS BASE • ESTERIFICATION & BIOCHEMICAL FERMENTATION (THEORY Q4 – Q5)
  // =========================================================================
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 2: Venus Base • Esterification Catalyst Telemetry',
    content_markdown: 'In the synthesis of ethyl acetate inside the orbital organic reactor: $$\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\underset{t^\\circ}{\\overset{\\text{conc. } \\text{H}_2\\text{SO}_4}{\\rightleftharpoons}} \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}$$ What are the two vital functions performed by concentrated sulfuric acid ($\\text{H}_2\\text{SO}_4$) in this reaction?',
    options: [
      { id: 'A', text: 'It oxidizes ethanol and acts as a non-polar solvent.' },
      { id: 'B', text: 'It neutralizes acetic acid and precipitates ethyl acetate.' },
      { id: 'C', text: 'It acts as an acid catalyst and a hygroscopic dehydrating agent that absorbs water to shift the equilibrium forward.' },
      { id: 'D', text: 'It cools the reaction down and turns the mixture into an indicator.' }
    ],
    correct_option_id: 'C',
    explanation: 'Concentrated $\\text{H}_2\\text{SO}_4$ provides $\\text{H}^+$ ions to catalyze the reversible reaction, and its powerful affinity for water removes $\\text{H}_2\\text{O}$ from the mixture, driving Le Chatelier\'s equilibrium toward higher ester yield.'
  },
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 2: Venus Base • Aerobic Vinegar Fermentation',
    content_markdown: 'Orbital life support synthesizes culinary vinegar from dilute ethylic alcohol solution. Which biological agent and reaction conditions are required for this biological fermentation?',
    options: [
      { id: 'A', text: 'Yeast fungi (*Saccharomyces*) under strictly anaerobic (oxygen-free) conditions at $80^\\circ\\text{C}$.' },
      { id: 'B', text: 'Acetic acid bacteria (*Acetobacter*) in the presence of atmospheric oxygen ($\\text{O}_2$) at $25^\\circ - 30^\\circ\\text{C}$.' },
      { id: 'C', text: 'Lactic bacteria (*Lactobacillus*) in concentrated ethanol solution ($>50^\\circ\\text{ ABV}$).' },
      { id: 'D', text: 'Methanogenic archaea under high pressure in pure nitrogen.' }
    ],
    correct_option_id: 'B',
    explanation: 'Vinegar fermentation is an aerobic biological oxidation: $\\text{C}_2\\text{H}_5\\text{OH} + \\text{O}_2 \\xrightarrow{\\text{Acetobacter}} \\text{CH}_3\\text{COOH} + \\text{H}_2\\text{O}$, carried out by *Acetobacter* bacteria in warm, oxygen-rich conditions ($25-30^\\circ\\text{C}$) on dilute alcohol ($8-10\\%$).'
  },

  // =========================================================================
  // SECTOR 3: EARTH MISSION CONTROL • MASS PERCENTAGE & VINEGAR DENSITY (CALC Q6 – Q8)
  // =========================================================================
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 3: Earth Control • Elemental Mass Percentage',
    content_markdown: 'Acetic acid has the molecular formula $\\text{C}_2\\text{H}_4\\text{O}_2$ (Atomic masses: $\\text{C} = 12, \\text{H} = 1, \\text{O} = 16\\text{ g/mol}$). What is the percentage by mass of oxygen ($\\text{\\%O}$) in pure acetic acid?',
    options: [
      { id: 'A', text: '$40.00\\%$' },
      { id: 'B', text: '$53.33\\%$' },
      { id: 'C', text: '$46.67\\%$' },
      { id: 'D', text: '$60.00\\%$' }
    ],
    correct_option_id: 'B',
    explanation: 'Molar mass: $M = 2 \\times 12 + 4 \\times 1 + 2 \\times 16 = 60\\text{ g/mol}$. Mass percentage of oxygen: $\\%\\text{O} = \\frac{32}{60} \\times 100\\% = 53.33\\%$.'
  },
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 3: Earth Control • Moles in Vinegar Solution',
    content_markdown: 'An astronaut prepares $600\\text{ g}$ of table vinegar solution with an acetic acid concentration of $4.5\\%$ by mass. How many moles of pure acetic acid ($\\text{CH}_3\\text{COOH}$, $M = 60\\text{ g/mol}$) are dissolved in this vinegar bottle?',
    options: [
      { id: 'A', text: '$0.30\\text{ mol}$' },
      { id: 'B', text: '$0.45\\text{ mol}$' },
      { id: 'C', text: '$0.60\\text{ mol}$' },
      { id: 'D', text: '$0.75\\text{ mol}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Mass of pure acetic acid: $m = 600 \\times \\frac{4.5}{100} = 27.0\\text{ g}$. Number of moles: $n = \\frac{m}{M} = \\frac{27.0}{60} = 0.45\\text{ mol}$.'
  },
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 3: Earth Control • Glacial Liquid Volume & Density',
    content_markdown: 'A laboratory procedure requires exactly $0.70\\text{ mol}$ of pure glacial acetic acid ($\\text{CH}_3\\text{COOH}$, $M = 60\\text{ g/mol}$). Given that the density of pure acetic acid is $D = 1.05\\text{ g/mL}$, what volume of glacial acetic acid should be measured in a graduated cylinder?',
    options: [
      { id: 'A', text: '$35.0\\text{ mL}$' },
      { id: 'B', text: '$40.0\\text{ mL}$' },
      { id: 'C', text: '$44.1\\text{ mL}$' },
      { id: 'D', text: '$50.0\\text{ mL}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Mass required: $m = n \\times M = 0.70 \\times 60 = 42.0\\text{ g}$. Volume to measure: $V = \\frac{m}{D} = \\frac{42.0}{1.05} = 40.0\\text{ mL}$.'
  },

  // =========================================================================
  // SECTOR 4: MARS OUTPOST • ACTIVE METAL DISPLACEMENT REACTIONS (CALC Q9 – Q11)
  // =========================================================================
  {
    order_index: 9,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 4: Mars Outpost • Magnesium Displacement & Gas Yield',
    content_markdown: 'An astronaut drops $4.8\\text{ g}$ of pure magnesium ribbon ($\\text{Mg}$, atomic mass $24\\text{ g/mol}$) into an excess solution of acetic acid: $$2\\text{CH}_3\\text{COOH} + \\text{Mg} \\to (\\text{CH}_3\\text{COO})_2\\text{Mg} + \\text{H}_2\\uparrow$$ Calculate the volume of hydrogen gas ($\\text{H}_2$) released at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, where $V_m = 24.79\\text{ L/mol}$).',
    options: [
      { id: 'A', text: '$2.479\\text{ L}$' },
      { id: 'B', text: '$4.958\\text{ L}$' },
      { id: 'C', text: '$9.916\\text{ L}$' },
      { id: 'D', text: '$3.718\\text{ L}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Moles of $\\text{Mg}$: $n_{\\text{Mg}} = \\frac{4.8}{24} = 0.20\\text{ mol}$. According to the equation, $n_{\\text{H}_2} = n_{\\text{Mg}} = 0.20\\text{ mol}$. Volume of $\\text{H}_2$: $V = 0.20 \\times 24.79 = 4.958\\text{ L}$.'
  },
  {
    order_index: 10,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 4: Mars Outpost • Zinc Acetate Salt Formation',
    content_markdown: 'An excess of acetic acid reacts completely with $13.0\\text{ g}$ of pure zinc granules ($\\text{Zn}$, atomic mass $65\\text{ g/mol}$): $$2\\text{CH}_3\\text{COOH} + \\text{Zn} \\to (\\text{CH}_3\\text{COO})_2\\text{Zn} + \\text{H}_2\\uparrow$$ What is the mass of zinc acetate ($(\\text{CH}_3\\text{COO})_2\\text{Zn}$, molar mass $183\\text{ g/mol}$) produced?',
    options: [
      { id: 'A', text: '$18.3\\text{ g}$' },
      { id: 'B', text: '$24.8\\text{ g}$' },
      { id: 'C', text: '$36.6\\text{ g}$' },
      { id: 'D', text: '$42.2\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Moles of $\\text{Zn}$: $n_{\\text{Zn}} = \\frac{13.0}{65} = 0.20\\text{ mol}$. Ratio is $1:1$, so $n_{\\text{salt}} = 0.20\\text{ mol}$. Mass of zinc acetate: $m = 0.20 \\times 183 = 36.6\\text{ g}$.'
  },
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 4: Mars Outpost • Aluminum Displacement Stoichiometry',
    content_markdown: 'Aluminum powder reacts with acetic acid according to: $$6\\text{CH}_3\\text{COOH} + 2\\text{Al} \\to 2(\\text{CH}_3\\text{COO})_3\\text{Al} + 3\\text{H}_2\\uparrow$$ If $5.4\\text{ g}$ of aluminum powder ($\\text{Al}$, atomic mass $27\\text{ g/mol}$) reacts completely, what mass of pure $\\text{CH}_3\\text{COOH}$ ($M = 60\\text{ g/mol}$) is consumed?',
    options: [
      { id: 'A', text: '$18.0\\text{ g}$' },
      { id: 'B', text: '$24.0\\text{ g}$' },
      { id: 'C', text: '$36.0\\text{ g}$' },
      { id: 'D', text: '$54.0\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Moles of $\\text{Al}$: $n_{\\text{Al}} = \\frac{5.4}{27} = 0.20\\text{ mol}$. Mole ratio: $2\\text{ mol Al} : 6\\text{ mol acid} \\implies n_{\\text{acid}} = 3 \\times 0.20 = 0.60\\text{ mol}$. Mass of acetic acid consumed: $m = 0.60 \\times 60 = 36.0\\text{ g}$.'
  },

  // =========================================================================
  // SECTOR 5: JUPITER STATION • BASIC OXIDE DISSOLUTION REACTIONS (CALC Q12 – Q14)
  // =========================================================================
  {
    order_index: 12,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 5: Jupiter Station • Copper(II) Oxide Dissolution',
    content_markdown: 'An astronaut dissolves $12.0\\text{ g}$ of black copper(II) oxide powder ($\\text{CuO}$, molar mass $80\\text{ g/mol}$) in an excess of heated acetic acid: $$2\\text{CH}_3\\text{COOH} + \\text{CuO} \\xrightarrow{t^\\circ} (\\text{CH}_3\\text{COO})_2\\text{Cu} + \\text{H}_2\\text{O}$$ What is the mass of copper(II) acetate ($(\\text{CH}_3\\text{COO})_2\\text{Cu}$, molar mass $182\\text{ g/mol}$) formed in the resulting sky-blue solution?',
    options: [
      { id: 'A', text: '$18.2\\text{ g}$' },
      { id: 'B', text: '$27.3\\text{ g}$' },
      { id: 'C', text: '$36.4\\text{ g}$' },
      { id: 'D', text: '$45.5\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Moles of $\\text{CuO}$: $n_{\\text{CuO}} = \\frac{12.0}{80} = 0.15\\text{ mol}$. From the equation, $n_{\\text{salt}} = n_{\\text{CuO}} = 0.15\\text{ mol}$. Mass of copper(II) acetate: $m = 0.15 \\times 182 = 27.3\\text{ g}$.'
  },
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 5: Jupiter Station • Magnesium Oxide Neutralization',
    content_markdown: 'A sample of $6.0\\text{ g}$ of magnesium oxide powder ($\\text{MgO}$, molar mass $40\\text{ g/mol}$) is completely dissolved in an excess of acetic acid: $$2\\text{CH}_3\\text{COOH} + \\text{MgO} \\to (\\text{CH}_3\\text{COO})_2\\text{Mg} + \\text{H}_2\\text{O}$$ Calculate the mass of anhydrous magnesium acetate ($(\\text{CH}_3\\text{COO})_2\\text{Mg}$, molar mass $142\\text{ g/mol}$) obtained after evaporating all solvent.',
    options: [
      { id: 'A', text: '$14.2\\text{ g}$' },
      { id: 'B', text: '$21.3\\text{ g}$' },
      { id: 'C', text: '$28.4\\text{ g}$' },
      { id: 'D', text: '$35.5\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Moles of $\\text{MgO}$: $n_{\\text{MgO}} = \\frac{6.0}{40} = 0.15\\text{ mol}$. Moles of magnesium acetate produced: $n_{\\text{salt}} = 0.15\\text{ mol}$. Mass of salt: $m = 0.15 \\times 142 = 21.3\\text{ g}$.'
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 5: Jupiter Station • Iron(III) Oxide Hull Treatment',
    content_markdown: 'Rust (iron(III) oxide, $\\text{Fe}_2\\text{O}_3$, molar mass $160\\text{ g/mol}$) is treated using a $1.5\\text{ M}$ solution of acetic acid: $$6\\text{CH}_3\\text{COOH} + \\text{Fe}_2\\text{O}_3 \\to 2(\\text{CH}_3\\text{COO})_3\\text{Fe} + 3\\text{H}_2\\text{O}$$ To completely dissolve $8.0\\text{ g}$ of $\\text{Fe}_2\\text{O}_3$, what volume of the $1.5\\text{ M}$ acetic acid solution is required?',
    options: [
      { id: 'A', text: '$100\\text{ mL}$' },
      { id: 'B', text: '$150\\text{ mL}$' },
      { id: 'C', text: '$200\\text{ mL}$' },
      { id: 'D', text: '$300\\text{ mL}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Moles of $\\text{Fe}_2\\text{O}_3$: $n = \\frac{8.0}{160} = 0.05\\text{ mol}$. Stoichiometric ratio: $1\\text{ mol } \\text{Fe}_2\\text{O}_3 : 6\\text{ mol acid} \\implies n_{\\text{acid}} = 6 \\times 0.05 = 0.30\\text{ mol}$. Volume required: $V = \\frac{n}{C_M} = \\frac{0.30}{1.5} = 0.20\\text{ L} = 200\\text{ mL}$.'
  },

  // =========================================================================
  // SECTOR 6: SATURN RINGS • NEUTRALIZATION & CARBONATE EFFERVESCENCE (CALC Q15 – Q17)
  // =========================================================================
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 6: Saturn Rings • Alkaline Titration Neutralization',
    content_markdown: 'An orbital chemist titrates $25\\text{ mL}$ of an unlabelled acetic acid sample with $0.4\\text{ M}$ sodium hydroxide ($\\text{NaOH}$) solution until the phenolphthalein indicator turns from colorless to faint pink: $$\\text{CH}_3\\text{COOH} + \\text{NaOH} \\to \\text{CH}_3\\text{COONa} + \\text{H}_2\\text{O}$$ If exactly $30\\text{ mL}$ of the $0.4\\text{ M } \\text{NaOH}$ solution was consumed at equivalence, what is the molar concentration of the acetic acid sample?',
    options: [
      { id: 'A', text: '$0.24\\text{ M}$' },
      { id: 'B', text: '$0.36\\text{ M}$' },
      { id: 'C', text: '$0.48\\text{ M}$' },
      { id: 'D', text: '$0.60\\text{ M}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Moles of $\\text{NaOH}$: $n = 0.030\\text{ L} \\times 0.4\\text{ M} = 0.012\\text{ mol}$. Since $1\\text{ mol acid} : 1\\text{ mol base}$, $n_{\\text{acid}} = 0.012\\text{ mol}$. Molar concentration: $C_M = \\frac{0.012\\text{ mol}}{0.025\\text{ L}} = 0.48\\text{ M}$.'
  },
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 6: Saturn Rings • Sodium Carbonate Gas Evolution',
    content_markdown: 'When $10.6\\text{ g}$ of anhydrous sodium carbonate ($\\text{Na}_2\\text{CO}_3$, molar mass $106\\text{ g/mol}$) is added to an excess of acetic acid: $$2\\text{CH}_3\\text{COOH} + \\text{Na}_2\\text{CO}_3 \\to 2\\text{CH}_3\\text{COONa} + \\text{CO}_2\\uparrow + \\text{H}_2\\text{O}$$ Calculate the volume of carbon dioxide gas ($\\text{CO}_2$) evolved at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $V_m = 24.79\\text{ L/mol}$).',
    options: [
      { id: 'A', text: '$1.239\\text{ L}$' },
      { id: 'B', text: '$2.479\\text{ L}$' },
      { id: 'C', text: '$4.958\\text{ L}$' },
      { id: 'D', text: '$3.718\\text{ L}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Moles of $\\text{Na}_2\\text{CO}_3$: $n = \\frac{10.6}{106} = 0.10\\text{ mol}$. Equation shows $n_{\\text{CO}_2} = n_{\\text{Na}_2\\text{CO}_3} = 0.10\\text{ mol}$. Volume of $\\text{CO}_2$: $V = 0.10 \\times 24.79 = 2.479\\text{ L}$.'
  },
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 6: Saturn Rings • Calcium Carbonate Precipitation',
    content_markdown: 'An excess of acetic acid reacts with $15.0\\text{ g}$ of calcium carbonate ($\\text{CaCO}_3$, molar mass $100\\text{ g/mol}$): $$2\\text{CH}_3\\text{COOH} + \\text{CaCO}_3 \\to (\\text{CH}_3\\text{COO})_2\\text{Ca} + \\text{CO}_2\\uparrow + \\text{H}_2\\text{O}$$ All evolved $\\text{CO}_2$ gas is bubbled into a vessel containing excess limewater ($\\text{Ca(OH)}_2$). What mass of calcium carbonate precipitate ($\\text{CaCO}_3$, $M = 100\\text{ g/mol}$) is recovered?',
    options: [
      { id: 'A', text: '$7.5\\text{ g}$' },
      { id: 'B', text: '$10.0\\text{ g}$' },
      { id: 'C', text: '$15.0\\text{ g}$' },
      { id: 'D', text: '$30.0\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Moles of $\\text{CaCO}_3$ reacted: $n = \\frac{15.0}{100} = 0.15\\text{ mol} \\implies n_{\\text{CO}_2} = 0.15\\text{ mol}$. In excess limewater: $\\text{CO}_2 + \\text{Ca(OH)}_2 \\to \\text{CaCO}_3\\downarrow + \\text{H}_2\\text{O} \\implies n_{\\text{precipitate}} = 0.15\\text{ mol}$. Mass of precipitate: $m = 0.15 \\times 100 = 15.0\\text{ g}$.'
  },

  // =========================================================================
  // SECTOR 7: URANUS DEEP SPACE • ESTERIFICATION YIELD & LIMITING REACTANT (CALC Q18 – Q19)
  // =========================================================================
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 7: Uranus Space • Theoretical Ester Synthesis Yield',
    content_markdown: 'In a microgravity laboratory, an astronaut reacts $18.0\\text{ g}$ of pure acetic acid ($\\text{CH}_3\\text{COOH}$, $M = 60\\text{ g/mol}$) with an excess of pure ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$) in the presence of concentrated $\\text{H}_2\\text{SO}_4$: $$\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\underset{t^\\circ}{\\overset{\\text{conc. } \\text{H}_2\\text{SO}_4}{\\rightleftharpoons}} \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}$$ Assuming a theoretical $100\\%$ complete conversion, what is the maximum mass of ethyl acetate ($\\text{CH}_3\\text{COOC}_2\\text{H}_5$, molar mass $88\\text{ g/mol}$) that can be synthesized?',
    options: [
      { id: 'A', text: '$17.6\\text{ g}$' },
      { id: 'B', text: '$22.0\\text{ g}$' },
      { id: 'C', text: '$26.4\\text{ g}$' },
      { id: 'D', text: '$35.2\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Moles of acetic acid: $n = \\frac{18.0}{60} = 0.30\\text{ mol}$. With excess alcohol, theoretical moles of ethyl acetate formed: $n_{\\text{ester}} = 0.30\\text{ mol}$. Mass of ethyl acetate: $m = 0.30 \\times 88 = 26.4\\text{ g}$.'
  },
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 7: Uranus Space • Esterification with Reaction Efficiency',
    content_markdown: 'An astronaut mixes $24.0\\text{ g}$ of pure acetic acid ($M = 60\\text{ g/mol}$) with $27.6\\text{ g}$ of pure ethylic alcohol ($M = 46\\text{ g/mol}$). The mixture is heated with concentrated $\\text{H}_2\\text{SO}_4$. Given that the reaction reaches an efficiency of $H = 75\\%$, what is the actual mass of ethyl acetate ($M = 88\\text{ g/mol}$) collected?',
    options: [
      { id: 'A', text: '$19.8\\text{ g}$' },
      { id: 'B', text: '$26.4\\text{ g}$' },
      { id: 'C', text: '$35.2\\text{ g}$' },
      { id: 'D', text: '$39.6\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Moles of reactants: $n_{\\text{acid}} = \\frac{24.0}{60} = 0.40\\text{ mol}$, $n_{\\text{alcohol}} = \\frac{27.6}{46} = 0.60\\text{ mol}$. Ratio is $1:1$, so acetic acid is the limiting reactant ($0.40 < 0.60$). Theoretical yield: $0.40\\text{ mol}$. With efficiency $H = 75\\%$, actual moles of ester: $n_{\\text{actual}} = 0.40 \\times 0.75 = 0.30\\text{ mol}$. Actual mass: $m = 0.30 \\times 88 = 26.4\\text{ g}$.'
  },

  // =========================================================================
  // SECTOR 8: NEPTUNE FRONTIER • MULTI-STEP FERMENTATION & VINEGAR PRODUCTION (CALC Q20)
  // =========================================================================
  {
    order_index: 20,
    type: 'MULTIPLE_CHOICE',
    points: 0.5,
    sectionName: 'Sector 8: Neptune Frontier • Bioreactor Fermentation & Vinegar Dilution',
    content_markdown: 'A space habitat fermentation bioreactor converts dilute ethylic alcohol into acetic acid: $$\\text{C}_2\\text{H}_5\\text{OH} + \\text{O}_2 \\xrightarrow{\\text{Acetobacter}} \\text{CH}_3\\text{COOH} + \\text{H}_2\\text{O}$$ Starting from $92.0\\text{ g}$ of pure ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$, $M = 46\\text{ g/mol}$), the biological fermentation proceeds with an overall efficiency of $H = 80\\%$. The resulting pure acetic acid ($M = 60\\text{ g/mol}$) is then diluted with purified water to formulate table vinegar with a concentration of $4\\%$ by mass. What is the total mass of the $4\\%$ table vinegar solution produced?',
    options: [
      { id: 'A', text: '$1200\\text{ g}$' },
      { id: 'B', text: '$1800\\text{ g}$' },
      { id: 'C', text: '$2400\\text{ g}$' },
      { id: 'D', text: '$3000\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Initial moles of ethanol: $n = \\frac{92.0}{46} = 2.0\\text{ mol}$. With $H = 80\\%$, moles of acetic acid formed: $n_{\\text{acid}} = 2.0 \\times 0.80 = 1.6\\text{ mol}$. Mass of pure acetic acid: $m_{\\text{pure}} = 1.6 \\times 60 = 96.0\\text{ g}$. Mass of $4\\%$ vinegar solution: $m_{\\text{solution}} = \\frac{m_{\\text{pure}}}{C\\%} \\times 100\\% = \\frac{96.0}{4} \\times 100 = 2400\\text{ g}$ (or $2.4\\text{ kg}$).'
  }
];

async function seed() {
  console.log('🚀 Seeding 20 Acetic Acid Problems (5 Theory + 15 Calculation) for Keithley Lake...');
  console.log('Target Date:', CONSTANTS.ASSIGNED_DATE);

  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  // 1. Clean up any existing CHEM_9 assignments for Keithley on 2026-11-10
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

  // 2. Create Learning Unit (Flight Briefing context for exercise mission)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: 'Lesson 27 Quantitative Mastery: Acetic Acid Chemical Dynamics (20 Problems)',
      description: 'Cosmic orbital practice: 5 core theoretical conceptual questions and 15 stoichiometry & concentration calculations covering Lesson 27.',
      lecture_content_markdown: `# 🚀 ORBITAL FLIGHT BRIEFING: LESSON 27 QUANTITATIVE MASTERY
**Keithley Lake (Astronaut Cadet) • Grade 9 Chemistry • 10 November 2026**

Interactive Simulation Studio: \`/lectures/chem9-lesson27-acetic-acid/index.html\`

---

## 🎯 Flight Objectives
Today\'s orbital flight mission comprises **20 quantitative and conceptual problems** across 8 Planetary Sectors:
* **Sectors 1 – 2 (Q1 – Q5):** Core Theoretical Concepts (Carboxyl group architecture, glacial acetic acid, identification tests, esterification conditions, and aerobic fermentation).
* **Sectors 3 – 8 (Q6 – Q20):** Stoichiometric Calculations (Elemental mass percentage, vinegar concentration & density, active metal displacement with $\\text{Mg}/\\text{Zn}/\\text{Al}$, basic oxide dissolution with $\\text{CuO}/\\text{MgO}/\\text{Fe}_2\\text{O}_3$, neutralization & carbonate gas evolution, esterification yields with efficiency $H\\%$, and multi-step fermentation dilution).

*Review formulas carefully and engage the orbital practice console below!*`,
      lecture_attachments: [],
      is_template: true
    }
  });
  console.log('✅ Created Learning Unit:', unit.id);

  // 3. Create Daily Student Assignment Card
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: targetDate,
      custom_session_minutes: 90,
      teacher_daily_note: 'Cadet Keithley: Today we put Lesson 27 theory into practice! Engage all 20 mission problems (5 theory + 15 calculations) across 8 Planetary Sectors. Use your scratchpad for stoichiometry and verify every mole ratio. 100% focus!',
      is_published: true
    }
  });
  console.log('✅ Created Daily Assignment Card:', assignment.id);

  // 4. Create In-Session Assessment (90 minutes, 20 problems, 10.0 points max score)
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: 'Orbital Quantitative Flight: Acetic Acid Mastery (20 Problems • 90 mins)',
      instructions: '20 multiple-choice problems (0.5 pts each = 10.0 pts max score). Standard conditions $25^\\circ\\text{C}, 1\\text{ bar}$ ($V_m = 24.79\\text{ L/mol}$). Real-time telemetry, audio buzzer/chime, and sector jumping active.',
      time_limit_minutes: 90,
      max_score: 10.00
    }
  });
  console.log('✅ Created Assessment:', assessment.id);

  // 5. Create Questions
  for (const q of QUESTIONS_DATA) {
    await prisma.questions.create({
      data: {
        assessment_id: assessment.id,
        order_index: q.order_index,
        type: q.type,
        points: q.points,
        question_payload: {
          content_markdown: q.content_markdown,
          sectionName: q.sectionName,
          options: q.options,
          correct_option_id: q.correct_option_id,
          explanation: q.explanation
        },
        grading_key_payload: {
          correct_option_id: q.correct_option_id,
          explanation: q.explanation
        }
      }
    });
  }
  console.log(`✅ Created ${QUESTIONS_DATA.length} questions.`);

  // 6. Create Initial Assessment Attempt (Status: NOT_STARTED)
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: CONSTANTS.STUDENT_ID,
      status: 'NOT_STARTED',
      auto_score: 0,
      manual_score: 0,
      total_score: 0
    }
  });
  console.log('✅ Created Assessment Attempt:', attempt.id);

  // 7. Save backup JSON file
  const backupPath = path.resolve(__dirname, 'content/chemistry_practice_2026_11_10.json');
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.writeFileSync(backupPath, JSON.stringify({
    assignedDate: CONSTANTS.ASSIGNED_DATE,
    studentId: CONSTANTS.STUDENT_ID,
    unitId: unit.id,
    assignmentId: assignment.id,
    assessmentId: assessment.id,
    attemptId: attempt.id,
    mode: 'EXERCISE_ONLY',
    questionsCount: QUESTIONS_DATA.length,
    totalPoints: QUESTIONS_DATA.reduce((acc, q) => acc + q.points, 0),
    questions: QUESTIONS_DATA
  }, null, 2));
  console.log('✅ Saved questions backup to:', backupPath);

  console.log('🎉 ALL DONE! 10/11/2026 Keithley Chemistry practice mission deployed successfully.');
}

seed()
  .catch(e => {
    console.error('❌ Error seeding exercises:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
