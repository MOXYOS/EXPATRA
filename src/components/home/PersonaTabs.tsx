"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { Plane, TrendingUp, Sun, HeartPulse, Flag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function PersonaTabs() {
  const t = useTranslations("personas")
  const [activeTab, setActiveTab] = useState("nomad")

  const personas = [
    { 
      id: "nomad", 
      icon: <Plane className="size-6" />, 
      title: t("nomad.title"), 
      desc: t("nomad.desc"),
      color: "bg-blue-600",
      image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200&auto=format&fit=crop" 
    },
    { 
      id: "investor", 
      icon: <TrendingUp className="size-6" />, 
      title: t("investor.title"), 
      desc: t("investor.desc"),
      color: "bg-indigo-600",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" 
    },
    { 
      id: "retiree", 
      icon: <Sun className="size-6" />, 
      title: t("retiree.title"), 
      desc: t("retiree.desc"),
      color: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1554177255-61502b352de3?q=80&w=1200&auto=format&fit=crop" 
    },
    { 
      id: "health", 
      icon: <HeartPulse className="size-6" />, 
      title: t("health.title"), 
      desc: t("health.desc"),
      color: "bg-emerald-600",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop" 
    },
    { 
      id: "usCitizen", 
      icon: <Flag className="size-6" />, 
      title: t("usCitizen.title"), 
      desc: t("usCitizen.desc"),
      color: "bg-rose-600",
      image: "https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?q=80&w=1200&auto=format&fit=crop" 
    },
  ]

  const activePersona = personas.find(p => p.id === activeTab) || personas[0]

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-4"
          >
            {t("subtitle")}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-black text-primary mb-6"
          >
            {t("mainTitle")}
          </motion.h2>
          <div className="w-20 h-1.5 bg-accent rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={cn(
                  "group relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 text-left border-2",
                  activeTab === p.id 
                    ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" 
                    : "bg-surface text-primary border-transparent hover:border-primary/10 hover:bg-surface/80"
                )}
              >
                <div className={cn(
                  "size-10 rounded-xl flex items-center justify-center transition-colors",
                  activeTab === p.id ? "bg-white/20" : "bg-white shadow-sm"
                )}>
                  {p.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base leading-tight">{p.title}</h4>
                </div>
                <ArrowRight className={cn(
                  "size-4 transition-transform duration-300",
                  activeTab === p.id ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                )} />
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-10 bg-surface rounded-[2.5rem] overflow-hidden min-h-[550px] shadow-2xl border border-border/50"
              >
                <div className="lg:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className={cn("size-16 rounded-3xl flex items-center justify-center mb-8 text-white shadow-lg", activePersona.color)}>
                    {activePersona.icon}
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl font-black text-primary mb-6 leading-tight">
                    {activePersona.title}
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
                    {activePersona.desc}
                  </p>
                  <div className="mt-auto">
                    <Button size="lg" className="rounded-full h-14 px-10 bg-primary hover:bg-primary-dark group text-lg font-bold shadow-lg shadow-primary/10">
                      Explore {activePersona.title} Solutions
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
                <div className="lg:col-span-4 relative min-h-[300px] lg:min-h-full">
                  <Image 
                    src={activePersona.image} 
                    alt={activePersona.title} 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent lg:bg-gradient-to-l" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
