import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers, FaChartBar, FaClipboardList,
  FaGift, FaCheckCircle, FaWhatsapp,
  FaStar, FaTrophy, FaBars, FaTimes,
} from "react-icons/fa";

// ── PRD V3 FINAL ─────────────────────────────────────────────────────────────
// Gambar yang perlu disiapkan di public/images/:
//   hero-catering.jpg  → foto makanan/nasi kotak menarik (landscape)
//   about-catering.jpg → foto tim/dapur catering (landscape)
//   feature-order.jpg  → foto orang pesan makanan (landscape)

const NAVY = "#1e2d6b";

const features = [
  { icon: <FaClipboardList />, title: "Pesanan Otomatis",       desc: "Pesanan masuk langsung dari halaman publik, admin bisa update status seketika." },
  { icon: <FaUsers />,         title: "Manajemen Pelanggan",    desc: "Data pelanggan, riwayat pesanan, dan level loyalitas tersimpan rapi." },
  { icon: <FaChartBar />,      title: "Dashboard Real-Time",    desc: "Pantau penjualan dan pelanggan dari dua dashboard yang terpisah dan jelas." },
  { icon: <FaGift />,          title: "Promo & Loyalty",        desc: "Reward otomatis naik level Bronze → Silver → Gold sesuai jumlah pesanan." },
];

const whyUs = [
  { icon: "🚀", title: "Mudah Dipakai",      desc: "Daftar 30 detik, langsung bisa pesan." },
  { icon: "🔒", title: "Aman & Terpercaya",  desc: "Login via Supabase Auth, data terlindungi." },
  { icon: "📱", title: "Mobile Friendly",    desc: "Tampil sempurna di HP maupun laptop." },
  { icon: "⚡", title: "Real-Time Update",   desc: "Status pesanan & data selalu up to date." },
];

const stats = [
  { value: "500+",  label: "Pelanggan Aktif" },
  { value: "98%",   label: "Kepuasan" },
  { value: "12rb+", label: "Pesanan" },
  { value: "3",     label: "Kota" },
];

const testimonials = [
  { name: "Siti Rahayu",  role: "Member Gold",    star: 5, text: "Pesan catering jadi jauh lebih mudah. Status pesanan bisa dipantau langsung!" },
  { name: "Budi Santoso", role: "Pelanggan Loyal", star: 5, text: "Reward loyalty-nya beneran bisa diklaim. Dapat free ongkir tiap bulan!" },
  { name: "Dewi Lestari", role: "Member Silver",   star: 5, text: "Daftar member gampang, langsung bisa pesan. Rapi dan cepat." },
];

const faqs = [
  { q: "Apakah gratis?",                     a: "Ya, pendaftaran member sepenuhnya gratis. Langsung bisa pesan dan kumpulkan poin loyalty." },
  { q: "Bagaimana cara mendaftar?",           a: "Klik Daftar Gratis → isi nama, email, password → selesai, langsung bisa login." },
  { q: "Bagaimana sistem loyalty bekerja?",   a: "Otomatis. Makin banyak pesanan, level naik dari Bronze → Silver → Gold dengan reward makin besar." },
  { q: "Apakah pesanan bisa dipantau?",       a: "Bisa. Setelah login member, semua riwayat pesanan dan statusnya tampil di dashboard." },
];

export default function LandingPage() {
  const [openFaq,   setOpenFaq]   = useState(null);
  const [menuOpen,  setMenuOpen]  = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/landing" className="flex items-center gap-2 shrink-0">
            <div className="relative w-8 h-8">
              <div className="absolute top-0 left-0 w-5 h-5 rounded-md bg-green-400 opacity-80" />
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-md" style={{ backgroundColor: NAVY }} />
            </div>
            <span className="font-extrabold text-base" style={{ color: NAVY }}>Yummy</span>
          </Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-500">
            {[["#fitur","Fitur"],["#kenapa","Kenapa Kami"],["#testimoni","Testimoni"],["#faq","FAQ"]].map(([href,label]) => (
              <li key={href}><a href={href} className="hover:text-gray-900 transition-colors">{label}</a></li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link to="/login"
              className="text-sm font-semibold px-4 py-2 rounded-lg border transition hover:bg-gray-50"
              style={{ borderColor: NAVY, color: NAVY }}>Masuk</Link>
            <Link to="/member/register"
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition hover:opacity-90"
              style={{ backgroundColor: NAVY }}>Daftar Gratis</Link>
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-2 text-gray-500" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 border-t border-gray-100 space-y-1">
            {[["#fitur","Fitur"],["#kenapa","Kenapa Kami"],["#testimoni","Testimoni"],["#faq","FAQ"]].map(([href,label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900">{label}</a>
            ))}
            <div className="flex gap-2 pt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="flex-1 text-center text-sm font-semibold py-2 rounded-lg border"
                style={{ borderColor: NAVY, color: NAVY }}>Masuk</Link>
              <Link to="/member/register" onClick={() => setMenuOpen(false)}
                className="flex-1 text-center text-sm font-semibold py-2 rounded-lg text-white"
                style={{ backgroundColor: NAVY }}>Daftar</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Teks */}
          <div>
            <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Platform CRM untuk Bisnis Catering
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.15] mb-5">
              Kelola Pesanan &<br />
              Pelanggan Catering<br />
              <span style={{ color: NAVY }}>dalam Satu Platform</span>
            </h1>

            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              Yummy membantu bisnis catering kamu tumbuh — pesanan otomatis,
              member loyalty, dan dashboard analitik real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link to="/member/register"
                className="px-7 py-3.5 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-90 transition text-center"
                style={{ backgroundColor: NAVY }}>
                Mulai Gratis →
              </Link>
              <Link to="/guest"
                className="px-7 py-3.5 rounded-xl font-bold text-sm border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition text-center">
                Lihat Menu
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><FaCheckCircle className="text-green-500" /> Gratis daftar</span>
              <span className="flex items-center gap-1.5"><FaCheckCircle className="text-green-500" /> Loyalty otomatis</span>
              <span className="flex items-center gap-1.5"><FaCheckCircle className="text-green-500" /> Dashboard real-time</span>
            </div>
          </div>

          {/* Gambar hero */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl opacity-20 -z-10"
              style={{ background: `radial-gradient(circle at 60% 40%, ${NAVY}, transparent 70%)` }} />
            <img
              src="/images/hero-catering.jpg"
              alt="Yummy Catering"
              className="w-full rounded-2xl shadow-2xl object-cover"
              style={{ aspectRatio: "4/3" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Placeholder kalau gambar belum ada */}
            <div className="w-full rounded-2xl shadow-inner flex items-center justify-center text-gray-300 text-sm border-2 border-dashed border-gray-200 bg-gray-50"
              style={{ aspectRatio: "4/3", display: "none" }}>
              <div className="text-center">
                <p className="text-4xl mb-2">🍱</p>
                <p>Tambahkan foto catering kamu</p>
                <p className="text-xs mt-1">public/images/hero-catering.jpg</p>
              </div>
            </div>

            {/* Badge float */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <FaCheckCircle />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Pesanan Masuk!</p>
                  <p className="text-xs text-gray-400">2 menit lalu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ═══════════════════════════════════════════════════════ */}
      <section className="border-y border-gray-100 bg-gray-50 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-extrabold mb-1" style={{ color: NAVY }}>{s.value}</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════════════════ */}
      <section id="fitur" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Gambar */}
            <div className="relative order-2 md:order-1">
              <img src="/images/about-catering.jpg" alt="Fitur Yummy"
                className="w-full rounded-2xl shadow-xl object-cover"
                style={{ aspectRatio: "4/3" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="w-full rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 items-center justify-center text-gray-300 text-sm"
                style={{ aspectRatio: "4/3", display: "none" }}>
                <div className="text-center">
                  <p className="text-4xl mb-2">👨‍🍳</p>
                  <p>public/images/about-catering.jpg</p>
                </div>
              </div>
            </div>

            {/* Teks */}
            <div className="order-1 md:order-2">
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Fitur Unggulan</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-4">
                Semua yang Kamu<br />Butuhkan Ada di Sini
              </h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Dari pesanan masuk sampai reward pelanggan — semua dikelola dalam satu platform yang mudah digunakan.
              </p>

              <div className="space-y-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: NAVY }}>
                      {f.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm mb-0.5">{f.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US (dark) ════════════════════════════════════════════ */}
      <section id="kenapa" className="py-20 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Kenapa Yummy?</span>
            <h2 className="text-3xl font-extrabold text-white mt-2 mb-3">
              Lebih dari Sekadar Catatan
            </h2>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              Platform yang dirancang khusus untuk bisnis catering, bukan tools generik.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((w, i) => (
              <div key={i} className="rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <div className="text-3xl mb-4">{w.icon}</div>
                <h3 className="font-bold text-white text-sm mb-2">{w.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIAL ═════════════════════════════════════════════════════ */}
      <section id="testimoni" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Sudah Dipercaya</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-3">Kata Pelanggan Kami</h2>
            <p className="text-gray-500 text-sm">Pengalaman nyata dari member Yummy Catering.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
                <div className="flex gap-0.5 text-amber-400 mb-4">
                  {Array.from({ length: t.star }).map((_, j) => <FaStar key={j} className="text-sm" />)}
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed flex-1 mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: NAVY }}>
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

      {/* ══ CTA BANNER (dengan gambar) ══════════════════════════════════════ */}
      <section className="py-0 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden relative"
            style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2d4499 50%, #1a5c3a 100%)` }}>
            {/* Dekorasi */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

            <div className="relative grid md:grid-cols-2 gap-0 items-center">
              <div className="p-10 md:p-14">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                  Siap Mulai Kelola Bisnis<br />Catering Lebih Cerdas?
                </h2>
                <p className="text-white/60 text-sm mb-7 leading-relaxed">
                  Daftar gratis, tidak perlu kartu kredit. Langsung bisa pesan dan kumpulkan reward loyalty.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/member/register"
                    className="px-6 py-3 rounded-xl font-bold text-sm bg-white hover:bg-gray-100 transition text-center"
                    style={{ color: NAVY }}>
                    Daftar Sekarang ✨
                  </Link>
                  <a href={`https://wa.me/6281234567890?text=Halo, saya ingin tahu lebih lanjut tentang Yummy`}
                    target="_blank" rel="noreferrer"
                    className="px-6 py-3 rounded-xl font-bold text-sm border border-white/30 text-white hover:bg-white/10 transition flex items-center justify-center gap-2">
                    <FaWhatsapp /> Hubungi Kami
                  </a>
                </div>
              </div>

              {/* Gambar di dalam CTA banner */}
              <div className="hidden md:block relative h-64 overflow-hidden">
                <img src="/images/feature-order.jpg" alt="Order Catering"
                  className="w-full h-full object-cover opacity-60"
                  onError={(e) => e.target.style.display = "none"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Ada Pertanyaan?</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-3">Pertanyaan Umum</h2>
            <p className="text-gray-500 text-sm">Hal yang sering ditanyakan sebelum memulai.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i}
                className={`rounded-xl border overflow-hidden transition-all ${openFaq === i ? "border-blue-200" : "border-gray-200 bg-white"}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  <span className="ml-4 text-xs text-gray-400 shrink-0"
                    style={{ transition: "transform .2s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-500 leading-relaxed bg-blue-50/30 border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer id="footer" className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 mb-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-7 h-7">
                <div className="absolute top-0 left-0 w-4 h-4 rounded-md bg-green-400 opacity-80" />
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-md" style={{ backgroundColor: NAVY }} />
              </div>
              <span className="font-extrabold text-sm" style={{ color: NAVY }}>Yummy</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Platform CRM untuk bisnis catering. Kelola pelanggan, pesanan, dan loyalty dalam satu tempat.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <p className="font-bold text-gray-700 mb-3 text-xs uppercase tracking-wide">Produk</p>
              <ul className="space-y-2">
                {[["#fitur","Fitur"],["#kenapa","Kenapa Kami"],["/guest","Menu Catering"],["/guest/promo","Promo"]].map(([to,label]) => (
                  <li key={to}>{to.startsWith("#") ? <a href={to} className="text-xs text-gray-400 hover:text-gray-700">{label}</a> : <Link to={to} className="text-xs text-gray-400 hover:text-gray-700">{label}</Link>}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-gray-700 mb-3 text-xs uppercase tracking-wide">Akun</p>
              <ul className="space-y-2">
                {[["/member/login","Login Member"],["/member/register","Daftar Member"],["/login","Admin Login"]].map(([to,label]) => (
                  <li key={to}><Link to={to} className="text-xs text-gray-400 hover:text-gray-700">{label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© 2025 Yummy Catering. All rights reserved.</p>
          <p className="text-xs text-gray-400">Dibuat untuk bisnis catering Indonesia 🍱</p>
        </div>
      </footer>
    </div>
  );
}
