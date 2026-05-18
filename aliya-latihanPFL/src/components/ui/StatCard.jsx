/**
 * Component 9: StatCard
 * Dashboard stat card with icon, value, label, and trend
 */
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function StatCard({
  label,
  value,
  sub,
  icon,
  bg,
  color,
  trend,
  trendUp,
  variant = "pastel", // pastel | white | navy
}) {
  if (variant === "navy") {
    return (
      <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: "#1e2d6b" }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-white/80">{label}</p>
          {icon && <span className="text-xl">{icon}</span>}
        </div>
        <p className="text-3xl font-bold">{value}</p>
        {sub && <p className="text-xs text-white/60 mt-1">{sub}</p>}
        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            {trendUp ? (
              <FaArrowUp className="text-emerald-300 text-xs" />
            ) : (
              <FaArrowDown className="text-red-300 text-xs" />
            )}
            <span className="text-xs text-white/70">{trend}</span>
          </div>
        )}
      </div>
    );
  }

  if (variant === "white") {
    return (
      <div className="bg-white rounded-2xl border border-garis shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-teks-samping">{label}</p>
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-latar flex items-center justify-center text-lg">
              {icon}
            </div>
          )}
        </div>
        <p className="text-2xl font-bold text-teks">{value}</p>
        {sub && <p className="text-xs text-teks-samping mt-1">{sub}</p>}
        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            {trendUp ? (
              <FaArrowUp className="text-hijau text-xs" />
            ) : (
              <FaArrowDown className="text-merah text-xs" />
            )}
            <span className={`text-xs font-medium ${trendUp ? "text-hijau" : "text-merah"}`}>
              {trend}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default: pastel
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
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          {trendUp ? (
            <FaArrowUp className="text-xs" style={{ color }} />
          ) : (
            <FaArrowDown className="text-xs" style={{ color }} />
          )}
          <span className="text-xs" style={{ color, opacity: 0.8 }}>
            {trend}
          </span>
        </div>
      )}
    </div>
  );
}
