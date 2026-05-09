import { FaChartBar, FaArrowUp, FaArrowDown, FaFire } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

const monthlyData = [
  { bulan: "Jan", pendapatan: 8500000, order: 42 },
  { bulan: "Feb", pendapatan: 9200000, order: 48 },
  { bulan: "Mar", pendapatan: 11000000, order: 55 },
  { bulan: "Apr", pendapatan: 12800000, order: 75 },
];

const topCustomers = [
  { name: "Siti Rahayu",  total: "Rp 1.850.000", order: 10, loyalty: "Gold" },
  { name: "Ahmad Fauzi",  total: "Rp 1.350.000", order: 8,  loyalty: "Gold" },
  { name: "Hendra Wijaya",total: "Rp 1.125.000", order: 6,  loyalty: "Silver" },
  { name: "Rizky Pratama",total: "Rp 980.000",   order: 5,  loyalty: "Silver" },
];

const loyaltyColor = {
  Gold:   { bg: "#f4d242", color: "#5a4000" },
  Silver: { bg: "#d1caea", color: "#4a3a6b" },
  Bronze: { bg: "#ffc0c0", color: "#7a2a2a" },
};

const maxPendapatan = Math.max(...monthlyData.map((d) => d.pendapatan));

export default function Reports() {
  return (
    <div>
      <PageHeader title="Reports" breadcrumb={["Reports"]} />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 mb-6">
        {[
          { label: "Total Pendapatan", value: "Rp 41,5jt", icon: "💰", bg: "#008471", trend: "+18%", up: true },
          { label: "Total Order",      value: "220",        icon: "🛒", bg: "#80b0e8", trend: "+12%", up: true },
          { label: "Avg per Order",    value: "Rp 188rb",   icon: "📊", bg: "#898e46", trend: "+5%",  up: true },
          { label: "Order Dibatal",    value: "18",         icon: "❌", bg: "#c45f3f", trend: "-3%",  up: false },
        ].map((card, i) => (
          <div
            key={i}
            className="rounded-3xl p-5 shadow-sm"
            style={{ backgroundColor: card.bg }}
          >
            <div className="text-3xl mb-2">{card.icon}</div>
            <p className="text-2xl font-poppins font-bold text-white">{card.value}</p>
            <p className="text-white/80 text-sm">{card.label}</p>
            <div className="flex items-center gap-1 mt-2">
              {card.up
                ? <FaArrowUp className="text-white/80 text-xs" />
                : <FaArrowDown className="text-white/80 text-xs" />}
              <span className="text-white/80 text-xs">{card.trend} bulan ini</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 px-4">

        {/* Bar Chart Pendapatan */}
        <div className="bg-white rounded-3xl shadow-sm p-5">
          <h3 className="font-poppins font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FaChartBar className="text-hijau" /> Pendapatan per Bulan
          </h3>
          <div className="flex items-end gap-4 h-40 px-2">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1 gap-2">
                <p className="text-xs text-gray-500 font-semibold">
                  {(d.pendapatan / 1000000).toFixed(1)}jt
                </p>
                <div
                  className="w-full rounded-t-xl"
                  style={{
                    height: `${(d.pendapatan / maxPendapatan) * 120}px`,
                    backgroundColor: i === monthlyData.length - 1 ? "#008471" : "#9b8bb4",
                    minHeight: "20px",
                  }}
                />
                <p className="text-xs text-gray-400">{d.bulan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-3xl shadow-sm p-5">
          <h3 className="font-poppins font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FaFire className="text-tomato" /> Top Customer
          </h3>
          <div className="space-y-3">
            {topCustomers.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-2xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "#ffc0c0", color: "#7a2a2a" }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.order} order</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <p className="text-sm font-semibold text-gray-700">{c.total}</p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={loyaltyColor[c.loyalty]}
                  >
                    {c.loyalty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
