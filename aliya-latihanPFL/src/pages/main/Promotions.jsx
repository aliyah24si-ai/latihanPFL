import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { BsDatabaseExclamation } from "react-icons/bs";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import Tooltip from "../../components/ui/Tooltip";
import { promosAPI } from "../../services/promosAPI";

const targetVariant = { New: "info", Loyal: "warning", VIP: "gold", All: "navy", Gold: "gold", Silver: "silver", Bronze: "bronze" };
const statusVariant = { Aktif: "success", Nonaktif: "default" };
const emptyForm = { nama: "", diskon: "", target: "All", status: "Aktif", keterangan: "", kuota: "100", expiry: "" };

export default function Promotions() {
  const [promos,   setPromos]   = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId,   setEditId]   = useState(null);
  const [form,     setForm]     = useState(emptyForm);

  const load = async () => {
    try {
      setLoading(true); setError("");
      const data = await promosAPI.fetchAll();
      setPromos(data);
    } catch (err) {
      setError("Gagal memuat promo: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const showSuccessMsg = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); setError("");
      const payload = {
        nama:       form.nama,
        diskon:     form.diskon,
        target:     form.target,
        status:     form.status,
        keterangan: form.keterangan,
        kuota:      Number(form.kuota) || 100,
        expiry:     form.expiry,
      };
      if (editId) {
        await promosAPI.update(editId, payload);
        showSuccessMsg("Promo berhasil diupdate!");
      } else {
        await promosAPI.create(payload);
        showSuccessMsg("Promo baru berhasil ditambahkan!");
      }
      setShowForm(false); setForm(emptyForm); setEditId(null);
      load();
    } catch (err) {
      setError("Gagal menyimpan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (promo) => {
    setForm({
      nama: promo.nama, diskon: String(promo.diskon || ""),
      target: promo.target, status: promo.status,
      keterangan: promo.keterangan || "", kuota: String(promo.kuota || 100),
      expiry: promo.expiry || "",
    });
    setEditId(promo.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus promo ini?")) return;
    try {
      setLoading(true);
      await promosAPI.delete(id);
      showSuccessMsg("Promo berhasil dihapus!");
      load();
    } catch (err) {
      setError("Gagal menghapus: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Promotions" breadcrumb={["Promotions"]}>
        <Button icon={<FaPlus />}
          onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}>
          Tambah Promo
        </Button>
      </PageHeader>

      <div className="px-4 space-y-4">
        {error   && <Alert variant="danger"  title="Error"     message={error}   onClose={() => setError("")} />}
        {success && <Alert variant="success" title="Berhasil!" message={success} onClose={() => setSuccess("")} />}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 py-8 justify-center">
            <ImSpinner2 className="animate-spin" style={{ color: "#1e2d6b" }} /> Memuat data...
          </div>
        )}

        {!loading && promos.length === 0 && !error && (
          <div className="py-12 text-center text-gray-400">
            <BsDatabaseExclamation className="text-4xl mx-auto mb-2" />
            <p>Belum ada promo. Tambah promo pertama!</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {promos.map((promo) => (
            <Card key={promo.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-teks">{promo.nama}</p>
                  <p className="text-xs text-teks-samping mt-1">{promo.keterangan}</p>
                </div>
                <div className="flex gap-2 ml-3 shrink-0">
                  <Tooltip text="Edit" position="top">
                    <Button size="sm" variant="ghost" icon={<FaEdit />} onClick={() => handleEdit(promo)} className="!p-2" />
                  </Tooltip>
                  <Tooltip text="Hapus" position="top">
                    <Button size="sm" variant="danger" icon={<FaTrash />} onClick={() => handleDelete(promo.id)} className="!p-2" />
                  </Tooltip>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {promo.diskon && <Badge variant="warning">{promo.diskon}</Badge>}
                <Badge variant={targetVariant[promo.target] || "default"}>{promo.target}</Badge>
                <Badge variant={statusVariant[promo.status] || "default"}>{promo.status}</Badge>
                {promo.kuota && (
                  <Badge variant="info">
                    Kuota: {promo.terpakai || 0}/{promo.kuota}
                  </Badge>
                )}
              </div>
              {promo.expiry && (
                <p className="text-xs text-teks-samping mt-2">s/d {promo.expiry}</p>
              )}
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}
        title={editId ? "✏️ Edit Promo" : "🎁 Tambah Promo Baru"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Nama Promo" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama promo" required />
          <InputField label="Diskon (misal: 15% atau Free Ongkir)" name="diskon" value={form.diskon} onChange={handleChange} placeholder="15% / Free Ongkir" required />
          <SelectField label="Target Member" name="target" value={form.target} onChange={handleChange}
            options={["All","New","Loyal","Gold","Silver","Bronze","VIP"]} />
          <SelectField label="Status" name="status" value={form.status} onChange={handleChange}
            options={["Aktif","Nonaktif"]} />
          <InputField label="Kuota (maks. penerima)" name="kuota" type="number" value={form.kuota} onChange={handleChange} placeholder="100" />
          <InputField label="Berlaku Sampai" name="expiry" value={form.expiry} onChange={handleChange} placeholder="31 Desember 2025" />
          <InputField label="Keterangan" name="keterangan" type="textarea" value={form.keterangan} onChange={handleChange} placeholder="Syarat dan ketentuan..." rows={2} />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Batal</Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : editId ? "Update Promo ✨" : "Simpan Promo 🎁"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
