import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import Button from "../common/Button";

const STATUSES = ["Abierto", "En curso", "Finalizado"];

function buildEmpty(games) {
  return {
    name: "",
    gameId: games[0]?.id || "",
    date: "",
    time: "",
    place: "",
    maxPlayers: 16,
    prize: "",
    status: "Abierto",
    description: "",
    participants: 0,
  };
}

export default function TournamentForm({ games, initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData || buildEmpty(games));
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!form.gameId) newErrors.gameId = "Selecciona un videojuego.";
    if (!form.date) newErrors.date = "La fecha es obligatoria.";
    if (!form.time) newErrors.time = "La hora es obligatoria.";
    if (!form.place.trim()) newErrors.place = "El lugar es obligatorio.";
    const maxPlayers = Number(form.maxPlayers);
    if (!maxPlayers || maxPlayers < 2) newErrors.maxPlayers = "Debe ser al menos 2 jugadores.";
    if (!form.prize.trim()) newErrors.prize = "El premio es obligatorio.";
    if (!form.description.trim()) newErrors.description = "La descripción es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, maxPlayers: Number(form.maxPlayers), participants: Number(form.participants) });
  };

  if (games.length === 0) {
    return (
      <p className="text-sm text-mist">
        Primero debes crear al menos un videojuego antes de poder crear un torneo.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Nombre del torneo" value={form.name} onChange={handleChange("name")} error={errors.name} />

      <Select
        label="Videojuego"
        value={form.gameId}
        onChange={handleChange("gameId")}
        error={errors.gameId}
        options={games.map((g) => ({ value: g.id, label: g.name }))}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input label="Fecha" type="date" value={form.date} onChange={handleChange("date")} error={errors.date} />
        <Input label="Hora" type="time" value={form.time} onChange={handleChange("time")} error={errors.time} />
      </div>

      <Input label="Lugar" value={form.place} onChange={handleChange("place")} error={errors.place} />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Máximo de jugadores"
          type="number"
          value={form.maxPlayers}
          onChange={handleChange("maxPlayers")}
          error={errors.maxPlayers}
        />
        <Input label="Premio" value={form.prize} onChange={handleChange("prize")} error={errors.prize} />
      </div>

      <Select
        label="Estado"
        value={form.status}
        onChange={handleChange("status")}
        options={STATUSES.map((s) => ({ value: s, label: s }))}
      />

      <Textarea
        label="Descripción"
        rows={3}
        value={form.description}
        onChange={handleChange("description")}
        error={errors.description}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{initialData ? "Guardar cambios" : "Crear torneo"}</Button>
      </div>
    </form>
  );
}
