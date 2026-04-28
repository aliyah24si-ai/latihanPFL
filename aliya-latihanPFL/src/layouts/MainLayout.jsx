import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-latar">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Konten utama */}
      <div className="flex flex-col flex-1">
        <Header onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
