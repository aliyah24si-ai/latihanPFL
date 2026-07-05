import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GuestLayout from "../../layouts/GuestLayout";
import OrderModal from "../../components/guest/OrderModal";
import { ordersAPI } from "../../services/ordersAPI";
import { membersAPI } from "../../services/membersAPI";
import { feedbackAPI } from "../../services/feedbackAPI";
import { menusAPI } from "../../services/menusAPI";
import { supabase } from "../../services/supabaseClient";
import { ImSpinner2 } from "react-icons/im";

// Gambar lokal berdasarkan nama menu
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

export default function GuestMenu() {
  const navigate = useNavigate();

  const [menus,         setMenus]         = useState([]);
  const [menusLoading,  setMenusLoading]  = useState(false);
  const [memberSession, setMemberSession] = useState(null);
  const [memberProfile, setMemberProfile] = useState(null);
  const [feedbacks,     setFeedbacks]     = useState([]);
  const [selectedMenu,  setSelectedMenu]  = useState(null); // menu yang dibuka modal

  useEffect(() => {
    // Load menu dari Supabase
    setMenusLoading(true);
    menusAPI.fetchMenus().then(setMenus).catch(() => setMenus([])).finally(() => setMenusLoading(false));

    // Cek session member (bukan admin)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setMemberSession(session);
        membersAPI.getProfile(session.user.id).then(setMemberProfile).catch(() => setMemberProfile(null));
      }
    });

    // Load testimoni approved
    feedbackAPI.fetchApproved().then(setFeedbacks).catch(() => setFeedbacks([]));
  }, []);

  // Dipanggil dari OrderModal saat user submit
  const handleOrder = async (payload) => {
    await ordersAPI.createOrder({ ...payload, member_email: memberProfile?.email || null });

    // Update loyalty kalau member
    if (memberSession && memberProfile) {
      try {
        await membersAPI.updateLoyalty(memberSession.user.id);
        const updated = await membersAPI.getProfile(memberSession.user.id);
        setMemberProfile(updated);
      } catch { /* loyalty gagal update, tidak masalah */ }
    }
  };

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
                  onError={(e) => { e.target.style.display = "none"; }} />
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
                <button onClick={() => setSelectedMenu(item)}
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

      {/* Modal pesan — komponen terpisah */}
      {selectedMenu && (
        <OrderModal
          item={selectedMenu}
          memberProfile={memberProfile}
          onClose={() => setSelectedMenu(null)}
          onSubmit={handleOrder}
        />
      )}
    </GuestLayout>
  );
}
