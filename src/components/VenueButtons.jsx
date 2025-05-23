export default function VenueButtons({ venueId, onBook }) {
  return (
    <div className="flex gap-4 mt-4">
      <Link
        to={`/venue/${venueId}`}
        className="px-4 py-2 text-sm rounded border border-white hover:bg-white hover:text-black transition"
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