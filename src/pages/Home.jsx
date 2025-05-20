export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-black text-white font-sans">
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-70"
          src="/intro.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-light tracking-widest uppercase mb-4">
          Velkommen til Holidaze
        </h1>
        <div className="mx-auto w-24 h-[2px] bg-white/70 mb-6"></div>
        <p className="text-lg md:text-xl text-white/80 font-light">
          Bo der roen finner deg. Omgitt av stil, komfort og autentiske omgivelser.
        </p>
      </div>
    </section>
  );
}