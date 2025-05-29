import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function BackToLink({ to = "/", label = "← Tilbake", className = "" }) {
  return (
    <div className={`mt-12 mb-4 ${className}`}>
      <Link
        to={to}
        className="text-sm text-gray-500 underline hover:text-black transition"
      >
        {label}
      </Link>
    </div>
  );
}

BackToLink.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};