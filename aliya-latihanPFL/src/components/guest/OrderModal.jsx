import { useState } from "react";
import { BsCheckCircleFill, BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FaMoneyBillWave } from "react-icons/fa";

// Nomor Dana untuk pembayaran — ganti sesuai nomor kamu
const DANA_NUMBER = "0812-3456-7890";

export default function OrderModal({ item, memberProfile, onClose, onSubmit }) {
  const [showDetail, setShowDetail] = useState(true);
  const [form, setForm] = useState({ customer_name: "", phone: "", address: "", quantity: 1, notes: "", payment_option: "dp" });
  const [loading, setLoading]  = useState(false);
  const [success, setSuccess]  = useState("");
  const [error,   setError]    = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const qty        = parseInt(form.quantity) || 1;
  const totalHarga = item.harga * qty;
  const dp         = Math.ceil(totalHarga / 2);
  const bayar      = form.payment_option === "dp" ? dp : totalHarga;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await onSubmit({
        customer_name:  memberProfile ? memberProfile.full_name : form.customer_name,
        phone:          memberProfile ? memberProfile.phone     : form.phone,
        address:        form.address,
        menu_name:      item.nama,
        quantity:       qty,
        total_price:    totalHarga,
        notes:          form.notes,
        payment_status: form.payment_option === "dp" ? "DP - Belum Lunas" : "Lunas",
        status:         "Pending",
      });
      setSuccess(
        `Pesanan berhasil! Silakan transfer ${form.payment_option === "dp" ? "DP" : "pembayaran"} sebesar Rp ${bayar.toLocaleString("id-ID")} ke Dana ${DANA_NUMBER}.`
      );
    } catch (err) {
      setError("Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="px-6 py-4 flex items-center gap-3 text-white shrink-0" style={{ backgroundColor: "#1e2d6b" }}>
          <div>
            <p className="font-bold">{item.nama}</p>
            <p className="text-xs text-white/70">Rp {Number(item.harga).toLocaleString("id-ID")} / porsi</p>
          </div>
          {!success && (
            <div className="ml-auto flex gap-2">
              <button onClick={() => setShowDetail(true)}
                className={`text-xs px-3 py-1 rounded-lg font-semibold ${showDetail ? "bg-white" : "bg-white/20 text-white"}`}
                style={showDetail ? { color: "#1e2d6b" } : {}}>Detail</button>
              <button onClick={() => setShowDetail(false)}
                className={`text-xs px-3 py-1 rounded-lg font-semibold ${!showDetail ? "bg-white" : "bg-white/20 text-white"}`}
                style={!showDetail ? { color: "#1e2d6b" } : {}}>Pesan</button>
            </div>
          )}
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {/* Success state */}
          {success ? (
            <div className="text-center py-4">
              <BsCheckCircleFill className="text-5xl text-green-500 mx-auto mb-3" />
              <p className="font-bold text-gray-800 mb-2">Pesanan Terkirim! 🎉</p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaMoneyBillWave className="text-amber-500" />
                  <p className="font-semibold text-amber-800 text-sm">Info Pembayaran</p>
                </div>
                <p className="text-sm text-gray-700">{success}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Setelah transfer, pesananmu akan diproses. Konfirmasi via WA jika perlu.
                </p>
              </div>
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm"
                style={{ backgroundColor: "#1e2d6b" }}>Tutup</button>
            </div>

          ) : showDetail ? (
            /* Detail tab */
            <div className="space-y-4">
              {item.deskripsi && <p className="text-sm text-gray-600">{item.deskripsi}</p>}
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-blue-700 mb-1">Kategori</p>
                <p className="text-sm text-gray-800">{item.kategori}</p>
              </div>
              <button onClick={() => setShowDetail(false)}
                className="w-full py-2.5 rounded-xl text-white font-semibold text-sm"
                style={{ backgroundColor: "#1e2d6b" }}>Pesan Sekarang →</button>
            </div>

          ) : (
            /* Form pesan */
            <form onSubmit={handleSubmit} className="space-y-3">
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                  <BsFillExclamationDiamondFill className="shrink-0" /> {error}
                </div>
              )}

              {/* Info member atau input manual */}
              {memberProfile ? (
                <div className="bg-blue-50 rounded-xl px-4 py-3 text-sm text-blue-700 border border-blue-200">
                  <p className="font-semibold">Memesan sebagai member</p>
                  <p className="text-xs">{memberProfile.full_name} · {memberProfile.phone}</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nama Lengkap *</label>
                    <input name="customer_name" value={form.customer_name} onChange={handleChange}
                      placeholder="Nama pemesan" required disabled={loading}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">No. WhatsApp *</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      placeholder="08xxxxxxxxxx" required disabled={loading}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60" />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Alamat Pengiriman *</label>
                <textarea name="address" value={form.address} onChange={handleChange}
                  placeholder="Jl. ..." required disabled={loading} rows={2}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 resize-none disabled:opacity-60" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Jumlah Porsi *</label>
                <input name="quantity" type="number" min={1} value={form.quantity}
                  onChange={handleChange} required disabled={loading}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Catatan (opsional)</label>
                <input name="notes" value={form.notes} onChange={handleChange}
                  placeholder="Alergi, permintaan khusus..." disabled={loading}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60" />
              </div>

              {/* Opsi pembayaran */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Opsi Pembayaran</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "dp",    label: "DP (50%)",    sub: `Rp ${dp.toLocaleString("id-ID")}`,          desc: "Proses lebih cepat" },
                    { value: "lunas", label: "Lunas (100%)", sub: `Rp ${totalHarga.toLocaleString("id-ID")}`, desc: "Prioritas utama" },
                  ].map((opt) => (
                    <label key={opt.value}
                      className={`cursor-pointer rounded-xl border-2 p-3 transition-all ${form.payment_option === opt.value ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50"}`}>
                      <input type="radio" name="payment_option" value={opt.value}
                        checked={form.payment_option === opt.value}
                        onChange={handleChange} className="sr-only" />
                      <p className="text-xs font-bold text-gray-800">{opt.label}</p>
                      <p className="text-sm font-extrabold" style={{ color: "#1e2d6b" }}>{opt.sub}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Info Dana */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <FaMoneyBillWave className="text-amber-500 shrink-0" />
                  <p className="text-xs font-bold text-amber-800">Transfer ke Dana</p>
                </div>
                <p className="text-base font-extrabold text-gray-800">{DANA_NUMBER}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Transfer <strong>Rp {bayar.toLocaleString("id-ID")}</strong> setelah checkout.
                  Konfirmasi via WA agar pesanan segera diproses.
                </p>
              </div>

              {/* Ringkasan */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl text-sm" style={{ backgroundColor: "#EEF2FF" }}>
                <span className="text-gray-600">{qty} porsi × Rp {Number(item.harga).toLocaleString("id-ID")}</span>
                <span className="font-bold" style={{ color: "#1e2d6b" }}>Rp {totalHarga.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={onClose} disabled={loading}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60">
                  Batal
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ backgroundColor: "#1e2d6b" }}>
                  {loading ? <><ImSpinner2 className="animate-spin" />Mengirim...</> : "Kirim Pesanan"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
