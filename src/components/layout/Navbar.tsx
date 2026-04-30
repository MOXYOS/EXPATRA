"use client"

import { useState } from "react";
import { TopBar } from "./TopBar";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md shadow-lg text-foreground py-0" 
          : "bg-gradient-to-b from-black/60 to-transparent text-white py-2"
      }`}
    >
      <TopBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="font-display font-bold text-2xl tracking-tight flex items-center gap-2">
             <span className={scrolled ? "text-primary" : "text-white"}>Expatra</span>
          </Link>
          
          <div className="hidden lg:flex items-center flex-1 justify-center relative">
            <MegaMenu scrolled={scrolled} />
          </div>

          <div className="hidden lg:flex items-center gap-4">
             <Button variant="default" className="bg-primary hover:bg-primary-dark text-white rounded-full">
               Get Advice Now →
             </Button>
          </div>
          
          <div className="lg:hidden flex items-center">
            <MobileMenu />
          </div>
        </div>
        
        <div className={`hidden lg:flex items-center justify-center gap-6 pb-3 text-sm font-medium transition-colors ${scrolled ? "text-muted-foreground" : "text-white/80"}`}>
          <Link href="/services" className="hover:text-primary transition-colors">Services ▾</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="/about-us" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/faqs" className="hover:text-primary transition-colors">FAQs</Link>
          <Link href="/contact-us" className="hover:text-primary transition-colors">Contact</Link>
          <Link href="/quote-now" className="hover:text-primary transition-colors">Quote Now</Link>
          <Link href="/become-a-partner" className="hover:text-primary transition-colors">Become a Partner</Link>
        </div>
      </div>
    </motion.header>
  );
}
