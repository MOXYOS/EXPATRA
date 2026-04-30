"use client"
import { useTranslations } from "next-intl"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu, Briefcase, Building2, User, Shield, ArrowRight, MessageCircle, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function MobileMenu({ scrolled }: { scrolled: boolean }) {
  const t = useTranslations("nav")
  const m = useTranslations("megaMenu")
  const menuItems = [
    {
      title: t("digitalNomad"),
      icon: <Briefcase className="size-5 text-primary" />,
      sublinks: [
        { href: "/colombia-visas/tourism-stamp-extension", label: m("links.tourismExtension") },
        { href: "/colombia-visas/digital-nomad-visa", label: m("links.nomadVisa") },
        { href: "/insurance-colombia", label: m("links.healthPolicy") },
        { href: "/other-services/fbi-background-check", label: m("links.fbiCheck") }
      ]
    },
    {
      title: t("invest"),
      icon: <Building2 className="size-5 text-accent" />,
      sublinks: [
        { href: "/business-in-colombia/company-incorporation", label: m("links.companyIncorporation") },
        { href: "/colombia-visas/business-owner-visa", label: m("links.businessVisa") },
        { href: "/real-estate/property-listings", label: m("links.propertyListings") },
        { href: "/colombia-visas/real-estate-visa", label: m("links.realEstateVisa") }
      ]
    },
    {
      title: t("retired"),
      icon: <User className="size-5 text-colombia-yellow" />,
      sublinks: [
        { href: "/colombia-visas/retirement-visa", label: m("links.retirementVisa") },
        { href: "/insurance-colombia", label: m("links.healthPolicy") },
        { href: "/other-services/us-apostille", label: m("links.usApostille") }
      ]
    },
    {
      title: t("health"),
      icon: <Shield className="size-5 text-success" />,
      sublinks: [
        { href: "/insurance-colombia/tourism-policy", label: m("links.tourismInsurance") },
        { href: "/insurance-colombia/visa-policy", label: m("links.visaInsurance") },
        { href: "/quote-now", label: m("links.quoteNow") }
      ]
    },
    {
      title: t("usCitizens"),
      icon: <ArrowRight className="size-5 text-colombia-red" />,
      sublinks: [
        { href: "/other-services/passport-renewal", label: m("links.passportRenewal") },
        { href: "/other-services/fbi-background-check", label: m("links.fbiCheck") },
        { href: "/other-services/us-apostille", label: m("links.usApostille") }
      ]
    }
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 rounded-full transition-colors text-primary hover:bg-primary/5">
          <Menu size={28} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 overflow-y-auto">
        <SheetHeader className="p-6 border-b text-left">
          <SheetTitle className="font-display text-2xl font-bold text-primary">Expatra Menu</SheetTitle>
        </SheetHeader>
        
        <div className="p-4">
          <Accordion type="single" collapsible className="w-full">
            {menuItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-none mb-2">
                <AccordionTrigger className="hover:no-underline p-4 bg-surface rounded-2xl border border-transparent hover:border-primary/10 transition-all">
                  <div className="flex items-center gap-4 text-left">
                    <div className="bg-white size-10 rounded-xl flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <span className="font-bold text-base text-primary">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 px-4">
                  <div className="flex flex-col gap-1 pl-14 border-l-2 border-primary/10 ml-5">
                    {item.sublinks.map((sub, sIdx) => (
                      <Link 
                        key={sIdx} 
                        href={sub.href}
                        className="py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center justify-between group"
                      >
                        {sub.label}
                        <ArrowRight className="size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 space-y-2">
            <Link href="/blog" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-surface transition-colors">
              <BookOpen className="size-5 text-muted-foreground" />
              <span className="font-semibold text-primary">{t("blog")} & Guides</span>
            </Link>
            <Link href="/faqs" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-surface transition-colors">
              <MessageCircle className="size-5 text-muted-foreground" />
              <span className="font-semibold text-primary">{t("faqs")}</span>
            </Link>
          </div>

          <div className="mt-12 space-y-4 px-4 pb-12">
            <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold text-lg shadow-lg shadow-primary/10">
              {t("getAdvice")} →
            </Button>
            <Button variant="outline" className="w-full h-14 rounded-2xl border-primary/20 text-primary font-bold text-lg">
              {t("contact")}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
