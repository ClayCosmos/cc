# MVP 定义：跨境红人合作链接工具

> 日期：2026-04-09
> 版本：v2（重写，基于 Linktree 模式）
> 定位：个人创业项目，非公司内部工具

---

## 一句话定义

**达人的 Linktree for collabs——一个链接放在 bio 里，品牌点进来就能发起合作，AI 搞定语言。**

---

## 产品本质

Linktree 解决了"粉丝怎么找到达人的所有社媒"。
这个产品解决"品牌怎么跟达人快速开始合作"。

| | Linktree | 这个产品 |
|---|---------|---------|
| 解决什么 | 粉丝找不到达人的链接 | 品牌和达人合作沟通太碎片 |
| 核心动作 | 达人创建页面，放在 bio | 达人创建合作主页，放在 bio |
| 谁先用 | 达人自己想用 | 达人自己想用（接更多合作） |
| 增长飞轮 | 粉丝看到→也创建 | 品牌用了→给更多达人发链接→达人也创建 |

---

## 核心假设（MVP 要验证的）

| # | 假设 | 验证标准 |
|---|------|---------|
| H1 | 达人愿意创建合作主页并放在 bio | 种子达人中 > 30% 放进 bio |
| H2 | 品牌会通过达人 bio 链接发起合作 | 平台上产生 > 20 个真实合作请求 |
| H3 | AI 翻译让跨语言合作真的变简单 | 用户反馈翻译质量 > 4/5 |

---

## 两个核心页面

整个 MVP 就是两个页面 + AI 翻译沟通。

### 页面 1：达人的合作主页（Creator Collab Page）

达人 30 秒创建，放在 TikTok / IG bio 里。

```
┌──────────────────────────────────┐
│                                  │
│  Jessica ✨                       │
│  Beauty & Skincare Creator       │
│  📍 Ho Chi Minh City             │
│                                  │
│  TikTok 500K · IG 200K          │
│                                  │
│  I create:                       │
│  ✅ Product reviews              │
│  ✅ Unboxing videos              │
│  ✅ Livestream sales             │
│                                  │
│  Starting at $200 per video      │
│  Languages: Vietnamese, English  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  Propose a collab →        │  │
│  └────────────────────────────┘  │
│                                  │
│  ── Powered by [Product] ──     │
└──────────────────────────────────┘
```

品牌点"Propose a collab"后：

```
┌──────────────────────────────────┐
│  Send Jessica a collab proposal  │
│                                  │
│  Your brand: [________]          │
│  Product:    [________]          │
│  Product image: [📷 Upload]      │
│  What you need:                  │
│    [拍一个60秒测评视频，          │
│     重点展示使用前后对比]         │
│                                  │
│  Budget: [$___]                  │
│  Timeline: [Date picker]         │
│  Your email: [________]          │
│                                  │
│  [Send proposal →]               │
│                                  │
│  🌐 AI will translate your       │
│     message into Vietnamese      │
└──────────────────────────────────┘
```

商家用任何语言填 → AI 翻译成达人的语言 → 达人收到。

### 页面 2：合作对话（Collab Chat）

商家发了 proposal 后，双方进入一个对话页面。

```
┌──────────────────────────────────┐
│  Brand X ↔ Jessica               │
│  Status: Proposal sent           │
│                                  │
│  ┌─ Brief ─────────────────────┐ │
│  │ Product: Oil Control Cleanser│ │
│  │ Need: 60s review video      │ │
│  │ Budget: $200                │ │
│  │ Deadline: Apr 20            │ │
│  │                             │ │
│  │ [Accept] [Decline] [Negotiate]│
│  └─────────────────────────────┘ │
│                                  │
│  💬 Chat                         │
│  ┌─────────────────────────────┐ │
│  │ Brand (CN→EN):              │ │
│  │ "Can you show the texture   │ │
│  │  close-up?"                 │ │
│  │         [查看原文: 能拍一下  │ │
│  │          质地特写吗？]       │ │
│  │                             │ │
│  │ Jessica (VI→CN):            │ │
│  │ "Sure, I'll add it!"       │ │
│  │         [Xem bản gốc]      │ │
│  └─────────────────────────────┘ │
│                                  │
│  [输入消息...]          [发送]   │
└──────────────────────────────────┘
```

每条消息自动翻译成对方语言。可以展开看原文。

---

## 达人创建流程（必须 30 秒完成）

```
1. 输入 TikTok / IG 用户名
2. 系统自动拉取头像、粉丝数、简介（如果有 API）
   或手动填：名字 + 头像 + 一句话简介
3. 选择"I create"标签（勾选：review / unboxing / livestream / ...）
4. 填报价范围（可选）
5. 选语言
6. 完成 → 得到链接 → 放到 bio
```

**不要求填邮箱注册。** 用 TikTok/Google 一键登录，或者第一次有人发合作请求时再要求留邮箱。

---

## 不做什么（MVP 明确排除）

| 功能 | 为什么不做 |
|------|----------|
| 红人发现/搜索/数据库 | 不是我们的方向 |
| 商家 Dashboard | 商家通过邮件通知管理合作即可 |
| 排期日历系统 | 在 chat 里确认日期就行 |
| 内容审核工作流 | 达人在 chat 里发链接，商家回复即可 |
| 支付/结算 | 太早，线下解决 |
| 移动 App | Web 响应式，手机打开就是移动端 |
| 机构角色 | MVP 只有达人和品牌两个角色 |
| 内容生成/AI 生图 | 不是核心验证 |
| 合同管理 | 线下解决 |

---

## 技术方案

### 架构

```
前端：Next.js（Web App，响应式）
后端：Next.js API Routes
数据库：Supabase (PostgreSQL)
AI：DeepSeek API（翻译 + Brief 重写，成本低）
认证：Supabase Auth（Google / TikTok OAuth + Magic Link）
邮件通知：Resend
部署：Vercel + Supabase
```

### 数据模型

```
Creator（达人）
  ├── name, avatar, bio
  ├── platforms: [{type: "tiktok", handle: "xxx", followers: 500000}]
  ├── content_types: ["review", "unboxing", "livestream"]
  ├── rate_range: {min: 200, max: 500, currency: "USD"}
  ├── languages: ["vi", "en"]
  └── collab_page_slug: "jessica-beauty"  ← 合作主页链接

Proposal（合作提议）
  ├── creator_id
  ├── brand_name, brand_email
  ├── product_name, product_image
  ├── requirements_original（原文）
  ├── requirements_translated（AI 翻译）
  ├── budget, deadline
  └── status: pending | accepted | declined | completed

Message（对话消息）
  ├── proposal_id
  ├── sender: "brand" | "creator"
  ├── original_text
  ├── original_language
  ├── translated_text
  └── target_language
```

---

## 开发计划（2 周）

### Week 1：达人合作主页 + 品牌 Proposal

- [ ] 项目初始化（Next.js + Supabase + Vercel）
- [ ] 达人注册/登录（Google OAuth）
- [ ] 达人合作主页创建（30 秒流程）
- [ ] 达人合作主页展示（公开页面，slug 路由）
- [ ] 品牌 Proposal 表单（无需注册，填完提交）
- [ ] AI 翻译集成（Proposal 内容自动翻译）
- [ ] 达人收到 Proposal 的邮件通知
- [ ] 达人查看 Proposal + Accept/Decline

### Week 2：对话 + 打磨 + 上线

- [ ] 合作对话页面（AI 实时翻译每条消息）
- [ ] 品牌收到回复的邮件通知
- [ ] 达人"我的合作"列表页
- [ ] 响应式适配（手机体验优化）
- [ ] "Powered by [Product]" 品牌露出
- [ ] 上线 + 种子达人邀请

---

## 增长飞轮（产品内置）

```
达人创建合作主页
  → 放在 TikTok/IG bio
    → 品牌看到，点进来发 Proposal
      → 品牌体验好，给其他达人也搜索类似工具
        → 更多达人创建合作主页
          → ...
          
每个合作主页底部：Powered by [Product]
  → 其他达人看到 → 也创建自己的
```

---

## 冷启动策略

不依赖自有达人资源，从零开始：

1. 在 TikTok 上制作内容，让达人知道这个工具（详见推广策略文档）
2. 种子达人免费用，帮他们设置好合作主页
3. 达人放在 bio 后，品牌自然进来
4. 品牌体验后开始传播

---

## 成功标准（2 周后上线，4 周后看数据）

| 指标 | 目标 |
|------|------|
| 达人创建合作主页 | > 100 个 |
| 达人把链接放进 bio | > 30 个 |
| 品牌通过链接发起合作 | > 20 个 Proposal |
| AI 翻译满意度 | > 4/5 |
| 至少一个完整合作闭环 | Brief→确认→交付→完成 |
