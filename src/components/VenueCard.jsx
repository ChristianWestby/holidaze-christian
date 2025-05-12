import { useState } from "react";
import { Link } from "react-router-dom";
import BookingModal from "./BookingModal";

export default function VenueCard({ venue }) {
  const [isOpen, setIsOpen] = useState(false);
  const image = venue.media?.[0] || "https://placehold.co/400x300";

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="bg-black text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <img
          src={image}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />

        <div className="p-5 flex flex-col justify-between gap-3 h-full">
          <div>
            <h2 className="text-xl font-semibold mb-1">{venue.name}</h2>
            <p className="text-sm text-gray-300">
              {venue.description?.substring(0, 100)}...
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <Link
              to={`/venue/${venue.id}`}
              className="px-4 py-2 text-sm rounded border border-white hover:bg-white hover:text-black transition"
            >
              Vis detaljer
            </Link>
            <button
              onClick={handleOpen}
              className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-gray-200 transition"
            >
              Book nå
            </button>
          </div>
        </div>
      </div>

      {isOpen && <BookingModal venue={venue} onClose={handleClose} />}
    </>
  );
}