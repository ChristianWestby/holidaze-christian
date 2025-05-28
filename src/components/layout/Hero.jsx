import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroButton from "@components/common/ui/buttons/HeroButton";

const videos = [
  "https://res.cloudinary.com/dc1arbbpb/video/upload/v1748267677/video1_f35vob.mp4",
  "https://res.cloudinary.com/dc1arbbpb/video/upload/v1748267691/video2_j9ih37.mp4",
  "https://res.cloudinary.com/dc1arbbpb/video/upload/v1748267702/video3_lwwahp.mp4",
  "https://res.cloudinary.com/dc1arbbpb/video/upload/v1748268366/forbedretvideo4_rg2kgt.mp4",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
        setFade(true);
      }, 500);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden font-sans">
  {videos.map((videoUrl, index) => (
    <video
      key={index}
      className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
      src={videoUrl}
      autoPlay
      loop
      muted
      playsInline
    />
  ))}

  {/* Tekst over video */}
  <div className="relative z-20 text-center px-6 max-w-3xl mx-auto flex flex-col items-center justify-center h-full animate-fadeInSlow">
    <h1 className="text-5xl md:text-6xl font-light tracking-widest uppercase mb-4 text-white">
      Velkommen til Holidaze
    </h1>
    <div className="w-24 h-[2px] bg-white/70 mb-6" />
    <p className="text-lg md:text-xl text-white/100 font-light mb-8">
      Bo der roen finner deg. Omgitt av stil, komfort og autentiske omgivelser.
    </p>
    <HeroButton to="#venues" label="Utforsk steder" />
  </div>
</section>
  );
}