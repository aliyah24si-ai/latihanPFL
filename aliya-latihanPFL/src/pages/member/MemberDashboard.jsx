import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { membersAPI } from "../../services/membersAPI";
import { feedbackAPI } from "../../services/feedbackAPI";
import { ImSpinner2 } from "react-icons/im";
import {
  FaStar, FaSignOutAlt, FaShoppingBag, FaTrophy,
  FaGift, FaHome, FaCheckCircle, FaBars, FaTimes,
  FaCommentDots, FaTag,
} from "react-icons/fa";
import Badge   from "../../components/ui/Badge";
import Alert   from "../../components/ui/Alert";
import Avatar  from "../../components/ui/Avatar";
import Card    from "../../components/ui/Card";

const NAVY = "#1e2d6b";

const loyaltyInfo = {
  Bronze: { emoji: "🥉", next: "Silver", needOrders: 5,  badgeVariant: "bronze" },
  Silver: { emoji: "🥈", next: "Gold",   needOrders: 10, badgeVariant: "silver" },
  Gold:   { emoji: "🥇", next: null,     needOrders: null, badgeVariant: "gold" },
};

const promos = [
  { name: "Diskon Paket Harian 15%",   target: "Bronze+", expiry: "30 Juni 2025",    emoji: "🎉", color: "success" },
  { name: "Free Ongkir",               target: "Silver+", expiry: "31 Juli 2025",    emoji: "🚚", color: "info"    },
  { name: "VIP Cashback 20%",          target: "Gold",    expiry: "31 Juli 2025",    emoji: "💎", color: "gold"    },
  { name: "Diskon 10% Semua Member",   target: "Semua",   expiry: "31 Agustus 2025", emoji: "🌟", color: "warning" },
];

const statusStyle = {
  Pending:   { label: "⏳ Pending",    badge: "warning" },
  Completed: { label: "✅ Selesai",    badge: "success" },
  Cancelled: { label: "❌ Dibatalkan", badge: "danger"  },
};

const navItems = [
  { key: "overview",  label: "Beranda",  icon: <FaHome /> },
  { key: "orders",    label: "Pesanan",  icon: <FaShoppingBag /> },
  { key: "promo",     label: "Promo",    icon: <FaTag /> },
  { key: "feedback",  label: "Feedback", icon: <FaCommentDots /> },
];

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [member,      setMember]      = useState(null);
  const [orders,      setOrders]      = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [activeNav,   setActiveNav]   = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [fbForm,    setFbForm]    = useState({ rating: 5, message: "" });
  const [fbLoading, setFbLoading] = useState(false);
  const [fbSuccess, setFbSuccess] = useState("");
  const [fbError,   setFbError]   = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session) { navigate("/member/login"); return; }
        try {
          let profile;
          try {
            profile = await membersAPI.getProfile(session.user.id);
          } catch {
            profile = {
              id: session.user.id,
              full_name: session.user.user_metadata?.full_name || session.user.email,
              email: session.user.email,
              phone: "-",
              loyalty: "Bronze",
              total_orders: 0,
            };
          }
          setMember(profile);
          try {
            const myOrders = await membersAPI.getMyOrders(profile.email);
            setOrders(myOrders || []);
          } catch { setOrders([]); }
        } catch (err) {
          setError("Gagal memuat profil: " + err.message);
        } finally {
          setLoading(false);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await membersAPI.logout();
    navigate("/member/login");
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    setFbLoading(true); setFbError(""); setFbSuccess("");
    try {
      await feedbackAPI.submit({
        member_name:  member.full_name,
        member_email: member.email,
        rating:       fbForm.rating,
        message:      fbForm.message,
      });
      setFbSuccess("Terima kasih! Feedback kamu sedang ditinjau admin.");
      setFbForm({ rating: 5, message: "" });
    } catch (err) {
      setFbError("Gagal: " + err.message);
    } finally {
      setFbLoading(false);
    }
  };

  const handleNavClick = (key) => {
    setActiveNav(key);
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ImSpinner2 className="animate-spin text-3xl" style={{ color: NAVY }} />
      </div>
    );
  }

  const info        = loyaltyInfo[member?.loyalty] || loyaltyInfo.Bronze;
  const totalOrders = member?.total_orders || 0;
  const progress    = info.next ? Math.min((totalOrders / info.needOrders) * 100, 100) : 100;
  const completed   = orders.filter(o => o.status === "Completed").length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 shadow-sm"
        style={{ backgroundColor: NAVY }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-white/80 hover:text-white p-1">
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 shrink-0">
              <div className="absolute top-0 left-0 w-4 h-4 rounded-md bg-green-400 opacity-90" />
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-md bg-white/20" />
            </div>
            <span className="font-bold text-white text-sm">Yummy Member</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/guest" className="text-white/60 hover:text-white text-xs flex items-center gap-1">
            <FaHome className="text-xs" /> <span className="hidden sm:inline">Menu</span>
          </Link>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-red-300 hover:text-red-100 font-medium">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-1 relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Sidebar ── */}
        <aside className={`fixed md:sticky top-0 md:top-[52px] left-0 z-40 h-full md:h-[calc(100vh-52px)] w-64 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
          style={{ backgroundColor: NAVY }}>

          {/* Profil member */}
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Avatar name={member?.full_name || "?"} size="lg" />
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">{member?.full_name}</p>
                <p className="text-white/50 text-xs truncate">{member?.email}</p>
              </div>
            </div>
            {/* Loyalty */}
            <div className="rounded-xl p-3" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-xs">Level Loyalty</span>
                <Badge variant={info.badgeVariant}>{info.emoji} {member?.loyalty}</Badge>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/20">
                <div className="h-1.5 rounded-full bg-green-400 transition-all duration-700"
                  style={{ width: `${progress}%` }} />
              </div>
              <p className="text-white/40 text-xs mt-1.5">
                {info.next ? `${info.needOrders - totalOrders} order lagi → ${info.next}` : "🏆 Level Tertinggi!"}
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activeNav === item.key;
              return (
                <button key={item.key} onClick={() => handleNavClick(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${isActive ? "bg-white font-semibold shadow-sm" : "text-white/70 hover:text-white hover:bg-white/10"}`}
                  style={isActive ? { color: NAVY } : {}}>
                  <span className={`text-base ${isActive ? "" : "opacity-70"}`}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Logout bawah */}
          <div className="p-4 border-t border-white/10">
            <button onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-300 hover:text-white hover:bg-red-500/20 text-sm font-medium transition-all">
              <FaSignOutAlt /> Keluar
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 p-5 md:p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-5">

            {error && <Alert variant="danger" title="Error" message={error} onClose={() => setError("")} />}

            {/* Page header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: NAVY }}>
                {navItems.find(n => n.key === activeNav)?.icon}
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">
                  {navItems.find(n => n.key === activeNav)?.label}
                </h1>
                <p className="text-xs text-gray-400">
                  {activeNav === "overview" && "Ringkasan akun dan aktivitas kamu"}
                  {activeNav === "orders"   && "Riwayat semua pesanan kamu"}
                  {activeNav === "promo"    && "Promo eksklusif untuk member"}
                  {activeNav === "feedback" && "Bagikan pengalaman kamu"}
                </p>
              </div>
            </div>

            {/* ══ OVERVIEW ══ */}
            {activeNav === "overview" && (
              <div className="space-y-5">
                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: <FaShoppingBag />, label: "Total Pesanan", value: totalOrders,      color: NAVY },
                    { icon: <FaCheckCircle />, label: "Selesai",       value: completed,        color: "#065F46" },
                    { icon: <FaTrophy />,      label: "Level",         value: member?.loyalty,  color: "#92400E" },
                    { icon: <FaStar />,        label: "Promo Aktif",   value: promos.length,    color: "#7C3AED" },
                  ].map((s, i) => (
                    <Card key={i}>
                      <div className="flex flex-col gap-2 p-1">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base bg-gray-50"
                          style={{ color: s.color }}>{s.icon}</div>
                        <p className="text-xl font-bold text-gray-800">{s.value}</p>
                        <p className="text-xs text-gray-500">{s.label}</p>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Loyalty card */}
                <Card>
                  <div className="p-1">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <FaTrophy style={{ color: NAVY }} /> Status Loyalty
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                          style={{ backgroundColor: "#EEF2FF" }}>{info.emoji}</div>
                        <div>
                          <p className="font-bold text-gray-800">{member?.loyalty} Member</p>
                          <p className="text-xs text-gray-500">{totalOrders} total pesanan</p>
                        </div>
                      </div>
                      {info.next && (
                        <div className="text-right">
                          <p className="text-xs text-gray-400">Target berikutnya</p>
                          <p className="text-sm font-semibold" style={{ color: NAVY }}>{info.next}</p>
                        </div>
                      )}
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100">
                      <div className="h-2 rounded-full transition-all duration-700"
                        style={{ width: `${progress}%`, backgroundColor: NAVY }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {info.next
                        ? `${info.needOrders - totalOrders} pesanan lagi untuk naik ke ${info.next}`
                        : "🏆 Kamu sudah di level tertinggi!"}
                    </p>
                  </div>
                </Card>

                {/* Recent orders */}
                <Card>
                  <div className="p-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <FaShoppingBag style={{ color: NAVY }} /> Pesanan Terbaru
                      </h3>
                      {orders.length > 3 && (
                        <button onClick={() => handleNavClick("orders")}
                          className="text-xs font-medium hover:underline" style={{ color: NAVY }}>
                          Lihat semua →
                        </button>
                      )}
                    </div>
                    {orders.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <p className="text-4xl mb-2">📦</p>
                        <p className="text-sm mb-3">Belum ada pesanan</p>
                        <Link to="/guest"
                          className="inline-block px-4 py-2 rounded-xl text-white text-sm font-semibold"
                          style={{ backgroundColor: NAVY }}>Pesan Sekarang</Link>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {orders.slice(0, 4).map((o, i) => {
                          const st = statusStyle[o.status] || statusStyle.Pending;
                          return (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{o.menu_name}</p>
                                <p className="text-xs text-gray-500">
                                  {o.quantity} porsi · {new Date(o.created_at).toLocaleDateString("id-ID")}
                                </p>
                              </div>
                              <div className="text-right space-y-1">
                                <Badge variant={st.badge}>{st.label}</Badge>
                                <p className="text-xs font-bold block" style={{ color: NAVY }}>
                                  Rp {Number(o.total_price).toLocaleString("id-ID")}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* ══ ORDERS ══ */}
            {activeNav === "orders" && (
              <div className="space-y-3">
                {orders.length === 0 ? (
                  <Card>
                    <div className="text-center py-10 text-gray-400">
                      <p className="text-5xl mb-3">📦</p>
                      <p className="text-sm mb-4">Belum ada pesanan</p>
                      <Link to="/guest"
                        className="inline-block px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                        style={{ backgroundColor: NAVY }}>Pesan Sekarang</Link>
                    </div>
                  </Card>
                ) : orders.map((o, i) => {
                  const st = statusStyle[o.status] || statusStyle.Pending;
                  return (
                    <Card key={i}>
                      <div className="p-1 flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800 text-sm">{o.menu_name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {o.quantity} porsi · {new Date(o.created_at).toLocaleDateString("id-ID")}
                          </p>
                          {o.address && <p className="text-xs text-gray-400 mt-1 truncate">📍 {o.address}</p>}
                          {o.notes && <p className="text-xs italic text-gray-400 mt-0.5">"{o.notes}"</p>}
                        </div>
                        <div className="text-right shrink-0 space-y-1.5">
                          <Badge variant={st.badge}>{st.label}</Badge>
                          <p className="text-sm font-bold block" style={{ color: NAVY }}>
                            Rp {Number(o.total_price).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* ══ PROMO ══ */}
            {activeNav === "promo" && (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Promo untuk member level <strong>{member?.loyalty}</strong>:
                </p>
                {promos.map((p, i) => (
                  <Card key={i}>
                    <div className="p-1 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl shrink-0">
                        {p.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                          <Badge variant={p.color}>{p.target}</Badge>
                        </div>
                        <p className="text-xs text-gray-400">Berlaku s/d {p.expiry}</p>
                      </div>
                      <FaGift className="text-gray-300 text-lg shrink-0" />
                    </div>
                  </Card>
                ))}
                <Card>
                  <div className="p-1 text-center py-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Mau klaim promo?</p>
                    <p className="text-xs text-gray-400 mb-4">Kunjungi halaman reward untuk menukar poin</p>
                    <Link to="/guest/reward"
                      className="inline-block px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
                      style={{ backgroundColor: NAVY }}>
                      Klaim Reward & Promo
                    </Link>
                  </div>
                </Card>
              </div>
            )}

            {/* ══ FEEDBACK ══ */}
            {activeNav === "feedback" && (
              <Card>
                <div className="p-1">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">Bagikan Pengalamanmu</h3>
                  <p className="text-xs text-gray-400 mb-5">Feedback kamu membantu kami menjadi lebih baik</p>

                  {fbSuccess && <Alert variant="success" title="Terima kasih!" message={fbSuccess} onClose={() => setFbSuccess("")} />}
                  {fbError   && <Alert variant="danger"  title="Gagal"          message={fbError}   onClose={() => setFbError("")} />}

                  <form onSubmit={handleFeedback} className="space-y-5 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button key={n} type="button"
                            onClick={() => setFbForm({ ...fbForm, rating: n })}
                            className={`text-3xl transition-transform hover:scale-110 ${n <= fbForm.rating ? "text-amber-400" : "text-gray-200"}`}>
                            ★
                          </button>
                        ))}
                        <span className="text-sm text-gray-500 ml-2">{fbForm.rating}/5</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ceritakan pengalamanmu
                      </label>
                      <textarea rows={5} value={fbForm.message}
                        onChange={(e) => setFbForm({ ...fbForm, message: e.target.value })}
                        placeholder="Bagaimana layanan Yummy Catering menurutmu?"
                        required disabled={fbLoading}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 resize-none disabled:opacity-60"
                      />
                    </div>

                    <button type="submit" disabled={fbLoading}
                      className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                      style={{ backgroundColor: NAVY }}>
                      {fbLoading ? <><ImSpinner2 className="animate-spin" /> Mengirim...</> : "Kirim Feedback ✨"}
                    </button>
                  </form>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
