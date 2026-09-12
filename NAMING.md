# Naming Scheme — ImSorry

All files follow a consistent, lowercase, hyphens-only scheme for assets and kebab-case for data, PascalCase for components.

## Rules

- **Components** (`src/components/`): `PascalCase.jsx` — e.g. `SideNav.jsx`, `NewMsgPost.jsx`, `ChatThemePicker.jsx`
- **Pages** (`src/pages/`): `PascalCase.jsx` — e.g. `Home.jsx`, `FullLetter.jsx`
- **Data** (`src/data/`): `kebab-case.js` — e.g. `chat-msgs.js`, `chat-themes.js`, `new-msgs.js`, `users.js`, `messages.js`
- **Lib** (`src/lib/`): `kebab-case.js` — e.g. `chat-store.js`, `config.ts` (keep .ts for TS)
- **Styles** (`src/styles/`): `kebab-case.css` — e.g. `main.css`, `full-letter.css`
- **Public assets** (`public/`): `kebab-case` lowercase, hyphens, no spaces, no caps, no underscores (except for vendor sets)
  - `public/backgrounds/{id}.webp` — `hogwarts-night.webp`, `hogwarts-castle.webp`, `diagon-alley.webp`, `great-hall.webp`
  - `public/pfp/{userId}.svg` — `anu.svg`, `sin.svg`, `guest.svg` (matches `src/data/users.js` id)
  - `public/icons/{set}/{name}.svg` — vendor sets keep original names (Lucide, Heroicons, Feather) — do not rename vendor SVGs
  - `public/fonts/{Family}.woff2` — `Caveat-VariableFont_wght.ttf` etc. keep Family case for font-face
- **Folders**: `kebab-case` or `PascalCase` for special (e.g. `def-reference/` not `def-referemce/`)
- **No spaces, no capitals in public assets** (except fonts). No `default-hp.webp` loose names.

## Renames Applied (2026-09-10)

- `public/backgrounds/19660-amazing-...webp` → `hogwarts-night.webp`
- `public/backgrounds/2164916-...webp` → `hogwarts-castle.webp`
- `public/backgrounds/UOR_DiagonAlley_VB.webp` → `diagon-alley.webp`
- `public/backgrounds/ca81942...webp` → `great-hall.webp`
- `src/data/chatMsgs.js` → `chat-msgs.js`
- `src/data/chatThemes.js` → `chat-themes.js`
- `src/data/newMsgs.js` → `new-msgs.js`
- `src/lib/chatStore.js` → `chat-store.js`
- `def-referemce/` → `def-reference/`

All imports updated accordingly. To add a new background: add `public/backgrounds/{kebab-id}.webp` + entry to `src/data/chat-themes.js` `chatBackgrounds`.
