"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Data ───────────────────────────────────────────────────

const BRAND = "GlowSkin Cosmetics";

const MY_TASKS = [
  {
    id: "t1",
    title: "60s product review video",
    product: "Oil Control Cleanser",
    brief: "Record a 60-second review video. Show before/after comparison. Highlight oil control effect. Include close-up of texture.",
    briefOriginal: "拍一个60秒测评视频，展示使用前后对比，重点突出控油效果，需要质地特写。",
    deadline: "Apr 20",
    status: "in_progress",
    budget: "$300",
  },
  {
    id: "t3",
    title: "Livestream sales session",
    product: "Sunscreen SPF50",
    brief: "Host a 30-minute livestream selling the product. Show application, explain SPF benefits, share a discount code.",
    briefOriginal: "做一场30分钟直播带货，展示涂抹过程，讲解防晒指数，分享折扣码。",
    deadline: "Apr 25",
    status: "pending",
    budget: "$500",
  },
];

const MY_PRODUCTS = [
  {
    id: "p1",
    name: "Oil Control Cleanser",
    price: "$18.99",
    description: "Gentle daily cleanser with salicylic acid. Removes excess oil without drying. Suitable for oily and combination skin.",
    descriptionOriginal: "含水杨酸的温和日用洁面乳。去除多余油脂不干燥。适合油性和混合性肌肤。",
    talkingPoints: ["Dermatologist tested", "Fragrance-free formula", "Visible results in 2 weeks"],
    talkingPointsOriginal: ["皮肤科医生测试", "无香精配方", "2周可见效果"],
  },
  {
    id: "p3",
    name: "Sunscreen SPF50",
    price: "$22.99",
    description: "Lightweight sunscreen with PA++++. No white cast. Works under makeup.",
    descriptionOriginal: "轻薄防晒霜，PA++++。不泛白。可作为妆前使用。",
    talkingPoints: ["Reef-safe formula", "12-hour protection", "Water-resistant"],
    talkingPointsOriginal: ["珊瑚礁安全配方", "12小时防护", "防水"],
  },
];

const MY_SCHEDULE = [
  { date: "Apr 20", task: "60s review video", product: "Oil Control Cleanser", type: "Video", status: "in_progress" },
  { date: "Apr 25", task: "Livestream sales", product: "Sunscreen SPF50", type: "Live", status: "pending" },
];

const MESSAGES = [
  { sender: "brand" as const, text: "Jessica，产品已经寄出，预计明天到。", translated: "Jessica, the product has been shipped. Expected to arrive tomorrow.", time: "2h ago" },
  { sender: "creator" as const, text: "Great, I'll start shooting as soon as I receive it!", translated: "好的，收到后我就开始拍摄！", time: "1h ago" },
  { sender: "brand" as const, text: "拍摄的时候能加一个质地特写吗？之前那个效果很好。", translated: "Can you add a texture close-up while shooting? The one from last time was great.", time: "30m ago" },
];

// ─── Shared ─────────────────────────────────────────────────

type Tab = "tasks" | "products" | "schedule" | "chat";

function StatusDot({ status }: { status: string }) {
  const c: Record<string, string> = { active: "bg-success", pending: "bg-warning", completed: "bg-accent", in_progress: "bg-accent" };
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${c[status] ?? "bg-fg-tertiary"}`} />;
}

function Badge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-bg-tertiary text-fg-secondary",
    in_progress: "bg-accent-subtle text-accent",
    completed: "bg-green-50 text-success",
  };
  const labels: Record<string, string> = { pending: "Pending", in_progress: "In progress", completed: "Done" };
  return (
    <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${styles[status] ?? "bg-bg-tertiary text-fg-secondary"}`}>
      {labels[status] ?? status}
    </span>
  );
}

// ─── Tabs ───────────────────────────────────────────────────

function TasksTab() {
  const [expanded, setExpanded] = useState<string | null>("t1");

  return (
    <div>
      <h2 className="text-[13px] font-medium text-fg-secondary mb-4">{MY_TASKS.length} tasks</h2>
      <div className="rounded-lg border border-border overflow-hidden divide-y divide-border-light">
        {MY_TASKS.map((t) => (
          <div key={t.id}>
            <button
              onClick={() => setExpanded(expanded === t.id ? null : t.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-bg-hover transition-colors text-left"
            >
              <StatusDot status={t.status} />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-fg-primary">{t.title}</div>
                <div className="text-[11px] text-fg-tertiary mt-0.5">
                  {t.product} · {t.deadline} · {t.budget}
                </div>
              </div>
              <Badge status={t.status} />
            </button>
            {expanded === t.id && (
              <div className="px-4 pb-4 pt-1 border-t border-border-light bg-bg-secondary">
                <div className="text-[11px] font-medium text-fg-tertiary uppercase tracking-wider mb-2">Brief</div>
                <p className="text-[13px] text-fg-primary leading-relaxed">{t.brief}</p>
                <details className="mt-2">
                  <summary className="text-[11px] text-accent cursor-pointer hover:text-accent-hover">
                    Original (Chinese)
                  </summary>
                  <p className="mt-1 text-[13px] text-fg-tertiary">{t.briefOriginal}</p>
                </details>
                <div className="mt-4 flex gap-2">
                  {t.status === "pending" && (
                    <button className="rounded-md bg-accent px-3 py-1.5 text-[12px] font-medium text-white hover:bg-accent-hover transition-colors">
                      Start task
                    </button>
                  )}
                  {t.status === "in_progress" && (
                    <button className="rounded-md bg-success px-3 py-1.5 text-[12px] font-medium text-white hover:opacity-90 transition-opacity">
                      Mark complete
                    </button>
                  )}
                  <Link href="/collab/demo" className="rounded-md border border-border px-3 py-1.5 text-[12px] font-medium text-fg-secondary hover:bg-bg-hover transition-colors">
                    Message brand
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsTab() {
  return (
    <div>
      <h2 className="text-[13px] font-medium text-fg-secondary mb-4">{MY_PRODUCTS.length} assigned products</h2>
      <div className="space-y-3">
        {MY_PRODUCTS.map((p) => (
          <div key={p.id} className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="text-[14px] font-medium text-fg-primary">{p.name}</div>
              <div className="text-[13px] text-fg-secondary">{p.price}</div>
            </div>
            <p className="mt-2 text-[13px] text-fg-secondary leading-relaxed">{p.description}</p>
            <details className="mt-1">
              <summary className="text-[11px] text-accent cursor-pointer hover:text-accent-hover">
                Original (Chinese)
              </summary>
              <p className="mt-1 text-[13px] text-fg-tertiary">{p.descriptionOriginal}</p>
            </details>

            <div className="mt-3 pt-3 border-t border-border-light">
              <div className="text-[11px] font-medium text-fg-tertiary uppercase tracking-wider mb-2">Talking points</div>
              <ul className="space-y-1">
                {p.talkingPoints.map((tp, i) => (
                  <li key={i} className="text-[13px] text-fg-primary flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-success shrink-0" />
                    {tp}
                  </li>
                ))}
              </ul>
              <details className="mt-2">
                <summary className="text-[11px] text-accent cursor-pointer hover:text-accent-hover">
                  Original talking points
                </summary>
                <ul className="mt-1 space-y-1">
                  {p.talkingPointsOriginal.map((tp, i) => (
                    <li key={i} className="text-[13px] text-fg-tertiary">{tp}</li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleTab() {
  return (
    <div>
      <h2 className="text-[13px] font-medium text-fg-secondary mb-4">Upcoming</h2>
      <div className="rounded-lg border border-border overflow-hidden divide-y divide-border-light">
        {MY_SCHEDULE.map((s, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <div className="shrink-0 w-12 text-center">
              <div className="text-[15px] font-semibold text-fg-primary">{s.date.split(" ")[1]}</div>
              <div className="text-[11px] text-fg-tertiary">{s.date.split(" ")[0]}</div>
            </div>
            <div className="w-px h-8 bg-border-light" />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-fg-primary">{s.task}</div>
              <div className="text-[11px] text-fg-tertiary">{s.product}</div>
            </div>
            <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${s.type === "Live" ? "bg-purple-50 text-purple-700" : "bg-bg-tertiary text-fg-secondary"}`}>
              {s.type}
            </span>
            <Badge status={s.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatTab() {
  const [msg, setMsg] = useState("");

  return (
    <div>
      <h2 className="text-[13px] font-medium text-fg-secondary mb-4">{BRAND}</h2>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="bg-bg-secondary px-4 py-2 border-b border-border">
          <span className="text-[11px] text-fg-tertiary">Messages are auto-translated between Chinese and English</span>
        </div>
        <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
          {MESSAGES.map((m, i) => {
            const isMe = m.sender === "creator";
            return (
              <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[75%]">
                  <div className={`rounded-lg px-3 py-2 ${isMe ? "bg-accent text-white" : "bg-bg-tertiary text-fg-primary"}`}>
                    <p className="text-[13px] leading-relaxed">
                      {isMe ? m.text : m.translated}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-0.5">
                    <span className="text-[10px] text-fg-tertiary">{m.time}</span>
                    <details className="inline">
                      <summary className="text-[10px] text-accent cursor-pointer hover:text-accent-hover">
                        {isMe ? "Brand sees" : "Original"}
                      </summary>
                      <p className="text-[11px] text-fg-tertiary mt-0.5">
                        {isMe ? m.translated : m.text}
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-border px-4 py-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type in any language..."
              className="flex-1 rounded-md border border-border px-3 py-1.5 text-[13px] focus:outline-none focus:border-accent transition-colors"
            />
            <button className="rounded-md bg-accent px-3 py-1.5 text-[12px] font-medium text-white hover:bg-accent-hover transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────

const TABS: { key: Tab; label: string }[] = [
  { key: "tasks", label: "Tasks" },
  { key: "products", label: "Products" },
  { key: "schedule", label: "Schedule" },
  { key: "chat", label: "Chat" },
];

export default function CreatorDashboard() {
  const [tab, setTab] = useState<Tab>("tasks");

  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-[720px] px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13px]">
            <Link href="/" className="font-semibold text-fg-primary">TKCopilot</Link>
            <span className="text-fg-tertiary">/</span>
            <span className="text-fg-secondary">Jessica Nguyen</span>
          </div>
          <Link href="/brand" className="text-[12px] text-fg-tertiary hover:text-fg-secondary transition-colors">
            Switch to brand view
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[720px] px-6 py-6">
        {/* Context */}
        <div className="rounded-lg border border-border p-4 mb-6">
          <div className="text-[11px] font-medium text-fg-tertiary uppercase tracking-wider">Working with</div>
          <div className="text-[15px] font-semibold text-fg-primary mt-1">{BRAND}</div>
          <div className="mt-2 flex gap-4 text-[12px] text-fg-secondary">
            <span>{MY_TASKS.filter((t) => t.status !== "completed").length} open tasks</span>
            <span>{MY_PRODUCTS.length} products</span>
            <span>Next: {MY_SCHEDULE[0]?.date}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 border-b border-border mb-6">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-2 text-[13px] font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? "border-fg-primary text-fg-primary"
                  : "border-transparent text-fg-tertiary hover:text-fg-secondary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "tasks" && <TasksTab />}
        {tab === "products" && <ProductsTab />}
        {tab === "schedule" && <ScheduleTab />}
        {tab === "chat" && <ChatTab />}
      </div>
    </div>
  );
}
