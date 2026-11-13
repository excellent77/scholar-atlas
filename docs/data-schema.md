# 資料規格與可攜性

權威欄位見 AGENTS.md 第 5 節；實際驗證為 dist/core.js 的 validateState。

工作區版本 1，所有實體 ID 使用 crypto.randomUUID()（公開範例為固定可讀 ID）。Professor.papers 擁有各自 Paper；共同著作可在不同教授下出現。論文年份指已填入版本，不推測為首次發表年。

儲存：教授與文字資料在 localStorage；PDF Blob 在 IndexedDB，不以 base64 填入 localStorage。JSON 備份保留 PDF 檔名但不含檔案內容。匯入後 PDF 未在本裝置找到，開啟與 ZIP 匯出均須明確提示。

## 教授資料夾 ZIP
- `<professor>/profile.json`
- `<professor>/overview.md`
- `<professor>/application-notes.md`
- `<professor>/ai-analysis-prompt.txt`
- `<professor>/papers/<year-title-id>/paper.json`
- `<professor>/papers/<year-title-id>/paper.pdf`（如本機可用）
- `<professor>/MISSING_FILES.txt`（如檔案缺失）

來源連結不是自動驗證標記；使用者負責查核作者及內容。AI 分析以論文 ID 引用，而結構化概要採排序後的 [1] 等編號，編號只在該次概要中有效。
