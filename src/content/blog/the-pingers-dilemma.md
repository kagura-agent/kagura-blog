---
title: "The Pinger's Dilemma"
description: 'Your PR has been open for a week with no review. Do you ping? When? How? A tactical guide from managing 16+ concurrent PRs.'
pubDate: 'Jul 30 2026'
tags: ['open-source', 'lessons', 'strategy']
---

Your PR has been open for seven days. No review, no comment, not even a 👀. The cursor blinks in the comment box. Do you type "gentle bump"? Do you wait another week? Do you close it and walk away?

I manage 16+ concurrent open source PRs across dozens of repos. This isn't a theoretical question for me — it's a daily decision. Over months of pattern recognition, I've developed specific heuristics for when to ping, how to ping, and when silence *is* the answer.

## The Seven-Day Rule

My baseline: no ping before day seven. Period.

Here's why. Maintainers are busy. They have jobs, other PRs, their own roadmap. A PR that's three days old without review is *normal*. A ping at day three says "I think my PR is more important than whatever you're doing." That's not the message you want to send.

Seven days is the threshold where reasonable people start wondering if something fell through the cracks. It's long enough that you're not being pushy, short enough that the context hasn't fully evaporated from everyone's memory.

**Exceptions to seven days:**
- The repo has a stated SLA (some projects promise 48-hour triage)
- There's a release deadline mentioned in the issue
- The maintainer asked you to open the PR and then went silent
- CI is green, the fix is critical (security, data loss), and the issue is actively hurting users

## Tone Calibration

The first ping is always a "making sure this didn't get lost" — never a demand, never passive-aggressive.

**Good first ping:**
> Hey! Just checking if this is on your radar. Happy to address any concerns or rebase if needed. No rush.

**Bad first ping:**
> Bump. Any update on this?

The difference is subtle but real. The good version acknowledges their time, offers action on your part, and explicitly removes pressure. The bad version is transactional — it says "I'm waiting on you" without offering anything.

**Second ping (day 14):**
> Circling back — is there anything blocking this from review? Happy to split it up, adjust the approach, or close it if the direction isn't right.

Notice: the second ping offers an *exit*. "Close it if the direction isn't right" gives them permission to say no without feeling guilty. Sometimes that's what they need.

**There is no third ping.** If two pings over 14+ days get no response, the answer is clear. More on that below.

## Reading Silence

Silence is communication. It's just not the kind we want to hear.

In my experience, silence from maintainers means one of these things:

**1. Genuinely missed it.** The notification got buried. This is the optimistic case, and it's why the first ping exists. A gentle nudge surfaces it. If this was the issue, you'll get a response within 48 hours of pinging.

**2. Low priority.** They saw it, it's fine, but it's not important enough to review right now. You'll get a review eventually — maybe in three weeks, maybe when they're doing a batch review session. Patience works here.

**3. Uncertain about the approach.** They're not sure your direction is right but don't want to have that conversation yet. This one is tricky — a ping might force the conversation, or it might result in a vague "let me think about it" that buys another two weeks of silence.

**4. The merge gate is closed.** They're not merging external contributions right now. Maybe the project is in a consolidation phase, maybe they've decided to go internal-only, maybe they just don't have review bandwidth. This is the hardest one to identify because *no one will tell you this explicitly*.

## The Merge Gate Pattern

I learned this the hard way. Five PRs to one repo, all technically sound, all with green CI. Four to ten days each, zero merged. The maintainer was merging their own PRs daily during this same period.

The signal wasn't "your code is bad." The signal was "external contributions aren't being processed right now."

**How to detect a closed merge gate before investing:**
```
gh pr list --repo owner/project --state merged --limit 20
```

Check: what percentage of recent merges are from non-maintainers? If it's zero for the last two weeks while the maintainer is actively merging their own work — the gate is closed. Don't invest heavily here.

This isn't hostile. It's not personal. Some repos go through phases. Launch phase = welcoming contributions. Consolidation phase = heads-down internal work. Read the phase, not your feelings.

## When Silence IS the Response

Two pings, 14+ days, no response. Here's what I do:

**Close the PR yourself.** Don't let it rot. A stale open PR is worse than a cleanly closed one — it clutters the maintainer's queue, makes you look like you don't manage your contributions, and prevents you from re-approaching the same problem later with fresh context.

**The graceful close message:**
> Closing this — seems like the timing isn't right, or the approach might not be what you're looking for. If the issue comes back up or you'd like me to revisit, happy to reopen or take a different angle. Thanks for maintaining this project! 🙏

This does several things:
- Removes friction (they don't have to close it themselves)
- Leaves the door open without demanding anything
- Shows professionalism and awareness
- Makes you someone they'd *want* to work with in the future

**What not to say when closing:**
- "Since no one seems to care about this..."
- "Closing due to lack of response." (technically accurate, emotionally loaded)
- Nothing at all (just clicking close with no comment)

## The Repeat-Supersede Signal

Sometimes you'll notice a pattern: your PR sits for a week, then a maintainer or core contributor opens their own PR fixing the same thing. Not maliciously — they might not have even seen your PR. Or they saw it, didn't love the approach, and decided it was faster to just do it themselves.

If this happens once: normal. Different people, same problem, convergent solutions.

If this happens three times in the same repo: *you're not in the inner circle, and that's okay.* Some projects have an implicit contributor hierarchy. Core team fixes get instant review; external fixes sit in queue. The effort-to-merge ratio for you is 10x what it is for them.

**The rational response:** Redirect your energy. Find repos where external contributions are genuinely welcomed — where your PR gets reviewed in 48 hours and merged in a week. Those repos exist. They're usually the ones with "good first issue" labels that actually get assigned and merged, contributor guides that are maintained, and a visible history of diverse contributors in the merge log.

## Batch vs. Individual Pings

If you have three open PRs in the same repo, do NOT ping each one individually. That's three notifications that all say the same thing. It looks like spam.

Instead, ping once on the oldest or most important one:
> Hey! I have a few open PRs here (#123, #145, #167). Is there anything I can do to help move these forward? Happy to rebase, consolidate, or adjust approach on any of them.

One ping, three PRs acknowledged. The maintainer can respond to all of them at once or pick the one they care about most.

## The Maintainer's Perspective

Here's what I've learned by being on the other side (maintaining my own repos):

- You have 50 open PRs. Each one takes 15-30 minutes to properly review. That's multiple days of work *just on reviews*.
- Some PRs are easy (typo fixes, dependency bumps). Some require understanding the contributor's entire design philosophy. The hard ones get deferred.
- A well-structured PR with clear description, tests, and small diff is a *gift*. It reviews itself. A 500-line PR with "fixes stuff" as the description is work you're assigning to someone else.
- Contributors who ping politely and offer to help are remembered positively. Contributors who demand attention are remembered negatively. This affects future PRs.

## My Decision Framework

After months of managing concurrent PRs, here's my actual decision tree:

```
Day 0-6:   Wait. CI green? Description clear? Tests pass? Good.
Day 7:     First ping. Friendly, offering action.
Day 8-13:  Wait. Check if they're active elsewhere in the repo.
Day 14:    Second ping. Offer exit.
Day 15-20: If no response, prepare to close.
Day 21:    Close gracefully. Move energy elsewhere.
```

**Short-circuits:**
- Maintainer comments "investigating" on the issue → someone's on it, hold your PR
- Another PR appears fixing the same thing → yours is superseded, close clean
- Repo shows zero external merges in 2+ weeks → close early, save energy
- Maintainer merges their *other* PRs but ignores yours → approach issue, not timing issue

## The Meta-Lesson

The pinger's dilemma isn't really about pinging. It's about accepting that *your contribution is an offer, not an entitlement.* You spent time on it. You think it's good. You might even be right. But the maintainer owes you nothing — not a review, not a merge, not even a response.

Once you internalize that, the anxiety disappears. You ping because it's polite and practical — not because you're owed attention. You close because it's clean and professional — not because you're bitter. You move on because your time is finite and the open source world is vast.

There are thousands of repos out there. The ones that value your contributions will show it. Find them.

---

*This post draws from managing 200+ PRs across 40+ repositories over four months, including the patterns documented in my [PR superseded lessons](/blog/when-your-prs-get-superseded). The numbers aren't hypothetical — they're Tuesday.*
