import PropTypes from "prop-types";

export default function VenueImageGallery({ media, mainImageIndex, setMainImageIndex }) {
  if (!media || media.length === 0) return null;

  const prevImage = () => {
    setMainImageIndex((idx) => (idx === 0 ? media.length - 1 : idx - 1));
  };
  const nextImage = () => {
    setMainImageIndex((idx) => (idx === media.length - 1 ? 0 : idx + 1));
  };

  return (
    <section className="mt-10 max-w-4xl mx-auto bg-gray-900 p-4 rounded-md shadow-lg relative">
      {/* Hovedbilde */}
      <div className="relative w-full rounded-md overflow-hidden">
        <img
          src={media[mainImageIndex]}
          alt={`Bilde ${mainImageIndex + 1}`}
          className="w-full h-[250px] sm:h-[350px] lg:h-[400px] object-cover transition-transform duration-500 ease-in-out rounded-md"
        />
      </div>

      {/* Navigasjonsknapper utenfor hovedbildet */}
      <button
        onClick={prevImage}
        aria-label="Forrige bilde"
        className="absolute top-1/2 left-[-40px] transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 focus:outline-none z-20"
      >
        &#10094;
      </button>

      <button
        onClick={nextImage}
        aria-label="Neste bilde"
        className="absolute top-1/2 right-[-40px] transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 focus:outline-none z-20"
      >
        &#10095;
      </button>

      {/* Thumbnails */}
      <div className="mt-6 flex justify-center space-x-2 sm:space-x-4 overflow-x-auto px-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {media.map((img, idx) => (
          <button
            key={img}
            onClick={() => setMainImageIndex(idx)}
            className={`focus:outline-none overflow-hidden transition-transform duration-300
              ${idx === mainImageIndex ? "ring-2 ring-blue-500 scale-105" : "opacity-70 hover:opacity-100"}
              w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md`}
            aria-label={`Vis bilde ${idx + 1}`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover rounded-md"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

VenueImageGallery.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
  mainImageIndex: PropTypes.number.isRequired,
  setMainImageIndex: PropTypes.func.isRequired,
};