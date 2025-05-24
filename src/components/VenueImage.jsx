export default function VenueImage({ image, alt }) {
  return (
    <img
      src={image || "/fallback.jpg"}
      alt={alt || "Bilde mangler"}
      className="w-full h-48 object-cover"
    />
  );
}