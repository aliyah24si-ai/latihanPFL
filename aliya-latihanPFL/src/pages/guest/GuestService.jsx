import { useState } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import { FaWhatsapp, FaCheckCircle } from "react-icons/fa";

// Nomor WA admin per layanan
const WA_NUMBER = "6281234567890";

const services = [
  {
    id: "order",
    emoji: "🛒",
    name: "Pemesanan Catering",
    desc: "Pesan paket catering untuk acara kamu. Tim kami siap bantu dari konsultasi menu hingga pengiriman.",
    template: "Halo Yummy Catering! Saya ingin memesan catering untuk acara saya. Bisa dibantu?",
    bg: "#DBEAFE",
    color: "#1E40AF",
  },
  {
    id: "consult",
    emoji: "💬",
    name: "Konsultasi Menu",
    desc: "Bingung pilih menu? Konsultasikan kebutuhanmu dengan tim ahli kami secara gratis.",
    template: "Halo Yummy Catering! Saya ingin konsultasi menu untuk acara saya. Bisa dibantu?",
    bg: "#D1FAE5",
    color: "#065F46",
  },
  {
    id: "complaint",
    emoji: "📢",
    name: "Keluhan & Feedback",
    desc: "Ada keluhan atau saran? Kami sangat terbuka untuk masukan demi pelayanan yang lebih baik.",
    template: "Halo Yummy Catering! Saya ingin menyampaikan feedback mengenai layanan kalian.",
    bg: "#FEF3C7",
    color: "#92400E",
  },
  {
    id: "track",
    emoji: "📦",
    name: "Cek Status Order",
    desc: "Ingin tahu status pesananmu? Hubungi kami dengan menyertakan ID order kamu.",
    template: "Halo Yummy Catering! Saya ingin cek status order saya. No. Order: ",
    bg: "#EDE9FE",
    color: "#5B21B6",
  },
  {
    id: "custom",
    emoji: "✨",
    name: "Custom Order",
    desc: "Punya kebutuhan khusus? Kami bisa buat menu custom sesuai selera dan budget kamu.",
    template: "Halo Yummy Catering! Saya tertarik dengan custom order. Boleh minta info lebih lanjut?",
    bg: "#FCE7F3",
    color: "#9D174D",
  },
  {
    id: "bulk",
    emoji: "🏢",
    name: "Kerjasama Perusahaan",
    desc: "Butuh catering rutin untuk kantor? Dapatkan harga spesial dengan kontrak kerjasama.",
    template: "Halo Yummy Catering! Perusahaan kami tertarik untuk kerjasama catering rutin. Bisa info lebih lanjut?",
    bg: "#FEF9C3",
    color: "#713F12",
  },
];

export default function GuestService() {
  const [selected, setSelected] = useState(null);
  const [customMsg, setCustomMsg] = useState("");

  const handleOpen = (svc) => {
    setSelected(svc);
    setCustomMsg(svc.template);
  };

  const handleSend = () => {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(customMsg)}`;
    window.open(url, "_blank");
  };

  return (
    <GuestLayout>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Service Automation</h2>
      <p className="text-gray-500 text-sm mb-2">
        Pilih jenis layanan, pesan otomatis disiapkan — tinggal kirim via WhatsApp.
      </p>

      {/* WA info banner */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl mb-8 text-sm"
        style={{ backgroundColor: "#D1FAE5", color: "#065F46" }}
      >
        <FaWhatsapp className="text-xl text-green-600 shrink-0" />
        <div>
          <p className="font-semibold">Terhubung ke WhatsApp Admin</p>
          <p className="text-xs opacity-80">
            Semua pesan diarahkan ke: <strong>+62 812-3456-7890</strong> — Jam kerja 08.00–17.00 WIB
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {services.map((svc) => (
          <button
            key={svc.id}
            onClick={() => handleOpen(svc)}
            className="text-left bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 group"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
              style={{ backgroundColor: svc.bg }}
            >
              {svc.emoji}
            </div>
            <h3 className="font-bold text-gray-800 mb-1 group-hover:text-navy transition-colors">
              {svc.name}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">{svc.desc}</p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: "#25D366" }}>
              <FaWhatsapp />
              Kirim via WA
            </div>
          </button>
        ))}
      </div>

      {/* Panel pesan WA */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: selected.bg }}
              >
                {selected.emoji}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{selected.name}</h3>
                <p className="text-xs text-gray-500">Edit pesan sesuai kebutuhanmu</p>
              </div>
            </div>

            <textarea
              rows={5}
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm resize-none outline-none focus:ring-2 focus:ring-green-400 mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleSend}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2"
                style={{ backgroundColor: "#25D366" }}
              >
                <FaWhatsapp />
                Kirim via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Cara Kerja Service Automation</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { step: "1", icon: "👆", title: "Pilih Layanan", desc: "Klik kartu layanan sesuai kebutuhanmu" },
            { step: "2", icon: "✏️", title: "Edit Pesan",    desc: "Sesuaikan pesan otomatis jika perlu" },
            { step: "3", icon: "📱", title: "Kirim ke WA",   desc: "Langsung terhubung ke admin kami" },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl mx-auto mb-2 bg-gray-50">
                {s.icon}
              </div>
              <p className="font-semibold text-sm text-gray-800">{s.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </GuestLayout>
  );
}
