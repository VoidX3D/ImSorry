// Chat themes — Instagram-like, data-driven
// Backgrounds from public/backgrounds/*, fonts, bubble themes, page themes
// Add new themes here — no hardcoding in Chat.jsx

export const chatBackgrounds = [
  { id: "none", label: "Default", value: "none", preview: "linear-gradient(180deg, #0a0a0a, #000)" },
  { id: "hogwarts-night", label: "Hogwarts Night", value: "/backgrounds/19660-amazing-hogwarts-wallpapers-3840x2160-smartphone.webp" },
  { id: "hogwarts-castle", label: "Hogwarts Castle", value: "/backgrounds/2164916-1920x1080-desktop-1080p-hogwarts-castle-background-photo.webp" },
  { id: "diagon-alley", label: "Diagon Alley", value: "/backgrounds/UOR_DiagonAlley_VB.webp" },
  { id: "great-hall", label: "Great Hall", value: "/backgrounds/ca81942bc657ad5135ca49b1e899848c.webp" },
];

export const chatFonts = [
  { id: "google-sans", label: "Google Sans", family: `"Google Sans", "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` },
  { id: "dm-sans", label: "DM Sans", family: `"DM Sans", sans-serif` },
  { id: "caveat", label: "Caveat", family: `"Caveat", cursive` },
  { id: "inter", label: "Instagram", family: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` },
  { id: "serif", label: "Serif", family: `"Georgia", serif` },
];

export const chatBubbleThemes = [
  { id: "default", label: "Default", you: "#fff", youText: "#0a0a0a", them: "rgba(255,255,255,0.07)", themText: "#fff" },
  { id: "hogwarts", label: "Hogwarts", you: "#740001", youText: "#fff", them: "#0e1a40", themText: "#ecb939" },
  { id: "midnight", label: "Midnight", you: "#1a1a1a", youText: "#fff", them: "#262626", themText: "#fff" },
  { id: "instagram", label: "Instagram", you: "linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)", youText: "#fff", them: "rgba(255,255,255,0.08)", themText: "#fff" },
  { id: "solid-white", label: "Solid White", you: "#ffffff", youText: "#000000", them: "#f1f1f1", themText: "#000000" },
  { id: "solid-black", label: "Solid Black", you: "#000000", youText: "#ffffff", them: "#1a1a1a", themText: "#ffffff" },
];

export const chatPageThemes = [
  { id: "dark", label: "Dark", bg: "#000000", text: "#ffffff", preview: "#000000" },
  { id: "light", label: "White", bg: "#ffffff", text: "#0a0a0a", preview: "#ffffff" },
  { id: "hogwarts", label: "Hogwarts", bg: "#0e1a40", text: "#ecb939", preview: "#0e1a40" },
  { id: "midnight", label: "Midnight", bg: "#0c0c0f", text: "#fafafa", preview: "#0c0c0f" },
];
