const path = require('node:path');
require('dotenv').config({path:path.join(__dirname,'.env'),quiet:true});
const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();
const payload=require('./content/parallel_practice_2026_11_01.json');
async function main(){
  const cards=await prisma.daily_student_assignments.findMany({where:{users_daily_student_assignments_student_idTousers:{username:'keithley'},assigned_date:new Date('2026-11-01T00:00:00Z'),learning_units:{title:'Lesson 9: Parallel Lines & Recognition Tests'}},include:{assessment_attempts:true}});
  if(cards.length!==1)throw Error('Expected exactly one Lesson 9 card on 2026-11-01');
  const card=cards[0];
  console.log(JSON.stringify({card:card.id,existingAttempts:cards[0].assessment_attempts.map(a=>({id:a.id,status:a.status})),questions:payload.questions.length,minutes:90}));
  if(!process.argv.includes('--apply'))return;
  const result=await prisma.$transaction(async tx=>{
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(7112027)`;
    const prior=await tx.assessments.findFirst({where:{learning_unit_id:card.learning_unit_id,type:'IN_SESSION_90M'},include:{questions:true}});
    if(prior){
      if(prior.title!==payload.title||prior.questions.length!==35)throw Error('Existing assessment differs; refusing to overwrite learner work');
      const attempt=await tx.assessment_attempts.findUnique({where:{daily_assignment_id_assessment_id:{daily_assignment_id:card.id,assessment_id:prior.id}}});
      if(!attempt)throw Error('Existing assessment has no linked attempt; inspect manually');
      return {assessmentId:prior.id,attemptId:attempt.id,status:attempt.status,action:'unchanged'};
    }
    const assessment=await tx.assessments.create({data:{learning_unit_id:card.learning_unit_id,title:payload.title,type:'IN_SESSION_90M',instructions:payload.instructions,time_limit_minutes:90,max_score:10,questions:{create:payload.questions}}});
    const attempt=await tx.assessment_attempts.create({data:{daily_assignment_id:card.id,assessment_id:assessment.id,student_id:card.student_id,status:'NOT_STARTED'}});
    return {assessmentId:assessment.id,attemptId:attempt.id,status:attempt.status,action:'created'};
  });
  console.log(JSON.stringify(result));
}
main().catch(e=>{console.error(e.message);process.exitCode=1}).finally(()=>prisma.$disconnect());
