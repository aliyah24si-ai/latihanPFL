import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers, FaChartBar, FaClipboardList,
  FaGift, FaRocket, FaShieldAlt,
  FaCheckCircle, FaTimesCircle,
} from "react-icons/fa";

// ── PRD V3: Landing Page CRM — Final ─────────────────────────────────────────

const features = [
  { icon: <FaUsers />,         title: "Manajemen Pelanggan",  desc: "Data pelanggan tersimpan rapi, lengkap dengan level loyalitas otomatis." },
  { icon: <FaClipboardList />, title: "Pesanan Real-Time",    desc: "Pesanan masuk otomatis dari halaman publik, admin update status seketika." },
  { icon: <FaChartBar />,      title: "Dashboard Analitik",   desc: "Dua dashboard terpisah: penjualan dan pelanggan, semua data real-time." },
  { icon: <FaGift />,          title: "Promo & Loyalty",      desc: "Atur promo berdasarkan kuota, level member naik otomatis sesuai order." },
  { icon: <FaRocket />,        title: "Halaman Publik",       desc: "Guest bisa lihat menu lengkap, promo, dan langsung pesan tanpa login." },
  { icon: <FaShieldAlt />,     title: "Auth Supabase",        desc: "Login admin dan member terpisah, aman menggunakan Supabase Auth." },
];

const steps = [
  { num: "01", title: "Daftar Gratis",       desc: "Buat akun member dalam 30 detik. Tidak perlu kartu kredit." },
  { num: "02", title: "Pilih Menu & Pesan",  desc: "Lihat menu lengkap, klik pesan, isi alamat — selesai." },
  { num: "03", title: "Kumpulkan Reward",    desc: "Setiap pesanan menambah level loyalty-mu secara otomatis." },
];

const testimonials = [
  { name: "Siti Rahayu",  role: "Member Gold",    text: "Pesan catering jadi jauh lebih mudah. Status pesanan bisa dipantau langsung dari HP!" },
  { name: "Budi Santoso", role: "Pelanggan Loyal", text: "Reward loyalty-nya beneran bisa diklaim. Dapat free ongkir tiap bulan, senang banget." },
  { name: "Dewi Lestari", role: "Member Silver",   text: "Daftar member gampang banget, langsung bisa pesan. Aplikasinya rapi dan cepat." },
];

const faqs = [
  { q: "Apakah Yummy CRM gratis?",           a: "Ya, pendaftaran member sepenuhnya gratis. Langsung bisa pesan dan kumpulkan poin loyalty." },
  { q: "Bagaimana cara mendaftar?",           a: "Klik Daftar Gratis, isi nama, email, dan password. Selesai — langsung bisa login dan pesan." },
  { q: "Apakah pesanan saya bisa dipantau?",  a: "Bisa. Setelah login member, semua riwayat pesanan dan statusnya tampil di dashboard." },
  { q: "Bagaimana sistem loyalty bekerja?",   a: "Otomatis. Makin banyak order, level naik: Bronze → Silver → Gold, dengan reward makin besar." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
        <Link to="/landing" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute top-0 left-0 w-5 h-5 rounded-md bg-green-400 opacity-80" />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-md" style={{ backgroundColor: "#1e2d6b" }} />
          </div>
          <span className="font-extrabold text-base" style={{ color: "#1e2d6b" }}>Yummy CRM</span>
        </Link>

        <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-500">
          <li><a href="#fitur"     className="hover:text-gray-900 transition-colors">Fitur</a></li>
          <li><a href="#cara-kerja" className="hover:text-gray-900 transition-colors">Cara Kerja</a></li>
          <li><a href="#testimoni" className="hover:text-gray-900 transition-colors">Testimoni</a></li>
          <li><a href="#faq"       className="hover:text-gray-900 transition-colors">FAQ</a></li>
        </ul>

        <div className="flex items-center gap-2.5">
          <Link to="/login"
            className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-lg border transition hover:bg-gray-50"
            style={{ borderColor: "#1e2d6b", color: "#1e2d6b" }}
          >Masuk</Link>
          <Link to="/member/register"
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition hover:opacity-90 shadow-sm"
            style={{ backgroundColor: "#1e2d6b" }}
          >Daftar Gratis</Link>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-24 pb-32 text-center">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(160deg, #eef2ff 0%, #ffffff 50%, #f0fdf4 100%)" }} />
        {/* Blob dekorasi */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20 -z-10"
          style={{ background: "radial-gradient(circle, #1e2d6b 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10 -z-10"
          style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 70%)" }} />

        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Platform CRM untuk Bisnis Catering
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Kelola Pelanggan &<br />
            <span className="relative inline-block">
              <span style={{ color: "#1e2d6b" }}>Pesanan Catering</span>
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                <path d="M0 3 Q75 0 150 3 Q225 6 300 3" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            <br />dalam Satu Tempat
          </h1>

          <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Yummy CRM membantu bisnis catering kamu tumbuh — pesanan otomatis,
            member loyalty, dan analitik bisnis dari satu dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/member/register"
              className="px-8 py-4 rounded-xl text-white font-bold text-base shadow-lg hover:opacity-90 transition"
              style={{ backgroundColor: "#1e2d6b" }}
            >Mulai Gratis — Tanpa Kartu Kredit →</Link>
            <Link to="/guest"
              className="px-8 py-4 rounded-xl font-bold text-base border-2 border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition"
            >Lihat Menu Catering</Link>
          </div>

          {/* Social proof kecil */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><FaCheckCircle className="text-green-500" /> Gratis daftar</span>
            <span className="flex items-center gap-1.5"><FaCheckCircle className="text-green-500" /> Loyalitas otomatis</span>
            <span className="flex items-center gap-1.5"><FaCheckCircle className="text-green-500" /> Real-time dashboard</span>
          </div>
        </div>
      </section>

      {/* ── PROBLEM & SOLUTION ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Kenapa Yummy CRM?</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-3">Berhenti Kelola Bisnis Manual</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">Setiap menit yang kamu habiskan mencatat manual adalah menit yang bisa dipakai untuk berkembang.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Tanpa CRM */}
            <div className="bg-white border border-red-100 rounded-2xl p-7 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <FaTimesCircle className="text-red-400 text-lg" />
                <span className="font-bold text-red-500 text-sm">Tanpa Sistem</span>
              </div>
              <ul className="space-y-3.5">
                {[
                  "Data pelanggan tersebar di chat & catatan manual",
                  "Pesanan terlewat atau sering double input",
                  "Tidak tahu pelanggan mana yang paling setia",
                  "Susah pantau pendapatan harian",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dengan CRM */}
            <div className="border border-green-100 rounded-2xl p-7 shadow-sm"
              style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)" }}>
              <div className="flex items-center gap-2 mb-5">
                <FaCheckCircle className="text-green-500 text-lg" />
                <span className="font-bold text-green-600 text-sm">Dengan Yummy CRM</span>
              </div>
              <ul className="space-y-3.5">
                {[
                  "Semua data pelanggan tersimpan rapi di satu tempat",
                  "Pesanan masuk otomatis dari halaman publik",
                  "Loyalty Bronze → Silver → Gold naik otomatis",
                  "Dashboard penjualan & pelanggan real-time",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────── */}
      <section id="fitur" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Semua yang Kamu Butuhkan</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-3">Fitur Lengkap</h2>
            <p className="text-gray-500 text-sm">Satu platform untuk semua kebutuhan bisnis catering kamu.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-5 transition-opacity"
                  style={{ backgroundColor: "#1e2d6b", transform: "translate(30%, -30%)" }} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-4"
                  style={{ backgroundColor: "#eef2ff", color: "#1e2d6b" }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #1e2d6b 0%, #2d4499 100%)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500+",   label: "Pelanggan Aktif" },
            { value: "98%",    label: "Kepuasan Pelanggan" },
            { value: "12.000", label: "Pesanan Diproses" },
            { value: "3 Kota", label: "Area Layanan" },
          ].map((s, i) => (
            <div key={i} className="group">
              <p className="text-4xl font-extrabold text-white mb-1 group-hover:scale-110 transition-transform">{s.value}</p>
              <p className="text-xs text-white/60 font-medium uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CARA KERJA ──────────────────────────────────────────────────── */}
      <section id="cara-kerja" className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Mudah Banget</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-3">Cara Mulai Pakai</h2>
            <p className="text-gray-500 text-sm">3 langkah, kurang dari 2 menit.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-extrabold mx-auto mb-4 text-white"
                  style={{ backgroundColor: "#1e2d6b" }}>
                  {s.num}
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                {/* Garis penghubung */}
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-10 -right-3 text-gray-300 text-xl font-bold">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/member/register"
              className="inline-block px-8 py-3.5 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-90 transition"
              style={{ backgroundColor: "#1e2d6b" }}
            >Mulai Sekarang →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ─────────────────────────────────────────────────── */}
      <section id="testimoni" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Mereka Sudah Pakai</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-3">Kata Pelanggan Kami</h2>
            <p className="text-gray-500 text-sm">Pengalaman nyata dari member Yummy Catering.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="flex gap-0.5 text-amber-400 text-base mb-4">
                  {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: "#1e2d6b" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 leading-tight">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Ada Pertanyaan?</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-3">Pertanyaan Umum</h2>
            <p className="text-gray-500 text-sm">Hal yang sering ditanyakan sebelum memulai.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i}
                className={`rounded-xl border overflow-hidden transition-all ${openFaq === i ? "border-blue-200 shadow-sm" : "border-gray-200 bg-white"}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="ml-4 shrink-0 text-xs text-gray-400 transition-transform duration-200"
                    style={{ display: "inline-block", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-2 text-sm text-gray-500 leading-relaxed border-t border-gray-100 bg-blue-50/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e2d6b 0%, #2d4499 60%, #1a6b4a 100%)" }}>
        {/* Dekorasi */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute -top-20 left-1/4 w-64 h-64 rounded-full opacity-10 bg-white" />
        <div className="absolute -bottom-16 right-1/4 w-48 h-48 rounded-full opacity-10 bg-white" />

        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block text-green-300 text-xs font-bold uppercase tracking-widest mb-4">
            Sudah siap memulai?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Ubah cara kelola bisnis<br />catering kamu sekarang.
          </h2>
          <p className="text-white/60 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
            Daftar gratis dalam 30 detik. Tidak perlu kartu kredit.<br />
            Langsung bisa pesan dan kumpulkan reward.
          </p>
          <Link to="/member/register"
            className="inline-block px-10 py-4 rounded-xl font-extrabold text-base bg-white hover:bg-gray-100 transition shadow-2xl"
            style={{ color: "#1e2d6b" }}
          >Daftar Sekarang — Gratis ✨</Link>

          <div className="flex items-center justify-center gap-6 text-white/40 text-xs mt-8">
            <span>✓ Gratis selamanya</span>
            <span>✓ Tidak perlu kartu kredit</span>
            <span>✓ Bisa batal kapan saja</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer id="footer" className="border-t border-gray-100 py-14 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-7 h-7 shrink-0">
                <div className="absolute top-0 left-0 w-4 h-4 rounded-md bg-green-400 opacity-80" />
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-md" style={{ backgroundColor: "#1e2d6b" }} />
              </div>
              <span className="font-extrabold text-sm" style={{ color: "#1e2d6b" }}>Yummy CRM</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Platform CRM untuk bisnis catering. Kelola pelanggan, pesanan, dan loyalty dalam satu tempat yang rapi.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <p className="font-bold text-gray-700 mb-3 text-xs uppercase tracking-wide">Produk</p>
              <ul className="space-y-2.5">
                <li><a href="#fitur"         className="text-gray-400 hover:text-gray-700 transition-colors text-xs">Fitur</a></li>
                <li><Link to="/guest"        className="text-gray-400 hover:text-gray-700 transition-colors text-xs">Menu Catering</Link></li>
                <li><Link to="/guest/promo"  className="text-gray-400 hover:text-gray-700 transition-colors text-xs">Promo</Link></li>
                <li><Link to="/guest/reward" className="text-gray-400 hover:text-gray-700 transition-colors text-xs">Reward</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-gray-700 mb-3 text-xs uppercase tracking-wide">Akun</p>
              <ul className="space-y-2.5">
                <li><Link to="/member/login"    className="text-gray-400 hover:text-gray-700 transition-colors text-xs">Login Member</Link></li>
                <li><Link to="/member/register" className="text-gray-400 hover:text-gray-700 transition-colors text-xs">Daftar Member</Link></li>
                <li><Link to="/login"           className="text-gray-400 hover:text-gray-700 transition-colors text-xs">Admin Login</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© 2025 Yummy Catering. All rights reserved.</p>
          <p className="text-xs text-gray-400">Dibuat dengan ❤️ untuk bisnis catering Indonesia</p>
        </div>
      </footer>
    </div>
  );
}
