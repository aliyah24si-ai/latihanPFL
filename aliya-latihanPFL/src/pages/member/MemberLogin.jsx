import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { membersAPI } from "../../services/membersAPI";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function MemberLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await membersAPI.login(form.email, form.password);
      navigate("/member/dashboard");
    } catch (err) {
      setError(err.message || "Email atau password salah!");
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

        <h1 className="text-2xl font-bold text-gray-800 mb-1 text-center">Login Member</h1>
        <p className="text-gray-500 text-sm mb-6 text-center">Masuk ke akun member kamu</p>

        {error && (
          <div className="bg-red-50 mb-4 p-3 text-sm text-red-600 rounded-lg flex items-center gap-2 border border-red-100">
            <BsFillExclamationDiamondFill className="shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email" name="email" value={form.email}
              onChange={handleChange} placeholder="email@contoh.com"
              required disabled={loading}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password" name="password" value={form.password}
              onChange={handleChange} placeholder="minimal 6 karakter"
              required disabled={loading}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-2.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
            style={{ backgroundColor: "#1e2d6b" }}
          >
            {loading ? <><ImSpinner2 className="animate-spin" /> Masuk...</> : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Belum punya akun?{" "}
          <Link to="/member/register" className="font-semibold hover:underline" style={{ color: "#1e2d6b" }}>
            Daftar Member
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400 mt-2">
          <Link to="/guest" className="hover:underline">← Kembali ke halaman menu</Link>
        </p>
      </div>
    </div>
  );
}
