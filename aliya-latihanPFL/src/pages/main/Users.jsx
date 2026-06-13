import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { BsDatabaseExclamation } from "react-icons/bs";

import { usersAPI } from "../../services/usersAPI";

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
import Alert from "../../components/ui/Alert";

const roleBadge = {
  admin: "navy",
  staff: "info",
  user: "default",
};

const roleEmoji = { admin: "👑", staff: "🛠️", user: "👤" };

const emptyForm = { full_name: "", email: "", role: "user" };

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // ── Load data ────────────────────────────────────────────────────────────
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await usersAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (user) => {
    setForm({ full_name: user.full_name, email: user.email, role: user.role });
    setEditId(user.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      if (editId) {
        await usersAPI.updateUser(editId, {
          full_name: form.full_name,
          role: form.role,
        });
        showSuccess("Data user berhasil diupdate!");
      } else {
        await usersAPI.createUser({ ...form });
        showSuccess("User baru berhasil ditambahkan!");
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditId(null);
      loadUsers();
    } catch (err) {
      setError("Gagal menyimpan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;
    try {
      setLoading(true);
      setError("");
      await usersAPI.deleteUser(id);
      showSuccess("User berhasil dihapus!");
      loadUsers();
    } catch (err) {
      setError("Gagal menghapus: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Filter ───────────────────────────────────────────────────────────────
  const filtered = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ── Table columns ─────────────────────────────────────────────────────────
  const columns = [
    {
      key: "full_name",
      label: "Nama",
      render: (v) => (
        <div className="flex items-center gap-3">
          <Avatar name={v || "?"} size="sm" />
          <span className="font-semibold text-teks text-sm">{v || "-"}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (v) => (
        <span className="text-sm text-teks-samping">{v}</span>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (v) => (
        <Badge variant={roleBadge[v] || "default"}>
          {roleEmoji[v]} {v}
        </Badge>
      ),
    },
    {
      key: "created_at",
      label: "Terdaftar",
      render: (v) => (
        <span className="text-xs text-teks-samping">
          {v ? new Date(v).toLocaleDateString("id-ID") : "-"}
        </span>
      ),
    },
    {
      key: "id",
      label: "Aksi",
      render: (v, row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            icon={<FaEdit />}
            onClick={() => openEdit(row)}
            className="!p-2"
          />
          <Button
            size="sm"
            variant="danger"
            icon={<FaTrash />}
            onClick={() => handleDelete(v)}
            disabled={loading}
            className="!p-2"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Users" breadcrumb={["Users"]}>
        <Button icon={<FaPlus />} onClick={openAdd} disabled={loading}>
          Add User
        </Button>
      </PageHeader>

      <div className="px-4 space-y-4">
        {/* Alert */}
        {error && (
          <Alert
            variant="danger"
            title="Terjadi Kesalahan"
            message={error}
            onClose={() => setError("")}
          />
        )}
        {success && (
          <Alert
            variant="success"
            title="Berhasil!"
            message={success}
            onClose={() => setSuccess("")}
          />
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard variant="white" label="Total Users" value={users.length} icon="👥" />
          <StatCard
            variant="white"
            label="Admin"
            value={users.filter((u) => u.role === "admin").length}
            icon="👑"
          />
          <StatCard
            variant="white"
            label="Staff"
            value={users.filter((u) => u.role === "staff").length}
            icon="🛠️"
          />
        </div>

        {/* Search */}
        <SearchBar
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Cari nama atau email user..."
          className="max-w-sm"
        />

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 py-8 justify-center">
            <ImSpinner2 className="animate-spin text-navy text-lg" />
            Memuat data...
          </div>
        )}

        {/* Empty state */}
        {!loading && users.length === 0 && !error && (
          <div className="py-12 text-center text-gray-400">
            <BsDatabaseExclamation className="text-4xl mx-auto mb-2" />
            <p>Belum ada data user.</p>
          </div>
        )}

        {/* Table */}
        {!loading && filtered.length > 0 && (
          <Table
            columns={columns}
            data={filtered}
            emptyMessage="Tidak ada user ditemukan"
          />
        )}
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editId ? "✏️ Edit User" : "👤 Tambah User Baru"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nama Lengkap"
            name="full_name"
            value={form.full_name}
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
            disabled={!!editId} /* email tidak bisa diubah saat edit */
          />
          <SelectField
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={[
              { value: "user", label: "👤 User" },
              { value: "staff", label: "🛠️ Staff" },
              { value: "admin", label: "👑 Admin" },
            ]}
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : editId ? "Update User ✨" : "Simpan User 🎉"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
