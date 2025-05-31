import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@utils/auth/AuthContext";
import useBookingSubmit from "@hooks/useBookingSubmit";
import useVenueAndBookingsResult from "@hooks/useVenueAndBookingsResult";

import VenueHeader from "@components/venue/VenueHeader";
import VenueInfoBox from "@components/venue/VenueInfoBox";
import BookingWrapper from "@components/common/booking/BookingWrapper";
import BookingFormContainer from "@components/common/booking/BookingFormContainer";
import FallbackLoader from "@components/common/ui/feedback/FallbackLoader";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [guests, setGuests] = useState(1);
  const [overlapWarning, setOverlapWarning] = useState(false);

  // 👇 Vent med hook til token finnes
  if (!token) return <FallbackLoader />;
  const { venue, bookings } = useVenueAndBookingsResult(id, navigate, token);

  const {
    handleSubmit,
    error,
    success,
    loading,
    setError,
  } = useBookingSubmit({
    token,
    venue,
    id,
    dateRange,
    guests,
    overlapWarning,
    navigate,
  });

  useEffect(() => {
    console.log("📌 BookingPage mounted");
    console.log("🆔 id:", id);
    console.log("🔐 token:", token);
    console.log("👤 user:", user);
    console.log("🏠 venue:", venue);
    console.log("📅 bookings:", bookings);
  }, [id, token, user, venue, bookings]);

  if (!venue) return <FallbackLoader />;

  return (
    <BookingWrapper>
      <VenueHeader name={venue.name} location={venue.location} />
      <VenueInfoBox venue={venue} />
      <BookingFormContainer
        venue={venue}
        bookings={bookings}
        dateRange={dateRange}
        setDateRange={setDateRange}
        guests={guests}
        setGuests={setGuests}
        overlapWarning={overlapWarning}
        setOverlapWarning={setOverlapWarning}
        user={user}
        error={error}
        setError={setError}
        loading={loading}
        success={success}
        handleSubmit={handleSubmit}
      />
    </BookingWrapper>
  );
}