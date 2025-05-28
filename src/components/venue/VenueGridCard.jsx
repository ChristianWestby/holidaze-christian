import { Link } from "react-router-dom";

export default function VenueGridCard({ venue }) {
  const image =
    venue.media && venue.media.length > 0 && typeof venue.media[0] === "string"
      ? venue.media[0]
      : "/fallback.jpg";

  const rating = venue.rating || Math.floor(Math.random() * 2 + 4);

  return (
    <div className="bg-white shadow-md hover:shadow-4xl transition-transform transform hover:-translate-y-4 hover:scale-[1.10] duration-300 overflow-hidden flex flex-col">
      <img
        src={image}
        alt={venue.name}
        className="w-full h-48 object-cover"
      />
      <div className="bg-[#1c1c1c] text-white p-6 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-lg font-semibold mb-1 line-clamp-1">{venue.name}</h2>
          <p className="text-sm text-white/70 mb-1 line-clamp-1">
            {venue.location?.city}, {venue.location?.country}
          </p>
          <p className="text-sm font-medium mb-2">{venue.price} NOK / natt</p>
          <div className="text-yellow-400 text-sm mb-1">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</div>
        </div>
        <Link
          to={`/venues/${venue.id}`}
          className="mt-4 inline-block text-sm font-medium underline hover:text-white/120 transition"
        >
          Utforsk →
        </Link>
      </div>
    </div>
  );
}
