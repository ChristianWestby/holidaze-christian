export default function SignUpForm() {
  return (
    <div>
      <h3 className="uppercase text-sm tracking-widest font-semibold mb-4">Nyhetsbrev</h3>
      <p className="mb-4">Sign up for eksklusive nyheter, reiseinspirasjon og tilbud.</p>
      <form className="space-y-2">
        <label htmlFor="salutation" className="sr-only">Tiltaleform</label>
        <select
          id="salutation"
          className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option>Mr</option>
          <option>Mrs</option>
          <option>Ms</option>
        </select>

        <label htmlFor="firstName" className="sr-only">Fornavn</label>
        <input
          id="firstName"
          type="text"
          placeholder="Fornavn"
          className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label htmlFor="lastName" className="sr-only">Etternavn</label>
        <input
          id="lastName"
          type="text"
          placeholder="Etternavn"
          className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label htmlFor="email" className="sr-only">E-postadresse</label>
        <input
          id="email"
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