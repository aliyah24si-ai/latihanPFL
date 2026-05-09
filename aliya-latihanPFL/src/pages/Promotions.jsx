import { useState } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

const initialPromos = [
  { id: 1, nama: "Diskon Paket Harian", diskon: 15, target: "New",   status: "Aktif",     keterangan: "Khusus pelanggan baru, min. order 5 porsi" },
  { id: 2, nama: "Free Ongkir Loyal",   diskon: 0,  target: "Loyal", status: "Aktif",     keterangan: "Gratis ongkir untuk pelanggan loyal" },
  { id: 3, nama: "VIP Cashback 20%",    diskon: 20, target: "VIP",   status: "Aktif",     keterangan: "Cashback 20% untuk member VIP" },
  { id: 4, nama: "Promo Lebaran",       diskon: 25, target: "All",   status: "Nonaktif",  keterangan: "Diskon spesial hari raya" },
];

const targetColor = {
  New:   { bg: "#80b0e8", color: "#1a3a5c" },
  Loyal: { bg: "#d6d35f", color: "#3a3a00" },
  VIP:   { bg: "#f4d242", color: "#5a4000" },
  All:   { bg: "#d1caea", color: "#4a3a6b" },
};

const statusStyle = {
  Aktif:    { bg: "#008471", color: "white" },
  Nonaktif: { bg: "#e5e7eb", color: "#6b7280" },
};

export default function Promotions() {
  const [promos, setPromos] = useState(initialPromos);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    nama: "", diskon: "", target: "New", status: "Aktif", keterangan: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setPromos(promos.map((p) => p.id === editId ? { ...p, ...form, diskon: Number(form.diskon) } : p));
      setEditId(null);
    } else {
      setPromos([...promos, { id: Date.now(), ...form, diskon: Number(form.diskon) }]);
    }
    setForm({ nama: "", diskon: "", target: "New", status: "Aktif", keterangan: "" });
    setShowForm(false);
  };

  const handleEdit = (promo) => {
    setForm({ nama: promo.nama, diskon: String(promo.diskon), target: promo.target, status: promo.status, keterangan: promo.keterangan });
    setEditId(promo.id);
    setShowForm(true);
  };

  const handleDelete = (id) => setPromos(promos.filter((p) => p.id !== id));

  return (
    <div>
      <PageHeader title="Promotions" breadcrumb={["Promotions"]}>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ nama: "", diskon: "", target: "New", status: "Aktif", keterangan: "" }); }}
          className="px-4 py-2 rounded-xl flex items-center gap-2 font-semibold text-sm"
          style={{ backgroundColor: "#f29cc3", color: "#6b3a52" }}
        >
          <FaPlus /> Tambah Promo
        </button>
      </PageHeader>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FaTimes />
            </button>
            <h3 className="text-xl font-poppins font-bold text-gray-800 mb-6">
              {editId ? "✏️ Edit Promo" : "🎁 Tambah Promo Baru"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Promo</label>
                <input name="nama" value={form.nama} onChange={handleChange} required placeholder="Nama promo" className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-hijau text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diskon (%)</label>
                <input name="diskon" type="number" value={form.diskon} onChange={handleChange} required placeholder="0 jika bukan diskon %" className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-hijau text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Customer</label>
                <select name="target" value={form.target} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-hijau text-sm">
                  <option value="New">New</option>
                  <option value="Loyal">Loyal</option>
                  <option value="VIP">VIP</option>
                  <option value="All">Semua</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-hijau text-sm">
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                <textarea name="keterangan" value={form.keterangan} onChange={handleChange} rows={2} placeholder="Syarat dan ketentuan promo..." className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-hijau text-sm resize-none" />
              </div>
              <button type="submit" className="w-full py-2 rounded-xl font-semibold text-sm" style={{ backgroundColor: "#f29cc3", color: "#6b3a52" }}>
                {editId ? "Update Promo ✨" : "Simpan Promo 🎁"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cards Promo */}
      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4 px-4">
        {promos.map((promo) => (
          <div key={promo.id} className="bg-white rounded-3xl shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-poppins font-semibold text-gray-800">{promo.nama}</p>
                <p className="text-xs text-gray-400 mt-1">{promo.keterangan}</p>
              </div>
              <div className="flex gap-2 ml-3 shrink-0">
                <button onClick={() => handleEdit(promo)} className="p-2 rounded-xl text-xs" style={{ backgroundColor: "#d1caea", color: "#4a3a6b" }}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(promo.id)} className="p-2 rounded-xl text-xs" style={{ backgroundColor: "#ffc0c0", color: "#7a2a2a" }}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap mt-3">
              {promo.diskon > 0 && (
                <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ backgroundColor: "#d6d35f", color: "#3a3a00" }}>
                  -{promo.diskon}%
                </span>
              )}
              <span className="text-xs px-3 py-1 rounded-full font-semibold" style={targetColor[promo.target]}>
                {promo.target}
              </span>
              <span className="text-xs px-3 py-1 rounded-full font-semibold" style={statusStyle[promo.status]}>
                {promo.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
