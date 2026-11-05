/* Modelo adimensional de ensino; não reproduz firmware ou curva térmica WEG. */
function simulateMotor(s,p){
 if(!Number.isFinite(p.initial)||p.initial<30||p.initial>80||!Number.isFinite(p.ramp)||p.ramp<1||p.ramp>20)throw new RangeError('Ajustes fora da faixa permitida');
 if(p.current!==undefined&&(!Number.isFinite(p.current)||p.current<30||p.current>100))throw new RangeError('Corrente fora da faixa permitida');
 const referenceCurrent=p.current===undefined?s.amps:s.ssw*p.current/100;
 const dt=.05,samples=[];let w=0,firstMove=null,atRamp=null,energy=0,fault=null,overTime=0,bypassOverTime=0,highCurrentDuration=0,maxAcceleration=0,dutyDuration=0,maxDutyDuration=0;
 const loadAt=w=>s.kind==='conveyor'?(w<.015?s.staticFriction:s.friction+(.8-s.friction)*w):s.friction+(.8-s.friction)*w*w;
 const duration=p.ramp+4;
 for(let tick=0;tick<=Math.round(duration/dt);tick++){
  const t=tick*dt,u=p.initial/100+(1-p.initial/100)*Math.min(t/p.ramp,1);
  const acceleration=(u*u*(2.1-1.3*w)-loadAt(w))/s.inertia;
  maxAcceleration=Math.max(maxAcceleration,acceleration);
  w=Math.min(1,Math.max(0,w+acceleration*dt));
  if(w>.015&&firstMove===null)firstMove=t;
  const current=u*(1+(s.currentRise??5)*(1-w)**2)*s.amps;
  energy+=(current/s.ssw)**2*dt;
  if(current>2*s.amps)highCurrentDuration+=dt;
  samples.push({t,u,current,w,energy});
  // Limite de capacidade adotado no exercício de correntes nominais iguais.
  // Alerta de ensino; não é a curva nem o instante de disparo do firmware WEG.
  if(s.startingDutyLesson&&Math.abs(s.amps-s.ssw)<1e-9&&t<=p.ramp){
   dutyDuration=current>=3*s.ssw?dutyDuration+(tick===0?0:dt):0;
   maxDutyDuration=Math.max(maxDutyDuration,dutyDuration);
   if(dutyDuration>10+1e-9){fault='startingDuty';break;}
  }
  if(t>=p.ramp&&atRamp===null){
   atRamp={t,u,current,w,energy};
   if(current>=(s.ssw<=30?37.5:200))fault='beforeBypass';
   else if(current>=2*referenceCurrent)fault='stall';
  }else if(t>p.ramp){
   overTime=current>3*referenceCurrent?overTime+dt:0;
   bypassOverTime=current>(s.ssw<=30?60:200)?bypassOverTime+dt:0;
   if(overTime>1)fault='overcurrent';
   else if(bypassOverTime>1)fault='bypassOvercurrent';
  }
  if(fault)break;
 }
 const moved=(p.initial/100)**2*2.1>loadAt(0);
 const impact=maxAcceleration>.45;
 const thermalCaution=energy>90; // Somente hipótese térmica interna de ensino.
 const peakCurrent=Math.max(...samples.map(d=>d.current));
 const peakRatio=peakCurrent/s.amps;
 const peakBand=peakRatio<=2?'low':peakRatio<=3?'moderate':peakRatio<=4?'elevated':'high';
 // Equilíbrio de torque no fim da rampa; tolerância numérica deste modelo,
 // não uma porcentagem de velocidade ou uma especificação do fabricante.
 const rampReached=atRamp!==null;
 const state=atRamp??samples.at(-1);
 const residualTorque=Math.abs(2.1-1.3*state.w-loadAt(state.w));
 const incomplete=!fault&&residualTorque>.12;
 const endRampSpeed=rampReached?atRamp.w*100:null;
 const good=!incomplete&&!fault&&moved&&!impact&&!thermalCaution;
 return {rampReached,maxDutyDuration,interruptedAt:fault?samples.at(-1).t:null,endRampSpeed,incomplete,residualTorque,peakCurrent,peakRatio,peakBand,highCurrentDuration,samples,firstMove,atRamp,energy,fault,good,moved,impact,thermalCaution,maxAcceleration};
}
function simulateStop(s,p){if(!Number.isFinite(p.decel)||p.decel<0||p.decel>20)throw new RangeError('Desaceleração fora da faixa permitida');let w=.99;const samples=[],dt=.05;
 for(let t=0;t<=p.decel+10;t+=dt){const u=p.decel>0&&t<p.decel?Math.max(0,1-t/p.decel):0;const torque=u*u*(2.1-1.3*w),load=s.kind==='conveyor'?(w<.015?s.staticFriction:s.friction+(.8-s.friction)*w):s.friction+(0.8-s.friction)*w*w;w=Math.max(0,Math.min(1,w+(torque-load)/s.inertia*dt));samples.push({t,u,current:u*(1+5*(1-w)**2)*s.amps,w});if(w===0&&t>p.decel)break;}return {samples};}
if(typeof module!=='undefined')module.exports={simulateMotor,simulateStop};
