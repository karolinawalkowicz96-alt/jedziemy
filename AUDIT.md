# Audyty końcowe

## 1. Visual

Zaimplementowano cobalt/crimson/champagne, własne symbole, asymetryczny hero, podziały sekcji i duże wyniki. Zachowano geometrię Three.js. Grafikę social wyrenderowano i obejrzano.

**Nieweryfikowane:** wygląd UI w przeglądarce, screenshoty, porównanie referencji, animacje na urządzeniach. Chromium kończy start SIGTRAP. To ograniczenie, a nie zaliczony audyt.

## 2. Mobile

Reguły do 800 i 370 px, menu zamiast desktop nav, koło przed stawką, wynik nad CTA, safe area, focus i reduced motion. Testy przygotowano dla 320, 360, 375, 390, 393, 414, 430, 1366, 1440, 1920 i 2560 px.

**Nieweryfikowane:** overflow, dotyk, klawiatura ekranowa, dialogi i screenshoty. Wymagają uruchomienia testów E2E i kontroli wizualnej.

## 3. Performance

Tło WebP ~119 KB zamiast ~2,1 MB. Główny JS ~112 KB gzip, osobny chunk Three.js/koła ~154 KB gzip. Ograniczony DPR, postprocessing wyłączony mobile, mniej cząstek i fragmentów, renderer pomija widok poza ekranem. Font systemowy bez transferu.

**Nieweryfikowane:** LCP, CLS, INP, pamięć GPU, FPS i Lighthouse. Chunk koła przekracza 500 KB przed gzip (ostrzeżenie Vite). Nie deklarujemy zaliczenia Core Web Vitals.

## 4. SEO i dostępność

Prerender treści HTML z jednym h1 i FAQ. Opis wirtualnej waluty, manifest, favicon, Apple icon, OG/X, robots i sitemap. SITE_URL generuje canonical i schema WebSite, bez fikcyjnych ocen. Bez domeny build ma noindex. Natywne dialogi, etykiety, focus i symbole wyników poza kolorem.

**Nieweryfikowane:** kontrast wszystkich stanów, czytnik ekranu, indeksowanie domeny i podglądy linków. Statusy 404/500/503 wymagają konfiguracji hostingu. Ranking i profil są lokalne; nie dodano fikcyjnego backendu ani sztucznych stanów ładowania sieci.
