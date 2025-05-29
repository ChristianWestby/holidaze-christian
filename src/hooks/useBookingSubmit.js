import { useState } from "react";

export default function useBookingSubmit({ token, venue, id, dateRange, guests, overlapWarning, navigate }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { start, end } = dateRange;

    if (overlapWarning) return setError("Valgte datoer overlapper med eksisterende booking.");
    if (!start || !end) return setError("Datoene må fylles ut.");
    if (start >= end) return setError("Utsjekksdato må være etter innsjekksdato.");
    if (guests < 1 || guests > (venue?.maxGuests || 10)) {
      return setError(`Antall gjester må være mellom 1 og ${venue?.maxGuests || 10}.`);
    }

    if (!token) return setError("Du må være logget inn for å booke.");

    const bookingData = {
      dateFrom: new Date(start).toISOString(),
      dateTo: new Date(end).toISOString(),
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

  return { handleSubmit, error, success, loading, setError };
}