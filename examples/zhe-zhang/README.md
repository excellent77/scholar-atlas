# Zhe Zhang 真實論文匯入範例

本範例來自專案使用者提供的 Zhe Zhang.zip，保留其中四份原始 PDF，未修改論文內容。它是原文閱讀與匯入範例，不是預先完成的分析成果。

## 使用方式
1. 在 GitHub Repository 按 Code → Download ZIP，解壓縮。
2. 開啟 Scholar Atlas 網站，按「匯入教授資料夾」。
3. 選取 examples/zhe-zhang，確認教授名稱為 Zhe Zhang，以及作者與文件保存權。
4. 匯入後檢查論文資訊；系統以檔名作為預設標題，可自行修改。
5. 可直接閱讀 PDF。若需要分析，先設定自己的 Gemini 或 OpenAI API，再確認送出文字。

不要直接選取 ZIP；必須先解壓縮。網站不會自動載入本範例。四篇長篇論文可能需要多次 API 請求，建議先分析一篇。

## 檔案
- 2011.10076v5.pdf
- 2210.05807v5.pdf
- 2310.12139v3.pdf
- NeurIPS-2024-first-order-methods-for-linearly-constrained-bilevel-optimization-Paper-Conference.pdf

## 與原始壓縮檔的差別
未收錄 scholar-atlas-data 中的重複 PDF、pages.json、個人工作區設定及 analysis-progress.json。原始上傳檔保留不變；未完成片段不視為完整分析。此範例不包含已完成的 analysis.json 或 synthesis.json，也不附 API 金鑰。

## 論文權利
論文版權及使用條件由各自權利人決定，並不因放入本專案而改為程式碼的授權條款；本範例不另行授予論文再利用權利。
