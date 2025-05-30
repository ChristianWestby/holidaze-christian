import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "@utils/auth/AuthContext";
import LogoHolidaze from "@components/common/ui/LogoHolidaze";
import BackToLink from "@components/common/navigation/BackToLink";

export default function DropdownMenu({ onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  function handleBookNowClick() {
    if (user) {
      navigate("/venues");
    } else {
      navigate("/login");
    }
    onClose();
  }

  return (
    <div
      ref={menuRef}
      className="fixed top-0 left-0 h-full max-w-[90%] sm:max-w-[500px] bg-[#1c1c1c] text-white z-50 flex flex-col px-8 py-10 overflow-y-auto shadow-lg"
    >
      {/* Lukk-knapp */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-400"
        aria-label="Lukk meny"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Logo */}
      <div className="mb-10">
        <LogoHolidaze />
      </div>

     <nav className="flex flex-col divide-y divide-white/20 text-left">
  <Link to="/venues" onClick={onClose} className="py-4 hover:underline text-lg font-medium">
    Alle steder
  </Link>
  <Link to="/highlighted-venues" onClick={onClose} className="py-4 hover:underline text-lg font-medium">
    Våre utvalgte steder
  </Link>
  {/* Bytt ut BackToLink med vanlig Link */}
  <Link to="/" onClick={onClose} className="py-4 hover:underline text-lg font-medium">
    Til forsiden
  </Link>
  {user && (
    <Link to="/profile" onClick={onClose} className="py-4 hover:underline text-lg font-medium">
      Min profil
    </Link>
  )}
  {user && (
    <Link to="/profile" onClick={onClose} className="py-4 hover:underline text-lg font-medium">
      Mine bookinger
    </Link>
  )}
  <Link to="/about" onClick={onClose} className="py-4 hover:underline text-lg font-medium">
    Om oss
  </Link>
  <a href="mailto:kontakt@holidaze.no" onClick={onClose} className="py-4 hover:underline text-lg font-medium">
    Kontakt oss
  </a>

  {/* Book nå */}
  <button
    onClick={handleBookNowClick}
    className="mt-8 py-4 hover:underline text-lg font-medium text-left"
  >
    Book nå
  </button>
</nav>

      {/* Footer-tekst */}
      <div className="mt-16 border-t border-white/20 pt-6 text-center text-xs text-white/60">
        &copy; {new Date().getFullYear()} Holidaze. En opplevelse du ikke glemmer.
      </div>
    </div>
  );
}