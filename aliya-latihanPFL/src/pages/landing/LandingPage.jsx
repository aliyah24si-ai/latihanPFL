import { Link } from "react-router-dom";
import { FaUsers, FaChartBar, FaClipboardList } from "react-icons/fa";

// ── PRD V1: Landing Page CRM - Struktur Dasar ──────────────────────────────
// Berisi: Navbar, Hero Section, Feature Section, Footer
// Belum ada: Problem/Solution, Testimonial, FAQ, Stats

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAVBAR ──────────────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute top-0 left-0 w-5 h-5 rounded-md bg-green-400 opacity-80" />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-md opacity-90" style={{ backgroundColor: "#1e2d6b" }} />
          </div>
          <span className="font-bold text-base" style={{ color: "#1e2d6b" }}>Yummy CRM</span>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <li><a href="#fitur" className="hover:text-gray-900">Fitur</a></li>
          <li><a href="#footer" className="hover:text-gray-900">Kontak</a></li>
        </ul>

        {/* CTA Sekunder */}
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-semibold rounded-lg border"
          style={{ borderColor: "#1e2d6b", color: "#1e2d6b" }}
        >
          Masuk
        </Link>
      </nav>

      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Pre-title */}
        <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-3">
          Sistem CRM untuk Catering
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Kelola Pelanggan Catering<br />
          <span style={{ color: "#1e2d6b" }}>Lebih Mudah & Terorganisir</span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-8">
          Yummy CRM membantu bisnis catering kamu mencatat pesanan, mengelola pelanggan,
          dan memantau performa dalam satu dashboard.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl text-white font-semibold text-sm"
            style={{ backgroundColor: "#1e2d6b" }}
          >
            Mulai Gratis →
          </Link>
          <Link
            to="/guest"
            className="px-6 py-3 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Lihat Menu Catering
          </Link>
        </div>
      </section>

      {/* ── FEATURE SECTION ─────────────────────────────────────── */}
      <section id="fitur" className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Fitur Utama</h2>
          <p className="text-gray-500 text-sm">Semua yang kamu butuhkan ada di sini.</p>
        </div>

        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: <FaUsers className="text-2xl" style={{ color: "#1e2d6b" }} />,
              title: "Manajemen Pelanggan",
              desc: "Simpan data pelanggan, riwayat pesanan, dan tingkat loyalitas dalam satu tempat.",
            },
            {
              icon: <FaClipboardList className="text-2xl" style={{ color: "#1e2d6b" }} />,
              title: "Kelola Pesanan",
              desc: "Terima dan pantau pesanan masuk dari halaman publik secara real-time.",
            },
            {
              icon: <FaChartBar className="text-2xl" style={{ color: "#1e2d6b" }} />,
              title: "Dashboard Analitik",
              desc: "Lihat ringkasan penjualan, pelanggan baru, dan performa bisnis dengan mudah.",
            },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer id="footer" className="border-t border-gray-200 py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="relative w-6 h-6 shrink-0">
            <div className="absolute top-0 left-0 w-4 h-4 rounded-md bg-green-400 opacity-80" />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-md opacity-90" style={{ backgroundColor: "#1e2d6b" }} />
          </div>
          <span className="font-bold text-sm" style={{ color: "#1e2d6b" }}>Yummy CRM</span>
        </div>
        <p className="text-xs text-gray-400">© 2025 Yummy Catering. All rights reserved.</p>
      </footer>
    </div>
  );
}
