import { useState, useEffect } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import StatCard from "../../components/ui/StatCard";
import DonutChart from "../../components/ui/DonutChart";
import BarChart from "../../components/ui/BarChart";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { ImSpinner2 } from "react-icons/im";
import { supabase } from "../../services/supabaseClient";

const loyaltyBadge = { Gold: "gold", Silver: "silver", Bronze: "bronze" };
const loyaltyEmoji = { Gold: "🥇", Silver: "🥈", Bronze: "🥉" };

export default function DashboardPelanggan() {
  const [members,  setMembers]  = useState([]);
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");

  useEffect(() => {
    Promise.all([
      supabase.from("members").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("customer_name, member_email, total_price, status, created_at").order("created_at", { ascending: false }),
    ]).then(([membersRes, ordersRes]) => {
      setMembers(membersRes.data || []);
      setOrders(ordersRes.data  || []);
    }).finally(() => setLoading(false));
  }, []);

  // ── Hitung dari data Supabase ─────────────────────────────────────────────
  const gold   = members.filter(m => m.loyalty === "Gold").length;
  const silver = members.filter(m => m.loyalty === "Silver").length;
  const bronze = members.filter(m => m.loyalty === "Bronze").length;

  const donutData = [
    { label: "Gold",   value: gold   || 0, color: "#F59E0B" },
    { label: "Silver", value: silver || 0, color: "#9CA3AF" },
    { label: "Bronze", value: bronze || 0, color: "#92400E" },
  ];

  // Top members by total_orders
  const topMembers = [...members]
    .sort((a, b) => (b.total_orders || 0) - (a.total_orders || 0))
    .slice(0, 6)
    .map(m => ({ label: m.full_name?.split(" ")[0] || "?", value: m.total_orders || 0 }));

  const recentMembers = members.slice(0, 5);
  const filteredMembers = search
    ? members.filter(m =>
        m.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        m.email?.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 5)
    : recentMembers;

  const recentActivity = members.slice(0, 5).map(m => ({
    icon: m.loyalty === "Gold" ? "🥇" : m.loyalty === "Silver" ? "🥈" : "👤",
    text: `${m.full_name} bergabung sebagai ${m.loyalty}`,
    time: new Date(m.created_at).toLocaleDateString("id-ID"),
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <ImSpinner2 className="animate-spin text-3xl" style={{ color: "#1e2d6b" }} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Dashboard Pelanggan" breadcrumb="Dashboard Pelanggan" />
      <div className="space-y-4 px-4">

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard variant="white" label="Total Member" value={members.length} icon="👥" sub="Terdaftar" />
          <StatCard variant="white" label="Member Gold"   value={gold}   icon="🥇" sub="Level tertinggi" />
          <StatCard variant="white" label="Member Silver" value={silver} icon="🥈" sub="Level menengah" />
          <StatCard variant="white" label="Member Bronze" value={bronze} icon="🥉" sub="Level pemula" />
        </div>

        {/* Donut + Bar Top Member */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-garis flex flex-col items-center">
            <h3 className="font-semibold text-teks mb-1 self-start">Distribusi Loyalty</h3>
            <p className="text-xs text-teks-samping mb-4 self-start">Komposisi level member</p>
            {members.length > 0 ? (
              <DonutChart data={donutData} size={160} strokeWidth={24} />
            ) : (
              <div className="flex items-center justify-center h-40 text-gray-400 text-sm">Belum ada member</div>
            )}
          </div>

          <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-garis">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-teks">Top Member</h3>
                <p className="text-xs text-teks-samping mt-0.5">Berdasarkan jumlah order</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-blue-50 text-blue-700">
                {orders.length} total order
              </span>
            </div>
            {topMembers.length > 0 ? (
              <BarChart data={topMembers} height={170}
                colors={["#1e2d6b","#2d4499","#3B82F6","#8B5CF6","#F59E0B","#4CAF50"]}
                activeIndex={0} />
            ) : (
              <div className="flex items-center justify-center h-[170px] text-gray-400 text-sm">Belum ada data</div>
            )}
          </div>
        </div>

        {/* Progress Bar + Daftar Member + Activity */}
        <div className="grid md:grid-cols-3 gap-4">

          {/* Detail Distribusi */}
          <div className="space-y-4">
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
                        {item.count} ({members.length > 0 ? Math.round((item.count / members.length) * 100) : 0}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: item.bg }}>
                      <div className="h-2 rounded-full transition-all duration-500"
                        style={{ width: members.length > 0 ? `${(item.count / members.length) * 100}%` : "0%", backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-garis">
              <h3 className="font-semibold text-teks mb-3">Ringkasan</h3>
              <Separator className="mb-3" />
              <div className="space-y-2">
                {[
                  { label: "Total Member",   value: members.length,                                      icon: "👥" },
                  { label: "Punya Order",    value: members.filter(m => (m.total_orders || 0) > 0).length, icon: "✅" },
                  { label: "Belum Order",    value: members.filter(m => (m.total_orders || 0) === 0).length, icon: "💤" },
                  { label: "Total Order",    value: orders.length + "x",                                 icon: "📊" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.icon}</span>
                      <p className="text-xs font-medium text-teks">{item.label}</p>
                    </div>
                    <span className="text-sm font-bold" style={{ color: "#1e2d6b" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daftar Member Terbaru */}
          <div className="bg-white rounded-2xl p-5 border border-garis">
            <h3 className="font-semibold text-teks mb-3">Member Terbaru</h3>
            <input type="text" placeholder="Cari member..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-garis rounded-xl mb-3 outline-none focus:border-navy transition" />
            <div className="space-y-2">
              {filteredMembers.length === 0 ? (
                <p className="text-xs text-center text-teks-samping py-4">Tidak ditemukan</p>
              ) : filteredMembers.map((m, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-xl border border-garis bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <Avatar name={m.full_name || "?"} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-teks">{m.full_name}</p>
                      <p className="text-xs text-teks-samping">{m.email}</p>
                    </div>
                  </div>
                  <Badge variant={loyaltyBadge[m.loyalty] || "default"}>
                    {loyaltyEmoji[m.loyalty] || "👤"} {m.loyalty || "Bronze"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Panel */}
          <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: "#1e2d6b" }}>
            <h3 className="font-semibold mb-1">Aktivitas Member</h3>
            <p className="text-xs text-white/50 mb-3">Member terbaru bergabung</p>
            <Separator className="bg-white/10 mb-3" />
            <ScrollArea className="h-[200px]">
              <div className="space-y-3">
                {recentActivity.length === 0 ? (
                  <p className="text-xs text-white/40 text-center">Belum ada aktivitas</p>
                ) : recentActivity.map((item, i) => (
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

            <Separator className="bg-white/10 my-4" />
            <p className="text-xs text-white/60 mb-3 font-semibold uppercase tracking-wide">Loyalty Overview</p>
            <div className="space-y-2">
              {[
                { label: "Gold",   count: gold,   color: "#F59E0B" },
                { label: "Silver", count: silver, color: "#D1D5DB" },
                { label: "Bronze", count: bronze, color: "#D97706" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-xs text-white/60 w-12">{item.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/10">
                    <div className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: members.length > 0 ? `${(item.count / members.length) * 100}%` : "0%", backgroundColor: item.color }} />
                  </div>
                  <span className="text-xs text-white/80 font-semibold w-4 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
