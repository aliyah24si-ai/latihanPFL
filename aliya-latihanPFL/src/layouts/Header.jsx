import { FaBell, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../components/ui/navigation-menu";

export default function Header({ onToggle }) {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-garis">
      {/* Kiri */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition text-teks-samping"
        >
          <FaBars className="text-base" />
        </button>

        {/* Navigation Menu shadcn */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm text-teks-samping font-medium">
                Menu
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-2 gap-1 p-3 w-[340px]">
                  {[
                    { label: "Dashboard", path: "/", icon: "🏠", desc: "Ringkasan data CRM" },
                    { label: "Orders", path: "/orders", icon: "🛒", desc: "Kelola pesanan masuk" },
                    { label: "Customers", path: "/customers", icon: "👥", desc: "Data pelanggan setia" },
                    { label: "Menu", path: "/menu", icon: "🍱", desc: "Manajemen menu catering" },
                    { label: "Reports", path: "/reports", icon: "📊", desc: "Laporan & statistik" },
                    { label: "Promotions", path: "/promotions", icon: "🎁", desc: "Promo & diskon aktif" },
                  ].map((item) => (
                    <li key={item.path}>
                      <NavigationMenuLink
                        onClick={() => navigate(item.path)}
                        className="cursor-pointer rounded-lg p-2.5 hover:bg-blue-50 block"
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-base">{item.icon}</span>
                          <span className="text-sm font-semibold text-teks">{item.label}</span>
                        </div>
                        <p className="text-xs text-teks-samping leading-snug">{item.desc}</p>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Kanan */}
      <div className="flex items-center gap-4">
        {/* Tanggal */}
        <span
          className="text-sm font-semibold hidden md:block"
          style={{ color: "#1e2d6b" }}
        >
          {today}
        </span>

        {/* Notif */}
        <div className="relative p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-teks-samping">
          <FaBell className="text-base" />

          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: "#1e2d6b" }}
          ></span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/foto-admin.jpg"
            onError={(e) => {
              e.target.src =
                "https://avatar.iran.liara.run/public/28";
            }}
            className="w-8 h-8 rounded-full object-cover"
            alt="avatar"
          />

          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-teks leading-none">
              Admin Yummy
            </p>

            <p className="text-xs text-teks-samping">
              Catering Manager
            </p>
          </div>

          <span className="text-teks-samping text-xs">▾</span>
        </div>
      </div>
    </div>
  );
}
