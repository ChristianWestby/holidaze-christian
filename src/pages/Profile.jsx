import { useAuth } from "@utils/auth/AuthContext";
import { useEffect, useState } from "react";
import ProfileHeader from "@components/profile/ProfileHeader";
import ProfileButtons from "@components/common/ui/buttons/ProfileButtons";
import VenueCard from "@components/venue/VenueCard";
import BookingCard from "@components/common/booking/BookingCard";
import Pagination from "@components/common/navigation/Pagination";
import { backgroundImages } from "@assets/image/images";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [venuePage, setVenuePage] = useState(1);
  const [bookingPage, setBookingPage] = useState(1);
  const itemsPerPage = 4;

  const { token, user } = useAuth();

  useEffect(() => {
    if (!token || !user?.name) return;

    async function fetchProfileData() {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [profileRes, venuesRes, bookingsRes] = await Promise.all([
          fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}`, { headers }),
          fetch(`https://api.noroff.dev/api/v1/holidaze/venues?_owner=${user.name}`, { headers }),
          fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${user.name}/bookings?_venue=true`, { headers }),
        ]);

        if (!profileRes.ok || !venuesRes.ok || !bookingsRes.ok) {
          throw new Error("Feil ved henting av data");
        }

        const profileData = await profileRes.json();
        const venuesData = await venuesRes.json();
        const bookingsData = await bookingsRes.json();

        setProfile(profileData);
        setVenues(venuesData.data?.data || venuesData.data || venuesData);
        setBookings(bookingsData.data || bookingsData);
      } catch (error) {
        console.error("Feil:", error.message);
      }
    }

    fetchProfileData();
  }, [token, user?.name]);

  if (!profile) {
    return <p className="text-center mt-20 text-gray-500 font-sans">Laster profil...</p>;
  }

  const paginatedVenues = venues.slice((venuePage - 1) * itemsPerPage, venuePage * itemsPerPage);
  const paginatedBookings = bookings.slice((bookingPage - 1) * itemsPerPage, bookingPage * itemsPerPage);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url("${backgroundImages.profile}")` }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 py-12 text-white mt-[120px]">
        <ProfileHeader profile={profile} />

        <section className="mt-10 mb-16 bg-[#1c293a] p-6 rounded-lg shadow-md">
          <ProfileButtons venueManager={profile.venueManager} />
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Venues */}
          <section className="w-full lg:w-1/2 bg-[#1c293a] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/40 pb-2">Dine venues</h2>
            {paginatedVenues.length === 0 ? (
              <p className="text-white/60 italic">Du har ingen venues enda.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6">
                  {paginatedVenues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} editable={true} />
                  ))}
                </div>
                <Pagination
                  totalPages={Math.ceil(venues.length / itemsPerPage)}
                  currentPage={venuePage}
                  onPageChange={setVenuePage}
                />
              </>
            )}
          </section>

          {/* Bookings */}
          <section className="w-full lg:w-1/2 bg-[#1c293a] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/40 pb-2">Dine bookinger</h2>
            {paginatedBookings.length === 0 ? (
              <p className="text-white/60 italic">Ingen bookinger funnet.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6">
                  {paginatedBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
                <Pagination
                  totalPages={Math.ceil(bookings.length / itemsPerPage)}
                  currentPage={bookingPage}
                  onPageChange={setBookingPage}
                />
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}