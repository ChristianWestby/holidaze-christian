import { useState } from "react";

export default function BookingModal({ venue, onClose }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1);

  if (!venue) return null;

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Booking info:", { venueId: venue.id, dateFrom, dateTo, guests });
    onClose(); // her kunne vi evt. sendt videre til faktisk booking
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Lukk"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">{venue.name}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Fra dato</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Til dato</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Antall gjester</label>
            <input
              type="number"
              min="1"
              max={venue.maxGuests || 10}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Bekreft booking (demo)
          </button>
        </form>
      </div>
    </div>
  );
}