import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import LogoHolidaze from "./LogoHolidaze";
import FooterNav from "./FooterNav";
import { ContactInfo } from "./ContactInfo";
import { NewsletterForm } from "./NewsletterForm";
import { SocialLinks } from "./SocialLinks";

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
            <SocialLinks />
          </div>
        </div>

        {/* Navigasjon */}
        <FooterNav />

        {/* Kontakt oss */}
        <ContactInfo />

        {/* Nyhetsbrev */}
        <NewsletterForm />
      </div>

      {/* Copyright */}
      <div className="mt-16 border-t border-gray-500 pt-6 text-center text-xs text-gray-800 max-w-md mx-auto">
        &copy; {new Date().getFullYear()} Holidaze. Alle rettigheter reservert.
      </div>
    </footer>
  );
}
