/**
 * Component 7: Table
 * Reusable data table with columns config
 */
export default function Table({ columns = [], data = [], emptyMessage = "Tidak ada data" }) {
  return (
    <div className="bg-white rounded-2xl border border-garis shadow-sm overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-latar border-b border-garis">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-5 py-3 text-xs font-semibold text-teks-samping uppercase tracking-wider whitespace-nowrap"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-10 text-center text-teks-samping text-sm"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-latar transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
