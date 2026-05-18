/**
 * Component 14: EmptyState
 * Shown when there's no data
 */
import Button from "./Button";

export default function EmptyState({
  icon = "📭",
  title = "Tidak ada data",
  description,
  action,
  actionLabel,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-teks mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-teks-samping max-w-xs mb-5">{description}</p>
      )}
      {action && actionLabel && (
        <Button onClick={action} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
