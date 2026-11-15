# Scholar Atlas｜原文教授研究整理器

為海外研究所申請建立一個可回查原文的教授文獻庫。

## 三個實作核心

1. **實體資料夾**：透過桌面版 Chrome／Edge 的 File System Access API，在使用者選定的位置為每位教授建立獨立目錄，保存個人資料、來源、PDF 與分析結果。
2. **原文分析**：以 PDF.js 在本機逐頁擷取文字，再由 Gemini API 分段分析研究問題、方法、成果與限制。每則引用都會與指定頁面的原文片段比對，並可一鍵跳到對應的 PDF 頁碼回查。
3. **跨論文概要**：選取至少兩篇已分析的論文，歸納研究主軸、演進脈絡、共同方法與申請關聯；內容區分原文整理與推論，並保留引文。

## 開始使用

1. 以桌面版 Chrome 或 Edge，在頂層分頁開啟網站（須為 HTTPS 或 localhost）。若 Safari、Firefox 不支援 `showDirectoryPicker`，就無法使用這個實體目錄版本。
2. 點選「選取電腦資料夾」，選擇一個用來存放研究資料的父目錄，網站會自動在其中建立 `scholar-atlas-data`。
3. 新增教授，填寫基本資料與官方頁面；接著新增論文並上傳有權保存的 PDF，同時確認該教授為作者之一。
4. 檢查擷取出的文字。只有來源連結、未附 PDF 的項目無法執行原文分析。
5. 到「分析模型設定」輸入自己的 Gemini API key，驗證後選擇帳戶可用的模型，也可以按「測試一次生成連線」確認。Key 只存在分頁記憶體中，重新整理頁面後須重新輸入。
6. 點選「分析原文」，並確認同意將文字傳送至 Google Gemini、使用自己的額度。完成後逐則點選引用回查。
7. 至少兩篇分析完成後，到「跨論文概要」選取論文並執行分析。研究方向需先在教授庫首頁設定。
8. 每次重新開啟網站時，選取同一個父目錄即可讀取磁碟上的資料。也可以將教授的完整資料匯出為 ZIP 備份。

API key 可在 https://aistudio.google.com/apikey 管理。沒有 key 時，仍可建立教授、保存 PDF、擷取文字與閱讀原文，只是無法產生模型分析。

## 原文與模型限制

- PDF 上限為 50 MB／500 頁。掃描檔須事先完成 OCR；系統不會假裝讀懂沒有可擷取文字的圖片。
- 擷取文字不等於理解圖表或公式，雙欄排版也可能打亂閱讀順序。頁碼指的是 PDF 的第幾頁，而非印刷頁碼。
- 每個片段都必須處理完成，任何失敗都不會被存成完整分析；付費呼叫不會自動重試。
- 跨論文分析最多選取 20 篇，傳送資料上限為 180,000 字元；超過上限時會直接提示，不會默默截斷。
- 原文片段核對無誤，不代表結論正確。模型仍可能誤解上下文，使用者應自行核對語意。
- 系統不會自動爬取教授名單、繞過付費牆或自動寄信，介面上也不放這些功能的假按鈕。
- 教授、論文、PDF 與分析結果都存放在本機。只有在使用者明確確認分析後，才會把文字與引用傳送到 Google；金鑰不會寫入磁碟，也不會上傳 GitHub。

## 開發與部署

需要 Node.js >=22.13。

```bash
npm ci
npm run build
npm test
python3 -m http.server 8000 --directory dist
```

`build` 會將鎖定版本的 PDF.js（含授權檔案、字碼表與字型）從 `node_modules` 複製到 `dist/vendor`。原始碼 ZIP 不包含 `node_modules`、`vendor`、私人 PDF 或使用者資料，因此解壓縮後不能直接雙擊 HTML 開啟，必須先安裝並執行 build，或改用 GitHub Actions。

部署到 GitHub 時，將專案內容上傳至 Repository 根目錄，包括 `package-lock.json`、`scripts`、`tests`、`dist`、`docs`、`AGENTS.md` 與 `.github/workflows/pages.yml`。接著在 Settings → Pages → Source 選擇 GitHub Actions。Workflow 會依序執行 `npm ci`、build、test，最後部署 `dist`。若先前已上傳 v1，請刪除舊的 `dist/seed.js`，並覆蓋所有同名檔案，尤其是 workflow 與 `package.json`。
