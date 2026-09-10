import { Link, useLocation } from "react-router-dom";

function EnvelopeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function BellIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 8a6 6 0 0 1 12 0c0 7-6 11-6 11S6 15 6 8" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  );
}

function HomeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9L12 2l9 7v11a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function ChatIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      <path d="M8 10h8 M8 14h5" />
    </svg>
  );
}

function GridIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function HeartIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s-6.7-4.35-8.5-8.5C2.2 8.0 3.9 4.5 8 4.5c1.9 0 3.1 1.0 4 2.1 0.9-1.1 2.1-2.1 4-2.1 4.1 0 5.8 3.5 4.5 8C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

const items = [
  { to: "/", label: "Heart — landing ⚡", Icon: HeartIcon },
  { to: "/home", label: "Home — Hogwarts", Icon: HomeIcon },
  { to: "/full-letter", label: "Letter — Hedwig", Icon: EnvelopeIcon },
  { to: "/new-msgs", label: "New messages", Icon: BellIcon },
  { to: "/chat", label: "Owl Post — Hogwarts ⚡", Icon: ChatIcon },
  { to: "/icons", label: "Icons — Full SVG sets", Icon: GridIcon },
];

export default function SideNav() {
  const { pathname } = useLocation();
  return (
    <nav className="side-nav" aria-label="Quick navigation">
      {items.map(({ to, label, Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={`side-nav-link ${active ? "is-active" : ""}`}
            title={label}
          >
            <Icon size={18} />
          </Link>
        );
      })}
    </nav>
  );
}
