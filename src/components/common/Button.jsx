const VARIANTS = {
  primary:
    "bg-gradient-to-r from-violet to-cyan text-ink font-semibold hover:scale-[1.02]",
  secondary:
    "border border-line text-frost hover:border-violet-soft",
  danger:
    "bg-magenta/15 text-magenta border border-magenta/40 hover:bg-magenta/25",
  ghost: "text-mist hover:text-frost",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
