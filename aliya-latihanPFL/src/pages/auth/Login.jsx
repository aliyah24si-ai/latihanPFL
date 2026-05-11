import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
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
          setError(
            err.response.data.message ||
              "Username atau password salah!"
          );
        } else {
          setError(
            err.message ||
              "Koneksi bermasalah, coba lagi ya!"
          );
        }
      })

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-teks mb-1">
        Welcome Back
      </h1>

      <p className="text-teks-samping text-sm mb-8">
        Masuk ke dashboard Yummy Catering
      </p>

      {error && (
        <div className="bg-red-50 mb-5 p-3 text-sm text-red-600 rounded-lg flex items-center gap-2 border border-red-100">
          <BsFillExclamationDiamondFill className="shrink-0" />
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-50 mb-5 p-3 text-sm rounded-lg flex items-center gap-2 border border-gray-100">
          <ImSpinner2 className="animate-spin text-navy" />

          <span className="text-gray-500">
            Mohon tunggu...
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">
            Email
          </label>

          <input
            type="text"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="Example@email.com"
            className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-teks mb-1">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder="at least 8 characters"
            className="w-full px-4 py-3 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-navy transition"
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div className="flex justify-end mb-6">
          <Link
            to="/forgot"
            className="text-sm text-navy hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white text-sm transition disabled:opacity-60"
          style={{ backgroundColor: "#1e2d6b" }}
        >
          Sign in
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't you have an account?{" "}
        <Link
          to="/register"
          className="text-navy font-semibold hover:underline"
          style={{ color: "#1e2d6b" }}
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}