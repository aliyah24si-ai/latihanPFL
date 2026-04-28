import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message || "Waduh, ada yang salah nih!");
        } else {
          setError(err.message || "Koneksi bermasalah, coba lagi ya!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const errorInfo = error ? (
    <div className="bg-red-50 mb-5 p-4 text-sm text-red-600 rounded-xl flex items-center gap-2 border border-red-100">
      <BsFillExclamationDiamondFill className="text-red-500 text-lg shrink-0" />
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-gray-50 mb-5 p-4 text-sm rounded-xl flex items-center gap-2 border border-gray-100">
      <ImSpinner2 className="animate-spin text-hijau" />
      <span className="text-gray-500">Mohon tunggu sebentar ya... ✨</span>
    </div>
  ) : null;

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 font-poppins">
          Udah laper ya? 🍽️
        </h2>
        <p className="text-teks-samping text-sm mt-1 font-barlow">
          Masuk ke akunmu dulu ya!
        </p>
      </div>

      {errorInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-barlow">
            Username
          </label>
          <input
            type="text"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl shadow-sm placeholder-gray-300 outline-none focus:border-hijau transition"
            placeholder="Contoh: emilys"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1 font-barlow">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={dataForm.password}
              onChange={handleChange}
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-hijau hover:opacity-90 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 font-barlow disabled:opacity-60"
        >
          Masuk Sekarang 🚀
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5 font-barlow">
        Belum punya akun?{" "}
        <Link to="/register" className="text-hijau font-semibold hover:underline">
          Klik register
        </Link>
      </p>
      <p className="text-center text-sm text-gray-400 mt-2 font-barlow">
        <Link to="/forgot" className="hover:underline hover:text-hijau">
          Lupa password?
        </Link>
      </p>
    </div>
  );
}
