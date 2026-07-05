import { useState, useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import { BsDatabaseExclamation } from "react-icons/bs";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import SearchBar from "../../components/ui/SearchBar";
import Avatar from "../../components/ui/Avatar";
import Alert from "../../components/ui/Alert";
import { supabase } from "../../services/supabaseClient";

const loyaltyBadge = { Gold: "gold", Silver: "silver", Bronze: "bronze" };
const loyaltyEmoji = { Gold: "🥇", Silver: "🥈", Bronze: "🥉" };

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [search,    setSearch]    = useState("");

  // Baca dari tabel members di Supabase
  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");
      const { data, error: err } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });
      if (err) throw new Error(err.message);
      setCustomers(data || []);
    } catch (err) {
      setError("Gagal memuat data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCustomers(); }, []);

  const filtered = customers.filter(
    (c) =>
      c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      key: "full_name", label: "Nama",
      render: (v) => (
        <div className="flex items-center gap-3">
          <Avatar name={v || "?"} size="sm" />
          <span className="font-semibold text-teks text-sm">{v || "-"}</span>
        </div>
      ),
    },
    {
      key: "email", label: "Email",
      render: (v) => <span className="text-sm text-teks-samping">{v}</span>,
    },
    {
      key: "phone", label: "No. HP",
      render: (v) => <span className="text-sm text-teks-samping">{v || "-"}</span>,
    },
    {
      key: "loyalty", label: "Loyalty",
      render: (v) => (
        <Badge variant={loyaltyBadge[v] || "default"}>
          {loyaltyEmoji[v]} {v || "Bronze"}
        </Badge>
      ),
    },
    {
      key: "total_orders", label: "Total Order",
      render: (v) => (
        <span className="text-sm font-semibold text-teks">{v || 0}x</span>
      ),
    },
    {
      key: "created_at", label: "Bergabung",
      render: (v) => (
        <span className="text-xs text-teks-samping">
          {v ? new Date(v).toLocaleDateString("id-ID") : "-"}
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Customers" breadcrumb={["Customers"]} />

      <div className="px-4 space-y-4">
        {error && <Alert variant="danger" title="Error" message={error} onClose={() => setError("")} />}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Member",   value: customers.length,                                    icon: "👥" },
            { label: "Gold Members",   value: customers.filter(c => c.loyalty === "Gold").length,  icon: "🥇" },
            { label: "Silver Members", value: customers.filter(c => c.loyalty === "Silver").length,icon: "🥈" },
            { label: "Bronze Members", value: customers.filter(c => c.loyalty === "Bronze").length,icon: "🥉" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-garis shadow-sm flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="text-xl font-bold text-teks">{s.value}</p>
                <p className="text-xs text-teks-samping">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <SearchBar
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Cari nama atau email member..."
          className="max-w-sm"
        />

        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 py-8 justify-center">
            <ImSpinner2 className="animate-spin text-lg" style={{ color: "#1e2d6b" }} />
            Memuat data...
          </div>
        )}

        {!loading && customers.length === 0 && !error && (
          <div className="py-12 text-center text-gray-400">
            <BsDatabaseExclamation className="text-4xl mx-auto mb-2" />
            <p>Belum ada member yang mendaftar.</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <Table columns={columns} data={filtered} emptyMessage="Tidak ada member ditemukan" />
        )}
      </div>
    </div>
  );
}
