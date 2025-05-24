import { Link } from "react-router-dom";

export default function VenueGridCard({ venue }) {
  const image =
    venue.media && venue.media.length > 0 && typeof venue.media[0] === "string"
      ? venue.media[0]
      : "/fallback.jpg";

  return (
    <div className="bg-[#f4f1ea] rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={image}
        alt={venue.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-1">{venue.name}</h2>
        <p className="text-sm text-gray-600">
          {venue.location?.city}, {venue.location?.country}
        </p>
        <p className="text-sm text-black mt-2 font-medium">
          {venue.price} NOK / natt
        </p>
        <Link
          to={`/venues/${venue.id}`}
          className="inline-block mt-3 text-sm underline hover:text-black"
        >
          Utforsk →
        </Link>
      </div>
    </div>
  );
}
