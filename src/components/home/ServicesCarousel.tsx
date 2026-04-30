"use client"
import { useTranslations } from "next-intl"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FileText, Building2, Stethoscope, Home, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ServicesCarousel() {
  const t = useTranslations("services")

  const services = [
    { 
      id: "visa", 
      icon: <FileText size={32} />, 
      title: t("visa"), 
      desc: t("visaDesc"),
      color: "bg-blue-500" 
    },
    { 
      id: "business", 
      icon: <Building2 size={32} />, 
      title: t("business"), 
      desc: t("businessDesc"),
      color: "bg-purple-500" 
    },
    { 
      id: "health", 
      icon: <Stethoscope size={32} />, 
      title: t("health"), 
      desc: t("healthDesc"),
      color: "bg-green-500" 
    },
    { 
      id: "realEstate", 
      icon: <Home size={32} />, 
      title: t("realEstate"), 
      desc: t("realEstateDesc"),
      color: "bg-orange-500" 
    },
  ]

  return (
    <section className="py-32 bg-primary-dark text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full -mr-[20%] -mt-[10%]" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full -ml-[20%] -mb-[10%]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <div className="text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="font-display text-4xl md:text-6xl font-black mb-6"
            >
              Our Core <span className="text-accent">Services</span>
            </motion.h2>
            <div className="w-24 h-1.5 bg-accent rounded-full mx-auto md:mx-0" />
          </div>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-primary rounded-full px-10 h-14 font-bold text-lg hidden md:flex bg-transparent transition-all">
            Explore All Services
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {services.map((service, idx) => (
              <CarouselItem key={service.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative h-[450px] bg-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col justify-between overflow-hidden hover:bg-white/10 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-accent size-10 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="size-5 text-white" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className={`size-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      {service.icon}
                    </div>
                    <h3 className="font-display text-3xl font-bold mb-4">{service.title}</h3>
                    <p className="text-white/60 text-lg leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="relative z-10">
                    <Button variant="link" className="text-accent p-0 font-bold text-lg hover:text-white transition-colors">
                      {t("learnMore")} →
                    </Button>
                  </div>
                  
                  {/* Hover Background Accent */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 ${service.color} opacity-30 group-hover:h-2 transition-all duration-500`} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-12">
            <CarouselPrevious className="static translate-y-0 bg-white/5 border-white/10 text-white hover:bg-white/20 hover:text-white size-14 rounded-full" />
            <CarouselNext className="static translate-y-0 bg-white/5 border-white/10 text-white hover:bg-white/20 hover:text-white size-14 rounded-full" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
