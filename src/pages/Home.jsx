import { Link } from "react-router-dom";
import { useEffect } from "react";
import FrontpageCarousel from "@components/common/carousel/FrontpageCarousel";
import FrontpageCarouselAll from "@components/common/carousel/FrontpageCarouselAll";
import Hero from "@components/layout/Hero";
import { repotasjeImages } from "@assets/image/images";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />

      {/* Karusell 1 */}
      <section className="bg-[#f4f1ea] py-10 px-4 md:px-6 lg:px-8 rounded-lg shadow-inner mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="border-t border-white/30 mb-6"></div>
          <FrontpageCarousel />
        </div>
      </section>

      {/* Reportasje */}
      <section className="bg-gray-900 text-white mt-16 sm:mt-20 md:mt-24 border-t border-gray-700 py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 tracking-wide">
            Magiske minner fra Bali
          </h3>
          <div className="border-t border-white/20 mb-6"></div>

          <img
            src={repotasjeImages.bali}
            alt="Reportasje"
            className="w-full h-auto rounded-xl shadow-lg mb-6"
          />

          <p className="text-white/90 mb-6 px-2 sm:px-4 leading-relaxed">
            Bli med bak kulissene på en av våre mest eksklusive reiser, der tropiske netter og
            eventyrlige opplevelser møtes.
          </p>

          <Link
            to="/stories"
            className="inline-block border border-white px-5 py-2 text-sm uppercase tracking-wider rounded-md hover:bg-white hover:text-black transition"
          >
            Les reportasjen
          </Link>
        </div>
      </section>

      {/* Karusell 2 */}
      <section className="bg-[#1c293a] py-10 px-4 md:px-6 lg:px-8 rounded-lg shadow-inner mt-16 sm:mt-20 md:mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-thin mb-6 text-center">
            Alle relevante steder
          </h2>
          <div className="border-t border-white/20 mb-6"></div>
          <FrontpageCarouselAll />
        </div>
      </section>
    </>
  );
}