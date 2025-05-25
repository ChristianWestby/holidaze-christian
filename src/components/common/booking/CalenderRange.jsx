import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CalenderRange({ dateRange, onDateChange, maxGuests = 10, bookings = [] }) {
  const disabledRanges = bookings.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
  }));

  return (
    <div className="bg-white text-black rounded p-4 shadow space-y-4">
      <div>
        <label className="block font-medium mb-1">Velg dato</label>
        <DatePicker
          selectsRange
          startDate={dateRange.start}
          endDate={dateRange.end}
          onChange={([start, end]) => onDateChange({ ...dateRange, start, end })}
          excludeDateIntervals={disabledRanges}
          inline
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Antall gjester</label>
        <input
          type="number"
          min="1"
          max={maxGuests}
          value={dateRange.guests}
          onChange={(e) =>
            onDateChange({ ...dateRange, guests: Number(e.target.value) })
          }
          className="w-full border border-[#d2c6b2] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>
  );
}