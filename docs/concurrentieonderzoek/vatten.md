# Vatten Ramen — site-analyse (vattenramen.com/home-zeedijk)

Bron: Firecrawl rawHtml van `/home-zeedijk` (live fetch, maxAge 0) + markdown/links van de root `/`.
Webflow-publicatiedatum in de bron: `<!-- Last Published: Sat Aug 29 2026 11:49:44 GMT+0000 -->`.

---

## 1. Identiteit

- **Naam:** VATTEN RAMEN (`<title>VATTEN RAMEN</title>` op root; op de locatiepagina staat letterlijk `<title>Home-zeedijk</title>` — een onafgewerkte interne paginanaam).
- **Locaties:** de root is een **shop-selector**: "SELECT SHOP / Which shop will you visit？" met twee keuzes: **Zeedijk** (`/home-zeedijk`) en **Plantage** (`/home-plantage`). *Geen* Kerkstraat-locatie gevonden in de bron — de opdrachtgeversnotitie klopt hier niet; het tweede filiaal heet Plantage.
- **Adres/rating Zeedijk** (uit de Google-Maps-embed payload in de HTML): `"Vatten Ramen Zeedijk, Zeedijk 18H, 1012 AZ Amsterdam"`, `4.5`, `"2.266 reviews"`, telefoon `"06 85431945"`. Let op: dit staat **alleen in de Maps-JSON**, niet als leesbare tekst of als adres in de footer.
- **Prijssegment:** midden/casual-plus. Ramen €19–€23 (Vatten Ramen €20, Tantanmen €22, Special Vatten €23), donburi €18, Wagyu Don €39, gyoza €9–€14, sake per fles €42–€47, cocktails €9–€14.
- **Talen:** feitelijk **Engels** met Japanse sierteksten (前菜 / 拉麺 / 甘味). Geen Nederlands. Geen taalswitcher, geen `hreflang` (0 treffers). Wel twee Maps-embeds waarvan één in `hl=ja&gl=JP` — dus een JP-gelokaliseerde kaart naast de NL-kaart, zonder dat de rest van de pagina meeschakelt.
- **Reserveren:** **Guestplan** widget (`cdn.guestplan.com/widget.js`, `gstpln-widget-nwe.DO6dmDOx.iife.js`, `_gstpln.accessKey = "297bbe2ae2ad439c9c305857f86555a7e3c2d4c8"`). Widget-UI in de DOM: "Vatten Ramen Zeedijk", "2 guests", "Today, September 18", "12:30 PM", knop **"Book a table"**, "Powered by [Guestplan]".
- **Bezorgen/afhalen:** géén Thuisbezorgd/Deliveroo/UberEats/Sitedish gevonden (0 treffers). Wel de claim "PICK YOUR BOWL AND ORDER NOW🥢" in de hero — die leidt nergens heen behalve naar menu-ankers; op de root staat "Order ahead, slurp on arrival" zonder werkende bestelflow. Er is een nav-item **STORE** op de Zeedijk-pagina, maar het is geen `<a>` met href in de geëxtraheerde nav — niet vastgesteld waar dat naartoe gaat.

## 2. Tech stack

| Onderdeel | Bewijs |
|---|---|
| CMS/builder | **Webflow**. `<!-- This site was created in Webflow -->`, `<meta content="Webflow" name="generator">`, `data-wf-domain="vattenramen.com"`, `data-wf-site="67e337b74b160cc971d4e5b5"` |
| Hosting/CDN | Webflow-hosting: assets op `cdn.prod.website-files.com/67e337b74b160cc971d4e5b5/...` |
| JS | jQuery 3.5.1 (`d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min…`), `webflow.968a25a1.*.js` + 2 `webflow.schunk.*.js` (Webflow runtime incl. IX2) |
| Fonts | Adobe **Typekit** (`use.typekit.net/rkx0fib.js`) met familie **europa** (n4/i4/n7/i7 actief); Google Fonts **Inria Serif** + **Shippori Mincho** worden geladen maar de `wf-…-inactive` klassen op `<html>` laten zien dat ze bij deze render *niet* actief werden; **Inter** wordt als base64-`@font-face` ingebed |
| Webfont-loader | `ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js` |
| Reserveren | Guestplan (zie boven) |
| Kaart | Google Maps JS API v3 + embed, API key zichtbaar in de bron (`AIzaSyCmL18misQw9KdwqGaw3zHkitj8vG6QF2Y`), **twee** volledige Maps-instanties (en_NL én ja_JP) |
| Analytics/pixels | **Geen** GA/gtag, geen Meta Pixel, geen Hotjar gevonden (de enkele `gtag`/`fbq`-treffers zaten in base64-blobs, niet in scripts) |
| Bouwer/bureau | **Niet vastgesteld** — footer bevat alleen `©︎2025 VATTEN RAMEN ALL RIGHTS RESERVED` |
| Niet aangetroffen | GSAP, ScrollTrigger, Lenis, Locomotive, AOS, Swiper, Splide, Slick, Lottie, Three.js/WebGL, Barba, Framer Motion, animate.css |

## 3. Animatie & interactie

- **Hero:** fullscreen **video-achtergrond**, geen canvas/WebGL. `<section class="section-4">` met een Webflow `w-background-video w-background-video-atom` div: `data-autoplay="true" data-loop="true"`, `<video autoplay loop muted playsinline data-object-fit="cover">` met `.mp4` + `.webm` bron (`Z-Back-transcode.mp4/.webm`) en een poster-JPG als `background-image` (`Z-Back-poster-00001.jpg`). Een tweede hero-video `Z TOP` zit direct daaronder.
- **Video's als menu-beeld:** **30** `w-background-video`-blokken en ~60 `<source>`-bestanden — elk gerecht heeft z'n eigen autoplay-loop-video (edamame, kimchi, takoyaki, karaage, tantanmen, wagyu, tiramisu, ice cream, …), telkens mp4 + webm + poster-frame. Dit is het meest opvallende designbesluit van de site.
- **Scroll-animaties:** Webflow **IX2** (`class="w-mod-ix"` op `<html>`, Webflow-runtime chunks). 12 elementen met `data-w-id`, waarvan meerdere met inline `style="opacity: 0;"` (header, `mainmenu`, `mainmenu-container`, `menu-ramen-container2`, hero-video) — klassieke IX2 fade-in-on-scroll/-load reveals. De timelines zelf staan in de Webflow-runtime, niet in de HTML, dus exacte curves/duur: **niet vastgesteld**.
- **Menu-animatie:** Webflow navbar met `data-animation="over-right"`, `data-easing="ease"`, `data-easing2="ease"`, `data-duration="400"`, `data-collapse="all"`, `data-no-scroll="1"` — het volledige menu schuift van rechts in over de pagina, op álle breakpoints (niet alleen mobiel), met scroll-lock.
- **Hover-effecten:** geen custom hover-CSS aangetroffen buiten Webflow-defaults en de Guestplan-widget (die gebruikt Tailwind-achtige classes `hover:bg-widget-accent`, `hover:opacity-80`, `transition-opacity`). Op de pagina zelf: **niet vastgesteld**.
- **Page transitions / loader / intro:** geen barba, geen preloader-markup gevonden — **niet vastgesteld** (waarschijnlijk niet aanwezig).
- **Sliders:** geen slider-library; geen `w-slider` in de geïnspecteerde markup.
- **Reduced motion:** **geen** `prefers-reduced-motion` in de bron (0 treffers). 30 autoplay-loop-video's zonder opt-out is een reëel probleem voor motion-gevoelige bezoekers.

## 4. Design

- **Layout:** één zeer lange one-pager per locatie. Volgorde: fullscreen video-hero → menu-categorie-nav (6 tegels) → ZENSAI → GYOZA → DONBURI → RAMEN (chicken/vegan/seasonal) → EXTRA TOPPINGS & NOODLE OPTIONS → DEZATO → DRINKS (soft/kombucha/thee/bier/sake/cocktails/wijn) → LOCATION (2× Google Maps) → footer. Alles in Webflow `w-container`/`w-layout-blockcontainer`-grids.
- **Typografie:** **europa** (Typekit) als werkfont in 4 snitten; Inria Serif + Shippori Mincho gedeclareerd voor het Japanse/serif-accent; Inter ingebed. Alle koppen in caps, met consequent het patroon *EN-label → romaji → kanji* (APPETIZERS / **ZENSAI** / 前菜). Dat drietrapsysteem is het sterkste typografische idee op de site.
- **Kleur & beeld:** de site leunt op bewegend beeld i.p.v. kleurvlakken; decoratieve PNG's `monyou_black_top.png`, `monyou_black_footer.png`, `wave_w02.png` (Japans golfpatroon) en twee logo-varianten (`logo.png` / `logo_w.png` voor donkere achtergrond). Exacte hexwaarden staan in de externe Webflow-CSS — **niet vastgesteld**.
- **Mobiel:** `<meta name="viewport" content="width=device-width, initial-scale=1">` aanwezig, Webflow responsive grid, off-canvas menu. Een mobiele screenshot is opgehaald maar kon in deze omgeving niet worden ingezien — visuele mobiele beoordeling: **niet vastgesteld**.
- **Sterk:** het video-per-gerecht-concept is zeldzaam en verkoopt eten veel beter dan foto's; mp4+webm+poster is netjes gedaan; drietalige menu-hiërarchie; consistente Japanse beeldtaal.
- **Zwak:** `<title>` is letterlijk `Home-zeedijk`; geen `alt`-teksten (alle `alt=""`); de root is nog de **oude** homepage (oude gerechten en andere prijzen: Vatten Ramen €18 vs €20, Tantanmen €19.5 vs €22, MAZESOBA/MISO VEGAN die op Zeedijk niet meer bestaan) met een shop-selector eroverheen — twee versies van de waarheid; twee volledige Google-Maps-instanties in één pagina (één in het Japans) is een zware, verwarrende blunder; typfouten in de bron ("STARTARS", "SEASENAL", "DROGHT", "DESATO", "Alcohole FREE"); adres en openingstijden staan **nergens** als tekst.

## 5. Structuur & conversie

- **Secties homepage (Zeedijk), in volgorde:** hero-video + claim → menu-ankernav → ZENSAI → HOMEMADE GYOZA → DONBURI → RAMEN (tori paitan / vegan shiitake shoyu / seizoen) → EXTRA TOPPINGS + NOODLE OPTIONS → DEZATO → DRINKS (non-alcohol, kombucha, ijsthee, theepot, bier, sake, cocktails/highballs, wijn) → LOCATION (2 maps) → footer (logo, Instagram, Facebook, copyright) → Guestplan-widget.
- **Primaire CTA:** de Guestplan **"Book a table"**-widget (gasten / datum / tijd / boeken) — maar die staat **onderaan**, na het hele menu. In de nav staat RESERVATIONS (`/reservation`). Boven de vouw staat *geen* CTA-knop; de hero-tekst "PICK YOUR BOWL AND ORDER NOW🥢" is geen link.
- **Reserveer-flow:** volledig in-page via Guestplan (geen doorklik naar extern). Prima; alleen de plaatsing is slecht.
- **Adres / openingstijden boven de vouw:** **nee** — en zelfs onderaan staan ze niet als tekst; het adres zit alleen in de Maps-embed-data. Openingstijden ontbreken volledig (0 treffers voor "opening"/"hours"/"openingstijden").
- **SEO:** `<title>Home-zeedijk</title>`; **geen** meta description, **geen** og:/Twitter-tags, **geen** canonical, **geen** robots-meta, **geen** JSON-LD/schema.org (dus geen `Restaurant`/`Menu`/`openingHours`-markup), **geen** hreflang. Voor een restaurant met 2.266 Google-reviews is dit sterk onderbenut.
- **Performance-hints:** ~60 videobestanden (mp4 + webm) die allemaal `autoplay loop` zijn — dat is de dominante kostenpost; wel poster-frames als `background-image`, en 51 `<img loading="lazy">` (0 `eager`, dus ook hero-beelden lazy). Scripts: jQuery + 3 Webflow-bundles + Typekit + WebFont-loader + Guestplan (2 scripts) + **twee** complete Google Maps API-instanties (≈20 extra maps-scripts). Geen `preload` voor de hero-video. Fonts uit drie bronnen (Typekit, Google Fonts, base64-Inter).

## 6. Score

- **Design 7/10** — het video-per-gerecht-concept en de EN/romaji/kanji-typografie zijn onderscheidend, maar de afwerking (titels, typfouten, dubbele kaarten, oude root-pagina) haalt het omlaag.
- **Animatie 6/10** — indrukwekkend véél beweging, maar alles is standaard Webflow IX2 + autoplay-video; geen scroll-gedreven choreografie en geen `prefers-reduced-motion`.
- **Conversie 4/10** — reserveerwidget zit onder een enorm menu, geen CTA boven de vouw, geen openingstijden of adres in tekst, geen bestel-/afhaalflow ondanks "order now".
- **Techniek 4/10** — solide Webflow-basis, maar geen meta description/og/canonical/schema, `<title>Home-zeedijk</title>`, alt-teksten leeg, twee Maps-instanties, 60 autoplay-video's, Maps-API-key in de bron.

## 7. Wat overnemen / wat vermijden (voor de SvelteKit demo)

**Overnemen**
1. **Video per gerecht als kernidee**, maar beheerst: `<video muted playsinline preload="metadata" poster>` met `IntersectionObserver` die alleen de zichtbare video's afspeelt en de rest pauzeert — dat geeft hetzelfde effect bij een fractie van de bandbreedte. Lever mp4 (h264) + webm zoals zij doen.
2. **De drietraps-menukop** EN-label / romaji / kanji (APPETIZERS · ZENSAI · 前菜). Goedkoop, en het geeft direct authenticiteit. Combineer met één serif/mincho-accentfont naast een neutrale sans.
3. **Reserveren als in-page widget** in plaats van een doorverwijzing — maar dan **sticky boven de vouw** en herhaald na het menu.
4. **Locatiekeuze als eigen route** (`/zeedijk`, `/plantage`) in plaats van één pagina met toggles: SvelteKit-routes met gedeelde componenten en per-locatie data geven precies deze structuur, maar dan zonder dat een van de twee veroudert.

**Vermijden**
5. **Geen `prefers-reduced-motion`**: pauzeer in SvelteKit alle loops via `matchMedia('(prefers-reduced-motion: reduce)')` en val terug op het poster-frame.
6. **Adres, openingstijden en telefoonnummer als leesbare tekst + `Restaurant` JSON-LD** (openingHours, geo, menu, priceRange, aggregateRating) — Vatten laat dit volledig liggen terwijl het de goedkoopste SEO-winst voor een restaurant is. Plus: één statische kaartafbeelding met "open in Maps"-link i.p.v. een volledige Maps-JS-embed (laat staan twee).
7. **Echte `<title>`/description/og-image per route** en gevulde `alt`-teksten — triviaal in SvelteKit met `<svelte:head>`, en meteen een demonstreerbaar verschil met de concurrent.
