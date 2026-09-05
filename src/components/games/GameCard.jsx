import { Eye, Pencil, Trash2 } from "lucide-react";
import Badge from "../common/Badge";

export default function GameCard({ game, onView, onEdit, onDelete }) {
  return (
    <div className="glass group overflow-hidden rounded-2xl transition-colors hover:border-violet-soft/50">
      <div className="relative h-36 w-full overflow-hidden">
        <img src={game.image} alt={game.name} className="h-full w-full object-cover" />
        <div className="absolute right-3 top-3">
          <Badge>{game.status}</Badge>
        </div>
      </div>

      <div className="p-4">
        <p className="font-display text-sm font-semibold text-frost">{game.name}</p>
        <p className="mt-1 text-xs text-mist">
          {game.genre} · {game.platform}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => onView(game)}
            className="flex items-center gap-1 text-xs font-medium text-cyan hover:underline"
          >
            <Eye className="h-3.5 w-3.5" /> Ver
          </button>
          <div className="flex items-center gap-3">
            <button onClick={() => onEdit(game)} className="text-mist hover:text-violet-soft" aria-label="Editar">
              <Pencil className="h-4 w-4" />
            </button>
            <button onClick={() => onDelete(game)} className="text-mist hover:text-magenta" aria-label="Eliminar">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
