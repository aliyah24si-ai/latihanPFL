import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { BsCheckCircleFill, BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Forgot() {
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error,   setError]   = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess("");

    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (err) {
      setError(err.message || "Gagal mengirim email reset.");
    } else {
      setSuccess("Link reset password sudah dikirim ke email kamu. Cek inbox atau folder spam.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-teks mb-1">Forgot Password?</h1>
      <p className="text-teks-samping text-sm mb-8">
        Masukkan email kamu dan kami akan kirimkan link reset password.
      </p>

      {success && (
        <div className="bg-green-50 mb-5 p-3 text-sm text-green-700 rounded-lg flex items-center gap-2 border border-green-200">
          <BsCheckCircleFill className="shrink-0" />
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 mb-5 p-3 text-sm text-red-600 rounded-lg flex items-center gap-2 border border-red-100">
          <BsFillExclamationDiamondFill className="shrink-0" />
          {error}
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-teks mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required disabled={loading}
              className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition disabled:opacity-60"
            />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-60"
            style={{ backgroundColor: "#1e2d6b" }}>
            {loading ? <><ImSpinner2 className="animate-spin" /> Mengirim...</> : "Kirim Reset Link"}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-gray-500 mt-6">
        Ingat passwordnya?{" "}
        <Link to="/login" className="font-semibold hover:underline" style={{ color: "#1e2d6b" }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
