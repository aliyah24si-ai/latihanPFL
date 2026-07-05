import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { BsDatabaseExclamation } from "react-icons/bs";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import SearchBar from "../../components/ui/SearchBar";
import Alert from "../../components/ui/Alert";
import Tooltip from "../../components/ui/Tooltip";
import { menusAPI } from "../../services/menusAPI";

const kategoriList = ["Paket Nasi", "Snack Box", "Cookies & Dessert", "Minuman", "Menu Spesial"];
const kategoriVariant = {
  "Paket Nasi":        "success",
  "Snack Box":         "info",
  "Cookies & Dessert": "warning",
  "Minuman":           "navy",
  "Menu Spesial":      "danger",
};

const emptyForm = { nama: "", kategori: "Paket Nasi", harga: "", deskripsi: "" };

export default function MenuManagement() {
  const [menus,   setMenus]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [search,  setSearch]  = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId,   setEditId]   = useState(null);
  const [form,     setForm]     = useState(emptyForm);

  const load = async () => {
    try {
      setLoading(true); setError("");
      const data = await menusAPI.fetchMenus();
      setMenus(data);
    } catch (err) {
      setError("Gagal memuat menu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const showSuccess = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); setError("");
      const payload = { nama: form.nama, kategori: form.kategori, harga: Number(form.harga), deskripsi: form.deskripsi };
      if (editId) {
        await menusAPI.updateMenu(editId, payload);
        showSuccess("Menu berhasil diupdate!");
      } else {
        await menusAPI.createMenu(payload);
        showSuccess("Menu baru berhasil ditambahkan!");
      }
      setShowForm(false); setForm(emptyForm); setEditId(null);
      load();
    } catch (err) {
      setError("Gagal menyimpan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (menu) => {
    setForm({ nama: menu.nama, kategori: menu.kategori, harga: String(menu.harga), deskripsi: menu.deskripsi });
    setEditId(menu.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus menu ini?")) return;
    try {
      setLoading(true);
      await menusAPI.deleteMenu(id);
      showSuccess("Menu berhasil dihapus!");
      load();
    } catch (err) {
      setError("Gagal menghapus: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filtered = menus.filter(
    m => m.nama?.toLowerCase().includes(search.toLowerCase()) ||
         m.kategori?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "nama",     label: "Nama Menu",  render: (v) => <span className="font-semibold text-teks text-sm">{v}</span> },
    { key: "kategori", label: "Kategori",   render: (v) => <Badge variant={kategoriVariant[v] || "default"}>{v}</Badge> },
    { key: "harga",    label: "Harga",      render: (v) => <span className="font-semibold text-sm">Rp {Number(v).toLocaleString("id-ID")}</span> },
    { key: "deskripsi",label: "Deskripsi",  render: (v) => <span className="text-xs text-teks-samping line-clamp-1 max-w-xs block">{v}</span> },
    {
      key: "id", label: "Aksi",
      render: (_, row) => (
        <div className="flex gap-2">
          <Tooltip text="Edit" position="top">
            <Button size="sm" variant="ghost" icon={<FaEdit />} onClick={() => handleEdit(row)} className="!p-2" />
          </Tooltip>
          <Tooltip text="Hapus" position="top">
            <Button size="sm" variant="danger" icon={<FaTrash />} onClick={() => handleDelete(row.id)} disabled={loading} className="!p-2" />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Menu Management" breadcrumb={["Menu"]}>
        <Button icon={<FaPlus />}
          onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}>
          Tambah Menu
        </Button>
      </PageHeader>

      <div className="px-4 space-y-3">
        {error   && <Alert variant="danger"  title="Error"     message={error}   onClose={() => setError("")} />}
        {success && <Alert variant="success" title="Berhasil!" message={success} onClose={() => setSuccess("")} />}

        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")} placeholder="Cari nama menu atau kategori..."
          className="max-w-sm" />

        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 py-8 justify-center">
            <ImSpinner2 className="animate-spin" style={{ color: "#1e2d6b" }} /> Memuat data...
          </div>
        )}

        {!loading && menus.length === 0 && !error && (
          <div className="py-12 text-center text-gray-400">
            <BsDatabaseExclamation className="text-4xl mx-auto mb-2" />
            <p>Belum ada menu. Tambah menu pertama!</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <Table columns={columns} data={filtered} emptyMessage="Tidak ada menu ditemukan" />
        )}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}
        title={editId ? "✏️ Edit Menu" : "🍽️ Tambah Menu Baru"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Nama Menu" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama menu" required />
          <SelectField label="Kategori" name="kategori" value={form.kategori} onChange={handleChange} options={kategoriList} />
          <InputField label="Harga (Rp)" name="harga" type="number" value={form.harga} onChange={handleChange} placeholder="25000" required />
          <InputField label="Deskripsi" name="deskripsi" type="textarea" value={form.deskripsi} onChange={handleChange} placeholder="Deskripsi menu..." rows={3} />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Batal</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : editId ? "Update Menu ✨" : "Simpan Menu 🍱"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
