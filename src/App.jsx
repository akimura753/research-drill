import { useState, useRef } from "react";

const TOPICS = [
  {
    id: 1,
    label: "プライオメトリクスとダッシュ加速度",
    title: "プライオメトリクストレーニングが大学生のダッシュ動作における加速度に及ぼす影響",
    hint: {
      hypothesis: "プライオメトリクストレーニングを継続的に実施することで、伸張-短縮サイクル（SSC）の効率が向上し、ダッシュ初期加速度（0〜10 m区間）が有意に増大する",
      subjects: "大学生男女（例：体育系学部生20名、無作為割付）",
      design: "ランダム化比較試験（RCT）、介入群・対照群の2群比較、8週間介入",
      data: "光電管タイミングシステム（10 m・20 m・30 m）、加速度計（腰部装着）",
      outcome: "0〜10 m加速度（主要）、10〜30 m速度、筋力（SJ・CMJ高）（副次）",
      stats: "対応のあるt検定または混合分散分析（介入×時点）、効果量η²",
      procedure: "①事前測定（ダッシュ・ジャンプ）→②8週間介入（週3回）→③事後測定→④データ解析",
      schedule: "4月：倫理申請、5月：募集・事前測定、6〜7月：介入、8月：事後測定・解析、9月：論文執筆",
      budget: "光電管レンタル費・加速度計校正費・消耗品費など計約¥50,000",
      prior: "Markovic (2007) J Strength Cond Res; Rumpf et al. (2016) J Sports Sci; Wilson et al. (1993) Med Sci Sports Exerc",
      prediction: "介入群は対照群に比べ0〜10 m加速度が有意に向上し（p<0.05）、CMJとの正の相関が認められると予測される"
    }
  },
  {
    id: 2,
    label: "高強度運動と血糖値",
    title: "プライオメトリクスを含む高強度運動が大学生の血糖値に及ぼす急性影響",
    hint: {
      hypothesis: "高強度インターバル運動（HIIT）実施後、グリコーゲン消費と交感神経賦活により一過性の血糖上昇が起こり、運動後30〜60分で有意な低下に転じる",
      subjects: "健常大学生（例：男女20名、糖尿病・内分泌疾患の既往なし）",
      design: "クロスオーバー試験（HIIT条件 vs. 安静条件）、ウォッシュアウト期間7日",
      data: "持続血糖測定器（CGM：FreeStyleリブレ）または静脈採血（運動前・直後・30分後・60分後）",
      outcome: "血糖値変化量（主要）、インスリン、乳酸値、RPE（副次）",
      stats: "二元配置反復測定分散分析（条件×時点）、Bonferroni事後検定、効果量η²",
      procedure: "①CGM装着・前日食事統一→②翌朝来室・安静血糖測定→③HIIT（または安静）→④60分間経過観察→⑤データ回収",
      schedule: "4月：倫理申請・機器調達、5月：募集・練習試行、6〜7月：測定実施、8月：解析、9月：論文執筆",
      budget: "CGMセンサー費・採血消耗品・乳酸測定器校正費など計約¥80,000",
      prior: "Marliss & Vranic (2002) Diabetes; Kjaer et al. (1986) J Appl Physiol; Richter & Hargreaves (2013) Physiol Rev",
      prediction: "HIIT条件では運動直後に血糖が安静時比+20 mg/dL程度上昇し、60分後には安静値を下回るU字型推移を示すと予測される"
    }
  },
  {
    id: 3,
    label: "暑熱下運動と体水分量",
    title: "暑熱環境下における高強度運動が大学生の体水分量に及ぼす影響",
    hint: {
      hypothesis: "暑熱環境（35℃以上）での高強度運動は中立環境に比べ発汗量が増大し、運動後の体水分量（TBW）が有意に減少する",
      subjects: "健常大学生男女（例：20名、心疾患・腎疾患の既往なし）",
      design: "クロスオーバー試験（暑熱条件 vs. 中立条件）、ウォッシュアウト7日、環境チャンバー使用",
      data: "多周波インピーダンス法（BIA：InBody）、体重・尿比重、心拍数・深部体温（テレメトリ）",
      outcome: "体水分量変化量（主要）、細胞内外液比、血漿浸透圧（副次）",
      stats: "対応のあるt検定または混合分散分析（条件×時点）、Pearson相関（発汗量とTBW変化）、効果量d",
      procedure: "①前日夕食・水分摂取統一→②翌朝BIA・体重測定→③環境チャンバー内運動（60分）→④即時・30分後・60分後BIA→⑤回収",
      schedule: "4月：倫理申請・チャンバー予約、5月：招集・練習試行、6〜8月：測定、9月：解析・論文執筆",
      budget: "BIA機器校正費・環境チャンバー使用料・検査消耗品・尿比重計など計約¥60,000",
      prior: "Cheuvront & Kenefick (2014) Am J Clin Nutr; Sawka et al. (2007) Med Sci Sports Exerc; Moran et al. (1998) Eur J Appl Physiol",
      prediction: "暑熱条件では中立条件に比べ体水分量が有意に多く減少し（p<0.05）、細胞外液量の低下と発汗量との正の相関が認められると予測される"
    }
  }
];

const SECTIONS = [
  {
    key: "title",
    label: "題目",
    icon: "📋",
    why: "研究の「顔」です。何を・誰を対象に・どのような変数を扱うかが一目でわかる必要があります。審査委員が最初に目にする部分であり、研究の方向性を決定づけます。介入・対象・アウトカムが明確に含まれていると理想的です（PICO形式の意識）。",
    placeholder: "例：プライオメトリクストレーニングが大学生のダッシュ加速度に及ぼす影響",
    rows: 2
  },
  {
    key: "hypothesis",
    label: "仮説",
    icon: "💡",
    why: "研究の「背骨」です。何を証明しようとしているのかを明示することで、研究デザインや統計手法の選択が一貫します。倫理審査でも「この研究は何を主張したいのか」を確認されます。方向性（増加する・低下する等）と想定メカニズムを含めると説得力が増します。",
    placeholder: "例：〜することにより、〜が有意に変化する（増加/低下）と仮説立てる",
    rows: 3
  },
  {
    key: "prior",
    label: "主な先行研究",
    icon: "📚",
    why: "「この研究は既存知識のギャップを埋める」ことを示す根拠です。倫理審査では研究の必要性・科学的妥当性が問われます。3〜5本の代表的文献（著者・年・雑誌）を示すことで、研究の学術的位置づけが明確になります。",
    placeholder: "例：Smith et al. (2020) J Sports Sci; 山田ら (2018) 体力科学",
    rows: 3
  },
  {
    key: "prediction",
    label: "研究結果の予測",
    icon: "🔮",
    why: "仮説と先行研究を踏まえた「論理的な予測」です。単なる期待ではなく、先行知識に基づいた科学的推論である必要があります。審査委員はここで研究者の文献理解度と論理的思考力を評価します。",
    placeholder: "例：介入群は対照群に比べ〇〇が有意に（p<0.05）向上し、〜との相関が示されると予測する",
    rows: 3
  },
  {
    key: "subjects",
    label: "研究対象・研究方法",
    icon: "👥",
    why: "「誰に・何をするか」の核心部分です。倫理審査では特に対象者の選定基準（包含・除外）、リスクの有無、インフォームドコンセントの手続きが厳しく確認されます。サンプルサイズの根拠（検出力分析）も記載できると理想的です。",
    placeholder: "例：健常大学生男女〇名（年齢〇〜〇歳）、除外基準：〇〇の既往歴",
    rows: 3
  },
  {
    key: "design",
    label: "研究デザイン",
    icon: "🗂️",
    why: "「どのような構造で比較・検証するか」を示します。RCT・クロスオーバー・観察研究など、デザインの選択は研究の証拠レベルを決定します。倫理審査では対照群の設定や盲検化の有無なども確認されます。",
    placeholder: "例：ランダム化比較試験（RCT）、介入群vs対照群、8週間介入",
    rows: 2
  },
  {
    key: "data",
    label: "データ取得方法",
    icon: "📊",
    why: "測定の「信頼性・妥当性」の担保が目的です。どの機器・手法でどのタイミングに測定するかを明示します。倫理審査では侵襲度（採血・運動負荷等）のリスク評価に直結するため、具体性が不可欠です。",
    placeholder: "例：光電管タイミングシステム（10m・20m）、加速度計（腰部装着）",
    rows: 2
  },
  {
    key: "outcome",
    label: "アウトカム",
    icon: "🎯",
    why: "「何を成果指標とするか」の宣言です。主要アウトカムは1〜2つに絞り、副次アウトカムと区別することが研究の焦点化に重要です。仮説の検証に直接対応している必要があります。",
    placeholder: "例：主要：〇〇変化量、副次：〇〇・〇〇",
    rows: 2
  },
  {
    key: "stats",
    label: "統計検定手法",
    icon: "📈",
    why: "データの特性と研究デザインに合った手法選択が求められます。倫理審査や論文査読では「なぜその検定を使うか」の妥当性が評価されます。効果量や検出力の記載で、研究の十分性を示せます。",
    placeholder: "例：対応のあるt検定、混合分散分析（介入×時点）、効果量η²・Cohen's d",
    rows: 2
  },
  {
    key: "procedure",
    label: "実験手順",
    icon: "🔬",
    why: "「再現可能性」の担保です。他の研究者が同じ手順で追試できるよう、時系列で具体的に記述します。倫理審査では安全管理手順（緊急時対応・中止基準）の記載が特に重視されます。",
    placeholder: "例：①事前測定→②介入期間（週〇回×〇週）→③事後測定→④解析",
    rows: 3
  },
  {
    key: "schedule",
    label: "スケジュール",
    icon: "📅",
    why: "「実現可能性」を示すガントチャート的な計画です。倫理申請→参加者募集→測定→解析→論文提出の流れが現実的かどうかを審査委員が評価します。学術大会発表や論文投稿の目標も含めると好印象です。",
    placeholder: "例：4月：倫理申請、5〜6月：募集・事前測定、7〜8月：介入・解析、9月：執筆",
    rows: 2
  },
  {
    key: "budget",
    label: "予算管理",
    icon: "💰",
    why: "研究実施の「経済的実現可能性」の証明です。物品費・消耗品費・謝礼金・学会参加費などを見積もり、財源（科研費・学内助成等）を明示します。倫理審査では利益相反（COI）の確認にも使われます。",
    placeholder: "例：消耗品¥〇〇、機器レンタル¥〇〇、謝礼¥〇〇、合計¥〇〇（財源：〇〇）",
    rows: 2
  }
];

const WHY_COLORS = [
  "#1a3a4a", "#1e3d35", "#3a2a1a", "#2a1a3a",
  "#1a2a3a", "#2d1a1a", "#1a2d2a", "#1a1a3a",
  "#3a3a1a", "#2a3a1a", "#1a2a2a", "#2d2a1a"
];

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [step, setStep] = useState(0); // 0 = topic select, 1-12 = sections, 13 = preview
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [showWhy, setShowWhy] = useState(true);
  const textareaRef = useRef(null);

  const totalSteps = SECTIONS.length;
  const currentSection = step > 0 && step <= totalSteps ? SECTIONS[step - 1] : null;
  const isPreview = step > totalSteps;

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setData({ title: topic.title });
    setStep(1);
    setAiSuggestion("");
  };

  const handleNext = () => {
    setAiSuggestion("");
    if (step <= totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    setAiSuggestion("");
    if (step > 1) setStep(step - 1);
    else { setStep(0); setSelectedTopic(null); setData({}); }
  };

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleAI = async () => {
    if (!currentSection) return;
    setLoading(true);
    setAiSuggestion("");
    try {
      const prompt = `あなたは理学療法学・スポーツ科学の卒業研究指導教員です。
研究テーマ：「${selectedTopic.title}」
セクション：「${currentSection.label}」
学生が入力した内容：「${data[currentSection.key] || "（未入力）"}」

このセクションについて、学術的に適切で倫理審査に耐えうる内容を、2〜3文で具体的に提案してください。専門用語を適切に使い、簡潔にまとめてください。提案のみ出力し、説明や前置きは不要です。`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const json = await response.json();
      const text = json.content?.map(b => b.text || "").join("") || "提案を取得できませんでした";
      setAiSuggestion(text);
    } catch (e) {
      setAiSuggestion("エラーが発生しました。再度お試しください。");
    }
    setLoading(false);
  };

  const applyHint = () => {
    if (!currentSection || !selectedTopic) return;
    const val = selectedTopic.hint[currentSection.key] || "";
    handleChange(currentSection.key, val);
  };

  const applyAI = () => {
    if (!currentSection || !aiSuggestion) return;
    handleChange(currentSection.key, aiSuggestion);
    setAiSuggestion("");
  };

  const progress = step === 0 ? 0 : Math.round((step / totalSteps) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f1b2d 0%, #1a2744 50%, #0f1b2d 100%)",
      fontFamily: "'Noto Serif JP', Georgia, serif",
      color: "#e8e0d0",
      padding: "0",
      margin: "0"
    }}>
      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(200,180,120,0.25)",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        gap: "16px"
      }}>
        <div style={{
          width: "40px", height: "40px",
          background: "linear-gradient(135deg, #c8a850, #e8c870)",
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "20px", flexShrink: 0
        }}>📝</div>
        <div>
          <div style={{ fontSize: "11px", color: "#c8a850", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif" }}>
            卒業研究ドリル
          </div>
          <div style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "1px" }}>
            研究計画書作成ガイド
          </div>
        </div>
        {step > 0 && !isPreview && (
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#aaa" }}>
              {step} / {totalSteps}
            </div>
            <div style={{ width: "120px", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #c8a850, #e8c870)", borderRadius: "3px", transition: "width 0.4s" }} />
            </div>
          </div>
        )}
        {isPreview && (
          <div style={{ marginLeft: "auto", background: "rgba(100,200,100,0.15)", border: "1px solid rgba(100,200,100,0.4)", borderRadius: "20px", padding: "4px 16px", fontSize: "12px", color: "#90e090", fontFamily: "sans-serif" }}>
            ✓ 完成プレビュー
          </div>
        )}
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px" }}>

        {/* STEP 0: Topic Select */}
        {step === 0 && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{ fontSize: "13px", color: "#c8a850", letterSpacing: "4px", fontFamily: "sans-serif", marginBottom: "12px" }}>STEP 1</div>
              <h1 style={{ fontSize: "26px", fontWeight: "700", margin: "0 0 12px", lineHeight: "1.4" }}>
                研究テーマを選択してください
              </h1>
              <p style={{ color: "#aaa", fontSize: "14px", fontFamily: "sans-serif", lineHeight: "1.8", maxWidth: "600px", margin: "0 auto" }}>
                選択後、各セクションを順番に入力していきます。<br/>
                各項目には「なぜ必要か」の解説とAIアシスタントが付いています。
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {TOPICS.map((topic, i) => (
                <button key={topic.id} onClick={() => handleTopicSelect(topic)} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(200,180,120,0.3)",
                  borderRadius: "12px",
                  padding: "24px 28px",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "#e8e0d0",
                  transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: "20px"
                }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(200,168,80,0.08)"; e.currentTarget.style.borderColor = "rgba(200,180,120,0.7)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(200,180,120,0.3)"; }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: `rgba(200,168,80,0.${i * 3 + 8})`,
                    border: "1px solid rgba(200,168,80,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px", flexShrink: 0
                  }}>
                    {["🏃", "🩸", "💧"][i]}
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#c8a850", letterSpacing: "2px", fontFamily: "sans-serif", marginBottom: "6px" }}>
                      テーマ {i + 1}
                    </div>
                    <div style={{ fontSize: "16px", fontWeight: "600", lineHeight: "1.5" }}>
                      {topic.title}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#c8a850", fontSize: "20px" }}>→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1-12: Section Input */}
        {currentSection && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            {/* Section Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(200,168,80,0.2), rgba(200,168,80,0.05))",
                border: "1px solid rgba(200,168,80,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px"
              }}>
                {currentSection.icon}
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "#c8a850", letterSpacing: "3px", fontFamily: "sans-serif" }}>
                  SECTION {step} / {totalSteps}
                </div>
                <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700" }}>
                  {currentSection.label}
                </h2>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <button onClick={() => setShowWhy(!showWhy)} style={{
                  background: showWhy ? "rgba(200,168,80,0.15)" : "transparent",
                  border: "1px solid rgba(200,168,80,0.3)",
                  borderRadius: "20px", padding: "6px 16px",
                  color: "#c8a850", cursor: "pointer", fontSize: "12px", fontFamily: "sans-serif"
                }}>
                  {showWhy ? "解説を隠す" : "解説を見る"} 💬
                </button>
              </div>
            </div>

            {/* Why Box */}
            {showWhy && (
              <div style={{
                background: "linear-gradient(135deg, rgba(200,168,80,0.06), rgba(200,168,80,0.02))",
                border: "1px solid rgba(200,168,80,0.25)",
                borderLeft: "4px solid #c8a850",
                borderRadius: "0 10px 10px 0",
                padding: "18px 22px"
              }}>
                <div style={{ fontSize: "11px", color: "#c8a850", letterSpacing: "2px", fontFamily: "sans-serif", marginBottom: "8px" }}>
                  ✦ なぜこの項目が必要か
                </div>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.9", color: "#d8d0c0", fontFamily: "sans-serif" }}>
                  {currentSection.why}
                </p>
              </div>
            )}

            {/* Input Area */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "20px"
            }}>
              <div style={{ fontSize: "12px", color: "#888", fontFamily: "sans-serif", marginBottom: "10px" }}>
                あなたの入力：
              </div>
              <textarea
                ref={textareaRef}
                value={data[currentSection.key] || ""}
                onChange={e => handleChange(currentSection.key, e.target.value)}
                placeholder={currentSection.placeholder}
                rows={currentSection.rows + 1}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "8px",
                  padding: "14px 16px",
                  color: "#e8e0d0",
                  fontSize: "14px",
                  fontFamily: "'Noto Serif JP', serif",
                  lineHeight: "1.8",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
                <button onClick={applyHint} style={{
                  background: "rgba(100,150,200,0.1)",
                  border: "1px solid rgba(100,150,200,0.35)",
                  borderRadius: "8px", padding: "8px 16px",
                  color: "#90b8e0", cursor: "pointer", fontSize: "12px", fontFamily: "sans-serif"
                }}>
                  💾 サンプル例を挿入
                </button>
                <button onClick={handleAI} disabled={loading} style={{
                  background: loading ? "rgba(150,100,200,0.05)" : "rgba(150,100,200,0.1)",
                  border: "1px solid rgba(150,100,200,0.35)",
                  borderRadius: "8px", padding: "8px 16px",
                  color: "#c090e0", cursor: loading ? "wait" : "pointer",
                  fontSize: "12px", fontFamily: "sans-serif"
                }}>
                  {loading ? "⏳ AI考え中..." : "✨ AIに提案を聞く"}
                </button>
              </div>
            </div>

            {/* AI Suggestion */}
            {aiSuggestion && (
              <div style={{
                background: "linear-gradient(135deg, rgba(150,100,200,0.08), rgba(150,100,200,0.02))",
                border: "1px solid rgba(150,100,200,0.3)",
                borderRadius: "12px",
                padding: "18px 22px"
              }}>
                <div style={{ fontSize: "11px", color: "#c090e0", letterSpacing: "2px", fontFamily: "sans-serif", marginBottom: "8px" }}>
                  ✨ AIの提案
                </div>
                <p style={{ margin: "0 0 14px", fontSize: "14px", lineHeight: "1.9", color: "#d0c8e0", fontFamily: "sans-serif" }}>
                  {aiSuggestion}
                </p>
                <button onClick={applyAI} style={{
                  background: "rgba(150,100,200,0.15)",
                  border: "1px solid rgba(150,100,200,0.4)",
                  borderRadius: "8px", padding: "8px 18px",
                  color: "#c090e0", cursor: "pointer", fontSize: "12px", fontFamily: "sans-serif"
                }}>
                  この提案を採用する →
                </button>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px" }}>
              <button onClick={handleBack} style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px", padding: "10px 22px",
                color: "#aaa", cursor: "pointer", fontSize: "14px", fontFamily: "sans-serif"
              }}>
                ← 戻る
              </button>
              <button onClick={handleNext} style={{
                background: "linear-gradient(135deg, #c8a850, #a88030)",
                border: "none",
                borderRadius: "8px", padding: "12px 28px",
                color: "#1a1000", cursor: "pointer", fontSize: "14px", fontWeight: "700", fontFamily: "sans-serif"
              }}>
                {step === totalSteps ? "完成プレビューへ →" : "次のセクションへ →"}
              </button>
            </div>
          </div>
        )}

        {/* PREVIEW */}
        {isPreview && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{ fontSize: "13px", color: "#90e090", letterSpacing: "3px", fontFamily: "sans-serif", marginBottom: "8px" }}>✓ COMPLETED</div>
              <h2 style={{ fontSize: "24px", margin: "0 0 8px" }}>研究計画書プレビュー</h2>
              <p style={{ color: "#aaa", fontSize: "13px", fontFamily: "sans-serif" }}>
                A4用紙1枚に収まる形式で出力されます。印刷またはPDFで保存してください。
              </p>
            </div>

            {/* A4 Preview */}
            <div style={{
              background: "#fff",
              color: "#1a1a1a",
              borderRadius: "4px",
              padding: "40px 44px",
              boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
              fontFamily: "'Noto Serif JP', '游明朝', serif",
              fontSize: "10.5px",
              lineHeight: "1.7",
              maxWidth: "720px",
              margin: "0 auto"
            }}>
              {/* Title Block */}
              <div style={{ textAlign: "center", marginBottom: "24px", borderBottom: "2.5px double #1a1a1a", paddingBottom: "16px" }}>
                <div style={{ fontSize: "8px", letterSpacing: "4px", color: "#555", marginBottom: "8px" }}>
                  令和　　年度　卒業研究計画書
                </div>
                <div style={{ fontSize: "15px", fontWeight: "700", lineHeight: "1.6", letterSpacing: "0.5px" }}>
                  {data.title || selectedTopic?.title}
                </div>
                <div style={{ marginTop: "10px", fontSize: "9px", color: "#555" }}>
                  所属：　　　　　　　学科　　　　　　年　　学籍番号：　　　　　　　　氏名：
                </div>
              </div>

              {/* Sections Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", border: "1px solid #aaa" }}>
                {[
                  { label: "仮説", key: "hypothesis", span: 2 },
                  { label: "主な先行研究", key: "prior", span: 1 },
                  { label: "研究結果の予測", key: "prediction", span: 1 },
                  { label: "研究対象・研究方法", key: "subjects", span: 1 },
                  { label: "研究デザイン", key: "design", span: 1 },
                  { label: "データ取得方法", key: "data", span: 1 },
                  { label: "アウトカム", key: "outcome", span: 1 },
                  { label: "統計検定手法", key: "stats", span: 1 },
                  { label: "実験手順", key: "procedure", span: 1 },
                  { label: "スケジュール", key: "schedule", span: 1 },
                  { label: "予算管理", key: "budget", span: 1 },
                ].map((s, i) => (
                  <div key={s.key} style={{
                    gridColumn: s.span === 2 ? "1 / -1" : "auto",
                    borderBottom: "1px solid #bbb",
                    borderRight: s.span !== 2 && i % 2 === 0 ? "1px solid #bbb" : "none",
                    padding: "8px 12px"
                  }}>
                    <div style={{ fontSize: "8px", fontWeight: "700", color: "#333", letterSpacing: "2px", marginBottom: "4px", fontFamily: "sans-serif" }}>
                      {s.label}
                    </div>
                    <div style={{ fontSize: "10px", lineHeight: "1.7", color: "#1a1a1a", minHeight: "28px", whiteSpace: "pre-wrap" }}>
                      {data[s.key] || "（未入力）"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ marginTop: "14px", fontSize: "8px", color: "#555", display: "flex", justifyContent: "space-between" }}>
                <span>指導教員確認：　　　　　　　　　　　　　印</span>
                <span>倫理審査申請予定日：令和　　年　　月　　日</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "28px" }}>
              <button onClick={() => setStep(1)} style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "8px", padding: "12px 24px",
                color: "#aaa", cursor: "pointer", fontSize: "14px", fontFamily: "sans-serif"
              }}>
                ← 最初のセクションから修正
              </button>
              <button onClick={() => window.print()} style={{
                background: "linear-gradient(135deg, #c8a850, #a88030)",
                border: "none", borderRadius: "8px", padding: "12px 28px",
                color: "#1a1000", cursor: "pointer", fontSize: "14px", fontWeight: "700", fontFamily: "sans-serif"
              }}>
                🖨️ 印刷 / PDFで保存
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
