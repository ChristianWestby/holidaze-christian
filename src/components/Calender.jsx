import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CalendarPicker() {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Velg dato</h2>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
        calendarClassName="!bg-gray-100 !text-black rounded-lg"
        dayClassName={() =>
          "hover:bg-gray-300 transition rounded-full p-1"
        }
        popperPlacement="bottom"
      />
    </div>
  );
}