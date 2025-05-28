import { useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function VenueAvailability({ bookings }) {
  const bookedDates = useMemo(() => {
    const dates = [];

    if (!Array.isArray(bookings)) return dates;

    bookings.forEach(({ dateFrom, dateTo }) => {
      const start = new Date(dateFrom);
      const end = new Date(dateTo);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
    });

    return dates;
  }, [bookings]);

  return (
    <div className="bg-white text-black p-6 rounded-xl shadow-md max-w-lg mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4 text-center">Opptatte datoer</h3>
      <DatePicker
        inline
        highlightDates={[{ dates: bookedDates, className: "bg-red-300 rounded-full" }]}
        calendarClassName="!bg-gray-100 text-black rounded-lg"
        dayClassName={(date) =>
          bookedDates.some((d) => d.toDateString() === date.toDateString())
            ? "bg-red-300 text-white"
            : undefined
        }
        disabledKeyboardNavigation
        readOnly
      />
    </div>
  );
}