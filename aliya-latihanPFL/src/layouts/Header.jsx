import { FaBell, FaSearch, FaBars } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

export default function Header({ onToggle }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      {/* Kiri: tombol toggle + search */}
      <div className="flex items-center gap-4">
        {/* Tombol toggle sidebar */}
        <button
          onClick={onToggle}
          className="p-2 rounded-xl bg-ungu text-gray-600 hover:bg-ungu/70 transition"
        >
          <FaBars className="text-lg" />
        </button>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cari sesuatu... 🔍"
            className="border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm outline-none focus:border-hijau w-64"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
        </div>
      </div>

      {/* Kanan: icon + profil */}
      <div className="flex items-center gap-3">
        <div className="relative p-2 bg-biru-muda/20 rounded-xl text-biru-muda cursor-pointer">
          <FaBell />
          <span className="absolute -top-1 -right-1 bg-biru-muda text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            5
          </span>
        </div>
        <div className="p-2 bg-peach/40 rounded-xl text-tomato cursor-pointer">
          <SlSettings />
        </div>
        <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-700">Admin Yummy</p>
            <p className="text-xs text-gray-400">Catering Manager</p>
          </div>
          <img
            src="https://avatar.iran.liara.run/public/28"
            className="w-9 h-9 rounded-full"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
}
