import type { TierSlug } from "@/lib/progress";

export type Tier = {
  slug: TierSlug;
  number: string;
  title: string;
  summary: string;
  duration: string;
  primer: () => React.ReactNode;
  exercise: () => React.ReactNode;
  outcomes: string[];
  helpHint: string;
};

export const TIERS: Tier[] = [
  {
    slug: "orient",
    number: "01",
    title: "Orient",
    summary:
      "Install BMAD, run the help skill, ship a tiny artifact with Quick Flow. The objective is fluency, not depth.",
    duration: "60 min",
    outcomes: [
      "BMAD installed and verified",
      "bmad-help running in your IDE",
      "One Quick Flow artifact in your repo",
    ],
    helpHint:
      "Stuck on install or invocation? Run /bmad-help in your IDE. The framework's own help skill is canonical.",
    primer: () => (
      <>
        <p>
          BMAD is a methodology for building software with AI agents that play specific roles
          (Analyst, PM, Architect, Dev) instead of one omniscient assistant. The reason this
          matters: a single chat that's been asked to plan, design, and code rarely keeps any
          of those concerns straight. BMAD pushes you toward fresh chats with role-bounded
          context, which sounds like ceremony but turns out to be the thing that makes the
          output usable.
        </p>
        <p>
          You don't memorize BMAD. You discover it. Every BMAD-aware environment exposes a
          skill called <code>bmad-help</code> that introspects the installed modules and tells
          you what's available right now. That's the front door. If you ever feel lost, that
          command is the answer almost every time.
        </p>
        <p>
          Quick Flow is the smallest viable BMAD loop. You scope a problem, run one workflow,
          end up with a tech-spec artifact, and ship code. No ceremony beyond what earns its
          keep. Tier 1 ends when you've completed Quick Flow against a throwaway problem.
        </p>
        <h3>Mental model in 3 nouns</h3>
        <ul>
          <li>
            <strong>Module</strong> — a versioned bundle of agents, workflows, and skills
            (e.g., <code>core</code>, <code>bmm</code>, your team's custom one later).
          </li>
          <li>
            <strong>Workflow</strong> — a multi-step process you invoke (e.g.,{" "}
            <code>bmad-quick-dev</code>). Workflows produce artifacts.
          </li>
          <li>
            <strong>Skill</strong> — a focused capability an agent can invoke mid-workflow
            (e.g., elicitation, doc sharding). Skills compose.
          </li>
        </ul>
      </>
    ),
    exercise: () => (
      <>
        <h3>Exercise: Ship one Quick Flow artifact</h3>
        <p>
          Pick a problem small enough to fit on a sticky note. A CLI that converts JSON to
          YAML. A script that renames screenshots by timestamp. Something disposable.
        </p>
        <ol className="exercise__list">
          <li>
            Run <code>npx bmad-method@latest install</code> in a fresh test repo.
          </li>
          <li>
            In your IDE, invoke <code>/bmad-help</code> and confirm you see the available
            workflow list.
          </li>
          <li>
            Run <code>/bmad-quick-dev</code>. Answer its scoping prompts honestly. Do not
            polish your problem statement.
          </li>
          <li>
            Let the workflow produce a tech-spec artifact under <code>_bmad-output/</code>.
            Read it. Notice where it disagreed with your initial framing.
          </li>
          <li>
            Implement the work. Ship to a branch. Commit message references the artifact.
          </li>
        </ol>
        <p>
          <strong>Done when:</strong> the artifact exists, the code works, and you can name
          one thing the artifact made you reconsider.
        </p>
      </>
    ),
  },
  {
    slug: "operate",
    number: "02",
    title: "Operate",
    summary:
      "Run the Full Method track on a real (small) project. Analyst, PM, Architect, Dev — chained, in fresh chats, with artifacts at each handoff.",
    duration: "3-4 hours, spread across days",
    outcomes: [
      "A PRD you'd hand to a stakeholder",
      "An architecture doc that survives a teammate reading it cold",
      "A merged PR linked to a story ID",
    ],
    helpHint:
      "Lost on which workflow to invoke at which phase? /bmad-help groups them by phase. Read the descriptions; they're terse on purpose.",
    primer: () => (
      <>
        <p>
          The Full Method is BMAD with the safety rails on. Four phases, four agents, four
          fresh chats. Each phase consumes the prior phase's artifact and produces the next
          one. The discipline of the fresh chat is the entire trick — you start each phase
          with a clean context window and the prior artifact loaded, so the agent can't drift
          based on stale conversational baggage.
        </p>
        <h3>The four phases</h3>
        <ul>
          <li>
            <strong>Analyst</strong> — clarify the problem. Output: a brief that any other
            engineer could read and understand without you in the room.
          </li>
          <li>
            <strong>PM</strong> — turn the brief into a PRD with explicit scope, audience,
            non-goals, and success criteria. The non-goals are the load-bearing part.
          </li>
          <li>
            <strong>Architect</strong> — turn the PRD into a system shape. Modules, data
            flow, failure modes, deploy path. This phase is allowed to push back on the PRD;
            that's where most second drafts originate.
          </li>
          <li>
            <strong>Dev</strong> — implement story by story. Each story is small enough to
            land in a single PR. The architecture doc is the read-only contract.
          </li>
        </ul>
        <p>
          The thing that surprises most engineers running this for the first time is how
          much it slows down the planning half and how much it speeds up the build half.
          Tier 2 ends when you've felt that compression effect on a real problem.
        </p>
      </>
    ),
    exercise: () => (
      <>
        <h3>Exercise: a real small thing, end to end</h3>
        <p>
          Pick a feature you've actually been meaning to add. Not a hypothetical, not a
          tutorial app — something on your team's backlog that's been sitting there for a
          week or three. Small enough to ship in a few sessions.
        </p>
        <ol className="exercise__list">
          <li>
            Phase Analyst — open a fresh chat, run the analyst workflow, produce a brief.
            Save the artifact, close the chat.
          </li>
          <li>
            Phase PM — fresh chat, load the brief, run the PRD workflow. Resist the urge to
            re-litigate scope; the brief is canonical now. Save artifact.
          </li>
          <li>
            Phase Architect — fresh chat, load the PRD, run the architecture workflow. If
            the architect agent wants to push back on the PRD, let it. Adjust the PRD if the
            pushback is good.
          </li>
          <li>
            Phase Dev — fresh chat per story. Load the architecture doc. Implement. Open a
            PR that references the story ID in its description.
          </li>
          <li>Merge it. Note how the PR review went compared to your usual pace.</li>
        </ol>
        <p>
          <strong>Done when:</strong> three artifacts (brief, PRD, architecture) exist in
          your repo and at least one story has shipped to main.
        </p>
      </>
    ),
  },
  {
    slug: "extend",
    number: "03",
    title: "Extend",
    summary:
      "Bend BMAD to your team's conventions. Author a project context, customize one agent, learn what the skills layer is actually for.",
    duration: "2-3 hours",
    outcomes: [
      "A reusable project-context that encodes your team's house rules",
      "One customized agent with a documented override",
      "An understanding of when to write a skill vs a workflow",
    ],
    helpHint:
      "When something feels rigid, check /bmad-customize. Most apparent rigidity is actually unset configuration.",
    primer: () => (
      <>
        <p>
          BMAD ships opinionated. That's a feature in week one. By week three you'll want to
          tell it which language to default to, which framework conventions to assume, which
          file paths your team prefers, and which agents need a tweak to behave on your
          codebase. That's what the customization layer is for.
        </p>
        <h3>The three customization surfaces</h3>
        <ul>
          <li>
            <strong>Project context</strong> — a single file (typically{" "}
            <code>project-context.md</code>) that every agent loads. House rules, stack
            choices, naming conventions, accessibility commitments, the things you'd
            otherwise repeat to every fresh chat.
          </li>
          <li>
            <strong>Agent customization</strong> — overrides scoped to a single agent. Lives
            under <code>_bmad/custom/</code>. Use when one agent's defaults are wrong for
            your team but you don't want to fork.
          </li>
          <li>
            <strong>Skills</strong> — the smallest reusable unit. A skill is a focused
            capability (an elicitation pattern, a doc sharding heuristic) that any agent in
            any workflow can invoke. Skills compose; workflows orchestrate.
          </li>
        </ul>
        <p>
          The skill vs workflow distinction matters more than it sounds. If you find
          yourself wanting "a workflow that reviews docs," you probably want a review skill
          that several workflows can call. If you find yourself wanting "a sequence of
          steps with checkpoints," that's a workflow.
        </p>
      </>
    ),
    exercise: () => (
      <>
        <h3>Exercise: encode your team's house rules</h3>
        <ol className="exercise__list">
          <li>
            Write <code>_bmad/custom/project-context.md</code>. Cover at minimum: language,
            framework, testing approach, accessibility floor, naming preferences, anything
            you find yourself correcting agents on repeatedly.
          </li>
          <li>
            Pick one agent that consistently outputs in a way you have to correct. Open
            <code> /bmad-customize</code>. Walk through the override flow. Save the result.
          </li>
          <li>
            Run a Quick Flow with the new context loaded. Compare the output to a Quick
            Flow you ran in Tier 1. Note what changed.
          </li>
          <li>
            Commit the customization. Push to your shared repo. Tell one teammate to pull
            and try it.
          </li>
        </ol>
        <p>
          <strong>Done when:</strong> a teammate other than you has used your customization
          and not had to re-correct an agent on a house rule.
        </p>
      </>
    ),
  },
  {
    slug: "author",
    number: "04",
    title: "Author",
    summary:
      "Use the BMad Builder to ship a custom module with one or two original workflows. Distribute it to your team.",
    duration: "Half a day, give or take",
    outcomes: [
      "An installable module in a shared registry",
      "One workflow that does something genuinely useful for your team",
      "A 10-minute demo for the rest of the cohort",
    ],
    helpHint:
      "The Builder has its own help surface. Run /bmad-help inside a Builder session to see the authoring-specific workflows.",
    primer: () => (
      <>
        <p>
          The BMad Builder is BMAD's self-hosting moment. You use BMAD to build BMAD modules.
          The recursion is satisfying and also load-bearing — it means the authoring
          experience is the same shape as the using experience, and the things that frustrate
          you as a user become things you can fix as an author.
        </p>
        <h3>Anatomy of a module</h3>
        <ul>
          <li>
            <strong>config.toml</strong> — module metadata, version, exposed workflows.
          </li>
          <li>
            <strong>workflows/</strong> — markdown files that define multi-step processes.
            Each step can call skills, prompt for input, write artifacts.
          </li>
          <li>
            <strong>skills/</strong> — reusable capabilities your workflows compose.
          </li>
          <li>
            <strong>module-help.csv</strong> — what shows up when someone runs{" "}
            <code>bmad-help</code> in a project that has your module installed.
          </li>
        </ul>
        <p>
          You ship via a registry. For internal use, that registry can be as simple as a Git
          repo your install command knows about. For wider distribution there's a published
          path; for now, a private registry is plenty.
        </p>
      </>
    ),
    exercise: () => (
      <>
        <h3>Capstone: ship a module to your team</h3>
        <ol className="exercise__list">
          <li>
            Pick a workflow shape your team does manually that would benefit from
            scaffolding. Onboarding a new repo. Generating a runbook. Reviewing a PR
            against your style guide.
          </li>
          <li>
            Open the BMad Builder. Run the module-init workflow. Name the module. Generate
            the skeleton.
          </li>
          <li>
            Author one workflow. Use one or two skills. Keep the workflow short — one or
            two screens of markdown is plenty.
          </li>
          <li>
            Install the module locally. Run it against a real example. Iterate until it
            saves you actual time.
          </li>
          <li>
            Push the module to your team's registry. Demo it to the cohort. Ten minutes,
            no slides, live invocation.
          </li>
        </ol>
        <p>
          <strong>Done when:</strong> a teammate has installed and run your module on their
          machine, and reported either "this is useful" or "this is useful with these
          tweaks." Either answer counts.
        </p>
      </>
    ),
  },
];

export const TIER_BY_SLUG = Object.fromEntries(TIERS.map((t) => [t.slug, t])) as Record<TierSlug, Tier>;
