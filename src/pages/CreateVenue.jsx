import useVenueForm from "@hooks/useVenueForm";
import PrimaryButton from "@components/common/ui/buttons/PrimaryButton";
import VenueLocationFieldset from "@components/venue/form/VenueLocationFieldset";
import VenueMetaFieldset from "@components/venue/form/VenueMetaFieldset";
import VenuePriceGuestInputs from "@components/venue/form/VenuePriceGuestInputs";
import MediaInputList from "@components/venue/MediaInputList";
import { backgroundImages } from "@assets/image/images";

export default function CreateVenue() {
  const {
    name, setName,
    description, setDescription,
    media, updateMedia, addMediaField,
    price, setPrice,
    maxGuests, setMaxGuests,
    meta, setMeta,
    location, setLocation,
    error, success,
    handleSubmit,
  } = useVenueForm();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url('${backgroundImages.createvenueimage}')` }}
    >
      <div className="flex-grow flex items-center justify-center pt-[120px] px-4">
        <div className="w-full max-w-3xl bg-[#1c293a] text-white shadow-lg p-8">
          <h1 className="text-2xl sm:text-3xl font-thin mb-6 text-center">Opprett nytt sted</h1>
           <div className="border-t border-white/20 my-6"></div>
          {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-400 mb-4 text-center">Sted opprettet! Du sendes videre...</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block font-thin">Navn</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded text-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block font-thin">Beskrivelse</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded text-black"
              />
            </div>

            <MediaInputList media={media} updateMedia={updateMedia} addMediaField={addMediaField} />
            <VenuePriceGuestInputs price={price} setPrice={setPrice} maxGuests={maxGuests} setMaxGuests={setMaxGuests} />
            <VenueLocationFieldset location={location} setLocation={setLocation} />
            <VenueMetaFieldset meta={meta} setMeta={setMeta} />

            <PrimaryButton text="Opprett sted" type="submit" full={true} />
          </form>
        </div>
      </div>
    </div>
  );
}