export default function BookingCard({ booking }) {
  const venue = booking.venue;

  return (
    <li className="p-5 bg-[#f4f1ea] rounded-xl shadow hover:shadow-md transition text-black">
      {venue ? (
        <>
          <h3 className="text-lg font-semibold mb-1">{venue.name}</h3>
          <p className="text-sm text-gray-700">
            {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
            {new Date(booking.dateTo).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-700">Gjester: {booking.guests}</p>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-red-700 mb-1">Venue ikke tilgjengelig</h3>
          <p className="text-sm text-gray-600">Booking-ID: {booking.id}</p>
          <p className="text-sm text-gray-600">
            {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
            {new Date(booking.dateTo).toLocaleDateString()}
          </p>
        </>
      )}
    </li>
  );
}