const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });
const { PrismaClient } = require('@prisma/client');
const { overheadAngles } = require('./parallel_angle_notation');
const { renderSvg } = require('./generate_parallel_0311_svgs');

const srcPath = '/home/dantey/Dantey/teaching/lop6/Math/Grade7_Math_0311/90_minute_mcq_svg_visual_practice_parallel_lines_for_keithley.md';
const content = fs.readFileSync(srcPath, 'utf8');

const blocks = content.split(/(?=### (?:Question|Challenge) \d+)/).slice(1);
if (blocks.length !== 45) {
  throw new Error(`Expected 45 question blocks, got ${blocks.length}`);
}

const vietnamese = /[À-ỹĐđ]/;
function cleanEnglish(str) {
  if (!str) return '';
  return str
    .replace(/\([^()]*[À-ỹĐđ][^()]*\)/g, '')
    .replace(/\*([^*]*[À-ỹĐđ][^*]*)\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const sectors = [
  { name: 'Sector 1: Mercury Orbit • Angle Pair Scanner', method: 'Check positions first: F-shape for corresponding, Z-shape for alternate interior, U-shape for consecutive interior.' },
  { name: 'Sector 2: Venus Base • Linear Pairs & Opposite Angles', method: 'Adjacent angles on a straight line form a linear pair (sum = 180°). Vertically opposite angles across an X-intersection are always equal.' },
  { name: 'Sector 3: Earth Mission Control • Parallel Recognition Direct Tests', method: 'Apply direct parallel tests: equal alternate interior angles or equal corresponding angles prove that the two lines are parallel.' },
  { name: 'Sector 4: Mars Outpost • Transversals & Non-Parallel Detection', method: 'For parallel lines, consecutive interior angles must sum to 180°. If alternate interior or corresponding angles are unequal, the lines are not parallel.' },
  { name: 'Sector 5: Jupiter Station • Two-Step Angle Detective & Hidden Bridges', method: 'Find the bridge angle first using linear pairs (180° - known) or vertical angles, then compare across the transversal to test for parallelism.' },
  { name: 'Sector 6: Saturn Rings • Multi-Line Transits & Three-Line Theorems', method: 'When three lines are intersected by one transversal, compare pairs of lines individually. If a ∥ b and b ∥ c, then a ∥ c.' },
  { name: 'Sector 7: Uranus Deep Space • Algebraic Equations & Parallel Solvers', method: 'Set up the algebraic equation: equate expressions for equal angle pairs (alternate interior / corresponding), or set sum to 180° for linear pairs / consecutive interior.' },
  { name: 'Sector 8: Neptune Frontier • Perpendicular Paths & Proof Challenges', method: 'Lines perpendicular to the same transversal are parallel. For triangle extensions, alternate interior angles along transversal sides establish parallelism.' }
];

function getSector(qNum) {
  if (qNum <= 5) return sectors[0];
  if (qNum <= 10) return sectors[1];
  if (qNum <= 15) return sectors[2];
  if (qNum <= 20) return sectors[3];
  if (qNum <= 26) return sectors[4];
  if (qNum <= 30) return sectors[5];
  if (qNum <= 36) return sectors[6];
  return sectors[7];
}

const svgDir = path.join(__dirname, '../frontend/public/images/geometry');
fs.mkdirSync(svgDir, { recursive: true });

const rawQuestions = [];

for (let i = 0; i < blocks.length; i++) {
  const block = blocks[i];
  const qNum = i + 1;
  const isMcq = qNum <= 40;

  const svgMatch = block.match(/\[SVG_CONFIG\]`\**:\**\s*`(\{.*?\})`/);
  if (!svgMatch) throw new Error(`Missing SVG_CONFIG in Q${qNum}`);
  const svgConfig = JSON.parse(svgMatch[1]);

  // Generate SVG diagram
  const svgFilename = `parallel_0311_q${qNum}.svg`;
  const svgFilePath = path.join(svgDir, svgFilename);
  const svgContent = renderSvg(svgConfig);
  fs.writeFileSync(svgFilePath, svgContent);

  const sector = getSector(qNum);
  const diagramUrl = `/images/geometry/${svgFilename}`;
  const diagramAlt = `Visual geometry schematic for ${isMcq ? 'Question' : 'Challenge'} ${qNum}: ${sector.name}`;

  if (isMcq) {
    const optMatches = [...block.matchAll(/^\* \*\*([A-D])\.\*\* (.+)$/gm)];
    if (optMatches.length !== 4) throw new Error(`Q${qNum} does not have 4 options`);
    const options = optMatches.map(m => ({
      id: m[1],
      text: cleanEnglish(m[2])
    }));

    const promptRaw = block.split(/\n\* \*\*A\.\*\*|\n>/)[0]
      .replace(/### Question \d+[^\n]*/, '')
      .replace(/\* \*\*`\[SVG_CONFIG\]`\**:\**[^\n]*/, '')
      .trim();
    const prompt = cleanEnglish(promptRaw);

    const ansMatch = block.match(/\*\*Answer:\*\*\s*`([A-D])`/);
    if (!ansMatch) throw new Error(`Q${qNum} missing answer`);
    const answer = ansMatch[1];

    const expMatch = block.match(/\*\*Explanation:\*\*\s*([\s\S]*?)(?=\n\n### |$)/);
    const expRaw = expMatch ? expMatch[1].trim() : '';
    const explanation = cleanEnglish(expRaw);

    rawQuestions.push({
      order_index: qNum,
      type: 'MULTIPLE_CHOICE',
      points: 0.2,
      question_payload: {
        practice_layout: 'parallel-workbook',
        source_ref: `Q${qNum}`,
        sectionName: sector.name,
        content_markdown: prompt,
        diagram_url: diagramUrl,
        diagram_alt: diagramAlt,
        method_markdown: sector.method,
        reference_note: 'WORKBOOK LABELS: Clockwise from top-left: 1, 2, 3, 4 at each intersection. Schematic diagram; rely on stated values.',
        options,
        correct_option_id: answer
      },
      grading_key_payload: {
        correct_option_id: answer,
        explanation_markdown: explanation
      }
    });
  } else {
    const promptRaw = block.split(/\n>\s*\*\s*\*\*Answers?:\*\*/)[0]
      .replace(/### Challenge \d+[^\n]*/, '')
      .replace(/\* \*\*`\[SVG_CONFIG\]`\**:\**[^\n]*/, '')
      .trim();
    const prompt = cleanEnglish(promptRaw);

    const ansMatch = block.match(/>\s*\*\s*\*\*Answers?:\*\*\s*([\s\S]*?)(?=\n### |$)/);
    const expRaw = ansMatch ? ansMatch[1].replace(/^>\s?/gm, '').trim() : '';
    const explanation = cleanEnglish(expRaw);

    rawQuestions.push({
      order_index: qNum,
      type: 'ESSAY_UPLOAD',
      points: 0.4,
      question_payload: {
        practice_layout: 'parallel-workbook',
        source_ref: `Challenge${qNum}`,
        sectionName: sector.name,
        content_markdown: prompt,
        diagram_url: diagramUrl,
        diagram_alt: diagramAlt,
        method_markdown: sector.method,
        reference_note: 'WORKBOOK LABELS: Clockwise from top-left: 1, 2, 3, 4 at each intersection. Enter answers clearly or upload diagram work.'
      },
      grading_key_payload: {
        rubric_markdown: 'Award up to 0.4 points: 0.2 for correct values and 0.2 for valid reasoning. Accept equivalent correct methods.',
        explanation_markdown: explanation
      }
    });
  }
}

// Check for any remaining Vietnamese text in the entire dataset
for (const q of rawQuestions) {
  const str = JSON.stringify(q);
  if (vietnamese.test(str)) {
    throw new Error(`Vietnamese text found in Q${q.order_index}: ` + str.match(/[À-ỹĐđ]+/g));
  }
}

// Convert all angle notations to overhead hat KaTeX (\widehat{...})
const processedQuestions = overheadAngles(rawQuestions);

const missionPayload = {
  title: 'Parallel Lines Visual Navigation: 90-Minute Practice Mission',
  instructions: '45 visual problems · 40 multiple-choice + 5 workout challenges · 90 minutes. 8 Planetary Sectors: Mercury Orbit (Q1-5) -> Neptune Frontier (Q37-45). High contrast SVG diagrams. Use standard clockwise numbering: 1 top-left, 2 top-right, 3 bottom-right, 4 bottom-left.',
  questions: processedQuestions
};

const contentDir = path.join(__dirname, 'content');
fs.mkdirSync(contentDir, { recursive: true });
const payloadPath = path.join(contentDir, 'parallel_practice_2026_11_03.json');
fs.writeFileSync(payloadPath, JSON.stringify(missionPayload, null, 2) + '\n');
console.log(`Saved payload with ${missionPayload.questions.length} questions to ${payloadPath}`);

module.exports = { missionPayload };
