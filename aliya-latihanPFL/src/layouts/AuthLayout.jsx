import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #FFC0C0 0%, #D1CAEA 50%, #F29CC3 100%)" }}>
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="font-poppins font-extrabold text-4xl text-gray-800">
            Yummy<span className="text-hijau">.</span>
          </h1>
          <p className="text-teks-samping text-sm font-barlow mt-1">
            Catering Admin Dashboard 🍱
          </p>
        </div>

        <Outlet />

        <p className="text-center text-xs text-gray-400 mt-6 font-barlow">
          © 2025 Yummy Catering Admin Dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
}
