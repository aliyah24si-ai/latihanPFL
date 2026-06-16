import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { membersAPI } from "../../services/membersAPI";
import { feedbackAPI } from "../../services/feedbackAPI";
import { ImSpinner2 } from "react-icons/im";
import {
  FaStar, FaSignOutAlt, FaShoppingBag, FaTrophy,
  FaGift, FaHome, FaCheckCircle,
} from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
// komponen ui yang sudah ada
import Badge   from "../../components/ui/Badge";
import Alert   from "../../components/ui/Alert";
import Avatar  from "../../components/ui/Avatar";
import Card    from "../../components/ui/Card";

const loyaltyInfo = {
  Bronze: { emoji: "🥉", color: "#92400E", bg: "#FEF3C7", next: "Silver", needOrders: 5,  border: "#D97706", badgeVariant: "bronze"  },
  Silver: { emoji: "🥈", color: "#374151", bg: "#F3F4F6", next: "Gold",   needOrders: 10, border: "#9CA3AF", badgeVariant: "silver"  },
  Gold:   { emoji: "🥇", color: "#92400E", bg: "#FEF3C7", next: null,     needOrders: null, border: "#F59E0B", badgeVariant: "gold" },
};

const promos = [
  { name: "Diskon Paket Harian 15%",   target: "Bronze+", expiry: "30 Juni 2025",   emoji: "🎉", color: "success" },
  { name: "Free Ongkir",               target: "Silver+", expiry: "31 Juli 2025",   emoji: "🚚", color: "info"    },
  { name: "VIP Cashback 20%",          target: "Gold",    expiry: "31 Juli 2025",   emoji: "💎", color: "gold"    },
  { name: "Diskon 10% Semua Member",   target: "Semua",   expiry: "31 Agustus 2025",emoji: "🌟", color: "warning" },
];

const statusStyle = {
  Pending:   { bg: "#FEF3C7", color: "#92400E", label: "⏳ Pending",    badge: "warning" },
  Completed: { bg: "#D1FAE5", color: "#065F46", label: "✅ Selesai",    badge: "success" },
  Cancelled: { bg: "#FEE2E2", color: "#991B1B", label: "❌ Dibatalkan", badge: "danger"  },
};

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [member,   setMember]   = useState(null);
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [tab,      setTab]      = useState("overview"); // overview | orders | promo | feedback

  const [fbForm,    setFbForm]    = useState({ rating: 5, message: "" });
  const [fbLoading, setFbLoading] = useState(false);
  const [fbSuccess, setFbSuccess] = useState("");
  const [fbError,   setFbError]   = useState("");

  useEffect(() => {
    // Tunggu sampai Supabase auth state siap, baru cek session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session) {
          navigate("/member/login");
          return;
        }

        try {
          let profile;
          try {
            profile = await membersAPI.getProfile(session.user.id);
          } catch {
            profile = {
              id:           session.user.id,
              full_name:    session.user.user_metadata?.full_name || session.user.email,
              email:        session.user.email,
              phone:        "-",
              loyalty:      "Bronze",
              total_orders: 0,
            };
          }

          setMember(profile);

          try {
            const myOrders = await membersAPI.getMyOrders(profile.email);
            setOrders(myOrders || []);
          } catch {
            setOrders([]);
          }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ImSpinner2 className="animate-spin text-3xl" style={{ color: "#1e2d6b" }} />
      </div>
    );
  }

  const info        = loyaltyInfo[member?.loyalty] || loyaltyInfo.Bronze;
  const totalOrders = member?.total_orders || 0;
  const progress    = info.next ? Math.min((totalOrders / info.needOrders) * 100, 100) : 100;
  const completed   = orders.filter(o => o.status === "Completed").length;

  const tabs = [
    { key: "overview", label: "🏠 Beranda" },
    { key: "orders",   label: "📦 Pesanan" },
    { key: "promo",    label: "🎁 Promo" },
    { key: "feedback", label: "💬 Feedback" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 shrink-0">
            <div className="absolute top-0 left-0 w-4 h-4 rounded-md bg-green-400 opacity-80" />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-md opacity-90" style={{ backgroundColor: "#1e2d6b" }} />
          </div>
          <span className="font-bold text-sm" style={{ color: "#1e2d6b" }}>Yummy Member</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/guest" className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <FaHome className="text-xs" /> Menu
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">

        {error && <Alert variant="danger" title="Error" message={error} onClose={() => setError("")} />}

        {/* ── Kartu Profil Loyalty ── */}
        <div
          className="rounded-2xl p-5 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1e2d6b, #2d4499)" }}
        >
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
          <div className="relative z-10 flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar name={member?.full_name || "?"} size="md" />
              <div>
                <p className="text-white/60 text-xs">Selamat datang,</p>
                <h2 className="text-lg font-bold leading-tight">{member?.full_name}</h2>
                <p className="text-white/60 text-xs">{member?.email}</p>
              </div>
            </div>
            <Badge variant={info.badgeVariant}>
              {info.emoji} {member?.loyalty}
            </Badge>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>{totalOrders} order</span>
              {info.next
                ? <span>Menuju {info.next}: {info.needOrders} order</span>
                : <span>🏆 Level Tertinggi!</span>
              }
            </div>
            <div className="w-full h-2 rounded-full bg-white/20">
              <div className="h-2 rounded-full bg-green-400 transition-all duration-700"
                style={{ width: `${progress}%` }} />
            </div>
            {info.next && (
              <p className="text-xs text-white/50 mt-1">
                {info.needOrders - totalOrders} order lagi untuk naik ke {info.next}
              </p>
            )}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                tab === t.key ? "text-white border-transparent" : "bg-white text-gray-500 border-gray-200"
              }`}
              style={tab === t.key ? { backgroundColor: "#1e2d6b" } : {}}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ══ TAB: OVERVIEW ══ */}
        {tab === "overview" && (
          <div className="space-y-4">
            {/* Stat cards pakai Card component */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <FaShoppingBag />, label: "Total Pesanan",  value: totalOrders, color: "#1e2d6b" },
                { icon: <FaCheckCircle />, label: "Selesai",        value: completed,   color: "#065F46" },
                { icon: <FaTrophy />,      label: "Level Loyalty",  value: member?.loyalty, color: "#92400E" },
                { icon: <FaStar />,        label: "Promo Tersedia", value: promos.length,   color: "#7C3AED" },
              ].map((s, i) => (
                <Card key={i}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-gray-50"
                      style={{ color: s.color }}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-800">{s.value}</p>
                      <p className="text-xs text-gray-500">{s.label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order terbaru */}
            <Card>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FaShoppingBag style={{ color: "#1e2d6b" }} /> Pesanan Terbaru
              </h3>
              {orders.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  <p className="text-3xl mb-2">📦</p>
                  <p className="text-sm">Belum ada pesanan</p>
                  <Link to="/guest"
                    className="inline-block mt-3 px-4 py-2 rounded-xl text-white text-sm font-semibold"
                    style={{ backgroundColor: "#1e2d6b" }}
                  >
                    Pesan Sekarang
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {orders.slice(0, 3).map((o, i) => {
                    const st = statusStyle[o.status] || statusStyle.Pending;
                    return (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{o.menu_name}</p>
                          <p className="text-xs text-gray-500">{o.quantity} porsi</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={st.badge}>{st.label}</Badge>
                          <p className="text-xs font-bold mt-1" style={{ color: "#1e2d6b" }}>
                            Rp {Number(o.total_price).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {orders.length > 3 && (
                    <button onClick={() => setTab("orders")}
                      className="w-full text-xs text-center py-2 text-gray-500 hover:text-navy">
                      Lihat semua {orders.length} pesanan →
                    </button>
                  )}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ══ TAB: ORDERS ══ */}
        {tab === "orders" && (
          <div className="space-y-3">
            {orders.length === 0 ? (
              <Card>
                <div className="text-center py-8 text-gray-400">
                  <p className="text-4xl mb-2">📦</p>
                  <p>Belum ada pesanan.</p>
                  <Link to="/guest"
                    className="inline-block mt-3 px-4 py-2 rounded-xl text-white text-sm font-semibold"
                    style={{ backgroundColor: "#1e2d6b" }}
                  >Pesan Sekarang</Link>
                </div>
              </Card>
            ) : (
              orders.map((o, i) => {
                const st = statusStyle[o.status] || statusStyle.Pending;
                return (
                  <Card key={i}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{o.menu_name}</p>
                        <p className="text-xs text-gray-500">
                          {o.quantity} porsi · {new Date(o.created_at).toLocaleDateString("id-ID")}
                        </p>
                        {o.address && <p className="text-xs text-gray-400 mt-0.5">{o.address}</p>}
                        {o.notes && <p className="text-xs italic text-gray-400">"{o.notes}"</p>}
                      </div>
                      <Badge variant={st.badge}>{st.label}</Badge>
                    </div>
                    <div className="flex justify-end">
                      <p className="font-bold text-sm" style={{ color: "#1e2d6b" }}>
                        Rp {Number(o.total_price).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        )}

        {/* ══ TAB: PROMO ══ */}
        {tab === "promo" && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Promo yang tersedia untuk member level <strong>{member?.loyalty}</strong>:</p>
            {promos.map((p, i) => (
              <Card key={i}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                      <Badge variant={p.color}>{p.target}</Badge>
                    </div>
                    <p className="text-xs text-gray-500">Berlaku s/d {p.expiry}</p>
                  </div>
                  <FaGift className="text-gray-300 text-lg shrink-0" />
                </div>
              </Card>
            ))}
            <Card>
              <div className="text-center py-2">
                <p className="text-xs text-gray-500 mb-2">Mau klaim promo? Hubungi kami via:</p>
                <Link to="/guest/reward"
                  className="inline-block px-4 py-2 rounded-xl text-white text-sm font-semibold"
                  style={{ backgroundColor: "#1e2d6b" }}
                >
                  Klaim Reward & Promo
                </Link>
              </div>
            </Card>
          </div>
        )}

        {/* ══ TAB: FEEDBACK ══ */}
        {tab === "feedback" && (
          <Card>
            <h3 className="font-bold text-gray-800 mb-4">Bagikan Pengalamanmu</h3>

            {fbSuccess && (
              <Alert variant="success" title="Terima kasih!" message={fbSuccess} onClose={() => setFbSuccess("")} />
            )}
            {fbError && (
              <Alert variant="danger" title="Gagal" message={fbError} onClose={() => setFbError("")} />
            )}

            <form onSubmit={handleFeedback} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button"
                      onClick={() => setFbForm({ ...fbForm, rating: n })}
                      className={`text-2xl transition-transform hover:scale-110 ${n <= fbForm.rating ? "text-amber-400" : "text-gray-300"}`}
                    >★</button>
                  ))}
                  <span className="text-sm text-gray-500 self-center ml-1">{fbForm.rating}/5</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Ceritakan pengalamanmu</label>
                <textarea rows={4} value={fbForm.message}
                  onChange={(e) => setFbForm({ ...fbForm, message: e.target.value })}
                  placeholder="Bagaimana layanan Yummy Catering menurutmu?"
                  required disabled={fbLoading}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 resize-none disabled:opacity-60"
                />
              </div>

              <button type="submit" disabled={fbLoading}
                className="w-full py-2.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: "#1e2d6b" }}
              >
                {fbLoading ? <><ImSpinner2 className="animate-spin" /> Mengirim...</> : "Kirim Feedback ✨"}
              </button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
