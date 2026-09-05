import { Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-ink-soft">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-semibold text-frost">
              <Gamepad2 className="h-6 w-6 text-violet-soft" />
              GameVerse
            </div>
            <p className="mt-3 max-w-xs text-sm text-mist">
              Gaming Convention Experience. Tres días de torneos, comunidad y
              competencia en Popayán.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-frost">Convención</h3>
            <ul className="mt-3 space-y-2 text-sm text-mist">
              <li>14–16 de noviembre, 2026</li>
              <li>Centro de Eventos Cauca, Popayán</li>
              <li>Entrada general y VIP</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-frost">Contacto</h3>
            <ul className="mt-3 space-y-2 text-sm text-mist">
              <li>hola@gameverseconvention.co</li>
              <li>+57 300 000 0000</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line/60 pt-6 text-xs text-mist">
          © 2026 GameVerse Convention. Proyecto académico.
        </div>
      </div>
    </footer>
  );
}
