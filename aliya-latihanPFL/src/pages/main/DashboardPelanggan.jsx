import { useState, useEffect } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import StatCard from "../../components/ui/StatCard";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import customersData from "../../data/customers.json";

const loyaltyBadge = { Gold: "gold", Silver: "silver", Bronze: "bronze" };
const loyaltyEmoji = { Gold: "🥇", Silver: "🥈", Bronze: "🥉" };

const recentActivity = [
  { icon: "👤", text: "Customer baru: Dewi Lestari",         time: "Kemarin, 11.00 AM" },
  { icon: "🥇", text: "Budi naik ke level Gold",             time: "Kemarin, 09.00 AM" },
  { icon: "🛒", text: "Siti sudah order 10x bulan ini",      time: "2 hari lalu" },
  { icon: "📞", text: "Follow-up pelanggan tidak aktif",     time: "3 hari lalu" },
  { icon: "🎁", text: "Ahmad redeem promo VIP Cashback",     time: "3 hari lalu" },
];

export default function DashboardPelanggan() {
  const [customers] = useState(customersData);

  const gold   = customers.filter((c) => c.loyalty === "Gold").length;
  const silver = customers.filter((c) => c.loyalty === "Silver").length;
  const bronze = customers.filter((c) => c.loyalty === "Bronze").length;

  // 5 pelanggan terbaru
  const recentCustomers = customers.slice(0, 5);

  return (
    <div>
      <PageHeader title="Dashboard Pelanggan" breadcrumb="Dashboard Pelanggan" />

      <div className="grid md:grid-cols-3 gap-4 px-4">

        {/* ── KIRI ─────────────────────────────────────────────────────── */}
        <div className="md:col-span-2 space-y-4">

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard variant="white" label="Total Pelanggan" value={customers.length} icon="👥" />
            <StatCard variant="white" label="Gold" value={gold}   icon="🥇" />
            <StatCard variant="white" label="Silver" value={silver} icon="🥈" />
            <StatCard variant="white" label="Bronze" value={bronze} icon="🥉" />
          </div>

          {/* Distribusi Loyalty */}
          <div className="bg-white rounded-2xl p-5 border border-garis">
            <h3 className="font-semibold text-teks mb-4">Distribusi Loyalty</h3>
            <div className="space-y-3">
              {[
                { label: "Gold",   count: gold,   total: customers.length, color: "#F59E0B", bg: "#FEF3C7" },
                { label: "Silver", count: silver, total: customers.length, color: "#6B7280", bg: "#F3F4F6" },
                { label: "Bronze", count: bronze, total: customers.length, color: "#92400E", bg: "#FEF3C7" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-teks">{item.label}</span>
                    <span className="text-teks-samping">
                      {item.count} ({customers.length > 0 ? Math.round((item.count / customers.length) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: item.bg }}>
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: customers.length > 0 ? `${(item.count / customers.length) * 100}%` : "0%",
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pelanggan Terbaru */}
          <div className="bg-white rounded-2xl p-5 border border-garis">
            <h3 className="font-semibold text-teks mb-4">Pelanggan Terbaru</h3>
            <div className="space-y-2">
              {recentCustomers.map((c, i) => (
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
            </div>
          </div>
        </div>

        {/* ── KANAN ─────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Activity pelanggan */}
          <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: "#1e2d6b" }}>
            <h3 className="font-semibold mb-1">Aktivitas Pelanggan</h3>
            <p className="text-xs text-white/50 mb-3">Update terbaru</p>
            <Separator className="bg-white/10 mb-3" />
            <ScrollArea className="h-[220px]">
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
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-5 border border-garis">
            <h3 className="font-semibold text-teks mb-3">Ringkasan Bulan Ini</h3>
            <Separator className="mb-3" />
            <div className="space-y-2">
              {[
                { label: "Customer Baru",       value: "8",   icon: "🆕" },
                { label: "Customer Aktif",       value: "42",  icon: "✅" },
                { label: "Customer Tidak Aktif", value: "5",   icon: "💤" },
                { label: "Rata-rata Order",      value: "3x",  icon: "📊" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                >
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
      </div>
    </div>
  );
}
