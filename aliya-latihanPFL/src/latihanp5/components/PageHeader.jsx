export default function PageHeader({ title, breadcrumb, children }) {
  const breadcrumbItems = Array.isArray(breadcrumb)
    ? breadcrumb
    : breadcrumb
    ? [breadcrumb]
    : [];

  return (
    <div
      id="pageheader-container"
      className="flex items-center justify-between p-4"
    >
      {/* Kiri: Title + Breadcrumb */}
      <div id="pageheader-left" className="flex flex-col">
        <span id="page-title" className="text-3xl font-semibold text-teks">
          {title}
        </span>
        <div
          id="breadcrumb-links"
          className="flex items-center font-medium space-x-2 mt-2"
        >
          <span id="breadcrumb-home" className="text-gray-500">
            🏠 Home
          </span>
          {breadcrumbItems.map((item, index) => (
            <span key={index} className="flex items-center space-x-2">
              <span id="breadcrumb-separator" className="text-gray-500">
                /
              </span>
              <span
                id={`breadcrumb-${index}`}
                className="text-gray-500"
              >
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Kanan: Action Button */}
      <div id="action-button">{children}</div>
    </div>
  );
}
