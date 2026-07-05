import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { BsDatabaseExclamation } from "react-icons/bs";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import SelectField from "../../components/ui/SelectField";
import SearchBar from "../../components/ui/SearchBar";
import Avatar from "../../components/ui/Avatar";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import { ordersAPI } from "../../services/ordersAPI";

const statusBadge      = { Completed: "success", Pending: "warning", Cancelled: "danger" };
const paymentBadge     = {
  "Lunas":           "success",
  "DP - Belum Lunas":"warning",
  "Belum Bayar":     "danger",
};

export default function Orders() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [search,  setSearch]  = useState("");
  const [editRow, setEditRow] = useState(null);
  const [editStatus,  setEditStatus]  = useState("Pending");
  const [editPayment, setEditPayment] = useState("Belum Bayar");

  const loadOrders = async () => {
    try {
      setLoading(true); setError("");
      const data = await ordersAPI.fetchOrders();
      setOrders(data);
    } catch (err) { setError("Gagal memuat: " + err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadOrders(); }, []);

  const showSuccess = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); };

  const handleUpdateAll = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ordersAPI.updateStatus(editRow.id, editStatus);
      await ordersAPI.updatePaymentStatus(editRow.id, editPayment);
      showSuccess("Order berhasil diupdate!");
      setEditRow(null); loadOrders();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus order ini?")) return;
    try {
      setLoading(true);
      await ordersAPI.deleteOrder(id);
      showSuccess("Order berhasil dihapus!"); loadOrders();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const filtered = orders.filter(o =>
    o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    o.menu_name?.toLowerCase().includes(search.toLowerCase()) ||
    String(o.id).includes(search)
  );

  const columns = [
    { key: "id",            label: "Order ID",  render: (v) => <span className="font-mono text-xs text-teks-samping">#{v}</span> },
    { key: "customer_name", label: "Customer",  render: (v) => (
        <div className="flex items-center gap-2">
          <Avatar name={v || "?"} size="sm" />
          <span className="font-medium text-sm">{v}</span>
        </div>
      )
    },
    { key: "menu_name",   label: "Menu",   render: (v) => <span className="text-sm">{v}</span> },
    { key: "quantity",    label: "Qty",    render: (v) => <span className="text-sm font-semibold">{v} porsi</span> },
    { key: "total_price", label: "Total",  render: (v) => <span className="font-semibold text-sm">Rp {Number(v).toLocaleString("id-ID")}</span> },
    {
      key: "status", label: "Status Order",
      render: (v, row) => (
        <button onClick={() => { setEditRow(row); setEditStatus(row.status); setEditPayment(row.payment_status || "Belum Bayar"); }}>
          <Badge variant={statusBadge[v] || "default"} className="cursor-pointer hover:opacity-80">{v}</Badge>
        </button>
      ),
    },
    {
      key: "payment_status", label: "Pembayaran",
      render: (v) => (
        <Badge variant={paymentBadge[v] || "danger"}>
          {v || "Belum Bayar"}
        </Badge>
      ),
    },
    { key: "created_at", label: "Tanggal", render: (v) => <span className="text-xs text-teks-samping">{v ? new Date(v).toLocaleDateString("id-ID") : "-"}</span> },
    {
      key: "id", label: "Aksi",
      render: (v) => (
        <Button size="sm" variant="danger" icon={<FaTrash />} onClick={() => handleDelete(v)} disabled={loading} className="!p-2" />
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Orders" breadcrumb={["Orders"]} />
      <div className="px-4 space-y-3">
        {error   && <Alert variant="danger"  title="Error"     message={error}   onClose={() => setError("")} />}
        {success && <Alert variant="success" title="Berhasil!" message={success} onClose={() => setSuccess("")} />}

        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")} placeholder="Cari customer, menu, atau ID..." className="max-w-sm" />

        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 py-8 justify-center">
            <ImSpinner2 className="animate-spin text-lg" style={{ color: "#1e2d6b" }} /> Memuat data...
          </div>
        )}

        {!loading && orders.length === 0 && !error && (
          <div className="py-12 text-center text-gray-400">
            <BsDatabaseExclamation className="text-4xl mx-auto mb-2" />
            <p>Belum ada order masuk.</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <Table columns={columns} data={filtered} emptyMessage="Tidak ada order ditemukan" />
        )}
      </div>

      {/* Modal update status & pembayaran */}
      <Modal isOpen={!!editRow} onClose={() => setEditRow(null)} title="🔄 Update Order">
        {editRow && (
          <form onSubmit={handleUpdateAll} className="space-y-4">
            {/* Info order */}
            <div className="bg-gray-50 rounded-xl p-3 text-sm space-y-1">
              <p><span className="text-gray-500">Customer:</span> <strong>{editRow.customer_name}</strong></p>
              <p><span className="text-gray-500">Menu:</span> {editRow.menu_name} × {editRow.quantity} porsi</p>
              <p><span className="text-gray-500">Total:</span> Rp {Number(editRow.total_price).toLocaleString("id-ID")}</p>
              {editRow.phone   && <p><span className="text-gray-500">HP:</span> {editRow.phone}</p>}
              {editRow.address && <p><span className="text-gray-500">Alamat:</span> {editRow.address}</p>}
              {editRow.notes   && <p><span className="text-gray-500">Catatan:</span> {editRow.notes}</p>}
            </div>

            <SelectField label="Status Order" name="status" value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              options={[
                { value: "Pending",   label: "⏳ Pending" },
                { value: "Completed", label: "✅ Completed" },
                { value: "Cancelled", label: "❌ Cancelled" },
              ]} />

            <SelectField label="Status Pembayaran" name="payment_status" value={editPayment}
              onChange={(e) => setEditPayment(e.target.value)}
              options={[
                { value: "Belum Bayar",     label: "❌ Belum Bayar" },
                { value: "DP - Belum Lunas",label: "⚠️ DP - Belum Lunas" },
                { value: "Lunas",           label: "✅ Lunas" },
              ]} />

            <div className="flex gap-3 justify-end pt-2">
              <Button variant="ghost" type="button" onClick={() => setEditRow(null)}>Batal</Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Update Order"}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
