import { useState } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import { FaWhatsapp, FaStar, FaTrophy, FaGift } from "react-icons/fa";

const WA_NUMBER = "6281234567890";

const loyaltyTiers = [
  {
    tier: "Bronze",
    emoji: "🥉",
    min: 1,
    max: 4,
    color: "#92400E",
    bg: "#FEF3C7",
    border: "#D97706",
    rewards: [
      { name: "Diskon 5% Order Berikutnya",  icon: "🏷️", points: 0 },
      { name: "Snack Box Gratis",             icon: "🧁", points: 50 },
    ],
  },
  {
    tier: "Silver",
    emoji: "🥈",
    min: 5,
    max: 9,
    color: "#374151",
    bg: "#F3F4F6",
    border: "#9CA3AF",
    rewards: [
      { name: "Diskon 10% Order Berikutnya", icon: "🏷️", points: 0 },
      { name: "Free Ongkir 1x",              icon: "🚚", points: 0 },
      { name: "Paket Harian Gratis",         icon: "🍱", points: 100 },
    ],
  },
  {
    tier: "Gold",
    emoji: "🥇",
    min: 10,
    max: 99,
    color: "#92400E",
    bg: "#FEF3C7",
    border: "#F59E0B",
    rewards: [
      { name: "Cashback 20%",                icon: "💸", points: 0 },
      { name: "Free Ongkir Selamanya",       icon: "🚚", points: 0 },
      { name: "Paket Premium Gratis",        icon: "🥘", points: 200 },
      { name: "Priority Order",             icon: "⭐", points: 0 },
    ],
  },
];

export default function GuestReward() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderCount, setOrderCount] = useState("");
  const [claimed, setClaimed] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [error, setError] = useState("");

  const getTier = (count) => {
    const n = parseInt(count);
    if (isNaN(n) || n < 1) return null;
    return loyaltyTiers.find((t) => n >= t.min && n <= t.max) || loyaltyTiers[2];
  };

  const currentTier = orderCount ? getTier(orderCount) : null;

  const handleCheck = (e) => {
    e.preventDefault();
    if (!name || !phone || !orderCount) {
      setError("Semua field harus diisi!");
      return;
    }
    setError("");
    setClaimed(currentTier);
    setSelectedReward(null);
  };

  const handleClaim = (reward) => {
    setSelectedReward(reward);
    const msg = `Halo Yummy Catering! Saya ingin klaim reward loyalty.\n\nNama: ${name}\nNo. HP: ${phone}\nJumlah Order: ${orderCount} kali\nTier: ${claimed?.tier}\nReward yang diklaim: ${reward.name}\n\nMohon konfirmasinya. Terima kasih!`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <GuestLayout>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Reward Loyalty</h2>
      <p className="text-gray-500 text-sm mb-8">
        Cek level loyalitas kamu dan klaim reward yang tersedia.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* ── Form Cek Reward ─────────────────────────────────────── */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FaStar className="text-amber-400" />
              <h3 className="font-bold text-gray-800">Cek Level Loyalitas</h3>
            </div>

            <form onSubmit={handleCheck} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Nomor HP / WA
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Jumlah Order Kamu (total semua waktu)
                </label>
                <input
                  type="number"
                  min={1}
                  value={orderCount}
                  onChange={(e) => setOrderCount(e.target.value)}
                  placeholder="Contoh: 7"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-white font-semibold text-sm"
                style={{ backgroundColor: "#1e2d6b" }}
              >
                Cek Level Saya
              </button>
            </form>
          </div>

          {/* Hasil cek */}
          {claimed && (
            <div
              className="rounded-2xl p-5 border-2"
              style={{ backgroundColor: claimed.bg, borderColor: claimed.border }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{claimed.emoji}</span>
                <div>
                  <p className="text-xs font-medium opacity-70" style={{ color: claimed.color }}>
                    Level kamu sekarang
                  </p>
                  <p className="text-xl font-extrabold" style={{ color: claimed.color }}>
                    {claimed.tier} Member
                  </p>
                </div>
              </div>
              <p className="text-xs mb-4" style={{ color: claimed.color, opacity: 0.8 }}>
                Kamu sudah order {orderCount} kali. Pilih reward di bawah dan klaim via WhatsApp!
              </p>

              <div className="space-y-2">
                {claimed.rewards.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => handleClaim(r)}
                    className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-white/60 hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{r.icon}</span>
                      <span className="text-sm font-semibold text-gray-800">{r.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#25D366" }}>
                      <FaWhatsapp />
                      Klaim
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Info Tier ────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <FaTrophy className="text-amber-400" />
            Program Loyalty Kami
          </h3>

          {loyaltyTiers.map((t) => (
            <div
              key={t.tier}
              className="bg-white rounded-2xl border p-4 shadow-sm"
              style={{ borderColor: t.border + "60" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{t.emoji}</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: t.color }}>{t.tier}</p>
                  <p className="text-xs text-gray-500">
                    {t.min === t.max ? `${t.min}` : `${t.min}–${t.max}`}+ order
                  </p>
                </div>
              </div>
              <ul className="space-y-1">
                {t.rewards.map((r, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{r.icon}</span>
                    {r.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Info klaim */}
          <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <FaWhatsapp className="text-green-600" />
              <p className="font-semibold text-sm text-green-800">Cara Klaim Reward</p>
            </div>
            <ol className="text-xs text-green-700 space-y-1 list-decimal list-inside">
              <li>Isi form di sebelah kiri</li>
              <li>Klik "Cek Level Saya"</li>
              <li>Pilih reward yang ingin diklaim</li>
              <li>Pesan otomatis terkirim ke WA Admin</li>
              <li>Tunggu konfirmasi dari tim kami</li>
            </ol>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
