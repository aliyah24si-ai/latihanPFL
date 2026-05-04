import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div>
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🔑</div>
        <h2 className="text-2xl font-semibold text-gray-700 font-poppins">
          Lupa Password?
        </h2>
        <p className="text-teks-samping text-sm mt-2 font-barlow">
          Tenang aja, kita bantu reset passwordmu ya! Masukkan email kamu di bawah ini.
        </p>
      </div>

      <form>
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

        <button
          type="submit"
          className="w-full font-semibold py-2 px-4 rounded-xl transition duration-300 font-barlow"
          style={{ backgroundColor: "#80b0e8", color: "#1a3a5c" }}
        >
          Kirim Link Reset 📧
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5 font-barlow">
        Inget passwordnya?{" "}
        <Link to="/login" className="text-hijau font-semibold hover:underline">
          Balik login
        </Link>
      </p>
    </div>
  );
}
