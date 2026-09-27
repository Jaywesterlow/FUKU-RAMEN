# HANDOFF — Ramen-restaurant website (Amsterdam)

Voor: een Claude Code-sessie (Fable 5.1) die een website bouwt voor één ramen-restaurant in Amsterdam.
Van: de Cowork-onderzoekssessie van 17–18 september 2026.
Opdrachtgever: Jaymar Westerlow (JWCreative, jwcreative.nl) — freelance webdesigner/developer, SvelteKit.

---

## 1. Wat je bouwt

Een nieuwe website voor **[RESTAURANT — Jaymar vult dit in bij de start van de sessie]**.

Jaymar heeft zelf al één restaurant gekozen op basis van hoe de huidige site is gemaakt, de tijdlijn en het visuele aspect. Je mag daar feedback op geven (zie §5, prospect-ranking), maar zijn keuze staat vast tenzij hij anders zegt.

Stack (vaste voorkeur van Jaymar): **SvelteKit (Svelte 5), TypeScript strict, Tailwind v4 (of plain CSS) — custom gebouwd, geen Wix/WordPress/Squarespace/Webflow.** Deploy op Vercel. Zijn skill-library (JW AI Vault connector: `svelte-project`, `vercel-deploy`, `answer-first`, `cost-guard`) beschrijft zijn conventies — lees `svelte-project` vóór je scaffoldt.

Doel van de site: de demo/pitch én uiteindelijk de productie-site. Demo-sites moeten **visueel imponeren** (scroll-animaties, rustige maar moderne interactie); niet-visuele voordelen tellen in de demo niet. Het bestaande logo van het restaurant blijft altijd staan.

---

## 2. Wat er in deze map zit

| Bestand | Inhoud |
|---|---|
| `00-overzicht.md` | Scorebord van alle negen concurrentsites, animatie per site, patronen, en de samenvattende eisen voor de nieuwe site. **Lees dit eerst.** |
| `ramen-kingdom.md` | Next.js + Framer Motion, portrait "app". **Let op de correctie bovenaan**: de site is veel interactiever dan het rapport zag (anime-karakters, winkel binnenlopen, gerechten kiezen). Referentie voor de hele set. |
| `ramen-ya.md` | WordPress + Elementor Pro, gebouwd door Pixel Bakery. Bewijs dat een builder-site "on par" kan zijn met custom: page-transitions met logo-preloader, sticky header, één buttoncomponent, CTA-ritme. |
| `tsukimi.md` | Handgeschreven statische site. Beste conversie-basics van allemaal (adres + tijden + CTA boven de vouw, compleet `Restaurant` JSON-LD). Scroll-reveals zonder library. |
| `gifu.md` | Squarespace. De "perfecte simpele scroll-animatie" is één instelling: fade, per element gestaggerd, 0,8 s, `cubic-bezier(0.19,1,0.22,1)`, 1,0 s delay. |
| `vatten.md` | Webflow. 30 autoplay-video's (één per gerecht), locatie als aparte route. Slechte SEO/afwerking. |
| `takumi.md` | WordPress multisite + Salient + WPBakery (Pixel Bakery), 5 locatiepagina's met de hand gekopieerd — met kopieerfouten. Casus voor data-driven multi-locatie. |
| `fuku.md` | Wix. Bijna lege homepage; Zenchef-reserveerflow met deposit/waitlist/vouchers is het interessante deel. |
| `men-impossible.md` | Webflow (Design Guilds). Goede twee-locatie-informatiearchitectuur, slechte uitvoering (5 fonts, `container-26`, WhatsApp-foto als menu). |
| `sora.md` | WordPress eigen theme 2018. Zwakste site; `noindex`-melding uit een eerdere scan was een false positive. |

Methode-beperking van dit onderzoek: alle rapporten komen uit de **live broncode** (rawHtml, CSS- en JS-bundles via Firecrawl). Screenshots konden niet bekeken worden en er is **niet met de sites geïnteracteerd**. Alles wat pas na klikken/scrollen zichtbaar wordt (Ramen Kingdom!) is dus onderbelicht. Als jij wél een browser hebt (Claude in Chrome of de ingebouwde browser): bekijk Ramen Kingdom, Ramen-Ya en Gifu zelf, gradueel scrollend en klikkend, vóór je designbeslissingen neemt.

---

## 3. Wat Jaymar uit dit onderzoek concludeert

- Veel van deze sites draaien op Wix, Elementor, Squarespace of Webflow en zijn desondanks **echt goed — on par met, of beter dan, wat hij zelf zou maken**. De lat ligt dus hoog; "custom" is op zichzelf geen verkoopargument. Het verschil moet zitten in animatie/interactie, conversie-basics en techniek (performance, SEO, i18n) tegelijk.
- Ramen Kingdom is de best gemaakte site van de set.
- Ramen-Ya is het bewijs dat Elementor goed kán; Gifu dat één simpele, consequente animatie genoeg is; Tsukimi dat conversie-basics zonder library werken.

---

## 4. Harde eisen voor de nieuwe site (uit de negen rapporten)

Boven de vouw: adres, "vandaag open tot", `tel:`-link, en één dominante reserveer-CTA. Slechts één van de negen concurrenten doet dit. CTA herhaald na het menu (Ramen-Ya-ritme).

Menu als HTML uit één data-object (nooit PDF of foto). Datzelfde object voedt de `Restaurant` + `Menu` JSON-LD (`openingHoursSpecification`, `priceRange`, `geo`, `hasMenu`, `acceptsReservations`, `sameAs`).

Reserveren: in-page widget (Zenchef/Guestplan/Tebi — kies wat het restaurant al gebruikt), **lazy geladen on-click**, niet op pageload. Datum/gasten vooraf meegeven als de widget dat toelaat.

Animatie: één samenhangende bewegingsgrammatica, geen losse effecten. Basis: fade-reveal per element, gestaggerd, ~0,8 s, sterke ease-out, via een `use:reveal` IntersectionObserver-action of GSAP + ScrollTrigger + Lenis (Jaymar's demo-stack). Plus één "merkmoment" (loader, neon-detail, video-per-gerecht — zie Kingdom/Vatten). Altijd een `prefers-reduced-motion`-kill-switch; slechts twee van de negen concurrenten hebben dat.

Page transitions met het logo via `onNavigate` + View Transitions (Ramen-Ya-patroon, zonder Elementor).

Beeld: `@sveltejs/enhanced-img` → AVIF/WebP + srcset, `loading="lazy"` onder de vouw, echte alt-teksten, expliciete width/height.

Video (als gebruikt): `muted playsinline preload="metadata" poster`, alleen zichtbare video's spelen, still onder reduced-motion.

Talen: NL + EN als aparte routes met `hreflang` en `og:locale`. Geen enkele concurrent doet dit goed.

Multi-locatie (als het restaurant meerdere vestigingen heeft): één `locations[]`-array, één `/[locatie]`-route. Zie `takumi.md` §"kopieerfouten" voor waarom.

Semantiek: één `<h1>` per pagina, echte heading-hiërarchie, sprekende routes, geen `user-scalable=0`.

Tokens: één accentkleur, twee fonts (een serif/mincho + een sans, lokaal gehost), alles als `@theme`/custom properties.

---

## 5. Prospect-ranking (welk restaurant heeft de nieuwe site het hardst nodig)

Op basis van het diepe onderzoek, gerangschikt op "site is zwak én er zit budget/meerdere locaties achter":

1. **Sapporo Ramen SORA** (ramensora.nl) — theme uit 2018, nieuws-slider als hero, geen CTA, geen `tel:`-links, geen lazy loading, twee locaties. Alles is te verbeteren en het is uitlegbaar in één mail.
2. **Men' Impossible** (menimpossible.com) — twee locaties met verschillende conversiedoelen, sterk merk, maar 5 fontfamilies, WhatsApp-foto als menukaart, geen structured data, og:image = favicon. Let op: gebouwd door bureau Design Guilds.
3. **Fuku Ramen** (fukuramenamsterdam.com) — hoog-segment concept op een vrijwel lege Wix-pagina; nul headings, geen openingstijden. Eén locatie.
4. **Takumi/Umaimon** — vijf locaties met kopieerfouten, geen schema, geen lazy loading; maar keten (~40 vestigingen) met vast bureau (Pixel Bakery) — grote kans, lage waarschijnlijkheid.
5. **Vatten Ramen** — Webflow uit 2025, `<title>Home-zeedijk</title>`, geen meta/schema, root verouderd; twee locaties. Recent gebouwd, dus minder kans.

Niet benaderen op "jullie site is slecht": Ramen Kingdom, Ramen-Ya, Tsukimi, Gifu — die zijn goed en/of net live.

Geef je eigen mening hierover aan Jaymar als je vindt dat een ander restaurant logischer is; hij vraagt daar expliciet om.

---

## 6. Animatieonderzoek — moet nog binnenkomen

Jaymar heeft een apart lopend project: een **animatie-systemen-catalogus** (40 award-sites, 8 site-types; werkbestanden in `C:\Users\jaywe\Downloads\animatie-catalogus\`, status in `STATUS-2026-09-16.md`; fase 2 afgerond, consolidatie nog niet gestart). Doel daarvan is per demo-site een "bewegingsconcept" kiezen vóór het bouwen.

Verwacht dus dat je **een animatieonderzoek aangeleverd krijgt** (of dat je het eerst moet uitvoeren) dat bepaalt welke animatie op deze site komt. Bouw geen definitief animatieconcept voordat dat er is. Tot die tijd: bouw de site met de basis-reveal uit §4 en een duidelijk afgebakende plek voor het merkmoment, zodat het animatieconcept later ingeplugd kan worden zonder de structuur te breken.

Jaymar's beoordelingsregel voor animatie (uit dat project): een site wordt in z'n geheel beoordeeld — hover/cursor-interacties, menu, loading-animatie, typografie, kleur, premium gevoel — niet alleen op scroll-animaties. Hij vertrouwt geen observaties die scrollposities overslaan; scroll gradueel, zoals een mens.

---

## 7. Werkwijze die Jaymar verwacht

- Antwoord eerst, geen preamble, geen ongevraagde caveats (`answer-first`). Plain Nederlands of Engels, geen corporate toon.
- Zeg het als iets uit dit onderzoek onjuist of onverifieerbaar blijkt — hij wil dat expliciet horen.
- Kostenbewust (`cost-guard`): zeg vooraf wat een lange run gaat doen en hoe lang; geen volledige test-suites per iteratie.
- Git: jij voert git-operaties zelf uit en rapporteert, je vraagt hem niet om commando's te draaien.
- Één demo ≈ één werksessie. Begin met scaffold + tokens + data-object + homepage boven de vouw, dan menu, dan reserveren, dan animatie.
