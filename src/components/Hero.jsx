import { useEffect, useState } from "react";

const videos = ["/public/intro.mp4", "/feterewawes.mp4"];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden font-sans">
      {/* Videoer */}
      {videos.map((src, index) => (
        <video
          key={src}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={src} type="video/mp4" />
          Din nettleser støtter ikke video.
        </video>
      ))}

      {/* Tekstlag */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black/50 text-center px-4 animate-fadeInSlow">
        <h1 className="text-4xl md:text-6xl font-light text-white tracking-wide mb-4">
          Tidløse opplevelser. Moderne eleganse.
        </h1>
        <div className="w-24 h-[2px] bg-white/70 mb-6" />
        <p className="text-lg text-white/80 max-w-xl font-light mb-8">
          Finn og book unike ferieboliger i hele verden – direkte fra lokale verter.
        </p>
        <a
          href="#venues"
          className="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 uppercase text-sm tracking-wide"
        >
          Utforsk steder
        </a>
      </div>
    </section>
  );
}