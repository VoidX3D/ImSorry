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

const items = [
  { to: "/home", label: "Home — soon", Icon: HomeIcon },
  { to: "/full-letter", label: "Letter", Icon: EnvelopeIcon },
  { to: "/new-msgs", label: "New messages", Icon: BellIcon },
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
