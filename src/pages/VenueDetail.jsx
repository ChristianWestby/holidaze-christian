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
import BackToHomeLink from "@components/common/navigation/BackToHomeLink";
import PageSectionOne from "@components/layout/PageSectionOne";
import PageSectionTwo from "@components/layout/PageSectionTwo";
import VenueStorySection from "../components/layout/VeneuStorySection";
import PageSectionOne from "@components/layout/PageSectionOne";

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
      <VenueHeroImage media={venue.media} name={venue.name} location={venue.location} />

      <VenueLocationTitle location={venue.location} />

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

      <BackToHomeLink />

      <PageSectionTwo>
        <FrontpageCarouselAll />
      </PageSectionTwo>

     <VenueStorySection />
      <PageSectionOne>
        <FrontpageCarousel />
      </PageSectionOne>
    </section>
  );
}