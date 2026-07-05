import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaImage } from "react-icons/fa";
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
import { supabase } from "../../services/supabaseClient";

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
  const [menus,     setMenus]     = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState("");
  const [search,    setSearch]    = useState("");
  const [showForm,  setShowForm]  = useState(false);
  const [editId,    setEditId]    = useState(null);
  const [form,      setForm]      = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);    // file yang dipilih
  const [imagePreview, setImagePreview] = useState(""); // preview URL
  const [uploading, setUploading] = useState(false);

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

  // Handle pilih gambar
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Upload gambar ke Supabase Storage
  const uploadImage = async (file) => {
    const ext      = file.name.split(".").pop();
    const fileName = `menu-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("menu-images")
      .upload(fileName, file, { upsert: true });
    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("menu-images").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); setUploading(!!imageFile); setError("");

      let imageUrl = editId
        ? menus.find(m => m.id === editId)?.image_url || null
        : null;

      // Upload gambar baru kalau ada
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        setUploading(false);
      }

      const payload = {
        nama:      form.nama,
        kategori:  form.kategori,
        harga:     Number(form.harga),
        deskripsi: form.deskripsi,
        image_url: imageUrl,
      };

      if (editId) {
        await menusAPI.updateMenu(editId, payload);
        showSuccess("Menu berhasil diupdate!");
      } else {
        await menusAPI.createMenu(payload);
        showSuccess("Menu baru berhasil ditambahkan!");
      }
      setShowForm(false); setForm(emptyForm); setEditId(null);
      setImageFile(null); setImagePreview("");
      load();
    } catch (err) {
      setError("Gagal menyimpan: " + err.message);
      setUploading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (menu) => {
    setForm({ nama: menu.nama, kategori: menu.kategori, harga: String(menu.harga), deskripsi: menu.deskripsi });
    setEditId(menu.id);
    setImageFile(null);
    setImagePreview(menu.image_url || "");
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
    {
      key: "image_url", label: "Foto",
      render: (v, row) => v ? (
        <img src={v} alt={row.nama} className="w-12 h-12 rounded-xl object-cover" />
      ) : (
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
          <FaImage />
        </div>
      ),
    },
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

      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setImageFile(null); setImagePreview(""); }}
        title={editId ? "✏️ Edit Menu" : "🍽️ Tambah Menu Baru"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Nama Menu" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama menu" required />
          <SelectField label="Kategori" name="kategori" value={form.kategori} onChange={handleChange} options={kategoriList} />
          <InputField label="Harga (Rp)" name="harga" type="number" value={form.harga} onChange={handleChange} placeholder="25000" required />
          <InputField label="Deskripsi" name="deskripsi" type="textarea" value={form.deskripsi} onChange={handleChange} placeholder="Deskripsi menu..." rows={3} />

          {/* Upload Foto */}
          <div>
            <label className="block text-sm font-medium text-teks mb-2">Foto Menu</label>

            {/* Preview gambar */}
            {imagePreview && (
              <div className="mb-3 relative inline-block">
                <img src={imagePreview} alt="preview"
                  className="w-full h-40 object-cover rounded-xl border border-garis" />
                <button type="button"
                  onClick={() => { setImageFile(null); setImagePreview(""); }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                  ✕
                </button>
              </div>
            )}

            {/* Input file */}
            <label className={`flex items-center gap-3 px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${imagePreview ? "border-gray-200 bg-gray-50" : "border-blue-200 bg-blue-50 hover:bg-blue-100"}`}>
              <FaImage className="text-blue-400 text-xl shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {imagePreview ? "Ganti foto" : "Pilih foto menu"}
                </p>
                <p className="text-xs text-gray-400">JPG, PNG, WEBP maks. 2MB</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => { setShowForm(false); setImageFile(null); setImagePreview(""); }}>Batal</Button>
            <Button type="submit" disabled={loading || uploading}>
              {uploading ? "Mengupload foto..." : loading ? "Menyimpan..." : editId ? "Update Menu ✨" : "Simpan Menu 🍱"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
