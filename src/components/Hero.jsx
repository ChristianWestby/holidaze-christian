export default function Hero() {
  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/intro.mp4" type="video/mp4" />
        Din nettleser støtter ikke video.
      </video>

      {/* Hero-tekst */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-40 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-200 mb-4">
          Velkommen til Holidaze
        </h1>
        <p className="text-lg text-gray-200 max-w-xl">
          Finn og book unike ferieboliger i hele verden – direkte fra lokale verter.
        </p>
      </div>
    </section>
  );
}