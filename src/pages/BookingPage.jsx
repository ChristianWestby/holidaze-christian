import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CalenderRange from "@components/common/booking/CalenderRange";
import PrimaryButton from "@components/common/ui/buttons/PrimaryButton";
import { useAuth } from "@utils/auth/AuthContext";
import GoBackButton from "@components/common/ui/buttons/GoBackButton";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [overlapWarning, setOverlapWarning] = useState(false); // ny

  useEffect(() => {
    if (!id) return navigate("/venues");

    async function fetchData() {
      try {
        const [venueRes, bookingsRes] = await Promise.all([
          fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`),
          fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}/bookings`), // viktig: spesifikt venue
        ]);
        const venueData = await venueRes.json();
        const venueBookings = await bookingsRes.json();

        if (!venueData.id) return navigate("/venues");

        setVenue(venueData);
        setBookings(Array.isArray(venueBookings) ? venueBookings : []);
      } catch (err) {
        console.error("Feil ved henting av data:", err);
        navigate("/venues");
      }
    }

    fetchData();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { start, end } = dateRange;

    if (overlapWarning) return setError("Valgte datoer overlapper med eksisterende booking.");
    if (!start || !end) return setError("Datoene må fylles ut.");
    if (start >= end) return setError("Utsjekksdato må være etter innsjekksdato.");
    if (guests < 1 || guests > (venue?.maxGuests || 10)) {
      return setError(`Antall gjester må være mellom 1 og ${venue?.maxGuests || 10}.`);
    }

    const { token } = useAuth();
    if (!token) return setError("Du må være logget inn for å booke.");

    const bookingData = {
      dateFrom: start.toISOString(),
      dateTo: end.toISOString(),
      venueId: id,
      guests,
    };

    try {
      setLoading(true);
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
  };

  const calcTotal = () => {
    const { start, end } = dateRange;
    if (!start || !end) return 0;
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return venue.price * days * guests;
  };

  const calcDays = () => {
    const { start, end } = dateRange;
    if (!start || !end) return 0;
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  if (!venue) return <p className="text-center mt-[120px] text-gray-600">Laster sted ...</p>;

  return (
    <div
      className="min-h-screen pt-[120px] flex flex-col lg:flex-row bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2022/10/07/12/48/sea-7504986_1280.jpg')",
      }}
    >
      <div className="lg:w-1/2 p-8 text-white bg-black/40 backdrop-blur-sm">
        <h1 className="text-3xl font-light tracking-wide mb-2 text-center">{venue.name}</h1>
        <div className="h-[2px] w-20 bg-white/60 mx-auto mb-4" />
        <p className="text-center text-sm text-white/80 mb-6">
          {venue.location?.city}, {venue.location?.country}
        </p>
        <img
          src={venue.media?.[0] || "/fallback.jpg"}
          alt={venue.name}
          className="w-full h-64 object-cover rounded mb-6 shadow"
        />
        <div className="space-y-2 text-sm">
          <p><strong>Pris:</strong> {venue.price} NOK / natt</p>
          <p><strong>Maks gjester:</strong> {venue.maxGuests}</p>
          <p><strong>Rating:</strong> {venue.rating}</p>
          <p><strong>Wifi:</strong> {venue.meta?.wifi ? "Ja" : "Nei"}</p>
          <p><strong>Parkering:</strong> {venue.meta?.parking ? "Ja" : "Nei"}</p>
          <p><strong>Frokost:</strong> {venue.meta?.breakfast ? "Ja" : "Nei"}</p>
          <p><strong>Kjæledyr:</strong> {venue.meta?.pets ? "Ja" : "Nei"}</p>
        </div>
      </div>

      <div className="lg:w-1/2 p-8 bg-white/90 text-black">
        <h2 className="text-xl font-semibold mb-4 text-center">Fullfør din booking</h2>

        <div className="bg-orange-400 bg-opacity-90 border border-black text-black mb-2 text-sm p-4 rounded">
          <p><strong>Navn:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-100 mt-4 space-y-6">
          <div className="flex items-center justify-between bg-gray mt-2 p-3 border shadow">
            <CalenderRange
              dateRange={dateRange}
              onDateChange={setDateRange}
              bookings={bookings}
              setOverlapWarning={setOverlapWarning}
            />
          </div>

          {overlapWarning && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded text-sm text-center">
              Valgte datoer overlapper med en eksisterende booking. Prøv en annen periode.
            </div>
          )}

          <div className="flex items-center justify-between bg-white p-3 border shadow">
            <label className="font-semibold">Antall gjester</label>
            <div className="wrap flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1 bg-black text-white rounded"
                onClick={() => setGuests(Math.max(1, guests - 1))}
              >
                −
              </button>
              <span className="w-6 text-center">{guests}</span>
              <button
                type="button"
                className="px-3 py-1 bg-black text-white rounded"
                onClick={() => setGuests(Math.min(venue.maxGuests, guests + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className="bg-white p-4 border shadow text-sm">
            <p><strong>Dager:</strong> {calcDays()}</p>
            <p><strong>Gjester:</strong> {guests}</p>
            <p className="font-bold mt-2">Totalpris: {calcTotal()} NOK</p>
          </div>

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <div className="flex justify-between gap-4">
            <GoBackButton />
            <PrimaryButton
              type="submit"
              text={loading ? "Sender ..." : "Bekreft booking"}
              full={false}
              disabled={loading || overlapWarning}
            />
          </div>

          {success && (
            <p className="text-green-700 text-center font-medium">
              Booking fullført! Du sendes videre ...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}