import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import ordersData from "../data/orders.json";

const statusColor = {
  Completed: "bg-hijau/20 text-hijau",
  Pending: "bg-sun/30 text-yellow-700",
  Cancelled: "bg-peach text-tomato",
};

export default function Orders() {
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState(ordersData);
  const [form, setForm] = useState({
    customerName: "",
    status: "Pending",
    totalPrice: "",
    orderDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  return (
    <div>
      <PageHeader title="Orders" breadcrumb={["Orders"]}>
        <button
          onClick={() => setShowForm(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
        >
          <FaPlus /> Add Orders
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
            <h3 className="text-xl font-bold text-teks mb-6">🛒 Tambah Order Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Customer</label>
                <input
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                  placeholder="Nama lengkap customer"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Harga (Rp)</label>
                <input
                  name="totalPrice"
                  type="number"
                  value={form.totalPrice}
                  onChange={handleChange}
                  required
                  placeholder="Contoh: 150000"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Order</label>
                <input
                  name="orderDate"
                  type="date"
                  value={form.orderDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-hijau"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-hijau text-white py-2 rounded-lg font-semibold hover:opacity-90 mt-2"
              >
                Simpan Order 🍱
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
                {["Order ID", "Customer", "Status", "Total Harga", "Tanggal"].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-gray-500 text-xs">{order.id}</td>
                  <td className="px-5 py-3 font-semibold text-gray-800">{order.customerName}</td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-700">
                    Rp {order.totalPrice.toLocaleString("id-ID")}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{order.orderDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
