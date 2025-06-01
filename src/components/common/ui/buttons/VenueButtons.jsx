import { Link } from "react-router-dom";
export default function VenueButtons({ venueId, onBook }) {
  return (
    <div className="flex gap-4 mt-4">
     <Link
  to={`/venues/${venueId}`}
  className="inline-block bg-[#1c293a] text-white text-sm px-4 py-2 rounded hover:bg-[#2b3b50]"
>
  Vis detaljer
</Link>
      <button
        onClick={onBook}
        className="inline-block bg-[#1c293a] text-white text-sm px-4 py-2 rounded hover:bg-[#2b3b50]"
      >
        Book nå
      </button>
    </div>
  );
}