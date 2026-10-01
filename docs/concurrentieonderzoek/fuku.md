# Fuku Ramen Amsterdam — site-analyse

Bron: https://www.fukuramenamsterdam.com/ (Firecrawl rawHtml + markdown, live fetch `maxAge:0`, 2026-09-18).
Alles hieronder is uit de geserveerde HTML/CSS/JS van de homepage; wat niet aantoonbaar was staat als "niet vastgesteld".

> **Update 2026-10-01 (live fetch, Firecrawl `maxAge:0`, homepage en `/reservations`):** Fuku reserveert nu via **Tebi**, niet meer via Zenchef/Formitable. Geen spoor meer van Zenchef, Formitable, `zcft` of `b68cc129`. Wix custom code (body-end) laadt `<script src="https://live.tebi.co/ecom/widget-manager.js" data-widget-token="431923_26ad8730388e1eed93775c4571c4335e45d8a533b2ec9d21f8c5f573af38f30d" id="tebi">`; de widget-iframe toonde `https://live.tebi.co/ecom/widget/431923_d57b9f4c740c29a76d64c253e773200cb35c386a348f508874876abf312560e2`. Pil rechtsonder met "Reserve a table" en cadeaubonnen. Accentkleur in de Tebi-widget en Wix `theme-color`: **`#9C9D96`** (was `#9D9E97` in Zenchef). De **€10 deposit**, wachtlijst en voorwaardentekst hieronder komen uit de Zenchef-widget en zijn onder Tebi **niet geverifieerd**. De Zenchef-gegevens hieronder zijn historisch.

## 1. Identiteit

- Naam: **Fuku Ramen** (`og:site_name`, ld+json `LocalBusiness`).
- Adres: Ingogostraat 14A, 1092 HZ Amsterdam (Oost), telefoon `+31611047801` — beide uit ld+json.
- Positionering (meta description, letterlijk): *"Ramen redefined. Seasonal tasting menu centred around house-made ramen, local ingredients, and sake. Izakaya à la carte Saturdays."*
- Taal: **alleen Engels** (`"language":"en"`, geen `hreflang`, geen taalwisselaar in de nav). Geen Nederlandse versie.
- Prijssegment: geen prijzen op de homepage; wel **deposit €10 p.p.** in de reserveerwidget (string `Deposit €10`) en een gift-voucher-verkoop → midden/hoog segment, tasting-menu-concept.
- Reserveren: **Formitable-widget, inmiddels Zenchef** (widget-title `Widget Side | Zenchef`, "Get Zenchef (formerly Table)"), restaurant-id `b68cc129`, betaalprovider **Mollie** (`paymentProvider=Mollie` in de boekings-URL).
- Bezorgen/afhalen: **geen** — geen thuisbezorgd/ubereats/deliveroo/sitedish in de bron.

## 2. Tech stack

- Platform: **Wix** — `<meta name="generator" content="Wix.com Website Builder">`, `X-Wix-Meta-Site-Id: f516998f-842c-41e2-8ddd-ad8fc2379c01`, `X-Wix-Published-Version: 155`.
- Renderer: **Wix Thunderbolt** (klassieke editor, geen Wix Studio/EditorX-signaal): `webpackJsonp__wix_thunderbolt_app`, `rb_wixui.thunderbolt_bootstrap-classic...bundle.min.js`, `data-block-level-container="ClassicSection"`.
- React (`react.production.min.js`, `react-dom.production.min.js`) — dat is Wix' eigen runtime, geen eigen build.
- Geen WordPress/Elementor, Squarespace, Webflow, Framer, Shopify, Next/Nuxt/Svelte/Astro (alle greps 0; "elementor" matchte alleen 3× binnen een Wix-string, geen wp-content).
- Animatie-libraries: **GSAP/ScrollTrigger, Lenis, Locomotive, AOS, Barba, Framer Motion, animate.css, Three.js: alle 0 hits.** "lottie" komt 1× voor, uitsluitend als Wix feature-flag (`specs.thunderbolt.LottieUseCanvasForIOSDevices`), niet als geladen Lottie-player.
- Widgets: **Wix Pro Gallery** (`WixProGalleryViewerWidget.bundle.min.js`, 871 hits op `pro-gallery`) voor het 3-beelds blok; Wix-formulier (`FormContainer`, `TextInput`) voor de nieuwsbrief.
- Reserveerwidget-stack (3rd party, in een iframe): AngularJS 1.x + jQuery + lodash + moment + signalR (`angular.min.js`, `angular-animate.min.js`, `ngTouch`, `waypoints`, `intlTelInput`) van `widget.formitable.com` / `cdn.formitable.com/sdk/v1/ft.sdk.min.js`; Sentry-tracing (`browser-sentry-cdn 7.120.3`) hoort bij die widget.
- Hosting/CDN: Wix (`static.parastorage.com`, `static.wixstatic.com`). Reserveer-assets op Azure blob (`ftstorageprod.blob.core.windows.net`).
- Tracking: **geen GA4/gtag, geen Meta Pixel, geen Hotjar aangetroffen**; alleen Wix' eigen `siteTags.bundle.min.js` + `google-site-verification` meta. De Formitable-SDK laadt zijn eigen `FT.load('Analytics')`.
- Bouwer/bureau: **niet vastgesteld** — geen bureau-credit in footer of bron; ziet eruit als zelfbouw in de Wix-editor.

## 3. Animatie & interactie — wat staat er écht aan?

Belangrijke nuance: een Wix-pagina bevat altijd de *bibliotheekcode* voor parallax en reveals. Die code zat hier in `initCustomElements.inline.51cbd1b6.bundle.min.js` (`BackgroundParallax`, `BgReveal`, `ImageParallax`, `BgZoomIn`, …). Dat is **boilerplate, geen bewijs van gebruik**. Bewijs van gebruik zou zitten in per-element config — en die ontbreekt:

| Item | Status | Bewijs |
|---|---|---|
| Hero video / canvas / WebGL | **Nee** | 0× `<video>` in de DOM; `webgl` komt 1× voor als selector in Wix' videocomponent-code die nooit instantieert; geen `wix-video` element |
| Hero = beeld/tekst | **Ja** | Logo-PNG + regel "Ramen redefined." als enige hero-inhoud |
| Background-parallax / scroll-effect op secties | **Nee (uit)** | `data-bg-effect-name="…"` komt **0×** met een waarde voor; `scrollEffect` 0 waarden; alle `bgMedia_*` divs zijn leeg |
| Wix "reveal"/entrance-animaties op elementen (FadeIn, FloatIn, …) | **Niet aangetroffen** | Geen animations-feature-bundle onder de 51 scripts, geen `data-motion-enter`/effect-config; de enige `data-motion-part` attributen zijn `BG_LAYER`/`BG_MEDIA`, die staan standaard op elke Wix-sectie |
| Page transitions | **Ja, declared** | 41 hits `view-transition`; CSS definieert `::view-transition-old/new(page-group)` met `out-in-old`/`out-in-new` (0.35s `cubic-bezier(.64,0,.78,0)`, groep 0.6s) plus `slide-horizontal-*` / `slide-vertical-*` keyframes en `view-transition-name` voor `#SITE_HEADER`, `#SITE_FOOTER`, achtergrond. Welk type actief is (OutIn vs SlideHorizontal/Vertical) is statisch **niet vast te stellen**; `pageTransitionScrollSmoothly: true` staat aan |
| Loader / intro | **Niet vastgesteld** — geen splash/preloader-markup gevonden |
| Slider/carousel | **Nee op de homepage** — Pro Gallery staat als 3-beelds grid; `swiper` 2 hits, beide binnen Wix-code, geen Swiper-bundle geladen |
| Hover-effecten | **Standaard Wix** — `transition:`-regels in de eigen CSS zijn nagenoeg allemaal view-transition-regels; geen custom hover-animatie aangetroffen (`imageHoverAnimation` 0 hits) |
| Menu-animatie (nav) | `wix-dropdown-menu` custom element met "More"-overflow; animatie **niet vastgesteld** |
| Reserveerwidget-animatie | **Ja** — AngularJS `angular-animate` in de Formitable-iframe; paneel schuift in na `data-open="1500"` (1,5s) op desktop |

**Reduced motion: ja, ondersteund.** Twee bewijzen: `@media (prefers-reduced-motion: reduce)` zet alle `::view-transition-*` animaties op `none !important`, en de Wix-videocomponent gate't autoplay met `let b = !i.prefersReducedMotion && u`.

Samengevat: dit is een **vrijwel animatieloze site**. De enige beweging die Wix hier daadwerkelijk levert zijn de page transitions tussen de 4 pagina's en het inschuivende boekingspaneel.

## 4. Design

- Layout: extreem sober en kort. Eén kolom, gecentreerd: logo → één zin → 3-beelds galerij → footer. Geen secties met tekstblokken, geen menu-uitleg op de homepage.
- Typografie (uit de CSS): Wix-fontstack met o.a. **`playfair-display-v2` (serif)**, **`avenir-lt-w01_35-light` / `_85-heavy`**, `helvetica-w01-light/roman`, `raleway`, `didot-w01-italic`. Geen Google Fonts-link — alles via `static.parastorage.com`. Combinatie Playfair + Avenir = klassiek-ingetogen, past bij het tasting-menu-verhaal.
- Kleur: nauwelijks kleur in de markup; de accentkleur die het restaurant zelf doorgeeft aan de widget is **`#9D9E97`** (`data-color="#9D9E97"`, ook in de boekings-URL) — een grijsgroen/sage. Verder zwart/wit/foto.
- Beeld: alle foto's via `static.wixstatic.com` met **AVIF** (`enc_avif,quality_auto`, 23 avif-hits) en webp-fallback, correcte `w_/h_/fill|fit`-transforms. Portretformaten 354×531 en 531×531 — dus een bewust ritme van 1 vierkant + 2 staand.
- Mobiel: `<meta name="viewport" width=device-width, initial-scale=1>` én een tweede viewport-meta met `maximum-scale=1, user-scalable=no` (uit de widget-iframe). Wix serveert een aparte mobiele layout (`wixDesktopViewport` id + mobile bundles). Het boekingspaneel opent op mobiel **niet** automatisch (`data-open-mobile="false"`) — nette keuze.
- Sterk: rust, goede foto's, moderne beeldformaten, consistente typografie, geen banner-rommel.
- Zwak: de homepage draagt bijna geen informatie — **geen openingstijden, geen menu-teaser, geen prijs, geen verhaal, geen kaart**; alles moet via de nav of de widget. Geen `<h1>`/`<h2>` in de DOM aangetroffen (0 heading-tags): slecht voor toegankelijkheid én SEO. Alt-teksten op de drie foto's zijn leeg.

## 5. Structuur & conversie

Homepage in volgorde (uit de gerenderde markdown):
1. Skip-to-content + nav: **Home / Menu & Info / FAQ / Contact / More** (let op: "FAQ" linkt naar `/reservations`, "Contact" naar `/contact-5` — slordige, niet-sprekende slugs).
2. Logo-PNG.
3. Claim: "Ramen redefined."
4. Pro Gallery met 3 foto's (geen bijschrift, geen link).
5. Footer: naam, Ingogostraat 14A, 1092 HZ Amsterdam, `hello@fukuramenamsterdam.com`, Instagram (`fuku_ramen_amsterdam`).
6. Nieuwsbriefformulier: "Stay in the loop. Sign up for our newsletter" + knop "Join".
7. Vaste Zenchef/Formitable-tab rechts: **"Book a table"**.

- **Primaire CTA = "Book a table"** in het side-widget; het paneel opent zelf na 1500 ms op desktop. Er staat verder **geen** reserveerknop in de header of hero — de hele conversie hangt aan die ene widget-tab.
- Reserveerflow (volledig uitgelezen uit de widget): aanbod om in de **Zenchef-app** te boeken (`t.zcft.io/restaurant_availability?restaurantUid=b68cc129`) → "Or continue booking here" → **People (1–5)** → **Date** (weekkalender) → **Time** met per slot een label: *Counter seats*, *Table* of **Waitlist**, inclusief eindtijd ("13:15 until 14:45") → resultaat met **Deposit €10**, foto, en de voorwaardentekst ("Izakaya Saturday", 1,5 uur tafeltijd, gratis annuleren tot 24 uur vooraf, veg/vegan altijd beschikbaar, géén glutenvrij, verzoek geen parfum te dragen) → **Book a table** (Mollie-betaling) of **Buy gift voucher** / **Got a gift voucher?** (`/redeem`).
- Openingstijden en adres boven de vouw: **adres nee** (staat in de footer), **openingstijden nergens op de homepage** — alleen impliciet via de beschikbare tijdslots in de widget. Dat is de grootste conversie-lek.
- SEO: title `Fuku Ramen Amsterdam` (kort, geen keyword als "ramen restaurant Amsterdam Oost"), description gevuld maar met letterlijke `\n`-regels uit de Wix-editor, `canonical` aanwezig, **2× ld+json** (`LocalBusiness` met adres + telefoon, en `WebSite`). **Geen `openingHoursSpecification`, geen `Restaurant`-type, geen `servesCuisine`, geen `priceRange`, geen menu-URL** in de structured data — gemiste kans. Geen `hreflang`, geen `noindex`. OG + Twitter-cards compleet.
- Performance: **51 scripts** op de pagina, waarvan een groot deel (AngularJS, jQuery, lodash, moment, signalR, crypto-js, qrcode) uitsluitend voor het boekingswidget. Beelden zijn wel goed (AVIF/WebP, juiste maten), maar **`loading="lazy"` komt 0× voor**. Voor een pagina met vier zichtbare elementen is dit een zware payload (~738 KB alleen al ruwe HTML).

## 6. Score

- **Design 6/10** — smaakvol en rustig, maar zo leeg dat het eerder een placeholder dan een restaurantsite oogt.
- **Animatie 3/10** — feitelijk alleen Wix page transitions en het inschuivende boekingspaneel; geen scroll-, hover- of hero-animatie aantoonbaar (reduced-motion wél netjes geregeld).
- **Conversie 6/10** — de Zenchef-flow zelf is uitstekend (deposit, counter/table, waitlist, vouchers), maar de site eromheen geeft geen openingstijden, geen menu-teaser en geen tweede CTA.
- **Techniek 5/10** — Wix Thunderbolt levert nette beeldoptimalisatie en LocalBusiness-schema, maar 51 scripts, nul headings, lege alt-teksten en geen lazy loading trekken het omlaag.

## 7. Wat overnemen / wat vermijden voor de SvelteKit-demo

1. **Overnemen: de reserveerflow als product, niet als knop.** Party size → datum → tijdslot mét zitplaatstype (counter/tafel/wachtlijst) en eindtijd, plus deposit en voorwaarden vóór de betaalstap. Dat is precies wat een tasting-menu-zaak nodig heeft; bouw dat als een eigen SvelteKit-route (`/reserveren`) in plaats van een 3rd-party iframe van 20+ scripts.
2. **Overnemen: beeldpipeline.** AVIF met WebP-fallback en expliciete `w_/h_`-transforms per breakpoint (Wix doet dit goed) — in SvelteKit met `@sveltejs/enhanced-img` of `srcset` + `sizes`. Voeg toe wat hier ontbreekt: `loading="lazy"` en echte alt-teksten.
3. **Overnemen: view-transitions als enige page-transition.** Wix gebruikt hier de native View Transitions API (`::view-transition-old/new`, 0.35s) met een `prefers-reduced-motion`-kill-switch. Dat is in SvelteKit met `onNavigate` + `document.startViewTransition` drie regels code — goedkoper en soepeler dan een scroll-library.
4. **Vermijden: een homepage zonder informatie.** Zet openingstijden, adres met kaartlink, menu-teaser/prijs van het tasting-menu en een reserveer-CTA boven de vouw. Hier moet een bezoeker de widget openen om überhaupt te zien wanneer er plek is.
5. **Vermijden: semantiek weggooien.** Nul `<h1>`–`<h3>`, lege alts, slugs als `/contact-5`. Doe in de demo het omgekeerde: echte heading-hiërarchie, sprekende routes, en `Restaurant`-schema met `openingHoursSpecification`, `servesCuisine`, `priceRange`, `acceptsReservations` en `hasMenu` — dat is een direct zichtbaar verschil voor de klant in Google.
