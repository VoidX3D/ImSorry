# ImSorry — Cinematic Interactive Apology

> Quiet · minimal · intimate · cinematic — darkness, dust particles, typography, timing, and a real apology.

A **static, mobile-first** interactive apology website. No backend, no database, no audio — just React + Vite + Canvas + CSS. The entire experience feels like a private message revealed one thought at a time.

**Live:** https://imreallysorry.vercel.app · https://iamreallysorry.vercel.app (same deployment, both aliases)  
**Repo:** https://github.com/VoidX3D/ImSorry · Vercel project `imreallysorry` (team `playzspreston2-gmailcoms-projects`)

---

## Experience Flow

```
open → black + subtle dust particles + almost-invisible heart (center)
  ↓ tap heart → heart compresses, glow expands, particles burst outward, fade to black (1.35s)
  ↓ "Hey." → 62-message sequence (fade in → hold → fade out → gap → next)
  ↓ long black silence → "Read the full letter" fades in
  ↓ tap → /full-letter (readable letter, scrollable, hidden scrollbar)
  ↓ P.S. box → link to /new-msgs (placeholder for future messages, stay tuned ;)
  ↓ replay or ← Back to the beginning
```

No navbar, no cards, no scrolling during the sequence — the main viewport is fixed (`100dvh`). The letter page is the only scrollable view.

---

## Tech Stack

- **React 19 + Vite 8** (`@vitejs/plugin-react`), JSX, plain CSS
- **HTML Canvas** for particles (`requestAnimationFrame`, no DOM particle spam)
- **React Router DOM 7** — client-side routing (`/` · `/full-letter` · `/new-msgs`), SPA fallback via `vercel.json` + `public/_redirects`
- **No** Tailwind / Next.js / Express / backend / DB / auth / API / Firebase / Three.js / heavy animation libs

Build is fully static: `vite build` → `dist/` (HTML + CSS + JS + fonts), deployable anywhere.

---

## Project Structure

```
ImSorry/
├── public/
│   ├── _redirects              # Netlify SPA fallback (/* → /index.html)
│   └── fonts/
│       ├── Caveat-VariableFont_wght.ttf   # primary (handwritten)
│       ├── Caveat-Regular.ttf
│       ├── Caveat-OFL.txt
│       ├── DoppioOne-Regular.ttf          # fallback 1
│       ├── Chewy.woff2                    # fallback 2
│       └── README.txt
├── src/
│   ├── components/
│   │   ├── HeartIntro.jsx      # custom SVG heart, touch-first, keyboard accessible
│   │   ├── ParticleBackground.jsx # canvas dust, burst on tap, subtle mode
│   │   ├── MessageDisplay.jsx  # single text node, fade/rise/blur/focus transitions
│   │   ├── ApologyEngine.jsx   # data-driven sequencer (timers, phases, cleanup)
│   │   └── FinalScreen.jsx     # delayed "Read the full letter" reveal
│   ├── pages/
│   │   ├── FullLetter.jsx      # formatted letter + P.S. + /new-msgs teaser
│   │   └── NewMsgs.jsx         # placeholder for future messages
│   ├── data/
│   │   └── messages.js         # 62 messages + timings (source of truth)
│   ├── styles/
│   │   ├── main.css            # cinematic black, clamp(), heart, engine, reduced-motion
│   │   └── full-letter.css     # readable letter (650-720px, hidden scrollbar)
│   ├── App.jsx                 # BrowserRouter + Experience wrapper
│   └── main.jsx
├── index.html                  # preloads Caveat → Doppio One → Chewy, theme #000
├── vite.config.js
├── vercel.json                 # { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
└── package.json
```

---

## Visual Design

- **Palette:** `#000000` + white/gray + very subtle glow. No pink/purple gradients, no Valentine kitsch, no glassmorphism, no stock imagery. Negative space is the design.
- **Heart:** custom SVG (not emoji), near-black `#070708` + `0.22` stroke + radial glow, breathing `scale 1 → 1.035`, `Y 0 → -7px`, loop `4.2s`. Hover: brighter + scale `1.07`; tap: compress → expand glow (`3.2×`) → fade `900ms`.
- **Typography:** `Caveat` primary (local `Caveat-VariableFont_wght.ttf`, `400–700`), fallback `Doppio One`, then `Chewy`. Loaded via `@font-face` (`font-display: swap`), preloaded in `index.html`.
- **Hierarchy:** words → timing → silence → subtle visuals. Silence is the strongest effect.

---

## Font

```css
@font-face {
  font-family: "Caveat";
  src: url("/fonts/Caveat-VariableFont_wght.ttf") format("truetype");
  font-weight: 400 700;
  font-display: swap;
}
body { font-family: "Caveat", "Doppio One", "Chewy", cursive; }
```

Replace any file in `public/fonts/` to change the font — no code changes needed (keep filenames or update `@font-face`).

---

## Particle System (`ParticleBackground.jsx`)

- **Canvas, `requestAnimationFrame`, DPR ≤ 2**, `ctx.setTransform(dpr,…)`.
- **Counts:** mobile `28` → tablet `45` → desktop `85` (subtle mode `18/26/38` on `/full-letter`).
- **Particles:** `r 0.4–1.45px`, `baseAlpha 0.18–0.6` (subtle `0.10–0.32`), `vx/vy ±0.22`, twinkle `sin(t * speed + offset)`. Wrap around edges.
- **Interactions:** touch/mouse gently pushes particles (`dist <120px`, force `0.09`), heart tap bursts outward (`burst` prop increment → `vx/vy += nx*1.8`), `subtle` dims alpha/shadow.
- **Performance:** 60 FPS target, pause on `document.hidden`, cleanup `cancelAnimationFrame` + listeners, `prefers-reduced-motion` reduces movement to `0.06`.

---

## Apology Engine (`ApologyEngine.jsx` + `MessageDisplay.jsx`)

**Data-driven** — no hardcoded JSX. `src/data/messages.js` is the source of truth:

```js
{
  text: "I’m really sorry... 🥲",
  fadeIn: 2.5,   // seconds
  hold: 4.5,
  fadeOut: 3.0,
  gap: 4.0,
  size: "xlarge",      // small | normal | large | xlarge
  glow: "strongest",   // soft | medium | strong | strongest
  transition: "focus"  // fade | rise | blur | focus | fade-down
}
```

Engine state machine per message: `hidden → in → visible → out → gap → next`. Single `MessageDisplay` node updates via props; transitions use `opacity / transform / filter` with `cubic-bezier(0.22, 1, 0.36, 1)` and `will-change`. Timers are `setTimeout` + cleanup on unmount / effect re-run. Sections are internal (intro → apology → explanation → reassurance → future → final) — no labels, pacing varies, important lines reduce particle activity and allow longer silence.

**Current sequence:** 62 messages (single continuous flow, `continuationMessages = []` for compat). Full list in `src/data/messages.js:3` (70 lines).

---

## Message Sequence (62 — current)

1 Hey. · 2 I need to say something. · 3 I’m really sorry. 😔 · 4 I know I hurt you. · 5 And knowing that honestly hurts me too. · 6 I never wanted you to feel like I didn’t care. · 7 I never wanted you to think I was ignoring you. · 8 I just haven’t been getting my phone… · 9 Today, only thing I got was my laptop. · 10 And even that was only because of the science project… · 11 And honestly... I don’t even know how long I’ll have it. · 12 They’re probably going to take it away again. · 13 And then there’s my SEE this year. · 14 There’s just a lot happening right now. · 15 A lot of pressure. A lot of expectations. · 16 But I know that doesn’t make what happened hurt any less. · 17 I know you were waiting for me. · 18 And I’m really sorry. · 19 I wish I could’ve been there when you needed me. · 20 I know I can’t change what happened yesterday. · 21 And I’m really sorry for making you cry. 🥲 · 22 Even if I can’t get my phone or laptop... · 23 I’ll still try my best to talk to you whenever I can. · 24 Even if it’s only one day a week. · 25 Even if it’s only for a little while. · 26 Because things are probably going to get even busier soon. · 27 Our midterms are coming from the beginning of Ashoj... · 28 And after that, pure chaos because of SEE. 💀 · 29 And you have your BLE this year too. · 30 So I know we’re both going to have a lot going on. · 31 But that doesn’t mean I care about you any less. ❤️ · 32 Even when I’m quiet... · 33 Even when I disappear for a while... · 34 Please don’t mistake that silence for me not caring. · 35 Because I do care. A lot. · 36 I still think about you. · 37 I still miss talking to you. · 38 I miss telling you random things. · 39 I miss just being able to talk to you whenever I wanted. · 40 And I know an apology can’t magically fix everything. · 41 But I really want to make things better. · 42 I want to do better whenever I get the chance. · 43 I don’t want you thinking you’re unimportant to me. · 44 You’re not. · 45 Not even close. · 46 So whenever I get my phone... · 47 Whenever I get my laptop... · 48 Whenever I get even a little bit of time... · 49 I’ll try to use it to talk to you. · 50 I can’t promise that everything will suddenly become easy. · 51 But I can promise that I’ll keep trying. · 52 Because you matter to me. ❤️ · 53 And I don’t want one bad day to make you doubt that. · 54 Please take care of yourself too. · 55 Study. Do your best. · 56 And please don’t forget to smile sometimes. 🫶 · 57 I want to see you do well. · 58 I want to be there to see you succeed. · 59 Even if things get difficult for both of us. · 60 I’m still here. · 61 And I’m still trying. · 62 I’m sorry... 🥲

Timings per message live in `messages.js` (first 38 originally had spec `fadeIn/hold/fadeOut/gap` like `1.5/2.0/1.5/1.0` etc.; current file preserves human-like variation).

Human writing preserved: `...`, `!`, `!!`, `really`, `honestly`, fragments, repeats, emojis (`😔 🥲 💀 ❤️ 🫶`), line breaks — not grammar-normalized.

---

## Typography & Responsive

- **Engine:** `clamp()` for all sizes (tuned for Caveat):
  - `small: clamp(1.78rem, 4.8vw, 2.68rem)` · `normal: clamp(2.18rem, 6.2vw, 3.55rem)` · `large: clamp(2.52rem, 7vw, 4.45rem)` · `xlarge: clamp(2.92rem, 9vw, 5.85rem)`
  - `max-width 16–22ch`, `text-wrap: balance`, `overflow-wrap: break-word`
- **Letter:** `max-width 720px`, `body clamp(1.38rem, 2.9vw, 1.58rem)` · title `clamp(2.35rem, 5.2vw, 2.95rem)` · closing `clamp(1.48rem, 3.6vw, 1.88rem)`, `line-height 1.95`, `text-wrap: pretty`.
- **Viewport:** `100dvh` (with `100vh` fallback), `env(safe-area-inset-*)` for notches, `clamp()` everywhere, no horizontal scroll, generous padding.
- **Scrollbar:** hidden but scrollable (`html { scrollbar-width: none; -ms-overflow-style: none }` + `::-webkit-scrollbar { display: none }`), same for `.full-letter-shell` — letter scrolls with no visible bar on desktop/mobile.

---

## Routing & Pages

- `/` — `Experience` (heart + engine + particles + `FinalScreen` + replay)
- `/full-letter` — formatted letter (paragraphs, not dumped sentences), `A letter for you.` kicker, `I’m sorry... 🥲` closing, **P.S. box** (see below), nav `← Back to the beginning · New messages →`
- `/new-msgs` — placeholder (`Coming soon.`), for future additions — link from P.S. and letter nav
- `*` → `/` fallback, SPA rewrite ensures Vercel serves `index.html` for all routes.

---

## The P.S.

On `/full-letter` added at `src/pages/FullLetter.jsx:84` — styled in `full-letter.css:47` (border-left, `rgba(255,255,255,0.05)` bg, `1.32–1.52rem`):

> p.s. I’m sending this as a website link cuz I told my parents I was doing research for the flash flood project when making this — and as it was just coding they didn’t suspect. I can’t really use Instagram right now. This single page should show you what I really wanted to tell you. In the future I’ll add more messages to [/new-msgs](/new-msgs) on this site, so stay tuned ;)

Future messages will go to `src/pages/NewMsgs.jsx` and optionally into `src/data/messages.js` (or a new `newMsgs.js`).

---

## Accessibility & Motion

- Heart is a semantic `<button>` with `aria-label="Open the letter"`, `focus-visible` ring (`box-shadow`), keyboard `Enter`/`Space` handled, `-webkit-tap-highlight-color: transparent`, `touchend` support.
- `aria-live="polite"` on message node, `skip-link` to `#main`.
- `prefers-reduced-motion: reduce` — disables heart breathe, reduces particles to `0.06`, shortens transitions to `opacity 600ms`, keeps sequence functional.
- No audio (`#13`) — silent by design; impact from text/timing/silence/particles/darkness.

---

## Performance

- Canvas particles, CSS animations, minimal React re-renders, cleanup of `requestAnimationFrame` + `setTimeout` + listeners, no extra deps, no API calls, no giant assets. Target 60 FPS, auto particle reduction on small devices.
- `dist/` after `vite build`: ~`9.5kB` CSS + `251kB` JS (gzip `~79kB`), fonts `Caveat 385k` + `DoppioOne 53k` + `Chewy 23k` (cached).

---

## Local Development

```bash
git clone https://github.com/VoidX3D/ImSorry
cd ImSorry
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve dist/
npm run lint     # oxlint
```

Requires Node 18+ (tested on 22). No env vars, no backend.

---

## Customizing

- **Messages / timings:** edit `src/data/messages.js` — each `{ text, fadeIn, hold, fadeOut, gap, size, glow, transition }` (seconds). Rebuild to update.
- **Full letter:** edit `src/pages/FullLetter.jsx` — grouped `<p>`s, not the engine sequence. Keep `Caveat` stack for tone.
- **Future messages:** edit `src/pages/NewMsgs.jsx` or add `src/data/newMsgs.js` and render list (keep hidden scrollbar + same palette).
- **Fonts:** drop new `.ttf/.woff2` into `public/fonts/` and update `@font-face` in `src/styles/main.css:1` + `full-letter.css:30` + preload links in `index.html:8`.
- **Sizes:** tune `src/styles/main.css:129` (`size-*` clamps) and `full-letter.css:20` — already optimized for handwriting.
- **Particles:** tune `src/components/ParticleBackground.jsx:12` (`countForWidth`, `r`, `alpha`, `vx/vy`).

---

## Deployment

- **GitHub:** `VoidX3D/ImSorry` (public), `main` branch, `ImSorry` root, linked to Vercel.
- **Vercel:** project `imreallysorry` (team `playzspreston2-gmailcoms-projects`), framework `Vite` (`vite build`, `dist`), region `iad1`, Node `24.x`.
- **Domains:** `https://imreallysorry.vercel.app` (primary production alias) + `https://iamreallysorry.vercel.app` (extra alias via `vercel alias set` to same deployment). Both `200` after disabling `ssoProtection` (`all_except_custom_domains` → `null`).
- **SPA:** `vercel.json` + `public/_redirects` (`/* → /index.html 200`) ensure `/full-letter` and `/new-msgs` serve client routes.
- **Push to deploy:** `git push origin main` → Vercel builds auto (GitHub integration). Manual: `vercel --prod --yes` from project dir, then `vercel alias set <deployment-url> iamreallysorry.vercel.app`.
- **Other hosts:** `dist/` is static — works on Netlify, Cloudflare Pages, GitHub Pages (set SPA fallback).

---

## History

- Initial `1c87656` — cinematic shell, heart, dust, 38+24 messages, Doppio One.
- `cf4a5d2` — 62-message flow, Caveat primary, `/full-letter`, hidden scrollbar, larger type, routing, Vercel aliases.
- `78213d5` — P.S. box + `/new-msgs` placeholder.
- `bb1aad2` — enlarged P.S. box.

---

## License

No license file — treat as personal, not a template. Copy technique, not the words.

---

*Built by VoidX3D — darkness, particles, timing, and a real apology.*
