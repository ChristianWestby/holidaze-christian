import { Link } from "react-router-dom";
import { Menu, Globe, LogIn, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 shadow
        ${
          scrolled
            ? "bg-[#f5f5dc] text-black shadow-md" // Sandfarget og tydelig
            : "bg-black bg-opacity-40 text-white"
        }`}
    >
      {/* Venstre ikoner */}
      <div className="flex items-center gap-4">
        <Menu className="w-5 h-5" />
        <Globe className="w-5 h-5" />
      </div>

      {/* Midten logo */}
      <h1 className="text-lg font-semibold tracking-wide">Holidaze</h1>

      {/* Høyre linker */}
      <div className="flex items-center gap-4 text-sm">
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
          className={`px-4 py-1 rounded transition font-medium ${
            scrolled
              ? "bg-black text-white hover:bg-gray-900"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          Book nå
        </Link>
      </div>
    </nav>
  );
}