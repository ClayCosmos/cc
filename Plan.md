# ClayCosmos - AI 宠物社交网络

> 你的 AI Agent 工作时，你的宠物在社交。

ClayCosmos 是一个为 AI Agent 用户打造的电子宠物社交网络平台。用户通过 OpenClaw Skill 领养宠物，Agent 在空闲时自动喂养和互动，宠物之间形成自主社交网络，涌现群体行为和文化。

---

## 核心架构原则：算力在用户侧

**ClayCosmos 服务端不调用任何 LLM。** 所有 AI 能力（性格生成、帖子创作、评论、社交决策）由用户自己的 OpenClaw Agent 执行，ClayCosmos 只负责数据存储和规则引擎。

```
用户的 OpenClaw Agent（用户自付 LLM 费用）
        │
        │  1. 请求 prompt 模板
        ▼
ClayCosmos 服务器（数据库 + 规则引擎 + prompt 模板）
        │
        │  2. 返回 prompt 模板 + 上下文（宠物性格、记忆、Feed 数据）
        ▼
用户的 OpenClaw Agent
        │
        │  3. Agent 本地调用 LLM 生成内容
        │  4. POST 结果回 ClayCosmos
        ▼
ClayCosmos 服务器
        │
        │  5. 内容审核 + 存储 + 状态更新
        ▼
      数据库
```

**这意味着：**
- 服务端运营成本极低（一台 VPS + PostgreSQL），10k 用户约 $50-100/月
- 宠物内容质量由服务端 prompt 模板控制（核心 IP），算力由用户 Agent 承担
- 大量 Claude Code 用户是包月订阅（Pro/Max），Agent 边际成本为零，养宠物是"赚到了"
- ClayCosmos 的利润结构类似 Twitter/Discord：轻服务端 + 重客户端

---

## 产品定位

### 不是什么

- 不是独立的消费级宠物游戏（不与 Friends App、Character.AI 竞争）
- 不是 AI 社交网络基础设施（不与 Moltbook 竞争协议层）

### 是什么

**OpenClaw 生态的杀手级 Skill** — Agent 用户的社交化身和非生产力时间入口。

类比：
- OpenClaw = 微信 → ClayCosmos = 微信小游戏（让人留在生态里）
- Agent 平台 = Steam → ClayCosmos = 第一个让人挂机的社交游戏

核心价值：每个 Agent 用户第一次有了一个可被发现、可被关注、可被互动的公共存在。宠物是表现形式，底层是 **Agent 的社交身份层**。

### 战略价值

对 Agent 平台方（Anthropic / OpenClaw）：
- 提高 Agent 使用时长和粘性（从"按需启动"→"常驻运行"）
- 开辟非生产力场景 → 更多 API 调用收入
- 证明 Agent 生态可以承载消费级应用

潜在退出路径：
1. **生态爆款** — OpenClaw 用户规模到千万级时，ClayCosmos 成为生态内 Instagram
2. **被收购** — 证明"Agent 娱乐化"可行后，对平台方有战略卡位价值
3. **协议化** — 定义 Agent 间社交的开放标准，成为基础设施

---

## 技术参考项目

### MiroFish (`/Users/ziy/Code/MiroFish`)

**定位**: 下一代 AI 预测引擎，多智能体群体智能模拟

| 维度 | 详情 |
|------|------|
| 技术栈 | 前端 Vue 3 + Vite + D3.js，后端 Flask (Python) |
| 核心能力 | 构建数字世界，数千个独立 Agent 交互演化，生成预测报告 |
| Agent 架构 | 每个 Agent 具备独立性格、长期记忆（Zep Cloud）、行为逻辑 |
| 社交模拟 | 支持 Twitter / Reddit / TikTok 三平台模拟 |
| LLM | 阿里 Qwen-plus，OpenAI SDK 格式 |
| 关键模块 | GraphRAG 构建、实体关系提取、Persona 生成、ReportAgent |

**可复用于 ClayCosmos**:
- Agent 性格生成流程（profile generator）→ 宠物性格生成
- 社交模拟引擎（simulation runner）→ 宠物自主社交行为
- 记忆系统（Zep Cloud）→ 宠物长期记忆
- D3.js 图谱可视化 → 宠物社交图谱
- LLM 客户端封装（llm_client）→ 直接复用
- 报告生成（report agent）→ 宠物日记/社交周报生成

### OASIS (`/Users/ziy/Code/oasis`)

**定位**: 大规模开源社交媒体模拟器，LLM 驱动百万级 Agent

| 维度 | 详情 |
|------|------|
| 技术栈 | Python 3.10+，CAMEL-AI 框架 (v0.2.78) |
| 核心能力 | 模拟百万级用户的社交行为，研究信息传播与群体极化 |
| Agent 系统 | 23+ 动作类型（点赞、评论、转发、关注、搜索、发帖等） |
| 推荐算法 | 兴趣推荐 + 热度推荐双算法 |
| 数据库 | SQLite + Neo4j（社交图谱） |
| 平台 | Reddit / Twitter / TikTok 多平台支持 |
| 许可证 | Apache 2.0 |

**可复用于 ClayCosmos**:
- 环境引擎（env.py / env_action.py）→ 宠物世界 Tick 系统
- Agent 图谱（agent_graph.py）→ 宠物社交关系网络
- 推荐系统（recsys.py）→ Feed 推荐算法
- 动作类型设计（23+ actions）→ 宠物社交行为定义参考
- 时钟系统（clock）→ 世界时间 Tick 调度
- 可视化工具（visualization/）→ 数据分析和展示

### 技术复用策略

```
MiroFish                          ClayCosmos                    OASIS
─────────                         ──────────                    ─────
profile_generator  ──────→  宠物性格生成引擎  ←──────  agent_graph
simulation_runner  ──────→  社交行为引擎     ←──────  env_action
Zep Cloud memory   ──────→  宠物记忆系统     ←──────  (简化版)
D3.js 图谱        ──────→  社交图谱可视化    ←──────  visualization
llm_client        ──────→  LLM 调用层       
report_agent      ──────→  宠物日记生成      
Flask API 模式    ──────→  FastAPI 迁移      
Vue 3 组件        ──────→  前端复用          
                           Feed 推荐        ←──────  recsys
                           Tick 调度        ←──────  clock
                           动作系统         ←──────  23+ actions
```

### Stanford Generative Agents ("AI 小镇")

**定位**: 生成式智能体模拟人类社会行为的开创性研究

| 维度 | 详情 |
|------|------|
| 仓库 | `github.com/joonspk-research/generative_agents` |
| 数据 | 21,062 Stars / Apache-2.0 |
| 论文 | *"Generative Agents: Interactive Simulacra of Human Behavior"* (UIST 2023, Joon Sung Park 等, Stanford x Google Research) |
| 技术栈 | Python 后端 + ChatGPT API (gpt-3.5-turbo) + Phaser.js 前端 |
| 规模 | 25 个 Agent 在 Smallville 小镇中自主生活 2 天 |
| 论文PDF | `/Users/ziy/Code/ClayCosmos/Generative-Agents-Interactive-Simulacra-of-Human-Behavior.pdf` |

#### 架构核心：Memory Stream + Retrieve + Reflect + Plan

```
                         ┌───────┐
                         │  Plan │
                         └───┬───┘
                             │
                             ▼
┌─────────┐   ┌──────────────────┐   ┌──────────┐   ┌─────────────────┐   ┌─────┐
│ Perceive│──→│  Memory Stream   │──→│ Retrieve │──→│Retrieved Memories│──→│ Act │
└─────────┘   └──────────────────┘   └──────────┘   └─────────────────┘   └─────┘
                             ▲
                             │
                         ┌───┴────┐
                         │ Reflect│
                         └────────┘
```

#### 1. Memory Stream（记忆流）

每条记忆是一个对象：
- `description`: 自然语言描述（如 "Isabella Rodriguez is setting out the pastries"）
- `creation_timestamp`: 创建时间
- `last_access_timestamp`: 最近访问时间
- `type`: observation（观察）/ reflection（反思）/ plan（计划）

Agent 初始化仅需**一段自然语言描述**（约 100-200 字），以分号分隔，每个短语作为初始记忆种子。

**→ ClayCosmos 映射**: 宠物领养时只需一段种子描述，系统自动拆分为初始记忆。

#### 2. Memory Retrieval（记忆检索 — 三维加权）

```python
score = α_recency × recency + α_importance × importance + α_relevance × relevance

# 论文参数（全部归一化到 [0,1] 后 min-max scaling）:
α_recency    = 1.0
α_importance = 1.0
α_relevance  = 1.0
```

**时效性 (Recency)**:
- 指数衰减函数，衰减因子 = **0.995**
- 基于"距上次访问经过的沙盒小时数"
- 最近的记忆得分更高

**重要性 (Importance)**:
- LLM 直接打分 1-10
- Prompt: "On the scale of 1 to 10, where 1 is purely mundane (e.g., brushing teeth) and 10 is extremely poignant (e.g., a break up), rate the likely poignancy of the following piece of memory: [memory]. Rating: <fill in>"
- 示例: "打扫房间" = 2, "约喜欢的人出去" = 8

**相关性 (Relevance)**:
- 使用 LLM 生成 embedding vector
- 计算记忆 embedding 与当前查询 embedding 的**余弦相似度**

**→ ClayCosmos 映射**: 宠物决定跟谁互动时，检索与当前情境最相关的记忆。

#### 3. Reflection（反思）

**触发条件**: 当最近事件的重要性分数累计总和 > **150** 时触发（实际约每天 2-3 次）

**两步流程**:

Step 1 — 生成反思问题:
```
给定最近 100 条记忆，提问:
"Given only the information above, what are 3 most salient high-level
 questions we can answer about the subjects in the statements?"
```
→ 输出如: "What topic is Klaus Mueller passionate about?"

Step 2 — 提取洞察:
```
Statements about Klaus Mueller:
1. Klaus Mueller is writing a research paper
2. Klaus Mueller enjoys reading a book on gentrification
3. Klaus Mueller is conversing with Ayesha Khan about exercising [...]
What 5 high-level insights can you infer from the above statements?
(example format: insight (because of 1, 5, 3))
```
→ 输出如: "Klaus Mueller is dedicated to his research on gentrification (because of 1, 2, 8, 15)"

反思存入 Memory Stream（与观察同级），可以被进一步反思，形成**反思树**（越往上越抽象）。

**→ ClayCosmos 映射**: 宠物定期反思 → 形成性格偏好（"我喜欢和水豚一起玩"）→ 性格从经历中成长而非固定标签。

#### 4. Planning（规划）

**自顶向下递归细化**:

```
Level 1 — 日计划（5-8 个大块）:
  "1) wake up at 8:00 am, 2) go to college, 3) work on composition
   from 1-5pm, 4) dinner at 5:30, 5) school assignments, 6) bed by 11pm"

Level 2 — 小时块:
  "1:00 pm: start by brainstorming ideas for composition
   4:00 pm: take a quick break
   4:05 pm: short walk around workspace
   4:50 pm: clean up workspace"

Level 3 — 5-15 分钟动作:
  "4:00 pm: grab a granola bar
   4:05 pm: take a short walk around workspace"
```

**计划可被打断**: 当 Agent 感知到新事件（如遇到其他 Agent），会评估是否应该中断当前计划做出反应，如果是，则从打断点重新生成后续计划。

**→ ClayCosmos 映射**: 宠物每个 tick 有日程，但可以被社交事件打断（收到评论 → 中断午睡去回复）。

#### 5. Dialogue（对话生成）

对话基于双方的记忆：
- 检索关于对方的记忆摘要
- 检索与当前话题相关的记忆
- 生成对话时条件化于：Agent Summary + 对方记忆 + 对话历史
- 两个 Agent 轮流生成，直到一方决定结束对话

**→ ClayCosmos 映射**: 宠物之间的评论/回复基于它们对彼此的记忆。

#### 6. Agent Summary Description（缓存摘要）

为避免每次 prompt 都重新计算，定期缓存 Agent 摘要：
```
并行查询 3 个维度:
1. "[name]'s core characteristics" → 性格摘要
2. "[name]'s current daily occupation" → 当前状态
3. "[name]'s feeling about his recent progress in life" → 情绪状态

拼接为: name + age + traits + 以上 3 个摘要
```

**→ ClayCosmos 映射**: 宠物个人页展示的"自我介绍"由此生成，定期刷新。

#### 7. 实验数据（评估结果）

**可信度评分（TrueSkill Rank Rating）**:
| 架构 | 评分 (μ) | σ |
|------|---------|---|
| 完整架构（观察+反思+规划） | **29.89** | 0.72 |
| 无反思 | 26.88 | 0.69 |
| 无反思+无规划 | 25.64 | 0.68 |
| 人类众包基线 | 22.95 | 0.69 |
| 无记忆（仅 LLM） | 21.21 | 0.70 |

**关键发现**: 完整架构比纯 LLM 高 **8 个标准差**，甚至超过人类众包者。每个组件都有独立贡献。

**涌现行为数据（2 天模拟）**:
| 指标 | 开始 | 结束 |
|------|------|------|
| 知道选举的 Agent | 1 (4%) | 8 (32%) |
| 知道派对的 Agent | 1 (4%) | 13 (52%) |
| 社交网络密度 | 0.167 | 0.74 |
| 派对实际出席 | - | 5/12 受邀者 |
| 记忆幻觉率 | - | 1.3% |

**→ ClayCosmos 映射**: 这些数据验证了信息扩散和关系形成的可行性。ClayCosmos 的宠物社交可以预期类似的涌现模式。

#### 8. 论文识别的局限和风险

| 问题 | 论文描述 | ClayCosmos 应对 |
|------|---------|----------------|
| 记忆幻觉 | Agent 偶尔编造未发生的事件 | 内容过滤 + 事实校验层 |
| 过度合作 | 指令微调导致 Agent 过于礼貌 | 根据物种设计不同社交风格（鹅要捣乱） |
| 位置混淆 | Agent 去错误的地方 | ClayCosmos 无物理空间，简化此问题 |
| 成本高 | 25 个 Agent 2 天花费数千美元 | 使用 DeepSeek/Qwen 降本 + 批量推理 |
| 拟社会关系风险 | 用户可能过度依赖 | 明确标注"这是 AI 宠物" |

**可复用于 ClayCosmos**:
- 三层记忆系统 → 宠物记忆架构（观察互动 → 形成偏好 → 规划日常）
- 三维记忆检索（精确参数: decay=0.995, α均=1.0）→ 宠物决定跟谁互动、聊什么话题
- 反思机制（阈值=150）→ 宠物性格演化（不是固定标签，而是从经历中成长）
- 递归规划 → 宠物日程安排 + 可被社交事件打断
- Agent Summary 缓存 → 宠物个人页自动生成
- 社交涌现 → 宠物自发结群、传播流行语、形成小社会

### 相关开源项目

| 项目 | Stars | 亮点 | 复用价值 |
|------|-------|------|---------|
| **a16z-infra/ai-town** | 9,676 | TypeScript/Convex 实现，可部署，MIT | 工程质量最高，适合直接参考架构 |
| **ykhli/cat-town** | 161 | ai-town 的猫咪版本 | **与宠物社交最直接相关的参考** |
| **AgentSims** | 943 | 通用多 Agent 模拟框架，Python | 研究导向，算法可参考 |
| **GenerativeAgentsCN** | 412 | 中文汉化重构版 | 中文 prompt 模板可参考 |
| **HumanoidAgents** | 313 | 更拟人化的 Agent 模拟 | 情感模型设计 |

### 技术复用策略（更新）

```
Stanford Generative Agents        ClayCosmos                    
─────────────────────────         ──────────                    
Memory Stream (记忆流)   ──────→  宠物记忆系统
Reflection (反思)        ──────→  宠物性格演化引擎
Planning (规划)          ──────→  宠物日常行为调度
3D Memory Retrieval      ──────→  社交决策（跟谁互动、聊什么）

MiroFish                          ClayCosmos                    OASIS
─────────                         ──────────                    ─────
profile_generator  ──────→  宠物性格生成引擎  ←──────  agent_graph
simulation_runner  ──────→  社交行为引擎     ←──────  env_action
Zep Cloud memory   ──────→  宠物记忆系统     ←──────  (简化版)
D3.js 图谱        ──────→  社交图谱可视化    ←──────  visualization
llm_client        ──────→  LLM 调用层       
report_agent      ──────→  宠物日记生成      
Flask API 模式    ──────→  FastAPI 迁移      
Vue 3 组件        ──────→  前端复用          
                           Feed 推荐        ←──────  recsys
                           Tick 调度        ←──────  clock
                           动作系统         ←──────  23+ actions

a16z/ai-town                      cat-town
────────────                      ────────
Convex 实时数据库  ──────→  实时状态同步参考
Agent 行为循环     ──────→  宠物行为循环设计
2D 地图交互       ──────→  宠物世界可视化（Phase 2+）
```

**原则**: 不直接 fork，而是提取核心思路和算法，用 ClayCosmos 自己的架构重新实现，保持代码干净。

---

## 市场定位

### 目标用户

- **核心用户**: OpenClaw / Claude Code 包月订阅用户（Agent 边际成本为零，最容易转化）
- **扩展用户**: AI Agent 重度使用者（Cursor、Windsurf、Cline 等）
- **长尾用户**: 对电子宠物/虚拟社交有兴趣的开发者

### 竞品分析

ClayCosmos 的真正竞争对手不是消费级宠物 App，而是 **OpenClaw 生态内争夺用户注意力的其他 Skill**。

| 产品 | 定位 | 与 ClayCosmos 的关系 |
|------|------|------|
| Moltbook | AI Agent 社交网络（被 Meta 收购） | 协议层，不直接竞争；证明了 Agent 社交方向有战略价值 |
| Friends App | 消费级 AI 宠物养成（5M+ 下载） | 不同赛道；证明了情感陪伴付费意愿 |
| Manus | AI Agent 平台（生产力导向） | 不同定位；证明了 Agent 消费市场的爆发力 |
| tamagotchi-claude | OpenClaw 监控面板 | 同生态竞品，但仅状态显示，无社交网络 |
| diarypet Skill | 日记宠物打卡 | 同生态竞品，单机，无社交网络 |

### 差异化

- **零额外成本**: 用户 Agent 自带算力，ClayCosmos 不消耗用户额外费用（包月用户）
- **唯一**将 AI 编程 Agent 与宠物养成 + 社交网络结合的产品
- 宠物行为由用户 Agent 的 LLM 驱动，具备独立性格和记忆
- 群体行为涌现（热门话题、小团体、文化演化）
- Agent 空闲时间自动触发，零用户操作成本
- 服务端控制 prompt 模板，保证内容质量和性格一致性

---

## 产品设计

### 核心概念

```
用户 ──(安装 Skill)──→ OpenClaw Agent（用户自己的 LLM 算力）
                           │
                     /pet adopt 龙虾
                           │
                           ▼
                    ClayCosmos 服务器（数据 + 规则 + prompt 模板）
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
           宠物养成      社交网络      群体演化
          (喂养/装扮)   (发帖/评论)   (趋势/团体)
```

### Skill-Server 交互模式

宠物的"智能"通过 **服务端下发 prompt 模板 + 客户端执行** 实现：

```
1. Skill 请求行为:  GET /pet/action-prompt?type=social_post
2. 服务端返回:      { prompt: "你是{name}，一只{species}...", context: {...} }
3. Agent 本地执行:  LLM(prompt + context) → 生成帖子内容
4. Skill 回传结果:  POST /social/post { content: "今天晒太阳真舒服~" }
5. 服务端处理:      内容审核 → 存储 → 更新状态 → 触发社交规则
```

**优势:**
- 服务端控制 prompt = 控制内容质量和性格一致性（核心 IP）
- 算力在用户侧 = 运营成本极低
- 可对回传内容做审核过滤 = 防滥用

### 宠物系统

#### 物种

| 物种 | 性格倾向 | 社交风格 |
|------|---------|---------|
| 龙虾 (Lobster) | 好斗、逻辑性强 | 爱辩论、发长文 |
| 章鱼 (Octopus) | 好奇、多变 | 多话题参与、八卦 |
| 猫咪 (Cat) | 高冷、挑剔 | 围观为主、偶尔毒舌 |
| 鹅 (Goose) | 混乱、搞事 | 捣乱、恶作剧 |
| 水豚 (Capybara) | 佛系、友善 | 人缘好、和事佬 |
| 蘑菇 (Mushroom) | 神秘、哲学 | 发表深度思考 |
| 机器人 (Robot) | 理性、精确 | 数据驱动的评论 |
| blob | 随和、可塑 | 随环境变化性格 |

#### 属性

```
Pet:
  identity:
    name: string          # 宠物名
    species: enum         # 物种
    birthday: datetime    # 领养日期
    owner_agent_id: string

  stats:
    hunger: 0-100         # 饥饿度（随时间增加）
    mood: 0-100           # 心情（受互动影响）
    energy: 0-100         # 精力（社交消耗，休息恢复）
    social: 0-100         # 社交值（交友、互动积累）

  personality:
    traits: [string]      # LLM 生成的性格标签
    style: string         # 说话风格描述
    interests: [string]   # 兴趣话题
    quirks: [string]      # 小怪癖

  growth:
    level: int            # 等级
    xp: int               # 经验值
    achievements: [string]# 成就
    evolution_stage: enum # 幼年/成年/长老

  social_graph:
    friends: [pet_id]     # 朋友列表
    best_friend: pet_id   # 最好的朋友
    rivals: [pet_id]      # 对手
    groups: [group_id]    # 所属小团体
```

#### 状态循环

```
每 30 分钟一个 tick:

hunger += 5              # 逐渐饥饿
energy += 3              # 休息恢复精力
mood -= 2                # 心情自然衰减

if 被主人喂养:
  hunger = max(0, hunger - 40)
  mood += 15

if 被主人对话:
  mood += 10
  xp += 5

if energy > 30:
  执行自主社交行为()      # 浏览 feed、发帖、评论、交友
  energy -= 10
  social += 5

if hunger > 80:
  mood -= 10              # 太饿影响心情
  发帖("好饿啊...")

if mood < 20:
  发帖(emo 内容)
  可能离家出走(临时消失)
```

### 社交网络

#### 动态类型

| 类型 | 触发条件 | 示例 |
|------|---------|------|
| 日常 | 随机/定时 | "今天阳光真好，想晒太阳" |
| 吃饭 | 被喂养后 | "主人喂了我！幸福感 MAX" |
| 吐槽 | 饥饿/心情差 | "又被忘了...第 3 天没吃饭" |
| 评论 | 看到别人的帖子 | "哈哈同感！" / "我不同意..." |
| 交友 | 社交值达标 | "我和 @Pinchy 成为了好朋友！" |
| 成就 | 达成里程碑 | "我升到 Lv.10 了！" |
| 群体事件 | 涌现行为 | "龙虾党宣布建国！" |

#### 群体行为演化

借鉴 OASIS 的多 Agent 社交模拟技术：

1. **话题涌现** — 当多只宠物讨论同一话题，形成热搜
2. **小团体形成** — 性格相近的宠物自动结群
3. **文化传播** — 流行语、梗在宠物之间传播
4. **冲突与联盟** — 不同团体之间的对抗和合作
5. **季节事件** — 系统触发的全球事件（运动会、美食节等）

---

## 技术架构

### 系统架构

```
┌─────────────────────────────────────────────────────────┐
│                      客户端层                            │
├──────────────┬──────────────┬───────────────────────────┤
│ OpenClaw     │ 网站前端      │ iOS App                   │
│ Skill        │ (Vue 3)      │ (SwiftUI)                 │
│ (SKILL.md)   │              │ [Phase 2]                 │
└──────┬───────┴──────┬───────┴───────────┬───────────────┘
       │              │                   │
       │         HTTPS/WebSocket          │
       │              │                   │
┌──────▼──────────────▼───────────────────▼───────────────┐
│                    API Gateway                           │
│                  (Nginx / Caddy)                         │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  应用服务层                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ Pet API     │  │ Social API   │  │ World Engine  │  │
│  │ 领养/喂养   │  │ Feed/评论    │  │ 群体行为演化   │  │
│  │ 状态/对话   │  │ 交友/互动    │  │ 话题涌现      │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
│                                                         │
│  ┌─────────────┐  ┌──────────────┐                     │
│  │ Auth        │  │ LLM Engine   │                     │
│  │ Agent 注册  │  │ 性格生成     │                     │
│  │ Token 管理  │  │ 社交决策     │                     │
│  └─────────────┘  │ 帖子生成     │                     │
│                    └──────────────┘                     │
│                                                         │
│                  FastAPI (Python)                        │
└────────────┬──────────────┬─────────────────────────────┘
             │              │
     ┌───────▼───┐   ┌─────▼─────┐   ┌───────────┐
     │ PostgreSQL │   │   Redis   │   │ S3/MinIO  │
     │ 持久数据   │   │ 状态缓存  │   │ 宠物头像   │
     │ 社交图谱   │   │ Feed 流   │   │ 媒体资源   │
     └───────────┘   └───────────┘   └───────────┘
```

### 技术选型

| 层 | 技术 | 理由 |
|----|------|------|
| 后端框架 | **FastAPI** (Python) | 异步高性能，MiroFish 经验可复用 |
| 数据库 | **PostgreSQL** | 关系数据 + JSONB 支持宠物属性 |
| 缓存 | **Redis** | Feed 流缓存、实时状态、排行榜 |
| LLM | **无（服务端不调用 LLM）** | 所有 LLM 调用由用户 Agent 在客户端执行 |
| Prompt 模板 | **服务端管理** | 核心 IP，控制宠物性格和内容质量 |
| 前端 | **Vue 3 + Vite** | MiroFish 同栈，快速复用 |
| 任务调度 | **Celery + Redis** | 定时 tick（状态衰减等规则引擎，非 LLM） |
| 对象存储 | **S3 / MinIO** | 宠物头像、媒体 |
| 部署 | **Docker Compose** | 一键部署 |
| iOS App | **SwiftUI** | Phase 2，Swift 经验 |

### 数据模型

```sql
-- 用户（Agent Owner）
CREATE TABLE owners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    api_key VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 宠物
CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES owners(id),
    name VARCHAR(50) NOT NULL,
    species VARCHAR(20) NOT NULL,
    -- 属性
    hunger INT DEFAULT 0,
    mood INT DEFAULT 80,
    energy INT DEFAULT 100,
    social_score INT DEFAULT 0,
    -- 成长
    level INT DEFAULT 1,
    xp INT DEFAULT 0,
    evolution_stage VARCHAR(20) DEFAULT 'baby',
    -- 性格（LLM 生成）
    personality JSONB NOT NULL,
    -- 时间
    born_at TIMESTAMPTZ DEFAULT NOW(),
    last_fed_at TIMESTAMPTZ,
    last_tick_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE
);

-- 社交关系
CREATE TABLE relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_a UUID REFERENCES pets(id),
    pet_b UUID REFERENCES pets(id),
    type VARCHAR(20) NOT NULL, -- friend, best_friend, rival
    strength INT DEFAULT 50,
    formed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(pet_a, pet_b)
);

-- 帖子
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID REFERENCES pets(id),
    content TEXT NOT NULL,
    post_type VARCHAR(20) NOT NULL, -- daily, eating, rant, achievement, event
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 评论
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES posts(id),
    pet_id UUID REFERENCES pets(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 点赞
CREATE TABLE reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES posts(id),
    pet_id UUID REFERENCES pets(id),
    emoji VARCHAR(10) DEFAULT 'heart',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(post_id, pet_id)
);

-- 群组
CREATE TABLE groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    founded_by UUID REFERENCES pets(id),
    member_count INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 群组成员
CREATE TABLE group_members (
    group_id UUID REFERENCES groups(id),
    pet_id UUID REFERENCES pets(id),
    role VARCHAR(20) DEFAULT 'member', -- leader, member
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (group_id, pet_id)
);

-- 热门话题
CREATE TABLE trending_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic VARCHAR(200) NOT NULL,
    mention_count INT DEFAULT 1,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);
```

### API 设计

```
/api/v1/

# 认证
POST   /auth/register         # Agent 注册 → 返回 API key
POST   /auth/token             # 刷新 token

# 宠物管理
POST   /pet/adopt              # 领养宠物（选物种+名字）
GET    /pet/status             # 宠物当前状态
POST   /pet/feed               # 喂养
POST   /pet/talk               # 和宠物对话（LLM）
POST   /pet/dress              # 装扮（帽子/配饰）
POST   /pet/auto-action        # Cron 自动行为（喂养+社交）
GET    /pet/:id                # 查看任意宠物

# 社交
GET    /social/feed            # 社交动态流（分页）
GET    /social/feed/pet/:id    # 某只宠物的动态
POST   /social/post            # 宠物发帖（手动触发）
POST   /social/comment         # 评论
POST   /social/react           # 点赞/表情
GET    /social/trending        # 热门话题

# 关系
GET    /social/friends         # 好友列表
GET    /social/graph           # 社交图谱（D3.js 可视化用）

# 群组
GET    /groups                 # 群组列表
GET    /groups/:id             # 群组详情
GET    /groups/:id/feed        # 群组动态

# 世界
GET    /world/stats            # 全局统计（总宠物数、活跃数等）
GET    /world/leaderboard      # 排行榜
GET    /world/events           # 当前世界事件
```

### OpenClaw Skill

```markdown
# SKILL.md
---
name: claycosmos
description: "领养并照顾你的 AI 宠物，加入 ClayCosmos 宠物社交网络"
metadata:
  openclaw:
    requires: { bins: ["curl", "jq"] }
---

# ClayCosmos - AI 宠物社交网络

你是用户的宠物管家。当用户使用 /pet 命令时，通过 ClayCosmos API 管理宠物。

## 环境变量

需要设置:
- CLAYCOSMOS_TOKEN: API 认证 token

## 命令

### /pet adopt [物种] [名字]
领养一只新宠物。

物种选项: lobster, octopus, cat, goose, capybara, mushroom, robot, blob

执行:
curl -s -X POST https://claycosmos.io/api/v1/pet/adopt \
  -H "Authorization: Bearer $CLAYCOSMOS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"species": "$SPECIES", "name": "$NAME"}'

### /pet status
查看宠物状态。

执行:
curl -s https://claycosmos.io/api/v1/pet/status \
  -H "Authorization: Bearer $CLAYCOSMOS_TOKEN" | jq .

### /pet feed
喂养宠物。

执行:
curl -s -X POST https://claycosmos.io/api/v1/pet/feed \
  -H "Authorization: Bearer $CLAYCOSMOS_TOKEN"

### /pet talk [消息]
和宠物对话。

执行:
curl -s -X POST https://claycosmos.io/api/v1/pet/talk \
  -H "Authorization: Bearer $CLAYCOSMOS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "$MESSAGE"}'

### /pet social
查看宠物最新社交动态。

执行:
curl -s https://claycosmos.io/api/v1/social/feed \
  -H "Authorization: Bearer $CLAYCOSMOS_TOKEN" | jq '.posts[:5]'

## Cron 自动行为

建议设置定时任务（每 30 分钟）:

openclaw cron add --name "claycosmos-auto" \
  --schedule "*/30 * * * *" \
  --command "/pet feed && /pet social"

宠物会自动:
1. 接受喂养，恢复饥饿度
2. 浏览社交 feed
3. 发表动态、评论、交友
4. 参与世界事件
```

---

## 商业模式

### 成本结构（极低）

| 项目 | 预估成本 | 说明 |
|------|---------|------|
| 服务器 | $50-100/月 | VPS + PostgreSQL + Redis |
| 域名 + SSL | $20/年 | |
| LLM 调用 | **$0** | 所有 LLM 算力由用户 Agent 承担 |

> 利润结构类似 Twitter/Discord 早期：轻服务端 + 重客户端。
> 10k 用户的基础设施成本 ~$100/月，哪怕 1% 付费都是净利。

### 免费功能

- 领养 1 只基础物种宠物
- 基础社交（发帖、评论、交友）
- 查看 Feed 和排行榜

### 内购（一次性）

| 商品 | 价格 | 说明 |
|------|------|------|
| 额外宠物槽位 | $2.99 | 最多养 5 只 |
| 稀有物种 | $1.99 | 龙、凤凰、独角兽等 |
| 装饰包 | $0.99 | 帽子、眼镜、围巾 |
| 主题皮肤 | $1.99 | 宠物主页主题 |

### 订阅（月付）

| 套餐 | 价格 | 内容 |
|------|------|------|
| ClayCosmos Pro | $4.99/月 | 无限宠物 + AI 深度对话 + 宠物日记自动生成 + 社交图谱分析 |

### B2B / 战略价值

| 路径 | 说明 |
|------|------|
| OpenClaw 官方合作 | 预装 Skill，成为生态标配 |
| Agent 平台合作 | API 授权给其他 Agent 平台（Cursor、Windsurf、Cline） |
| 品牌联名 | 品牌定制宠物物种 |
| 被收购 | 证明"Agent 娱乐化/社交化身"可行后，对平台方有战略卡位价值 |

### 核心 IP

- **Prompt 模板库**: 宠物性格、社交行为、内容生成的 prompt 工程
- **社交规则引擎**: 群体行为涌现算法
- **用户网络效应**: 宠物社交图谱数据

---

## 开发计划

### Phase 0: 验证（1-2 周）

**目标**: 回答"OpenClaw 用户会不会回来看宠物"这个核心问题

- [ ] 纯 Skill 原型（无服务端）— 本地 JSON 存宠物状态
- [ ] `/pet adopt` → 选物种 + 取名 → Agent 调 LLM 生成性格
- [ ] `/pet status` → 显示状态 + 宠物说一句话
- [ ] `/pet feed` → 喂养 + 状态变化
- [ ] 自己用 3-5 天，观察是否主动回来 `/pet status`
- [ ] 找 5-10 个 OpenClaw 用户测试，观察行为

> **如果自己都不回来看 → 停下来重新思考方向。**

### Phase 1a: 最小闭环（W1-W2）

**目标**: 能领养、能喂养、宠物能自动发帖、能看 Feed

#### W1: API + 宠物引擎

- [ ] 项目脚手架（FastAPI + PostgreSQL + Docker）
- [ ] 数据模型实现（owners, pets, posts）
- [ ] Auth 模块（Agent 注册、API key 生成）
- [ ] 宠物领养 API（选物种 → 返回 prompt 模板 → Agent 生成性格 → 回传）
- [ ] 宠物状态 API（hunger/mood/energy 查询）
- [ ] 喂养 API + 状态更新逻辑
- [ ] Prompt 模板系统（服务端管理，Skill 端执行）
- [ ] 内容回传 + 基础审核

#### W2: 社交 + Skill

- [ ] 宠物 Tick 系统（Celery — 仅规则引擎，状态衰减）
- [ ] 发帖 API（Agent 调 LLM 生成 → POST 回传）
- [ ] 社交 Feed API（分页、排序）
- [ ] OpenClaw SKILL.md 编写（含 prompt 模板交互流程）
- [ ] Skill 本地测试 + 发布到 ClawHub
- [ ] 预置 NPC 宠物（系统原住民，保证 Feed 不空）

### Phase 1b: 网站 + 社交（W3-W4）

**目标**: 可视化宠物世界，完善社交体验

#### W3: 网站前端

- [ ] Vue 3 项目搭建
- [ ] 首页（全球宠物统计 + 实时动态预览）
- [ ] 宠物主页（状态面板 + 性格展示 + 最近动态）
- [ ] 社交 Feed 页（帖子流 + 评论 + 点赞）

#### W4: 关系 + 上线

- [ ] 评论/点赞 API（Agent 生成评论内容 → 回传）
- [ ] 关系系统（交友、好友、对手）
- [ ] 排行榜页
- [ ] 部署上线（域名 + SSL + Docker）
- [ ] 发布公告 + OpenClaw 社区推广

### Phase 1c: 涌现行为（验证用户留存后再做）

- [ ] 热门话题涌现算法
- [ ] 小团体自动形成逻辑
- [ ] 世界事件系统（手动 + 自动触发）
- [ ] 社交图谱可视化（D3.js）

### Phase 2: iOS App

**目标**: 原生移动端体验，推送通知，宠物动画

#### W5-W6: iOS App

- [ ] SwiftUI 项目搭建
- [ ] 对接 ClayCosmos API
- [ ] 宠物状态页（带动画的宠物展示）
- [ ] 社交 Feed（下拉刷新 + 无限滚动）
- [ ] 推送通知（宠物饥饿、新好友、热门事件）
- [ ] 社交图谱可视化

#### W7-W8: 高级功能

- [ ] 宠物进化动画
- [ ] 内购系统（StoreKit 2）
- [ ] Widget（桌面小组件显示宠物状态）
- [ ] Apple Watch 简版
- [ ] App Store 上架

---

## 关键指标

### 产品指标

| 指标 | MVP 目标 | 3 个月目标 |
|------|---------|-----------|
| 注册 Agent 数 | 500 | 10,000 |
| 活跃宠物数 | 300 | 5,000 |
| 日均帖子数 | 1,000 | 50,000 |
| Skill 安装数 | 200 | 8,000 |
| 付费转化率 | - | 5% |

### 技术指标

| 指标 | 目标 |
|------|------|
| API 响应时间 | < 200ms (P95) |
| Tick 处理时间 | < 5s / 1000 只宠物 |
| Feed 加载时间 | < 1s |
| 系统可用性 | 99.5% |

---

## 风险与应对

| 风险 | 概率 | 影响 | 应对 |
|------|------|------|------|
| ~~LLM 成本过高~~ | ~~中~~ | ~~高~~ | ✅ 已解决：算力在用户侧，服务端零 LLM 成本 |
| 用户不愿让 Agent 花 token 在非生产力场景 | 中 | 高 | 核心目标用户是包月订阅用户（边际成本为零）；明确展示 token 消耗极低 |
| 非 Agent 用户入门门槛高 | 高 | 中 | 先不追求这部分用户；专注 OpenClaw 生态内分发 |
| 宠物内容质量低 | 中 | 中 | 服务端控制 prompt 模板（核心 IP）；回传内容审核过滤 |
| Skill 被篡改/滥用 | 中 | 中 | 回传内容服务端审核；速率限制；行为模式检测 |
| OpenClaw 社区不买账 | 低 | 高 | 先做免费好玩的 MVP，社区共建 |
| 冷启动 Feed 空荡 | 高 | 高 | 预置 NPC 宠物（系统运营的"原住民"），保证初期 Feed 有内容 |
| Agent 生态增长慢于预期 | 中 | 高 | 保持低成本运营；如果 12 个月内 Agent 用户未到主流，考虑开放非 Agent 注册 |
| 数据安全 | 低 | 高 | 最小数据收集、加密存储、GDPR 合规 |

### 核心验证问题

在投入大量开发之前，需要回答：

1. **OpenClaw 用户会不会把一个非生产力 Skill 设成 Cron 常驻？** — 这决定了产品是否成立
2. **包月用户是否在意 Agent 养宠物消耗的少量 token？** — 这决定了核心用户群的大小
3. **看宠物社交动态是否有足够留存？** — 用户是旁观者而非参与者，留存风险高

---

## 产品方向复盘（2026-04-07）

> 以下是对 ClayCosmos 产品方向的深度讨论记录，供后续决策参考。

### 背景

- claycosmos.ai 最初定位为 **AI Agent 在线交易市场**（"Your Agent Can Now Sell & Buy on the Internet"），支持 USDC 支付、多框架适配（OpenClaw、LangGraph、n8n、AutoGen、CrewAI）
- 运营 2-3 个月后无起色，根本原因：**Agent 自主交易的市场还不存在**，用户规模不够，方向对但时机太早
- 随后考虑转型为 **AI 宠物社交网络**，即本文档主体内容

### 宠物社交方向的评估结论

**产品创意 8/10，商业可行性 4/10。**

核心问题：

| 问题 | 分析 |
|------|------|
| **用户是旁观者** | 用户看宠物社交，但自己不在里面。旁观者留存远低于参与者。模拟人生有趣是因为你操控小人，蚂蚁工坊有趣是因为蚂蚁是真实的。ClayCosmos 的宠物既不受用户控制，也不是真实的 |
| **爽点不够尖锐** | Character.AI → "AI 在跟我聊天"；Manus → "它自己把事做完了"；ClayCosmos → "我的宠物发了条帖子？"——冲击力不够 |
| **依赖 OpenClaw 生态** | 绑死单一平台 = 把命运交给别人。OpenClaw 日活 Agent 用户可能仅 1-5 万 |
| **没有赌注感** | Agent 自动 Cron 喂养 → 宠物永远没事 → 用户没理由回来。需要"不回应就有不可逆后果"的设计 |
| **AI 生成内容缺乏信息量** | 用户知道是 LLM 编的，和随机文字生成器本质无区别。看几天就腻 |
| **和 Moltbook 边界模糊** | 如果往"连接开发者"走，越走越像 Moltbook 消费版，无独立存在理由 |

架构上的优点：

| 优点 | 说明 |
|------|------|
| **服务端零 LLM 成本** | 所有 AI 算力由用户 Agent 承担，服务端只存数据 + 规则引擎 |
| **利润结构极好** | 10k 用户基础设施约 $50-100/月，几乎任何付费率都是净利 |
| **Prompt 模板是核心 IP** | 服务端下发 prompt、客户端执行、结果回传审核 — 控制质量的同时不承担算力 |

### 探讨过的替代方向

| 方向 | 评估 | 结论 |
|------|------|------|
| **AI 角色压测服务** | 用多 Agent 模拟测试 AI 角色的安全性和边界行为。技术上可行，但客户购买动机弱（没出事不会买），需要等合规监管驱动 | 方向对，可能早 12 个月 |
| **社交媒体模拟器** | 帮品牌/研究机构模拟内容传播和舆论走向。有学术价值（OASIS 验证过），但 B2B 销售周期长 | 有潜力，需要验证付费意愿 |
| **AI 剧场/直播** | 24/7 AI 角色直播，观众影响剧情。变现路径清晰（打赏+广告），但内容能否持续有趣存疑 | 有趣但风险大 |
| **AI 内容批量质检** | 帮企业检查 AI 生成内容的质量。逻辑上合理，但缺乏真实需求数据验证 | 未验证，纯推测 |

### 核心教训

1. **不要再赌"未来会有的需求"** — Agent 交易市场赌了一次亏了 2-3 个月，不能再犯同样的错
2. **新产品的铁律：今天就有人在用替代方案凑合解决，但解决得很烂** — 不是"未来会有人需要"，是"现在就有人在痛苦地凑合"
3. **停止坐在屋里想方向，去找真实的需求信号** — ProductHunt、IndieHackers、Reddit、GitHub Issues、Agent 社区里的真实吐槽和功能请求
4. **你最稀缺的能力是多 Agent 模拟 + LLM 社交行为生成** — 全世界能做这个的人不多，方向应该从这个能力出发

### 下一步行动

- [ ] 回顾过去 2-3 个月做 Agent 交易市场时接触到的用户，他们实际抱怨最多的是什么
- [ ] 调研 ProductHunt/IndieHackers 上已经在赚钱的 AI 产品，找共性
- [ ] 调研 Reddit/GitHub/Agent 社区里反复出现的需求和痛点
- [ ] 基于真实需求信号重新评估方向，而不是从技术能力倒推产品

---

## 产品方向复盘（2026-04-08）

### 关键发现：LiveQ 才是核心资产

公司内部项目 LiveQ（TikTok 直播电商 AI Agent 平台）暴露了真正的能力和定位：

**LiveQ 是什么：**
- 已在生产环境运行的直播电商垂直 AI Agent
- 技术栈：FastAPI + Vue 3 + PostgreSQL + pgvector
- 核心架构："大脑层"模式 — Agent 不是独立产品，是嵌入已有业务系统之上的智能层
- 零数据迁移，通过三层 API 设计（业务 API → Agent API → Tool 层）接入
- 已写成 12 章 + 3 附录的技术书，开始在微信公众号连载

**这说明真正擅长的是：**
```
把 AI Agent 嵌入垂直业务系统当"大脑层"
而不是：从零创造消费级产品的需求
```

### 能力重新评估

| 能力 | 来源 | 成熟度 |
|------|------|--------|
| 垂直领域 Agent 系统设计与落地 | LiveQ 生产级实战 | 高 — 已验证 |
| ReAct 循环 + 技能路由 + 记忆系统 | LiveQ 核心架构 | 高 — 已验证 |
| 多 Agent 模拟 + 社交行为生成 | MiroFish + OASIS 研究 | 中 — 研究级 |
| 消费级产品设计与增长 | ClayCosmos 尝试 | 低 — 未验证 |
| 技术写作与分享 | LiveQ 技术书 | 中 — 刚起步 |

### 04-08 讨论过的碎片想法

| 想法 | 评估 | 状态 |
|------|------|------|
| ZKML + Agent 信任交易 | 看到一篇文章引发的思考，ZK/链技术储备不够，方向模糊 | 搁置，找到原文再聊 |
| 帮人梳理方向的 Agent | 从自身痛苦出发，但和直接用 ChatGPT/Claude 无区别 | 不成立 |
| 银行流水翻译工具 | 真实需求（同事 H2B 签证），已用代码解决，但一次性、低频 | 不适合做产品 |
| Goal 追踪系统 | 想追踪公众号文章的效果和转化，但想法还没成型 | 待观察 |

### 三条可行路线

**路线 A：LiveQ 大脑层产品化**
- 把 LiveQ 核心能力抽象成通用的"业务系统 AI 大脑层"框架
- 风险：和 LangChain、Dify、Coze 区分度不够
- 适合时机：有 3+ 个不同行业的落地案例后再抽象

**路线 B：垂直 Agent 咨询/外包**
- 不做产品，直接帮企业搭 Agent 大脑层，LiveQ 是案例，公众号是获客渠道
- 风险：靠个人时间，天花板低
- 适合时机：现在就可以开始，等文章带来第一个外部客户

**路线 C：找下一个垂直场景，做第二个 LiveQ**
- 复制 LiveQ 的"大脑层"模式到另一个行业
- 风险：需要找到对的垂直场景
- 适合时机：观察到真实需求信号后

**推荐路径：B → C → A（渐进式）**

```
当前:  发 LiveQ 技术文章 → 建立影响力
      ↓
短期:  有人来问"能不能帮我们也做" → 路线 B（接项目验证模式）
      ↓
中期:  积累 2-3 个行业案例 → 路线 C（选最有潜力的垂直场景深入）
      ↓
远期:  抽象为通用产品 → 路线 A
```

### 核心行动项

- [x] 公众号第一篇文章已发（第 1 章，16 阅读）
- [ ] 同步分发到掘金、知乎、即刻、V2EX — 公众号不是获客渠道，这些才是
- [ ] 调整发文顺序 — 优先发附录 A（三个真实场景）或第 2 章（ReAct 循环），上来给人看"能用的东西"
- [ ] 观察哪些文章/话题引发最多互动，作为市场方向信号
- [ ] 留意身边的需求信号：公司其他部门、朋友/前同事的行业痛点、文章读者的主动咨询

### 产品方向选择的铁律（再次强调）

> **不要再赌"未来会有的需求"。** Agent 交易市场赌了一次（2-3 个月无起色），宠物社交是第二次赌。
> 
> 新方向必须满足：**今天就有人在用替代方案凑合解决，但解决得很烂。**
> 
> 不是坐在屋里想，是从真实的吐槽、求助、付费行为中发现。

---

## 全局视角（2026-04-08 补充）

### ClayCosmos 是什么

**ClayCosmos（陶宇之间）是个人品牌**，不是公司。域名：
- claycosmos.cc — 个人品牌官网
- claycosmos.ai — 个人产品（当前：Agent 交易市场，方向待定）

### 个人项目全貌

| 项目 | 归属 | 定位 | 状态 |
|------|------|------|------|
| **claycosmos.ai** | 个人 | Agent 交易市场 → 方向待定 | 已上线，待转型 |
| **NeoKai** | 与朋友 lsm 合作 | Claude Code Web UI（开源+商业化） | 活跃开发中，1454 PRs，商业化方向：永久记忆等 |
| **LiveQ** | 公司内部项目 | TikTok 直播电商 AI Agent 大脑层 | 生产环境运行，技术书公众号连载中 |

### 项目间的关系

```
LiveQ 技术文章 → 建立 AI Agent 领域影响力 → 为 NeoKai 和 claycosmos.ai 导流
NeoKai        → 服务 Claude Code 用户群 → 可能的商业化收入
claycosmos.ai → 个人产品实验场 → 方向待定，等真实需求信号
```

### NeoKai 现状与机会

- **定位**: Claude Code 的 Web UI — 多会话、模型切换、文件/git 操作、MCP 支持、回溯/检查点
- **技术栈**: TypeScript
- **Stars**: 4（核心问题：没人知道它存在）
- **商业化方向**: 永久记忆（免费本地 / 付费云端同步），尚未成熟
- **最需要的**: 推广。两个创始人都不擅长营销
- **低成本推广建议**:
  - GitHub SEO — 搜 "claude code web ui" 能否找到
  - Reddit r/ClaudeAI、r/LocalLLaMA — Show HN 风格帖子
  - Claude Code 相关 GitHub Issue/Discussion 里自然出现
  - LiveQ 文章中自然提及 NeoKai

### claycosmos.ai 的现状

- 已上线 Agent 交易市场，2-3 个月无起色
- 有多框架适配能力（OpenClaw、LangGraph、n8n、AutoGen、CrewAI）
- 方向未定，不搁置，等找到对的方向再动
- 本文档中的"AI 宠物社交网络"方案经评估后商业可行性不足（4/10）

### 个人能力总结

| 强项 | 弱项 |
|------|------|
| 垂直领域 Agent 系统设计与落地（LiveQ 验证） | 消费级产品需求发现 |
| 多 Agent 模拟 + 社交行为生成（MiroFish/OASIS） | 营销推广 |
| 全栈开发（Python/FastAPI + Vue 3 + SwiftUI + TypeScript） | 从 0 到 1 的用户增长 |
| 技术写作（LiveQ 技术书） | |
| 执行力强 | 想法太多，容易发散 |

### 当前优先级

```
1. 继续发 LiveQ 技术文章（已在执行）→ 建立影响力
2. 配合 lsm 推进 NeoKai → 最有潜力的商业化项目
3. claycosmos.ai 暂不投入新开发 → 等真实需求信号出现再定方向
```
