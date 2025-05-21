import { Link } from "react-router-dom";
import FrontpageCarousel from "../components/FrontpageCarousel";
import FrontpageCarouselAll from "../components/FrontpageCarouselAll";

export default function Hero() {
  return (
    <>
      <section className="relative h-[80vh] flex items-center justify-center bg-black text-white font-sans">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-70"
            src="/intro.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-light tracking-widest uppercase mb-4">
            Velkommen til Holidaze
          </h1>
          <div className="mx-auto w-24 h-[2px] bg-white/70 mb-6"></div>
          <p className="text-lg md:text-xl text-white/80 font-light">
            Bo der roen finner deg. Omgitt av stil, komfort og autentiske omgivelser.
          </p>
        </div>
      </section>

      {/* Karusell */}
      <section className="bg-[#f4f1ea] py-10 px-4 rounded-lg shadow-inner mt-12">
        <FrontpageCarousel />
      </section>

      {/* Reportasjeseksjon */}
      <section className="mt-20 bg-white border-t border-gray-200 py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="https://i.ibb.co/JWQNH5Fx/image.png"
            alt="Reportasje"
            className="w-full h-auto rounded-md shadow mb-6"
          />
          <h3 className="text-2xl font-semibold mb-2">Magiske minner fra Bali</h3>
          <p className="text-gray-600 mb-4">
            Bli med bak kulissene på en av våre mest eksklusive reiser, der tropiske netter og
            eventyrlige opplevelser møtes.
          </p>
          <Link
            to="/stories/bali"
            className="inline-block border border-black px-4 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
          >
            Les reportasjen
          </Link>
        </div>
      </section>
     
    {/* Karusell 2 – Alle relevante steder */}
<section className="bg-[#f4f1ea] py-10 px-4 rounded-lg shadow-inner mt-12">
  <h2 className="text-2xl font-semibold mb-6 text-center">Alle relevante steder</h2>
  <FrontpageCarouselAll />
</section>
    </>
  );
}
