import PropTypes from "prop-types";

export default function VenueImageGallery({ media, mainImageIndex, setMainImageIndex }) {
  if (!media || media.length < 2) return null;

  const handleThumbnailClick = (index) => setMainImageIndex(index);
  const handlePrevImage = () =>
    setMainImageIndex((prev) => (prev === 1 ? media.length - 1 : prev - 1));
  const handleNextImage = () =>
    setMainImageIndex((prev) => (prev === media.length - 1 ? 1 : prev + 1));

  return (
    <>
      {media[mainImageIndex] && (
        <div className="relative max-w-3xl mx-auto mb-6">
          <img
            src={media[mainImageIndex]}
            alt="Hovedbilde"
            className="w-full h-auto rounded-md shadow-lg"
          />
          <button
            onClick={handlePrevImage}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-black hover:text-white transition"
            aria-label="Forrige bilde"
          >
            ❮
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-black w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-black hover:text-white transition"
            aria-label="Neste bilde"
          >
            ❯
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {media.slice(1).map((url, index) => (
          <img
            key={index + 1}
            src={url}
            alt={`Thumbnail ${index + 1}`}
            className={`w-full h-auto rounded-md cursor-pointer p-1 transition border ${
              mainImageIndex === index + 1 ? "border-black" : "border-transparent"
            }`}
            onClick={() => handleThumbnailClick(index + 1)}
          />
        ))}
      </div>
    </>
  );
}

VenueImageGallery.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
  mainImageIndex: PropTypes.number.isRequired,
  setMainImageIndex: PropTypes.func.isRequired,
};