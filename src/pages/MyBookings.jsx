import { useEffect, useState } from "react";
import BookingCard from "@components/common/booking/BookingCard";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("accessToken");
      const userName = localStorage.getItem("userName");
      if (!token || !userName) return;

      try {
       const res = await fetch(
  `https://api.noroff.dev/api/v1/holidaze/profiles/${userName}/bookings?_venue=true`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        if (!res.ok) throw new Error("Kunne ikke hente bookinger");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-black pt-[120px] pb-20 px-4">
      <div className="max-w-3xl mx-auto bg-[#f4f1ea] p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 border-b border-black pb-2">Mine bookinger</h1>

        {loading && <p className="text-center text-gray-600">Laster bookinger...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && bookings.length === 0 && (
          <p className="text-center text-gray-500">Ingen bookinger funnet.</p>
        )}

        <ul className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </ul>
      </div>
    </div>
  );
}