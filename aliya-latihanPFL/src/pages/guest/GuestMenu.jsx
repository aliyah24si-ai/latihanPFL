import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import GuestLayout from "../../layouts/GuestLayout";
import { ordersAPI } from "../../services/ordersAPI";
import { membersAPI } from "../../services/membersAPI";
import { feedbackAPI } from "../../services/feedbackAPI";
import { supabase } from "../../services/supabaseClient";
import { BsCheckCircleFill, BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FaLeaf, FaFire, FaStar } from "react-icons/fa";

const menuItems = [
  {
    name: "Paket Harian",
    image: "/images/paket-harian.jpg",
    price: 25000,
    tag: "Terlaris", tagColor: "#D1FAE5", tagText: "#065F46",
    desc: "Menu lengkap nasi + lauk + sayur untuk kebutuhan harian.",
    bahan: ["Nasi putih pulen", "Ayam goreng bumbu kuning", "Tempe orek", "Sayur asem", "Kerupuk"],
    rasa: "Gurih, sedikit manis dengan bumbu rempah khas Jawa.",
    kalori: "±650 kkal/porsi",
    icon: <FaStar className="text-amber-400" />,
  },
  {
    name: "Paket Premium",
    image: "/images/paket-premium.jpg",
    price: 55000,
    tag: "Premium", tagColor: "#FEF3C7", tagText: "#92400E",
    desc: "Menu eksklusif lauk premium untuk acara formal.",
    bahan: ["Nasi basmati", "Rendang daging sapi", "Perkedel kentang", "Capcay premium", "Puding cokelat"],
    rasa: "Kaya rempah, pedas gurih dengan sentuhan modern.",
    kalori: "±850 kkal/porsi",
    icon: <FaFire className="text-orange-500" />,
  },
  {
    name: "Snack Box",
    image: "/images/snack-box.jpg",
    price: 18000,
    tag: "Populer", tagColor: "#EDE9FE", tagText: "#5B21B6",
    desc: "Kotak snack berisi kue tradisional pilihan.",
    bahan: ["Lemper ayam", "Risoles mayonnaise", "Kue lapis", "Onde-onde", "Air mineral"],
    rasa: "Manis dan gurih, perpaduan kue basah tradisional.",
    kalori: "±400 kkal/porsi",
    icon: <FaStar className="text-purple-400" />,
  },
  {
    name: "Cookies Box",
    image: "/images/cookies-box.jpg",
    price: 45000,
    tag: "Hampers", tagColor: "#FCE7F3", tagText: "#9D174D",
    desc: "Kue kering premium dikemas cantik untuk hampers.",
    bahan: ["Nastar nanas", "Putri salju", "Kastengel keju", "Choco chips cookies", "Lidah kucing"],
    rasa: "Manis, renyah, dengan berbagai rasa yang bervariasi.",
    kalori: "±500 kkal/kotak",
    icon: <FaStar className="text-pink-400" />,
  },
  {
    name: "Nasi Tumpeng Mini",
    image: "/images/nasitumpengmini.jpg",
    price: 150000,
    tag: "Spesial", tagColor: "#DBEAFE", tagText: "#1E40AF",
    desc: "Tumpeng mini lengkap untuk syukuran & ulang tahun.",
    bahan: ["Nasi kuning", "Ayam bakar", "Urap sayur", "Sambal goreng kentang", "Telur balado", "Tempe mendoan"],
    rasa: "Gurih khas nasi kuning, lengkap dengan lauk pauk tradisional.",
    kalori: "±1200 kkal/tumpeng",
    icon: <FaFire className="text-blue-500" />,
  },
  {
    name: "Paket Vegetarian",
    image: "/images/paket-vegetarian.jpg",
    price: 30000,
    tag: "Sehat", tagColor: "#D1FAE5", tagText: "#065F46",
    desc: "Menu sehat bebas daging dengan bahan segar pilihan.",
    bahan: ["Nasi merah", "Tahu bacem", "Tempe goreng", "Gado-gado", "Jus buah segar"],
    rasa: "Segar, ringan, dengan bumbu alami tanpa MSG.",
    kalori: "±480 kkal/porsi",
    icon: <FaLeaf className="text-green-500" />,
  },
];

const emptyForm = { customer_name: "", phone: "", address: "", quantity: 1, notes: "" };

export default function GuestMenu() {
  const navigate = useNavigate();

  // Cek apakah ada sesi member yang login
  const [memberSession, setMemberSession] = useState(null);
  const [memberProfile, setMemberProfile] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setMemberSession(session);
        try {
          const profile = await membersAPI.getProfile(session.user.id);
          setMemberProfile(profile);
        } catch { /* bukan member */ }
      }
    };
    checkSession();
  }, []);

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showDetail,   setShowDetail]   = useState(false);
  const [form,   setForm]   = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error,   setError]   = useState("");

  // Feedback yang sudah approved
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    feedbackAPI.fetchApproved().then(setFeedbacks).catch(() => setFeedbacks([]));
  }, []);

  const handleOpen = (item) => {
    setSelectedMenu(item);
    setShowDetail(true);
    setForm(emptyForm);
    setSuccess(""); setError("");
  };

  const handleClose = () => {
    setSelectedMenu(null);
    setShowDetail(false);
    setSuccess(""); setError("");
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const qty   = parseInt(form.quantity) || 1;
      const total = selectedMenu.price * qty;

      // Jika member login, isi member_email otomatis
      const memberEmail = memberProfile?.email || null;

      await ordersAPI.createOrder({
        customer_name: memberProfile ? memberProfile.full_name : form.customer_name,
        phone:         memberProfile ? memberProfile.phone     : form.phone,
        address:       form.address,
        menu_name:     selectedMenu.name,
        quantity:      qty,
        total_price:   total,
        notes:         form.notes,
        status:        "Pending",
        member_email:  memberEmail,
      });

      // Update loyalty jika member login
      if (memberSession) {
        await membersAPI.updateLoyalty(memberSession.user.id);
        // Refresh profil
        const updated = await membersAPI.getProfile(memberSession.user.id);
        setMemberProfile(updated);
      }

      setSuccess(`Pesanan ${selectedMenu.name} berhasil dikirim! Admin akan segera menghubungi kamu.`);
      setForm(emptyForm);
    } catch (err) {
      setError("Gagal mengirim pesanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const qty   = parseInt(form.quantity) || 1;
  const total = selectedMenu ? selectedMenu.price * qty : 0;

  return (
    <GuestLayout>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div
        className="rounded-3xl p-8 md:p-12 mb-10 text-white text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e2d6b 0%, #2d4499 60%, #1a6b4a 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{ width: `${80+i*40}px`, height: `${80+i*40}px`, background: "white", top: `${i*15}%`, left: `${i*18-5}%` }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <p className="text-green-300 text-sm font-semibold mb-2 uppercase tracking-widest">
            Catering Terpercaya Sejak 2015
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Yummy Catering 🍱</h1>
          <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto mb-5">
            Kami menyajikan makanan lezat berkualitas untuk berbagai acara. Pesan sekarang dan rasakan bedanya!
          </p>

          {/* Status member */}
          {memberProfile ? (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold">
              <span>👋 Halo, {memberProfile.full_name}!</span>
              <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs">
                {memberProfile.loyalty === "Gold" ? "🥇" : memberProfile.loyalty === "Silver" ? "🥈" : "🥉"} {memberProfile.loyalty}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-xs">
              <span>Login sebagai member untuk dapat reward loyalty</span>
              <button
                onClick={() => navigate("/member/login")}
                className="bg-white text-navy font-bold px-3 py-1 rounded-full text-xs hover:bg-gray-100"
                style={{ color: "#1e2d6b" }}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Menu Grid ─────────────────────────────────────────────── */}
      <h2 className="text-xl font-bold text-gray-800 mb-5">Menu Kami</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {menuItems.map((item, i) => (
          <div key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Gambar asli */}
            <div className="h-44 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: item.tagColor, color: item.tagText }}
                >
                  {item.tag}
                </span>
                <span className="text-sm">{item.icon}</span>
              </div>

              <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{item.desc}</p>

              <div className="flex items-center justify-between">
                <span className="font-bold text-sm" style={{ color: "#1e2d6b" }}>
                  Rp {item.price.toLocaleString("id-ID")} / porsi
                </span>
                <button
                  onClick={() => handleOpen(item)}
                  className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold hover:opacity-90 transition"
                  style={{ backgroundColor: "#1e2d6b" }}
                >
                  Lihat & Pesan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Section Testimoni ─────────────────────────────────────── */}
      {feedbacks.length > 0 && (
        <div className="mt-14">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Kata Pelanggan Kami</h2>
            <p className="text-sm text-gray-500">Testimoni nyata dari member Yummy Catering</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {feedbacks.slice(0, 6).map((fb, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                {/* Bintang */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className={s < fb.rating ? "text-amber-400" : "text-gray-200"}>★</span>
                  ))}
                </div>
                {/* Pesan */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">
                  "{fb.message}"
                </p>
                {/* Nama */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: "#1e2d6b" }}
                  >
                    {fb.member_name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{fb.member_name}</p>
                    <p className="text-xs text-gray-400">Member Yummy</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA daftar member */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-3">
              Ingin berbagi pengalamanmu juga?
            </p>
            <Link
              to="/member/login"
              className="inline-block px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{ backgroundColor: "#1e2d6b" }}
            >
              Login Member untuk Beri Feedback
            </Link>
          </div>
        </div>
      )}

      {/* ── Modal Detail + Form ────────────────────────────────────── */}
      {selectedMenu && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

            {/* Header */}
            <div className="px-6 py-4 flex items-center gap-3 text-white shrink-0"
              style={{ backgroundColor: "#1e2d6b" }}>
              <img src={selectedMenu.image} alt={selectedMenu.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-white/30"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div>
                <p className="font-bold">{selectedMenu.name}</p>
                <p className="text-xs text-white/70">Rp {selectedMenu.price.toLocaleString("id-ID")} / porsi</p>
              </div>
              {/* Toggle detail / pesan */}
              {!success && (
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => setShowDetail(true)}
                    className={`text-xs px-3 py-1 rounded-lg font-semibold transition ${showDetail ? "bg-white text-navy" : "bg-white/20 text-white"}`}
                    style={showDetail ? { color: "#1e2d6b" } : {}}
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => setShowDetail(false)}
                    className={`text-xs px-3 py-1 rounded-lg font-semibold transition ${!showDetail ? "bg-white text-navy" : "bg-white/20 text-white"}`}
                    style={!showDetail ? { color: "#1e2d6b" } : {}}
                  >
                    Pesan
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {/* ── Success ── */}
              {success ? (
                <div className="text-center py-4">
                  <BsCheckCircleFill className="text-5xl text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-gray-800 mb-1">Pesanan Terkirim!</p>
                  <p className="text-sm text-gray-500 mb-2">{success}</p>
                  {memberProfile && (
                    <p className="text-xs text-blue-600 mb-4">
                      Level kamu: <strong>{memberProfile.loyalty}</strong> ({memberProfile.total_orders} order)
                    </p>
                  )}
                  <button onClick={handleClose}
                    className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm"
                    style={{ backgroundColor: "#1e2d6b" }}
                  >
                    Tutup
                  </button>
                </div>

              ) : showDetail ? (
                /* ── Tab Detail ── */
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{selectedMenu.desc}</p>

                  <div>
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">🥘 Bahan-bahan</p>
                    <ul className="space-y-1">
                      {selectedMenu.bahan.map((b, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-amber-50 rounded-xl p-3">
                      <p className="text-xs font-semibold text-amber-700 mb-1">👅 Rasa</p>
                      <p className="text-xs text-gray-600">{selectedMenu.rasa}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3">
                      <p className="text-xs font-semibold text-blue-700 mb-1">🔥 Kalori</p>
                      <p className="text-xs text-gray-600">{selectedMenu.kalori}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowDetail(false)}
                    className="w-full py-2.5 rounded-xl text-white font-semibold text-sm"
                    style={{ backgroundColor: "#1e2d6b" }}
                  >
                    Pesan Sekarang →
                  </button>
                </div>

              ) : (
                /* ── Tab Form Pesan ── */
                <form onSubmit={handleSubmit} className="space-y-3">
                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                      <BsFillExclamationDiamondFill className="shrink-0" />{error}
                    </div>
                  )}

                  {/* Jika member login, nama & HP otomatis */}
                  {memberProfile ? (
                    <div className="bg-blue-50 rounded-xl px-4 py-3 text-sm text-blue-700 border border-blue-200">
                      <p className="font-semibold">Memesan sebagai member</p>
                      <p className="text-xs">{memberProfile.full_name} · {memberProfile.phone}</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nama Lengkap *</label>
                        <input name="customer_name" value={form.customer_name} onChange={handleChange}
                          placeholder="Nama pemesan" required disabled={loading}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">No. WhatsApp *</label>
                        <input name="phone" value={form.phone} onChange={handleChange}
                          placeholder="08xxxxxxxxxx" required disabled={loading}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Alamat Pengiriman *</label>
                    <textarea name="address" value={form.address} onChange={handleChange}
                      placeholder="Jl. ..." required disabled={loading} rows={2}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 resize-none disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Jumlah Porsi *</label>
                    <input name="quantity" type="number" min={1} value={form.quantity}
                      onChange={handleChange} required disabled={loading}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Catatan (opsional)</label>
                    <input name="notes" value={form.notes} onChange={handleChange}
                      placeholder="Alergi, permintaan khusus, dll..." disabled={loading}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
                    />
                  </div>

                  {/* Ringkasan harga */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "#EEF2FF" }}>
                    <span className="text-gray-600">{qty} porsi × Rp {selectedMenu.price.toLocaleString("id-ID")}</span>
                    <span className="font-bold" style={{ color: "#1e2d6b" }}>Rp {total.toLocaleString("id-ID")}</span>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={handleClose} disabled={loading}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60"
                    >
                      Batal
                    </button>
                    <button type="submit" disabled={loading}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                      style={{ backgroundColor: "#1e2d6b" }}
                    >
                      {loading ? <><ImSpinner2 className="animate-spin" />Mengirim...</> : "Kirim Pesanan"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </GuestLayout>
  );
}
