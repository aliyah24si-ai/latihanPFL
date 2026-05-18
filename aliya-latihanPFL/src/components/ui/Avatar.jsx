/**
 * Component 8: Avatar
 * Sizes: sm, md, lg, xl
 */
export default function Avatar({ src, name, size = "md", className = "" }) {
  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  // Generate a consistent color from name
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-amber-100 text-amber-700",
    "bg-emerald-100 text-emerald-700",
    "bg-cyan-100 text-cyan-700",
  ];
  const colorIdx = name
    ? name.charCodeAt(0) % colors.length
    : 0;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        onError={(e) => {
          e.target.style.display = "none";
        }}
        className={`rounded-full object-cover ${sizes[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold ${sizes[size]} ${colors[colorIdx]} ${className}`}
    >
      {initials}
    </div>
  );
}
