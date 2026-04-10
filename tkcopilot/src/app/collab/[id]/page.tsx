"use client";

import { useState } from "react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "brand" | "creator";
  originalText: string;
  originalLang: string;
  translatedText: string;
  timestamp: string;
}

const CONTEXT = {
  brand: "GlowSkin Cosmetics",
  creator: "Jessica Nguyen",
  product: "Oil Control Cleanser",
  task: "60s product review video",
  deadline: "Apr 20",
  budget: "$300",
  status: "in_progress",
};

const MESSAGES: Message[] = [
  {
    id: "1",
    sender: "brand",
    originalText: "拍一个60秒测评视频，重点展示使用前后对比效果，需要展示产品质地",
    originalLang: "CN",
    translatedText: "Please create a 60-second review video focusing on before/after comparison. Please show the product texture as well.",
    timestamp: "Apr 9, 10:30",
  },
  {
    id: "2",
    sender: "creator",
    originalText: "Vang, toi se quay video review. Toi co the them canh quay can canh chat san pham duoc khong?",
    originalLang: "VI",
    translatedText: "好的，我会拍测评视频。我可以加一个产品质地的特写镜头吗？",
    timestamp: "Apr 9, 11:15",
  },
  {
    id: "3",
    sender: "brand",
    originalText: "当然可以！特写镜头非常好。另外能在视频开头展示一下包装吗？",
    originalLang: "CN",
    translatedText: "Of course! Close-up shots are great. Also, could you show the packaging at the beginning of the video?",
    timestamp: "Apr 9, 11:22",
  },
  {
    id: "4",
    sender: "creator",
    originalText: "Sure! I'll show the packaging first, then the texture close-up, and finally the before/after. I can have the draft ready by April 18.",
    originalLang: "EN",
    translatedText: "没问题！我会先展示包装，然后是质地特写，最后是使用前后对比。我可以在4月18号之前给你初稿。",
    timestamp: "Apr 9, 11:35",
  },
];

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

function Bubble({ message, isCreatorView }: { message: Message; isCreatorView: boolean }) {
  const isMine =
    (isCreatorView && message.sender === "creator") ||
    (!isCreatorView && message.sender === "brand");

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%]">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[11px] text-fg-tertiary">
            {message.sender === "brand" ? CONTEXT.brand : CONTEXT.creator}
          </span>
          <span className="text-[10px] text-fg-tertiary">
            {message.originalLang}
          </span>
        </div>
        <div className={`rounded-lg px-3 py-2 ${isMine ? "bg-accent text-white" : "bg-bg-tertiary text-fg-primary"}`}>
          <p className="text-[13px] leading-relaxed">{message.translatedText}</p>
        </div>
        <div className="flex items-center gap-2 mt-0.5 px-0.5">
          <span className="text-[10px] text-fg-tertiary">{message.timestamp}</span>
          <details className="inline">
            <summary className="text-[10px] text-accent cursor-pointer hover:text-accent-hover">
              Original
            </summary>
            <p className="text-[11px] text-fg-tertiary mt-0.5">{message.originalText}</p>
          </details>
        </div>
      </div>
    </div>
  );
}

export default function CollabChatPage() {
  const [msg, setMsg] = useState("");
  const isCreatorView = true;

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-[720px] px-6 h-12 flex items-center gap-3">
          <Link href="/brand" className="text-[12px] text-fg-tertiary hover:text-fg-secondary transition-colors">
            Back
          </Link>
          <div className="w-px h-4 bg-border" />
          <div className="flex-1 min-w-0 flex items-center gap-2 text-[13px]">
            <span className="font-medium text-fg-primary truncate">{CONTEXT.brand}</span>
            <span className="text-fg-tertiary">/</span>
            <span className="text-fg-secondary truncate">{CONTEXT.creator}</span>
          </div>
          <Badge status={CONTEXT.status} />
        </div>
      </header>

      {/* Task context */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[720px] px-6 py-3">
          <div className="rounded-lg border border-border p-3">
            <div className="text-[11px] font-medium text-fg-tertiary uppercase tracking-wider mb-1.5">Task</div>
            <div className="text-[13px] font-medium text-fg-primary">{CONTEXT.task}</div>
            <div className="mt-1.5 flex gap-4 text-[11px] text-fg-tertiary">
              <span>{CONTEXT.product}</span>
              <span>{CONTEXT.budget}</span>
              <span>Due {CONTEXT.deadline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[720px] px-6 py-4 space-y-3">
          <div className="text-center py-2">
            <span className="text-[11px] text-fg-tertiary">Messages are auto-translated</span>
          </div>
          {MESSAGES.map((m) => (
            <Bubble key={m.id} message={m} isCreatorView={isCreatorView} />
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-bg-primary border-t border-border">
        <div className="mx-auto max-w-[720px] px-6 py-3">
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
