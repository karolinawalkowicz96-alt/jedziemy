export type Progress = {version:1;xp:number;spins:number;wins:number;cashouts:number;boosts:number;energy:number;claimed:string[];skin:'neon'|'aurora'|'solar'};
export const freshProgress:Progress={version:1,xp:0,spins:0,wins:0,cashouts:0,boosts:0,energy:0,claimed:[],skin:'neon'};
export const forms=[
 {name:'Iskra',detail:'Chłodny neon',color:'#689cff'},
 {name:'Puls',detail:'Rozbudzone światło',color:'#9b82ff'},
 {name:'Plazma',detail:'Pęknięcia energii',color:'#ef76ff'},
 {name:'Orbita',detail:'Wirujące pierścienie',color:'#ff9266'},
 {name:'Supernova',detail:'Korona płomieni',color:'#ffc65c'},
 {name:'Legenda',detail:'Złoto. Pełna moc.',color:'#fff1a0'},
];
export const skins=[{id:'neon',name:'Neon',xp:0,color:'#7d8dff'},{id:'aurora',name:'Aurora',xp:300,color:'#7fffe0'},{id:'solar',name:'Solar',xp:800,color:'#ffd579'}] as const;
export function readProgress(raw:unknown):Progress{
 const p=(raw&&typeof raw==='object'?raw:{}) as Partial<Progress>;
 const safe=(v:unknown)=>typeof v==='number'&&Number.isSafeInteger(v)&&v>=0?Math.min(v,1e9):0;
 const xp=safe(p.xp);const skin=skins.find(s=>s.id===p.skin&&xp>=s.xp)?.id||'neon';
 return {version:1,xp,spins:safe(p.spins),wins:safe(p.wins),cashouts:safe(p.cashouts),boosts:safe(p.boosts),energy:Math.min(100,safe(p.energy)),claimed:Array.isArray(p.claimed)?p.claimed.filter((x):x is string=>typeof x==='string'):[],skin};
}
export function boostReady(p:Progress){return p.xp>=100&&p.energy===100;}
export function roundProgress(p:Progress,win:boolean,boost:boolean):Progress{
 if(boost&&!boostReady(p))throw new Error('BOOST nie jest gotowy');
 const xp=p.xp+(win?30:20)*(boost?2:1);
 return {...p,xp,spins:p.spins+1,wins:p.wins+Number(win),boosts:p.boosts+Number(boost),energy:boost?0:p.xp<100&&xp>=100?100:xp>=100?Math.min(100,p.energy+25):0};
}
export const missions=[
 {id:'start',name:'Pierwsze orbity',description:'Rozegraj 5 rund',key:'spins',goal:5,reward:60},
 {id:'collector',name:'Dobry moment',description:'Odbierz punkty 3 razy',key:'cashouts',goal:3,reward:90},
 {id:'pilot',name:'Zapłon',description:'Użyj BOOST raz',key:'boosts',goal:1,reward:100},
 {id:'explorer',name:'Odkrywca',description:'Rozegraj 20 rund',key:'spins',goal:20,reward:150},
 {id:'keeper',name:'Kolekcjoner',description:'Odbierz punkty 10 razy',key:'cashouts',goal:10,reward:200},
 {id:'engineer',name:'Inżynier energii',description:'Użyj BOOST 5 razy',key:'boosts',goal:5,reward:200},
] as const;
export function claimMission(p:Progress,id:string):Progress{
 const m=missions.find(m=>m.id===id);
 if(!m||p.claimed.includes(id)||p[m.key]<m.goal)return p;
 const xp=p.xp+m.reward;
 return {...p,xp,energy:p.xp<100&&xp>=100?100:p.energy,claimed:[...p.claimed,id]};
}
