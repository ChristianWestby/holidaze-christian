import { Link } from "react-router-dom";
import { backgroundImages } from "@assets/image/images";


export default function BookingCard({ booking }) {
  const venue = booking.venue;
  const fallbackImage = backgroundImages.fallback;

  const isValidUrl = (url) =>
    typeof url === "string" && (url.startsWith("http") || url.startsWith("data:image"));

  const image =
    Array.isArray(venue?.media) && isValidUrl(venue.media[0])
      ? venue.media[0]
      : fallbackImage;

  return (
    <div className="bg-white rounded shadow hover:shadow-md transition overflow-hidden text-black">
      <img
        src={image}
        alt={venue?.name || "Bilde mangler"}
        className="w-full h-47 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{venue?.name || "Ukjent sted"}</h3>

        {venue?.location ? (
          <p className="text-sm text-gray-600 mb-1">
            {venue.location.city}, {venue.location.country}
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic mb-1">
            Stedsinformasjon mangler
          </p>
        )}

        {/* Samme som prislinje i VenueCard */}
        <p className="text-sm text-gray-600 mb-1">
          {new Date(booking.dateFrom).toLocaleDateString("no-NO")} –{" "}
          {new Date(booking.dateTo).toLocaleDateString("no-NO")}
        </p>

        <p className="text-sm text-gray-600 mb-3">Gjester: {booking.guests}</p>

        <div className="flex gap-2">
          <Link
            to={`/booking-detail/${booking.id}`}
            className="text-sm bg-[#1c293a] text-white px-4 py-2 rounded hover:bg-[#32445d]"
          >
            Se detaljer
          </Link>
        </div>
      </div>
    </div>
  );
}