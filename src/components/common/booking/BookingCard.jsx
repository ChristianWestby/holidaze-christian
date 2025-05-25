export default function BookingCard({ booking }) {
  const venue = booking.venue;

  return (
    <li className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
      {venue ? (
        <>
          <img
            src={venue.media?.[0]}
            alt={venue.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">{venue.name}</h3>
            {venue.location ? (
              <p className="text-sm text-gray-600 mb-1">
                {venue.location.city}, {venue.location.country}
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic mb-1">
                Stedsinformasjon mangler
              </p>
            )}
            <p className="text-sm text-gray-600">
              {new Date(booking.dateFrom).toLocaleDateString("no-NO")} –{" "}
              {new Date(booking.dateTo).toLocaleDateString("no-NO")}
            </p>
            <p className="text-sm text-gray-600">Gjester: {booking.guests}</p>
          </div>
        </>
      ) : (
        <div className="p-4">
          <h3 className="font-medium text-lg text-red-600">Venue ikke tilgjengelig</h3>
          <p className="text-sm text-gray-500">Booking-ID: {booking.id}</p>
          <p className="text-sm text-gray-500">
            {new Date(booking.dateFrom).toLocaleDateString("no-NO")} –{" "}
            {new Date(booking.dateTo).toLocaleDateString("no-NO")}
          </p>
        </div>
      )}
    </li>
  );
}