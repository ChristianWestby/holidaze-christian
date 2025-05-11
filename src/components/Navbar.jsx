import { Link } from "react-router-dom";
import { Menu, Globe, User, LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-40 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Menu className="w-5 h-5" />
        <Globe className="w-5 h-5" />
      </div>

      <h1 className="text-lg font-semibold tracking-wide">Holidaze</h1>

      <div className="flex items-center gap-4 text-sm">
        <Link to="/" className="hover:underline">Hjem</Link>
        <Link to="/about" className="hover:underline">Om</Link>
        <Link to="/profile" className="hover:underline">Profil</Link>
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