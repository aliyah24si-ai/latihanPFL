/**
 * Component 5: Card
 * Variants: default (white), pastel (colored bg), navy (dark)
 */
export default function Card({
  children,
  variant = "default",
  className = "",
  onClick,
  padding = "p-5",
}) {
  const variants = {
    default: "bg-white border border-garis shadow-sm",
    flat: "bg-white border border-garis",
    navy: "text-white",
    pastel: "",
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl ${padding} ${variants[variant]} ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * PastelCard - stat card with colored background
 */
export function PastelCard({ label, value, sub, bg, color, icon }) {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: bg }}>
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <p className="text-xs font-medium mb-1" style={{ color }}>
        {label}
      </p>
      <p className="text-3xl font-bold" style={{ color }}>
        {value}
      </p>
      {sub && (
        <p className="text-xs mt-1" style={{ color, opacity: 0.7 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/**
 * CardWithAction - card with title and action button on the right
 */
export function CardWithAction({ title, description, action, children }) {
  return (
    <div className="bg-white rounded-2xl border border-garis shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {title && <p className="font-semibold text-teks text-sm">{title}</p>}
          {description && <p className="text-xs text-teks-samping mt-1">{description}</p>}
          {children}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
