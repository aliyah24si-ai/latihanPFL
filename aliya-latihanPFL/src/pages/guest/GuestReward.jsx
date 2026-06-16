import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GuestLayout from "../../layouts/GuestLayout";
import { supabase } from "../../services/supabaseClient";
import { membersAPI } from "../../services/membersAPI";
import { FaWhatsapp, FaStar, FaTrophy, FaLock } from "react-icons/fa";

const WA_NUMBER = "6281234567890";

const loyaltyTiers = [
  {
    tier: "Bronze", emoji: "🥉", min: 1, max: 4,
    color: "#92400E", bg: "#FEF3C7", border: "#D97706",
    rewards: [
      { name: "Diskon 5% Order Berikutnya", icon: "🏷️" },
      { name: "Snack Box Gratis",           icon: "🧁" },
    ],
  },
  {
    tier: "Silver", emoji: "🥈", min: 5, max: 9,
    color: "#374151", bg: "#F3F4F6", border: "#9CA3AF",
    rewards: [
      { name: "Diskon 10% Order Berikutnya", icon: "🏷️" },
      { name: "Free Ongkir 1x",              icon: "🚚" },
      { name: "Paket Harian Gratis",         icon: "🍱" },
    ],
  },
  {
    tier: "Gold", emoji: "🥇", min: 10, max: 99,
    color: "#92400E", bg: "#FEF3C7", border: "#F59E0B",
    rewards: [
      { name: "Cashback 20%",          icon: "💸" },
      { name: "Free Ongkir Selamanya", icon: "🚚" },
      { name: "Paket Premium Gratis",  icon: "🥘" },
      { name: "Priority Order",        icon: "⭐" },
    ],
  },
];

export default function GuestReward() {
  const [member,  setMember]  = useState(null);  // null=loading, false=tdk login
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        try {
          const profile = await membersAPI.getProfile(session.user.id);
          setMember(profile);
        } catch {
          setMember(false);
        }
      } else {
        setMember(false);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  const handleClaim = (reward) => {
    const msg = `Halo Yummy Catering! Saya ingin klaim reward loyalty.\n\nNama: ${member.full_name}\nEmail: ${member.email}\nLevel: ${member.loyalty}\nTotal Order: ${member.total_orders}\nReward: ${reward.name}\n\nMohon konfirmasinya. Terima kasih!`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const currentTier = loyaltyTiers.find(t => t.tier === member?.loyalty) || loyaltyTiers[0];
  const progress = member
    ? currentTier.tier === "Gold"
      ? 100
      : Math.min((member.total_orders / (currentTier.tier === "Bronze" ? 5 : 10)) * 100, 100)
    : 0;

  if (loading) {
    return (
      <GuestLayout>
        <div className="flex items-center justify-center py-24 text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy" style={{ borderColor: "#1e2d6b" }} />
        </div>
      </GuestLayout>
    );
  }

  return (
    <GuestLayout>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Reward Loyalty</h2>
      <p className="text-gray-500 text-sm mb-8">
        Kumpulkan poin dari setiap pesanan dan tukar dengan reward menarik.
      </p>

      <div className="grid md:grid-cols-2 gap-8">

        {/* ── Kiri: Status / Gate ── */}
        <div>
          {/* Belum login — tampilkan gate */}
          {!member ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl mx-auto mb-4">
                <FaLock className="text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Klaim Reward untuk Member</h3>
              <p className="text-sm text-gray-500 mb-6">
                Kamu harus login atau daftar sebagai member untuk bisa klaim reward loyalty.
              </p>
              <div className="flex flex-col gap-3">
                <Link to="/member/login"
                  className="w-full py-2.5 rounded-xl text-white font-semibold text-sm text-center"
                  style={{ backgroundColor: "#1e2d6b" }}
                >
                  Login Member
                </Link>
                <Link to="/member/register"
                  className="w-full py-2.5 rounded-xl font-semibold text-sm text-center border"
                  style={{ borderColor: "#1e2d6b", color: "#1e2d6b" }}
                >
                  Daftar Member — Gratis!
                </Link>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Sudah punya akun? Langsung login dan klaim rewardmu.
              </p>
            </div>

          ) : (
            /* Sudah login — tampilkan kartu member + reward */
            <div className="space-y-4">
              {/* Kartu level */}
              <div
                className="rounded-2xl p-5 text-white relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1e2d6b, #2d4499)" }}
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <span className="text-3xl">{currentTier.emoji}</span>
                  <div>
                    <p className="text-white/60 text-xs">Level kamu</p>
                    <p className="font-bold text-lg">{member.loyalty} Member</p>
                    <p className="text-white/60 text-xs">{member.total_orders} order total</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="relative z-10">
                  <div className="flex justify-between text-xs text-white/60 mb-1">
                    <span>{member.total_orders} order</span>
                    {currentTier.tier !== "Gold"
                      ? <span>Target {currentTier.tier === "Bronze" ? "Silver" : "Gold"}: {currentTier.tier === "Bronze" ? 5 : 10} order</span>
                      : <span>🏆 Level Tertinggi!</span>
                    }
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/20">
                    <div className="h-2 rounded-full bg-green-400 transition-all duration-700"
                      style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>

              {/* Reward yang bisa diklaim */}
              <div
                className="rounded-2xl p-5 border-2"
                style={{ backgroundColor: currentTier.bg, borderColor: currentTier.border }}
              >
                <p className="font-bold text-sm mb-3" style={{ color: currentTier.color }}>
                  Reward yang bisa kamu klaim:
                </p>
                <div className="space-y-2">
                  {currentTier.rewards.map((r, i) => (
                    <button key={i} onClick={() => handleClaim(r)}
                      className="w-full flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-white/60 hover:shadow-md transition-all text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{r.icon}</span>
                        <span className="text-sm font-semibold text-gray-800">{r.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#25D366" }}>
                        <FaWhatsapp /> Klaim
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Kanan: Info semua tier ── */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <FaTrophy className="text-amber-400" />
            Program Loyalty Kami
          </h3>

          {loyaltyTiers.map((t) => (
            <div key={t.tier}
              className={`bg-white rounded-2xl border p-4 shadow-sm transition-all ${
                member?.loyalty === t.tier ? "ring-2" : ""
              }`}
              style={{
                borderColor: t.border + "60",
                ringColor: t.border,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{t.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm" style={{ color: t.color }}>{t.tier}</p>
                    {member?.loyalty === t.tier && (
                      <span className="text-xs px-2 py-0.5 rounded-full text-white font-semibold"
                        style={{ backgroundColor: t.border }}>
                        Level Kamu
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{t.min}–{t.tier === "Gold" ? "∞" : t.max} order</p>
                </div>
              </div>
              <ul className="space-y-1">
                {t.rewards.map((r, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{r.icon}</span>{r.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Cara klaim */}
          <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <FaWhatsapp className="text-green-600" />
              <p className="font-semibold text-sm text-green-800">Cara Klaim Reward</p>
            </div>
            <ol className="text-xs text-green-700 space-y-1 list-decimal list-inside">
              <li>Login atau daftar sebagai member</li>
              <li>Kumpulkan order untuk naik level</li>
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
