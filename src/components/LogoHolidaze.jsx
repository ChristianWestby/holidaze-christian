export default function LogoHolidaze({ scrolled, variant = "default" }) {
  const isFooter = variant === "footer";
  const lineColor = isFooter ? "bg-black" : scrolled ? "bg-black" : "bg-white";
  const textColor = isFooter ? "text-black" : scrolled ? "text-black" : "text-white";

  return (
    <div className={`flex flex-col items-center gap-1 transition-colors duration-300 ${isFooter ? "mt-4" : ""}`}>
      <div className="flex items-center gap-2">
        <div className={`h-[1px] w-12 relative ${lineColor}`}>
          <div className={`absolute left-0 top-[-2px] h-[4px] w-[1px] ${lineColor}`} />
          <div className={`absolute right-0 top-[-2px] h-[4px] w-[1px] ${lineColor}`} />
        </div>
        <h1 className={`text-3xl font-bold tracking-wide font-[Playfair Display] ${textColor}`}>
          H
        </h1>
        <div className={`h-[1px] w-12 relative ${lineColor}`}>
          <div className={`absolute left-0 top-[-2px] h-[4px] w-[1px] ${lineColor}`} />
          <div className={`absolute right-0 top-[-2px] h-[4px] w-[1px] ${lineColor}`} />
        </div>
      </div>

      <span className={`text-xs uppercase tracking-widest font-light ${textColor}`}>
        Holidaze
      </span>
    </div>
  );
}