export function nextStep(papers,{modelReady=false,interests=''}={}){
 const pdfs=papers.filter(p=>p.hasPDF),pending=pdfs.filter(p=>!p.analysisAt),done=pdfs.filter(p=>p.analysisAt);
 if(!pdfs.length)return {stage:1,action:'add-paper',label:'加入第一篇 PDF',text:'加入 PDF 後即可分析。'};
 if(!modelReady&&pending.length)return {stage:2,action:'setup-model',label:'設定 AI',text:`已匯入 ${pdfs.length} 篇 PDF。連接 Gemini 開始分析。`};
 if(pending.length)return {stage:3,action:'analyze-pending',label:`分析 ${pending.length} 篇待處理論文`,text:'整理問題、方法、成果與限制，保留引用。'};
 if(done.length<2)return {stage:1,action:'add-paper',label:'再加入一篇 PDF',text:'研究概要需要至少兩篇已分析論文。'};
 if(!interests.trim())return {stage:4,action:'go-synthesis',label:'整理研究概要',text:`已分析 ${done.length} 篇。填寫申請方向，整理契合度。`};
 return {stage:4,action:'go-synthesis',label:'研究概要',text:`選取論文，查看或產生研究概要。`};
}

