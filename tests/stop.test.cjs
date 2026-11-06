const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('data.js','utf8')+fs.readFileSync('model.js','utf8')+';this.s=SCENARIOS[0];',c);
const off=c.simulateStop(c.s,{decel:0}),short=c.simulateStop(c.s,{decel:1}),medium=c.simulateStop(c.s,{decel:5}),long=c.simulateStop(c.s,{decel:20});
assert(off.samples.every(d=>d.u===0&&d.current===0));assert(!off.good);
assert(short.concentrated);assert(!medium.concentrated);assert(long.littleAddedBenefit);
assert(medium.transitionTime>off.transitionTime);assert(medium.maxDeceleration<off.maxDeceleration);
for(const d of [0,1,5,10,20]){const r=c.simulateStop(c.s,{decel:d});assert.equal(r.fault,null);assert.equal(r.samples[0].w,.99);assert(r.samples.every(x=>Number.isFinite(x.w)&&x.w>=0&&x.w<=1));assert.equal(r.samples.find(x=>x.t===d).u,0);assert(r.samples.at(-1).t>=d);assert(r.baseline.samples.every(x=>x.u===0));}
for(const decel of [-1,21,NaN])assert.throws(()=>c.simulateStop(c.s,{decel}));
// Validate educational sequence and command independently of browser rendering.
vm.runInContext(fs.readFileSync('app.js','utf8').replace(/home\(\);\s*$/,'')+`
active=SCENARIOS[0];index=active.steps.findIndex(st=>st.type==='stop');
this.messages=[];feedback=(good,title,msg)=>messages.push({good,title,msg});
this.document={querySelector:()=>({disabled:false}),querySelectorAll:()=>[]};
const r=run();r.params.decel=5;selected=0;lastResult=simulateStop(active,r.params);
legacySubmit();this.beforeOff=messages.at(-1);
r.stopTrials={off:simulateStop(active,{decel:0})};selected=1;legacySubmit();this.wrongCommand=messages.at(-1);
selected=0;lastResult=simulateStop(active,{decel:0});legacySubmit();this.offOnly=messages.at(-1);
lastResult=simulateStop(active,{decel:5});legacySubmit();this.correct=messages.at(-1);
`,c);
assert(!c.beforeOff.good);assert(!c.wrongCommand.good);assert(!c.offOnly.good);assert(c.correct.good);
console.log('Stop: OFF comparison required, command checked, diagnostic warnings nonblocking, no invented Stall trip or zero-speed deadline.');
