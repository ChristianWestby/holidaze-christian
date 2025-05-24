import { Link } from "react-router-dom";

export default function HeroButton({ to, label }) {
  return (
    <Link
      to={to}
      className="inline-block px-4 py-2 border border-white bg-white text-black text-sm uppercase tracking-wide transition hover:bg-black hover:text-white"
    >
      {label}
    </Link>
  );
}