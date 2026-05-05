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
            <strong>Module</strong>: a versioned bundle of agents, workflows, and skills
            (e.g., <code>core</code>, <code>bmm</code>, your team's custom one later).
          </li>
          <li>
            <strong>Workflow</strong>: a multi-step process you invoke (e.g.,{" "}
            <code>bmad-quick-dev</code>). Workflows produce artifacts.
          </li>
          <li>
            <strong>Skill</strong>: a focused capability an agent can invoke mid-workflow
            (e.g., elicitation, doc sharding). Skills compose.
          </li>
        </ul>
      </>
    ),
    exercise: () => (
      <>
        <h3>Exercise: Ship one Quick Flow artifact in trinote2.0</h3>
        <p>
          Pick a problem small enough to fit on a sticky note. For your trinote2.0
          checkout, that's something like:
        </p>
        <ul>
          <li>
            A <code>scripts/export_session_md.py</code> CLI that takes a session id and
            writes the session's notes as a markdown file under{" "}
            <code>_bmad-output/exports/</code>.
          </li>
          <li>
            A <code>scripts/note_word_count.py</code> CLI that prints the longest five
            notes by body length, useful when you're auditing which entries should get
            split.
          </li>
          <li>
            Something equally small you've been wanting in <code>scripts/</code>. Stay
            disposable.
          </li>
        </ul>
        <ol className="exercise__list">
          <li>
            From <code>~/code/trinote2.0</code>, confirm BMAD is installed{" "}
            (<code>ls _bmad/</code> should show <code>bmm/</code> and <code>core/</code>).
          </li>
          <li>
            In your IDE, invoke <code>/bmad-help</code> and confirm the workflow menu lists{" "}
            <code>bmad-quick-dev</code>.
          </li>
          <li>
            Run <code>/bmad-quick-dev</code>. Answer its scoping prompts honestly. Do not
            polish your problem statement, the workflow will push back if it needs to.
          </li>
          <li>
            Let the workflow produce a tech-spec artifact under{" "}
            <code>_bmad-output/quick-dev/</code>. Read it. Notice where it disagreed with
            your initial framing.
          </li>
          <li>
            Implement the script. Wire a pytest under <code>tests/</code> that exercises
            the happy path against a fixture session id. Open a PR; the commit message
            references the artifact path.
          </li>
        </ol>
        <p>
          <strong>Done when:</strong> the script runs against a real trinote db, the
          pytest passes, and you can name one thing the tech-spec made you reconsider.
        </p>
      </>
    ),
  },
  {
    slug: "operate",
    number: "02",
    title: "Operate",
    summary:
      "Run the Full Method track on a real (small) project. Analyst, PM, Architect, Dev. Chained, in fresh chats, with artifacts at each handoff.",
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
          one. The discipline of the fresh chat is the entire trick. You start each phase
          with a clean context window and the prior artifact loaded, so the agent can't drift
          based on stale conversational baggage.
        </p>
        <h3>The four phases</h3>
        <ul>
          <li>
            <strong>Analyst</strong>: clarify the problem. Output: a brief that any other
            engineer could read and understand without you in the room.
          </li>
          <li>
            <strong>PM</strong>: turn the brief into a PRD with explicit scope, audience,
            non-goals, and success criteria. The non-goals are the load-bearing part.
          </li>
          <li>
            <strong>Architect</strong>: turn the PRD into a system shape. Modules, data
            flow, failure modes, deploy path. This phase is allowed to push back on the PRD;
            that's where most second drafts originate.
          </li>
          <li>
            <strong>Dev</strong>: implement story by story. Each story is small enough to
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
        <h3>Exercise: a real trinote feature, end to end</h3>
        <p>
          Pick a feature on your trinote2.0 backlog that's been sitting there for a week
          or three. Good candidates if your backlog is empty:
        </p>
        <ul>
          <li>
            <strong>Saved searches for the notes list</strong>: persist a named filter
            (tag set + body keyword + date range) per user.
          </li>
          <li>
            <strong>Session detail print view</strong>: a clean, paginated print
            stylesheet for the session detail page (the kind of thing{" "}
            <code>SESSION_DETAIL_IMPROVEMENTS.md</code> hints at).
          </li>
          <li>
            <strong>Phone log dedupe</strong>: collapse near-duplicate phone log entries
            (same number, same minute) into a single grouped row.
          </li>
        </ul>
        <ol className="exercise__list">
          <li>
            Phase Analyst. Fresh chat, <code>cd ~/code/trinote2.0</code>, run the
            analyst workflow, produce a brief. Save under{" "}
            <code>_bmad-output/analyst/</code>. Close the chat.
          </li>
          <li>
            Phase PM. Fresh chat, load the brief, run the PRD workflow. The brief is
            canonical now, do not re-litigate scope. Save under{" "}
            <code>_bmad-output/prd/</code>.
          </li>
          <li>
            Phase Architect. Fresh chat, load the PRD, run the architecture workflow.
            For trinote, expect calls about which blueprint owns the route (
            <code>app/blueprints/</code>), whether logic belongs in a service (
            <code>app/services/</code>), and whether the schema change needs a migration
            under <code>migrations/</code>. If the architect pushes back on the PRD, let
            it. Adjust the PRD if the pushback is good.
          </li>
          <li>
            Phase Dev. Fresh chat per story. Load the architecture doc. Implement.
            Integration tests go under <code>integration_tests/</code>, unit tests under{" "}
            <code>tests/</code>. Open a PR that references the story ID.
          </li>
          <li>
            Merge. Note how the PR review went compared to your usual cycle on trinote.
          </li>
        </ol>
        <p>
          <strong>Done when:</strong> brief, PRD, and architecture artifacts exist in
          trinote's <code>_bmad-output/</code>, and at least one story has shipped to{" "}
          <code>main</code>.
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
            <strong>Project context</strong>: a single file (typically{" "}
            <code>project-context.md</code>) that every agent loads. House rules, stack
            choices, naming conventions, accessibility commitments, the things you'd
            otherwise repeat to every fresh chat.
          </li>
          <li>
            <strong>Agent customization</strong>: overrides scoped to a single agent. Lives
            under <code>_bmad/custom/</code>. Use when one agent's defaults are wrong for
            your team but you don't want to fork.
          </li>
          <li>
            <strong>Skills</strong>: the smallest reusable unit. A skill is a focused
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
        <h3>Exercise: encode trinote2.0's house rules</h3>
        <ol className="exercise__list">
          <li>
            Write <code>_bmad/custom/project-context.md</code> in trinote2.0. Cover at
            minimum:
            <ul>
              <li>
                <strong>Stack</strong>: Python 3.8+, Flask, SQL Server primary,
                PostgreSQL secondary, HashiCorp Vault for secrets. Mise for env
                management.
              </li>
              <li>
                <strong>Layout</strong>: routes registered in{" "}
                <code>app/blueprints/</code>, business logic in{" "}
                <code>app/services/</code>, ORM models in <code>app/models/</code>.
                Database access only through <code>app/database.py</code>.
              </li>
              <li>
                <strong>Testing</strong>: unit tests under <code>tests/</code>,
                integration tests under <code>integration_tests/</code>. Pytest is
                canonical. Production validation lives in{" "}
                <code>tests/production_validation_test.py</code>.
              </li>
              <li>
                <strong>Migrations</strong>: never edit a shipped migration. Add a new
                file under <code>migrations/</code>.
              </li>
              <li>
                <strong>Secrets</strong>: never hardcode. Reference via Vault.
              </li>
            </ul>
          </li>
          <li>
            Pick one agent that consistently outputs in a way you have to correct (the
            usual suspects: dev defaulting to JS, architect proposing nosql, PM omitting
            migrations from the plan). Open <code>/bmad-customize</code>. Walk through
            the override flow. Save the result under <code>_bmad/custom/</code>.
          </li>
          <li>
            Run a Quick Flow with the new context loaded against a small trinote task.
            Compare the output to the Tier 1 Quick Flow on the same repo. Note what
            changed (no more "set up a virtualenv" filler, no more reinventing your
            blueprint pattern).
          </li>
          <li>
            Commit the customization. Push. Pair with one teammate to pull and run a
            Quick Flow on their branch. They should not have to correct an agent on a
            house rule you encoded.
          </li>
        </ol>
        <p>
          <strong>Done when:</strong> a teammate other than you has used your
          customization and not had to re-correct an agent on a trinote convention.
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
          The recursion is satisfying and also load-bearing. It means the authoring
          experience is the same shape as the using experience, and the things that frustrate
          you as a user become things you can fix as an author.
        </p>
        <h3>Anatomy of a module</h3>
        <ul>
          <li>
            <strong>config.toml</strong>: module metadata, version, exposed workflows.
          </li>
          <li>
            <strong>workflows/</strong>: markdown files that define multi-step processes.
            Each step can call skills, prompt for input, write artifacts.
          </li>
          <li>
            <strong>skills/</strong>: reusable capabilities your workflows compose.
          </li>
          <li>
            <strong>module-help.csv</strong>: what shows up when someone runs{" "}
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
        <h3>Capstone: ship <code>bmad-trello-triage</code> using the team's MCP server</h3>
        <p>
          We are going to author a real, useful, distribution-ready module. Goal: turn the
          Trello board into a self-driving triage queue. The module exposes a workflow
          called <code>/triage-board</code> that picks the next ticket, drafts a quick
          tech-spec, and marks the card "In Progress". All via{" "}
          <a
            href="https://github.com/delorenj/mcp-server-trello"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--color-amber-deep)", textDecoration: "underline" }}
          >
            mcp-server-trello
          </a>
          . When you finish, the team installs it once and triage stops being a meeting.
        </p>

        <h3>Step 1. Wire the MCP server</h3>
        <ol className="exercise__list">
          <li>
            Install the Trello MCP server in your IDE's MCP config. Required env:{" "}
            <code>TRELLO_API_KEY</code>, <code>TRELLO_TOKEN</code>. Optional:{" "}
            <code>TRELLO_BOARD_ID</code>, <code>TRELLO_WORKSPACE_ID</code>. Pull keys
            from 1Password.
          </li>
          <li>
            Verify in the IDE that <code>list_boards</code>, <code>set_active_board</code>,{" "}
            <code>get_cards_by_list_id</code>, <code>update_card_details</code>,{" "}
            <code>move_card</code>, and <code>add_comment</code> tools are all callable.
          </li>
          <li>
            Set the active board to the Trinote backlog board. Confirm{" "}
            <code>list_boards</code> returns the right list IDs for{" "}
            <em>Needs Triage</em>, <em>Backlog</em>, <em>In Progress</em>, and{" "}
            <em>Done</em>.
          </li>
        </ol>

        <h3>Step 2. Scaffold the module with BMad Builder</h3>
        <ol className="exercise__list">
          <li>
            Run <code>/bmad-bmb-module</code>. Name the module{" "}
            <code>bmad-trello-triage</code>. Output target:{" "}
            <code>~/code/bmad-trello-triage</code>.
          </li>
          <li>
            The Builder generates a skeleton: <code>config.toml</code>,{" "}
            <code>module-help.csv</code>, <code>workflows/</code>,{" "}
            <code>skills/</code>, and a <code>README.md</code>. Verify the skeleton
            installs locally with <code>npx bmad-method install --module ./</code>.
          </li>
        </ol>

        <h3>Step 3. Author the <code>triage-board</code> workflow</h3>
        <p>The workflow file is markdown. Three steps, each a short section:</p>
        <ol className="exercise__list">
          <li>
            <strong>Pick a card.</strong> Call <code>get_cards_by_list_id</code> on the{" "}
            <em>Needs Triage</em> list. Score by (priority label, age, lack of assignee).
            Return the top-scoring card. If none, fall back to <em>Backlog</em>.
          </li>
          <li>
            <strong>Draft the spec.</strong> Pull the card body, attached comments, and
            any linked Trinote files. Run <code>/bmad-bmm-quick-spec</code> with that as
            seed context. Save the artifact under{" "}
            <code>_bmad-output/triage/&lt;card-id&gt;.md</code>.
          </li>
          <li>
            <strong>Move the card and comment.</strong> Call <code>move_card</code> to
            the <em>In Progress</em> list. Call <code>add_comment</code> with a link to
            the artifact path and a one-line summary. Stamp the card description with{" "}
            <code>spec: _bmad-output/triage/&lt;card-id&gt;.md</code>.
          </li>
        </ol>

        <h3>Step 4. Add a guard skill</h3>
        <p>
          Add a tiny skill <code>skills/check-board-state.md</code> the workflow calls
          first. It refuses to run if more than 2 cards are already <em>In Progress</em>
          {" "}for you. The constraint enforces single-piece flow and means the team can
          run <code>/triage-board</code> safely on a cron without ballooning WIP.
        </p>

        <h3>Step 5. Distribute</h3>
        <ol className="exercise__list">
          <li>
            Push the module to <code>github.com/delorenj/bmad-trello-triage</code>.
          </li>
          <li>
            Add it to the team's BMAD registry index (or document the install command in
            the README: <code>npx bmad-method add @delorenj/bmad-trello-triage</code>).
          </li>
          <li>
            Demo to the cohort. Live, no slides. Run <code>/triage-board</code> on a real
            backlog card. Show the card moving to <em>In Progress</em> in real time and
            the artifact landing on disk.
          </li>
        </ol>
        <p>
          <strong>Done when:</strong> a teammate has installed the module on their
          machine, run <code>/triage-board</code> against the real Trello board, watched
          a card move and a spec land, and either said "this is useful" or "this is
          useful with these tweaks." Either answer ships you the BMAD-fluent badge.
        </p>
      </>
    ),
  },
];

export const TIER_BY_SLUG = Object.fromEntries(TIERS.map((t) => [t.slug, t])) as Record<TierSlug, Tier>;
