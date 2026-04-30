import { Hero } from "@/components/home/Hero";
import { StatsRow } from "@/components/home/StatsRow";
import { PersonaTabs } from "@/components/home/PersonaTabs";
import { ServicesCarousel } from "@/components/home/ServicesCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <StatsRow />
      
      <ScrollReveal>
        <PersonaTabs />
      </ScrollReveal>
      
      <ScrollReveal>
        <ServicesCarousel />
      </ScrollReveal>
    </div>
  );
}
