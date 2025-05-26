import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CalenderRange from "@components/common/booking/CalenderRange";
import PrimaryButton from "@components/common/ui/buttons/PrimaryButton";

export default function BookingPage() {
  const { id } = useParams(); 
  const [venue, setVenue] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null, guests: 1 });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVenue() {
      try {
        const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
        const data = await res.json();
        setVenue(data);
      } catch (err) {
        console.error("Feil ved henting av venue:", err);
      }
    }

    window.scrollTo(0, 0);
    fetchVenue();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const { start, end, guests } = dateRange;

    if (!start || !end) return setError("Datoene må fylles ut.");
    if (start >= end) return setError("Utsjekksdato må være etter innsjekksdato.");
    if (guests < 1 || guests > (venue?.maxGuests || 10)) {
      return setError(`Antall gjester må være mellom 1 og ${venue?.maxGuests || 10}.`);
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
      venueId: id,
      guests,
    };

    try {
      const res = await fetch("https://api.noroff.dev/api/v1/holidaze/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Booking feilet.");
      }

      setSuccess(true);
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!venue) {
    return <div className="text-center mt-[120px] text-gray-600">Laster sted ...</div>;
  }

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-black pt-[120px] pb-20 px-4">
      <div className="max-w-2xl mx-auto bg-[#f4f1ea] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">{venue.name}</h1>

        {success ? (
          <p className="text-green-700 text-center font-medium">Booking fullført! Du sendes videre ...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <CalenderRange
  dateRange={dateRange}
  onDateChange={setDateRange}
  maxGuests={venue.maxGuests}
  venueId={venue.id}
/>

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <PrimaryButton
              type="submit"
              text={loading ? "Sender ..." : "Bekreft booking"}
              full
              disabled={loading}
            />
          </form>
        )}
      </div>
    </div>
  );
}