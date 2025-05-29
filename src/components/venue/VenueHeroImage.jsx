import PropTypes from "prop-types";

export default function VenueHeroImage({ image, name, location }) {
  if (!image) return null;

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <img
        src={image}
        alt="Hero"
        className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl sm:text-5xl font-semibold drop-shadow-lg inline-block border-b-2 border-white pb-2 tracking-wide">
          {name}
        </h1>
        <div className="mt-4 text-white text-sm sm:text-base">
          <span className="tracking-tight">{location?.city}, </span>
          <span className="font-semibold">{location?.country}</span>
        </div>
      </div>
    </div>
  );
}

VenueHeroImage.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }),
};