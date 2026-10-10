// Presentation only: this mapping never participates in resolving a round.
export function intensityFor(value:number):number {
 const stops=[[10,.15],[20,.25],[40,.4],[80,.6],[160,.8],[320,1]];
 if(value<=10)return .15;
 for(let i=1;i<stops.length;i++){const [x,y]=stops[i], [px,py]=stops[i-1];if(value<=x)return py+(y-py)*(value-px)/(x-px);}
 return 1;
}
// Integrated velocity: acceleration, constant speed, then a long deceleration.
export function spinProgress(p:number):number {
 const x=Math.max(0,Math.min(p,1)); const area=.09+.27+.55/4;
 if(x<.18)return (x*x/(2*.18))/area;
 if(x<.45)return (.09+x-.18)/area;
 const q=(x-.45)/.55;
 return (.36+.55*(1-Math.pow(1-q,4))/4)/area;
}
