# Kółeczko

Kompletna aplikacja z kołem 3D, sześcioma poziomami ewolucji (10–320 wirtualnych $), podwajaniem, historią, dźwiękiem i efektami wygranej. Zawiera ostatnią poprawkę usuwającą kwadratowe krawędzie poświaty.

## Szybkie uruchomienie gotowej wersji

Folder `dist` zawiera już zbudowaną aplikację. Jeśli masz Python 3, otwórz terminal w folderze Koleczko i wpisz:

```sh
python3 -m http.server 8080 --directory dist --bind 127.0.0.1
```

Na Windows zamiast `python3` możesz użyć `py`. Otwórz http://localhost:8080. Zatrzymanie: Ctrl+C.

Nie otwieraj index.html bezpośrednio przez dwuklik: aplikacja wymaga lokalnego serwera HTTP.

## Edycja kodu

Wymagany Node.js 22.13 lub nowszy, npm oraz internet przy pierwszej instalacji.

```sh
npm install
npm run dev
```

Otwórz adres wyświetlony przez Vite (domyślnie http://127.0.0.1:5173).

## Nowa kompilacja

```sh
npm run build
npm run preview
```

Wynik kompilacji: `dist/`. Całą zawartość tego folderu można umieścić w katalogu głównym dowolnego hostingu statycznego. Pakiet nie wymaga dostępu do ChatGPT ani usług Sites.

## Zawartość

- `app/page.tsx` — interfejs, saldo, losowanie, podwajanie i historia.
- `app/globals.css` — style, responsywność i miękka maska poświaty.
- `components/Wheel.tsx` — koło Three.js i animacja.
- `components/wheel-effects.ts` — ewolucja, kryształy, płomienie i cząsteczki.
- `public/neon-stage.png` — grafika sceny.
- `dist/` — gotowa wersja do uruchomienia.

React, TypeScript, Vite, Tailwind CSS, Framer Motion, Three.js. Eksport używa Vite jako samodzielnego środowiska zamiast konfiguracji hostingu pierwotnej wersji.

Gra działa wyłącznie na wirtualne dolary; nie obsługuje płatności ani wypłat. Saldo i historia zapisują się lokalnie w przeglądarce, osobno dla każdego adresu strony. Postęp z wersji online nie przenosi się automatycznie. Efekty wymagają WebGL; dostępna jest obsługa ograniczonego ruchu.

Zweryfikowano TypeScript i kompilację. Wygląd oraz wydajność zależą od urządzenia i nie zostały zweryfikowane w przeglądarce w środowisku tworzenia eksportu.
