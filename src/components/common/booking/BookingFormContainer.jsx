import PropTypes from "prop-types";
import CalenderRange from "./CalenderRange";
import GuestSelector from "./GuestSelector";
import BookingSummaryBox from "./BookingSummaryBox";
import BookingSuccessMessage from "./BookingSuccessMessage";
import BookingOverlapWarning from "./BookingOverlapWarning";
import PrimaryButton from "@components/common/ui/buttons/PrimaryButton";
import GoBackButton from "@components/common/ui/buttons/GoBackButton";
import ErrorMessage from "@components/common/ui/feedback/ErrorMessage";
import UserInfoBox from "@components/common/ui/UserInfoBox";
import BookingDatePickerField from "@components/common/booking/BookingDatePickerField";

export default function BookingFormContainer({
  venue,
  bookings,
  dateRange,
  setDateRange,
  guests,
  setGuests,
  overlapWarning,
  setOverlapWarning,
  user,
  error,
  setError,
  loading,
  success,
  handleSubmit,
}) {
  return (
    <div className="lg:w-1/2 p-8 bg-white/90 text-black">
      <h2 className="text-xl font-semibold mb-4 text-center">Fullfør din booking</h2>

      <UserInfoBox name={user?.name} email={user?.email} />

     <form onSubmit={handleSubmit} className="bg-gray-100 mt-4 space-y-6">
     <BookingDatePickerField
     dateRange={dateRange}
     setDateRange={setDateRange}
     bookings={bookings}
     setOverlapWarning={setOverlapWarning}
     setError={setError}
  />

        <BookingOverlapWarning show={overlapWarning} />

        <GuestSelector
          guests={guests}
          maxGuests={venue.maxGuests}
          onChange={setGuests}
        />

        <BookingSummaryBox
          guests={guests}
          dateRange={dateRange}
          pricePerNight={venue.price}
        />

        <ErrorMessage message={error} />

        <div className="flex justify-between gap-4">
          <GoBackButton />
          <PrimaryButton
            type="submit"
            text={loading ? "Sender ..." : "Bekreft booking"}
            full={false}
            disabled={loading || overlapWarning}
          />
        </div>

        {success && <BookingSuccessMessage />}
      </form>
    </div>
  );
}

BookingFormContainer.propTypes = {
  venue: PropTypes.object.isRequired,
  bookings: PropTypes.array.isRequired,
  dateRange: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  setDateRange: PropTypes.func.isRequired,
  guests: PropTypes.number.isRequired,
  setGuests: PropTypes.func.isRequired,
  overlapWarning: PropTypes.bool.isRequired,
  setOverlapWarning: PropTypes.func.isRequired,
  user: PropTypes.object,
  error: PropTypes.string,
  setError: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};