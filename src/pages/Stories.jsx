import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { repotasjeImages } from "@assets/image/images";

export default function Stories() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#1c293a] text-white max-w-4xl mx-auto px-4 py-12 mt-[120px]">
      <div className="mb-8">
        <h1 className=" text-white text-3xl sm:text-4xl font-thin mb-4 text-center">Magiske minner fra Bali</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          En reise til hjertet av Indonesia med sand mellom tærne, rolig rislyd i palmene, og
          solnedganger som får tiden til å stå stille.
        </p>
      </div>

      <img
        src={repotasjeImages.balibilde2}
        alt="Bali strender"
        className="w-full h-auto rounded-md shadow mb-8"
      />

      <div className="text-gray-700 leading-relaxed space-y-6">
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
          Et av høydepunktene var solnedgangen i Uluwatu. Mens solen forsvant i havet, satt vi på en
          klippe med en kopp lokal kaffe og bare lot stillheten omfavne oss. Det er slike øyeblikk
          som gjør at man husker hvorfor man reiser.
        </p>

        <img
          src={repotasjeImages.balibilde3}
          alt="Bali landskap"
          className="w-full h-auto rounded-md shadow my-8"
        />

        <p>
          Vi besøkte også lokale markeder, lærte å lage indonesiske retter med en mesterkokk, og ble
          invitert til en tradisjonell danseforestilling i en liten landsby. Bali er mer enn et
          reisemål – det er en følelse. En påminnelse om ro, balanse og skjønnhet i det enkle.
        </p>

        <p>
          Denne reportasjen er en del av vår serie om reiser som forvandler. Vi håper den inspirerer
          deg til å oppdage ditt eget magiske sted – uansett hvor på kloden det måtte være.
        </p>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-block border border-black px-4 py-2 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
        >
          ← Tilbake
        </button>
      </div>
    </div>
  );
}