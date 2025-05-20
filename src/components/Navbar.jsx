import { Link } from "react-router-dom";
import { Menu, Globe, LogIn, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleDropdown() {
    setDropdownOpen((prev) => !prev);
  }

  function closeDropdown() {
    setDropdownOpen(false);
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 shadow ${
        scrolled ? "bg-[#f4f1ea] text-black" : "bg-black bg-opacity-40 text-white"
      }`}
    >
      {/* Venstre side */}
      <div className="flex items-center gap-4">
        <Menu className="w-5 h-5" />
        <Globe className="w-5 h-5" />
      </div>

      {/* Logo */}
      <h1 className="text-lg font-bold tracking-wide">H</h1>

      {/* Høyre side */}
      <div className="flex items-center gap-4 text-sm">
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
                scrolled
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              Book nå
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 bg-white flex items-center justify-center"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-black font-bold">
                  {user.name?.[0]?.toUpperCase() || "?"}
                </span>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow py-2 z-50">
                <Link
                  to="/profile"
                  onClick={closeDropdown}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Min profil
                </Link>

                {user.venueManager && (
                  <>
                    <Link
                      to="/create"
                      onClick={closeDropdown}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Opprett venue
                    </Link>
                    <span className="block px-4 py-2 text-xs text-gray-500">
                      Manager
                    </span>
                  </>
                )}

                <button
                  onClick={() => {
                    logout();
                    closeDropdown();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
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