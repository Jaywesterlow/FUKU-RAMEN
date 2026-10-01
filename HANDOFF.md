# Handoff — Fuku Ramen demo

For: a Claude session in the cloud, on any device.
From: the local desktop session of 18 September to 1 October 2026.
Client: Jaymar Westerlow, JW Creative (jwcreative.nl). Freelance web designer and developer.

Everything you need is in this repo. Nothing important lives only on Jaymar's laptop any more.

## Start here

1. Read `CLAUDE.md` (how Jaymar wants you to work) and this file.
2. `npm install`, then `npm run dev`.
3. Before changing motion, read `docs/bewegingsconcept.md`. Before writing to the prospect, read `docs/outreach/`.

## Where it stands

| Thing     | State                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Live site | https://fuku-ramen.vercel.app (public)                                                                                                           |
| Repo      | https://github.com/Jaywesterlow/FUKU-RAMEN (private), branch `main`                                                                              |
| Vercel    | Project `fuku-ramen`, team `jaywesterlows-projects`. Every push to `main` deploys to production.                                                 |
| Stack     | SvelteKit, Svelte 5 runes, TypeScript strict, plain CSS, GSAP + ScrollTrigger + Lenis, `@sveltejs/enhanced-img`, `@sveltejs/adapter-vercel`      |
| Checks    | `npm run check`, `npm run lint` and `npm run build` all pass on `main`                                                                           |
| Outreach  | A draft mail to the owner sits in the Drafts of jay@jwcreative.nl. Jaymar sends it himself and follows up by phone. Ask him whether it went out. |

The other Vercel URLs (`…-jaywesterlows-projects.vercel.app`) sit behind a Vercel login. Only share `fuku-ramen.vercel.app`.

## The prospect

Fuku Ramen, Ingogostraat 14A, 1092 HZ Amsterdam (Oost). Open since April 2023.

- Run by a Polish couple: chef **Jakub Karczewski** (ex De Kas, trained at Miyajima Ramen School in Osaka) and **Aleksandra** (desserts, pairings). **Write to them in English.**
- Wednesday to Friday 18:00–23:00: six-course seasonal tasting menu with ramen as the main, €89, reservations only. Saturday 13:00–19:30: izakaya à la carte, limited walk-ins.
- Current site: fukuramenamsterdam.com, a nearly empty Wix page with the tagline "Ramen redefined." and a **Tebi** booking widget (checked 1 October 2026; it was Zenchef in the September research). The €10 deposit per person is from the Zenchef days and is **unverified** under Tebi.
- Mail: hello@fukuramenamsterdam.com. Phone: +31 6 42 60 85 96, answered Wednesday to Saturday 11:00–18:00.
- Their own accent colour is sage `#9D9E97` (what they passed to the old Zenchef widget). The demo uses it. Their Tebi widget and Wix theme colour now show `#9C9D96`; the token was left as is.

The full analysis of their site and of eight competitors is in `docs/concurrentieonderzoek/`. Start with `00-overzicht.md` and `fuku.md`.

## What Jaymar decided along the way

These came from his feedback. Do not undo them without asking.

- **Calm and minimal.** Little text. Text may appear through interaction, but it must be obvious and never "click here".
- **Hero is exactly one screen high**, with a video loop. Address, "open today until" and the phone number sit above the fold.
- **The evening section is the signature.** The photo is sticky in the middle of the screen while the six courses scroll past; only the active course shows its line. He likes this section most.
- **No newsletter form.** The footer is one row with the tagline.
- **Buttons fill in one direction**: in from the bottom on hover, out through the top on leave. The fill carries its own copy of the label so the text is readable at every frame.
- **Reveals run on GSAP.** An IntersectionObserver version was tried and rejected ("you can just use GSAP").
- **SvelteKit with real use of Svelte's tools**, not vanilla JS in a framework shell. See the table in `README.md`.

## Known traps

- **Never put a CSS transform on an element GSAP also animates.** In an early version CSS set `translateY(110%)` and GSAP added `yPercent: 110` on top, so headings ended up stuck below their mask. GSAP alone sets the start state (`y: 0, yPercent: 110`).
- **Motion timings come from Jaymar's animation library** (ids 11b, 12, 19, 06, 27c) and are not tuned in this repo. Durations and easings are in `src/lib/motion/attachments.ts` and in `docs/bewegingsconcept.md`.
- **Motion was never watched by the previous session.** Its browser windows delivered no animation frames, so only the end states and the logic were tested. Jaymar judges timing and feel himself in a real browser. If he reports that something does not animate, believe him and reproduce it before theorising.
- **Fonts are self-hosted** in `static/fonts/` (latin subsets, `@font-face` in `src/app.css`). Noto Serif JP holds only the kanji the site uses (一二三四五六土夜福訪). A new kanji falls back to a system font until the subset is regenerated: fetch the Google Fonts CSS with `&text=` set to all kanji and replace the file.
- **Line endings are LF** (`.gitattributes`). Run `npm run format` before committing.

## Open work

1. **Video loops are Pexels stock.** Hero: "Authentic Japanese Ramen Bowl Close-Up" by Ali Alcántara (pexels.com/video/31387235). Saturday: Alay Lv (33400919). Visit: Taryn Elliott (9508945). They live in `static/video/`. Replace with Fuku's own footage, or with generated images or video if Jaymar asks for that. Photos in `src/lib/assets/photos/` are Fuku's own, taken from their site.
2. **Booking: Tebi in-page, on click (done; real widget unwatched).** Every Reserve opens Fuku's own Tebi widget; the Tebi script loads on the first click only. Without JavaScript, or if Tebi fails or stays silent for 8 s, Reserve goes to fukuramenamsterdam.com/reservations. Opening it from our buttons uses the message Tebi's own `#tebi-reservations` links send; if Tebi changes that, check `src/lib/state/reservations.svelte.ts`. Tested only against a mocked widget: `live.tebi.co` was blocked from the cloud session, so the real widget on our domain has not been seen. Check the €10 deposit and the waiting-list line in Visit with Fuku.
3. **Phone number conflict.** Fuku's own JSON-LD says `+31611047801`; their visible contact page says `+31 6 42 60 85 96`. The demo uses the visible one. Ask Fuku.
4. **Dutch version**: done. `/nl` with `hreflang`, canonical and `<html lang="nl">`; words in `src/lib/data/restaurant.nl.ts`. Read the Dutch once before showing it; new copy goes into both locale files.
5. **The six courses are a sample structure**, labelled as such. The real menu changes with the season; Fuku has to supply it.
6. **A menu in HTML from the data object**, feeding `Menu` JSON-LD. Only `Restaurant` JSON-LD exists now.

## If images or video are needed

- Keep the look: warm, low light, dark wood, natural colour, no text in the image. The existing photos set the standard; match them.
- Hero and section loops are 16:9 at 1280×720 or larger, 4 to 10 seconds, no camera cuts, muted. The Saturday loop is portrait, 3:4 crop from 9:16.
- New photos go in `src/lib/assets/photos/`, get a static import in `src/lib/assets/photos.ts`, and are referenced by key in `src/lib/data/restaurant.ts`. Videos go in `static/video/` with a poster JPG next to them.
- Never present generated food as Fuku's own dish. For a demo it is a placeholder, and the README list of open work should say so.

## Outreach

The approved mail and the rules behind it are in `docs/outreach/`:

- `cold-email-SKILL.md` and `story-first.md` are a copy of Jaymar's updated cold mail skill (28 September 2026). The copy in his JW AI Vault skill library is older; if both are available, follow the one in this repo.
- The mail leads with Fuku's own story (six courses that end in a bowl), offers the site that was built for them at no cost, and announces a call. It never opens on a fault in their site.
- Do not claim effort that is not true, and do not reuse the approved mail's wording for another prospect.
- Jaymar always sends mail himself. Draft only.

## Tools the previous session had that you may not

| Tool                  | What it gave                                                                                                                                                                                                                                         | Without it                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| JW AI Vault connector | Jaymar's skill library (`svelte-project`, `vercel-deploy`, `git-ask-before-commit`, `answer-first`, `bewegingsconcept`, `animatie-combinaties`), his animation library (`animation_catalogue`, `read_animation`), mail drafts from jay@jwcreative.nl | The rules that matter are summarised in `CLAUDE.md`; the motion code is already in the repo |
| Vercel connector      | Created the project, read deployment status                                                                                                                                                                                                          | Pushing to `main` deploys anyway; check https://fuku-ramen.vercel.app                       |
| Claude in Chrome      | Created the GitHub repo (no `gh` CLI on his laptop)                                                                                                                                                                                                  | Not needed any more                                                                         |
| Local preview         | `npm run dev`                                                                                                                                                                                                                                        | Same in the cloud                                                                           |

## History in one paragraph

Started as a static HTML demo (three versions, kept as `docs/demo-v3-static.html`), built from Jaymar's brief, two reference sites (gifuramenbar.com for video loops and reveals, tsukimi-ramen.com for restraint and hover) and later his nine-site competitor research. Converted to SvelteKit on 27 September, pushed to GitHub, deployed to Vercel the same day. Cold mail drafted on 27 September and rewritten story-first; the cold mail skill was updated to match on 28 September.
