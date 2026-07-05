import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { membersAPI } from "../../services/membersAPI";
import { feedbackAPI } from "../../services/feedbackAPI";
import { ImSpinner2 } from "react-icons/im";
import {
  FaStar, FaSignOutAlt, FaShoppingBag, FaTrophy,
  FaGift, FaHome, FaCheckCircle, FaBars, FaTimes,
  FaCommentDots, FaTag, FaBell,
} from "react-icons/fa";
import Badge  from "../../components/ui/Badge";
import Alert  from "../../components/ui/Alert";
import Avatar from "../../components/ui/Avatar";

const NAVY = "#1e2d6b";

const loyaltyInfo = {
  Bronze: { emoji: "🥉", next: "Silver", needOrders: 5,  badgeVariant: "bronze" },
  Silver: { emoji: "🥈", next: "Gold",   needOrders: 10, badgeVariant: "silver" },
  Gold:   { emoji: "🥇", next: null,     needOrders: null, badgeVariant: "gold" },
};

const promos = [
  { name: "Diskon Paket Harian 15%", target: "Bronze+", expiry: "30 Juni 2025",    emoji: "🎉", color: "success" },
  { name: "Free Ongkir",             target: "Silver+", expiry: "31 Juli 2025",    emoji: "🚚", color: "info"    },
  { name: "VIP Cashback 20%",        target: "Gold",    expiry: "31 Juli 2025",    emoji: "💎", color: "gold"    },
  { name: "Diskon 10% Semua Member", target: "Semua",   expiry: "31 Agustus 2025", emoji: "🌟", color: "warning" },
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

  const handleNavClick = (key) => { setActiveNav(key); setSidebarOpen(false); };

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
  const activeItem  = navItems.find(n => n.key === activeNav);
  const initials    = (member?.full_name || "?").split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── LEFT SIDEBAR (putih, seperti SecureCourse) ── */}
      <aside className={`fixed md:sticky top-0 left-0 z-40 h-screen w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute top-0 left-0 w-5 h-5 rounded-lg" style={{ backgroundColor: NAVY }} />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-lg bg-green-400 opacity-90" />
          </div>
          <span className="font-extrabold text-sm text-gray-900">
            Yummy <span style={{ color: NAVY }}>Member</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-5 px-3 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">Navigasi</p>
          {navItems.map((item) => {
            const isActive = activeNav === item.key;
            return (
              <button key={item.key} onClick={() => handleNavClick(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${isActive ? "text-white shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
                style={isActive ? { backgroundColor: NAVY } : {}}>
                <span className={`text-base ${isActive ? "text-white" : "text-gray-400"}`}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 space-y-0.5">
          <Link to="/guest"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all">
            <FaHome className="text-gray-400" /> Halaman Menu
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 transition-all">
            <FaSignOutAlt /> Keluar
          </button>
        </div>
      </aside>

      {/* ── RIGHT: Header + Content ── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* TOP HEADER */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-500 p-1.5 rounded-lg hover:bg-gray-100">
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div>
              <h2 className="text-sm font-bold text-gray-800">{activeItem?.label}</h2>
              <p className="text-xs text-gray-400 hidden sm:block">
                {activeNav === "overview" && "Ringkasan akun dan aktivitasmu"}
                {activeNav === "orders"   && "Riwayat semua pesanan"}
                {activeNav === "promo"    && "Promo eksklusif untuk member"}
                {activeNav === "feedback" && "Bagikan pengalamanmu"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <FaBell />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-400 border border-white" />
            </button>
            <div className="flex items-center gap-2.5 cursor-pointer">
              <Avatar name={member?.full_name || "?"} size="sm" />
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-gray-800 leading-tight">{member?.full_name}</p>
                <p className="text-xs text-gray-400">Member · {member?.loyalty}</p>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-5 md:p-7 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-5">

            {error && <Alert variant="danger" title="Error" message={error} onClose={() => setError("")} />}

            {/* ══ OVERVIEW ══ */}
            {activeNav === "overview" && (
              <div className="space-y-5">

                {/* Profile card dengan banner ala SecureCourse */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  {/* Banner gradient */}
                  <div className="h-24 w-full"
                    style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a5c3a 100%)` }} />
                  {/* Profil */}
                  <div className="px-6 pb-5">
                    <div className="-mt-8 mb-3 flex items-end justify-between">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white ring-4 ring-white shadow"
                        style={{ backgroundColor: NAVY }}>{initials}</div>
                      <Badge variant={info.badgeVariant}>{info.emoji} {member?.loyalty}</Badge>
                    </div>
                    <h3 className="font-bold text-gray-900">{member?.full_name}</h3>
                    <p className="text-xs text-gray-400 mb-4">{member?.email}</p>
                    {/* Progress */}
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-500 font-medium">
                        {info.next ? `Menuju ${info.next}` : "Level Tertinggi 🏆"}
                      </span>
                      <span className="font-semibold" style={{ color: NAVY }}>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100">
                      <div className="h-2 rounded-full transition-all duration-700"
                        style={{ width: `${progress}%`, backgroundColor: NAVY }} />
                    </div>
                    {info.next && (
                      <p className="text-xs text-gray-400 mt-1.5">
                        {Math.max(0, info.needOrders - totalOrders)} pesanan lagi untuk naik ke {info.next}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: <FaShoppingBag />, label: "Total Pesanan", value: totalOrders, color: NAVY,      bg: "#EEF2FF" },
                    { icon: <FaCheckCircle />, label: "Selesai",       value: completed,   color: "#065F46", bg: "#ECFDF5" },
                    { icon: <FaTrophy />,      label: "Level",         value: member?.loyalty, color: "#92400E", bg: "#FFFBEB" },
                    { icon: <FaStar />,        label: "Promo Aktif",   value: promos.length,   color: "#6D28D9", bg: "#F5F3FF" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base mb-3"
                        style={{ backgroundColor: s.bg, color: s.color }}>{s.icon}</div>
                      <p className="text-xl font-bold text-gray-800">{s.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent orders */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
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
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
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
              </div>
            )}

            {/* ══ ORDERS ══ */}
            {activeNav === "orders" && (
              <div className="space-y-3">
                {orders.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center text-gray-400">
                    <p className="text-5xl mb-3">📦</p>
                    <p className="text-sm mb-4">Belum ada pesanan</p>
                    <Link to="/guest"
                      className="inline-block px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                      style={{ backgroundColor: NAVY }}>Pesan Sekarang</Link>
                  </div>
                ) : orders.map((o, i) => {
                  const st = statusStyle[o.status] || statusStyle.Pending;
                  return (
                    <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-start justify-between gap-3">
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
                  );
                })}
              </div>
            )}

            {/* ══ PROMO ══ */}
            {activeNav === "promo" && (
              <div className="space-y-3">
                {promos.map((p, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0">{p.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                        <Badge variant={p.color}>{p.target}</Badge>
                      </div>
                      <p className="text-xs text-gray-400">Berlaku s/d {p.expiry}</p>
                    </div>
                    <FaGift className="text-gray-300 text-lg shrink-0" />
                  </div>
                ))}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 text-center">
                  <p className="text-sm font-medium text-gray-700 mb-1">Mau klaim promo?</p>
                  <p className="text-xs text-gray-400 mb-4">Kunjungi halaman reward untuk menukar poin</p>
                  <Link to="/guest/reward"
                    className="inline-block px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
                    style={{ backgroundColor: NAVY }}>Klaim Reward & Promo</Link>
                </div>
              </div>
            )}

            {/* ══ FEEDBACK ══ */}
            {activeNav === "feedback" && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-1">Bagikan Pengalamanmu</h3>
                <p className="text-xs text-gray-400 mb-5">Feedback kamu membantu kami menjadi lebih baik</p>

                {fbSuccess && <Alert variant="success" title="Terima kasih!" message={fbSuccess} onClose={() => setFbSuccess("")} />}
                {fbError   && <Alert variant="danger"  title="Gagal"         message={fbError}   onClose={() => setFbError("")} />}

                <form onSubmit={handleFeedback} className="space-y-5 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex items-center gap-1.5">
                      {[1,2,3,4,5].map((n) => (
                        <button key={n} type="button"
                          onClick={() => setFbForm({ ...fbForm, rating: n })}
                          className={`text-3xl transition-transform hover:scale-110 ${n <= fbForm.rating ? "text-amber-400" : "text-gray-200"}`}>★</button>
                      ))}
                      <span className="text-sm text-gray-500 ml-2">{fbForm.rating}/5</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ceritakan pengalamanmu</label>
                    <textarea rows={5} value={fbForm.message}
                      onChange={(e) => setFbForm({ ...fbForm, message: e.target.value })}
                      placeholder="Bagaimana layanan Yummy Catering menurutmu?"
                      required disabled={fbLoading}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 resize-none disabled:opacity-60" />
                  </div>
                  <button type="submit" disabled={fbLoading}
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{ backgroundColor: NAVY }}>
                    {fbLoading ? <><ImSpinner2 className="animate-spin" /> Mengirim...</> : "Kirim Feedback ✨"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
