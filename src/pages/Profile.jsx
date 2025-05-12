import { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("accessToken");
  const name = localStorage.getItem("userName");

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const profileRes = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const venuesRes = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/venues`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookingsRes = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!profileRes.ok || !venuesRes.ok || !bookingsRes.ok) throw new Error("Noe gikk galt");

        const profileData = await profileRes.json();
        const venuesData = await venuesRes.json();
        const bookingsData = await bookingsRes.json();

        setProfile(profileData);
        setVenues(venuesData);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Feil ved henting:", error);
      }
    }

    if (token && name) fetchProfileData();
  }, [token, name]);

  if (!profile) {
    return <p className="text-center mt-20 text-gray-500">Laster profil...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Profilinfo */}
      <section className="flex items-center gap-8 mb-12">
        <img
          src={profile.avatar || "https://placehold.co/120x120"}
          alt={profile.name}
          className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-sm"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-wide">{profile.name}</h1>
          {profile.bio && <p className="text-gray-600 mt-1">{profile.bio}</p>}
          <p className="text-sm text-gray-400 mt-2">{profile.email}</p>
        </div>
      </section>

      {/* Venues */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 border-b pb-1">Dine venues</h2>
        {venues.length === 0 ? (
          <p className="text-gray-500">Du har ingen venues enda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <div key={venue.id} className="rounded-xl border bg-white p-4 shadow hover:shadow-md transition">
                <h3 className="font-semibold text-lg">{venue.name}</h3>
                <p className="text-sm text-gray-600">{venue.location?.city || "Ukjent sted"}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bookinger */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-1">Dine bookinger</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">Ingen bookinger funnet.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li key={booking.id} className="p-4 bg-white border rounded-xl shadow hover:shadow-md transition">
                <h3 className="font-medium text-lg">{booking.venue.name}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
                  {new Date(booking.dateTo).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Gjester: {booking.guests}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}