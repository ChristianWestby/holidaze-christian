import { useState } from "react";
import CalenderRange from "@components/common/booking/CalenderRange";
import PrimaryButton from "@components/common/ui/buttons/PrimaryButton";

export default function BookingModal({ venue, bookings = [], onClose }) {
  const [dateRange, setDateRange] = useState({ start: null, end: null, guests: 1 });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const { start, end, guests } = dateRange;

    if (!start || !end) return setError("Datoene må fylles ut.");
    if (start >= end) return setError("Utsjekksdato må være etter innsjekksdato.");
    if (guests < 1 || guests > (venue.maxGuests || 10)) {
      return setError(`Antall gjester må være mellom 1 og ${venue.maxGuests || 10}.`);
    }

    setError("");
    setLoading(true);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return setError("Du må være logget inn for å booke.");
    }

    const bookingData = {
      dateFrom: start.toISOString(),
      dateTo: end.toISOString(),
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
      <div className="bg-[#f4f1ea] text-black rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-700 hover:text-black text-2xl"
          aria-label="Lukk"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">{venue.name}</h2>

        {success ? (
          <p className="text-green-700 text-center font-medium">Takk for booking! Du blir videresendt...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <CalenderRange
              dateRange={dateRange}
              onDateChange={setDateRange}
              maxGuests={venue.maxGuests}
              bookings={bookings} 
            />

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <PrimaryButton
              text={loading ? "Sender..." : "Bekreft booking"}
              type="submit"
              full
              disabled={loading}
            />
          </form>
        )}
      </div>
    </div>
  );
}