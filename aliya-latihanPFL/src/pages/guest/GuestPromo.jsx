import { useState } from "react";
import GuestLayout from "../../layouts/GuestLayout";

const allPromos = [
  {
    name: "Diskon Paket Harian 15%",
    desc: "Khusus pelanggan baru, minimum order 5 porsi. Berlaku setiap hari Senin–Jumat.",
    diskon: "15%",
    target: ["New"],
    emoji: "🎉",
    bg: "from-green-400 to-emerald-600",
    expiry: "30 Juni 2025",
  },
  {
    name: "Free Ongkir untuk Loyal",
    desc: "Gratis ongkos kirim untuk pelanggan loyal, tidak ada minimum order.",
    diskon: "Free Ongkir",
    target: ["Loyal", "Gold"],
    emoji: "🚚",
    bg: "from-blue-400 to-indigo-600",
    expiry: "31 Juli 2025",
  },
  {
    name: "VIP Cashback 20%",
    desc: "Cashback 20% untuk member VIP dan Gold, maksimal Rp 50.000 per transaksi.",
    diskon: "20%",
    target: ["VIP", "Gold"],
    emoji: "💎",
    bg: "from-purple-400 to-violet-600",
    expiry: "31 Juli 2025",
  },
  {
    name: "Promo Spesial Semua Member",
    desc: "Diskon spesial untuk semua pelanggan di akhir bulan. Jangan sampai ketinggalan!",
    diskon: "10%",
    target: ["All", "New", "Loyal", "Gold", "VIP"],
    emoji: "🌟",
    bg: "from-amber-400 to-orange-500",
    expiry: "31 Agustus 2025",
  },
  {
    name: "Silver Member Bonus",
    desc: "Tambahan 1 porsi gratis untuk setiap order minimum 10 porsi. Khusus Silver.",
    diskon: "Bonus 1 Porsi",
    target: ["Loyal"],
    emoji: "🥈",
    bg: "from-gray-400 to-slate-500",
    expiry: "15 Juli 2025",
  },
  {
    name: "Gold Exclusive Bundle",
    desc: "Paket bundling eksklusif dengan harga spesial, termasuk snack box gratis.",
    diskon: "25%",
    target: ["Gold", "VIP"],
    emoji: "🥇",
    bg: "from-yellow-400 to-amber-500",
    expiry: "20 Juli 2025",
  },
];

const categories = ["Semua", "New", "Loyal", "Gold", "VIP"];

export default function GuestPromo() {
  const [selectedCat, setSelectedCat] = useState("Semua");

  const filtered =
    selectedCat === "Semua"
      ? allPromos
      : allPromos.filter((p) => p.target.includes(selectedCat));

  return (
    <GuestLayout>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Promo & Diskon</h2>
      <p className="text-gray-500 text-sm mb-6">
        Pilih kategori pelanggan kamu untuk melihat promo yang tersedia.
      </p>

      {/* Filter kategori pelanggan */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              selectedCat === cat
                ? "text-white border-transparent"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
            style={
              selectedCat === cat ? { backgroundColor: "#1e2d6b", borderColor: "#1e2d6b" } : {}
            }
          >
            {cat === "Semua" && "🌐 "}
            {cat === "New" && "🆕 "}
            {cat === "Loyal" && "🥈 "}
            {cat === "Gold" && "🥇 "}
            {cat === "VIP" && "💎 "}
            {cat}
          </button>
        ))}
      </div>

      {/* Promo Cards dengan gambar gradient */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">😔</p>
          <p>Tidak ada promo untuk kategori ini.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((promo, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              {/* Gambar / banner gradient */}
              <div
                className={`bg-gradient-to-br ${promo.bg} h-32 flex flex-col items-center justify-center text-white relative overflow-hidden`}
              >
                {/* dekorasi lingkaran */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />

                <span className="text-4xl mb-1 relative z-10">{promo.emoji}</span>
                <span className="text-2xl font-extrabold relative z-10">{promo.diskon}</span>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{promo.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{promo.desc}</p>

                {/* Target kategori */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {promo.target
                    .filter((t) => t !== "All")
                    .map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  {promo.target.includes("All") && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">
                      Semua Member
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Berlaku s/d {promo.expiry}</span>
                  <a
                    href={`https://wa.me/6281234567890?text=Halo, saya ingin klaim promo ${promo.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    Klaim via WA
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </GuestLayout>
  );
}
