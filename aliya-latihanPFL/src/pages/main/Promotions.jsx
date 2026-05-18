import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import Card from "../../components/ui/Card";
import Alert from "../../components/ui/Alert";
import Tooltip from "../../components/ui/Tooltip";

const initialPromos = [
  { id: 1, nama: "Diskon Paket Harian", diskon: 15, target: "New", status: "Aktif", keterangan: "Khusus pelanggan baru, min. order 5 porsi" },
  { id: 2, nama: "Free Ongkir Loyal", diskon: 0, target: "Loyal", status: "Aktif", keterangan: "Gratis ongkir untuk pelanggan loyal" },
  { id: 3, nama: "VIP Cashback 20%", diskon: 20, target: "VIP", status: "Aktif", keterangan: "Cashback 20% untuk member VIP" },
  { id: 4, nama: "Promo Lebaran", diskon: 25, target: "All", status: "Nonaktif", keterangan: "Diskon spesial hari raya" },
];

const targetVariant = { New: "info", Loyal: "warning", VIP: "gold", All: "navy" };
const statusVariant = { Aktif: "success", Nonaktif: "default" };

export default function Promotions() {
  const [promos, setPromos] = useState(initialPromos);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [form, setForm] = useState({ nama: "", diskon: "", target: "New", status: "Aktif", keterangan: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setPromos(promos.map((p) => p.id === editId ? { ...p, ...form, diskon: Number(form.diskon) } : p));
      setEditId(null);
    } else {
      setPromos([...promos, { id: Date.now(), ...form, diskon: Number(form.diskon) }]);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
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
        <Button
          icon={<FaPlus />}
          onClick={() => { setShowForm(true); setEditId(null); setForm({ nama: "", diskon: "", target: "New", status: "Aktif", keterangan: "" }); }}
        >
          Tambah Promo
        </Button>
      </PageHeader>

      <div className="px-4 space-y-4">
        {showAlert && (
          <Alert
            variant="success"
            title="Promo berhasil ditambahkan!"
            message="Promo baru sudah aktif dan bisa digunakan."
            onClose={() => setShowAlert(false)}
          />
        )}

        {/* Promo Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {promos.map((promo) => (
            <Card key={promo.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-teks">{promo.nama}</p>
                  <p className="text-xs text-teks-samping mt-1">{promo.keterangan}</p>
                </div>
                <div className="flex gap-2 ml-3 shrink-0">
                  <Tooltip text="Edit promo" position="top">
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<FaEdit />}
                      onClick={() => handleEdit(promo)}
                      className="!p-2"
                    />
                  </Tooltip>
                  <Tooltip text="Hapus promo" position="top">
                    <Button
                      size="sm"
                      variant="danger"
                      icon={<FaTrash />}
                      onClick={() => handleDelete(promo.id)}
                      className="!p-2"
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {promo.diskon > 0 && (
                  <Badge variant="warning">-{promo.diskon}%</Badge>
                )}
                <Badge variant={targetVariant[promo.target] || "default"}>{promo.target}</Badge>
                <Badge variant={statusVariant[promo.status] || "default"}>{promo.status}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editId ? "✏️ Edit Promo" : "🎁 Tambah Promo Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nama Promo"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama promo"
            required
          />
          <InputField
            label="Diskon (%)"
            name="diskon"
            type="number"
            value={form.diskon}
            onChange={handleChange}
            placeholder="0 jika bukan diskon %"
            required
          />
          <SelectField
            label="Target Customer"
            name="target"
            value={form.target}
            onChange={handleChange}
            options={[
              { value: "New", label: "New" },
              { value: "Loyal", label: "Loyal" },
              { value: "VIP", label: "VIP" },
              { value: "All", label: "Semua" },
            ]}
          />
          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={["Aktif", "Nonaktif"]}
          />
          <InputField
            label="Keterangan"
            name="keterangan"
            type="textarea"
            value={form.keterangan}
            onChange={handleChange}
            placeholder="Syarat dan ketentuan promo..."
            rows={2}
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Batal</Button>
            <Button type="submit">{editId ? "Update Promo ✨" : "Simpan Promo 🎁"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
