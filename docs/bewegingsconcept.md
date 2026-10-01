# Bewegingsconcept — Fuku Ramen Amsterdam (type 3 horeca, demo) — v2

Huidige beweging: geen. De Wix-site is statisch: logo, "Ramen redefined.", fotogalerij, nieuwsbrief, footer (bevestigd in `research/fuku.md`: alleen Wix page transitions en het Zenchef-paneel).
Gekozen set: *stil en beeldgedragen* — intensity `calm` — **klasse A** (IntersectionObserver + CSS-transities; Lenis alleen voor het scrollgevoel, geen GSAP) — foto-check: **dragen** (12 foto's van de huidige site, 1800 px).
Vibe: kalm · traag · warm · beeld-zwaar · premium.
Voorbeelden (beweging, niet vorm): gifuramenbar.com (fade per element, 0,8 s, `cubic-bezier(.19,1,.22,1)`; videoloops), tsukimi-ramen.com (adres + uren + CTA boven de vouw, scroll-pijl, IntersectionObserver-reveals zonder library), ramen-ya.nl (drie effecten, één knopcomponent).

Verhaal in vier stappen:
1. Een kom in beweging, precies één scherm hoog. "Ramen redefined." schuift uit een masker; onderin staan adres, "vandaag open tot" en het telefoonnummer, en de pijl zegt: scroll.
2. 福 betekent geluk. Twee regels, één zin (house-made ramen, lokale ingrediënten, sake), de chef aan de counter opent uit een masker.
3. De avond in zes gangen: het beeld staat in het midden van het scherm stil terwijl de gangen langs scrollen; alleen de actieve gang toont zijn regel. Daarna zaterdag met een staande videoloop.
4. Reserveren: drie kolommen (uren, adres, goed om te weten: 1e van de maand om 12:00, €10 aanbetaling, geen parfum) en één magnetische knop.

Signatuurmoment (één): **De avond**. `position: sticky` beeld, 100 svh hoog, beeld gecentreerd; een IntersectionObserver met `rootMargin: -40% 0 -40%` maakt de gang actief die de middenband raakt; beeld wisselt met opacity 0,5 s, blok van 35 % naar 100 % in 0,4 s `cubic-bezier(.16,1,.3,1)`, de gangregel komt 0,1 s later op. Bibliotheek 19, timing ongewijzigd, trigger vervangen door IO.
Bewegingssoorten (max drie): masker-reveal (11b tekst: `yPercent 110→0`, 1,2 s `expo.out` (in CSS `cubic-bezier(.19,1,.22,1)`), 80 ms stagger; 12 beeld: `clip-path inset` 1 s na 0,2 s, schaal 1,3→1 over 4 s; Gifu-fade voor blokken: 0,8 s, 24 px) · sticky-wissel (19) · lus (06 fotostrook; hero-videoloop met kruisfade van 0,9 s tussen twee kopieën, zodat de lus nooit springt).
Afwerking: loader **geen** · menu **geen** (vaste balk wisselt na de hero van wit naar zwart) · hover: knop-fill schuift van onder omhoog **met een eigen kopie van het label erin** (clip-path), dus de tekst is in elk frame leesbaar; pijl 4 px; onderstreping loopt in of uit; kaarten in "twee manieren" zijn in hun geheel een link (beeld 1,03×, pijl schuift) · cursor **geen** · knop: 27c magnetisch, alleen de ene reserveerknop, alleen `(hover: hover)`.
Mobiel: sticky beeld boven de gangen (44 svh), gangregels altijd zichtbaar, magnetisch uit, scroll-pijl weg, infobalk gestapeld, videoloops blijven (muted, playsinline, alleen laden in beeld).
Reduced motion: geen Lenis, geen reveals (alles staat er), video's stil op poster, strook stil, pijl stil.

Vangrails: [x] ≤3 bewegingssoorten [x] tekst <300 ms leesbaar (hero-kop CSS-load-in, reveals alleen onder de vouw; koppen bij `top 85%`, beelden bij `top 60%`) [x] geen scroll-lock [x] reduced motion volwaardig [x] Lighthouse mobiel ≥90 haalbaar (GSAP + ScrollTrigger + Lenis, geen andere animatielibrary; video's `preload="metadata"` + poster, beelden lazy, fonts met `display=swap`)

Wat verandert er aan de beweging t.o.v. nu: van een statische fotogalerij naar een pagina die in één tempo ademt: bewegend beeld in plaats van stilstaand, één sticky verhaal voor het menu, en verder alleen reveals die de foto's laten binnenkomen.

Wat v2 veranderde t.o.v. v1 (feedback Jaymar + concurrentieonderzoek):
- Hero exact 100 svh, met adres · vandaag open tot · `tel:` boven de vouw (harde eis uit `research/HANDOFF.md` §4; alleen Tsukimi doet het).
- Accent van lakrood naar sage `#9D9E97`, de kleur die Fuku zelf aan zijn Zenchef-widget meegeeft (`research/fuku.md` §4).
- Tekst gehalveerd; gangregels alleen bij de actieve gang; nieuwsbrief weg; footer één rij.
- Sticky beeld in het midden van het scherm in plaats van bovenaan.
- Reveals van GSAP/ScrollTrigger naar IntersectionObserver + CSS: geen triggerposities die verschuiven na het laden van fonts en beelden, geen half opgeschoven koppen. Masker heeft 0,22 em ruimte onder de basislijn voor de staarten van de cursief.
- Knop-hover met meegeknipte labelkopie (contrast in elk frame).
- Kanji-kop per sectie (福 二 夜 土 訪; Takumi-patroon) en `Restaurant` JSON-LD met `openingHoursSpecification` (alleen Tsukimi heeft dit compleet).

---

## Bibliotheek-ids in de demo

| Slot | Id | Wat |
|---|---|---|
| tekst | 11b | Koppen schuiven zacht uit een masker (GSAP + ScrollTrigger `top 85%`; hero-kop CSS bij laden, `cubic-bezier(.19,1,.22,1)`, 80 ms stagger) |
| scroll | 12 | Beeld opent uit een masker, van onder (GSAP + ScrollTrigger `top 60%`) |
| scroll · signatuur | 19 | Vast beeld, gangen scrollen langs (ScrollTrigger `top 60%`–`bottom 40%`) |
| galerij | 06 | Oneindige fotostrook (CSS, randen 12 %/88 %) |
| knop | 27c | Magnetische reserveerknop; `:active` `scale: .97` op alle knoppen |
| hover/cursor | geen | CSS-hover op CTA's en kaarten, verder rust |
| navigatie | geen | Vaste balk zonder animatie |
| achtergrond | geen | De foto's zijn de achtergrond |

Videoloops (Pexels, gratis licentie, ook commercieel): hero `assets/hero-bowl.mp4` = "Authentic Japanese Ramen Bowl Close-Up" van Ali Alcántara (pexels.com/video/31387235, 9 s, 1920×1080 beschikbaar); zaterdag `assets/bowl-portrait.mp4` van Alay Lv (33400919); reserveren `assets/noodles-boil.mp4` van Taryn Elliott (9508945). Bij oplevering vervangen door eigen opnames van Fuku.

## Feiten uit het onderzoek die in de demo zitten

Uit `research/fuku.md`: meta description "Ramen redefined. Seasonal tasting menu centred around house-made ramen, local ingredients, and sake. Izakaya à la carte Saturdays."; accent `#9D9E97`; Zenchef (ex-Formitable) met €10 aanbetaling p.p., wachtlijst, vouchers; widgettekst: veg/vegan altijd op zaterdag, geen glutenvrij, verzoek geen parfum. Uit de FAQ/contactpagina: uren, reserveringsregels, +31 6 42 60 85 96, kinderen 13+, honden op zaterdag.

**Let op, tegenstrijdigheid in het onderzoek:** `fuku.md` noemt telefoonnummer `+31611047801` uit hun ld+json; de zichtbare FAQ- en contactpagina noemen +31 6 42 60 85 96. De demo gebruikt het zichtbare nummer. Navragen bij Fuku voor de echte bouw.

## v3 (27-09-2026)

- Reveals terug op GSAP + ScrollTrigger + Lenis (klasse B), op verzoek van Jaymar. Timings 11b, 12 en 19 ongewijzigd.
- Oorzaak van de half opgeschoven koppen in v1 gevonden: CSS zette `translateY(110%)` en GSAP telde daar `yPercent: 110` bij op, dus de kop eindigde 110 % te laag. Nu zet alleen GSAP de startstand (`y: 0, yPercent: 110`); de beginstaat staat hieronder.
- Triggers zijn `once`, tween wordt pas bij binnenkomst gemaakt, `ScrollTrigger.refresh()` na fonts en load.
- Knop-hover één richting: fill komt van onder in, en verlaat de knop bij unhover via de bovenkant (onder → boven, beide keren).

## Beginstaat (v4, 01-10-2026)

Zoals bibliotheek 12: een inline script in de `<head>` van `app.html` zet `html.js`, vóór de eerste paint. `app.css` verbergt dan alleen de reveal-doelen, `html.js [data-reveal] { visibility: hidden }` (koppen `lines`, beelden `frame`, blokken `fade`), binnen `prefers-reduced-motion: no-preference`.

- Elke attachment zet eerst zijn startstand (masker 110 %, `clip-path`, opacity 0) en dan in hetzelfde frame `visibility: visible` inline. Vanaf dan bepaalt GSAP alles; CSS zet nooit een transform.
- Zonder JS geen `js`-klasse, dus alles staat er. Met reduced motion geldt de regel niet en slaan de attachments over.
- Vangnet: een animatie met 3 s vertraging zet `visibility: visible`. Valt JS weg na het zetten van de klasse, dan staat de inhoud er na 3 s alsnog.
- De hero-kop is geen reveal-doel (CSS-load-in), dus boven de vouw staat de tekst er meteen. Een kop of beeld dat bij laden al in beeld is (herladen halverwege, `#visit`) start zijn reveal zodra ScrollTrigger draait.
- Timings naar de bibliotheek: 12 start bij `top 60%` (was `top 75%`); hero-kop 80 ms stagger met `expo.out` (`--ease-expo`); strookrand 12 %/88 % (06); knop `:active` 0,97 (27c, met de `scale`-eigenschap zodat de magnetische translate blijft en de fill gewoon onder in, boven uit gaat).
