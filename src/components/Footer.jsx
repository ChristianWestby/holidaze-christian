import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import LogoHolidaze from "./LogoHolidaze";

export default function Footer() {
  return (
    <footer className="bg-[#f4f1ea] text-black px-6 pt-20 pb-10 border-t border-gray-300 mt-20 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Logo + Holidaze tekst */}
        <div className="space-y-6 text-center md:text-left">
          <div className="mb-[100px]">
            <LogoHolidaze />
          </div>
          <div className="mt-16">
            <h4 className="uppercase font-semibold mb-4 text-center md:text-left">Del din tilbakemelding</h4>
            <div className="flex gap-4 justify-center md:justify-start text-gray-700">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook className="w-5 h-5" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram className="w-5 h-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin className="w-5 h-5" /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        {/* Navigasjon */}
        <div className="space-y-2 mt-4">
          <Link to="/about" className="block hover:underline">Om oss</Link>
          <Link to="/" className="block hover:underline">Forside</Link>
          <Link to="/vision" className="block hover:underline">Visjon</Link>
          <span className="block">Presse</span>
          <span className="block">Jobb hos oss</span>
          <span className="block">Privacy policy</span>
          <span className="block">Terms and conditions</span>
        </div>

        {/* Kontakt oss */}
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-2">
            <h3 className="uppercase text-sm tracking-widest font-semibold mb-2">Kontakt oss</h3>
            <p>Tlf: +47 900 45 9000</p>
            <p>Adresse: Møllergata 2, 0124 Oslo</p>
            <a href="https://maps.google.com?q=Møllergata+2+0124+Oslo" target="_blank" rel="noreferrer" className="underline">Se i Google Maps</a>
          </div>
          <div className="pt-4">
            <button className="w-full sm:w-auto px-4 py-2 border border-black text-black text-sm uppercase tracking-wide hover:bg-black hover:text-white transition">
              Kontakt oss
            </button>
          </div>
        </div>

        {/* Nyhetsbrev + sign up */}
        <div>
          <h3 className="uppercase text-sm tracking-widest font-semibold mb-4">Nyhetsbrev</h3>
          <p className="mb-4">Sign up for eksklusive nyheter, reiseinspirasjon og tilbud.</p>
          <form className="space-y-2">
            <select className="w-full border border-gray-300 px-2 py-1">
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
            </select>
            <input type="text" placeholder="Fornavn" className="w-full border border-gray-300 px-2 py-1" />
            <input type="text" placeholder="Etternavn" className="w-full border border-gray-300 px-2 py-1" />
            <input type="email" placeholder="E-postadresse" className="w-full border border-gray-300 px-2 py-1" />
            <div className="pt-2">
              <button type="submit" className="w-full sm:w-auto px-4 py-2 border border-black text-black text-sm uppercase tracking-wide hover:bg-black hover:text-white transition">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-16 border-t border-gray-500 pt-6 text-center text-xs text-gray-600 max-w-md mx-auto">
        &copy; {new Date().getFullYear()} Holidaze. Alle rettigheter reservert.
      </div>
    </footer>
  );
}