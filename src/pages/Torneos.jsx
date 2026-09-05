import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { getGames } from "../services/gameService";
import {
  getTournaments,
  createTournament,
  updateTournament,
  deleteTournament,
} from "../services/tournamentService";
import { useToast } from "../context/toastContextObject";
import Button from "../components/common/Button";
import SearchBar from "../components/common/SearchBar";
import Select from "../components/common/Select";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import EmptyState from "../components/common/EmptyState";
import Badge from "../components/common/Badge";
import TournamentCard from "../components/tournaments/TournamentCard";
import TournamentForm from "../components/tournaments/TournamentForm";

const STATUS_OPTIONS = ["Todos", "Abierto", "En curso", "Finalizado"];
const SORT_OPTIONS = [
  { value: "date-asc", label: "Fecha (próximos primero)" },
  { value: "date-desc", label: "Fecha (recientes primero)" },
  { value: "name-asc", label: "Nombre (A-Z)" },
];

export default function Torneos() {
  const { addToast } = useToast();
  const [games] = useState(() => getGames());
  const [tournaments, setTournaments] = useState(() => getTournaments());
  const [search, setSearch] = useState("");
  const [gameFilter, setGameFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [sort, setSort] = useState("date-asc");

  const [formModal, setFormModal] = useState({ open: false, tournament: null });
  const [viewModal, setViewModal] = useState({ open: false, tournament: null });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const gameNameById = useMemo(() => {
    const map = {};
    games.forEach((g) => (map[g.id] = g.name));
    return map;
  }, [games]);

  const filteredTournaments = useMemo(() => {
    let result = tournaments.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
      const matchesGame = gameFilter === "Todos" || t.gameId === gameFilter;
      const matchesStatus = statusFilter === "Todos" || t.status === statusFilter;
      return matchesSearch && matchesGame && matchesStatus;
    });

    result = [...result].sort((a, b) => {
      if (sort === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sort === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [tournaments, search, gameFilter, statusFilter, sort]);

  const handleCreate = (data) => {
    const newTournament = createTournament(data);
    setTournaments((prev) => [...prev, newTournament]);
    setFormModal({ open: false, tournament: null });
    addToast("Torneo creado correctamente.", "success");
  };

  const handleUpdate = (data) => {
    updateTournament(formModal.tournament.id, data);
    setTournaments((prev) =>
      prev.map((t) => (t.id === formModal.tournament.id ? { ...t, ...data } : t))
    );
    setFormModal({ open: false, tournament: null });
    addToast("Torneo actualizado correctamente.", "success");
  };

  const handleDelete = () => {
    deleteTournament(deleteTarget.id);
    setTournaments((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    addToast(`"${deleteTarget.name}" fue eliminado.`, "info");
    setDeleteTarget(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-semibold text-frost">Torneos</h1>
          <p className="mt-1 text-sm text-mist">{filteredTournaments.length} resultados</p>
        </div>
        <Button onClick={() => setFormModal({ open: true, tournament: null })}>
          <Plus className="h-4 w-4" /> Nuevo torneo
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar torneo..." />
        <Select
          value={gameFilter}
          onChange={(e) => setGameFilter(e.target.value)}
          options={[{ value: "Todos", label: "Todos los videojuegos" }, ...games.map((g) => ({ value: g.id, label: g.name }))]}
          className="sm:w-56"
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={STATUS_OPTIONS.map((s) => ({ value: s, label: s }))}
          className="sm:w-44"
        />
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          options={SORT_OPTIONS}
          className="sm:w-56"
        />
      </div>

      <div className="mt-8">
        {filteredTournaments.length === 0 ? (
          <EmptyState message="No hay torneos que coincidan con tu búsqueda." />
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {filteredTournaments.map((t) => (
              <TournamentCard
                key={t.id}
                tournament={t}
                gameName={gameNameById[t.gameId] || "Videojuego eliminado"}
                onView={(tour) => setViewModal({ open: true, tournament: tour })}
                onEdit={(tour) => setFormModal({ open: true, tournament: tour })}
                onDelete={(tour) => setDeleteTarget(tour)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={formModal.open}
        onClose={() => setFormModal({ open: false, tournament: null })}
        title={formModal.tournament ? "Editar torneo" : "Nuevo torneo"}
      >
        <TournamentForm
          games={games}
          initialData={formModal.tournament}
          onSubmit={formModal.tournament ? handleUpdate : handleCreate}
          onCancel={() => setFormModal({ open: false, tournament: null })}
        />
      </Modal>

      <Modal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, tournament: null })}
        title={viewModal.tournament?.name || ""}
      >
        {viewModal.tournament && (
          <div className="space-y-4">
            <Badge>{viewModal.tournament.status}</Badge>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-mist">Videojuego</dt>
                <dd className="text-frost">{gameNameById[viewModal.tournament.gameId] || "—"}</dd>
              </div>
              <div>
                <dt className="text-mist">Lugar</dt>
                <dd className="text-frost">{viewModal.tournament.place}</dd>
              </div>
              <div>
                <dt className="text-mist">Fecha</dt>
                <dd className="text-frost">{viewModal.tournament.date} · {viewModal.tournament.time}</dd>
              </div>
              <div>
                <dt className="text-mist">Premio</dt>
                <dd className="text-frost">{viewModal.tournament.prize}</dd>
              </div>
              <div>
                <dt className="text-mist">Jugadores</dt>
                <dd className="text-frost">
                  {viewModal.tournament.participants}/{viewModal.tournament.maxPlayers}
                </dd>
              </div>
            </dl>
            <p className="text-sm text-mist">{viewModal.tournament.description}</p>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar torneo"
        message={`¿Seguro que quieres eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
