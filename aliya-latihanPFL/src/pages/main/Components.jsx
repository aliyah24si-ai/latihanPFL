import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaBell, FaUser, FaHome } from "react-icons/fa";

// UI Components
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import Card, { PastelCard, CardWithAction } from "../../components/ui/Card";
import Modal from "../../components/ui/Modal";
import Table from "../../components/ui/Table";
import Avatar from "../../components/ui/Avatar";
import StatCard from "../../components/ui/StatCard";
import BarChart from "../../components/ui/BarChart";
import DonutChart from "../../components/ui/DonutChart";
import ActivityFeed from "../../components/ui/ActivityFeed";
import SearchBar from "../../components/ui/SearchBar";
import EmptyState from "../../components/ui/EmptyState";
import PageHeader from "../../components/ui/PageHeader";
import Tooltip from "../../components/ui/Tooltip";
import ProgressBar from "../../components/ui/ProgressBar";
import Alert from "../../components/ui/Alert";

// ─── Section wrapper ────────────────────────────────────────────────────────
function Section({ number, title, description, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-1">
        <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
          {number}
        </span>
        <h2 className="text-lg font-bold text-teks">{title}</h2>
      </div>
      {description && (
        <p className="text-sm text-teks-samping mb-4 ml-10">{description}</p>
      )}
      <div className="ml-10">{children}</div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Components() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [selectVal, setSelectVal] = useState("option1");
  const [alerts, setAlerts] = useState({
    success: true,
    danger: true,
    warning: true,
    info: true,
  });

  const tableData = [
    { id: "#001", name: "Siti Rahayu", course: "Paket Premium", status: "Selesai" },
    { id: "#002", name: "Budi Santoso", course: "Snack Box", status: "Diproses" },
    { id: "#003", name: "Dewi Lestari", course: "Paket Harian", status: "Pending" },
    { id: "#004", name: "Ahmad Fauzi", course: "Cookies Box", status: "Selesai" },
  ];

  const tableColumns = [
    { key: "id", label: "ID", render: (v) => <span className="font-mono text-xs text-teks-samping">{v}</span> },
    {
      key: "name", label: "Nama",
      render: (v) => (
        <div className="flex items-center gap-2">
          <Avatar name={v} size="sm" />
          <span className="font-medium text-teks text-sm">{v}</span>
        </div>
      ),
    },
    { key: "course", label: "Menu", render: (v) => <span className="text-sm text-teks-samping">{v}</span> },
    {
      key: "status", label: "Status",
      render: (v) => {
        const map = { Selesai: "success", Diproses: "info", Pending: "warning" };
        return <Badge variant={map[v] || "default"}>{v}</Badge>;
      },
    },
  ];

  const barData = [
    { label: "Jan", value: 8500000 },
    { label: "Feb", value: 9200000 },
    { label: "Mar", value: 11000000 },
    { label: "Apr", value: 12800000 },
    { label: "Mei", value: 10500000 },
  ];

  const donutData = [
    { label: "Selesai", value: 175, color: "#10B981" },
    { label: "Diproses", value: 45, color: "#3B82F6" },
    { label: "Pending", value: 30, color: "#F59E0B" },
    { label: "Batal", value: 20, color: "#EF4444" },
  ];

  const activityItems = [
    { icon: "🛒", text: "Order baru dari Siti Rahayu", time: "Hari ini, 10.30 AM", badge: { label: "Baru", bg: "#D1FAE5", color: "#065F46" } },
    { icon: "✅", text: "Paket Premium dikirim ke Budi", time: "Hari ini, 10.00 AM" },
    { icon: "🎁", text: "Promo VIP Cashback diaktifkan", time: "Kemarin, 01.00 PM" },
  ];

  return (
    <div>
      <PageHeader
        title="Component Library"
        breadcrumb={["Components"]}
        description="Semua reusable components yang digunakan dalam project CRM Yummy Catering"
      />

      <div className="px-4 pb-10">

        {/* ── 1. Button ─────────────────────────────────────────────────── */}
        <Section number="1" title="Button" description="Tombol dengan berbagai variant dan ukuran.">
          <div className="bg-white rounded-2xl border border-garis p-6 space-y-5">
            <div>
              <p className="text-xs font-semibold text-teks-samping uppercase tracking-wider mb-3">Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link Button</Button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-teks-samping uppercase tracking-wider mb-3">Sizes</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-teks-samping uppercase tracking-wider mb-3">With Icon & Disabled</p>
              <div className="flex flex-wrap gap-3">
                <Button icon={<FaPlus />}>Tambah Data</Button>
                <Button variant="danger" icon={<FaTrash />}>Hapus</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 2. Badge ──────────────────────────────────────────────────── */}
        <Section number="2" title="Badge" description="Label kecil untuk status, kategori, atau tag.">
          <div className="bg-white rounded-2xl border border-garis p-6">
            <div className="flex flex-wrap gap-3">
              <Badge variant="success">Success</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="default">Default</Badge>
              <Badge variant="navy">Navy</Badge>
              <Badge variant="gold">🥇 Gold</Badge>
              <Badge variant="silver">🥈 Silver</Badge>
              <Badge variant="bronze">🥉 Bronze</Badge>
            </div>
          </div>
        </Section>

        {/* ── 3. InputField ─────────────────────────────────────────────── */}
        <Section number="3" title="InputField" description="Input teks dengan label, placeholder, error state, dan icon.">
          <div className="bg-white rounded-2xl border border-garis p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField
                label="Nama Lengkap"
                placeholder="Masukkan nama..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                required
              />
              <InputField
                label="Email"
                type="email"
                placeholder="email@contoh.com"
                icon={<FaUser />}
              />
              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
              />
              <InputField
                label="Input Error"
                placeholder="Ada yang salah..."
                error="Field ini wajib diisi"
              />
              <InputField
                label="Input Disabled"
                placeholder="Tidak bisa diubah"
                disabled
              />
              <InputField
                label="Catatan"
                type="textarea"
                placeholder="Tulis catatan di sini..."
                rows={3}
              />
            </div>
          </div>
        </Section>

        {/* ── 4. SelectField ────────────────────────────────────────────── */}
        <Section number="4" title="SelectField" description="Dropdown pilihan dengan label dan error state.">
          <div className="bg-white rounded-2xl border border-garis p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <SelectField
                label="Kategori"
                value={selectVal}
                onChange={(e) => setSelectVal(e.target.value)}
                options={[
                  { value: "option1", label: "Paket Nasi" },
                  { value: "option2", label: "Snack Box" },
                  { value: "option3", label: "Minuman" },
                ]}
              />
              <SelectField
                label="Status (Disabled)"
                value="aktif"
                disabled
                options={[{ value: "aktif", label: "Aktif" }]}
              />
            </div>
          </div>
        </Section>

        {/* ── 5. Card ───────────────────────────────────────────────────── */}
        <Section number="5" title="Card" description="Container konten dengan berbagai variant.">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <p className="font-semibold text-teks text-sm mb-1">Regular Card</p>
              <p className="text-xs text-teks-samping">Background putih, rounded-2xl, shadow-sm, border garis.</p>
            </Card>
            <PastelCard
              label="Total Orders"
              value="75"
              sub="12 order baru"
              bg="#FEF3C7"
              color="#92400E"
              icon="🛒"
            />
            <CardWithAction
              title="Card with Action"
              description="Bisa taruh tombol di kanan."
              action={<Button size="sm">View All</Button>}
            />
          </div>
        </Section>

        {/* ── 6. Modal ──────────────────────────────────────────────────── */}
        <Section number="6" title="Modal" description="Dialog overlay dengan header, body, dan close button.">
          <div className="bg-white rounded-2xl border border-garis p-6">
            <Button onClick={() => setModalOpen(true)} icon={<FaBell />}>
              Buka Modal
            </Button>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Contoh Modal"
            >
              <div className="space-y-4">
                <p className="text-sm text-teks-samping">
                  Ini adalah contoh modal reusable. Bisa diisi form, konfirmasi, atau konten apapun.
                </p>
                <InputField label="Nama" placeholder="Masukkan nama..." />
                <div className="flex gap-3 justify-end pt-2">
                  <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
                  <Button onClick={() => setModalOpen(false)}>Simpan</Button>
                </div>
              </div>
            </Modal>
          </div>
        </Section>

        {/* ── 7. Table ──────────────────────────────────────────────────── */}
        <Section number="7" title="Table" description="Tabel data dengan kolom konfigurasi dan hover state.">
          <Table columns={tableColumns} data={tableData} />
        </Section>

        {/* ── 8. Avatar ─────────────────────────────────────────────────── */}
        <Section number="8" title="Avatar" description="Foto profil atau inisial nama dengan warna otomatis.">
          <div className="bg-white rounded-2xl border border-garis p-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-col items-center gap-2">
                <Avatar src="/foto-admin.jpg" name="Admin Yummy" size="xl" />
                <span className="text-xs text-teks-samping">With Photo</span>
              </div>
              {["Siti Rahayu", "Budi Santoso", "Dewi Lestari", "Ahmad Fauzi"].map((n) => (
                <div key={n} className="flex flex-col items-center gap-2">
                  <Avatar name={n} size="lg" />
                  <span className="text-xs text-teks-samping">{n.split(" ")[0]}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Test" size="md" />
                <span className="text-xs text-teks-samping">md</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Test" size="sm" />
                <span className="text-xs text-teks-samping">sm</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 9. StatCard ───────────────────────────────────────────────── */}
        <Section number="9" title="StatCard" description="Kartu statistik dengan 3 variant: pastel, white, navy.">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Orders" value="75" sub="12 order baru" bg="#FEF3C7" color="#92400E" icon="🛒" trend="+12%" trendUp />
            <StatCard label="Total Delivered" value="175" sub="Tepat waktu" bg="#FCE7F3" color="#9D174D" icon="🚚" trend="+8%" trendUp />
            <StatCard variant="white" label="Total Revenue" value="Rp 12,8jt" sub="Bulan ini" icon="💰" trend="+18%" trendUp />
            <StatCard variant="navy" label="Total Customers" value="240" sub="Aktif bulan ini" icon="👥" trend="+5%" trendUp />
          </div>
        </Section>

        {/* ── 10. BarChart ──────────────────────────────────────────────── */}
        <Section number="10" title="BarChart" description="Bar chart CSS murni tanpa library eksternal.">
          <div className="bg-white rounded-2xl border border-garis p-6">
            <BarChart
              data={barData}
              labelKey="label"
              valueKey="value"
              formatValue={(v) => `${(v / 1000000).toFixed(1)}jt`}
              title="Pendapatan per Bulan (Rp)"
              height={130}
              colors={["#1e2d6b","#2d3f8f","#3B82F6","#8B5CF6","#F59E0B","#4CAF50"]}
              activeIndex={4}
            />
          </div>
        </Section>

        {/* ── 11. DonutChart ────────────────────────────────────────────── */}
        <Section number="11" title="DonutChart" description="Donut chart SVG untuk proporsi data.">
          <div className="bg-white rounded-2xl border border-garis p-6 flex justify-center">
            <DonutChart
              data={donutData}
              size={160}
              title="Status Order"
            />
          </div>
        </Section>

        {/* ── 12. ActivityFeed ──────────────────────────────────────────── */}
        <Section number="12" title="ActivityFeed" description="Timeline aktivitas dengan 2 mode: light dan dark.">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <p className="text-sm font-semibold text-teks mb-4">Light Mode</p>
              <ActivityFeed items={activityItems} />
            </Card>
            <div className="rounded-2xl p-5" style={{ backgroundColor: "#1e2d6b" }}>
              <p className="text-sm font-semibold text-white mb-4">Dark Mode</p>
              <ActivityFeed items={activityItems} dark />
            </div>
          </div>
        </Section>

        {/* ── 13. SearchBar ─────────────────────────────────────────────── */}
        <Section number="13" title="SearchBar" description="Input pencarian dengan icon dan tombol clear.">
          <div className="bg-white rounded-2xl border border-garis p-6">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
              placeholder="Cari customer, order, menu..."
              className="max-w-sm"
            />
            {search && (
              <p className="text-xs text-teks-samping mt-2">
                Mencari: <span className="font-medium text-navy">"{search}"</span>
              </p>
            )}
          </div>
        </Section>

        {/* ── 14. EmptyState ────────────────────────────────────────────── */}
        <Section number="14" title="EmptyState" description="Tampilan saat tidak ada data.">
          <div className="bg-white rounded-2xl border border-garis">
            <EmptyState
              icon="📭"
              title="Belum ada data"
              description="Tambahkan data pertama kamu untuk mulai menggunakan fitur ini."
              actionLabel="Tambah Sekarang"
              action={() => {}}
            />
          </div>
        </Section>

        {/* ── 15. PageHeader ────────────────────────────────────────────── */}
        <Section number="15" title="PageHeader" description="Header halaman dengan judul, breadcrumb, dan slot aksi.">
          <div className="bg-white rounded-2xl border border-garis overflow-hidden">
            <PageHeader
              title="Contoh Halaman"
              breadcrumb={["Menu", "Sub Menu"]}
              description="Deskripsi singkat halaman ini"
            >
              <Button size="sm" icon={<FaPlus />}>Tambah</Button>
              <Button size="sm" variant="secondary" icon={<FaEdit />}>Edit</Button>
            </PageHeader>
          </div>
        </Section>

        {/* ── 16. Tooltip ───────────────────────────────────────────────── */}
        <Section number="16" title="Tooltip" description="Hover tooltip di 4 arah: top, bottom, left, right.">
          <div className="bg-white rounded-2xl border border-garis p-6">
            <div className="flex flex-wrap gap-6 items-center justify-center py-4">
              <Tooltip text="Tooltip di atas" position="top">
                <Button size="sm" variant="secondary">Hover Top</Button>
              </Tooltip>
              <Tooltip text="Tooltip di bawah" position="bottom">
                <Button size="sm" variant="secondary">Hover Bottom</Button>
              </Tooltip>
              <Tooltip text="Tooltip di kiri" position="left">
                <Button size="sm" variant="secondary">Hover Left</Button>
              </Tooltip>
              <Tooltip text="Tooltip di kanan" position="right">
                <Button size="sm" variant="secondary">Hover Right</Button>
              </Tooltip>
            </div>
          </div>
        </Section>

        {/* ── 17. ProgressBar ───────────────────────────────────────────── */}
        <Section number="17" title="ProgressBar" description="Progress bar animasi dengan label dan persentase.">
          <div className="bg-white rounded-2xl border border-garis p-6 space-y-4">
            <ProgressBar label="Total Orders" value={75} max={100} color="#1e2d6b" />
            <ProgressBar label="Revenue Target" value={128} max={200} color="#10B981" />
            <ProgressBar label="Customer Retention" value={88} max={100} color="#F59E0B" />
            <ProgressBar label="Cancelled Rate" value={18} max={100} color="#EF4444" />
          </div>
        </Section>

        {/* ── 18. Alert ─────────────────────────────────────────────────── */}
        <Section number="18" title="Alert" description="Banner notifikasi inline dengan 4 variant.">
          <div className="space-y-3">
            {alerts.success && (
              <Alert
                variant="success"
                title="Berhasil!"
                message="Data berhasil disimpan ke sistem."
                onClose={() => setAlerts((a) => ({ ...a, success: false }))}
              />
            )}
            {alerts.danger && (
              <Alert
                variant="danger"
                title="Terjadi Kesalahan"
                message="Gagal memuat data. Silakan coba lagi."
                onClose={() => setAlerts((a) => ({ ...a, danger: false }))}
              />
            )}
            {alerts.warning && (
              <Alert
                variant="warning"
                title="Perhatian"
                message="Stok Paket Harian hampir habis."
                onClose={() => setAlerts((a) => ({ ...a, warning: false }))}
              />
            )}
            {alerts.info && (
              <Alert
                variant="info"
                title="Info"
                message="Ada 3 order baru yang perlu diproses hari ini."
                onClose={() => setAlerts((a) => ({ ...a, info: false }))}
              />
            )}
            {!Object.values(alerts).some(Boolean) && (
              <div className="text-center py-4">
                <Button size="sm" variant="ghost" onClick={() => setAlerts({ success: true, danger: true, warning: true, info: true })}>
                  Reset Alerts
                </Button>
              </div>
            )}
          </div>
        </Section>

      </div>
    </div>
  );
}
