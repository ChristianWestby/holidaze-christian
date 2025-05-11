import { useEffect, useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Kunne ikke hente profil");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Feil ved henting av profil:", error);
      }
    }

    async function fetchUserVenues() {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/venues`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Kunne ikke hente venues");
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error("Feil ved henting av brukerens venues:", error);
      }
    }

    async function fetchUserBookings() {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Kunne ikke hente bookinger");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Feil ved henting av bookinger:", error);
      }
    }

    if (token && name) {
      fetchProfile();
      fetchUserVenues();
      fetchUserBookings();
    }
  }, [token, name]);

  if (!profile) {
    return <p className="text-center mt-12">Laster profil...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profile.avatar || "https://placehold.co/100x100"}
          alt={profile.name}
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          {profile.bio && <p className="text-gray-600 text-sm">{profile.bio}</p>}
        </div>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">Mine venues</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {venues.map((venue) => (
          <li key={venue.id} className="p-4 border rounded bg-white shadow">
            <h3 className="font-semibold text-lg mb-1">{venue.name}</h3>
            <p className="text-sm text-gray-600">{venue.location?.city || "Ukjent sted"}</p>
          </li>
        ))}
        {venues.length === 0 && <p className="text-gray-500">Ingen venues funnet.</p>}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Mine bookinger</h2>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="p-4 border rounded bg-white shadow">
            <h3 className="font-semibold">{booking.venue.name}</h3>
            <p className="text-sm text-gray-600">
              {new Date(booking.dateFrom).toLocaleDateString()} – {new Date(booking.dateTo).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">Antall gjester: {booking.guests}</p>
          </li>
        ))}
        {bookings.length === 0 && <p className="text-gray-500">Ingen bookinger funnet.</p>}
      </ul>
    </div>
  );
}
