# PFP — Preset Profile Pictures

**Max 3 users** for chat. PFP is preset, not changeable for now (after auth, pfp is assigned).

## Naming Scheme

```
public/pfp/{userId}.svg
```

- `anu.svg` → Anu (SharedSpaces_Anuradha, Gryffindor)
- `sin.svg` → Sin (SharedSpace_Sincere, Slytherin)
- `guest.svg` → Guest (Hufflepuff)

To add a user (max 3): add SVG to `public/pfp/{id}.svg` + entry to `src/data/users.js`.

## DB Structure (future)

Table `users`:
```
id         String @id @default(cuid())
username   String @unique
displayName String
pfp        String // "/pfp/{id}.svg"
house      String
createdAt  DateTime @default(now())
```

Table `chat_messages`:
```
id         String @id @default(cuid())
text       String @db.Text
createdAt  DateTime @default(now())
authorId   String @relation(fields: [authorId], references: [users.id])
replyTo    String? @relation
reactions  Json? // [{emoji, count, users}]
updatedAt  DateTime @updatedAt
deletedAt  DateTime?
```

Current persistence: `localStorage` via `src/lib/chatStore.js` (`chat-msgs-v1`). To migrate: replace `loadMsgs`/`saveMsgs` with `fetch("/api/chat/messages")`.

To delete: `localStorage.removeItem("chat-msgs-v1")` or `DELETE /api/chat/messages/{id}` later.

Auth stub: `src/data/users.js` + `localStorage "chat-user"` (anu/sin/guest). Full auth will use `users` table + session.

Do not allow pfp change for now — preset only.
