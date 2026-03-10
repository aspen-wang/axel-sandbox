'use client'

import { useState } from "react";

const PRODUCTS = [
  {
    id: "layla",
    name: "Layla",
    tagline: "AI Travel Agent",
    url: "layla.ai",
    color: "#00C9A7",
    accentBg: "rgba(0,201,167,0.08)",
    scores: { visual: 7.5, interaction: 6.5, information: 6, personalization: 7, booking: 8 },
    screens: [
      {
        title: "Chat 主界面",
        type: "chat",
        elements: [
          { label: "对话式入口", desc: "全屏 chat 界面，prompt 示例引导。视觉上以品牌蓝绿色为主色调。" },
          { label: "快捷 Chips", desc: "底部 Quick Action chips：New trip / Inspire me / Road trip / Last-minute。降低首次使用门槛。" },
          { label: "Loading 状态", desc: "生成行程时展示分步动画：\"Optimizing route\" → \"Scanning 2000+ airlines\" → \"Reading 1B+ reviews\"。建立信任感。" },
        ],
        mockup: "chat-first",
      },
      {
        title: "行程结果页",
        type: "itinerary",
        elements: [
          { label: "Day-by-day 卡片", desc: "每天独立卡片，含地点照片、时间线、预估花费。视觉密度中等。" },
          { label: "视频内容嵌入", desc: "在地点推荐中内嵌创作者短视频。Beautiful Destinations 网络资源。独特差异点。" },
          { label: "内联预订 CTA", desc: "每个酒店/机票卡片直接可预订。整合 Booking.com 和 Skyscanner。" },
        ],
        mockup: "itinerary-cards",
      },
    ],
    uxSummary: {
      strengths: [
        "Chat-first 交互直觉明确，上手零门槛",
        "创作者视频内容嵌入是独特情感锚点",
        "Loading 分步动画很好地管理了等待预期",
        "Instagram 入口实现了跨平台拉新闭环",
      ],
      weaknesses: [
        "行程结果页信息层级不够清晰，缺少地图视图",
        "复杂筛选能力弱（多条件交叉搜索体验差）",
        "对话历史管理粗糙，长会话容易丢失上下文",
        "付费墙出现时机生硬，容易打断 flow",
      ],
    },
  },
  {
    id: "airial",
    name: "Airial",
    tagline: "Precision Travel Planner",
    url: "airial.travel",
    color: "#6366F1",
    accentBg: "rgba(99,102,241,0.08)",
    scores: { visual: 8, interaction: 7.5, information: 9, personalization: 7, booking: 7 },
    screens: [
      {
        title: "行程生成结果",
        type: "itinerary",
        elements: [
          { label: "多城市时间线", desc: "竖向时间线串联城市节点，每段显示交通方式、时长和出发到达时间。信息密度极高。" },
          { label: "交通细节卡片", desc: "火车/飞机卡片显示具体班次号、出发站、时长。精度是核心差异点。" },
          { label: "内联酒店卡片", desc: "每个城市段落下直接嵌入酒店选择，含价格和标签（\"Great Deal\"、\"Central Location\"）。" },
        ],
        mockup: "timeline-vertical",
      },
      {
        title: "社交媒体导入",
        type: "import",
        elements: [
          { label: "TikTok/IG 粘贴", desc: "粘贴链接后 AI 自动提取地点、氛围、活动类型，生成结构化行程。" },
          { label: "偏好标签", desc: "Food Tour / History / Family Friendly / Hikes / Art 五大偏好维度。点选后行程实时重组。" },
          { label: "Ask Airial 入口", desc: "底部常驻输入框，可随时对话微调行程。不抢主视觉但始终可用。" },
        ],
        mockup: "social-import",
      },
    ],
    uxSummary: {
      strengths: [
        "交通信息精度远超竞品（具体班次、换乘时间）",
        "竖向时间线+城市节点的信息架构非常清晰",
        "社交媒体 → 行程的输入方式创新且实用",
        "偏好标签实时重组行程，个性化感强",
      ],
      weaknesses: [
        "注册墙（auth wall）挡在体验前面，阻碍转化",
        "移动端尚未就绪，Web-only",
        "缺乏地图视图和空间感知",
        "视觉设计偏工具化，情感层较薄",
      ],
    },
  },
  {
    id: "mindtrip",
    name: "Mindtrip",
    tagline: "Visual AI Travel Companion",
    url: "mindtrip.ai",
    color: "#F97316",
    accentBg: "rgba(249,115,22,0.08)",
    scores: { visual: 9.5, interaction: 9, information: 8, personalization: 8.5, booking: 7 },
    screens: [
      {
        title: "Chat + 地图双栏",
        type: "map-chat",
        elements: [
          { label: "左栏对话", desc: "AI 对话区带内联 Place Cards（缩略图+评分+地址）。不是纯文字，是富媒体对话。" },
          { label: "右栏交互地图", desc: "Google Maps 叠加自定义图层，点击 pin 展开详情卡片。地图和对话双向联动。" },
          { label: "Start Anywhere®", desc: "可粘贴 YouTube/TikTok/博客/截图，AI 自动识别地点并在地图上标注。最强的多源输入。" },
        ],
        mockup: "dual-panel",
      },
      {
        title: "Trip 管理页",
        type: "trip",
        elements: [
          { label: "行程卡片画廊", desc: "Pinterest 风格的行程组织，大图+标题+天数。视觉吸引力极强。" },
          { label: "群聊协作", desc: "Trip 内建群聊，@Mindtrip 即可触发 AI 回复。多人协作是杀手功能。" },
          { label: "收据管理", desc: "转发确认邮件到 receipts@mindtrip.ai 自动归档。覆盖 trip 全生命周期。" },
        ],
        mockup: "trip-gallery",
      },
    ],
    uxSummary: {
      strengths: [
        "地图+对话双栏是 AI travel 产品最成熟的交互范式",
        "Place Cards 内嵌对话流，信息获取无需跳转",
        "Start Anywhere® 多源输入（URL/截图/PDF）行业领先",
        "群聊+协作解决了 group travel 的真实痛点",
        "视觉设计品质最高，editorial 级别的排版和动效",
      ],
      weaknesses: [
        "复合条件搜索能力弱（多维筛选结果不准确）",
        "功能多导致认知负载较高，新用户需要学习成本",
        "预订环节跳转到第三方（Priceline/Viator），闭环感弱",
      ],
    },
  },
];

const DIMS = ["visual", "interaction", "information", "personalization", "booking"];
const DIM_LABELS = { visual: "视觉", interaction: "交互", information: "信息架构", personalization: "个性化", booking: "预订闭环" };

function RadarChart({ scores, color, size = 200 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.30;
  const angleStep = (2 * Math.PI) / DIMS.length;
  const points = DIMS.map((d, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const val = scores[d] / 10;
    return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) };
  });
  const gridLevels = [0.25, 0.5, 0.75, 1];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {gridLevels.map((lv) => (
        <polygon key={lv} points={DIMS.map((_, i) => {
          const a = -Math.PI / 2 + i * angleStep;
          return `${cx + r * lv * Math.cos(a)},${cy + r * lv * Math.sin(a)}`;
        }).join(" ")} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {DIMS.map((_, i) => {
        const a = -Math.PI / 2 + i * angleStep;
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
      })}
      <polygon points={points.map(p => `${p.x},${p.y}`).join(" ")} fill={color + "22"} stroke={color} strokeWidth="2" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />
      ))}
      {DIMS.map((d, i) => {
        const a = -Math.PI / 2 + i * angleStep;
        const lx = cx + (r + 22) * Math.cos(a);
        const ly = cy + (r + 22) * Math.sin(a);
        return (
          <text key={d} x={lx} y={ly} textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="inherit">
            {DIM_LABELS[d]}
          </text>
        );
      })}
    </svg>
  );
}

function ScreenMockup({ screen, color }) {
  const bgMap = {
    "chat-first": "linear-gradient(135deg, #0a1628 0%, #0f2035 100%)",
    "itinerary-cards": "linear-gradient(135deg, #0d1a0d 0%, #152415 100%)",
    "timeline-vertical": "linear-gradient(135deg, #12091e 0%, #1a1030 100%)",
    "social-import": "linear-gradient(135deg, #0e1225 0%, #161d38 100%)",
    "dual-panel": "linear-gradient(135deg, #1a0e00 0%, #261a08 100%)",
    "trip-gallery": "linear-gradient(135deg, #180e08 0%, #221510 100%)",
  };
  return (
    <div style={{ background: bgMap[screen.mockup] || "#111", borderRadius: 12, padding: 16, position: "relative", minHeight: 220, overflow: "hidden", border: `1px solid ${color}15` }}>
      <div style={{ position: "absolute", top: 8, left: 12, display: "flex", gap: 5 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
      </div>
      <div style={{ marginTop: 24 }}>
        {screen.elements.map((el, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 14, paddingLeft: 14, borderLeft: `2px solid ${color}60` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: "#000", background: color, borderRadius: 3, padding: "1px 6px" }}>{i + 1}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{el.label}</span>
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, margin: 0 }}>{el.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const USER_FLOWS = {
  layla: {
    steps: ["打开 App", "Chat 输入意图", "AI Loading 动画", "行程预览", "逐步精调", "内联预订"],
    friction: "Loading 等待期（10-30s），预订跳出到第三方",
    conversion: "High — chat 入口低门槛",
    color: "#00C9A7",
  },
  airial: {
    steps: ["注册/登录", "粘贴社媒链接 或 直接描述", "偏好标签选择", "AI 生成时间线", "交通/酒店细节确认", "跳转预订"],
    friction: "Auth wall 挡在体验之前",
    conversion: "Medium — 注册门槛过滤了大量用户",
    color: "#6366F1",
  },
  mindtrip: {
    steps: ["输入任意内容 (URL/截图/文字)", "Chat + 地图双栏展示", "Place Cards 浏览", "收藏到 Collections", "分享群聊协作", "通过 Priceline 预订"],
    friction: "功能密度高，新用户认知负载",
    conversion: "High for planning, Low for booking — 跳转第三方",
    color: "#F97316",
  },
};

const AXEL_FLOW = {
  steps: ["转发确认邮件 / 新建行程", "Axel 监控价格", "收到价格变化通知", "一键 Reprice", "自动完成"],
  color: "#EF508D",
};

function UserFlowDiagram({ flowData, productName }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: flowData.color, flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: flowData.color }}>{productName}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0, marginBottom: 12 }}>
        {flowData.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              background: flowData.color + "15",
              border: `1px solid ${flowData.color}40`,
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 11,
              color: "rgba(255,255,255,0.85)",
              whiteSpace: "nowrap",
              lineHeight: 1.4,
              maxWidth: 130,
              textAlign: "center",
            }}>
              {step}
            </div>
            {i < flowData.steps.length - 1 && (
              <div style={{ color: flowData.color + "80", fontSize: 14, margin: "0 4px", flexShrink: 0 }}>›</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ fontSize: 11, color: "#71717A" }}>
          <span style={{ color: "#F97316", marginRight: 4 }}>摩擦点:</span>
          {flowData.friction}
        </div>
        <div style={{ fontSize: 11, color: "#71717A" }}>
          <span style={{ color: "#22C55E", marginRight: 4 }}>转化:</span>
          {flowData.conversion}
        </div>
      </div>
    </div>
  );
}

export default function CompetitiveUX() {
  const [active, setActive] = useState("layla");
  const product = PRODUCTS.find(p => p.id === active);

  return (
    <div style={{ minHeight: "100vh", background: "#09090B", color: "#E4E4E7", fontFamily: "'PingFang SC', 'SF Pro Display', 'Helvetica Neue', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "32px 24px 0", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{ width: 3, height: 18, background: "#F97316", borderRadius: 2 }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F97316" }}>Competitive UX Audit</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, color: "#FAFAFA", margin: "8px 0 4px", lineHeight: 1.3 }}>
          AI Travel 竞品用户体验分析
        </h1>
        <p style={{ fontSize: 13, color: "#71717A", margin: 0 }}>
          Layla · Airial · Mindtrip — 界面交互、信息架构、视觉系统对比
        </p>
      </div>

      {/* Product Tabs */}
      <div style={{ maxWidth: 800, margin: "24px auto 0", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #27272A", paddingBottom: 0 }}>
          {PRODUCTS.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              style={{
                padding: "10px 20px",
                border: "none",
                borderBottom: active === p.id ? `2px solid ${p.color}` : "2px solid transparent",
                background: "none",
                color: active === p.id ? p.color : "#71717A",
                fontWeight: active === p.id ? 600 : 400,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s",
                marginBottom: -1,
              }}
            >
              {p.name}
            </button>
          ))}
          <button
            onClick={() => setActive("userflow")}
            style={{
              padding: "10px 20px",
              border: "none",
              borderBottom: active === "userflow" ? "2px solid #A78BFA" : "2px solid transparent",
              background: "none",
              color: active === "userflow" ? "#A78BFA" : "#71717A",
              fontWeight: active === "userflow" ? 600 : 400,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
              marginBottom: -1,
            }}
          >
            User Flow
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 24px 48px" }}>

        {/* User Flow tab */}
        {active === "userflow" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#FAFAFA", margin: "0 0 6px" }}>用户旅程对比</h2>
              <p style={{ fontSize: 12, color: "#52525B", margin: 0 }}>三款产品的核心用户流程、摩擦点与转化分析</p>
            </div>

            {PRODUCTS.map(p => (
              <UserFlowDiagram key={p.id} flowData={USER_FLOWS[p.id]} productName={p.name} />
            ))}

            {/* Divider */}
            <div style={{ height: 1, background: "#27272A", margin: "28px 0" }} />

            {/* Axel diff */}
            <div style={{ background: "linear-gradient(135deg, #1a0a1e 0%, #140a20 100%)", borderRadius: 12, padding: 20, border: "1px solid #EF508D33" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: "#EF508D", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#000" }}>A</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#EF508D" }}>Axel 的差异</span>
              </div>
              <p style={{ fontSize: 12, color: "#71717A", margin: "0 0 14px", lineHeight: 1.6 }}>
                竞品均从"搜索/规划"出发，Axel 切入点是<strong style={{ color: "#FAFAFA" }}>已有预订</strong>——监控并自动优化已确认的票价，无需用户主动规划。
              </p>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0 }}>
                {AXEL_FLOW.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{
                      background: "#EF508D18",
                      border: "1px solid #EF508D40",
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.85)",
                      whiteSpace: "nowrap",
                      lineHeight: 1.4,
                      maxWidth: 140,
                      textAlign: "center",
                    }}>
                      {step}
                    </div>
                    {i < AXEL_FLOW.steps.length - 1 && (
                      <div style={{ color: "#EF508D80", fontSize: 14, margin: "0 4px", flexShrink: 0 }}>›</div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, fontSize: 11, color: "#71717A", lineHeight: 1.6 }}>
                <span style={{ color: "#22C55E", marginRight: 4 }}>核心差异:</span>
                无需登录规划，无需主动搜索——Axel 在后台持续工作，用户只在"有更优价格"时才被打扰。
              </div>
            </div>
          </div>
        )}

        {/* Product tabs content */}
        {active !== "userflow" && (
          <>
        {/* Product Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
              <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FAFAFA", margin: 0 }}>{product.name}</h2>
              <span style={{ fontSize: 13, color: "#52525B" }}>{product.tagline}</span>
            </div>
            <span style={{ fontSize: 12, color: product.color }}>{product.url}</span>
          </div>
          <RadarChart scores={product.scores} color={product.color} size={180} />
        </div>

        {/* Screens */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 13, color: "#A1A1AA", marginBottom: 16, letterSpacing: "0.05em", fontWeight: 400 }}>
            关键界面拆解
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {product.screens.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>
                  <span style={{ color: product.color, marginRight: 6 }}>Screen {i + 1}</span>
                  {s.title}
                </div>
                <ScreenMockup screen={s} color={product.color} />
              </div>
            ))}
          </div>
        </div>

        {/* UX Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
          <div style={{ background: "#18181B", borderRadius: 12, padding: 18, border: "1px solid #27272A" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <span style={{ fontSize: 12, color: "#22C55E", fontWeight: 600 }}>UX 优势</span>
            </div>
            {product.uxSummary.strengths.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span style={{ color: "#22C55E", fontSize: 11, minWidth: 16 }}>{i + 1}.</span>
                <span style={{ fontSize: 12, color: "#D4D4D8", lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#18181B", borderRadius: 12, padding: 18, border: "1px solid #27272A" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <span style={{ fontSize: 12, color: "#F97316", fontWeight: 600 }}>UX 短板</span>
            </div>
            {product.uxSummary.weaknesses.map((w, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span style={{ color: "#F97316", fontSize: 11, minWidth: 16 }}>{i + 1}.</span>
                <span style={{ fontSize: 12, color: "#D4D4D8", lineHeight: 1.6 }}>{w}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Score Breakdown */}
        <div style={{ background: "#18181B", borderRadius: 12, padding: 18, border: "1px solid #27272A", marginBottom: 32 }}>
          <h3 style={{ fontSize: 12, color: "#A1A1AA", marginBottom: 14, fontWeight: 400 }}>UX 评分细项</h3>
          {DIMS.map(d => (
            <div key={d} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "#71717A", width: 65, textAlign: "right", flexShrink: 0 }}>{DIM_LABELS[d]}</span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#27272A", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${product.scores[d] * 10}%`, borderRadius: 3, background: product.color, transition: "width 0.4s ease" }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: product.color, width: 28, textAlign: "right" }}>{product.scores[d]}</span>
            </div>
          ))}
        </div>

        {/* Cross-product comparison */}
        <div style={{ background: "#18181B", borderRadius: 12, padding: 18, border: "1px solid #27272A", marginBottom: 32 }}>
          <h3 style={{ fontSize: 12, color: "#A1A1AA", marginBottom: 16, fontWeight: 400 }}>横向对比 · 三产品评分</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 10px", color: "#52525B", fontWeight: 400, borderBottom: "1px solid #27272A" }}>维度</th>
                {PRODUCTS.map(p => (
                  <th key={p.id} style={{ textAlign: "center", padding: "8px 10px", color: p.color, fontWeight: 600, borderBottom: "1px solid #27272A" }}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DIMS.map(d => {
                const maxVal = Math.max(...PRODUCTS.map(p => p.scores[d]));
                return (
                  <tr key={d}>
                    <td style={{ padding: "8px 10px", color: "#A1A1AA", borderBottom: "1px solid #1a1a1f" }}>{DIM_LABELS[d]}</td>
                    {PRODUCTS.map(p => (
                      <td key={p.id} style={{ textAlign: "center", padding: "8px 10px", borderBottom: "1px solid #1a1a1f", color: p.scores[d] === maxVal ? p.color : "#71717A", fontWeight: p.scores[d] === maxVal ? 600 : 400 }}>
                        {p.scores[d]}
                        {p.scores[d] === maxVal && <span style={{ fontSize: 9, marginLeft: 2 }}>★</span>}
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr>
                <td style={{ padding: "10px 10px", color: "#FAFAFA", fontWeight: 600 }}>总分</td>
                {PRODUCTS.map(p => {
                  const total = Object.values(p.scores).reduce((a, b) => a + b, 0);
                  const maxTotal = Math.max(...PRODUCTS.map(pp => Object.values(pp.scores).reduce((a, b) => a + b, 0)));
                  return (
                    <td key={p.id} style={{ textAlign: "center", padding: "10px 10px", color: total === maxTotal ? p.color : "#A1A1AA", fontWeight: 600, fontSize: 14 }}>
                      {total}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Axel Takeaways */}
        <div style={{ background: "linear-gradient(135deg, #1a0a1e 0%, #140a20 100%)", borderRadius: 12, padding: 20, border: "1px solid #EC489933" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "#EC4899", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#000" }}>A</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#EC4899" }}>对 Axel 的设计启示</span>
          </div>
          <div style={{ fontSize: 12, color: "#D4D4D8", lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 12px" }}>
              <strong style={{ color: "#EC4899" }}>Cards 设计（3/1）→ 参考 Mindtrip Place Cards：</strong>
              对话流中内嵌富媒体卡片（缩略图+核心数据+操作按钮），不强制跳转。Axel 的 booking 状态卡片应该同样做到"一眼可读、一键可操作"。
            </p>
            <p style={{ margin: "0 0 12px" }}>
              <strong style={{ color: "#EC4899" }}>Home Screen（3/2）→ 参考 Layla Quick Chips + Airial 偏好标签：</strong>
              首屏用 chip 组快速分流用户意图（查看已有预订 / 发现新优惠 / 管理账户），降低决策负担。
            </p>
            <p style={{ margin: "0 0 12px" }}>
              <strong style={{ color: "#EC4899" }}>Chat View（3/3）→ 参考 Mindtrip 双栏 + Layla Loading 动画：</strong>
              对话区展示 repricing 进度时，用 Layla 式分步动画构建信任。重要结果用 Mindtrip 式富卡片承载，而非纯文字。
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "#EC4899" }}>信任机制 → 参考 Airial 精度叙事：</strong>
              Axel 可以在 repricing 结果中展示具体数据点（"扫描了 347 个价格点，发现比当前低 $42 的选项"）来强化"AI 在认真工作"的感知。
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 28, fontSize: 11, color: "#3F3F46" }}>
          Axel Design Team · {new Date().toLocaleDateString("zh-CN")} · Competitive UX Audit
        </div>
          </>
        )}
      </div>
    </div>
  );
}
