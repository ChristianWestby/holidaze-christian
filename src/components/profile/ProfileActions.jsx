import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileActions({ isVenueManager }) {
  const navigate = useNavigate();

  return (
    <section className="mt-12 flex flex-wrap gap-4 justify-center">
      <button
        onClick={() => navigate("/settings")}
        className="inline-block text-sm tracking-wide uppercase border px-6 py-2 rounded-full transition-all duration-300 border-black text-black hover:bg-black hover:text-white"
      >
        Endre profil
      </button>

      {isVenueManager && (
        <>
          <button
            onClick={() => navigate("/create")}
            className="inline-block text-sm tracking-wide uppercase border px-6 py-2 rounded-full transition-all duration-300 border-black text-black hover:bg-black hover:text-white"
          >
            Opprett nytt venue
          </button>

          <button
            onClick={() => navigate("/my-venues")}
            className="inline-block text-sm tracking-wide uppercase border px-6 py-2 rounded-full transition-all duration-300 border-black text-black hover:bg-black hover:text-white"
          >
            Rediger venues
          </button>
        </>
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
  );
}