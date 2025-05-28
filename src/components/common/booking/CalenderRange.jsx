import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CalenderRange({
  dateRange,
  onDateChange,
  bookings = [],
  setOverlapWarning,
}) {
  const disabledRanges = Array.isArray(bookings)
    ? bookings.map((booking) => ({
        start: new Date(booking.dateFrom),
        end: new Date(booking.dateTo),
      }))
    : [];

  // Overlapp-sjekk
  useEffect(() => {
    const { start, end } = dateRange;
    if (!start || !end) return setOverlapWarning(false);

    const hasOverlap = disabledRanges.some(({ start: bStart, end: bEnd }) => {
      return start <= bEnd && end >= bStart;
    });

    setOverlapWarning(hasOverlap);
  }, [dateRange, disabledRanges, setOverlapWarning]);

  // Disable datoer
  const isDisabled = (date) =>
    disabledRanges.some(({ start, end }) => date >= start && date <= end);

  // Stil for datoer
  const dayClassName = (date) =>
    isDisabled(date) ? "bg-red-500 text-white rounded-full" : undefined;

  return (
    <div className="bg-gray-300 mt-2 text-black p-6 shadow max-w-2xl mx-auto">
      <label className="block text-center font-semibold text-lg mb-4">
        Velg datoer
      </label>
      <div className="flex justify-center">
        <DatePicker
          selectsRange
          startDate={dateRange.start}
          endDate={dateRange.end}
          onChange={([start, end]) => onDateChange({ ...dateRange, start, end })}
          filterDate={(date) => !isDisabled(date)}
          dayClassName={dayClassName}
          inline
          monthsShown={2}
        />
      </div>

      {disabledRanges.length > 0 && (
        <div className="mt-6 bg-white border border-gray-400 p-4 rounded shadow-inner text-sm">
          <p className="font-medium mb-2">Allerede booket:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {disabledRanges.map((range, index) => (
              <li key={index}>
                {range.start.toLocaleDateString("no-NO")} –{" "}
                {range.end.toLocaleDateString("no-NO")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}