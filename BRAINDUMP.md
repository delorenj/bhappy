# BMAD method team onboarding experience - Claude

[TriumphABA](/project/019c69d6-e991-71d8-947b-e1074c79e86e)/

BMAD method team onboarding experience

Claude finished the response

## You said: I need to onboard my team with the BMAD method <https://docs>

I need to onboard my team with the BMAD method [https://docs.bmad-method.org/](https://docs.bmad-method.org/) I want to create a curated interactive learning experience that introduces them to the methodology, and advances them steadily through to advanced usage such as the agent builder, workflow creation, and custom modules. Can we ideate and come up with and idea and plan I can hand a dev team?/notebooklm /shadcn-components /hindsight

Apr 23

## Claude responded: Alright, let me pour you a cold one and dig into this

Alright, let me pour you a cold one and dig into this. BMAD onboarding is the kind of thing that can go very right or very wrong depending on how you frame it. Most team trainings die in the "here's a 40-slide deck, please clap" phase. We're not doing that.

Let me first peek at BMAD's actual docs so I'm not guessing at what we're teaching, then we'll build this thing properly.

Fetched: Welcome to the BMad Method

Fetched: Welcome to the BMad Method

Good. Now I've got the shape of it. BMAD is four-section Diátaxis docs wrapped around agents, workflows, skills, and modules, with a v6 "Skills Architecture" and a Builder sub-ecosystem for custom modules. That's the terrain. Let me grab the getting-started page and the workflow map real quick so I know what "day one" actually looks like for a learner.

Fetched: Getting Started

Fetched: Getting Started

Perfect. I've got enough shape now. Pass me that beer, let me lay this out.

### The core insight

Reading that docs tree, BMAD has a specific learning gravity well: **`bmad-help` is the pedagogy**. The framework literally teaches itself through an introspection skill. That's the anchor we build around. Our job isn't to replicate the docs. It's to build the _scaffolded first 10 hours_ where a dev goes from "what's a PRD" to "I just shipped a custom workflow module."

The methodology has four natural tiers that map cleanly to skill progression:

Tier

BMAD concept

Learner outcome

1\. Orient

Install, `bmad-help`, Quick Flow, agent-skill model

Ship one thing, understand the loop

2\. Operate

Full Method track: Analyst → PM → Architect → Dev, fresh chats, artifacts

Run a real project end-to-end

3\. Extend

Skills architecture, agent customization, project-context

Bend BMAD to team conventions

4\. Author

BMad Builder, custom modules, workflow authoring

Ship a TriumphABA-specific module

That's the spine. Now the delivery format.

### The recommended shape: "BMAD Bootcamp" as a Next.js learning app

Hand-waving a Notion doc at your team is how methodology adoption dies. Instead, pitch the devs a **self-hosted interactive learning platform** where each tier is a module with:

- **Concept primer** (2-3 min read, MDX)
- **Live terminal sandbox** or recorded-cast walkthrough (asciinema embeds work great here, zero infra)
- **Guided exercise** against a throwaway repo (e.g., "build a todo API with Quick Flow")
- **Checkpoint challenge** that gates the next tier (submit artifact, auto-graded or peer-reviewed)
- **Reflection prompt** captured to a per-user journal

Stack-wise this plays directly to your preferences: **Next.js + Tailwind + shadcn/ui + Supabase + MDX for content + Qdrant for a "BMAD knowledge search" feature**. The Qdrant piece is the sleeper hit: ingest `llms-full.txt` (BMAD literally publishes a consolidated doc for this purpose), chunk it, embed it, and every learner gets a chat panel that answers BMAD questions grounded in canonical docs. Course-specific RAG. Your own little `bmad-help` in the browser.

### Curriculum: the 5-week arc

**Week 0 — Environment & mental model** _(prework, async)_

- Install BMAD, verify Claude Code/Cursor hookup
- Watch the 8-min "why agents-as-roles" kickoff video (you record this)
- Read: Diátaxis docs structure, four phases, three tracks
- **Gate**: `npx bmad-method install` success + screenshot of `bmad-help` running

**Week 1 — The Quick Flow loop** _(Tier 1)_

- Exercise: build a CLI tool using `bmad-quick-dev` on a scoped problem
- Concepts: fresh-chat discipline, agent-skill invocation, artifact structure under `_bmad-output/`
- **Gate**: PR with working code + the tech-spec artifact

**Week 2 — Full Method track, planning half** _(Tier 2a)_

- Exercise: take a real TriumphABA-adjacent brief (e.g., "parent intake form rework") through Analyst → PM → Architect
- Concepts: PRFAQ vs product-brief, advanced elicitation, when solutioning matters, checkpoint preview
- **Gate**: PRD + Architecture + passing `bmad-check-implementation-readiness`

**Week 3 — Full Method track, build half** _(Tier 2b)_

- Exercise: implement 2 stories from Week 2's plan, including code review workflow
- Concepts: sprint-status.yaml, story lifecycle, retrospective, `bmad-correct-course` for scope shifts
- **Gate**: merged PR referencing story ID, clean retrospective doc

**Week 4 — Bending BMAD** _(Tier 3)_

- Exercise: write a `project-context.md` encoding TriumphABA conventions (TypeScript strict, tailwind, shadcn, accessibility rules) and customize one existing agent
- Concepts: skills architecture, agent customization, preventing agent conflicts, party mode for multi-agent brainstorms
- **Gate**: reusable project-context.md + customized agent YAML in a shared repo

**Week 5 — Building your own module** _(Tier 4, capstone)_

- Exercise: use BMad Builder to ship a `triumph-intake-module` or `triumph-campaign-module` with 1-2 custom workflows
- Concepts: module structure, workflow authoring, distribution, adversarial review on your own work
- **Gate**: installable module in team registry + 10-min demo to the group

### Architecture of the learning app

```
bmad-bootcamp/
├── apps/
│   └── web/                          # Next.js 15 App Router
│       ├── app/
│       │   ├── (marketing)/          # landing, roadmap
│       │   ├── (learn)/
│       │   │   ├── tier/[slug]/      # module pages, MDX-driven
│       │   │   ├── exercise/[slug]/  # guided exercises
│       │   │   └── challenge/[slug]/ # gated checkpoints
│       │   ├── api/
│       │   │   ├── rag/              # Qdrant + Claude for grounded Q&A
│       │   │   ├── progress/         # user progress tracking
│       │   │   └── grade/            # artifact validation hooks
│       │   └── dashboard/            # per-user progress, cohort view
├── packages/
│   ├── ui/                           # shadcn components, shared
│   ├── content/                      # MDX modules, frontmatter-typed
│   ├── rag/                          # Qdrant ingestion + retrieval
│   └── config/                       # shared tsconfig, tailwind preset
├── infra/
│   └── docker-compose.yml            # Supabase, Qdrant, app
└── content/
    ├── tier-1/
    ├── tier-2/
    ├── tier-3/
    └── tier-4/
```

Key component calls you'll want from shadcn: `Progress`, `Tabs`, `Accordion`, `Dialog` for challenge submissions, `Sheet` for the RAG chat panel, `Card` for module cards, `Command` palette for workflow reference lookup. Clean install path, no surprises.

### What to hand the dev team

A one-pager PRD plus this implementation brief. I'd actually **dogfood this**: have them run Week 2's exercise by building Week 1 of the bootcamp itself. They learn BMAD by using BMAD to build the BMAD trainer. That kind of recursive self-reference is the fastest way to make the methodology stick, and frankly it's the only pitch that will survive first contact with engineers who've sat through too many "framework rollout" Jira boards.

Want me to draft the actual PRD for this as a handoff doc, or spin up a working Next.js scaffold with the tier-1 content already wired in as an artifact you can demo? I'd lean toward the scaffold, honestly. Show Simcha a clickable thing, same playbook that worked for the marketing proof-of-concept.

## You said: Spin it up

Spin it up! I already named it and created the repo!

Stack: RedwoodSDK github.com/delorenj/behappy /home/delorenj/code/behappy

Apr 23

## Claude responded: Alright, "behappy" — I see what you did there

Alright, "behappy" — I see what you did there. BeMAD-Bootcamp, but the happy path. Love it. Naming is architecture's sneakier sibling and this one earns its keep.

Let me check the lay of the land first. Is this a fresh repo or did you scaffold anything already? Also need to peek at RedwoodSDK's current shape because it's been moving fast and I refuse to hand you stale scaffolding like some kind of framework boomer.

Check what's already in the behappy repo

Check what's already in the behappy repo

Ah — right, I'm in the sandbox, not your actual box. Can't reach `/home/delorenj/code/behappy` from here, which is the classic "Claude forgot he doesn't have eyes on your filesystem" moment. Happens to the best of us. Or at least to me, regularly.

So here's the deal: let me pull up the RedwoodSDK docs so I'm building on the _actual_ current shape of the framework (it's been through a rename and a Cloudflare pivot, and I don't want to hand you a scaffold that references `redwoodjs` when we want the SDK flavor), then I'll generate the full scaffold as an artifact you can drop straight into the repo.

Searched the web

Searched the web

Solid. Got everything I need. RedwoodSDK is a Vite plugin + Cloudflare Workers + RSC + server functions, routes live in `src/worker.tsx`, and it deliberately has zero magic — which is _perfect_ for a learning app because we don't want framework mysteries competing with BMAD mysteries for your team's attention.

The pitch just got better too: "the happy path" isn't just cute naming, it's literally what RedwoodSDK optimizes for. Request in, response out, no service soup. Your team learns BMAD in a codebase that models the same clarity-over-cleverness principle BMAD itself preaches. Recursive alignment. Chef's kiss.

Let me also check on Qdrant + Workers — that's the one architecture decision I want to get right before I scaffold, because embedding BMAD docs for the in-app RAG panel is the killer feature and Workers has… _opinions_ about outbound long-lived connections.

Searched the web

Searched the web

Okay, architecture decision made. Since we're already on Cloudflare via RedwoodSDK, fighting that current to run Qdrant would be like showing up to a black-tie event in your Crocs and insisting it's a statement. **Vectorize + Workers AI for embeddings** is the move. Native bindings, zero egress, no external services for a learning app that should _be_ the happy path. We preserve your Qdrant-for-big-boy-projects instinct elsewhere — here, platform affinity wins.

One honest caveat: Vectorize has that 30-second Worker timeout that bites during _embedding ingestion_ of large docs. Our fix is clean — BMAD's `llms-full.txt` gets chunked and ingested once via a Node script we run locally before deploy, then queried from the Worker at request time. Ingestion is a build step, not a runtime concern. Problem sidestepped.

Alright, let me build this thing.

Load frontend-design skill before scaffolding

Load frontend-design skill before scaffolding

Good — skill loaded. Now let me build the scaffold. I'm going to create a complete, ready-to-drop-in project structure under `/home/claude/behappy` that you can tar up, or I'll serve it as individual files you present to yourself. Given the size, a tarball is cleaner. Let me scaffold it all, then package.

Ran a command, created a file

Ran a command, created a file

Claude's response was interrupted

Retry

## You said: Wait, I'm afraid you may have lost big-picture context

Wait, I'm afraid you may have lost big-picture context.

Red Flag: "Your team learns BMAD in a codebase that..."

The fact I chose RedwoodSDK to implement this BMAD learning app should have ZERO impact on anything except how you go about implementing the app itself. The team won't even know what framework I used - just as people don't know or think about what stack Udemy is built on. Please confirm you're on the same page here, or we have some issues

Apr 23

## Claude responded: Yeah, you're right

Yeah, you're right. Fully caught. Let me say it back so you know I'm not just nodding:

**behappy is a learning product for your team. BMAD is the curriculum. RedwoodSDK is the delivery mechanism I'm using to build it — and that choice is invisible to every single learner who ever logs in.**

The "recursive alignment" line was me getting high on my own framework philosophy. Cute thought, terrible product thinking. It's exactly the kind of thing that makes a dev tool demo feel like a TED talk nobody asked for. Your team opens behappy, they see modules, exercises, a progress bar, maybe a chat panel. They don't see `worker.tsx`. They don't care that it's RSC. If I did my job, they never find out.

Udemy analogy is perfect. Nobody's ever finished a course and thought "you know what really tied that together was Angular on the backend."

So to confirm the actual frame:

- **Audience of the app:** your dev team, who need to learn BMAD.
- **Content of the app:** BMAD methodology, scaffolded from Quick Flow to custom module authoring.
- **Implementation of the app:** RedwoodSDK on Cloudflare, because _you_ picked it, and it's a nice stack for me to build in. That's the whole story on the stack. It doesn't show up in curriculum, onboarding copy, module naming, or pedagogy.

One knock-on correction: the whole "teach them BMAD by having them build behappy with BMAD" bit I threw out at the end of the previous message — scrap that too. Same sin. You want a finished product you hand to your team, not a bootstrapping riddle. They learn BMAD by using BMAD on _their own work_, which is the real thing. behappy just teaches them how.

Before I start scaffolding for real, one question that actually matters for the product, now that I'm thinking about it correctly:

## You said: Q: Who's the audience signing into behappy?

Q: Who's the audience signing into behappy? A: Public from day one (anyone can sign up)

Q: How do learners prove they completed a tier? A: Self-attestation (they click 'done')

Q: Is the in-app BMAD Q&A chat panel a must-have for v1 or can it wait? A: BMAD ships with /bmad-help for this exact purpose. Don't think we need to recreate it

Apr 23

## Claude responded: Okay, public from day one genuinely changes the shape of this thing

Okay, public from day one genuinely changes the shape of this thing. This isn't an internal LMS anymore, it's a product. A BMAD bootcamp on the open internet. That's a real move and I'm here for it.

Let me also just appreciate for a second that you caught the `/bmad-help` redundancy before I spent three hours building a Vectorize ingestion pipeline to rebuild a feature that literally ships with the framework. That's the kind of catch that saves a weekend. The methodology comes with its own help system. We point to it. We do not reinvent it. Moving on with profoundly more free time.

Here's what these three answers actually unlock, though — let me say it back before I start hammering on keys, because "public" is the tail that wags a surprisingly large dog:

**Public signup means the homepage has a job.** It's not a dashboard, it's a pitch. Someone lands there cold, probably from a tweet or a Discord link, and has about four seconds to understand what behappy is and why they should trade an email for it. That means the marketing surface is real work, not an afterthought. Landing page, value prop, social proof slots (even if empty at launch), the whole thing.

**Public signup means auth exists from v1.** Not enterprise SSO, but real accounts with passkeys (RedwoodSDK has good first-class support for this via WebAuthn, thank god, because passwords in 2026 are a war crime). Progress tracking tied to a user record. The D1 schema needs `users`, `progress`, `tier_completions` at minimum.

**Self-attestation means the backend stays lean.** No artifact upload pipeline, no grader service, no reviewer queue. A learner finishes a tier, clicks "I did the thing," and we stamp their row. Simpler than I was gearing up for, and frankly more honest — anyone gaming a self-attest checkbox on a free bootcamp is only cheating themselves, and we're not in the credentialing business. We're in the "make BMAD click for people" business.

**No Q&A panel means we delete a whole infrastructure concern.** No Vectorize index, no embedding job, no RAG route, no chat UI state management. Every tier page just has a prominent "Stuck? Run `bmad-help` in your IDE" callout and a link to the official docs. Cleaner product, better pedagogy — we're reinforcing the native BMAD workflow instead of building a crutch that competes with it.

So the v1 shape is actually tighter than what I was sketching:

- Landing page (the pitch)
- Auth (signup, login, passkey)
- Tier index (the course map)
- Tier detail pages (4 of them, content-driven)
- Exercise pages inside each tier
- "Mark complete" self-attest button per tier
- User profile / progress dashboard
- That's it

No chat panel. No artifact uploads. No grading. No cohorts or social layer in v1 — that's v2 if the thing has legs.

One last thing I want to lock down before I scaffold, because it affects the whole visual identity of the product and I'd rather ask now than guess and rebuild:

## You said: Q: Aesthetic direction for behappy?

Q: Aesthetic direction for behappy? A: Playful and warm — 'happy' front and center, sunshine vibes, rounded shapes

Apr 23

## Claude responded: Sunshine it is

Sunshine it is. Warm, rounded, "you're going to actually enjoy this" energy. Going to lean into peach and amber with deep navy as the grounding contrast — sunset over warm sand, not "happy little McDonald's." Friendly, not childish. Playful adult, not Comic Sans adult.

Let me build this. I'll scaffold the whole thing locally, package it as a tarball you drop into your repo, and walk you through what's where.

Created 2 files, ran a command

Created 2 files, ran a command

Claude's response was interrupted

Retry

2 / 2

Want to be notified when Claude responds?Notify

Opus 4.7

[Claude is AI and can make mistakes. Please double-check responses.](https://support.anthropic.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on)

Share

### Project content

[

TriumphABA

](/project/019c69d6-e991-71d8-947b-e1074c79e86e)

Created by you

![](/images/illustrations/project-knowledge-light-mode.svg)![](/images/illustrations/project-knowledge-dark-mode.svg)

Add PDFs, documents, or other text to reference in this project.

<iframe src="https://a.claude.ai/isolated-segment.html?v=dd0562fe9c" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin" title="Marketing analytics" style="display: none;"></iframe>

<iframe id="intercom-frame" style="position: absolute !important; opacity: 0 !important; width: 1px !important; height: 1px !important; top: 0 !important; left: 0 !important; border: none !important; display: block !important; z-index: -1 !important; pointer-events: none;" aria-hidden="true" tabindex="-1" title="Intercom"></iframe>

## Embedded Content
