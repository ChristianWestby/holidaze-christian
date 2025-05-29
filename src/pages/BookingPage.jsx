import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@utils/auth/AuthContext";
import useBookingSubmit from "@hooks/useBookingSubmit";
import useVenueAndBookingsResult from "@hooks/useVenueAndBookingsResult";

import VenueHeader from "@components/common/venue/VenueHeader";
import VenueInfoBox from "@components/common/venue/VenueInfoBox";
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

  const { venue, bookings } = useVenueAndBookingsResult(id, navigate);

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