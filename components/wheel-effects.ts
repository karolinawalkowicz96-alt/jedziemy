import * as THREE from 'three';
export function createWheelEffects(scene:THREE.Scene){
 const root=new THREE.Group();scene.add(root);
 const orbitGroup=new THREE.Group();root.add(orbitGroup);
 const rings:THREE.Mesh[]=[];
 for(let i=0;i<4;i++){
  const points:THREE.Vector3[]=[];for(let j=0;j<=160;j++){const a=j/160*Math.PI*2;points.push(new THREE.Vector3(Math.cos(a)*(2.06+i*.1),Math.sin(a)*(2.06+i*.1),Math.sin(a*3+i)*.12));}
  const geo=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),160,.008+i*.002,5,false);
  const mat=new THREE.MeshBasicMaterial({color:new THREE.Color(i%2?'#fa2586':'#448bff').multiplyScalar(2.2),transparent:true,opacity:.65,blending:THREE.AdditiveBlending,depthWrite:false});const mesh=new THREE.Mesh(geo,mat);mesh.rotation.set(i%2?.14:-.13,i%2?.14:-.14,i);rings.push(mesh);orbitGroup.add(mesh);
 }
 const crystalGeo=new THREE.OctahedronGeometry(.11,0),crystalMat=new THREE.MeshStandardMaterial({color:0x7362cb,metalness:.8,roughness:.14,emissive:0x502398,emissiveIntensity:.65});
 const crystals=new THREE.InstancedMesh(crystalGeo,crystalMat,36);root.add(crystals);const dummy=new THREE.Object3D();
 const mobile=window.innerWidth<800;
 const sparkCount=mobile?220:720,sparkPositions=new Float32Array(sparkCount*3),sparkColors=new Float32Array(sparkCount*3);const colors=[new THREE.Color('#268cff'),new THREE.Color('#fb4589'),new THREE.Color('#fff3a0')];for(let i=0;i<sparkCount;i++){const c=colors[i%3];sparkColors.set([c.r,c.g,c.b],i*3)}
 const sparksGeo=new THREE.BufferGeometry();sparksGeo.setAttribute('position',new THREE.BufferAttribute(sparkPositions,3));sparksGeo.setAttribute('color',new THREE.BufferAttribute(sparkColors,3));
 const sparksMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,vertexColors:true,uniforms:{size:{value:1}},vertexShader:'varying vec3 vColor; uniform float size; void main(){vColor=color;vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;gl_PointSize=clamp(size*28./-p.z,1.,10.);}',fragmentShader:'varying vec3 vColor;void main(){float d=length(gl_PointCoord-.5)*2.;float a=pow(max(0.,1.-d),2.);gl_FragColor=vec4(vColor*2.,a);}' });
 const sparks=new THREE.Points(sparksGeo,sparksMat);root.add(sparks);
 const flameGeo=new THREE.PlaneGeometry(6,6),flameMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{time:{value:0},power:{value:0},gold:{value:0}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`varying vec2 vUv;uniform float time;uniform float power;uniform float gold;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
 void main(){vec2 p=(vUv-.5)*6.;float r=length(p),a=atan(p.y,p.x);float n=noise(vec2(a*9.,r*7.-time*2.5))*.55+noise(vec2(a*21.+time*.2,r*14.-time*4.))*.3;float edge=2.12+n*(.23+power*.35);float flame=(1.-smoothstep(edge-.12,edge+.15,r))*smoothstep(1.95,2.12,r);float core=exp(-abs(r-2.07)*40.);float ribbons=pow(max(0.,sin(a*5.+r*13.-time*2.)),13.)*exp(-abs(r-2.22)*9.);vec3 orange=mix(vec3(1.,.13,.025),vec3(1.,.67,.16),gold);vec3 c=mix(orange,vec3(1.,.87,.5),core);gl_FragColor=vec4(c*(1.5+core*2.),(flame*.7+core*.5+ribbons*.35)*power);}`});
 const flame=new THREE.Mesh(flameGeo,flameMat);flame.position.z=-.35;root.add(flame);
 const bolts:THREE.Line[]=[];for(let b=0;b<6;b++){const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(28*3),3));const line=new THREE.Line(geo,new THREE.LineBasicMaterial({color:new THREE.Color(b%2?'#bd69ff':'#76daff').multiplyScalar(2),transparent:true,opacity:.65,blending:THREE.AdditiveBlending,depthWrite:false}));bolts.push(line);root.add(line)}
 const crown=new THREE.Group();crown.position.set(0,2.2,.15);root.add(crown);const goldMat=new THREE.MeshStandardMaterial({color:0xffcc58,metalness:.75,roughness:.2,emissive:0xff9900,emissiveIntensity:.8});
 const band=new THREE.Mesh(new THREE.TorusGeometry(.23,.036,8,36,Math.PI),goldMat);band.rotation.x=Math.PI/2;crown.add(band);
 for(let i=0;i<5;i++){const spike=new THREE.Mesh(new THREE.ConeGeometry(.067,.2+(i===2?.14:0),4),goldMat);spike.position.set((i-2)*.103,.06+(i===2?.035:0),0);spike.rotation.z=(2-i)*.12;crown.add(spike)}
 const shock=new THREE.Mesh(new THREE.RingGeometry(1.98,2.02,100),new THREE.MeshBasicMaterial({color:new THREE.Color('#ffd86a').multiplyScalar(2),transparent:true,opacity:0,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false}));root.add(shock);
 const victoryCoins=new THREE.InstancedMesh(new THREE.CylinderGeometry(.055,.055,.018,16),new THREE.MeshStandardMaterial({color:0xffd56d,metalness:.65,roughness:.2,emissive:0xe08710,emissiveIntensity:.5}),32);root.add(victoryCoins);
 let previousLevel=-1,previousWon=false,pulse=-100,burst=-100;const color=new THREE.Color();
 return {update(t:number,level:number,won:boolean,spinning:boolean,reduced:boolean){
  const seconds=reduced?0:t*.001;
  if(level!==previousLevel){pulse=t;previousLevel=level}if(won&&!previousWon){burst=t;pulse=t}previousWon=won;
  rings.forEach((ring,i)=>{ring.visible=level>=i+1;ring.rotation.z=seconds*(i%2?-.13:.18)*(spinning?2.5:1)+i;const m=ring.material as THREE.MeshBasicMaterial;m.color.set(level>=4?(i%2?'#ff9c2c':'#ffd680'):(i%2?'#e42baf':'#408aff')).multiplyScalar(1.6);});
  crystals.count=level<2?0:Math.min(mobile?12:36,8+(level-2)*8);crystalMat.emissive.set(level>=4?'#974106':'#512eb0');crystalMat.color.set(level>=4?'#d8a346':'#7165bd');
  for(let i=0;i<crystals.count;i++){const a=i*2.399+seconds*.06*(i%2?1:-1),r=2.24+(i%4)*.085;dummy.position.set(Math.cos(a)*r,Math.sin(a)*r,Math.sin(a*2)*.18);dummy.rotation.set(i+seconds*.2,i*.7+seconds*.16,i);dummy.scale.setScalar(.6+(i%3)*.3);dummy.updateMatrix();crystals.setMatrixAt(i,dummy.matrix)}crystals.instanceMatrix.needsUpdate=true;
  sparksGeo.setDrawRange(0,Math.min(sparkCount,80+level*110));sparksMat.uniforms.size.value=level>=4?1.3:.7;
  for(let i=0;i<Math.min(sparkCount,80+level*110);i++){const a=i*2.399+seconds*(.07+level*.015),life=((seconds*.24+i*.037)%1),winBurst=won&&!reduced?Math.max(0,1-(t-burst)/2100):0,r=2.02+life*(.35+level*.12)+winBurst*life*1.6;sparkPositions[i*3]=Math.cos(a)*r;sparkPositions[i*3+1]=Math.sin(a)*r+(level>=4?life*.28:0);sparkPositions[i*3+2]=Math.sin(i*4.1)*.6;const c=level>=4?color.setHSL(.08+(i%5)*.014,1,.62):colors[i%2];sparkColors.set([c.r,c.g,c.b],i*3)}sparksGeo.attributes.position.needsUpdate=true;sparksGeo.attributes.color.needsUpdate=true;
  flame.visible=level>=4||won;flameMat.uniforms.time.value=seconds;flameMat.uniforms.power.value=won?.9:level>=5?1:.6;flameMat.uniforms.gold.value=level>=5||won?1:0;
  bolts.forEach((line,b)=>{line.visible=level>=3;const pos=line.geometry.attributes.position as THREE.BufferAttribute;for(let j=0;j<28;j++){const a=b*Math.PI/3+j*.022+seconds*.1,r=2.12+Math.sin(j*4.7+Math.floor(seconds*9)+b)*.055;pos.setXYZ(j,Math.cos(a)*r,Math.sin(a)*r,.22)}pos.needsUpdate=true;(line.material as THREE.LineBasicMaterial).opacity=reduced?.4:.25+Math.sin(seconds*5+b)*.2;});
  crown.visible=level>=5;crown.rotation.y=reduced?0:Math.sin(seconds*.8)*.15;
  const celebrationAge=(t-burst)/1000;victoryCoins.visible=won&&!reduced&&celebrationAge<2.8;
  if(victoryCoins.visible){victoryCoins.count=Math.min(32,12+level*4);for(let i=0;i<victoryCoins.count;i++){const a=i*2.399,speed=1.15+(i%5)*.18,age=celebrationAge;dummy.position.set(Math.cos(a)*speed*age,Math.sin(a)*speed*age+1.1*age-.65*age*age,.6+Math.sin(i)*age*.3);dummy.rotation.set(age*3+i,age*2+i,age);dummy.scale.setScalar(1.1+(i%3)*.4);dummy.updateMatrix();victoryCoins.setMatrixAt(i,dummy.matrix)}victoryCoins.instanceMatrix.needsUpdate=true;}
  const age=(t-pulse)/1300;shock.visible=!reduced&&age>=0&&age<1;shock.scale.setScalar(1+age*.42);(shock.material as THREE.MeshBasicMaterial).opacity=Math.max(0,.8*(1-age));
 },dispose(){scene.remove(root);root.traverse(o=>{if(o instanceof THREE.Mesh||o instanceof THREE.Line||o instanceof THREE.Points){o.geometry.dispose();const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>m.dispose())}})}}
}
