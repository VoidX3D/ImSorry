// New messages — data-driven posts feed for /new-msgs
// Edit this file to add future messages. Nothing is hardcoded in JSX.
// Each post: { id, text, createdAt (ISO), author? }

export const newMsgs = [
  {
    id: "2026-09-07-flying-kiss",
    text: "How did you like that flying kiss babe? ❤️",
    createdAt: "2026-09-07T22:45:00+05:45",
    author: "Sin",
  },
];

// Helper — sorted newest first
export const getNewMsgs = () => [...newMsgs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
