import React from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-ext-400.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-ext-600.css';
import '@fontsource/inter/latin-800.css';
import '@fontsource/inter/latin-ext-800.css';
import './app/globals.css';
import './app/art-direction.css';
import Home from './app/page';
// HTTP-only QA host: randomUUID is secure-context-only; production uses native HTTPS.
if(!crypto.randomUUID){Object.defineProperty(crypto,'randomUUID',{value:()=>{const b=crypto.getRandomValues(new Uint8Array(16));b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;const h=Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;}});}
// Isolated fixtures for visual QA only. This entry is never shipped by Vinext.
const fixture=new URLSearchParams(location.search).get('qa');
if(fixture){const pot=fixture==='high'?320:fixture==='win'?80:0;localStorage.setItem('koleczko-v1',JSON.stringify({balance:1210,pot,base:40,streak:pot===320?3:pot?1:0,phase:pot?'win':fixture==='loss'?'loss':'ready',best:3,name:'Kamil',history:[{id:'qa1',kind:fixture==='loss'?'loss':'win',amount:fixture==='loss'?40:80,time:1760000000000},{id:'qa2',kind:'loss',amount:40,time:1759999940000},{id:'qa3',kind:'win',amount:40,time:1759999880000},{id:'qa4',kind:'win',amount:20,time:1759999820000},{id:'qa5',kind:'loss',amount:10,time:1759999760000}]}));}
createRoot(document.getElementById('root')!).render(<Home/>);
