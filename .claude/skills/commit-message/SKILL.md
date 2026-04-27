---
name: commit-message
description: >
  Stages git changes, analyzes the diff to generate a clear, conventional commit message,
  shows the user a summary of what's changing, and commits after approval. Use this skill
  whenever the user wants to commit their work — whether they say "commit my changes",
  "generate a commit message", "stage and commit", "what should my commit message be",
  "ship it", "commit this", or anything that signals they want to record their current
  work in git. Also trigger when the user asks to "commit and push" (commit first, then push).
  Do NOT skip this skill just because the request is casual — it applies any time the user
  wants to capture their current work in a git commit.
---

# Commit Message Generator

Your job is to examine what changed, write a meaningful conventional commit message, get
the user's sign-off, and create the commit. The emphasis is on *meaningful*: a message
like `feat(events): add gvg-standings promotional dialog with countdown timer` is far
more useful to the team than `update files` or `various changes`.

## Step 1: Health check

Before staging anything, check for conditions that would make committing unsafe or
impossible. Run these in parallel:

```bash
git status --porcelain
git branch --show-current
git diff --check 2>&1 | head -20
```

Interpret the results:

- **No changes** (`git status` returns empty): Tell the user there's nothing to commit.
  Show the last commit for context. Stop here.
- **Detached HEAD** (`git branch --show-current` returns empty): Warn the user they're
  in a detached HEAD state. Committing here creates an orphan commit that's easy to lose.
  Ask if they want to create a branch first (`git checkout -b <branch-name>`). Do not
  proceed until they confirm or decline.
- **Merge conflicts present** (`git diff --check` shows conflict markers): List the
  conflicted files and stop. Tell the user to resolve conflicts before committing.
- **Everything looks fine**: Proceed to Step 2.

## Step 2: Understand the changes

Run these to build a complete picture of what's changing:

```bash
git status -s
git diff HEAD --stat
git diff HEAD
```

Read all three outputs carefully. You need to understand:
- Which files changed and how many lines
- The *intent* behind the changes, not just the mechanics
- Which parts of the codebase are affected (feature domain, infrastructure, config, etc.)

For large diffs (>500 lines), focus on:
1. File names and stats — they reveal scope quickly
2. The first 30 lines of each changed file's diff — usually enough to understand intent
3. Any new exports, API changes, or schema changes — these have the most impact

## Step 3: Stage the changes

By default, stage everything:

```bash
git add -A
```

If the user has specified they want to stage only certain files, use:

```bash
git add <file1> <file2> ...
```

After staging, run `git diff --cached --stat` to confirm what's staged and show it to
the user as a clean summary:

```
Staged changes:
  modified: components/events/dialog.gvg-standings.tsx    (+142 / -3)
  modified: app/(dashboard)/page.tsx                      (+8 / -2)
```

## Step 4: Generate the commit message

Based on your analysis of the diff, compose a conventional commit message.

### Conventional commit format

```
<type>(<scope>): <short description>

[optional body — only when context is genuinely needed]
```

**Type** — pick the one that best describes the primary change:

| Type | When to use |
|------|-------------|
| `feat` | A new feature, component, page, or user-facing capability |
| `fix` | Bug fix — something was broken, now it isn't |
| `refactor` | Code restructuring with no behavior change |
| `style` | Formatting, CSS/Tailwind changes, visual-only tweaks |
| `chore` | Config changes, dependency updates, tooling, cleanup |
| `docs` | Documentation only |
| `test` | Adding or changing tests |
| `perf` | Performance improvements |
| `build` | Build system, CI, or infrastructure changes |
| `revert` | Reverting a previous commit |

**Scope** — the feature domain, route, or component name (keep it concise):
- Good: `events`, `auth`, `rankings`, `dashboard`, `dialog`
- Avoid: overly broad scopes like `app` or `misc`
- Omit if the change is truly global (e.g., `chore: upgrade tailwind to v4`)

**Short description** — imperative mood, under 72 characters, no period:
- ✓ `add gvg-standings promotional dialog with countdown`
- ✓ `fix session token expiry not clearing on logout`
- ✗ `Added the standings dialog component`
- ✗ `changes to events`

**Body** — only add a body when:
- The commit reverts something (reference the reverted SHA)
- There's a non-obvious reason behind a decision (e.g., a workaround for a browser bug)
- Breaking changes need callout

For most day-to-day commits, the subject line alone is enough. Don't pad with unnecessary
body text just to seem thorough.

### Multiple concerns in one diff

If the staged changes clearly cover multiple unrelated concerns (e.g., a new component
*and* an unrelated bug fix), write the message for the dominant change and briefly note
the secondary one. Example:

```
feat(events): add gvg-standings promotional dialog

Also fixes missing null check on participant count in leaderboard.
```

## Step 5: Present and confirm

Show the user the full picture before committing:

```
─────────────────────────────────────────
  Staged changes (3 files):
    M  components/events/dialog.gvg-standings.tsx   (+142 / -3)
    M  app/(dashboard)/page.tsx                     (+8 / -2)
    A  components/events/actions.events.ts          (+67)

  Proposed commit message:
    feat(events): add gvg-standings promotional dialog with countdown

─────────────────────────────────────────
  [C] Commit  [E] Edit message  [A] Abort
```

Wait for the user's response:
- **"c" / "commit" / "yes" / "lgtm" / "looks good" / (no response to just proceed)**:
  Commit with the proposed message.
- **"e" / "edit" / they provide a new message inline**: Use their message (or updated
  version) instead.
- **"a" / "abort" / "cancel" / "no"**: Unstage everything (`git reset HEAD`) and stop.

If the user corrects the message, don't argue — just use what they gave you.

## Step 6: Commit

```bash
git commit -m "<message>"
```

On success, show:
```
✓ Committed: feat(events): add gvg-standings promotional dialog with countdown
  Branch: dev | SHA: abc1234
```

On failure (e.g., pre-commit hook rejection), show the hook output in full and explain
what failed. Do not retry automatically — let the user decide how to respond.

## Step 7: Ask about pushing (only if not already requested)

If the user only asked to "commit" (not "commit and push"), ask once:

```
Push to origin/dev? [Y/n]
```

If yes, run `git push`. If no remote is configured, show a helpful note:
```
No remote configured. Add one with:
  git remote add origin <url>
```

If the user originally said "commit and push", skip asking and push immediately after
the commit succeeds.

---

## Edge case quick reference

| Situation | Action |
|-----------|--------|
| Nothing staged after `git add -A` | Inform user, check for `.gitignore` issues |
| Commit hook fails | Show full hook output, stop, ask user what to do |
| Push rejected (non-fast-forward) | Show the rejection, suggest `git pull --rebase` |
| No upstream branch | Offer `git push -u origin <branch>` |
| Detached HEAD | Warn before staging; offer to create a branch |
| Merge conflicts | List files, stop, don't stage anything |
