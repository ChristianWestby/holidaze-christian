import PropTypes from "prop-types";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p className="text-red-600 text-center text-sm">
      {message}
    </p>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};