import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export function SocialLinks() {
  return (
    <div className="flex gap-4 justify-center md:justify-start text-gray-700">
      <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
       <Facebook className="w-5 h-5" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
        <Instagram className="w-5 h-5" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <Linkedin className="w-5 h-5" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
        <Youtube className="w-5 h-5" />
      </a>
    </div>
  );
}