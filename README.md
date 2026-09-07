# Apology — Cinematic Interactive Apology Website

Quiet, minimal, intimate apology experience.

- Black background, dust-like canvas particles, centered breathing heart
- Heart opens into a timed, data-driven message sequence (38 + 24)
- Typography: Chewy (local `public/fonts/Chewy.woff2`)
- No backend, static build (`vite build` → `dist/`)

## Run

```
npm install
npm run dev
npm run build
npm run preview
```

## Structure

```
src/
  components/
    HeartIntro.jsx
    ParticleBackground.jsx
    MessageDisplay.jsx
    ApologyEngine.jsx
  data/messages.js
  styles/main.css
  App.jsx
  main.jsx
public/fonts/Chewy.woff2
```

## Notes

- Replace `public/fonts/Chewy.woff2` to change font — no code changes required.
- All timings live in `src/data/messages.js` (`fadeIn/hold/fadeOut/gap` in seconds).
