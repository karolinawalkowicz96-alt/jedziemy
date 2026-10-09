export const EVOLUTIONS = [
 {amount:10,name:'Iskra',color:'#548bff',detail:'Neonowy rdzeń'},
 {amount:20,name:'Puls',color:'#28c8ff',detail:'Pierwsza orbita'},
 {amount:40,name:'Kryształ',color:'#ab78ff',detail:'Lewitujące kryształy'},
 {amount:80,name:'Plazma',color:'#fc5bcc',detail:'Wyładowania energii'},
 {amount:160,name:'Inferno',color:'#ff9438',detail:'Ognista obręcz'},
 {amount:320,name:'Supernova',color:'#ffe29c',detail:'Korona i złota materia'},
 {amount:640,name:'Pulsar',color:'#ffe6b0',detail:'Impuls gwiazdy'},
 {amount:1280,name:'Absolut',color:'#fff1cd',detail:'Maksymalna energia'},
] as const;
export const evolutionFor=(amount:number)=>Math.min(7, Math.max(0, Math.floor(Math.log2(Math.max(10,amount)/10))));
