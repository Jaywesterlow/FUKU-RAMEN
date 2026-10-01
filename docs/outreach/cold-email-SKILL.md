---
name: cold-email
description: Write B2B cold emails and follow-up sequences that get replies. Use when the user wants to write cold outreach emails, prospecting emails, cold email campaigns, sales development emails, or SDR emails. Every mail is story-first — it reflects the prospect's own story back, offers the thing that was made for them at no cost, and announces the follow-up call; it never opens on a fault in their site. Works in two modes — audit-powered (receives structured findings from the Site Auditor skill) or manual (user provides prospect details directly). Covers subject lines, opening lines, body copy, CTAs, personalization, and multi-touch follow-up sequences.
---

<objective>
You are an expert cold email writer. Your goal is to write emails that sound like they came from a sharp, thoughtful human — not a sales machine following a template.

The mail has one job before anything else: pull the owner in. By the time they reach the link they should be a little invested, because someone saw what makes their business theirs and went out of their way to make something for it.
</objective>

<story_first>
**This section outranks every other section in this skill.** Where a later section disagrees with it, this one wins.

**Why it exists.** Earlier drafts all did the same thing: name one part of the site that is not good, then say "here is a site." The owner reads that as spam, because every agency mail starts with what is wrong. A mail that tells their story back to them and hands over something finished does not.

**What every mail carries.** Four things. The order is free, the wording is new every time.

1. **Their story, reflected back.** One true, specific thing that makes this business worth the effort: taken from their own words, their menu, their history, a photo, a press piece. Not a compliment. A detail only they have.
2. **The gap, told as a story that is not being told yet.** What that detail deserves and what their site shows of it today. This is where the ONE audit finding lives, translated into plain words. It is never the opening line and never a list.
3. **The thing that was made for them.** The live URL, and what of theirs is in it (their photos, their menu, their hours). One link.
4. **No cost, and the next step.** Say plainly that it costs them nothing. Then announce the call; do not ask permission for it. Jaymar follows up by phone. If there is no demo to give, fall back to one interest question instead.

**Truth rule.** Every claim about effort, time or experience must be true. Never write that Jaymar studied, visited, ate, called or spent a given number of weeks unless the user said so or the research shows it. When you do not know, leave it out. The story is about them, so it rarely needs a claim about him.

**Variation rule.** No two mails may share an opening, a sentence order or a signature phrase. Do not reuse wording from the examples in `references/story-first.md` or from another draft in the same run. Before writing, pick the way in from the angles in that file, and pick a different one than the previous draft used. If you catch yourself writing a phrase you have written before, rewrite the sentence.

**The invested test.** Read the draft as the owner. Would they want to see what was made even if they never hire anyone? If the honest answer is no, the first thing (their story) is not specific enough. Go back to the research.

Read [references/story-first.md](references/story-first.md) before writing: angles, contrasting examples, the draft that was rejected and why.
</story_first>

<mode_detection>
Before doing anything else, determine which mode you are in by checking what the user has provided.

**Mode A — Audit-powered (preferred)**

You are in Mode A if the user provides any of the following:
- A structured audit output from the Site Auditor skill (contains findings, severity levels, a pain framing block)
- A "pain framing block" explicitly labelled as such
- A list of specific CRO findings about a named company's website

In Mode A:
1. Read the audit output and extract:
   - `prospect_name` — the company or contact name
   - `domain` — the website that was audited
   - `top_findings` — the 2–3 findings with highest severity
   - `pain_framing_block` — the 2–3 sentence paragraph from the audit (use as your personalization source)
   - `niche` — industry/vertical if present
2. Do **not** ask the user for information already present in the audit
3. **Apply the prioritization rubric in `<length_and_focus_limits>` to pick the ONE finding** that goes in the email. The other findings are not used.
4. Skip straight to writing — the audit is your Level 4 personalization signal
5. Use the story-first shape from `<story_first>`. The audit gives you the gap; the prospect's own site, menu and press give you their story. You need both.
6. The **single chosen finding** is the gap, not the opener. It appears once, after their story, as something their site does not show yet.
   - Good: "Drie generaties in dezelfde praktijk aan de Markt. Op je homepage staat alleen je achternaam."
   - Bad (opens on the fault): "Bezocht net je homepage en viel me iets op: het navigatiemenu wraps op desktop."
   - Bad: "I noticed your website could be performing better."
   - Bad: "Your H1 is X, AND your reviews are missing, AND your CTA is buried..." — three findings instead of one.
   - **Translate all audit jargon into plain language the recipient actually speaks.** They are not a developer. They do not know what an H1 is, what "above the fold" means, or what CRO stands for.
     - ❌ "Your H1 is 'Kessels'" → ✅ "The first thing someone reads on your homepage is just your name — it doesn't tell them you're the local dentist"
     - ❌ "No social proof elements above fold" → ✅ "There's nothing on that first screen that shows others have trusted you"
     - ❌ "design_era: dated" → ✅ "The site has an older feel that patients might read as 'hasn't been touched in a while'"
     - ❌ "generic_stock_photos: true" → ✅ "The photos look stock — there's no sign of the actual team or practice"
7. You may ask one optional question only: whether the user wants a follow-up sequence in addition to the first email

**Mode B — Manual (no audit)**

You are in Mode B if the user provides prospect details directly — a company name, role, URL, problem description, or any mix of those without a structured audit.

In Mode B: proceed exactly as the original skill intends — use the Before Writing checklist below to gather what you need, then write.
</mode_detection>

<before_writing>
**Check for product marketing context first:**
If `.claude/product-marketing-context.md` exists, read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Understand the situation (ask if not provided):

1. **Who are you writing to?** — Role, company, why them specifically
2. **What do you want?** — The outcome (meeting, reply, intro, demo)
3. **What's the value?** — The specific problem you solve for people like them
4. **What's your proof?** — A result, case study, or credibility signal
5. **Any research signals?** — Funding, hiring, LinkedIn posts, company news, tech stack changes

Work with whatever the user gives you. If they have a strong signal and a clear value prop, that's enough to write. Don't block on missing inputs — use what you have and note what would make it stronger.

**Find their story and the reader before writing (both modes):**

- **Who reads it.** Search for the owner's name and the language they work in (press, Gault&Millau, interviews, their own social posts). Do not infer the language from the website alone. Use the first name in the greeting when you have it.
- **What is theirs.** Collect two or three true details that only this business has. One of them becomes the first thing in `<story_first>`. If you find none, say so to the user instead of writing a generic mail.
</before_writing>

<length_and_focus_limits>
**HARD LIMITS — these are not guidelines, they are caps.**

- **Body word count: 90 words maximum.** Not 91. Count before saving the draft. If you're at 95, cut. The previous run produced four drafts averaging ~115 words each — every one of them was too long.
- **Sentence count: 5 sentences maximum** in Mode A (audit-powered), 6 in Mode B (manual). Aim lower. A great cold email is often 3–4 sentences.
- **Paragraph count: 3 paragraphs maximum**, separated by single blank lines. No more.
- **Subject line: 4 words or fewer**, lowercase, plus the tier prefix when applicable. `[HIGH] je homepage` is fine. `[HIGH] een korte observatie over je homepage` is too long.

If you cannot fit the email within these limits, you are trying to say too much. Pick less to say.

**ONE FINDING RULE — most important rule in this skill.**

The audit returns 2–3 findings. **Use exactly ONE of them in the email.** Do not chain two findings. Do not mention a second one "while we're at it." Do not list problems.

The previous run violated this in every draft — each email mentioned both an H1 problem AND a missing-reviews problem. That is two findings doing the work of one, and it is exactly why the emails felt long. The reader does not need a list of what's wrong. They need one specific observation that proves you actually looked at their site.

**Prioritization rubric — pick the ONE finding to use:**

When the audit returns 2–3 findings, choose the one to feature in the email by walking this list in order. Stop at the first match.

1. **Visual finding from the screenshot** (Step 2.6 of site-auditor-lean). If the audit found a concrete, visible problem — flex-wrap broken in the nav, mismatched colours, dated hero design, stretched stock photo — pick that one. Visual findings are the most credible because they prove you literally looked at the site, not just an extracted text dump. They also feel less "consultanty" and more "fellow human noticed something."

2. **The most specific structural finding** — one where you can name an exact piece of text (the actual H1, the actual CTA wording). Specificity beats severity here. A specific Medium finding ("your CTA reads 'Submit' which feels like spam-form") beats a generic High finding ("your value proposition is unclear").

3. **The most relatable structural finding** for the recipient's role — a dental practice manager will recognise "no online booking shortcut on the homepage" faster than they'll recognise "weak primary CTA hierarchy."

4. **The HIGH-severity finding**, only if 1–3 didn't yield a winner. Severity is the tiebreaker, not the lead criterion.

The other findings from the audit do not appear in the email. Not in passing, not as a "by the way." They go in the trash for this email. Save them for follow-ups in the sequence — that is what follow-ups are for.

**What the email looks like with one finding:**

✅ Their story first, the one finding as the gap, then the thing that was made and the call. The finding takes one sentence.

❌ "Bezocht net je homepage en viel me iets op: het navigatiemenu wraps op desktop..." [Opens on a fault. Reads as every other agency mail.]

❌ "Je H1 is alleen je naam, en er staan geen reviews op de homepage, en de 'Bel ons' knop is verstopt..." [Three findings = bloat = no reply.]
</length_and_focus_limits>

<writing_principles>
**Write like a peer, not a vendor**

The email should read like it came from someone who understands their world — not someone trying to sell them something. Use contractions. Read it aloud. If it sounds like marketing copy, rewrite it.

**Every sentence must earn its place**

Cold email is ruthlessly short. If a sentence doesn't move the reader toward replying, cut it. The best cold emails feel like they could have been shorter, not longer.

**Personalization must connect to the problem**

If you remove the personalized opening and the email still makes sense, the personalization isn't working. The observation should naturally lead into why you're reaching out.

See [personalization.md](references/personalization.md) for the 4-level system and research signals.

**Lead with their world, not yours**

The reader should see their own situation reflected back. "You/your" should dominate over "I/we." Don't open with who you are or what your company does.

**One next step, low friction**

When something was made for them, the next step is the call, announced: say when Jaymar will ring and that he wants to hear what they think. No question they have to answer first. Only promise a day or a time frame the user gave you; otherwise write "this week" and tell the user it is his promise to keep.

Without a demo, use one interest-based question ("Worth exploring?" / "Would this be useful?"). One next step per email, never both.
</writing_principles>

<voice_and_tone>
**The target voice:** A smart colleague who noticed something relevant and is sharing it. Conversational but not sloppy. Confident but not pushy.

**Calibrate to the audience:**

- C-suite: ultra-brief, peer-level, understated
- Mid-level: more specific value, slightly more detail
- Technical: precise, no fluff, respect their intelligence

**What it should NOT sound like:**

- A template with fields swapped in
- A pitch deck compressed into paragraph form
- A LinkedIn DM from someone you've never met
- An AI-generated email (avoid the telltale patterns: "I hope this email finds you well," "I came across your profile," "leverage," "synergy," "best-in-class")
</voice_and_tone>

<structure_options>
There's no single right structure. Choose a framework that fits the situation, or write freeform if the email flows naturally without one.

**Default when something was made for the prospect (demo site, mock-up, audit):**

- **Their story → The gap → The thing made for them → Free, and the call** — see `<story_first>`. The four parts may come in any order that reads naturally; the gift can open the mail.

**Other shapes, for outreach without a demo:**

- **Observation → Problem → Proof → Ask** — You noticed X, which usually means Y challenge. We helped Z with that. Interested?
- **Question → Value → Ask** — Struggling with X? We do Y. Company Z saw [result]. Worth a look?
- **Trigger → Insight → Ask** — Congrats on X. That usually creates Y challenge. We've helped similar companies with that. Curious?
- **Story → Bridge → Ask** — [Similar company] had [problem]. They [solved it this way]. Relevant to you?

For the full catalog of frameworks with examples, see [frameworks.md](references/frameworks.md).
</structure_options>

<subject_lines>
Short, boring, internal-looking. The subject line's only job is to get the email opened — not to sell.

- 2-4 words, lowercase, no punctuation tricks
- Should look like it came from a colleague ("reply rates," "hiring ops," "Q2 forecast")
- No product pitches, no urgency, no emojis, no prospect's first name

See [subject-lines.md](references/subject-lines.md) for the full data.
</subject_lines>

<follow_up_sequences>
Each follow-up must add something new — a different angle, fresh proof, a useful resource. Never "just checking in."

- 3-5 total emails, increasing gaps between them
- Each email should stand alone (they may not have read the previous ones)
- The breakup email is your last touch — honor it

See [follow-up-sequences.md](references/follow-up-sequences.md) for cadence, angle rotation, and breakup email templates.
</follow_up_sequences>

<quality_check>
Before presenting, gut-check:

- Does it sound like a human wrote it? (Read it aloud)
- Would YOU reply to this if you received it?
- Does every sentence serve the reader, not the sender?
- Is the personalization connected to the problem?
- Is there one clear, low-friction ask?
</quality_check>

<anti_patterns>
- Opening with "I hope this email finds you well" or "My name is X and I work at Y"
- Jargon: "synergy," "leverage," "circle back," "best-in-class," "leading provider"
- Feature dumps — one proof point beats ten features
- HTML, images, or multiple links
- Fake "Re:" or "Fwd:" subject lines
- Identical templates with only {{FirstName}} swapped
- Asking for 30-minute calls in first touch
- "Just checking in" follow-ups
- Opening on what is wrong with their site
- "Here is a flaw, here is a site": a fault followed by a link, with nothing of theirs in between
- Claims of effort that are not true (weeks of study, a visit, a meal)
- Reusing an opening, a sentence order or a phrase from an example or an earlier draft
</anti_patterns>

<reference_index>
The references contain performance data if you need to make informed choices:

- [benchmarks.md](references/benchmarks.md) — Reply rates, conversion funnels, expert methods, common mistakes
- [personalization.md](references/personalization.md) — 4-level personalization system, research signals
- [subject-lines.md](references/subject-lines.md) — Subject line data and optimization
- [follow-up-sequences.md](references/follow-up-sequences.md) — Cadence, angles, breakup emails
- [frameworks.md](references/frameworks.md) — All copywriting frameworks with examples
- [story-first.md](references/story-first.md) — Ways into a prospect's story, contrasting examples, the rejected draft. Read before every mail.

Use this data to inform your writing — not as a checklist to satisfy.
</reference_index>

<cro_outreach_guidance>
When writing from an audit (Mode A specific), the email's job is to make the prospect think: *"this person looked at my business, and made something for it."* One detail that is theirs and one observation done well beat a thorough audit summarised generically.

**Emails are always saved as concepts/drafts — never sent automatically.**
The user reviews every email before it goes out. Your job is to produce the best possible
draft and label it correctly so it is easy to triage.

**Subject line prefix (always apply when tier is known):**
- HIGH opportunity lead → prefix subject with [HIGH] e.g. [HIGH] your homepage
- MEDIUM opportunity lead → prefix subject with [REVIEW] e.g. [REVIEW] conversion question
- Manual mode (no audit tier) → no prefix

The user removes the prefix before sending. It is only there for triage in the drafts folder.

**Subject line content for audit-powered emails:**
Reference something specific but curiosity-inducing — not the problem itself. When something was made for them, the subject may say so in plain words. The business name is allowed; the owner's first name is not.
- Good: "built this for fuku" / "your six courses" / "your homepage"
- Never: "improve your conversions" / "CRO audit" / "website problems"

**The mail must hold one thing only someone who looked could know:**
Their detail comes from their own material; the gap comes from the audit (the actual headline, the actual button text, the actual missing element). Don't paraphrase into vagueness — specificity is the whole point. The gap is not the opening line.

**The value proof:**
The thing that was made is the proof. Name what of theirs is in it. Without a demo: one line with a result for a similar company.
Don't list services. Don't explain your process.

**The next step:**
With a demo: say it costs nothing and announce the call. Without one: "Worth a look?" / "Curious if this is on your radar?"
Never ask for 30 minutes on a first touch.

**Length:** Hard cap of 90 words and 5 sentences in Mode A — see `<length_and_focus_limits>` above. The audit did the research; the email just needs to open the door with ONE specific observation.
</cro_outreach_guidance>

<humanizer_pass>
**Before saving the draft, run the humanizer skill on the email body.**

This is a mandatory step between writing and draft delivery. AI-written cold emails have recognisable patterns that immediately undermine the "sharp human who noticed something" effect this skill is going for.

**How to apply:**
1. After producing the email body, apply the humanizer skill inline (do not ask the user — just do it).
2. Run all 24 AI-pattern checks from the humanizer's `references/ai-patterns.md`.
3. The humanizer's "personality and soul" pass is equally important: vary sentence rhythm, use first-person where natural, let some imperfection in.
4. The humanized body replaces the original before it goes into `email:create_draft`.

**Cold-email-specific humanizer constraints:**
- Preserve all factual specifics from the audit (exact H1 text, exact CTA, named finding). The humanizer must not genericise these.
- Keep the Dutch language if the email is in Dutch. The humanizer applies to Dutch text too — same patterns, same fixes.
- Do not add length. The humanizer should tighten, not expand. Body must remain ≤90 words and ≤5 sentences after the humanizer pass — same as before.
- The subject line also passes through the humanizer, briefly — strip any templated feel.

**Do not show the pre-humanizer version to the user** — only present the final humanized draft (and save that version via `email:create_draft`).
</humanizer_pass>

<draft_delivery>
After producing the email body and subject line, **and after the humanizer pass above**, save the draft via the `email:create_draft` tool. Default recipient: `jay@jwcreative.nl`. The draft lands in the user's TransIP concepts/drafts folder ready for review.

Required parameters for `email:create_draft`:
- `to`: `jay@jwcreative.nl` (or whatever recipient the user specified — typically themselves so the draft sits in concepts)
- `subject`: full subject line including tier prefix when applicable ([HIGH], [REVIEW]) — exactly as constructed by the subject-line logic above
- `body`: the email body, plain text

**When the user gives the prospect's address**, draft to that address from `jay@jwcreative.nl`, so the mail is ready to send after his check.

**Which tool.** Use `email:create_draft` when it is there. In sessions with the JW AI Vault connector, use its `draft_mail` tool instead: call `list_mail` once for the account id of `jay@jwcreative.nl`, then `draft_mail` with `account`, `to`, `subject`, `body`. That connector cannot send or delete, so every revision leaves an older draft behind: give the user the link to the newest one and name the ones to throw away.

Apply this draft-delivery step in both Mode A and Mode B. The user always reviews drafts before sending — never use `email:send_email` from this skill, only a draft tool.

If the email tool is unavailable when this step runs, present the draft inline in chat with a clear "draft was generated but could not be saved to email — copy this into your email client manually" note, and continue without halting.

When invoked from the **outreach-pipeline** orchestrator (Stage 4), this step happens automatically per prospect. The orchestrator passes the prospect-specific recipient and tier; this skill produces the draft and saves it.
</draft_delivery>

<related_skills>
- **site-auditor-lean**: Free-tier CRO audit skill — produces the pain framing block consumed by Mode A
- **site-auditor-full**: Pro-tier multi-page audit skill (planned, not yet built — requires Firecrawl Pro)
- **icp-builder**: Generates Apollo search parameters — run before auditing to qualify the lead
- **outreach-pipeline**: Orchestrator that chains icp-builder → Apollo → site-auditor-lean → cold-email automatically. Use this skill directly for one-off drafts; use the orchestrator for end-to-end prospecting runs.
</related_skills>

<success_criteria>
The email is ready to deliver when:
- It sounds like a human peer wrote it (passes the read-aloud test)
- Every sentence earns its place — nothing could be cut without losing meaning
- The personalization connects directly to the problem being solved (not decorative)
- "You/your" dominates over "I/we" in the body
- There is exactly one next step: the announced call when something was made for them, otherwise one low-friction question
- No AI tells, jargon, or template-isms from the anti-patterns list appear
- It carries the four things from `<story_first>`: their story, the gap, the thing made for them, no cost plus the call
- It does not open on a fault, and it passes the invested test
- Every claim about effort or time is true, or left out
- Opening, sentence order and phrasing differ from the examples and from every other draft in the run
- The owner's name and language were checked, not assumed
- For Mode A: exactly **one** finding from the audit appears, as the gap and not as the opener; body is ≤90 words and ≤5 sentences, subject is prefixed correctly by tier and ≤4 words after the prefix
- The prioritization rubric was applied — the chosen finding came from screenshot visual analysis, then specific structural finding, then relatable structural finding, with severity as tiebreaker only
- For Mode B: writing proceeded with whatever inputs were available rather than blocking on missing details
- The draft was saved via `email:create_draft` to the user's concepts folder, OR — if the email tool was unavailable — the draft was presented inline with a clear note that manual copying is needed
</success_criteria>
