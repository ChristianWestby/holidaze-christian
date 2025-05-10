export default function VenueCard({ venue }) {
  return (
    <div className="venue-card border rounded p-4 shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">{venue.name}</h2>

      <img
        src={venue.media?.[0] || "https://placehold.co/400x300"}
        alt={venue.name}
        className="w-full h-48 object-cover rounded mb-2"
      />

      <p className="mb-2 text-sm text-gray-700">
        {venue.description || "Ingen beskrivelse tilgjengelig."}
      </p>
    </div>
  );
}