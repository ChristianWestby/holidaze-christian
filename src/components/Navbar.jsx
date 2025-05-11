import { Link } from "react-router-dom";
import { Menu, Globe, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-40 text-white px-6 py-4 flex items-center justify-between">
      {/* Venstre: meny og språk */}
      <div className="flex items-center gap-4 flex-1">
        <Menu className="w-5 h-5" />
        <Globe className="w-5 h-5" />
      </div>

      {/* Midten: logo */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-lg font-semibold tracking-wide">Holidaze</h1>
      </div>

      {/* Høyre: login, register, booking */}
      <div className="flex items-center gap-4 flex-1 justify-end text-sm">
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
          className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition"
        >
          Book nå
        </Link>
      </div>
    </nav>
  );
}