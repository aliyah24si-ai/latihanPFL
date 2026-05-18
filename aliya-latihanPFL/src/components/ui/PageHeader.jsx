/**
 * Component 15: PageHeader (upgraded)
 * Page title + breadcrumb + optional action slot
 */
export default function PageHeader({ title, breadcrumb, children, description }) {
  const breadcrumbItems = Array.isArray(breadcrumb)
    ? breadcrumb
    : breadcrumb
    ? [breadcrumb]
    : [];

  return (
    <div className="flex items-start justify-between px-4 py-4 mb-2">
      <div>
        <h1 className="text-2xl font-bold text-teks">{title}</h1>
        {description && (
          <p className="text-sm text-teks-samping mt-0.5">{description}</p>
        )}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-xs text-teks-samping">🏠 Home</span>
          {breadcrumbItems.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="text-xs text-teks-samping">/</span>
              <span className="text-xs text-navy font-medium">{item}</span>
            </span>
          ))}
        </div>
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  );
}
