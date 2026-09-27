# Men' Impossible — menimpossible.com

Onderzocht: 2026-09-18. Bron: Firecrawl rawHtml + links van `/`, markdown van `/mi`.
Beperking: de full-page screenshot kon niet bekeken worden (de agent-proxy blokkeert
`storage.googleapis.com`, waar Firecrawl de screenshot neerzet). Alle uitspraken hieronder
komen daarom uit de HTML/DOM, niet uit een visuele inspectie. Waar dat een oordeel beperkt,
staat dat er expliciet bij.

---

## 1. Identiteit

- **Naam:** Men' Impossible. Title: `Home | Men' Impossible | Innovative Ramen and Japanese Cuisine`.
- **Twee locaties**, beide met eigen subpagina, telefoonnummer en Google Maps-link:
  - **Men' Impossible** (`/mi`) — Hazenstraat 19H, 1016 SM Amsterdam, 06 84544469.
    Positionering: *"Omakase ramen menu"*, vijfgangen Omakase Ramen Menu geïnspireerd op kaiseki
    (懐石料理). Open wo–ma 17:00–22:00, dinsdag gesloten. **Reserveren verplicht** —
    *"Reservations are required — help us reduce food waste."*
  - **Kitchen Impossible Amsterdam** (`/ki`) — Van der Helstplein 2, 1072 PH Amsterdam, 06 47533115.
    Positionering: *"Ramen and bites"*, **walk-in only**. Open 12:00–14:00 (za-zo tot 15:00) en
    17:00–21:30.
- **Concept:** 100% plantaardig. *"Homemade noodles prepared fresh daily. 100% plant-based."*
- **Prijssegment:** niet vastgesteld — nergens op de homepage of `/mi` staat een prijs of
  menuprijs in de HTML.
- **Talen:** NL en EN. `<html lang="nl">`, hreflang `x-default` + `nl` → `/`, `en` → `/en`.
  In de praktijk is de site **tweetalig door elkaar**: de H1 en de intro-alinea zijn Nederlands
  (*"Onvergetelijke Smaak. Duurzame Keuze."*), maar de navigatie, alle labels en vrijwel alle
  overige content zijn Engels (`HOME`, `OUR STORY`, `RESTAURANTS`, `OPENING TIMES`, `RESERVATION`).
- **Reserveren:** **Zenchef** — `sdk.zenchef.com/v1/sdk.min.js`, config
  `<div class="zc-widget-config" data-restaurant="375510" data-open="2000">`. Alleen voor de
  Hazenstraat-locatie: *"Reservations are for Men Impossible only."*
- **Bestellen (alleen Kitchen Impossible):** Thuisbezorgd en Uber Eats, als uitgaande links.
- **Social:** Instagram `menimpossible`, Instagram `kitchenimpossibleams`, Facebook `MenImpossible`.

## 2. Tech stack

| Laag | Bevinding | Bewijs |
|---|---|---|
| CMS/builder | **Webflow** | `cdn.prod.website-files.com/67b2d83c05717c67d71a894c/js/webflow.da6c945a.*.js` + `webflow.schunk.*.js`, `w-mod-js`/`w-nav`/`w-slider`/`w-dropdown` klassen |
| Hosting | Webflow-hosting | assets en JS allemaal op `cdn.prod.website-files.com` |
| Reserveringen | **Zenchef SDK** | `sdk.zenchef.com/v1/sdk.min.js`, `sdk.css`, `data-restaurant="375510"` |
| Analytics | **GA4**, first-party proxy | `gtag('config','G-HXBVSSXY0E')` + first-party tag-script op `www.menimpossible.com/avljl2rk9q5p.../...` |
| Fonts | Google Fonts via **WebFont Loader** | `ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js` |
| Bouwer | **Design Guilds** | footer: `Created by` → `https://www.designguilds.com/` |

**Niet gevonden** (expliciet gezocht, 0 hits): GSAP, ScrollTrigger, Lenis, Locomotive, AOS, Swiper,
Splide, Slick, Lottie, Three.js, WebGL, canvas, Barba, Framer Motion, animate.css, Meta Pixel,
Hotjar, WordPress/Elementor/Wix/Squarespace/Shopify.

**Let op — valse positieven bij een naïeve scan:** `_next` komt 23× voor en `three`/`motion` 12×,
maar die komen **allemaal uit de ingesloten Zenchef-widget** (`bookings.zenchef.com/_next/static/...`,
Next.js). De site zelf is geen Next.js. Zenchef sleept zijn eigen React/Next-bundle, een DayPicker
en een OverlayScrollbars-thema mee — dat is verreweg het zwaarste stuk van de pagina.

Opvallend: **er zit geen externe Webflow-stylesheet in de opgehaalde HTML.** De enige `.css`-links
zijn die van Zenchef. De vier `<style>`-blokken in de pagina zijn 85, 1.251, 2.426 en 21 tekens en
horen inhoudelijk allemaal bij Zenchef (`font-family: "DM Sans"`, `.os-theme-zenchef`). Ik kan niet
vaststellen of Webflow hier zijn CSS inline via JS injecteert of dat Firecrawl de link heeft
gestript — behandel dit als **niet vastgesteld**, niet als bewijs dat er geen stylesheet is.

## 3. Animatie & interactie

Dit is een animatie-arme site. Concreet wat er wél is:

- **Scroll-reveals:** exact **3** Webflow IX2-elementen, alle drie een simpele fade-in.
  Bewijs: `<div data-w-id="ec4ad0cd-..." style="opacity: 0;" class="container-7">`,
  idem `container-10` en `container-15`. Meer niet — er zijn 3 `data-w-id`-attributen op de hele
  homepage. Geen stagger, geen parallax, geen scroll-gekoppelde beweging.
- **Hero:** **geen video, geen canvas, geen WebGL.** `<video` komt 0× voor,
  `w-background-video` ontbreekt. De hero is beeld + tekst. Er is wél een **Webflow-slider**
  aanwezig (`slide-nav-2 w-slider-nav w-shadow w-round`, `hero-wrapper-two`), dus de hero is
  vermoedelijk een slideshow — hoeveel slides en of hij autoplayt: niet vastgesteld zonder visual.
- **Menu-animatie (mobiel):** Webflow-nav met twee verschillende configuraties, wat verklaart
  waarom er twee navbars in de DOM zitten:
  - `data-animation="over-right" data-collapse="medium" data-duration="400" data-easing="ease-in"`
  - `data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease"`
  Dus een over-right slide-in panel van 400 ms.
- **Dropdown:** standaard Webflow `w-dropdown` onder "RESTAURANTS" met de twee locaties.
- **Page transitions:** geen. Geen Barba, geen router — gewone Webflow multi-page navigatie.
- **Loader/intro:** niet vastgesteld, geen preloader-markup gevonden.
- **Hover-effecten:** alleen wat Webflow standaard meelevert; de enige `transition`-declaraties in
  de HTML (`transition: all`, `transition: height 0.4s cubic-bezier(0.33,1,0.68,1)`,
  `transition: opacity 0.2s ease-in`) staan **in de Zenchef-widget**, niet in de site zelf.
- **`@keyframes`:** exact 1 (`cnpKMQ`), een drie-punts laad-animatie met
  `animation: 2s ease -0.16s infinite alternate` — ook Zenchef, de loading-dots van het
  boekingswidget.
- **`prefers-reduced-motion`:** **0 hits.** Niet ondersteund. Bij zo weinig beweging is de
  praktische schade klein, maar het is een gemiste basis.
- **`IntersectionObserver`:** 0 hits in de HTML (Webflow IX2 regelt dit intern in zijn bundle).

**Samengevat:** de animatie bestaat uit drie fades, een slider en een mobiel menu. Er is geen
motion-concept. Alles wat technisch interessant beweegt op deze pagina is van een derde partij.

## 4. Design

**Typografie — vijf font-families, allemaal via Google Fonts:**

```
Montserrat: 100..900 + alle italics   (18 gewichten!)
PT Serif: 400,400i,700,700i
Barlow Condensed: 300,400,500,600,700
Barlow Semi Condensed: 300,400,500,600,700
IBM Plex Sans JP: 300,400,500,600,700
```

Dat is **43 font-bestanden voor één site**, geladen via een render-blokkerende
`fonts.googleapis.com/css?family=...` plus de WebFont Loader. Montserrat in álle 18 gewichten
inladen is bijna zeker onbedoeld — dat is het Webflow-vinkje "select all" dat niemand heeft
teruggezet. IBM Plex Sans JP is wel een inhoudelijk verdedigbare keuze (het Japanse
いらっしゃいませ。 in de footer). Barlow Condensed *en* Barlow Semi Condensed naast elkaar is
redundant.

**Kleur:** het palet is niet uit een eigen stylesheet af te leiden (zie §2), maar uit het logo en
de losse kleuren in de markup komt een **rood/wit/zwart** schema naar voren: logo-bestanden heten
`Men_Impossible_Logo_Red+White.svg` en `Men_Impossible_Logo_Black.svg`, `theme-color: #ffffff`.
De hex-waarden die ik wél kon tellen (`#eb5160`, `#282b38`, `#a5a6ad`, `#4980CC`, `#f7b60e`, ...)
zijn de Zenchef-widgetkleuren, niet die van de site — daar moet je niets uit concluderen.

**Layout & klassenamen — dit is de kern van de kritiek.** De klassenamen verraden een site die
ad hoc in de Webflow-designer is samengeklikt zonder systeem:

```
container-7, container-10, container-15, container-19, container-26
section-5, text-block-28, button-5_1, nav-dropdown-link-3-copy,
navbar-logo-left-2, navbar-logo-left-container-2, slide-nav-2, nav-link-3
```

Doornummerde `container-`s tot 26, een `text-block-28`, een `-copy`-klasse die in productie staat,
en `navbar-logo-left-2` — de onveranderde naam van een Webflow-template-component. Er is geen
herbruikbaar component- of tokensysteem; elk blok heeft zijn eigen wegwerpklasse. Dat is precies
waarom zo'n site na een jaar niet meer consistent te onderhouden is.

**Beeldgebruik:** 16 `<img>` op de homepage. Foto's zijn `.jpg`/`.jpeg` en één `.png`; **geen
enkele `.webp` of `.avif`** voor de fotografie (de `.webp`-hit in de scan is niet een
contentafbeelding). **Geen `srcset`** (0 hits) — dus iedereen krijgt hetzelfde bestand, ook op een
telefoon. `loading="lazy"` staat er wel op 15 van de 16.

**Toegankelijkheid:** **15 van de 16 afbeeldingen hebben een leeg `alt=""`.** Alleen het
Zenchef-logo heeft `alt="Men Impossible"`. Voor een restaurant waar de fotografie het halve
verhaal is, is dat zowel een a11y- als een SEO-verlies.

**Sterke punten**
- De informatiehiërarchie voor een **twee-locatie**-restaurant is goed opgelost: elke locatie heeft
  op de homepage een eigen blok met naam, positionering (*omakase* vs *ramen and bites*),
  openingstijden, adres met Maps-link, telefoonnummer en een eigen CTA. Dat is precies het
  probleem waar veel horeca-sites op stukloopt.
- **Verwachtingsmanagement staat in de UI, niet in de kleine lettertjes:** "Reservations are
  required", "Walk-in only", "help us reduce food waste". Dat scheelt telefoontjes en no-shows.
- Telefoonnummers zijn echte `tel:`-links, adressen zijn echte Maps-links.
- Het Japanse detail (いらっしゃいませ。, IBM Plex Sans JP, 懐石料理 in de tekst) is authentiek en
  niet decoratief bedoeld.

**Zwakke punten**
- Vijf fontfamilies / 43 gewichten zonder typografisch systeem.
- Geen klassensysteem (zie hierboven) — de site is niet geschreven, hij is geklikt.
- Taalmix NL/EN op één pagina, terwijl er wél een `/en`-variant bestaat.
- Lege `alt`-teksten.
- **Twee `<h1>`'s op de homepage**: "Onvergetelijke Smaak.Duurzame Keuze." én
  "Crafted Japanese Cuisine". Bovendien mist er een spatie/break: `Smaak.Duurzame`.
- De footer bevat **twee keer** een copyrightregel: "Copyright © 2025 Men Impossible All rights
  reserved." en "Copyright © 2025 Men' Impossible | All rights reserved.| Created by Design Guilds".
- Zichtbare bug: in de gerenderde pagina lekt een stuk CSS-klassenstring als **tekst** de DOM in —
  `_:nth-child(2))]:jc_space-between">`. Komt uit de Zenchef-widget, maar de bezoeker ziet het op
  de site van het restaurant.
- **Mobiele versie: niet visueel vastgesteld.** Wat ik wel zie: Webflow's standaard
  `data-collapse="medium"` breakpoint, een over-right menupanel, en géén `srcset` — dus mobiel
  krijgt desktop-zware afbeeldingen. De navigatie staat twee keer volledig in de DOM (een
  `menu-sp`-variant en een desktopvariant), wat duplicate content voor screenreaders oplevert.

## 5. Structuur & conversie

**Homepage, secties in volgorde:**
1. Sticky nav: logo · HOME · OUR STORY · RESTAURANTS (dropdown: Men' Impossible / Kitchen
   Impossible Amsterdam) · CONTACT · **RESERVATION**
2. Hero (slider) — H1 "Onvergetelijke Smaak. Duurzame Keuze." + NL intro-alinea
3. Tweede hero/statement — H1 "Crafted Japanese Cuisine" + *"Homemade noodles prepared fresh
   daily. 100% plant-based."*
4. **Locatieblok 1 — MEN IMPOSSIBLE AMSTERDAM:** "Omakase ramen menu" · OPENING TIMES 17:00–22:00 ·
   "Reservations are required" · adres · telefoon · READ MORE (`/mi`) · RESERVATION
5. **Locatieblok 2 — KITCHEN IMPOSSIBLE AMSTERDAM:** "Ramen and bites" · "Walk-in only" ·
   openingstijden · adres · telefoon · READ MORE (`/ki`) · Thuisbezorgd- en Uber Eats-knoppen
6. **"Join the Impossible Journey!"** — *"Reach out to us for career and collaboration
   opportunities."* → Contact (`section.footer-subscribe`)
7. Footer: いらっしゃいませ。 · beide locaties herhaald met tijden/adres/telefoon · socials ·
   dubbele copyrightregel · "Created by Design Guilds"

**Primaire CTA:** `RESERVATION` in de nav en per locatieblok. Techniek: een hash-trigger die het
Zenchef-overlay opent — `href="/#zc-action-open"` (en op één plek `href="/#ft-open"`, wat een
inconsistentie of een restant van een vorige tool lijkt).

**Reserveerflow:** volledig ingesloten Zenchef-widget, al bij pageload in de DOM
(`data-open="2000"`, widget 264×725 px). Het widget bevat een datepicker, gastenaantal, "Next
availability", een aanbeveling ("Horo Tea x Men Impossible (Sunday, Sep 27)") en een duidelijk
annuleringsbeleid: *"Reservations may be cancelled or changed until 23:59 the day before your
booking for a full deposit refund."* Er wordt dus een **aanbetaling** gevraagd — netjes dat dat
vóór het boeken zichtbaar is. Nadeel: Zenchef reserveert alleen voor Hazenstraat; voor Kitchen
Impossible is er per definitie geen flow (walk-in).

**Openingstijden/adres boven de vouw?** Nee. De hero is puur sfeer + claim; de eerste harde
informatie (tijden, adres) staat pas in sectie 4. Voor een restaurantsite waar "waar zitten ze en
zijn ze open" de meest gestelde vraag is, is dat laat.

**De grootste conversiefout — het menu.** Op `/mi` is de `MENU`-knop geen pagina en geen PDF, maar
een directe link naar een **CDN-afbeelding**:

```
.../6a1076456ac71daa72772d47_WhatsApp%20Image%202026-05-22%20at%2017.26.02.jpeg
```

Een **WhatsApp-foto** als menukaart. Die is niet doorzoekbaar, niet indexeerbaar, niet vertaalbaar,
onleesbaar-inzoombaar op mobiel, en bevat geen allergenen- of prijsinformatie die Google kan lezen.
Voor een restaurant dat op "ramen Amsterdam" gevonden wil worden is dit de duurste fout op de site.

**SEO-basics**
- Title: `Home | Men' Impossible | Innovative Ramen and Japanese Cuisine` — prima.
- Description: aanwezig en goed geschreven. *Kanttekening:* de description die de crawler
  terugkrijgt is vervuild door het Zenchef-iframe ("..., Men Impossible, Amsterdam - Online
  reservation").
- hreflang: correct opgezet (`x-default`/`nl`/`en`).
- **Geen `application/ld+json`** — 0 hits. Dus **geen `Restaurant`-schema**: geen openingstijden,
  adres, keuken, prijsklasse of menu-URL in gestructureerde data. Voor horeca is dit de meest
  renderende schema-markup die er is, en hij ontbreekt volledig. Grootste quick win.
- `og:image` en `twitter:image` wijzen naar **het favicon**
  (`67bf682fa5412da9f552c71a_favicon (2).png`), niet naar een foto. Elke deelbare link op WhatsApp,
  Instagram of Slack toont dus een piepklein icoontje in plaats van een kom ramen.
- Geen `noindex` gevonden.
- Twee `<h1>`'s (zie §4).

**Performance-hints**
- **34 `<script>`-tags** op de homepage. Het leeuwendeel is Zenchef's Next.js-bundle
  (polyfills, framework, `_app`, `_buildManifest` en ~10 losse chunks) die **op elke pageload**
  binnenkomt, of de bezoeker nu wil reserveren of niet. Dat lazy-loaden achter een klik op
  RESERVATION is de grootste winst die hier te halen valt.
- Render-blokkerende Google Fonts-request voor 5 families / 43 gewichten + de WebFont Loader.
- Geen `srcset`, geen moderne beeldformaten voor de fotografie.
- `loading="lazy"` op 15/16 afbeeldingen — dat is dan weer goed.
- Op `/mi` staat bovendien een **volledig ingesloten Google Maps-iframe** (met eigen tile-requests
  en API-key), naast de al aanwezige Maps-*link*. Twee keer hetzelfde doel, één ervan kost een
  paar honderd kilobyte.

## 6. Score

| As | Score | Eén zin |
|---|:--:|---|
| **Design** | **5/10** | De merkkern (rood/wit/zwart, Japans detail, plantaardig) is er en de locatieblokken zijn helder, maar vijf fontfamilies, `container-26`-klassen en lege alt-teksten verraden dat er nooit een systeem onder is gelegd. |
| **Animatie** | **3/10** | Drie Webflow fade-ins, een slider en een mobiel menupanel; er is geen motion-concept en geen `prefers-reduced-motion`. |
| **Conversie** | **6/10** | Sterk op verwachtingsmanagement (reserveren verplicht / walk-in only / aanbetalingsbeleid vooraf) en op de twee-locatie-splitsing, maar onderuit gehaald door een WhatsApp-foto als menukaart en openingstijden pas ver onder de vouw. |
| **Techniek** | **4/10** | Nette Webflow-basis met correcte hreflang en lazy loading, maar 34 scripts, een volledige Next.js-boekingsbundle op elke pageload, geen `srcset` en geen enkele structured data. |

## 7. Wat overnemen / wat vermijden — voor de SvelteKit-demo

**Overnemen**

1. **Het twee-locatie-patroon.** Eén kaart per vestiging met: naam, één zin positionering
   (*omakase* vs *ramen and bites*), openingstijden, adres als Maps-link, `tel:`-link, en een CTA
   die past bij die locatie (reserveren vs. walk-in vs. bezorgen). Dit lost een echt probleem op en
   is in SvelteKit triviaal als één component over een array van locaties.
2. **Beleid als UI-copy, niet als kleine lettertjes.** "Reservations are required — help us reduce
   food waste", "Walk-in only", en het annuleringsbeleid *vóór* de boekingsstap. Dat is
   goedkope, echte conversiewinst en het onderscheidt een volwassen site van een mooie brochure.
3. **Het culturele detail met bedoeling.** いらっしゃいませ。 in de footer, IBM Plex Sans JP alleen
   voor de Japanse tekst, 懐石料理 in de omschrijving. Eén doelbewust gekozen extra font voor één
   taak — dat is precies het tegenovergestelde van wat ze met Montserrat deden.

**Vermijden**

4. **Laad geen boekingswidget op pageload.** Zenchef's hele Next.js-bundle (het grootste deel van de
   34 scripts) staat hier in de DOM van iedere bezoeker. In SvelteKit: render een echte knop, en
   `import()` het widget-script pas on-click of on-`IntersectionObserver`. Dat alleen al scheelt hier
   waarschijnlijk het merendeel van de JS.
5. **Menu als HTML, nooit als foto.** De `WhatsApp Image 2026-05-22 at 17.26.02.jpeg` is de scherpste
   les van deze site. Zet gerechten in data (JSON/CMS), render ze als tekst, en voed daarmee meteen
   je `Restaurant` + `Menu` JSON-LD. Dan is één bron tegelijk pagina, SEO en vertaling.
6. **Doe wél wat zij oversloegen:** `application/ld+json` met `Restaurant` (openingsUren, adres,
   `servesCuisine`, `priceRange`, `hasMenu`), een echte `og:image` van een gerecht in plaats van het
   favicon, één `<h1>` per pagina, en `alt`-teksten op je fotografie.
7. **Typografie en klassen als systeem.** Twee families, drie tot vier gewichten, tokens in
   Tailwind/CSS-variabelen. `container-7` t/m `container-26` en `nav-dropdown-link-3-copy` zijn het
   zichtbare bewijs van wat er gebeurt als je dat niet doet — en zijn meteen het beste argument
   waarom een handgebouwde SvelteKit-site hier wint van de Webflow-versie.
8. **Kies één taal per route.** Zij hebben `/en` én een Nederlandse H1 op de Engelse homepage.
   Met SvelteKit-routing (`/[lang]`) en één bron van content is dat gratis goed te doen.
