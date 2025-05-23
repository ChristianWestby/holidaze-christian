export function ContactInfo() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-2 mt-4">
        <h3 className="uppercase text-sm tracking-widest font-semibold mb-2">Kontakt oss</h3>
        <p>Tlf: +47 900 45 9000</p>
        <p>Adresse: Møllergata 2, 0124 Oslo</p>
        <a
          href="https://maps.google.com?q=Møllergata+2+0124+Oslo"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Se i Google Maps
        </a>
      </div>
      <div className="pt-4">
        <button
          type="button"
          onClick={() => window.location.href = "mailto:kontakt@holidaze.no"}
          className="w-full sm:w-auto px-4 py-2 border border-black text-black text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
        >
          Kontakt oss
        </button>
      </div>
    </div>
  );
}
