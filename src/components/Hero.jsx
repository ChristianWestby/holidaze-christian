export default function Hero() {
    return (
      <section className="relative w-full h-screen overflow-hidden">
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
        <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-40">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
            Velkommen til Holidaze
          </h1>
        </div>
      </section>
    );
  }