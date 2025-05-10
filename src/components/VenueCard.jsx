import { Link } from "react-router-dom";

export default function VenueCard({ venue }) {
  const image = venue.media?.[0];

  return (
    <div className="p-4 bg-white rounded shadow">
      {image && (
        <img
          src={image}
          alt={venue.name}
          className="w-full h-48 object-cover rounded mb-2"
        />
      )}
      <h2 className="text-lg font-semibold mb-1">{venue.name}</h2>
      <p className="text-sm text-gray-600 mb-2">
        {venue.description?.substring(0, 100)}...
      </p>
      <Link
        to={`/venue/${venue.id}`}
        className="text-blue-600 underline text-sm"
      >
        Vis detaljer
      </Link>
    </div>
  );
}