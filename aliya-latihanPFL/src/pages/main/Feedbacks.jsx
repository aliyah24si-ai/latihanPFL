import { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { BsDatabaseExclamation } from "react-icons/bs";
import PageHeader from "../../components/ui/PageHeader";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { feedbackAPI } from "../../services/feedbackAPI";

const statusVariant = { approved: "success", pending: "warning" };

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState("");
  const [filter,    setFilter]    = useState("all"); // all | pending | approved

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await feedbackAPI.fetchAll();
      setFeedbacks(data);
    } catch (err) {
      setError("Gagal memuat feedback: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      await feedbackAPI.approve(id);
      showSuccess("Feedback berhasil di-approve dan akan tampil di halaman guest!");
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Yakin ingin menghapus feedback ini?")) return;
    try {
      setLoading(true);
      await feedbackAPI.reject(id);
      showSuccess("Feedback dihapus.");
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filtered = feedbacks.filter(
    (f) => filter === "all" || f.status === filter
  );

  const renderStars = (n) =>
    Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < n ? "text-amber-400" : "text-gray-300"}>★</span>
    ));

  return (
    <div>
      <PageHeader title="Feedbacks" breadcrumb={["Feedbacks"]} />

      <div className="px-4 space-y-4">
        {error   && <Alert variant="danger"  title="Error"     message={error}   onClose={() => setError("")} />}
        {success && <Alert variant="success" title="Berhasil!" message={success} onClose={() => setSuccess("")} />}

        {/* Filter tabs */}
        <div className="flex gap-2">
          {[
            { key: "all",      label: `Semua (${feedbacks.length})` },
            { key: "pending",  label: `Pending (${feedbacks.filter(f => f.status === "pending").length})` },
            { key: "approved", label: `Approved (${feedbacks.filter(f => f.status === "approved").length})` },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                filter === t.key
                  ? "text-white border-transparent"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
              style={filter === t.key ? { backgroundColor: "#1e2d6b" } : {}}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 py-8 justify-center">
            <ImSpinner2 className="animate-spin text-lg" style={{ color: "#1e2d6b" }} />
            Memuat data...
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            <BsDatabaseExclamation className="text-4xl mx-auto mb-2" />
            <p>Belum ada feedback.</p>
          </div>
        )}

        {/* Feedback cards */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((fb) => (
              <div
                key={fb.id}
                className={`bg-white rounded-2xl p-5 border shadow-sm ${
                  fb.status === "pending" ? "border-amber-200" : "border-green-200"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{fb.member_name}</p>
                    <p className="text-xs text-gray-500">{fb.member_email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant[fb.status] || "default"}>
                      {fb.status === "pending" ? "⏳ Pending" : "✅ Approved"}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {new Date(fb.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Bintang */}
                <div className="flex gap-0.5 mb-2 text-lg">
                  {renderStars(fb.rating)}
                </div>

                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  "{fb.message}"
                </p>

                {/* Aksi */}
                <div className="flex gap-2">
                  {fb.status === "pending" && (
                    <Button
                      size="sm"
                      icon={<FaCheck />}
                      onClick={() => handleApprove(fb.id)}
                      disabled={loading}
                    >
                      Approve
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="danger"
                    icon={<FaTimes />}
                    onClick={() => handleReject(fb.id)}
                    disabled={loading}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
