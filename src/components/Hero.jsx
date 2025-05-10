export default function Hero() {
  return (
    <section className="hero relative w-full h-96 mb-8">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/intro.mp4" type="video/mp4" />
        Din nettleser støtter ikke video.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center p-4">
        <h1 className="text-4xl font-bold mb-2">Velkommen til Holidaze</h1>
        <p className="text-lg max-w-xl">
          Finn og book unike ferieboliger i hele verden – direkte fra lokale verter.
        </p>
      </div>
    </section>
  );
}