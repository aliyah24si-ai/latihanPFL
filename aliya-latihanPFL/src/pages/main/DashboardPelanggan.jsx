import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import StatCard from "../../components/ui/StatCard";
import DonutChart from "../../components/ui/DonutChart";
import BarChart from "../../components/ui/BarChart";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import customersData from "../../data/customers.json";
import ordersData from "../../data/orders.json";

const loyaltyBadge = { Gold: "gold", Silver: "silver", Bronze: "bronze" };
const loyaltyEmoji = { Gold: "🥇", Silver: "🥈", Bronze: "🥉" };

// ── Hitung data ───────────────────────────────────────────────────────────────

const gold   = customersData.filter((c) => c.loyalty === "Gold").length;
const silver = customersData.filter((c) => c.loyalty === "Silver").length;
const bronze = customersData.filter((c) => c.loyalty === "Bronze").length;

// Donut chart distribusi loyalty
const donutData = [
  { label: "Gold",   value: gold,   color: "#F59E0B" },
  { label: "Silver", value: silver, color: "#9CA3AF" },
  { label: "Bronze", value: bronze, color: "#92400E" },
];

// Bar chart: jumlah customer per loyalty
const loyaltyBarData = [
  { label: "Gold",   value: gold   },
  { label: "Silver", value: silver },
  { label: "Bronze", value: bronze },
];

// Bar chart: order per customer (top 6)
const orderCountMap = {};
ordersData.forEach((o) => {
  const name = o.customerName.split(" ")[0]; // nama depan saja biar muat
  orderCountMap[name] = (orderCountMap[name] || 0) + 1;
});
const topCustomers = Object.entries(orderCountMap)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 6)
  .map(([label, value]) => ({ label, value }));

const recentActivity = [
  { icon: "👤", text: "Customer baru: Dewi Lestari",         time: "Kemarin, 11.00 AM" },
  { icon: "🥇", text: "Budi naik ke level Gold",             time: "Kemarin, 09.00 AM" },
  { icon: "🛒", text: "Siti sudah order 10x bulan ini",      time: "2 hari lalu" },
  { icon: "📞", text: "Follow-up pelanggan tidak aktif",     time: "3 hari lalu" },
  { icon: "🎁", text: "Ahmad redeem promo VIP Cashback",     time: "3 hari lalu" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function DashboardPelanggan() {
  const [search, setSearch] = useState("");

  const recentCustomers = customersData.slice(0, 5);

  const filteredRecent = search
    ? customersData
        .filter(
          (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 5)
    : recentCustomers;

  return (
    <div>
      <PageHeader title="Dashboard Pelanggan" breadcrumb="Dashboard Pelanggan" />

      <div className="space-y-4 px-4">

        {/* ── 4 Stat Cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard variant="white" label="Total Pelanggan" value={customersData.length} icon="👥"
            sub="Terdaftar aktif" trend="+8 bulan ini" trendUp />
          <StatCard variant="white" label="Member Gold"   value={gold}   icon="🥇"
            sub="Level tertinggi" trend="+2 bulan ini" trendUp />
          <StatCard variant="white" label="Member Silver" value={silver} icon="🥈"
            sub="Level menengah" />
          <StatCard variant="white" label="Member Bronze" value={bronze} icon="🥉"
            sub="Level pemula" />
        </div>

        {/* ── Row 2: Donut Loyalty + Bar Top Customer ───────────────────── */}
        <div className="grid md:grid-cols-3 gap-4">

          {/* Donut Chart */}
          <div className="bg-white rounded-2xl p-5 border border-garis flex flex-col items-center">
            <h3 className="font-semibold text-teks mb-1 self-start">Distribusi Loyalty</h3>
            <p className="text-xs text-teks-samping mb-4 self-start">Komposisi level member</p>
            <DonutChart
              data={donutData}
              size={160}
              strokeWidth={24}
            />
          </div>

          {/* Bar Chart: Top Customer by Orders */}
          <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-garis">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-teks">Top Pelanggan</h3>
                <p className="text-xs text-teks-samping mt-0.5">Berdasarkan jumlah order</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-blue-50 text-blue-700">
                {ordersData.length} total order
              </span>
            </div>
            <BarChart
              data={topCustomers}
              height={170}
              colors={["#1e2d6b","#2d4499","#3B82F6","#8B5CF6","#F59E0B","#4CAF50"]}
              activeIndex={0}
            />
          </div>

        </div>

        {/* ── Row 3: Progress Bar Loyalty + Pelanggan Terbaru + Activity ── */}
        <div className="grid md:grid-cols-3 gap-4">

          {/* Kiri: Progress Bar + Ringkasan Bulan Ini */}
          <div className="space-y-4">

            {/* Distribusi Loyalty — progress bar */}
            <div className="bg-white rounded-2xl p-5 border border-garis">
              <h3 className="font-semibold text-teks mb-4">Detail Distribusi</h3>
              <div className="space-y-3">
                {[
                  { label: "Gold",   count: gold,   color: "#F59E0B", bg: "#FEF3C7" },
                  { label: "Silver", count: silver, color: "#6B7280", bg: "#F3F4F6" },
                  { label: "Bronze", count: bronze, color: "#92400E", bg: "#FEF3C7" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-teks">{loyaltyEmoji[item.label]} {item.label}</span>
                      <span className="text-teks-samping">
                        {item.count} ({customersData.length > 0
                          ? Math.round((item.count / customersData.length) * 100)
                          : 0}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: item.bg }}>
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: customersData.length > 0
                            ? `${(item.count / customersData.length) * 100}%`
                            : "0%",
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ringkasan Bulan Ini */}
            <div className="bg-white rounded-2xl p-5 border border-garis">
              <h3 className="font-semibold text-teks mb-3">Ringkasan Bulan Ini</h3>
              <Separator className="mb-3" />
              <div className="space-y-2">
                {[
                  { label: "Customer Baru",       value: "8",  icon: "🆕" },
                  { label: "Customer Aktif",       value: "42", icon: "✅" },
                  { label: "Customer Tidak Aktif", value: "5",  icon: "💤" },
                  { label: "Rata-rata Order",      value: "3x", icon: "📊" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.icon}</span>
                      <p className="text-xs font-medium text-teks">{item.label}</p>
                    </div>
                    <span className="text-sm font-bold text-navy">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tengah: Pelanggan Terbaru */}
          <div className="bg-white rounded-2xl p-5 border border-garis">
            <h3 className="font-semibold text-teks mb-3">Pelanggan Terbaru</h3>
            {/* Mini search */}
            <input
              type="text"
              placeholder="Cari pelanggan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-garis rounded-xl mb-3 outline-none focus:border-navy transition"
            />
            <div className="space-y-2">
              {filteredRecent.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl border border-garis bg-gray-50/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-teks">{c.name}</p>
                      <p className="text-xs text-teks-samping">{c.email}</p>
                    </div>
                  </div>
                  <Badge variant={loyaltyBadge[c.loyalty] || "default"}>
                    {loyaltyEmoji[c.loyalty]} {c.loyalty}
                  </Badge>
                </div>
              ))}
              {filteredRecent.length === 0 && (
                <p className="text-xs text-center text-teks-samping py-4">
                  Tidak ditemukan
                </p>
              )}
            </div>
          </div>

          {/* Kanan: Activity Panel */}
          <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: "#1e2d6b" }}>
            <h3 className="font-semibold mb-1">Aktivitas Pelanggan</h3>
            <p className="text-xs text-white/50 mb-3">Update terbaru</p>
            <Separator className="bg-white/10 mb-3" />
            <ScrollArea className="h-[260px]">
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="text-base">{item.icon}</span>
                    <div>
                      <p className="text-xs text-white/90 font-medium">{item.text}</p>
                      <p className="text-xs text-white/40 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Mini bar chart loyalty di dalam panel navy */}
            <Separator className="bg-white/10 my-4" />
            <p className="text-xs text-white/60 mb-3 font-semibold uppercase tracking-wide">
              Loyalty Overview
            </p>
            <div className="space-y-2">
              {[
                { label: "Gold",   count: gold,   color: "#F59E0B" },
                { label: "Silver", count: silver, color: "#D1D5DB" },
                { label: "Bronze", count: bronze, color: "#92400E" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-xs text-white/60 w-12">{item.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${(item.count / customersData.length) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  <span className="text-xs text-white/80 font-semibold w-4 text-right">
                    {item.count}
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
