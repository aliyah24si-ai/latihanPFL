import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import SearchBar from "../../components/ui/SearchBar";
import Avatar from "../../components/ui/Avatar";
import StatCard from "../../components/ui/StatCard";
import ordersData from "../../data/orders.json";

const statusBadge = {
  Completed: "success",
  Pending: "warning",
  Cancelled: "danger",
};

export default function Orders() {
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState(ordersData);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    status: "Pending",
    totalPrice: "",
    orderDate: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      ...form,
      totalPrice: Number(form.totalPrice),
    };
    setOrders([newOrder, ...orders]);
    setForm({ customerName: "", status: "Pending", totalPrice: "", orderDate: "" });
    setShowForm(false);
  };

  const filtered = orders.filter((o) =>
    o.customerName.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "id", label: "Order ID",
      render: (v) => <span className="font-mono text-xs text-teks-samping">{v}</span>,
    },
    {
      key: "customerName", label: "Customer",
      render: (v) => (
        <div className="flex items-center gap-2">
          <Avatar name={v} size="sm" />
          <span className="font-medium text-teks text-sm">{v}</span>
        </div>
      ),
    },
    {
      key: "status", label: "Status",
      render: (v) => <Badge variant={statusBadge[v] || "default"}>{v}</Badge>,
    },
    {
      key: "totalPrice", label: "Total Harga",
      render: (v) => (
        <span className="font-semibold text-teks text-sm">
          Rp {Number(v).toLocaleString("id-ID")}
        </span>
      ),
    },
    {
      key: "orderDate", label: "Tanggal",
      render: (v) => <span className="text-sm text-teks-samping">{v}</span>,
    },
  ];

  const totalRevenue = orders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div>
      <PageHeader title="Orders" breadcrumb={["Orders"]}>
        <Button icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Add Order
        </Button>
      </PageHeader>

      {/* Stat summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-4">
        <StatCard variant="white" label="Total Orders" value={orders.length} icon="🛒" />
        <StatCard variant="white" label="Completed" value={orders.filter((o) => o.status === "Completed").length} icon="✅" />
        <StatCard variant="white" label="Pending" value={orders.filter((o) => o.status === "Pending").length} icon="⏳" />
        <StatCard variant="white" label="Revenue" value={`Rp ${(totalRevenue / 1000000).toFixed(1)}jt`} icon="💰" />
      </div>

      {/* Search + Table */}
      <div className="px-4 space-y-3">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Cari order atau nama customer..."
          className="max-w-sm"
        />
        <Table columns={columns} data={filtered} emptyMessage="Tidak ada order ditemukan" />
      </div>

      {/* Modal Form */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="🛒 Tambah Order Baru">
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nama Customer"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Nama lengkap customer"
            required
          />
          <SelectField
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={["Pending", "Completed", "Cancelled"]}
          />
          <InputField
            label="Total Harga (Rp)"
            name="totalPrice"
            type="number"
            value={form.totalPrice}
            onChange={handleChange}
            placeholder="Contoh: 150000"
            required
          />
          <InputField
            label="Tanggal Order"
            name="orderDate"
            type="date"
            value={form.orderDate}
            onChange={handleChange}
            required
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Batal</Button>
            <Button type="submit">Simpan Order 🍱</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
