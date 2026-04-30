"use client"
import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useTranslations } from "next-intl"
import { ArrowRight, BookOpen, MessageCircle, Shield, Building2, Home, User, Briefcase } from "lucide-react"

export function MegaMenu({ scrolled }: { scrolled: boolean }) {
  const t = useTranslations("nav")
  const m = useTranslations("megaMenu")
  
  const triggerClass = cn(
    "group bg-transparent hover:bg-primary/5 focus:bg-primary/5 data-[state=open]:bg-primary/5 transition-all duration-300 rounded-full px-4 py-2 text-sm font-medium",
    "text-primary/80 hover:text-primary"
  );

  return (
    <NavigationMenu className="max-w-none w-full justify-center">
      <NavigationMenuList className="gap-2 justify-center">
        {/* I'm a Digital Nomad */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            <span className="flex items-center gap-1.5"><Briefcase className="size-4 opacity-70" /> {t("digitalNomad")}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuContainer border="border-t-primary">
              <MenuColumn title={m("categories.legalStay")} icon={<Shield className="size-5 text-primary" />}>
                <ListItem href="/colombia-visas/tourism-stamp-extension" title={m("links.tourismExtension")} />
                <ListItem href="/colombia-visas/digital-nomad-visa" title={m("links.nomadVisa")}>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold uppercase">Work</span>
                    <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold uppercase">Business</span>
                  </div>
                </ListItem>
                <ListItem href="/insurance-colombia" title={m("links.healthPolicy")} />
              </MenuColumn>
              <MenuColumn title={m("categories.documentation")} icon={<BookOpen className="size-5 text-primary" />}>
                <ListItem href="/other-services/fbi-background-check" title={m("links.fbiCheck")} />
                <ListItem href="/other-services/us-apostille" title={m("links.usApostille")} />
                <ListItem href="/other-services/official-translations" title={m("links.translations")} />
              </MenuColumn>
              <HelpColumn 
                title={m("categories.help")} 
                links={[
                  { href: "/book-an-appointment", title: m("links.specializedAdvice") },
                  { href: "/business-in-colombia/company-incorporation", title: m("links.startBusiness") },
                  { href: "/faqs", title: m("links.faqs") }
                ]}
                blogPosts={[
                  { href: "/blog/medellin-nomad-guide", title: "Ultimate Medellín Guide" },
                  { href: "/blog/visa-requirements-2026", title: "Visa Updates 2026" }
                ]}
              />
            </MenuContainer>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* I Want to Invest */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            <span className="flex items-center gap-1.5"><Building2 className="size-4 opacity-70" /> {t("invest")}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuContainer border="border-t-accent">
              <MenuColumn title={m("categories.investment")} icon={<Building2 className="size-5 text-accent" />}>
                <ListItem href="/business-in-colombia/company-incorporation" title={m("links.companyIncorporation")} />
                <ListItem href="/colombia-visas/business-owner-visa" title={m("links.businessVisa")} />
                <ListItem href="/business-in-colombia/foreign-direct-investment" title={m("links.fdiCertificate")} />
              </MenuColumn>
              <MenuColumn title={m("categories.realEstate")} icon={<Home className="size-5 text-accent" />}>
                <ListItem href="/real-estate/property-listings" title={m("links.propertyListings")} />
                <ListItem href="/colombia-visas/real-estate-visa" title={m("links.realEstateVisa")} />
                <ListItem href="/real-estate/legal-services" title={m("links.legalRE")} />
              </MenuColumn>
              <HelpColumn 
                title={m("categories.insights")} 
                links={[
                  { href: "/book-an-appointment", title: m("links.specializedAdvice") },
                  { href: "/faqs", title: m("links.faqs") }
                ]}
                blogPosts={[
                  { href: "/blog/real-estate-market", title: "Real Estate Market 2026" },
                  { href: "/blog/fdi-benefits", title: "FDI Tax Benefits" }
                ]}
              />
            </MenuContainer>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* I'm Retired */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            <span className="flex items-center gap-1.5"><User className="size-4 opacity-70" /> {t("retired")}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuContainer border="border-t-colombia-yellow">
              <MenuColumn title={m("categories.legalStay")} icon={<Shield className="size-5 text-colombia-yellow" />}>
                <ListItem href="/colombia-visas/tourism-stamp-extension" title={m("links.tourismExtension")} />
                <ListItem href="/colombia-visas/retirement-visa" title={m("links.retirementVisa")} />
                <ListItem href="/insurance-colombia" title={m("links.healthPolicy")} />
              </MenuColumn>
              <MenuColumn title={m("categories.documentation")} icon={<BookOpen className="size-5 text-colombia-yellow" />}>
                <ListItem href="/other-services/fbi-background-check" title={m("links.fbiCheck")} />
                <ListItem href="/other-services/us-apostille" title={m("links.usApostille")} />
                <ListItem href="/other-services/official-translations" title={m("links.translations")} />
              </MenuColumn>
              <HelpColumn 
                title={m("categories.help")} 
                links={[
                  { href: "/book-an-appointment", title: m("links.specializedAdvice") },
                  { href: "/faqs", title: m("links.faqs") }
                ]}
                blogPosts={[
                  { href: "/blog/best-cities-retire", title: "Top Cities to Retire" },
                  { href: "/blog/healthcare-guide", title: "Healthcare System Guide" }
                ]}
              />
            </MenuContainer>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Get Health Policy */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            <span className="flex items-center gap-1.5"><Shield className="size-4 opacity-70" /> {t("health")}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuContainer border="border-t-success">
              <MenuColumn title={m("categories.insurance")} icon={<Shield className="size-5 text-success" />}>
                <ListItem href="/insurance-colombia/tourism-policy" title={m("links.tourismInsurance")} />
                <ListItem href="/insurance-colombia/visa-policy" title={m("links.visaInsurance")} />
              </MenuColumn>
              <MenuColumn title={m("categories.actions")} icon={<ArrowRight className="size-5 text-success" />}>
                <ListItem href="/quote-now" title={m("links.quoteNow")} className="font-bold text-success" />
                <ListItem href="/contact-us" title={m("links.whatsapp")} />
                <ListItem href="/faqs" title={m("links.faqs")} />
              </MenuColumn>
              <div className="bg-success/5 p-6 rounded-2xl flex flex-col justify-center text-center border border-success/10">
                <div className="bg-success/20 size-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="size-6 text-success" />
                </div>
                <h4 className="font-display font-bold text-lg text-primary mb-2">Need Coverage Fast?</h4>
                <p className="text-xs text-muted-foreground mb-6">Approval in under 24 hours with our premium partners.</p>
                <Link href="/quote-now" className="bg-success text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-success-dark transition-all shadow-lg shadow-success/20 scale-hover">
                  {m("links.quoteNow")}
                </Link>
              </div>
            </MenuContainer>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* US Citizens Services */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            <span className="flex items-center gap-1.5"><ArrowRight className="size-4 opacity-70" /> {t("usCitizens")}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuContainer border="border-t-colombia-red">
              <MenuColumn title={m("categories.legalStay")} icon={<Shield className="size-5 text-colombia-red" />}>
                <ListItem href="/colombia-visas/tourism-stamp-extension" title={m("links.tourismExtension")} />
                <ListItem href="/colombia-visas" title="Visa Support" />
                <ListItem href="/insurance-colombia" title={m("links.healthPolicy")} />
              </MenuColumn>
              <MenuColumn title={m("categories.documentation")} icon={<BookOpen className="size-5 text-colombia-red" />}>
                <ListItem href="/other-services/passport-renewal" title={m("links.passportRenewal")} className="font-bold text-colombia-red" />
                <ListItem href="/other-services/fbi-background-check" title={m("links.fbiCheck")} />
                <ListItem href="/other-services/us-apostille" title={m("links.usApostille")} />
              </MenuColumn>
              <HelpColumn 
                title={m("categories.guides")} 
                links={[
                  { href: "/book-an-appointment", title: m("links.legalAdvice") },
                  { href: "/faqs", title: m("links.faqs") }
                ]}
                blogPosts={[
                  { href: "/blog/us-tax-obligations", title: "Tax Obligations Guide" },
                  { href: "/blog/passport-renewal-guide", title: "Passport Renewal Tips" }
                ]}
              />
            </MenuContainer>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MenuContainer({ children, border }: { children: React.ReactNode, border: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-8 p-8 w-[95vw] max-w-[900px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20",
        border,
        "border-t-[6px]"
      )}
    >
      {children}
    </motion.div>
  )
}

function MenuColumn({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="font-display font-bold text-base text-primary uppercase tracking-tight">{title}</h4>
      </div>
      <ul className="flex flex-col gap-1">
        {children}
      </ul>
    </div>
  )
}

function HelpColumn({ title, links, blogPosts }: { title: string, links: any[], blogPosts: any[] }) {
  return (
    <div className="bg-surface/50 p-6 rounded-2xl border border-border/40 flex flex-col shadow-inner">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="size-5 text-accent" />
        <h4 className="font-display font-bold text-base text-primary tracking-tight">{title}</h4>
      </div>
      <ul className="flex flex-col gap-2 mb-6">
        {links.map(link => (
          <ListItem key={link.href} href={link.href} title={link.title} className="p-0 hover:bg-transparent text-sm" />
        ))}
      </ul>
      <div className="mt-auto pt-6 border-t border-border/40">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 block">From our Experts</span>
        <div className="flex flex-col gap-3">
          {blogPosts.map(post => (
            <Link key={post.href} href={post.href} className="group flex items-center gap-2 text-xs font-semibold text-primary hover:text-accent transition-all">
              <div className="size-1.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group/item block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-all hover:bg-primary/5 hover:translate-x-1",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-tight text-foreground group-hover/item:text-primary transition-colors">{title}</div>
          {children && <div className="mt-1">{children}</div>}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
