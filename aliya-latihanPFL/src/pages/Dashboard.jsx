import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaFire,
  FaStar,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";

const cards = [
  {
    icon: <FaShoppingCart className="text-2xl text-white" />,
    bg: "bg-hijau",
    value: "75",
    label: "Total Orders",
    sub: "+12 hari ini 🎉",
  },
  {
    icon: <FaTruck className="text-2xl text-white" />,
    bg: "bg-biru-muda",
    value: "175",
    label: "Total Delivered",
    sub: "Tepat waktu semua! ✅",
  },
  {
    icon: <FaBan className="text-2xl text-white" />,
    bg: "bg-tomato",
    value: "40",
    label: "Total Canceled",
    sub: "Turun 5% minggu ini",
  },
  {
    icon: <FaDollarSign className="text-2xl text-white" />,
    bg: "bg-sun",
    value: "Rp 12,8jt",
    label: "Total Revenue",
    sub: "Target bulan ini 🔥",
  },
];

const recentOrders = [
  { name: "Siti Rahayu", menu: "Paket Premium", status: "Selesai", total: "Rp 185.000" },
  { name: "Budi Santoso", menu: "Snack Box", status: "Diproses", total: "Rp 320.000" },
  { name: "Dewi Lestari", menu: "Paket Harian", status: "Pending", total: "Rp 95.000" },
  { name: "Ahmad Fauzi", menu: "Cookies Box", status: "Selesai", total: "Rp 450.000" },
];

const statusColor = {
  Selesai: "bg-hijau/20 text-hijau",
  Diproses: "bg-biru-muda/30 text-biru-muda",
  Pending: "bg-sun/30 text-yellow-600",
};

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" breadcrumb="Dashboard" />

      {/* Greeting */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border-l-4 border-hijau">
          <div>
            <p className="text-gray-400 text-sm font-barlow">Selamat datang kembali! 👋</p>
            <h2 className="text-2xl font-poppins font-bold text-gray-800 mt-1">
              Yummy Catering Admin
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Semangat ya, hari ini ada <span className="text-hijau font-semibold">12 order baru</span> yang menunggu! 🍱
            </p>
          </div>
          <div className="text-6xl hidden sm:block">🍽️</div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 mb-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3">
            <div className={`${card.bg} rounded-xl p-3 w-fit`}>
              {card.icon}
            </div>
            <div>
              <p className="text-2xl font-poppins font-bold text-gray-800">{card.value}</p>
              <p className="text-gray-400 text-sm">{card.label}</p>
              <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders + Top Menu */}
      <div className="grid md:grid-cols-3 gap-4 px-4">
        {/* Recent Orders */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-gray-800 flex items-center gap-2">
              <FaFire className="text-tomato" /> Order Terbaru
            </h3>
            <span className="text-xs text-hijau font-semibold cursor-pointer hover:underline">
              Lihat semua →
            </span>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-ungu flex items-center justify-center text-sm font-bold text-gray-600">
                    {order.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{order.name}</p>
                    <p className="text-xs text-gray-400">{order.menu}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Menu */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-poppins font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FaStar className="text-sun" /> Menu Terlaris
          </h3>
          <div className="space-y-3">
            {[
              { nama: "Paket Premium", persen: 85, warna: "bg-hijau" },
              { nama: "Cookies Box", persen: 70, warna: "bg-pink" },
              { nama: "Snack Box", persen: 55, warna: "bg-biru-muda" },
              { nama: "Paket Sehat", persen: 40, warna: "bg-ungu" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.nama}</span>
                  <span className="text-gray-400">{item.persen}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${item.warna} h-2 rounded-full`}
                    style={{ width: `${item.persen}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
