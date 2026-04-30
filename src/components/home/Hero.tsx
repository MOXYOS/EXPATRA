"use client"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { fadeUp, staggerContainer } from "@/lib/animations"
import { ChevronRight, ShieldCheck, Star } from "lucide-react"

export function Hero() {
  const t = useTranslations("hero")

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-48 pb-20 overflow-hidden bg-white">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] size-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] size-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center text-center"
        >
          {/* Trust Badge */}
          <motion.div 
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8 text-primary/70 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <ShieldCheck className="size-4 text-accent" />
            <span>{t("badge")}</span>
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl lg:text-9xl font-black text-primary mb-8 tracking-tight leading-[0.95]"
          >
            <span className="block mb-2">{t("title1")}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-colombia-yellow to-accent animate-gradient-x">
              {t("title2")}
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-14 leading-relaxed font-medium"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div 
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto h-16 px-12 bg-primary hover:bg-primary-dark text-white rounded-full font-bold text-xl shadow-2xl shadow-primary/20 transition-all hover:scale-105 group">
              {t("cta1")}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-12 border-primary/20 text-primary hover:bg-primary/5 rounded-full font-bold text-xl transition-all bg-white">
              {t("cta2")}
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            variants={fadeUp}
            className="mt-20 flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="relative size-12 rounded-full border-4 border-white bg-slate-100 shadow-xl overflow-hidden ring-1 ring-primary/5">
                   <Image 
                     src={`https://i.pravatar.cc/100?img=${i+20}`} 
                     alt="User" 
                     fill
                     className="object-cover"
                   />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="size-5 text-colombia-yellow fill-colombia-yellow shadow-sm" />)}
              </div>
              <p className="text-sm font-bold text-primary/40 tracking-wider uppercase">{t("rating")}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Clean Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </section>
  )
}
