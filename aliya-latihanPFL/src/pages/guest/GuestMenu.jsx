import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import GuestLayout from "../../layouts/GuestLayout";
import { ordersAPI } from "../../services/ordersAPI";
import { membersAPI } from "../../services/membersAPI";
import { feedbackAPI } from "../../services/feedbackAPI";
import { menusAPI } from "../../services/menusAPI";
import { supabase } from "../../services/supabaseClient";
import { BsCheckCircleFill, BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

// Map gambar lokal berdasarkan nama menu
const imageMap = {
  "paket harian":     "/images/paket-harian.jpg",
  "paket premium":    "/images/paket-premium.jpg",
  "snack box":        "/images/snack-box.jpg",
  "cookies box":      "/images/cookies-box.jpg",
  "nasi tumpeng":     "/images/nasitumpengmini.jpg",
  "paket vegetarian": "/images/paket-vegetarian.jpg",
};
const getImage = (nama) => {
  const key = Object.keys(imageMap).find(k => nama?.toLowerCase().includes(k));
  return key ? imageMap[key] : null;
};

const emptyForm = { customer_name: "", phone: "", address: "", quantity: 1, notes: "" };

export default function GuestMenu() {
  const navigate = useNavigate();

  const [menus,         setMenus]         = useState([]);
  const [menusLoading,  setMenusLoading]  = useState(false);
  const [memberSession, setMemberSession] = useState(null);
  const [memberProfile, setMemberProfile] = useState(null);
  const [feedbacks,     setFeedbacks]     = useState([]);

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showDetail,   setShowDetail]   = useState(true);
  const [form,         setForm]         = useState(emptyForm);
  const [loading,      setLoading]      = useState(false);
  const [success,      setSuccess]      = useState("");
  const [error,        setError]        = useState("");

  useEffect(() => {
    // Load menu dari Supabase
    const loadMenus = async () => {
      setMenusLoading(true);
      try {
        const data = await menusAPI.fetchMenus();
        setMenus(data);
      } catch { setMenus([]); }
      finally { setMenusLoading(false); }
    };
    loadMenus();

    // Cek session member
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setMemberSession(session);
        membersAPI.getProfile(session.user.id).then(setMemberProfile).catch(() => {});
      }
    });

    // Load feedback approved
    feedbackAPI.fetchApproved().then(setFeedbacks).catch(() => setFeedbacks([]));
  }, []);

  const handleOpen = (item) => {
    setSelectedMenu(item); setShowDetail(true);
    setForm(emptyForm); setSuccess(""); setError("");
  };
  const handleClose = () => { setSelectedMenu(null); setSuccess(""); setError(""); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const qty   = parseInt(form.quantity) || 1;
      const total = selectedMenu.harga * qty;
      await ordersAPI.createOrder({
        customer_name: memberProfile ? memberProfile.full_name : form.customer_name,
        phone:         memberProfile ? memberProfile.phone     : form.phone,
        address:       form.address,
        menu_name:     selectedMenu.nama,
        quantity:      qty,
        total_price:   total,
        notes:         form.notes,
        status:        "Pending",
        member_email:  memberProfile?.email || null,
      });
      if (memberSession) {
        await membersAPI.updateLoyalty(memberSession.user.id);
        const updated = await membersAPI.getProfile(memberSession.user.id);
        setMemberProfile(updated);
      }
      setSuccess(`Pesanan ${selectedMenu.nama} berhasil dikirim! Admin akan segera menghubungi kamu.`);
      setForm(emptyForm);
    } catch (err) {
      setError("Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const qty   = parseInt(form.quantity) || 1;
  const total = selectedMenu ? selectedMenu.harga * qty : 0;

  return (
    <GuestLayout>
      {/* Hero */}
      <div className="rounded-3xl p-8 md:p-12 mb-10 text-white text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e2d6b 0%, #2d4499 60%, #1a6b4a 100%)" }}>
        <div className="relative z-10">
          <p className="text-green-300 text-sm font-semibold mb-2 uppercase tracking-widest">Catering Terpercaya Sejak 2015</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Yummy Catering 🍱</h1>
          <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto mb-5">
            Kami menyajikan makanan lezat berkualitas untuk berbagai acara.
          </p>
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
              <button onClick={() => navigate("/member/login")}
                className="bg-white font-bold px-3 py-1 rounded-full text-xs hover:bg-gray-100"
                style={{ color: "#1e2d6b" }}>Login</button>
            </div>
          )}
        </div>
      </div>

      {/* Menu Grid */}
      <h2 className="text-xl font-bold text-gray-800 mb-5">Menu Kami</h2>

      {menusLoading && (
        <div className="flex items-center justify-center py-12 text-gray-400">
          <ImSpinner2 className="animate-spin text-2xl mr-2" style={{ color: "#1e2d6b" }} /> Memuat menu...
        </div>
      )}

      {!menusLoading && menus.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">🍽️</p>
          <p>Menu belum tersedia. Hubungi admin.</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {menus.map((item) => (
          <div key={item.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="h-44 overflow-hidden bg-gray-50 flex items-center justify-center">
              {getImage(item.nama) ? (
                <img src={getImage(item.nama)} alt={item.nama}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              ) : (
                <span className="text-5xl">🍱</span>
              )}
            </div>
            <div className="p-4">
              <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 bg-blue-50 text-blue-600">
                {item.kategori}
              </span>
              <h3 className="font-bold text-gray-800 mb-1">{item.nama}</h3>
              {item.deskripsi && <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{item.deskripsi}</p>}
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm" style={{ color: "#1e2d6b" }}>
                  Rp {Number(item.harga).toLocaleString("id-ID")} / porsi
                </span>
                <button onClick={() => handleOpen(item)}
                  className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold hover:opacity-90 transition"
                  style={{ backgroundColor: "#1e2d6b" }}>
                  Lihat & Pesan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimoni */}
      {feedbacks.length > 0 && (
        <div className="mt-14">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Kata Pelanggan Kami</h2>
            <p className="text-sm text-gray-500">Testimoni nyata dari member Yummy Catering</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {feedbacks.slice(0, 6).map((fb, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className={s < fb.rating ? "text-amber-400" : "text-gray-200"}>★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">"{fb.message}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: "#1e2d6b" }}>
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
          {!memberProfile && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-3">Ingin berbagi pengalamanmu juga?</p>
              <Link to="/member/login"
                className="inline-block px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                style={{ backgroundColor: "#1e2d6b" }}>
                Login Member untuk Beri Feedback
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedMenu && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 flex items-center gap-3 text-white shrink-0" style={{ backgroundColor: "#1e2d6b" }}>
              <div>
                <p className="font-bold">{selectedMenu.nama}</p>
                <p className="text-xs text-white/70">Rp {Number(selectedMenu.harga).toLocaleString("id-ID")} / porsi</p>
              </div>
              {!success && (
                <div className="ml-auto flex gap-2">
                  <button onClick={() => setShowDetail(true)}
                    className={`text-xs px-3 py-1 rounded-lg font-semibold ${showDetail ? "bg-white" : "bg-white/20 text-white"}`}
                    style={showDetail ? { color: "#1e2d6b" } : {}}>Detail</button>
                  <button onClick={() => setShowDetail(false)}
                    className={`text-xs px-3 py-1 rounded-lg font-semibold ${!showDetail ? "bg-white" : "bg-white/20 text-white"}`}
                    style={!showDetail ? { color: "#1e2d6b" } : {}}>Pesan</button>
                </div>
              )}
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {success ? (
                <div className="text-center py-4">
                  <BsCheckCircleFill className="text-5xl text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-gray-800 mb-2">Pesanan Terkirim!</p>
                  <p className="text-sm text-gray-500 mb-4">{success}</p>
                  <button onClick={handleClose} className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm"
                    style={{ backgroundColor: "#1e2d6b" }}>Tutup</button>
                </div>
              ) : showDetail ? (
                <div className="space-y-4">
                  {selectedMenu.deskripsi && <p className="text-sm text-gray-600">{selectedMenu.deskripsi}</p>}
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="text-xs font-semibold text-blue-700 mb-1">Kategori</p>
                    <p className="text-sm text-gray-800">{selectedMenu.kategori}</p>
                  </div>
                  <button onClick={() => setShowDetail(false)}
                    className="w-full py-2.5 rounded-xl text-white font-semibold text-sm"
                    style={{ backgroundColor: "#1e2d6b" }}>Pesan Sekarang →</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                      <BsFillExclamationDiamondFill className="shrink-0" />{error}
                    </div>
                  )}
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
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">No. WhatsApp *</label>
                        <input name="phone" value={form.phone} onChange={handleChange}
                          placeholder="08xxxxxxxxxx" required disabled={loading}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60" />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Alamat Pengiriman *</label>
                    <textarea name="address" value={form.address} onChange={handleChange}
                      placeholder="Jl. ..." required disabled={loading} rows={2}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 resize-none disabled:opacity-60" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Jumlah Porsi *</label>
                    <input name="quantity" type="number" min={1} value={form.quantity}
                      onChange={handleChange} required disabled={loading}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Catatan (opsional)</label>
                    <input name="notes" value={form.notes} onChange={handleChange}
                      placeholder="Alergi, permintaan khusus..." disabled={loading}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60" />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "#EEF2FF" }}>
                    <span className="text-gray-600">{qty} porsi × Rp {Number(selectedMenu.harga).toLocaleString("id-ID")}</span>
                    <span className="font-bold" style={{ color: "#1e2d6b" }}>Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={handleClose} disabled={loading}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60">
                      Batal
                    </button>
                    <button type="submit" disabled={loading}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                      style={{ backgroundColor: "#1e2d6b" }}>
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
