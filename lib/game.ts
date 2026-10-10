export type Entry = {id:string; kind:'win'|'loss'|'cash'; amount:number; time:string};
export type Game = {balance:number; pot:number; base:number; streak:number; phase:'ready'|'win'|'loss'|'cash'; history:Entry[]; best:number; name:string};
export const initial:Game={balance:1250,pot:0,base:10,streak:0,phase:'ready',history:[],best:0,name:'Gracz'};
export function resolve(g:Game,stake:number,win:boolean):Game {
 const continuation=g.phase==='win'; const risk=continuation?g.pot:stake;
 if(!Number.isSafeInteger(risk)||risk<1||(!continuation&&risk>g.balance))throw new Error('Nieprawidłowa stawka');
 const streak=win?(continuation?g.streak:0)+1:0;
 return {...g,balance:g.balance-(continuation?0:risk),base:continuation?g.base:stake,pot:win?risk*2:0,phase:win?'win':'loss',streak,best:Math.max(g.best,streak),history:[{id:crypto.randomUUID(),kind:(win?'win':'loss') as Entry['kind'],amount:win?risk*2:risk,time:new Date().toISOString()},...g.history].slice(0,50)};
}
export function cashout(g:Game):Game {if(g.phase!=='win')return g;return {...g,balance:g.balance+g.pot,pot:0,streak:0,phase:'cash',history:[{id:crypto.randomUUID(),kind:'cash' as const,amount:g.pot,time:new Date().toISOString()},...g.history].slice(0,50)};}
export function randomResult(){return (crypto.getRandomValues(new Uint32Array(1))[0]&1)===0;}
