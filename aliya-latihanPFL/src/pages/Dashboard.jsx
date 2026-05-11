import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
} from "react-icons/fa";

import PageHeader from "../components/PageHeader";

const statCards = [
  {
    label: "Total Orders",
    value: "75",
    sub: "12 order baru",
    bg: "#FEF3C7",
    color: "#92400E",
  },

  {
    label: "Total Delivered",
    value: "175",
    sub: "Tepat waktu",
    bg: "#FCE7F3",
    color: "#9D174D",
  },

  {
    label: "Total Canceled",
    value: "40",
    sub: "Turun 5%",
    bg: "#EDE9FE",
    color: "#5B21B6",
  },

  {
    label: "Total Revenue",
    value: "Rp 12,8jt",
    sub: "Target bulan ini",
    bg: "#DBEAFE",
    color: "#1E40AF",
  },
];

const recentActivity = [
  {
    icon: "🛒",
    text: "Order baru dari Siti Rahayu",
    time: "Hari ini, 10.30 AM",
  },

  {
    icon: "✅",
    text: "Paket Premium dikirim ke Budi",
    time: "Hari ini, 10.00 AM",
  },

  {
    icon: "🎁",
    text: "Promo VIP Cashback diaktifkan",
    time: "Kemarin, 01.00 PM",
  },
];

const tasks = [
  {
    type: "priority",
    color: "#FEE2E2",
    border: "#EF4444",
    icon: "🔴",
    text: "Order Pending belum diproses",
    time: "Hari ini, 09.00 AM",
  },

  {
    type: "warning",
    color: "#FEF3C7",
    border: "#F59E0B",
    icon: "⚠️",
    text: "Stok Paket Harian hampir habis",
    time: "Hari ini, 09.00 AM",
  },

  {
    type: "other",
    color: "#F9FAFB",
    border: "#E5E7EB",
    icon: "📦",
    text: "Cek pengiriman order #ORD-028",
    time: "Besok, 08.00 AM",
  },
];

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        breadcrumb="Dashboard"
      />

      <div className="grid md:grid-cols-3 gap-4 px-4">
        {/* Kiri - Konten Utama */}
        <div className="md:col-span-2 space-y-4">
          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-3">
            {statCards.slice(0, 3).map((card, i) => (
              <div
                key={i}
                className="rounded-2xl p-4"
                style={{ backgroundColor: card.bg }}
              >
                <p
                  className="text-xs font-medium mb-2"
                  style={{ color: card.color }}
                >
                  {card.label}
                </p>

                <p
                  className="text-3xl font-bold"
                  style={{ color: card.color }}
                >
                  {card.value}
                </p>

                <p
                  className="text-xs mt-1"
                  style={{
                    color: card.color,
                    opacity: 0.7,
                  }}
                >
                  {card.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Order Terbaru */}
          <div className="bg-white rounded-2xl p-5 border border-garis">
            <h3 className="font-semibold text-teks mb-4">
              Order Terbaru
            </h3>

            <div className="space-y-3">
              {[
                {
                  name: "Siti Rahayu",
                  menu: "Paket Premium",
                  status: "Selesai",
                  bg: "#D1FAE5",
                  color: "#065F46",
                },

                {
                  name: "Budi Santoso",
                  menu: "Snack Box",
                  status: "Diproses",
                  bg: "#DBEAFE",
                  color: "#1E40AF",
                },

                {
                  name: "Dewi Lestari",
                  menu: "Paket Harian",
                  status: "Pending",
                  bg: "#FEF3C7",
                  color: "#92400E",
                },

                {
                  name: "Ahmad Fauzi",
                  menu: "Cookies Box",
                  status: "Selesai",
                  bg: "#D1FAE5",
                  color: "#065F46",
                },
              ].map((order, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                      {order.name[0]}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-teks">
                        {order.name}
                      </p>

                      <p className="text-xs text-teks-samping">
                        {order.menu}
                      </p>
                    </div>
                  </div>

                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: order.bg,
                      color: order.color,
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kanan */}
        <div className="space-y-4">
          {/* Recent Activity */}
          <div
            className="rounded-2xl p-5 text-white"
            style={{ backgroundColor: "#1e2d6b" }}
          >
            <h3 className="font-semibold mb-4">
              Recent Activity
            </h3>

            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-3 border-b border-white/10 last:border-0"
                >
                  <span className="text-base mt-0.5">
                    {item.icon}
                  </span>

                  <div>
                    <p className="text-xs font-medium text-white/90">
                      {item.text}
                    </p>

                    <p className="text-xs text-white/50 mt-0.5">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-2xl p-5 border border-garis">
            <h3 className="font-semibold text-teks mb-1">
              Tasks
            </h3>

            <p className="text-xs text-teks-samping mb-4">
              Priority
            </p>

            <div className="space-y-2">
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl border"
                  style={{
                    backgroundColor: task.color,
                    borderColor: task.border + "40",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {task.icon}
                    </span>

                    <div>
                      <p className="text-xs font-medium text-teks">
                        {task.text}
                      </p>

                      <p className="text-xs text-teks-samping">
                        {task.time}
                      </p>
                    </div>
                  </div>

                  <span className="text-teks-samping text-xs">
                    ›
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}