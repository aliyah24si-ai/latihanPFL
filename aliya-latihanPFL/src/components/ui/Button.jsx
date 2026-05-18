/**
 * Component 1: Button
 * Variants: primary, secondary, danger, ghost, link
 * Sizes: sm, md, lg
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  className = "",
  icon,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer";

  const variants = {
    primary:
      "bg-navy text-white hover:bg-navy-light active:scale-95 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed",
    secondary:
      "bg-white text-navy border border-navy hover:bg-blue-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
    danger:
      "bg-merah text-white hover:bg-red-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
    success:
      "bg-hijau text-white hover:bg-emerald-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
    ghost:
      "bg-transparent text-navy hover:bg-blue-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
    link: "bg-transparent text-navy underline-offset-2 hover:underline p-0 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const sizes = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2.5 px-5",
    lg: "text-base py-3 px-6",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${variant !== "link" ? sizes[size] : ""} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
