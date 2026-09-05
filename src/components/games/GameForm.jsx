import { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import Button from "../common/Button";

const GENRES = ["Shooter táctico", "MOBA", "Battle Royale", "Lucha", "Deportes", "Aventura", "Estrategia"];
const PLATFORMS = ["PC", "Multiplataforma", "PlayStation", "Xbox", "Switch"];
const STATUSES = ["Activo", "Inactivo"];

const EMPTY = {
  name: "",
  genre: GENRES[0],
  platform: PLATFORMS[0],
  developer: "",
  year: new Date().getFullYear(),
  description: "",
  image: "",
  status: "Activo",
};

export default function GameForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData || EMPTY);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!form.developer.trim()) newErrors.developer = "El desarrollador es obligatorio.";
    const year = Number(form.year);
    if (!year || year < 1970 || year > 2030) {
      newErrors.year = "Ingresa un año válido entre 1970 y 2030.";
    }
    if (!form.description.trim()) newErrors.description = "La descripción es obligatoria.";
    if (!form.image.trim()) newErrors.image = "La URL de la imagen es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, year: Number(form.year) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Nombre" value={form.name} onChange={handleChange("name")} error={errors.name} />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Género"
          value={form.genre}
          onChange={handleChange("genre")}
          options={GENRES.map((g) => ({ value: g, label: g }))}
        />
        <Select
          label="Plataforma"
          value={form.platform}
          onChange={handleChange("platform")}
          options={PLATFORMS.map((p) => ({ value: p, label: p }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Desarrollador"
          value={form.developer}
          onChange={handleChange("developer")}
          error={errors.developer}
        />
        <Input
          label="Año"
          type="number"
          value={form.year}
          onChange={handleChange("year")}
          error={errors.year}
        />
      </div>

      <Input
        label="Imagen (URL)"
        value={form.image}
        onChange={handleChange("image")}
        error={errors.image}
        placeholder="https://..."
      />

      <Textarea
        label="Descripción"
        rows={3}
        value={form.description}
        onChange={handleChange("description")}
        error={errors.description}
      />

      <Select
        label="Estado"
        value={form.status}
        onChange={handleChange("status")}
        options={STATUSES.map((s) => ({ value: s, label: s }))}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{initialData ? "Guardar cambios" : "Crear videojuego"}</Button>
      </div>
    </form>
  );
}
