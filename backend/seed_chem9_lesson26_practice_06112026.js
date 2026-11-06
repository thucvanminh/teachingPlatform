const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const QUESTIONS_DATA = [
  // =========================================================================
  // SECTOR 1: MERCURY ORBIT • DENSITY, MASS & MOLAR CONVERSIONS (Q1 – Q3)
  // =========================================================================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 1: Mercury Orbit • Moles from Liquid Volume & Density',
    content_markdown: 'A laboratory technician measures $115\\text{ mL}$ of pure ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$). Given that the density of pure ethylic alcohol is $D = 0.8\\text{ g/mL}$ and its molar mass is $46\\text{ g/mol}$, how many moles of ethylic alcohol are present in this sample?',
    options: [
      { id: 'A', text: '$1.5\\text{ mol}$' },
      { id: 'B', text: '$2.0\\text{ mol}$' },
      { id: 'C', text: '$2.5\\text{ mol}$' },
      { id: 'D', text: '$3.0\\text{ mol}$' }
    ],
    correct_option_id: 'B',
    explanation: 'First, calculate the mass: $m = V \\times D = 115\\text{ mL} \\times 0.8\\text{ g/mL} = 92.0\\text{ g}$. Then calculate moles: $n = \\frac{m}{M} = \\frac{92.0}{46} = 2.0\\text{ mol}$.'
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 1: Mercury Orbit • Volume from Target Moles & Density',
    content_markdown: 'A reaction requires exactly $0.75\\text{ mol}$ of pure ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$, $M = 46\\text{ g/mol}$). If the laboratory dispenser provides pure alcohol with a density of $D = 0.8\\text{ g/mL}$, what volume of liquid alcohol must be measured?',
    options: [
      { id: 'A', text: '$27.600\\text{ mL}$' },
      { id: 'B', text: '$34.500\\text{ mL}$' },
      { id: 'C', text: '$43.125\\text{ mL}$' },
      { id: 'D', text: '$57.500\\text{ mL}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Mass required: $m = 0.75\\text{ mol} \\times 46\\text{ g/mol} = 34.5\\text{ g}$. Volume to measure: $V = \\frac{m}{D} = \\frac{34.5\\text{ g}}{0.8\\text{ g/mL}} = 43.125\\text{ mL}$.'
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 1: Mercury Orbit • Carbon Content in Canister Volume',
    content_markdown: 'A fuel canister contains $500\\text{ mL}$ of pure ethylic alcohol ($D = 0.8\\text{ g/mL}$, $M = 46\\text{ g/mol}$). Given atomic masses $H = 1, C = 12, O = 16$, what is the total mass of Carbon contained in this entire canister?',
    options: [
      { id: 'A', text: '$139.13\\text{ g}$' },
      { id: 'B', text: '$208.70\\text{ g}$' },
      { id: 'C', text: '$240.00\\text{ g}$' },
      { id: 'D', text: '$320.00\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Total mass of alcohol: $m = 500\\text{ mL} \\times 0.8\\text{ g/mL} = 400\\text{ g}$. The mass fraction of Carbon in $\\text{C}_2\\text{H}_6\\text{O}$ is $\\frac{24}{46}$. Mass of Carbon: $m_{\\text{C}} = 400 \\times \\frac{24}{46} \\approx 208.70\\text{ g}$.'
  },

  // =========================================================================
  // SECTOR 2: VENUS BASE • CLEAN COMBUSTION: OXYGEN & AIR DEMAND (Q4 – Q6)
  // =========================================================================
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 2: Venus Base • Oxygen Volume for 18.4 g Alcohol Burn',
    content_markdown: 'An orbital burner consumes $18.4\\text{ g}$ of pure ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$, $M = 46\\text{ g/mol}$) in a complete combustion reaction. What volume of oxygen gas ($\\text{O}_2$) at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, molar volume $24.79\\text{ L/mol}$) is required?',
    options: [
      { id: 'A', text: '$9.916\\text{ L}$' },
      { id: 'B', text: '$19.832\\text{ L}$' },
      { id: 'C', text: '$29.748\\text{ L}$' },
      { id: 'D', text: '$39.664\\text{ L}$' }
    ],
    correct_option_id: 'C',
    explanation: '$n_{\\text{alcohol}} = \\frac{18.4}{46} = 0.4\\text{ mol}$. From stoichiometry $\\text{C}_2\\text{H}_5\\text{OH} + 3\\text{O}_2 \\to 2\\text{CO}_2 + 3\\text{H}_2\\text{O}$, $n_{\\text{O}_2} = 3 \\times 0.4 = 1.2\\text{ mol}$. Volume of $\\text{O}_2 = 1.2 \\times 24.79 = 29.748\\text{ L}$.'
  },
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 2: Venus Base • Atmospheric Air Volume Requirement',
    content_markdown: 'To completely burn $4.6\\text{ g}$ of ethylic alcohol ($M = 46\\text{ g/mol}$) in atmospheric air, what total volume of air at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $24.79\\text{ L/mol}$) is required, assuming oxygen constitutes $20\\%$ of air by volume?',
    options: [
      { id: 'A', text: '$7.437\\text{ L}$' },
      { id: 'B', text: '$14.874\\text{ L}$' },
      { id: 'C', text: '$29.748\\text{ L}$' },
      { id: 'D', text: '$37.185\\text{ L}$' }
    ],
    correct_option_id: 'D',
    explanation: '$n_{\\text{alc}} = \\frac{4.6}{46} = 0.1\\text{ mol} \\implies n_{\\text{O}_2} = 0.3\\text{ mol} \\implies V_{\\text{O}_2} = 0.3 \\times 24.79 = 7.437\\text{ L}$. Since air is $20\\%$ oxygen: $V_{\\text{air}} = 7.437 \\times 5 = 37.185\\text{ L}$.'
  },
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 2: Venus Base • Combustible Alcohol Mass from Oxygen Supply',
    content_markdown: 'A laboratory technician supplies $74.37\\text{ L}$ of oxygen gas ($\\text{O}_2$) at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $24.79\\text{ L/mol}$) to an enclosed combustion chamber. What is the maximum mass of pure ethylic alcohol ($M = 46\\text{ g/mol}$) that can be completely combusted by this quantity of oxygen?',
    options: [
      { id: 'A', text: '$23.0\\text{ g}$' },
      { id: 'B', text: '$34.5\\text{ g}$' },
      { id: 'C', text: '$46.0\\text{ g}$' },
      { id: 'D', text: '$69.0\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: '$n_{\\text{O}_2} = \\frac{74.37}{24.79} = 3.0\\text{ mol}$. According to equation $\\text{C}_2\\text{H}_5\\text{OH} + 3\\text{O}_2 \\to 2\\text{CO}_2 + 3\\text{H}_2\\text{O}$, $n_{\\text{alcohol}} = \\frac{1}{3} n_{\\text{O}_2} = 1.0\\text{ mol}$. Mass $m = 1.0 \\times 46 = 46.0\\text{ g}$.'
  },

  // =========================================================================
  // SECTOR 3: EARTH MISSION CONTROL • COMBUSTION: CO2 & H2O STOICHIOMETRY (Q7 – Q9)
  // =========================================================================
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 3: Earth Mission Control • Combined Products Mass from 13.8 g Burn',
    content_markdown: 'Complete combustion of $13.8\\text{ g}$ of ethylic alcohol ($M = 46\\text{ g/mol}$) produces carbon dioxide ($\\text{CO}_2$, $M = 44$) and water vapor ($\\text{H}_2\\text{O}$, $M = 18$). What is the total combined mass of the combustion products ($\\text{CO}_2 + \\text{H}_2\\text{O}$)?',
    options: [
      { id: 'A', text: '$32.4\\text{ g}$' },
      { id: 'B', text: '$38.2\\text{ g}$' },
      { id: 'C', text: '$42.6\\text{ g}$' },
      { id: 'D', text: '$54.0\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: '$n_{\\text{alcohol}} = \\frac{13.8}{46} = 0.3\\text{ mol}$. Products: $m_{\\text{CO}_2} = (0.3 \\times 2) \\times 44 = 26.4\\text{ g}$ and $m_{\\text{H}_2\\text{O}} = (0.3 \\times 3) \\times 18 = 16.2\\text{ g}$. Total mass = $26.4 + 16.2 = 42.6\\text{ g}$ (consistent with mass conservation: $13.8\\text{ g alcohol} + 28.8\\text{ g O}_2 = 42.6\\text{ g}$).'
  },
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 3: Earth Mission Control • CO2 Volume from Water Vapor Yield',
    content_markdown: 'Complete combustion of an unknown mass of ethylic alcohol produces $27.0\\text{ g}$ of water vapor ($\\text{H}_2\\text{O}$, $M = 18\\text{ g/mol}$). What volume of carbon dioxide gas ($\\text{CO}_2$) at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $24.79\\text{ L/mol}$) was concurrently generated?',
    options: [
      { id: 'A', text: '$12.395\\text{ L}$' },
      { id: 'B', text: '$18.592\\text{ L}$' },
      { id: 'C', text: '$24.790\\text{ L}$' },
      { id: 'D', text: '$37.185\\text{ L}$' }
    ],
    correct_option_id: 'C',
    explanation: '$n_{\\text{H}_2\\text{O}} = \\frac{27.0}{18} = 1.5\\text{ mol}$. From the equation $\\text{C}_2\\text{H}_5\\text{OH} + 3\\text{O}_2 \\to 2\\text{CO}_2 + 3\\text{H}_2\\text{O}$, $n_{\\text{CO}_2} = \\frac{2}{3} n_{\\text{H}_2\\text{O}} = 1.0\\text{ mol}$. At standard conditions, $V_{\\text{CO}_2} = 1.0 \\times 24.79 = 24.790\\text{ L}$.'
  },
  {
    order_index: 9,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 3: Earth Mission Control • Liquid Volume from CO2 Output',
    content_markdown: 'Complete combustion of a pure liquid sample of ethylic alcohol ($D = 0.8\\text{ g/mL}$, $M = 46\\text{ g/mol}$) generates $49.58\\text{ L}$ of carbon dioxide gas ($\\text{CO}_2$) at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $24.79\\text{ L/mol}$). What volume of liquid ethylic alcohol was burned?',
    options: [
      { id: 'A', text: '$46.0\\text{ mL}$' },
      { id: 'B', text: '$57.5\\text{ mL}$' },
      { id: 'C', text: '$62.5\\text{ mL}$' },
      { id: 'D', text: '$92.0\\text{ mL}$' }
    ],
    correct_option_id: 'B',
    explanation: '$n_{\\text{CO}_2} = \\frac{49.58}{24.79} = 2.0\\text{ mol} \\implies n_{\\text{alcohol}} = 1.0\\text{ mol}$. Mass of alcohol $m = 1.0 \\times 46 = 46.0\\text{ g}$. Volume of liquid: $V = \\frac{46.0}{0.8} = 57.5\\text{ mL}$.'
  },

  // =========================================================================
  // SECTOR 4: MARS OUTPOST • LIME WATER ABSORPTION & MASS CHANGES (Q10 – Q12)
  // =========================================================================
  {
    order_index: 10,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 4: Mars Outpost • Calcium Carbonate Precipitate Mass',
    content_markdown: 'The carbon dioxide gas ($\\text{CO}_2$) generated from the complete combustion of $6.9\\text{ g}$ of ethylic alcohol ($M = 46\\text{ g/mol}$) is bubbled into an excess solution of limewater ($\\text{Ca}(\\text{OH})_2$). What mass of calcium carbonate precipitate ($\\text{CaCO}_3$, $M = 100\\text{ g/mol}$) is formed?',
    options: [
      { id: 'A', text: '$15.0\\text{ g}$' },
      { id: 'B', text: '$20.0\\text{ g}$' },
      { id: 'C', text: '$30.0\\text{ g}$' },
      { id: 'D', text: '$45.0\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: '$n_{\\text{alcohol}} = \\frac{6.9}{46} = 0.15\\text{ mol} \\implies n_{\\text{CO}_2} = 2 \\times 0.15 = 0.3\\text{ mol}$. With excess $\\text{Ca}(\\text{OH})_2$, $\\text{CO}_2 + \\text{Ca}(\\text{OH})_2 \\to \\text{CaCO}_3\\downarrow + \\text{H}_2\\text{O}$, so $n_{\\text{CaCO}_3} = 0.3\\text{ mol}$. Precipitate mass: $m = 0.3 \\times 100 = 30.0\\text{ g}$.'
  },
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 4: Mars Outpost • Sulfuric Acid Mass Gain from Water Absorption',
    content_markdown: 'When the combustion products of $4.6\\text{ g}$ of ethylic alcohol ($M = 46\\text{ g/mol}$) are passed into a closed absorption flask containing concentrated sulfuric acid ($\\text{H}_2\\text{SO}_4$, which absorbs only water vapor), how much does the mass of the $\\text{H}_2\\text{SO}_4$ absorption flask increase?',
    options: [
      { id: 'A', text: '$3.6\\text{ g}$' },
      { id: 'B', text: '$5.4\\text{ g}$' },
      { id: 'C', text: '$8.8\\text{ g}$' },
      { id: 'D', text: '$14.2\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Concentrated $\\text{H}_2\\text{SO}_4$ absorbs water vapor exclusively. From $0.1\\text{ mol}$ of alcohol, $n_{\\text{H}_2\\text{O}} = 3 \\times 0.1 = 0.3\\text{ mol}$. The flask mass increases by $m_{\\text{H}_2\\text{O}} = 0.3 \\times 18 = 5.4\\text{ g}$.'
  },
  {
    order_index: 12,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 4: Mars Outpost • Net Solution Mass Variation in Limewater',
    content_markdown: 'Burning $4.6\\text{ g}$ of ethylic alcohol ($M = 46$) cleanly in oxygen yields $\\text{CO}_2$ and $\\text{H}_2\\text{O}$. Both products are simultaneously passed into an excess solution of limewater ($\\text{Ca}(\\text{OH})_2$). Calcium carbonate ($\\text{CaCO}_3$, $M = 100$) precipitates out. How does the total mass of the limewater solution change?',
    options: [
      { id: 'A', text: 'Increases by $14.2\\text{ g}$' },
      { id: 'B', text: 'Decreases by $5.8\\text{ g}$' },
      { id: 'C', text: 'Increases by $5.8\\text{ g}$' },
      { id: 'D', text: 'Decreases by $20.0\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Mass entering solution: $m_{\\text{CO}_2} + m_{\\text{H}_2\\text{O}} = (0.2 \\times 44) + (0.3 \\times 18) = 8.8 + 5.4 = 14.2\\text{ g}$. Mass leaving solution as precipitate: $m_{\\text{CaCO}_3} = 0.2 \\times 100 = 20.0\\text{ g}$. Since $20.0 > 14.2$, the solution mass decreases by $20.0 - 14.2 = 5.8\\text{ g}$.'
  },

  // =========================================================================
  // SECTOR 5: JUPITER STATION • ACTIVE METAL DISPLACEMENT: PURE ETHANOL (Q13 – Q16)
  // =========================================================================
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 5: Jupiter Station • Sodium Mass Reacted from H2 Volume',
    content_markdown: 'A piece of metallic sodium ($\\text{Na}$, $M = 23\\text{ g/mol}$) is dropped into an excess volume of pure ethylic alcohol. If $12.395\\text{ L}$ of hydrogen gas ($\\text{H}_2$) is collected at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $24.79\\text{ L/mol}$), what mass of metallic sodium reacted?',
    options: [
      { id: 'A', text: '$11.5\\text{ g}$' },
      { id: 'B', text: '$23.0\\text{ g}$' },
      { id: 'C', text: '$46.0\\text{ g}$' },
      { id: 'D', text: '$69.0\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: '$n_{\\text{H}_2} = \\frac{12.395}{24.79} = 0.5\\text{ mol}$. From $2\\text{Na} + 2\\text{C}_2\\text{H}_5\\text{OH} \\to 2\\text{C}_2\\text{H}_5\\text{ONa} + \\text{H}_2\\uparrow$, $n_{\\text{Na}} = 2 \\times n_{\\text{H}_2} = 1.0\\text{ mol}$. Mass $m_{\\text{Na}} = 1.0 \\times 23 = 23.0\\text{ g}$.'
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 5: Jupiter Station • Sodium Ethoxide Salt Recovery',
    content_markdown: 'Dropping excess metallic sodium into $23\\text{ g}$ of pure ethylic alcohol ($M = 46\\text{ g/mol}$) releases hydrogen gas. After the reaction finishes, the remaining liquid is evaporated to complete dryness. What mass of solid sodium ethoxide ($\\text{C}_2\\text{H}_5\\text{ONa}$, $M = 68\\text{ g/mol}$) is recovered?',
    options: [
      { id: 'A', text: '$17.0\\text{ g}$' },
      { id: 'B', text: '$23.0\\text{ g}$' },
      { id: 'C', text: '$34.0\\text{ g}$' },
      { id: 'D', text: '$46.0\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: '$n_{\\text{alc}} = \\frac{23}{46} = 0.5\\text{ mol}$. Since $1\\text{ mol } \\text{C}_2\\text{H}_5\\text{OH}$ yields $1\\text{ mol } \\text{C}_2\\text{H}_5\\text{ONa}$, mass of solid salt = $0.5 \\times 68 = 34.0\\text{ g}$.'
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 5: Jupiter Station • Potassium Metal Reaction H2 Output',
    content_markdown: 'A piece of metallic potassium ($\\text{K}$, $M = 39\\text{ g/mol}$) reacts with pure ethylic alcohol according to: $2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{K} \\to 2\\text{C}_2\\text{H}_5\\text{OK} + \\text{H}_2\\uparrow$. If $7.8\\text{ g}$ of potassium reacts completely with excess alcohol, what volume of hydrogen gas ($\\text{H}_2$) at standard conditions ($24.79\\text{ L/mol}$) is collected?',
    options: [
      { id: 'A', text: '$1.2395\\text{ L}$' },
      { id: 'B', text: '$2.4790\\text{ L}$' },
      { id: 'C', text: '$4.9580\\text{ L}$' },
      { id: 'D', text: '$7.4370\\text{ L}$' }
    ],
    correct_option_id: 'B',
    explanation: '$n_{\\text{K}} = \\frac{7.8}{39} = 0.2\\text{ mol}$. Stoichiometric ratio: $n_{\\text{H}_2} = \\frac{1}{2} n_{\\text{K}} = 0.1\\text{ mol}$. Volume of $\\text{H}_2 = 0.1 \\times 24.79 = 2.479\\text{ L}$.'
  },
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 5: Jupiter Station • H2 Gas Volume from 28.75 mL Pure Alcohol',
    content_markdown: 'A reaction between $28.75\\text{ mL}$ of pure liquid ethylic alcohol ($D = 0.8\\text{ g/mL}$, $M = 46\\text{ g/mol}$) and excess metallic sodium releases hydrogen gas. What volume of $\\text{H}_2$ at standard conditions ($24.79\\text{ L/mol}$) is evolved?',
    options: [
      { id: 'A', text: '$3.0988\\text{ L}$' },
      { id: 'B', text: '$6.1975\\text{ L}$' },
      { id: 'C', text: '$9.2963\\text{ L}$' },
      { id: 'D', text: '$12.3950\\text{ L}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Mass: $m = 28.75 \\times 0.8 = 23.0\\text{ g} \\implies n = 0.5\\text{ mol}$. Hydrogen moles: $n_{\\text{H}_2} = \\frac{0.5}{2} = 0.25\\text{ mol}$. Volume: $V = 0.25 \\times 24.79 = 6.1975\\text{ L}$.'
  },

  // =========================================================================
  // SECTOR 6: SATURN RINGS • DUAL DISPLACEMENT: SODIUM WITH HYDRATED ALCOHOL (Q17 – Q19)
  // =========================================================================
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 6: Saturn Rings • Total H2 Moles from Alcohol-Water Mixture',
    content_markdown: 'When metallic sodium is dropped into an aqueous alcohol solution, BOTH ethylic alcohol and water react to release hydrogen gas:\n$$2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{Na} \\to 2\\text{C}_2\\text{H}_5\\text{ONa} + \\text{H}_2\\uparrow$$\n$$2\\text{H}_2\\text{O} + 2\\text{Na} \\to 2\\text{NaOH} + \\text{H}_2\\uparrow$$\nIf an excess of sodium is added to a mixture containing $4.6\\text{ g}$ of ethylic alcohol ($M = 46$) and $1.8\\text{ g}$ of water ($M = 18$), what is the total number of moles of $\\text{H}_2$ gas evolved?',
    options: [
      { id: 'A', text: '$0.05\\text{ mol}$' },
      { id: 'B', text: '$0.10\\text{ mol}$' },
      { id: 'C', text: '$0.15\\text{ mol}$' },
      { id: 'D', text: '$0.20\\text{ mol}$' }
    ],
    correct_option_id: 'B',
    explanation: 'Both compounds react: $n_{\\text{alc}} = \\frac{4.6}{46} = 0.1\\text{ mol} \\implies 0.05\\text{ mol H}_2$; $n_{\\text{water}} = \\frac{1.8}{18} = 0.1\\text{ mol} \\implies 0.05\\text{ mol H}_2$. Total $n_{\\text{H}_2} = 0.05 + 0.05 = 0.10\\text{ mol}$.'
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 6: Saturn Rings • H2 Output from 10 mL 46-Degree Alcohol Solution',
    content_markdown: 'A student adds excess metallic sodium to $10\\text{ mL}$ of a $46^\\circ$ ethylic alcohol solution ($D_{\\text{pure alcohol}} = 0.8\\text{ g/mL}$, $D_{\\text{water}} = 1.0\\text{ g/mL}$, $M_{\\text{alc}} = 46$, $M_{\\text{water}} = 18$). What is the total volume of hydrogen gas ($\\text{H}_2$) released at standard conditions ($24.79\\text{ L/mol}$)?',
    options: [
      { id: 'A', text: '$0.9916\\text{ L}$' },
      { id: 'B', text: '$3.7185\\text{ L}$' },
      { id: 'C', text: '$4.7101\\text{ L}$' },
      { id: 'D', text: '$5.7017\\text{ L}$' }
    ],
    correct_option_id: 'C',
    explanation: '1. $V_{\\text{alc}} = 4.6\\text{ mL} \\implies m = 3.68\\text{ g} \\implies n_{\\text{alc}} = 0.08\\text{ mol} \\implies n_{\\text{H}_2} = 0.04\\text{ mol}$.\\n2. $V_{\\text{water}} = 5.4\\text{ mL} \\implies m = 5.4\\text{ g} \\implies n_{\\text{water}} = 0.30\\text{ mol} \\implies n_{\\text{H}_2} = 0.15\\text{ mol}$.\\n3. Total $n_{\\text{H}_2} = 0.04 + 0.15 = 0.19\\text{ mol} \\implies V = 0.19 \\times 24.79 = 4.7101\\text{ L}$.'
  },
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 6: Saturn Rings • Water Content Derivation from H2 Output',
    content_markdown: 'A sample containing $9.2\\text{ g}$ of pure ethylic alcohol ($M = 46$) is mixed with an unknown mass of water. When treated with excess sodium, the total hydrogen gas evolved is $0.25\\text{ mol}$. What was the mass of water present in the mixture?',
    options: [
      { id: 'A', text: '$2.7\\text{ g}$' },
      { id: 'B', text: '$3.6\\text{ g}$' },
      { id: 'C', text: '$5.4\\text{ g}$' },
      { id: 'D', text: '$7.2\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: '$0.2\\text{ mol alcohol} \\implies 0.10\\text{ mol H}_2$. Therefore, water must yield $0.25 - 0.10 = 0.15\\text{ mol H}_2$. Moles of water: $n_{\\text{water}} = 2 \\times 0.15 = 0.30\\text{ mol}$. Mass of water: $m = 0.30 \\times 18 = 5.4\\text{ g}$.'
  },

  // =========================================================================
  // SECTOR 7: URANUS DEEP SPACE • SYNTHESIS STOICHIOMETRY WITH EFFICIENCY (Q20 – Q22)
  // =========================================================================
  {
    order_index: 20,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 7: Uranus Deep Space • Ethylene Hydration with 80% Efficiency',
    content_markdown: 'In an industrial plant, ethylene gas ($\\text{CH}_2=\\text{CH}_2$, $M = 28\\text{ g/mol}$) is hydrated to produce ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$, $M = 46\\text{ g/mol}$) via: $\\text{CH}_2=\\text{CH}_2 + \\text{H}_2\\text{O} \\xrightarrow{t^\\circ, \\text{H}^+} \\text{C}_2\\text{H}_5\\text{OH}$. If $56\\text{ kg}$ of ethylene gas is processed and the reaction achieves an efficiency of $80\\%$, what mass of ethylic alcohol is produced?',
    options: [
      { id: 'A', text: '$56.0\\text{ kg}$' },
      { id: 'B', text: '$73.6\\text{ kg}$' },
      { id: 'C', text: '$82.8\\text{ kg}$' },
      { id: 'D', text: '$92.0\\text{ kg}$' }
    ],
    correct_option_id: 'B',
    explanation: '$n_{\\text{ethylene}} = \\frac{56}{28} = 2.0\\text{ kmol}$. Theoretical mass of ethanol = $2.0 \\times 46 = 92\\text{ kg}$. With $80\\%$ efficiency: $m_{\\text{actual}} = 92 \\times 0.80 = 73.6\\text{ kg}$.'
  },
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 7: Uranus Deep Space • Glucose Fermentation with 75% Yield',
    content_markdown: 'A bio-refinery ferments $360\\text{ g}$ of glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$, $M = 180\\text{ g/mol}$) according to: $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{enzyme}} 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2\\uparrow$. If the fermentation efficiency is $75\\%$, what mass of ethylic alcohol ($M = 46\\text{ g/mol}$) is obtained?',
    options: [
      { id: 'A', text: '$92.0\\text{ g}$' },
      { id: 'B', text: '$138.0\\text{ g}$' },
      { id: 'C', text: '$165.6\\text{ g}$' },
      { id: 'D', text: '$184.0\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: '$n_{\\text{glucose}} = \\frac{360}{180} = 2.0\\text{ mol}$. Theoretical ethanol yield: $n_{\\text{alc}} = 2 \\times 2.0 = 4.0\\text{ mol} \\implies m_{\\text{theo}} = 184\\text{ g}$. Actual yield at $75\\%$ efficiency: $m_{\\text{actual}} = 184 \\times 0.75 = 138.0\\text{ g}$.'
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 7: Uranus Deep Space • Glucose Required for 100 mL Alcohol at 90% Yield',
    content_markdown: 'How many grams of glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$, $M = 180\\text{ g/mol}$) must be fermented at an efficiency of $90\\%$ to produce $100\\text{ mL}$ of pure liquid ethylic alcohol ($D = 0.8\\text{ g/mL}$, $M = 46\\text{ g/mol}$)?',
    options: [
      { id: 'A', text: '$140.87\\text{ g}$' },
      { id: 'B', text: '$156.52\\text{ g}$' },
      { id: 'C', text: '$173.91\\text{ g}$' },
      { id: 'D', text: '$193.24\\text{ g}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Mass of alcohol: $m_{\\text{alc}} = 100 \\times 0.8 = 80.0\\text{ g} \\implies n_{\\text{alc}} = \\frac{80}{46}\\text{ mol}$. Moles of glucose required theoretically: $n_{\\text{glu}} = \\frac{40}{46}\\text{ mol}$. Accounting for $90\\%$ efficiency: $m_{\\text{glucose}} = \\frac{40}{46} \\times 180 \\times \\frac{100}{90} \\approx 173.91\\text{ g}$.'
  },

  // =========================================================================
  // SECTOR 8: NEPTUNE FRONTIER • ESTERIFICATION & CALORIMETRY (Q23 – Q25)
  // =========================================================================
  {
    order_index: 23,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 8: Neptune Frontier • Ethyl Acetate Yield with Limiting Reactant',
    content_markdown: 'In an organic synthesis laboratory, a mixture of $23\\text{ g}$ of ethylic alcohol ($M = 46$) and $36\\text{ g}$ of pure acetic acid ($\\text{CH}_3\\text{COOH}$, $M = 60$) is heated with concentrated $\\text{H}_2\\text{SO}_4$:\n$$\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\underset{t^\\circ}{\\overset{\\text{H}_2\\text{SO}_4}{\\rightleftharpoons}} \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}$$\nIf the esterification equilibrium achieves an ester yield of $60\\%$, what mass of ethyl acetate ($\\text{CH}_3\\text{COOC}_2\\text{H}_5$, $M = 88\\text{ g/mol}$) is synthesized?',
    options: [
      { id: 'A', text: '$22.0\\text{ g}$' },
      { id: 'B', text: '$26.4\\text{ g}$' },
      { id: 'C', text: '$31.68\\text{ g}$' },
      { id: 'D', text: '$44.0\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: '$n_{\\text{alcohol}} = 0.5\\text{ mol}$ and $n_{\\text{acid}} = 0.6\\text{ mol}$. Alcohol is limiting ($0.5\\text{ mol}$). Theoretical mass of ethyl acetate: $0.5 \\times 88 = 44.0\\text{ g}$. At $60\\%$ yield: $m_{\\text{actual}} = 44.0 \\times 0.60 = 26.4\\text{ g}$.'
  },
  {
    order_index: 24,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 8: Neptune Frontier • Thermal Energy Output from 115 mL Ethanol',
    content_markdown: 'Complete combustion of $1\\text{ mol}$ of ethylic alcohol releases approximately $1367\\text{ kJ}$ of thermal energy:\n$$\\text{C}_2\\text{H}_5\\text{OH}_{(l)} + 3\\text{O}_{2(g)} \\to 2\\text{CO}_{2(g)} + 3\\text{H}_2\\text{O}_{(l)} \\quad (\\Delta H = -1367\\text{ kJ/mol})$$\nIn a spacecraft auxiliary power unit, how much thermal energy is released by completely burning $115\\text{ mL}$ of pure liquid ethylic alcohol ($D = 0.8\\text{ g/mL}$, $M = 46\\text{ g/mol}$)?',
    options: [
      { id: 'A', text: '$1367\\text{ kJ}$' },
      { id: 'B', text: '$2050.5\\text{ kJ}$' },
      { id: 'C', text: '$2734\\text{ kJ}$' },
      { id: 'D', text: '$3417.5\\text{ kJ}$' }
    ],
    correct_option_id: 'C',
    explanation: 'Mass: $m = 115 \\times 0.8 = 92.0\\text{ g} \\implies n = \\frac{92}{46} = 2.0\\text{ mol}$. Energy released: $Q = 2.0\\text{ mol} \\times 1367\\text{ kJ/mol} = 2734\\text{ kJ}$.'
  },
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.4,
    sectionName: 'Sector 8: Neptune Frontier • Oxygen Volume from Barium Carbonate Output',
    content_markdown: 'A bio-rocket engine combusts a sample of pure ethylic alcohol. When the gaseous combustion products ($\\text{CO}_2$ and $\\text{H}_2\\text{O}$) are cooled and passed through excess aqueous $\\text{Ba}(\\text{OH})_2$, exactly $98.5\\text{ g}$ of barium carbonate precipitate ($\\text{BaCO}_3$, $M = 197\\text{ g/mol}$) is collected. What volume of oxygen gas ($\\text{O}_2$) at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $24.79\\text{ L/mol}$) was consumed during this burn?',
    options: [
      { id: 'A', text: '$12.3950\\text{ L}$' },
      { id: 'B', text: '$18.5925\\text{ L}$' },
      { id: 'C', text: '$24.7900\\text{ L}$' },
      { id: 'D', text: '$37.1850\\text{ L}$' }
    ],
    correct_option_id: 'B',
    explanation: '$n_{\\text{CO}_2} = n_{\\text{BaCO}_3} = \\frac{98.5}{197} = 0.5\\text{ mol}$. According to the combustion equation $\\text{C}_2\\text{H}_5\\text{OH} + 3\\text{O}_2 \\to 2\\text{CO}_2 + 3\\text{H}_2\\text{O}$, the mole ratio is $3\\text{ O}_2 : 2\\text{ CO}_2 \\implies n_{\\text{O}_2} = 1.5 \\times 0.5 = 0.75\\text{ mol}$. Volume of $\\text{O}_2 = 0.75 \\times 24.79 = 18.5925\\text{ L}$.'
  }
];

async function seed() {
  const STUDENT_ID = '4745136c-bd25-4f45-a488-9f00f2121b70'; // Keithley Lake
  const TEACHER_ID = 'dc62e5df-2344-4785-b058-b95f5dbe0983'; // Thầy Thức
  const SUBJECT_ID = '6fc7387b-13b8-4e27-8240-a60c03dc1d51'; // CHEM_9
  const ASSIGNED_DATE = new Date('2026-11-06T00:00:00.000Z');

  console.log('🚀 Seeding 25 Stoichiometric Calculation Problems for Keithley Lake (06/11/2026)...');

  // 1. Clean existing assignments for Keithley on 2026-11-06 if any
  const existingAsgns = await prisma.daily_student_assignments.findMany({
    where: {
      student_id: STUDENT_ID,
      assigned_date: ASSIGNED_DATE,
      learning_units: { subject_id: SUBJECT_ID }
    },
    include: { assessment_attempts: true }
  });

  for (const asgn of existingAsgns) {
    for (const att of asgn.assessment_attempts) {
      await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
      await prisma.assessment_attempts.delete({ where: { id: att.id } });
    }
    await prisma.daily_student_assignments.delete({ where: { id: asgn.id } });
  }

  // 2. Create Learning Unit (Flight Briefing)
  const lectureMarkdown = `# 🚀 ORBITAL FLIGHT BRIEFING: ETHYLIC ALCOHOL STOICHIOMETRIC CALCULATIONS
**Keithley Lake (Astronaut Cadet Thiện) • Grade 9 Chemistry • 06 November 2026**

Interactive Simulation Studio: \`/lectures/chem9-lesson26-ethanol/index.html\`

---

## 🎯 Mission Flight Directives
Cadet Keithley, you have successfully mastered foundational alcohol theory and ABV calculations. Today's orbital workout advances your telemetry into **high-precision chemical calculations (Easy to Advanced)**:
1. Liquid density-to-molar stoichiometry: $m = V \\times D$ and $n = \\frac{m}{M}$ ($D_{\\text{ethanol}} = 0.8\\text{ g/mL}$, $M = 46\\text{ g/mol}$).
2. Clean combustion stoichiometry: oxygen demand, air volume requirements ($20\\%\\text{ O}_2$), carbon dioxide and water yields.
3. Absorption analytics: limewater precipitation ($\\text{CaCO}_3$, $M = 100\\text{ g/mol}$) and net mass fluctuation of absorption flasks.
4. Active metal displacement reactions: single-substance displacement with $\\text{Na}$/$\\text{K}$, and dual displacement of hydrated alcohol mixtures (both ethanol and water releasing $\\text{H}_2$).
5. Industrial efficiency stoichiometry: ethylene hydration and glucose fermentation with reaction yields ($H\\%$).
6. Esterification equilibrium and bio-rocket thermal calorimetry ($\\Delta H = -1367\\text{ kJ/mol}$).

---

## 🧪 Quick Reaction & Constant Arsenal
* **Combustion:** $\\text{C}_2\\text{H}_5\\text{OH} + 3\\text{O}_2 \\xrightarrow{t^\\circ} 2\\text{CO}_2 + 3\\text{H}_2\\text{O}$
* **Active Metal Displacement:** $2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{Na} \\to 2\\text{C}_2\\text{H}_5\\text{ONa} + \\text{H}_2\\uparrow$
* **Hydrated Alcohol Displacement:** $2\\text{H}_2\\text{O} + 2\\text{Na} \\to 2\\text{NaOH} + \\text{H}_2\\uparrow$
* **Limewater Precipitation:** $\\text{CO}_2 + \\text{Ca}(\\text{OH})_2 \\to \\text{CaCO}_3\\downarrow + \\text{H}_2\\text{O}$
* **Glucose Fermentation:** $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{enzyme}} 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2\\uparrow$
* **Ethylene Hydration:** $\\text{CH}_2=\\text{CH}_2 + \\text{H}_2\\text{O} \\xrightarrow{t^\\circ, \\text{H}^+} \\text{C}_2\\text{H}_5\\text{OH}$
* **Standard Gas Volume:** $1\\text{ mol} = 24.79\\text{ L}$ at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$)

*Fly through the 25 celestial problems below. Use your real-time green/red telemetry borders to track accuracy in real time!*`;

  const unit = await prisma.learning_units.create({
    data: {
      subject_id: SUBJECT_ID,
      created_by: TEACHER_ID,
      title: 'Lesson 26 Quantitative Mastery: Ethylic Alcohol Stoichiometric Calculations',
      description: 'Focused quantitative chemical calculations on ethylic alcohol: combustion, displacement, precipitation, fermentation yields, and esterification stoichiometry (25 problems).',
      lecture_content_markdown: lectureMarkdown,
      lecture_attachments: [],
      is_template: true
    }
  });
  console.log(`✅ Created Learning Unit: ${unit.id}`);

  // 3. Create Daily Student Assignment Card
  const assignment = await prisma.daily_student_assignments.create({
    data: {
      student_id: STUDENT_ID,
      learning_unit_id: unit.id,
      assigned_by: TEACHER_ID,
      assigned_date: ASSIGNED_DATE,
      custom_session_minutes: 90,
      teacher_daily_note: "Astronaut Keithley, welcome to your Quantitative Mastery Mission! You have already mastered alcohol theory and ABV calculations. Today's in-session session is dedicated to 25 quantitative stoichiometry calculations ranging from easy to challenging across all 8 Planetary Sectors. Keep an eye on your real-time green/red telemetry borders!",
      is_published: true
    }
  });
  console.log(`✅ Created Daily Assignment Card: ${assignment.id}`);

  // 4. Create Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: unit.id,
      type: 'IN_SESSION_90M',
      title: 'Orbital Quantitative Flight: Ethylic Alcohol Stoichiometric Workout (25 Problems • 90 mins)',
      instructions: 'Timed orbital chemistry session with per-question chronometer controls. 25 Quantitative calculation problems from easy to challenging (10.0 pts total, 0.4 pts each). 100% English telemetry.',
      time_limit_minutes: 90,
      max_score: 10.0
    }
  });
  console.log(`✅ Created Assessment: ${assessment.id}`);

  // 5. Create Questions
  for (const q of QUESTIONS_DATA) {
    const questionPayload = {
      content_markdown: q.content_markdown,
      sectionName: q.sectionName,
      options: q.options,
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
  console.log(`✅ Created ${QUESTIONS_DATA.length} calculation questions.`);

  // 6. Create Assessment Attempt
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: assignment.id,
      assessment_id: assessment.id,
      student_id: STUDENT_ID,
      status: 'NOT_STARTED'
    }
  });
  console.log(`✅ Created Assessment Attempt: ${attempt.id} (Status: NOT_STARTED)`);

  // 7. Save JSON backup
  const payloadPath = path.resolve(__dirname, 'content/chemistry_practice_2026_11_06.json');
  fs.mkdirSync(path.dirname(payloadPath), { recursive: true });
  fs.writeFileSync(payloadPath, JSON.stringify(QUESTIONS_DATA, null, 2), 'utf8');
  console.log(`✅ Saved questions backup to ${payloadPath}`);

  console.log('\n🎉 ALL DONE! 06/11/2026 Keithley Chemistry practice mission deployed successfully.');
}

seed()
  .catch((err) => {
    console.error('❌ Error seeding exercises:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
