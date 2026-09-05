import { SearchX } from "lucide-react";

export default function EmptyState({ message = "No se encontraron resultados." }) {
  return (
    <div className="glass flex flex-col items-center gap-3 rounded-2xl px-6 py-16 text-center">
      <SearchX className="h-8 w-8 text-mist" />
      <p className="text-sm text-mist">{message}</p>
    </div>
  );
}
