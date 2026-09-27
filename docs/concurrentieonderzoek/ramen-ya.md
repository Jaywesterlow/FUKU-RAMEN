# Ramen-Ya (ramen-ya.nl) — site-analyse

Bron: Firecrawl rawHtml van de homepage (live fetch, `maxAge:0`, `waitFor:3000`), 664k tekens.
Screenshot-URL werd wél gegenereerd maar kon niet worden gedownload (egress-proxy blokkeert
storage.googleapis.com → 403). Alle visuele uitspraken hieronder komen dus uit de DOM/CSS, niet uit
een render. Waar dat niet volstaat: "niet vastgesteld".

## 1. Identiteit

- **Naam:** Ramen-Ya (og:site_name `Ramen-Ya`), title `Japanese Noodlebar Amsterdam | Ramen-Ya`.
- **Locatie:** één vestiging — Oudezijds Voorburgwal 236, 1012 GK Amsterdam ("Amsterdam Centrum" als
  sectiekop). Tel. +31 20 210 30 33 in de content; in de handmatige ld+json staat een afwijkend
  nummer `020-4095888` (inconsistentie, zie §5).
- **Sinds 2014**, Hakata-stijl (tonkotsu) ramen — bevestigd in meta description en herocopy:
  "Since 2014, Ramen-Ya has served handcrafted bowls of tonkotsu, miso, and shoyu ramen".
- **Openingstijden:** Ma–Zo 12:00–22:00 (volledige tabel in de footer).
- **Talen:** EN (default, `og:locale en_GB`) en NL. `hreflang="en"` → `/`, `hreflang="nl"` →
  `/nl/japanse-noodlebar-amsterdam/`. Vertaling via **Polylang** + `connect-polylang-elementor`
  (widget `polylang-language-switcher.default`, 2×).
- **Reserveren:** **Zenchef** — `sdk.zenchef.com/v1/sdk.js` + WP-plugin
  `zenchef-widget-integration`; iframe `bookings.zenchef.com/results?sdk=1&withCloseButton=1&rid=378598&showCollapsed=1&iframePosition=right`
  (Zenchef-restaurant-id 378598). De widget is dus al in de DOM aanwezig, ingeklapt, rechts.
- **Bestellen/afhaal:** knop "Take away" / "Take Away" verwijst naar een **tweede domein**
  `https://www.ramen-ya-amsterdam.nl/` — geen Thuisbezorgd/Deliveroo/Uber Eats/Sitedish op de
  homepage gevonden (0 hits).
- **Prijssegment:** niet vastgesteld (geen prijzen in de homepage-broncode).

## 2. Tech stack

| Laag | Bevinding | Bewijs |
|---|---|---|
| CMS | WordPress 7.1 | `<meta name="generator" content="WordPress 7.1">` |
| Builder | **Elementor 3.34.0 + Elementor Pro 3.34.0** | generator-meta; `plugins/elementor-pro/assets/...` (16 hits) |
| Theme | hello-elementor 3.4.5 (bewust kaal basistheme) | `themes/hello-elementor/assets/css/theme.css?ver=3.4.5` |
| Addon-pack | **Qi Addons for Elementor 1.9.5** (Qode) | `qi-addons-for-elementor/assets/css/main.min.css?ver=1.9.5`; 124× `qodef-qi-button` |
| Popups | **JetPopup 2.0.20.3** (Crocoblock) | `jet-popup-frontend.js?ver=2.0.20.3` |
| Slider | **Swiper 8.4.5** (2×: via Qi Addons én Elementor's eigen e-swiper) | `swiper/8.4.5/swiper.min.js` |
| Lightbox | fslightbox 7.1 + Elementor lightbox | `fslightbox.min.js?ver=7.1`, `conditionals/lightbox.min.css` |
| Popup-animatie-engine | **anime.js 2.0.2** (meegeleverd door JetPopup) | `jet-popup/assets/js/lib/anime-js/anime.min.js` |
| Social feed | Smash Balloon Instagram Feed 6.10.0 | `plugins/instagram-feed/js/sbi-scripts.min.js` |
| Cookies | Complianz GDPR (TCF-banner, NL-tekst) | `complianz-gdpr/cookiebanner/js/complianz.min.js` |
| Tracking | **Google Tag Manager `GTM-WBRFM6B7`** — geen losse gtag/GA4-tag, geen Meta Pixel, geen Hotjar in de bron | `googletagmanager.com/gtm.js?id=GTM-WBRFM6B7`; hits voor `fbq`/`hotjar` = 0 |
| jQuery | 3.7.1 + jquery-migrate 3.4.1 (Elementor-erfenis) | script-src |
| Reserveerwidget | Next.js-app van Zenchef in iframe (de 23 `_next`-hits komen dáárvandaan, níet van ramen-ya.nl) | `bookings.zenchef.com/_next/static/chunks/...`, AWS WAF captcha-sdk |
| Bouwer | **Pixel Bakery** (thepixelbakery.nl) | footer: "Website built by | Pixel Bakery", link `https://www.thepixelbakery.nl/` |

**Niet gevonden:** GSAP, ScrollTrigger, Lenis, Locomotive, AOS, Lottie, three.js/WebGL, Barba,
Framer Motion, animate.css, `<video>`. Hosting-hints: niet vastgesteld (geen server-headers in deze
output; alle assets first-party op ramen-ya.nl).

## 3. Animatie & interactie — wat er écht beweegt

Dit is de kern van "Elementor, maar echt heel goed gemaakt": er wordt **geen enkele externe
animatielibrary** geladen. Alles komt uit Elementor Pro-modules + Qi Addons, maar de bouwer heeft
precies de vier features gebruikt die Elementor-sites normaal juist niet gebruiken.

1. **Page transitions (Elementor Pro) — met eigen logo als preloader.** Bewijs: het custom element
   `<e-page-transition preloader-type="image" preloader-image-url=".../RAMENYA_LOGO_BEELDMERK_CREME.svg"
   exclude="^https://ramen-ya.nl/wp-admin/">` plus `elementor-pro/assets/js/page-transitions.min.js`.
   Keyframes in de inline CSS: `e-page-transition-fade-in`, `e-page-transition-fade-in-down` (25×
   `@keyframes` totaal). Dit geeft een SPA-achtig gevoel op een klassieke multipage WP-site: bij
   navigatie schuift een overlay met het crèmekleurige beeldmerk in beeld. Ook `instant-page.min.js`
   (Elementor Pro) staat aan → prefetch on hover, dus de transitie maskeert een pagina die vaak al
   geladen is.
2. **Sticky header met sticky-effects (Elementor Pro).** `data-settings` van de header-container:
   `{"position":"absolute","sticky":"top","sticky_on":["desktop","tablet","mobile"],
   "sticky_offset":0,"sticky_effects_offset":0,"sticky_anchor_link_offset":0}` + module-CSS
   `elementor-pro/assets/css/modules/sticky.min.css`. Header start absoluut over de hero (transparant)
   en plakt daarna — de klassieke "goede" header-opzet, niet de Elementor-default.
3. **Motion FX scroll-scale (Elementor Pro) op een hero-illustratie.** De enige echte scroll-gekoppelde
   animatie, en netjes begrensd:
   `{"motion_fx_motion_fx_scrolling":"yes","motion_fx_scale_effect":"yes","motion_fx_scale_speed":{"size":2},
   "motion_fx_devices":["desktop"],"motion_fx_scale_direction":"out-in",
   "motion_fx_scale_range":{"unit":"%","sizes":{"start":20,"end":80}}}` op een `image.default`-widget
   (Hakata-PNG) die bovendien `elementor-hidden-tablet elementor-hidden-mobile` heeft. Dus: scale
   out-in over 20–80% van de viewport, **alleen desktop**, en het element bestaat niet eens op mobiel.
   CSS: `modules/motion-fx.min.css`.
4. **Entrance-animaties, spaarzaam en gestaffeld.** Slechts drie widgets hebben `_animation`:
   `{"_animation":"fadeIn"}`, `{"_animation":"fadeIn","_animation_delay":200}` en
   `{"_animation":"fadeIn","_animation_delay":400}` — en alleen de stylesheet
   `lib/animations/styles/fadeIn.min.css` wordt geladen (Elementor laadt per animatie een apart
   bestand; hier dus één). Geen bounce/zoom/slide-carnaval. De 0/200/400 ms-staffeling is een
   bewuste hero-cascade.
5. **Qi Addons "appear from bottom" scroll-reveal.** 11 elementen met
   `qodef-qi--has-appear qodef--appear-from-bottom qodef-qi--appeared` — reveal-on-scroll uit
   `qi-addons-for-elementor/assets/js/main.min.js`. In de post-render snapshot staat op alle 11 al
   `qodef-qi--appeared`, dus de reveal triggert vroeg en blokkeert content niet.
6. **Animated Text-widget, 11×** (`qi_addons_for_elementor_animated_text.default`). De exacte
   animatievariant (typed/rotate/highlight) staat niet in de meegeleverde markup → **variant niet
   vastgesteld**; wél zeker dat het de Qi-widget is met eigen globale typografie-token
   `--e-global-typography-e62c43d`.
7. **Image slider (Swiper 8.4.5) in de gallery.** `data-options`:
   `slidesPerView 4 / 1366:3 / 1024:3 / 768:2 / 480:2`, `spaceBetween 20`, `loop:false`,
   `autoplay:true`, `effect:""` (dus gewone slide), `qodef-navigation--inside
   qodef-navigation--hover-move`. Nette responsive breakpoint-ladder; slides openen in fslightbox
   (`qodef-qi-fslightbox-popup qodef-popup-gallery`). In de DOM: `swiper-slide-duplicate` ×8 → er
   loopt ook nog een tweede, loopende swiper (waarschijnlijk de signature-dishes/Instagram-rij).
8. **Hover-effecten, consistent via één buttoncomponent.** Alle 28 CTA's zijn dezelfde
   `qodef-qi-button` met vaste modifiers: `qodef-layout--filled` / `--outlined`,
   `qodef-hover--reveal` (achtergrond die via `::after` inschuift),
   `qodef-hover--icon-move-horizontal-short` (27×, pijltje schuift op hover),
   `qodef-text-underline qodef-underline--left` (42×, underline groeit vanaf links). Kleuren komen
   uit globale tokens (`var(--e-global-color-primary/secondary/text)`), niet uit losse hexwaarden
   per knop — dat is precies het verschil met een gemiddelde Elementor-build.
9. **Popup/announcement (JetPopup).** Klassen `jet-popup--animation-slide-in-left` en
   `jet-popup--animation-zoom-in` aanwezig; inhoud: "Dear visitor, Due to maintenance work in the
   restaurant, we are temporarily closed until 6:00 PM." Redactioneel bij te werken zonder de pagina
   aan te raken. Animatie draait op anime.js.
10. **Menu.** Elementor Pro `nav-menu.default` met `"layout":"horizontal","toggle":"burger"` en
    SmartMenus (`jquery.smartmenus.min.js`) voor submenu's; submenu-icon als inline SVG
    (`e_font_icon_svg` staat aan → Font Awesome wordt als SVG geïnjecteerd i.p.v. als webfont
    geladen, scheelt een fontrequest).
11. **Hero:** geen `<video>` (0 hits), geen canvas/WebGL. Statisch beeld + Motion FX + fadeIn-cascade.
12. **Lazy background-images:** Elementor's eigen `IntersectionObserver`-snippet laadt
    container-achtergronden pas bij `.e-con.e-parent:not(.e-lazyloaded)` in beeld.

**Reduced motion:** alleen gedeeltelijk. Er is precies één `@media (prefers-reduced-motion: reduce)`
in de bron, en die komt uit Elementor's page-transition-CSS (`e-page-transition { display: none; }`).
De page transition respecteert reduced motion dus wél; de fadeIn-entrances, Motion FX, Qi-appear en
de autoplay-slider **niet**.

## 4. Design

- **Layout:** volledig op Elementor **flexbox-containers** (`e-flex e-con-boxed e-con e-parent`) —
  de moderne container-engine, geen legacy section/column. Dat verklaart de relatief schone DOM voor
  een Elementor-site.
- **Typografie:** twee Google Fonts, **lokaal gehost** door Elementor
  (`/wp-content/uploads/elementor/google-fonts/css/jost.css` en `josefinsans.css`) — dus geen
  requests naar fonts.gstatic.com, AVG-vriendelijk en sneller. `Jost` is de werkfont (14 hits in
  inline CSS), `Josefin Sans` de tweede. `DM Sans` komt uit de Zenchef-iframe, niet van de site.
  Alle typografie loopt via **globale Elementor-tokens** (`--e-global-typography-*-font-size` etc.),
  inclusief per-breakpoint overrides — een echt design-systeem in plaats van per-widget instellingen.
- **Kleur:** diep rood `#930f04` als merkkleur (ook `<meta name="theme-color">`, dus gekleurde
  browser-UI op mobiel), accent `#eb5160`, donker `#282b38`, grijstinten `#d5d6d7`/`#a5a6ad`/`#abacaf`,
  wit. Toegepast via `--e-global-color-primary/secondary/text`. Logo in twee varianten (rood beeldmerk
  als favicon, crème SVG als preloader) — merkconsistentie tot in de loader.
- **Beeld:** 30 `<img>`, waarvan 12 met `loading="lazy"`; formaten jpg (78), webp (16), png (13),
  svg (11). Dus **geen consequente WebP-pipeline** — de meeste foto's zijn nog jpg. Wel `decoding="async"`
  en expliciete `width`/`height` op de images (voorkomt CLS). og:image is 2560×1440 `-scaled.jpg`.
- **Mobiel:** `width=device-width, initial-scale=1`. (De tweede viewport-meta met
  `maximum-scale=1.0, user-scalable=no` hoort bij de Zenchef Next.js-iframe, niet bij de site zelf.)
  Zware desktop-decoratie is uitgezet met `elementor-hidden-tablet elementor-hidden-mobile` en
  `motion_fx_devices:["desktop"]`; Elementor draait met `additional_custom_breakpoints`.
  Mobiele render zelf: niet vastgesteld (screenshot niet op te halen).
- **Sterk:** één buttoncomponent voor alle 28 CTA's; globale kleur/typo-tokens; lokale fonts;
  icons als SVG; animatie-inzet karig en doelgericht; merkloader.
- **Zwak:** 49 externe scripts op één pagina (jQuery + Elementor-runtime + Qi + JetPopup + anime.js +
  Swiper + fslightbox + Complianz + Smash Balloon + GTM + Zenchef Next.js-bundle die direct meelaadt
  i.p.v. on-demand); geen `<h1>` (zie §5); jpg boven webp; reduced-motion maar half afgedekt.

## 5. Structuur & conversie

**Homepage-secties in DOM-volgorde:**
1. Complianz-cookiebanner (NL-tekst, ook op de EN-pagina — slordig)
2. Sticky/absolute header: logo, nav (Home, About us, Menu, Gallery, Wall of Fame, Contact),
   taalswitcher, CTA's "Take away" + "Reservations"
3. Hero: "Experience authentic Japanese Hakata ramen in Amsterdam." + since-2014-pitch,
   CTA's "Our menu" + "Reservations" (+ mobiele "Call us")
4. "Amsterdam Centrum": adres, postcode, telefoon, "Opening hours", "Reservations"
5. "Our menu": chef/Hakata-verhaal + "View full menu" + "Reservations"
6. "Signature dishes": 4 gerechten met kop + beschrijving (Hakata Deluxe, Karaka-men, Veggie,
   Sesame Chicken Ramen)
7. Gallery-slider (Swiper + fslightbox)
8. "Follow us on Instagram" — 9 posts/reels via Smash Balloon, CTA "RamenYaamsteradm"
9. Footer: Contact (adres, telefoon, Instagram/Facebook/TikTok), volledige openingstijdentabel,
   © 2026, "Website built by Pixel Bakery", nav EN + nav NL
10. JetPopup-melding (tijdelijk gesloten tot 18:00)
11. Zenchef-reserveeriframe (ingeklapt, rechts)

- **Primaire CTA:** "Reservations" — 7× als buttonlabel op de pagina, herhaald in elke sectie.
  Secundair: "Our menu" (3×), "Take away" (naar tweede domein), "Call us" (mobiel).
- **Reserveerflow:** één klik → Zenchef-overlay opent al gerenderd (gasten-aantal 1–9, datumkiezer,
  tijdslots 12:15–20:30, knop "Reserveren"). Geen redirect weg van de site. Prijs: de hele Next.js-app
  laadt mee bij eerste paint.
- **Adres/openingstijden boven de vouw:** adres + telefoon staan in sectie 4 (direct onder de hero);
  openingstijden alleen als CTA-knop boven de vouw, de tabel staat in de footer. Boven de vouw
  zelf: niet vastgesteld zonder render, maar op basis van DOM-volgorde: hero eerst, NAP net daaronder.
- **SEO:**
  - title `Japanese Noodlebar Amsterdam | Ramen-Ya`, meta description aanwezig en verkoopgericht.
  - `robots: index, follow, max-image-preview:large` → geen noindex.
  - canonical + `hreflang` en/nl correct, `og:locale:alternate nl_NL`.
  - **Twee ld+json-blokken:** (a) Yoast-achtige `@graph` met WebPage/ImageObject/BreadcrumbList/WebSite/
    Organization; (b) een handmatig `Restaurant`-blok met address, `servesCuisine ["Japanese","Ramen"]`
    en `openingHours "Mo-Su 12:00-22:00"`. Twee problemen: het handmatige blok heeft een **leeg
    `postalCode`** en een **telefoonnummer (020-4095888) dat afwijkt van de 020 210 30 33 in de
    content** — NAP-inconsistentie, slecht voor local SEO.
  - **Geen enkele `<h1>` op de homepage** (0 hits). De hero-claim staat vermoedelijk als
    heading/animated-text zonder h1-tag. Grootste SEO-misser van de site.
- **Performance-hints:** 49 externe scripts; jQuery-keten; Elementor CSS per post opgesplitst
  (`post-5/6/101/143/360/532/802.css` — `css_print_method-external`, goed voor caching, veel requests);
  `font_display-auto` (niet `swap`); lazy op 12/30 images; IntersectionObserver-lazy voor
  container-achtergronden; instant.page-prefetch; AWS WAF-captcha-SDK laadt mee via Zenchef.

## 6. Score

- **Design 8/10** — consistent tokenmodel, twee fonts lokaal gehost, sterke merkkleur en logo-gebruik;
  trekt het niveau van een custom build, alleen het beeldmateriaal (jpg boven webp) blijft achter.
- **Animatie 8/10** — weinig bewegende delen, maar elk gekozen effect (logo-page-transition, sticky
  header, één begrensde Motion FX, gestaffelde fadeIn) is precies en device-bewust ingesteld; punt
  eraf omdat reduced-motion alleen voor de page transition geldt.
- **Conversie 8/10** — "Reservations" 7× herhaald, Zenchef zonder redirect, NAP en openingstijden
  overal; punt eraf voor de take-away die naar een tweede domein wegleidt en het inconsistente
  telefoonnummer.
- **Techniek 6/10** — de Elementor-stack is vakkundig getemd (flex-containers, globale tokens, SVG-icons,
  lokale fonts), maar 49 scripts, jQuery en een volledig meeladende Zenchef-Next.js-bundle blijven
  de prijs van het platform; ontbrekende `<h1>` is een echte fout.

## 7. Wat overnemen / wat vermijden (voor een SvelteKit-demo)

**Overnemen**
1. **De logo-preloader-transitie.** SvelteKit doet client-side navigatie native; met een
   `onNavigate`-hook + View Transitions API krijg je hetzelfde crème-beeldmerk-overlay-effect dat hier
   een WP-site SPA-achtig laat voelen — en gratis beter, want er is geen echte pagelaad om te maskeren.
   Zet hem uit onder `prefers-reduced-motion` (Ramen-Ya doet dat ook, als enige).
2. **Eén buttoncomponent met vaste hover-modifiers.** Alle 28 CTA's hier zijn dezelfde component met
   varianten (filled/outlined, reveal-hover, icon-move, underline-from-left). Bouw dat als één Svelte
   component met props; dat is waarom de site "goed gemaakt" oogt, meer dan welke animatie ook.
3. **Animatiebudget: drie effecten, niet dertig.** Eén scroll-scale (desktop-only, 20–80% viewport),
   drie fadeIns met 0/200/400 ms delay, één reveal-on-scroll-klasse. Kopieer die terughoudendheid,
   niet de libraries — er zit hier geen GSAP, Lenis of Lottie in en het werkt.
4. **Conversieritme:** "Reservations" in élke sectie herhalen, adres + telefoon direct onder de hero,
   openingstijdentabel volledig in de footer, plus een redactionele popup voor incidentele meldingen
   ("tijdelijk gesloten tot 18:00"). Dat laatste is voor een restaurantsite goud waard — bouw het als
   een CMS-veld, niet als code-deploy.
5. **Lokale fonts + SVG-icons + expliciete width/height op images.** Nul third-party font-requests,
   nul icon-webfont, nul CLS.

**Vermijden**
1. **Geen `<h1>`.** Elementor-heading-widgets staan hier allemaal op h2/h3. In SvelteKit: één h1 per
   route, afdwingen in de layout.
2. **Reserveerwidget die direct meelaadt.** De hele Zenchef Next.js-bundle (+ AWS WAF captcha-SDK)
   staat in de initiële paint terwijl hij ingeklapt is. Laad zo'n embed pas na klik of bij
   `IntersectionObserver`/idle.
3. **Twee schema-blokken met tegenstrijdige NAP.** Eén `Restaurant`-JSON-LD, één telefoonnummer,
   postcode ingevuld.
4. **jpg als default.** WebP/AVIF met `srcset`; SvelteKit + `@sveltejs/enhanced-img` doet dit vanzelf.
5. **NL-cookiebanner op de EN-pagina** en een take-away-CTA die naar een ander domein springt —
   beide breken de taal- respectievelijk merkcontext.
