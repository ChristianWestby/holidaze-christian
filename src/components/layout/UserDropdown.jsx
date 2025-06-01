import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "@utils/auth/AuthContext";
import LogoHolidaze from "@components/common/ui/LogoHolidaze";

export default function UserDropdown({ onClose }) {
  const { user, logout } = useAuth();
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

  return (
    <div
      ref={menuRef}
      className="fixed top-0 right-0 h-full max-w-[90%] sm:max-w-[400px] bg-[#1c1c1c] text-white z-50 flex flex-col px-8 py-10 overflow-y-auto shadow-lg"
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

      <div className="mb-8 flex items-center gap-4 px-1">
  <div
    className={`w-12 h-12 rounded-full overflow-hidden border-2 ${
      user.venueManager ? "border-orange-500 bg-orange-100" : "border-white/30 bg-white"
    } flex items-center justify-center text-sm font-bold`}
  >
    {user.avatar ? (
      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
    ) : (
      <span className={user.venueManager ? "text-orange-700" : "text-black"}>
        {user.name?.[0]?.toUpperCase() || "?"}
      </span>
    )}
  </div>

  <div>
    <p className="font-semibold text-base">{user.name}</p>
    <p className="text-xs text-white/60">Innlogget bruker</p>
  </div>
</div>

      {/* Info-topp */}
      {user.venueManager && (
        <div className="mb-6 px-4 py-2 bg-orange-100 text-orange-800 text-xs font-semibold border border-orange-200">
          Du er venue manager
        </div>
      )}

      {/* Navigasjon */}
      <nav className="flex flex-col divide-y divide-white/20 text-left text-lg font-medium">
        <Link to="/profile" onClick={onClose} className="py-4 hover:underline">
          Min profil
        </Link>
        {user.venueManager && (
         <Link to="/create-venue" onClick={onClose} className="py-4 hover:underline">
            Opprett venue
          </Link>
        )}
        
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="py-4 text-left text-red-400 hover:text-red-200 transition"
        >
          Logg ut
        </button>
      </nav>

      {/* Footer */}
      <div className="mt-16 border-t border-white/20 pt-6 text-center text-xs text-white/60">
        &copy; {new Date().getFullYear()} Holidaze
      </div>
    </div>
  );
}