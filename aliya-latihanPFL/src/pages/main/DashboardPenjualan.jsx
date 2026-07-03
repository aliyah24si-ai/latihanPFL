import PageHeader from "../../components/ui/PageHeader";
import Avatar from "../../components/ui/Avatar";
import ActivityFeed from "../../components/ui/ActivityFeed";
import BarChart from "../../components/ui/BarChart";
import DonutChart from "../../components/ui/DonutChart";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import ordersData from "../../data/orders.json";

// ── Hitung data dari orders.json ──────────────────────────────────────────────

const completed = ordersData.filter((o) => o.status === "Completed").length;
const pending   = ordersData.filter((o) => o.status === "Pending").length;
const cancelled = ordersData.filter((o) => o.status === "Cancelled").length;
const totalRevenue = ordersData
  .filter((o) => o.status === "Completed")
  .reduce((sum, o) => sum + o.totalPrice, 0);

// Bar chart: penjualan per hari (7 hari terakhir dari data)
const last7 = ordersData.slice(-14);
const dayMap = {};
last7.forEach((o) => {
  const d = new Date(o.orderDate);
  const label = d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
  if (!dayMap[label]) dayMap[label] = 0;
  if (o.status === "Completed") dayMap[label] += o.totalPrice;
});
const salesChartData = Object.entries(dayMap).map(([label, value]) => ({ label, value }));

// Donut: status order
const donutData = [
  { label: "Selesai",   value: completed, color: "#22C55E" },
  { label: "Pending",   value: pending,   color: "#F59E0B" },
  { label: "Dibatalkan",value: cancelled, color: "#EF4444" },
];

// ── Static data ───────────────────────────────────────────────────────────────

const statCards = [
  {
    label: "Total Orders",
    value: ordersData.length,
    sub: `${pending} order pending`,
    bg: "#FEF3C7", color: "#92400E",
  },
  {
    label: "Total Delivered",
    value: completed,
    sub: "Tepat waktu",
    bg: "#D1FAE5", color: "#065F46",
  },
  {
    label: "Total Canceled",
    value: cancelled,
    sub: "Turun 5% minggu ini",
    bg: "#FEE2E2", color: "#991B1B",
  },
  {
    label: "Total Revenue",
    value: `Rp ${(totalRevenue / 1000).toFixed(0)}rb`,
    sub: "Dari order completed",
    bg: "#EDE9FE", color: "#5B21B6",
  },
];

const recentActivity = [
  { icon: "🛒", text: "Order baru dari Siti Rahayu",      time: "Hari ini, 10.30 AM" },
  { icon: "✅", text: "Paket Premium dikirim ke Budi",    time: "Hari ini, 10.00 AM" },
  { icon: "🎁", text: "Promo VIP Cashback diaktifkan",    time: "Kemarin, 01.00 PM" },
  { icon: "📦", text: "Order #ORD-028 siap kirim",        time: "Kemarin, 09.30 AM" },
  { icon: "❌", text: "Order #ORD-031 dibatalkan",        time: "Kemarin, 08.00 AM" },
];

const todayOrders = [
  { name: "Siti Rahayu",  menu: "Paket Premium", time: "10:30", status: "Selesai",  statusBg: "#D1FAE5", statusColor: "#065F46" },
  { name: "Budi Santoso", menu: "Snack Box",      time: "11:00", status: "Diproses", statusBg: "#DBEAFE", statusColor: "#1E40AF" },
  { name: "Dewi Lestari", menu: "Paket Harian",   time: "11:45", status: "Pending",  statusBg: "#FEF3C7", statusColor: "#92400E" },
  { name: "Ahmad Fauzi",  menu: "Cookies Box",    time: "12:15", status: "Selesai",  statusBg: "#D1FAE5", statusColor: "#065F46" },
];

const tasks = [
  { bg: "#FEE2E2", border: "#EF4444", icon: "🔴", text: "Order Pending belum diproses",   time: "Hari ini, 09.00 AM" },
  { bg: "#FEF3C7", border: "#F59E0B", icon: "⚠️", text: "Stok Paket Harian hampir habis", time: "Hari ini, 09.00 AM" },
  { bg: "#F9FAFB", border: "#E5E7EB", icon: "📦", text: "Cek pengiriman order #ORD-028",  time: "Besok, 08.00 AM" },
  { bg: "#EDE9FE", border: "#8B5CF6", icon: "🎁", text: "Aktifkan promo akhir bulan",     time: "Besok, 10.00 AM" },
  { bg: "#DBEAFE", border: "#3B82F6", icon: "📊", text: "Buat laporan mingguan",          time: "Jumat, 08.00 AM" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function DashboardPenjualan() {
  return (
    <div>
      <PageHeader title="Dashboard Penjualan" breadcrumb="Dashboard Penjualan" />

      <div className="space-y-4 px-4">

        {/* ── 4 Stat Cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((card, i) => (
            <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: card.bg }}>
              <p className="text-xs font-medium mb-2" style={{ color: card.color }}>
                {card.label}
              </p>
              <p className="text-2xl font-bold" style={{ color: card.color }}>
                {card.value}
              </p>
              <p className="text-xs mt-1" style={{ color: card.color, opacity: 0.7 }}>
                {card.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── Row 2: BarChart + DonutChart ─────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-4">

          {/* Bar Chart Penjualan */}
          <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-garis">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-teks">Penjualan per Hari</h3>
                <p className="text-xs text-teks-samping mt-0.5">14 hari terakhir (order selesai)</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-green-50 text-green-700">
                Rp {(totalRevenue / 1000000).toFixed(1)}jt total
              </span>
            </div>
            <BarChart
              data={salesChartData}
              height={180}
              formatValue={(v) => `${(v / 1000).toFixed(0)}rb`}
              activeIndex={salesChartData.length - 1}
            />
          </div>

          {/* Donut Chart Status */}
          <div className="bg-white rounded-2xl p-5 border border-garis flex flex-col">
            <h3 className="font-semibold text-teks mb-1">Status Order</h3>
            <p className="text-xs text-teks-samping mb-4">Distribusi seluruh order</p>
            <div className="flex-1 flex items-center justify-center">
              <DonutChart
                data={donutData}
                size={150}
                strokeWidth={22}
              />
            </div>
          </div>
        </div>

        {/* ── Row 3: Order Terbaru + Activity + Tasks ──────────────────── */}
        <div className="grid md:grid-cols-3 gap-4">

          {/* Order Terbaru */}
          <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-garis">
            <h3 className="font-semibold text-teks mb-4">Order Terbaru Hari Ini</h3>
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

          {/* Kolom kanan: Activity + Tasks */}
          <div className="space-y-4">

            {/* Recent Activity */}
            <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: "#1e2d6b" }}>
              <h3 className="font-semibold mb-1">Recent Activity</h3>
              <p className="text-xs text-white/50 mb-3">Update terbaru penjualan</p>
              <Separator className="bg-white/10 mb-3" />
              <ScrollArea className="h-[130px]">
                <ActivityFeed items={recentActivity} dark />
              </ScrollArea>
            </div>

            {/* Tasks */}
            <div className="bg-white rounded-2xl p-5 border border-garis">
              <h3 className="font-semibold text-teks mb-1">Tasks</h3>
              <p className="text-xs text-teks-samping mb-2">Priority</p>
              <Separator className="mb-3" />
              <ScrollArea className="h-[160px]">
                <div className="space-y-2 pr-2">
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
              </ScrollArea>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
