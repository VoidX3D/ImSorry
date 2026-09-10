# AGENTS.md — ImSorry Project Prompts & Workflow

This file is the canonical guide for AI agents (and humans) working on **ImSorry** — the cinematic apology site at `VoidX3D/ImSorry` (Vercel: `imreallysorry.vercel.app` + `iamreallysorry.vercel.app`).

It records **how we work**, what prompts drive the build, and what architecture we protect. Update it when the workflow changes — treat it as the agent's README.

---

## 1. Project Identity

**ImSorry** — quiet, minimal, intimate cinematic apology. Not a Valentine template, not a corporate landing.

Feeling: `quiet + emotional + minimal + intimate + slightly mysterious + cinematic`

Core experience: black → dust particles → almost-invisible heart (center, breathing) → tap → heart burst → black pause → 62-message sequence (fade/hold/gap) → silence → Read the full letter → /full-letter + /new-msgs posts + /chat (Owl Post) + /home (love counter since July 29 2026 11:48).

Stack: `React 19 + Vite 8 + JSX + plain CSS + Canvas (requestAnimationFrame) + react-router-dom 7` — **static**, no backend, no DB, no auth (yet). Fonts: `Caveat` (primary, local `public/fonts/Caveat-VariableFont_wght.ttf`) → `Doppio One` → `Chewy`. Build: `vite build` → `dist/` → Vercel (`vercel.json` rewrites SPA).

---

## 2. How We Work (Agent Workflow)

### Roles

- **User (VoidX3D / Sincere)** — product owner, decides copy, Hogwarts theming, deploys.
- **Agent (Muse Spark via OpenCode)** — implements, verifies via `npm run build`, commits, pushes, deploys via `vercel --prod --yes` + `vercel alias set`.

### Cycle

1. **User prompt** — e.g. "change font to Caveat", "add /chat with emoji", "make background fit just chat".
2. **Agent scaffolds/edits** — touches `src/data/*` (source of truth, no hardcoding in JSX), `src/components/*`, `src/pages/*`, `src/styles/*`, `public/fonts|backgrounds`.
3. **Verify** — `npm run build` must pass (no `oxlint` errors, no missing imports). If Vercel MCP connected (`vercel whoami` → `playzspreston2-1597`), agent can deploy.
4. **Commit & push** — `git add` + `git commit -m "feat: ..."` + `git push` to `VoidX3D/ImSorry` `main`.
5. **Deploy** — `vercel --prod --yes` → alias both `imreallysorry.vercel.app` + `iamreallysorry.vercel.app` (SSO disabled via `ssoProtection: null`). Verify with `curl -I` + Playwright.

### Branching

- `main` only (private repo, single owner). No PRs — direct push after build passes. Future: `auth` will add protected branches.
- `vercel` auto-deploys on `main` push; manual `vercel --prod` also used.

### No Hardcoding Rule

- **Never** hardcode copy in JSX. All text/timings live in `src/data/messages.js` (62), `src/data/newMsgs.js`, `src/data/chatMsgs.js`, `src/data/chatThemes.js`, `src/lib/config.ts` (workspace members, birthdays editable).
- Adding a future message: edit `src/data/newMsgs.js` → push → appears in `/new-msgs` feed automatically.
- Themes: `src/data/chatThemes.js` (`chatBackgrounds` from `public/backgrounds/*`, `chatFonts`, `chatBubbleThemes`, `chatPageThemes`) → `ChatThemePicker` reads data.

### Reference Policy

Reference repos are **study-only**, not blind clone:

- `references/notion-lite` (MIT) — Yjs + BlockNote + `y-websocket` + Hono Durable Objects → adapted to `src/features/shared-space/CollaborativeEditor.tsx` + `src/realtime/yjs-server.ts` with attribution.
- `references/AppFlowy` (AGPL-3.0) — workspace philosophy only, no code copy.
- Check license before copy; preserve attribution; prefer reimplementation.

---

## 3. Prompts That Drive the Build (Chronological)

1. **Initial brief** — "Build a Cinematic Interactive Apology Website" — black + particles + breathing heart, no navbar/buttons/cards initially, heart is entrance, Canvas dust, data-driven `messages.js` with `fadeIn/hold/fadeOut/gap/size/glow`, Chewy font, 38 + 24 sequence, timings, `clamp()` responsive, 60 FPS, `prefers-reduced-motion`, etc. → scaffolded `ImSorry` with `HeartIntro`, `ParticleBackground`, `ApologyEngine`, `MessageDisplay`.
2. **Move to projects** — `mv /home/voidx3d/apology-site → /home/voidx3d/Project/ImSorry`, rename `package.json` name + `index.html` title to `ImSorry`.
3. **Font swaps** — Chewy → Doppio One (dot) → Caveat (clevate) → now `Caveat` primary, `Doppio One` → `Chewy` fallback, `@font-face` + preload.
4. **Message rewrite** — 62 new messages (Hey. → I'm sorry... 🥲) replacing 38+24, with `transition` variants (fade/rise/blur/focus).
5. **Brief v2** — full `SharedSpaces`-style spec but for `ImSorry`: mobile-first `100dvh`, `FullLetter` page (`/full-letter` formatted letter, not dumped sentences) + `Birthdays` editable (Mangsir 25 / Kartik 20), final → `Read the full letter`, etc. → added `FinalScreen`, `FullLetter`, `full-letter.css`, routing.
6. **Font size tuning** — site-wide `clamp()` bumps for Caveat (heart `1.95–3.12rem`, letter `1.55–1.78`, etc.).
7. **Scroll fix** — `body overflow: hidden` blocked `/full-letter` scroll → changed to `overflow-y: auto`, `.full-letter-shell overflow: visible`.
8. **Scrollbar hidden** — `html { scrollbar-width: none }` + `::-webkit-scrollbar { display:none }`.
9. **Vercel** — `imreallysorry.vercel.app` + `iamreallysorry.vercel.app`, `vercel.json` SPA rewrites, `ssoProtection` disabled, `gh` + `vercel` MCP (`https://mcp.vercel.com`) connected.
10. **Fix 404** — preload warnings + `favicon.svg` Deathly Hallows → added `public/favicon.svg` + `index.html` icon links, removed unused preloads.
11. **New app pivot** — user said "now making a new app" → scaffolded `SharedSpaces` Phase 0 (monorepo, PWA shell) in `~/Project/SharedSpaces` (private), but then returned to `ImSorry` for iteration.
12. **New messages** — `/new-msgs` posts feed: `src/data/newMsgs.js` (flying kiss ❤️) + `NewMsgPost` boxes, `src/pages/Home` preview, data-driven, no hardcoding.
13. **SideNav** — tiny left rail (Home/envelope/bell/chat) + `/home` page, `SideNav.jsx` SVG icons, `src/styles/main.css` side-nav pill.
14. **Chat** — `/chat` full chat interface with emoji picker (16 emojis), `src/data/chatMsgs.js`, local state, future live-ready.
15. **Chat polish** — single message "Comming soon just for you! ❤️", full-page `100dvh` flex, `Google Sans` + `DM Sans`, 44px touch, 16px input.
16. **Nav enlarge** — bottom `letter-nav` pill buttons 44px, `1.18rem`, flex gap, Instagram-like.
17. **Nav to all pages** — SideNav added to `/home` + `/full-letter` (replacing old bottom nav), using right-side space for cards (`max-width 860`, `20px` padding).
18. **Hogwarts theming** — logo → Deathly Hallows `favicon.svg`, Home `Mischief managed` + Snape quote + house dots, Chat → `Owl Post` with Deathly Hallows avatar, SideNav labels `Hedwig`/`Owl Post` etc., larger type site-wide.
19. **Love counter** — `src/components/LoveCounter.jsx` since July 29 2026 11:48, live days/hours/mins/secs, on `/home`.
20. **Current** — backgrounds folder (4 Hogwarts webp), chat backgrounds theme engine (fit just chat, not whole page), Instagram-like popup theme picker (backdrop, bottom sheet, handle), page themes (Dark/White/Hogwarts), font/bubble solid options, emoji picker categories (Love/Smile/Magic/Fun + Recent), reply quote structure, `src/lib/chatStore.js` (localStorage, DB-ready metadata `id, text, createdAt, authorId, replyTo, updatedAt, deletedAt`).

Future: WebSockets + DB logging + proper auth (Phase 1 of SharedSpaces will inform ImSorry's chat persistence).

---

## 4. Architecture (ImSorry)

```
ImSorry/
├── public/backgrounds/*.webp (4 Hogwarts) + fonts/* + favicon.svg (Deathly Hallows)
├── src/data/
│   ├── messages.js (62, timings)
│   ├── newMsgs.js (posts feed)
│   ├── chatMsgs.js (seed)
│   └── chatThemes.js (backgrounds, fonts, bubbles, pageThemes)
├── src/components/
│   ├── HeartIntro.jsx (SVG heart, breathing, burst)
│   ├── ParticleBackground.jsx (Canvas, 28–85 particles, burst, subtle)
│   ├── MessageDisplay.jsx (fade/rise/blur/focus)
│   ├── ApologyEngine.jsx (state machine, timers, cleanup)
│   ├── SideNav.jsx (SVG rail, 5 items)
│   ├── LoveCounter.jsx (live counter)
│   ├── NewMsgPost.jsx (by your beloved, no avatar)
│   ├── ChatThemePicker.jsx (popup bottom sheet)
│   ├── EmojiPicker.jsx (categories, recent)
│   └── FinalScreen.jsx
├── src/lib/
│   ├── config.ts (workspace, nav, no hardcoding)
│   ├── birthdays.ts
│   └── chatStore.js (load/save/createMsg, DB-ready)
├── src/pages/
│   ├── Home.jsx (Our Space + LoveCounter + latest posts)
│   ├── FullLetter.jsx (formatted letter + P.S.)
│   ├── NewMsgs.jsx (posts feed)
│   └── Chat.jsx (full-page Owl Post, Google Sans, theme bg fit just chat, reply)
├── src/styles/
│   ├── main.css (Caveat, clamp, heart, engine, side-nav, hidden scrollbar)
│   ├── full-letter.css (720→780 max, readable)
│   ├── newmsgs.css (860 max, posts, houses, love counter)
│   └── chat.css (100dvh flex, header nav, popup, background fits chat only)
└── vercel.json (SPA rewrites) + public/_redirects
```

---

## 5. Commands

```bash
cd ~/Project/ImSorry
npm install
npm run dev          # vite http://localhost:5173
npm run build        # tsc + vite → dist/
npm run preview
npm run lint         # oxlint
vercel --prod --yes  # deploy + alias both domains
```

`SharedSpaces` (private, separate): `~/Project/SharedSpaces` — `pnpm` (or `npm --prefix apps/web`), Phase 0 shell at `https://sharedspaces.vercel.app`.

---

## 6. Conventions

- **SVG, not emojis** — UI icons via `lucide-react` or inline SVG; emojis only in message copy sparingly (🥲❤️💀🫶 etc., not spam).
- **No hardcoding** — all copy in `src/data/*`; styles via CSS vars; themes via `chatThemes.js`.
- **Mobile-first** — `100dvh` + `env(safe-area)` + `clamp()`; no hover-only; 44px touch targets.
- **No audio** — silent, particle + typography + timing only.
- **Commit style** — `feat:`, `fix:`, `style:`, `docs:` — e.g. `feat: chat theme popup overlay (Instagram bottom sheet)`.
- **Deploy** — after `npm run build` passes, `git push` + `vercel --prod --yes` + `vercel alias set ... iamreallysorry...`.

---

## 7. Next

- Chat: WebSocket (`y-websocket` or `Hocuspocus`) + DB (`Postgres` `chat_messages` with `replyTo` FK) + auth (reuse SharedSpaces Phase 1).
- Home: more features (timeline, shared notes preview).
- Theme engine: extend to whole site (like SharedSpaces `packages/theme-engine`).

Update this file when adding a new phase or changing the workflow.
