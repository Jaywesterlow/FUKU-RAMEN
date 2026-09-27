# Ramen Amsterdam — website-concurrentieonderzoek (overzicht)

Datum: 18-09-2026. Negen sites, elk door een eigen agent onderzocht op basis van de live broncode (rawHtml + CSS/JS-bundles via Firecrawl). Screenshots konden in deze omgeving niet bekeken worden; visuele oordelen komen uit DOM/CSS. Per site staat het volledige rapport in een eigen bestand.

## Scorebord (1–10)

| Site | Platform | Design | Animatie | Conversie | Techniek | Totaal |
|---|---|:-:|:-:|:-:|:-:|:-:|
| **Ramen Kingdom** — ramen-kingdom.com | Next.js App Router + Tailwind v4 + Framer Motion | 8 | 8 | 6 | 8 | **30** |
| **Ramen-Ya** — ramen-ya.nl | WordPress + Elementor Pro + Qi Addons (Pixel Bakery) | 8 | 8 | 8 | 6 | **30** |
| **Tsukimi** — tsukimi-ramen.com | Handgeschreven statische HTML/CSS ("Howie") | 8 | 6 | 7 | 7 | **28** |
| **Gifu Ramen Bar** — gifuramenbar.com | Squarespace 7.1 Fluid Engine | 8 | 7 | 5 | 6 | **26** |
| **Vatten Ramen** — vattenramen.com | Webflow | 7 | 6 | 4 | 4 | **21** |
| **Takumi/Umaimon** — takumiramennoodles.com | WordPress multisite + Salient + WPBakery (Pixel Bakery) | 7 | 5 | 4 | 4 | **20** |
| **Fuku Ramen** — fukuramenamsterdam.com | Wix (classic editor) | 6 | 3 | 6 | 5 | **20** |
| **Men' Impossible** — menimpossible.com | Webflow (Design Guilds) | 5 | 3 | 6 | 4 | **18** |
| **Sapporo Ramen SORA** — ramensora.nl | WordPress, eigen theme (2018) | 5 | 3 | 3 | 5 | **16** |

Niet onderzocht (geen site): Tensai Ramen (alleen Instagram).

## Wat elke site écht doet qua animatie

- **Ramen Kingdom** — geen WebGL. Fullscreen portrait "app" in één viewport, op desktop in een telefoonframe. Autoplay hero-video, dubbele loader (ademend logo + dampende ramenkom met gestagede steam-keyframes), knipperend neon "Reserve"-bord (`reserve-neon-blink` 1.8s), Framer Motion scene-wissels, menu met animated tab-underline + chili-iconen per heat-level en blur-crossfade bij gerecht-wissel. Reduced-motion volledig ondersteund.
- **Ramen-Ya** — nul externe libraries; alles Elementor Pro + Qi. Page transitions met eigen logo als preloader + instant.page prefetch, sticky transparante header, één begrensde Motion FX scroll-scale (alleen desktop), drie gestaffelde fadeIns, Qi appear-from-bottom reveals, één buttoncomponent met reveal/icon-move/underline hovers, Swiper-gallery. Reduced-motion alleen op de page transition.
- **Tsukimi** — geen library, ~40 regels JS. Hero-crossfade van 7 foto's (4s), IntersectionObserver-reveals (0.8s, translateY 40px, stagger 0.1/0.2/0.3s), 3D card-tilt met shine op menukaarten (desktop), bouncende scroll-pijl, "ademende" maan in de footer, film-grain overlay via SVG feTurbulence. Geen reduced-motion.
- **Gifu** — Squarespace site-wide animations: style fade, type flex (per element gestaggerd), 0.8s, delay 1.0s, `cubic-bezier(0.19,1,0.22,1)`. Geen slide/scale/clip. Twee autoplay-video's. Geen aantoonbare reduced-motion.
- **Vatten** — Webflow IX2 fade-ins + 30 autoplay-loop-video's (één per gerecht, mp4+webm+poster). Menu schuift van rechts in. Geen reduced-motion.
- **Takumi** — Salient theme: split-heading line-reveal met twist, Waypoints + animate.css, Flickity-carousel, page-transition-loader. Statische hero-afbeelding. Geen reduced-motion.
- **Fuku** — vrijwel niets: Wix native View Transitions (0.35s) en het inschuivende Zenchef-paneel. Reduced-motion wél netjes.
- **Men' Impossible** — drie Webflow IX2 fade-ins, een slider, een mobiel menu. Geen reduced-motion.
- **SORA** — één slick-carousel met nieuwsslides; AOS is gebundeld maar op geen enkel element toegepast. Correctie op het eerdere rapport: de `noindex` was een false positive (kwam uit het AddToAny-iframe); de homepage staat gewoon op index.

## Patronen over alle negen

1. **Openingstijden en adres boven de vouw: alleen Tsukimi.** Ramen Kingdom heeft zelfs nergens openingstijden of telefoon. Dit is het grootste, meest herhaalde conversielek.
2. **Reserveren:** Zenchef (Kingdom, Ramen-Ya, Men Impossible, Fuku), Guestplan (Tsukimi, Vatten, Takumi), Tebi (Gifu). In-page widget wint van doorlinken (Tsukimi opent een extern tabblad).
3. **Menu als PDF of foto:** Gifu, Takumi (PDF), Men Impossible (WhatsApp-foto). Alleen Kingdom, Ramen-Ya en Tsukimi hebben menu-content in HTML.
4. **Schema.org `Restaurant` met openingstijden:** alleen Tsukimi compleet. Kingdom en Ramen-Ya hebben `Restaurant` zonder/met fouten (Ramen-Ya: leeg postalCode + afwijkend telefoonnummer, geen h1). Takumi, Gifu, Men Impossible: niets bruikbaars.
5. **`prefers-reduced-motion`:** alleen Kingdom en Fuku goed; Ramen-Ya half; de rest niet.
6. **Beeld:** AVIF/WebP-pipeline alleen bij Fuku (Wix) en Kingdom (webp). Tsukimi, SORA, Men Impossible, Vatten: jpg/png zonder srcset.
7. **Twee locaties goed opgelost:** Men Impossible (verschillende conversiedoelen per vestiging) en Vatten (eigen route per shop, maar root is verouderd). Takumi laat zien wat er gebeurt zonder data-driven template: vijf handmatige kopieën met kopieerfouten (verkeerde Maps-link, dubbele titles).

## Wat de demo-site moet doen (samenvatting uit de negen rapporten)

- Animatiegrammatica van Gifu/Tsukimi: één fade-reveal (0.8s, sterke ease-out, per element gestaggerd) via een `use:reveal` IntersectionObserver-action, plus `prefers-reduced-motion` kill-switch. Geen library.
- Eén "merkmoment" zoals Kingdom: een loader of neon-detail dat bij het restaurant past, niet generiek.
- Video per gerecht (Vatten) maar beheerst: alleen zichtbare video's spelen, poster-fallback, `preload="metadata"`.
- Page transitions met logo (Ramen-Ya) via `onNavigate` + View Transitions.
- Adres, vandaag-open-tot, telefoon (`tel:`) en reserveer-CTA boven de vouw; CTA herhaald na het menu (Ramen-Ya-ritme).
- Menu in HTML uit één data-object dat ook de `Restaurant`/`Menu` JSON-LD voedt (openingHoursSpecification, priceRange, geo, hasMenu).
- Reserveerwidget lazy laden on-click (Men Impossible en Fuku laden een complete React/Angular-bundle op elke pageload).
- Multi-locatie als `/[locatie]`-route over een `locations[]`-array (de Takumi-les).
- Tokens: één accentkleur, twee fonts (serif/mincho + sans), `@theme` in Tailwind v4; `enhanced:img` voor AVIF/WebP + srcset.
- NL + EN als aparte routes met hreflang — geen enkele concurrent doet dit goed.
