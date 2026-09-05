export default function Textarea({ label, error, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-frost">{label}</span>}
      <textarea
        className={`w-full rounded-xl border bg-surface px-4 py-2.5 text-sm text-frost outline-none transition-colors placeholder:text-mist/60 focus:border-violet-soft ${
          error ? "border-magenta/60" : "border-line"
        } ${className}`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-magenta">{error}</span>}
    </label>
  );
}
