export function NewsletterForm() {
  return (
    <div>
      <h3 className="uppercase text-sm tracking-widest font-semibold mb-4">Nyhetsbrev</h3>
      <p className="mb-4">Sign up for eksklusive nyheter, reiseinspirasjon og tilbud.</p>
      <form className="space-y-2">
       
        <input
          type="text"
          placeholder="Fornavn"
          className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="text"
          placeholder="Etternavn"
          className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="email"
          placeholder="E-postadresse"
          className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div className="pt-2">
          <button
            type="button"
            onClick={() => window.location.href = "mailto:nyhetsbrev@holidaze.no"}
            className="w-full sm:w-auto px-4 py-2 border border-black text-black text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}