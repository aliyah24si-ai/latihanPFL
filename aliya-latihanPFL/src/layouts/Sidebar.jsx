import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaPlus,
  FaExclamationTriangle,
  FaLock,
  FaBan,
} from "react-icons/fa";

const menuClass = ({ isActive }) =>
  `flex items-center rounded-xl p-3 gap-3 font-medium transition-all ${
    isActive
      ? "bg-ungu text-hijau font-extrabold"
      : "text-gray-500 hover:bg-ungu hover:text-hijau"
  }`;

export default function Sidebar({ isOpen }) {
  return (
    <div
      className={`flex flex-col bg-white shadow-lg transition-all duration-300 overflow-hidden ${
        isOpen ? "w-64 p-6" : "w-0 p-0"
      }`}
    >
      {/* Logo */}
      <div className="mb-8 whitespace-nowrap">
        <p className="font-poppins font-extrabold text-4xl text-gray-800">
          Yummy<span className="text-hijau">.</span>
        </p>
        <p className="text-xs text-gray-400 font-barlow mt-1">
          Catering Admin Dashboard
        </p>
      </div>

      {/* Menu utama */}
      <ul className="space-y-1 flex-1 whitespace-nowrap">
        <li>
          <NavLink to="/" end className={menuClass}>
            <FaHome className="text-lg shrink-0" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className={menuClass}>
            <FaShoppingCart className="text-lg shrink-0" />
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/customers" className={menuClass}>
            <FaUsers className="text-lg shrink-0" />
            Customers
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className={menuClass}>
            <FaUtensils className="text-lg shrink-0" />
            Menu
          </NavLink>
        </li>

        {/* Error pages */}
        <li className="pt-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider px-3 mb-1">
            Error Pages
          </p>
        </li>
        <li>
          <NavLink to="/error-400" className={menuClass}>
            <FaExclamationTriangle className="text-lg shrink-0" />
            Error 400
          </NavLink>
        </li>
        <li>
          <NavLink to="/error-401" className={menuClass}>
            <FaLock className="text-lg shrink-0" />
            Error 401
          </NavLink>
        </li>
        <li>
          <NavLink to="/error-403" className={menuClass}>
            <FaBan className="text-lg shrink-0" />
            Error 403
          </NavLink>
        </li>
      </ul>

      {/* Footer card */}
      <div className="mt-6 whitespace-nowrap">
        <div className="bg-hijau rounded-2xl p-4 flex items-center gap-3">
          <div className="text-white text-xs flex-1">
            <p className="font-semibold mb-2">Atur menu cateringmu! 🍱</p>
            <div className="flex items-center gap-1 bg-white rounded-lg px-3 py-1 cursor-pointer w-fit">
              <FaPlus className="text-hijau text-xs" />
              <span className="text-hijau text-xs font-semibold">Add Menus</span>
            </div>
          </div>
          <img
            src="https://avatar.iran.liara.run/public/28"
            className="w-12 h-12 rounded-full shrink-0"
            alt="avatar"
          />
        </div>
        <p className="text-xs text-gray-400 mt-3">© 2025 Yummy Catering</p>
      </div>
    </div>
  );
}
