# Takumi Ramen Kitchen / Umaimon — Amsterdam locatiepagina's

Onderzocht op 2026-09-18. Diepte-analyse op `/nl/amsterdam-centrum/` (rawHtml), plus markdown-scrapes van
`amsterdam-umaimon` (= Leidseplein), `amsterdam-centraal`, `amsterdam-depijp` en `amsterdam-rivierenbuurt`
voor de template-vergelijking. **Screenshots konden niet bekeken worden** — de fullPage-screenshot is wel
gemaakt, maar het downloaden van de Firecrawl-storage-URL werd door de agent-proxy geblokkeerd (403).
Alles hieronder is daarom uit de DOM/bron; puur visuele oordelen zijn gemarkeerd als "niet vastgesteld".

---

## 1. Identiteit

- **Twee merken onder één domein**: *Takumi Ramen Kitchen* (blauw/geel) en *Umaimon* (rood). Umaimon is
  het zusjes-merk: `og:image = .../2026/04/UMAIMON-RED.jpg` vs `TAKUMI-BLUE.jpg` / `TAKUMI-YELLOW.jpg`.
- **Vijf Amsterdamse vestigingen** (URL → werkelijke naam):
  | URL-slug | Merk | Naam in `og:title` | Adres |
  |---|---|---|---|
  | `amsterdam-centrum` | Umaimon | Umaimon – Amsterdam Centrum | Nieuwezijds Voorburgwal 115, 1012 RH |
  | `amsterdam-umaimon` | Umaimon | Umaimon – Amsterdam **Leidseplein** | Korte Leidsedwarsstraat 51, 1017 PW |
  | `amsterdam-centraal` | Takumi | Takumi Ramen Kitchen – Amsterdam Centraal | Nieuwezijds Voorburgwal 4, 1012 RZ |
  | `amsterdam-depijp` | Takumi | Takumi Ramen Kitchen – Amsterdam De Pijp | Ferdinand Bolstraat 36H, 1072 LK |
  | `amsterdam-rivierenbuurt` | Takumi | Takumi Ramen Kitchen – Amsterdam Rivierenbuurt | Scheldestraat 1, 1078 GD |
- **Taal**: `<html lang="en-GB">`, alle content Engels — ondanks de `/nl/`-prefix in de URL. Geen `hreflang`
  gevonden (0 treffers). De `/nl/` is een *land*-segment van een multisite-netwerk, geen taalswitch.
- **Prijssegment**: niet vastgesteld — geen prijzen in de HTML; menu's zitten uitsluitend in externe PDF's.
- **Reserveren/bestellen** (verschilt per locatie, zie §5): Guestplan-widget, UberEats, Thuisbezorgd,
  telefoon, of "alleen walk-in".
- **Bouwer**: expliciet in de footer — `Site built by The Pixel Bakery` → https://www.thepixelbakery.nl/

---

## 2. Tech stack

| Laag | Bevinding | Bewijs |
|---|---|---|
| CMS | WordPress 7.1.1 | `<meta name="generator" content="WordPress 7.1.1">` |
| Architectuur | **WordPress Multisite, subdirectory-installatie** | alle assets staan op `/nl/amsterdam-centrum/wp-content/uploads/...` — elke locatie heeft een eigen `wp-content`, eigen `cookie-policy-eu/`-pagina en eigen favicon |
| Builder | WPBakery Page Builder 8.7.3 (Salient-fork) | `generator: "Powered by WPBakery Page Builder"`, `plugins/js_composer_salient/...?ver=8.7.3`, 95× `vc_row` |
| Theme | **Salient 18.2.1** + `salient-child` | `wp-content/themes/salient/css/build/style.css?ver=18.2.1`, body-class `wp-theme-salient wp-child-theme-salient-child material` |
| Plugins (gevonden mappen) | `Ultimate_VC_Addons` 3.21.3, `salient-core`, `salient-portfolio`, `complianz-gdpr`, `contact-form-7` 6.1.6, `wpcf7-redirect`, `instagram-feed` (Smash Balloon) 6.11.3, `wp-popups-lite` 2.2.0.7 | script/style-paden |
| JS-basis | jQuery 3.7.1 + jquery-migrate 3.4.1 | `wp-includes/js/jquery/jquery.min.js?ver=3.7.1` |
| Animatie-libs | **anime.js 4.5.1**, **Waypoints 4.0.2**, **Flickity 2.3.3**, jQuery Transit 0.9.9, fancybox, hoverIntent, superfish, touchSwipe, imagesLoaded, animate.css | allemaal als `<script src>` in de bron |
| **Niet** aanwezig | GSAP, ScrollTrigger, Lenis, Locomotive, AOS, Swiper, Splide, Slick, Lottie, Three.js/WebGL, Barba, Framer Motion, Next/Nuxt/Svelte/Astro | 0 treffers als script-bron (de losse strings "swiper"/"aos" komen alleen uit Salient-CSS-selectors en base64-blobs) |
| Reserveren | **Guestplan** | `cdn.guestplan.com/widget.js` + `_gstpln.accessKey = "9e9cc16b…"` (per subsite een eigen key) |
| Loyalty | **Piggy** | `<script id="piggy-widget" data-widget-id="382" src="https://widget.piggy.eu/widget.js" defer>` + menu-item "BECOME A MEMBER" → `takumi-ramen-noodles.app.piggy.eu/register` |
| Analytics | GA4 via gtag | `googletagmanager.com/gtag/js?id=G-SS4EYV1N30`. Geen Meta Pixel, geen Hotjar gevonden |
| Consent | Complianz GDPR (opt-in, TCF) | `plugins/complianz-gdpr/cookiebanner/js/complianz.min.js`, body-class `cmplz-optin` |
| Hosting | niet vastgesteld (geen server-header in de scrape) | — |

De custom CSS/JS zit in de plugin "Simple Custom CSS and JS" (HTML-comments `<!-- start Simple Custom CSS and JS -->`),
niet in het child-theme — dat is waar Piggy en Guestplan ingeprikt zijn.

---

## 3. Animatie & interactie

Alles wat beweegt komt uit Salient's eigen animatiemotor (anime.js + Waypoints als scroll-trigger); er is
geen enkele hand-geschreven animatielaag.

| Element | Wat het doet | Bewijs |
|---|---|---|
| Hero-titel ("AMSTERDAM" / "CENTRUM") | regel-voor-regel reveal met "twist" | `<div class="nectar-split-heading … animated-in" data-text-effect="twist-bottom" data-animation-type="line-reveal-by-space" data-animation-delay="900">` en een tweede met `delay="1100"` |
| Hero achtergrond | **statische achtergrondafbeelding**, geen video, geen canvas | `<div class="row-bg-wrap" data-bg-animation="none">…`, `min-height: 96.6329vh`; 0 `<video>`-tags in de pagina |
| Logo/afbeeldingen | "grow-in" bij in-beeld-komen | `<img class="img-with-animation … animated-in" data-animation="grow-in" data-delay="0">` |
| Scroll-animaties (techniek) | Waypoints zet `.animated-in` op elementen; WPBakery-rijen gebruiken animate.css-klassen | `waypoints.js?ver=4.0.2`, class `wpb_animate_when_almost_visible`, `animate.css/animate.min.css` |
| Nav-hover | animated underline | `data-lhe="animated_underline"` op `#header-outer` |
| Header | permanent transparant over de hero, geen shrink | `data-permanent-transparent="1"`, `data-header-resize="0"`, `header-perma-transparent.css` |
| Menu | full-screen off-canvas overlay ("Menu" → `#slide-out-widget-area`) | `off-canvas/fullscreen-legacy.css`, link `#slide-out-widget-area` |
| Footer | footer-reveal (content schuift over de footer heen) | `data-footer-reveal="1"` op `<body>` |
| Slider/carousel | Flickity + touchSwipe geladen (collections/gallery-rij) | `third-party/flickity.js?ver=2.3.3`, `touchswipe.min.js` |
| Lightbox | fancybox | `jquery.fancybox.js` + `jquery.fancybox.css` |
| Page transitions | ja, Salient's page-transition | html-class `page-trans-loaded` |
| Loader/intro | ja, Salient starting-logo | `<img class="starting-logo skip-lazy">` (+ dark-version) |
| Parallax | **uit** op mobiel | `data-remove-m-parallax=""`, `data-remove-m-video-bgs=""`, `data-m-animate="1"` |
| **prefers-reduced-motion** | **effectief niet ondersteund** | precies 1 treffer in de hele pagina, en die komt uit de Piggy-widget (`@media (prefers-reduced-motion) { .sonner-loading-bar … }`). Salient's eigen animaties respecteren het niet |

---

## 4. Design

- **Layout**: klassieke one-pager per locatie, full-width WPBakery-rijen (`vc_row` met `row-bg-wrap`),
  hero op `min-height: 96.6329vh` (opvallend: geen ronde waarde — handmatig ingesleutelde vh).
- **Typografie**: twee custom merkfonts `TAKUMI-DK.ttf` en `TAKUMI-IMPACT.ttf` (**.ttf, geen woff2**),
  plus Google Fonts `Open+Sans:300,400,600,700` en `ocr-bregular` (Adobe/OCR-B) voor accenten.
  Responsieve maten zijn per breakpoint hard ingesteld: `font_size_80px font_size_tablet_76px font_size_phone_62px`.
- **Kleur**: zwart/wit basis met merkkleur als accent — geel `#ffe109` / `#ffe00b`, rood `#ff3333`,
  roze `#ee4c79`, crème `#fefcdb`. Per locatie wisselt de accentkleur mee met het logo-bestand
  (`Takumi_Logo2_Blue.png` / `_Yellow-4.png` / `Umaimon-Logo.png`).
- **Beeld**: uitgesneden gerecht-PNG's op transparante achtergrond ("signature dishes"), sfeer-JPG's
  (`Frame-1_compressed-2.jpg` … `Frame-7_compressed2.jpg`) en een Instagram-feed. Vrijwel alles PNG/JPG,
  **1 webp-vermelding in de hele pagina**.
- **Japanse typografie als designelement**: elke sectiekop is tweetalig — `-OUR MENU- お⾷事`,
  `-TAKUMI- COLLECTIONS 匠コレクション`, `-GALLERY- ギャラリー`. Dit is het sterkste, consistentste
  merkgebaar van de hele site en kost niets technisch.
- **Mobiel**: `data-header-breakpoint="1000"`, aparte `responsive.css`, mobiele logo-hoogte 50px,
  parallax/video-bg's uit. **Zwak punt**: `viewport … maximum-scale=1, user-scalable=0` — zoomen is
  uitgeschakeld, dat is een toegankelijkheidsfout (WCAG 1.4.4).
- **Sterk**: strakke merkconsistentie over 5 subsites; duidelijke sectie-ritmiek; grote, goed uitgesneden food-fotografie.
- **Zwak**: geen prijzen of menu in HTML (alles PDF), stapeling van page-builder-divs, PDF-menu's van
  wisselende datum (`2023april…`, `2026feb…`, `2026jul…`, `2026-09`) door elkaar per locatie.
- Puur visueel oordeel over witruimte/hiërarchie: **niet vastgesteld** (screenshot niet in te zien).

---

## 5. Kern: hoe de multi-locatie "template" is opgezet

### 5.1 Architectuur — géén template-pagina's, maar 5 losse subsites

Dit is de belangrijkste bevinding. De vijf locaties zijn **geen** pagina's met een gedeelde template en
custom fields, maar **vijf aparte WordPress-sites in één multisite-netwerk**:

- Elke locatie heeft een eigen uploads-map: `/nl/amsterdam-centrum/wp-content/uploads/2022/07/Umaimon-Logo.png`
  vs `/nl/amsterdam-depijp/wp-content/uploads/2021/11/Takumi_Logo2_Yellow-4.png`.
- Elke locatie heeft een eigen `cookie-policy-eu/`-pagina, eigen favicon, eigen Guestplan-accessKey,
  eigen footer-copyright (`© 2026 UMAIMON.` vs `© 2026 Takumi Ramen Noodles | Amsterdam De Pijp.`).
- **Zelfs de plugin-set verschilt**: alleen `amsterdam-centraal` draait Yoast SEO (`robots: "index, follow,
  max-snippet:-1…"`, `og:locale`, `article:modified_time: 2026-09-07`); de andere vier hebben alleen
  WP-default meta (`robots: "max-image-preview:large"`). Alleen `centrum` laadt de Piggy-loyaltywidget.
- Dezelfde pagina is dus 5× met de hand nagebouwd in WPBakery. De gedeelde "template" zit in het
  gedeelde **child-theme + dezelfde sectievolgorde**, niet in data.

### 5.2 Vaste sectievolgorde (identiek op alle 5)

1. Hero: logo + `AMSTERDAM` / `<WIJK>` split-heading + broth-tagline (bv. `TONKOTSU AND SUSHI 豚骨 & 寿司`)
2. Ankerknoppen `FOOD & DRINKS` / `CONTACT` / `DELIVERY` (alle drie naar `#menu` / `#contact`)
3. `-OUR MENU- お⾷事` — 2–5 alinea's verhaal over de bouillon + PDF-knoppen
4. `-DELIVERY-` — logo's van bezorgpartners
5. `-SIGNATURE DISHES-` — 3–6 uitgesneden gerechtfoto's met naam
6. `-TAKUMI- COLLECTIONS 匠コレクション` — 6 merchandise-links naar `takumicollection.com` (**identiek op alle 5**)
7. `-CONTACT-` / `-HOURS-` / `-SOCIALS-` / `-HOW TO GET THERE-`
8. Google Maps achter een consent-gate ("Click 'I agree' to enable Google maps")
9. `-GALLERY- ギャラリー` — Instagram-feed `@takumiramen.nl` (**identieke posts op alle 5**)
10. Footer + `Site built by The Pixel Bakery`

### 5.3 Wat per locatie varieert (de facto "velden")

| Veld | centrum | umaimon (Leidseplein) | centraal | depijp | rivierenbuurt |
|---|---|---|---|---|---|
| Merk/kleur | Umaimon rood | Umaimon rood | Takumi blauw | Takumi geel | Takumi geel |
| Tagline | SPICY TAN TAN MEN | chicken ramen チキンラーメン | TONKOTSU AND SUSHI 豚骨 & 寿司 | chicken ramen チキンラーメン | tonkotsu ramen チキンラーメン |
| Menu-copy | tantan/sesam | kip-bouillon | tonkotsu + sushi | kip-bouillon | kip-bouillon (!) |
| Menu-PDF | `2026JUL.PR-128-Umaimon-…` | `2026jul-…-Leidseplein-Webmenu_01.pdf` | `menukaart-takumi-spuistraat-2026-09.pdf` | `2026feb-…-De-Pijp-…watermaked.pdf` | `2026feb-…-Rivierenbuurt-binder-web.pdf` |
| Takeout-PDF | `2023april_umaimon-takeout-final.pdf` | ja (2026jul) | — | ja (2026) | ja |
| Allergenen | 2 verschillende indd-links op één pagina | `3b957519…` | `bdcbbe66…` | `02e5e171…` | `fee8542b…` én `02e5e171…` |
| Signature dishes | 4 (Mala Kara-Ebi, Chicken Noukou, Gyoza, Kara-Age) | 5 | 6 (incl. sushi/toro) | 5 | 3 |
| Bezorging | UberEats **+ Thuisbezorgd** | geen | UberEats | UberEats | UberEats |
| Reserveren | Guestplan-widget | **alleen telefonisch, groepen 6+** | Guestplan ("Tafel reserveren", 2 gasten) | **geen — alleen walk-in** | Guestplan ("Takumi Tonkotsu Rivierenbuurt – Online reservation") |
| Telefoon/e-mail | +31 20 226 9012 / nzvoorburgwal@umaimonramen.nl | +31 20 261 3880 | +31 20 261 1861 / spuistraat@takumiramen.nl | +31 20 237 1750 / takumi@ramenkitchen.nl | +31 20 238 6071 / takumi2@ramenkitchen.nl |
| Openingstijden | ma–za 12:00–21:30, zo tot 21:00 | ma–do 12:00–22:00, vr/za tot 22:30, zo 21:30 | ma–za 12:00–21:30, zo 21:00 | idem centrum | idem centrum |
| Route | tram 2/12/13/17 → Dam | tram 2/12 → Leidseplein | — | — | — |
| Unieke sectie | — | **`-THE POOL STAMP CARD- プール・スタンプカード`** (pooltafel + spaarkaart, eigen voorwaarden) | — | — | — |

### 5.4 Kopieer-fouten die de "handmatige template" verraden

Dit is het beste argument voor data-driven locatiepagina's:

- **rivierenbuurt** heeft in de contactsectie de kop `#### DEPIJP` staan en een **Google-Maps-link naar
  Ferdinand Bolstraat (De Pijp)** terwijl het adres Scheldestraat 1 is. Harde bug.
- **rivierenbuurt** tagline zegt `tonkotsu ramen` maar de katakana ernaast is `チキンラーメン` (chicken ramen),
  en de body-tekst zegt óók "we serve chicken broth ramen".
- **rivierenbuurt** mobiel logo heeft `alt="Takumi Amsterdam De Pijp"`; **centraal** heeft
  `alt="Takumi Amsterdam De Hallen"`.
- **centrum** en **umaimon** hebben allebei exact `<title>UMAIMON – No Ramen, No Life!</title>` — twee
  subsites met een identieke titel-tag.
- **centraal** heeft `article:publisher = facebook.com/takumiantwerp2` (Antwerpse Facebook-pagina).
- **centrum** linkt naar twee verschillende allergenenkaarten op dezelfde pagina (`31ad4131…` en `3b957519…`).
- E-mailadressen volgen oude straatnamen (`spuistraat@` op een pand aan de Nieuwezijds Voorburgwal).

---

## 6. Structuur & conversie

- **Primaire CTA**: onduidelijk/verdeeld. De drie hero-knoppen zijn alle drie *ankers* naar dezelfde
  secties (`#menu`, `#contact`, `#menu`) — er is geen enkele "Reserveer"-knop in de HTML. Reserveren
  gebeurt via de Guestplan-widget die pas ná pagina-load door `widget.js` wordt ingevoegd.
- **Boven de vouw**: alleen logo + `AMSTERDAM/<WIJK>` + tagline. **Adres, openingstijden en reserveren
  staan helemaal onderaan** — op een locatiepagina is dat precies verkeerd om.
- **Bestelflow**: uit de site weg naar UberEats/Thuisbezorgd (nieuw tabblad), menu naar PDF, allergenen
  naar `indd.adobe.com`. Er is geen enkele geïndexeerde menu-tekst.
- **SEO-basics**:
  - title/description: aanwezig, maar dubbel en deels gedupliceerd (zie §5.4).
  - **Geen `ld+json` / schema.org op geen enkele pagina** (0 treffers). Voor 5 fysieke vestigingen is
    ontbrekende `Restaurant`/`LocalBusiness`-markup met `openingHours` + `address` de grootste gemiste kans.
  - **Geen `hreflang`**, terwijl de URL's een `/nl/`-segment hebben en de content Engels is.
  - Geen `noindex` gevonden; alleen `centraal` heeft expliciet `index, follow` (Yoast).
- **Performance-hints**: ~31 `<script src>` en ~30 stylesheets op één pagina; jQuery + migrate;
  16 afbeeldingen met `class="skip-lazy"` (lazy-loading *bewust uitgezet*), **geen enkel `loading="lazy"`-attribuut**
  in de body, slechts 6 `srcset`-declaraties, custom fonts als `.ttf` in plaats van woff2,
  en de Instagram-feed haalt 9 full-size JPG's op (`…_nfull.jpg`).

---

## 7. Score

| As | Score | Eén zin |
|---|---|---|
| Design | **7/10** | Sterke, eigenzinnige merktaal (tweetalige koppen, custom TAKUMI-fonts, uitgesneden food-PNG's) die over 5 subsites consistent blijft, maar de opbouw is standaard page-builder-stapelwerk. |
| Animatie | **5/10** | Netjes getimede split-heading reveals en footer-reveal, maar alles is out-of-the-box Salient (anime.js + Waypoints) en `prefers-reduced-motion` wordt niet gerespecteerd. |
| Conversie | **4/10** | Geen zichtbare reserveer-CTA, adres/tijden pas onderaan, menu's uitsluitend in PDF en per locatie een andere reserveermethode zonder dat de pagina dat bovenaan uitlegt. |
| Techniek | **4/10** | WP-multisite + WPBakery met ~60 requests, uitgezette lazy-loading, geblokkeerde zoom, geen structured data, en vijf handmatig gekloonde sites waar de kopieerfouten al zichtbaar zijn. |

---

## 8. Wat overnemen / wat vermijden (voor de SvelteKit-demo)

**Overnemen**

1. **Eén locatie-datastructuur, vijf routes.** Precies de velden uit §5.3 als een `location`-object
   (`slug, brand, accent, tagline, taglineJp, story, menuPdf, takeoutPdf, allergenUrl, dishes[],
   delivery[], reservation{type,url|phone}, address, phone, email, hours[], transit, extraSections[]`)
   en één `+page.svelte` op `/[locatie]`. Daarmee zijn alle fouten uit §5.4 per constructie onmogelijk.
2. **De tweetalige sectiekoppen** (`-OUR MENU- お⾷事`). Kost niets, draagt het hele merkgevoel, en is
   trivially te implementeren als `{title}` + `{titleJp}` in dezelfde data.
3. **Per-locatie accentkleur als CSS-variabele** in plaats van per-locatie logo-bestanden en een eigen
   site: `--accent` op de route-root, en één set SVG-logo's met `currentColor`.
4. **De `extraSections`-ontsnapping.** Leidseplein's Pool Stamp Card laat zien dat één vestiging altijd
   iets unieks heeft; plan er een optioneel sectie-slot voor in plaats van de template te forken.
5. **Schema.org `Restaurant` per locatie** genereren uit diezelfde data (`address`, `openingHoursSpecification`,
   `servesCuisine`, `menu`) — dat is exact wat deze site over vijf vestigingen mist.

**Vermijden**

1. **Menu's alleen als PDF.** Geen prijs of gerecht is doorzoekbaar; zet de kaart als HTML-data neer en
   genereer de PDF desnoods daaruit.
2. **Adres, tijden en reserveren onderaan.** Zet op een locatiepagina status ("nu open tot 21:30"), adres
   en één reserveerknop direct boven de vouw.
3. **`maximum-scale=1, user-scalable=0` en `skip-lazy` overal.** Zoom afzetten is een a11y-fout; en in
   SvelteKit hoef je lazy-loading niet uit te zetten om animaties te laten werken.
4. **Animaties zonder `prefers-reduced-motion`.** Eén media-query en een `$derived` guard, en je doet het
   meteen beter dan de referentie.
5. **Per-vestiging een eigen deploy.** Vijf kopieën betekent vijf keer verouderde PDF's (hier: feb, jul en
   sep 2026 door elkaar) en vijf keer een verkeerde Maps-link.
