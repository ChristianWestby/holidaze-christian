import { useState } from "react";
import { Link } from "react-router-dom";
import BookingModal from "./BookingModal";

export default function VenueCard({ venue }) {
  const [isOpen, setIsOpen] = useState(false);
  const image = venue.media?.[0];

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow duration-300">
        {image && (
          <div className="overflow-hidden rounded mb-2">
            <img
              src={image}
              alt={venue.name}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <h2 className="text-lg font-semibold mb-1">{venue.name}</h2>
        <p className="text-sm text-gray-600 mb-2">
          {venue.description?.substring(0, 100)}...
        </p>
        <div className="flex gap-4">
          <Link to={`/venue/${venue.id}`} className="text-blue-600 underline text-sm">
            Vis detaljer
          </Link>
          <button
            onClick={handleOpen}
            className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Book nå
          </button>
        </div>
      </div>

      {isOpen && (
        <BookingModal venue={venue} onClose={handleClose} />
      )}
    </>
  );
}