export default function CarouselIndicators({ count, currentIndex, onSelect }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`w-5 h-1 rounded-sm transition-all duration-300 focus:outline-none ${
            i === currentIndex ? "bg-white" : "bg-white/30"
          }`}
          aria-label={`Gå til slide ${i + 1}`}
        />
      ))}
    </div>
  );
}
