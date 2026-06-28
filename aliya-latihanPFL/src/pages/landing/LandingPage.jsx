import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers, FaChartBar, FaClipboardList,
  FaGift, FaRocket, FaShieldAlt,
} from "react-icons/fa";

// ── PRD V2: Landing Page CRM - Struktur AIDA sesuai materi PPT ─────────────
// TOP    → Navbar + Hero (Attention)
// MIDDLE → Problem/Solution + Features + Stats + Testimonial (Interest+Desire)
// BOTTOM → FAQ + CTA Final + Footer (Action)

// ── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: <FaUsers />,
    title: "Manajemen Pelanggan",
    desc: "Data pelanggan tersimpan rapi, lengkap dengan level loyalitas otomatis.",
  },
  {
    icon: <FaClipboardList />,
    title: "Pesanan Real-Time",
    desc: "Pesanan masuk langsung dari halaman publik, admin bisa update status seketika.",
  },
  {
    icon: <FaChartBar />,
    title: "Dashboard Analitik",
    desc: "Pantau penjualan dan pelanggan dari dua dashboard terpisah yang jelas.",
  },
  {
    icon: <FaGift />,
    title: "Promo & Loyalty",
    desc: "Atur promo dengan kuota, member naik level otomatis sesuai jumlah pesanan.",
  },
  {
    icon: <FaRocket />,
    title: "Halaman Publik",
    desc: "Guest bisa lihat menu, promo, dan pesan langsung tanpa perlu login.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Autentikasi Supabase",
    desc: "Login admin dan member terpisah, aman menggunakan Supabase Auth.",
  },
];

const stats = [
  { value: "500+", label: "Pelanggan Aktif" },
  { value: "98%",  label: "Kepuasan" },
  { value: "12rb", label: "Pesanan Diproses" },
  { value: "3",    label: "Kota Layanan" },
];

const testimonials = [
  {
    name: "Siti Rahayu",
    role: "Member Gold",
    text: "Pesan catering jadi jauh lebih mudah. Status pesanan bisa dipantau langsung!",
  },
  {
    name: "Budi Santoso",
    role: "Pelanggan Loyal",
    text: "Reward loyalty-nya beneran bisa diklaim. Senang banget dapat free ongkir.",
  },
  {
    name: "Dewi Lestari",
    role: "Member Silver",
    text: "Aplikasinya rapi dan cepat. Daftar member gampang, langsung bisa pesan.",
  },
];

const faqs = [
  {
    q: "Apakah Yummy CRM gratis?",
    a: "Ya, pendaftaran member sepenuhnya gratis. Kamu langsung bisa pesan dan kumpulkan poin loyalty.",
  },
  {
    q: "Bagaimana cara mendaftar?",
    a: "Klik tombol Daftar Member, isi nama, email, dan password. Selesai — langsung bisa login.",
  },
  {
    q: "Apakah pesanan saya bisa dipantau?",
    a: "Bisa. Setelah login sebagai member, kamu bisa lihat semua riwayat pesanan di halaman dashboard member.",
  },
  {
    q: "Bagaimana sistem loyalty bekerja?",
    a: "Otomatis. Makin banyak pesanan, level kamu naik dari Bronze → Silver → Gold dengan reward yang berbeda.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white">

      {/* ════════════════════════════════════════════════════════════
          AREA TOP — Navbar & Hero (ATTENTION)
      ════════════════════════════════════════════════════════════ */}

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute top-0 left-0 w-5 h-5 rounded-md bg-green-400 opacity-80" />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-md opacity-90"
              style={{ backgroundColor: "#1e2d6b" }} />
          </div>
          <span className="font-bold text-base" style={{ color: "#1e2d6b" }}>Yummy CRM</span>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <li><a href="#fitur"     className="hover:text-gray-900 transition">Fitur</a></li>
          <li><a href="#testimoni" className="hover:text-gray-900 transition">Testimoni</a></li>
          <li><a href="#faq"       className="hover:text-gray-900 transition">FAQ</a></li>
        </ul>

        {/* CTA Sekunder — tombol di sudut kanan */}
        <div className="flex items-center gap-2">
          <Link to="/login"
            className="hidden sm:block px-4 py-2 text-sm font-semibold border rounded-lg transition"
            style={{ borderColor: "#1e2d6b", color: "#1e2d6b" }}
          >
            Masuk
          </Link>
          <Link to="/member/register"
            className="px-4 py-2 text-sm font-semibold rounded-lg text-white transition"
            style={{ backgroundColor: "#1e2d6b" }}
          >
            Daftar Gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Pre-title */}
        <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-3">
          Platform CRM untuk Bisnis Catering
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Kelola Pelanggan & Pesanan<br />
          <span style={{ color: "#1e2d6b" }}>dalam Satu Platform</span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-8">
          Yummy CRM menghubungkan bisnis catering dengan pelanggan secara efisien —
          dari pesanan masuk, loyalty member, hingga dashboard analitik.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/member/register"
            className="px-7 py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90"
            style={{ backgroundColor: "#1e2d6b" }}
          >
            Mulai Gratis →
          </Link>
          <Link to="/guest"
            className="px-7 py-3 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            Lihat Menu Catering
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          AREA MIDDLE — Problem/Solution + Features + Stats + Testimonial
          (INTEREST → DESIRE)
      ════════════════════════════════════════════════════════════ */}

      {/* Problem & Solution */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Masalah yang Kami Selesaikan
            </h2>
            <p className="text-gray-500 text-sm">
              Bisnis catering tanpa sistem vs dengan Yummy CRM.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Masalah */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 className="font-bold text-red-600 mb-4 text-sm uppercase tracking-wide">
                ✗ Tanpa Sistem
              </h3>
              <ul className="space-y-2 text-sm text-red-700">
                {[
                  "Data pelanggan tersebar di chat dan catatan manual",
                  "Pesanan sering terlewat atau double input",
                  "Tidak tahu pelanggan mana yang paling loyal",
                  "Susah pantau pendapatan harian",
                ].map((item, i) => <li key={i} className="flex gap-2"><span>✗</span>{item}</li>)}
              </ul>
            </div>

            {/* Solusi */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <h3 className="font-bold text-green-700 mb-4 text-sm uppercase tracking-wide">
                ✓ Dengan Yummy CRM
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                {[
                  "Semua data pelanggan tersimpan rapi di satu tempat",
                  "Pesanan masuk otomatis dari halaman publik",
                  "Sistem loyalty Bronze → Silver → Gold otomatis",
                  "Dashboard penjualan & pelanggan real-time",
                ].map((item, i) => <li key={i} className="flex gap-2"><span>✓</span>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="fitur" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fitur Lengkap</h2>
            <p className="text-gray-500 text-sm">Satu platform, semua kebutuhan bisnis catering.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="text-xl mb-3" style={{ color: "#1e2d6b" }}>{f.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6" style={{ backgroundColor: "#1e2d6b" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-extrabold text-white mb-1">{s.value}</p>
              <p className="text-xs text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimoni" className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Kata Pelanggan Kami</h2>
            <p className="text-gray-500 text-sm">Pengalaman nyata dari member Yummy Catering.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex gap-0.5 text-amber-400 mb-3">
                  {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
                </div>
                <p className="text-sm text-gray-600 italic mb-4">"{t.text}"</p>
                <div>
                  <p className="text-xs font-bold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          AREA BOTTOM — FAQ + CTA Final + Footer (ACTION)
      ════════════════════════════════════════════════════════════ */}

      {/* FAQ */}
      <section id="faq" className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pertanyaan Umum</h2>
            <p className="text-gray-500 text-sm">Hal yang sering ditanyakan sebelum memulai.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
                >
                  {faq.q}
                  <span className="text-gray-400 ml-4">{openFaq === i ? "▲" : "▼"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-500 border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: "#1e2d6b" }}>
        <p className="text-white/70 text-sm mb-2">Sudah siap memulai?</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
          Ubah cara kelola bisnis catering kamu sekarang.
        </h2>
        <p className="text-white/60 text-sm max-w-md mx-auto mb-8">
          Daftar gratis, tidak perlu kartu kredit. Langsung bisa pesan dan kumpulkan reward.
        </p>
        <Link
          to="/member/register"
          className="inline-block px-8 py-3 rounded-xl font-bold text-sm bg-white transition hover:bg-gray-100"
          style={{ color: "#1e2d6b" }}
        >
          Daftar Sekarang — Gratis
        </Link>
      </section>

      {/* Footer */}
      <footer id="footer" className="border-t border-gray-200 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Identitas */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="relative w-7 h-7 shrink-0">
                <div className="absolute top-0 left-0 w-4 h-4 rounded-md bg-green-400 opacity-80" />
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-md opacity-90"
                  style={{ backgroundColor: "#1e2d6b" }} />
              </div>
              <span className="font-bold text-sm" style={{ color: "#1e2d6b" }}>Yummy CRM</span>
            </div>
            <p className="text-xs text-gray-400 max-w-xs">
              Platform CRM untuk bisnis catering. Kelola pelanggan, pesanan, dan loyalty dalam satu tempat.
            </p>
          </div>

          {/* Navigasi terstruktur */}
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-2">Produk</p>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#fitur" className="hover:text-gray-600">Fitur</a></li>
                <li><Link to="/guest" className="hover:text-gray-600">Menu Catering</Link></li>
                <li><Link to="/guest/promo" className="hover:text-gray-600">Promo</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-2">Akun</p>
              <ul className="space-y-1 text-gray-400">
                <li><Link to="/member/login" className="hover:text-gray-600">Login Member</Link></li>
                <li><Link to="/member/register" className="hover:text-gray-600">Daftar Member</Link></li>
                <li><Link to="/login" className="hover:text-gray-600">Admin Login</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">© 2025 Yummy Catering. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
