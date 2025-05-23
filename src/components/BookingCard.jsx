
export default function BookingCard({ booking }) {
  const venue = booking.venue;
  return (
    <li className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
      {venue ? (
        <>
          <h3 className="font-medium text-lg">{venue.name}</h3>
          <p className="text-sm text-gray-600">
            {new Date(booking.dateFrom).toLocaleDateString()} – {" "}
            {new Date(booking.dateTo).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">Gjester: {booking.guests}</p>
        </>
      ) : (
        <>
          <h3 className="font-medium text-lg text-red-600">Venue ikke tilgjengelig</h3>
          <p className="text-sm text-gray-500">Booking-ID: {booking.id}</p>
          <p className="text-sm text-gray-500">
            {new Date(booking.dateFrom).toLocaleDateString()} – {" "}
            {new Date(booking.dateTo).toLocaleDateString()}
          </p>
        </>
      )}
    </li>
  );
}