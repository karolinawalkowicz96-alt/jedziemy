# Kółeczko — frontend reference refinement

Game rules, `lib/game.ts`, random result generation, balance mutations and persistence were preserved.

## Pass 1 — source and reference review
- Reduced navigation height from 100 to 76 px; removed PLAY badge and SALDO caption.
- Restored compact Gra / Ranking / Jak to działa? / FAQ menu, illustrated avatar, gold-edged balance.
- Enlarged wheel, reduced empty space, compacted stake and history panels.
- Added single smooth 0.15–1.0 intensity mapping from current stake/pot.
- Added extruded coins/skull, layered metallic rim, lit platform, fixed pointer, environment reflections, ambient particles and debris.

## Pass 2 — source and reference review
- Kept pointer sharp by moving speed trails from full-canvas blur to wheel-face ghost meshes.
- Reduced per-frame allocations; kept one renderer and one fixed wheel geometry.
- Reordered mobile layout to heading → wheel → stake → action → series.
- Added mobile hamburger and result-screen gold typography/card/series.
- Fine-tuned rim colors, history-row contrast, mobile pointer clearance and result spacing.

## Browser verification
The initial preview supervisor could not start the Worker emulator. A separate Vite development entry now renders the same React page and CSS without server emulation; production build remains Vinext/Workers. The HTTP QA entry alone supplies randomUUID compatibility; production game logic is untouched.

Two browser refinement passes compared the 1366px desktop layout and 390px iframe viewport with the supplied reference. Inspected header, game, winning card, series, primary/secondary actions, coins, and responsive order. Played a 40-point test round, observed an 80-point win, and collected it through the mobile interface. Corrected the old flat fallback, replaced generic coin outlines, refined gold effects and mobile heading line breaks.

WebGL is explicitly disabled in this cloud browser (GL_RENDERER = Disabled). Browser screenshots therefore validate the layered SVG compatibility renderer, not the Three.js scene. Native GPU lighting, depth and frame rate still need verification on a WebGL-capable device. Do not claim pixel-perfect equivalence or measured 60 FPS.
