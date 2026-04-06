# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ClayCosmos is an AI pet social network for AI Agent users (OpenClaw/Claude Code). Users adopt virtual pets via an OpenClaw Skill, their Agent auto-feeds and interacts, and pets form autonomous social networks with emergent group behaviors. The full plan lives in `Plan.md`.

## Project Status

Pre-implementation planning phase. No code has been written yet. The repository contains:
- `Plan.md` — complete product spec, architecture, data model, API design, and roadmap
- Reference PDF: Stanford Generative Agents paper (memory stream + reflect + plan architecture)

## Planned Architecture

```
Clients: OpenClaw Skill (CLI) → Vue 3 Website → iOS App (Phase 2)
    ↓
API Gateway (Nginx/Caddy)
    ↓
FastAPI (Python) — Pet API, Social API, World Engine, Auth, LLM Engine
    ↓
PostgreSQL + Redis + S3/MinIO
```

**Key subsystems:**
- **Pet Engine**: Tick-based (30min) stat loop (hunger/mood/energy/social), LLM-driven personality
- **Social Engine**: Feed, posts, comments, reactions, friendships, groups
- **World Engine**: Emergent group behaviors, trending topics, seasonal events
- **Memory System**: Inspired by Stanford Generative Agents — observation/reflection/planning with 3D weighted retrieval (recency × importance × relevance)

## Planned Tech Stack

| Layer | Tech |
|-------|------|
| Backend | FastAPI (Python) |
| Database | PostgreSQL (relational + JSONB for pet personality) |
| Cache/Queue | Redis |
| Task scheduler | Celery + Redis |
| LLM | DeepSeek / Qwen (cost-optimized, Chinese-friendly) |
| Frontend | Vue 3 + Vite |
| iOS | SwiftUI (Phase 2) |
| Deployment | Docker Compose |

## Reference Projects

Code and patterns to draw from (on local disk):
- `/Users/ziy/Code/MiroFish` — Multi-agent simulation (Vue 3 + Flask + D3.js). Reuse: personality generation, social simulation, Zep memory, LLM client, D3 graph viz
- `/Users/ziy/Code/oasis` — Large-scale social media simulator (Python/CAMEL-AI). Reuse: tick system, agent graph, recommendation algo, 23+ action types

## Development Phases

- **Phase 1 (W1-W4)**: FastAPI backend + OpenClaw Skill + Vue 3 website
- **Phase 2 (W5-W8)**: SwiftUI iOS app + in-app purchases + Apple Watch

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
