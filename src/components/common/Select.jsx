export default function Select({ label, error, options, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-frost">{label}</span>}
      <select
        className={`w-full rounded-xl border bg-surface px-4 py-2.5 text-sm text-frost outline-none transition-colors focus:border-violet-soft ${
          error ? "border-magenta/60" : "border-line"
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="mt-1 block text-xs text-magenta">{error}</span>}
    </label>
  );
}
