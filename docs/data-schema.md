# v2 磁碟資料契約
權威規格為 AGENTS.md。Workspace 使用使用者授權的 FileSystemDirectoryHandle，不是 localStorage 的資料夾分類。

professors/<姓名-UUID>/ 下保存 profile.json。每篇論文使用 papers/<UUID>/ 獨立目錄，有原文時存在 original.pdf 與 pages.json。每個 Page 必須含連續 1-based page、label、text。

SHA256：Paper.hash 對應 original.pdf；Paper.textHash 對應 JSON.stringify(pages)。讀取、分析或引用前檢查，不允許外部換檔後沿用分析。

模型輸出 Claim 必須有 section、kind、text 與 citations。Quote 長度 12–800 字元，正規化後須存在於指定 paperId/page。被拒絕的主張不渲染為成功分析，錯誤理由記在 rejected。分析 JSON 保存生成模型、時間、資料範圍與缺口。

單篇完成後儲存 analysis.json / analysis.md，更新 profile 和 paper 的 analysisAt。跨篇 synthesis 保存 fingerprint（教授資訊、研究方向、論文 ID／title／year／source／hash／analysisAt），變動時 UI 提示需重新分析。

不自動遷移 v1 範例或 private browser data；既有資料保留原位。沒有 key 可使用本機工作區，但沒有 AI 結果。
