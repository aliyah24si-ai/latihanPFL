import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">

      {/* ── LEFT: Form ───────────────────────────────────────────────────── */}
      <div className="w-full lg:w-[52%] flex flex-col justify-center px-8 sm:px-14 lg:px-16 py-10">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="relative w-9 h-9 shrink-0">
            <div className="absolute top-0 left-0 w-5 h-5 rounded-md bg-green-400 opacity-80" />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-md bg-navy opacity-90" />
          </div>
          <span className="font-bold text-navy text-base">Yummy</span>
        </div>

        {/* Page content — Login / Register / Forgot */}
        <Outlet />

        <p className="text-xs text-teks-samping mt-10">
          © 2025 Yummy Catering. All rights reserved.
        </p>
      </div>

      {/* ── RIGHT: Wave panel — hidden on mobile ─────────────────────────── */}
      <div className="hidden lg:block flex-1 relative overflow-hidden rounded-l-[32px] m-3">
        {/* Base background */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #dde0e8 0%, #eceef4 40%, #d8dbe5 100%)" }}
        />

        {/* Wave lines SVG — persis referensi */}
        <svg
          viewBox="0 0 520 900"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <path
              key={i}
              d={`M ${-60 + i * 28} -80 C ${120 + i * 18} 200, ${-40 + i * 22} 500, ${160 + i * 20} 980`}
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              opacity={0.18 + i * 0.028}
            />
          ))}
        </svg>
      </div>

    </div>
  );
}
