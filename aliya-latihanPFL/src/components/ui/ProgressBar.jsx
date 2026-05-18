/**
 * Component 17: ProgressBar
 * Animated progress bar with label
 */
export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  showPercent = true,
  color = "#1e2d6b",
  height = 8,
  className = "",
}) {
  const percent = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs font-medium text-teks-samping">{label}</span>}
          {showPercent && (
            <span className="text-xs font-semibold text-teks">{percent}%</span>
          )}
        </div>
      )}
      <div
        className="w-full bg-garis rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
