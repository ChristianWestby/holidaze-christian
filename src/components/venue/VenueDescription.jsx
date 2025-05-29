import PropTypes from "prop-types";

export default function VenueDescription({ description }) {
  return (
    <p className="text-gray-700 text-lg mb-6 leading-relaxed border-t pt-6 border-black/20">
      {description}
    </p>
  );
}

VenueDescription.propTypes = {
  description: PropTypes.string.isRequired,
};