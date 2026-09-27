# Ramen Kingdom — https://ramen-kingdom.com/

> **Correctie van Jaymar (18-09-2026), na eigen bezoek aan de site — dit rapport zag het niet:**
> Ramen Kingdom is een volledig interactieve, anime-stijl portrait-site. Er lopen volledig geanimeerde karakters langs. Als je interacteert ga je de winkel echt binnen en kies je gerechten; de gekozen gerechten veranderen wat er op het scherm staat. De onderzoeksmethode (broncode-scrape zonder klikken, screenshots niet zichtbaar) kon dat niet vaststellen. Alles wat hieronder over de "Stage"-component, `.menu-swap-video`/`.menu-swap-still`, `.enter-menu-media` en `.story-bg-media` staat, is de technische onderkant van precies die ervaring. Behandel de scores hieronder als **ondergrens**; de site is qua animatie en interactie de referentie van de hele set.


Onderzoek 2026-09-18. Bron: Firecrawl rawHtml (waitFor 5000, maxAge 0) + directe fetches van de CSS-bundle
(`/_next/static/chunks/2g1xgc3cakjmk.css`) en JS-chunks. Screenshot kon niet bekeken worden
(egress-proxy blokkeert storage.googleapis.com), dus visuele beschrijving komt uit DOM + CSS, niet uit beeld.

## 1. Identiteit

- Naam: **Ramen Kingdom**, `<title>Ramen Kingdom — Ramen Restaurant in Amsterdam</title>`.
- Locatie: één vestiging, **Prins Hendrikkade 83H, 1012 AE Amsterdam** (ld+json `PostalAddress`, ook als
  zichtbare link naar Google Maps in de hero).
- Keuken: ld+json `"servesCuisine":["Ramen","Japanese"]`. Aanbod (van `/menu`): Pork / Chicken / Veggie ramen,
  elk in drie heat-levels (basic, spicy, double spicy). **Prijzen niet vastgesteld** — nergens in de bron.
- Prijssegment: **niet vastgesteld** (geen `priceRange` in ld+json, geen prijzen op de site).
- Taal: alleen **Engels** (`<html lang="en">`, `og:locale en_GB`). Geen hreflang, geen taalswitcher gevonden.
- Reserveren: **Zenchef** — `sdk.zenchef.com/v1/sdk.css`, widget-config
  `<div class="zc-widget-config" data-hide-default-button data-lang="en" data-position="right"
  data-primary-color="FBBF24" data-restaurant="387339">`, iframe `bookings.zenchef.com/results?rid=387339`.
  ld+json: `"acceptsReservations":"https://bookings.zenchef.com/results?rid=387339"`.
- Bestellen/bezorgen: er is een **Order**-knop (`order-button.webp`) en een `.menu-order-button` klasse, maar
  **geen Thuisbezorgd/Uber Eats/Deliveroo/Sitedish** string in de bron. Waar Order naartoe gaat is
  **niet vastgesteld** (zit in een lazy chunk). De meta-description noemt wel "dine in, take away or order delivery".
- Social: alleen Instagram (`instagram.com/ramenkingdom/`), ook in ld+json `sameAs`.

## 2. Tech stack

- **Next.js App Router, gebouwd met Turbopack**, zelf gehost op eigen domein. Bewijs: `/_next/static/chunks/…`,
  `turbopack-34tysqf6jd39e.js`, RSC-payload `self.__next_f.push([1,"1:"$Sreact.fragment"…`,
  `<next-route-announcer>`, `OutletBoundary` / `ViewportBoundary` / `MetadataBoundary`.
- Geen CMS/builder: **geen** generator-meta, wp-content, Elementor, Wix, Squarespace, Webflow, Framer, Shopify.
  Dit is handwerk, geen template.
- **Tailwind CSS v4**: `@layer` + `--tw-*` custom properties in de bundle, en utility-soep in de DOM
  (`bg-[linear-gradient(180deg,rgba(0,0,0,0.32),…)]`, `min-[390px]:w-52`, `pb-[max(1.75rem,env(safe-area-inset-bottom,0px))]`).
- **Framer Motion (`motion`)** voor de animatie. Bewijs: in de client-chunk van de component `Stage`
  (`287o2wnj4i11x.js`) staan `whileHover`, `whileTap`, `whileInView`, `onViewportEnter`, `layoutId`,
  `transformTemplate`, `stiffness`/`damping`/`mass`, `backOut`/`circIn`.
- **Geen** GSAP, ScrollTrigger, Lenis, Locomotive, Swiper, Splide, AOS, Lottie, three.js, WebGL of canvas
  in de bron. De "zware WebGL-site" aanname klopt niet: het is video + CSS + Framer Motion.
- React componenten zichtbaar in de RSC-payload: `Stage` (de hele ervaring) en `ZenchefWidget`.
- Fonts: **geen @font-face en geen Google Fonts**. De site draait op de Tailwind-default
  `ui-sans-serif, system-ui, sans-serif` — alle "typografie" met karakter zit in **afbeeldingen**
  (knoppen en logo zijn .webp). "DM Sans" in de bron komt uit de Zenchef-iframe, niet van de site.
- Analytics: **geen eigen GA4/gtag/Meta Pixel**. De strings `HOTJAR_SITE_ID`, `GOOGLE_TAG_MANAGER_ID: GTM-MZSVMRV`,
  `BUGSNAG_API_KEY`, `ADYEN_*`, `STRIPE_TEST_*` komen allemaal uit de **Zenchef-iframe-config**, niet van Ramen Kingdom zelf.
- Hosting: geen expliciete hint (geen `x-vercel`-achtige marker in de HTML). Assets komen van het eigen domein
  (`/assets/...`), niet van een CDN-host. **Niet vastgesteld.**
- Bureau/bouwer: **niet vastgesteld** — geen credit in footer of bron (er ís geen footer op de homepage).
- PWA-signalen: `manifest.webmanifest`, `theme-color #000000`, apple-touch-icon 180, icon 192/512.

## 3. Animatie & interactie

Dit is geen scrollsite. Het is een **fullscreen, portrait-only "app"** in één viewport
(`.screen { position:fixed; inset:0; height:100dvh; overflow:hidden }`), met een `.stage-frame`
(`container-type:size`) waarin views wisselen.

- **Hero: autoplay video-loop.** `<video autoplay loop playsinline preload="auto"
  poster="/assets/videos/hero/hero-loop-mobile-poster.webp">` met `<source src="/assets/videos/hero/hero-loop-mobile.mp4">`,
  klasse `.bg-media.hero-bg-media` (`object-fit:cover`, absolute, full bleed). **Geen `muted` attribuut in de
  server-HTML** — dat is een reëel risico: zonder muted weigert iOS/Chrome autoplay (wordt mogelijk client-side
  gezet, niet vastgesteld). Daarboven een gradient-overlay en een `.ui-layer` (z-20) met de knoppen.
- **Loader/intro: ja, dubbel.** `.splash` (zwart scherm, logo met `splash-mark-breathe`, 2.4s scale/opacity
  ademend, plus `.splash-dots` met `video-loading-dot`, 1.2s opacity-pulse) en een aparte video-loader
  `.video-loading` / `-badge` / `-bowl` / `-steam` (`video-loading-steam` 1.4s translate+opacity, met
  `-steam-2`/`-steam-3` als gestagede varianten) — een dampend ramenkommetje als laadanimatie. Nette,
  merkgebonden loader in plaats van een spinner.
- **Neon-reclamebord:** `.reserve-sign-backlight` = absolute pseudo-laag, `z-index:-1`, `filter: blur(14px)`,
  kleur `#ff2a20e6`, animatie `reserve-neon-blink` 1.8s linear infinite — een knipperend rood backlight achter
  het "Reserve"-straatbord (`reserve-street-sign-st.webp`, links, `origin-left`).
- **Hover/tap:** consistent op elke knop — `transition hover:brightness-110 active:scale-[0.97]`
  (Tailwind, geen JS). Knoppen zijn `disabled:cursor-wait disabled:opacity-60` zolang hun chunk nog laadt.
- **View-transities:** geen page-navigatie maar in-place scenes, geanimeerd met Framer Motion
  (`AnimatePresence`-achtig patroon; `layoutId` aanwezig). Scene-klassen in de CSS: `.menu-scene`,
  `.menu-media-layer`, `.menu-swap-layer` + `.menu-swap-video` / `.menu-swap-still`
  (video↔still crossfade bij het wisselen van gerecht), `.enter-menu-media`, `.enter-merch-media`,
  `.story-bg-media` — elke sectie heeft dus z'n eigen bewegende achtergrond.
- **Menu-interactie (het sterkste stuk):** `.menu-top-tabs` / `.menu-type-tab` / `.menu-tab-underline`
  (animated underline tussen Pork/Chicken/Veggie), `.menu-heat-tabs` / `.menu-heat-tab` / `.menu-heat-chilis`
  (chili-iconen per heat-level), `.menu-text-hidden` (tekst verdwijnt met een **blur**-transitie tijdens de swap),
  `.menu-bottom-panel` / `.menu-copy-panel`, `.menu-cart-badge`.
- **Ingrediënten-popup:** `.ingredients-burst-button` → `.ingredients-panel-backdrop` (scrim `#0c060261`) +
  `.ingredients-panel` (3-koloms grid met `.ingredients-panel-cell` / `-image` / `-label`, een
  `.ingredients-panel-tail` als tooltip-puntje, offset-schaduw `7px 8px #140a03d1` — comic/poster-stijl).
  Op desktop extra decor: `.menu-ingredients-decor` / `.menu-ingredient-image` / `-label`.
- **Oriëntatie-lock:** `.rotate-lock` toont "Please rotate your phone / Ramen Kingdom is best enjoyed upright"
  in landscape bij `pointer: coarse` en `max-height: 540px`, met `rotate-lock-nudge` (90°→58° wiebel, 1.6s).
  Dat verklaart wat de eerdere oppervlakkige fetch zag.
- **Scroll-animaties:** vrijwel geen — de homepage scrollt niet (`overflow:hidden`, `position:fixed`).
  Alleen `/menu` en `.ingredients-panel` (`overflow-y:auto`) scrollen. Geen IntersectionObserver-string gevonden.
- **Reduced motion: ja.** `@media (prefers-reduced-motion:reduce)` zet alle `transition-duration` en
  `animation-duration` op `.01ms` en `animation-iteration-count:1`. Netjes gedaan.

## 4. Design

- **Layout:** één fullscreen scherm, mobile-first, met een z-gelaagde opbouw (video → gradient → `.ui-layer`).
  Op desktop (`@media min-width:768px`) wordt de site **letterlijk in een telefoon-formaat frame gezet**:
  `width:min(100vw,56.25dvh); max-width:34rem; height:min(100dvh,177.778vw); max-height:60.45rem;
  box-shadow:0 0 0 1px #ffffff14, 0 2rem 5rem #000000ad`, gecentreerd op een
  `radial-gradient(circle at 50% 32%, #6f251352, transparent 36%)` + donkere verloopachtergrond.
  Een bewuste keuze: de desktopbezoeker krijgt de mobiele ervaring in een 9:16 venster met glow eromheen.
- **Kleuren:** zwart/`#020202`–`#100908` basis, warm amber accent (`--color-amber-100`, Zenchef primary
  `FBBF24`, logo-glow `drop-shadow(0 0 16px rgba(251,191,36,0.66))`), neonrood `#ff2a20` voor het
  reserveerbord, `#fde68a` tekst in de splash. Consistent "nachtelijke Japanse steeg"-palet.
- **Typografie:** systeem-sans, ongestyled. Alle expressieve letters zitten in .webp-knoppen
  (ORDER / MENU / OUR STORY / MERCH, 1751×561 px per stuk). Gevolg: scherpe art direction, maar tekst
  die niet selecteerbaar, niet vertaalbaar en niet schaalbaar is. De live tekst die er wél is, is klein en
  wide-tracked (`text-[0.7rem] tracking-[0.26em]`, "WELCOME TO THE KINGDOM"; adres op `0.68rem`).
- **Beeld:** uitsluitend **.webp** voor stills en **.mp4** voor de loop, met poster-webp. `next/image`
  (`data-nimg="1"`, `decoding="async"`, expliciete width/height) met `loading="lazy"` op de knoppen en
  `<link rel="preload" as="image">` op het logo. Geen AVIF gezien.
- **Mobiel:** dit ís de mobiele versie — safe-area insets (`env(safe-area-inset-top/bottom)`),
  `viewport-fit=cover`, `100dvh`, breakpoint `min-[390px]`. Uitstekend afgewerkt.
- **Sterk:** één coherente merkwereld; loader, neon, video en ingrediëntenpanel voelen als één ding;
  smaakvol restrained animatiegebruik (blur-swap, underline, crossfade) in plaats van scroll-spektakel;
  reduced-motion en safe-areas serieus genomen; geen tracking-rommel.
- **Zwak:** tekst-als-plaatje (SEO, a11y, i18n, schaalbaarheid); alleen Engels in een Amsterdamse markt;
  geen echte desktop-lay-out (een 27"-scherm krijgt een telefoontje van 34rem); portrait-lock is een
  legitieme maar dwingende keuze; geen openingstijden, telefoon of footer op de homepage;
  `<video autoplay>` zonder `muted` in de server-HTML.

## 5. Structuur & conversie

Homepage (geen secties onder elkaar — alles in één scherm):
1. `.splash` intro (logo + dots) → video-loader met dampende kom.
2. Hero-video fullscreen + donkere gradient.
3. Topbar: hamburger (`menu-dropdown-button.webp`, `aria-label="Open menu"`) links, logo gecentreerd
   (met amber glow), Instagram rechts.
4. Links op 36% hoogte: knipperend **Reserve a table**-straatbord → opent de Zenchef-widget.
5. Onderin: kicker "WELCOME TO THE KINGDOM" + 2×2 grid knoppen **Order / Menu / Our Story / Merch**.
6. Daaronder: adresregel als Google-Maps-link.
7. Buiten beeld: `.rotate-lock` overlay, Zenchef-iframe (rechts, closed by default).

- **Primaire CTA:** dubbel — Reserve (Zenchef) en Order. Beide bovenaan in beeld, geen scroll nodig.
  Zwak punt: vier gelijkwaardige knoppen in één grid = geen visuele hiërarchie tussen "bestellen" en "lezen".
- **Reserveerflow:** in-page Zenchef-iframe (`data-hide-default-button`, eigen trigger, primary color FBBF24,
  lang=en). Geen redirect, goed.
- **Openingstijden/telefoon: nergens gevonden**, niet in de DOM en niet in ld+json (`openingHours` ontbreekt).
  Dat is het grootste conversie-gat. Adres staat er wel, boven de vouw.
- **SEO:** sterk voor een JS-site. Unieke `<title>` en description, canonical, volledige OG + Twitter-card
  (1200×630), `Restaurant` ld+json met address, hasMap, acceptsReservations, sameAs, servesCuisine.
  `<h1 class="sr-only">Ramen Kingdom — Ramen Restaurant in Amsterdam</h1>` — enige H1, screenreader-only.
  Geen noindex, geen hreflang (en dus geen NL-variant). Aparte, server-gerenderde `/menu`-pagina
  ("Menu — Ramen Kingdom Amsterdam", Pork/Chicken/Veggie × 3 heat-levels, verhaal over 12u bouillon en
  24u gemarineerde eieren, link terug naar home + Zenchef) — slimme SEO-uitlaatklep naast de app-achtige homepage.
  Wel: geen prijzen, geen FAQ-inhoud (de `.menu-page__faq` klasse bestaat, gevulde FAQ niet vastgesteld).
- **Performance-hints:** ~9 async JS-chunks in de head + 1 nomodule, één CSS-bundle, alles first-party.
  webp overal, lazy loading op knoppen, preload op logo en hero-poster, `preload="auto"` op de video
  (die video is de zwaarste post; grootte niet vastgesteld). Externe requests beperkt tot Zenchef.

## 6. Score

- **Design 8/10** — een echte, consistente merkwereld met durf; kost punten op typografie-als-plaatje en het ontbreken van een volwaardige desktopervaring.
- **Animatie 8/10** — smaakvol en goed getimed (splash, ramen-loader, neon-blink, blur-swap, crossfades) en met reduced-motion, maar technisch eenvoudiger dan het lijkt: video + CSS + Framer Motion, geen WebGL.
- **Conversie 6/10** — Zenchef zit netjes in-page en beide CTA's staan boven de vouw, maar zonder openingstijden, telefoonnummer, prijzen of duidelijke bestelbestemming lekt het.
- **Techniek 8/10** — Next.js App Router + Turbopack + Tailwind v4, uitstekende metadata/ld+json, safe-areas en dvh; minpunten: `<video autoplay>` zonder `muted`, alle content achter JS-chunks, alleen Engels.

## 7. Wat overnemen / wat vermijden (voor een SvelteKit-demo)

**Overnemen**
1. **De merkgebonden loader.** Vervang de spinner door iets uit het gerecht zelf (dampende kom: 3 gestagede
   CSS-keyframes op één SVG). Kost niets, verkoopt het hele concept in 1,5 seconde.
2. **Het "phone frame op desktop"-patroon** als bewuste stijlkeuze, in 6 CSS-regels na te bouwen:
   `width:min(100vw,56.25dvh); max-height:60.45rem; box-shadow:0 0 0 1px #fff2, 0 2rem 5rem #000a` op een
   donkere radial-gradient. In SvelteKit puur CSS, geen JS.
3. **Media-swap met blur bij het wisselen van gerecht** (`.menu-text-hidden` + `.menu-swap-video`/`-still`):
   Svelte `{#key dish}` + een `crossfade`/`blur` transition doet dit zonder Framer Motion — dat is precies het
   soort effect waar Svelte-transitions goedkoper zijn dan React.
4. **De SEO-vangnetpagina.** Een server-gerenderde `/menu` naast de app-achtige homepage, plus `Restaurant`
   ld+json (address, hasMap, acceptsReservations, servesCuisine) — in SvelteKit gratis via `+page.server.js`.
5. **`prefers-reduced-motion` globaal afvangen** en `env(safe-area-inset-*)` + `100dvh` vanaf dag één.

**Vermijden**
1. **Tekst als .webp** (hun knoppen zijn 1751×561 px plaatjes). Gebruik een echte display-font; behoud selecteerbaarheid, a11y en NL/EN-switch.
2. **Geen openingstijden, telefoon of prijzen** op de homepage — voeg `openingHoursSpecification` aan de ld+json toe én zet de tijden zichtbaar.
3. **Vier gelijkwaardige CTA-knoppen.** Maak één primaire actie (reserveren óf bestellen) visueel dominant.
4. **Autoplay-video zonder `muted`** (en zonder desktop-variant van de bron): lever `muted playsinline`, een poster, en een lichtere/kortere loop of een still onder `prefers-reduced-motion`.
5. **Alleen Engels** in Amsterdam: doe NL+EN met hreflang — hun site heeft er geen enkele.
