const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('data.js','utf8')+fs.readFileSync('app.js','utf8').replace(/home\(\);\s*$/,''),c);
// Deterministic shuffles retain the original answer identity and explanation.
for(const rng of [()=>0,()=>.5,()=>.999999]){
 const options=[0,1,2,3].map(id=>({dataset:{option:String(id)},letter:{textContent:''},querySelector(){return this.letter;}}));
 const original=[...options];const group={querySelectorAll:()=>options,append(node){options.splice(options.indexOf(node),1);options.push(node);}};
 const panel={querySelectorAll:()=>[group]};const oldRandom=c.Math;
 c.panel=panel;c.random=rng;
 vm.runInContext('this.originalShuffled=shuffledOptions;shuffledOptions=items=>originalShuffled(items,random);shuffleQuestionOptions(panel);shuffledOptions=originalShuffled;',c);
 assert.deepEqual(options.map(x=>x.dataset.option).sort(),['0','1','2','3']);
 options.forEach((x,i)=>{assert.equal(x.letter.textContent,String.fromCharCode(65+i));assert.equal(x,original[Number(x.dataset.option)]);});
}
assert.deepEqual(Array.from(c.shuffledOptions([0,1,2,3],()=>0)),[1,2,3,0]);
console.log('Shuffled positions keep answer IDs, sequential letters and original option identity.');
