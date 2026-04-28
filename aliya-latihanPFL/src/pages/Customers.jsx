import { useState } from "react";
import { FaPlus, FaTimes, FaUser } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import customersData from "../data/customers.json";

const loyaltyColor = {
  Gold: "bg-sun/30 text-yellow-700",
  Silver: "bg-ungu/40 text-gray-600",
  Bronze: "bg-peach/60 text-tomato",
};

const loyaltyEmoji = { Gold: "🥇", Silver: "🥈", Bronze: "🥉" };

export default function Customers() {
  const [showForm, setShowForm] = useState(false);
  const [customers, setCustomers] = useState(customersData);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    loyalty: "Bronze",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  return (
    <div>
      <PageHeader title="Customers" breadcrumb={["Customers"]}>
        <button
          onClick={() => setShowForm(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
        >
          <FaPlus /> Add Customer
        </button>
      </PageHeader>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold text-teks mb-6">👤 Tambah Customer Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Nama lengkap"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="email@contoh.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. HP</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="08xxxxxxxxxx"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loyalty</label>
                <select
                  name="loyalty"
                  value={form.loyalty}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau"
                >
                  <option value="Bronze">🥉 Bronze</option>
                  <option value="Silver">🥈 Silver</option>
                  <option value="Gold">🥇 Gold</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-hijau text-white py-2 rounded-lg font-semibold hover:opacity-90 mt-2"
              >
                Simpan Customer 🎉
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tabel */}
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["ID", "Nama", "Email", "No. HP", "Loyalty"].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-gray-500 text-xs">{c.id}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink/30 flex items-center justify-center">
                        <FaUser className="text-pink text-xs" />
                      </div>
                      <span className="font-semibold text-gray-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{c.email}</td>
                  <td className="px-5 py-3 text-gray-500">{c.phone}</td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${loyaltyColor[c.loyalty]}`}>
                      {loyaltyEmoji[c.loyalty]} {c.loyalty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
