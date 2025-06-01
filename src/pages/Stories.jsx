import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { repotasjeImages } from "@assets/image/images";

export default function Stories() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#1c293a] text-white min-h-screen w-full pt-[120px] pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-thin text-center mb-4">
            Magiske minner fra Bali
          </h1>
          <div className="border-t border-white/20 mb-6"></div>
          <p className="text-white text-center max-w-2xl mx-auto px-2">
            En reise til hjertet av Indonesia med sand mellom tærne, rolig rislyd i palmene, og
            solnedganger som får tiden til å stå stille.
          </p>
          <div className="border-t border-white/20 mb-6"></div>
        </div>

        <img
          src={repotasjeImages.balibilde2}
          alt="Bali strender"
          className="w-full h-auto shadow rounded-md mb-8"
        />

        <div className="border-t border-white mb-6"></div>

        <div className="leading-relaxed space-y-6 text-sm sm:text-base">
          <p>
            Da vi landet på Bali, var det som å stige inn i en annen verden. Lukten av røkelse og
            havbris blandet seg i den varme luften. Vi ble møtt av smilende fjes og levende farger –
            og vi visste med én gang at dette kom til å bli spesielt.
          </p>

          <p>
            Vår reise tok oss gjennom frodige rismarker, templer med hundreårige historier, og
            bortgjemte strender der bølgene danset mot land. Vi bodde i en håndplukket bungalow med
            utsikt over jungelen, hvor morgener startet med frisk frukt og lyden av naturen.
          </p>

          <p>
            Et av høydepunktene var solnedgangen i Uluwatu. Mens solen forsvant i havet, satt vi på
            en klippe med en kopp lokal kaffe og bare lot stillheten omfavne oss. Det er slike
            øyeblikk som gjør at man husker hvorfor man reiser.
          </p>

          <div className="border-t border-white/20 mb-6"></div>

          <img
            src={repotasjeImages.balibilde3}
            alt="Bali landskap"
            className="w-full h-auto shadow rounded-md my-8"
          />

          <p>
            Vi besøkte også lokale markeder, lærte å lage indonesiske retter med en mesterkokk, og
            ble invitert til en tradisjonell danseforestilling i en liten landsby. Bali er mer enn
            et reisemål – det er en følelse. En påminnelse om ro, balanse og skjønnhet i det enkle.
          </p>

          <p>
            Denne reportasjen er en del av vår serie om reiser som forvandler. Vi håper den
            inspirerer deg til å oppdage ditt eget magiske sted – uansett hvor på kloden det måtte
            være.
          </p>
        </div>

        <div className="border-t border-white/20 mt-10 mb-6"></div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-block border border-white text-white px-4 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition"
          >
            ← Tilbake
          </button>
        </div>
      </div>
    </div>
  );
}