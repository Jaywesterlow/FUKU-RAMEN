# Fuku Ramen

Concept demo for Fuku Ramen Amsterdam, built by JW Creative. SvelteKit, Svelte 5 with runes, TypeScript strict, plain CSS.

```bash
npm install
npm run dev
```

| Script            | What it does                   |
| ----------------- | ------------------------------ |
| `npm run dev`     | Dev server                     |
| `npm run build`   | Production build (prerendered) |
| `npm run preview` | Serve the build                |
| `npm run check`   | `svelte-kit sync` + typecheck  |
| `npm run lint`    | Prettier check + ESLint        |
| `npm run format`  | Prettier write                 |

Deploys to Vercel with `@sveltejs/adapter-vercel`. Both pages are prerendered, so Vercel serves static files.

## Languages

English at `/`, Dutch at `/nl`. One route, `src/routes/[[lang=locale]]`, renders both; the matcher in `src/params/locale.ts` accepts only `nl`. Facts (address, phone, times, prices, photos) live once in `restaurant.ts`; the words live in `restaurant.en.ts` and `restaurant.nl.ts`, typed against the same `Copy`, so a missing line fails `npm run check`. `hooks.server.ts` fills `<html lang>`; each page carries its canonical, `hreflang` alternates (`en`, `nl`, `x-default`) and a JSON-LD `WebPage` with `inLanguage`. The EN / NL switch does a full page load, so `lang` and the reveals start clean.

"Ramen redefined." is Fuku's own tagline and stays English on `/nl`.

## Where things live

```
src/
  app.css                     tokens, base, type, the two global link styles
  routes/
    [[lang=locale]]/
      +layout.ts              prerender + the content for `/` or `/nl`
      +layout.svelte          nav, footer, head (canonical, hreflang, JSON-LD), smooth scroll, the clock
      +page.ts                prerender entries for both languages
      +page.svelte            composes the sections
  params/locale.ts            only `nl` is a language segment
  hooks.server.ts             `<html lang>` per page
  lib/
    data/restaurant.ts        facts in every language, and `content.en` / `content.nl`
    data/restaurant.en.ts     the English words
    data/restaurant.nl.ts     the Dutch words
    data/opening.ts           "open today until" as a pure function
    data/schema.ts            schema.org Restaurant from the same object
    state/opening.svelte.ts   rune class: the clock the site reads
    motion/scroll.ts          GSAP + ScrollTrigger + Lenis on one clock
    motion/attachments.ts     reveals as Svelte attachments
    assets/photos.ts          photos through enhanced-img
    components/               one file per section, plus the shared pieces
static/video/                 the three loops and their posters
docs/                         motion concept, competitor research, the static demo
```

## What Svelte does here

| Tool                                                     | Where                        | Why                                                                                   |
| -------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------- |
| `{@attach}` attachments                                  | `motion/attachments.ts`      | Every reveal is set up and cleaned up with the element it moves                       |
| `$state` / `$derived` in a class                         | `state/opening.svelte.ts`    | One clock; "Today 18:00 – 23:00" and the Today badge derive from it                   |
| `$effect` with cleanup                                   | `+layout.svelte`             | Starts and stops the clock, Lenis and the ScrollTrigger refresh                       |
| `prefersReducedMotion`                                   | attachments, videos, layout  | Reveals, smooth scroll and video loops switch off live with the visitor's setting     |
| `scrollY`, `innerHeight` from `svelte/reactivity/window` | `Nav`, `Hero`                | Nav colour and the scroll cue are derived values, no scroll listener                  |
| `MediaQuery` + `Tween`                                   | `Button`                     | Magnetic button only with a real cursor; 200 ms expo-out as in library 27c            |
| `bind:currentTime`, `bind:duration`, `bind:paused`       | `SeamlessVideo`, `LoopVideo` | The hero loop crossfades between two copies; loops play only on screen                |
| Snippets                                                 | `Button`, `Eyebrow`, frames  | The button label renders twice (text and fill) from one snippet                       |
| `transition:fade`, `{#key}` + `in:fade`                  | `Nav`, `Evening`             | Mobile menu and the course caption                                                    |
| `<svelte:element>`                                       | `RevealHeading`              | One heading component for `h1` and `h2`                                               |
| `load` + `prerender` + `entries`                         | `+layout.ts`, `+page.ts`     | Content reaches components as props, per language; a CMS would touch one function     |
| Optional param + matcher, `transformPageChunk`           | `[[lang=locale]]`, hooks     | `/` and `/nl` from one set of components; `<html lang>` right in the prerendered HTML |
| `<enhanced:img>`                                         | every photo                  | AVIF and WebP, `srcset`, intrinsic size                                               |

## Motion

Set "stil en beeldgedragen", calm. Library ids: 11b (headings from a mask), 12 (frame opens from below), 19 (sticky photo, courses pass, the signature), 06 (endless strip), 27c (magnetic button). Timings are the library's. Full concept in `docs/bewegingsconcept.md`.

GSAP alone sets the start state of a reveal. A CSS transform on the same element is added on top of GSAP's and leaves headings stuck below their mask.

## Dependencies beyond the scaffold

- `gsap`, `lenis`: the demo motion stack.
- `@sveltejs/enhanced-img`: image pipeline.

## Still open

- The three video loops are Pexels stock (sources in `docs/bewegingsconcept.md`). Replace with Fuku's own footage.
- Fonts load from Google Fonts. Self-host before production.
- "Reserve a table" links to the live site. In production the Zenchef widget should load in-page, on click.
- Phone number: the research found `+31611047801` in Fuku's JSON-LD, the visible contact page says `+31 6 42 60 85 96`. The demo uses the visible one. Ask Fuku.
