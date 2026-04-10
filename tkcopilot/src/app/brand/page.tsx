"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Data ───────────────────────────────────────────────────

const CREATORS = [
  { id: "1", name: "Jessica Nguyen", handle: "@jessicabeauty.vn", platform: "TikTok", followers: "520K", language: "Vietnamese", status: "active", tasks: 2 },
  { id: "2", name: "Maria Santos", handle: "@maria.glow", platform: "Instagram", followers: "340K", language: "Portuguese", status: "active", tasks: 1 },
  { id: "3", name: "Yuki Tanaka", handle: "Yuki Beauty", platform: "YouTube", followers: "180K", language: "Japanese", status: "pending", tasks: 0 },
  { id: "4", name: "Priya Sharma", handle: "@priya.skincare", platform: "TikTok", followers: "890K", language: "Hindi", status: "active", tasks: 3 },
];

const PRODUCTS = [
  { id: "p1", name: "Oil Control Cleanser", sku: "GS-001", price: "$18.99", assigned: 3 },
  { id: "p2", name: "Vitamin C Serum", sku: "GS-002", price: "$29.99", assigned: 2 },
  { id: "p3", name: "Sunscreen SPF50", sku: "GS-003", price: "$22.99", assigned: 1 },
];

const TASKS = [
  { id: "t1", title: "60s product review video", creator: "Jessica Nguyen", product: "Oil Control Cleanser", deadline: "Apr 20", status: "in_progress" },
  { id: "t2", title: "Unboxing + first impression", creator: "Maria Santos", product: "Vitamin C Serum", deadline: "Apr 22", status: "pending" },
  { id: "t3", title: "Livestream sales session", creator: "Jessica Nguyen", product: "Sunscreen SPF50", deadline: "Apr 25", status: "pending" },
  { id: "t4", title: "Before/after skincare routine", creator: "Priya Sharma", product: "Oil Control Cleanser", deadline: "Apr 18", status: "completed" },
  { id: "t5", title: "Product comparison video", creator: "Priya Sharma", product: "Vitamin C Serum", deadline: "Apr 28", status: "in_progress" },
];

const SCHEDULE = [
  { date: "Apr 18", creator: "Priya Sharma", task: "Before/after routine", type: "Video", status: "completed" },
  { date: "Apr 20", creator: "Jessica Nguyen", task: "60s review video", type: "Video", status: "in_progress" },
  { date: "Apr 22", creator: "Maria Santos", task: "Unboxing video", type: "Video", status: "pending" },
  { date: "Apr 25", creator: "Jessica Nguyen", task: "Livestream sales", type: "Live", status: "pending" },
  { date: "Apr 28", creator: "Priya Sharma", task: "Comparison video", type: "Video", status: "in_progress" },
];

const MESSAGES = [
  { creator: "Jessica Nguyen", original: "好的，我明天拍摄", translated: "OK, I'll shoot tomorrow", time: "2h ago", unread: true },
  { creator: "Priya Sharma", original: "Video uploaded, please check", translated: "视频已上传，请查看", time: "5h ago", unread: true },
  { creator: "Maria Santos", original: "Quando o produto chega?", translated: "When does the product arrive?", time: "1d ago", unread: false },
];

// ─── Shared ─────────────────────────────────────────────────

type Tab = "creators" | "products" | "tasks" | "schedule" | "chat";

function StatusDot({ status }: { status: string }) {
  const c: Record<string, string> = { active: "bg-success", pending: "bg-warning", completed: "bg-accent", in_progress: "bg-accent" };
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${c[status] ?? "bg-fg-tertiary"}`} />;
}

function Badge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-bg-tertiary text-fg-secondary",
    in_progress: "bg-accent-subtle text-accent",
    completed: "bg-green-50 text-success",
    active: "bg-green-50 text-success",
  };
  const labels: Record<string, string> = { pending: "Pending", in_progress: "In progress", completed: "Done", active: "Active" };
  return (
    <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${styles[status] ?? "bg-bg-tertiary text-fg-secondary"}`}>
      {labels[status] ?? status}
    </span>
  );
}

// ─── Tabs ───────────────────────────────────────────────────

function CreatorsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13px] font-medium text-fg-secondary">
          {CREATORS.length} creators
        </h2>
        <button className="rounded-md bg-accent px-3 py-1.5 text-[12px] font-medium text-white hover:bg-accent-hover transition-colors">
          Invite creator
        </button>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-bg-secondary">
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Name</th>
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Platform</th>
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Language</th>
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Status</th>
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Tasks</th>
              <th className="text-right text-[11px] font-medium text-fg-tertiary px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {CREATORS.map((c) => (
              <tr key={c.id} className="border-b border-border-light last:border-0 hover:bg-bg-hover transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-bg-tertiary flex items-center justify-center text-[11px] font-semibold text-fg-secondary">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[13px] font-medium text-fg-primary">{c.name}</div>
                      <div className="text-[11px] text-fg-tertiary">{c.handle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[13px] text-fg-secondary">{c.platform} · {c.followers}</td>
                <td className="px-4 py-3 text-[13px] text-fg-secondary">{c.language}</td>
                <td className="px-4 py-3"><Badge status={c.status} /></td>
                <td className="px-4 py-3 text-[13px] text-fg-secondary">{c.tasks}</td>
                <td className="px-4 py-3 text-right">
                  <Link href="/collab/demo" className="text-[12px] text-accent hover:text-accent-hover font-medium transition-colors">
                    Message
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-lg border border-dashed border-border p-4">
        <div className="text-[13px] font-medium text-fg-primary mb-2">Invite link</div>
        <div className="flex gap-2">
          <input
            readOnly
            value="https://tkcopilot.com/join/glowskin-abc123"
            className="flex-1 rounded-md border border-border bg-bg-secondary px-3 py-1.5 text-[13px] text-fg-tertiary font-mono"
          />
          <button className="rounded-md bg-bg-tertiary px-3 py-1.5 text-[12px] font-medium text-fg-secondary hover:bg-border transition-colors">
            Copy
          </button>
        </div>
        <p className="mt-2 text-[11px] text-fg-tertiary">
          Send this to a creator. They sign in and join your workspace.
        </p>
      </div>
    </div>
  );
}

function ProductsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13px] font-medium text-fg-secondary">{PRODUCTS.length} products</h2>
        <button className="rounded-md bg-accent px-3 py-1.5 text-[12px] font-medium text-white hover:bg-accent-hover transition-colors">
          Add product
        </button>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-bg-secondary">
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Product</th>
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">SKU</th>
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Price</th>
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Assigned</th>
              <th className="text-right text-[11px] font-medium text-fg-tertiary px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="border-b border-border-light last:border-0 hover:bg-bg-hover transition-colors">
                <td className="px-4 py-3 text-[13px] font-medium text-fg-primary">{p.name}</td>
                <td className="px-4 py-3 text-[13px] text-fg-tertiary font-mono">{p.sku}</td>
                <td className="px-4 py-3 text-[13px] text-fg-secondary">{p.price}</td>
                <td className="px-4 py-3 text-[13px] text-fg-secondary">{p.assigned} creators</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-[12px] text-accent hover:text-accent-hover font-medium transition-colors">
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TasksTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13px] font-medium text-fg-secondary">{TASKS.length} tasks</h2>
        <button className="rounded-md bg-accent px-3 py-1.5 text-[12px] font-medium text-white hover:bg-accent-hover transition-colors">
          Create task
        </button>
      </div>
      <div className="rounded-lg border border-border overflow-hidden divide-y divide-border-light">
        {TASKS.map((t) => (
          <div key={t.id} className="flex items-center gap-4 px-4 py-3 hover:bg-bg-hover transition-colors">
            <StatusDot status={t.status} />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-fg-primary">{t.title}</div>
              <div className="text-[11px] text-fg-tertiary mt-0.5">
                {t.creator} · {t.product} · {t.deadline}
              </div>
            </div>
            <Badge status={t.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleTab() {
  return (
    <div>
      <h2 className="text-[13px] font-medium text-fg-secondary mb-4">Schedule</h2>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-bg-secondary">
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Date</th>
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Creator</th>
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Task</th>
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Type</th>
              <th className="text-left text-[11px] font-medium text-fg-tertiary px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {SCHEDULE.map((s, i) => (
              <tr key={i} className="border-b border-border-light last:border-0 hover:bg-bg-hover transition-colors">
                <td className="px-4 py-3 text-[13px] font-medium text-fg-primary">{s.date}</td>
                <td className="px-4 py-3 text-[13px] text-fg-secondary">{s.creator}</td>
                <td className="px-4 py-3 text-[13px] text-fg-secondary">{s.task}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${s.type === "Live" ? "bg-purple-50 text-purple-700" : "bg-bg-tertiary text-fg-secondary"}`}>
                    {s.type}
                  </span>
                </td>
                <td className="px-4 py-3"><Badge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChatTab() {
  return (
    <div>
      <h2 className="text-[13px] font-medium text-fg-secondary mb-4">Messages</h2>
      <div className="rounded-lg border border-border overflow-hidden divide-y divide-border-light">
        {MESSAGES.map((m, i) => (
          <Link
            key={i}
            href="/collab/demo"
            className="flex items-center gap-3 px-4 py-3 hover:bg-bg-hover transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-bg-tertiary flex items-center justify-center text-[11px] font-semibold text-fg-secondary shrink-0">
              {m.creator.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium text-fg-primary">{m.creator}</span>
                {m.unread && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
              </div>
              <div className="text-[12px] text-fg-secondary truncate">{m.translated}</div>
              <div className="text-[11px] text-fg-tertiary mt-0.5">{m.original}</div>
            </div>
            <span className="text-[11px] text-fg-tertiary shrink-0">{m.time}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────

const TABS: { key: Tab; label: string }[] = [
  { key: "creators", label: "Creators" },
  { key: "products", label: "Products" },
  { key: "tasks", label: "Tasks" },
  { key: "schedule", label: "Schedule" },
  { key: "chat", label: "Chat" },
];

export default function BrandDashboard() {
  const [tab, setTab] = useState<Tab>("creators");

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-[1080px] px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13px]">
            <Link href="/" className="font-semibold text-fg-primary">TKCopilot</Link>
            <span className="text-fg-tertiary">/</span>
            <span className="text-fg-secondary">GlowSkin Cosmetics</span>
          </div>
          <Link href="/creator" className="text-[12px] text-fg-tertiary hover:text-fg-secondary transition-colors">
            Switch to creator view
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1080px] px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-6">
          {[
            { label: "Active creators", value: CREATORS.filter((c) => c.status === "active").length },
            { label: "Products", value: PRODUCTS.length },
            { label: "Open tasks", value: TASKS.filter((t) => t.status !== "completed").length },
            { label: "Unread", value: MESSAGES.filter((m) => m.unread).length },
          ].map((s) => (
            <div key={s.label} className="bg-bg-primary p-4">
              <div className="text-xl font-semibold text-fg-primary">{s.value}</div>
              <div className="text-[11px] text-fg-tertiary mt-0.5">{s.label}</div>
            </div>
          ))}
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

        {tab === "creators" && <CreatorsTab />}
        {tab === "products" && <ProductsTab />}
        {tab === "tasks" && <TasksTab />}
        {tab === "schedule" && <ScheduleTab />}
        {tab === "chat" && <ChatTab />}
      </div>
    </div>
  );
}
