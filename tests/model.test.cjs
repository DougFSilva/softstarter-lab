const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('data.js','utf8')+'\n'+fs.readFileSync('model.js','utf8')+'\nthis.S=SCENARIOS;this.sim=simulateMotor;this.stop=simulateStop;',c);
const [pump,fan,belt]=c.S;
for(const s of c.S){
 assert.equal(s.initial,30);assert.equal(s.ramp,1);
 assert.equal(new Set(s.steps.map(x=>x.id)).size,s.steps.length);
 assert(!s.steps.some(x=>x.id==='protection'));
 for(const st of s.steps.filter(x=>x.type==='choice')){assert(st.correct>=0&&st.correct<st.options.length);assert.equal(st.options.length,4,`${s.id}/${st.id}: four options required`);assert.equal(new Set(st.options).size,4);assert.equal(st.options.length,st.why.length);assert(st.why.every(reason=>typeof reason==='string'&&reason.length>0));}
 let passes=0;
 for(let initial=30;initial<=80;initial+=5)for(let ramp=1;ramp<=20;ramp++){
  const p={initial,ramp,current:s.amps/s.ssw*100},r=c.sim(s,p);
  assert(r.samples.every(d=>Number.isFinite(d.current)&&d.current>=0&&d.w>=0&&d.w<=1));
  if(r.rampReached){assert.equal(r.endRampSpeed,r.atRamp.w*100);assert(Math.abs(r.atRamp.t-ramp)<.001);assert.equal(r.atRamp.u,1);}else{assert.equal(r.atRamp,null);assert.equal(r.endRampSpeed,null);assert.equal(r.fault,"startingDuty");assert(r.interruptedAt<ramp);}
  assert(Math.abs(r.samples.filter(d=>d.current>2*s.amps).length*.05-r.highCurrentDuration)<1e-8);
  if(r.good)passes++;
 }
 assert(passes>0,s.id+' must remain completable');
 assert.equal(c.sim(s,{initial:30,ramp:1}).good,false);
 assert.deepEqual(c.sim(s,{initial:50,ramp:10}),c.sim(s,{initial:50,ramp:10}));
 assert.equal(c.stop(s,{decel:0}).samples[0].u,0);
 console.log(s.id,passes,'valid combinations; exact end-of-ramp sample verified');
}
// A motor may keep accelerating after the ramp: judge the ramp snapshot.
const lagging=c.sim(fan,{initial:50,ramp:12});
assert(lagging.samples.at(-1).w>lagging.atRamp.w);assert(lagging.incomplete);assert(!lagging.good);
// A high peak alone is not a protection trip or an automatic rejection.
const high=c.sim(fan,{initial:70,ramp:20});assert(high.peakRatio>4);assert.equal(high.fault,null);assert(high.good);
assert.equal(c.sim(fan,{initial:40,ramp:4}).fault,'beforeBypass');
assert(!c.sim(belt,{initial:40,ramp:5}).moved);assert(c.sim(belt,{initial:60,ramp:8}).good);
assert(c.sim(pump,{initial:80,ramp:7}).impact);
for(const p of [{initial:29,ramp:1},{initial:81,ramp:1},{initial:30,ramp:0},{initial:30,ramp:21},{initial:30,ramp:NaN},{initial:30,ramp:1,current:101}])assert.throws(()=>c.sim(pump,p));
// UI defaults and displayed metric, without requiring a DOM.
vm.runInContext(fs.readFileSync('dist/app.js','utf8').replace(/home\(\);\s*$/,'')+'\nactive=SCENARIOS[0];this.params=run().params;this.panel=frontPanel(active,false,true);',c);
assert.deepEqual(JSON.parse(JSON.stringify(c.params)),{initial:30,ramp:1,current:30,decel:0});
assert(c.panel.includes('id="current"'));assert(c.panel.includes('id="simulate" hidden'));
const app=fs.readFileSync('dist/app.js','utf8');assert(app.includes('Velocidade ao fim da rampa'));assert(!app.includes('res.speed90'));assert(!app.includes('Índice didático ∫'));
console.log('Bounds, transitions, current interpretation, load response and UI defaults passed.');

assert.equal(belt.amps,belt.ssw);assert.equal(belt.amps,16);
const duty=c.sim(belt,{initial:30,ramp:20,current:100});
assert.equal(duty.fault,'startingDuty');assert(duty.maxDutyDuration>10);assert.equal(duty.rampReached,false);assert(duty.interruptedAt<20);assert(!duty.good);
const brief=c.sim(belt,{initial:60,ramp:8,current:100});assert(brief.peakRatio>3);assert(brief.maxDutyDuration<10);assert.notEqual(brief.fault,'startingDuty');assert(brief.good);
console.log('Equal-current scenario: sustained duty rejected; brief peak accepted; interruption before ramp end safe.');
