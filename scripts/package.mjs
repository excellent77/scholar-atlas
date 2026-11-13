import{createHash}from'node:crypto';
import{readFile,writeFile,readdir,mkdir,copyFile,cp,rm}from'node:fs/promises';import{zip}from'../dist/zip.js';
await rm('dist/vendor',{recursive:true,force:true});await mkdir('dist/vendor',{recursive:true});
for(let [src,dst] of [['pdf.min.mjs','pdf.mjs'],['pdf.worker.min.mjs','pdf.worker.mjs'],['pdf.renderer.min.mjs','pdf.renderer.mjs']])await copyFile('node_modules/pdfjs-dist/legacy/build/'+src,'dist/vendor/'+dst);
for(let d of ['cmaps','standard_fonts','wasm'])await cp('node_modules/pdfjs-dist/'+d,'dist/vendor/'+d,{recursive:true});
await copyFile('node_modules/pdfjs-dist/LICENSE','dist/vendor/PDFJS-LICENSE.txt');
for(let f of ['AGENTS.md','README.md','SUBMISSION.md'])await copyFile(f,'dist/'+f);
// Version the full local module graph so normal reloads do not mix old modules.
const runtime=(await readdir('dist')).filter(n=>n.endsWith('.js')||n==='style.css').sort();
const clean=s=>s.replace(/\?v=[a-f0-9]{16}/g,'');
const sources=await Promise.all(runtime.map(async name=>[name,clean(await readFile('dist/'+name,'utf8'))]));
const version=createHash('sha256').update(JSON.stringify(sources)).digest('hex').slice(0,16);
for(const [name,source]of sources)if(name.endsWith('.js'))await writeFile('dist/'+name,source.replace(/(['"])(\.\/[^'"]+\.js)\1/g,(_,quote,path)=>quote+path+'?v='+version+quote));
let html=clean(await readFile('dist/index.html','utf8'));html=html.replace('src="app.js"','src="app.js?v='+version+'"').replace('href="style.css"','href="style.css?v='+version+'"');await writeFile('dist/index.html',html);
let entries=[];async function walk(dir=''){for(let item of await readdir(dir||'.',{withFileTypes:true})){let path=dir?dir+'/'+item.name:item.name;if(['.git','.openai','.sites-runtime','node_modules'].includes(item.name)||path==='dist/vendor'||path==='dist/scholar-atlas-source.zip'||item.name.endsWith('.pdf')||item.name.startsWith('.env'))continue;if(item.isDirectory())await walk(path);else entries.push(['scholar-atlas/'+path,new Blob([await readFile(path)])])}}await walk();let out=await zip(entries);await writeFile('dist/scholar-atlas-source.zip',new Uint8Array(await out.arrayBuffer()));console.log(`Packaged ${entries.length} source files; vendored PDF.js assets generated separately.`);
