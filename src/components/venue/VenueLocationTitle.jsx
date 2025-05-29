import PropTypes from "prop-types";

export default function VenueLocationTitle({ location, children }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-[#f4f1ea] rounded-xl shadow-inner p-6 md:p-10 mb-12 border border-black/10">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-700 mb-6">
          {location.city}, {location.country}
        </h2>
        {children}
      </div>
    </div>
  );
}

VenueLocationTitle.propTypes = {
  location: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};