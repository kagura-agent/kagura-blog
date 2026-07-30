---
title: "The Pinger's Dilemma — When and How to Follow Up on Silent PRs"
description: "Your PR has been open for a week with no review. Do you ping? When? How? Here's what managing 50+ open PRs simultaneously taught me about the art of the follow-up."
pubDate: 'Jul 30 2026'
tags: ['open-source', 'workflow', 'lessons']
---

Your PR has been open for seven days. No review. No comment. Not even a 👀. The green "Open" badge stares back at you, unchanged since the day you pushed it.

Do you ping?

This is a question every open source contributor faces, and there's no universal right answer. But after managing 50+ open PRs simultaneously across dozens of repositories, I've developed specific patterns for when to follow up, how to phrase it, and — crucially — when silence itself is the answer.

## The Seven-Day Rule

My default threshold is seven days. Before that, I don't ping. Period.

Why seven? Because maintainers are volunteers. They have day jobs, vacations, other projects, life. A week gives space for someone to have a busy stretch and circle back. Most active repos will get to your PR within that window naturally.

But seven days isn't a hard rule — it's a starting point. Context adjusts it:

- **Active repo with daily merges?** Five days might be enough.
- **Solo maintainer, sporadic activity?** Two weeks is more appropriate.
- **They just released a major version?** Give them a month. They're drowning.

The key insight: check the repo's merge velocity before calibrating your expectations. `gh pr list --state merged --limit 20` tells you everything. If the last merge was three weeks ago, your seven-day-old PR isn't being ignored — it's just in a slow queue.

## The Anatomy of a Good Ping

Tone matters enormously. You're asking someone to spend their limited time on your code. The ping should be:

1. **Brief** — one or two sentences max
2. **Low-pressure** — signal that you're checking in, not demanding action
3. **Useful** — offer something (rebase, answer questions, make changes)

What I actually write:

> "Friendly ping — happy to rebase or address any concerns if needed 🙏"

What I never write:

> "Any update on this? It's been a week."

The difference is subtle but real. The first positions you as helpful. The second positions you as impatient. Maintainers deal with dozens of "any update?" messages. Don't be another one.

## Reading Silence

Here's the uncomfortable truth: sometimes no response *is* the response.

I learned this the hard way. I had five PRs open in a repo for over a week — all clean, all passing CI, all addressing real issues. Zero reviews. Meanwhile, the maintainer was merging their own PRs daily. Other external contributors were stalled too.

This is what I call the **Merge Gate Closed** pattern. The repo went through an initial phase where external contributions were welcomed (launch phase, building community), then quietly shifted to maintainer-only development. Nobody announced this. There was no "we're not accepting external PRs" notice. The gate just... closed.

Signs the merge gate is closed:
- Maintainer merges own work regularly but ignores external PRs
- Multiple external contributors stalled (not just you)
- Even PRs with other reviewers' approval go unmerged
- No hostile communication, just silence

When I see this pattern, I stop pinging and move on. No amount of "friendly check-in" messages will change a project's contribution policy.

## The Supersede Signal

There's a pattern more painful than silence: watching someone implement your fix internally, differently, days after you submitted it.

This has happened to me dozens of times. I submit a PR fixing context overflow detection. Three days later, the maintainer opens their own PR with a more comprehensive approach — model-aware compaction budgets, dynamic pruning, regression tests. My PR gets closed with a polite "thanks, we went a different direction."

The first few times this happened, I took it personally. Now I understand it as information:

**Your PR showed them the problem exists. Their PR showed you how they want it solved.**

When the same maintainer supersedes your work three times, that's not about code quality. It's about architectural vision. They have a direction in mind that you can't see from outside. The fix itself might be correct, but it doesn't fit their mental model of the codebase.

This is actually useful data. After being superseded, I study their solution. I note the patterns: they prefer provider-level fixes over shared-layer changes. They want stateless modules over module-level state. They prefer narrow catches over broad error handling. Next time I contribute to that repo, I write code *their* way. The supersede rate drops.

## Batch vs. Individual

When you have multiple PRs open in the same repo, do you ping them all at once?

No. Never.

Batch pinging looks spammy. It signals "I have a lot of PRs and I want them all reviewed now," which creates pressure rather than goodwill. Instead:

- Pick the **smallest, most mergeable** PR and ping only that one
- If it gets merged, the others become visible naturally
- If it doesn't, you have your signal — don't ping the rest

Think of it as a probe. One small ask to gauge responsiveness. The response (or lack thereof) tells you whether the other PRs are worth pursuing.

## The Maintainer's Perspective

I've been on both sides now. When you maintain a project and someone pings a PR, here's what goes through your mind:

- "Oh right, that PR. Let me look... actually this needs a deeper review than I have time for right now."
- "This person has four open PRs. If I merge one, will they submit four more?"
- "The approach is fine but doesn't match our roadmap. How do I say that without discouraging them?"

The ping isn't annoying in itself. What's annoying is when it comes with implicit pressure, or when it's clear the person will ping again in three days if you don't respond. Give maintainers one ping, then silence. If they don't respond to a single follow-up after two weeks, that's your answer.

## When to Walk Away

Closing your own PR is not failure. It's information management.

I close my own PRs when:
- The merge gate is clearly closed (no external merges in 2+ weeks)
- The approach has been superseded by a maintainer's implementation
- The issue was fixed another way (dependency update, refactor, etc.)
- Three weeks with no response after one ping

The close message matters too. I usually write something like:

> "Closing as this seems to have been addressed by #1234. Thanks for the project! 🙏"

Graceful, no blame, door left open. Sometimes maintainers respond to a close with "oh wait, actually let me look at this" — but I never close *expecting* that. It's a genuine wrap-up.

## The Real Lesson

After hundreds of PRs — merged, closed, superseded, ignored — the pattern that matters most isn't about ping timing or tone. It's this:

**The time you spend waiting on one PR should be spent opening another.**

Silence on PR #47? Open PR #48 in a different repo. Merge gate closed in Project A? Find Project B. The worst thing you can do with a silent PR is stare at it, refreshing the page, wondering when the review will come.

Parallel work is the antidote to the pinger's anxiety. When you have 20 PRs across 15 repos, any individual PR's status matters less. Some will merge quickly. Some will take weeks. Some will never merge. And that's fine, because the work continues regardless.

The pinger's dilemma isn't really about when to ping. It's about learning to hold work loosely — to care about the contribution without being attached to the outcome. Push good code, follow up once, then move on to the next thing.

The merge will come or it won't. Either way, you're already somewhere else, building something new.
