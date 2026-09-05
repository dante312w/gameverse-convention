import { Link } from "react-router-dom";
import { Calendar, MapPin, Swords, Trophy, Users, Gamepad2, ArrowRight } from "lucide-react";
import { useCountdown } from "../hooks/useCountdown";
import { seedGames } from "../data/seedGames";
import { seedTournaments } from "../data/seedTournaments";

const EVENT_DATE = "2026-11-14T09:00:00";

const categories = [
  { icon: Swords, label: "Shooters" },
  { icon: Gamepad2, label: "Lucha" },
  { icon: Trophy, label: "MOBA" },
  { icon: Users, label: "Battle Royale" },
];

const stats = [
  { label: "Videojuegos", value: seedGames.length },
  { label: "Torneos", value: seedTournaments.length },
  { label: "Jugadores", value: 312 },
  { label: "Partidas", value: 96 },
];

function CountdownBlock({ label, value }) {
  return (
    <div className="glass flex w-20 flex-col items-center rounded-2xl py-4">
      <span className="font-display text-3xl font-semibold text-frost">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs uppercase tracking-wide text-mist">{label}</span>
    </div>
  );
}

export default function Home() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);
  const featuredGames = seedGames.slice(0, 4);
  const featuredTournaments = seedTournaments.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(139,92,246,0.25), transparent), radial-gradient(40% 40% at 85% 20%, rgba(34,211,238,0.18), transparent)",
          }}
        />
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium text-cyan">14–16 de noviembre, 2026 · Popayán</p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight text-frost md:text-6xl">
            <span className="text-gradient">GameVerse Convention</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mist">
            Donde los videojuegos cobran vida.
          </p>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-mist">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-violet-soft" /> 14–16 Nov, 2026
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-violet-soft" /> Centro de Eventos Cauca
            </span>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/videojuegos"
              className="glow-violet rounded-full bg-gradient-to-r from-violet to-cyan px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105"
            >
              Explorar Convención
            </Link>
            <Link
              to="/torneos"
              className="rounded-full border border-line px-7 py-3 text-sm font-semibold text-frost transition-colors hover:border-violet-soft"
            >
              Ver Torneos
            </Link>
          </div>

          <div className="mt-12 flex justify-center gap-3">
            <CountdownBlock label="Días" value={days} />
            <CountdownBlock label="Horas" value={hours} />
            <CountdownBlock label="Min" value={minutes} />
            <CountdownBlock label="Seg" value={seconds} />
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-frost">Categorías</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="glass flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center transition-colors hover:border-violet-soft/50"
            >
              <Icon className="h-7 w-7 text-cyan" />
              <span className="text-sm font-medium text-frost">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Videojuegos destacados */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-frost">Videojuegos destacados</h2>
          <Link to="/videojuegos" className="flex items-center gap-1 text-sm text-cyan hover:underline">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {featuredGames.map((game) => (
            <div key={game.id} className="glass overflow-hidden rounded-2xl">
              <img src={game.image} alt={game.name} className="h-32 w-full object-cover" />
              <div className="p-4">
                <p className="font-display text-sm font-semibold text-frost">{game.name}</p>
                <p className="mt-1 text-xs text-mist">{game.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Torneos destacados */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-frost">Torneos destacados</h2>
          <Link to="/torneos" className="flex items-center gap-1 text-sm text-cyan hover:underline">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featuredTournaments.map((t) => (
            <div key={t.id} className="glass flex flex-col rounded-2xl p-5">
              <span className="w-fit rounded-full bg-violet/20 px-3 py-1 text-xs font-medium text-violet-soft">
                {t.status}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-frost">{t.name}</h3>
              <p className="mt-1 text-sm text-mist">{t.date} · {t.prize}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-mist">{t.participants}/{t.maxPlayers} jugadores</span>
                <Link to="/torneos" className="font-medium text-cyan hover:underline">
                  Ver torneo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Estadísticas */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="glass grid grid-cols-2 gap-6 rounded-3xl p-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-semibold text-gradient">{s.value}</p>
              <p className="mt-1 text-sm text-mist">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
