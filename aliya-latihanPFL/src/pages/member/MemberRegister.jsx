import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { membersAPI } from "../../services/membersAPI";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function MemberRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", password: "", confirm: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (form.password !== form.confirm) { setError("Password tidak sama!"); return; }
    if (form.password.length < 6) { setError("Password minimal 6 karakter!"); return; }

    setLoading(true);
    try {
      await membersAPI.register(form.full_name, form.email, form.phone, form.password);
      setSuccess("Pendaftaran berhasil! Silakan login dengan akun barumu.");
      setTimeout(() => navigate("/member/login"), 2500);
    } catch (err) {
      setError(err.message || "Pendaftaran gagal, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute top-0 left-0 w-5 h-5 rounded-md bg-green-400 opacity-80" />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-md opacity-90" style={{ backgroundColor: "#1e2d6b" }} />
          </div>
          <span className="font-bold text-sm" style={{ color: "#1e2d6b" }}>Yummy Catering</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-1 text-center">Daftar Member</h1>
        <p className="text-gray-500 text-sm mb-6 text-center">Daftar gratis dan nikmati keuntungan member</p>

        {error && (
          <div className="bg-red-50 mb-4 p-3 text-sm text-red-600 rounded-lg flex items-center gap-2 border border-red-100">
            <BsFillExclamationDiamondFill className="shrink-0" />{error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 mb-4 p-3 text-sm text-green-700 rounded-lg flex items-center gap-2 border border-green-200">
            <BsCheckCircleFill className="shrink-0" />{success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: "Nama Lengkap", name: "full_name", type: "text",     placeholder: "Nama kamu" },
            { label: "Email",        name: "email",     type: "email",    placeholder: "email@contoh.com" },
            { label: "No. HP / WA",  name: "phone",     type: "text",     placeholder: "08xxxxxxxxxx" },
            { label: "Password",     name: "password",  type: "password", placeholder: "minimal 6 karakter" },
            { label: "Ulangi Password", name: "confirm", type: "password", placeholder: "Ulangi password" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
              <input
                type={f.type} name={f.name} value={form[f.name]}
                onChange={handleChange} placeholder={f.placeholder}
                required disabled={loading}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
              />
            </div>
          ))}

          <button
            type="submit" disabled={loading}
            className="w-full py-2.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            style={{ backgroundColor: "#1e2d6b" }}
          >
            {loading ? <><ImSpinner2 className="animate-spin" /> Mendaftar...</> : "Daftar Sekarang"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Sudah punya akun?{" "}
          <Link to="/member/login" className="font-semibold hover:underline" style={{ color: "#1e2d6b" }}>
            Login Member
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400 mt-2">
          <Link to="/guest" className="hover:underline">← Kembali ke halaman menu</Link>
        </p>
      </div>
    </div>
  );
}
