export default function PageHeader({ title, breadcrumb, children }) {
  const breadcrumbItems = Array.isArray(breadcrumb)
    ? breadcrumb
    : breadcrumb
    ? [breadcrumb]
    : [];

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col">
        <span className="text-3xl font-semibold text-teks">{title}</span>
        <div className="flex items-center font-medium space-x-2 mt-2">
          <span className="text-gray-500">🏠 Home</span>
          {breadcrumbItems.map((item, index) => (
            <span key={index} className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-500">{item}</span>
            </span>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
