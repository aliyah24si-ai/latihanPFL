import { NavLink } from "react-router-dom";
import {
  FaHome, FaShoppingCart, FaUsers, FaUtensils, FaPlus,
  FaExclamationTriangle, FaLock, FaBan,
} from "react-icons/fa";

const menuClass = ({ isActive }) =>
  `flex items-center rounded-2xl px-4 py-3 gap-3 font-medium transition-all text-sm ${
    isActive
      ? "bg-white text-ungu-solid font-bold shadow-sm"
      : "text-white/80 hover:bg-white/20 hover:text-white"
  }`;

export default function Sidebar({ isOpen }) {
  return (
    <div
      style={{ background: "linear-gradient(180deg, #9b8bb4 0%, #d1caea 100%)" }}
      className={`flex flex-col h-screen sticky top-0 transition-all duration-300 overflow-hidden ${
        isOpen ? "w-64 p-6 overflow-y-auto" : "w-0 p-0"
      }`}
    >
      {/* Logo */}
      <div className="mb-8 whitespace-nowrap">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm">
          <span className="text-2xl">🍱</span>
        </div>
        <p className="font-poppins font-extrabold text-2xl text-white">
          Yummy<span className="text-sun">.</span>
        </p>
        <p className="text-xs text-white/70 font-barlow mt-0.5">
          Catering Admin Dashboard
        </p>
      </div>

      {/* Menu utama */}
      <ul className="space-y-1 flex-1 whitespace-nowrap">
        <li>
          <NavLink to="/" end className={menuClass}>
            <FaHome className="text-base shrink-0" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className={menuClass}>
            <FaShoppingCart className="text-base shrink-0" /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/customers" className={menuClass}>
            <FaUsers className="text-base shrink-0" /> Customers
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className={menuClass}>
            <FaUtensils className="text-base shrink-0" /> Menu
          </NavLink>
        </li>

        <li className="pt-4">
          <p className="text-xs text-white/50 uppercase tracking-wider px-4 mb-1">
            Error Pages
          </p>
        </li>
        <li>
          <NavLink to="/error-400" className={menuClass}>
            <FaExclamationTriangle className="text-base shrink-0" /> Error 400
          </NavLink>
        </li>
        <li>
          <NavLink to="/error-401" className={menuClass}>
            <FaLock className="text-base shrink-0" /> Error 401
          </NavLink>
        </li>
        <li>
          <NavLink to="/error-403" className={menuClass}>
            <FaBan className="text-base shrink-0" /> Error 403
          </NavLink>
        </li>
      </ul>

      {/* Footer card */}
      <div className="mt-6 whitespace-nowrap">
        <div className="bg-white/20 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <img
              src="/foto-admin.jpg"
              onError={(e) => { e.target.src = "https://avatar.iran.liara.run/public/28" }}
              className="w-10 h-10 rounded-full shrink-0 border-2 border-white object-cover"
              alt="avatar"
            />
            <div className="text-white text-xs">
              <p className="font-semibold">Admin Yummy</p>
              <p className="text-white/60">Catering Manager</p>
            </div>
          </div>
          <div
            className="flex items-center gap-1 bg-white rounded-xl px-3 py-2 cursor-pointer mt-3 justify-center hover:bg-white/90"
          >
            <FaPlus className="text-ungu-solid text-xs" />
            <span className="text-ungu-solid text-xs font-semibold">Add Menus</span>
          </div>
        </div>
        <p className="text-xs text-white/40 mt-3 text-center">© 2025 Yummy Catering</p>
      </div>
    </div>
  );
}
