# Scholar Atlas v2｜原文教授研究整理器

為海外研究所申請建立可回查的教授文獻庫。此版本完全移除範例教授、預填論文與模板式研究概要。

## 三個實作核心
1. 真正的資料夾：透過桌面 Chrome／Edge 的 File System Access API，在使用者選定位置建立每位教授的獨立目錄，保存個人資料、來源、PDF 與分析。
2. 原文分析：PDF.js 本機逐頁擷取文字；Gemini API 分段分析研究問題、方法、成果、限制；每條引用比對指定頁的原文片段，附一鍵 PDF 頁碼回查。
3. 跨論文概要：至少兩篇已分析論文，歸納研究主軸、演進、共同方法與申請關聯；區分原文整理與推論，保留引文。

## 開始使用
1. 用桌面 Chrome／Edge 在頂層分頁開啟網站（HTTPS 或 localhost）。Safari／Firefox 若不支援 showDirectoryPicker，不能使用此實體目錄版本。
2. 點「選取電腦資料夾」，選一個用來存放研究資料的父目錄。網站自動建立 scholar-atlas-data。
3. 新增教授，填資料與官方頁面。新增論文並上傳有權保存的 PDF，確認教授為作者之一。
4. 查看擷取文字。有來源連結但未附 PDF 的項目不能執行原文分析。
5. 到「分析模型設定」，輸入自己的 Gemini API key、驗證並選擇帳戶可用模型，可按「測試一次生成連線」。Key 只在分頁記憶體，重新整理後需重新輸入。
6. 點「分析原文」。確認會把文字送至 Google Gemini並使用自己的額度。完成後逐條點引用回查。
7. 至少兩篇完成後，在「跨論文概要」選取論文並分析。研究方向先在教授庫首頁設定。
8. 每次重開網站重新選取相同父目錄，即讀取磁碟上的資料。可匯出完整教授 ZIP 備份。

API key 可在 https://aistudio.google.com/apikey 管理。ChatGPT 訂閱不等同 Gemini API 額度。無 key 時仍可建立教授、保存 PDF、擷取文字與閱讀原文，但不能產生模型分析。

## 原文與模型限制
- PDF 上限 50 MB／500 頁。掃描檔須事先 OCR；本系統不假裝讀懂沒有文字的圖片。
- 文字擷取不等同圖表／公式理解；雙欄排版可能影響閱讀順序。頁碼指 PDF 第幾頁，不是印刷頁碼。
- 每個片段均須處理，失敗不保存為完整分析；不自動重試付費呼叫。
- 跨篇最多選 20 篇，傳送資料最多 180,000 字元，超限直接提示而非靜默截斷。
- 原文片段核對不等於結論正確。模型可能誤解上下文，使用者應核對語意。
- 不自動爬取教授名單、不繞過付費牆、不自動寄信；沒有這些假按鈕。
- 教授、論文、PDF、分析都在本機。僅在明確確認分析後將文字／引用送到 Google；金鑰不存磁碟或 GitHub。

## 開發與部署
Node.js >=22.13。
```bash
npm ci
npm run build
npm test
python3 -m http.server 8000 --directory dist
```
`build` 將鎖定版本 PDF.js（含授權、字碼表與字型）從 node_modules 複製到 dist/vendor。原始碼 ZIP 不含 node_modules、vendor、私人 PDF 或使用者資料；不能解壓後直接雙擊 HTML，要先安裝／build 或使用 GitHub Actions。

GitHub：上傳專案內容到根目錄，包含 package-lock.json、scripts、tests、dist、docs、AGENTS.md 及 `.github/workflows/pages.yml`。Settings → Pages → Source 選 GitHub Actions。Workflow 依序 npm ci、build、test，再部署 dist。若已上傳 v1，請刪除舊 dist/seed.js，並替換所有同名檔案，尤其 workflow 與 package.json。

## 實測界線
測試包含真正的兩頁 PDF 文字擷取、真實暫存磁碟目錄寫入／重開／封存、引文核對、長頁完整分段、錯誤頁碼拒絕、跨篇來源數量、API 配額錯誤與輸出截斷。模型傳輸測試使用明確標示的 mock，不能據此宣稱 Gemini 已實測成功。部署環境沒有提供 API key；首次使用者需自行執行生成連線測試，再測試自己的論文。

## 作業規則
AGENTS.md 定義目的、頁面與模組、命名、資料契約、來源標註、金鑰、錯誤狀態與擴充流程。新增「方法比較」頁可重用 Claim 及 PDF 回查，無須另建論文模型。SUBMISSION.md 提供作業簡介與繳交項目，身份及 GitHub 網址需填入實際值。
