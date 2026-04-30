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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-primary-dark">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="object-cover w-full h-full opacity-30"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-metropolis-at-night-11425-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/80 to-primary-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        {/* Animated accent lights */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-accent/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Trust Badge */}
          <motion.div 
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 text-white/80 text-xs font-semibold uppercase tracking-widest shadow-2xl"
          >
            <ShieldCheck className="size-4 text-accent" />
            <span>{t("badge")}</span>
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[1.1]"
          >
            <span className="block">{t("title1")}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-colombia-yellow to-accent animate-gradient-x">
              {t("title2")}
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div 
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 bg-accent hover:bg-accent-dark text-white rounded-full font-bold text-lg shadow-xl shadow-accent/20 transition-all hover:scale-105 group">
              {t("cta1")}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 border-white/20 text-white hover:bg-white/10 rounded-full font-bold text-lg backdrop-blur-sm transition-all bg-transparent">
              {t("cta2")}
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            variants={fadeUp}
            className="mt-16 flex items-center gap-6"
          >
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="relative size-10 rounded-full border-2 border-primary-dark bg-surface shadow-lg flex items-center justify-center overflow-hidden">
                   <Image 
                     src={`https://i.pravatar.cc/100?img=${i+10}`} 
                     alt="User" 
                     fill
                     className="object-cover"
                   />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="size-3 text-colombia-yellow fill-colombia-yellow" />)}
              </div>
              <p className="text-xs font-semibold text-white/50 tracking-wide uppercase">{t("rating")}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Floor */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  )
}
