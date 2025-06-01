import { Link } from "react-router-dom";
import { backgroundImages } from "@assets/image/images";

export default function VenueCard({ venue, editable = false }) {
  const fallbackImage = "/fallback.jpg"; // Sørg for at denne finnes i /public

  const isValidUrl = (url) =>
    typeof url === "string" && (url.startsWith("http") || url.startsWith("data:image"));

  const image =
    Array.isArray(venue.media) && isValidUrl(venue.media[0])
      ? venue.media[0]
      : fallbackImage;

  return (
    <div className="bg-white rounded shadow hover:shadow-md transition overflow-hidden">
      <img
        src={image}
        alt={venue.name || "Bilde mangler"}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-black">
        <h3 className="font-semibold text-lg mb-1">{venue.name}</h3>
        {venue.location ? (
          <p className="text-sm text-gray-600 mb-1">
            {venue.location.city}, {venue.location.country}
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic mb-1">
            Stedsinformasjon mangler
          </p>
        )}
        <p className="text-sm text-gray-600 mb-3">
          Pris: {venue.price} NOK / natt
        </p>

        <div className="flex flex-wrap gap-2">
          <Link
            to={`/venues/${venue.id}`}
            className="text-sm bg-[#1c293a] text-white px-4 py-2 rounded hover:bg-[#32445d]"
          >
            Vis detaljer
          </Link>

          {editable && (
            <Link
              to={`/venues/edit/${venue.id}`}
              className="text-sm bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              Rediger
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}