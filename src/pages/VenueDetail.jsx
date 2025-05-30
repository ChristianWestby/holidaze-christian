import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useVenueAndBookingsResult from "@hooks/useVenueAndBookingsResult";

import VenueHeroImage from "@components/venue/VenueHeroImage";
import VenueImageGallery from "@components/venue/VenueImageGallery";
import VenueBookingButton from "@components/venue/VenueBookingButton";
import VenueAvailability from "@components/venue/VenueAvailability";
import VenueLocationTitle from "@components/venue/form/VenueLocationTitle";
import VenueDescription from "@components/venue/VenueDescription";
import VenueDetailInfo from "@components/venue/VenueDetailInfo";
import BackToLink from "@components/common/navigation/BackToLink";
import PageSectionOne from "@components/layout/PageSectionOne";
import PageSectionTwo from "@components/layout/PageSectionTwo";
import VenueStorySection from "@components/layout/VeneuStorySection";
import FrontpageCarousel from "@components/common/carousel/FrontpageCarousel";
import FrontpageCarouselAll from "@components/common/carousel/FrontpageCarouselAll";
import FallbackLoader from "@components/common/ui/feedback/FallbackLoader";

export default function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { venue, bookings } = useVenueAndBookingsResult(id, navigate);

  const [mainImageIndex, setMainImageIndex] = useState(1);

  useEffect(() => {
    setMainImageIndex(1);
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

      <VenueBookingButton
        venueId={venue.id}
        onClick={() => navigate(`/booking/${venue.id}`)}
      />

      <VenueAvailability bookings={bookings} />

      <BackToLink to="/" label="← Tilbake til forsiden" />

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