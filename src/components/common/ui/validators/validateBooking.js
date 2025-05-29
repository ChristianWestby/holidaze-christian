export default function validateBooking({ start, end, guests, maxGuests, token, overlapWarning }) {
  if (overlapWarning) return "Valgte datoer overlapper med eksisterende booking.";
  if (!start || !end) return "Datoene må fylles ut.";
  if (start >= end) return "Utsjekksdato må være etter innsjekksdato.";
  if (guests < 1 || guests > (maxGuests || 10)) {
    return `Antall gjester må være mellom 1 og ${maxGuests || 10}.`;
  }
  if (!token) return "Du må være logget inn for å booke.";
  return null;
}