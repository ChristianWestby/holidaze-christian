import { Link } from "react-router-dom";
import { backgroundImages } from "@assets/image/images";

export default function About() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16 mt-[120px] font-sans bg-[#f4f1ea] rounded-none shadow-xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight">
        Om Holidaze
      </h1>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/2 text-gray-900 text-lg leading-relaxed">
          <p className="mb-6">
            Holidaze tilbyr eksklusive reiseopplevelser med fokus på personlig service og
            unike destinasjoner. Vi kombinerer håndplukkede steder med fantastisk natur og luksuriøse fasiliteter
            for å gi deg minner for livet.
          </p>

          <div className="bg-black text-white p-6 rounded-none shadow-inner mt-6">
            <p className="text-base leading-relaxed">
              Vår dedikerte team sørger for at hver eneste detalj er perfekt, enten det handler om romantiske
              opphold, familieeventyr eller eventyr utenom det vanlige. Hos Holidaze handler det om deg – din drøm og din reise.
            </p>
          </div>

          <p className="mt-6">
            Utforsk våre nøye utvalgte steder, og opplev en verden av komfort og eleganse, hvor hver destinasjon
            har sin egen historie og sjel.
          </p>
        </div>

        <div className="lg:w-1/2 rounded-none overflow-hidden shadow-lg">
          <img
            src={backgroundImages.venuebooking}
            alt="Eksklusiv reiseopplevelse"
            className="w-full object-cover h-80 lg:h-full"
          />
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-black text-white uppercase tracking-wider font-semibold rounded-none hover:bg-gray-800 transition"
        >
          ← Tilbake til forsiden
        </Link>
      </div>
    </main>
  );
}