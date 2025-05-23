export default function VenueImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
    />
  );
}