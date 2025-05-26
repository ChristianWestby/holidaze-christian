import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import LogoHolidaze from "@components/common/ui/LogoHolidaze";
import FooterLinker from "@components/common/links/FooterLinker";
import { SocialLinks } from "@components/common/links/SocialLinks";
import { ContactInfo } from "@components/common/forms/ContactInfo";
import { NewsletterForm } from "@components/common/forms/NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-[#f4f1ea] text-black px-6 pt-20 pb-10 border-t border-gray-300 mt-20 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 flex-wrap justify-between">

        {/* Logo + sosiale medier */}
        <div className="flex-1 min-w-[250px] text-center lg:text-left">
          <div className="mb-12 flex justify-center lg:justify-start">
            <LogoHolidaze variant="footer" />
          </div>
          <div className="mt-8">
            <h4 className="uppercase font-semibold mb-4">Del din tilbakemelding</h4>
            <SocialLinks />
          </div>
        </div>

        {/* Navigasjon */}
        <div className="flex-1 min-w-[250px]">
          <FooterLinker />
        </div>

        {/* Kontakt oss */}
        <div className="flex-1 min-w-[250px] flex flex-col justify-between">
          <ContactInfo />
        </div>

        {/* Nyhetsbrev */}
        <div className="flex-1 min-w-[250px] flex flex-col justify-between">
          <NewsletterForm />
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-16 border-t border-gray-500 pt-6 text-center text-xs text-gray-800 max-w-md mx-auto">
        &copy; {new Date().getFullYear()} Holidaze. Alle rettigheter reservert.
      </div>
    </footer>
  );
}