import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-20 pb-10 border-t-4 border-colombia-yellow mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 */}
          <div className="space-y-6">
            <Link href="/" className="font-display font-bold text-2xl tracking-tight text-white">
              Expatra
            </Link>
            <p className="text-white/80 text-sm">
              Your comprehensive gateway and best ally for living, investing, or retiring in the Colombian dream.
            </p>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-accent" />
                <span>Medellín, Colombia</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                <span>+1 (954) 799-3692</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <span>contact@expatra.com</span>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors"><FaFacebook size={18} /></Link>
              <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors"><FaInstagram size={18} /></Link>
              <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors"><FaLinkedin size={18} /></Link>
              <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors"><FaYoutube size={18} /></Link>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Services for Expats</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link href="/services" className="hover:text-accent transition-colors">All Services</Link></li>
              <li><Link href="/colombia-visas" className="hover:text-accent transition-colors">Colombia Visas</Link></li>
              <li><Link href="/business-in-colombia" className="hover:text-accent transition-colors">Business in Colombia</Link></li>
              <li><Link href="/insurance-colombia" className="hover:text-accent transition-colors">Health Policy</Link></li>
              <li><Link href="/real-estate" className="hover:text-accent transition-colors">Real Estate</Link></li>
              <li><Link href="/other-services" className="hover:text-accent transition-colors">Other Services</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Comprehensive Guide</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Facebook Community</Link></li>
              <li><Link href="/faqs" className="hover:text-accent transition-colors">FAQ Center</Link></li>
              <li><Link href="/colombia-tour" className="hover:text-accent transition-colors">Colombia Tours</Link></li>
              <li><Link href="/integration-guide" className="hover:text-accent transition-colors">Integration Guide</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Looking For</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link href="/quote-now" className="hover:text-accent transition-colors">Quote Now</Link></li>
              <li><Link href="/book-an-appointment" className="hover:text-accent transition-colors">Visa Consultation</Link></li>
              <li><Link href="/become-a-partner" className="hover:text-accent transition-colors">Become a Partner</Link></li>
              <li><Link href="/contact-us" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/about-us" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/pqr" className="hover:text-accent transition-colors">PQR (Complaints)</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Expatra. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
