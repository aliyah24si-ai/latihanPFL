import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaFire, FaStar } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

const cards = [
  { icon: <FaShoppingCart className="text-2xl text-white" />, bg: "#008471", value: "75", label: "Total Orders", sub: "+12 hari ini 🎉" },
  { icon: <FaTruck className="text-2xl text-white" />, bg: "#80b0e8", value: "175", label: "Total Delivered", sub: "Tepat waktu! ✅" },
  { icon: <FaBan className="text-2xl text-white" />, bg: "#c45f3f", value: "40", label: "Total Canceled", sub: "Turun 5% 📉" },
  { icon: <FaDollarSign className="text-2xl text-white" />, bg: "#898e46", value: "Rp 12,8jt", label: "Total Revenue", sub: "Target bulan ini 🔥" },
];

const recentOrders = [
  { name: "Siti Rahayu",  menu: "Paket Premium", status: "Selesai",  total: "Rp 185.000" },
  { name: "Budi Santoso", menu: "Snack Box",      status: "Diproses", total: "Rp 320.000" },
  { name: "Dewi Lestari", menu: "Paket Harian",   status: "Pending",  total: "Rp 95.000"  },
  { name: "Ahmad Fauzi",  menu: "Cookies Box",    status: "Selesai",  total: "Rp 450.000" },
];

const statusStyle = {
  Selesai:  { bg: "#008471", text: "white" },
  Diproses: { bg: "#80b0e8", text: "white" },
  Pending:  { bg: "#f4d242", text: "#5a5000" },
};

const avatarBg = ["#ffc0c0", "#d1caea", "#80b0e8", "#d6d35f"];

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" breadcrumb="Dashboard" />

      {/* Greeting */}
      <div className="px-4 mb-6">
        <div className="rounded-3xl p-6 flex items-center justify-between shadow-sm"
          style={{ background: "linear-gradient(135deg, #ffc0c0 0%, #d1caea 100%)" }}>
          <div>
            <p className="text-white/80 text-sm">Selamat datang kembali! 👋</p>
            <h2 className="text-2xl font-poppins font-bold text-white mt-1">Yummy Catering Admin</h2>
            <p className="text-white/80 text-sm mt-1">
              Ada <span className="font-bold text-white">12 order baru</span> yang nunggu nih! 🍱
            </p>
          </div>
          <div className="text-7xl hidden sm:block">🍽️</div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 mb-6">
        {cards.map((card, i) => (
          <div key={i} className="rounded-3xl p-5 flex flex-col gap-3 shadow-sm" style={{ backgroundColor: card.bg }}>
            <div className="bg-white/20 rounded-2xl p-3 w-fit">{card.icon}</div>
            <div>
              <p className="text-2xl font-poppins font-bold text-white">{card.value}</p>
              <p className="text-white/80 text-sm">{card.label}</p>
              <p className="text-white/60 text-xs mt-1">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders + Top Menu */}
      <div className="grid md:grid-cols-3 gap-4 px-4">
        <div className="md:col-span-2 bg-white rounded-3xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-gray-800 flex items-center gap-2">
              <FaFire className="text-tomato" /> Order Terbaru
            </h3>
            <span className="text-xs text-hijau font-semibold cursor-pointer hover:underline">Lihat semua →</span>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold text-gray-700"
                    style={{ backgroundColor: avatarBg[i] }}>
                    {order.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{order.name}</p>
                    <p className="text-xs text-gray-400">{order.menu}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ backgroundColor: statusStyle[order.status].bg, color: statusStyle[order.status].text }}>
                    {order.status}
                  </span>
                  <p className="text-xs text-gray-400">{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-5">
          <h3 className="font-poppins font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <FaStar className="text-sun" /> Menu Terlaris
          </h3>
          <div className="space-y-4">
            {[
              { nama: "Paket Premium", persen: 85, warna: "#008471" },
              { nama: "Cookies Box",   persen: 70, warna: "#f29cc3" },
              { nama: "Snack Box",     persen: 55, warna: "#80b0e8" },
              { nama: "Paket Sehat",   persen: 40, warna: "#d6d35f" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">{item.nama}</span>
                  <span className="text-gray-400 text-xs">{item.persen}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full" style={{ width: `${item.persen}%`, backgroundColor: item.warna }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
