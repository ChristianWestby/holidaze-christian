import { useAuth } from "@utils/auth/AuthContext";
import { useEffect, useState } from "react";
import ProfileHeader from "@components/profile/ProfileHeader";
import ProfileButtons from "@components/common/ui/buttons/ProfileButtons";
import VenueCard from "@components/venue/VenueCard";
import BookingCard from "@components/common/booking/BookingCard";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);

  const { token, user } = useAuth();

  useEffect(() => {
    if (!token || !user?.name) {
      console.warn("Token eller brukernavn mangler.");
      return;
    }

    async function fetchProfileData() {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const profileRes = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}`,
          { headers }
        );

        const venuesRes = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues?_owner=${user.name}`,
          { headers }
        );

        const bookingsRes = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}/bookings?_venue=true`,
          { headers }
        );

        if (!profileRes.ok || !venuesRes.ok || !bookingsRes.ok) {
          throw new Error("En eller flere forespørsler feilet.");
        }

        const profileData = await profileRes.json();
        const venuesData = await venuesRes.json();
        const bookingsData = await bookingsRes.json();

        setProfile(profileData);
        setVenues(venuesData.data?.data || venuesData.data || venuesData); 
        setBookings(bookingsData.data || bookingsData);
      } catch (error) {
        console.error("Feil ved henting av data:", error.message);
      }
    }

    fetchProfileData();
  }, [token, user?.name]);

  if (!profile) {
    return <p className="text-center mt-20 text-gray-500 font-sans">Laster profil...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 mt-[120px] bg-[#f4f1ea] shadow-xl rounded-2xl font-sans"> 
      <ProfileHeader profile={profile} />

      <section className="mt-12 mb-20 flex flex-wrap gap-4 justify-center">
        <ProfileButtons venueManager={profile.venueManager} />
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-4 border-b border-black/40 pb-2">Dine venues</h2>
        {venues.length === 0 ? (
          <p className="text-gray-500 italic">Du har ingen venues enda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#e8e3da] rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 border-b border-black/40 pb-2">Dine bookinger</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-600 italic">Ingen bookinger funnet.</p>
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