import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import ProfileButtons from "../components/ProfileButtons";
import VenueCard from "../components/VenueCard";
import BookingCard from "../components/BookingCard";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
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

  if (!profile) {
    return <p className="text-center mt-20 text-gray-500 font-sans">Laster profil...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 mt-[120px] bg-[#f4f1ea] shadow-md rounded-lg font-sans">
      <ProfileHeader profile={profile} />

      {/* Knapper */}
      <section className="mt-10 mb-16 flex flex-wrap gap-4 justify-center">
        <ProfileButtons venueManager={profile.venueManager} />
      </section>

      {/* Dine venues */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 border-b pb-1">Dine venues</h2>
        {venues.length === 0 ? (
          <p className="text-gray-500">Du har ingen venues enda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </section>

      {/* Dine bookinger */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-1">Dine bookinger</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">Ingen bookinger funnet.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}