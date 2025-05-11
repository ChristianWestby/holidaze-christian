export default function BookingModal({ venue, onClose }) {
  if (!venue) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Lukk"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{venue.name}</h2>
        <p className="text-gray-700 mb-6">{venue.description || "Ingen beskrivelse tilgjengelig."}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Bekreft booking (demo)
        </button>
      </div>
    </div>
  );
}