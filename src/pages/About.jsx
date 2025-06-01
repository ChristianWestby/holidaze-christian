import { Link } from "react-router-dom";
import { backgroundImages } from "@assets/image/images";

export default function About() {
  return (
    <main className="min-h-screen pt-[120px] pb-20 px-4 bg-[#f4f1ea] text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-10 text-center">
          Om Holidaze
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2 text-base sm:text-lg leading-relaxed">
            <p className="mb-6">
              Holidaze tilbyr eksklusive reiseopplevelser med fokus på personlig service og
              unike destinasjoner. Vi kombinerer håndplukkede steder med fantastisk natur og luksuriøse fasiliteter
              for å gi deg minner for livet.
            </p>

            <div className="bg-black text-white p-6 shadow-inner">
              <p className="text-sm sm:text-base leading-relaxed">
                Vår dedikerte team sørger for at hver eneste detalj er perfekt, enten det handler om romantiske
                opphold, familieeventyr eller eventyr utenom det vanlige. Hos Holidaze handler det om deg – din drøm og din reise.
              </p>
            </div>

            <p className="mt-6">
              Utforsk våre nøye utvalgte steder, og opplev en verden av komfort og eleganse, hvor hver destinasjon
              har sin egen historie og sjel.
            </p>
          </div>

          <div className="lg:w-1/2 shadow-lg">
            <img
              src={backgroundImages.venuebooking}
              alt="Eksklusiv reiseopplevelse"
              className="w-full h-80 lg:h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-black text-white uppercase tracking-wider font-light hover:bg-gray-800 transition"
          >
            ← Tilbake til forsiden
          </Link>
        </div>
      </div>
    </main>
  );
}