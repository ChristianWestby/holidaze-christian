import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@utils/auth/AuthContext";
import useBookingSubmit from "@hooks/useBookingSubmit";
import useVenueAndBookingsResult from "@hooks/useVenueAndBookingsResult";

import VenueHeader from "@components/venue/VenueHeader";
import VenueInfoBox from "@components/venue/VenueInfoBox";
import BookingWrapper from "@components/common/booking/BookingWrapper";
import BookingFormContainer from "@components/common/booking/BookingFormContainer";
import FallbackLoader from "@components/common/ui/feedback/FallbackLoader";
import BookingSummaryBox from "@components/common/booking/BookingSummaryBox";
import BookingSuccessMessage from "@components/common/booking/BookingSuccessMessage";
import ConfirmBooking from "@components/common/booking/ConfirmBooking";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [guests, setGuests] = useState(1);
  const [overlapWarning, setOverlapWarning] = useState(false);

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

  if (!token || !venue) return <FallbackLoader />;

  return (
    <BookingWrapper>
      <div className="w-full max-w-4xl mx-auto bg-[#1c293a] text-white rounded-xl shadow-lg p-6 sm:p-10 space-y-10 mt-10">
        <VenueHeader name={venue.name} location={venue.location} />

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Bookingform: kalender, gjester og validering */}
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
          />

          {/* Utregnet oppsummering */}
          <BookingSummaryBox
            venue={venue}
            dateRange={dateRange}
            guests={guests}
          />

          {/* Bekreftelsen: navn + e-post */}
          <ConfirmBooking
           dateRange={dateRange}
           guests={guests}
           loading={loading}
           price={venue.price}
           total={venue.price * (dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24) * guests}
           token={token}
            onConfirm={handleSubmit}
           />

          {/* Submit */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-white/90 transition"
            >
              Bekreft booking
            </button>
          </div>
        </form>

        {/* Ekstra visning etter innsending */}
        {success && (
          <div className="mt-6">
            <BookingSuccessMessage success={success} />
          </div>
        )}

        {/* Info-boks til slutt */}
        <VenueInfoBox venue={venue} />
      </div>
    </BookingWrapper>
  );
}