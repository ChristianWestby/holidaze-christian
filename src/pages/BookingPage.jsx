import { useEffect, useState } from "react";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");
  const name = localStorage.getItem("userName");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Kunne ikke hente bookinger");

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Feil ved henting av bookinger:", err);
      } finally {
        setLoading(false);
      }
    }

    if (token && name) fetchBookings();
  }, [token, name]);

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Laster bookinger...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 mt-[120px] font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center">Mine bookinger</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">Du har ingen bookinger ennå.</p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => {
            const venue = booking.venue;

            return (
              <li
                key={booking.id}
                className="bg-white border rounded-xl shadow p-6 hover:shadow-md transition"
              >
                {venue ? (
                  <>
                    <h2 className="text-xl font-semibold mb-2">{venue.name}</h2>
                    <p className="text-gray-600">
                      {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
                      {new Date(booking.dateTo).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Gjester: {booking.guests}</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold text-red-600">Venue ikke tilgjengelig</h2>
                    <p className="text-sm text-gray-500">Booking-ID: {booking.id}</p>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}