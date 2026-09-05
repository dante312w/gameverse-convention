import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Gamepad2 } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/videojuegos", label: "Videojuegos" },
  { to: "/torneos", label: "Torneos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-frost" : "text-mist hover:text-frost"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-frost">
          <Gamepad2 className="h-6 w-6 text-violet-soft" strokeWidth={2} />
          GameVerse
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <NavLink
            to="/torneos"
            className="rounded-full bg-gradient-to-r from-violet to-cyan px-5 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105"
          >
            Inscribirme
          </NavLink>
        </div>

        <button
          className="text-frost md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line/60 bg-ink px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/torneos"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-violet to-cyan px-5 py-2 text-center text-sm font-semibold text-ink"
            >
              Inscribirme
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
