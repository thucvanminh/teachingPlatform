const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake
  SUBJECT_ID: '6fc7387b-13b8-4e27-8240-a60c03dc1d51', // CHEM_9
  ASSIGNED_DATE: '2026-11-18'
};

const LECTURE_MARKDOWN = `# 🚀 ORBITAL FLIGHT BRIEFING: LESSON 29 • CARBOHYDRATES
**Astronaut Cadet Keithley Lake • Grade 9 Chemistry • 18 November 2026**

---

### 🌐 Interactive 3D Bio-Reactor & Virtual Laboratory
> [!IMPORTANT]
> Launch your interactive Web Studio to manipulate 3D glucose & saccharose molecules, simulate the Tollens silver mirror test in microgravity, run zymase fermentation, and test blood sugar regulation:
> **Interactive Laboratory Link:** [/lectures/chem9-lesson29-carbohydrates-glucose-saccharose/index.html](/lectures/chem9-lesson29-carbohydrates-glucose-saccharose/index.html)

---

## 🎯 Mission Directives: 30 In-Session Cosmic Problems (90 Minutes)
Today's orbital mission covers **SGK pp. 132–135** and **SBT pp. 83–86**:
* **Sectors 1 – 5 (Q1 – Q20):** Core Theory & Conceptual Chemistry
  * Definition of carbohydrates, elemental makeup ($\\text{C, H, O}$), and general formula $\\text{C}_n(\\text{H}_2\\text{O})_m$.
  * Classification: Monosaccharides (Glucose), Disaccharides (Saccharose), Polysaccharides (Starch, Cellulose).
  * Molecular formulas & molar masses: Glucose $\\text{C}_6\\text{H}_{12}\\text{O}_6$ ($M=180\\text{ g/mol}$) vs Saccharose $\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$ ($M=342\\text{ g/mol}$).
  * Physical properties: Colorless crystals, sweet taste, high water solubility, solid densities (Glucose $1.56\\text{ g/cm}^3$, Saccharose $1.58\\text{ g/cm}^3$).
  * Natural sources: Ripe grapes, honey, human blood (~0.1%) vs sugarcane, sugar beet, palmyra palm.
  * Chemical properties:
    * Silver mirror reaction of glucose with $\\text{AgNO}_3 / \\text{NH}_3$ at $70-80^\\circ\\text{C}$ (forming reflective metallic $\\text{Ag}\\downarrow$).
    * Alcoholic fermentation of glucose under yeast enzyme (zymase) $\\to$ ethylic alcohol $+$ carbon dioxide.
    * Acid/enzyme-catalyzed hydrolysis of saccharose $\\to$ equimolar glucose $+$ fructose.
    * Two-step chemical proof of saccharose via hydrolysis followed by silver mirror test.
  * Biological & medical roles: Cellular respiration $\\to 30-32\\text{ ATP}$, pancreatic insulin vs glucagon regulation, oral bacteria and dental caries, and clinical $5.0\\%$ intravenous glucose solutions.
* **Sectors 6 – 8 (Q21 – Q30):** Quantitative Stoichiometry & Calculations
  * Silver mirror mass & reaction yield calculations ($1\\text{ mol glucose} \\to 2\\text{ mol Ag}$).
  * Alcohol fermentation stoichiometry, ethanol yield, and standard $\\text{CO}_2$ gas volume ($V = n \\times 24.79\\text{ L}$).
  * Saccharose hydrolysis product masses, mass conservation with water, and subsequent silver mirror yield.
  * Medical $5.0\\%$ intravenous solution compounding and glucose combustion oxygen consumption.

---

## ⚡ Orbital Quick Formula Weapons
* **General Carbohydrate Formula:** $\\text{C}_n(\\text{H}_2\\text{O})_m$
  $$\\text{Glucose: } \\text{C}_6(\\text{H}_2\\text{O})_6 \\quad (n=6, m=6) \\quad M = 180\\text{ g/mol}$$
  $$\\text{Saccharose: } \\text{C}_{12}(\\text{H}_2\\text{O})_{11} \\quad (n=12, m=11) \\quad M = 342\\text{ g/mol}$$
* **Silver Mirror Reaction (Tollens' Test):**
  $$\\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{Ag}_2\\text{O} \\xrightarrow{\\text{dd NH}_3, 70-80^\\circ\\text{C}} \\text{C}_6\\text{H}_{12}\\text{O}_7 + 2\\text{Ag}\\downarrow$$
  $$\\mathbf{1\\text{ mol Glucose} \\longrightarrow 2\\text{ mol Ag} \\quad (M_{\\text{Ag}} = 108\\text{ g/mol})}$$
  *(Note: Saccharose does NOT react directly with ammoniacal $\\text{AgNO}_3$)*
* **Alcohol Fermentation Reaction:**
  $$\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{yeast (zymase)}, 30-35^\\circ\\text{C}} 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2\\uparrow$$
  $$\\mathbf{1\\text{ mol Glucose} \\longrightarrow 2\\text{ mol Ethanol } (M=46) + 2\\text{ mol } \\text{CO}_2}$$
* **Saccharose Hydrolysis Reaction:**
  $$\\text{C}_{12}\\text{H}_{22}\\text{O}_{11} + \\text{H}_2\\text{O} \\xrightarrow{\\text{Acid/Enzyme}, t^\\circ} \\text{C}_6\\text{H}_{12}\\text{O}_6 \\text{ (glucose)} + \\text{C}_6\\text{H}_{12}\\text{O}_6 \\text{ (fructose)}$$
  $$\\mathbf{1\\text{ mol Saccharose} + 1\\text{ mol } \\text{H}_2\\text{O} \\longrightarrow 1\\text{ mol Glucose} + 1\\text{ mol Fructose}}$$
* **Standard Gas Volume ($25^\\circ\\text{C}, 1\\text{ bar}$):**
  $$V = n \\times 24.79\\text{ L}$$
* **Medical $5\\%$ Solution Preparation:**
  $$m_{\\text{glucose}} = m_{\\text{solution}} \\times 5.0\\% \\implies m_{\\text{water}} = m_{\\text{solution}} - m_{\\text{glucose}}$$

*Engage Station 2 to launch your 90-minute mission!*`;

const QUESTIONS_DATA = [
  // =========================================================================
  // SECTOR 1: MERCURY ORBIT • CARBOHYDRATE FUNDAMENTALS & FORMULAS (Q1 – Q4) [THEORY]
  // =========================================================================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • Elemental Composition',
    content_markdown: 'Cadet Keithley analyzes planetary biomass collected from deep space greenhouses. By biochemical definition, which elemental composition characterizes all carbohydrate compounds, and which element is strictly absent? (SGK p.132, SBT 29.1)',
    options: [
      { id: 'A', text: 'Consist of Carbon, Nitrogen, and Oxygen; Hydrogen is strictly absent.' },
      { id: 'B', text: 'Consist of Carbon, Hydrogen, and Sulfur; Oxygen is strictly absent.' },
      { id: 'C', text: 'Consist of Carbon, Hydrogen, and Phosphorus; Nitrogen is absent.' },
      { id: 'D', text: 'Consist of Carbon, Hydrogen, and Oxygen; Chlorine is strictly absent.' }
    ],
    correct_option_id: 'D',
    explanation: 'Carbohydrates are organic compounds consisting strictly of Carbon, Hydrogen, and Oxygen with general formula Cn(H2O)m (SGK p.132, SBT 29.1). Halogens like Chlorine are absent.'
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • General Formula',
    content_markdown: 'Which general formula represents the elemental relationship found in most natural carbohydrates, including glucose and saccharose? (SGK p.132-133)',
    options: [
      { id: 'A', text: '$\\text{C}_n\\text{H}_{2n+2}$ (saturated alkane family formula)' },
      { id: 'B', text: '$\\text{C}_n(\\text{H}_2\\text{O})_m$ (carbon hydrates general formula)' },
      { id: 'C', text: '$\\text{C}_n\\text{H}_{2n-2}\\text{O}_2$ (unsaturated carboxylic acids)' },
      { id: 'D', text: '$(\\text{RCOO})_3\\text{C}_3\\text{H}_5$ (triglyceride lipid esters)' }
    ],
    correct_option_id: 'B',
    explanation: 'Carbohydrates typically conform to the general formula Cn(H2O)m, literally meaning "hydrates of carbon". For glucose C6H12O6, n=6 and m=6; for saccharose C12H22O11, n=12 and m=11.'
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • Carbohydrate Classification',
    content_markdown: 'In the orbital laboratory storehouse, Cadet Keithley inspects six organic compounds: ethanoic acid, ethanol, glucose, saccharose, starch, and cellulose. How many of these substances belong to the carbohydrate class? (SGK p.132, SBT 29.2)',
    options: [
      { id: 'A', text: '3 substances (glucose, starch, and cellulose)' },
      { id: 'B', text: '4 substances (glucose, saccharose, starch, and cellulose)' },
      { id: 'C', text: '5 substances (ethanol, glucose, saccharose, starch, and cellulose)' },
      { id: 'D', text: '6 substances (all listed organic compounds)' }
    ],
    correct_option_id: 'B',
    explanation: 'Four of the substances are carbohydrates: glucose, saccharose, starch, and cellulose. Ethanoic acid (CH3COOH) is a carboxylic acid, and ethanol (C2H5OH) is an alcohol (SBT 29.2).'
  },
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • Molecular Formulas & Molar Masses',
    content_markdown: 'What are the exact molecular formulas and corresponding molar masses of glucose and saccharose? (SGK p.133, SBT 29.5a)',
    options: [
      { id: 'A', text: 'Glucose: $\\text{C}_6\\text{H}_{12}\\text{O}_6$ ($180\\text{ g/mol}$); Saccharose: $\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$ ($342\\text{ g/mol}$).' },
      { id: 'B', text: 'Glucose: $\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$ ($342\\text{ g/mol}$); Saccharose: $\\text{C}_6\\text{H}_{12}\\text{O}_6$ ($180\\text{ g/mol}$).' },
      { id: 'C', text: 'Glucose: $\\text{C}_6\\text{H}_{10}\\text{O}_5$ ($162\\text{ g/mol}$); Saccharose: $\\text{C}_6\\text{H}_{12}\\text{O}_6$ ($180\\text{ g/mol}$).' },
      { id: 'D', text: 'Glucose: $\\text{C}_5\\text{H}_{10}\\text{O}_5$ ($150\\text{ g/mol}$); Saccharose: $\\text{C}_{10}\\text{H}_{20}\\text{O}_{10}$ ($300\\text{ g/mol}$).' }
    ],
    correct_option_id: 'A',
    explanation: 'Glucose is a hexose monosaccharide with formula C6H12O6 (M = 180 g/mol). Saccharose is a disaccharide with formula C12H22O11 (M = 342 g/mol) (SGK p.133).'
  },

  // =========================================================================
  // SECTOR 2: VENUS BASE • NATURAL OCCURRENCES & PHYSICAL PROPERTIES (Q5 – Q8) [THEORY]
  // =========================================================================
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 2: Venus Base • Common Physical Properties',
    content_markdown: 'Which statement accurately outlines the shared physical characteristics of pure glucose and saccharose under standard planetary atmospheric conditions? (SGK p.133, SBT 29.3, 29.8a)',
    options: [
      { id: 'A', text: 'Volatile pungent liquids that boil readily below $50^\\circ\\text{C}$.' },
      { id: 'B', text: 'Insoluble dark polymers that form fibrous crystalline cords.' },
      { id: 'C', text: 'Colorless crystalline solids with a sweet taste and high water solubility.' },
      { id: 'D', text: 'Opaque yellow powders that dissolve exclusively in liquid hydrocarbons.' }
    ],
    correct_option_id: 'C',
    explanation: 'Both glucose and saccharose exist as colorless (white) crystalline solids at room temperature, are odorless, possess a sweet taste, and dissolve readily in polar water (SGK p.133).'
  },
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 2: Venus Base • Physical Density Telemetry',
    content_markdown: 'According to physical property measurements in the space lab (SGK p.133), what are the physical densities of solid glucose and saccharose, and how do they compare with liquid water ($1.00\\text{ g/cm}^3$)?',
    options: [
      { id: 'A', text: 'Glucose $\\rho = 1.56\\text{ g/cm}^3$ and Saccharose $\\rho = 1.58\\text{ g/cm}^3$; both are denser than water.' },
      { id: 'B', text: 'Glucose $\\rho = 0.82\\text{ g/cm}^3$ and Saccharose $\\rho = 0.91\\text{ g/cm}^3$; both float on water.' },
      { id: 'C', text: 'Glucose $\\rho = 2.70\\text{ g/cm}^3$ and Saccharose $\\rho = 1.00\\text{ g/cm}^3$; glucose sinks while sugar floats.' },
      { id: 'D', text: 'Both compounds have identical densities of exactly $1.00\\text{ g/cm}^3$ matching water.' }
    ],
    correct_option_id: 'A',
    explanation: 'As reported in SGK p.133, glucose has a solid density of 1.56 g/cm3 and saccharose has a density of 1.58 g/cm3. Both are considerably denser than liquid water.'
  },
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 2: Venus Base • Natural Sources of Glucose',
    content_markdown: 'In which natural planetary source is glucose found in highest concentration, earning its common historical designation as "grape sugar"? (SGK p.132-133, SBT 29.8d)',
    options: [
      { id: 'A', text: 'In the fibrous stalks of young bamboo plants.' },
      { id: 'B', text: 'In ripe fruits (especially ripe grapes) and natural bee honey.' },
      { id: 'C', text: 'Exclusively inside the dense root tubers of wild sugar beets.' },
      { id: 'D', text: 'In the woody bark of deep space evergreen conifers.' }
    ],
    correct_option_id: 'B',
    explanation: 'Glucose is abundant in sweet ripe fruits, especially ripe grapes (where it comprises up to 20-30% of juice mass, hence "grape sugar"), in bee honey (~30-40%), and in human blood (~0.1%).'
  },
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 2: Venus Base • Commercial Extraction of Saccharose',
    content_markdown: 'From which agricultural crops is commercial saccharose (table sugar) primarily extracted for use in human food supplies? (SGK p.133, SBT 29.8d)',
    options: [
      { id: 'A', text: 'Exclusively from fermented grape skins and dried apple pulp.' },
      { id: 'B', text: 'From the seeds of planetary cereal grains such as rice and wheat.' },
      { id: 'C', text: 'From the leaves of green tea plants and marine brown seaweed.' },
      { id: 'D', text: 'From sugarcane stalks, sugar beet roots, and palmyra palm sap.' }
    ],
    correct_option_id: 'D',
    explanation: 'Saccharose is accumulated in high quantities in sugarcane (cây mía, 13-16% sugar), sugar beet (củ cải đường, 16-20% sugar), and palmyra palm (thốt nốt) (SGK p.133).'
  },

  // =========================================================================
  // SECTOR 3: EARTH MISSION CONTROL • GLUCOSE CHEMICAL REACTIVITY (Q9 – Q12) [THEORY]
  // =========================================================================
  {
    order_index: 9,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Silver Mirror Reaction Reagent',
    content_markdown: 'When an aqueous glucose solution is mixed with silver nitrate in ammonia ($\\text{AgNO}_3 / \\text{NH}_3$) and warmed to $70-80^\\circ\\text{C}$, what visual phenomenon confirms a positive chemical reaction? (SGK p.133-134, SBT 29.8b)',
    options: [
      { id: 'A', text: 'A brilliant, reflective mirror layer of metallic silver ($\\text{Ag}$) forms on the glass.' },
      { id: 'B', text: 'A dense dark blue precipitate forms and rapidly settles at the tube bottom.' },
      { id: 'C', text: 'A bright orange gaseous plume of nitrogen dioxide erupts vigorously.' },
      { id: 'D', text: 'The solution permanently solidifies into an opaque green gelatinous polymer.' }
    ],
    correct_option_id: 'A',
    explanation: 'Glucose reduces silver ions in ammoniacal silver nitrate solution: metallic silver (Ag) deposits evenly on the inner tube wall, creating a shiny reflective silver mirror (SGK p.134).'
  },
  {
    order_index: 10,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Silver Mirror Mole Ratio',
    content_markdown: 'In the silver mirror reaction of glucose, what is the exact stoichiometric mole ratio between reacting glucose and precipitated metallic silver? (SGK p.134, SBT 29.6a)',
    options: [
      { id: 'A', text: '$1\\text{ mol glucose} \\longrightarrow 1\\text{ mol metallic silver (Ag)}$' },
      { id: 'B', text: '$1\\text{ mol glucose} \\longrightarrow 2\\text{ mol metallic silver (Ag)}$' },
      { id: 'C', text: '$1\\text{ mol glucose} \\longrightarrow 3\\text{ mol metallic silver (Ag)}$' },
      { id: 'D', text: '$1\\text{ mol glucose} \\longrightarrow 4\\text{ mol metallic silver (Ag)}$' }
    ],
    correct_option_id: 'B',
    explanation: 'The balanced reaction is: C6H12O6 + Ag2O → C6H12O7 + 2Ag↓. Thus, 1 mol of glucose oxidizes to produce exactly 2 mol of metallic silver (Ag) (SBT 29.6a).'
  },
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Glucose vs Saccharose Reactivity',
    content_markdown: 'Cadet Keithley performs the ammoniacal silver nitrate test on two unlabeled test tubes: Tube 1 contains glucose and Tube 2 contains saccharose. What observations distinguish the two substances? (SGK p.134, SBT 29.4)',
    options: [
      { id: 'A', text: 'Both Tube 1 and Tube 2 precipitate metallic silver mirrors at equal speeds.' },
      { id: 'B', text: 'Neither tube reacts because carbohydrates are non-reactive with transition metals.' },
      { id: 'C', text: 'Tube 1 (glucose) forms a silver mirror, while Tube 2 (saccharose) does not react.' },
      { id: 'D', text: 'Tube 2 (saccharose) forms a silver mirror, while Tube 1 (glucose) evolves gas.' }
    ],
    correct_option_id: 'C',
    explanation: 'Glucose has a free aldehyde group (-CHO) capable of reducing ammoniacal AgNO3 to metallic Ag. Saccharose does not possess a free aldehyde group and does not undergo the silver mirror reaction directly.'
  },
  {
    order_index: 12,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Industrial Silvering Applications',
    content_markdown: 'Which industrial and optical manufacturing process directly utilizes the silver mirror reaction of glucose? (SGK p.134, SBT 29.5b)',
    options: [
      { id: 'A', text: 'Manufacturing high-strength titanium structural alloys for spacecraft hulls.' },
      { id: 'B', text: 'Vulcanizing synthetic polybutadiene rubbers for astronaut spacesuit seals.' },
      { id: 'C', text: 'Producing agricultural nitrogen fertilizers for closed space greenhouses.' },
      { id: 'D', text: 'Coating glass mirrors and insulating inner vacuum flasks with silver.' }
    ],
    correct_option_id: 'D',
    explanation: 'Industrial silvering of glass mirrors and thermos vacuum flask liners utilizes the mild reduction of silver nitrate by glucose to deposit a uniform, highly reflective silver layer (SGK p.134).'
  },

  // =========================================================================
  // SECTOR 4: MARS OUTPOST • FERMENTATION & SACCHAROSE HYDROLYSIS (Q13 – Q16) [THEORY]
  // =========================================================================
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 4: Mars Outpost • Alcohol Fermentation Reaction',
    content_markdown: 'Under the catalytic action of yeast enzymes (zymase) at $30-35^\\circ\\text{C}$, into which chemical products is glucose converted? (SGK p.134, SBT 29.6b, 29.7a)',
    options: [
      { id: 'A', text: 'Ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$) and carbon dioxide ($\\text{CO}_2$).' },
      { id: 'B', text: 'Acetic acid ($\\text{CH}_3\\text{COOH}$) and hydrogen gas ($\\text{H}_2$).' },
      { id: 'C', text: 'Glycerol ($\\text{C}_3\\text{H}_5(\\text{OH})_3$) and carbon monoxide ($\\text{CO}$).' },
      { id: 'D', text: 'Methanol ($\\text{CH}_3\\text{OH}$) and calcium carbonate ($\\text{CaCO}_3$).' }
    ],
    correct_option_id: 'A',
    explanation: 'Glucose undergoes alcohol fermentation catalyzed by zymase enzymes in yeast: C6H12O6 → 2C2H5OH + 2CO2↑ (SGK p.134).'
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 4: Mars Outpost • Saccharose Hydrolysis Cleavage',
    content_markdown: 'When saccharose is heated in an aqueous solution containing a trace acid or specific enzymes, what chemical transformation occurs? (SGK p.134, SBT 29.5d, 29.6c)',
    options: [
      { id: 'A', text: 'It decomposes directly into pure elemental carbon and water vapor.' },
      { id: 'B', text: 'It condenses into long polymeric starch chains releasing hydrogen gas.' },
      { id: 'C', text: 'It hydrolyzes to form equimolar amounts of glucose and fructose.' },
      { id: 'D', text: 'It oxidizes into acetic acid and carbon dioxide with no sugar remaining.' }
    ],
    correct_option_id: 'C',
    explanation: 'Hydrolysis of saccharose breaks the glycosidic bond: C12H22O11 + H2O → C6H12O6 (glucose) + C6H12O6 (fructose). Exactly 1 mol glucose and 1 mol fructose are generated per mole of saccharose.'
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 4: Mars Outpost • Structural Relationship: Glucose vs Fructose',
    content_markdown: 'What is the structural and molecular relationship between glucose and fructose formed during the hydrolysis of saccharose? (SGK p.134)',
    options: [
      { id: 'A', text: 'They possess different molecular formulas but identical carbon skeletons.' },
      { id: 'B', text: 'They share the identical molecular formula ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) but differ in structure.' },
      { id: 'C', text: 'Fructose is a polymer of glucose containing hundreds of bonded rings.' },
      { id: 'D', text: 'Glucose is an inorganic salt whereas fructose is an unsaturated hydrocarbon.' }
    ],
    correct_option_id: 'B',
    explanation: 'Glucose and fructose have the same molecular formula C6H12O6 (molar mass 180 g/mol) but different structural arrangements of atoms (isomers: glucose is an aldohexose, fructose is a ketohexose) (SGK p.134).'
  },
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 4: Mars Outpost • Two-Step Proof of Saccharose Hydrolysis',
    content_markdown: 'How can Cadet Keithley experimentally prove that a saccharose solution has completely hydrolyzed in the space lab? (SGK p.134)',
    options: [
      { id: 'A', text: 'By measuring a decrease in solution volume when shaken with charcoal.' },
      { id: 'B', text: 'By observing the immediate precipitation of white calcium sulfate crystals.' },
      { id: 'C', text: 'By confirming that the solution becomes non-conductive to electrical current.' },
      { id: 'D', text: 'By neutralizing the hydrolysate and successfully obtaining a silver mirror with $\\text{AgNO}_3/\\text{NH}_3$.' }
    ],
    correct_option_id: 'D',
    explanation: 'Pure saccharose does not give a silver mirror. After acid hydrolysis, the resulting glucose and fructose both reduce ammoniacal AgNO3 to form a reflective silver mirror, proving hydrolysis occurred.'
  },

  // =========================================================================
  // SECTOR 5: JUPITER STATION • BIOLOGICAL ROLES, HEALTH & APPLICATIONS (Q17 – Q20) [THEORY]
  // =========================================================================
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Cellular Energy Role & ATP',
    content_markdown: 'What is the vital physiological role of glucose in human and animal metabolic biochemistry? (SGK p.134, SBT 29.11 Q1)',
    options: [
      { id: 'A', text: 'Serves as the primary instantaneous cellular fuel for ATP energy production.' },
      { id: 'B', text: 'Acts as an inert structural mineral to harden outer bone and tooth enamel.' },
      { id: 'C', text: 'Transports molecular oxygen gas through plasma in place of hemoglobin.' },
      { id: 'D', text: 'Directly insulates sensory nerve fibers against electrical short circuits.' }
    ],
    correct_option_id: 'A',
    explanation: 'Glucose is the essential energy substrate for cells. It is metabolized in cellular respiration (glycolysis, Krebs cycle, oxidative phosphorylation) to synthesize ATP (adenosine triphosphate) (SBT 29.11 Q1).'
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Hormonal Blood Sugar Regulation',
    content_markdown: 'How does the human endocrine system balance blood glucose concentrations when an astronaut experiences hypoglycemia (low blood sugar)? (SBT 29.11 Q4)',
    options: [
      { id: 'A', text: 'The pancreas secretes excess insulin to accelerate glucose storage into body fat.' },
      { id: 'B', text: 'The thyroid gland absorbs circulating glucose to deactivate metabolic enzymes.' },
      { id: 'C', text: 'The pancreas releases glucagon to stimulate liver glycogen breakdown into glucose.' },
      { id: 'D', text: 'The kidneys immediately excrete all circulating electrolytes into urine.' }
    ],
    correct_option_id: 'C',
    explanation: 'When blood glucose drops, the pancreas secretes glucagon, which prompts the liver to break down stored glycogen into free glucose, raising blood sugar back to homeostatic levels (SBT 29.11 Q4).'
  },
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Health Impacts of Excessive Sugar Intake',
    content_markdown: 'What dual physiological hazards arise from chronic excessive intake of glucose and saccharose? (SGK p.134, SBT 29.7d, 29.10)',
    options: [
      { id: 'A', text: 'Rapid bone demineralization and complete failure of red blood cell synthesis.' },
      { id: 'B', text: 'Oral bacterial acid production causing tooth decay, alongside risks of obesity and diabetes.' },
      { id: 'C', text: 'Excessive thickening of skin tissues with zero effect on internal blood vessels.' },
      { id: 'D', text: 'Severe reduction of cellular ATP output leading to total muscular atrophy.' }
    ],
    correct_option_id: 'B',
    explanation: 'Oral bacteria ferment saccharose into acids that corrode tooth enamel, causing caries. Long-term excessive consumption promotes fat accumulation, obesity, cardiovascular issues, and type 2 diabetes (SGK p.134, SBT 29.10).'
  },
  {
    order_index: 20,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Medical 5% Glucose Intravenous Drip',
    content_markdown: 'Why is a $5.0\\%$ (by mass) aqueous glucose solution standard in medical emergency bays and space clinics? (SGK p.134-135, SBT 29.7b)',
    options: [
      { id: 'A', text: 'It permanently numbs surgical pain by blocking neural sodium ion channels.' },
      { id: 'B', text: 'It is an antiseptic bleach that sterilizes contaminated astronaut wounds.' },
      { id: 'C', text: 'It is a heavy radioprotective dye that shields blood cells from cosmic rays.' },
      { id: 'D', text: 'It is isotonic with blood plasma, safely providing hydration and rapid energy.' }
    ],
    correct_option_id: 'D',
    explanation: 'A 5% glucose solution has an osmolarity matching human blood plasma (isotonic). It can be infused intravenously without lysing red blood cells, delivering quick water and metabolic energy to patients (SGK p.134, SBT 29.7b).'
  },

  // =========================================================================
  // SECTOR 6: SATURN RINGS • SILVER MIRROR STOICHIOMETRY & YIELDS (Q21 – Q23) [CALCULATIONS]
  // =========================================================================
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 6: Saturn Rings • Direct Silver Mirror Mass',
    content_markdown: 'Cadet Keithley treats an orbital analytical sample containing $18.0\\text{ g}$ of pure glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6, M = 180\\text{ g/mol}$) with excess ammoniacal silver nitrate solution ($\\text{AgNO}_3 / \\text{NH}_3$) and warms the mixture. Assuming complete reaction, calculate the mass of metallic silver ($\\text{Ag}, M = 108\\text{ g/mol}$) deposited on the container walls.',
    options: [
      { id: 'A', text: '$10.8\\text{ g}$' },
      { id: 'B', text: '$21.6\\text{ g}$' },
      { id: 'C', text: '$43.2\\text{ g}$' },
      { id: 'D', text: '$18.0\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: 'n(glucose) = 18.0 / 180 = 0.10 mol. According to the reaction C6H12O6 + Ag2O → C6H12O7 + 2Ag↓, n(Ag) = 2 × 0.10 = 0.20 mol. Therefore, m(Ag) = 0.20 × 108 = 21.6 g.'
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 6: Saturn Rings • Silver Mirror with Reaction Yield',
    content_markdown: 'In an optical mirror manufacturing test, $36.0\\text{ g}$ of glucose is reacted with excess ammoniacal silver nitrate. Due to microgravity thermal gradients, the silver mirror reaction proceeds with an $80.0\\%$ yield ($H = 80.0\\%$). What is the actual mass of silver ($\\text{Ag}$) deposited?',
    options: [
      { id: 'A', text: '$43.20\\text{ g}$' },
      { id: 'B', text: '$21.60\\text{ g}$' },
      { id: 'C', text: '$34.56\\text{ g}$' },
      { id: 'D', text: '$27.65\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: 'n(glucose) = 36.0 / 180 = 0.20 mol. Theoretical n(Ag) = 2 × 0.20 = 0.40 mol. Theoretical m(Ag) = 0.40 × 108 = 43.20 g. With H = 80%, actual m(Ag) = 43.20 × 0.80 = 34.56 g.'
  },
  {
    order_index: 23,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 6: Saturn Rings • Reverse Stoichiometry: Glucose in Grape Juice',
    content_markdown: 'A $50.0\\text{ mL}$ aliquot of space-grown grape juice is analyzed by reaction with excess ammoniacal silver nitrate. After gentle heating, exactly $2.16\\text{ g}$ of pure metallic silver ($\\text{Ag}$) precipitates (assuming $100\\%$ yield). What mass of glucose was present in the $50.0\\text{ mL}$ juice sample?',
    options: [
      { id: 'A', text: '$1.80\\text{ g}$' },
      { id: 'B', text: '$3.60\\text{ g}$' },
      { id: 'C', text: '$0.90\\text{ g}$' },
      { id: 'D', text: '$2.70\\text{ g}$' }
    ],
    correct_option_id: 'A',
    explanation: 'n(Ag) = 2.16 / 108 = 0.020 mol. From the mole ratio 1 glucose : 2 Ag, n(glucose) = 0.020 / 2 = 0.010 mol. Thus, m(glucose) = 0.010 × 180 = 1.80 g.'
  },

  // =========================================================================
  // SECTOR 7: URANUS DEEP SPACE • FERMENTATION & GAS VOLUMES (Q24 – Q26) [CALCULATIONS]
  // =========================================================================
  {
    order_index: 24,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 7: Uranus Deep Space • Theoretical Ethanol Yield',
    content_markdown: 'An orbital bio-reactor ferments $90.0\\text{ g}$ of pure glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) using active yeast enzyme: $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{yeast}} 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2\\uparrow$. If the fermentation proceeds with $100\\%$ theoretical yield, what mass of pure ethanol ($\\text{C}_2\\text{H}_5\\text{OH}, M = 46\\text{ g/mol}$) is synthesized?',
    options: [
      { id: 'A', text: '$92.0\\text{ g}$' },
      { id: 'B', text: '$23.0\\text{ g}$' },
      { id: 'C', text: '$44.0\\text{ g}$' },
      { id: 'D', text: '$46.0\\text{ g}$' }
    ],
    correct_option_id: 'D',
    explanation: 'n(glucose) = 90.0 / 180 = 0.50 mol. n(ethanol) = 2 × 0.50 = 1.00 mol. Mass of ethanol = 1.00 × 46 = 46.0 g.'
  },
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 7: Uranus Deep Space • Standard Volume of Evolved CO2 Gas',
    content_markdown: 'In an experimental fermentation chamber, $45.0\\text{ g}$ of glucose is fermented with a reaction efficiency of $90.0\\%$ ($H = 90.0\\%$). Calculate the volume of carbon dioxide gas ($\\text{CO}_2$) evolved at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, where $V_{\\text{mol}} = 24.79\\text{ L/mol}$).',
    options: [
      { id: 'A', text: '$12.40\\text{ L}$' },
      { id: 'B', text: '$6.20\\text{ L}$' },
      { id: 'C', text: '$11.16\\text{ L}$' },
      { id: 'D', text: '$9.92\\text{ L}$' }
    ],
    correct_option_id: 'C',
    explanation: 'n(glucose) = 45.0 / 180 = 0.25 mol. Theoretical n(CO2) = 2 × 0.25 = 0.50 mol. Actual n(CO2) = 0.50 × 0.90 = 0.45 mol. Volume V(CO2) = 0.45 × 24.79 = 11.1555 L ≈ 11.16 L.'
  },
  {
    order_index: 26,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 7: Uranus Deep Space • Required Glucose for Target Ethanol',
    content_markdown: 'The orbital habitat requires $92.0\\text{ g}$ of pure ethanol ($\\text{C}_2\\text{H}_5\\text{OH}$) for medical sanitization. If the bio-fermentation facility operates with an efficiency yield of $80.0\\%$ ($H = 80.0\\%$), what mass of glucose must be charged into the fermenter?',
    options: [
      { id: 'A', text: '$180.0\\text{ g}$' },
      { id: 'B', text: '$225.0\\text{ g}$' },
      { id: 'C', text: '$144.0\\text{ g}$' },
      { id: 'D', text: '$281.25\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Target n(ethanol) = 92.0 / 46 = 2.00 mol. Theoretical n(glucose) needed = n(ethanol) / 2 = 1.00 mol. Accounting for H = 80%, actual n(glucose) = 1.00 / 0.80 = 1.25 mol. m(glucose) = 1.25 × 180 = 225.0 g.'
  },

  // =========================================================================
  // SECTOR 8: NEPTUNE FRONTIER • SACCHAROSE HYDROLYSIS & ADVANCED (Q27 – Q30) [CALCULATIONS]
  // =========================================================================
  {
    order_index: 27,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 8: Neptune Frontier • Saccharose Hydrolysis Product Mass',
    content_markdown: 'A closed reactor hydrolyzes $68.4\\text{ g}$ of saccharose ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}, M = 342\\text{ g/mol}$) in dilute aqueous acid: $\\text{C}_{12}\\text{H}_{22}\\text{O}_{11} + \\text{H}_2\\text{O} \\xrightarrow{t^\\circ} \\text{C}_6\\text{H}_{12}\\text{O}_6 \\text{ (glucose)} + \\text{C}_6\\text{H}_{12}\\text{O}_6 \\text{ (fructose)}$. Assuming $100\\%$ complete hydrolysis, what is the combined total mass of the resulting monosaccharides (glucose $+$ fructose)?',
    options: [
      { id: 'A', text: '$72.0\\text{ g}$' },
      { id: 'B', text: '$68.4\\text{ g}$' },
      { id: 'C', text: '$36.0\\text{ g}$' },
      { id: 'D', text: '$86.4\\text{ g}$' }
    ],
    correct_option_id: 'A',
    explanation: 'n(saccharose) = 68.4 / 342 = 0.20 mol. One mole of saccharose reacts with 1 mole of water (18 g/mol) to produce 1 mol glucose + 1 mol fructose. Total product mass = m(saccharose) + m(water) = 68.4 + (0.20 × 18) = 68.4 + 3.6 = 72.0 g (or 0.20 × 180 + 0.20 × 180 = 72.0 g).'
  },
  {
    order_index: 28,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 8: Neptune Frontier • Silver Mirror from Hydrolyzed Saccharose',
    content_markdown: 'A $34.2\\text{ g}$ sample of saccharose ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$) is fully hydrolyzed in dilute acid. The resulting solution is neutralized with sodium hydroxide, and excess ammoniacal silver nitrate is added and heated. Because both glucose and fructose isomerize and reduce silver ions in alkaline medium (yielding $2\\text{ mol Ag}$ per mole of monosaccharide, so $4\\text{ mol Ag}$ per mole of hydrolyzed saccharose), what total mass of metallic silver ($\\text{Ag}, M = 108\\text{ g/mol}$) is recovered?',
    options: [
      { id: 'A', text: '$21.6\\text{ g}$' },
      { id: 'B', text: '$10.8\\text{ g}$' },
      { id: 'C', text: '$43.2\\text{ g}$' },
      { id: 'D', text: '$34.2\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: 'n(saccharose) = 34.2 / 342 = 0.10 mol. Complete hydrolysis produces 0.10 mol glucose and 0.10 mol fructose (0.20 mol reducing monosaccharides total). Each mole of hexose yields 2 mol Ag, so n(Ag) = 2 × 0.20 = 0.40 mol. m(Ag) = 0.40 × 108 = 43.2 g.'
  },
  {
    order_index: 29,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 8: Neptune Frontier • 5% Glucose Drip Solution Compounding',
    content_markdown: 'The flight surgeon orders Cadet Keithley to compound $500.0\\text{ g}$ of sterile $5.0\\%$ (by mass) intravenous glucose solution. What mass of pure anhydrous glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) and what mass of distilled water must be measured and blended?',
    options: [
      { id: 'A', text: '$50.0\\text{ g glucose}$ and $450.0\\text{ g water}$' },
      { id: 'B', text: '$25.0\\text{ g glucose}$ and $475.0\\text{ g water}$' },
      { id: 'C', text: '$5.0\\text{ g glucose}$ and $495.0\\text{ g water}$' },
      { id: 'D', text: '$20.0\\text{ g glucose}$ and $480.0\\text{ g water}$' }
    ],
    correct_option_id: 'B',
    explanation: 'm(glucose) = 500.0 × 5.0% = 25.0 g. m(water) = m(solution) - m(glucose) = 500.0 - 25.0 = 475.0 g.'
  },
  {
    order_index: 30,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 8: Neptune Frontier • Glucose Combustion Oxygen & CO2',
    content_markdown: 'In life support respiration studies, $18.0\\text{ g}$ of glucose is completely oxidized in oxygen: $\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\xrightarrow{t^\\circ} 6\\text{CO}_2 + 6\\text{H}_2\\text{O}$. What volume of carbon dioxide gas ($\\text{CO}_2$) is released at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $V_{\\text{mol}} = 24.79\\text{ L/mol}$)?',
    options: [
      { id: 'A', text: '$2.48\\text{ L}$' },
      { id: 'B', text: '$24.79\\text{ L}$' },
      { id: 'C', text: '$7.44\\text{ L}$' },
      { id: 'D', text: '$14.87\\text{ L}$' }
    ],
    correct_option_id: 'D',
    explanation: 'n(glucose) = 18.0 / 180 = 0.10 mol. n(CO2) = 6 × 0.10 = 0.60 mol. V(CO2) = 0.60 × 24.79 = 14.874 L ≈ 14.87 L.'
  }
];

async function seed() {
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  console.log('===============================================================');
  console.log(`🚀 [Keithley Chemistry Seed] Deploying Lesson 29 Mission`);
  console.log(`👨‍🚀 Student: Keithley Lake (@keithley)`);
  console.log(`📅 Date: ${CONSTANTS.ASSIGNED_DATE} | Mode: BOTH`);
  console.log(`🎯 Total Cosmic Problems: ${QUESTIONS_DATA.length} (20 Theory + 10 Calculations)`);
  console.log('===============================================================');

  // 1. Clean up existing assignments for Keithley on target date
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
    console.log(`⚠️ Found ${existingAsgns.length} existing assignment(s) on ${CONSTANTS.ASSIGNED_DATE}. Cleaning up...`);
    for (const asgn of existingAsgns) {
      for (const att of asgn.assessment_attempts) {
        await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
        await prisma.assessment_attempts.delete({ where: { id: att.id } });
      }
      await prisma.daily_student_assignments.delete({ where: { id: asgn.id } });
    }
    console.log(`✓ Cleaned previous mission records.`);
  }

  // 2. Create Learning Unit (Flight Briefing)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: 'Lesson 29: Carbohydrates, Glucose & Saccharose',
      description: 'Deep Space Carbohydrate Bio-Synthesis, Silver Mirror Stoichiometry & Metabolic Telemetry.',
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
      teacher_daily_note: '🚀 Flight Telemetry Engaged! Welcome to your 90-minute In-Session Mission for 18/11/2026, Astronaut Cadet Keithley! 30 cosmic problems covering Carbohydrates, Glucose silver mirror & fermentation stoichiometry, and Saccharose hydrolysis. Explore the interactive 3D lab studio first, then achieve 100% mission readiness!',
      is_published: true
    }
  });
  console.log(`✅ Created Daily Assignment Card: ${assignment.id}`);

  // 4. Create In-Session Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: 'Cosmic Chemistry In-Session Mission: Carbohydrates, Glucose & Saccharose (90m)',
      instructions: 'Timed celestial chemistry assessment with per-question chronometer controls. 30 problems: 20 conceptual theory problems + 10 quantitative stoichiometry problems across 8 planetary sectors. 100% English telemetry.',
      time_limit_minutes: 90,
      max_score: 10.0
    }
  });
  console.log(`✅ Created In-Session Assessment: ${assessment.id}`);

  // 5. Bulk Create Questions
  for (const q of QUESTIONS_DATA) {
    const questionPayload = {
      content_markdown: q.content_markdown,
      sectionName: q.sectionName,
      options: q.options.map(opt => ({ id: opt.id, text: opt.text })),
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
        type: q.type,
        question_payload: questionPayload,
        grading_key_payload: gradingPayload
      }
    });
  }
  console.log(`✅ Loaded ${QUESTIONS_DATA.length} problems into Assessment questions.`);

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

  console.log('\n🎉 ALL SYSTEMS GO: Lesson 29 Cosmic Chemistry Mission deployed successfully!');
  return {
    unitId: unit.id,
    assignmentId: assignment.id,
    assessmentId: assessment.id,
    attemptId: attempt.id
  };
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
