import assert from 'node:assert/strict';
import {intensityFor,spinProgress} from '../lib/visuals.ts';
for(const [v,x] of [[10,.15],[20,.25],[40,.4],[80,.6],[160,.8],[320,1],[640,1]])assert.equal(intensityFor(v),x);
let prev=0;for(let i=0;i<=1000;i++){const p=spinProgress(i/1000);assert.ok(p>=prev-1e-10);assert.ok(p<=1+1e-10);prev=p;}assert.equal(spinProgress(0),0);assert.equal(spinProgress(1),1);
console.log('PASS: reference intensity stops, interpolation and continuous monotonic spin timing');
