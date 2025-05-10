import { useState } from "react";

export default function BookingModal({ venue, onClose }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Forutsetter at token er lagret ved innlogging

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("https://api.noroff.dev/api/v1/holidaze/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dateFrom,
          dateTo,
          venueId: venue.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Noe gikk galt med bookingen.");
      }

      const data = await response.json();
      console.log("Booking vellykket:", data);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <div className="booking-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="booking-modal__content bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Book: {venue.name}</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Fra:
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>
          <label className="block mb-4">
            Til:
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Send booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}