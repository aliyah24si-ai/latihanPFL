import { useState } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import { ordersAPI } from "../../services/ordersAPI";
import { BsCheckCircleFill, BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

const menuItems = [
  {
    name: "Paket Harian",
    desc: "Menu lengkap nasi + lauk + sayur untuk kebutuhan harian. Cocok untuk kantor dan acara keluarga.",
    price: 25000,
    emoji: "🍱",
    tag: "Terlaris",
    tagColor: "#D1FAE5",
    tagText: "#065F46",
  },
  {
    name: "Paket Premium",
    desc: "Menu eksklusif dengan pilihan lauk premium, cocok untuk acara formal dan rapat penting.",
    price: 55000,
    emoji: "🥘",
    tag: "Premium",
    tagColor: "#FEF3C7",
    tagText: "#92400E",
  },
  {
    name: "Snack Box",
    desc: "Kotak snack berisi kue tradisional dan camilan pilihan, pas untuk seminar dan gathering.",
    price: 18000,
    emoji: "🧁",
    tag: "Populer",
    tagColor: "#EDE9FE",
    tagText: "#5B21B6",
  },
  {
    name: "Cookies Box",
    desc: "Kue kering premium berbagai rasa, dikemas cantik. Ideal untuk hampers dan souvenir.",
    price: 45000,
    emoji: "🍪",
    tag: "Hampers",
    tagColor: "#FCE7F3",
    tagText: "#9D174D",
  },
  {
    name: "Nasi Tumpeng Mini",
    desc: "Tumpeng mini lengkap dengan lauk pauk tradisional, cocok untuk syukuran dan ulang tahun.",
    price: 150000,
    emoji: "🎂",
    tag: "Spesial",
    tagColor: "#DBEAFE",
    tagText: "#1E40AF",
  },
  {
    name: "Paket Vegetarian",
    desc: "Menu sehat bebas daging dengan sayuran segar pilihan dan protein nabati berkualitas.",
    price: 30000,
    emoji: "🥗",
    tag: "Sehat",
    tagColor: "#D1FAE5",
    tagText: "#065F46",
  },
];

const emptyForm = {
  customer_name: "",
  phone: "",
  address: "",
  quantity: 1,
  notes: "",
};

export default function GuestMenu() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [form, setForm]   = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError]   = useState("");

  const handleOpen = (item) => {
    setSelectedMenu(item);
    setForm(emptyForm);
    setSuccess("");
    setError("");
  };

  const handleClose = () => {
    setSelectedMenu(null);
    setSuccess("");
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const qty   = parseInt(form.quantity) || 1;
      const total = selectedMenu.price * qty;

      await ordersAPI.createOrder({
        customer_name: form.customer_name,
        phone:         form.phone,
        address:       form.address,
        menu_name:     selectedMenu.name,
        quantity:      qty,
        total_price:   total,
        notes:         form.notes,
        status:        "Pending",
      });

      setSuccess(
        `Pesanan ${selectedMenu.name} berhasil dikirim! Admin akan segera menghubungi kamu.`
      );
      setForm(emptyForm);
    } catch (err) {
      setError("Gagal mengirim pesanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const qty   = parseInt(form.quantity) || 1;
  const total = selectedMenu ? selectedMenu.price * qty : 0;

  return (
    <GuestLayout>
      {/* Hero */}
      <div
        className="rounded-3xl p-8 md:p-12 mb-10 text-white text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e2d6b 0%, #2d4499 60%, #1a6b4a 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                background: "white",
                top: `${i * 15}%`,
                left: `${i * 18 - 5}%`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <p className="text-green-300 text-sm font-semibold mb-2 uppercase tracking-widest">
            Catering Terpercaya
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Yummy Catering 🍱</h1>
          <p className="text-white/80 text-sm md:text-base max-w-lg mx-auto">
            Kami menyajikan makanan lezat berkualitas untuk berbagai acara. Pesan sekarang dan
            rasakan bedanya!
          </p>
        </div>
      </div>

      {/* Menu Grid */}
      <h2 className="text-xl font-bold text-gray-800 mb-5">Menu Kami</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {menuItems.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Gambar placeholder */}
            <div
              className="h-36 flex items-center justify-center text-6xl"
              style={{ background: "linear-gradient(135deg, #f8fafc, #e2e8f0)" }}
            >
              {item.emoji}
            </div>

            <div className="p-4">
              <span
                className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2"
                style={{ backgroundColor: item.tagColor, color: item.tagText }}
              >
                {item.tag}
              </span>

              <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{item.desc}</p>

              <div className="flex items-center justify-between">
                <span className="font-bold text-sm" style={{ color: "#1e2d6b" }}>
                  Rp {item.price.toLocaleString("id-ID")} / porsi
                </span>
                <button
                  onClick={() => handleOpen(item)}
                  className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold transition hover:opacity-90"
                  style={{ backgroundColor: "#1e2d6b" }}
                >
                  Pesan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal Form Pemesanan ─────────────────────────────────────── */}
      {selectedMenu && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

            {/* Header modal */}
            <div
              className="px-6 py-4 flex items-center gap-3 text-white"
              style={{ backgroundColor: "#1e2d6b" }}
            >
              <span className="text-3xl">{selectedMenu.emoji}</span>
              <div>
                <p className="font-bold">{selectedMenu.name}</p>
                <p className="text-xs text-white/70">
                  Rp {selectedMenu.price.toLocaleString("id-ID")} / porsi
                </p>
              </div>
            </div>

            <div className="p-6">
              {/* Success state */}
              {success ? (
                <div className="text-center py-4">
                  <BsCheckCircleFill className="text-5xl text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-gray-800 mb-1">Pesanan Terkirim!</p>
                  <p className="text-sm text-gray-500 mb-5">{success}</p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm"
                    style={{ backgroundColor: "#1e2d6b" }}
                  >
                    Tutup
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                      <BsFillExclamationDiamondFill className="shrink-0" />
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Nama Lengkap <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="customer_name"
                      value={form.customer_name}
                      onChange={handleChange}
                      placeholder="Nama pemesan"
                      required
                      disabled={loading}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      No. WhatsApp <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="08xxxxxxxxxx"
                      required
                      disabled={loading}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Alamat Pengiriman <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Jl. ..."
                      required
                      disabled={loading}
                      rows={2}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 resize-none disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Jumlah Porsi <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="quantity"
                      type="number"
                      min={1}
                      value={form.quantity}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Catatan (opsional)
                    </label>
                    <input
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Alergi, permintaan khusus, dll..."
                      disabled={loading}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
                    />
                  </div>

                  {/* Ringkasan harga */}
                  <div
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm"
                    style={{ backgroundColor: "#EEF2FF" }}
                  >
                    <span className="text-gray-600">
                      {qty} porsi × Rp {selectedMenu.price.toLocaleString("id-ID")}
                    </span>
                    <span className="font-bold" style={{ color: "#1e2d6b" }}>
                      Rp {total.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={loading}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                      style={{ backgroundColor: "#1e2d6b" }}
                    >
                      {loading ? (
                        <>
                          <ImSpinner2 className="animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        "Kirim Pesanan"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </GuestLayout>
  );
}
