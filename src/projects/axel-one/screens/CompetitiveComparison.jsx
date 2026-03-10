'use client'

import { useState } from "react";

/*
  竞品 UX vs Axel 规划对比
  字节跳动飞书风格 — 暗色、紧凑、数据驱动
*/

const PINK = "#EF508D";
const GREEN = "#4ADE80";
const BLUE = "#60A5FA";
const ORANGE = "#F97316";
const GRAY = "#71717A";
const LGRAY = "#A1A1AA";
const BG = "#09090B";
const CARD = "#141416";
const BORDER = "#1E1E22";

const sections = [
  {
    id: "home",
    title: "Home Screen",
    axelTask: "3/2 Home Screen",
    competitors: [
      {
        name: "Layla",
        color: "#00C9A7",
        approach: "Chat-first 单入口",
        details: "全屏对话框占据整个 Home。底部 Quick Chips（New trip / Inspire me / Road trip / Last-minute）做意图分流。没有 dashboard，没有状态概览。",
        pros: ["零认知负担，上手即用", "Quick Chips 有效降低首次输入门槛"],
        cons: ["用户无法一眼看到已有行程状态", "回访用户每次重回原点，无「上次在哪」感"],
      },
      {
        name: "Airial",
        color: "#6366F1",
        approach: "Chat + 偏好标签",
        details: "Home 也是 chat 入口，但上方有 5 个偏好标签（Food / History / Family / Hikes / Art）。选择后 AI 自动调整推荐方向。底部有 TikTok/IG 粘贴入口。",
        pros: ["偏好标签让个性化感知很强", "社交媒体入口是独特触发点"],
        cons: ["没有已有行程的管理视图", "标签只影响新行程，回访价值低"],
      },
      {
        name: "Mindtrip",
        color: ORANGE,
        approach: "Chat + 地图 + Inspiration 三入口",
        details: "顶部 Tab 切换 Chat / Trips / Collections / Inspiration。Chat 是主入口但不是唯一入口。Inspiration 页面展示热门行程画廊。有 Google Pins 导入。",
        pros: ["多入口覆盖不同用户心智", "Collections 和 Inspiration 增加回访理由", "Google Pins 导入降低冷启动门槛"],
        cons: ["功能密度高，新用户有学习成本", "首屏信息层级需要时间理解"],
      },
    ],
    axel: {
      approach: "Trip Cards 仪表板 + 状态驱动首屏",
      details: "Home 是 Trip Cards 列表。每张卡片显示：目的地、日期、航线标签、预订状态（Flights booked · Hotel needed / 4 flight options ready / Fully booked）。底部 \"+ New Trip\" CTA。空状态有 \"+ Start a Trip\" 大按钮。",
      planned: [
        "Deal Feed 模式：用户落地直接看到 Axel 发现的便宜机票（STG confirmed: deals first, not watch-and-wait）",
        "Demo Booking 引导：新用户首屏展示一张虚拟 Trip Card，引导体验完整 repricing 流程",
        "状态卡片区分：Monitoring（脉冲动画）/ Price Drop Found（绿色高亮）/ Fully Booked（完成态）",
      ],
      diff: "竞品 Home 全是「规划新行程」入口。Axel 的 Home 是「已有预订的实时状态」— 核心价值是监控和省钱，不是从零规划。这是根本性的产品定位差异。",
    },
  },
  {
    id: "cards",
    title: "Cards 信息卡片",
    axelTask: "3/1 Cards",
    competitors: [
      {
        name: "Layla",
        color: "#00C9A7",
        approach: "Day-by-day 行程卡片",
        details: "每天一张卡片，内含地点照片、活动列表、时间线。视觉密度中等。卡片内嵌创作者视频。酒店/机票卡片有直接预订 CTA。",
        pros: ["视频嵌入是情感锚点", "卡片内 CTA 减少跳转"],
        cons: ["信息层级扁平，重要信息不突出", "缺少价格变化等动态数据"],
      },
      {
        name: "Airial",
        color: "#6366F1",
        approach: "竖向时间线 + 交通/酒店/活动三类卡片",
        details: "时间线串联城市节点。交通卡片精确到班次号（SFO 21:05 → MUC 17:10, 11h 45m）。酒店卡片有标签（Great Deal / Central Location）。活动卡片含描述和图片。",
        pros: ["交通卡片精度极高，行业领先", "时间线+城市节点的信息架构清晰", "标签系统快速传达关键属性"],
        cons: ["纯列表，缺少空间感（无地图）", "视觉偏工具化，情感层薄"],
      },
      {
        name: "Mindtrip",
        color: ORANGE,
        approach: "对话内嵌 Place Cards + 独立 Trip Gallery",
        details: "Place Cards 内嵌在 AI 对话流中：缩略图 + 评分 + 地址 + 营业时间 + 操作按钮。点击展开详情。Trip Gallery 用 Pinterest 风格大图展示。",
        pros: ["对话内嵌卡片 = 零跳转信息获取", "一键收藏到 Trip Plan", "视觉品质最高（editorial 级排版）"],
        cons: ["卡片信息密度有时过高", "不同类型的卡片视觉差异不够"],
      },
    ],
    axel: {
      approach: "Booking Status Cards + Flight/Hotel Result Cards",
      details: "两类核心卡片：1) WatchCard（预订监控状态卡）— 显示航线/酒店、当前价格、Axel 监控状态（脉冲动画）、AI 文案（\"Current rates are high — I'm monitoring for the predicted price drop\"）。2) Result Cards — 航班卡片含航司、时间、航程、Nonstop 标签；酒店卡片含图片、星级、价格。",
      planned: [
        "WatchCard 增加 Axel Activity Feed：已扫描 86 个供应商、最近扫描时间、价格趋势迷你图",
        "Price Drop Card：绿色高亮，显示节省金额、新旧价格对比、一键 Reprice CTA",
        "Savings Potential Ring：70% 概率圈 + $30–$120 预估节省范围",
        "Deal Discovery 卡片：Chat 流中内嵌机票比价卡（Axel Price vs Google Flights）",
      ],
      diff: "竞品的卡片展示「推荐地点/行程」的静态信息。Axel 的卡片展示「价格监控的实时状态」— 包含动态数据（价格趋势、扫描进度、省钱概率）。这要求卡片设计具备状态变化和数据可视化能力，而不只是图文排列。",
    },
  },
  {
    id: "chat",
    title: "Chat View 对话界面",
    axelTask: "3/3 Chat View",
    competitors: [
      {
        name: "Layla",
        color: "#00C9A7",
        approach: "纯对话 + Loading 分步动画",
        details: "标准 chat UI。AI 回复以文字为主，穿插地点图片。Loading 时展示分步动画：\"Optimizing route → Scanning airlines → Reading reviews → Finding deals\"。有 Quick Reply pills。",
        pros: ["Loading 动画建立信任（让用户知道 AI 在做什么）", "Quick Reply pills 降低输入成本"],
        cons: ["对话内容以文字为主，富媒体不够", "长对话无法总结或回顾"],
      },
      {
        name: "Airial",
        color: "#6366F1",
        approach: "对话 + 结果面板分离",
        details: "左侧输入对话，右侧/下方展示生成的行程结果。对话用来微调（\"I am feeling lazy today\"），结果面板实时更新。底部常驻 \"Ask Airial\" 输入框。",
        pros: ["对话和结果分离，信息不混乱", "微调指令 → 全行程重组 = 强个性化感知"],
        cons: ["两个区域的关联性不够直觉", "错误处理不明确"],
      },
      {
        name: "Mindtrip",
        color: ORANGE,
        approach: "富媒体对话 + 地图双栏联动",
        details: "左栏 AI 对话，回复中内嵌 Place Cards（缩略图+评分+地址）。右栏交互地图，对话提到的地点实时在地图上标注。@Mindtrip 在群聊中触发 AI。",
        pros: ["对话+地图双向联动是最成熟的范式", "Place Cards 内嵌对话 = 零跳转", "群聊中 @AI 是社交场景创新"],
        cons: ["双栏在移动端需要折叠，体验有损", "地图对于非地理相关问题无意义"],
      },
    ],
    axel: {
      approach: "Chat-as-Axel-Character + 内嵌 Booking/Flight Cards",
      details: "Axel 不是通用 chatbot，是有个性的 AI 角色（粉色标识、专属文案风格）。Chat 中展示：用户消息（右对齐）、Axel 回复（左对齐 + AXEL 粉色标签）。回复中内嵌航班比价卡片、酒店结果卡片。底部 Quick Reply pills（\"Yes, need a hotel\" / \"Flights only\"）。Thinking 状态用粉色脉冲点动画。",
      planned: [
        "Deal Discovery Flow（STG confirmed）：Search → Deals List → Pick Flight → Add Travelers → Flight Details → Paywall",
        "Repricing 进度动画（参考 Layla）：\"正在扫描航班价格\" → \"对比 200+ 渠道\" → \"找到更低价格\"",
        "Demo Repricing 引导：新用户在 Chat 中体验一次虚拟 repricing，建立操作习惯和价值认知",
        "Chat 中内嵌 Price History Chart：90天价格走势+预测最佳价格区间+Axel 建议",
        "Hotel Map View：Chat 中 \"Show on map\" pill → 展开地图带 pins，类似 Mindtrip 但更聚焦",
      ],
      diff: "竞品的 Chat 是「帮用户做旅行规划」— 输入需求，输出行程。Axel 的 Chat 是「帮用户省钱」— 展示监控进度、价格变化、省钱机会。对话的核心不是探索，而是执行和信任建立。同时 Axel 有角色化设计（粉色标识、人格化文案），不是冷冰冰的 AI 工具。",
    },
  },
];

function CompCard({ comp }) {
  return (
    <div style={{ background: CARD, borderRadius: 10, padding: 14, border: `1px solid ${BORDER}`, flex: 1, minWidth: 200 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: comp.color }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: comp.color }}>{comp.name}</span>
        <span style={{ fontSize: 11, color: GRAY, marginLeft: "auto" }}>{comp.approach}</span>
      </div>
      <p style={{ fontSize: 11.5, color: LGRAY, lineHeight: 1.7, margin: "0 0 10px" }}>{comp.details}</p>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: GREEN, display: "block", marginBottom: 4 }}>+</span>
          {comp.pros.map((p, i) => (
            <p key={i} style={{ fontSize: 10.5, color: "#94A3B8", lineHeight: 1.5, margin: "0 0 3px" }}>{p}</p>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: ORANGE, display: "block", marginBottom: 4 }}>−</span>
          {comp.cons.map((c, i) => (
            <p key={i} style={{ fontSize: 10.5, color: "#94A3B8", lineHeight: 1.5, margin: "0 0 3px" }}>{c}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function AxelCard({ data }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #1a0a14 0%, #140a18 100%)", borderRadius: 12, padding: 16, border: `1px solid ${PINK}25`, marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: PINK, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#000" }}>A</div>
        <span style={{ fontSize: 13, fontWeight: 600, color: PINK }}>Axel 规划</span>
        <span style={{ fontSize: 11, color: GRAY, marginLeft: 8 }}>{data.approach}</span>
      </div>
      <p style={{ fontSize: 11.5, color: LGRAY, lineHeight: 1.7, margin: "0 0 12px" }}>{data.details}</p>

      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: PINK, letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>PLANNED IMPROVEMENTS</span>
        {data.planned.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <span style={{ color: PINK, fontSize: 10, fontWeight: 600, minWidth: 14, flexShrink: 0 }}>→</span>
            <span style={{ fontSize: 11, color: "#D4D4D8", lineHeight: 1.6 }}>{p}</span>
          </div>
        ))}
      </div>

      <div style={{ background: "#0a0a0c", borderRadius: 8, padding: 12, border: `1px solid ${PINK}15` }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: "#FBBF24", letterSpacing: "0.05em", display: "block", marginBottom: 4 }}>核心差异</span>
        <p style={{ fontSize: 11.5, color: "#E4E4E7", lineHeight: 1.7, margin: 0 }}>{data.diff}</p>
      </div>
    </div>
  );
}

export default function CompetitiveComparison() {
  const [activeSection, setActiveSection] = useState("home");
  const section = sections.find(s => s.id === activeSection);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#E4E4E7", fontFamily: "'PingFang SC', 'Noto Sans SC', 'SF Pro Display', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "28px 20px 0", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 3, height: 16, background: PINK, borderRadius: 2 }} />
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: PINK }}>Axel × Competitive UX</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#FAFAFA", margin: "6px 0 2px", lineHeight: 1.3 }}>
          竞品 UX 对比 Axel 规划
        </h1>
        <p style={{ fontSize: 12, color: GRAY, margin: 0 }}>
          逐界面拆解 Layla / Airial / Mindtrip 的设计决策，对照 Axel Convo UI Refine 三个子任务
        </p>
      </div>

      {/* Section Tabs */}
      <div style={{ maxWidth: 860, margin: "20px auto 0", padding: "0 20px" }}>
        <div style={{ display: "flex", gap: 0, background: "#141416", borderRadius: 10, padding: 3 }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                flex: 1,
                padding: "10px 12px",
                border: "none",
                borderRadius: 8,
                background: activeSection === s.id ? "#27272A" : "transparent",
                color: activeSection === s.id ? "#FAFAFA" : GRAY,
                fontWeight: activeSection === s.id ? 600 : 400,
                fontSize: 12.5,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              <div>{s.title}</div>
              <div style={{ fontSize: 10, color: activeSection === s.id ? PINK : "#3F3F46", marginTop: 2 }}>{s.axelTask}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 20px 48px" }}>
        {/* Section Header */}
        <div style={{ marginBottom: 16, display: "flex", alignItems: "baseline", gap: 10 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#FAFAFA", margin: 0 }}>{section.title}</h2>
          <span style={{ fontSize: 11, color: PINK, fontWeight: 400, background: `${PINK}15`, padding: "2px 8px", borderRadius: 4 }}>{section.axelTask}</span>
        </div>

        {/* Competitors Grid */}
        <div style={{ display: "flex", gap: 10, marginBottom: 0, flexWrap: "wrap" }}>
          {section.competitors.map((c, i) => (
            <CompCard key={i} comp={c} />
          ))}
        </div>

        {/* Axel */}
        <AxelCard data={section.axel} />

        {/* Quick Insight tags */}
        <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {section.competitors.map((c, i) => {
            const insights = {
              home: ["Chat-first 入口", "偏好标签分流", "多入口 + Collections"],
              cards: ["视频内嵌卡片", "精确交通信息", "对话内嵌 Place Card"],
              chat: ["Loading 分步动画", "对话/结果分离", "双栏地图联动"],
            };
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: `${c.color}10`, border: `1px solid ${c.color}20`, borderRadius: 6, padding: "6px 10px" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.color }} />
                <span style={{ fontSize: 10.5, color: c.color, fontWeight: 600 }}>{c.name}</span>
                <span style={{ fontSize: 10.5, color: LGRAY }}>{insights[section.id][i]}</span>
              </div>
            );
          })}
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: `${PINK}10`, border: `1px solid ${PINK}20`, borderRadius: 6, padding: "6px 10px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: PINK }} />
            <span style={{ fontSize: 10.5, color: PINK, fontWeight: 600 }}>Axel</span>
            <span style={{ fontSize: 10.5, color: LGRAY }}>
              {{ home: "状态仪表板 + Deal Feed", cards: "实时价格监控卡", chat: "角色化 AI + 省钱执行" }[section.id]}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ background: CARD, borderRadius: 12, padding: 18, border: `1px solid ${BORDER}` }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#FAFAFA", margin: "0 0 12px" }}>
            定位总结
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#0c0c0e", borderRadius: 8, padding: 12 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: BLUE, letterSpacing: "0.05em" }}>竞品共性</span>
              <p style={{ fontSize: 11.5, color: LGRAY, lineHeight: 1.7, margin: "6px 0 0" }}>
                三款产品本质上都是「AI Trip Planner」：用户说需求 → AI 生成行程 → 预订。核心竞争维度是行程生成的质量、视觉体验、和预订闭环。用户旅程是 Dream → Plan → Book。
              </p>
            </div>
            <div style={{ background: "#140a10", borderRadius: 8, padding: 12, border: `1px solid ${PINK}10` }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: PINK, letterSpacing: "0.05em" }}>Axel 差异</span>
              <p style={{ fontSize: 11.5, color: LGRAY, lineHeight: 1.7, margin: "6px 0 0" }}>
                Axel 是「AI Repricing Agent」：用户已有预订 → Axel 监控价格 → 找到更低价 → 自动重新预订。核心竞争维度是监控精度、信任建立、和省钱执行。用户旅程是 Import → Monitor → Save。
              </p>
            </div>
          </div>
          <div style={{ marginTop: 12, background: "#0c0c0e", borderRadius: 8, padding: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: "#FBBF24", letterSpacing: "0.05em" }}>设计启示</span>
            <p style={{ fontSize: 11.5, color: LGRAY, lineHeight: 1.7, margin: "6px 0 0" }}>
              虽然产品定位不同，但 UX 模式可以借鉴：Mindtrip 的富媒体卡片内嵌对话 → Axel 的 Booking Card 内嵌 Chat；Layla 的 Loading 分步动画 → Axel 的 Repricing 进度展示；Airial 的精度叙事 → Axel 的扫描数据透明化；Mindtrip 的群聊协作 → Axel 未来的 group trip 监控。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
