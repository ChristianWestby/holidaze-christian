<section className="bg-[#1c1c1c] text-white py-16 px-4 sm:px-6 rounded-lg shadow-inner relative max-w-6xl mx-auto">
  <h2 className="text-2xl font-thin text-center mb-10 tracking-wide uppercase text-white">
    NYTT FRA HOLIDAZE
  </h2>
  <div className="border-t border-white/20 mb-6"></div>

  {/* Navigasjonsknapper */}
  <button
    onClick={prevSlide}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black text-white border border-black w-10 h-16 flex items-center justify-center hover:bg-white hover:text-black transition hover:scale-110"
  >
    <ChevronLeft className="w-7 h-7 stroke-[1.3]" />
  </button>
  <button
    onClick={nextSlide}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black text-white border border-black w-10 h-16 flex items-center justify-center hover:bg-white hover:text-black transition hover:scale-110"
  >
    <ChevronRight className="w-7 h-7 stroke-[1.3]" />
  </button>

  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
    <div className="md:w-1/2 w-full text-center md:text-left">
      <h3 className="uppercase text-sm tracking-widest text-gray-300 mb-1">Utvalgt</h3>
      <h1 className="text-2xl font-bold mb-3 leading-snug">{current.name}</h1>
      <p className="text-gray-400 text-sm mb-4">{current.description?.slice(0, 160)}...</p>
      <Link
        to={`/venues/${current.id}`}
        className="inline-block px-4 py-2 border border-white text-white text-sm uppercase tracking-wide hover:bg-white hover:text-black transition"
      >
        Utforsk stedet
      </Link>
    </div>

    <div className="md:w-1/2 w-full relative">
      {image && (
        <img
          src={image}
          alt={current.name}
          className="w-full max-w-full rounded-sm shadow-lg object-cover h-[250px] sm:h-[300px] md:h-[400px]"
        />
      )}

      <div className="flex justify-center gap-2 mt-4">
        {venues.map((_, i) => (
          <div
            key={i}
            className={`w-5 h-1 rounded-sm transition-all duration-300 ${
              i === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  </div>
</section>