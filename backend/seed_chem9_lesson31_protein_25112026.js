const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const CONSTANTS = {
  TEACHER_ID: 'dc62e5df-2344-4785-b058-b95f5dbe0983', // Thầy Thức
  STUDENT_ID: '4745136c-bd25-4f45-a488-9f00f2121b70', // Keithley Lake
  SUBJECT_ID: '6fc7387b-13b8-4e27-8240-a60c03dc1d51', // CHEM_9
  ASSIGNED_DATE: '2026-11-25'
};

const LECTURE_MARKDOWN = `# 🚀 FLIGHT BRIEFING: LESSON 31 • PROTEIN
**Keithley Lake • Grade 9 Chemistry • 25 Nov 2026**

### 🌐 Interactive 3D Lab Studio
> **Launch Studio:** [/lectures/chem9-lesson31-protein/index.html](/lectures/chem9-lesson31-protein/index.html)
*(3D Amino Acids & Peptide Bonds, 3-Tube Egg White Lab, Hydrolysis & Silk vs. Nylon Burn Test)*

---

## 🧬 1. Concept & Structure (SGK pp. 138–139)
* **Definition:** Proteins are **complex organic compounds** with very large molecular masses, made of many **amino acid** units linked by **peptide bonds**.
* **Molecular Mass:** Typically **tens of thousands to millions of amu**.
* **Amino Acid Building Blocks:**
  * Example monomers: **Glycine** ($\\text{H}_2\\text{N}-\\text{CH}_2-\\text{COOH}$) and **Alanine** ($\\text{H}_2\\text{N}-\\text{CH}(\\text{CH}_3)-\\text{COOH}$).
  * Both contain an amino group ($-\\text{NH}_2$) and a carboxyl group ($-\\text{COOH}$).
  * Neighboring amino acids link via **peptide bonds** ($-\\text{CO}-\\text{NH}-$).
* **Diversity:** Different proteins have different **sequences of amino acids**, which determine their structures and functions. Proteins exist in **both animals and plants**.

---

## 🧪 2. Chemical Properties (SGK p. 139)

| Property | Trigger / Reagent | Observation & Key Result |
| :--- | :--- | :--- |
| **1. Coagulation** | **Acid** ($\\text{HCl}$), **Base**, or **Heat** | Egg white turns into opaque white solid curds |
| **2. Thermal Decomposition** | **Strong heating** without water | Chars and releases gases with a **characteristic burnt-hair odor** |
| **3. Hydrolysis** | **Acid**, **Base**, or **Enzyme** | Breaks peptide bonds to yield **amino acids** |

$$\\text{Protein} + \\text{H}_2\\text{O} \\xrightarrow{\\text{Acid / Base / Enzyme}} \\text{Amino acid}$$

---

## 💪 3. Roles, Sources & Fiber Test (SGK pp. 139–140)
* **4 Major Roles in the Human Body:**
  1. **Structural:** Builds cells and tissues (muscles, skin, hair).
  2. **Catalytic:** **Enzymes** catalyze biochemical reactions.
  3. **Regulatory:** **Hormones** regulate body activities.
  4. **Transport:** Carries nutrients and oxygen (e.g., **hemoglobin** transports $\\text{O}_2$ to cells).
  * *(Key check: Providing primary energy is **not** protein's main role, and DNA—not protein—stores genetic information.)*
* **Rich Sources:** Milk, eggs, meat, fish, silkworm cocoons, and plant sources (beans, seeds).
* **Fiber Burn Test (Silk / Wool vs. Nylon):**
  * **Natural silk & wool (protein):** Burn with a **characteristic burnt-hair odor** and leave brittle dark ash.
  * **Synthetic nylon:** Melts into a hard plastic bead **without** the burnt-hair smell.
`;

const QUESTIONS_DATA = [
  // ================= SECTOR 1: MERCURY ORBIT • CONCEPT & MOLECULAR MASS (Q1 - Q4) =================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • Concept & Building Blocks',
    content_markdown: 'Inside the **Mercury Orbit Bio-Scanner**, Astronaut Cadet Keithley analyzes a protein sample extracted from orbital crew rations. Which fundamental monomer units join together to construct a protein molecule?',
    options: [
      { id: 'A', text: 'Glucose sugar units' },
      { id: 'B', text: 'Amino acid units' },
      { id: 'C', text: 'Fatty acid chains' },
      { id: 'D', text: 'Ethylene monomer units' }
    ],
    correct_option_id: 'B',
    explanation: 'Proteins are complex organic compounds composed of many amino acid units linked together. Glucose builds starch and cellulose, while fatty acids and glycerol build fats.'
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • Molecular Mass Range',
    content_markdown: 'Telemetry from the **Mercury Orbit Mass Spectrometer** measures the molecular mass of several natural proteins. Which description accurately states the typical molecular mass range of a protein?',
    options: [
      { id: 'A', text: 'Between ten and fifty amu' },
      { id: 'B', text: 'About one hundred eighty amu' },
      { id: 'C', text: 'Tens of thousands to millions of amu' },
      { id: 'D', text: 'Between five hundred and one thousand amu' }
    ],
    correct_option_id: 'C',
    explanation: 'Proteins have very large molecular masses, typically ranging from tens of thousands to millions of atomic mass units (amu) because they consist of many linked amino acid units.'
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • Natural Distribution',
    content_markdown: 'The **Mercury Orbit Life-Support Archive** logs where proteins occur across Earth ecosystems. Which statement about the natural distribution and composition of proteins is **correct**?',
    options: [
      { id: 'A', text: 'Proteins are simple inorganic salts found only in seawater.' },
      { id: 'B', text: 'Proteins are simple molecules found only in animal muscles.' },
      { id: 'C', text: 'Proteins are complex organic polymers found only in plants.' },
      { id: 'D', text: 'Proteins are complex organic compounds in animals and plants.' }
    ],
    correct_option_id: 'D',
    explanation: 'Proteins are complex organic compounds with very large molecular masses, and they exist in both animal organisms (meat, fish, eggs, milk) and plant organisms (beans, seeds, leaves).'
  },
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 1: Mercury Orbit • Protein Diversity',
    content_markdown: 'Although thousands of different proteins operate inside a living cell, they are built from the same pool of amino acids. What primarily makes one protein different in structure and function from another?',
    options: [
      { id: 'A', text: 'The sequence of amino acids along the chain' },
      { id: 'B', text: 'The total volume of water inside the cell' },
      { id: 'C', text: 'The color of the mineral salts around it' },
      { id: 'D', text: 'The pressure of oxygen inside the blood' }
    ],
    correct_option_id: 'A',
    explanation: 'Different proteins have different arrangements (sequences) of amino acid units, and that sequence determines both the three-dimensional structure and the biological function of the protein.'
  },

  // ================= SECTOR 2: VENUS BASE • AMINO ACIDS & PEPTIDE BONDS (Q5 - Q8) =================
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 2: Venus Base • Connecting Linkage',
    content_markdown: 'In the **Venus Base Molecular Assembly Bay**, Cadet Keithley inspects a short protein segment formed from alanine and glycine. Which specific chemical bond connects neighboring amino acid units in a protein?',
    options: [
      { id: 'A', text: 'Glycoside bond' },
      { id: 'B', text: 'Peptide bond' },
      { id: 'C', text: 'Ester bond' },
      { id: 'D', text: 'Metallic bond' }
    ],
    correct_option_id: 'B',
    explanation: 'In a protein chain, adjacent amino acid units are connected by peptide bonds ($-\\text{CO}-\\text{NH}-$).'
  },
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 2: Venus Base • Peptide Group Formula',
    content_markdown: 'A structural hologram at **Venus Base** highlights the repeating link joining two amino acid residues inside a protein chain. Which chemical group represents a **peptide bond** linkage?',
    options: [
      { id: 'A', text: '$-\\text{COO}-\\text{CH}_2-$' },
      { id: 'B', text: '$-\\text{CH}_2-\\text{OH}-$' },
      { id: 'C', text: '$-\\text{CO}-\\text{NH}-$' },
      { id: 'D', text: '$-\\text{O}-\\text{CH}_2-$' }
    ],
    correct_option_id: 'C',
    explanation: 'The $-\\text{CO}-\\text{NH}-$ linkage formed between the carboxyl group of one amino acid and the amino group of the next amino acid is the peptide bond.'
  },
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 2: Venus Base • Alanine vs Glycine',
    content_markdown: 'Examining Figure 31.1 on the **Venus Base Console**, Keithley compares **alanine** ($\\text{H}_2\\text{N}-\\text{CH}(\\text{CH}_3)-\\text{COOH}$) and **glycine** ($\\text{H}_2\\text{N}-\\text{CH}_2-\\text{COOH}$). Which feature do both amino acids share?',
    options: [
      { id: 'A', text: 'Both contain one $-\\text{NH}_2$ group and one $-\\text{COOH}$ group.' },
      { id: 'B', text: 'Both carry an identical $-\\text{CH}_3$ methyl side group.' },
      { id: 'C', text: 'Both contain two $-\\text{COOH}$ groups and zero nitrogen atoms.' },
      { id: 'D', text: 'Both have identical molecular formulas and identical molar mass.' }
    ],
    correct_option_id: 'A',
    explanation: 'Both alanine and glycine are amino acids containing an amino group ($-\\text{NH}_2$) and a carboxyl group ($-\\text{COOH}$). They differ in the side group attached to the central carbon ($-\\text{CH}_3$ in alanine vs. $-\\text{H}$ in glycine).'
  },
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 2: Venus Base • Protein Segment Formation',
    content_markdown: 'During **Venus Base** polymerization modeling, how do individual amino acid molecules such as alanine and glycine combine to form a protein chain?',
    options: [
      { id: 'A', text: 'They dissolve in hexane without forming any covalent bonds.' },
      { id: 'B', text: 'They link through $-\\text{OH}$ groups to form ester bridges.' },
      { id: 'C', text: 'They absorb oxygen gas to create simple six-carbon rings.' },
      { id: 'D', text: 'They link via peptide bonds between $-\\text{COOH}$ and $-\\text{NH}_2$.' }
    ],
    correct_option_id: 'D',
    explanation: 'Amino acids link together when the carboxyl ($-\\text{COOH}$) group of one molecule reacts with the amino ($-\\text{NH}_2$) group of the next (eliminating water) to form a peptide bond ($-\\text{CO}-\\text{NH}-$).'
  },

  // ================= SECTOR 3: EARTH MISSION CONTROL • COAGULATION TELEMETRY (Q9 - Q12) =================
  {
    order_index: 9,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Acid Coagulation',
    content_markdown: 'In **Earth Mission Control Test Tube 1**, Cadet Keithley adds a few drops of $1\\text{ M }\\text{HCl}$ solution to $2\\text{ mL}$ of clear egg white. What immediate visual change is observed?',
    options: [
      { id: 'A', text: 'A deep blue-violet color forms at room temperature.' },
      { id: 'B', text: 'White solid curds form as the protein coagulates.' },
      { id: 'C', text: 'Colorless gas bubbles fizz vigorously out of the tube.' },
      { id: 'D', text: 'A bright silver mirror coats the inner glass wall.' }
    ],
    correct_option_id: 'B',
    explanation: 'Adding strong acid such as $1\\text{ M }\\text{HCl}$ alters the protein structure and causes dissolved egg white protein to coagulate into opaque white solid clumps.'
  },
  {
    order_index: 10,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Thermal Coagulation',
    content_markdown: 'In **Test Tube 2**, Cadet Keithley gently warms $2\\text{ mL}$ of egg white over an alcohol lamp for about one minute. Which physical change occurs inside the tube?',
    options: [
      { id: 'A', text: 'The egg white coagulates into an opaque white solid.' },
      { id: 'B', text: 'The egg white turns into clear water and pure glucose.' },
      { id: 'C', text: 'The egg white evaporates completely without changing color.' },
      { id: 'D', text: 'The egg white becomes thinner and stays completely clear.' }
    ],
    correct_option_id: 'A',
    explanation: 'Gentle heating causes protein coagulation: the transparent liquid egg white turns into an opaque white solid, the same change seen when boiling or frying an egg.'
  },
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Coagulation Triggers',
    content_markdown: 'Reviewing the **Earth Mission Control** safety log, which complete set of agents can cause proteins to change properties and **coagulate**?',
    options: [
      { id: 'A', text: 'Cold water, nitrogen gas, or table sugar' },
      { id: 'B', text: 'Liquid methane, argon gas, or pure sand' },
      { id: 'C', text: 'Acids, bases, or an increase in temperature' },
      { id: 'D', text: 'Sunlight, iodine crystals, or dry cellulose' }
    ],
    correct_option_id: 'C',
    explanation: 'According to KHTN 9, proteins change properties and can coagulate under the action of acid, base, or heat (temperature).'
  },
  {
    order_index: 12,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 3: Earth Mission Control • Culinary Coagulation',
    content_markdown: 'When crew rations such as eggs, meat, or fish are cooked in the **Earth Mission Galley**, why do these foods become firm and change appearance?',
    options: [
      { id: 'A', text: 'Because starch paste dissolves into clear cold water' },
      { id: 'B', text: 'Because glucose caramelizes directly into pure carbon' },
      { id: 'C', text: 'Because cellulose fibers react with sodium chloride' },
      { id: 'D', text: 'Because their proteins coagulate when exposed to heat' }
    ],
    correct_option_id: 'D',
    explanation: 'Eggs, meat, and fish are rich in protein. Heating them during cooking causes their proteins to coagulate, turning liquid or soft raw textures into firm cooked food.'
  },

  // ================= SECTOR 4: MARS OUTPOST • THERMAL DECOMPOSITION & BURNT ODOR (Q13 - Q15) =================
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 4: Mars Outpost • Strong Dry Heating',
    content_markdown: 'In **Mars Outpost Test Tube 3**, egg white is heated strongly over an alcohol lamp without water until it begins to char. Which sensory observation confirms protein decomposition?',
    options: [
      { id: 'A', text: 'A sweet fruity aroma like ripe bananas' },
      { id: 'B', text: 'A sharp burnt odor similar to burning hair' },
      { id: 'C', text: 'A pungent sour odor like vinegar acid' },
      { id: 'D', text: 'Zero odor with only clear steam rising' }
    ],
    correct_option_id: 'B',
    explanation: 'When heated strongly at high temperature without water, proteins decompose or burn, producing volatile vapors and a characteristic burnt odor similar to burning hair.'
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 4: Mars Outpost • Decomposition Conditions',
    content_markdown: 'What happens to a protein sample when it is heated strongly at high temperature in the **absence of water**?',
    options: [
      { id: 'A', text: 'It melts cleanly and freezes back into crystals.' },
      { id: 'B', text: 'It hydrolyzes completely into pure alanine crystals.' },
      { id: 'C', text: 'It decomposes or chars and emits volatile gases.' },
      { id: 'D', text: 'It stays chemically unchanged at red heat.' }
    ],
    correct_option_id: 'C',
    explanation: 'Under strong heating without water, protein does not melt cleanly or hydrolyze; instead, it decomposes or burns, releasing volatile substances with a burnt smell.'
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 4: Mars Outpost • Comparing Heating Modes',
    content_markdown: 'Cadet Keithley compares gentle heating (1 minute) with strong dry heating of egg white in the **Mars Outpost Lab**. Which pairing correctly matches each outcome?',
    options: [
      { id: 'A', text: 'Gentle warming gives coagulation; strong dry heating chars.' },
      { id: 'B', text: 'Gentle heating causes hydrolysis; strong heating causes freezing.' },
      { id: 'C', text: 'Gentle heating gives burnt-hair odor; strong heating gives clear gel.' },
      { id: 'D', text: 'Both gentle and strong heating leave egg white unchanged.' }
    ],
    correct_option_id: 'A',
    explanation: 'Gentle heating coagulates egg white protein into a white solid, whereas strong heating without water decomposes and chars the protein with a burnt-hair odor.'
  },

  // ================= SECTOR 5: JUPITER STATION • HYDROLYSIS REACTIONS (Q16 - Q19) =================
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Hydrolysis Product',
    content_markdown: 'Inside the **Jupiter Station Bio-Reactor**, a purified protein undergoes **complete hydrolysis** with water. What final organic products are formed?',
    options: [
      { id: 'A', text: 'Glucose molecules' },
      { id: 'B', text: 'Carboxylic acids and glycerol' },
      { id: 'C', text: 'Ethanol and carbon dioxide' },
      { id: 'D', text: 'Amino acids' }
    ],
    correct_option_id: 'D',
    explanation: 'Complete hydrolysis of a protein breaks all peptide bonds and yields the constituent amino acids: $\\text{Protein} + \\text{H}_2\\text{O} \\xrightarrow{\\text{Acid/Base/Enzyme}} \\text{Amino acid}$.'
  },
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Hydrolysis Catalysts',
    content_markdown: 'Which set lists the three valid agents that catalyze the **hydrolysis reaction** of protein in the laboratory or in living organisms?',
    options: [
      { id: 'A', text: 'Iodine, sodium chloride, or sunlight' },
      { id: 'B', text: 'Acid, base, or specific enzymes' },
      { id: 'C', text: 'Copper metal, oxygen, or dry sand' },
      { id: 'D', text: 'Ethanol, nitrogen gas, or cold ice' }
    ],
    correct_option_id: 'B',
    explanation: 'Proteins undergo hydrolysis under the catalytic action of acid, base, or enzyme (such as digestive enzymes in the stomach and small intestine).'
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Site of Bond Cleavage',
    content_markdown: 'During protein hydrolysis aboard **Jupiter Station**, water molecules react with the macromolecule to split it into smaller units. At which exact chemical bond does hydrolysis occur?',
    options: [
      { id: 'A', text: 'At the carbon–carbon bond in methyl groups' },
      { id: 'B', text: 'At the hydrogen bond between water molecules' },
      { id: 'C', text: 'At the peptide bond linking amino acids' },
      { id: 'D', text: 'At the glycosidic bond of glucose rings' }
    ],
    correct_option_id: 'C',
    explanation: 'Protein hydrolysis takes place directly at the peptide bonds ($-\\text{CO}-\\text{NH}-$), breaking the long chain back down into individual amino acid molecules.'
  },
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 5: Jupiter Station • Digestive Hydrolysis',
    content_markdown: 'After Astronaut Keithley eats protein-rich fish aboard **Jupiter Station**, how does the human digestive system process that protein into absorbable amino acids?',
    options: [
      { id: 'A', text: 'By enzyme hydrolysis breaking peptide bonds' },
      { id: 'B', text: 'By strong dry charring at high body temperature' },
      { id: 'C', text: 'By photosynthesis inside red blood oxygen cells' },
      { id: 'D', text: 'By addition reaction with liquid bromine water' }
    ],
    correct_option_id: 'A',
    explanation: 'Digestive enzymes act as biological catalysts to hydrolyze dietary proteins into amino acids, which the body absorbs to synthesize its own proteins.'
  },

  // ================= SECTOR 6: SATURN RINGS • BIOLOGICAL ROLES & ENZYMES (Q20 - Q23) =================
  {
    order_index: 20,
    type: 'MULTIPLE_CHOICE',
    points: 0.33,
    sectionName: 'Sector 6: Saturn Rings • Non-Primary Role',
    content_markdown: 'Based on the **Saturn Rings Crew Medical Brief** (SBT 31.3), which function is **NOT** a primary biological role of protein in the human body?',
    options: [
      { id: 'A', text: 'Building cell and tissue structure' },
      { id: 'B', text: 'Catalyzing biochemical reactions' },
      { id: 'C', text: 'Transporting oxygen via hemoglobin' },
      { id: 'D', text: 'Serving as the main energy source' }
    ],
    correct_option_id: 'D',
    explanation: 'Proteins build cell structures, act as catalytic enzymes, form hormones, and transport oxygen (hemoglobin). Serving as the primary energy source is mainly the role of carbohydrates and lipids.'
  },
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 6: Saturn Rings • Oxygen Transport',
    content_markdown: 'Inside the **Saturn Rings Medical Bay**, sensors monitor how oxygen reaches crew muscle cells. Which specialized protein transports oxygen from the lungs to body cells?',
    options: [
      { id: 'A', text: 'Cellulose' },
      { id: 'B', text: 'Hemoglobin' },
      { id: 'C', text: 'Saccharose' },
      { id: 'D', text: 'Polyethylene' }
    ],
    correct_option_id: 'B',
    explanation: 'Hemoglobin is a transport protein in red blood cells that carries oxygen ($\\text{O}_2$) from the lungs to tissues and cells throughout the body.'
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 6: Saturn Rings • Enzymes & Hormones',
    content_markdown: 'The **Saturn Rings Physiology Console** summarizes two regulatory and catalytic protein classes. Which pair correctly matches **enzymes** and **hormones** to their roles?',
    options: [
      { id: 'A', text: 'Enzymes speed reactions; hormones regulate body work.' },
      { id: 'B', text: 'Enzymes store genetic codes; hormones build tooth enamel.' },
      { id: 'C', text: 'Enzymes carry oxygen gas; hormones dissolve bone calcium.' },
      { id: 'D', text: 'Enzymes produce starch; hormones burn glucose inside air.' }
    ],
    correct_option_id: 'A',
    explanation: 'In the human body, enzymes are special proteins that catalyze biochemical reactions, while many hormones are proteins that regulate physiological processes.'
  },
  {
    order_index: 23,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 6: Saturn Rings • Structural & Genetic Check',
    content_markdown: 'Reviewing **SBT 31.12** inside the **Saturn Rings Observatory**, which statement accurately identifies a true biological function of proteins?',
    options: [
      { id: 'A', text: 'Proteins store hereditary genetic information.' },
      { id: 'B', text: 'Proteins generate pure water inside lungs.' },
      { id: 'C', text: 'Proteins build tissues and transport nutrients.' },
      { id: 'D', text: 'Proteins replace starch as plant cell walls.' }
    ],
    correct_option_id: 'C',
    explanation: 'Proteins construct cell tissues (muscles, skin, hair), produce enzymes and hormones, and transport nutrients and oxygen. Storing genetic information is the role of DNA, not protein.'
  },

  // ================= SECTOR 7: URANUS DEEP SPACE • SOURCES & NUTRITION (Q24 - Q26) =================
  {
    order_index: 24,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 7: Uranus Deep Space • Protein-Rich Rations',
    content_markdown: 'Scanning Figure 31.2 in the **Uranus Deep Space Galley**, which group of everyday items consists entirely of natural **protein-rich** products?',
    options: [
      { id: 'A', text: 'Cooking oil, cane sugar, and table salt' },
      { id: 'B', text: 'Milk, eggs, meat, fish, and silkworm cocoons' },
      { id: 'C', text: 'Distilled water, cotton fiber, and rice starch' },
      { id: 'D', text: 'Vinegar acid, ethanol fuel, and baking soda' }
    ],
    correct_option_id: 'B',
    explanation: 'Figure 31.2 of SGK KHTN 9 highlights milk, eggs, meat, fish, and silkworm cocoons as classic natural products rich in protein.'
  },
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 7: Uranus Deep Space • Dietary Necessity',
    content_markdown: 'Why must astronauts—and growing teenagers on Earth—consume an adequate amount of **protein** in their daily diet?',
    options: [
      { id: 'A', text: 'To supply amino acids needed for growth, repair, and enzymes' },
      { id: 'B', text: 'Because every single food on Earth naturally contains protein' },
      { id: 'C', text: 'To coat cell walls with rigid insoluble cellulose fibers' },
      { id: 'D', text: 'Because protein replaces oxygen gas during human breathing' }
    ],
    correct_option_id: 'A',
    explanation: 'Daily dietary protein supplies essential amino acids that the body uses to build and repair tissues, grow healthily, and synthesize vital enzymes and hormones.'
  },
  {
    order_index: 26,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 7: Uranus Deep Space • Evaluating Food Claims',
    content_markdown: 'Evaluating **SBT 31.8** at **Uranus Deep Space**, Cadet Keithley reads four claims about protein and nutrition. Which claim is **scientifically true**?',
    options: [
      { id: 'A', text: 'Enzymes are never made of protein molecules.' },
      { id: 'B', text: 'All types of food always contain protein.' },
      { id: 'C', text: 'Protein is unnecessary for body growth.' },
      { id: 'D', text: 'Protein can decompose when heated strongly.' }
    ],
    correct_option_id: 'D',
    explanation: 'From SBT 31.8: (a) Enzymes ARE proteins (false); (b) Protein CAN decompose when strongly heated (TRUE); (c) Not all foods contain protein, e.g., pure sugar or cooking oil (false); (d) Protein IS essential for growth (false).'
  },

  // ================= SECTOR 8: NEPTUNE FRONTIER • FIBER TEST & TRUE/FALSE MASTERY (Q27 - Q30) =================
  {
    order_index: 27,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 8: Neptune Frontier • Natural Silk vs Nylon',
    content_markdown: 'At the **Neptune Frontier Suit Lab**, two unlabeled fabric threads—one **natural silk** and one **synthetic nylon**—must be identified. Which quick test distinguishes them reliably?',
    options: [
      { id: 'A', text: 'Drop iodine solution onto both dry fabric threads.' },
      { id: 'B', text: 'Soak both fabric threads in cold distilled water.' },
      { id: 'C', text: 'Burn a small piece of each and smell for burnt hair.' },
      { id: 'D', text: 'Compare how bright each thread looks under white light.' }
    ],
    correct_option_id: 'C',
    explanation: 'Natural silk is a protein fiber, so burning it produces a characteristic burnt-hair odor and brittle ash. Nylon is a synthetic fiber that melts into a hard bead without the burnt-hair smell.'
  },
  {
    order_index: 28,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 8: Neptune Frontier • Protein Fiber Identification',
    content_markdown: 'During a **Neptune Frontier** material audit, Keithley burns small samples of sheep wool, natural silk, cotton, and nylon. Which samples release the **burnt-hair odor**?',
    options: [
      { id: 'A', text: 'Cotton and synthetic nylon' },
      { id: 'B', text: 'Sheep wool and silk' },
      { id: 'C', text: 'Natural silk and plant cotton' },
      { id: 'D', text: 'Synthetic nylon and sheep wool' }
    ],
    correct_option_id: 'B',
    explanation: 'Both sheep wool and natural silk are protein-based natural fibers, so burning them gives a characteristic burnt-hair odor. Cotton is cellulose (smells like burnt paper), and nylon is synthetic.'
  },
  {
    order_index: 29,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 8: Neptune Frontier • Statement Verification I',
    content_markdown: 'At the **Neptune Frontier Verification Terminal**, Keithley checks four statements adapted from **SBT 31.6**:\n\n1. Peptide bonds connect amino acids inside proteins.\n2. All proteins have the exact same chemical structure.\n3. Proteins do not coagulate when gently heated.\n4. Proteins undergo hydrolysis in acidic solution.\n\nHow many of these four statements are **correct**?',
    options: [
      { id: 'A', text: '2' },
      { id: 'B', text: '1' },
      { id: 'C', text: '3' },
      { id: 'D', text: '4' }
    ],
    correct_option_id: 'A',
    explanation: 'Exactly **2** statements are correct: **(1)** is true (peptide bonds link amino acids) and **(4)** is true (proteins hydrolyze in acid). **(2)** is false (proteins differ in amino acid sequence and structure), and **(3)** is false (proteins DO coagulate on heating).'
  },
  {
    order_index: 30,
    type: 'MULTIPLE_CHOICE',
    points: 0.34,
    sectionName: 'Sector 8: Neptune Frontier • Statement Verification II',
    content_markdown: 'For the final **Neptune Frontier** clearance log (adapted from **SBT 31.5 & 31.7**), evaluate these four statements:\n\n1. Proteins are simple organic compounds with small mass.\n2. Proteins have very large molecular masses.\n3. Proteins catalyze biochemical reactions as enzymes.\n4. Proteins carry oxygen and nutrients in the body.\n\nHow many of these four statements are **correct**?',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '2' },
      { id: 'C', text: '4' },
      { id: 'D', text: '3' }
    ],
    correct_option_id: 'D',
    explanation: 'Exactly **3** statements are correct: **(2)** very large molecular mass, **(3)** catalytic enzyme role, and **(4)** transport role are all true. Statement **(1)** is false because proteins are complex organic compounds with very large—not small—molecular mass.'
  }
];

async function seed() {
  const targetDate = new Date(`${CONSTANTS.ASSIGNED_DATE}T00:00:00.000Z`);

  console.log('===============================================================');
  console.log('🚀 [Keithley Chemistry Seed] Lesson 31: Protein');
  console.log(`👨‍🚀 Astronaut Cadet: Keithley Lake | Date: ${CONSTANTS.ASSIGNED_DATE}`);
  console.log(`🎯 Total Conceptual Problems: ${QUESTIONS_DATA.length} | Session: 90m`);
  console.log('===============================================================');

  // 1. Clean up any existing CHEM_9 assignments on targetDate
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
    console.log(`⚠️ Found ${existingAsgns.length} previous CHEM_9 assignment(s) on ${CONSTANTS.ASSIGNED_DATE}. Cleaning up...`);
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
      title: 'Lesson 31: Protein',
      description: 'Concise KHTN 9 Flight Briefing: Amino acids, peptide bonds, coagulation, thermal decomposition, hydrolysis, biological roles, and silk vs. nylon burn test.',
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
      teacher_daily_note: '🚀 Flight Telemetry Engaged! Welcome to Lesson 31: Protein (25/11/2026), Astronaut Cadet Keithley! Review the concise Flight Briefing & 3D Bio-Reactor Lab first, then complete all 30 conceptual telemetry problems across 8 planetary sectors.',
      is_published: true
    }
  });
  console.log(`✅ Created Daily Assignment Card: ${assignment.id}`);

  // 4. Create In-Session Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: 'Cosmic Chemistry In-Session Mission: Protein (90m)',
      instructions: 'Timed celestial chemistry assessment with per-question chronometer controls. 30 conceptual problems covering protein structure, peptide bonds, coagulation, hydrolysis, biological roles, and fiber testing across 8 planetary sectors. 100% English telemetry.',
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
  console.log('\n🎉 ALL SYSTEMS GO: Lesson 31 Protein Mission deployed successfully!');
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
