import { useState } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

const initialMenus = [
  { id: 1, nama: "Paket Harian", kategori: "Paket Nasi", harga: 25000, deskripsi: "Nasi putih, ayam goreng, tumis sayur, sambal, kerupuk" },
  { id: 2, nama: "Paket Premium", kategori: "Paket Nasi", harga: 55000, deskripsi: "Nasi liwet, ayam bakar madu, capcay, telur balado, buah potong" },
  { id: 3, nama: "Paket Sehat", kategori: "Paket Nasi", harga: 45000, deskripsi: "Nasi merah, ayam grill, sayur rebus, tanpa gorengan" },
  { id: 4, nama: "Snack Box Standar", kategori: "Snack Box", harga: 20000, deskripsi: "Risoles, kue basah, air mineral" },
  { id: 5, nama: "Choco Chip Cookies", kategori: "Cookies & Dessert", harga: 35000, deskripsi: "Cookies premium dengan choco chip pilihan" },
  { id: 6, nama: "Dessert Box Tiramisu", kategori: "Cookies & Dessert", harga: 40000, deskripsi: "Dessert box tiramisu lembut dan creamy" },
  { id: 7, nama: "Jus Buah Segar", kategori: "Minuman", harga: 12000, deskripsi: "Jus jeruk, melon, atau alpukat" },
  { id: 8, nama: "Ayam Sambal Matah", kategori: "Menu Spesial", harga: 35000, deskripsi: "Signature dish dengan sambal matah segar" },
];

const kategoriList = ["Paket Nasi", "Snack Box", "Cookies & Dessert", "Minuman", "Menu Spesial"];

const kategoriColor = {
  "Paket Nasi":       "bg-hijau/20 text-hijau",
  "Snack Box":        "bg-biru-muda/30 text-biru-muda",
  "Cookies & Dessert":"bg-pink/40 text-pink",
  "Minuman":          "bg-ungu/50 text-gray-600",
  "Menu Spesial":     "bg-sun/30 text-yellow-700",
};

export default function MenuManagement() {
  const [menus, setMenus] = useState(initialMenus);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ nama: "", kategori: "Paket Nasi", harga: "", deskripsi: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setMenus(menus.map((m) => (m.id === editId ? { ...m, ...form, harga: Number(form.harga) } : m)));
      setEditId(null);
    } else {
      setMenus([...menus, { id: Date.now(), ...form, harga: Number(form.harga) }]);
    }
    setForm({ nama: "", kategori: "Paket Nasi", harga: "", deskripsi: "" });
    setShowForm(false);
  };

  const handleEdit = (menu) => {
    setForm({ nama: menu.nama, kategori: menu.kategori, harga: String(menu.harga), deskripsi: menu.deskripsi });
    setEditId(menu.id);
    setShowForm(true);
  };

  const handleDelete = (id) => setMenus(menus.filter((m) => m.id !== id));

  return (
    <div>
      <PageHeader title="Menu Management" breadcrumb={["Menu"]}>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ nama: "", kategori: "Paket Nasi", harga: "", deskripsi: "" }); }}
          className="px-4 py-2 rounded-xl flex items-center gap-2 font-semibold text-sm"
          style={{ backgroundColor: "#d6d35f", color: "#3a3a00" }}
        >
          <FaPlus /> Tambah Menu
        </button>
      </PageHeader>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold text-teks mb-6">
              {editId ? "✏️ Edit Menu" : "🍽️ Tambah Menu Baru"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Menu</label>
                <input name="nama" value={form.nama} onChange={handleChange} required placeholder="Nama menu" className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select name="kategori" value={form.kategori} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau">
                  {kategoriList.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                <input name="harga" type="number" value={form.harga} onChange={handleChange} required placeholder="Contoh: 25000" className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} rows={3} placeholder="Deskripsi menu..." className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau resize-none" />
              </div>
              <button type="submit"
                className="w-full py-2 rounded-xl font-semibold text-sm"
                style={{ backgroundColor: "#d6d35f", color: "#3a3a00" }}>
                {editId ? "Update Menu ✨" : "Simpan Menu 🍱"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tabel */}
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Nama Menu", "Kategori", "Harga", "Deskripsi", "Aksi"].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {menus.map((menu) => (
                <tr key={menu.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-gray-800">{menu.nama}</td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${kategoriColor[menu.kategori]}`}>{menu.kategori}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-700">Rp {menu.harga.toLocaleString("id-ID")}</td>
                  <td className="px-5 py-3 text-gray-500 max-w-xs truncate">{menu.deskripsi}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(menu)} className="p-2 bg-ungu/40 text-gray-600 rounded-lg hover:bg-ungu">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(menu.id)} className="p-2 bg-peach/50 text-tomato rounded-lg hover:bg-peach">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
