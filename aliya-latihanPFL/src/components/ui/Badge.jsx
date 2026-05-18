/**
 * Component 2: Badge
 * Variants: success, danger, warning, info, default, navy
 */
export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    success: "bg-emerald-100 text-emerald-700",
    danger: "bg-red-100 text-red-600",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-blue-100 text-blue-600",
    default: "bg-gray-100 text-gray-600",
    navy: "bg-blue-100 text-navy",
    gold: "bg-amber-100 text-amber-700",
    silver: "bg-purple-100 text-purple-600",
    bronze: "bg-red-100 text-red-500",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
