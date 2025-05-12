import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Globe, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isManager, setIsManager] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    }

    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("userName");
    const manager = localStorage.getItem("venueManager") === "true";

    setLoggedIn(!!token);
    setUserName(name);
    setIsManager(manager);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  function closeMenu() {
    setDropdownOpen(false);
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 shadow ${
        scrolled
          ? "bg-[#f4f1ea] text-black"
          : "bg-black bg-opacity-40 text-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <Menu className="w-5 h-5" />
        <Globe className="w-5 h-5" />
      </div>

      <h1 className="text-lg font-semibold tracking-wide">Holidaze</h1>

      <div className="flex items-center gap-4 text-sm">
        {!loggedIn ? (
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
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold"
            >
              {userName?.[0]?.toUpperCase() || "?"}
            </button>
            {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow py-2 z-50">
    <Link
      to="/profile"
      onClick={closeMenu}
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Min profil
    </Link>
    <Link
      to="/"
      onClick={closeMenu}
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Tilbake til forside
    </Link>
    {isManager && (
      <span className="block px-4 py-2 text-xs text-gray-500">
        Manager
      </span>
    )}
    <button
      onClick={() => {
        handleLogout();
        closeMenu();
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