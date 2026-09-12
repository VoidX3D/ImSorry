# Instagram Reference — Cleaned

**Source:** `def-referemce/(3) Instagram • Messages.html` + `Messages_files/` (prod, highly unclean, bundled spaghetti, 1.6M HTML, 22M assets, hashed classes like `._aa1`, `x1a`).

**Cleaned:** `cleaned/index.html` + `cleaned/styles.css` + `cleaned/icons-sample.svg`

**What was cleaned:**

- Removed 1.6M of inline scripts, hashed classes, and CDN preconnects.
- Extracted semantic structure: `.ig-shell` → `.ig-header` (avatar + user + actions), `.ig-chat-list` (bubbles), `.ig-input-row`.
- Converted hashed CSS (`.x1a`, `._aa1`) to semantic: `--ig-bg`, `--ig-bubble-you (#0095f6)`, `--ig-border (#363636)`, etc.
- Icons: extracted SVG from prod (phone, video, info, emoji) — full sets are in `public/icons/` (Lucide 1833, Heroicons, Feather).

**UI/UX structure to reuse for ImSorry:**

- Header with avatar + name + call/video/info actions (we use Hogwarts avatar + Owl Post nav).
- Chat list: 60% max-width bubbles, 18px radius, 4px tail, 8px gap.
- Input: 36px rounded, #262626 bg, #363636 border.
- Theme: dark #000, #262626 bubbles, #0095f6 you-bubble (we use Hogwarts #740001 / #0e1a40).

**How to use:** Copy `cleaned/styles.css` variables and `ig-bubble` patterns into `src/styles/chat.css`; copy SVGs to `public/icons/instagram/`.
