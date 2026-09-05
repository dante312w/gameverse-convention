import { Pencil, Trash2, Users } from "lucide-react";
import Badge from "../common/Badge";

export default function TournamentCard({ tournament, gameName, onView, onEdit, onDelete }) {
  return (
    <div className="glass flex flex-col rounded-2xl p-5 transition-colors hover:border-violet-soft/50">
      <div className="flex items-start justify-between gap-3">
        <Badge>{tournament.status}</Badge>
        <div className="flex items-center gap-3">
          <button onClick={() => onEdit(tournament)} className="text-mist hover:text-violet-soft" aria-label="Editar">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={() => onDelete(tournament)} className="text-mist hover:text-magenta" aria-label="Eliminar">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold text-frost">{tournament.name}</h3>
      <p className="mt-1 text-sm text-cyan">{gameName}</p>
      <p className="mt-2 text-sm text-mist">
        {tournament.date} · {tournament.time} · {tournament.place}
      </p>
      <p className="mt-1 text-sm text-mist">Premio: {tournament.prize}</p>

      <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-4 text-sm">
        <span className="flex items-center gap-1.5 text-mist">
          <Users className="h-4 w-4" /> {tournament.participants}/{tournament.maxPlayers}
        </span>
        <button onClick={() => onView(tournament)} className="font-medium text-cyan hover:underline">
          Ver torneo
        </button>
      </div>
    </div>
  );
}
