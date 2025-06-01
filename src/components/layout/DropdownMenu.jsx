import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "@utils/auth/AuthContext";
import LogoHolidaze from "@components/common/ui/LogoHolidaze";

export default function DropdownMenu({ onClose, setMenuOpen }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleBookNowClick() {
    handleClose();
    navigate(user ? "/venues" : "/login");
  }

  function handleClose() {
    setMenuOpen(false);
    onClose();
  }

  return (
    <div
      ref={menuRef}
      className="fixed top-0 left-0 min-h-screen max-w-[90%] sm:max-w-[500px] bg-[#1c1c1c] text-white z-50 flex flex-col px-8 py-10 overflow-y-auto shadow-lg"
    >
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 text-white hover:text-gray-400"
        aria-label="Lukk meny"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="mb-10">
        <LogoHolidaze />
      </div>

      <nav className="flex flex-col divide-y divide-white/20 text-left">
        <Link to="/venues" onClick={handleClose} className="py-4 hover:underline text-lg font-medium">
          Alle steder
        </Link>
        <Link to="/highlighted-venues" onClick={handleClose} className="py-4 hover:underline text-lg font-medium">
          Våre utvalgte steder
        </Link>
        <Link to="/" onClick={handleClose} className="py-4 hover:underline text-lg font-medium">
          Til forsiden
        </Link>

        {user ? (
          <>
            <Link to="/profile" onClick={handleClose} className="py-4 hover:underline text-lg font-medium">
              Min profil
            </Link>
            <Link to="/profile#bookings" onClick={handleClose} className="py-4 hover:underline text-lg font-medium">
              Mine bookinger
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" onClick={handleClose} className="py-4 hover:underline text-lg font-medium">
              Logg inn
            </Link>
            <Link to="/register" onClick={handleClose} className="py-4 hover:underline text-lg font-medium">
              Registrer
            </Link>
          </>
        )}

        <Link to="/about" onClick={handleClose} className="py-4 hover:underline text-lg font-medium">
          Om oss
        </Link>
        <a href="mailto:kontakt@holidaze.no" onClick={handleClose} className="py-4 hover:underline text-lg font-medium">
          Kontakt oss
        </a>

       
      </nav>

      <div className="mt-16 border-t border-white/20 pt-6 text-center text-xs text-white/60">
        &copy; {new Date().getFullYear()} Holidaze. En opplevelse du ikke glemmer.
      </div>
    </div>
  );
}