const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const QUESTIONS_DATA = [
  // =========================================================================
  // SECTOR 1: MERCURY ORBIT • MOLECULAR ARCHITECTURE & ISOMERISM (Q1 - Q5)
  // =========================================================================
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 1: Mercury Orbit • Molecular Formula',
    content_markdown: 'What is the chemical molecular formula of ethylic alcohol (ethanol)?',
    options: [
      { id: 'A', text: '$\\text{CH}_4\\text{O}$' },
      { id: 'B', text: '$\\text{C}_2\\text{H}_4\\text{O}_2$' },
      { id: 'C', text: '$\\text{C}_2\\text{H}_6\\text{O}$' },
      { id: 'D', text: '$\\text{C}_2\\text{H}_4$' }
    ],
    correct_option_id: 'C',
    explanation: 'Ethylic alcohol has the molecular formula $\\text{C}_2\\text{H}_6\\text{O}$ (commonly condensed as $\\text{C}_2\\text{H}_5\\text{OH}$).'
  },
  {
    order_index: 2,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 1: Mercury Orbit • Condensed Structural Formula',
    content_markdown: 'Which of the following represents the condensed structural formula of ethylic alcohol?',
    options: [
      { id: 'A', text: '$\\text{CH}_3-\\text{O}-\\text{CH}_3$' },
      { id: 'B', text: '$\\text{CH}_3-\\text{CH}_2-\\text{OH}$' },
      { id: 'C', text: '$\\text{CH}_3-\\text{COOH}$' },
      { id: 'D', text: '$\\text{CH}_2=\\text{CH}-\\text{OH}$' }
    ],
    correct_option_id: 'B',
    explanation: 'The condensed structural formula of ethylic alcohol is $\\text{CH}_3-\\text{CH}_2-\\text{OH}$ (or $\\text{C}_2\\text{H}_5\\text{OH}$). Option A is dimethyl ether, and Option C is acetic acid.'
  },
  {
    order_index: 3,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 1: Mercury Orbit • Functional Hydroxyl Group',
    content_markdown: 'What is the characteristic functional group in an ethylic alcohol molecule that governs its key chemical properties?',
    options: [
      { id: 'A', text: '$-\\text{CH}_3\\text{ group}$' },
      { id: 'B', text: '$-\\text{C}_2\\text{H}_5\\text{ group}$' },
      { id: 'C', text: '$-\\text{OH}\\text{ (hydroxyl) group}$' },
      { id: 'D', text: '$-\\text{COOH}\\text{ group}$' }
    ],
    correct_option_id: 'C',
    explanation: 'The hydroxyl group ($-\\text{OH}$) attached to the ethyl hydrocarbon chain is the functional group that dictates all characteristic alcohol reactions, such as reaction with sodium metal.'
  },
  {
    order_index: 4,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 1: Mercury Orbit • Molar Mass Telemetry',
    content_markdown: 'What is the molar mass ($M$) of ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$)? $(H = 1, C = 12, O = 16)$',
    options: [
      { id: 'A', text: '$32\\text{ g/mol}$' },
      { id: 'B', text: '$44\\text{ g/mol}$' },
      { id: 'C', text: '$46\\text{ g/mol}$' },
      { id: 'D', text: '$60\\text{ g/mol}$' }
    ],
    correct_option_id: 'C',
    explanation: '$M = (12 \\times 2) + (1 \\times 6) + 16 = 24 + 6 + 16 = 46\\text{ g/mol}$.'
  },
  {
    order_index: 5,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 1: Mercury Orbit • Elemental Mass Percentage',
    content_markdown: 'What is the mass percentage of Oxygen ($\\%O$) in pure ethylic alcohol ($\\text{C}_2\\text{H}_6\\text{O}$)? Given atomic masses: $H = 1, C = 12, O = 16$.',
    options: [
      { id: 'A', text: '$26.09\\%$' },
      { id: 'B', text: '$34.78\\%$' },
      { id: 'C', text: '$52.17\\%$' },
      { id: 'D', text: '$13.04\\%$' }
    ],
    correct_option_id: 'B',
    explanation: 'Molar mass of $\\text{C}_2\\text{H}_6\\text{O} = 46\\text{ g/mol}$. Mass percentage of oxygen: $\\%O = \\frac{16}{46} \\times 100\\% \\approx 34.78\\%$. (For Carbon: $52.17\\%$, for Hydrogen: $13.04\\%$).'
  },

  // =========================================================================
  // SECTOR 2: VENUS BASE • PHYSICAL CONSTANTS, HYDROGEN BONDING & VOLATILITY (Q6 - Q10)
  // =========================================================================
  {
    order_index: 6,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 2: Venus Base • Physical State & Odor',
    content_markdown: 'At room temperature ($25^\\circ\\text{C}$), pure ethylic alcohol is observed as a:',
    options: [
      { id: 'A', text: 'Colorless gas with an intensely pungent odor.' },
      { id: 'B', text: 'Colorless liquid with a characteristic fragrant aroma and spicy taste.' },
      { id: 'C', text: 'White crystalline solid that dissolves readily in water.' },
      { id: 'D', text: 'Yellowish viscous liquid that is insoluble in water.' }
    ],
    correct_option_id: 'B',
    explanation: 'Pure ethylic alcohol is a mobile, colorless liquid possessing a characteristic pleasant aroma and warm, spicy taste.'
  },
  {
    order_index: 7,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 2: Venus Base • Density Relative to Water',
    content_markdown: 'How does the density of pure ethylic alcohol ($D \\approx 0.789\\text{ g/mL}$) compare to the density of water ($D = 1.0\\text{ g/mL}$)?',
    options: [
      { id: 'A', text: 'Ethylic alcohol is significantly heavier than water.' },
      { id: 'B', text: 'Ethylic alcohol is lighter than water.' },
      { id: 'C', text: 'Ethylic alcohol has the exact same density as water.' },
      { id: 'D', text: 'Cannot be compared because they do not form a homogeneous mixture.' }
    ],
    correct_option_id: 'B',
    explanation: 'Because $0.789\\text{ g/mL} < 1.0\\text{ g/mL}$, ethylic alcohol is lighter (less dense) than water.'
  },
  {
    order_index: 8,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 2: Venus Base • Boiling Point Dynamics',
    content_markdown: 'The boiling point of pure ethylic alcohol is $78.3^\\circ\\text{C}$, whereas pure water boils at $100^\\circ\\text{C}$. When heating an alcohol-water mixture in distillation, which substance evaporates faster?',
    options: [
      { id: 'A', text: 'Water evaporates faster because it has a higher molar heat capacity.' },
      { id: 'B', text: 'Ethylic alcohol evaporates faster because it has a lower boiling point.' },
      { id: 'C', text: 'Both substances evaporate at the exact same rate.' },
      { id: 'D', text: 'Neither evaporates until the mixture reaches $120^\\circ\\text{C}$.' }
    ],
    correct_option_id: 'B',
    explanation: 'With a lower boiling point ($78.3^\\circ\\text{C}$ vs $100^\\circ\\text{C}$), ethylic alcohol is more volatile and vaporizes preferentially first.'
  },
  {
    order_index: 9,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 2: Venus Base • Structural Isomerism',
    content_markdown: 'Dimethyl ether ($\\text{CH}_3-\\text{O}-\\text{CH}_3$) and ethylic alcohol ($\\text{CH}_3-\\text{CH}_2-\\text{OH}$) both share the same molecular formula $\\text{C}_2\\text{H}_6\\text{O}$. What chemical term describes their structural relationship?',
    options: [
      { id: 'A', text: 'Homologues' },
      { id: 'B', text: 'Structural Isomers' },
      { id: 'C', text: 'Isotopes' },
      { id: 'D', text: 'Polymers' }
    ],
    correct_option_id: 'B',
    explanation: 'Compounds that share the exact same molecular formula but possess different structural connectivity of atoms are called structural isomers.'
  },
  {
    order_index: 10,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 2: Venus Base • Intermolecular Hydrogen Bonding',
    content_markdown: 'Why is ethylic alcohol a liquid with a relatively high boiling point ($78.3^\\circ\\text{C}$), whereas its structural isomer dimethyl ether ($\\text{CH}_3-\\text{O}-\\text{CH}_3$) is a gas at room temperature (boiling point $-24^\\circ\\text{C}$)?',
    options: [
      { id: 'A', text: 'Because dimethyl ether has a much higher molecular mass.' },
      { id: 'B', text: 'Because ethylic alcohol molecules form intermolecular hydrogen bonds via the $-\\text{OH}$ group, whereas dimethyl ether cannot.' },
      { id: 'C', text: 'Because dimethyl ether decomposes rapidly in air.' },
      { id: 'D', text: 'Because ethylic alcohol forms covalent lattice crystals in liquid state.' }
    ],
    correct_option_id: 'B',
    explanation: 'The polar $-\\text{OH}$ group in ethanol enables extensive intermolecular hydrogen bonding, which requires significant thermal energy to break. Dimethyl ether lacks an $-\\text{OH}$ group and cannot form hydrogen bonds with itself.'
  },

  // =========================================================================
  // SECTOR 3: EARTH MISSION CONTROL • ALCOHOL DEGREE (ABV) & DILUTION (Q11 - Q15)
  // =========================================================================
  {
    order_index: 11,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 3: Earth Mission Control • Alcohol Degree Definition',
    content_markdown: 'What does the label "$40^\\circ$" on a beverage or laboratory alcohol bottle indicate?',
    options: [
      { id: 'A', text: 'The liquid boils at a temperature of $40^\\circ\\text{C}$.' },
      { id: 'B', text: 'In $100\\text{ g}$ of solution, there are $40\\text{ g}$ of pure ethylic alcohol.' },
      { id: 'C', text: 'In $100\\text{ mL}$ of solution, there are $40\\text{ mL}$ of pure ethylic alcohol.' },
      { id: 'D', text: 'The solution was prepared by adding $40\\text{ mL}$ of alcohol to $100\\text{ mL}$ of water.' }
    ],
    correct_option_id: 'C',
    explanation: 'Alcohol degree (ABV) is defined as the volume in $\\text{mL}$ of pure ethylic alcohol present in $100\\text{ mL}$ of solution at $20^\\circ\\text{C}$.'
  },
  {
    order_index: 12,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 3: Earth Mission Control • Pure Alcohol Volume in ABV Solution',
    content_markdown: 'How many milliliters of pure ethylic alcohol are contained in $250\\text{ mL}$ of a $40^\\circ$ alcohol solution?',
    options: [
      { id: 'A', text: '$40\\text{ mL}$' },
      { id: 'B', text: '$80\\text{ mL}$' },
      { id: 'C', text: '$100\\text{ mL}$' },
      { id: 'D', text: '$150\\text{ mL}$' }
    ],
    correct_option_id: 'C',
    explanation: '$V_{\\text{pure alc}} = \\frac{250 \\times 40}{100} = 100\\text{ mL}$.'
  },
  {
    order_index: 13,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 3: Earth Mission Control • ABV Calculation from Pure Volumes',
    content_markdown: 'A space cadet mixes $30\\text{ mL}$ of pure ethylic alcohol with $70\\text{ mL}$ of distilled water to obtain $100\\text{ mL}$ of solution. What is the alcohol degree (ABV) of this mixture?',
    options: [
      { id: 'A', text: '$30^\\circ$' },
      { id: 'B', text: '$70^\\circ$' },
      { id: 'C', text: '$42.8^\\circ$' },
      { id: 'D', text: '$100^\\circ$' }
    ],
    correct_option_id: 'A',
    explanation: '$Đ = \\frac{V_{\\text{pure alc}}}{V_{\\text{solution}}} \\times 100 = \\frac{30}{100} \\times 100 = 30^\\circ$.'
  },
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 3: Earth Mission Control • Solution Volume for Target ABV',
    content_markdown: 'You are provided with $50\\text{ mL}$ of pure ethylic alcohol. What total solution volume ($V_{\\text{solution}}$) can be formulated if you prepare a $25^\\circ$ alcohol solution?',
    options: [
      { id: 'A', text: '$100\\text{ mL}$' },
      { id: 'B', text: '$150\\text{ mL}$' },
      { id: 'C', text: '$200\\text{ mL}$' },
      { id: 'D', text: '$250\\text{ mL}$' }
    ],
    correct_option_id: 'C',
    explanation: '$V_{\\text{solution}} = \\frac{V_{\\text{pure alc}} \\times 100}{Đ} = \\frac{50 \\times 100}{25} = 200\\text{ mL}$.'
  },
  {
    order_index: 15,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 3: Earth Mission Control • Multi-Solution Mixing Calculation',
    content_markdown: 'If you mix $100\\text{ mL}$ of $60^\\circ$ ethylic alcohol solution with $100\\text{ mL}$ of $40^\\circ$ ethylic alcohol solution, what is the alcohol degree (ABV) of the resulting $200\\text{ mL}$ mixture?',
    options: [
      { id: 'A', text: '$45^\\circ$' },
      { id: 'B', text: '$50^\\circ$' },
      { id: 'C', text: '$55^\\circ$' },
      { id: 'D', text: '$100^\\circ$' }
    ],
    correct_option_id: 'B',
    explanation: '$V_1 = \\frac{100 \\times 60}{100} = 60\\text{ mL}$. $V_2 = \\frac{100 \\times 40}{100} = 40\\text{ mL}$. Total pure ethanol = $60 + 40 = 100\\text{ mL}$. New ABV = $\\frac{100}{200} \\times 100 = 50^\\circ$.'
  },

  // =========================================================================
  // SECTOR 4: MARS OUTPOST • BIOFUEL COMBUSTION & PROPULSION (Q16 - Q20)
  // =========================================================================
  {
    order_index: 16,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 4: Mars Outpost • Biofuel Combustion Flame',
    content_markdown: 'When ethylic alcohol undergoes complete combustion in air, what color is the flame and what products are released?',
    options: [
      { id: 'A', text: 'Yellow smoky flame; produces toxic $\\text{CO}$ and $\\text{H}_2\\text{O}$.' },
      { id: 'B', text: 'Pale blue smokeless flame; produces $\\text{CO}_2$ and $\\text{H}_2\\text{O}$ vapor.' },
      { id: 'C', text: 'Bright purple flame; produces $\\text{CO}_2$ and $\\text{H}_2$ gas.' },
      { id: 'D', text: 'Green flame; produces elemental carbon soot and $\\text{H}_2\\text{O}$.' }
    ],
    correct_option_id: 'B',
    explanation: 'Clean combustion of ethylic alcohol produces a pale blue, smokeless flame with carbon dioxide and water vapor: $\\text{C}_2\\text{H}_5\\text{OH} + 3\\text{O}_2 \\xrightarrow{t^\\circ} 2\\text{CO}_2 + 3\\text{H}_2\\text{O}$.'
  },
  {
    order_index: 17,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 4: Mars Outpost • Combustion Stoichiometry',
    content_markdown: 'In the balanced combustion reaction $\\text{C}_2\\text{H}_5\\text{OH} + x\\text{O}_2 \\xrightarrow{t^\\circ} 2\\text{CO}_2 + 3\\text{H}_2\\text{O}$, what is the stoichiometric coefficient $x$ of oxygen ($\\text{O}_2$)?',
    options: [
      { id: 'A', text: '$1$' },
      { id: 'B', text: '$2$' },
      { id: 'C', text: '$3$' },
      { id: 'D', text: '$4$' }
    ],
    correct_option_id: 'C',
    explanation: 'Product oxygen atoms: $(2 \\times 2) + (3 \\times 1) = 7\\text{ O}$. Since ethanol provides $1\\text{ O}$, the remaining $6\\text{ O}$ require $3\\text{ O}_2$ molecules ($x = 3$).'
  },
  {
    order_index: 18,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 4: Mars Outpost • Complete Combustion Yields',
    content_markdown: 'Complete combustion of $0.1\\text{ mol}$ of ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$) generates how many moles of carbon dioxide ($\\text{CO}_2$) and water ($\\text{H}_2\\text{O}$)?',
    options: [
      { id: 'A', text: '$0.1\\text{ mol } \\text{CO}_2\\text{ and } 0.1\\text{ mol } \\text{H}_2\\text{O}$' },
      { id: 'B', text: '$0.2\\text{ mol } \\text{CO}_2\\text{ and } 0.3\\text{ mol } \\text{H}_2\\text{O}$' },
      { id: 'C', text: '$0.3\\text{ mol } \\text{CO}_2\\text{ and } 0.2\\text{ mol } \\text{H}_2\\text{O}$' },
      { id: 'D', text: '$0.2\\text{ mol } \\text{CO}_2\\text{ and } 0.2\\text{ mol } \\text{H}_2\\text{O}$' }
    ],
    correct_option_id: 'B',
    explanation: 'From $\\text{C}_2\\text{H}_5\\text{OH} + 3\\text{O}_2 \\xrightarrow{t^\\circ} 2\\text{CO}_2 + 3\\text{H}_2\\text{O}$:\n$n_{\\text{CO}_2} = 2 \\times 0.1 = 0.2\\text{ mol}$, and $n_{\\text{H}_2\\text{O}} = 3 \\times 0.1 = 0.3\\text{ mol}$.'
  },
  {
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 4: Mars Outpost • Oxygen Volume at Standard Conditions',
    content_markdown: 'What volume of oxygen gas ($\\text{O}_2$) at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$, $24.79\\text{ L/mol}$) is required to completely burn $0.2\\text{ mol}$ of ethylic alcohol?',
    options: [
      { id: 'A', text: '$4.958\\text{ L}$' },
      { id: 'B', text: '$9.916\\text{ L}$' },
      { id: 'C', text: '$14.874\\text{ L}$' },
      { id: 'D', text: '$24.790\\text{ L}$' }
    ],
    correct_option_id: 'C',
    explanation: '$n_{\\text{O}_2} = 3 \\times n_{\\text{alc}} = 3 \\times 0.2 = 0.6\\text{ mol}$.\n$V_{\\text{O}_2} = 0.6 \\times 24.79 = 14.874\\text{ L}$.'
  },
  {
    order_index: 20,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 4: Mars Outpost • Combustion Stoichiometry Rules',
    content_markdown: 'Complete combustion of $1\\text{ mol}$ of a saturated monovalent alcohol $\\text{C}_n\\text{H}_{2n+2}\\text{O}$ produces water vapor ($\\text{H}_2\\text{O}$) and carbon dioxide ($\\text{CO}_2$). Which statement about the mole ratio is always correct?',
    options: [
      { id: 'A', text: '$n_{\\text{H}_2\\text{O}} < n_{\\text{CO}_2}$' },
      { id: 'B', text: '$n_{\\text{H}_2\\text{O}} = n_{\\text{CO}_2}$' },
      { id: 'C', text: '$n_{\\text{H}_2\\text{O}} > n_{\\text{CO}_2}$, and $n_{\\text{H}_2\\text{O}} - n_{\\text{CO}_2} = n_{\\text{alcohol}}$' },
      { id: 'D', text: '$n_{\\text{CO}_2} - n_{\\text{H}_2\\text{O}} = 1\\text{ mol}$' }
    ],
    correct_option_id: 'C',
    explanation: 'In combustion of $\\text{C}_n\\text{H}_{2n+2}\\text{O}$, $n\\text{ moles of }\\text{CO}_2$ and $(n+1)\\text{ moles of }\\text{H}_2\\text{O}$ are produced. Therefore $n_{\\text{H}_2\\text{O}} > n_{\\text{CO}_2}$ and $n_{\\text{H}_2\\text{O}} - n_{\\text{CO}_2} = n_{\\text{alcohol}}$.'
  },

  // =========================================================================
  // SECTOR 5: JUPITER STATION • ACTIVE ALKALI METALS (Na & K) (Q21 - Q25)
  // =========================================================================
  {
    order_index: 21,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 5: Jupiter Station • Active Metal Displacement',
    content_markdown: 'Which of the following active metals reacts with pure ethylic alcohol at room temperature to release hydrogen gas ($\\text{H}_2$)?',
    options: [
      { id: 'A', text: 'Copper ($\\text{Cu}$)' },
      { id: 'B', text: 'Silver ($\\text{Ag}$)' },
      { id: 'C', text: 'Iron ($\\text{Fe}$)' },
      { id: 'D', text: 'Sodium ($\\text{Na}$)' }
    ],
    correct_option_id: 'D',
    explanation: 'Active alkali metals like Sodium ($\\text{Na}$) and Potassium ($\\text{K}$) displace the active hydrogen atom in the $-\\text{OH}$ group of ethylic alcohol.'
  },
  {
    order_index: 22,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 5: Jupiter Station • Sodium Reaction Observations',
    content_markdown: 'When a small piece of metallic sodium ($\\text{Na}$) is dropped into pure ethylic alcohol, what phenomenon is observed?',
    options: [
      { id: 'A', text: 'Sodium floats on the surface, melts into a silvery ball, and ignites immediately.' },
      { id: 'B', text: 'Sodium sinks to the bottom, gradually dissolves, and effervescent colorless gas bubbles rise.' },
      { id: 'C', text: 'A heavy white precipitate settles immediately to the bottom of the test tube.' },
      { id: 'D', text: 'The liquid turns vibrant fuchsia pink without gas generation.' }
    ],
    correct_option_id: 'B',
    explanation: 'Sodium is denser than alcohol ($0.97\\text{ g/cm}^3 > 0.789\\text{ g/mL}$), so it sinks to the bottom, gradually dissolves, and evolves colorless $\\text{H}_2$ gas bubbles: $2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{Na} \\to 2\\text{C}_2\\text{H}_5\\text{ONa} + \\text{H}_2\\uparrow$.'
  },
  {
    order_index: 23,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 5: Jupiter Station • Hydroxyl Group Reactivity Check',
    content_markdown: 'Among the following organic compounds: (1) $\\text{CH}_3-\\text{CH}_3$, (2) $\\text{CH}_3-\\text{CH}_2-\\text{OH}$, (3) $\\text{CH}_2=\\text{CH}_2$, (4) $\\text{CH}_3-\\text{OH}$, which ones can react with metallic sodium ($\\text{Na}$)?',
    options: [
      { id: 'A', text: '(1) and (2)' },
      { id: 'B', text: '(2) and (3)' },
      { id: 'C', text: '(2) and (4)' },
      { id: 'D', text: '(1) and (3)' }
    ],
    correct_option_id: 'C',
    explanation: 'Only compounds containing the active $-\\text{OH}$ group react with sodium to evolve $\\text{H}_2$ gas. Both ethanol (2) and methanol (4) contain $-\\text{OH}$.'
  },
  {
    order_index: 24,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 5: Jupiter Station • Hydrogen Gas Evolution from Sodium Reaction',
    content_markdown: 'When $0.4\\text{ mol}$ of pure ethylic alcohol reacts completely with excess metallic sodium ($\\text{Na}$), how many moles of hydrogen gas ($\\text{H}_2$) are released?',
    options: [
      { id: 'A', text: '$0.1\\text{ mol}$' },
      { id: 'B', text: '$0.2\\text{ mol}$' },
      { id: 'C', text: '$0.4\\text{ mol}$' },
      { id: 'D', text: '$0.8\\text{ mol}$' }
    ],
    correct_option_id: 'B',
    explanation: 'From $2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{Na} \\to 2\\text{C}_2\\text{H}_5\\text{ONa} + \\text{H}_2\\uparrow$, $n_{\\text{H}_2} = \\frac{1}{2} n_{\\text{alc}} = \\frac{0.4}{2} = 0.2\\text{ mol}$.'
  },
  {
    order_index: 25,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 5: Jupiter Station • Potassium Alkali Metal Reaction',
    content_markdown: 'Like metallic sodium ($\\text{Na}$), metallic potassium ($\\text{K}$) belongs to Group 1 alkali metals and reacts vigorously with pure ethylic alcohol. What are the reaction products?',
    options: [
      { id: 'A', text: 'Potassium ethoxide ($\\text{C}_2\\text{H}_5\\text{OK}$) and hydrogen gas ($\\text{H}_2\\uparrow$).' },
      { id: 'B', text: 'Potassium oxide ($\\text{K}_2\\text{O}$) and ethane gas ($\\text{C}_2\\text{H}_6\\uparrow$).' },
      { id: 'C', text: 'Potassium hydroxide ($\\text{KOH}$) and ethylene gas ($\\text{C}_2\\text{H}_4\\uparrow$).' },
      { id: 'D', text: 'Potassium carbonate ($\\text{K}_2\\text{CO}_3$) and water ($\\text{H}_2\\text{O}$).' }
    ],
    correct_option_id: 'A',
    explanation: '$2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{K} \\to 2\\text{C}_2\\text{H}_5\\text{OK} + \\text{H}_2\\uparrow$. The potassium atom displaces the hydrogen atom in the $-\\text{OH}$ group, forming potassium ethoxide and hydrogen gas.'
  },

  // =========================================================================
  // SECTOR 6: SATURN RINGS • BIOCHEMICAL & INDUSTRIAL PREPARATION (Q26 - Q30)
  // =========================================================================
  {
    order_index: 26,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 6: Saturn Rings • Industrial Ethylene Hydration',
    content_markdown: 'Which gaseous hydrocarbon is hydrated (reacted with $\\text{H}_2\\text{O}$ with acid catalyst and heat) to produce ethylic alcohol industrially?',
    options: [
      { id: 'A', text: 'Methane ($\\text{CH}_4$)' },
      { id: 'B', text: 'Ethylene ($\\text{CH}_2=\\text{CH}_2$)' },
      { id: 'C', text: 'Carbon dioxide ($\\text{CO}_2$)' },
      { id: 'D', text: 'Hydrogen gas ($\\text{H}_2$)' }
    ],
    correct_option_id: 'B',
    explanation: 'Petrochemical hydration of ethylene gas synthesizes ethanol: $\\text{CH}_2=\\text{CH}_2 + \\text{H}_2\\text{O} \\xrightarrow{t^\\circ, \\text{H}^+} \\text{C}_2\\text{H}_5\\text{OH}$.'
  },
  {
    order_index: 27,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 6: Saturn Rings • Synthetic Hydration Mass Yield',
    content_markdown: 'In the industrial hydration reaction $\\text{CH}_2=\\text{CH}_2 + \\text{H}_2\\text{O} \\xrightarrow{t^\\circ, \\text{H}^+} \\text{C}_2\\text{H}_5\\text{OH}$, assuming $100\\%$ yield, what mass of ethylic alcohol is produced from $0.5\\text{ mol}$ of ethylene gas?',
    options: [
      { id: 'A', text: '$14\\text{ g}$' },
      { id: 'B', text: '$23\\text{ g}$' },
      { id: 'C', text: '$46\\text{ g}$' },
      { id: 'D', text: '$92\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: '$n_{\\text{C}_2\\text{H}_5\\text{OH}} = n_{\\text{C}_2\\text{H}_4} = 0.5\\text{ mol}$.\nMass $m = 0.5 \\times 46 = 23\\text{ g}$.'
  },
  {
    order_index: 28,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 6: Saturn Rings • Glucose Fermentation Stoichiometry',
    content_markdown: 'In a fermentation reactor, how many moles of glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) are required to synthesize $1.0\\text{ mol}$ of ethylic alcohol via the equation $\\text{C}_6\\text{H}_{12}\\text{O}_6 \\xrightarrow{\\text{enzyme}} 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2\\uparrow$? (Assume $100\\%$ yield).',
    options: [
      { id: 'A', text: '$0.25\\text{ mol}$' },
      { id: 'B', text: '$0.5\\text{ mol}$' },
      { id: 'C', text: '$1.0\\text{ mol}$' },
      { id: 'D', text: '$2.0\\text{ mol}$' }
    ],
    correct_option_id: 'B',
    explanation: 'The stoichiometric ratio is $1\\text{ mol glucose} : 2\\text{ mol ethanol}$. Therefore, producing $1.0\\text{ mol}$ of ethanol requires $n_{\\text{glucose}} = \\frac{1.0}{2} = 0.5\\text{ mol}$.'
  },
  {
    order_index: 29,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 6: Saturn Rings • E5 Biofuel Blend Specifications',
    content_markdown: 'What does standard "E5 Biofuel" consist of by volume?',
    options: [
      { id: 'A', text: '$5\\%$ distilled water and $95\\%$ ethylic alcohol.' },
      { id: 'B', text: '$5\\%$ bio-ethanol and $95\\%$ mineral gasoline.' },
      { id: 'C', text: '$50\\%$ ethylic alcohol and $50\\%$ gasoline.' },
      { id: 'D', text: '$5\\%$ dissolved ethylene gas in gasoline.' }
    ],
    correct_option_id: 'B',
    explanation: 'E5 biofuel comprises $5\\%$ bio-ethanol blended with $95\\%$ standard petroleum gasoline by volume to burn cleaner and reduce carbon emissions.'
  },
  {
    order_index: 30,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 6: Saturn Rings • Esterification Reaction Preview',
    content_markdown: 'When ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$) is heated with acetic acid ($\\text{CH}_3\\text{COOH}$) in the presence of concentrated $\\text{H}_2\\text{SO}_4$, an organic compound with a pleasant fruity apple fragrance is formed. What class of compound is produced?',
    options: [
      { id: 'A', text: 'Alkane' },
      { id: 'B', text: 'Ester (Ethyl acetate, $\\text{CH}_3\\text{COOC}_2\\text{H}_5$)' },
      { id: 'C', text: 'Inorganic mineral salt' },
      { id: 'D', text: 'Synthetic polymer' }
    ],
    correct_option_id: 'B',
    explanation: 'Reaction between an alcohol and a carboxylic acid produces an **ester** and water (Esterification): $\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\underset{t^\\circ}{\\overset{\\text{H}_2\\text{SO}_4}{\\rightleftharpoons}} \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}$. Ethyl acetate has a characteristic pleasant fruity scent.'
  },

  // =========================================================================
  // SECTOR 7: URANUS DEEP SPACE • QUANTITATIVE CALCULATIONS & SOLVENT (Q31 - Q35)
  // =========================================================================
  {
    order_index: 31,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 7: Uranus Deep Space • Mass of Ethanol in ABV Solution',
    content_markdown: 'Given that the density of pure ethylic alcohol is $0.8\\text{ g/mL}$, calculate the mass of pure ethylic alcohol contained in $100\\text{ mL}$ of $90^\\circ$ alcohol.',
    options: [
      { id: 'A', text: '$90\\text{ g}$' },
      { id: 'B', text: '$72\\text{ g}$' },
      { id: 'C', text: '$80\\text{ g}$' },
      { id: 'D', text: '$112.5\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: '$V_{\\text{pure alc}} = \\frac{100 \\times 90}{100} = 90\\text{ mL}$. Mass $m = V \\times D = 90\\text{ mL} \\times 0.8\\text{ g/mL} = 72\\text{ g}$.'
  },
  {
    order_index: 32,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 7: Uranus Deep Space • Molar Quantity Calculation',
    content_markdown: 'Calculate the number of moles contained in $23\\text{ g}$ of pure ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$, $M = 46\\text{ g/mol}$).',
    options: [
      { id: 'A', text: '$0.25\\text{ mol}$' },
      { id: 'B', text: '$0.5\\text{ mol}$' },
      { id: 'C', text: '$1.0\\text{ mol}$' },
      { id: 'D', text: '$1.5\\text{ mol}$' }
    ],
    correct_option_id: 'B',
    explanation: '$n = \\frac{m}{M} = \\frac{23}{46} = 0.5\\text{ mol}$.'
  },
  {
    order_index: 33,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 7: Uranus Deep Space • Combustion Mass Determination',
    content_markdown: 'A space cadet burns an unknown quantity of pure ethylic alcohol completely in oxygen, collecting $0.4\\text{ mol}$ of carbon dioxide gas ($\\text{CO}_2$). What was the mass of ethylic alcohol burned? ($M = 46\\text{ g/mol}$)',
    options: [
      { id: 'A', text: '$4.6\\text{ g}$' },
      { id: 'B', text: '$9.2\\text{ g}$' },
      { id: 'C', text: '$13.8\\text{ g}$' },
      { id: 'D', text: '$18.4\\text{ g}$' }
    ],
    correct_option_id: 'B',
    explanation: 'From $\\text{C}_2\\text{H}_5\\text{OH} + 3\\text{O}_2 \\xrightarrow{t^\\circ} 2\\text{CO}_2 + 3\\text{H}_2\\text{O}$:\n$n_{\\text{alcohol}} = \\frac{1}{2} n_{\\text{CO}_2} = \\frac{0.4}{2} = 0.2\\text{ mol}$.\nMass $m = 0.2 \\times 46 = 9.2\\text{ g}$.'
  },
  {
    order_index: 34,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 7: Uranus Deep Space • Versatile Solvent Properties',
    content_markdown: 'In medical dispensary logistics, "Tincture of Iodine" is prepared by dissolving solid iodine crystals ($\\text{I}_2$) in ethylic alcohol. What physical property of ethylic alcohol does this application demonstrate?',
    options: [
      { id: 'A', text: 'Combustibility in oxygen.' },
      { id: 'B', text: 'Capacity to act as an effective non-aqueous organic solvent.' },
      { id: 'C', text: 'Displacement reaction with alkali metals.' },
      { id: 'D', text: 'Lower boiling point than liquid nitrogen.' }
    ],
    correct_option_id: 'B',
    explanation: 'Ethylic alcohol is a versatile solvent capable of dissolving many organic substances and non-polar solutes like iodine ($\\text{I}_2$) that are sparingly soluble in pure water.'
  },
  {
    order_index: 35,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 7: Uranus Deep Space • Antiseptic Concentration Efficacy',
    content_markdown: 'Why is $70^\\circ$ ethylic alcohol preferred over $90^\\circ$ alcohol for medical wound disinfection and skin sanitization?',
    options: [
      { id: 'A', text: 'Because $70^\\circ$ alcohol is much less expensive to synthesize.' },
      { id: 'B', text: 'Because $90^\\circ$ alcohol evaporates too fast and coagulates bacterial surface proteins too rapidly, blocking penetration into the microbial cell.' },
      { id: 'C', text: 'Because $90^\\circ$ alcohol contains zero ethylic alcohol molecules.' },
      { id: 'D', text: 'Because $70^\\circ$ alcohol is non-flammable under all thermal conditions.' }
    ],
    correct_option_id: 'B',
    explanation: 'At $90^\\circ$, rapid protein coagulation forms an impermeable outer crust that protects the pathogen inside. The $30\\%$ water content in $70^\\circ$ alcohol slows evaporation and facilitates deep cellular penetration to denature all internal microbial proteins.'
  },

  // =========================================================================
  // SECTOR 8: NEPTUNE FRONTIER • 5 CONSTRUCTED-RESPONSE PROBLEMS (Q36 - Q40)
  // =========================================================================
  {
    order_index: 36,
    type: 'ESSAY_UPLOAD',
    points: 0.6,
    sectionName: 'Sector 8: Neptune Frontier • Problem 1: Structure, Mechanism & Chemical Identification',
    content_markdown: `### Orbital Problem 1: Structure, Mechanism & Chemical Identification (0.6 Points)

**Part a):**
* Write the condensed structural formula of ethylic alcohol and explicitly identify its characteristic functional group.
* Explain briefly why ethylic alcohol readily reacts with metallic sodium ($\\text{Na}$) while ethane ($\\text{CH}_3-\\text{CH}_3$) does not react.

**Part b):**
* You are given two unlabeled test tubes containing two colorless liquids: **pure ethylic alcohol** ($\\text{C}_2\\text{H}_5\\text{OH}$) and **liquid hexane** ($\\text{C}_6\\text{H}_{14}$).
* Describe a simple chemical experiment to distinguish between them, stating the expected observations and writing the balanced chemical equation.`,
    rubric: `* Part a (0.3 pts): Condensed formula CH3-CH2-OH and -OH hydroxyl group; explanation that the hydrogen atom bonded to oxygen in -OH is polarized and reactive, whereas ethane has only non-polar C-H bonds that cannot be displaced by Na.
* Part b (0.3 pts): Add a piece of sodium metal into samples of each liquid; ethanol dissolves Na and releases effervescent bubbles of H2 (2C2H5OH + 2Na -> 2C2H5ONa + H2 up), whereas hexane shows no reaction.`,
    explanation: `Model Answer:
a) Condensed formula: CH3-CH2-OH. The functional group is -OH (hydroxyl). Ethylic alcohol reacts with Na because the hydrogen atom in the -OH group is active, whereas ethane has only C-H bonds that cannot be displaced by Na.
b) Chemical test: Add a pellet of metallic sodium (Na) to samples of both liquids.
- The sample that reacts, dissolves Na, and releases colorless gas bubbles (H2) is ethylic alcohol:
  2C2H5OH + 2Na -> 2C2H5ONa + H2 (up)
- The sample with no reaction is liquid hexane.`
  },
  {
    order_index: 37,
    type: 'ESSAY_UPLOAD',
    points: 0.6,
    sectionName: 'Sector 8: Neptune Frontier • Problem 2: ABV, Density & Precision Dilution Workout',
    content_markdown: `### Orbital Problem 2: Alcohol Degree (ABV) & Precision Dilution Workout (0.6 Points)

An orbital medical dispensary carries a $500\\text{ mL}$ bottle of concentrated $90^\\circ$ ethylic alcohol.
Given: Density of pure ethylic alcohol $D = 0.8\\text{ g/mL}$.

**Part a):**
* Calculate the volume (in $\\text{mL}$) of pure ethylic alcohol inside this $500\\text{ mL}$ bottle.
* Calculate the mass (in $\\text{grams}$) of pure ethylic alcohol contained in the bottle.

**Part b):**
* A flight surgeon takes $140\\text{ mL}$ of this $90^\\circ$ alcohol stock and needs to prepare standard $70^\\circ$ antiseptic solution for spacecraft decontamination.
* Calculate the volume of distilled water (in $\\text{mL}$) that must be added to dilute the $140\\text{ mL}$ of $90^\\circ$ stock into a $70^\\circ$ solution. *(Assume volumes are additive).*`,
    rubric: `* Part a (0.3 pts): Volume of pure ethanol: V = (500 * 90) / 100 = 450 mL. Mass: m = 450 * 0.8 = 360 g.
* Part b (0.3 pts): In 140 mL of 90 deg stock: V_pure = (140 * 90) / 100 = 126 mL. Total 70 deg solution: V_new = (126 * 100) / 70 = 180 mL. Water to add: 180 - 140 = 40 mL.`,
    explanation: `Model Answer:
a) Volume of pure ethanol: V = (500 * 90) / 100 = 450 mL.
   Mass of pure ethanol: m = V * D = 450 * 0.8 = 360 g.
b) Volume of pure ethanol in 140 mL of 90 deg stock: V_pure = (140 * 90) / 100 = 126 mL.
   Target 70 deg total solution volume: V_new = (126 * 100) / 70 = 180 mL.
   Volume of distilled water to add: V_water = V_new - V_stock = 180 - 140 = 40 mL.`
  },
  {
    order_index: 38,
    type: 'ESSAY_UPLOAD',
    points: 0.6,
    sectionName: 'Sector 8: Neptune Frontier • Problem 3: Stoichiometry of Sodium Displacement Reaction',
    content_markdown: `### Orbital Problem 3: Stoichiometry of Active Metal Displacement (0.6 Points)

In an orbital laboratory, a space chemist introduces excess metallic sodium ($\\text{Na}$) into a reaction vessel containing $9.2\\text{ g}$ of pure ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$).
Given atomic masses: $H = 1$, $C = 12$, $O = 16$, $Na = 23$. Standard gas molar volume: $24.79\\text{ L/mol}$.

**Part a):**
* Write the balanced chemical equation for the displacement reaction.

**Part b):**
* Calculate the number of moles of ethylic alcohol consumed.
* Calculate the volume of hydrogen gas ($\\text{H}_2$) released at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$).

**Part c):**
* Calculate the mass (in $\\text{grams}$) of sodium ethoxide ($\\text{C}_2\\text{H}_5\\text{ONa}$) produced after the reaction reaches completion.`,
    rubric: `* Part a (0.2 pts): Balanced equation 2C2H5OH + 2Na -> 2C2H5ONa + H2 (up).
* Part b (0.2 pts): n_alc = 9.2 / 46 = 0.2 mol => n_H2 = 0.1 mol => V_H2 = 0.1 * 24.79 = 2.479 L.
* Part c (0.2 pts): n_C2H5ONa = 0.2 mol, M = 68 g/mol => m = 0.2 * 68 = 13.6 g.`,
    explanation: `Model Answer:
a) Balanced equation: 2C2H5OH + 2Na -> 2C2H5ONa + H2 (up).
b) Moles of ethanol: n_alc = 9.2 / 46 = 0.2 mol.
   From stoichiometry: n_H2 = (1/2) * n_alc = 0.1 mol.
   Volume of H2 at standard conditions: V_H2 = 0.1 * 24.79 = 2.479 L.
c) Moles of C2H5ONa = n_alc = 0.2 mol.
   Molar mass M(C2H5ONa) = (12 * 2) + 5 + 16 + 23 = 68 g/mol.
   Mass: m = 0.2 * 68 = 13.6 g.`
  },
  {
    order_index: 39,
    type: 'ESSAY_UPLOAD',
    points: 0.6,
    sectionName: 'Sector 8: Neptune Frontier • Problem 4: Bio-Propellant Combustion Stoichiometry',
    content_markdown: `### Orbital Problem 4: Bio-Propellant Combustion Stoichiometry (0.6 Points)

A bio-propellant thruster test cleanly burns $13.8\\text{ g}$ of pure ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$) in a high-pressure combustion chamber.
Given atomic masses: $H = 1$, $C = 12$, $O = 16$. Standard gas molar volume: $24.79\\text{ L/mol}$.

**Part a):**
* Write the balanced chemical equation for the complete combustion of ethylic alcohol.

**Part b):**
* Calculate the volume of oxygen gas ($\\text{O}_2$) required at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$).
* Calculate the total volume of air required for combustion, assuming oxygen makes up $20\\%$ of atmospheric air by volume.

**Part c):**
* Calculate the mass (in $\\text{grams}$) of carbon dioxide ($\\text{CO}_2$) and water vapor ($\\text{H}_2\\text{O}$) formed.`,
    rubric: `* Part a (0.2 pts): Balanced equation C2H5OH + 3O2 -t°-> 2CO2 + 3H2O.
* Part b (0.2 pts): n_alc = 13.8 / 46 = 0.3 mol => n_O2 = 0.9 mol => V_O2 = 0.9 * 24.79 = 22.311 L. V_air = 22.311 * 5 = 111.555 L.
* Part c (0.2 pts): n_CO2 = 0.6 mol => m_CO2 = 0.6 * 44 = 26.4 g. n_H2O = 0.9 mol => m_H2O = 0.9 * 18 = 16.2 g.`,
    explanation: `Model Answer:
a) Balanced equation: C2H5OH + 3O2 -t°-> 2CO2 + 3H2O.
b) n_alc = 13.8 / 46 = 0.3 mol.
   From stoichiometry: n_O2 = 3 * 0.3 = 0.9 mol.
   Volume of O2: V_O2 = 0.9 * 24.79 = 22.311 L.
   Volume of air: V_air = 22.311 * 5 = 111.555 L.
c) n_CO2 = 2 * 0.3 = 0.6 mol => m_CO2 = 0.6 * 44 = 26.4 g.
   n_H2O = 3 * 0.3 = 0.9 mol => m_H2O = 0.9 * 18 = 16.2 g.`
  },
  {
    order_index: 40,
    type: 'ESSAY_UPLOAD',
    points: 0.6,
    sectionName: 'Sector 8: Neptune Frontier • Problem 5: Dual Synthesis Pathways, Biofuel Logistics & Health Code',
    content_markdown: `### Orbital Problem 5: Dual Synthesis Pathways, Biofuel Logistics & Space Cadet Health Code (0.6 Points)

**Part a):**
* Write balanced chemical equations for the two major preparation methods of ethylic alcohol:
  1. Biochemical fermentation from glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) using yeast enzyme.
  2. Industrial petrochemical hydration from ethylene gas ($\\text{CH}_2=\\text{CH}_2$) with acid catalyst and heat.

**Part b):**
* State two environmental and logistical advantages of using **E5 Biofuel** over $100\\%$ mineral gasoline.
* Explain two severe medical hazards of alcohol abuse on human physiological organs, and state the safety law regarding alcohol consumption for students under 18 years old.`,
    rubric: `* Part a (0.3 pts): 1) C6H12O6 -enzyme-> 2C2H5OH + 2CO2 (up). 2) CH2=CH2 + H2O -t°, H+-> C2H5OH.
* Part b (0.3 pts): Two E5 benefits: saves non-renewable petroleum, reduces carbon emissions; Medical hazards: cirrhosis/liver failure, stomach ulcers, neurological impairment; Law: strictly prohibited for persons under 18.`,
    explanation: `Model Answer:
a) 1. Biochemical fermentation:
      C6H12O6 -enzyme-> 2C2H5OH + 2CO2 (up)
   2. Industrial hydration:
      CH2=CH2 + H2O -t°, H+-> C2H5OH
b) E5 Biofuel benefits:
   1. Reduces dependence on finite fossil crude oil reserves.
   2. Decreases tailpipe carbon emissions and atmospheric pollutants.
   Health hazards & Cadet Code:
   1. Chronic abuse leads to cirrhosis, liver failure, and gastric ulcers.
   2. Neurotoxicity impairs cognition and synaptic development.
   Law: Individuals under 18 years of age are strictly prohibited by law from purchasing or consuming alcoholic drinks.`
  }
];

async function seed() {
  const LEARNING_UNIT_ID = 'ebf29600-f31a-47ae-a406-a700159d155f';
  const ASSIGNMENT_ID = '70542066-5405-4299-9475-fb91a4584b0b';
  const STUDENT_ID = '4745136c-bd25-4f45-a488-9f00f2121b70';

  console.log('🚀 Seeding 40 In-Session Chemistry Exercises for Keithley Lake...');

  // 1. Check existing assessments under learning unit
  const existingAssessments = await prisma.assessments.findMany({
    where: { learning_unit_id: LEARNING_UNIT_ID }
  });

  for (const asmt of existingAssessments) {
    console.log(`Cleaning old assessment ${asmt.id}...`);
    const attempts = await prisma.assessment_attempts.findMany({ where: { assessment_id: asmt.id } });
    for (const att of attempts) {
      await prisma.student_answers.deleteMany({ where: { attempt_id: att.id } });
      await prisma.assessment_attempts.delete({ where: { id: att.id } });
    }
    await prisma.questions.deleteMany({ where: { assessment_id: asmt.id } });
    await prisma.assessments.delete({ where: { id: asmt.id } });
  }

  // 2. Create the Assessment
  const assessment = await prisma.assessments.create({
    data: {
      learning_unit_id: LEARNING_UNIT_ID,
      type: 'IN_SESSION_90M',
      title: 'Orbital Practice Flight: Ethylic Alcohol & Biofuel Stoichiometry (40 Celestial Problems • 90 mins)',
      instructions: 'Timed orbital chemistry flight session with per-question chronometer controls. Complete 35 Multiple-Choice problems (7.0 pts) and 5 Constructed-Response problems (3.0 pts). 100% English telemetry.',
      time_limit_minutes: 90,
      max_score: 10.0
    }
  });
  console.log(`✅ Created Assessment: ${assessment.id}`);

  // 3. Create Questions
  for (const q of QUESTIONS_DATA) {
    const questionPayload = {
      content_markdown: q.content_markdown,
      sectionName: q.sectionName
    };

    if (q.type === 'MULTIPLE_CHOICE') {
      questionPayload.options = q.options;
      // CRITICAL FOR INSTANT SOUND FX & SHAKE ANIMATION ON MISTAKES:
      questionPayload.correct_option_id = q.correct_option_id;
    }

    let gradingPayload = {};
    if (q.type === 'MULTIPLE_CHOICE') {
      gradingPayload = {
        correct_option_id: q.correct_option_id,
        explanation: q.explanation
      };
    } else if (q.type === 'ESSAY_UPLOAD') {
      gradingPayload = {
        rubric_markdown: q.rubric,
        explanation: q.explanation
      };
    }

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
  console.log(`✅ Created ${QUESTIONS_DATA.length} questions (35 MCQs + 5 ESSAY_UPLOAD).`);

  // 4. Create Assessment Attempt
  const attempt = await prisma.assessment_attempts.create({
    data: {
      daily_assignment_id: ASSIGNMENT_ID,
      assessment_id: assessment.id,
      student_id: STUDENT_ID,
      status: 'NOT_STARTED'
    }
  });
  console.log(`✅ Created Assessment Attempt: ${attempt.id} (Status: NOT_STARTED)`);

  // 5. Update Assignment Note
  await prisma.daily_student_assignments.update({
    where: { id: ASSIGNMENT_ID },
    data: {
      teacher_daily_note: "Astronaut Keithley, welcome to the Orbital Bio-Propulsion Lab! Study the molecular architecture of ethylic alcohol in the interactive live studio, then engage your 90-minute in-session flight practice mission (40 questions across all 8 Planetary Sectors)!"
    }
  });
  console.log('✅ Updated Daily Student Assignment note.');

  // Also save the JSON payload to file
  const payloadPath = path.resolve(__dirname, 'content/chemistry_practice_2026_11_04.json');
  fs.mkdirSync(path.dirname(payloadPath), { recursive: true });
  fs.writeFileSync(payloadPath, JSON.stringify(QUESTIONS_DATA, null, 2), 'utf8');
  console.log(`✅ Saved questions backup to ${payloadPath}`);

  console.log('\n🎉 ALL DONE! 40 Mission exercises deployed successfully.');
}

seed()
  .catch((err) => {
    console.error('❌ Error seeding exercises:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
