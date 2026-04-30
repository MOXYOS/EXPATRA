import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export function TopBar() {
  return (
    <div className="bg-primary-dark text-white text-sm py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center z-50 relative">
      <div className="flex items-center gap-4">
        <a href="tel:+19547993692" className="flex items-center gap-2 hover:text-accent transition-colors">
          <Phone size={14} />
          <span>+1 (954) 799-3692</span>
        </a>
        <span className="hidden sm:inline text-white/50">|</span>
        <a href="mailto:contact@expatra.com" className="hidden sm:flex items-center gap-2 hover:text-accent transition-colors">
          <Mail size={14} />
          <span>contact@expatra.com</span>
        </a>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3 mr-2">
          <Link href="#" className="hover:text-accent transition-colors"><FaFacebook size={16} /></Link>
          <Link href="#" className="hover:text-accent transition-colors"><FaInstagram size={16} /></Link>
          <Link href="#" className="hover:text-accent transition-colors"><FaLinkedin size={16} /></Link>
          <Link href="#" className="hover:text-accent transition-colors"><FaYoutube size={16} /></Link>
        </div>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
