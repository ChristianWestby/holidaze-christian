
export default function LogoHolidaze() {
  return (
    <div className="flex justify-center md:justify-start items-center gap-2 flex-col sm:flex-row">
      <div className="h-[1px] w-12 bg-black relative">
        <div className="absolute left-0 top-[-2px] h-[4px] w-[1px] bg-black" />
        <div className="absolute right-0 top-[-2px] h-[4px] w-[1px] bg-black" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold tracking-wide font-[Playfair Display]">H</h1>
        <p className="uppercase text-sm tracking-widest">Holidaze</p>
      </div>
      <div className="h-[1px] w-12 bg-black relative">
        <div className="absolute left-0 top-[-2px] h-[4px] w-[1px] bg-black" />
        <div className="absolute right-0 top-[-2px] h-[4px] w-[1px] bg-black" />
      </div>
    </div>
  );
}