# Working on this repo

Concept demo for Fuku Ramen Amsterdam by JW Creative. Read `HANDOFF.md` for the state of the project and the open work.

## How Jaymar wants you to work

- **Short answers.** He asked for "caveman" replies: the outcome in a few short lines, no preamble, no recap of what he can see himself. Details go in files, not in chat. He writes Dutch or English; answer in the language he used.
- **Say what you did not verify.** If you could not watch something run, say so in one line.
- **Git is your job.** Branch (`feat/…`, `fix/…`, `chore/…`, `docs/…`), commit with Conventional Commits, merge to `main`, push, then report. Do not ask permission for routine git, and do not hand him commands to run. Ask first only before anything that destroys work.
- **Pushing to `main` deploys to production** at https://fuku-ramen.vercel.app. Run `npm run check`, `npm run lint` and `npm run build` before you push.
- **Mail is never sent by you.** Draft only; he sends.

## Stack rules

- SvelteKit, Svelte 5 with runes only (`$state`, `$derived`, `$effect`, `$props`). TypeScript strict. Plain CSS, tokens in `src/app.css`. npm.
- Use what Svelte gives: attachments (`{@attach}`) for DOM motion, rune classes in `.svelte.ts` for shared state, `prefersReducedMotion`, `MediaQuery`, `Tween`, `svelte/reactivity/window`, media bindings, snippets, transitions, `load` with prerender, `<enhanced:img>`. Do not fall back to hand-rolled listeners or `document.querySelector` in components.
- Components are `PascalCase.svelte` in `src/lib/components`, exported through `src/lib/index.ts`. Content lives in `src/lib/data/restaurant.ts`, never hard-coded in a component.
- Scripts in `package.json` stay at `dev`, `build`, `preview`, `check`, `lint`, `format`.
- New dependencies need a reason in the README.

## Motion rules

- GSAP + ScrollTrigger + Lenis. Timings are the animation library's (11b, 12, 19, 06, 27c); do not tune them.
- GSAP alone sets the start state of a reveal. No CSS transform on an element GSAP animates.
- At most three kinds of movement on the page, one signature moment (the evening section), text readable within 300 ms, no scroll lock, the page complete under `prefers-reduced-motion`.
- Button fills move one way: in from the bottom, out through the top.

## Content rules

- Only facts from Fuku's own site or from `docs/concurrentieonderzoek/`. No invented dishes, reviews, numbers or quotes.
- Site copy is English. Little text.
