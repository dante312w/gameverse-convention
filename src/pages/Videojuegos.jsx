import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { getGames, createGame, updateGame, deleteGame } from "../services/gameService";
import { useToast } from "../context/toastContextObject";
import Button from "../components/common/Button";
import SearchBar from "../components/common/SearchBar";
import Select from "../components/common/Select";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import EmptyState from "../components/common/EmptyState";
import Badge from "../components/common/Badge";
import GameCard from "../components/games/GameCard";
import GameForm from "../components/games/GameForm";

const SORT_OPTIONS = [
  { value: "name-asc", label: "Nombre (A-Z)" },
  { value: "name-desc", label: "Nombre (Z-A)" },
  { value: "year-desc", label: "Año (más reciente)" },
  { value: "year-asc", label: "Año (más antiguo)" },
];

export default function Videojuegos() {
  const { addToast } = useToast();
  const [games, setGames] = useState(() => getGames());
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("Todos");
  const [platformFilter, setPlatformFilter] = useState("Todos");
  const [sort, setSort] = useState("name-asc");

  const [formModal, setFormModal] = useState({ open: false, game: null });
  const [viewModal, setViewModal] = useState({ open: false, game: null });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const genres = useMemo(() => ["Todos", ...new Set(games.map((g) => g.genre))], [games]);
  const platforms = useMemo(() => ["Todos", ...new Set(games.map((g) => g.platform))], [games]);

  const filteredGames = useMemo(() => {
    let result = games.filter((g) => {
      const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = genreFilter === "Todos" || g.genre === genreFilter;
      const matchesPlatform = platformFilter === "Todos" || g.platform === platformFilter;
      return matchesSearch && matchesGenre && matchesPlatform;
    });

    result = [...result].sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "year-desc") return b.year - a.year;
      if (sort === "year-asc") return a.year - b.year;
      return 0;
    });

    return result;
  }, [games, search, genreFilter, platformFilter, sort]);

  const handleCreate = (data) => {
    const newGame = createGame(data);
    setGames((prev) => [...prev, newGame]);
    setFormModal({ open: false, game: null });
    addToast("Videojuego creado correctamente.", "success");
  };

  const handleUpdate = (data) => {
    updateGame(formModal.game.id, data);
    setGames((prev) => prev.map((g) => (g.id === formModal.game.id ? { ...g, ...data } : g)));
    setFormModal({ open: false, game: null });
    addToast("Videojuego actualizado correctamente.", "success");
  };

  const handleDelete = () => {
    deleteGame(deleteTarget.id);
    setGames((prev) => prev.filter((g) => g.id !== deleteTarget.id));
    addToast(`"${deleteTarget.name}" fue eliminado.`, "info");
    setDeleteTarget(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-semibold text-frost">Videojuegos</h1>
          <p className="mt-1 text-sm text-mist">{filteredGames.length} resultados</p>
        </div>
        <Button onClick={() => setFormModal({ open: true, game: null })}>
          <Plus className="h-4 w-4" /> Nuevo videojuego
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar videojuego..." />
        <Select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          options={genres.map((g) => ({ value: g, label: g }))}
          className="sm:w-48"
        />
        <Select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          options={platforms.map((p) => ({ value: p, label: p }))}
          className="sm:w-48"
        />
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          options={SORT_OPTIONS}
          className="sm:w-56"
        />
      </div>

      <div className="mt-8">
        {filteredGames.length === 0 ? (
          <EmptyState message="No hay videojuegos que coincidan con tu búsqueda." />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onView={(g) => setViewModal({ open: true, game: g })}
                onEdit={(g) => setFormModal({ open: true, game: g })}
                onDelete={(g) => setDeleteTarget(g)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={formModal.open}
        onClose={() => setFormModal({ open: false, game: null })}
        title={formModal.game ? "Editar videojuego" : "Nuevo videojuego"}
      >
        <GameForm
          initialData={formModal.game}
          onSubmit={formModal.game ? handleUpdate : handleCreate}
          onCancel={() => setFormModal({ open: false, game: null })}
        />
      </Modal>

      <Modal
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, game: null })}
        title={viewModal.game?.name || ""}
      >
        {viewModal.game && (
          <div className="space-y-4">
            <img
              src={viewModal.game.image}
              alt={viewModal.game.name}
              className="h-48 w-full rounded-xl object-cover"
            />
            <div className="flex flex-wrap gap-2">
              <Badge>{viewModal.game.status}</Badge>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-mist">Género</dt>
                <dd className="text-frost">{viewModal.game.genre}</dd>
              </div>
              <div>
                <dt className="text-mist">Plataforma</dt>
                <dd className="text-frost">{viewModal.game.platform}</dd>
              </div>
              <div>
                <dt className="text-mist">Desarrollador</dt>
                <dd className="text-frost">{viewModal.game.developer}</dd>
              </div>
              <div>
                <dt className="text-mist">Año</dt>
                <dd className="text-frost">{viewModal.game.year}</dd>
              </div>
            </dl>
            <p className="text-sm text-mist">{viewModal.game.description}</p>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar videojuego"
        message={`¿Seguro que quieres eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
