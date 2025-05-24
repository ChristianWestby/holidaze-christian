import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CalendarPicker() {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className="bg-[#f4f1ea] text-black p-8 rounded-xl shadow-lg max-w-md mx-auto mt-[120px]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Velg dato for din opplevelse
      </h2>

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
        calendarClassName="!bg-white !text-black rounded-xl p-4 shadow"
        dayClassName={(date) =>
          "hover:bg-black hover:text-white transition duration-200 rounded-full px-2 py-1"
        }
        dayClassName={(date) =>
          startDate?.toDateString() === date.toDateString()
            ? "bg-black text-white rounded-full px-2 py-1"
            : "hover:bg-black hover:text-white transition duration-200 rounded-full px-2 py-1"
        }
        popperPlacement="bottom"
      />
    </div>
  );
}