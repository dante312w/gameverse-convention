const STYLES = {
  Activo: "bg-cyan/15 text-cyan",
  Inactivo: "bg-mist/15 text-mist",
  Abierto: "bg-cyan/15 text-cyan",
  "En curso": "bg-violet/20 text-violet-soft",
  Finalizado: "bg-mist/15 text-mist",
};

export default function Badge({ children }) {
  const style = STYLES[children] || "bg-violet/20 text-violet-soft";
  return (
    <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${style}`}>
      {children}
    </span>
  );
}
