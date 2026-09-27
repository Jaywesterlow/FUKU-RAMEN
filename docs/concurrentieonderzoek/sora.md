# Sapporo Ramen SORA — ramensora.nl

Bron: Firecrawl scrape van https://ramensora.nl/ (rawHtml + links, waitFor 3000, maxAge 0), plus
directe scrapes van `assets/js/bundle.js?ver=1.0.05` en `assets/css/styles.css?ver=1.0.05` van het
eigen theme. Screenshots niet gemaakt (budget); design-uitspraken komen uit CSS + markup, niet uit beeld.

---

## 0. Vooraf: de `noindex`-claim — GEVERIFIEERD ALS FALSE POSITIVE

De homepage is **niet** op noindex gezet. In de `<head>` staat exact:

```html
<meta name="robots" content="max-image-preview:large">
<link rel="canonical" href="https://ramensora.nl/">
<meta name="generator" content="All in One SEO (AIOSEO) 4.8.1.1">
```

Er is dus **geen** `noindex` in de page-level robots-meta. In de hele rawHtml komt `noindex`
tweemaal voor:

1. In een door de **AddToAny**-plugin geïnjecteerd, verborgen iframe-document
   (`style="...display:none" data-original-tag="iframe"`), met eigen `<head>`:
   `<title>A2A</title><meta name="robots" content="noindex">`. Dat is de share-menu-iframe van
   AddToAny, niet de pagina zelf.
2. In het door Firecrawl **samengevoegde** metadata-object:
   `"robots": ["max-image-preview:large", "noindex"]` — Firecrawl heeft de meta uit het
   AddToAny-iframe bij de page-meta opgeteld. Dát is de bron van de eerdere melding.

Conclusie: de eerdere scan las een meta-tag uit een ingebedde plugin-iframe. De homepage zelf
staat op index/follow (default). **Niet vastgesteld**: de HTTP-response-headers (`X-Robots-Tag`) —
die konden met de beschikbare tools niet uitgelezen worden.

---

## 1. Identiteit

- **Naam**: Sapporo Ramen SORA. Site-title/`<title>`: `Sapporo Ramen SORA - Sapporo Ramen SORA`
  (dubbele naam = onopgeloste title-template, slordig).
- **Twee locaties**, beide met eigen H2-blok op de homepage:
  - *SORA -De Pijp-*, Ceintuurbaan 49H, 1072 ET Amsterdam, +31 (0)20 664 4396.
    Ma–vr lunch 12:00–15:00 / diner 17:30–21:00; za–zo 12:00–21:00.
  - *SORA -Amsterdam West-*, Marco Polostraat 223H, 1056 DL Amsterdam, +31 (0)20 239 0780.
    Ma/wo/do 17:00–22:00 (LO 21:30), di gesloten, vr–zo 12:00–22:00.
- **Talen**: alleen Engels. `<html lang="en">`, `og:locale = en_US`, schema `inLanguage: "en-US"`.
  Geen `hreflang` (0 hits), geen NL-versie. Voor een Amsterdams restaurant opvallend.
- **Reserveren**: expliciet níet. Letterlijk twee keer in de tekst:
  `※We don't accept reservations for seats.` Geen Zenchef/Formitable/Resengo/TheFork/OpenTable
  (0 hits op alle reserveringsplatforms).
- **Bestellen/bezorgen**: alleen **Uber Eats**, per vestiging, via bit.ly-links die ook nog eens
  door een Facebook-redirect lopen (`l.facebook.com/l.php?u=https%3A%2F%2Fbit.ly%2F3crDlXy...`)
  — gekopieerd uit een Facebook-post. Geen Thuisbezorgd, Deliveroo, Sitedish (0 hits).
- **Prijssegment**: niet vast te stellen uit de homepage (geen prijzen); casual ramen-shop op basis
  van de propositie ("Authentic Sapporo Ramen from Japan", walk-in only).

## 2. Tech stack

- **CMS**: WordPress **6.5.10** (`wp-includes/css/dist/block-library/style.min.css?ver=6.5.10`);
  content in de homepage is Gutenberg-blocks (`data-rich-text-line-break` attributen).
- **Theme**: eigen theme `ramen-sora-theme` (alle assets onder
  `/wp-content/themes/ramen-sora-theme/assets/...`), asset-versie `1.0.05`. Uploads uit 2018/2020
  (`/wp-content/uploads/2018/05/...`, `/2020/09/...`) — datePublished in schema is
  `2015-04-25`, dateModified `2026-01-19`.
- **Page builder**: géén. 0 hits op elementor, wpbakery, wix, squarespace, webflow, framer,
  shopify, kirby, _next, nuxt, svelte, astro. Handgeschreven theme met BEM-achtige prefixes
  (`l-wrapper`, `l-header`, `p-section-firstview`, `p-sliderItem__title`, `c-`).
- **JS-basis**: **jQuery 3.4.1** van `ajax.googleapis.com` (met `?ver=3.2.1` — versienummer klopt
  niet met het bestand). Eén theme-bundle `assets/js/bundle.js?ver=1.0.05` (~150 KB), gebouwd met
  een moderne bundler (esbuild/rollup-signatuur), waarin gebundeld zitten:
  - **AOS** (Animate On Scroll) — bewijs in bundle: `F.node.removeAttribute("data-aos")`,
    `"data-aos-easing"`, `"data-aos-duration"`, `"data-aos-delay"` (18 hits).
  - **slick carousel** — 203 hits in de bundle; in de DOM `slick-slider slick-initialized`,
    `slick-track`, `slick-cloned`, `slick-arrow`, `slick-prev/next`, `slick-current slick-center`.
  - Géén gsap/ScrollTrigger, lenis, locomotive, swiper, splide, lottie, three/WebGL, barba,
    framer-motion, animate.css (alle 0 hits, zowel in HTML als in de bundle).
- **Plugins** (uit asset-paden): All in One SEO 4.8.1.1, Contact Form 7 5.9.6 (+ reCAPTCHA v3,
  sitekey `6Lf0L9kUAAAAACDEqkzD2du05IdSHSbebKGxxYge`), Cookie Notice 2.5.6, AddToAny share,
  Really Simple SSL (`<body data-rsssl="1">`).
- **Tracking**: Google Tag Manager `GTM-M34BV5L` (script + noscript-iframe). Geen directe gtag.js,
  geen Meta Pixel, geen Hotjar (0 hits).
- **Hosting-hints**: uploads worden geserveerd vanaf een aparte host
  `https://www-static.ramensora.nl/wp-content/uploads/...?media=1716266195` (static/CDN-subdomein
  met cache-buster) terwijl theme-assets van `ramensora.nl` komen. Concrete hostingpartij:
  **niet vastgesteld**.
- **Bouwer/bureau**: **niet vastgesteld** — geen credit in footer of broncode.

## 3. Animatie & interactie

- **Hero / first view**: `p-section-firstview` met `p-firstviewSlider` — een **slick-carousel**,
  geen video, geen canvas/WebGL (`<video` 0 hits, `<canvas` 0 hits). Slides zijn
  **nieuwsberichten**, niet food-beelden als hero: "POINT CARD" en "Take Away&Delivery", met
  `slick-cloned` duplicaten (infinite loop) en zichtbare Previous/Next-knoppen
  (`slick-arrow slick-prev/next`). Autoplay-interval: niet vastgesteld (config zit geminificeerd
  in bundle.js).
- **Scroll-animaties**: AOS is geladen en geconfigureerd op `<body>`:
  `data-aos-easing="ease" data-aos-duration="400" data-aos-delay="0"`, en de CSS definieert
  `[data-aos=fade-up]{opacity:0;transition-delay:.3s;transition-duration:.8s;transform:translateY(20px)}`
  + `[data-aos=fade-up].aos-animate{opacity:1;transform:translateY(0)}`.
  **Maar**: op de homepage staat op geen enkel element een `data-aos="..."`-waarde — alleen de drie
  config-attributen op body. De scroll-animatie is dus wél ingebouwd maar op de homepage
  **niet in gebruik**. Techniek is AOS' eigen scroll-listener, geen IntersectionObserver
  (0 hits in HTML en bundle).
- **Loader/intro**: keyframes `circlemove` (`0%{bottom:80%} to{bottom:10%}`) en `cirlemovehide`
  (opacity-pulse, incl. typo in de naam) staan in de CSS — dat is het klassieke
  "scroll down"-bolletje dat langs een lijn zakt. Of het op de homepage getoond wordt:
  niet vastgesteld.
- **Hover-effecten**: minimaal. 10 `transition:`-declaraties in het hele theme-CSS, en
  `@media (hover: hover) and (pointer: fine)` wordt 2× gebruikt (correcte praktijk: hover-styles
  niet op touch).
- **Page transitions**: geen. Klassieke WP-pageloads, geen barba/turbo/PJAX.
- **Menu-animatie**: mobiel hamburgermenu aanwezig (dubbele nav in de markup: desktop + mobiel);
  de exacte animatie zit in de bundle en is **niet vastgesteld**.
- **Reduced motion**: **de facto niet ondersteund**. Er is precies één
  `@media (prefers-reduced-motion: reduce)`-blok in de CSS, en dat is het meegeleverde
  **Font Awesome 6**-blok (`.fa-beat,.fa-bounce,...{animation-duration:1ms}`). Het theme zet
  zijn eigen slider/AOS/circlemove-animaties daar niet mee uit. In `bundle.js` komt
  `prefers-reduced-motion` 0× voor.

## 4. Design

- **Layout**: gecentreerde container, `--inner-width: 1220px`, `--content-width: 85%`. Opbouw:
  header met logo-afbeelding + H1-tekstlink, nav (Menu / Jobs / Contact), full-width slider,
  tekstsectie, twee locatieblokken.
- **Typografie** (uit de CSS-variabelen, geen gokwerk):
  `--font-nunitosans: "Nunito Sans", sans-serif` en `--font-ebgaramond: "EB Garamond", serif`,
  gemapt op `--font-primary` (body) en `--font-secondary` (koppen). Geladen via
  `fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Nunito+Sans:wght@400;500;700;800&display=swap`
  met preconnect naar fonts.googleapis.com en fonts.gstatic.com — netjes gedaan.
  Body: `font-size: 19px`, `line-height: 1.75`, kleur `#252525`. Site-title 50px EB Garamond,
  H2 32px/700. Er staat ook nog een losse `font-family: Work Sans,sans-serif` in de CSS
  (reststuk, font wordt niet geladen).
- **Kleur**: zeer sober. `--color-red: #b11111` als enige accent (plus `#b5091f` in
  gerelateerde regels), `--color-text: #121212`, verder wit `#fff`, `#252525`, `#999`, `#ccc`.
  Rood-op-wit, Japans-sober. De overige hexcodes (`#5078be`, `#9fc4ce`, `#408bd1`) zijn
  plugin-CSS (AddToAny/CF7), geen merkkleur.
- **Beeld**: uitsluitend **JPG/PNG/SVG** — 0 hits op webp/avif. Slider-beelden zijn ongeoptimaliseerd
  (o.a. `IMG-5694-scaled.jpg`, een WP "-scaled" origineel). Een van de slides is een
  tekst-plaatje (`web用.jpg`, Japanse bestandsnaam) — tekst in beeld, dus niet selecteerbaar,
  niet vertaalbaar, niet responsive.
- **Mobiel**: één hoofdbreakpoint, `@media screen and (min-width: 1px) and (max-width: 768px)`
  (38×) plus `(min-width: 769px)` (4×) en een tussenrange 769–1240px. Dus mobile-fixes bovenop
  een desktop-eerst layout, niet echt mobile-first.
- **Sterk**: rustig en leesbaar (19px/1.75), serif+sans-combinatie past bij het merk,
  één helder accentkleur, hover-media-query correct toegepast, fonts met `display=swap` en
  preconnect, CSS-custom-properties netjes opgezet.
- **Zwak**: de hero is een nieuws-slider met promo-plaatjes in plaats van eten; dubbele
  `<title>`; geen NL; beelden zwaar en zonder moderne formaten; tekst-in-plaatje;
  visueel weinig ambitie voor een restaurant dat het van sfeer moet hebben.

## 5. Structuur & conversie

**Homepage in volgorde** (uit de DOM):
1. Header: logo-image + H1 "Sapporo Ramen SORA" + tagline "Authentic Sapporo Ramen from Japan".
2. Nav: Menu / Jobs / Contact (3 items — geen "Locaties", geen "Bestellen" in de nav).
3. `p-section-firstview`: slick-slider met nieuws-slides (POINT CARD, Take Away&Delivery),
   elk gelinkt naar `/category/news/` of `/point-card/` / `/take-awaydelivery-available/`.
4. Introtekst ("We are a ramen restaurant in Amsterdam…").
5. **Delivery**-blok: "Find us on Uber Eats", per vestiging een bit.ly-link.
6. Social: Facebook, Instagram.
7. Twee locatieblokken (H2) met openingstijden, adres, telefoon, "no reservations".
8. Cookie-notice-balk + AddToAny share-menu.

- **Primaire CTA**: er is er geen. Geen button-achtige CTA in de header, geen "Bestel nu",
  geen "Bekijk menu" boven de vouw. De sterkste conversie-actie (Uber Eats) is een kale
  tekstlink halverwege de pagina, via twee redirects.
- **Reserveerflow**: bewust afwezig ("we don't accept reservations"). Bellen is de enige directe
  actie; de telefoonnummers staan als platte tekst (`Call : +31 (0)20 664 4396`) — **geen
  `tel:`-link**, dus op mobiel niet aantikbaar. Gemiste conversie.
- **Openingstijden/adres boven de vouw?** Nee — die staan onderaan, onder de slider en de
  introtekst. Voor een walk-in-only zaak is dat precies de verkeerde volgorde.
- **SEO-basics**:
  - `<title>`: `Sapporo Ramen SORA - Sapporo Ramen SORA` (duplicaat).
  - `meta description`: aanwezig, 330+ tekens (te lang, wordt afgekapt) en identiek aan de
    introtekst op de pagina.
  - `canonical`: `https://ramensora.nl/`. `robots`: `max-image-preview:large` (geen noindex, zie §0).
  - **ld+json**: ja, één AIOSEO-graph met `BreadcrumbList`, `Organization`, `WebPage`, `WebSite`.
    **Geen `Restaurant`/`LocalBusiness`, geen `openingHoursSpecification`, geen `address`, geen
    `Menu`** — terwijl de pagina twee complete NAP-blokken met openingstijden bevat. Grootste
    gemiste SEO-kans van de site.
  - `hreflang`: afwezig; site is en-US only.
  - OG-tags aanwezig (`og:site_name`, `og:type`, `og:description`, `twitter:title`).
- **Performance-hints**: ~15 externe/losse scripts, waaronder jQuery 3.4.1 van een externe CDN,
  GTM, **reCAPTCHA v3 dat op elke pagina laadt** (ook op de homepage, waar geen formulier staat),
  AddToAny (2 scripts + een verborgen iframe-document), Contact Form 7 (3 scripts + CSS) en
  4 wp-polyfill-bestanden. **Geen enkele `loading="lazy"`** (0 hits), geen `<picture>`/srcset-
  varianten in webp/avif. Stylesheets: theme `styles.css` (~138 KB, met complete Font Awesome 6
  erin) + `update.css` + block-library + plugin-CSS.

## 6. Score

- **Design — 5/10.** Typografisch verzorgd (EB Garamond + Nunito Sans, 19px/1.75) en met één
  helder rood accent, maar de hero toont promo-plaatjes in plaats van eten en het geheel oogt als
  een nette blog, niet als een restaurant.
- **Animatie — 3/10.** Eén slick-slider doet al het werk; AOS is wel gebundeld en geconfigureerd
  maar op de homepage nergens toegepast, en reduced-motion wordt alleen door de meegeleverde
  Font Awesome-CSS gerespecteerd.
- **Conversie — 3/10.** Geen CTA, geen `tel:`-links, openingstijden en adres pas onderaan, en de
  enige bestelroute is een bit.ly-link die eerst langs een Facebook-redirect gaat.
- **Techniek — 5/10.** Actuele WP-core en een schoon, handgeschreven theme met CSS-variabelen en
  één bundle, maar jQuery 3.4.1 van een externe CDN, reCAPTCHA sitewide, geen lazy loading,
  geen moderne beeldformaten en geen LocalBusiness-schema.

## 7. Wat overnemen / wat vermijden (voor de SvelteKit-demo)

**Overnemen**
1. **De type- en tokenopzet.** Serif-display (EB Garamond) + humanist sans (Nunito Sans), body
   19px/1.75, één accentkleur, alles als CSS custom properties. Dat is precies de sobere
   Japanse toon die werkt — dit mag je letterlijk als uitgangspunt nemen.
2. **`@media (hover: hover) and (pointer: fine)`** voor alle hover-states — SORA doet dit goed en
   de meeste restaurantsites niet.
3. **Twee vestigingen als twee volwaardige NAP-blokken** (openingstijden per dagdeel, adres,
   telefoon, expliciete "geen reserveringen"-regel). De inhoud is compleet; alleen de plek klopt niet.

**Vermijden / beter doen**
4. **Zet de conversie-informatie bovenaan en maak hem klikbaar.** Adres, vandaag-open-tot en een
   echte CTA ("Bestel via Uber Eats" / "Bekijk het menu") boven de vouw; telefoonnummers als
   `tel:`-links; nooit een bestelroute via bit.ly + Facebook-redirect.
5. **Gebruik de hero voor eten, niet voor nieuws.** Een slider met promo-plaatjes (waarvan één
   een tekst-JPG) is verspilde ruimte. In SvelteKit: één sterk beeld of een korte gemute
   `<video autoplay muted playsinline>`, met `<picture>` + AVIF/WebP en `loading="lazy"` voor
   alles onder de vouw — SORA heeft nul lazy loading en nul moderne formaten.
6. **Doe schema.org goed.** `Restaurant`/`LocalBusiness` met `address`, `geo`,
   `openingHoursSpecification` en `hasMenu` per vestiging — SORA heeft alle data op de pagina
   staan en markeert er niets van. Gratis winst die de concurrent laat liggen.
7. **Animatie: kies IntersectionObserver + Svelte-transitions boven AOS/slick**, en wikkel alles in
   `@media (prefers-reduced-motion: reduce)`. SORA laadt jQuery + slick + AOS (samen ~150 KB) voor
   één carousel en respecteert reduced-motion alleen per ongeluk, via Font Awesome.
