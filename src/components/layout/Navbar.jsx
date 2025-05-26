import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Globe, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@utils/auth/AuthContext";
import LogoHolidaze from "@components/common/ui/LogoHolidaze";
import DropdownMenu from "@components/layout/DropdownMenu";
import UserDropdown from "@components/layout/UserDropdown";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
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
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 shadow ${
          scrolled ? "bg-[#f4f1ea] text-black" : "bg-black bg-opacity-40 text-white"
        }`}
      >
        {/* Venstre menyknapp */}
        <div className="relative">
          <button onClick={() => setMenuOpen(true)} className="flex items-center gap-2">
            <Menu className="w-5 h-5" />
            <Globe className="w-5 h-5" />
          </button>
          {menuOpen && <DropdownMenu onClose={() => setMenuOpen(false)} />}
        </div>

        {/* Logo */}
        <div className="flex items-center gap-4 flex-1 justify-center">
          <LogoHolidaze scrolled={scrolled} />
        </div>

        {/* Høyre brukerikon / pålogging */}
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
            <>
              <button
                onClick={() => setDropdownOpen(true)}
                className={`w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border-2 transition ${
                  user.venueManager ? "border-orange-500 bg-orange-100" : "border-gray-300 bg-white"
                }`}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className={`font-bold text-sm ${user.venueManager ? "text-orange-700" : "text-black"}`}>
                    {user.name?.[0]?.toUpperCase() || "?"}
                  </span>
                )}
              </button>

              {dropdownOpen && <UserDropdown onClose={() => setDropdownOpen(false)} />}
            </>
          )}
        </div>
      </nav>
    </>
  );
}