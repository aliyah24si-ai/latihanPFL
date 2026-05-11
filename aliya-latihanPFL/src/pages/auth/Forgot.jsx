import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teks mb-1">
        Forgot Password?
      </h1>

      <p className="text-teks-samping text-sm mb-8">
        Masukkan email kamu dan kami akan kirimkan link reset password.
      </p>

      <form>
        {/* EMAIL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-teks mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="Example@email.com"
            className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white text-sm"
          style={{ backgroundColor: "#1e2d6b" }}
        >
          Send Reset Link
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Ingat passwordnya?{" "}
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