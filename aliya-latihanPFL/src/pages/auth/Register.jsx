import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 font-poppins">
          Yuk Daftar Dulu! ✨
        </h2>
        <p className="text-teks-samping text-sm mt-1 font-barlow">
          Buat akun baru dan mulai kelola cateringmu 🍱
        </p>
      </div>

      <form>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-barlow">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-300 outline-none focus:border-hijau transition"
            placeholder="Nama kamu siapa? 😊"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-barlow">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-300 outline-none focus:border-hijau transition"
            placeholder="kamu@email.com"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-barlow">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-300 outline-none focus:border-hijau transition pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-barlow">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-300 outline-none focus:border-hijau transition pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full font-semibold py-2 px-4 rounded-xl transition duration-300 font-barlow"
          style={{ backgroundColor: "#d1caea", color: "#4a3a6b" }}
        >
          Daftar Sekarang 🎉
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5 font-barlow">
        Udah punya akun?{" "}
        <Link to="/login" className="text-hijau font-semibold hover:underline">
          Login di sini
        </Link>
      </p>
    </div>
  );
}
