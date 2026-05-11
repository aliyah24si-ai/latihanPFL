import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teks mb-1">
        Create Account
      </h1>

      <p className="text-teks-samping text-sm mb-8">
        Daftar untuk akses dashboard Yummy Catering
      </p>

      <form>
        {/* FULL NAME */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Your full name"
            className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">
            Email
          </label>

          <input
            type="email"
            placeholder="Example@email.com"
            className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">
            Password
          </label>

          <input
            type="password"
            placeholder="at least 8 characters"
            className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-teks mb-1">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Repeat password"
            className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white text-sm"
          style={{ backgroundColor: "#1e2d6b" }}
        >
          Sign up
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
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