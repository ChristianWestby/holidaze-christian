import { useState } from "react";

export default function BookingModal({ venue, onClose }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Validering
    if (!dateFrom || !dateTo) return setError("Datoene må fylles ut.");
    if (new Date(dateFrom) >= new Date(dateTo)) return setError("Utsjekksdato må være etter innsjekksdato.");
    if (guests < 1 || guests > (venue.maxGuests || 10)) {
      return setError(`Antall gjester må være mellom 1 og ${venue.maxGuests || 10}.`);
    }

    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return setError("Du må være logget inn for å booke.");
    }

    const bookingData = {
      dateFrom,
      dateTo,
      venueId: venue.id,
      guests: Number(guests),
    };

    try {
      const response = await fetch("https://api.noroff.dev/api/v1/holidaze/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Booking feilet.");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!venue) return null;

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

        {success ? (
          <p className="text-green-600 text-center font-medium">Takk for booking!</p>
        ) : (
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

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sender..." : "Bekreft booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}