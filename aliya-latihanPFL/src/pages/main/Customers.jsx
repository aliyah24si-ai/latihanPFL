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
import customersData from "../../data/customers.json";

const loyaltyBadge = {
  Gold: "gold",
  Silver: "silver",
  Bronze: "bronze",
};

const loyaltyEmoji = { Gold: "🥇", Silver: "🥈", Bronze: "🥉" };

export default function Customers() {
  const [showForm, setShowForm] = useState(false);
  const [customers, setCustomers] = useState(customersData);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", loyalty: "Bronze" });

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
  ];

  return (
    <div>
      <PageHeader title="Customers" breadcrumb={["Customers"]}>
        <Button icon={<FaPlus />} onClick={() => setShowForm(true)}>
          Add Customer
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-4">
        <StatCard variant="white" label="Total Customers" value={customers.length} icon="👥" />
        <StatCard variant="white" label="Gold Members" value={customers.filter((c) => c.loyalty === "Gold").length} icon="🥇" />
        <StatCard variant="white" label="Silver Members" value={customers.filter((c) => c.loyalty === "Silver").length} icon="🥈" />
        <StatCard variant="white" label="Bronze Members" value={customers.filter((c) => c.loyalty === "Bronze").length} icon="🥉" />
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

      {/* Modal */}
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
              { value: "Gold", label: "🥇 Gold" },
            ]}
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setShowForm(false)}>Batal</Button>
            <Button type="submit">Simpan Customer 🎉</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
