import PropTypes from "prop-types";
import CalenderRange from "./CalenderRange";

export default function BookingDatePickerField({
  dateRange,
  setDateRange,
  bookings,
  setOverlapWarning,
  setError,
}) {
  const handleDateChange = (newRange) => {
    setDateRange(newRange);
    setOverlapWarning(false);
    setError("");
  };

  return (
    <div className="flex items-center justify-between bg-gray mt-2 p-3 border shadow">
      <CalenderRange
        dateRange={dateRange}
        onDateChange={handleDateChange}
        bookings={bookings}
        setOverlapWarning={setOverlapWarning}
      />
    </div>
  );
}

BookingDatePickerField.propTypes = {
  dateRange: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  setDateRange: PropTypes.func.isRequired,
  bookings: PropTypes.array.isRequired,
  setOverlapWarning: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};