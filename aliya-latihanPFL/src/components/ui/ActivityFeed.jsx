/**
 * Component 12: ActivityFeed
 * Timeline-style activity list
 */
export default function ActivityFeed({ items = [], dark = false }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 pb-3 ${
            i < items.length - 1
              ? dark
                ? "border-b border-white/10"
                : "border-b border-garis"
              : ""
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
              dark ? "bg-white/10" : "bg-latar"
            }`}
          >
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-xs font-medium leading-snug ${
                dark ? "text-white/90" : "text-teks"
              }`}
            >
              {item.text}
            </p>
            <p
              className={`text-xs mt-0.5 ${
                dark ? "text-white/50" : "text-teks-samping"
              }`}
            >
              {item.time}
            </p>
          </div>
          {item.badge && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
              style={{ backgroundColor: item.badge.bg, color: item.badge.color }}
            >
              {item.badge.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
