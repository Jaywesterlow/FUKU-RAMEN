# Gifu Ramen Bar — site-analyse (gifuramenbar.com)

Bron: Firecrawl rawHtml + markdown van de homepage (live fetch, maxAge 0, 18-09-2026). Screenshots waren
niet op te halen (cloud-proxy blokkeerde de Google-Storage-URL van Firecrawl) — het design is daarom
beoordeeld op basis van de HTML/CSS in de bron, niet op beeld.

## 1. Identiteit

- **Naam:** Gifu Ramen Bar. `siteTitle":"Gifu Ramen Bar"`, `timeZone":"Europe/Amsterdam"`, `CEST`.
- **Concept:** "modern Japanese restaurant in Amsterdam, built around ramen, izakaya-style dishes".
  Team gevormd door de oprichters van Chun Café (link `instagram.com/chun_ams` in de About-tekst).
- **Locatie/adres:** exact adres **niet vastgesteld** — geen straatnaam, postcode of "Jordaan" in de
  homepage-HTML (grep op "Jordaan"/"straat" = 0 hits). Geen LocalBusiness-schema met adres.
- **Openingstijden:** wél op de homepage, maar weggeklapt in een FAQ-accordeon:
  Lunch za+zo 12:00–16:00 (last order 15:45), Dinner ma–zo 17:00–23:00 (last order 22:00).
- **Talen:** alleen Engels. `language: en-US`, `translationLocale":"en-US"`, **geen hreflang** (0 hits).
- **Prijssegment:** niet vastgesteld — menu's zitten in PDF's, geen prijzen in de HTML.
- **Reserveren/bestellen:** **Tebi** (`live.tebi.co/ecom/widget-manager.css`, knop
  `data-testid="widget-button-reservations"` met label "Reserve a table", deeplink
  `https://www.tebi.com/reservations-welcome/gifu-ramen-bar-762677?utm_source=Merchant`).
  Ook een cart-route `/cart` (Squarespace Commerce). Geen Formitable/Zenchef/TheFork/OpenTable-integratie
  (de string `opentable` in de body-class is alleen een ongebruikte Squarespace-tweak: `hide-opentable-icons`).
  Vacatures via Homerun (`gifuramenbar.homerun.co`).

## 2. Tech stack

- **Platform:** Squarespace 7.1, Fluid Engine. Bewijs: `<!-- This is Squarespace. -->`, body-class
  `sqs-seven-one`, `data-sqsp-section="fluid-engine"`, `data-fluid-engine-section`,
  `SectionWrapperController`, interne URL `plantain-strawberry-kmgd.squarespace.com`.
- **Geen** WordPress/Elementor/Wix/Webflow/Framer/Shopify; geen Next/Nuxt/Svelte/Astro (alle greps = 0).
- **Animatie-/JS-libraries:** geen GSAP, ScrollTrigger, Lenis, Locomotive, AOS, Swiper, Splide, Slick,
  Lottie, Three.js, Barba, Framer Motion, animate.css (allemaal 0 hits). Alles komt uit Squarespace zelf.
- **Wel aanwezig:** Plyr videospeler (`plyr__video-wrapper`, `plyr__controls`), Squarespace
  website-components (`definitions.sqspcdn.com/.../image-effect-parallax.js`, `image-effect-liquid.js` —
  zie §3), Modernizr-featureclasses op `<html>`, reCAPTCHA (`recaptcha-inline-badge`, via Tebi).
- **Assets/hosting:** Squarespace CDN (`static1.squarespace.com`, `images.squarespace-cdn.com`,
  `video.squarespace-cdn.com`), plus `live.tebi.co` voor het reserveer/bestel-widget.
- **Analytics:** geen GA4/gtag, geen Meta Pixel, geen Hotjar in de bron (0 hits). Alleen Squarespace-interne
  stats + cookie-banner-capability (`Static.COOKIE_BANNER_CAPABLE = true`).
- **Bureau/bouwer:** niet vastgesteld — geen credit in footer of bron.

## 3. Animatie & interactie — dit is de kern van de vraag

### Welke scroll-animatie precies

Het zijn **Squarespace 7.1 "Site-wide Animations"** (Design → Animations), niet losse
per-sectie-animaties en geen custom code. Harde configuratie uit de tweak-JSON in de bron:

```
"tweak-global-animations-enabled":"true"
"tweak-global-animations-animation-style":"fade"
"tweak-global-animations-animation-type":"flex"
"tweak-global-animations-complexity-level":"detailed"
"tweak-global-animations-animation-duration":"0.80s"
"tweak-global-animations-animation-delay":"1.0s"
"tweak-global-animations-animation-curve":"ease"
```

Dezelfde waarden staan als klassen op `<body>`:
`tweak-global-animations-enabled tweak-global-animations-complexity-level-detailed
tweak-global-animations-animation-style-fade tweak-global-animations-animation-type-flex
tweak-global-animations-animation-curve-ease`, plus body-class `seven-one-global-animations` en
`data-animation-state="booted"`.

Vertaald naar wat je ziet:

- **Type = "flex" → per element, niet per sectie.** Squarespace' "Flex" laat de losse blokken binnen een
  sectie in volgorde binnenkomen (gestaggerd); "Rigid" zou de hele sectie als één blok animeren.
  Bewijs in de DOM: elk geanimeerd element krijgt de klassen `preFlex flexIn` — dat geldt voor
  **afzonderlijke paragrafen en koppen**, niet voor de sectiecontainer:
  `<p ... class="preFlex flexIn" style="transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  transition-duration: 0.8s;">Gifu Ramen Bar is a modern Japanese restaurant…</p>` en identiek op de
  `<h4>`'s van "Who We Are". 39 keer `preFlex flexIn` op de homepage.
- **Style = "fade" → pure opacity-fade, géén slide/clip/scale.** De stijl staat expliciet op `fade`
  (de andere Squarespace-opties zijn o.a. Slide/Scale/Flex-varianten en worden hier niet gebruikt).
  Er is geen `translate`/`clip-path`/`scale` in de animatie-inline-styles; alleen
  `transition-timing-function` + `transition-duration`.
- **Timing:** duur **0,8 s**, delay **1,0 s** (die delay geldt als start-vertraging bij de eerste load),
  curve in de UI ingesteld op "ease" maar de daadwerkelijke inline transition is
  `cubic-bezier(0.19, 1, 0.22, 1)` — een sterke ease-out (easeOutExpo-achtig): snel weg, zacht uitrollend.
  Dat is exact het "rustige, dure" gevoel dat de opdrachtgever beschrijft.
- **Complexity = "detailed"** → Squarespace animeert niet alleen de grote blokken maar ook de
  kleinere/secundaire elementen (losse tekstregels, afbeeldingen, knoppen) mee.
- **Beelden hebben een eigen animatie-wrapper:**
  `<div class="fluid-image-animation-wrapper sqs-image sqs-block-alignment-wrapper preFlex flexIn"
  data-animation-role="image" style="transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  transition-duration: 0.8s;">`, in een root met
  `combination-animation-site-default individual-animation-site-default … animation-loaded`.
  "site-default" bevestigt: de afbeeldingen erven de site-brede fade, er is geen per-beeld override.
- **Secties zelf animeren niet apart:** elke `page-section` draagt `data-animation="none"`. Er is dus
  géén sectie-overlay/wipe; de beweging zit volledig op elementniveau.
- **Header animeert mee als aparte rol:** logo, nav-items en burger hebben
  `data-animation-role="header-element"` (13 hits) — die faden bij page-load mee in.
- **Trigger-techniek:** Squarespace' eigen animatie-runtime (klasse-wissel `preFlex` → `flexIn`,
  gestuurd door `data-animation-state="booted"`). De observer-code zit in de externe Squarespace-bundle,
  dus letterlijk `IntersectionObserver` staat **niet** in de HTML (0 hits) — de mechaniek is wel het
  klassieke "klasse toevoegen wanneer het element in beeld komt". Geen scroll-gekoppelde (scrubbed)
  animatie, geen parallax-scroll op secties.

### Overige beweging

- **Hero:** geen video-hero. De eerste sectie is een **stilstaand fotoblok** (ramen-kom) + tekst, met de
  fade-in. `og:image`/theme-color-donker; hero-beeld = `GIFU_FOTOS_2025-11-10 (37).jpg`.
- **Video:** twee **autoplay achtergrond-/inline-video's** verderop de pagina (Squarespace video block met
  Plyr): `<video playsinline webkit-playsinline loop muted autoplay loading="eager"
  data-poster="…video.squarespace-cdn.com/…/thumbnail">`. In de scrape laadden beide niet
  ("Unable to load video. Try again later." in de markdown) — mogelijk een laadprobleem voor bots, maar
  let op: dat is ook wat trage bezoekers kunnen zien.
- **Parallax / liquid image effect:** de scripts `image-effect-parallax.js` en `image-effect-liquid.js`
  worden door Squarespace **ingeladen** als component-definitie, maar geen enkel beeld draagt een
  effect-attribuut dat ze activeert (`data-animation="none"`, `individual-animation-site-default`).
  Conclusie: aanwezig in de bundle, **niet gebruikt** op deze pagina.
- **Hover-effecten:** niet vastgesteld uit de inline HTML; de knop-/linkstijlen zitten in de externe
  `site.css`. De aanwezige hover-tweaks in de body-class (`tweak-portfolio-hover-*`) horen bij een
  portfolio-collectie die hier niet bestaat — geen bewijs voor hover-animatie op de homepage.
- **Page transitions:** niet vastgesteld — geen Barba/Swup/View-Transitions in de bron; Squarespace 7.1
  doet standaard gewone page loads (elke pagina herhaalt de fade-in, wat als transitie oogt).
- **Loader/intro:** geen aparte preloader; het "intro"-effect is de 1,0 s delay + 0,8 s fade van
  header-elementen en het eerste blok.
- **Sliders/carousels:** geen (geen Swiper/Slick/Splide, geen `user-items-list-carousel`).
- **Menu-animatie:** mobiele overlay-nav is aanwezig (`data-section-id="overlay-nav"`,
  `header-burger-btn`, `menu-overlay-does-not-have-visible-non-navigation-items`); de openings-animatie
  is Squarespace-standaard (overlay + gefadede nav-items met `data-animation-role="header-element"`).
  Header is **niet sticky**: `"tweak-fixed-header":"false"`, wel `data-header-style="dynamic"`.
- **Reduced motion:** `prefers-reduced-motion` komt **niet** voor in de inline HTML/CSS (0 hits).
  Squarespace' eigen bundle respecteert het meestal, maar dat is hier **niet te bewijzen** — dus:
  niet vastgesteld, en niet zichtbaar afgedwongen door de site zelf.

## 4. Design

- **Typografie:** twee zelf-gehoste Squarespace-fonts: **Libertinus Serif** (koppen, incl. 700-weight,
  met unicode-range subsets cyrillic/greek/hebrew) en **Anonymous Pro** (monospace — de "technische"
  tegenhanger). `font-display: swap` staat aan. Geen Google Fonts of Typekit (`typekitId":""`).
- **Kleuren:** donker palet; `theme-color: #36302a` (warm donkerbruin). Sectie-thema's in de HTML:
  `dark-bold` en `black` (`data-section-theme="black"`). Footer eveneens `black`.
- **Layout:** Fluid Engine grid, 8 kolommen mobiel (`repeat(8, minmax(0, var(--cell-max-width)))`,
  `gap: 11px`), secties `content-width--wide`, `horizontal-alignment--center`,
  `vertical-alignment--middle`, deels `full-bleed`. Beelden in vaste aspect-ratio's
  (`--aspect-ratio: 5189/7784`, `5595/8393` — staand, portret-formaat).
- **Typografisch detail:** de displaykop is met forse letter/word-spacing gezet —
  "A&nbsp;&nbsp;&nbsp;tribute&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;the&nbsp;&nbsp;&nbsp;place…" komt in de
  markdown door als losse woorden met grote tussenruimte. Chic, maar slecht voor tekstselectie/SEO-parsing.
- **Beeld:** 5 `<img>` op de homepage, 4 met `loading="lazy"` (de hero eager), Squarespace-CDN met
  `?format=` resizing. **Geen `srcset`** in de server-HTML (0 hits) — Squarespace doet de responsive
  bronkeuze in JS, dus de eerste render is afhankelijk van script-uitvoering.
- **Mobiel:** `mobile-style-available` body-class, mobiele overlay-nav, en een Fluid Engine mobiel grid.
  Let op: `<meta name="viewport" content="… maximum-scale=1">` in het Tebi-widgetdocument blokkeert
  zoomen — een toegankelijkheidsminpunt binnen het reserveerwidget.
- **Sterk:** één consistente, terughoudende animatiegrammatica (alles 0,8 s fade, dezelfde easing),
  donker warm palet, serif + mono als enige twee fonts, geen carousels of pop-ups.
- **Zwak:** adres en route staan niet in de HTML van de homepage; openingstijden liggen achter een
  accordeon; de 1,0 s animatie-delay maakt dat de eerste viewport merkbaar leeg start; twee autoplay-video's
  die in de test niet laadden; geen structured data over het restaurant.

## 5. Structuur & conversie

Volgorde van de homepage (uit markdown + `data-section-id`, 6 contentsecties + header + overlay-nav + footer):

1. Header: logo, "Careers" (extern, Homerun), "Contact Us" (mailto), cart-icoon. Niet sticky.
2. Hero: staand foodbeeld + intro-alinea's (fade-in).
3. Video-sectie (autoplay, loop, muted).
4. Displaykop "A tribute to the place our chef calls home."
5. "Who We Are" — tekstblok + keukenfoto, met Chun Café-link.
6. Menu's: twee links, **naar PDF's** — `/s/Gifu-Ramen-Bar-Lunch-pjkc.pdf` en
   `/s/Gifu-Ramen-Bar-Dinner-93we.pdf`.
7. Tweede video-sectie.
8. FAQ-accordeon: Hours, Reservations/Walk-in, Menu information (incl. allergenen-PNG), Family & Pets,
   Food & Beverage policy, Accessibility.
9. Footer (`black`) + het Tebi-widget met de knop **"Reserve a table"**.

- **Primaire CTA:** "Reserve a table" (Tebi). Die zit onderaan/in het widget, **niet** in de header en
  **niet** boven de vouw — dat is de grootste conversiezwakte.
- **Reserveerflow:** Tebi-widget in een iframe (eigen Vue-bundle, eigen Inter-font, eigen
  `<meta name="robots" content="none">` — dat noindex geldt dus alléén het widget-document, niet de site).
  Max. 6 personen online; 7+ via e-mail. Walk-ins voor de bar.
- **Openingstijden/adres boven de vouw:** nee. Beide staan diep in de pagina (adres zelfs helemaal niet).
- **SEO:** title "Gifu Ramen Bar | Discover Modern Authentic Japanese Flavors — Visit Today",
  meta description aanwezig (wordt wel dubbel uitgeserveerd), volledige OG/Twitter-tags.
  **Geen noindex op de site zelf.** `ld+json` is aanwezig maar minimaal en waardeloos:
  `{"url":…,"name":"Gifu Ramen Bar","description":"","@type":"WebSite"}` — géén `Restaurant`/
  `LocalBusiness`, geen `openingHoursSpecification`, geen `address`, geen `Menu`. Geen hreflang.
- **Performance-hints:** 46 `<script>`-tags in de server-HTML (Squarespace-bundles + website-components +
  Tebi + reCAPTCHA), 2 autoplay-video's, zware staande JPG's van de Squarespace-CDN, 4/5 beelden lazy,
  geen `srcset`. De 1,0 s animatie-delay komt bovenop de laadtijd.

## 6. Score

- **Design 8/10** — consequent, volwassen en terughoudend: twee fonts, donker warm palet, veel witruimte,
  geen visuele ruis.
- **Animatie 7/10** — technisch heel simpel (één fade, één easing, één duur), maar juist daardoor rustig
  en "duur" ogend; het is wel volledig platform-standaard, en de 1,0 s delay is aan de trage kant.
- **Conversie 5/10** — de reserveerknop staat onderaan in plaats van in de header, adres ontbreekt,
  openingstijden zitten achter een accordeon en de menu's zijn PDF's.
- **Techniek 6/10** — schone Squarespace-implementatie zonder plugin-rommel, maar zwakke structured data,
  geen `srcset`, geen aantoonbare reduced-motion-ondersteuning en veel scripts.

## 7. Wat overnemen / wat vermijden (voor de SvelteKit demo)

1. **Neem de animatiegrammatica over, niet de techniek.** Eén regel volstaat: alle binnenkomende
   elementen `opacity 0 → 1` over **0,8 s** met `cubic-bezier(0.19, 1, 0.22, 1)`, gestaggerd per element
   binnen een sectie (~60–100 ms tussen kinderen). Geen slide, geen scale, geen clip. In Svelte: één
   `use:reveal`-action met `IntersectionObserver` (`rootMargin: "0px 0px -10%"`, `once: true`) die een
   klasse zet — functioneel identiek aan Squarespace' `preFlex → flexIn`.
2. **Doe het wél toegankelijk:** wrap alles in `@media (prefers-reduced-motion: reduce) { transition: none;
   opacity: 1 }` — precies wat op deze site niet aantoonbaar is.
3. **Verlaag de entry-delay.** De 1,0 s delay maakt de eerste viewport leeg bij load; 0–200 ms voor
   above-the-fold content en de stagger pas vanaf de tweede sectie voelt sneller zonder minder rustig te zijn.
4. **Vermijd hun conversiefouten:** zet een persistente "Reserveer" in een sticky header, adres +
   openingstijden + Google-Maps-link boven de vouw of in een altijd zichtbare footerbalk, en zet het menu
   in HTML in plaats van in een PDF (PDF-menu's zijn slecht op mobiel én onvindbaar voor zoekmachines).
5. **Doe de structured data beter:** `Restaurant` + `address` + `openingHoursSpecification` + `hasMenu`
   in JSON-LD. Hier staat alleen een lege `WebSite`-node — een gratis punt dat de concurrent laat liggen.
