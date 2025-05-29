import PropTypes from "prop-types";

export default function VenueHeader({ name, location }) {
  return (
    <div className="text-center mb-8 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-2 text-white">
        {name}
      </h1>
      <div className="h-[2px] w-16 sm:w-20 bg-white/60 mx-auto mb-3 sm:mb-4" />
      <p className="text-xs sm:text-sm md:text-base text-white/80">
        {location?.city}, {location?.country}
      </p>
    </div>
  );
}

VenueHeader.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }),
};