import { useState, useEffect } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import { promosAPI } from "../../services/promosAPI";

const categories = ["Semua", "Bronze", "Silver", "Gold"];

const bgMap = {
  New:    "from-green-400 to-emerald-600",
  Loyal:  "from-blue-400 to-indigo-600",
  VIP:    "from-purple-400 to-violet-600",
  All:    "from-amber-400 to-orange-500",
  Gold:   "from-yellow-400 to-amber-500",
  Silver: "from-gray-400 to-slate-500",
  Bronze: "from-orange-300 to-amber-400",
};

export default function GuestPromo() {
  const [allPromos,    setAllPromos]    = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [selectedCat,  setSelectedCat]  = useState("Semua");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await promosAPI.fetchAll();
        setAllPromos(data.filter(p => p.status === "Aktif"));
      } catch { setAllPromos([]); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const filtered = selectedCat === "Semua"
    ? allPromos
    : allPromos.filter(p => p.target === selectedCat || p.target === "All");

  return (
    <GuestLayout>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Promo & Diskon</h2>
      <p className="text-gray-500 text-sm mb-6">Pilih kategori untuk melihat promo yang tersedia.</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${selectedCat === cat ? "text-white border-transparent" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
            style={selectedCat === cat ? { backgroundColor: "#1e2d6b", borderColor: "#1e2d6b" } : {}}>
            {cat === "Semua" ? "🌐 Semua" : cat === "Bronze" ? "🥉 Bronze" : cat === "Silver" ? "🥈 Silver" : "🥇 Gold"}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mr-3" style={{ borderColor: "#1e2d6b" }} />
          Memuat promo...
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p>Tidak ada promo aktif untuk kategori ini.</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((promo) => {
            const habis    = promo.kuota > 0 && (promo.terpakai || 0) >= promo.kuota;
            const sisa     = Math.max(0, (promo.kuota || 0) - (promo.terpakai || 0));
            const persen   = promo.kuota > 0 ? Math.round(((promo.terpakai || 0) / promo.kuota) * 100) : 0;
            const gradBg   = bgMap[promo.target] || "from-gray-400 to-gray-600";

            return (
              <div key={promo.id}
                className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all duration-200 ${habis ? "border-gray-200 opacity-70" : "border-gray-100 hover:shadow-md"}`}>
                <div className={`bg-gradient-to-br ${gradBg} h-32 flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
                  <span className="text-4xl mb-1 relative z-10">🎁</span>
                  <span className="text-2xl font-extrabold relative z-10">{promo.diskon}</span>
                  {habis && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full">Kuota Habis</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-1">{promo.nama}</h3>
                  {promo.keterangan && <p className="text-xs text-gray-500 leading-relaxed mb-3">{promo.keterangan}</p>}

                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                      {promo.target === "All" ? "Semua Member" : promo.target}
                    </span>
                  </div>

                  {promo.kuota > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Kuota tersisa</span>
                        <span className={habis ? "text-red-500 font-semibold" : "font-semibold"}>
                          {habis ? "Habis" : `${sisa} dari ${promo.kuota}`}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-1.5 rounded-full ${habis ? "bg-red-400" : persen > 70 ? "bg-amber-400" : "bg-green-400"}`}
                          style={{ width: `${persen}%` }} />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{promo.expiry ? `s/d ${promo.expiry}` : ""}</span>
                    {habis ? (
                      <span className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 font-semibold">Tidak tersedia</span>
                    ) : (
                      <a href={`https://wa.me/6281234567890?text=Halo, saya ingin klaim promo ${promo.nama}`}
                        target="_blank" rel="noreferrer"
                        className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold"
                        style={{ backgroundColor: "#25D366" }}>
                        Klaim via WA
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </GuestLayout>
  );
}
