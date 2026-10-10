import assert from 'node:assert/strict';
import {initial,resolve,cashout} from '../lib/game.ts';
let g=resolve(initial,10,true);assert.equal(g.balance,1240);assert.equal(g.pot,20);g=resolve(g,10,true);assert.equal(g.balance,1240);assert.equal(g.pot,40);assert.equal(g.streak,2);const c=cashout(g);assert.equal(c.balance,1280);assert.equal(c.pot,0);assert.deepEqual(cashout(c),c);const lost=resolve(g,10,false);assert.equal(lost.balance,1240);assert.equal(lost.pot,0);assert.equal(lost.phase,'loss');assert.throws(()=>resolve(initial,1251,true));assert.throws(()=>resolve(initial,0,true));
for(const win of [true,false])for(let i=0;i<=100;i++){const angle=(win?-Math.PI/2:Math.PI/2)+(i/100-.5)*1.7;const localX=Math.cos(Math.PI/2-angle);assert.equal(localX<0,win,'Pointer must land on correct half');}
console.log('PASS: debit, doubling, cashout, loss, validation and 202 pointer positions');
