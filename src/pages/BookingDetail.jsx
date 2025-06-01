import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@utils/auth/AuthContext";
import { backgroundImages } from "@assets/image/images";
import VenueImage from "@components/venue/VenueImage";
import LogoHolidaze from "@components/common/ui/LogoHolidaze";
import { calcDays, calcTotal } from "@utils/booking/dateCalculations";

export default function BookingDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/bookings/${id}?_venue=true&_customer=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Klarte ikke å hente booking");
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchBooking();
  }, [id, token]);

  if (error) return <p className="text-red-500 mt-20 text-center">{error}</p>;
  if (!booking) return <p className="text-white mt-20 text-center">Laster booking...</p>;

  const { dateFrom, dateTo, guests, venue, customer } = booking;
  const days = calcDays(new Date(dateFrom), new Date(dateTo));
  const total = calcTotal(new Date(dateFrom), new Date(dateTo), guests, venue.price);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 pb-10 pt-28"
      style={{ backgroundImage: `url("${backgroundImages.profile}")` }}
    >
      <div className="max-w-5xl mx-auto bg-[#1c293a]/90 shadow-lg p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <LogoHolidaze />
          <Link
            to="/profile"
            className="text-sm bg-white text-black px-4 py-2 rounded hover:bg-gray-600"
          >
            Tilbake til profil
          </Link>
        </div>

        <h1 className="text-3xl font-thin mb-4">Bookingdetaljer</h1>
        <div className="border-t border-white/20 mb-6"></div>

        <p className="mb-6 text-white/70">
          Bestilt av: <span className="font-semibold">{customer?.name}</span> ({customer?.email})
        </p>

        <div className="border-t border-white/20 mb-6"></div>

        <VenueImage media={venue.media} name={venue.name} />

        <div className="border-t border-white/20 mb-6"></div>

        <div className="mt-6 bg-white/10 p-4 text-white rounded">
          <p>
            <span className="font-semibold">Fra:</span>{" "}
            {new Date(dateFrom).toLocaleDateString("no-NO")}
          </p>
          <p>
            <span className="font-semibold">Til:</span>{" "}
            {new Date(dateTo).toLocaleDateString("no-NO")}
          </p>
          <p>
            <span className="font-semibold">Dager:</span> {days || 0}
          </p>
          <p>
            <span className="font-semibold">Antall gjester:</span> {guests}
          </p>
          <p className="font-bold mt-2">Totalpris: {total || 0} NOK</p>
        </div>

        <Link
          to={`/venues/${venue.id}`}
          className="text-sm bg-white text-black px-4 py-2 rounded hover:bg-gray-600"
        >
          Se stedets side
        </Link>
      </div>
    </div>
  );
}