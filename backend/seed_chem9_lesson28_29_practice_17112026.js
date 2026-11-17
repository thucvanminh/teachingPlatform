const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake
  SUBJECT_ID: '6fc7387b-13b8-4e27-8240-a60c03dc1d51', // CHEM_9
  ASSIGNED_DATE: '2026-11-17'
};

const LECTURE_MARKDOWN = `# 🚀 ORBITAL FLIGHT BRIEFING: PRACTICE MISSION 17/11/2026
**Astronaut Cadet Keithley Lake • Grade 9 Chemistry • 17 November 2026**

---

## 🎯 Mission Directives: 30 In-Session Cosmic Problems
Today's orbital flight session is an intensive **30-problem practice workout** based on **SGK pp. 129–131** and **SBT pp. 81–83**:
* **Sectors 1 – 5 (Q1 – Q20):** Core Theory & Conceptual Chemistry (Lipid definition, triglyceride formulas, glycerol architecture, fatty acids, physical states, water buoyancy, dietary health & obesity prevention, saponification mechanism, carbohydrate elements $\\text{C, H, O}$, formula $\\text{C}_n(\\text{H}_2\\text{O})_m$, glucose & saccharose natural occurrences, physical properties, silver mirror reaction, and cellular ATP energy roles).
* **Sectors 6 – 8 (Q21 – Q30):** Quantitative Stoichiometry & Calculations (Saponification mole ratios, required $\\text{NaOH}$ mass, glycerol yield, Law of Conservation of Mass in soap making, glucose silver mirror mass, alcohol fermentation yield & $\\text{CO}_2$ gas volume, glucose metabolic combustion, saccharose hydrolysis stoichiometry, and medical 5% glucose intravenous solution preparation).

---

### ⚡ Orbital Quick Formula Weapons
* **Fat General Formula:** $(\\text{RCOO})_3\\text{C}_3\\text{H}_5$ with Glycerol $\\text{C}_3\\text{H}_5(\\text{OH})_3$ ($M = 92\\text{ g/mol}$)
* **Saponification:** $(\\text{RCOO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\xrightarrow{t^\\circ} 3\\text{RCOONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3$
* **Mass Conservation:** $m_{\\text{fat}} + m_{\\text{NaOH}} = m_{\\text{soap}} + m_{\\text{glycerol}}$
* **Carbohydrate Formula:** $\\text{C}_n(\\text{H}_2\\text{O})_m$ (Glucose $\\text{C}_6\\text{H}_{12}\\text{O}_6, M = 180\\text{ g/mol}$; Saccharose $\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}, M = 342\\text{ g/mol}$)
* **Silver Mirror Reaction:** $1\\text{ mol glucose} \\to 2\\text{ mol Ag} \\quad (M_{\\text{Ag}} = 108\\text{ g/mol})$
* **Fermentation:** $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{yeast}} 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2 \\quad (M_{\\text{alcohol}} = 46\\text{ g/mol})$
* **Standard Gas Volume ($25^\\circ\\text{C}, 1\\text{ bar}$):** $V = n \\times 24.79\\text{ L}$

*Engage Station 2 to launch your 90-minute mission!*`;

const QUESTIONS_DATA = [
  // =========================================================================
  // SECTOR 1: MERCURY ORBIT • LIPIDS & TRIGLYCERIDES ARCHITECTURE (Q1 – Q4) [THEORY]
  // =========================================================================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • Definition of Lipids',
    content_markdown: 'According to biochemical standards in the orbital laboratory, which statement correctly defines lipids and their general solubility behavior? (SGK p.129, SBT 28.1)',
    options: [
      { id: 'A', text: 'Inorganic minerals found in planetary rocks that dissolve completely in warm polar water.' },
      { id: 'B', text: 'Organic compounds in living cells that are insoluble in water but soluble in non-polar solvents like gasoline.' },
      { id: 'C', text: 'Organic compounds in living cells that dissolve in water but remain insoluble in benzene.' },
      { id: 'D', text: 'Gaseous hydrocarbons produced in deep planetary atmospheres that dissolve only under extreme high hydrostatic pressures.' }
    ],
    correct_option_id: 'B',
    explanation: 'By definition (SGK p.129 & SBT 28.1), lipids are organic compounds present in living cells that are insoluble in water, but soluble in non-polar organic solvents such as gasoline, kerosene, and benzene.'
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • Chemical Nature of Fats',
    content_markdown: 'What is the precise chemical classification and general structural formula of fats (triglycerides)? (SGK p.129, SBT 28.2)',
    options: [
      { id: 'A', text: 'Monoesters of ethanol and acetic acid with the formula $\\text{CH}_3\\text{COOC}_2\\text{H}_5$.' },
      { id: 'B', text: 'Polyethers synthesized by joining glucose molecules together through condensation reactions.' },
      { id: 'C', text: 'Triesters of glycerol and long-chain fatty acids with the general formula $(\\text{RCOO})_3\\text{C}_3\\text{H}_5$.' },
      { id: 'D', text: 'High-molecular-weight inorganic coordination salts composed of magnesium and phosphate ions that form crystalline rocks.' }
    ],
    correct_option_id: 'C',
    explanation: 'Fats are triesters (esters containing three ester groups -COO-) formed between glycerol and long-chain fatty acids, represented by the general condensed formula (RCOO)3C3H5 (SGK p.129, SBT 28.2).'
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • Glycerol Architecture',
    content_markdown: 'Astronaut Keithley inspects the molecular structure of **glycerol**. Which description of glycerol is accurate? (SGK p.129)',
    options: [
      { id: 'A', text: 'A trihydric alcohol with formula $\\text{C}_3\\text{H}_5(\\text{OH})_3$ containing three hydroxyl groups.' },
      { id: 'B', text: 'A volatile monocarboxylic acid with formula $\\text{CH}_3\\text{COOH}$ that produces a sharp, pungent odor.' },
      { id: 'C', text: 'A linear unsaturated hydrocarbon gas with formula $\\text{C}_3\\text{H}_6$ that readily undergoes addition reactions.' },
      { id: 'D', text: 'A solid cyclic carbohydrate with formula $\\text{C}_6\\text{H}_{12}\\text{O}_6$ that provides rapid cellular energy.' }
    ],
    correct_option_id: 'A',
    explanation: 'Glycerol (glycerin) is a trihydric alcohol with structural formula CH2(OH)-CH(OH)-CH2(OH), condensed as C3H5(OH)3, containing three hydroxyl groups (-OH) with molar mass M = 92 g/mol (SGK p.129).'
  },
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • Fatty Acid Characteristics',
    content_markdown: 'Which of the following organic acids is a saturated fatty acid commonly found in natural animal fats and plant oils? (SGK p.129)',
    options: [
      { id: 'A', text: 'Formic acid ($\\text{HCOOH}$, found in ant venom)' },
      { id: 'B', text: 'Stearic acid ($\\text{C}_{17}\\text{H}_{35}\\text{COOH}$)' },
      { id: 'C', text: 'Acetic acid ($\\text{CH}_3\\text{COOH}$, found in table vinegar)' },
      { id: 'D', text: 'Oxalic acid ($(\\text{COOH})_2$, found in leafy vegetables)' }
    ],
    correct_option_id: 'B',
    explanation: 'Fatty acids are monocarboxylic acids with long, unbranched carbon chains. Common examples include stearic acid (C17H35COOH) and palmitic acid (C15H31COOH). Formic, acetic, and oxalic acids have very short carbon chains and are not fatty acids.'
  },

  // =========================================================================
  // SECTOR 2: VENUS BASE • PHYSICAL PROPERTIES & NUTRITIONAL HEALTH (Q5 – Q7) [THEORY]
  // =========================================================================
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 2: Venus Base • Physical States of Lipids',
    content_markdown: 'At standard room temperature ($25^\\circ\\text{C}$), which of the following lipid substances is normally in the **liquid** state? (SGK p.129, SBT 28.3)',
    options: [
      { id: 'A', text: 'Solid beef tallow' },
      { id: 'B', text: 'Pork lard' },
      { id: 'C', text: 'Solid churned dairy butter' },
      { id: 'D', text: 'Sunflower oil' }
    ],
    correct_option_id: 'D',
    explanation: 'Plant oils (such as sunflower oil, peanut oil, soybean oil, and fish oil) are rich in unsaturated fatty acids and remain liquids at room temperature. Beef tallow, pork lard, and dairy butter are rich in saturated fatty acids and are solids at room temperature.'
  },
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 2: Venus Base • Density & Water Immiscibility',
    content_markdown: 'When vegetable oil is mixed with pure water in a zero-gravity test container and allowed to settle, what observation is made? (SGK p.129)',
    options: [
      { id: 'A', text: 'The oil dissolves completely to form a single-phase clear solution.' },
      { id: 'B', text: 'The oil forms a separate layer floating on top because it is less dense than water and insoluble.' },
      { id: 'C', text: 'The oil sinks directly to the bottom because all organic compounds are heavier than water.' },
      { id: 'D', text: 'The oil reacts immediately with water molecules, releasing gas bubbles and producing an alkaline solution.' }
    ],
    correct_option_id: 'B',
    explanation: 'Fats and plant oils are insoluble in water and have a lower density than water (D ≈ 0.9 g/cm³ < 1.0 g/cm³), so they float on top as a distinct immiscible layer (SGK p.129).'
  },
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 2: Venus Base • Nutritional Health & Obesity Prevention',
    content_markdown: 'To maintain cardiovascular health and prevent obesity during long orbital missions, which dietary guideline should Cadet Keithley follow? (SGK p.130, SBT 28.4)',
    options: [
      { id: 'A', text: 'Eliminate all carbohydrates and consume only saturated animal fats for daily metabolic fuel.' },
      { id: 'B', text: 'Completely eliminate all dietary fats because every type of lipid is toxic to the human body.' },
      { id: 'C', text: 'Increase daily consumption of high-temperature deep-fried foods to maximize calorie storage in adipose tissues.' },
      { id: 'D', text: 'Prioritize unsaturated fats from vegetable oils and fish while limiting saturated animal fats.' }
    ],
    correct_option_id: 'D',
    explanation: 'According to nutritional science (SGK p.130, SBT 28.4 / 28.10), one should prioritize unsaturated fats and omega-3 fatty acids from plant oils and fish, while limiting saturated animal fats and foods processed at high temperatures (deep-fried foods) to avoid obesity, atherosclerosis, and cardiovascular disease.'
  },

  // =========================================================================
  // SECTOR 3: EARTH MISSION CONTROL • SAPONIFICATION & APPLICATIONS (Q8 – Q11) [THEORY]
  // =========================================================================
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Saponification Products',
    content_markdown: 'When a fat $(\\text{RCOO})_3\\text{C}_3\\text{H}_5$ is heated with an aqueous solution of sodium hydroxide ($\\text{NaOH}$), what products are formed? (SGK p.129, SBT 28.4 / 28.11 Q2)',
    options: [
      { id: 'A', text: 'Glycerol and sodium salts of fatty acids (soap).' },
      { id: 'B', text: 'Ethanol, carbon dioxide gas, and sodium chloride solution.' },
      { id: 'C', text: 'Pure glucose crystals, methane gas, and water molecules.' },
      { id: 'D', text: 'Acetic acid, hydrogen gas, and metallic sodium crystals.' }
    ],
    correct_option_id: 'A',
    explanation: 'Alkaline hydrolysis of fats (saponification): (RCOO)3C3H5 + 3NaOH -> 3RCOONa (soap) + C3H5(OH)3 (glycerol). The products are glycerol and sodium salts of fatty acids.'
  },
  {
    order_index: 9,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Meaning of Saponification',
    content_markdown: 'Why is the alkaline hydrolysis of fats commonly referred to as the **saponification** reaction? (SGK p.129)',
    options: [
      { id: 'A', text: 'Because the sodium or potassium salts of fatty acids produced are used as soap.' },
      { id: 'B', text: 'Because the reaction requires intense sunlight to proceed to completion.' },
      { id: 'C', text: 'Because glycerol reacts explosively with atmospheric nitrogen during heating.' },
      { id: 'D', text: 'Because the high-temperature reaction converts solid triglycerides directly into complex edible polysaccharide starches.' }
    ],
    correct_option_id: 'A',
    explanation: 'The sodium or potassium salts of fatty acids (RCOONa or RCOOK) formed from this reaction have surfactant cleansing properties and are used to make soap, which is why this reaction is called saponification (phản ứng xà phòng hoá).'
  },
  {
    order_index: 10,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Practical Applications of Fats',
    content_markdown: 'Which of the following is **NOT** a practical or industrial application of fats described in the curriculum? (SGK p.130)',
    options: [
      { id: 'A', text: 'Manufacturing of bar soap and hygiene cleansing agents.' },
      { id: 'B', text: 'Moisturizing and softening components in cosmetics.' },
      { id: 'C', text: 'Direct extraction of metallic aluminum from bauxite ore.' },
      { id: 'D', text: 'Production of renewable biodiesel fuel for spacecraft atmospheric reentry combustion engines.' }
    ],
    correct_option_id: 'C',
    explanation: 'Fats are widely used in the food industry, soap manufacturing, cosmetics (moisturizers, creams), pharmaceuticals, and biofuel (biodiesel). They are never used to extract metallic aluminum from bauxite ore (which is done via molten electrolysis of Al2O3).'
  },
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Saturated vs Unsaturated Fats',
    content_markdown: 'What is the primary structural difference between saturated fats and unsaturated fats? (SBT 28.11 Q3)',
    options: [
      { id: 'A', text: 'Saturated fats contain carbon-carbon double bonds ($\\text{C}=\\text{C}$), whereas unsaturated fats have only single bonds.' },
      { id: 'B', text: 'Saturated fats contain nitrogen and phosphorus atoms, while unsaturated fats contain only carbon and hydrogen atoms.' },
      { id: 'C', text: 'Saturated fats dissolve readily in cold water, while unsaturated fats dissolve only in boiling concentrated acids.' },
      { id: 'D', text: 'Unsaturated fats contain one or more carbon-carbon double bonds ($\\text{C}=\\text{C}$) in their hydrocarbon chains.' }
    ],
    correct_option_id: 'D',
    explanation: 'Unsaturated fats contain carbon-carbon double bonds (C=C) in their fatty acid hydrocarbon chains, which gives them lower melting points (liquid plant oils). Saturated fats have only single C-C bonds and higher melting points (solid animal fats).'
  },

  // =========================================================================
  // SECTOR 4: MARS OUTPOST • CARBOHYDRATE CONCEPTS & CLASSIFICATION (Q12 – Q15) [THEORY]
  // =========================================================================
  {
    order_index: 12,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 4: Mars Outpost • Element Composition of Carbohydrates',
    content_markdown: 'Which set of chemical elements constitutes the molecular structure of all standard carbohydrates? (SGK p.131, SBT 29.1)',
    options: [
      { id: 'A', text: 'Carbon, Hydrogen, and Nitrogen ($\\text{C, H, N}$)' },
      { id: 'B', text: 'Carbon, Hydrogen, and Oxygen ($\\text{C, H, O}$)' },
      { id: 'C', text: 'Carbon, Hydrogen, and Chlorine ($\\text{C, H, Cl}$)' },
      { id: 'D', text: 'Carbon, Nitrogen, and Phosphorus ($\\text{C, N, P}$)' }
    ],
    correct_option_id: 'B',
    explanation: 'All standard carbohydrates are organic compounds composed strictly of carbon, hydrogen, and oxygen (C, H, O). They do not contain nitrogen, chlorine, or phosphorus (SGK p.131, SBT 29.1).'
  },
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 4: Mars Outpost • General Formula of Carbohydrates',
    content_markdown: 'What is the general chemical formula commonly used to represent carbohydrates? (SGK p.131)',
    options: [
      { id: 'A', text: '$\\text{C}_n\\text{H}_{2n+2}$' },
      { id: 'B', text: '$\\text{R-COO-R\'}$' },
      { id: 'C', text: '$\\text{C}_n(\\text{H}_2\\text{O})_m$' },
      { id: 'D', text: '$\\text{C}_n\\text{H}_{2n-2} \\text{ (alkynes)}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Carbohydrates typically have the general formula Cn(H2O)m, where carbon is bonded with hydrogen and oxygen in a ratio similar to water hydrates (hence the name carbo-hydrate) (SGK p.131).'
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 4: Mars Outpost • Carbohydrate Identification',
    content_markdown: 'Consider the following compounds: ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$), acetic acid ($\\text{CH}_3\\text{COOH}$), glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$), saccharose ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$), starch ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$), and cellulose ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_m$). How many of these substances belong to the carbohydrate family? (SBT 29.2)',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '3' },
      { id: 'C', text: '5' },
      { id: 'D', text: '6' }
    ],
    correct_option_id: 'A',
    explanation: 'Exactly 4 substances are carbohydrates: glucose (C6H12O6), saccharose (C12H22O11), starch ((C6H10O5)n), and cellulose ((C6H10O5)m). Ethylic alcohol is an alcohol, and acetic acid is a carboxylic acid (SBT 29.2).'
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 4: Mars Outpost • Natural Sources of Glucose & Saccharose',
    content_markdown: 'Where are glucose and saccharose abundantly found in nature? (SGK p.131, SBT 29.8)',
    options: [
      { id: 'A', text: 'Glucose is abundant in ripe fruits like grapes, while saccharose is abundant in sugarcane and sugar beets.' },
      { id: 'B', text: 'Glucose is found exclusively in animal bone marrow, while saccharose is found only in volcanic sulfur deposits.' },
      { id: 'C', text: 'Glucose is found primarily in raw crude petroleum, while saccharose is extracted from atmospheric rain clouds.' },
      { id: 'D', text: 'Glucose is synthesized only by deep-sea volcanic vent bacteria, while saccharose exists solely as synthetic plastic.' }
    ],
    correct_option_id: 'A',
    explanation: 'Glucose (grape sugar) is abundant in ripe fruits, especially grapes and honey, as well as mammalian blood. Saccharose (cane sugar) is abundant in sugarcane, sugar beets, and palmyra palm trees (SGK p.131, SBT 29.8).'
  },

  // =========================================================================
  // SECTOR 5: JUPITER STATION • GLUCOSE & SACCHAROSE PROPERTIES & BIOLOGY (Q16 – Q20) [THEORY]
  // =========================================================================
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Physical Properties of Simple Sugars',
    content_markdown: 'Which physical property is shared by both pure glucose and pure saccharose at room temperature? (SGK p.131, SBT 29.3)',
    options: [
      { id: 'A', text: 'Both are colorless crystalline solids with a sweet taste that dissolve readily in water.' },
      { id: 'B', text: 'Both are volatile yellow liquids with pungent odors that are completely insoluble in water.' },
      { id: 'C', text: 'Both are gaseous substances at room temperature that condense into liquid below $-50^\\circ\\text{C}$.' },
      { id: 'D', text: 'Both are insoluble waxy solids that float on water and dissolve only in hot kerosene solvent.' }
    ],
    correct_option_id: 'A',
    explanation: 'Both glucose (C6H12O6) and saccharose (C12H22O11) are colorless crystalline solids, have a sweet taste, and dissolve readily in water (SGK p.131, SBT 29.3).'
  },
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Chemical Reactivity of Glucose',
    content_markdown: 'Which of the following chemical reactions does glucose **NOT** undergo? (SBT 29.4)',
    options: [
      { id: 'A', text: 'Silver mirror reaction with an ammoniacal silver nitrate solution ($\\text{AgNO}_3/\\text{NH}_3$).' },
      { id: 'B', text: 'Alcoholic fermentation in the presence of yeast to produce ethylic alcohol and carbon dioxide.' },
      { id: 'C', text: 'Complete combustion in oxygen to produce carbon dioxide gas and water vapor.' },
      { id: 'D', text: 'Hydrolysis into smaller monosaccharide units in dilute acid.' }
    ],
    correct_option_id: 'D',
    explanation: 'Glucose is a simple monosaccharide, so it cannot be hydrolyzed into smaller sugars. Saccharose, starch, and cellulose can undergo hydrolysis, but glucose cannot (SBT 29.4).'
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Silver Mirror Reaction',
    content_markdown: 'When a glucose solution is gently heated in a clean test tube with an ammoniacal silver nitrate solution ($\\text{AgNO}_3/\\text{NH}_3$), what occurs? (SGK p.132, SBT 29.5 b)',
    options: [
      { id: 'A', text: 'A bright red precipitate of metallic copper coats the bottom of the tube.' },
      { id: 'B', text: 'A dense white precipitate of silver chloride forms that does not dissolve.' },
      { id: 'C', text: 'A shiny, reflective layer of metallic silver deposits on the inner wall of the tube.' },
      { id: 'D', text: 'Large bubbles of flammable methane gas evolve vigorously, causing the liquid to boil.' }
    ],
    correct_option_id: 'C',
    explanation: 'Glucose contains an aldehyde group (-CHO) that reduces Ag+ ions in the ammoniacal silver nitrate solution to shiny metallic silver (Ag), creating a reflective silver mirror on the glass wall (phản ứng tráng bạc) (SGK p.132).'
  },
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Cellular Energy Function of Glucose',
    content_markdown: 'What is the primary biological function of glucose in the human body? (SBT 29.11 Q1)',
    options: [
      { id: 'A', text: 'Providing thermal insulation against cold temperatures in subcutaneous fat layers.' },
      { id: 'B', text: 'Serving as the rigid structural building block for human skeletal bone armor.' },
      { id: 'C', text: 'Regulating systemic blood osmotic pressure by directly absorbing atmospheric nitrogen gas through pulmonary arteries.' },
      { id: 'D', text: 'Acting as the primary, immediate fuel for cellular respiration to generate ATP energy.' }
    ],
    correct_option_id: 'D',
    explanation: 'Glucose is the body\'s primary and most readily accessible cellular energy substrate. Inside cells, glucose undergoes metabolic breakdown to synthesize ATP (adenosine triphosphate) molecules, powering biological functions (SBT 29.11 Q1).'
  },
  {
    order_index: 20,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Endocrine Regulation of Blood Sugar',
    content_markdown: 'Which two pancreatic hormones regulate blood glucose concentration, and what are their respective effects? (SBT 29.11 Q2)',
    options: [
      { id: 'A', text: 'Insulin increases blood glucose, while glucagon also increases blood glucose.' },
      { id: 'B', text: 'Insulin decreases blood glucose, while glucagon increases blood glucose.' },
      { id: 'C', text: 'Both hormones act exclusively together to reduce blood glucose level to zero.' },
      { id: 'D', text: 'Neither hormone affects blood glucose; they regulate only bone calcium absorption.' }
    ],
    correct_option_id: 'B',
    explanation: 'Insulin promotes glucose uptake into tissue cells and glycogen synthesis in the liver, decreasing blood sugar levels. Glucagon stimulates the liver to break down glycogen into glucose, raising blood sugar levels (SBT 29.11 Q2).'
  },

  // =========================================================================
  // SECTOR 6: SATURN RINGS • SAPONIFICATION & MASS CONSERVATION (Q21 – Q24) [CALCULATIONS]
  // =========================================================================
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 6: Saturn Rings • Saponification Mole Ratios',
    content_markdown: 'In the orbital chemistry bay, an astronaut is preparing to saponify $0.15\\text{ mol}$ of a pure triglyceride fat $(\\text{RCOO})_3\\text{C}_3\\text{H}_5$ with sodium hydroxide ($\\text{NaOH}$) solution: $$(\\text{RCOO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\xrightarrow{t^\\circ} 3\\text{RCOONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3$$ How many moles of pure $\\text{NaOH}$ are stoichiometrically required for complete reaction? (SBT 28.9)',
    options: [
      { id: 'A', text: '$0.15\\text{ mol}$' },
      { id: 'B', text: '$0.30\\text{ mol}$' },
      { id: 'C', text: '$0.45\\text{ mol}$' },
      { id: 'D', text: '$0.60\\text{ mol}$' }
    ],
    correct_option_id: 'C',
    explanation: 'From the balanced reaction: 1 mol fat requires 3 mol NaOH. Therefore, n(NaOH) = 3 * n(fat) = 3 * 0.15 mol = 0.45 mol.'
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 6: Saturn Rings • Mass of Base Required',
    content_markdown: 'Cadet Keithley reacts $0.20\\text{ mol}$ of tripalmitin ($(\\text{C}_{15}\\text{H}_{31}\\text{COO})_3\\text{C}_3\\text{H}_5$) with aqueous sodium hydroxide ($\\text{NaOH}$, molar mass $40\\text{ g/mol}$): $$(\\text{C}_{15}\\text{H}_{31}\\text{COO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\xrightarrow{t^\\circ} 3\\text{C}_{15}\\text{H}_{31}\\text{COONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3$$ What is the minimum mass of pure $\\text{NaOH}$ required for complete saponification?',
    options: [
      { id: 'A', text: '$8.0\\text{ g}$' },
      { id: 'B', text: '$16.0\\text{ g}$' },
      { id: 'C', text: '$20.0\\text{ g}$' },
      { id: 'D', text: '$24.0\\text{ g}$' }
    ],
    correct_option_id: 'D',
    explanation: 'Stoichiometry requires 3 moles of NaOH per mole of triglyceride: n(NaOH) = 3 * 0.20 = 0.60 mol. Mass of NaOH = n * M = 0.60 mol * 40 g/mol = 24.0 g.'
  },
  {
    order_index: 23,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 6: Saturn Rings • Glycerol Synthesis Mass',
    content_markdown: 'Complete saponification of a batch of vegetable oil in an orbital reactor consumes exactly $36.0\\text{ g}$ of sodium hydroxide ($\\text{NaOH}$, molar mass $40\\text{ g/mol}$): $$(\\text{RCOO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\xrightarrow{t^\\circ} 3\\text{RCOONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3$$ What mass of pure glycerol ($\\text{C}_3\\text{H}_5(\\text{OH})_3$, molar mass $92\\text{ g/mol}$) is synthesized?',
    options: [
      { id: 'A', text: '$27.6\\text{ g}$' },
      { id: 'B', text: '$36.8\\text{ g}$' },
      { id: 'C', text: '$82.8\\text{ g}$' },
      { id: 'D', text: '$13.8\\text{ g}$' }
    ],
    correct_option_id: 'A',
    explanation: 'Moles of NaOH: n(NaOH) = 36.0 / 40 = 0.90 mol. From the equation, 3 mol NaOH produces 1 mol glycerol: n(glycerol) = 0.90 / 3 = 0.30 mol. Mass of glycerol: m = n * M = 0.30 mol * 92 g/mol = 27.6 g.'
  },
  {
    order_index: 24,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 6: Saturn Rings • Mass Conservation in Soap Production',
    content_markdown: 'An orbital sanitation system processes $445\\text{ g}$ of natural fat using $60\\text{ g}$ of $\\text{NaOH}$ dissolved in water ($1.5\\text{ mol}$). After complete saponification, the system isolates $46\\text{ g}$ of pure glycerol ($0.5\\text{ mol}$) along with soap: $$(\\text{RCOO})_3\\text{C}_3\\text{H}_5 + 3\\text{NaOH} \\xrightarrow{t^\\circ} 3\\text{RCOONa} + \\text{C}_3\\text{H}_5(\\text{OH})_3$$ Applying the **Law of Conservation of Mass**, calculate the mass of pure soap ($\\text{RCOONa}$) produced. (SBT 28.9)',
    options: [
      { id: 'A', text: '$431\\text{ g}$' },
      { id: 'B', text: '$459\\text{ g}$' },
      { id: 'C', text: '$505\\text{ g}$' },
      { id: 'D', text: '$480\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: 'According to the Law of Conservation of Mass: m(fat) + m(NaOH) = m(soap) + m(glycerol). Therefore: m(soap) = m(fat) + m(NaOH) - m(glycerol) = 445 g + 60 g - 46 g = 459 g (SBT 28.9).'
  },

  // =========================================================================
  // SECTOR 7: URANUS DEEP SPACE • GLUCOSE STOICHIOMETRY (Q25 – Q27) [CALCULATIONS]
  // =========================================================================
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 7: Uranus Deep Space • Silver Mirror Yield',
    content_markdown: 'An orbital chemist dissolves $18.0\\text{ g}$ of pure glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$, molar mass $180\\text{ g/mol}$) and warms it with excess ammoniacal silver nitrate solution ($\\text{AgNO}_3/\\text{NH}_3$): $$\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{Ag}_2\\text{O} \\xrightarrow{\\text{NH}_3, t^\\circ} \\text{C}_6\\text{H}_{12}\\text{O}_7 + 2\\text{Ag}\\downarrow$$ Assuming $100\\%$ reaction completion, what mass of metallic silver ($\\text{Ag}$, molar mass $108\\text{ g/mol}$) coats the vessel? (SBT 29.6 a)',
    options: [
      { id: 'A', text: '$10.8\\text{ g}$' },
      { id: 'B', text: '$16.2\\text{ g}$' },
      { id: 'C', text: '$21.6\\text{ g}$' },
      { id: 'D', text: '$43.2\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Moles of glucose: n(glucose) = 18.0 / 180 = 0.10 mol. According to the reaction stoichiometry, 1 mol glucose yields 2 mol Ag: n(Ag) = 2 * 0.10 = 0.20 mol. Mass of silver: m(Ag) = 0.20 mol * 108 g/mol = 21.6 g (SBT 29.6 a).'
  },
  {
    order_index: 26,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 7: Uranus Deep Space • Alcohol Fermentation Yield',
    content_markdown: 'A flight bioreactor ferments $36.0\\text{ g}$ of glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$, molar mass $180\\text{ g/mol}$) with yeast enzyme at $30 - 35^\\circ\\text{C}$: $$\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{yeast, } 30-35^\\circ\\text{C}} 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2\\uparrow$$ What mass of ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$, molar mass $46\\text{ g/mol}$) is synthesized upon complete conversion? (SBT 29.6 b, 29.9 a)',
    options: [
      { id: 'A', text: '$9.2\\text{ g}$' },
      { id: 'B', text: '$18.4\\text{ g}$' },
      { id: 'C', text: '$23.0\\text{ g}$' },
      { id: 'D', text: '$36.8\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Moles of glucose: n(glucose) = 36.0 / 180 = 0.20 mol. Stoichiometric ratio: 1 mol glucose -> 2 mol C2H5OH. Therefore, n(alcohol) = 2 * 0.20 = 0.40 mol. Mass of alcohol: m = 0.40 mol * 46 g/mol = 18.4 g (SBT 29.6 b).'
  },
  {
    order_index: 27,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 7: Uranus Deep Space • Fermentation Gas Volume',
    content_markdown: 'During the complete fermentation of $0.30\\text{ mol}$ of glucose according to the reaction: $$\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{yeast}} 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2\\uparrow$$ What volume of carbon dioxide gas ($\\text{CO}_2$, in liters) is released at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, molar volume $V_m = 24.79\\text{ L/mol}$)?',
    options: [
      { id: 'A', text: '$7.44\\text{ L}$' },
      { id: 'B', text: '$12.40\\text{ L}$' },
      { id: 'C', text: '$14.87\\text{ L}$' },
      { id: 'D', text: '$24.79\\text{ L}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Moles of glucose = 0.30 mol. The reaction produces 2 moles of CO2 per mole of glucose: n(CO2) = 2 * 0.30 = 0.60 mol. At standard conditions (25°C, 1 bar), V = n * Vm = 0.60 mol * 24.79 L/mol = 14.874 L ≈ 14.87 L.'
  },

  // =========================================================================
  // SECTOR 8: NEPTUNE FRONTIER • MULTI-STEP & SOLUTION CALCULATIONS (Q28 – Q30) [CALCULATIONS]
  // =========================================================================
  {
    order_index: 28,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 8: Neptune Frontier • Glucose Combustion Stoichiometry',
    content_markdown: 'An orbital environmental control system metabolically combusts $0.25\\text{ mol}$ of glucose to release energy: $$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\xrightarrow{t^\\circ} 6\\text{CO}_2 + 6\\text{H}_2\\text{O}$$ What volume of pure oxygen gas ($\\text{O}_2$, in liters) is consumed at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $V_m = 24.79\\text{ L/mol}$)? (SBT 29.6 d)',
    options: [
      { id: 'A', text: '$37.19\\text{ L}$' },
      { id: 'B', text: '$24.79\\text{ L}$' },
      { id: 'C', text: '$18.59\\text{ L}$' },
      { id: 'D', text: '$49.58\\text{ L}$' }
    ],
    correct_option_id: 'A',
    explanation: 'Moles of glucose = 0.25 mol. The equation indicates 1 mol glucose requires 6 mol O2: n(O2) = 6 * 0.25 = 1.50 mol. Volume of O2 at standard conditions: V = n * Vm = 1.50 mol * 24.79 L/mol = 37.185 L ≈ 37.19 L (SBT 29.6 d).'
  },
  {
    order_index: 29,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 8: Neptune Frontier • Saccharose Hydrolysis Mass',
    content_markdown: 'Cadet Keithley completely hydrolyzes $34.2\\text{ g}$ of pure saccharose ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$, molar mass $342\\text{ g/mol}$) in an acidic aqueous medium: $$\\text{C}_{12}\\text{H}_{22}\\text{O}_{11} + \\text{H}_2\\text{O} \\xrightarrow{\\text{acid, } t^\\circ} \\text{C}_6\\text{H}_{12}\\text{O}_6 \\text{ (glucose)} + \\text{C}_6\\text{H}_{12}\\text{O}_6 \\text{ (fructose)}$$ What mass of pure glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$, molar mass $180\\text{ g/mol}$) is obtained? (SBT 29.5 d, 29.6 c, 29.9 b)',
    options: [
      { id: 'A', text: '$9.0\\text{ g}$' },
      { id: 'B', text: '$12.0\\text{ g}$' },
      { id: 'C', text: '$18.0\\text{ g}$' },
      { id: 'D', text: '$36.0\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Moles of saccharose: n(saccharose) = 34.2 / 342 = 0.10 mol. Hydrolysis of 1 mol saccharose yields 1 mol glucose and 1 mol fructose: n(glucose) = 0.10 mol. Mass of glucose: m = 0.10 mol * 180 g/mol = 18.0 g (SBT 29.6 c).'
  },
  {
    order_index: 30,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 8: Neptune Frontier • Medical Glucose Solution Preparation',
    content_markdown: 'An astronaut medical officer prepares $500.0\\text{ g}$ of a standard $5.0\\%$ glucose intravenous infusion solution for an injured astronaut. What mass of pure glucose solute ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) and what mass of distilled water solvent are required? (SBT 29.7 b)',
    options: [
      { id: 'A', text: '$15.0\\text{ g}$ glucose and $485.0\\text{ g}$ water' },
      { id: 'B', text: '$50.0\\text{ g}$ glucose and $450.0\\text{ g}$ water' },
      { id: 'C', text: '$20.0\\text{ g}$ glucose and $480.0\\text{ g}$ water' },
      { id: 'D', text: '$25.0\\text{ g}$ glucose and $475.0\\text{ g}$ water' }
    ],
    correct_option_id: 'D',
    explanation: 'Mass of pure glucose solute: m(glucose) = m(solution) * C% = 500.0 g * (5.0 / 100) = 25.0 g. Mass of distilled water solvent needed: m(water) = m(solution) - m(glucose) = 500.0 g - 25.0 g = 475.0 g (SBT 29.7 b).'
  }
];

async function seed() {
  console.log('========================================================================');
  console.log('🚀 SEEDING PRACTICE MISSION (17/11/2026) FOR KEITHLEY LAKE');
  console.log('📅 Target Date:', CONSTANTS.ASSIGNED_DATE);
  console.log('👨‍🚀 Student: Keithley Lake (@keithley)');
  console.log('🧪 Subject: CHEM_9 (Hóa học 9)');
  console.log(`🎯 Total Problems: ${QUESTIONS_DATA.length} (20 Theory MCQs + 10 Calculations)`);
  console.log('========================================================================');

  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  // 1. Clean up existing assignments and attempts on 2026-11-17 for CHEM_9
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
    console.log(`⚠️ Cleaning up ${existingAsgns.length} previous CHEM_9 assignment(s) on ${CONSTANTS.ASSIGNED_DATE}...`);
    for (const a of existingAsgns) {
      for (const att of a.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: a.id } });
    }
    console.log('✓ Cleaned previous mission records.');
  }

  // 2. Create Learning Unit (Flight Briefing)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: 'Lesson 28-29 Practice: Lipids, Saponification & Intro to Carbohydrates',
      description: '30-problem comprehensive in-session practice mission covering lipids, saponification stoichiometry, carbohydrate classification, and glucose dynamics (SGK pp. 129-131, SBT pp. 81-83).',
      lecture_content_markdown: LECTURE_MARKDOWN,
      lecture_attachments: [],
      is_template: true
    }
  });
  console.log(`✅ Created Learning Unit: ${unit.id} ("${unit.title}")`);

  // 3. Create Daily Student Assignment Card
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: CONSTANTS.STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: CONSTANTS.TEACHER_ID,
      assigned_date: targetDate,
      custom_session_minutes: 90,
      teacher_daily_note: '🚀 Cadet Keithley: Welcome to your 90-minute In-Session Practice Mission! Today comprises 30 problems (20 conceptual theory + 10 quantitative calculations) based on SGK pp. 129-131 and SBT pp. 81-83. Verify your mole ratios carefully and fly high!',
      is_published: true
    }
  });
  console.log(`✅ Created Daily Assignment Card: ${assignment.id}`);

  // 4. Create In-Session 90M Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: 'Cosmic Chemistry Mission: Lipids, Saponification & Carbohydrates (90 mins)',
      instructions: 'Timed orbital chemistry session covering Lipids and Introduction to Carbohydrates across 8 Planetary Sectors. 30 MCQs (20 Theory + 10 Calculations). 100% English telemetry.',
      time_limit_minutes: 90,
      max_score: 10.0
    }
  });
  console.log(`✅ Created In-Session Assessment: ${assessment.id}`);

  // 5. Populate Questions into Assessment
  let count = 0;
  for (const q of QUESTIONS_DATA) {
    const qType = q.type;
    const questionPayload = {
      content_markdown: q.content_markdown,
      sectionName: q.sectionName,
      options: q.options.map(opt => ({
        id: opt.id,
        text: opt.text
      })),
      // CRITICAL FOR INSTANT SOUND FX & SHAKE ANIMATION ON MISTAKES:
      correct_option_id: q.correct_option_id
    };

    const gradingPayload = {
      correct_option_id: q.correct_option_id,
      explanation: q.explanation
    };

    await prisma.questions.create({
      data: {
        assessment_id: assessment.id,
        order_index: q.order_index,
        points: q.points,
        type: qType,
        question_payload: questionPayload,
        grading_key_payload: gradingPayload
      }
    });
    count++;
  }
  console.log(`✅ Successfully inserted ${count} questions (20 Theory MCQs + 10 Calculations).`);

  // 6. Initialize Assessment Attempt (NOT_STARTED)
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: CONSTANTS.STUDENT_ID,
      status: 'NOT_STARTED'
    }
  });
  console.log(`✅ Initialized Mission Attempt: ${attempt.id} (Status: NOT_STARTED)`);

  console.log('\n🎉 ALL SYSTEMS GO: 17/11/2026 Chemistry Practice Mission deployed successfully for Keithley Lake!');
  return {
    unitId: unit.id,
    assignmentId: assignment.id,
    assessmentId: assessment.id,
    attemptId: attempt.id
  };
}

seed()
  .catch((err) => {
    console.error('❌ Error executing seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
