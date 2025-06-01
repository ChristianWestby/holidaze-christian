import { useState, useEffect } from "react";

export default function useVenueAndBookingsResult(id, navigate, token) {
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      if (!id || !token) return;

      setLoading(true);
      try {
        const venueRes = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!venueRes.ok) throw new Error("Kunne ikke hente venue");
        const venueData = await venueRes.json();

        const bookingsRes = await fetch(
          "https://api.noroff.dev/api/v1/holidaze/bookings?limit=100&_venue=true",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!bookingsRes.ok) throw new Error("Kunne ikke hente bookings");
        const bookingsData = await bookingsRes.json();

        const venueBookings = bookingsData.filter((b) => b.venue?.id === id);

        if (isMounted) {
          setVenue(venueData);
          setBookings(venueBookings);
        }
      } catch {
        if (navigate && isMounted) navigate("/404");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id, token, navigate]);

  return { venue, bookings, loading };
}