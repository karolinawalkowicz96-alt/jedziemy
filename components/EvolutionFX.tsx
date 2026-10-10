'use client';
import {memo,type CSSProperties} from 'react';
import {Crown} from 'lucide-react';
export default memo(function EvolutionFX({stage=0,boosted=false,skin='neon'}:{stage?:number;boosted?:boolean;skin?:string}){
 return <div className={`evo-fx evo-${stage} skin-${skin} ${boosted?'evo-boost':''}`} aria-hidden="true">
  <div className="evo-halo"/><div className="evo-rim"/>
  {stage>=1&&<div className="evo-pulse"/>}
  {stage>=2&&<div className="evo-fragments">{Array.from({length:12},(_,i)=><i key={i} style={{'--a':`${i*30}deg`,'--d':`${i%4*.45}s`} as CSSProperties}/>)}</div>}
  {stage>=3&&<><div className="evo-orbit orbit-one"/><div className="evo-orbit orbit-two"/></>}
  {(stage>=4||boosted)&&<div className="evo-flames">{Array.from({length:24},(_,i)=><i key={i} style={{'--a':`${i*15}deg`,'--d':`${i%7*.21}s`,'--h':`${22+(i*13)%40}px`} as CSSProperties}/>)}</div>}
  {stage>=5&&<Crown className="evo-crown" size={54} strokeWidth={1.4}/>}
  {boosted&&<><div className="evo-shock"/><div className="evo-speed"/></>}
 </div>;
});
