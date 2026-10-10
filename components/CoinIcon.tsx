'use client';
import {useId} from 'react';
/** The crown stamp is shared by wallet, stakes and result amounts. */
export default function CoinIcon({size=24}:{size?:number}){
 const id=useId().replace(/:/g,'');
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id={id} x1="3" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#fff3b8"/><stop offset=".36" stopColor="#efc449"/><stop offset=".67" stopColor="#b5791e"/><stop offset="1" stopColor="#f8da78"/></linearGradient></defs><path d="M3 8v10c0 5.3 18 5.3 18 0V8" fill={`url(#${id})`} stroke="#e8bc56" strokeWidth=".7"/>{[11,14,17].map(y=><path key={y} d={`M3 ${y}c0 5.2 18 5.2 18 0`} stroke="#fff1af" strokeWidth=".65" opacity=".7"/>)}<ellipse cx="12" cy="7.6" rx="9" ry="5.1" fill={`url(#${id})`} stroke="#fff1bd" strokeWidth=".8"/><ellipse cx="12" cy="7.6" rx="7.1" ry="3.6" stroke="#9b6419" strokeWidth=".6"/><path d="m7 6.3 2 3h6l2-3-3 1-2-2-2 2z" fill="#a16c1b"/><path d="M9 10h6" stroke="#fff0af" strokeWidth=".5"/></svg>;
}
