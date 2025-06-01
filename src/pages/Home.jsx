import { Link } from "react-router-dom";
import { useEffect } from "react";

import FrontpageCarousel from "@components/common/carousel/FrontpageCarousel";
import FrontpageCarouselAll from "@components/common/carousel/FrontpageCarouselAll";
import Hero from "@components/layout/Hero";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero /> 

      {/* Karusell */}
      <section className="bg-[#f4f1ea] py-10 px-4 rounded-lg shadow-inner mt-12">
        <div className="border-t border-white/20 mb-6"></div>
        <FrontpageCarousel />
      </section>

      {/* Reportasjeseksjon */}
      <section className="mt-20 bg-gray border-t border-gray-200 py-10 px-4 sm:px-6">
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
            to="/stories"
            className="inline-block border border-black px-4 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
          >
            Les reportasjen
          </Link>
        </div>
      </section>
     
      {/* Karusell 2 – Alle relevante steder */}
      <section className="bg-[#1c293a] py-10 px-4 rounded-lg shadow-inner mt-12">
        <h2 className="text-white text-2xl font-thin mb-6 text-center">Alle relevante steder</h2>
         <div className="border-t border-white/20 mb-6"></div>
        <FrontpageCarouselAll />
      </section>
    </>
  );
}