# KÓŁECZKO — art direction pass

Gra solo na wirtualną walutę. Bez wpłat, wypłat, kont i rankingu online.

## Gotowa aplikacja

Z folderu projektu uruchom:

```sh
python3 -m http.server 8080 --directory release --bind 127.0.0.1
```

Windows: `py` zamiast `python3`. Otwórz http://localhost:8080. Nie otwieraj HTML przez dwuklik.

## Development

Node 22.13+:

```sh
npm ci
npm run dev
npm run build
```

## Zmiany

- Landing z prawdziwym kołem Three.js, dużą typografią, storytellingiem i FAQ.
- Własne symbole SVG, system brand w `public/brand`, grafika OG 1200×630 i ikony aplikacji.
- Kompozycja mobile, menu dialogowe, stawka pod kołem, pionowe CTA na wąskich ekranach, safe area i reduced motion.
- Osiem progów energii 10–1280. Jedno koło, bez skinów. Losowanie nadal 50/50.
- Lokalny rekord, XP (10 za obrót + 10 za wygraną), poziomy co 100 XP, cztery cele i osiągnięcia.
- Three.js ładowany osobno, redukcja efektów mobile, pauza renderowania poza ekranem, WebP tła 119 KB zamiast PNG 2,1 MB.
- Statyczny HTML landing page w buildzie, metadata, manifest, robots, generator canonical/sitemap, OG/X.
- Error boundary, komunikat offline, fallback bez WebGL oraz szablony 404/500/maintenance.

## Domena i SEO

Domena produkcyjna: https://koleczko.vercel.app/.
Zwykłe `npm run build` generuje indeksowalną wersję z canonical, sitemap, absolutnymi adresami OG/X i schema WebSite dla tej domeny. `SITE_URL` może nadpisać domenę. Build z `VERCEL_ENV=preview` pozostaje noindex, chyba że jawnie ustawisz SITE_URL.

W Vercel użyj komendy budowania `npm run build` i katalogu wynikowego `release`.
Aktualizacja tej paczki nie publikuje zmian na Vercel — wymagane jest wdrożenie nowej wersji projektu.

Hosting musi mapować 404.html na status 404, 500.html na błąd serwera i maintenance.html na przerwę. Manifest nie oznacza pełnego trybu offline: brak service workera.

## Testy i ograniczenia

TypeScript, build i prerender przeszły. Przygotowano 29 testów E2E dla 11 rozmiarów 320–2560 px oraz wygranej, przegranej, podwajania, odbioru, zapisu i paneli.

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

**Testy przeglądarkowe nie zostały wykonane:** Chromium przerywał start SIGTRAP nawet na pustej stronie. Brak potwierdzonych screenshotów UI, porównania side-by-side i pomiarów LCP/CLS/INP. Paczka nie oznacza ukończonego wizualnego QA. Szczegóły: AUDIT.md.

Załączniki nie zawierały osobnego obrazu referencyjnego UI. Referencją był istniejący projekt i scena.

## Struktura

- app/page.tsx — gra, saldo, zapis.
- app/art-direction.css — język wizualny i mobile.
- components/Experience.tsx — storytelling, FAQ, cele, rekord.
- components/BrandIcons.tsx — wspólne symbole.
- components/Wheel.tsx, wheel-effects.ts, evolutions.ts — koło i energia.
- scripts/seo.mjs, prerender.mjs — SEO i statyczny HTML.
- scripts/assets.cjs — odtwarzalny zestaw brand (`npm run assets`).
- tests/experience.spec.ts — testy przeglądarkowe.
- release/ — gotowa kompilacja.

Postęp jest lokalny w localStorage. Reset profilu usuwa dane. Wyniki nie mają wartości pieniężnej. To demonstracja gry solo, nie system transakcyjny.
