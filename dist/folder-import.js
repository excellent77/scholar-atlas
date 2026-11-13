import {digest} from './core.js?v=db3d55b76c6a82dc';
export async function scanFolder(root){
 const files=[];let ignored=0;
 async function visit(dir,path=''){
  for await(const [name,handle] of dir.entries()){
   if(name==='scholar-atlas-data'||name==='trash'||name.startsWith('.'))continue;
   const relative=path?path+'/'+name:name;
   if(handle.kind==='directory')await visit(handle,relative);
   else if(/\.pdf$/i.test(name)){if(files.length>=500)throw Error('每次最多匯入 500 份 PDF，請分批選取子資料夾');files.push({handle,path:relative,name})}
   else ignored++;
  }
 }
 await visit(root);files.sort((a,b)=>a.path.localeCompare(b.path));return {files,ignored};
}
export async function importPapers({ws,professor,files,extract,signal,progress=()=>{}}){
 const results=[];
 for(let i=0;i<files.length;i++){
  const entry=files[i];if(signal?.aborted){for(const remaining of files.slice(i))results.push({path:remaining.path,status:'未處理',message:'已取消'});break}
  try{
   const file=await entry.handle.getFile();if(file.size>50*1024*1024)throw Error('超過 50 MB 上限');
   progress(`${i+1}/${files.length}：${entry.name}`);
   const hash=await digest(await file.arrayBuffer());
   if(professor.papers.some(q=>q.hash===hash)){results.push({path:entry.path,status:'略過',message:'此教授已收錄相同 PDF'});continue}
   const pages=await extract(file,(n,total)=>progress(`${i+1}/${files.length}：${entry.name} · 第 ${n}/${total} 頁`),signal);
   if(signal?.aborted)throw Error('已取消，未儲存此檔案');
   const q={id:crypto.randomUUID(),title:entry.name.replace(/\.pdf$/i,'').replace(/[_]+/g,' ').trim()||entry.name,year:null,url:'',authorship:true,hasPDF:true,hash,textHash:await digest(JSON.stringify(pages)),originalName:entry.name,sourcePath:entry.path,titleSource:'filename',pageCount:pages.length,lowPages:pages.filter(p=>p.text.trim().length<30).map(p=>p.page),status:'extracted'};
   await ws.addPaper(professor,q,file,pages);
   results.push({path:entry.path,status:'成功',message:q.lowPages.length?`${q.pageCount} 頁；${q.lowPages.length} 頁文字稀少，可能需 OCR`:`${q.pageCount} 頁`});
  }catch(e){results.push({path:entry.path,status:'失敗',message:e.message})}
 }
 return results;
}
