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

const statusBadge = {
  Completed: "success",
  Pending:   "warning",
  Cancelled: "danger",
};

export default function Orders() {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [search,  setSearch]  = useState("");

  // Modal update status
  const [editRow,     setEditRow]     = useState(null);
  const [editStatus,  setEditStatus]  = useState("Pending");

  // ── Load orders dari Supabase ──────────────────────────────────────
  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await ordersAPI.fetchOrders();
      setOrders(data);
    } catch (err) {
      setError("Gagal memuat data order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  // ── Update status ──────────────────────────────────────────────────
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ordersAPI.updateStatus(editRow.id, editStatus);
      showSuccess("Status order berhasil diupdate!");
      setEditRow(null);
      loadOrders();
    } catch (err) {
      setError("Gagal update status: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Hapus order ────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus order ini?")) return;
    try {
      setLoading(true);
      await ordersAPI.deleteOrder(id);
      showSuccess("Order berhasil dihapus!");
      loadOrders();
    } catch (err) {
      setError("Gagal hapus order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Filter ─────────────────────────────────────────────────────────
  const filtered = orders.filter(
    (o) =>
      o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.menu_name?.toLowerCase().includes(search.toLowerCase()) ||
      String(o.id).includes(search)
  );

  // ── Kolom tabel ────────────────────────────────────────────────────
  const columns = [
    {
      key: "id",
      label: "Order ID",
      render: (v) => (
        <span className="font-mono text-xs text-teks-samping">#{v}</span>
      ),
    },
    {
      key: "customer_name",
      label: "Customer",
      render: (v) => (
        <div className="flex items-center gap-2">
          <Avatar name={v || "?"} size="sm" />
          <div>
            <p className="font-medium text-teks text-sm">{v}</p>
          </div>
        </div>
      ),
    },
    {
      key: "menu_name",
      label: "Menu",
      render: (v) => <span className="text-sm text-teks-samping">{v}</span>,
    },
    {
      key: "quantity",
      label: "Qty",
      render: (v) => (
        <span className="text-sm font-semibold text-teks">{v} porsi</span>
      ),
    },
    {
      key: "total_price",
      label: "Total",
      render: (v) => (
        <span className="font-semibold text-sm text-teks">
          Rp {Number(v).toLocaleString("id-ID")}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (v, row) => (
        <button onClick={() => { setEditRow(row); setEditStatus(row.status); }}>
          <Badge variant={statusBadge[v] || "default"} className="cursor-pointer hover:opacity-80">
            {v}
          </Badge>
        </button>
      ),
    },
    {
      key: "created_at",
      label: "Tanggal",
      render: (v) => (
        <span className="text-xs text-teks-samping">
          {v ? new Date(v).toLocaleDateString("id-ID") : "-"}
        </span>
      ),
    },
    {
      key: "id",
      label: "Aksi",
      render: (v) => (
        <Button
          size="sm"
          variant="danger"
          icon={<FaTrash />}
          onClick={() => handleDelete(v)}
          disabled={loading}
          className="!p-2"
        />
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Orders" breadcrumb={["Orders"]} />

      <div className="px-4 space-y-3">
        {/* Alert */}
        {error && (
          <Alert variant="danger" title="Error" message={error} onClose={() => setError("")} />
        )}
        {success && (
          <Alert variant="success" title="Berhasil!" message={success} onClose={() => setSuccess("")} />
        )}

        {/* Search */}
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Cari nama customer, menu, atau ID..."
          className="max-w-sm"
        />

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 py-8 justify-center">
            <ImSpinner2 className="animate-spin text-navy text-lg" />
            Memuat data...
          </div>
        )}

        {/* Empty */}
        {!loading && orders.length === 0 && !error && (
          <div className="py-12 text-center text-gray-400">
            <BsDatabaseExclamation className="text-4xl mx-auto mb-2" />
            <p>Belum ada order masuk.</p>
            <p className="text-xs mt-1">Order dari halaman guest akan muncul di sini.</p>
          </div>
        )}

        {/* Table */}
        {!loading && filtered.length > 0 && (
          <Table
            columns={columns}
            data={filtered}
            emptyMessage="Tidak ada order ditemukan"
          />
        )}
      </div>

      {/* Modal Update Status */}
      <Modal
        isOpen={!!editRow}
        onClose={() => setEditRow(null)}
        title="🔄 Update Status Order"
      >
        {editRow && (
          <form onSubmit={handleUpdateStatus} className="space-y-4">
            {/* Info order */}
            <div className="bg-gray-50 rounded-xl p-3 text-sm space-y-1">
              <p><span className="text-gray-500">Customer:</span> <strong>{editRow.customer_name}</strong></p>
              <p><span className="text-gray-500">Menu:</span> {editRow.menu_name} × {editRow.quantity} porsi</p>
              <p><span className="text-gray-500">Total:</span> Rp {Number(editRow.total_price).toLocaleString("id-ID")}</p>
              {editRow.phone && <p><span className="text-gray-500">HP:</span> {editRow.phone}</p>}
              {editRow.address && <p><span className="text-gray-500">Alamat:</span> {editRow.address}</p>}
              {editRow.notes && <p><span className="text-gray-500">Catatan:</span> {editRow.notes}</p>}
            </div>

            <SelectField
              label="Status Order"
              name="status"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              options={[
                { value: "Pending",   label: "⏳ Pending" },
                { value: "Completed", label: "✅ Completed" },
                { value: "Cancelled", label: "❌ Cancelled" },
              ]}
            />

            <div className="flex gap-3 justify-end pt-2">
              <Button variant="ghost" type="button" onClick={() => setEditRow(null)}>
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Update Status"}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
