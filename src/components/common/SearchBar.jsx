import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-line bg-surface py-2.5 pl-11 pr-4 text-sm text-frost outline-none placeholder:text-mist/60 focus:border-violet-soft"
      />
    </div>
  );
}
