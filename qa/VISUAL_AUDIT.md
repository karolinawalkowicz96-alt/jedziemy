# KÓŁECZKO — audyt i trzy przebiegi wizualne

Referencja: „Neonowe koło ryzyka i nagrody.png” oraz dostarczony opis. Modyfikacja istniejącego projektu, bez zmiany `lib/game.ts`, generatora wyniku ani zasad salda. Brak nowych ekranów, skinów, misji czy fikcyjnego rankingu online.

## Audyt przed zmianami

Zapisano grę desktop, wygraną mobile, wysoką serię oraz okna rekordów i profilu. Główne różnice: płaskie powierzchnie koła w trybie zgodności, niewystarczająca głębia tła, zbyt mocne obramowania paneli, przesadny glow CTA oraz brak salda w mobilnym headerze. Wykryto też okna dialogowe przyklejone do lewego górnego rogu.

## Przebieg 1: kompozycja

- Header 72 px na desktopie / 64 px na telefonie; subtelna nawigacja, mniejsze logo, saldo.
- Historia bez osobnej ciężkiej karty; stawka jako kompaktowy kontroler.
- Kolejność mobile: wartość → koło → akcja → stawka → seria.
- Większa liczba wygranej, lżejsza karta, okna wyśrodkowane.
- Dowód: `evidence/pass1-composition.jpg`.

## Przebieg 2: materiały i światło

- Proceduralna architektura sceny, ciemna platforma, kierunkowe światło.
- Ziarnista emalia, drobne rysy, ciemniejszy metal, krawędzie i głębia czaszki.
- Mechaniczny uchwyt pointera, własna koronna moneta i dwukierunkowa ikona obrotu.
- Three.js: tekstura i bump materiału, metalowy ring, geometria architektury i zawias.
- Dowody: `evidence/pass2-materials.jpg`, `evidence/pass2-mobile-win.jpg`.

## Przebieg 3: detale i rzeczywiste problemy układu

- Odstęp pointera od mobilnego nagłówka, stonowane cienie CTA, formatowanie salda.
- Dostosowanie do niskich desktopów i małych telefonów.
- Naprawione zachowanie pozycji przewijania po przejściu z intro do gry.
- Tick pointera i blur także w SVG fallback; zachowane reduced-motion.
- Dowód: `evidence/pass3-mobile-win.jpg`, końcowe zrzuty desktop/mobile.

## Matryca zrzutów

| Viewport CSS | Stan |
|---|---|
| 1366 × 768 | Gra |
| 1440 × 900 | Wygrana 80 |
| 1920 × 1080 | Wygrana 320 |
| 2560 × 1440 | Gra |
| 360 × 800 | Gra |
| 375 × 812 | Wygrana 80 |
| 390 × 844 | Gra |
| 393 × 852 | Przegrana |
| 430 × 932 | Wygrana 320 |

Viewporty odtworzono w iframe o dokładnych wymiarach. Pełne zrzuty desktop zawierają czasem dodatkowy obszar przeglądarki poniżej ramki; obraz 1366 został przycięty do jej granic. Nie wykonywano fizycznych testów urządzeń. Dane `qa=...` są syntetycznymi stanami wyłącznie lokalnego wejścia Vite (`preview.tsx`), nie są publikowane w aplikacji Vinext. Zrzut `actual-spin-result.jpg` przedstawia prawdziwe losowanie przeprowadzone w lokalnym demo.

## Kontrole

- Rzeczywiste losowanie: blokada kontrolek podczas obrotu, wynik po zatrzymaniu, odbiór 80; saldo 1210 → 1170 → 1250.
- Testy reguł: obciążenie salda, podwajanie, odbiór, przegrana, walidacja i 202 pozycje pointera — PASS.
- Testy prezentacji: punkty intensity, interpolacja oraz ciągły monotoniczny przebieg obrotu — PASS.
- TypeScript — PASS.
- Dialog profilu i rekordów: wyśrodkowanie, zamknięcie Escape — sprawdzone.
- Skala szarości: koło, wartość i akcja czytelne; segmenty dodatkowo rozróżniają symbole.
- Rozmycie: koło jest główną masą wizualną, akcja drugą; panele pozostają tłem.
- Bez logo: rozpoznawalna sylwetka koła 50/50, pointera i koronowanego huba; stylistyka oparta na referencji.

## Ograniczenie weryfikacji

Przeglądarka QA ma wyłączony renderer WebGL. Wszystkie zrzuty pokazują rozbudowany SVG fallback. Kod Three.js przechodzi kontrolę typów i build, lecz jego renderowania, odbić i 60 FPS na rzeczywistym GPU nie potwierdzono. Nie deklarujemy zgodności piksel w piksel ani identycznej jakości materiałów względem rasteryzowanej referencji. Test reduced-motion opiera się na zachowanej implementacji i przeglądzie kodu, bez emulacji ustawienia w tej przeglądarce.
