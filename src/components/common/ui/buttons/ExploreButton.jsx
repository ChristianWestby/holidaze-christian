import { Link } from "react-router-dom";

export default function ExploreButton({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-block px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition font-semibold"
    >
      {children}
    </Link>
  );
}