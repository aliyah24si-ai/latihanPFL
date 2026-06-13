import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../../services/authAPI";

import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [dataForm, setDataForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validasi password cocok
    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Password dan Confirm Password tidak sama!");
      return;
    }

    if (dataForm.password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }

    setLoading(true);

    try {
      await authAPI.register(dataForm.fullName, dataForm.email, dataForm.password);
      setSuccess(
        "Pendaftaran berhasil! Silakan cek email untuk verifikasi, lalu login."
      );
      // Redirect ke login setelah 3 detik
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message || "Pendaftaran gagal, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-teks mb-1">Create Account</h1>
      <p className="text-teks-samping text-sm mb-8">
        Daftar untuk akses dashboard Yummy Catering
      </p>

      {/* Error */}
      {error && (
        <div className="bg-red-50 mb-5 p-3 text-sm text-red-600 rounded-lg flex items-center gap-2 border border-red-100">
          <BsFillExclamationDiamondFill className="shrink-0" />
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="bg-green-50 mb-5 p-3 text-sm text-green-700 rounded-lg flex items-center gap-2 border border-green-200">
          <BsCheckCircleFill className="shrink-0" />
          {success}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-gray-50 mb-5 p-3 text-sm rounded-lg flex items-center gap-2 border border-gray-100">
          <ImSpinner2 className="animate-spin text-navy" />
          <span className="text-gray-500">Mendaftarkan akun...</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* FULL NAME */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={dataForm.fullName}
            onChange={handleChange}
            placeholder="Nama lengkap kamu"
            disabled={loading}
            required
            className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition disabled:opacity-60"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="example@email.com"
            disabled={loading}
            required
            className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition disabled:opacity-60"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder="minimal 6 karakter"
            disabled={loading}
            required
            className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition disabled:opacity-60"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-teks mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={dataForm.confirmPassword}
            onChange={handleChange}
            placeholder="Ulangi password"
            disabled={loading}
            required
            className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition disabled:opacity-60"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white text-sm transition disabled:opacity-60"
          style={{ backgroundColor: "#1e2d6b" }}
        >
          {loading ? "Mendaftar..." : "Sign up"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="font-semibold hover:underline"
          style={{ color: "#1e2d6b" }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
