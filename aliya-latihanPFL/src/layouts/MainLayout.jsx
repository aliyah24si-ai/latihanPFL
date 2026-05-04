import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-latar">
      {/* Sidebar - fixed, ga ikut scroll */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Konten utama - yang scroll cuma ini */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
