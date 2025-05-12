import { useEffect, useState } from "react";

const videos = ["/intro.mp4", "/feterewawes.mp4"];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 12000); // Bytt video hvert 12. sekund

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
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