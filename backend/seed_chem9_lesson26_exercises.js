const fs = require('fs');
const path = require('path');
const { PrismaClient } = require(path.resolve(__dirname, 'node_modules/@prisma/client'));
const prisma = new PrismaClient();

const QUESTIONS_DATA = [
  // Sector 1: Mercury Orbit • Molecular Blueprint (Q1 - Q4, Q20)
  {
    order_index: 1,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 1: Mercury Orbit • Molecular Blueprint',
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
    sectionName: 'Sector 1: Mercury Orbit • Structural Formula',
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

  // Sector 2: Venus Base • Physical Constants & Boiling Point (Q5 - Q7)
  {
    order_index: 5,
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
    order_index: 6,
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
    order_index: 7,
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

  // Sector 3: Earth Mission Control • Alcohol Degree (ABV) & Antiseptics (Q8, Q16 - Q19, Q24)
  {
    order_index: 8,
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

  // Sector 4: Mars Outpost • Combustion & Biofuels (Q9, Q10, Q14, Q21, Q22)
  {
    order_index: 9,
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
    order_index: 10,
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

  // Sector 5: Jupiter Station • Active Metal Displacement (Q11, Q12, Q15, Q23)
  {
    order_index: 11,
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
    order_index: 12,
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

  // Sector 6: Saturn Rings • Industrial & Biochemical Preparation (Q13, Q25)
  {
    order_index: 13,
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

  // Sector 4 (Continued): Mars Outpost • Biofuel
  {
    order_index: 14,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 4: Mars Outpost • E5 Biofuel Blend Specifications',
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

  // Sector 5 (Continued): Jupiter Station
  {
    order_index: 15,
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

  // Sector 3 (Continued): Earth Mission Control
  {
    order_index: 16,
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
    order_index: 17,
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
    order_index: 18,
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
    order_index: 19,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 3: Earth Mission Control • Mass of Ethanol in ABV Solution',
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

  // Sector 1 (Continued): Mercury Orbit
  {
    order_index: 20,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 1: Mercury Orbit • Molar Quantity Calculation',
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

  // Sector 4 (Continued): Mars Outpost
  {
    order_index: 21,
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
    order_index: 22,
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

  // Sector 5 (Continued): Jupiter Station
  {
    order_index: 23,
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

  // Sector 3 (Continued): Earth Mission Control
  {
    order_index: 24,
    type: 'MULTIPLE_CHOICE',
    points: 0.2,
    sectionName: 'Sector 3: Earth Mission Control • Antiseptic Concentration Efficacy (70° vs 90°)',
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

  // Sector 6 (Continued): Saturn Rings
  {
    order_index: 25,
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

  // Sector 7: Uranus Deep Space • Constructed-Response Section (Q26 - Q28 / Essay 1 - 3)
  {
    order_index: 26,
    type: 'ESSAY_UPLOAD',
    points: 1.0,
    sectionName: 'Sector 7: Uranus Deep Space • Structure, Sodium Mechanism & Chemical Identification',
    content_markdown: `### Orbital Problem 1: Structure, Mechanism & Chemical Identification (1.0 Point)

**Part a) (0.5 pts):**
* Write the condensed structural formula of ethylic alcohol and circle or clearly state its characteristic functional group.
* Explain briefly why ethylic alcohol readily reacts with metallic sodium ($\\text{Na}$) while ethane ($\\text{CH}_3-\\text{CH}_3$) does not react.

**Part b) (0.5 pts):**
* You are given two unlabeled test tubes containing two colorless liquids: **pure ethylic alcohol** ($\\text{C}_2\\text{H}_5\\text{OH}$) and **liquid hexane** ($\\text{C}_6\\text{H}_{14}$).
* Describe a simple chemical experiment to distinguish between them, stating the expected observations and writing the balanced chemical equation.`,
    rubric: `* Part a (0.5 pts):
  - Condensed structural formula: CH3-CH2-OH (or C2H5OH), functional group: hydroxyl group (-OH). (0.25 pts)
  - Mechanism explanation: In ethanol, the hydrogen atom bonded to oxygen in the -OH group is polarized and reactive, allowing displacement by active alkali metals like Na. Ethane contains only non-polar C-H and C-C bonds, which cannot undergo displacement by Na. (0.25 pts)
* Part b (0.5 pts):
  - Chemical test: Take a small sample of each liquid into separate labeled test tubes and drop a small piece of metallic sodium (Na) into each. (0.25 pts)
  - Observations & Equation: The tube releasing effervescent colorless gas bubbles (H2) contains ethylic alcohol: 2C2H5OH + 2Na -> 2C2H5ONa + H2 (up). The tube with no reaction is hexane. (0.25 pts)`,
    explanation: `Model Answer:
a) Condensed formula: CH3-CH2-OH. The functional group is -OH (hydroxyl). Ethylic alcohol reacts with Na because the hydrogen atom in the -OH group is active, whereas ethane has only C-H bonds that cannot be displaced by Na.
b) Chemical test: Add a pellet of metallic sodium (Na) to samples of both liquids.
- The sample that reacts, dissolves Na, and releases colorless gas bubbles (H2) is ethylic alcohol:
  2C2H5OH + 2Na -> 2C2H5ONa + H2 (up)
- The sample with no reaction is liquid hexane.`
  },
  {
    order_index: 27,
    type: 'ESSAY_UPLOAD',
    points: 1.0,
    sectionName: 'Sector 7: Uranus Deep Space • ABV, Density & Precision Dilution Workout',
    content_markdown: `### Orbital Problem 2: Alcohol Degree (ABV) & Precision Dilution Workout (1.0 Point)

An orbital medical dispensary carries a $500\\text{ mL}$ bottle of concentrated $90^\\circ$ ethylic alcohol.
Given: Density of pure ethylic alcohol $D = 0.8\\text{ g/mL}$.

**Part a) (0.5 pts):**
* Calculate the volume (in $\\text{mL}$) of pure ethylic alcohol inside this $500\\text{ mL}$ bottle.
* Calculate the mass (in $\\text{grams}$) of pure ethylic alcohol contained in the bottle.

**Part b) (0.5 pts):**
* A flight surgeon takes $140\\text{ mL}$ of this $90^\\circ$ alcohol stock and needs to prepare standard $70^\\circ$ antiseptic solution for spacecraft decontamination.
* Calculate the volume of distilled water (in $\\text{mL}$) that must be added to dilute the $140\\text{ mL}$ of $90^\\circ$ stock into a $70^\\circ$ solution. *(Assume volumes are additive).*`,
    rubric: `* Part a (0.5 pts):
  - Volume of pure ethanol: V_alc = (500 * 90) / 100 = 450 mL. (0.25 pts)
  - Mass of pure ethanol: m = V * D = 450 mL * 0.8 g/mL = 360 g. (0.25 pts)
* Part b (0.5 pts):
  - Pure alcohol volume in 140 mL of 90 deg stock: V_pure = (140 * 90) / 100 = 126 mL. (0.25 pts)
  - Total volume of 70 deg solution: V_new = (126 * 100) / 70 = 180 mL.
  - Distilled water required: V_water = 180 - 140 = 40 mL. (0.25 pts)`,
    explanation: `Model Answer:
a) Volume of pure ethanol: V = (500 * 90) / 100 = 450 mL.
   Mass of pure ethanol: m = V * D = 450 * 0.8 = 360 g.
b) Volume of pure ethanol in 140 mL of 90 deg stock: V_pure = (140 * 90) / 100 = 126 mL.
   Target 70 deg total solution volume: V_new = (126 * 100) / 70 = 180 mL.
   Volume of distilled water to add: V_water = V_new - V_stock = 180 - 140 = 40 mL.`
  },
  {
    order_index: 28,
    type: 'ESSAY_UPLOAD',
    points: 1.0,
    sectionName: 'Sector 7: Uranus Deep Space • Stoichiometry of Sodium Displacement Reaction',
    content_markdown: `### Orbital Problem 3: Stoichiometry of Active Metal Displacement (1.0 Point)

In an orbital laboratory, a space chemist introduces excess metallic sodium ($\\text{Na}$) into a reaction vessel containing $9.2\\text{ g}$ of pure ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$).
Given atomic masses: $H = 1$, $C = 12$, $O = 16$, $Na = 23$. Standard gas molar volume: $24.79\\text{ L/mol}$.

**Part a) (0.25 pts):**
* Write the balanced chemical equation for the displacement reaction.

**Part b) (0.5 pts):**
* Calculate the number of moles of ethylic alcohol consumed.
* Calculate the volume of hydrogen gas ($\\text{H}_2$) released at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$).

**Part c) (0.25 pts):**
* Calculate the mass (in $\\text{grams}$) of sodium ethoxide ($\\text{C}_2\\text{H}_5\\text{ONa}$) produced after the reaction reaches completion.`,
    rubric: `* Part a (0.25 pts): Balanced equation: 2C2H5OH + 2Na -> 2C2H5ONa + H2 (up).
* Part b (0.5 pts):
  - Moles of ethanol: n_alc = 9.2 / 46 = 0.2 mol. (0.25 pts)
  - Moles of H2: n_H2 = 0.2 / 2 = 0.1 mol => V_H2 = 0.1 * 24.79 = 2.479 L. (0.25 pts)
* Part c (0.25 pts):
  - Moles of C2H5ONa = 0.2 mol. Molar mass M = 68 g/mol => m = 0.2 * 68 = 13.6 g.`,
    explanation: `Model Answer:
a) Balanced equation: 2C2H5OH + 2Na -> 2C2H5ONa + H2 (up).
b) Moles of ethanol: n_alc = 9.2 / 46 = 0.2 mol.
   From stoichiometry: n_H2 = (1/2) * n_alc = 0.1 mol.
   Volume of H2 at standard conditions: V_H2 = 0.1 * 24.79 = 2.479 L.
c) Moles of C2H5ONa = n_alc = 0.2 mol.
   Molar mass M(C2H5ONa) = (12 * 2) + 5 + 16 + 23 = 68 g/mol.
   Mass: m = 0.2 * 68 = 13.6 g.`
  },

  // Sector 8: Neptune Frontier • Advanced Stoichiometry & Applications (Q29 - Q30 / Essay 4 - 5)
  {
    order_index: 29,
    type: 'ESSAY_UPLOAD',
    points: 1.0,
    sectionName: 'Sector 8: Neptune Frontier • Clean Combustion Stoichiometry & Air Volume Demand',
    content_markdown: `### Orbital Problem 4: Bio-Propellant Combustion Stoichiometry (1.0 Point)

A bio-propellant thruster test cleanly burns $13.8\\text{ g}$ of pure ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$) in a high-pressure combustion chamber.
Given atomic masses: $H = 1$, $C = 12$, $O = 16$. Standard gas molar volume: $24.79\\text{ L/mol}$.

**Part a) (0.25 pts):**
* Write the balanced chemical equation for the complete combustion of ethylic alcohol.

**Part b) (0.5 pts):**
* Calculate the volume of oxygen gas ($\\text{O}_2$) required at standard conditions ($25^\\circ\\text{C}, 1\\text{ bar}$).
* Calculate the total volume of air required for combustion, assuming oxygen makes up $20\\%$ of atmospheric air by volume.

**Part c) (0.25 pts):**
* Calculate the mass (in $\\text{grams}$) of carbon dioxide ($\\text{CO}_2$) and water vapor ($\\text{H}_2\\text{O}$) formed.`,
    rubric: `* Part a (0.25 pts): Balanced equation: C2H5OH + 3O2 -t°-> 2CO2 + 3H2O.
* Part b (0.5 pts):
  - Moles of ethanol: n_alc = 13.8 / 46 = 0.3 mol.
  - Moles of O2: n_O2 = 3 * 0.3 = 0.9 mol => V_O2 = 0.9 * 24.79 = 22.311 L. (0.25 pts)
  - Air volume: V_air = 22.311 * (100 / 20) = 22.311 * 5 = 111.555 L. (0.25 pts)
* Part c (0.25 pts):
  - Carbon dioxide: n_CO2 = 2 * 0.3 = 0.6 mol => m_CO2 = 0.6 * 44 = 26.4 g.
  - Water vapor: n_H2O = 3 * 0.3 = 0.9 mol => m_H2O = 0.9 * 18 = 16.2 g.`,
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
    order_index: 30,
    type: 'ESSAY_UPLOAD',
    points: 1.0,
    sectionName: 'Sector 8: Neptune Frontier • Synthesis Pathways, Biofuel Logistics & Health Imperatives',
    content_markdown: `### Orbital Problem 5: Dual Synthesis Pathways, Biofuel Logistics & Space Cadet Health Code (1.0 Point)

**Part a) (0.5 pts):**
* Write balanced chemical equations for the two major preparation methods of ethylic alcohol:
  1. Biochemical fermentation from glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) using yeast enzyme.
  2. Industrial petrochemical hydration from ethylene gas ($\\text{CH}_2=\\text{CH}_2$) with acid catalyst and heat.

**Part b) (0.5 pts):**
* State two environmental and logistical advantages of using **E5 Biofuel** over $100\\%$ mineral gasoline.
* Explain two severe medical hazards of alcohol abuse on human physiological organs, and state the safety law regarding alcohol consumption for students under 18 years old.`,
    rubric: `* Part a (0.5 pts):
  - Biochemical fermentation equation: C6H12O6 -enzyme-> 2C2H5OH + 2CO2 (up). (0.25 pts)
  - Industrial hydration equation: CH2=CH2 + H2O -t°, H+-> C2H5OH. (0.25 pts)
* Part b (0.5 pts):
  - Two E5 biofuel benefits: Conserves non-renewable fossil fuel reserves; burns cleaner with lower toxic exhaust emissions. (0.25 pts)
  - Health hazards & Under-18 law: Alcohol causes liver damage (cirrhosis, hepatitis), stomach ulcers, and impairs the nervous system. By law and safety standards, all students under 18 are strictly prohibited from consuming alcoholic beverages. (0.25 pts)`,
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

  console.log('🚀 Seeding 30 In-Session Chemistry Exercises for Keithley Lake...');

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
      title: 'Orbital Practice Flight: Ethylic Alcohol & Biofuel Stoichiometry (90 mins)',
      instructions: 'Timed orbital chemistry flight session with per-question chronometer controls. Complete 25 Multiple-Choice problems (5.0 pts) and 5 Constructed-Response problems (5.0 pts). 100% English telemetry.',
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
  console.log(`✅ Created ${QUESTIONS_DATA.length} questions (25 MCQs + 5 ESSAY_UPLOAD).`);

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
      teacher_daily_note: "Astronaut Keithley, welcome to the Orbital Bio-Propulsion Lab! Study the molecular architecture of ethylic alcohol in the interactive live studio, then engage your 90-minute in-session flight practice mission (30 questions) across all 8 Planetary Sectors!"
    }
  });
  console.log('✅ Updated Daily Student Assignment note.');

  // Also save the JSON payload to file
  const payloadPath = path.resolve(__dirname, 'content/chemistry_practice_2026_11_04.json');
  fs.mkdirSync(path.dirname(payloadPath), { recursive: true });
  fs.writeFileSync(payloadPath, JSON.stringify(QUESTIONS_DATA, null, 2), 'utf8');
  console.log(`✅ Saved questions backup to ${payloadPath}`);

  console.log('\n🎉 ALL DONE! Mission exercises deployed successfully.');
}

seed()
  .catch((err) => {
    console.error('❌ Error seeding exercises:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
