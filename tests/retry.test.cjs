const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={requestAnimationFrame:()=>1,clearTimeout:()=>{}};
vm.createContext(context);
vm.runInContext(fs.readFileSync('data.js','utf8')+'\n'+fs.readFileSync('app.js','utf8').replace(/home\(\);\s*$/,''),context);
vm.runInContext(`
active=SCENARIOS[2];renderStep=()=>{};report=()=>{route='report';};
const r=run();
active.steps.forEach(st=>{r.answers[st.id]={attempts:1,errors:0,passed:true};});
r.done=true;r.finished='original';
flowHistory[active.id]={[active.steps[0].id]:'old snapshot'};
retryStep(0);
this.reopened={passed:r.answers[active.steps[0].id].passed,otherPassed:r.answers[active.steps[1].id].passed,done:r.done,index,cached:flowHistory[active.id][active.steps[0].id]};
record(false);record(true);
this.scoring={...r.answers[active.steps[0].id]};
next();this.finished=route;
retryStep(active.steps.length-1);this.checklistReopened=!r.answers[active.steps.at(-1).id].passed;
record(true);next();this.checklistFinished=route;
// Resume at a pending stage after skipping completed stages.
r.answers[active.steps[3].id].passed=false;
retryStep(0);record(true);next();this.resume={index,rebuild:flowRebuild};
`,context);
assert.deepEqual(JSON.parse(JSON.stringify(context.reopened)),{passed:false,otherPassed:true,done:false,index:0});
assert.deepEqual(JSON.parse(JSON.stringify(context.scoring)),{attempts:1,errors:0,passed:true});
assert.equal(context.finished,'report');assert(context.checklistReopened);assert.equal(context.checklistFinished,'report');
assert.equal(context.resume.index,3);assert(context.resume.rebuild);
console.log('Replay reopens the selected stage, preserves later answers and original score, resumes pending work and reopens final checks.');
