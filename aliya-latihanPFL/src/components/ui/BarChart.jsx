/**
 * Component 10: BarChart
 * Proporsional, tidak kurus — bar lebar mengisi ruang yang tersedia
 */

const DEFAULT_COLORS = [
  "#1e2d6b",
  "#2d3f8f",
  "#3B82F6",
  "#8B5CF6",
  "#F59E0B",
  "#4CAF50",
];

export default function BarChart({
  data = [],
  height = 160,
  colors,
  activeIndex,
  labelKey = "label",
  valueKey = "value",
  formatValue,
  title,
  showValue = true,
}) {
  const maxVal = Math.max(...data.map((d) => d[valueKey]), 1);
  const labelH = 20;   // tinggi label bawah
  const valueH = 18;   // tinggi label nilai atas
  const barAreaH = height - labelH - valueH;

  const resolvedColors = colors ?? DEFAULT_COLORS;
  const highlightIdx = activeIndex ?? data.length - 1;

  return (
    <div>
      {title && <p className="text-sm font-semibold text-teks mb-3">{title}</p>}

      {/* gap-2 biar bar tidak terlalu rapat, flex-1 biar tiap bar sama lebar */}
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((d, i) => {
          const barH = Math.max((d[valueKey] / maxVal) * barAreaH, 6);
          const isActive = i === highlightIdx;
          const color = resolvedColors[i % resolvedColors.length];
          const displayVal = formatValue ? formatValue(d[valueKey]) : d[valueKey];

          return (
            <div
              key={i}
              className="flex flex-col items-center flex-1 min-w-0"
              style={{ height }}
            >
              {/* Nilai di atas bar */}
              <div style={{ height: valueH }} className="flex items-end justify-center w-full">
                {showValue && (
                  <span
                    className="text-[10px] font-semibold text-center leading-none"
                    style={{ color: isActive ? color : "#9CA3AF" }}
                  >
                    {displayVal}
                  </span>
                )}
              </div>

              {/* Bar — flex-1 biar tinggi sisa terisi */}
              <div
                className="flex flex-col justify-end w-full"
                style={{ height: barAreaH }}
              >
                <div
                  className="w-full rounded-t-lg relative overflow-hidden cursor-default transition-all duration-500 hover:opacity-90"
                  style={{
                    height: barH,
                    backgroundColor: color,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  title={`${d[labelKey]}: ${displayVal}`}
                >
                  {/* Shine di bar aktif */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-t-lg"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 55%)",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Label bawah */}
              <div
                className="flex items-center justify-center w-full"
                style={{ height: labelH }}
              >
                <span className="text-[11px] text-teks-samping truncate">
                  {d[labelKey]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
