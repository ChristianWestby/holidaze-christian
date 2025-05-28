import { Link } from "react-router-dom";

export default function BackToMenuButton({ to = "/", label = "Tilbake til meny" }) {
  return (
    <div className="mt-10">
      <Link
        to={"/"}
        className="inline-block text-sm font-medium text-white underline-offset-4 hover:underline hover:text-black-800 transition"
      >
        ← {label}
      </Link>
    </div>
  );
}