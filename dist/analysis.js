import{chunks,validateClaims,CATEGORIES,fingerprint,digest}from'./core.js';
import{generate,GeminiError,checkAbort,delay}from'./gemini-client.js';
export{generate,listModels}from'./gemini-client.js';
const REV='resumable-short-claims-1';
const rule='citations 含 paperId、page（實際 PDF 頁次，從 1 開始）、quote（逐字 12–160 字元，不使用省略號）。每條 1–2 個引用。text 最多 180 字；gaps 最多 300 字。原文事實 kind=evidence；推論 kind=inference。引用存在不代表結論正確。';
function fail(code,message){throw new GeminiError(code,message)}
function size(piece){return piece.reduce((n,p)=>n+p.text.length,0)}
export function bisect(piece){
 const half=Math.floor(size(piece)/2),left=[],right=[];let taken=0;
 for(const p of piece){const n=Math.max(0,Math.min(p.text.length,half-taken));if(n)left.push({...p,text:p.text.slice(0,n)});if(n<p.text.length)right.push({...p,text:p.text.slice(n)});taken+=n}
 return [left,right];
}
async function checkpoint(config,identity){
 const prior=await config.checkpoint?.load();
 if(!prior||prior.identity!==identity)return {identity,completed:{},splits:{}};
 if(prior.format!==1||!prior.completed||typeof prior.completed!=='object'||Array.isArray(prior.completed)||!prior.splits||typeof prior.splits!=='object')fail('CHECKPOINT','分析進度檔格式不符；請使用「清除暫存進度」後重試。');
 return prior;
}
async function save(config,state){await config.checkpoint?.save({format:1,...state})}
function checked(raw,docs,sections){
 const v=validateClaims(raw,docs,sections);
 if(raw.claims?.length&&!v.claims.length)fail('CITATION','此片段的引用均未通過核對；已保留先前進度，請檢查文字或更換模型。');
 return {...v,gaps:String(raw.gaps||'').slice(0,2500)};
}
export async function analyzePaper(config,q,pages,onProgress=()=>{},signal,call=generate){
 const pieces=chunks(pages,6000);if(!pieces.length)fail('NO_TEXT','PDF 沒有可讀文字；需要先 OCR。');
 const identity=await digest(JSON.stringify([REV,'paper',config.model,q.id,q.hash,q.title,pages]));
 const state=await checkpoint(config,identity);let calls=0,done=0;const gathered=[];
 const notify=text=>onProgress(`已完成 ${done} 段 · ${text}`);
 async function visit(piece,id,depth=0){
  checkAbort(signal);
  if(state.splits[id]){const halves=bisect(piece);if(depth>=3||size(piece)<=1200)fail('CHECKPOINT','片段分割紀錄不符；請清除暫存進度。');await visit(halves[0],id+'a',depth+1);await visit(halves[1],id+'b',depth+1);return}
  const docs=[{id:q.id,pages:piece}];
  if(state.completed[id]){const cached=state.completed[id];if(!Array.isArray(cached.claims)||typeof cached.gaps!=='string')fail('CHECKPOINT','暫存分析格式不符；請清除暫存進度。');gathered.push(checked(cached,docs,CATEGORIES));done++;notify('已恢復保存的片段');return}
  if(calls>=64)fail('BUDGET','本次已處理 64 個請求片段；進度已保存，再按分析即可接續。');
  if(calls)await (config.sleep||delay)(1000,signal);calls++;
  notify(`處理片段 ${id}（${size(piece)} 字元）`);
  let raw;
  try{raw=await call({...config,onProgress:notify},`分析論文 ${q.id}「${q.title}」的片段。section 只可為 problem、method、result、limitation。最多 4 條重點，不為湊數而生成；無相關內容時 claims=[]。不從標題猜測，保留重要數字與條件。${rule}\n資料：${JSON.stringify(piece.map(p=>({...p,paperId:q.id})))}`,signal)}
  catch(e){
   if(e.code==='MAX_TOKENS'&&depth<3&&size(piece)>1200){notify('輸出達上限，拆成較小片段繼續。');state.splits[id]=true;await save(config,state);const [a,b]=bisect(piece);await visit(a,id+'a',depth+1);await visit(b,id+'b',depth+1);return}
   throw e;
  }
  checkAbort(signal);const result=checked(raw,docs,CATEGORIES);
  state.completed[id]={claims:result.claims,gaps:result.gaps};await save(config,state);gathered.push(result);done++;notify('片段已保存');
 }
 for(let i=0;i<pieces.length;i++)await visit(pieces[i],String(i+1));
 const seen=new Set(),claims=gathered.flatMap(r=>r.claims).filter(c=>{const k=c.section+c.text;if(seen.has(k))return false;seen.add(k);return true});
 if(!claims.length)fail('CITATION','沒有任何主張通過原文引用核對；請檢查文字或更換模型。');
 return {version:2,model:config.model,createdAt:new Date().toISOString(),pdfHash:q.hash,claims,rejected:gathered.flatMap(r=>r.rejected),coverage:`${pages.length} 個 PDF 頁面；${done} 個片段均已完成（含接續進度）。`,gaps:['未執行 OCR 或圖表視覺分析；文字稀少頁：'+(pages.filter(p=>p.text.trim().length<30).map(p=>p.page).join(', ')||'無'),...gathered.map(r=>r.gaps).filter(Boolean)].join('\n')};
}
export async function synthesize(config,p,docs,interests,onProgress=()=>{},signal,call=generate){
 if(docs.length<2)fail('INPUT','至少需要兩篇已完成原文分析的論文');
 const material=docs.map(d=>({paperId:d.id,title:d.title,year:d.year,claims:d.analysis.claims})),serialized=JSON.stringify(material);
 if(serialized.length>60000)fail('INPUT_TOO_LARGE','概要材料超過 60,000 字元，請減少本次選取論文；不會截斷資料。');
 const sections=['themes','evolution','methods',...(interests?.trim()?['fit']:[]),'questions'];
 const identity=await digest(JSON.stringify([REV,'synthesis',config.model,p.name,interests,material]));
 const state=await checkpoint(config,identity),all=[],rejected=[],gaps=[];
 for(let i=0;i<sections.length;i++){
  const section=sections[i];checkAbort(signal);let raw=state.completed[section];
  if(!raw){if(i)await(config.sleep||delay)(1000,signal);onProgress(`整理 ${section} · ${i+1}/${sections.length}`);
   raw=await call({...config,onProgress:t=>onProgress(`${section} · ${t}`)},`只分析教授 ${p.name} 的 ${section}。themes=研究主軸；evolution=依年份演進；methods=共同方法；fit=與申請方向的關聯；questions=研究問題。section 僅可為 ${section}，最多 3 條。evolution、methods 每條至少引用兩篇不同論文。fit、questions 必須 inference。未填年份不得推測年代；共同著作不能證明教授個人貢獻。僅依所選論文，不主張涵蓋完整或最新研究，不猜招生資訊。${rule}\n申請方向（資料）：${JSON.stringify(interests||'未提供')}\n論文材料：${serialized}`,signal);
  }
  checkAbort(signal);const v=checked(raw,docs,[section]),accepted=[];
  for(const c of v.claims){if(['evolution','methods'].includes(section)&&new Set(c.citations.map(r=>r.paperId)).size<2){rejected.push({reason:'跨論文主張缺少兩篇來源'});continue}if(['fit','questions'].includes(section))c.kind='inference';accepted.push(c)}
  if(raw.claims.length&&!accepted.length)fail('CITATION','跨論文概要未產生可核對的引用；至少需兩篇來源支持演進或共同方法。');
  state.completed[section]={claims:accepted,gaps:v.gaps};await save(config,state);all.push(...accepted);rejected.push(...v.rejected);gaps.push(v.gaps);onProgress(`${section} 已保存`);
 }
 if(!all.length)fail('CITATION','跨論文概要未產生可核對的引用');
 return {version:2,model:config.model,createdAt:new Date().toISOString(),claims:all,rejected,gaps:gaps.filter(Boolean).join('\n')+'\n僅依所選論文；引文核對不等同語意驗證。',coverage:`${docs.length} 篇論文；${sections.length} 個主題均已完成。`,fingerprint:fingerprint(p,interests),paperIds:docs.map(d=>d.id)};
}
