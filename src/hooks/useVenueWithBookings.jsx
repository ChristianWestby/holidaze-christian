import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useVenueWithBookings(id) {
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      navigate("/venues");
      return;
    }

    async function fetchData() {
      try {
        const [venueRes, bookingsRes] = await Promise.all([
          fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`),
          fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}/bookings`),
        ]);

        const venueData = await venueRes.json();
        const venueBookings = await bookingsRes.json();

        if (!venueData.id) throw new Error("Ugyldig venue-id");

        setVenue(venueData);
        setBookings(Array.isArray(venueBookings) ? venueBookings : []);
      } catch (err) {
        setError("Kunne ikke hente data. Prøv igjen.");
        console.error("Feil ved henting:", err);
        navigate("/venues");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  return { venue, bookings, loading, error };
}