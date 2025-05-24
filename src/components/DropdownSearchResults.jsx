import { Link } from "react-router-dom";

export default function DropdownSearchResults({ venues, onClose }) {
  if (!venues || venues.length === 0) return null;

  const venuesWithImages = venues.filter((venue) => venue.media?.length > 0);

  return (
    <div className="max-h-[300px] overflow-y-auto mt-4 space-y-2">
      {venuesWithImages.map((venue) => (
        <Link
          key={venue.id}
          to={`/venues/${venue.id}`}
          onClick={onClose}
          className="flex items-center gap-4 py-3 px-2 border-b border-white/10 hover:bg-white/5 transition"
        >
          <img
            src={venue.media[0]}
            alt={venue.name}
            className="w-16 h-16 object-cover rounded-sm border border-white/10"
          />
          <span className="text-sm font-medium">{venue.name}</span>
        </Link>
      ))}
    </div>
  );
}