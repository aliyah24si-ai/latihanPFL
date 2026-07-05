import { useState, useEffect } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Avatar from "../../components/ui/Avatar";
import ActivityFeed from "../../components/ui/ActivityFeed";
import BarChart from "../../components/ui/BarChart";
import DonutChart from "../../components/ui/DonutChart";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { ImSpinner2 } from "react-icons/im";
import { supabase } from "../../services/supabaseClient";

export default function DashboardPenjualan() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => { setOrders(data || []); })
      .finally(() => setLoading(false));
  }, []);

  // ── Hitung dari data Supabase ─────────────────────────────────────────────
  const completed = orders.filter(o => o.status === "Completed").length;
  const pending   = orders.filter(o => o.status === "Pending").length;
  const cancelled = orders.filter(o => o.status === "Cancelled").length;
  const totalRevenue = orders
    .filter(o => o.status === "Completed")
    .reduce((sum, o) => sum + (Number(o.total_price) || 0), 0);

  // Bar chart: penjualan per hari (7 hari terakhir)
  const dayMap = {};
  orders.slice(0, 14).forEach(o => {
    const d = new Date(o.created_at);
    const label = d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
    if (!dayMap[label]) dayMap[label] = 0;
    if (o.status === "Completed") dayMap[label] += Number(o.total_price) || 0;
  });
  const salesChartData = Object.entries(dayMap).reverse().map(([label, value]) => ({ label, value }));

  // Donut: status order
  const donutData = [
    { label: "Selesai",    value: completed || 0, color: "#22C55E" },
    { label: "Pending",    value: pending   || 0, color: "#F59E0B" },
    { label: "Dibatalkan", value: cancelled || 0, color: "#EF4444" },
  ];

  const statCards = [
    { label: "Total Orders",    value: orders.length, sub: `${pending} order pending`, bg: "#FEF3C7", color: "#92400E" },
    { label: "Total Completed", value: completed,      sub: "Order selesai",            bg: "#D1FAE5", color: "#065F46" },
    { label: "Total Cancelled", value: cancelled,      sub: "Order dibatalkan",         bg: "#FEE2E2", color: "#991B1B" },
    { label: "Total Revenue",   value: `Rp ${(totalRevenue/1000).toFixed(0)}rb`, sub: "Dari order completed", bg: "#EDE9FE", color: "#5B21B6" },
  ];

  // 5 order terbaru
  const recentOrders = orders.slice(0, 5);

  const tasks = [
    { bg: "#FEE2E2", border: "#EF4444", icon: "🔴", text: `${pending} Order Pending belum diproses`,    time: "Perlu tindakan" },
    { bg: "#FEF3C7", border: "#F59E0B", icon: "⚠️", text: "Stok Paket Harian hampir habis",              time: "Segera" },
    { bg: "#EDE9FE", border: "#8B5CF6", icon: "🎁", text: "Cek promo yang akan berakhir",                time: "Minggu ini" },
    { bg: "#DBEAFE", border: "#3B82F6", icon: "📊", text: "Update status order yang selesai",            time: "Hari ini" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <ImSpinner2 className="animate-spin text-3xl" style={{ color: "#1e2d6b" }} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Dashboard Penjualan" breadcrumb="Dashboard Penjualan" />
      <div className="space-y-4 px-4">

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((card, i) => (
            <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: card.bg }}>
              <p className="text-xs font-medium mb-2" style={{ color: card.color }}>{card.label}</p>
              <p className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</p>
              <p className="text-xs mt-1" style={{ color: card.color, opacity: 0.7 }}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Bar Chart + Donut */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-garis">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-teks">Penjualan per Hari</h3>
                <p className="text-xs text-teks-samping mt-0.5">Dari order yang selesai</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-green-50 text-green-700">
                Rp {(totalRevenue / 1000000).toFixed(1)}jt total
              </span>
            </div>
            {salesChartData.length > 0 ? (
              <BarChart data={salesChartData} height={180}
                formatValue={(v) => `${(v / 1000).toFixed(0)}rb`}
                activeIndex={salesChartData.length - 1} />
            ) : (
              <div className="flex items-center justify-center h-[180px] text-gray-400 text-sm">
                Belum ada data penjualan
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 border border-garis flex flex-col">
            <h3 className="font-semibold text-teks mb-1">Status Order</h3>
            <p className="text-xs text-teks-samping mb-4">Distribusi seluruh order</p>
            <div className="flex-1 flex items-center justify-center">
              <DonutChart data={donutData} size={150} strokeWidth={22} />
            </div>
          </div>
        </div>

        {/* Order Terbaru + Tasks */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-garis">
            <h3 className="font-semibold text-teks mb-4">Order Terbaru</h3>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">Belum ada order masuk.</p>
            ) : (
              <div className="space-y-2">
                {recentOrders.map((order, i) => {
                  const statusBg    = order.status === "Completed" ? "#D1FAE5" : order.status === "Cancelled" ? "#FEE2E2" : "#FEF3C7";
                  const statusColor = order.status === "Completed" ? "#065F46" : order.status === "Cancelled" ? "#991B1B" : "#92400E";
                  return (
                    <div key={i}
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl border border-garis"
                      style={{ backgroundColor: statusBg + "33" }}>
                      <div className="flex items-center gap-3">
                        <Avatar name={order.customer_name || "?"} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-teks">{order.customer_name}</p>
                          <p className="text-xs text-teks-samping">{order.menu_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-teks-samping hidden sm:block">
                          Rp {Number(order.total_price).toLocaleString("id-ID")}
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                          style={{ backgroundColor: statusBg, color: statusColor }}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: "#1e2d6b" }}>
              <h3 className="font-semibold mb-1">Recent Activity</h3>
              <p className="text-xs text-white/50 mb-3">Order terbaru</p>
              <Separator className="bg-white/10 mb-3" />
              <ScrollArea className="h-[130px]">
                <ActivityFeed items={recentOrders.map(o => ({
                  icon: o.status === "Completed" ? "✅" : o.status === "Cancelled" ? "❌" : "🛒",
                  text: `${o.customer_name} — ${o.menu_name}`,
                  time: new Date(o.created_at).toLocaleDateString("id-ID"),
                }))} dark />
              </ScrollArea>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-garis">
              <h3 className="font-semibold text-teks mb-1">Tasks</h3>
              <Separator className="mb-3" />
              <ScrollArea className="h-[160px]">
                <div className="space-y-2 pr-2">
                  {tasks.map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border"
                      style={{ backgroundColor: task.bg, borderColor: task.border + "40" }}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{task.icon}</span>
                        <div>
                          <p className="text-xs font-medium text-teks">{task.text}</p>
                          <p className="text-xs text-teks-samping">{task.time}</p>
                        </div>
                      </div>
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
