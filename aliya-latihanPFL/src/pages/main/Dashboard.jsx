import ActivityFeed from "../../components/ui/ActivityFeed";
import Avatar from "../../components/ui/Avatar";
import PageHeader from "../../components/ui/PageHeader";

// ── Data ─────────────────────────────────────────────────────────────────────

const statCards = [
  { label: "Total Orders",    value: "75",  sub: "12 order baru", bg: "#FEF3C7", color: "#92400E" },
  { label: "Total Delivered", value: "175", sub: "Tepat waktu",   bg: "#FCE7F3", color: "#9D174D" },
  { label: "Total Canceled",  value: "40",  sub: "Turun 5%",      bg: "#EDE9FE", color: "#5B21B6" },
];

const recentActivity = [
  { icon: "🛒", text: "Order baru dari Siti Rahayu",   time: "Hari ini, 10.30 AM" },
  { icon: "✅", text: "Paket Premium dikirim ke Budi", time: "Hari ini, 10.00 AM" },
  { icon: "🎁", text: "Promo VIP Cashback diaktifkan", time: "Kemarin, 01.00 PM" },
];

const tasks = [
  { bg: "#FEE2E2", border: "#EF4444", icon: "🔴", text: "Order Pending belum diproses",    time: "Hari ini, 09.00 AM" },
  { bg: "#FEF3C7", border: "#F59E0B", icon: "⚠️", text: "Stok Paket Harian hampir habis", time: "Hari ini, 09.00 AM" },
  { bg: "#F9FAFB", border: "#E5E7EB", icon: "📦", text: "Cek pengiriman order #ORD-028",   time: "Besok, 08.00 AM" },
];

const todayOrders = [
  { name: "Siti Rahayu",  menu: "Paket Premium", time: "10:30", status: "Selesai",  statusBg: "#D1FAE5", statusColor: "#065F46" },
  { name: "Budi Santoso", menu: "Snack Box",      time: "11:00", status: "Diproses", statusBg: "#DBEAFE", statusColor: "#1E40AF" },
  { name: "Dewi Lestari", menu: "Paket Harian",   time: "11:45", status: "Pending",  statusBg: "#FEF3C7", statusColor: "#92400E" },
  { name: "Ahmad Fauzi",  menu: "Cookies Box",    time: "12:15", status: "Selesai",  statusBg: "#D1FAE5", statusColor: "#065F46" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" breadcrumb="Dashboard" />

      <div className="grid md:grid-cols-3 gap-4 px-4">

        {/* ── KIRI (col-span-2) ─────────────────────────────────────────── */}
        <div className="md:col-span-2 space-y-4">

          {/* 3 Pastel Stat Cards */}
          <div className="grid grid-cols-3 gap-3">
            {statCards.map((card, i) => (
              <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: card.bg }}>
                <p className="text-xs font-medium mb-2" style={{ color: card.color }}>
                  {card.label}
                </p>
                <p className="text-3xl font-bold" style={{ color: card.color }}>
                  {card.value}
                </p>
                <p className="text-xs mt-1" style={{ color: card.color, opacity: 0.7 }}>
                  {card.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Order Terbaru */}
          <div className="bg-white rounded-2xl p-5 border border-garis">
            <h3 className="font-semibold text-teks mb-4">Order Terbaru</h3>
            <div className="space-y-2">
              {todayOrders.map((order, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl border border-garis"
                  style={{ backgroundColor: order.statusBg + "33" }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={order.name} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-teks">{order.name}</p>
                      <p className="text-xs text-teks-samping">{order.menu}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-teks-samping hidden sm:block">{order.time}</span>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ backgroundColor: order.statusBg, color: order.statusColor }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── KANAN ─────────────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Recent Activity */}
          <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: "#1e2d6b" }}>
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <ActivityFeed items={recentActivity} dark />
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-2xl p-5 border border-garis">
            <h3 className="font-semibold text-teks mb-1">Tasks</h3>
            <p className="text-xs text-teks-samping mb-3">Priority</p>
            <div className="space-y-2">
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl border"
                  style={{ backgroundColor: task.bg, borderColor: task.border + "40" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{task.icon}</span>
                    <div>
                      <p className="text-xs font-medium text-teks">{task.text}</p>
                      <p className="text-xs text-teks-samping">{task.time}</p>
                    </div>
                  </div>
                  <span className="text-teks-samping text-sm">›</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
