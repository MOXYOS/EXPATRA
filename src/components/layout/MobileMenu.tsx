"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 -mr-2">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/colombia-visas" className="text-lg font-medium">I&apos;m a Digital Nomad</Link>
          <Link href="/business-in-colombia" className="text-lg font-medium">I Want to Invest</Link>
          <Link href="/retirement-colombia" className="text-lg font-medium">I&apos;m Retired</Link>
          <Link href="/insurance-colombia" className="text-lg font-medium">Get Health Policy</Link>
          <Link href="/us-citizens-services" className="text-lg font-medium">US Citizens Services</Link>
          <div className="h-px bg-border my-2" />
          <Link href="/services" className="text-muted-foreground">Services</Link>
          <Link href="/blog" className="text-muted-foreground">Blog</Link>
          <Link href="/about-us" className="text-muted-foreground">About Us</Link>
          <Link href="/contact-us" className="text-muted-foreground">Contact</Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
