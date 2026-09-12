// Preset users — max 3 for chat. PFP is preset, not changeable for now.
// Structure ready for DB migration: id, username, displayName, pfp (path), house, createdAt
// Future DB: table users (id cuid, username unique, displayName, pfp, createdAt)
// To add user: add entry here + add SVG to public/pfp/{id}.svg (naming: {id}.svg)
// To migrate to DB: replace this file with fetch from /api/users

export const users = [
  { id: "anu", username: "SharedSpaces_Anuradha", displayName: "Anu", pfp: "/pfp/anu.svg", house: "Gryffindor" },
  { id: "sin", username: "SharedSpace_Sincere", displayName: "Sin", pfp: "/pfp/sin.svg", house: "Slytherin" },
  { id: "guest", username: "Guest", displayName: "Guest", pfp: "/pfp/guest.svg", house: "Hufflepuff" },
];

export const getUser = (id) => users.find((u) => u.id === id) || users[2];
