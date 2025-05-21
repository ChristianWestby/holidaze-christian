import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newAvatar, setNewAvatar] = useState("");
  const token = localStorage.getItem("accessToken");
  const name = localStorage.getItem("userName");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [profileRes, venuesRes, bookingsRes] = await Promise.all([
          fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}`, { headers }),
          fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/venues`, { headers }),
          fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/bookings`, { headers }),
        ]);

        if (!profileRes.ok || !venuesRes.ok || !bookingsRes.ok) {
          throw new Error("En eller flere forespørsler feilet.");
        }

        setProfile(await profileRes.json());
        setVenues(await venuesRes.json());
        setBookings(await bookingsRes.json());
      } catch (error) {
        console.error("Feil ved henting av data:", error);
      }
    }

    if (token && name) fetchProfileData();
  }, [token, name]);

  async function handleAvatarUpdate(e) {
    e.preventDefault();

    try {
      const res = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/media`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar: newAvatar }),
      });

      if (!res.ok) throw new Error("Kunne ikke oppdatere avatar");

      const updated = await res.json();
      setProfile(updated);
      setNewAvatar("");
    } catch (err) {
      console.error("Avatar-feil:", err.message);
    }
  }

  if (!profile) {
    return <p className="text-center mt-20 text-gray-500 font-sans">Laster profil...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 mt-[120px] bg-white shadow-md rounded-lg font-sans">
      {/* Profilinfo */}
      <section className="flex items-center gap-8 mb-8">
        <div className="relative">
          <img
            src={profile.avatar || "https://placehold.co/120x120"}
            alt={profile.name}
            className={`w-28 h-28 rounded-full object-cover shadow-sm border-4 ${
              profile.venueManager ? "border-orange-600" : "border-gray-300"
            }`}
          />
          {profile.venueManager && (
            <span className="absolute bottom-0 right-0 bg-orange-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
              Venue Manager
            </span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-wide">{profile.name}</h1>
          {profile.bio && <p className="text-gray-600 mt-1">{profile.bio}</p>}
          <p className="text-sm text-gray-400 mt-2">{profile.email}</p>
        </div>
      </section>

      {/* Kontrollknapper */}
      <section className="mt-12 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => navigate("/settings")}
          className="inline-block text-sm tracking-wide uppercase border px-6 py-2 rounded-full transition-all duration-300 border-black text-black hover:bg-black hover:text-white"
        >
          Endre profil
        </button>

        {profile.venueManager && (
          <button
            onClick={() => navigate("/create")}
            className="inline-block text-sm tracking-wide uppercase border px-6 py-2 rounded-full transition-all duration-300 border-black text-black hover:bg-black hover:text-white"
          >
            Opprett nytt venue
          </button>
        )}

        <button
          onClick={() => navigate("/")}
          className="inline-block text-sm tracking-wide uppercase border px-6 py-2 rounded-full transition-all duration-300 border-black text-black hover:bg-black hover:text-white"
        >
          Til forsiden
        </button>

        <button
          onClick={() => navigate("/booking")}
          className="inline-block text-sm tracking-wide uppercase border px-6 py-2 rounded-full transition-all duration-300 border-black text-black hover:bg-black hover:text-white"
        >
          Booking
        </button>
      </section>

      {/* Venues */}
      <section className="mb-12 mt-16">
        <h2 className="text-xl font-semibold mb-4 border-b pb-1">Dine venues</h2>
        {venues.length === 0 ? (
          <p className="text-gray-500">Du har ingen venues enda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="rounded-xl border bg-white p-4 shadow hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">{venue.name}</h3>
                <p className="text-sm text-gray-600">
                  {venue.location?.city || "Ukjent sted"}
                </p>
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
            {bookings.map((booking) => {
              const venue = booking.venue;
              return (
                <li
                  key={booking.id}
                  className="p-4 bg-white border rounded-xl shadow hover:shadow-md transition"
                >
                  {venue ? (
                    <>
                      <h3 className="font-medium text-lg">{venue.name}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
                        {new Date(booking.dateTo).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">Gjester: {booking.guests}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="font-medium text-lg text-red-600">Venue ikke tilgjengelig</h3>
                      <p className="text-sm text-gray-500">Booking-ID: {booking.id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
                        {new Date(booking.dateTo).toLocaleDateString()}
                      </p>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
