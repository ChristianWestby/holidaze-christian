import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@utils/auth/AuthContext";
import useVenueAndBookingsResult from "@hooks/useVenueAndBookingsResult";

import VenueHeroImage from "@components/venue/VenueHeroImage";
import VenueImageGallery from "@components/venue/VenueImageGallery";
import FrontpageCarousel from "@components/common/carousel/FrontpageCarousel";
import FrontpageCarouselAll from "@components/common/carousel/FrontpageCarouselAll";
import BookingModal from "@components/common/booking/BookingModal";
import VenueBookingButton from "@components/venue/VenueBookingButton";
import VenueAvailability from "@components/venue/VenueAvailability";
import VenueLocationTitle from "@components/venue/VenueLocationTitle";
import VenueDescription from "@components/venue/VenueDescription";
import VenueDetailInfo from "@components/venue/VenueDetailInfo";

export default function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const { venue, bookings } = useVenueAndBookingsResult(id, navigate);

  const [mainImageIndex, setMainImageIndex] = useState(1);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    setMainImageIndex(1);
    setShowBooking(false);
    window.scrollTo(0, 0);
  }, [id]);

  if (!venue) return <FallbackLoader />;

  return (
   <section className="sectionmain venue-detail"> 
      <VenueHeroImage
      media={venue.media} 
      name={venue.name} 
      location={venue.location} 
      />

     <VenueLocationTitle location={venue.location}>

    <VenueImageGallery
     media={venue.media}
     mainImageIndex={mainImageIndex}
    setMainImageIndex={setMainImageIndex}
    />

         
    <VenueDescription description={venue.description} />

         <VenueDetailInfo venue={venue} />

          <VenueBookingButton venueId={venue.id} />
    

        {showBooking && (
          <BookingModal
            venue={venue}
            bookings={bookings}
            onClose={() => setShowBooking(false)}
          />
        )}

        <VenueAvailability bookings={bookings} />

        <div className="mt-12 mb-4">
          <Link to="/" className="text-sm text-gray-500 underline hover:text-black">
            ← Tilbake til forside
          </Link>
        </div>

        <div className="bg-[#f4f1ea] py-10 px-4 rounded-lg shadow-inner">
          <FrontpageCarouselAll />
        </div>

        <div className="mt-12 bg-white border-t border-gray-200 py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Reportasje"
              className="w-full h-auto rounded-md shadow mb-6"
            />
            <h3 className="text-2xl font-semibold mb-2">Magiske minner fra Bali</h3>
            <p className="text-gray-600 mb-4">
              Bli med bak kulissene på en av våre mest eksklusive reiser, der tropiske netter og eventyrlige opplevelser møtes.
            </p>
            <Link
              to="/stories/bali"
              className="inline-block border border-black px-4 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
            >
              Les reportasjen
            </Link>
          </div>
        </div>

        <div className="bg-[#f4f1ea] py-10 px-4 rounded-lg shadow-inner">
          <FrontpageCarousel />
        </div>
      </div>
    
    </section>
  );
}