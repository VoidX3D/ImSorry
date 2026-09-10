// Chat themes — Instagram-like, data-driven
// Backgrounds from public/backgrounds/*, fonts from Google Fonts, bubble themes like Messenger
// Add new themes here — no hardcoding in Chat.jsx

export const chatBackgrounds = [
  { id: "none", label: "Default (dark)", value: "none", preview: "linear-gradient(180deg, #000, #0a0a0a)" },
  { id: "hogwarts-night", label: "Hogwarts Night", value: "/backgrounds/19660-amazing-hogwarts-wallpapers-3840x2160-smartphone.webp" },
  { id: "hogwarts-castle", label: "Hogwarts Castle", value: "/backgrounds/2164916-1920x1080-desktop-1080p-hogwarts-castle-background-photo.webp" },
  { id: "diagon-alley", label: "Diagon Alley", value: "/backgrounds/UOR_DiagonAlley_VB.webp" },
  { id: "great-hall", label: "Great Hall", value: "/backgrounds/ca81942bc657ad5135ca49b1e899848c.webp" },
];

export const chatFonts = [
  { id: "google-sans", label: "Google Sans", family: `"Google Sans", "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` },
  { id: "dm-sans", label: "DM Sans", family: `"DM Sans", sans-serif` },
  { id: "caveat", label: "Caveat", family: `"Caveat", cursive` },
  { id: "inter", label: "Inter (Instagram)", family: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` },
  { id: "serif", label: "Serif", family: `"Georgia", serif` },
];

export const chatBubbleThemes = [
  { id: "default", label: "Default", you: "#fff", youText: "#0a0a0a", them: "rgba(255,255,255,0.07)", themText: "#fff" },
  { id: "hogwarts", label: "Hogwarts", you: "#740001", youText: "#fff", them: "#0e1a40", themText: "#ecb939" },
  { id: "midnight", label: "Midnight", you: "#1a1a1a", youText: "#fff", them: "#262626", themText: "#fff" },
  { id: "instagram", label: "Instagram", you: "linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)", youText: "#fff", them: "rgba(255,255,255,0.08)", themText: "#fff" },
];
