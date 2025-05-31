import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, subDays } from "date-fns";
import { nb } from "date-fns/locale"; // ✅ Viktig!

export default function CalenderRange({
  dateRange,
  onDateChange,
  bookings = [],
  setOverlapWarning,
}) {
  const disabledRanges = Array.isArray(bookings)
    ? bookings.map((booking) => ({
        start: new Date(booking.dateFrom),
        end: subDays(new Date(booking.dateTo), 1),
      }))
    : [];

  useEffect(() => {
    const { start, end } = dateRange;
    if (!start || !end) return setOverlapWarning(false);

    const hasOverlap = disabledRanges.some(({ start: bStart, end: bEnd }) => {
      return start <= bEnd && end >= bStart;
    });

    setOverlapWarning(hasOverlap);
  }, [dateRange, disabledRanges, setOverlapWarning]);

  const isDisabled = (date) =>
    disabledRanges.some(({ start, end }) => date >= start && date <= end);

  const dayClassName = (date) =>
    isDisabled(date) ? "unavailable-day" : undefined;

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
          locale={nb} // ✅ fungerer nå
          dateFormat="yyyy/MM/dd"
        />
      </div>

      {disabledRanges.length > 0 && (
        <div className="mt-6 bg-white border border-gray-400 p-4 rounded shadow-inner text-sm">
          <p className="font-medium mb-2">Allerede booket:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {disabledRanges.map((range, index) => (
              <li key={index}>
                {format(range.start, "d. MMM yyyy", { locale: nb })} –{" "}
                {format(range.end, "d. MMM yyyy", { locale: nb })}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}