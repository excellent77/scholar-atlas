export default {
  "name": "Zhe Zhang",
  "affiliation": "Purdue University · Industrial Engineering（依上傳論文作者資訊）",
  "provenance": "由 ChatGPT 依使用者提供的四篇 PDF 整理，並程式核對引文與 PDF 頁次；不是網站 API 執行紀錄。",
  "scope": "已完成四篇重點摘要與跨論文概要。依摘要、貢獻與假設段落整理；未逐項重現證明或實驗，不代表教授全部或最新研究。",
  "papers": [
    {
      "id": "nested",
      "title": "Optimal Algorithms for Convex Nested Stochastic Composite Optimization",
      "version": "2022-06-21 · arXiv v5",
      "pdf": "examples/zhe-zhang/2011.10076v5.pdf",
      "sha256": "d25b0ed5f77c2ed942110d364d276656857fc7eb6e8b1cebcad437fd3997802f",
      "pageCount": 32,
      "claims": [
        {
          "section": "problem",
          "kind": "evidence",
          "text": "巢狀隨機組合最佳化中，內層函數的取樣誤差會影響外層梯度估計；研究希望釐清巢狀結構是否必然增加 oracle 複雜度。",
          "citations": [
            {
              "paperId": "nested",
              "page": 2,
              "quote": "A key challenge in NSCO is the lack of unbiased gradient estimators for the nested function. This issue can be illustrated with a simple two-layer problem, minx∈X{f(x) := f1(f2(x))}. By the chain rule, the (sub)gradient "
            }
          ]
        },
        {
          "section": "method",
          "kind": "evidence",
          "text": "以對偶重構將巢狀問題轉成鞍點問題，提出 SSD；一般非光滑外層則引入輔助原始變數與 nSSD。",
          "citations": [
            {
              "paperId": "nested",
              "page": 3,
              "quote": "we take a reformulation approach. We obtain a saddle-point problem by replacing every layer function with the maximum over some linearizations indexed by (sub)gradients (e.g. see (1.3)), i.e., f′ 1 and f′ 2 play the role"
            }
          ]
        },
        {
          "section": "result",
          "kind": "evidence",
          "text": "外層光滑時，非強凸與強凸情況分別達 O(1/ε²) 與 O(1/ε)；外層非光滑時達 O(1/ε²)，且文中給出強凸情況仍無法普遍改善的下界。",
          "citations": [
            {
              "paperId": "nested",
              "page": 1,
              "quote": "We provide a lower complexity bound to show the latter O(1/ϵ2) complexity to be unimprovable even under a strongly convex setting. All these complexity results seem to be new in the literature and they indicate that the "
            }
          ]
        },
        {
          "section": "limitation",
          "kind": "evidence",
          "text": "需要逐層凸性及相應的單調性；這比僅假設整個組合函數為凸更強，不能直接套用到任意非凸神經網路。",
          "citations": [
            {
              "paperId": "nested",
              "page": 3,
              "quote": "Assumption 1 is stronger than their assumption of the nested function f being convex. However, we do not require the outer-layer function f1 to be smooth. Rather than the gradient approximation approach in [27,28,29], we"
            }
          ]
        }
      ]
    },
    {
      "id": "constraints",
      "title": "Solving Convex Smooth Function Constrained Optimization Is Almost As Easy As Unconstrained Optimization",
      "version": "2026-08-25 · arXiv v5",
      "pdf": "examples/zhe-zhang/2210.05807v5.pdf",
      "sha256": "b5d75da837749a19ddc802b0c43f26a278db0d006836d6e9efdd816c90a43f09",
      "pageCount": 40,
      "claims": [
        {
          "section": "problem",
          "kind": "evidence",
          "text": "研究光滑凸函數限制式是否會讓最佳化比無函數限制式更昂貴，並區分梯度等 oracle 呼叫次數與矩陣向量乘法成本。",
          "citations": [
            {
              "paperId": "constraints",
              "page": 2,
              "quote": "we consider two kinds of cost involved in solving (1.1): a) the oracle complexity, i.e., the total number of queries to the first- order oracle, and b) the computation complexity, i.e., the total number of matrix-vector "
            }
          ]
        },
        {
          "section": "method",
          "kind": "evidence",
          "text": "ACGD 把加速梯度下降的步驟換成帶線性化限制的下降步驟；ACGD-S 使用 sliding 技術，以內層原始—對偶更新減少昂貴子問題的求解負擔。",
          "citations": [
            {
              "paperId": "constraints",
              "page": 4,
              "quote": "we use the sliding technique [7,13] to extend the ACGD method to the ACGD with Sliding (ACGD-S) method. Given a linearization center xt, instead of solving (1.5) to optimality in each iteration, the ACGD-S method solves "
            }
          ]
        },
        {
          "section": "result",
          "kind": "evidence",
          "text": "ACGD 的 oracle 複雜度接近最佳拉格朗日函數的最佳化成本；ACGD-S 保留該 oracle 複雜度，同時達到文中對應的最佳計算複雜度。",
          "citations": [
            {
              "paperId": "constraints",
              "page": 4,
              "quote": "while maintaining the same oracle complexity as the ACGD method. Therefore the ACGD-S method provides an almost complete characterization of both the computation and the oracle complexity for solving a smooth function-co"
            }
          ]
        },
        {
          "section": "limitation",
          "kind": "evidence",
          "text": "參數自適應版本額外要求 X 有界；強凸版本仍需要強凸常數。自適應 ACGD-S 的計算複雜度也多出重啟造成的對數因子。",
          "citations": [
            {
              "paperId": "constraints",
              "page": 4,
              "quote": "incurs an additional multiplicative log factor in computational complexity due to restarts. The key innovation is a set of novel termination certificates that converge rapidly regardless of parameter misspecification, th"
            }
          ]
        }
      ]
    },
    {
      "id": "gradient",
      "title": "Optimal and parameter-free gradient minimization methods for convex and nonconvex optimization",
      "version": "2024-11-15 · arXiv v3",
      "pdf": "examples/zhe-zhang/2310.12139v3.pdf",
      "sha256": "eabcf23ee5355a9bf175c5fd183ec05f5d3c68763bcf588e5b879fa3f698f919",
      "pageCount": 28,
      "claims": [
        {
          "section": "problem",
          "kind": "evidence",
          "text": "目標是找到梯度或投影梯度範數足夠小的點，並減少事先知道光滑性、強凸性與曲率參數的需要。",
          "citations": [
            {
              "paperId": "gradient",
              "page": 1,
              "quote": "small (projected) gradient norm. Speciﬁcally, for computing an approximate solution such that the norm of its (projected) gradient does not exceed ε, we obtain the fol- lowing results: a) for the convex case, the total n"
            }
          ]
        },
        {
          "section": "method",
          "kind": "evidence",
          "text": "以累積正則化改造近端點方法；強凸情況透過重啟形成 SCAR，非凸加速方法再反覆呼叫 SCAR。",
          "citations": [
            {
              "paperId": "gradient",
              "page": 3,
              "quote": "we develop an accumulative regularization algo- rithm for gradient minimization, obtained by introducing regularization in an accumulative fashion into the classic proximal-point method. We show that this algorithm can c"
            }
          ]
        },
        {
          "section": "result",
          "kind": "evidence",
          "text": "文中對凸與強凸情況給出匹配已知下界的梯度複雜度；對非凸情況給出當時最佳已知界，並設計不需輸入問題參數的版本。",
          "citations": [
            {
              "paperId": "gradient",
              "page": 1,
              "quote": "Our complexity results match the lower complexity bounds of the convex and strongly cases, and achieve the above best-known complexity bound for the non- convex case for the ﬁrst time in the literature. Our results can a"
            }
          ]
        },
        {
          "section": "limitation",
          "kind": "inference",
          "text": "非凸結果針對近似駐點，不是全域最佳解保證。無須輸入參數也不代表不需要光滑性或曲率等理論條件。",
          "citations": [
            {
              "paperId": "gradient",
              "page": 3,
              "quote": "for nonconvex problems with L-smooth and l-lower curvature objective function, we develop a nonconvex acceleration method by calling the SCAR algorithm iteratively, and show that this method is able to compute an approxi"
            }
          ]
        }
      ]
    },
    {
      "id": "bilevel",
      "title": "First-Order Methods for Linearly Constrained Bilevel Optimization",
      "version": "2024 · NeurIPS 會議版本",
      "pdf": "examples/zhe-zhang/NeurIPS-2024-first-order-methods-for-linearly-constrained-bilevel-optimization-Paper-Conference.pdf",
      "sha256": "70afb6c5b69eaa4977c6632417e5b8833883aaebe09b99a3c6698a642b4d49df",
      "pageCount": 44,
      "claims": [
        {
          "section": "problem",
          "kind": "evidence",
          "text": "雙層最佳化常需 Hessian 計算，維度高時成本大；本文研究下層帶線性限制時，能否只用一階資訊取得超目標的駐點保證。",
          "citations": [
            {
              "paperId": "bilevel",
              "page": 1,
              "quote": "Algorithms for bilevel optimization often encounter Hessian computations, which are prohibitive in high dimensions. While recent works offer first-order methods for unconstrained bilevel problems, the constrained setting"
            }
          ]
        },
        {
          "section": "method",
          "kind": "evidence",
          "text": "等式限制下用擾動的下層問題近似超梯度，再做投影梯度下降；不等式限制下處理可能非光滑的超目標，採用非精確 oracle。",
          "citations": [
            {
              "paperId": "bilevel",
              "page": 2,
              "quote": "a first-order approximation to ∇F. Constructing our first-order approximation entails solving a strongly convex optimization problem on affine constraints, which can be done efficiently. With this inexact gradient oracle"
            }
          ]
        },
        {
          "section": "result",
          "kind": "evidence",
          "text": "線性等式限制下達到近乎最佳的 Õ(ε⁻²) 駐點 oracle 複雜度；線性不等式下給出 Goldstein 駐點保證，另在更強的對偶資訊假設下取得不依維度的界。",
          "citations": [
            {
              "paperId": "bilevel",
              "page": 1,
              "quote": "finite-time hypergradient stationarity guarantees. For linear equality constraints, we attain ϵ-stationarity in eO(ϵ−2) gradient oracle calls, which is nearly-optimal. For linear inequality constraints, we attain (δ, ϵ)-"
            }
          ]
        },
        {
          "section": "limitation",
          "kind": "evidence",
          "text": "下層目標需強凸，且有 LICQ 等條件；不依維度的結果還要求能精確取得最佳對偶變數，並非一般問題都能滿足。",
          "citations": [
            {
              "paperId": "bilevel",
              "page": 4,
              "quote": "we assume exact access to λ∗and that ∥λ∗(x)∥≤R. Assumptions 2.2(i) and 2.2(ii) are standard in bilevel optimization. Assumption 2.2(iii) is the same as the complete recourse assumption in stochastic programming [85], tha"
            }
          ]
        }
      ],
      "note": "此 PDF 作者列使用 Jimmy Zhang，頁首列出 Purdue 與 zhan5111@purdue.edu；保留檔案原貌，依使用者指定歸入此教授資料庫。"
    }
  ],
  "overview": [
    {
      "section": "研究主軸",
      "kind": "inference",
      "text": "四篇論文的共同問題是：當最佳化加入巢狀期望、函數限制或上下層決策時，如何以一階資訊維持可證明的計算效率。研究重點包含 oracle 複雜度、結構利用與參數依賴。",
      "citations": [
        {
          "paperId": "nested",
          "page": 3,
          "quote": "we take a reformulation approach. We obtain a saddle-point problem by replacing every layer function with the maximum over some linearizations indexed by (sub)gradients (e.g. see (1.3)), i.e., f′ 1 and f′ 2 play the role"
        },
        {
          "paperId": "constraints",
          "page": 4,
          "quote": "we use the sliding technique [7,13] to extend the ACGD method to the ACGD with Sliding (ACGD-S) method. Given a linearization center xt, instead of solving (1.5) to optimality in each iteration, the ACGD-S method solves "
        },
        {
          "paperId": "bilevel",
          "page": 1,
          "quote": "Algorithms for bilevel optimization often encounter Hessian computations, which are prohibitive in high dimensions. While recent works offer first-order methods for unconstrained bilevel problems, the constrained setting"
        }
      ]
    },
    {
      "section": "研究脈絡",
      "kind": "inference",
      "text": "本組資料從 2022 年版本的巢狀隨機問題，延伸到 2024 年版本的梯度最小化與受限雙層問題，以及 2026 年修訂版的自適應函數限制方法。這是選取檔案的版本順序，不代表各研究首次發表順序或單一路線。",
      "citations": [
        {
          "paperId": "nested",
          "page": 2,
          "quote": "A key challenge in NSCO is the lack of unbiased gradient estimators for the nested function. This issue can be illustrated with a simple two-layer problem, minx∈X{f(x) := f1(f2(x))}. By the chain rule, the (sub)gradient "
        },
        {
          "paperId": "gradient",
          "page": 3,
          "quote": "we develop an accumulative regularization algo- rithm for gradient minimization, obtained by introducing regularization in an accumulative fashion into the classic proximal-point method. We show that this algorithm can c"
        },
        {
          "paperId": "constraints",
          "page": 4,
          "quote": "incurs an additional multiplicative log factor in computational complexity due to restarts. The key innovation is a set of novel termination certificates that converge rapidly regardless of parameter misspecification, th"
        }
      ]
    },
    {
      "section": "共同方法",
      "kind": "inference",
      "text": "可比較的工具包括對偶與鞍點重構、加速與正則化，以及對非精確資訊的控制。但各篇假設與收斂指標不同，不能直接用一個複雜度數字排列優劣。",
      "citations": [
        {
          "paperId": "nested",
          "page": 3,
          "quote": "we take a reformulation approach. We obtain a saddle-point problem by replacing every layer function with the maximum over some linearizations indexed by (sub)gradients (e.g. see (1.3)), i.e., f′ 1 and f′ 2 play the role"
        },
        {
          "paperId": "gradient",
          "page": 3,
          "quote": "we develop an accumulative regularization algo- rithm for gradient minimization, obtained by introducing regularization in an accumulative fashion into the classic proximal-point method. We show that this algorithm can c"
        },
        {
          "paperId": "bilevel",
          "page": 2,
          "quote": "a first-order approximation to ∇F. Constructing our first-order approximation entails solving a strongly convex optimization problem on affine constraints, which can be done efficiently. With this inexact gradient oracle"
        }
      ]
    },
    {
      "section": "申請方向的切入點",
      "kind": "inference",
      "text": "若你的方向是運籌最佳化與機器學習，可從受限學習、巢狀期望或雙層參數選擇切入。先說明實際問題是否滿足凸性、光滑性與下層強凸條件，再討論能否移植方法；這是研究準備建議，不是招生或個人契合度判定。",
      "citations": [
        {
          "paperId": "nested",
          "page": 3,
          "quote": "Assumption 1 is stronger than their assumption of the nested function f being convex. However, we do not require the outer-layer function f1 to be smooth. Rather than the gradient approximation approach in [27,28,29], we"
        },
        {
          "paperId": "bilevel",
          "page": 4,
          "quote": "we assume exact access to λ∗and that ∥λ∗(x)∥≤R. Assumptions 2.2(i) and 2.2(ii) are standard in bilevel optimization. Assumption 2.2(iii) is the same as the complete recourse assumption in stochastic programming [85], tha"
        }
      ]
    },
    {
      "section": "值得聯絡時討論的問題",
      "kind": "inference",
      "text": "當實際應用只有帶噪梯度、未知曲率或不精確的下層解時，哪些 oracle 保證仍成立？能否保留約束可行性，同時減少參數估計與內層求解成本？",
      "citations": [
        {
          "paperId": "gradient",
          "page": 1,
          "quote": "small (projected) gradient norm. Speciﬁcally, for computing an approximate solution such that the norm of its (projected) gradient does not exceed ε, we obtain the fol- lowing results: a) for the convex case, the total n"
        },
        {
          "paperId": "constraints",
          "page": 4,
          "quote": "incurs an additional multiplicative log factor in computational complexity due to restarts. The key innovation is a set of novel termination certificates that converge rapidly regardless of parameter misspecification, th"
        },
        {
          "paperId": "bilevel",
          "page": 4,
          "quote": "we assume exact access to λ∗and that ∥λ∗(x)∥≤R. Assumptions 2.2(i) and 2.2(ii) are standard in bilevel optimization. Assumption 2.2(iii) is the same as the complete recourse assumption in stochastic programming [85], tha"
        }
      ]
    }
  ]
};
