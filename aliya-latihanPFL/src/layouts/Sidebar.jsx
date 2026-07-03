import { NavLink, Link } from "react-router-dom";

import {
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaGift,
  FaExclamationTriangle,
  FaLock,
  FaBan,
  FaPuzzlePiece,
  FaUserShield,
  FaChartLine,
  FaChartPie,
  FaExternalLinkAlt,
  FaCommentAlt,
} from "react-icons/fa";

const menuClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
    isActive
      ? "text-navy font-bold bg-blue-50"
      : "text-teks-samping hover:text-navy hover:bg-gray-50"
  }`;

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`flex flex-col bg-white border-r border-garis h-screen sticky top-0 transition-all duration-300 overflow-hidden ${
        isOpen ? "w-56 p-5 overflow-y-auto" : "w-0 p-0"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 whitespace-nowrap">
        <div className="relative w-8 h-8 shrink-0">
          <div className="absolute top-0 left-0 w-5 h-5 rounded-md bg-green-400 opacity-80"></div>
          <div
            className="absolute bottom-0 right-0 w-5 h-5 rounded-md opacity-90"
            style={{ backgroundColor: "#1e2d6b" }}
          ></div>
        </div>
        <span
          className="font-poppins font-bold text-sm whitespace-nowrap"
          style={{ color: "#1e2d6b" }}
        >
          Yummy
        </span>
      </div>

      {/* Menu */}
      <ul className="space-y-1 flex-1 whitespace-nowrap">

        {/* ── Dashboard ─────────────────────────────────── */}
        <li>
          <p className="text-xs text-gray-400 uppercase tracking-wider px-4 mb-1">
            Dashboard
          </p>
        </li>
        <li>
          <NavLink to="/dashboard" end className={menuClass}>
            <FaChartLine className="text-base shrink-0" />
            Dashboard Penjualan
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard-pelanggan" className={menuClass}>
            <FaChartPie className="text-base shrink-0" />
            Dashboard Pelanggan
          </NavLink>
        </li>

        {/* ── Main Menu ─────────────────────────────────── */}
        <li className="pt-3">
          <p className="text-xs text-gray-400 uppercase tracking-wider px-4 mb-1">
            Manajemen
          </p>
        </li>
        <li>
          <NavLink to="/orders" className={menuClass}>
            <FaShoppingCart className="text-base shrink-0" />
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/customers" className={menuClass}>
            <FaUsers className="text-base shrink-0" />
            Customers
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className={menuClass}>
            <FaUtensils className="text-base shrink-0" />
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/promotions" className={menuClass}>
            <FaGift className="text-base shrink-0" />
            Promotions
          </NavLink>
        </li>

        {/* ── Admin ─────────────────────────────────────── */}
        <li className="pt-3">
          <p className="text-xs text-gray-400 uppercase tracking-wider px-4 mb-1">
            Admin
          </p>
        </li>
        <li>
          <NavLink to="/users" className={menuClass}>
            <FaUserShield className="text-base shrink-0" />
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/feedbacks" className={menuClass}>
            <FaCommentAlt className="text-base shrink-0" />
            Feedbacks
          </NavLink>
        </li>
        <li>
          <NavLink to="/components" className={menuClass}>
            <FaPuzzlePiece className="text-base shrink-0" />
            Components
          </NavLink>
        </li>

        {/* ── Error Pages ───────────────────────────────── */}
        <li className="pt-3">
          <p className="text-xs text-gray-400 uppercase tracking-wider px-4 mb-1">
            Error Pages
          </p>
        </li>
        <li>
          <NavLink to="/error-400" className={menuClass}>
            <FaExclamationTriangle className="text-base shrink-0" />
            Error 400
          </NavLink>
        </li>
        <li>
          <NavLink to="/error-401" className={menuClass}>
            <FaLock className="text-base shrink-0" />
            Error 401
          </NavLink>
        </li>
        <li>
          <NavLink to="/error-403" className={menuClass}>
            <FaBan className="text-base shrink-0" />
            Error 403
          </NavLink>
        </li>
      </ul>

      <Link
        to="/guest"
        className="flex items-center gap-2 text-xs text-gray-400 hover:text-navy mt-4 mb-1 px-1 transition-colors whitespace-nowrap"
      >
        <FaExternalLinkAlt className="text-xs shrink-0" />
        Lihat Halaman Guest
      </Link>

      <p className="text-xs text-gray-400 whitespace-nowrap">
        © 2025 Yummy Catering
      </p>    </div>
  );
}
