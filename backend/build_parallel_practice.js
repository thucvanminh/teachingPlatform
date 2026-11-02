// Rebuild the reviewed English workbook payload and schematic SVG assets.
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(process.argv[2] || '/home/dantey/Dantey/teaching/lop6/Math/90_minute_practice_by_problem_types_parallel_lines_for_keithley.md', 'utf8');
const vietnamese = /[À-ỹĐđ]/;
function english(text) {
  return text.replace(/\([^()]*\)/g, s => vietnamese.test(s) ? '' : s)
    .replace(/^>\s?/gm, '').replace(/^\s*\*?\s*\*\*(?:Answer|Explanation|Solution|Hint):\*\*\s*/gm, '')
    .replace(/\n---[\s\S]*$/, '').replace(/\n### [\s\S]*$/, '').replace(/\n## [\s\S]*$/, '').trim();
}
const sections = ['Angle Pair Scanner', 'Direct Parallel Proofs', 'Hidden Angle Bridges', 'Unknown Angle Codes', 'Perpendicular Flight Paths'];
const methods = [
  'Check positions first. Same corner: corresponding (F). Both inside, opposite sides: alternate interior (Z). Both inside, same side: consecutive interior (U).',
  'Use one valid test: equal corresponding angles, equal alternate interior angles, or consecutive interior angles with a sum of 180°. Always state the positions and the numerical relationship.',
  'Find the hidden angle using vertical angles (equal) or a linear pair (sum 180°). Then compare angles at the two intersections and name the parallel-line test.',
  'For corresponding or alternate interior angles, equate the measures. For consecutive interior angles, set their sum to 180°. Solve and check your answer.',
  'Two distinct coplanar lines perpendicular to the same line are parallel. For a bisector, halve the full angle first. Always justify the angle positions.'
];
const matches = [...source.matchAll(/^#### (Question|Exercise) (\d)\.(\d)([^\n]*)\n([\s\S]*?)(?=^#### |$(?![\s\S]))/gm)];
const questions = matches.map((m, index) => {
  const [kind, type, number] = [m[1], Number(m[2]), Number(m[3])];
  const body = m[5];
  const options = [...body.matchAll(/^\* \*\*([A-D])\.\*\* (.+)$/gm)].map(o => ({id:o[1], text:english(o[2])}));
  const prompt = english(body.split(/\n\* \*\*A\.\*\*|\n>/)[0]);
  const solutionMarker = kind==='Question' ? '**Explanation:**' : '**Solution:**';
  const explanation = english(body.slice(body.indexOf(solutionMarker)+solutionMarker.length));
  const id = `${kind==='Question'?'Q':'E'}${type}.${number}`;
  let diagram = 'standard';
  if(id==='E1.2')diagram='pairs';
  if(id==='E2.3')diagram='three';
  if(id==='E4.3')diagram='shelves';
  if(id==='Q5.1'||id==='E5.1')diagram='perpendicular';
  if(id==='Q5.2')diagram='quadrilateral';
  if(id==='Q5.3'||id==='E5.3')diagram='triangle';
  if(id==='Q5.4'||id==='E5.2')diagram='rays';
  if(id==='Q5.4')diagram='corresponding_rays';
  if(id==='Q2.3')diagram='renamed';
  const payload = {
    practice_layout: 'parallel-workbook',
    source_ref: id,
    sectionName: `Type ${type}: ${sections[type-1]}`,
    content_markdown: prompt,
    diagram_url: `/images/geometry/parallel_practice_${diagram}.svg`,
    diagram_alt: diagram==='standard'?'Workbook angle map: clockwise from top-left, 1, 2, 3, 4 at A and B. Schematic, not to scale.':`${sections[type-1]}: schematic reference diagram, not to scale. Use the measures stated in the question.`,
    method_markdown: methods[type-1],
    reference_note: 'WORKBOOK LABELS: 1 top-left; 2 top-right; 3 bottom-right; 4 bottom-left. These labels differ from the lecture map. Use this workbook diagram.',
    ...(options.length ? {options} : {}),
  };
  if(id==='E5.2') {
    payload.content_markdown = 'Draw $\\angle xOy=70^\\circ$. Ray $Oz$ bisects this angle. Point $A$ lies on ray $Ox$, with $O,A,x$ in that order. Draw ray $At$ in the same half-plane as $Oz$, inside $\\angle xOy$, so that $\\angle xAt=35^\\circ$.\n\na) Calculate $\\angle xOz$.\nb) Use the corresponding angles $\\angle xAt$ and $\\angle xOz$ to prove $At\\parallel Oz$.';
  }
  return {
    order_index:index+1, type:kind==='Question'?'MULTIPLE_CHOICE':'ESSAY_UPLOAD', points:kind==='Question'?0.2:0.4,
    question_payload:payload,
    grading_key_payload: {
      ...(kind==='Question'?{correct_option_id:body.match(/\*\*Answer:\*\* `([A-D])`/)[1]}:{rubric_markdown:'Award up to 0.4 points: 0.2 for correct values/classification and 0.2 for valid reasoning covering every requested part. Accept equivalent correct methods.'}),
      explanation_markdown:id==='E5.2'?'The bisector gives $\\angle xOz=70^\\circ/2=35^\\circ$. Since $\\angle xAt=\\angle xOz=35^\\circ$ and these are corresponding angles along transversal $Ox$, $At\\parallel Oz$.':explanation,
    },
  };
});
if(questions.length!==35 || questions.filter(q=>q.type==='MULTIPLE_CHOICE').length!==20)throw Error('Expected 20 MCQ + 15 written problems');
for(const q of questions){if(vietnamese.test(JSON.stringify(q)))throw Error('Non-English text: '+q.question_payload.source_ref);if(!q.grading_key_payload.explanation_markdown)throw Error('Missing solution');}
const payload = {title:'Parallel Paths Expedition: 90-Minute Practice',instructions:'35 problems · 20 multiple-choice + 15 written workouts · 90 minutes. Type 1: 15 min; Type 2: 20 min; Type 3: 25 min; Type 4: 15 min; Type 5: 15 min. Use the workbook angle map: labels run clockwise from top-left. Give values, angle positions and reasons in written solutions.',questions};
fs.mkdirSync(path.join(__dirname,'content'),{recursive:true});
fs.writeFileSync(path.join(__dirname,'content/parallel_practice_2026_11_01.json'),JSON.stringify(payload,null,2)+'\n');
const labels = texts => `<g fill="#f1f5f9" font-family="system-ui,sans-serif" font-size="16">${texts.map(([x,y,t])=>`<text x="${x}" y="${y}">${t}</text>`).join('')}</g>`;
const lines = d=>`<path d="${d}" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>`;
const shapes = {
 renamed:lines('M35 95H500 M35 220H500 M195 285L320 30')+labels([[505,100,'x'],[505,225,'y'],[330,30,'c'],[239,66,'M1'],[173,190,'N1'],[60,40,'M1 and N1: corresponding positions']]),
 corresponding_rays:lines('M65 260H500 M65 260L195 35 M265 260L395 35')+labels([[45,283,'O'],[503,280,'x'],[200,28,'y'],[258,283,'A'],[400,28,'t'],[100,238,'60°'],[300,238,'60°']]),
 standard:lines('M35 95H500 M35 220H500 M195 285L320 30')+labels([[505,100,'a'],[505,225,'b'],[330,30,'c'],[239,66,'A1'],[314,76,'A2'],[310,137,'A3'],[230,135,'A4'],[173,190,'B1'],[248,195,'B2'],[246,260,'B3'],[167,258,'B4']]),
 pairs:lines('M50 80H210 M110 200H30 M50 80L110 200 M310 80H490 M370 200H510 M310 80L370 200')+labels([[40,68,'A'],[200,68,'B'],[110,224,'C'],[25,224,'D'],[300,68,'A'],[480,68,'B'],[370,224,'C'],[500,224,'D'],[55,270,'(a) Opposite sides'],[320,270,'(b) Same side']]),
 three:lines('M35 70H495 M35 170L495 130 M35 250H495 M215 285L320 30')+labels([[500,75,'x'],[500,135,'y'],[500,255,'z'],[328,30,'t'],[310,60,'D'],[278,140,'E'],[235,240,'F'],[350,55,'60°'],[330,128,'65°'],[310,240,'60°']]),
 shelves:lines('M100 70H470 M150 225H470 M100 70L150 225')+labels([[80,60,'A'],[473,75,'B'],[130,250,'C'],[475,230,'D'],[175,210,'75°'],[140,105,'?']]),
 perpendicular:lines('M160 25V285 M50 90H485 M50 220H485 M160 70H180V90 M160 200H180V220')+labels([[140,23,'c / d'],[490,95,'a / m'],[490,225,'b / n'],[130,80,'P'],[130,210,'Q'],[190,80,'90°'],[190,210,'90°']]),
 quadrilateral:lines('M130 65H440V235H70Z M420 65V85H440 M420 235V215H440')+labels([[110,55,'A'],[450,65,'B'],[450,250,'C'],[45,250,'D']]),
 triangle:lines('M50 65H500 M265 65L110 250H450Z')+labels([[35,60,'x'],[505,60,'y'],[267,50,'A'],[90,275,'B'],[455,275,'C']]),
 rays:lines('M65 260H500 M65 260L150 35 M65 260L360 55 M265 260L510 90')+labels([[45,283,'O'],[503,280,'x'],[140,28,'y'],[365,50,'z'],[258,283,'A'],[515,90,'t']]),
};
for(const [name,shape] of Object.entries(shapes))fs.writeFileSync(path.join(__dirname,`../frontend/public/images/geometry/parallel_practice_${name}.svg`),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 320" width="100%" height="280" role="img" aria-label="${name} geometry reference"><defs><linearGradient id="bg"><stop stop-color="#080d1a"/><stop offset="1" stop-color="#0b132b"/></linearGradient></defs><rect width="540" height="320" rx="20" fill="url(#bg)"/>${shape}<text x="20" y="310" fill="#94a3b8" font-family="system-ui" font-size="11">SCHEMATIC · NOT TO SCALE · USE THE GIVEN VALUES</text></svg>\n`);
console.log('Built English workbook: 35 problems, 20 MCQ, 15 written; total points:',questions.reduce((n,q)=>n+q.points,0).toFixed(2));
