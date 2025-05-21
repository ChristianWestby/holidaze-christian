import { Link } from "react-router-dom";
import { Menu, Globe, LogIn, UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 shadow ${
        scrolled ? "bg-[#f4f1ea] text-black" : "bg-black bg-opacity-40 text-white"
      }`}
    >
      {/* Venstre meny */}
      <div className="relative" ref={menuRef}>
        <button onClick={() => setMenuOpen((prev) => !prev)} className="flex items-center gap-2">
          <Menu className="w-5 h-5" />
          <Globe className="w-5 h-5" />
        </button>

        {menuOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow py-2 z-50">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Hjem</Link>
            <Link to="/booking" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Bookinger</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Om oss</Link>
          </div>
        )}
      </div>

      {/* Logo */}
      <div className="flex items-center gap-4 flex-1 justify-center">
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-12 bg-white relative">
            <div className="absolute left-0 top-[-2px] h-[4px] w-[1px] bg-white"></div>
            <div className="absolute right-0 top-[-2px] h-[4px] w-[1px] bg-white"></div>
          </div>
          <h1 className="text-3xl font-bold tracking-wide font-[Playfair Display] text-white">H</h1>
          <div className="h-[1px] w-12 bg-white relative">
            <div className="absolute left-0 top-[-2px] h-[4px] w-[1px] bg-white"></div>
            <div className="absolute right-0 top-[-2px] h-[4px] w-[1px] bg-white"></div>
          </div>
        </div>
      </div>

      {/* Høyre brukerikon */}
      <div className="flex items-center gap-4 text-sm" ref={dropdownRef}>
        {!user ? (
          <>
            <Link to="/login" className="hover:underline flex items-center gap-1">
              <LogIn className="w-4 h-4" />
              Logg inn
            </Link>
            <Link to="/register" className="hover:underline flex items-center gap-1">
              <UserPlus className="w-4 h-4" />
              Registrer
            </Link>
            <Link
              to="/login"
              className={`px-4 py-1 rounded transition ${
                scrolled ? "bg-black text-white hover:bg-gray-900" : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              Book nå
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border-2 ${
                user.venueManager ? "border-orange-500 bg-orange-100" : "border-gray-300 bg-white"
              }`}
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className={`font-bold ${user.venueManager ? "text-orange-700" : "text-black"}`}>
                  {user.name?.[0]?.toUpperCase() || "?"}
                </span>
              )}
            </button>

           {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-52 bg-white/90 text-black rounded-md border border-gray-300 shadow-lg py-2 z-50 backdrop-blur-sm">
    
    {/* Manager-indikator øverst */}
    {user.venueManager && (
      <div className="px-4 py-2 bg-orange-100 text-orange-800 text-xs font-semibold rounded-t-md border-b border-gray-300">
         Du er manager
      </div>
    )}

    {/* Lenker */}
    <Link
      to="/profile"
      onClick={() => setDropdownOpen(false)}
      className="block px-4 py-2 hover:bg-gray-100 transition"
    >
      Min profil
    </Link>

    {user.venueManager && (
      <Link
        to="/create"
        onClick={() => setDropdownOpen(false)}
        className="block px-4 py-2 hover:bg-gray-100 transition"
      >
        Opprett venue
      </Link>
    )}

    {/* Logout-knapp */}
    <button
      onClick={() => {
        logout();
        setDropdownOpen(false);
      }}
      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
    >
      Logg ut
    </button>
  </div>
)}
          </div>
        )}
      </div>
    </nav>
  );
}