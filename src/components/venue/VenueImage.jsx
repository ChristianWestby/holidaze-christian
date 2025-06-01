export default function VenueImage({ media, name }) {
  const image = media && media.length > 0 ? media[0] : "https://placehold.co/800x400?text=Ingen+bilde";

  return (
    <div className="w-full mb-6">
      <img
        src={image}
        alt={name || "Venue bilde"}
        className="w-full h-64 object-cover rounded-lg shadow"
      />
    </div>
  );
}