const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake
  SUBJECT_ID: '6fc7387b-13b8-4e27-8240-a60c03dc1d51', // CHEM_9
  ASSIGNED_DATE: '2026-11-23'
};

const LECTURE_MARKDOWN = "# 🚀 ORBITAL FLIGHT BRIEFING: LESSON 30 • STARCH & CELLULOSE\n**Astronaut Cadet Keithley Lake • Grade 9 Chemistry • 23 November 2026**\n\n---\n\n### 🌐 Interactive 3D Polymer Lab & Colorimetric Bench\n> [!IMPORTANT]\n> Launch your interactive Web Studio to explore 3D **Starch Helical Granules** vs. **Cellulose Microfibril Chains**, run the **Iodine Colorimetric & Banana Ripening Test**, simulate the **Two-Tube Acid Hydrolysis Experiment**, and calculate bio-ethanol yields:\n> **Interactive Laboratory Link:** [/lectures/chem9-lesson30-starch-cellulose/index.html](/lectures/chem9-lesson30-starch-cellulose/index.html)\n\n---\n\n## 🎯 Mission Directives: 30 In-Session Cosmic Problems (90 Minutes)\nToday's orbital mission covers **SGK pp. 135–137** and **SBT pp. 84–86**:\n* **Sectors 1 – 5 (Q1 – Q20):** Core Theory, Lab Protocols & Biological Applications\n  * Molecular formulas: Starch $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$ and Cellulose $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_m$ (natural complex carbohydrates / polysaccharides built from glucose units; monomer unit $M = 162\\text{ g/mol}$; not isomers since $n \\neq m$ and structures differ).\n  * Physical properties & solubility:\n    * **Starch:** White fine powder, insoluble in cold water, partially soluble in hot water forming colloidal **starch paste**. Concentrated in seeds, tubers, and fruits (rice, corn, potato, cassava).\n    * **Cellulose:** White fibrous solid, insoluble in cold water, hot water, and common organic solvents. Concentrated in plant stems and bark (woody trees, cotton, bamboo, jute, hemp).\n  * Photosynthesis & Plant Roles (Fig 30.1): Green plants convert $\\text{CO}_2$ and $\\text{H}_2\\text{O}$ into glucose and release $\\text{O}_2$, balancing atmospheric gases. Glucose converts into **starch** (energy reserve) and **cellulose** (plant cell wall structural framework).\n  * Chemical properties:\n    * **Iodine Color Reaction:** Starch paste reacts with iodine solution ($\\text{I}_2$) to form a deep **blue-violet** complex (fades on heating, reappears on cooling; cellulose does NOT react). Used to detect starch in foods (unripe green banana vs. ripe yellow banana).\n    * **Hydrolysis Reaction:** Both starch and cellulose hydrolyze in acidic medium ($\\text{HCl}$ / $\\text{H}_2\\text{SO}_4$, $t^\\circ$) or under specific enzyme catalysis to produce **glucose** ($\\text{C}_6\\text{H}_{12}\\text{O}_6$).\n    * **Enzyme Specificity:** Human saliva and small intestine contain starch-hydrolyzing enzymes to release glucose energy, but humans lack cellulose-hydrolyzing enzymes.\n  * Applications & Balanced Diet: Nutrition (rice, wheat, corn), adhesive paste, bio-ethanol, paper, textile fibers, and natural/engineered wood.\n* **Sectors 6 – 8 (Q21 – Q30):** Quantitative Stoichiometry & Multi-Step Calculations\n  * Complete hydrolysis mass calculations ($162\\text{ g unit} + 18\\text{ g H}_2\\text{O} \\to 180\\text{ g glucose}$) with sample purity and efficiency yield ($H\\%$).\n  * Reverse mass calculations for target glucose and cassava/corn feedstocks.\n  * Two-step synthesis: Starch/Cellulose $\\to$ Glucose $\\to$ Ethanol ($\\text{C}_2\\text{H}_5\\text{OH}$) $+$ $\\text{CO}_2\\uparrow$ ($V = n \\times 24.79\\text{ L}$ at $25^\\circ\\text{C}, 1\\text{ bar}$).\n  * Hydrolysis followed by Silver Mirror reaction ($1\\text{ mol unit} \\to 1\\text{ mol glucose} \\to 2\\text{ mol Ag}$) and Photosynthesis gas balance ($6n\\text{CO}_2 \\leftrightarrow 6n\\text{O}_2$).\n\n---\n\n## ⚡ Orbital Quick Formula Weapons\n* **Polymer Monomer Unit Molar Mass:**\n  $$M(\\text{C}_6\\text{H}_{10}\\text{O}_5) = 6(12) + 10(1) + 5(16) = 162\\text{ g/mol}$$\n* **Hydrolysis of Starch / Cellulose:**\n  $$(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\text{H}_2\\text{O} \\xrightarrow{\\text{Enzyme or Acid / } t^\\circ} n\\text{C}_6\\text{H}_{12}\\text{O}_6\\text{ (glucose)}$$\n  $$m_{\\text{glucose (actual)}} = \\frac{m_{\\text{pure polymer}}}{162} \\times 180 \\times \\frac{H}{100}$$\n* **Two-Step Bio-Ethanol & $\\text{CO}_2$ Fermentation:**\n  $$(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n \\xrightarrow{+n\\text{H}_2\\text{O},\\, H_1} n\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{yeast},\\, H_2} 2n\\text{C}_2\\text{H}_5\\text{OH} + 2n\\text{CO}_2\\uparrow$$\n  $$n_{\\text{ethanol}} = n_{\\text{CO}_2} = 2 \\times n_{\\text{unit}} \\times \\frac{H_1}{100} \\times \\frac{H_2}{100}$$\n* **Photosynthesis Reaction in Green Plants:**\n  $$6n\\text{CO}_2 + 5n\\text{H}_2\\text{O} \\xrightarrow{\\text{chlorophyll, light}} (\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + 6n\\text{O}_2\\uparrow$$\n* **Standard Gas Volume ($25^\\circ\\text{C}, 1\\text{ bar}$):**\n  $$V = n \\times 24.79\\text{ L}$$\n\n*Engage Station 2 to launch your 90-minute mission!*";

const QUESTIONS_DATA = [
  {
    "order_index": 1,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 1: Mercury Orbit • Molecular Formula",
    "content_markdown": "In the **Mercury Orbit Chemical Lab**, Astronaut Cadet Keithley analyzes purified biopolymer samples extracted from space-grown crops: starch (energy reserve) and cellulose (plant cell wall fiber). Which general molecular formula represents both starch and cellulose?",
    "options": [
      {
        "id": "A",
        "text": "$\\text{C}_5\\text{H}_{10}\\text{O}_5$"
      },
      {
        "id": "B",
        "text": "$\\text{C}_6\\text{H}_{12}\\text{O}_6$"
      },
      {
        "id": "C",
        "text": "$(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$"
      },
      {
        "id": "D",
        "text": "$\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$"
      }
    ],
    "correct_option_id": "C",
    "explanation": "Both starch and cellulose are complex natural polysaccharides composed of many linked glucose units, so both share the general molecular formula $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$ (often written with $n$ for starch and $m$ for cellulose to reflect their different, very large chain lengths). By contrast, $\\text{C}_6\\text{H}_{12}\\text{O}_6$ is glucose (a monosaccharide), $\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$ is sucrose (a disaccharide), and $\\text{C}_5\\text{H}_{10}\\text{O}_5$ is a five-carbon pentose sugar such as ribose."
  },
  {
    "order_index": 2,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 1: Mercury Orbit • Shared Physical Properties",
    "content_markdown": "During routine material diagnostics aboard the **Mercury Orbit Station**, Cadet Keithley compares purified starch and pure cellulose against four physical property logs:\n\n1. Solid state at room temperature\n2. White color\n3. Fine powder form\n4. Insoluble in cold water, yet soluble in hot water\n\nHow many of these four physical properties do starch and cellulose **share in common**?",
    "options": [
      {
        "id": "A",
        "text": "1"
      },
      {
        "id": "B",
        "text": "2"
      },
      {
        "id": "C",
        "text": "3"
      },
      {
        "id": "D",
        "text": "4"
      }
    ],
    "correct_option_id": "B",
    "explanation": "Starch and cellulose share **2** of the listed physical properties: **(1) solid state** at room temperature and **(2) white color**. Property **(3)** applies only to starch, which exists in fine powder form, whereas cellulose has a fibrous (thread-like) structure. Property **(4)** does not match both either: starch is insoluble in cold water and partially dissolves in hot water to form a colloidal starch paste, while cellulose is completely insoluble in both cold and hot water."
  },
  {
    "order_index": 3,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 1: Mercury Orbit • Solubility Telemetry",
    "content_markdown": "In the **Mercury Orbit Solubility Bay**, Cadet Keithley tests pure starch and pure cellulose samples separately in cold water, hot water, and common organic solvents such as ethanol. Which telemetry report accurately summarizes the solubility of these two carbohydrates?",
    "options": [
      {
        "id": "A",
        "text": "Starch is insoluble in cold water and partially dissolves in hot water to form a colloidal paste; cellulose is insoluble in water and organic solvents."
      },
      {
        "id": "B",
        "text": "Starch dissolves completely in cold water to form a transparent solution; cellulose dissolves completely when heated in hot water at boiling temperature."
      },
      {
        "id": "C",
        "text": "Both starch and cellulose are completely insoluble in cold water, yet both biopolymers dissolve rapidly in hot water and in common organic solvents."
      },
      {
        "id": "D",
        "text": "Cellulose partially dissolves in hot water to form a fibrous colloidal paste; starch remains completely insoluble in water and all organic solvents."
      }
    ],
    "correct_option_id": "A",
    "explanation": "At room temperature, starch does not dissolve in cold water, but when heated in hot water its granules swell and partially dissolve to form a thick colloidal suspension known as **starch paste**. In contrast, cellulose has strong hydrogen-bonded fiber chains and does not dissolve in cold water, hot water, or common organic solvents (such as ethanol or ether)."
  },
  {
    "order_index": 4,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 1: Mercury Orbit • Botanical Sources",
    "content_markdown": "The **Mercury Orbit Hydroponic Archive** catalogs plant tissues harvested for crew nutrition and structural biopolymers. Which report correctly identifies where starch and cellulose are naturally concentrated in plants?",
    "options": [
      {
        "id": "A",
        "text": "Starch concentrates in plant stems, bark, and bamboo fibers, whereas cellulose concentrates mainly in edible grains such as rice, corn, and cassava."
      },
      {
        "id": "B",
        "text": "Both starch and cellulose concentrate equally inside plant seeds and underground tubers, while woody stems and tree bark contain neither carbohydrate."
      },
      {
        "id": "C",
        "text": "Cellulose is stored primarily in unripe fruits and potato tubers, whereas starch forms the tough structural fibers of cotton bolls, wood, and jute bark."
      },
      {
        "id": "D",
        "text": "Starch is concentrated in seeds, tubers, and fruits like rice, corn, and potatoes, while cellulose is rich in stems, bark, wood, cotton, and bamboo."
      }
    ],
    "correct_option_id": "D",
    "explanation": "In nature, **starch** serves as a plant energy reserve and is concentrated mainly in seeds, tubers, and fruits—such as rice, corn (maize), wheat, potatoes, and cassava. **Cellulose** forms plant cell walls to provide rigidity and shape, so it is concentrated in plant stems and bark, with very high content in woody trees, cotton bolls, bamboo, reeds, hemp, and jute bark."
  },
  {
    "order_index": 5,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 2: Venus Base • Photosynthesis Formation",
    "content_markdown": "Inside the **Venus Base Pressurized Biodome**, green plants synthesize carbohydrates to sustain the crew's food supply and breathable cabin air. Which statement accurately describes how starch and cellulose form in green plants and regulate atmospheric gases?",
    "options": [
      {
        "id": "A",
        "text": "Green plants convert $\\text{CO}_2$ and $\\text{H}_2\\text{O}$ via photosynthesis into glucose and $\\text{O}_2$, balancing both gases while forming starch and cellulose."
      },
      {
        "id": "B",
        "text": "Green plants absorb $\\text{O}_2$ and $\\text{H}_2\\text{O}$ in sunlight to synthesize glucose from minerals while releasing $\\text{CO}_2$ gas into the habitat."
      },
      {
        "id": "C",
        "text": "Green plants polymerize $\\text{CO}_2$ directly into cellulose fibers in roots without making glucose, and only release $\\text{O}_2$ during nighttime respiration."
      },
      {
        "id": "D",
        "text": "Green plants break down stored starch into $\\text{CO}_2$ and $\\text{H}_2\\text{O}$ during photosynthesis, which continuously raises $\\text{CO}_2$ levels in the biodome air."
      }
    ],
    "correct_option_id": "A",
    "explanation": "The formation of starch and cellulose in green plants begins with **photosynthesis**, which uses sunlight and chlorophyll to convert carbon dioxide ($\\text{CO}_2$) and water ($\\text{H}_2\\text{O}$) into glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) while releasing oxygen gas ($\\text{O}_2$): $6n\\text{CO}_2 + 5n\\text{H}_2\\text{O} \\xrightarrow{\\text{light, chlorophyll}} (\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + 6n\\text{O}_2$ (via intermediate glucose). This process helps balance atmospheric $\\text{CO}_2$ and $\\text{O}_2$, and plants then convert glucose into **starch** for energy storage and **cellulose** for building cell walls."
  },
  {
    "order_index": 6,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 2: Venus Base • Plant Biological Roles",
    "content_markdown": "**Question 6:** Inside the **Venus Base Orbital Greenhouse**, Cadet Keithley Lake analyzes two complex carbohydrates extracted from experimental crops: **starch** and **cellulose**. Although both polysaccharides are synthesized from glucose produced during photosynthesis, which statement accurately contrasts their primary biological roles in plants?",
    "options": [
      {
        "id": "A",
        "text": "Starch builds rigid plant cell walls to keep stems upright, whereas cellulose serves as an emergency energy reserve when glucose levels drop."
      },
      {
        "id": "B",
        "text": "Starch acts as an energy reserve used during glucose shortages, whereas cellulose builds plant cell walls to maintain rigidity and shape."
      },
      {
        "id": "C",
        "text": "Both starch and cellulose primarily build tough structural cell walls, while only simple sugars store energy inside plant seeds and tubers."
      },
      {
        "id": "D",
        "text": "Starch transports mineral ions through plant roots, whereas cellulose regulates oxygen release during photosynthesis inside green leaves."
      }
    ],
    "correct_option_id": "B",
    "explanation": "In green plants, photosynthesis converts $\\text{CO}_2$ and $\\text{H}_2\\text{O}$ into glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$), which is then converted into two complex carbohydrates with distinct biological roles. **Starch** serves as a crucial **energy reserve** stored mainly in seeds, tubers, and fruits—plants draw on this reserve when glucose levels are low. In contrast, **cellulose** is concentrated in plant stems and bark, where its main role is **building plant cell walls** to maintain structural rigidity and shape."
  },
  {
    "order_index": 7,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 2: Venus Base • Structural Architecture",
    "content_markdown": "**Question 7:** Using the high-resolution scanner at **Venus Base**, Keithley compares purified **starch** (from rice and potatoes) with **cellulose** (from cotton and wood fibers). Which description correctly states their physical structure, shared monosaccharide building block, and chemical relationship?",
    "options": [
      {
        "id": "A",
        "text": "Starch consists of long strong fibers, cellulose forms fine granules, and both polymers are built exclusively from fructose units with identical structures."
      },
      {
        "id": "B",
        "text": "Starch has a granular structure, cellulose has a long fibrous structure, and they are built from sucrose units that give them identical chemical structures."
      },
      {
        "id": "C",
        "text": "Starch and cellulose both form long strong fibers made from galactose units, which explains why they share the exact same molecular arrangement."
      },
      {
        "id": "D",
        "text": "Starch has a granular structure, cellulose forms long strong fibers, and both are built from glucose units arranged in different structures."
      }
    ],
    "correct_option_id": "D",
    "explanation": "At the macroscopic and microscopic levels, **starch** has a **granular (powder-like) structure** suited for compact energy storage in potatoes, rice, and corn, whereas **cellulose** forms **long, strong fibers** ideal for constructing plant cell walls, cotton, and paper. Both complex carbohydrates are polysaccharides built solely from **glucose** ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) monosaccharide units, yet they have **different chemical structures** and chain lengths."
  },
  {
    "order_index": 8,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 2: Venus Base • Polymer Unit Molar Mass",
    "content_markdown": "**Question 8:** In the **Venus Base Mass Spectrometry Bay**, Cadet Keithley examines the general molecular formulas of starch, $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$, and cellulose, $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_m$ (given $\\text{C} = 12$, $\\text{H} = 1$, $\\text{O} = 16$). What is the molar mass of one repeating $\\text{C}_6\\text{H}_{10}\\text{O}_5$ unit, and why are starch and cellulose **NOT** isomers?",
    "options": [
      {
        "id": "A",
        "text": "$162\\text{ g/mol}$; they are not isomers because $n \\neq m$ (different molecular masses) and they have different structures."
      },
      {
        "id": "B",
        "text": "$180\\text{ g/mol}$; they are not isomers because starch contains nitrogen atoms while cellulose contains only carbon and oxygen."
      },
      {
        "id": "C",
        "text": "$162\\text{ g/mol}$; they are not isomers because $n = m$ in every plant sample, giving them the exact same chain length and mass."
      },
      {
        "id": "D",
        "text": "$160\\text{ g/mol}$; they are not isomers because cellulose dissolves rapidly in cold water whereas starch remains completely solid."
      }
    ],
    "correct_option_id": "A",
    "explanation": "The molar mass of one repeating $\\text{C}_6\\text{H}_{10}\\text{O}_5$ unit is calculated as: $6 \\times 12 + 10 \\times 1 + 5 \\times 16 = 72 + 10 + 80 = 162\\text{ g/mol}$. Isomers must share the **exact same molecular formula** (same total number of atoms and molecular mass) while differing in structural arrangement. Although both starch $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$ and cellulose $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_m$ share the same empirical repeating unit, their degrees of polymerization differ ($n \\neq m$, with cellulose having much larger chains) and their structures differ, so they are **not isomers**."
  },
  {
    "order_index": 9,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 3: Earth Mission Control • Iodine Color Reaction",
    "content_markdown": "**Question 9:** Back at **Earth Mission Control Bio-Assay Lab**, Cadet Keithley prepares two test tubes: Tube 1 contains $5\\text{ mL}$ of warm **starch paste**, and Tube 2 contains purified **cellulose** fibers suspended in water. When Keithley adds a few drops of **iodine solution** ($\\text{I}_2$) to each tube, what color observations are recorded?",
    "options": [
      {
        "id": "A",
        "text": "Tube 1 (starch paste) turns reddish-brown, while Tube 2 (cellulose) turns deep blue-violet after gentle stirring."
      },
      {
        "id": "B",
        "text": "Both Tube 1 (starch paste) and Tube 2 (cellulose) immediately react with iodine to produce a deep blue-violet mixture."
      },
      {
        "id": "C",
        "text": "Tube 1 (starch paste) forms a deep blue-violet compound, while Tube 2 (cellulose) shows no blue-violet color change."
      },
      {
        "id": "D",
        "text": "Tube 1 (starch paste) turns pale green upon contact, while Tube 2 (cellulose) turns bright golden-yellow in solution."
      }
    ],
    "correct_option_id": "C",
    "explanation": "Adding **iodine solution** ($\\text{I}_2$) is the classic chemical identification test for starch. **Starch paste** reacts with iodine to form a characteristic **deep blue-violet** compound. In contrast, **cellulose** does **not** undergo this color reaction with iodine—no blue-violet color appears in Tube 2."
  },
  {
    "order_index": 10,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 3: Earth Mission Control • Unripe vs Ripe Banana Test",
    "content_markdown": "**Question 10:** At **Earth Mission Control Astro-Nutrition Lab**, Cadet Keithley tests two botanical crew rations—a slice of **green unripe banana** and a slice of **ripe yellow banana**—to detect the presence of starch. Which reagent procedure and predicted result are scientifically accurate?",
    "options": [
      {
        "id": "A",
        "text": "Add silver nitrate in ammonia; the ripe yellow banana turns deep blue-violet because sweet sugars react strongly, whereas the unripe banana stays pale."
      },
      {
        "id": "B",
        "text": "Add drops of iodine solution; the unripe green banana turns deep blue-violet due to high starch, while the ripe banana shows little or no color change."
      },
      {
        "id": "C",
        "text": "Add drops of iodine solution; the ripe yellow banana turns deep blue-violet due to high starch content, whereas the unripe green banana shows no reaction."
      },
      {
        "id": "D",
        "text": "Add hydrochloric acid and boil; the unripe green banana produces shiny silver metal on the surface, while the ripe banana remains completely colorless."
      }
    ],
    "correct_option_id": "B",
    "explanation": "To detect starch in food samples, add a few drops of **iodine solution** ($\\text{I}_2$) directly onto the sample surface (or mashed food suspension). A **green unripe banana** contains a large amount of **starch**, so it reacts with iodine to produce an intense **deep blue-violet** color. During ripening, enzymes hydrolyze most of the starch into sweet simple sugars (such as glucose), so a **ripe yellow banana** produces little or no blue-violet color."
  },
  {
    "order_index": 11,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 3: Earth Mission Control • Complete Hydrolysis Product",
    "content_markdown": "Inside the Earth Mission Control Orbital Bio-Reactor, Cadet Keithley processes two harvested crop polymers—lunar potato starch and hydroponic cotton cellulose—through complete acid-catalyzed hydrolysis. Which single carbohydrate product forms in both reactors, and which balanced molecular equation represents this reaction? (SGK p.136, SBT 30.4)",
    "options": [
      {
        "id": "A",
        "text": "Fructose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$); $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\text{H}_2\\text{O} \\to n\\text{C}_6\\text{H}_{12}\\text{O}_6$"
      },
      {
        "id": "B",
        "text": "Saccharose ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$); $2(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\text{H}_2\\text{O} \\to n\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$"
      },
      {
        "id": "C",
        "text": "Glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$); $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\text{H}_2\\text{O} \\to n\\text{C}_6\\text{H}_{12}\\text{O}_6$"
      },
      {
        "id": "D",
        "text": "Glucose and fructose mixture; $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + 2n\\text{H}_2\\text{O} \\to 2n\\text{C}_6\\text{H}_{12}\\text{O}_6$"
      }
    ],
    "correct_option_id": "C",
    "explanation": "Both starch and cellulose are complex polysaccharides built from repeating $\\text{C}_6\\text{H}_{10}\\text{O}_5$ units. When completely hydrolyzed in an acidic medium or under specific enzyme catalysis, both polymers break down completely into glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) according to the equation: $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\text{H}_2\\text{O} \\to n\\text{C}_6\\text{H}_{12}\\text{O}_6$ (SGK p.136, SBT 30.4)."
  },
  {
    "order_index": 12,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 3: Earth Mission Control • SGK Hydrolysis Experiment",
    "content_markdown": "At Earth Mission Control's microgravity wet lab, Cadet Keithley performs the starch hydrolysis experiment (SGK p.136). Test tube (1) contains $3\\text{ mL}$ of starch paste plus $1\\text{ mL}$ of $2\\text{ M}$ $\\text{HCl}$ solution, while test tube (2) contains $3\\text{ mL}$ of starch paste only. Both tubes are heated in boiling water for $10$ minutes, cooled, and tested with a few drops of iodine solution. What happens in each tube and why?",
    "options": [
      {
        "id": "A",
        "text": "Tube (1) shows no blue-violet color because starch hydrolyzed; tube (2) turns blue-violet as starch remains."
      },
      {
        "id": "B",
        "text": "Tube (1) turns deep blue-violet as acid activates starch; tube (2) shows no color change upon iodine addition."
      },
      {
        "id": "C",
        "text": "Both tubes (1) and (2) turn dark blue-violet because boiling starch paste never reacts in acidic conditions."
      },
      {
        "id": "D",
        "text": "Both tubes (1) and (2) show no blue-violet color because heating for ten minutes decomposes all starch alone."
      }
    ],
    "correct_option_id": "A",
    "explanation": "In test tube (1), hydrochloric acid ($\\text{HCl}$) catalyzes the hydrolysis of starch upon heating into glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$). Because glucose does not give a color reaction with iodine, tube (1) shows no blue-violet color. In test tube (2), without acid catalyst, starch is not hydrolyzed and remains intact, so adding iodine produces the characteristic blue-violet complex (SGK p.136)."
  },
  {
    "order_index": 13,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 4: Mars Outpost • Enzyme Specificity & Human Digestion",
    "content_markdown": "On Mars Outpost, hydroponic wheat grains (rich in starch) and plant stems (rich in cellulose) are analyzed for crew rations. Although both polymers are constructed from glucose units, astronauts gain metabolic energy from eating starch but cannot digest cellulose for energy. Which biochemical explanation accounts for this difference? (SGK p.136, SBT 30.7d, 30.11 Q2b)",
    "options": [
      {
        "id": "A",
        "text": "Cellulose cannot undergo chemical hydrolysis under any acidic, heated, or enzymatic laboratory conditions."
      },
      {
        "id": "B",
        "text": "Human digestive enzymes in saliva and the small intestine convert both polymers into insoluble fat reserves."
      },
      {
        "id": "C",
        "text": "Starch dissolves directly into human blood without hydrolysis, while cellulose blocks all nutrient transport."
      },
      {
        "id": "D",
        "text": "Humans have enzymes in saliva and the small intestine to hydrolyze starch, but lack enzymes for cellulose."
      }
    ],
    "correct_option_id": "D",
    "explanation": "Enzyme catalysis is highly specific: the enzyme that hydrolyzes starch differs from the enzyme required to hydrolyze cellulose. The human body produces starch-hydrolyzing enzymes in saliva and the small intestine to convert starch into glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) for cellular energy, whereas humans lack cellulose-hydrolyzing enzymes and therefore cannot digest cellulose for energy (SGK p.136, SBT 30.11 Q2b)."
  },
  {
    "order_index": 14,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 4: Mars Outpost • Chemical Property Statement Check",
    "content_markdown": "During the Mars Outpost telemetry audit, Cadet Keithley inspects four chemical log entries regarding starch and cellulose (adapted from SBT 30.6 and 30.7):\n\n(1) Starch hydrolysis produces glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$).\n(2) Cellulose does not undergo hydrolysis reactions.\n(3) Starch reacts with iodine solution to form a blue-violet color.\n(4) Starch and cellulose are hydrolyzed by the same enzyme.\n\nHow many of these four statements are **TRUE**?",
    "options": [
      {
        "id": "A",
        "text": "1 true statement"
      },
      {
        "id": "B",
        "text": "2 true statements"
      },
      {
        "id": "C",
        "text": "3 true statements"
      },
      {
        "id": "D",
        "text": "4 true statements"
      }
    ],
    "correct_option_id": "B",
    "explanation": "Statement (1) is TRUE because complete hydrolysis of starch yields glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$). Statement (2) is FALSE because cellulose does undergo hydrolysis in acidic media or under specific enzymes to form glucose. Statement (3) is TRUE because starch paste reacts with iodine to form a characteristic blue-violet complex. Statement (4) is FALSE because starch and cellulose require different, specific enzymes for hydrolysis. Therefore, exactly 2 statements—(1) and (3)—are true."
  },
  {
    "order_index": 15,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 4: Mars Outpost • Distinguishing Carbohydrate Solids",
    "content_markdown": "At Mars Outpost's supply bay, three unlabeled sample vials contain pure white solids: glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$), starch ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$), and cellulose ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_m$). Using only **water** (cold, then heated) and **iodine solution**, which testing sequence reliably distinguishes all three carbohydrates?",
    "options": [
      {
        "id": "A",
        "text": "Add iodine directly to dry powders: glucose dissolves, starch turns red-brown, and cellulose turns blue-violet."
      },
      {
        "id": "B",
        "text": "Add cold water first: cellulose dissolves completely, while heating turns glucose solution blue-violet with iodine."
      },
      {
        "id": "C",
        "text": "Add cold water to dissolve glucose; boil the two insoluble solids, then add iodine to turn starch blue-violet."
      },
      {
        "id": "D",
        "text": "Boil all samples in water first: starch stays completely insoluble, while iodine turns cellulose blue-violet."
      }
    ],
    "correct_option_id": "C",
    "explanation": "First, add cold water to all three samples: glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) dissolves readily to form a clear solution, while both starch and cellulose remain insoluble (SGK p.135). Next, boil the two remaining insoluble solids in water so starch partially dissolves to form starch paste, whereas cellulose stays insoluble. Finally, add iodine solution: the starch paste turns blue-violet, while cellulose shows no blue-violet color reaction."
  },
  {
    "order_index": 16,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 4: Mars Outpost • Industrial & Nutritional Uses of Starch",
    "content_markdown": "At the **Mars Outpost Biosphere Supply Lab**, Cadet Keithley audits incoming cargo crates containing starch ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$) extracted from rice, wheat flour, and corn. Which statement accurately identifies **both** the primary nutritional role and the main industrial applications of starch?",
    "options": [
      {
        "id": "A",
        "text": "Constructs rigid plant cell walls and serves as primary raw material for manufacturing paper sheets and cotton textiles."
      },
      {
        "id": "B",
        "text": "Supplies major human nutrition and makes adhesive paste plus ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$)."
      },
      {
        "id": "C",
        "text": "Delivers zero caloric energy to astronauts and is refined solely into synthetic nylon fibers and industrial polymers."
      },
      {
        "id": "D",
        "text": "Functions strictly as an inorganic mineral nutrient and neutralizes strong hydrochloric acid ($\\text{HCl}$) solutions."
      }
    ],
    "correct_option_id": "B",
    "explanation": "In human nutrition, starch ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$) is a primary energy-supplying nutrient abundant in staple crops such as rice, wheat flour, and corn, because human digestive enzymes hydrolyze it into glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$). In industry, starch is primarily used to make adhesive paste (glue) and as a raw material for producing ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$) and other chemicals. Option A describes cellulose, while Options C and D are scientifically incorrect."
  },
  {
    "order_index": 17,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 5: Jupiter Station • Industrial Uses of Cellulose",
    "content_markdown": "Inside **Jupiter Station's Material Fabrication Bay**, engineering teams process purified cellulose ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_m$) harvested from timber, bamboo, and cotton pods. Which option correctly describes how cellulose is utilized in daily life and industrial production?",
    "options": [
      {
        "id": "A",
        "text": "Preparing staple cereal food rations, baked wheat flour dough, and liquid adhesive paste for sealing cargo."
      },
      {
        "id": "B",
        "text": "Dissolving woody plant fibers directly in cold water to produce sweet glucose syrup and edible ration bars."
      },
      {
        "id": "C",
        "text": "Providing primary human caloric food and reacting with iodine ($\\text{I}_2$) to manufacture blue-violet ink."
      },
      {
        "id": "D",
        "text": "Making paper, textile fibers, natural or engineered wood, and ethanol ($\\text{C}_2\\text{H}_5\\text{OH}$)."
      }
    ],
    "correct_option_id": "D",
    "explanation": "A large quantity of cellulose ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_m$) is used industrially to manufacture paper and textile fibers (such as cotton and linen). Cellulose in the form of natural wood or engineered wood is a common structural material, and cellulose also serves as a chemical feedstock to synthesize industrial ethylic alcohol / ethanol ($\\text{C}_2\\text{H}_5\\text{OH}$). Option A describes uses of starch, Option B is false because cellulose is insoluble in water, and Option C is false because humans lack cellulose-digesting enzymes and cellulose does not turn blue-violet with $\\text{I}_2$."
  },
  {
    "order_index": 18,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 5: Jupiter Station • Passage Analysis: Structure vs Function",
    "passage": "**Jupiter Station Polymer Dossier (Log 30.11):**\nStarch ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$) and cellulose ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_m$) are two complex carbohydrates built from glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) units, both playing vital roles in living organisms and daily applications. Starch possesses a **granular structure** and acts as a primary energy reserve found in staple foods such as potatoes, rice, and corn, where digestive enzymes readily hydrolyze it into glucose. In contrast, cellulose possesses a **long, strong fibrous structure** that is insoluble in water, constructs rigid plant cell walls, and serves as the main component of paper and cotton. Their fundamental difference lies not only in their molecular structure, but also in how they are applied in biology and industry.",
    "content_markdown": "Based on the **Jupiter Station Polymer Dossier** above, why is cellulose chosen for manufacturing paper and cotton while starch is preferred as an energy-storage reserve?",
    "options": [
      {
        "id": "A",
        "text": "Cellulose forms long, durable fibers for strength, whereas granular starch easily hydrolyzes into glucose."
      },
      {
        "id": "B",
        "text": "Cellulose dissolves rapidly in cold water to form sticky sheets, whereas starch forms rigid wooden crystals."
      },
      {
        "id": "C",
        "text": "Cellulose contains nitrogen atoms that harden paper pulp, whereas starch provides only structural framing."
      },
      {
        "id": "D",
        "text": "Cellulose breaks down faster with human saliva enzymes, whereas starch resists acid and enzyme hydrolysis."
      }
    ],
    "correct_option_id": "A",
    "explanation": "Structure determines function: cellulose ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_m$) consists of long, strong, water-insoluble fibers that interweave into durable sheets and threads, making it ideal for plant cell walls, paper, and cotton textiles. Meanwhile, starch ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$) has a compact granular structure that living organisms and human digestive enzymes can readily hydrolyze into glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) to store and release energy."
  },
  {
    "order_index": 19,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 5: Jupiter Station • Balanced Dietary Starch Telemetry",
    "content_markdown": "**Jupiter Station Med-Bay Telemetry** tracks crew carbohydrate metabolism. Foods rich in starch—such as rice, bread, corn, and potatoes—are hydrolyzed by human enzymes in saliva and the small intestine to release glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$). Which dietary practice represents a **scientifically balanced** use of starch for astronauts?",
    "options": [
      {
        "id": "A",
        "text": "Consume only refined white flour and sugary pastries at every meal to maximize continuous energy storage."
      },
      {
        "id": "B",
        "text": "Eliminate all starchy staples completely because human digestive glands lack enzymes to hydrolyze starch."
      },
      {
        "id": "C",
        "text": "Pair moderate starch with proteins, vitamins, and fiber to supply glucose without excess fat gain."
      },
      {
        "id": "D",
        "text": "Replace all dietary starch with pure cellulose wood pulp so the small intestine extracts faster calories."
      }
    ],
    "correct_option_id": "C",
    "explanation": "Starchy foods (rice, corn, potatoes, whole grains) provide steady glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) energy for physical and brain activity through enzymatic hydrolysis in saliva and the small intestine. However, a balanced diet requires moderate portions combined with proteins, lipids, vitamins, minerals, and dietary fiber. Overeating refined starch or relying on starch alone causes excess energy storage (weight gain) and nutrient deficiencies, whereas eliminating starch removes the body's main fuel, and humans lack enzymes to digest cellulose."
  },
  {
    "order_index": 20,
    "type": "MULTIPLE_CHOICE",
    "points": 0.33,
    "sectionName": "Sector 5: Jupiter Station • Experimental Protocol Check",
    "content_markdown": "In **Jupiter Station's Orbital Wet Lab**, Cadet Keithley performs the starch hydrolysis experiment: **Tube 1** contains $3\\text{ mL}$ of starch paste plus $1\\text{ mL}$ of $2\\text{ M HCl}$, while **Tube 2** contains only $3\\text{ mL}$ of starch paste. After heating both tubes in a boiling water bath for $10$ minutes, why **must** both tubes be cooled to room temperature before adding iodine ($\\text{I}_2$) solution?",
    "options": [
      {
        "id": "A",
        "text": "Hot $\\text{HCl}$ reacts violently with iodine to precipitate solid white glucose crystals in Tube 1."
      },
      {
        "id": "B",
        "text": "The blue-violet starch–iodine complex fades when hot, causing a false negative in Tube 2."
      },
      {
        "id": "C",
        "text": "Cooling forces glucose molecules in Tube 1 to recombine instantly back into insoluble starch."
      },
      {
        "id": "D",
        "text": "Iodine turns cellulose fibers bright green at boiling temperature and masks the yellow starch."
      }
    ],
    "correct_option_id": "B",
    "explanation": "In Tube 1, acid-catalyzed hydrolysis ($(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\text{H}_2\\text{O} \\xrightarrow{\\text{HCl}, t^\\circ} n\\text{C}_6\\text{H}_{12}\\text{O}_6$) converts starch into glucose, which does not form a blue-violet complex with $\\text{I}_2$. In Tube 2 (the unhydrolyzed control), starch remains intact. However, the blue-violet starch–iodine complex is thermally unstable and fades at high temperatures, only reappearing upon cooling. Adding $\\text{I}_2$ while Tube 2 is still hot would prevent the blue-violet color from appearing—creating a false negative that hides the difference between Tube 1 and Tube 2."
  },
  {
    "order_index": 21,
    "type": "MULTIPLE_CHOICE",
    "points": 0.34,
    "sectionName": "Sector 6: Saturn Rings • Complete Starch Hydrolysis",
    "content_markdown": "Inside the Saturn Rings Orbital Bio-Reactor, Astronaut Cadet Keithley initiates complete acid hydrolysis ($100\\%$ yield) of $162.0\\text{ g}$ of pure starch, $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$, to generate emergency nutrient glucose:\n\n$$(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+,\\, t^\\circ} n\\text{C}_6\\text{H}_{12}\\text{O}_6$$\n\nGiven $C = 12$, $H = 1$, and $O = 16$, calculate both the mass of glucose produced and the mass of water reacted.",
    "options": [
      {
        "id": "A",
        "text": "$162.0\\text{ g}$ glucose and $18.0\\text{ g}$ water"
      },
      {
        "id": "B",
        "text": "$144.0\\text{ g}$ glucose and $18.0\\text{ g}$ water"
      },
      {
        "id": "C",
        "text": "$180.0\\text{ g}$ glucose and $36.0\\text{ g}$ water"
      },
      {
        "id": "D",
        "text": "$180.0\\text{ g}$ glucose and $18.0\\text{ g}$ water"
      }
    ],
    "correct_option_id": "D",
    "explanation": "**Step 1 — Molar masses of the reacting monomer unit, water, and glucose:**\n$$M(\\text{C}_6\\text{H}_{10}\\text{O}_5) = 6(12) + 10(1) + 5(16) = 162\\text{ g/mol}$$\n$$M(\\text{H}_2\\text{O}) = 2(1) + 16 = 18\\text{ g/mol}$$\n$$M(\\text{C}_6\\text{H}_{12}\\text{O}_6) = 6(12) + 12(1) + 6(16) = 180\\text{ g/mol}$$\n\n**Step 2 — Moles of starch monomer units:**\n$$n(\\text{C}_6\\text{H}_{10}\\text{O}_5) = \\frac{162.0}{162} = 1.00\\text{ mol}$$\n\n**Step 3 — Mass of water reacted and glucose produced ($100\\%$ yield):**\nFrom the $1:1:1$ monomer-to-water-to-glucose molar ratio:\n- $n(\\text{H}_2\\text{O}) = 1.00\\text{ mol} \\implies m(\\text{H}_2\\text{O}) = 1.00 \\times 18 = 18.0\\text{ g}$\n- $n(\\text{C}_6\\text{H}_{12}\\text{O}_6) = 1.00\\text{ mol} \\implies m(\\text{C}_6\\text{H}_{12}\\text{O}_6) = 1.00 \\times 180 = 180.0\\text{ g}$\n\n(Conservation of mass check: $162.0\\text{ g} + 18.0\\text{ g} = 180.0\\text{ g}$.)"
  },
  {
    "order_index": 22,
    "type": "MULTIPLE_CHOICE",
    "points": 0.34,
    "sectionName": "Sector 6: Saturn Rings • Rice Flour Hydrolysis (SBT 30.10)",
    "content_markdown": "In the Saturn Rings Hydroponics Bay, Cadet Keithley processes a $10.0\\text{ g}$ ration sample of orbital rice flour containing $80.0\\%$ starch by mass. Complete acid hydrolysis proceeds with a reaction yield of $H = 90.0\\%$ ($M_{\\text{starch unit}} = 162\\text{ g/mol}$, $M_{\\text{glucose}} = 180\\text{ g/mol}$). Calculate the mass of glucose obtained.",
    "options": [
      {
        "id": "A",
        "text": "$7.20\\text{ g}$"
      },
      {
        "id": "B",
        "text": "$8.89\\text{ g}$"
      },
      {
        "id": "C",
        "text": "$8.00\\text{ g}$"
      },
      {
        "id": "D",
        "text": "$10.0\\text{ g}$"
      }
    ],
    "correct_option_id": "C",
    "explanation": "**Step 1 — Mass of pure starch in the rice flour sample:**\n$$m_{\\text{starch}} = 10.0 \\times \\frac{80.0}{100} = 8.00\\text{ g}$$\n\n**Step 2 — Moles of starch monomer units:**\n$$n_{\\text{starch unit}} = \\frac{8.00}{162}\\text{ mol}$$\n\n**Step 3 — Actual mass of glucose obtained at $H = 90.0\\%$:**\nSince $1\\text{ mol}$ of $\\text{C}_6\\text{H}_{10}\\text{O}_5$ unit theoretically produces $1\\text{ mol}$ of $\\text{C}_6\\text{H}_{12}\\text{O}_6$:\n$$m_{\\text{glucose (actual)}} = \\frac{8.00}{162} \\times 180 \\times \\frac{90.0}{100} = 8.00\\text{ g}$$"
  },
  {
    "order_index": 23,
    "type": "MULTIPLE_CHOICE",
    "points": 0.34,
    "sectionName": "Sector 6: Saturn Rings • Potato Starch Yield Telemetry",
    "content_markdown": "Telemetry from the Saturn Rings Planetary Lab logs the hydrolysis of $324.0\\text{ g}$ of pure space-grown potato starch in hot dilute $\\text{H}_2\\text{SO}_4$. The reactor operates at $85.0\\%$ efficiency ($H = 85.0\\%$). Given $M(\\text{C}_6\\text{H}_{10}\\text{O}_5) = 162\\text{ g/mol}$ and $M(\\text{C}_6\\text{H}_{12}\\text{O}_6) = 180\\text{ g/mol}$, calculate the actual mass of glucose produced.",
    "options": [
      {
        "id": "A",
        "text": "$306.0\\text{ g}$"
      },
      {
        "id": "B",
        "text": "$275.4\\text{ g}$"
      },
      {
        "id": "C",
        "text": "$360.0\\text{ g}$"
      },
      {
        "id": "D",
        "text": "$423.5\\text{ g}$"
      }
    ],
    "correct_option_id": "A",
    "explanation": "**Step 1 — Moles of pure potato starch monomer units:**\n$$n_{\\text{starch unit}} = \\frac{324.0}{162} = 2.00\\text{ mol}$$\n\n**Step 2 — Theoretical mass of glucose ($100\\%$ yield):**\n$$n_{\\text{glucose (theory)}} = 2.00\\text{ mol} \\implies m_{\\text{glucose (theory)}} = 2.00 \\times 180 = 360.0\\text{ g}$$\n\n**Step 3 — Actual mass of glucose at $H = 85.0\\%$:**\n$$m_{\\text{glucose (actual)}} = 360.0 \\times \\frac{85.0}{100} = 306.0\\text{ g}$$"
  },
  {
    "order_index": 24,
    "type": "MULTIPLE_CHOICE",
    "points": 0.34,
    "sectionName": "Sector 6: Saturn Rings • Reverse Cellulose Requirement",
    "content_markdown": "The Saturn Rings Orbital Bio-Lab must synthesize $270.0\\text{ g}$ of pure glucose from pure cellulose, $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n$, using an acid hydrolysis chamber that operates at $75.0\\%$ efficiency ($H = 75.0\\%$). Given $M(\\text{C}_6\\text{H}_{10}\\text{O}_5) = 162\\text{ g/mol}$ and $M(\\text{C}_6\\text{H}_{12}\\text{O}_6) = 180\\text{ g/mol}$, calculate the required mass of pure cellulose.",
    "options": [
      {
        "id": "A",
        "text": "$182.3\\text{ g}$"
      },
      {
        "id": "B",
        "text": "$243.0\\text{ g}$"
      },
      {
        "id": "C",
        "text": "$360.0\\text{ g}$"
      },
      {
        "id": "D",
        "text": "$324.0\\text{ g}$"
      }
    ],
    "correct_option_id": "D",
    "explanation": "**Step 1 — Actual moles of glucose needed:**\n$$n_{\\text{glucose (actual)}} = \\frac{270.0}{180} = 1.50\\text{ mol}$$\n\n**Step 2 — Theoretical moles of cellulose monomer units required (accounting for $H = 75.0\\%$):**\nBecause the process only converts $75.0\\%$ of the reactant:\n$$n_{\\text{cellulose unit}} = \\frac{1.50}{0.75} = 2.00\\text{ mol}$$\n\n**Step 3 — Required mass of pure cellulose:**\n$$m_{\\text{cellulose}} = 2.00 \\times 162 = 324.0\\text{ g}$$"
  },
  {
    "order_index": 25,
    "type": "MULTIPLE_CHOICE",
    "points": 0.34,
    "sectionName": "Sector 7: Uranus Deep Space • Cotton Fiber Cellulose Hydrolysis",
    "content_markdown": "At the Uranus Deep Space Research Outpost, a $500.0\\text{ g}$ sample of space-grown cotton fiber contains $97.2\\%$ pure cellulose by mass (the remainder is moisture and non-reactive ash). If acid hydrolysis proceeds with $80.0\\%$ efficiency ($H = 80.0\\%$), what mass of glucose is recovered? ($M_{\\text{cellulose unit}} = 162\\text{ g/mol}$, $M_{\\text{glucose}} = 180\\text{ g/mol}$)",
    "options": [
      {
        "id": "A",
        "text": "$388.8\\text{ g}$"
      },
      {
        "id": "B",
        "text": "$432.0\\text{ g}$"
      },
      {
        "id": "C",
        "text": "$444.4\\text{ g}$"
      },
      {
        "id": "D",
        "text": "$540.0\\text{ g}$"
      }
    ],
    "correct_option_id": "B",
    "explanation": "**Step 1 — Mass of pure cellulose in the cotton fiber:**\n$$m_{\\text{cellulose}} = 500.0 \\times \\frac{97.2}{100} = 486.0\\text{ g}$$\n\n**Step 2 — Moles of cellulose monomer units:**\n$$n_{\\text{cellulose unit}} = \\frac{486.0}{162} = 3.00\\text{ mol}$$\n\n**Step 3 — Theoretical mass of glucose ($100\\%$ yield):**\n$$m_{\\text{glucose (theory)}} = 3.00 \\times 180 = 540.0\\text{ g}$$\n\n**Step 4 — Actual mass of glucose recovered at $H = 80.0\\%$:**\n$$m_{\\text{glucose (actual)}} = 540.0 \\times \\frac{80.0}{100} = 432.0\\text{ g}$$"
  },
  {
    "order_index": 26,
    "type": "MULTIPLE_CHOICE",
    "points": 0.34,
    "sectionName": "Sector 7: Uranus Deep Space • Two-Step Starch-to-Ethanol Synthesis",
    "content_markdown": "Aboard the Uranus Orbital Bio-Reactor, Cadet Keithley processes $324.0\\text{ g}$ of pure starch through acid hydrolysis to produce glucose, followed immediately by yeast fermentation to synthesize ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$) for thruster fuel. If the overall two-step efficiency is $75.0\\%$, calculate the mass of pure ethanol obtained. (Given: $M(\\text{C}_6\\text{H}_{10}\\text{O}_5) = 162\\text{ g/mol}$, $M(\\text{C}_2\\text{H}_5\\text{OH}) = 46\\text{ g/mol}$.)",
    "options": [
      {
        "id": "A",
        "text": "$92.0\\text{ g}$"
      },
      {
        "id": "B",
        "text": "$276.0\\text{ g}$"
      },
      {
        "id": "C",
        "text": "$184.0\\text{ g}$"
      },
      {
        "id": "D",
        "text": "$138.0\\text{ g}$"
      }
    ],
    "correct_option_id": "D",
    "explanation": "Step 1: Reaction scheme per anhydroglucose unit: $(\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + n\\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+, t^\\circ} n\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{yeast}} 2n\\text{C}_2\\text{H}_5\\text{OH} + 2n\\text{CO}_2\\uparrow$. Step 2: Moles of starch unit reacted: $n_{\\text{unit}} = \\frac{324.0}{162} = 2.00\\text{ mol}$. Step 3: Theoretical moles of ethanol: $n_{\\text{theo}}(\\text{C}_2\\text{H}_5\\text{OH}) = 2 \\times 2.00 = 4.00\\text{ mol}$. Step 4: Actual moles of ethanol at $75.0\\%$ overall efficiency: $n_{\\text{actual}}(\\text{C}_2\\text{H}_5\\text{OH}) = 4.00 \\times 0.75 = 3.00\\text{ mol}$. Step 5: Mass of pure ethanol obtained: $m(\\text{C}_2\\text{H}_5\\text{OH}) = 3.00 \\times 46 = 138.0\\text{ g}$."
  },
  {
    "order_index": 27,
    "type": "MULTIPLE_CHOICE",
    "points": 0.34,
    "sectionName": "Sector 7: Uranus Deep Space • Evolved CO2 from Corn Flour Fermentation",
    "content_markdown": "In the Uranus Hydroponic Fermentation Bay, $405.0\\text{ g}$ of corn flour containing $80.0\\%$ starch by mass undergoes acid hydrolysis with an efficiency of $H_1 = 90.0\\%$, followed by yeast fermentation with an efficiency of $H_2 = 80.0\\%$. Calculate the volume of carbon dioxide ($\\text{CO}_2$) gas released for greenhouse enrichment at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $V_{\\text{mol}} = 24.79\\text{ L/mol}$). (Given: $M(\\text{C}_6\\text{H}_{10}\\text{O}_5) = 162\\text{ g/mol}$.)",
    "options": [
      {
        "id": "A",
        "text": "$35.70\\text{ L}$"
      },
      {
        "id": "B",
        "text": "$89.24\\text{ L}$"
      },
      {
        "id": "C",
        "text": "$71.40\\text{ L}$"
      },
      {
        "id": "D",
        "text": "$99.16\\text{ L}$"
      }
    ],
    "correct_option_id": "C",
    "explanation": "Step 1: Mass of pure starch in corn flour: $m_{\\text{starch}} = 405.0 \\times 0.80 = 324.0\\text{ g}$. Step 2: Moles of $\\text{C}_6\\text{H}_{10}\\text{O}_5$ unit: $n_{\\text{unit}} = \\frac{324.0}{162} = 2.00\\text{ mol}$. Step 3: Stoichiometry per unit: $1\\text{ mol }\\text{C}_6\\text{H}_{10}\\text{O}_5 \\to 1\\text{ mol }\\text{C}_6\\text{H}_{12}\\text{O}_6 \\to 2\\text{ mol }\\text{CO}_2$. Accounting for both step yields: $n(\\text{CO}_2) = 2 \\times 2.00 \\times 0.90 \\times 0.80 = 2.88\\text{ mol}$. Step 4: Gas volume at $25^\\circ\\text{C}, 1\\text{ bar}$: $V(\\text{CO}_2) = 2.88 \\times 24.79 = 71.3952\\text{ L} \\approx 71.40\\text{ L}$."
  },
  {
    "order_index": 28,
    "type": "MULTIPLE_CHOICE",
    "points": 0.34,
    "sectionName": "Sector 8: Neptune Frontier • Hydrolysis + Silver Mirror Verification",
    "content_markdown": "To calibrate the Neptune Frontier optical reflector sensor, $81.0\\text{ g}$ of pure starch is hydrolyzed in dilute acid with $80.0\\%$ efficiency. After neutralizing the acid completely, all of the resulting glucose reacts with excess $\\text{AgNO}_3/\\text{NH}_3$ solution. Calculate the mass of metallic silver ($\\text{Ag}$) deposited on the sensor plate. (Given: $M(\\text{C}_6\\text{H}_{10}\\text{O}_5) = 162\\text{ g/mol}$, $M(\\text{Ag}) = 108\\text{ g/mol}$.)",
    "options": [
      {
        "id": "A",
        "text": "$86.4\\text{ g}$"
      },
      {
        "id": "B",
        "text": "$43.2\\text{ g}$"
      },
      {
        "id": "C",
        "text": "$108.0\\text{ g}$"
      },
      {
        "id": "D",
        "text": "$135.0\\text{ g}$"
      }
    ],
    "correct_option_id": "A",
    "explanation": "Step 1: Moles of $\\text{C}_6\\text{H}_{10}\\text{O}_5$ unit in starch: $n_{\\text{unit}} = \\frac{81.0}{162} = 0.50\\text{ mol}$. Step 2: Actual moles of glucose formed at $80.0\\%$ hydrolysis efficiency: $n(\\text{C}_6\\text{H}_{12}\\text{O}_6) = 0.50 \\times 0.80 = 0.40\\text{ mol}$. Step 3: In the silver mirror reaction, $1\\text{ mol }\\text{C}_6\\text{H}_{12}\\text{O}_6$ reduces excess $\\text{Ag}^+$ to $2\\text{ mol }\\text{Ag}$: $n(\\text{Ag}) = 2 \\times 0.40 = 0.80\\text{ mol}$. Step 4: Mass of metallic silver deposited: $m(\\text{Ag}) = 0.80 \\times 108 = 86.4\\text{ g}$."
  },
  {
    "order_index": 29,
    "type": "MULTIPLE_CHOICE",
    "points": 0.34,
    "sectionName": "Sector 8: Neptune Frontier • Reverse Cassava Requirement for Bio-Ethanol",
    "content_markdown": "The Neptune Orbital Propulsion Depot requires $276.0\\text{ g}$ of pure ethanol ($\\text{C}_2\\text{H}_5\\text{OH}$) synthesized from cargo cassava flour containing $81.0\\%$ starch by mass. Given that the Step 1 hydrolysis yield is $80.0\\%$ and the Step 2 fermentation yield is $75.0\\%$, calculate the mass of cassava flour needed for this production run. (Given: $M(\\text{C}_6\\text{H}_{10}\\text{O}_5) = 162\\text{ g/mol}$, $M(\\text{C}_2\\text{H}_5\\text{OH}) = 46\\text{ g/mol}$.)",
    "options": [
      {
        "id": "A",
        "text": "$0.60\\text{ kg}$"
      },
      {
        "id": "B",
        "text": "$0.81\\text{ kg}$"
      },
      {
        "id": "C",
        "text": "$2.00\\text{ kg}$"
      },
      {
        "id": "D",
        "text": "$1.00\\text{ kg}$"
      }
    ],
    "correct_option_id": "D",
    "explanation": "Step 1: Moles of ethanol required: $n(\\text{C}_2\\text{H}_5\\text{OH}) = \\frac{276.0}{46} = 6.00\\text{ mol}$. Step 2: Theoretical moles of $\\text{C}_6\\text{H}_{10}\\text{O}_5$ unit needed ($1:2$ ratio): $n_{\\text{unit, theo}} = \\frac{6.00}{2} = 3.00\\text{ mol}$. Step 3: Overall process efficiency: $H_{\\text{total}} = 0.80 \\times 0.75 = 0.60$ ($60.0\\%$). Step 4: Actual moles of $\\text{C}_6\\text{H}_{10}\\text{O}_5$ unit needed: $n_{\\text{unit, actual}} = \\frac{3.00}{0.60} = 5.00\\text{ mol}$, giving pure starch mass $m_{\\text{starch}} = 5.00 \\times 162 = 810.0\\text{ g}$. Step 5: Required cassava flour mass ($81.0\\%$ purity): $m_{\\text{cassava}} = \\frac{810.0}{0.81} = 1000.0\\text{ g} = 1.00\\text{ kg}$."
  },
  {
    "order_index": 30,
    "type": "MULTIPLE_CHOICE",
    "points": 0.34,
    "sectionName": "Sector 8: Neptune Frontier • Greenhouse Photosynthesis Balance",
    "content_markdown": "Inside the Neptune Frontier Life-Support Dome, orbital botanical modules synthesize $162.0\\text{ g}$ of cellulose via photosynthesis: $6n\\text{CO}_2 + 5n\\text{H}_2\\text{O} \\xrightarrow{\\text{chlorophyll, light}} (\\text{C}_6\\text{H}_{10}\\text{O}_5)_n + 6n\\text{O}_2\\uparrow$. Calculate the mass of $\\text{CO}_2$ absorbed and the volume of $\\text{O}_2$ gas released at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $V_{\\text{mol}} = 24.79\\text{ L/mol}$). (Given: $M(\\text{C}_6\\text{H}_{10}\\text{O}_5) = 162\\text{ g/mol}$, $M(\\text{CO}_2) = 44\\text{ g/mol}$.)",
    "options": [
      {
        "id": "A",
        "text": "$m(\\text{CO}_2) = 220.0\\text{ g};\\ V(\\text{O}_2) = 123.95\\text{ L}$"
      },
      {
        "id": "B",
        "text": "$m(\\text{CO}_2) = 264.0\\text{ g};\\ V(\\text{O}_2) = 148.74\\text{ L}$"
      },
      {
        "id": "C",
        "text": "$m(\\text{CO}_2) = 264.0\\text{ g};\\ V(\\text{O}_2) = 134.40\\text{ L}$"
      },
      {
        "id": "D",
        "text": "$m(\\text{CO}_2) = 132.0\\text{ g};\\ V(\\text{O}_2) = 148.74\\text{ L}$"
      }
    ],
    "correct_option_id": "B",
    "explanation": "Step 1: Moles of $\\text{C}_6\\text{H}_{10}\\text{O}_5$ cellulose unit synthesized: $n_{\\text{unit}} = \\frac{162.0}{162} = 1.00\\text{ mol}$. Step 2: From the balanced photosynthesis equation, $1\\text{ mol}$ of $\\text{C}_6\\text{H}_{10}\\text{O}_5$ unit requires $6\\text{ mol }\\text{CO}_2$ and releases $6\\text{ mol }\\text{O}_2$. Step 3: Mass of $\\text{CO}_2$ absorbed: $n(\\text{CO}_2) = 6 \\times 1.00 = 6.00\\text{ mol} \\implies m(\\text{CO}_2) = 6.00 \\times 44 = 264.0\\text{ g}$. Step 4: Volume of $\\text{O}_2$ gas released at $25^\\circ\\text{C}, 1\\text{ bar}$: $n(\\text{O}_2) = 6.00\\text{ mol} \\implies V(\\text{O}_2) = 6.00 \\times 24.79 = 148.74\\text{ L}$."
  }
];

async function seed() {
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  console.log('===============================================================');
  console.log('🚀 [Keithley Chemistry Seed] Deploying Lesson 30 Mission');
  console.log('👨‍🚀 Student: Keithley Lake (@keithley)');
  console.log(`📅 Date: ${CONSTANTS.ASSIGNED_DATE} | Mode: BOTH`);
  console.log(`🎯 Total Cosmic Problems: ${QUESTIONS_DATA.length} (20 Theory + 10 Calculations)`);
  console.log('===============================================================');

  // 1. Clean up existing CHEM_9 assignments for Keithley on target date
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
    console.log('✓ Cleaned previous mission records.');
  }

  // 2. Create Learning Unit (Flight Briefing)
  const unit = await prisma.learning_units.create({
    data: {
      subject_id: CONSTANTS.SUBJECT_ID,
      created_by: CONSTANTS.TEACHER_ID,
      title: 'Lesson 30: Starch and Cellulose',
      description: 'Deep Space Polysaccharide Architecture, Iodine Colorimetry, Acid Hydrolysis & Bio-Ethanol Telemetry.',
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
      teacher_daily_note: '🚀 Flight Telemetry Engaged! Welcome to your 90-minute In-Session Mission for 23/11/2026, Astronaut Cadet Keithley! 30 cosmic problems covering Starch & Cellulose structure, iodine color reactions, acid & enzyme hydrolysis, industrial applications, and quantitative stoichiometry. Explore the interactive 3D lab studio first, then achieve 100% mission readiness!',
      is_published: true
    }
  });
  console.log(`✅ Created Daily Assignment Card: ${assignment.id}`);

  // 4. Create In-Session Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: 'Cosmic Chemistry In-Session Mission: Starch & Cellulose (90m)',
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
      options: q.options.map((opt) => ({ id: opt.id, text: opt.text })),
      // CRITICAL FOR INSTANT SOUND FX & SHAKE ANIMATION ON MISTAKES:
      correct_option_id: q.correct_option_id
    };
    if (q.passage) {
      questionPayload.passage = q.passage;
    }

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

  console.log('\n🎉 ALL SYSTEMS GO: Lesson 30 Cosmic Chemistry Mission deployed successfully!');
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
