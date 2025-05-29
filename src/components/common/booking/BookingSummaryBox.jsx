import PropTypes from "prop-types";
import { calcDays, calcTotal } from "@utils/booking/dateCalculations";

export default function BookingSummaryBox({ guests, dateRange, pricePerNight }) {
  const { start, end } = dateRange;

  return (
    <div className="bg-white p-4 border shadow text-sm">
      <p><strong>Dager:</strong> {calcDays(start, end)}</p>
      <p><strong>Gjester:</strong> {guests}</p>
      <p className="font-bold mt-2">Totalpris: {calcTotal(start, end, guests, pricePerNight)} NOK</p>
    </div>
  );
}

BookingSummaryBox.propTypes = {
  guests: PropTypes.number.isRequired,
  dateRange: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  pricePerNight: PropTypes.number.isRequired,
};