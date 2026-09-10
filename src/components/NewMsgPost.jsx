function timeAgo(iso) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString();
}

export default function NewMsgPost({ post }) {
  return (
    <article className="newmsg-post">
      <header className="newmsg-post-head" style={{ justifyContent: "space-between" }}>
        <span className="newmsg-by">by your beloved</span>
        <span className="newmsg-time">{timeAgo(post.createdAt)}</span>
      </header>
      <p className="newmsg-text">{post.text}</p>
    </article>
  );
}
