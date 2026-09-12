import { Link, useLocation } from "react-router-dom";
import { Heart, Home, Mail, Bell, MessageCircle, LayoutGrid } from "lucide-react";

const items = [
  { to: "/", label: "Heart — landing ⚡", Icon: Heart },
  { to: "/home", label: "Home — Hogwarts", Icon: Home },
  { to: "/full-letter", label: "Letter — Hedwig", Icon: Mail },
  { to: "/new-msgs", label: "New messages", Icon: Bell },
  { to: "/chat", label: "Owl Post — Hogwarts ⚡", Icon: MessageCircle },
  { to: "/icons", label: "Icons — Full SVG sets", Icon: LayoutGrid },
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
            <Icon size={18} strokeWidth={1.75} aria-hidden />
          </Link>
        );
      })}
    </nav>
  );
}
