# Scholar Atlas｜教授研究整理器

海外研究所申請常需要逐位查看教授的研究與多篇論文。本專案以教授資料夾整理文獻、閱讀證據、研究概要與聯絡準備，並以 AGENTS.md 讓 AI 能沿用相同規則新增內容與功能。

## 功能
- 新增／編輯／刪除教授，依學校、研究標籤搜尋與進度篩選。
- 每位教授獨立論文庫：年份、來源、摘要、方法、成果、限制、閱讀層級與 PDF。
- 即時結構化概要，逐篇附來源，標明缺漏；關鍵字興趣交集比較。
- AI 分析包：輸出有引用規則的提示詞與所有文字資料，交由 ChatGPT / Claude 分析，再將查核後的結果存入研究筆記。
- 匯出實體教授 ZIP 資料夾，含可用 PDF、論文 JSON、概要、筆記及分析包。
- JSON 工作區備份／還原。所有使用者資料儲存在自己瀏覽器，沒有伺服器同步。

## 明確限制
網站沒有內建即時 LLM、全網教授爬蟲、PDF 文字擷取或雲端同步。概要是欄位彙整，興趣比對是字面關鍵字，並非自動深度文獻回顧。PDF 不會自動上傳到 AI；需另行附加。範例只涵蓋三篇 GFlowNet 共同著作，不代表最新或完整著作，也不代表招生資訊。

## 執行
需要 Node.js 22+（僅測試／打包；網站本身無依賴）。

```bash
npm test
npm run build
python3 -m http.server 8000 --directory dist
```

打開 http://localhost:8000。不要直接雙擊 index.html，以免 ES module 受到 file:// 限制。

## GitHub 與公開網站
1. 在自己的 GitHub 建立公開 Repository `scholar-atlas`。
2. 將本 ZIP 解壓後的全部專案檔案上傳，包括 AGENTS.md、dist、docs、tests、scripts、package.json 和 `.github/workflows/pages.yml`。不要上傳私人教授資料夾或 PDF。
3. Repository Settings → Pages → Source 選 GitHub Actions。
4. Actions → Publish Scholar Atlas → Run workflow；或 push 至 main。
5. 成功後 Pages 顯示網址，通常為 https://<你的帳號>.github.io/scholar-atlas/。
6. 更新 SUBMISSION.md 的實際 Repository／網站連結及自己的繳交身份。

若用 Git：
```bash
git init
git add .
git commit -m "Build Scholar Atlas research organizer"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/scholar-atlas.git
git push -u origin main
```

## 資料與備份
JSON 備份不含 PDF。每位教授的「匯出資料夾」ZIP 包含本機可讀取的 PDF。清除瀏覽器資料或改用其他裝置前，請同時備份 JSON 與 ZIP。還原 JSON 後需另行附加 PDF，ZIP 不提供一鍵還原。

## 範例來源（2026-11-13 查核）
- https://yoshuabengio.org/en/blog/generative-flow-networks
- https://arxiv.org/abs/2106.04399
- https://jmlr.org/beta/papers/v24/22-0364.html
- https://proceedings.iclr.cc/paper_files/paper/2024/hash/bc667ac84ef58f2b5022da97a465cbab-Abstract-Conference.html

範例摘要為來源基礎的簡短整理，未主張完成全文審閱。2023 與 2024 年份分別採 JMLR 與 ICLR 版本。

## 可延伸性
AGENTS.md 指定模組責任、資料契約、來源規則、安全與驗收方式。新增「閱讀路線」頁時可重用現有 Paper 資料與元件，不必重建教授庫。詳細範例見 docs/extension-example.md。
