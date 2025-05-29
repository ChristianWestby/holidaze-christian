// src/hooks/useVenueAndBookingsResult.js

import { useEffect, useState } from "react";

export default function useVenueAndBookingsResult(id, navigate) {
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const [venueRes, bookingsRes] = await Promise.all([
          fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`),
          fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}/bookings`),
        ]);

        const venueData = await venueRes.json();
        const venueBookings = await bookingsRes.json();

        if (!venueData.id) {
          setError("Fant ikke stedet.");
          return navigate("/venues");
        }

        setVenue(venueData);
        setBookings(Array.isArray(venueBookings) ? venueBookings : []);
      } catch (err) {
        console.error("Feil ved henting av data:", err);
        setError("Noe gikk galt med lasting av data.");
        navigate("/venues");
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    }

    fetchData();
  }, [id, navigate]);

  return { venue, bookings, loading, error };
}
