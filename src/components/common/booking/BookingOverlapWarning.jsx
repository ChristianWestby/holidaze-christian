import PropTypes from "prop-types";

export default function BookingOverlapWarning({ show }) {
  if (!show) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded text-sm text-center">
      Valgte datoer overlapper med en eksisterende booking. Prøv en annen periode.
    </div>
  );
}

BookingOverlapWarning.propTypes = {
  show: PropTypes.bool.isRequired,
};