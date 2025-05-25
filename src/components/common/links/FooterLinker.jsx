import { Link } from "react-router-dom";

export default function FooterLinker() {
  return (
    <div className="space-y-2 mt-4">
      <Link to="/about" className="block hover:underline">Om oss</Link>
      <Link to="/" className="block hover:underline">Forside</Link>
      <Link to="/vision" className="block hover:underline">Visjon</Link>
      <span className="block">Presse</span>
      <span className="block">Jobb hos oss</span>
      <span className="block">Privacy policy</span>
      <span className="block">Terms and conditions</span>
    </div>
  );
}