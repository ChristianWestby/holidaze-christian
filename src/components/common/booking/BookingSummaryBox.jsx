import PropTypes from "prop-types";
import { calcDays, calcTotal } from "@utils/booking/dateCalculations";

export default function BookingSummaryBox({ guests, dateRange, venue }) {
  if (
    !dateRange ||
    !(dateRange.start instanceof Date) ||
    !(dateRange.end instanceof Date) ||
    !venue ||
    typeof venue.price !== "number"
  ) {
    return null; // Unngå crash – venter på gyldige data
  }

  const { start, end } = dateRange;
  const days = calcDays(start, end);
  const total = calcTotal(start, end, guests, venue.price);

  return (
    <div className="bg-white p-4 border shadow text-sm text-black rounded">
      <p><strong>Sted:</strong> {venue.name}</p>
      <p><strong>Dager:</strong> {days || 0}</p>
      <p><strong>Gjester:</strong> {guests}</p>
      <p className="font-bold mt-2">Totalpris: {total || 0} NOK</p>
    </div>
  );
}

BookingSummaryBox.propTypes = {
  guests: PropTypes.number.isRequired,
  dateRange: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  venue: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};