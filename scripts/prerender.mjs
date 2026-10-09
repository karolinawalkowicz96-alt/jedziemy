import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createServer} from 'vite';
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try{const {default:Home}=await server.ssrLoadModule('/app/page.tsx');const markup=renderToStaticMarkup(React.createElement(Home));let html=fs.readFileSync('release/index.html','utf8');html=html.replace('<div id="root"></div>',`<div id="root">${markup}</div>`);fs.writeFileSync('release/index.html',html);console.log('Static HTML landing rendered.')}finally{await server.close()}
