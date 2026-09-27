# Tsukimi Ramen — https://www.tsukimi-ramen.com/

Onderzocht: 2026-09-18. Bronnen: Firecrawl rawHtml van de homepage (live, maxAge 0) + volledige `css/style.css`.
Alles hieronder is uit de bron; waar ik iets niet kon vaststellen staat dat er expliciet bij.

---

## 1. Identiteit

- **Naam**: Tsukimi Ramen (月見 = "maankijken"; het maanmotief zit door het hele design).
- **Locatie**: één vestiging. Damrak 45, Floor 1, 1012 LK Amsterdam. Geo in JSON-LD: `52.376032, 4.892776`.
  Boven restaurant "At James" — de site maakt daar een expliciet verhaal van ("We're **upstairs**", "Look for At James on Damrak 45 — we're on the first floor").
- **Openingstijden**: dagelijks 09:00–23:00 (in JSON-LD `openingHoursSpecification`, in de hero, in de locatiesectie én in de footer).
- **Prijssegment**: `"priceRange": "€€"` in JSON-LD. Zichtbare prijzen op de homepage: €17,95 / €19,95 / €21,95 voor ramen.
- **Contact**: `tel:+31643682172`, `mailto:tsukimiramen@gmail.com`. Social: alleen Instagram (`@tsukimi_ramen`, in `sameAs`).
- **Talen**: EN / NL / 日本語 via een eigen taalswitcher (`.lang-switcher` met `data-lang="en|nl|ja"`, default `en` actief). Vertaling is **client-side**: elk tekstelement draagt `data-i18n` / `data-i18n-html` en wordt gevuld door `/js/i18n.js`. Geen aparte URL's per taal, **geen hreflang** (0 treffers).
- **Reserveren**: **GuestPlan**. Bewijs: `<script src="https://cdn.guestplan.com/nwe/gstpln-widget-nwe.DO6dmDOx.iife.js">`, `https://cdn.guestplan.com/widget.js`, `_gstpln.accessKey = "e2191dab7299da471a5be8f6a9a50a52…"`, en alle reserveerknoppen linken naar `https://guestplan.io/?i=e2191dab…` (target="_blank").
- **Bestellen/bezorgen**: geen. Nul treffers voor thuisbezorgd, ubereats, deliveroo, sitedish, thefork, opentable, zenchef, formitable, resengo.

---

## 2. Tech stack

- **Geen CMS, geen builder, geen framework.** Nul treffers voor: `generator` meta, wp-content, elementor, wpbakery, squarespace, webflow, framer, shopify, kirby, `_next`, nuxt, svelte, astro. (De 24 "wix"- en 29 "aos"-treffers in de rawHtml zitten allemaal ín base64-blobs van de ingebedde Google Maps-bundel — geen echte libraries.)
- Dit is **handgeschreven statische HTML + één eigen stylesheet + drie kleine inline scripts**. Multi-page: `/`, `/menu`, `/about`, `/careers` (+ een thank-you-pagina, af te leiden uit `.thankyou-section` in de CSS).
- **Externe JS op de homepage**: alleen GuestPlan (2 bestanden), een ingesloten Google Maps embed (~10 `maps.googleapis.com` bundels) en `/js/i18n.js`. **Nul animatiebibliotheken**: geen GSAP/ScrollTrigger, Lenis, Locomotive, AOS, Swiper, Splide, Slick, Lottie, Three.js, WebGL, Barba, Framer Motion, animate.css.
- **Fonts**: `@import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&family=Inter:wght@400;500&display=swap')` — bovenin style.css. (De Roboto/Google Sans-links in de bron horen bij de Maps-iframe, niet bij de site.)
- **Analytics/tracking**: **niet gevonden**. Geen gtag/Google Analytics, geen Meta Pixel, geen Hotjar. (De `fbq`-treffers waren base64-ruis.)
- **Hosting-hints**: alle assets op eigen domein (`www.tsukimi-ramen.com/images/`, `/tsukimifotos/`, `/css/`, `/js/`). Geen CDN- of platformheaders vastgesteld.
- **Bouwer**: in de footer staat letterlijk `<div class="footer-powered">Powered by <a href="https://nicknamee.github.io/" target="_blank" rel="noopener">Howie</a></div>`. "Howie" linkt dus naar een **GitHub Pages-pagina** (`nicknamee.github.io`) — het is een persoon/alias, geen sitebuilder-product. Dat verklaart meteen het handgecodeerde karakter.

---

## 3. Animatie & interactie

Alles wat beweegt is **vanilla CSS + ~40 regels eigen JS**. Precies:

| Item | Wat het is | Bewijs |
|---|---|---|
| **Hero** | **Geen video, geen canvas, geen WebGL.** Een crossfade-slideshow van **7 JPG/PNG-foto's** in de linkerhelft. JS wisselt elke 4000 ms de class `.active`; CSS doet `transition: opacity 1.2s ease-in-out` | inline `setInterval(…, 4000)` op `.hero-slideshow .slide`; `.hero-slideshow .slide { opacity:0; transition: opacity 1.2s }` |
| **Scroll-animaties** | **IntersectionObserver**, handgeschreven. Elementen met `.reveal` krijgen `.visible`; CSS animeert `opacity 0→1` + `translateY(40px)→0` over 0.8s met `cubic-bezier(0.25,0.46,0.45,0.94)`. Staggering via `.reveal-delay-1/2/3` (0.1/0.2/0.3s `transition-delay`) | `new IntersectionObserver(…, {threshold:0.1, rootMargin:'0px 0px -40px 0px'})` |
| **3D card tilt + shine** | Op de 3 menu-preview-kaarten: `mousemove` berekent `rotateX`/`rotateY` (max ±6°) + `translateZ(8px)` in een `perspective(800px)`, plus een shine-hotspot via CSS-variabelen `--shine-x/--shine-y`. **Alleen boven 768px** (`if (window.innerWidth > 768)`) | inline script, `.preview-card` |
| **Hover-effecten** | Onderstreping die van 0→100% breedte groeit op navlinks (`::after { width:0 → 100%; transition: width .3s }`); knoppen `translateY(-2px)` + goud-glow box-shadow; foto-mosaic `scale(1.05)` + `brightness(.85→1)` over 0.6s; menu-kaart-achtergrond `background-size 95%→100%`; de Maps-iframe gaat van `grayscale(.8)` naar `grayscale(.3)` bij hover |
| **Loop-animaties** | Twee `@keyframes`: `arrow-bounce` (scroll-pijl in de hero, 1.8s infinite, 6px op-en-neer) en `moon-breathe` (de decoratieve maancirkel in de footer, 6s infinite ademende box-shadow). Plus `fadeUp` die alleen op de thank-you-pagina gebruikt wordt |
| **Menu-animatie (mobiel)** | Hamburger morpht naar een kruis: de drie `.bar`-spans roteren ±45° en de middelste `scaleX(0)` + `opacity:0`, `transition: transform .6s`. Getriggerd door class `nav-open` op `.site-nav`. Het JS dat die class zet zit **niet** in de inline scripts — vermoedelijk in `/js/i18n.js`; **niet vastgesteld** |
| **Page transitions** | **Geen.** Gewone `<a href>`-navigatie, geen Barba/View Transitions/SPA-router |
| **Loader / intro** | **Geen.** Geen preloader-element of intro-sequentie in de bron |
| **Sliders** | Alleen de hero-crossfade. Geen slider-library, geen dots/arrows/swipe |
| **Overig sfeerwerk** | Een fixed **film-grain overlay** over de hele site (`body::after`, inline SVG `feTurbulence`, `opacity: .04`, `z-index: 9999`) en gloeiende wolk-PNG's (`img[src*="wolk"]` met `sepia(1) saturate(3) drop-shadow(…)`), decoratieve kanji op 0.03–0.035 opacity. Statisch, niet geanimeerd |

**Reduced motion: NIET ondersteund.** Nul treffers voor `prefers-reduced-motion` in zowel de HTML als de volledige CSS. De twee infinite loops (pijl, maan) en de 4-seconden-slideshow blijven dus draaien voor gebruikers die beweging hebben uitgezet. Dit is het duidelijkste a11y-gat van de site.

> Noot bij de opdrachtgever-notitie "geen animaties": dat klopt in de zin dat er **geen animatiebibliotheek en geen zware scroll-effecten** zijn. Maar er is wél beweging — crossfade-slideshow, scroll-reveals, 3D-tilt, twee infinite keyframes. Het is "rustig", niet "stil".

---

## 4. Design

- **Layout**: klassieke gecentreerde secties, `max-width: 1200px`, `padding: 100px 24px` desktop / `60px 20px` mobiel. Hero is een **split-screen** `grid-template-columns: 1fr 1fr` (foto links, content rechts) van `88vh`, met een gradient die de foto naar rechts in de achtergrondkleur laat oplossen. Locatiesectie is eveneens 2-koloms (info + Maps) in een omkaderd goudlijn-paneel.
- **Typografie**: twee fonts, goed gekozen. Koppen `'Shippori Mincho', serif` (een Japanse mincho — meteen herkenbaar en niet de standaard "Noto"-keuze), body `'Inter', sans-serif`. Fluid sizing met `clamp()`: `h1: clamp(2rem, 5vw, 3.5rem)`, `h2: clamp(1.8rem, 3vw, 2.8rem)`. Labels/knoppen zijn kleine uppercase met `letter-spacing: 2–4px`. Twee leuke details: `h2 em, h3 em` wordt automatisch goud-cursief (dus "Fresh, simple *ramen.*"), en `.concept-text::first-letter` is een goudkleurige 3.2rem drop-cap in het serif-font.
- **Kleur**: strak token-systeem in `:root`. Bijna-zwart bruin `--bg: #0e0906`, surfaces `#1a1208` / `#201810`, accent goud `--gold: #d4943a` (+ `--gold-light: #e8b86d`), rood `--red: #c94040` alleen voor de "Popular"-hanko-badge, tekst `#f0ede6`, muted `#888880`. Één accentkleur, consequent doorgevoerd — dat is waarom het samenhangend oogt.
- **Beeld**: 7 eigen foto's in de hero-slideshow, een 5-delige `foto-mosaic` (CSS-grid `1.2fr 1fr 1fr` × 2 rijen, met één tall-item over beide rijen). Alle mosaic-foto's hebben `loading="lazy"`; de hero-slides **niet** (alle 7 laden meteen). Formaten: **alleen .jpg/.PNG, geen WebP/AVIF, geen `srcset`/`<picture>`** — de enige webp/avif-treffer in de bron zat in de Maps-blob.
- **Mobiel**: één breakpoint op 768px, degelijk uitgewerkt. Hero klapt naar 1 kolom met de foto beperkt tot `50vw`/max 280px, content gecentreerd, CTA's full-width gestapeld tot 280px, scroll-pijl verborgen, tilt-effect uitgeschakeld. Menu-preview en locatie naar 1 kolom, mosaic naar 2×3. Taalswitcher blijft naast de hamburger staan. Er is geen tablet-tussenstap.
- **Sterke punten**: zeer consistente token-discipline; de sfeer (grain-overlay, gloeiende wolken, kanji-watermerk, ademende maan) geeft karakter zonder dat er een library aan te pas komt; de "upstairs"-hindernis is omgezet in het centrale merkverhaal in plaats van weggemoffeld; het `h2 em`-goudpatroon houdt alle koppen automatisch in stijl.
- **Zwakke punten**: geen reduced-motion; geen moderne beeldformaten en geen responsive images (7 ongecomprimeerde hero-foto's eager geladen); `.ramen-card img { object-fit: contain }` op een zwarte surface betekent dat productfoto's letterboxen in plaats van vullen; de Google-Maps-embed sleept ~10 script-bundels mee en is verreweg de zwaarste bron op de pagina; de `reveal`-secties staan in de geleverde HTML al op `visible` — bij traag JS of no-JS is het gedrag inconsistent; `<meta name="keywords">` is dode ballast.

---

## 5. Structuur & conversie

**Homepage in volgorde:**
1. Fixed nav (64px): logo ☽ Tsukimi · Home / Menu / About / Careers / @tsukimi_ramen · EN·NL·日本語
2. **Hero** (88vh, split): logo-afbeelding, tagline, subtekst, gouden divider, `Damrak 45 · Floor 1 / Amsterdam`, CTA's **"Reserve a table"** (gevuld goud) + "View Menu" (outline), en `Open daily · 09:00 – 23:00`. Bouncende scroll-pijl.
3. **Menu preview** — 3 kaarten (Tonkotsu €19,95 / Vegetable Miso €17,95 / Tsukimi Special €21,95) met JP-namen, badges (人気 Popular / Vega / Recommended) → CTA "Our Ramen →"
4. **Foto-mosaic** (5 beelden)
5. **Concept / "Our story"** — kanji-watermerk 麺, twee alinea's, drop-cap
6. **Locatie / "We're upstairs"** — adres, uren, telefoon, e-mail, een uitgelichte "Look for At James"-notitie, plus Google Maps-embed met de Places-kaart (4.8 ★, 482 reviews)
7. **Social follow** — één Instagram-kaart
8. **Reserveringen** — "Reserve your table", CTA "Reserve now", plus een aparte groepsblok: "Large group? Call us on 06 43 68 21 72"
9. Footer — ademende maan, links, adres/uren/telefoon/mail, kanji-watermerk, dak-afbeelding, "Powered by Howie"

- **Primaire CTA**: "Reserve a table / Reserve now" → GuestPlan. Staat **3×** op de pagina (hero, reserveersectie, en een `.nav-reserve`-stijl is in de CSS gedefinieerd — al gebruikt de homepage-nav die knop hier niet). Secundair: "View Menu", `tel:`-link, Instagram.
- **Reserveerflow**: klik → **nieuw tabblad naar guestplan.io**. Geen inline widget, geen modal, geen datum/tijd/gasten-preselectie op de site zelf. Eén klik naar buiten = het zwakste punt van de conversieketen; de bezoeker verlaat het merk direct.
- **Boven de vouw**: adres **ja**, openingstijden **ja**, reserveerknop **ja**, telefoonnummer **nee** (pas in de locatiesectie en footer).
- **SEO**: `<title>Tsukimi Ramen — Authentic Japanese Ramen in Amsterdam</title>`, goede `description`, `robots: index, follow` (dus **geen** noindex), `canonical` naar `https://tsukimi-ramen.com/`, volledige OG- + Twitter-card-set, favicon in 4 maten. **JSON-LD `@type: Restaurant`** met naam, adres, geo, telefoon, e-mail, priceRange, servesCuisine, openingHoursSpecification en sameAs — netjes en compleet. **Geen hreflang** terwijl er drie talen zijn, en de vertalingen bestaan alleen client-side op één URL: die NL- en JA-content is voor Google feitelijk onzichtbaar. Dat is de grootste gemiste SEO-kans.
- **Performance-hints**: erg licht qua eigen code (1 stylesheet, 3 kleine scripts). Maar: Google Fonts via `@import` in CSS (render-blokkerend, geen `preconnect`); 7 hero-foto's zonder `loading="lazy"`; geen WebP/AVIF/`srcset`; de Maps-embed voegt ~10 externe scriptbundels toe. Zonder Maps zou dit een uitzonderlijk snelle pagina zijn.

---

## 6. Score

- **Design — 8/10.** Sterke, eigen Japanse nachtsfeer met één goudaccent en een goed fontpaar; verliest punten op beeldkwaliteit/letterboxing en het ontbreken van een tabletbreakpoint.
- **Animatie — 6/10.** Smaakvol en licht (crossfade, reveals, tilt) en volledig zonder library, maar beperkt in repertoire en zonder `prefers-reduced-motion`.
- **Conversie — 7/10.** CTA, adres en openingstijden staan boven de vouw en de reserveerknop herhaalt zich, maar de flow springt naar een extern tabblad en er is geen enkele meting (geen analytics) om iets te sturen.
- **Techniek — 7/10.** Schone, snelle handgecodeerde statische site met correcte JSON-LD; gaten zitten in beeldoptimalisatie, ontbrekende hreflang bij drietalige client-side i18n, en de zware Maps-embed.

---

## 7. Wat overnemen / wat vermijden voor de SvelteKit-demo

**Overnemen**
1. **Het token-systeem.** Eén achtergrond-familie, één accentkleur (`--gold`), drie greys, twee fonts — meer heeft deze site niet nodig en het is precies waarom hij samenhangend oogt. Zet dit direct om in Tailwind v4 `@theme`-tokens.
2. **Scroll-reveal zonder library.** 12 regels IntersectionObserver + een CSS-transitie geven 90% van wat AOS/GSAP hier zou doen, tegen 0 kB. In SvelteKit is dit een `use:reveal` action. Voeg wél toe wat Tsukimi vergat: `@media (prefers-reduced-motion: reduce) { .reveal { opacity:1; transform:none; transition:none } }`.
3. **Het "gratis karakter"-trucje.** De vaste SVG-grain-overlay (`body::after`, `feTurbulence`, opacity .04), het kanji-watermerk op 0.03 opacity en de automatische `h2 em { color: gold; font-style: italic }` leveren samen veel sfeer voor nul JS. Alle drie 1:1 overneembaar.
4. **Zet de locatiefrictie centraal in plaats van weg.** "We're upstairs / Look for At James on Damrak 45" is de beste conversie-beslissing op deze site. Bouw in de demo een expliciet "hoe vind je ons"-blok als vast onderdeel.
5. **JSON-LD `Restaurant` zoals hier.** Compleet met `geo`, `openingHoursSpecification`, `priceRange`, `sameAs` — kopieer de vorm en genereer hem in SvelteKit uit één content-object, zodat het schema en de zichtbare openingstijden nooit uit elkaar lopen.

**Vermijden**
1. **Reserveren dat naar een extern tabblad springt.** Embed de widget in een modal of een eigen sectie, en geef minstens datum/gasten alvast mee in de URL. Minder afhaak.
2. **Client-side i18n op één URL, zonder hreflang.** Doe dit in SvelteKit met `/nl`, `/en`, `/ja`-routes, server-gerenderd, plus `hreflang`-links en `og:locale` per route — anders indexeert Google alleen de default-taal.
3. **Ongeoptimaliseerd beeld.** 7 eager JPG's in de hero en nul `srcset`/WebP/AVIF. Gebruik `enhanced:img` (of `@sveltejs/enhanced-img`) met AVIF+WebP, `loading="lazy"` op alles behalve de eerste slide, en `object-fit: cover` in plaats van `contain` voor productfoto's.
4. **Google Maps als iframe-embed.** ~10 scriptbundels voor een kaartje. Gebruik een statische kaartafbeelding of een lichte tile-oplossing die pas op klik de echte kaart laadt.
5. **Geen enkele meting.** Er is hier nul analytics, dus niemand weet of die reserveerknop werkt. Zet in de demo minstens één privacy-vriendelijke teller op de reserveer-click.
