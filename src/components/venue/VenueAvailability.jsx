import { useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, startOfDay, addDays, isBefore, isValid } from "date-fns";
import "@css/calendar-overrides.css";

export default function VenueAvailability({ bookings }) {
  const bookedDates = useMemo(() => {
    const dates = [];

    bookings?.forEach(({ dateFrom, dateTo }) => {
      const start = startOfDay(parseISO(dateFrom));
      const end = addDays(startOfDay(parseISO(dateTo)), -1); // ekskluder checkout-dagen

      if (!isValid(start) || !isValid(end)) return;

      let current = new Date(start);
      while (!isBefore(end, current)) {
        dates.push(new Date(current));
        current = addDays(current, 1);
      }
    });

    return dates;
  }, [bookings]);

  // 👉 Logget etter beregning (unngår feil i build)
  console.log("📅 Booked dates:", bookedDates);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h3 className="text-lg font-semibold mb-4 text-center">Opptatte datoer</h3>
      <div className="flex justify-center">
        <DatePicker
          inline
          highlightDates={[
            {
              dates: bookedDates,
              className: "react-datepicker__day--highlighted-booked",
            },
          ]}
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
    </div>
  );
}