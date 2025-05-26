
export default function GuestSelector({ guests, setGuests, maxGuests = 10 }) {
  function handleChange(e) {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= maxGuests) {
      setGuests(value);
    }
  }

  return (
    <div className="flex flex-col items-start w-full">
      <label className="block mb-1 font-medium text-gray-800">Antall gjester</label>
      <input
        type="number"
        value={guests}
        onChange={handleChange}
        min="1"
        max={maxGuests}
        className="w-full border border-[#d2c6b2] bg-white text-black px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
      />
      <p className="text-sm text-gray-500 mt-1">Maks {maxGuests} gjester</p>
    </div>
  );
}