import Link from "next/link";

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-[1080px] px-6 h-12 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-fg-primary tracking-tight">
          TKCopilot
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/brand" className="text-[13px] text-fg-secondary hover:text-fg-primary transition-colors">
            Brand Demo
          </Link>
          <Link href="/creator" className="text-[13px] text-fg-secondary hover:text-fg-primary transition-colors">
            Creator Demo
          </Link>
          <Link
            href="/brand"
            className="rounded-md bg-accent px-3 py-1.5 text-[13px] font-medium text-white hover:bg-accent-hover transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-[1080px] px-6 pt-24 pb-20">
      <div className="max-w-2xl">
        <p className="text-[13px] font-medium text-accent mb-4">
          Creator collaboration platform
        </p>
        <h1 className="text-[40px] font-semibold text-fg-primary leading-[1.15] tracking-[-0.02em]">
          Stop managing creators
          <br />
          across five different tools.
        </h1>
        <p className="mt-5 text-base text-fg-secondary leading-relaxed max-w-lg">
          Invite your creators to one workspace. Assign products, set schedules,
          track tasks, and communicate — with automatic translation across languages.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/brand"
            className="rounded-md bg-accent px-4 py-2 text-[13px] font-medium text-white hover:bg-accent-hover transition-colors"
          >
            Try the demo
          </Link>
          <Link
            href="#how"
            className="rounded-md border border-border px-4 py-2 text-[13px] font-medium text-fg-secondary hover:text-fg-primary hover:border-fg-tertiary transition-colors"
          >
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const steps = [
    { tool: "DM", issue: "Find a creator on TikTok, message them" },
    { tool: "Email", issue: "Send product brief, lost in spam" },
    { tool: "Sheets", issue: "Track schedule, nobody updates" },
    { tool: "WhatsApp", issue: "Follow up, context scattered" },
    { tool: "Translate", issue: "Copy-paste between languages" },
    { tool: "Repeat", issue: "Do this for every creator, every campaign" },
  ];

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1080px] px-6 py-20">
        <p className="text-[13px] font-medium text-fg-tertiary uppercase tracking-wider mb-3">
          The problem
        </p>
        <h2 className="text-2xl font-semibold text-fg-primary tracking-[-0.01em]">
          Cross-border creator management is broken.
        </h2>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
          {steps.map((s) => (
            <div key={s.tool} className="bg-bg-primary p-5">
              <div className="text-[13px] font-semibold text-fg-primary">{s.tool}</div>
              <div className="mt-1 text-[13px] text-fg-tertiary leading-relaxed">{s.issue}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const modules = [
    {
      title: "Creators",
      desc: "Invite via link. They join your workspace in seconds. See all your creators, their platforms, languages, and active tasks.",
    },
    {
      title: "Products",
      desc: "Upload your catalog with images, prices, and talking points. Assign products to creators. Everything auto-translated.",
    },
    {
      title: "Tasks",
      desc: "Create briefs, set deadlines, track status. Creators see exactly what to do. You see exactly where things stand.",
    },
    {
      title: "Schedule",
      desc: "Timeline view of all deliverables. Video shoots, livestreams, posting dates. One calendar, not twenty spreadsheets.",
    },
    {
      title: "Chat",
      desc: "Message any creator. Write in your language, they read in theirs. Per-task threads keep context together.",
    },
    {
      title: "Translation",
      desc: "Every brief, task, product description, and message — translated automatically. Chinese, Vietnamese, English, Portuguese, any pair.",
    },
  ];

  return (
    <section id="how" className="border-t border-border">
      <div className="mx-auto max-w-[1080px] px-6 py-20">
        <p className="text-[13px] font-medium text-fg-tertiary uppercase tracking-wider mb-3">
          The solution
        </p>
        <h2 className="text-2xl font-semibold text-fg-primary tracking-[-0.01em]">
          One workspace for everything.
        </h2>
        <p className="mt-3 text-[15px] text-fg-secondary max-w-lg">
          Send a link to your creator. They click it, join your workspace, and see
          their assigned products, tasks, and schedule. Start chatting in any language.
        </p>
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 rounded-lg overflow-hidden">
          {modules.map((m) => (
            <div key={m.title} className="bg-bg-primary p-6">
              <h3 className="text-[14px] font-semibold text-fg-primary">{m.title}</h3>
              <p className="mt-2 text-[13px] text-fg-secondary leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Flow() {
  const steps = [
    {
      num: "1",
      role: "Brand",
      title: "Create workspace, add products",
      desc: "Upload your product catalog and configure your workspace.",
    },
    {
      num: "2",
      role: "Brand",
      title: "Invite creators with a link",
      desc: "Share a link. Creator clicks, signs in, and they're in.",
    },
    {
      num: "3",
      role: "Brand",
      title: "Assign tasks and schedule",
      desc: "Create content briefs, set deadlines. Creator gets notified.",
    },
    {
      num: "4",
      role: "Both",
      title: "Collaborate across languages",
      desc: "Chat, share files, negotiate — all auto-translated.",
    },
  ];

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1080px] px-6 py-20">
        <p className="text-[13px] font-medium text-fg-tertiary uppercase tracking-wider mb-3">
          Workflow
        </p>
        <h2 className="text-2xl font-semibold text-fg-primary tracking-[-0.01em]">
          From invite to deliverable.
        </h2>
        <div className="mt-10 space-y-0 divide-y divide-border">
          {steps.map((s) => (
            <div key={s.num} className="flex items-start gap-6 py-5">
              <div className="shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center">
                <span className="text-[12px] font-semibold text-fg-tertiary">{s.num}</span>
              </div>
              <div>
                <div className="text-[11px] font-medium text-accent uppercase tracking-wider">{s.role}</div>
                <div className="text-[14px] font-medium text-fg-primary mt-0.5">{s.title}</div>
                <div className="text-[13px] text-fg-tertiary mt-0.5">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const before = [
    "Email for briefs",
    "Google Sheets for schedule",
    "WhatsApp for chat",
    "Google Translate for language",
    "DMs across 3 platforms",
    "3 weeks per campaign",
  ];
  const after = [
    "Briefs inside tasks",
    "Built-in schedule",
    "Per-task chat threads",
    "Auto-translated everything",
    "One workspace for all creators",
    "Days, not weeks",
  ];

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1080px] px-6 py-20">
        <div className="grid sm:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
          <div className="bg-bg-primary p-8">
            <div className="text-[11px] font-semibold text-fg-tertiary uppercase tracking-wider mb-5">Today</div>
            <ul className="space-y-3">
              {before.map((b) => (
                <li key={b} className="text-[13px] text-fg-secondary flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-fg-tertiary shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-bg-primary p-8">
            <div className="text-[11px] font-semibold text-accent uppercase tracking-wider mb-5">With TKCopilot</div>
            <ul className="space-y-3">
              {after.map((a) => (
                <li key={a} className="text-[13px] text-fg-primary font-medium flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1080px] px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold text-fg-primary tracking-[-0.01em]">
          Start managing your creators in one place.
        </h2>
        <p className="mt-3 text-[15px] text-fg-secondary">
          Free to start. Invite unlimited creators.
        </p>
        <Link
          href="/brand"
          className="mt-6 inline-block rounded-md bg-accent px-5 py-2.5 text-[13px] font-medium text-white hover:bg-accent-hover transition-colors"
        >
          Get started
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1080px] px-6 py-6 flex items-center justify-between text-[12px] text-fg-tertiary">
        <span>TKCopilot</span>
        <span>2026</span>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Flow />
      <Comparison />
      <CTA />
      <Footer />
    </main>
  );
}
