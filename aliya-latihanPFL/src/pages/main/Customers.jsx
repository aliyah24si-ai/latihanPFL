import { useState } from "react";
import { FaPlus, FaEye } from "react-icons/fa";
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
import customersData from "../../data/customers.json";
import ordersData from "../../data/orders.json";

const loyaltyBadge = { Gold: "gold", Silver: "silver", Bronze: "bronze" };
const loyaltyEmoji = { Gold: "🥇", Silver: "🥈", Bronze: "🥉" };

const statusStyle = {
  Completed: { bg: "#D1FAE5", color: "#065F46" },
  Pending:   { bg: "#FEF3C7", color: "#92400E" },
  Cancelled: { bg: "#FEE2E2", color: "#991B1B" },
};

export default function Customers() {
  const [showForm,    setShowForm]    = useState(false);
  const [customers,   setCustomers]   = useState(customersData);
  const [search,      setSearch]      = useState("");
  const [form,        setForm]        = useState({ name: "", email: "", phone: "", loyalty: "Bronze" });

  // Detail customer
  const [detailCustomer, setDetailCustomer] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: `CUS-${String(customers.length + 1).padStart(3, "0")}`,
      ...form,
    };
    setCustomers([newCustomer, ...customers]);
    setForm({ name: "", email: "", phone: "", loyalty: "Bronze" });
    setShowForm(false);
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  // Ambil order berdasarkan nama customer
  const getCustomerOrders = (name) =>
    ordersData.filter((o) =>
      o.customerName.toLowerCase() === name.toLowerCase()
    );

  const columns = [
    {
      key: "id", label: "ID",
      render: (v) => <span className="font-mono text-xs text-teks-samping">{v}</span>,
    },
    {
      key: "name", label: "Nama",
      render: (v) => (
        <div className="flex items-center gap-3">
          <Avatar name={v} size="sm" />
          <span className="font-semibold text-teks text-sm">{v}</span>
        </div>
      ),
    },
    {
      key: "email", label: "Email",
      render: (v) => <span className="text-sm text-teks-samping">{v}</span>,
    },
    {
      key: "phone", label: "No. HP",
      render: (v) => <span className="text-sm text-teks-samping">{v}</span>,
    },
    {
      key: "loyalty", label: "Loyalty",
      render: (v) => (
        <Badge variant={loyaltyBadge[v] || "default"}>
          {loyaltyEmoji[v]} {v}
        </Badge>
      ),
    },
    {
      key: "id", label: "Detail",
      render: (_, row) => (
        <Button
          size="sm"
          variant="ghost"
          icon={<FaEye />}
          onClick={() => setDetailCustomer(row)}
          className="!p-2 text-navy"
        />
      ),
    },
  ];

  // Stat ringkasan
  const gold   = customers.filter((c) => c.loyalty === "Gold").length;
  const silver = customers.filter((c) => c.loyalty === "Silver").length;
  const bronze = customers.filter((c) => c.loyalty === "Bronze").length;

  // Data untuk customer yang dibuka detailnya
  const detailOrders = detailCustomer ? getCustomerOrders(detailCustomer.name) : [];
  const totalSpend   = detailOrders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div>
      <PageHeader title="Customers" breadcrumb={["Customers"]}>
        <Button icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Add Customer
        </Button>
      </PageHeader>

      {/* Stat Cards */}
      <div className="px-4 grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard variant="white" label="Total Customer" value={customers.length} icon="👥" />
        <StatCard variant="white" label="Gold"   value={gold}   icon="🥇" sub="Level tertinggi" />
        <StatCard variant="white" label="Silver" value={silver} icon="🥈" sub="Level menengah" />
        <StatCard variant="white" label="Bronze" value={bronze} icon="🥉" sub="Level pemula" />
      </div>

      {/* Search + Table */}
      <div className="px-4 space-y-3">
        <SearchBar
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Cari nama atau email customer..."
          className="max-w-sm"
        />
        <Table columns={columns} data={filtered} emptyMessage="Tidak ada customer ditemukan" />
      </div>

      {/* ── Modal Tambah Customer ─────────────────────────────────────── */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="👤 Tambah Customer Baru">
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nama Lengkap"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama lengkap"
            required
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email@contoh.com"
            required
          />
          <InputField
            label="No. HP"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            required
          />
          <SelectField
            label="Loyalty"
            name="loyalty"
            value={form.loyalty}
            onChange={handleChange}
            options={[
              { value: "Bronze", label: "🥉 Bronze" },
              { value: "Silver", label: "🥈 Silver" },
              { value: "Gold",   label: "🥇 Gold"   },
            ]}
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Batal</Button>
            <Button type="submit">Simpan Customer 🎉</Button>
          </div>
        </form>
      </Modal>

      {/* ── Modal Detail Customer ─────────────────────────────────────── */}
      <Modal
        isOpen={!!detailCustomer}
        onClose={() => setDetailCustomer(null)}
        title="👤 Detail Customer"
      >
        {detailCustomer && (
          <div className="space-y-5">

            {/* Profil */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
              <Avatar name={detailCustomer.name} size="lg" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-teks text-base">{detailCustomer.name}</p>
                <p className="text-sm text-teks-samping truncate">{detailCustomer.email}</p>
                <p className="text-sm text-teks-samping">{detailCustomer.phone}</p>
              </div>
              <Badge variant={loyaltyBadge[detailCustomer.loyalty] || "default"} className="shrink-0">
                {loyaltyEmoji[detailCustomer.loyalty]} {detailCustomer.loyalty}
              </Badge>
            </div>

            {/* Stat singkat */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "#EEF2FF" }}>
                <p className="text-xl font-bold" style={{ color: "#1e2d6b" }}>
                  {detailOrders.length}
                </p>
                <p className="text-xs text-teks-samping mt-0.5">Total Order</p>
              </div>
              <div className="rounded-xl p-3 text-center bg-green-50">
                <p className="text-xl font-bold text-green-700">
                  {detailOrders.filter((o) => o.status === "Completed").length}
                </p>
                <p className="text-xs text-teks-samping mt-0.5">Selesai</p>
              </div>
              <div className="rounded-xl p-3 text-center bg-amber-50">
                <p className="text-xl font-bold text-amber-700">
                  Rp {(totalSpend / 1000).toFixed(0)}rb
                </p>
                <p className="text-xs text-teks-samping mt-0.5">Total Belanja</p>
              </div>
            </div>

            {/* Riwayat Order */}
            <div>
              <p className="text-sm font-semibold text-teks mb-2">
                Riwayat Order
                <span className="text-xs font-normal text-teks-samping ml-1">
                  ({detailOrders.length} order)
                </span>
              </p>

              {detailOrders.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  <p className="text-3xl mb-2">📦</p>
                  <p className="text-sm">Belum ada riwayat order</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {detailOrders.map((o, i) => {
                    const st = statusStyle[o.status] || statusStyle.Pending;
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-garis bg-gray-50/60"
                      >
                        <div>
                          <p className="text-xs font-mono text-teks-samping">{o.id}</p>
                          <p className="text-sm font-medium text-teks">
                            Rp {o.totalPrice.toLocaleString("id-ID")}
                          </p>
                          <p className="text-xs text-teks-samping">
                            {new Date(o.orderDate).toLocaleDateString("id-ID", {
                              day: "2-digit", month: "short", year: "numeric",
                            })}
                          </p>
                        </div>
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-semibold"
                          style={{ backgroundColor: st.bg, color: st.color }}
                        >
                          {o.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-1">
              <Button variant="ghost" onClick={() => setDetailCustomer(null)}>
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
