import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUtensils, FaGift, FaRobot, FaStar, FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { supabase } from "../services/supabaseClient";
import { membersAPI } from "../services/membersAPI";

const navLinks = [
  { to: "/guest",         label: "Menu",    icon: <FaUtensils /> },
  { to: "/guest/promo",   label: "Promo",   icon: <FaGift /> },
  { to: "/guest/service", label: "Layanan", icon: <FaRobot /> },
  { to: "/guest/reward",  label: "Reward",  icon: <FaStar /> },
];

export default function GuestLayout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [member,    setMember]    = useState(null); // null = belum cek, false = tidak login

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        try {
          const profile = await membersAPI.getProfile(session.user.id);
          setMember(profile);
        } catch {
          setMember(false);
        }
      } else {
        setMember(false);
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) setMember(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await membersAPI.logout();
    setMember(false);
    navigate("/guest");
  };

  const isLoggedIn = member && member !== false;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 shrink-0">
              <div className="absolute top-0 left-0 w-5 h-5 rounded-md bg-green-400 opacity-80" />
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-md opacity-90" style={{ backgroundColor: "#1e2d6b" }} />
            </div>
            <span className="font-bold text-sm" style={{ color: "#1e2d6b" }}>Yummy Catering</span>
          </div>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((n) => (
              <li key={n.to}>
                <Link to={n.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === n.to ? "text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                  style={pathname === n.to ? { backgroundColor: "#1e2d6b" } : {}}
                >
                  {n.icon}{n.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop buttons — berubah sesuai status login */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link to="/member/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border transition"
                  style={{ borderColor: "#1e2d6b", color: "#1e2d6b" }}
                >
                  <FaUserCircle />
                  {member.full_name?.split(" ")[0]}
                </Link>
                <button onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/member/login"
                  className="px-4 py-2 text-sm font-semibold rounded-lg border transition"
                  style={{ borderColor: "#1e2d6b", color: "#1e2d6b" }}
                >
                  Login Member
                </Link>
                <Link to="/member/register"
                  className="px-4 py-2 text-sm font-semibold rounded-lg text-white transition"
                  style={{ backgroundColor: "#1e2d6b" }}
                >
                  Daftar Member
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-1 border-t border-gray-100">
            {navLinks.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === n.to ? "text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
                style={pathname === n.to ? { backgroundColor: "#1e2d6b" } : {}}
              >
                {n.icon}{n.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <>
                <Link to="/member/dashboard" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg border mt-2"
                  style={{ borderColor: "#1e2d6b", color: "#1e2d6b" }}
                >
                  <FaUserCircle /> Dashboard Member
                </Link>
                <button onClick={() => { setMenuOpen(false); handleSignOut(); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg text-red-500 border border-red-200 mt-1"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/member/login" onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg mt-2 border"
                  style={{ borderColor: "#1e2d6b", color: "#1e2d6b" }}
                >Login Member</Link>
                <Link to="/member/register" onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg text-white mt-1"
                  style={{ backgroundColor: "#1e2d6b" }}
                >Daftar Member</Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-200 mt-8">
        <p>© 2025 Yummy Catering — All rights reserved</p>
        <Link to="/login" className="text-gray-400 hover:text-gray-600 underline mt-1 inline-block">
          Admin Login
        </Link>
      </footer>
    </div>
  );
}
