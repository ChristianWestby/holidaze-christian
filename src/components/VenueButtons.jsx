import { Link } from "react-router-dom";
export default function VenueButtons({ venueId, onBook }) {
  return (
    <div className="flex gap-4 mt-4">
     <Link
  to={`/venues/${venueId}`}
  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
>
  Vis detaljer
</Link>
      <button
        onClick={onBook}
        className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-gray-200 transition"
      >
        Book nå
      </button>
    </div>
  );
}