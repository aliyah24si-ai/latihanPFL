import { FaChartBar, FaFire } from "react-icons/fa";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import BarChart from "../../components/ui/BarChart";
import DonutChart from "../../components/ui/DonutChart";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import Card from "../../components/ui/Card";
import ProgressBar from "../../components/ui/ProgressBar";

const monthlyData = [
  { label: "Jan", value: 8500000 },
  { label: "Feb", value: 9200000 },
  { label: "Mar", value: 11000000 },
  { label: "Apr", value: 12800000 },
  { label: "Mei", value: 10500000 },
  { label: "Jun", value: 13200000 },
];

const orderData = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 48 },
  { label: "Mar", value: 55 },
  { label: "Apr", value: 75 },
  { label: "Mei", value: 62 },
  { label: "Jun", value: 80 },
];

const statusData = [
  { label: "Completed", value: 175, color: "#10B981" },
  { label: "Diproses", value: 45, color: "#3B82F6" },
  { label: "Pending", value: 30, color: "#F59E0B" },
  { label: "Batal", value: 18, color: "#EF4444" },
];

const topCustomers = [
  { name: "Siti Rahayu", total: "Rp 1.850.000", order: 10, loyalty: "Gold" },
  { name: "Ahmad Fauzi", total: "Rp 1.350.000", order: 8, loyalty: "Gold" },
  { name: "Hendra Wijaya", total: "Rp 1.125.000", order: 6, loyalty: "Silver" },
  { name: "Rizky Pratama", total: "Rp 980.000", order: 5, loyalty: "Silver" },
];

const loyaltyBadge = { Gold: "gold", Silver: "silver", Bronze: "bronze" };

const topMenus = [
  { name: "Paket Premium", sold: 48, revenue: 2640000 },
  { name: "Snack Box Standar", sold: 35, revenue: 700000 },
  { name: "Paket Harian", sold: 30, revenue: 750000 },
  { name: "Cookies Box", sold: 22, revenue: 770000 },
  { name: "Jus Buah Segar", sold: 18, revenue: 216000 },
];

export default function Reports() {
  return (
    <div>
      <PageHeader title="Reports" breadcrumb={["Reports"]} description="Ringkasan performa bisnis bulan ini" />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-5">
        <StatCard variant="white" label="Total Pendapatan" value="Rp 41,5jt" icon="💰" trend="+18%" trendUp />
        <StatCard variant="white" label="Total Order" value="220" icon="🛒" trend="+12%" trendUp />
        <StatCard variant="white" label="Avg per Order" value="Rp 188rb" icon="📊" trend="+5%" trendUp />
        <StatCard variant="white" label="Order Dibatal" value="18" icon="❌" trend="-3%" trendUp={false} />
      </div>

      <div className="px-4 space-y-4">

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-teks flex items-center gap-2">
                <FaChartBar className="text-navy" /> Pendapatan per Bulan
              </p>
              <Badge variant="success">+18% vs bulan lalu</Badge>
            </div>
            <BarChart
              data={monthlyData}
              labelKey="label"
              valueKey="value"
              formatValue={(v) => `${(v / 1000000).toFixed(1)}jt`}
              height={140}
              colors={["#1e2d6b","#2d3f8f","#3B82F6","#8B5CF6","#F59E0B","#4CAF50"]}
              activeIndex={5}
            />
          </Card>

          <Card>
            <p className="font-semibold text-teks mb-4">Status Order</p>
            <DonutChart data={statusData} size={150} />
          </Card>
        </div>

        {/* Order Volume Chart */}
        <Card>
          <p className="font-semibold text-teks mb-4">📦 Volume Order per Bulan</p>
          <BarChart
            data={orderData}
            labelKey="label"
            valueKey="value"
            formatValue={(v) => `${v}`}
            height={110}
            colors={["#10B981","#4CAF50","#3B82F6","#8B5CF6","#F59E0B","#1e2d6b"]}
            activeIndex={5}
          />
        </Card>

        {/* Top Customers + Top Menu */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Top Customers */}
          <Card>
            <p className="font-semibold text-teks flex items-center gap-2 mb-4">
              <FaFire className="text-merah" /> Top Customer
            </p>
            <div className="space-y-3">
              {topCustomers.map((c, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-garis last:border-0">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: i === 0 ? "#F59E0B" : "#1e2d6b" }}
                    >
                      {i + 1}
                    </div>
                    <Avatar name={c.name} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-teks">{c.name}</p>
                      <p className="text-xs text-teks-samping">{c.order} order</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <p className="text-sm font-semibold text-teks">{c.total}</p>
                    <Badge variant={loyaltyBadge[c.loyalty]}>{c.loyalty}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Menu */}
          <Card>
            <p className="font-semibold text-teks mb-4">🍱 Menu Terlaris</p>
            <div className="space-y-4">
              {topMenus.map((menu, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-teks">{menu.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-teks-samping">{menu.sold} terjual</span>
                      <Badge variant={i === 0 ? "warning" : "default"}>
                        Rp {(menu.revenue / 1000).toFixed(0)}rb
                      </Badge>
                    </div>
                  </div>
                  <ProgressBar
                    value={menu.sold}
                    max={50}
                    showPercent={false}
                    color={i === 0 ? "#F59E0B" : "#1e2d6b"}
                    height={6}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
