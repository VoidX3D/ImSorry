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
      <header className="newmsg-post-head">
        <div className="newmsg-avatar" aria-hidden>
          {post.author?.[0] || "S"}
        </div>
        <div className="newmsg-meta">
          <strong className="newmsg-author">{post.author || "Sin"}</strong>
          <span className="newmsg-time">{timeAgo(post.createdAt)}</span>
        </div>
        <span className="newmsg-badge">new</span>
      </header>
      <p className="newmsg-text">{post.text}</p>
      <footer className="newmsg-foot">
        <span className="newmsg-id">#{post.id}</span>
      </footer>
    </article>
  );
}
