import { useState } from "react";
import { format } from "date-fns";

export default function CalenderRange({ dateRange, onDateChange, maxGuests }) {
  const [startDate, setStartDate] = useState(dateRange.start);
  const [endDate, setEndDate] = useState(dateRange.end);
  const [guests, setGuests] = useState(dateRange.guests);

  function handleDateChange(type, value) {
    const newDate = new Date(value);
    if (type === "start") setStartDate(newDate);
    if (type === "end") setEndDate(newDate);
    onDateChange({
      start: type === "start" ? newDate : startDate,
      end: type === "end" ? newDate : endDate,
      guests,
    });
  }

  function handleGuestChange(e) {
    const value = parseInt(e.target.value);
    setGuests(value);
    onDateChange({ start: startDate, end: endDate, guests: value });
  }

  return (
    <div className="space-y-6 text-sm text-gray-700">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 uppercase tracking-wide text-gray-500">Fra dato</label>
          <input
            type="date"
            value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
            onChange={(e) => handleDateChange("start", e.target.value)}
            className="w-full bg-white/80 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/30 transition"
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 uppercase tracking-wide text-gray-500">Til dato</label>
          <input
            type="date"
            value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
            onChange={(e) => handleDateChange("end", e.target.value)}
            className="w-full bg-white/80 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/30 transition"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 uppercase tracking-wide text-gray-500">Antall gjester</label>
        <input
          type="number"
          min="1"
          max={maxGuests || 10}
          value={guests}
          onChange={handleGuestChange}
          className="w-full bg-white/80 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/30 transition"
        />
      </div>
    </div>
  );
}