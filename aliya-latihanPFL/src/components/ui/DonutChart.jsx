/**
 * Component 11: DonutChart
 * SVG-based donut chart for showing proportions
 */
export default function DonutChart({ data = [], size = 120, strokeWidth = 18, title }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, d) => sum + d.value, 0);

  let offset = 0;
  const segments = data.map((d) => {
    const dash = (d.value / total) * circumference;
    const gap = circumference - dash;
    const seg = { ...d, dash, gap, offset };
    offset += dash;
    return seg;
  });

  return (
    <div className="flex flex-col items-center gap-3">
      {title && <p className="text-sm font-semibold text-teks">{title}</p>}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E8EAF0"
            strokeWidth={strokeWidth}
          />
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${seg.dash} ${seg.gap}`}
              strokeDashoffset={-seg.offset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          ))}
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-teks">{total}</span>
          <span className="text-xs text-teks-samping">Total</span>
        </div>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-xs text-teks-samping">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
