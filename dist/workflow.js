export function nextStep(papers,{modelReady=false,interests=''}={}){
 const pdfs=papers.filter(p=>p.hasPDF),pending=pdfs.filter(p=>!p.analysisAt),done=pdfs.filter(p=>p.analysisAt);
 if(!pdfs.length)return {stage:1,action:'add-paper',label:'加入第一篇 PDF',text:'先加入論文原文；只有來源連結無法分析內容。'};
 if(!modelReady&&pending.length)return {stage:2,action:'setup-model',label:'設定 AI，繼續分析',text:`已匯入 ${pdfs.length} 篇 PDF。閱讀與保存不用 API；產生研究分析才需要你的 Gemini 金鑰。`};
 if(pending.length)return {stage:3,action:'analyze-pending',label:`分析 ${pending.length} 篇待處理論文`,text:'一次確認傳送範圍，逐篇整理研究問題、方法、成果與限制，保留頁碼引用。'};
 if(done.length<2)return {stage:1,action:'add-paper',label:'再加入一篇 PDF',text:'單篇分析已完成。跨論文研究概要需要至少兩篇已分析論文。'};
 if(!interests.trim())return {stage:4,action:'go-synthesis',label:'填寫申請方向並整理概要',text:`已完成 ${done.length} 篇分析。填寫你的研究興趣，讓概要連結到你的申請目標。`};
 return {stage:4,action:'go-synthesis',label:'查看／產生研究概要',text:`已有 ${done.length} 篇原文分析可用。選擇論文，整理共同主題、研究演進及申請契合點。`};
}
