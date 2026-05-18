import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import SearchBar from "../../components/ui/SearchBar";
import Tooltip from "../../components/ui/Tooltip";

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

const kategoriVariant = {
  "Paket Nasi": "success",
  "Snack Box": "info",
  "Cookies & Dessert": "warning",
  "Minuman": "navy",
  "Menu Spesial": "danger",
};

export default function MenuManagement() {
  const [menus, setMenus] = useState(initialMenus);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ nama: "", kategori: "Paket Nasi", harga: "", deskripsi: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setMenus(menus.map((m) => m.id === editId ? { ...m, ...form, harga: Number(form.harga) } : m));
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

  const filtered = menus.filter(
    (m) =>
      m.nama.toLowerCase().includes(search.toLowerCase()) ||
      m.kategori.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "nama", label: "Nama Menu",
      render: (v) => <span className="font-semibold text-teks text-sm">{v}</span>,
    },
    {
      key: "kategori", label: "Kategori",
      render: (v) => <Badge variant={kategoriVariant[v] || "default"}>{v}</Badge>,
    },
    {
      key: "harga", label: "Harga",
      render: (v) => (
        <span className="font-semibold text-teks text-sm">
          Rp {Number(v).toLocaleString("id-ID")}
        </span>
      ),
    },
    {
      key: "deskripsi", label: "Deskripsi",
      render: (v) => (
        <span className="text-xs text-teks-samping line-clamp-1 max-w-xs block">{v}</span>
      ),
    },
    {
      key: "id", label: "Aksi",
      render: (_, row) => (
        <div className="flex gap-2">
          <Tooltip text="Edit menu" position="top">
            <Button
              size="sm"
              variant="ghost"
              icon={<FaEdit />}
              onClick={() => handleEdit(row)}
              className="!p-2"
            />
          </Tooltip>
          <Tooltip text="Hapus menu" position="top">
            <Button
              size="sm"
              variant="danger"
              icon={<FaTrash />}
              onClick={() => handleDelete(row.id)}
              className="!p-2"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Menu Management" breadcrumb={["Menu"]}>
        <Button
          icon={<FaPlus />}
          onClick={() => { setShowForm(true); setEditId(null); setForm({ nama: "", kategori: "Paket Nasi", harga: "", deskripsi: "" }); }}
        >
          Tambah Menu
        </Button>
      </PageHeader>

      <div className="px-4 space-y-3">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Cari nama menu atau kategori..."
          className="max-w-sm"
        />
        <Table columns={columns} data={filtered} emptyMessage="Tidak ada menu ditemukan" />
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editId ? "✏️ Edit Menu" : "🍽️ Tambah Menu Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nama Menu"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama menu"
            required
          />
          <SelectField
            label="Kategori"
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            options={kategoriList}
          />
          <InputField
            label="Harga (Rp)"
            name="harga"
            type="number"
            value={form.harga}
            onChange={handleChange}
            placeholder="Contoh: 25000"
            required
          />
          <InputField
            label="Deskripsi"
            name="deskripsi"
            type="textarea"
            value={form.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi menu..."
            rows={3}
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Batal</Button>
            <Button type="submit">{editId ? "Update Menu ✨" : "Simpan Menu 🍱"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
