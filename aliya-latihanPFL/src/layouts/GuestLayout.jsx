import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUtensils, FaGift, FaRobot, FaStar, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { to: "/guest",         label: "Menu",        icon: <FaUtensils /> },
  { to: "/guest/promo",   label: "Promo",       icon: <FaGift /> },
  { to: "/guest/service", label: "Layanan",     icon: <FaRobot /> },
  { to: "/guest/reward",  label: "Reward",      icon: <FaStar /> },
];

export default function GuestLayout({ children }) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 shrink-0">
              <div className="absolute top-0 left-0 w-5 h-5 rounded-md bg-green-400 opacity-80" />
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-md bg-navy opacity-90" style={{ backgroundColor: "#1e2d6b" }} />
            </div>
            <span className="font-bold text-sm" style={{ color: "#1e2d6b" }}>
              Yummy Catering
            </span>
          </div>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === n.to
                      ? "text-white"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                  style={pathname === n.to ? { backgroundColor: "#1e2d6b" } : {}}
                >
                  {n.icon}
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Login button */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold rounded-lg text-white transition"
              style={{ backgroundColor: "#1e2d6b" }}
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-1 border-t border-gray-100">
            {navLinks.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === n.to
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                style={pathname === n.to ? { backgroundColor: "#1e2d6b" } : {}}
              >
                {n.icon}
                {n.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg text-white mt-2"
              style={{ backgroundColor: "#1e2d6b" }}
            >
              Admin Login
            </Link>
          </div>
        )}
      </nav>

      {/* ── Content ────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-200 mt-8">
        © 2025 Yummy Catering — All rights reserved
      </footer>
    </div>
  );
}
