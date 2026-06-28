import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers, FaChartBar, FaClipboardList,
  FaGift, FaRocket, FaShieldAlt,
} from "react-icons/fa";

// ── PRD V2: Landing Page CRM ─────────────────────────────────────────────────
// TOP    → Navbar + Hero
// MIDDLE → Problem/Solution + 6 Features + Stats + Testimonial
// BOTTOM → FAQ + CTA Final + Footer

const features = [
  { icon: <FaUsers />,       title: "Manajemen Pelanggan",  desc: "Data pelanggan tersimpan rapi, lengkap dengan level loyalitas otomatis." },
  { icon: <FaClipboardList />, title: "Pesanan Real-Time",   desc: "Pesanan masuk langsung dari halaman publik, admin update status seketika." },
  { icon: <FaChartBar />,    title: "Dashboard Analitik",   desc: "Pantau penjualan dan pelanggan dari dua dashboard terpisah yang jelas." },
  { icon: <FaGift />,        title: "Promo & Loyalty",      desc: "Atur promo dengan kuota, member naik level otomatis sesuai jumlah order." },
  { icon: <FaRocket />,      title: "Halaman Publik",       desc: "Guest bisa lihat menu, promo, dan pesan langsung tanpa perlu login." },
  { icon: <FaShieldAlt />,   title: "Login Aman Supabase",  desc: "Login admin dan member terpisah, aman menggunakan Supabase Auth." },
];

const stats = [
  { value: "500+",  label: "Pelanggan Aktif" },
  { value: "98%",   label: "Kepuasan" },
  { value: "12.000",label: "Pesanan Diproses" },
  { value: "3 Kota",label: "Area Layanan" },
];

const testimonials = [
  { name: "Siti Rahayu",  role: "Member Gold",     text: "Pesan catering jadi jauh lebih mudah. Status pesanan bisa dipantau langsung!" },
  { name: "Budi Santoso", role: "Pelanggan Loyal",  text: "Reward loyalty-nya beneran bisa diklaim. Dapat free ongkir tiap bulan!" },
  { name: "Dewi Lestari", role: "Member Silver",    text: "Daftar member gampang, langsung bisa pesan. Aplikasinya rapi dan cepat." },
];

const faqs = [
  { q: "Apakah Yummy CRM gratis?",           a: "Ya, pendaftaran member sepenuhnya gratis. Langsung bisa pesan dan kumpulkan poin loyalty." },
  { q: "Bagaimana cara mendaftar?",           a: "Klik Daftar Gratis, isi nama, email, dan password. Selesai — langsung bisa login dan pesan." },
  { q: "Apakah pesanan saya bisa dipantau?",  a: "Bisa. Setelah login member, lihat semua riwayat pesanan di dashboard member kamu." },
  { q: "Bagaimana sistem loyalty bekerja?",   a: "Otomatis. Makin banyak order, level naik dari Bronze → Silver → Gold dengan reward yang berbeda." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* ══════════════════════════════════════════════════════════
          AREA TOP — Navbar
      ══════════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute top-0 left-0 w-5 h-5 rounded-md bg-green-400 opacity-80" />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-md opacity-90" style={{ backgroundColor: "#1e2d6b" }} />
          </div>
          <span className="font-extrabold text-base tracking-tight" style={{ color: "#1e2d6b" }}>
            Yummy CRM
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <li><a href="#fitur"     className="hover:text-gray-900 transition-colors">Fitur</a></li>
          <li><a href="#testimoni" className="hover:text-gray-900 transition-colors">Testimoni</a></li>
          <li><a href="#faq"       className="hover:text-gray-900 transition-colors">FAQ</a></li>
        </ul>

        <div className="flex items-center gap-3">
          <Link to="/login"
            className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: "#1e2d6b", color: "#1e2d6b" }}
          >
            Masuk
          </Link>
          <Link to="/member/register"
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#1e2d6b" }}
          >
            Daftar Gratis
          </Link>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          AREA TOP — Hero Section
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-8 pt-24 pb-28 text-center"
        style={{ background: "linear-gradient(160deg, #f0f4ff 0%, #ffffff 60%)" }}
      >
        {/* Dekorasi lingkaran background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #1e2d6b, transparent 70%)" }} />

        <div className="relative max-w-3xl mx-auto">
          <span className="inline-block text-xs font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 uppercase tracking-widest mb-6">
            Platform CRM untuk Bisnis Catering
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
            Kelola Pelanggan &<br />
            <span style={{ color: "#1e2d6b" }}>Pesanan dalam<br />Satu Platform</span>
          </h1>

          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Yummy CRM menghubungkan bisnis catering dengan pelanggan —
            pesanan otomatis, loyalty member, dan dashboard real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/member/register"
              className="px-8 py-4 rounded-xl text-white font-bold text-base shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: "#1e2d6b" }}
            >
              Mulai Gratis →
            </Link>
            <Link to="/guest"
              className="px-8 py-4 rounded-xl font-bold text-base border-2 border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition"
            >
              Lihat Menu Catering
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          AREA MIDDLE — Problem & Solution
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Masalah yang Kami Selesaikan
            </h2>
            <p className="text-gray-500">Bisnis catering tanpa sistem vs dengan Yummy CRM.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-7">
              <p className="text-red-500 font-bold text-xs uppercase tracking-widest mb-5">
                ✗  Tanpa Sistem
              </p>
              <ul className="space-y-3">
                {[
                  "Data pelanggan tersebar di chat dan catatan manual",
                  "Pesanan sering terlewat atau double input",
                  "Tidak tahu pelanggan mana yang paling loyal",
                  "Susah pantau pendapatan harian",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-red-700">
                    <span className="mt-0.5 font-bold shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-7">
              <p className="text-green-600 font-bold text-xs uppercase tracking-widest mb-5">
                ✓  Dengan Yummy CRM
              </p>
              <ul className="space-y-3">
                {[
                  "Semua data pelanggan tersimpan rapi di satu tempat",
                  "Pesanan masuk otomatis dari halaman publik",
                  "Sistem loyalty Bronze → Silver → Gold otomatis",
                  "Dashboard penjualan & pelanggan real-time",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-green-800">
                    <span className="mt-0.5 font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          AREA MIDDLE — Feature Section
      ══════════════════════════════════════════════════════════ */}
      <section id="fitur" className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Fitur Lengkap</h2>
            <p className="text-gray-500">Satu platform, semua kebutuhan bisnis catering.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 bg-blue-50 group-hover:bg-blue-100 transition-colors"
                  style={{ color: "#1e2d6b" }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          AREA MIDDLE — Stats
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 px-8" style={{ backgroundColor: "#1e2d6b" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-extrabold text-white mb-2">{s.value}</p>
              <p className="text-sm text-white/60 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          AREA MIDDLE — Testimonial
      ══════════════════════════════════════════════════════════ */}
      <section id="testimoni" className="py-20 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Kata Pelanggan Kami</h2>
            <p className="text-gray-500">Pengalaman nyata dari member Yummy Catering.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-amber-400 text-lg mb-4">
                    {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed mb-6">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: "#1e2d6b" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          AREA BOTTOM — FAQ
      ══════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Pertanyaan Umum</h2>
            <p className="text-gray-500">Hal yang sering ditanyakan sebelum memulai.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i}
                className={`border rounded-xl overflow-hidden transition-colors ${openFaq === i ? "border-blue-200 bg-blue-50/30" : "border-gray-200 bg-white"}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-gray-400 text-xs ml-4 shrink-0 transition-transform"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}>
                    ▼
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          AREA BOTTOM — CTA Final
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-8 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e2d6b 0%, #2d4499 100%)" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-2xl mx-auto">
          <p className="text-white/60 text-sm font-medium mb-3">Sudah siap memulai?</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Ubah cara kelola bisnis<br />catering kamu sekarang.
          </h2>
          <p className="text-white/60 text-sm mb-10 max-w-sm mx-auto">
            Daftar gratis, tidak perlu kartu kredit. Langsung bisa pesan dan kumpulkan reward.
          </p>
          <Link to="/member/register"
            className="inline-block px-10 py-4 rounded-xl font-bold text-base bg-white hover:bg-gray-100 transition shadow-xl"
            style={{ color: "#1e2d6b" }}
          >
            Daftar Sekarang — Gratis
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          AREA BOTTOM — Footer
      ══════════════════════════════════════════════════════════ */}
      <footer id="footer" className="border-t border-gray-100 py-12 px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-7 h-7 shrink-0">
                <div className="absolute top-0 left-0 w-4 h-4 rounded-md bg-green-400 opacity-80" />
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-md opacity-90" style={{ backgroundColor: "#1e2d6b" }} />
              </div>
              <span className="font-extrabold text-sm" style={{ color: "#1e2d6b" }}>Yummy CRM</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Platform CRM untuk bisnis catering. Kelola pelanggan, pesanan, dan loyalty dalam satu tempat.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <p className="font-bold text-gray-700 mb-3">Produk</p>
              <ul className="space-y-2">
                <li><a href="#fitur"     className="text-gray-400 hover:text-gray-700 transition-colors">Fitur</a></li>
                <li><Link to="/guest"       className="text-gray-400 hover:text-gray-700 transition-colors">Menu Catering</Link></li>
                <li><Link to="/guest/promo" className="text-gray-400 hover:text-gray-700 transition-colors">Promo</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-gray-700 mb-3">Akun</p>
              <ul className="space-y-2">
                <li><Link to="/member/login"    className="text-gray-400 hover:text-gray-700 transition-colors">Login Member</Link></li>
                <li><Link to="/member/register" className="text-gray-400 hover:text-gray-700 transition-colors">Daftar Member</Link></li>
                <li><Link to="/login"           className="text-gray-400 hover:text-gray-700 transition-colors">Admin Login</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">© 2025 Yummy Catering. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
