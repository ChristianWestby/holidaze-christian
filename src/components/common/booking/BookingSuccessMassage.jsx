import PropTypes from "prop-types";

export default function BookingSuccessMessage({ delay = 2000 }) {
  return (
    <div className="text-green-700 text-center font-medium animate-pulse">
      Booking fullført! Du sendes videre om {delay / 1000} sekunder ...
    </div>
  );
}

BookingSuccessMessage.propTypes = {
  delay: PropTypes.number,
};