export default function LoadingState() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-56 animate-pulse rounded-2xl bg-surface" />
      ))}
    </div>
  );
}
